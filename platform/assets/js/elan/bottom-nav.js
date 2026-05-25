/*
 * ÊLAN v4 — δ4 — Mobile Bottom Nav (Plinth Mode + Maqamat Haptics)
 * ────────────────────────────────────────────────────────────────
 * Pillar δ KINETIC SHELL / Stage 4 of 6.
 *
 * 🏛 STRUCTURAL_BEACON — "Plinth, Not Pill"
 *
 * The platform already ships #dual-bottom-nav (Worker 24 / Pack v3) — a
 * fully built mobile bottom nav with safe-area, backdrop-filter, five
 * slots, prefers-reduced-transparency fallback, RTL-aware grid. This
 * module DOES NOT replace it. It enhances it in two ways, both opt-in:
 *
 *   1. Plinth mode  — `[data-elan-bottom-nav="plinth"]` on the existing
 *      nav element swaps glassmorphism for a brutalist solid plinth:
 *      no transparency, no rounded corners, single 1px ember top-edge
 *      drawn from the active world's `--ember`, plus a 2px ember bottom
 *      underline on the currently-active slot. The bar reads as a
 *      structural part of the page bottom, not a floating object.
 *
 *   2. Maqamat haptics — `Upg.haptic.play(pattern)` exposes three
 *      tactile patterns inspired by Arabic rhythmic vocabulary:
 *        • dafn    (نبر)     — 8 ms                     — gentle navigation
 *        • takk    (تَك)     — [12, 20, 12] ms          — accomplishment
 *        • maqsoom (مقسوم)   — [8, 30, 8, 30, 14] ms    — final save
 *      A delegated pointerup listener on #dual-bottom-nav fires `dafn`
 *      on regular slots and `takk` on the central FAB (cmdk).
 *
 * Reference Avoided:
 *   • Forbidden #3 — floating sidebar / pill nav clone (the plinth is
 *     deliberately NOT a floating pill; that is the entire point).
 *   • Forbidden #5 — soft-shadow + 12px radius default card.
 *   • Forbidden #15 — generic single-buzz haptic (we ship rhythmic
 *     patterns from a real musical tradition, not a stock buzz).
 *
 * Inspired-by: Wild Card #2 — Iraqi Brutalism (Mohammed Makiya,
 * Rifat Chadirji). The plinth is a structural block, not a hovering
 * decoration. Combined with Wild Card #4 — Maqamat music notation —
 * for the haptic vocabulary.
 *
 * Pivot note: spec δ4 declared 🤚 INTERACTION_BEACON. δ3 (Reading Tide)
 * just used INTERACTION; choosing it again would put 2 × INTERACTION
 * in a 3-stage window, triggering Creativity Doctrine § ٤ mandatory
 * pivot. Pivoted to STRUCTURAL (last used γ8 — 5 stages back, fresh
 * window). Maqamat haptics are still implemented (utility shipped),
 * but the declared Beacon is the structural plinth identity.
 *
 * Sacred preservation:
 *   • #dual-bottom-nav markup intact (no slot added or removed).
 *   • Default glass behavior preserved unchanged. Plinth is opt-in.
 *   • prefers-reduced-transparency, prefers-reduced-motion, forced-
 *     colors, print all respected.
 *   • No emoji emitted, no <svg viewBox> drawn, no hex literals,
 *     no core/icons stub import.
 *
 * Public API (registered on window.Upg):
 *   Upg.haptic.play(pattern)        — fire vibration pattern
 *   Upg.haptic.patterns()           — frozen copy of available patterns
 *   Upg.elan.bottomNav.engage()     — attach listeners (idempotent)
 *   Upg.elan.bottomNav.disengage()  — detach + remove plinth attr
 *   Upg.elan.bottomNav.setMode(m)   — 'glass' (default) | 'plinth'
 *   Upg.elan.bottomNav.getMode()    — current mode
 *   Upg.elan.bottomNav.isEngaged()  — boolean
 *
 * Authored: ÊLAN δ4 (2026-05-25)
 */

const NAV_SEL = '#dual-bottom-nav';
const ITEM_SEL = '.dual-bottom-nav-item';
const FAB_SEL = '.dual-bottom-nav-center';
const STORAGE_KEY = 'upg_elan_bottom_nav_mode';
const VALID_MODES = ['glass', 'plinth'];

const HAPTIC_PATTERNS = Object.freeze({
  dafn: 8,
  takk: Object.freeze([12, 20, 12]),
  maqsoom: Object.freeze([8, 30, 8, 30, 14]),
});

const state = {
  nav: null,
  attached: false,
  mode: 'glass',
  reducedMq: null,
};

/* ── Maqamat haptic API ──────────────────────────────────────────────── */
function vibrate (pattern) {
  if (!('vibrate' in navigator) || typeof navigator.vibrate !== 'function') return false;
  if (state.reducedMq && state.reducedMq.matches) return false;
  try {
    return navigator.vibrate(pattern);
  } catch (_) {
    return false;
  }
}

