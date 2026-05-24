/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — γ3 — World 2: نار (Naar) — Fire — Beacon Controller (ESM)
   ────────────────────────────────────────────────────────────────────────
   🎨 VISUAL_BEACON — Pointer-Tracked Forge Spark

   When the naar world is active, every hover-able surface (.card,
   .panel, .bento-cell, .btn, or any explicit .spark-host) renders a
   24-px radial gradient that *follows the pointer*. The spark sits
   at coordinates fed by this controller as `--mx` and `--my` custom
   properties. The CSS in worlds/_naar.css does the actual drawing
   and 60ms flash transition; this file only updates the coords.

   Mechanics:
   • Single rAF-throttled pointermove listener bound on body
   • Listener attaches when world becomes 'naar', detaches otherwise
   • Pointer position resolved against the closest spark target via
     element.closest() — works inside nested .card>.btn structures
   • prefers-reduced-motion + (pointer:coarse) get a no-op fast path

   Public API: window.Upg.worlds.naar.{ host, unhost, isActive }
   ════════════════════════════════════════════════════════════════════════ */

const SPARK_TARGET = '.spark-host, .card, .panel, .bento-cell, .btn';

let raf = 0;
let bound = false;

function shouldRun() {
  // Honor accessibility + touch-device gates
  if (typeof window === 'undefined' || !window.matchMedia) return true;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  return !reduce && !coarse;
}

function onMove(e) {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    const target = e.target?.closest?.(SPARK_TARGET);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const mx = ((e.clientX - rect.left) / rect.width)  * 100;
    const my = ((e.clientY - rect.top)  / rect.height) * 100;
    target.style.setProperty('--mx', mx.toFixed(2) + '%');
    target.style.setProperty('--my', my.toFixed(2) + '%');
  });
}

function bind() {
  if (bound) return;
  if (!shouldRun()) return;
  if (!document.body) return;
  document.body.addEventListener('pointermove', onMove, { passive: true });
  bound = true;
}

function unbind() {
  if (!bound) return;
  if (!document.body) return;
  document.body.removeEventListener('pointermove', onMove);
  if (raf) {
    cancelAnimationFrame(raf);
    raf = 0;
  }
  bound = false;
}

function maybeBindForCurrentWorld() {
  if (document.body?.dataset.world === 'naar') bind();
  else unbind();
}

/* ── world-change pathway ────────────────────────────────────────────── */

document.addEventListener('upg:world:change', (e) => {
  if (e?.detail?.world === 'naar') bind();
  else unbind();
});

/* Re-evaluate on motion-pref change so users who toggle reduce-motion
   mid-session get the spark turned off live. */
if (typeof window !== 'undefined' && window.matchMedia) {
  try {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => {
      unbind();
      maybeBindForCurrentWorld();
    };
    mq.addEventListener?.('change', handler);
  } catch { /* legacy MQ APIs ignored */ }
}

/* ── init ────────────────────────────────────────────────────────────── */

function init() {
  maybeBindForCurrentWorld();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

/* ── public API ──────────────────────────────────────────────────────── */

if (typeof window !== 'undefined') {
  window.Upg = window.Upg || {};
  window.Upg.worlds = window.Upg.worlds || {};
  if (!window.Upg.worlds.naar) {
    window.Upg.worlds.naar = Object.freeze({
      /** Manually mark an element as a spark-host (adds the class). */
      host: (el) => {
        if (el && el.classList) el.classList.add('spark-host');
      },
      /** Remove the explicit spark-host marker. */
      unhost: (el) => {
        if (el && el.classList) el.classList.remove('spark-host');
      },
      /** Is the controller currently bound? */
      isActive: () => bound,
    });
  }
}

export { bind, unbind, onMove };
