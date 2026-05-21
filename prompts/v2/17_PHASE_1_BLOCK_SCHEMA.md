# 🏷️ WORKER 17 — Phase 1/6 — Block Schema & Metadata Audit
> **اقرأ أولاً:** `prompts/v2/17_WORKER_CONTENT_REVIVAL.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Cathedral v16 + Pack v2 W15 (TYPOGRAPHY SOUL) + W16 (VITAL UI).
> **الفلسفة:** *قبل أن نُغني المحتوى، نُعرّفه. كل block يجب أن يعرف من هو ولِمَن.*

---

## 🛡️ Preservation Contract (Phase 1)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` blocks | **AUGMENT** فقط — إضافة 5 data-attributes على ~500 block موجود | تعديل نص، حذف، إعادة ترتيب |
| `style.css` | **APPEND** كتلة "Block Schema Scaffolding v2" في النهاية فقط (~100 سطر) | تعديل أي قاعدة موجودة |
| `app.js` | لا تُلمَس في Phase 1 (Phase 4 يضيف Upg.practice، Phase 6 يضيف Upg.pace) | أي تعديل |

**Sacred preserved:**
- نص كل block: لا حرف واحد يتغيّر.
- 391 qcalc: تبقى تشتغل بنفس الحسابات.
- 23 Upg.* APIs: لا تُلمَس.

---

## 🎯 الهدف

Phase 1 لا يضيف UI ظاهر. هدفه **معرفي ومعماري بحت**:

1. **تعريف taxonomy** للـ block types (8 أنواع).
2. **تعريف 5 data-attributes** قياسية لكل block.
3. **AUGMENT** كل block محتوى (~500 block) بـ:
   - `data-block-id` فريد (page-prefix + sequential number)
   - `data-block-type` (lesson / drill / case / reference / quiz / calc / scenario / cheat)
   - `data-difficulty` (1-5، Bloom-aligned)
   - `data-est-minutes` (تقدير زمن)
   - `data-prereq` (block-id آخر، optional)
4. **APPEND CSS scaffolding** بسيط (debug-only utilities + token reservations).

