# 🧭 WORKER 12 — Phase 4/7 — Navigation Chrome (Source-List Sidebar + Dynamic-Island Topbar)
> **يبني فوق:** Phase 1-3.
> **الفلسفة:** الـ chrome (السايدبار + التوب بار) هو أول وآخر شيء يلمسه المستخدم. لازم يكون **بصري هادئ، وظيفي صارم، حركة دقيقة**.

---

## 🎯 الهدف

1. **Source-List Sidebar** كـ Finder/Notion: groupings مع labels صغيرة (uppercase tracked)، nav-items بـ rest/hover/active states واضحة، **selection pill** ينزلق spring.
2. **Dynamic-Island Topbar**: عناصر الـ chrome تنضم في "جزيرة" واحدة عائمة (group واحد بـ border-radius كبير + ظل). تتقلّص عند scroll.
3. **Active Selection Pill** يُحرَّك عبر `View Transitions API` بين nav-items (يعطي إحساس "السلاحف تتبع المؤشر").
4. **Sidebar collapse** للشاشات الضيقة + **icon-only mode** اختياري (`Cmd+\`).
5. **بادج tokens** موحّدة (Phase 2 وضع الأساس، هنا نُتمّم).
6. **Bread crumb** صغير مع أيقونة الصفحة + تباعد متناسق.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 4 PRE-FLIGHT
├─ Phase: 4/7 — Navigation Chrome
├─ Estimated lines: ~620
├─ Files to touch:
│   ├─ platform/assets/style.css   (sidebar + topbar selectors)
│   ├─ platform/assets/app.js      (Upg.nav module — selection pill + collapse)
│   └─ platform/index.html         (إضافة data-attrs + إعادة هيكلة topbar group)
├─ Sections preserved: nav structure (data-page links).
├─ New tokens: --sidebar-w-expanded, --sidebar-w-collapsed, --topbar-h
└─ Branch: continue worker-12-aurora.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Layout Tokens

```css
:root {
  --sidebar-w-expanded:  264px;
  --sidebar-w-collapsed: 72px;
  --sidebar-w:           var(--sidebar-w-expanded);
  --topbar-h:            64px;
  --topbar-h-compact:    52px;

  --nav-item-h:          40px;
  --nav-item-radius:     12px;
}
[data-sidebar="collapsed"] { --sidebar-w: var(--sidebar-w-collapsed); }
```

### Step 2 — Sidebar Re-style (Source-List)

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Source-List Sidebar (Worker 12 / Phase 4)
   ═══════════════════════════════════════════════════════════════ */
#sidebar {
  width: var(--sidebar-w);
  padding: var(--space-4) var(--space-3);
  display: flex; flex-direction: column;
  gap: var(--space-4);
  transition: width 320ms var(--ease-emphasized, cubic-bezier(.25,1,.3,1));
}

.sidebar-logo {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-text);
}
.sidebar-logo .logo-icon {
  width: 36px; height: 36px;
  border-radius: 10px;
  display: grid; place-items: center;
  background: linear-gradient(135deg, var(--color-brand), var(--color-brand-strong));
  color: hsl(40 60% 99%);
  font-weight: var(--weight-heavy);
  box-shadow: var(--halo-brand);
}
.logo-title { font-size: var(--text-sm); font-weight: var(--weight-semibold); line-height: 1.1; }
.logo-sub   { font-size: var(--text-2xs); color: var(--color-text-faint); letter-spacing: var(--tracking-wide); }

.sidebar-nav { display: flex; flex-direction: column; gap: var(--space-3); }
.nav-section-label {
  display: block;
  padding: var(--space-2) var(--space-3) 0;
  font-size: var(--text-2xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-faint);
}

/* nav-item — flat → pill animation */
.nav-item {
  position: relative;
  display: flex; align-items: center; gap: var(--space-3);
  height: var(--nav-item-h);
  padding: 0 var(--space-3);
  border-radius: var(--nav-item-radius);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text-muted);
  cursor: pointer;
  user-select: none;
  transition: color 200ms var(--ease-decelerate, ease-out),
              background 200ms var(--ease-decelerate, ease-out);
}
.nav-item:hover { background: color-mix(in oklch, var(--color-surface-2) 90%, transparent); color: var(--color-text); }
.nav-item:focus-visible { outline: none; box-shadow: var(--ring); }

.nav-item.active {
  color: var(--color-text);
  background: color-mix(in oklch, var(--color-brand-soft) 100%, transparent);
}
.nav-item.active::before {
  /* indicator bar */
  content: ''; position: absolute;
  inset-inline-start: -4px; top: 50%; transform: translateY(-50%);
  width: 3px; height: 22px;
  border-radius: 2px;
  background: var(--color-brand);
  box-shadow: 0 0 12px var(--color-brand);
}

.nav-item .nav-icon { width: 18px; height: 18px; flex-shrink: 0; color: inherit; }
.nav-item .nav-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.nav-item .nav-badge { margin-inline-start: auto; }

/* Collapsed mode */
[data-sidebar="collapsed"] .nav-label,
[data-sidebar="collapsed"] .logo-text,
[data-sidebar="collapsed"] .nav-section-label,
[data-sidebar="collapsed"] .nav-badge { display: none; }
[data-sidebar="collapsed"] .nav-item { justify-content: center; padding: 0; }
[data-sidebar="collapsed"] .nav-item.active::before { inset-inline-start: 50%; top: -3px; transform: translateX(-50%); width: 22px; height: 3px; }

/* Footer card (user) */
.sidebar-footer {
  margin-top: auto;
  padding: var(--space-3);
  border-top: 1px solid var(--color-border);
}
.user-card {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--nav-item-radius);
  background: var(--color-surface-2);
}
.user-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: grid; place-items: center;
  background: linear-gradient(135deg, var(--color-brand), var(--color-info));
  color: hsl(40 60% 99%);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
}
.user-info { flex: 1 1 auto; min-width: 0; }
.user-name { font-size: var(--text-sm); font-weight: var(--weight-semibold); }
.user-role { font-size: var(--text-2xs); color: var(--color-text-faint); }
.user-status { width: 8px; height: 8px; border-radius: 50%; background: var(--color-success); box-shadow: 0 0 8px var(--color-success); }
```

### Step 3 — Dynamic-Island Topbar

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Dynamic-Island Topbar
   Group واحد عائم بـ pill rounded ratio.
   ═══════════════════════════════════════════════════════════════ */
#topbar {
  height: var(--topbar-h);
  position: sticky; top: var(--space-3); z-index: var(--z-topbar);
  margin: var(--space-3) var(--space-3) var(--space-2);
  border-radius: var(--radius-full);
  padding: 0 var(--space-3) 0 var(--space-4);
  display: flex; align-items: center; gap: var(--space-3);
  transition: height 240ms var(--ease-emphasized, ease-out),
              padding 240ms var(--ease-emphasized, ease-out);
}
#topbar[data-scrolled="true"] {
  height: var(--topbar-h-compact);
}

