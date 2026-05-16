# 🏝️ WORKER 14 — Phase 4/6 — Dynamic-Island Topbar + Source-List Sidebar Refinement
> **اقرأ أولاً:** `prompts/14_WORKER_ATELIER_LIQUID_GLASS.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Phase 1+2+3.
> **الفلسفة:** الـ chrome (الإطار: topbar + sidebar) هو **هويّة المنصة**. لو كان مسطّحاً، فقدت روح iPad / iPhone.

---

## 🛡️ Preservation Contract (Phase 4)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` (`#topbar`) | **AUGMENT**: إضافة `class="island"` على `<header id="topbar">`، إضافة `data-scroll-state="rest"` attribute، إضافة wrap حول الـ search مع `<button class="topbar-search-btn">` | حذف theme toggle، حذف sidebar-toggle (أُضيف W13/P3)، تغيير ترتيب topbar-actions |
| `index.html` (`#sidebar`) | **AUGMENT**: إضافة `data-collapsed="false"` على sidebar، إضافة tooltip wrappers على nav-items (`<span class="nav-tooltip">…</span>` للـ collapsed mode) | حذف أي nav-item، تغيير `data-page` values |
| `style.css` | **APPEND** كتلة "Chrome Refinement" + **REPLACE-IN-PLACE** لـ 5-7 قواعد topbar/sidebar محدّدة (المذكورة) | تعديل قواعد الـ identity tints، تعديل theme tokens |
| `app.js` | **APPEND** IIFE: `Upg.chrome` + ربط search-btn بـ `Upg.cmdk.open()` | تعديل `Upg.scroll`, `Upg.nav`, `Upg.cmdk` الموجودة (نتكامل معها فقط) |

**Sacred preserved:**
- `Upg.scroll` (W12/P3) — يبقى يعمل، نوسّعه عبر `Upg.chrome`.
- `Upg.nav` (W12/P4) — يبقى، نضيف `Upg.chrome.bind()` يستدعيه.
- `Upg.cmdk` (W11/P5) — يبقى، نوصّل search button إليه.
- جميع الـ 14 nav-items.
- 14 page sections.

---

## 🎯 الهدف

**5 ترقيات على الـ chrome:**

1. **Topbar Dynamic Island** — يبدأ بطول 64px بـ padding-block 16px. عند `scrollY > 80`، ينكمش إلى 48px مع padding 10px، الـ search-input ينحسر إلى أيقونة، الـ logo ينحسر، breadcrumb يظهر بدل الـ title.

2. **Search → Command Palette** — حالياً `<input>` ثابت ما يفعل شيء عند click. نحوّله لـ button فيها `<input>` للـ aesthetic فقط. عند click أو focus → يفتح `Upg.cmdk` modal. الـ input "fake" يصير `aria-hidden="true"` ويبقى للشكل.

3. **Sidebar Pill Spring Slide** — حالياً الـ active pill يقفز فوراً. نضيف `<div class="nav-pill-indicator">` كـ pseudo-floating element ينزلق spring 320ms عبر `Upg.chrome.movePill(targetItem)`.

4. **Collapsed-Mode Tooltips** — عند الـ sidebar مطوية (`data-collapsed="true"` من Cmd+\), كل nav-item يعرض tooltip floating على الـ left بـ pure CSS.

5. **Mobile Drawer Hardened** — السايدبار الحالي على mobile يُظهر/يُخفي بـ class. نضيف:
   - `<div class="drawer-scrim">` خلفه يصير clickable للـ close.
   - swipe-to-close (touchstart/touchmove/touchend).
   - focus-trap داخل الـ drawer عند الفتح.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 4 PRE-FLIGHT
├─ Phase: 4/6 — Chrome Refinement
├─ Estimated lines: ~620
├─ Files to touch:
│   ├─ platform/index.html         (AUGMENT 5-8 elements + add 1 scrim div)
│   ├─ platform/assets/style.css   (APPEND ~280 + REPLACE-IN-PLACE ~40)
│   └─ platform/assets/app.js      (APPEND IIFE Upg.chrome ~220 lines)
├─ Sacred verify:
│   ├─ All 14 nav-items present after edit
│   ├─ Upg.scroll, Upg.nav, Upg.cmdk untouched (no signature change)
│   └─ 14 page sections + 391 qcalc preserved
├─ Branch: continue worker-14-atelier
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Topbar Island markup

في `index.html`، السطر 543 (`<header id="topbar" class="material-chrome">`):

