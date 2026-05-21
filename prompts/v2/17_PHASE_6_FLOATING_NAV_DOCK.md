# 📱 WORKER 17 — Phase 6/6 — Mobile Floating Nav Dock
> **اقرأ أولاً:** `prompts/v2/17_WORKER_CREATIVE_REVOLUTION.md` — قسم **Preservation Guard**.
> **يبني فوق:** Worker 17 Phases 1+2+3+4+5.
> **الفلسفة:** *المنصة على الموبايل ليست نسخة مصغَّرة من الحاسوب. هي تطبيق منفصل، مدروس بإصبع واحدة.*

---

## 🛡️ Preservation Contract (Phase 6)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` | **APPEND** `<nav class="dock">` بعد `<aside class="sidebar">` | تعديل أي عنصر سابق |
| `style.css` | **APPEND** كتلة "Floating Nav Dock" + sidebar hide rule على mobile | تعديل أي قاعدة من Phases 1-5 |
| `app.js` | **APPEND** IIFE `Upg.dock` (~120 سطر) — 23rd top-level Upg.* API | تعديل أي IIFE موجود |

**Sacred preserved:**
- `Upg.nav.go(pageId)` (W12 P4) — يستخدمه dock داخلياً.
- 14 page sections + IDs.
- Sidebar على desktop يعمل كما هو.
- Topbar + cmdk + theme toggle: لا تتأثر.

---

## 🎯 الهدف

Phase 6 يُغلق Worker 17 بالقطعة الأكثر visibility:

1. **Bottom-floating dock** على mobile (`< 768px`) فقط.
2. **5-6 أيقونات** — selection ذكي من 14 صفحة + dashboard:
   - 🏠 Dashboard
   - 🎯 المسار النشط (Active page indicator)
   - 🔍 Cmdk (يفتح command palette)
   - 📊 myprogress
   - ⋯ المزيد (يفتح drawer/sheet بـ بقية الصفحات)
3. **Active state** بـ Nebula Gold glow.
4. **Sidebar مُخفَى** على mobile (`display: none`).
5. **`Upg.dock` API** — 23rd Upg.* API:
   - `Upg.dock.show()`, `Upg.dock.hide()`, `Upg.dock.setActive(pageId)`, `Upg.dock.openMore()`, `Upg.dock.closeMore()`.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 6 PRE-FLIGHT
├─ Phase: 6/6 — Mobile Floating Nav Dock (FINAL)
├─ Estimated lines added: ~480 (dock HTML + CSS + Upg.dock IIFE)
├─ Files to touch:
│   ├─ platform/index.html       (APPEND <nav class="dock"> ~50 lines)
│   ├─ platform/assets/style.css (APPEND ~250 lines)
│   └─ platform/assets/app.js    (APPEND ~150 lines — Upg.dock IIFE)
├─ Sacred verify (BEFORE):
│   ├─ grep -c '<aside class="sidebar"' platform/index.html  → 1
│   ├─ grep -c '<section class="page"' platform/index.html   → 14
│   ├─ grep -c 'Upg.nav' platform/assets/app.js             → ≥1 (W12 P4)
│   └─ grep -oE 'window\.Upg\.[a-zA-Z]+' platform/assets/app.js | sort -u | wc -l  → 22
└─ Branch: continue worker-17-creative-revolution
```

---

## 🧱 خطوات التنفيذ

### Step 1 — HTML: Dock Markup

في `platform/index.html`، بعد `</aside>` (close sidebar) و قبل `</main>` (or wherever appropriate) — أضف:

```html
<!-- ════════════════════════════════════════════════════════════════
     RESONANCE v2 — Worker 17 / Phase 6 — Floating Nav Dock
     Mobile-only (< 768px). iOS-style bottom dock.
     ════════════════════════════════════════════════════════════════ -->

