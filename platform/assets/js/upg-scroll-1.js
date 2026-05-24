/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-scroll-1.js
   Extracted from app.js lines 13841-13883
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const SCROLL_THRESHOLD = 4;
  let raf = 0;
  let main, top, side;

  const refsValid = () => {
    main = main || document.getElementById('main');
    top  = top  || document.getElementById('topbar');
    side = side || document.getElementById('sidebar');
    return !!(main && top);
  };

  const update = () => {
    raf = 0;
    if (!refsValid()) return;
    const y = main.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;
    const scrolled = y > SCROLL_THRESHOLD;
    const value = String(scrolled);
    if (top.dataset.scrolled !== value)  top.dataset.scrolled  = value;
    if (side && side.dataset.scrolled !== value) side.dataset.scrolled = value;
  };

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  const wire = () => {
    if (!refsValid()) return;
    main.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire, { once: true });
  } else {
    wire();
  }

  window.Upg = window.Upg || {};
  window.Upg.scroll = Object.freeze({ update });
})();
