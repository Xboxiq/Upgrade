# 🎞️ WORKER 12 — Phase 6/7 — Motion & Interaction (Apple Springs + Cursor Glow)
> **يبني فوق:** Phase 1-5.
> **الفلسفة:** الحركة لها وزن. لا تفصل، لا تستعرض. الـ easing الصحيح يجعل الواجهة تبدو **مفهومة قبل أن تُقرأ**.

---

## 🎯 الهدف

1. **Easing Tokens** على نمط Apple — `--ease-emphasized`, `--ease-decelerate`, `--ease-accelerate`, `--ease-spring-soft`, `--ease-spring-snappy`.
2. **Press feedback** على كل clickable: scale 0.96 + transition 120ms.
3. **Page Transitions** بين الصفحات عبر View Transitions API + fallback CSS.
4. **Cursor Glow** خفيف يلاحق المؤشّر على الكروت (additive — موجود من Worker 01 لكن نُعيد ضبطه).
5. **Hover Lift** بمعيار موحّد لكل الكروت (lift 2px + halo).
6. **Stagger reveal** عند ظهور الـ Bento أول مرة.
7. **`prefers-reduced-motion`** — كل الحركات تُلغى ويُحتفظ بالـ opacity transitions فقط.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 6 PRE-FLIGHT
├─ Phase: 6/7 — Motion & Interaction
├─ Estimated lines: ~520
├─ Files to touch:
│   ├─ platform/assets/style.css   (motion tokens + utilities + reduced-motion)
│   └─ platform/assets/app.js      (Upg.motion + Upg.cursor)
├─ Sections preserved: ALL.
├─ Tokens added: --ease-*, --duration-*, --motion-state-*
└─ Branch: continue worker-12-aurora.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Motion Tokens

```css
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Motion Tokens (Worker 12 / Phase 6)
   مستوحاة من Material 3 Expressive + Apple HIG.
   ═══════════════════════════════════════════════════════════════ */
:root {
  /* Easing curves */
  --ease-linear:           linear;
  --ease-emphasized:       cubic-bezier(0.2, 0, 0, 1);     /* فتح/تحرّك أساسي */
  --ease-decelerate:       cubic-bezier(0, 0, 0.2, 1);     /* دخول */
  --ease-accelerate:       cubic-bezier(0.3, 0, 1, 1);     /* خروج */
  --ease-spring-soft:      cubic-bezier(0.34, 1.36, 0.64, 1);  /* press feedback */
  --ease-spring-snappy:    cubic-bezier(0.5, 1.5, 0.4, 1);     /* sidebar pill */
  --ease-overshoot:        cubic-bezier(0.32, 1.6, 0.6, 1);    /* count-up final */

  /* Durations */
  --duration-instant:  80ms;
  --duration-quick:    120ms;
  --duration-base:     220ms;
  --duration-medium:   320ms;
  --duration-long:     480ms;
  --duration-page:     360ms;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-instant: 0ms;
    --duration-quick:   0ms;
    --duration-base:    0ms;
    --duration-medium:  0ms;
    --duration-long:    0ms;
    --duration-page:    0ms;
  }
  *, *::before, *::after {
    animation-duration: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Step 2 — Press / Hover / Lift Utilities

```css
/* Universal press feedback — apply via class */
.u-press,
button:not(:disabled),
[role="button"]:not(:disabled),
.dock-btn,
.tb-btn,
.cath-quick-action,
.gateway-cta,
.theme-toggle {
  transition:
    transform var(--duration-quick) var(--ease-spring-soft),
    background-color var(--duration-base) var(--ease-decelerate),
    color var(--duration-base) var(--ease-decelerate),
    box-shadow var(--duration-base) var(--ease-decelerate),
    border-color var(--duration-base) var(--ease-decelerate);
}
.u-press:active,
button:not(:disabled):active,
[role="button"]:not(:disabled):active,
.dock-btn:active,
.tb-btn:active { transform: scale(0.96); }

/* Hover lift utility */
.u-lift {
  will-change: transform, box-shadow;
  transition:
    transform var(--duration-base) var(--ease-emphasized),
    box-shadow var(--duration-base) var(--ease-emphasized);
}
.u-lift:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-c-lg), var(--hairline-light);
}

