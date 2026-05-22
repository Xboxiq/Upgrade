# 📲 WORKER 24 — Phase 2/5 — Bottom Nav
> **اقرأ أولاً:** `prompts/v3/24_WORKER_DUAL_FORM.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phase 1 (dvh + safe-area).
> **الفلسفة:** *الموبايل يَفكّر بالإبهام. الـ sidebar طويلة، الإبهام قصير. Bottom nav يَجعل الـ ٥ أهمّ destinations في متناول اليد. desktop يبقى sidebar — لا اِزدواج.*

---

## 🛡️ Preservation Contract (Phase 2)

| العملية | المسموح | الممنوع |
|---|---|---|
| `chrome.css` | **APPEND** كتلة `Bottom Nav` (~340 سطر) | تعديل sidebar الموجود |
| `tokens.css` | **APPEND** 4 nav tokens | تعديل tokens قائمة |
| `platform/index.html` | **AUGMENT** `<nav id="dual-bottom-nav">` قبل `</body>` | تغيير DOM |
| `platform/assets/js/upg-nav.js` | **EXTEND** بـ bottom-nav sync logic | لمس signature |

**Sacred preserved:**
- Desktop sidebar — moved nothing.
- 14 page sections + 391 qcalc.
- Pack v3 W22 RITUAL UI features (entry, halo, transitions).
- Pack v3 W23 W24 architecture.

> **mobile-only:** bottom nav يَظهر فقط `@media (max-width: 720px)`. على الديسكتوب hidden.

---

## 🎯 الهدف

Phase 2 يُضيف **bottom nav** للموبايل:

**Structure:**
- 5 primary destinations:
  1. **الرئيسية** (Dashboard) — house icon
  2. **التدريب** (Curriculum / current page) — book icon
  3. **مَركز** (Quick action — Cmd+K equivalent) — pulse icon (center, larger)
  4. **التقدّم** (MyProgress) — chart icon
  5. **المزيد** (More — opens sidebar drawer for other pages) — dots icon

**Behavior:**
- Visible only on `(max-width: 720px)`.
- Active tab highlighted with current page's `--color-tint`.
- Center button slightly larger (FAB-style) — opens command palette.
- Tap → `Upg.shards.mountShard(id)` (W23 P4).
- Slide up animation on app load.
- Respects safe-area-inset-bottom.

**Discipline:**
- Touch targets 44×44px minimum.
- RTL-aware (RTL = first item on right in Arabic).
- No haptic on tap (P4 adds — opt-in there).
- Supports keyboard (Tab navigation).

---

## 📋 PRE-FLIGHT

```
📋 PHASE 2 PRE-FLIGHT (Worker 24 / DUAL-FORM)
├─ Phase: 2/5 — Bottom Nav
├─ Estimated lines: ~480 (CSS ~340 + JS ~80 + HTML ~30)
├─ Files to touch:
│   ├─ platform/assets/css/tokens.css   (APPEND 4 tokens)
│   ├─ platform/assets/css/chrome.css   (APPEND ~300 lines)
│   ├─ platform/assets/js/upg-nav.js    (EXTEND ~80 lines)
│   └─ platform/index.html              (AUGMENT bottom nav HTML)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c 'Upg.shards' platform/assets/js/_compat.js          → ≥1 (W23 P4)
│   └─ grep -c '\-\-safe-bottom' platform/assets/css/tokens.css    → ≥1 (W24 P1)
├─ Branch: continue worker-24-devotio
```

---

## 🧱 خطوات التنفيذ

### Step 1 — APPEND tokens

```css
/* ════════════════════════════════════════════════════════════════════════
   DUAL-FORM v3 — Bottom Nav Tokens (Worker 24 / Phase 2)
   ════════════════════════════════════════════════════════════════════════ */
:root {
  --dual-bottom-nav-bg:      color-mix(in oklch, var(--color-surface-1) 88%, transparent);
  --dual-bottom-nav-border:  var(--color-border);
  --dual-bottom-nav-radius:  20px;
  --dual-bottom-nav-shadow:  var(--shadow-c-lg);
}
```

### Step 2 — APPEND Bottom Nav HTML

في `platform/index.html`، قبل `</body>`:

```html
<!-- ════════════════════════════════════════════════════════════════════
     DUAL-FORM v3 — Bottom Nav (Worker 24 / Phase 2)
     Mobile-only. Hidden via CSS on > 720px.
     ════════════════════════════════════════════════════════════════════ -->
