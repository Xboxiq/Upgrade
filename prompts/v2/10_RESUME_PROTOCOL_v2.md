# 🔄 RESUME PROTOCOL v2 — برومت استئناف Pack RESONANCE

> **متى تستخدمه:** عندما يتوقف الـ AI في منتصف Worker من Pack v2 (Context limit, نهاية session, خطأ شبكة) وتفتح **session جديد**.

---

## 📥 خطوات استخدامك (المستخدم)

1. **افتح session جديد** في Kiro / Claude / GPT.
2. **ألصق `00_MASTER_PROMPT_v2.md`** أولاً.
3. **ألصق هذا البرومت (RESUME PROTOCOL v2)** ثانياً.
4. **ألصق آخر `STATE_SNAPSHOT` JSON** الذي طبعه الـ AI قبل التوقف (أو أحرى: AUTO_PILOT v2 سيقرأه من الريبو تلقائياً).
5. **(اختياري)** ألصق آخر 80-120 سطر من الكود الذي أنتج، حتى يفهم السياق المباشر.
6. اكتب: `استأنف Pack v2`.

---

## 🤖 برومت الاستئناف (انسخه أنت)

```
أنت في وضع RESUME — Pack v2 RESONANCE.
أنا أستأنف عملاً سابقاً على منصة Upgrade (Cathedral v16 baseline).
MASTER PROMPT v2 محمَّل بالأعلى — لا تخالف قواعده.

المعطيات:

1) STATE_SNAPSHOT الأخير (Pack v2 schema):
<ألصق هنا الـ JSON>

2) آخر مقتطف من الكود (لمحاذاة السياق):
<ألصق آخر 100 سطر — اختياري>

3) الملاحظات الإضافية إن وُجدت:
<مثلاً: "اكتشفت bug بصري في X" أو "غيّرت رأيي بخصوص Y">

تعليمات لك:
─ افحص state/PROGRESS.json لتأكيد current.pack="v2" و current.worker و current.phase.
─ لا تعد العمل المُنجَز — ابدأ من Phase التالي مباشرة.
─ افحص أن open_threads كلها مغلقة قبل التقدم. إذا كان هناك thread مفتوح غير محلول، عالجه أولاً.
─ ابدأ ردك بـ:
   ▶️ RESUMING — Pack v2 Worker: <id> from Phase <x+1>
   📌 Verified state: <ملخص ما تأكدت منه>
   🎯 Now proceeding with: <اسم Phase>
   🔔 Resonance focus: <الجملة من فلسفة الـ Worker>
─ اعمل في حدود ≤ 600 سطر للـ phase الواحد.
─ استمر على نفس الـ branch `worker-<id>-resonance` (لا branch جديد).
─ اختم بـ CHECKPOINT + STATE_SNAPSHOT جديد + 2-push rule.

ابدأ الآن.
```

---

## 🛟 حالات خاصة للاستئناف (Pack v2)

### الحالة 1: الـ STATE_SNAPSHOT ضائع

```
لقد فقدت آخر STATE_SNAPSHOT لـ Pack v2. ساعدني في إعادة بناء السياق.
سأعطيك:
- اسم الـ Worker الذي كنا نعمل عليه: <مثلاً: 15 — TYPOGRAPHY SOUL>
- آخر phase أتذكر إنه اكتمل: <رقم تقريبي>

افحص الملفات:
1) git log --oneline -20 على الـ branch worker-<id>-resonance
2) state/snapshots/ — أحدث ملف لـ Worker <id>
3) state/PROGRESS.json — قراءة current.phase
4) grep على tokens المضافة في style.css لتأكيد ما تم فعلياً

أعطني snapshot مُعاد بناؤه + اقترح Phase التالي.
```

### الحالة 2: الكود ينقصه أجزاء (تم قطعه في الوسط)

```
آخر كتلة CSS/JS أنتجتها قُطعت في منتصفها. الجزء المكتمل:
<ألصق الجزء>

أكمل **فقط** هذه الكتلة من حيث توقفت — لا تعيد كتابة الجزء الموجود.
بعد الانتهاء، تابع الـ phase الحالي.
```

### الحالة 3: regression بصري بعد phase

