# 🍱 WORKER 12 — Phase 5/7 — Dashboard Hero (Bento Grid + Identity Tints)
> **يبني فوق:** Phase 1-4.
> **الفلسفة:** صفحة البداية = منصة بأكملها مكثّفة. لو ضربت في 5 ثوان، خسرت الزائر.

---

## 🎯 الهدف

1. **حذف الازدواج**: في Dashboard الحالي يوجد `cath-dash` (Worker 11) + `welcome-banner` (legacy) + `grid-4` legacy stats. **نختار واحدًا فقط** ونوحّد.
2. **Bento Grid 12-col asymmetric** (إلهام Apple Mac Page) — كل كرت بـ size مختلف لتعطي إيقاع بصري.
3. **Per-Page Identity Tint** — كل صفحة من 11 تأخذ tint identity (callcenter=cyan, sales=emerald, hr=violet, accounting=amber, …) يظهر في الـ topbar icon-wrap + nav-item active + headers.
4. **Count-up Tickers** للأرقام في الـ stats — ينمو من 0 إلى القيمة الفعلية مع easing-emphasized عند ظهور الكرت.
5. **Quick Dock** — صف 6 إجراءات سريعة بشكل dock متجمّع.
6. **Greeting Hero** متكيّف مع وقت اليوم: `صباح الخير / مساء الخير / مساء النور`.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 5 PRE-FLIGHT
├─ Phase: 5/7 — Dashboard Hero
├─ Estimated lines: ~640
├─ Files to touch:
│   ├─ platform/index.html         (إعادة كتابة page-dashboard فقط)
│   ├─ platform/assets/style.css   (Bento + identity tints + count-up CSS)
│   └─ platform/assets/app.js      (Upg.identity + Upg.countup)
├─ Sections preserved: كل بقية الصفحات (callcenter..hrmastery..) لا تُلمس.
├─ Removed: legacy `welcome-banner`, legacy `grid-4` stats داخل page-dashboard فقط.
└─ Branch: continue worker-12-aurora.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Identity Tint Tokens (لـ 11 صفحة)

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Per-Page Identity Tints (Worker 12 / Phase 5)
   كل صفحة لها لمسة (لا تطغى — ≤ 12% saturation على الـ chrome).
   ═══════════════════════════════════════════════════════════════ */
:root {
  --tint-dashboard:    var(--color-brand);
  --tint-callcenter:   hsl(186 80% 45%);   /* cyan */
  --tint-fieldsales:   hsl(152 60% 38%);   /* emerald */
  --tint-accountmgr:   hsl(176 70% 38%);   /* teal */
  --tint-social:       hsl(265 70% 56%);   /* violet */
  --tint-lab:          hsl(330 80% 56%);   /* magenta */
  --tint-psych:        hsl(35 90% 50%);    /* amber */
  --tint-eq:           hsl(0 75% 56%);     /* coral */
  --tint-negotiation:  hsl(220 80% 56%);   /* royal */
  --tint-customercare: hsl(190 60% 48%);   /* sky */
  --tint-programming:  hsl(210 90% 56%);   /* electric */
  --tint-accounting:   hsl(45 92% 50%);    /* gold */
  --tint-phonerepair:  hsl(15 80% 56%);    /* terracotta */
  --tint-hrmastery:    hsl(280 70% 56%);   /* indigo */
  --tint-myprogress:   var(--color-success);
}

/* Apply per page — كل page يأخذ tint عبر data-active-tint */
[data-active-tint="dashboard"]    { --color-tint: var(--tint-dashboard); }
[data-active-tint="callcenter"]   { --color-tint: var(--tint-callcenter); }
[data-active-tint="fieldsales"]   { --color-tint: var(--tint-fieldsales); }
[data-active-tint="accountmgr"]   { --color-tint: var(--tint-accountmgr); }
[data-active-tint="social"]       { --color-tint: var(--tint-social); }
[data-active-tint="lab"]          { --color-tint: var(--tint-lab); }
[data-active-tint="psych"]        { --color-tint: var(--tint-psych); }
[data-active-tint="eq"]           { --color-tint: var(--tint-eq); }
[data-active-tint="negotiation"]  { --color-tint: var(--tint-negotiation); }
[data-active-tint="customercare"] { --color-tint: var(--tint-customercare); }
[data-active-tint="programming"]  { --color-tint: var(--tint-programming); }
[data-active-tint="accounting"]   { --color-tint: var(--tint-accounting); }
[data-active-tint="phonerepair"]  { --color-tint: var(--tint-phonerepair); }
[data-active-tint="hrmastery"]    { --color-tint: var(--tint-hrmastery); }
[data-active-tint="myprogress"]   { --color-tint: var(--tint-myprogress); }

