/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — γ3 — Naar world JS: Spark hover Beacon
   ────────────────────────────────────────────────────────────────────────
   🎨 VISUAL_BEACON

   The CSS already paints a 24px radial spark on every `.spark-host` that
   is hovered or focused-within. Without JS, the spark sits at 50%/50%.
   This module's only job is to update two CSS custom properties
   (--mx, --my) at pointer rate so the spark follows the cursor exactly.

   Discipline:
     - Only attaches when body[data-world="naar"]
     - Detaches the moment the world changes
     - rAF throttle — never more than one update per frame
     - Pointer-fine + reduced-motion-aware (no-op otherwise)
     - Touch devices skipped (the spark is a hover affordance, not a
       primary interaction; tap-to-flash is reserved for δ-tier)
     - One delegated listener — no per-element bind
     - Public API nested under Upg.worlds.naar (top-level Upg.* count
       remains 31 after γ1)
   ─────────────────────────────────────────────────────────────────────── */

const HOST_SELECTOR = '.spark-host';

const mqFinePointer = (typeof window !== 'undefined' && window.matchMedia)
  ? window.matchMedia('(pointer: fine)')
  : null;
const mqReduce = (typeof window !== 'undefined' && window.matchMedia)
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null;

let raf = 0;
let bound = false;

function shouldRun() {
  if (!mqFinePointer) return true;
  if (!mqFinePointer.matches) return false;
  if (mqReduce && mqReduce.matches) return false;
  return true;
}

function onPointerMove(e) {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    const target = e.target && e.target.closest && e.target.closest(HOST_SELECTOR);
    if (!target) return;
    const r = target.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const mx = ((e.clientX - r.left) / r.width)  * 100;
    const my = ((e.clientY - r.top)  / r.height) * 100;
    target.style.setProperty('--mx', mx.toFixed(2) + '%');
    target.style.setProperty('--my', my.toFixed(2) + '%');
  });
}

function bind() {
  if (bound) return;
  if (!shouldRun()) return;
  document.body.addEventListener('pointermove', onPointerMove, { passive: true });
  bound = true;
}

function unbind() {
  if (!bound) return;
  document.body.removeEventListener('pointermove', onPointerMove);
  if (raf) { cancelAnimationFrame(raf); raf = 0; }
  bound = false;
}

function syncToWorld() {
  if (document.body.dataset.world === 'naar') bind();
  else unbind();
}

/* React to world changes (γ1 controller dispatches this) */
document.addEventListener('upg:world:change', syncToWorld);

/* Re-evaluate when the user toggles reduced-motion or pointer kind */
if (mqReduce && mqReduce.addEventListener) {
  mqReduce.addEventListener('change', () => { unbind(); syncToWorld(); });
}
if (mqFinePointer && mqFinePointer.addEventListener) {
  mqFinePointer.addEventListener('change', () => { unbind(); syncToWorld(); });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', syncToWorld, { once: true });
} else {
  syncToWorld();
}

/* Public API — nested under Upg.worlds (top-level surface unchanged). */
window.Upg = window.Upg || {};
window.Upg.worlds = window.Upg.worlds || {};
if (!window.Upg.worlds.naar) {
  window.Upg.worlds.naar = Object.freeze({
    bind, unbind, syncToWorld,
    selector: HOST_SELECTOR,
    isBound: () => bound,
  });
}

export { bind, unbind, syncToWorld, HOST_SELECTOR };
