# 🕯️ WORKER 22 — RITUAL UI (Pack v3 DEVOTIO)
> **Type:** بصري + سلوكي + روحاني (Worker الطقوس في Pack v3).
> **يبني فوق:** Cathedral v16 ATELIER + Resonance v2 + TASMEEM (W20) + CHROMATIC SOUL (W21).
> **الهدف الواحد:** نقل المنصة من **dashboard وظيفي** إلى **محراب طقوسي** — كل لمسة، كل عبور، كل لحظة قراءة لها طقس مُتجذّر.
> **الفلسفة:** *الواجهة الميتة وظيفية. الواجهة الحيّة طقسية. الفرق ميلي ثانية في الإحساس، أعمار في الالتزام اليومي.*

---

## 🛡️ Preservation Guard — اقرأ هذا قبل أي شيء آخر

> هذا أهم قسم في Worker 22. الطقس بدون انضباط = ضوضاء. كل تأثير ritual يُضاف بـ tokens, opt-in classes, و reduced-motion guards.

### ⛔ القاعدة الذهبية الواحدة

> **RITUAL UI يُضيف نَفَساً مُتعمَّداً، لا يفرض حركة.**
>
> Cathedral v16 + Resonance v2 + Workers 20-21 سلَّمت لنا منصة بهوية طباعية و لونية كاملة. Worker 22 **يضيف ٦ طبقات طقسية**، كل طبقة محصورة بـ tokens, opt-in classes, و reduced-motion guards. لا يلمس الـ surfaces الموجودة، يضيف فوقها.

### 🚫 الأخطاء القاتلة (لو حصل أحدها → توقّف فوراً)

1. ❌ **تكسير أي keyframe من W12-W16** (Aurora motion, Atelier choreography, Vital UI living surfaces).
2. ❌ **حذف أو تعديل** `Upg.motion`, `Upg.choreo`, `Upg.transition`, `Upg.life`, `Upg.aura` (نضيف `Upg.ritual` بجوارها).
3. ❌ **Audio assets ملف** (.mp3/.wav) — كل الأصوات تُولَّد بـ WebAudio API (sine/triangle/noise) — لا أصول جديدة. (Worker 16 P5 وضع القاعدة، نلتزم بها).
4. ❌ **حركة على fonts** (انتقالات `font-variation-settings` خارج reduce-motion guard) — يكسر W20.
5. ❌ **تجاوز ميزانية الحركة العامة:** ≤ 8 idle keyframes نشطة في أي صفحة (W16 = 6، W22 = +2).
6. ❌ **transitions أعلى من 1200ms** للـ entry ritual أو 600ms للـ threshold.
7. ❌ **تشغيل rituals على مستخدم مع `prefers-reduced-motion`** — كلها instant-skip.
8. ❌ **Ritual يبدأ تلقائياً في كل refresh** — entry ritual فقط في first session اليومي (localStorage gate).

### 📦 الأصول المُقدّسة (Sacred Assets)

| ما يجب الحفاظ عليه 100% | الوضع المتوقّع بعد Worker 22 |
|---|---|
| 14 page sections (16 مع curriculum) | كلها موجودة، نفس IDs |
| 391 qcalc references | موجودة، تشتغل |
| 26 Upg.* APIs (post-W20+W21) | كلها معرَّفة، نفس signatures (نضيف `Upg.ritual` فقط) |
| `--life-*` tokens (W16 P1) | موجودة، Worker 22 يبني فوقها |
| `--motion-*` tokens (W12 P6) | موجودة، نستهلكها |
| 12 chr-* palettes + 15 tints (W21) | موجودة، rituals تستهلكها للألوان |
| 9 voice tokens (W20) | موجودة، rituals تستعمل voice-quote للنصوص الطقسية |
| `prefers-reduced-motion` guards (≥20) | موجودة، Worker 22 يضيف 8+ guard جديد |
| `localStorage` keys `upg_*` | لا تُلمَس، نضيف `upg_ritual_*` فقط |

### ✅ ماذا يفعل Worker 22 فعلاً

في كل phase، **3 عمليات فقط مسموح بها**:

1. **ADD** — إضافة keyframes, tokens, utility classes, IIFE blocks جديدة (في النهاية، بـ anchors واضحة).
2. **AUGMENT** — إضافة data-attribute أو class إضافي على عناصر HTML موجودة (مثال: `<section class="page">` يصبح `<section class="page" data-rit-halo="enabled">`).
3. **EXTEND** — تمديد API موجود **بدون كسر signature** (مثال: `Upg.transition.run(name, opts)` يقبل خياراً جديداً `ritual: 'mashrabiya'`).

> أي عملية رابعة (rewrite of W14 motion, deletion of life keyframe, change of motion tokens)؟ → **ممنوعة بدون phase-spec يأمر بها**.

### 🔍 Pre-Flight Inspection

