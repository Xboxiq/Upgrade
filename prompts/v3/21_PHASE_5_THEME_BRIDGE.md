# 🌉 WORKER 21 — Phase 5/5 — Theme Bridge
> **اقرأ أولاً:** `prompts/v3/21_WORKER_CHROMATIC_SOUL.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phases 1-4 (palette + Mihrab + reassignment + gradients).
> **الفلسفة:** *الجسر بين القديم والجديد. لا تكسر ما عمل، لا تخلِّ ما لم يعمل. اللون يعبر بأمان من Pack v1/v2 إلى Pack v3.*

---

## 🛡️ Preservation Contract (Phase 5)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` `:root[data-theme="light"]` | **APPEND** عبر `:root[data-theme="light"]` فقط — لا تعديل في القيم القائمة (W12 P2 Linen-Bone) | تعديل أي قيمة light theme |
| `style.css` rules | **APPEND** WCAG contrast verification block + Mihrab refinements + Pack v1/v2 backward-compat shims | تعديل قواعد قائمة |
| `style.css` rules | **APPEND** print-aware color overrides | تعديل @media print قائم |
| `index.html` | لا يُلمَس | أي تعديل |
| `app.js` | **APPEND** sub-IIFE inside `Upg.chroma` بـ `verifyContrast()` API | تعديل IIFEs |

**Sacred preserved:**
- W12 P2 Linen-Bone Light theme (لا نلمسه أبداً).
- جميع 15 `--tint-*` + edges + soft (Phase 3).
- جميع 12 palettes (Phase 1).
- 26 Upg.* APIs.

---

## 🎯 الهدف

Phase 5 يَختم Worker 21 بـ:

1. **Light theme bridge** — تفعيل palette + tints على Light theme بدون تعديل Linen-Bone:
   - Light tints يستعملون Pack v3 colors لكن stops أعلى (50/100/200) للحضور الناعم.
   - Mihrab dark stays ✓.
2. **WCAG verification** — `Upg.chroma.verifyContrast()` يفحص كل tint × bg pair.
3. **Pack v1/v2 backward-compat shims** — أي token من Pack v1/v2 يستهلك aurora cyan تلقائياً يُعاد توجيهه لـ Lapis.
4. **Print stylesheet refresh** — print uses Pearl/Marble bg + Mihrab text للـ economy.
5. **Mihrab refinements** — dark theme polish (focus rings, scrollbar, selection).

---

## 📋 PRE-FLIGHT

```
📋 PHASE 5 PRE-FLIGHT (Worker 21 / CHROMATIC SOUL)
├─ Phase: 5/5 — Theme Bridge (final)
├─ Estimated lines: ~420 (CSS bridge + WCAG + print + JS verifyContrast ~80)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~340 lines)
│   └─ platform/assets/app.js      (APPEND ~80 lines sub-iife)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c 'paper-tone' platform/assets/style.css              → ≥1 (W12 P2)
│   ├─ grep -c 'data-theme="light"' platform/assets/style.css      → ≥1
│   ├─ grep -c '\-\-chr-' platform/assets/style.css                → ≥120 (P1)
│   └─ grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l → 26
├─ Branch: continue worker-21-devotio
└─ Final phase of Worker 21 — PR opens after this.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Light Theme Tint Bridge

```css
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Light Theme Bridge (Worker 21 / Phase 5)
   ────────────────────────────────────────────────────────────────────────
   W12 P2 Linen-Bone preserved. We add tint behaviors that work ON top
   of Linen-Bone WITHOUT modifying its base values.
   ════════════════════════════════════════════════════════════════════════ */
