# 🧹 WORKER 23 — Phase 2/5 — Important Purge
> **اقرأ أولاً:** `prompts/v3/23_WORKER_DECONSTRUCTION.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phase 1 (@layer cascade active).
> **الفلسفة:** *الـ !important كان ضرورة قبل @layer. الآن صار سلاحاً مكسوراً. شطب 80% من 221، احتفاظ بـ 45 المُتعمَّدة فقط.*

---

## 🛡️ Preservation Contract (Phase 2)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` | **PURGE** `!important` من Pack v1/v2/v3 جديدة (Workers 11-22) **بعد** التأكد من أنها لم تَعد ضرورية | شطب `!important` من قواعد reset/themes أصلية W11 |
| `style.css` | **MOVE** بعض القواعد من layer لآخر إذا تَطلّب الـ purge | تغيير قاعدة |
| `style.css` `@layer overrides` | **DOCUMENT** الـ 45 المتبقية كـ "intentional" بـ comment | حذف intentional |
| `app.js` | **EXTEND** `Upg.layer` بـ `auditImportant()` | تعديل قاعدة JS |

**Sacred preserved:**
- 27+ Upg.* APIs.
- جميع keyframes + ambient + life + ritual.
- 14 page sections + 391 qcalc.

---

## 🎯 الهدف

Phase 2 يَستثمر `@layer` cascade لإزالة `!important` غير الضروري:

1. **جرد** 221 `!important` declaration في `style.css`.
2. **تصنيف** كل واحدة:
   - **A. Purge candidate** — Pack v3 (W20-W22) قواعد، وُضِعت لأن الـ aurora-base كان أقوى cascade. الآن مع `@layer`، الـ overrides layer تَفوز تلقائياً.
   - **B. Pack v1/v2 historical** — وُضِعت لـ specificity wars بين Workers. الآن مع `@layer`، utility/components/themes ترتيبها واضح.
   - **C. Reduced-motion guards** — يجب أن تَبقى (a11y critical).
   - **D. Print overrides** — يجب أن تَبقى (print user-agent very specific).
   - **E. Vendor prefixes / browser bugs** — تَبقى (workarounds).
3. **PURGE** من فئات A + B بحرص (~176 من 221).
4. **DOCUMENT** الـ 45 المتبقية في `overrides` layer.
5. **VERIFY** بعد كل دفعة من ~30 شطبة، الـ visual unchanged.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 2 PRE-FLIGHT (Worker 23 / DECONSTRUCTION)
├─ Phase: 2/5 — Important Purge
├─ Estimated lines: ~480 (CSS modifications + JS audit extension)
├─ Files to touch:
│   ├─ platform/assets/style.css   (PURGE !important + DOCUMENT remaining)
│   └─ platform/assets/app.js      (EXTEND Upg.layer.auditImportant ~80 lines)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '@layer' platform/assets/style.css                 → ≥7 (P1)
│   ├─ grep -c '!important' platform/assets/style.css             → 221 (baseline)
│   └─ grep -c '<section class="page"' platform/index.html        → 14+
├─ Branch: continue worker-23-devotio
└─ Strategy: PURGE in batches of 30 + verify after each batch.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Inventory all !important

```bash
# Generate inventory
grep -n '!important' platform/assets/style.css > /tmp/important-inventory.txt
wc -l /tmp/important-inventory.txt   # → ~221
```

كل سطر يُصنَّف:

```
Line 234:  color: red !important;        →  CATEGORY: A (W20 P3 — purge after @layer)
Line 567:  display: none !important;     →  CATEGORY: D (print) — KEEP
Line 891:  animation: none !important;   →  CATEGORY: C (reduced-motion) — KEEP
```

### Step 2 — APPEND inventory comment in style.css

```css
/* ════════════════════════════════════════════════════════════════════════
   DECONSTRUCTION v3 — Important Purge Inventory (Worker 23 / Phase 2)
   ────────────────────────────────────────────────────────────────────────
   Pre-purge baseline: 221 !important declarations
   Target post-purge: ≤45 (intentional only)

   Category breakdown (recorded <date>):
   A. Pack v3 W20-W22 cascade workarounds:    ~85   →  PURGE (covered by @layer)
   B. Pack v1/v2 specificity wars:            ~91   →  PURGE (covered by @layer)
   C. Reduced-motion guards:                   ~28   →  KEEP (a11y critical)
   D. Print stylesheet overrides:              ~12   →  KEEP (UA-specific)
   E. Vendor prefix / browser quirks:           ~5   →  KEEP (workarounds)

   Total purgeable: 176
   Total to keep:    45

   Strategy: purge in batches of 30, verify visual after each.
   ════════════════════════════════════════════════════════════════════════ */
```

