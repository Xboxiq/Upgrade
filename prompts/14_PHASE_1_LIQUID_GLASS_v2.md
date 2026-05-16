# 🪟 WORKER 14 — Phase 1/6 — Liquid Glass Materials v2 (WWDC 2025)
> **اقرأ أولاً:** `prompts/14_WORKER_ATELIER_LIQUID_GLASS.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Worker 12 / Phase 3 (4-tier glass موجود) + Worker 13 (نظيف مستقر).
> **الفلسفة:** الزجاج الحقيقي يَتَنَفَّس مع الضوء. لا يقطع، لا يطمس — يَنْحَني حول الحافة، يَلْمَع عند العلوي، يَخْفُت عند السفلي.

---

## 🛡️ Preservation Contract (Phase 1)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` `:root` tokens | **MODIFY قيم** الـ 4 glass tiers (`--glass-thin/regular/thick/chrome`) و `--glass-blur`، و **APPEND** tokens جديدة (`--glass-edge-light`, `--glass-specular`, `--glass-grain`, `--paper-tone-1/2/3`) | حذف tokens، إعادة تسمية tokens، تغيير قيم identity tints |
| `style.css` rules | **APPEND** كتلة "Liquid Glass v2" جديدة في النهاية. مسموح **REPLACE-IN-PLACE** لـ 5-7 قواعد محدّدة فقط (المذكورة أدناه) | تعديل أي قاعدة لا تخص الـ glass material أو الـ light theme tonal |
| `index.html` | **AUGMENT** — إضافة `class="material-tier-X"` على ≤30 عنصر محدّد (cards, modals, dropdowns) | حذف عناصر، تغيير IDs |
| `app.js` | **APPEND** IIFE واحد جديد: `Upg.material` (يضبط `data-material-density` على `<body>` ويوفّر `Upg.material.get/set('low'\|'standard'\|'high')`) | تعديل أي IIFE قائم |

**Sacred preserved:**
- 4 glass tier tokens **بأسمائها الحالية**: `--glass-thin`, `--glass-regular`, `--glass-thick`, `--glass-chrome`.
- 15 identity tint values (`--tint-callcenter`, `--tint-fieldsales`, …) — لا تتغيّر HSL.
- `Upg.scroll` (Worker 12 P3) — لا يُلمَس، Phase 4 سيتكامل معه.

---

## 🎯 الهدف

نقل الـ glass materials من معيار **WWDC 2022** (`blur(15px) saturate(180%)`) إلى **WWDC 2025+** (Liquid Glass spec الذي تستعمله Apple في iOS 26 / macOS Tahoe). 5 ترقيات:

1. **Blur ladder أعمق** — `thin: 12px → 16px`, `regular: 18px → 24px`, `thick: 28px → 32px`, `chrome: 15px → 40px`.
2. **Saturate أعلى** — `180% → 200%` على كل الطبقات.
3. **Brightness adjust** — `brightness(1.05)` في dark، `brightness(1.02)` في light للحصول على الـ "iOS pop".
4. **Edge specular highlight** — كل سطح زجاج يحصل على `inset 0 1px 0 rgba(255,255,255,.16)` في dark، `inset 0 1px 0 rgba(255,255,255,.85)` في light. خط أبيض رفيع جداً يحاكي انكسار الضوء على الحافة العلوية.
5. **3-Tier Tonal في Light theme** — الكروت كلها حالياً تستعمل `glass-regular` موحّد. نُقسّم لـ:
   - **paper-tone-1** (`--color-bg`) للخلفية الأم.
   - **paper-tone-2** (`--color-surface-1`) للكروت العادية (cards).
   - **paper-tone-3** (`--color-surface-2` + شدّة inset أعلى) للكروت المرفوعة (raised: stat-tiles, hero, modals).

نضيف أيضاً **Paper Grain v2** — noise SVG inline data-URI خفيف جداً (`opacity: 0.025`) فوق `body::before` ليكسر التجانس البلاستيكي في light theme.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 1 PRE-FLIGHT
├─ Phase: 1/6 — Liquid Glass Materials v2
├─ Estimated lines: ~560
├─ Files to touch:
│   ├─ platform/assets/style.css   (MODIFY 5-7 rules + APPEND ~480 lines)
│   ├─ platform/assets/app.js      (APPEND IIFE Upg.material ~80 lines)
│   └─ platform/index.html         (AUGMENT class on ≤30 cards/modals)
├─ Sacred verify:
│   ├─ grep -c '<section class="page"'  → expect 14
│   ├─ grep -c 'qcalc'                   → expect 391
│   └─ grep -oE 'window\.Upg\.[a-z]+'   → expect 14 modules + new Upg.material
├─ Branch: NEW worker-14-atelier (from latest main)
```

---

## 🧱 خطوات التنفيذ (بالترتيب)

### Step 1 — Tokens v2 (في `:root` الرئيسي)

استبدل **هذي المجموعة فقط** من tokens (ابحث عن السطر الذي يبدأ بـ `--glass-blur:` في `:root` العام، ~السطر 105):

```css
/* ─── ATELIER v16 — Liquid Glass v2 (Worker 14 / Phase 1) ─── */
/* Material tier specs — modeled on UIVisualEffectView (iOS 26+) */
--glass-blur-thin:     16px;
--glass-blur-regular:  24px;
--glass-blur-thick:    32px;
--glass-blur-chrome:   40px;