<nav class="dock"
     id="upg-dock"
     aria-label="التنقل السريع"
     hidden>
  <ul class="dock-list" role="tablist">

    <li class="dock-item">
      <a class="dock-link"
         href="#dashboard"
         data-dock-target="dashboard"
         aria-label="الرئيسية">
        <svg class="dock-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 12l9-9 9 9v9a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2v-9z"
                fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
        </svg>
        <span class="dock-label">الرئيسية</span>
      </a>
    </li>

    <li class="dock-item">
      <a class="dock-link"
         href="#callcenter"
         data-dock-target="callcenter"
         aria-label="مكالمات">
        <svg class="dock-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.92V20a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3.08a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"
                fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
        </svg>
        <span class="dock-label">اتصالات</span>
      </a>
    </li>

    <li class="dock-item dock-item--cmdk">
      <button class="dock-link dock-link--cmdk"
              type="button"
              data-action="open-cmdk"
              aria-label="بحث سريع">
        <svg class="dock-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </button>
    </li>

    <li class="dock-item">
      <a class="dock-link"
         href="#myprogress"
         data-dock-target="myprogress"
         aria-label="تقدمي">
        <svg class="dock-icon" viewBox="0 0 24 24" aria-hidden="true">
          <polyline points="3,18 8,13 13,17 21,7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>
          <polyline points="14,7 21,7 21,14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>
        </svg>
        <span class="dock-label">تقدمي</span>
      </a>
    </li>

    <li class="dock-item">
      <button class="dock-link"
              type="button"
              data-dock-target="more"
              data-action="open-dock-more"
              aria-label="المزيد"
              aria-haspopup="dialog">
        <svg class="dock-icon" viewBox="0 0 24 24" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <span class="dock-label">المزيد</span>
      </button>
    </li>

  </ul>

  <!-- More sheet (drawer-style) — opens from bottom -->
  <div class="dock-more" id="upg-dock-more" role="dialog" aria-modal="true"
       aria-labelledby="upg-dock-more-title" hidden>
    <div class="dock-more-handle" aria-hidden="true"></div>
    <h2 class="dock-more-title type-display-h" id="upg-dock-more-title">جميع الأقسام</h2>
    <div class="dock-more-grid">
      <a class="dock-more-item" href="#fieldsales"   data-dock-target="fieldsales">المبيعات الميدانية</a>
      <a class="dock-more-item" href="#accountmgr"   data-dock-target="accountmgr">إدارة الحسابات</a>
      <a class="dock-more-item" href="#social"       data-dock-target="social">التسويق الاجتماعي</a>
      <a class="dock-more-item" href="#lab"          data-dock-target="lab">المختبر</a>
      <a class="dock-more-item" href="#psych"        data-dock-target="psych">علم النفس</a>
      <a class="dock-more-item" href="#eq"           data-dock-target="eq">الذكاء العاطفي</a>
      <a class="dock-more-item" href="#negotiation"  data-dock-target="negotiation">التفاوض</a>
      <a class="dock-more-item" href="#customercare" data-dock-target="customercare">خدمة الزبون</a>
      <a class="dock-more-item" href="#programming"  data-dock-target="programming">البرمجة</a>
      <a class="dock-more-item" href="#accounting"   data-dock-target="accounting">المحاسبة</a>
      <a class="dock-more-item" href="#phonerepair"  data-dock-target="phonerepair">صيانة الهاتف</a>
      <a class="dock-more-item" href="#hrmastery"    data-dock-target="hrmastery">الموارد البشرية</a>
    </div>
    <button class="dock-more-close"
            type="button"
            data-action="close-dock-more"
            aria-label="إغلاق">×</button>
  </div>

