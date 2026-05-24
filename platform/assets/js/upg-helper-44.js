/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-44.js
   Extracted from app.js lines 14961-14995
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  // Lazy-loading hint on all <img> without explicit loading attr
  const lazyImages = () => {
    document.querySelectorAll('img:not([loading])').forEach((img) => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    });
  };

  // Prefetch hint on nav-item hover (CSS already does view-transitions; this primes any sub-resource)
  const navPrefetch = () => {
    document.querySelectorAll('.nav-item[data-page]').forEach((el) => {
      let primed = false;
      el.addEventListener('pointerenter', () => {
        if (primed) return;
        primed = true;
        // Cheap warm-up: requestIdleCallback-style schedule
        const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
        idle(() => {
          // No-op: marker; real prefetching not needed for SPA in-memory pages.
          el.dataset.prefetched = '1';
        });
      }, { passive: true });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { lazyImages(); navPrefetch(); }, { once: true });
  } else {
    lazyImages();
    navPrefetch();
  }
})();
