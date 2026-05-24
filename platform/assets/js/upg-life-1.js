/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-life-1.js
   Extracted from app.js lines 15122-15173
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  const VALID_MODES = ['ambient', 'mesh', 'breathing', 'surface', 'none'];
  const ATTR = 'data-life';

  // Apply a life mode to an element (or selector).
  const set = (target, mode) => {
    if (!VALID_MODES.includes(mode)) {
      console.warn('[Upg.life] Invalid mode:', mode, '— expected one of', VALID_MODES);
      return false;
    }
    const el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el || !el.setAttribute) return false;
    el.setAttribute(ATTR, mode);
    return true;
  };

  // Remove life mode (resets to inherited).
  const clear = (target) => {
    const el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el || !el.removeAttribute) return false;
    el.removeAttribute(ATTR);
    return true;
  };

  // Get current mode of an element.
  const get = (target) => {
    const el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el || !el.getAttribute) return null;
    return el.getAttribute(ATTR);
  };

  // List all valid modes (for command palette / debugging).
  const list = () => VALID_MODES.slice();

  // Audit — count active life elements on the page.
  const audit = () => {
    const counts = { total: 0 };
    VALID_MODES.forEach((m) => {
      const n = document.querySelectorAll('[' + ATTR + '="' + m + '"]').length;
      counts[m] = n;
      counts.total += n;
    });
    return counts;
  };

  // Auto-init: nothing to wire (CSS does the work).
  // Expose API (additive — preserves the 20 existing Upg.* APIs).
  window.Upg = window.Upg || {};
  window.Upg.life = { set, clear, get, list, audit };
})(window, document);
