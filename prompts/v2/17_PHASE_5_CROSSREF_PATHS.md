# 🔗 WORKER 17 — Phase 5/6 — Cross-References & Learning Bridges
> **اقرأ أولاً:** `prompts/v2/17_WORKER_CONTENT_REVIVAL.md` — قسم **Preservation Guard**.
> **يبني فوق:** Worker 17 Phases 1+2+3+4.
> **الفلسفة:** *المعرفة ليست خطوطاً متوازية. هي شبكة. كل block يجب أن يعرف من يجاوره ولأين يقود.*

---

## 🛡️ Preservation Contract (Phase 5)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` | **AUGMENT** — إضافة `data-related` و `data-prereq` (إكمال P1 partial pass). **WRAP** — إضافة `<nav class="block-bridge">` cards بعد practice (or pitfalls/block) | تعديل نص أي block أو wrappers سابقة |
| `style.css` | **APPEND** كتلة "Cross-Refs & Bridges" (~180 سطر) | تعديل قواعد سابقة |
| `app.js` | لا يُلمَس (no new API; بسيط CSS-only links) | أي تعديل |

**Sacred preserved:**
- نص كل block.
- TL;DR + Takeaways + Pitfalls + Practice (P2-P4).
- 24 Upg.* APIs (W15+W16+W17 P4).
- 391 qcalc.

---

## 🎯 الهدف

Phase 5 يربط الـ blocks في **شبكة معرفية** بـ 4 طبقات:

1. **`data-related` augment** — كل block فيه ≥3 blocks مرتبطة (داخل نفس الصفحة أو عبر صفحات).
2. **"تابع التعلم" bridge cards** — `<nav class="block-bridge">` بعد كل block مهم، يعرض 2-4 next steps.
3. **Prereq breadcrumb chip** — `<div class="block-prereq-chip">` يظهر فوق الـ block إن كان `data-prereq` غير فارغ.
4. **8 cross-page bridges** — صفحات معرفية متجاورة (psych↔eq, callcenter↔customercare, accounting↔accountmgr, hrmastery↔negotiation, social↔fieldsales, programming↔phonerepair, lab↔social, eq↔negotiation).

> Phase 5 يُكمل ما بدأه Phase 1 من `data-prereq` partial. النتيجة: كل block بـ difficulty ≥ 3 سيكون له prereq معرَّف.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 5 PRE-FLIGHT
├─ Phase: 5/6 — Cross-References & Learning Bridges
├─ Estimated lines: ~440
├─ Files to touch:
│   ├─ platform/index.html       (AUGMENT data-related + data-prereq + WRAP bridge nav)
│   └─ platform/assets/style.css (APPEND ~180 lines)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c 'data-block-id='              → ≥400 (P1)
│   ├─ grep -c '<section class="block-practice"' → 60-65 (P4)
│   ├─ grep -oE 'window\.Upg\.[a-z]+' | sort -u | wc -l  → 24 (P4 added)
│   └─ grep -c '<section class="page"'       → 16
├─ Branch: continue worker-17-resonance
└─ No new APIs in this phase.
```

---

## 🧱 خطوات التنفيذ (بالترتيب)

### Step 1 — `data-related` Augment (Manual Pass)

لكل block بـ difficulty ≥ 3، أضف `data-related="block-id-1,block-id-2,block-id-3"`.

**استراتيجية الاختيار:**
1. **In-page proximity** (60% من الروابط): blocks متصلة منطقياً داخل نفس الصفحة.
2. **Cross-page conceptual** (30%): block في صفحة أخرى يتناول نفس المفهوم بعمق مختلف.
3. **Cheat sheet anchor** (10%): دائماً اربط بـ cheat sheet الصفحة.

**أمثلة:**
```html
<!-- in callcenter -->
<div class="lesson-block"
     data-block-id="cc-014"
     data-block-type="lesson"
     data-difficulty="4"
     data-est-minutes="15"
     data-prereq="cc-003,cc-007"
     data-related="cc-018,cu-009,eq-005,cc-cheat">
  <!-- existing content -->
</div>

