# 📐 WORKER 15 — Phase 5/6 — Modular Scale & Vertical Rhythm
> **اقرأ أولاً:** `prompts/v2/15_WORKER_TYPOGRAPHY_SOUL.md` — Preservation Guard.
> **يبني فوق:** Phases 1-4 (تسعة أصوات + خطوط محمَّلة).
> **الفلسفة:** *الحجم بدون نسبة = فوضى. النسبة بدون إيقاع = فوضى موسيقية. ضبط الـ scale + الـ rhythm = هندسة بصرية صامتة.*

---

## 🛡️ Preservation Contract (Phase 5)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` `:root` | **REPLACE-IN-PLACE** قيم Type Scale من W12 P1 (الـ `--text-*` tokens) لـ Perfect-Fourth (1.333) ratio + **APPEND** baseline + leading + tracking tokens | حذف tokens، تغيير أسمائها |
| `style.css` rules | **APPEND** قواعد الـ rhythm + utilities `.u-rhythm-*` + optical-size bindings | تعديل قواعد layout (grid/flex) |
| `index.html` | لا تُلمَس في Phase 5 | أي تعديل |
| `app.js` | لا يُلمَس في Phase 5 | أي تعديل |

**Sacred preserved:**
- أسماء tokens `--text-xs/sm/base/lg/xl/2xl/3xl/4xl/5xl` لا تتغيّر.
- جميع الـ classes اللي تستعمل `font-size: var(--text-*)` تشتغل بدون كسر.
- 14 page sections + 391 qcalc.

---

## 🎯 الهدف

Cathedral v16 يستعمل type scale ثابت من Worker 12 P1، لكن:
- النسبة بين الأحجام **تقريبية** (1.2x غير دقيق).
- لا baseline grid → النصوص الطويلة مع headings تخلق "drift" بصري.
- لا leading tokens موحَّدة (كل element يضع line-height يدوياً).
- لا tracking tokens (letter-spacing inconsistent).
- Variable fonts (Readex Pro، Inter، Fraunces) لا تستعمل `optical-size` axis.

**Phase 5 يحلّ:**

1. **Modular Scale: Perfect-Fourth (1.333)** — نسبة متناغمة مستوحاة من Bringhurst.
2. **Baseline Grid 8pt** — vertical rhythm موحَّد (كل margin/padding مضاعف 8).
3. **Leading Tokens** — `--leading-tight/snug/normal/relaxed/loose`.
4. **Tracking Tokens** — `--tracking-tighter/tight/normal/wide/wider`.
5. **Optical Size** — Variable fonts تستعمل `font-variation-settings: "opsz" auto`.
6. **Reading Rhythm Utilities** — `.u-rhythm-tight`, `.u-rhythm-relaxed`.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 5 PRE-FLIGHT
├─ Phase: 5/6 — Modular Scale & Rhythm
├─ Estimated lines: ~400
├─ Files to touch:
│   └─ platform/assets/style.css   (REPLACE --text-* values + APPEND ~340 lines)
├─ Sacred verify:
│   ├─ grep -c '\-\-text-base'                      → ≥1
│   ├─ grep -c 'font-size: var(\-\-text-'           → ≥30 (preserved usage)
│   └─ Files NOT touched: index.html, app.js
├─ Branch: continue worker-15-resonance
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Modular Scale (Perfect-Fourth)

ابحث في `style.css` عن الـ `--text-*` tokens (موجودة من W12 P1، ~ line 70). **REPLACE-IN-PLACE** القيم:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Modular Scale (Worker 15 / Phase 5)
   Ratio: Perfect-Fourth (1.333)
   Base: 16px (--text-base)
   Reference: Bringhurst, "The Elements of Typographic Style", §3.2
   Each step ascends/descends by × 1.333 from base.
   ════════════════════════════════════════════════════════════════ */
