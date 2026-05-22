# 🌈 WORKER 21 — Phase 4/5 — Gradient Recast
> **اقرأ أولاً:** `prompts/v3/21_WORKER_CHROMATIC_SOUL.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phase 1 (palette) + Phase 2 (Mihrab dark) + Phase 3 (page tints).
> **الفلسفة:** *Gradient ليس عشوائية. هو رحلة بين لونين عربيَين أصيلَين. كل صفحة لها "نَفَس" بصري — gradient من tint الأساسي إلى tint-edge.*

---

## 🛡️ Preservation Contract (Phase 4)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` rules | **REPLACE-IN-PLACE** قيم `--deep-gradient` (W11 P1) و `--life-ambient-from/to` (W16 P1) | تغيير tokens names |
| `style.css` rules | **APPEND** 15 personality-specific gradient tokens | تعديل قواعد قائمة |
| `style.css` rules | **APPEND** 4 cinematic gradient utilities (`chr-grad-page`, `chr-grad-hero`, ...) | تعديل قائمة |
| `index.html` | لا يُلمَس | أي تعديل |
| `app.js` | لا يُلمَس | أي تعديل |

**Sacred preserved:**
- جميع 15 `--tint-*` + `--tint-edge-*` + `--tint-soft-*` (Phase 3).
- جميع 12 palettes (Phase 1).
- جميع `--life-*` tokens من W16 (P1) — قيمها فقط تتحدث.
- 14 page sections + 391 qcalc + 26 Upg.* APIs.

---

## 🎯 الهدف

Phase 4 يُحوّل gradients من aurora-generic إلى Arabic-rooted:

1. **REPLACE-IN-PLACE** قيم `--deep-gradient` (W11) لتستخدم Mihrab + Lapis layers.
2. **REPLACE-IN-PLACE** قيم `--life-ambient-from/to` (W16) لتستخدم `--color-tint` و `--color-tint-edge`.
3. **APPEND** 15 personality-specific gradients (`--chr-grad-page-<personality>`).
4. **APPEND** 4 cinematic gradient utilities (`chr-grad-page`, `chr-grad-hero`, `chr-grad-card`, `chr-grad-divider`).
5. **APPEND** mesh-style organic gradients مع noise overlay (CPU-cheap).

---

## 📋 PRE-FLIGHT

```
📋 PHASE 4 PRE-FLIGHT (Worker 21 / CHROMATIC SOUL)
├─ Phase: 4/5 — Gradient Recast
├─ Estimated lines: ~480 (CSS REPLACE ~120 + APPEND ~360)
├─ Files to touch:
│   └─ platform/assets/style.css   (REPLACE deep-gradient + life-ambient + APPEND ~360)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '\-\-deep-gradient' platform/assets/style.css       → ≥1 (W11)
│   ├─ grep -c '\-\-life-ambient' platform/assets/style.css        → ≥2 (W16 P1)
│   ├─ grep -c '\-\-tint-edge-' platform/assets/style.css          → ≥15 (P3)
│   └─ grep -c '\-\-chr-grad-' platform/assets/style.css           → ≥6 (P1 baseline)
├─ Branch: continue worker-21-devotio
└─ No HTML/JS changes.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — REPLACE `--deep-gradient` (W11 P1)

ابحث في `style.css`:

```bash
grep -n '\-\-deep-gradient:' platform/assets/style.css
```

استبدل قيمته بـ:

```css
/* CHROMATIC SOUL v3 — REPLACE deep-gradient (was aurora teal/violet) */
:root {
  --deep-gradient:
    radial-gradient(1200px 520px at 12% -10%,
      var(--chr-lapis-700)   0%,
      transparent            55%),
    radial-gradient(900px 500px at 95% 110%,
      var(--chr-mihrab-700)  0%,
      transparent            50%),
    radial-gradient(700px 400px at 60% 50%,
      var(--chr-indigo-800)  0%,
      transparent            60%);
}

[data-theme="dark"] {
  --deep-gradient:
    radial-gradient(1200px 520px at 12% -10%,
      oklch(40% 0.16 252 / 0.20)  0%,
      transparent                55%),
    radial-gradient(900px 500px at 95% 110%,
      oklch(28% 0.072 280 / 0.25) 0%,
      transparent                50%),
    radial-gradient(700px 400px at 60% 50%,
      oklch(22% 0.065 270 / 0.18) 0%,
      transparent                60%);
}