<!-- in negotiation -->
<div class="case-block"
     data-block-id="ng-008"
     data-difficulty="4"
     data-related="ng-003,ng-014,hr-012,ng-cheat">
  <!-- existing content -->
</div>
```

> **قاعدة:** ≤ 5 related links لكل block (over-linking = noise).

### Step 2 — Prereq Pass Completion

من Phase 1 كان عندنا ~30 prereq (high-difficulty only). في Phase 5 نُكمل:

| Difficulty | Prereq pass strategy |
|---|---|
| 5 | 2-3 prereqs (already from P1) |
| 4 | 1-2 prereqs (already partial from P1, complete here) |
| 3 | 1 prereq (NEW in P5) |
| 1-2 | بدون prereq (entry-level) |

**هدف:** ~250 block فيه `data-prereq` بنهاية P5.

**قاعدة في كتابة prereq:**
- prereq يجب أن يكون `data-difficulty < block_difficulty` (ضمان تدرّج).
- prereq يفضّل أن يكون داخل نفس الصفحة. cross-page prereq فقط حين يكون مفهوم أساسي.
- ≤ 3 prereqs لكل block.

### Step 3 — Bridge Card Anatomy

```html
<nav class="block-bridge"
     data-bridge-for="cc-014"
     aria-label="تابع التعلم">

  <header class="block-bridge-h">
    <span class="block-bridge-eyebrow type-eyebrow">تابع التعلم</span>
    <h4 class="block-bridge-title type-display-h">المسار التالي</h4>
  </header>

  <ul class="block-bridge-list">

    <li class="block-bridge-item block-bridge-item--inpage">
      <a class="block-bridge-link"
         href="#cc-018"
         data-bridge-target="cc-018"
         data-bridge-relation="extends">
        <span class="block-bridge-relation type-eyebrow">يُعمّق</span>
        <span class="block-bridge-target-title type-body-lead">
          <!-- عنوان block-id="cc-018" -->
        </span>
        <span class="block-bridge-meta type-num">
          <span aria-label="صعوبة 5 من 5">⭐⭐⭐⭐⭐</span> ·
          <span>~12 دقيقة</span>
        </span>
      </a>
    </li>

    <li class="block-bridge-item block-bridge-item--crosspage">
      <a class="block-bridge-link"
         href="#page-customercare"
         data-bridge-target="cu-009"
         data-bridge-relation="applies-in">
        <span class="block-bridge-relation type-eyebrow">يُطبَّق في</span>
        <span class="block-bridge-target-title type-body-lead">
          <!-- عنوان مفهوم في customercare -->
        </span>
        <span class="block-bridge-meta type-num">
          <span class="block-bridge-page-tag">خدمة الزبون</span>
        </span>
      </a>
    </li>

    <li class="block-bridge-item block-bridge-item--cheat">
      <a class="block-bridge-link"
         href="#cc-cheat"
         data-bridge-target="cc-cheat"
         data-bridge-relation="cheat">
        <span class="block-bridge-relation type-eyebrow">ورقة الخلاصة</span>
        <span class="block-bridge-target-title type-body-lead">
          callcenter — ورقة المفاتيح
        </span>
        <span class="block-bridge-meta type-num">
          <span>~3 دقائق</span>
        </span>
      </a>
    </li>

  </ul>
