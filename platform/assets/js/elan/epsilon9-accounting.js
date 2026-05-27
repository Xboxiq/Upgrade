/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — ε9 — Accounting Content Revival (Dhahab world) JS
   ────────────────────────────────────────────────────────────────────────
   📊 DATA_BEACON — Memphis Tax IQ Ladder

   The Iraqi income-tax brackets (2024) are rendered as five Memphis
   ovals stacked column-reverse. As the user drags the slider:

     1. Each bracket's `--bracket-fill` (0% .. 100%) is set to how
        much of that bracket's slice the income has consumed.
     2. Each bracket's `--bracket-width` (50% .. 100%) grows in step
        with the fill — the higher you climb, the wider the oval.
     3. The total tax is computed progressively (NOT the headline rate
        on the whole income — that is the pedagogical point).
     4. The amount is rendered with β3 kashida thousands separator
        via `Upg.format.currency(value, { kashida: true })`.
     5. The effective rate is rendered as percent (Eastern Arabic).
     6. The slider's own readout updates with the same kashida format.

   Brackets are the spec's 5-tier 2024 schedule:
     0% on    0 –   250,000
     3% on  250,001 –   500,000
     5% on  500,001 – 1,000,000
    10% on 1,000,001 – 5,000,000
    15% on  > 5,000,000

   Public API: window.Upg.elan.accounting (frozen)
     - compute(income)        progressive tax for an income (number)
     - brackets()             read-only bracket descriptors
     - render(income?)        re-render the ladder (defaults to current
                              slider value, else 0)
   ──────────────────────────────────────────────────────────────────── */

const HOST = '[data-elan-tax-ladder]';
const INPUT = '[data-elan-tax-input]';
const READOUT = '[data-elan-tax-readout]';
const OUT_AMOUNT = '[data-elan-tax-output="amount"]';
const OUT_RATE = '[data-elan-tax-output="rate"]';

const BRACKETS = Object.freeze([
  Object.freeze({ min:        0, max:    250000, rate: 0.00 }),
  Object.freeze({ min:   250000, max:    500000, rate: 0.03 }),
  Object.freeze({ min:   500000, max:   1000000, rate: 0.05 }),
  Object.freeze({ min:  1000000, max:   5000000, rate: 0.10 }),
  Object.freeze({ min:  5000000, max: Number.POSITIVE_INFINITY, rate: 0.15 }),
]);

/* ── Eastern-Arabic numeral conversion (so "37%" → "٣٧٪") ─────── */
const AR = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
function toAr(s) { return String(s).replace(/[0-9]/g, (d) => AR[+d]); }

/* ── Kashida-flavoured currency: prefer Upg.format.currency, fall   */
/*    back to a clean comma-grouped string if β3 is not yet booted.  */
function formatKashida(value) {
  try {
    if (window.Upg && window.Upg.format && typeof window.Upg.format.currency === 'function') {
      return window.Upg.format.currency(value, { kashida: true, fractionDigits: 0 });
    }
  } catch (_) { /* tolerate */ }
  // Fallback: standard grouping then swap commas → kashida
  const fixed = Math.round(Number(value) || 0).toString();
  const groups = [];
  let s = fixed;
  while (s.length > 3) { groups.unshift(s.slice(-3)); s = s.slice(0, -3); }
  groups.unshift(s);
  return toAr(groups.join('\u0640'));
}

/* ── Progressive tax computation (the pedagogical core) ─────────── */
function compute(income) {
  const n = Number(income);
  if (!Number.isFinite(n) || n <= 0) return 0;
  let tax = 0;
  for (let i = 0; i < BRACKETS.length; i++) {
    const b = BRACKETS[i];
    if (n <= b.min) break;
    const slice = Math.min(n, b.max) - b.min;
    if (slice > 0) tax += slice * b.rate;
  }
  return tax;
}

/* ── Update one bracket's fill + width custom properties ────────── */
function paintBracket(el, b, income) {
  if (!el) return;
  const sliceUsed = Math.max(0, Math.min(income, b.max) - b.min);
  const sliceMax  = Math.max(b.max - b.min, 1);
  const fillRatio = b.max === Number.POSITIVE_INFINITY
    ? Math.min(1, Math.max(0, (income - b.min) / 5000000)) // grow over the next 5M
    : Math.min(1, sliceUsed / sliceMax);
  const fillPct  = (fillRatio * 100);
  const widthPct = 50 + fillRatio * 50; // 50% .. 100%
  el.style.setProperty('--bracket-fill',  fillPct.toFixed(1) + '%');
  el.style.setProperty('--bracket-width', widthPct.toFixed(1) + '%');
  // Mark fully filled brackets so the CSS can pin them at 100% width
  if (fillRatio >= 0.999) el.dataset.bracketState = 'full';
  else if (fillRatio > 0) el.dataset.bracketState = 'partial';
  else el.dataset.bracketState = 'empty';
}

/* ── Full render pass ───────────────────────────────────────────── */
function render(incomeArg) {
  const ladder = document.querySelector(HOST);
  if (!ladder) return null;

  const input = document.querySelector(INPUT);
  let income = Number(incomeArg);
  if (!Number.isFinite(income)) {
    income = input ? parseFloat(input.value) : 0;
    if (!Number.isFinite(income)) income = 0;
  }
  if (income < 0) income = 0;

  const cells = ladder.querySelectorAll('[data-bracket]');
  for (let i = 0; i < cells.length; i++) {
    const idx = parseInt(cells[i].getAttribute('data-bracket'), 10);
    const b = BRACKETS[idx];
    if (b) paintBracket(cells[i], b, income);
  }

  // readout (the slider's live label)
  const readout = document.querySelector(READOUT);
  if (readout) readout.textContent = formatKashida(income) + ' د.ع';

  // tax amount + effective rate
  const tax = compute(income);
  const eff = income > 0 ? (tax / income) * 100 : 0;

  const amountEl = document.querySelector(OUT_AMOUNT);
  if (amountEl) amountEl.textContent = formatKashida(tax);

  const rateEl = document.querySelector(OUT_RATE);
  if (rateEl) rateEl.textContent = toAr(eff.toFixed(2)).replace('.', '٫') + '٪';

  return { income, tax, effRate: eff };
}

/* ── Init / lifecycle ──────────────────────────────────────────── */
function init() {
  const input = document.querySelector(INPUT);
  if (!input) return;
  if (input.__elanTaxBound) { render(); return; }
  input.__elanTaxBound = true;

  const handle = () => render(parseFloat(input.value) || 0);
  input.addEventListener('input',  handle);
  input.addEventListener('change', handle);

  // Initial paint
  handle();
}

window.addEventListener('upg:nav:change', (e) => {
  const id = (e && e.detail && e.detail.pageId) || '';
  if (id === 'accounting') init();
});

/* ── Public surface — nested under Upg.elan ───────────────────── */
window.Upg = window.Upg || {};
window.Upg.elan = window.Upg.elan || {};
window.Upg.elan.accounting = Object.freeze({
  compute,
  brackets: () => BRACKETS.slice(),
  render,
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
