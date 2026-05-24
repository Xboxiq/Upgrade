/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-49.js
   Extracted from app.js lines 18142-18311
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  // Idempotency + Phase-1 dependency guard
  if (!window.Upg || !window.Upg.ritual) return;
  if (window.Upg.ritual._atmosphereInstalled) return;

  var STORAGE_DISABLED = 'upg_ritual_atmo_disabled';
  var STORAGE_OVERRIDE = 'upg_ritual_atmo_override';

  // Frozen atmosphere catalogue. Ranges are decimal hours [start, end);
  // isha wraps midnight → encoded as [19.5, 28.5] (28.5 == 04:30 next day).
  var ATMOSPHERES = Object.freeze({
    dawn:     { ar: 'فَجْر',   range: [4.5, 7.0]   },
    forenoon: { ar: 'ضُحى',   range: [7.0, 13.0]  },
    asr:      { ar: 'عَصْر',   range: [13.0, 17.0] },
    maghrib:  { ar: 'مَغْرِب', range: [17.0, 19.5] },
    isha:     { ar: 'عِشاء',  range: [19.5, 28.5] }
  });

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); return true; } catch (e) { return false; }
  }
  function safeRemove(key) {
    try { localStorage.removeItem(key); return true; } catch (e) { return false; }
  }

  function detectAtmosphere() {
    var now = new Date();
    var h = now.getHours() + now.getMinutes() / 60;
    var ids = Object.keys(ATMOSPHERES);
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      var range = ATMOSPHERES[id].range;
      var start = range[0];
      var end = range[1];
      if (end > 24) {
        // Wraps midnight (isha)
        if (h >= start || h < (end - 24)) return id;
      } else {
        if (h >= start && h < end) return id;
      }
    }
    return 'isha'; // safety fallback (shouldn't reach with isha wrap)
  }

  function isDisabled() {
    return safeGet(STORAGE_DISABLED) === '1';
  }

  function getOverride() {
    var v = safeGet(STORAGE_OVERRIDE);
    return (v && ATMOSPHERES[v]) ? v : null;
  }

  function apply(atmoId) {
    if (!ATMOSPHERES[atmoId]) atmoId = 'forenoon';
    if (document.body.getAttribute('data-rit-time') !== atmoId) {
      document.body.setAttribute('data-rit-time', atmoId);
      try {
        document.dispatchEvent(new CustomEvent('upg:ritual:atmosphere:change', {
          detail: { atmosphere: atmoId, ar: ATMOSPHERES[atmoId].ar }
        }));
      } catch (e) { /* legacy CustomEvent ctor */ }
    }
    return atmoId;
  }

  function setOverride(atmoId) {
    if (!ATMOSPHERES[atmoId]) {
      try { console.warn('[Upg.ritual.atmosphere] Unknown atmosphere:', atmoId); } catch (e) {}
      return false;
    }
    safeSet(STORAGE_OVERRIDE, atmoId);
    apply(atmoId);
    return true;
  }

  function clearOverride() {
    safeRemove(STORAGE_OVERRIDE);
    return refresh();
  }

  function refresh() {
    if (isDisabled()) {
      if (document.body.hasAttribute('data-rit-time')) {
        document.body.removeAttribute('data-rit-time');
      }
      return null;
    }
    var override = getOverride();
    var atmoId = override || detectAtmosphere();
    apply(atmoId);
    return atmoId;
  }

  function disable() {
    safeSet(STORAGE_DISABLED, '1');
    document.body.removeAttribute('data-rit-time');
  }

  function enable() {
    safeRemove(STORAGE_DISABLED);
    return refresh();
  }

  function status() {
    var arabicMap = {};
    var keys = Object.keys(ATMOSPHERES);
    for (var i = 0; i < keys.length; i++) {
      arabicMap[keys[i]] = ATMOSPHERES[keys[i]].ar;
    }
    return Object.freeze({
      current: document.body.getAttribute('data-rit-time'),
      detected: detectAtmosphere(),
      override: getOverride(),
      disabled: isDisabled(),
      atmospheres: arabicMap
    });
  }

  function list() {
    return Object.keys(ATMOSPHERES).slice();
  }

  function listArabic() {
    var arabicMap = {};
    var keys = Object.keys(ATMOSPHERES);
    for (var i = 0; i < keys.length; i++) {
      arabicMap[keys[i]] = ATMOSPHERES[keys[i]].ar;
    }
    return arabicMap;
  }

  // Initial apply (DOMContentLoaded-safe)
  if (document.readyState !== 'loading') {
    refresh();
  } else {
    document.addEventListener('DOMContentLoaded', refresh, { once: true });
  }

  // Re-check every 20 minutes (handles transitions like maghrib → isha mid-session)
  var REFRESH_INTERVAL_MS = 20 * 60 * 1000;
  setInterval(refresh, REFRESH_INTERVAL_MS);

  // Re-check when user returns from another tab / wake from sleep
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) refresh();
  });

  // Extend Upg.ritual surface (additive; preserves Phases 1-4 verbatim)
  window.Upg.ritual.atmosphere = Object.freeze({
    detect: detectAtmosphere,
    apply: apply,
    set: setOverride,
    clearOverride: clearOverride,
    refresh: refresh,
    disable: disable,
    enable: enable,
    status: status,
    list: list,
    listArabic: listArabic
  });

  window.Upg.ritual._atmosphereInstalled = true;

})(window, document);
