/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-type-1.js
   Extracted from app.js lines 13774-13831
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const KEY_DENSITY = 'upg_density';
  const KEY_ZOOM    = 'upg_text_zoom';
  const DENSITY     = ['compact', 'cozy', 'comfortable', 'spacious'];

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const safeNum = (v, fallback) => {
    if (v === null || v === undefined || v === '') return fallback;
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  };

  const apply = () => {
    const dRaw = safeNum(localStorage.getItem(KEY_DENSITY), 2);
    const zRaw = safeNum(localStorage.getItem(KEY_ZOOM), 1);
    const d = clamp(Math.round(dRaw), 0, 3);
    const z = clamp(zRaw, 0.875, 1.25);
    document.documentElement.dataset.density = DENSITY[d];
    document.documentElement.style.setProperty('--type-zoom', String(z));
  };

  const set = (key, value) => {
    if (key === 'density') {
      const d = clamp(Math.round(safeNum(value, 2)), 0, 3);
      localStorage.setItem(KEY_DENSITY, String(d));
    } else if (key === 'textZoom') {
      const z = clamp(safeNum(value, 1), 0.875, 1.25);
      localStorage.setItem(KEY_ZOOM, String(z));
    } else {
      return;
    }
    apply();
    try { window.dispatchEvent(new CustomEvent('upg:type-change', { detail: { key, value } })); }
    catch (_) { /* noop */ }
  };

  const get = (key) => {
    if (key === 'density') {
      const d = clamp(Math.round(safeNum(localStorage.getItem(KEY_DENSITY), 2)), 0, 3);
      return DENSITY[d];
    }
    if (key === 'textZoom') {
      return clamp(safeNum(localStorage.getItem(KEY_ZOOM), 1), 0.875, 1.25);
    }
    return null;
  };

  // Apply on load — before paint when possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }

  window.Upg = window.Upg || {};
  window.Upg.type = Object.freeze({ get, set, DENSITY: Object.freeze([...DENSITY]) });
})();
