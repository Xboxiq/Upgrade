# 🪟 WORKER 12 — Phase 3/7 — Materials & Depth (Glass Hierarchy)
> **يبني فوق:** Phase 1+2.
> **الفلسفة:** Glass واحد ≠ glass مناسب لكل مكان. كما `UIVisualEffectView` في iOS يقدّم **Thin / Regular / Thick / Chrome / Prominent**، نقدم 4 طبقات mع stack مناسب للحدود والظلال والنويز.

---

## 🎯 الهدف

1. **4 طبقات Glass سيمانتية** — `--glass-thin`, `--glass-regular`, `--glass-thick`, `--glass-chrome` كل واحدة مع `backdrop-filter` مناسب.
2. **Edge-light hairline** — الحدود الفاتحة العلوية (specular highlight) كما في iOS notification.
3. **Scroll-aware elevation** — عند التمرير، الـ topbar / sidebar يكسبون elevation ديناميكي.
4. **Grain refresh** — تحسين الـ grain الموجود (`#grainFilter`) ليكون أنعم وأكثر شبهاً بـ paper-grain Apple Pro.
5. **`.surface-card` و `.surface-popover` و `.surface-modal`** — utilities موحدة، يستعملها Phase 4 و 5.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 3 PRE-FLIGHT
├─ Phase: 3/7 — Materials & Depth
├─ Estimated lines: ~560
├─ Files to touch:
│   ├─ platform/assets/style.css  (إضافة glass tiers + scroll elevation rules)
│   └─ platform/assets/app.js     (Upg.scroll module — observer للـ topbar/sidebar)
├─ Sections preserved: ALL.
├─ Tokens added: --glass-thin/regular/thick/chrome, --halo-*, --hairline-*
└─ Branch: continue worker-12-aurora.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Material Tokens (مباشرة بعد Sovereign tokens)

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Materials (Worker 12 / Phase 3)
   4 tiers + edge-light + halo. كل tier له surface + border + shadow + blur.
   ═══════════════════════════════════════════════════════════════ */
:root {
  /* Backdrop blur radii */
  --blur-thin:    8px;
  --blur-regular: 16px;
  --blur-thick:   28px;
  --blur-chrome:  42px;

  /* Saturation lift — يحاكي iOS vibrancy */
  --vibrancy:     180%;

  /* Hairline — حد علوي رفيع كأنه ضوء ساقط */
  --hairline-light:  inset 0 1px 0 hsl(220 100% 99% / 0.6);
  --hairline-strong: inset 0 1px 0 hsl(220 100% 99% / 0.85);
  --hairline-dark:   inset 0 1px 0 hsl(220 30% 100% / 0.06);

  /* Halo — ضوء خلفي خفيف عند العناصر المهمة */
  --halo-brand:    0 0 0 1px var(--color-brand-soft),
                   0 12px 40px color-mix(in oklch, var(--color-brand) 22%, transparent);
  --halo-warm:     0 0 0 1px hsl(36 80% 85% / 0.4),
                   0 12px 40px hsl(36 80% 60% / 0.18);

  /* Material — Glass thin (chips, tooltips) */
  --glass-thin-bg:     color-mix(in oklch, var(--color-surface-1) 65%, transparent);
  --glass-thin-border: color-mix(in oklch, var(--color-border) 60%, transparent);
  --glass-thin-blur:   var(--blur-thin);

  /* Material — Glass regular (cards) */
  --glass-regular-bg:     color-mix(in oklch, var(--color-surface-1) 78%, transparent);
  --glass-regular-border: color-mix(in oklch, var(--color-border) 80%, transparent);
  --glass-regular-blur:   var(--blur-regular);

  /* Material — Glass thick (modals, gateway) */
  --glass-thick-bg:     color-mix(in oklch, var(--color-surface-2) 85%, transparent);
  --glass-thick-border: color-mix(in oklch, var(--color-border-strong) 80%, transparent);
  --glass-thick-blur:   var(--blur-thick);

  /* Material — Chrome (topbar, sidebar — أعلى blur) */
  --glass-chrome-bg:     color-mix(in oklch, var(--color-bg) 78%, transparent);
  --glass-chrome-border: color-mix(in oklch, var(--color-border) 70%, transparent);
  --glass-chrome-blur:   var(--blur-chrome);
}

