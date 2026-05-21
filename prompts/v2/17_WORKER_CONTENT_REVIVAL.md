# 📚 WORKER 17 — CONTENT REVIVAL (Pack v2 RESONANCE)
> **Type:** معماري + بيداغوجي (المحتوى موجود — هذا Worker يُحييه).
> **يبني فوق:** Cathedral v16 + Pack v2 Workers 15 (TYPOGRAPHY SOUL) + 16 (VITAL UI).
> **الهدف الواحد:** نقل المحتوى من **blocks منفصلة** إلى **رحلة تعلّم منظَّمة** — كل block يعرف صعوبته، متطلباته، زمنه، أخطاءه الشائعة، تماريينه، وروابطه.
> **الفلسفة:** *المحتوى الموجود ثري — لكنه أعلام بلا خريطة. هذا Worker يرسم الخريطة.*

---

## 🛡️ Preservation Guard — اقرأ هذا قبل أي شيء آخر

> هذا أهم قسم في Worker 17. لو تجاهلته، الـ Worker سيكسر المنصة بدون أن يُلاحَظ — لأن المحتوى لن يختفي بصرياً، لكن المعنى البيداغوجي سيتشوّه.

### ⛔ القاعدة الذهبية الواحدة

> **CONTENT REVIVAL يُضيف طبقات معرفية، لا يُعيد كتابة المحتوى.**
>
> الـ 14 صفحة محتوى تحوي ~500 block بيداغوجي تم بناؤها في Workers 1-9. **Worker 17 لا يُعدِّل نص block واحد.** يضيف فقط:
> - metadata (data-attributes)
> - طبقات تعليمية محيطة (TL;DR، pitfalls، practice، cross-refs، pacing)
> - utilities CSS لعرض هذي الطبقات
> - 2 IIFE جديدة (`Upg.practice` + `Upg.pace`)

### 🚫 الأخطاء القاتلة (لو حصل أحدها → توقّف فوراً)

1. ❌ **تعديل نص محتوى موجود** (paragraph، list item، heading text، table cell). ممنوع. حتى لو فيه typo.
2. ❌ **حذف block** أو دمج block-ين. ممنوع.
3. ❌ **تعديل qcalc instances** (391 محفوظة). ممنوع لمسها أو تغيير حساباتها.
4. ❌ **تغيير 19 page personalities** من Worker 15 P6.
5. ❌ **تغيير aura signatures** من Worker 16 P6.
6. ❌ **إعادة ترتيب DOM** — هذا شغل `CONTENT_REORDER_RITUAL` بعد Worker 17، ليس Worker 17 نفسه.
7. ❌ **تعديل أي من 23 Upg.* APIs** السابقة (theme, icons, gateway, calc, cmdk, state, production, type, scroll, nav, identity, greet, countup, motion, material, chrome, choreo, transition, focusTrap, type2, life, sound, aura).
8. ❌ **font-family مباشرة** — كله عبر `var(--type-voice-*)` من Worker 15.
9. ❌ **hex مباشر** — `color-mix(in oklch, ...)` أو tokens فقط.
10. ❌ **تجاوز 600 سطر كود** لكل phase.

### 📦 الأصول المُقدّسة (Sacred Assets)

| ما يجب الحفاظ عليه 100% | الوضع المتوقّع بعد Worker 17 |
|---|---|
| 14 page sections + dashboard + myprogress | كلها موجودة، نفس IDs |
| 391 qcalc references | موجودة، تشتغل، نفس النتائج الحسابية |
| 23 Upg.* APIs السابقة | كلها معرَّفة، نفس signatures (نضيف 2: `Upg.practice` + `Upg.pace`) |
| 9 type-voice tokens (`--type-voice-*`) من W15 P1 | تُستهلَك، لا تُعدَّل |
| 14 page personalities + 15 identity tints | تُحترَم، تتمدَّد عبر طبقات Worker 17 |
| Aura signatures (W16 P6) | تبقى تشتغل |
| Sound (W16 P5) | يبقى off-by-default |
| Tactile + life + transition (W16 P1-4) | تبقى |
| نص كل block | لا يُلمَس حرفاً واحداً |
| Service Worker + manifest + favicon | لا تُلمس |

### ✅ ماذا يفعل Worker 17 فعلاً

في كل phase، **3 عمليات فقط مسموح بها**:

1. **AUGMENT** — إضافة `data-*` attributes أو classes إضافية على عناصر موجودة (مثال: `<div class="lesson-block">` يصبح `<div class="lesson-block" data-block-id="cc-001" data-difficulty="2" data-est-minutes="8">`).
2. **WRAP** — إحاطة block موجود بـ wrapper جديد (مثال: إضافة `<aside class="block-tldr">..</aside>` كـ sibling للـ block — قبله أو بعده — لكن **بدون تحريك** الـ block نفسه).
3. **APPEND** — إضافة CSS utilities + IIFE جديدة في نهاية الملفات.

> أي عملية رابعة (rewrite text, delete block, reorder DOM)؟ → **ممنوعة**. الـ ritual المنفصل يتولّى reorder.

### 🔍 Pre-Flight Inspection (تنفّذ قبل كل phase)

```
🔍 PRESERVATION INSPECTION (Phase N)
├─ Files I will TOUCH:
│   - platform/index.html         (operations: AUGMENT data-* + WRAP siblings)
│   - platform/assets/style.css   (operations: APPEND ~M lines)
│   - platform/assets/app.js      (operations: APPEND IIFE — Phase 4 + 6 only)
├─ Files I will NEVER TOUCH:
│   - archive/* (read-only)
│   - prompts/* (Pack v2 — read-only except adding new specs)
│   - existing block <p>, <h2>, <h3>, <li>, <td>, <pre> text content
├─ Sacred check (run BEFORE):
│   - grep -c '<section class="page"' platform/index.html  → 16
│   - grep -c "qcalc" platform/index.html                   → 391
│   - grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l → ≥23
│   - grep -c 'data-page-personality' platform/index.html   → ≥15
└─ Awaiting confirmation
```

### 🧪 Post-Phase Sanity Probe

```
🧪 SANITY AFTER PHASE N
├─ Pages count:        16 (was 16)        ✓
├─ qcalc instances:    391 (was 391)      ✓
├─ Upg.* APIs:         ≥23 (24 after P4, 25 after P6)  ✓
├─ Block text content: zero edits         ✓  (verified via diff)
├─ All W15 voice bindings work:           ✓
├─ All W16 surfaces (life/aura/tactile):  ✓
├─ Console errors:     0                  ✓
├─ Visual regression:  none reported      ✓
└─ Resonance check: المحتوى الآن يعرف عن نفسه؟ ✓
```

---

## 🧭 لمَ CONTENT REVIVAL الآن؟

Workers 1-9 بنوا 14 صفحة محتوى ثرية. Worker 11 رتّبها في cathedral. Workers 12-16 ضبطوا الشكل والصوت والحركة.

**لكن المحتوى نفسه ساكت عن نفسه:**

- Block ما يقول صعوبته → user يفتح "Voice Profile 5 Dimensions" قبل أن يفهم "Empathy Loop" الأساسي → frustration.
- Block ما يقول زمنه التقريبي → user يبدأ "Iraqi COA" ظنّاً أنه 5 دقائق فيكتشف أنه 25 → abandonment.
- Block ما يحذّر من أخطاء شائعة → user يكرّر نفس glitch بدون أن يعرف.
- Block ما يقدّم تمارين → القراءة passive، الفهم سطحي.
- Block ما يربط بـ blocks متعلقة → user يخرج من الصفحة بدون أن يعرف الخطوة التالية.
- Block ما يدعم session pacing → user يقرأ 3 ساعات متواصلة بدون استراحة → exhaustion.

**CONTENT REVIVAL يحلّ هذي الـ 6 مشاكل في 6 phases.**

النتيجة المتوقعة بعد Worker 17:

| الطبقة | ما يضيفه | الـ phase |
|---|---|---|
| 🏷️ **Block Schema** | data-block-id, data-difficulty (1-5⭐), data-prereq, data-est-minutes, data-block-type | Phase 1 |
| 📌 **TL;DR** | 1-2 جمل خلاصة + 3-5 takeaways + reading-time + "لماذا يهم" | Phase 2 |
| ⚠️ **Pitfalls** | "أخطاء شائعة" + "علامات أنك لم تفهم بعد" + Iraqi cultural traps | Phase 3 |
| 🎯 **Practice** | 3-5 self-check questions + answer reveal + reflection prompt + `Upg.practice` | Phase 4 |
| 🔗 **Cross-Refs** | data-related + "تابع التعلم" cards + prereq breadcrumb + cross-page bridges | Phase 5 |
| ⏱️ **Pacing** | per-block focus timer + mastery toggle + per-page progress + `Upg.pace` | Phase 6 |

