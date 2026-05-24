# δ6 — Reduced Motion Sanctuary
> **Pillar δ / Stage 6 of 6 — last in δ**
> الهدف: احترام `prefers-reduced-motion` بشكل صادق + manual override + audit.

---

## السياق

`@media (prefers-reduced-motion)` موجودة متفرّقة في الـ stages السابقة. δ6 يُوحّد الاستخدام و يُضيف:
- override يدوي (الزر في settings)
- audit script يفحص أن كل animation تحترم القاعدة
- semantic emphasis preserved (focus, error, attention) حتى في reduce mode

---

## 🎨 Creativity Beacon

**Type:** 🪞 META_BEACON
**The Surprise:** عند تفعيل reduce-motion، الـ AI لا يُلغي الإثارة بل يُحوّلها إلى **type emphasis**. مثلاً: بدل ink-drying gradient في Hibr، النص يظهر بـ font-weight أعلى لمدة 200ms ثم يعود. بدل dewdrop emergence، Cards تَستخدم 1.5px outline ember-tinted لمدة 300ms. الحركة تتحوّل إلى type/border emphasis. *المعنى محفوظ، الحركة مزالة.*
**Reference Avoided:** generic "disable all animations"
**Inspired-by:** #6 Müller-Brockmann (typography carries meaning)
**Originality Self-Score:** 4/5

---

## التنفيذ

### ١. CSS — `platform/assets/css/_motion-sanctuary.css`

```css
/* ÊLAN v4 — δ6 — Reduced motion sanctuary */

@media (prefers-reduced-motion: reduce) {
  /* Universal cap on durations */
  :root {
    --t-1: 0ms; --t-2: 0ms; --t-3: 0ms;
    --t-4: 0ms; --t-5: 0ms; --t-slow: 0ms;
  }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Preserved semantic emphasis (no motion, but visual change) */
  .btn-success-action.is-drying {
    background-image: none !important;
    color: var(--ink) !important;
    font-weight: 800 !important;
    outline: 2px solid var(--ember);
    outline-offset: 2px;
  }

  .nada-emerge {
    animation: none !important;
    opacity: 1 !important;
    outline: 1px solid color-mix(in oklch, var(--ember) 35%, transparent);
    outline-offset: 0;
  }

  .elan-pulse::after {
    animation: none !important;
    opacity: 0.5;
  }

  .spark-host:hover::after {
    transition: none !important;
    opacity: 0.6;
  }
}

/* Manual override: data-motion="reduced" */
body[data-motion="reduced"] {
  --t-1: 0ms; --t-2: 0ms; --t-3: 0ms;
  --t-4: 0ms; --t-5: 0ms; --t-slow: 0ms;
}

body[data-motion="reduced"] *,
body[data-motion="reduced"] *::before,
body[data-motion="reduced"] *::after {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}

/* Manual override: data-motion="enhanced" — ignore system pref */
@media (prefers-reduced-motion: reduce) {
  body[data-motion="enhanced"] {
    --t-1: 120ms; --t-2: 180ms; --t-3: 260ms;
    --t-4: 380ms; --t-5: 520ms; --t-slow: 800ms;
  }
}
```

### ٢. JS — `platform/assets/js/motion/reduced.js`

```javascript
/* ÊLAN v4 — δ6 — Motion preference controller */

const STORAGE_KEY = 'upg_motion_pref';

function detect() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'reduced' || stored === 'enhanced') return stored;
  return matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'normal';
}

export function set(pref) {
  if (!['normal', 'reduced', 'enhanced'].includes(pref)) return;
  if (pref === 'normal') {
    localStorage.removeItem(STORAGE_KEY);
    document.body.removeAttribute('data-motion');
  } else {
    localStorage.setItem(STORAGE_KEY, pref);
    document.body.dataset.motion = pref;
  }
  document.dispatchEvent(new CustomEvent('upg:motion:change', { detail: { pref } }));
}

export function current() {
  return document.body.dataset.motion || (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'normal');
}

function init() {
  const detected = detect();
  if (detected !== 'normal') {
    document.body.dataset.motion = detected;
  }
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      if (e.matches) document.body.dataset.motion = 'reduced';
      else document.body.removeAttribute('data-motion');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.Upg = window.Upg || {};
window.Upg.motion = Object.freeze({ set, current });
```

### ٣. Audit script — `scripts/elan-motion-audit.sh`

```bash
#!/usr/bin/env bash
# Counts animations not gated by reduced-motion check
ROOT="$(git rev-parse --show-toplevel)"
echo "=== Animations missing reduced-motion gate ==="
grep -rEn 'animation:|animation-name:|animation-duration:' "$ROOT/platform/assets/css/" \
  | grep -v 'reduced' | head -50
echo ""
echo "=== Total animations ==="
grep -rE 'animation:|@keyframes' "$ROOT/platform/assets/css/" | wc -l
echo "=== Animations protected ==="
grep -rB2 -A1 'prefers-reduced-motion' "$ROOT/platform/assets/css/" | grep -c '@media'
```

---

## Acceptance Criteria

- [ ] `_motion-sanctuary.css` موجود
- [ ] `motion/reduced.js` موجود ويُصدِّر set/current
- [ ] `Upg.motion.set('reduced')` يَعمل
- [ ] `data-motion="reduced"` يُلغي كل animation
- [ ] `data-motion="enhanced"` يَتجاوز system preference
- [ ] Beacon-related semantic emphasis محفوظ في reduced mode (outlines, font-weight)
- [ ] `scripts/elan-motion-audit.sh` يَعمل ويُعطي تقريراً
- [ ] لا حركة تُكسِر القاعدة (audit يَعطي 0 violations)
- [ ] commit: `δ6: Motion Sanctuary — verified: gate_universal=on, manual_override=on, audit_script=on`
- [ ] Beacon recorded
- [ ] **Pillar δ complete** → افتح PR من `elan-δ-kinetic-shell`

— نهاية δ6 — نهاية Pillar δ —
