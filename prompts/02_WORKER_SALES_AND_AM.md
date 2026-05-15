# 💼 WORKER 02 — Sales Mastery + Account Manager Track
> **متطلب مسبق:** MASTER PROMPT محمّل.
> **الصفحات المستهدفة:** `page-fieldsales` (تطوير) + `page-accountmgr` (إنشاء جديدة).

---

## 🎯 الهدف

بناء أعمق وحدة تدريب مبيعات عربية موجودة — تجمع بين:
- 4 مدارس بيع عالمية مقارنة جنباً لجنب
- **Sales Funnel Calculator** تفاعلي يحسب احتمالية الإغلاق برياضيات حقيقية
- محاكي اعتراضات ميداني عراقي
- مسار **Account Manager** كامل (KAM Lifecycle) مع QBR templates

---

## 📚 العمود الفقري المعرفي (Knowledge Spine — يُغطّى كله)

### A. مدارس البيع الأربع (Comparative Frameworks)
أنشئ جدول مقارنة `<table class="sales-frameworks">` يقارن:

| Framework | المؤلف | السنة | الجوهر | متى تستخدمه | عيوبه |
|---|---|---|---|---|---|
| **SPIN Selling** | Neil Rackham | 1988 | Situation→Problem→Implication→Need-payoff | بيع B2B معقد | بطيء في السلع البسيطة |
| **Challenger Sale** | Dixon & Adamson | 2011 | Teach→Tailor→Take Control | عملاء غير واعين بمشكلتهم | يحتاج خبير قطاع |
| **Sandler Method** | David Sandler | 1967 | Pain Funnel + Bonding | كسر دورات البيع المستنزفة | منهج مختلف عن المعتاد |
| **Solution Selling** | Bosworth | 1994 | Diagnose-then-prescribe | بيع تكنولوجي | نمطي إذا طُبّق حرفياً |

كل صف عند click يفتح modal فيه:
- شرح موسّع
- مثال محادثة كاملة (3-4 turns) بالعربي على منتج عراقي (مثلاً: نظام POS لمطعم)
- متى يفشل؟ (failure modes)

### B. The Sales Funnel — Real Math
بطاقة تفاعلية فيها 4 مدخلات:
1. عدد الـ Leads شهرياً
2. % تحول Lead → Qualified
3. % تحول Qualified → Proposal
4. % تحول Proposal → Closed

تحسب live:
- عدد الصفقات المتوقعة
- متوسط حجم الصفقة (input)
- **Pipeline Coverage Ratio** (يوصى بـ 3x من الـ quota — citation: Salesforce State of Sales 2023)
- التحذير لو coverage < 2.5x

### C. علم نفس الشراء (Buyer Psychology)
4 مفاهيم لازم تُغطى بعمق:
1. **Loss Aversion** (Kahneman) — لماذا "ستخسر 30% لو ما اشتريت اليوم" أقوى من "ستوفر 30%"
2. **Anchoring Bias** — تقنية الـ price ladder (3 خيارات حيث الأوسط هو المستهدف)
3. **Reciprocity** (Cialdini) — قوة العينة المجانية والـ "ما طلبت منك تشتري، أعطيك معلومة"
4. **Social Proof** — كيف تُستخدم case studies بفعالية (الرقم > الشعار، والقطاع المشابه > الأرقام الكبيرة)

### D. Discovery Questions Library
بنك أسئلة منظم بـ accordion:
- أسئلة الموقف (Situation) — 12 سؤال
- أسئلة الألم (Pain) — 15 سؤال
- أسئلة الأثر (Impact) — 10 أسئلة
- أسئلة الميزانية (Budget) — 8 أسئلة بصياغة محترمة
- أسئلة الـ Decision Process (MEDDIC) — 7 أسئلة

كل سؤال له: **النص + الهدف + إشارات الجواب الجيد vs الخطر**.

### E. Closing Techniques (8 تقنيات + متى تستخدم وأي وقت تتجنب)
1. Assumptive Close
2. Alternative Close (A or B)
3. Summary Close
4. Urgency Close (مع تحذير ضد الكاذبة)
5. Puppy Dog Close (تجربة)
6. Question Close
7. Soft Close
8. Takeaway Close (متقدم — حذِر)

---

## 🇮🇶 السوق العراقي — البلوك الإجباري

### نطاقات الراتب الفعلية (يُحدّث سنوياً)
بطاقة Salary Map للمبيعات في العراق (2024-2025):

| المستوى | الراتب الأساسي IQD | عمولة % | إجمالي متوقع IQD | بـ USD |
|---|---|---|---|---|
| Junior Sales (0-2y) | 600k - 900k | 1-3% | 800k - 1.4M | $610 - $1,070 |
| Mid Sales (2-5y) | 900k - 1.5M | 2-5% | 1.4M - 2.5M | $1,070 - $1,910 |
| Senior Sales (5y+) | 1.5M - 2.5M | 3-7% | 2.5M - 5M | $1,910 - $3,820 |
| Sales Manager | 2.5M - 4M | + bonus quarterly | 3.5M - 7M | $2,670 - $5,340 |

**القطاعات الأعلى عمولة في العراق:** الاتصالات (Asiacell, Zain, Earthlink), البنوك (TBI, البنك الأهلي), العقارات, السيارات (المنصور), B2B SaaS الناشئ.