[data-theme="light"] {
  --deep-gradient:
    radial-gradient(1200px 520px at 12% -10%,
      oklch(85% 0.08 252 / 0.10)  0%,
      transparent                55%),
    radial-gradient(900px 500px at 95% 110%,
      oklch(85% 0.05 80 / 0.06)   0%,
      transparent                50%);
}
```

### Step 2 — REPLACE `--life-ambient-from/to` (W16 P1)

ابحث:

```bash
grep -n '\-\-life-ambient-from\|\-\-life-ambient-to' platform/assets/style.css
```

REPLACE-IN-PLACE القيم:

```css
/* CHROMATIC SOUL v3 — REPLACE life-ambient (was color-mix from generic brand) */
:root {
  --life-ambient-from:
    color-mix(in oklch, var(--color-tint, var(--chr-lapis-500)) 12%, transparent);
  --life-ambient-to:
    color-mix(in oklch, var(--color-tint-edge, var(--chr-mihrab-700)) 8%, transparent);
}

[data-theme="light"] {
  --life-ambient-from:
    color-mix(in oklch, var(--color-tint, var(--chr-lapis-500)) 6%, transparent);
  --life-ambient-to:
    color-mix(in oklch, var(--color-tint-edge, var(--chr-mihrab-700)) 3%, transparent);
}
```

### Step 3 — APPEND Per-Personality Gradients

```css
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Per-Personality Gradients (Worker 21 / Phase 4)
   Each personality gets a hero gradient + an ambient gradient.
   These are referenced by Worker 22 (Ritual UI) for entry/threshold transitions.
   ════════════════════════════════════════════════════════════════════════ */

/* Hero gradients — vibrant, used in page-h backgrounds */
[data-page-personality="dashboard"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-saffron-400) 0%,
      var(--chr-saffron-700) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-saffron-500) 14%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="callcenter"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-damascus-400) 0%,
      var(--chr-damascus-800) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-damascus-500) 12%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="fieldsales"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-silt-400) 0%,
      var(--chr-silt-700) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-silt-500) 12%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="accountmgr"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-cedar-500) 0%,
      var(--chr-cedar-800) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-cedar-600) 12%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="social"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-coral-400) 0%,
      var(--chr-coral-700) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-coral-500) 14%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="lab"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-marble-400) 0%,
      var(--chr-marble-700) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-marble-500) 10%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="psych"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-lapis-400) 0%,
      var(--chr-lapis-800) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-lapis-500) 14%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="eq"] {
  --chr-grad-hero:
    linear-gradient(180deg,
      var(--chr-mihrab-500) 0%,
      var(--chr-mihrab-800) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 100% at 50% 0%,
      color-mix(in oklch, var(--chr-mihrab-600) 16%, transparent) 0%,
      transparent 65%);
}

[data-page-personality="negotiation"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-damascus-600) 0%,
      var(--chr-damascus-900) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-damascus-700) 12%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="customercare"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-pearl-300) 0%,
      var(--chr-pearl-600) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-pearl-500) 8%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="programming"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-indigo-500) 0%,
      var(--chr-indigo-900) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-indigo-600) 14%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="accounting"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-palm-400) 0%,
      var(--chr-palm-700) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-palm-500) 12%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="phonerepair"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-henna-500) 0%,
      var(--chr-henna-800) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-henna-600) 12%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="hrmastery"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-henna-400) 0%,
      var(--chr-henna-700) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-henna-500) 12%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="myprogress"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-lapis-300) 0%,
      var(--chr-lapis-600) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-lapis-400) 10%, transparent) 0%,
      transparent 60%);
}

[data-page-personality="curriculum"] {
  --chr-grad-hero:
    linear-gradient(135deg,
      var(--chr-saffron-500) 0%,
      var(--chr-saffron-800) 100%);
  --chr-grad-ambient:
    radial-gradient(ellipse 100% 80% at 50% 0%,
      color-mix(in oklch, var(--chr-saffron-600) 14%, transparent) 0%,
      transparent 60%);
}
```

### Step 4 — APPEND Cinematic Gradient Utilities

```css
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Cinematic Gradient Utilities (Worker 21 / Phase 4)
   ════════════════════════════════════════════════════════════════════════ */

/* Page-level ambient — applied to body or page section */
.chr-grad-page {
  background: var(--chr-grad-ambient, var(--deep-gradient));
}

