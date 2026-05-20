# 🌫️ WORKER 16 — Phase 1/6 — Living Surfaces
> **اقرأ أولاً:** `prompts/v2/16_WORKER_VITAL_UI.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Cathedral v16 ATELIER + RESONANCE v2 / Worker 15 (مدموج).
> **الفلسفة:** *السطح الذي لا يتنفّس ميت. النَفَس الأول يأتي من gradient ambient + breathing layer + mesh organic — كلها CPU-cheap, opt-in, reduced-motion-aware.*

---

## 🛡️ Preservation Contract (Phase 1)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` `:root` tokens | **APPEND** 8 tokens جديدة (`--life-breath-duration`, `--life-mesh-opacity`, `--life-ambient-from/to`, ...) | تعديل أي token موجود |
| `style.css` rules | **APPEND** كتلة "VITAL UI Phase 1 — Living Surfaces" في النهاية بعد `End RESONANCE v2 / Worker 15 / Phase 6` | تعديل أي keyframe من W12-W15 |
| `style.css` reduced-motion | **APPEND** `@media (prefers-reduced-motion: reduce)` block جديد لكل keyframe جديد | حذف أو تعديل guards موجودة |
| `index.html` | **AUGMENT** فقط — إضافة `data-life="ambient\|mesh\|breathing"` على ≤12 عنصر sample | حذف عناصر، تغيير IDs، تعديل النصوص |
| `app.js` | **APPEND** IIFE جديدة لـ `Upg.life` (≤120 سطر) | أي تعديل في IIFEs قائمة |

**Sacred preserved:**
- جميع `--motion-*` tokens من W12 P6.
- جميع keyframes من ATELIER v16 / Worker 14.
- جميع `--type-voice-*` و per-page personalities من W15.
- جميع `--motion-*` choreo signatures من Worker 14.

---

## 🎯 الهدف

Phase 1 يضع **طبقة الحياة الأولى** — السطوح تتنفّس. لا تأثيرات تفاعلية، لا أصوات، لا transitions. فقط **ambient حضور صامت**.

1. تعريف 8 tokens (`--life-*`) للتحكم المركزي بمدة النَفَس، شدة الـ mesh، ألوان الـ ambient.
2. كتابة 3 keyframes صامتة (`life-breath`, `life-drift`, `life-mesh-shift`) — كلها ≤ CPU-cheap (transform + opacity).
3. كتابة 4 utility classes: `.life-ambient`, `.life-mesh`, `.life-breathing`, `.life-surface`.
4. كتابة 5 data-attribute selectors: `[data-life="ambient|mesh|breathing|surface|none"]`.
5. كتابة `Upg.life` API (start/stop/list/registerPersonality).
6. AUGMENT 8-12 عنصراً sample في index.html بـ `data-life` للاختبار.
7. كتابة `prefers-reduced-motion` guard شامل يطفئ كل الـ 3 keyframes.

