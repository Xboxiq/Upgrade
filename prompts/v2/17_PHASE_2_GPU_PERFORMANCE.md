# ⚡ WORKER 17 — Phase 2/6 — GPU Performance Refactor
> **اقرأ أولاً:** `prompts/v2/17_WORKER_CREATIVE_REVOLUTION.md` — قسم **Preservation Guard**.
> **يبني فوق:** Worker 17 Phase 1 (Token Unification).
> **الفلسفة:** *الفخامة ليست في الكثافة البصرية. الفخامة في الانسيابية. كل blur ثقيل سرقة من 60fps.*

---

## 🛡️ Preservation Contract (Phase 2)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` | **REPLACE-IN-PLACE** لـ blur values + **DELETE** continuous keyframes على mobile + **APPEND** tonal layer utilities | تعديل HTML structure أو IDs أو data-attributes |
| `index.html` | لا يُلمَس | أي تعديل |
| `app.js` | **MAY EXTEND** `Upg.material.density()` لقبول `'mobile-lite'` mode (اختياري) | تعديل أي IIFE موجود |

**Sacred preserved:**
- 47+ reduced-motion guards من W14-W16 (تُحترَم وتُمدَّد).
- جميع component classes تشتغل بنفس visual contract.
- `Upg.life.set/clear/get/list/audit/pulse` (W16 P1+P2) — السلوك يبقى.
- `Upg.choreo.reveal` و `Upg.transition.run` — السلوك يبقى.

---

## 🎯 الهدف

Phase 2 يُعالج **سبب البطء على الموبايل**:

1. **Blur ladder من 16/24/32/40px → 8/16/20px** (3-tier بدل 4-tier، blur الأقصى ينخفض من 40 إلى 20).
2. **Drift animations الدائمة** (`qlAmbientDrift`, `qlAuroraDrift`, `life-mesh-shift`, `life-drift`) → **معطَّلة على mobile** (`@media (max-width: 768px)`) و **معطَّلة دائماً مع reduced-motion**.
3. **Tonal Layering** (طبقات شفافة ناعمة بـ `linear-gradient`) كبديل بصري عن الـ blur الثقيل في معظم الأماكن.
4. **`will-change` audit** — حذف الـ over-use، إبقاء فقط على hot interactions.
5. **`contain: layout paint style`** على heavy components لعزل reflow.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 2 PRE-FLIGHT
├─ Phase: 2/6 — GPU Performance Refactor
├─ Estimated lines changed: ~320 (replacements + APPEND ~80 utilities)
├─ Files to touch:
│   ├─ platform/assets/style.css  (REPLACE blur values + delete drift on mobile + APPEND tonal utilities)
│   └─ platform/assets/app.js     (optional: extend Upg.material.density)
├─ Sacred verify (BEFORE):
│   ├─ grep -c 'backdrop-filter' platform/assets/style.css   → ~30 (we expect to find heavy use)
│   ├─ grep -c 'qlAmbientDrift\|qlAuroraDrift\|life-mesh-shift\|life-drift' platform/assets/style.css  → ≥6 keyframe refs
│   ├─ grep -c 'prefers-reduced-motion' platform/assets/style.css  → ≥47
│   └─ grep -cE '^:root\b' platform/assets/style.css         → 1 (Phase 1 done)
└─ Branch: continue worker-17-creative-revolution
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Audit الـ blur الحالي

```bash
grep -nE 'backdrop-filter:[^;]*blur\([0-9]+' platform/assets/style.css
```

**النتائج المتوقعة (~14 instance):**
- `.glass-thin` blur(16px) — W14 P1
- `.glass-regular` blur(24px) — W14 P1
- `.glass-thick` blur(32px) — W14 P1 ⚠️ heavy
- `.glass-chrome` blur(40px) — W14 P1 ⚠️⚠️ extra heavy
- `.qmodal::before` blur(28px)
- `.cmdk-shell` blur(24px)
- `.topbar` blur(20-32px) varying
- `.sidebar` blur(24px)
- `.drawer` blur(28px)
- `.qcalc[data-q="bigfive"]::before` blur(20px)
- ... others

### Step 2 — Pruned 3-tier Blur Ladder

استبدل الـ 4-tier بـ 3-tier:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Worker 17 / Phase 2 — Pruned Blur Ladder
   3-tier (was 4-tier). Max blur = 20px (was 40px).
   Mobile: blur reduced further OR replaced with tonal layer.
   ════════════════════════════════════════════════════════════════ */

:root {
  /* Override Phase 1 declarations */
  --glass-thin:    blur(8px) saturate(110%);
  --glass-regular: blur(14px) saturate(118%);
  --glass-chrome:  blur(20px) saturate(130%);  /* Topbar/Sidebar/Modal — chrome only */
  /* --glass-thick retired */
}