/* Hero panel — applied to page-h or hero card */
.chr-grad-hero {
  background: var(--chr-grad-hero, linear-gradient(135deg, var(--color-tint), var(--color-tint-edge)));
  color: oklch(98% 0.012 80);  /* marble-50 — works on most hero gradients */
}

/* Card — soft tint, just hint of identity */
.chr-grad-card {
  background:
    linear-gradient(180deg,
      color-mix(in oklch, var(--color-tint-soft, transparent) 60%, var(--color-surface-1)) 0%,
      var(--color-surface-1) 100%);
  border: 1px solid color-mix(in oklch, var(--color-tint, var(--color-brand)) 18%, var(--color-border));
}

/* Divider — horizontal gradient line */
.chr-grad-divider {
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    color-mix(in oklch, var(--color-tint, var(--color-brand)) 50%, transparent) 50%,
    transparent 100%);
  border: none;
}

/* Mesh — organic, animated subtle (uses W16 keyframes) */
.chr-grad-mesh {
  position: relative;
  isolation: isolate;
}
.chr-grad-mesh::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(ellipse 50% 50% at 30% 30%,
      color-mix(in oklch, var(--color-tint, var(--chr-lapis-500)) 10%, transparent) 0%,
      transparent 70%),
    radial-gradient(ellipse 60% 60% at 75% 70%,
      color-mix(in oklch, var(--color-tint-edge, var(--chr-mihrab-700)) 10%, transparent) 0%,
      transparent 70%);
  filter: blur(24px);
}
```

### Step 5 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 21 / Phase 4 — Gradient Discipline:
   1. كل personality له --chr-grad-hero و --chr-grad-ambient.
   2. لا تستعمل hex في gradient stops — كل القيم chr-* references.
   3. radial-gradient hero يبدأ من 50% 0% (top-center) للحس الإسلامي.
   4. linear-gradient hero يبدأ من 135deg (top-left → bottom-right).
   5. ambient gradient ≤ 14% opacity — never overwhelming.
   6. Phase 5 يفحص contrast بعد gradients مفعّلة.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html               # → 14+
grep -c '\-\-tint-' platform/assets/style.css                     # → ≥45 (preserved)
grep -c '\-\-life-ambient' platform/assets/style.css              # → ≥2 (W16 names preserved, values updated)

# Per-personality gradients
grep -c '\-\-chr-grad-hero' platform/assets/style.css             # → ≥15
grep -c '\-\-chr-grad-ambient' platform/assets/style.css          # → ≥15

# Utilities
grep -c '\.chr-grad-page' platform/assets/style.css               # → ≥1
grep -c '\.chr-grad-hero' platform/assets/style.css               # → ≥1
grep -c '\.chr-grad-card' platform/assets/style.css               # → ≥1
grep -c '\.chr-grad-divider' platform/assets/style.css            # → ≥1

# Browser test:
# Apply .chr-grad-hero on page-h elements (manual test)
# Verify: each page hero shows distinct cultural gradient
# psych: deep blue lapis → mihrab
# social: vibrant coral → saffron
# accountmgr: cedar green → deep
# eq: mihrab violet vertical fade
```

---

## ✅ معايير القبول (Phase 4)

- [ ] `--deep-gradient` REPLACED بـ Mihrab + Lapis layers.
- [ ] `--life-ambient-from/to` REPLACED بـ tint-aware references.
- [ ] 15 `--chr-grad-hero` (واحد لكل personality).
- [ ] 15 `--chr-grad-ambient`.
- [ ] 5 utilities (`.chr-grad-page`, `.chr-grad-hero`, `.chr-grad-card`, `.chr-grad-divider`, `.chr-grad-mesh`).
- [ ] لا hex in gradients.
- [ ] لا regression بصري في صفحات قائمة (gradients غير مطبَّقة على الـ DOM بعد — Worker 22 يطبّقها).
- [ ] Console: 0 errors.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/style.css
git commit -m "phase 4 (devotio): gradient recast — replace deep-gradient + life-ambient with chr-* references, 15 per-personality hero/ambient gradients, 5 cinematic utilities"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-21-phase-4.json
git commit -m "state: devotio phase 4 (worker 21) committed and pushed"
# push immediately
```

— نهاية Phase 4.

🌈 **Devotion check:** هل ١٥ صفحة لها هوية gradient مميزة؟ لا aurora-derived؟ → Phase 5 (Theme Bridge).
