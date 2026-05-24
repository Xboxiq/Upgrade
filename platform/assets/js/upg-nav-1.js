/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-nav-1.js
   Extracted from app.js lines 13895-13955
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const KEY_COLLAPSED = 'upg_sidebar_collapsed';
  const html = document.documentElement;

  const applyCollapsed = (v) => {
    if (v) html.dataset.sidebar = 'collapsed';
    else   html.dataset.sidebar = 'expanded';
    try { localStorage.setItem(KEY_COLLAPSED, v ? '1' : '0'); } catch (_) {}
  };

  const isCollapsed = () => html.dataset.sidebar === 'collapsed';
  const collapse    = () => applyCollapsed(true);
  const expand      = () => applyCollapsed(false);
  const toggle      = () => applyCollapsed(!isCollapsed());

  const openDrawer  = () => { html.dataset.sidebarMobile = 'open'; };
  const closeDrawer = () => { delete html.dataset.sidebarMobile; };
  const toggleDrawer = () => {
    if (html.dataset.sidebarMobile === 'open') closeDrawer();
    else openDrawer();
  };

  // Restore prior state — but only if user previously chose explicitly
  try {
    const stored = localStorage.getItem(KEY_COLLAPSED);
    if (stored === '1') collapse();
    else if (stored === '0') expand();
  } catch (_) { /* noop */ }

  // Cmd+\ / Ctrl+\ — toggle collapse
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
      e.preventDefault();
      toggle();
    }
  });

  // Wire any element with data-action="toggle-sidebar" / "open-drawer" / "close-drawer"
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-action]');
    if (!t) return;
    const a = t.dataset.action;
    if (a === 'toggle-sidebar') { e.preventDefault(); toggle(); }
    else if (a === 'open-drawer')  { e.preventDefault(); openDrawer(); }
    else if (a === 'close-drawer') { e.preventDefault(); closeDrawer(); }
  });

  // Esc closes the mobile drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && html.dataset.sidebarMobile === 'open') {
      closeDrawer();
    }
  });

  /* ════════════════════════════════════════════════════════════════════
     DUAL-FORM v3 — Bottom Nav Sync (Worker 24 / Phase 2)
     ────────────────────────────────────────────────────────────────────
     Extends Upg.nav (W11) with:
       • updateBottomNavActive()  — mirror sidebar's active page on bottom nav.
       • handleBottomNavClick()   — route taps to navigateTo / Upg.cmdk / drawer.
     Falls back gracefully:
       • navigateTo missing → tries Upg.shards.mountShard({force:true}).
       • cmdk missing       → no-op, console.debug.
       • chrome missing     → falls back to Upg.nav.toggleDrawer.
     Sacred: existing W11/W14 sidebar/topbar surface untouched.
     ════════════════════════════════════════════════════════════════════ */

  const BOTTOM_NAV_SEL = '#dual-bottom-nav';

  const resolveActivePageId = () => {
    // Prefer explicitly active section (Cathedral nav adds .active)
    const active = document.querySelector('section.page.active[id^="page-"]');
    if (active) return active.id.replace(/^page-/, '');
    // Fallback: visible (not hidden) section
    const visible = document.querySelector('section.page:not([hidden])[id^="page-"]');
    if (visible) return visible.id.replace(/^page-/, '');
    return null;
  };

  const updateBottomNavActive = () => {
    const nav = document.querySelector(BOTTOM_NAV_SEL);
    if (!nav) return;
    const pageId = resolveActivePageId();
    nav.querySelectorAll('.dual-bottom-nav-item[data-page]').forEach((item) => {
      const match = pageId && item.getAttribute('data-page') === pageId;
      if (match) item.setAttribute('data-active', 'true');
      else       item.removeAttribute('data-active');
    });
  };

  const goToPage = (pageId) => {
    if (!pageId) return false;
    // 1. Existing global (preferred — handles sidebar sync, view-transitions, dashboard hooks)
    if (typeof window.navigateTo === 'function') {
      try { window.navigateTo(pageId); return true; } catch (_) { /* fall through */ }
    }
    // 2. Staged shard mount (W23 P4) — refused while inline present unless forced
    if (window.Upg && window.Upg.shards && typeof window.Upg.shards.mountShard === 'function') {
      try { window.Upg.shards.mountShard(pageId, { force: false }); } catch (_) {}
    }
    // 3. Last resort — scrollIntoView on the inline section
    const el = document.getElementById('page-' + pageId);
    if (el) {
      try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) { el.scrollIntoView(); }
      return true;
    }
    return false;
  };

  const handleBottomNavClick = (e) => {
    // 1) Page anchor (most common)
    const link = e.target.closest('.dual-bottom-nav-item[data-page]');
    if (link) {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      goToPage(pageId);
      // Close mobile drawer if it was peeked
      if (html.dataset.sidebarMobile === 'open') closeDrawer();
      // Reflect immediately (event will re-confirm later)
      requestAnimationFrame(updateBottomNavActive);
      return;
    }
    // 2) Action button
    const btn = e.target.closest('.dual-bottom-nav-item[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    if (action === 'cmdk-open') {
      e.preventDefault();
      if (window.Upg && window.Upg.cmdk && typeof window.Upg.cmdk.open === 'function') {
        try { window.Upg.cmdk.open(); } catch (_) {}
      } else {
        // graceful fallback — focus search if it exists
        const search = document.querySelector('[data-cmdk-trigger], #search-input, input[type="search"]');
        if (search) try { search.focus(); } catch (_) {}
      }
      return;
    }
    if (action === 'more-open') {
      e.preventDefault();
      // Prefer chrome drawer toggle if present, otherwise fall through to Upg.nav.toggleDrawer
      if (window.Upg && window.Upg.chrome && typeof window.Upg.chrome.openDrawer === 'function') {
        try { window.Upg.chrome.openDrawer(); return; } catch (_) {}
      }
      toggleDrawer();
      return;
    }
  };

  // Wire bottom nav (event delegation on document — works even if nav is added later)
  document.addEventListener('click', handleBottomNavClick);

  // Sync active state on page nav events fired by W11/W12/W14/W22 modules
  document.addEventListener('upg:nav:change', updateBottomNavActive);
  document.addEventListener('upg:shards:mounted', updateBottomNavActive);

  // First sync — when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateBottomNavActive, { once: true });
  } else {
    requestAnimationFrame(updateBottomNavActive);
  }

  window.Upg = window.Upg || {};
  window.Upg.nav = Object.freeze({
    collapse, expand, toggle, isCollapsed,
    openDrawer, closeDrawer, toggleDrawer,
    /* DUAL-FORM v3 / W24 P2 — bottom nav helpers (additive, do not break W11 surface) */
    syncBottomNav: updateBottomNavActive,
    goToPage: goToPage
  });
})();
