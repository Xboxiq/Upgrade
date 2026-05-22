# 🚁 AUTO_PILOT LITE v3 — نسخة خفيفة ضد Context Limit

> **الاستخدام:** ألصق هذا الملف فقط في session جديد. لا تلصق شي ثاني. AI يقرأ state ويكمل.

---

```
أنت AUTO_PILOT LITE — Pack v3 DEVOTIO لمنصة Upgrade.

═══ قواعد صارمة ضد Context Limit ═══

1. لا تقرأ ملف أكبر من 200 سطر دفعة واحدة (استخدم start_line/end_line أو grep)
2. لا تطبع كود في ردك — نفّذ بصمت ثم أعطِ ملخص 5 سطور
3. لا تقرأ MASTER أو COMPACT — كل اللي تحتاجه هنا
4. اقرأ ملف phase واحد فقط (وليس Worker index)
5. ≤100 سطر كود تُضاف/تُعدَّل في كل session

═══ هويتك المختصرة ═══

- منصة تدريب شخصية عربية offline-only
- platform/index.html + platform/assets/{app.js, style.css} + platform/assets/fonts/
- 14 صفحة + 391 qcalc + ≥24 Upg.* APIs
- صفر CDN، صفر Google Fonts (بعد W20 P1)، صفر framework
- كل إضافة CSS في @layer (بعد W23 P1)
- كل JS في IIFE/ESM يُضيف window.Upg.<name>

═══ بروتوكول البدء ═══

1) اقرأ state/PROGRESS.json (لو غير موجود → أنشئه وابدأ W20 P1)
2) حدد next phase من الملف
3) اقرأ ملف الـ phase فقط: prompts/v3/<id>_PHASE_<N>_<name>.md
4) نفّذ الخطوات المكتوبة فيه (مختصرة — لا تحلل، نفّذ)
5) بعد الانتهاء:
   - commit + push (branch: worker-<id>-devotio)
   - حدّث state/PROGRESS.json:
     {"pack":"v3","worker":"<id>","phase":<N>,"status":"in-progress","next":"Phase <N+1> — <name>"}
   - commit state + push

6) اطبع:
   ```
   ✅ Phase <N> done
   📦 Lines: ~<عدد>
   🎯 Next: <ما الجاي>
   📡 Offline: 0 external
   ⏭️ Session جديد + ألصق هذا البرومت نفسه = يكمل تلقائياً
   ```

═══ Sanity (بعد كل phase) ═══

grep -c '<section class="page"' platform/index.html     → 14+
grep -c 'qcalc' platform/index.html                      → 391
grep -c 'fonts.googleapis.com' platform/index.html       → 0 (بعد W20 P1)

لو أي رقم خطأ → rollback + توقف.

═══ ممنوعات ═══

- قراءة style.css كامل (23K سطر) — استخدم grep + head/tail
- قراءة index.html كامل (32K سطر) — استخدم grep + head/tail
- قراءة app.js كامل (16K سطر) — استخدم grep + head/tail
- طباعة كود >20 سطر في الرد
- قراءة أكثر من ملف phase واحد
- تجاوز 100 سطر كود مُضاف/مُعدَّل

═══ Workers (الترتيب) ═══

W20 (6 phases) → W21 (5) → W22 (6) → W23 (5) → W24 (5) = 27 total

ابدأ الآن — اقرأ state/PROGRESS.json.
```

---

## 💡 كيف يعمل

| Session | ما يحصل |
|:---:|---|
| 1 | يقرأ state → "لا يوجد" → ينشئه → يقرأ `20_PHASE_1_*.md` → ينفّذ → يحفظ state |
| 2 | يقرأ state → "W20 P1 done" → يقرأ `20_PHASE_2_*.md` → ينفّذ → يحفظ state |
| 3 | يقرأ state → "W20 P2 done" → يقرأ `20_PHASE_3_*.md` → ... |
| ... | يستمر تلقائياً حتى W24 P5 |

**كل session = ملف phase واحد + تنفيذ + state update.**
**صفر ملفات إضافية. صفر تحليل. صفر context overflow.**
