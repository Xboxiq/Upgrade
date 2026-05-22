# 🕋 Pack v3 — DEVOTIO (حِرفة)
> **الجيل الثالث من برومتات منصة Upgrade.** بعد بناء الكاتدرائية وإحيائها، نعيد ولادتها كمحراب.

---

## 🌅 ما هذا الـ Pack؟

`Pack v3 — DEVOTIO` هو الجيل الثالث من برومتات منصة Upgrade، يبني فوق:
- **Cathedral v16** (نتاج Pack v1: Workers 01–14 ATELIER COMPLETE)
- **Resonance v2** (نتاج Pack v2: Workers 15–19 SOUL/VITAL/REVIVAL/SHELL/POLISH)

**الفرق الجوهري:**

| البُعد | Pack v1 (تم) | Pack v2 (تم) | **Pack v3 (الحالي)** |
|---|---|---|---|
| الهدف | بناء الكاتدرائية | إحياؤها | **هدمها رفقاً وإعادة بنائها كمحراب** |
| المحاور | بنية + محتوى + Apple-grade | روح + ذوق + ترتيب pedagogical | **جذور عربية + بنية صلبة + سيادة offline** |
| المنتج | منصة احترافية | رفيق تدريب يومي شخصي | **محراب انضباط شخصي** |
| الأسلوب | Outside-in | Inside-out | **Roots-up (الجذور إلى السطح)** |
| القارئ | فريق تطوير | مالك المنصة فقط | مالك المنصة فقط |
| الشبكة | online OK | online OK | **offline-only — صفر CDN** |

> Pack v1 = "تشتغل وتبدو فاخرة" → ✅ تم.
> Pack v2 = "أمتع جلسة تدرّب يومية" → ✅ تم.
> Pack v3 = "مِحراب انضباط بجذور عربية، يعمل في الصحراء" → 🎯 الآن.

---

## 🧭 الواقع المحوري (لا تنساه)

> **هذي منصة شخصية للمالك فقط. ملف يشتغل offline 100%. لا production، لا مستخدمين آخرين، لا شبكة.**

ما يعنيه ذلك للـ Pack v3:
- ❌ **لا** Performance budget CI / Lighthouse gates / monitoring
- ❌ **لا** Data layer ثقيل / IndexedDB / encryption / sync
- ❌ **لا** Telemetry / Analytics / Heatmaps / A/B tests
- ❌ **لا** Multi-user / Auth / Authorization
- ❌ **لا** GitHub Actions / governance / contributing guides
- ❌ **لا** CDN — **صفر CDN، صفر Google Fonts، صفر fetch خارجي** (هذي قاعدة Pack v3 الجوهرية)
- ❌ **لا** framework / library خارجي
- ✅ **نعم** خطوط `.woff2` محلية (~280KB بدل 600KB من Google)
- ✅ **نعم** 12 صبغة عربية + Mihrab dark + per-page reassignment
- ✅ **نعم** طقوس بصرية (entry / reading halo / threshold / time-of-day)
- ✅ **نعم** `@layer` cascade + شطب 80% من 221 `!important`
- ✅ **نعم** موبايل native (bottom nav + swipe + haptic + dvh + print)

---

## 📊 الأمراض الستة التي يداويها Pack v3 (مأخوذة من تحليل الكود الفعلي)

| المرض | الأرقام الفعلية | الـ Worker الذي يداويه |
|---|---:|---|
| Typography schizophrenia | 252 `font-family` مبعثرة + 6 إعادات تعريف لـ `--font-display` | **Worker 20** |
| Aurora-cliché color | باليت teal/cyan/violet عام لا روح عربية | **Worker 21** |
| واجهة بدون طقس | لا entry ritual، لا reading halo، لا time-of-day | **Worker 22** |
| Cascade Hell | 221 `!important` + 0 `@layer` | **Worker 23** |
| Mobile afterthought | لا bottom nav، لا swipe، `vh` قديم | **Worker 24** |
| Google Fonts على CDN | 9 خطوط من Google = منصة offline تتنفّس عبر شبكة | **Worker 20 P1** |

---

## 📁 محتويات Pack v3

### 🔹 Meta files (5) — ألصقها في كل session

