# 📊 WORKER 11 — Phase 6/7 — Real Dashboard + Unified State Layer
> **اقرأ أولاً:** `prompts/11_WORKER_PLATFORM_FOUNDATION.md` (الفهرس).
> **متطلب مسبق:** Phases 1, 2, 3, 4, 5 منجزة.
> **الفلسفة:** "Truth in numbers." لا أرقام مزيّفة بعد اليوم.

---

## 🎯 الهدف

1. توحيد قراءة 22 مفتاح `localStorage` تحت facade `Upg.state` (بدون migration breaking).
2. استبدال 4 stat cards الساكنة في Dashboard بأرقام **مُحتسبة لايف**.
3. إضافة **Activity Feed** يعرض آخر 10 أحداث.
4. إنشاء **`page-myprogress`** عميقة (chart + drafts list + export/reset).
5. ربط كل interaction موجودة بـ `Upg.state.logActivity` (hooks خفيفة).

---

## 📋 PRE-FLIGHT لهذا الـ Phase

```
📋 PHASE 6 PRE-FLIGHT
├─ Phase: 6/7 — Real Dashboard + Unified State Layer
├─ Estimated lines: ~750 (CSS ~150 + JS state ~250 + Dashboard rebuild ~200 + page-myprogress ~150)
├─ Files to touch:
│   ├─ platform/index.html        (page-dashboard rebuild + new page-myprogress + nav-item)
│   ├─ platform/assets/style.css  (.dash-* + .progress-page styles)
│   └─ platform/assets/app.js     (Upg.state full + activity logging hooks + chart renderer)
├─ localStorage keys:
│   ├─ upg_activity_log     (new — last 200 events)
│   └─ existing 22 upg_* keys read via facade (no migration)
└─ Deliverable: commit "phase 6: Real Dashboard + Unified State" + push.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — **`Upg.state` Facade**

```js
/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Unified State (Worker 11 / Phase 6)
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const _read = (k, fb) => {
    try { const v = localStorage.getItem(k); return v == null ? fb : JSON.parse(v); }
    catch { return fb; }
  };
  const _write = (k, v) => {
    localStorage.setItem(k, JSON.stringify(v));
    notify(k, v);
  };
  const listeners = new Map();
  const on = (event, fn) => {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(fn);
    return () => listeners.get(event)?.delete(fn);
  };
  const notify = (k, v) => {
    listeners.get('change')?.forEach(fn => fn(k, v));
    listeners.get(`change:${k}`)?.forEach(fn => fn(v));
  };

  // ─── Reading helpers ───
  const progress = () => ({
    sales:       _read('upg_progress_sales', {}),
    hr:          _read('upg_progress_hr', {}),
    programming: _read('upg_progress_prog', {}),
  });

  const scores = () => ({
    simulator:  _read('upg_simulator_scores', []),
    objection:  _read('upg_objection_scores', []),
    prLab:      _read('upg_pr_lab_scores', []),
    psych:      _read('upg_psych_results', {}),
    interviews: _read('upg_interview_attempts', []),
    interviewsHr: _read('upg_interview_attempts_hr', []),
  });

  const drafts = () => ({
    pitch:      _read('upg_pitch_drafts', []),
    salary:     _read('upg_salary_drafts', []),
    tax:        _read('upg_tax_drafts', []),
    portfolio:  _read('upg_portfolio_drafts', []),
    statements: _read('upg_statements_drafts', []),
    pr:         _read('upg_pr_estimates', []),
    calendar:   _read('upg_calendar_drafts', []),
    campaigns:  _read('upg_campaigns', []),
  });

  const misc = () => ({
    moodLog:           _read('upg_mood_log', []),
    pathChoice:        _read('upg_path_choice', null),
    accCycleVisited:   _read('upg_acc_cycle_visited', []),
    accEqState:        _read('upg_acc_eq_state', {}),
    voiceMeta:         _read('upg_voice_recordings_meta', []),
  });

  const profile = () => _read('upg_user_profile', null);
  const activity = () => _read('upg_activity_log', []);

  const logActivity = (type, payload) => {
    const log = activity();
    log.unshift({ ts: Date.now(), type, payload: payload || null });
    _write('upg_activity_log', log.slice(0, 200));
  };

  // ─── Computed metrics ───
  const compute = {
    unitsCompleted() {
      const p = progress();
      return Object.values(p).reduce((sum, dict) => {
        return sum + Object.values(dict).filter(v => v === true || v?.completed).length;
      }, 0);
    },
    avgCompletionRate() {
      const p = progress();
      const all = Object.values(p);
      const total = all.reduce((s,d) => s + Object.keys(d).length, 0) || 1;
      const done = compute.unitsCompleted();
      return Math.round((done / total) * 100);
    },
    trainingHours() {
      const log = activity().filter(a => a.type === 'session_end');
      const minutes = log.reduce((sum, e) => sum + (e.payload?.minutes || 0), 0);
      return Math.round(minutes / 60 * 10) / 10;
    },
    streak() {
      const dates = new Set(activity().map(a => new Date(a.ts).toDateString()));
      let s = 0; const d = new Date();
      while (dates.has(d.toDateString())) { s++; d.setDate(d.getDate() - 1); }
      return s;
    },
    topScore() {
      const s = scores();
      const all = [...s.simulator, ...s.objection, ...s.prLab];
      const nums = all.map(x => typeof x === 'number' ? x : (x?.score || 0));
      return nums.length ? Math.max(...nums) : 0;
    },
    quizzesTaken() {
      return Object.keys(scores().psych || {}).length;
    },
    draftCount() {
      return Object.values(drafts()).reduce((s, arr) => s + (Array.isArray(arr) ? arr.length : 0), 0);
    },
    moodAvg(days = 7) {
      const log = misc().moodLog || [];
      const cutoff = Date.now() - days * 86400000;
      const recent = log.filter(m => (m.ts || 0) > cutoff);
      if (!recent.length) return null;
      return recent.reduce((s, m) => s + (m.energy || 0) + (m.pleasantness || 0), 0) / (recent.length * 2);
    },
  };

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.state = {
    progress, scores, drafts, misc, profile, activity, logActivity, compute, on,
    _read, _write,
  };

  // ─── Auto-hooks (passive logging) ───
  // Click navigation
  document.addEventListener('click', (e) => {
    const navItem = e.target.closest('[data-page]');
    if (navItem) logActivity('navigate', { page: navItem.dataset.page });
  });
  // Quiz/lab completion (any element with data-completed)
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-action="mark-complete"]');
    if (t) logActivity('lesson_complete', { ref: t.dataset.ref || t.id });
  });
  // Session end on unload
  let sessionStart = Date.now();
  window.addEventListener('beforeunload', () => {
    const minutes = Math.round((Date.now() - sessionStart) / 60000);
    if (minutes > 0) logActivity('session_end', { minutes });
  });
})();
```

### Step 2 — **Dashboard Rebuild**

موقع: `<section id="page-dashboard">` — استبدل الـ stat cards الساكنة بـ:

```html
<section class="page" id="page-dashboard" data-page="dashboard">
  <header class="page-header">
    <h1><i class="qi qi-2xl" data-icon="layout-dashboard"></i> لوحة التحكم</h1>
    <p class="page-subtitle">
      أهلاً <strong data-bind="profile.name">…</strong> — إليك نظرة على رحلتك.
    </p>
  </header>

  <div class="dash-stats">
    <article class="dash-stat">
      <div class="dash-stat-icon"><i class="qi qi-lg" data-icon="check-circle"></i></div>
      <div class="dash-stat-body">
        <span class="dash-stat-value" data-stat="unitsCompleted">0</span>
        <span class="dash-stat-label">وحدة مُكتملة</span>
      </div>
    </article>
    <article class="dash-stat">
      <div class="dash-stat-icon"><i class="qi qi-lg" data-icon="percent"></i></div>
      <div class="dash-stat-body">
        <span class="dash-stat-value" data-stat="avgCompletionRate">0</span><span class="dash-stat-suffix">%</span>
        <span class="dash-stat-label">معدل الإتمام</span>
      </div>
    </article>
    <article class="dash-stat">
      <div class="dash-stat-icon"><i class="qi qi-lg" data-icon="clock"></i></div>
      <div class="dash-stat-body">
        <span class="dash-stat-value" data-stat="trainingHours">0</span><span class="dash-stat-suffix">ساعة</span>
        <span class="dash-stat-label">إجمالي التدريب</span>
      </div>
    </article>
    <article class="dash-stat">
      <div class="dash-stat-icon"><i class="qi qi-lg" data-icon="zap"></i></div>
      <div class="dash-stat-body">
        <span class="dash-stat-value" data-stat="streak">0</span><span class="dash-stat-suffix">يوم</span>
        <span class="dash-stat-label">streak متتابع</span>
      </div>
    </article>
  </div>

  <div class="dash-grid">
    <section class="dash-card dash-skill-tree">
      <header><h2><i class="qi" data-icon="layers"></i> شجرة المهارات</h2></header>
      <div class="dash-skill-grid" id="dash-skill-grid"><!-- 9 workers progress rings — JS --></div>
    </section>

    <section class="dash-card dash-activity">
      <header><h2><i class="qi" data-icon="clock"></i> آخر نشاط</h2></header>
      <ul class="dash-activity-list" id="dash-activity-list"><!-- آخر 10 — JS --></ul>
    </section>

    <section class="dash-card dash-quick-actions">
      <header><h2><i class="qi" data-icon="zap"></i> إجراءات سريعة</h2></header>
      <div class="dash-actions-grid">
        <button class="dash-action" data-page="callcenter"><i class="qi qi-lg" data-icon="phone"></i><span>مكالمة تجريبية</span></button>
        <button class="dash-action" data-page="hrmastery"><i class="qi qi-lg" data-icon="briefcase"></i><span>مقابلة وهمية</span></button>
        <button class="dash-action" data-page="accounting"><i class="qi qi-lg" data-icon="calculator"></i><span>حساب راتب</span></button>
        <button class="dash-action" data-page="psych"><i class="qi qi-lg" data-icon="brain"></i><span>اختبار شخصية</span></button>
        <button class="dash-action" data-page="lab"><i class="qi qi-lg" data-icon="flask-conical"></i><span>سيناريو عشوائي</span></button>
        <button class="dash-action" data-page="myprogress"><i class="qi qi-lg" data-icon="bar-chart"></i><span>تقدمي الكامل</span></button>
      </div>
    </section>
  </div>
