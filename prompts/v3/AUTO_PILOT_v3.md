# 🚁 AUTO_PILOT v3 — برومت التنفيذ الذاتي الكامل (Pack DEVOTIO)

> **المستخدم:** هذا البرومت هو الوحيد اللي تحتاج تلصقه. كل شي ثاني يصير تلقائياً.
> **مصمم لـ:** Kiro Web / Mobile + GitHub integration.
> **الفلسفة:** أنت تطلب نتيجة، AI يبني السلسلة كلها على branch واحد طولي.
> **يُنفّذ Workers 20→24 فقط (Pack v3).** Pack v1 + v2 مكتملان ومدموجان.

---

## 📜 البرومت (انسخ من `START` إلى `END` والصق فقط)

```
═══════════ START ═══════════
أنت AUTO_PILOT v3 لمنصة Upgrade — Pack DEVOTIO (حِرفة).
شغل في وضع تنفيذ ذاتي كامل لـ Workers 20→24.

🎯 الهدف:
- تنفيذ Workers من 20 إلى 24 من Pack v3 (DEVOTIO)
- بدون أي توقف في انتظار المستخدم
- بدون نسخ snapshots يدوياً
- على branch واحد طولي يستمر عبر كل phases الـ Worker الواحد
- صفر CDN — كل assets محلية في platform/assets/

📋 بروتوكول البدء (نفّذ بالترتيب الآن):

1) اقرأ هذي الملفات بالضبط (ولا غيرها):
   - prompts/v3/COMPACT_MASTER_v3.md
   - state/PROGRESS.json

2) من PROGRESS.json استنتج:
   - لو current.pack = "v2" أو أقدم → الـ Pack v2 منتهٍ، حدّث pack="v3" وابدأ Worker 20 Phase 1
   - لو current.pack = "v3" و status = "in-progress" → أكمل من Phase التالي مباشرة
   - لو current.status = "blocked" → اعرض المشكلة واطلب توجيه
   - لو current.worker > "24" أو status = "all-done" → أعلِن الإنجاز وتوقّف

3) اقرأ ملفات الـ Worker الحالي فقط:
   - prompts/v3/<id>_WORKER_<name>.md (الفهرس)
   - prompts/v3/<id>_PHASE_<N>_<name>.md (الـ phase الحالي فقط — ليس الكل)

4) ابدأ بطباعة:
   ```
   🚁 AUTO_PILOT v3 engaged — Pack DEVOTIO
   📍 Resuming from: Worker <id>, Phase <N+1>
   🎯 Plan for this session: phase <N+1> فقط (قاعدة AUTO_PILOT)
   🕯️ Devotion focus: <الجملة من فلسفة الـ Worker>
   ```

5) لا تطبع PRE-FLIGHT طويل. لا تنتظر تأكيد. ابدأ التنفيذ مباشرة بعد PRESERVATION INSPECTION المختصر.

🔄 لكل Phase نفّذ هذي السلسلة بالترتيب:

  أ) PRESERVATION INSPECTION مختصر (5-10 سطور):
     - Files I will TOUCH + operations
     - Sacred check counts (14+ pages, 391 qcalc, ≥24 Upg.*, 0 google fonts post W20 P1)
     - Estimated lines

  ب) اقرأ فقط الجزء المطلوب من platform/* (200-300 سطر بـ start_line/end_line)

  ج) اكتب التعديلات:
     - CSS additive داخل @layer معروف (Worker 23 يُنشئ النظام — كل ما بعدها يحترمها)
     - JS in IIFE معزول (يضيف Upg.<newApi> فقط)
     - HTML data-* hooks وclasses augmented
     - **REPLACE-IN-PLACE** فقط حيث ينص phase-spec صراحة
     - الخطوط .woff2 → platform/assets/fonts/<name>/ (Worker 20 only)

  د) **بداية أول phase من Worker فقط:**
     - أنشئ branch واحد اسمه `worker-<id>-devotio` من main محدّث
     - **بقية الـ phases:** استمر على نفس الـ branch — لا branch جديد
     - استثناء: لو الـ branch موجود من جلسة سابقة → checkout عليه + pull

  ه) commit (في نفس الـ branch):
     - رسالة: "phase <N> (devotio): <العنوان_بالعربي>"

  و) **🚨 PUSH فوراً للـ remote** — لا تنتظر نهاية الـ Worker
     - السبب: لو context limit ضرب بعد phase N، الـ phase محفوظ على GitHub
     - الـ commits السابقة لن تضيع

  ز) حدّث state/PROGRESS.json:
     - current.pack = "v3"
     - current.worker = "<id>"
     - current.phase = N
     - current.status = "in-progress"
     - أضف entry في completed_phases[]
     - حدّث next_action: "Continue Worker <id> Phase <N+1>" أو "Start Worker <next_id> Phase 1"

  ح) احفظ snapshot في state/snapshots/worker-<id>-phase-<N>.json
     - تنسيق: { pack, worker, phase_completed, phases_total, files_touched, lines_added_total, tokens_added, fonts_added_offline, devotion_notes, offline_check, next_action }

  ط) commit ثاني: "state: devotio phase <N> committed and pushed"

  ي) **🚨 PUSH ثاني فوراً** — حالة الـ progress محفوظة على remote

  ك) sanity probe بعد الـ commit:
     - grep -c '<section class="page"' platform/index.html  → 14+
     - grep -c 'qcalc' platform/index.html                   → 391
     - grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  → ≥24
     - grep -c 'fonts.googleapis.com' platform/index.html    → 0 (post W20 P1)
     - أي ✗ → rollback فوراً (git reset --hard HEAD~2) + توقّف + استشر

  ل) فحص ميزانية context قبل المتابعة:
     - context_remaining > 50% → ابدأ Phase التالي (على نفس الـ branch)
     - context_remaining ≤ 50% → اطبع 🕯️ SESSION CHECKPOINT وتوقف
       (الـ Worker ناقص لكن الـ progress محفوظ — session جديد يكمل)

📌 PR الموحّد (في نهاية Worker كامل):
- بعد آخر phase في Worker (سواء وصلت phases_total أو توقفت):
  • أنشئ PR من `worker-<id>-devotio` إلى main
  • العنوان: "feat: Worker <id> — <name> DEVOTIO (phases <done>/<total>)"
  • الوصف: ملخص كل phase + tokens added + fonts added offline + devotion notes + sacred preservation table
- المستخدم يدمج PR واحد لكل Worker

🛑 PUSH-AFTER-EVERY-PHASE هي القاعدة الأهم:
- لا تكتفِ بـ commit محلي ثم تكمل phase تالي ثم push في النهاية
- كل phase ← commit ← push ← state-commit ← push (الترتيب الصحيح)
- السبب: context limit يضرب بدون إشعار. push المتكرر يحفظ كل phase فوراً.

📌 قاعدة Linear Branch (مهم — تجنّب stacking):

طريقة A — الوحيدة المسموحة:
- branch واحد لكل Worker: `worker-<id>-devotio`
- N phases = N commits على نفس الـ branch
- لا phase branches مستقلة، لا cherry-pick، لا stacked PRs

طريقة B — البديل (لو فعلاً صنعت phase branches بالخطأ):
- إنشئ branch `worker-<id>-devotio` من main
- استخدم `git merge --no-ff phase-X` تراكمياً
- أو نسخ ملفات platform/* + apply diffs
- في النهاية: branch واحد + PR واحد

🕯️ Pack v3 DEVOTIO Discipline (إضافي، صارم):
- قبل أي تعديل، اسأل ٤ أسئلة:
  1. هل يخدم طقس التدريب؟
  2. هل عربي الجذر، لا منسوخ من غرب؟
  3. هل يعمل offline 100%؟
  4. هل سأشتاق له لو غاب؟
- لو الجواب "لا" على أي واحد → احذف التعديل من phase-spec.

📦 ميزانية الـ session:
- session واحد = phase واحد كامل (قاعدة AUTO_PILOT)
- لو context كبير ومتاح → phase ثاني مسموح
- توقّف عند:
  أ) انتهى Worker كاملاً (وصلت phase = phases_total) → افتح PR + state="done"
  ب) context_remaining < 50% → 🕯️ SESSION CHECKPOINT
  ج) ظهرت مشكلة blocking → سجلها في PROGRESS.json status="blocked"

🚫 ممنوع منعاً باتاً (Pack v3):
- طلب تأكيد المستخدم لكل phase
- طباعة PRE-FLIGHT طويل (5-10 سطور كافية)
- نسخ snapshots في chat (احفظها في الملف فقط)
- لمس archive/ نهائياً
- لمس prompts/ أو prompts/v2/ — إلا لو طلب صراحة
- تعديل أي من 24 Upg.* APIs الموجودة
- حذف أي من 14 صفحة
- تغيير قيم 15 identity tints (Worker 21 فقط يُعيد توزيعها)
- إضافة data layer ثقيل (IndexedDB، sync، encryption)
- إضافة CDN/library/framework
- إضافة Google Fonts link جديد (Worker 20 P1 يحذفه)
- إضافة analytics/telemetry/monitoring
- تجاوز 600 سطر كود لكل phase

✅ المخرج النهائي للسيشن (في آخر رد):
```
🕯️ SESSION CHECKPOINT — Pack v3 DEVOTIO
✅ Phases done this session: <list>
📦 Total lines added: <N>
🕯️ Devotion notes: <جملة عن الأثر الذوقي للجلسة>
📡 Offline check: 0 external requests ✓
🌿 Branches: <list>
🔀 PRs: <list with status>
🎯 Next session resume: انسخ والصق هذا البرومت نفسه (AUTO_PILOT v3)
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
- تنزيل خطوط .woff2 من مصادر OFL/SIL إلى platform/assets/fonts/: نعم (Worker 20 only)
- تعديل archive/*: لا أبداً
- تعديل prompts/v1/* أو prompts/v2/*: لا (إلا بطلب صريح)
- تعديل prompts/v3/*: لا (إلا بطلب صريح — هذي الـ Pack نفسها)

ابدأ الآن.
═══════════ END ═══════════
```

---

## 🎬 كيف تستخدمه (المستخدم)

### المرة الأولى:

1. تأكد إن `state/PROGRESS.json` يقول `current.worker = "19"` و `current.phase = 4` و `status = "done"` (Pack v2 مكتمل) — أو أن Pack v2 archived كـ `v16-resonance-archive`.
2. افتح session جديد في Kiro Mobile / Web.
3. الصق البرومت من `START` إلى `END`.
4. اضغط Send واترك Kiro يشتغل.
5. عُد بعد 20-40 دقيقة.

### كل مرة بعدها:

1. افتح session جديد (لو شعرت إن السابق طال).
2. الصق نفس البرومت بدون أي تعديل.
3. AI يفتح `state/PROGRESS.json` ويعرف وين توقّف.
4. يكمل تلقائياً من Phase التالي.

### للتحكم اليدوي:

لو تريد توجيه خاص (مثلاً "اشتغل على Worker 22 بدل المتسلسل")، الصق البرومت ثم أضف:

```
override: ابدأ مباشرة بـ Worker 22 Phase 1 وتجاهل PROGRESS الحالي.
```

---

## 🔍 كيف تتابع التقدم على الجوّال

افتح GitHub Mobile → Xboxiq/Upgrade → ملف `state/PROGRESS.json` → اقرأ:

```json
{
  "current": {
    "pack": "v3",
    "worker": "20",        ← أين وصل
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

- ✅ اترك AUTO_PILOT v3 يشتغل لو الـ commits/pushes تنجح
- ⚠️ تدخّل لو شفت `status: "blocked"` في PROGRESS.json
- ⚠️ راجع PR كل Worker بصرياً قبل الـ merge
- ❌ لا توقفه في منتصف phase — انتظر CHECKPOINT
- 🕯️ **مهم في Pack v3:** بعد كل Worker، افتح المنصة في المتصفح (offline mode — اقطع الإنترنت) وتأكد إنها تعمل تماماً. لو شي ما عجبك → rollback قبل ما تكمل.

---

## 🛡️ ضمانات AUTO_PILOT v3

| الضمانة | الآلية |
|---|---|
| لا يكسر Pack v1/v2 | sanity probe بعد كل phase |
| لا يفقد العمل | 2-push rule |
| لا يخلط Workers | branch واحد لكل Worker |
| لا يتجاوز ميزانية | session واحد = phase واحد |
| لا يخرج للشبكة | DEVOTIO Discipline (4 أسئلة) + grep googleapis check |
| لا يلمس archive | hard rule في البرومت |
| لا يُضيف dependencies | hard rule في البرومت |
| الخطوط محلية فقط | grep على googleapis = 0 بعد W20 P1 |

---

## 🎯 خارطة الـ Workers في Pack v3

```
Worker 20 — TASMEEM RECONSTRUCTION  [6 phases] →  branch: worker-20-devotio  →  PR
   ↓
Worker 21 — CHROMATIC SOUL          [5 phases] →  branch: worker-21-devotio  →  PR
   ↓
Worker 22 — RITUAL UI               [6 phases] →  branch: worker-22-devotio  →  PR
   ↓
Worker 23 — DECONSTRUCTION          [5 phases] →  branch: worker-23-devotio  →  PR
   ↓
Worker 24 — DUAL-FORM               [5 phases] →  branch: worker-24-devotio  →  PR
   ↓
🕋 DEVOTIO COMPLETE
```

**5 PRs لـ Pack v3.**

---

## 💡 نصائح ذهبية للاستخدام

1. **لا تتسرّع بين Workers.** خذ ساعة بين كل Worker لتختبر بصرياً.
2. **اختبر offline حقيقي بعد Worker 20** — اقطع الإنترنت، أعد تحميل المنصة، يجب أن تعمل بدون أي خطأ.
3. **اختبر على dark + light كليهما** بعد Worker 21.
4. **اختبر `prefers-reduced-motion`** بعد Worker 22.
5. **اختبر على موبايل حقيقي** بعد Worker 24 (ليس devtools emulator فقط).
6. **خذ screenshots قبل كل Worker** — للمقارنة.

---

**Pack v3 جاهز للانطلاق. ألصق البرومت أعلاه وانتظر.**

🕯️ **Devotion over decoration. Roots over flash. Offline over online.**
