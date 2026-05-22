# 🖨️ WORKER 24 — Phase 5/5 — Print Atelier
> **اقرأ أولاً:** `prompts/v3/24_WORKER_DUAL_FORM.md` — قسم **Preservation Guard**.
> **يبني فوق:** Phases 1-4 + W21 P5 print baseline.
> **الفلسفة:** *الورق ليس screenshot. هو نَفَس آخر للمحتوى. كل صفحة تَستحق توقيعاً مَطبوعاً — hero gradient، tint identity، footer poetry. ١٥ توقيع ورقي، ١٥ هوية أرضية.*

---

## 🛡️ Preservation Contract (Phase 5)

| العملية | المسموح | الممنوع |
|---|---|---|
| `platform/assets/css/motion.css` (الذي يَحمل @media print من W21 P5) | **APPEND** كتلة `Print Atelier` (~360 سطر) — 15 personality print blocks | تعديل @media print من W21 P5 |
| `platform/assets/css/tokens.css` | **APPEND** 6 print-specific tokens | تعديل tokens |
| `platform/index.html` (shell) | لا يُلمَس | تغيير |

**Sacred preserved:**
- W21 P5 baseline @media print (نَبني فوقه).
- 14 page sections + curriculum.
- جميع 30 Upg.* APIs.

---

## 🎯 الهدف

Phase 5 يُكمل Worker 24 + Pack v3 بـ **١٥ print signature لكل صفحة**:

كل page personality يَطبَع بـ:
1. **Hero band** (top 25% of first page) — gradient بـ tint الصفحة + اسم الصفحة بـ Aref Ruqaa.
2. **Page-h tint underline** — line تحت كل h2 بـ tint الصفحة.
3. **Footer signature** — bottom of every print page: "Upgrade · <اسم الصفحة العربي> · صفحة <رقم>".
4. **Date stamp** — top-left: تاريخ الطباعة بـ Arabic-Indic + "هـ" / "م".
5. **Quranic-style ornaments** للـ literary pages (psych, eq, customercare).

**Discipline:**
- `print-color-adjust: exact` لتثبيت الألوان (Mihrab dark dark = light bg + dark text).
- Page breaks: `break-before: page` على page-h.
- لا hero gradient على footer/printable elements (W21 P5 already disabled).
- Font-size أصغر للورق (efficient).
- Mode: A4 portrait بشكل افتراضي.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 5 PRE-FLIGHT (Worker 24 / DUAL-FORM)
├─ Phase: 5/5 — Print Atelier (final — Pack v3 complete)
├─ Estimated lines: ~460 (CSS APPEND ~360 + tokens ~30 + comments)
├─ Files to touch:
│   ├─ platform/assets/css/tokens.css   (APPEND 6 print tokens)
│   └─ platform/assets/css/motion.css   (APPEND 15 personality print blocks)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '@media print' platform/assets/css/motion.css      → ≥1 (W21 P5 baseline)
│   ├─ grep -c 'data-page-personality' platform/assets/css/pages.css → ≥30 (W21+W20)
│   └─ grep -c '\-\-chr-' platform/assets/css/tokens.css          → ≥120
├─ Branch: continue worker-24-devotio
└─ Final phase of Worker 24 + Pack v3 — major PR ahead.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — APPEND Print Tokens

في `platform/assets/css/tokens.css`:

```css
/* ════════════════════════════════════════════════════════════════════════
   DUAL-FORM v3 — Print Atelier Tokens (Worker 24 / Phase 5)
   ════════════════════════════════════════════════════════════════════════ */
:root {
  /* Print page setup */
  --print-page-size:        A4;
  --print-page-margin:      18mm 16mm 22mm 16mm;  /* top right bottom left */
  --print-hero-h:           28%;        /* top portion of first page = hero */
  --print-text-color:       var(--chr-mihrab-900);
  --print-text-muted:       var(--chr-mihrab-600);
  --print-paper-color:      white;
  --print-paper-tint:       var(--chr-pearl-50);
}
```

