/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-sound-1.js
   Extracted from app.js lines 15656-15867
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  var LS_KEY = 'upg.sound.enabled';
  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var REDUCE_MOTION = mqReduce.matches;

  var ctx = null;
  var masterGain = null;
  var enabled = false;
  var volume = 0.18;
  var lastPlay = Object.create(null); // debounce bookkeeping

  /* ────────────────────────────────────────────────────────────
     AudioContext — built lazily on first enable() / play().
     Respects browser autoplay policies (must be user-gesture).
     Errors (Safari quirks, locked-down contexts) swallowed safely.
     ──────────────────────────────────────────────────────────── */
  var ensureCtx = function () {
    if (ctx) return ctx;
    try {
      var Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
      masterGain = ctx.createGain();
      masterGain.gain.value = volume;
      masterGain.connect(ctx.destination);
      return ctx;
    } catch (e) {
      try { console.warn('[Upg.sound] AudioContext unavailable:', e && e.message); } catch (_) {}
      ctx = null;
      masterGain = null;
      return null;
    }
  };

  /* ────────────────────────────────────────────────────────────
     Sound recipes — each is an array of notes.
     Each note: { freq, type, dur, atk, rel, delay? }
     atk = attack ramp time (s) | rel = release decay (s)
     delay = optional offset from sequence start (s)
     ──────────────────────────────────────────────────────────── */
  var RECIPES = {
    'tap': [
      { freq: 880, type: 'sine', dur: 0.06, atk: 0.005, rel: 0.04 }
    ],
    'confirm': [
      { freq: 1320, type: 'sine', dur: 0.08, atk: 0.005, rel: 0.06 },
      { freq: 1760, type: 'sine', dur: 0.08, atk: 0.005, rel: 0.07, delay: 0.07 }
    ],
    'error': [
      { freq: 220, type: 'triangle', dur: 0.14, atk: 0.005, rel: 0.10 }
    ],
    'nav': [
      { freq: 660, type: 'sine', dur: 0.05, atk: 0.005, rel: 0.04 }
    ],
    'complete': [
      { freq: 1320, type: 'sine', dur: 0.08, atk: 0.005, rel: 0.06 },
      { freq: 1760, type: 'sine', dur: 0.08, atk: 0.005, rel: 0.07, delay: 0.07 },
      { freq: 2640, type: 'sine', dur: 0.10, atk: 0.005, rel: 0.09, delay: 0.14 }
    ]
  };

  /* ────────────────────────────────────────────────────────────
     playNote — synthesizes one oscillator with ADSR envelope.
     Uses linearRamp for attack, exponentialRamp for natural decay.
     Each note destroys itself (osc.stop) shortly after release.
     ──────────────────────────────────────────────────────────── */
  var playNote = function (note, when) {
    if (!ctx || !masterGain) return;
    try {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = note.type || 'sine';
      osc.frequency.value = note.freq;
      osc.connect(gain);
      gain.connect(masterGain);

      var start = when + (note.delay || 0);
      var peak = start + (note.atk || 0.005);
      var stop = peak + (note.dur || 0.06);
      var end = stop + (note.rel || 0.04);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(1, peak);
      gain.gain.exponentialRampToValueAtTime(0.0001, end);

      osc.start(start);
      osc.stop(end + 0.02);
    } catch (e) {
      // swallow — single bad note shouldn't break playback chain
    }
  };

  /* ────────────────────────────────────────────────────────────
     play(name) — public trigger.
     Bails early if disabled / reduced-motion / unknown name / debounced.
     Resumes suspended context (Chrome autoplay policy: gesture required).
     ──────────────────────────────────────────────────────────── */
  var play = function (name) {
    if (!enabled || REDUCE_MOTION) return false;
    var recipe = RECIPES[name];
    if (!recipe) {
      try { console.warn('[Upg.sound] Unknown sound:', name, '— available:', Object.keys(RECIPES)); } catch (_) {}
      return false;
    }
    var now = Date.now();
    if (lastPlay[name] && (now - lastPlay[name]) < 50) return false;
    lastPlay[name] = now;

    var c = ensureCtx();
    if (!c) return false;
    if (c.state === 'suspended') {
      try { c.resume(); } catch (_) {}
    }

    var t0 = c.currentTime;
    for (var i = 0; i < recipe.length; i++) {
      playNote(recipe[i], t0);
    }
    return true;
  };

  /* ────────────────────────────────────────────────────────────
     setVolume(v) — clamped 0..1, applied to master gain immediately.
     ──────────────────────────────────────────────────────────── */
  var setVolume = function (v) {
    var n = Number(v);
    if (isNaN(n)) n = 0;
    volume = Math.max(0, Math.min(1, n));
    if (masterGain) masterGain.gain.value = volume;
    return volume;
  };

  /* ────────────────────────────────────────────────────────────
     enable() / disable() — flips state + persists + sets body attr.
     enable() refuses if reduced-motion is the user preference.
     ──────────────────────────────────────────────────────────── */
  var enable = function () {
    if (REDUCE_MOTION) {
      try { console.info('[Upg.sound] reduced-motion preference — refusing to enable.'); } catch (_) {}
      return false;
    }
    enabled = true;
    try { localStorage.setItem(LS_KEY, '1'); } catch (_) {}
    if (document.body) document.body.setAttribute('data-sound-state', 'on');
    ensureCtx();
    return true;
  };

  var disable = function () {
    enabled = false;
    try { localStorage.setItem(LS_KEY, '0'); } catch (_) {}
    if (document.body) document.body.setAttribute('data-sound-state', 'off');
    return true;
  };

  /* ────────────────────────────────────────────────────────────
     Boot — restore persisted preference (without auto-creating ctx).
     Listen for live reduced-motion toggle → silence mid-session.
     ──────────────────────────────────────────────────────────── */
  var initBodyState = function () {
    try {
      var saved = localStorage.getItem(LS_KEY);
      if (saved === '1' && !REDUCE_MOTION) {
        enabled = true;
        if (document.body) document.body.setAttribute('data-sound-state', 'on');
      } else {
        if (document.body) document.body.setAttribute('data-sound-state', 'off');
      }
    } catch (_) {
      if (document.body) document.body.setAttribute('data-sound-state', 'off');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBodyState, { once: true });
  } else {
    initBodyState();
  }

  // Live reduced-motion change → silence (preserve enabled flag for when user reverts).
  try {
    var onMQChange = function (e) {
      REDUCE_MOTION = e.matches;
      if (REDUCE_MOTION && document.body) {
        document.body.setAttribute('data-sound-state', 'off');
      } else if (enabled && document.body) {
        document.body.setAttribute('data-sound-state', 'on');
      }
    };
    if (mqReduce.addEventListener) mqReduce.addEventListener('change', onMQChange);
    else if (mqReduce.addListener) mqReduce.addListener(onMQChange);
  } catch (_) {}

  /* ────────────────────────────────────────────────────────────
     Public API — Object.freeze to lock surface area.
     22nd top-level Upg.* namespace.
     ──────────────────────────────────────────────────────────── */
  window.Upg = window.Upg || {};
  window.Upg.sound = Object.freeze({
    enable: enable,
    disable: disable,
    play: play,
    setVolume: setVolume,
    enabled: function () { return !!enabled && !REDUCE_MOTION; },
    available: function () {
      return Boolean(window.AudioContext || window.webkitAudioContext);
    },
    list: function () { return Object.keys(RECIPES); }
  });
})(window, document);
