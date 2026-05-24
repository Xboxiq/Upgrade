# γ6 — العالم 5: ذَهَب (Dhahab) — Gold
> **Pillar γ / Stage 6 of 9 — Pattern Disruption checkpoint**
> الإلهام: المنمنمات الفارسية + كتب المحاسبة المغولية + Memphis postmodern oval
> الصفحات: accounting

---

## 🚨 Pattern Disruption Audit (3-stage cycle: γ4, γ5, γ6)

آخر 3 beacons قبل γ6:
- γ3 Naar: VISUAL
- γ4 Nada: MOTION
- γ5 Hadeed: CHROMATIC

كلها فئات مختلفة → لا disruption إجباري. **لكن** الدوكترين يقول كل 3 stages اختياري للـ Wild Card.
γ6 سيختار Wild Card اختيارياً للنكهة: **#7 Memphis Group postmodern** — لـ contrast مع كل الإلهام التقليدي السابق. النتيجة: ذَهَب يخلط منمنمات فارسية مع جرأة Memphis = شيء **لا يُتوقَّع**.

---

## 🎨 Creativity Beacon

**Type:** 📊 DATA_BEACON
**The Surprise:** الجداول المالية في accounting لا تستخدم rows عادية. كل row هو **بطاقة منمنمة** بإطار ذهبي رفيع (1px gradient gold)، والأرقام داخلها مفصولة بـ kashida (من β3) بدل comma. الإجمالي في أسفل كل column يُكتَب بحجم أكبر داخل oval ذهبي شبه-Memphis (ليس rectangle، ليس circle — قطع ناقص محرَّف). hover على cell يَكشف الرقم الأصلي (قبل الـ kashida) في tooltip.
**Reference Avoided:** #1 standard table with alternating rows, #5 card with shadow + radius
**Inspired-by:** #2 Persian miniature + #7 Memphis Group
**Originality Self-Score:** 5/5

---

## التنفيذ

### ١. املأ `worlds/_dhahab.css`

```css
/* ÊLAN v4 — γ6 — World: ذَهَب (Dhahab)
   Persian miniature + Mughal accounting books + Memphis postmodern oval.
   Pages: accounting */

[data-world="dhahab"] {
  --anchor-bg: hsl(40 35% 94%);
  --anchor-1:  hsl(40 30% 90%);
  --anchor-2:  hsl(40 26% 85%);
  --anchor-3:  hsl(40 22% 78%);

  --ink:       hsl(28 60% 14%);
  --ink-muted: hsl(28 30% 32%);
  --ink-faint: hsl(28 18% 52%);

  --line:        hsl(40 26% 78%);
  --line-strong: hsl(40 30% 65%);

  --ember: hsl(42 95% 45%);     /* ذهب ثقيل */
  --focus: hsl(218 75% 35%);    /* أزرق فلكي */
  --accent: var(--ember);

  --ease-dhahab:     cubic-bezier(0.32, 0.72, 0.28, 1);
  --duration-dhahab: 360ms;

  --shadow-sm: 0 1px 2px hsl(28 60% 14% / 0.07);
  --shadow-md: 0 4px 12px hsl(28 60% 14% / 0.10);
  --shadow-lg: 0 14px 32px hsl(28 60% 14% / 0.13);
  --shadow-xl: 0 28px 60px hsl(28 60% 14% / 0.16);

  --ring: 0 0 0 3px color-mix(in oklch, var(--ember) 38%, transparent);

  --color-bg: var(--anchor-bg);
  --color-surface-0: var(--anchor-bg);
  --color-surface-1: var(--anchor-1);
  --color-surface-2: var(--anchor-2);
  --color-surface-3: var(--anchor-3);
  --color-text: var(--ink);
  --color-text-muted: var(--ink-muted);
  --color-text-faint: var(--ink-faint);
  --color-border: var(--line);
  --color-border-strong: var(--line-strong);
  --color-brand: var(--ember);
}

/* Beacon: miniature row cards */
[data-world="dhahab"] .ledger-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: var(--s-4);
  padding: var(--s-3) var(--s-4);
  background: var(--anchor-1);
  border: 1px solid transparent;
  border-image: linear-gradient(135deg,
    color-mix(in oklch, var(--ember) 80%, transparent),
    color-mix(in oklch, var(--ember) 20%, transparent),
    color-mix(in oklch, var(--ember) 70%, transparent)
  ) 1;
  margin-block-end: var(--s-2);
  font-family: var(--voice-num-tabular);
  align-items: baseline;
}

[data-world="dhahab"] .ledger-row:hover {
  background: var(--anchor-2);
  transition: background var(--duration-dhahab) var(--ease-dhahab);
}

[data-world="dhahab"] .ledger-amount {
  font-variant-numeric: tabular-nums lining-nums;
  font-weight: 700;
  color: var(--ink);
}

/* Beacon: Memphis-oval totals */
[data-world="dhahab"] .ledger-total {
  display: inline-block;
  padding: var(--s-3) var(--s-6);
  background: var(--ember);
  color: hsl(28 60% 14%);
  font-family: var(--voice-num-tabular);
  font-weight: 800;
  font-size: var(--fs-xl);
  /* Memphis: an asymmetric, deformed oval */
  border-radius: 64% 36% 58% 42% / 50% 60% 40% 50%;
  box-shadow:
    inset 0 -4px 12px color-mix(in oklch, hsl(28 60% 14%) 25%, transparent),
    inset 0 2px 4px color-mix(in oklch, white 35%, transparent),
    var(--shadow-md);
  letter-spacing: var(--track-snug);
}

/* Hover reveals raw number tooltip */
[data-world="dhahab"] .ledger-amount[data-raw] {
  position: relative;
  cursor: help;
}

[data-world="dhahab"] .ledger-amount[data-raw]:hover::after {
  content: attr(data-raw);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--ink);
  color: var(--anchor-bg);
  padding: var(--s-1) var(--s-2);
  border-radius: var(--r-1);
  font-size: var(--fs-xs);
  white-space: nowrap;
  margin-bottom: var(--s-1);
  pointer-events: none;
  z-index: 10;
}

/* Hero typography in dhahab */
[data-world="dhahab"] h1.is-hero {
  font-family: var(--voice-signature);
  font-weight: 800;
  font-feature-settings: "swsh" 1;
  letter-spacing: var(--track-snug);
  color: var(--ink);
  font-size: var(--fs-3xl);
}

[data-world="dhahab"] body,
[data-world="dhahab"] .page-content {
  font-family: var(--voice-body);
}
```