</section>
```

### Step 3 — **CSS** للـ Dashboard

```css
.dash-stats {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem; margin: 1.5rem 0;
}
.dash-stat {
  display: flex; gap: 1rem; align-items: center;
  padding: 1.25rem;
  background: var(--color-surface-1); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);
  transition: transform 220ms, box-shadow 220ms;
}
.dash-stat:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.dash-stat-icon {
  width: 44px; height: 44px;
  display: grid; place-items: center;
  background: var(--color-brand-soft); color: var(--color-brand);
  border-radius: var(--radius-md);
}
.dash-stat-body { display: flex; flex-direction: column; }
.dash-stat-value {
  font-size: 2rem; font-weight: 800;
  color: var(--color-text); letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}
.dash-stat-suffix { font-size: 1rem; color: var(--color-text-muted); margin-inline-start: 0.25rem; }
.dash-stat-label { font-size: 0.875rem; color: var(--color-text-muted); }

.dash-grid {
  display: grid; grid-template-columns: 2fr 1fr;
  gap: 1rem;
}
@media (max-width: 900px) { .dash-grid { grid-template-columns: 1fr; } }
.dash-card {
  background: var(--color-surface-1); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: 1.25rem; box-shadow: var(--shadow-sm);
}
.dash-card header h2 { font-size: 1.05rem; display: flex; align-items: center; gap: 0.5rem; margin: 0 0 1rem; }
.dash-card header h2 .qi { color: var(--color-brand); }