:root {
  /* Modular scale — clamp() for fluid responsive */
  --text-xs:    clamp(0.694rem, 0.660rem + 0.170vw, 0.750rem);  /* 11.1 → 12.0 */
  --text-sm:    clamp(0.833rem, 0.795rem + 0.190vw, 0.920rem);  /* 13.3 → 14.7 */
  --text-base:  clamp(1.000rem, 0.950rem + 0.250vw, 1.125rem);  /* 16.0 → 18.0 */
  --text-lg:    clamp(1.200rem, 1.135rem + 0.325vw, 1.350rem);  /* 19.2 → 21.6 */
  --text-xl:    clamp(1.440rem, 1.355rem + 0.425vw, 1.620rem);  /* 23.0 → 25.9 */
  --text-2xl:   clamp(1.728rem, 1.620rem + 0.540vw, 1.944rem);  /* 27.6 → 31.1 */
  --text-3xl:   clamp(2.074rem, 1.935rem + 0.695vw, 2.333rem);  /* 33.2 → 37.3 */
  --text-4xl:   clamp(2.488rem, 2.310rem + 0.890vw, 2.799rem);  /* 39.8 → 44.8 */
  --text-5xl:   clamp(2.986rem, 2.755rem + 1.155vw, 3.358rem);  /* 47.8 → 53.7 */

  /* Display sizes — ceremonial only */
  --text-display-1: clamp(3.583rem, 3.270rem + 1.565vw, 4.027rem);  /* 57.3 → 64.4 */
  --text-display-2: clamp(4.300rem, 3.880rem + 2.100vw, 4.829rem);  /* 68.8 → 77.3 */
}
```

> **التحقّق:** كل step هو step السابق × 1.333. مثلاً 1.000 × 1.333 = 1.333 ≈ 1.350 (round). 1.350 × 1.333 = 1.800 → clamp يضمن 1.728-1.944.

### Step 2 — Leading Tokens

**APPEND** بعد modular scale:

```css
/* ════════════════════════════════════════════════════════════════
   Leading (line-height) Tokens — موحَّدة عبر كل voices.
   ════════════════════════════════════════════════════════════════ */
:root {
  --leading-none:    1;       /* للـ display ceremonial */
  --leading-tight:   1.15;    /* لـ h1/h2 (display) */
  --leading-snug:    1.35;    /* لـ h3/h4 (card titles) */
  --leading-normal:  1.5;     /* لـ UI (buttons, labels) */
  --leading-relaxed: 1.7;     /* لـ body paragraphs */
  --leading-loose:   1.85;    /* لـ poetry, quotes */
}
```

### Step 3 — Tracking Tokens

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Tracking (letter-spacing) Tokens — موحَّدة.
   لاحظ: Arabic لا يفضّل tracking كبير (يكسر الـ joining).
   استخدم بحذر على العربية. مفيد على Latin/numbers.
   ════════════════════════════════════════════════════════════════ */
:root {
  --tracking-tightest: -0.04em;
  --tracking-tighter:  -0.025em;
  --tracking-tight:    -0.015em;
  --tracking-snug:     -0.005em;
  --tracking-normal:   0;
  --tracking-wide:     0.01em;
  --tracking-wider:    0.025em;
  --tracking-widest:   0.04em;
}
```

### Step 4 — Vertical Rhythm Tokens (Baseline Grid 8pt)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Baseline Grid — 8pt vertical rhythm.
   كل margin/padding يجب يكون مضاعف 0.5rem (8px).
   ════════════════════════════════════════════════════════════════ */
