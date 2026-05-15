# 🧠 State Directory — ذاكرة AI الدائمة

> هذا المجلد يحلّ مشكلة "كيف يعرف AI الجديد وين توقف الـ AI القديم؟" بدون ما تنسخ snapshots يدوياً.

---

## 📁 الملفات

### `PROGRESS.json` — الذاكرة المركزية
- `current.worker` — الـ Worker الحالي (مثل: `01-ui-ux`)
- `current.phase` — رقم الـ phase الحالي
- `current.branch` — الـ branch اللي يشتغل عليه AI
- `current.status` — `idle | in-progress | needs-review | blocked`
- `completed_phases[]` — كل الـ phases المنجزة بترتيب الزمن
- `next_action` — ما اللي يجب أن يحدث في الـ phase التالي

### `snapshots/<worker>-phase-<N>.json` — أرشيف
كل phase ينتهي = snapshot بصيغة JSON يُحفظ هنا. للرجوع التاريخي.

---

## 🤖 كيف يستخدمه AUTO_PILOT

عند بداية أي session:
1. AI يقرأ `state/PROGRESS.json` تلقائياً
2. يعرف بالضبط أين توقف
3. يكمل من Phase التالي بدون تدخل المستخدم
4. بعد كل phase يحدّث الملف + يعمل commit

**نتيجة:** المستخدم يكتب رسالة واحدة فقط (`continue`) ويحصل على دفعة كاملة من العمل.
