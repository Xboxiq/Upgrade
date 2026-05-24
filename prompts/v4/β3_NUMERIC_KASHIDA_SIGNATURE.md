# β3 — Numeric Discipline + Kashida + Per-Page Signature
> **Pillar β / Stage 3 of 3 — last in β**
> الهدف: انضباط أرقام (tabular + lining + Arabic-Indic toggle) + قاعدة كَشيدة + توقيع نوع لكل صفحة.

---

## السياق

ثلاث مشاكل تظل في الواجهة العربية الافتراضية حتى لو الخطوط جميلة:
1. **الأرقام**: lining-nums vs old-style، tabular vs proportional، Latin (1234) vs Arabic-Indic (١٢٣٤) — لا قرار
2. **الكَشيدة (ـــ)**: AI تستخدمها عشوائياً → فوضى. يجب قواعد متى تُستخدم
3. **التوقيع**: كل صفحة في كل عالم تحتاج "type fingerprint" — ثلاث خصائص بصرية تعرّفها

---

## 🎨 Creativity Beacon

**Type:** 📊 DATA_BEACON
**The Surprise:** الأرقام المالية في accounting لا تُكتَب بـ digits فقط. كل خانة آلاف تُفصَل بكشيدة دقيقة (`U+0640`) عوض الفاصلة `,` العادية. النتيجة: `1ـ234ـ567` بدل `1,234,567`. حصراً في عالم ذَهَب — وحينما يتجاوز الرقم 5 خانات، الكشيدة تتطول تدريجياً (1px لكل خانة إضافية).
**Reference Avoided:** #11 standard tabular nums + comma separators
**Inspired-by:** #5 Yemeni mihrab geometry (rhythmic stretch like Arabic geometric tiling)
**Originality Self-Score:** 5/5 (ادّعاء سيُتحدَّى — لكن: لا منصة عربية أخرى ربطت الكشيدة بـ thousands separator)

---

## التنفيذ

### ١. أضف utilities الأرقام في `tokens/_voice-utilities.css`

```css
/* ÊLAN v4 — β3 — Numeric discipline */

.n-lining     { font-feature-settings: "lnum" 1; font-variant-numeric: lining-nums; }
.n-oldstyle   { font-feature-settings: "onum" 1; font-variant-numeric: oldstyle-nums; }
.n-tabular    { font-feature-settings: "tnum" 1; font-variant-numeric: tabular-nums; }
.n-proportional { font-feature-settings: "pnum" 1; font-variant-numeric: proportional-nums; }
.n-fraction   { font-feature-settings: "frac" 1; }

/* Arabic-Indic vs Latin numerals — toggle by lang attribute */
[lang="ar-u-nu-arab"] { font-variant-numeric: tabular-nums; unicode-bidi: isolate; }
[lang="ar-u-nu-latn"] { font-variant-numeric: tabular-nums; }

/* Default policy: Arabic body content uses Latin digits unless explicit */
body[lang="ar"] :is(.n-currency, .n-stat, .n-data) {
  font-family: var(--voice-num-tabular);
  font-variant-numeric: tabular-nums lining-nums;
}
```

### ٢. Kashida Discipline

```css
/* ÊLAN v4 — β3 — Kashida policy
   Default: kashida disabled everywhere (typography hygiene).
   Explicit opt-in via class .k-on or per-world override. */

* {
  text-justify: auto;
  font-feature-settings: "calt" 1, "liga" 1, "kern" 1;
}

.k-on    { text-justify: inter-word; word-spacing: 0.05em; }
.k-rhythm { letter-spacing: 0.02em; word-spacing: 0.06em; }

/* Banned in 99% of cases. Only Dhahab world's currency cells get this: */
.k-currency-thousands {
  font-family: var(--voice-num-tabular);
  font-variant-numeric: tabular-nums lining-nums;
  letter-spacing: 0;
}
```

### ٣. أنشئ `platform/assets/js/elan/format.js` (ESM)

