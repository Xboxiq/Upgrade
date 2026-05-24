/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-life-2.js
   Extracted from app.js lines 15183-15319
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  var REDUCED = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var mqRM = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  if (mqRM && typeof mqRM.addEventListener === 'function') {
    mqRM.addEventListener('change', function (e) { REDUCED = e.matches; });
  }

  /* ────────────────────────────────────────────────────────────
     A) Pulse — apply a brief tactile-pulse-soft keyframe on element.
        Returns true on success, false on miss.
     ──────────────────────────────────────────────────────────── */
  function pulse(target, kind) {
    if (REDUCED) return false;
    var el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el || !el.style) return false;
    var animation = (kind === 'soft')
      ? 'tactile-pulse-soft 600ms var(--tactile-press-easing)'
      : 'tactile-pulse-soft 480ms ease-out';
    el.style.animation = 'none';
    /* force reflow so re-applied animation restarts cleanly */
    void el.offsetWidth;
    el.style.animation = animation;
    window.setTimeout(function () { el.style.animation = ''; }, 700);
    return true;
  }

  /* ────────────────────────────────────────────────────────────
     B) Ripple delegation — sets --ripple-x/--ripple-y from click coords
        on any element with [data-ripple]. CSS handles the visual.
     ──────────────────────────────────────────────────────────── */
  document.addEventListener('pointerdown', function (e) {
    if (REDUCED) return;
    var host = e.target && e.target.closest ? e.target.closest('[data-ripple]') : null;
    if (!host) return;
    var rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var x = ((e.clientX - rect.left) / rect.width) * 100;
    var y = ((e.clientY - rect.top) / rect.height) * 100;
    host.style.setProperty('--ripple-x', x + '%');
    host.style.setProperty('--ripple-y', y + '%');
    /* re-trigger the animation by toggling the attribute */
    host.removeAttribute('data-ripple-fire');
    /* force reflow so animation restarts on rapid taps */
    void host.offsetWidth;
    host.setAttribute('data-ripple-fire', 'true');
    window.setTimeout(function () {
      if (host.getAttribute('data-ripple-fire') === 'true') {
        host.removeAttribute('data-ripple-fire');
      }
    }, 600);
  }, { passive: true });

  /* ────────────────────────────────────────────────────────────
     C) Magnet enhancement — amplifies any [data-magnet] element with
        translate3d follow-cursor effect. Pointer leave resets cleanly.
        Throttled via rAF to keep ≥55 FPS on weaker GPUs.
     ──────────────────────────────────────────────────────────── */
  function attachMagnet(el) {
    if (!el || el.__upgMagnetAttached) return;
    el.__upgMagnetAttached = true;
    var rafId = 0;
    var pending = null;
    var strength = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--tactile-magnet-strength') || '0.18'
    ) || 0.18;

    function apply(ev) {
      pending = ev;
      if (rafId) return;
      rafId = window.requestAnimationFrame(function () {
        rafId = 0;
        if (!pending) return;
        var r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        var dx = (pending.clientX - (r.left + r.width / 2)) * (strength / 3);
        var dy = (pending.clientY - (r.top + r.height / 2)) * (strength / 3);
        el.style.transform = 'translate3d(' + dx.toFixed(2) + 'px,' + dy.toFixed(2) + 'px,0)';
        pending = null;
      });
    }
    function reset() {
      if (rafId) { window.cancelAnimationFrame(rafId); rafId = 0; }
      pending = null;
      el.style.transform = '';
    }

    el.addEventListener('pointermove', function (e) { if (!REDUCED) apply(e); });
    el.addEventListener('pointerleave', reset);
    el.addEventListener('pointercancel', reset);
    el.addEventListener('blur', reset);
  }

  function bootstrapMagnet() {
    var nodes = document.querySelectorAll('[data-magnet]');
    for (var i = 0; i < nodes.length; i++) attachMagnet(nodes[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapMagnet);
  } else {
    bootstrapMagnet();
  }

  /* Observer — picks up magnet hosts added later (lazy-mounted modals etc.) */
  if ('MutationObserver' in window) {
    var mo = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var node = added[j];
          if (node && node.nodeType === 1) {
            if (node.matches && node.matches('[data-magnet]')) attachMagnet(node);
            if (node.querySelectorAll) {
              var sub = node.querySelectorAll('[data-magnet]');
              for (var k = 0; k < sub.length; k++) attachMagnet(sub[k]);
            }
          }
        }
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  /* ────────────────────────────────────────────────────────────
     D) Extend Upg.life with .pulse — additive, preserves Phase 1 surface.
     ──────────────────────────────────────────────────────────── */
  if (window.Upg && window.Upg.life) {
    window.Upg.life.pulse = pulse;
  } else {
    window.Upg = window.Upg || {};
    window.Upg.life = window.Upg.life || {};
    window.Upg.life.pulse = pulse;
  }
})(window, document);
