# 🍱 WORKER 13 — Phase 1/3 — Bento Dashboard (إنجاز Worker 12 / Phase 5 الفعلي)
> **اقرأ أولاً:** `prompts/13_WORKER_AURORA_COMPLETION.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Worker 12 (CSS لـ Bento + JS لـ identity/greet/countup كلهم موجودين، فقط الـ HTML markup ينقصه).
> **الفلسفة:** الـ JS من Worker 12 جاهز ينتظر markup. هذا الـ phase يربط الجسر بين الـ API والـ DOM، **مع الحفاظ على كل feature موجود**.

---

## 🛡️ Preservation Contract (Phase 1) — مُحدَّث بأرقام مرجعية فعلية

### نطاق التعديل المُحدَّد بدقة

```
Section: <section class="page active" id="page-dashboard">
Lines:   660 → 1018  (359 lines total)
File:    platform/index.html
```

**هذا هو النطاق الوحيد المسموح تعديله في Phase 1. أي سطر خارج 660-1018 = ممنوع.**

### الـ 7 IDs المقدّسة (Sacred IDs) — حذف أي واحد = كسر JS

تحقّق منها بعد التعديل:

| ID | يستعلمها | السبب |
|---|---|---|
| `#cath-skill-grid` | Worker 11 (`Upg.state.compute.workerStats()`) | يحدّث شجرة المهارات |
| `#cath-activity-list` | Worker 11 (`Upg.state.activity()`) | feed آخر النشاطات |
| `#v12Heatmap` | `app.js:3379` (legacy v12) | heatmap calendar — لو حذفته يكسر `getElementById` |
| `#v12ChallengeLevel` | `app.js:3450` (legacy v12) | تحدّي يومي — مستوى |
| `#v12ChallengeBody` | `app.js:3451` (legacy v12) | تحدّي يومي — body |
| `[data-cath-stat="unitsCompleted"]` (×1) | Worker 11 state binding | عدد الوحدات |
| `[data-cath-stat="avgCompletionRate"]` (×1) | Worker 11 state binding | معدل الإتمام |
| `[data-cath-stat="trainingHours"]` (×1) | Worker 11 state binding | ساعات التدريب |
| `[data-cath-stat="streak"]` (×1) | Worker 11 state binding | streak |

**القاعدة:** كل 9 العناصر أعلاه يجب أن **تبقى موجودة في الـ DOM بعد التعديل**. ممكن تكون داخل containers جديدة (Bento articles)، لكنها ما تختفي.

### العمليات المسموحة (3 فقط)

| العملية | المسموح | الممنوع |
|---|---|---|
| **WRAP** | تغليف العناصر الموجودة بـ `<article class="bento-* b-NxM">` containers جديدة | حذف أي عنصر يحوي ID مقدّس |
| **APPEND** | إضافة greeting hero, dock, و bento-greet في بداية `.bento` (قبل الـ legacy elements) | تكرار IDs موجودة |
| **AUGMENT** | إضافة class جديد على عنصر موجود (مثل إضافة `b-1x1` على `.cath-stat`) | تغيير id أو data-cath-stat values |

### العمليات الممنوعة قطعياً

- ❌ **حذف** `#v12Heatmap` أو `#v12ChallengeLevel` أو `#v12ChallengeBody` — يكسر JS
- ❌ **حذف** `cath-dash` markup كاملاً — يحتوي على `[data-cath-stat]` المطلوبة
- ❌ **حذف** `welcome-banner` — قد يحتوي على content يستعمله المستخدم
- ❌ **rewrite-from-scratch** للـ section — استبدال 359 سطر بـ 50 سطر = خسارة محتوى
- ❌ تكرار `id="cath-skill-grid"` أو أي ID آخر (HTML invalid)
- ❌ لمس أي phase خارج `#page-dashboard` (الـ 15 صفحة الأخرى)

---

## 🎯 الهدف

PR #44 ادّعى تنفيذ Bento في `#page-dashboard`. الفحص الفعلي بـ grep على main:
```
class="bento"        : 0  (في #page-dashboard)
data-greet-title     : 0
data-countup         : 0
class="dock"         : 0
```