### Step 2 — APPEND Print Atelier في `motion.css`

```css
/* ════════════════════════════════════════════════════════════════════════
   DUAL-FORM v3 — Print Atelier (Worker 24 / Phase 5)
   ────────────────────────────────────────────────────────────────────────
   15 per-personality print signatures.
   Builds on W21 P5 baseline @media print (which sets bg=white, text=dark).
   This block adds hero band, tint underline, footer poetry, page breaks.
   ════════════════════════════════════════════════════════════════════════ */

@media print {
  /* ─── Page setup ─── */
  @page {
    size: A4;
    margin: 18mm 16mm 22mm 16mm;
  }

  /* Print color adjustment — preserve tint colors */
  body, .page, [data-page-personality] {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  /* Hide all non-printable chrome */
  .sidebar,
  .top-chrome,
  header.app-header,
  footer.app-footer,
  .nav-rail,
  .cmdk-trigger,
  .breadcrumb,
  .dual-bottom-nav,
  .dual-haptic-toggle,
  .rit-halo-toggle,
  .rit-entry-portal,
  [data-rit-time]::after,
  [data-rit-aura]::before,
  body::before,
  body::after {
    display: none !important;
  }

  /* Reset main layout for print */
  #page-host,
  main[data-shard-host] {
    padding: 0 !important;
    margin: 0 !important;
  }

  section.page,
  section.page[hidden] {
    display: block !important;
    page-break-before: always;
    break-before: page;
  }
  /* First section doesn't need page break before */
  section.page:first-of-type {
    page-break-before: auto;
    break-before: auto;
  }

  /* ─── Hero band — top 28% of first page per page section ─── */
  section.page > header.page-h {
    position: relative;
    margin: 0 0 12mm 0;
    padding: 18mm 14mm;
    page-break-after: avoid;
    break-after: avoid;
    /* Hero gradient — tint with subtle gradient */
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--color-tint, var(--chr-lapis-500)) 20%, white) 0%,
      color-mix(in oklch, var(--color-tint-edge, var(--chr-mihrab-700)) 12%, white) 100%);
    border-bottom: 3px solid var(--color-tint);
    color: var(--print-text-color);
  }

  /* Hero h1 — Aref Ruqaa large */
  section.page > header.page-h h1 {
    font-family: var(--type-voice-hero);
    font-size: 32pt;
    font-weight: 700;
    line-height: 1.1;
    margin: 0;
    color: var(--color-tint);
  }

  /* Hero eyebrow — subtle */
  section.page > header.page-h .page-h-eyebrow,
  section.page > header.page-h .h-eyebrow {
    font-family: var(--type-voice-eyebrow);
    font-size: 9pt;
    color: var(--print-text-muted);
    letter-spacing: 0.06em;
  }

  /* ─── h2 / page section headings — tint underline ─── */
  section.page h2,
  section.page .h-section {
    border-bottom: 1.5pt solid color-mix(in oklch, var(--color-tint) 40%, transparent);
    padding-bottom: 2mm;
    margin-top: 8mm;
    page-break-after: avoid;
    break-after: avoid;
    color: var(--print-text-color);
  }

  /* ─── Body content ─── */
  section.page p,
  section.page .h-body,
  section.page .lesson-body p {
    font-family: var(--type-voice-body);
    font-size: 10pt;
    line-height: 1.55;
    color: var(--print-text-color);
    orphans: 3;
    widows: 3;
  }

  /* ─── Quotes (psych, eq) ─── */
  section.page blockquote,
  section.page .h-quote,
  section.page .literary-quote {
    font-family: var(--type-voice-quote);
    font-size: 11pt;
    font-style: italic;
    border-inline-start: 2pt solid var(--color-tint);
    padding: 4mm 6mm;
    margin: 5mm 0;
    color: var(--print-text-color);
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* ─── qcalc panels ─── */
  .qcalc-panel,
  .qcalc-block {
    page-break-inside: avoid;
    break-inside: avoid;
    border: 0.5pt solid var(--print-text-muted);
    padding: 4mm;
    margin: 4mm 0;
    border-radius: 2mm;
  }

  .qcalc-value,
  .qcalc-result {
    font-family: var(--type-voice-num-tabular);
    font-feature-settings: "tnum" 1, "lnum" 1, "zero" 1;
  }

  /* ─── Footer signature on every page ─── */
  @page {
    @bottom-center {
      content: "Upgrade · صفحة " counter(page) " من " counter(pages);
      font-family: var(--type-voice-ui);
      font-size: 8pt;
      color: var(--print-text-muted);
    }
    @top-left {
      content: attr(data-print-date);
      font-family: var(--type-voice-eyebrow);
      font-size: 8pt;
      color: var(--print-text-muted);
    }
  }
}

/* ════════════════════════════════════════════════════════════════════════
   15 Per-Personality Print Refinements
   ════════════════════════════════════════════════════════════════════════ */

/* ─── Dashboard — saffron hero ─── */
@media print {
  [data-page-personality="dashboard"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-saffron-300) 30%, white),
      color-mix(in oklch, var(--chr-saffron-500) 18%, white));
  }
}

/* ─── Callcenter — damascus hero ─── */
@media print {
  [data-page-personality="callcenter"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-damascus-400) 25%, white),
      color-mix(in oklch, var(--chr-damascus-700) 15%, white));
  }
}

/* ─── Fieldsales — silt hero ─── */
@media print {
  [data-page-personality="fieldsales"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-silt-300) 28%, white),
      color-mix(in oklch, var(--chr-silt-500) 16%, white));
  }
}

/* ─── Accountmgr — cedar hero ─── */
@media print {
  [data-page-personality="accountmgr"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-cedar-400) 22%, white),
      color-mix(in oklch, var(--chr-cedar-700) 14%, white));
  }
  [data-page-personality="accountmgr"] header.page-h h1 {
    font-family: var(--type-voice-hero);  /* Aref Ruqaa for elegance */
  }
}

/* ─── Social — coral hero ─── */
@media print {
  [data-page-personality="social"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-coral-300) 30%, white),
      color-mix(in oklch, var(--chr-coral-600) 20%, white));
  }
}

/* ─── Lab — marble hero ─── */
@media print {
  [data-page-personality="lab"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-marble-400) 25%, white),
      color-mix(in oklch, var(--chr-marble-700) 18%, white));
  }
}

/* ─── Psych — lapis hero + ornament ─── */
@media print {
  [data-page-personality="psych"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-lapis-300) 28%, white),
      color-mix(in oklch, var(--chr-lapis-700) 18%, white));
  }
  [data-page-personality="psych"] header.page-h::before {
    content: "✿";
    position: absolute;
    bottom: 4mm;
    inset-inline-end: 6mm;
    font-size: 14pt;
    color: var(--chr-lapis-500);
  }
  [data-page-personality="psych"] blockquote {
    font-family: var(--type-voice-quote);
  }
}

/* ─── EQ — mihrab hero + ornament ─── */
@media print {
  [data-page-personality="eq"] header.page-h {
    background: linear-gradient(180deg,
      color-mix(in oklch, var(--chr-mihrab-400) 25%, white),
      color-mix(in oklch, var(--chr-mihrab-700) 16%, white));
  }
  [data-page-personality="eq"] header.page-h::after {
    content: "𓆭";  /* lotus ornament */
    position: absolute;
    bottom: 4mm;
    inset-inline-start: 6mm;
    font-size: 14pt;
    color: var(--chr-mihrab-500);
  }
}

/* ─── Negotiation — dark damascus hero ─── */
@media print {
  [data-page-personality="negotiation"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-damascus-600) 25%, white),
      color-mix(in oklch, var(--chr-damascus-900) 18%, white));
  }
}

/* ─── Customercare — pearl hero ─── */
@media print {
  [data-page-personality="customercare"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-pearl-300) 30%, white),
      color-mix(in oklch, var(--chr-pearl-700) 14%, white));
  }
}

/* ─── Programming — indigo hero ─── */
@media print {
  [data-page-personality="programming"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-indigo-400) 22%, white),
      color-mix(in oklch, var(--chr-indigo-800) 18%, white));
  }
  [data-page-personality="programming"] code,
  [data-page-personality="programming"] pre {
    background: var(--chr-marble-100);
    color: var(--chr-mihrab-900);
    font-family: var(--type-voice-code);
    page-break-inside: avoid;
    break-inside: avoid;
  }
}

/* ─── Accounting — palm hero + tabular nums emphasis ─── */
@media print {
  [data-page-personality="accounting"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-palm-400) 25%, white),
      color-mix(in oklch, var(--chr-palm-700) 16%, white));
  }
  [data-page-personality="accounting"] .qcalc-value {
    font-family: var(--type-voice-num-tabular);
    font-weight: 600;
  }
}

/* ─── Phonerepair — henna hero ─── */
@media print {
  [data-page-personality="phonerepair"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-henna-400) 25%, white),
      color-mix(in oklch, var(--chr-henna-700) 16%, white));
  }
}

/* ─── HRMastery — henna hero + ornament ─── */
@media print {
  [data-page-personality="hrmastery"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-henna-300) 28%, white),
      color-mix(in oklch, var(--chr-henna-600) 18%, white));
  }
  [data-page-personality="hrmastery"] header.page-h::before {
    content: "❦";
    position: absolute;
    bottom: 4mm;
    inset-inline-end: 6mm;
    font-size: 14pt;
    color: var(--chr-henna-600);
  }
}

/* ─── MyProgress — light lapis hero ─── */
@media print {
  [data-page-personality="myprogress"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-lapis-200) 30%, white),
      color-mix(in oklch, var(--chr-lapis-500) 18%, white));
  }
}

/* ─── Curriculum — saffron deep hero ─── */
@media print {
  [data-page-personality="curriculum"] header.page-h {
    background: linear-gradient(135deg,
      color-mix(in oklch, var(--chr-saffron-400) 28%, white),
      color-mix(in oklch, var(--chr-saffron-700) 18%, white));
  }
}

/* ════════════════════════════════════════════════════════════════════════
   Worker 24 / Phase 5 — Print Discipline:
   1. ١٥ توقيع شخصي + موروث W21 P5 baseline.
   2. print-color-adjust: exact على كل block (preserve tint).
   3. page-break-before: always على كل section.page.
   4. footer counter "صفحة X من Y" ثابت.
   5. blockquote, qcalc-panel: page-break-inside: avoid.
   6. orphans + widows = 3 (no orphan lines).
   ════════════════════════════════════════════════════════════════════════ */

/* End DUAL-FORM v3 / Phase 5 — Print Atelier — Pack v3 COMPLETE ──────── */
```

