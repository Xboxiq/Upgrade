/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — ζ1 — Zen Trigger runtime  (Upg.zen · VEIL_PULSE)
   ────────────────────────────────────────────────────────────────────────
   Focus Mode by SUBTRACTION. Upg.zen.enter(scope) recedes the whole interface
   except one scoped task: sets data-zen on <html>, shows the veil, dissolves
   the dock (CSS owns the visuals), lifts + focuses the scope, fires events.

   Public surface (idempotent registration on window.Upg):
     Upg.zen.enter(scope, opts?)   scope = Element | selector string
     Upg.zen.exit()                return the world
     Upg.zen.toggle(scope, opts?)  enter if idle, exit if active
     Upg.zen.active()              boolean
     Upg.zen.scope()               current scope Element | null

   Emits CustomEvent('upg:zen:enter' | 'upg:zen:exit', { scope }).

   Markup hooks: [data-zen-open="selector"], [data-zen-close], #zen-veil.
   Escape exits — registered in CAPTURE so an open ε1 overlay closes first,
   then stopPropagation prevents the δ2 bento-collapse from also firing.

   Classic IIFE — mobile-safe (no ESM). No new module file loaded by a build.
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  window.Upg = window.Upg || {};

  var ROOT    = document.documentElement;
  var ACTIVE  = false;
  var scopeEl = null;
  var veilEl  = null;
  var sourceEl = null;          // element to restore focus to on exit
  var ZEN_MS  = 640;            // read from --duration-zen at boot
  var PANEL_MS = 360;           // read from --duration-panel at boot (bloom + return beat)
  var hideTimer = 0;
  var bloomTimer = 0;
  var exitTimer = 0;


  // ── Read a duration token (never invent ms — MOTION §1) ──────────────
  function readMs(name, fallback) {
    try {
      var raw = getComputedStyle(ROOT).getPropertyValue(name);
      var n = parseFloat(raw);
      return (isFinite(n) && n > 0) ? n : fallback;
    } catch (_) { return fallback; }
  }

  function resolveScope(scope) {
    if (!scope) return null;
    if (typeof scope === 'string') { try { return document.querySelector(scope); } catch (_) { return null; } }
    if (scope.nodeType === 1) return scope;
    return null;
  }

  function fire(name, scope) {
    try {
      document.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: { scope: scope } }));
    } catch (_) { /* very old browsers: silent */ }
  }


  // ── enter ─────────────────────────────────────────────────────────────
  function enter(scope, opts) {
    opts = opts || {};
    var el = resolveScope(scope);
    if (!el) { console.warn('[Upg.zen] scope not found:', scope); return false; }

    // Already active → re-scope without re-entering (idempotent).
    if (ACTIVE) {
      if (scopeEl && scopeEl !== el) scopeEl.removeAttribute('data-zen-scope');
      scopeEl = el;
      scopeEl.setAttribute('data-zen-scope', 'true');
      return true;
    }

    sourceEl = opts.source || (document.activeElement && document.activeElement !== document.body
                                ? document.activeElement : null);
    scopeEl = el;
    scopeEl.setAttribute('data-zen-scope', 'true');

    // Show the veil — reflow so the opacity transition runs from rest.
    if (veilEl) {
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = 0; }
      veilEl.hidden = false;
      veilEl.removeAttribute('aria-hidden');
      void veilEl.offsetWidth;
      veilEl.setAttribute('data-open', 'true');
    }

    ROOT.setAttribute('data-zen', 'active');
    ACTIVE = true;

    // Move focus into the task so keyboard users land in the clearing.
    try { scopeEl.focus({ preventScroll: false }); } catch (_) { /* not focusable: fine */ }

    fire('upg:zen:enter', scopeEl);
    return true;
  }


  // ── exit ────────────────────────────────────────────────────────────────
  function exit() {
    if (!ACTIVE) return false;

    ROOT.removeAttribute('data-zen');
    // Drive the patient dock re-emergence (CSS keys off [data-zen-exiting]):
    // hold dissolved a beat, then melt back. Removed once the return completes.
    ROOT.setAttribute('data-zen-exiting', 'true');
    if (exitTimer) clearTimeout(exitTimer);
    exitTimer = window.setTimeout(function () {
      ROOT.removeAttribute('data-zen-exiting');
    }, ZEN_MS + PANEL_MS + 80);
    ACTIVE = false;

    if (veilEl) {
      veilEl.setAttribute('data-open', 'false');
      var done = false;
      var finalize = function () {
        if (done) return; done = true;
        veilEl.removeEventListener('transitionend', finalize);
        if (!ACTIVE) {                       // not re-entered meanwhile
          veilEl.hidden = true;
          veilEl.setAttribute('aria-hidden', 'true');
        }
      };
      veilEl.addEventListener('transitionend', finalize);
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = window.setTimeout(finalize, ZEN_MS + 60);   // safety net
    }

    var prevScope = scopeEl;
    if (scopeEl) {
      scopeEl.removeAttribute('data-zen-scope');
      scopeEl.removeAttribute('data-zen-complete');
      scopeEl = null;
    }

    // Restore focus to the trigger.
    var t = sourceEl; sourceEl = null;
    if (t && typeof t.focus === 'function') {
      try { t.focus({ preventScroll: true }); } catch (_) { try { t.focus(); } catch (_e) {} }
    }

    fire('upg:zen:exit', prevScope);
    return true;
  }


  function toggle(scope, opts) { return ACTIVE ? exit() : enter(scope, opts); }


  // ── complete ──────────────────────────────────────────────────────────
  // The deliberate completion: bloom the ring in place (no toast/counter/
  // confetti), then exit on a held beat. Optionally render a final ring value
  // first (Upg.ring.set RENDERS the value — it never counts up from 0).
  function complete(opts) {
    if (!ACTIVE) return false;
    opts = opts || {};

    if (opts.host && typeof opts.value === 'number' &&
        window.Upg.ring && typeof window.Upg.ring.set === 'function') {
      try { window.Upg.ring.set(opts.host, opts.value); } catch (_) {}
    }

    if (scopeEl) scopeEl.setAttribute('data-zen-complete', 'true');
    fire('upg:zen:complete', scopeEl);

    // After the bloom settles, leave deliberately.
    if (bloomTimer) clearTimeout(bloomTimer);
    bloomTimer = window.setTimeout(function () { exit(); }, PANEL_MS + 40);
    return true;
  }


  // ── Delegated triggers ────────────────────────────────────────────────
  function onClick(ev) {
    var t = ev.target;
    if (!t || !t.closest) return;

    var opener = t.closest('[data-zen-open]');
    if (opener) {
      ev.preventDefault();
      var sel = opener.getAttribute('data-zen-open');
      var target = sel ? resolveScope(sel) : null;
      if (!target) target = opener.closest('[data-card]') || opener.closest('.bento-card');
      enter(target || opener, { source: opener });
      return;
    }

    var closer = t.closest('[data-zen-close]');
    if (closer) { ev.preventDefault(); exit(); return; }

    // A completion trigger blooms the ring in place, then exits on a beat.
    var finisher = t.closest('[data-zen-finish]');
    if (finisher) {
      ev.preventDefault();
      var ringSel = finisher.getAttribute('data-zen-finish');
      var host = ringSel ? document.querySelector(ringSel) : null;
      complete(host ? { host: host, value: 100 } : {});
      return;
    }

    // A click on the veil itself returns the world.
    if (veilEl && t === veilEl) { exit(); return; }
  }

  // Escape — capture phase, AFTER the ε1 overlay capture handler.
  function onKeyDownCapture(ev) {
    if (ev.key !== 'Escape' || !ACTIVE) return;
    // Let an open overlay close first (it owns Escape while open).
    if (window.Upg.overlay && window.Upg.overlay.isOpen && window.Upg.overlay.isOpen()) return;
    ev.preventDefault();
    ev.stopPropagation();            // don't also collapse a δ2 bento card
    exit();
  }


  // ── Boot ──────────────────────────────────────────────────────────────
  function boot() {
    ZEN_MS = readMs('--duration-zen', 640);
    PANEL_MS = readMs('--duration-panel', 360);
    veilEl = document.getElementById('zen-veil');
    document.addEventListener('click', onClick, false);
    document.addEventListener('keydown', onKeyDownCapture, true);   // capture
  }


  // ── Idempotent surface registration ─────────────────────────────────
  if (!window.Upg.zen) {
    window.Upg.zen = Object.freeze({
      enter:    enter,
      exit:     exit,
      toggle:   toggle,
      complete: complete,
      active:   function () { return ACTIVE; },
      scope:    function () { return scopeEl; },
      _meta: Object.freeze({
        version: 'tadaffuq-v5/ζ3',
        pulse: 'VEIL_PULSE → GLOW_PULSE → SPRING_PULSE',
        mode: 'chronic',
        emits: 'upg:zen:enter / upg:zen:exit / upg:zen:complete'
      })
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    queueMicrotask(boot);
  }

})();
