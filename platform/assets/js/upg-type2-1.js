/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-type2-1.js
   Extracted from app.js lines 15049-15113
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const PERSONALITIES = [
    'dashboard', 'callcenter', 'fieldsales', 'accountmgr', 'social',
    'lab', 'psych', 'eq', 'negotiation', 'customercare',
    'programming', 'accounting', 'phonerepair', 'hrmastery', 'myprogress'
  ];

  const list = () => PERSONALITIES.slice();

  const getCurrentPage = () => {
    // Prefer .page.active, then aria-current, then first non-hidden .page
    return (
      document.querySelector('.page.active') ||
      document.querySelector('.page[aria-current="page"]') ||
      document.querySelector('.page:not([hidden])') ||
      document.querySelector('.page')
    );
  };

  const get = () => {
    const page = getCurrentPage();
    return page ? page.getAttribute('data-page-personality') : null;
  };

  const set = (name) => {
    if (!PERSONALITIES.includes(name)) {
      console.warn('[Upg.type2] Unknown personality:', name);
      return false;
    }
    const page = getCurrentPage();
    if (!page) return false;
    page.setAttribute('data-page-personality', name);
    document.dispatchEvent(new CustomEvent('upg:type:change', {
      detail: { personality: name, page: page.id }
    }));
    return true;
  };

  const fireForCurrent = () => {
    const page = getCurrentPage();
    if (!page) return;
    const current = page.getAttribute('data-page-personality');
    if (current) {
      document.dispatchEvent(new CustomEvent('upg:type:change', {
        detail: { personality: current, page: page.id }
      }));
    }
  };

  const observe = () => {
    // React to navigation events (existing nav system uses upg:nav:change)
    document.addEventListener('upg:nav:change', fireForCurrent);
    // Also react to hash changes as a fallback
    window.addEventListener('hashchange', fireForCurrent);
  };

  // Auto-init
  observe();

  // Expose API (additive — preserves the 19 existing Upg.* APIs)
  window.Upg = window.Upg || {};
  window.Upg.type2 = { get, set, list, observe };
})();