</nav>
```

### Step 2 — CSS: Dock Styling

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Worker 17 / Phase 6 — Floating Nav Dock
   Visible only on mobile. Sidebar hidden on mobile.
   ════════════════════════════════════════════════════════════════ */

/* ─── Hide sidebar on mobile ─── */
@media (max-width: 768px) {
  aside.sidebar,
  .sidebar { display: none !important; }

  /* Reduce body main margin since sidebar is gone */
  main, .app-main {
    margin-inline-start: 0 !important;
  }

  /* Add bottom padding so content doesn't hide behind dock */
  body { padding-bottom: calc(64px + env(safe-area-inset-bottom)); }
}

/* ─── Dock (mobile-only) ─── */
.dock {
  position: fixed;
  bottom: max(var(--space-3), env(safe-area-inset-bottom));
  inset-inline-start: 50%;
  transform: translateX(50%);  /* RTL — center horizontally */
  z-index: var(--z-overlay);
  display: none;
}

@media (max-width: 768px) {
  .dock { display: block; }
}

/* RTL safe centering using logical positioning */
[dir="ltr"] .dock { transform: translateX(-50%); }

.dock-list {
  list-style: none;
  margin: 0;
  padding: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-1);
  background: color-mix(in oklch, var(--quiet-slate) 88%, transparent);
  -webkit-backdrop-filter: var(--glass-chrome);
  backdrop-filter: var(--glass-chrome);
  border: 1px solid color-mix(in oklch, var(--quiet-gold) 18%, var(--color-border));
  border-radius: var(--radius-pill);
  box-shadow:
    var(--shadow-3),
    inset 0 1px 0 color-mix(in oklch, var(--quiet-ivory) 8%, transparent);
}

[data-theme="light"] .dock-list {
  background: color-mix(in oklch, var(--quiet-linen-2) 88%, transparent);
}

.dock-item {
  flex: 0 0 auto;
}

.dock-link {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-width: 56px;
  height: 48px;
  padding: var(--space-1) var(--space-2);
  background: transparent;
  border: 0;
  border-radius: var(--radius-3);
  text-decoration: none;
  color: var(--quiet-lochmara);
  font-family: var(--font-text);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  cursor: pointer;
  transition:
    color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-spring);
}

.dock-link:hover { color: var(--quiet-ivory); }

.dock-link:focus-visible {
  outline: 2px solid var(--quiet-gold);
  outline-offset: 2px;
}

.dock-link:active {
  transform: scale(0.94);
}

.dock-icon {
  width: 22px;
  height: 22px;
  color: currentColor;
}

.dock-label {
  font-size: 0.6rem;
  line-height: 1;
}

/* Active state — Nebula Gold lit */
.dock-link[aria-current="page"],
.dock-link.dock-link--active {
  color: var(--quiet-gold);
  background: color-mix(in oklch, var(--quiet-gold) 12%, transparent);
}

.dock-link[aria-current="page"]::before,
.dock-link.dock-link--active::before {
  content: "";
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--quiet-gold);
  box-shadow: 0 0 8px var(--quiet-gold);
}

.dock-link {
  position: relative;  /* needed for ::before dot */
}

/* Cmdk button — slightly bigger circular */
.dock-link--cmdk {
  width: 56px;
  height: 56px;
  background: color-mix(in oklch, var(--quiet-gold) 18%, var(--color-surface-1));
  color: var(--quiet-gold);
  border-radius: 50%;
  margin-block-start: -16px;
  box-shadow:
    var(--shadow-2),
    0 0 16px color-mix(in oklch, var(--quiet-gold) 30%, transparent);
}

.dock-link--cmdk:hover {
  color: var(--quiet-ivory);
  background: color-mix(in oklch, var(--quiet-gold) 30%, var(--color-surface-1));
}

/* ─── More Sheet ─── */
.dock-more {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: calc(var(--z-overlay) + 10);
  background: var(--color-surface-1);
  border-radius: var(--radius-5) var(--radius-5) 0 0;
  padding: var(--space-3) var(--space-4) calc(var(--space-4) + env(safe-area-inset-bottom));
  max-height: 70vh;
  overflow-y: auto;
  border-top: 1px solid color-mix(in oklch, var(--quiet-gold) 25%, var(--color-border));
  box-shadow: 0 -8px 32px color-mix(in oklch, var(--color-bg) 75%, transparent);
  transform: translateY(100%);
  transition: transform var(--duration-base) var(--ease-spring);
}

.dock-more[hidden] { display: none; }

.dock-more.dock-more--open {
  transform: translateY(0);
}

.dock-more-handle {
  width: 40px;
  height: 4px;
  margin: 0 auto var(--space-3);
  background: color-mix(in oklch, var(--quiet-lochmara) 40%, transparent);
  border-radius: var(--radius-pill);
}

.dock-more-title {
  margin: 0 0 var(--space-3) 0;
  text-align: center;
  font-family: var(--font-display);
}

.dock-more-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-2);
}

.dock-more-item {
  display: block;
  padding: var(--space-3);
  background: var(--color-surface-2);
  border-radius: var(--radius-3);
  color: var(--color-text);
  text-decoration: none;
  font-family: var(--font-text);
  font-size: var(--text-sm);
  text-align: center;
  transition: background var(--duration-fast) var(--ease-out);
}

.dock-more-item:hover {
  background: color-mix(in oklch, var(--quiet-gold) 14%, var(--color-surface-2));
}

.dock-more-close {
  position: absolute;
  top: var(--space-2);
  inset-inline-end: var(--space-2);
  width: 32px;
  height: 32px;
  background: transparent;
  border: 0;
  color: var(--color-text-muted);
  font-size: 1.5rem;
  cursor: pointer;
}

/* ─── Reduced motion: disable dock animations ─── */
@media (prefers-reduced-motion: reduce) {
  .dock-link,
  .dock-more {
    transition: none;
  }
  .dock-link:active { transform: none; }
}

/* ─── Print: hide dock ─── */
@media print {
  .dock, .dock-more { display: none !important; }
}
```