### ٢. JS للـ Beacon — `world-dhahab.js`

```javascript
/* ÊLAN v4 — γ6 — Dhahab world: kashida-formatted amounts + raw tooltip */
import { formatCurrency } from './format.js';

function bind() {
  document.querySelectorAll('[data-world="dhahab"] .ledger-amount[data-amount]')
    .forEach(el => {
      if (el.dataset.dhahabBound) return;
      el.dataset.dhahabBound = 'true';
      const raw = parseFloat(el.dataset.amount);
      const fraction = el.dataset.fraction ? parseInt(el.dataset.fraction, 10) : 2;
      // Display with kashida (Beacon)
      el.textContent = formatCurrency(raw, { kashida: true, fractionDigits: fraction });
      // Store raw with comma separators for tooltip
      el.dataset.raw = formatCurrency(raw, { kashida: false, fractionDigits: fraction });
    });
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'dhahab') bind();
});

if (document.body.dataset.world === 'dhahab') bind();
```

### ٣. تطبيق على accounting page

```html
<div class="ledger-row">
  <span class="ledger-label v-body">إيراد التشغيل — أكتوبر</span>
  <span class="ledger-amount" data-amount="1234567.89" data-fraction="2">—</span>
</div>
<div class="ledger-total" data-amount="2468901.45">2ـ468ـ901.45</div>
```

---

## Acceptance Criteria

- [ ] `worlds/_dhahab.css` ممتلئ
- [ ] `.ledger-amount[data-amount]` يَملأ النص تلقائياً بكشيدة في dhahab
- [ ] hover على ledger-amount يكشف الرقم بـ comma format
- [ ] `.ledger-total` تستخدم asymmetric border-radius (Memphis oval)
- [ ] الإطار الذهبي (border-image gradient) يظهر على كل row
- [ ] commit: `γ6: World Dhahab — verified: kashida_amounts=on, memphis_oval=on, tooltip_raw=on`
- [ ] Beacon recorded

— نهاية γ6 —
