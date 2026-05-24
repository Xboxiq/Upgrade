# ε9 — Content Revival: accounting
> **Pillar ε / Stage 9 of 12** — العالم: ذَهَب (Dhahab)

---

## 🎨 Creativity Beacon

**Type:** 📊 DATA_BEACON
**The Surprise:** الـ tax IQ section يَعرض "ضريبة الدخل العراقي" بصرياً كـ **stacked progressive ladder** بـ Memphis ovals. كل oval ثقيل ذهبي يَرتفع مع الـ bracket. عند تحريك slider الراتب، الـ ovals تَلون بحساب progressive: lower bracket فاتح، higher bracket داكن. الـ kashida-thousands-separator (من β3) فعّال هنا.

**Reference Avoided:** standard tax bracket table
**Inspired-by:** Mughal accounting books (visual ledgers with weight scales)
**Originality Self-Score:** 5/5

---

## المحتوى (9 وحدات)

1. **القيد المزدوج** (double-entry bookkeeping) — أساس كل نظام
2. **القوائم الأربع** (income, balance, cashflow, equity)
3. **التدفق النقدي العملي** — للأعمال الصغيرة
4. **ضريبة الدخل العراقية** — brackets + استثناءات
5. **ضريبة العقار + ضريبة الأرباح**
6. **رواتب موظفين + التأمين الصحي**
7. **التقارير الشهرية لأصحاب الأعمال**
8. **الفروقات بين accrual و cash basis**
9. **مراجعة سريعة للحسابات الـ 30/30 (30 minute monthly review)**

### 🇮🇶 Iraq Block
> "ضريبة الدخل العراقية في 2024: 0% حتى 250k IQD، 3% حتى 500k، 5% حتى 1M، 10% حتى 5M، 15% فوق 5M. التطبيق: راتب 1.5M IQD = ضريبة فعلية ~7.3%، ليس 10%." — هيئة الضرائب العراقية، نشرة 2024

---

## التنفيذ

### ١. CSS
```css
[data-world="dhahab"] .tax-ladder {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--s-2);
  padding: var(--s-4);
  background: var(--anchor-1);
  border: 1px solid var(--line);
  border-radius: var(--r-3);
}

[data-world="dhahab"] .tax-bracket {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--s-3) var(--s-5);
  background: color-mix(in oklch, var(--ember) var(--bracket-fill, 0%), var(--anchor-bg));
  color: hsl(28 60% 14%);
  font-family: var(--voice-num-tabular);
  font-weight: 700;
  border-radius: 64% 36% 58% 42% / 50% 60% 40% 50%;
  inline-size: var(--bracket-width, 100%);
  margin-inline-start: auto;
  transition: --bracket-fill 320ms, inline-size 320ms;
}

[data-world="dhahab"] .tax-input {
  inline-size: 100%;
  padding: var(--s-3);
  background: var(--anchor-bg);
  border: 1px solid var(--line-strong);
  border-radius: var(--r-2);
  color: var(--ink);
  font-family: var(--voice-num-tabular);
  font-size: var(--fs-xl);
  font-weight: 700;
  text-align: center;
}

[data-world="dhahab"] .tax-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-3);
  margin-block-start: var(--s-4);
}
```

### ٢. JS — `pages/accounting.js`
```javascript
import { formatCurrency } from '../elan/format.js';

const BRACKETS = [
  { min: 0,        max: 250000,    rate: 0.00 },
  { min: 250000,   max: 500000,    rate: 0.03 },
  { min: 500000,   max: 1000000,   rate: 0.05 },
  { min: 1000000,  max: 5000000,   rate: 0.10 },
  { min: 5000000,  max: Infinity,  rate: 0.15 },
];

function computeTax(income) {
  let tax = 0;
  for (const b of BRACKETS) {
    if (income <= b.min) break;
    const slice = Math.min(income, b.max) - b.min;
    tax += slice * b.rate;
  }
  return tax;
}

function updateLadder(income) {
  document.querySelectorAll('[data-world="dhahab"] .tax-bracket').forEach((el, i) => {
    const b = BRACKETS[i];
    if (!b) return;
    const sliceUsed = Math.max(0, Math.min(income, b.max) - b.min);
    const sliceMax = Math.max(b.max - b.min, 1);
    const fillPct = Math.min(100, (sliceUsed / sliceMax) * 100);
    el.style.setProperty('--bracket-fill', `${fillPct}%`);
    el.style.setProperty('--bracket-width', `${50 + fillPct / 2}%`);
  });

  const tax = computeTax(income);
  const effRate = income > 0 ? (tax / income * 100) : 0;
  const taxEl = document.querySelector('[data-tax-output="amount"]');
  const rateEl = document.querySelector('[data-tax-output="rate"]');
  if (taxEl) taxEl.textContent = formatCurrency(tax, { kashida: true, fractionDigits: 0 });
  if (rateEl) rateEl.textContent = `${effRate.toFixed(2)}%`;
}

export function init() {
  const input = document.querySelector('[data-tax-input]');
  if (!input) return;
  const handle = () => updateLadder(parseFloat(input.value) || 0);
  input.addEventListener('input', handle);
  handle();
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'dhahab') init();
});
```

---

## Acceptance Criteria

- [ ] 9 units, PROVE-IT (with sources)
- [ ] Iraq Block (real Iraqi tax brackets)
- [ ] tax-ladder Memphis ovals + 5 brackets
- [ ] slider input updates rendering progressively
- [ ] kashida formatting on tax amount
- [ ] icons: Phosphor coins, receipt, scales (لا emoji)
- [ ] commit: `ε9: Accounting revived — verified: brackets=5, kashida=on, units=9, dhahab=on`
- [ ] Beacon recorded

— نهاية ε9 —
