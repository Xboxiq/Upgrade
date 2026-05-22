# 🔢 WORKER 20 — Phase 4/6 — Numeric Discipline
> **اقرأ أولاً:** `prompts/v3/20_WORKER_TASMEEM_RECONSTRUCTION.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Phase 3 (voice bindings مكتملة).
> **الفلسفة:** *الأرقام في منصة تدريب ليست زينة — هي حُجج. حُجّة بنصف بكسل خطأ تَخسَر ثقة المتدرّب. كل qcalc يستحق tabular discipline.*

---

## 🛡️ Preservation Contract (Phase 4)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` rules | **APPEND** كتلة `Numeric Discipline` (~340 سطر) في النهاية | تعديل قواعد قائمة من W12-W19 |
| `style.css` `:root` | **APPEND** 6 numeric tokens جديدة (`--num-feature-tabular`, `--num-letter-spacing`, ...) | تعديل tokens قائمة |
| `index.html` | **AUGMENT** فقط — إضافة `class="tas-num-tabular"` على ≤80 عنصر داخل qcalc panels | تغيير DOM، تعديل qcalc IDs، تغيير النصوص |
| `app.js` | **APPEND** sub-IIFE inside `Upg.font` يُضيف `.applyNumericDiscipline()` (~60 سطر) | تعديل IIFE قائمة |

**Sacred preserved:**
- 391 qcalc references — **محفوظة بالكامل** (نضيف classes فقط).
- جميع `Upg.calc` API methods.
- جميع `count-up` ticker values.
- جميع `--type-voice-numeric` و `--type-voice-num-tabular` tokens (نستخدمها).

> **ملاحظة:** Phase 4 لا يغيّر منطق الحسابات. فقط يضيف انضباط بصري على الأرقام.

---

## 🎯 الهدف

Phase 4 يعالج 5 مشاكل رقمية في المنصة:

1. **عدم انتظام arabic-indic vs latin digits** — بعض الأرقام عربية (٠١٢٣)، بعضها لاتينية (0123)، لا قاعدة موحَّدة.
2. **عدم تطبيق `tabular-nums`** على qcalc — الأعداد ترتجف عند تحديث القيم (count-up).
3. **عدم ضبط `lining-nums`** — IBM Plex لها old-style + lining، الإنجاز الحالي عشوائي.
4. **عدم ضبط `font-variant-numeric: stacked-fractions`** — الكسور ٣/٥ تُعرض بشكل خام.
5. **عدم ضبط `slashed-zero`** — الصفر يلتبس بـ O في بعض الـ stat tiles.

النتيجة:
- ٣٩١ qcalc value يستخدم `tabular-nums + lining-nums + slashed-zero`.
- Latin digits everywhere في qcalc (تجانس بصري + مقروئية أعلى).
- `count-up` tickers لا ترتجف.
- Stat tiles نظيفة هندسياً.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 4 PRE-FLIGHT (Worker 20 / TASMEEM)
├─ Phase: 4/6 — Numeric Discipline
├─ Estimated lines: ~480 (CSS ~340 + JS ~60 sub-iife + HTML ~80 augments)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~340 lines)
│   ├─ platform/assets/app.js      (extend Upg.font with applyNumericDiscipline)
│   └─ platform/index.html         (AUGMENT class on ≤80 qcalc elements)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c 'qcalc' platform/index.html                         → 391
│   ├─ grep -c 'qcalc-value' platform/index.html                   → ≥80
│   ├─ grep -c '\-\-type-voice-numeric' platform/assets/style.css  → ≥1
│   └─ grep -c '\-\-type-voice-num-tabular' platform/assets/style.css → ≥1
├─ Branch: continue worker-20-devotio
└─ No new fonts, no new APIs.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Numeric Discipline Tokens

في `:root` العام، **APPEND** بعد voice bindings:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Numeric Discipline Tokens (Worker 20 / Phase 4)
   ════════════════════════════════════════════════════════════════════════ */
