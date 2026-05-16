# 🍱 WORKER 14 — Phase 3/6 — Dashboard Bento Consolidation
> **اقرأ أولاً:** `prompts/14_WORKER_ATELIER_LIQUID_GLASS.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Phase 1 (Liquid Glass v2) + Phase 2 (Page Headers).
> **الفلسفة:** الـ dashboard هو واجهة المنصة بأكملها مكثّفة. لو فيه 6 أقسام مكرّرة، فقدت الزائر في 5 ثوان.

---

## 🛡️ Preservation Contract (Phase 3) — حساس جداً

> هذا أحد أصعب الـ phases في كامل Worker 14. الفشل = كسر `Upg.state.compute.workerStats()` و `app.js:3379, 3450, 3451`.

| العملية | المسموح | الممنوع |
|---|---|---|
| `<section id="page-dashboard">` | **REPLACE-IN-PLACE** للـ inner content بحرفية: نُلغي `dashboard-legacy` wrapper الكامل، ننقل عناصره الـ "sacred" إلى Bento containers جديدة | حذف أي عنصر يحوي ID مقدّس بدون نقله |
| كل بقية الـ pages | **لا تلمس** | أي تعديل خارج `#page-dashboard` |
| `style.css` | **APPEND** قواعد جديدة (`.dock`, `.bento-skill`, `.bento-activity`, `.bento-quick`) — أو استكمال الـ utilities الموجودة | حذف قواعد bento موجودة من Worker 13 / Phase 1 |
| `app.js` | لا تغيير في APIs. مسموح **APPEND** IIFE صغير لربط dock buttons بـ `navigateTo()` لو needed | تعديل `Upg.state` أو `Upg.greet` أو `Upg.countup` الموجودة |

### 🔐 الـ 9 Sacred Elements اللي **لا** يحقّ حذفها (يمكن نقلها لتموضع جديد فقط)

| Element | يستعلمها | كيف نحفظها |
|---|---|---|
| `[data-cath-stat="unitsCompleted"]` | Worker 11 state binding | يبقى كـ `<span>` داخل stat-tile جديد (موجود حالياً في Bento) |
| `[data-cath-stat="avgCompletionRate"]` | Worker 11 state binding | نفس الشيء |
| `[data-cath-stat="trainingHours"]` | Worker 11 state binding | نفس الشيء |
| `[data-cath-stat="streak"]` | Worker 11 state binding | نفس الشيء |
| `#cath-skill-grid` | `Upg.state.compute.workerStats()` يحدّثه | ينتقل لـ `<article class="bento-skill b-2x2">` |
| `#cath-activity-list` | `Upg.state.activity()` يحدّثه | ينتقل لـ `<article class="bento-activity b-2x2">` |
| `#v12Heatmap` | `app.js:3379` (legacy v12) | ينتقل لـ `<article class="bento-heatmap b-4x1">` (لو موجود في الكود الحالي ضمن legacy) |
| `#v12ChallengeLevel` | `app.js:3450` | يبقى داخل `bento-challenge` |
| `#v12ChallengeBody` | `app.js:3451` | يبقى داخل `bento-challenge` |

> **القاعدة الذهبية:** بعد Phase 3، `grep -c 'data-cath-stat\|cath-skill-grid\|cath-activity-list\|v12Heatmap\|v12Challenge' platform/index.html` يجب أن يساوي تماماً نفس العدد قبل التعديل.

---

## 🎯 الهدف

**الوضع الحالي** (مشكلة فعلية مرئية):
```
#page-dashboard
├─ .bento (Worker 13/P1 جديد)
│   ├─ .bento-greet (greeting hero)
│   ├─ 4× .stat-tile (countup tiles)
│   └─ .b-4x1.dashboard-legacy ← 👇 يحتوي تكرار كامل 👇
│       ├─ .page-header (h1: "مرحباً بك في لوحة التحكم 👋")
│       ├─ .cath-dash (header greeting + 4× cath-stat + skill-grid + activity-list + quick-actions)
│       ├─ .welcome-banner (hero ثاني)
│       ├─ .grid-4 .stat-card×4 (4 stats ثالثة)
│       ├─ .grid-2 (modules-grid + sidebar cards)
│       └─ ...
```

