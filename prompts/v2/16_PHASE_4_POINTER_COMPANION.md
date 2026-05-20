# 🖱️ WORKER 16 — Phase 4/6 — Pointer Companion
> **اقرأ أولاً:** `prompts/v2/16_WORKER_VITAL_UI.md`.
> **يبني فوق:** W12 P2 (Magnetic Cursor Aura) + Phase 1-3.
> **الفلسفة:** *المؤشر ليس سهماً. هو رفيق. لونه يلتقط شخصية الصفحة، أثره يلمح حضوراً ميكروسكوبياً، ثقالته تحترم intent المستخدم.*

---

## 🛡️ Preservation Contract (Phase 4)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` tokens | **APPEND** 4 tokens (`--pointer-*`) | تعديل cursor aura tokens من W12 |
| `style.css` rules | **APPEND** كتلة "VITAL UI Phase 4 — Pointer Companion" | تعديل aura rules من W12 P2 |
| `app.js` | **APPEND** IIFE `Upg.life.pointer` (extends Upg.life) | تعديل magnetic cursor IIFE من W12 P2 |
| `index.html` | لا تُلمَس | أي تعديل |

---

## 🎯 الهدف

1. **Cursor trail** — 3 layers من الأثر، كل واحد بـ delay ميكروسكوبي ولون يستهلك `--color-tint`.
2. **Personality awareness** — `data-page-personality` المعرَّف من W15 يحدد لون الـ trail تلقائياً.
3. **Focus-ring elevation** — أي `:focus-visible` يكتسب halo ناعم يطابق الـ pointer trail.
4. **Pointer rest detection** — لو المؤشر سكن > 1.5s، الـ trail يخبو.
5. **Touch device skip** — كلياً disabled على touch (يتفعّل فقط لـ pointer:fine).
6. **`Upg.life.pointer.enable()/disable()`** — toggle عبر command palette لاحقاً.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 4 PRE-FLIGHT
├─ Phase: 4/6 — Pointer Companion
├─ Estimated lines: ~400 (CSS ~280 + JS ~120)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~280)
│   └─ platform/assets/app.js      (APPEND ~120)
└─ pointer:fine media query gate.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Pointer Tokens

```css
:root {
  --pointer-trail-size: 18px;
  --pointer-trail-color: var(--color-tint, var(--color-brand));
  --pointer-trail-opacity: 0.4;
  --pointer-trail-decay: 1.5s;
}
```

### Step 2 — Pointer Trail Element

```css
/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Pointer Companion (Worker 16 / Phase 4)
   Active only on pointer:fine devices.
   ════════════════════════════════════════════════════════════════ */
@media (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .pointer-trail {
    position: fixed;
    pointer-events: none;
    width: var(--pointer-trail-size);
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      var(--pointer-trail-color) 0%,
      transparent 70%
    );
    opacity: var(--pointer-trail-opacity);
    z-index: 9998;
    transform: translate3d(-50%, -50%, 0);
    transition: transform 80ms linear, opacity 220ms ease;
    mix-blend-mode: screen;
    filter: blur(2px);
  }

  .pointer-trail--layer-2 {
    width: calc(var(--pointer-trail-size) * 1.6);
    opacity: calc(var(--pointer-trail-opacity) * 0.55);
    transition: transform 140ms linear, opacity 280ms ease;
    filter: blur(6px);
  }

  .pointer-trail--layer-3 {
    width: calc(var(--pointer-trail-size) * 2.2);
    opacity: calc(var(--pointer-trail-opacity) * 0.32);
    transition: transform 200ms linear, opacity 360ms ease;
    filter: blur(12px);
  }

  .pointer-trail--rest {
    opacity: 0 !important;
  }
}
```

### Step 3 — Focus-Ring Elevation

```css
/* Elevated focus aura — pairs with pointer trail color. */
*:focus-visible {
  outline: 2px solid var(--color-tint, var(--color-focus-ring, currentColor));
  outline-offset: 3px;
  box-shadow: 0 0 0 6px color-mix(in oklch, var(--color-tint, var(--color-brand)) 18%, transparent);
}

/* End VITAL UI v1 / Worker 16 / Phase 4 ─────────────────────────────────── */
```

### Step 4 — `Upg.life.pointer` IIFE

```javascript
/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Pointer Companion (Worker 16 / Phase 4)
   ════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  // Bail on touch devices and reduced-motion users.
  const mq = window.matchMedia('(pointer: fine)');
  const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mq.matches || rm.matches) {
    if (window.Upg) {
      window.Upg.life = window.Upg.life || {};
      window.Upg.life.pointer = { enable: () => false, disable: () => true, enabled: () => false };
    }
    return;
  }

  let enabled = true;
  let restTimer = 0;
  const trails = [];

  // Build 3 trail layers.
  const buildTrails = () => {
    for (let i = 1; i <= 3; i++) {
      const t = document.createElement('div');
      t.className = 'pointer-trail' + (i > 1 ? ' pointer-trail--layer-' + i : '');
      t.setAttribute('aria-hidden', 'true');
      document.body.appendChild(t);
      trails.push(t);
    }
  };
  buildTrails();

  const move = (e) => {
    if (!enabled) return;
    trails.forEach((t) => {
      t.classList.remove('pointer-trail--rest');
      t.style.transform = 'translate3d(' + e.clientX + 'px,' + e.clientY + 'px,0) translate(-50%,-50%)';
    });
    if (restTimer) clearTimeout(restTimer);
    restTimer = setTimeout(() => {
      trails.forEach((t) => t.classList.add('pointer-trail--rest'));
    }, 1500);
  };

  document.addEventListener('pointermove', move, { passive: true });

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.life = window.Upg.life || {};
  window.Upg.life.pointer = {
    enable: () => { enabled = true; trails.forEach((t) => t.style.display = ''); return true; },
    disable: () => { enabled = false; trails.forEach((t) => t.style.display = 'none'); return true; },
    enabled: () => enabled
  };
})(window, document);
```

---

## 🧪 Sanity Probe

```bash
grep -c '\-\-pointer-' platform/assets/style.css           # → ≥4
grep -c '\.pointer-trail' platform/assets/style.css        # → ≥3
grep -c 'Upg.life.pointer' platform/assets/app.js          # → ≥1
# Touch device test (pointer: coarse) → trails not built.
```

---

## ✅ معايير القبول (Phase 4)

- [ ] 3 layers من الـ trail تتبع المؤشر بـ delay ميكروسكوبي.
- [ ] لون الـ trail يستهلك `--color-tint` للصفحة الحالية.
- [ ] Focus-ring يحصل على halo ناعم.
- [ ] Touch device → trails غير مفعّلة (pointer: coarse).
- [ ] reduced-motion → كل ما سبق disabled.
- [ ] `Upg.life.pointer.enable()/disable()` يعمل.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css platform/assets/app.js
git commit -m "phase 4 (vital): pointer companion — trail × 3 layers + focus elevation + Upg.life.pointer"
```

— نهاية Phase 4. 🖱️ **Pointer check:** الرفيق حاضر بدون إزعاج؟ نعم → Phase 5.
