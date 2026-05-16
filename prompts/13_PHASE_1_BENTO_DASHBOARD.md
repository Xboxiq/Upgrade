# 🍱 WORKER 13 — Phase 1/3 — Bento Dashboard (إنجاز Worker 12 / Phase 5 الفعلي)
> **اقرأ أولاً:** `prompts/13_WORKER_AURORA_COMPLETION.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Worker 12 (الـ CSS لـ Bento + الـ JS لـ identity/greet/countup كلهم موجودين، فقط الـ HTML markup ينقصه).
> **الفلسفة:** الـ JS من Worker 12 جاهز ينتظر markup. هذا الـ phase يربط الجسر بين الـ API والـ DOM.

---

## 🛡️ Preservation Contract (Phase 1)

| العملية | المسموح | الممنوع |
|---|---|---|
| `<section id="page-dashboard">` (markup داخلي) | **تغليف** بـ `<div class="bento">` + إضافة articles جديدة. **الإبقاء** على `#cath-skill-grid` و `#cath-activity-list` مع كل `data-cath-stat` بالداخل (Worker 11 state يستعلم عنها) | حذف أي `id` أو `[data-cath-stat]`. تغيير ترتيب الصفحات. لمس بقية الـ 15 صفحة |
| `style.css` | لا تعديل (الـ Bento CSS من Worker 12 موجود وكامل) | تعديل أي قاعدة `.bento`, `.bento-greet`, `.stat-tile`, `.dock`, identity tints |
| `app.js` | لا تعديل (Upg.identity/greet/countup كلهم جاهزون ينتظرون markup) | تعديل أي IIFE. كسر أي event listener |

**Sacred preserved:**
- `[data-cath-stat="unitsCompleted"]`, `[data-cath-stat="avgCompletionRate"]`, `[data-cath-stat="trainingHours"]`, `[data-cath-stat="streak"]` ← لازم تبقى
- `#cath-skill-grid` و `#cath-activity-list` ← Worker 11 يحدّثها
- `welcome-banner` و `cath-dash` legacy ← **يُغلَّفان داخل bento articles** (لا حذف، لا استبدال)

---

## 🎯 الهدف

Phase 5 من Worker 12 ادّعى إعادة بناء `#page-dashboard` بـ Bento markup. الـ CSS كُتب فعلاً، الـ JS كُتب فعلاً، لكن الـ HTML لم يُلمس. النتيجة: الـ dashboard لا زال يعرض الشكل القديم رغم أن كل البنية التحتية جاهزة.