</nav>
```

**Relations المعتمدة:**

| Relation | الوصف | متى |
|---|---|---|
| `extends` | يُعمّق نفس المفهوم | block أصعب 1 درجة في نفس الصفحة |
| `applies-in` | يُطبَّق في سياق آخر | block في صفحة مختلفة يستعمل نفس المفهوم |
| `contrasts` | مفهوم مقابل | "يقابل / يختلف عن" |
| `prereq-for` | متطلب لـ block أعلى | عكس `data-prereq` |
| `cheat` | ورقة خلاصة | دائماً للصفحة |
| `case` | حالة تطبيقية | block-type=case في نفس الصفحة |
| `practice` | تمرين متعلق | block-type=drill متصل |

> **قاعدة:** 2-4 bridge items لكل bridge card. لا يقل عن 2، لا يزيد عن 4.

### Step 4 — Prereq Chip Anatomy

```html
<div class="block-prereq-chip"
     data-prereq-for="cc-014"
     aria-label="متطلبات معرفية">

  <span class="block-prereq-chip-icon" aria-hidden="true">↑</span>
  <span class="block-prereq-chip-label type-eyebrow">يحتاج فهم:</span>

  <ol class="block-prereq-chip-list">
    <li class="block-prereq-chip-item">
      <a href="#cc-003" data-prereq-target="cc-003">
        <!-- عنوان block-id="cc-003" -->
      </a>
    </li>
    <li class="block-prereq-chip-item">
      <a href="#cc-007" data-prereq-target="cc-007">
        <!-- عنوان block-id="cc-007" -->
      </a>
    </li>
  </ol>
</div>
```

**المكان:** يُوضَع **قبل** TL;DR (إن وُجد) أو قبل الـ block مباشرة.

### Step 5 — 8 Cross-Page Bridges

اختر 8 أزواج صفحات وأضف bridge عريض في نهاية الصفحة الأولى يقود للثانية:

| الزوج | الـ Bridge |
|---|---|
| psych ↔ eq | "علم النفس يفسّر الـ EQ — تابع لـ صفحة الذكاء العاطفي" |
| callcenter ↔ customercare | "ما تعلّمته للمكالمات يتحوّل لخدمة الزبون شاملة" |
| accounting ↔ accountmgr | "إدارة الحسابات تستعمل المحاسبة كأداة، تابع للـ KAM" |
| hrmastery ↔ negotiation | "مهارات HR تتقاطع مع التفاوض — تابع للراتب" |
| social ↔ fieldsales | "مهارات التسويق الاجتماعي تطبَّق في المبيعات الميدانية" |
| programming ↔ phonerepair | "البرمجيات والصيانة وجهان لتقنية واحدة" |
| lab ↔ social | "تجارب الـ lab تنتج محتوى جاهز للـ social" |
| eq ↔ negotiation | "EQ هو سرّ التفاوض الناجح" |

**Bridge HTML pattern (يُوضَع قبل page footer):**

```html
<aside class="block-bridge block-bridge--cross-page"
       data-cross-bridge-from="page-psych"
       data-cross-bridge-to="page-eq"
       aria-label="جسر بين الصفحتين">

  <header class="block-bridge-h">
    <span class="block-bridge-eyebrow type-eyebrow">جسر تعلّمي</span>
    <h3 class="block-bridge-title type-display">
      ما بعد علم النفس
    </h3>
  </header>

  <p class="block-bridge-desc type-body-lead">
    علم النفس يُفسّر الدوافع والانحيازات. الذكاء العاطفي يحوّلها لمهارة عملية يومية.
  </p>

  <a class="block-bridge-cta type-button"
     href="#page-eq"
     data-cross-bridge-cta="eq">
    تابع لـ صفحة الذكاء العاطفي →
  </a>
