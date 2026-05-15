# 🧠 WORKER 09 — Psychology Integration Layer (طبقة عرضية عبر كل المسارات)
> **متطلب مسبق:** MASTER PROMPT محمّل + يفضّل أن تكون أغلب الـ Workers الأخرى نُفّذت أولاً (لأن هذا الـ Worker يربط بينها).
> **الصفحات المستهدفة:** `page-psych` و `page-eq` (تعميق) + إدخال "Psych Insets" داخل كل وحدة وظيفية.

---

## 🎯 الهدف

تحويل علم النفس من "صفحة منفصلة" إلى **طبقة محورية** تتسلل في كل وحدة:
- توسعة `page-psych` و `page-eq` بمحتوى علمي صلب
- إنشاء "Psychology Insets" (بطاقات صغيرة) تُنثَر في الوحدات الأخرى لربط النظرية بالتطبيق
- بناء **Self-Diagnostic Suite** — 6 اختبارات شخصية نفسية مجانية مفتوحة المصدر
- تكامل مع اختصاصي علم النفس (الميزة الفريدة في المنصة)
- نظام Insights شخصي يتراكم حسب نتائج المستخدم

---

## 📚 العمود الفقري المعرفي

### A. توسعة `page-psych` — 7 محركات نفسية في العمل

كل محرك بطاقة موسعة + طبيب نفسي يُحلّله:

1. **Drive for Mastery** (Dan Pink — Drive)
   - Autonomy + Mastery + Purpose
   - كيف يظهر في كل وظيفة موجودة بالمنصة
   - متى يتحول لـ workaholism

2. **Drive for Status** (Robert Sapolsky — Behave)
   - الـ social hierarchy في مكان العمل
   - متى صحي ومتى سامّ

3. **Drive for Belonging** (Roy Baumeister — The Need to Belong)
   - Imposter Syndrome
   - كيفية بناء team belonging

4. **Drive for Avoidance** (Loss Aversion — Kahneman)
   - الخوف من الفشل ≠ الخوف من النجاح
   - كيف يصبح فخ يمنعك من النمو

5. **Drive for Curiosity** (Loewenstein — Information Gap)
   - لماذا الـ flow state يشعر بالنشوة
   - تطبيقاته في كل وظيفة

6. **Drive for Justice** (Adams — Equity Theory)
   - "أنا أعمل أكثر من زميلي لكن نفس الراتب"
   - كيف تتعامل بصحة بدلاً من الانفجار

