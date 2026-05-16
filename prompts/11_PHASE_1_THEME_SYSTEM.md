# 🎨 WORKER 11 — Phase 1/7 — Sovereign Theme System
> **اقرأ أولاً:** `prompts/11_WORKER_PLATFORM_FOUNDATION.md` (الفهرس).
> **متطلب مسبق:** MASTER PROMPT محمّل + state/PROGRESS.json يشير لبداية Worker 11.
> **الفلسفة:** "Tokens — مو ألوان". نبني طبقة سيمانتية تجعل الفاتح/الداكن متناغمَين بدون كسر، بدون `!important`، بدون لمس Workers 01..09.

---

## 🎯 الهدف

إعادة بناء العمود الفقري للثيم بحيث:
- يصير عندنا **5 surface levels** حقيقية (مو 3 فقط)
- يصير الـ Brand color **يبقى كما هو** عبر الثيمين (الفرق فقط في tonality)
- ينتقل المستخدم بين الثيمين **بدون أي كسر بصري** على أي صفحة من 14
- نُلغي `!important` من قسم Light Theme بالكامل
- نضيف **Auto / Dark / Light** كـ 3-state toggle
- نحترم `prefers-color-scheme` أوتوماتيكياً + system change listener

---

## 📋 PRE-FLIGHT لهذا الـ Phase

```
📋 PHASE 1 PRE-FLIGHT
├─ Phase: 1/7 — Sovereign Theme System
├─ Estimated lines: ~700 (CSS ~550 + JS ~150)
├─ Files to touch:
│   ├─ platform/assets/style.css  (إضافة tokens + إصلاح light theme)
│   ├─ platform/assets/app.js     (Upg.theme module)
│   └─ platform/index.html        (theme toggle markup update — 3-state)
├─ Sections preserved: ALL existing CSS rules (additive only via bridge layer)
├─ localStorage key: upg_theme  (auto|dark|light)
└─ Deliverable: commit "phase 1: Sovereign Theme System" + push.
```

---

## 🧱 خطوات التنفيذ بالتفصيل

### Step 1 — أضف **Tokens سيمانتية** بعد الـ `:root` الموجود (لا تستبدل القديم)

موقع الإدراج: في أعلى `style.css`، بعد آخر تعريف للـ `:root` الموجود (~السطر 280).

