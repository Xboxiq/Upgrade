# α2 — Token Architecture
> **Pillar α (FOUNDATION) / Stage 2 of 3**
> الهدف: تشطير tokens الحالية إلى 5 ملفات بمسؤولية واحدة لكل ملف.

---

## السياق (لماذا)

`tokens.css` الحالي يخلط: ألوان + safe-area + font-faces + chrome heights + print tokens. النتيجة: لو أردت تعديل لون فقط، تفتح ملفاً 289 سطراً. ÊLAN يفصل المسؤوليات.

## المُخرَجات

### ملفات تُنشأ في `platform/assets/css/tokens/`:
1. `tokens/_color.css` — كل tokens الألوان (default + light + dark theme variables)
2. `tokens/_space.css` — spacing scale (4pt base + container padding + safe-area)
3. `tokens/_type.css` — font-size scale + line-height + letter-spacing + 18 voice tokens
4. `tokens/_motion.css` — easing tokens + duration tokens + transition presets
5. `tokens/_breakpoint.css` — container query thresholds (mobile-first)

### ملفات تُعدَّل:
- `platform/assets/css/tokens.css` — يصبح **ملف واحد** يستورد الخمسة عبر `@import`
- `platform/assets/style.css` — لا تغيير (لأن tokens.css الجديد يستورد الخمسة بنفسه)

### ملفات تُحذف من `tokens.css` الحالي بعد النقل:
- @font-face declarations → تُنقَل إلى `β1` (لا تُترك في tokens)

---

## التنفيذ — التفاصيل

### ١. `tokens/_color.css` (≈ 80 سطر)

```css
/* ÊLAN v4 — α2 — Color Tokens
   Three-color discipline: Anchor + Ember + Focus.
   Theme overrides live in style.css @layer themes (preserved). */

:root {
  /* ─── Anchor (surface ladder) ─── */
  --anchor-bg:        hsl(225 30% 6%);
  --anchor-0:         hsl(225 26% 9%);
  --anchor-1:         hsl(225 22% 12%);
  --anchor-2:         hsl(225 20% 16%);
  --anchor-3:         hsl(225 18% 20%);

  /* ─── Ink ladder (text on anchor) ─── */
  --ink:              hsl(220 20% 98%);
  --ink-muted:        hsl(220 15% 70%);
  --ink-faint:        hsl(220 12% 50%);

  /* ─── Borders ─── */
  --line:             hsl(225 18% 22%);
  --line-strong:      hsl(225 22% 32%);

  /* ─── Ember (emotional CTA) ─── */
  --ember:            hsl(28 80% 54%);
  --ember-hover:      hsl(28 85% 60%);
  --ember-soft:       color-mix(in oklch, hsl(28 80% 54%) 12%, transparent);

  /* ─── Focus (active state) ─── */
  --focus:            hsl(252 70% 55%);
  --focus-soft:       color-mix(in oklch, hsl(252 70% 55%) 14%, transparent);

  /* ─── Semantic state ─── */
  --state-success:    hsl(152 70% 55%);
  --state-warning:    hsl(38 92% 60%);
  --state-danger:     hsl(0 80% 65%);
  --state-info:       hsl(210 90% 65%);

  /* ─── Tinted shadows (Refactoring UI principle) ─── */
  --shadow-sm: 0 1px 2px hsl(225 40% 2% / 0.4);
  --shadow-md: 0 4px 12px hsl(225 40% 2% / 0.5);
  --shadow-lg: 0 12px 32px hsl(225 40% 2% / 0.55);
  --shadow-xl: 0 24px 60px hsl(225 40% 2% / 0.6);

  /* ─── Backward-compat bridge (preserved Upg.theme contract) ─── */
  --color-bg:         var(--anchor-bg);
  --color-surface-0:  var(--anchor-0);
  --color-surface-1:  var(--anchor-1);
  --color-surface-2:  var(--anchor-2);
  --color-surface-3:  var(--anchor-3);
  --color-text:       var(--ink);
  --color-text-muted: var(--ink-muted);
  --color-text-faint: var(--ink-faint);
  --color-border:     var(--line);
  --color-border-strong: var(--line-strong);
  --color-brand:      var(--ember);
  --color-brand-hover:var(--ember-hover);
}
```