```
🔍 PRESERVATION INSPECTION (Worker 22 / Phase N)
├─ Files I will TOUCH:
│   - platform/index.html       (operations: AUGMENT data-rit-* on N elements)
│   - platform/assets/style.css (operations: APPEND ~M lines + reduced-motion guards)
│   - platform/assets/app.js    (operations: APPEND IIFE Upg.ritual)
├─ Sacred check (run BEFORE):
│   - grep -c '<section class="page"' platform/index.html  → 14+
│   - grep -c "qcalc" platform/index.html                   → 391
│   - grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l → ≥26
│   - grep -c '\-\-chr-' platform/assets/style.css          → ≥120 (W21 P1)
│   - grep -c '\-\-tint-' platform/assets/style.css         → ≥45 (W21 P3)
│   - grep -c '\-\-type-voice-' platform/assets/style.css   → ≥18 (W20)
│   - grep -c 'prefers-reduced-motion' platform/assets/style.css → ≥20
└─ Awaiting confirmation
```

### 🧪 Post-Phase Sanity Probe

```
🧪 SANITY AFTER PHASE N
├─ Pages count:        14+ (preserved)         ✓
├─ qcalc instances:    391 (was 391)           ✓
├─ Upg.* APIs:         ≥26 (W22 adds Upg.ritual by phase) ✓
├─ All W20-W21 tokens preserved:               ✓
├─ Console errors:     0                       ✓
├─ FPS @ idle:         ≥ 55                    ✓ (no jank)
├─ prefers-reduced-motion: ALL rituals silenced ✓
├─ Rituals opt-in only:                        ✓ (no auto-trigger except entry once-per-day)
└─ Ritual check: does opening the platform feel sacred, not utilitarian? ✓
```

---

## 🧭 لمَ RITUAL UI الآن؟

تحليل الواقع الحالي (post W21):

- ✋ **الفتح صامت** — تفتح المنصة، تظهر مباشرة بدون أي طقس استقبال.
- ✋ **القراءة بدون zen** — لو فتحت psych وحاولت تقرأ فقرة فلسفية طويلة، الـ sidebar + chrome + counters كلها تنافس على انتباهك.
- ✋ **العبور بين الصفحات بسيط** — fade مبسّط من W14، لا depth، لا cinematic، لا ritual معنى.
- ✋ **الـ feedback عام** — hover lift عام لكل عنصر، نفس الـ ripple، لا signature ثقافي.
- ✋ **الوقت لا يؤثر** — تفتح المنصة الفجر = نفس مظهرها العشاء.
- ✋ **Aura system موجود (W16 P6) لكن جاف** — لا ربط مع time + chr-* + ritual.

**RITUAL UI يحلّ هذي ٦ مشاكل في ٦ phases.**

النتيجة المتوقعة بعد Worker 22:

| البند | قبل | بعد |
|---|---|---|
| Entry experience | فتح مباشر | **Entry Ritual** (dim → glow → poetry → fade-in over ~1.5s once-per-day) |
| Reading focus mode | غير موجود | **Reading Halo** (Cmd+. opt-in zen mode — chrome dims, content glows) |
| Page transitions | basic fade | **Threshold Transitions** (5 variants: fade / mashrabiya / scroll / iris / mihrab-arch) |
| Hover/click feedback | uniform | **Inkpot Feedback** (Arabic-rooted: ink-spread, kashida-pull, kalam-stroke) |
| Time-of-day awareness | 0 | **5 atmospheres** (دَواحٍ / ضُحى / عَصر / مَغرب / عِشاء — bg veil shifts) |
| Aura system | basic (W16 P6) | **deepened** with chr-* tints + ritual tie-in + Upg.ritual API |

---

## 📋 خريطة الـ Phases

| # | الملف | الناتج الرئيسي | تقديريًا |
|---|---|---|---|
| 1 | `22_PHASE_1_ENTRY_RITUAL.md`           | Entry ritual (dim screen → soft warm glow → arabic poetry visual → fade-in) + once-per-day localStorage gate + skip key | ~520 سطر |
| 2 | `22_PHASE_2_READING_HALO.md`           | Reading halo zen mode (Cmd+. toggle) — chrome dims, content glows, focus on selected article | ~480 سطر |
| 3 | `22_PHASE_3_THRESHOLD_TRANSITIONS.md`  | 5 transition variants (fade / mashrabiya / scroll / iris / mihrab-arch) + per-personality routing + Upg.transition extension | ~520 سطر |
| 4 | `22_PHASE_4_INKPOT_FEEDBACK.md`        | Arabic-rooted hover/click effects (ink-spread, kashida-pull, kalam-stroke) + replaces aurora ripples | ~460 سطر |
| 5 | `22_PHASE_5_TIME_OF_DAY.md`            | 5 atmospheres (Dawn/Forenoon/Asr/Maghrib/Isha) — auto-detect time, ambient veil shift, bg modulation | ~500 سطر |
| 6 | `22_PHASE_6_AURA_DEEPENING.md`         | extend W16 P6 auras with chr-* + ritual tie-in + Upg.ritual API + per-personality choreography | ~520 سطر |