.dash-skill-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.dash-skill {
  display: flex; flex-direction: column; align-items: center; gap: 0.375rem;
  padding: 0.875rem; cursor: pointer;
  background: var(--color-surface-0); border: 1px solid var(--color-border); border-radius: var(--radius-md);
  transition: border 180ms;
}
.dash-skill:hover { border-color: var(--color-brand); }
.dash-skill-ring { --p: 0; --size: 56px;
  width: var(--size); height: var(--size); border-radius: 50%;
  background: conic-gradient(var(--color-brand) calc(var(--p) * 1%), var(--color-surface-2) 0);
  display: grid; place-items: center;
  position: relative;
}
.dash-skill-ring::before {
  content: ''; position: absolute; inset: 4px;
  background: var(--color-surface-1); border-radius: 50%;
}
.dash-skill-ring .qi { position: relative; color: var(--color-text); }
.dash-skill-name { font-size: 0.8rem; color: var(--color-text-muted); text-align: center; }

.dash-activity-list { list-style: none; padding: 0; margin: 0; max-height: 320px; overflow-y: auto; }
.dash-activity-list li {
  display: flex; gap: 0.75rem; align-items: center;
  padding: 0.625rem 0;
  border-bottom: 1px dashed var(--color-border);
  font-size: 0.9rem;
}
.dash-activity-list li:last-child { border: 0; }
.dash-activity-list .qi { color: var(--color-text-muted); }
.dash-activity-list time { color: var(--color-text-faint); font-size: 0.8rem; margin-inline-start: auto; }