### ٢. `tokens/_space.css` (≈ 50 سطر)

```css
/* ÊLAN v4 — α2 — Space Tokens
   4pt base scale + safe-area + container padding. */

:root {
  /* ─── Scale ─── */
  --s-1:  0.25rem;   /*  4px */
  --s-2:  0.5rem;    /*  8px */
  --s-3:  0.75rem;   /* 12px */
  --s-4:  1rem;      /* 16px */
  --s-5:  1.25rem;   /* 20px */
  --s-6:  1.5rem;    /* 24px */
  --s-8:  2rem;      /* 32px */
  --s-10: 2.5rem;    /* 40px */
  --s-12: 3rem;      /* 48px */
  --s-16: 4rem;      /* 64px */
  --s-24: 6rem;      /* 96px */

  /* ─── Safe-area insets ─── */
  --safe-top:    env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-left:   env(safe-area-inset-left, 0px);
  --safe-right:  env(safe-area-inset-right, 0px);

  /* ─── Container padding (mobile-first) ─── */
  --container-px-mobile: var(--s-4);
  --container-px-tablet: var(--s-6);
  --container-px-desktop: var(--s-8);

  /* ─── Chrome heights ─── */
  --chrome-topbar-mobile: 56px;
  --chrome-topbar-desktop: 64px;
  --chrome-bottom-nav: 64px;
  --chrome-sidebar: 264px;

  /* ─── Radius scale ─── */
  --r-1: 4px;
  --r-2: 8px;
  --r-3: 12px;
  --r-4: 16px;
  --r-5: 20px;
  --r-pill: 999px;
}
```

### ٣. `tokens/_type.css` (≈ 90 سطر)

```css
/* ÊLAN v4 — α2 — Type Tokens
   18 voice tokens (filled by β2 Voice Casting).
   Numeric scale via clamp() for fluid type. */

:root {
  /* ─── Fluid scale (clamp min 360px → max 1440px) ─── */
  --fs-xs:   clamp(0.75rem,  0.7rem  + 0.15vw, 0.8125rem);
  --fs-sm:   clamp(0.875rem, 0.83rem + 0.15vw, 0.9375rem);
  --fs-base: clamp(1rem,     0.95rem + 0.15vw, 1.0625rem);
  --fs-lg:   clamp(1.125rem, 1.05rem + 0.25vw, 1.25rem);
  --fs-xl:   clamp(1.375rem, 1.25rem + 0.5vw,  1.625rem);
  --fs-2xl:  clamp(1.75rem,  1.5rem  + 1vw,    2.25rem);
  --fs-3xl:  clamp(2.25rem,  1.85rem + 1.6vw,  3.125rem);
  --fs-4xl:  clamp(2.875rem, 2.25rem + 2.5vw,  4.5rem);

  /* ─── Leading (line-height) ─── */
  --lead-tight:   1.18;
  --lead-snug:    1.32;
  --lead-normal:  1.55;
  --lead-relaxed: 1.72;

  /* ─── Tracking (letter-spacing) ─── */
  --track-tight:    -0.022em;
  --track-snug:     -0.012em;
  --track-normal:    0;
  --track-loose:     0.015em;
  --track-eyebrow:   0.08em;

  /* ─── 18 Voice Tokens (β2 will fill stacks; α2 declares names only) ─── */
  --voice-hero:        sans-serif;
  --voice-display:     sans-serif;
  --voice-display-h:   sans-serif;
  --voice-display-l:   sans-serif;
  --voice-body:        sans-serif;
  --voice-body-lead:   sans-serif;
  --voice-ui:          sans-serif;
  --voice-label:       sans-serif;
  --voice-numeric:     sans-serif;
  --voice-num-tabular: sans-serif;
  --voice-code:        monospace;
  --voice-accent:      sans-serif;
  --voice-eyebrow:     sans-serif;
  --voice-signature:   sans-serif;
  --voice-ribbon:      sans-serif;
  --voice-quote:       serif;
  --voice-latin:       sans-serif;
  --voice-wordmark:    sans-serif;
}
```