```css
/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Sovereign Theme Tokens (Worker 11 / Phase 1)
   Layer: semantic tokens (5 surface levels + tinted shadows)
   Compatibility: legacy --bg, --surface, --text, --accent kept via bridge.
   ═══════════════════════════════════════════════════════════════ */
:root {
  /* Surface ladder — 5 مستويات لعمق حقيقي */
  --color-bg:           hsl(225 30% 6%);
  --color-surface-0:    hsl(225 26% 9%);
  --color-surface-1:    hsl(225 22% 12%);
  --color-surface-2:    hsl(225 20% 16%);
  --color-surface-3:    hsl(225 18% 20%);

  /* Text ladder */
  --color-text:         hsl(220 20% 98%);
  --color-text-muted:   hsl(220 15% 70%);
  --color-text-faint:   hsl(220 12% 50%);

  /* Borders */
  --color-border:        hsl(225 18% 22%);
  --color-border-strong: hsl(225 22% 32%);

  /* Brand — يبقى نفسه عبر الثيمين (هوية موحّدة) */
  --color-brand:        hsl(176 100% 70%);
  --color-brand-hover:  hsl(176 100% 76%);
  --color-brand-soft:   color-mix(in oklch, var(--color-brand) 14%, transparent);
  --color-brand-strong: hsl(176 100% 60%);

  /* Semantic state colors */
  --color-success:      hsl(152 70% 55%);
  --color-warning:      hsl(38 92% 60%);
  --color-danger:       hsl(0 80% 65%);
  --color-info:         hsl(210 90% 65%);

  /* Tinted shadows (Refactoring UI principle — لا shadow أسود نقي) */
  --shadow-sm: 0 1px 2px hsl(225 40% 2% / 0.4);
  --shadow-md: 0 4px 12px hsl(225 40% 2% / 0.5), 0 1px 2px hsl(225 40% 2% / 0.3);
  --shadow-lg: 0 12px 32px hsl(225 40% 2% / 0.55), 0 2px 6px hsl(225 40% 2% / 0.35);
  --shadow-xl: 0 24px 60px hsl(225 40% 2% / 0.6), 0 4px 12px hsl(225 40% 2% / 0.4);

  /* Focus ring — موحّد عبر الثيمين */
  --ring: 0 0 0 3px color-mix(in oklch, var(--color-brand) 35%, transparent);
  --ring-offset: 2px;

  /* Geometry tokens — مرجع لكل radius/spacing */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 999px;
}

/* Off-White Premium (Stripe-grade — دافئ لا أبيض ساطع) */
:root[data-theme="light"],
[data-theme="light"] {
  --color-bg:           hsl(40 18% 97%);   /* off-white دافئ */
  --color-surface-0:    hsl(40 25% 99%);
  --color-surface-1:    hsl(40 18% 96%);
  --color-surface-2:    hsl(40 14% 93%);
  --color-surface-3:    hsl(40 12% 89%);

  --color-text:         hsl(220 35% 12%);
  --color-text-muted:   hsl(220 18% 38%);
  --color-text-faint:   hsl(220 12% 55%);

  --color-border:        hsl(220 14% 86%);
  --color-border-strong: hsl(220 16% 76%);

  --color-brand:        hsl(176 70% 38%);   /* أغمق قليلاً للـ contrast */
  --color-brand-hover:  hsl(176 75% 32%);
  --color-brand-soft:   color-mix(in oklch, var(--color-brand) 12%, white);
  --color-brand-strong: hsl(176 75% 30%);

  --color-success:      hsl(152 65% 38%);
  --color-warning:      hsl(38 88% 48%);
  --color-danger:       hsl(0 72% 50%);
  --color-info:         hsl(210 88% 48%);

  --shadow-sm: 0 1px 2px hsl(220 30% 20% / 0.06);
  --shadow-md: 0 4px 12px hsl(220 30% 20% / 0.08), 0 1px 2px hsl(220 30% 20% / 0.04);
  --shadow-lg: 0 12px 32px hsl(220 30% 20% / 0.10), 0 2px 6px hsl(220 30% 20% / 0.05);
  --shadow-xl: 0 24px 60px hsl(220 30% 20% / 0.12), 0 4px 12px hsl(220 30% 20% / 0.06);

  --ring: 0 0 0 3px color-mix(in oklch, var(--color-brand) 30%, transparent);

  color-scheme: light;
}

:root[data-theme="dark"],
[data-theme="dark"] { color-scheme: dark; }
```

### Step 2 — **Bridge Layer** (يحافظ على CSS قديم 100%)

أضف هذي القاعدة **مباشرة بعد** الـ tokens أعلاه:

```css
/* ═══════════════════════════════════════════════════════════════
   Bridge Layer — Legacy tokens redirect to new semantic tokens.
   هذا هو شريان الحياة. لا تحذفه.
   ═══════════════════════════════════════════════════════════════ */
:root {
  --bg:           var(--color-bg);
  --surface:      var(--color-surface-1);
  --surface-2:    var(--color-surface-2);
  --surface-3:    var(--color-surface-3);

  --text:         var(--color-text);
  --text-muted:   var(--color-text-muted);
  --text-faint:   var(--color-text-faint);

  --accent:       var(--color-brand);
  --accent-dim:   color-mix(in oklch, var(--color-brand) 70%, transparent);
  --accent-glow:  color-mix(in oklch, var(--color-brand) 35%, transparent);
  --accent-soft:  var(--color-brand-soft);

  --border:        var(--color-border);
  --border-hover:  var(--color-border-strong);

  /* Glass tokens recalculated من surface */
  --glass-bg:      color-mix(in oklch, var(--color-surface-1) 80%, transparent);
  --glass-border:  color-mix(in oklch, var(--color-border) 60%, transparent);
}
```

