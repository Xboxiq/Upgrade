# 🚀 حزمة برومتات تطوير منصة التدريب الاحترافية
> دليل استخدام عملي — اقرأه مرة واحدة، ثم اشتغل.

---

## 🧭 ما هذه الحزمة؟

نظام **برومتات احترافي مقسّم** لتطوير منصتك (`arabic-training-platform-v12 (1) (4) (1) (1) (1).html`) بحيث:
- تتجنب **انفجار الـ context** (المشكلة اللي صارت معك سابقاً).
- تحصل على **محتوى علمي عميق** بمصادر موثقة لا توجد عند المنافسين.
- تحصل على **هوية بصرية فريدة** (مو قالب جاهز).
- تحصل على **بروتوكول استئناف** يخليك تكمل من نفس النقطة في أي سيشن جديد.

---

## 📁 محتويات المجلد

| الملف | الوظيفة |
|---|---|
| `00_MASTER_PROMPT.md` | الدستور — يُلصق في **كل** سيشن جديد |
| `01_WORKER_UI_UX.md` | ترقية الواجهة لـ Quantum Leap v13 (هوية بصرية مميزة) |
| `02_WORKER_SALES_AND_AM.md` | وحدة المبيعات + Account Manager |
| `03_WORKER_CALLCENTER.md` | تطوير وحدة الكول سنتر + Voice Lab |
| `04_WORKER_ACCOUNTING_CASHIER.md` | المحاسبة + الكاشير + الضرائب العراقية |
| `05_WORKER_PROGRAMMER.md` | المبرمج المبتدئ + Roadmap واقعي |
| `06_WORKER_SOCIAL_MARKETING.md` | السوشيال ميديا + التسويق |
| `07_WORKER_PHONE_REPAIR.md` | صيانة الهاتف (وحدة جديدة بالكامل) |
| `08_WORKER_HR_NEGOTIATION.md` | تفاوض راتب + إتقان مقابلات HR |
| `09_WORKER_PSYCHOLOGY_LAYER.md` | طبقة علم النفس عبر كل المسارات |
| `10_RESUME_PROTOCOL.md` | برومت استئناف الجلسة بعد انقطاع |
| `README.md` | هذا الملف |

---

## ▶️ طريقة الاستخدام (خطوة بخطوة)

### الخطوة 1 — ابدأ سيشن جديد

افتح Kiro / Claude / GPT (أي نموذج قوي يفهم HTML/JS/CSS).

### الخطوة 2 — ألصق الدستور (مرة واحدة في كل سيشن)

انسخ كامل محتوى **`00_MASTER_PROMPT.md`** والصقه كأول رسالة في السيشن. انتظر تأكيد المساعد ("understood" أو ما يشابه).

### الخطوة 3 — اختر Worker للتنفيذ

حسب الترتيب المُوصى به (يمكن تغييره):

```
WORKER 01 (UI/UX)        ←  ابدأ هنا (أساس بصري لكل ما يأتي)
   │
   ↓
WORKER 09 (Psychology)   ←  ثاني (لأنه طبقة عرضية)
   │
   ↓
WORKER 02 (Sales + AM)   ─┐
WORKER 03 (Call Center)  │
WORKER 04 (Accounting)   ├─  أي ترتيب — مستقلة عن بعض
WORKER 05 (Programmer)   │
WORKER 06 (Social/Mkt)   │
WORKER 07 (Phone Repair) ┘
   │
   ↓
WORKER 08 (HR)           ←  أخيراً (يستفيد من بيانات الرواتب من بقية الـ Workers)
```

### الخطوة 4 — ألصق الـ Worker

انسخ محتوى الـ Worker المختار (مثلاً `02_WORKER_SALES_AND_AM.md`) والصقه كرسالة جديدة بعد الـ Master.

### الخطوة 5 — انتظر PRE-FLIGHT CHECK

المساعد سيطبع تلقائياً:
```
📋 PRE-FLIGHT CHECK
├─ Worker requested: ...
├─ Phases planned: ...
└─ ...
```

راجعها. إذا OK، اكتب: **`موافق ابدأ`** أو **`OK proceed`**.

### الخطوة 6 — احفظ كل STATE_SNAPSHOT

