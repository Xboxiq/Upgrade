# 〰️ WORKER 20 — Phase 5/6 — Kashida & Rhythm
> **اقرأ أولاً:** `prompts/v3/20_WORKER_TASMEEM_RECONSTRUCTION.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Phase 4 (numeric discipline مكتملة).
> **الفلسفة:** *الخط العربي يتنفّس عبر الكشيدة — تَلويحة الأفق بين الحرف والآخر. اللاتيني يتنفّس عبر leading. لا نَبني واجهة عربية بقواعد لاتينية.*

---

## 🛡️ Preservation Contract (Phase 5)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` rules | **APPEND** كتلة `Kashida & Rhythm` (~340 سطر) في النهاية | تعديل قواعد قائمة |
| `style.css` `:root` | **APPEND** 8 rhythm tokens (`--rhythm-arabic-*`, `--kashida-*`, `--leading-*`) | تعديل tokens قائمة |
| `index.html` | **AUGMENT** فقط — إضافة `lang="ar"` على عناصر معينة + class `tas-kashida` على ≤14 عنوان كبير | تغيير DOM |
| `app.js` | لا يُلمَس | أي تعديل |

**Sacred preserved:**
- جميع 18 voice tokens (نستخدمها فقط).
- جميع W12 type scale.
- 14 page sections + 391 qcalc + 24 Upg.* APIs.

---

## 🎯 الهدف

Phase 5 يعالج 4 مشاكل بصرية في Typography العربية:

1. **Leading عربي خاطئ** — الواجهة الحالية تستعمل `line-height: 1.4` على body (مرجعية لاتينية). العربي يحتاج `1.6-1.8` لأن الحروف تطول لأعلى وأسفل (alif بسطة، nun قعدة).
2. **عدم استخدام كشيدة** — العناوين العربية الكبرى (>32px) تبدو ضيقة بدون `text-justify: kashida` أو `letter-spacing` موجَّه.
3. **word-spacing غير مضبوط** — الفراغات بين الكلمات في الجمل العربية الطويلة عشوائية.
4. **عدم استخدام `text-rendering: optimizeLegibility`** — kerning + ligatures معطَّلة في بعض الأقسام.

النتيجة:
- Body Arabic يتنفّس بـ `line-height: 1.65`.
- 14 عنوان hero يستخدم كشيدة طبيعية عبر `letter-spacing` موجَّه.
- word-spacing مضبوط لكل voice.
- Ligatures (`liga`, `dlig`, `calt`) مفعَّلة على الكل.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 5 PRE-FLIGHT (Worker 20 / TASMEEM)
├─ Phase: 5/6 — Kashida & Rhythm
├─ Estimated lines: ~460 (CSS ~360 + HTML ~14 augments)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~360 lines)
│   └─ platform/index.html         (AUGMENT lang="ar" + tas-kashida on ≤14 hero h1)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c 'lang="ar"' platform/index.html                    → 1 (root only, will grow)
│   ├─ grep -c '\-\-type-voice-' platform/assets/style.css        → ≥18
│   └─ grep -c 'line-height' platform/assets/style.css            → ≥40 (current)
├─ Branch: continue worker-20-devotio
└─ No new fonts, no new APIs.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Rhythm Tokens

في `:root`، **APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Arabic Rhythm Tokens (Worker 20 / Phase 5)
   ────────────────────────────────────────────────────────────────────────
   Arabic typography rhythm differs from Latin:
   - Body line-height: 1.6-1.8 (vs 1.4-1.5 Latin)
   - Word-spacing: tighter (Arabic ligatures already provide spacing)
   - Letter-spacing: 0 to negative (kashida fills gaps naturally)
   - Optical-size: large headings need tighter tracking
   ════════════════════════════════════════════════════════════════════════ */
