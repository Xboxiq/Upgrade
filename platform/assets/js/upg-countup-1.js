/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-countup-1.js
   Extracted from app.js lines 14125-14203
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const formatValue = (v, decimals, locale) => {
    if (decimals > 0) return v.toFixed(decimals);
    return Math.round(v).toLocaleString(locale || 'ar-IQ');
  };

  const parseTarget = (el) => {
    const raw = (el.dataset.countup && el.dataset.countup !== '' && el.dataset.countup !== '1')
      ? el.dataset.countup
      : el.textContent;
    const num = parseFloat(String(raw).replace(/[^\d.\-]/g, ''));
    return Number.isFinite(num) ? num : 0;
  };

  const run = (el, target, duration) => {
    if (!el) return;
    const tgt = (target == null) ? parseTarget(el) : Number(target);
    const dur = Number(duration) || 1100;
    const text = String(tgt);
    const decimals = (text.split('.')[1] || '').length;

    // Honor reduced-motion
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = formatValue(tgt, decimals);
      el.dataset.countupDone = '1';
      return;
    }

    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const v = tgt * easeOutCubic(t);
      el.textContent = formatValue(v, decimals);
      if (t < 1) requestAnimationFrame(tick);
      else el.dataset.countupDone = '1';
    };
    requestAnimationFrame(tick);
  };

  const observe = () => {
    const explicit = Array.from(document.querySelectorAll('[data-countup]'));
    // Also opt-in for cath-stat-value automatically
    const auto = Array.from(document.querySelectorAll('.cath-stat-value'))
      .filter(el => !el.hasAttribute('data-countup'));
    auto.forEach(el => el.setAttribute('data-countup', ''));
    const all = explicit.concat(auto);
    if (!all.length) return;

    if (!('IntersectionObserver' in window)) {
      all.forEach(el => run(el));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting || en.target.dataset.countupDone === '1') return;
        run(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.35 });
    all.forEach(el => io.observe(el));
  };

  const init = () => {
    observe();
    // Re-observe whenever a new page becomes active (lazy mount, navigation)
    window.addEventListener('upg:lazy-mount', observe);
    window.addEventListener('upg:state-update', observe);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else setTimeout(init, 100); // give Worker 11 state engine a moment to render

  window.Upg = window.Upg || {};
  window.Upg.countup = Object.freeze({ run, observe });
})();
