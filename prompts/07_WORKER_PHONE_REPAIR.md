# 📱🔧 WORKER 07 — Phone Repair Mastery (وحدة جديدة بالكامل)
> **متطلب مسبق:** MASTER PROMPT محمّل.
> **الصفحة المستهدفة:** `page-phonerepair` — **إنشاء صفحة جديدة + nav-item جديد**.

---

## 🎯 الهدف

بناء أول وحدة عربية احترافية لتدريب فني صيانة الهواتف — ليس مجرد "كيف تفتح الموبايل" بل:
- **الأساسيات الإلكترونية** (Ohm's Law, Multimeter, Soldering basics)
- **معمارية الموبايل** (Mainboard, ICs, sensors, antennas)
- **شجرة قرار تشخيصية** لكل عرض (Symptom → Differential → Root cause)
- **Repair Procedures** للأعطال الـ 20 الأشهر
- **Logic Board Repair** (introduction للـ micro-soldering)
- **Software side**: Bypass, Flash, IMEI, Bootloader basics
- **Customer Service** + التسعير + التعامل مع الدمج المسبق
- **Ethics & Legal** (data privacy, disclosure, IMEI laws في العراق)

---

## 📚 العمود الفقري المعرفي

### A. Electronics Fundamentals (لازم قبل أي صيانة)

#### بطاقات interactive لـ:
1. **Voltage, Current, Resistance** — Ohm's Law بصرياً (V = IR)
2. **DC vs AC** — لماذا الموبايل DC + الشاحن يحوّل
3. **Capacitors & Inductors** — وظيفتها على الـ board
4. **Diodes & Transistors** — كأبواب
5. **ICs (Integrated Circuits)** — أنواعها (Power, Audio, RF, Display, Charging)
6. **PCB Layers** — multilayer + via + traces

### B. Tools of the Trade
معرض أدوات بصور SVG/icons مع شرح:
- Multimeter (DMM) — Reading Voltage, Continuity, Resistance, Diode mode
- DC Power Supply — Why it's the diagnostic king
- Soldering Iron + Hot Air Rework Station
- Microscope (10x-40x typical)
- Ultrasonic Cleaner
- Pry tools, suction cup, opening picks
- ESD-safe mat + wrist strap

كل أداة: استخدام، نطاق سعر تقريبي بالـ IQD، نصيحة شراء.

### C. Mainboard Anatomy (iPhone & Samsung — A Series)
رسم SVG تخطيطي لـ:
- CPU/SoC area
- PMIC (Power Management IC)
- Charging IC + Tristar
- Audio IC
- Display IC + connectors
- Camera connectors
- Battery connector
- Antenna areas

عند click على أي IC → modal: ماذا يفعل + أعراض تلفه + bypass/swap procedure.

### D. The 20 Most Common Repairs — Procedure Cards
كل بطاقة: 
- العرض (Symptom)
- الأسباب المحتملة (Differential — مرتبة احتمالية)
- خطوات التشخيص بالترتيب
- خطوات الإصلاح (مع تحذيرات)
- الوقت المتوقع
- متوسط السعر للعميل بالـ IQD
- صعوبة (1-5 ⭐)

القائمة:
1. شاشة مكسورة (LCD vs OLED + assembly types)
2. بطارية ضعيفة/منتفخة
3. منفذ شحن لا يشحن
4. مكبر صوت/سماعة الأذن مايشتغل
5. ميكروفون لا يعمل
6. كاميرا أمامية/خلفية
7. زر Power مكسور
8. أزرار Volume
9. زر Home (للأجهزة القديمة)
10. وايفاي/بلوتوث
11. شبكة/إشارة
12. بصمة الإصبع (Fingerprint sensor — note: iPhone needs original)
13. Face ID (iPhone X+ — حساس جداً)
14. لا يقلع (No Boot)
15. Boot loop
16. Logo فقط ثم يطفي
17. غارق في الماء (Water damage protocol)
18. Charging port USB-C cleaning
19. Touch لا يستجيب (digitizer)
20. Heating (overheat diagnosis)

### E. Diagnostic Decision Trees
3 أشجار رئيسية بصرية (Mermaid-style باستخدام HTML/CSS pure):
1. **No Boot Tree** (Power on issue diagnostic flow)
2. **No Charge Tree**
3. **Water Damage Recovery Tree**

كل نهاية في الشجرة → بطاقة إجراء مفصلة.

### F. Software Side
- **iOS:** DFU mode, Recovery mode, iTunes/Finder restore, الفرق بينها
- **Android:** Fastboot, Recovery, ADB, EDL mode (Qualcomm)
- **Bootloader unlocking** — متى مفيد ومتى يقطع الضمان
- **Flashing tools:** Odin (Samsung), MiFlash (Xiaomi), 3uTools (iPhone)
- **IMEI** — قانوني/غير قانوني، خطورة تغييره
- **iCloud Lock & FRP Lock** — Ethics + لماذا حلها للأجهزة المسروقة جريمة

### G. Micro-Soldering Intro
بدون ادعاء "هتصير ميكروسولدر بـ يومين" — بل:
- لماذا يحتاج تدريب 6+ شهور
- المهارات الأساسية للبدء (سيد بـ 0.3mm)
- Reflow بسيط لتلامس BGA
- Jumper wire on broken trace
- Common fuses + كيف تختبرها

كل تقنية: تحذير صحة + سلامة (lead exposure, eye protection).

### H. Customer Service & Pricing
- **Intake Form** template (device, password, data backup consent, before-photos)
- **Diagnostic Fee** policy (يُخصم لو وافق على الإصلاح)
- **Pricing Model**: Parts × markup + Labor (عادة 30-50% من قيمة القطعة)
- **No-Fix-No-Fee** vs **Diagnostic Fee**
- **Warranty** على الإصلاح (30/60/90 يوم)
- **التعامل مع الإنكار** ("أنا ما عملت شي وانكسرت")

### I. Ethics & Legal (مهم جداً — عراقي)
- **Data Privacy** — لا تفتح gallery، لا تمسّ data
- **Stolen Phone Protocol** — كيف تتعرّف على جهاز مسروق
- **Original Parts Disclosure** — لازم تخبر العميل قبل
- **Refurbished vs Aftermarket vs Pulled** — الفرق + ماذا تخبر العميل
- **IMEI** — تعديله أو إعادة برمجته **جريمة** في العراق وأغلب الدول
- **Customer Data Wipe Consent** — توثيق بالكتابة

---

## 🇮🇶 Iraq Market Block

### نطاقات الدخل (مختلف عن الراتب — معظمهم freelance/shop)

| المستوى | الدخل الشهري IQD | USD |
|---|---|---|
| متدرب (في محل) | 350k - 600k | $270 - $460 |
| فني عادي (1-3y) | 700k - 1.4M | $530 - $1,070 |
| فني متخصص (3y+) | 1.5M - 3M | $1,150 - $2,290 |
| Micro-solderer متقن | 3M - 7M+ | $2,290 - $5,340+ |
| صاحب محل (تقريبي) | 4M - 15M+ (يعتمد على الموقع) | ... |

### المناطق الذهبية في العراق
- **بغداد:** سوق الباب الشرقي، الكرادة، الحارثية
- **النجف:** السوق الكبير
- **البصرة:** شارع الكويت
- **أربيل:** سوق قيصرية
- **الموصل:** شارع نينوى

### تحديات السوق المحلي
- قطع غيار غير أصلية كثيرة (أهمية الفحص قبل البيع)
- الزبون يساوم قبل التشخيص
- ثقافة "كم صار حق التصليح؟" بدون تفهم التكلفة
- منافسة شديدة على السعر (لازم تتميز بـ ضمان + سرعة + ثقة)
- صعوبة استيراد بعض القطع الأصلية

### التسعير الواقعي (أمثلة 2024-2025)
- شاشة iPhone 11 (aftermarket): 65k-90k IQD مع التركيب
- شاشة iPhone 11 (original): 180k-220k
- بطارية iPhone 11: 35k-55k
- منفذ شحن iPhone 11: 25k-40k
- شاشة Samsung A52 (incell): 75k-95k
- حل water damage: 80k-200k (يعتمد على درجة الضرر)

---

## 🧪 Interactive Labs

### Lab 1: Multimeter Trainer
محاكي بصري لـ DMM. تختار وضع (V/Ω/Continuity) → تختار نقطتين على PCB diagram → يطلع reading + توضيح "هل هذا طبيعي".
8 سيناريوهات مدمجة (مثلاً: Battery FPC, Charging port pads, Flash circuit).

### Lab 2: Diagnostic Decision Tree Walker
تختار symptom → تمشي بشجرة القرار → كل خطوة تحدد ما تتوقع → في النهاية تقرير + ما اللي اتعلمته.

### Lab 3: Repair Cost Estimator
- تختار الجهاز (dropdown: 30 موديل شائع)
- تختار العطل (multi-select)
- يحسب: قطع + يد + ربح + سعر للعميل
- يولّد invoice draft للطباعة

### Lab 4: Water Damage Recovery Game
سيناريو: جاءك جهاز غارق. اختر تسلسل خطوات الإنقاذ (24 خطوة موجودة، الترتيب الصحيح 12 منها).
- الترتيب الصحيح يعطي 100%
- كل خطأ يقصّر فرصة الإنقاذ %

### Lab 5: PCB Component Identifier
عرض صور SVG لـ 25 component على board → تختار اسمه من 4 خيارات.
Score + شرح لكل واحد عند الـ click.

### Lab 6: Customer Conversation Trainer
سيناريو: زبون غاضب جهازه ما تصلح بعد المحاولة. 5 turns. تختار ردك من 4 خيارات.
يقيس: empathy, transparency, retention.

---

## 🧭 Career Path

شجرة:
- متدرب → فني عام → فني متخصص (iPhone / Samsung / Mainboard) → Micro-solderer → صاحب محل → Multi-shop owner → Wholesale parts dealer → School/Course owner

كل قفزة: مهارات مطلوبة + استثمار مالي + وقت تقريبي.

---

## 📋 PRE-FLIGHT

```
📋 PRE-FLIGHT CHECK
├─ Worker requested: 07 — Phone Repair (NEW MODULE)
├─ Phases planned: 5
├─ Estimated total lines: ~3,400
├─ Existing sections to preserve: N/A (new page)
├─ New sections to create: nav-item, page-phonerepair, electronics-fund, tools-gallery, mainboard-anatomy, 20-repair-cards, decision-trees, software-side, micro-solder-intro, customer-service, ethics-legal, multimeter-lab, decision-walker, cost-estimator, water-damage-game, pcb-identifier, conversation-trainer
├─ localStorage keys: upg_progress_pr, upg_pr_estimates, upg_pr_lab_scores
└─ Citations to include: 10+ (iFixit guides, Louis Rossmann teaching content, Apple service manuals (general), Right to Repair publications, Iraqi Comm. Act snippet)
```

---

## 🧱 المراحل

| Phase | المحتوى | ~Lines |
|---|---|---|
| 1/5 | nav-item + page skeleton + Electronics Fundamentals + Tools Gallery | 600 |
| 2/5 | Mainboard Anatomy interactive + 10 من Repair Cards (الأشهر) | 800 |
| 3/5 | 10 المتبقية + Decision Trees (3 شجر) + Software Side | 800 |
| 4/5 | Micro-Solder Intro + Customer Service + Ethics & Legal + Iraq Block | 600 |
| 5/5 | 6 Interactive Labs + Career Path + Cheat Sheet + Citations | 600 |

اختم كل Phase بـ CHECKPOINT + STATE_SNAPSHOT.