:root {
  /* Leading scale (line-height) — Arabic-tuned */
  --leading-tight:    1.15;   /* h1, hero (Arabic glyphs ascenders) */
  --leading-snug:     1.30;   /* h2, h3 */
  --leading-normal:   1.50;   /* UI labels, buttons */
  --leading-relaxed:  1.65;   /* body Arabic — sweet spot */
  --leading-loose:    1.80;   /* literary Arabic (psych quotes) */
  --leading-luxe:     2.00;   /* Quranic-style ceremonial */

  /* Word-spacing per voice */
  --word-spacing-tight:    -0.02em;   /* hero (kashida fills) */
  --word-spacing-normal:    0;
  --word-spacing-loose:     0.05em;   /* readable long-form */

  /* Letter-spacing per voice (kashida policy) */
  --tracking-hero:      -0.02em;   /* tight, kashida + dlig fill */
  --tracking-display:   -0.015em;
  --tracking-body:       0;
  --tracking-ui:         0.005em;
  --tracking-eyebrow:    0.05em;   /* eyebrow needs breath */

  /* Kashida control (manual where supported) */
  --kashida-mode:       "manual";   /* future: rendering hint */
  --kashida-min-width:   8em;       /* below this, no justification */
}
```

### Step 2 — Global Body Rhythm (Arabic-First)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Body Rhythm Foundation (Worker 20 / Phase 5)
   ════════════════════════════════════════════════════════════════════════ */

/* HTML root — Arabic body discipline by default */
html[lang="ar"],
html[dir="rtl"] {
  text-rendering: optimizeLegibility;
  -webkit-font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  /* Inherit Arabic leading on body by default */
  line-height: var(--leading-relaxed);
  word-spacing: var(--word-spacing-normal);
  letter-spacing: var(--tracking-body);
}

/* Long-form Arabic paragraphs need extra breath */
.tas-voice-body,
.tas-voice-body-lead,
[data-tas-voice="body"],
[lang="ar"] p,
.h-body,
.page-body p,
.lesson-body p,
.scenario-text {
  line-height: var(--leading-relaxed);
  word-spacing: var(--word-spacing-normal);
  letter-spacing: var(--tracking-body);
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
}

/* Literary Arabic — extra breathing for psych/eq quotes */
.tas-voice-quote,
[data-tas-voice="quote"],
.h-quote,
.page-quote,
.literary-quote,
[lang="ar"].literary {
  line-height: var(--leading-loose);
  word-spacing: var(--word-spacing-loose);
  letter-spacing: var(--tracking-body);
  font-feature-settings: "kern" 1, "liga" 1, "dlig" 1, "swsh" 1;
}

/* Ceremonial — reserve for hero greetings, gateway poetry */
[data-tas-voice="ceremonial"],
.tas-voice-ceremonial,
.gateway-poetry {
  line-height: var(--leading-luxe);
  word-spacing: var(--word-spacing-loose);
  letter-spacing: 0;
  font-feature-settings: "kern" 1, "liga" 1, "dlig" 1;
}
```

### Step 3 — Heading Rhythm + Kashida-Like Tracking

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Heading Rhythm (Worker 20 / Phase 5)
   ────────────────────────────────────────────────────────────────────────
   For headings, we don't use real Kashida (browser support inconsistent).
   Instead: tight tracking + dlig + ligatures simulate calligraphic flow.
   ════════════════════════════════════════════════════════════════════════ */

/* h1 / hero — tightest tracking, dlig on */
.tas-voice-hero,
[data-tas-voice="hero"],
.h-display,
.type-hero,
[lang="ar"] h1.hero {
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-hero);
  word-spacing: var(--word-spacing-tight);
  font-feature-settings: "kern" 1, "liga" 1, "dlig" 1, "calt" 1;
}

/* h1 / display — slightly looser than hero */
.tas-voice-display,
[data-tas-voice="display"],
.h-title {
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-display);
  word-spacing: var(--word-spacing-tight);
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
}

/* h2 / display-h */
.tas-voice-display-h,
.h-section {
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-display);
  word-spacing: var(--word-spacing-normal);
}

/* UI labels — slight positive tracking */
.tas-voice-ui,
.tas-voice-label,
[data-tas-voice="ui"] {
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-ui);
  word-spacing: var(--word-spacing-normal);
}

