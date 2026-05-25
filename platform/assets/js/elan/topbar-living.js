/*
 * ÊLAN v4 — δ3 — Living Topbar (Reading Tide)
 * ─────────────────────────────────────────────
 * Pillar δ KINETIC SHELL / Stage 3 of 6.
 *
 * 🤚 INTERACTION_BEACON
 *
 * The Surprise: the topbar's page-title (existing #topbar-title) is no
 * longer static text. As the user scrolls through the active page, the
 * title fills with ink from inline-end to inline-start (RTL-natural)
 * via a `background-clip: text` gradient whose stop is wired to a
 * single CSS custom property: --scroll-pct. A second hairline — a 1px
 * ember "tide line" along the topbar's lower edge — grows in the same
 * direction. Clicking the title rewinds the active page to its top
 * (smooth on systems that allow motion, instant when prefers-reduced-
 * motion is set). The chrome reports back to the user how far they've
 * read, then becomes the gesture that takes them home.
 *
 * Reference Avoided:
 *   • Forbidden #10 — pulsing dot (the spec's original META beacon was
 *     a 75bpm pulse; pulse-dot is Forbidden Library #10 verbatim).
 *   • Forbidden #11 — animated counter from 0 (no number ever ticks).
 *   • Forbidden #15 — modal-with-dark-overlay (no overlay, no modal).
 *
 * Inspired-by: Wild Card #5 — Yemeni mihrab geometry. The mihrab is a
 * niche; geometry fills inward from the periphery to the center. The
 * Reading Tide fills the title from the natural Arabic "tail" of the
 * line toward the head, like ink absorbed by paper at a fixed flow.
 *
 * Pivot note: spec δ3 proposed 🪞 META beacon. γ9 (Saloon mirror) was
 * a high-impact META beacon four stages back; choosing META again so
 * soon would dilute it. Per Creativity Doctrine § ٤ disruption rule,
 * pivot to INTERACTION (last used γ5 — 5 stages ago, fresh window).
 *
 * Sacred preservation:
 *   • #topbar markup intact (no node added or removed).
 *   • #topbar-title / #topbar-breadcrumb IDs untouched.
 *   • Existing data-scrolled attribute respected; we do not fight the
 *     legacy scroll-island behavior, we layer with --scroll-pct.
 *   • No emoji emitted, no <svg viewBox> drawn, no hex literals in JS.
 *   • Reduced-motion: gradient still updates (it's a static
 *     representation of position, not motion); only smooth-scroll
 *     becomes instant.
 *
 * Public API (registered on window.Upg.elan.topbar):
 *   engage()        — attach scroll + click bindings (idempotent)
 *   disengage()     — detach + reset --scroll-pct to 0
 *   getProgress()   — number 0..1, last computed scroll fraction
 *   scrollToTop()   — programmatic rewind, honors reduced-motion
 *   isEngaged()     — boolean
 *
 * Authored: ÊLAN δ3 (2026-05-25)
 */

const TOPBAR_SEL = '#topbar';
const TITLE_SEL = '#topbar-title';
const PAGE_ACTIVE_SEL = '.page.active';
const SCROLL_DAMP = 4;          // round %-pct to 1/4-percent steps
const READ_THRESHOLD = 0.98;    // when to flip data-read=true

const state = {
  topbar: null,
  title: null,
  raf: 0,
  attached: false,
  lastPct: -1,
  scrollSources: [],
  reducedMq: null,
  resizeObserver: null,
};

/* ── DOM lookup ───────────────────────────────────────────────────────── */
function findTopbar () {
  return document.querySelector(TOPBAR_SEL);
}

function findTitle () {
  return document.querySelector(TITLE_SEL);
}

function getActivePage () {
  return document.querySelector(PAGE_ACTIVE_SEL) || document.querySelector('main') || document.body;
}

/* ── progress measurement ──────────────────────────────────────────────
 * Strategy: try the active page section first (it's RTL-friendly and
 * the existing platform's natural unit). Fall back to documentElement.
 * If the page is shorter than the viewport, scroll-pct is always 0 and
 * the tide stays at the inline-end edge — that's honest.                */
function computeProgress () {
  const page = getActivePage();
  if (!page) return 0;
  const rect = page.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight || 1;
  const total = page.scrollHeight - vh;
  if (total <= 0) return 0;
  // rect.top is negative once the page top has scrolled past the viewport top.
  const consumed = Math.max(0, -rect.top);
  const ratio = consumed / total;
  if (ratio < 0) return 0;
  if (ratio > 1) return 1;
  return ratio;
}

function quantize (n) {
  // Reduce churn: round to 1/(SCROLL_DAMP*100). 0.4-pct steps default.
  const step = 1 / (SCROLL_DAMP * 100);
  return Math.round(n / step) * step;
}

function applyProgress () {
  if (!state.topbar) return;
  const raw = computeProgress();
  const pct = quantize(raw);
  if (pct === state.lastPct) return;
  state.lastPct = pct;
  state.topbar.style.setProperty('--scroll-pct', pct.toFixed(4));
  if (pct >= READ_THRESHOLD) {
    state.topbar.setAttribute('data-read', 'true');
  } else if (state.topbar.hasAttribute('data-read')) {
    state.topbar.removeAttribute('data-read');
  }
}

function scheduleApply () {
  if (state.raf) return;
  state.raf = requestAnimationFrame(() => {
    state.raf = 0;
    applyProgress();
  });
}