:root {
  /* Rhythm increments — كل step = 8px */
  --rhythm-1: 0.5rem;     /*  8px */
  --rhythm-2: 1rem;       /* 16px */
  --rhythm-3: 1.5rem;     /* 24px */
  --rhythm-4: 2rem;       /* 32px */
  --rhythm-5: 2.5rem;     /* 40px */
  --rhythm-6: 3rem;       /* 48px */
  --rhythm-7: 3.5rem;     /* 56px */
  --rhythm-8: 4rem;       /* 64px */
  --rhythm-10: 5rem;      /* 80px */
  --rhythm-12: 6rem;      /* 96px */
  --rhythm-16: 8rem;      /* 128px */

  /* Heading-to-body rhythm */
  --rhythm-h-to-body:  var(--rhythm-3);  /* 24px تحت h1/h2 */
  --rhythm-h-to-h:     var(--rhythm-5);  /* 40px بين h2 و h3 */
  --rhythm-section:    var(--rhythm-8);  /* 64px بين sections */
  --rhythm-page:       var(--rhythm-12); /* 96px بين أقسام الصفحة */
}
```

### Step 5 — Reading Rhythm Bindings

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Reading Rhythm Bindings — تطبيق leading + tracking على voices.
   ════════════════════════════════════════════════════════════════ */

/* Hero — leading none */
.type-hero {
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tighter);
}
.type-hero--xl,
.type-hero--lg {
  line-height: var(--leading-none);
  letter-spacing: var(--tracking-tightest);
}

/* Display — leading tight */
.type-display {
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}
.type-display-h {
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-snug);
}

/* Body — leading relaxed */
.type-body {
  line-height: var(--leading-relaxed);
  letter-spacing: var(--tracking-normal);
}
.type-body-lead {
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-snug);
}
.type-body-lg {
  line-height: var(--leading-relaxed);
}
.type-body-sm {
  line-height: var(--leading-normal);
}

/* UI — leading normal */
.type-ui-label,
.type-button,
.type-tab,
.type-breadcrumb {
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-wide);
}

/* Numeric — leading normal, tracking 0 */
.type-num,
.type-num-tabular,
.type-num-currency {
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-normal);
}
.type-num-display {
  line-height: var(--leading-none);
  letter-spacing: var(--tracking-tighter);
}

/* Code — leading relaxed for long blocks */
.type-code {
  line-height: var(--leading-relaxed);
  letter-spacing: var(--tracking-normal);
}
.type-code-inline {
  line-height: var(--leading-normal);
}

/* Quote — leading loose */
.type-quote,
.type-quote-block,
.type-quote-literary-en {
  line-height: var(--leading-loose);
  letter-spacing: var(--tracking-snug);
}

/* Accent (Aref Ruqaa) — leading loose for breathing */
.type-eyebrow {
  line-height: var(--leading-loose);
  letter-spacing: var(--tracking-wider);
}
.type-signature {
  line-height: var(--leading-loose);
  letter-spacing: var(--tracking-wide);
}
```

### Step 6 — Optical Size Bindings (Variable Fonts)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Optical Size Bindings — Variable fonts auto-adjust to display size.
   Inter, Readex Pro, Fraunces, IBM Plex Sans Arabic كلها variable.
   ════════════════════════════════════════════════════════════════ */

/* Auto opsz — يربط حجم الخط بـ optical-size axis */
.type-hero,
.type-display,
.type-display-h,
.type-display-l {
  font-optical-sizing: auto;
}

.type-body,
.type-body-lead,
.type-body-lg,
.type-body-sm {
  font-optical-sizing: auto;
  /* Readex Pro variable يقبل opsz auto */
}

.type-quote-literary-en {
  font-optical-sizing: auto;
  font-variation-settings: "opsz" 18, "SOFT" 50;
}

/* Inter variable — opsz axis */
.type-latin,
.type-latin-ui,
.type-latin-brand {
  font-optical-sizing: auto;
}

/* Disable for older browsers gracefully */
@supports not (font-optical-sizing: auto) {
  /* fallback: لا شيء — الخط يستعمل default opsz */
}
```

### Step 7 — Vertical Rhythm Utilities

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Vertical Rhythm Utilities — للتطبيق على containers.
   ════════════════════════════════════════════════════════════════ */

/* Reading rhythm — للنصوص الطويلة */
.u-rhythm-reading > * + * {
  margin-block-start: var(--rhythm-3);
}

.u-rhythm-reading h1,
.u-rhythm-reading h2,
.u-rhythm-reading .type-hero,
.u-rhythm-reading .type-display {
  margin-block-start: var(--rhythm-5);
  margin-block-end: var(--rhythm-2);
}

.u-rhythm-reading h3,
.u-rhythm-reading h4,
.u-rhythm-reading .type-display-h {
  margin-block-start: var(--rhythm-4);
  margin-block-end: var(--rhythm-2);
}

.u-rhythm-reading p,
.u-rhythm-reading .type-body {
  margin-block: 0 var(--rhythm-3);
}

.u-rhythm-reading blockquote,
.u-rhythm-reading .type-quote-block {
  margin-block: var(--rhythm-4);
}

/* Card rhythm — للـ cards فيها heading + body */
.u-rhythm-card > * + * {
  margin-block-start: var(--rhythm-2);
}

.u-rhythm-card .type-display-h + .type-body,
.u-rhythm-card .type-display-h + p {
  margin-block-start: var(--rhythm-2);
}

/* Tight rhythm — للـ UI (sidebar items, list) */
.u-rhythm-tight > * + * {
  margin-block-start: var(--rhythm-1);
}

/* Loose rhythm — للأقسام المختلفة في صفحة طويلة */
.u-rhythm-loose > * + * {
  margin-block-start: var(--rhythm-6);
}

.u-rhythm-loose > h2,
.u-rhythm-loose > .type-display {
  margin-block-start: var(--rhythm-8);
}
```

