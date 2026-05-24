/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-identity-1.js
   Extracted from app.js lines 13997-14058
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const html = document.documentElement;

  const setTint = (page) => {
    const slug = (page || 'dashboard').toString().replace(/^page-/, '');
    if (html.dataset.activeTint !== slug) html.dataset.activeTint = slug;
  };
  const getTint = () => html.dataset.activeTint || 'dashboard';

  const detectActive = () => {
    const a = document.querySelector('.page.active');
    if (a && a.id) setTint(a.id.replace(/^page-/, ''));
  };

  // Wrap window.navigateTo if defined
  const tryWrap = () => {
    if (typeof window.navigateTo !== 'function' || window.__auroraNavWrapped) return;
    const original = window.navigateTo;
    window.navigateTo = function (pageId, ...rest) {
      try { setTint(pageId); } catch (_) {}
      return original.call(this, pageId, ...rest);
    };
    window.__auroraNavWrapped = true;
  };

  // Mutation observer on main container watching for class="page active" toggles
  const wireObserver = () => {
    const main = document.getElementById('main') || document.body;
    if (!main) return;
    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          const t = m.target;
          if (t && t.classList && t.classList.contains('page') && t.classList.contains('active')) {
            setTint(t.id ? t.id.replace(/^page-/, '') : 'dashboard');
            return;
          }
        }
      }
    });
    obs.observe(main, { subtree: true, attributes: true, attributeFilter: ['class'] });
  };

  const init = () => {
    detectActive();
    tryWrap();
    wireObserver();
    // Retry wrap a few times because navigateTo may register after this IIFE
    let tries = 0;
    const retry = setInterval(() => {
      tryWrap();
      if (++tries > 10 || window.__auroraNavWrapped) clearInterval(retry);
    }, 200);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.Upg = window.Upg || {};
  window.Upg.identity = Object.freeze({ setTint, getTint });
})();