**+ بعد Worker 17:** الـ `CONTENT_REORDER_RITUAL` يستهلك `data-difficulty` و `data-prereq` و `data-est-minutes` ليُعيد ترتيب الـ DOM في 3 tiers (Foundation/Practitioner/Expert).

---

## 📋 خريطة الـ Phases

| # | الملف | الناتج الرئيسي | تقديريًا |
|---|---|---|---|
| 1 | `17_PHASE_1_BLOCK_SCHEMA.md`        | Block taxonomy (8 types) + 5 metadata attributes + ~500 block AUGMENT في 14 صفحة + minimal CSS scaffolding | ~480 سطر |
| 2 | `17_PHASE_2_TLDR_TAKEAWAYS.md`      | `<aside class="block-tldr">` + `<ul class="block-takeaways">` + reading-time auto-display + "لماذا يهم" framer + ~150 TL;DR sibling-wrap | ~440 سطر |
| 3 | `17_PHASE_3_PITFALLS_WARNINGS.md`   | `<details class="block-pitfalls">` collapsible + "علامات الفهم الناقص" diagnostic checklists + Iraqi cultural traps + ~80 high-impact blocks tagged | ~440 سطر |
| 4 | `17_PHASE_4_PRACTICE_SELFCHECK.md`  | `<section class="block-practice">` + 3-5 questions per major block + answer reveal mechanic + `Upg.practice` IIFE (24th API) + localStorage progress + ~60 practice sections | ~520 سطر |
| 5 | `17_PHASE_5_CROSSREF_PATHS.md`      | `data-related` AUGMENT + "تابع التعلم" cards + prereq breadcrumb chip + 8 cross-page bridges (psych↔eq, callcenter↔customercare, accounting↔accountmgr, etc.) | ~440 سطر |
| 6 | `17_PHASE_6_PACING_MASTERY.md`      | Per-block focus timer chip (15/25/45) + "تم استيعابه" mastery toggle + per-page progress bar + session-completion mini-ritual + `Upg.pace` IIFE (25th API) + page-myprogress integration | ~520 سطر |

> **مجموع تقريبي:** ~2,840 سطر، موزّعة على 6 phases (≤520/phase).
>
> **ترتيب التنفيذ المُلزِم:** `1 → 2 → 3 → 4 → 5 → 6`. لا قلب — Phase 2-6 تعتمد على schema من Phase 1.

---

## 🌐 معايير عالمية مرجعية

- **Bloom's Taxonomy** — تدرّج صعوبة (Remember → Understand → Apply → Analyze → Evaluate → Create) → 5 stars system.
- **Cognitive Load Theory** (Sweller) — chunking + intrinsic vs extraneous load → block schema design.
- **Spaced Repetition** (Ebbinghaus / SuperMemo) — reasoning behind "تم استيعابه" mastery markers.
- **Pomodoro Technique** (Cirillo) — 25min focus / 5min break → focus timer presets (15/25/45).
- **Khan Academy** — knowledge graph + prerequisite chains → `data-prereq` design.
- **Edge effect / Pareto** — 20% of content drives 80% of learning → tier separation.
- **Cathy Davidson — *The New Education*** — pedagogical framing, "why this matters" hooks.
- **Robert Talbert — *Flipped Learning*** — TL;DR before deep dive, takeaways after.
- **Doug Lemov — *Teach Like a Champion*** — pitfalls section, "no opt out" via self-check.
- **Iraqi market context** (existing platform DNA) — cultural pitfalls section preserves local flavor.

> **القاعدة:** نستلهم المنهجية، لا نستنسخ. كل block يُكتَب بصوت المنصة.

---

## 🛠️ بروتوكول التنفيذ (مطابق لـ AUTO_PILOT v2)

1. **Branch واحد طولي**: `worker-17-resonance` ينشأ في **بداية Phase 1** من `main` المحدَّث.
2. **بقية الـ phases** تستمر على نفس الـ branch — لا branch جديد.
3. **بعد كل phase**:
   - commit رسالة: `phase N (resonance): <العنوان>`
   - **push فوراً** للـ remote (أهم قاعدة)
   - حدِّث `state/PROGRESS.json` (current.pack="v2", worker="17", phase=N, status="in-progress")
   - snapshot في `state/snapshots/worker-17-phase-N.json`
   - commit ثانٍ: `state: resonance phase N committed and pushed`
   - **push ثانٍ فوراً**
