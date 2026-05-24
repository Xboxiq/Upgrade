/**
 * ÊLAN v4 — δ2 — Time-Aware Bento
 * Pillar δ (KINETIC SHELL), Stage 2/6
 *
 * Assigns data-axis + data-time-promoted to bento cells
 * based on time-of-day and data-priority attributes.
 * The dashboard reshapes itself: morning = progress focal;
 * evening = streak/challenge focal; night = activity marginalia.
 *
 * Beacon: 🏛 STRUCTURAL_BEACON — grid hierarchy mutates by clock.
 */
;(function ElanDelta2TimeBento() {
  'use strict';

  /* ── Time classification ─────────────────────────────────────────────── */
  function getTimeOfDay() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'morning';
    if (h >= 12 && h < 17) return 'afternoon';
    if (h >= 17 && h < 21) return 'evening';
    return 'night';
  }

  /* ── Default axis assignment (static hierarchy) ──────────────────────── */
  const AXIS_DEFAULTS = {
    'bento-greet':     'focal',
    'stat-tile':       'supporting',
    'bento-skill':     'supporting',
    'bento-activity':  'supporting',
    'bento-challenge': 'supporting',
    'bento-heatmap':   'marginalia',
    'dock':            'marginalia'
  };

  function assignDefaultAxis(cell) {
    if (cell.dataset.axis) return; // already assigned
    for (const [cls, axis] of Object.entries(AXIS_DEFAULTS)) {
      if (cell.classList.contains(cls) || cell.tagName.toLowerCase() === 'nav') {
        cell.dataset.axis = axis;
        return;
      }
    }
    cell.dataset.axis = 'supporting'; // fallback
  }

  /* ── Priority map: which cells matter at which time ──────────────────── */
  // Priority is declared via data-priority="morning,evening" on cells.
  // If a cell's priority includes current TOD, it gets promoted.

  function applyTimePriority() {
    const tod = getTimeOfDay();
    document.body.dataset.timeOfDay = tod;

    const bentoGrid = document.querySelector('.bento[data-bento="dashboard"]');
    if (!bentoGrid) return;

    const cells = bentoGrid.querySelectorAll(':scope > article, :scope > nav');
    let promotedCount = 0;

    cells.forEach(cell => {
      // Assign axis defaults
      assignDefaultAxis(cell);

      const priority = cell.dataset.priority;
      if (!priority) {
        cell.removeAttribute('data-time-promoted');
        return;
      }

      const slots = priority.split(',').map(s => s.trim());
      const isPromoted = slots.includes(tod);

      if (isPromoted && promotedCount < 2) {
        cell.dataset.axis = 'focal';
        cell.dataset.timePromoted = 'true';
        promotedCount++;
      } else {
        // Revert to default axis
        cell.removeAttribute('data-time-promoted');
        for (const [cls, axis] of Object.entries(AXIS_DEFAULTS)) {
          if (cell.classList.contains(cls)) {
            cell.dataset.axis = axis;
            break;
          }
        }
      }
    });
  }

  /* ── Initialization ─────────────────────────────────────────────────── */
  function init() {
    applyTimePriority();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-evaluate on nav change (in case user switches to dashboard later)
  document.addEventListener('upg:nav:change', () => {
    setTimeout(applyTimePriority, 80);
  });

  // Re-evaluate every 30 minutes
  setInterval(applyTimePriority, 30 * 60 * 1000);

  // Expose on Upg namespace
  if (!window.Upg) window.Upg = {};
  if (!window.Upg.chrome) window.Upg.chrome = {};
  window.Upg.chrome.bento = Object.freeze({
    getTimeOfDay: getTimeOfDay,
    refresh: applyTimePriority
  });

})();