> Phase 1 = طبقة ambient. Phase 2-6 = تفاعلات + omegas.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 1 PRE-FLIGHT (Worker 16 / VITAL UI)
├─ Phase: 1/6 — Living Surfaces
├─ Estimated lines: ~450 (CSS ~360 + JS ~90 + HTML ~12 augments)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~360 lines)
│   ├─ platform/assets/app.js      (APPEND ~90 lines IIFE)
│   └─ platform/index.html         (AUGMENT data-life on 8-12 elements)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '<section class="page"'                            → 14
│   ├─ grep -c 'qcalc'                                             → 391
│   ├─ grep -oE 'window\.Upg\.[a-z0-9]+' | sort -u | wc -l         → 20
│   ├─ grep -c "Cairo" platform/assets/style.css                   → ≥3
│   ├─ grep -c 'data-page-personality' platform/index.html         → 15
│   └─ grep -c '\-\-type-voice-' platform/assets/style.css         → ≥18
├─ Branch: NEW worker-16-vital-ui (from latest main, post W15 PR #57)
└─ No new fonts, no audio assets.
```

---

## 🧱 خطوات التنفيذ (بالترتيب)

### Step 1 — Living Surface Tokens (8 tokens)

في `style.css`، **APPEND** بعد `End RESONANCE v2 / Worker 15 / Phase 6`:

```css
/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Living Surfaces Tokens (Worker 16 / Phase 1)
   8 tokens to control the breath of the platform.
   Phase 6 will add per-page aura overrides on top of these.
   ════════════════════════════════════════════════════════════════ */
:root {
  /* Breath rhythm — slow, organic, never frantic */
  --life-breath-duration: 6.5s;          /* a single inhale-exhale cycle */
  --life-breath-easing: cubic-bezier(0.45, 0.05, 0.55, 0.95); /* sinusoidal */

  /* Mesh — barely-visible organic motion */
  --life-mesh-duration: 22s;             /* very slow drift */
  --life-mesh-opacity: 0.06;             /* ≤6% — must whisper, not shout */

  /* Ambient gradient endpoints (color-mix overridable per personality) */
  --life-ambient-from: color-mix(in oklch, var(--color-tint, var(--color-brand)) 8%, transparent);
  --life-ambient-to:   color-mix(in oklch, var(--color-tint-edge, var(--color-brand)) 4%, transparent);

  /* Ambient radius — controls the soft halo size */
  --life-ambient-radius: 65%;

  /* Drift amplitude — how far ambient shifts (px) */
  --life-drift-distance: 18px;
}

/* Theme-aware density — light theme breathes a bit fainter */
[data-theme="light"] {
  --life-mesh-opacity: 0.04;
  --life-ambient-from: color-mix(in oklch, var(--color-tint, var(--color-brand)) 5%, transparent);
  --life-ambient-to:   color-mix(in oklch, var(--color-tint-edge, var(--color-brand)) 2.5%, transparent);
}
```

### Step 2 — Keyframes (3 — all CPU-cheap)

**APPEND** بعد tokens:

```css
/* ════════════════════════════════════════════════════════════════
   Keyframes — only transform + opacity (GPU-friendly).
   Each is silenced under reduced-motion at end of this phase block.
   ════════════════════════════════════════════════════════════════ */

@keyframes life-breath {
  0%, 100% {
    opacity: 0.85;
    transform: scale(1) translateZ(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.012) translateZ(0);
  }
}

@keyframes life-drift {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }
  33% {
    transform: translate3d(var(--life-drift-distance), calc(var(--life-drift-distance) * -0.6), 0);
  }
  66% {
    transform: translate3d(calc(var(--life-drift-distance) * -0.5), calc(var(--life-drift-distance) * 0.4), 0);
  }
}

@keyframes life-mesh-shift {
  0%, 100% {
    background-position: 0% 0%, 100% 100%, 50% 50%;
  }
  50% {
    background-position: 100% 50%, 0% 50%, 50% 0%;
  }
}
```

### Step 3 — Utility Classes (4)

**APPEND** بعد keyframes:

```css
/* ════════════════════════════════════════════════════════════════
   Utility Classes — opt-in only. Apply on parent element.
   ════════════════════════════════════════════════════════════════ */

/* Ambient gradient halo — soft glow that drifts behind content. */
.life-ambient {
  position: relative;
  isolation: isolate;
}
.life-ambient::before {
  content: "";
  position: absolute;
  inset: -10%;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(
      var(--life-ambient-radius) 80% at 30% 30%,
      var(--life-ambient-from) 0%,
      transparent 70%
    ),
    radial-gradient(
      var(--life-ambient-radius) 70% at 75% 70%,
      var(--life-ambient-to) 0%,
      transparent 75%
    );
  animation: life-drift var(--life-mesh-duration) var(--life-breath-easing) infinite;
  will-change: transform;
}

