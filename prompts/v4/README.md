# ✦ ÊLAN v4 — README سريع
> ثمانية عوالم تتنفس داخل واجهة واحدة. كل session يَلد إبداعاً جديداً.

---

## في خمسة أسطر:

1. **الفلسفة:** ٨ مبادئ — أهمها Eight Worlds + Creativity Mandate + Truth Over Claims
2. **الهيكل:** 6 Pillars × 38 stage = 6 PRs نهائية
3. **الجديد جذرياً:** ثمانية عوالم بصرية (لكل صفحة عالمها) + كل session يلد Beacon إبداعي مسجَّل
4. **التشغيل:** ألصق فقط `AUTO_PILOT_v4.md` في session جديد. كل شيء يقرأ نفسه.
5. **الاستئناف:** نفس البرومت بدون تعديل في كل session — يكمل من state تلقائياً.

---

## 🎯 طريقة الاستخدام

### المرة الأولى:
1. افتح session جديد في Kiro/Claude/أي AI
2. ألصق محتوى `prompts/v4/AUTO_PILOT_v4.md` (الجزء بين START و END)
3. اضغط Send
4. اتركه يشتغل 15-30 دقيقة
5. راجع PR على GitHub

### كل session لاحق:
- نفس الإجراء، نفس البرومت، **بدون أي تعديل**
- AUTO_PILOT يقرأ `state/PROGRESS.json` ويعرف من أين يكمل
- في كل session: 2-4 stages عادةً + 1-3 Beacons إبداعية

---

## 🎨 ما تتوقعه بصرياً (الفرق الجوهري عن أي AI آخر)

### بعد session 1 (Pillar α): لا تغيير بصري — الأساس فقط
لكن ستجد على GitHub:
- `state/AUDIT_BASELINE.md` بأرقام حقيقية
- 5 ملفات tokens منفصلة
- بنية مجلدات JS جديدة

### بعد session 2-3 (Pillar β): الخطوط
- 7 خطوط جديدة (ليست Google)
- voice signatures مختلفة لكل صفحة
- شعور الخط العربي يصبح متناسقاً للمرة الأولى

### بعد session 4-7 (Pillar γ): العوالم الثمانية ⭐
كل صفحة تأخذ هويتها:
- dashboard → حِبر (إينك ورق نَجَفي)
- lab → نار (Brutalist عراقي)
- psych → ندى (محراب يمني فجراً)
- negotiation → حَديد (سينما بيروت 1950s)
- accounting → ذَهَب (منمنمات فارسية)
- social → تَيار (Synthwave + Memphis)
- phonerepair → وَرشة (سوق البتاوين)
- hrmastery → صَالون (خشب جوزي + نحاس)

**كل عالم له Beacon مسجَّل.** افحص `state/CREATIVITY_LOG.md` لتراها.

### بعد session 8-12 (Pillar δ): الحركة
- chrome يتنفس
- transitions بين العوالم بـ View Transitions API
- mobile bottom-nav + haptics فعلية

### بعد session 13-18 (Pillar ε): المحتوى
كل صفحة تُحيا حسب عالمها — Beacon لكل واحدة.

### بعد session 19-20 (Pillar ζ): التشطيب النهائي
verify + lighthouse + PWA.

---

## ✨ Creativity Mandate (الجديد عن v3)

كل session يجب أن يُنتج **Beacon** على الأقل واحد. Beacon = ميزة بصرية/تفاعلية/حركية:
- لم يَستخدمها AI قبل (verified ضد آخر 3 beacons)
- لا تتطابق مع أي من الـ 22 كليشيه في Forbidden Library
- مسجَّلة في `state/CREATIVITY_LOG.md`
- لها Originality Score 1-5 ذاتي

كل 3 stages → AUTO_PILOT يُلزَم بـ **Pattern Disruption** — يختار إلهاماً جذرياً مختلفاً (Brutalist Iraqi, Persian miniature, Maqamat notation, Yemeni mihrab geometry, إلخ).

**النتيجة:** بعد فحص المنصة بعد 5 sessions، ستجد على الأقل 5 لحظات بصرية لا تشبه أي منصة AI رأيتَها.

---

## 📂 ملفات الـ system

| الملف | يقرأه AUTO_PILOT في كل session؟ |
|---|---|
| `prompts/v4/00_ELAN_MANIFESTO.md` | نعم |
| `prompts/v4/CREATIVITY_DOCTRINE.md` | نعم |
| `prompts/v4/WORLDS_ATLAS.md` | نعم |
| `state/PROGRESS.json` | نعم |
| `state/CREATIVITY_LOG.md` | tail -60 فقط (خفيف) |
| `prompts/v4/<current-stage>.md` | نعم (واحد فقط) |
| الباقي | لا (يخفف context) |

---

## ⚠️ ما تغيّر في هذي النسخة عن النسخة السابقة

| الميزة | السابقة | الآن |
|---|---|---|
| Themes | Mawj + Layl + Sahar (3 ثيمات) | **8 عوالم — حذفت السابقة كلياً** |
| Creativity | غير مكتوبة كنظام | **Mandate كامل + Forbidden Library + Disruption** |
| الملفات المُلصَقة | 2 (Manifesto + AUTO_PILOT) | **1 فقط — AUTO_PILOT يقرأ الباقي بنفسه** |
| Per-session beacons | لا | **مُلزِم 1 minimum، 3 max** |
| Tracking الإبداع | لا | **CREATIVITY_LOG.md + Health Score 0-100** |

---

## 🛡 sacred assets

- `archive/` لا يُلمس
- 16 page sections محفوظة
- 14 Upg.* APIs محفوظة
- `prompts/v1, v2, v3` تبقى تاريخاً

---

— نهاية README —
