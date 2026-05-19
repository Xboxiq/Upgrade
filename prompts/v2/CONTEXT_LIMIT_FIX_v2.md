# 🛡️ Context Limit Fix v2 — حل جذري في Pack RESONANCE

> اقرأ هذا الملف **مرة واحدة** عند بداية العمل بـ Pack v2 — هذي هي الإجابة الكاملة لمشكلة "context limit exceeded" في الـ workers الجديدة.

---

## 🎯 لماذا Pack v2 أكثر عرضة لـ context limit؟

Cathedral v16 أصبح **أكبر**:

| البند | حجم Pack v1 (نهاية) | حجم Pack v2 (الآن) |
|---|---:|---:|
| `platform/index.html` | ~1.0 MB | **~1.2 MB** |
| `platform/assets/app.js` | ~750 KB | **~937 KB** |
| `platform/assets/style.css` | ~520 KB | **~654 KB** |

ولكن الـ tokens المتاحة لـ Claude Sonnet/Opus = **200K**.

```
1.2MB HTML  ≈ 350K toкенз (لو حُمّل كاملاً)
937KB JS    ≈ 280K توكن
654KB CSS   ≈ 200K توكن
```

**أي قراءة كاملة لملف واحد = انفجار فوري.**

---

## 🔥 7 أسباب لـ context limit في Pack v2 + حلولها

### السبب 1️⃣ — قراءة الملف الكامل بدلاً من نطاق محدّد

❌ **خطأ:**
```
read_files(["platform/index.html"])  // محاولة قراءة 1.2MB
```

✅ **صحيح:**
```
read_files(["platform/index.html"], start_line=5000, end_line=5300)
```

**القاعدة:** لا تقرأ أكثر من 300-400 سطر في merge واحد إلا إذا كان ضروري قطعياً.

### السبب 2️⃣ — قراءة كل ملفات Phases في session واحد

❌ **خطأ:**
```
read_files([
  "prompts/v2/15_PHASE_1_*.md",
  "prompts/v2/15_PHASE_2_*.md",
  "prompts/v2/15_PHASE_3_*.md",  // كل phases في request واحد
  ...
])
```

✅ **صحيح:**
```
# اقرأ ملف الـ Worker index مرة واحدة:
read_files(["prompts/v2/15_WORKER_TYPOGRAPHY_SOUL.md"])

# ثم ملف الـ phase الحالي فقط:
read_files(["prompts/v2/15_PHASE_3_ARABIC_BODY.md"])
```

**القاعدة:** session واحد = phase واحد = ملف phase واحد فقط.

### السبب 3️⃣ — استخدام `read_files` بدل `grep_search`

❌ **خطأ:**
```
read_files(["platform/index.html"])  // للبحث عن كلمة معيّنة
```

✅ **صحيح:**
```
grep_search(query="bento", includePattern="platform/index.html")
```

**القاعدة:** للبحث استخدم grep. للقراءة استخدم نطاق سطور.

### السبب 4️⃣ — Steering files مرفوعة بـ inclusion: always

ملفات الـ steering تُحقَن في كل turn. لو فيك 5 ملفات × 4KB = 20K توكن في كل request.

✅ **الحل:**
- في Kiro Settings → Steering Files → غيّر inclusion إلى `manual`
- أو احذف ملفات steering القديمة بعد انتهاء Pack v1

### السبب 5️⃣ — ردود طويلة (>800 سطر)

كل ردّ يُحفَظ في الـ context. لو أنتجت 3 ردود × 800 سطر = ~50K توكن.

✅ **الحل:**
- التزم بـ ≤ 600 سطر لكل phase (قاعدة Pack v2)
- استخدم `fs_append` بدل تكرار محتوى الملف
- استخدم `str_replace` بدل rewrite

### السبب 6️⃣ — قراءة ملفات Pack v1 القديمة

محاولة قراءة `prompts/00_MASTER_PROMPT.md` + `prompts/14_*` = 30K+ توكن.

✅ **الحل:**
- لا تقرأ Pack v1 prompts إلا إذا تحتاج reference محدد
- استخدم `prompts/v2/COMPACT_MASTER_v2.md` بدلاً عن full master

### السبب 7️⃣ — `fs_write` بدل `str_replace`

كتابة ملف 1.2MB كاملاً عند تعديل صغير = انفجار.