النتيجة: **3 hero sections** + **3 sets of stats** + **module grids مكررة** = ضوضاء بصرية.

**الوضع المستهدف:**
```
#page-dashboard
└─ .bento (الوحيدة)
    ├─ .bento-greet b-4x1   (greeting hero واحد)
    ├─ .stat-tile b-1x1 ×4  (4 countup tiles موحّدة - مع data-cath-stat)
    ├─ .bento-skill b-2x2   (#cath-skill-grid هنا)
    ├─ .bento-activity b-2x2 (#cath-activity-list هنا)
    ├─ .bento-heatmap b-4x1  (#v12Heatmap هنا — لو موجود)
    ├─ .bento-challenge b-2x1 (#v12ChallengeLevel + #v12ChallengeBody)
    └─ .dock b-4x1           (6 quick action buttons)
```

8 خلايا. لا تكرار. كل sacred ID في تموضع واضح.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 3 PRE-FLIGHT
├─ Phase: 3/6 — Dashboard Bento Consolidation
├─ Estimated lines: ~580
├─ Files to touch:
│   ├─ platform/index.html         (REPLACE-IN-PLACE inner content of #page-dashboard, ~360 lines net)
│   └─ platform/assets/style.css   (APPEND bento-skill / bento-activity / bento-heatmap / bento-challenge / dock styles ~220 lines)
├─ Sacred verify (ANTES y DESPUÉS):
│   ├─ grep -c 'data-cath-stat="unitsCompleted"'    → 1 BEFORE = 1 AFTER (currently 2 bc duplicated)
│   ├─ grep -c '#cath-skill-grid'                    → ≥1 AFTER
│   ├─ grep -c '#cath-activity-list'                 → ≥1 AFTER
│   ├─ grep -c 'v12Heatmap'                          → preserved if existed
│   └─ grep -c '<section class="page"'              → 14
├─ Branch: continue worker-14-atelier
```

---

## 🧱 خطوات التنفيذ

### Step 1 — افحص الوضع الحالي بدقة

```bash
# اعرف بالضبط أين يبدأ #page-dashboard وأين ينتهي
grep -n '<section class="page active" id="page-dashboard"' platform/index.html
# سيعطيك السطر، مثلاً 672
# ثم اعرف أين ينتهي — ابحث عن </section> التالي على نفس مستوى التداخل
```

استخرج كل sacred IDs الموجودة فعلاً:

```bash
sed -n '672,1100p' platform/index.html | grep -oE 'data-cath-stat="[^"]+"|id="cath-[^"]+"|id="v12[^"]+"' | sort -u
```

> **ملاحظة:** PROGRESS.json يقول إن Worker 13/Phase 1 مرّت. لكن `dashboard-legacy` wrapper قد يكون عفوياً يحتوي عناصر جديدة. فحص فعلي قبل التعديل = إجباري.

### Step 2 — رسم الـ markup الجديد بدقة

استبدل **كامل المحتوى** بين `<section class="page active" id="page-dashboard">` و الـ `</section>` الخاص به بهذا الهيكل:

```html
<section class="page active" id="page-dashboard">

  <div class="bento" data-bento="dashboard">

    <!-- ══════ Bento Cell #1 — Greeting Hero (b-4x1) ══════ -->
    <article class="bento-greet b-4x1 material-regular">
      <span class="h-eyebrow">لوحة التحكم</span>
      <h1 data-greet-title>أهلاً بعودتك</h1>
      <p data-greet-sub class="h-lede">تابع رحلتك التدريبية — اليوم خطوة جديدة بانتظارك.</p>
    </article>

    <!-- ══════ Bento Cells #2-5 — 4 Stat Tiles (countup) ══════ -->
    <article class="stat-tile b-1x1 material-regular">
      <div class="stat-tile-icon"><i class="qi" data-icon="check-circle" aria-hidden="true"></i></div>
      <div class="stat-tile-value u-num"><span data-countup data-cath-stat="unitsCompleted">0</span></div>
      <div class="stat-tile-label">وحدة مُكتملة</div>
      <span class="stat-tile-trend is-up"><i class="qi" data-icon="trending-up" aria-hidden="true"></i> +3 هذا الأسبوع</span>
    </article>

    <article class="stat-tile b-1x1 material-regular">
      <div class="stat-tile-icon"><i class="qi" data-icon="bar-chart" aria-hidden="true"></i></div>
      <div class="stat-tile-value u-num"><span data-countup data-cath-stat="avgCompletionRate">0</span>%</div>
      <div class="stat-tile-label">معدل الإتمام</div>
      <span class="stat-tile-trend is-up"><i class="qi" data-icon="trending-up" aria-hidden="true"></i> +5%</span>
    </article>

    <article class="stat-tile b-1x1 material-regular">
      <div class="stat-tile-icon"><i class="qi" data-icon="clock" aria-hidden="true"></i></div>
      <div class="stat-tile-value u-num"><span data-countup data-cath-stat="trainingHours">0</span></div>
      <div class="stat-tile-label">ساعة تدريب</div>
    </article>

    <article class="stat-tile b-1x1 material-regular">
      <div class="stat-tile-icon"><i class="qi" data-icon="flame" aria-hidden="true"></i></div>
      <div class="stat-tile-value u-num"><span data-countup data-cath-stat="streak">0</span></div>
      <div class="stat-tile-label">يوم streak</div>
    </article>

    <!-- ══════ Bento Cell #6 — Skill Tree (b-2x2) ══════ -->
    <article class="bento-skill b-2x2 material-regular">
      <header class="bento-h">
        <h2><i class="qi" data-icon="layout-dashboard" aria-hidden="true"></i> شجرة المهارات</h2>
        <button class="bento-link" type="button" data-page="myprogress">عرض التفاصيل →</button>
      </header>
      <div class="cath-skill-grid" id="cath-skill-grid"></div>
    </article>

    <!-- ══════ Bento Cell #7 — Activity Feed (b-2x2) ══════ -->
    <article class="bento-activity b-2x2 material-regular">
      <header class="bento-h">
        <h2><i class="qi" data-icon="trending-up" aria-hidden="true"></i> آخر النشاط</h2>
      </header>
      <ul class="cath-activity-list" id="cath-activity-list"></ul>
    </article>

    <!-- ══════ Bento Cell #8 — Quick Actions Dock (b-4x1) ══════ -->
    <article class="dock b-4x1 material-regular">
      <header class="bento-h">
        <h2><i class="qi" data-icon="command" aria-hidden="true"></i> إجراءات سريعة</h2>
        <span class="dock-hint u-text-xs u-c-faint">Cmd+K للبحث الكامل</span>
      </header>
      <div class="dock-row">
        <button class="dock-btn" type="button" data-page="callcenter"><i class="qi qi-lg" data-icon="phone"></i><span>مكالمة تجريبية</span></button>
        <button class="dock-btn" type="button" data-page="hrmastery"><i class="qi qi-lg" data-icon="briefcase"></i><span>مقابلة وهمية</span></button>
        <button class="dock-btn" type="button" data-page="accounting"><i class="qi qi-lg" data-icon="calculator"></i><span>حاسبة الراتب</span></button>
        <button class="dock-btn" type="button" data-page="psych"><i class="qi qi-lg" data-icon="brain"></i><span>اختبار شخصية</span></button>
        <button class="dock-btn" type="button" data-page="lab"><i class="qi qi-lg" data-icon="flask-conical"></i><span>سيناريو عشوائي</span></button>
        <button class="dock-btn" type="button" data-page="myprogress"><i class="qi qi-lg" data-icon="bar-chart"></i><span>تقدمي الكامل</span></button>
      </div>
    </article>

    <!-- ══════ Bento Cell #9 (conditional) — v12 Challenge (b-2x1) ══════ -->
    <!-- إذا كان v12ChallengeLevel/Body موجودين في الكود الأصلي، احتفظ بهم هنا -->
    <article class="bento-challenge b-2x1 material-regular">
      <header class="bento-h">
        <h2><i class="qi" data-icon="zap" aria-hidden="true"></i> تحدي اليوم</h2>
        <span id="v12ChallengeLevel" class="bento-pill">—</span>
      </header>
      <div id="v12ChallengeBody" class="bento-body">
        <p class="u-c-muted">جاري تحميل تحدي اليوم…</p>
      </div>
    </article>

    <!-- ══════ Bento Cell #10 (conditional) — v12 Heatmap (b-2x1) ══════ -->
    <!-- إذا كان v12Heatmap موجود في الكود الأصلي، احتفظ بـ container هنا -->
    <article class="bento-heatmap b-2x1 material-regular">
      <header class="bento-h">
        <h2><i class="qi" data-icon="calendar" aria-hidden="true"></i> نشاط 30 يوم</h2>
      </header>
      <div id="v12Heatmap" class="heatmap-container"></div>
    </article>

  </div>

</section>
```

> **ملاحظة حرجة:** قبل الـ replace، تأكّد إن **كل** الـ IDs المُذكورة في الـ markup الجديد كانت موجودة في القديم. لو أحدها لم يكن موجوداً (مثل لو `v12Heatmap` غير موجود في الـ legacy)، احذف الخلية الـ conditional المقابلة من الـ markup الجديد. `grep -c 'v12Heatmap' platform/index.html` قبل التعديل يحدّد لك.

### Step 3 — CSS الجديد

**APPEND** في `style.css`:

```css
/* ═══════════════════════════════════════════════════════════════
   ATELIER v16 — Bento Cells & Dock (Worker 14 / Phase 3)
   ═══════════════════════════════════════════════════════════════ */

.bento-h {
  display: flex; align-items: center; justify-content: space-between;
  gap: var(--space-3, 12px);
  margin-block-end: var(--space-4, 16px);
  padding-block-end: var(--space-3, 12px);
  border-block-end: 1px solid var(--color-border);
}
.bento-h h2 {
  font-family: var(--font-display);
  font-size: var(--text-lg, 1.125rem);
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  display: inline-flex; align-items: center; gap: 0.5em;
}
.bento-h h2 .qi { color: var(--color-tint, var(--color-brand)); }

.bento-link {
  background: transparent;
  border: none;
  color: var(--color-tint, var(--color-brand));
  font-size: var(--text-sm, 0.875rem);
  font-weight: 600;
  cursor: pointer;
  padding: var(--space-1, 4px) var(--space-2, 8px);
  border-radius: var(--radius-sm, 6px);
  transition: background 200ms var(--ease-standard, ease);
}
.bento-link:hover {
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 10%, transparent);
}

