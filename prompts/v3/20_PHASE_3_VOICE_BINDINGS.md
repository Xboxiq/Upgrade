# 🔗 WORKER 20 — Phase 3/6 — Voice Bindings
> **اقرأ أولاً:** `prompts/v3/20_WORKER_TASMEEM_RECONSTRUCTION.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Phase 1 (CDN removed) + Phase 2 (local fonts loaded).
> **الفلسفة:** *الخطوط حاضرة. الأصوات حاضرة. هذه اللحظة هي العقد بينهما — كل voice يعرف خطه، كل خط يعرف دوره.*

---

## 🛡️ Preservation Contract (Phase 3)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` `:root` | **REPLACE-IN-PLACE** قيم الـ 6 إعادات لـ `--font-display` (تجميعها في تعريف واحد نظيف) + قيم الـ 18 `--type-voice-*` للإشارة للخطوط المحلية | تغيير أسماء tokens، حذف tokens |
| `style.css` rules | **APPEND** كتلة `tas-*` utility classes في النهاية (~140 سطر) | تعديل قواعد قائمة من W12-W19 |
| `index.html` | **REMOVE** transitional banner من Phase 1 + UPDATE `--tasmeem-fonts-status: "phase-3-bound"` | تعديل أي شي آخر |
| `app.js` | **APPEND** IIFE `Upg.font` (~120 سطر) في النهاية | لمس IIFEs قائمة |

**Sacred preserved:**
- جميع 18 W15 voice tokens (الأسماء، نُعدّل القيم فقط)
- جميع W12 + W15 voice bindings (`.h-display`, `.type-hero`, `.h-quote`, ...)
- 14 page sections + 391 qcalc + 24 Upg.* APIs
- Cairo + Reem Kufi + Aref Ruqaa + كل family في الـ stacks

> **هذي اللحظة الكبرى:** بنهاية Phase 3، المنصة تعود لـ"شكلها الأصلي البصري" لكن من خطوط محلية. transitional banner يختفي. كل voice يعمل بخطه المُكلَّف.

---

## 🎯 الهدف

Phase 3 يربط كل ما سبق:

1. **REPLACE-IN-PLACE** قيم الـ ٦ إعادات لـ `--font-display` (دمجها في كتلة واحدة نظيفة في `:root`).
2. **REPLACE-IN-PLACE** قيم الـ 18 `--type-voice-*` للإشارة للخطوط المحلية.
3. **REMOVE** الـ phantom "Thmanyah" من جميع الـ stacks (نستبدلها بـ Aref Ruqaa الحقيقية).
4. **APPEND** Upg.font IIFE: list, swap, audit, getLoadedFamilies.
5. **APPEND** tas-* utility classes (`.tas-voice-hero`, `.tas-voice-display`, `.tas-voice-body`, `.tas-voice-ui`, `.tas-voice-numeric`, `.tas-voice-code`, `.tas-voice-accent`, `.tas-voice-quote`, `.tas-voice-latin`, `.tas-voice-eyebrow`, `.tas-voice-signature`, `.tas-voice-ribbon`).
6. **REMOVE** transitional banner + UPDATE `--tasmeem-fonts-status` للإشارة لاكتمال الربط.