**AUGMENT** بإضافة كلاسات + data-attributes:

```html
<header id="topbar" class="material-chrome island" data-scroll-state="rest" data-island="topbar">
```

في نفس الـ topbar، استبدل `<div class="topbar-search">` (input) بهذا (REPLACE-IN-PLACE):

```html
<button class="topbar-search-btn" type="button"
        data-action="open-cmdk"
        aria-label="فتح بحث المنصة (Cmd+K)"
        title="بحث (Cmd+K)">
  <i class="qi" data-icon="search" aria-hidden="true"></i>
  <span class="topbar-search-label">ابحث في المنصة...</span>
  <kbd class="topbar-search-kbd">⌘K</kbd>
</button>
```

(الـ input القديم يُحذف لأنه non-functional. النص العربي للـ placeholder ينتقل إلى `<span class="topbar-search-label">`.)

### Step 2 — Sidebar pill indicator + tooltips

في `index.html`، داخل `<aside id="sidebar">` بعد `<nav class="sidebar-nav">`:

**APPEND** عنصر floating (لا يكسر sidebar layout — `position: absolute`):

```html
<div class="nav-pill-indicator" aria-hidden="true"></div>
```

ثم على كل `<div class="nav-item">`، أضف `<span class="nav-tooltip">{label}</span>` كآخر child (لـ collapsed-mode tooltips):

```html
<div class="nav-item" data-page="callcenter">
  <i class="qi qi-md nav-icon" data-icon="phone"></i>
  <span class="nav-label">وحدة كول سنتر</span>
  <span class="nav-badge">3</span>
  <span class="nav-tooltip">وحدة كول سنتر</span>  <!-- NEW -->
</div>
```

(للـ 14 nav-items + 2 disabled items = 16 tooltips إضافية.)

### Step 3 — Mobile drawer scrim

في `index.html`، **APPEND** قبل `</body>` (خارج main):

```html
<!-- ATELIER v16 — Mobile drawer scrim (Worker 14 / Phase 4) -->
<div class="drawer-scrim" data-drawer="sidebar" aria-hidden="true"></div>
```

### Step 4 — CSS الجديد (APPEND)

