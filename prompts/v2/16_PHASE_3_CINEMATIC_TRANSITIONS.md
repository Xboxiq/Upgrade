# 🎬 WORKER 16 — Phase 3/6 — Cinematic Page Transitions
> **اقرأ أولاً:** `prompts/v2/16_WORKER_VITAL_UI.md`.
> **يبني فوق:** W14 P5 (transition wrapper `Upg.transition.run`) + Phase 1-2.
> **الفلسفة:** *الانتقال بين صفحتين ليس قطعاً، هو سرد. الـ direction-aware + depth-aware يشعر العقل أنّه ينتقل في معمار، لا يقفز بين شاشات.*

---

## 🛡️ Preservation Contract (Phase 3)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` tokens | **APPEND** 5 tokens (`--depth-*`) + 4 transition variants | تعديل tokens W14 |
| `style.css` keyframes | **APPEND** 4 keyframes (`depth-in`, `depth-out`, `slide-rtl`, `morph-fade`) | تعديل keyframes W14 |
| `app.js` `Upg.transition` | **EXTEND** بـ option `depth: 'shallow'\|'mid'\|'deep'` + `direction: 'rtl'\|'ltr'\|'center'` | كسر signature `run(name, opts)` |
| `index.html` | لا تُلمَس | أي تعديل |

---

## 🎯 الهدف

1. **5 transition variants** مرتبة من الأخفت إلى الأعمق:
   - `fade` (موجود من W14 — يبقى كما هو، الـ default).
   - `depth-shallow` — z-axis micro-shift (≤8px).
   - `depth-mid` — z-axis + slight blur (≤4px) ثوانٍ ميكروسكوبية.
   - `slide-direction` — slide RTL أو LTR حسب direction.
   - `morph-fade` — opacity + scale + tint shift (الـ flagship transition).

2. **Direction awareness** — RTL platform، slide ينعكس تلقائياً عبر CSS logical properties.

3. **Depth tokens** — `--depth-shallow`, `--depth-mid`, `--depth-deep` (z-axis offsets).

4. **Parallax sub-layers** — `[data-parallax="N"]` data-attribute لـ 3 levels من الـ parallax الميكروسكوبي.

5. **`Upg.transition.run('page', { depth, direction })`** يقبل خيارات جديدة.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 3 PRE-FLIGHT
├─ Phase: 3/6 — Cinematic Transitions
├─ Estimated lines: ~430 (CSS ~340 + JS ~90)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~340)
│   └─ platform/assets/app.js      (extend Upg.transition without breaking signature)
├─ Sacred verify (run BEFORE):
│   ├─ Phase 2 sanity passed
│   └─ grep -c 'Upg.transition' platform/assets/app.js   → ≥1
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Depth Tokens

```css
/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Cinematic Tokens (Worker 16 / Phase 3)
   ════════════════════════════════════════════════════════════════ */
:root {
  --depth-shallow:        4px;
  --depth-mid:            10px;
  --depth-deep:           18px;

  --transition-page-duration:  380ms;
  --transition-page-easing:    cubic-bezier(0.22, 0.61, 0.36, 1);
}
```

### Step 2 — Keyframes (4)

```css
@keyframes depth-in {
  0%   { transform: translateZ(calc(var(--depth-mid) * -1)) scale(0.985); opacity: 0; }
  100% { transform: translateZ(0) scale(1); opacity: 1; }
}

@keyframes depth-out {
  0%   { transform: translateZ(0) scale(1); opacity: 1; }
  100% { transform: translateZ(var(--depth-mid)) scale(1.012); opacity: 0; }
}

@keyframes slide-rtl {
  0%   { transform: translate3d(40px, 0, 0); opacity: 0; }
  100% { transform: translate3d(0, 0, 0); opacity: 1; }
}

@keyframes morph-fade {
  0%   { transform: scale(0.97); opacity: 0; filter: hue-rotate(-3deg); }
  60%  { opacity: 1; filter: hue-rotate(0deg); }
  100% { transform: scale(1); opacity: 1; filter: none; }
}
```

### Step 3 — Transition Variants

