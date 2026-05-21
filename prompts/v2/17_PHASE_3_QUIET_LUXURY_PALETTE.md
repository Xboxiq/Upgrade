# 🌌 WORKER 17 — Phase 3/6 — Quiet Luxury Palette Activation
> **اقرأ أولاً:** `prompts/v2/17_WORKER_CREATIVE_REVOLUTION.md` — قسم **Preservation Guard**.
> **يبني فوق:** Worker 17 Phases 1+2.
> **الفلسفة:** *الذهب يلمع لأنه نادر. الأسود يحكم لأنه لا يستعجل. لا نبيع طبقاً مذهَّباً — نبيع طاولة ضوء.*

---

## 🛡️ Preservation Contract (Phase 3)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` | **REPLACE-IN-PLACE** للـ semantic color tokens (②) → tie to `--quiet-*` palette + **REPLACE** كل 15 page-personality tint إلى Nebula Gold variants | تعديل أي قاعدة styling لـ component (تستهلك tokens — لا تتأثر) |
| `index.html` | لا يُلمَس | أي تعديل |
| `app.js` | لا يُلمَس | أي تعديل |

**Sacred preserved:**
- 15 `data-page-personality` attributes (تبقى — لكن قيمها اللونية تُحدَّث في `--type-page-accent-vis`).
- `Upg.identity` (W12 P5) — السلوك يبقى، الـ tints الجديدة تُستهلَك تلقائياً.
- 15 page sections + IDs.

---

## 🎯 الهدف

Phase 3 يُفعِّل **الهوية البصرية الجديدة**:

1. Repoint جميع `--color-*` semantic tokens إلى `--quiet-*` palette.
2. تحديث 15 page-personality identity tints من cyan/teal/violet → Nebula Gold variants (15 hue shifts خفيفة في oklch).
3. AAA contrast verification (WCAG 1.4.6).
4. Light theme موازٍ متناسق.
5. Focus rings تتحوّل لـ Nebula Gold (إشارة ذكية).

> Phase 3 **يُغيّر شكل المنصة** — هذا أول phase له أثر بصري واضح. كل phase قبله كان structural.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 3 PRE-FLIGHT
├─ Phase: 3/6 — Quiet Luxury Palette Activation
├─ Estimated lines changed: ~360 (15 personality tints + semantic repointing + light theme)
├─ Files to touch:
│   └─ platform/assets/style.css
├─ Sacred verify (BEFORE):
│   ├─ grep -c -- '--quiet-void' platform/assets/style.css   → ≥1 (Phase 1 done)
│   ├─ grep -cE '^:root\b' platform/assets/style.css         → 1
│   ├─ grep -c 'data-page-personality' platform/index.html   → ≥15
│   └─ grep -c '<section class="page"' platform/index.html  → 14
└─ Branch: continue worker-17-creative-revolution
```

---

## 🧱 خطوات التنفيذ

### Step 1 — Activate Quiet Luxury Semantic Tokens

في `:root` block (Phase 1)، استبدل القيم:

```css
:root {
  /* ① CORE PALETTE — unchanged from Phase 1 */
  --quiet-void:        #06070B;
  --quiet-slate:       #0D0F16;
  --quiet-slate-2:     #11141D;
  --quiet-gold:        #D4AF37;
  --quiet-gold-soft:   #B8962F;
  --quiet-ivory:       #F3F4F6;
  --quiet-lochmara:    #6B7280;
  --quiet-line:        #1A1D27;

  /* ② SEMANTIC COLOR — PHASE 3 REPOINT (was tied to old v16 values) */
  --color-bg:          var(--quiet-void);
  --color-surface-1:   var(--quiet-slate);
  --color-surface-2:   var(--quiet-slate-2);
  --color-text:        var(--quiet-ivory);
  --color-text-muted:  color-mix(in oklch, var(--quiet-ivory) 70%, var(--quiet-lochmara));
  --color-text-faint:  var(--quiet-lochmara);
  --color-border:      var(--quiet-line);
  --color-tint:        var(--quiet-gold);   /* default — overridden per page */
  --color-brand:       var(--quiet-gold);

  /* Backward-compat aliases (③ from Phase 1) — repointed automatically */
  --bg-deep:    var(--color-bg);
  --bg-1:       var(--color-surface-1);
  --bg-2:       var(--color-surface-2);
  --text-1:     var(--color-text);
  --text-2:     var(--color-text-muted);
  --text-3:     var(--color-text-faint);
  --border-1:   var(--color-border);
  --brand:      var(--color-brand);
}
```

### Step 2 — 15 Page Personality Re-tinting

كل page personality في W12 P5 / W15 P6 كان له identity tint cyan/teal/violet. الآن نُحوّلها لـ **Nebula Gold variants** بـ hue shifts خفيفة في oklch.

**Strategy:** كل personality يبقى مميَّزاً عن الآخر، لكن كلها تنتمي لـ "ذهب سينمائي". الـ hue shifts ≤ ±25° من 80° (gold center).

```css
/* ════════════════════════════════════════════════════════════════
   Worker 17 / Phase 3 — 15 Page Personality Tints (Nebula Gold variants)
   All variants stay within oklch(L:62-72%, C:0.10-0.16, H:55-105°)
   to maintain Quiet Luxury cohesion.
   ════════════════════════════════════════════════════════════════ */