### Step 3 — JavaScript: `Upg.dock` IIFE

في `platform/assets/app.js`، **APPEND**:

```javascript
/* ════════════════════════════════════════════════════════════════
 * RESONANCE v2 — Worker 17 / Phase 6 — Upg.dock
 * 23rd top-level Upg.* namespace.
 * Mobile floating nav dock controller.
 * Integrates with Upg.nav (W12 P4) for routing.
 * ════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const dock = document.getElementById('upg-dock');
  if (!dock) return;

  const more = document.getElementById('upg-dock-more');
  const links = dock.querySelectorAll('.dock-link[data-dock-target]');
  const moreItems = more ? more.querySelectorAll('.dock-more-item') : [];
  const mqMobile = window.matchMedia('(max-width: 768px)');

  // ─── Show/hide based on viewport ───
  const update = () => {
    if (mqMobile.matches) {
      dock.removeAttribute('hidden');
    } else {
      dock.setAttribute('hidden', '');
      closeMore();
    }
  };

  // ─── Active state sync ───
  const setActive = (pageId) => {
    if (!pageId) return;
    links.forEach((link) => {
      const target = link.getAttribute('data-dock-target');
      const isActive = target === pageId;
      link.classList.toggle('dock-link--active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  // Detect current page from hash or Upg.nav
  const detectActive = () => {
    let pageId = (location.hash || '').replace(/^#/, '').replace(/^page-/, '');
    if (!pageId && window.Upg?.nav?.current) {
      pageId = window.Upg.nav.current();
    }
    if (!pageId) pageId = 'dashboard';
    setActive(pageId);
  };

  // ─── More sheet ───
  let moreOpen = false;

  const openMore = () => {
    if (!more || moreOpen) return;
    moreOpen = true;
    more.removeAttribute('hidden');
    requestAnimationFrame(() => {
      more.classList.add('dock-more--open');
    });
    // Trap focus via Upg.focusTrap if available
    if (window.Upg?.focusTrap?.attach) window.Upg.focusTrap.attach(more);
    document.addEventListener('keydown', escKey);
  };

  const closeMore = () => {
    if (!more || !moreOpen) return;
    moreOpen = false;
    more.classList.remove('dock-more--open');
    setTimeout(() => more.setAttribute('hidden', ''), 280);
    if (window.Upg?.focusTrap?.detach) window.Upg.focusTrap.detach(more);
    document.removeEventListener('keydown', escKey);
  };

  const escKey = (e) => {
    if (e.key === 'Escape') closeMore();
  };

  // ─── Click delegation ───
  document.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]');
    if (!action) return;
    const a = action.getAttribute('data-action');
    if (a === 'open-cmdk' && window.Upg?.cmdk?.open) { window.Upg.cmdk.open(); }
    else if (a === 'open-dock-more') openMore();
    else if (a === 'close-dock-more') closeMore();
  });

  // Auto-close more when user picks a destination
  moreItems.forEach((item) => {
    item.addEventListener('click', () => {
      setTimeout(closeMore, 150);
    });
  });

  // ─── Listen to navigation events ───
  document.addEventListener('upg:nav:change', (e) => {
    const pageId = e.detail?.pageId || e.detail?.id;
    if (pageId) setActive(pageId);
  });

  window.addEventListener('hashchange', detectActive);

  // ─── Listen to viewport changes ───
  if (mqMobile.addEventListener) mqMobile.addEventListener('change', update);
  else mqMobile.addListener(update);

  // ─── Init ───
  const init = () => {
    update();
    detectActive();
  };

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);

  // ─── Public API ───
  window.Upg = window.Upg || {};
  window.Upg.dock = Object.freeze({
    show: () => dock.removeAttribute('hidden'),
    hide: () => dock.setAttribute('hidden', ''),
    setActive,
    openMore,
    closeMore,
    isMore: () => moreOpen,
    isMobile: () => mqMobile.matches,
  });

  // ─── Boot sanity ───
  console.info('[Upg.dock] Worker 17 / Phase 6 dock initialized.');
})();
```

