# 🎭 WORKER 20 — Phase 6/6 — Per-Page Type Signature
> **اقرأ أولاً:** `prompts/v3/20_WORKER_TASMEEM_RECONSTRUCTION.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Phases 1-5 (Google Fonts gone, local fonts loaded, voices bound, numerics disciplined, rhythm Arabic-first).
> **الفلسفة:** *كل صفحة لها صوت داخلي. كول سنتر يَسرَع، Psych يَتَأَمَّل، محاسبة تَدقّق. الخط يجب أن يحكي قبل أن يُقرأ.*

---

## 🛡️ Preservation Contract (Phase 6)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` rules | **APPEND** كتلة `Per-Page Signature v3` (~520 سطر) — 14 signature block | تعديل قواعد قائمة من W12-W19 (خاصة W15 P6 signatures) |
| `style.css` `:root` | **APPEND** 14 signature tokens (`--sig-callcenter-display`, ...) | تعديل tokens قائمة |
| `index.html` | لا يُلمَس — جميع `data-page-personality` موجودة من Pack v1/v2 | تغيير DOM |
| `app.js` | **APPEND** sub-IIFE لـ `Upg.font` يُضيف `getPageSignature()` API | لمس IIFEs قائمة |

**Sacred preserved:**
- جميع 18 voice tokens.
- جميع W15 P6 type signatures (نُحدّثها أو نتركها — الـ phase-spec يحدّد).
- 15 `data-page-personality` attributes في HTML.
- 14 page sections + 391 qcalc + 25 Upg.* APIs (W20 added Upg.font).

> **ملاحظة:** هذا أكبر phase في Worker 20 (~580 سطر). يستوعب 14 signature block + tokens + JS API. **ابقَ تحت 600 سطر** بصرامة.

---

## 🎯 الهدف

Phase 6 يَخلق **هوية طباعية لكل صفحة**:

| الصفحة | الشخصية | الـ Display Voice | الـ Body Voice | الميزة |
|---|---|---|---|---|
| dashboard | حُرفي/تنفيذي | Reem Kufi 700 | Tajawal 500 | tracking tight, opsz 96 |
| callcenter | حادّ/سريع | Reem Kufi 700 | Tajawal 500 | uppercase eyebrows, geometric |
| fieldsales | نشيط/طاقي | Reem Kufi 600 | Readex Pro 400 | wider tracking, dlig active |
| accountmgr | تنفيذي/راقي | Aref Ruqaa 700 (hero) | IBM Plex 500 | optical opsz 144, formal |
| social | حيوي/ديناميكي | Reem Kufi 700 | Readex Pro 400 | swsh active, italic-ish |
| lab | تجريبي/تقني | JetBrains Mono 700 (display) | Tajawal 400 | mono headings, dotted-zero |
| psych | فلسفي/أدبي | Aref Ruqaa 700 | Readex Pro 400 | leading-luxe, fraunces quotes |
| eq | عاطفي/هادئ | Aref Ruqaa 400 (light) | Readex Pro 400 | leading-loose, soft tracking |
| negotiation | إقناعي/قوي | Reem Kufi 700 | IBM Plex 600 | bold body, tight tracking |
| customercare | دافئ/خدمي | Tajawal 700 (display) | Tajawal 400 | rounded feel, dlig on |
| programming | تقني/منطقي | JetBrains Mono 700 (display) | IBM Plex 400 | mono code voice prominent |
| accounting | دقيق/محاسبي | IBM Plex 700 (display) | IBM Plex 400 | tabular nums prominent |
| phonerepair | حِرَفي/يدوي | Cairo 700 | Cairo 400 | classic Arabic workmanship |
| hrmastery | رسمي/إنساني | Aref Ruqaa 700 | Tajawal 500 | formal Arabic + soft body |
| myprogress | شخصي/تأملي | Reem Kufi 500 | Readex Pro 400 | gentle, journal-like |

---

## 📋 PRE-FLIGHT