--glass-saturate:      200%;
--glass-brightness:    1.05;   /* dark mode default */

/* Edge specular highlight — رفيع جداً، يحاكي انكسار الضوء */
--glass-edge-light:    inset 0 1px 0 hsl(0 0% 100% / 0.16);
--glass-edge-dark:     inset 0 -1px 0 hsl(0 0% 0% / 0.18);

/* Specular sheen — gradient overlay 135deg */
--glass-specular:      linear-gradient(135deg,
                          hsl(0 0% 100% / 0.06) 0%,
                          hsl(0 0% 100% / 0) 35%,
                          hsl(0 0% 100% / 0) 100%);

/* Paper grain — noise data-URI خفيف */
--glass-grain-url:     url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.5'/></svg>");
```

ثم في كتلة `:root[data-theme="light"]` (~السطر 56)، أضف overrides:

```css
--glass-brightness:    1.02;
--glass-edge-light:    inset 0 1px 0 hsl(0 0% 100% / 0.85);
--glass-edge-dark:     inset 0 -1px 0 hsl(220 20% 30% / 0.06);
--glass-specular:      linear-gradient(135deg,
                          hsl(0 0% 100% / 0.55) 0%,
                          hsl(0 0% 100% / 0) 40%,
                          hsl(0 0% 100% / 0) 100%);

/* 3-tier tonal — paper hierarchy */
--paper-tone-1:        hsl(38 28% 96.5%);   /* bg — same as --color-bg */
--paper-tone-2:        hsl(38 28% 97.5%);   /* card — same as --color-surface-1 */
--paper-tone-3:        hsl(40 38% 99.2%);   /* raised — same as --color-surface-0 (most paper) */
```

### Step 2 — قواعد الـ 4 tiers (REPLACE-IN-PLACE في كتلة "Materials & Depth — Worker 12 / Phase 3")

ابحث عن `.material-thin`, `.material-regular`, `.material-thick`, `.material-chrome` (موجودين بعد `/* AURORA v15 — Materials */`). استبدل قيم `backdrop-filter` فقط، احتفظ بكل الباقي:

```css
.material-thin {
  -webkit-backdrop-filter: blur(var(--glass-blur-thin)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness));
          backdrop-filter: blur(var(--glass-blur-thin)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness));
  background: var(--color-surface-1);
  box-shadow: var(--glass-edge-light), var(--shadow-c-sm);
}
.material-regular {
  -webkit-backdrop-filter: blur(var(--glass-blur-regular)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness));
          backdrop-filter: blur(var(--glass-blur-regular)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness));
  background: color-mix(in oklch, var(--color-surface-1) 92%, transparent);
  box-shadow: var(--glass-edge-light), var(--shadow-c-md);
  position: relative;
}
.material-regular::before {
  content: ""; position: absolute; inset: 0;
  background: var(--glass-specular);
  border-radius: inherit;
  pointer-events: none;
  z-index: 0;
}
.material-thick {
  -webkit-backdrop-filter: blur(var(--glass-blur-thick)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness));
          backdrop-filter: blur(var(--glass-blur-thick)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness));
  background: color-mix(in oklch, var(--color-surface-2) 88%, transparent);
  box-shadow: var(--glass-edge-light), var(--shadow-c-lg);
}
.material-chrome {
  -webkit-backdrop-filter: blur(var(--glass-blur-chrome)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness));
          backdrop-filter: blur(var(--glass-blur-chrome)) saturate(var(--glass-saturate)) brightness(var(--glass-brightness));
  background: color-mix(in oklch, var(--color-surface-1) 78%, transparent);
  box-shadow: var(--glass-edge-light), var(--shadow-c-xl);
  position: relative;
}
.material-chrome::after {
  /* Edge dark for chrome — يفصل الـ chrome عن الخلفية بخط hairline سفلي */
  content: ""; position: absolute; inset: 0;
  border-radius: inherit;
  box-shadow: var(--glass-edge-dark);
  pointer-events: none;
}
```

### Step 3 — 3-Tier Tonal في Light theme

في كتلة `body[data-theme="light"]` (~السطر 3787)، **APPEND** هذي القواعد (لا تستبدل الموجود):

```css
/* ─── ATELIER v16 — 3-Tier Paper Tonal (light theme only) ─── */
body[data-theme="light"] .stat-card,
body[data-theme="light"] .module-card,
body[data-theme="light"] .ql-glass:not(.material-thick):not(.material-chrome),
body[data-theme="light"] .skill-card {
  background: var(--paper-tone-2);
  box-shadow: var(--glass-edge-light), var(--shadow-c-sm);
}

body[data-theme="light"] .stat-tile,
body[data-theme="light"] .bento-greet,
body[data-theme="light"] .cath-stat,
body[data-theme="light"] .cath-dash-card,
body[data-theme="light"] .qcalc,
body[data-theme="light"] dialog,
body[data-theme="light"] [role="dialog"],
body[data-theme="light"] .cmdk-modal {
  background: var(--paper-tone-3);
  box-shadow: var(--glass-edge-light), var(--shadow-c-md);
}