```css
/* ═══════════════════════════════════════════════════════════════
   ATELIER v16 — Chrome Refinement (Worker 14 / Phase 4)
   ═══════════════════════════════════════════════════════════════ */

/* 1) Topbar Island — scroll-aware compaction */
#topbar.island {
  transition:
    height        300ms var(--ease-emphasized, cubic-bezier(0.2, 0, 0, 1)),
    padding       300ms var(--ease-emphasized),
    backdrop-filter 200ms ease,
    background    200ms ease,
    box-shadow    200ms ease;
  will-change: height, padding;
}
#topbar.island[data-scroll-state="compact"] {
  height: 48px;
  padding-block: 4px;
  box-shadow: var(--shadow-c-lg);
}
#topbar.island[data-scroll-state="compact"] .topbar-page-title .page-icon-wrap { transform: scale(0.85); }
#topbar.island[data-scroll-state="compact"] #topbar-breadcrumb { display: none; }
#topbar.island[data-scroll-state="compact"] #topbar-title { font-size: var(--text-sm, 0.875rem); }
#topbar.island[data-scroll-state="compact"] .topbar-search-label { display: none; }

/* 2) Search button — opens cmdk */
.topbar-search-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 8px);
  padding: 8px 14px;
  min-width: 280px;
  max-width: 420px;
  background: color-mix(in oklch, var(--color-surface-2) 60%, transparent);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full, 999px);
  color: var(--color-text-faint);
  cursor: pointer;
  transition: all 200ms var(--ease-standard);
  font-family: var(--font-text);
  font-size: var(--text-sm, 0.875rem);
}
.topbar-search-btn:hover {
  background: var(--color-surface-2);
  border-color: var(--color-brand);
  color: var(--color-text);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--color-brand) 20%, transparent);
}
.topbar-search-btn .qi { color: var(--color-text-muted); flex-shrink: 0; }
.topbar-search-btn .topbar-search-label { flex: 1; text-align: start; }
.topbar-search-btn .topbar-search-kbd {
  font-family: var(--font-mono);
  font-size: 0.7em;
  padding: 2px 6px;
  background: var(--color-surface-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xs, 4px);
  color: var(--color-text-muted);
  flex-shrink: 0;
}
@media (max-width: 720px) {
  .topbar-search-btn { min-width: 0; padding: 8px 10px; }
  .topbar-search-btn .topbar-search-label,
  .topbar-search-btn .topbar-search-kbd { display: none; }
}

/* 3) Sidebar pill indicator — spring slide */
#sidebar { position: relative; }
.nav-pill-indicator {
  position: absolute;
  inset-inline-end: 0;
  width: 3px;
  height: 0;
  background: linear-gradient(to bottom,
    var(--color-tint, var(--color-brand)),
    color-mix(in oklch, var(--color-tint, var(--color-brand)) 50%, transparent));
  border-radius: 2px 0 0 2px;
  transform: translateY(0);
  transition:
    transform 320ms var(--ease-spring, cubic-bezier(0.5, 1.5, 0.5, 1)),
    height 280ms var(--ease-spring),
    background 200ms ease;
  pointer-events: none;
  opacity: 0;
}
.nav-pill-indicator.is-active { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .nav-pill-indicator { transition: opacity 100ms ease; }
}

/* 4) Collapsed-mode tooltips */
.nav-tooltip {
  position: absolute;
  inset-inline-start: calc(100% + 8px);
  inset-block-start: 50%;
  transform: translateY(-50%);
  background: var(--color-surface-3);
  color: var(--color-text);
  padding: 6px 12px;
  border-radius: var(--radius-sm, 6px);
  font-size: var(--text-sm, 0.875rem);
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-c-md);
  opacity: 0;
  pointer-events: none;
  z-index: 1000;
  transition: opacity 150ms ease, transform 150ms ease;
}
.nav-item { position: relative; }
#sidebar[data-collapsed="true"] .nav-item:hover .nav-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(-2px);
}
#sidebar:not([data-collapsed="true"]) .nav-tooltip { display: none; }

/* When sidebar is collapsed, hide labels + badges, keep icons */
#sidebar[data-collapsed="true"] {
  width: 64px;
}
#sidebar[data-collapsed="true"] .nav-label,
#sidebar[data-collapsed="true"] .nav-badge,
#sidebar[data-collapsed="true"] .nav-section-label,
#sidebar[data-collapsed="true"] .sidebar-logo .logo-title,
#sidebar[data-collapsed="true"] .user-info {
  display: none;
}
#sidebar[data-collapsed="true"] .nav-item {
  justify-content: center;
  padding-inline: 0;
}

/* 5) Mobile drawer scrim */
.drawer-scrim {
  position: fixed; inset: 0;
  background: hsl(225 30% 6% / 0.45);
  -webkit-backdrop-filter: blur(4px);
          backdrop-filter: blur(4px);
  z-index: 99;
  opacity: 0;
  pointer-events: none;
  transition: opacity 240ms var(--ease-standard);
}
body[data-drawer-open="sidebar"] .drawer-scrim {
  opacity: 1;
  pointer-events: auto;
}

/* On desktop, scrim never visible */
@media (min-width: 981px) {
  .drawer-scrim { display: none; }
}
```

### Step 5 — JavaScript: `Upg.chrome` API

**APPEND** في `app.js`:

```javascript
/* ============================================================
   ATELIER v16 — Chrome Coordinator (Worker 14 / Phase 4)
   Public API: window.Upg.chrome.{ init, movePill, openSearch, closeDrawer }
   Wires: search-btn → Upg.cmdk, scroll → topbar compact, nav click → pill slide
   ============================================================ */
(() => {
  'use strict';

  const topbar = document.getElementById('topbar');
  const sidebar = document.getElementById('sidebar');
  const pill = sidebar?.querySelector('.nav-pill-indicator');

  // 1) Scroll-aware topbar compaction
  let compactState = false;
  const onScroll = () => {
    const scrolled = (window.scrollY || document.documentElement.scrollTop) > 80;
    if (scrolled === compactState) return;
    compactState = scrolled;
    if (topbar) topbar.dataset.scrollState = scrolled ? 'compact' : 'rest';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('main:scroll', onScroll); // legacy event from Upg.scroll
  onScroll();

  // 2) Search button → cmdk
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="open-cmdk"]');
    if (!btn) return;
    e.preventDefault();
    if (window.Upg?.cmdk?.open) window.Upg.cmdk.open();
  });

  // 3) Pill movement on nav-item activation
  const movePill = (targetItem) => {
    if (!pill || !sidebar || !targetItem) return;
    const sb = sidebar.getBoundingClientRect();
    const item = targetItem.getBoundingClientRect();
    const top = item.top - sb.top + sidebar.scrollTop;
    pill.style.height = item.height + 'px';
    pill.style.transform = `translateY(${top}px)`;
    pill.classList.add('is-active');
  };

  // Watch for active nav-item changes
  const updatePillFromActive = () => {
    const active = sidebar?.querySelector('.nav-item.active');
    if (active) movePill(active);
  };
  // Observe class changes on nav-items
  if (sidebar && 'MutationObserver' in window) {
    const mo = new MutationObserver(updatePillFromActive);
    sidebar.querySelectorAll('.nav-item').forEach((it) => {
      mo.observe(it, { attributes: true, attributeFilter: ['class'] });
    });
  }
  // Initial position
  setTimeout(updatePillFromActive, 100);

  // 4) Mobile drawer scrim — click closes
  document.addEventListener('click', (e) => {
    if (e.target.matches('.drawer-scrim')) {
      document.body.removeAttribute('data-drawer-open');
      if (sidebar) sidebar.classList.remove('mobile-open');
    }
  });

  // 5) Mobile menu toggle wires into drawer-open state
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = document.body.getAttribute('data-drawer-open') === 'sidebar';
      if (isOpen) {
        document.body.removeAttribute('data-drawer-open');
        sidebar?.classList.remove('mobile-open');
      } else {
        document.body.setAttribute('data-drawer-open', 'sidebar');
        sidebar?.classList.add('mobile-open');
      }
    });
  }

  // 6) ESC closes mobile drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.getAttribute('data-drawer-open') === 'sidebar') {
      document.body.removeAttribute('data-drawer-open');
      sidebar?.classList.remove('mobile-open');
    }
  });

  // 7) Swipe-to-close (touch)
  let touchStartX = null;
  sidebar?.addEventListener('touchstart', (e) => {
    if (window.innerWidth > 980) return;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  sidebar?.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    // RTL: swipe right (positive dx in RTL means towards inline-start = close)
    if (Math.abs(dx) > 60) {
      document.body.removeAttribute('data-drawer-open');
      sidebar?.classList.remove('mobile-open');
    }
    touchStartX = null;
  }, { passive: true });

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.chrome = {
    init: () => { onScroll(); updatePillFromActive(); },
    movePill,
    openSearch: () => window.Upg?.cmdk?.open && window.Upg.cmdk.open(),
    closeDrawer: () => {
      document.body.removeAttribute('data-drawer-open');
      sidebar?.classList.remove('mobile-open');
    },
  };
})();
```

### Step 6 — Sanity grep

```bash
# Topbar augmented
grep -c 'class="material-chrome island"' platform/index.html         # → 1
grep -c 'data-action="open-cmdk"' platform/index.html                # → 1

# Sidebar tooltips
grep -c 'class="nav-tooltip"' platform/index.html                    # → ≥14

# Pill indicator
grep -c 'class="nav-pill-indicator"' platform/index.html             # → 1

# Drawer scrim
grep -c 'class="drawer-scrim"' platform/index.html                   # → 1

# Upg.chrome present
grep -c 'window.Upg.chrome' platform/assets/app.js                   # → 1

# Sacred preserved
grep -c '<section class="page"' platform/index.html                  # → 14
grep -c 'qcalc' platform/index.html                                   # → 391
```

---

## ✅ معايير القبول (Phase 4)

- [ ] Topbar ينكمش من 64→48px عند `scrollY > 80` ويعود عند `< 80`.
- [ ] Click على search button (أو الكتابة) يفتح Command Palette.
- [ ] `⌘K` shortcut يعمل (موروث من `Upg.cmdk` — لم يُلمَس).
- [ ] Click على nav-item يحرّك pill spring 320ms (لا قفز).
- [ ] Cmd+\ يطوي sidebar إلى 64px، tooltips تظهر عند hover.
- [ ] Mobile @<981px: قائمة الـ ≡ تفتح drawer مع scrim.
- [ ] Click على scrim يُغلق drawer.
- [ ] ESC يُغلق drawer.
- [ ] Swipe على drawer >60px يُغلقه.
- [ ] جميع 14 nav-items + 14 page sections + 391 qcalc + Upg.* APIs preserved.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push

```bash
git add platform/index.html platform/assets/style.css platform/assets/app.js
git commit -m "phase 4 (atelier): chrome refinement — topbar island scroll-shrink + search→cmdk + nav-pill spring + sidebar tooltips + mobile drawer scrim"
# push

git add state/PROGRESS.json state/snapshots/worker-14-phase-4.json
git commit -m "state: atelier phase 4 committed and pushed"
# push
```

— نهاية Phase 4.
