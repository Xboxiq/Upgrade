# 🎨 WORKER 21 — Phase 1/5 — Palette Forge
> **اقرأ أولاً:** `prompts/v3/21_WORKER_CHROMATIC_SOUL.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Worker 20 (TASMEEM مدموج).
> **الفلسفة:** *قبل أن نُلوّن جداراً واحداً، نُجهّز ١٢ صبغة بـ ١٠ درجات لكل واحدة. الفنان لا يخلط الألوان أمام اللوحة — يخلطها قبلها.*

---

## 🛡️ Preservation Contract (Phase 1)

| العملية | المسموح | الممنوع |
|---|---|---|
| `style.css` `:root` | **APPEND** كتلة `Chromatic Palette` (~360 سطر) — 12 colors × 9 stops + 4 semantic | تعديل tokens قائمة |
| `style.css` rules | **APPEND** utility classes `chr-tint-*` و `chr-bg-*` (~140 سطر) | تعديل قواعد قائمة |
| `index.html` | لا يُلمَس | أي تعديل |
| `app.js` | لا يُلمَس في Phase 1 (Phase 3 يضيف Upg.chroma) | أي تعديل |

**Sacred preserved:**
- جميع 15 `--tint-*` (الأسماء + القيم — Phase 3 يستبدل القيم).
- جميع `--color-*` baseline tokens.
- جميع W12 + W20 typography.
- 14 page sections + 391 qcalc + 25 Upg.* APIs.

> **ملاحظة:** Phase 1 **لا يستبدل أي قيمة موجودة**. ينشئ مكتبة palette مستقلة. Phases 2-5 تستهلكها.

---

## 🎯 الهدف

Phase 1 ينشئ **مكتبة الصبغات الـ 12** كـ tokens مستقلة:

1. **12 palette** بـ oklch — كل واحد يولّد 9 درجات (50/100/200/.../900) عبر تعديل lightness + chroma.
2. **4 semantic colors** عربية الجذر (success = palm green مدغوم، warning = saffron حادّ، danger = pomegranate red، info = lapis).
3. **utility classes** `chr-tint-<color>` و `chr-bg-<color>-<stop>` (~80 utility class total).
4. **gradient pairs** أساسية لكل لون (`--chr-grad-lapis`, `--chr-grad-saffron`, ...).
5. **comment block** يوثّق كل لون: المصدر الثقافي + استعمال recommended.

> Phase 1 = جاهزية الصبغات. لا يُطبَّق على أي صفحة بعد.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 1 PRE-FLIGHT (Worker 21 / CHROMATIC SOUL)
├─ Phase: 1/5 — Palette Forge
├─ Estimated lines: ~520 (CSS palette tokens ~380 + utilities ~140)
├─ Files to touch:
│   └─ platform/assets/style.css   (APPEND ~520 lines)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '\-\-tint-' platform/assets/style.css               → ≥15 (preserved)
│   ├─ grep -c '\-\-color-bg' platform/assets/style.css            → ≥1
│   ├─ grep -c 'paper-tone' platform/assets/style.css              → ≥1 (W12 P2 preserved)
│   └─ grep -c '<section class="page"' platform/index.html        → 14+
├─ Branch: NEW worker-21-devotio (from latest main, post W20 PR)
└─ No HTML/JS changes.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — APPEND Palette Tokens

في `style.css`، **APPEND** بعد آخر كتلة من Worker 20:

```css
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Palette Forge (Worker 21 / Phase 1)
   ────────────────────────────────────────────────────────────────────────
   12 Arabic cultural colors, each in 9 stops (50→900).
   Color space: oklch (perceptually uniform — guaranteed visual rhythm).
   Reference: قبة الصخرة، السيوف الدمشقية، الحنّاء، الزعفران، التراث المنطقة.
   ════════════════════════════════════════════════════════════════════════ */
