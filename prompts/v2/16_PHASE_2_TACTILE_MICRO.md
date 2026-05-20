# 👆 WORKER 16 — Phase 2/6 — Tactile Microinteractions
> **اقرأ أولاً:** `prompts/v2/16_WORKER_VITAL_UI.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phase 1 (Living Surfaces) من Worker 16.
> **الفلسفة:** *كل لمسة تستحق ردّاً ميكروسكوبياً صريحاً. Tactile = العقل يستوعب أن الكبسة وصلت قبل أن يفكّر فيها.*

---

## 🛡️ Preservation Contract (Phase 2)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` tokens | **APPEND** 6 tokens (`--tactile-*`) | تعديل `--life-*` من Phase 1 |
| `style.css` rules | **APPEND** كتلة "VITAL UI Phase 2 — Tactile" بعد Phase 1 block | تعديل أي hover/active rules من W12-W15 |
| `app.js` | **EXTEND** `Upg.life` بـ `pulse(el, kind)` + IIFE صغير لـ ripple delegation | إعادة كتابة `Upg.life` |
| `index.html` | لا تُلمَس (data-tactile يطبَّق عبر CSS class hooks موجودة) | أي تعديل |

---

## 🎯 الهدف

1. **Button signatures (4 صنف):** `.tactile-press`, `.tactile-magnet`, `.tactile-glow`, `.tactile-recede`.
2. **Ripple effect** صامت بـ JS (delegation على `data-ripple` attribute) — لا library.
3. **Card hover-lift refinement:** translate-Y + box-shadow inset + scale ميكروسكوبي.
4. **Magnetic micro-pull** على الأزرار الكبيرة (`.btn--lg[data-magnet]` موجود من W12).
5. **Focus signature** — focus-ring مرتفع (سيكتمل في Phase 4).
6. **`Upg.life.pulse(el, kind)`** — يستدعي إيقاع نبض اختياري على عنصر.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 2 PRE-FLIGHT
├─ Phase: 2/6 — Tactile Microinteractions
├─ Estimated lines: ~440 (CSS ~340 + JS ~100)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~340 lines)
│   └─ platform/assets/app.js      (APPEND ~100 lines IIFE — extend Upg.life)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '@keyframes life-'                                  → 3 (Phase 1)
│   ├─ grep -oE 'window\.Upg\.[a-z0-9]+' | sort -u | wc -l         → 21
│   └─ Phase 1 sanity passed
└─ No HTML changes (delegation via data-* on existing elements).
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Tactile Tokens (6)

```css
/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Tactile Tokens (Worker 16 / Phase 2)
   ════════════════════════════════════════════════════════════════ */
:root {
  --tactile-press-scale: 0.985;          /* press feedback compression */
  --tactile-press-duration: 120ms;       /* fast press response */
  --tactile-press-easing: cubic-bezier(0.32, 0, 0.16, 1);

  --tactile-lift-y: -2px;                /* hover lift on cards */
  --tactile-lift-shadow:
    0 8px 24px -10px color-mix(in oklch, var(--color-tint, var(--color-brand)) 25%, transparent);

  --tactile-magnet-strength: 0.18;       /* magnet pull radius factor */
}
```

### Step 2 — Tactile Keyframes

```css
@keyframes tactile-ripple {
  0%   { transform: scale(0);   opacity: 0.55; }
  100% { transform: scale(2.2); opacity: 0;    }
}

@keyframes tactile-pulse-soft {
  0%, 100% { transform: scale(1);    box-shadow: 0 0 0 0 transparent; }
  50%      { transform: scale(1.02); box-shadow: 0 0 0 6px color-mix(in oklch, var(--color-tint, var(--color-brand)) 18%, transparent); }
}
```

### Step 3 — Press / Magnet / Glow / Recede Classes

```css
/* Press — compress feedback on click */
.tactile-press {
  transition: transform var(--tactile-press-duration) var(--tactile-press-easing);
  will-change: transform;
}
.tactile-press:active {
  transform: scale(var(--tactile-press-scale));
}

/* Magnet — micro-pull on hover (used on big CTAs) */
.tactile-magnet {
  transition: transform 220ms var(--tactile-press-easing);
}
.tactile-magnet:hover {
  transform: translateY(-1px) scale(1.005);
}

/* Glow — soft halo on hover (≤1.5% screen — adheres to design) */
.tactile-glow {
  position: relative;
  isolation: isolate;
}
.tactile-glow::after {
  content: "";
  position: absolute;
  inset: -8%;
  border-radius: inherit;
  z-index: -1;
  opacity: 0;
  transition: opacity 240ms ease;
  background: radial-gradient(closest-side, var(--color-tint, var(--color-brand)) 0%, transparent 70%);
  filter: blur(14px);
  pointer-events: none;
}
.tactile-glow:hover::after,
.tactile-glow:focus-visible::after {
  opacity: 0.32;
}

/* Recede — opposite of lift; sinks slightly on click (haptic illusion) */
.tactile-recede:active {
  transform: translateY(1px);
}
```

### Step 4 — Card Hover-Lift Refinement

