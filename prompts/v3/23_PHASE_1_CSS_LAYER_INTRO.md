# 🧱 WORKER 23 — Phase 1/5 — CSS Layer Intro
> **اقرأ أولاً:** `prompts/v3/23_WORKER_DECONSTRUCTION.md` — قسم **Preservation Guard**.
> **يبني فوق:** Pack v3 Workers 20-22 مدموجة.
> **الفلسفة:** *@layer هو الجملة الإسلامية في CSS — كل قاعدة لها مكان مُعَيَّن في تَسلسل، لا فوضى، لا تعارض. ندخل النظام، نَنقذ ٢٠٠+ سطر من !important.*

---

## 🛡️ Preservation Contract (Phase 1)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` | **WRAP** كل القواعد القائمة بـ `@layer` declarations مناسبة (in-place — نفس الملف) | تغيير قواعد، حذف، إعادة ترتيب |
| `style.css` بداية | **APPEND** عند البداية الـ `@layer` declaration order | تعديل الـ :root الأول |
| `app.js` | **APPEND** IIFE `Upg.layer` (~140 سطر) في النهاية | لمس IIFEs قائمة |
| `index.html` | لا يُلمَس | أي تعديل |

**Sacred preserved:**
- جميع 23K-line من قواعد W11-W22 (نَلفّها فقط).
- 27 Upg.* APIs.
- 391 qcalc + 14 page sections.

> **ملاحظة:** Phase 1 لا يَحذف `!important`. Phase 2 يفعل ذلك. Phase 1 يَخلق البنية فقط.

---

## 🎯 الهدف

Phase 1 يُدخل `@layer` cascade system دون كَسر شيء:

1. **APPEND** عند بداية `style.css`:
   ```css
   @layer reset, tokens, base, utilities, components, themes, overrides;
   ```
2. **WRAP** كل قواعد W11-W22 في layer مناسب:
   - `reset` → CSS reset (lines 1-50 of W11).
   - `tokens` → :root + variables (W11 P1, W20 P3, W21 P1, ...).
   - `base` → html/body/typography baseline (W12 P1, W20 P5).
   - `utilities` → tas-*, chr-*, rit-*, life-*, .h-*, .type-* (W12-W22 utilities).
   - `components` → .bento-*, .qcalc-*, .cath-*, sections (W11-W22 components).
   - `themes` → :root[data-theme="dark"], :root[data-theme="light"] (W11 P1 + W21 P2).
   - `overrides` → @media print, @media reduced-motion, !important needed (W21 P5 + W22 phases).
3. **WRITE** `Upg.layer` IIFE — للاستعراض + audit.
4. **NO !important removal** — Phase 2 يفعل.
5. **NO file split** — Phase 3 يفعل.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 1 PRE-FLIGHT (Worker 23 / DECONSTRUCTION)
├─ Phase: 1/5 — CSS Layer Intro
├─ Estimated lines: ~520 (CSS WRAP all 23K rules + APPEND @layer declarations + JS IIFE)
├─ Files to touch:
│   ├─ platform/assets/style.css   (WRAP all rules in @layer + APPEND declaration)
│   └─ platform/assets/app.js      (APPEND IIFE Upg.layer ~140 lines)
├─ Sacred verify (run BEFORE):
│   ├─ wc -l platform/assets/style.css                            → ~23,500 (baseline)
│   ├─ grep -c '!important' platform/assets/style.css             → 221 (baseline — preserved)
│   ├─ grep -c '@layer' platform/assets/style.css                 → 0 (will become ≥6)
│   └─ grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l → 27
├─ Branch: NEW worker-23-devotio (from latest main, post W22 PR)
└─ No HTML changes. No content changes. Only WRAP.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — APPEND `@layer` Declaration at Top

في **بداية** `style.css`، **APPEND** قبل أول قاعدة:

```css
/* ════════════════════════════════════════════════════════════════════════
   DECONSTRUCTION v3 — @layer Cascade System (Worker 23 / Phase 1)
   ────────────────────────────────────────────────────────────────────────
   Order matters: later layers override earlier (cascade order).
   Pack v1/v2/v3 history wraps into these layers WITHOUT changing rules.
   Phase 2 will use this to purge ~80% of !important.
   ────────────────────────────────────────────────────────────────────────
   Layer purposes:
     1. reset      — browser reset (margin/padding/box-sizing)
     2. tokens     — :root variables (--color, --font, --tint, --chr-*, etc.)
     3. base       — html, body, typography defaults, focus, selection
     4. utilities  — atomic classes (tas-*, chr-*, rit-*, life-*, .h-*, etc.)
     5. components — building blocks (.bento-*, .qcalc-*, .cath-*, .glass-*)
     6. themes     — :root[data-theme="..."] overrides
     7. overrides  — @media print/reduced-motion/etc. + intentional !important
   ════════════════════════════════════════════════════════════════════════ */
@layer reset, tokens, base, utilities, components, themes, overrides;
```