[data-page-personality="dashboard"]    { --color-tint: oklch(70% 0.12 80); --type-page-accent-vis: oklch(70% 0.12 80); }
[data-page-personality="callcenter"]   { --color-tint: oklch(68% 0.13 70); --type-page-accent-vis: oklch(68% 0.13 70); }
[data-page-personality="fieldsales"]   { --color-tint: oklch(72% 0.14 95); --type-page-accent-vis: oklch(72% 0.14 95); }
[data-page-personality="accountmgr"]   { --color-tint: oklch(64% 0.10 75); --type-page-accent-vis: oklch(64% 0.10 75); } /* executive: dimmer */
[data-page-personality="social"]       { --color-tint: oklch(72% 0.16 100); --type-page-accent-vis: oklch(72% 0.16 100); } /* vibrant: warmer */
[data-page-personality="lab"]          { --color-tint: oklch(68% 0.14 105); --type-page-accent-vis: oklch(68% 0.14 105); } /* experimental: greener-gold */
[data-page-personality="psych"]        { --color-tint: oklch(66% 0.11 65); --type-page-accent-vis: oklch(66% 0.11 65); } /* literary: warmer-amber */
[data-page-personality="eq"]           { --color-tint: oklch(70% 0.13 85); --type-page-accent-vis: oklch(70% 0.13 85); } /* emotional */
[data-page-personality="negotiation"]  { --color-tint: oklch(68% 0.14 75); --type-page-accent-vis: oklch(68% 0.14 75); } /* persuasive */
[data-page-personality="customercare"] { --color-tint: oklch(70% 0.13 90); --type-page-accent-vis: oklch(70% 0.13 90); } /* warm */
[data-page-personality="programming"]  { --color-tint: oklch(66% 0.10 80); --type-page-accent-vis: oklch(66% 0.10 80); } /* technical: muted */
[data-page-personality="accounting"]   { --color-tint: oklch(64% 0.10 78); --type-page-accent-vis: oklch(64% 0.10 78); } /* precise: slightly muted */
[data-page-personality="phonerepair"]  { --color-tint: oklch(62% 0.11 75); --type-page-accent-vis: oklch(62% 0.11 75); } /* industrial: darker */
[data-page-personality="hrmastery"]    { --color-tint: oklch(66% 0.11 72); --type-page-accent-vis: oklch(66% 0.11 72); } /* formal */
[data-page-personality="myprogress"]   { --color-tint: oklch(68% 0.12 85); --type-page-accent-vis: oklch(68% 0.12 85); } /* reflective */
```

### Step 3 — Light Theme Equivalent

في `[data-theme="light"]`:

```css
[data-theme="light"] {
  --color-bg:          var(--quiet-linen);     /* #F7F5F1 */
  --color-surface-1:   var(--quiet-linen-2);   /* #EDEAE4 */
  --color-surface-2:   color-mix(in oklch, var(--quiet-linen-2) 70%, var(--quiet-ink) 30%);
  --color-text:        var(--quiet-ink);       /* #0F1115 */
  --color-text-muted:  var(--quiet-graphite);  /* #5A6270 */
  --color-text-faint:  color-mix(in oklch, var(--quiet-graphite) 70%, var(--quiet-linen));
  --color-border:      color-mix(in oklch, var(--quiet-graphite) 30%, transparent);
  --color-tint:        var(--quiet-gold-dim);  /* #A88A2A */
  --color-brand:       var(--quiet-gold-dim);
}

/* Light theme dim each personality variant */
[data-theme="light"] [data-page-personality]   { --color-tint: oklch(54% 0.10 80); --type-page-accent-vis: oklch(54% 0.10 80); }
[data-theme="light"] [data-page-personality="lab"]    { --color-tint: oklch(54% 0.12 105); --type-page-accent-vis: oklch(54% 0.12 105); }
[data-theme="light"] [data-page-personality="social"] { --color-tint: oklch(56% 0.13 100); --type-page-accent-vis: oklch(56% 0.13 100); }
/* Other personalities can use the generic [data-theme="light"] [data-page-personality] rule above */
```

### Step 4 — Focus Ring → Nebula Gold

```css
/* ─── Focus rings (replace cyan brand glow with gold) ─── */
:where(*):focus-visible {
  outline: 2px solid var(--color-tint, var(--quiet-gold));
  outline-offset: 2px;
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-gold);
}

/* Disable outline on elements that have their own focus styles */
.qcalc-input:focus-visible,
.cmdk-input:focus-visible,
.form-input:focus-visible,
.block-practice-reflect-input:focus-visible {
  outline: 2px solid var(--quiet-gold);
  outline-offset: 0;
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--quiet-gold) 25%, transparent);
}
```

### Step 5 — Selection Highlight

```css
::selection {
  background: color-mix(in oklch, var(--quiet-gold) 30%, transparent);
  color: var(--quiet-ivory);
}