### Step 3 — Add date attribute (optional polish)

في app.js entry (لكن خفيف):

```javascript
// Set print-date attribute on body for header print
document.addEventListener('DOMContentLoaded', () => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('ar-EG', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  document.body.setAttribute('data-print-date', dateStr);
});
```

> **اختياري:** لو الـ `@page @top-left { content: attr(data-print-date) }` لا يُدعَم في كل المتصفحات، نَستعمل JS-set string في footer هياكل manual.

---

## 🧪 Sanity Probe

```bash
# Print rules
grep -c '@media print' platform/assets/css/motion.css              # → ≥17 (1 baseline + 15 personality + 1 generic)
grep -c 'data-page-personality.*header\.page-h' platform/assets/css/motion.css  # → ≥15

# Tokens
grep -c '\-\-print-' platform/assets/css/tokens.css                # → ≥6

# Page breaks
grep -c 'page-break\|break-before\|break-after\|break-inside' platform/assets/css/motion.css  # → ≥6

# Browser test:
# Open any page → Print preview (Cmd+P)
# Hero band visible with personality tint
# h2 with tint underline
# Footer "صفحة X من Y"
# Switch to psych → ornament ✿ visible
# Switch to programming → code blocks have light bg
# Switch to eq → mihrab gradient + 𓆭 ornament
# All other pages → distinct hero gradients
```