### Step 4 — Update Boot Sanity (W14 P6 sanity assert)

في app.js إذا كان فيه boot sanity check يعدّ Upg APIs (من W12 P7 / W14 P6):

```javascript
// Locate the existing sanity block, update expected count from 22 → 23
const expectedAPIs = [
  'aura', 'calc', 'choreo', 'chrome', 'cmdk', 'countup',
  'dock',  /* NEW Phase 6 */
  'focusTrap', 'gateway', 'greet', 'icons', 'identity', 'life',
  'material', 'motion', 'nav', 'production', 'scroll', 'sound',
  'state', 'theme', 'transition', 'type'
];
// ... etc
```

> هذا تحديث خفيف، احرص ألا تكسر الـ assert الأصلي. لو الـ assert صارم — أضف `dock` فقط للـ list ولا تغيّر expected count منطق.

### Step 5 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════
   Discipline Comment — Worker 17 / Phase 6 (FINAL)
   1. Dock visible only at viewport ≤ 768px.
   2. Sidebar hidden at viewport ≤ 768px (display: none).
   3. 5 dock items: Home / Active page / Cmdk (FAB) / Progress / More.
   4. More sheet drawer: 12 remaining pages in 2-column grid.
   5. Active state lit with Nebula Gold (--quiet-gold).
   6. focus-visible: 2px gold outline.
   7. Reduced-motion: transitions disabled.
   8. safe-area-inset-bottom respected for notched devices.
   9. Upg.dock = 23rd top-level Upg.* API.
   10. Worker 17 final phase — closes CREATIVE REVOLUTION.
   ════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391

# Phase 6 changes
grep -c '<nav class="dock"' platform/index.html       # → 1
grep -c 'data-dock-target' platform/index.html        # → ≥17 (5 dock items + 12 in more sheet)
grep -c 'window.Upg.dock' platform/assets/app.js      # → ≥1
grep -c 'class="dock' platform/assets/style.css       # → ≥6
grep -oE 'window\.Upg\.[a-zA-Z]+' platform/assets/app.js | sort -u | wc -l  # → 23