```css
/* Apply via .page-transition--<variant> on the active <section.page>. */
.page-transition--depth-shallow { animation: depth-in calc(var(--transition-page-duration) * 0.85) var(--transition-page-easing); }
.page-transition--depth-mid     { animation: depth-in var(--transition-page-duration) var(--transition-page-easing); }
.page-transition--depth-deep    { animation: depth-in calc(var(--transition-page-duration) * 1.2) var(--transition-page-easing); transform-origin: center; }
.page-transition--slide-rtl     { animation: slide-rtl var(--transition-page-duration) var(--transition-page-easing); }
.page-transition--slide-ltr     { animation: slide-rtl var(--transition-page-duration) var(--transition-page-easing) reverse; }
.page-transition--morph         { animation: morph-fade calc(var(--transition-page-duration) * 1.4) var(--transition-page-easing); }
```

### Step 4 — Parallax Sub-Layers

```css
[data-parallax="1"] { transform: translateY(var(--parallax-y, 0)); transition: transform 480ms ease; }
[data-parallax="2"] { transform: translateY(calc(var(--parallax-y, 0) * 1.6)); transition: transform 520ms ease; }
[data-parallax="3"] { transform: translateY(calc(var(--parallax-y, 0) * 2.4)); transition: transform 560ms ease; }
```

### Step 5 — Reduced-Motion Guard

```css
@media (prefers-reduced-motion: reduce) {
  .page-transition--depth-shallow,
  .page-transition--depth-mid,
  .page-transition--depth-deep,
  .page-transition--slide-rtl,
  .page-transition--slide-ltr,
  .page-transition--morph,
  [data-parallax] {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

/* End VITAL UI v1 / Worker 16 / Phase 3 ─────────────────────────────────── */
```

### Step 6 — Extend `Upg.transition.run`

```javascript
/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Cinematic Transition Extension (W16 / Phase 3)
   Wraps existing Upg.transition.run to accept { depth, direction }.
   ════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  if (!window.Upg || !window.Upg.transition || typeof window.Upg.transition.run !== 'function') {
    return; // Silently skip if W14 transition wrapper missing.
  }

  const VARIANTS = {
    'fade':           '',                       // legacy default (W14)
    'depth-shallow':  'page-transition--depth-shallow',
    'depth-mid':      'page-transition--depth-mid',
    'depth-deep':     'page-transition--depth-deep',
    'slide-rtl':      'page-transition--slide-rtl',
    'slide-ltr':      'page-transition--slide-ltr',
    'morph':          'page-transition--morph'
  };

  const originalRun = window.Upg.transition.run.bind(window.Upg.transition);

  window.Upg.transition.run = function (name, opts) {
    opts = opts || {};
    const depth = opts.depth || 'fade';
    const cls = VARIANTS[depth] || '';

    // Apply variant class to incoming page if present.
    const target = document.querySelector('.page.active') || document.body;
    if (cls && target) {
      target.classList.add(cls);
      const cleanup = () => target.classList.remove(cls);
      target.addEventListener('animationend', cleanup, { once: true });
      // Safety timer in case animationend fires not.
      setTimeout(cleanup, 1400);
    }

    return originalRun(name, opts);
  };

  // List variants (for command palette / debugging).
  window.Upg.transition.variants = function () { return Object.keys(VARIANTS); };
})(window, document);
```

---

## 🧪 Sanity Probe

```bash
grep -c '\-\-depth-' platform/assets/style.css                    # → ≥3
grep -c '@keyframes depth-' platform/assets/style.css             # → 2
grep -c 'page-transition--' platform/assets/style.css             # → ≥6
grep -c 'data-parallax' platform/assets/style.css                 # → ≥3
grep -c 'Upg.transition.variants' platform/assets/app.js          # → 1
```

---

## ✅ معايير القبول (Phase 3)

- [ ] 5 transition variants شغّالة على `.page` element.
- [ ] `Upg.transition.run('page', { depth: 'morph' })` يطبّق variant.
- [ ] direction-aware slide (RTL/LTR) يعكس تلقائياً.
- [ ] `[data-parallax="1|2|3"]` يحرّك ميكروسكوبياً.
- [ ] reduced-motion يطفئ كل ما سبق.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css platform/assets/app.js
git commit -m "phase 3 (vital): cinematic transitions — depth/slide/morph + parallax + Upg.transition.variants"
```

— نهاية Phase 3. 🎬 **Cinematic check:** الانتقال يحكي قصة؟ نعم → Phase 4.
