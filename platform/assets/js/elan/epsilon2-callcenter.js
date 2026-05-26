/**
 * ε2 — Callcenter Content Revival (Tayyar World)
 * SOUND_BEACON: Maqamat-inspired outcome cues
 *   success → ascending arpeggio 360→440→540Hz (bayati intervals)
 *   lost    → silence (punishment is absence of sound)
 *   neutral → soft sine 400Hz × 80ms
 * All procedural WebAudio — zero audio files.
 * Respects prefers-reduced-motion (no sound in reduce).
 */
;(function initEpsilon2Callcenter() {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ctx = null;

  function getCtx() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); } catch (_) { /* swallow */ }
    return ctx;
  }

  function playArpeggio() {
    const a = getCtx();
    if (!a || REDUCED.matches) return;
    const notes = [360, 440, 540];
    const now = a.currentTime;
    notes.forEach(function (freq, i) {
      var osc = a.createOscillator();
      var g = a.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      var onset = now + i * 0.09;
      g.gain.setValueAtTime(0, onset);
      g.gain.linearRampToValueAtTime(0.07, onset + 0.012);
      g.gain.exponentialRampToValueAtTime(0.001, onset + 0.13);
      osc.connect(g);
      g.connect(a.destination);
      osc.start(onset);
      osc.stop(onset + 0.14);
    });
  }

  function playNeutral() {
    var a = getCtx();
    if (!a || REDUCED.matches) return;
    var now = a.currentTime;
    var osc = a.createOscillator();
    var g = a.createGain();
    osc.type = 'sine';
    osc.frequency.value = 400;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.04, now + 0.008);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(g);
    g.connect(a.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  function emitOutcome(outcome) {
    switch (outcome) {
      case 'success':
        playArpeggio();
        break;
      case 'lost':
        /* silence — the punishment is absence */
        break;
      case 'neutral':
        playNeutral();
        break;
    }
  }

  /* Listen for custom event from call simulation exercises */
  document.addEventListener('upg:call:outcome', function (e) {
    var detail = e && e.detail;
    if (detail && detail.outcome) emitOutcome(detail.outcome);
  });

  /* Apply visual outcome state to call-cards */
  document.addEventListener('upg:call:outcome', function (e) {
    var detail = e && e.detail;
    if (!detail || !detail.target) return;
    var card = typeof detail.target === 'string'
      ? document.querySelector(detail.target)
      : detail.target;
    if (!card) return;
    card.setAttribute('data-outcome', detail.outcome || '');
    /* Auto-clear after 3s */
    setTimeout(function () { card.removeAttribute('data-outcome'); }, 3000);
  });

  /* Public API — frozen */
  window.Upg = window.Upg || {};
  window.Upg.callcenter = Object.freeze({
    emitOutcome: emitOutcome,
    playArpeggio: playArpeggio,
    playNeutral: playNeutral
  });

})();
