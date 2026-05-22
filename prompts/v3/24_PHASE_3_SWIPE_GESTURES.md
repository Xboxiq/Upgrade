# 👆 WORKER 24 — Phase 3/5 — Swipe Gestures
> **اقرأ أولاً:** `prompts/v3/24_WORKER_DUAL_FORM.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phase 1 (dvh) + Phase 2 (bottom nav).
> **الفلسفة:** *الإصبع يَكتب. swipe يَقول "التالي" أو "السابق" أو "اِنْتَهِ". لا library — PointerEvents كافي. Vanilla forever.*

---

## 🛡️ Preservation Contract (Phase 3)

| العملية | المسموح | الممنوع |
|---|---|---|
| `platform/assets/js/upg-touch.js` | **CREATE** ESM module جديد | تعديل modules قائمة |
| `platform/assets/js/_compat.js` | **EXTEND** import + window.Upg.touch | تعديل |
| `platform/assets/css/utilities.css` | **APPEND** swipe utility classes | تعديل قائم |
| `platform/index.html` (shell) | لا يُلمَس | تغيير |
| `platform/pages/*.html` | لا يُلمَس | تغيير DOM |

**Sacred preserved:**
- جميع 30 Upg.* APIs (W24 P3 يَزيد Upg.touch).
- Pack v1/v2/v3 W20-W23 features.

---

## 🎯 الهدف

Phase 3 يُضيف **3 swipe variants** عبر PointerEvents:

| Variant | الـ Trigger | الإجراء | الأماكن |
|---|---|---|---|
| `page-swipe` | swipe horizontal على body (mobile only) | Mount next/previous page | كل الصفحات |
| `calc-swipe` | swipe horizontal على qcalc panel | Cycle through qcalc instances | accounting, dashboard |
| `dismiss-swipe` | swipe down على halo target / modals | Close halo / modal | reading halo, dialogs |

**Discipline:**
- PointerEvents (modern), TouchEvents fallback for old browsers.
- Threshold: 60px minimum displacement + velocity > 0.3px/ms.
- Mobile only (`@media (max-width: 720px)`).
- Disabled in landscape on tablets to avoid conflict with reading.
- Reduced-motion: still works but no transition animation.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 3 PRE-FLIGHT (Worker 24 / DUAL-FORM)
├─ Phase: 3/5 — Swipe Gestures
├─ Estimated lines: ~480 (JS module ~340 + CSS ~80 + compat extension)
├─ Files to touch:
│   ├─ platform/assets/js/upg-touch.js   (CREATE — ESM module)
│   ├─ platform/assets/js/_compat.js     (EXTEND ~20 lines)
│   ├─ platform/assets/css/utilities.css (APPEND ~80 lines)
│   └─ platform/sw.js                    (UPDATE pre-cache list)
├─ Sacred verify (run BEFORE):
│   ├─ ls platform/assets/js/upg-shards.js                        → exists (W23 P5)
│   ├─ grep -c 'mountShard' platform/assets/js/upg-shards.js      → ≥1
│   └─ grep -c 'dual-bottom-nav' platform/assets/css/chrome.css   → ≥6 (W24 P2)
├─ Branch: continue worker-24-devotio
```

---

## 🧱 خطوات التنفيذ

### Step 1 — CREATE `platform/assets/js/upg-touch.js`

```javascript
/* ════════════════════════════════════════════════════════════════════════
   DUAL-FORM v3 — Upg.touch (Worker 24 / Phase 3)
   PointerEvents-based swipe gestures.
   ════════════════════════════════════════════════════════════════════════ */
'use strict';

const SWIPE_THRESHOLD_PX  = 60;
const SWIPE_VELOCITY_MIN  = 0.3;  // px/ms
const SWIPE_TIME_MAX      = 600;  // ms
const MOBILE_MAX_WIDTH    = 720;