### ٤. `tokens/_motion.css` (≈ 40 سطر)

```css
/* ÊLAN v4 — α2 — Motion Tokens
   Single source of timing truth. */

:root {
  /* ─── Duration ─── */
  --t-1: 120ms;
  --t-2: 180ms;
  --t-3: 260ms;
  --t-4: 380ms;
  --t-5: 520ms;
  --t-slow: 800ms;

  /* ─── Easing ─── */
  --ease-elan:    cubic-bezier(0.16, 1, 0.3, 1);   /* out-expo, signature */
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-soft:    cubic-bezier(0.4, 0, 0.2, 1);
  --ease-snap:    cubic-bezier(0.7, 0, 0.3, 1);

  /* ─── Composite presets ─── */
  --tx-micro:  var(--t-2) var(--ease-elan);
  --tx-macro:  var(--t-3) var(--ease-elan);
  --tx-spring: var(--t-4) var(--ease-spring);
}

/* prefers-reduced-motion override */
@media (prefers-reduced-motion: reduce) {
  :root {
    --t-1: 0ms;
    --t-2: 0ms;
    --t-3: 0ms;
    --t-4: 0ms;
    --t-5: 0ms;
    --t-slow: 0ms;
  }
}
```

### ٥. `tokens/_breakpoint.css` (≈ 30 سطر)

```css
/* ÊLAN v4 — α2 — Breakpoint Tokens
   Mobile-first container query thresholds. */

:root {
  /* ─── Container query ranges ─── */
  --bp-xs: 360px;   /* phone smallest */
  --bp-sm: 480px;   /* phone large */
  --bp-md: 720px;   /* tablet portrait */
  --bp-lg: 1024px;  /* tablet landscape / small laptop */
  --bp-xl: 1280px;  /* desktop */
  --bp-2xl: 1440px; /* large desktop */

  /* ─── Container types ─── */
  --container-page: layout inline-size;
  --container-card: inline-size;
}

/* Containers — use these instead of media queries where possible */
.elan-page-container { container: page / inline-size; }
.elan-card-container { container: card / inline-size; }
```

### ٦. `tokens.css` بعد التشطير (يصبح 18 سطراً فقط)

```css
/* ÊLAN v4 — α2 — Token Entry Point */
@import url("./tokens/_color.css");
@import url("./tokens/_space.css");
@import url("./tokens/_type.css");
@import url("./tokens/_motion.css");
@import url("./tokens/_breakpoint.css");

/* Theme overrides live in style.css @layer themes (preserved). */
```

---

## Acceptance Criteria

- [ ] 5 ملفات في `platform/assets/css/tokens/` (أسماء بـ `_` prefix)
- [ ] `tokens.css` ≤ 20 سطراً (5 imports + comment header)
- [ ] grep يثبت: `grep -c '@import' platform/assets/css/tokens.css` == 5
- [ ] لا تكسير لأي theme في style.css (light + dark يبقيان)
- [ ] لا ملف JS تم تعديله
- [ ] backward-compat bridges في _color.css موجودة (legacy `--color-*` aliases)
- [ ] لا @font-face في أي من الملفات الخمسة (تُنقَل إلى β1)
- [ ] commit message: `α2: Token Architecture — verified: tokens_files=5, color_lines=<N>, important_added=0`

---

## بعد α2 مباشرة

لو context_remaining > 40% → ابدأ α3 في نفس الـ session.
وإلا → SESSION CHECKPOINT.

— نهاية α2 —