/* Stagger reveal — used by Upg.motion.reveal */
[data-reveal] {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity var(--duration-medium) var(--ease-decelerate),
    transform var(--duration-medium) var(--ease-decelerate);
}
[data-reveal][data-revealed="true"] { opacity: 1; transform: none; }
```

### Step 3 — Cursor Glow (additive over cards)

```css
/* Cards opt-in via class .u-card-glow — يستعمل CSS vars يحدّثها JS */
.u-card-glow { position: relative; isolation: isolate; }
.u-card-glow::after {
  content: '';
  position: absolute; inset: 0;
  border-radius: inherit;
  background:
    radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%),
      color-mix(in oklch, var(--color-tint, var(--color-brand)) 22%, transparent),
      transparent 60%);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--duration-base) var(--ease-decelerate);
  z-index: -1;
}
.u-card-glow:hover::after { opacity: 1; }
```

JS:
```js
/* ═══════════════════════════════════════════════════════════════
   AURORA v15 — Cursor Glow & Motion (Worker 12 / Phase 6)
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cursor glow on .u-card-glow
  if (!reduce) {
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.u-card-glow');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }, { passive: true });
  }

  // Stagger reveal on [data-reveal] when section becomes visible
  const reveal = (root = document) => {
    const list = root.querySelectorAll('[data-reveal]:not([data-revealed])');
    if (!('IntersectionObserver' in window) || reduce) {
      list.forEach((el, i) => setTimeout(() => el.dataset.revealed = 'true', i * 30));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en, i) => {
        if (!en.isIntersecting) return;
        en.target.style.transitionDelay = `${Math.min(i * 35, 280)}ms`;
        en.target.dataset.revealed = 'true';
        io.unobserve(en.target);
      });
    }, { threshold: 0.12 });
    list.forEach(el => io.observe(el));
  };

  // Auto-mark Bento children for reveal (Phase 5 output)
  const bentoNodes = document.querySelectorAll('.bento > *');
  bentoNodes.forEach(n => n.setAttribute('data-reveal', ''));

  // Add cursor glow to Bento + dashboard cards
  document.querySelectorAll('.bento > *, .surface-card, .stat-tile').forEach(n => n.classList.add('u-card-glow', 'u-lift'));

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => reveal());
  else reveal();

  window.Upg = window.Upg || {};
  window.Upg.motion = { reveal };
})();
```

### Step 4 — Page Transitions (View Transitions + fallback)

```css
/* Page transition fallback (لو View Transitions غير مدعوم) */
.page { opacity: 0; transform: translateY(6px); transition: opacity var(--duration-page) var(--ease-decelerate),
                                                          transform var(--duration-page) var(--ease-decelerate); }
.page.active { opacity: 1; transform: none; }

/* If supported, name the root for view-transition */
@supports (view-transition-name: root) {
  .page { transition: none; transform: none; opacity: 1; }
  .page:not(.active) { display: none; }
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: var(--duration-page);
    animation-timing-function: var(--ease-emphasized);
  }
}
```

JS — لف الـ `navigateTo` الحالية بـ View Transition:
```js
(() => {
  'use strict';
  if (typeof window.navigateTo !== 'function') return;
  const original = window.navigateTo;
  window.navigateTo = function (pageId) {
    if (document.startViewTransition) {
      document.startViewTransition(() => original.apply(this, [pageId]));
    } else {
      original.apply(this, [pageId]);
    }
  };
})();
```

### Step 5 — Sidebar Pill يستعمل tokens

ابحث في CSS الـ Phase 4:
```css
#sidebar { transition: width 320ms var(--ease-emphasized, ...); }
```
وحدّثها لتستعمل `var(--ease-spring-snappy)` و `var(--duration-medium)`. كذلك الـ topbar.

### Step 6 — Loading Skeleton (للأقسام التي تأخذ وقت hydration)

```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
.skeleton {
  border-radius: var(--radius-md);
  background: linear-gradient(90deg,
    var(--color-surface-2) 0%,
    color-mix(in oklch, var(--color-surface-2) 60%, var(--color-surface-3)) 50%,
    var(--color-surface-2) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
}
@media (prefers-reduced-motion: reduce) { .skeleton { animation: none; } }
```

---

## ✅ Acceptance Criteria

- [ ] جميع الأزرار تأخذ feedback `scale(0.96)` عند press.
- [ ] الكروت في Bento ترتفع 3px وتلوّن halo عند hover.
- [ ] الـ glow يلاحق المؤشّر بسلاسة على الكروت (لا lag).
- [ ] أول دخول للوحة Dashboard، الكروت تظهر staggered (35ms بين كل كرت).
- [ ] الـ View Transitions تشتغل بين الصفحات (لو مدعومة) — تحقّق من Chrome DevTools.
- [ ] `prefers-reduced-motion: reduce` يلغي كل الحركة (ولا يكسر الواجهة).
- [ ] sidebar collapse يستعمل spring-snappy، ينطبق بلا اهتزاز.
- [ ] لا errors في console.

---

## 🛡️ في نهاية الـ Phase

```
1. commit  : "phase 6 (aurora): motion tokens + springs + cursor glow + view transitions"
2. push    : worker-12-aurora → origin
3. update  : state/PROGRESS.json (phase=6)
4. snapshot: state/snapshots/worker-12-phase-6.json
5. commit  : "state: aurora phase 6 committed and pushed"
6. push
```

**التالي:** `prompts/12_PHASE_7_INLINE_PURGE.md`.

— نهاية Phase 6.