# Manual:
# - Open at 375px → dock visible at bottom, sidebar hidden
# - Open at 1280px → dock hidden, sidebar visible
# - Active page reflects in dock with gold dot indicator
# - Cmdk FAB opens command palette
# - "المزيد" opens drawer with 12 pages
# - Tap any → navigates and dock updates
# - Esc closes drawer
# - Lighthouse Mobile Performance ≥ 85, Accessibility 100, Best Practices 100
```

---

## ✅ معايير القبول (Phase 6)

- [ ] Dock HTML مكتوب وعلى DOM.
- [ ] Sidebar مُخفَى على mobile (`display: none` ≤ 768px).
- [ ] body له padding-bottom كافي.
- [ ] 5 dock items + cmdk FAB + more drawer.
- [ ] Active state بـ Nebula Gold dot.
- [ ] More sheet يفتح/يغلق سلساً.
- [ ] `Upg.dock` IIFE مكتوب — 23rd API.
- [ ] Object.freeze على `window.Upg.dock`.
- [ ] Integration مع `Upg.nav` و `Upg.cmdk` و `Upg.focusTrap`.
- [ ] safe-area-inset-bottom محترَم.
- [ ] Reduced-motion: لا transitions.
- [ ] Print: dock مُخفَى.
- [ ] Console: 0 errors.
- [ ] Lighthouse Mobile: Performance ≥ 85، Accessibility 100، Best Practices 100.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/index.html platform/assets/style.css platform/assets/app.js
git commit -m "phase 6 (creative): mobile floating nav dock — iOS-style bottom dock with 5 items + cmdk FAB + more drawer (12 pages 2-col grid), sidebar hidden on mobile (<768px), active state Nebula Gold lit with dot indicator, Upg.dock IIFE (23rd API) integrating Upg.nav/cmdk/focusTrap, safe-area-inset-bottom respected, reduced-motion + print guarded. Worker 17 CREATIVE REVOLUTION final phase."

# state
git add state/PROGRESS.json state/snapshots/worker-17-phase-6.json
git commit -m "state: creative phase 6 committed — Worker 17 CREATIVE REVOLUTION complete"
```

### 🔀 Pull Request (Worker 17 finale)

```
Title: feat: Worker 17 — CREATIVE REVOLUTION (phases 6/6) — Quiet Luxury cinematic overhaul

Body:
- P1: Token Unification (3 :root → 1, hex → tokens)
- P2: GPU Performance (blur 40→20, drift killed on mobile)
- P3: Quiet Luxury Palette (Void/Slate/Gold/Ivory/Lochmara live)
- P4: Typography Reduction (9 → 2 families + mono, line-height 1.85)
- P5: Fluid Bento + Responsive Tables (auto-fit minmax, data-label cards)
- P6: Floating Nav Dock (mobile iOS-style + sidebar hidden)

Sacred preserved: 14 pages / 391 qcalc / 22 prior Upg.* APIs (now 23 with .dock).
Lighthouse Mobile: Performance ≥85, Accessibility 100, Best Practices 100.
```

— نهاية Phase 6. نهاية Worker 17 CREATIVE REVOLUTION.

🎵 **Resonance check:** هل المنصة الآن تحفة سينمائية فاخرة قابلة للاستخدام بإصبع واحد على الموبايل؟ نعم →
- اطلب من المستخدم مراجعة الـ PR ودمجه.
- ابنِ `test-v17.html` تجريبي بـ `node scripts/build-test-html.mjs && mv test.html test-v17.html`.
- **CONTENT_REVIVAL** الذي صُمِّم سابقاً يمكن إعادة إحيائه كـ Worker 18 (LEARNING_SHELL) بمنظور جديد، أو يبقى مؤجَّلاً.
- ثورة التغيير الإبداعية أُنجِزت.