```
📋 PHASE 6 PRE-FLIGHT (Worker 20 / TASMEEM)
├─ Phase: 6/6 — Per-Page Type Signature
├─ Estimated lines: ~580 (CSS ~480 + JS ~80 sub-iife + tokens block ~20)
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~500 lines — 14 signatures + tokens)
│   └─ platform/assets/app.js      (APPEND ~80 lines sub-iife)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c 'data-page-personality' platform/index.html         → 15 (preserved)
│   ├─ grep -c 'tas-voice-' platform/assets/style.css              → ≥16 (P3)
│   └─ grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l → 25
├─ Branch: continue worker-20-devotio
└─ Final phase of Worker 20 — PR opens after this.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Signature Tokens

في `:root`، **APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Per-Page Signature Tokens (Worker 20 / Phase 6)
   Each page personality gets unique type voice override.
   These tokens act as overrides applied via [data-page-personality="X"].
   ════════════════════════════════════════════════════════════════════════ */
:root {
  /* No defaults at root — signatures activate per-personality scope */
  --sig-active: "default";
}
```

### Step 2 — 15 Personality Signatures (الكتلة الكبرى)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — 15 Per-Page Type Signatures (Worker 20 / Phase 6)
   ────────────────────────────────────────────────────────────────────────
   Each [data-page-personality="X"] scope overrides voice tokens locally.
   Cascade order: voice tokens (root) → signature override (page) → element.
   ════════════════════════════════════════════════════════════════════════ */

/* ─── 1. Dashboard — حُرفي/تنفيذي ─── */
[data-page-personality="dashboard"] {
  --sig-active: "dashboard";
  --type-voice-display:    var(--font-reem-kufi), var(--font-cairo), sans-serif;
  --type-voice-body:       var(--font-tajawal), var(--font-readex-pro), sans-serif;
  --tracking-display:      -0.018em;
  --leading-relaxed:        1.6;
}
[data-page-personality="dashboard"] .h-display,
[data-page-personality="dashboard"] .type-display,
[data-page-personality="dashboard"] .tas-voice-display {
  font-weight: 700;
  font-variation-settings: "opsz" 96;
}

/* ─── 2. Callcenter — حادّ/سريع ─── */
[data-page-personality="callcenter"] {
  --sig-active: "callcenter";
  --type-voice-display:    var(--font-reem-kufi), var(--font-cairo), sans-serif;
  --type-voice-body:       var(--font-tajawal), var(--font-cairo), sans-serif;
  --type-voice-eyebrow:    var(--font-tajawal), var(--font-cairo), sans-serif;
  --tracking-display:      -0.022em;
  --tracking-eyebrow:       0.08em;
  --leading-tight:          1.10;
}
[data-page-personality="callcenter"] .tas-voice-eyebrow,
[data-page-personality="callcenter"] .h-eyebrow {
  text-transform: uppercase;  /* Latin parts only */
  letter-spacing: 0.08em;
  font-weight: 600;
}

/* ─── 3. Fieldsales — نشيط/طاقي ─── */
[data-page-personality="fieldsales"] {
  --sig-active: "fieldsales";
  --type-voice-display:    var(--font-reem-kufi), var(--font-cairo), sans-serif;
  --type-voice-body:       var(--font-readex-pro), var(--font-cairo), sans-serif;
  --tracking-display:      -0.012em;  /* slightly looser */
  --tracking-body:          0.005em;
}
[data-page-personality="fieldsales"] .tas-voice-display {
  font-weight: 600;
  font-feature-settings: "dlig" 1, "kern" 1, "liga" 1, "calt" 1;
}

/* ─── 4. Accountmgr — تنفيذي/راقي ─── */
[data-page-personality="accountmgr"] {
  --sig-active: "accountmgr";
  --type-voice-display:    var(--font-aref-ruqaa), var(--font-reem-kufi), serif;
  --type-voice-hero:       var(--font-aref-ruqaa), var(--font-reem-kufi), serif;
  --type-voice-body:       var(--font-ibm-plex-arabic), var(--font-readex-pro), sans-serif;
  --tracking-hero:         -0.005em;
  --leading-relaxed:        1.7;  /* extra refined */
}
[data-page-personality="accountmgr"] .tas-voice-hero,
[data-page-personality="accountmgr"] .type-hero {
  font-weight: 700;
  font-variation-settings: "opsz" 144;  /* most refined optical */
  font-feature-settings: "kern" 1, "liga" 1, "dlig" 1, "calt" 1;
}

