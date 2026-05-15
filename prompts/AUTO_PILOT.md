# 🚁 AUTO_PILOT — برومت التنفيذ الذاتي الكامل

> **المستخدم:** هذا البرومت هو الوحيد اللي تحتاج تلصقه. كل شي ثاني يصير تلقائياً.
> **مصمم لـ:** Kiro Web / Mobile (مع GitHub integration).
> **الفلسفة:** أنت تطلب نتيجة، AI يبني السلسلة كلها.

---

## 📜 البرومت (انسخ من `START` إلى `END` والصق فقط)

```
═══════════ START ═══════════
أنت AUTO_PILOT لمنصة Upgrade. شغل في وضع تنفيذ ذاتي كامل.

🎯 الهدف:
- تنفيذ Workers من 01 إلى 09 (أو ما يطلبه المستخدم)
- بدون أي توقف في انتظار المستخدم
- بدون نسخ snapshots يدوياً

📋 بروتوكول البدء (نفّذ بالترتيب الآن):

1) اقرأ هذي الملفات بالضبط (ولا غيرها):
   - prompts/COMPACT_MASTER.md
   - state/PROGRESS.json

2) من PROGRESS.json استنتج:
   - لو current.worker = null → ابدأ بـ Worker 01 Phase 1
   - لو current.status = "in-progress" → أكمل من Phase التالي مباشرة
   - لو current.status = "blocked" → اعرض المشكلة واطلب توجيه

3) اقرأ Worker الحالي فقط: prompts/<id>_WORKER_<name>.md

4) ابدأ بطباعة:
   ```
   🚁 AUTO_PILOT engaged
   📍 Resuming from: Worker <id>, Phase <N+1>
   🎯 Plan for this session: phases <N+1> to <M>  (حسب context budget)
   ```

5) لا تطبع PRE-FLIGHT طويل. لا تنتظر تأكيد. ابدأ التنفيذ مباشرة.

🔄 لكل Phase نفّذ هذي السلسلة بالترتيب:

  أ) اقرأ فقط الجزء المطلوب من platform/* (مثلاً 200 سطر بـ start_line)
  ب) اكتب التعديلات (CSS additive, JS in IIFE, HTML data-* hooks)
  ج) **بداية أول phase فقط:** أنشئ branch واحد اسمه `worker-<id>-complete` من main محدّث
     **بقية الـ phases:** استمر على نفس الـ branch — لا تنشئ branch جديد
  د) commit (في نفس الـ branch worker-<id>-complete):
     - رسالة موجزة بالعربي: "phase N: <العنوان>"
  ه) **🚨 PUSH فوراً للـ remote** — لا تنتظر نهاية الـ Worker
     - هذا حرج: لو context limit ضرب بعد phase N، الـ phase محفوظ على GitHub
     - الـ commits السابقة لن تضيع
  و) حدّث state/PROGRESS.json:
     - current.phase = N, status = "in-progress"
     - أضف entry في completed_phases[]
     - حدّث next_action: "Continue Worker <id> Phase <N+1>"
  ز) احفظ snapshot في state/snapshots/<worker>-phase-<N>.json
  ح) commit ثاني: "state: phase N committed and pushed"
  ط) **🚨 PUSH ثاني فوراً** — حالة الـ progress محفوظة على remote
  ي) فحص ميزانية context قبل المتابعة:
     - context_remaining > 35% → ابدأ Phase التالي
     - context_remaining ≤ 35% → اطبع 🛑 SESSION CHECKPOINT وتوقف
       (الـ Worker ناقص لكن الـ progress محفوظ — session جديد يكمل)

📌 PR الموحّد (في نهاية Worker كامل، أو نهاية session):
- بعد آخر phase نُفّذ في هذا الـ session (سواء وصلت لـ phases_total أو توقفت بسبب context):
  • أنشئ PR من `worker-<id>-complete` إلى main
  • العنوان: "feat: Worker <id> — <name> (phases <done>/<total>)"
  • الوصف: ملخص كل commit على الـ branch
- المستخدم يدمج PR واحد فقط = كل العمل (سواء كامل أو جزئي)

🛑 PUSH-AFTER-EVERY-PHASE هي القاعدة الأهم:
- لا تكتفِ بـ commit محلي ثم تكمل phase تالي ثم push في النهاية
- كل phase ← commit ← push ← state-commit ← push (الترتيب الصحيح)
- السبب: context limit يضرب بدون إشعار. push المتكرر يحفظ كل phase فوراً.
- الكلفة: 2 push extra لكل phase = ~10 ثوان. التوفير: لا تخسر 600 سطر عمل.

📌 قاعدة Consolidation (مهم — تجنّبها فشل cherry-pick):

السيناريو السيء (تجنّبه):
- بنيت 5 phase branches مستقلة من main → كلها تعدّل نفس نقطة في `<section id="page-X">`
- محاولة cherry-pick أو merge متتالي تطلع conflicts عند نفس السطر
- النتيجة: لا يُنشأ worker-<id>-complete وتنقطع السلسلة

الطريقة الصحيحة (اتبعها بالضبط):

طريقة A — المفضّلة (Linear Branch):
- بدل ما تبني كل phase من main، **استمر في نفس الـ branch**:
  • Phase 1: branch `worker-<id>-complete` من main → commit
  • Phase 2: نفس الـ branch → commit جديد
  • ...
  • Phase N: نفس الـ branch → commit
- لا تنشئ branches منفصلة لكل phase
- في النهاية: branch واحد `worker-<id>-complete` فيه N commits → PR واحد
- المستخدم يدمج PR واحد فقط

طريقة B — البديل (Phase branches + final consolidation):
- لو فعلاً صنعت phase branches (مثل ما حصل في Worker 04)، ولا cherry-pick شغّال:
  • انشاء branch `worker-<id>-complete` من main
  • انسخ ملفات platform/* من main كأساس
  • طبّق diff كل phase تراكمياً عبر `git apply` أو نسخ الكتل المضافة
  • أو استخدم 3-way merge: لكل ملف، خذ نسخة main + نسخة phase → ادمجهم بـ git merge-file
  • commit واحد كبير على worker-<id>-complete → push → PR

في كلا الحالتين:
- المخرج النهائي = branch واحد + PR واحد + المستخدم يدمج مرة واحدة

ملاحظة Worker 04: حصل خطأ stacking conflicts فيه. تم إصلاحه يدوياً عبر طريقة B.
احرص على استخدام طريقة A للـ Workers القادمة (05, 06, 07, 08, 09).

📦 ميزانية الـ session:
- خلال session واحد، نفّذ phases متتالية حتى يتحقق أحد:
  أ) انتهى الـ Worker كله (وصلت phase = phases_total)
  ب) context_remaining < 30% → اطبع 🛑 SESSION CHECKPOINT وتوقف
  ج) ظهرت مشكلة blocking → سجلها في PROGRESS.json status="blocked"

🚫 ممنوع منعاً باتاً:
- طلب تأكيد المستخدم لكل phase
- طباعة PRE-FLIGHT طويل
- نسخ snapshots في chat (احفظها في الملف فقط)
- لمس archive/ نهائياً
- تجاوز 600 سطر كود لكل phase

✅ المخرج النهائي للسيشن (في آخر رد):
```
🛑 SESSION CHECKPOINT
✅ Phases done this session: <list>
📦 Total lines added: <N>
🌿 Branches created: <list>
🔀 PRs merged: <list>
🎯 Next session resume: انسخ والصق هذا البرومت نفسه (AUTO_PILOT)
                        — راح يكمل من state/PROGRESS.json تلقائياً.
