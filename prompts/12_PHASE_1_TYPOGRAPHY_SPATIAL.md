# ✍️ WORKER 12 — Phase 1/7 — Typography & Spatial System
> **اقرأ أولاً:** `prompts/12_WORKER_AURORA_APPLE_GRADE.md` (الفهرس).
> **متطلب:** MASTER PROMPT محمّل + Worker 11 منتهٍ + `state/PROGRESS.json` يشير لبداية Worker 12.
> **الفلسفة:** الخط والمسافة قبل اللون. لو الإيقاع البصري سليم، النصف الباقي يلحق طبيعياً.

---

## 🎯 الهدف

نُؤسّس **نظامين** يعتمد عليهما كل ما بعدهما:

1. **Type Scale سيمانتي** عبر `clamp()` — 7 مستويات (display / h1 / h2 / h3 / body / small / caption) يتكيّفون مع الشاشة.
2. **Spacing Grid 4pt** — 12 token مسافة (`--space-1` = 4px → `--space-12` = 96px) + 4 tokens density (compact/cozy/comfortable/spacious).

نُلحق:
- **Font stack محسّن** يضع Cairo أولاً ثم بدائل Apple/IBM (`-apple-system, "SF Pro Arabic", "IBM Plex Sans Arabic"`) لتجربة أصلية حسب الجهاز.
- **Reading rhythm** — `line-height` و `letter-spacing` و `word-spacing` و `font-feature-settings` لـ ligatures عربية صحيحة.
- **Numerals tabular** للأرقام في الإحصائيات والحاسبات حتى لا "ترقص" أرقام الـ count-up.
- **Heading utilities** سيمانتية تُستخدم في Phases التالية (`.h-display`, `.h-title`, `.h-section`, `.h-eyebrow`).

---

## 📋 PRE-FLIGHT لهذا الـ Phase

```
📋 PHASE 1 PRE-FLIGHT
├─ Phase: 1/7 — Typography & Spatial System
├─ Estimated lines: ~520 (CSS ~440 + HTML head ~30 + JS ~50)
├─ Files to touch:
│   ├─ platform/assets/style.css      (إدراج tokens + utilities + typographic reset)
│   ├─ platform/index.html            (تحديث font preconnect + html lang attrs)
│   └─ platform/assets/app.js         (Upg.type module — إعدادات قراءة فقط)
├─ Sections preserved: ALL existing rules (additive — لا يُلمس أي selector قديم).
├─ Tokens prefix: --space-*, --text-*, --leading-*, --tracking-*, --weight-*
└─ Branch: worker-12-aurora (ينشأ من main).
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Font Stack محسّن (HTML head)

في `platform/index.html`، استبدل سطر تحميل Google Fonts الحالي بـ:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

> **لماذا IBM Plex Sans Arabic؟** ثاني خيار بعد Cairo، يعطي Apple-feel أوضح في الأحجام الكبيرة + tabular numerals متفوقة. يُحمّل لكنه fallback فقط.

### Step 2 — Type Tokens (إدراج في `style.css` بعد الـ Sovereign Tokens — ~السطر 95)

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Typographic Tokens (Worker 12 / Phase 1)
   Scale: Major Third (1.25) + clamp() للتكيّف.
   Stack: Cairo → IBM Plex Sans Arabic → SF Arabic → system fallback.
   ═══════════════════════════════════════════════════════════════ */
:root {
  /* Font families */
  --font-display: "Cairo", "IBM Plex Sans Arabic", "SF Arabic",
                  -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Roboto, Helvetica, Arial, sans-serif;
  --font-text:    var(--font-display);
  --font-mono:    "SF Mono", ui-monospace, "Cascadia Mono",
                  "JetBrains Mono", "Fira Code", Menlo, Consolas, monospace;
  --font-numeric: var(--font-display);

  /* Type scale — clamp(min, fluid, max) */
  --text-2xs:  clamp(0.6875rem, 0.66rem + 0.15vw, 0.75rem);   /* 11..12 */
  --text-xs:   clamp(0.75rem, 0.72rem + 0.18vw, 0.8125rem);   /* 12..13 */
  --text-sm:   clamp(0.875rem, 0.84rem + 0.2vw, 0.9375rem);   /* 14..15 */
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.0625rem);      /* 16..17 */
  --text-lg:   clamp(1.125rem, 1.06rem + 0.3vw, 1.1875rem);   /* 18..19 */
  --text-xl:   clamp(1.25rem, 1.16rem + 0.45vw, 1.375rem);    /* 20..22 */
  --text-2xl:  clamp(1.5rem, 1.36rem + 0.7vw, 1.75rem);       /* 24..28 */
  --text-3xl:  clamp(1.875rem, 1.66rem + 1.05vw, 2.25rem);    /* 30..36 */
  --text-4xl:  clamp(2.25rem, 1.96rem + 1.5vw, 3rem);         /* 36..48 */
  --text-display: clamp(2.75rem, 2.2rem + 2.8vw, 4.5rem);     /* 44..72 */

  /* Line-height ladder */
  --leading-tight:   1.18;
  --leading-snug:    1.32;
  --leading-normal:  1.55;
  --leading-relaxed: 1.7;
  --leading-loose:   1.85;

  /* Tracking (letter-spacing) — العربي يحب tracking أقل */
  --tracking-tighter: -0.025em;
  --tracking-tight:   -0.012em;
  --tracking-normal:  0;
  --tracking-wide:    0.012em;
  --tracking-wider:   0.05em;     /* للـ eyebrows / labels */

  /* Font weights — Cairo full ladder */
  --weight-light:     300;
  --weight-regular:   400;
  --weight-medium:    500;
  --weight-semibold:  600;
  --weight-bold:      700;
  --weight-heavy:     800;
  --weight-black:     900;
}
```

