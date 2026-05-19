# 👑 WORKER 15 — Phase 2/6 — Arabic Display Crown
> **اقرأ أولاً:** `prompts/v2/15_WORKER_TYPOGRAPHY_SOUL.md` — Preservation Guard.
> **يبني فوق:** Phase 1 (voice tokens + utilities skeleton).
> **الفلسفة:** *العنوان يُتوَّج، لا يُكتب. Aref Ruqaa للعرش، Reem Kufi للقاعدة، Cairo Bold للحماية.*

---

## 🛡️ Preservation Contract (Phase 2)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` Google Fonts `<link>` | **AUGMENT URL** — إضافة Aref Ruqaa أوزان أكثر (400 + 700) + Reem Kufi (400; 500; 600; 700) — يبقى Cairo + Readex Pro + IBM Plex Arabic كما هم | حذف Cairo، تغيير preconnect URLs، إزالة `display=swap` |
| `style.css` `:root` | **REPLACE-IN-PLACE** قيم `--font-display` و `--font-accent` (إعادة ترتيب stack مع Aref Ruqaa Bold أولاً للـ display، Reem Kufi 800 fallback، Cairo Bold كآخر ضامن) | حذف Cairo من أي stack |
| `style.css` rules | **APPEND** قواعد جديدة لـ `.type-hero`, `.type-display`, `.type-display-h` (تحديث specs من Phase 1) + `.type-wordmark` جديد + 4 utility variants للـ display (heavy/bold/medium/light) | تعديل `.h-display` / `.h-title` / `.h-section` من W12 P1B |
| `index.html` | **AUGMENT** wordmark في gateway + sidebar + page-h1 على ≤14 صفحة | تغيير النصوص الفعلية للعناوين |

**Sacred preserved:**
- `--font-display` token name لا يتغيّر (فقط القيمة).
- جميع `.h-display` classes من W12 P1B تشتغل (نضيف `.type-hero` بجانبها، لا نحذفها).
- 14 page sections + 391 qcalc.

---

## 🎯 الهدف

**Aref Ruqaa** اختير في Worker 12 P1B كـ **accent** فقط. لكنه يصلح للـ **display ceremonial** أيضاً (wordmark, hero greetings) لو وُسِّع لوزن Bold (700).

Phase 2 يفعل:

1. **توسيع Aref Ruqaa** ليشمل وزن 700 (لـ wordmark).
2. **تعزيز Reem Kufi stack** بأوزان متدرّجة (400/500/600/700).
3. **إعادة ترتيب `--font-display` stack** ليبدأ بـ Aref Ruqaa للـ wordmark، ثم Reem Kufi للـ h1/h2.
4. **إنشاء `.type-wordmark`** class مخصّص للـ "Upgrade" wordmark.
5. **تحديث `.type-hero` و `.type-display` و `.type-display-h`** بـ specs أعمق (font-feature-settings للـ kerning + ligatures).
6. **AUGMENT 14 page-h1** — كل صفحة تحصل على `class="type-display"` بجانب `.h-display` الموجودة.

النتيجة المرئية:
- Wordmark "Upgrade" في gateway + sidebar = Aref Ruqaa Bold (شاعري، فاخر، عربي خالص).
- Page-h1 (مثل "لوحة التحكم"، "الكول سنتر") = Reem Kufi 700 (هندسي، صلب، modern).
- صفحات psych/eq/customercare hero = Aref Ruqaa Bold (literary opening).
- بقية الصفحات h1 = Reem Kufi 700 (operational).

---

## 📋 PRE-FLIGHT

```
📋 PHASE 2 PRE-FLIGHT
├─ Phase: 2/6 — Arabic Display Crown
├─ Estimated lines: ~420
├─ Files to touch:
│   ├─ platform/index.html         (UPDATE Google Fonts <link> URL + AUGMENT 14 page-h1 + 1 wordmark)
│   └─ platform/assets/style.css   (REPLACE --font-display value + APPEND ~340 lines)
├─ Sacred verify:
│   ├─ grep -c '<section class="page"'           → 14
│   ├─ grep -c 'qcalc'                            → 391
│   ├─ grep -c "Cairo" platform/assets/style.css  → ≥3 (preserved)
│   └─ grep -c "Aref Ruqaa" platform/assets/style.css → ≥1 (preserved)
├─ Branch: continue worker-15-resonance
└─ New fonts loaded: Aref Ruqaa 700 + Reem Kufi 400/500/600 added to existing 700
```

