# 🚀 منصة Upgrade — التدريب الاحترافي الذاتي

> منصة عربية offline (ملف واحد + assets) لتدريب 9 وظائف سوقية مع طبقة علم نفس مدمجة.

---

## 📂 بنية المشروع

```
Upgrade/
├── platform/              ← الملفات الشغّالة (افتح index.html في المتصفح)
│   ├── index.html         (519 KB — الهيكل)
│   └── assets/
│       ├── style.css      (145 KB — كل الستايل)
│       └── app.js         (437 KB — كل JavaScript)
│
├── archive/               ← الملف الأصلي العملاق (نسخة أمان فقط)
│   └── arabic-training-platform-v12-original.html  (1.1 MB)
│
├── prompts/               ← حزمة برومتات تطوير المنصة
│   ├── 00_MASTER_PROMPT.md           (الكامل — للسيشن المريح)
│   ├── COMPACT_MASTER.md             (المضغوط — لتوفير context)
│   ├── 01-09_WORKER_*.md             (9 وحدات عمل)
│   ├── 10_RESUME_PROTOCOL.md         (استئناف الجلسة)
│   ├── COMPACT_RESUME.md             (استئناف مضغوط)
│   ├── CONTEXT_LIMIT_FIX.md          (دليل تشخيصي شامل)
│   └── README.md                     (دليل الاستخدام بالعربي)
│
└── scripts/
    └── split-platform.mjs            (سكربت تشطير الملف الأصلي)
```

---

## ▶️ كيف تشغّل المنصة

افتح `platform/index.html` مباشرة في أي متصفح حديث. يعمل offline 100% ما عدا تحميل خط Cairo (يمكن تحميله محلياً للاستقلال التام).

---

## 🛠️ كيف تطوّر المنصة (مع AI)

### 🚁 الطريقة الموصى بها — AUTO_PILOT (تنفيذ ذاتي كامل)
1. **افتح session جديد** في Kiro / Claude / GPT
2. **افتح `prompts/AUTO_PILOT.md`** وانسخ البرومت داخل البلوك
3. **الصقه واضغط Send** — وراح AI:
   - يقرأ `state/PROGRESS.json` ويعرف وين توقف
   - ينفّذ phases متتالية بدون توقف
   - يعمل commit + push + merge تلقائياً
   - يحدّث PROGRESS.json بعد كل phase
4. **عُد بعد 15-30 دقيقة** وراجع PRs المدموجة على GitHub
5. **في session جديد**: الصق نفس البرومت — يكمل من حيث توقف

### 🛠️ الطريقة اليدوية (لو تحب التحكم phase-by-phase)
1. **افتح session جديد**
2. **ألصق `prompts/COMPACT_MASTER.md`** (الموصى به) أو الكامل
3. **ألصق Worker** (مثلاً `prompts/01_WORKER_UI_UX.md`)
4. **اكتب**: `موافق ابدأ`
5. بعد كل phase: انسخ الـ STATE_SNAPSHOT في ملف نصي على جهازك

### القواعد الذهبية لتجنب Context Limit
- ✅ استخدم `prompts/COMPACT_MASTER.md` (3KB) بدل الكامل (14KB)
- ✅ اطلب من AI يقرأ `platform/assets/style.css` فقط للتعديلات البصرية
- ✅ اطلب من AI يقرأ `platform/assets/app.js` فقط للـ logic
- ✅ phase واحد لكل رد (≤ 600 سطر)
- ❌ **لا ترفع أي ملف في `.kiro/steering/`** — يستهلك توكنز في كل turn
- ❌ لا تخلي session واحد يطول أكثر من 3 phases

التفاصيل الكاملة في `prompts/CONTEXT_LIMIT_FIX.md`.

---

## 🔄 إعادة التشطير (لو عدّلت الملف الأصلي)

```bash
node scripts/split-platform.mjs archive/arabic-training-platform-v12-original.html
# الناتج يطلع في dist/ — انقله يدوياً إلى platform/
```

> ملاحظة: عادة لا تحتاج لهذا. اشتغل مباشرة على ملفات `platform/` وانسَ الأصل.

---

## 📊 الإحصاءات

| المعيار | القيمة |
|---|---|
| إجمالي السطور | ~15,650 |
| عدد الصفحات | 11 (حالياً) |
| التقنيات | HTML5 + CSS3 + Vanilla JS |
| الاعتماديات الخارجية | Cairo font فقط |
| التشغيل | Offline 100% |

---

## 🎯 خارطة الطريق (8 Workers قادمة)

| Worker | الوحدة | الحالة |
|---|---|---|
| 01 | UI/UX — Quantum Leap v13 | 📋 جاهز للتنفيذ |
| 02 | Sales + Account Manager | 📋 جاهز |
| 03 | Call Center + Voice Lab | 📋 جاهز |
| 04 | Accounting + Cashier (Iraq Tax) | 📋 جاهز |
| 05 | Junior Programmer | 📋 جاهز |
| 06 | Social Media + Marketing | 📋 جاهز |
| 07 | Phone Repair (وحدة جديدة) | 📋 جاهز |
| 08 | HR Mastery + Salary Negotiation | 📋 جاهز |
| 09 | Psychology Integration Layer | 📋 جاهز |

---

## ⚠️ تنبيه مهم لمشكلة Context Limit

**لا ترفع أي ملف في `.kiro/steering/` ضمن الريبو ولا في إعدادات Kiro Web.**

السبب: Kiro يحقن محتوى الـ steering في **كل turn** من المحادثة، حتى لو الملف غير ذي صلة بطلبك الحالي. هذا يأكل الـ context tokens بسرعة.

البديل: استدعِ القواعد يدوياً عند الحاجة بنسخها من `prompts/COMPACT_MASTER.md`.

التفاصيل في `prompts/CONTEXT_LIMIT_FIX.md`.
