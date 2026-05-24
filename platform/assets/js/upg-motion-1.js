/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-motion-1.js
   Extracted from app.js lines 14213-14287
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Cursor glow on .u-card-glow ────────────────────────────────────────
  const wireCursorGlow = () => {
    if (reduceMotion()) return;
    document.addEventListener('pointermove', (e) => {
      const card = e.target && e.target.closest && e.target.closest('.u-card-glow');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }, { passive: true });
  };

  // ─── Stagger-reveal observer ────────────────────────────────────────────
  const reveal = (root) => {
    const scope = root || document;
    const list = scope.querySelectorAll('[data-reveal]:not([data-revealed="true"])');
    if (!list.length) return;

    if (!('IntersectionObserver' in window) || reduceMotion()) {
      list.forEach((el) => { el.dataset.revealed = 'true'; });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      let i = 0;
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const delay = Math.min(i++ * 35, 280);
        en.target.style.transitionDelay = `${delay}ms`;
        en.target.dataset.revealed = 'true';
        io.unobserve(en.target);
      });
    }, { threshold: 0.12 });
    list.forEach(el => io.observe(el));
  };

  // ─── Auto-tag eligible nodes for reveal + glow + lift ───────────────────
  const refreshGlow = (root) => {
    const scope = root || document;
    // Bento direct children get reveal + lift + glow
    scope.querySelectorAll('.bento > *:not([data-aurora-tagged])').forEach(n => {
      n.setAttribute('data-reveal', '');
      n.classList.add('u-lift', 'u-card-glow');
      n.dataset.auroraTagged = '1';
    });
    // Cathedral cards / stat tiles / surface cards
    scope.querySelectorAll('.cath-stat:not([data-aurora-tagged]), .cath-dash-card:not([data-aurora-tagged]), .stat-tile:not([data-aurora-tagged]), .surface-card:not([data-aurora-tagged])').forEach(n => {
      n.classList.add('u-lift', 'u-card-glow');
      n.dataset.auroraTagged = '1';
    });
    // Quick action buttons get press feedback
    scope.querySelectorAll('.cath-quick-action:not([data-aurora-tagged]), .dock-btn:not([data-aurora-tagged])').forEach(n => {
      n.classList.add('u-press');
      n.dataset.auroraTagged = '1';
    });
  };

  const init = () => {
    refreshGlow();
    wireCursorGlow();
    reveal();
    // Re-tag on lazy mounts (heavy pages) and state updates
    window.addEventListener('upg:lazy-mount', () => { refreshGlow(); reveal(); });
    window.addEventListener('upg:state-update', () => { refreshGlow(); reveal(); });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else setTimeout(init, 50);

  window.Upg = window.Upg || {};
  window.Upg.motion = Object.freeze({ reveal, refreshGlow });
})();
