# 🅰️ WORKER 12 — Phase 1B/8 — Typeface Soul (Premium Arabic Stack)
> **يُنفّذ مباشرة بعد:** Phase 1 (Type scale + spacing).
> **اقرأ أولاً:** `prompts/12_WORKER_AURORA_APPLE_GRADE.md` — قسم **Preservation Guard** (إجباري).
> **الفلسفة:** الـ Type Scale لا قيمة لها لو الخط نفسه عادي. هذا الـ phase **لا يحذف Cairo**، يضيف فوقه 4 خطوط جديدة بحيث Cairo يصير fallback ضامن، والخطوط الجديدة هي الـ primary voice.

---

## 🛡️ Preservation Contract (Phase 1B)

| العملية | المسموح | الممنوع |
|---|---|---|
| `platform/index.html` | **استبدال سطر واحد** فقط: `<link href="...Cairo...">` بـ link جديد يحوي **Cairo + الخطوط الـ4 الجديدة** | حذف Cairo نهائياً. حذف preconnect. تعديل أي شيء غير الـ link |
| `platform/assets/style.css` | **تعديل قيم** `--font-display`, `--font-text`, `--font-numeric` (إضافة الخطوط الجديدة في **بداية** الـ stack، Cairo يبقى في الذيل). **APPEND** قواعد voice-bindings جديدة | تعديل أي قاعدة CSS قديمة في القسم القديم. حذف أي token من Phase 1 |
| `platform/assets/fonts/thmanyah/` | **إنشاء** المجلد + إضافة @font-face declarations (يفشلون صامتاً لو الملفات غير موجودة) | جعل تحميل Thmanyah إلزامياً — لازم يكون optional |

**Sacred preserved:**
- Cairo يبقى في كل font-family stack كـ آخر fallback.
- `--font-mono` يبقى كما هو (لا نلمس monospace).
- كل العناصر اللي تستعمل `font-family: inherit` (الافتراضي) لا تتأثر مباشرة — ترث من body اللي يستعمل `--font-text` المحدّث.

---

## 🎯 الهدف

نُحوّل المنصة من "خط واحد لكل شيء" إلى **نظام صوتي طبقي** على نمط Apple (SF Pro Display / SF Pro Text / NY Serif). أربعة أصوات عربية:

| الدور | الخط الجديد | يستبدل |
|---|---|---|
| 🅓 **Display** (هيرو، عناوين كبيرة، wordmark) | **Reem Kufi** (Kufi حديث) | Cairo Bold |
| 🅣 **Text** (body، UI، paragraph) | **Readex Pro** (Variable, screen-optimized) | Cairo Regular |
| 🅝 **Numeric** (إحصائيات، حاسبات، أرقام) | **IBM Plex Sans Arabic** (tabular نقي) | Cairo numerals |
| 🅐 **Accent** (eyebrow، quotes، signature) | **Aref Ruqaa** (خط الرقعة الكلاسيكي) | — جديد كلياً |
| 🅓+ **Premium Display** (اختياري) | **Thmanyah** (self-hosted، فاخر جداً) | يستبدل Reem Kufi لو وُفّر |

---

## 🧪 لماذا هذه الأربعة بالذات؟

### Reem Kufi — للعناوين
- Kufi حديث **بحس Apple-grade**: حواف نظيفة، تركيب هندسي، يحتفظ بالروح العربية.
- 4 أوزان (400/500/600/700) — كافي لـ display hierarchy.
- متوفر على Google Fonts بـ subsetting عربي أصيل.
- يتنفّس في الأحجام الكبيرة (>32px) — هذا بالضبط ما نحتاجه في hero و bento titles.

### Readex Pro — للنص
- Variable font — وزن واحد يكفي (يتدرّج 200..700).
- مُصمَّم خصيصاً للقراءة الشاشية بالعربية والإنجليزية معاً (ARLatin pair).
- contrast منخفض — يعني ما يتعب العين على الفقرات الطويلة.
- يحتفظ على وضوحه في 14px (UI labels) — نقطة فشل Cairo.

### IBM Plex Sans Arabic — للأرقام
- **أفضل tabular numerals عربية متوفرة مجاناً** بدون منازع.
- الـ digits لها نفس العرض (1 و 0 و 8) — مهم جداً للحاسبات الـ8 و الـ count-up tickers.
- ينسجم مع Plex Sans الإنجليزي → الأرقام المختلطة LTR/RTL تبدو متجانسة.

### Aref Ruqaa — للروح
- خط الرقعة الكلاسيكي بنفَس عربي خالص.
- نستعمله **بحذر شديد** (≤ 5% من النص) في:
  - wordmark "Upgrade" داخل الـ gateway
  - hero eyebrows ("لوحة التحكم"، "وحدة المبيعات")
  - quotes/citations في صفحات psychology و EQ
  - signature تحت كل cheat-sheet
