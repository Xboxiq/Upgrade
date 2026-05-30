/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — η3 — Haptic vocabulary  (Upg.haptic · HAPTIC_PULSE)
   ────────────────────────────────────────────────────────────────────────
   Closes Pillar η (KINESIS). A three-word tactile language, reused from v4 δ4:

     دفّن  dafn    [8]              — a soft single tap (acknowledgement)
     تَك   takk    [12,20,12]       — a confirming double-knock (valid match)
     مَقسوم maqsoom [8,30,8,30,14]   — the rhythmic signature (completion)

   maqsoom transliterates the Maqsoom iqā' — the Arabic/Iraqi percussion rhythm
   (Dum-tak-tak) — so the completion you FEEL is the maqam the lesson taught.

   Bindings (no double-fire):
     • upg:press         → dafn      (every tap, via η1)
     • valid match drop  → takk      (fired at η2's call site: match.js → play('takk'))
     • upg:zen:complete  → maqsoom   (via ζ3)

   Gated: reduced-motion → no-op; no navigator.vibrate → no-op; localStorage
   opt-out; 50ms debounce. Never plays audio, never adds chrome.

   Classic IIFE — mobile-safe. Idempotent. Re-implements the sacred Upg.haptic
   signature for the v5 tree (the v4 platform/ Upg.haptic is untouched).
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  window.Upg = window.Upg || {};

  // The maqamat vocabulary — values reused verbatim from v4 δ4.
  var PATTERNS = {
    dafn:    [8],
    takk:    [12, 20, 12],
    maqsoom: [8, 30, 8, 30, 14]
  };

  var STORE_KEY = 'upg.haptic.enabled';
  var DEBOUNCE  = 50;          // ms — anti-mash (matches v4 sound debounce)
  var ENABLED   = true;
  var lastAt    = 0;
  var reduceMQ  = null;

  function reduced()   { return !!(reduceMQ && reduceMQ.matches); }
  function supported() { return typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function'; }
  function available() { return supported() && !reduced(); }

  function loadPref() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw === '0') return false;
      if (raw === '1') return true;
    } catch (_) {}
    return true;              // default on — taps are 8–14ms, subtle; opt-out via disable()
  }
  function savePref(v) { try { localStorage.setItem(STORE_KEY, v ? '1' : '0'); } catch (_) {} }

  function setState() {
    try { document.documentElement.setAttribute('data-haptic-state', (ENABLED && available()) ? 'on' : 'off'); } catch (_) {}
  }

  // The single vibration site. Silence is the honest default when withheld.
  function play(name) {
    if (!ENABLED || !available()) return false;        // reduced-motion / no hardware → silence
    var pat = PATTERNS[name];
    if (!pat) { console.warn('[Upg.haptic] unknown pattern:', name); return false; }
    var now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    if (now - lastAt < DEBOUNCE) return false;
    lastAt = now;
    try { navigator.vibrate(pat.slice()); return true; } catch (_) { return false; }
  }

  function enable()  { ENABLED = true;  savePref(true);  setState(); return true; }
  function disable() {
    ENABLED = false; savePref(false); setState();
    try { if (supported()) navigator.vibrate(0); } catch (_) {}   // cancel any running buzz
    return false;
  }


  // ── Bindings — press → dafn, completion → maqsoom ──────────────────────
  // (valid-drop → takk is bound at η2's call site in match.js; binding it here
  //  too would double-fire, so it is deliberately omitted.)
  function onPress()    { play('dafn'); }
  function onComplete() { play('maqsoom'); }


  // ── Boot ──────────────────────────────────────────────────────────────
  function boot() {
    try { reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)'); } catch (_) { reduceMQ = null; }
    ENABLED = loadPref();
    if (reduceMQ && typeof reduceMQ.addEventListener === 'function') {
      reduceMQ.addEventListener('change', setState);   // toggling reduce-motion mid-session updates state
    }
    document.addEventListener('upg:press', onPress, false);
    document.addEventListener('upg:zen:complete', onComplete, false);
    setState();
  }


  // ── Idempotent surface registration (the sacred Upg.haptic signature) ──
  if (!window.Upg.haptic) {
    window.Upg.haptic = Object.freeze({
      play:      play,
      patterns:  function () { return Object.keys(PATTERNS); },
      enable:    enable,
      disable:   disable,
      enabled:   function () { return ENABLED; },
      available: available,
      _meta: Object.freeze({
        version: 'tadaffuq-v5/η3',
        pulse: 'HAPTIC_PULSE',
        vocabulary: { dafn: 'press', takk: 'valid-drop', maqsoom: 'completion' },
        binds: 'upg:press → dafn · valid-drop → takk (match.js) · upg:zen:complete → maqsoom'
      })
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    queueMicrotask(boot);
  }

})();