| الملف | متى تستخدمه |
|---|---|
| `00_MASTER_PROMPT_v3.md` | **مرة في بداية كل session جديد** قبل أي Worker |
| `AUTO_PILOT_v3.md` | للتنفيذ الذاتي الكامل (موصى به) |
| `COMPACT_MASTER_v3.md` | نسخة مضغوطة لـ Master لو الـ context ضيّق |
| `10_RESUME_PROTOCOL_v3.md` | لاستئناف session منقطع |
| `README_v3.md` | هذا الملف — اقرأه مرة واحدة |

### 🔹 Workers (5) + Phases (27)

| Worker | الملفات | الـ Phases | الفلسفة |
|:---:|---|:---:|---|
| **20** | `20_WORKER_TASMEEM_RECONSTRUCTION.md` + 6 phase files | 6 | إعدام الفوضى الطباعية + 9 voices + خطوط محلية |
| **21** | `21_WORKER_CHROMATIC_SOUL.md` + 5 phase files | 5 | 12 صبغة عربية + Mihrab dark |
| **22** | `22_WORKER_RITUAL_UI.md` + 6 phase files | 6 | entry / reading / threshold / time-of-day |
| **23** | `23_WORKER_DECONSTRUCTION.md` + 5 phase files | 5 | `@layer` + شطب 80% من `!important` |
| **24** | `24_WORKER_DUAL_FORM.md` + 5 phase files | 5 | bottom nav + swipe + haptic + dvh + print |

**المجموع: ٣٧ ملفاً.**

---

## ▶️ كيف تستخدم Pack v3 (3 خطوات)

### الخطوة 1 — تحقق من Pack v2 مكتمل

افتح `state/PROGRESS.json` وتأكد:
```json
{
  "current": {
    "pack": "v2",
    "worker": "19",
    "phase": 4,
    "status": "done"
  }
}
```

لو أي شي ناقص في Pack v2، أكمله أولاً قبل البدء بـ v3 — أو أعلِن عن `v16-resonance-archive` إذا قرّرت تخطّي ما تبقى من v2.

### الخطوة 2 — اختر mode

#### 🚁 AUTO_PILOT mode (الموصى به)

1. افتح session جديد في Kiro
2. الصق `prompts/v3/AUTO_PILOT_v3.md` كاملاً
3. اضغط Send واترك Kiro يشتغل
4. عُد بعد 20-40 دقيقة، كل phase = commit + push على branch واحد طولي

#### 🎛️ Manual mode

1. افتح session جديد
2. الصق `prompts/v3/00_MASTER_PROMPT_v3.md`
3. الصق `prompts/v3/20_PHASE_1_FONT_FORENSICS.md` (مثلاً)
4. اكتب: `موافق ابدأ`
5. بعد كل phase: انسخ STATE_SNAPSHOT لجهازك
6. كرر للـ phase التالي

### الخطوة 3 — راقب التقدم

افتح GitHub:
- ✅ `state/PROGRESS.json` — تحديث بعد كل phase
- ✅ `state/snapshots/worker-20-phase-N.json` — snapshot لكل phase
- ✅ `worker-<id>-devotio` branch — كل العمل
- ✅ آخر PR مفتوح/مدموج

---

## 🗺️ خريطة Pack v3 الكاملة (التسلسل المُلزِم)

