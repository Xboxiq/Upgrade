/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — ε3 — Overlay ⇄ Dock choreography  (Upg.choreo · VEIL_PULSE)
   ────────────────────────────────────────────────────────────────────────
   Listens to the ε1 events (upg:overlay:open / upg:overlay:close) and veils
   the γ1 dock so the panel owns the stage — then returns the dock on tarteel
   time. Additive: toggles attributes on .dock (styled by overlay-choreo.css);
   no γ file edited, no sacred API touched.

   The Pulse — VEIL_PULSE (the chrome that dissolves, then returns slowly):
     open  → dock dissolves (opacity → 0) over --duration-panel
     close → wait a deliberate beat (≈ one --duration-panel, so the panel is
             gone and the canvas rests bare for a moment), then the dock
             re-emerges SLOWLY over --duration-zen. Asymmetric on purpose.

   Classic IIFE — mobile-safe. Idempotent.
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  window.Upg = window.Upg || {};

  let veiled = false;
  let returnStartTimer = 0;
  let returnEndTimer   = 0;

  // Durations are READ from the CSS tokens — never invented (MOTION §1).
  let PANEL_MS = 480;
  let ZEN_MS   = 640;

  function readMs(name, fallback) {
    try {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(name);
      const n = parseFloat(raw);
      return (isFinite(n) && n > 0) ? n : fallback;
    } catch (_) { return fallback; }
  }

  function getDock() { return document.querySelector('.dock'); }

  function clearTimers() {
    if (returnStartTimer) { clearTimeout(returnStartTimer); returnStartTimer = 0; }
    if (returnEndTimer)   { clearTimeout(returnEndTimer);   returnEndTimer = 0; }
  }


  // ── Veil the dock — focus is protected at once ───────────────────────
  function veil() {
    clearTimers();
    const dock = getDock();
    if (!dock) return;
    dock.removeAttribute('data-veil-return');
    dock.setAttribute('data-veiled', 'true');
    veiled = true;
  }

  // ── Return the dock — patiently, on tarteel time ─────────────────────
  function unveilWithDelay() {
    const dock = getDock();
    if (!dock) { veiled = false; return; }
    clearTimers();

    // the deliberate beat: wait until the panel has fully left and the canvas
    // has had a moment of stillness, THEN begin the slow re-emergence
    returnStartTimer = window.setTimeout(function () {
      returnStartTimer = 0;
      const d = getDock();
      if (!d) { veiled = false; return; }
      d.setAttribute('data-veil-return', 'true');   // zen-paced, ease-emerge
      d.removeAttribute('data-veiled');             // opacity animates 0 → 1
      veiled = false;
      // clean up the return-transition marker once the slow fade-in is done
      returnEndTimer = window.setTimeout(function () {
        returnEndTimer = 0;
        const d2 = getDock();
        if (d2) d2.removeAttribute('data-veil-return');
      }, ZEN_MS + 40);
    }, PANEL_MS);
  }


  // ── Boot ──────────────────────────────────────────────────────────────
  function boot() {
    PANEL_MS = readMs('--duration-panel', 480);
    ZEN_MS   = readMs('--duration-zen', 640);

    document.addEventListener('upg:overlay:open',  veil, false);
    document.addEventListener('upg:overlay:close', unveilWithDelay, false);
  }


  // ── Idempotent surface registration ─────────────────────────────────
  if (!window.Upg.choreo) {
    window.Upg.choreo = Object.freeze({
      isVeiled: function () { return veiled; },
      _meta: Object.freeze({
        version: 'tadaffuq-v5/ε3',
        pulse: 'VEIL_PULSE',
        consumes: 'upg:overlay:open / upg:overlay:close (ε1)',
        cadence: 'dissolve = --duration-panel; return-beat = --duration-panel; return = --duration-zen'
      })
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    queueMicrotask(boot);
  }

})();