> Phase 3 = العقد. Phase 4-6 = صقل.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 3 PRE-FLIGHT (Worker 20 / TASMEEM)
├─ Phase: 3/6 — Voice Bindings
├─ Estimated lines: ~500 (CSS ~340 + JS ~120 + HTML ~10 cleanup)
├─ Files to touch:
│   ├─ platform/assets/style.css   (REPLACE 6 --font-display blocks → 1 + REPLACE 18 voice values + APPEND ~140 utility lines)
│   ├─ platform/assets/app.js      (APPEND IIFE Upg.font ~120 lines)
│   └─ platform/index.html         (REMOVE transitional banner div)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '@font-face' platform/assets/style.css              → ≥18 (from P2)
│   ├─ grep -c '\-\-type-voice-' platform/assets/style.css         → ≥18 (W15 preserved)
│   ├─ grep -c 'fonts.googleapis.com' platform/index.html          → 0
│   ├─ grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l → 24
│   └─ grep -c 'tasmeem-transitional-banner' platform/index.html   → 1 (from P1, will be 0 after P3)
├─ Branch: continue worker-20-devotio
└─ After P3: المنصة تعمل بخطوط محلية بالكامل، الـ banner يختفي.
```

---

## 🧱 خطوات التنفيذ (بالترتيب)

### Step 1 — Collapse 6 `--font-display` redefinitions

ابحث في `style.css` عن السطور التالية واحذف الـ ٥ الأولى، احتفظ بـ block واحد جديد:

```bash
grep -n "^\s*--font-display:" platform/assets/style.css
# Output expected (lines may shift):
# 16010:  --font-display: ...
# 16265:  --font-display: ...
# 19706:  --font-display: ...
# 19896:  --font-display: ...
# 20060:  --font-display: ...
# 20131:  --font-display: ...
```

**REPLACE-IN-PLACE** كل البلوكات الـ 6 بكتلة واحدة في **بداية** الـ `:root` (بعد `@font-face` declarations من Phase 2):

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Voice Bindings (Worker 20 / Phase 3)
   ────────────────────────────────────────────────────────────────────────
   Single source of truth for --font-* and --type-voice-* tokens.
   All values reference LOCAL fonts loaded in Phase 2.
   This block REPLACES the 6 redundant redefinitions from W12 P1, P1B, W15 P2-P6.
   ════════════════════════════════════════════════════════════════════════ */
:root {
  /* ─── Local Font References (single source) ─── */
  --font-aref-ruqaa:        "Aref Ruqaa", serif;
  --font-reem-kufi:         "Reem Kufi", sans-serif;
  --font-cairo:             "Cairo", sans-serif;
  --font-tajawal:           "Tajawal", sans-serif;
  --font-ibm-plex-arabic:   "IBM Plex Sans Arabic", sans-serif;
  --font-readex-pro:        "Readex Pro", sans-serif;
  --font-inter:             "Inter", sans-serif;
  --font-jetbrains-mono:    "JetBrains Mono", ui-monospace, monospace;
  --font-fraunces:          "Fraunces", serif;

  /* ─── Cathedral v16 Compatibility Stacks (Pack v1/v2 backward) ─── */
  /* These tokens existed in W12+W15. Values now route to local fonts. */
  --font-display:    var(--font-reem-kufi),
                     var(--font-aref-ruqaa),
                     var(--font-cairo),
                     "SF Arabic", -apple-system, BlinkMacSystemFont,
                     "Segoe UI", Roboto, sans-serif;

  --font-text:       var(--font-readex-pro),
                     var(--font-ibm-plex-arabic),
                     var(--font-tajawal),
                     var(--font-cairo),
                     "SF Arabic", -apple-system, sans-serif;

  --font-numeric:    var(--font-ibm-plex-arabic),
                     var(--font-jetbrains-mono),
                     var(--font-readex-pro),
                     var(--font-cairo),
                     "SF Mono", monospace;

  --font-accent:     var(--font-aref-ruqaa),
                     var(--font-reem-kufi),
                     var(--font-cairo),
                     "Times New Roman", serif;

  --font-mono:       var(--font-jetbrains-mono),
                     "SF Mono", ui-monospace, "Cascadia Mono",
                     "Segoe UI Mono", monospace;

  /* ─── Resonance v2 Voice Tokens (W15) — Routed to Local Fonts ─── */
  --type-voice-hero:        var(--font-aref-ruqaa),
                            var(--font-reem-kufi),
                            var(--font-cairo), serif;
  --type-voice-display:     var(--font-reem-kufi),
                            var(--font-aref-ruqaa),
                            var(--font-cairo), sans-serif;
  --type-voice-display-h:   var(--font-reem-kufi),
                            var(--font-cairo), sans-serif;
  --type-voice-display-l:   var(--font-reem-kufi),
                            var(--font-cairo), sans-serif;
  --type-voice-body:        var(--font-readex-pro),
                            var(--font-ibm-plex-arabic),
                            var(--font-cairo), sans-serif;
  --type-voice-body-lead:   var(--font-readex-pro),
                            var(--font-ibm-plex-arabic),
                            var(--font-cairo), sans-serif;
  --type-voice-ui:          var(--font-tajawal),
                            var(--font-readex-pro),
                            var(--font-cairo), sans-serif;
  --type-voice-label:       var(--font-tajawal),
                            var(--font-cairo), sans-serif;
  --type-voice-numeric:     var(--font-ibm-plex-arabic),
                            var(--font-jetbrains-mono), monospace;
  --type-voice-num-tabular: var(--font-jetbrains-mono),
                            var(--font-ibm-plex-arabic), monospace;
  --type-voice-code:        var(--font-jetbrains-mono),
                            "SF Mono", monospace;
  --type-voice-accent:      var(--font-aref-ruqaa),
                            var(--font-cairo), serif;
  --type-voice-eyebrow:     var(--font-aref-ruqaa),
                            var(--font-cairo), serif;
  --type-voice-signature:   var(--font-aref-ruqaa),
                            var(--font-cairo), serif;
  --type-voice-ribbon:      var(--font-aref-ruqaa),
                            var(--font-cairo), serif;
  --type-voice-quote:       var(--font-fraunces),
                            var(--font-readex-pro),
                            "Times New Roman", serif;
  --type-voice-latin:       var(--font-inter),
                            -apple-system, BlinkMacSystemFont, sans-serif;
  --type-voice-wordmark:    var(--font-aref-ruqaa),
                            var(--font-reem-kufi),
                            var(--font-cairo), serif;

  /* ─── Phase 3 status ─── */
  --tasmeem-stage:                  "phase-3-bound";
  --tasmeem-fonts-status:           "phase-3-bound";
  --tasmeem-fonts-local-loaded:     "9/9";
  --tasmeem-google-fonts-link-count: "0";
}
/* End TASMEEM v3 / Phase 3 — Voice Bindings ─────────────────────────── */
```

