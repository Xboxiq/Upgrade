/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — core/theme.js
   ────────────────────────────────────────────────────────────────────────
   Light / dark / auto theme switch with View Transitions when supported.
   API-compatible with legacy upg-theme-1.js. ESM-true.
   Registered on window.Upg.theme only when legacy is absent.
   ════════════════════════════════════════════════════════════════════════ */

const KEY = 'upg_theme';
const ORDER = Object.freeze(['auto', 'dark', 'light']);

function mq() {
  return typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: light)')
    : null;
}

function resolve(mode) {
  if (mode === 'auto') {
    const m = mq();
    return m && m.matches ? 'light' : 'dark';
  }
  return mode === 'light' ? 'light' : 'dark';
}

function applyDOM(mode) {
  const actual = resolve(mode);
  const root = document.documentElement;
  const body = document.body;
  if (root) root.dataset.theme = actual;
  if (body) {
    if (actual === 'light') body.setAttribute('data-theme', 'light');
    else                    body.removeAttribute('data-theme');
    body.setAttribute('data-theme-mode', mode);
  }
  try {
    window.dispatchEvent(new CustomEvent('upg:theme-change', { detail: { mode, actual } }));
  } catch {}
}

function apply(mode) {
  if (
    document.startViewTransition &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    try { document.startViewTransition(() => applyDOM(mode)); return; } catch {}
  }
  applyDOM(mode);
}

export function get() {
  try {
    const v = localStorage.getItem(KEY);
    if (v && ORDER.includes(v)) return v;
  } catch {}
  return 'auto';
}

export function set(mode) {
  if (!ORDER.includes(mode)) return;
  try { localStorage.setItem(KEY, mode); } catch {}
  apply(mode);
}

export function cycle() {
  const i = ORDER.indexOf(get());
  set(ORDER[(i + 1) % ORDER.length]);
}

export function current() {
  return resolve(get());
}

export const theme = Object.freeze({ get, set, cycle, current, ORDER });

if (typeof window !== 'undefined') {
  window.Upg = window.Upg || {};
  if (!window.Upg.theme) window.Upg.theme = theme;
}