---

## 🧱 خطوات التنفيذ

### Step 1 — تحديث Google Fonts `<link>` في index.html

ابحث في `platform/index.html` عن السطر الحالي:

```html
<link href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&family=Readex+Pro:wght@200..700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Aref+Ruqaa:wght@400;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
```

> **ملاحظة:** الـ link الحالي من W12 P1B **بالفعل** يضمّ Aref Ruqaa 400+700 + Reem Kufi 400/500/600/700. **Phase 2 يتأكّد فقط أن الـ link محدَّث**. لو تغيّر، أعِد التأكّد من توفر هذي الأوزان.

تحقّق:
```bash
grep "Aref+Ruqaa:wght@400;700" platform/index.html  # → match expected
grep "Reem+Kufi:wght@400;500;600;700" platform/index.html  # → match expected
```

لو ناقص، **REPLACE-IN-PLACE** بنفس السطر أعلاه.

### Step 2 — إعادة ترتيب `--font-display` و `--font-accent`

في `style.css`، ابحث عن `--font-display:` في الـ `:root` العام (~ line 105 من W12 P1B). الـ stack الحالي:

```css
--font-display: "Thmanyah", "Reem Kufi", "Cairo", ...;
```

**REPLACE-IN-PLACE** بـ:

```css
/* ─── RESONANCE v2 — Display stack reorder (Worker 15 / Phase 2) ─── */
/* Aref Ruqaa 700 = wordmark/hero ceremonial */
/* Reem Kufi 700 = page h1/h2 operational */
/* Thmanyah optional preempts both if loaded */
--font-display:    "Thmanyah", "Reem Kufi", "Aref Ruqaa", "Cairo",
                   "SF Arabic", -apple-system, BlinkMacSystemFont, "Segoe UI",
                   Roboto, sans-serif;

/* Wordmark-specific stack — Aref Ruqaa أولاً */
--font-wordmark:   "Aref Ruqaa", "Thmanyah", "Reem Kufi", "Cairo",
                   "SF Arabic", -apple-system, BlinkMacSystemFont, "Segoe UI",
                   Roboto, sans-serif;

/* Hero ceremonial — للـ greetings + onboarding */
--font-hero:       "Aref Ruqaa", "Thmanyah", "Reem Kufi", "Cairo",
                   "SF Arabic", serif;

/* --font-accent يبقى كما هو من W12 P1B */
```

### Step 3 — تحديث Voice Token Aliases

ابحث عن voice tokens من Phase 1 (`--type-voice-hero`, `--type-voice-display`). **APPEND** override بعدهم:

```css
/* RESONANCE v2 — Voice token reroute (Worker 15 / Phase 2) */
:root {
  --type-voice-hero:        var(--font-hero);       /* was --font-display */
  --type-voice-display:     var(--font-display);    /* unchanged */
  --type-voice-wordmark:    var(--font-wordmark);   /* new */
}
```

### Step 4 — Display Utilities (تحديث + إضافة)

**APPEND** بعد voice tokens:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Arabic Display Crown (Worker 15 / Phase 2)
   Hero, Display, Wordmark — توسيع لقواعد Phase 1.
   ════════════════════════════════════════════════════════════════ */

/* TYPE HERO — for ceremonial openings: gateway, hero greetings */
.type-hero,
[data-type-voice="hero"] {
  font-family: var(--type-voice-hero);
  font-weight: 700;                    /* Aref Ruqaa Bold */
  font-feature-settings: "kern" 1, "liga" 1, "dlig" 1;
  letter-spacing: -0.01em;
  line-height: 1.1;
  /* Aref Ruqaa ascenders بارزة — نُعطي padding */
  padding-block: 0.05em;
}

.type-hero--xl {
  font-size: clamp(2.5rem, 5vw, 4rem);
}

.type-hero--lg {
  font-size: clamp(2rem, 4vw, 3rem);
}