### Step 2 — WRAP existing rules in layers

استراتيجية الـ WRAP **بدون تعديل أي قاعدة**:

#### 2.1 — Reset block (lines 1-50 of W11 / first :root before)

```css
@layer reset {
  /* Existing reset from Cathedral v16 W11 P1 — wrap unchanged */
  *, *::before, *::after { box-sizing: border-box; }
  html, body, h1, h2, h3, h4, h5, h6, p, ul, ol, figure { margin: 0; padding: 0; }
  /* ... etc, the original ~30-50 lines of reset ... */
}
```

#### 2.2 — Tokens block (all :root declarations)

```css
@layer tokens {
  :root {
    /* ALL original W11+W20+W21 tokens here, unchanged */
    --color-bg: ...;
    --color-surface-0: ...;
    /* Hundreds of tokens preserved verbatim */
  }
}
```

> **ملاحظة:** `:root[data-theme="dark"]` و `:root[data-theme="light"]` تَنقُل إلى `themes` layer (Step 2.6).

#### 2.3 — Base block

```css
@layer base {
  /* W12 P1 typography baseline + W20 P5 rhythm */
  html[lang="ar"], html[dir="rtl"] { ... }
  body { ... }
  h1, h2, h3, h4, h5, h6 { ... }
  /* etc. */
}
```

#### 2.4 — Utilities block

```css
@layer utilities {
  /* W12 P1B voice utilities */
  .h-display { ... }
  .h-title { ... }
  /* W20 P3 tas-voice utilities */
  .tas-voice-hero { ... }
  /* W20 P4 numeric utilities */
  .tas-num-tabular { ... }
  /* W21 P1 chromatic utilities */
  .chr-text-* { ... }
  .chr-bg-* { ... }
  /* W21 P4 gradient utilities */
  .chr-grad-* { ... }
  /* W22 P4 inkpot utilities */
  [data-rit-ink] { ... }
  /* W16 P1 life utilities */
  .life-* { ... }
}
```

#### 2.5 — Components block

```css
@layer components {
  /* All component-level rules from W11-W22 */
  .bento-card { ... }
  .qcalc-panel { ... }
  .cath-stat-row { ... }
  .glass-card { ... }
  .sidebar { ... }
  .top-chrome { ... }
  .page-h { ... }
  .rit-entry-portal { ... }
  /* ... all components ... */
}
```

#### 2.6 — Themes block

```css
@layer themes {
  :root[data-theme="dark"],
  html[data-theme="dark"],
  body[data-theme="dark"] {
    /* W21 P2 Mihrab dark — moves here */
  }
  :root[data-theme="light"] {
    /* W12 P2 Linen-Bone — moves here, untouched */
  }
}
```

#### 2.7 — Overrides block

```css
@layer overrides {
  @media (prefers-reduced-motion: reduce) {
    /* All ≥20 reduced-motion guards from W12-W22 */
  }
  @media print {
    /* W21 P5 print styles + future W24 P5 */
  }
  /* Intentional !important rules (the ones that will SURVIVE Phase 2) */
}
```

### Step 3 — Important Practical Approach

> **الواقع:** نَقل 23K-line manually في phase = مستحيل. الاستراتيجية الأمنة:

استخدم **comment-based markers** لتقسيم الـ blocks بدون تحريك:

```css
/* ═══════ START @layer reset ═══════ */
/* (existing reset rules) */
/* ═══════ END @layer reset ═══════ */
```

ثم استخدم **post-processing script** (في `scripts/`) يَلتقط هذي الـ markers ويَلفّ كل block بـ `@layer X { ... }`. الـ script يَكون one-shot — يُنفَّذ مرة في Phase 1 ثم لا يُحتاج.

#### Script: `scripts/add-css-layers.mjs`

```javascript
#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';

const CSS_PATH = 'platform/assets/style.css';
const css = readFileSync(CSS_PATH, 'utf8');

const LAYER_PATTERN = /\/\* ═+ START @layer (\w+) ═+ \*\/([\s\S]*?)\/\* ═+ END @layer \1 ═+ \*\//g;

const wrapped = css.replace(LAYER_PATTERN, (m, layerName, content) =>
  `@layer ${layerName} {\n${content.trim()}\n}\n`
);

writeFileSync(CSS_PATH, wrapped);
console.log('✓ All @layer markers wrapped successfully.');
```

استخدمه (one-shot):
```bash
node scripts/add-css-layers.mjs
```

> **ملاحظة:** هذا الـ script **لا يُحفَظ** بعد Phase 1 (نَحذفه في Phase 2). فقط أداة لاجتياز monolith بأمان.

### Step 4 — Apply markers (manually, surgical)

في `style.css`، أضف markers في 7 مواضع:

1. **قبل** أول قاعدة reset → `/* ═══════ START @layer reset ═══════ */`
2. **بعد** آخر قاعدة reset (~ line 50) → `/* ═══════ END @layer reset ═══════ */`
3. **قبل** `:root {` العام (line ~6 من W11 P1) → `/* ═══════ START @layer tokens ═══════ */`
4. **بعد** آخر :root العام (قبل html/body rules) → `/* ═══════ END @layer tokens ═══════ */`
5. **قبل** `html[lang="ar"]` (W20 P5) → `/* ═══════ START @layer base ═══════ */`
6. **بعد** آخر typography baseline rule → `/* ═══════ END @layer base ═══════ */`
7. ...نفس النمط لكل layer.

### Step 5 — Verify with `Upg.layer.audit()`

في `app.js`، **APPEND**:

```javascript
/* ════════════════════════════════════════════════════════════════════════
   DECONSTRUCTION v3 — Upg.layer API (Worker 23 / Phase 1)
   Programmatic introspection of CSS @layer cascade.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  const LAYERS = ['reset', 'tokens', 'base', 'utilities', 'components', 'themes', 'overrides'];

  // List declared layers
  const list = () => LAYERS.slice();

  // Audit which layers are actually populated
  const audit = () => {
    const result = {};
    LAYERS.forEach(name => result[name] = { rules: 0, populated: false });

    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSLayerBlockRule) {
            if (LAYERS.includes(rule.name)) {
              result[rule.name].rules += rule.cssRules.length;
              result[rule.name].populated = true;
            }
          }
        }
      } catch (e) {
        /* CORS-restricted sheet, skip */
      }
    }

    const total = Object.values(result).reduce((s, r) => s + r.rules, 0);
    return { total, byLayer: result };
  };

  // Get cascade order
  const cascadeOrder = () => {
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSLayerStatementRule) {
            return Array.from(rule.nameList);
          }
        }
      } catch { /* skip */ }
    }
    return null;
  };

  // Status for state snapshots
  const status = () => ({
    declared: cascadeOrder(),
    audit: audit(),
    important_count_target: 45,
    layer_system_active: true
  });

  window.Upg = window.Upg || {};
  window.Upg.layer = { list, audit, cascadeOrder, status };

  // Log on load
  document.addEventListener('DOMContentLoaded', () => {
    const a = audit();
    if (a.total > 0) {
      console.info(
        '%c🧱 DECONSTRUCTION v3 — @layer cascade active (%d rules across %d layers)',
        'color:#FFB87A; font-weight:bold;',
        a.total,
        Object.values(a.byLayer).filter(r => r.populated).length
      );
    }
  });
})(window, document);
```

### Step 6 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 23 / Phase 1 — Layer Discipline:
   1. ٧ layers ثابتة — لا تَخلق layer جديد بدون phase-spec.
   2. كل قاعدة جديدة بعد Phase 1 يجب أن تكون داخل @layer.
   3. القواعد الجذرية (:root tokens) في `tokens` layer.
   4. Theme overrides في `themes` layer.
   5. !important المتبقّية بعد Phase 2 توضع في `overrides` layer.
   6. لا تَحذف Phase 1 markers قبل Phase 3 (Phase 2-3 يستعملها).
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html               # → 14+
grep -c 'qcalc' platform/index.html                                # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 28 (was 27, +layer)

# @layer system
grep -c '@layer' platform/assets/style.css                        # → ≥7
grep -c '@layer reset' platform/assets/style.css                  # → ≥1
grep -c '@layer tokens' platform/assets/style.css                 # → ≥1

# !important preserved (will be purged in P2)
grep -c '!important' platform/assets/style.css                    # → ~221 (preserved baseline)

# Browser test:
# Console: Upg.layer.audit() → 7 layers populated
# Console: Upg.layer.cascadeOrder() → ['reset', 'tokens', 'base', 'utilities', 'components', 'themes', 'overrides']
# Visual: NO regression — every page looks identical to pre-P1
```

---

## ✅ معايير القبول (Phase 1)

- [ ] `@layer reset, tokens, base, utilities, components, themes, overrides;` declaration في بداية style.css.
- [ ] جميع قواعد W11-W22 ملفوفة بـ `@layer X { ... }` مناسب.
- [ ] صفر تغيير في سلوك بصري.
- [ ] صفر تغيير في عدد القواعد (count preserved).
- [ ] `Upg.layer` IIFE معرَّف.
- [ ] `Upg.layer.audit()` يَرجع 7 populated layers.
- [ ] Console: 0 errors.
- [ ] Visual regression: none.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/style.css platform/assets/app.js scripts/add-css-layers.mjs
git commit -m "phase 1 (devotio): css @layer cascade — 7 layers (reset/tokens/base/utilities/components/themes/overrides), Upg.layer API, all rules wrapped in-place"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-23-phase-1.json
git commit -m "state: devotio phase 1 (worker 23) committed and pushed"
# push immediately
```

— نهاية Phase 1.

🧱 **Devotion check:** هل الـ cascade الآن مُنظَّم؟ صفر regression؟ → Phase 2 (Important Purge).