[data-theme="light"] ::selection {
  background: color-mix(in oklch, var(--quiet-gold-dim) 30%, transparent);
  color: var(--quiet-ink);
}
```

### Step 6 — Scrollbar (Subtle Gold Track)

```css
/* ─── Scrollbar — Quiet Luxury ─── */
* {
  scrollbar-width: thin;
  scrollbar-color: color-mix(in oklch, var(--quiet-gold) 35%, transparent)
                   color-mix(in oklch, var(--color-surface-1) 70%, transparent);
}

*::-webkit-scrollbar { width: 8px; height: 8px; }
*::-webkit-scrollbar-track {
  background: color-mix(in oklch, var(--color-surface-1) 60%, transparent);
}
*::-webkit-scrollbar-thumb {
  background: color-mix(in oklch, var(--quiet-gold-soft) 50%, transparent);
  border-radius: var(--radius-pill);
}
*::-webkit-scrollbar-thumb:hover {
  background: color-mix(in oklch, var(--quiet-gold) 75%, transparent);
}
```

### Step 7 — Discipline Comment & Validation

```css
/* ════════════════════════════════════════════════════════════════
   Discipline Comment — Worker 17 / Phase 3
   1. Quiet Luxury palette is now LIVE.
   2. Cyan/violet brand colors retired.
   3. 15 page personalities live in oklch(60-72%, 0.10-0.16, 55-105°).
   4. Nebula Gold reserved for: focus rings, active states, accent
      separators, milestone counters. Forbidden: bg, body text, decorative.
   5. Light theme dims gold to #A88A2A for AAA contrast.
   ════════════════════════════════════════════════════════════════ */
```

### Step 8 — AAA Contrast Verification

افتح المنصة بعد التطبيق و verify بـ DevTools (Lighthouse → Accessibility):

| Pair | Expected ratio (WCAG AAA = 7:1 normal text, 4.5:1 large) |
|---|---|
| `--color-text` على `--color-bg` | ≥ 13:1 (Premium Ivory على Void Black) |
| `--color-text-muted` على `--color-bg` | ≥ 7:1 |
| `--color-tint` (gold) على `--color-bg` | ≥ 5:1 (large text only — lit accent) |
| `--quiet-ink` على `--quiet-linen` | ≥ 13:1 |
| `--quiet-graphite` على `--quiet-linen` | ≥ 7:1 |

لو أيّ pair فشل → ضبط oklch lightness بـ ±5% حتى يمر.

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391
grep -c 'data-page-personality' platform/index.html   # → ≥15

# Phase 3 changes
grep -c -- '--color-bg: var(--quiet-void)' platform/assets/style.css  # → 1
grep -cE 'oklch\([0-9]+%' platform/assets/style.css   # → ≥30 (15 personalities × 2 tokens minimum)
grep -c '#66FCF1\|#4F46E5' platform/assets/style.css  # → 0 (cyan/violet retired)

# Visual checks (manual):
# - Default dark theme: pure black-ish bg, gold accent on focus
# - Light theme: linen bg, dimmed gold accent
# - Toggle theme: smooth transition (existing W11 P1 transition still works)
# - Each of 14 pages: subtle gold-variant tint visible on H1 underline + focus
# - Lighthouse Accessibility: 100
```

---

## ✅ معايير القبول (Phase 3)

- [ ] جميع semantic color tokens (`--color-*`) repointed لـ `--quiet-*`.
- [ ] 15 page personality tints محوّلة لـ oklch Nebula Gold variants.
- [ ] Light theme equivalents معرَّفة.
- [ ] Focus rings كلها gold.
- [ ] `::selection` gold-tinted.
- [ ] Scrollbar gold-themed.
- [ ] Zero cyan/violet hex literals باقية.
- [ ] AAA contrast على نصوص body + headings + tint.
- [ ] Lighthouse Accessibility ≥ 95 (هدف 100 في Phase 6).
- [ ] Theme toggle (dark/light) سلس.
- [ ] Console: 0 errors.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/style.css
git commit -m "phase 3 (creative): Quiet Luxury palette activated — Void Black/Deep Slate/Nebula Gold/Premium Ivory/Lochmara live, 15 page personalities re-tinted to oklch Gold variants (60-72% L / 0.10-0.16 C / 55-105° H), focus rings + selection + scrollbar all gold, light theme dimmed gold #A88A2A. Cyan/violet retired."

# state
git add state/PROGRESS.json state/snapshots/worker-17-phase-3.json
git commit -m "state: creative phase 3 committed and pushed"
```

— نهاية Phase 3.

🎵 **Resonance check:** هل المنصة الآن تشبه فيلماً سينمائياً، لا dashboard generic؟ نعم → انتقل لـ Phase 4.