.dash-actions-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;
}
.dash-action {
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  padding: 1rem 0.75rem;
  background: var(--color-surface-0); color: var(--color-text);
  border: 1px solid var(--color-border); border-radius: var(--radius-md);
  cursor: pointer; transition: border 180ms, background 180ms;
}
.dash-action:hover { border-color: var(--color-brand); background: var(--color-brand-soft); }
.dash-action .qi { color: var(--color-brand); }
.dash-action span { font-size: 0.85rem; }
```

### Step 4 — **JS** — Render Dashboard

```js
(() => {
  'use strict';
  const WORKERS = [
    { id:'sales', name:'المبيعات',     icon:'briefcase' },
    { id:'callcenter', name:'الكول سنتر', icon:'phone' },
    { id:'accounting', name:'المحاسبة',  icon:'calculator' },
    { id:'programming', name:'البرمجة',   icon:'code' },
    { id:'social', name:'السوشيال',     icon:'megaphone' },
    { id:'phonerepair', name:'الصيانة',  icon:'wrench' },
    { id:'hrmastery', name:'HR',         icon:'briefcase' },
    { id:'psych', name:'علم النفس',      icon:'brain' },
    { id:'eq', name:'الذكاء العاطفي',     icon:'heart-handshake' },
  ];

  const renderDashboard = () => {
    const dash = document.getElementById('page-dashboard');
    if (!dash) return;
    const c = Upg.state.compute;

    // Stats
    dash.querySelectorAll('[data-stat]').forEach(el => {
      const key = el.dataset.stat;
      const fn = c[key];
      if (typeof fn === 'function') {
        const v = fn();
        animateNumber(el, v);
      }
    });

    // Profile name
    const p = Upg.state.profile();
    dash.querySelectorAll('[data-bind="profile.name"]').forEach(el => {
      el.textContent = p?.name || 'صديقي';
    });

    // Skill tree
    const grid = dash.querySelector('#dash-skill-grid');
    if (grid) {
      const progress = Upg.state.progress();
      grid.innerHTML = WORKERS.map(w => {
        const dict = progress[w.id] || {};
        const total = Object.keys(dict).length || 1;
        const done = Object.values(dict).filter(v => v === true || v?.completed).length;
        const pct = Math.round((done / total) * 100);
        return `
          <button class="dash-skill" data-page="${w.id}" aria-label="${w.name} (${pct}%)">
            <div class="dash-skill-ring" style="--p:${pct}"><i class="qi qi-md" data-icon="${w.icon}"></i></div>
            <span class="dash-skill-name">${w.name}</span>
          </button>`;
      }).join('');
    }

    // Activity
    const list = dash.querySelector('#dash-activity-list');
    if (list) {
      const items = Upg.state.activity().slice(0, 10);
      if (!items.length) {
        list.innerHTML = '<li style="color:var(--color-text-faint)">ابدأ التفاعل مع المنصة لتتبّع نشاطك.</li>';
      } else {
        list.innerHTML = items.map(a => `
          <li>
            <i class="qi" data-icon="${activityIcon(a.type)}"></i>
            <span>${activityLabel(a)}</span>
            <time datetime="${new Date(a.ts).toISOString()}">${relTime(a.ts)}</time>
          </li>`).join('');
      }
    }
  };

  const animateNumber = (el, target) => {
    const start = +el.textContent || 0;
    const dur = 600; const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(start + (target - start) * eased);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const activityIcon = (t) => ({
    navigate: 'chevron-left', lesson_complete: 'check-circle',
    session_end: 'clock', quiz_finished: 'star',
  })[t] || 'sparkles';
  const activityLabel = (a) => {
    if (a.type === 'navigate') return `زيارة ${a.payload?.page || ''}`;
    if (a.type === 'lesson_complete') return `إكمال درس`;
    if (a.type === 'session_end') return `جلسة بمدة ${a.payload?.minutes} دقيقة`;
    return a.type;
  };
  const relTime = (ts) => {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'الآن';
    if (diff < 3600000) return `قبل ${Math.round(diff/60000)} د`;
    if (diff < 86400000) return `قبل ${Math.round(diff/3600000)} س`;
    return `قبل ${Math.round(diff/86400000)} يوم`;
  };

  // Hooks
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderDashboard);
  else renderDashboard();
  window.addEventListener('upg:profile-ready', renderDashboard);
  window.addEventListener('upg:page-shown', (e) => { if (e.detail?.page === 'dashboard') renderDashboard(); });
  Upg.state.on('change', () => renderDashboard());
})();
```

> **مهم:** أضف بعد `navigateTo` (الموجودة) سطر:
> ```js
> window.dispatchEvent(new CustomEvent('upg:page-shown', { detail: { page: pageId } }));
> ```

### Step 5 — **`page-myprogress`** الجديدة

```html
<section class="page" id="page-myprogress" data-page="myprogress" hidden>
  <header class="page-header">
    <h1><i class="qi qi-2xl" data-icon="bar-chart"></i> تقدمي</h1>
    <p class="page-subtitle">صورة كاملة لكل ما أنجزته على المنصة.</p>
  </header>

  <section class="progress-grid">
    <div class="dash-card">
      <header><h2><i class="qi" data-icon="line-chart"></i> النشاط آخر 30 يوم</h2></header>
      <canvas id="progress-chart" width="600" height="200" style="width:100%;max-width:100%"></canvas>
    </div>

    <div class="dash-card">
      <header><h2><i class="qi" data-icon="bookmark"></i> مسودّاتي</h2></header>
      <ul class="dash-activity-list" id="my-drafts-list"></ul>
    </div>

    <div class="dash-card">
      <header><h2><i class="qi" data-icon="award"></i> أعلى الإنجازات</h2></header>
      <ul class="dash-activity-list" id="my-achievements-list"></ul>
    </div>
  </section>

  <footer class="progress-footer">
    <button class="dash-action" data-action="export-progress">
      <i class="qi" data-icon="download"></i> تصدير كل البيانات (JSON)
    </button>
    <button class="dash-action dash-action-danger" data-action="reset-progress">
      <i class="qi" data-icon="trash"></i> حذف كل التقدم
    </button>
  </footer>
