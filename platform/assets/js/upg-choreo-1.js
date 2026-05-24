/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-choreo-1.js
   Extracted from app.js lines 14618-14730
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Magnetic hover ------------------------------------------------------
  const MAGNET_RANGE = 80;
  const MAGNET_STRENGTH = 0.18;

  const magnetize = (el) => {
    if (!el || reduced || el.dataset.magnetized === 'true') return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > MAGNET_RANGE) return;
      const factor = (1 - dist / MAGNET_RANGE) * MAGNET_STRENGTH;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = 'translate(' + (dx * factor).toFixed(2) + 'px, ' + (dy * factor).toFixed(2) + 'px)';
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.dataset.magnetized = 'true';
  };

  // 2) Reveal on intersect -------------------------------------------------
  let revealIO = null;
  const reveal = () => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-revealed)');
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-revealed'));
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            revealIO.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    }
    els.forEach((el) => revealIO.observe(el));
  };

  // 3) Stagger children ---------------------------------------------------
  let staggerIO = null;
  const stagger = () => {
    const els = document.querySelectorAll('[data-stagger]:not(.is-staggered)');
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-staggered'));
      return;
    }
    if (!staggerIO) {
      staggerIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const step = parseInt(e.target.dataset.staggerStep || '60', 10);
          Array.from(e.target.children).forEach((child, i) => {
            child.style.setProperty('--stagger-delay', (i * step) + 'ms');
          });
          e.target.classList.add('is-staggered');
          staggerIO.unobserve(e.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    }
    els.forEach((el) => staggerIO.observe(el));
  };

  // 4) Cursor glow --------------------------------------------------------
  const cursorGlow = () => {
    if (reduced) return;
    document.addEventListener('mousemove', (e) => {
      const el = e.target.closest && e.target.closest('.u-cursor-glow');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--cx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--cy', (e.clientY - r.top) + 'px');
    }, { passive: true });
  };

  // 5) Refresh — re-applies all hooks for new DOM (post-navigation) -------
  const refresh = () => {
    document.querySelectorAll('[data-magnet]').forEach(magnetize);
    reveal();
    stagger();
  };

  // Boot
  const boot = () => { refresh(); cursorGlow(); };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.choreo = Object.freeze({ refresh, magnetize, reveal, stagger, cursorGlow });
})();
