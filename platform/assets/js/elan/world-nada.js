/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — γ4 — Nada world JS: Dew Condensation Beacon
   ────────────────────────────────────────────────────────────────────────
   🌊 MOTION_BEACON

   When the Nada world is active (psych / eq pages), cards with the
   attribute `[data-dew]` appear as if condensing from vapor — scaling
   from their center point outward, staggered radially (center cards
   first, edge cards last).

   The system uses IntersectionObserver and fires ONCE per card (no
   repeat on re-scroll — Forbidden #12 fade-in-on-scroll).

   The radial stagger is NOT top-down waterfall (Forbidden #14). Instead,
   cards closer to the viewport center get lower delay. JS computes each
   card's distance from viewport center and assigns `--card-index`.

   Public API: window.Upg.worlds.nada (nested sub-API; does NOT inflate
   top-level Upg.* surface count).
   ─────────────────────────────────────────────────────────────────────── */

/* Cards that receive the dew effect — discovered within active Nada pages */
const CARD_CLASSES = '.call-card, .psych-acc-item, .qcalc, .card, .panel';
const SELECTOR = '[data-dew]';
const SETTLE_DELAY = 900; /* ms after last card to remove will-change */

let _observer = null;
let _active = false;
let _settleTimer = null;

/**
 * Compute radial index: cards near viewport center get index 0-1,
 * edge cards get higher index. This drives CSS `--card-index`.
 */
function _assignRadialIndex(cards) {
  if (!cards.length) return;
  const vh = window.innerHeight;
  const vc = vh / 2;
  const vw = window.innerWidth;
  const hc = vw / 2;

  /* Measure center of each card */
  const measures = cards.map(card => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(cx - hc, cy - vc);
    return { card, dist };
  });

  /* Sort by distance, assign index 0..n */
  measures.sort((a, b) => a.dist - b.dist);
  measures.forEach((m, i) => {
    m.card.style.setProperty('--card-index', i);
  });
}

/**
 * IntersectionObserver callback. Fires once per card.
 */
function _onIntersect(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const card = entry.target;
    card.classList.add('is-condensed');
    _observer.unobserve(card); /* fire-once */

    /* After animation, settle (clean up will-change) */
    clearTimeout(_settleTimer);
    _settleTimer = setTimeout(() => {
      document.querySelectorAll('[data-world="nada"] [data-dew].is-condensed:not(.is-settled)')
        .forEach(c => c.classList.add('is-settled'));
    }, SETTLE_DELAY);
  });
}

/**
 * Wire the dew system on the current page.
 */
function engage() {
  if (_active) return;
  _active = true;

  /* Auto-tag cards in active Nada pages with data-dew */
  const nadaPages = document.querySelectorAll('[data-world="nada"].active, [data-world="nada"].is-active, section.page.active[data-world="nada"]');
  nadaPages.forEach(page => {
    page.querySelectorAll(CARD_CLASSES).forEach(card => {
      if (!card.hasAttribute('data-dew')) {
        card.setAttribute('data-dew', '');
      }
    });
  });

  /* Respect prefers-reduced-motion: skip observer, show all */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll(SELECTOR).forEach(c => {
      c.classList.add('is-condensed', 'is-settled');
    });
    return;
  }

  const cards = Array.from(document.querySelectorAll(SELECTOR));
  if (!cards.length) return;

  _assignRadialIndex(cards);

  _observer = new IntersectionObserver(_onIntersect, {
    root: null,
    rootMargin: '0px 0px -60px 0px', /* trigger slightly before full view */
    threshold: 0.15
  });

  cards.forEach(c => _observer.observe(c));
}

/**
 * Disengage when leaving the Nada world.
 */
function disengage() {
  if (!_active) return;
  _active = false;
  if (_observer) {
    _observer.disconnect();
    _observer = null;
  }
  clearTimeout(_settleTimer);
}

/* ─── Auto-wire: listen to world changes ─── */
document.addEventListener('upg:world:change', (e) => {
  const { to } = e.detail || {};
  if (to === 'nada') {
    requestAnimationFrame(engage);
  } else {
    disengage();
  }
});

/* ─── Init: engage if we're already in Nada ─── */
function init() {
  if (document.body?.getAttribute('data-world') === 'nada') {
    engage();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  requestAnimationFrame(init);
}

/* ─── Export ─── */
const UpgWorldNada = Object.freeze({ engage, disengage });

if (typeof window !== 'undefined') {
  window.Upg = window.Upg || {};
  window.Upg.worlds = window.Upg.worlds || {};
  window.Upg.worlds.nada = UpgWorldNada;
}

export default UpgWorldNada;