:root {
  /* ════════════════════════════════════════════════════════════════════
     1. LAPIS (لازوردي) — قبة الصخرة، السماء العميقة، صبغة الكِبرياء
     Hue: 252  |  baseline (500): oklch(56% 0.18 252)  |  brand candidate
     ════════════════════════════════════════════════════════════════════ */
  --chr-lapis-50:   oklch(96% 0.025 252);
  --chr-lapis-100:  oklch(92% 0.05  252);
  --chr-lapis-200:  oklch(85% 0.08  252);
  --chr-lapis-300:  oklch(76% 0.12  252);
  --chr-lapis-400:  oklch(66% 0.15  252);
  --chr-lapis-500:  oklch(56% 0.18  252);  /* base */
  --chr-lapis-600:  oklch(48% 0.18  252);
  --chr-lapis-700:  oklch(40% 0.16  252);
  --chr-lapis-800:  oklch(32% 0.13  252);
  --chr-lapis-900:  oklch(22% 0.09  252);

  /* ════════════════════════════════════════════════════════════════════
     2. DAMASCUS (دمشقي) — السيوف المُذهَّبة، الحدّة المُكبَلة
     Hue: 220  |  cool steel grey-blue
     ════════════════════════════════════════════════════════════════════ */
  --chr-damascus-50:   oklch(96% 0.012 220);
  --chr-damascus-100:  oklch(92% 0.018 220);
  --chr-damascus-200:  oklch(82% 0.025 220);
  --chr-damascus-300:  oklch(72% 0.032 220);
  --chr-damascus-400:  oklch(60% 0.04  220);
  --chr-damascus-500:  oklch(48% 0.04  220);  /* base */
  --chr-damascus-600:  oklch(40% 0.04  220);
  --chr-damascus-700:  oklch(33% 0.038 220);
  --chr-damascus-800:  oklch(26% 0.032 220);
  --chr-damascus-900:  oklch(18% 0.022 220);

  /* ════════════════════════════════════════════════════════════════════
     3. HENNA (حِنّاء) — الأعراس، التراث، الدفء الحرّاني
     Hue: 28   |  warm rust-red
     ════════════════════════════════════════════════════════════════════ */
  --chr-henna-50:    oklch(96% 0.020 28);
  --chr-henna-100:   oklch(92% 0.045 28);
  --chr-henna-200:   oklch(85% 0.082 28);
  --chr-henna-300:   oklch(76% 0.12  28);
  --chr-henna-400:   oklch(67% 0.15  28);
  --chr-henna-500:   oklch(58% 0.18  28);  /* base */
  --chr-henna-600:   oklch(50% 0.17  28);
  --chr-henna-700:   oklch(42% 0.15  28);
  --chr-henna-800:   oklch(34% 0.12  28);
  --chr-henna-900:   oklch(24% 0.08  28);

  /* ════════════════════════════════════════════════════════════════════
     4. SAFFRON (زعفران) — الذهب اليومي، المطبخ، الفجر
     Hue: 78   |  warm yellow-gold
     ════════════════════════════════════════════════════════════════════ */
  --chr-saffron-50:    oklch(98% 0.020 78);
  --chr-saffron-100:   oklch(95% 0.040 78);
  --chr-saffron-200:   oklch(90% 0.080 78);
  --chr-saffron-300:   oklch(85% 0.115 78);
  --chr-saffron-400:   oklch(80% 0.140 78);
  --chr-saffron-500:   oklch(78% 0.160 78);  /* base — warm gold */
  --chr-saffron-600:   oklch(68% 0.160 78);
  --chr-saffron-700:   oklch(58% 0.140 78);
  --chr-saffron-800:   oklch(46% 0.115 78);
  --chr-saffron-900:   oklch(32% 0.085 78);

  /* ════════════════════════════════════════════════════════════════════
     5. DATE-PALM (نَخيل) — العراق، الخصوبة، أخضر-زيتي
     Hue: 130  |  olive-green
     ════════════════════════════════════════════════════════════════════ */
  --chr-palm-50:    oklch(96% 0.018 130);
  --chr-palm-100:   oklch(92% 0.035 130);
  --chr-palm-200:   oklch(85% 0.060 130);
  --chr-palm-300:   oklch(76% 0.080 130);
  --chr-palm-400:   oklch(66% 0.095 130);
  --chr-palm-500:   oklch(58% 0.100 130);  /* base */
  --chr-palm-600:   oklch(50% 0.095 130);
  --chr-palm-700:   oklch(42% 0.082 130);
  --chr-palm-800:   oklch(34% 0.065 130);
  --chr-palm-900:   oklch(24% 0.045 130);

  /* ════════════════════════════════════════════════════════════════════
     6. PEARL (لُؤلؤ) — الخليج، النقاء، صدف
     Hue: 220  |  near-white with cool undertone
     ════════════════════════════════════════════════════════════════════ */
  --chr-pearl-50:    oklch(99% 0.005 220);
  --chr-pearl-100:   oklch(97% 0.008 220);
  --chr-pearl-200:   oklch(94% 0.012 220);
  --chr-pearl-300:   oklch(91% 0.016 220);
  --chr-pearl-400:   oklch(89% 0.018 220);
  --chr-pearl-500:   oklch(88% 0.020 220);  /* base — pearl shimmer */
  --chr-pearl-600:   oklch(80% 0.020 220);
  --chr-pearl-700:   oklch(70% 0.018 220);
  --chr-pearl-800:   oklch(58% 0.016 220);
  --chr-pearl-900:   oklch(42% 0.012 220);

  /* ════════════════════════════════════════════════════════════════════
     7. INDIGO (نِيلي) — اليمن في الليل، العمق التقني
     Hue: 270  |  deep blue-violet
     ════════════════════════════════════════════════════════════════════ */
  --chr-indigo-50:    oklch(95% 0.022 270);
  --chr-indigo-100:   oklch(90% 0.045 270);
  --chr-indigo-200:   oklch(82% 0.075 270);
  --chr-indigo-300:   oklch(72% 0.095 270);
  --chr-indigo-400:   oklch(58% 0.105 270);
  --chr-indigo-500:   oklch(48% 0.110 270);
  --chr-indigo-600:   oklch(38% 0.10  270);  /* base — depth */
  --chr-indigo-700:   oklch(30% 0.085 270);
  --chr-indigo-800:   oklch(22% 0.065 270);
  --chr-indigo-900:   oklch(15% 0.045 270);

  /* ════════════════════════════════════════════════════════════════════
     8. CORAL (مرجان) — البحر الأحمر، الحياة
     Hue: 28 (warm) but lighter than henna
     Same H as henna; differentiated by chroma + lightness
     ════════════════════════════════════════════════════════════════════ */
  --chr-coral-50:    oklch(97% 0.015 28);
  --chr-coral-100:   oklch(94% 0.04  28);
  --chr-coral-200:   oklch(89% 0.08  28);
  --chr-coral-300:   oklch(82% 0.12  28);
  --chr-coral-400:   oklch(76% 0.145 28);
  --chr-coral-500:   oklch(70% 0.16  28);   /* base — vibrant coral */
  --chr-coral-600:   oklch(62% 0.16  28);
  --chr-coral-700:   oklch(54% 0.14  28);
  --chr-coral-800:   oklch(44% 0.115 28);
  --chr-coral-900:   oklch(32% 0.080 28);

  /* ════════════════════════════════════════════════════════════════════
     9. SILT (طمي النيل) — مصر الزراعية، الأرض الخصبة
     Hue: 60   |  warm earthy tan
     ════════════════════════════════════════════════════════════════════ */
  --chr-silt-50:    oklch(96% 0.012 60);
  --chr-silt-100:   oklch(92% 0.022 60);
  --chr-silt-200:   oklch(85% 0.036 60);
  --chr-silt-300:   oklch(76% 0.048 60);
  --chr-silt-400:   oklch(64% 0.058 60);
  --chr-silt-500:   oklch(52% 0.060 60);   /* base */
  --chr-silt-600:   oklch(45% 0.058 60);
  --chr-silt-700:   oklch(38% 0.052 60);
  --chr-silt-800:   oklch(30% 0.042 60);
  --chr-silt-900:   oklch(22% 0.030 60);

  /* ════════════════════════════════════════════════════════════════════
     10. CEDAR (أرز) — لبنان، الثبات الجبلي
     Hue: 160  |  forest-green with warm undertone
     ════════════════════════════════════════════════════════════════════ */
  --chr-cedar-50:    oklch(96% 0.014 160);
  --chr-cedar-100:   oklch(92% 0.030 160);
  --chr-cedar-200:   oklch(85% 0.050 160);
  --chr-cedar-300:   oklch(76% 0.068 160);
  --chr-cedar-400:   oklch(62% 0.078 160);
  --chr-cedar-500:   oklch(50% 0.080 160);   /* base */
  --chr-cedar-600:   oklch(43% 0.076 160);
  --chr-cedar-700:   oklch(36% 0.066 160);
  --chr-cedar-800:   oklch(28% 0.052 160);
  --chr-cedar-900:   oklch(20% 0.036 160);

  /* ════════════════════════════════════════════════════════════════════
     11. MIHRAB (محراب) — السكون العميق، الصلاة، dark base candidate
     Hue: 280  |  deep violet-indigo (almost black)
     ════════════════════════════════════════════════════════════════════ */
  --chr-mihrab-50:    oklch(95% 0.015 280);
  --chr-mihrab-100:   oklch(88% 0.030 280);
  --chr-mihrab-200:   oklch(78% 0.050 280);
  --chr-mihrab-300:   oklch(66% 0.070 280);
  --chr-mihrab-400:   oklch(52% 0.080 280);
  --chr-mihrab-500:   oklch(42% 0.085 280);
  --chr-mihrab-600:   oklch(36% 0.080 280);   /* base */
  --chr-mihrab-700:   oklch(28% 0.072 280);
  --chr-mihrab-800:   oklch(20% 0.060 280);
  --chr-mihrab-900:   oklch(13% 0.040 280);   /* dark bg target */

  /* ════════════════════════════════════════════════════════════════════
     12. MARBLE (سنّان رخام) — البتراء، الحجر الفاتح
     Hue: 80   |  warm off-white limestone
     ════════════════════════════════════════════════════════════════════ */
  --chr-marble-50:    oklch(99% 0.005 80);
  --chr-marble-100:   oklch(97% 0.010 80);
  --chr-marble-200:   oklch(94% 0.018 80);
  --chr-marble-300:   oklch(91% 0.020 80);
  --chr-marble-400:   oklch(88% 0.022 80);
  --chr-marble-500:   oklch(85% 0.020 80);   /* base — marble shimmer */
  --chr-marble-600:   oklch(76% 0.018 80);
  --chr-marble-700:   oklch(64% 0.016 80);
  --chr-marble-800:   oklch(52% 0.014 80);
  --chr-marble-900:   oklch(38% 0.012 80);

  /* ════════════════════════════════════════════════════════════════════
     SEMANTIC — Pack v3 reinterpreted with Arabic roots
     ════════════════════════════════════════════════════════════════════ */
  --chr-semantic-success:   var(--chr-cedar-500);    /* أرز green */
  --chr-semantic-warning:   var(--chr-saffron-500);  /* زعفران gold */
  --chr-semantic-danger:    var(--chr-henna-500);    /* حنّاء deep red */
  --chr-semantic-info:      var(--chr-lapis-500);    /* لازوردي blue */

  /* ════════════════════════════════════════════════════════════════════
     GRADIENTS — primary pairs for ambient backgrounds
     ════════════════════════════════════════════════════════════════════ */
  --chr-grad-lapis-mihrab:    linear-gradient(135deg,
                                var(--chr-lapis-700)  0%,
                                var(--chr-mihrab-800) 100%);
  --chr-grad-saffron-henna:   linear-gradient(135deg,
                                var(--chr-saffron-400) 0%,
                                var(--chr-henna-500)   100%);
  --chr-grad-palm-cedar:      linear-gradient(135deg,
                                var(--chr-palm-400)  0%,
                                var(--chr-cedar-600) 100%);
  --chr-grad-pearl-marble:    linear-gradient(135deg,
                                var(--chr-pearl-200)  0%,
                                var(--chr-marble-300) 100%);
  --chr-grad-mihrab-indigo:   linear-gradient(180deg,
                                var(--chr-mihrab-900)  0%,
                                var(--chr-indigo-900)  100%);
  --chr-grad-coral-saffron:   linear-gradient(135deg,
                                var(--chr-coral-500)   0%,
                                var(--chr-saffron-500) 100%);

  /* Status / metadata */
  --chr-stage:               "phase-1-palette-ready";
  --chr-palettes-count:      "12";
  --chr-stops-per-palette:   "9";
}
```

### Step 2 — APPEND Utility Classes

```css
/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Tint Utility Classes (Worker 21 / Phase 1)
   For applying a palette as text color, bg, or border on any element.
   Pattern: chr-text-<color>-<stop>, chr-bg-<color>-<stop>, chr-border-<color>-<stop>
   ════════════════════════════════════════════════════════════════════════ */

