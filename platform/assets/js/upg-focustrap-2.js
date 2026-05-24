/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-focustrap-2.js
   Extracted from app.js lines 14910-14952
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const SEL = '[role="dialog"], .modal, .qmodal, [data-modal]';

  const isOpen = (el) =>
    el.classList.contains('is-open') ||
    el.getAttribute('aria-modal') === 'true' ||
    (el.style && el.style.display && el.style.display !== 'none' && el.hasAttribute('data-modal-open'));

  const wire = (el) => {
    if (el.__atelierTrapWired) return;
    el.__atelierTrapWired = true;
    const observer = new MutationObserver(() => {
      const open = isOpen(el);
      if (open && !el.__atelierTrapped) {
        el.__atelierTrapped = true;
        const opener = document.activeElement && document.activeElement !== el && !el.contains(document.activeElement)
          ? document.activeElement
          : null;
        if (window.Upg && window.Upg.focusTrap) window.Upg.focusTrap.enable(el, opener);
      } else if (!open && el.__atelierTrapped) {
        el.__atelierTrapped = false;
        if (window.Upg && window.Upg.focusTrap) window.Upg.focusTrap.disable(el);
      }
    });
    observer.observe(el, { attributes: true, attributeFilter: ['class', 'style', 'aria-modal', 'data-modal-open'] });
  };

  const refresh = () => document.querySelectorAll(SEL).forEach(wire);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refresh, { once: true });
  } else {
    refresh();
  }
  // Re-scan periodically for SPA-injected modals (cheap)
  setTimeout(refresh, 1500);
  setTimeout(refresh, 4000);

  window.Upg = window.Upg || {};
  window.Upg.focusTrap = window.Upg.focusTrap || {};
  window.Upg.focusTrap.refresh = refresh;
})();
