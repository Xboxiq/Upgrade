# α2 — Token Architecture
> **Pillar α (FOUNDATION) / Stage 2 of 3**
> الهدف: تشطير tokens الحالية إلى 5 ملفات تحت `tokens/` + بنية `worlds/` فارغة جاهزة لـ γ.
> **مهم:** هذه stage لا تُغيّر الألوان البصرية — تُعيد الهيكلة فقط. الألوان الجديدة تأتي في γ2-γ9.

---

## السياق

`tokens.css` الحالي يخلط: ألوان + safe-area + font-faces + chrome heights + print tokens. ÊLAN يفصل المسؤوليات و **يَعلَن مكان العوالم القادمة**.

---

## المُخرَجات

### ملفات تُنشأ في `platform/assets/css/tokens/`:
1. `tokens/_color.css` — base color slots (سيُملأ من العوالم في γ)
2. `tokens/_space.css` — spacing scale + safe-area + chrome heights
3. `tokens/_type.css` — font-size scale + 18 voice token slots (سيُملأ في β2)
4. `tokens/_motion.css` — easing tokens + duration tokens
5. `tokens/_breakpoint.css` — container query thresholds

### ملفات تُنشأ في `platform/assets/css/worlds/` (placeholders فارغة):
- `worlds/_hibr.css`
- `worlds/_naar.css`
- `worlds/_nada.css`
- `worlds/_hadeed.css`
- `worlds/_dhahab.css`
- `worlds/_tayyar.css`
- `worlds/_warsha.css`
- `worlds/_saloon.css`

كل ملف placeholder يحتوي header comment فقط (≤ 10 أسطر) — يُملأ في γ2-γ9.

### ملفات تُعدَّل:
- `tokens.css` → يصبح مجرد imports (≤ 18 سطر)

### ملفات لا تُعدَّل بعد:
- `style.css` — themes الحالية تبقى (يتم استبدالها في γ)

---

## التنفيذ

### ١. `tokens/_color.css` (≈ 50 سطر) — slots محايدة فقط

```css
/* ÊLAN v4 — α2 — Color Slots (neutral defaults; worlds override) */

:root {
  /* ─── Anchor ladder (placeholder — overridden by [data-world]) ─── */
  --anchor-bg:  hsl(220 10% 96%);
  --anchor-1:   hsl(220 8% 92%);
  --anchor-2:   hsl(220 8% 88%);
  --anchor-3:   hsl(220 10% 82%);

  /* ─── Ink ladder ─── */
  --ink:        hsl(220 30% 12%);
  --ink-muted:  hsl(220 14% 38%);
  --ink-faint:  hsl(220 10% 55%);

  /* ─── Lines ─── */
  --line:        hsl(220 8% 84%);
  --line-strong: hsl(220 12% 70%);

  /* ─── Three-color discipline ─── */
  --ember:      hsl(28 80% 52%);
  --focus:      hsl(252 65% 50%);
  --accent:     var(--ember);  /* alias for legacy */

  /* ─── Semantic state (cross-world consistent) ─── */
  --state-success: hsl(152 56% 38%);
  --state-warning: hsl(34 92% 50%);
  --state-danger:  hsl(0 70% 52%);
  --state-info:    hsl(210 78% 48%);

  /* ─── Tinted shadows ─── */
  --shadow-sm: 0 1px 2px hsl(220 30% 12% / 0.06);
  --shadow-md: 0 4px 12px hsl(220 30% 12% / 0.09);
  --shadow-lg: 0 14px 32px hsl(220 30% 12% / 0.11);
  --shadow-xl: 0 28px 60px hsl(220 30% 12% / 0.14);

  --ring: 0 0 0 3px color-mix(in oklch, var(--focus) 28%, transparent);

  /* ─── Backward-compat aliases (preserved) ─── */
  --color-bg:           var(--anchor-bg);
  --color-surface-0:    var(--anchor-bg);
  --color-surface-1:    var(--anchor-1);
  --color-surface-2:    var(--anchor-2);
  --color-surface-3:    var(--anchor-3);
  --color-text:         var(--ink);
  --color-text-muted:   var(--ink-muted);
  --color-text-faint:   var(--ink-faint);
  --color-border:       var(--line);
  --color-border-strong:var(--line-strong);
  --color-brand:        var(--ember);
  --color-success:      var(--state-success);
  --color-warning:      var(--state-warning);
  --color-danger:       var(--state-danger);
  --color-info:         var(--state-info);
  --shadow-c-sm: var(--shadow-sm);
  --shadow-c-md: var(--shadow-md);
  --shadow-c-lg: var(--shadow-lg);
  --shadow-c-xl: var(--shadow-xl);
}
```

