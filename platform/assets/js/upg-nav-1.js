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

  window.Upg = window.Upg || {};
  window.Upg.nav = Object.freeze({
    collapse, expand, toggle, isCollapsed,
    openDrawer, closeDrawer, toggleDrawer
  });
})();