/* TYPE DISPLAY — h1/h2 page sections */
.type-display,
[data-type-voice="display"] {
  font-family: var(--type-voice-display);
  font-weight: 700;
  font-feature-settings: "kern" 1, "liga" 1;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.type-display-h {
  font-family: var(--type-voice-display);
  font-weight: 600;
  letter-spacing: -0.012em;
  line-height: 1.2;
}

.type-display-l {
  font-family: var(--type-voice-display);
  font-weight: 500;
  letter-spacing: -0.005em;
  line-height: 1.25;
}

/* TYPE WORDMARK — exclusive for "Upgrade" brand mark */
.type-wordmark,
[data-type-voice="wordmark"] {
  font-family: var(--type-voice-wordmark);
  font-weight: 700;
  font-feature-settings: "kern" 1, "liga" 1, "dlig" 1;
  letter-spacing: -0.005em;
  line-height: 1.0;
  /* تكبير 5% لأن Aref Ruqaa يبدو أصغر بصرياً من إخوانه */
  font-size: 1.05em;
}

/* TYPE WEIGHT VARIANTS — للـ display family */
.type-weight-heavy   { font-weight: 800; }
.type-weight-bold    { font-weight: 700; }
.type-weight-semibold{ font-weight: 600; }
.type-weight-medium  { font-weight: 500; }
.type-weight-regular { font-weight: 400; }
```

### Step 5 — AUGMENT Wordmark + Hero Greeting

في `index.html`:

#### 5.1 — Wordmark في Gateway

ابحث عن `.gateway-wordmark`. AUGMENT (أضف class):

```html
<!-- قبل: -->
<span class="gateway-wordmark u-font-accent">Upgrade</span>

<!-- بعد: -->
<span class="gateway-wordmark type-wordmark">Upgrade</span>
```

#### 5.2 — Wordmark في Sidebar

ابحث عن `sidebar-logo` أو ما يشبهها. AUGMENT بنفس الطريقة:

```html
<span class="sidebar-logo type-wordmark">Upgrade</span>
```

#### 5.3 — Hero Greeting في Dashboard

ابحث عن `data-greet-title` (من W12 P5 / W13 P1). AUGMENT:

```html
<h1 ... data-greet-title class="bento-greet-title type-hero type-hero--lg">
  أهلاً ...
</h1>
```

### Step 6 — AUGMENT 14 Page H1s

ابحث في `index.html` عن كل `<header class="page-h">` (14 instance من W14 Phase 2). على كل `<h1>` داخل page-h، AUGMENT:

```html
<!-- قبل: -->
<h1>...</h1>

<!-- بعد: -->
<h1 class="type-display">...</h1>
```

> **استثناء:** الصفحات الـ literary (psych, eq, customercare) تأخذ `class="type-hero"` بدلاً من `type-display`:

```html
<!-- في psych, eq, customercare فقط: -->
<h1 class="type-hero">...</h1>
```

### Step 7 — Aref Ruqaa Refinement (ضبط دقيق)

**APPEND** قواعد ضبط لـ Aref Ruqaa:

```css
/* ════════════════════════════════════════════════════════════════
   Aref Ruqaa Micro-tuning — refine per-context behavior.
   Aref Ruqaa is calligraphic — needs vertical breathing room.
   ════════════════════════════════════════════════════════════════ */

/* استخدام Aref Ruqaa في الـ wordmark + hero فقط — لا نخلطه في h2/h3 */
.type-wordmark,
.type-hero {
  /* Aref Ruqaa baseline يقع أعلى قليلاً — تعديل bottom padding */
  padding-block-end: 0.1em;
}

/* في dark theme، Aref Ruqaa يحتاج weight أعلى قليلاً */
:root[data-theme="dark"] .type-hero,
:root[data-theme="dark"] .type-wordmark {
  font-weight: 700;
  /* خط أعمق ضد الخلفية الداكنة */
}

/* في light theme، يحتاج tracking أكثر للوضوح */
:root[data-theme="light"] .type-hero,
:root[data-theme="light"] .type-wordmark {
  letter-spacing: -0.005em;
}

/* Aref Ruqaa لا يدعم italic — منع الإصابة بـ inheritance */
.type-hero,
.type-wordmark,
.type-eyebrow,
.type-signature,
.type-ribbon {
  font-style: normal !important;
}
```

### Step 8 — Reem Kufi Refinement (للـ display)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Reem Kufi Micro-tuning — geometric sans for h1/h2.
   Reem Kufi works best 18px+ with tight tracking.
   ════════════════════════════════════════════════════════════════ */

/* Reem Kufi في حجم >32px يحتاج tracking ضيق */
.type-display,
.h-display {
  /* لو size كبير، نضيق التتبع تلقائياً */
  letter-spacing: clamp(-0.025em, -0.02em, -0.015em);
}

/* Reem Kufi لا يبدو جيد في حجم >5xl — نُحدِّد الحد */
.type-display {
  font-size: clamp(1.5rem, 3vw, 3.5rem);
  /* أكبر من ذلك → استعمل .type-hero بدل .type-display */
}

/* Reem Kufi medium weight (500) للـ subtitles */
.type-display-l {
  font-feature-settings: "kern" 1;
  /* خفّ الـ tracking */
  letter-spacing: -0.005em;
}
```

### Step 9 — Wordmark Hover State (تفصيل صغير)

**APPEND**:

```css
/* Wordmark على hover — pulse صغير (Worker 16 سيُعمّقها) */
.type-wordmark {
  transition: letter-spacing var(--duration-base, 240ms) var(--ease-spring, ease-out);
}
.type-wordmark:hover {
  letter-spacing: 0.01em;  /* ينفتح قليلاً عند الـ hover */
}
```

### Step 10 — Discipline Comment (تحديث)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Worker 15 / Phase 2 — Display Discipline:
   1. Aref Ruqaa exclusive: wordmark + hero + accent (eyebrow/signature/ribbon).
      لا تستعمله لـ h2/h3/body.
   2. Reem Kufi exclusive: page h1/h2 (display).
      لا تستعمله لـ wordmark أو hero ceremonial.
   3. Cairo Bold للـ fallback آخر مع باقي الخطوط.
   4. لا italic على Aref Ruqaa أو Reem Kufi.
   5. Aref Ruqaa حجمه يبدو أصغر — كبّر 5% عند المقارنة بـ Reem Kufi.
   6. لا تستعمل --font-display مباشرة لـ wordmark — استعمل --font-wordmark.
   ════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 19
grep -c 'Cairo' platform/assets/style.css            # → ≥3 (preserved)

# New additions
grep -c '\-\-font-wordmark' platform/assets/style.css  # → ≥2
grep -c '\.type-wordmark' platform/assets/style.css    # → ≥2
grep -c '\.type-hero' platform/assets/style.css        # → ≥3
grep -c 'type-display' platform/index.html             # → ≥11 (page h1s)
grep -c 'type-hero' platform/index.html                # → ≥3 (psych/eq/customercare + dashboard greeting)
grep -c 'type-wordmark' platform/index.html            # → ≥2 (gateway + sidebar)

# Visual check:
# ✓ Open gateway → wordmark "Upgrade" يبدو فاخر بـ Aref Ruqaa Bold
# ✓ Open dashboard → greeting يستعمل Aref Ruqaa
# ✓ Open page-callcenter → h1 يستعمل Reem Kufi 700
# ✓ Open page-psych → h1 يستعمل Aref Ruqaa Bold
```

---

## ✅ معايير القبول (Phase 2)

- [ ] `--font-wordmark` و `--font-hero` معرَّفان.
- [ ] `--type-voice-wordmark` معرَّف.
- [ ] `.type-wordmark`, `.type-hero`, `.type-hero--xl`, `.type-hero--lg`, `.type-display`, `.type-display-h`, `.type-display-l` كلها تشتغل.
- [ ] Wordmark في gateway + sidebar = Aref Ruqaa Bold بصرياً.
- [ ] 14 page-h1 تحمل `class="type-display"` (أو `type-hero` للـ literary).
- [ ] Dashboard greeting يستعمل Aref Ruqaa.
- [ ] Cairo + Reem Kufi + Readex Pro + IBM Plex Arabic + Aref Ruqaa: كلها تشتغل.
- [ ] `.h-display`, `.h-title`, `.h-section` من W12 P1B تشتغل بدون كسر.
- [ ] Console: 0 errors. لا regression بصري.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css platform/index.html
git commit -m "phase 2 (resonance): arabic display crown — wordmark Aref Ruqaa + 14 page-h1 type-display + hero ceremonial"

# state commit
# update PROGRESS.json: current.phase=2, next_action="Phase 3 — Arabic Body"
git add state/PROGRESS.json state/snapshots/worker-15-phase-2.json
git commit -m "state: resonance phase 2 committed and pushed"
```

— نهاية Phase 2.

🎵 **Resonance check:** الـ wordmark صار "يحكي" بصوت كلاسيكي عربي؟ نعم → Phase 3.
