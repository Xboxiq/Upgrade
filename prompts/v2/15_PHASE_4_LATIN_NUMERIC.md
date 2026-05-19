# 🔢 WORKER 15 — Phase 4/6 — Latin & Numeric Layer
> **اقرأ أولاً:** `prompts/v2/15_WORKER_TYPOGRAPHY_SOUL.md` — Preservation Guard.
> **يبني فوق:** Phase 3 (Arabic Body & UI).
> **الفلسفة:** *الأرقام تتكلّم لغة الدقّة. الكلمات الإنجليزية تتنفّس بصمت بجانب العربية. الاقتباسات الأدبية تأخذ صوتاً خاصاً.*

---

## 🛡️ Preservation Contract (Phase 4)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` Google Fonts `<link>` | **AUGMENT URL** — إضافة Inter (variable 100..900) + JetBrains Mono (400/500/700) + Fraunces (400 italic + 600 italic) | حذف خط موجود |
| `style.css` `:root` | **REPLACE-IN-PLACE** قيمة `--font-numeric` (إضافة JetBrains Mono كـ second-tier للأرقام Latin) + **APPEND** `--font-latin` و `--font-quote-literary` | حذف IBM Plex Arabic |
| `style.css` rules | **APPEND** قواعد لـ `.type-num`, `.type-num-tabular`, `.type-num-display`, `.type-code`, `.type-code-inline`, `.type-quote-literary`, `.type-latin` (تعميق specs من Phase 1) + Latin-Arabic harmony rules | تعديل `.u-num` من W12 P1B |
| `index.html` | **AUGMENT** `cath-stat-value`, `qcalc-value`, code blocks في programming page بـ classes جديدة | تغيير القيم العددية |

**Sacred preserved:**
- IBM Plex Sans Arabic يبقى أساسياً للأرقام الـ Arabic-displayed.
- JetBrains Mono Latin fallback في الـ stack الموجود يصبح **مُحمَّل فعلياً**.
- 391 qcalc references لا تتغيّر (فقط classes تُضاف).

---

## 🎯 الهدف

Cathedral v16 يستعمل:
- **IBM Plex Arabic** للأرقام (تأكيد لكن ضعيف الـ binding).
- **JetBrains Mono** كـ fallback في monospace stack — لكن **غير محمَّل فعلياً** (يعتمد على mac fallback `SF Mono`).
- **لا Latin font عام** للكلمات الإنجليزية المختلطة (USD, KPI, OKR).
- **لا Serif voice** للاقتباسات الفلسفية في صفحة psych — كلها Aref Ruqaa.

**Phase 4 يحلّ:**

1. **JetBrains Mono** يُحمَّل فعلياً → code blocks في programming page تُصبح ligature-aware.
2. **Inter variable** يُحمَّل لـ Latin UI (USD, English brand names, abbreviations).
3. **Fraunces serif italic** للاقتباسات الأدبية الإنجليزية في psych/eq.
4. **Latin-Arabic harmony rules** — قواعد دقيقة لمزج الكلمتين في نفس السطر بدون regression باعدي/baseline.
5. **Tabular numerals lock** على كل stat-tile, qcalc, count-up.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 4 PRE-FLIGHT
├─ Phase: 4/6 — Latin & Numeric Layer
├─ Estimated lines: ~460
├─ Files to touch:
│   ├─ platform/index.html         (UPDATE Google Fonts <link> + AUGMENT ~25 numeric/code/quote)
│   └─ platform/assets/style.css   (UPDATE --font-numeric + APPEND ~380 lines)
├─ Sacred verify:
│   ├─ grep -c 'IBM+Plex'           → ≥1 (preserved)
│   ├─ grep -c 'cath-stat-value'    → 4 (preserved)
│   └─ grep -c 'qcalc'              → 391 (preserved)
├─ Branch: continue worker-15-resonance
```

---

## 🧱 خطوات التنفيذ

### Step 1 — تحديث Google Fonts `<link>`

```html
<link
  href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&family=Readex+Pro:wght@200..700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Aref+Ruqaa:wght@400;700&family=Tajawal:wght@300;400;500;700;900&family=Cairo:wght@400;600;700&family=Inter:wght@300..700&family=JetBrains+Mono:wght@400;500;700&family=Fraunces:ital,wght@0,400;0,600;1,400;1,600&display=swap"
  rel="stylesheet"