const PAGE_ORDER = [
  'dashboard', 'callcenter', 'fieldsales', 'accountmgr', 'social',
  'lab', 'psych', 'eq', 'negotiation', 'customercare',
  'programming', 'accounting', 'phonerepair', 'hrmastery',
  'myprogress', 'curriculum'
];

const isMobile = () => window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
const isReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Shared swipe detector ───────────────────────────────────────────

function attachSwipe(element, options) {
  const {
    onSwipeLeft  = null,
    onSwipeRight = null,
    onSwipeUp    = null,
    onSwipeDown  = null,
    direction    = 'all',          // 'horizontal' | 'vertical' | 'all'
    enabledFn    = () => true
  } = options || {};

  let startX = 0, startY = 0, startT = 0;
  let pointerActive = false;

  const onPointerDown = (e) => {
    if (!enabledFn()) return;
    if (e.pointerType === 'mouse') return;  // skip mouse on phase 3
    pointerActive = true;
    startX = e.clientX;
    startY = e.clientY;
    startT = Date.now();
  };

  const onPointerUp = (e) => {
    if (!pointerActive) return;
    pointerActive = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const dt = Date.now() - startT;

    if (dt > SWIPE_TIME_MAX) return;

    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const v = Math.max(absX, absY) / dt;
    if (v < SWIPE_VELOCITY_MIN) return;

    // Horizontal vs vertical priority
    if (direction !== 'vertical' && absX > SWIPE_THRESHOLD_PX && absX > absY) {
      if (dx > 0 && onSwipeRight) onSwipeRight(e);
      if (dx < 0 && onSwipeLeft)  onSwipeLeft(e);
    } else if (direction !== 'horizontal' && absY > SWIPE_THRESHOLD_PX && absY > absX) {
      if (dy > 0 && onSwipeDown) onSwipeDown(e);
      if (dy < 0 && onSwipeUp)   onSwipeUp(e);
    }
  };

  element.addEventListener('pointerdown', onPointerDown, { passive: true });
  element.addEventListener('pointerup',   onPointerUp,   { passive: true });

  // Cleanup function
  return () => {
    element.removeEventListener('pointerdown', onPointerDown);
    element.removeEventListener('pointerup', onPointerUp);
  };
}

// ─── 1. Page-Swipe (between pages) ───────────────────────────────────

const setupPageSwipe = () => {
  const host = document.querySelector('#page-host, main[data-shard-host]');
  if (!host) return;

  const navigateNext = () => {
    if (!window.Upg || !window.Upg.shards) return;
    const active = document.querySelector('section.page:not([hidden])');
    if (!active) return;
    const id = active.id.replace(/^page-/, '');
    const idx = PAGE_ORDER.indexOf(id);
    if (idx < 0 || idx === PAGE_ORDER.length - 1) return;
    window.Upg.shards.mountShard(PAGE_ORDER[idx + 1]);
  };

  const navigatePrev = () => {
    if (!window.Upg || !window.Upg.shards) return;
    const active = document.querySelector('section.page:not([hidden])');
    if (!active) return;
    const id = active.id.replace(/^page-/, '');
    const idx = PAGE_ORDER.indexOf(id);
    if (idx <= 0) return;
    window.Upg.shards.mountShard(PAGE_ORDER[idx - 1]);
  };

  attachSwipe(host, {
    direction: 'horizontal',
    enabledFn: () => isMobile(),
    // RTL-aware: in Arabic, swipe left = next, swipe right = previous
    onSwipeLeft:  () => (document.dir === 'rtl' ? navigatePrev() : navigateNext()),
    onSwipeRight: () => (document.dir === 'rtl' ? navigateNext() : navigatePrev())
  });
};

// ─── 2. Calc-Swipe (cycle through qcalc instances) ──────────────────