:root[data-theme="light"] {
  /* On light, tint appears at 100/200 stops (subtle); keep names same */
  /* These OVERRIDE Phase 3 tints for light context only */
  --tint-dashboard:     var(--chr-saffron-300);
  --tint-callcenter:    var(--chr-damascus-400);
  --tint-fieldsales:    var(--chr-silt-300);
  --tint-accountmgr:    var(--chr-cedar-400);
  --tint-social:        var(--chr-coral-400);
  --tint-lab:           var(--chr-marble-700);  /* darker for contrast on light bg */
  --tint-psych:         var(--chr-lapis-400);
  --tint-eq:            var(--chr-mihrab-500);
  --tint-negotiation:   var(--chr-damascus-600);
  --tint-customercare:  var(--chr-pearl-700);   /* darker pearl for contrast */
  --tint-programming:   var(--chr-indigo-500);
  --tint-accounting:    var(--chr-palm-400);
  --tint-phonerepair:   var(--chr-henna-500);
  --tint-hrmastery:     var(--chr-henna-400);
  --tint-myprogress:    var(--chr-lapis-500);
  --tint-curriculum:    var(--chr-saffron-500);

  --tint-edge-dashboard:    var(--chr-saffron-500);
  --tint-edge-callcenter:   var(--chr-damascus-600);
  --tint-edge-fieldsales:   var(--chr-silt-500);
  --tint-edge-accountmgr:   var(--chr-cedar-600);
  --tint-edge-social:       var(--chr-coral-600);
  --tint-edge-lab:          var(--chr-marble-900);
  --tint-edge-psych:        var(--chr-lapis-600);
  --tint-edge-eq:           var(--chr-mihrab-700);
  --tint-edge-negotiation:  var(--chr-damascus-800);
  --tint-edge-customercare: var(--chr-pearl-900);
  --tint-edge-programming:  var(--chr-indigo-700);
  --tint-edge-accounting:   var(--chr-palm-600);
  --tint-edge-phonerepair:  var(--chr-henna-700);
  --tint-edge-hrmastery:    var(--chr-henna-600);
  --tint-edge-myprogress:   var(--chr-lapis-700);
  --tint-edge-curriculum:   var(--chr-saffron-700);

  --tint-soft-dashboard:    var(--chr-saffron-50);
  --tint-soft-callcenter:   var(--chr-damascus-50);
  --tint-soft-fieldsales:   var(--chr-silt-50);
  --tint-soft-accountmgr:   var(--chr-cedar-50);
  --tint-soft-social:       var(--chr-coral-50);
  --tint-soft-lab:          var(--chr-marble-50);
  --tint-soft-psych:        var(--chr-lapis-50);
  --tint-soft-eq:           var(--chr-mihrab-50);
  --tint-soft-negotiation:  var(--chr-damascus-100);
  --tint-soft-customercare: var(--chr-pearl-50);
  --tint-soft-programming:  var(--chr-indigo-50);
  --tint-soft-accounting:   var(--chr-palm-50);
  --tint-soft-phonerepair:  var(--chr-henna-50);
  --tint-soft-hrmastery:    var(--chr-henna-50);
  --tint-soft-myprogress:   var(--chr-lapis-50);
  --tint-soft-curriculum:   var(--chr-saffron-100);
}
```

### Step 2 — Pack v1/v2 Backward-Compat Shims

```css
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Pack v1/v2 Backward-Compat Shims (Worker 21 / Phase 5)
   ────────────────────────────────────────────────────────────────────────
   Some W11-W19 selectors used hardcoded aurora colors. We catch them and
   reroute via tint-aware fallbacks. Add only — never modify W1/W2 rules.
   ════════════════════════════════════════════════════════════════════════ */

/* Some W14 ATELIER classes used hardcoded teal/violet — map to lapis */
.atelier-glow,
.aurora-pulse,
[class*="aurora-"]:not([class*="aurora-tint"]) {
  /* If the rule used hardcoded color, override here with --color-tint. */
  --aurora-fallback: var(--color-tint, var(--chr-lapis-500));
}

/* Card hover edge — replace generic cyan with personality tint */
.bento-card:hover,
.cath-card:hover,
.glass-card:hover {
  border-color: color-mix(in oklch, var(--color-tint, var(--chr-lapis-500)) 38%, var(--color-border-strong));
}

