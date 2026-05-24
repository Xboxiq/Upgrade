/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-chrome-1.js
   Extracted from app.js lines 14471-14603
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const html = document.documentElement;
  let sidebar = null;
  let pill    = null;

  const ensureRefs = () => {
    sidebar = sidebar || document.getElementById('sidebar');
    pill    = pill    || (sidebar && sidebar.querySelector('.nav-pill-indicator'));
    return !!sidebar;
  };

  // 1) Search button → command palette --------------------------------------
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="open-cmdk"]');
    if (!btn) return;
    e.preventDefault();
    if (window.Upg && window.Upg.cmdk && typeof window.Upg.cmdk.open === 'function') {
      window.Upg.cmdk.open();
    }
  });

  // 2) Pill indicator — slide to active nav-item ----------------------------
  const movePill = (targetItem) => {
    if (!ensureRefs() || !pill || !targetItem) return;
    const sb = sidebar.getBoundingClientRect();
    const it = targetItem.getBoundingClientRect();
    const top = (it.top - sb.top) + (sidebar.scrollTop || 0);
    pill.style.height    = it.height + 'px';
    pill.style.transform = 'translateY(' + top + 'px)';
    pill.classList.add('is-active');
    // Tell CSS to suppress the legacy ::before pill while JS pill is active
    html.dataset.sidebarPill = 'js';
  };

  const updatePillFromActive = () => {
    if (!ensureRefs()) return;
    const active = sidebar.querySelector('.nav-item.active');
    if (active) movePill(active);
  };

  // Watch for active class changes on nav-items
  const initPillObserver = () => {
    if (!ensureRefs() || !('MutationObserver' in window)) return;
    const items = sidebar.querySelectorAll('.nav-item');
    if (!items.length) return;
    const mo = new MutationObserver(updatePillFromActive);
    items.forEach((it) => {
      mo.observe(it, { attributes: true, attributeFilter: ['class'] });
    });
  };

  // Re-position pill on resize, theme change, sidebar collapse toggle
  const repositionEvents = ['resize'];
  repositionEvents.forEach((ev) =>
    window.addEventListener(ev, () => requestAnimationFrame(updatePillFromActive), { passive: true })
  );
  // Also reposition when sidebar collapse state attribute flips
  if ('MutationObserver' in window) {
    const htmlObs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.attributeName === 'data-sidebar' || m.attributeName === 'data-theme') {
          // Wait for CSS transition to settle, then snap pill position
          setTimeout(updatePillFromActive, 320);
          break;
        }
      }
    });
    htmlObs.observe(html, { attributes: true });
  }

  // 3) Mobile drawer — swipe-to-close (Upg.nav handles open/close core) -----
  let touchStartX = null;
  let touchStartY = null;
  const onTouchStart = (e) => {
    if (window.innerWidth > 980) return;
    if (html.dataset.sidebarMobile !== 'open') return;
    const t = e.touches && e.touches[0];
    if (!t) return;
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  };
  const onTouchEnd = (e) => {
    if (touchStartX === null) return;
    const t = e.changedTouches && e.changedTouches[0];
    if (!t) { touchStartX = null; return; }
    const dx = t.clientX - touchStartX;
    const dy = Math.abs(t.clientY - touchStartY);
    // Treat as horizontal swipe only (ignore mostly-vertical)
    if (dy < 40 && Math.abs(dx) > 60) {
      if (window.Upg && window.Upg.nav && typeof window.Upg.nav.closeDrawer === 'function') {
        window.Upg.nav.closeDrawer();
      } else {
        delete html.dataset.sidebarMobile;
      }
    }
    touchStartX = null;
    touchStartY = null;
  };

  const wireSwipe = () => {
    if (!ensureRefs()) return;
    sidebar.addEventListener('touchstart', onTouchStart, { passive: true });
    sidebar.addEventListener('touchend',   onTouchEnd,   { passive: true });
  };

  // 4) Boot -----------------------------------------------------------------
  const boot = () => {
    ensureRefs();
    initPillObserver();
    wireSwipe();
    // Initial pill placement after layout settles
    setTimeout(updatePillFromActive, 80);
    // Second pass once fonts/icons fully loaded (avoids early mis-measure)
    setTimeout(updatePillFromActive, 320);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  // Public API ---------------------------------------------------------------
  window.Upg = window.Upg || {};
  window.Upg.chrome = Object.freeze({
    init: boot,
    movePill: updatePillFromActive,
    openSearch: () => (window.Upg && window.Upg.cmdk && window.Upg.cmdk.open && window.Upg.cmdk.open()),
    closeDrawer: () => (window.Upg && window.Upg.nav && window.Upg.nav.closeDrawer && window.Upg.nav.closeDrawer())
  });
})();
