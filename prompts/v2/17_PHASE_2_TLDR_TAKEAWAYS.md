# 📌 WORKER 17 — Phase 2/6 — TL;DR & Key Takeaways
> **اقرأ أولاً:** `prompts/v2/17_WORKER_CONTENT_REVIVAL.md` — قسم **Preservation Guard**.
> **يبني فوق:** Worker 17 Phase 1 (Block Schema).
> **الفلسفة:** *قبل أن يقرأ، يحتاج أن يعرف لمَ. وقبل أن يغادر، يحتاج أن يعرف ماذا أخذ معه.*

---

## 🛡️ Preservation Contract (Phase 2)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` | **WRAP** — إضافة `<aside class="block-tldr">` و `<ul class="block-takeaways">` كـ siblings قبل/بعد block. **AUGMENT** — إضافة `data-reading-time` على blocks موجودة | تعديل نص الـ block، حذف الـ block، تحريك مكانه |
| `style.css` | **APPEND** كتلة "TL;DR & Takeaways" في النهاية (~180 سطر) | تعديل قواعد W17 P1 أو W15/W16 |
| `app.js` | لا تُلمَس | أي تعديل |

**Sacred preserved:**
- نص كل block: 0 تعديل.
- 391 qcalc: تشتغل.
- Block schema من Phase 1: لا تُعدَّل.
- 23 Upg.* APIs: لا تُلمَس.

---

## 🎯 الهدف

Phase 2 يُضيف **3 طبقات قراءة** حول الـ blocks المهمة:

1. **TL;DR sibling** — `<aside class="block-tldr">` يسبق الـ block ويُلخّصه في 1-2 جملة.
2. **"لماذا يهم" framer** — جملة واحدة في الـ TL;DR تربط الـ block بسبب أكبر.
3. **Takeaways list** — `<ul class="block-takeaways">` بعد الـ block فيه 3-5 نقاط مفتاحية.
4. **Reading time hint** — `data-reading-time` (دقائق فعلية للقراءة، مختلفة عن `data-est-minutes` الذي يشمل التطبيق).

> Phase 2 لا يُغطّي كل blocks. فقط **major blocks** (~150 من ~500) — اللي صعوبتهم ≥ 2 و حجمهم > 100 كلمة.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 2 PRE-FLIGHT
├─ Phase: 2/6 — TL;DR & Key Takeaways
├─ Estimated lines: ~440
├─ Files to touch:
│   ├─ platform/index.html       (WRAP ~150 sibling-asides + AUGMENT data-reading-time)
│   └─ platform/assets/style.css (APPEND ~180 lines)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c 'data-block-id='                            → 400-550 (from P1)
│   ├─ grep -c '<section class="page"'                     → 16
│   ├─ grep -c 'qcalc'                                      → 391
│   └─ grep -oE 'window\.Upg\.[a-z]+' | sort -u | wc -l    → ≥23
├─ Branch: continue worker-17-resonance
└─ No new APIs in this phase.
```

---

## 🧱 خطوات التنفيذ (بالترتيب)

### Step 1 — تعريف الـ TL;DR Anatomy

Aside element مكوَّن من 4 أجزاء:

```html
<aside class="block-tldr"
       data-tldr-for="cc-014"
       aria-label="ملخص سريع">

  <header class="block-tldr-h">
    <span class="block-tldr-eyebrow type-eyebrow">خلاصة</span>
    <span class="block-tldr-meta">
      <span class="block-tldr-time" data-reading-time="3">3 دقائق قراءة</span>
      <span class="block-tldr-diff" aria-label="صعوبة 4 من 5">⭐⭐⭐⭐</span>
    </span>
  </header>

  <p class="block-tldr-body type-body-lead">
    <!-- 1-2 جملة تختصر الـ block -->
  </p>

  <p class="block-tldr-why type-quote-literary">
    <strong>لماذا يهم:</strong> <!-- جملة واحدة تربط الـ block بسبب أكبر -->
  </p>

</aside>
```

> **حقيقة مهمة:** نص الـ TL;DR و "لماذا يهم" يُكتَبان **يدوياً** للـ blocks المختارة. لا generation تلقائي. Phase 2 يُحدّد الـ pattern و يُطبّقه على ~150 block representative.

### Step 2 — تعريف Takeaways Anatomy

List element بعد الـ block:

```html
<ul class="block-takeaways"
    data-takeaways-for="cc-014"
    aria-label="نقاط مفتاحية للاسترجاع">

  <li class="block-takeaway type-body">
    <!-- نقطة مفتاحية 1 — جملة قصيرة actionable -->
  </li>
  <li class="block-takeaway type-body">
    <!-- نقطة مفتاحية 2 -->
  </li>
  <li class="block-takeaway type-body">
    <!-- نقطة مفتاحية 3 (3-5 بحدود) -->
  </li>

