/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-aura-1.js
   Extracted from app.js lines 15882-15979
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  var AURAS = [
    'dashboard', 'callcenter', 'fieldsales', 'accountmgr', 'social',
    'lab', 'psych', 'eq', 'negotiation', 'customercare',
    'programming', 'accounting', 'phonerepair', 'hrmastery', 'myprogress'
  ];

  var ATTR = 'data-page-personality';
  var OVERRIDE_ATTR = 'data-aura-override';

  function isValid(name) {
    return typeof name === 'string' && AURAS.indexOf(name) !== -1;
  }

  function fire(name) {
    try {
      document.dispatchEvent(new CustomEvent('upg:aura:change', {
        detail: { aura: name }
      }));
    } catch (_) {}
  }

  /* Apply: forces body to wear `name` aura regardless of active page. */
  function apply(name) {
    if (!isValid(name)) {
      try {
        if (window.console && console.warn) {
          console.warn('[Upg.aura] Unknown aura:', name, '— available:', AURAS);
        }
      } catch (_) {}
      return false;
    }
    if (!document.body) return false;
    document.body.setAttribute(OVERRIDE_ATTR, name);
    document.body.setAttribute(ATTR, name);
    fire(name);
    return true;
  }

  /* Clear: pages return to their own personality (data-page-personality
     stays on each <section class="page">, so visual continuity is fine). */
  function clear() {
    if (!document.body) return false;
    if (document.body.hasAttribute(OVERRIDE_ATTR)) {
      document.body.removeAttribute(OVERRIDE_ATTR);
    }
    document.body.removeAttribute(ATTR);
    fire(null);
    return true;
  }

  /* Current: override → body attr → active page personality. */
  function current() {
    if (!document.body) return null;
    var override = document.body.getAttribute(OVERRIDE_ATTR);
    if (override) return override;
    var bodyAttr = document.body.getAttribute(ATTR);
    if (bodyAttr) return bodyAttr;
    var active = document.querySelector('.page.active');
    return active ? active.getAttribute(ATTR) : null;
  }

  /* List: returns a fresh copy so callers can't mutate internal state. */
  function list() {
    return AURAS.slice();
  }

  /* Preview: temporary apply, then restore previous override (or clear). */
  function preview(name, durationMs) {
    if (!isValid(name)) return false;
    var prev = document.body ? document.body.getAttribute(OVERRIDE_ATTR) : null;
    apply(name);
    var ms = Math.max(200, (typeof durationMs === 'number' && durationMs > 0)
      ? durationMs : 1200);
    setTimeout(function () {
      if (prev) {
        document.body.setAttribute(OVERRIDE_ATTR, prev);
        document.body.setAttribute(ATTR, prev);
        fire(prev);
      } else {
        clear();
      }
    }, ms);
    return true;
  }

  /* Public API — Object.freeze to lock surface area. */
  window.Upg = window.Upg || {};
  window.Upg.aura = Object.freeze({
    apply: apply,
    clear: clear,
    current: current,
    list: list,
    preview: preview
  });
})(window, document);