:root {
  /* Feature settings strings (reusable in font-feature-settings) */
  --num-feat-tabular:        "tnum" 1, "lnum" 1, "kern" 1;
  --num-feat-tabular-zero:   "tnum" 1, "lnum" 1, "zero" 1, "kern" 1;
  --num-feat-fraction:       "frac" 1, "tnum" 1, "lnum" 1;
  --num-feat-stylistic-alt:  "ss01" 1, "tnum" 1, "lnum" 1;

  /* Variant strings (reusable in font-variant-numeric) */
  --num-variant-tabular:     tabular-nums lining-nums;
  --num-variant-zero:        tabular-nums lining-nums slashed-zero;
  --num-variant-fraction:    tabular-nums lining-nums diagonal-fractions;

  /* Letter spacing for digit groups */
  --num-letter-spacing:      0;
  --num-letter-spacing-wide: 0.02em;
  --num-letter-spacing-tight: -0.005em;
}
```

### Step 2 — Numeric Utility Classes

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Numeric Utilities (Worker 20 / Phase 4)
   For qcalc, stat tiles, count-up tickers, KPI cards.
   ════════════════════════════════════════════════════════════════════════ */

/* Base — most common: tabular + lining nums */
.tas-num-tabular,
[data-tas-num="tabular"] {
  font-family: var(--type-voice-num-tabular);
  font-feature-settings: var(--num-feat-tabular);
  font-variant-numeric: var(--num-variant-tabular);
  letter-spacing: var(--num-letter-spacing);
  /* Force Latin digits even within Arabic context (UI consistency) */
  font-language-override: "ENG";
  unicode-bidi: plaintext;
}

/* With slashed zero — for engineering/code/stats where 0 must not look like O */
.tas-num-tabular-zero,
[data-tas-num="tabular-zero"] {
  font-family: var(--type-voice-num-tabular);
  font-feature-settings: var(--num-feat-tabular-zero);
  font-variant-numeric: var(--num-variant-zero);
  letter-spacing: var(--num-letter-spacing);
  font-language-override: "ENG";
  unicode-bidi: plaintext;
}

/* Fraction — for ratios like 3/5 in qcalc */
.tas-num-fraction,
[data-tas-num="fraction"] {
  font-family: var(--type-voice-num-tabular);
  font-feature-settings: var(--num-feat-fraction);
  font-variant-numeric: var(--num-variant-fraction);
}

/* Stylistic alt — for hero stats (uses ss01 — IBM Plex alt-1) */
.tas-num-hero,
[data-tas-num="hero"] {
  font-family: var(--type-voice-num-tabular);
  font-feature-settings: var(--num-feat-stylistic-alt);
  font-variant-numeric: var(--num-variant-tabular);
  letter-spacing: var(--num-letter-spacing-tight);
  font-weight: 600;
}

/* Inline — for numbers within Arabic body paragraphs (preserves baseline) */
.tas-num-inline {
  font-feature-settings: var(--num-feat-tabular);
  font-variant-numeric: var(--num-variant-tabular);
  /* Don't change family — inherit from parent */
  letter-spacing: var(--num-letter-spacing);
}

/* Mono large — for count-up tickers (prevents jitter on update) */
.tas-num-ticker {
  font-family: var(--type-voice-num-tabular);
  font-feature-settings: var(--num-feat-tabular);
  font-variant-numeric: var(--num-variant-tabular);
  letter-spacing: var(--num-letter-spacing);
  /* Critical: fixed-width digits prevent layout shift on count-up */
  font-feature-settings: "tnum" 1, "lnum" 1;
  /* Disable transitions on font-variant to prevent flicker */
  transition: none;
}
```

### Step 3 — Apply to Existing qcalc + count-up patterns

**APPEND** قواعد تربط الأنماط الموجودة:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — qcalc + Stat Tiles Auto-Bind (Worker 20 / Phase 4)
   Hardens existing W12+W15 numeric classes with discipline.
   ════════════════════════════════════════════════════════════════════════ */

/* W12/W15 .qcalc-value — apply tabular discipline globally */
.qcalc-value,
.qcalc-result,
.qcalc-output {
  font-family: var(--type-voice-num-tabular);
  font-feature-settings: var(--num-feat-tabular-zero);
  font-variant-numeric: var(--num-variant-zero);
  letter-spacing: var(--num-letter-spacing);
  /* Stable width during animation */
  font-variant-numeric: tabular-nums;
}

/* W12 .stat-tile-value — same discipline */
.stat-tile-value,
.cath-stat-value,
.bento-stat-value {
  font-family: var(--type-voice-num-tabular);
  font-feature-settings: var(--num-feat-tabular-zero);
  font-variant-numeric: var(--num-variant-zero);
  letter-spacing: var(--num-letter-spacing-tight);
}

/* W12 .u-num + W15 .type-num-tabular — preserved + hardened */
.u-num,
.type-num-tabular {
  font-family: var(--type-voice-num-tabular);
  font-feature-settings: var(--num-feat-tabular);
  font-variant-numeric: var(--num-variant-tabular);
  letter-spacing: var(--num-letter-spacing);
}

