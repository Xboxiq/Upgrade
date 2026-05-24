/* ════════════════════════════════════════════════════════════════════════
   DUAL-FORM v3 — Bottom Nav Sync (Worker 24 / Phase 2)
   ESM side-effect module. Idempotent. Vanilla. Zero dependencies.

   Responsibilities:
     1. Mark body[data-bottom-nav="visible"] when on mobile (≤720px) so CSS
        can reserve scroll-padding for fixed bottom nav.
     2. Highlight active item in #dual-bottom-nav based on current page.
     3. Delegate clicks: data-shard → window.navigateTo(id) (graceful fallback
        chain to Upg.shards.mountShard / location.hash).
     4. Delegate buttons: cmdk-open → Upg.cmdk.open, more-open → Upg.nav.openDrawer.
     5. Sync on hashchange + DOMContentLoaded + upg:nav:change CustomEvent.

   Discipline:
     - Does NOT modify Upg.nav signature (W11 P5 surface preserved verbatim).
     - Does NOT register a new top-level Upg.* API (Phase 4 introduces Upg.touch).
     - Reduced-motion safe (CSS handles animation guards).
   ════════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  // Idempotent guard — re-importing the module is a no-op
  if (window.__upgBottomNavWired) return;
  window.__upgBottomNavWired = true;

  const NAV_SELECTOR = '#dual-bottom-nav';
  const ITEM_SELECTOR = '.dual-bottom-nav-item';
  const MOBILE_BREAKPOINT = '(max-width: 720px)';

  /* ── viewport flag ────────────────────────────────────────────────── */
  const mqMobile = window.matchMedia(MOBILE_BREAKPOINT);
  const setBodyFlag = () => {
    if (mqMobile.matches) {
      document.body.dataset.bottomNav = 'visible';
    } else {
      delete document.body.dataset.bottomNav;
    }
  };
  if (mqMobile.addEventListener) {
    mqMobile.addEventListener('change', setBodyFlag);
  } else if (mqMobile.addListener) {
    mqMobile.addListener(setBodyFlag); // Safari < 14
  }

  /* ── active-tab sync ──────────────────────────────────────────────── */
  const resolveActivePageId = () => {
    // Priority 1: visible inline page section
    const visiblePage = document.querySelector('section.page.active, section.page:not([hidden]):not([style*="display: none"])');
    if (visiblePage && visiblePage.id) {
      return visiblePage.id.replace(/^page-/, '');
    }
    // Priority 2: location.hash (#page-X)
    const m = (location.hash || '').match(/^#page-([a-z]+)/i);
    if (m) return m[1];
    // Priority 3: nav-item with .active class (legacy sidebar)
    const navActive = document.querySelector('.nav-item.active[data-page]');
    if (navActive) return navActive.dataset.page;
    return null;
  };

  const updateBottomNavActive = () => {
    const nav = document.querySelector(NAV_SELECTOR);
    if (!nav) return;
    const activeId = resolveActivePageId();
    nav.querySelectorAll(ITEM_SELECTOR + '[data-shard]').forEach((item) => {
      if (activeId && item.getAttribute('data-shard') === activeId) {
        item.setAttribute('data-active', 'true');
        item.setAttribute('aria-current', 'page');
      } else {
        item.removeAttribute('data-active');
        item.removeAttribute('aria-current');
      }
    });
  };

  /* ── navigation delegation ────────────────────────────────────────── */
  const navigateToPage = (pageId) => {
    if (!pageId) return false;
    // Preferred: existing legacy navigateTo (handles inline page show/hide,
    // nav-item active swap, View Transitions wrap).
    if (typeof window.navigateTo === 'function') {
      try { window.navigateTo(pageId); return true; }
      catch (e) { console.warn('[Upg.nav.bottom] navigateTo failed:', e); }
    }
    // Fallback 1: Upg.shards.mountShard (forward-compat for Phase 5 dynamic load)
    if (window.Upg && window.Upg.shards && typeof window.Upg.shards.mountShard === 'function') {
      try { window.Upg.shards.mountShard(pageId); return true; }
      catch (e) { /* swallow — try last fallback */ }
    }
    // Fallback 2: hash-based deep link (always works)
    location.hash = '#page-' + pageId;
    return true;
  };

  const openCmdk = () => {
    if (window.Upg && window.Upg.cmdk && typeof window.Upg.cmdk.open === 'function') {
      window.Upg.cmdk.open();
      return true;
    }
    return false;
  };

  const openMoreDrawer = () => {
    // Mobile drawer = sidebar on mobile
    if (window.Upg && window.Upg.nav) {
      if (typeof window.Upg.nav.openDrawer === 'function') {
        window.Upg.nav.openDrawer();
        return true;
      }
      if (typeof window.Upg.nav.toggleDrawer === 'function') {
        window.Upg.nav.toggleDrawer();
        return true;
      }
    }
    return false;
  };

  const handleBottomNavClick = (e) => {
    const item = e.target.closest('#dual-bottom-nav ' + ITEM_SELECTOR);
    if (!item) return;

    // Anchor with data-shard → page navigation
    const shardId = item.getAttribute('data-shard');
    if (shardId) {
      e.preventDefault();
      navigateToPage(shardId);
      return;
    }

    // Button with data-action → discrete action
    const action = item.getAttribute('data-action');
    if (!action) return;
    e.preventDefault();
    if (action === 'cmdk-open')  { openCmdk();      return; }
    if (action === 'more-open')  { openMoreDrawer(); return; }
  };

  /* ── wiring ───────────────────────────────────────────────────────── */
  document.addEventListener('click', handleBottomNavClick);
  document.addEventListener('upg:nav:change', updateBottomNavActive);
  window.addEventListener('hashchange', updateBottomNavActive);
  // Catch the legacy navigateTo path which doesn't dispatch upg:nav:change
  document.addEventListener('upg:page:change', updateBottomNavActive);

  const boot = () => {
    setBodyFlag();
    updateBottomNavActive();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
