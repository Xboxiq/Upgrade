/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-layer-1.js
   Extracted from app.js lines 18506-18642
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  if (!window || !document) return;

  /* Idempotency guard — Phase 2-5 will EXTEND, not redefine */
  if (window.Upg && window.Upg.layer && window.Upg.layer._installed) return;

  const LAYERS = Object.freeze([
    'reset', 'tokens', 'base', 'utilities', 'components', 'themes', 'overrides'
  ]);

  /* ─── list() — known layer names in cascade order ──────────────── */
  const list = function () {
    return LAYERS.slice();
  };

  /* ─── cascadeOrder() — actual declared order from CSSOM ────────── */
  const cascadeOrder = function () {
    if (!document.styleSheets) return null;
    for (let i = 0; i < document.styleSheets.length; i++) {
      const sheet = document.styleSheets[i];
      let rules;
      try {
        rules = sheet.cssRules || sheet.rules;
      } catch (_) {
        /* CORS-restricted sheet, skip */
        continue;
      }
      if (!rules) continue;
      for (let j = 0; j < rules.length; j++) {
        const rule = rules[j];
        /* CSSLayerStatementRule has nameList; CSSLayerBlockRule has name */
        if (rule && rule.constructor && rule.constructor.name === 'CSSLayerStatementRule') {
          if (rule.nameList) return Array.from(rule.nameList);
        }
        /* Fallback for older browsers: type === 11 historically used for layer */
        if (rule && rule.cssText && rule.cssText.indexOf('@layer') === 0 &&
            rule.cssText.indexOf('{') === -1) {
          /* @layer X, Y, Z; statement form */
          const match = rule.cssText.match(/@layer\s+([^;]+);/);
          if (match) {
            return match[1].split(',').map(function (n) { return n.trim(); });
          }
        }
      }
    }
    return null;
  };

  /* ─── audit() — count rules per layer, mark populated ──────────── */
  const audit = function () {
    const result = {};
    LAYERS.forEach(function (name) {
      result[name] = { rules: 0, populated: false };
    });

    if (!document.styleSheets) {
      return { total: 0, byLayer: result };
    }

    const walk = function (rules) {
      if (!rules) return;
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (!rule) continue;
        const ctor = rule.constructor && rule.constructor.name;
        /* CSSLayerBlockRule: @layer X { ... } */
        if (ctor === 'CSSLayerBlockRule' && rule.name && LAYERS.indexOf(rule.name) >= 0) {
          const inner = rule.cssRules ? rule.cssRules.length : 0;
          result[rule.name].rules += inner;
          result[rule.name].populated = result[rule.name].populated || inner > 0;
          /* Recurse: nested @layer blocks possible in future phases */
          walk(rule.cssRules);
        }
      }
    };

    for (let i = 0; i < document.styleSheets.length; i++) {
      const sheet = document.styleSheets[i];
      try {
        walk(sheet.cssRules || sheet.rules);
      } catch (_) { /* CORS, skip */ }
    }

    let total = 0;
    LAYERS.forEach(function (n) { total += result[n].rules; });
    return { total: total, byLayer: result };
  };

  /* ─── status() — single-call snapshot for state files ──────────── */
  const status = function () {
    return {
      declared: cascadeOrder(),
      audit: audit(),
      cascade_active: true,
      important_count_target: 45,
      phase: 'worker-23-phase-1',
      pack: 'v3-devotio'
    };
  };

  window.Upg = window.Upg || {};
  window.Upg.layer = Object.freeze({
    list: list,
    cascadeOrder: cascadeOrder,
    audit: audit,
    status: status,
    _installed: true
  });

  /* ─── One-time boot log (only when at least one layer is populated) ── */
  const bootLog = function () {
    try {
      const a = audit();
      const populated = Object.keys(a.byLayer).filter(function (k) {
        return a.byLayer[k].populated;
      }).length;
      if (a.total > 0) {
        console.info(
          '%c🧱 DECONSTRUCTION v3 — @layer cascade active (%d rules across %d / %d layers)',
          'color:#FFB87A; font-weight:bold;',
          a.total,
          populated,
          LAYERS.length
        );
      }
    } catch (_) { /* no-op */ }
  };

  if (document.readyState !== 'loading') {
    bootLog();
  } else {
    document.addEventListener('DOMContentLoaded', bootLog);
  }

})(window, document);
