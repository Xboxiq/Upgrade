/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — ε1 — Dashboard Content Revival (Hibr world)
   ────────────────────────────────────────────────────────────────────────
   📊 DATA_BEACON — Manuscript Marginalia

   The dashboard gains three Hibr-world enhancements:
   1. Stat-tiles augmented with data-hibr-ms (manuscript mode) hook
   2. Greeting hero augmented with data-hibr-colophon + time-aware salutation
   3. Scribe progress line: an ink quill that fills with overall mastery %

   Public API: Upg.worlds.hibr.dashboard (nested, no top-level inflation)
   Sacred preserved: 16 pages, all Upg.* APIs, 391 qcalc, zero text removal.
   ════════════════════════════════════════════════════════════════════════ */

;(function epsilon1Dashboard() {
  'use strict';

  /* ── Constants ──────────────────────────────────────────────────────── */

  const SALUTATIONS = Object.freeze({
    morning:   'صباح الحِبر',       // "morning of ink" — creative start
    afternoon: 'عصر الكتابة',       // "age of writing" — productive hours
    evening:   'مساء المخطوط',      // "evening of the manuscript" — review
    night:     'ليل النُّسَّاخ',    // "night of the scribes" — deep work
  });

  const SLICE = Object.freeze({
    morning:   [5, 12],
    afternoon: [12, 17],
    evening:   [17, 21],
    night:     [21, 5],
  });

  /* ── Helpers ────────────────────────────────────────────────────────── */

  function currentSlice() {
    const h = new Date().getHours();
    if (h >= SLICE.morning[0] && h < SLICE.morning[1]) return 'morning';
    if (h >= SLICE.afternoon[0] && h < SLICE.afternoon[1]) return 'afternoon';
    if (h >= SLICE.evening[0] && h < SLICE.evening[1]) return 'evening';
    return 'night';
  }

  function isHibrActive() {
    return document.body.dataset.world === 'hibr' ||
           !!document.querySelector('#page-dashboard.active[data-world="hibr"]') ||
           !!document.querySelector('#page-dashboard.is-active[data-world="hibr"]');
  }

  /* ── 1. Augment stat-tiles with manuscript hook ─────────────────────── */

  function augmentStatTiles() {
    const dashboard = document.getElementById('page-dashboard');
    if (!dashboard) return 0;

    const tiles = dashboard.querySelectorAll('.stat-tile:not([data-hibr-ms])');
    let count = 0;
    tiles.forEach(tile => {
      tile.setAttribute('data-hibr-ms', 'true');
      count++;
    });
    return count;
  }

  /* ── 2. Augment greeting with colophon hook + salutation ────────────── */

  function augmentGreeting() {
    const greet = document.querySelector('#page-dashboard .bento-greet');
    if (!greet) return false;
    if (greet.hasAttribute('data-hibr-colophon')) return false;

    greet.setAttribute('data-hibr-colophon', 'true');

    // Time-aware salutation: enrich the eyebrow
    const eyebrow = greet.querySelector('.h-eyebrow');
    if (eyebrow) {
      const slice = currentSlice();
      const salutation = SALUTATIONS[slice];
      eyebrow.textContent = salutation;
      eyebrow.setAttribute('data-hibr-slice', slice);
    }

    return true;
  }

  /* ── 3. Scribe progress line ────────────────────────────────────────── */

  function injectScribeProgress() {
    const greet = document.querySelector('#page-dashboard .bento-greet[data-hibr-colophon]');
    if (!greet) return false;
    if (greet.querySelector('.hibr-scribe-line')) return false;

    // Compute mastery % from Upg.pace if available, else estimate from Upg.state
    let progress = 0;
    if (window.Upg && window.Upg.pace && typeof window.Upg.pace.getMastery === 'function') {
      // Count mastered blocks across all pages
      try {
        const allPages = ['callcenter', 'fieldsales', 'accountmgr', 'social', 'lab',
                          'psych', 'eq', 'negotiation', 'customercare', 'programming',
                          'accounting', 'phonerepair', 'hrmastery'];
        let mastered = 0;
        let total = 0;
        allPages.forEach(page => {
          const blocks = document.querySelectorAll(
            `#page-${page} [data-block-id]`
          );
          blocks.forEach(block => {
            total++;
            const m = window.Upg.pace.getMastery(block.dataset.blockId);
            if (m === 'mastered') mastered++;
          });
        });
        if (total > 0) progress = Math.round((mastered / total) * 100);
      } catch (_) { /* graceful */ }
    }

    // Fallback: use unitsCompleted stat if available
    if (progress === 0) {
      const unitsStat = document.querySelector('[data-cath-stat="unitsCompleted"]');
      if (unitsStat) {
        const val = parseInt(unitsStat.textContent, 10);
        if (val > 0) progress = Math.min(100, Math.round((val / 50) * 100));
      }
    }

    // Build DOM
    const line = document.createElement('div');
    line.className = 'hibr-scribe-line';
    line.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.className = 'hibr-scribe-label';
    label.textContent = 'مسيرة الكاتب';

    const quill = document.createElement('div');
    quill.className = 'hibr-scribe-quill';
    quill.style.setProperty('--hibr-quill-progress', progress + '%');

    const pct = document.createElement('span');
    pct.className = 'hibr-scribe-label';
    pct.textContent = progress + '%';

    line.appendChild(label);
    line.appendChild(quill);
    line.appendChild(pct);

    // Insert after the greeting meta
    const meta = greet.querySelector('.bento-greet-meta');
    if (meta) {
      meta.insertAdjacentElement('afterend', line);
    } else {
      greet.appendChild(line);
    }

    return true;
  }

  /* ── 4. Refresh salutation on nav back to dashboard ─────────────────── */

  function refreshSalutation() {
    const eyebrow = document.querySelector(
      '#page-dashboard .bento-greet[data-hibr-colophon] .h-eyebrow'
    );
    if (!eyebrow) return;
    const slice = currentSlice();
    const salutation = SALUTATIONS[slice];
    if (eyebrow.textContent !== salutation) {
      eyebrow.textContent = salutation;
      eyebrow.setAttribute('data-hibr-slice', slice);
    }
  }

  /* ── 5. Refresh quill progress ──────────────────────────────────────── */

  function refreshQuill() {
    const quill = document.querySelector('#page-dashboard .hibr-scribe-quill');
    if (!quill) return;

    let progress = 0;
    if (window.Upg && window.Upg.pace && typeof window.Upg.pace.getMastery === 'function') {
      try {
        const pages = ['callcenter', 'fieldsales', 'accountmgr', 'social', 'lab',
                       'psych', 'eq', 'negotiation', 'customercare', 'programming',
                       'accounting', 'phonerepair', 'hrmastery'];
        let mastered = 0, total = 0;
        pages.forEach(p => {
          document.querySelectorAll(`#page-${p} [data-block-id]`).forEach(b => {
            total++;
            if (window.Upg.pace.getMastery(b.dataset.blockId) === 'mastered') mastered++;
          });
        });
        if (total > 0) progress = Math.round((mastered / total) * 100);
      } catch (_) { /* graceful */ }
    }

    if (progress === 0) {
      const unitsStat = document.querySelector('[data-cath-stat="unitsCompleted"]');
      if (unitsStat) {
        const val = parseInt(unitsStat.textContent, 10);
        if (val > 0) progress = Math.min(100, Math.round((val / 50) * 100));
      }
    }

    quill.style.setProperty('--hibr-quill-progress', progress + '%');
    const pctEl = quill.parentElement && quill.parentElement.querySelector('.hibr-scribe-label:last-child');
    if (pctEl) pctEl.textContent = progress + '%';
  }

  /* ── Init ───────────────────────────────────────────────────────────── */

  function init() {
    if (!isHibrActive()) return;
    augmentStatTiles();
    augmentGreeting();
    injectScribeProgress();
  }

  /* ── Bootstrap ──────────────────────────────────────────────────────── */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  // Re-run on navigation back to dashboard
  document.addEventListener('upg:nav:change', (e) => {
    const detail = e.detail || {};
    if (detail.page === 'dashboard' || detail.pageId === 'dashboard') {
      requestAnimationFrame(() => {
        augmentStatTiles();
        augmentGreeting();
        injectScribeProgress();
        refreshSalutation();
      });
    }
  });

  // Refresh quill on mastery changes
  document.addEventListener('upg:pace:mastery', () => {
    if (isHibrActive()) refreshQuill();
  });

  /* ── Public API ─────────────────────────────────────────────────────── */

  window.Upg = window.Upg || {};
  window.Upg.worlds = window.Upg.worlds || {};
  window.Upg.worlds.hibr = window.Upg.worlds.hibr || {};

  if (!window.Upg.worlds.hibr.dashboard) {
    window.Upg.worlds.hibr.dashboard = Object.freeze({
      augmentStatTiles,
      augmentGreeting,
      injectScribeProgress,
      refreshSalutation,
      refreshQuill,
      salutations: SALUTATIONS,
      currentSlice,
    });
  }

})();
