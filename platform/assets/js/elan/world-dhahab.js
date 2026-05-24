/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — γ6 — Dhahab world JS: Gold Magnitude Beacon
   ────────────────────────────────────────────────────────────────────────
   🌈 CHROMATIC_BEACON

   Financial numbers in the Dhahab world shift color by their magnitude:
     - low  (< 100,000):  muted coffee ink, thin border
     - mid  (100K – 1M):  standard gold, gold border
     - high (> 1,000,000): heavy gold + text-shadow glow

   The classifier runs on:
     - .qcalc-result-value elements
     - [data-format="money"] elements
   within the active accounting page.

   It re-classifies on input events (when calculators update) via a
   MutationObserver watching textContent changes.

   Public API: window.Upg.worlds.dhahab
   ─────────────────────────────────────────────────────────────────────── */

const TARGETS = '.qcalc-result-value, [data-format="money"]';
const THRESHOLDS = { low: 100_000, high: 1_000_000 };

let _active = false;
let _observer = null;

/**
 * Parse a displayed number string to a numeric value.
 * Handles Arabic commas, kashida separators, currency suffixes.
 */
function _parseDisplay(text) {
  if (!text) return 0;
  /* Strip non-numeric except digits, dots, minus */
  const cleaned = text
    .replace(/[^\d.\-\u0660-\u0669]/g, '') /* remove everything except digits/dot/minus/Arabic-Indic */
    .replace(/[\u0660-\u0669]/g, d => d.charCodeAt(0) - 0x0660); /* Arabic-Indic → Western */
  return parseFloat(cleaned) || 0;
}

/**
 * Classify a single element's magnitude.
 */
function _classify(el) {
  const text = el.textContent || el.innerText || '';
  const value = Math.abs(_parseDisplay(text));

  let mag;
  if (value < THRESHOLDS.low) {
    mag = 'low';
  } else if (value >= THRESHOLDS.high) {
    mag = 'high';
  } else {
    mag = 'mid';
  }

  /* Only update DOM if magnitude changed */
  if (el.getAttribute('data-magnitude') !== mag) {
    el.setAttribute('data-magnitude', mag);
  }
}

/**
 * Classify all target elements in the current page.
 */
function _classifyAll() {
  const page = document.querySelector('#page-accounting');
  if (!page) return;
  page.querySelectorAll(TARGETS).forEach(_classify);
}

/**
 * MutationObserver callback — re-classify on text changes.
 */
function _onMutation(mutations) {
  for (const m of mutations) {
    if (m.type === 'characterData' || m.type === 'childList') {
      const target = m.target.closest?.(TARGETS) || m.target;
      if (target.matches?.(TARGETS)) {
        _classify(target);
      }
    }
  }
}

function engage() {
  if (_active) return;
  _active = true;

  /* Initial classification */
  requestAnimationFrame(_classifyAll);

  /* Watch for calculator updates */
  const page = document.querySelector('#page-accounting');
  if (page) {
    _observer = new MutationObserver(_onMutation);
    _observer.observe(page, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  /* Also re-classify on input events (calculator inputs change values) */
  document.addEventListener('input', _onInput, { passive: true });
}

function _onInput(e) {
  if (!_active) return;
  /* Debounce: classify after a short delay */
  clearTimeout(_onInput._t);
  _onInput._t = setTimeout(_classifyAll, 120);
}

function disengage() {
  if (!_active) return;
  _active = false;

  if (_observer) {
    _observer.disconnect();
    _observer = null;
  }
  document.removeEventListener('input', _onInput);
}

/* ─── Auto-wire: world change events ─── */
document.addEventListener('upg:world:change', (e) => {
  const { to } = e.detail || {};
  if (to === 'dhahab') {
    engage();
  } else {
    disengage();
  }
});

/* ─── Init ─── */
function init() {
  if (document.body?.getAttribute('data-world') === 'dhahab') {
    engage();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  requestAnimationFrame(init);
}

/* ─── Export ─── */
const UpgWorldDhahab = Object.freeze({ engage, disengage, classify: _classifyAll });

if (typeof window !== 'undefined') {
  window.Upg = window.Upg || {};
  window.Upg.worlds = window.Upg.worlds || {};
  window.Upg.worlds.dhahab = UpgWorldDhahab;
}

export default UpgWorldDhahab;