<nav id="dual-bottom-nav" class="dual-bottom-nav" aria-label="التنقّل السريع" data-mobile-only>
  <a href="#page-dashboard" class="dual-bottom-nav-item" data-shard="dashboard"
     aria-label="الرئيسية">
    <svg class="dual-bottom-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 12 12 3l9 9v9h-6v-6H9v6H3z" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
    <span class="dual-bottom-nav-label tas-voice-label">الرئيسية</span>
  </a>

  <a href="#page-curriculum" class="dual-bottom-nav-item" data-shard="curriculum"
     aria-label="التدريب">
    <svg class="dual-bottom-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4h16v16H4zm4 4h8M8 12h8M8 16h5" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
    <span class="dual-bottom-nav-label tas-voice-label">التدريب</span>
  </a>

  <button type="button" class="dual-bottom-nav-item dual-bottom-nav-center"
          data-action="cmdk-open" aria-label="مَركز الأوامر">
    <svg class="dual-bottom-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor"/>
      <path d="M12 7v10M7 12h10" stroke="white" stroke-width="2"/>
    </svg>
  </button>

  <a href="#page-myprogress" class="dual-bottom-nav-item" data-shard="myprogress"
     aria-label="التقدّم">
    <svg class="dual-bottom-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 17l4-6 4 4 4-7 6 8" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
    <span class="dual-bottom-nav-label tas-voice-label">التقدّم</span>
  </a>

  <button type="button" class="dual-bottom-nav-item" data-action="more-open"
          aria-label="المزيد">
    <svg class="dual-bottom-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="12" r="2" fill="currentColor"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <circle cx="18" cy="12" r="2" fill="currentColor"/>
    </svg>
    <span class="dual-bottom-nav-label tas-voice-label">المزيد</span>
  </button>
</nav>
```

### Step 3 — APPEND CSS

في `platform/assets/css/chrome.css`:

```css
/* ════════════════════════════════════════════════════════════════════════
   DUAL-FORM v3 — Bottom Nav Visual (Worker 24 / Phase 2)
   Mobile-only navigation. Floating-style.
   ════════════════════════════════════════════════════════════════════════ */

.dual-bottom-nav {
  position: fixed;
  bottom: 0;
  inset-inline: 0;
  display: none;  /* default: hidden on desktop */
  z-index: 700;
  padding-block: var(--space-2, 0.5rem);
  padding-bottom: max(var(--space-2, 0.5rem), var(--safe-bottom));
  padding-inline-start: max(var(--space-2, 0.5rem), var(--safe-left));
  padding-inline-end:   max(var(--space-2, 0.5rem), var(--safe-right));
  background: var(--dual-bottom-nav-bg);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border-top: 1px solid var(--dual-bottom-nav-border);
  /* Slide up on initial appear */
  transform: translateY(0);
  transition: transform 320ms cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 720px) {
  .dual-bottom-nav {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--space-1, 0.25rem);
    align-items: center;
    justify-items: center;
  }
}

@media (min-width: 721px) {
  .dual-bottom-nav {
    display: none !important;  /* desktop never */
  }
}

.dual-bottom-nav-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-1, 0.25rem) var(--space-2, 0.5rem);
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  text-decoration: none;
  font-family: var(--type-voice-label);
  cursor: pointer;
  border-radius: 12px;
  transition: color 160ms, background 160ms;
}

.dual-bottom-nav-item:hover,
.dual-bottom-nav-item:focus-visible {
  color: var(--color-text);
  background: color-mix(in oklch, var(--color-tint, var(--chr-lapis-500)) 12%, transparent);
}

/* Active tab — uses current page tint */
.dual-bottom-nav-item[data-active="true"] {
  color: var(--color-tint, var(--chr-lapis-500));
}
.dual-bottom-nav-item[data-active="true"]::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
}

.dual-bottom-nav-icon {
  width: 22px;
  height: 22px;
  color: currentColor;
  flex-shrink: 0;
}

.dual-bottom-nav-label {
  font-size: 0.65rem;
  line-height: 1;
  letter-spacing: 0;
  font-weight: 500;
}

/* Center button — FAB style, slightly elevated */
.dual-bottom-nav-center {
  background: var(--color-tint, var(--chr-lapis-500));
  color: white;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-block-start: -16px;  /* lifted */
  box-shadow: var(--dual-bottom-nav-shadow);
}
.dual-bottom-nav-center:hover {
  background: var(--color-tint-edge, var(--chr-lapis-700));
  color: white;
}
.dual-bottom-nav-center .dual-bottom-nav-icon {
  width: 26px;
  height: 26px;
}