بعد كل phase، المساعد يطبع شي مثل:
```json
{
  "worker": "02-sales",
  "phase_completed": 2,
  "phases_total": 5,
  ...
}
```

**انسخه واحفظه** في ملف `.txt` على جهازك (مثلاً `snapshots/sales_phase2.json`). هذا أهم خطوة.

### الخطوة 7 — الكود

المساعد سيرسل لك الكود (HTML/CSS/JS). انسخه والصقه في **الموقع المناسب** داخل ملفك. عادة يحدد لك:
- إذا CSS → بعد آخر `}` في القسم المناسب من `<style>`
- إذا HTML → داخل `<section class="page" id="page-XXX">`
- إذا JS → في IIFE جديد قبل `</body>`

إذا غامض، اطلب من المساعد:
> "أعطني الـ insertion points بدقة (line numbers أو selectors)"

### الخطوة 8 — اختبر بعد كل phase

افتح الملف في المتصفح. تأكد:
- ✅ لا errors في console
- ✅ الصفحة الجديدة تظهر في الـ sidebar
- ✅ التفاعلات شغّالة
- ✅ التصميم متناسق

### الخطوة 9 — انتقل للـ Phase التالي أو Worker تالي

كرر من الخطوة 5.

---

## 🆘 ماذا لو انقطع المساعد في الوسط؟

مثال الرسالة: `Context limit exceeded unexpectedly. Please try again. (Request ID: ...)`

**خطوات التعافي:**

1. **افتح سيشن جديد**.
2. **ألصق `00_MASTER_PROMPT.md` أولاً**.
3. **ألصق `10_RESUME_PROTOCOL.md` ثانياً**.
4. **ألصق آخر `STATE_SNAPSHOT` حفظته** + أخر 80-120 سطر من الكود الذي حصلت عليه.
5. اكتب: **`استأنف من حيث توقفت`**.
6. المساعد سيكمل من نفس النقطة بدون إعادة عمل سابق.

---

## 💡 نصائح ذهبية

### 1. لا تطلب أكثر من Phase واحد في الرسالة الواحدة
حتى لو الـ Worker يقول "Phases: 5"، اطلبها واحد واحد. هذا يمنع الانفجار.

### 2. خذ نسخة احتياطية يومية
```bash
cp "arabic-training-platform-v12 (1) (4) (1) (1) (1).html" \
   "backups/platform-$(date +%Y%m%d_%H%M).html"
```

### 3. شطر الملف لاحقاً (اختياري — للمراحل المتقدمة)
لما الملف يتجاوز 2.5 MB:
- اطلب من المساعد فصل الـ JS لـ `app.js` خارجي
- الـ CSS لـ `style.css`
- يبقى HTML خفيف يستورد الاثنين

### 4. اطلب citations مرئية
في الـ Master قاعدة "PROVE-IT" — كل ادعاء له مرجع. لا تقبل محتوى بدون مصادر.

### 5. اختبر التشغيل offline
أغلق الإنترنت → افتح الملف. لازم يشتغل (ما عدا خط Cairo اللي يحمّل من Google Fonts).

### 6. للـ Cairo offline
لو تريد فك الاعتماد التام عن الإنترنت، حمّل خط Cairo محلياً وعدّل:
```html
<link href="./fonts/Cairo.css" rel="stylesheet" />
```

---

## 🎯 خارطة الطريق المقترحة (8 أسابيع)

| الأسبوع | الإنجاز | الناتج |
|---|---|---|
| 1 | WORKER 01 (UI/UX v13) | الواجهة بهوية بصرية فريدة |
| 2 | WORKER 09 (Psychology Layer) Phase 1-3 | تعميق `page-psych` و `page-eq` |
| 3 | WORKER 02 (Sales + AM) | أعمق وحدة مبيعات عربية |
| 4 | WORKER 03 (Call Center) | Voice Lab عمليّ |
| 5 | WORKER 04 (Accounting) | Tax Calculator IQ + Statements Builders |
| 6 | WORKER 05 (Programmer) + WORKER 06 (Social/Mkt) | مسارات تقنية ومسوّق |
| 7 | WORKER 07 (Phone Repair) | وحدة جديدة كاملة |
| 8 | WORKER 08 (HR) + WORKER 09 المتبقي + Polish | إقناع HR + نظام Insights |

---