/* Topbar icon wrap يأخذ tint */
.page-icon-wrap {
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 14%, transparent);
  color: var(--color-tint, var(--color-brand));
}
```

JS:
```js
/* في app.js — IIFE جديد */
(() => {
  'use strict';
  const html = document.documentElement;
  const setTint = (page) => { html.dataset.activeTint = page || 'dashboard'; };
  // hook into existing navigateTo if available
  const originalNav = window.navigateTo;
  if (typeof originalNav === 'function') {
    window.navigateTo = function(pageId) {
      setTint(pageId);
      return originalNav.apply(this, arguments);
    };
  }
  // initial
  const active = document.querySelector('.page.active');
  if (active) setTint(active.id.replace(/^page-/, ''));

  window.Upg = window.Upg || {};
  window.Upg.identity = { setTint };
})();
```

### Step 2 — Bento Grid CSS

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Bento Dashboard
   12-col grid, asymmetric — not just 4-up cards.
   ═══════════════════════════════════════════════════════════════ */
.bento {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-4);
  margin-block: var(--space-7);
}
.bento > * {
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-c-sm), var(--hairline-light);
  position: relative; overflow: hidden;
  transition: transform 320ms var(--ease-spring, ease-out),
              box-shadow 320ms var(--ease-spring, ease-out);
}
.bento > *:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-c-lg), var(--hairline-light);
}

/* Bento sizes */
.b-1x1 { grid-column: span 3; }
.b-2x1 { grid-column: span 6; }
.b-3x1 { grid-column: span 9; }
.b-4x1 { grid-column: span 12; }
.b-1x2 { grid-column: span 3; grid-row: span 2; }
.b-2x2 { grid-column: span 6; grid-row: span 2; }

@media (max-width: 980px) {
  .b-1x1, .b-2x1, .b-3x1, .b-4x1 { grid-column: 1 / -1; }
  .b-1x2, .b-2x2 { grid-column: 1 / -1; grid-row: span 1; }
}

/* Greeting hero — kicker + title + supporting */
.bento-greet {
  background: linear-gradient(135deg,
    color-mix(in oklch, var(--color-tint, var(--color-brand)) 12%, var(--color-surface-1)),
    var(--color-surface-1));
  padding: var(--space-8) var(--space-7);
}
.bento-greet .h-eyebrow { color: var(--color-tint, var(--color-brand)); }
.bento-greet h1 {
  font-size: var(--text-3xl);
  line-height: var(--leading-tight);
  margin: var(--space-2) 0 var(--space-3);
  letter-spacing: var(--tracking-tight);
}
.bento-greet p { color: var(--color-text-muted); font-size: var(--text-base); max-width: 60ch; }

/* Stat tile (count-up) */
.stat-tile {
  display: flex; flex-direction: column; gap: var(--space-2);
}
.stat-tile-icon {
  width: 36px; height: 36px;
  border-radius: 10px;
  display: grid; place-items: center;
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 14%, transparent);
  color: var(--color-tint, var(--color-brand));
  margin-bottom: var(--space-2);
}
.stat-tile-value {
  font-family: var(--font-numeric);
  font-variant-numeric: tabular-nums lining-nums;
  font-size: var(--text-3xl);
  font-weight: var(--weight-heavy);
  line-height: 1;
  letter-spacing: var(--tracking-tighter);
}
.stat-tile-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  letter-spacing: var(--tracking-wide);
}
.stat-tile-trend {
  display: inline-flex; align-items: center; gap: 4px;
  margin-top: var(--space-1);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
}
.stat-tile-trend.is-up   { color: var(--color-success); }
.stat-tile-trend.is-down { color: var(--color-danger); }

/* Quick Dock — 6 quick actions */
.dock {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-xl);
  background: var(--glass-thin-bg);
  border: 1px solid var(--glass-thin-border);
  backdrop-filter: blur(var(--blur-thin)) saturate(var(--vibrancy));
  -webkit-backdrop-filter: blur(var(--blur-thin)) saturate(var(--vibrancy));
}
.dock-btn {
  display: flex; flex-direction: column; align-items: center; gap: var(--space-2);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer;
  background: transparent; border: none;
  color: var(--color-text-muted);
  transition: transform 220ms var(--ease-spring), background 200ms, color 200ms;
}
.dock-btn:hover { background: color-mix(in oklch, var(--color-surface-2) 90%, transparent); color: var(--color-text); transform: translateY(-2px); }
.dock-btn:active { transform: scale(.96); }
.dock-btn .qi { font-size: 1.5rem; color: var(--color-tint, var(--color-brand)); }
.dock-btn span { font-size: var(--text-xs); }

@media (max-width: 720px) {
  .dock { grid-template-columns: repeat(3, 1fr); }
}
```