### ٢. `tokens/_space.css` (≈ 50 سطر)

```css
/* ÊLAN v4 — α2 — Space Tokens */

:root {
  --s-1:  0.25rem;
  --s-2:  0.5rem;
  --s-3:  0.75rem;
  --s-4:  1rem;
  --s-5:  1.25rem;
  --s-6:  1.5rem;
  --s-8:  2rem;
  --s-10: 2.5rem;
  --s-12: 3rem;
  --s-16: 4rem;
  --s-24: 6rem;

  --safe-top:    env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-left:   env(safe-area-inset-left, 0px);
  --safe-right:  env(safe-area-inset-right, 0px);

  --container-px-mobile:  var(--s-4);
  --container-px-tablet:  var(--s-6);
  --container-px-desktop: var(--s-8);

  --chrome-topbar-mobile:  56px;
  --chrome-topbar-desktop: 64px;
  --chrome-bottom-nav:     64px;
  --chrome-sidebar:        264px;

  --r-1: 4px;
  --r-2: 8px;
  --r-3: 12px;
  --r-4: 16px;
  --r-5: 20px;
  --r-pill: 999px;
}
```

### ٣. `tokens/_type.css` (≈ 70 سطر) — 18 voice slots فارغة

```css
/* ÊLAN v4 — α2 — Type Tokens
   18 voice slots declared with neutral fallbacks.
   β2 will fill stacks. γ2-γ9 will override per world. */

:root {
  /* ─── Fluid scale ─── */
  --fs-xs:   clamp(0.75rem,  0.7rem  + 0.15vw, 0.8125rem);
  --fs-sm:   clamp(0.875rem, 0.83rem + 0.15vw, 0.9375rem);
  --fs-base: clamp(1rem,     0.95rem + 0.15vw, 1.0625rem);
  --fs-lg:   clamp(1.125rem, 1.05rem + 0.25vw, 1.25rem);
  --fs-xl:   clamp(1.375rem, 1.25rem + 0.5vw,  1.625rem);
  --fs-2xl:  clamp(1.75rem,  1.5rem  + 1vw,    2.25rem);
  --fs-3xl:  clamp(2.25rem,  1.85rem + 1.6vw,  3.125rem);
  --fs-4xl:  clamp(2.875rem, 2.25rem + 2.5vw,  4.5rem);

  --lead-tight:   1.18;
  --lead-snug:    1.32;
  --lead-normal:  1.55;
  --lead-relaxed: 1.72;

  --track-tight:    -0.022em;
  --track-snug:     -0.012em;
  --track-normal:    0;
  --track-loose:     0.015em;
  --track-eyebrow:   0.08em;

  /* ─── 18 Voice Slots (β2 fills, worlds override) ─── */
  --voice-hero:        system-ui, sans-serif;
  --voice-display:     system-ui, sans-serif;
  --voice-display-h:   system-ui, sans-serif;
  --voice-display-l:   system-ui, sans-serif;
  --voice-body:        system-ui, sans-serif;
  --voice-body-lead:   system-ui, sans-serif;
  --voice-ui:          system-ui, sans-serif;
  --voice-label:       system-ui, sans-serif;
  --voice-numeric:     system-ui, sans-serif;
  --voice-num-tabular: ui-monospace, monospace;
  --voice-code:        ui-monospace, monospace;
  --voice-accent:      system-ui, sans-serif;
  --voice-eyebrow:     system-ui, sans-serif;
  --voice-signature:   system-ui, sans-serif;
  --voice-ribbon:      system-ui, sans-serif;
  --voice-quote:       system-ui, serif;
  --voice-latin:       system-ui, sans-serif;
  --voice-wordmark:    system-ui, sans-serif;
}
```

