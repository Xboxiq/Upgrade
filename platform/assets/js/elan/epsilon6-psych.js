/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — ε6 — Psych/EQ/Negotiation Content Revival
   ────────────────────────────────────────────────────────────────────────
   🤚 INTERACTION_BEACON — Breath Pause (Nada) / Stamp Mark (Hadeed)

   At approximately 60% scroll depth, Nada-world pages trigger a
   "breath" indicator: a soft vertical lavender line pulses once on the
   nearest [data-elan-breath] element (the midpoint rest block).
   In Hadeed-world pages, a vertical ember stamp line appears on the
   nearest [data-elan-stamp] element.

   Neither interrupts reading (no modal, no toast, no counter).
   The mark is purely an ambient awareness — "you are here in the journey."

   Public API: Upg.elan.breath (nested, does NOT inflate top-level count)
   Methods: engage(), disengage(), isActive(), stamped()
   ─────────────────────────────────────────────────────────────────────── */

const BREATH_SELECTOR = '[data-elan-breath]';
const STAMP_SELECTOR = '[data-elan-stamp]';
const SCROLL_THRESHOLD = 0.55; // Fire at ~55-65% scroll depth
const DEBOUNCE_MS = 300;

let breathObserver = null;
let stampObserver = null;
let engaged = false;

function isNadaActive() {
  return document.body.dataset.world === 'nada' ||
    !!document.querySelector('.page.active[data-world="nada"]') ||
    !!document.querySelector('.page.is-active[data-world="nada"]');
}

function isHadeedActive() {
  return document.body.dataset.world === 'hadeed' ||
    !!document.querySelector('.page.active[data-world="hadeed"]') ||
    !!document.querySelector('.page.is-active[data-world="hadeed"]');
}

function getScrollDepth(scrollEl) {
  if (!scrollEl) return 0;
  const scrollTop = scrollEl.scrollTop || window.scrollY || 0;
  const scrollHeight = scrollEl.scrollHeight || document.documentElement.scrollHeight;
  const clientHeight = scrollEl.clientHeight || window.innerHeight;
  if (scrollHeight <= clientHeight) return 0;
  return scrollTop / (scrollHeight - clientHeight);
}

function findScrollContainer() {
  // Pages may scroll on body, main, or the active .page section
  const activePage = document.querySelector('.page.active, .page.is-active');
  if (activePage && activePage.scrollHeight > activePage.clientHeight + 100) {
    return activePage;
  }
  return document.scrollingElement || document.documentElement;
}

// ── Nada: Breath Pause ──────────────────────────────────────────────────

function activateBreath() {
  const targets = document.querySelectorAll(BREATH_SELECTOR);
  if (!targets.length) return;

  // Use IntersectionObserver at ratio 0.5 (element is 50% visible → breathing)
  breathObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
        entry.target.classList.add('is-breathing');
        // Auto-fade after 2.5s (one breath cycle)
        setTimeout(() => {
          entry.target.classList.remove('is-breathing');
        }, 2500);
      }
    });
  }, { threshold: [0.4], rootMargin: '0px 0px -30% 0px' });

  targets.forEach(el => breathObserver.observe(el));
}

function deactivateBreath() {
  if (breathObserver) {
    breathObserver.disconnect();
    breathObserver = null;
  }
  document.querySelectorAll('.is-breathing').forEach(el => el.classList.remove('is-breathing'));
}

// ── Hadeed: Stamp Mark ──────────────────────────────────────────────────

function activateStamp() {
  const targets = document.querySelectorAll(STAMP_SELECTOR);
  if (!targets.length) return;

  stampObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        entry.target.classList.add('is-stamped');
        // Stamp stays (permanent mark until page change)
      }
    });
  }, { threshold: [0.5], rootMargin: '0px 0px -25% 0px' });

  targets.forEach(el => stampObserver.observe(el));
}

function deactivateStamp() {
  if (stampObserver) {
    stampObserver.disconnect();
    stampObserver = null;
  }
  document.querySelectorAll('.is-stamped').forEach(el => el.classList.remove('is-stamped'));
}

// ── Lifecycle ───────────────────────────────────────────────────────────

function engage() {
  if (engaged) return;
  engaged = true;

  // Respect reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // CSS handles instant display; JS won't animate
  }

  if (isNadaActive()) activateBreath();
  if (isHadeedActive()) activateStamp();
}

function disengage() {
  engaged = false;
  deactivateBreath();
  deactivateStamp();
}

function isActive() { return engaged; }

function stamped() {
  return [...document.querySelectorAll('.is-stamped')].map(el => el.dataset.blockId || el.id || null);
}

// ── Init ────────────────────────────────────────────────────────────────

function init() {
  if (isNadaActive() || isHadeedActive()) {
    engage();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

// Re-engage on nav change
document.addEventListener('upg:nav:change', () => {
  disengage();
  requestAnimationFrame(() => setTimeout(init, 300));
});

// Clean up on world change
document.addEventListener('upg:world:change', () => {
  disengage();
  requestAnimationFrame(() => setTimeout(init, 300));
});

// ── Public API ──────────────────────────────────────────────────────────

window.Upg = window.Upg || {};
window.Upg.elan = window.Upg.elan || {};
if (!window.Upg.elan.breath) {
  window.Upg.elan.breath = Object.freeze({
    engage,
    disengage,
    isActive,
    stamped,
  });
}

export { engage, disengage, isActive, stamped };
