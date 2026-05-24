/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-43.js
   Extracted from app.js lines 14371-14409
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const REQUIRED = [
    'theme', 'icons', 'gateway', 'calc', 'cmdk', 'state', 'production',
    'type', 'scroll', 'nav', 'identity', 'greet', 'countup', 'motion'
  ];

  // Wait until DOMContentLoaded so all earlier IIFEs have executed.
  const check = () => {
    const upg = window.Upg || {};
    const missing = REQUIRED.filter(k => !upg[k]);
    try {
      if (missing.length === 0) {
        // Success: log a one-shot banner (avoid spam on every visit).
        if (!sessionStorage.getItem('upg_v151_banner')) {
          sessionStorage.setItem('upg_v151_banner', '1');
          console.log(
            '%c AURORA v15.1 ',
            'background:#0E1220;color:#66FCF1;padding:4px 8px;border-radius:4px;font-weight:bold;',
            'كل الـ 14 modules محمّلين بنجاح'
          );
        }
      } else {
        console.warn(
          '%c AURORA v15.1 ',
          'background:#7c2d12;color:#fef3c7;padding:4px 8px;border-radius:4px;font-weight:bold;',
          'modules ناقصين:', missing
        );
      }
    } catch (_) { /* sessionStorage may be blocked */ }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', check, { once: true });
  } else {
    // DOM ready already; run on next tick to let any pending IIFE finish.
    setTimeout(check, 0);
  }
})();
