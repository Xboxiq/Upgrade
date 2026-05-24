/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-font-2.js
   Extracted from app.js lines 16727-16844
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.font) return; // requires Phase 3

  // Selectors that need numeric discipline (real classes in this codebase
  // + forward-compat names from the phase spec)
  var NUM_SELECTORS = [
    '.qcalc-result-value', '.qcalc-value', '.qcalc-result', '.qcalc-output',
    '.stat-tile-value', '.cath-stat-value', '.bento-stat-value',
    '.kpi-card-value', '.kpi-hero-num',
    '[data-countup]', '[data-count-up]', '.count-up-value'
  ];

  var DISCIPLINE_CLASSES = [
    'tas-num-tabular',
    'tas-num-tabular-zero',
    'tas-num-hero',
    'tas-num-ticker',
    'tas-num-fraction',
    'tas-num-arabic'
  ];

  function hasDiscipline(el) {
    for (var i = 0; i < DISCIPLINE_CLASSES.length; i++) {
      if (el.classList.contains(DISCIPLINE_CLASSES[i])) return true;
    }
    return false;
  }

  // Apply discipline class if missing — picks the right variant for each kind
  function applyNumericDiscipline(root) {
    root = root || document;
    var counted = 0;
    NUM_SELECTORS.forEach(function (sel) {
      var nodes;
      try { nodes = root.querySelectorAll(sel); }
      catch (_) { return; }
      nodes.forEach(function (el) {
        if (hasDiscipline(el)) return;
        if (el.matches('[data-countup], [data-count-up], .count-up-value')) {
          el.classList.add('tas-num-ticker');
        } else if (el.matches('.kpi-hero-num, .stat-tile-value, .cath-stat-value, .bento-stat-value, .kpi-card-value')) {
          el.classList.add('tas-num-hero');
        } else {
          el.classList.add('tas-num-tabular');
        }
        counted++;
      });
    });
    return counted;
  }

  // Audit: how many numeric elements have discipline applied
  function auditNumericDiscipline() {
    var result = {};
    var totalAll = 0;
    var totalDis = 0;
    NUM_SELECTORS.forEach(function (sel) {
      var all, disciplined;
      try {
        all = document.querySelectorAll(sel);
        disciplined = document.querySelectorAll(
          DISCIPLINE_CLASSES.map(function (c) { return sel + '.' + c; }).join(',')
        );
      } catch (_) {
        result[sel] = { total: 0, disciplined: 0, error: true };
        return;
      }
      var t = all.length;
      var d = disciplined.length;
      totalAll += t;
      totalDis += d;
      result[sel] = { total: t, disciplined: d };
    });
    result.__total__ = {
      total: totalAll,
      disciplined: totalDis,
      coverage: totalAll === 0 ? 1 : (totalDis / totalAll)
    };
    return result;
  }

  // Extend Upg.font (additive — preserves Phase 3 frozen surface).
  // Object.freeze on Phase 3's Upg.font is shallow; we cannot add new keys
  // to a frozen object, so we replace it with an extended frozen surface
  // that preserves every prior method by reference.
  var prior = window.Upg.font;
  var extended = {};
  // Preserve all prior methods/values
  Object.keys(prior).forEach(function (k) { extended[k] = prior[k]; });
  // Add Phase 4 methods
  extended.applyNumericDiscipline = applyNumericDiscipline;
  extended.auditNumericDiscipline = auditNumericDiscipline;
  try { window.Upg.font = Object.freeze(extended); }
  catch (_) { window.Upg.font = extended; }

  // Auto-apply on DOM ready
  function autoApply() {
    try { applyNumericDiscipline(document); }
    catch (_) { /* noop */ }
  }
  if (document.readyState !== 'loading') {
    autoApply();
  } else {
    document.addEventListener('DOMContentLoaded', autoApply, { once: true });
  }

  // Re-apply on page navigation (Upg.nav fires this event from W12 P4)
  document.addEventListener('upg:nav:change', function () {
    // Slight delay so newly-shown DOM is rendered first
    window.setTimeout(autoApply, 50);
  });

  // Optional debug breadcrumb (no console noise unless explicitly enabled)
  if (window.__UPG_DEBUG__ && window.console && console.info) {
    console.info('[Upg.font] Phase 4 — numeric discipline ready');
  }
})(window, document);