## 🛡️ ضمان الجودة (Acceptance per Module)

كل وحدة قبل ما تعتبرها "خلصت":
- [ ] على الأقل 8 citations علمية ظاهرة
- [ ] كتلة "🇮🇶 السوق العراقي" موجودة
- [ ] على الأقل تفاعل واحد (lab) شغّال
- [ ] جدول رواتب
- [ ] Cheat Sheet قابل للطباعة
- [ ] Career Ladder
- [ ] localStorage يحفظ التقدم
- [ ] لا errors في console
- [ ] متناسق مع Quantum Leap design tokens

---

## 📚 مصادر مرجعية معتمدة (لـ AI كي يستشهد منها)

موجودة بالتفصيل في `00_MASTER_PROMPT.md` (البند 3).

---

## 🤔 أسئلة شائعة

**س: هل أحتاج أن أكون مبرمجاً لاستخدام هذه الحزمة؟**
ج: لا. لكن لازم تعرف:
- كيف تنسخ/تلصق نص كبير في chat
- كيف تفتح ملف HTML في محرر نصوص
- كيف تحفظ ملف وتفتحه في متصفح

**س: هل الحزمة تعمل مع GPT-5 / Claude / Gemini؟**
ج: نعم. مصممة بشكل موديل-أجنوستيك. لكن أفضل النتائج تكون مع:
1. Claude (Sonnet / Opus) — يفهم السياق الطويل
2. GPT-4o / GPT-5 — جيد للكود
3. Gemini 1.5/2.0 Pro — context window كبير

**س: لماذا 9 Workers بدل برومت واحد؟**
ج: لتجنّب الـ context limit. كل Worker يحتاج ~3000 سطر كود. مجموعها ~25,000 سطر — مستحيل في session واحد.

**س: ماذا لو أردت إضافة Worker جديد؟**
ج: انسخ template من أي Worker موجود (مثلاً `05_WORKER_PROGRAMMER.md`) وعدّله. لاحظ القسم: PRE-FLIGHT, Phases, Iraq Block.

**س: المنصة محلية فعلاً 100%؟**
ج: نعم. الاستثناء الوحيد: Cairo font من Google Fonts (يمكن استبداله بـ local).

---

## 📞 إذا واجهت مشكلة

1. تأكد إن الـ MASTER PROMPT محمّل في السيشن.
2. تأكد إن الـ STATE_SNAPSHOT الأخير محفوظ.
3. استخدم `10_RESUME_PROTOCOL.md` للاستئناف.
4. لو الكود غير شغّال، انسخ الخطأ من console وأعطه للـ AI مع طلب الـ fix.

---

**جاهز؟ ابدأ من `00_MASTER_PROMPT.md` ثم `01_WORKER_UI_UX.md`. التوفيق! 🚀**



---

## 🏛️ Worker 11 — Platform Foundation Refit (Cathedral v14)

> أُضيف بعد إنجاز Workers 01..09 لمعالجة 6 ثغرات بنيوية. **هذا Worker معماري، ليس محتوى تدريبي**.

ملفات Worker 11 مقسّمة لتجنّب ضغط الـ context — كل Phase ملف مستقل:

| الملف | الحجم | الدور |
|---|---|---|
| `11_WORKER_PLATFORM_FOUNDATION.md` | فهرس slim | overview + معايير عالمية + roadmap |
| `11_PHASE_1_THEME_SYSTEM.md`       | ~700 سطر | Sovereign Theme (tokens + bridge + auto/dark/light) |
| `11_PHASE_2_ICON_SYSTEM.md`        | ~900 سطر | Lucide-style sprite + `.qi` + ≥350 استبدال |
| `11_PHASE_3_ENTRY_GATEWAY.md`      | ~750 سطر | Onboarding 4-step + PIN + idle lock |
| `11_PHASE_4_CALCULATOR_FRAMEWORK.md` | ~850 سطر | `qcalc` + ترحيل 8 حاسبات |
| `11_PHASE_5_COMMAND_PALETTE.md`    | ~700 سطر | ⌘K + 30 command + shortcuts + cheat sheet |
| `11_PHASE_6_REAL_DASHBOARD.md`     | ~750 سطر | `Upg.state` facade + dashboard live + page-myprogress |
| `11_PHASE_7_PRODUCTION_PASS.md`    | ~600 سطر | Inline cleanup + PWA + favicon + a11y + Lighthouse |