function play (patternName) {
  const name = (patternName || 'dafn').toString();
  const pattern = Object.prototype.hasOwnProperty.call(HAPTIC_PATTERNS, name)
    ? HAPTIC_PATTERNS[name]
    : HAPTIC_PATTERNS.dafn;
  // navigator.vibrate accepts arrays or numbers; clone arrays so we
  // do not pass a frozen array directly (some implementations flag).
  const value = Array.isArray(pattern) ? pattern.slice() : pattern;
  return vibrate(value);
}

function patterns () {
  return Object.freeze({
    dafn: HAPTIC_PATTERNS.dafn,
    takk: HAPTIC_PATTERNS.takk.slice(),
    maqsoom: HAPTIC_PATTERNS.maqsoom.slice(),
  });
}

/* ── plinth mode ─────────────────────────────────────────────────────── */
function setMode (mode) {
  const m = VALID_MODES.includes(mode) ? mode : 'glass';
  state.mode = m;
  if (state.nav) {
    if (m === 'plinth') {
      state.nav.setAttribute('data-elan-bottom-nav', 'plinth');
    } else {
      state.nav.removeAttribute('data-elan-bottom-nav');
    }
  }
  try { localStorage.setItem(STORAGE_KEY, m); } catch (_) {}
  return m;
}

function getMode () {
  return state.mode;
}

function loadStoredMode () {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (VALID_MODES.includes(stored)) return stored;
  } catch (_) {}
  return 'glass';
}

/* ── active slot tracking (works alongside legacy hash routing) ───────── */
function inferCurrentShard () {
  const hash = (location.hash || '').replace(/^#?(page-)?/, '');
  if (hash) return hash;
  const Upg = window.Upg;
  if (Upg && Upg.nav && typeof Upg.nav.current === 'function') {
    const cur = Upg.nav.current();
    if (cur) return String(cur).replace(/^page-/, '');
  }
  const bodyAttr = document.body.getAttribute('data-current-page');
  if (bodyAttr) return bodyAttr.replace(/^page-/, '');
  return '';
}

function updateActive () {
  if (!state.nav) return;
  const cur = inferCurrentShard();
  const items = state.nav.querySelectorAll(ITEM_SEL);
  items.forEach((it) => {
    const shard = it.getAttribute('data-shard');
    if (shard && shard === cur) {
      it.setAttribute('data-elan-active', 'true');
      it.setAttribute('aria-current', 'page');
    } else {
      it.removeAttribute('data-elan-active');
      // Only remove aria-current if WE set it; leave existing platform
      // markers alone if any.
      if (it.getAttribute('aria-current') === 'page' && !shard) return;
      it.removeAttribute('aria-current');
    }
  });
}

/* ── delegated haptic listener ────────────────────────────────────────── */
function onPointerUp (e) {
  const item = e.target && e.target.closest && e.target.closest(ITEM_SEL);
  if (!item || !state.nav.contains(item)) return;
  // Only respond to primary pointer activation; ignore sub-button
  // events (right-click, middle-click).
  if (e.button !== undefined && e.button !== 0) return;
  const isFab = item.matches(FAB_SEL);
  play(isFab ? 'takk' : 'dafn');
}

/* ── lifecycle ────────────────────────────────────────────────────────── */
function findNav () {
  return document.querySelector(NAV_SEL);
}

function engage () {
  if (state.attached) return;
  state.nav = findNav();
  if (!state.nav) return;
  state.reducedMq = matchMedia('(prefers-reduced-motion: reduce)');

  // Restore last user-chosen mode (default: glass — Sacred behavior).
  setMode(loadStoredMode());

  state.nav.addEventListener('pointerup', onPointerUp, { passive: true });
  document.addEventListener('upg:nav:change', updateActive);
  window.addEventListener('hashchange', updateActive);

  updateActive();
  state.attached = true;
}

function disengage () {
  if (!state.attached) return;
  if (state.nav) {
    state.nav.removeEventListener('pointerup', onPointerUp);
    state.nav.removeAttribute('data-elan-bottom-nav');
    state.nav.querySelectorAll('[data-elan-active="true"]').forEach((it) => {
      it.removeAttribute('data-elan-active');
    });
  }
  document.removeEventListener('upg:nav:change', updateActive);
  window.removeEventListener('hashchange', updateActive);
  state.attached = false;
}

function isEngaged () {
  return state.attached;
}

/* ── boot ─────────────────────────────────────────────────────────────── */
function boot () {
  engage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

/* ── register on window.Upg ──────────────────────────────────────────── */
const w = typeof window !== 'undefined' ? window : null;
if (w) {
  w.Upg = w.Upg || {};
  // Maqamat haptic API — top-level on Upg (used by other modules later).
  if (!w.Upg.haptic) {
    w.Upg.haptic = Object.freeze({ play, patterns });
  }
  // Bottom-nav controls — namespaced under Upg.elan.
  w.Upg.elan = w.Upg.elan || {};
  w.Upg.elan.bottomNav = {
    engage,
    disengage,
    setMode,
    getMode,
    isEngaged,
  };
}

export { engage, disengage, setMode, getMode, isEngaged, play as haptic, patterns };