.bento-pill {
  font-size: var(--text-xs, 0.78rem);
  font-weight: 700;
  padding: 2px 10px;
  border-radius: var(--radius-full, 999px);
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 12%, transparent);
  color: var(--color-tint, var(--color-brand));
  letter-spacing: 0.04em;
}

/* Skill grid container */
.bento-skill,
.bento-activity,
.bento-challenge,
.bento-heatmap {
  padding: var(--space-5, 20px);
}
.bento-skill .cath-skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--space-3, 12px);
}

/* Activity list */
.bento-activity .cath-activity-list {
  list-style: none;
  margin: 0; padding: 0;
  display: flex; flex-direction: column;
  gap: var(--space-2, 8px);
  max-height: 320px;
  overflow-y: auto;
}

/* Heatmap container */
.bento-heatmap .heatmap-container {
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  gap: 4px;
  min-height: 120px;
}

/* Dock button — refined */
.dock {
  padding: var(--space-5, 20px);
}
.dock .dock-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3, 12px);
  align-items: stretch;
}
.dock-btn {
  flex: 1 1 calc(16.666% - var(--space-3, 12px));
  min-width: 120px;
  display: flex; flex-direction: column; align-items: center;
  gap: var(--space-2, 8px);
  padding: var(--space-4, 16px);
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md, 12px);
  color: var(--color-text);
  cursor: pointer;
  transition: transform 200ms var(--ease-spring, cubic-bezier(0.5, 1.5, 0.5, 1)),
              background 200ms var(--ease-standard),
              box-shadow 200ms var(--ease-standard);
}
.dock-btn:hover {
  transform: translateY(-2px) scale(1.02);
  background: var(--color-surface-2);
  box-shadow: var(--shadow-c-md);
  border-color: color-mix(in oklch, var(--color-tint, var(--color-brand)) 30%, var(--color-border));
}
.dock-btn:active {
  transform: scale(0.98);
}
.dock-btn .qi {
  font-size: 1.5rem;
  color: var(--color-tint, var(--color-brand));
}
.dock-btn span {
  font-size: var(--text-sm, 0.875rem);
  font-weight: 500;
  text-align: center;
}