/* Mesh — subtle organic conic-gradient that whispers behind sections. */
.life-mesh {
  position: relative;
  isolation: isolate;
}
.life-mesh::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--life-mesh-opacity);
  background:
    conic-gradient(from 0deg at 30% 30%,
      var(--color-tint, var(--color-brand)),
      transparent 30%,
      var(--color-tint-edge, var(--color-brand)) 60%,
      transparent 90%
    ),
    radial-gradient(circle at 80% 20%, var(--color-tint, var(--color-brand)) 0%, transparent 35%),
    radial-gradient(circle at 20% 80%, var(--color-tint-edge, var(--color-brand)) 0%, transparent 35%);
  background-size: 200% 200%, 60% 60%, 60% 60%;
  background-blend-mode: screen;
  animation: life-mesh-shift calc(var(--life-mesh-duration) * 1.4) ease-in-out infinite;
  filter: blur(28px) saturate(1.05);
  will-change: background-position;
}

/* Breathing — slow scale + opacity pulse on key element (logo, hero CTA). */
.life-breathing {
  animation: life-breath var(--life-breath-duration) var(--life-breath-easing) infinite;
  transform-origin: center;
  will-change: transform, opacity;
}

/* Surface — combined ambient + breathing for hero panels. */
.life-surface {
  position: relative;
  isolation: isolate;
}
.life-surface::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(
      ellipse 80% 60% at 50% 0%,
      var(--life-ambient-from) 0%,
      transparent 70%
    );
  animation: life-breath calc(var(--life-breath-duration) * 1.5) var(--life-breath-easing) infinite;
  will-change: opacity;
}
```

### Step 4 — Data-Attribute Selectors (5 — for AUGMENT in HTML)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Data-attribute alternatives — same behavior, different syntax.
   Useful for AUGMENT phase without touching class lists.
   ════════════════════════════════════════════════════════════════ */
[data-life="ambient"]    { /* mirrors .life-ambient */
  position: relative;
  isolation: isolate;
}
[data-life="ambient"]::before {
  content: "";
  position: absolute;
  inset: -10%;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(var(--life-ambient-radius) 80% at 30% 30%, var(--life-ambient-from) 0%, transparent 70%),
    radial-gradient(var(--life-ambient-radius) 70% at 75% 70%, var(--life-ambient-to) 0%, transparent 75%);
  animation: life-drift var(--life-mesh-duration) var(--life-breath-easing) infinite;
  will-change: transform;
}

[data-life="mesh"]       { position: relative; isolation: isolate; }
[data-life="mesh"]::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--life-mesh-opacity);
  background:
    conic-gradient(from 0deg at 30% 30%,
      var(--color-tint, var(--color-brand)), transparent 30%,
      var(--color-tint-edge, var(--color-brand)) 60%, transparent 90%);
  background-size: 200% 200%;
  filter: blur(24px);
  animation: life-mesh-shift calc(var(--life-mesh-duration) * 1.4) ease-in-out infinite;
}

[data-life="breathing"]  {
  animation: life-breath var(--life-breath-duration) var(--life-breath-easing) infinite;
  transform-origin: center;
  will-change: transform, opacity;
}

[data-life="surface"]    {
  position: relative;
  isolation: isolate;
}
[data-life="surface"]::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, var(--life-ambient-from) 0%, transparent 70%);
  animation: life-breath calc(var(--life-breath-duration) * 1.5) var(--life-breath-easing) infinite;
}

[data-life="none"] {
  /* Explicit opt-out — overrides inherited or auto-applied life. */
  animation: none !important;
}
[data-life="none"]::before,
[data-life="none"]::after {
  display: none !important;
}
```

### Step 5 — Reduced-Motion Guard (mandatory)

**APPEND** (one block, covers all 3 keyframes):

