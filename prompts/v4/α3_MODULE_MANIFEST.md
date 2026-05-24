# α3 — Module Manifest
> **Pillar α (FOUNDATION) / Stage 3 of 3**
> الهدف: إعادة هيكلة 92 ملف JS إلى ≤ 28 ملف ESM حقيقي مع dependency graph صريح.

---

## السياق (لماذا)

الواقع الحالي:
- 92 ملف JS، 87 منهم IIFE (ليس ESM رغم أن `app.js` يدّعي ESM)
- `_legacy-globals.js` 4,215 سطر = الوحش المخفي
- ترتيب `app.js` هش (side-effect order matters)
- helpers مرقمة 01-49 بدون أسماء وظيفية = صعب debug

ÊLAN يصلح هذا عبر إعادة تنظيم على أساس **النطاق الوظيفي**، ليس على أساس "phase أُضيف فيه".

---

## المُخرَجات

### Bucket System الجديد — `platform/assets/js/` بعد α3:

```
platform/assets/js/
├── app.js                    # entry point (ESM imports فقط)
├── _legacy-bridge.js         # ≤ 200 سطر — backward-compat shim
│
├── core/                     # ≈ 6 modules — الأساس
│   ├── state.js              # Upg.state (localStorage facade)
│   ├── nav.js                # Upg.nav (navigateTo, page transitions)
│   ├── theme.js              # Upg.theme (light/dark/sahar switch)
│   ├── icons.js              # Upg.icons (sprite resolver)
│   ├── font.js               # Upg.font (β1+β2+β3 unified)
│   └── compat.js             # public Upg.* shape audit + freeze
│
├── chrome/                   # ≈ 5 modules — الواجهة
│   ├── sidebar.js            # δ1 magnetic sidebar
│   ├── topbar.js             # δ3 living topbar
│   ├── bottom-nav.js         # δ4 mobile floating nav
│   ├── cmdk.js               # ⌘K command palette
│   └── toast.js              # toast/snackbar host
│
├── pages/                    # ≈ 11 modules — صفحة لكل ملف (lazy-load)
│   ├── dashboard.js
│   ├── callcenter.js
│   ├── fieldsales.js
│   ├── social.js
│   ├── lab.js
│   ├── psych.js              # دامج EQ + negotiation للحجم
│   ├── customercare.js
│   ├── programming.js
│   ├── accounting.js
│   ├── phonerepair.js
│   └── hrmastery.js
│
├── motion/                   # ≈ 3 modules — الحركة
│   ├── choreo.js             # δ5 view transitions
│   ├── countup.js            # number ticker
│   └── reduced.js            # δ6 prefers-reduced-motion gate
│
└── ux/                       # ≈ 3 modules — التفاعل
    ├── focustrap.js
    ├── touch.js              # δ4 swipe + haptics
    └── ritual.js              # γ3 sahar transition
```

**المجموع: ~28 ملف بدلاً من 92.**

---

## التنفيذ

### ١. أنشئ `platform/assets/js/MANIFEST.md` — خريطة المسؤوليات

```markdown
# ÊLAN v4 — JS Module Manifest

| Module | Public API | Used by | Lazy-load? |
|---|---|---|---|
| core/state.js     | Upg.state.{get,set,subscribe}     | all pages           | no  |
| core/nav.js       | Upg.nav.{to,back,onChange}        | all pages, chrome   | no  |
| core/theme.js     | Upg.theme.{set,toggle,current}    | chrome/topbar       | no  |
| core/icons.js     | Upg.icons.{resolve,inject}        | all                 | no  |
| core/font.js      | Upg.font.{voices,audit,signature} | β phases            | no  |
| chrome/sidebar.js | (event-driven, no public API)     | shell               | no  |
| chrome/topbar.js  | (event-driven)                    | shell               | no  |
| chrome/bottom-nav.js | (event-driven)                 | shell, mobile-only  | no  |
| chrome/cmdk.js    | Upg.cmdk.{open,register}          | shell               | no  |
| chrome/toast.js   | Upg.toast.{show,error,success}    | all                 | no  |
| pages/<X>.js      | (initialized on nav to that page) | nav.js              | yes |
| motion/choreo.js  | Upg.motion.transition()           | nav.js              | no  |
| motion/countup.js | Upg.motion.countUp(el)            | dashboard, hr       | no  |
| motion/reduced.js | Upg.motion.reduced (boolean)      | all                 | no  |
| ux/focustrap.js   | Upg.ux.trap(el)                   | modals, cmdk        | no  |
| ux/touch.js       | (event-driven)                    | mobile-only         | no  |
| ux/ritual.js      | Upg.ritual.sahar()                | first-mount         | no  |
```