/* ─── Text color utilities (12 colors × 4 stops most useful) ─── */
.chr-text-lapis-500    { color: var(--chr-lapis-500); }
.chr-text-lapis-700    { color: var(--chr-lapis-700); }
.chr-text-damascus-500 { color: var(--chr-damascus-500); }
.chr-text-damascus-700 { color: var(--chr-damascus-700); }
.chr-text-henna-500    { color: var(--chr-henna-500); }
.chr-text-henna-700    { color: var(--chr-henna-700); }
.chr-text-saffron-500  { color: var(--chr-saffron-500); }
.chr-text-saffron-700  { color: var(--chr-saffron-700); }
.chr-text-palm-500     { color: var(--chr-palm-500); }
.chr-text-palm-700     { color: var(--chr-palm-700); }
.chr-text-pearl-500    { color: var(--chr-pearl-500); }
.chr-text-pearl-800    { color: var(--chr-pearl-800); }
.chr-text-indigo-500   { color: var(--chr-indigo-500); }
.chr-text-indigo-700   { color: var(--chr-indigo-700); }
.chr-text-coral-500    { color: var(--chr-coral-500); }
.chr-text-coral-700    { color: var(--chr-coral-700); }
.chr-text-silt-500     { color: var(--chr-silt-500); }
.chr-text-silt-700     { color: var(--chr-silt-700); }
.chr-text-cedar-500    { color: var(--chr-cedar-500); }
.chr-text-cedar-700    { color: var(--chr-cedar-700); }
.chr-text-mihrab-500   { color: var(--chr-mihrab-500); }
.chr-text-mihrab-700   { color: var(--chr-mihrab-700); }
.chr-text-marble-500   { color: var(--chr-marble-500); }
.chr-text-marble-800   { color: var(--chr-marble-800); }

