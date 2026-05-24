/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-transition-1.js
   Extracted from app.js lines 14741-14801
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const supports = typeof document.startViewTransition === 'function';

  const playFallback = () => {
    requestAnimationFrame(() => {
      const target = document.querySelector('.page.active');
      if (!target) return;
      target.classList.remove('is-entering');
      // Force reflow so we can re-add the class and trigger animation
      // eslint-disable-next-line no-unused-expressions
      void target.offsetWidth;
      target.classList.add('is-entering');
      target.addEventListener('animationend', () => {
        target.classList.remove('is-entering');
      }, { once: true });
    });
  };

  const navigate = (pageId) => {
    if (typeof window.navigateTo !== 'function' || !pageId) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (supports && !reduced) {
      try {
        const vt = document.startViewTransition(() => { window.navigateTo(pageId); });
        if (vt && vt.finished && typeof vt.finished.finally === 'function') {
          vt.finished.finally(() => {
            if (window.Upg && window.Upg.choreo && window.Upg.choreo.refresh) {
              window.Upg.choreo.refresh();
            }
          });
        }
        return;
      } catch (_) { /* fall through to fallback */ }
    }

    window.navigateTo(pageId);
    if (!reduced) playFallback();
    if (window.Upg && window.Upg.choreo && window.Upg.choreo.refresh) {
      window.Upg.choreo.refresh();
    }
  };

  // Click delegation for [data-page] elements without inline onclick.
  // We do NOT preventDefault on the legacy onclick path — it self-handles.
  document.addEventListener('click', (e) => {
    const el = e.target.closest && e.target.closest('[data-page]');
    if (!el) return;
    const page = el.dataset.page;
    if (!page || page === 'none' || page === '') return;
    if (el.hasAttribute('onclick')) return; // legacy path
    e.preventDefault();
    navigate(page);
  });

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.transition = Object.freeze({ navigate, supports });
})();