/* Slide-up animation on first paint */
@keyframes dual-bottom-nav-rise {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
@media (max-width: 720px) {
  .dual-bottom-nav {
    animation: dual-bottom-nav-rise 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dual-bottom-nav {
    animation: none !important;
    transition: none !important;
  }
}

/* Push page-host content up by nav height when nav is visible */
@media (max-width: 720px) {
  #page-host,
  main[data-shard-host] {
    padding-bottom: calc(var(--dual-bottom-nav-h, 64px) + max(var(--space-4, 1rem), var(--safe-bottom)));
  }
}

/* End DUAL-FORM v3 / Phase 2 — Bottom Nav ───────────────────────────── */
```

### Step 4 — EXTEND `Upg.nav` (in upg-nav.js ESM module)

في `platform/assets/js/upg-nav.js`:

```javascript
/* ════════════════════════════════════════════════════════════════════════
   DUAL-FORM v3 — Bottom Nav Sync (Worker 24 / Phase 2)
   Extends existing Upg.nav (W11) module with bottom-nav awareness.
   ════════════════════════════════════════════════════════════════════════ */

// (existing init() function for Upg.nav...)

// Bottom nav sync helpers
const updateBottomNavActive = () => {
  const activePage = document.querySelector('section.page:not([hidden])');
  if (!activePage) return;
  const shardId = activePage.id.replace(/^page-/, '');
  document.querySelectorAll('.dual-bottom-nav-item[data-shard]').forEach((item) => {
    if (item.getAttribute('data-shard') === shardId) {
      item.setAttribute('data-active', 'true');
    } else {
      item.removeAttribute('data-active');
    }
  });
};

const handleBottomNavClick = (e) => {
  // Anchor with data-shard
  const anchor = e.target.closest('.dual-bottom-nav-item[data-shard]');
  if (anchor) {
    e.preventDefault();
    const shardId = anchor.getAttribute('data-shard');
    if (window.Upg && window.Upg.shards) {
      window.Upg.shards.mountShard(shardId);
    }
    return;
  }
  // Buttons with data-action
  const btn = e.target.closest('.dual-bottom-nav-item[data-action]');
  if (btn) {
    const action = btn.getAttribute('data-action');
    if (action === 'cmdk-open' && window.Upg && window.Upg.cmdk) {
      window.Upg.cmdk.open();
    } else if (action === 'more-open' && window.Upg && window.Upg.chrome) {
      window.Upg.chrome.openSidebar?.() || window.Upg.chrome.toggleSidebar?.();
    }
  }
};

// Attach to bottom nav
document.addEventListener('click', handleBottomNavClick);

// Sync on navigation
document.addEventListener('upg:nav:change', updateBottomNavActive);
document.addEventListener('DOMContentLoaded', updateBottomNavActive);
```

### Step 5 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 24 / Phase 2 — Bottom Nav Discipline:
   1. Mobile-only — hidden على >720px.
   2. ٥ destinations ثابتة (لا تَخلق ٦).
   3. Touch target ≥ 44×44px على كل عنصر.
   4. Active tab يَستعمل --color-tint الصفحة الحالية.
   5. Center FAB يَفتح command palette (Cmd+K equivalent).
   6. RTL-aware: في عربي، الترتيب تلقائياً يُعكَس بسبب dir="rtl".
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
# HTML
grep -c 'dual-bottom-nav' platform/index.html                     # → ≥6 (5 items + container)
grep -c 'data-shard=' platform/index.html                         # → ≥3

# CSS
grep -c '\.dual-bottom-nav' platform/assets/css/chrome.css        # → ≥6
grep -c '@keyframes dual-bottom-nav-rise' platform/assets/css/chrome.css  # → 1
grep -c 'max-width: 720px' platform/assets/css/chrome.css         # → ≥2

# Tokens
grep -c '\-\-dual-bottom-nav-' platform/assets/css/tokens.css     # → ≥4

# JS
grep -c 'updateBottomNavActive\|handleBottomNavClick' platform/assets/js/upg-nav.js  # → ≥2

# Browser test (mobile dimensions ≤720px):
# Bottom nav visible, 5 items, RTL order correct
# Active tab highlighted with page tint
# Center FAB visible, slightly elevated
# Tap "الرئيسية" → mounts dashboard ✓
# Tap center FAB → opens command palette ✓
# Resize to >720px → bottom nav disappears ✓
# Sidebar still works on desktop ✓
```

---

## ✅ معايير القبول (Phase 2)

- [ ] Bottom nav HTML أُضيف.
- [ ] CSS visible only on `≤720px`.
- [ ] 5 items × 44×44 minimum.
- [ ] Active tab styled with `--color-tint`.
- [ ] Center FAB elevated.
- [ ] Slide-up animation + reduced-motion guard.
- [ ] Safe-area bottom respected.
- [ ] Tap → Upg.shards.mountShard works.
- [ ] Center FAB → opens command palette.
- [ ] Console: 0 errors.
- [ ] Desktop: zero visual change.

---

## 📤 Commit + Push

```bash
git add platform/index.html platform/assets/css/ platform/assets/js/upg-nav.js
git commit -m "phase 2 (devotio): bottom nav — mobile-only 5 destinations + center FAB cmdk + RTL-aware + safe-area + slide-up animation"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-24-phase-2.json
git commit -m "state: devotio phase 2 (worker 24) committed and pushed"
# push immediately
```

— نهاية Phase 2.

📲 **Devotion check:** هل الموبايل صار يَفكّر بالإبهام؟ → Phase 3 (Swipe Gestures).