### Step 3 — **حذف `!important` من قسم Light Theme القديم**

اذهب للسطور **3610..3820** في `style.css` (قسم `body[data-theme="light"]`). نفّذ التحويل التالي:

- كل `color: #XXX !important;` → احذف `!important` واستبدل القيمة بـ `var(--color-text)` أو المناسب.
- كل `background: rgba(...)... !important` → استبدل بـ `var(--color-surface-X)` أو `var(--color-brand-soft)`.
- كل `border: ... !important` → استبدل بـ `var(--color-border)`.

> **ملاحظة:** بعد إضافة Bridge Layer (Step 2)، **معظم القواعد القديمة تشتغل تلقائياً** لأنها تعتمد على `--bg`, `--surface`, إلخ — وهذي الآن تتغيّر تلقائياً مع `data-theme`. خلِّي القواعد المعقدة فقط، واحذف الباقي.

**الهدف النهائي:** نتيجة `grep -c '!important' platform/assets/style.css` تنخفض بـ ≥ 80%.

### Step 4 — **`Upg.theme` JavaScript Module**

أضف في `app.js` كـ IIFE جديد (مكان الإدراج: بعد آخر IIFE موجود):

```js
/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Theme Engine (Worker 11 / Phase 1)
   3-state: auto | dark | light  +  system change listener
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const KEY = 'upg_theme';
  const ORDER = ['auto', 'dark', 'light'];
  const mq = matchMedia('(prefers-color-scheme: light)');

  const resolve = (mode) => {
    if (mode === 'auto') return mq.matches ? 'light' : 'dark';
    return mode;
  };

  const apply = (mode) => {
    const actual = resolve(mode);
    document.documentElement.dataset.theme = actual;
    document.body.dataset.theme = actual;
    // Update browser UI color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim();
      meta.setAttribute('content', bg || (actual === 'light' ? '#FAFAF9' : '#0E1220'));
    }
    // Notify any listeners (Phase 5 cmdk uses this)
    window.dispatchEvent(new CustomEvent('upg:theme-change', { detail: { mode, actual } }));
  };

  const get = () => localStorage.getItem(KEY) || 'auto';
  const set = (mode) => {
    if (!ORDER.includes(mode)) return;
    localStorage.setItem(KEY, mode);
    apply(mode);
  };
  const cycle = () => set(ORDER[(ORDER.indexOf(get()) + 1) % ORDER.length]);

  // Initial apply (سريعاً قبل rendering للحؤول دون flash)
  apply(get());

  // System change listener (only effective when mode === 'auto')
  mq.addEventListener('change', () => { if (get() === 'auto') apply('auto'); });

  // Wire toggle button(s)
  const wireToggles = () => {
    document.querySelectorAll('.theme-toggle, [data-action="toggle-theme"]').forEach(btn => {
      btn.addEventListener('click', cycle);
      btn.setAttribute('aria-label', 'تبديل الثيم (Auto / Dark / Light)');
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireToggles);
  } else {
    wireToggles();
  }

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.theme = { get, set, cycle, resolve };
})();
```

### Step 5 — **HTML Markup للزر** (3-state)

موقع: في `platform/index.html` (~السطر 283 — زر اللمبة الحالي). استبدله بـ:

```html
<button class="theme-toggle" type="button"
        data-action="toggle-theme"
        aria-label="تبديل الثيم — Auto / Dark / Light">
  <span class="theme-toggle-icon" data-theme-state="auto">
    <i class="qi" data-icon="monitor"></i>
  </span>
  <span class="theme-toggle-icon" data-theme-state="dark">
    <i class="qi" data-icon="moon"></i>
  </span>
  <span class="theme-toggle-icon" data-theme-state="light">
    <i class="qi" data-icon="sun"></i>
  </span>
</button>
```

