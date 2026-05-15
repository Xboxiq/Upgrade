# 📱 دليل استخدام Kiro من الجوّال — لمشروع Upgrade

> مصمّم خصيصاً لمستخدم Kiro Mobile App. الهدف: تطوير المنصة بدون نسخ/لصق برومتات طويلة + بدون انفجار context.

---

## 🎯 الفكرة الأساسية

بدل ما تنسخ برومت طويل من ملف وتلصقه (متعب على الجوّال)، **خلي Kiro يقرأه من الريبو مباشرة** عبر رسالة قصيرة.

الريبو محمّل بالفعل في sandbox عند فتح الـ session. كل اللي تحتاجه: **سطر إشارة قصير**.

---

## 🚀 برومت البدء السريع (انسخه مرة واحدة فقط واحفظه في ملاحظات الجوّال)

### Quick-Start (الصقه في أول رسالة):

```
اقرأ prompts/COMPACT_MASTER.md من الريبو واعتبره دستور هذا الـ session.
ثم اقرأ prompts/<اسم_الـ_Worker>.md ونفّذه phase واحد بس.
اشتغل فقط على ملفات platform/ — لا تلمس archive/.
بعد الـ phase، اطبع STATE_SNAPSHOT JSON مختصر.
```

استبدل `<اسم_الـ_Worker>` بواحد من:
- `01_WORKER_UI_UX`
- `02_WORKER_SALES_AND_AM`
- `03_WORKER_CALLCENTER`
- `04_WORKER_ACCOUNTING_CASHIER`
- `05_WORKER_PROGRAMMER`
- `06_WORKER_SOCIAL_MARKETING`
- `07_WORKER_PHONE_REPAIR`
- `08_WORKER_HR_NEGOTIATION`
- `09_WORKER_PSYCHOLOGY_LAYER`

---

## 🔄 برومت الاستئناف (لو انقطع session)

```
اقرأ prompts/COMPACT_MASTER.md و prompts/COMPACT_RESUME.md.
هذا آخر STATE_SNAPSHOT:
<الصق الـ JSON هنا>

استأنف من Phase التالي. لا تعد عمل سابق.
```

---

## ⚠️ تنبيه مهم لمستخدم الجوّال

### 1) قبل أول استخدام (اعمله مرة واحدة)

**لو عندك خيار Settings/Steering في تطبيق الجوّال:**
- افتحه واحذف **كل** ملفات steering
- لو ما لقيت الخيار، اكتب لـ Kiro:
  ```
  افحص هل في .kiro/steering/ ملفات في الريبو أو في إعداداتي. إذا فيه، اشرحلي كيف أحذفها من تطبيق الجوّال.
  ```

### 2) قواعد الجوّال الذهبية

| القاعدة | السبب |
|---|---|
| ✅ phase **واحد** فقط لكل session | الجوّال context محدود أكثر |
| ✅ احفظ STATE_SNAPSHOT في ملاحظات الجوّال فوراً | sessions الجوّال ممكن تنغلق فجأة |
| ✅ استخدم COMPACT_MASTER، **مو الكامل** | توفير 80% توكنز |
| ❌ لا تطلب من Kiro يقرأ `archive/` | الملف 1.1 MB ينفجر |
| ❌ لا ترفع صور كبيرة في الـ session | تستهلك توكنز |
| ❌ لا تحاول تكمل session طويل | افتح جديد بعد كل phase |

### 3) لما تشعر بالبطء

علامات الانفجار القادم:
- Kiro صار يرد ببطء
- الردود قصيرة بشكل غير عادي
- ظهر "context approaching limit"

**الحل الفوري:**
1. انسخ آخر STATE_SNAPSHOT
2. اقفل الـ session
3. افتح session جديد + استخدم برومت الاستئناف

---

## 📋 سيناريوهات شائعة (انسخ وألصق)

### "اشتغل على الواجهة"
```
اقرأ prompts/COMPACT_MASTER.md و prompts/01_WORKER_UI_UX.md.
نفّذ Phase 1 فقط على platform/assets/style.css.
بعدها STATE_SNAPSHOT.
```

### "أضف صفحة صيانة الموبايل"
```
اقرأ prompts/COMPACT_MASTER.md و prompts/07_WORKER_PHONE_REPAIR.md.
نفّذ Phase 1 فقط (nav + page skeleton + Electronics Fundamentals).
عدّل platform/index.html و platform/assets/style.css و platform/assets/app.js.
بعدها STATE_SNAPSHOT.
```

### "كمل من STATE_SNAPSHOT"
```
اقرأ prompts/COMPACT_MASTER.md و prompts/COMPACT_RESUME.md.
SNAPSHOT:
{"worker":"07-phonerepair","phase_completed":1,"phases_total":5,"lines_added_total":600,"open_threads":[],"next_action":"Mainboard Anatomy + 10 Repair Cards"}
استأنف من Phase 2.
```

### "افحص الكود اللي ضافه آخر phase"
```
اقرأ آخر 200 سطر من platform/assets/style.css و آخر 200 سطر من platform/assets/app.js.
لخّص لي ما اللي أُضيف بدون نسخ الكود.
```

### "Export ملف للتحميل"
```
بعد ما تخلص الـ phase، أنشئ commit و push على branch جديد.
أعطني رابط الـ branch لأحمل الملف من GitHub.
```

---

## 💡 نصائح موفرة للوقت على الجوّال

1. **استخدم GitHub Mobile** بجانب Kiro — لما Kiro يعمل commit، تقدر تحمّل الملف مباشرة من GitHub لجهازك
2. **احفظ هذي البرومتات في تطبيق ملاحظات** (Notes/Keep) — copy-paste بسرعة
3. **استخدم voice input** للسؤال الطويل — أسرع من الكتابة
4. **اطلب من Kiro يبني commit message قصير** — "اكتب commit message في 8 كلمات"
5. **لما تشتغل من الـ desktop** — استخدم Master الكامل + ادمج الـ phases

---

## 🆘 لو شي ما اشتغل

اكتب لـ Kiro:
```
الـ session بطئ / ما يستجيب / يطلع context limit.
أعطني خطة إنقاذ لـ STATE_SNAPSHOT الحالي قبل ما ينفجر.
```

---

## 📚 الملفات اللي محتاجها (موقعها في الريبو)

| الاحتياج | الملف |
|---|---|
| دستور قصير | `prompts/COMPACT_MASTER.md` |
| دستور كامل (للـ desktop) | `prompts/00_MASTER_PROMPT.md` |
| استئناف مضغوط | `prompts/COMPACT_RESUME.md` |
| استئناف كامل | `prompts/10_RESUME_PROTOCOL.md` |
| تشخيص شامل | `prompts/CONTEXT_LIMIT_FIX.md` |
| Workers (9) | `prompts/01-09_WORKER_*.md` |
| المنصة الشغّالة | `platform/` |
| الأصل (لا تلمسه) | `archive/` |

---

**نهاية الدليل. احفظ هذا الملف في ملاحظات جوّالك وستكون جاهزاً.**