</section>
```

ضِف في sidebar nav: `<button class="nav-item" data-page="myprogress"><i class="qi qi-md" data-icon="bar-chart"></i><span>تقدمي</span></button>`

JS لرسم chart بسيط (canvas vanilla — لا library):

```js
const renderProgressChart = () => {
  const canvas = document.getElementById('progress-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Build buckets: last 30 days
  const days = 30;
  const buckets = new Array(days).fill(0);
  const now = new Date(); now.setHours(0,0,0,0);
  Upg.state.activity().forEach(a => {
    const d = new Date(a.ts); d.setHours(0,0,0,0);
    const diff = Math.round((now - d) / 86400000);
    if (diff >= 0 && diff < days) buckets[days - 1 - diff]++;
  });

  const max = Math.max(1, ...buckets);
  const styles = getComputedStyle(document.documentElement);
  const brand = styles.getPropertyValue('--color-brand').trim();
  const bg    = styles.getPropertyValue('--color-surface-2').trim();

  const padX = 8, padY = 12;
  const barW = (W - padX * 2) / days;

  buckets.forEach((v, i) => {
    const h = (v / max) * (H - padY * 2);
    const x = padX + i * barW;
    const y = H - padY - h;
    ctx.fillStyle = bg;
    ctx.fillRect(x + 1, padY, barW - 2, H - padY * 2);
    ctx.fillStyle = brand;
    ctx.fillRect(x + 1, y, barW - 2, h);
  });
};
```

اربطه في `upg:page-shown` event.

---

## ✅ Acceptance Criteria للـ Phase 6

- [ ] `Upg.state.progress()`, `.scores()`, `.drafts()`, `.compute.*` تعمل بدون errors.
- [ ] Dashboard 4 stat cards تتغيّر فعلاً عند إكمال phase.
- [ ] Activity feed يعرض آخر 10 events، مع relative time.
- [ ] Skill tree 9 rings تعكس progress الفعلي.
- [ ] `localStorage.clear()` ثم refresh → كل الأرقام = 0.
- [ ] `page-myprogress` متاحة في sidebar nav، chart يرسم 30 يوم.
- [ ] Export يحمّل JSON بكل بيانات `upg_*`.
- [ ] لا errors في console.

---

## 🛡️ في نهاية الـ Phase

```
1. commit  : "phase 6: Real Dashboard + Unified State Layer + page-myprogress"
2. push    : worker-11-complete
3. state   : current.phase=6, completed_phases[+], snapshot file
4. push    : ثاني
```

**التالي:** `prompts/11_PHASE_7_PRODUCTION_PASS.md`.

— نهاية Phase 6.
