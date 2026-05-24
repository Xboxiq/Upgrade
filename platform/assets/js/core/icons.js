/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — core/icons.js (stub — α3)
   ────────────────────────────────────────────────────────────────────────
   Sprite resolver for Lucide + Phosphor (α4 will populate).
   See ICONOGRAPHY_DOCTRINE.md and α4_ICON_FOUNDATION.md.
   Until α4 ships, legacy upg-icons-1.js continues to provide window.Upg.icons.
   ════════════════════════════════════════════════════════════════════════ */

export function resolve(/* name */) {
  throw new Error('[ÊLAN core/icons] resolve() not implemented yet — see α4.');
}

export function inject(/* el, name */) {
  throw new Error('[ÊLAN core/icons] inject() not implemented yet — see α4.');
}

export const icons = Object.freeze({ resolve, inject, _stub: true });

// Do NOT register on window.Upg.icons — legacy module owns that surface until α4.
