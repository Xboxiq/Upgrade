/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-focustrap-1.js
   Extracted from app.js lines 14822-14901
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const FOCUSABLE_SEL = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'audio[controls]',
    'video[controls]',
    'details > summary:first-of-type',
  ].join(',');

  const traps = new WeakMap();

  const getFocusables = (container) => {
    if (!container) return [];
    const all = container.querySelectorAll(FOCUSABLE_SEL);
    // Filter out invisible elements (display:none, hidden attr, etc.)
    return Array.from(all).filter((el) => {
      if (el.hasAttribute('hidden')) return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 || rect.height > 0 || el === document.activeElement;
    });
  };

  const enable = (container, returnFocusEl) => {
    if (!container || traps.has(container)) return;

    const handler = (e) => {
      if (e.key !== 'Tab') return;
      const items = getFocusables(container);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const escHandler = (e) => {
      if (e.key !== 'Escape') return;
      const closeBtn = container.querySelector('[data-close]');
      if (closeBtn) {
        e.stopPropagation();
        closeBtn.click();
      } else {
        container.dispatchEvent(new CustomEvent('focusTrap:escape', { bubbles: true }));
      }
    };

    container.addEventListener('keydown', handler);
    container.addEventListener('keydown', escHandler);
    traps.set(container, { handler, escHandler, returnFocusEl: returnFocusEl || null });

    // Send focus to first focusable on next tick (allow opening transition)
    requestAnimationFrame(() => {
      const items = getFocusables(container);
      if (items.length) items[0].focus();
    });
  };

  const disable = (container) => {
    const t = traps.get(container);
    if (!t) return;
    container.removeEventListener('keydown', t.handler);
    container.removeEventListener('keydown', t.escHandler);
    traps.delete(container);
    if (t.returnFocusEl && typeof t.returnFocusEl.focus === 'function') {
      try { t.returnFocusEl.focus(); } catch (_) {}
    }
  };

  window.Upg = window.Upg || {};
  window.Upg.focusTrap = { enable, disable };
})();