/* Glass tier classes — repointed */
.glass-thin    { backdrop-filter: var(--glass-thin); -webkit-backdrop-filter: var(--glass-thin); }
.glass-regular { backdrop-filter: var(--glass-regular); -webkit-backdrop-filter: var(--glass-regular); }
.glass-chrome  { backdrop-filter: var(--glass-chrome); -webkit-backdrop-filter: var(--glass-chrome); }

/* Mobile: dump glass-thin entirely (replaced with tonal); reduce others */
@media (max-width: 768px) {
  .glass-thin { backdrop-filter: none; -webkit-backdrop-filter: none; }
  :root {
    --glass-regular: blur(8px) saturate(108%);
    --glass-chrome:  blur(12px) saturate(115%);
  }
}

/* Reduced motion / data-saver: kill all blur */
@media (prefers-reduced-motion: reduce) {
  .glass-thin, .glass-regular, .glass-chrome,
  [class*="glass-"], .qmodal, .cmdk-shell {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}
```

### Step 3 — Replace Heavy `glass-thick` Usages

ابحث عن كل استخدام `glass-thick` في style.css و **أبدله بـ `glass-regular`**:

```bash
grep -nE '\.glass-thick|--glass-thick|class[a-z]*-glass-thick' platform/assets/style.css
# Replace each with glass-regular equivalent
```

### Step 4 — Tonal Layer Utilities (بديل عن blur الخفيف)

```css
/* ─── Tonal Layering (Quiet Luxury alternative to backdrop-filter) ─── */
.tonal-1 {
  background:
    linear-gradient(180deg,
      color-mix(in oklch, var(--color-surface-1) 92%, transparent) 0%,
      color-mix(in oklch, var(--color-surface-1) 86%, transparent) 100%
    );
}

.tonal-2 {
  background:
    linear-gradient(180deg,
      color-mix(in oklch, var(--color-surface-1) 95%, var(--color-tint, var(--color-brand)) 5%) 0%,
      color-mix(in oklch, var(--color-surface-2) 92%, transparent) 100%
    );
}

.tonal-elevated {
  background: var(--color-surface-1);
  border-top: 1px solid color-mix(in oklch, var(--color-text) 8%, transparent);
  box-shadow:
    inset 0 1px 0 color-mix(in oklch, var(--color-text) 5%, transparent),
    var(--shadow-2);
}
```

### Step 5 — Continuous Animations Kill List

```bash
grep -nE 'animation:[^;]*(qlAmbient|qlAurora|life-mesh|life-drift)' platform/assets/style.css
```

**Strategy:**

```css
/* ════════════════════════════════════════════════════════════════
   Continuous animations — desktop only, gated.
   Mobile: NONE. Reduced-motion: NONE.
   ════════════════════════════════════════════════════════════════ */

/* Desktop only — these expensive animations stay */
@media (min-width: 769px) and (prefers-reduced-motion: no-preference) {
  /* qlAmbientDrift / qlAuroraDrift / life-mesh-shift / life-drift
     are kept here — but their RUNTIME is reduced */

  /* Slow them down: original was 8-12s, raise to 18-24s for less GPU cost */
  .life-ambient,
  [data-life="ambient"] {
    animation-duration: var(--life-ambient-duration, 18s) !important;
  }
  .life-mesh,
  [data-life="mesh"] {
    animation-duration: var(--life-mesh-duration, 22s) !important;
  }
}

/* Mobile + tablet: continuous animations off */
@media (max-width: 768px) {
  .life-ambient, .life-mesh, .life-breathing, .life-surface,
  [data-life="ambient"], [data-life="mesh"],
  [data-life="breathing"], [data-life="surface"],
  [data-aura-override] {
    animation: none !important;
    /* Static background derived from same gradient stop */
    background-position: 50% 50% !important;
  }
}

/* Reduced-motion users: pre-existing 47 guards remain. Nothing to add. */
```

### Step 6 — `will-change` Audit

```bash
grep -nE 'will-change:[^;]+' platform/assets/style.css
```

**Rule:** keep `will-change` only on:
- `.tactile-magnet` (during hover)
- `.tactile-press` (during active)
- `.pointer-trail` (during pointer movement)
- `.modal/.qmodal` (during open transition)
- View Transitions roots

**Remove from:** static elements, decorative containers, idle bento cells, footer.

```css
/* Replace any `will-change: transform, opacity, filter` on always-on
   elements with NO will-change (let browser decide). */
```

### Step 7 — `contain` for Layout Isolation

```css
/* ─── Containment for heavy components ─── */
.qcalc          { contain: layout style; }
.bento-tile     { contain: layout style paint; }
.modal-content,
.qmodal-content { contain: layout paint style; }
.cmdk-results   { contain: layout style; }
.topbar         { contain: layout style; }
.sidebar        { contain: layout style; }
.page-h         { contain: layout; }

/* On scroll-rich pages — isolate sub-trees */
.page > section { content-visibility: auto; contain-intrinsic-size: 1px 800px; }
```

> ملاحظة: `content-visibility: auto` + `contain-intrinsic-size` = lazy rendering للمحتوى خارج viewport. تحسين كبير على scroll smoothness.

### Step 8 — `Upg.material` Extension (Optional)

في app.js إذا كان `Upg.material` معرَّف من W14 P1، يمكن extension بسيط (≤30 سطر):

```javascript
/* ════════════════════════════════════════════════════════════════
   Worker 17 / Phase 2 — Upg.material density extension
   Adds 'mobile-lite' density preset. Backward-compat verbatim.
   ════════════════════════════════════════════════════════════════ */
(() => {
  if (!window.Upg || !window.Upg.material) return;

  const original = window.Upg.material;
  const densitySetters = {
    'normal':      { thin: '8px', regular: '14px', chrome: '20px' },
    'compact':     { thin: '6px', regular: '10px', chrome: '14px' },
    'mobile-lite': { thin: '0px', regular: '8px',  chrome: '12px' },
  };

  const apply = (preset) => {
    if (!densitySetters[preset]) return;
    const v = densitySetters[preset];
    const r = document.documentElement;
    r.style.setProperty('--glass-thin',    `blur(${v.thin}) saturate(110%)`);
    r.style.setProperty('--glass-regular', `blur(${v.regular}) saturate(118%)`);
    r.style.setProperty('--glass-chrome',  `blur(${v.chrome}) saturate(130%)`);
    r.setAttribute('data-density', preset);
  };

  // Auto: if narrow viewport at boot, apply mobile-lite
  if (window.matchMedia('(max-width: 480px)').matches) apply('mobile-lite');

  // Replace API surface (extend, don't break)
  window.Upg.material = Object.freeze({
    ...original,
    density: apply,
    densityList: () => Object.keys(densitySetters),
  });
})();
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-zA-Z]+' platform/assets/app.js | sort -u | wc -l  # → 22