### Step 3 — Spacing & Density Tokens (مباشرة بعد الـ type tokens)

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Spatial Grid (Worker 12 / Phase 1)
   Base unit: 4px. كل مسافة في المنصة لازم تنحدر من هذي.
   ═══════════════════════════════════════════════════════════════ */
:root {
  --space-0:  0;
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-7:  32px;
  --space-8:  40px;
  --space-9:  48px;
  --space-10: 64px;
  --space-11: 80px;
  --space-12: 96px;

  /* Density presets — تُستعمل في Phases التالية */
  --density-compact:     var(--space-2);
  --density-cozy:        var(--space-3);
  --density-comfortable: var(--space-4);
  --density-spacious:    var(--space-6);

  /* Container widths */
  --container-narrow: 720px;
  --container-text:   880px;
  --container-base:   1180px;
  --container-wide:   1360px;
  --container-fluid:  100%;

  /* Z-index ladder — موحّد لكل overlays */
  --z-base:     0;
  --z-raised:   10;
  --z-sticky:   30;
  --z-dropdown: 200;
  --z-sidebar:  500;
  --z-topbar:   600;
  --z-overlay:  900;
  --z-modal:    1000;
  --z-toast:    1100;
  --z-cmdk:     1200;
}
```

### Step 4 — Reading Reset & Heading Utilities

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Typographic Reset & Utilities
   Additive: لا يُلمس أي selector قديم — كله utilities جديدة.
   ═══════════════════════════════════════════════════════════════ */
html {
  font-family: var(--font-text);
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "ss01" 1;
  /* علامات الترقيم العربية */
  font-variant-ligatures: common-ligatures contextual;
}

body {
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-normal);
}

/* Tabular numerals — تُستعمل في الإحصائيات والحاسبات */
.u-num,
.cath-stat-value,
.qcalc-value,
[data-cath-stat],
[data-tabular] {
  font-family: var(--font-numeric);
  font-variant-numeric: tabular-nums lining-nums;
  font-feature-settings: "tnum" 1, "lnum" 1;
}

/* Heading utility classes — تُستعمل في Phases التالية */
.h-display {
  font-size: var(--text-display);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tighter);
  font-weight: var(--weight-heavy);
}
.h-title {
  font-size: var(--text-4xl);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  font-weight: var(--weight-bold);
}
.h-section {
  font-size: var(--text-2xl);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  font-weight: var(--weight-semibold);
}
.h-card {
  font-size: var(--text-lg);
  line-height: var(--leading-snug);
  font-weight: var(--weight-semibold);
}
.h-eyebrow {
  font-size: var(--text-2xs);
  line-height: 1;
  letter-spacing: var(--tracking-wider);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.h-label {
  font-size: var(--text-xs);
  line-height: var(--leading-snug);
  font-weight: var(--weight-medium);
  color: var(--color-text-muted);
}
.h-mono {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-feature-settings: "tnum" 1;
}

/* Reading rhythm utilities */
.u-prose {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  max-width: var(--container-text);
}
.u-prose > * + * { margin-top: var(--space-4); }
.u-prose h2     { margin-top: var(--space-7); margin-bottom: var(--space-3); }
.u-prose h3     { margin-top: var(--space-6); margin-bottom: var(--space-2); }
.u-prose p      { line-height: var(--leading-relaxed); }
.u-prose strong { font-weight: var(--weight-semibold); color: var(--color-text); }
.u-prose code   { font-family: var(--font-mono); font-size: 0.92em; padding: 1px 6px; border-radius: 4px; background: var(--color-surface-2); }

/* Spacing utilities — minimum needed for Phase 1; Phase 7 يكمل الباقي */
.u-stack    > * + * { margin-top: var(--space-4); }
.u-stack-sm > * + * { margin-top: var(--space-2); }
.u-stack-lg > * + * { margin-top: var(--space-6); }
.u-cluster {
  display: flex; flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
}
.u-pad-sm  { padding: var(--space-3); }
.u-pad     { padding: var(--space-4); }
.u-pad-lg  { padding: var(--space-6); }
.u-pad-xl  { padding: var(--space-7); }
```