</ul>
```

> **قاعدة كتابة الـ takeaways:**
> - كل نقطة ≤ 14 كلمة.
> - تبدأ بفعل أو اسم concrete.
> - actionable: "افتح بسؤال مفتوح"، لا "السؤال المفتوح أفضل".
> - 3 = حد أدنى، 5 = حد أقصى.

### Step 3 — Reading Time Calculator (Heuristic)

`data-reading-time` يُضاف على major blocks. حسابه:

```
reading_time_minutes = ceil(arabic_words / 180)
```

180 كلمة/دقيقة هو متوسط قراءة عربي passive (مرجع: Yara Khoury TypeArabic).

**لا تشغّل سكربت** يقرأ الـ DOM — قدِّر يدوياً بناءً على:
- block صغير (< 100 كلمة) → 1 دقيقة
- متوسط (100-300) → 2-3 دقائق
- كبير (300-600) → 4-5 دقائق
- ضخم (> 600) → 6+ دقائق

`data-est-minutes` (من Phase 1) ≥ `data-reading-time` دائماً (لأن الأول يشمل الفهم + التطبيق).

### Step 4 — Selection Strategy

من ~500 block، اختر ~150 لـ TL;DR + Takeaways:

| المعيار | كم |
|---|---|
| كل block بـ difficulty ≥ 4 | ~80 |
| كل block بـ difficulty 3 و حجم > 200 كلمة | ~50 |
| كل cheat sheet (block-type=cheat) | ~14 |
| كل case study (block-type=case) | ~12 |
| **مجموع تقديري** | **~156** |

> **لا تُضِف TL;DR على blocks بسيطة (difficulty 1-2)**. ذلك يُغرِق الـ UI ويفقد الـ TL;DR قيمتها.

### Step 5 — أمثلة كاملة (3 أنماط)

#### نمط 1 — Lesson Block

```html
<aside class="block-tldr" data-tldr-for="cc-014" aria-label="ملخص سريع">
  <header class="block-tldr-h">
    <span class="block-tldr-eyebrow type-eyebrow">خلاصة</span>
    <span class="block-tldr-meta">
      <span class="block-tldr-time" data-reading-time="3">3 دقائق قراءة</span>
      <span class="block-tldr-diff" aria-label="صعوبة 4 من 5">⭐⭐⭐⭐</span>
    </span>
  </header>
  <p class="block-tldr-body type-body-lead">
    Voice Profile يقيس صوتك على 5 محاور (Pitch, Pace, Volume, Tone, Clarity).
    تطابق الصوت مع موقف الزبون يضاعف فرص الإغلاق.
  </p>
  <p class="block-tldr-why type-quote-literary">
    <strong>لماذا يهم:</strong>
    صوتك أداة بيع قبل أن تكون أداة تواصل — الزبون يقرر في 6 ثوانٍ.
  </p>
</aside>

<div class="lesson-block"
     data-block-id="cc-014"
     data-block-type="lesson"
     data-difficulty="4"
     data-est-minutes="15"
     data-reading-time="3"
     data-prereq="cc-003,cc-007">
  <!-- existing content unchanged -->
</div>

<ul class="block-takeaways" data-takeaways-for="cc-014" aria-label="نقاط مفتاحية للاسترجاع">
  <li class="block-takeaway type-body">قس صوتك على 5 محاور قبل أي مكالمة مهمة.</li>
  <li class="block-takeaway type-body">طابق Pitch مع مزاج الزبون في أول 10 ثوانٍ.</li>
  <li class="block-takeaway type-body">Pace أسرع → ثقة. Pace أبطأ → ودّ.</li>
  <li class="block-takeaway type-body">Clarity أهم من Volume. لا ترفع صوتك إلا للحماسة.</li>
</ul>
```

#### نمط 2 — Calc Block (qcalc)

```html
<aside class="block-tldr" data-tldr-for="ac-022" aria-label="ملخص الحاسبة">
  <header class="block-tldr-h">
    <span class="block-tldr-eyebrow type-eyebrow">حاسبة</span>
    <span class="block-tldr-meta">
      <span class="block-tldr-time" data-reading-time="2">دقيقتان للفهم</span>
      <span class="block-tldr-diff" aria-label="صعوبة 3 من 5">⭐⭐⭐</span>
    </span>
  </header>
  <p class="block-tldr-body type-body-lead">
    حاسبة ضريبة الراتب العراقي 2025 — تُدخل الراتب الإجمالي،
    تخرج الصافي مع تفصيل القطوعات.
  </p>
  <p class="block-tldr-why type-quote-literary">
    <strong>لماذا يهم:</strong>
    معرفة الصافي قبل توقيع العقد = ميزة تفاوض.
  </p>
