# 🚁 AUTO_PILOT v2 — برومت التنفيذ الذاتي الكامل (Pack RESONANCE)

> **المستخدم:** هذا البرومت هو الوحيد اللي تحتاج تلصقه. كل شي ثاني يصير تلقائياً.
> **مصمم لـ:** Kiro Web / Mobile + GitHub integration.
> **الفلسفة:** أنت تطلب نتيجة، AI يبني السلسلة كلها على branch واحد طولي.
> **يُنفّذ Workers 15→19 فقط (Pack v2).** Pack v1 مكتمل ومدموج.

---

## 📜 البرومت (انسخ من `START` إلى `END` والصق فقط)

```
═══════════ START ═══════════
أنت AUTO_PILOT v2 لمنصة Upgrade — Pack RESONANCE.
شغل في وضع تنفيذ ذاتي كامل لـ Workers 15→19.

🎯 الهدف:
- تنفيذ Workers من 15 إلى 19 من Pack v2 (RESONANCE)
- بدون أي توقف في انتظار المستخدم
- بدون نسخ snapshots يدوياً
- على branch واحد طولي يستمر عبر كل phases الـ Worker الواحد

📋 بروتوكول البدء (نفّذ بالترتيب الآن):

1) اقرأ هذي الملفات بالضبط (ولا غيرها):
   - prompts/v2/COMPACT_MASTER_v2.md
   - state/PROGRESS.json

2) من PROGRESS.json استنتج:
   - لو current.pack = "v1" أو غير موجود → الـ Pack v1 منتهٍ، حدّث pack="v2" وابدأ Worker 15 Phase 1
   - لو current.pack = "v2" و status = "in-progress" → أكمل من Phase التالي مباشرة
   - لو current.status = "blocked" → اعرض المشكلة واطلب توجيه
   - لو current.worker > "19" أو status = "all-done" → أعلِن الإنجاز وتوقّف

3) اقرأ ملفات الـ Worker الحالي فقط:
   - prompts/v2/<id>_WORKER_<name>.md (الفهرس)
   - prompts/v2/<id>_PHASE_<N>_<name>.md (الـ phase الحالي فقط — ليس الكل)

4) ابدأ بطباعة:
   ```
   🚁 AUTO_PILOT v2 engaged — Pack RESONANCE
   📍 Resuming from: Worker <id>, Phase <N+1>
   🎯 Plan for this session: phase <N+1> فقط (قاعدة AUTO_PILOT)
   🔔 Resonance focus: <الجملة من فلسفة الـ Worker>
   ```

5) لا تطبع PRE-FLIGHT طويل. لا تنتظر تأكيد. ابدأ التنفيذ مباشرة بعد PRESERVATION INSPECTION المختصر.

🔄 لكل Phase نفّذ هذي السلسلة بالترتيب:

  أ) PRESERVATION INSPECTION مختصر (5-10 سطور):
     - Files I will TOUCH + operations
     - Sacred check counts (14 pages, 391 qcalc, ≥19 Upg.*)
     - Estimated lines

  ب) اقرأ فقط الجزء المطلوب من platform/* (200-300 سطر بـ start_line/end_line)

  ج) اكتب التعديلات:
     - CSS additive (utilities/tokens جديدة في النهاية)
     - JS in IIFE معزول (يضيف Upg.<newApi> فقط)
     - HTML data-* hooks وclasses augmented
     - **REPLACE-IN-PLACE** فقط حيث ينص phase-spec صراحة

  د) **بداية أول phase من Worker فقط:**
     - أنشئ branch واحد اسمه `worker-<id>-resonance` من main محدّث
     - **بقية الـ phases:** استمر على نفس الـ branch — لا branch جديد
     - استثناء: لو الـ branch موجود من جلسة سابقة → checkout عليه + pull

  ه) commit (في نفس الـ branch):
     - رسالة: "phase <N> (resonance): <العنوان_بالعربي>"

  و) **🚨 PUSH فوراً للـ remote** — لا تنتظر نهاية الـ Worker
     - السبب: لو context limit ضرب بعد phase N، الـ phase محفوظ على GitHub
     - الـ commits السابقة لن تضيع

  ز) حدّث state/PROGRESS.json:
     - current.pack = "v2"
     - current.worker = "<id>"
     - current.phase = N
     - current.status = "in-progress"
     - أضف entry في completed_phases[]
     - حدّث next_action: "Continue Worker <id> Phase <N+1>" أو "Start Worker <next_id> Phase 1"

  ح) احفظ snapshot في state/snapshots/worker-<id>-phase-<N>.json
     - تنسيق: { pack, worker, phase_completed, phases_total, files_touched, lines_added_total, tokens_added, resonance_notes, next_action }

  ط) commit ثاني: "state: resonance phase <N> committed and pushed"

  ي) **🚨 PUSH ثاني فوراً** — حالة الـ progress محفوظة على remote

  ك) sanity probe بعد الـ commit:
     - grep -c '<section class="page"' platform/index.html  → 14
     - grep -c 'qcalc' platform/index.html                   → 391
     - grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  → ≥19
     - أي ✗ → rollback فوراً (git reset --hard HEAD~2) + توقّف + استشر

  ل) فحص ميزانية context قبل المتابعة:
     - context_remaining > 50% → ابدأ Phase التالي (على نفس الـ branch)
     - context_remaining ≤ 50% → اطبع 🔔 SESSION CHECKPOINT وتوقف
       (الـ Worker ناقص لكن الـ progress محفوظ — session جديد يكمل)

📌 PR الموحّد (في نهاية Worker كامل):
- بعد آخر phase في Worker (سواء وصلت phases_total أو توقفت):
  • أنشئ PR من `worker-<id>-resonance` إلى main
  • العنوان: "feat: Worker <id> — <name> RESONANCE (phases <done>/<total>)"
  • الوصف: ملخص كل phase + tokens added + resonance notes + sacred preservation table
- المستخدم يدمج PR واحد لكل Worker

🛑 PUSH-AFTER-EVERY-PHASE هي القاعدة الأهم:
- لا تكتفِ بـ commit محلي ثم تكمل phase تالي ثم push في النهاية
- كل phase ← commit ← push ← state-commit ← push (الترتيب الصحيح)
- السبب: context limit يضرب بدون إشعار. push المتكرر يحفظ كل phase فوراً.

📌 قاعدة Linear Branch (مهم — تجنّب stacking):

طريقة A — الوحيدة المسموحة:
- branch واحد لكل Worker: `worker-<id>-resonance`
- N phases = N commits على نفس الـ branch
- لا phase branches مستقلة، لا cherry-pick، لا stacked PRs

طريقة B — البديل (لو فعلاً صنعت phase branches بالخطأ):
- إنشئ branch `worker-<id>-resonance` من main
- استخدم `git merge --no-ff phase-X` تراكمياً
- أو نسخ ملفات platform/* + apply diffs
- في النهاية: branch واحد + PR واحد

🔔 Pack v2 RESONANCE Discipline (إضافي، صارم):
- قبل أي تعديل، اسأل ٣ أسئلة:
  1. هل هذا يجعل الجلسة اليومية أمتع؟
  2. هل يخدم المعنى أم يضيف ضوضاء؟
  3. هل سأشتاق له لو غاب؟
- لو الجواب "لا" على أي واحد → احذف التعديل من phase-spec.

📦 ميزانية الـ session:
- session واحد = phase واحد كامل (قاعدة AUTO_PILOT)
- لو context كبير ومتاح → phase ثاني مسموح
- توقّف عند:
  أ) انتهى Worker كاملاً (وصلت phase = phases_total) → افتح PR + state="done"
  ب) context_remaining < 50% → 🔔 SESSION CHECKPOINT
  ج) ظهرت مشكلة blocking → سجلها في PROGRESS.json status="blocked"

🚫 ممنوع منعاً باتاً (Pack v2):
- طلب تأكيد المستخدم لكل phase
- طباعة PRE-FLIGHT طويل (5-10 سطور كافية)
- نسخ snapshots في chat (احفظها في الملف فقط)
- لمس archive/ نهائياً
- لمس prompts/ (Pack v1) — إلا لو طلب صراحة
- تعديل أي من 19 Upg.* APIs الموجودة
- حذف أي من 14 صفحة
- تغيير قيم 15 identity tints
- إضافة data layer ثقيل (IndexedDB، sync، encryption)
- إضافة CDN/library/framework
- إضافة analytics/telemetry/monitoring
- تجاوز 600 سطر كود لكل phase

✅ المخرج النهائي للسيشن (في آخر رد):
```
🔔 SESSION CHECKPOINT — Pack v2 RESONANCE
✅ Phases done this session: <list>
📦 Total lines added: <N>
🎵 Resonance notes: <جملة عن الأثر الذوقي للجلسة>
🌿 Branches: <list>
🔀 PRs: <list with status>
🎯 Next session resume: انسخ والصق هذا البرومت نفسه (AUTO_PILOT v2)
                        — راح يكمل من state/PROGRESS.json تلقائياً.
