/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-08.js
   Extracted from app.js lines 4503-4532
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function qlThemeViewTransition(){
  'use strict';
  function wrap(){
    if (typeof window.toggleTheme !== 'function') return;
    if (window.toggleTheme.__qlV13) return; // idempotent
    var orig = window.toggleTheme;
    function safe(){
      // No View Transitions API → straight call
      if (!document.startViewTransition) return orig.apply(this, arguments);
      // Reduced motion → straight call (no transition)
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return orig.apply(this, arguments);
      }
      var args = arguments;
      var ctx  = this;
      try {
        return document.startViewTransition(function(){ orig.apply(ctx, args); });
      } catch(_) {
        return orig.apply(ctx, args);
      }
    }
    safe.__qlV13 = true;
    window.toggleTheme = safe;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrap);
  } else {
    setTimeout(wrap, 0);
  }
})();
