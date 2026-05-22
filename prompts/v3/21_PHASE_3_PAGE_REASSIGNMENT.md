# 🗺️ WORKER 21 — Phase 3/5 — Page Reassignment
> **اقرأ أولاً:** `prompts/v3/21_WORKER_CHROMATIC_SOUL.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phase 1 (palette ready) + Phase 2 (dark Mihrab applied).
> **الفلسفة:** *كل صفحة تستحق صبغة تحكي عنها. لا نُلوّن صدفةً — نُلوّن بحُكم. Callcenter حادّ كالدمشقي، Psych عميق كالنِيلي، Customercare دافئ كاللؤلؤ.*

---

## 🛡️ Preservation Contract (Phase 3)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` `:root` — `--tint-*` | **REPLACE-IN-PLACE** قيم 15 `--tint-*` (أسماء محفوظة، قيم تتغيّر من aurora-derived إلى chr-* references) | تغيير أسماء، حذف tints |
| `style.css` `:root` | **APPEND** 15 `--tint-edge-*` token جديد (للـ gradient secondary stop) | تعديل tokens قائمة |
| `style.css` rules | **APPEND** 15 personality color override blocks | تعديل قواعد قائمة |
| `app.js` | **APPEND** IIFE `Upg.chroma` (~120 سطر) | تعديل IIFEs قائمة |
| `index.html` | لا يُلمَس (data-page-personality موجود من Pack v1/v2) | تغيير DOM |

**Sacred preserved:**
- جميع `--tint-*` names.
- جميع 15 `data-page-personality` في HTML.
- جميع 12 palettes من Phase 1.
- جميع W21 P2 dark Mihrab.

---

## 🎯 الهدف

Phase 3 يربط الـ ١٢ صبغة بالـ ١٥ صفحة:

| Tint Token | Color (الصبغة) | Hue/Stop | Justification |
|---|---|---|---|
| `--tint-dashboard` | Saffron 500 | warm gold | الذهب اليومي — dashboard هو ذهبك |
| `--tint-callcenter` | Damascus 500 | cool steel | السيوف الدمشقية — حدّة + اتزان |
| `--tint-fieldsales` | Silt 500 | warm earth | طمي العمل — الأرض الخصبة |
| `--tint-accountmgr` | Cedar 600 | forest green | أرز الثبات — التنفيذي الراسخ |
| `--tint-social` | Coral 500 | vibrant red-orange | المرجان الحي |
| `--tint-lab` | Marble 500 | warm off-white | البتراء — التجريب الحجري |
| `--tint-psych` | Lapis 500 | deep blue | لازوردي قبة الصخرة — العمق |
| `--tint-eq` | Mihrab 600 | violet-indigo | محراب التأمل |
| `--tint-negotiation` | Damascus 700 | dark steel | السيف المضغوط |
| `--tint-customercare` | Pearl 500 | soft cool | اللؤلؤ — الدفء النقي |
| `--tint-programming` | Indigo 600 | deep violet-blue | اليمن في الليل — العمق التقني |
| `--tint-accounting` | Palm 500 | olive green | النخيل — الجذور المالية |
| `--tint-phonerepair` | Henna 600 | warm rust | حِنّاء الأعراس — الحرفة اليدوية |
| `--tint-hrmastery` | Henna 500 | warm red | حِنّاء — الإنساني الدافئ |
| `--tint-myprogress` | Lapis 400 | medium blue | لازوردي خفيف — التأمل الشخصي |
| `--tint-curriculum` | Saffron 600 | deeper gold | الذهب التعليمي |

---

## 📋 PRE-FLIGHT

```
📋 PHASE 3 PRE-FLIGHT (Worker 21 / CHROMATIC SOUL)
├─ Phase: 3/5 — Page Reassignment
├─ Estimated lines: ~460 (CSS REPLACE 15 tints ~80 + APPEND 15 personality blocks ~250 + JS Upg.chroma ~130)
├─ Files to touch:
│   ├─ platform/assets/style.css   (REPLACE 15 --tint-* values + APPEND personality overrides)
│   └─ platform/assets/app.js      (APPEND IIFE Upg.chroma)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '\-\-tint-' platform/assets/style.css               → ≥15
│   ├─ grep -c '\-\-chr-' platform/assets/style.css                → ≥120 (Phase 1)
│   ├─ grep -c 'data-page-personality' platform/index.html         → 15
│   └─ grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l → 25
├─ Branch: continue worker-21-devotio
└─ No HTML changes — all reassignment via CSS + JS.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Locate existing `--tint-*` block

```bash
grep -n '\-\-tint-callcenter:' platform/assets/style.css
# يظهر السطر — عادة في :root العام
```

### Step 2 — REPLACE-IN-PLACE قيم 15 `--tint-*`

استبدل البلوك بالكامل:

```css
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Identity Tint Reassignment (Worker 21 / Phase 3)
   ────────────────────────────────────────────────────────────────────────
   Names preserved (Pack v1/v2 binding intact). Values rerouted to chr-*.
   ════════════════════════════════════════════════════════════════════════ */
