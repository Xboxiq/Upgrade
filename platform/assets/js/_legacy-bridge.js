/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — _legacy-bridge.js
   ────────────────────────────────────────────────────────────────────────
   Migration buffer. Each pillar is expected to reduce this file as
   modules move from /js/upg-*.js IIFEs into /js/core, /js/chrome,
   /js/pages, /js/motion, /js/ux ESM trees.

   Goal by ζ: ≤ 200 lines.
   Today (α3): empty by design — the legacy IIFE imports in app.js still
   carry the runtime. The new core/* modules are present as files only;
   they self-register only when the legacy slot is empty.
   ════════════════════════════════════════════════════════════════════════ */

console.info('[ÊLAN v4] Legacy bridge active. Migration in progress (α3 scaffold only).');