/* Eyebrows / signatures — wider tracking */
.tas-voice-eyebrow,
.tas-voice-signature,
.tas-voice-ribbon,
.h-eyebrow {
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-eyebrow);
  word-spacing: var(--word-spacing-loose);
}
```

### Step 4 — Kashida Class (manual)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Kashida-Like Class (Worker 20 / Phase 5)
   ────────────────────────────────────────────────────────────────────────
   For headings 32px+ where text needs to fill the container width
   without word-spacing distortion. Uses text-justify + word-spacing.
   ════════════════════════════════════════════════════════════════════════ */

.tas-kashida,
[data-tas-kashida="on"] {
  text-align: justify;
  text-justify: inter-word;  /* widely supported */
  -webkit-text-justify: inter-word;
  /* Arabic-specific where supported (Firefox + Chrome 116+) */
  text-justify: kashida inter-word;
  /* Letter-spacing inherits from heading voice */
}

/* Disable kashida on small viewports — looks awkward */
@media (max-width: 480px) {
  .tas-kashida,
  [data-tas-kashida="on"] {
    text-align: start;
    text-justify: auto;
  }
}

/* Disable on lines shorter than --kashida-min-width */
@supports (text-justify: kashida) {
  .tas-kashida {
    text-justify: kashida;
    /* Browser will fall back if kashida unsupported */
  }
}
```

### Step 5 — Per-Voice Feature Settings (deepening)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Per-Voice Feature Polish (Worker 20 / Phase 5)
   ════════════════════════════════════════════════════════════════════════ */

/* Aref Ruqaa — calligraphic, needs all features */
.tas-voice-hero, .tas-voice-wordmark,
.tas-voice-eyebrow, .tas-voice-signature,
.tas-voice-ribbon, .tas-voice-accent {
  font-feature-settings:
    "kern" 1,    /* kerning */
    "liga" 1,    /* standard ligatures */
    "dlig" 1,    /* discretionary ligatures (lam-alef etc.) */
    "calt" 1,    /* contextual alternates */
    "rlig" 1,    /* required ligatures (Arabic) */
    "init" 1, "medi" 1, "fina" 1, "isol" 1;  /* Arabic positional forms */
}

/* Reem Kufi — geometric, simpler features */
.tas-voice-display, .tas-voice-display-h, .tas-voice-display-l {
  font-feature-settings:
    "kern" 1,
    "liga" 1,
    "calt" 1,
    "init" 1, "medi" 1, "fina" 1, "isol" 1;
}

/* Readex Pro / IBM Plex Arabic — body */
.tas-voice-body, .tas-voice-body-lead {
  font-feature-settings:
    "kern" 1,
    "liga" 1,
    "calt" 1,
    "init" 1, "medi" 1, "fina" 1, "isol" 1,
    "dlig" 0;  /* discretionary OFF in body for readability */
}

/* Tajawal — UI */
.tas-voice-ui, .tas-voice-label {
  font-feature-settings:
    "kern" 1,
    "liga" 1,
    "calt" 1;
}

/* Inter — Latin */
.tas-voice-latin {
  font-feature-settings:
    "kern" 1,
    "liga" 1,
    "calt" 1,
    "ss01" 1,    /* Inter alt-1: open digit shapes */
    "ss03" 1,    /* Inter alt-3: dotted-zero */
    "tnum" 0;    /* tabular off in body, on in numeric voices */
}

/* JetBrains Mono — code */
.tas-voice-code {
  font-feature-settings:
    "kern" 1,
    "liga" 1,    /* code ligatures (=> != etc.) */
    "calt" 1,
    "ss01" 0,    /* keep zero with slash */
    "zero" 1;
}

/* Fraunces — literary */
.tas-voice-quote {
  font-feature-settings:
    "kern" 1,
    "liga" 1,
    "dlig" 1,
    "swsh" 1,    /* swashes */
    "salt" 1,    /* stylistic alternates */
    "ss01" 1;
}
```

### Step 6 — Modular Scale Hardening (perfect-fourth 1.333)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Modular Scale Confirm (Worker 20 / Phase 5)
   ────────────────────────────────────────────────────────────────────────
   W12 set up --text-* tokens. Phase 5 verifies they follow perfect-fourth.
   If any drift, this block normalizes. APPEND only — no token rewrites.
   ════════════════════════════════════════════════════════════════════════ */

/* Reference scale (perfect-fourth = 1.333):
   0.5625rem · 0.75rem · 1rem · 1.333rem · 1.777rem · 2.369rem ·
   3.157rem · 4.209rem · 5.61rem
   = xs / sm / base / lg / xl / 2xl / 3xl / 4xl / 5xl
*/

/* Optical-size hint for variable fonts (Fraunces opsz, Inter opsz) */
.tas-voice-hero, .tas-voice-display, .h-display, .type-hero {
  font-variation-settings: "opsz" 96;  /* large optical size */
}

.tas-voice-display-h, .tas-voice-display-l, .h-section {
  font-variation-settings: "opsz" 24;
}

.tas-voice-body, .tas-voice-body-lead {
  font-variation-settings: "opsz" 14;
}

.tas-voice-ui, .tas-voice-label {
  font-variation-settings: "opsz" 11;
}
```

