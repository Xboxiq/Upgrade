# 🔡 WORKER 17 — Phase 4/6 — Typography Reduction (9 → 2)
> **اقرأ أولاً:** `prompts/v2/17_WORKER_CREATIVE_REVOLUTION.md` — قسم **Preservation Guard**.
> **يبني فوق:** Worker 17 Phases 1+2+3.
> **الفلسفة:** *الفخامة في الـ typography ليست في عدد العائلات. هي في إجادة عائلتين.*

---

## 🛡️ Preservation Contract (Phase 4)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` | **REPLACE-IN-PLACE** لـ `<link>` Google Fonts (احذف 7، أبقِ 2) + **APPEND** `<link>` for Thamanya/Tajriid + **APPEND** `<style>` blocks لـ self-hosted fonts | تعديل أي text content أو semantic markup |
| `style.css` | **REPLACE-IN-PLACE** للـ `--font-*` tokens (③) — repoint إلى الـ stack الجديد + **APPEND** font-feature-settings + line-height tweaks | تعديل أي قاعدة layout/color |
| `app.js` | لا يُلمَس | أي تعديل |

**Sacred preserved:**
- جميع `--type-voice-*` tokens من W15 P1 — تستمر، لكنها تشير للـ stack الجديد.
- جميع `.type-*` utility classes — تستمر تشتغل.
- جميع `--type-page-*` tokens من W15 P6 — تستمر.

---

## 🎯 الهدف

Phase 4 يُنفّذ "ثورة الخط":

1. **حذف 7 من 9 خطوط** المحمَّلة من Google Fonts.
2. **إبقاء فقط:**
   - **Thamanya** (display/numerals — self-hosted من `platform/assets/fonts/thmanyah/`)
   - **Tajriid** (Google Fonts — fallback لـ Thamanya إذا فشل)
   - **Arib** (body — يبحث عن self-hosted؛ إن غير متوفر → Geometria Arabic عبر Google Fonts)
   - **JetBrains Mono** (تُستبقَى — لـ `<code>` فقط)
3. **Repoint جميع `--font-*` tokens** للـ stack الجديد.
4. **`font-display: swap`** على كل @font-face.
5. **`line-height: 1.85`** على body prose، 1.65 على UI.
6. **font-feature-settings** متناسقة عبر العائلتين.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 4 PRE-FLIGHT
├─ Phase: 4/6 — Typography Reduction
├─ Estimated lines changed: ~340 (HTML <link> reduction + CSS token repoint + line-height tweaks)
├─ Files to touch:
│   ├─ platform/index.html       (REPLACE Google Fonts <link> + APPEND @font-face if needed)
│   └─ platform/assets/style.css (REPLACE --font-* tokens + line-height adjustments)
├─ Sacred verify (BEFORE):
│   ├─ grep -c 'fonts.googleapis.com' platform/index.html  → ≥1 (we expect ≥2 link tags loading 9 families)
│   ├─ ls platform/assets/fonts/thmanyah/                   → expect README.md + maybe .woff2 files
│   ├─ grep -c -- '--font-text\|--font-hero\|--font-display\|--font-numeric' platform/assets/style.css  → ≥4
│   └─ grep -c -- '--type-voice-' platform/assets/style.css → ≥9 (W15 P1)
└─ Branch: continue worker-17-creative-revolution
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Audit الخطوط الحالية في HTML

```bash
grep -nE 'fonts\.googleapis|@font-face' platform/index.html platform/assets/style.css
```

**النتيجة المتوقعة:** `<link>` واحد أو أكثر يحمّل ~9 family في `<head>` index.html. Body, Reem Kufi, Aref Ruqaa, IBM Plex Arabic, Tajawal, Cairo, Inter, JetBrains Mono, Fraunces.

### Step 2 — Inventory Self-Hosted Fonts

```bash
ls -la platform/assets/fonts/thmanyah/
cat platform/assets/fonts/thmanyah/README.md
```

**سيناريوهات:**
- لو فيه ملفات .woff2 جاهزة → استعمل @font-face مباشرة.
- لو فقط README → استعمل Google Fonts fallback لـ Tajriid، أو أرشد المستخدم لتنزيل Thamanya من مصدره الرسمي ثم وضع الـ .woff2 في المسار.

### Step 3 — استبدال `<link>` Google Fonts في `<head>`

ابحث عن block الخطوط في `<head>` واستبدله بـ:

```html
<!-- ════════════════════════════════════════════════════════════════
     RESONANCE v2 — Worker 17 / Phase 4
     Reduced from 9 families to 2 + 1 (mono).
     ════════════════════════════════════════════════════════════════ -->

<!-- Display + UI: Tajriid (Google) — fallback for Thamanya (self-hosted) -->
<link rel="preload" as="style"
      href="https://fonts.googleapis.com/css2?family=Tajriid:wght@400;500;600;700&display=swap"
      onload="this.rel='stylesheet'" />
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Tajriid:wght@400;500;600;700&display=swap"
      media="print" onload="this.media='all'" />

<!-- Body: Cairo as Geometria Arabic substitute (Geometria Arabic not on Google Fonts) -->
<link rel="preload" as="style"
      href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap"
      onload="this.rel='stylesheet'" />
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap"
      media="print" onload="this.media='all'" />

<!-- Code only: JetBrains Mono -->
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" />

<!-- Self-hosted: Thamanya (Display) — preferred over Tajriid -->
<style id="self-hosted-fonts">
@font-face {
  font-family: 'Thamanya';
  src: url('assets/fonts/thmanyah/Thamanya-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
}
@font-face {
  font-family: 'Thamanya';
  src: url('assets/fonts/thmanyah/Thamanya-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
}
/* Optional: 'Arib' if .woff2 placed in same fonts folder under arib/ */
@font-face {
  font-family: 'Arib';
  src: url('assets/fonts/arib/Arib-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
}
</style>
```

> ملاحظة: لو ملفات الـ self-hosted غير متوفرة، الـ font stack الـ fallback يكفل الانسيابية. لا flash، لا missing glyphs.

### Step 4 — Repoint CSS Font Tokens

في `:root`:

```css
:root {
  /* ③ TYPOGRAPHY TOKENS — Phase 4 reduced to 2 families + mono */

  /* Display family (H1, H2, hero, wordmark, count-up tickers) */
  --font-display:  'Thamanya', 'Tajriid', 'Reem Kufi Fun', system-ui, serif;
  --font-hero:     var(--font-display);
  --font-wordmark: var(--font-display);

  /* Body family (paragraphs, lists, prose, scenarios) */
  --font-text:     'Arib', 'Geometria Arabic', 'Cairo', system-ui, sans-serif;
  --font-ui:       var(--font-text);

  /* Numeric (tabular figures) — uses Display family tnum feature */
  --font-numeric:     'Thamanya', 'Tajriid', 'JetBrains Mono', monospace;
  --font-num-display: var(--font-numeric);

  /* Latin (when needed) — sticks to system stack */
  --font-latin:    system-ui, -apple-system, 'Segoe UI', sans-serif;

  /* Quotes — falls back to display */
  --font-quote-literary: var(--font-display);

  /* Code — JetBrains Mono retained */
  --font-mono:     'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace;
}
```

### Step 5 — Line-Height & Reading Rhythm

```css
/* ════════════════════════════════════════════════════════════════
   Worker 17 / Phase 4 — Reading rhythm tuning
   ════════════════════════════════════════════════════════════════ */

:root {
  --leading-prose: 1.85;     /* Body paragraphs — Quiet Luxury minimum */
  --leading-ui:    1.65;     /* Buttons, labels, navigation */
  --leading-display: 1.15;   /* Hero / display headings */
}

/* Apply to prose */
.u-prose,
.u-prose p,
.type-body,
.type-body-lead,
.type-body-lg {
  line-height: var(--leading-prose);
}

/* Tighten UI */
.type-button,
.type-button--lg,
.type-button--sm,
.type-tab,
.type-ui-label,
.nav-item,
.cmdk-item {
  line-height: var(--leading-ui);
}

/* Display tight */
.type-hero,
.type-hero--xl,
.type-hero--lg,
.type-hero--md,
.type-display,
.type-display-h,
.type-display-l,
h1, h2 {
  line-height: var(--leading-display);
}

/* Long scenarios / dialogues — even more breathing room */
[data-block-type="scenario"] p,
[data-block-type="case"] p {
  line-height: 1.95;
}
```

### Step 6 — Font Feature Settings

```css
/* Universal display features */
.type-hero, .type-hero--xl, .type-hero--lg, .type-hero--md,
.type-display, .type-display-h, .type-display-l,
.type-wordmark, h1, h2, h3 {
  font-feature-settings: "kern" 1, "ss01" 1, "liga" 1;
  font-optical-sizing: auto;
}

/* Tabular numerals on stat tiles, qcalc values */
.type-num,
.type-num-display,
.type-num-tabular,
.qcalc-value,
.cath-stat-value,
.bento-stat-value,
.stat-tile-value,
[data-tabular] {
  font-feature-settings: "tnum" 1, "lnum" 1, "kern" 1;
  font-variant-numeric: tabular-nums lining-nums;
}

/* Body text: smart kerning + ligatures */
body, .u-prose, .type-body, .type-body-lead {
  font-feature-settings: "kern" 1, "liga" 1;
  text-rendering: optimizeLegibility;
}
```

### Step 7 — Mobile Refinement (size + leading)