/* Light theme — adjust opacity (الضوء يحب transparency أعلى قليلاً) */
:root[data-theme="light"] {
  --hairline-light:  inset 0 1px 0 hsl(40 60% 100% / 0.95);
  --hairline-strong: inset 0 1px 0 hsl(40 60% 100% / 1);
  --halo-brand:      0 0 0 1px var(--color-brand-soft),
                     0 12px 32px color-mix(in oklch, var(--color-brand) 14%, transparent);

  --glass-thin-bg:     color-mix(in oklch, var(--color-surface-1) 70%, white 30%);
  --glass-regular-bg:  color-mix(in oklch, var(--color-surface-1) 84%, white 16%);
  --glass-thick-bg:    color-mix(in oklch, var(--color-surface-2) 90%, white 10%);
  --glass-chrome-bg:   color-mix(in oklch, var(--color-bg) 85%, white 15%);
}
```

### Step 2 — Material Utilities (classes)

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Material Surfaces (utilities)
   ═══════════════════════════════════════════════════════════════ */
.material-thin,
.material-regular,
.material-thick,
.material-chrome {
  isolation: isolate;
  position: relative;
}

.material-thin {
  background: var(--glass-thin-bg);
  border: 1px solid var(--glass-thin-border);
  backdrop-filter: blur(var(--glass-thin-blur)) saturate(var(--vibrancy));
  -webkit-backdrop-filter: blur(var(--glass-thin-blur)) saturate(var(--vibrancy));
  box-shadow: var(--shadow-c-sm), var(--hairline-light);
}
.material-regular {
  background: var(--glass-regular-bg);
  border: 1px solid var(--glass-regular-border);
  backdrop-filter: blur(var(--glass-regular-blur)) saturate(var(--vibrancy));
  -webkit-backdrop-filter: blur(var(--glass-regular-blur)) saturate(var(--vibrancy));
  box-shadow: var(--shadow-c-md), var(--hairline-light);
}
.material-thick {
  background: var(--glass-thick-bg);
  border: 1px solid var(--glass-thick-border);
  backdrop-filter: blur(var(--glass-thick-blur)) saturate(var(--vibrancy));
  -webkit-backdrop-filter: blur(var(--glass-thick-blur)) saturate(var(--vibrancy));
  box-shadow: var(--shadow-c-lg), var(--hairline-strong);
}
.material-chrome {
  background: var(--glass-chrome-bg);
  border: 1px solid var(--glass-chrome-border);
  backdrop-filter: blur(var(--glass-chrome-blur)) saturate(var(--vibrancy));
  -webkit-backdrop-filter: blur(var(--glass-chrome-blur)) saturate(var(--vibrancy));
  box-shadow: var(--shadow-c-md), var(--hairline-light);
}

/* Surface utilities — مكوّنات شائعة */
.surface-card {
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-c-md);
}
.surface-card.is-elevated {
  background: color-mix(in oklch, var(--color-surface-1) 92%, var(--tonal-tint) 8%);
  box-shadow: var(--shadow-c-lg), var(--hairline-light);
}
.surface-popover {
  border-radius: var(--radius-md);
  padding: var(--space-3);
  background: var(--glass-regular-bg);
  border: 1px solid var(--glass-regular-border);
  backdrop-filter: blur(var(--glass-regular-blur)) saturate(var(--vibrancy));
  -webkit-backdrop-filter: blur(var(--glass-regular-blur)) saturate(var(--vibrancy));
  box-shadow: var(--shadow-c-lg), var(--hairline-light);
}
.surface-modal {
  border-radius: var(--radius-xl);
  padding: var(--space-7);
  background: var(--glass-thick-bg);
  border: 1px solid var(--glass-thick-border);
  backdrop-filter: blur(var(--glass-thick-blur)) saturate(var(--vibrancy));
  -webkit-backdrop-filter: blur(var(--glass-thick-blur)) saturate(var(--vibrancy));
  box-shadow: var(--shadow-c-xl), var(--hairline-strong);
}

/* Reduced transparency — احترام إعدادات النظام */
@media (prefers-reduced-transparency: reduce) {
  .material-thin,
  .material-regular,
  .material-thick,
  .material-chrome,
  .surface-popover,
  .surface-modal {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: var(--color-surface-2);
  }
}
```

### Step 3 — Scroll-aware Elevation (Topbar + Sidebar)

