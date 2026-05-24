/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — core/font.js (stub — α3)
   ────────────────────────────────────────────────────────────────────────
   Unified font surface (β1 procurement + β2 voice casting + β3 numerics).
   Until β phases ship, legacy upg-font-{1,2,3}.js modules own the surface.
   ════════════════════════════════════════════════════════════════════════ */

export function voices() {
  throw new Error('[ÊLAN core/font] voices() not implemented yet — see β2.');
}

export function audit() {
  throw new Error('[ÊLAN core/font] audit() not implemented yet — see β1.');
}

export function signature(/* pageId */) {
  throw new Error('[ÊLAN core/font] signature() not implemented yet — see β3.');
}

export const font = Object.freeze({ voices, audit, signature, _stub: true });

// Do NOT register on window.Upg.font yet.
