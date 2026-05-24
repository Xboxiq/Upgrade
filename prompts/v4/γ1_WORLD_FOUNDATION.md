# γ1 — World Foundation
> **Pillar γ (EIGHT WORLDS) / Stage 1 of 9**
> الهدف: بناء البنية التحتية لنظام العوالم — JS state + body attribute + page-to-world mapping.
> **حذف ما يجب حذفه:** الـ themes القديمة (light/dark) من style.css.

---

## السياق (لماذا هذا أولاً)

قبل ملء أي عالم بـ tokens، نحتاج:
1. **JS API** يبدّل العالم حسب الصفحة الحالية
2. **HTML hooks** كل page section لها `data-world="<name>"`
3. **CSS skeleton** كل `[data-world]` selector له entry point في worlds/_<name>.css
4. **حذف الـ themes** القديمة (لأن السيستم يتغيّر، لا تتعايش)
5. **Beacon: STRUCTURAL_BEACON** — استخدام `:has()` selector لتفعيل العوالم بدون JS كـ fallback

---

## 🎨 Creativity Beacon لهذه stage

**Type:** 🏛 STRUCTURAL_BEACON
**The Surprise:** نظام العوالم يَستخدم `:has()` CSS selector ليُفعِّل العالم تلقائياً بناءً على وجود child element مميز — بدون أي JS كـ requirement. الـ JS هو enhancement فقط. هذا يعني المنصة تشتغل offline + بدون JS وبكامل العوالم.
**Reference Avoided:** #14 standard "JS-driven theme switcher"
**Inspired-by:** #6 Müller-Brockmann Grid (عمل النظام نفسه يُظهِر النظام)
**User-Visible:** yes (عند تنقل صفحة، العالم يتغير فوراً قبل JS)
**Originality Self-Score:** 4/5

---

## التنفيذ

### ١. تحديث `index.html` — أضف `data-world` لكل section.page

```html
<section class="page" id="page-dashboard"     data-world="hibr">    ... </section>
<section class="page" id="page-myprogress"    data-world="hibr">    ... </section>
<section class="page" id="page-lab"           data-world="naar">    ... </section>
<section class="page" id="page-programming"   data-world="naar">    ... </section>
<section class="page" id="page-psych"         data-world="nada">    ... </section>
<section class="page" id="page-eq"            data-world="nada">    ... </section>
<section class="page" id="page-negotiation"   data-world="hadeed">  ... </section>
<section class="page" id="page-fieldsales"    data-world="hadeed">  ... </section>
<section class="page" id="page-accounting"    data-world="dhahab">  ... </section>
<section class="page" id="page-social"        data-world="tayyar">  ... </section>
<section class="page" id="page-callcenter"    data-world="tayyar">  ... </section>
<section class="page" id="page-customercare"  data-world="warsha">  ... </section>
<section class="page" id="page-phonerepair"   data-world="warsha">  ... </section>
<section class="page" id="page-hrmastery"     data-world="saloon">  ... </section>
<section class="page" id="page-accountmgr"    data-world="saloon">  ... </section>
```

### ٢. أنشئ `platform/assets/js/elan/world.js` (ESM)

```javascript
/* ÊLAN v4 — γ1 — World controller
   Listens to nav events, updates body[data-world] to match active page.
   Falls back to CSS :has() selector if JS is disabled. */

const WORLD_MAP = {
  'page-dashboard':    'hibr',
  'page-myprogress':   'hibr',
  'page-lab':          'naar',
  'page-programming':  'naar',
  'page-psych':        'nada',
  'page-eq':           'nada',
  'page-negotiation':  'hadeed',
  'page-fieldsales':   'hadeed',
  'page-accounting':   'dhahab',
  'page-social':       'tayyar',
  'page-callcenter':   'tayyar',
  'page-customercare': 'warsha',
  'page-phonerepair':  'warsha',
  'page-hrmastery':    'saloon',
  'page-accountmgr':   'saloon',
};

const DEFAULT_WORLD = 'hibr';

function setWorld(pageId) {
  const world = WORLD_MAP[pageId] || DEFAULT_WORLD;
  if (document.body.dataset.world === world) return false;

  // View Transition (δ5 will replace this with proper transition)
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      document.body.dataset.world = world;
    });
  } else {
    document.body.dataset.world = world;
  }
  document.dispatchEvent(new CustomEvent('upg:world:change', { detail: { world, pageId } }));
  return true;
}

function getActivePageId() {
  // Check Upg.nav state, fallback to first .page.is-active in DOM
  const fromNav = window.Upg?.nav?.current?.();
  if (fromNav) return fromNav;
  const active = document.querySelector('.page.is-active, .page[data-active="true"]');
  return active?.id || 'page-dashboard';
}

// Initial sync
function init() {
  setWorld(getActivePageId());

  // Listen to nav changes (Upg.nav fires events)
  document.addEventListener('upg:nav:change', (e) => {
    setWorld(e.detail?.pageId || getActivePageId());
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Public API
window.Upg = window.Upg || {};
window.Upg.world = Object.freeze({
  set: setWorld,
  current: () => document.body.dataset.world,
  map: () => Object.freeze({ ...WORLD_MAP }),
});

export { setWorld, WORLD_MAP, DEFAULT_WORLD };
```