### Step 3 — Dashboard HTML (replacement)

في `index.html`، **استبدل** كامل محتوى `<section class="page active" id="page-dashboard">` (من فتح section إلى إغلاقه) بـ:

```html
<section class="page active" id="page-dashboard">
  <div class="bento">

    <!-- Hero Greet — 2x1 -->
    <article class="bento-greet b-2x1" data-aurora-greet>
      <span class="h-eyebrow">لوحة التحكم</span>
      <h1 data-greet-title>أهلاً بعودتك</h1>
      <p data-greet-sub>تابع رحلتك التدريبية — اليوم خطوة جديدة بانتظارك.</p>
    </article>

    <!-- Stat tiles — 1x1 each -->
    <article class="stat-tile b-1x1">
      <div class="stat-tile-icon"><i class="qi" data-icon="check-circle"></i></div>
      <div class="stat-tile-value u-num" data-countup data-cath-stat="unitsCompleted">0</div>
      <div class="stat-tile-label">وحدة مُكتملة</div>
      <span class="stat-tile-trend is-up"><i class="qi" data-icon="trending-up"></i> +3 هذا الأسبوع</span>
    </article>

    <article class="stat-tile b-1x1">
      <div class="stat-tile-icon"><i class="qi" data-icon="bar-chart"></i></div>
      <div class="stat-tile-value u-num"><span data-countup data-cath-stat="avgCompletionRate">0</span>%</div>
      <div class="stat-tile-label">معدل الإتمام</div>
      <span class="stat-tile-trend is-up"><i class="qi" data-icon="trending-up"></i> +5%</span>
    </article>

    <!-- Skill tree — 2x1 -->
    <article class="b-2x1">
      <div class="u-cluster" style="margin-bottom: var(--space-4);">
        <h2 class="h-card"><i class="qi" data-icon="layout-dashboard"></i> شجرة المهارات</h2>
        <button class="cath-card-link" type="button" data-page="myprogress">عرض التفاصيل ←</button>
      </div>
      <div class="cath-skill-grid" id="cath-skill-grid"></div>
    </article>

    <!-- Activity — 2x1 -->
    <article class="b-2x1">
      <h2 class="h-card" style="margin-bottom: var(--space-4);"><i class="qi" data-icon="trending-up"></i> آخر النشاط</h2>
      <ul class="cath-activity-list" id="cath-activity-list"></ul>
    </article>

    <!-- Stats: hours + streak — 1x1 each -->
    <article class="stat-tile b-1x1">
      <div class="stat-tile-icon"><i class="qi" data-icon="clock"></i></div>
      <div class="stat-tile-value u-num" data-countup data-cath-stat="trainingHours">0</div>
      <div class="stat-tile-label">ساعة تدريب</div>
    </article>
    <article class="stat-tile b-1x1">
      <div class="stat-tile-icon"><i class="qi" data-icon="fire"></i></div>
      <div class="stat-tile-value u-num" data-countup data-cath-stat="streak">0</div>
      <div class="stat-tile-label">يوم streak</div>
    </article>

    <!-- Dock — full row -->
    <nav class="dock b-4x1" aria-label="إجراءات سريعة">
      <button class="dock-btn" data-page="callcenter"><i class="qi" data-icon="phone"></i><span>مكالمة</span></button>
      <button class="dock-btn" data-page="hrmastery"><i class="qi" data-icon="briefcase"></i><span>مقابلة</span></button>
      <button class="dock-btn" data-page="accounting"><i class="qi" data-icon="calculator"></i><span>حاسبة راتب</span></button>
      <button class="dock-btn" data-page="psych"><i class="qi" data-icon="brain"></i><span>اختبار</span></button>
      <button class="dock-btn" data-page="lab"><i class="qi" data-icon="flask-conical"></i><span>سيناريو</span></button>
      <button class="dock-btn" data-page="myprogress"><i class="qi" data-icon="bar-chart"></i><span>تقدمي</span></button>
    </nav>

  </div>
</section>
```