4. **PR واحد** في نهاية Worker: من `worker-17-resonance` → `main`.
5. **Session واحد = phase واحد** (قاعدة AUTO_PILOT v2).

---

## 🚫 ممنوعات قاطعة (Worker 17)

- ❌ تعديل نص أي block محتوى (حتى typo)
- ❌ حذف blocks أو دمجها
- ❌ إعادة ترتيب DOM (هذا شغل الـ ritual المنفصل)
- ❌ كسر أي من 23 Upg.* APIs السابقة
- ❌ تعديل qcalc حسابات
- ❌ تغيير identity tints أو page personalities
- ❌ font-family مباشر — استعمل `var(--type-voice-*)`
- ❌ hex مباشر — استعمل `color-mix(in oklch, ...)` أو tokens
- ❌ إضافة CDN أو library (Vanilla JS فقط)
- ❌ data layer ثقيل (IndexedDB، sync، encryption) — `localStorage` فقط للـ practice progress و mastery markers
- ❌ تجاوز 600 سطر لكل phase

---

## ✅ مقاييس النجاح (موحّدة عبر كل الـ phases)

في نهاية Worker 17:

| المقياس | قبل (Cathedral v16 + W15 + W16) | الهدف بعد |
|---|---:|---:|
| Blocks بـ `data-block-id` | 0 | **~500** |
| Blocks بـ `data-difficulty` | 0 | **~500** |
| Blocks بـ `data-est-minutes` | 0 | **~500** |
| Blocks بـ `data-prereq` | 0 | **~250** (نصف الـ blocks لها prereq) |
| `block-tldr` siblings | 0 | **~150** (major blocks) |
| `block-takeaways` lists | 0 | **~150** |
| `block-pitfalls` details | 0 | **~80** (high-risk blocks) |
| `block-practice` sections | 0 | **~60** (Bloom Apply+ blocks) |
| `data-related` links | 0 | **~250** |
| Cross-page bridges | 0 | **8** |
| Per-block focus timer | غير موجود | **default available on all blocks** |
| Mastery toggle | غير موجود | **per-block + per-page rollup** |
| `Upg.practice` API | غير موجود | **معرَّف (24th)** |
| `Upg.pace` API | غير موجود | **معرَّف (25th)** |
| 14 page personalities | 14 | 14 (preserved) |
| 391 qcalc | 391 | 391 (preserved) |
| 23 prior Upg.* APIs | 23 | 23 (preserved) |
| Block text edits | 0 | **0** (preserved verbatim) |
| Console errors | 0 | 0 |

---

## 🎬 كيف يستخدمه AUTO_PILOT v2

```
1. AUTO_PILOT v2 يفتح state/PROGRESS.json → يقرأ next_action.
2. لو فيه "Worker 17" → يقرأ هذا الفهرس مرة واحدة.
3. يفتح فقط ملف الـ phase الحالي (17_PHASE_<N>_*.md) — ليس كل الـ phases.
4. ينفّذ Phase، يعمل commit+push، يحدّث state، commit+push ثانٍ.
5. session واحد = phase واحد. توقّف بعد phase وحدة.
6. ينشئ PR واحد في النهاية: feat: Worker 17 — CONTENT REVIVAL RESONANCE (Pack v2).
```

---

## 🔮 ما بعد Worker 17

Worker 17 يخلق **schema** كاملة على كل block. هذي الـ schema تُمكّن:

1. **CONTENT_REORDER_RITUAL** — يستهلك `data-difficulty` ليُعيد ترتيب DOM في 3 tiers.
2. **Worker 18 (LEARNING_SHELL)** — يستهلك `Upg.practice` و `Upg.pace` لبناء غلاف تدرّب شخصي (يومية، streak، spaced review).
3. **Worker 19 (MICRO_POLISH)** — صقل نهائي.

— بدون Worker 17، الـ ritual و Worker 18 لا أساس لهم. **Worker 17 هو العمود الفقري لـ Pack v2 المتبقي.**

— نهاية الفهرس. الملفات التفصيلية في `17_PHASE_*.md`.

🔔 المحتوى موجود. نحييه.