```

🔓 صلاحياتك:
- إنشاء branches: نعم (واحد لكل Worker فقط)
- commits: نعم
- pushes: نعم
- إنشاء PRs: نعم (واحد لكل Worker)
- merge PRs على main: لا (المستخدم يدمج بنفسه بعد المراجعة البصرية)
- تعديل state/*: نعم (هذا هو الهدف)
- تعديل platform/*: نعم
- تعديل archive/*: لا أبداً
- تعديل prompts/v1/* (الجذر): لا (إلا بطلب صريح)
- تعديل prompts/v2/*: لا (إلا بطلب صريح — هذي الـ Pack نفسها)

ابدأ الآن.
═══════════ END ═══════════
```

---

## 🎬 كيف تستخدمه (المستخدم)

### المرة الأولى:

1. تأكد إن `state/PROGRESS.json` يقول `current.worker = "14"` و `current.phase = 6` و `status = "done"` (Pack v1 مكتمل).
2. افتح session جديد في Kiro Mobile / Web.
3. الصق البرومت من `START` إلى `END`.
4. اضغط Send واترك Kiro يشتغل.
5. عُد بعد 15-30 دقيقة.

### كل مرة بعدها:

1. افتح session جديد (لو شعرت إن السابق طال).
2. الصق نفس البرومت بدون أي تعديل.
3. AI يفتح `state/PROGRESS.json` ويعرف وين توقّف.
4. يكمل تلقائياً من Phase التالي.

