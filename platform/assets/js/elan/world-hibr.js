/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — γ2 — Hibr world JS: ink-drying CTA Beacon
   ────────────────────────────────────────────────────────────────────────
   ✍️ TYPOGRAPHIC_BEACON

   When a Hibr CTA is "succeeded" (clicked + considered complete by the
   page), its label fills with ink from the first letter to the last
   over `var(--duration-hibr-dry)` (600ms by default). No checkmark,
   no toast — the act of writing IS the success indicator.

   Selectors that auto-bind on click:
     - .btn-success-action
     - [data-cta="completed"]
     - [data-ink-dry]

   The handler does NOT prevent default, does NOT swallow events, and
   strictly only adds the `.is-drying` class. Pages remain in control of
   navigation, focus, and any actual data persistence.

   Reduced-motion: CSS already shrinks the duration to 1ms — no JS branch.

   Public API: window.Upg.worlds.hibr (32nd Upg.* sub-API; nested under
   Upg.worlds, the per-world bag, so it does NOT inflate the top-level
   surface count).
   ─────────────────────────────────────────────────────────────────────── */

const SELECTOR = [
  '.btn-success-action',
  '[data-cta="completed"]',
  '[data-ink-dry]',
].join(', ');

function isInHibrWorld(el) {
  return !!el.closest('[data-world="hibr"]') ||
         document.body.dataset.world === 'hibr';
}

function activateInkDry(el, opts) {
  if (!el || !(el instanceof Element)) return false;
  if (el.classList.contains('is-drying')) return false;

  // Respect reduced motion at the JS layer too — keeps the class lifetime
  // honest even if a page bypasses the CSS transition.
  const reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lifetimeMs = (opts && Number.isFinite(opts.lifetime))
    ? opts.lifetime
    : (reduce ? 1 : 1400);

  // rAF prevents the browser from collapsing the start/end states into
  // a single paint when the click handler fires synchronously.
  requestAnimationFrame(() => {
    el.classList.add('is-drying');
    el.setAttribute('data-ink-state', 'drying');
  });

  // Auto-clean after a comfortable post-dry rest, so the SAME button
  // can be re-armed on a second click.
  if (lifetimeMs > 0) {
    window.setTimeout(() => {
      el.classList.remove('is-drying');
      el.removeAttribute('data-ink-state');
    }, lifetimeMs);
  }
  return true;
}

function handleClick(e) {
  const el = e.target.closest(SELECTOR);
  if (!el) return;
  if (!isInHibrWorld(el)) return;
  activateInkDry(el);
}

// Single delegated listener — survives DOM mutations, no per-button bind
function init() {
  if (document.body.dataset.hibrBeaconBound === 'true') return;
  document.body.dataset.hibrBeaconBound = 'true';
  document.addEventListener('click', handleClick, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

// Public API — nested under Upg.worlds so the top-level Upg.* count
// stays honest (still 31 after γ1 + this stage).
window.Upg = window.Upg || {};
window.Upg.worlds = window.Upg.worlds || {};
if (!window.Upg.worlds.hibr) {
  window.Upg.worlds.hibr = Object.freeze({
    activateInkDry,
    selector: SELECTOR,
  });
}

export { activateInkDry, SELECTOR };



/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — ε1 — Hibr / Dashboard driver
   ────────────────────────────────────────────────────────────────────────
   📊 DATA_BEACON — manuscript-margin progress

   Drives:
     1. The vertical reservoir on .progress-margin
        - reads done/total from data-elan-progress-* spans (or Upg.state)
        - sets `--progress-pct` (clamped 0..100)
        - mirrors aria-valuenow
        - flips .is-passed on every rib whose --rib-pos has been crossed
     2. The "ما تبقّى اليوم" countdown (Cell D)
        - ticks once per minute
        - writes HH (data-elan-countdown-h) + MM (data-elan-countdown-m)

   No new top-level Upg.* surface. Lives under Upg.worlds.hibr (γ2 bag),
   so the Upg.* top-level count is unchanged.

   Reduced-motion: the CSS transition is already shrunk to 1ms; the JS
   pathway is identical (we still set --progress-pct exactly once on init,
   and every time data changes).
   ─────────────────────────────────────────────────────────────────────── */

const PROGRESS_HOST_SELECTOR = '[data-elan-progress-margin]';
const PROGRESS_DONE_SELECTORS  = ['[data-elan-progress-done]', '[data-elan-progress-done-text]'];
const PROGRESS_TOTAL_SELECTORS = ['[data-elan-progress-total]', '[data-elan-progress-total-text]'];
const PROGRESS_PCT_SELECTOR    = '[data-elan-progress-pct]';

function clampPct(n) {
  if (!Number.isFinite(n)) return 0;
  if (n < 0) return 0;
  if (n > 100) return 100;
  return n;
}

/**
 * Read the current done/total values from either:
 *   1. Upg.state.get('daily_progress')  → { done, total } (preferred)
 *   2. data-elan-progress-done + data-elan-progress-total in the DOM
 *   3. fallback defaults: done=0, total=50 (matches HTML defaults)
 */
function readProgressValues() {
  // 1. Upg.state (W11 unified state layer)
  try {
    const Upg = window.Upg;
    if (Upg && Upg.state && typeof Upg.state.get === 'function') {
      const v = Upg.state.get('daily_progress');
      if (v && Number.isFinite(v.done) && Number.isFinite(v.total) && v.total > 0) {
        return { done: v.done, total: v.total, source: 'state' };
      }
    }
  } catch (_e) {/* state layer absent or threw — fall through */}

  // 2. DOM
  const doneEl  = document.querySelector('[data-elan-progress-done]');
  const totalEl = document.querySelector('[data-elan-progress-total]');
  const done  = doneEl  ? parseInt(doneEl.textContent.replace(/[^\d-]/g, ''), 10)  : NaN;
  const total = totalEl ? parseInt(totalEl.textContent.replace(/[^\d-]/g, ''), 10) : NaN;
  if (Number.isFinite(done) && Number.isFinite(total) && total > 0) {
    return { done, total, source: 'dom' };
  }

  // 3. fallback
  return { done: 0, total: 50, source: 'default' };
}

function updateProgressMargin(values) {
  const host = document.querySelector(PROGRESS_HOST_SELECTOR);
  if (!host) return false;

  const { done, total } = values || readProgressValues();
  const pct = clampPct(total > 0 ? Math.round((done / total) * 100) : 0);

  // 1. CSS custom prop drives the .progress-margin__fill block-size
  host.style.setProperty('--progress-pct', pct + '%');

  // 2. ARIA mirror
  host.setAttribute('aria-valuenow', String(pct));
  host.setAttribute('aria-valuetext', done + ' من ' + total + ' (' + pct + '٪)');

  // 3. Pass-state on each rib (20% / 40% / 60% / 80%)
  const ribs = host.querySelectorAll('.progress-margin__ribs li');
  ribs.forEach((rib) => {
    const ribPos = parseFloat(rib.style.getPropertyValue('--rib-pos')) || 0;
    if (pct >= ribPos) rib.classList.add('is-passed');
    else rib.classList.remove('is-passed');
  });

  // 4. Mirror to all done/total/pct text spans (idempotent — handles dual-rendered DOM)
  PROGRESS_DONE_SELECTORS.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => { el.textContent = String(done); });
  });
  PROGRESS_TOTAL_SELECTORS.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => { el.textContent = String(total); });
  });
  document.querySelectorAll(PROGRESS_PCT_SELECTOR).forEach((el) => { el.textContent = String(pct); });

  return true;
}

