# 🌬️ WORKER 16 — VITAL UI (Pack v2 RESONANCE)
> **Type:** بصري + حركي + سيكولوجي (الـ Worker الذي يبعث الروح في الكاتدرائية).
> **يبني فوق:** Cathedral v16 ATELIER + RESONANCE v2 / Worker 15 (TYPOGRAPHY SOUL — مدموج عبر PR #57).
> **الهدف الواحد:** نقل المنصة من **هيكل تايبوغرافي ناضج صامت** إلى **واجهة تتنفّس وتنبض ولها روح حسية تفاعلية**.
> **الفلسفة:** *الواجهة الميتة تُقرَأ. الواجهة الحيّة تُعاش. الفرق ميكروسكوبي بصرياً، ضخم سيكولوجياً.*

---

## 🛡️ Preservation Guard — اقرأ هذا قبل أي شيء آخر

> هذا أهم قسم في Worker 16. الحركة بدون انضباط = ضوضاء. هذا الـ Worker يضيف 5 طبقات حياة، كل طبقة محصورة بـ tokens, opt-in classes, و reduced-motion guards.

### ⛔ القاعدة الذهبية الواحدة

> **VITAL UI يضيف نَفَساً، لا يفرض حركة.**
>
> كل تأثير حياة جديد:
> 1. **opt-in via class أو data-attribute** — لا تفعيل تلقائي عام يؤثر على عناصر W12-W15.
> 2. **يحترم `prefers-reduced-motion: reduce`** بقاعدة `@media` صريحة لكل keyframe.
> 3. **CPU-cheap** — `transform` + `opacity` فقط (لا `box-shadow`, `filter`, `width/height` animations في الـ idle loops).

### 🚫 الأخطاء القاتلة (لو حصل أحدها → توقّف فوراً)

1. ❌ **تكسير أي keyframe من W12-W14** (Aurora motion engine, Atelier choreography).
2. ❌ **حذف أو تعديل** `Upg.motion` / `Upg.choreo` / `Upg.transition` (نضيف `Upg.life`/`Upg.aura`/`Upg.sound` بجوارها).
3. ❌ **`will-change` العام** على selectors واسعة — يقتل GPU. استعمل `will-change` على hover/focus فقط ثم أزله.
4. ❌ **Audio assets ملف** (.mp3/.wav) — كل الأصوات تُولَّد بـ WebAudio API (sine/triangle/noise) — لا أصول جديدة.
5. ❌ **حركة على fonts** (انتقالات `font-variation-settings` خارج reduce-motion guard) — يكسر W15.
6. ❌ **تجاوز ميزانية الحركة العامة:** ≤ 6 idle keyframes نشطة في أي صفحة.

### 📦 الأصول المُقدّسة (Sacred Assets)

| ما يجب الحفاظ عليه 100% | الوضع المتوقّع بعد Worker 16 |
|---|---|
| 14 page sections | كلها موجودة، نفس IDs |
| 391 qcalc references | موجودة، تشتغل |
| 20 Upg.* APIs (post-W15) | كلها معرَّفة، نفس signatures (نضيف `Upg.life`, `Upg.aura`, `Upg.sound` فقط) |
| 9 voice tokens (W15) | تبقى — Worker 16 لا يلمس typography |
| 14 type signatures (W15 P6) | تبقى تشتغل |
| 117 identity tint references | **يستهلكها** Worker 16 لتلوين الـ auras (لا يعدّلها) |
| 15 page personalities | تبقى — Worker 16 يربط aura لكل personality |
| W14 ATELIER motion + transitions | تبقى — Worker 16 يضيف layers فوقها |
| `--motion-*` tokens (W12 P6) | تبقى — Worker 16 يضيف `--life-*` و `--aura-*` |
| `prefers-reduced-motion` guards (13+ موقع) | تبقى مكاناً، Worker 16 يضيف 6+ أخرى |

### ✅ ماذا يفعل Worker 16 فعلاً

في كل phase، **3 عمليات فقط مسموح بها**:

1. **ADD** — إضافة tokens, utility classes, IIFE blocks جديدة (في النهاية، بـ anchors واضحة).
2. **AUGMENT** — إضافة data-attribute أو class إضافي على عناصر HTML موجودة (مثال: `<section class="page">` يصبح `<section class="page" data-life="ambient">`).
3. **EXTEND** — تمديد API موجود **بدون كسر signature** (مثال: `Upg.transition.run(name, opts)` يقبل خياراً جديداً `depth`).

> أي عملية رابعة (rewrite of W14 motion, deletion of choreo keyframe, change of motion tokens)؟ → **ممنوعة بدون phase-spec يأمر بها**.

### 🔍 Pre-Flight Inspection

```
🔍 PRESERVATION INSPECTION (Worker 16 / Phase N)
├─ Files I will TOUCH:
│   - platform/index.html       (operations: AUGMENT data-life/data-aura on N elements)
│   - platform/assets/style.css (operations: APPEND ~M lines + reduced-motion guards)
│   - platform/assets/app.js    (operations: APPEND IIFE Upg.life/aura/sound)
├─ Files I will NEVER TOUCH:
│   - archive/* (read-only)
│   - prompts/v2/15_*.md, 14_*.md ... (Pack history)
│   - state/snapshots/* (additive only)
├─ Sacred check (run BEFORE):
│   - grep -c '<section class="page"' platform/index.html  → 14
│   - grep -c "qcalc" platform/index.html                   → 391
│   - grep -oE 'window\.Upg\.[a-z0-9]+' platform/assets/app.js | sort -u | wc -l → ≥20
│   - grep -c 'Cairo' platform/assets/style.css            → ≥3 (preserved)
│   - grep -c 'data-page-personality' platform/index.html  → 15 (preserved)
│   - grep -c 'prefers-reduced-motion' platform/assets/style.css → ≥13 (will grow)
└─ Awaiting confirmation
```

### 🧪 Post-Phase Sanity Probe

```
🧪 SANITY AFTER PHASE N
├─ Pages count:        14 (was 14)        ✓
├─ qcalc instances:    391 (was 391)      ✓
├─ Upg.* APIs:         20 + 1 (W16 adds Upg.life|aura|sound by phase) ✓
├─ Cairo still present:                   ✓
├─ All W15 voice tokens work:             ✓  (--type-voice-*)
├─ All W14 transitions work:              ✓  (Upg.transition.run still functions)
├─ Console errors:     0                  ✓
├─ Visual regression:  none               ✓
├─ FPS @ idle:         ≥ 55               ✓  (no jank)
├─ prefers-reduced-motion: ALL keyframes silenced ✓
└─ Vital check: الواجهة تتنفّس بدون أن تشتت؟ ✓
```

---

## 🧭 لمَ VITAL UI الآن؟

Cathedral v16 + RESONANCE v2 سلَّمتا منصة ناضجة بصرياً وتايبوغرافياً. لكن:

- ✋ **الـ surfaces ساكنة** — كل بطاقة، كل قسم، كل صفحة هيكل ميت في انتظار التفاعل.
- ✋ **microinteractions الأزرار محدودة** — hover lift بسيط، لا signature، لا ripple، لا tactile feedback.
- ✋ **page transitions أساسية** — fade بسيط من W14، لا depth، لا parallax، لا cinematic awareness للاتجاه.
- ✋ **pointer cursor اعتيادي** — W12 P2 أضاف magnetic aura، لكن لا cursor trail، لا personality awareness.
- ✋ **صامتة كلياً** — لا feedback صوتي حتى اختياري.
- ✋ **لا aura per page** — كل صفحة تستهلك tints لكن بدون signature ambient حضور.

**VITAL UI يحلّ هذي المشاكل في 6 phases مرتّبة من الأخفت حضوراً (surfaces) إلى الأعمق (auras).**

---

## 📋 خريطة الـ Phases

| # | الملف | الناتج الرئيسي | تقديريًا |
|---|---|---|---|
| 1 | `16_PHASE_1_LIVING_SURFACES.md`         | `--life-*` tokens + `.life-ambient` / `.life-mesh` / `.life-breathing` utilities + ambient gradient layer + `Upg.life` API + AUGMENT 8-12 sections | ~450 سطر |
| 2 | `16_PHASE_2_TACTILE_MICRO.md`           | Button signatures + ripple effect + card hover-lift refinements + magnetic micro-pulls + `.tactile-*` utilities + `Upg.life.pulse(el)` | ~440 سطر |
| 3 | `16_PHASE_3_CINEMATIC_TRANSITIONS.md`   | Depth-aware transitions + parallax sub-layers + view-transition extensions on `Upg.transition.run` + `.depth-*` utilities | ~430 سطر |
| 4 | `16_PHASE_4_POINTER_COMPANION.md`       | Cursor trail with personality color + magnetic enhancements + focus-ring elevation + `Upg.life.pointer` | ~400 سطر |
| 5 | `16_PHASE_5_SOUND_DESIGN.md`            | WebAudio synth-only UI sounds (5 sounds) + `Upg.sound` API + opt-in via toggle in command palette + a11y respect | ~380 سطر |
| 6 | `16_PHASE_6_IDENTITY_AURAS.md`          | 14 page auras (each personality gets a unique ambient halo) + `--aura-*` tokens × 14 + `Upg.aura` API + integration with `data-page-personality` | ~520 سطر |

> **مجموع تقريبي:** ~2,620 سطر، موزّعة على 6 phases (≤520/phase) لتجنّب context limit.
>
> **ترتيب التنفيذ المُلزِم:** `1 → 2 → 3 → 4 → 5 → 6`. لا قلب، لا تقديم. (Phase 6 يستهلك Phase 1 + Phase 4.)

---

## 🌐 معايير عالمية مرجعية

- **Apple iOS Human Interface Guidelines** — Motion (purposeful, brief, deferential).
- **Material Motion (Google)** — common motion paradigms (containerization, choreography, transformation).
- **Linear App** — micro-interactions باللمس النحيف.
- **Vercel Dashboard** — depth + page transitions cinematic-grade.
- **Stripe Checkout** — tactile feedback minimal.
- **Anthropic Claude UI** — ambient surfaces بلا تشتيت.
- **Bret Victor — Inventing on Principle** (immediate connection — feedback latency).
- **Don Norman — The Design of Everyday Things** (signifiers + feedback loops).
- **WebAudio API specs** — synthesis-only sound (no asset loading philosophy).

> **القاعدة:** نستلهم الفلسفة، لا نستنسخ الحركات. كل keyframe يُكتب من الصفر بميزانية CPU صارمة.

---

## 🛠️ بروتوكول التنفيذ (مطابق لـ AUTO_PILOT v2)

1. **Branch واحد طولي**: `worker-16-vital-ui` ينشأ في **بداية Phase 1** من `main` المحدَّث (Worker 15 مدموج).
2. **بقية الـ phases** تستمر على نفس الـ branch — لا branch جديد.
3. **بعد كل phase**:
   - commit رسالة: `phase N (vital): <العنوان>`
   - **push فوراً** للـ remote (أهم قاعدة)
   - حدِّث `state/PROGRESS.json` (current.pack="v2", worker="16", phase=N, status="in-progress")
   - snapshot في `state/snapshots/worker-16-phase-N.json`
   - commit ثانٍ: `state: vital phase N committed and pushed`
   - **push ثانٍ فوراً**
4. **PR واحد** في نهاية Worker: من `worker-16-vital-ui` → `main`.
5. **Session واحد = phase واحد** (قاعدة AUTO_PILOT v2).

---

## 🚫 ممنوعات قاطعة (Worker 16)

- ❌ تحميل ملفات صوت/فيديو/lottie — كل شيء synth أو CSS.
- ❌ إضافة maktbah/CDN غير الموجود (Google Fonts فقط — موروث).
- ❌ تكسير أو إعادة تسمية أي motion token من W12-W14.
- ❌ تعديل قيم HSL لـ identity tints — Worker 16 يستهلكها فقط.
- ❌ إضافة `!important` (≤20 globally — حافظ عليه).
- ❌ keyframe بدون `@media (prefers-reduced-motion: reduce)` guard مقابل.
- ❌ تجاوز 6 keyframes نشطة في idle (per page).
- ❌ تجاوز 600 سطر لكل phase.

---

## ✅ مقاييس النجاح (موحّدة عبر كل الـ phases)

في نهاية Worker 16:

| المقياس | قبل (Cathedral + W15) | الهدف بعد |
|---|---:|---:|
| Living motion layers | 1 (motion + choreo) | **5** (life + aura + cursor + sound + pulses) |
| Ambient gradients per page | 0 | **14** (واحد لكل personality) |
| Tactile microinteractions classes | ~6 | **~22** |
| Cinematic transition variants | 1 (basic fade) | **5** (fade/depth/slide/scale/morph) |
| Pointer companion features | 1 (magnet) | **4** (magnet + trail + focus-elevate + personality-tint) |
| UI sound effects | 0 | **5** (synthed, opt-in only) |
| Page auras | 0 | **14** |
| New Upg.* APIs | 20 | **23** (+life, +aura, +sound) |
| reduced-motion coverage | 13+ guards | **≥20 guards** (every new keyframe) |
| Idle FPS | ≥ 60 | **≥ 55** (5fps margin for 5 layers) |
| Console errors | 0 | 0 (preserved) |
| 14 page sections | 14 | 14 (preserved) |
| 391 qcalc references | 391 | 391 (preserved) |

---

## 🎬 كيف يستخدمه AUTO_PILOT v2

```
1. AUTO_PILOT v2 يفتح state/PROGRESS.json → يقرأ next_action.
2. لو فيه "Worker 16" → يقرأ هذا الفهرس مرة واحدة.
3. يفتح فقط ملف الـ phase الحالي (16_PHASE_<N>_*.md) — ليس كل الـ phases.
4. ينفّذ Phase، يعمل commit+push، يحدّث state، commit+push ثانٍ.
5. session واحد = phase واحد. توقّف بعد phase وحدة.
6. ينشئ PR واحد في النهاية: feat: Worker 16 — VITAL UI RESONANCE (Pack v2).
```

— نهاية الفهرس. الملفات التفصيلية في `16_PHASE_*.md`.

🌬️ الواجهة تتنفّس. ابدأ بالـ surfaces.