### Step 5 — `Upg.type` Module (Public API لإعدادات القراءة المستقبلية)

في `app.js`، أضف IIFE جديد بعد آخر IIFE موجود:

```js
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Type Engine (Worker 12 / Phase 1)
   Public API: window.Upg.type
   - get/set("density", 0..3)        // 0=compact .. 3=spacious
   - get/set("textZoom", 0.875..1.25) // user-controlled multiplier
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const KEY_DENSITY = 'upg_density';
  const KEY_ZOOM    = 'upg_text_zoom';
  const DENSITY = ['compact','cozy','comfortable','spacious'];

  const apply = () => {
    const d = +(localStorage.getItem(KEY_DENSITY) ?? 2); // default cozy/comfortable
    const z = parseFloat(localStorage.getItem(KEY_ZOOM) ?? '1');
    document.documentElement.dataset.density = DENSITY[Math.max(0, Math.min(3, d))];
    document.documentElement.style.setProperty('--type-zoom', String(Math.max(0.875, Math.min(1.25, z))));
  };

  const set = (k, v) => {
    if (k === 'density')  localStorage.setItem(KEY_DENSITY, String(Math.max(0, Math.min(3, +v))));
    if (k === 'textZoom') localStorage.setItem(KEY_ZOOM, String(v));
    apply();
    window.dispatchEvent(new CustomEvent('upg:type-change'));
  };
  const get = (k) => k === 'density'
    ? DENSITY[+(localStorage.getItem(KEY_DENSITY) ?? 2)]
    : parseFloat(localStorage.getItem(KEY_ZOOM) ?? '1');

  apply();
  window.Upg = window.Upg || {};
  window.Upg.type = { get, set, DENSITY };
})();
```

### Step 6 — استعمال `--type-zoom` (إضافة بسيطة لتفعيل المُضاعِف)

ألحق هذي القاعدة في أسفل قسم Reset:

```css
:root { --type-zoom: 1; }
body  { font-size: calc(var(--text-base) * var(--type-zoom)); }
```

> هذا يسمح لاحقاً (Phase 5 / Settings) بإضافة slider "حجم النص" بدون لمس أي شيء.

---

## ✅ Acceptance Criteria للـ Phase 1

- [ ] `--text-2xs..--text-display` معرّفة في `:root` (10 أحجام).
- [ ] `--space-0..--space-12` معرّفة (13 token).
- [ ] `--leading-*`, `--tracking-*`, `--weight-*` كلها موجودة.
- [ ] الخط الجديد محمّل (Cairo + IBM Plex Sans Arabic — تحقق من Network tab).
- [ ] الأرقام في `.cath-stat-value` و `.qcalc-value` تستعمل `tabular-nums` (تحقق بصرياً: 1 و 0 لهما نفس العرض).
- [ ] `.h-display`, `.h-title`, `.h-section`, `.h-eyebrow`, `.h-label` تعرض بأحجام صحيحة في 1280px و 375px.
- [ ] `Upg.type.set('density', 0)` يضع `data-density="compact"` على `<html>`، و `Upg.type.set('textZoom', 1.125)` يكبّر النص.
- [ ] لا تكسير لأي صفحة — كل القواعد القديمة تعمل.
- [ ] لا errors في console.

---

## 🛡️ في نهاية الـ Phase

اطبع `CHECKPOINT` + `STATE_SNAPSHOT` (نفس صيغة MASTER)، ثم نفّذ بالترتيب الصارم:

```
1. git checkout -b worker-12-aurora       (لو ما موجود)
2. commit  : "phase 1 (aurora): typography & spatial system"
3. push    : worker-12-aurora → origin
4. update  : state/PROGRESS.json (current.worker="12", phase=1, status="in-progress")
5. snapshot: state/snapshots/worker-12-phase-1.json
6. commit  : "state: aurora phase 1 committed and pushed"
7. push    : ثاني push
```

**التالي:** `prompts/12_PHASE_1B_TYPEFACE_SOUL.md` — استبدال Cairo الواحد بنظام 4 خطوط عربية فاخرة (Reem Kufi + Readex Pro + IBM Plex Arabic + Aref Ruqaa + Thmanyah optional).

— نهاية Phase 1.