.topbar-page-title { display: flex; align-items: center; gap: var(--space-3); flex-shrink: 0; }
.page-icon-wrap {
  width: 36px; height: 36px; border-radius: 10px;
  display: grid; place-items: center;
  background: var(--color-brand-soft); color: var(--color-brand);
}
.topbar-page-title h2 { font-size: var(--text-base); font-weight: var(--weight-semibold); margin: 0; }
.topbar-breadcrumb { font-size: var(--text-2xs); color: var(--color-text-faint); }

.topbar-search {
  flex: 1 1 auto;
  max-width: 360px;
  margin-inline-start: var(--space-4);
  height: 36px;
  border-radius: var(--radius-full);
  background: color-mix(in oklch, var(--color-surface-2) 70%, transparent);
  border: 1px solid var(--color-border);
  display: flex; align-items: center; gap: var(--space-2);
  padding: 0 var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: border-color 200ms, background 200ms;
}
.topbar-search:hover { border-color: var(--color-border-strong); background: color-mix(in oklch, var(--color-surface-2) 90%, transparent); }
.topbar-search kbd {
  margin-inline-start: auto;
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--color-surface-3);
  color: var(--color-text-muted);
}

.topbar-actions {
  display: flex; align-items: center; gap: var(--space-1);
  margin-inline-start: auto;
}
.tb-btn {
  width: 36px; height: 36px;
  border-radius: 10px;
  display: grid; place-items: center;
  color: var(--color-text-muted);
  cursor: pointer;
  position: relative;
  background: transparent;
  border: none;
  transition: background 200ms, color 200ms, transform 200ms var(--ease-spring, ease-out);
}
.tb-btn:hover { background: color-mix(in oklch, var(--color-surface-2) 90%, transparent); color: var(--color-text); }
.tb-btn:active { transform: scale(.94); }
.tb-btn:focus-visible { outline: none; box-shadow: var(--ring); }

.tb-divider { width: 1px; height: 22px; background: var(--color-border); margin: 0 var(--space-2); }
.tb-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  display: grid; place-items: center;
  background: linear-gradient(135deg, var(--color-brand), var(--color-info));
  color: hsl(40 60% 99%); font-weight: var(--weight-semibold); font-size: var(--text-xs);
  cursor: pointer;
}
.tb-notif-dot {
  position: absolute; top: 4px; inset-inline-end: 4px;
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--color-danger);
  box-shadow: 0 0 0 2px var(--color-bg);
}

