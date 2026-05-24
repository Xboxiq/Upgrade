/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-40.js
   Extracted from app.js lines 13963-13984
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const supported = typeof document.startViewTransition === 'function';

  sidebar.addEventListener('click', (e) => {
    const item = e.target.closest('.nav-item[data-page]');
    if (!item || item.classList.contains('active')) return;
    if (!supported) return; // existing handler will set active class normally

    // Pre-empt the default handler: we set active first inside a transition,
    // then dispatch a synthetic event so legacy navigation logic still runs.
    const previously = sidebar.querySelector('.nav-item.active');

    document.startViewTransition(() => {
      if (previously) previously.classList.remove('active');
      item.classList.add('active');
    });
  }, true);
})();