/* Mobile — dock collapses to 3 columns */
@media (max-width: 720px) {
  .dock-btn { flex: 1 1 calc(33.33% - var(--space-3, 12px)); }
  .bento { grid-template-columns: repeat(2, 1fr); }
  .b-4x1 { grid-column: span 2; }
  .b-2x2, .b-2x1 { grid-column: span 2; }
  .b-1x1 { grid-column: span 1; }
}

@media (max-width: 480px) {
  .dock-btn { flex: 1 1 calc(50% - var(--space-3, 12px)); }
}
```

### Step 4 — JS event delegation للـ dock buttons

تحقّق من `app.js` إذا كان فيه delegation لـ `[data-page]` على أي عنصر في dashboard. لو لا، **APPEND** IIFE صغير:

```javascript
/* ============================================================
   ATELIER v16 — Dock button delegation (Worker 14 / Phase 3)
   ============================================================ */
(() => {
  'use strict';
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.dock-btn[data-page]');
    if (!btn) return;
    const page = btn.dataset.page;
    if (page && typeof navigateTo === 'function') {
      navigateTo(page);
    }
  });
})();
```

> ملاحظة: لو `navigateTo` مُعرَّفة عالمياً كـ window.navigateTo، الكود يشتغل. تحقّق بـ `grep -n 'function navigateTo' platform/assets/app.js`.

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# 9 sacred elements all present (post-replace)
grep -c 'data-cath-stat="unitsCompleted"' platform/index.html       # → 1
grep -c 'data-cath-stat="avgCompletionRate"' platform/index.html    # → 1
grep -c 'data-cath-stat="trainingHours"' platform/index.html        # → 1
grep -c 'data-cath-stat="streak"' platform/index.html               # → 1
grep -c 'id="cath-skill-grid"' platform/index.html                  # → 1
grep -c 'id="cath-activity-list"' platform/index.html               # → 1

# v12 sacred (only if existed before — check first)
grep -c 'id="v12Heatmap"' platform/index.html                       # → 0 or 1 (preserve original count)
grep -c 'id="v12ChallengeLevel"' platform/index.html                # → 0 or 1
grep -c 'id="v12ChallengeBody"' platform/index.html                 # → 0 or 1

# Bento structure
grep -c 'class="bento"' platform/index.html                         # → 1
grep -c 'class="dock"' platform/index.html                          # → 1
grep -c 'dashboard-legacy' platform/index.html                      # → 0 (removed)
grep -c 'welcome-banner' platform/index.html                        # → 0 (removed from dashboard)

# Pages still 14
grep -c '<section class="page"' platform/index.html                 # → 14
```