/* Theme toggle pill (3 states) — حلّ Phase 1 من Worker 11، نُحدّث الأناقة فقط */
.theme-toggle {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: transparent; border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  display: grid; place-items: center;
  transition: background 200ms, color 200ms;
}
.theme-toggle:hover { background: color-mix(in oklch, var(--color-surface-2) 90%, transparent); color: var(--color-text); }
```

### Step 4 — Sidebar Collapse Module (`Upg.nav`)

في `app.js`:
```js
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Navigation Chrome (Worker 12 / Phase 4)
   Public API: window.Upg.nav.{ collapse, expand, toggle, isCollapsed }
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const KEY = 'upg_sidebar_collapsed';
  const html = document.documentElement;

  const apply = (v) => {
    html.dataset.sidebar = v ? 'collapsed' : 'expanded';
    localStorage.setItem(KEY, v ? '1' : '0');
  };
  const isCollapsed = () => html.dataset.sidebar === 'collapsed';
  const collapse = () => apply(true);
  const expand   = () => apply(false);
  const toggle   = () => apply(!isCollapsed());

  // initial
  apply(localStorage.getItem(KEY) === '1');

  // Cmd+\ shortcut
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
      e.preventDefault(); toggle();
    }
  });

  // wire any [data-action="toggle-sidebar"]
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-action="toggle-sidebar"]');
    if (t) { e.preventDefault(); toggle(); }
  });

  window.Upg = window.Upg || {};
  window.Upg.nav = { collapse, expand, toggle, isCollapsed };
})();
```

> **اختياري لـ Phase 4:** أضف زر `<button class="tb-btn" data-action="toggle-sidebar" aria-label="طي السايدبار"><i class="qi" data-icon="layout-dashboard"></i></button>` في بداية `topbar-actions`.

### Step 5 — Selection Pill Animation (View Transitions)

```js
/* عند تغيير nav-item.active، استعمل View Transitions API لو متوفّر */
(() => {
  'use strict';
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const animate = (cb) => {
    if (document.startViewTransition) document.startViewTransition(cb);
    else cb();
  };

  sidebar.addEventListener('click', (e) => {
    const item = e.target.closest('.nav-item[data-page]');
    if (!item || item.classList.contains('active')) return;
    animate(() => {
      sidebar.querySelectorAll('.nav-item.active').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  }, true); // capture so we run before page change handler
})();
```

و CSS لربط view-transition-name:
```css
.nav-item.active::before { view-transition-name: nav-pill; }
```

### Step 6 — Mobile Sidebar (Drawer)

```css
@media (max-width: 980px) {
  #sidebar {
    position: fixed; inset: 0 auto 0 0;
    transform: translateX(-100%);
    z-index: var(--z-sidebar);
    transition: transform 280ms var(--ease-emphasized, ease-out);
  }
  [data-sidebar-mobile="open"] #sidebar { transform: translateX(0); }
  [dir="rtl"] #sidebar { inset: 0 0 0 auto; transform: translateX(100%); }
  [dir="rtl"][data-sidebar-mobile="open"] #sidebar { transform: translateX(0); }
}
```

JS:
```js
window.Upg.nav.openDrawer  = () => document.documentElement.dataset.sidebarMobile = 'open';
window.Upg.nav.closeDrawer = () => delete document.documentElement.dataset.sidebarMobile;
```

---

## ✅ Acceptance Criteria

- [ ] Sidebar الجديد يعرض `nav-section-label` بـ tracked uppercase صغير.
- [ ] active nav-item يظهر بـ pill ناعم + bar-indicator على الحافة.
- [ ] الانتقال بين nav-items ينعم باستخدام View Transitions (لو مدعوم).
- [ ] `Cmd+\` يطوي/يبسط السايدبار، الحالة تُحفظ في `upg_sidebar_collapsed`.
- [ ] Topbar يطفو كجزيرة بـ rounded-full + ظل + glass.
- [ ] على scroll > 4px يصبح أصغر (height ينقص 12px).
- [ ] Search في topbar pill — clickable، يفتح cmdk عند click.
- [ ] على ≤ 980px، sidebar يصبح drawer.
- [ ] صفر errors في console، لا layout shift.

---

## 🛡️ في نهاية الـ Phase

```
1. commit  : "phase 4 (aurora): source-list sidebar + dynamic-island topbar"
2. push    : worker-12-aurora → origin
3. update  : state/PROGRESS.json (phase=4)
4. snapshot: state/snapshots/worker-12-phase-4.json
5. commit  : "state: aurora phase 4 committed and pushed"
6. push
```

**التالي:** `prompts/12_PHASE_5_DASHBOARD_HERO.md`.

— نهاية Phase 4.