```
🕋 Pack v3 — DEVOTIO
│
├── Worker 20 — TASMEEM RECONSTRUCTION (الجذر — الأهم)
│   ├── Phase 1: Font Forensics (جرد 252 font-family + إعدام Google Fonts CDN)
│   ├── Phase 2: Local Font Load (تنزيل 9 خطوط .woff2 محلياً)
│   ├── Phase 3: Voice Bindings (ربط 9 voices بالخطوط الجديدة)
│   ├── Phase 4: Numeric Discipline (tabular-nums لكل qcalc — 391)
│   ├── Phase 5: Kashida & Rhythm (الكشيدة + الـ leading العربي الصحيح)
│   └── Phase 6: Per-Page Type Signature (14 توقيع طباعي لكل صفحة)
│
├── Worker 21 — CHROMATIC SOUL (اللون عربي الجذر)
│   ├── Phase 1: Palette Forge (إنشاء 12 لون oklch — لازوردي/زعفران/حناء/...)
│   ├── Phase 2: Dark Mihrab (استبدال Aurora dark بـ Mihrab Indigo)
│   ├── Phase 3: Page Reassignment (إعادة توزيع 14 tint على الصفحات)
│   ├── Phase 4: Gradient Recast (gradient الجديدة الـ ambient)
│   └── Phase 5: Theme Bridge (التوافق مع off-white الموجود + Pack v1/v2)
│
├── Worker 22 — RITUAL UI (الطقس)
│   ├── Phase 1: Entry Ritual (طقس فتح المنصة — dim → glow → poetry → fade)
│   ├── Phase 2: Reading Halo (zen mode حقيقي — تخفت الواجهة، يبقى المحتوى)
│   ├── Phase 3: Threshold Transitions (مشربية تتفتح بين الصفحات)
│   ├── Phase 4: Inkpot Feedback (hover/click ripple بنكهة عربية مادية)
│   ├── Phase 5: Time-of-Day Atmospheres (5 mood: فجر/ظهر/عصر/مغرب/عشاء)
│   └── Phase 6: Aura Deepening (تعميق نظام Aura من Pack v2)
│
├── Worker 23 — DECONSTRUCTION (تحرير البنية)
│   ├── Phase 1: CSS Layer Intro (إدخال @layer cascade — reset/tokens/base/utilities/components/themes)
│   ├── Phase 2: Important Purge (إعدام 80% من 221 !important)
│   ├── Phase 3: CSS Shatter (تكسير style.css لـ 6 ملفات منطقية)
│   ├── Phase 4: HTML Template Split (تكسير index.html — 14 page-shard)
│   └── Phase 5: JS ESM Migration (Upg.* → ESM modules + dynamic import)
│
└── Worker 24 — DUAL-FORM (موبايل + ديسكتوب)
    ├── Phase 1: dvh & Safe Area (إصلاح الموبايل الأساسي)
    ├── Phase 2: Bottom Nav (nav جديدة للموبايل فقط)
    ├── Phase 3: Swipe Gestures (PointerEvents + native — بين الصفحات والقياسات)
    ├── Phase 4: Haptic Layer (Vibration API — opt-in)
    └── Phase 5: Print Atelier (طباعة احترافية لكل صفحة)
```

> **ترتيب التنفيذ المُلزِم:** `20 → 21 → 22 → 23 → 24`
>
> السبب:
> - Worker 21 يحتاج voice tokens من Worker 20 لتلوين الـ headings.
> - Worker 22 يحتاج tints الجديدة من Worker 21 للـ ritual gradients.
> - Worker 23 يحتاج كل ما سبق ناضج قبل تكسير الـ monolith (لا تكسر بنية لم تستقر).
> - Worker 24 يحتاج `@layer` من Worker 23 لإضافة media queries بدون cascade conflicts.

---

## 📊 المقاييس النهائية لـ Pack v3

| المقياس | قبل (Cathedral + Resonance) | بعد Pack v3 (الهدف) |
|---|---:|---:|
| Font families في الـ stack | 9 (Google Fonts) | **9** (محلية `.woff2`) |
| Google Fonts CDN links | 1 (يحمل 9 خطوط) | **0** ✓ |
| External requests at load | 1+ | **0** ✓ |
| Font-family declarations في CSS | 252 (مبعثرة) | **≤30** (مركّزة) |
| `--font-display` redefinitions | 6 (cascade collision) | **1** (مرة واحدة، نظيفة) |
| Identity tints | 15 (aurora-cliché) | **15** (عربية أصيلة، نفس عدد، روح جديدة) |
| Color palette tokens | 1 base (teal/violet) | **12** عربي (لازوردي/زعفران/حناء/...) |
| Dark theme base | Aurora Slate | **Mihrab Indigo** |
| Visual rituals | 0 | **5** (entry/reading/threshold/inkpot/time) |
| Time-of-day atmospheres | 0 | **5** (فجر/ظهر/عصر/مغرب/عشاء) |
| `@layer` cascade layers | 0 | **6** (reset/tokens/base/utilities/components/themes) |
| `!important` count | 221 | **≤45** (شطب 80%) |
| HTML monolith size | 32K سطر | **15-18K في `index.html`** + ملفات shards |
| CSS monolith size | 23K سطر | **6 ملفات منطقية** ~3-5K كل واحد |
| Mobile bottom nav | غير موجود | **متوفّر، RTL-aware** |
| Swipe gestures | 0 | **3** (page-swipe, calc-swipe, dismiss) |
| Haptic feedback | 0 | **5 patterns** (tap/success/warn/error/longpress) |
| `dvh` usage | 0 | **>20** (replacing all `vh`) |
| Print stylesheets | 1 generic | **15** (كل صفحة لها print signature) |
| New Upg.* APIs | 24 | **≥29** (+font, +chroma, +ritual, +layer, +touch) |

