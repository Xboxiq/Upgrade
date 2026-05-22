# 🚪 WORKER 22 — Phase 3/6 — Threshold Transitions
> **اقرأ أولاً:** `prompts/v3/22_WORKER_RITUAL_UI.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phase 1 (Upg.ritual) + Phase 2 (halo).
> **الفلسفة:** *العتبة طقس. لا تَنتقل بين صفحتين، تَعبُر بينهما. كل عبور له طبيعة — Mashrabiya مُلتفَّة، Mihrab arch مُتفَتِّحة، Iris تأمليّة.*

---

## 🛡️ Preservation Contract (Phase 3)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` rules | **APPEND** كتلة `Threshold Transitions` (~360 سطر) | تعديل قواعد قائمة |
| `style.css` `:root` | **APPEND** 8 transition tokens | تعديل tokens قائمة |
| `index.html` | لا يُلمَس | أي تعديل |
| `app.js` | **EXTEND** `Upg.transition.run` بـ `ritual` option + EXTEND `Upg.ritual` بـ `setTransition` | لمس Upg.transition signature الأساسي |

**Sacred preserved:**
- `Upg.transition` API (W14) — نُمدّده، لا نَكسره.
- جميع W14-W16 transition keyframes.
- 27 Upg.* APIs.

---

## 🎯 الهدف

Phase 3 يُضيف **5 transition variants** بين الصفحات:

| ID | الاسم | الوصف | الـ Personalities المُوصاة |
|---|---|---|---|
| `fade` | Classical Fade | الموجود من W14 (افتراضي) | جميع الصفحات |
| `mashrabiya` | مَشْرَبية | clip-path lattice يَنفتح من المركز | dashboard, social, customercare |
| `scroll` | لِفافة | محتوى يَنزلق عمودياً (scroll metaphor) | psych, eq, hrmastery |
| `iris` | إِيريس | دائرة تَتَّسع من الوسط | callcenter, programming, lab |
| `mihrab-arch` | قَوس المحراب | arch يَنفتح من الأعلى للأسفل | accountmgr, negotiation, accounting |

**Per-personality routing:** كل صفحة لها transition معتمدة (15 mapping).

**Discipline:**
- Total duration ≤ 600ms.
- reduced-motion: fallback to `fade` فوري.
- بـ View Transitions API لو متاحة، CSS keyframes كـ fallback.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 3 PRE-FLIGHT (Worker 22 / RITUAL UI)
├─ Phase: 3/6 — Threshold Transitions
├─ Estimated lines: ~520 (CSS ~360 + JS ~160 extends)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~360 lines)
│   └─ platform/assets/app.js      (EXTEND Upg.transition + Upg.ritual ~160 lines)
├─ Sacred verify:
│   ├─ grep -c 'Upg.transition' platform/assets/app.js            → ≥1 (W14)
│   ├─ grep -c '@keyframes' platform/assets/style.css             → ≥30 (preserved)
│   └─ grep -c 'data-page-personality' platform/index.html        → 15
├─ Branch: continue worker-22-devotio
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Transition Tokens

```css
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Threshold Tokens (Worker 22 / Phase 3)
   ════════════════════════════════════════════════════════════════════════ */
:root {
  --rit-thresh-duration:           500ms;
  --rit-thresh-easing-classical:   cubic-bezier(0.4, 0.0, 0.2, 1);
  --rit-thresh-easing-mashrabiya:  cubic-bezier(0.65, 0.0, 0.35, 1);
  --rit-thresh-easing-scroll:      cubic-bezier(0.5, 0.0, 0.5, 1);
  --rit-thresh-easing-iris:        cubic-bezier(0.7, 0.0, 0.3, 1);
  --rit-thresh-easing-mihrab:      cubic-bezier(0.55, 0.0, 0.1, 1);

  /* Active transition mode (set per-page via JS) */
  --rit-thresh-active: "fade";
}
```