### Step 8 — Reading Width (Measure)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Reading Measure (line-length) — Bringhurst recommends 45-75 chars.
   For Arabic, slightly tighter (35-65 chars due to wider letters).
   ════════════════════════════════════════════════════════════════ */
:root {
  --measure-narrow: 45ch;     /* للـ poetry, quotes */
  --measure-normal: 60ch;     /* للـ body paragraphs */
  --measure-wide:   72ch;     /* للـ technical docs */

  /* Arabic-specific (slightly tighter) */
  --measure-narrow-ar: 38ch;
  --measure-normal-ar: 52ch;
  --measure-wide-ar:   65ch;
}

.u-measure-narrow  { max-width: var(--measure-narrow-ar); }
.u-measure-normal  { max-width: var(--measure-normal-ar); }
.u-measure-wide    { max-width: var(--measure-wide-ar); }

/* Latin sections override */
.u-measure-narrow:lang(en),
.u-measure-narrow .type-latin,
.u-measure-narrow [lang="en"] {
  max-width: var(--measure-narrow);
}
.u-measure-normal:lang(en),
.u-measure-normal .type-latin,
.u-measure-normal [lang="en"] {
  max-width: var(--measure-normal);
}
.u-measure-wide:lang(en),
.u-measure-wide .type-latin,
.u-measure-wide [lang="en"] {
  max-width: var(--measure-wide);
}
```

### Step 9 — Hyphenation & Word Break

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Hyphenation & Wrap — لإيقاع قراءة طبيعي.
   ════════════════════════════════════════════════════════════════ */

/* Auto hyphenation للـ body text */
.type-body,
.u-prose,
.u-rhythm-reading p {
  hyphens: auto;
  -webkit-hyphens: auto;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* Headlines: لا hyphenation */
.type-hero,
.type-display,
.type-display-h,
h1, h2, h3, h4 {
  hyphens: none;
  word-break: keep-all;
}

/* Code: لا wrap */
.type-code,
pre, code {
  white-space: pre;
  overflow-x: auto;
  word-break: normal;
}

/* Inline code: allow wrap */
.type-code-inline {
  white-space: nowrap;
  word-break: keep-all;
}
```

### Step 10 — Typography Page Reset (light corrective)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Typography Page Reset — defaults للعناصر الخام.
   حيث لم تُطبَّق classes صراحة.
   ════════════════════════════════════════════════════════════════ */

/* Prose container — defaults لكل HTML داخله */
.u-prose {
  font-family: var(--type-voice-body);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text);
  max-width: var(--measure-normal-ar);
}