:root {
  /* Primary tints — main color per page */
  --tint-dashboard:     var(--chr-saffron-500);   /* gold */
  --tint-callcenter:    var(--chr-damascus-500);  /* damascus steel */
  --tint-fieldsales:    var(--chr-silt-500);      /* nile silt */
  --tint-accountmgr:    var(--chr-cedar-600);     /* cedar */
  --tint-social:        var(--chr-coral-500);     /* coral */
  --tint-lab:           var(--chr-marble-500);    /* marble */
  --tint-psych:         var(--chr-lapis-500);     /* lapis */
  --tint-eq:            var(--chr-mihrab-600);    /* mihrab */
  --tint-negotiation:   var(--chr-damascus-700);  /* dark damascus */
  --tint-customercare:  var(--chr-pearl-500);     /* pearl */
  --tint-programming:   var(--chr-indigo-600);    /* indigo */
  --tint-accounting:    var(--chr-palm-500);      /* date palm */
  --tint-phonerepair:   var(--chr-henna-600);     /* deep henna */
  --tint-hrmastery:     var(--chr-henna-500);     /* henna */
  --tint-myprogress:    var(--chr-lapis-400);     /* light lapis */
  --tint-curriculum:    var(--chr-saffron-600);   /* deep saffron */

  /* Edge tints — secondary color for gradients (Phase 4 uses these) */
  --tint-edge-dashboard:    var(--chr-saffron-700);
  --tint-edge-callcenter:   var(--chr-damascus-700);
  --tint-edge-fieldsales:   var(--chr-silt-700);
  --tint-edge-accountmgr:   var(--chr-cedar-800);
  --tint-edge-social:       var(--chr-coral-700);
  --tint-edge-lab:          var(--chr-marble-700);
  --tint-edge-psych:        var(--chr-lapis-700);
  --tint-edge-eq:           var(--chr-mihrab-800);
  --tint-edge-negotiation:  var(--chr-damascus-900);
  --tint-edge-customercare: var(--chr-pearl-700);
  --tint-edge-programming:  var(--chr-indigo-800);
  --tint-edge-accounting:   var(--chr-palm-700);
  --tint-edge-phonerepair:  var(--chr-henna-800);
  --tint-edge-hrmastery:    var(--chr-henna-700);
  --tint-edge-myprogress:   var(--chr-lapis-600);
  --tint-edge-curriculum:   var(--chr-saffron-800);

  /* Soft tints — for hover backgrounds (subtle hint of identity) */
  --tint-soft-dashboard:    var(--chr-saffron-100);
  --tint-soft-callcenter:   var(--chr-damascus-100);
  --tint-soft-fieldsales:   var(--chr-silt-100);
  --tint-soft-accountmgr:   var(--chr-cedar-100);
  --tint-soft-social:       var(--chr-coral-100);
  --tint-soft-lab:          var(--chr-marble-100);
  --tint-soft-psych:        var(--chr-lapis-100);
  --tint-soft-eq:           var(--chr-mihrab-100);
  --tint-soft-negotiation:  var(--chr-damascus-200);
  --tint-soft-customercare: var(--chr-pearl-100);
  --tint-soft-programming:  var(--chr-indigo-100);
  --tint-soft-accounting:   var(--chr-palm-100);
  --tint-soft-phonerepair:  var(--chr-henna-100);
  --tint-soft-hrmastery:    var(--chr-henna-100);
  --tint-soft-myprogress:   var(--chr-lapis-50);
  --tint-soft-curriculum:   var(--chr-saffron-200);
}
```

### Step 3 — APPEND Personality Color Overrides

**APPEND** بعد الـ tints:

```css
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Personality Color Overrides (Worker 21 / Phase 3)
   ────────────────────────────────────────────────────────────────────────
   Each [data-page-personality="X"] sets --color-tint and --color-tint-edge.
   Existing W12-W19 selectors continue to work (they consume --color-tint).
   ════════════════════════════════════════════════════════════════════════ */