### Step 3 — Batch Purge Strategy

#### Batch 1 (30 declarations from W20 — Worker 20 typography)

```bash
# Find all !important in W20 sections
grep -n '!important' platform/assets/style.css | grep -E '(tas-|TASMEEM)' > /tmp/batch-1.txt
```

لكل واحد، **احذف `!important` وحده** (لا تَحذف القاعدة):

```css
/* قبل */
.tas-voice-hero {
  font-style: normal !important;  /* W20 P3 — Aref Ruqaa lacks italic */
}

/* بعد */
.tas-voice-hero {
  font-style: normal;
}
```

> **منطق:** مع `@layer utilities` تَأتي بعد `@layer base`، الـ `font-style: normal` يَفوز تلقائياً. لا حاجة لـ `!important`.

#### Batch 2 (30 declarations from W21)

```bash
grep -n '!important' platform/assets/style.css | grep -E '(chr-|CHROMATIC)' > /tmp/batch-2.txt
```

نفس النمط: شطب `!important` من قواعد `chr-*` التي تَفوز بـ cascade الآن.

#### Batch 3 (30 from W22)

```bash
grep -n '!important' platform/assets/style.css | grep -E '(rit-|RITUAL)' > /tmp/batch-3.txt
```

#### Batch 4 (30 from Pack v1/v2 specificity)

```bash
grep -n '!important' platform/assets/style.css | grep -E '(W11|W12|W13|W14|W15|W16|W17|W18|W19)' > /tmp/batch-4.txt
```

#### Batch 5 (final ~56 from miscellaneous)

```bash
grep -n '!important' platform/assets/style.css > /tmp/remaining.txt
# Manual review each: KEEP or PURGE
```

### Step 4 — Verify after each batch

بعد كل batch:

```bash
# Count went down
grep -c '!important' platform/assets/style.css

# Visual test
# → Open platform/index.html in browser
# → Navigate dashboard → callcenter → psych → eq → accountmgr
# → Compare with screenshot from before P2
# → Test dark + light + reduced-motion + print preview

# Console test
# → 0 errors
# → Upg.layer.auditImportant() shows trend
```

### Step 5 — Document the 45 survivors

في `@layer overrides`، **APPEND** documentation:

```css
@layer overrides {
  /* ════════════════════════════════════════════════════════════════════
     INTENTIONAL !important — survivors of Worker 23 Phase 2 Purge
     ────────────────────────────────────────────────────────────────────
     The 45 declarations below are PROTECTED. Each has a reason.
     Do NOT remove without phase-spec authorization.
     ════════════════════════════════════════════════════════════════════ */

  /* ─── Reduced-motion guards (28 declarations) ─── */
  @media (prefers-reduced-motion: reduce) {
    /* These MUST !important — they override animations declared at higher
       specificity in components/utilities layers */
    .life-ambient::before,
    .life-mesh::after,
    .life-breathing,
    .life-surface::before,
    [data-life]::before,
    [data-life]::after,
    .rit-entry-veil,
    .rit-entry-wordmark,
    .rit-entry-poetry,
    .rit-entry-glow,
    /* ... etc, 28 total ... */ {
      animation: none !important;
    }
    /* (similar for transitions in halo, threshold, atmosphere) */
  }

  /* ─── Print overrides (12 declarations) ─── */
  @media print {
    /* Print user agent applies styles AFTER our cascade — we need !important */
    body::before, body::after,
    .life-ambient::before, .life-mesh::after,
    [data-life]::before, [data-life]::after {
      display: none !important;
    }
    .chr-grad-hero {
      background: var(--color-tint) !important;
      color: white !important;
    }
    /* ... etc ... */
  }

  /* ─── Browser bugs / vendor quirks (5 declarations) ─── */
  /* Safari ≤16 has a bug with backdrop-filter rendering on first paint */
  .glass-card {
    -webkit-backdrop-filter: blur(var(--glass-blur-regular)) !important;
  }
  /* Firefox ≤120 needs !important for grid-template-rows in nested grids */
  /* (... etc, 5 total ...) */
}
```