```css
@media (max-width: 480px) {
  :root {
    --leading-prose: 1.75;     /* Slightly tighter on tiny screens to save scroll */
  }

  .type-hero--xl { font-size: clamp(2.2rem, 7vw, 3rem); }
  .type-display  { font-size: clamp(1.8rem, 6vw, 2.4rem); }

  /* Body remains 1rem — no zoom-out */
}
```

### Step 8 — Deprecate Old Font Tokens (graceful)

أي variable كان في style.css من W12 P1B / W15 P3 يستعمل الخطوط المحذوفة:

```css
/* ─── Deprecated tokens — kept as aliases for backward compat ─── */
:root {
  /* W12 P1B / W15 — kept as alias to new --font-text */
  --font-arabic-body:  var(--font-text);
  --font-arabic-display: var(--font-display);
  --font-aref-ruqaa:   var(--font-display);  /* ceremonial usage points to Thamanya now */
  --font-tajawal:      var(--font-text);     /* alias */
  --font-readex-pro:   var(--font-text);     /* alias */
  --font-ibm-plex-arabic: var(--font-text);  /* alias */
  --font-reem-kufi:    var(--font-display);  /* alias */
  --font-fraunces:     var(--font-display);  /* literary now uses Thamanya */
  --font-inter:        var(--font-latin);
  --font-jetbrains-mono: var(--font-mono);
}
```

> هذي الأسماء قد تكون مرجَّعة من selectors أو في app.js — backward-compat يحفظ الموقع من الكسر.

### Step 9 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════
   Discipline Comment — Worker 17 / Phase 4
   1. Typography family count: 2 (Thamanya/Tajriid + Arib/Cairo) + 1 mono.
   2. Self-hosted fonts: Thamanya, optional Arib (in fonts/arib/ if added).
   3. Google Fonts: Tajriid + Cairo + JetBrains Mono.
   4. RETIRED: Reem Kufi, Readex Pro, IBM Plex Arabic, Aref Ruqaa, Tajawal, Inter, Fraunces.
   5. font-display: swap on all @font-face.
   6. Body line-height: 1.85 (1.95 on scenarios).
   7. Backward-compat: deprecated tokens keep aliasing.
   ════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-zA-Z]+' platform/assets/app.js | sort -u | wc -l  # → 22

# Phase 4 changes
grep -E 'family=[A-Za-z+]+' platform/index.html       # only Tajriid, Cairo, JetBrains+Mono
grep -c 'Reem Kufi\|Aref Ruqaa\|Readex Pro\|IBM Plex Arabic\|Tajawal\|Inter\|Fraunces' platform/index.html
# expected: 0 in <link> tags (still OK if mentioned in CSS comments or fallback strings)
grep -c 'Thamanya' platform/assets/style.css          # → ≥3
grep -c 'font-display: swap' platform/index.html      # → ≥3
grep -c -- '--leading-prose' platform/assets/style.css  # → ≥1

# Visual checks (manual):
# - Network tab → only 3 font families download
# - Body text on phone: comfortable, no flicker
# - H1/H2 use Thamanya (or Tajriid fallback)
# - Code blocks (programming page) use JetBrains Mono
# - Lighthouse Performance → ≥ 80 (improved from Phase 2 baseline)
```

---

## ✅ معايير القبول (Phase 4)

- [ ] فقط 3 family declarations في `<link>` (Tajriid + Cairo + JetBrains Mono).
- [ ] Self-hosted Thamanya @font-face مكتوب (works ev'n if .woff2 not yet uploaded — fallback handles it).
- [ ] جميع `--font-*` tokens repointed لـ stack جديد.
- [ ] `font-display: swap` على كل font load.
- [ ] `--leading-prose: 1.85` مُفعَّل على body.
- [ ] Backward-compat aliases مكتوبة لـ `--font-*` القديمة.
- [ ] CSS و HTML نظيفين.
- [ ] الموقع يبدو فاخراً ومتناسقاً (تباين 2 خط).
- [ ] لا flicker / FOIT (font-display: swap يضمن).
- [ ] Console: 0 errors.
- [ ] Network tab: 3 families فقط (~250KB total، was ~2.5MB).

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/index.html platform/assets/style.css
git commit -m "phase 4 (creative): typography reduction 9→2+1 — Thamanya (self-hosted) + Tajriid (Google) for display, Arib + Cairo (Google) for body, JetBrains Mono for code. Retired: Reem Kufi/Readex Pro/IBM Plex Arabic/Aref Ruqaa/Tajawal/Inter/Fraunces. font-display: swap, --leading-prose: 1.85, font-feature-settings tuned, backward-compat aliases preserved. Total font payload ~2.5MB → ~250KB."

# state
git add state/PROGRESS.json state/snapshots/worker-17-phase-4.json
git commit -m "state: creative phase 4 committed and pushed"
```

— نهاية Phase 4.

🎵 **Resonance check:** هل التيبوغرافي الآن يقول "هذا منشور تحريري"، لا "هذا dashboard"؟ نعم → انتقل لـ Phase 5.
