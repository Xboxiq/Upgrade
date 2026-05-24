/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — β3 — Format helpers (ESM)
   ────────────────────────────────────────────────────────────────────────
   Currency formatter with the β3 DATA_BEACON: in the Dhahab world, the
   thousands separator is the Arabic Tatweel (U+0640 ـ) instead of a Latin
   comma, and its width grows by one tatweel per extra digit beyond four.
   Result: '1ـ234ـ567' rather than '1,234,567' — pulse, not punctuation.

   API surface (window.Upg.format, frozen):
     currency(value, opts)        — pure formatter
     autoCurrencies(root?)        — DOM scan for .n-currency-auto[data-amount]
     KASHIDA                      — exported constant for tests

   Side effects:
     • runs autoCurrencies() at DOMContentLoaded (or immediately if late)
     • re-runs on `upg:world:change` and `upg:nav:change` events
     • registers Upg.format only if not already present (safe re-import)
   ════════════════════════════════════════════════════════════════════════ */

const KASHIDA = '\u0640';

/**
 * Format a number with locale-aware thousands separator.
 *
 * @param {number|string} value             — numeric input
 * @param {Object}        [opts]
 * @param {boolean}       [opts.kashida]    — use U+0640 separator (Dhahab world)
 * @param {number}        [opts.fractionDigits=2]
 * @returns {string}
 */
export function formatCurrency(value, opts = {}) {
  const { kashida = false, fractionDigits = 2 } = opts;
  const num = Number(value);
  if (!Number.isFinite(num)) return String(value);

  const fixed = num.toFixed(fractionDigits);
  const [intPart, decPart] = fixed.split('.');

  // Group digits in threes from the right (works for any positive length).
  const groups = [];
  let s = intPart.replace(/^-/, '');
  const negative = intPart.startsWith('-');
  while (s.length > 3) {
    groups.unshift(s.slice(-3));
    s = s.slice(0, -3);
  }
  groups.unshift(s);

  // Beacon: kashida width grows with magnitude (clamped 1..4).
  let separator = ',';
  let stretchLevel = 1;
  if (kashida) {
    const totalDigits = intPart.replace('-', '').length;
    stretchLevel = Math.max(1, Math.min(4, totalDigits - 4));
    separator = KASHIDA.repeat(stretchLevel);
  }

  const grouped = groups.join(separator);
  const signed = negative ? `-${grouped}` : grouped;
  const out = decPart ? `${signed}.${decPart}` : signed;
  return out;
}

/**
 * Scan a root element for `.n-currency-auto[data-amount]` cells and
 * format them in place. Adds `.k-currency-thousands` and a
 * `data-stretch="N"` hint to Dhahab-world cells so the CSS can fine-tune.
 *
 * @param {ParentNode} [root=document]
 */
export function autoFormatCurrencies(root = document) {
  if (!root || typeof root.querySelectorAll !== 'function') return 0;
  let count = 0;
  root.querySelectorAll('.n-currency-auto[data-amount]').forEach((el) => {
    const amount = parseFloat(el.dataset.amount);
    if (!Number.isFinite(amount)) return;
    const inDhahab = el.closest('[data-world="dhahab"]') !== null
                  || document.body?.dataset.world === 'dhahab';
    const fractionDigits = el.dataset.fraction
      ? parseInt(el.dataset.fraction, 10)
      : 2;

    const text = formatCurrency(amount, { kashida: inDhahab, fractionDigits });
    el.textContent = text;

    if (inDhahab) {
      el.classList.add('k-currency-thousands');
      const totalDigits = String(Math.trunc(Math.abs(amount))).length;
      const stretch = Math.max(1, Math.min(4, totalDigits - 4));
      el.dataset.stretch = String(stretch);
    } else {
      el.classList.remove('k-currency-thousands');
      delete el.dataset.stretch;
    }
    count += 1;
  });
  return count;
}

/* ─── Side-effect registration ─── */

const run = () => autoFormatCurrencies(document);

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    queueMicrotask(run);
  }
  document.addEventListener('upg:world:change', run);
  document.addEventListener('upg:nav:change', run);
}

if (typeof window !== 'undefined') {
  window.Upg = window.Upg || {};
  if (!window.Upg.format) {
    window.Upg.format = Object.freeze({
      currency: formatCurrency,
      autoCurrencies: autoFormatCurrencies,
      KASHIDA,
    });
  }
}

export { KASHIDA };
export default { formatCurrency, autoFormatCurrencies, KASHIDA };