</aside>
```

### Step 6 — CSS Implementation

**APPEND** في style.css:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Worker 17 / Phase 5 — Cross-References & Bridges
   ════════════════════════════════════════════════════════════════ */

/* ─── Prereq Chip ─── */
.block-prereq-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 0.3em 0.6em;
  margin-block: var(--space-2);
  background: color-mix(in oklch, var(--color-surface-2) 60%, transparent);
  border: 1px dashed color-mix(in oklch, var(--color-border) 70%, transparent);
  border-radius: 0.4rem;
  font-size: var(--text-xs);
  flex-wrap: wrap;
}

.block-prereq-chip-icon {
  font-family: var(--type-voice-numeric);
  color: var(--color-text-faint);
}

.block-prereq-chip-label {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
}

.block-prereq-chip-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.4em;
}

.block-prereq-chip-item a {
  color: color-mix(in oklch, var(--color-tint, var(--color-brand)) 80%, var(--color-text));
  text-decoration: none;
  padding: 0.1em 0.4em;
  background: var(--color-surface-1);
  border-radius: 0.25rem;
  font-weight: 500;
}

.block-prereq-chip-item a:hover,
.block-prereq-chip-item a:focus-visible {
  text-decoration: underline;
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 12%, var(--color-surface-1));
}

/* ─── Bridge Card ─── */
.block-bridge {
  margin-block: var(--space-4);
  padding: var(--space-3);
  background: color-mix(in oklch, var(--color-surface-1) 96%, var(--color-tint, var(--color-brand)));
  border: 1px solid var(--color-border);
  border-radius: var(--block-aside-radius);
}

.block-bridge-h {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding-block-end: var(--space-2);
  border-block-end: 1px dashed color-mix(in oklch, var(--color-border) 70%, transparent);
  margin-block-end: var(--space-2);
}

.block-bridge-eyebrow {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
}

.block-bridge-title {
  margin: 0;
  font-weight: 700;
}

.block-bridge-desc {
  margin: 0 0 var(--space-3) 0;
  color: var(--color-text-muted);
}

.block-bridge-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.block-bridge-item {
  border-radius: 0.4rem;
  transition: transform var(--duration-fast) var(--ease-spring);
}

.block-bridge-item:hover {
  transform: translateX(-2px); /* RTL — slides leftward */
}

[dir="ltr"] .block-bridge-item:hover {
  transform: translateX(2px);
}

.block-bridge-link {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-2);
  align-items: center;
  padding: var(--space-2) var(--space-3);
  background: var(--color-surface-2);
  border-radius: 0.4rem;
  text-decoration: none;
  color: var(--color-text);
  border-inline-start: 3px solid transparent;
  transition: border-color var(--duration-fast) var(--ease-out);
}

.block-bridge-link:hover {
  border-inline-start-color: var(--color-tint, var(--color-brand));
}

.block-bridge-link:focus-visible {
  outline: 2px solid var(--color-tint, var(--color-brand));
  outline-offset: 2px;
}

.block-bridge-relation {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  color: color-mix(in oklch, var(--color-text-muted) 80%, var(--color-tint, var(--color-brand)));
  align-self: center;
}

.block-bridge-target-title {
  margin: 0;
  font-weight: 500;
  font-size: var(--text-sm);
  line-height: var(--leading-snug);
}

.block-bridge-meta {
  font-size: var(--text-xs);
  color: var(--color-text-faint);
  text-align: end;
  font-feature-settings: "tnum" 1, "lnum" 1;
}

.block-bridge-page-tag {
  display: inline-block;
  padding: 0.1em 0.4em;
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 18%, transparent);
  border-radius: 0.25rem;
  color: var(--color-text);
}

/* ─── Cross-Page Bridge (large, dramatic) ─── */
.block-bridge--cross-page {
  margin-block-start: var(--space-6);
  padding: var(--space-5);
  background: linear-gradient(
    135deg,
    color-mix(in oklch, var(--color-surface-1) 92%, var(--color-tint, var(--color-brand))),
    color-mix(in oklch, var(--color-surface-2) 80%, var(--color-tint, var(--color-brand)))
  );
  border: 1px solid color-mix(in oklch, var(--color-tint, var(--color-brand)) 30%, var(--color-border));
  text-align: start;
  position: relative;
  overflow: hidden;
}

.block-bridge--cross-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 20% 0%,
    color-mix(in oklch, var(--color-tint, var(--color-brand)) 12%, transparent),
    transparent 60%
  );
  pointer-events: none;
}

.block-bridge--cross-page > * {
  position: relative;
}

.block-bridge--cross-page .block-bridge-title {
  font-size: var(--text-2xl);
}

.block-bridge-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.7em 1.5em;
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 80%, var(--color-text));
  color: var(--color-surface-1);
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-family: var(--type-voice-ui);
  transition:
    background var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-spring);
}

.block-bridge-cta:hover {
  background: var(--color-tint, var(--color-brand));
  transform: translateY(-1px);
}

.block-bridge-cta:focus-visible {
  outline: 2px solid var(--color-text);
  outline-offset: 2px;
}

/* ─── Mobile ─── */
@media (max-width: 480px) {
  .block-bridge { padding: var(--space-2); }
  .block-bridge-link {
    grid-template-columns: 1fr;
    gap: var(--space-1);
  }
  .block-bridge-meta { text-align: start; }
  .block-bridge--cross-page { padding: var(--space-3); }
}

/* ─── Print ─── */
@media print {
  .block-bridge { background: transparent; border: 1px solid #000; }
  .block-bridge-cta { background: #000; color: #fff; }
}

/* ─── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
  .block-bridge-item,
  .block-bridge-link,
  .block-bridge-cta {
    transition: none;
    transform: none !important;
  }
}

/* ════════════════════════════════════════════════════════════════
   Discipline Comment — Worker 17 / Phase 5
   1. data-related ≤ 5 entries per block.
   2. data-prereq ≤ 3 entries; difficulty < block's own.
   3. Bridge items ≤ 4 per card.
   4. 8 cross-page bridges total — one per natural pair.
   5. Relation labels are fixed: extends/applies-in/contrasts/prereq-for/cheat/case/practice.
   6. Prereq chip ALWAYS precedes block (or its TL;DR).
   7. Bridge card follows practice (or pitfalls/block fallback).
   8. No dead links — every href must resolve to an existing block-id.
   ════════════════════════════════════════════════════════════════ */
```