---

## ✅ معايير القبول (Phase 5 — Worker 24 + Pack v3 final)

- [ ] 15 per-personality `@media print` blocks.
- [ ] Hero band per page (tint gradient).
- [ ] h2 tint underline.
- [ ] Footer page counter.
- [ ] Top-left date stamp.
- [ ] page-break / break-* applied.
- [ ] qcalc / blockquote: avoid break-inside.
- [ ] All non-printable chrome hidden.
- [ ] print-color-adjust: exact.
- [ ] **DUAL-FORM Worker 24 مكتمل — 5/5 phases.**
- [ ] **Pack v3 DEVOTIO مكتمل — 5/5 Workers — 27 Phases.**

---

## 📤 Commit + Push (final — Worker 24 + Pack v3 complete)

```bash
git add platform/assets/css/motion.css platform/assets/css/tokens.css
git commit -m "phase 5 (devotio): print atelier — 15 per-personality print signatures (hero gradient + h2 underline + footer counter + page-break refinements) — worker 24 complete — pack v3 COMPLETE"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-24-phase-5.json
git commit -m "state: devotio phase 5 (worker 24) complete — pack v3 ALL DONE (27 phases / 5 workers)"
# push immediately
```

### Open PR (Worker 24)

```
gh pr create \
  --base main \
  --head worker-24-devotio \
  --title "feat: Worker 24 — DUAL-FORM DEVOTIO (5/5 phases) — Pack v3 COMPLETE" \
  --body "Pack v3 Worker 24 (final) complete.

## Phases done
1. dvh & Safe Area — 100vh→100dvh, env(safe-area-inset-*), viewport-fit=cover
2. Bottom Nav — mobile-only 5 destinations + center FAB cmdk + RTL-aware
3. Swipe Gestures — 3 variants (page/calc/dismiss), PointerEvents, RTL-aware
4. Haptic Layer — 5 patterns + opt-in toggle + auto-trigger
5. Print Atelier — 15 per-personality signatures with hero gradients

## Sacred preservation
- 14+ page sections + curriculum ✓
- 391 qcalc references ✓
- 30 Upg.* APIs (29 + Upg.touch) ✓
- Desktop sidebar untouched ✓
- All Pack v1/v2/v3 W20-W23 features preserved ✓

## Pack v3 DEVOTIO COMPLETE
- Worker 20: TASMEEM — typography offline-first
- Worker 21: CHROMATIC — 12 Arabic colors
- Worker 22: RITUAL — entry/halo/threshold/inkpot/atmosphere/aura
- Worker 23: DECONSTRUCTION — @layer + monolith breakup + ESM
- Worker 24: DUAL-FORM — mobile + print

## Devotion check
- 0 external requests preserved ✓
- 0 Google Fonts ✓
- All 9 fonts local ✓
- Mobile-native UX (touch targets, swipe, haptic) ✓
- Print signatures per page ✓"
```

— نهاية Worker 24 — **نهاية Pack v3 DEVOTIO**.

🖨️ **Devotion check final:** هل المنصة تَطبَع بهويتها؟ هل Pack v3 مُكتمل بـ ٥ Workers + ٢٧ Phases؟ → الـ branch مفتوح، Pack v3 يَنتظر مراجعة المالك.

🕯️ **Devotion over decoration. Roots over flash. Offline over online.**
