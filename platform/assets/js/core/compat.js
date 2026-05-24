/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — core/compat.js
   ────────────────────────────────────────────────────────────────────────
   Public-API audit + freeze. Imports last (after every module has had
   a chance to register on window.Upg.*). Reports a missing-API list to
   console without throwing.
   ════════════════════════════════════════════════════════════════════════ */

const SACRED_APIS = Object.freeze([
  // Original 14 — must always exist (sacred per ELAN_MANIFESTO.md § 5).
  'state', 'nav', 'theme', 'icons', 'font',
  'gateway', 'cmdk', 'calc', 'identity', 'greet',
  'countup', 'motion', 'scroll', 'production',
]);

export function audit() {
  if (typeof window === 'undefined') return { ok: true, missing: [] };
  const Upg = window.Upg || {};
  const missing = SACRED_APIS.filter(k => !(k in Upg));
  const present = SACRED_APIS.filter(k => k in Upg);
  return Object.freeze({
    ok: missing.length === 0,
    missing,
    present,
    total: Object.keys(Upg).length,
  });
}

export function report() {
  const r = audit();
  if (typeof console === 'undefined') return r;
  if (r.ok) {
    console.info(`[ÊLAN] Public API healthy — ${r.present.length}/14 sacred + ${r.total - r.present.length} extra`);
  } else {
    console.warn('[ÊLAN] Public API missing:', r.missing.join(', '));
  }
  return r;
}

export const compat = Object.freeze({ audit, report, SACRED_APIS });

// Stash audit utility on window for debugging without polluting Upg.*.
if (typeof window !== 'undefined') {
  window.__elanCompat = compat;
}
