/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-42.js
   Extracted from app.js lines 14329-14362
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const REQUIRED = [
    'theme', 'icons', 'gateway', 'calc', 'cmdk', 'state', 'production',
    'type', 'scroll', 'nav', 'identity', 'greet', 'countup', 'motion'
  ];

  const runSanity = () => {
    const upg = window.Upg || {};
    const missing = REQUIRED.filter((k) => !upg[k]);
    if (missing.length) {
      console.warn('[AURORA] missing Upg.* modules:', missing);
    }
    try {
      if (!sessionStorage.getItem('upg_aurora_banner')) {
        sessionStorage.setItem('upg_aurora_banner', '1');
        const present = REQUIRED.length - missing.length;
        const bg = 'background:#0E1220;color:#66FCF1;padding:4px 10px;border-radius:6px;font-weight:bold;';
        const dim = 'color:#94A3B8;';
        console.log(
          '%c AURORA v15 %c  منصة Upgrade — Apple-grade UI/UX  %c(%d/%d modules)',
          bg, '', dim, present, REQUIRED.length
        );
      }
    } catch (_) { /* sessionStorage may be blocked */ }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runSanity, { once: true });
  } else {
    // Defer slightly to allow other IIFEs to register before we measure.
    setTimeout(runSanity, 0);
  }
})();