- خط Aref Ruqaa الحديث (وليس القديم Aref Ruqaa Ink) لأنه نظيف أكثر للويب.

### Thmanyah — Premium Optional
- خط شركة ثمانية (سعودية، Open Source / SIL OFL).
- فاخر جداً، حروف ذات شخصية. لكن يتطلّب **self-hosting** (ليس على Google Fonts).
- نضعه كـ **upgrade path**: لو الملفات وُفّرت في `platform/assets/fonts/thmanyah/`، تُستعمل تلقائياً بدلاً من Reem Kufi.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 1B PRE-FLIGHT
├─ Phase: 1B/8 — Typeface Soul
├─ Estimated lines: ~480
├─ Files to touch:
│   ├─ platform/index.html               (تحديث link to fonts — استبدال Cairo بالـ stack الجديد)
│   ├─ platform/assets/style.css         (تحديث --font-display/text/numeric/accent + utilities + @font-face لـ Thmanyah)
│   └─ platform/assets/fonts/            (مجلد جديد — ضع ملفات Thmanyah هنا لو متوفرة)
├─ Sections preserved: Type scale & weights & spacing من Phase 1 — ما تتغير قيمها، فقط الـ family.
├─ Branch: continue worker-12-aurora.
└─ Cairo backward-compat: يُحتفظ به في الـ fallback stack.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — تحديث `<head>` font loading

ابحث في `platform/index.html` عن سطر تحميل Google Fonts من Phase 1، واستبدله بـ:

```html
<!-- Premium Arabic Font Stack (Worker 12 / Phase 1B — AURORA Typeface Soul) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&family=Readex+Pro:wght@200..700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Aref+Ruqaa:wght@400;700&family=Cairo:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
```

> **ملاحظة:** أبقينا Cairo كـ **fallback ضامن** بثلاثة أوزان فقط (تخفيف الـ payload) لو فشل تحميل أي خط من الجدد.

### Step 2 — Token Override للـ font families