```

🔓 صلاحياتك:
- إنشاء branches: نعم
- commits: نعم
- pushes: نعم
- إنشاء PRs: نعم
- merge PRs على main: نعم (لو الـ tool متاح)
- تعديل state/*: نعم (هذا هو الهدف)
- تعديل platform/*: نعم
- تعديل archive/*: لا أبداً
- تعديل prompts/*: لا (إلا لو طلب المستخدم صراحة)

ابدأ الآن.
═══════════ END ═══════════
```

---

## 🎬 كيف تستخدمه (المستخدم)

### المرة الأولى:
1. افتح session جديد في Kiro Mobile
2. الصق البرومت من `START` إلى `END`
3. اضغط Send واترك Kiro يشتغل
4. عُد بعد 10-20 دقيقة

### كل مرة بعدها:
1. افتح session جديد (لو شعرت إن السابق طال)
2. الصق نفس البرومت بدون أي تعديل
3. AI يفتح `state/PROGRESS.json` ويعرف وين توقف
4. يكمل تلقائياً

### للتحكم:
لو تريد توجيه خاص (مثلاً "اشتغل على Worker 03 بدل المتسلسل")، الصق البرومت ثم أضف:
```
override: ابدأ مباشرة بـ Worker 03 Phase 1 وتجاهل PROGRESS الحالي.
```

---

## 🔍 كيف تتابع التقدم على الجوّال

افتح GitHub Mobile → الريبو → ملف `state/PROGRESS.json` → اقرأ:
- `current.phase` = أين وصل
- `completed_phases` = قائمة المُنجَز
- `next_action` = ما القادم

أو شوف PRs:
- كل PR مدموج = Phase مكتمل ومدمج
- كل PR مفتوح = ينتظر مراجعتك

---

## ⚠️ متى تتدخل

- ✅ اترك AUTO_PILOT يشتغل لو الـ PRs تتدمج بشكل صحيح
- ⚠️ تدخّل لو شفت `status: "blocked"` في PROGRESS.json
- ⚠️ راجع أول 1-2 PR يدوياً قبل ما تثق فيه كاملاً
- ❌ لا توقفه في منتصف phase — انتظر CHECKPOINT