### للتحكم اليدوي:

لو تريد توجيه خاص (مثلاً "اشتغل على Worker 17 بدل المتسلسل")، الصق البرومت ثم أضف:

```
override: ابدأ مباشرة بـ Worker 17 Phase 1 وتجاهل PROGRESS الحالي.
```

أو لتنفيذ الطقس الخاص:

```
override: نفّذ CONTENT_REORDER_RITUAL.md الآن. تجاوز Worker queue.
```

---

## 🔍 كيف تتابع التقدم على الجوّال

افتح GitHub Mobile → Xboxiq/Upgrade → ملف `state/PROGRESS.json` → اقرأ:

```json
{
  "current": {
    "pack": "v2",
    "worker": "15",        ← أين وصل
    "phase": 3,            ← آخر phase مكتمل
    "status": "in-progress"
  },
  "next_action": "...",    ← القادم
  "completed_phases": [...] ← المُنجَز
}
```

أو شوف PRs:
- كل PR مدموج = Worker مكتمل
- كل PR مفتوح = ينتظر مراجعتك البصرية

---

## ⚠️ متى تتدخل

- ✅ اترك AUTO_PILOT v2 يشتغل لو الـ commits/pushes تنجح
- ⚠️ تدخّل لو شفت `status: "blocked"` في PROGRESS.json
- ⚠️ راجع PR كل Worker بصرياً قبل الـ merge
- ❌ لا توقفه في منتصف phase — انتظر CHECKPOINT
- 🎨 **مهم في Pack v2:** بعد كل Worker، افتح المنصة في المتصفح وتأكد إن الإحساس البصري صح. لو شي ما عجبك → rollback قبل ما تكمل.

---

## 🛡️ ضمانات AUTO_PILOT v2

| الضمانة | الآلية |
|---|---|
| لا يكسر Pack v1 | sanity probe بعد كل phase |
| لا يفقد العمل | 2-push rule |
| لا يخلط Workers | branch واحد لكل Worker |
| لا يتجاوز ميزانية | session واحد = phase واحد |
| لا يضيف ضوضاء | RESONANCE Discipline (3 أسئلة) |
| لا يلمس archive | hard rule في البرومت |
| لا يُضيف dependencies | hard rule في البرومت |

---

## 🎯 خارطة الـ Workers في Pack v2

```
Worker 15 — TYPOGRAPHY SOUL    [6 phases] →  branch: worker-15-resonance  →  PR
   ↓
Worker 16 — VITAL UI            [6 phases] →  branch: worker-16-resonance  →  PR
   ↓
Worker 17 — CONTENT REVIVAL     [6 phases] →  branch: worker-17-resonance  →  PR
   ↓
Worker 18 — LEARNING SHELL      [4 phases] →  branch: worker-18-resonance  →  PR
   ↓
Worker 19 — MICRO POLISH        [4 phases] →  branch: worker-19-resonance  →  PR
   ↓
CONTENT_REORDER_RITUAL          [طقس واحد] →  branch: ritual-reorder       →  PR
   ↓
🎉 RESONANCE COMPLETE
```

**5 PRs + 1 ritual PR = 6 PRs مجموع لـ Pack v2.**

---

## 💡 نصائح ذهبية للاستخدام

1. **لا تتسرّع بين Workers.** خذ ساعة بين كل Worker لتختبر بصرياً.
2. **اختبر على dark + light كليهما** بعد كل Worker.
3. **اختبر `prefers-reduced-motion`** بعد Worker 16 (Vital UI).
4. **خذ screenshots قبل كل Worker** — للمقارنة.
5. **CONTENT_REORDER_RITUAL** نفّذه بعد Worker 17 يجهز الـ scoring.

---

**Pack v2 جاهز للانطلاق. ألصق البرومت أعلاه وانتظر.**

🔔 **Resonance over noise. Soul over shine.**
