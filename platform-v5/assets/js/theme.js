/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — β2 — Theme Provider
   ────────────────────────────────────────────────────────────────────────
   The Upg.theme API: set/get/cycle/current/subscribe.

   Persists to localStorage as 'upg_theme'. Listens to OS prefers-color-scheme
   when mode is 'auto'. Dispatches 'upg:theme:change' on every effective
   change. No transition by default (instant swap); opt-in fade via
   Upg.theme.set('dark', { transition: true }).

   Classic IIFE — mobile-safe. Idempotent registration.
   Manifest: CHROMA_DOCTRINE.md §4.
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  window.Upg = window.Upg || {};

  const STORAGE_KEY = 'upg_theme';
  const ORDER = Object.freeze(['dark', 'light', 'auto']);
  const VALID = new Set(ORDER);

  const subscribers = new Set();
  let mqLight = null;          // MediaQueryList for prefers-color-scheme: light

  // ── Storage facade — defensive, private-mode safe ───────────────────
  function loadStored() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return VALID.has(v) ? v : null;
    } catch (_) { return null; }
  }
  function saveStored(mode) {
    try { localStorage.setItem(STORAGE_KEY, mode); } catch (_) { /* ignore */ }
  }


  // ── Resolve 'auto' to a real theme based on OS preference ──────────
  function resolveAuto() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }


  // ── DOM application ─────────────────────────────────────────────────
  function applyToRoot(mode, withTransition) {
    const root = document.documentElement;
    if (!root) return;

    if (withTransition) {
      // Opt-in fade — only on the canvas, not on surfaces (they would flicker)
      const fade = document.createElement('style');
      fade.textContent = 'body { transition: background-color var(--duration-quick, 240ms) var(--ease-snap, ease) }';
      document.head.appendChild(fade);
      window.setTimeout(function () {
        try { fade.remove(); } catch (_) { /* ignore */ }
      }, 400);
    }

    root.setAttribute('data-theme', mode);
  }


  // ── State ───────────────────────────────────────────────────────────
  // The "raw" mode the user chose ('dark' | 'light' | 'auto').
  // The "current" theme is the resolved one ('dark' | 'light').
  let raw = loadStored() || 'dark';

  function get() { return raw; }

  function current() {
    return raw === 'auto' ? resolveAuto() : raw;
  }

  function notify() {
    const evt = new CustomEvent('upg:theme:change', {
      bubbles: true,
      detail: { raw: raw, current: current() }
    });
    document.dispatchEvent(evt);
    subscribers.forEach(function (fn) {
      try { fn(raw, current()); }
      catch (e) { console.error('[Upg.theme] subscriber error:', e); }
    });
  }

  function set(mode, opts) {
    if (!VALID.has(mode)) {
      console.warn('[Upg.theme] invalid mode:', mode);
      return false;
    }
    raw = mode;
    saveStored(mode);
    applyToRoot(current(), !!(opts && opts.transition));
    bindAutoListener();
    notify();
    return true;
  }

  function cycle() {
    const idx = ORDER.indexOf(raw);
    const next = ORDER[(idx + 1) % ORDER.length];
    return set(next);
  }

  function subscribe(fn) {
    if (typeof fn !== 'function') return function noop() {};
    subscribers.add(fn);
    return function unsubscribe() { subscribers.delete(fn); };
  }


  // ── Auto-mode listener — only active when raw === 'auto' ───────────
  function onSystemThemeChange() {
    if (raw !== 'auto') return;
    applyToRoot(current(), false);
    notify();
  }

  function bindAutoListener() {
    if (mqLight) return;  // already bound
    if (!window.matchMedia) return;
    mqLight = window.matchMedia('(prefers-color-scheme: light)');
    if (mqLight.addEventListener) {
      mqLight.addEventListener('change', onSystemThemeChange);
    } else if (mqLight.addListener) {
      // Older Safari
      mqLight.addListener(onSystemThemeChange);
    }
  }


  // ── Boot — apply stored / default theme on first paint ─────────────
  function boot() {
    applyToRoot(current(), false);
    bindAutoListener();
    // No initial notify — there's nobody subscribed yet at boot.
  }

  // Apply ASAP (before DOMContentLoaded) to avoid flash-of-unthemed-content.
  boot();


  // ── Idempotent surface registration ─────────────────────────────────
  if (!window.Upg.theme) {
    window.Upg.theme = Object.freeze({
      get: get,
      set: set,
      cycle: cycle,
      current: current,
      subscribe: subscribe,
      ORDER: ORDER,
      _meta: Object.freeze({
        version: 'tadaffuq-v5/β2',
        storageKey: STORAGE_KEY
      })
    });
  }

})();