/* ─── 5. Social — حيوي/ديناميكي ─── */
[data-page-personality="social"] {
  --sig-active: "social";
  --type-voice-display:    var(--font-reem-kufi), var(--font-cairo), sans-serif;
  --type-voice-body:       var(--font-readex-pro), var(--font-cairo), sans-serif;
  --type-voice-quote:      var(--font-fraunces), var(--font-readex-pro), serif;
  --tracking-display:      -0.015em;
}
[data-page-personality="social"] .tas-voice-display {
  font-weight: 700;
  font-feature-settings: "swsh" 1, "salt" 1, "dlig" 1, "kern" 1, "liga" 1;
}

/* ─── 6. Lab — تجريبي/تقني ─── */
[data-page-personality="lab"] {
  --sig-active: "lab";
  --type-voice-display:    var(--font-jetbrains-mono), var(--font-reem-kufi), monospace;
  --type-voice-body:       var(--font-tajawal), var(--font-cairo), sans-serif;
  --type-voice-numeric:    var(--font-jetbrains-mono), var(--font-ibm-plex-arabic), monospace;
  --tracking-display:       0;  /* mono is monospaced */
}
[data-page-personality="lab"] .tas-voice-display {
  font-weight: 700;
  font-feature-settings: "zero" 1, "ss01" 0, "kern" 1, "liga" 1;  /* slashed-zero */
}
[data-page-personality="lab"] .h-display,
[data-page-personality="lab"] .type-display {
  font-family: var(--font-jetbrains-mono), var(--font-reem-kufi), monospace;
  font-weight: 700;
}

/* ─── 7. Psych — فلسفي/أدبي ─── */
[data-page-personality="psych"] {
  --sig-active: "psych";
  --type-voice-hero:       var(--font-aref-ruqaa), var(--font-cairo), serif;
  --type-voice-display:    var(--font-aref-ruqaa), var(--font-reem-kufi), serif;
  --type-voice-body:       var(--font-readex-pro), var(--font-ibm-plex-arabic), sans-serif;
  --type-voice-quote:      var(--font-fraunces), var(--font-readex-pro), serif;
  --leading-relaxed:        1.75;  /* extra literary */
  --leading-loose:          2.00;
  --tracking-hero:         -0.005em;
}
[data-page-personality="psych"] .tas-voice-quote,
[data-page-personality="psych"] .h-quote {
  font-style: italic;
  font-feature-settings: "kern" 1, "liga" 1, "dlig" 1, "swsh" 1, "salt" 1, "ss01" 1;
}

/* ─── 8. EQ — عاطفي/هادئ ─── */
[data-page-personality="eq"] {
  --sig-active: "eq";
  --type-voice-hero:       var(--font-aref-ruqaa), var(--font-cairo), serif;
  --type-voice-display:    var(--font-aref-ruqaa), var(--font-reem-kufi), serif;
  --type-voice-body:       var(--font-readex-pro), var(--font-ibm-plex-arabic), sans-serif;
  --leading-relaxed:        1.8;
  --tracking-hero:          0;  /* relaxed, not tight */
  --tracking-display:      -0.005em;
}
[data-page-personality="eq"] .tas-voice-hero,
[data-page-personality="eq"] .type-hero {
  font-weight: 400;  /* lighter for emotional softness */
  font-variation-settings: "opsz" 72;
}

/* ─── 9. Negotiation — إقناعي/قوي ─── */
[data-page-personality="negotiation"] {
  --sig-active: "negotiation";
  --type-voice-display:    var(--font-reem-kufi), var(--font-cairo), sans-serif;
  --type-voice-body:       var(--font-ibm-plex-arabic), var(--font-readex-pro), sans-serif;
  --tracking-display:      -0.024em;  /* tightest */
  --leading-tight:          1.08;
}
[data-page-personality="negotiation"] .tas-voice-body,
[data-page-personality="negotiation"] .h-body {
  font-weight: 600;  /* assertive body */
}

/* ─── 10. Customercare — دافئ/خدمي ─── */
[data-page-personality="customercare"] {
  --sig-active: "customercare";
  --type-voice-display:    var(--font-tajawal), var(--font-cairo), sans-serif;
  --type-voice-body:       var(--font-tajawal), var(--font-readex-pro), sans-serif;
  --tracking-display:      -0.008em;
  --leading-relaxed:        1.7;
}
[data-page-personality="customercare"] .tas-voice-display {
  font-weight: 700;
  font-feature-settings: "dlig" 1, "kern" 1, "liga" 1, "calt" 1;
}