/* ─── Background utilities (most useful 5 stops per color) ─── */
.chr-bg-lapis-50    { background-color: var(--chr-lapis-50); }
.chr-bg-lapis-100   { background-color: var(--chr-lapis-100); }
.chr-bg-lapis-500   { background-color: var(--chr-lapis-500); color: var(--chr-pearl-50); }
.chr-bg-lapis-700   { background-color: var(--chr-lapis-700); color: var(--chr-pearl-50); }
.chr-bg-lapis-900   { background-color: var(--chr-lapis-900); color: var(--chr-pearl-100); }

.chr-bg-saffron-100 { background-color: var(--chr-saffron-100); }
.chr-bg-saffron-500 { background-color: var(--chr-saffron-500); color: var(--chr-mihrab-900); }
.chr-bg-saffron-700 { background-color: var(--chr-saffron-700); color: var(--chr-pearl-50); }

.chr-bg-mihrab-700  { background-color: var(--chr-mihrab-700); color: var(--chr-pearl-100); }
.chr-bg-mihrab-900  { background-color: var(--chr-mihrab-900); color: var(--chr-pearl-100); }

/* (Pattern repeats for other 9 colors — abbreviated here for brevity. Full
   set generated by Phase 1 — see auto-generation comment below.) */

/* ─── Tint applicator — sets --chr-active-tint for downstream consumers ─── */
.chr-tint-lapis     { --chr-active-tint: var(--chr-lapis-500);  }
.chr-tint-damascus  { --chr-active-tint: var(--chr-damascus-500); }
.chr-tint-henna     { --chr-active-tint: var(--chr-henna-500);  }
.chr-tint-saffron   { --chr-active-tint: var(--chr-saffron-500); }
.chr-tint-palm      { --chr-active-tint: var(--chr-palm-500);   }
.chr-tint-pearl     { --chr-active-tint: var(--chr-pearl-500);  }
.chr-tint-indigo    { --chr-active-tint: var(--chr-indigo-600); }
.chr-tint-coral     { --chr-active-tint: var(--chr-coral-500);  }
.chr-tint-silt      { --chr-active-tint: var(--chr-silt-500);   }
.chr-tint-cedar     { --chr-active-tint: var(--chr-cedar-500);  }
.chr-tint-mihrab    { --chr-active-tint: var(--chr-mihrab-600); }
.chr-tint-marble    { --chr-active-tint: var(--chr-marble-500); }