```javascript
/* ÊLAN v4 — β3 — Format helpers
   Currency formatter with Dhahab-world-specific kashida thousands separator. */

const KASHIDA = '\u0640'; // Arabic Tatweel ـ

/**
 * Format a number with locale-appropriate thousands separator.
 * In Dhahab world (or with explicit kashida=true), uses kashida
 * with width that grows by digit count (Beacon).
 */
export function formatCurrency(value, opts = {}) {
  const { kashida = false, fractionDigits = 2 } = opts;
  const fixed = Number(value).toFixed(fractionDigits);
  const [intPart, decPart] = fixed.split('.');
  const groups = [];
  let s = intPart;
  while (s.length > 3) {
    groups.unshift(s.slice(-3));
    s = s.slice(0, -3);
  }
  groups.unshift(s);

  let separator = ',';
  if (kashida) {
    const totalDigits = intPart.length;
    const stretches = Math.max(1, Math.min(4, totalDigits - 4));
    separator = KASHIDA.repeat(stretches);
  }

  const grouped = groups.join(separator);
  return decPart ? `${grouped}.${decPart}` : grouped;
}

export function autoFormatCurrencies(root = document) {
  root.querySelectorAll('.n-currency-auto[data-amount]').forEach(el => {
    const amount = parseFloat(el.dataset.amount);
    const inDhahab = el.closest('[data-world="dhahab"]') !== null;
    el.textContent = formatCurrency(amount, {
      kashida: inDhahab,
      fractionDigits: el.dataset.fraction ? parseInt(el.dataset.fraction, 10) : 2
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => autoFormatCurrencies());
} else {
  autoFormatCurrencies();
}
document.addEventListener('upg:world:change', () => autoFormatCurrencies());

window.Upg = window.Upg || {};
window.Upg.format = Object.freeze({ currency: formatCurrency, autoCurrencies: autoFormatCurrencies });

export default { formatCurrency, autoFormatCurrencies };
```

### ٤. سجِّل في `app.js`:
```javascript
import './js/elan/format.js';
```

### ٥. Per-Page Signature — `tokens/_signature.css`

```css
/* ÊLAN v4 — β3 — Per-world type signature
   Each world fingerprints its text via 3 concrete properties. */

[data-world="hibr"] :where(h1,h2,h3) {
  font-family: var(--voice-display);
  font-feature-settings: "calt" 1, "kern" 1;
  letter-spacing: var(--track-snug);
  text-shadow: 0 1px 0 hsl(0 0% 100% / 0.3);
}

[data-world="naar"] :where(h1,h2,h3) {
  font-family: var(--voice-display-h);
  letter-spacing: var(--track-tight);
  font-stretch: 95%;
  text-shadow: 0 0 12px color-mix(in oklch, var(--ember) 30%, transparent);
}

[data-world="nada"] :where(h1,h2,h3) {
  font-family: var(--voice-display-l);
  font-style: italic;
  font-weight: 500;
  letter-spacing: var(--track-loose);
}

[data-world="hadeed"] :where(h1,h2,h3) {
  font-family: var(--voice-display-h);
  font-weight: 800;
  letter-spacing: var(--track-tight);
}

[data-world="dhahab"] :where(h1,h2,h3) {
  font-family: var(--voice-display);
  font-feature-settings: "swsh" 1, "calt" 1;
  letter-spacing: var(--track-snug);
}

[data-world="tayyar"] :where(h1,h2,h3) {
  font-family: var(--voice-display-h);
  font-stretch: 105%;
  letter-spacing: var(--track-loose);
  font-weight: 700;
}

[data-world="warsha"] :where(h1,h2,h3) {
  font-family: var(--voice-display);
  font-weight: 700;
  letter-spacing: var(--track-snug);
}

[data-world="saloon"] :where(h1,h2,h3) {
  font-family: var(--voice-display-l);
  font-weight: 600;
  letter-spacing: var(--track-loose);
  font-style: italic;
}
```

### ٦. سجِّل في `tokens.css`:
```css
@import url("./tokens/_signature.css");
```

---

## Acceptance Criteria

- [ ] `_voice-utilities.css` يحتوي n-* و k-* utility classes
- [ ] `tokens/_signature.css` موجود + per-world signatures (8 worlds)
- [ ] `platform/assets/js/elan/format.js` موجود ويُصدِّر `formatCurrency`
- [ ] `Upg.format.currency(1234567, { kashida: true })` تعيد string فيه `\u0640`
- [ ] grep: `grep -c '\-\-voice-' platform/assets/css/tokens/_signature.css` ≥ 8
- [ ] grep: `grep -F 'KASHIDA' platform/assets/js/elan/format.js | wc -l` ≥ 1
- [ ] Auto-format يعمل على `.n-currency-auto[data-amount="1234567"]` داخل world dhahab
- [ ] commit: `β3: Numeric+Kashida+Signature — verified: signatures=8, kashida_in_dhahab=true, auto_format=on-world-change`
- [ ] Beacon recorded in CREATIVITY_LOG.md
- [ ] **Pillar β complete** → افتح PR من `elan-β-type-soul` إلى main

---

## بعد β3

أنشئ PR بعنوان: `feat(elan-v4): Pillar β — TYPE SOUL (3/3 stages)`

ثم session جديد → branch `elan-γ-eight-worlds` → ابدأ γ1 (World Foundation).

— نهاية β3 — نهاية Pillar β —