/>
```

**التغيير:** إضافة `&family=Inter:wght@300..700&family=JetBrains+Mono:wght@400;500;700&family=Fraunces:ital,wght@0,400;0,600;1,400;1,600`.

### Step 2 — تحديث Token Stacks

**REPLACE-IN-PLACE** قيمة `--font-numeric` و `--font-mono`:

```css
/* ─── RESONANCE v2 — Latin & Numeric stacks (Worker 15 / Phase 4) ─── */
--font-numeric: "IBM Plex Sans Arabic", "JetBrains Mono", "Readex Pro", "Cairo",
                ui-monospace, "SF Mono", monospace;

--font-mono:    "JetBrains Mono", "SF Mono", ui-monospace, "Cascadia Mono",
                "Fira Code", Menlo, Consolas, monospace;
```

**APPEND** tokens جديدة:

```css
/* RESONANCE v2 — Latin UI + Literary Quote (Worker 15 / Phase 4) */
--font-latin:   "Inter", "Readex Pro", "SF Pro Text", -apple-system,
                BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

--font-quote-literary: "Fraunces", "Readex Pro", "Times New Roman",
                       Georgia, serif;

--font-num-display: "JetBrains Mono", "IBM Plex Sans Arabic",
                    "SF Mono", monospace;
```

### Step 3 — تحديث Voice Token Aliases

**APPEND**:

```css
/* RESONANCE v2 — Voice token reroute (Worker 15 / Phase 4) */
:root {
  --type-voice-numeric:     var(--font-numeric);          /* updated stack */
  --type-voice-code:        var(--font-mono);             /* now JetBrains real */
  --type-voice-latin:       var(--font-latin);            /* new */
  --type-voice-quote:       var(--font-accent);           /* Aref Ruqaa for Arabic */
  --type-voice-quote-literary: var(--font-quote-literary); /* Fraunces for Latin */
}
```

### Step 4 — Numeric Layer Utilities

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Numeric Layer (Worker 15 / Phase 4)
   Tabular numerals locked. Display nums in JetBrains Mono.
   ════════════════════════════════════════════════════════════════ */

/* TYPE NUM — generic numeric, stat values */
.type-num,
[data-type-voice="numeric"] {
  font-family: var(--type-voice-numeric);
  font-weight: 600;
  font-feature-settings: "tnum" 1, "lnum" 1, "kern" 1;
  font-variant-numeric: tabular-nums lining-nums;
  letter-spacing: 0;
  unicode-bidi: isolate;
}

/* TYPE NUM TABULAR — for stat-tile values, count-ups */
.type-num-tabular {
  font-family: var(--type-voice-numeric);
  font-weight: 600;
  font-feature-settings: "tnum" 1, "lnum" 1, "kern" 1, "ss01" 1;
  font-variant-numeric: tabular-nums lining-nums;
  letter-spacing: 0;
  unicode-bidi: isolate;
}

/* TYPE NUM DISPLAY — for hero numbers, large CTAs */
.type-num-display {
  font-family: var(--font-num-display);
  font-weight: 700;
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-variant-numeric: tabular-nums lining-nums;
  line-height: 1.0;
  letter-spacing: -0.02em;
  unicode-bidi: isolate;
}

/* TYPE NUM INLINE — small numbers inside paragraphs */
.type-num-inline {
  font-family: var(--type-voice-numeric);
  font-feature-settings: "tnum" 1, "lnum" 1, "kern" 1;
  font-variant-numeric: tabular-nums lining-nums;
  unicode-bidi: isolate;
}

/* TYPE NUM CURRENCY — prices, salaries (with IQD/USD) */
.type-num-currency {
  font-family: var(--type-voice-numeric);
  font-weight: 600;
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-variant-numeric: tabular-nums lining-nums;
  unicode-bidi: isolate;
  /* Padding for IQD prefix/suffix */
  padding-inline: 0.1em;
}
```