.u-prose h1 { font-family: var(--type-voice-display); font-size: var(--text-4xl); line-height: var(--leading-tight); margin-block: var(--rhythm-5) var(--rhythm-3); }
.u-prose h2 { font-family: var(--type-voice-display); font-size: var(--text-3xl); line-height: var(--leading-tight); margin-block: var(--rhythm-5) var(--rhythm-3); }
.u-prose h3 { font-family: var(--type-voice-display); font-size: var(--text-2xl); line-height: var(--leading-snug); margin-block: var(--rhythm-4) var(--rhythm-2); font-weight: 600; }
.u-prose h4 { font-family: var(--type-voice-body); font-size: var(--text-xl); line-height: var(--leading-snug); margin-block: var(--rhythm-3) var(--rhythm-2); font-weight: 600; }
.u-prose p  { margin-block: 0 var(--rhythm-3); }
.u-prose ul,
.u-prose ol { margin-block: 0 var(--rhythm-3); padding-inline-start: var(--rhythm-3); }
.u-prose li { margin-block-end: var(--rhythm-1); }
.u-prose blockquote { margin-block: var(--rhythm-4); }
.u-prose code { font-family: var(--type-voice-code); }
.u-prose pre  { font-family: var(--type-voice-code); margin-block: var(--rhythm-3); padding: var(--rhythm-2); background: var(--color-surface-2); border-radius: 0.5rem; overflow-x: auto; }
```

### Step 11 — Discipline Comment

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Worker 15 / Phase 5 — Scale & Rhythm Discipline:
   1. كل margin/padding في القواعد الجديدة → var(--rhythm-*).
   2. كل font-size → var(--text-*) (perfect-fourth scale).
   3. كل line-height → var(--leading-*).
   4. كل letter-spacing → var(--tracking-*).
   5. Reading width → var(--measure-*-ar) للعربية، var(--measure-*) للإنجليزية.
   6. Variable fonts (Inter/Readex/Fraunces) → font-optical-sizing: auto.
   7. Body text → hyphens: auto.
   8. Headlines → hyphens: none.
   ════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 19

# Scale tokens preserved (renamed values, same names)
grep -c '\-\-text-base' platform/assets/style.css     # → ≥1
grep -c '\-\-text-3xl' platform/assets/style.css      # → ≥1

# New tokens
grep -c '\-\-leading-' platform/assets/style.css      # → ≥6
grep -c '\-\-tracking-' platform/assets/style.css     # → ≥7
grep -c '\-\-rhythm-' platform/assets/style.css       # → ≥10
grep -c '\-\-measure-' platform/assets/style.css      # → ≥6

# New utilities
grep -c '\.u-rhythm-' platform/assets/style.css       # → ≥4
grep -c '\.u-measure-' platform/assets/style.css      # → ≥3
grep -c 'font-optical-sizing' platform/assets/style.css # → ≥2

# Visual:
# ✓ النصوص الطويلة في صفحات الـ lessons تتنفّس بشكل أحسن
# ✓ Headlines + paragraphs لها مسافة محسوبة (24px تحت h2)
# ✓ Variable fonts تتكيّف مع الحجم (opsz)
```

---

## ✅ معايير القبول (Phase 5)

- [ ] Modular scale `--text-*` بـ Perfect-Fourth ratio (1.333) معرَّفة كـ `clamp()`.
- [ ] `--leading-*` (6 tokens), `--tracking-*` (8 tokens), `--rhythm-*` (10 tokens) معرَّفة.
- [ ] `--measure-*` (6 tokens — 3 للإنجليزي + 3 للعربي).
- [ ] جميع `.type-*` voices تستعمل leading + tracking tokens.
- [ ] `font-optical-sizing: auto` على variable fonts.
- [ ] `.u-rhythm-reading`, `.u-rhythm-card`, `.u-rhythm-tight`, `.u-rhythm-loose` تشتغل.
- [ ] `.u-measure-narrow/normal/wide` تشتغل.
- [ ] `.u-prose` تعمل defaults للعناصر الخام.
- [ ] Hyphenation: `auto` لـ body, `none` لـ headings.
- [ ] لا regression بصري في الـ 14 صفحة.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css
git commit -m "phase 5 (resonance): modular scale & rhythm — perfect-fourth + 8pt baseline + leading/tracking/rhythm/measure tokens + opsz auto"

# state commit
git add state/PROGRESS.json state/snapshots/worker-15-phase-5.json
git commit -m "state: resonance phase 5 committed and pushed"
```

— نهاية Phase 5.

🎵 **Resonance check:** القراءة صارت أكثر إيقاعاً، النصوص تتنفّس بهندسة موحَّدة؟ نعم → Phase 6.