> Phase 1 = الهيكل العظمي. Phases 2-6 = اللحم.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 1 PRE-FLIGHT
├─ Phase: 1/6 — Block Schema & Metadata Audit
├─ Estimated lines: ~480 (auto-script + CSS + manual augment)
├─ Files to touch:
│   ├─ platform/index.html       (AUGMENT data-* on ~500 blocks)
│   └─ platform/assets/style.css (APPEND ~100 lines scaffolding)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '<section class="page"'                   → 16
│   ├─ grep -c 'qcalc'                                    → 391
│   ├─ grep -oE 'window\.Upg\.[a-z]+' | sort -u | wc -l   → ≥23
│   └─ grep -c 'data-page-personality'                    → ≥15
├─ Branch: NEW worker-17-resonance (from latest main)
└─ No new APIs. No new fonts. Pure metadata layer.
```

---

## 🧱 خطوات التنفيذ (بالترتيب)

### Step 1 — تعريف Block Taxonomy

Block types المعتمدة (8 أنواع، ولا نخترع غيرهم):

| `data-block-type` | الوصف | أمثلة في المنصة | Bloom level |
|---|---|---|---|
| `lesson`    | شرح مفهوم نظري | "What is Empathy", "T-Account Anatomy" | Understand |
| `drill`     | تمرين تطبيقي | "Apply STAR to a story", "Identify objection" | Apply |
| `case`      | دراسة حالة | Iraqi market scenarios, customer case studies | Analyze |
| `reference` | مرجع/جدول/قائمة مفاتيح | Cheat sheets, salary tables, COA | Remember |
| `quiz`      | أسئلة تقييمية | Bloom assessments, self-tests | Evaluate |
| `calc`      | حاسبة تفاعلية | qcalc instances (391 of them) | Apply |
| `scenario`  | سيناريو حواري عراقي | "زبون يقول..." dialogue | Apply |
| `cheat`     | ورقة الخلاصة المضغوطة | Cheat sheet 12-citations blocks | Remember |

> **قاعدة اختيار النوع:** ابحث في DOM عن class أو heading يدلّ على النوع، ثم خصّص `data-block-type` بناءً عليه. إن لم يُحسَم، اختر `lesson` كافتراضي.

### Step 2 — تعريف Difficulty Scale (Bloom-aligned)

| `data-difficulty` | المعنى | Bloom level | علامة |
|---|---|---|---|
| `1` | تعريف بسيط | Remember | ⭐ |
| `2` | فهم سياق + مثال | Understand | ⭐⭐ |
| `3` | تطبيق على حالة جديدة | Apply | ⭐⭐⭐ |
| `4` | تحليل/مقارنة بين خيارات | Analyze | ⭐⭐⭐⭐ |
| `5` | تقييم/إبداع/تركيب | Evaluate/Create | ⭐⭐⭐⭐⭐ |

> **قاعدة التقدير:** اقرأ heading + أول فقرة من كل block، وقدّر بحسب أعمق mental operation مطلوبة. شك؟ اختر الأقل (3 → 2).

### Step 3 — تعريف الـ Block ID Convention

```
<page-prefix>-<sequential-3-digit>
```

Page prefixes (ملزمة):

| Page | Prefix |
|---|---|
| page-callcenter      | `cc`  |
| page-fieldsales      | `fs`  |
| page-accountmgr      | `am`  |
| page-social          | `so`  |
| page-lab             | `lb`  |
| page-psych           | `ps`  |
| page-eq              | `eq`  |
| page-negotiation     | `ng`  |
| page-customercare    | `cu`  |
| page-programming     | `pg`  |
| page-accounting      | `ac`  |
| page-phonerepair     | `pr`  |
| page-hrmastery       | `hr`  |
| page-myprogress      | `mp`  |

**أمثلة:**
- أول block في callcenter → `data-block-id="cc-001"`
- العاشر في accounting → `data-block-id="ac-010"`
- الخمسون في programming → `data-block-id="pg-050"`

> dashboard لا يحوي blocks بيداغوجية → لا تُلمَس.

### Step 4 — تعريف Estimated Minutes

قاعدة بسيطة:
- block <100 كلمة + بدون tables/lists → **3-5 دقائق**
- block فيه list أو table → **6-10 دقائق**
- block فيه interactive (qcalc / quiz / scenario) → **8-15 دقائق**
- block كبير معقّد (case study + multi-section) → **15-25 دقيقة**

> **قاعدة:** قدِّر بكرم — user يكتشف أنه أسرع، يفرح. user يتأخّر عن التقدير، يحبط.

### Step 5 — تعريف Prerequisites

`data-prereq="block-id-1,block-id-2"` — قائمة block-ids مفصولة بفواصل.

**Heuristic للـ prereq:**
- block بـ difficulty 3+ يحتاج عادة prereq من نفس الصفحة بـ difficulty ≤ مستواه - 1.
- block reference (cheat sheet) → prereq = أول 3 lessons في الصفحة.
- block يستعمل مصطلح معرَّف في block آخر → prereq = الـ block المُعرِّف.
- block بدون اعتماد واضح → اترك `data-prereq` بدون قيمة (empty attr) أو احذفه.

> **قاعدة:** أفضل قليلاً من lazy approach من many false positives. لا تخمِّن prereq لمجرد ملء الحقل.

### Step 6 — تنفيذ الـ AUGMENT (الجزء الكبير)

**استراتيجية:** بدل تعديل ~500 block يدوياً (خطر typos)، نستعمل **deterministic node script** مرة واحدة.

أنشئ `scripts/worker-17-block-schema.mjs`:

```javascript
#!/usr/bin/env node
// Worker 17 / Phase 1 — Block Schema AUGMENT
// Adds data-block-id, data-block-type, data-difficulty, data-est-minutes
// to every educational block in platform/index.html.
// Safe: only ADDS attributes. Never touches text content.

import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'platform/index.html';
let html = readFileSync(FILE, 'utf-8');

const PAGE_PREFIX = {
  'page-callcenter':   'cc',
  'page-fieldsales':   'fs',
  'page-accountmgr':   'am',
  'page-social':       'so',
  'page-lab':          'lb',
  'page-psych':        'ps',
  'page-eq':           'eq',
  'page-negotiation':  'ng',
  'page-customercare': 'cu',
  'page-programming':  'pg',
  'page-accounting':   'ac',
  'page-phonerepair':  'pr',
  'page-hrmastery':    'hr',
  'page-myprogress':   'mp',
};

// Block detection: target classes that wrap educational content.
// Found via grep on existing markup.
const BLOCK_SELECTORS = [
  'lesson-block',
  'drill-block',
  'case-block',
  'cheat-section',
  'cc-section',
  'fs-section',
  'pg-section',
  'ac-section',
  'ps-section',
  'eq-section',
  'ng-section',
  'cu-section',
  'pr-section',
  'hr-section',
  'lb-card',
  'so-card',
  'am-card',
  // qcalc roots
  'qcalc',
];

// Difficulty heuristic by class
const DIFFICULTY_BY_CLASS = {
  'lesson-block':  2,
  'drill-block':   3,
  'case-block':    4,
  'cheat-section': 1,
  'qcalc':         3,
};

// Type heuristic by class
const TYPE_BY_CLASS = {
  'lesson-block':  'lesson',
  'drill-block':   'drill',
  'case-block':    'case',
  'cheat-section': 'cheat',
  'qcalc':         'calc',
};

