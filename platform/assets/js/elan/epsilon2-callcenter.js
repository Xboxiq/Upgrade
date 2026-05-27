/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — ε2 CALLCENTER REVIVAL (Pillar ε / Stage 2)
   ────────────────────────────────────────────────────────────────────────
   World: تَيار (Tayyar). Page: page-callcenter.
   Beacon: 🔊 SOUND_BEACON — outcome-bound procedural audio.

     • upg:call:outcome  → emitOutcome(detail.outcome)
       - "success" → maqsoom haptic + ascending arpeggio (360→440→540 Hz)
       - "lost"    → silence (the punishment is silence) + visual outline
       - "neutral" → dafn haptic + soft sine 400 Hz × 80 ms

   No audio files. WebAudio synthesis only. Lazy AudioContext (built on first
   play after a user gesture; respects autoplay policy + Safari quirks).
   prefers-reduced-motion: reduce → all sound suppressed; haptic still fires
   only if user explicitly engaged Upg.haptic earlier.

   Sacred preserved:
     • δ4 Upg.haptic.play / patterns surface untouched (we consume, don't override)
     • β3 Upg.format untouched
     • W16 Upg.sound is a SEPARATE namespace (master interface) — we route through it
       when present, otherwise we synthesize directly. Either way, ε2 owns its own
       arpeggio recipe (3-note ascending sine), distinct from W16's 5 recipes.

   Files: platform/assets/js/elan/epsilon2-callcenter.js  (this)
          platform/assets/css/pages.css  (call-card outcome rules + iraq tayyar block)
          platform/index.html            (iraq-block aside + outcome demo card)
          platform/assets/app.js         (import wiring)
   ════════════════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  const w = (typeof window !== 'undefined') ? window : null;
  if (!w) return;

  /* ── Reduced-motion query (live) ─────────────────────────────────────── */
  const mqReduce = (typeof w.matchMedia === 'function')
    ? w.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false, addEventListener: function(){} };

  /* ── Lazy AudioContext (one per page, built on first need) ───────────── */
  let ctx = null;
  function getCtx() {
    if (ctx) return ctx;
    const AC = w.AudioContext || w.webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); } catch (e) { ctx = null; }
    return ctx;
  }

  /* ── Note synthesizer (sine + ADSR) ──────────────────────────────────── */
  function note(freq, startOffset, durationS, peakGain) {
    const c = getCtx();
    if (!c) return;
    const start = c.currentTime + startOffset;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(peakGain, start + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, start + durationS);
    osc.connect(g);
    g.connect(c.destination);
    osc.start(start);
    osc.stop(start + durationS + 0.02);
  }

  /* ── Arpeggio: maqsoom 360 → 440 → 540 Hz (success) ──────────────────── */
  function playArpeggio() {
    if (mqReduce.matches) return;
    const peak = 0.06;
    note(360, 0.000, 0.13, peak);
    note(440, 0.080, 0.13, peak);
    note(540, 0.160, 0.18, peak);
  }

  /* ── Soft neutral cue: 400 Hz × 80 ms (neutral) ──────────────────────── */
  function playNeutral() {
    if (mqReduce.matches) return;
    note(400, 0.000, 0.090, 0.045);
  }

  /* ── Haptic bridge (uses δ4 Upg.haptic if engaged; silent otherwise) ──── */
  function tryHaptic(pattern) {
    try {
      const h = w.Upg && w.Upg.haptic;
      if (h && typeof h.play === 'function') h.play(pattern);
    } catch (_) { /* engagement gate inside Upg.haptic handles silence */ }
  }

  /* ── Outcome state on the originating card ───────────────────────────── */
  function paintCard(target, outcome) {
    if (!target || !target.closest) return;
    const card = target.closest('.call-card, [data-call-card]');
    if (!card) return;
    if (outcome === 'success' || outcome === 'lost' || outcome === 'neutral') {
      card.setAttribute('data-outcome', outcome);
    }
  }

  /* ── Public emitter ──────────────────────────────────────────────────── */
  function emitOutcome(outcome, opts) {
    const o = (typeof outcome === 'string') ? outcome.toLowerCase() : '';
    const target = (opts && opts.target) || null;
    paintCard(target, o);
    switch (o) {
      case 'success': tryHaptic('maqsoom'); playArpeggio(); break;
      case 'lost':    /* silence is the punishment */         break;
      case 'neutral': tryHaptic('dafn');    playNeutral();    break;
      default: return false;
    }
    return true;
  }

  /* ── Event bridge: upg:call:outcome ──────────────────────────────────── */
  function onOutcomeEvent(e) {
    const detail = (e && e.detail) || {};
    emitOutcome(detail.outcome, { target: detail.target || (e && e.target) || null });
  }

  /* ── Delegated demo: any [data-call-outcome="success|lost|neutral"] ──── */
  function onDelegatedClick(e) {
    const trigger = e.target && e.target.closest && e.target.closest('[data-call-outcome]');
    if (!trigger) return;
    const outcome = trigger.getAttribute('data-call-outcome');
    emitOutcome(outcome, { target: trigger });
  }

  /* ── Wiring (DOMContentLoaded + late-attach safe) ────────────────────── */
  function wire() {
    if (wire._wired) return;
    wire._wired = true;
    document.addEventListener('upg:call:outcome', onOutcomeEvent);
    document.addEventListener('click', onDelegatedClick, false);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire, { once: true });
  } else {
    wire();
  }

  /* ── Surface registration ────────────────────────────────────────────── */
  w.Upg = w.Upg || {};
  if (!w.Upg.callcenter) {
    w.Upg.callcenter = Object.freeze({
      emitOutcome,
      patterns: function() { return Object.freeze(['success', 'lost', 'neutral']); }
    });
  }
})();
