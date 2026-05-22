# 🔄 RESUME PROTOCOL v3 — برومت استئناف Pack DEVOTIO

> **متى تستخدمه:** عندما يتوقف الـ AI في منتصف Worker من Pack v3 (Context limit, نهاية session, خطأ شبكة) وتفتح **session جديد**.

---

## 📥 خطوات استخدامك (المستخدم)

1. **افتح session جديد** في Kiro / Claude / GPT.
2. **ألصق `00_MASTER_PROMPT_v3.md`** أولاً.
3. **ألصق هذا البرومت (RESUME PROTOCOL v3)** ثانياً.
4. **ألصق آخر `STATE_SNAPSHOT` JSON** الذي طبعه الـ AI قبل التوقف (أو أحرى: AUTO_PILOT v3 سيقرأه من الريبو تلقائياً).
5. **(اختياري)** ألصق آخر 80-120 سطر من الكود الذي أنتج، حتى يفهم السياق المباشر.
6. اكتب: `استأنف Pack v3`.

---

## 🤖 برومت الاستئناف (انسخه أنت)

```
أنت في وضع RESUME — Pack v3 DEVOTIO.
أنا أستأنف عملاً سابقاً على منصة Upgrade (Cathedral v16 + Resonance v2 baseline).
MASTER PROMPT v3 محمَّل بالأعلى — لا تخالف قواعده.

المعطيات:

1) STATE_SNAPSHOT الأخير (Pack v3 schema):
<ألصق هنا الـ JSON>

2) آخر مقتطف من الكود (لمحاذاة السياق):
<ألصق آخر 100 سطر — اختياري>

3) الملاحظات الإضافية إن وُجدت:
<مثلاً: "اكتشفت bug بصري في X" أو "غيّرت رأيي بخصوص Y">

تعليمات لك:
─ افحص state/PROGRESS.json لتأكيد current.pack="v3" و current.worker و current.phase.
─ لا تعد العمل المُنجَز — ابدأ من Phase التالي مباشرة.
─ افحص أن open_threads كلها مغلقة قبل التقدم. إذا كان هناك thread مفتوح غير محلول، عالجه أولاً.
─ افحص offline_check.external_requests = 0 قبل المتابعة. لو ظهر >0 → rollback فوراً.
─ ابدأ ردك بـ:
   ▶️ RESUMING — Pack v3 Worker: <id> from Phase <x+1>
   📌 Verified state: <ملخص ما تأكدت منه>
   🎯 Now proceeding with: <اسم Phase>
   🕯️ Devotion focus: <الجملة من فلسفة الـ Worker>
   📡 Offline check: 0 external requests verified
─ اعمل في حدود ≤ 600 سطر للـ phase الواحد.
─ استمر على نفس الـ branch `worker-<id>-devotio` (لا branch جديد).
─ اختم بـ CHECKPOINT + STATE_SNAPSHOT جديد + 2-push rule.

ابدأ الآن.
```

---

## 🛟 حالات خاصة للاستئناف (Pack v3)

### الحالة 1: الـ STATE_SNAPSHOT ضائع

```
لقد فقدت آخر STATE_SNAPSHOT لـ Pack v3. ساعدني في إعادة بناء السياق.
سأعطيك:
- اسم الـ Worker الذي كنا نعمل عليه: <مثلاً: 20 — TASMEEM RECONSTRUCTION>
- آخر phase أتذكر إنه اكتمل: <رقم تقريبي>

افحص الملفات:
1) git log --oneline -20 على الـ branch worker-<id>-devotio
2) state/snapshots/ — أحدث ملف لـ Worker <id>
3) state/PROGRESS.json — قراءة current.phase
4) grep على tokens المضافة في style.css لتأكيد ما تم فعلياً
5) ls platform/assets/fonts/ — تأكيد الخطوط المحلية المنزّلة

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
1) افحص الـ commit الأخير على worker-<id>-devotio
2) شخّص السبب (likely culprit + 2 alternatives)
3) قدّم خياراتي:
   - rollback الـ commit (git reset --hard HEAD~2)
   - patch fix على نفس الـ branch
   - skip + توثيق tech debt في snapshot
4) انتظر تأكيدي.
```

### الحالة 4: تضارب بين Workers

```
اكتشفت تضارب محتمل في Pack v3:
- Worker السابق <id>: <ما عمل>
- Worker الحالي <id>: <ما يحاول أن يعمل>
- نقطة التضارب: <واضحة>

قبل الاستمرار:
1) حلّل التضارب (خاصة بين Worker 20 typography و Worker 23 @layer)
2) اقترح حلاً (دمج tokens / فصل classes / تقديم Worker على آخر)
3) انتظر تأكيدي
```

### الحالة 5: branch ضائع / مدموج

```
الـ branch worker-<id>-devotio ضائع أو مدموج بالفعل.
1) افحص: هل PR <id> مدموج في main؟
2) لو نعم → نحن في Phase أبعد مما اعتقدت. حدّث PROGRESS.json + ابدأ Worker التالي.
3) لو لا → أنشئ branch جديد من main + استرجع آخر snapshot + استمر.
```

### الحالة 6: خط .woff2 ناقص أو معطوب (Worker 20 only)