### ٢. أنشئ `platform/assets/js/app.js` (يحلّ القديم)

```javascript
/* ÊLAN v4 — α3 — Module Entry
   ESM-true. No IIFE wrappers. No side-effect ordering surprises. */

// Core (must load first — no lazy)
import './core/icons.js';
import './core/state.js';
import './core/theme.js';
import './core/font.js';
import './core/nav.js';

// Chrome (depends on core)
import './chrome/sidebar.js';
import './chrome/topbar.js';
import './chrome/bottom-nav.js';
import './chrome/cmdk.js';
import './chrome/toast.js';

// Motion (depends on core/nav)
import './motion/reduced.js';
import './motion/choreo.js';
import './motion/countup.js';

// UX (depends on core)
import './ux/focustrap.js';
import './ux/touch.js';
import './ux/ritual.js';

// Pages — lazy-loaded by nav.js on demand
// (no static imports here)

// Compat — last
import './core/compat.js';

// Backward-compat bridge — keeps window.Upg.* alive for legacy code
import './_legacy-bridge.js';
```

### ٣. كتابة 1 module نموذجي (`core/state.js`) كـ ESM حقيقي

```javascript
/* ÊLAN v4 — core/state.js
   Upg.state — localStorage facade with subscribe pattern. */

const PREFIX = 'upg_';
const subscribers = new Map();

export function get(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch { return fallback; }
}

export function set(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    notify(key, value);
    return true;
  } catch { return false; }
}

export function subscribe(key, fn) {
  if (!subscribers.has(key)) subscribers.set(key, new Set());
  subscribers.get(key).add(fn);
  return () => subscribers.get(key).delete(fn);
}

function notify(key, value) {
  const subs = subscribers.get(key);
  if (subs) subs.forEach(fn => { try { fn(value); } catch (e) { console.error(e); } });
}

// Backward-compat — keep window.Upg.state alive
window.Upg = window.Upg || {};
window.Upg.state = Object.freeze({ get, set, subscribe });
```

### ٤. خطة الترحيل (لا تُنفَّذ كاملةً في α3 — α3 يُنشئ الهيكل فقط، الترحيل التدريجي يحدث في pillars التالية)

في α3 نُنشئ:
- المجلدات الجديدة: `core/`, `chrome/`, `pages/`, `motion/`, `ux/`
- `MANIFEST.md` خريطة الترحيل
- `core/state.js` و `core/nav.js` و `core/theme.js` كـ **modules نظيفة جديدة** (ESM حقيقي)
- `app.js` الجديد يستمر بـ legacy imports حالياً (لا نكسر شيء)
- `_legacy-bridge.js` (نسخة شبه فارغة، تنمو في pillars التالية)

في **β/γ/δ/ε pillars** كل phase يُرحّل modules معينة من /js/upg-*.js إلى البنية الجديدة، ويحذف القديم.

### ٥. `_legacy-bridge.js` placeholder (≈ 30 سطر فقط)

```javascript
/* ÊLAN v4 — _legacy-bridge.js
   Migration buffer. Each pillar reduces this file as it moves modules.
   Goal by ζ: ≤ 200 lines. */

// During α3, the legacy IIFE imports remain in app.js.
// β/γ/δ/ε will progressively replace them with ESM modules.

console.info('[ÊLAN v4] Legacy bridge active. Migration in progress.');
```

---

## Acceptance Criteria

- [ ] 5 مجلدات جديدة موجودة: `core/, chrome/, pages/, motion/, ux/`
- [ ] `MANIFEST.md` موجود ويصف كل module
- [ ] على الأقل **3 modules ESM حقيقية** موجودة: `core/state.js`, `core/nav.js`, `core/theme.js`
- [ ] grep يثبت: `grep -lE '^export ' platform/assets/js/core/*.js | wc -l` ≥ 3
- [ ] `app.js` لا يزال يعمل (لم يُكسَر) — legacy imports تبقى مؤقتاً
- [ ] `_legacy-bridge.js` موجود ≤ 50 سطراً
- [ ] صفحة dashboard لا تزال تفتح بدون errors في console
- [ ] commit: `α3: Module Manifest — verified: dirs=5, esm_modules=3, app_js_works=true`

---

## بعد α3 — انتهت Pillar α

اطبع:
```
✦ Pillar α (FOUNDATION) — COMPLETE
🎯 Next: Pillar β (TYPE SOUL) — branch: elan-β-type-soul
🌿 Action: open new branch from main, start with β1.
```

أنشئ PR من `elan-α-foundation` إلى `main` بالعنوان:
**"feat(elan-v4): Pillar α — FOUNDATION (3/3 stages)"**

— نهاية α3 — نهاية Pillar α —