### Step 6 — `Upg.layer.auditImportant()` extension

```javascript
/* ════════════════════════════════════════════════════════════════════════
   DECONSTRUCTION v3 — Important Audit (Worker 23 / Phase 2)
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.layer) return;

  // Audit !important declarations across all stylesheets
  const auditImportant = () => {
    const result = {
      total: 0,
      byLayer: { reset: 0, tokens: 0, base: 0, utilities: 0,
                 components: 0, themes: 0, overrides: 0, unknown: 0 },
      byCategory: { reduced_motion: 0, print: 0, browser_bug: 0, other: 0 }
    };

    for (const sheet of document.styleSheets) {
      try {
        const walkRules = (rules, currentLayer = 'unknown') => {
          for (const rule of rules) {
            if (rule instanceof CSSLayerBlockRule) {
              walkRules(rule.cssRules, rule.name);
            } else if (rule instanceof CSSMediaRule) {
              const mediaText = rule.conditionText || rule.media.mediaText;
              let cat = 'other';
              if (/prefers-reduced-motion/.test(mediaText)) cat = 'reduced_motion';
              else if (/print/.test(mediaText)) cat = 'print';
              walkRules(rule.cssRules, currentLayer);
              // Count !important in nested
              for (const r of rule.cssRules) {
                if (r.cssText && r.cssText.includes('!important')) {
                  const matches = r.cssText.match(/!important/g);
                  if (matches) result.byCategory[cat] += matches.length;
                }
              }
            } else if (rule.cssText && rule.cssText.includes('!important')) {
              const matches = rule.cssText.match(/!important/g);
              if (matches) {
                result.total += matches.length;
                result.byLayer[currentLayer] += matches.length;
              }
            }
          }
        };
        walkRules(sheet.cssRules);
      } catch { /* skip CORS-restricted sheets */ }
    }

    return result;
  };

  window.Upg.layer.auditImportant = auditImportant;
})(window, document);
```

### Step 7 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 23 / Phase 2 — Purge Discipline:
   1. لا تشطب !important بدون verifying visual.
   2. الـ 45 المُتعمَّدة موثَّقة في @layer overrides — لا تَحذف.
   3. أي !important جديد بعد Phase 2 يجب أن يكون documented + في overrides layer.
   4. Upg.layer.auditImportant() target ≤ 45.
   5. لو فشل visual بعد purge → revert الـ batch، استشر phase-spec.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html               # → 14+
grep -c 'qcalc' platform/index.html                                # → 391

# Critical: !important count down
grep -c '!important' platform/assets/style.css                    # → ≤45 (was 221)

# Layers preserved
grep -c '@layer' platform/assets/style.css                        # → ≥7

# Browser test:
# Console: Upg.layer.auditImportant() → { total: ≤45, byLayer: { overrides: ~45 }, byCategory: ... }
# Navigate all pages → no visual regression
# Test dark + light + reduced-motion + print preview
```

---

## ✅ معايير القبول (Phase 2)

- [ ] `!important` count ≤ 45.
- [ ] الـ 45 المتبقية كلها في `@layer overrides` أو `@media reduced-motion/print`.
- [ ] جميع الـ purged !important موثَّقة (شطب verified by visual test).
- [ ] `Upg.layer.auditImportant()` يَرجع breakdown صحيح.
- [ ] صفر visual regression عبر 14 صفحة.
- [ ] reduced-motion + print preview لا يَزال يعمل.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css platform/assets/app.js
git commit -m "phase 2 (devotio): important purge — 221 → ≤45 (80% reduction), @layer cascade order resolves specificity wars, intentional !important documented"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-23-phase-2.json
git commit -m "state: devotio phase 2 (worker 23) committed and pushed"
# push immediately
```

— نهاية Phase 2.

🧹 **Devotion check:** هل الـ cascade صار مَفهوماً؟ ٤٥ !important فقط متعمَّدة؟ → Phase 3 (CSS Shatter).
