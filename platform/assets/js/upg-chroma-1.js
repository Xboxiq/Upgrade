/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-chroma-1.js
   Extracted from app.js lines 16971-17133
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  /* ─── 12 Arabic palettes (mirror of Phase 1 forge) ─────────────────── */
  const PALETTES = Object.freeze([
    { id: 'lapis',     ar: 'لازوردي',  hue: 252, baseStop: 500, useFor: ['psych', 'myprogress'] },
    { id: 'damascus',  ar: 'دمشقي',    hue: 220, baseStop: 500, useFor: ['callcenter', 'negotiation'] },
    { id: 'henna',     ar: 'حنّاء',    hue: 28,  baseStop: 500, useFor: ['hrmastery', 'phonerepair'] },
    { id: 'saffron',   ar: 'زعفران',   hue: 78,  baseStop: 500, useFor: ['dashboard', 'curriculum'] },
    { id: 'palm',      ar: 'نَخيل',    hue: 130, baseStop: 500, useFor: ['accounting'] },
    { id: 'pearl',     ar: 'لُؤلؤ',    hue: 220, baseStop: 500, useFor: ['customercare'] },
    { id: 'indigo',    ar: 'نِيلي',    hue: 270, baseStop: 600, useFor: ['programming'] },
    { id: 'coral',     ar: 'مرجان',    hue: 28,  baseStop: 500, useFor: ['social'] },
    { id: 'silt',      ar: 'طمي',      hue: 60,  baseStop: 500, useFor: ['fieldsales'] },
    { id: 'cedar',     ar: 'أرز',      hue: 160, baseStop: 600, useFor: ['accountmgr'] },
    { id: 'mihrab',    ar: 'محراب',    hue: 280, baseStop: 600, useFor: ['eq', 'dark-base'] },
    { id: 'marble',    ar: 'رخام',     hue: 80,  baseStop: 500, useFor: ['lab'] }
  ]);

  /* ─── Page → palette mapping (mirror of CSS reassignment) ──────────── */
  const PAGE_TINTS = Object.freeze({
    'dashboard':    { color: 'saffron',  stop: 500 },
    'callcenter':   { color: 'damascus', stop: 500 },
    'fieldsales':   { color: 'silt',     stop: 500 },
    'accountmgr':   { color: 'cedar',    stop: 600 },
    'social':       { color: 'coral',    stop: 500 },
    'lab':          { color: 'marble',   stop: 500 },
    'psych':        { color: 'lapis',    stop: 500 },
    'eq':           { color: 'mihrab',   stop: 600 },
    'negotiation':  { color: 'damascus', stop: 700 },
    'customercare': { color: 'pearl',    stop: 500 },
    'programming':  { color: 'indigo',   stop: 600 },
    'accounting':   { color: 'palm',     stop: 500 },
    'phonerepair':  { color: 'henna',    stop: 600 },
    'hrmastery':    { color: 'henna',    stop: 500 },
    'myprogress':   { color: 'lapis',    stop: 400 },
    'curriculum':   { color: 'saffron',  stop: 600 }
  });

  /* ─── Public methods ───────────────────────────────────────────────── */

  // List palettes (immutable copy)
  const list = function () {
    return PALETTES.map(function (p) {
      return { id: p.id, ar: p.ar, hue: p.hue, baseStop: p.baseStop, useFor: p.useFor.slice() };
    });
  };

  // Get tint mapping for a page id (with or without "page-" prefix)
  const getPageTint = function (pageId) {
    if (typeof pageId !== 'string') return null;
    const stripped = pageId.replace(/^page-/, '');
    const entry = PAGE_TINTS[stripped];
    return entry ? { color: entry.color, stop: entry.stop } : null;
  };

  // Full mapping (defensive copy)
  const tints = function () {
    const out = {};
    Object.keys(PAGE_TINTS).forEach(function (k) {
      out[k] = { color: PAGE_TINTS[k].color, stop: PAGE_TINTS[k].stop };
    });
    return out;
  };

  // Audit which personalities in HTML have tint mappings
  const audit = function () {
    const pages = document.querySelectorAll('[data-page-personality]');
    const applied = [];
    const missing = [];
    pages.forEach(function (el) {
      const p = el.getAttribute('data-page-personality');
      if (!p) return;
      if (Object.prototype.hasOwnProperty.call(PAGE_TINTS, p)) applied.push(p);
      else missing.push(p);
    });
    return {
      total: pages.length,
      applied: Array.from(new Set(applied)),
      missing: Array.from(new Set(missing))
    };
  };

  // Computed --color-tint for currently visible page
  const getCurrentTint = function () {
    const candidates = document.querySelectorAll('section.page');
    let activePage = null;
    for (let i = 0; i < candidates.length; i++) {
      const el = candidates[i];
      if (!el.hasAttribute('hidden')) {
        const cs = window.getComputedStyle(el);
        if (cs.display !== 'none') { activePage = el; break; }
      }
    }
    if (!activePage) return null;
    const cs = window.getComputedStyle(activePage);
    return {
      pageId: activePage.id || null,
      personality: activePage.getAttribute('data-page-personality'),
      tint: cs.getPropertyValue('--color-tint').trim(),
      tintEdge: cs.getPropertyValue('--color-tint-edge').trim(),
      tintSoft: cs.getPropertyValue('--color-tint-soft').trim(),
      activeTint: cs.getPropertyValue('--chr-active-tint').trim()
    };
  };

  // Resolve any --chr-* (or any custom prop) to its computed value
  const resolveColor = function (cssVarName) {
    if (typeof cssVarName !== 'string' || !cssVarName.length) return '';
    if (!cssVarName.startsWith('--')) cssVarName = '--' + cssVarName;
    return window.getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim();
  };

  // Pack stage + theme status
  const status = function () {
    const rs = window.getComputedStyle(document.documentElement);
    const stripQuotes = function (s) { return s.replace(/^["']|["']$/g, ''); };
    return {
      stage:           stripQuotes(rs.getPropertyValue('--chr-stage').trim()),
      palettes_count:  stripQuotes(rs.getPropertyValue('--chr-palettes-count').trim()),
      stops_per:       stripQuotes(rs.getPropertyValue('--chr-stops-per-palette').trim()),
      pack:            stripQuotes(rs.getPropertyValue('--chr-pack').trim()),
      theme:           document.documentElement.getAttribute('data-theme') ||
                       document.body.getAttribute('data-theme') || 'unknown'
    };
  };

  /* ─── Expose API (additive, freeze public surface) ─────────────────── */
  window.Upg = window.Upg || {};
  window.Upg.chroma = Object.freeze({
    list: list,
    tints: tints,
    getPageTint: getPageTint,
    audit: audit,
    getCurrentTint: getCurrentTint,
    resolveColor: resolveColor,
    status: status,
    PALETTES: PALETTES,
    PAGE_TINTS: PAGE_TINTS
  });

  /* ─── One-time confirmation log on coverage ≥ 15 personalities ─────── */
  const logOnce = function () {
    try {
      const a = audit();
      if (a.applied.length >= 15) {
        console.info(
          '%c🎨 CHROMATIC SOUL v3 — %d Arabic palettes · %d pages assigned · theme: %s',
          'color:#7BBFFF; font-weight:bold;',
          PALETTES.length,
          a.applied.length,
          status().theme
        );
      }
    } catch (e) { /* swallow — never break boot */ }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', logOnce, { once: true });
  } else {
    logOnce();
  }
})(window, document);
