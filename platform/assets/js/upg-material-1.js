/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-material-1.js
   Extracted from app.js lines 14419-14456
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const KEY = 'upg_material_density';
  const ORDER = ['low', 'standard', 'high'];

  const get = () => {
    try { return localStorage.getItem(KEY) || 'standard'; }
    catch (_) { return 'standard'; }
  };
  const apply = (v) => {
    if (!document.body) return;
    if (v === 'standard') document.body.removeAttribute('data-material-density');
    else document.body.setAttribute('data-material-density', v);
  };
  const set = (v) => {
    if (!ORDER.includes(v)) return;
    try { localStorage.setItem(KEY, v); } catch (_) {}
    apply(v);
    document.dispatchEvent(new CustomEvent('upg:material:change', { detail: { density: v } }));
  };
  const cycle = () => {
    const cur = get();
    const next = ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length];
    set(next);
    return next;
  };

  // Apply on boot — handle both DOM-ready and pre-ready cases.
  const boot = () => apply(get());
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  window.Upg = window.Upg || {};
  window.Upg.material = { get, set, cycle };
})();
