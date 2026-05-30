/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — η1 — Press engine  (Upg.press · SPRING_PULSE)
   ────────────────────────────────────────────────────────────────────────
   Opens Pillar η (KINESIS). The release SPRING + proportional depth that the
   eight per-component :active scales never had, expressed once for the whole
   platform.

   On pointerdown / keydown it measures the control's MASS (offsetHeight) and
   sets --press-from so a large CTA rebounds from a deeper compression than a
   small chip (Le Corbusier's Modulor — proportion tied to the body). On
   release it stamps [data-press-release] for one cycle (press.css plays the
   single-overshoot spring), and fires CustomEvent('upg:press', {target,kind})
   so η3 (HAPTIC) can couple a دفّن tap without a hard dependency.

   Public surface (idempotent registration on window.Upg):
     Upg.press.enable()    Upg.press.disable()    Upg.press.enabled()

   Classic IIFE — mobile-safe (no ESM), per the v4.0.2 lesson.
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  window.Upg = window.Upg || {};

  var PRESS_SEL = 'button, [role="button"], [data-press]';
  var ENABLED   = true;
  var pressedEl = null;     // control currently held
  var reduceMQ  = null;     // prefers-reduced-motion: reduce

  // Proportional rebound origin (Modulor): small control → shallow (0.992),
  // large control → deep (0.965). Clamped so the maths never escapes the band.
  function computeFrom(h) {
    var SMALL = 36, LARGE = 160, HI = 0.992, LO = 0.965;
    if (!isFinite(h) || h <= SMALL) return HI;
    if (h >= LARGE) return LO;
    var t = (h - SMALL) / (LARGE - SMALL);          // 0..1
    return +(HI - t * (HI - LO)).toFixed(4);
  }

  function reduced() {
    return !!(reduceMQ && reduceMQ.matches);
  }

  function controlFrom(node) {
    if (!node || !node.closest) return null;
    var el = node.closest(PRESS_SEL);
    // η3 integration: the match bench (η2) owns its own tactile vocabulary
    // (تَك on a valid drop, silence on error) — exclude it so the global press
    // دفّن never pre-empts the bench's تَك (its chips/zones are role="button").
    if (el && el.closest('[data-match]')) return null;
    return el;
  }

  // Stamp the proportional compression on the element so the keyframe reads it.
  function arm(el) {
    if (!el) return;
    try {
      var h = el.offsetHeight || 0;
      el.style.setProperty('--press-from', String(computeFrom(h)));
    } catch (_) { /* detached / no layout: leave CSS default */ }
  }

  // The release: spring rebound (unless reduced) + the semantic event (always).
  function release(el) {
    if (!el) return;

    if (!reduced()) {
      el.removeAttribute('data-press-release');
      void el.offsetWidth;                          // reflow → re-trigger
      el.setAttribute('data-press-release', '');
      var done = false;
      var clear = function () {
        if (done) return; done = true;
        el.removeEventListener('animationend', clear);
        el.removeAttribute('data-press-release');
      };
      el.addEventListener('animationend', clear);
      window.setTimeout(clear, 360);                 // safety net (> emerge)
    }

    try {
      document.dispatchEvent(new CustomEvent('upg:press', {
        bubbles: true,
        detail: { target: el, kind: 'tap' }
      }));
    } catch (_) { /* very old browsers: silent */ }
  }


  // ── Pointer path ──────────────────────────────────────────────────────
  function onPointerDown(ev) {
    if (!ENABLED || (ev.pointerType === 'mouse' && ev.button !== 0)) return;
    var el = controlFrom(ev.target);
    if (!el) { pressedEl = null; return; }
    pressedEl = el;
    arm(el);
  }

  function onPointerUp(ev) {
    if (!ENABLED || !pressedEl) { pressedEl = null; return; }
    var el = pressedEl;
    pressedEl = null;
    // Bloom only if released over the same control (a drag-off cancels).
    if (el.contains(ev.target) || controlFrom(ev.target) === el) release(el);
  }

  function onPointerCancel() { pressedEl = null; }


  // ── Keyboard path (Enter / Space activate native buttons) ─────────────
  function onKeyDown(ev) {
    if (!ENABLED) return;
    if (ev.key !== 'Enter' && ev.key !== ' ' && ev.key !== 'Spacebar') return;
    var el = controlFrom(document.activeElement);
    if (el) arm(el);
  }

  function onKeyUp(ev) {
    if (!ENABLED) return;
    if (ev.key !== 'Enter' && ev.key !== ' ' && ev.key !== 'Spacebar') return;
    var el = controlFrom(document.activeElement);
    if (el) release(el);
  }


  // ── Boot ────────────────────────────────────────────────────────────
  function boot() {
    try { reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)'); } catch (_) { reduceMQ = null; }
    document.addEventListener('pointerdown',  onPointerDown,  true);
    document.addEventListener('pointerup',    onPointerUp,    true);
    document.addEventListener('pointercancel', onPointerCancel, true);
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('keyup',   onKeyUp,   true);
  }


  // ── Idempotent surface registration ─────────────────────────────────
  if (!window.Upg.press) {
    window.Upg.press = Object.freeze({
      enable:  function () { ENABLED = true;  },
      disable: function () { ENABLED = false; pressedEl = null; },
      enabled: function () { return ENABLED;  },
      _meta: Object.freeze({
        version: 'tadaffuq-v5/η1',
        pulse:   'SPRING_PULSE',
        sink_range: [0.965, 0.992],
        emits:   'upg:press'
      })
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    queueMicrotask(boot);
  }

})();