### Step 4 — Greet Time-of-Day + Count-up

```js
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Greet + Count-up (Worker 12 / Phase 5)
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  // Time-of-day greeting
  const setGreeting = () => {
    const el = document.querySelector('[data-greet-title]');
    if (!el) return;
    const h = new Date().getHours();
    const name = (window.Upg?.state?.profile?.()?.name) || 'صديقي';
    let prefix = 'أهلاً';
    if (h < 12)      prefix = 'صباح الخير';
    else if (h < 17) prefix = 'يوم سعيد';
    else if (h < 21) prefix = 'مساء النور';
    else             prefix = 'مساء الخير';
    el.textContent = `${prefix}، ${name} 👋`;
  };

  // Count-up animation
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const countUp = (el, target, duration = 1200) => {
    const start = performance.now();
    const from = 0;
    const decimals = (String(target).split('.')[1] || '').length;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const v = from + (target - from) * easeOutCubic(t);
      el.textContent = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('ar-IQ');
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observeCountUps = () => {
    const els = document.querySelectorAll('[data-countup]');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach(el => { const v = +el.dataset.target || +el.textContent || 0; countUp(el, v); });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting || en.target.dataset.countupDone) return;
        const v = +en.target.dataset.target || +en.target.textContent || 0;
        countUp(en.target, v);
        en.target.dataset.countupDone = '1';
      });
    }, { threshold: 0.4 });
    els.forEach(el => io.observe(el));
  };

  const init = () => { setGreeting(); observeCountUps(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.Upg = window.Upg || {};
  window.Upg.greet = { setGreeting };
  window.Upg.countup = { run: countUp, observe: observeCountUps };
})();
```

> **مهم:** عند تحديث الـ stats من `Upg.state` بعد إجراء، اضبط `el.dataset.target = newValue` ثم `Upg.countup.run(el, newValue, 600)`.

---

## ✅ Acceptance Criteria

- [ ] Dashboard لم يعد فيه `welcome-banner` ولا `grid-4` legacy.
- [ ] Bento بـ 12-col asymmetric يعمل على ≥ 980px وينطبق لـ stack على الموبايل.
- [ ] العنوان يتغير حسب الوقت ويظهر اسم المستخدم من `Upg.state.profile()`.
- [ ] الأرقام تعدّ من 0 لقيمتها الحقيقية عند ظهور الكرت في viewport.
- [ ] navigateTo يضبط `data-active-tint` على `<html>` → page-icon-wrap يأخذ اللون.
- [ ] Dock بـ 6 أزرار يعمل، كل زر له identity tint icon.
- [ ] صفر errors. لا flash content (الـ count-up يبدأ بـ 0).

---

## 🛡️ في نهاية الـ Phase

```
1. commit  : "phase 5 (aurora): bento dashboard + identity tints + count-up"
2. push    : worker-12-aurora → origin
3. update  : state/PROGRESS.json (phase=5)
4. snapshot: state/snapshots/worker-12-phase-5.json
5. commit  : "state: aurora phase 5 committed and pushed"
6. push
```

**التالي:** `prompts/12_PHASE_6_MOTION_INTERACTION.md`.

— نهاية Phase 5.