const setupCalcSwipe = () => {
  const calcs = document.querySelectorAll('.qcalc-panel, [data-qcalc-group]');
  calcs.forEach((calc) => {
    attachSwipe(calc, {
      direction: 'horizontal',
      enabledFn: () => isMobile(),
      onSwipeLeft:  () => calc.dispatchEvent(new CustomEvent('upg:calc:next')),
      onSwipeRight: () => calc.dispatchEvent(new CustomEvent('upg:calc:prev'))
    });
  });
};

// ─── 3. Dismiss-Swipe (close halo / modal) ──────────────────────────

const setupDismissSwipe = () => {
  // Halo target (W22 P2)
  const halo = document.querySelector('[data-rit-halo-target]');
  if (halo && window.Upg && window.Upg.ritual) {
    attachSwipe(halo, {
      direction: 'vertical',
      enabledFn: () => isMobile() && window.Upg.ritual.isHaloActive?.(),
      onSwipeDown: () => window.Upg.ritual.exitHalo?.()
    });
  }
};

// ─── Audit / API ─────────────────────────────────────────────────────

const audit = () => {
  return {
    mobile: isMobile(),
    reducedMotion: isReducedMotion(),
    pageOrder: PAGE_ORDER.slice(),
    listenersAttached: {
      pageSwipe:    !!document.querySelector('#page-host'),
      calcSwipe:    document.querySelectorAll('.qcalc-panel').length,
      dismissSwipe: document.querySelectorAll('[data-rit-halo-target]').length
    }
  };
};

// ─── Init ────────────────────────────────────────────────────────────

export function init() {
  const setup = () => {
    setupPageSwipe();
    setupCalcSwipe();
    setupDismissSwipe();
  };

  if (document.readyState !== 'loading') setup();
  else document.addEventListener('DOMContentLoaded', setup);

  // Re-attach calc-swipe + dismiss-swipe on page navigation
  document.addEventListener('upg:nav:change', () => {
    setTimeout(() => {
      setupCalcSwipe();
      setupDismissSwipe();
    }, 50);
  });

  // Expose
  window.Upg = window.Upg || {};
  window.Upg.touch = window.Upg.touch || {};
  Object.assign(window.Upg.touch, {
    attachSwipe,
    audit,
    PAGE_ORDER: PAGE_ORDER.slice(),
    config: {
      threshold: SWIPE_THRESHOLD_PX,
      velocityMin: SWIPE_VELOCITY_MIN,
      timeMax: SWIPE_TIME_MAX
    }
  });
}

export {
  attachSwipe,
  setupPageSwipe,
  setupCalcSwipe,
  setupDismissSwipe,
  audit,
  PAGE_ORDER
};
```

### Step 2 — UPDATE `platform/assets/js/_compat.js`

EXTEND existing list:

```javascript
const EXPECTED = [
  'theme','icons','gateway','calc','cmdk','state','production','type','scroll',
  'nav','identity','greet','countup','motion','material','chrome','choreo',
  'transition','focus','aura','life','sound','pace','practice',
  'font','chroma','ritual','layer','shards',
  'touch'  // W24 P3 ADD
];
```

### Step 3 — UPDATE `platform/assets/app.js` entry

```javascript
// existing:
import { init as init_shards } from './js/upg-shards.js';
// W24 P3 ADD:
import { init as init_touch } from './js/upg-touch.js';

// existing init calls:
init_shards();
// W24 P3 ADD:
init_touch();
```

### Step 4 — APPEND CSS Utilities

في `platform/assets/css/utilities.css`:

```css
/* ════════════════════════════════════════════════════════════════════════
   DUAL-FORM v3 — Swipe Visual Hints (Worker 24 / Phase 3)
   ════════════════════════════════════════════════════════════════════════ */

/* Page-host on mobile gets touch-action restriction so vertical scroll works */
@media (max-width: 720px) {
  #page-host,
  main[data-shard-host] {
    touch-action: pan-y;  /* allow vertical scroll, intercept horizontal */
  }

  .qcalc-panel {
    touch-action: pan-y;
  }
}