### Step 5 — Code Layer Utilities

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Code Layer (Worker 15 / Phase 4)
   JetBrains Mono with ligatures + tab stops.
   ════════════════════════════════════════════════════════════════ */

/* TYPE CODE — for <pre>, code blocks */
.type-code,
[data-type-voice="code"] {
  font-family: var(--type-voice-code);
  font-weight: 400;
  font-feature-settings: "calt" 1, "liga" 1;
  line-height: 1.6;
  letter-spacing: 0;
  unicode-bidi: isolate;
  tab-size: 2;
  -moz-tab-size: 2;
}

/* TYPE CODE INLINE — <code> inline */
.type-code-inline {
  font-family: var(--type-voice-code);
  font-weight: 500;
  font-size: 0.9em;
  padding: 0.1em 0.35em;
  background: color-mix(in oklch, var(--color-surface-2) 60%, transparent);
  border-radius: 0.25em;
  unicode-bidi: isolate;
}

/* TYPE KBD — keyboard shortcuts (Cmd+K, Ctrl+S) */
.type-kbd,
kbd {
  font-family: var(--type-voice-code);
  font-weight: 600;
  font-size: 0.85em;
  padding: 0.15em 0.5em;
  background: var(--color-surface-2);
  border: 1px solid var(--color-text-faint);
  border-radius: 0.25em;
  box-shadow: 0 1px 0 var(--color-text-faint);
  unicode-bidi: isolate;
}
```

### Step 6 — Latin Layer Utilities

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Latin Layer (Worker 15 / Phase 4)
   Inter for mixed-script segments. Match Arabic baseline.
   ════════════════════════════════════════════════════════════════ */

/* TYPE LATIN — generic Latin segment in Arabic context */
.type-latin,
[data-type-voice="latin"] {
  font-family: var(--type-voice-latin);
  unicode-bidi: isolate;
  /* Inter في 14-16px = نفس x-height تقريباً مع Readex Pro Arabic */
}

/* TYPE LATIN UI — for Latin-only UI segments */
.type-latin-ui {
  font-family: var(--type-voice-latin);
  font-weight: 500;
  letter-spacing: -0.005em;
  line-height: 1.4;
  unicode-bidi: isolate;
}

/* TYPE LATIN NUM — Latin numbers (USD prices, %) */
.type-latin-num {
  font-family: var(--type-voice-latin);
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-variant-numeric: tabular-nums lining-nums;
  unicode-bidi: isolate;
}

/* TYPE LATIN BRAND — for English brand names (Asiacell, Earthlink) */
.type-latin-brand {
  font-family: var(--type-voice-latin);
  font-weight: 600;
  letter-spacing: -0.01em;
  unicode-bidi: isolate;
}

/* Mixed-script harmony — when Arabic word followed by Latin */
.type-mixed-harmony {
  /* القاعدة الذهبية: استخدم isolate لمنع bidi confusion */
  unicode-bidi: isolate;
  /* x-height alignment between scripts */
  font-feature-settings: "kern" 1;
}
```

### Step 7 — Literary Quote Layer

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Literary Quote Layer (Worker 15 / Phase 4)
   Fraunces italic for English literary citations.
   Aref Ruqaa for Arabic literary citations (preserved from W12 P1B).
   ════════════════════════════════════════════════════════════════ */

/* TYPE QUOTE — Arabic literary (Aref Ruqaa) — same as W12 P1B */
.type-quote,
[data-type-voice="quote"] {
  font-family: var(--type-voice-quote);
  font-weight: 400;
  font-style: normal;  /* Aref Ruqaa لا يدعم italic */
  letter-spacing: 0;
  line-height: 1.65;
}

/* TYPE QUOTE LITERARY EN — Fraunces italic for English citations */
.type-quote-literary-en {
  font-family: var(--type-voice-quote-literary);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0;
  line-height: 1.65;
  font-variation-settings: "opsz" 18, "SOFT" 50;
  unicode-bidi: isolate;
}