CSS:
```css
/* Topbar / Sidebar elevate when scrolled — JS toggles data-scrolled */
#topbar,
#sidebar { transition: box-shadow 240ms var(--ease-decelerate, ease-out),
                       backdrop-filter 240ms var(--ease-decelerate, ease-out),
                       background 240ms var(--ease-decelerate, ease-out); }
#topbar[data-scrolled="true"]   {
  background: var(--glass-chrome-bg);
  backdrop-filter: blur(var(--blur-chrome)) saturate(var(--vibrancy));
  -webkit-backdrop-filter: blur(var(--blur-chrome)) saturate(var(--vibrancy));
  box-shadow: var(--shadow-c-md), var(--hairline-light);
}
#main[data-scrolled="true"] ~ #sidebar,
#sidebar[data-scrolled="true"] {
  box-shadow: 1px 0 0 var(--color-border), var(--shadow-c-sm);
}
```

JS — أضف IIFE جديد في `app.js`:
```js
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Scroll Observer (Worker 12 / Phase 3)
   Toggles data-scrolled on #topbar when #main scrolls past 4px.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const main = document.getElementById('main');
  const top  = document.getElementById('topbar');
  const side = document.getElementById('sidebar');
  if (!main || !top) return;

  let raf = 0;
  const update = () => {
    raf = 0;
    const scrolled = main.scrollTop > 4;
    top.dataset.scrolled = String(scrolled);
    if (side) side.dataset.scrolled = String(scrolled);
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

  main.addEventListener('scroll', onScroll, { passive: true });
  // Window scroll fallback for layouts where main doesn't scroll itself
  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  window.Upg = window.Upg || {};
  window.Upg.scroll = { update };
})();
```

### Step 4 — Grain Refresh

ابحث عن `#grainFilter` في `index.html`. لو الـ feTurbulence مقطوع (نلاحظ `<feTurbule` مقطوع في الملف)، أعد كتابته كاملاً:

```html
<svg id="ql-svg-defs" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;">
  <defs>
    <filter id="grainFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" stitchTiles="stitch"/>
      <feColorMatrix type="matrix"
        values="0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0.06 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>
</svg>
```

CSS update:
```css
.ql-grain {
  position: fixed; inset: 0; pointer-events: none;
  z-index: var(--z-base); opacity: 0.5;
  filter: url(#grainFilter);
  mix-blend-mode: overlay;
}
[data-theme="light"] .ql-grain { mix-blend-mode: multiply; opacity: 0.35; }
```

### Step 5 — تطبيق Materials على المكونات الموجودة (إضافة class بدون تعديل selector)

في `index.html`:
- `<header id="topbar">` → أضف `class="material-chrome"` (جنب ما موجود).
- `<aside id="sidebar">` → أضف `class="material-chrome"`.
- `.cmdk-modal` (في palette) → أضف `class="surface-modal"`.
- `.gateway-card` → أضف `class="surface-modal"`.
- `.cath-stat` (stat cards) → أضف `class="surface-card"`.

> **القاعدة:** أضف الـ class، لا تحذف القديم. الـ specificity ستجعل القاعدة الجديدة تطغى عند الحاجة.

---

## ✅ Acceptance Criteria

- [ ] 4 tiers `material-*` معرّفة وتعمل (تحقّق: backdrop-filter يظهر في DevTools).
- [ ] Topbar يكسب elevation عند scroll > 4px (تحقّق: data-scrolled="true").
- [ ] Hairline-light مرئي على الكروت (specular highlight أعلاها).
- [ ] Grain filter يعمل في الثيمين بدون decay.
- [ ] `prefers-reduced-transparency` يلغي backdrop-filter ويستعمل solid surface.
- [ ] لا layout shift عند scroll (الإضافة box-shadow + bg only، لا height).
- [ ] الزر `lock-platform` لو فُتح في وسط الشاشة، خلفيته تستعمل `.surface-modal`.
- [ ] لا errors في console.

---

## 🛡️ في نهاية الـ Phase

```
1. commit  : "phase 3 (aurora): materials & depth — 4-tier glass + scroll elevation"
2. push    : worker-12-aurora → origin
3. update  : state/PROGRESS.json (phase=3)
4. snapshot: state/snapshots/worker-12-phase-3.json
5. commit  : "state: aurora phase 3 committed and pushed"
6. push
```

**التالي:** `prompts/12_PHASE_4_NAVIGATION_CHROME.md`.

— نهاية Phase 3.
