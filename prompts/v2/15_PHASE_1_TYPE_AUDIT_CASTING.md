# 🔍 WORKER 15 — Phase 1/6 — Type Audit & Casting
> **اقرأ أولاً:** `prompts/v2/15_WORKER_TYPOGRAPHY_SOUL.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Cathedral v16 ATELIER (Worker 12 P1+P1B + Worker 14 ATELIER).
> **الفلسفة:** *لا تربط خطاً بدور قبل أن تُجرَى مقابلة دور أولاً. الجرد قبل الـ casting.*

---

## 🛡️ Preservation Contract (Phase 1)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` `:root` tokens | **APPEND** 9 tokens جديدة (`--type-voice-hero`, `--type-voice-display`, `--type-voice-body`, ...) كـ aliases تشير إلى `--font-*` الموجودة | تعديل أي `--font-*` token موجود |
| `style.css` rules | **APPEND** كتلة "Type Voice Bindings v2" جديدة في النهاية | تعديل أي قاعدة typography من W12 P1 أو P1B |
| `index.html` | **AUGMENT** فقط — إضافة `data-type-voice` attribute على ≤30 عنصر بحدود واضحة (sample) | حذف عناصر، تغيير IDs، تعديل النصوص |
| `app.js` | لا تُلمَس في Phase 1 (Phase 6 يضيف Upg.type2) | أي تعديل |

**Sacred preserved:**
- جميع `.h-display`, `.h-title`, `.h-section`, `.h-eyebrow`, `.h-quote`, `.h-card`, `.h-mono`, `.u-num` من W12 P1B تبقى تشتغل بدون تغيير.
- `--font-display`, `--font-text`, `--font-numeric`, `--font-accent`, `--font-mono` لا تُلمَس قيمها.

---

## 🎯 الهدف

Phase 1 لا يكتب CSS كثيراً ولا يحمّل خطوطاً جديدة. هدفه **معرفي ومعماري**:

1. **جرد كل أنواع المحتوى** الموجود فعلياً في الـ 14 صفحة (heading levels, body, quote, callout, code, number, label, hint, citation, alert, scenario, eyebrow, signature, breadcrumb).
2. **تحديد 9 أصوات typography** (voices) تكفي وتمتّع.
3. **Casting**: ربط كل voice بـ font + weight + size + leading + tracking.
4. **إضافة 9 voice tokens** (`--type-voice-*`) تشير إلى الـ `--font-*` الموجودة.
5. **إضافة 16 utility class** بنمط `.type-<voice>` (للاختبار في Phase 6).
6. **AUGMENT** عيّنة (10-15 عنصراً) في index.html بـ `data-type-voice` لاختبار النظام.

