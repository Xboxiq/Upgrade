/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — γ1 — Floating Dock runtime
   ────────────────────────────────────────────────────────────────────────
   Builds the dock from a static config, mounts it inside #dock-mount,
   wires proximity-reveal (96px from bottom edge) and the active-dot,
   exposes Upg.dock API.

   The Pulse — DOCK_PULSE (proximity breath):
     watch mousemove on document; if pointer Y enters the bottom 96px band
     OR the mouse hovers the dock itself, set data-state="hover" on the
     dock element. CSS handles the rest. Throttled with requestAnimationFrame
     so we never thrash on rapid pointer motion.

   Classic IIFE. No ESM. Mobile-safe (mobile dock lands in γ2).
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  window.Upg = window.Upg || {};

  // ── Static config — the 5 dock items ────────────────────────────────
  const ITEMS = Object.freeze([
    { route: 'home',      label: 'الرَئيسية',  iconKey: 'navigation.home',         href: '#home' },
    { route: 'lab',       label: 'التَدريب',   iconKey: 'navigation.lab',          href: '#lab' },
    { route: 'centre',    label: 'الأوامر',    iconKey: 'navigation.centre',       href: '#centre', isAction: true },
    { route: 'progress',  label: 'التَقَدُّم',  iconKey: 'navigation.progress',     href: '#progress' },
    { route: 'more',      label: 'المَزيد',    iconKey: 'navigation.more',         href: '#more' }
  ]);

  // The proximity threshold, in CSS pixels from the bottom edge.
  const PROXIMITY_PX = 96;

  let dockEl = null;
  let isExpanded = false;
  let rafPending = false;
  let lastClientY = -1;


  // ── Build the dock DOM ──────────────────────────────────────────────
  function build() {
    const mount = document.getElementById('dock-mount');
    if (!mount) {
      console.warn('[Upg.dock] #dock-mount not found — dock skipped');
      return null;
    }

    const nav = document.createElement('nav');
    nav.className = 'dock';
    nav.setAttribute('aria-label', 'التَنَقُّل الرَئيسي');
    nav.setAttribute('data-state', 'rest');
    nav.setAttribute('role', 'navigation');

    ITEMS.forEach(function (item) {
      const a = document.createElement('a');
      a.className = 'dock-item';
      a.href = item.href;
      a.setAttribute('data-route', item.route);
      a.setAttribute('aria-label', item.label);

      // Icon — via the Upg.icons API (set up in α4)
      let iconEl;
      if (window.Upg.icons && window.Upg.icons.use) {
        iconEl = window.Upg.icons.use(item.iconKey);
      } else {
        // Defensive fallback if icons module hasn't booted yet.
        iconEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        iconEl.setAttribute('class', 'icon');
      }
      a.appendChild(iconEl);

      // Label
      const labelEl = document.createElement('span');
      labelEl.className = 'dock-label';
      labelEl.textContent = item.label;
      a.appendChild(labelEl);

      // The Press — feedback on click (already in CSS via :active)
      // No extra JS needed; CSS owns the press scale-down.

      nav.appendChild(a);
    });

    mount.removeAttribute('hidden');
    mount.removeAttribute('aria-hidden');
    mount.appendChild(nav);
    return nav;
  }


  // ── Proximity watcher — the DOCK_PULSE ───────────────────────────────
  function onPointerMove(ev) {
    lastClientY = ev.clientY;
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(function () {
      rafPending = false;
      if (!dockEl) return;
      const vh = window.innerHeight;
      const threshold = vh - PROXIMITY_PX;
      const wantExpanded = lastClientY >= threshold;
      if (wantExpanded !== isExpanded) {
        isExpanded = wantExpanded;
        dockEl.setAttribute('data-state', wantExpanded ? 'hover' : 'rest');
        dockEl.dispatchEvent(new CustomEvent('upg:dock:state', {
          bubbles: true,
          detail: { expanded: wantExpanded }
        }));
      }
    });
  }

  // When pointer leaves the window entirely, collapse.
  function onPointerLeave() {
    lastClientY = -1;
    if (dockEl && isExpanded) {
      isExpanded = false;
      dockEl.setAttribute('data-state', 'rest');
    }
  }


  // ── Public API ───────────────────────────────────────────────────────
  function show() {
    if (!dockEl) return;
    isExpanded = true;
    dockEl.setAttribute('data-state', 'hover');
  }

  function hide() {
    if (!dockEl) return;
    isExpanded = false;
    dockEl.setAttribute('data-state', 'rest');
  }

  function setActive(routeKey) {
    if (!dockEl) return false;
    const items = dockEl.querySelectorAll('.dock-item');
    let found = false;
    items.forEach(function (item) {
      if (item.getAttribute('data-route') === routeKey) {
        item.setAttribute('aria-current', 'page');
        found = true;
      } else {
        item.removeAttribute('aria-current');
      }
    });
    return found;
  }


  // ── Boot ────────────────────────────────────────────────────────────
  function boot() {
    dockEl = build();
    if (!dockEl) return;

    // Proximity-reveal — only on devices with a fine pointer (mouse/trackpad)
    const hasFinePointer = window.matchMedia
      ? window.matchMedia('(pointer: fine)').matches
      : true;
    if (hasFinePointer) {
      document.addEventListener('mousemove', onPointerMove, { passive: true });
      document.addEventListener('mouseleave', onPointerLeave, { passive: true });
    } else {
      // Touch devices: dock is always expanded; γ2 ships the mobile dock.
      dockEl.setAttribute('data-state', 'hover');
    }

    // Default active state — derived from current hash, fallback to 'home'
    const currentRoute = (window.location.hash || '#home').slice(1).split('?')[0] || 'home';
    setActive(currentRoute);
    window.addEventListener('hashchange', function () {
      const next = (window.location.hash || '#home').slice(1).split('?')[0] || 'home';
      setActive(next);
    });
  }


  // ── Surface registration (idempotent) ───────────────────────────────
  if (!window.Upg.dock) {
    window.Upg.dock = Object.freeze({
      show: show,
      hide: hide,
      setActive: setActive,
      isExpanded: function () { return isExpanded; },
      _meta: Object.freeze({
        version: 'tadaffuq-v5/γ1',
        items: ITEMS.map(function (i) { return i.route; })
      })
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    queueMicrotask(boot);
  }

})();