[data-page-personality="dashboard"] {
  --color-tint:       var(--tint-dashboard);
  --color-tint-edge:  var(--tint-edge-dashboard);
  --color-tint-soft:  var(--tint-soft-dashboard);
  --chr-active-tint:  var(--tint-dashboard);
}

[data-page-personality="callcenter"] {
  --color-tint:       var(--tint-callcenter);
  --color-tint-edge:  var(--tint-edge-callcenter);
  --color-tint-soft:  var(--tint-soft-callcenter);
  --chr-active-tint:  var(--tint-callcenter);
}

[data-page-personality="fieldsales"] {
  --color-tint:       var(--tint-fieldsales);
  --color-tint-edge:  var(--tint-edge-fieldsales);
  --color-tint-soft:  var(--tint-soft-fieldsales);
  --chr-active-tint:  var(--tint-fieldsales);
}

[data-page-personality="accountmgr"] {
  --color-tint:       var(--tint-accountmgr);
  --color-tint-edge:  var(--tint-edge-accountmgr);
  --color-tint-soft:  var(--tint-soft-accountmgr);
  --chr-active-tint:  var(--tint-accountmgr);
}

[data-page-personality="social"] {
  --color-tint:       var(--tint-social);
  --color-tint-edge:  var(--tint-edge-social);
  --color-tint-soft:  var(--tint-soft-social);
  --chr-active-tint:  var(--tint-social);
}

[data-page-personality="lab"] {
  --color-tint:       var(--tint-lab);
  --color-tint-edge:  var(--tint-edge-lab);
  --color-tint-soft:  var(--tint-soft-lab);
  --chr-active-tint:  var(--tint-lab);
}

[data-page-personality="psych"] {
  --color-tint:       var(--tint-psych);
  --color-tint-edge:  var(--tint-edge-psych);
  --color-tint-soft:  var(--tint-soft-psych);
  --chr-active-tint:  var(--tint-psych);
}

[data-page-personality="eq"] {
  --color-tint:       var(--tint-eq);
  --color-tint-edge:  var(--tint-edge-eq);
  --color-tint-soft:  var(--tint-soft-eq);
  --chr-active-tint:  var(--tint-eq);
}

[data-page-personality="negotiation"] {
  --color-tint:       var(--tint-negotiation);
  --color-tint-edge:  var(--tint-edge-negotiation);
  --color-tint-soft:  var(--tint-soft-negotiation);
  --chr-active-tint:  var(--tint-negotiation);
}

[data-page-personality="customercare"] {
  --color-tint:       var(--tint-customercare);
  --color-tint-edge:  var(--tint-edge-customercare);
  --color-tint-soft:  var(--tint-soft-customercare);
  --chr-active-tint:  var(--tint-customercare);
}

[data-page-personality="programming"] {
  --color-tint:       var(--tint-programming);
  --color-tint-edge:  var(--tint-edge-programming);
  --color-tint-soft:  var(--tint-soft-programming);
  --chr-active-tint:  var(--tint-programming);
}

[data-page-personality="accounting"] {
  --color-tint:       var(--tint-accounting);
  --color-tint-edge:  var(--tint-edge-accounting);
  --color-tint-soft:  var(--tint-soft-accounting);
  --chr-active-tint:  var(--tint-accounting);
}

[data-page-personality="phonerepair"] {
  --color-tint:       var(--tint-phonerepair);
  --color-tint-edge:  var(--tint-edge-phonerepair);
  --color-tint-soft:  var(--tint-soft-phonerepair);
  --chr-active-tint:  var(--tint-phonerepair);
}

[data-page-personality="hrmastery"] {
  --color-tint:       var(--tint-hrmastery);
  --color-tint-edge:  var(--tint-edge-hrmastery);
  --color-tint-soft:  var(--tint-soft-hrmastery);
  --chr-active-tint:  var(--tint-hrmastery);
}

[data-page-personality="myprogress"] {
  --color-tint:       var(--tint-myprogress);
  --color-tint-edge:  var(--tint-edge-myprogress);
  --color-tint-soft:  var(--tint-soft-myprogress);
  --chr-active-tint:  var(--tint-myprogress);
}

