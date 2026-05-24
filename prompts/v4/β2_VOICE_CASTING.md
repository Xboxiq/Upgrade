# β2 — Voice Casting
> **Pillar β (TYPE SOUL) / Stage 2 of 3**
> الهدف: إسناد الـ 18 voice token إلى الـ 7 خطوط حسب دور لغوي + تجهيز per-world overrides.
> **التبعية:** β1 يجب أن ينتهي (الخطوط على القرص).

---

## السياق

`α2` أنشأ 18 voice slot فارغة. β1 حمّل 7 خطوط حقيقية. **β2 يربطها** ببنية معاكسة للـ AI cliché:
- ليس "خط واحد لكل شيء" (Cairo everywhere)
- ليس "خط لكل عنصر" (chaotic)
- بل **18 voice → 4 stack groups** كل group له فلسفة لغوية

---

## 🎨 Creativity Beacon

**Type:** ✍️ TYPOGRAPHIC_BEACON
**The Surprise:** كل voice له **fallback chain** يعكس سياسة عربية-أولاً صارمة. لو الخط الأول فشل، الـ fallback ليس "system-ui" (الكليشيه)، بل خط آخر من الـ 7 يحمل نفس الـ voice character. النتيجة: حتى في حالة font fail، الواجهة لا تكسر شخصيتها.
**Reference Avoided:** #19 generic system-ui fallback
**Inspired-by:** #10 Nasta'liq calligraphy (طبقات من النسخ بدلاً من خط واحد)
**Originality Self-Score:** 4/5

---

## التنفيذ

### ١. حدِّث `tokens/_type.css` — املأ الـ 18 voice tokens

```css
/* ÊLAN v4 — β2 — 18 Voice Tokens (filled)
   4 stack groups + Latin counterpart for :lang(en) */

:root {
  /* Group A — DISPLAY (titles, hero, accent moments) */
  --voice-hero:        "Boutros Modern Kufi", "29LT Bukra", "Lateef", serif;
  --voice-display:     "Boutros Modern Kufi", "29LT Bukra", "Lateef", serif;
  --voice-display-h:   "29LT Bukra", "Boutros Modern Kufi", system-ui, sans-serif;
  --voice-display-l:   "Markazi Text", "Lateef", "Boutros Modern Kufi", serif;

  /* Group B — BODY (long-form reading) */
  --voice-body:        "Markazi Text", "Lateef", "Vazirmatn", serif;
  --voice-body-lead:   "Markazi Text", "Lateef", "Vazirmatn", serif;
  --voice-quote:       "Lateef", "Markazi Text", "Amiri Quran Colored", serif;

  /* Group C — UI (buttons, labels, navigation) */
  --voice-ui:          "Vazirmatn", "29LT Bukra", "Almarai", sans-serif;
  --voice-label:       "Vazirmatn", "Almarai", system-ui, sans-serif;
  --voice-eyebrow:     "29LT Bukra", "Vazirmatn", "Almarai", sans-serif;

  /* Group D — NUMERIC + STRUCTURAL */
  --voice-numeric:     "Almarai", "Vazirmatn", system-ui, sans-serif;
  --voice-num-tabular: "Almarai", "JetBrains Mono", monospace;
  --voice-code:        "JetBrains Mono", ui-monospace, monospace;

  /* Group E — SPECIAL (accents, ribbons, meta) */
  --voice-accent:      "Amiri Quran Colored", "Lateef", "Markazi Text", serif;
  --voice-signature:   "Boutros Modern Kufi", "Amiri Quran Colored", serif;
  --voice-ribbon:      "29LT Bukra", "Vazirmatn", "Almarai", sans-serif;

  /* Group F — LATIN-ONLY (English wordmarks, Latin embedded) */
  --voice-latin:       "Geist", "Inter", system-ui, sans-serif;
  --voice-wordmark:    "Geist", "Boutros Modern Kufi", sans-serif;
}

/* Latin override when content is explicitly English */
:lang(en) {
  --voice-body: "Geist", "Inter", system-ui, serif;
  --voice-ui:   "Geist", "Inter", system-ui, sans-serif;
}
```

### ٢. أنشئ `tokens/_voice-utilities.css` — classes تطبيقية