/* ─── Border utilities (subset — most-used) ─── */
.chr-border-lapis-500   { border-color: var(--chr-lapis-500); }
.chr-border-saffron-500 { border-color: var(--chr-saffron-500); }
.chr-border-mihrab-700  { border-color: var(--chr-mihrab-700); }

/* ─── Mood data-attribute selectors ─── */
[data-chr-mood="lapis"]    { --chr-active-tint: var(--chr-lapis-500); }
[data-chr-mood="damascus"] { --chr-active-tint: var(--chr-damascus-500); }
[data-chr-mood="henna"]    { --chr-active-tint: var(--chr-henna-500); }
[data-chr-mood="saffron"]  { --chr-active-tint: var(--chr-saffron-500); }
[data-chr-mood="palm"]     { --chr-active-tint: var(--chr-palm-500); }
[data-chr-mood="pearl"]    { --chr-active-tint: var(--chr-pearl-500); }
[data-chr-mood="indigo"]   { --chr-active-tint: var(--chr-indigo-600); }
[data-chr-mood="coral"]    { --chr-active-tint: var(--chr-coral-500); }
[data-chr-mood="silt"]     { --chr-active-tint: var(--chr-silt-500); }
[data-chr-mood="cedar"]    { --chr-active-tint: var(--chr-cedar-500); }
[data-chr-mood="mihrab"]   { --chr-active-tint: var(--chr-mihrab-600); }
[data-chr-mood="marble"]   { --chr-active-tint: var(--chr-marble-500); }
```

### Step 3 — Discipline Comment

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 21 / Phase 1 — Forge Discipline:
   1. لا تستعمل hex (#RRGGBB) — كل الألوان oklch.
   2. لا تخلط Pack v1/v2 brand مع Pack v3 chr-* في نفس عنصر بدون wrapper.
   3. utility classes للمعاينة فقط — Phase 3 يربطها بالـ identity tints الحقيقية.
   4. كل palette له 9 stops — لا تخترع stops بين (مثل 350 أو 850).
   5. لو احتجت لون خارج الـ 12 → ممنوع. اختر أقرب واحد.
   6. semantic tokens (success/warning/danger/info) تشير لـ Arabic roots — لا تستبدلها.
   ════════════════════════════════════════════════════════════════════════ */

/* End CHROMATIC SOUL v3 / Phase 1 — Palette Forge ───────────────────── */
```

