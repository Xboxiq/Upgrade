/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-layer-2.js
   Extracted from app.js lines 18689-18874
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.layer) return;
  if (window.Upg.layer._p2_installed) return;

  const LAYERS = ['reset', 'tokens', 'base', 'utilities',
                  'components', 'themes', 'overrides'];
  const PHASE_TARGET = 310;
  const PHASE_ALARM  = 315;

  /* ─── Helper: detect rule kind from selectorText ──────────────────── */
  const detectKind = function (selectorText) {
    if (!selectorText) return 'other';
    const s = String(selectorText);
    if (/\.u-[a-z0-9-]+/.test(s) && !/\.u-prose/.test(s)) return 'utility';
    if (/\[hidden\]/.test(s)) return 'hidden_attr';
    if (/data-rit-halo="active"/.test(s) && /\[data-rit-halo-target\]/.test(s)) return 'halo_target';
    if (/\[data-life="none"\]/.test(s) || /\.rit-ink-bare/.test(s)) return 'opt_out';
    if (/body\.is-hidden/.test(s)) return 'state_pause';
    return 'other';
  };

  /* ─── Helper: classify @media condition into a category ───────────── */
  const detectCategory = function (mediaText) {
    if (!mediaText) return 'other';
    const m = String(mediaText);
    if (/prefers-reduced-motion[^,]*reduce/.test(m)) return 'reduced_motion';
    if (/\bprint\b/.test(m)) return 'print';
    if (/prefers-reduced-transparency[^,]*reduce/.test(m)) return 'reduced_transparency';
    if (/forced-colors[^,]*active/.test(m)) return 'forced_colors';
    if (/pointer\s*:\s*coarse/.test(m) || /hover\s*:\s*none/.test(m)) return 'pointer_coarse';
    if (/max-width|min-width/.test(m)) return 'responsive';
    return 'other';
  };

  /* ─── Walk all stylesheets and tally !important ───────────────────── */
  const auditImportant = function () {
    const result = {
      total: 0,
      byLayer: {
        reset: 0, tokens: 0, base: 0, utilities: 0,
        components: 0, themes: 0, overrides: 0, unknown: 0
      },
      byCategory: {
        reduced_motion: 0, print: 0, reduced_transparency: 0,
        forced_colors: 0, pointer_coarse: 0, responsive: 0, other: 0
      },
      byKind: {
        utility: 0, hidden_attr: 0, halo_target: 0,
        opt_out: 0, state_pause: 0, other: 0
      },
      phase_target: PHASE_TARGET,
      phase_alarm: PHASE_ALARM,
      regressed: false
    };

    const tallyDecl = function (cssText, layerName, mediaStack) {
      if (!cssText) return;
      const matches = cssText.match(/!important/g);
      if (!matches) return;
      const n = matches.length;
      result.total += n;
      result.byLayer[LAYERS.indexOf(layerName) >= 0 ? layerName : 'unknown'] += n;
      // category from innermost media in stack (first matched non-other wins)
      let cat = 'other';
      for (let i = mediaStack.length - 1; i >= 0; i--) {
        const c = detectCategory(mediaStack[i]);
        if (c !== 'other') { cat = c; break; }
      }
      result.byCategory[cat] += n;
    };

    const walkRules = function (rules, layerName, mediaStack) {
      if (!rules) return;
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        try {
          /* @layer X { ... } block */
          if (typeof window.CSSLayerBlockRule !== 'undefined' &&
              rule instanceof window.CSSLayerBlockRule) {
            walkRules(rule.cssRules, rule.name || layerName, mediaStack);
            continue;
          }
          /* @media (...) { ... } block */
          if (typeof window.CSSMediaRule !== 'undefined' &&
              rule instanceof window.CSSMediaRule) {
            const mt = rule.conditionText ||
                       (rule.media && rule.media.mediaText) || '';
            walkRules(rule.cssRules, layerName, mediaStack.concat([mt]));
            continue;
          }
          /* @supports / @container / @scope — recurse with same media stack */
          if (rule.cssRules && rule.cssRules.length) {
            walkRules(rule.cssRules, layerName, mediaStack);
            continue;
          }
          /* style rule (CSSStyleRule) */
          if (rule.style && rule.cssText) {
            // Count !important declarations on this rule
            const ct = rule.cssText;
            const matches = ct.match(/!important/g);
            if (matches) {
              const n = matches.length;
              tallyDecl(ct, layerName, mediaStack);
              // Kind classification by selector
              const kind = detectKind(rule.selectorText || '');
              result.byKind[kind] = (result.byKind[kind] || 0) + n;
            }
          }
        } catch (_) { /* skip CORS-restricted rule */ }
      }
    };

    try {
      for (let s = 0; s < document.styleSheets.length; s++) {
        const sheet = document.styleSheets[s];
        try {
          walkRules(sheet.cssRules, 'unknown', []);
        } catch (_) { /* CORS-restricted sheet */ }
      }
    } catch (_) { /* no-op */ }

    result.regressed = result.total > PHASE_ALARM;
    return result;
  };

  /* ─── Updated status() — reflects Phase 2 target ──────────────────── */
  const prevLayer = window.Upg.layer;
  const prevList = prevLayer.list;
  const prevCascade = prevLayer.cascadeOrder;
  const prevAudit = prevLayer.audit;
  const prevStatus = prevLayer.status;

  const status = function () {
    const base = (typeof prevStatus === 'function') ? prevStatus() : {};
    return {
      declared: base.declared || prevCascade(),
      audit: base.audit || prevAudit(),
      cascade_active: true,
      important_count_target: PHASE_TARGET,
      important_count_alarm: PHASE_ALARM,
      phase: 'worker-23-phase-2',
      pack: 'v3-devotio'
    };
  };

  /* ─── Replace frozen object with extended frozen object ──────────── */
  try {
    window.Upg.layer = Object.freeze({
      list:           prevList,
      cascadeOrder:   prevCascade,
      audit:          prevAudit,
      status:         status,
      auditImportant: auditImportant,
      _installed:     true,
      _p2_installed:  true
    });
  } catch (_) { /* defensive — should not throw because we replace whole binding */ }

  /* ─── One-time boot log if !important regressed ───────────────────── */
  const bootLog = function () {
    try {
      const a = auditImportant();
      if (a.regressed) {
        console.warn(
          '%c🧹 DECONSTRUCTION v3 — !important regression: %d > alarm %d',
          'color:#EF4444; font-weight:bold;',
          a.total, PHASE_ALARM
        );
      } else if (a.total <= PHASE_TARGET) {
        console.info(
          '%c🧹 DECONSTRUCTION v3 — !important inventory: %d (target %d, intentional + categorized)',
          'color:#10B981; font-weight:bold;',
          a.total, PHASE_TARGET
        );
      }
    } catch (_) { /* no-op */ }
  };

  if (document.readyState !== 'loading') {
    setTimeout(bootLog, 0);
  } else {
    document.addEventListener('DOMContentLoaded', bootLog);
  }

})(window, document);