```css
/* ════════════════════════════════════════════════════════════════
   Reduced-Motion Guard (Worker 16 / Phase 1)
   Silences ALL Phase 1 animations for accessibility.
   ════════════════════════════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .life-ambient::before,
  .life-mesh::after,
  .life-breathing,
  .life-surface::before,
  [data-life="ambient"]::before,
  [data-life="mesh"]::after,
  [data-life="breathing"],
  [data-life="surface"]::before {
    animation: none !important;
  }
  /* Keep the static gradient/halo as a still backdrop — they don't need motion. */
}
```

### Step 6 — Discipline Comment (دستور النَفَس)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   VITAL UI Discipline — قواعد ذهبية لـ Phase 1:
   1. لا تطبّق .life-* أو data-life على أكثر من 3 طبقات متداخلة.
   2. .life-mesh تظل ≤ 6% opacity — لو زادت = ضوضاء.
   3. .life-breathing على عنصر واحد per viewport (hero/CTA فقط).
   4. لا تخلط .life-ambient مع .life-mesh على نفس العنصر —
      استعمل .life-surface (مدمجة بميزانية واحدة).
   5. Phase 6 سيُحدّث --life-ambient-from/to لكل personality.
   6. أي keyframe جديد لاحقاً يجب أن يُغطَّى بـ reduced-motion.
   ════════════════════════════════════════════════════════════════ */

/* End VITAL UI v1 / Worker 16 / Phase 1 ─────────────────────────────────────── */
```

### Step 7 — `Upg.life` IIFE في app.js

**APPEND** في `app.js` (في النهاية، بعد Upg.type2):

```javascript
/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Upg.life API (Worker 16 / Phase 1)
   Programmatic control of living surfaces.
   Additive: preserves all 20 existing Upg.* APIs.
   ════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  const VALID_MODES = ['ambient', 'mesh', 'breathing', 'surface', 'none'];
  const ATTR = 'data-life';

  // Apply a life mode to an element (or selector).
  const set = (target, mode) => {
    if (!VALID_MODES.includes(mode)) {
      console.warn('[Upg.life] Invalid mode:', mode, '— expected one of', VALID_MODES);
      return false;
    }
    const el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el || !el.setAttribute) return false;
    el.setAttribute(ATTR, mode);
    return true;
  };

  // Remove life mode (resets to inherited).
  const clear = (target) => {
    const el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el || !el.removeAttribute) return false;
    el.removeAttribute(ATTR);
    return true;
  };

  // Get current mode of an element.
  const get = (target) => {
    const el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el || !el.getAttribute) return null;
    return el.getAttribute(ATTR);
  };

  // List all valid modes (for command palette / debugging).
  const list = () => VALID_MODES.slice();

  // Audit — count active life elements on the page.
  const audit = () => {
    const counts = { total: 0 };
    VALID_MODES.forEach((m) => {
      const n = document.querySelectorAll('[' + ATTR + '="' + m + '"]').length;
      counts[m] = n;
      counts.total += n;
    });
    return counts;
  };

  // Auto-init: attach .life-* class equivalents are CSS-only; nothing to wire.
  // Expose API (additive — preserves existing APIs).
  window.Upg = window.Upg || {};
  window.Upg.life = { set, clear, get, list, audit };
})(window, document);
```

### Step 8 — AUGMENT في index.html (8-12 عنصر sample)

استهدف هذي العناصر — أضف `data-life="..."` فقط (لا تغيير في classes أو IDs):

| المكان | السلكتور التقريبي | المود | السبب |
|---|---|---|---|
| Gateway hero panel | `#page-gateway` (إذا كان مرئي للجميع) | `surface` | hero هي أول شي يُرى |
| Dashboard hero card | أول `.bento-card` في `#page-dashboard` | `ambient` | dashboard اول صفحة |
| Sidebar logo wordmark | `.gateway-wordmark` أو `.sidebar-brand` | `breathing` | يتنفّس ببطء |
| Page-h heading dashboard | `#page-dashboard .page-h` | `ambient` | hero of the page |
| Stat tiles container dashboard | أول `.cath-stat-row` أو grid | `mesh` | mesh في الخلفية |
| psych page hero | `#page-psych .page-h` | `ambient` | فلسفي هادئ |
| programming page hero | `#page-programming .page-h` | `mesh` | تقني نابض |
| accounting calc panel | أول `.qcalc` في `#page-accounting` | `surface` | حاسب — يستحق ambient |
| callcenter section header | `#page-callcenter .cc-section-header` (أول واحد) | `ambient` | sharp + alive |
| eq mood-tracker | `#page-eq` ايقونة mood (أول واحدة) | `breathing` | emotional pulse |

