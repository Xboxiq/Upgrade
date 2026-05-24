/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-production-1.js
   Extracted from app.js lines 13672-13761
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  // ─── Console banner (only on first load, not on every navigation) ───
  const SHOWN_KEY = '__upg_banner_shown';
  if (!window[SHOWN_KEY]) {
    window[SHOWN_KEY] = true;
    try {
      console.log(
        '%cUpgrade Platform%c   Cathedral v14\n%cAll your data stays on your device. localStorage only.',
        'background:#0E1220;color:#66FCF1;padding:6px 14px;border-radius:6px;font-size:14px;font-weight:700;',
        'color:#999;font-size:12px;font-weight:500;',
        'color:#666;font-size:11px;'
      );
    } catch (e) { /* IE/old console */ }
  }

  // ─── Service Worker registration ───
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    const reg = () => {
      navigator.serviceWorker.register('./sw.js')
        .then(() => { /* registered */ })
        .catch((err) => console.warn('[SW] registration failed:', err));
    };
    if (document.readyState === 'complete') reg();
    else window.addEventListener('load', reg, { once: true });
  }

  // ─── Focus trap for overlays (cmdk, cheatsheet, gateway) ───
  const trapFocus = (container) => {
    if (!container || container.__focusTrapped) return;
    const focusableSel = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    container.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      // Skip if container is hidden
      if (container.hidden || container.getAttribute('aria-hidden') === 'true') return;
      const nodes = Array.from(container.querySelectorAll(focusableSel))
        .filter(n => !n.disabled && n.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last  = nodes[nodes.length - 1];
      const cur   = document.activeElement;
      if (e.shiftKey && cur === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
    });
    container.__focusTrapped = true;
  };
  const wireTraps = () => {
    ['#cmdk-palette', '#shortcut-cheatsheet', '#page-gateway'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) trapFocus(el);
    });
  };

  // ─── Skip link → main focus ───
  const wireSkipLink = () => {
    const link = document.querySelector('.u-skip-link');
    const main = document.getElementById('main');
    if (link && main) {
      link.addEventListener('click', (e) => {
        // Allow default jump, but also focus the main programmatically
        setTimeout(() => main.focus({ preventScroll: false }), 0);
      });
    }
  };

  // ─── Lazy-mount notification (Phase 7 spec optional hook) ───
  const HEAVY_PAGES = new Set(['lab', 'callcenter']);
  const _lazyMounted = new Set();
  window.addEventListener('upg:page-shown', (e) => {
    const page = e.detail?.page;
    if (HEAVY_PAGES.has(page) && !_lazyMounted.has(page)) {
      _lazyMounted.add(page);
      try { window.dispatchEvent(new CustomEvent('upg:lazy-mount', { detail: { page } })); }
      catch (err) { /* noop */ }
    }
  });

  const init = () => { wireTraps(); wireSkipLink(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Expose for debugging
  window.Upg = window.Upg || {};
  window.Upg.production = {
    version: 'cathedral-v14',
    cacheName: 'upgrade-cathedral-v14-1',
    swActive: () => !!navigator.serviceWorker?.controller
  };
})();