/* Visual swipe hint (subtle, fades after 3 seconds first time) */
.dual-swipe-hint {
  position: fixed;
  bottom: calc(var(--dual-bottom-nav-h, 64px) + var(--space-2, 0.5rem) + max(var(--space-2, 0.5rem), var(--safe-bottom)));
  inset-inline-end: var(--space-3, 0.75rem);
  font-family: var(--type-voice-label);
  font-size: 0.75rem;
  color: var(--color-text-faint);
  opacity: 0.6;
  pointer-events: none;
  transition: opacity 1500ms ease 3s;
  z-index: 600;
}
.dual-swipe-hint.dual-swipe-hint--fade {
  opacity: 0;
}

@media (min-width: 721px) {
  .dual-swipe-hint {
    display: none;
  }
}

/* End DUAL-FORM v3 / Phase 3 — Swipe Visual ─────────────────────────── */
```

### Step 5 — UPDATE Service Worker pre-cache

```javascript
// In sw.js CACHE_LIST:
'/assets/js/upg-touch.js'   // W24 P3 ADD
```

Bump cache:
```javascript
const CACHE_NAME = 'upgrade-v3-w24-p3';
```

### Step 6 — Discipline Comment

```javascript
/* ════════════════════════════════════════════════════════════════════════
   Worker 24 / Phase 3 — Swipe Discipline:
   1. PointerEvents فقط (modern). TouchEvents كـ fallback لو dispatched.
   2. Threshold = 60px + velocity ≥ 0.3px/ms.
   3. Mobile-only (≤720px).
   4. RTL-aware: swipe left in Arabic = previous (تَحرّك في الـ DOM order).
   5. لا library خارجية.
   6. Mouse drag مَستثنى — desktop يَستعمل sidebar/keyboard.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
# New module
ls platform/assets/js/upg-touch.js                                # → exists
wc -l platform/assets/js/upg-touch.js                             # → ≤480

# Compat list
grep -c "'touch'" platform/assets/js/_compat.js                   # → ≥1

# Entry imports
grep -c 'init_touch' platform/assets/app.js                       # → ≥2 (import + call)

# Touch-action CSS
grep -c 'touch-action' platform/assets/css/utilities.css          # → ≥2

# SW updated
grep -c 'upg-touch.js' platform/sw.js                             # → ≥1

# Browser test (mobile dimensions or actual phone):
# Swipe left on body → mounts next page
# Swipe right on body → mounts previous page
# RTL respected (Arabic): swipe left = previous direction
# Swipe down on halo target → exits halo
# Console: Upg.touch.audit() → mobile: true (if width≤720)
# Reduced-motion still works
```

---

## ✅ معايير القبول (Phase 3)

- [ ] `upg-touch.js` ESM module created.
- [ ] 3 swipe variants (page/calc/dismiss).
- [ ] PointerEvents-based.
- [ ] RTL-aware navigation.
- [ ] Mobile-only.
- [ ] `Upg.touch` API: attachSwipe, audit, PAGE_ORDER, config.
- [ ] `_compat.js` updated.
- [ ] SW pre-cache updated + version bumped.
- [ ] Touch-action CSS prevents scroll conflict.
- [ ] Console: 0 errors.
- [ ] Desktop: zero behavior change.

---

## 📤 Commit + Push

```bash
git add platform/assets/js/upg-touch.js platform/assets/js/_compat.js platform/assets/app.js platform/assets/css/utilities.css platform/sw.js
git commit -m "phase 3 (devotio): swipe gestures — 3 variants (page/calc/dismiss), pointer events, RTL-aware, mobile-only, Upg.touch API"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-24-phase-3.json
git commit -m "state: devotio phase 3 (worker 24) committed and pushed"
# push immediately
```

— نهاية Phase 3.

👆 **Devotion check:** هل الإصبع يَنطلق بين الصفحات؟ → Phase 4 (Haptic Layer).