/* ─── 11. Programming — تقني/منطقي ─── */
[data-page-personality="programming"] {
  --sig-active: "programming";
  --type-voice-display:    var(--font-jetbrains-mono), var(--font-reem-kufi), monospace;
  --type-voice-body:       var(--font-ibm-plex-arabic), var(--font-readex-pro), sans-serif;
  --type-voice-code:       var(--font-jetbrains-mono), monospace;
  --type-voice-numeric:    var(--font-jetbrains-mono), monospace;
  --tracking-display:       0;
}
[data-page-personality="programming"] .tas-voice-display,
[data-page-personality="programming"] .h-display {
  font-family: var(--font-jetbrains-mono), var(--font-reem-kufi), monospace;
  font-weight: 700;
  font-feature-settings: "zero" 1, "calt" 1, "liga" 1;
}
[data-page-personality="programming"] code,
[data-page-personality="programming"] pre {
  font-feature-settings: "calt" 1, "liga" 1, "zero" 1, "ss01" 0;
}

/* ─── 12. Accounting — دقيق/محاسبي ─── */
[data-page-personality="accounting"] {
  --sig-active: "accounting";
  --type-voice-display:    var(--font-ibm-plex-arabic), var(--font-reem-kufi), sans-serif;
  --type-voice-body:       var(--font-ibm-plex-arabic), var(--font-readex-pro), sans-serif;
  --type-voice-numeric:    var(--font-ibm-plex-arabic), var(--font-jetbrains-mono), monospace;
  --type-voice-num-tabular: var(--font-jetbrains-mono), var(--font-ibm-plex-arabic), monospace;
  --tracking-display:      -0.014em;
}
[data-page-personality="accounting"] .qcalc-value,
[data-page-personality="accounting"] .stat-tile-value,
[data-page-personality="accounting"] .tas-num-tabular {
  font-feature-settings: "tnum" 1, "lnum" 1, "zero" 1, "ss01" 1;  /* alt-1 + slashed */
  font-weight: 600;
}

/* ─── 13. Phonerepair — حِرَفي/يدوي ─── */
[data-page-personality="phonerepair"] {
  --sig-active: "phonerepair";
  --type-voice-display:    var(--font-cairo), var(--font-reem-kufi), sans-serif;
  --type-voice-body:       var(--font-cairo), var(--font-tajawal), sans-serif;
  --tracking-display:      -0.012em;
  --leading-relaxed:        1.6;
}
[data-page-personality="phonerepair"] .tas-voice-display {
  font-weight: 700;
}

/* ─── 14. HRMastery — رسمي/إنساني ─── */
[data-page-personality="hrmastery"] {
  --sig-active: "hrmastery";
  --type-voice-hero:       var(--font-aref-ruqaa), var(--font-cairo), serif;
  --type-voice-display:    var(--font-aref-ruqaa), var(--font-reem-kufi), serif;
  --type-voice-body:       var(--font-tajawal), var(--font-readex-pro), sans-serif;
  --tracking-hero:         -0.008em;
  --leading-relaxed:        1.65;
}
[data-page-personality="hrmastery"] .tas-voice-hero,
[data-page-personality="hrmastery"] .type-hero {
  font-weight: 700;
  font-variation-settings: "opsz" 96;
}

/* ─── 15. MyProgress — شخصي/تأملي ─── */
[data-page-personality="myprogress"] {
  --sig-active: "myprogress";
  --type-voice-display:    var(--font-reem-kufi), var(--font-cairo), sans-serif;
  --type-voice-body:       var(--font-readex-pro), var(--font-cairo), sans-serif;
  --tracking-display:      -0.01em;
  --leading-relaxed:        1.7;
}
[data-page-personality="myprogress"] .tas-voice-display {
  font-weight: 500;  /* lighter, journal-like */
}

