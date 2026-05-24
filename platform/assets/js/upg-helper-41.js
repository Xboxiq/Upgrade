/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-41.js
   Extracted from app.js lines 14294-14319
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const tryWrap = () => {
    if (typeof window.navigateTo !== 'function' || window.__auroraVTWrapped) return;
    if (typeof document.startViewTransition !== 'function') {
      window.__auroraVTWrapped = true; // mark "wrap not needed"
      return;
    }
    const original = window.navigateTo;
    window.navigateTo = function (pageId, ...rest) {
      try {
        return document.startViewTransition(() => original.call(this, pageId, ...rest));
      } catch (_) {
        return original.call(this, pageId, ...rest);
      }
    };
    window.__auroraVTWrapped = true;
  };

  let tries = 0;
  const t = setInterval(() => {
    tryWrap();
    if (++tries > 12 || window.__auroraVTWrapped) clearInterval(t);
  }, 200);
  tryWrap();
})();