---

## ✅ معايير القبول (Phase 3)

- [ ] Dashboard فيه فقط `.bento` كحاوية رئيسية، بدون `dashboard-legacy` wrapper.
- [ ] 8-10 خلايا Bento (greet + 4 stats + skill + activity + dock + optional challenge/heatmap).
- [ ] كل 4 `data-cath-stat` موجودين بـ count = 1 لكل واحد.
- [ ] `#cath-skill-grid` و `#cath-activity-list` موجودين كل واحد بـ count = 1.
- [ ] `v12Heatmap` / `v12ChallengeLevel` / `v12ChallengeBody` محفوظين لو كانوا موجودين قبلاً.
- [ ] لا `welcome-banner` في dashboard.
- [ ] لا `cath-dash` كـ wrapper مكرّر (الـ items الداخلية تنتقل لـ Bento cells).
- [ ] Dock buttons تعمل (click → `navigateTo`).
- [ ] Mobile breakpoints تشتغل (2 columns @720px، 1 column dock-btn @480px).
- [ ] Console: 0 errors.
- [ ] Worker 11 state binding: `Upg.state.compute.workerStats()` يحدّث `#cath-skill-grid` بنجاح.

---

## 📤 Commit + Push

```bash
git add platform/index.html platform/assets/style.css platform/assets/app.js
git commit -m "phase 3 (atelier): dashboard bento consolidation — 8 cells, 0 legacy duplication, all sacred IDs preserved"
# push

# state commit
git add state/PROGRESS.json state/snapshots/worker-14-phase-3.json
git commit -m "state: atelier phase 3 committed and pushed"
# push
```

— نهاية Phase 3.