### Step 2 — Verify the 5 dead `--font-display` lines are removed

بعد الـ REPLACE، نفّذ:

```bash
grep -n "^\s*--font-display:" platform/assets/style.css
# Expected: only 1 line remains, in the new TASMEEM v3 block
```

### Step 3 — Remove "Thmanyah" phantom from any remaining stack

ابحث:
```bash
grep -n "Thmanyah" platform/assets/style.css
```

أي مكان يظهر فيه "Thmanyah" يُحذف نصياً من الـ stack (يبقى Aref Ruqaa مكانه).

> ملاحظة: نُبقي **مجلد** `platform/assets/fonts/thmanyah/` و README فيه (موجودين سابقاً) — للأرشيف والتوثيق. لا نحذف الملف، فقط نزيل المرجع من CSS.

### Step 4 — APPEND tas-* Utility Classes

في `style.css`، **APPEND** بعد كتلة Voice Bindings:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Voice Utility Classes (Worker 20 / Phase 3)
   Each class binds one type voice. Use in HTML to apply consistent typography.
   These complement (not replace) W12/W15 .h-* and .type-* classes.
   ════════════════════════════════════════════════════════════════════════ */

.tas-voice-hero,
[data-tas-voice="hero"] {
  font-family: var(--type-voice-hero);
  font-weight: 700;
  font-feature-settings: "kern" 1, "liga" 1, "dlig" 1;
  letter-spacing: -0.01em;
  line-height: 1.1;
  padding-block: 0.05em;  /* Aref Ruqaa ascenders breathing room */
}