> **ملاحظة:** أيقونات `qi` تُحقن في **Phase 2**. مؤقتاً يمكن استخدام text fallback (`A` / `D` / `L`) أو SVG inline مباشر.

CSS الإضافي للزر (يحدد أي icon يظهر حسب الـ state):

```css
.theme-toggle .theme-toggle-icon { display: none; }
:root[data-theme="dark"]  .theme-toggle .theme-toggle-icon[data-theme-state="dark"]  { display: inline-flex; }
:root[data-theme="light"] .theme-toggle .theme-toggle-icon[data-theme-state="light"] { display: inline-flex; }
/* في "auto" mode، نحدد بناء على الـ resolved state — نضيف data-mode للزر */
```

تحسين: `Upg.theme.apply` تضع أيضاً `body.dataset.themeMode = mode` (الـ raw mode) ليتيح للـ CSS التمييز:

```css
body[data-theme-mode="auto"] .theme-toggle .theme-toggle-icon[data-theme-state="auto"] { display: inline-flex; }
body[data-theme-mode="dark"] .theme-toggle .theme-toggle-icon[data-theme-state="auto"],
body[data-theme-mode="light"] .theme-toggle .theme-toggle-icon[data-theme-state="auto"] { display: none; }
body[data-theme-mode="dark"]  .theme-toggle .theme-toggle-icon[data-theme-state="dark"]  { display: inline-flex; }
body[data-theme-mode="light"] .theme-toggle .theme-toggle-icon[data-theme-state="light"] { display: inline-flex; }
```

### Step 6 — **Smooth Theme Transition** (View Transitions API لو متاحة)

```css
@supports (view-transition-name: root) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 280ms;
    animation-timing-function: cubic-bezier(.4,0,.2,1);
  }
}
```

في `apply()`، لو `document.startViewTransition` متاحة:

```js
const apply = (mode) => {
  const actual = resolve(mode);
  const run = () => {
    document.documentElement.dataset.theme = actual;
    document.body.dataset.theme = actual;
    document.body.dataset.themeMode = mode;
    /* ... rest */
  };
  if (document.startViewTransition) document.startViewTransition(run);
  else run();
};
```

---

## ✅ Acceptance Criteria للـ Phase 1

- [ ] `:root` و `[data-theme="light"]` يحويان كل الـ semantic tokens المذكورة.
- [ ] Bridge layer مضاف ويربط `--bg`, `--surface`, `--text`, `--accent`, `--border`.
- [ ] `grep -c '!important' platform/assets/style.css` انخفض بـ ≥ 80%.
- [ ] الـ 14 صفحة تعرض بشكل صحيح في **dark** و **light** بدون أي بقعة كسر.
- [ ] الزر يدور بين 3 states: auto / dark / light.
- [ ] `localStorage.upg_theme` يُحفظ ويُحترم بعد refresh.
- [ ] `prefers-color-scheme` change → في mode `auto` ينعكس فوراً.
- [ ] `meta[name="theme-color"]` يتحدّث مع الثيم.
- [ ] لا errors في console.

---

## 🛡️ في نهاية الـ Phase

اطبع `CHECKPOINT` + `STATE_SNAPSHOT` كما في MASTER، ثم:

```
1. commit  : "phase 1: Sovereign Theme System (tokens + bridge + 3-state toggle)"
2. push    : worker-11-complete  → origin
3. update  : state/PROGRESS.json (current.phase=1, status="in-progress")
4. snapshot: state/snapshots/worker-11-phase-1.json
5. commit  : "state: phase 1 committed and pushed"
6. push    : ثاني push
```

**التالي:** `prompts/11_PHASE_2_ICON_SYSTEM.md`.

— نهاية Phase 1.
