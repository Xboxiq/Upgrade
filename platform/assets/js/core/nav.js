/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — core/nav.js
   ────────────────────────────────────────────────────────────────────────
   Sidebar collapse + mobile drawer + page navigation primitives.
   API-compatible with legacy upg-nav-1.js. ESM-true.
   Registered on window.Upg.nav only when legacy is absent.
   ════════════════════════════════════════════════════════════════════════ */

const KEY_COLLAPSED = 'upg_sidebar_collapsed';

function html() { return document.documentElement; }

export function isCollapsed() {
  return html().dataset.sidebar === 'collapsed';
}

export function collapse() {
  html().dataset.sidebar = 'collapsed';
  try { localStorage.setItem(KEY_COLLAPSED, '1'); } catch {}
}

export function expand() {
  html().dataset.sidebar = 'expanded';
  try { localStorage.setItem(KEY_COLLAPSED, '0'); } catch {}
}

export function toggle() {
  isCollapsed() ? expand() : collapse();
}

export function openDrawer() {
  html().dataset.sidebarMobile = 'open';
}

export function closeDrawer() {
  delete html().dataset.sidebarMobile;
}

export function toggleDrawer() {
  html().dataset.sidebarMobile === 'open' ? closeDrawer() : openDrawer();
}

// Page navigation (γ + δ5 will extend with View Transitions).
const navListeners = new Set();

export function to(pageId) {
  if (!pageId) return false;
  // Defer to legacy Upg.nav.to if available (will exist until β migrates it).
  const legacy = window.Upg && window.Upg.nav && window.Upg.nav.to;
  if (legacy && legacy !== to) {
    return legacy(pageId);
  }
  // Minimal ESM path used post-migration.
  document.body && (document.body.dataset.activePage = pageId);
  navListeners.forEach(fn => {
    try { fn(pageId); } catch (e) { console.error('[ÊLAN core/nav] listener', e); }
  });
  return true;
}

export function onChange(fn) {
  navListeners.add(fn);
  return () => navListeners.delete(fn);
}

export const nav = Object.freeze({
  collapse, expand, toggle, isCollapsed,
  openDrawer, closeDrawer, toggleDrawer,
  to, onChange,
});

if (typeof window !== 'undefined') {
  window.Upg = window.Upg || {};
  if (!window.Upg.nav) window.Upg.nav = nav;
}