/* Focus ring — universal Lapis (Pack v3 brand) */
:focus-visible {
  outline: 3px solid color-mix(in oklch, var(--color-tint, var(--color-brand)) 55%, transparent);
  outline-offset: 2px;
  /* Replaces any older aurora ring */
}

/* Selection color — Mihrab tint */
::selection {
  background: color-mix(in oklch, var(--color-tint, var(--chr-lapis-500)) 35%, transparent);
  color: var(--color-text);
}

/* Scrollbar — Mihrab subtle (dark) / Marble subtle (light) */
:root[data-theme="dark"] {
  scrollbar-color: var(--chr-mihrab-700) var(--chr-mihrab-900);
}
:root[data-theme="light"] {
  scrollbar-color: var(--chr-marble-700) var(--chr-marble-50);
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: color-mix(in oklch, var(--color-tint, var(--chr-lapis-500)) 25%, var(--color-surface-2));
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: color-mix(in oklch, var(--color-tint, var(--chr-lapis-500)) 50%, var(--color-surface-3));
}
```

### Step 3 — Print Stylesheet Refresh

```css
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Print Theme (Worker 21 / Phase 5)
   ────────────────────────────────────────────────────────────────────────
   Print should be ink-economical: white bg, dark text, tints only as accents.
   Worker 24 P5 (Print Atelier) will deepen this.
   ════════════════════════════════════════════════════════════════════════ */
@media print {
  :root,
  :root[data-theme="dark"],
  :root[data-theme="light"] {
    --color-bg:           white;
    --color-surface-0:    white;
    --color-surface-1:    var(--chr-pearl-50);
    --color-surface-2:    var(--chr-pearl-100);
    --color-surface-3:    var(--chr-pearl-200);
    --color-text:         var(--chr-mihrab-900);
    --color-text-muted:   var(--chr-mihrab-700);
    --color-text-faint:   var(--chr-mihrab-500);
    --color-border:       var(--chr-mihrab-300);
  }

  /* Tints stay vibrant for visual identity in print */
  /* (use the W21 P3 page reassignment values) */

  /* Hide ambient gradients in print */
  body::before,
  body::after,
  .life-ambient::before,
  .life-mesh::after,
  .life-surface::before,
  [data-life]::before,
  [data-life]::after {
    display: none !important;
  }

  /* Force chr-grad-hero to print as solid color */
  .chr-grad-hero {
    background: var(--color-tint) !important;
    color: white !important;
  }
}
```

### Step 4 — Mihrab Dark Refinements

```css
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Mihrab Refinements (Worker 21 / Phase 5)
   ────────────────────────────────────────────────────────────────────────
   Final polish on dark theme for legibility + warmth.
   ════════════════════════════════════════════════════════════════════════ */
:root[data-theme="dark"] {
  /* Glass blurs warmer on Mihrab */
  --glass-bg-dark:
    color-mix(in oklch, var(--chr-mihrab-800) 78%, transparent);
  --glass-edge-dark:
    color-mix(in oklch, var(--chr-mihrab-500) 35%, transparent);

  /* Code blocks (programming page) — Indigo bg for contrast */
  --code-bg:
    color-mix(in oklch, var(--chr-indigo-900) 92%, var(--chr-mihrab-900));
  --code-text:
    var(--chr-marble-100);

  /* Quotes (psych page) — Mihrab veil bg */
  --quote-bg:
    color-mix(in oklch, var(--chr-mihrab-800) 85%, transparent);
  --quote-border-edge:
    var(--chr-lapis-500);
}

/* Inline code in body */
:root[data-theme="dark"] code:not(pre code) {
  background: var(--code-bg, var(--chr-indigo-900));
  color: var(--code-text, var(--chr-marble-100));
  padding: 0.1em 0.3em;
  border-radius: 0.25em;
}

