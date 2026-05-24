/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — γ2 — World 1: حِبر (Hibr) — Ink — Beacon Controller (ESM)
   ────────────────────────────────────────────────────────────────────────
   ✍️ TYPOGRAPHIC_BEACON — Ink-Drying Text Reveal

   When the hibr world activates, this controller stages the
   "writing itself onto the manuscript" effect for two pathways:

     1. PASSIVE — every visible .bento-stat-value / .stat-tile-value
        gets `.is-drying` on a small stagger as the dashboard enters.
        First paint of the world looks like the calligrapher's pen
        finishing the page in real time.

     2. SUCCESS — any .btn-success-action / [data-action="completed"]
        / [data-action="save-progress"] / [data-track="completed"]
        gets `.is-drying` on click. No ✓ check. No counter from 0.

   The CSS in worlds/_hibr.css does the actual animation;
   this file only sets/clears the `.is-drying` class.

   Public API: window.Upg.worlds.hibr.{ dry, dryAll, refresh, demo }
   ════════════════════════════════════════════════════════════════════════ */

const SUCCESS_SELECTOR = [
  '.btn-success-action',
  '[data-action="completed"]',
  '[data-action="save-progress"]',
  '[data-track="completed"]',
].join(', ');

const PASSIVE_SELECTOR = [
  '.bento-stat-value',
  '.stat-tile-value',
].join(', ');

const STAGGER_MS = 90;
const HIBR_SCOPE = 'body[data-world="hibr"]';

/* ── primitives ──────────────────────────────────────────────────────── */

function dry(el) {
  if (!el || el.classList.contains('is-drying')) return false;
  // rAF so the initial transparent state has a frame to paint
  requestAnimationFrame(() => el.classList.add('is-drying'));
  return true;
}

function dryAll(selector, { stagger = STAGGER_MS } = {}) {
  const nodes = Array.from(document.querySelectorAll(`${HIBR_SCOPE} ${selector}`));
  nodes.forEach((node, i) => setTimeout(() => dry(node), stagger * i));
  return nodes.length;
}

function refresh() {
  // Reset stat-tile values so the reveal can be re-played.
  document.querySelectorAll(`${HIBR_SCOPE} ${PASSIVE_SELECTOR}.is-drying`)
    .forEach(el => el.classList.remove('is-drying'));
  // Re-stage on next frame
  requestAnimationFrame(() => dryAll(PASSIVE_SELECTOR));
}

/* ── click pathway — bind once via event delegation ──────────────────── */

function bindSuccessDelegation() {
  if (document.body.dataset.hibrSuccessBound === 'true') return;
  document.body.dataset.hibrSuccessBound = 'true';
  document.addEventListener('click', (e) => {
    if (document.body.dataset.world !== 'hibr') return;
    const target = e.target.closest(SUCCESS_SELECTOR);
    if (!target) return;
    dry(target);
  }, { passive: true });
}

/* ── world-entry pathway — passive reveal of stat values ─────────────── */

function onWorldChange(e) {
  if (e?.detail?.world !== 'hibr') return;
  // Wait for the next frame so any view-transition has settled.
  requestAnimationFrame(() => dryAll(PASSIVE_SELECTOR));
}

function init() {
  bindSuccessDelegation();
  document.addEventListener('upg:world:change', onWorldChange);
  // Initial pass — if the dashboard is already in hibr (the default), reveal now.
  if (document.body?.dataset.world === 'hibr') {
    requestAnimationFrame(() => dryAll(PASSIVE_SELECTOR));
  }
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
  if (!window.Upg.worlds.hibr) {
    window.Upg.worlds.hibr = Object.freeze({
      /** Apply the ink-dry sweep to a single element. */
      dry,
      /** Apply to every element matching `selector` inside the hibr scope. */
      dryAll: (selector, opts) =>
        dryAll(typeof selector === 'string' ? selector : PASSIVE_SELECTOR, opts),
      /** Reset and replay the passive reveal (stat values). */
      refresh,
      /** Demo: reveal all eligible elements once. Useful from console. */
      demo: () => {
        const a = dryAll(PASSIVE_SELECTOR);
        const b = dryAll(SUCCESS_SELECTOR);
        return { stats: a, ctas: b };
      },
    });
  }
}

export { dry, dryAll, refresh };
