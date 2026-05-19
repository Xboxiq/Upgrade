# 📱 دليل Kiro Mobile — Pack v2 RESONANCE

> مصمَّم خصيصاً لمستخدم Kiro Mobile App. الهدف: تنفيذ Pack v2 من الجوّال بدون نسخ/لصق برومتات طويلة + بدون انفجار context.

---

## 🎯 الفكرة الأساسية

بدل ما تنسخ برومت طويل من ملف وتلصقه (متعب على الجوّال)، **خلي Kiro يقرأه من الريبو مباشرة** عبر رسالة قصيرة.

الريبو محمَّل بالفعل في sandbox عند فتح session. كل اللي تحتاجه: **سطر إشارة قصير**.

---

## 🚀 برومت البدء السريع (احفظه في ملاحظات الجوّال)

### Quick-Start (الصقه في أول رسالة):

```
اقرأ prompts/v2/COMPACT_MASTER_v2.md من الريبو واعتبره دستور هذا الـ session.
ثم اقرأ prompts/v2/<اسم_الـ_Worker>.md ونفّذه phase واحد فقط.
اشتغل على ملفات platform/ — لا تلمس archive/ أو prompts/ القديمة.
بعد الـ phase، اعمل 2-push (code + state) وطباعة STATE_SNAPSHOT JSON.
```

استبدل `<اسم_الـ_Worker>` بواحد من:
- `15_WORKER_TYPOGRAPHY_SOUL`
- `16_WORKER_VITAL_UI`
- `17_WORKER_CONTENT_REVIVAL`
- `18_WORKER_LEARNING_SHELL`
- `19_WORKER_MICRO_POLISH`

---

## 🚁 الأسرع — استخدام AUTO_PILOT v2

```
الصق محتوى prompts/v2/AUTO_PILOT_v2.md
```

أو ببساطة:
```
شغّل AUTO_PILOT v2 من prompts/v2/AUTO_PILOT_v2.md
```

Kiro يفتح `state/PROGRESS.json` ويعرف وين توقّف من Pack v1 → ينتقل لـ Pack v2 تلقائياً.

---

## 🔄 برومت الاستئناف (لو انقطع session)

```
اقرأ prompts/v2/COMPACT_MASTER_v2.md و prompts/v2/10_RESUME_PROTOCOL_v2.md.
هذا آخر STATE_SNAPSHOT (Pack v2):
<الصق الـ JSON هنا>

استأنف من Phase التالي. لا تعد عمل سابق. استمر على نفس الـ branch worker-<id>-resonance.
```

---

## ⚠️ تنبيهات مهمة لمستخدم الجوّال (Pack v2)

### 1) قبل الانطلاق في Pack v2 (مرة واحدة)

تأكد إن Pack v1 مكتمل:
```
افحص state/PROGRESS.json. هل current.worker = "14" و phase = 6 و status = "done"؟
لو نعم، نحن جاهزون لـ Pack v2. لو لا، أعطني الحالة.
```

### 2) قواعد الجوّال الذهبية (Pack v2 — أصرم من v1)

