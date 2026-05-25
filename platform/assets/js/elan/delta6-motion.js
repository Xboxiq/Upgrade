/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — δ6 — Motion Sanctuary controller (closes Pillar δ KINETIC SHELL)
   ────────────────────────────────────────────────────────────────────────
   Beacon: 🪞 META_BEACON
     The Surprise — when the user (or system) chooses stillness, ÊLAN
     does not strip itself to ugly minimalism. CSS owns the per-world
     static-signature transposition (see _motion-sanctuary.css). This
     module owns the THREE-STATE preference graph and the chrome
     confession «ساكن» activation:

         normal     — system says no preference, no manual override
         reduced    — system says reduce, OR user toggled reduced
         enhanced   — user toggled enhanced, defying system preference

   Sacred preserved:
     • Does NOT touch window.Upg.motion (W12 legacy: reveal/refreshGlow).
       New surface registers as Upg.elan.motion (matches δ1 magnetic-
       sidebar + δ4 bottom-nav nesting under Upg.elan).
     • localStorage key 'upg_motion_pref' is the only side-effect.
     • Listens for system mediaQuery changes — flips data-motion
       in real time only when no manual override is set.
   ─────────────────────────────────────────────────────────────────────── */

(() => {
  'use strict';

  const STORAGE_KEY = 'upg_motion_pref';
  const VALID = ['normal', 'reduced', 'enhanced'];
  const ATTR = 'data-motion';
  const EVENT = 'upg:motion:change';

  const reduceMQ = (typeof matchMedia === 'function')
    ? matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false, addEventListener() {}, removeEventListener() {} };

  /** Read manual override (or null if user is on system pref). */
  function storedPref() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return VALID.includes(v) && v !== 'normal' ? v : null;
    } catch (_) {
      return null;
    }
  }

  /** What the user chose explicitly, or null if they trust the system. */
  function manualMode() {
    return storedPref();
  }

  /** What the system says right now. */
  function systemPrefersReduced() {
    return !!reduceMQ.matches;
  }

  /**
   * Effective mode in priority order:
   *   1. manual 'enhanced' or 'reduced' overrides everything
   *   2. system preference (reduce → 'reduced', otherwise 'normal')
   */
  function effectiveMode() {
    return manualMode() || (systemPrefersReduced() ? 'reduced' : 'normal');
  }

  /** Sync the body attribute to the effective mode (or remove for normal). */
  function reflect() {
    const body = document.body;
    if (!body) return;
    const eff = effectiveMode();
    if (eff === 'normal') {
      body.removeAttribute(ATTR);
    } else {
      body.setAttribute(ATTR, eff);
    }
    return eff;
  }

  /* ── Public API ─────────────────────────────────────────────────────── */

  /**
   * Set the user's motion preference.
   *   set('normal')    — clear override, follow system
   *   set('reduced')   — force reduce regardless of system
   *   set('enhanced')  — force normal motion even when system says reduce
   */
  function set(pref) {
    if (!VALID.includes(pref)) return false;
    try {
      if (pref === 'normal') {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, pref);
      }
    } catch (_) {
      /* storage disabled — runtime-only flip still works */
    }
    const eff = reflect();
    document.dispatchEvent(new CustomEvent(EVENT, {
      detail: { pref, effective: eff, system: systemPrefersReduced() },
    }));
    return true;
  }

  /** Current effective state (what the UI is actually rendering). */
  function current() {
    return effectiveMode();
  }

  /** Boolean — is the platform CURRENTLY in reduced mode? */
  function isReduced() {
    return effectiveMode() === 'reduced';
  }

  /** Manual override only — null if the user trusts the system. */
  function override() {
    return manualMode();
  }

  /** Convenience toggle: cycles normal → reduced → enhanced → normal. */
  function cycle() {
    const here = manualMode();
    const next = here == null ? 'reduced' : (here === 'reduced' ? 'enhanced' : 'normal');
    set(next);
    return next;
  }

  /* ── Boot + system listener ─────────────────────────────────────────── */

  function boot() {
    reflect();
    // When system pref flips and the user has no manual override, follow it.
    const onSystemChange = () => {
      if (manualMode() != null) return; // user owns this
      const eff = reflect();
      document.dispatchEvent(new CustomEvent(EVENT, {
        detail: { pref: 'normal', effective: eff, system: systemPrefersReduced() },
      }));
    };
    if (typeof reduceMQ.addEventListener === 'function') {
      reduceMQ.addEventListener('change', onSystemChange);
    } else if (typeof reduceMQ.addListener === 'function') {
      // Legacy Safari fallback
      reduceMQ.addListener(onSystemChange);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  /* ── Register surface (preserves legacy Upg.motion verbatim) ────────── */

  try {
    const Upg = (typeof window !== 'undefined') ? (window.Upg = window.Upg || {}) : null;
    if (Upg) {
      Upg.elan = Upg.elan || {};
      if (!Upg.elan.motion) {
        Upg.elan.motion = Object.freeze({
          name: 'motion-sanctuary',
          version: 'δ6',
          set,
          current,
          isReduced,
          override,
          cycle,
          modes: Object.freeze([...VALID]),
        });
      }
    }
  } catch (_) {
    /* sandboxed: silent */
  }
})();