> Phase 1 = خارطة. Phases 2-6 = تطبيق.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 1 PRE-FLIGHT
├─ Phase: 1/6 — Type Audit & Casting
├─ Estimated lines: ~480
├─ Files to touch:
│   ├─ platform/assets/style.css   (APPEND ~360 lines)
│   └─ platform/index.html         (AUGMENT data-type-voice on 10-15 sample elements)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '<section class="page"'           → 14
│   ├─ grep -c 'qcalc'                            → 391
│   ├─ grep -oE 'window\.Upg\.[a-z]+' | sort -u | wc -l  → 19
│   └─ grep -c "Cairo" platform/assets/style.css  → ≥3 (preserved)
├─ Branch: NEW worker-15-resonance (from latest main)
└─ No new fonts loaded yet (Phase 2 onwards).
```

---

## 🧱 خطوات التنفيذ (بالترتيب)

### Step 1 — جرد أنواع المحتوى (Audit Inventory)

افحص الـ 14 صفحة بـ grep واستخرج كل أنواع النصوص. النتيجة المتوقّعة (وثّقها كـ comment في style.css):

```
Content Types Inventory (Worker 15 / Phase 1 — Audit):
─────────────────────────────────────────────────────
✅ heading-hero       — Wordmark, Gateway headline, Page main h1
✅ heading-display    — h1 inside page-header (after emoji-purge)
✅ heading-section    — h2 (section dividers within page)
✅ heading-card       — h3/h4 (card titles, calc titles)
✅ body-paragraph     — long-form content, lesson text
✅ body-lead          — intro lines, hero subtitles
✅ ui-label           — buttons, tab labels, breadcrumbs, sidebar items
✅ ui-hint            — captions, helper text, form hints
✅ numeric-tabular    — stat-tile values, qcalc values, count-up tickers
✅ numeric-inline     — numbers inside paragraphs
✅ code-block         — pre/code in programming page
✅ code-inline        — inline code/kbd
✅ quote-literary     — philosophy quotes in psych/eq pages
✅ quote-citation     — academic citations / sources
✅ accent-arabic      — eyebrows, signatures, ornamental ribbons
✅ alert-warning      — warning blocks, danger callouts
✅ scenario-iraqi     — Iraqi market dialogue scenarios
✅ legal-fineprint    — terms, footnotes
```

### Step 2 — Type Voice Tokens (الـ 9 Voices)

في `style.css`، **APPEND** قبل أي قواعد أخرى من Phase 1:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Type Voice Tokens (Worker 15 / Phase 1)
   9 voices, each casts a font family + role.
   These are aliases over --font-* tokens (defined in W12 P1B).
   Phases 2-6 will add new font families behind these aliases.
   ════════════════════════════════════════════════════════════════ */
:root {
  /* Voice 1 — HERO: wordmark, gateway, page-h1 (most prestigious) */
  --type-voice-hero:        var(--font-display);

  /* Voice 2 — DISPLAY: h1/h2 (page section dividers) */
  --type-voice-display:     var(--font-display);

  /* Voice 3 — BODY: paragraphs, lesson text (most-read) */
  --type-voice-body:        var(--font-text);

  /* Voice 4 — UI: labels, buttons, tabs, breadcrumbs */
  --type-voice-ui:          var(--font-text);

  /* Voice 5 — NUMERIC: stats, qcalc, count-ups (tabular-nums lock) */
  --type-voice-numeric:     var(--font-numeric);

  /* Voice 6 — CODE: pre/code/kbd (mono lock) */
  --type-voice-code:        var(--font-mono);

  /* Voice 7 — QUOTE: literary citations, philosophy lines (Phase 4 elevates to Fraunces) */
  --type-voice-quote:       var(--font-accent);

  /* Voice 8 — ACCENT: eyebrows, ribbons, signatures (Aref Ruqaa exclusive) */
  --type-voice-accent:      var(--font-accent);

  /* Voice 9 — LATIN: mixed Arabic-Latin segments (Phase 4 binds Inter) */
  --type-voice-latin:       var(--font-text);
}
```

> **ملاحظة:** كل voice token **alias** على font موجود في Cathedral v16. Phase 2-4 تُحدِّث القيم لتشير إلى الخطوط الجديدة (Tajawal، Inter، JetBrains Mono، Fraunces). هذا يحقّق **forward-compat** — الكود يستعمل voice tokens، الخطوط تتطوّر تحته بدون كسر شيء.

### Step 3 — Voice Specifications Block (التوصيف الكامل)

**APPEND** بعد voice tokens:

```css
/* ════════════════════════════════════════════════════════════════
   Voice Specifications — كل voice له mood + use case + technical specs.
   هذا توثيق مرجعي. القواعد الفعلية في Step 4.
   ════════════════════════════════════════════════════════════════ */
/*
Voice 1 — HERO (.type-hero)
  Used in: gateway wordmark, page-h1 hero, dashboard greeting
  Mood: prestige, authority, opening statement
  Specs: weight 800-900, tracking -0.025em, leading 1.05
  Font: Aref Ruqaa Bold (Phase 2) preempted by Reem Kufi 800 fallback

Voice 2 — DISPLAY (.type-display, .type-display-h)
  Used in: section h2 dividers
  Mood: clear hierarchy, confident
  Specs: weight 700-800, tracking -0.015em, leading 1.15
  Font: Reem Kufi 700 (existing)

Voice 3 — BODY (.type-body, .type-body-lead)
  Used in: paragraphs, intro leads, lesson text
  Mood: readable, calm, sustained reading
  Specs: weight 400-500, tracking 0, leading 1.7
  Font: Readex Pro variable (existing)

Voice 4 — UI (.type-ui-label, .type-button, .type-tab, .type-breadcrumb)
  Used in: interactive elements, navigation
  Mood: alert, confident, slightly compressed
  Specs: weight 500-600, tracking +0.01em (open), leading 1.4
  Font: Tajawal 500 (Phase 3 adds) preempted by Readex Pro 500 fallback

Voice 5 — NUMERIC (.type-num, .type-num-tabular, .type-num-display)
  Used in: stat-tile values, qcalc values, count-up tickers, prices
  Mood: precise, tabular, digital
  Specs: weight 600, tnum+lnum locked, leading 1.0 for displays
  Font: IBM Plex Sans Arabic 600 (existing) + JetBrains Mono Latin (Phase 4)

Voice 6 — CODE (.type-code, .type-code-inline)
  Used in: pre/code/kbd, technical snippets
  Mood: monospaced, syntax-aware, deliberate
  Specs: weight 400-500, ligatures on, leading 1.6
  Font: JetBrains Mono (Phase 4 adds) preempted by SF Mono fallback

Voice 7 — QUOTE (.type-quote, .type-quote-literary)
  Used in: philosophy citations, Bringhurst lines, Cialdini quotes
  Mood: literary, contemplative, italic-aware
  Specs: weight 400 italic, tracking 0, leading 1.65
  Font: Fraunces serif italic (Phase 4 adds) for Latin; Aref Ruqaa for Arabic

Voice 8 — ACCENT (.type-eyebrow, .type-signature, .type-ribbon)
  Used in: page-header eyebrows, cheat-sheet signatures, ornamental ribbons
  Mood: handwritten, soulful, ≤5% of content
  Specs: weight 400, tracking +0.04em, leading 1.5
  Font: Aref Ruqaa 400 (existing W12 P1B)

Voice 9 — LATIN (.type-latin, .type-latin-num)
  Used in: mixed Arabic-Latin tokens (USD prices, English brand names, abbreviations)
  Mood: harmonious with Arabic baseline
  Specs: matched x-height with Arabic body, weight matches context
  Font: Inter 400-700 variable (Phase 4 adds)
*/
```

### Step 4 — Utility Classes (16 class — للاختبار)

**APPEND** بعد التوصيف:

```css
/* ════════════════════════════════════════════════════════════════
   Type Voice Utility Classes — للاختبار في Phase 1.
   Phases 2-6 ستُحدِّث الـ specs الفعلية.
   استعمال: <h1 class="type-hero">..</h1>
   ════════════════════════════════════════════════════════════════ */

.type-hero {
  font-family: var(--type-voice-hero);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.05;
}

.type-display {
  font-family: var(--type-voice-display);
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.15;
}

.type-display-h {
  font-family: var(--type-voice-display);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.type-body {
  font-family: var(--type-voice-body);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.7;
}

.type-body-lead {
  font-family: var(--type-voice-body);
  font-weight: 500;
  letter-spacing: -0.005em;
  line-height: 1.55;
}

.type-ui-label {
  font-family: var(--type-voice-ui);
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1.4;
}

.type-button {
  font-family: var(--type-voice-ui);
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.2;
}

.type-tab {
  font-family: var(--type-voice-ui);
  font-weight: 500;
  letter-spacing: 0.015em;
  line-height: 1.3;
}

.type-breadcrumb {
  font-family: var(--type-voice-ui);
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.4;
  font-size: var(--text-sm);
}

.type-num {
  font-family: var(--type-voice-numeric);
  font-weight: 600;
  font-feature-settings: "tnum" 1, "lnum" 1, "kern" 1;
  font-variant-numeric: tabular-nums lining-nums;
}

.type-num-tabular {
  font-family: var(--type-voice-numeric);
  font-weight: 600;
  font-feature-settings: "tnum" 1, "lnum" 1, "kern" 1, "ss01" 1;
  font-variant-numeric: tabular-nums lining-nums;
  letter-spacing: 0;
}

.type-num-display {
  font-family: var(--type-voice-numeric);
  font-weight: 700;
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-variant-numeric: tabular-nums lining-nums;
  line-height: 1.0;
  letter-spacing: -0.02em;
}

.type-code {
  font-family: var(--type-voice-code);
  font-weight: 400;
  font-feature-settings: "calt" 1, "liga" 1;
  line-height: 1.6;
}

.type-code-inline {
  font-family: var(--type-voice-code);
  font-weight: 500;
  font-size: 0.9em;
  padding: 0.1em 0.35em;
  background: color-mix(in oklch, var(--color-surface-2) 60%, transparent);
  border-radius: 0.25em;
}

.type-quote {
  font-family: var(--type-voice-quote);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0;
  line-height: 1.65;
}

.type-quote-literary {
  font-family: var(--type-voice-quote);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0;
  line-height: 1.65;
  color: var(--color-text-muted);
  border-inline-start: 3px solid var(--color-tint, var(--color-brand));
  padding-inline-start: var(--space-4);
  margin-block: var(--space-5);
}

.type-eyebrow {
  font-family: var(--type-voice-accent);
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 1.5;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-transform: none;
}

.type-signature {
  font-family: var(--type-voice-accent);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.5;
  font-size: var(--text-base);
  color: var(--color-text-faint);
}

.type-ribbon {
  font-family: var(--type-voice-accent);
  font-weight: 700;
  letter-spacing: 0.03em;
  line-height: 1.4;
  font-size: var(--text-base);
}

.type-latin {
  font-family: var(--type-voice-latin);
  unicode-bidi: isolate;
}

.type-latin-num {
  font-family: var(--type-voice-latin);
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-variant-numeric: tabular-nums lining-nums;
  unicode-bidi: isolate;
}
```

### Step 5 — `[data-type-voice]` attribute selectors (للـ AUGMENT في HTML)

**APPEND** بعد utility classes:

```css
/* ════════════════════════════════════════════════════════════════
   Data-attribute alternative — للـ AUGMENT في HTML بدون classes.
   Useful for samples and progressive enhancement.
   ════════════════════════════════════════════════════════════════ */
[data-type-voice="hero"]       { font-family: var(--type-voice-hero); }
[data-type-voice="display"]    { font-family: var(--type-voice-display); }
[data-type-voice="body"]       { font-family: var(--type-voice-body); }
[data-type-voice="ui"]         { font-family: var(--type-voice-ui); }
[data-type-voice="numeric"]    { font-family: var(--type-voice-numeric); font-variant-numeric: tabular-nums lining-nums; }
[data-type-voice="code"]       { font-family: var(--type-voice-code); }
[data-type-voice="quote"]      { font-family: var(--type-voice-quote); font-style: italic; }
[data-type-voice="accent"]     { font-family: var(--type-voice-accent); }
[data-type-voice="latin"]      { font-family: var(--type-voice-latin); unicode-bidi: isolate; }
```

### Step 6 — AUGMENT في index.html (10-15 عنصر sample)

اختر 10-15 عنصراً تمثيلياً من 5 صفحات مختلفة وأضف `data-type-voice` لها (لا تغيِّر النصوص ولا الـ classes الموجودة):