**Worker 13 / Phase 1 ينجز هذا:**
1. **يحوّل** markup `#page-dashboard` إلى Bento 12-col grid.
2. **يضيف** Greeting Hero (`[data-greet-title]`) — `Upg.greet` يحدّثه تلقائياً.
3. **يضيف** stat tiles بـ `[data-countup]` — `Upg.countup` يحرّكها.
4. **يحافظ** على `#cath-skill-grid` و `#cath-activity-list` كـ Bento children.
5. **يضيف** Dock بـ 6 quick actions.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 1 PRE-FLIGHT
├─ Phase: 1/3 — Bento Dashboard
├─ Estimated lines: ~520 (HTML mostly)
├─ Files to touch:
│   └─ platform/index.html  (إعادة هيكلة #page-dashboard فقط)
├─ Files NOT touched: style.css, app.js, بقية الـ pages
├─ Sacred IDs preserved: cath-skill-grid, cath-activity-list, all data-cath-stat
└─ Branch: worker-13-aurora-completion (ينشأ من main).
```

---

## 🧱 خطوات التنفيذ

### Step 1 — التحقق من الحالة الحالية

```bash
# قبل أي تعديل، تأكد من الواقع:
grep -c 'class="bento' platform/index.html        # توقع: 0
grep -c 'data-greet-title' platform/index.html    # توقع: 0
grep -c 'data-countup' platform/index.html        # توقع: 0
grep -c 'data-cath-stat' platform/index.html      # توقع: 8 (لازم تبقى ≥ 4 بعد التعديل)
grep -c 'cath-skill-grid' platform/index.html     # توقع: 1 (لازم يبقى)
grep -c 'cath-activity-list' platform/index.html  # توقع: 1 (لازم يبقى)
```

### Step 2 — قراءة الـ markup الحالي

اقرأ السطور التي تبدأ من `<section class="page active" id="page-dashboard">` حتى أول `<section class="page" id="page-callcenter">` (سطر ~660 إلى ~900 تقريباً).

داخل هذه المنطقة لاحظ ثلاثة عناصر:
- `<section class="cath-dash" data-cath-dash …>` — يحوي stats + skill-grid + activity-list (من Worker 11).
- `<div class="welcome-banner">` — هيرو legacy v12.
- ربما `<div class="grid-4">` — stats legacy v12.

**القاعدة:** سنُغلّف الكل في Bento، لا نحذف.

### Step 3 — استبدال markup `#page-dashboard`

استبدل **محتوى** `<section class="page active" id="page-dashboard">…</section>` (من فتح الـ section إلى إغلاقه) بـ:

```html
<section class="page active" id="page-dashboard">
  <div class="bento">

    <!-- Hero Greet — 2x1 (Upg.greet يكتب فيه time-of-day greeting) -->
    <article class="bento-greet b-2x1">
      <span class="h-eyebrow">لوحة التحكم</span>
      <h1 data-greet-title>أهلاً بعودتك</h1>
      <p data-greet-sub>تابع رحلتك التدريبية — اليوم خطوة جديدة بانتظارك.</p>
    </article>

    <!-- Stat tile #1 — Units completed -->
    <article class="stat-tile b-1x1">
      <div class="stat-tile-icon"><i class="qi" data-icon="check-circle"></i></div>
      <div class="stat-tile-value u-num" data-countup data-cath-stat="unitsCompleted">0</div>
      <div class="stat-tile-label">وحدة مُكتملة</div>
      <span class="stat-tile-trend is-up"><i class="qi" data-icon="trending-up"></i> +3 هذا الأسبوع</span>
    </article>

    <!-- Stat tile #2 — Avg completion rate -->
    <article class="stat-tile b-1x1">
      <div class="stat-tile-icon"><i class="qi" data-icon="bar-chart"></i></div>
      <div class="stat-tile-value u-num"><span data-countup data-cath-stat="avgCompletionRate">0</span>%</div>
      <div class="stat-tile-label">معدل الإتمام</div>
      <span class="stat-tile-trend is-up"><i class="qi" data-icon="trending-up"></i> +5%</span>
    </article>

    <!-- Skill tree — 2x1 (Worker 11 يحدّث #cath-skill-grid تلقائياً) -->
    <article class="b-2x1 dashboard-skills">
      <div class="dashboard-card-header">
        <h2 class="h-card"><i class="qi" data-icon="layout-dashboard"></i> شجرة المهارات</h2>
        <button class="cath-card-link" type="button" data-page="myprogress">عرض التفاصيل ←</button>
      </div>
      <div class="cath-skill-grid" id="cath-skill-grid"></div>
    </article>

    <!-- Activity feed — 2x1 (Worker 11 يحدّث #cath-activity-list تلقائياً) -->
    <article class="b-2x1 dashboard-activity">
      <h2 class="h-card dashboard-card-title">
        <i class="qi" data-icon="trending-up"></i> آخر النشاط
      </h2>
      <ul class="cath-activity-list" id="cath-activity-list"></ul>
    </article>

    <!-- Stat tile #3 — Training hours -->
    <article class="stat-tile b-1x1">
      <div class="stat-tile-icon"><i class="qi" data-icon="clock"></i></div>
      <div class="stat-tile-value u-num" data-countup data-cath-stat="trainingHours">0</div>
      <div class="stat-tile-label">ساعة تدريب</div>
    </article>

    <!-- Stat tile #4 — Streak -->
    <article class="stat-tile b-1x1">
      <div class="stat-tile-icon"><i class="qi" data-icon="flame"></i></div>
      <div class="stat-tile-value u-num" data-countup data-cath-stat="streak">0</div>
      <div class="stat-tile-label">يوم streak</div>
    </article>

    <!-- Dock — 6 quick actions، صف كامل -->
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

  </div>
</section>
```

### Step 4 — Bridge CSS صغير لـ dashboard cards

الـ Bento utilities موجودة من Worker 12. لكن لقواعد العنوان داخل bento children نحتاج إضافة صغيرة في `style.css` (في القسم الأخير، قبل media queries):

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15.1 — Dashboard Card Utilities (Worker 13 / Phase 1)
   ═══════════════════════════════════════════════════════════════ */
.dashboard-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}
.dashboard-card-title {
  margin: 0 0 var(--space-4) 0;
}
.dashboard-skills .cath-skill-grid,
.dashboard-activity .cath-activity-list {
  margin-top: 0;
}
```

> **ملاحظة:** هذي الإضافة الوحيدة على style.css في هذا الـ phase. كل بقية الـ Bento utilities موجودة من Worker 12 / Phase 5 (الـ CSS فقط، الـ HTML هو اللي ما اتطبق).

### Step 5 — التحقق الفوري بعد التعديل

```bash
# Sacred IDs لا زالوا موجودين:
grep -c "cath-skill-grid" platform/index.html       # توقع: 1
grep -c "cath-activity-list" platform/index.html    # توقع: 1
grep -c "data-cath-stat" platform/index.html        # توقع: 4 (الأربعة في bento)