// Estimated minutes heuristic by class
const MINUTES_BY_CLASS = {
  'lesson-block':  6,
  'drill-block':   10,
  'case-block':    15,
  'cheat-section': 4,
  'qcalc':         8,
};

const counters = {};
let totalAugmented = 0;

for (const [pageId, prefix] of Object.entries(PAGE_PREFIX)) {
  counters[prefix] = 0;
  const pageMatch = new RegExp(
    `(<section[^>]*\\bid="${pageId}"[^>]*>)([\\s\\S]*?)(</section>\\s*(?=<section|<footer|<\\/main))`
  );
  const match = html.match(pageMatch);
  if (!match) continue;
  let pageContent = match[2];

  // Find blocks by class — use a tolerant regex
  const blockRe = /<(div|article|section|aside)\b([^>]*class="[^"]*\b([\w-]+)\b[^"]*"[^>]*)>/g;
  pageContent = pageContent.replace(blockRe, (full, tag, attrs, cls) => {
    if (!BLOCK_SELECTORS.includes(cls)) return full;
    if (full.includes('data-block-id=')) return full; // idempotent
    counters[prefix]++;
    const id = `${prefix}-${String(counters[prefix]).padStart(3, '0')}`;
    const type = TYPE_BY_CLASS[cls] || 'lesson';
    const diff = DIFFICULTY_BY_CLASS[cls] || 2;
    const mins = MINUTES_BY_CLASS[cls] || 6;
    totalAugmented++;
    return `<${tag}${attrs} data-block-id="${id}" data-block-type="${type}" data-difficulty="${diff}" data-est-minutes="${mins}">`;
  });

  html = html.replace(match[0], match[1] + pageContent + match[3]);
}

writeFileSync(FILE, html);
console.log(`Worker 17 / Phase 1 — Augmented ${totalAugmented} blocks across 14 pages.`);
console.log('Per-page counts:', counters);
```

**تشغيل:**
```bash
node scripts/worker-17-block-schema.mjs
```

**ملاحظات حرجة:**
1. السكربت **idempotent** — تشغيله مرتين لا يضاعف attributes.
2. لا يلمس `data-page-personality` أو aura أو life attributes (W15/W16).
3. القائمة `BLOCK_SELECTORS` قد تحتاج تعديل بعد inspection فعلي للـ markup.
4. `data-prereq` لا يُضبَط آلياً — يُضاف يدوياً في Phase 5 لـ subset مهمّ فقط.

### Step 7 — Manual prereq pass (اختياري في Phase 1، إجباري في Phase 5)

في Phase 1، اكتفِ بـ ~30 prereq على blocks high-difficulty (4-5) في:
- page-callcenter (Voice Profile depends on Empathy Loop)
- page-accounting (IFRS depends on Equation + T-Account)
- page-eq (RULER depends on Goleman 5)
- page-negotiation (Calculator depends on 6 principles)

أمثلة:
```html
<div class="lesson-block"
     data-block-id="cc-014"
     data-block-type="lesson"
     data-difficulty="4"
     data-est-minutes="15"
     data-prereq="cc-003,cc-007">
  <!-- existing content untouched -->
</div>
```

> Phase 5 يُكمل الـ prereq pass بشكل منهجي.

### Step 8 — CSS Scaffolding (في style.css)

**APPEND** في النهاية:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Worker 17 / Phase 1 — Block Schema Scaffolding
   Pure metadata layer. No visible UI in this phase.
   Reservations for Phases 2-6.
   ════════════════════════════════════════════════════════════════ */

/* Tier color tokens — reserved for ritual + Phase 6 progress */
:root {
  --tier-foundation:    oklch(72% 0.12 160);  /* green ~160h */
  --tier-practitioner:  oklch(72% 0.15 60);   /* amber ~60h */
  --tier-expert:        oklch(65% 0.18 25);   /* red-orange ~25h */

  /* Difficulty pip tints (1-5) — reserved for Phase 2 + ritual */
  --diff-1: oklch(78% 0.10 180);
  --diff-2: oklch(75% 0.12 150);
  --diff-3: oklch(72% 0.14 80);
  --diff-4: oklch(68% 0.16 40);
  --diff-5: oklch(62% 0.18 20);

  /* Block layer chrome reserved tokens */
  --block-aside-bg:     color-mix(in oklch, var(--color-surface-2) 60%, transparent);
  --block-aside-border: color-mix(in oklch, var(--color-tint, var(--color-brand)) 30%, transparent);
  --block-aside-radius: 0.5rem;
  --block-aside-pad-i:  var(--space-3);
  --block-aside-pad-b:  var(--space-3);
}

/* Optional debug overlay — toggled with body[data-block-debug="1"] */
body[data-block-debug="1"] [data-block-id] {
  outline: 1px dashed color-mix(in oklch, var(--color-tint, var(--color-brand)) 50%, transparent);
  outline-offset: 4px;
  position: relative;
}

body[data-block-debug="1"] [data-block-id]::before {
  content: attr(data-block-id) " · " attr(data-block-type) " · " attr(data-difficulty) "⭐ · " attr(data-est-minutes) "min";
  position: absolute;
  top: 0;
  inset-inline-start: 0;
  transform: translateY(-100%);
  font-family: var(--type-voice-numeric);
  font-size: 0.7rem;
  font-weight: 600;
  font-feature-settings: "tnum" 1, "lnum" 1;
  color: color-mix(in oklch, var(--color-text-faint) 90%, transparent);
  background: color-mix(in oklch, var(--color-surface-1) 95%, transparent);
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  border: 1px solid var(--color-border);
  pointer-events: none;
  z-index: 100;
}

/* Print-friendly: schema attributes hidden, content untouched */
@media print {
  body[data-block-debug="1"] [data-block-id]::before { display: none; }
}

/* ════════════════════════════════════════════════════════════════
   Discipline Comment — Worker 17 / Phase 1
   1. Block schema is metadata-only. No visible chrome added here.
   2. Phase 2-6 will WRAP siblings around blocks (not modify them).
   3. data-block-id is permanent. Never rename.
   4. data-difficulty is Bloom-aligned (1=Remember, 5=Create).
   5. data-prereq is comma-separated block-ids.
   6. To debug, set body[data-block-debug="1"] in DevTools.
   ════════════════════════════════════════════════════════════════ */
```

