/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — ε2 — Bottom-Sheet drag engine  (Upg.sheet · SPRING_PULSE)
   ────────────────────────────────────────────────────────────────────────
   On (max-width:720px) / (pointer:coarse) the ε1 slide-over is morphed (by
   sheet.css) into a bottom sheet. This module adds drag-to-dismiss with
   momentum + spring-back, bound to the panel header. It consumes Upg.overlay
   (ε1) and touches no sacred API.

   The Pulse — SPRING_PULSE (the drawer that resists casual dismissal):
     • drag follows the finger (CSS removes the transition while [data-dragging])
     • release < 35% AND not flicked  → spring back with --ease-spring overshoot
     • release ≥ 35%  OR  flicked down → leave (Upg.overlay.close())
     • dragging UP past seated rubber-bands (×0.2, capped 24px)
     • the scrim brightens live with the drag — the dismissal is previewed

   Classic IIFE — mobile-safe. Idempotent.
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  window.Upg = window.Upg || {};

  // Tuning constants
  const DISMISS_FRACTION = 0.35;   // slow drag must pass 35% of sheet height
  const FLICK_VELOCITY   = 0.6;    // px/ms downward → dismiss regardless of distance
  const RUBBER           = 0.2;    // up-drag resistance factor
  const RUBBER_CAP       = 24;     // px — max the sheet yields upward

  let panel  = null;   // #overlay-panel (.slide-over)
  let scrim  = null;   // #overlay-scrim
  let header = null;   // .slide-over-header (the grip)
  let mq     = null;   // sheet-mode media query

  let dragging   = false;
  let startY     = 0;
  let lastY      = 0;
  let lastT      = 0;
  let velocity   = 0;       // px/ms, signed (down = +)
  let currentDy  = 0;       // applied offset (after rubber-band)
  let sheetH     = 1;

  function sheetMode() { return !!(mq && mq.matches); }
  function overlayOpen() {
    return !!(window.Upg.overlay && window.Upg.overlay.isOpen && window.Upg.overlay.isOpen());
  }

  function setDrag(px) {
    currentDy = px;
    if (panel) panel.style.setProperty('--sheet-drag', px + 'px');
    if (scrim) {
      const progress = Math.min(Math.max(px, 0) / sheetH, 1);
      scrim.style.opacity = String(1 - progress);
    }
  }

  function clearSettle() {
    if (!panel) return;
    panel.removeAttribute('data-settling');
    panel.style.removeProperty('--sheet-drag');
  }


  // ── Drag lifecycle ────────────────────────────────────────────────────
  function onDown(ev) {
    if (!sheetMode() || !overlayOpen() || !ev.isPrimary) return;
    // don't hijack a tap on the close button
    if (ev.target && ev.target.closest && ev.target.closest('[data-overlay-close]')) return;

    dragging = true;
    startY = lastY = ev.clientY;
    lastT  = (window.performance && performance.now) ? performance.now() : Date.now();
    velocity = 0;
    currentDy = 0;
    sheetH = Math.max(panel.getBoundingClientRect().height, 1);

    panel.setAttribute('data-dragging', 'true');
    panel.removeAttribute('data-settling');
    if (scrim) scrim.setAttribute('data-dragging', 'true');
    try { header.setPointerCapture(ev.pointerId); } catch (_) { /* ignore */ }
  }

  function onMove(ev) {
    if (!dragging) return;
    let dy = ev.clientY - startY;
    if (dy < 0) dy = Math.max(dy * RUBBER, -RUBBER_CAP);   // rubber-band the over-pull

    const now = (window.performance && performance.now) ? performance.now() : Date.now();
    const dt = now - lastT;
    if (dt > 0) velocity = (ev.clientY - lastY) / dt;
    lastY = ev.clientY;
    lastT = now;

    setDrag(dy);
  }

  function endDrag(ev) {
    if (!dragging) return;
    dragging = false;
    try { header.releasePointerCapture(ev.pointerId); } catch (_) { /* ignore */ }
    panel.removeAttribute('data-dragging');
    if (scrim) scrim.removeAttribute('data-dragging');

    const passedThreshold = currentDy > sheetH * DISMISS_FRACTION;
    const flickedDown      = velocity > FLICK_VELOCITY;

    if (passedThreshold || flickedDown) {
      // leave — clear inline opacity so the scrim fades via its class transition,
      // then close (data-open=false → translateY(100%) via the panel transition)
      if (scrim) scrim.style.opacity = '';
      if (window.Upg.overlay && window.Upg.overlay.close) window.Upg.overlay.close();
      // --sheet-drag is reset on the upg:overlay:close handler
    } else {
      // spring back to seated with the overshoot settle
      if (scrim) scrim.style.opacity = '';
      panel.setAttribute('data-settling', 'true');
      panel.style.setProperty('--sheet-drag', '0px');
      const done = function () {
        panel.removeEventListener('transitionend', done);
        clearSettle();
      };
      panel.addEventListener('transitionend', done);
      window.setTimeout(function () { if (panel.hasAttribute('data-settling')) done(); }, 500);
    }
  }


  // ── Boot ──────────────────────────────────────────────────────────────
  function boot() {
    panel = document.getElementById('overlay-panel');
    scrim = document.getElementById('overlay-scrim');
    if (!panel) return;
    header = panel.querySelector('.slide-over-header');
    if (!header) return;

    mq = window.matchMedia
      ? window.matchMedia('(max-width: 720px), (pointer: coarse)')
      : { matches: false, addEventListener: function () {} };

    header.addEventListener('pointerdown',   onDown, { passive: true });
    header.addEventListener('pointermove',   onMove, { passive: true });
    header.addEventListener('pointerup',     endDrag, { passive: true });
    header.addEventListener('pointercancel', endDrag, { passive: true });

    // when the overlay closes by any path, reset the sheet transform/scrim
    document.addEventListener('upg:overlay:close', function () {
      dragging = false;
      panel.removeAttribute('data-dragging');
      clearSettle();
      if (scrim) { scrim.removeAttribute('data-dragging'); scrim.style.opacity = ''; }
    });

    // if the viewport leaves sheet mode mid-drag, abort cleanly
    const onMqChange = function () {
      if (!sheetMode() && dragging) {
        dragging = false;
        panel.removeAttribute('data-dragging');
        clearSettle();
        if (scrim) { scrim.removeAttribute('data-dragging'); scrim.style.opacity = ''; }
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onMqChange);
    else if (mq.addListener) mq.addListener(onMqChange);
  }


  // ── Idempotent surface registration ─────────────────────────────────
  if (!window.Upg.sheet) {
    window.Upg.sheet = Object.freeze({
      enabled: function () { return sheetMode(); },
      isDragging: function () { return dragging; },
      _meta: Object.freeze({
        version: 'tadaffuq-v5/ε2',
        pulse: 'SPRING_PULSE',
        dismissFraction: DISMISS_FRACTION,
        flickVelocity: FLICK_VELOCITY
      })
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    queueMicrotask(boot);
  }

})();