.tas-voice-display,
[data-tas-voice="display"] {
  font-family: var(--type-voice-display);
  font-weight: 700;
  font-feature-settings: "kern" 1, "liga" 1;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.tas-voice-display-h {
  font-family: var(--type-voice-display-h);
  font-weight: 600;
  letter-spacing: -0.012em;
  line-height: 1.2;
}

.tas-voice-body,
[data-tas-voice="body"] {
  font-family: var(--type-voice-body);
  font-weight: 400;
  font-feature-settings: "kern" 1, "liga" 1;
  letter-spacing: 0;
  line-height: 1.65;  /* Arabic body breathes more than Latin */
}

.tas-voice-body-lead {
  font-family: var(--type-voice-body-lead);
  font-weight: 500;
  letter-spacing: -0.005em;
  line-height: 1.55;
}

.tas-voice-ui,
[data-tas-voice="ui"] {
  font-family: var(--type-voice-ui);
  font-weight: 500;
  font-feature-settings: "kern" 1;
  letter-spacing: 0;
  line-height: 1.4;
}

.tas-voice-label {
  font-family: var(--type-voice-label);
  font-weight: 600;
  font-feature-settings: "kern" 1;
  letter-spacing: 0.005em;
  line-height: 1.3;
  text-transform: none;  /* Arabic doesn't have caps */
}

.tas-voice-numeric,
[data-tas-voice="numeric"] {
  font-family: var(--type-voice-numeric);
  font-weight: 500;
  font-feature-settings: "tnum" 1, "lnum" 1, "kern" 1;
  letter-spacing: 0;
  font-variant-numeric: tabular-nums lining-nums;
}

.tas-voice-num-tabular {
  font-family: var(--type-voice-num-tabular);
  font-weight: 500;
  font-feature-settings: "tnum" 1, "lnum" 1, "ss01" 1;
  font-variant-numeric: tabular-nums lining-nums;
  letter-spacing: 0;
}

.tas-voice-code,
[data-tas-voice="code"] {
  font-family: var(--type-voice-code);
  font-weight: 400;
  font-feature-settings: "calt" 1, "liga" 1;
  letter-spacing: 0;
  line-height: 1.5;
  tab-size: 2;
}

.tas-voice-accent,
[data-tas-voice="accent"] {
  font-family: var(--type-voice-accent);
  font-weight: 400;
  font-feature-settings: "kern" 1, "liga" 1, "dlig" 1;
  font-style: normal;  /* Aref Ruqaa has no italic */
}

.tas-voice-eyebrow {
  font-family: var(--type-voice-eyebrow);
  font-weight: 400;
  font-size: var(--text-xs, 0.75rem);
  letter-spacing: 0.05em;
  line-height: 1.3;
  font-style: normal;
}

.tas-voice-signature {
  font-family: var(--type-voice-signature);
  font-weight: 700;
  font-style: normal;
  letter-spacing: -0.005em;
}

.tas-voice-ribbon {
  font-family: var(--type-voice-ribbon);
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.02em;
}

.tas-voice-quote,
[data-tas-voice="quote"] {
  font-family: var(--type-voice-quote);
  font-weight: 400;
  font-feature-settings: "kern" 1, "liga" 1, "dlig" 1, "swsh" 1;
  font-style: italic;
  letter-spacing: 0;
  line-height: 1.55;
}

.tas-voice-latin,
[data-tas-voice="latin"] {
  font-family: var(--type-voice-latin);
  font-weight: 400;
  font-feature-settings: "kern" 1, "ss01" 1;  /* Inter alt-1 stylistic */
  letter-spacing: 0;
}

.tas-voice-wordmark {
  font-family: var(--type-voice-wordmark);
  font-weight: 700;
  font-feature-settings: "kern" 1, "liga" 1, "dlig" 1;
  letter-spacing: -0.005em;
  line-height: 1.0;
  font-size: 1.05em;  /* Aref Ruqaa optical size adjustment */
  font-style: normal;
}

/* ─── Discipline ─── */
.tas-voice-hero,
.tas-voice-wordmark,
.tas-voice-eyebrow,
.tas-voice-signature,
.tas-voice-ribbon,
.tas-voice-accent {
  font-style: normal !important;  /* Aref Ruqaa: no italic possible */
}

/* End TASMEEM v3 / Phase 3 — Voice Utility Classes ────────────────────── */
```

### Step 5 — REMOVE Transitional Banner من Phase 1

في `index.html`:

```html
<!-- DELETE the following block (added in Phase 1): -->
<div id="tasmeem-transitional-banner" hidden ... >
  TASMEEM Phase 1-2 transitional ...
</div>
<script>
  (function () {
    var b = document.getElementById('tasmeem-transitional-banner');
    ...
  })();
</script>
```

استبدل بتعليق:

```html
<!-- TASMEEM v3 / Phase 3 complete — local fonts bound to voices.
     Banner removed. Status: --tasmeem-fonts-status: "phase-3-bound" -->
```

### Step 6 — APPEND `Upg.font` IIFE في app.js

في **النهاية** بعد آخر IIFE:

```javascript
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Upg.font API (Worker 20 / Phase 3)
   Programmatic introspection + control of local font system.
   Additive: preserves all 24 existing Upg.* APIs.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  const FAMILIES = [
    { id: 'aref-ruqaa',       css: 'Aref Ruqaa',          weights: [400, 700],          script: 'arabic'  },
    { id: 'reem-kufi',        css: 'Reem Kufi',           weights: [400, 700],          script: 'arabic'  },
    { id: 'cairo',            css: 'Cairo',               weights: [400, 600, 700],     script: 'arabic'  },
    { id: 'tajawal',          css: 'Tajawal',             weights: [300, 400, 500, 700], script: 'arabic' },
    { id: 'ibm-plex-arabic',  css: 'IBM Plex Sans Arabic',weights: [300, 400, 500, 600, 700], script: 'arabic' },
    { id: 'readex-pro',       css: 'Readex Pro',          weights: [200, 700],          script: 'arabic'  },
    { id: 'inter',            css: 'Inter',               weights: [100, 900],          script: 'latin'   },
    { id: 'jetbrains-mono',   css: 'JetBrains Mono',      weights: [400, 500, 700],     script: 'latin'   },
    { id: 'fraunces',         css: 'Fraunces',            weights: [400, 700],          script: 'latin'   }
  ];

  const VOICES = [
    'hero', 'display', 'display-h', 'display-l',
    'body', 'body-lead', 'ui', 'label',
    'numeric', 'num-tabular', 'code',
    'accent', 'eyebrow', 'signature', 'ribbon',
    'quote', 'latin', 'wordmark'
  ];

  // List all local font families
  const list = () => FAMILIES.map(f => ({ ...f }));

  // List all voice tokens
  const voices = () => VOICES.slice();

  // Audit currently-loaded font faces (uses document.fonts API)
  const audit = async () => {
    if (!document.fonts || !document.fonts.ready) {
      return { supported: false };
    }
    await document.fonts.ready;
    const loaded = {};
    document.fonts.forEach((font) => {
      const family = font.family.replace(/['"]/g, '');
      if (!loaded[family]) loaded[family] = [];
      loaded[family].push({ weight: font.weight, style: font.style, status: font.status });
    });
    return {
      supported: true,
      total_faces: document.fonts.size,
      by_family: loaded
    };
  };

  // Check if a specific weight of a family is loaded and ready
  const isReady = (familyCss, weight = 400, style = 'normal') => {
    if (!document.fonts || !document.fonts.check) return null;
    return document.fonts.check(`${weight} 12px "${familyCss}"`);
  };

  // Get computed font-family for an element (resolves token chain)
  const computedFor = (target) => {
    const el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el) return null;
    return getComputedStyle(el).fontFamily;
  };

  // Check status from CSS custom property (sanity)
  const status = () => {
    const rs = getComputedStyle(document.documentElement);
    return {
      stage:                rs.getPropertyValue('--tasmeem-stage').trim().replace(/['"]/g, ''),
      fonts_status:         rs.getPropertyValue('--tasmeem-fonts-status').trim().replace(/['"]/g, ''),
      local_loaded:         rs.getPropertyValue('--tasmeem-fonts-local-loaded').trim().replace(/['"]/g, ''),
      google_fonts_links:   rs.getPropertyValue('--tasmeem-google-fonts-link-count').trim().replace(/['"]/g, '')
    };
  };

  // Manual swap: temporarily override a voice token at runtime (debug only)
  const swap = (voice, fontCssName) => {
    if (!VOICES.includes(voice)) {
      console.warn('[Upg.font] Invalid voice:', voice, '— expected one of', VOICES);
      return false;
    }
    document.documentElement.style.setProperty(
      `--type-voice-${voice}`,
      `"${fontCssName}", sans-serif`
    );
    return true;
  };

  // Reset a voice to its default value (clears inline override)
  const reset = (voice) => {
    if (!VOICES.includes(voice)) return false;
    document.documentElement.style.removeProperty(`--type-voice-${voice}`);
    return true;
  };

  // Expose API (additive — preserves all 24 existing APIs)
  window.Upg = window.Upg || {};
  window.Upg.font = {
    list, voices, audit, isReady, computedFor, status, swap, reset,
    FAMILIES: FAMILIES.slice(), VOICES: VOICES.slice()
  };

  // On page ready, log status to console (one-time devotion confirmation)
  document.addEventListener('DOMContentLoaded', () => {
    const s = status();
    if (s.fonts_status === 'phase-3-bound' && s.google_fonts_links === '0') {
      console.info(
        '%c🕯️ TASMEEM v3 ready — %d/9 local families, 0 CDN, 0 external requests.',
        'color:#7AB8FF; font-weight:bold;',
        9
      );
    }
  });
})(window, document);
```

### Step 7 — Discipline Comment

في style.css نهاية كتلة Voice Bindings:

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 20 / Phase 3 — Bindings Discipline:
   1. لا تُضِف voice tokens جديد بعد الآن — الـ 18 voice كافية.
   2. لو تحتاج خط جديد لـ voice موجود → استبدل قيمته في كتلة TASMEEM v3.
   3. لا تستعمل font-family مباشر في قواعد جديدة — استعمل var(--type-voice-X).
   4. tas-voice-* تُكمل (لا تستبدل) .h-* و .type-* من W12 + W15.
   5. لو كتبت @media query مع font-family → استعمل token، لا hex names.
   6. لا تخلط أكثر من 3 خطوط في stack واحد بعد الآن (نحن ضد cascade-collision).
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html               # → 14+
grep -c 'qcalc' platform/index.html                                # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 25 (was 24, +font)
grep -c '@font-face' platform/assets/style.css                    # → ≥18 (P2)
grep -c '\-\-type-voice-' platform/assets/style.css               # → ≥18 (preserved + reroute)
grep -c 'fonts.googleapis.com' platform/index.html                # → 0 ✓
grep -c 'fonts.googleapis.com' platform/assets/style.css          # → 0 ✓

# Critical: 6 redefinitions collapsed to 1
grep -c "^\s*--font-display:" platform/assets/style.css           # → 1 (was 6)

# Phantom removed
grep -c "Thmanyah" platform/assets/style.css                      # → 0

# New utilities
grep -c "\.tas-voice-" platform/assets/style.css                  # → ≥16
grep -c "Upg.font" platform/assets/app.js                         # → ≥1

# Banner removed
grep -c 'tasmeem-transitional-banner' platform/index.html         # → 0 (was 1)

# Status updated
grep "tasmeem-fonts-status" platform/assets/style.css | grep -c "phase-3-bound" # → 1

# Browser test:
# Open platform/index.html → Console:
# ✓ "🕯️ TASMEEM v3 ready — 9/9 local families, 0 CDN, 0 external requests."
# DevTools → Network → reload → 0 external requests
# Visual: المنصة تعود لشكلها البصري الكامل، الخطوط واضحة في كل مكان
```

---

## ✅ معايير القبول (Phase 3)

- [ ] `--font-display` معرَّف **مرة واحدة فقط** في style.css.
- [ ] جميع 18 `--type-voice-*` tokens محتفظة بأسمائها، قيمها تشير لخطوط محلية.
- [ ] "Thmanyah" غير موجودة في أي stack (المجلد محفوظ، المرجع محذوف).
- [ ] 16+ `tas-voice-*` utility class مكتوبة.
- [ ] `Upg.font` IIFE معرَّف ويصدّر `list, voices, audit, isReady, computedFor, status, swap, reset`.
- [ ] Console log عند load: "🕯️ TASMEEM v3 ready — 9/9 local families, 0 CDN, 0 external requests."
- [ ] Transitional banner من Phase 1 محذوف.
- [ ] `--tasmeem-fonts-status` = `"phase-3-bound"`.
- [ ] جميع W12+W15 voice bindings تشتغل (`.h-display`, `.type-hero`, `.h-quote`, `.u-num`...).
- [ ] Network tab: 0 external requests.
- [ ] Visual: المنصة تظهر بشكلها الكامل بخطوط محلية (Aref Ruqaa wordmark، Reem Kufi h1، إلخ).

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/style.css platform/assets/app.js platform/index.html
git commit -m "phase 3 (devotio): voice bindings — collapse 6 font-display, route 18 voices to local fonts, Upg.font API, remove transitional banner"
# push immediately
```

ثم state commit:

```bash
git add state/PROGRESS.json state/snapshots/worker-20-phase-3.json
git commit -m "state: devotio phase 3 committed and pushed"
# push immediately
```

— نهاية Phase 3.

🕯️ **Devotion check:** هل ٩ خطوط محلية الآن مرتبطة بـ ١٨ صوت؟ Console يقول نعم؟ → انتقل لـ Phase 4 (Numeric Discipline).
