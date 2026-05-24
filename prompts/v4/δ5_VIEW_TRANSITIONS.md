# δ5 — View Transitions API
> **Pillar δ / Stage 5 of 6**
> الهدف: انتقال سلس بين الصفحات + بين العوالم باستخدام View Transitions API الأصلي.

---

## السياق

التنقل الحالي: instant page swap = جفاء بصري. الـ Browser API الجديد (Chrome 111+, Safari TP) يَدعم انتقالات كاملة ناعمة. fallback: simple opacity fade.

---

## 🎨 Creativity Beacon

**Type:** 🌊 MOTION_BEACON
**The Surprise:** انتقال بين العوالم ليس crossfade. هو **انتقال بنمط الـ ease الخاص بالـ destination world**:
- → نار: snap حاد (180ms with --ease-naar)
- → ندى: انسياب ندى (480ms)
- → حَديد: split-flap reveal (220ms cinema cut)
كل عالم يَستقبل الزائر بإيقاعه الخاص.

**Reference Avoided:** generic fade-in, slide transitions
**Inspired-by:** #4 Maqamat (each maqam has its own time signature)
**Originality Self-Score:** 4/5

---

## التنفيذ

### ١. CSS — `platform/assets/css/_view-transition.css`

```css
/* ÊLAN v4 — δ5 — View Transitions */

@view-transition {
  navigation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-timing-function: var(--ease-elan);
  animation-duration: var(--t-3);
}

/* Per-world destination timing */
body[data-world="hibr"]::view-transition-new(root) {
  animation-duration: 320ms;
  animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
}

body[data-world="naar"]::view-transition-new(root) {
  animation-duration: 180ms;
  animation-timing-function: cubic-bezier(0.7, 0, 0.2, 1.2);
}

body[data-world="nada"]::view-transition-new(root) {
  animation-duration: 480ms;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

body[data-world="hadeed"]::view-transition-new(root) {
  animation-duration: 220ms;
  animation-timing-function: cubic-bezier(0.85, 0, 0.15, 1);
}

body[data-world="dhahab"]::view-transition-new(root) {
  animation-duration: 360ms;
  animation-timing-function: cubic-bezier(0.32, 0.72, 0.28, 1);
}

body[data-world="tayyar"]::view-transition-new(root) {
  animation-duration: 520ms;
  animation-timing-function: cubic-bezier(0.45, -0.4, 0.55, 1.4);
}

body[data-world="warsha"]::view-transition-new(root) {
  animation-duration: 280ms;
}

body[data-world="saloon"]::view-transition-new(root) {
  animation-duration: 380ms;
  animation-timing-function: cubic-bezier(0.4, 0.05, 0.2, 0.95);
}

/* Custom in-page transitions for the page sections */
.page.is-active {
  view-transition-name: page;
}

::view-transition-old(page) {
  animation: page-out var(--t-3) var(--ease-elan) forwards;
}

::view-transition-new(page) {
  animation: page-in var(--t-3) var(--ease-elan) backwards;
}

@keyframes page-out {
  to { opacity: 0; transform: translateY(-8px); }
}

@keyframes page-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root),
  ::view-transition-old(page),
  ::view-transition-new(page) {
    animation: none !important;
  }
}
```

### ٢. JS — يستخدم الـ API الموجود فعلاً في core/world.js (تحديث)

```javascript
// في core/nav.js — wrap navigateTo with View Transition
export function to(pageId) {
  const apply = () => {
    // existing nav logic
    document.querySelectorAll('.page.is-active').forEach(p => p.classList.remove('is-active'));
    const target = document.getElementById(pageId);
    if (target) target.classList.add('is-active');
    document.dispatchEvent(new CustomEvent('upg:nav:change', { detail: { pageId } }));
  };

  if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
}
```

---

## Acceptance Criteria

- [ ] `_view-transition.css` موجود مع 8 per-world overrides
- [ ] `core/nav.js` يَستخدم `document.startViewTransition` لو متاح
- [ ] respects prefers-reduced-motion
- [ ] لا fade generic — كل عالم له ease مختلف
- [ ] grep: `grep -c '@view-transition' platform/assets/css/_view-transition.css` ≥ 1
- [ ] grep: `grep -c '::view-transition-new' platform/assets/css/_view-transition.css` ≥ 9
- [ ] commit: `δ5: View Transitions — verified: world_specific_easing=8, page_transition=on, reduced_motion=respected`
- [ ] Beacon recorded

— نهاية δ5 —