### Step 2 — Threshold CSS (5 variants)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — 5 Threshold Variants (Worker 22 / Phase 3)
   ────────────────────────────────────────────────────────────────────────
   Each variant uses View Transitions API where available, CSS keyframes
   as fallback. Activated via Upg.transition.run('next', { ritual: 'X' }).
   ════════════════════════════════════════════════════════════════════════ */

/* ─── 1. FADE (classical — preserves W14 default) ─── */
.rit-thresh-fade-out {
  animation: rit-thresh-fade-out var(--rit-thresh-duration) var(--rit-thresh-easing-classical) forwards;
}
.rit-thresh-fade-in {
  animation: rit-thresh-fade-in var(--rit-thresh-duration) var(--rit-thresh-easing-classical) forwards;
}
@keyframes rit-thresh-fade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}
@keyframes rit-thresh-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ─── 2. MASHRABIYA (lattice opens from center) ─── */
.rit-thresh-mashrabiya-out {
  animation: rit-thresh-mashrabiya-out var(--rit-thresh-duration) var(--rit-thresh-easing-mashrabiya) forwards;
}
.rit-thresh-mashrabiya-in {
  animation: rit-thresh-mashrabiya-in var(--rit-thresh-duration) var(--rit-thresh-easing-mashrabiya) forwards;
}
@keyframes rit-thresh-mashrabiya-out {
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    opacity: 1;
  }
  100% {
    clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
    opacity: 0;
  }
}
@keyframes rit-thresh-mashrabiya-in {
  0% {
    clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
    opacity: 0;
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    opacity: 1;
  }
}