### اعتراضات عراقية حرفية (12 اعتراض) — كل اعتراض يُعرض كبطاقة فيها:
- النص الأصلي بالعراقي
- ما يقصد العميل فعلاً (subtext)
- الردّ الخاطئ الشائع
- 3 ردود ميدانية ناجحة
- اعتراض المتابعة المتوقع

أمثلة لازم تشملها:
1. "غاااالي والله" → (سعر مرتفع نسبياً لمرجع داخلي)
2. "خل أفكر وأرجعلك" → (ما حسم بعد + ما يريد يقول لا)
3. "اخويه عنده هذا الشي بنص السعر" → (اختبار + بحث عن خصم)
4. "ميزانيتنا قاطعة هل سنة" → (timing object يحتاج إعادة جدولة)
5. "لازم آخذ موافقة المدير" → (ليس صاحب القرار)
6. "نشوف بالأشهر الجاية" → (تأجيل لأنه ما شعر بالألم)
7. "والله الشركة الفلانية اتصلت بينا قبلكم" → (يفاوض)
8. "حضرتك ما عندك مكتب بالعراق؟" → (قلق support)
9. "السعر بالدولار لو دينار؟" → (قلق العملة)
10. "الدفع كاش لو حوالة؟" → (logistics)
11. "نجرب شهر بس" → (يطلب pilot)
12. "خلي مديرك يتصل بنا" → (تحدي للمندوب — escalate رسمياً مو شخصياً)

---

## 🧪 Interactive Lab (إلزامي — 3 تفاعلات)

### Lab 1: Funnel Calculator (تفاعلي رياضي)
كما وُصف أعلاه — مع رسم SVG funnel يتحدّث live.

### Lab 2: Objection Trainer
محاكي يطرح عليك اعتراض عراقي عشوائي → تكتب ردك → AI scoring (rule-based لأن offline) يقيمه بـ rubric:
- Empathy (1-5)
- Reframe (1-5)
- Specificity (1-5)
- Forward motion (1-5)

(الـ scoring rule-based: keywords matching ضد قائمة "indicators" لكل بُعد).

### Lab 3: Pitch Builder
أداة تنتج pitch من 60 ثانية بناءً على مدخلاتك:
- المنتج (text)
- العميل المستهدف (text)
- المشكلة (text)
- الحل (text)
- الـ Differentiator (text)
- الـ Call to Action (dropdown)

تطبّق صيغة: **Hook (10s) → Problem (15s) → Solution (20s) → Proof (10s) → CTA (5s)**.

---

## 👨‍💼 Account Manager Track (page-accountmgr — صفحة منفصلة)

أضف nav-item جديد + section جديد كامل.

### المحاور:
1. **الفرق بين Sales Hunter و Account Manager (Farmer)** — جدول واضح + متى تنتقل من واحد للثاني
2. **KAM Lifecycle (Key Account Management) — 7 مراحل**
   - Onboarding → Adoption → Value Realization → Renewal → Expansion → Advocacy → Recovery (لو في خطر churn)
3. **Stakeholder Mapping** — أداة تفاعلية ترسم خريطة الـ stakeholders (Champion, Decision Maker, Influencer, Blocker, End User) مع تأثيرهم/اهتمامهم
4. **QBR (Quarterly Business Review) Template** — قابل للتحميل/الطباعة:
   - Recap of last quarter goals
   - KPIs achieved
   - Pain points discovered
   - Roadmap alignment
   - Expansion opportunities
   - Risks & mitigations
5. **Net Revenue Retention (NRR) Calculator** — يحسب NRR من upsell/downsell/churn data
6. **Health Score Dashboard** — 6 عوامل موزونة:
   - Product usage frequency
   - NPS score
   - Support ticket trend
   - Executive engagement
   - Contract length remaining
   - Payment timeliness
7. **Renewal Playbook** — متى تبدأ المحادثة (90/60/30 days out) + سيناريوهات الـ price increase

---

## 📋 PRE-FLIGHT (نفّذها أولاً — أرسلها قبل الكود)

```
📋 PRE-FLIGHT CHECK
├─ Worker requested: 02 — Sales + Account Manager
├─ Phases planned: 5
├─ Estimated total lines: ~3,200
├─ Existing sections to preserve: page-fieldsales (current content kept, augmented)
├─ New sections to create: page-accountmgr (new), nav-item, sales-funnel-lab, objection-trainer, pitch-builder, kam-lifecycle, stakeholder-map, qbr-template
├─ localStorage keys: upg_progress_sales, upg_progress_am, upg_pitch_drafts, upg_objection_scores
└─ Citations to include: 14+ (SPIN, Challenger, Sandler, HBS cases, Salesforce reports)
```

---

## 🧱 المراحل المقترحة

| Phase | المحتوى | ~Lines |
|---|---|---|
| 1/5 | تطوير `page-fieldsales` Header + Knowledge Spine (4 مدارس) + جدول مقارن | 700 |
| 2/5 | Discovery Questions Library + Closing Techniques + 12 Objection Cards عراقية | 800 |
| 3/5 | 3 Interactive Labs (Funnel Calc + Objection Trainer + Pitch Builder) | 700 |
| 4/5 | إنشاء `page-accountmgr` كامل: KAM Lifecycle + Stakeholder Map + QBR + NRR Calc + Health Score | 800 |
| 5/5 | Iraq Salary Map + Career Ladder + Cheat Sheet + Citations + ربط localStorage progress | 200 |

اختم كل Phase بـ CHECKPOINT + STATE_SNAPSHOT.
