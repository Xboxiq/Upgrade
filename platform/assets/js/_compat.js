/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — Backward Compatibility Shim (Worker 23 / Phase 5)
   ────────────────────────────────────────────────────────────────────────
   Each upg-*.js module re-runs its original IIFE on import, which writes
   to window.Upg.<name> directly. This file verifies all expected APIs
   are exposed after every module finishes loading.
   ════════════════════════════════════════════════════════════════════════ */

const EXPECTED = [
  "theme",
  "icons",
  "gateway",
  "calc",
  "cmdk",
  "state",
  "production",
  "type",
  "type2",
  "scroll",
  "nav",
  "identity",
  "greet",
  "countup",
  "motion",
  "material",
  "chrome",
  "choreo",
  "transition",
  "focusTrap",
  "aura",
  "life",
  "sound",
  "pace",
  "practice",
  "font",
  "chroma",
  "ritual",
  "layer",
  "shards"
];

function verify() {
  if (!window.Upg) {
    console.error('[Upg compat] window.Upg missing — ESM modules may have failed to import');
    return;
  }
  const missing = EXPECTED.filter((k) => !(k in window.Upg));
  if (missing.length === 0) {
    console.info(
      '%c\u{1F4E6} DECONSTRUCTION v3 — ESM migration complete: %d modules, all window.Upg.* APIs preserved',
      'color:#7BFFA0;font-weight:bold;',
      EXPECTED.length
    );
  } else {
    console.warn('[Upg compat] Missing APIs after ESM load:', missing);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', verify, { once: true });
} else {
  setTimeout(verify, 0);
}