/* ─── Curriculum (if present from Pack v2 ritual) ─── */
[data-page-personality="curriculum"] {
  --sig-active: "curriculum";
  --type-voice-display:    var(--font-reem-kufi), var(--font-cairo), sans-serif;
  --type-voice-body:       var(--font-tajawal), var(--font-readex-pro), sans-serif;
  --tracking-display:      -0.014em;
}
```

### Step 3 — Discipline + Cleanup Old W15 P6 (if conflicts)

> **ملاحظة:** Phase 6 من Worker 15 (Resonance v2) أنشأ توقيعات قديمة. هذا الـ Phase يكتب **فوقها** لكن يحترم الترتيب: voice token override → element rule. لو W15 P6 يستعمل `font-family` مباشر بدل `var(--type-voice-X)`، فإن الـ override الجديد لن يصل. في تلك الحالة (وفقط):

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — W15 P6 Compat Layer (Worker 20 / Phase 6)
   Forces W15 personality blocks to use voice tokens (additive).
   ════════════════════════════════════════════════════════════════════════ */

/* If W15 P6 had: [data-page-personality="X"] h1 { font-family: "Reem Kufi", ... } */
/* We re-route to voice token: */
[data-page-personality] .h-display:not(.tas-voice-display),
[data-page-personality] .type-display:not(.tas-voice-display) {
  font-family: var(--type-voice-display);
}
[data-page-personality] .h-quote:not(.tas-voice-quote) {
  font-family: var(--type-voice-quote);
}
[data-page-personality] .h-body:not(.tas-voice-body) {
  font-family: var(--type-voice-body);
}
```

### Step 4 — `Upg.font.getPageSignature()` API

في `app.js`، **APPEND**:

```javascript
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Page Signature Introspection (Worker 20 / Phase 6)
   Extends Upg.font with personality-awareness.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.font) return;

  // Get the active page's signature info
  const getPageSignature = () => {
    const activePage = document.querySelector('section.page:not([hidden])');
    if (!activePage) return null;

    const personality = activePage.getAttribute('data-page-personality') || 'default';
    const cs = getComputedStyle(activePage);

    return {
      pageId: activePage.id,
      personality,
      sigActive: cs.getPropertyValue('--sig-active').trim().replace(/['"]/g, ''),
      voiceDisplay: cs.getPropertyValue('--type-voice-display').trim(),
      voiceBody: cs.getPropertyValue('--type-voice-body').trim(),
      voiceHero: cs.getPropertyValue('--type-voice-hero').trim(),
      trackingDisplay: cs.getPropertyValue('--tracking-display').trim(),
      leadingRelaxed: cs.getPropertyValue('--leading-relaxed').trim()
    };
  };

  // List all known signatures
  const listSignatures = () => [
    'dashboard', 'callcenter', 'fieldsales', 'accountmgr', 'social',
    'lab', 'psych', 'eq', 'negotiation', 'customercare',
    'programming', 'accounting', 'phonerepair', 'hrmastery',
    'myprogress', 'curriculum', 'default'
  ];

  // Audit which signatures are applied vs which are missing
  const auditSignatures = () => {
    const known = listSignatures();
    const applied = [];
    const missing = [];
    document.querySelectorAll('[data-page-personality]').forEach((el) => {
      const p = el.getAttribute('data-page-personality');
      if (known.includes(p)) applied.push(p);
      else missing.push(p);
    });
    return {
      total: applied.length + missing.length,
      applied: [...new Set(applied)],
      missing: [...new Set(missing)],
      coverage: ((applied.length / (applied.length + missing.length)) * 100).toFixed(1) + '%'
    };
  };

  // Extend Upg.font (additive)
  window.Upg.font.getPageSignature = getPageSignature;
  window.Upg.font.listSignatures = listSignatures;
  window.Upg.font.auditSignatures = auditSignatures;

  // Log on load (one-time)
  document.addEventListener('DOMContentLoaded', () => {
    const audit = auditSignatures();
    if (audit.coverage === '100.0%') {
      console.info(
        '%c🎭 TASMEEM v3 / Phase 6 — %d page signatures applied, coverage: %s',
        'color:#9D7BFF;font-weight:bold;',
        audit.applied.length,
        audit.coverage
      );
    }
  });
})(window, document);
```

### Step 5 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 20 / Phase 6 — Signature Discipline:
   1. لا تخلق personality جديد بدون token block + signature block.
   2. لو احتجت override ضمن personality → استبدل قيمة voice token (لا تستعمل font-family مباشر).
   3. قاعدة الترتيب: root tokens → personality override → element rule.
   4. كل personality له ميزة واحدة بصرية مميَّزة (uppercase eyebrows لـ callcenter، italic quote لـ psych، إلخ) — لا تخلط.
   5. opsz variation فقط على variable fonts (Aref Ruqaa ليست variable).
   6. tracking-display تتراوح بين -0.024em (negotiation أحدّ) إلى 0 (lab/programming mono).
   ════════════════════════════════════════════════════════════════════════ */

