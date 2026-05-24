/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — δ2 — Bento Temporal (Pillar δ KINETIC SHELL / Stage 2 of 6)
   ────────────────────────────────────────────────────────────────────────
   Beacon: 📊 DATA_BEACON
   Surprise: same dashboard, same cells, same layout — but attention
             itself breathes with the day. Each cell declares
             data-temporal-priority="morning,afternoon" semantically; this
             module reads the hour and stamps data-temporal-active="true"
             on matching cells. The CSS layer (chrome.css δ2 block) gives
             active cells an ember-tinted outline, a 1.012 lift, and a
             "الأهم الآن" pseudo-element ribbon. Inactive cells stay
             completely neutral — no negation, no shrink, no demote. Only
             promotion is visible.
   Avoided:  Forbidden #7 (bento = identical rectangles)
             Forbidden #11 (counter-from-0 — we use existing data-countup
             unchanged; the temporal layer NEVER touches numeric values)
             Forbidden #12 (fade-in-on-scroll without reason — the only
             motion here is a 480ms ease-in on emphasis change at hour
             boundaries; honest cause)
   Inspired: Wild Card #4 — Maqamat (different musical modes for different
             hours: Saba at dawn, Bayati afternoon, Hijaz at night). The
             dashboard is a maqam — same instruments, different emphasis.
   ────────────────────────────────────────────────────────────────────────
   Sacred preserved:
     - 16 page sections — only data-* attributes added to dashboard cells
     - 14 prior Upg.* APIs untouched (chrome.sidebar from δ1 untouched)
     - 391 qcalc references untouched
     - count-up tickers / data-cath-stat / data-bento markup untouched
   New surface: Upg.bento.temporal (extends Upg.bento namespace)
   ════════════════════════════════════════════════════════════════════════ */

// ── Time slicing ───────────────────────────────────────────────────────
const SLICE = Object.freeze({
  morning:   [5,  12], // 05:00 – 11:59
  afternoon: [12, 17], // 12:00 – 16:59
  evening:   [17, 21], // 17:00 – 20:59
  night:     [21,  5], // 21:00 – 04:59 (wraps midnight)
});

function sliceFor(hour) {
  if (hour >= 5  && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

function currentSlice() {
  const now = new Date();
  return sliceFor(now.getHours());
}

// ── State ──────────────────────────────────────────────────────────────
let lastSlice = null;
let observer  = null;
let recheckTimer = 0;
const RECHECK_MS = 10 * 60 * 1000; // re-evaluate every 10 minutes

// ── Public surface object (frozen at end) ──────────────────────────────
const surface = {
  current: currentSlice,
  list: () => Object.keys(SLICE),
  refresh: () => apply(currentSlice(), { force: true }),
  matches,
};

// ── Cell selection ─────────────────────────────────────────────────────
function cellsWithPriority(root) {
  // Match any element that opted in via data-temporal-priority.
  return (root || document).querySelectorAll('[data-temporal-priority]');
}

function matches(priorityList, slice) {
  if (!priorityList) return false;
  const list = String(priorityList).split(',').map(s => s.trim().toLowerCase());
  return list.includes(slice);
}

// ── Apply state ────────────────────────────────────────────────────────
function apply(slice, opts) {
  const force = !!(opts && opts.force);
  if (!force && slice === lastSlice) return;
  lastSlice = slice;

  // Stamp the body for downstream consumers (CSS hooks, analytics, etc.)
  document.body.setAttribute('data-temporal-slice', slice);

  // Update each cell's active flag.
  let activeCount = 0;
  cellsWithPriority().forEach(cell => {
    const priority = cell.getAttribute('data-temporal-priority');
    const isActive = matches(priority, slice);
    if (isActive) {
      cell.setAttribute('data-temporal-active', 'true');
      // Honest semantic — this cell is the "current emphasis" for the moment.
      // We deliberately do NOT use aria-current="page" (reserved for nav).
      cell.setAttribute('data-temporal-axis', 'focal');
      activeCount++;
    } else {
      cell.removeAttribute('data-temporal-active');
      // Cells with priority but not currently active retain the
      // "supporting" axis — they still carry meaning, just not headlining.
      cell.setAttribute('data-temporal-axis', 'supporting');
    }
  });

  // Fire a public event so other modules (analytics, ARIA-live notice,
  // future ribbons) can react. Detail carries enough context to render
  // localized copy without re-querying the DOM.
  document.dispatchEvent(new CustomEvent('upg:bento:temporal-shift', {
    detail: { slice, hour: new Date().getHours(), activeCount },
  }));
}

// ── Observer for late-mounted cells ────────────────────────────────────
function watchForLateCells() {
  if (observer || typeof MutationObserver !== 'function') return;
  observer = new MutationObserver(records => {
    let needsApply = false;
    for (const r of records) {
      for (const n of r.addedNodes) {
        if (n.nodeType !== 1) continue;
        if (n.matches && n.matches('[data-temporal-priority]')) { needsApply = true; break; }
        if (n.querySelector && n.querySelector('[data-temporal-priority]')) { needsApply = true; break; }
      }
      if (needsApply) break;
    }
    if (needsApply) apply(currentSlice(), { force: true });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// ── Boot ───────────────────────────────────────────────────────────────
function init() {
  apply(currentSlice(), { force: true });
  watchForLateCells();

  // Periodic re-check for hour transitions while the tab is open.
  if (recheckTimer) clearInterval(recheckTimer);
  recheckTimer = setInterval(() => apply(currentSlice()), RECHECK_MS);

  // Honour visibility — re-apply when the tab returns from background
  // (the user may have left the tab open across an hour boundary).
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') apply(currentSlice());
  }, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

// Re-apply on world/page change so late-rendered pages catch up.
document.addEventListener('upg:nav:change',   () => apply(currentSlice(), { force: true }));
document.addEventListener('upg:world:change', () => apply(currentSlice(), { force: true }));

// ── Public namespace — Upg.bento.temporal (additive) ───────────────────
(function registerNamespace() {
  if (typeof window === 'undefined') return;
  const Upg = (window.Upg = window.Upg || {});
  const bento = (Upg.bento = Upg.bento || {});
  if (bento.temporal) return; // never clobber prior registration
  bento.temporal = Object.freeze(surface);
})();

export const bentoTemporal = Object.freeze(surface);