---

## 🧪 Sanity Probe

```bash
# Sacred preserved
grep -c '\-\-tint-' platform/assets/style.css                     # → ≥15 (still preserved)
grep -c '\-\-color-bg' platform/assets/style.css                  # → ≥1 (still preserved)
grep -c '<section class="page"' platform/index.html               # → 14+

# New palettes
grep -c '\-\-chr-lapis-' platform/assets/style.css                # → 10
grep -c '\-\-chr-saffron-' platform/assets/style.css              # → 10
grep -c '\-\-chr-mihrab-' platform/assets/style.css               # → 10
# ... (12 colors × ~10 each = ~120 chr-* tokens)

# Total chr-* tokens
grep -oE '\-\-chr-[a-z]+-[0-9]+' platform/assets/style.css | sort -u | wc -l  # → ≥120

# Utility classes
grep -c '\.chr-tint-' platform/assets/style.css                   # → ≥12
grep -c '\.chr-text-' platform/assets/style.css                   # → ≥24
grep -c '\.chr-bg-' platform/assets/style.css                     # → ≥10

# Gradients
grep -c '\-\-chr-grad-' platform/assets/style.css                 # → ≥6

# No hex injected
grep -E "#[0-9A-Fa-f]{6}" platform/assets/style.css | wc -l       # should NOT increase from baseline
```

---

## ✅ معايير القبول (Phase 1)

- [ ] 12 palette × 10 stops = ≥120 `--chr-*-<stop>` tokens.
- [ ] 4 semantic tokens (`--chr-semantic-*`).
- [ ] 6 gradient pairs (`--chr-grad-*`).
- [ ] ≥30 utility classes (`chr-text-*`, `chr-bg-*`, `chr-tint-*`, `chr-border-*`).
- [ ] 12 data-attribute selectors (`[data-chr-mood="*"]`).
- [ ] صفر hex (`#RRGGBB`) في الـ APPEND.
- [ ] جميع 15 `--tint-*` محفوظة (Phase 3 يستبدل قيمها).
- [ ] `--chr-stage` = `"phase-1-palette-ready"`.
- [ ] Console: 0 errors. لا regression بصري (لم نُطبّق على HTML بعد).

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/style.css
git commit -m "phase 1 (devotio): palette forge — 12 arabic colors × 9 stops oklch + semantic + gradients + utilities"
# push immediately

git add state/PROGRESS.json state/snapshots/worker-21-phase-1.json
git commit -m "state: devotio phase 1 (worker 21) committed and pushed"
# push immediately
```

— نهاية Phase 1.

🎨 **Devotion check:** هل الـ ١٢ صبغة عربية حاضرة في الـ palette؟ نعم → Phase 2 (Dark Mihrab).