/* TYPE QUOTE BLOCK — full block quote with bar */
.type-quote-block {
  font-family: var(--type-voice-quote);
  font-weight: 400;
  font-size: var(--text-xl);
  line-height: 1.65;
  color: var(--color-text-muted);
  border-inline-start: 3px solid var(--color-tint, var(--color-brand));
  padding-inline-start: var(--space-4);
  margin-block: var(--space-5);
  position: relative;
}

.type-quote-block::before {
  content: "“";
  color: var(--color-tint, var(--color-brand));
  font-size: 1.4em;
  font-family: var(--font-quote-literary);
  vertical-align: -0.15em;
  margin-inline-end: 0.1em;
}

.type-quote-block::after {
  content: "”";
  color: var(--color-tint, var(--color-brand));
  font-size: 1.4em;
  font-family: var(--font-quote-literary);
  vertical-align: -0.15em;
  margin-inline-start: 0.1em;
}

/* TYPE CITATION — for academic source attribution */
.type-citation {
  font-family: var(--type-voice-body);
  font-weight: 400;
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--color-text-faint);
  font-style: italic;
  /* Latin numbers in citations should be lining */
  font-feature-settings: "lnum" 1;
}
```

### Step 8 — Latin-Arabic Mixing Rules (مهم جداً)

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Latin-Arabic Mixing Rules (Worker 15 / Phase 4)
   عند مزج العربية والإنجليزية في نفس النص:
   1. استخدم unicode-bidi: isolate على الـ Latin segment
   2. ضع class .type-latin على الـ Latin part
   3. تجنّب letter-spacing على mixed lines (يكسر باعدي)
   ════════════════════════════════════════════════════════════════ */

/* Auto-detect Latin in Arabic body — apply Inter */
.u-prose [lang="en"],
.u-prose .latin,
.type-body [lang="en"] {
  font-family: var(--type-voice-latin);
  unicode-bidi: isolate;
}

/* Numbers inside paragraphs — automatic tabular */
.u-prose .num,
.type-body .num {
  font-family: var(--type-voice-numeric);
  font-feature-settings: "tnum" 1, "lnum" 1;
  unicode-bidi: isolate;
}

/* Brand names auto-styled */
.u-prose .brand,
.type-body .brand {
  font-family: var(--type-voice-latin);
  font-weight: 600;
  letter-spacing: -0.01em;
  unicode-bidi: isolate;
}

/* Currency in mixed text */
.u-prose .currency,
.type-body .currency {
  font-family: var(--type-voice-numeric);
  font-feature-settings: "tnum" 1, "lnum" 1;
  unicode-bidi: isolate;
  white-space: nowrap;
}
```

### Step 9 — Tabular Numerals Auto-Apply

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Auto-apply tabular numerals on critical surfaces.
   ════════════════════════════════════════════════════════════════ */

/* Sacred IDs — preserve W11/W12/W13 selectors */
[data-cath-stat],
.cath-stat-value,
.bento-stat-value,
.qcalc-value,
.stat-tile-value,
[data-countup],
[data-tabular] {
  font-family: var(--type-voice-numeric);
  font-feature-settings: "tnum" 1, "lnum" 1, "kern" 1;
  font-variant-numeric: tabular-nums lining-nums;
  unicode-bidi: isolate;
}

/* Tables with numeric columns */
table.numeric-cols td,
table.numeric-cols th {
  font-family: var(--type-voice-numeric);
  font-feature-settings: "tnum" 1, "lnum" 1;
}
```

### Step 10 — AUGMENT في index.html

#### 10.1 — Stat Values (4 sacred IDs + duplicates)

ابحث عن `cath-stat-value`, `bento-stat-value`, `data-countup`. AUGMENT:

```html
<span class="cath-stat-value type-num-display" data-cath-stat="streak">7</span>
```

#### 10.2 — Code Blocks في programming page

ابحث عن `<pre>` و `<code>` داخل `#page-programming`. AUGMENT:

```html
<pre class="type-code"><code>const x = 42;</code></pre>
<p>متغير <code class="type-code-inline">let</code> يستعمل في...</p>
```

#### 10.3 — Currency في accounting / hrmastery

