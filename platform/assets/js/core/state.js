/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — core/state.js
   ────────────────────────────────────────────────────────────────────────
   localStorage facade with subscribe pattern. ESM-true.
   Backward-compat: window.Upg.state is set ONLY if not already present
   (legacy upg-state-1.js wins until β phase removes it).
   ════════════════════════════════════════════════════════════════════════ */

const PREFIX = 'upg_';
const subscribers = new Map();

export function get(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function set(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    notify(key, value);
    return true;
  } catch {
    return false;
  }
}

export function subscribe(key, fn) {
  if (!subscribers.has(key)) subscribers.set(key, new Set());
  subscribers.get(key).add(fn);
  return () => subscribers.get(key).delete(fn);
}

function notify(key, value) {
  const subs = subscribers.get(key);
  if (subs) subs.forEach(fn => {
    try { fn(value); } catch (e) { console.error('[ÊLAN core/state] subscriber error', e); }
  });
}

export const state = Object.freeze({ get, set, subscribe });

// Backward-compat — register on window.Upg ONLY if no legacy implementation present.
// Legacy upg-state-1.js will install its own facade first (loaded earlier in app.js).
// β phase will remove the legacy IIFE, at which point this guard becomes a no-op
// because the legacy was already gone.
if (typeof window !== 'undefined') {
  window.Upg = window.Upg || {};
  if (!window.Upg.state) window.Upg.state = state;
}