```
خط محلي تم تنزيله في phase سابق لكنه ناقص أو معطوب:
- اسم الخط: <مثلاً: aref-ruqaa-700.woff2>
- الحجم الحالي: <bytes>

قبل الاستمرار:
1) افحص platform/assets/fonts/<font>/ - هل الـ subset كامل؟
2) لو الحجم < 30KB أو ملف فارغ → أعد التنزيل من المصدر OFL (Worker 20 P2 spec)
3) لو الحجم كبير >300KB → الـ subset لم يُطبَّق، أعد subset عبر pyftsubset
4) تأكد من checksum في snapshot
```

### الحالة 7: تسرّب CDN بالخطأ

```
اكتشفت CDN reference في الكود:
- موقع: <line في index.html أو style.css>
- المحتوى: <مثلاً: googleapis.com/css2?family=...>

هذا انتهاك خطير لقاعدة Pack v3 (offline-first):
1) افحص متى أُضيف (git blame)
2) احذفه فوراً
3) تأكد إن الخط البديل موجود في platform/assets/fonts/
4) أعد commit برسالة "fix: remove CDN leak — restore offline guarantee"
```

---

## 🧬 STATE_SNAPSHOT v3 Schema (للمرجع)

```json
{
  "pack": "v3",
  "worker": "20-tasmeem-reconstruction",
  "phase_completed": 3,
  "phases_total": 6,
  "files_touched": [
    "platform/assets/style.css",
    "platform/index.html",
    "platform/assets/fonts/aref-ruqaa/aref-ruqaa-700.woff2",
    "platform/assets/fonts/ibm-plex-arabic/ibm-plex-arabic-400.woff2"
  ],
  "lines_added_total": 1400,
  "next_action": "Phase 4 — Numeric Discipline",
  "tokens_added": [
    "--font-display-local",
    "--type-voice-hero-arabic",
    "--font-numeric-tabular-local"
  ],
  "fonts_added_offline": [
    "aref-ruqaa-700",
    "ibm-plex-arabic-400",
    "ibm-plex-arabic-600",
    "tajawal-500"
  ],
  "voice_bindings_added": [".tas-voice-hero", ".tas-voice-display"],
  "devotion_notes": "صفحة psych صارت تتنفّس بـ Aref Ruqaa محلي. صفر مكالمات شبكة.",
  "open_threads": [],
  "regression_risk": "low",
  "offline_check": {
    "external_requests": 0,
    "google_fonts_links": 0,
    "fetch_calls_to_external": 0,
    "preconnect_links": 0
  },
  "sacred_preservation_check": {
    "page_sections": 14,
    "qcalc_instances": 391,
    "upg_apis": 24,
    "console_errors": 0,
    "important_count": 221
  },
  "next_worker_recommended": null,
  "branch": "worker-20-devotio",
  "last_commit_sha": "abc1234"
}
```

---

## 💡 ممارسات تمنع الانقطاع من الأساس

1. **استخدم `AUTO_PILOT_v3.md`** بدلاً من Manual mode — يحفظ snapshots آلياً.
2. **اعمل على phase واحد في session**. لا تطمع.
3. **لا تطلب أكثر من 600 سطر** في phase واحد.
4. **2-push rule** بعد كل phase = code commit + push + state commit + push.
5. **اختبر بصرياً + offline بعد كل phase** قبل ما تتقدّم.
6. **لو شعرت بالـ session طوّل** — افتح session جديد طوعياً قبل ما يقطع.

---

## 🆘 إذا انقطع المساعد بدون snapshot نهائي

الخطة B:
1. افحص آخر commit على branch `worker-<id>-devotio`:
   ```bash
   git log --oneline -10 worker-<id>-devotio
   ```
2. لو آخر commit رسالته `phase N (devotio)` → الـ phase N محفوظ. ابدأ من N+1.
3. لو آخر commit رسالته `state: devotio phase N` → الـ phase N + state محفوظ. ابدأ من N+1 بثقة.
4. لو آخر commit رسالته `phase N (resonance)` → خلط مع Pack v2. حدّد إذا كنت تريد الاستمرار في Pack v3.
5. تأكد من قائمة الخطوط في `platform/assets/fonts/` تطابق `fonts_added_offline` في الـ snapshot.

ألصق المعلومات في session جديد + المعالج الذكي يبني snapshot من الـ git history.

---

## 🔁 الفرق بين Resume v1 / v2 / v3

| البُعد | Resume v1 | Resume v2 | **Resume v3** |
|---|---|---|---|
| Pack flag | غير موجود | `pack: "v2"` | `pack: "v3"` إجباري |
| Branch naming | `worker-XX-complete` | `worker-XX-resonance` | `worker-XX-devotio` |
| Snapshot fields | basic | يضيف `tokens_added`, `voice_bindings_added`, `resonance_notes` | يضيف `fonts_added_offline`, `devotion_notes`, `offline_check` block |
| Sanity check | manual | `sacred_preservation_check` block | + `offline_check` block إجباري |
| Phase budget | ≤ 800 سطر | ≤ 600 سطر | ≤ 600 سطر |
| Push rule | 1-push | 2-push (code + state) | 2-push (code + state) |
| Offline rule | لا | لا | **CDN = 0 إجباري** |

---

**نهاية Resume Protocol v3.**

🕯️ Devotion over decoration. Roots over flash. Offline over online.