ابحث عن أرقام رواتب وأسعار. AUGMENT:

```html
<span class="type-num-currency">1,500,000</span>
<span class="type-latin">IQD</span>
```

#### 10.4 — Quote في psych / eq

ابحث عن اقتباسات. AUGMENT (إن لم تكن بالفعل):

```html
<blockquote class="type-quote-block">
  المعرفة قوة، لكن الفهم حكمة.
</blockquote>
```

أو للاقتباس الإنجليزي:
```html
<blockquote class="type-quote-block">
  <span class="type-quote-literary-en">"Knowledge is power, but understanding is wisdom."</span>
</blockquote>
```

### Step 11 — Discipline Comment

**APPEND**:

```css
/* ════════════════════════════════════════════════════════════════
   Worker 15 / Phase 4 — Latin & Numeric Discipline:
   1. Stat values + qcalc values → var(--type-voice-numeric) [IBM Plex Arabic + JetBrains].
   2. Code blocks → var(--type-voice-code) [JetBrains Mono ligatures on].
   3. Latin segments في عربي → .type-latin + unicode-bidi: isolate.
   4. Currency (IQD/USD) → .type-num-currency + nowrap.
   5. Brand names → .type-latin-brand.
   6. Arabic literary quotes → .type-quote (Aref Ruqaa).
   7. English literary quotes → .type-quote-literary-en (Fraunces italic).
   8. Academic citations → .type-citation.
   9. لا italic على Aref Ruqaa أبداً (يقطع الذوق).
   ════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 19
grep -c 'data-cath-stat=' platform/index.html         # → 4 (preserved)

# New fonts loaded
grep -c 'Inter:wght' platform/index.html               # → 1
grep -c 'JetBrains+Mono' platform/index.html           # → 1
grep -c 'Fraunces' platform/index.html                 # → 1

# New utilities
grep -c '\.type-num-display' platform/assets/style.css # → ≥1
grep -c '\.type-latin' platform/assets/style.css       # → ≥4
grep -c '\.type-quote-literary-en' platform/assets/style.css  # → ≥1
grep -c 'unicode-bidi: isolate' platform/assets/style.css     # → ≥8

# Visual:
# ✓ Stats في dashboard تعرض أرقام JetBrains Mono واضحة
# ✓ Code في programming page يستعمل JetBrains مع ligatures
# ✓ "USD" أو "IQD" في accounting تستعمل Inter (latin)
# ✓ Quote في psych إذا إنجليزي → Fraunces italic
```

---

## ✅ معايير القبول (Phase 4)

- [ ] Inter + JetBrains Mono + Fraunces محمَّلة فعلياً.
- [ ] `--font-latin`, `--font-quote-literary`, `--font-num-display` معرَّفة.
- [ ] `.type-num`, `.type-num-tabular`, `.type-num-display`, `.type-num-inline`, `.type-num-currency` تشتغل.
- [ ] `.type-code`, `.type-code-inline`, `.type-kbd` تشتغل مع JetBrains فعلياً.
- [ ] `.type-latin`, `.type-latin-ui`, `.type-latin-num`, `.type-latin-brand` تشتغل.
- [ ] `.type-quote-literary-en`, `.type-quote-block`, `.type-citation` تشتغل.
- [ ] `unicode-bidi: isolate` مطبَّق على Latin segments.
- [ ] All sacred IDs (`cath-stat-value`, `data-countup`, `qcalc-value`) موجودة وتأخذ tabular numerals.
- [ ] Console: 0 errors. لا regression بصري.

---

## 📤 Commit + Push

```bash
git add platform/assets/style.css platform/index.html
git commit -m "phase 4 (resonance): latin & numeric — Inter + JetBrains Mono + Fraunces + tabular nums + unicode-bidi isolate"

# state commit
git add state/PROGRESS.json state/snapshots/worker-15-phase-4.json
git commit -m "state: resonance phase 4 committed and pushed"
```

— نهاية Phase 4.

🎵 **Resonance check:** الأرقام صارت تتنفّس بلغة الدقّة، الكود يحس فيه ligatures؟ نعم → Phase 5.