---

## 🛡️ ضمانات Pack v3 (ما لن يحدث)

- ✅ **لن** يُحذف أي feature موجود في Cathedral v16 أو Resonance v2
- ✅ **لن** يُكسر أي من 24 Upg.* APIs الموجودة
- ✅ **لن** تُحذف أي من 14 صفحة (curriculum يبقى إن وُجد من Pack v2)
- ✅ **لن** تُغيّر **أسماء** identity tints (تتغيّر **القيم** في Worker 21 فقط)
- ✅ **لن** يُلمس `archive/`
- ✅ **لن** يُلمس `prompts/` (Pack v1) أو `prompts/v2/`
- ✅ **لن** يُضاف CDN/library/framework
- ✅ **لن** يُضاف Google Fonts link جديد (Worker 20 P1 يحذفه)
- ✅ **لن** تُضاف ميزات governance/CI/analytics
- ✅ **لن** يُضاف أي fetch لـ origin خارجي

---

## 🆘 إذا انقطع المساعد

1. افتح session جديد
2. الصق `00_MASTER_PROMPT_v3.md`
3. الصق `10_RESUME_PROTOCOL_v3.md`
4. الصق آخر `STATE_SNAPSHOT` JSON
5. اكتب: `استأنف من حيث توقفت`

أو ببساطة استخدم `AUTO_PILOT_v3.md` — يقرأ `state/PROGRESS.json` ويعرف وين توقّف تلقائياً.

---

## 🎯 خارطة الطريق المقترحة (5 جلسات)

| الجلسة | Worker | الناتج |
|:---:|---|---|
| 1 | Worker 20 (Tasmeem) — 6 phases | 9 خطوط محلية + 9 voices + offline-true |
| 2 | Worker 21 (Chromatic) — 5 phases | 12 صبغة عربية + Mihrab dark |
| 3 | Worker 22 (Ritual) — 6 phases | طقوس بصرية + time-of-day |
| 4 | Worker 23 (Deconstruction) — 5 phases | `@layer` + شطب `!important` + monolith breakup |
| 5 | Worker 24 (Dual-Form) — 5 phases | موبايل native + swipe + haptic + print |

**التقدير الزمني:** 8–14 ساعة عمل AI موزّعة على 5 sessions = منصة "محراب".

---

## 💡 نصائح ذهبية

1. **لا تتسرّع.** Worker 20 (Tasmeem) أهم من كل البقية — لا تتجاوزه.
2. **اختبر offline حقيقي بعد Worker 20** (اقطع الإنترنت، أعد تحميل) — يجب أن تعمل المنصة بدون أي خطأ.
3. **اختبر بصرياً بعد كل phase.** افتح `platform/index.html` في المتصفح، تجوّل في الصفحات.
4. **خذ screenshots قبل كل Worker.** للمقارنة لاحقاً.
5. **اختبر على موبايل حقيقي** بعد Worker 24 (ليس devtools emulator فقط).
6. **لو شي ما عجبك** بصرياً، rollback الـ commit بـ `git reset --hard HEAD~2` وابدأ من جديد.

---

## 📞 إذا واجهت مشكلة

- استخدم `10_RESUME_PROTOCOL_v3.md`
- ارجع لـ `prompts/v2/CONTEXT_LIMIT_FIX_v2.md` (نفس القواعد تنطبق)
- ارجع لـ `prompts/v2/MOBILE_KIRO_v2.md` لو على الجوّال (نفس القواعد + استبدل `v2` بـ `v3`)

---

## 🕯️ الفلسفة الختامية

> **التدريب الذاتي ليس Dashboard. إنه طقس.**
>
> Pack v1 بنى الجدران.
> Pack v2 أحضر الموسيقى.
> Pack v3 يحفر المحراب.
>
> بعده، تَنزع الواجهة عن نفسك صفة "تطبيق" وتلبس صفة "مُسبَل صلاة الانضباط".

---

**جاهز؟ ابدأ من `AUTO_PILOT_v3.md` — وارجع بعد ساعة لتجد Worker 20 منفّذاً.**

🕯️ **Devotion over decoration. Roots over flash. Offline over online.**
