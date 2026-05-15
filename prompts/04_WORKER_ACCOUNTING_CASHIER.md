# 🧮 WORKER 04 — Accounting & Cashier Mastery (Iraq Tax & GAAP Edition)
> **متطلب مسبق:** MASTER PROMPT محمّل.
> **الصفحة المستهدفة:** `page-accounting` (تطوير + تعميق محلي).

---

## 🎯 الهدف

بناء أعمق وحدة محاسبة عربية موجهة للسوق العراقي — تشمل:
- **الأساسيات** (Accounting Equation, Double Entry, Trial Balance) بشرح بصري interactive
- **الدليل المحاسبي العراقي الموحد** (Iraqi Unified Chart of Accounts)
- **الضرائب العراقية** (ضريبة الدخل، الجمارك، الإقتطاعات الاجتماعية)
- **IFRS مقابل المحاسبة العراقية** — الفروقات العملية
- **مهارات الكاشير** (Loss Prevention, Cash Handling, Customer Flow)
- **معامل تفاعلية**: Income Statement Builder, Tax Calculator IQ, Petty Cash Reconciliation Game

---

## 📚 العمود الفقري المعرفي

### A. الأساسيات بشرح بصري (Interactive Visualizations)

#### 1. The Accounting Equation: **Assets = Liabilities + Equity**
أداة تفاعلية: 3 أعمدة بألوان مختلفة. عند إضافة معاملة (10 معاملات نموذجية)، تشوف الأعمدة تتحدث live مع شرح ليش.

#### 2. Double-Entry Book: T-Account Visualizer
تختار معاملة → تشوف أين تذهب (Debit/Credit) في الـ T-account المتأثر، مع تظليل الجانب الصحيح.

#### 3. الدورة المحاسبية (Accounting Cycle) — 9 خطوات
رسم دائري interactive (SVG) لكل خطوة:
1. تحليل المعاملات
2. قيد اليومية (Journal Entry)
3. الترحيل (Posting)
4. ميزان المراجعة (Trial Balance)
5. التسويات (Adjusting Entries)
6. ميزان مراجعة معدّل
7. القوائم المالية
8. القيود الختامية (Closing Entries)
9. ميزان مراجعة بعد الإقفال

كل خطوة عند click تفتح modal فيه: مثال عملي بأرقام عراقية.

### B. الدليل المحاسبي العراقي الموحد (الموجز)
جدول بـ accordion للحسابات الرئيسية (1xxx-5xxx) مع:
- الرقم
- الاسم بالعربي
- الاسم بالإنجليزي
- نوعه (Asset/Liability/Equity/Revenue/Expense)
- مثال عملي

### C. الضرائب العراقية (Iraq Tax — كتلة محورية)

#### 1. ضريبة الدخل على الرواتب — 2024-2025
شرائح:
| الشريحة (شهرياً IQD) | النسبة |
|---|---|
| ≤ 250,000 | معفى |
| 250,001 - 500,000 | 3% |
| 500,001 - 1,000,000 | 5% |
| > 1,000,000 | 15% |

**Tax Calculator IQ** — أداة تفاعلية:
- إدخال راتب إجمالي
- إدخال إعفاءات (متزوج، أولاد)
- يحسب الضريبة + الإقتطاع الاجتماعي (5% للموظف على القطاع الخاص)
- يطلع salary slip كامل بصيغة قابلة للطباعة

#### 2. ضريبة دخل الشركات
- 15% على شركات NLI
- ضريبة 35% على شركات النفط الأجنبية
- إقرارات ضريبية ربع سنوية + سنوية

#### 3. الجمارك العراقية (TARIC system) — لمحة سريعة
رسوم تتراوح 5%-30% حسب البند الجمركي.

#### 4. الزكاة (إن طُبّقت كالتزام داخلي)
2.5% من صافي الأصول المتداولة (استشارية فقط).

### D. القوائم المالية الأربع — Builder Interactive
1. **Income Statement Builder**
   - تدخل: الإيرادات، تكلفة المبيعات، المصاريف التشغيلية، المصاريف المالية
   - يولّد: Gross Profit, Operating Profit, Net Profit + هوامش %
   - Color-coded warnings لو الهامش منخفض جداً

2. **Balance Sheet Builder**
   - أصول متداولة + غير متداولة
   - التزامات قصيرة + طويلة الأجل
   - حقوق الملكية
   - Auto-check: Assets = Liab + Equity ✅/❌

3. **Cash Flow Statement** (إشارة + شرح، ليس builder كامل)
   - Operating, Investing, Financing
   - مثال عملي

4. **Statement of Changes in Equity**

### E. النسب المالية الأساسية (10 نسب)
بطاقات لكل نسبة:
- المعادلة
- ما تقيس
- النطاق المثالي
- مثال عراقي
1. Current Ratio
2. Quick Ratio (Acid-Test)
3. Debt-to-Equity
4. Gross Margin %
5. Net Margin %
6. ROA
7. ROE
8. Inventory Turnover
9. Days Sales Outstanding (DSO)
10. Working Capital Cycle