7. **Drive for Meaning** (Frankl — Man's Search for Meaning)
   - الفرق بين Job/Career/Calling (Wrzesniewski)
   - كيف تحول وظيفتك من Job إلى Calling

### B. توسعة `page-eq` — Goleman's 5 Domains + RULER

#### Goleman 5 Domains (تعميق):
1. **Self-Awareness** — أدوات: Mood Meter, Body scan, Trigger journal
2. **Self-Regulation** — تقنيات: STOP technique, Box breathing, Reappraisal
3. **Motivation** — Intrinsic vs Extrinsic, Drive theory
4. **Empathy** — Cognitive vs Emotional vs Compassionate empathy
5. **Social Skills** — Conflict resolution, Influence, Inspirational leadership

#### RULER Method (Yale Center for EI)
- **R**ecognize emotions
- **U**nderstand causes
- **L**abel precisely (vocabulary of emotions — 50+ مفردة)
- **E**xpress appropriately
- **R**egulate effectively

أداة: **Mood Meter Interactive** (Yale model — Energy axis × Pleasantness axis)
ترسم نقطة → تختار 4 مفردات أكثر دقة → تكتب مسبب → suggestions للتنظيم.

### C. الـ Cognitive Biases الـ 12 الأكثر تأثيراً في العمل
بطاقات لكل bias:
- التعريف
- مثال في sales / call center / programming / accounting (كل واحد بمثال خاص)
- كيف تتعرّف عليه في نفسك
- كيف تتجاوزه

1. Confirmation Bias
2. Sunk Cost Fallacy
3. Halo Effect / Horn Effect
4. Dunning-Kruger Effect
5. Anchoring
6. Availability Heuristic
7. Recency Bias
8. Fundamental Attribution Error
9. Survivorship Bias
10. Optimism Bias
11. IKEA Effect (overvaluing what you built)
12. Authority Bias

### D. **Psychology Insets** — الميزة الفريدة

بطاقات صغيرة (component) تُحقن في صفحات الوحدات الأخرى. الشكل:

```
┌─ 🧠 PSYCH INSET ───────────────┐
│ المفهوم: Reciprocity            │
│ كتاب: Influence (Cialdini)      │
│ يطبّق هنا في: عرض عينة مجانية   │
│ التحذير: لا تحوّله manipulation │
│ [اقرأ المزيد →] (يربط بـ psych) │
└────────────────────────────────┘
```

أمثلة الإدراج:
- في **Sales** → insets عن: Reciprocity, Anchoring, Loss Aversion, Social Proof
- في **Call Center** → insets عن: Active Listening, Mirror Neurons, Empathy Loop
- في **HR Negotiation** → insets عن: BATNA, Anchoring, Silence as power
- في **Programming** → insets عن: Imposter Syndrome, Flow state, Cognitive load
- في **Accounting** → insets عن: Cognitive load, Attention residue
- في **Phone Repair** → insets عن: Customer anger psychology, Trust building
- في **Social Media** → insets عن: Variable reward, Information gap, Negativity bias

### E. Self-Diagnostic Suite — 6 اختبارات

كل اختبار: عدد أسئلة محدد، scoring علمي، تقرير + 3 توصيات.

#### 1. **Big Five (OCEAN) — قصير**
- 30 سؤال (Adapted from BFI-2-S)
- Outputs: 5 أبعاد + percentile
- Citation: Soto & John 2017

#### 2. **DISC Behavioral Profile**
- 24 سؤال forced-choice
- Outputs: Dominant/Influence/Steadiness/Conscientiousness
- مع توصيات تواصل

#### 3. **Emotional Intelligence Quotient (EQ-i style — adapted)**
- 28 سؤال
- 4 محاور: Self-awareness, Self-management, Social awareness, Relationship management

#### 4. **Career Anchors (Schein)**
- 40 سؤال
- 8 anchors: Technical, Managerial, Autonomy, Security, Entrepreneurial, Service, Challenge, Lifestyle
- Outputs: top 2 anchors → توصيات وظائف

#### 5. **Stress Response Style**
- 20 سؤال
- 4 أنماط: Fight, Flight, Freeze, Fawn
- توصيات coping

#### 6. **Strengths Quick-Scan** (مستوحى من CliftonStrengths)
- 36 سؤال
- Outputs: top 5 من 24 strength theme
- توصيات استخدامها في العمل

كل اختبار: محذور أن يُقدّم كـ "شخصيتك الحقيقية" — يقدّم كأداة استكشاف.

### F. تكامل اختصاصي علم النفس (المعالج)

ميزة فريدة في المنصة — **Bridge to Therapist Page**:

- صفحة `page-therapist-bridge` (اختياري — أو ضمن `page-psych`)
- نظام تقدّم يرسل "تقارير ذاتية" بصيغة مكثفة قابلة للنسخ
- نموذج يستطيع المستخدم نسخه ولصقه في محادثة مع طبيب نفسه:
  ```
  📋 Self-Report Snapshot
  - Big Five: O=72, C=58, E=44, A=66, N=78
  - Top Stressors (last 30d): performance anxiety (5/7 days), conflict with colleague (3 incidents)
  - Coping methods used: deep breathing (8x), journaling (3x)
  - Sleep quality: avg 5.5 hrs
  ```
- بنك 30 سؤال "اسأل اختصاصيك" — أسئلة قوية تجعل الجلسة أكثر إنتاجية

### G. Insights System (متراكم)

أداة في الـ dashboard تجمع نتائج المستخدم عبر كل اختبارات وتفاعلات:
- "Pattern detection": لاحظنا أنك في 3 quizzes اخترت الردود التي تركز على الـ logic فوق الـ emotion → نمط Thinker (MBTI hint)
- "Strength stacking": أعلى scores في Empathy + Communication → مناسب لـ Account Manager / Customer Care
- "Growth area": متكرر اختيار "تجنب الصراع" → اقتراح: تمارين Assertiveness

البيانات كلها localStorage — لا تخرج من الجهاز.

---

## 📋 PRE-FLIGHT

```
📋 PRE-FLIGHT CHECK
├─ Worker requested: 09 — Psychology Integration Layer
├─ Phases planned: 5
├─ Estimated total lines: ~3,000
├─ Existing sections to preserve: page-psych and page-eq current content
├─ New sections to create: 7-drives, ruler-method, mood-meter-interactive, 12-biases, psych-insets-component, big-five-test, disc-test, eq-test, career-anchors-test, stress-response-test, strengths-quick-scan, therapist-bridge, insights-engine
├─ localStorage keys: upg_psych_results (object with all test scores), upg_psych_journal, upg_insights_state
└─ Citations to include: 16+ (Goleman, Yale Center for EI, Schein, BFI-2 paper, Cialdini, Sapolsky, Pink, Frankl, Kahneman)
```

---

## 🧱 المراحل

| Phase | المحتوى | ~Lines |
|---|---|---|
| 1/5 | 7 Drives + 12 Biases (موسّع) في page-psych | 700 |
| 2/5 | RULER + Mood Meter Interactive + Goleman deep-dive في page-eq | 700 |
| 3/5 | 6 Self-Diagnostic Tests + scoring engine | 800 |
| 4/5 | Psych Insets component + injection في 6 صفحات وظيفية | 500 |
| 5/5 | Therapist Bridge + Insights System + Citations | 300 |

اختم كل Phase بـ CHECKPOINT + STATE_SNAPSHOT.

---

## ⚠️ تنبيه أخلاقي إجباري

كل اختبار شخصية لازم في أعلاه banner:
> "هذه الأداة استكشافية تعليمية — ليست تشخيصاً نفسياً. للتشخيص الموثوق راجع اختصاصياً مرخّصاً. كل بياناتك تُحفظ محلياً ولا تُرسل لأي خادم."