في `style.css`، ابحث عن قسم Phase 1 الذي عرّف `--font-display` و `--font-text` و `--font-numeric` (السطر اللي يبدأ بـ `/* Font families */`). **استبدل القيم** بـ:

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Premium Arabic Typeface Stack (Worker 12 / Phase 1B)
   Voice mapping:
     display  → Reem Kufi (Kufi geometric, Apple-grade hero)
     text     → Readex Pro (variable, screen-optimized body)
     numeric  → IBM Plex Sans Arabic (tabular nums)
     accent   → Aref Ruqaa (Ruq'ah calligraphic for soul)
   Thmanyah optional self-host (Step 4) — preempts Reem Kufi if loaded.
   ═══════════════════════════════════════════════════════════════ */
:root {
  --font-display: "Thmanyah", "Reem Kufi", "Cairo",
                  "SF Arabic", -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Roboto, sans-serif;

  --font-text:    "Readex Pro", "IBM Plex Sans Arabic", "Cairo",
                  "SF Arabic", -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Roboto, sans-serif;

  --font-numeric: "IBM Plex Sans Arabic", "Readex Pro", "Cairo",
                  ui-monospace, "SF Mono", monospace;

  --font-accent:  "Aref Ruqaa", "Amiri", "Cairo",
                  "Times New Roman", serif;

  --font-mono:    "JetBrains Mono", "SF Mono", ui-monospace,
                  "Cascadia Mono", "Fira Code", Menlo, Consolas, monospace;
}
```

### Step 3 — Default Family ↔ Surface Override

اضمن أن body يستعمل text family، وليس display:
```css
html { font-family: var(--font-text); }
body { font-family: var(--font-text); }
```

ثم القواعد التالية لربط الصوت بالعناصر السيمانتية:
```css
/* ═══════════════════════════════════════════════════════════════
   Voice Bindings — كل عنصر يأخذ صوته الصحيح.
   ═══════════════════════════════════════════════════════════════ */

/* Display voice — العناوين الكبيرة + الـ wordmark + hero */
.h-display,
.h-title,
.gateway-headline,
.gateway-wordmark,
.bento-greet h1,
.page-header h1,
h1, h2 {
  font-family: var(--font-display);
  /* Reem Kufi يفضّل tracking أقل قليلاً مع وزن 600+ */
  letter-spacing: var(--tracking-tight);
}

/* Section voice — h3/h4 + card titles (يبقى text-family لأنه أنظف للحجم المتوسط) */
.h-section,
.h-card,
h3, h4 {
  font-family: var(--font-text);
  font-weight: var(--weight-semibold);
}

/* Numeric voice — كل ما يعرض أرقاماً */
.u-num,
.cath-stat-value,
.qcalc-value,
.stat-tile-value,
[data-cath-stat],
[data-tabular],
[data-countup] {
  font-family: var(--font-numeric);
  font-variant-numeric: tabular-nums lining-nums;
  font-feature-settings: "tnum" 1, "lnum" 1, "kern" 1;
  /* IBM Plex Arabic أرقامه أنحف قليلاً — رفع وزن العرض */
  font-weight: var(--weight-semibold);
}

/* Accent voice — الـ eyebrow و القلب الكلاسيكي */
.h-eyebrow,
.gateway-tagline,
.h-quote,
.h-signature,
.font-accent {
  font-family: var(--font-accent);
  /* Aref Ruqaa فيه ascenders كبيرة — نزيد الـ leading */
  line-height: var(--leading-relaxed);
  /* وweight افتراضي 400 — 700 يصير "ثقيل" زيادة */
  font-weight: var(--weight-regular);
}

/* Mono voice */
.h-mono,
.font-mono,
code, kbd, pre {
  font-family: var(--font-mono);
}
```

### Step 4 — Thmanyah Self-Hosting (اختياري لكن موصى به)

أنشئ مجلداً جديداً: `platform/assets/fonts/thmanyah/` وضع فيه ملفات الـ woff2 (4 أوزان: 400/500/700/900).

> **مصدر الخط:** الموقع الرسمي لشركة ثمانية يوزّع الخط مجاناً لأغراض التصميم (تحقق من الترخيص الحالي قبل الاستخدام التجاري). الترخيص SIL OFL في الإصدارات الحديثة.

أضف في أول `style.css` (قبل أي قاعدة أخرى):

```css
/* ═══════════════════════════════════════════════════════════════
   Thmanyah Premium (self-hosted) — Worker 12 / Phase 1B
   Place .woff2 files in /platform/assets/fonts/thmanyah/
   If files are absent, browser silently falls back to Reem Kufi.
   ═══════════════════════════════════════════════════════════════ */
@font-face {
  font-family: "Thmanyah";
  src: url("./fonts/thmanyah/Thmanyah-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF, U+0020-007E;
}
@font-face {
  font-family: "Thmanyah";
  src: url("./fonts/thmanyah/Thmanyah-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF, U+0020-007E;
}
@font-face {
  font-family: "Thmanyah";
  src: url("./fonts/thmanyah/Thmanyah-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF, U+0020-007E;
}
@font-face {
  font-family: "Thmanyah";
  src: url("./fonts/thmanyah/Thmanyah-Black.woff2") format("woff2");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF, U+0020-007E;
}
```

> **سلوك Graceful:** لو ملفات Thmanyah غير موجودة، المتصفح يفشل صامتاً (بدون 404 banner) لأن `--font-display` يقفز للقيمة التالية: Reem Kufi.

### Step 5 — Voice-Specific Tweaks

كل خط له شخصية تتطلّب تعديل بسيط ليبدو في أحسن صورة:

```css
/* ═══════════════════════════════════════════════════════════════
   Per-typeface micro-adjustments — لكل صوت ضبطه.
   ═══════════════════════════════════════════════════════════════ */

/* Reem Kufi — يحتاج tracking أضيق + weight أعلى للأحجام الصغيرة */
.h-display { font-weight: var(--weight-heavy); letter-spacing: var(--tracking-tighter); }
.h-title   { font-weight: var(--weight-bold);  letter-spacing: var(--tracking-tight); }

/* Readex Pro variable — يحب optical-size عبر "wght" axis */
body, .u-prose p {
  font-variation-settings: "wght" 400;
}
.u-prose strong { font-variation-settings: "wght" 600; }
.h-card         { font-variation-settings: "wght" 600; }

/* IBM Plex Sans Arabic numerals — أرقامه نحيفة، نرفع contrast */
.u-num, .stat-tile-value { font-feature-settings: "tnum" 1, "lnum" 1, "ss01" 1; }

/* Aref Ruqaa accent — يحتاج padding عمودي أعلى لأن descenders/ascenders بارزة */
.h-eyebrow,
.gateway-tagline,
.h-quote {
  padding-block: 0.15em;
  /* تكبير الحجم 7%-12% لأن Aref Ruqaa يبدو أصغر من إخوانه */
  font-size: 1.08em;
}

/* Quotes utility — للاستشهادات في صفحات الـ psychology و EQ */
.h-quote {
  font-family: var(--font-accent);
  font-size: var(--text-xl);
  line-height: var(--leading-relaxed);
  color: var(--color-text-muted);
  border-inline-start: 3px solid var(--color-tint, var(--color-brand));
  padding-inline-start: var(--space-4);
  margin-block: var(--space-5);
}
.h-quote::before { content: "“"; color: var(--color-tint, var(--color-brand)); font-size: 1.4em; vertical-align: -0.15em; margin-inline-end: 0.1em; }
.h-quote::after  { content: "”"; color: var(--color-tint, var(--color-brand)); font-size: 1.4em; vertical-align: -0.15em; margin-inline-start: 0.1em; }

/* Signature — تحت كل cheat-sheet أو بطاقة شرف */
.h-signature {
  font-family: var(--font-accent);
  font-size: var(--text-base);
  color: var(--color-text-faint);
  text-align: end;
  margin-top: var(--space-4);
}
```

### Step 6 — Brand Wordmark "Upgrade"

ابحث في `index.html` عن `gateway-wordmark` و `sidebar-logo`. حدّث الـ HTML:

```html
<!-- في gateway -->
<span class="gateway-wordmark u-font-accent">Upgrade</span>
```

CSS:
```css
.gateway-wordmark,
.u-font-display { font-family: var(--font-display); font-weight: var(--weight-heavy); }
.u-font-accent  { font-family: var(--font-accent); }
.u-font-text    { font-family: var(--font-text);    }
.u-font-numeric { font-family: var(--font-numeric); font-variant-numeric: tabular-nums; }
.u-font-mono    { font-family: var(--font-mono);    }
```

> **ملاحظة:** الـ "Upgrade" wordmark Latin، لكن Aref Ruqaa يحوي حروف Latin بسيطة بنفس روح الرقعة. لو ما عجبك في التطبيق، استعمل `var(--font-display)` للـ wordmark وابقي Aref Ruqaa للنصوص العربية الـaccent فقط.

### Step 7 — اختبار + قواعد ذهبية

اختبر كل واحد بصرياً على:
1. **gateway-headline** = Reem Kufi/Thmanyah (يجب يبدو premium، حواف هندسية).
2. **page-dashboard h1** بعد Phase 5 = نفس Reem Kufi/Thmanyah.
3. **stat-tile-value** = IBM Plex Arabic — أرقامه يجب تكون متساوية العرض.
4. **gateway-tagline** = Aref Ruqaa — يبدو "كأنه مكتوب بالقلم".
5. **body paragraphs** = Readex Pro — أوضح من Cairo بنسبة محسوسة.

### Step 8 — قاعدة الذوق (دستور الـ AI لاحقاً)

أضف هذي القواعد كـ comments في style.css ليلتزم بها AUTO_PILOT في الـ phases التالية:

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA Typeface Discipline — القواعد الذهبية (المنفّذ يلتزم):
   1. لا تستخدم font-family مباشرة في أي قاعدة. استعمل --font-* فقط.
   2. Aref Ruqaa لا يتجاوز 5% من نص الصفحة — للروح، ليس للقراءة.
   3. الأرقام في حاسبات أو stats دائماً var(--font-numeric).
   4. body text و UI labels و buttons → var(--font-text).
   5. h1/h2/hero/wordmark → var(--font-display).
   6. لا تخلط display و text في نفس السطر.
   7. لا تستعمل italic على Aref Ruqaa (الخط أصلاً بمزاج خطّي).
   ═══════════════════════════════════════════════════════════════ */
```

---

## ✅ Acceptance Criteria

- [ ] Reem Kufi و Readex Pro و IBM Plex Sans Arabic و Aref Ruqaa الأربعة محمّلون بنجاح (تحقّق من Network → Fonts).
- [ ] `--font-display`, `--font-text`, `--font-numeric`, `--font-accent` معرّفون.
- [ ] `<h1>` في gateway و dashboard يستعمل display family (تحقّق DevTools → Computed → font-family).
- [ ] `.stat-tile-value` يستعمل numeric family + tabular-nums.
- [ ] `.gateway-tagline` يستعمل accent family (Aref Ruqaa).
- [ ] body paragraphs تستعمل text family (Readex Pro).
- [ ] الـ wordmark "Upgrade" في gateway و sidebar يبدو **premium** ومميز.
- [ ] الـ FOUT (Flash of Unstyled Text) ≤ 200ms — تحقّق إن `font-display: swap` يعمل.
- [ ] لو حذفت ملفات Thmanyah من المجلد، المنصة لا تكسر — تستعمل Reem Kufi تلقائياً.
- [ ] لا تكسير لقواعد Phase 1 (الـ scale و spacing نفس قيمها).
- [ ] لا errors في console.

---

## 🛡️ في نهاية الـ Phase

```
1. commit  : "phase 1B (aurora): premium Arabic typeface stack (Reem Kufi + Readex Pro + IBM Plex Arabic + Aref Ruqaa)"
2. push    : worker-12-aurora → origin
3. update  : state/PROGRESS.json (current.phase = "1B", phases_total = 8)
4. snapshot: state/snapshots/worker-12-phase-1B.json
5. commit  : "state: aurora phase 1B committed and pushed"
6. push    : ثاني push
```

**التالي:** `prompts/12_PHASE_2_OFFWHITE_RECHISEL.md` — بناء فوق الخطوط الجديدة.

— نهاية Phase 1B.