### F. IFRS vs محلي — جدول الفروقات العملية
| البند | IFRS | عراقي تقليدي | الأثر العملي |
|---|---|---|---|
| Inventory | LIFO ممنوع | LIFO مسموح | فرق في صافي الربح خلال التضخم |
| Revenue Recognition | IFRS 15 (5-step) | على الفاتورة | فرق timing |
| Leases | IFRS 16 (كل العقود في الميزانية) | تشغيلي خارج الميزانية | تأثير على D/E |
| Depreciation | متعدد الطرق | غالباً قسط ثابت | فرق في النفقات السنوية |

---

## 🛒 قسم الكاشير (Cashier Track)

### A. The Cashier Cycle — 6 مراحل
1. **Opening the Till** — count + log
2. **Customer Greeting** — eye contact + 3-second rule
3. **Scanning/Entry** — accuracy + speed balance
4. **Payment Processing** — cash/card/digital wallet
5. **Bagging & Receipt** — order + cross-sell
6. **Closing the Till** — reconciliation + variance report

### B. Cash Handling Best Practices (8 قواعد)
1. **Drawer Discipline** — لا تترك الدرج مفتوح
2. **Bill Verification** — UV light + texture check
3. **Counterfeit Detection** — علامات العملة العراقية الأمنية
4. **Change Counting Aloud** — يقلل الـ disputes
5. **Float Management** — حد أعلى في الدرج
6. **Skim Drops** — drop excess للخزينة كل ساعة
7. **Variance Threshold** — أقل من 5,000 IQD = OK، أكثر = تحقيق
8. **Two-Person Rule** — لإغلاق الكاش الكبير

### C. Loss Prevention — 12 مؤشر سرقة
- Sweethearting (تخفيض غير مصرح به للأهل)
- Refund Fraud
- Voids بدون مبرر
- No-Sale opens مكررة
- Receipt printing عشوائي
- Discount abuse
... كل واحد له تعريف + كيف يُكتشف.

### D. POS Systems الشائعة في العراق
- ميزات يجب توفرها
- تكامل مع المخزون
- تكامل مع المحاسبة
- أمثلة (Foodics, Loyverse, Zain Cash POS)

### E. Customer Service at Checkout
- Upsell/Cross-sell (Implicit techniques)
- Handling angry customers في الطابور
- إدارة المسنين/ذوي الاحتياجات

---

## 🇮🇶 Iraq Salary Block

| الدور | الراتب IQD | المؤهل |
|---|---|---|
| Junior Accountant (0-1y) | 600k - 900k | بكالوريوس محاسبة |
| Senior Accountant (3-5y) | 1.1M - 1.7M | + خبرة + شهادة CPA/IPA |
| Chief Accountant | 1.8M - 3M | + 7 سنوات + قيادة |
| Auditor (Public) | 1.5M - 4M+ | + شهادة + مكتب |
| Tax Consultant | 1.5M - 3.5M | + خبرة ضريبية |
| Cashier (Junior) | 450k - 650k | ثانوية + تدريب |
| Senior Cashier / Supervisor | 700k - 1.1M | + 3 سنوات |

شهادات مفيدة في السوق العراقي:
- IPA (المعهد العربي للمحاسبين القانونيين)
- CMA, CPA, ACCA (دولية)
- Iraq Tax Authority workshops

---

## 🧪 Interactive Labs

1. **Tax Calculator IQ** — كما وُصف
2. **Income Statement Builder** — كما وُصف
3. **T-Account Visualizer** — يأخذ معاملة ويوضح القيد
4. **Petty Cash Reconciliation Game** — drag-drop receipts to match the cash variance
5. **Counterfeit Detection Trainer** — صور fictional للعلامات الأمنية + اختبار

---

## 📋 PRE-FLIGHT

```
📋 PRE-FLIGHT CHECK
├─ Worker requested: 04 — Accounting & Cashier
├─ Phases planned: 5
├─ Estimated total lines: ~2,800
├─ Existing sections to preserve: page-accounting current header
├─ New sections to create: equation-visualizer, cycle-9-steps, iraqi-coa, tax-calculator-iq, statements-builders, ratios-cards, ifrs-vs-local, cashier-cycle, loss-prevention, pos-systems
├─ localStorage keys: upg_progress_acc, upg_tax_drafts, upg_statements_drafts
└─ Citations to include: 10+ (IFRS Foundation, Iraqi Tax Authority bulletins, IPA standards)
```

---

## 🧱 المراحل

| Phase | المحتوى | ~Lines |
|---|---|---|
| 1/5 | Accounting Equation Visualizer + T-Account + Cycle 9 Steps | 700 |
| 2/5 | Iraqi Chart of Accounts + IFRS vs Local + Ratios Cards | 600 |
| 3/5 | Tax Calculator IQ + Iraqi Tax tables + Salary Slip generator | 500 |
| 4/5 | Income Statement & Balance Sheet Builders + Cash Flow explainer | 500 |
| 5/5 | Cashier Track كامل (cycle, cash handling, loss prevention, POS, simulator) + Iraq Salary + Citations | 500 |

اختم كل Phase بـ CHECKPOINT + STATE_SNAPSHOT.
