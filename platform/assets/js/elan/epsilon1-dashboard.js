/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — ε1 — Dashboard Revival (Hibr) — Manuscript Margin Beacon
   ────────────────────────────────────────────────────────────────────────
   📊 DATA_BEACON wiring (ESM, side-effect module).

   What it does:
     1. Reads Upg.state when available (Upg.state.compute / Upg.state.get).
     2. Computes today's done/total tasks for the active user.
     3. Writes --progress-pct on the .bento-progress-margin host.
     4. Fills the [data-progress-margin-done], [-total], [-pct] nodes.
     5. Toggles data-progress-state="complete" when done >= total > 0.
     6. Re-runs on:
          · DOMContentLoaded (initial paint)
          · upg:state:change   (legacy)
          · upg:state:daily_progress (typed channel, if dispatched)
          · 30s interval (graceful fallback when no events fire)
     7. NEVER fabricates a number — if state has nothing, leaves the
        zeroes in place (PROVE-IT).

   Sacred preserved:  no Upg.* surface added; pure consumer.
   No HTML changes from JS:  only attribute writes (data-* + style).
   Reduced-motion:  CSS handles transition silencing; JS is unchanged.
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const HOST_SELECTOR = '#page-dashboard .bento-progress-margin';

  /** Read today's done/total from any reasonable Upg.state shape. */
  function readToday() {
    const Upg = (typeof window !== 'undefined' && window.Upg) || null;
    if (!Upg || !Upg.state) return { done: null, total: null };

    // 1) Preferred: Upg.state.compute() with a daily summary key.
    try {
      if (typeof Upg.state.compute === 'function') {
        const c = Upg.state.compute();
        if (c && typeof c === 'object') {
          // Common shapes seen across legacy modules.
          if (c.daily && typeof c.daily.done === 'number' && typeof c.daily.total === 'number') {
            return { done: c.daily.done, total: c.daily.total };
          }
          if (typeof c.todayDone === 'number' && typeof c.todayTotal === 'number') {
            return { done: c.todayDone, total: c.todayTotal };
          }
          if (typeof c.unitsCompletedToday === 'number' && typeof c.unitsPlannedToday === 'number') {
            return { done: c.unitsCompletedToday, total: c.unitsPlannedToday };
          }
        }
      }
    } catch (_) { /* swallow — never break the page on state read */ }

    // 2) Fallback: Upg.state.get('daily_progress') if present.
    try {
      if (typeof Upg.state.get === 'function') {
        const dp = Upg.state.get('daily_progress');
        if (dp && typeof dp === 'object'
            && typeof dp.done === 'number'
            && typeof dp.total === 'number') {
          return { done: dp.done, total: dp.total };
        }
      }
    } catch (_) { /* swallow */ }

    return { done: null, total: null };
  }

  /** Format the day caption (Sunday–Saturday in Arabic). */
  function dayLabel() {
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    try {
      const d = new Date();
      return days[d.getDay()] || 'اليوم';
    } catch (_) { return 'اليوم'; }
  }

  /** Apply the progress pair to the DOM. Idempotent. */
  function paint() {
    const host = document.querySelector(HOST_SELECTOR);
    if (!host) return;

    const { done, total } = readToday();
    const hasReal = (typeof done === 'number' && typeof total === 'number' && total > 0);

    // Day caption — always safe to write.
    const dayEl = host.querySelector('[data-progress-margin-day]');
    if (dayEl) dayEl.textContent = dayLabel();

    // Counts: if state has nothing, keep 0/0 (PROVE-IT).
    const doneEl  = host.querySelector('[data-progress-margin-done]');
    const totalEl = host.querySelector('[data-progress-margin-total]');
    const pctEl   = host.querySelector('[data-progress-margin-pct]');
    const fillEl  = host.querySelector('[data-progress-margin-fill]');

    const safeDone  = hasReal ? Math.max(0, Math.min(done, total)) : 0;
    const safeTotal = hasReal ? total : 0;
    const pct = hasReal ? Math.round((safeDone / safeTotal) * 100) : 0;

    if (doneEl)  doneEl.textContent  = String(safeDone);
    if (totalEl) totalEl.textContent = String(safeTotal);
    if (pctEl)   pctEl.textContent   = `${pct}%`;

    // Set CSS custom property on the host (CSS reads from .bento-progress-margin).
    host.style.setProperty('--progress-pct', `${pct}%`);
    if (fillEl) fillEl.style.setProperty('--progress-pct', `${pct}%`);

    // Completion state — only when there's a real total.
    if (hasReal && safeDone >= safeTotal && safeTotal > 0) {
      host.setAttribute('data-progress-state', 'complete');
    } else {
      host.removeAttribute('data-progress-state');
    }

    // Hint copy: suppress when there's a real total + at least one done.
    const hintEl = host.querySelector('[data-progress-margin-hint]');
    if (hintEl) {
      if (hasReal && safeDone > 0) {
        hintEl.textContent = (safeDone >= safeTotal)
          ? 'الهامش امتلأ — أتممتَ مهام اليوم.'
          : 'الحبر يَجري في الهامش بمقدار ما تُتمّ.';
      } else if (hasReal) {
        hintEl.textContent = 'ابدأ بأول وحدة، والحبر سَيَسري في الهامش بمقدار ما تُتمّ.';
      } else {
        hintEl.textContent = 'افتح وحدة لاحتساب تقدم اليوم.';
      }
    }
  }

  /** Lazy boot: run paint after the page is interactive, then keep listening. */
  function boot() {
    paint();

    // Listen on the legacy state-change channel.
    window.addEventListener('upg:state:change', paint);

    // Listen on the typed channel (forward-compat for ε-tier writers).
    window.addEventListener('upg:state:daily_progress', paint);

    // Also re-paint on nav-back-to-dashboard (cheap, idempotent).
    window.addEventListener('upg:nav:change', (e) => {
      const detail = (e && e.detail) || null;
      const target = detail && (detail.to || detail.page || detail.shard);
      if (!target || target === 'dashboard') paint();
    });

    // Soft fallback: re-paint every 30s in case a writer forgets to dispatch.
    setInterval(paint, 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
