/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-45.js
   Extracted from app.js lines 15003-15036
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const REQUIRED = [
    // Worker 11 (7)
    'theme', 'icons', 'gateway', 'calc', 'cmdk', 'state', 'production',
    // Worker 12 (7)
    'type', 'scroll', 'nav', 'identity', 'greet', 'countup', 'motion',
    // Worker 14 (5)
    'material', 'chrome', 'choreo', 'transition', 'focusTrap',
  ];

  const check = () => {
    const present = REQUIRED.filter((k) => window.Upg && typeof window.Upg[k] !== 'undefined');
    const missing = REQUIRED.filter((k) => !(window.Upg && typeof window.Upg[k] !== 'undefined'));
    if (missing.length === 0) {
      console.log(
        '%c🪞 ATELIER v16 — Cathedral v16 ready · ' + present.length + '/' + REQUIRED.length + ' modules loaded',
        'color:#66FCF1;font-weight:700;font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px;'
      );
    } else {
      console.warn(
        '[ATELIER v16] missing Upg modules (' + missing.length + '/' + REQUIRED.length + '):',
        missing.join(', ')
      );
    }
  };

  // Run after all other IIFEs have had a chance to register
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(check, 250);
  } else {
    window.addEventListener('load', () => setTimeout(check, 200), { once: true });
  }
})();