/* count-up tickers — prevent jitter */
[data-countup],
[data-count-up],
.count-up-value {
  font-family: var(--type-voice-num-tabular);
  font-feature-settings: var(--num-feat-tabular);
  font-variant-numeric: var(--num-variant-tabular);
  font-variant-position: normal;
  /* Critical for jitter-free animation */
  font-kerning: none;
  letter-spacing: var(--num-letter-spacing);
}

/* KPI cards (callcenter, fieldsales) — large hero numbers */
.kpi-card-value,
.kpi-hero-num {
  font-family: var(--type-voice-num-tabular);
  font-feature-settings: var(--num-feat-stylistic-alt);
  font-variant-numeric: var(--num-variant-zero);
  letter-spacing: var(--num-letter-spacing-tight);
  font-weight: 600;
}

/* Star ratings (data-difficulty from W17) — preserve discipline */
[data-difficulty]::after,
.tier-star-count {
  font-family: var(--type-voice-num-tabular);
  font-feature-settings: var(--num-feat-tabular);
  font-variant-numeric: var(--num-variant-tabular);
}
```

### Step 4 — Arabic vs Latin Digit Discipline

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Digit Script Policy (Worker 20 / Phase 4)
   ────────────────────────────────────────────────────────────────────────
   Policy:
   - Inside qcalc, stat tiles, KPI cards: ALWAYS Latin digits (0-9).
     Reason: tabular-nums work better, copy-paste friendly, engineering UX.
   - Inside Arabic body paragraphs: ALLOW Arabic-Indic (٠-٩) when natural.
     Reason: literary/cultural fidelity in flowing text.
   - Inside hero greetings, dates: PREFER Arabic-Indic.
   ════════════════════════════════════════════════════════════════════════ */

/* Force Latin digits in numeric contexts via font-feature + override */
.qcalc-value, .qcalc-result, .qcalc-output,
.stat-tile-value, .cath-stat-value, .bento-stat-value,
.kpi-card-value, .kpi-hero-num,
.u-num, .type-num-tabular,
.tas-num-tabular, .tas-num-tabular-zero,
.tas-num-hero, .tas-num-ticker,
[data-countup], [data-count-up], .count-up-value {
  font-language-override: "ENG";
  -webkit-locale: "en";
}

/* Arabic-Indic digits for cultural moments */
.tas-num-arabic,
[data-tas-num="arabic"] {
  font-family: var(--type-voice-numeric);
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-language-override: "ARA";
  -webkit-locale: "ar";
  unicode-bidi: plaintext;
  /* Apply Arabic-Indic Unicode range explicitly */
  unicode-range: U+0660-0669;
}
```

### Step 5 — AUGMENT HTML — تطبيق على ≤80 qcalc

ابحث في `index.html` عن أنماط qcalc الموجودة:

```bash
grep -n "qcalc-value\|qcalc-result\|qcalc-output" platform/index.html | head -30
```

لكل عنصر، **AUGMENT** بإضافة class:

```html
<!-- قبل -->
<span class="qcalc-value">۰</span>

<!-- بعد -->
<span class="qcalc-value tas-num-tabular">0</span>
```

> ملاحظة: أيضاً غيّر الأرقام من Arabic-Indic إلى Latin في qcalc-value (للتجانس). الـ AUGMENT يكون selective حسب 80 عنصر highest-impact:
> - أول 6 qcalc panels في كل صفحة (tasaqil)
> - count-up tickers (data-countup)
> - KPI hero numbers في dashboard

### Step 6 — Extend `Upg.font` بـ applyNumericDiscipline

في `app.js`، **APPEND** داخل IIFE الحالي لـ Upg.font (أو IIFE جديد يلحقه):