```css
/* Apply to existing cards via data-tactile or class augmentation. */
[data-tactile="card"],
.tactile-card {
  transition:
    transform 240ms var(--tactile-press-easing),
    box-shadow 280ms ease;
  will-change: transform;
}
[data-tactile="card"]:hover,
.tactile-card:hover {
  transform: translateY(var(--tactile-lift-y));
  box-shadow: var(--tactile-lift-shadow);
}
[data-tactile="card"]:active,
.tactile-card:active {
  transform: translateY(0) scale(var(--tactile-press-scale));
}
```

### Step 5 — Ripple via data-ripple (CSS-only ::after layer)

```css
/* Ripple effect — JS sets --ripple-x/--ripple-y CSS vars on click. */
[data-ripple] {
  position: relative;
  overflow: hidden;
}
[data-ripple]::after {
  content: "";
  position: absolute;
  width: 100%;
  aspect-ratio: 1;
  left: var(--ripple-x, 50%);
  top: var(--ripple-y, 50%);
  transform: translate(-50%, -50%) scale(0);
  border-radius: 50%;
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 28%, transparent);
  opacity: 0;
  pointer-events: none;
}
[data-ripple][data-ripple-fire="true"]::after {
  animation: tactile-ripple 520ms ease-out;
}
```

### Step 6 — Reduced-Motion Guard

```css
@media (prefers-reduced-motion: reduce) {
  .tactile-press,
  .tactile-magnet,
  .tactile-card,
  [data-tactile="card"],
  [data-ripple]::after {
    transition: none !important;
    animation: none !important;
  }
  .tactile-press:active,
  .tactile-magnet:hover,
  .tactile-card:hover,
  [data-tactile="card"]:hover {
    transform: none !important;
  }
}

/* End VITAL UI v1 / Worker 16 / Phase 2 ─────────────────────────────────── */
```

### Step 7 — `Upg.life.pulse` + Ripple Delegation IIFE

```javascript
/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Tactile Engine (Worker 16 / Phase 2)
   Extends Upg.life with .pulse() and adds ripple delegation.
   ════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  // Pulse — apply a brief tactile-pulse-soft keyframe on element.
  const pulse = (target, kind) => {
    const el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el) return false;
    const animation = (kind === 'soft' ? 'tactile-pulse-soft 600ms var(--tactile-press-easing)' : 'tactile-pulse-soft 480ms ease-out');
    el.style.animation = 'none';
    // force reflow
    void el.offsetWidth;
    el.style.animation = animation;
    setTimeout(() => { el.style.animation = ''; }, 700);
    return true;
  };

  // Ripple delegation — sets CSS vars based on click coords.
  const RIPPLE_ATTR = 'data-ripple';
  document.addEventListener('pointerdown', (e) => {
    const el = e.target.closest('[' + RIPPLE_ATTR + ']');
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--ripple-x', x + '%');
    el.style.setProperty('--ripple-y', y + '%');
    el.setAttribute('data-ripple-fire', 'true');
    setTimeout(() => el.removeAttribute('data-ripple-fire'), 600);
  }, { passive: true });

  // Magnet enhancement — strengthens existing W12 P2 magnet by translate3d.
  const magnetCleanup = new WeakMap();
  document.querySelectorAll('[data-magnet]').forEach((el) => {
    const handler = (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2));
      const dy = (e.clientY - (r.top + r.height / 2));
      el.style.transform = 'translate3d(' + (dx * 0.06) + 'px,' + (dy * 0.06) + 'px,0)';
    };
    const reset = () => { el.style.transform = ''; };
    el.addEventListener('pointermove', handler);
    el.addEventListener('pointerleave', reset);
    magnetCleanup.set(el, { handler, reset });
  });

  // Extend existing Upg.life (additive) — preserves Phase 1 surface.
  if (window.Upg && window.Upg.life) {
    window.Upg.life.pulse = pulse;
  } else {
    window.Upg = window.Upg || {};
    window.Upg.life = window.Upg.life || {};
    window.Upg.life.pulse = pulse;
  }
})(window, document);
```

---

## 🧪 Sanity Probe

```bash
grep -c '\-\-tactile-' platform/assets/style.css      # → ≥6
grep -c '\.tactile-' platform/assets/style.css        # → ≥4
grep -c 'data-ripple' platform/assets/style.css       # → ≥2
grep -c 'data-tactile' platform/assets/style.css      # → ≥1
grep -c 'Upg.life.pulse' platform/assets/app.js       # → ≥1
grep -c 'prefers-reduced-motion' platform/assets/style.css  # → ≥15
```

---

## ✅ معايير القبول (Phase 2)

- [ ] 6 tokens، 2 keyframes، 4 tactile classes، ripple selector، card-lift selectors شغّالة.
- [ ] `Upg.life.pulse(el, kind)` يعمل بدون كسر `Upg.life.set/clear/get/list/audit`.
- [ ] Ripple يطلق على أي `[data-ripple]` بدون JS errors.
- [ ] Magnet pointer movement smooth (≥55 FPS).
- [ ] reduced-motion يطفئ كل Phase 2 transitions.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css platform/assets/app.js
git commit -m "phase 2 (vital): tactile microinteractions — press/magnet/glow/recede + ripple + Upg.life.pulse"
```

— نهاية Phase 2. 👆 **Tactile check:** كل لمسة تردّ ميكروسكوبياً؟ نعم → Phase 3.