</aside>

<div class="qcalc" data-block-id="ac-022" ...>
  <!-- existing qcalc unchanged -->
</div>
```

#### نمط 3 — Case Study Block

```html
<aside class="block-tldr" data-tldr-for="ng-008" aria-label="ملخص الحالة">
  <header class="block-tldr-h">
    <span class="block-tldr-eyebrow type-eyebrow">حالة عراقية</span>
    <span class="block-tldr-meta">
      <span class="block-tldr-time" data-reading-time="5">5 دقائق</span>
      <span class="block-tldr-diff" aria-label="صعوبة 4 من 5">⭐⭐⭐⭐</span>
    </span>
  </header>
  <p class="block-tldr-body type-body-lead">
    موظف مبيعات يطلب زيادة 30% بعد نتائج Q3.
    مدير عمليات يقترح 12% فقط.
    البائع يُحضّر BATNA بعرض من شركة منافسة.
  </p>
  <p class="block-tldr-why type-quote-literary">
    <strong>لماذا يهم:</strong>
    BATNA المُحضّر = الفارق بين قبول 12% و انتزاع 25%.
  </p>
</aside>

<article class="case-block" data-block-id="ng-008" ...>
  <!-- existing case content unchanged -->
</article>
```

### Step 6 — CSS Implementation

**APPEND** في style.css:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Worker 17 / Phase 2 — TL;DR & Key Takeaways
   Pre-block summary asides + post-block takeaway lists.
   AUGMENT-only: never modifies block content itself.
   ════════════════════════════════════════════════════════════════ */

/* ─── TL;DR Aside ─── */
.block-tldr {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--block-aside-pad-b) var(--block-aside-pad-i);
  margin-block-end: var(--space-3);
  background: var(--block-aside-bg);
  border-inline-start: 3px solid var(--block-aside-border);
  border-radius: var(--block-aside-radius);
  position: relative;

  /* Subtle entrance — matches W16 motion language */
  animation: block-tldr-enter var(--duration-base) var(--ease-out) both;
}

@keyframes block-tldr-enter {
  from { opacity: 0; transform: translateY(-2px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .block-tldr { animation: none; }
}

.block-tldr-h {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.block-tldr-eyebrow {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  color: color-mix(in oklch, var(--color-text-faint) 80%, var(--color-tint, var(--color-brand)));
  text-transform: none;
}

.block-tldr-meta {
  display: inline-flex;
  align-items: baseline;
  gap: var(--space-3);
  font-size: var(--text-xs);
  color: var(--color-text-faint);
}

.block-tldr-time {
  font-family: var(--type-voice-numeric);
  font-feature-settings: "tnum" 1, "lnum" 1;
}

.block-tldr-diff {
  letter-spacing: -0.05em;
  color: color-mix(in oklch, var(--color-tint, var(--color-brand)) 80%, var(--color-text));
}

.block-tldr-body {
  margin: 0;
  color: var(--color-text);
  font-weight: 500;
}

.block-tldr-why {
  margin: 0;
  padding: var(--space-2) 0 0 0;
  border-block-start: 1px dashed color-mix(in oklch, var(--color-border) 70%, transparent);
  font-size: var(--text-sm);
  font-style: italic;
  color: var(--color-text-muted);
}

.block-tldr-why strong {
  color: color-mix(in oklch, var(--color-text) 90%, var(--color-tint, var(--color-brand)));
  font-weight: 600;
  font-style: normal;
  margin-inline-end: 0.4em;
}

/* ─── Takeaways List ─── */
.block-takeaways {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-3);
  margin-block-start: var(--space-3);
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 4%, var(--color-surface-1));
  border-radius: var(--block-aside-radius);
  position: relative;
  counter-reset: takeaway;
}

.block-takeaways::before {
  content: "نقاط للاسترجاع";
  position: absolute;
  top: -0.7em;
  inset-inline-start: var(--space-3);
  padding: 0.1em 0.6em;
  background: var(--color-surface-1);
  font-family: var(--type-voice-accent);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  border-radius: 0.3rem;
}

.block-takeaway {
  counter-increment: takeaway;
  display: grid;
  grid-template-columns: 1.6em 1fr;
  gap: var(--space-2);
  align-items: baseline;
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
}

.block-takeaway::before {
  content: counter(takeaway);
  font-family: var(--type-voice-numeric);
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-weight: 700;
  font-size: var(--text-xs);
  color: color-mix(in oklch, var(--color-tint, var(--color-brand)) 80%, var(--color-text));
  background: color-mix(in oklch, var(--color-surface-2) 70%, transparent);
  border-radius: 0.3rem;
  text-align: center;
  padding: 0.1em 0;
  align-self: start;
}

/* ─── Mobile refinements ─── */
@media (max-width: 480px) {
  .block-tldr,
  .block-takeaways {
    padding: var(--space-2);
  }
  .block-tldr-h {
    flex-direction: column;
    gap: var(--space-1);
  }
  .block-tldr-meta {
    font-size: 0.7rem;
  }
}

/* ─── Print: TL;DR + Takeaways visible, no animation ─── */
@media print {
  .block-tldr {
    animation: none;
    border-inline-start: 2px solid #000;
    background: transparent;
    page-break-inside: avoid;
  }
  .block-takeaways {
    background: transparent;
    page-break-inside: avoid;
  }
}

/* ─── A11y: reading-time announced via aria-label only ─── */
.block-tldr-time::after {
  content: "";
}

/* ════════════════════════════════════════════════════════════════
   Discipline Comment — Worker 17 / Phase 2
   1. TL;DR aside ALWAYS precedes the block (DOM order).
   2. Takeaways list ALWAYS follows the block.
   3. Both reference the block via data-tldr-for / data-takeaways-for
      (matching block's data-block-id).
   4. TL;DR body ≤ 2 sentences. "لماذا يهم" ≤ 1 sentence.
   5. Takeaways: 3 minimum, 5 maximum, ≤14 words each.
   6. Never auto-generate text. Manual write-up only.
   ════════════════════════════════════════════════════════════════ */
```

