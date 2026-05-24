/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — γ5 — Hadeed world JS: Iron Stamp Beacon
   ────────────────────────────────────────────────────────────────────────
   🤚 INTERACTION_BEACON

   Two micro-interactions unique to the Hadeed world:

   1. STAMP FLIP — Practice buttons (.practice-tried-btn) flip 180°
      horizontally on press (like an iron stamp hitting paper), then
      snap back to reveal the toggled state. Mechanical, decisive.

   2. RED SWEEP — Sales framework rows (.sf-row[role="button"]) flash
      a crimson sweep line RTL (80ms) on activation, referencing
      split-flap departure boards in mid-century Beirut signage.

   Both interactions auto-engage when the Hadeed world is active and
   disengage cleanly on world change. Keyboard accessible (Enter/Space).

   Public API: window.Upg.worlds.hadeed
   ─────────────────────────────────────────────────────────────────────── */

const STAMP_SELECTOR = '.practice-tried-btn';
const SWEEP_SELECTOR = '.sf-row[role="button"], .sf-row[tabindex="0"]';
const STAMP_DURATION = 200; /* ms — matches --duration-hadeed-stamp */
const SWEEP_DURATION = 300; /* ms — sweep visible before auto-clean */

let _active = false;

/* ─── Stamp Flip ─── */
function _onStampClick(e) {
  const btn = e.target.closest(STAMP_SELECTOR);
  if (!btn) return;

  /* Reduced motion: skip animation */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    _togglePressed(btn);
    return;
  }

  /* Start flip */
  btn.classList.add('is-stamping');

  /* At midpoint (half flip), toggle state */
  setTimeout(() => {
    _togglePressed(btn);
    btn.classList.remove('is-stamping');
  }, STAMP_DURATION);
}

function _togglePressed(btn) {
  const current = btn.getAttribute('aria-pressed') === 'true';
  btn.setAttribute('aria-pressed', String(!current));
}

/* ─── Red Sweep ─── */
function _onSweepActivate(e) {
  const row = e.target.closest(SWEEP_SELECTOR);
  if (!row) return;

  /* Keyboard: only Enter or Space */
  if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
  if (e.type === 'keydown') e.preventDefault();

  /* Skip if already swept recently */
  if (row.classList.contains('is-swept')) return;

  row.classList.add('is-swept');

  /* Clean up after sweep visible duration */
  setTimeout(() => {
    row.classList.remove('is-swept');
  }, SWEEP_DURATION);
}

/* ─── Engage / Disengage ─── */
function engage() {
  if (_active) return;
  _active = true;

  document.addEventListener('click', _onStampClick, { passive: true });
  document.addEventListener('click', _onSweepActivate, { passive: true });
  document.addEventListener('keydown', _onSweepActivate);
}

function disengage() {
  if (!_active) return;
  _active = false;

  document.removeEventListener('click', _onStampClick);
  document.removeEventListener('click', _onSweepActivate);
  document.removeEventListener('keydown', _onSweepActivate);
}

/* ─── Auto-wire: world change events ─── */
document.addEventListener('upg:world:change', (e) => {
  const { to } = e.detail || {};
  if (to === 'hadeed') {
    engage();
  } else {
    disengage();
  }
});

/* ─── Init: engage if already in Hadeed ─── */
function init() {
  if (document.body?.getAttribute('data-world') === 'hadeed') {
    engage();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  requestAnimationFrame(init);
}

/* ─── Export ─── */
const UpgWorldHadeed = Object.freeze({ engage, disengage });

if (typeof window !== 'undefined') {
  window.Upg = window.Upg || {};
  window.Upg.worlds = window.Upg.worlds || {};
  window.Upg.worlds.hadeed = UpgWorldHadeed;
}

export default UpgWorldHadeed;