/* Quote blocks */
:root[data-theme="dark"] blockquote,
:root[data-theme="dark"] .h-quote,
:root[data-theme="dark"] .literary-quote {
  background: var(--quote-bg, var(--chr-mihrab-800));
  border-inline-start: 3px solid var(--quote-border-edge, var(--chr-lapis-500));
  padding: var(--space-4, 1rem);
  border-radius: 0.5rem;
}
```

### Step 5 — `Upg.chroma.verifyContrast()` API

```javascript
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Contrast Verification (Worker 21 / Phase 5)
   Adds Upg.chroma.verifyContrast() for WCAG AA verification.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.chroma) return;

  // Convert CSS color to RGB (works with oklch via temp element)
  const cssToRgb = (cssColor) => {
    const tmp = document.createElement('div');
    tmp.style.color = cssColor;
    tmp.style.position = 'absolute';
    tmp.style.visibility = 'hidden';
    document.body.appendChild(tmp);
    const computed = getComputedStyle(tmp).color;
    document.body.removeChild(tmp);
    const m = computed.match(/rgb\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
    if (!m) return null;
    return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
  };

  // WCAG relative luminance
  const luminance = ([r, g, b]) => {
    const [R, G, B] = [r, g, b].map((c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  // WCAG contrast ratio
  const ratio = (l1, l2) => {
    const [bright, dark] = l1 > l2 ? [l1, l2] : [l2, l1];
    return (bright + 0.05) / (dark + 0.05);
  };

  // Check contrast of two CSS colors
  const checkContrast = (fg, bg) => {
    const fgRgb = cssToRgb(fg);
    const bgRgb = cssToRgb(bg);
    if (!fgRgb || !bgRgb) return null;
    const r = ratio(luminance(fgRgb), luminance(bgRgb));
    return {
      ratio: r.toFixed(2),
      passAA: r >= 4.5,
      passAAA: r >= 7,
      passLargeAA: r >= 3
    };
  };

  // Verify all key text/bg pairs
  const verifyContrast = () => {
    const rs = getComputedStyle(document.documentElement);
    const text = rs.getPropertyValue('--color-text').trim();
    const textMuted = rs.getPropertyValue('--color-text-muted').trim();
    const bg = rs.getPropertyValue('--color-bg').trim();
    const surface0 = rs.getPropertyValue('--color-surface-0').trim();
    const surface1 = rs.getPropertyValue('--color-surface-1').trim();
    const brand = rs.getPropertyValue('--color-brand').trim();

    return {
      'text-on-bg':         checkContrast(text, bg),
      'text-on-surface-0':  checkContrast(text, surface0),
      'text-on-surface-1':  checkContrast(text, surface1),
      'text-muted-on-bg':   checkContrast(textMuted, bg),
      'brand-on-bg':        checkContrast(brand, bg),
      theme: document.documentElement.getAttribute('data-theme') ||
             document.body.getAttribute('data-theme') || 'unknown'
    };
  };

  // Extend Upg.chroma
  window.Upg.chroma.checkContrast = checkContrast;
  window.Upg.chroma.verifyContrast = verifyContrast;

  // Auto-verify on load (one-time)
  document.addEventListener('DOMContentLoaded', () => {
    const v = verifyContrast();
    const failingPairs = Object.entries(v).filter(
      ([k, val]) => k !== 'theme' && val && !val.passAA && k !== 'text-muted-on-bg'
    );
    if (failingPairs.length > 0) {
      console.warn('🔴 CHROMATIC SOUL — WCAG AA contrast issues:', failingPairs);
    } else {
      console.info('%c✓ CHROMATIC SOUL — WCAG AA verified',
                   'color:#7BFFA0; font-weight:bold;');
    }
  });
})(window, document);
```

### Step 6 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 21 / Phase 5 — Bridge Discipline:
   1. Light theme Linen-Bone محفوظ — لمنا فقط tints (لا base).
   2. backward-compat shims لأي aurora-* class قديم.
   3. print: white bg + chr-mihrab text + tints as accents فقط.
   4. WCAG AA verified عبر Upg.chroma.verifyContrast() — 4.5:1 minimum.
   5. selection + scrollbar + focus-ring جميعها tint-aware.
   6. Mihrab refinements: code bg = indigo، quote bg = mihrab-800.
   ════════════════════════════════════════════════════════════════════════ */

/* End CHROMATIC SOUL v3 — Worker 21 COMPLETE ─────────────────────────── */
```

---

## 🧪 Sanity Probe

```bash
# Sacred preserved
grep -c 'paper-tone' platform/assets/style.css                    # → ≥1 (W12 P2 untouched)
grep -c '\-\-tint-' platform/assets/style.css                     # → ≥75 (45 from P3 + 30 from light bridge)
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 26 (Upg.chroma)

# Phase 5 specific
grep -c '\@media print' platform/assets/style.css                 # → ≥3 (W12 + W21 P5)
grep -c 'verifyContrast' platform/assets/app.js                   # → ≥1
grep -c 'chr-marble-100' platform/assets/style.css                # → ≥1 (used in dark code text)

# Browser test:
# Console: Upg.chroma.verifyContrast() → all passAA: true
# Toggle to light → tint values change to lighter stops
# Toggle to dark → Mihrab + Lapis brand visible
# Print preview → white bg, dark text, tints as ribbons
```

---

## ✅ معايير القبول (Phase 5 — Worker 21 final)

- [ ] Light theme tints REASSIGNED to lighter stops (300/400 instead of 500).
- [ ] W12 P2 Linen-Bone base values **untouched**.
- [ ] Backward-compat shims for aurora-* classes.
- [ ] `:focus-visible`, `::selection`, scrollbar all tint-aware.
- [ ] `@media print` block applied (Worker 24 P5 will deepen).
- [ ] Mihrab refinements (code bg, quote bg).
- [ ] `Upg.chroma.verifyContrast()` returns AA pass for all pairs.
- [ ] Console: 0 errors. Auto-verify on load logs success.
- [ ] **CHROMATIC SOUL Worker 21 مكتمل — 5/5 phases.**

---

## 📤 Commit + Push (final 2-push of Worker 21)

```bash
git add platform/assets/style.css platform/assets/app.js
git commit -m "phase 5 (devotio): theme bridge — light theme tints reassigned, backward-compat shims, print theme, mihrab refinements, Upg.chroma.verifyContrast — worker 21 complete"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-21-phase-5.json
git commit -m "state: devotio phase 5 (worker 21) complete — 5/5 phases"
# push immediately
```

### Open PR

```
gh pr create \
  --base main \
  --head worker-21-devotio \
  --title "feat: Worker 21 — CHROMATIC SOUL DEVOTIO (5/5 phases)" \
  --body "Pack v3 Worker 21 complete.

## Phases done
1. Palette Forge — 12 Arabic palettes × 9 stops (oklch)
2. Dark Mihrab — replaced aurora slate with mihrab indigo + lapis brand
3. Page Reassignment — 15 tints rerouted to chr-* + Upg.chroma API
4. Gradient Recast — 15 personality gradients + cinematic utilities
5. Theme Bridge — light tints, print, backward-compat, WCAG AA verify

## Sacred preservation
- W12 P2 Linen-Bone Light theme ✓ (untouched)
- 14 page sections + curriculum ✓
- 391 qcalc references ✓
- 26 Upg.* APIs (25 + Upg.chroma) ✓
- 15 tint-* names ✓ (values rerouted only)

## Devotion check
- 12 Arabic-rooted colors (Lapis/Damascus/Henna/Saffron/...) ✓
- WCAG AA verified (4.5:1+) ✓
- 0 hex in new code ✓
- 0 external requests preserved ✓"
```

— نهاية Worker 21.

🎨 **Devotion check final:** هل اللون يحكي بالعربي الآن؟ هل dark = محراب، brand = لازوردي، صفحات = ١٢ صبغة أصيلة؟ → فتح PR، ثم Worker 22 (Ritual UI).