### ٣. تسجيل في `platform/assets/app.js` — أضف import واحد

```javascript
// أضف بعد imports الـ core الموجودة
import './js/elan/world.js';
```

### ٤. CSS Beacon — `:has()` fallback (في `platform/assets/css/worlds/_index.css` جديد)

```css
/* ÊLAN v4 — γ1 — World :has() fallback (Beacon)
   Activates a world based on which active page is in DOM.
   Works without JS. */

@supports selector(:has(*)) {
  body:has(.page.is-active[data-world="hibr"])    { /* will be styled by _hibr.css   */ }
  body:has(.page.is-active[data-world="naar"])    { /* will be styled by _naar.css   */ }
  body:has(.page.is-active[data-world="nada"])    { /* will be styled by _nada.css   */ }
  body:has(.page.is-active[data-world="hadeed"])  { /* will be styled by _hadeed.css */ }
  body:has(.page.is-active[data-world="dhahab"])  { /* will be styled by _dhahab.css */ }
  body:has(.page.is-active[data-world="tayyar"])  { /* will be styled by _tayyar.css */ }
  body:has(.page.is-active[data-world="warsha"])  { /* will be styled by _warsha.css */ }
  body:has(.page.is-active[data-world="saloon"])  { /* will be styled by _saloon.css */ }
}
```

(الـ rules داخل سيُملأها γ2-γ9 — الآن selector جاهز)

### ٥. حذف الـ themes القديمة من `style.css`

```css
/* احذف completely:
   :root[data-theme="light"] { ... }
   :root[data-theme="dark"]  { ... }
   كل الـ block @layer themes الحالي
*/

/* استبدله بـ */
@layer themes {
  /* ÊLAN v4 — γ1 — themes deprecated.
     Worlds replace themes. See worlds/_<name>.css */
}
```

### ٦. تحديث `Upg.theme` للـ backward-compat

في `core/theme.js`:
```javascript
/* Legacy Upg.theme.set('light'|'dark') maps to default world */
const LEGACY_MAP = { light: 'hibr', dark: 'naar' };
export function set(legacyName) {
  if (LEGACY_MAP[legacyName]) {
    return window.Upg.world.set(LEGACY_MAP[legacyName] === 'hibr'
      ? 'page-dashboard' : 'page-lab');
  }
}
```

(هذا يحفظ الـ 14 Upg.* APIs sacred)

---

## Acceptance Criteria

- [ ] 16 page sections لها `data-world` صحيحة
- [ ] `platform/assets/js/elan/world.js` موجود ويُصدِّر `setWorld`
- [ ] `app.js` يستورده
- [ ] `worlds/_index.css` يحتوي 8 :has() fallbacks
- [ ] block `@layer themes` في style.css فارغ (themes deprecated)
- [ ] `Upg.world.set('page-lab')` يعمل من console
- [ ] `Upg.world.current()` يعيد string صحيح
- [ ] `Upg.theme.set('dark')` يفعل world `naar` (legacy compat)
- [ ] event `upg:world:change` يُطلَق عند التبديل
- [ ] grep: `grep -c 'data-world=' platform/index.html` == 16
- [ ] commit: `γ1: World Foundation — verified: data_world=16, has_fallback=8, themes_purged=true`
- [ ] Beacon recorded in CREATIVITY_LOG.md

---

## بعد γ1

ابدأ γ2 (حِبر) — أول عالم يأخذ palette حقيقية.

— نهاية γ1 —
