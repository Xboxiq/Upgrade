/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-theme-1.js
   Extracted from app.js lines 11495-11607
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const KEY = 'upg_theme';
  const LEGACY_KEY = 'v12_theme';
  const ORDER = ['auto', 'dark', 'light'];
  const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: light)') : null;

  const resolve = (mode) => {
    if (mode === 'auto') return (mq && mq.matches) ? 'light' : 'dark';
    return mode === 'light' ? 'light' : 'dark';
  };

  const applyDOM = (mode) => {
    const actual = resolve(mode);
    const root = document.documentElement;
    const body = document.body;
    if (root) root.dataset.theme = actual;
    if (body) {
      if (actual === 'light') body.setAttribute('data-theme', 'light');
      else                    body.removeAttribute('data-theme');
      body.setAttribute('data-theme-mode', mode);
    }
    // Update browser UI color
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    const cs = body ? getComputedStyle(body) : null;
    let bg = cs ? cs.getPropertyValue('--color-bg').trim() : '';
    if (!bg) bg = (actual === 'light' ? '#FAFAF9' : '#0E1220');
    meta.setAttribute('content', bg);
    // Notify listeners (Phase 5 cmdk + Phase 6 dashboard listen)
    try {
      window.dispatchEvent(new CustomEvent('upg:theme-change', { detail: { mode, actual } }));
    } catch (e) {}
  };

  const apply = (mode) => {
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      try { document.startViewTransition(() => applyDOM(mode)); return; } catch (e) {}
    }
    applyDOM(mode);
  };

  const get = () => {
    try {
      const v = localStorage.getItem(KEY);
      if (v && ORDER.includes(v)) return v;
      // Migrate from legacy v12_theme: 'light' -> 'light'; anything else keep 'auto'
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy === 'light') { localStorage.setItem(KEY, 'light'); return 'light'; }
      if (legacy === 'dark')  { localStorage.setItem(KEY, 'dark');  return 'dark';  }
    } catch (e) {}
    return 'auto';
  };
  const set = (mode) => {
    if (!ORDER.includes(mode)) return;
    try { localStorage.setItem(KEY, mode); } catch (e) {}
    apply(mode);
  };
  const cycle = () => set(ORDER[(ORDER.indexOf(get()) + 1) % ORDER.length]);

  // Initial apply (must run before paint to avoid flash)
  apply(get());

  // System change listener — only effective when mode === 'auto'
  if (mq && mq.addEventListener) {
    mq.addEventListener('change', () => { if (get() === 'auto') apply('auto'); });
  } else if (mq && mq.addListener) {
    mq.addListener(() => { if (get() === 'auto') apply('auto'); });
  }

  // Wire any explicit toggle hooks (data-action="toggle-theme")
  const wireToggles = () => {
    document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
      if (btn.__upgThemeBound) return;
      btn.__upgThemeBound = true;
      btn.addEventListener('click', (e) => {
        // Prevent the legacy inline onclick from also running
        if (typeof btn.onclick === 'function' && !btn.__upgThemeOverride) {
          btn.__upgThemeOverride = true;
        }
        e.stopPropagation();
        cycle();
      }, true);
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireToggles);
  } else {
    wireToggles();
  }

  // Override legacy global toggleTheme so it cycles 3-state
  // (legacy was 2-state: light <-> dark; we extend to auto -> dark -> light)
  const legacyToggle = window.toggleTheme;
  window.toggleTheme = function () {
    cycle();
  };
  // Keep legacy applyTheme working (callable with 'light'|'dark')
  const legacyApply = window.applyTheme;
  window.applyTheme = function (theme) {
    if (theme === 'light' || theme === 'dark') set(theme);
    else if (typeof legacyApply === 'function') legacyApply(theme);
  };

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.theme = { get, set, cycle, resolve };
})();