### Step 9 — Update README + verify counts

بعد تشغيل السكربت، اكتب في chat:

```
📊 Phase 1 Augment Stats:
─────────────────────────────────────
Page              Blocks  ⭐avg  ~min/page
callcenter        XX      X.X    XX
fieldsales        XX      X.X    XX
... (14 pages)
─────────────────────────────────────
Total blocks tagged: ~500
Total est. minutes:  ~3,500 (≈58 hours of guided learning)
```

> الأرقام تقريبية حتى يُنفَّذ السكربت فعلياً. Phase 1 يُحدّث `state/snapshots/worker-17-phase-1.json` بالأرقام الحقيقية.

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 16
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → ≥23
grep -c 'data-page-personality' platform/index.html   # → ≥15

# New additions
grep -c 'data-block-id=' platform/index.html         # → 400-550
grep -c 'data-block-type=' platform/index.html       # → 400-550
grep -c 'data-difficulty=' platform/index.html       # → 400-550
grep -c 'data-est-minutes=' platform/index.html      # → 400-550
grep -c 'data-prereq=' platform/index.html           # → 25-40 (Phase 1 partial)

# CSS scaffolding
grep -c -- '--tier-foundation' platform/assets/style.css  # → ≥1
grep -c 'data-block-debug' platform/assets/style.css      # → ≥2

# Console: zero errors
# Visual: identical to pre-phase (metadata only, no UI changes)
```

---

## ✅ معايير القبول (Phase 1)

- [ ] ~500 block محتوى محمَّلون بـ `data-block-id` + `data-block-type` + `data-difficulty` + `data-est-minutes`.
- [ ] ~30 block high-difficulty محمَّلون بـ `data-prereq` (Phase 5 سيكمل).
- [ ] CSS scaffolding في style.css (~100 سطر).
- [ ] Tier tokens + difficulty tints معرَّفة.
- [ ] Debug overlay يشتغل بـ `body[data-block-debug="1"]`.
- [ ] Script `scripts/worker-17-block-schema.mjs` موجود ويُعاد تشغيله بدون doubling.
- [ ] لا regression بصري: المنصة تبدو نفسها 100%.
- [ ] لا تعديل نص محتوى (verify via `git diff --stat`).
- [ ] Console: 0 errors.
- [ ] grep counts الـ 16/391/23/15 محفوظة.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/index.html platform/assets/style.css scripts/worker-17-block-schema.mjs
git commit -m "phase 1 (resonance): block schema & metadata audit — ~500 blocks tagged with id/type/difficulty/est-minutes + CSS scaffolding + debug overlay"
# push immediately
```

ثم state commit:

```bash
# update state/PROGRESS.json:
#   pack_status = "in-progress"
#   current.pack = "v2", worker = "17", phase = 1, status = "in-progress", branch = "worker-17-resonance"
#   completed_phases.push({"worker":"17","phase":1,...})
#   next_action = "Continue Worker 17 Phase 2 — TL;DR & Key Takeaways"
# add snapshot state/snapshots/worker-17-phase-1.json with real per-page counts

git add state/PROGRESS.json state/snapshots/worker-17-phase-1.json
git commit -m "state: resonance phase 1 committed and pushed"
# push immediately
```

— نهاية Phase 1.

🎵 **Resonance check:** هل صار كل block يعرف من هو؟ نعم → انتقل لـ Phase 2.