> **مجموع تقريبي:** ~3,000 سطر، موزّعة على 6 phases (≤520/phase).
>
> **ترتيب التنفيذ المُلزِم:** `1 → 2 → 3 → 4 → 5 → 6`. Phase 6 يستهلك Phase 1 + Phase 5.

---

## 🌐 معايير عالمية مرجعية

**Ritual & Sacred UX:**
- Sufi rituals — fasting/breathing as design analogy.
- Apple HIG — Motion section (purposeful, brief, deferential).
- Bret Victor — *Inventing on Principle* (immediate feedback).
- Don Norman — *The Design of Everyday Things* (signifiers + feedback).
- Paul Stamatiou — Quiet UI essays.
- Anthropic Claude UI — ambient surfaces.

**Arabic Visual Tradition:**
- Mashrabiya woodwork (turned wood lattice) → threshold transition reference.
- Mihrab arch → iris transition reference.
- Kalam (reed pen) writing flow → click feedback reference.
- Quranic illumination borders → aura halo reference.

**Time-Aware Design:**
- Sleep Cycle (app) — chronotype-aware UI.
- f.lux + Night Shift — circadian awareness.
- Islamic prayer times → 5-atmosphere model.

> **القاعدة:** نستلهم الفلسفة، لا نستنسخ. كل ritual يُكتب بميزانية CPU صارمة + a11y guards.

---

## 🛠️ بروتوكول التنفيذ (مطابق لـ AUTO_PILOT v3)

1. **Branch واحد طولي**: `worker-22-devotio` ينشأ في **بداية Phase 1** من `main` المحدَّث (post W21 PR).
2. **بقية الـ phases** تستمر على نفس الـ branch.
3. **بعد كل phase**: 2-push rule.
4. **PR واحد** في نهاية Worker.
5. **Session واحد = phase واحد**.

---

## 🚫 ممنوعات قاطعة (Worker 22)

- ❌ تحميل ملفات صوت/فيديو/lottie — كل شيء synth أو CSS.
- ❌ إضافة CDN غير الموجود (لا حاجة لشي).
- ❌ تكسير أو إعادة تسمية أي motion token من W12-W16.
- ❌ تعديل قيم HSL/oklch لـ identity tints — Worker 22 يستهلكها فقط.
- ❌ زيادة `!important` (≤221 globally — حافظ).
- ❌ keyframe بدون `@media (prefers-reduced-motion: reduce)` guard.
- ❌ تجاوز 8 keyframes نشطة في idle (per page).
- ❌ entry ritual يبدأ في كل refresh — only once-per-day.
- ❌ تجاوز 600 سطر لكل phase.

---

## ✅ مقاييس النجاح (موحّدة عبر كل الـ phases)

في نهاية Worker 22:

| المقياس | قبل (post W21) | الهدف بعد |
|---|---:|---:|
| Entry ritual | 0 | **1** (once-per-day, opt-out) |
| Reading halo (zen) | 0 | **1** (Cmd+. toggle) |
| Page transition variants | 1 (fade) | **5** (fade/mashrabiya/scroll/iris/mihrab-arch) |
| Per-personality transition routing | 0 | **15** (1 per personality) |
| Inkpot feedback variants | 0 | **3** (ink-spread / kashida-pull / kalam-stroke) |
| Time-of-day atmospheres | 0 | **5** (Dawn/Forenoon/Asr/Maghrib/Isha) |
| Aura deepening | basic (W16 P6) | **per-personality + chr-* + ritual** |
| New Upg.* APIs | 26 | **27** (+Upg.ritual) |
| Reduced-motion guards | ≥20 | **≥28** (+8 from W22) |
| Idle FPS | ≥ 55 | **≥ 55** (preserved) |
| New localStorage keys | none new | **`upg_ritual_*`** (5 keys for state) |

---

## 🎬 كيف يستخدمه AUTO_PILOT v3

```
1. AUTO_PILOT v3 يفتح state/PROGRESS.json → يقرأ next_action.
2. لو فيه "Worker 22" → يقرأ هذا الفهرس مرة واحدة.
3. يفتح فقط ملف الـ phase الحالي (22_PHASE_<N>_*.md).
4. ينفّذ Phase، يعمل commit+push، يحدّث state، commit+push ثانٍ.
5. session واحد = phase واحد.
6. ينشئ PR واحد في النهاية: feat: Worker 22 — RITUAL UI DEVOTIO (Pack v3).
```

— نهاية الفهرس. الملفات التفصيلية في `22_PHASE_*.md`.

🕯️ الواجهة طقس. ابدأ من باب الفتح.
