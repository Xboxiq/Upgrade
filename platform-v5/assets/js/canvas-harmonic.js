/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — γ3 — Canvas Harmonic runtime
   ────────────────────────────────────────────────────────────────────────
   Listens to navigation events; sets data-active-route on <html>.
   CSS (canvas-harmonic.css) does the per-route shift via @layer base.

   The Pulse — GLOW_PULSE:
     The canvas hue drifts ≤ 1% toward the active dock destination over
     --duration-zen (640ms). The shift is per-route, accumulated in CSS
     custom properties (--canvas-shift-h/s/l). User won't notice per-screen;
     after a long session in 'lab', the canvas leans toward blue-cyan.

   API: Upg.canvas.setRoute(routeKey) / .currentRoute() / .ROUTES
   Classic IIFE — mobile-safe.
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  window.Upg = window.Upg || {};

  const ROUTES = Object.freeze(['home', 'lab', 'centre', 'progress', 'more']);
  const VALID = new Set(ROUTES);

  let currentRoute = 'home';

  // ── Apply route to <html> ──────────────────────────────────────────
  function apply(route) {
    if (!VALID.has(route)) return false;
    const root = document.documentElement;
    if (!root) return false;
    if (root.getAttribute('data-active-route') === route) return true;
    root.setAttribute('data-active-route', route);
    currentRoute = route;
    document.dispatchEvent(new CustomEvent('upg:canvas:route', {
      bubbles: true,
      detail: { route: route }
    }));
    return true;
  }

  // ── Public API ─────────────────────────────────────────────────────
  function setRoute(route) { return apply(route); }
  function getRoute() { return currentRoute; }


  // ── Boot ───────────────────────────────────────────────────────────
  function deriveFromHash() {
    const hash = (window.location.hash || '#home').slice(1);
    const route = hash.split('?')[0] || 'home';
    return VALID.has(route) ? route : 'home';
  }

  function boot() {
    // Initial route — derive from URL hash, fallback to 'home'
    apply(deriveFromHash());

    // Listen to hash changes (which the dock items use)
    window.addEventListener('hashchange', function () {
      apply(deriveFromHash());
    });

    // Listen to dock state events — though the route is hash-driven,
    // a direct `Upg.dock.setActive(...)` call (without hashchange) should
    // still update the canvas. We monitor that via `upg:canvas:route` events
    // dispatched by callers, OR by checking active dock item periodically.
    document.addEventListener('upg:dock:state', function () {
      const dockEl = document.querySelector('.dock');
      if (!dockEl) return;
      const active = dockEl.querySelector('[aria-current="page"]');
      if (active) {
        const r = active.getAttribute('data-route');
        if (r) apply(r);
      }
    });
  }


  // ── Idempotent surface registration ─────────────────────────────────
  if (!window.Upg.canvas) {
    window.Upg.canvas = Object.freeze({
      setRoute: setRoute,
      currentRoute: getRoute,
      ROUTES: ROUTES,
      _meta: Object.freeze({
        version: 'tadaffuq-v5/γ3',
        pulse: 'GLOW_PULSE'
      })
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    queueMicrotask(boot);
  }

})();