```
بعد تنفيذ phase <N>، لاحظت regression بصري:
- المشكلة: <وصف>
- الصفحة المتأثرة: <اسم>

قبل الاستمرار:
1) افحص الـ commit الأخير على worker-<id>-resonance
2) شخّص السبب (likely culprit + 2 alternatives)
3) قدّم خياراتي:
   - rollback الـ commit (git reset --hard HEAD~2)
   - patch fix على نفس الـ branch
   - skip + توثيق tech debt في snapshot
4) انتظر تأكيدي.
```

### الحالة 4: تضارب بين Workers

```
اكتشفت تضارب محتمل في Pack v2:
- Worker السابق <id>: <ما عمل>
- Worker الحالي <id>: <ما يحاول أن يعمل>
- نقطة التضارب: <واضحة>

قبل الاستمرار:
1) حلّل التضارب
2) اقترح حلاً (دمج tokens / فصل classes / تقديم Worker على آخر)
3) انتظر تأكيدي
```

### الحالة 5: branch ضائع / مدموج

```
الـ branch worker-<id>-resonance ضائع أو مدموج بالفعل.
1) افحص: هل PR <id> مدموج في main؟
2) لو نعم → نحن في Phase أبعد مما اعتقدت. حدّث PROGRESS.json + ابدأ Worker التالي.
3) لو لا → أنشئ branch جديد من main + استرجع آخر snapshot + استمر.
```

---

## 🧬 STATE_SNAPSHOT v2 Schema (للمرجع)

```json
{
  "pack": "v2",
  "worker": "15-typography-soul",
  "phase_completed": 3,
  "phases_total": 6,
  "files_touched": ["platform/assets/style.css", "platform/index.html"],
  "lines_added_total": 1400,
  "next_action": "Phase 4 — Latin & Numeric layer",
  "tokens_added": ["--font-display-2", "--font-numeric-2", "--type-page-psych"],
  "voice_bindings_added": [".h-quote", ".u-num-tabular", ".type-eyebrow"],
  "resonance_notes": "صفحة psych أصبحت تتنفّس بـ Aref Ruqaa في eyebrows. Cairo بقي fallback.",
  "open_threads": [],
  "regression_risk": "low",
  "sacred_preservation_check": {
    "page_sections": 14,
    "qcalc_instances": 391,
    "upg_apis": 19,
    "console_errors": 0
  },
  "next_worker_recommended": null,
  "branch": "worker-15-resonance",
  "last_commit_sha": "abc1234"
}
```

---

## 💡 ممارسات تمنع الانقطاع من الأساس

1. **استخدم `AUTO_PILOT_v2.md`** بدلاً من Manual mode — يحفظ snapshots آلياً.
2. **اعمل على phase واحد في session**. لا تطمع.
3. **لا تطلب أكثر من 600 سطر** في phase واحد.
4. **2-push rule** بعد كل phase = code commit + push + state commit + push.
5. **اختبر بصرياً بعد كل phase** قبل ما تتقدّم.
6. **لو شعرت بالـ session طوّل** — افتح session جديد طوعياً قبل ما يقطع.

---

## 🆘 إذا انقطع المساعد بدون snapshot نهائي

الخطة B:
1. افحص آخر commit على branch `worker-<id>-resonance`:
   ```bash
   git log --oneline -10 worker-<id>-resonance
   ```
2. لو آخر commit رسالته `phase N` → الـ phase N محفوظ. ابدأ من N+1.
3. لو آخر commit رسالته `state: phase N` → الـ phase N + state محفوظ. ابدأ من N+1 بثقة.
4. لو آخر commit رسالته `phase N (atelier)` → خلط مع Pack v1. حدّد إذا كنت تريد الاستمرار في Pack v2.

ألصق المعلومات في session جديد + المعالج الذكي يبني snapshot من الـ git history.

---

## 🔁 الفرق بين Resume v1 و Resume v2

| البُعد | Resume v1 | Resume v2 |
|---|---|---|
| Pack flag | غير موجود | `pack: "v2"` إجباري |
| Branch naming | `worker-XX-complete` | `worker-XX-resonance` |
| Snapshot fields | basic | يضيف `tokens_added`, `voice_bindings_added`, `resonance_notes` |
| Sanity check | manual | `sacred_preservation_check` block إجباري |
| Phase budget | ≤ 800 سطر | ≤ 600 سطر |
| Push rule | 1-push | 2-push (code + state) |

---

**نهاية Resume Protocol v2.**

🔔 Resonance over noise.