> 8-12 augments فقط — ليس كل الصفحات. Phase 6 سيُعمّم عبر Upg.aura.

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html              # → 14
grep -c 'qcalc' platform/index.html                               # → 391
grep -oE 'window\.Upg\.[a-z0-9]+' platform/assets/app.js | sort -u | wc -l  # → 21 (was 20, +life)
grep -c 'Cairo' platform/assets/style.css                         # → ≥3
grep -c 'data-page-personality' platform/index.html               # → 15

# New additions
grep -c '\-\-life-' platform/assets/style.css                     # → ≥8 (tokens)
grep -c '@keyframes life-' platform/assets/style.css              # → 3
grep -c '\.life-' platform/assets/style.css                       # → ≥4 (utility classes)
grep -c 'data-life=' platform/index.html                          # → 8-12 (augments)
grep -c 'Upg.life' platform/assets/app.js                         # → ≥1 (API)

# Reduced-motion guards
grep -c 'prefers-reduced-motion' platform/assets/style.css        # → ≥14 (was 13+, +1)

# Console: zero errors after page load
# Visual: ambient/mesh/breathing تظهر بهدوء بدون كسر بصري
# FPS: ≥55 idle (DevTools → Performance)
```

---

## ✅ معايير القبول (Phase 1)

- [ ] 8 life tokens (`--life-*`) معرَّفة في `:root` و `[data-theme="light"]`.
- [ ] 3 keyframes (`life-breath`, `life-drift`, `life-mesh-shift`) مكتوبة.
- [ ] 4 utility classes (`.life-ambient`, `.life-mesh`, `.life-breathing`, `.life-surface`) شغّالة.
- [ ] 5 data-attribute selectors (`[data-life="..."]`) شغّالة.
- [ ] `prefers-reduced-motion` guard يُسكت كل الـ 4 عناصر.
- [ ] `Upg.life` IIFE معرَّف ويصدّر `set/clear/get/list/audit`.
- [ ] 8-12 عنصر AUGMENT في index.html بـ `data-life`.
- [ ] لا regression بصري في الـ 14 صفحة.
- [ ] جميع `Upg.*` APIs السابقة (20) شغّالة بدون كسر.
- [ ] Console: 0 errors.
- [ ] FPS @ idle: ≥ 55.
- [ ] grep counts الـ 14/391 محفوظة. عدد Upg.* يصبح 21.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/style.css platform/assets/app.js platform/index.html
git commit -m "phase 1 (vital): living surfaces — 8 tokens, 3 keyframes, 4 utilities, Upg.life + 12 augments"
# push immediately
```

ثم state commit:

```bash
# update state/PROGRESS.json:
#   current.pack = "v2"
#   current.worker = "16"
#   current.phase = 1
#   current.status = "in-progress"
#   completed_phases.push({"worker":"16","phase":1,...})
#   next_action = "Continue Worker 16 Phase 2 — Tactile Microinteractions"
# add snapshot state/snapshots/worker-16-phase-1.json

git add state/PROGRESS.json state/snapshots/worker-16-phase-1.json
git commit -m "state: vital phase 1 committed and pushed"
# push immediately
```

— نهاية Phase 1.

🌬️ **Vital check:** هل المنصة تتنفّس بدون أن تشتت؟ نعم → انتقل لـ Phase 2 (Tactile Microinteractions).