# Phase 2 changes
grep -cE 'blur\(40' platform/assets/style.css         # → 0 (was multiple)
grep -cE 'blur\(32' platform/assets/style.css         # → 0
grep -cE 'glass-thick' platform/assets/style.css      # → 0
grep -c 'tonal-1\|tonal-2\|tonal-elevated' platform/assets/style.css  # → ≥3
grep -c 'content-visibility: auto' platform/assets/style.css  # → ≥1

# Functional manual checks:
# 1. Open in mobile viewport (375x667) → no continuous animations visible
# 2. Open in desktop → animations slowed but smooth
# 3. Toggle prefers-reduced-motion → all animations stop
# 4. Lighthouse Mobile Performance → ≥ 80 (improved from baseline ~60)
```

---

## ✅ معايير القبول (Phase 2)

- [ ] Max blur في الـ codebase = 20px (was 40px).
- [ ] `glass-thick` المحذوفة استُبدلت كلّها بـ `glass-regular`.
- [ ] Continuous animations معطَّلة على mobile.
- [ ] Tonal layer utilities (`tonal-1/2/elevated`) مضافة.
- [ ] `will-change` محذوف من العناصر الساكنة.
- [ ] `contain` مُضاف على heavy components.
- [ ] `content-visibility: auto` على page sections.
- [ ] (Optional) `Upg.material.density('mobile-lite')` يشتغل.
- [ ] Lighthouse Mobile Performance ≥ 80 (هدف phase 2 — phase 6 يرفعه لـ 85+).
- [ ] الموقع يبدو نفسه 95%+ — لا regression بصري ملحوظ.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/style.css platform/assets/app.js
git commit -m "phase 2 (creative): GPU performance refactor — pruned glass ladder (4-tier → 3-tier, max blur 40→20), kill continuous animations on mobile, tonal layering utilities (3 classes), will-change audit, contain + content-visibility on heavy components, Upg.material.density('mobile-lite') extension"

# state
git add state/PROGRESS.json state/snapshots/worker-17-phase-2.json
git commit -m "state: creative phase 2 committed and pushed"
```

— نهاية Phase 2.

🎵 **Resonance check:** هل المنصة الآن تتنفّس بدل ما تلهث على الموبايل؟ نعم → انتقل لـ Phase 3.
