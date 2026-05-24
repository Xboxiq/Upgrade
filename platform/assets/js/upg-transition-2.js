/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-transition-2.js
   Extracted from app.js lines 15347-15481
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  const ut = window.Upg && window.Upg.transition;
  if (!ut || typeof ut.navigate !== 'function') return; // Silent skip.

  /* ── Variant registry ─────────────────────────────────────────────────── */
  const VARIANTS = {
    'fade':           '',                                  // legacy default (W14)
    'depth-shallow':  'page-transition--depth-shallow',
    'depth-mid':      'page-transition--depth-mid',
    'depth-deep':     'page-transition--depth-deep',
    'slide-rtl':      'page-transition--slide-rtl',
    'slide-ltr':      'page-transition--slide-ltr',
    'morph':          'page-transition--morph'
  };
  const ALL_CLASSES = Object.values(VARIANTS).filter(Boolean);

  const isReduced = () => {
    try { return matchMedia('(prefers-reduced-motion: reduce)').matches; }
    catch (_) { return false; }
  };

  /* ── Direction-aware variant resolution ──────────────────────────────────
     If caller asks for slide without explicit RTL/LTR, pick by document dir.
     Platform is RTL by default → slide-rtl. ─────────────────────────────── */
  const resolveVariant = (depth, direction) => {
    if (depth === 'slide') {
      const dir = direction || (document.documentElement.getAttribute('dir') || 'rtl').toLowerCase();
      return dir === 'ltr' ? 'slide-ltr' : 'slide-rtl';
    }
    return depth;
  };

  /* ── Apply class to active page; auto-cleanup after animation ──────────── */
  const applyVariant = (variant) => {
    const cls = VARIANTS[variant];
    if (!cls) return; // 'fade' or unknown → no class.
    const target = document.querySelector('.page.active') || document.body;
    if (!target) return;
    // Wipe any prior cinematic class so the new one wins cleanly.
    ALL_CLASSES.forEach(c => target.classList.remove(c));
    // Force reflow to retrigger animation when same class re-applied rapidly.
    void target.offsetWidth;
    target.classList.add(cls);
    let cleared = false;
    const cleanup = () => {
      if (cleared) return;
      cleared = true;
      target.classList.remove(cls);
      target.removeEventListener('animationend', cleanup);
    };
    target.addEventListener('animationend', cleanup, { once: true });
    setTimeout(cleanup, 1400); // safety net if animationend doesn't fire
  };

  /* ── Session default (mutable via setDefault) ─────────────────────────── */
  let defaultDepth = 'fade';
  const setDefault = (opts) => {
    if (!opts) return;
    const d = resolveVariant(opts.depth, opts.direction);
    if (d && VARIANTS[d] !== undefined) defaultDepth = d;
  };

  /* ── Wrapped navigate — accepts optional 2nd arg ──────────────────────── */
  const originalNavigate = ut.navigate.bind(ut);
  const navigate = (pageId, opts) => {
    if (!pageId) return;
    opts = opts || {};
    const variant = resolveVariant(opts.depth, opts.direction) || defaultDepth;
    const result = originalNavigate(pageId);
    if (!isReduced() && variant && variant !== 'fade' && VARIANTS[variant] !== undefined) {
      // Defer one tick so the new .page.active reflects the navigation.
      setTimeout(() => applyVariant(variant), 0);
    }
    return result;
  };

  /* ── run(name, opts) — convenience alias matching Phase-3 spec ────────── */
  const run = (name, opts) => {
    opts = opts || {};
    if (name === 'page' && opts.target) {
      return navigate(opts.target, opts);
    }
    // Apply variant on currently-active page (no navigation).
    const variant = resolveVariant(opts.depth, opts.direction);
    if (!isReduced() && variant && variant !== 'fade' && VARIANTS[variant] !== undefined) {
      applyVariant(variant);
    }
  };

  /* ── Variant introspection ────────────────────────────────────────────── */
  const variants = () => Object.keys(VARIANTS);

  /* ── Replace frozen object with extended frozen object ────────────────── */
  window.Upg.transition = Object.freeze({
    navigate: navigate,
    supports: ut.supports,
    run: run,
    variants: variants,
    setDefault: setDefault
  });

  /* ── Parallax engine ──────────────────────────────────────────────────── */
  let parallaxRAF = 0;
  const PARALLAX_FACTOR = 0.04;
  const PARALLAX_CAP = 24; // ±px

  const tickParallax = () => {
    parallaxRAF = 0;
    if (isReduced()) {
      document.documentElement.style.setProperty('--parallax-y', '0px');
      return;
    }
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const py = Math.max(-PARALLAX_CAP, Math.min(PARALLAX_CAP, -y * PARALLAX_FACTOR));
    document.documentElement.style.setProperty('--parallax-y', py.toFixed(2) + 'px');
  };

  const onScroll = () => {
    if (parallaxRAF) return;
    parallaxRAF = requestAnimationFrame(tickParallax);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Reset on page navigation (avoid stale offset on new page).
  document.addEventListener('upg:nav:change', () => {
    document.documentElement.style.setProperty('--parallax-y', '0px');
  });

  // Initial settle.
  tickParallax();
})(window, document);