/* End TASMEEM v3 — Worker 20 COMPLETE ────────────────────────────────── */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html               # → 14+
grep -c 'qcalc' platform/index.html                                # → 391
grep -c 'data-page-personality' platform/index.html               # → 15
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 25

# 14 signatures present
grep -c 'data-page-personality="' platform/assets/style.css       # → ≥15

# New API methods
grep -c "getPageSignature" platform/assets/app.js                 # → ≥1
grep -c "listSignatures" platform/assets/app.js                   # → ≥1
grep -c "auditSignatures" platform/assets/app.js                  # → ≥1

# CRITICAL final check — Pack v3 Worker 20 complete
grep -c "fonts.googleapis.com" platform/index.html                 # → 0
grep -c "fonts.googleapis.com" platform/assets/style.css           # → 0
find platform/assets/fonts/ -name "*.woff2" | wc -l               # → ≥18

# Browser test:
# Console: Upg.font.getPageSignature() — يُرجع شخصية الصفحة الحالية
# Console: Upg.font.auditSignatures() — coverage: 100%
# Visual: navigate between pages, observe distinct typography per page
```

---

## ✅ معايير القبول (Phase 6 — Worker 20 final)

- [ ] 15 signature blocks (14 page + 1 curriculum) معرَّفة في style.css.
- [ ] كل block يستبدل ≥3 voice tokens.
- [ ] `Upg.font.getPageSignature()`, `listSignatures()`, `auditSignatures()` معرَّفة.
- [ ] Console log: "🎭 TASMEEM v3 / Phase 6 — X signatures applied, coverage: 100%".
- [ ] navigation بين صفحتين → تغيير بصري في typography (callcenter sharp, psych literary).
- [ ] جميع W15 P6 signatures القديمة مُحدَّثة لتستخدم voice tokens.
- [ ] qcalc rhythm محفوظ (لم يتأثر بـ signatures).
- [ ] 0 references لـ fonts.googleapis.com في كل codebase.
- [ ] Console: 0 errors.
- [ ] **TASMEEM Worker 20 مكتمل — 6/6 phases.**

---

## 📤 Commit + Push (final 2-push of Worker 20)

```bash
git add platform/assets/style.css platform/assets/app.js
git commit -m "phase 6 (devotio): per-page type signature — 15 personality blocks, voice token overrides, Upg.font.getPageSignature, worker 20 complete"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-20-phase-6.json
git commit -m "state: devotio phase 6 committed — worker 20 complete (6/6 phases)"
# push immediately
```

### Open PR

```
gh pr create \
  --base main \
  --head worker-20-devotio \
  --title "feat: Worker 20 — TASMEEM RECONSTRUCTION DEVOTIO (6/6 phases)" \
  --body "Pack v3 Worker 20 complete.

## Phases done
1. Font Forensics — removed Google Fonts CDN, inventoried 252 font-family
2. Local Font Load — 9 families, 18+ woff2 subsetted, 320KB total offline
3. Voice Bindings — collapsed 6 --font-display → 1, routed 18 voices, Upg.font API
4. Numeric Discipline — 6 utilities, qcalc/stat-tile auto-bind, Latin-digit policy
5. Kashida & Rhythm — 8 tokens, leading 1.65 Arabic-first, kashida on 14 hero h1
6. Per-Page Type Signature — 15 personality blocks, getPageSignature API

## Sacred preservation
- 14 page sections ✓
- 391 qcalc references ✓
- 25 Upg.* APIs (24 + Upg.font) ✓
- 18 voice tokens (W15) ✓
- 15 identity tints ✓ (untouched — Worker 21 will reassign values)

## Devotion check
- 0 external requests ✓
- 0 fonts.googleapis.com references ✓
- All 9 fonts local (.woff2) ✓
- Total payload: ~280KB (vs ~600KB from Google CDN) ✓"
```

— نهاية Worker 20.

🕯️ **Devotion check final:** هل المنصة الآن سيدة على خطها بالكامل؟ صفر CDN، ٩ خطوط محلية، ١٨ صوت مرتبط، ١٥ توقيع لكل صفحة؟ → فتح PR وانتظار الـ merge، ثم Worker 21 (Chromatic Soul).
