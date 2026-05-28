// ════════════════════════════════════════════════════════════════════════
// ÊLAN v4 — ζ4 — Install Prompt Capture (Upg.elan.install)
// ────────────────────────────────────────────────────────────────────────
// Captures the BeforeInstallPromptEvent so the platform can offer
// "Install Upgrade" on its own terms (cmdk command, settings ribbon,
// or any future surface). Browser may fire the event once per session;
// we hold the deferred prompt and replay it when the user asks.
//
// Public API (frozen):
//   Upg.elan.install.available()  → boolean
//   Upg.elan.install.installed()  → boolean (best-effort, display-mode)
//   Upg.elan.install.prompt()     → Promise<'accepted'|'dismissed'|'unavailable'>
//   Upg.elan.install.outcome()    → last outcome string or null
//
// Events dispatched on document:
//   upg:pwa:installable  → when a deferred prompt is captured
//   upg:pwa:installed    → when the appinstalled event fires
//   upg:pwa:dismissed    → when the user dismisses the prompt
//
// No beacon (quality stage). No emoji. No inline SVG. No window.alert.
// ════════════════════════════════════════════════════════════════════════

(() => {
  const win = typeof window !== 'undefined' ? window : null;
  const doc = typeof document !== 'undefined' ? document : null;
  if (!win || !doc) return;

  // Namespace bootstrap (idempotent).
  win.Upg = win.Upg || {};
  win.Upg.elan = win.Upg.elan || {};

  // Bail if a previous module already wired this surface.
  if (win.Upg.elan.install && typeof win.Upg.elan.install.prompt === 'function') return;

  let deferredPrompt = null;
  let lastOutcome = null;

  /** Returns true when the platform is running as an installed PWA. */
  function installed() {
    try {
      if (win.matchMedia && win.matchMedia('(display-mode: standalone)').matches) return true;
      // iOS Safari: navigator.standalone is non-standard but reliable.
      if (typeof win.navigator !== 'undefined' && win.navigator.standalone === true) return true;
    } catch (_) { /* permissive */ }
    return false;
  }

  /** Returns true when a deferred prompt is held and replayable. */
  function available() {
    return Boolean(deferredPrompt);
  }

  /** Replays the captured prompt; resolves with 'accepted' | 'dismissed' | 'unavailable'. */
  async function prompt() {
    if (!deferredPrompt) {
      lastOutcome = 'unavailable';
      return lastOutcome;
    }
    try {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      lastOutcome = choice && choice.outcome ? choice.outcome : 'dismissed';
    } catch (_) {
      lastOutcome = 'dismissed';
    } finally {
      deferredPrompt = null;
    }
    if (lastOutcome === 'dismissed') {
      try { doc.dispatchEvent(new CustomEvent('upg:pwa:dismissed')); } catch (_) { /* permissive */ }
    }
    return lastOutcome;
  }

  /** Returns the last user choice outcome, or null if not yet prompted. */
  function outcome() {
    return lastOutcome;
  }

  // Capture the deferred prompt.
  win.addEventListener('beforeinstallprompt', (event) => {
    try { event.preventDefault(); } catch (_) { /* permissive */ }
    deferredPrompt = event;
    try { doc.dispatchEvent(new CustomEvent('upg:pwa:installable')); } catch (_) { /* permissive */ }
  });

  // Acknowledge installation.
  win.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    lastOutcome = 'installed';
    try { doc.dispatchEvent(new CustomEvent('upg:pwa:installed')); } catch (_) { /* permissive */ }
  });

  win.Upg.elan.install = Object.freeze({
    available,
    installed,
    prompt,
    outcome,
  });
})();
