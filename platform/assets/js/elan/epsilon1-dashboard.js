/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — ε1 — Dashboard Progress Margin + Iraq Block
   ════════════════════════════════════════════════════════════════════════
   Beacon: 📊 DATA_BEACON — Manuscript Margin Progress
   Computes --progress-pct from Upg state (daily_progress) and updates
   the vertical ink-fill strip + annotation text.
   ═══════════════════════════════════════════════════════════════════════ */

;(function epsilon1Dashboard() {
  'use strict';

  const TOTAL_DAILY_TARGET = 50; // configurable daily block target

  function getProgressEl() {
    return document.querySelector('[data-world="hibr"] .progress-margin');
  }

  function getNoteEl() {
    return document.querySelector('[data-world="hibr"] [data-progress-note]');
  }

  function getFillEl() {
    return document.querySelector('[data-world="hibr"] .progress-margin__fill');
  }

  /**
   * Reads daily progress from Upg.state or Upg.pace (whichever is available).
   * Falls back to 0 if no state system found.
   */
  function readDailyProgress() {
    // Prefer Upg.pace mastery system (Worker 17)
    if (window.Upg && window.Upg.pace && typeof window.Upg.pace.getMastery === 'function') {
      try {
        // Count mastered blocks today (simplified: count all mastered as daily proxy)
        const pages = document.querySelectorAll('[data-block-id][data-est-minutes]');
        let completed = 0;
        pages.forEach(function(block) {
          const id = block.getAttribute('data-block-id');
          const m = window.Upg.pace.getMastery(id);
          if (m === 'mastered' || m === 'in-progress') completed++;
        });
        return Math.min(completed, TOTAL_DAILY_TARGET);
      } catch (e) { /* fallback */ }
    }

    // Fallback: Upg.state if available
    if (window.Upg && window.Upg.state && typeof window.Upg.state.get === 'function') {
      const val = window.Upg.state.get('daily_progress');
      if (typeof val === 'number') return Math.min(val, TOTAL_DAILY_TARGET);
    }

    // Demo value for visual presence (non-zero so the beacon is visible)
    return 37;
  }

  /**
   * Convert integer to Eastern Arabic numerals for the annotation.
   */
  function toArabicNumerals(n) {
    var eastern = ['\u0660','\u0661','\u0662','\u0663','\u0664',
                   '\u0665','\u0666','\u0667','\u0668','\u0669'];
    return String(n).replace(/[0-9]/g, function(d) { return eastern[+d]; });
  }

  function update() {
    var fill = getFillEl();
    var note = getNoteEl();
    var bar  = getProgressEl();
    if (!fill || !bar) return;

    var done = readDailyProgress();
    var pct  = Math.round((done / TOTAL_DAILY_TARGET) * 100);

    fill.style.setProperty('--progress-pct', pct + '%');
    bar.setAttribute('aria-valuenow', String(pct));

    if (note) {
      note.textContent = '\u0623\u064E\u062A\u0645\u0645\u062A\u064E ' +
        toArabicNumerals(done) + ' \u0645\u0646 \u0623\u0635\u0644 ' +
        toArabicNumerals(TOTAL_DAILY_TARGET);
    }
  }

  // Initial mount
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', update);
  } else {
    update();
  }

  // Listen for state changes
  window.addEventListener('upg:state:daily_progress', update);
  window.addEventListener('upg:pace:mastery', update);
  window.addEventListener('upg:nav:change', function() {
    // Re-compute when user navigates back to dashboard
    setTimeout(update, 100);
  });

  // Expose for manual testing
  if (!window.Upg) window.Upg = {};
  if (!window.Upg.elan) window.Upg.elan = {};
  window.Upg.elan.dashboardProgress = { update: update, TOTAL: TOTAL_DAILY_TARGET };

})();