### Step 7 — Where to add (concrete count guide)

Distribute ~150 TL;DRs across pages by content density:

| Page | TL;DRs to add | Takeaways to add |
|---|---:|---:|
| callcenter   | 14 | 14 |
| accounting   | 18 | 18 |
| programming  | 16 | 16 |
| psych        | 12 | 12 |
| eq           | 10 | 10 |
| negotiation  | 14 | 14 |
| customercare | 10 | 10 |
| fieldsales   | 12 | 12 |
| accountmgr   | 8  | 8  |
| social       | 10 | 10 |
| lab          | 8  | 8  |
| phonerepair  | 10 | 10 |
| hrmastery    | 12 | 12 |
| myprogress   | 0  | 0  |
| **Total**    | **~154** | **~154** |

> **قاعدة:** اختر blocks ذات أعلى تكرار وصول (top-of-page) أو أعلى صعوبة. لا تُغطّي كل صفحة بشكل خطّي.

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 16
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → ≥23
grep -c 'data-block-id=' platform/index.html          # → ≥400 (preserved from P1)

# New additions
grep -c '<aside class="block-tldr"' platform/index.html        # → 145-160
grep -c '<ul class="block-takeaways"' platform/index.html      # → 145-160
grep -c 'data-tldr-for=' platform/index.html                   # → 145-160
grep -c 'data-takeaways-for=' platform/index.html              # → 145-160
grep -c 'data-reading-time=' platform/index.html               # → ≥150

# CSS
grep -c '\.block-tldr' platform/assets/style.css               # → ≥6
grep -c '\.block-takeaways' platform/assets/style.css          # → ≥3

# Block text edits — must be 0
git diff --stat HEAD~1 platform/index.html | grep -c 'block content'   # → 0 (false-positive proof)
```

---

## ✅ معايير القبول (Phase 2)

- [ ] ~150 `block-tldr` aside مضاف قبل blocks high-value.
- [ ] ~150 `block-takeaways` list مضاف بعد نفس الـ blocks.
- [ ] كل aside/list مرتبط بـ `data-tldr-for` / `data-takeaways-for` يطابق `data-block-id`.
- [ ] `data-reading-time` مضاف على ≥150 block.
- [ ] CSS ~180 سطر مكتوب في style.css.
- [ ] لا تعديل نص محتوى block واحد.
- [ ] قواعد W17 P1 (block-debug overlay) ما زالت تشتغل.
- [ ] قواعد W15 (type voices) و W16 (life/aura/tactile) ما زالت تشتغل.
- [ ] mobile responsive (< 480px) يشتغل.
- [ ] print rendering مقبول.
- [ ] Console: 0 errors.
- [ ] grep counts الـ 16/391/23 محفوظة.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/index.html platform/assets/style.css
git commit -m "phase 2 (resonance): TL;DR & key takeaways — ~150 blocks wrapped with summary asides + 3-5 takeaway lists + reading-time hints + 'why this matters' framers"
# push immediately

# update state/PROGRESS.json + snapshot
git add state/PROGRESS.json state/snapshots/worker-17-phase-2.json
git commit -m "state: resonance phase 2 committed and pushed"
# push immediately
```

— نهاية Phase 2.

🎵 **Resonance check:** هل كل block مهم يقول لـ user "هذا ما ستأخذه" قبل أن يقرأ؟ نعم → انتقل لـ Phase 3.