| القاعدة | السبب |
|---|---|
| ✅ phase **واحد** فقط لكل session | الجوّال context محدود |
| ✅ احفظ STATE_SNAPSHOT في ملاحظات الجوّال فوراً | sessions الجوّال ممكن تنغلق فجأة |
| ✅ استخدم `COMPACT_MASTER_v2.md`، **مو الكامل** | توفير 80% توكنز |
| ✅ AUTO_PILOT v2 موصى به للجوّال (auto state save) | يعمل بدون تدخّل |
| ❌ لا تطلب من Kiro يقرأ `archive/` | الملف 1.1 MB ينفجر |
| ❌ لا ترفع صور كبيرة في الـ session | تستهلك توكنز |
| ❌ لا تحاول تكمل session طويل | افتح جديد بعد كل phase |
| ❌ لا تطلب قراءة platform/* كامل | استخدم line ranges |

### 3) لما تشعر بالبطء

علامات الانفجار القادم:
- Kiro صار يردّ ببطء
- الردود قصيرة بشكل غير عادي
- ظهر "context approaching limit"

**الحل الفوري:**
1. انسخ آخر STATE_SNAPSHOT من Kiro لتطبيق ملاحظات
2. اقفل الـ session
3. افتح session جديد + استخدم `AUTO_PILOT_v2.md` (يقرأ state بنفسه)

---

## 📋 سيناريوهات شائعة لـ Pack v2 (انسخ والصق)

### "ابدأ Worker 15 — Typography"
```
اقرأ prompts/v2/COMPACT_MASTER_v2.md و prompts/v2/15_WORKER_TYPOGRAPHY_SOUL.md.
ثم اقرأ prompts/v2/15_PHASE_1_TYPE_AUDIT_CASTING.md.
نفّذ Phase 1 فقط. بعدها 2-push + STATE_SNAPSHOT.
```

### "كمل Worker 15 من Phase 2"
```
اقرأ prompts/v2/AUTO_PILOT_v2.md ونفّذ.
state/PROGRESS.json يحتوي current.worker="15" و phase=1.
كمل من Phase 2.
```

### "نفّذ الطقس — CONTENT_REORDER_RITUAL"
```
اقرأ prompts/v2/CONTENT_REORDER_RITUAL.md ونفّذه كاملاً.
هذا طقس مستقل، يجري في session واحد.
```

### "افحص الكود الجديد"
```
اقرأ آخر 200 سطر من platform/assets/style.css و آخر 200 سطر من platform/assets/app.js.
لخّص لي ما اللي أُضيف في آخر phase بدون نسخ الكود.
```

### "Export PR للمراجعة"
```
أنشئ commit نهائي و push على worker-<id>-resonance.
أعطني رابط الـ PR لمراجعته على GitHub Mobile.
```

### "Rollback آخر phase — ما عجبني"
```
آخر phase ما عجبني بصرياً.
git reset --hard HEAD~2 على worker-<id>-resonance (يلغي code-commit + state-commit).
ثم push --force-with-lease.
ثم حدّث state/PROGRESS.json: current.phase = N-1.
```

---

## 💡 نصائح موفرة للوقت على الجوّال (Pack v2)

1. **استخدم GitHub Mobile** بجانب Kiro — لما Kiro يعمل push، تفتح الـ PR مباشرة من GitHub
2. **احفظ هذي البرومتات في تطبيق ملاحظات** (Notes/Keep) — copy-paste بسرعة
3. **استخدم voice input** للسؤال الطويل
4. **اطلب commit message قصير**: "اكتب commit message في 8 كلمات"
5. **بعد كل Worker كامل** — افتح المنصة في المتصفح على الجوّال (احفظ HTML على iCloud Drive / Google Drive) لاختبار بصري سريع
6. **خذ screenshot قبل كل Worker** — للمقارنة بعد

---

## 🆘 لو شي ما اشتغل

اكتب لـ Kiro:
```
الـ session بطيء / ما يستجيب / يطلع context limit في Pack v2.
أعطني خطة إنقاذ لـ STATE_SNAPSHOT الحالي قبل ما ينفجر.
```

أو:
```
الـ branch worker-<id>-resonance ضائع.
افحص git branches وأعطني الحالة.
```

---

## 📚 الملفات اللي محتاجها (موقعها في الريبو)

| الاحتياج | الملف |
|---|---|
| دستور قصير | `prompts/v2/COMPACT_MASTER_v2.md` |
| دستور كامل | `prompts/v2/00_MASTER_PROMPT_v2.md` |
| تنفيذ ذاتي كامل | `prompts/v2/AUTO_PILOT_v2.md` |
| استئناف | `prompts/v2/10_RESUME_PROTOCOL_v2.md` |
| تشخيص context | `prompts/v2/CONTEXT_LIMIT_FIX_v2.md` |
| Workers (5) | `prompts/v2/<id>_WORKER_*.md` |
| Phases (26) | `prompts/v2/<id>_PHASE_*_*.md` |
| الطقس الخاص | `prompts/v2/CONTENT_REORDER_RITUAL.md` |
| المنصة الشغّالة | `platform/` |
| الأصل (لا تلمسه) | `archive/` |
| Pack v1 (مرجعي) | `prompts/*` (الجذر) |

---

## 🎯 خصوصية Pack v2 على الجوّال

### اختبار بصري سريع بعد كل Worker

بعد ما Kiro يعمل PR لـ Worker كامل:

1. **افتح GitHub Mobile** → الـ PR
2. **شوف الـ Files Changed** — تحقق من tokens جديدة
3. **افتح `platform/index.html` raw** على الجوّال
4. **احفظ HTML** على iCloud/GDrive
5. **افتح في Safari/Chrome** على الجوّال — اختبر:
   - dark + light themes
   - تنقّل بين 3-4 صفحات
   - افتح dashboard وافحص typography الجديدة
6. **لو شي عجبك** → merge الـ PR من GitHub Mobile مباشرة
7. **لو شي ما عجبك** → اكتب comment على الـ PR + Kiro سيتلقى الملاحظة في session تالي

### ميزانية session على الجوّال

| السيناريو | الميزانية المقترحة |
|---|---|
| Worker 15 phase صغير | 1 phase / session |
| Worker 16 phase حركي | 1 phase / session (اختبر فوراً) |
| Worker 17 inventory | يحتاج desktop غالباً (kbd مكثفة) |
| Worker 18 + 19 | 1-2 phase / session |
| CONTENT_REORDER_RITUAL | session كامل (~30 دقيقة) |

---

## 🔔 ختاماً

Pack v2 على الجوّال = **بناء بطيء وذوقي**. لا تتسرّع. كل Worker لازم يُختبر بصرياً على الجوّال نفسه قبل ما تنتقل للتالي.

**جودة Pack v2 تُقاس بـ "الإحساس عند الفتح" — وأنت أفضل قاضٍ على ذوق منصتك.**

---

**نهاية الدليل. احفظ هذا الملف في ملاحظات جوّالك وستكون جاهزاً.**

🔔 Resonance يولد على الجوّال أولاً.