### Step 7 — Distribution

| الطبقة | كم تُضاف |
|---|---:|
| `data-related` augment | ~250 block (all difficulty ≥ 3) |
| `data-prereq` complete pass | ~250 block total (P1 had ~30, P5 adds ~220) |
| `block-prereq-chip` UI | ~250 (one per prereq'd block) |
| `block-bridge` cards (in-page) | ~150 (major blocks only) |
| `block-bridge--cross-page` (hero bridges) | **8** (one per natural pair) |

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 16
grep -c 'qcalc' platform/index.html                   # → 391
grep -c '<section class="block-practice"' platform/index.html  # → 60-65 (P4)
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 24

# New / completed additions
grep -c 'data-related=' platform/index.html              # → 230-260
grep -c 'data-prereq=' platform/index.html               # → 230-260
grep -c 'block-prereq-chip' platform/index.html          # → 230-260
grep -c 'class="block-bridge"' platform/index.html       # → 145-160
grep -c 'block-bridge--cross-page' platform/index.html   # → 8
grep -c 'data-cross-bridge-from=' platform/index.html    # → 8

# CSS
grep -c '\.block-bridge' platform/assets/style.css       # → ≥4
grep -c '\.block-prereq-chip' platform/assets/style.css  # → ≥3

# No dead links — manually spot-check 5-10 random href values
```

---

## ✅ معايير القبول (Phase 5)

- [ ] ~250 block فيهم `data-related`.
- [ ] ~250 block فيهم `data-prereq` (P1 partial كُمِّل).
- [ ] ~250 prereq-chip في DOM.
- [ ] ~150 in-page bridge cards.
- [ ] **بالضبط 8** cross-page bridges.
- [ ] كل bridge href يحلّ لـ block-id موجود (no dead links).
- [ ] Relations limited إلى الـ 7 المعتمدة.
- [ ] CSS ~180 سطر.
- [ ] mobile + print + reduced-motion يشتغلون.
- [ ] لا تعديل نص محتوى block واحد.
- [ ] قواعد W17 P1-P4 ما زالت تشتغل.
- [ ] Console: 0 errors.
- [ ] grep counts الـ 16/391/24 محفوظة.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/index.html platform/assets/style.css
git commit -m "phase 5 (resonance): cross-references & learning bridges — ~250 data-related + ~250 data-prereq complete + ~150 in-page bridge cards + ~250 prereq chips + 8 cross-page hero bridges"
# push immediately

# update state/PROGRESS.json + snapshot
git add state/PROGRESS.json state/snapshots/worker-17-phase-5.json
git commit -m "state: resonance phase 5 committed and pushed"
# push immediately
```

— نهاية Phase 5.

🎵 **Resonance check:** هل المحتوى صار شبكة لا قائمة؟ نعم → انتقل لـ Phase 6.
