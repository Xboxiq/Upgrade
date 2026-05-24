/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-life-3.js
   Extracted from app.js lines 15507-15620
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  /* Probe environment. Both must pass for trails to mount. */
  var mqFine    = window.matchMedia ? window.matchMedia('(pointer: fine)') : null;
  var mqReduced = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var hasFine   = !!(mqFine && mqFine.matches);
  var REDUCED   = !!(mqReduced && mqReduced.matches);

  /* No-op API for touch / reduce-motion users — preserves shape. */
  function expose(api) {
    window.Upg = window.Upg || {};
    window.Upg.life = window.Upg.life || {};
    window.Upg.life.pointer = api;
  }

  if (!hasFine || REDUCED) {
    expose({
      enable:  function () { return false; },
      disable: function () { return true;  },
      enabled: function () { return false; },
      rest:    function () { return false; }
    });
    return;
  }

  /* ────────────────────────────────────────────────────────────
     State + DOM construction (3 trail layers).
     ──────────────────────────────────────────────────────────── */
  var enabled   = true;
  var restTimer = 0;
  var trails    = [];
  var lastX     = -9999;
  var lastY     = -9999;

  function buildTrails() {
    if (!document.body) return;
    for (var i = 1; i <= 3; i++) {
      var t = document.createElement('div');
      t.className = 'pointer-trail' + (i > 1 ? ' pointer-trail--layer-' + i : '');
      t.setAttribute('aria-hidden', 'true');
      document.body.appendChild(t);
      trails.push(t);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildTrails, { once: true });
  } else {
    buildTrails();
  }

  /* ────────────────────────────────────────────────────────────
     Pointer tracking (passive + native transition smoothing).
     No rAF — CSS transitions handle the easing per layer.
     ──────────────────────────────────────────────────────────── */
  function onMove(e) {
    if (!enabled || !trails.length) return;
    lastX = e.clientX;
    lastY = e.clientY;
    var translate = 'translate3d(' + lastX + 'px,' + lastY + 'px,0) translate(-50%,-50%)';
    for (var i = 0; i < trails.length; i++) {
      var t = trails[i];
      t.classList.remove('pointer-trail--rest');
      t.style.transform = translate;
    }
    if (restTimer) window.clearTimeout(restTimer);
    restTimer = window.setTimeout(rest, 1500);
  }

  function rest() {
    for (var i = 0; i < trails.length; i++) {
      trails[i].classList.add('pointer-trail--rest');
    }
    return true;
  }

  document.addEventListener('pointermove', onMove, { passive: true });
  /* Hide trails when pointer leaves the window. */
  document.addEventListener('pointerleave', rest);
  window.addEventListener('blur', rest);

  /* ────────────────────────────────────────────────────────────
     React to user toggling reduced-motion mid-session.
     ──────────────────────────────────────────────────────────── */
  if (mqReduced && typeof mqReduced.addEventListener === 'function') {
    mqReduced.addEventListener('change', function (ev) {
      REDUCED = !!ev.matches;
      if (REDUCED && enabled) {
        enabled = false;
        for (var i = 0; i < trails.length; i++) trails[i].style.display = 'none';
      }
    });
  }

  /* ────────────────────────────────────────────────────────────
     Public API — extends Upg.life without breaking Phase 1/2.
     ──────────────────────────────────────────────────────────── */
  expose({
    enable: function () {
      if (REDUCED) return false;
      enabled = true;
      for (var i = 0; i < trails.length; i++) trails[i].style.display = '';
      return true;
    },
    disable: function () {
      enabled = false;
      for (var i = 0; i < trails.length; i++) trails[i].style.display = 'none';
      return true;
    },
    enabled: function () { return !!enabled && !REDUCED; },
    rest: rest
  });
})(window, document);