[data-page-personality="curriculum"] {
  --color-tint:       var(--tint-curriculum);
  --color-tint-edge:  var(--tint-edge-curriculum);
  --color-tint-soft:  var(--tint-soft-curriculum);
  --chr-active-tint:  var(--tint-curriculum);
}
```

### Step 4 — `Upg.chroma` IIFE في app.js

**APPEND** في النهاية:

```javascript
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Upg.chroma API (Worker 21 / Phase 3)
   Programmatic introspection + control of color system.
   Additive: preserves all 25 existing Upg.* APIs.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  const PALETTES = [
    { id: 'lapis',     ar: 'لازوردي',  hue: 252, baseStop: 500, useFor: ['psych','myprogress'] },
    { id: 'damascus',  ar: 'دمشقي',    hue: 220, baseStop: 500, useFor: ['callcenter','negotiation'] },
    { id: 'henna',     ar: 'حنّاء',    hue: 28,  baseStop: 500, useFor: ['hrmastery','phonerepair'] },
    { id: 'saffron',   ar: 'زعفران',   hue: 78,  baseStop: 500, useFor: ['dashboard','curriculum'] },
    { id: 'palm',      ar: 'نَخيل',    hue: 130, baseStop: 500, useFor: ['accounting'] },
    { id: 'pearl',     ar: 'لؤلؤ',    hue: 220, baseStop: 500, useFor: ['customercare'] },
    { id: 'indigo',    ar: 'نِيلي',    hue: 270, baseStop: 600, useFor: ['programming'] },
    { id: 'coral',     ar: 'مرجان',   hue: 28,  baseStop: 500, useFor: ['social'] },
    { id: 'silt',      ar: 'طمي',     hue: 60,  baseStop: 500, useFor: ['fieldsales'] },
    { id: 'cedar',     ar: 'أرز',     hue: 160, baseStop: 600, useFor: ['accountmgr'] },
    { id: 'mihrab',    ar: 'محراب',   hue: 280, baseStop: 600, useFor: ['eq','dark-base'] },
    { id: 'marble',    ar: 'رخام',    hue: 80,  baseStop: 500, useFor: ['lab'] }
  ];

  const PAGE_TINTS = {
    'dashboard':   { color: 'saffron', stop: 500 },
    'callcenter':  { color: 'damascus', stop: 500 },
    'fieldsales':  { color: 'silt', stop: 500 },
    'accountmgr':  { color: 'cedar', stop: 600 },
    'social':      { color: 'coral', stop: 500 },
    'lab':         { color: 'marble', stop: 500 },
    'psych':       { color: 'lapis', stop: 500 },
    'eq':          { color: 'mihrab', stop: 600 },
    'negotiation': { color: 'damascus', stop: 700 },
    'customercare':{ color: 'pearl', stop: 500 },
    'programming': { color: 'indigo', stop: 600 },
    'accounting':  { color: 'palm', stop: 500 },
    'phonerepair': { color: 'henna', stop: 600 },
    'hrmastery':   { color: 'henna', stop: 500 },
    'myprogress':  { color: 'lapis', stop: 400 },
    'curriculum':  { color: 'saffron', stop: 600 }
  };

  // List palettes
  const list = () => PALETTES.map(p => ({ ...p }));

  // Get tint for a page
  const getPageTint = (pageId) => {
    const stripped = pageId.replace(/^page-/, '');
    return PAGE_TINTS[stripped] || null;
  };

  // Get all tint mappings
  const tints = () => ({ ...PAGE_TINTS });

  // Audit which pages have personality + tint
  const audit = () => {
    const pages = document.querySelectorAll('[data-page-personality]');
    const result = { applied: [], missing: [] };
    pages.forEach((el) => {
      const p = el.getAttribute('data-page-personality');
      if (PAGE_TINTS[p]) result.applied.push(p);
      else result.missing.push(p);
    });
    return {
      total: pages.length,
      applied: [...new Set(result.applied)],
      missing: [...new Set(result.missing)]
    };
  };

  // Get computed --color-tint for active page
  const getCurrentTint = () => {
    const activePage = document.querySelector('section.page:not([hidden])');
    if (!activePage) return null;
    const cs = getComputedStyle(activePage);
    return {
      pageId: activePage.id,
      personality: activePage.getAttribute('data-page-personality'),
      tint: cs.getPropertyValue('--color-tint').trim(),
      tintEdge: cs.getPropertyValue('--color-tint-edge').trim(),
      tintSoft: cs.getPropertyValue('--color-tint-soft').trim(),
      activeTint: cs.getPropertyValue('--chr-active-tint').trim()
    };
  };

  // Resolve a chr-* token to its current oklch value
  const resolveColor = (cssVarName) => {
    if (!cssVarName.startsWith('--')) cssVarName = '--' + cssVarName;
    return getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim();
  };

  // Status
  const status = () => {
    const rs = getComputedStyle(document.documentElement);
    return {
      stage:           rs.getPropertyValue('--chr-stage').trim().replace(/['"]/g, ''),
      palettes_count:  rs.getPropertyValue('--chr-palettes-count').trim().replace(/['"]/g, ''),
      stops_per:       rs.getPropertyValue('--chr-stops-per-palette').trim().replace(/['"]/g, ''),
      theme:           document.documentElement.getAttribute('data-theme') ||
                       document.body.getAttribute('data-theme') || 'unknown'
    };
  };

  // Expose API
  window.Upg = window.Upg || {};
  window.Upg.chroma = {
    list, tints, getPageTint, audit, getCurrentTint, resolveColor, status,
    PALETTES: PALETTES.slice(),
    PAGE_TINTS: { ...PAGE_TINTS }
  };

  // Log on load
  document.addEventListener('DOMContentLoaded', () => {
    const a = audit();
    if (a.applied.length === 15 || a.applied.length === 16) {  // 15 + curriculum
      console.info(
        '%c🎨 CHROMATIC SOUL v3 — %d Arabic palettes, %d pages assigned, theme: %s',
        'color:#7BBFFF; font-weight:bold;',
        12,
        a.applied.length,
        status().theme
      );
    }
  });
})(window, document);
```

### Step 5 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 21 / Phase 3 — Reassignment Discipline:
   1. لا تغيّر اسم --tint-* — Pack v1/v2/W20 يستهلكها.
   2. كل personality له tint + tint-edge + tint-soft.
   3. لو احتجت صبغة جديدة لصفحة، اختر من palette الـ 12 — لا تخترع.
   4. --chr-active-tint مرادف لـ --color-tint (للتوافق مع نظام Pack v3).
   5. Phase 4 سيستعمل --tint-edge-* في gradients — لا تحذف edges.
   6. ramp 9 stops لكل لون — لو احتجت stop خارج، اختر أقرب.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
# Sacred preserved
grep -c '\-\-tint-' platform/assets/style.css                     # → ≥45 (15 primary + 15 edge + 15 soft)
grep -c 'data-page-personality' platform/index.html               # → 15
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 26 (was 25, +chroma)

# tints now reference chr-*
grep -E '\-\-tint-(dashboard|callcenter|psych):' platform/assets/style.css | grep -c 'var(\-\-chr-'  # → 3

# personality blocks
grep -c '\[data-page-personality="' platform/assets/style.css     # → ≥30 (15 from W15 P6 + 15 new from W21 P3)

# Browser test:
# Console: Upg.chroma.audit() → { total: 16, applied: [16 names], missing: [] }
# Console: Upg.chroma.getCurrentTint() — returns tint info for active page
# Visual: navigate → callcenter feels "damascus steel", psych feels "lapis blue"
```

---

## ✅ معايير القبول (Phase 3)

- [ ] 15 `--tint-*` rerouted إلى `var(--chr-*)`.
- [ ] 15 `--tint-edge-*` معرَّفة (للـ gradient).
- [ ] 15 `--tint-soft-*` معرَّفة (للـ hover bg).
- [ ] 15 personality color overrides (`[data-page-personality="X"]` blocks).
- [ ] `Upg.chroma` IIFE معرَّف، يصدّر `list, tints, getPageTint, audit, getCurrentTint, resolveColor, status`.
- [ ] Console log: "🎨 CHROMATIC SOUL v3 — 12 Arabic palettes, X pages assigned".
- [ ] جميع W15 P6 personality blocks تستهلك الـ tints الجديدة (لأنها تستعمل `var(--color-tint)`).
- [ ] Console: 0 errors.
- [ ] Visual: 16 pages تشعر مختلفة بصرياً (Mihrab purple psych، Lapis blue myprogress، Coral red social، إلخ).

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/style.css platform/assets/app.js
git commit -m "phase 3 (devotio): page reassignment — 15 tints rerouted to chr-* palettes, 15 personality overrides, Upg.chroma API"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-21-phase-3.json
git commit -m "state: devotio phase 3 (worker 21) committed and pushed"
# push immediately
```

— نهاية Phase 3.

🎨 **Devotion check:** هل ١٥ صفحة تحس مختلفة الآن؟ الـ tints حقيقية لا aurora-derived؟ → Phase 4 (Gradient Recast).