أمثلة (ابحث بـ grep واستهدف):
- `gateway-wordmark` → `data-type-voice="hero"`
- `cath-stat-value` (4 instances) → `data-type-voice="numeric"`
- `page-h h1` في dashboard → `data-type-voice="display"`
- `page-h-eyebrow` (3-5 instances) → `data-type-voice="accent"`
- علامة اقتباس واحدة في page-psych → `data-type-voice="quote"`
- code block واحد في page-programming → `data-type-voice="code"`
- breadcrumb item واحد → `data-type-voice="ui"`

> **هدف:** اختبار بصري بسيط أن الـ tokens تعمل. لا تنشر `data-type-voice` على كل عنصر — هذا dirty بدون ضرورة. Phase 2-6 ستربط بـ classes أنيقة.

### Step 7 — Discipline Comment (دستور الذوق)

**APPEND** في النهاية:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE Typography Discipline — قواعد ذهبية:
   1. لا تستخدم font-family مباشرة في أي قاعدة جديدة. استعمل
      var(--type-voice-*) أو var(--font-*) فقط.
   2. الأرقام في حاسبات/stats دائماً var(--type-voice-numeric).
   3. body text و UI labels و buttons → var(--type-voice-ui)
      أو var(--type-voice-body) حسب السياق.
   4. h1/h2/hero/wordmark → var(--type-voice-hero) أو var(--type-voice-display).
   5. Aref Ruqaa لا يتجاوز 5% من نص الصفحة — للروح، ليس للقراءة.
   6. لا تخلط display و text في نفس السطر.
   7. لا تستخدم italic على Aref Ruqaa أو Reem Kufi.
   8. Latin segments في نص عربي → var(--type-voice-latin) + unicode-bidi: isolate.
   ════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 14
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 19
grep -c 'Cairo' platform/assets/style.css            # → ≥3 (preserved)

# New additions
grep -c '\-\-type-voice-' platform/assets/style.css  # → ≥18 (9 tokens × 2 instances)
grep -c '\.type-hero' platform/assets/style.css      # → 1
grep -c 'data-type-voice' platform/index.html        # → 10-15

# Console: zero errors after page load
# Visual: عناصر الـ sample تشتغل بدون كسر بصري
```

---

## ✅ معايير القبول (Phase 1)

- [ ] 9 voice tokens (`--type-voice-*`) معرَّفة في `:root`.
- [ ] 22 utility class (`.type-*`) مكتوبة وتشتغل.
- [ ] 9 selectors `[data-type-voice="..."]` تعمل.
- [ ] 10-15 عنصراً في index.html محمَّلون بـ `data-type-voice` للاختبار.
- [ ] Cairo + Reem Kufi + Readex Pro + IBM Plex Arabic + Aref Ruqaa: كلها لا تزال تشتغل.
- [ ] لا regression بصري في الـ 14 صفحة.
- [ ] جميع `.h-*` classes من Worker 12 P1B تشتغل بدون كسر.
- [ ] جميع `.u-num` references من Worker 12 P1B تشتغل بدون كسر.
- [ ] Console: 0 errors.
- [ ] grep counts الـ 14/391/19 محفوظة.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/style.css platform/index.html
git commit -m "phase 1 (resonance): type audit & casting — 9 voice tokens + 22 utilities + sample augmentation"
# push immediately
```

ثم state commit:

```bash
# update state/PROGRESS.json:
#   current.pack = "v2"
#   current.worker = "15"
#   current.phase = 1
#   current.status = "in-progress"
#   completed_phases.push({"worker":"15","phase":1,...})
#   next_action = "Continue Worker 15 Phase 2 — Arabic Display Crown"
# add snapshot state/snapshots/worker-15-phase-1.json

git add state/PROGRESS.json state/snapshots/worker-15-phase-1.json
git commit -m "state: resonance phase 1 committed and pushed"
# push immediately
```

— نهاية Phase 1.

🎵 **Resonance check:** هل صار عندك خارطة واضحة لـ 9 أصوات؟ نعم → انتقل لـ Phase 2.