# Bento markup الآن موجود:
grep -c 'class="bento"' platform/index.html         # توقع: 1
grep -c 'data-greet-title' platform/index.html      # توقع: 1
grep -c 'data-countup' platform/index.html          # توقع: ≥ 4
grep -c 'class="dock"' platform/index.html          # توقع: 1

# Pages count لم يتغير:
grep -c '<section class="page' platform/index.html  # توقع: 16

# qcalc references لم يتغير:
grep -c "qcalc" platform/index.html                 # توقع: 391
```

### Step 6 — اختبار يدوي في المتصفح

1. افتح `platform/index.html` (أو `test.html` بعد إعادة البناء).
2. لازم ترى:
   - Greeting hero بأعلى يسار (RTL: أعلى يمين) فيه "صباح الخير، {اسمك}" (يتغير حسب الوقت).
   - 4 stat tiles بأرقام تعدّ من 0 لقيمتها الحقيقية.
   - شجرة المهارات (skill grid) كما من Worker 11.
   - Activity feed كما من Worker 11.
   - Dock بـ 6 أزرار في الأسفل.
3. على ≤ 980px: كل bento children تنطبق على عمود واحد.
4. على ≤ 720px: dock يصير 3 أعمدة بدلاً من 6.
5. Zero console errors.

---

## ✅ Acceptance Criteria

- [ ] `grep -c 'class="bento"' platform/index.html` = 1
- [ ] `grep -c 'data-greet-title' platform/index.html` = 1
- [ ] `grep -c 'data-countup' platform/index.html` ≥ 4
- [ ] `grep -c 'class="dock"' platform/index.html` = 1
- [ ] `grep -c "cath-skill-grid" platform/index.html` = 1 (لازم يبقى)
- [ ] `grep -c "cath-activity-list" platform/index.html` = 1 (لازم يبقى)
- [ ] `grep -c '<section class="page' platform/index.html` = 16 (لم يتغير)
- [ ] dashboard يعرض شكل Bento الجديد، ليس welcome-banner القديم
- [ ] Time-of-day greeting يظهر (اختبر بـ open في 9 صباحاً، 3 عصراً، 9 مساءً — أو غيّر ساعة الجهاز)
- [ ] Count-up animation يعمل عند ظهور stat tiles في viewport
- [ ] Dock buttons تنقل لصفحات صحيحة عند click
- [ ] Console: 0 errors

---

## 🛡️ في نهاية الـ Phase

```
1. commit  : "phase 1 (worker 13): bento dashboard markup — bridges Upg.greet/countup/identity to DOM"
2. push    : worker-13-aurora-completion → origin
3. update  : state/PROGRESS.json (current.worker="13", phase=1, status="in-progress")
4. snapshot: state/snapshots/worker-13-phase-1.json
5. commit  : "state: worker 13 phase 1 committed and pushed"
6. push    : ثاني push
```

**التالي:** `prompts/13_PHASE_2_INLINE_PURGE_FOR_REAL.md`.

— نهاية Phase 1.
