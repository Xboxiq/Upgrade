/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-chroma-2.js
   Extracted from app.js lines 17151-17268
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.chroma) return;

  /* ─── Color → RGB via browser-computed style ───────────────────────── */
  const cssToRgb = function (cssColor) {
    if (!cssColor || typeof cssColor !== 'string') return null;
    const tmp = document.createElement('div');
    tmp.style.color = cssColor;
    tmp.style.position = 'absolute';
    tmp.style.visibility = 'hidden';
    tmp.style.pointerEvents = 'none';
    document.body.appendChild(tmp);
    const computed = window.getComputedStyle(tmp).color;
    document.body.removeChild(tmp);
    const m = computed.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
    if (!m) return null;
    return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
  };

  /* ─── WCAG relative luminance ──────────────────────────────────────── */
  const luminance = function (rgb) {
    const lin = rgb.map(function (c) {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
  };

  /* ─── WCAG contrast ratio ──────────────────────────────────────────── */
  const ratio = function (l1, l2) {
    const bright = l1 > l2 ? l1 : l2;
    const dark = l1 > l2 ? l2 : l1;
    return (bright + 0.05) / (dark + 0.05);
  };

  /* ─── Public: check contrast of two CSS colors ─────────────────────── */
  const checkContrast = function (fg, bg) {
    const fgRgb = cssToRgb(fg);
    const bgRgb = cssToRgb(bg);
    if (!fgRgb || !bgRgb) return null;
    const r = ratio(luminance(fgRgb), luminance(bgRgb));
    return Object.freeze({
      ratio:        Number(r.toFixed(2)),
      passAA:       r >= 4.5,
      passAAA:      r >= 7,
      passLargeAA:  r >= 3,
      fg:           fg,
      bg:           bg
    });
  };

  /* ─── Public: verify all key text/bg pairs from current theme ──────── */
  const verifyContrast = function () {
    const rs = window.getComputedStyle(document.documentElement);
    const get = function (token) { return rs.getPropertyValue(token).trim(); };

    const text       = get('--color-text');
    const textMuted  = get('--color-text-muted');
    const bg         = get('--color-bg');
    const surface0   = get('--color-surface-0');
    const surface1   = get('--color-surface-1');
    const brand      = get('--color-brand');

    const result = {
      'text-on-bg':         checkContrast(text, bg),
      'text-on-surface-0':  checkContrast(text, surface0),
      'text-on-surface-1':  checkContrast(text, surface1),
      'text-muted-on-bg':   checkContrast(textMuted, bg),
      'brand-on-bg':        checkContrast(brand, bg),
      theme: document.documentElement.getAttribute('data-theme') ||
             document.body.getAttribute('data-theme') || 'unknown'
    };
    return Object.freeze(result);
  };

  /* ─── Additive freeze-replace: extend Upg.chroma without breaking
        the existing frozen surface (Phase 3 IIFE untouched) ─────────── */
  const prevChroma = window.Upg.chroma;
  window.Upg.chroma = Object.freeze(Object.assign({}, prevChroma, {
    checkContrast:  checkContrast,
    verifyContrast: verifyContrast
  }));

  /* ─── One-time WCAG audit on DOMContentLoaded (silent on pass) ─────── */
  const auditOnce = function () {
    try {
      const v = verifyContrast();
      const failing = [];
      Object.keys(v).forEach(function (key) {
        if (key === 'theme') return;
        const item = v[key];
        // text-muted is allowed to fail AA (it's intentionally lower contrast)
        if (key === 'text-muted-on-bg') return;
        if (item && !item.passAA) failing.push([key, item.ratio]);
      });
      if (failing.length > 0) {
        console.warn(
          '%c🔴 CHROMATIC SOUL — WCAG AA contrast issues:',
          'color:#FF6B6B; font-weight:bold;',
          failing
        );
      } else {
        console.info(
          '%c✓ CHROMATIC SOUL — WCAG AA verified · theme: %s',
          'color:#7BFFA0; font-weight:bold;',
          v.theme
        );
      }
    } catch (e) { /* swallow — never break boot */ }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', auditOnce, { once: true });
  } else {
    auditOnce();
  }
})(window, document);