CSS و JS من Worker 12 موجودة وتعمل. **فقط الـ HTML markup الذي يربطها بالـ DOM ناقص**.

**Worker 13 / Phase 1 يفعل التالي:**
1. **يضيف** `<div class="bento">` كـ container أب جديد داخل `#page-dashboard`.
2. **يضيف** greeting hero (`bento-greet`) في بداية الـ Bento — `Upg.greet` يحدّثه.
3. **يضيف** stat tiles بـ `[data-countup]` — `Upg.countup` يحرّكها (لكن الـ values تبقى من `[data-cath-stat]` الموجودة).
4. **يضيف** Dock بـ 6 quick actions في نهاية الـ Bento.
5. **يُغلّف** الـ legacy components (`cath-dash`, `welcome-banner`, `v12-heatmap`, `v12-challenge`) في bento articles بـ class `b-Nx1` بدون لمس محتواها الداخلي.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 1 PRE-FLIGHT
├─ Phase: 1/3 — Bento Dashboard
├─ Estimated lines: ~520 (HTML mostly)
├─ Files to touch:
│   └─ platform/index.html (lines 660-1018 only — #page-dashboard section)
├─ Files NOT touched: style.css, app.js, sw.js, manifest, favicon, all 15 other pages
├─ Sacred IDs preserved (verify after): cath-skill-grid, cath-activity-list,
│   v12Heatmap, v12ChallengeLevel, v12ChallengeBody, all 4 [data-cath-stat]
└─ Branch: continue/create worker-13-aurora-completion-impl from main.
```

---

## 🧱 خطوات التنفيذ

### Step 0 — Pre-flight verification (إجباري قبل أي edit)

```bash
echo "=== BEFORE: Sacred IDs in #page-dashboard ==="
awk '/<section class="page active" id="page-dashboard">/,/<section class="page" id="page-callcenter">/' platform/index.html > /tmp/dashboard-before.html
echo "  cath-skill-grid:        $(grep -c 'id="cath-skill-grid"' /tmp/dashboard-before.html)  (target = 1)"
echo "  cath-activity-list:     $(grep -c 'id="cath-activity-list"' /tmp/dashboard-before.html)  (target = 1)"
echo "  v12Heatmap:             $(grep -c 'id="v12Heatmap"' /tmp/dashboard-before.html)  (target = 1)"
echo "  v12ChallengeLevel:      $(grep -c 'id="v12ChallengeLevel"' /tmp/dashboard-before.html)  (target = 1)"
echo "  v12ChallengeBody:       $(grep -c 'id="v12ChallengeBody"' /tmp/dashboard-before.html)  (target = 1)"
echo "  data-cath-stat (4 keys):$(grep -cE 'data-cath-stat="(unitsCompleted|avgCompletionRate|trainingHours|streak)"' /tmp/dashboard-before.html)  (target = 4)"
echo ""
echo "=== BEFORE: Bento markers (should all be 0) ==="
echo "  class=\"bento\":          $(grep -c 'class="bento"' /tmp/dashboard-before.html)"
echo "  data-greet-title:       $(grep -c 'data-greet-title' /tmp/dashboard-before.html)"
echo "  data-countup:           $(grep -c 'data-countup' /tmp/dashboard-before.html)"
echo "  class=\"dock\":           $(grep -c 'class="dock"' /tmp/dashboard-before.html)"
```

**لا تكمل لو أي target قبل التعديل ≠ القيمة المتوقعة.** هذا يعني أن main تغير وتحتاج تحديث Phase 1.

### Step 1 — استراتيجية التعديل: Augment-and-Wrap (لا rewrite)

**النهج:** بدل ما نستبدل 359 سطر، نُحيط المحتوى الموجود بـ wrapper Bento ونضيف عناصر جديدة في بداية ونهاية الـ wrapper.

#### الهيكل المستهدف:

```html
<section class="page active" id="page-dashboard">
  <div class="bento">

    <!-- A: NEW — Greeting Hero (b-2x1) -->
    <article class="bento-greet b-2x1">
      <span class="h-eyebrow">لوحة التحكم</span>
      <h1 data-greet-title>أهلاً بعودتك</h1>
      <p data-greet-sub>تابع رحلتك التدريبية…</p>
    </article>

    <!-- B: NEW — 4 stat tiles (b-1x1 × 4) — count-up wrapper around existing data-cath-stat -->
    <!-- (تُنشأ كأخوات للـ cath-dash، تستهدف نفس bind keys) -->

    <!-- C: WRAPPED — كل المحتوى الموجود من 660 إلى 1017 يبقى لكن مغلَّف -->
    <article class="b-4x1 dashboard-legacy-wrapper">
      <!-- … cath-dash, welcome-banner, v12-heatmap, v12-challenge … -->
      <!-- (existing content, untouched, just wrapped) -->
    </article>

    <!-- D: NEW — Dock (b-4x1) -->
    <nav class="dock b-4x1" aria-label="إجراءات سريعة">…</nav>

  </div>
</section>
```

**الفائدة:**
- لا حذف لأي عنصر.
- IDs المقدّسة كلها تبقى في `[data-cath-stat]` الأصلية داخل `cath-dash`.
- الـ Bento يلفّ الكل، فيظهر بالشكل الجديد.
- لو خربنا شي، نقدر نسوي rollback بدقة.

### Step 2 — تطبيق التعديل (4 إدخالات محددة)

افتح `platform/index.html`. حدد السطور بدقة:
- **السطر 660:** بداية `<section class="page active" id="page-dashboard">`
- **السطر 1017 أو 1018:** نهاية `</section>` للـ dashboard (قبل `<section class="page" id="page-callcenter">`)

تأكد من النهاية بـ:
```bash
awk '/<section class="page active" id="page-dashboard">/{found=1; start=NR}
     found && /<section class="page" id="page-callcenter">/{print "section ends at line:", NR-1; exit}' platform/index.html
```

#### إدخال A: بعد `<section class="page active" id="page-dashboard">` مباشرة

أدرج:
```html
    <div class="bento">

      <!-- W13/Phase 1: Bento Greeting Hero (Upg.greet يحدّثه time-of-day) -->
      <article class="bento-greet b-2x1">
        <span class="h-eyebrow">لوحة التحكم</span>
        <h1 data-greet-title>أهلاً بعودتك</h1>
        <p data-greet-sub>تابع رحلتك التدريبية — اليوم خطوة جديدة بانتظارك.</p>
      </article>

      <!-- W13/Phase 1: 4 count-up stat tiles (يستعرضون نفس [data-cath-stat] الموجودة في cath-dash لكن بـ markup جديد) -->
      <article class="stat-tile b-1x1">
        <div class="stat-tile-icon"><i class="qi" data-icon="check-circle"></i></div>
        <div class="stat-tile-value u-num"><span data-countup data-cath-stat="unitsCompleted">0</span></div>
        <div class="stat-tile-label">وحدة مُكتملة</div>
        <span class="stat-tile-trend is-up"><i class="qi" data-icon="trending-up"></i> +3 هذا الأسبوع</span>
      </article>

      <article class="stat-tile b-1x1">
        <div class="stat-tile-icon"><i class="qi" data-icon="bar-chart"></i></div>
        <div class="stat-tile-value u-num"><span data-countup data-cath-stat="avgCompletionRate">0</span>%</div>
        <div class="stat-tile-label">معدل الإتمام</div>
        <span class="stat-tile-trend is-up"><i class="qi" data-icon="trending-up"></i> +5%</span>
      </article>

      <article class="stat-tile b-1x1">
        <div class="stat-tile-icon"><i class="qi" data-icon="clock"></i></div>
        <div class="stat-tile-value u-num"><span data-countup data-cath-stat="trainingHours">0</span></div>
        <div class="stat-tile-label">ساعة تدريب</div>
      </article>

      <article class="stat-tile b-1x1">
        <div class="stat-tile-icon"><i class="qi" data-icon="alert-triangle"></i></div>
        <div class="stat-tile-value u-num"><span data-countup data-cath-stat="streak">0</span></div>
        <div class="stat-tile-label">يوم streak</div>
      </article>

      <!-- W13/Phase 1: Legacy wrapper (cath-dash + welcome-banner + v12-heatmap + v12-challenge) -->
      <article class="b-4x1 dashboard-legacy">
```

#### إدخال B: قبل `</section>` (نهاية #page-dashboard) مباشرة

أدرج:
```html
      </article><!-- /.dashboard-legacy -->

      <!-- W13/Phase 1: Quick Dock (6 actions) -->
      <nav class="dock b-4x1" aria-label="إجراءات سريعة">
        <button class="dock-btn" type="button" data-page="callcenter">
          <i class="qi" data-icon="phone"></i><span>مكالمة</span>
        </button>
        <button class="dock-btn" type="button" data-page="hrmastery">
          <i class="qi" data-icon="briefcase"></i><span>مقابلة</span>
        </button>
        <button class="dock-btn" type="button" data-page="accounting">
          <i class="qi" data-icon="calculator"></i><span>حاسبة راتب</span>
        </button>
        <button class="dock-btn" type="button" data-page="psych">
          <i class="qi" data-icon="brain"></i><span>اختبار</span>
        </button>
        <button class="dock-btn" type="button" data-page="lab">
          <i class="qi" data-icon="flask-conical"></i><span>سيناريو</span>
        </button>
        <button class="dock-btn" type="button" data-page="myprogress">
          <i class="qi" data-icon="bar-chart"></i><span>تقدمي</span>
        </button>
      </nav>

    </div><!-- /.bento -->
```

> **خلاصة التعديل:** فقط فتح `<div class="bento">` + 5 articles جديدة + `<article class="b-4x1 dashboard-legacy">` open في البداية، ثم close + dock + close `</div>` في النهاية. **كل المحتوى بين 660 و 1018 يبقى كما هو** فقط ملفوف الآن في `.dashboard-legacy`.

### Step 3 — ⚠️ مشكلة الـ duplicate data-cath-stat

بعد إدخال A، كل `[data-cath-stat]` سيكون موجود **مرتين**:
- المرة الأولى: في الـ stat tiles الجديدة (top of bento)
- المرة الثانية: داخل `.cath-dash` المُغلَّف (legacy)

`Upg.state` يستعمل `querySelectorAll('[data-cath-stat]')` فيحدّث **كلاهما** — يعني الأرقام ستظهر مرتين بقيم متطابقة. هذا **سلوك صحيح**، ليس خطأ.

**لكن:** الـ legacy `.cath-dash` كاملة (مع نسختها من الـ stats) ستبدو متكررة بصرياً. الحل **في Phase 1**: نُخفي بصرياً `.cath-dash > .cath-dash-stats` فقط، مع إبقائها في الـ DOM.

أضف في `style.css` (نهاية الملف):
```css
/* W13/Phase 1: hide legacy stat row (preserved in DOM for state binding) */
.dashboard-legacy .cath-dash-stats { display: none; }
```

> **هذا هو التعديل الوحيد على CSS في Phase 1.** كل بقية الـ Bento CSS موجود من Worker 12.

### Step 4 — Post-edit verification (إجباري قبل commit)

```bash
echo "=== AFTER: Sacred IDs (must be IDENTICAL to BEFORE) ==="
awk '/<section class="page active" id="page-dashboard">/,/<section class="page" id="page-callcenter">/' platform/index.html > /tmp/dashboard-after.html
echo "  cath-skill-grid:        $(grep -c 'id="cath-skill-grid"' /tmp/dashboard-after.html)  (target = 1)"
echo "  cath-activity-list:     $(grep -c 'id="cath-activity-list"' /tmp/dashboard-after.html)  (target = 1)"
echo "  v12Heatmap:             $(grep -c 'id="v12Heatmap"' /tmp/dashboard-after.html)  (target = 1)"
echo "  v12ChallengeLevel:      $(grep -c 'id="v12ChallengeLevel"' /tmp/dashboard-after.html)  (target = 1)"
echo "  v12ChallengeBody:       $(grep -c 'id="v12ChallengeBody"' /tmp/dashboard-after.html)  (target = 1)"

echo ""
echo "=== AFTER: Bento markers (must all increase) ==="
echo "  class=\"bento\":          $(grep -c 'class="bento"' /tmp/dashboard-after.html)  (target = 1)"
echo "  data-greet-title:       $(grep -c 'data-greet-title' /tmp/dashboard-after.html)  (target = 1)"
echo "  data-countup:           $(grep -c 'data-countup' /tmp/dashboard-after.html)  (target = 4)"
echo "  class=\"dock\":           $(grep -c 'class="dock"' /tmp/dashboard-after.html)  (target = 1)"

echo ""
echo "=== AFTER: data-cath-stat now appears TWICE (new + legacy, both bind correctly) ==="
echo "  data-cath-stat total:   $(grep -cE 'data-cath-stat=' /tmp/dashboard-after.html)  (target = 8 = 4 new + 4 legacy)"

echo ""
echo "=== AFTER: Global counts (must NOT change) ==="
echo "  page sections:          $(grep -c '<section class="page' platform/index.html)  (target = 16)"
echo "  qcalc refs:             $(grep -c 'qcalc' platform/index.html)  (target = 391)"
```

**Acceptance:** كل القيم لازم تطابق targets. لو واحد فشل → rollback (`git checkout platform/index.html`) وحلل قبل المحاولة الثانية.

### Step 5 — اختبار يدوي في المتصفح

1. افتح `platform/index.html` (أو `test.html` بعد إعادة بناء بـ `node scripts/build-test-html.mjs`).
2. لازم ترى:
   - في أعلى dashboard: greeting "صباح/مساء الخير، {اسمك}".
   - 4 stat tiles بأرقام تعدّ من 0 لقيمتها الحقيقية.
   - بعدها: المحتوى القديم كله (cath-dash بدون stats row + welcome-banner + heatmap + challenge).
   - في الأسفل: Dock بـ 6 أزرار.
3. اضغط على كل زر في الـ dock — لازم ينقل لـ صفحته.
4. تأكد أن heatmap لا زال يعرض calendar.
5. تأكد أن challenge card لا زال يعمل.
6. **Console = 0 errors.**

---

## ✅ Acceptance Criteria

- [ ] `class="bento"` في #page-dashboard = **1**
- [ ] `data-greet-title` = **1**
- [ ] `data-countup` = **4**
- [ ] `class="dock"` = **1**
- [ ] `id="cath-skill-grid"` = **1** (preserved)
- [ ] `id="cath-activity-list"` = **1** (preserved)
- [ ] `id="v12Heatmap"` = **1** (preserved — JS hook in app.js:3379)
- [ ] `id="v12ChallengeLevel"` = **1** (preserved — JS hook in app.js:3450)
- [ ] `id="v12ChallengeBody"` = **1** (preserved — JS hook in app.js:3451)
- [ ] `data-cath-stat=` total = **8** (4 new + 4 legacy, both bind to same values)
- [ ] `<section class="page` = **16** (no page lost)
- [ ] dashboard في المتصفح يعرض: greeting → 4 stats → legacy content → dock
- [ ] zero console errors
- [ ] heatmap calendar لا زال يرسم نفسه
- [ ] challenge card لا زال يعمل
- [ ] kل dock buttons تنقل لصفحات صحيحة

---

## 🛡️ في نهاية الـ Phase

```
1. branch    : worker-13-aurora-completion-impl (من main)
2. commit    : "phase 1 (worker 13): bento dashboard wrapper — preserves all 5 sacred IDs + 4 cath-stat bindings"
3. push      : worker-13-aurora-completion-impl → origin
4. update    : state/PROGRESS.json (current.worker="13", phase="1", status="in-progress")
5. snapshot  : state/snapshots/worker-13-phase-1.json (مع before/after grep counts)
6. commit    : "state: worker 13 phase 1 verified and committed"
7. push      : 2nd push
```

> **PR description rule:** انسخ output الـ verification في Step 4 حرفياً في الـ PR body. لا تكتب أرقاماً غير متحققة.

**التالي:** `prompts/13_PHASE_2_INLINE_PURGE_FOR_REAL.md` (في session جديد).

— نهاية Phase 1.