/* ─── 3. SCROLL (vertical roll) ─── */
.rit-thresh-scroll-out {
  animation: rit-thresh-scroll-out var(--rit-thresh-duration) var(--rit-thresh-easing-scroll) forwards;
}
.rit-thresh-scroll-in {
  animation: rit-thresh-scroll-in var(--rit-thresh-duration) var(--rit-thresh-easing-scroll) forwards;
}
@keyframes rit-thresh-scroll-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
@keyframes rit-thresh-scroll-in {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ─── 4. IRIS (circular reveal from center) ─── */
.rit-thresh-iris-out {
  animation: rit-thresh-iris-out var(--rit-thresh-duration) var(--rit-thresh-easing-iris) forwards;
}
.rit-thresh-iris-in {
  animation: rit-thresh-iris-in var(--rit-thresh-duration) var(--rit-thresh-easing-iris) forwards;
}
@keyframes rit-thresh-iris-out {
  from {
    clip-path: circle(150% at 50% 50%);
    opacity: 1;
  }
  to {
    clip-path: circle(0% at 50% 50%);
    opacity: 0;
  }
}
@keyframes rit-thresh-iris-in {
  from {
    clip-path: circle(0% at 50% 50%);
    opacity: 0;
  }
  to {
    clip-path: circle(150% at 50% 50%);
    opacity: 1;
  }
}

/* ─── 5. MIHRAB ARCH (top-down arch) ─── */
.rit-thresh-mihrab-out {
  animation: rit-thresh-mihrab-out var(--rit-thresh-duration) var(--rit-thresh-easing-mihrab) forwards;
}
.rit-thresh-mihrab-in {
  animation: rit-thresh-mihrab-in var(--rit-thresh-duration) var(--rit-thresh-easing-mihrab) forwards;
}
@keyframes rit-thresh-mihrab-out {
  0% {
    clip-path: ellipse(150% 150% at 50% 0%);
    opacity: 1;
  }
  100% {
    clip-path: ellipse(0% 0% at 50% 0%);
    opacity: 0;
  }
}
@keyframes rit-thresh-mihrab-in {
  0% {
    clip-path: ellipse(0% 0% at 50% 0%);
    opacity: 0;
  }
  100% {
    clip-path: ellipse(150% 150% at 50% 0%);
    opacity: 1;
  }
}

/* ════════════════════════════════════════════════════════════════════════
   View Transitions API support (for browsers that have it — chrome 111+)
   ════════════════════════════════════════════════════════════════════════ */
@supports (view-transition-name: x) {
  ::view-transition-old(rit-page),
  ::view-transition-new(rit-page) {
    animation-duration: var(--rit-thresh-duration);
    animation-timing-function: var(--rit-thresh-easing-classical);
  }

  /* Per-mode view-transition pseudo-elements */
  body[data-rit-thresh="mashrabiya"] ::view-transition-old(rit-page) {
    animation-name: rit-thresh-mashrabiya-out;
  }
  body[data-rit-thresh="mashrabiya"] ::view-transition-new(rit-page) {
    animation-name: rit-thresh-mashrabiya-in;
  }
  body[data-rit-thresh="iris"] ::view-transition-old(rit-page) {
    animation-name: rit-thresh-iris-out;
  }
  body[data-rit-thresh="iris"] ::view-transition-new(rit-page) {
    animation-name: rit-thresh-iris-in;
  }
  body[data-rit-thresh="scroll"] ::view-transition-old(rit-page) {
    animation-name: rit-thresh-scroll-out;
  }
  body[data-rit-thresh="scroll"] ::view-transition-new(rit-page) {
    animation-name: rit-thresh-scroll-in;
  }
  body[data-rit-thresh="mihrab-arch"] ::view-transition-old(rit-page) {
    animation-name: rit-thresh-mihrab-out;
  }
  body[data-rit-thresh="mihrab-arch"] ::view-transition-new(rit-page) {
    animation-name: rit-thresh-mihrab-in;
  }
}

/* ════════════════════════════════════════════════════════════════════════
   Reduced-Motion — fallback to instant fade
   ════════════════════════════════════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .rit-thresh-fade-out,        .rit-thresh-fade-in,
  .rit-thresh-mashrabiya-out,  .rit-thresh-mashrabiya-in,
  .rit-thresh-scroll-out,      .rit-thresh-scroll-in,
  .rit-thresh-iris-out,        .rit-thresh-iris-in,
  .rit-thresh-mihrab-out,      .rit-thresh-mihrab-in {
    animation-duration: 0ms !important;
    animation-name: none !important;
  }
}

/* End RITUAL UI v3 / Phase 3 — Thresholds ───────────────────────────── */
```

### Step 3 — EXTEND `Upg.transition` + `Upg.ritual.setTransition`

```javascript
/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Threshold Routing (Worker 22 / Phase 3)
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.transition || !window.Upg.ritual) return;

  const VARIANTS = ['fade', 'mashrabiya', 'scroll', 'iris', 'mihrab-arch'];

  const PERSONALITY_TRANSITIONS = {
    'dashboard':   'mashrabiya',
    'callcenter':  'iris',
    'fieldsales':  'fade',
    'accountmgr':  'mihrab-arch',
    'social':      'mashrabiya',
    'lab':         'iris',
    'psych':       'scroll',
    'eq':          'scroll',
    'negotiation': 'mihrab-arch',
    'customercare':'mashrabiya',
    'programming': 'iris',
    'accounting':  'mihrab-arch',
    'phonerepair': 'fade',
    'hrmastery':   'scroll',
    'myprogress':  'fade',
    'curriculum':  'mashrabiya'
  };

  // Get transition for incoming page (based on personality)
  const getTransitionForPage = (pageId) => {
    const stripped = (pageId || '').replace(/^page-/, '');
    return PERSONALITY_TRANSITIONS[stripped] || 'fade';
  };

  // Set body attribute for current transition (used by CSS :supports view-transitions)
  const setActiveTransition = (variant) => {
    if (!VARIANTS.includes(variant)) variant = 'fade';
    document.body.setAttribute('data-rit-thresh', variant);
  };

  // Wrap original Upg.transition.run to add ritual support
  const originalRun = window.Upg.transition.run;
  window.Upg.transition.run = function (name, opts = {}) {
    const variant = opts.ritual ||
                    (opts.toPageId && getTransitionForPage(opts.toPageId)) ||
                    'fade';

    setActiveTransition(variant);

    // Use View Transitions API if available
    if (document.startViewTransition && variant !== 'fade') {
      return document.startViewTransition(() => {
        if (typeof originalRun === 'function') return originalRun(name, opts);
      });
    }

    // Fallback: CSS class-based animation
    const oldEl = document.querySelector('section.page:not([hidden])');
    const newEl = opts.toPageId ? document.getElementById(opts.toPageId) : null;

    if (oldEl) oldEl.classList.add(`rit-thresh-${variant}-out`);
    if (newEl) newEl.classList.add(`rit-thresh-${variant}-in`);

    setTimeout(() => {
      if (oldEl) oldEl.classList.remove(`rit-thresh-${variant}-out`);
      if (newEl) newEl.classList.remove(`rit-thresh-${variant}-in`);
    }, 700);

    if (typeof originalRun === 'function') return originalRun(name, opts);
  };

  // Extend Upg.ritual
  window.Upg.ritual.setTransition = (variant, pagePersonality) => {
    if (pagePersonality) {
      PERSONALITY_TRANSITIONS[pagePersonality] = variant;
    } else {
      setActiveTransition(variant);
    }
  };
  window.Upg.ritual.getTransition = (pagePersonality) =>
    PERSONALITY_TRANSITIONS[pagePersonality] || 'fade';
  window.Upg.ritual.listTransitions = () => VARIANTS.slice();
  window.Upg.ritual.transitionMap = () => ({ ...PERSONALITY_TRANSITIONS });

})(window, document);
```

### Step 4 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 22 / Phase 3 — Threshold Discipline:
   1. ٥ variants فقط — لا تخترع جديد بدون phase-spec.
   2. Total duration ≤ 600ms.
   3. reduced-motion → instant (0ms).
   4. View Transitions API مفضّلة لو متاحة، CSS كـ fallback.
   5. Per-personality routing 15 mapping ثابت — Phase 6 يستهلكه في Aura.
   6. لا تُلمس Upg.transition.run signature — extend فقط.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
# Sacred preserved
grep -c 'Upg.transition' platform/assets/app.js                   # → ≥1 (W14 preserved)
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 27 (preserved)

# New keyframes
grep -c '@keyframes rit-thresh-' platform/assets/style.css        # → ≥10 (5 variants × 2 directions)

# Tokens
grep -c '\-\-rit-thresh-' platform/assets/style.css               # → ≥7

# Reduced-motion
grep -A 5 '@media (prefers-reduced-motion: reduce)' platform/assets/style.css | grep -c 'rit-thresh'  # → ≥1

# JS API
grep -c 'PERSONALITY_TRANSITIONS' platform/assets/app.js          # → ≥1
grep -c 'setTransition\|getTransition\|listTransitions' platform/assets/app.js  # → ≥3

# Browser test:
# Console: Upg.ritual.listTransitions() → ['fade', 'mashrabiya', 'scroll', 'iris', 'mihrab-arch']
# Console: Upg.ritual.transitionMap() → 15 mappings
# Navigate dashboard → callcenter → mashrabiya transition (visible)
```

---

## ✅ معايير القبول (Phase 3)

- [ ] 8 transition tokens.
- [ ] 5 variants × 2 directions = 10 keyframes.
- [ ] View Transitions API integration (where supported).
- [ ] CSS fallback for older browsers.
- [ ] Reduced-motion guard.
- [ ] `Upg.transition.run` extended (no signature break).
- [ ] `Upg.ritual.setTransition`, `getTransition`, `listTransitions`, `transitionMap` معرَّفة.
- [ ] 15 personality mappings.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css platform/assets/app.js
git commit -m "phase 3 (devotio): threshold transitions — 5 variants (fade/mashrabiya/scroll/iris/mihrab-arch), View Transitions API + CSS fallback, 15 personality routing"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-22-phase-3.json
git commit -m "state: devotio phase 3 (worker 22) committed and pushed"
# push immediately
```

— نهاية Phase 3.

🚪 **Devotion check:** هل العبور بين الصفحات صار طقساً مُتنوّعاً؟ → Phase 4 (Inkpot Feedback).
