# 🛡️ حل جذري لـ Context Limit Exceeded في Kiro Web

> اقرأ هذا الملف **مرة واحدة فقط** — هذي هي الإجابة الكاملة للسؤال "ليش يطلع لي context limit؟"

---

## 🎯 الفهم الصحيح للمشكلة

Context Limit = حدّ التوكنز (الكلمات المُمرَّرة للنموذج في الطلب الواحد). نموذج Claude/GPT يقبل عادة 200K توكن.

**كل ما تكتبه في الـ session يُجمَّع ويُرسَل في كل turn جديد:**
- النصوص اللي كتبتها أنت
- ردود الـ AI السابقة
- الملفات اللي قرأها (full content)
- مخرجات الأوامر
- **الـ Steering Files** ← السبب الخفي الأكبر
- **الـ Auto-included files** (skills, rules)

عند 200K → "Context limit exceeded".

---

## 🔥 السبب الأول لمشكلتك: Steering Files المرفوعة

عندك ملفات steering مرفوعة في Kiro:
- `global/01_WORKER_UI_UX.md` (6,201 حرف — مكرّر مرتين!)
- `00_MASTER_PROMPT.md` (13,922 حرف)

**كل turn جديد، Kiro يحقن هذا في system prompt تلقائياً قبل يصل سؤالك.**

يعني عند turn رقم 5، توكنز الـ steering وحدها تتراكم وتأكل ~30,000 توكن من الكوتة.

### الحل (افعله الآن):
1. في Kiro Web → القائمة الجانبية → **Settings** أو أيقونة steering
2. احذف كل الـ steering files أو غيّر `inclusion: auto/always` → `inclusion: manual`
3. أو أضف rule صريح: `inclusion: never_with_history`

---

## 🔥 السبب الثاني: ملف الـ HTML العملاق

ملف منصتك = **1.1 MB / 15,652 سطر**.

كل مرة الـ AI يفتح الملف للقراءة → يحمّل 350,000+ توكن من ملف واحد.

3 قراءات = 1,000,000 توكن = انفجار مؤكد.

### الحل: تشطير الملف لـ 3 ملفات
```
arabic-training-platform.html       (الهيكل فقط، ~80 KB)
assets/style.css                    (كل الستايل، ~400 KB)
assets/app.js                       (كل JS، ~600 KB)
```

بعد التشطير:
- لما تطلب من AI يضيف صفحة → يقرأ HTML فقط (80KB).
- لما يضيف animation → يقرأ CSS فقط.
- لما يضيف logic → يقرأ JS فقط.

**نفس التجربة للمستخدم النهائي. تغيّر جذري في استهلاك الـ context.**

طلب التشطير من Kiro:
> "شطّر ملف `arabic-training-platform-v12*.html` لثلاث ملفات (HTML، CSS، JS) بدون تغيير أي سلوك. تأكد إن الـ asset paths صحيحة، والـ IIFEs محتفظة بترتيبها، والـ `<style>` blocks المتفرقة كلها تُدمج في `assets/style.css`."

---

## 🔥 السبب الثالث: المحادثة طويلة بدون Compaction

كل ردّ AI طويل (مثلاً 800 سطر كود) يُحفظ في الـ history. بعد 5-6 ردود طويلة → context ممتلئ.

### الحل: Hard Sessions
- لا تعمل أكثر من **2-3 phases في session واحد**.
- بعد كل phase: انسخ الـ STATE_SNAPSHOT في ملف نصي.
- افتح session جديد + ألصق MASTER (المضغوط) + RESUME + Snapshot.

---

## 🔥 السبب الرابع: Tool outputs ضخمة

عند `read_files` لملف 1.1MB → كل المحتوى يدخل في الـ context.

### الحل:
- استخدم `start_line / end_line` (اقرأ 200 سطر فقط)
- استخدم `grep_search` بدل `read_files` لما تبحث عن شي
- اطلب: "اقرأ من السطر 5000 إلى 5200 فقط"

---

## ✅ Checklist يومية (اعملها قبل كل session)

- [ ] حذفت/عطّلت كل steering files
- [ ] الملف العملاق مشطّر لـ 3 ملفات
- [ ] استخدم MASTER المضغوط (`COMPACT_MASTER.md`) بدل الكامل
- [ ] خطّط لـ phases صغيرة (≤ 600 سطر/phase)
- [ ] بعد كل phase: انسخ STATE_SNAPSHOT يدوياً
- [ ] لما تشعر بالـ session طال → افتح session جديد + RESUME

---

## 📊 المقارنة قبل/بعد

| المعيار | قبل | بعد |
|---|---|---|
| Steering في كل turn | 20K توكن | 0 |
| قراءة الملف | 350K توكن | 30K (HTML فقط) |
| Phase واحدة | 800 سطر | 600 سطر |
| Sessions قبل الانفجار | 2-3 | 8-10 |
| إجمالي العمل المنجز | ~25% | ~95% |

---

## 🚨 لو حصل context limit رغم الإجراءات

1. **افتح session جديد فوراً** (لا تحاول تكمل في نفس الـ session)
2. ألصق `COMPACT_MASTER.md` فقط
3. ألصق `COMPACT_RESUME.md` مع آخر STATE_SNAPSHOT
4. اطلب phase **واحد** فقط
5. لو ما عندك snapshot → ألصق آخر 60 سطر من الكود وقل: "أعد بناء snapshot من الفحص"

---

## 🧠 النصيحة الذهبية

**لا تعتمد على الـ AI ليكتب لك 5,000 سطر في session واحد.**
عوضاً عن ذلك: 8 sessions × 600 سطر/session = 4,800 سطر منتظم بدون انفجار.

الجودة في **الإيقاع المنضبط**، مو في الزخم العشوائي.