✅ **الحل:**
- استخدم `str_replace` للتعديلات النقطية
- استخدم `fs_append` لإضافات في النهاية
- `fs_write` فقط للملفات الجديدة (مثل phase files في prompts/v2/)

---

## ✅ Checklist يومية (اعملها قبل كل session)

- [ ] Pack v2 phase واحد فقط لكل session
- [ ] ملف phase واحد مقروء (الـ index + phase الحالي)
- [ ] استخدم AUTO_PILOT v2 (يعرف القواعد دون تذكير)
- [ ] لا تقرأ platform/* ملف كامل — start_line + end_line
- [ ] لا تقرأ Pack v1 prompts إلا للضرورة
- [ ] استخدم grep_search للبحث، لا read_files
- [ ] الـ session ينتهي بعد phase واحد + 2-push
- [ ] لو وصلت 50% من context → اطبع SESSION CHECKPOINT وتوقف

---

## 📊 المقارنة قبل/بعد (Pack v2 specific)

| المعيار | بدون Fix v2 | مع Fix v2 |
|---|---|---|
| قراءة platform/index.html | 350K توكن | 8K (300 سطر فقط) |
| قراءة كل phase files | 80K توكن | 12K (واحد فقط) |
| Steering files (لو نشطة) | 20K توكن | 0 |
| Phase output | 800 سطر | ≤ 600 سطر |
| Sessions لكل Worker | 6+ | 1-2 |
| إجمالي العمل المنجز | ~30% | ~95% |

---

## 🚨 لو حصل context limit رغم الإجراءات

### السيناريو الأكثر شيوعاً (Pack v2)

أنت في منتصف Phase 3 من Worker 15، فجأة الـ AI يقول:
```
Context limit exceeded unexpectedly.
```

### الحل الفوري (3 دقائق):

1. **تحقق من آخر commit/push:**
   ```bash
   git log --oneline -5 worker-15-resonance
   ```

2. **لو آخر commit رسالته `phase 2 (resonance)` أو `state: resonance phase 2`** → الـ Phase 2 محفوظ بالكامل.

3. **افتح session جديد:**
   - الصق `prompts/v2/AUTO_PILOT_v2.md`
   - AI يقرأ `state/PROGRESS.json` → يجد `current.phase = 2`
   - يبدأ Phase 3 تلقائياً

4. **لو لم يُحفظ Phase 2 في الـ state:**
   - الصق `prompts/v2/00_MASTER_PROMPT_v2.md` + `prompts/v2/10_RESUME_PROTOCOL_v2.md`
   - ألصق آخر STATE_SNAPSHOT JSON
   - اكتب `استأنف Pack v2`

---

## 🧠 النصيحة الذهبية (Pack v2)

**Pack v2 يعتمد على craft، ليس على volume.**

في Pack v1 كنا نضيف 800 سطر لـ phase واحد (تتطلب context كبير).
في Pack v2، الـ phase الواحد يضيف 200-400 سطر **عالية الذوق** (typography refinement، motion choreography، content reorder).

**الجودة في الذوق المتأنّي، مو في الزخم.**

---

## 🎯 خصوصية Pack v2 — Strict Phase Budget

| Worker | Phase Budget الموصى به |
|---|---|
| Worker 15 (Typography) | 300-450 سطر/phase |
| Worker 16 (Vital UI) | 350-500 سطر/phase |
| Worker 17 (Content Revival) | 400-550 سطر/phase |
| Worker 18 (Learning Shell) | 250-400 سطر/phase |
| Worker 19 (Micro Polish) | 200-350 سطر/phase |

**الـ phase الذي يحتاج >600 سطر = phase مُصمَّم بشكل سيء → قسّمه لـ phase A و B.**

---

## 📱 إضافة لمستخدمي Kiro Mobile

على الجوّال، context budget أصغر. القواعد الإضافية:
- استخدم `COMPACT_MASTER_v2.md` بدل `00_MASTER_PROMPT_v2.md`
- اعمل على branch واحد، لا تستعرض branches أخرى في الـ session
- لا تطلب من Kiro يفتح ملفات archive/ أبداً
- بعد كل phase، اقفل الـ session بشكل طوعي وافتح جديد

(تفاصيل في `MOBILE_KIRO_v2.md`).

---

**نهاية Context Limit Fix v2.**

🔔 Resonance يحتاج تأنّي. التأنّي يحتاج context يكفي.