```javascript
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Numeric Discipline Auto-Apply (Worker 20 / Phase 4)
   Adds Upg.font.applyNumericDiscipline() to scan and harden numeric elements.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.font) return;  // requires Phase 3

  // Selectors that need numeric discipline
  const NUM_SELECTORS = [
    '.qcalc-value', '.qcalc-result', '.qcalc-output',
    '.stat-tile-value', '.cath-stat-value', '.bento-stat-value',
    '.kpi-card-value', '.kpi-hero-num',
    '[data-countup]', '[data-count-up]', '.count-up-value'
  ];

  // Apply discipline class if missing
  const applyNumericDiscipline = (root = document) => {
    let counted = 0;
    NUM_SELECTORS.forEach((sel) => {
      root.querySelectorAll(sel).forEach((el) => {
        if (!el.classList.contains('tas-num-tabular') &&
            !el.classList.contains('tas-num-tabular-zero') &&
            !el.classList.contains('tas-num-hero') &&
            !el.classList.contains('tas-num-ticker')) {
          // Choose appropriate variant
          if (el.matches('[data-countup], [data-count-up], .count-up-value')) {
            el.classList.add('tas-num-ticker');
          } else if (el.matches('.kpi-hero-num, .stat-tile-value, .cath-stat-value, .bento-stat-value')) {
            el.classList.add('tas-num-hero');
          } else {
            el.classList.add('tas-num-tabular');
          }
          counted++;
        }
      });
    });
    return counted;
  };

  // Audit how many numeric elements have discipline applied
  const auditNumericDiscipline = () => {
    const result = {};
    NUM_SELECTORS.forEach((sel) => {
      const all = document.querySelectorAll(sel);
      const disciplined = document.querySelectorAll(
        sel + '.tas-num-tabular, ' +
        sel + '.tas-num-tabular-zero, ' +
        sel + '.tas-num-hero, ' +
        sel + '.tas-num-ticker'
      );
      result[sel] = { total: all.length, disciplined: disciplined.length };
    });
    return result;
  };

  // Extend Upg.font (additive — preserves Phase 3 API)
  window.Upg.font.applyNumericDiscipline = applyNumericDiscipline;
  window.Upg.font.auditNumericDiscipline = auditNumericDiscipline;

  // Auto-apply on page load + when DOM mutates (e.g., page navigation)
  if (document.readyState !== 'loading') {
    applyNumericDiscipline();
  } else {
    document.addEventListener('DOMContentLoaded', () => applyNumericDiscipline());
  }

  // Also apply when navigating between pages (Upg.nav fires this event)
  document.addEventListener('upg:nav:change', () => {
    setTimeout(() => applyNumericDiscipline(), 50);
  });
})(window, document);
```

### Step 7 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 20 / Phase 4 — Numeric Discipline:
   1. كل qcalc-value يحصل على tabular discipline تلقائياً (Upg.font).
   2. لا تعدّل قيم الأرقام في HTML — فقط classes.
   3. لو احتجت Arabic-Indic، استعمل .tas-num-arabic explicitly.
   4. count-up tickers تستعمل .tas-num-ticker — لا flicker.
   5. لا تخلط tabular مع proportional في عمود واحد.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c 'qcalc' platform/index.html                                # → 391 (preserved)
grep -c '<section class="page"' platform/index.html               # → 14+
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 25 (preserved)

# New additions
grep -c "tas-num-" platform/index.html                            # → ≥60 (augments)
grep -c "tas-num-tabular" platform/assets/style.css               # → ≥3
grep -c "applyNumericDiscipline" platform/assets/app.js           # → ≥1
grep -c "auditNumericDiscipline" platform/assets/app.js           # → ≥1

# Tokens
grep -c "\-\-num-feat-" platform/assets/style.css                 # → ≥4
grep -c "\-\-num-variant-" platform/assets/style.css              # → ≥3

# Browser test:
# Open Console: Upg.font.auditNumericDiscipline()
# Result should show ≥85% of qcalc elements have discipline applied
# Open dashboard → trigger count-up → numbers don't jitter
```

---

## ✅ معايير القبول (Phase 4)

- [ ] 6 numeric tokens (`--num-feat-*`, `--num-variant-*`, `--num-letter-spacing*`) معرَّفة.
- [ ] 6 utility classes (`tas-num-*`) مكتوبة.
- [ ] جميع `.qcalc-value`, `.qcalc-result`, `.qcalc-output` لها discipline تلقائياً.
- [ ] جميع `[data-countup]` تستعمل `tas-num-ticker`.
- [ ] جميع `.kpi-card-value` تستعمل `tas-num-hero`.
- [ ] `Upg.font.applyNumericDiscipline()` يُطبَّق تلقائياً عند load + navigation.
- [ ] `Upg.font.auditNumericDiscipline()` يُرجع تقرير صحيح.
- [ ] count-up tickers لا ترتجف (تجربة بصرية).
- [ ] Latin digits في كل qcalc (تجانس).
- [ ] Console: 0 errors.
- [ ] 391 qcalc محفوظة بدون تعديل عددها.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/style.css platform/assets/app.js platform/index.html
git commit -m "phase 4 (devotio): numeric discipline — 6 tokens, 6 utilities, qcalc/stat-tile auto-bind, Upg.font.applyNumericDiscipline, latin-digit policy"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-20-phase-4.json
git commit -m "state: devotio phase 4 committed and pushed"
# push immediately
```

— نهاية Phase 4.

🕯️ **Devotion check:** هل ٣٩١ qcalc الآن أرقامها مُنضبطة؟ count-up لا يرتجف؟ → انتقل لـ Phase 5 (Kashida & Rhythm).