### ٤. `tokens/_motion.css` (≈ 35 سطر)

```css
/* ÊLAN v4 — α2 — Motion Tokens */

:root {
  --t-1: 120ms;
  --t-2: 180ms;
  --t-3: 260ms;
  --t-4: 380ms;
  --t-5: 520ms;
  --t-slow: 800ms;

  --ease-elan:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-soft:    cubic-bezier(0.4, 0, 0.2, 1);
  --ease-snap:    cubic-bezier(0.7, 0, 0.3, 1);

  --tx-micro:  var(--t-2) var(--ease-elan);
  --tx-macro:  var(--t-3) var(--ease-elan);
  --tx-spring: var(--t-4) var(--ease-spring);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --t-1: 0ms; --t-2: 0ms; --t-3: 0ms;
    --t-4: 0ms; --t-5: 0ms; --t-slow: 0ms;
  }
}
```

### ٥. `tokens/_breakpoint.css` (≈ 25 سطر)

```css
/* ÊLAN v4 — α2 — Breakpoint Tokens */

:root {
  --bp-xs: 360px;
  --bp-sm: 480px;
  --bp-md: 720px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1440px;

  --container-page: layout inline-size;
  --container-card: inline-size;
}

.elan-page-container { container: page / inline-size; }
.elan-card-container { container: card / inline-size; }
```

### ٦. 8 ملفات `worlds/_<name>.css` placeholders

كل واحد:
```css
/* ÊLAN v4 — α2 — World placeholder: <world-name>
   Filled in γ<N>. See WORLDS_ATLAS.md for spec. */

[data-world="<name>"] {
  /* Awaiting γ<N> stage. See WORLDS_ATLAS.md. */
}
```

### ٧. `tokens.css` بعد التشطير (18 سطر فقط)

```css
/* ÊLAN v4 — α2 — Token Entry Point */
@import url("./tokens/_color.css");
@import url("./tokens/_space.css");
@import url("./tokens/_type.css");
@import url("./tokens/_motion.css");
@import url("./tokens/_breakpoint.css");

/* Worlds — placeholders now, filled in γ */
@import url("./worlds/_hibr.css");
@import url("./worlds/_naar.css");
@import url("./worlds/_nada.css");
@import url("./worlds/_hadeed.css");
@import url("./worlds/_dhahab.css");
@import url("./worlds/_tayyar.css");
@import url("./worlds/_warsha.css");
@import url("./worlds/_saloon.css");
```

---

## Acceptance Criteria

- [ ] 5 ملفات في `tokens/` (أسماء بـ `_` prefix)
- [ ] 8 ملفات في `worlds/` placeholders
- [ ] `tokens.css` ≤ 25 سطراً، يحتوي 13 @import (5 tokens + 8 worlds)
- [ ] grep يثبت: `grep -c '@import' platform/assets/css/tokens.css` == 13
- [ ] لا تكسير لـ `style.css` themes الحالية
- [ ] لا ملف JS تم تعديله
- [ ] backward-compat aliases في _color.css موجودة (legacy --color-* aliases تشير للجديد)
- [ ] لا @font-face في أي من tokens/ (تُنقَل في β1)
- [ ] أي صفحة لا تزال تفتح بدون errors
- [ ] لا beacon required في α (هذه foundation، ليست γ/δ/ε)
- [ ] commit: `α2: Token Architecture — verified: tokens=5, worlds=8, important_added=0`

---

## بعد α2

لو context > 40% → ابدأ α3.
وإلا → SESSION CHECKPOINT.

— نهاية α2 —