### Step 7 — AUGMENT 14 Hero Headings + lang="ar"

في `index.html`، استهدف `<h1>` داخل `header.page-h` لكل صفحة من الـ 14:

```html
<!-- قبل -->
<h1 class="type-display">لوحة التحكم</h1>

<!-- بعد -->
<h1 class="type-display tas-kashida" lang="ar">لوحة التحكم</h1>
```

> **استثناء:** الصفحات الـ literary (psych, eq, customercare) تُضيف `lang="ar"` على الفقرات أيضاً (للعمل مع `:lang(ar) p` selector).

### Step 8 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 20 / Phase 5 — Rhythm Discipline:
   1. Body Arabic → line-height 1.65 (sweet spot — تجربة مع الـ leading-luxe لـ literary).
   2. Hero/display → tight tracking (-0.02em) + dlig على.
   3. .tas-kashida فقط على عناوين 32px+ في sections عريضة.
   4. لا تُغيّر leading لـ qcalc-value (الأرقام لا تحتاج breathing).
   5. font-feature-settings "init/medi/fina/isol" على كل Arabic voice.
   6. opsz variation على variable fonts فقط (Fraunces, Inter).
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c 'qcalc' platform/index.html                                # → 391
grep -c '<section class="page"' platform/index.html               # → 14+

# New tokens
grep -c "\-\-leading-" platform/assets/style.css                  # → ≥6
grep -c "\-\-tracking-" platform/assets/style.css                 # → ≥5
grep -c "\-\-word-spacing-" platform/assets/style.css             # → ≥3

# Augments
grep -c 'tas-kashida' platform/index.html                         # → ≥14 (hero h1s)
grep -c 'lang="ar"' platform/index.html                           # → ≥14 (hero h1s + literary)

# Browser test:
# Open dashboard → h1 "لوحة التحكم" → kerning + dlig visible
# Open psych → quote paragraph → leading-luxe breathing
# Open accounting → qcalc → tabular, tight, no rhythm change
```

---

## ✅ معايير القبول (Phase 5)

- [ ] 8 rhythm tokens (`--leading-*`, `--tracking-*`, `--word-spacing-*`) معرَّفة.
- [ ] جميع `body` Arabic لها `line-height: 1.65` (relaxed).
- [ ] جميع `.tas-voice-quote` لها `line-height: 1.80` (loose).
- [ ] جميع `.tas-voice-hero` لها `letter-spacing: -0.02em` + `dlig`.
- [ ] `.tas-kashida` class يُطبَّق على ≥14 hero h1.
- [ ] `lang="ar"` معرَّف على ≥14 عنوان (للـ `:lang(ar)` selector).
- [ ] `text-rendering: optimizeLegibility` فعّال على html[lang="ar"].
- [ ] جميع per-voice feature settings مفعَّلة (kern, liga, dlig, calt, init/medi/fina/isol).
- [ ] qcalc rhythm لم يتغيّر (الأرقام تحافظ على discipline من Phase 4).
- [ ] Console: 0 errors.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/style.css platform/index.html
git commit -m "phase 5 (devotio): kashida & rhythm — 8 tokens, arabic-first leading 1.65, kashida on 14 hero h1, per-voice features"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-20-phase-5.json
git commit -m "state: devotio phase 5 committed and pushed"
# push immediately
```

— نهاية Phase 5.

🕯️ **Devotion check:** هل النص العربي يتنفّس بـ leading 1.65؟ هل العناوين الكبرى تستعمل dlig + tight tracking؟ → انتقل لـ Phase 6 (Per-Page Type Signature).