/* ── scroll source detection ──────────────────────────────────────────
 * The platform uses a mixture of body-scroll (legacy pages) and main-
 * scroll (newer shells). Listen on whichever element has overflow on
 * Y, plus window for safety.                                           */
function detectScrollSources () {
  const candidates = [
    window,
    document,
    document.scrollingElement,
    document.documentElement,
    document.querySelector('#main'),
    document.querySelector('main'),
  ].filter(Boolean);
  // De-duplicate while preserving order.
  const seen = new Set();
  const unique = [];
  for (const c of candidates) {
    if (seen.has(c)) continue;
    seen.add(c);
    unique.push(c);
  }
  return unique;
}

function onScrollOrResize () {
  scheduleApply();
}

/* ── click-to-rewind ──────────────────────────────────────────────────
 * Title becomes a button. We do NOT replace the element; we attach a
 * pointer listener and add cursor + role on the existing node.        */
function onTitleActivate (e) {
  // Allow modifier-clicks to behave naturally (open in new tab makes no
  // sense for a non-link, but be defensive).
  if (e.type === 'click' && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) return;
  if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
  e.preventDefault();
  scrollToTop();
}

function scrollToTop () {
  const reduce = state.reducedMq && state.reducedMq.matches;
  const page = getActivePage();
  if (!page) return;
  const targetY = page.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0);
  const behavior = reduce ? 'auto' : 'smooth';
  // Try the canonical scroll first, then fall back to per-element.
  if (typeof window.scrollTo === 'function') {
    try {
      window.scrollTo({ top: targetY, behavior });
    } catch (_) {
      window.scrollTo(0, targetY);
    }
  }
  const main = document.querySelector('#main') || document.querySelector('main');
  if (main && typeof main.scrollTo === 'function') {
    try {
      main.scrollTo({ top: 0, behavior });
    } catch (_) {
      main.scrollTop = 0;
    }
  }
}

/* ── lifecycle ────────────────────────────────────────────────────────── */
function attachTitle () {
  if (!state.title) return;
  // Mark the title as interactive; do not change visible markup.
  state.title.setAttribute('role', 'button');
  state.title.setAttribute('tabindex', '0');
  state.title.setAttribute(
    'aria-label',
    'العودة إلى أعلى الصفحة'
  );
  state.title.setAttribute('data-elan-living', 'title');
  state.title.style.cursor = 'pointer';
  state.title.addEventListener('click', onTitleActivate);
  state.title.addEventListener('keydown', onTitleActivate);
}

function detachTitle () {
  if (!state.title) return;
  state.title.removeEventListener('click', onTitleActivate);
  state.title.removeEventListener('keydown', onTitleActivate);
  state.title.removeAttribute('data-elan-living');
  state.title.removeAttribute('role');
  state.title.removeAttribute('tabindex');
  state.title.removeAttribute('aria-label');
  state.title.style.cursor = '';
}

function engage () {
  if (state.attached) return;
  state.topbar = findTopbar();
  state.title = findTitle();
  if (!state.topbar) return;
  state.topbar.setAttribute('data-elan-living', 'topbar');
  state.reducedMq = matchMedia('(prefers-reduced-motion: reduce)');

  state.scrollSources = detectScrollSources();
  for (const src of state.scrollSources) {
    src.addEventListener('scroll', onScrollOrResize, { passive: true });
  }
  window.addEventListener('resize', onScrollOrResize, { passive: true });

  if ('ResizeObserver' in window) {
    state.resizeObserver = new ResizeObserver(onScrollOrResize);
    const page = getActivePage();
    if (page) state.resizeObserver.observe(page);
  }

  attachTitle();
  applyProgress();
  state.attached = true;
}

function disengage () {
  for (const src of state.scrollSources) {
    src.removeEventListener('scroll', onScrollOrResize);
  }
  state.scrollSources = [];
  window.removeEventListener('resize', onScrollOrResize);
  if (state.resizeObserver) {
    try { state.resizeObserver.disconnect(); } catch (_) {}
    state.resizeObserver = null;
  }
  detachTitle();
  if (state.topbar) {
    state.topbar.style.removeProperty('--scroll-pct');
    state.topbar.removeAttribute('data-read');
    state.topbar.removeAttribute('data-elan-living');
  }
  state.lastPct = -1;
  state.attached = false;
}

function getProgress () {
  return state.lastPct >= 0 ? state.lastPct : 0;
}

function isEngaged () {
  return state.attached;
}

/* ── boot ─────────────────────────────────────────────────────────────── */
function boot () {
  engage();
  // When the user navigates, the active page changes; rewire the
  // ResizeObserver target and reset the meter.
  document.addEventListener('upg:nav:change', () => {
    state.lastPct = -1;
    if (state.resizeObserver) {
      try { state.resizeObserver.disconnect(); } catch (_) {}
      const page = getActivePage();
      if (page) state.resizeObserver.observe(page);
    }
    requestAnimationFrame(applyProgress);
  });
  document.addEventListener('upg:world:change', () => {
    requestAnimationFrame(applyProgress);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

/* ── register on window.Upg.elan.topbar ───────────────────────────────── */
const w = typeof window !== 'undefined' ? window : null;
if (w) {
  w.Upg = w.Upg || {};
  w.Upg.elan = w.Upg.elan || {};
  w.Upg.elan.topbar = {
    engage,
    disengage,
    getProgress,
    scrollToTop,
    isEngaged,
  };
}

export { engage, disengage, getProgress, scrollToTop, isEngaged };