/* ── Time Remaining countdown ────────────────────────────────────────── */

let __countdownTimerId = null;

function pad2(n) { return String(n).padStart(2, '0'); }

function tickCountdown() {
  const hEl = document.querySelector('[data-elan-countdown-h]');
  const mEl = document.querySelector('[data-elan-countdown-m]');
  if (!hEl && !mEl) return false;

  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(24, 0, 0, 0); // next midnight
  const msLeft = Math.max(0, endOfDay - now);
  const totalMin = Math.floor(msLeft / 60000);
  const hh = Math.floor(totalMin / 60);
  const mm = totalMin % 60;

  if (hEl) hEl.textContent = pad2(hh);
  if (mEl) mEl.textContent = pad2(mm);
  return true;
}

function startCountdown() {
  if (__countdownTimerId) return;
  if (!tickCountdown()) return; // no host on page → silent no-op
  // Tick at the top of the next minute, then every 60s.
  const now = new Date();
  const msToNextMin = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
  __countdownTimerId = window.setTimeout(function loop() {
    tickCountdown();
    __countdownTimerId = window.setInterval(tickCountdown, 60000);
  }, msToNextMin);
}

function stopCountdown() {
  if (__countdownTimerId) {
    window.clearTimeout(__countdownTimerId);
    window.clearInterval(__countdownTimerId);
    __countdownTimerId = null;
  }
}

/* ── Page lifecycle: init + react to nav changes ─────────────────────── */

function bootEpsilon1() {
  // Manuscript margin
  updateProgressMargin();

  // Countdown
  startCountdown();

  // React to subsequent state changes (W11 state layer broadcasts)
  try {
    document.addEventListener('upg:state:daily_progress', () => updateProgressMargin(), { passive: true });
  } catch (_e) {/* no-op */}

  // React to nav changes — when leaving dashboard, stop the timer; when
  // returning, resume.
  document.addEventListener('upg:nav:change', (ev) => {
    const pageId = (ev && ev.detail && ev.detail.pageId) || '';
    if (pageId === 'page-dashboard') {
      updateProgressMargin();
      startCountdown();
    } else {
      stopCountdown();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootEpsilon1, { once: true });
} else {
  bootEpsilon1();
}

// Extend Upg.worlds.hibr without losing the γ2 surface (already frozen).
// We replace the frozen object with a new frozen object that carries both.
try {
  const prev = (window.Upg && window.Upg.worlds && window.Upg.worlds.hibr) || {};
  window.Upg.worlds.hibr = Object.freeze({
    activateInkDry: prev.activateInkDry,
    selector:       prev.selector,
    // ε1 additions:
    setProgress(done, total) {
      const d = Number(done), t = Number(total);
      if (!Number.isFinite(d) || !Number.isFinite(t) || t <= 0) return false;
      // Mirror to DOM so subsequent reads pick it up
      document.querySelectorAll('[data-elan-progress-done],[data-elan-progress-done-text]').forEach((el) => { el.textContent = String(d); });
      document.querySelectorAll('[data-elan-progress-total],[data-elan-progress-total-text]').forEach((el) => { el.textContent = String(t); });
      return updateProgressMargin({ done: d, total: t });
    },
    refreshProgress: () => updateProgressMargin(),
    refreshCountdown: () => tickCountdown(),
  });
} catch (_e) {/* freeze failed (very old browser) — non-fatal */}

export { updateProgressMargin, tickCountdown };