### كيف يستخدمه AUTO_PILOT

```
1. اقرأ prompts/11_WORKER_PLATFORM_FOUNDATION.md (الفهرس) — مرة واحدة.
2. في كل Phase: اقرأ ملف الـ Phase الخاص فقط (ليس الكل).
3. التزم بـ linear branch worker-11-complete + push بعد كل phase.
4. لا تخلط ملفات الـ Phases — كل سيشن phase واحد.
```

### نموذج الانطلاق

ألصق `prompts/AUTO_PILOT.md` في سيشن جديد. AUTO_PILOT يقرأ `state/PROGRESS.json`، يكتشف أن Worker 09 منتهٍ → ينتقل لـ Worker 11 → يفتح ملف الـ Phase التالي حسب التقدم.



---

## 🌌 Worker 12 — AURORA (Apple-Grade UI/UX) — Cathedral v15

> أُضيف بعد Worker 11. يرفع المنصة من "احترافي جيد" إلى **Apple-grade**: Linen-Bone off-white، 4-tier glass، Source-list sidebar، Dynamic-Island topbar، Bento dashboard، Apple easing، per-page identity tints.

ملفات Worker 12 على نفس نسق Worker 11 — كل phase ملف مستقل لتجنّب context limit:

| الملف | الحجم | الدور |
|---|---|---|
| `12_WORKER_AURORA_APPLE_GRADE.md`    | فهرس slim | overview + معايير + roadmap + بروتوكول |
| `12_PHASE_1_TYPOGRAPHY_SPATIAL.md`   | ~520 سطر | Type scale (clamp) + 4pt spacing + reading rhythm |
| `12_PHASE_1B_TYPEFACE_SOUL.md`       | ~480 سطر | **Premium Arabic stack: Reem Kufi + Readex Pro + IBM Plex Arabic + Aref Ruqaa + Thmanyah optional** |
| `12_PHASE_2_OFFWHITE_RECHISEL.md`    | ~480 سطر | Linen-Bone palette + tinted shadows + `!important` purge ابتدائي |
| `12_PHASE_3_MATERIALS_DEPTH.md`      | ~560 سطر | 4-tier glass + scroll elevation + edge-light + grain refresh |
| `12_PHASE_4_NAVIGATION_CHROME.md`    | ~620 سطر | Source-list sidebar + Dynamic-Island topbar + badge tokens |
| `12_PHASE_5_DASHBOARD_HERO.md`       | ~640 سطر | Bento dashboard + count-up + dock + per-page identity tints |
| `12_PHASE_6_MOTION_INTERACTION.md`   | ~520 سطر | Apple easing + springs + cursor glow + view transitions |
| `12_PHASE_7_INLINE_PURGE.md`         | ~580 سطر | inline → utilities + `!important` ≤20 + Lighthouse ≥90/95 |

> **ترتيب التنفيذ المُلزِم:** `1 → 1B → 2 → 3 → 4 → 5 → 6 → 7`

### نموذج الانطلاق

نفس نمط Worker 11:
1. ألصق `prompts/AUTO_PILOT.md` في سيشن جديد.
2. AUTO_PILOT يقرأ `state/PROGRESS.json` → يجد `current.worker = "12"` ، `phase = 0` (ready).
3. يفتح فهرس Worker 12 ثم `12_PHASE_1_*.md` → ينشئ branch `worker-12-aurora` → ينفّذ → push.
4. كل phase: commit + push (كود) ثم commit + push (state) — قاعدة 2-push.
5. في النهاية: PR واحد `feat: Worker 12 — AURORA (Apple-grade UI/UX)` → main.

### مقاييس النجاح المستهدفة

| المقياس | الحالي | الهدف |
|---|---|---|
| inline `style=` في index.html | 1602 | ≤ 200 |
| `!important` في style.css | 144 | ≤ 20 |
| Glass tiers | 1 | 4 (thin/regular/thick/chrome) |
| Easing tokens | 0 | ≥ 5 |
| Per-page identity tints | 0 | 11 صفحة |
| Lighthouse mobile (Perf / A11y) | ? | ≥ 90 / ≥ 95 |
