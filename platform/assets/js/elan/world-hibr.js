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