/* Sticky chrome surfaces في light — أكثر شفافية */
body[data-theme="light"] #topbar,
body[data-theme="light"] #sidebar {
  background: color-mix(in oklch, var(--paper-tone-3) 75%, transparent);
}
```

### Step 4 — Paper Grain v2 (light theme فقط)

**APPEND** بعد قواعد الـ tonal:

```css
body[data-theme="light"]::after {
  content: "";
  position: fixed; inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image: var(--glass-grain-url);
  background-size: 160px 160px;
  opacity: 0.025;
  mix-blend-mode: multiply;
}

@media (prefers-reduced-motion: reduce) {
  body[data-theme="light"]::after { opacity: 0.015; }
}
```

### Step 5 — Density Tiers + `Upg.material` API

**APPEND** هذي القواعد:

```css
/* ─── ATELIER v16 — Material density (Worker 14 / Phase 1) ─── */
body[data-material-density="low"] {
  --glass-blur-thin: 8px; --glass-blur-regular: 14px;
  --glass-blur-thick: 20px; --glass-blur-chrome: 26px;
  --glass-saturate: 160%;
}
body[data-material-density="high"] {
  --glass-blur-thin: 22px; --glass-blur-regular: 32px;
  --glass-blur-thick: 44px; --glass-blur-chrome: 56px;
  --glass-saturate: 220%;
}
@media (prefers-reduced-transparency: reduce) {
  :root {
    --glass-blur-thin: 0px; --glass-blur-regular: 0px;
    --glass-blur-thick: 0px; --glass-blur-chrome: 0px;
  }
  .material-regular::before, body[data-theme="light"]::after { display: none; }
}
```

ثم في `app.js`، **APPEND** في النهاية (بعد آخر IIFE موجود):

```javascript
/* ============================================================
   ATELIER v16 — Material Density API (Worker 14 / Phase 1)
   Public API: window.Upg.material.{ get, set, cycle }
   States: 'low' | 'standard' | 'high'
   Persists to localStorage('upg_material_density').
   ============================================================ */
(() => {
  'use strict';
  const KEY = 'upg_material_density';
  const ORDER = ['low', 'standard', 'high'];
  const get = () => localStorage.getItem(KEY) || 'standard';
  const apply = (v) => {
    if (v === 'standard') document.body.removeAttribute('data-material-density');
    else document.body.setAttribute('data-material-density', v);
  };
  const set = (v) => {
    if (!ORDER.includes(v)) return;
    localStorage.setItem(KEY, v);
    apply(v);
    document.dispatchEvent(new CustomEvent('upg:material:change', { detail: { density: v } }));
  };
  const cycle = () => {
    const cur = get();
    const next = ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length];
    set(next);
    return next;
  };
  apply(get());
  window.Upg = window.Upg || {};
  window.Upg.material = { get, set, cycle };
})();
```

### Step 6 — AUGMENT card classes

في `index.html`، أضف class `material-regular` على هذي العناصر (لو ما عندها مادة بعد):
- `.cath-dash-card` (إذا غير موجودة كـ utility)
- `.qcalc`
- `dialog` و `[role="dialog"]`
- `.cmdk-modal`

ابحث عنهم بـ grep. أضف class بـ AUGMENT (لا تكسر classes موجودة).

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred IDs preserved
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → ≥15

# Tokens added
grep -c '\-\-glass-edge-light' platform/assets/style.css  # → ≥3
grep -c '\-\-glass-blur-chrome' platform/assets/style.css # → ≥2
grep -c 'paper-tone-3' platform/assets/style.css           # → ≥3

# Console: zero errors after page load
```

---

## ✅ معايير القبول (Phase 1)

- [ ] 4 glass tiers مُعاد ضبطها (blur 16/24/32/40, saturate 200%, brightness 1.05/1.02).
- [ ] Edge specular highlight مرئي بصرياً على cards في كلا الثيمين.
- [ ] Light theme فيه 3-tier tonal (paper-tone-1/2/3 يظهر فرق منهم).
- [ ] Paper grain خفيف ظاهر في light فقط (opacity 0.025).
- [ ] `Upg.material.cycle()` يبدّل density بين 3 حالات.
- [ ] `prefers-reduced-transparency: reduce` يُلغي blur كلياً (a11y).
- [ ] 14 page sections + 391 qcalc + 14 Upg.* APIs preserved.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css platform/assets/app.js platform/index.html
git commit -m "phase 1 (atelier): liquid glass v2 — wwdc25 blur ladder + edge specular + 3-tier paper tonal + Upg.material"
# push immediately
```

ثم state commit:

```bash
# update state/PROGRESS.json: current.worker="14", phase=1, status="in-progress"
# add snapshot state/snapshots/worker-14-phase-1.json
git add state/PROGRESS.json state/snapshots/worker-14-phase-1.json
git commit -m "state: atelier phase 1 committed and pushed"
# push immediately
```

— نهاية Phase 1.