```css
/* ÊLAN v4 — β2 — Voice utility classes
   Apply via class instead of inline styles (ζ1 will purge inline). */

.v-hero        { font-family: var(--voice-hero);      font-weight: 800; line-height: var(--lead-tight); }
.v-display     { font-family: var(--voice-display);   font-weight: 700; line-height: var(--lead-snug);  }
.v-display-h   { font-family: var(--voice-display-h); font-weight: 800; line-height: var(--lead-tight); }
.v-display-l   { font-family: var(--voice-display-l); font-weight: 500; line-height: var(--lead-snug);  }

.v-body        { font-family: var(--voice-body);      font-weight: 400; line-height: var(--lead-normal);  }
.v-body-lead   { font-family: var(--voice-body-lead); font-weight: 500; line-height: var(--lead-relaxed); }
.v-quote       { font-family: var(--voice-quote);     font-weight: 400; line-height: var(--lead-relaxed); font-style: italic; }

.v-ui          { font-family: var(--voice-ui);        font-weight: 500; line-height: var(--lead-normal); }
.v-label       { font-family: var(--voice-label);     font-weight: 500; line-height: var(--lead-snug);   }
.v-eyebrow     { font-family: var(--voice-eyebrow);   font-weight: 600; line-height: 1.0; letter-spacing: var(--track-eyebrow); text-transform: uppercase; font-size: var(--fs-xs); }

.v-numeric     { font-family: var(--voice-numeric);     font-weight: 600; font-feature-settings: "lnum" 1; }
.v-num-tabular { font-family: var(--voice-num-tabular); font-weight: 600; font-feature-settings: "tnum" 1, "lnum" 1; font-variant-numeric: tabular-nums lining-nums; }
.v-code        { font-family: var(--voice-code);        font-weight: 400; font-feature-settings: "calt" 0; }

.v-accent      { font-family: var(--voice-accent);    font-weight: 400; line-height: var(--lead-tight); }
.v-signature   { font-family: var(--voice-signature); font-weight: 700; line-height: 1.0; letter-spacing: var(--track-snug); }
.v-ribbon      { font-family: var(--voice-ribbon);    font-weight: 600; line-height: 1.0; letter-spacing: var(--track-loose); }

.v-latin       { font-family: var(--voice-latin); font-weight: 400; }
.v-wordmark    { font-family: var(--voice-wordmark); font-weight: 700; letter-spacing: var(--track-tight); }
```

### ٣. سجِّل في `tokens.css`:
```css
/* أضف بعد _breakpoint */
@import url("./tokens/_voice-utilities.css");
```

### ٤. أنشئ `platform/voice-test.html` (أداة فحص)

```html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>ÊLAN v4 — Voice Test Sheet</title>
  <link rel="stylesheet" href="assets/style.css">
  <style>body{padding:2rem;max-width:720px;margin:0 auto}section{margin-bottom:2rem;padding:1rem;border-bottom:1px solid var(--line)}</style>
</head>
<body>
  <h1 class="v-hero">v-hero — العَودة إلى الأصل</h1>
  <h2 class="v-display">v-display — هذي عناوين أبواب</h2>
  <h3 class="v-display-h">v-display-h — هذي عناوين فرعيه ثقيلة</h3>
  <h3 class="v-display-l">v-display-l — هذي خفيفة شعرية</h3>
  <p class="v-body">v-body — يجب أن يَقرأ هذا النص بسلاسة في فقرات طويلة، تتشكَّل فيها الكلمات كأنها تتنفس على الورق دون عَرَج.</p>
  <p class="v-body-lead">v-body-lead — مقدمة كبيرة قليلاً تجذب القارئ.</p>
  <blockquote class="v-quote">v-quote — «من بَطُؤَ به عَمَلُه لم يُسرع به نَسَبُه».</blockquote>
  <button class="v-ui">v-ui — ابدأ التحدي</button>
  <span class="v-label">v-label — التقدُّم اليومي</span>
  <span class="v-eyebrow">v-eyebrow — مرحلة 3</span>
  <p>v-numeric: <span class="v-numeric">١٢٣٤ 1234</span></p>
  <p>v-num-tabular: <span class="v-num-tabular">12,345.67</span></p>
  <pre class="v-code">const x = 42;</pre>
  <p class="v-accent">v-accent — بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
  <p class="v-signature">v-signature — Upgrade</p>
  <p class="v-ribbon">v-ribbon — مكافأة 500 نقطة</p>
  <p class="v-latin">v-latin — Latin sample text 1234.</p>
</body>
</html>
```

### ٥. غيّر default body font في `base.css`:
```css
body {
  font-family: var(--voice-body);
  font-feature-settings: "kern" 1, "liga" 1;
}
```

---

## Acceptance Criteria

- [ ] `tokens/_type.css` يحتوي 18 voice token (محدَّث)
- [ ] `tokens/_voice-utilities.css` موجود ويحتوي 18 utility class
- [ ] `tokens.css` يستورد _voice-utilities
- [ ] `platform/voice-test.html` يفتح ويُظهِر كل voice مختلف
- [ ] `base.css` body يستخدم `var(--voice-body)`
- [ ] grep: `grep -c '\-\-voice-' platform/assets/css/tokens/_type.css` ≥ 18
- [ ] grep: `grep -c '\.v-' platform/assets/css/tokens/_voice-utilities.css` ≥ 18
- [ ] لا inline font-family جديد أُضيف لـ index.html
- [ ] commit: `β2: Voice Casting — verified: voice_tokens=18, utilities=18, fallback_arabic_first=true`
- [ ] Beacon recorded in CREATIVITY_LOG.md

---

## بعد β2

ابدأ β3 (Numeric Kashida Signature) لإكمال Pillar β.

— نهاية β2 —
