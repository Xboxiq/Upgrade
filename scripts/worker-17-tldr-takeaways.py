#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════
Worker 17 / Phase 2 — TL;DR & Key Takeaways  (Pack v2 RESONANCE)
═══════════════════════════════════════════════════════════════════════
Wraps high-resonance blocks in platform/index.html with:
  - <aside class="block-tldr" data-tldr-for="X">  (sibling BEFORE block)
  - <ul    class="block-takeaways" data-takeaways-for="X">  (sibling AFTER block)
And AUGMENTS the block opening tag with data-reading-time="N".

Safety contract:
  - Idempotent: re-running does NOT duplicate asides/lists or reading-time.
  - Only ADDS siblings + 1 attribute. Never modifies block text content.
  - Skips silently if data-block-id not found.

Design:
  Per-block content authored MANUALLY in BLOCKS dict. No auto-generation.
  Each entry: id, type, diff (1-5), read (minutes), tldr, why, takeaways[].

Run:
    python3 scripts/worker-17-tldr-takeaways.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "platform" / "index.html"

# ────────────────────────────────────────────────────────────────────────
# Hand-authored content map.
# Each block's tldr/why/takeaways crafted from the block's actual content.
# ────────────────────────────────────────────────────────────────────────
BLOCKS = [
    # ─── 8 Calc blocks (page-opening calculators) ───
    {
        "id": "cc-001", "type": "calc", "diff": 3, "read": 3,
        "type_label": "حاسبة",
        "tldr": "مؤشر APIndex يدمج خمسة KPIs (AHT و FCR و CSAT و ADH و QA) في رقم واحد بمرجعية معيار COPC CX 6.2 — يكشف موقعك من المعيار في ثوانٍ.",
        "why": "بدون مؤشر مركّب، تتفاخر برقم واحد قويّ وتُهمل ثلاثة ضعاف.",
        "takeaways": [
            "AHT بين ٤ و٦ دقائق طبيعي — أقلّ ضغط، أكثر عجز.",
            "FCR ≥ ٧٥٪ هو الفارق بين كول-سنتر يخدم وكول-سنتر يدوّر.",
            "CSAT يقيس الشعور، QA يقيس الالتزام — مختلفان لا متعارضان.",
            "Adherence ٩٢-٩٥٪ أصحّ من ١٠٠٪ — احذر تحيّز الكمال.",
        ],
    },
    {
        "id": "fs-001", "type": "calc", "diff": 3, "read": 3,
        "type_label": "حاسبة",
        "tldr": "حاسبة عمولة المبيعات: تُدخل الراتب الأساسي ونموذج العمولة (flat / tiered / accelerator) فتظهر لك الدخل الشهري المتوقع وحساسيته للهدف.",
        "why": "العمولة تُفهم قبل التوقيع، لا بعد أول بيان راتب يفاجئك.",
        "takeaways": [
            "اطلب pay-mix محدد (مثلاً ٧٠/٣٠) قبل قبول العرض.",
            "Accelerator يكافئ التفوق، flat يكافئ الكمية.",
            "Quota تساوي خمسة أضعاف راتبك السنوي ≈ منطقي. عشرة = حرق.",
            "OTE ليس مضموناً — اقرأ شروط الاسترداد (clawback).",
        ],
    },
    {
        "id": "so-001", "type": "calc", "diff": 3, "read": 3,
        "type_label": "حاسبة",
        "tldr": "حاسبة A/B testing: تُحدِّد ما إذا كان الفرق بين متغيّرين دلالةً إحصائية أم ضوضاء عشوائية، بناءً على حجم العينة ومعدّل التحوّل.",
        "why": "بدون significance، تُعمِّم نتيجة مئة مستخدم على مئة ألف وتقع.",
        "takeaways": [
            "p-value < 0.05 يعني فرقاً موثوقاً به (٩٥٪ ثقة).",
            "حدّد حجم العينة قبل التجربة، لا بعدها.",
            "اختبر متغيّراً واحداً فقط لكل تجربة — وإلّا فقدتَ النسب.",
            "Lift صغير + sample كبير قد لا يستحق التطبيق — احسب ROI.",
        ],
    },
    {
        "id": "ps-001", "type": "calc", "diff": 3, "read": 4,
        "type_label": "حاسبة",
        "tldr": "مؤشّر OCEAN يقيس خمسة أبعاد للشخصية (Openness / Conscientiousness / Extraversion / Agreeableness / Neuroticism) بمعيار NEO-PI-R / IPIP الأكاديمي.",
        "why": "فهم شخصيتك يحدّد بأي دور تتفوق وأي بيئة عمل تستهلكك.",
        "takeaways": [
            "Conscientiousness أقوى مؤشر للأداء عبر كل المهن.",
            "Extraversion العالي ميزة في المبيعات، وقد يكون عبئاً في البرمجة.",
            "Neuroticism العالي يُنذر باحتراق وظيفي مبكّر — اعرفه.",
            "النتيجة طيف، لا تصنيف ثابت — قابلة للتطوّر بالوعي.",
        ],
    },
    {
        "id": "ng-001", "type": "calc", "diff": 3, "read": 4,
        "type_label": "حاسبة",
        "tldr": "محلّل ZOPA و BATNA من مدرسة هارفارد للتفاوض: تُدخل حدّك الأدنى وهدفك وعرضك الافتتاحي ليُظهر مساحة الاتفاق المحتملة وقوة موقفك التفاوضي.",
        "why": "BATNA المُحضَّر هو الفارق بين قبول ١٢٪ وانتزاع ٢٥٪.",
        "takeaways": [
            "اعرف Reservation قبل دخول الغرفة — لا تتفاوض عليه.",
            "Anchor الافتتاحي يحدِّد سقف التفاوض النفسي.",
            "ZOPA = تقاطع منطقة الطرفين. لا اتفاق بدونها.",
            "أقوى ورقة تفاوض هي القدرة الحقيقية على المغادرة.",
        ],
    },
    {
        "id": "pg-001", "type": "calc", "diff": 3, "read": 3,
        "type_label": "حاسبة",
        "tldr": "مُقدِّر تكلفة Big-O: تُدخل حجم المدخل وتعقيد الخوارزمية (O(1) → O(n!)) فتظهر تقدير عدد العمليات والوقت الفعلي على آلة حديثة.",
        "why": "اختيار خوارزمية O(n²) عند n=١٠٠٠٠ يعني الانتظار ساعة بدل ثانية.",
        "takeaways": [
            "O(log n) دائماً مقبول. O(n²) يجب تبريره.",
            "Hash map يحوّل O(n) إلى O(1) — استثمر في الذاكرة عند الحاجة.",
            "في المقابلات: اذكر التعقيد قبل كتابة الكود.",
            "Best/Average/Worst تختلف — تحدّث عن Worst افتراضياً.",
        ],
    },
    {
        "id": "ac-001", "type": "calc", "diff": 3, "read": 3,
        "type_label": "حاسبة",
        "tldr": "حاسبة ضريبة الدخل العراقية وفق قانون ١١٣: تُدخل الراتب الإجمالي فتظهر الشرائح المطبَّقة والضريبة المستحقة والصافي للموظف.",
        "why": "معرفة الصافي قبل توقيع العقد تمنحك ميزة تفاوضية حقيقية.",
        "takeaways": [
            "العراق يطبّق شرائح تصاعدية، لا نسبة موحَّدة.",
            "البدلات والمخصصات قد تُعفى أو تُحتسب — اسأل HR.",
            "الراتب الإجمالي ≠ الصافي. الفرق قد يصل ١٥-٢٠٪.",
            "استلام بيان راتب مفصَّل حقّك القانوني.",
        ],
    },
    {
        "id": "ac-002", "type": "calc", "diff": 3, "read": 3,
        "type_label": "حاسبة",
        "tldr": "بنّاء بيان الراتب: تُدخل الراتب الأساسي والبدلات والاستقطاعات فيُولِّد بيان راتب متكامل بالشكل الرسمي العراقي.",
        "why": "قراءة بيان الراتب مهارة لا يعلمونها — وتفاجأ كثيراً عند غيابها.",
        "takeaways": [
            "تأكد من تطابق الإجمالي مع العقد قبل أي شيء آخر.",
            "احفظ نسخة كل شهر — قد تحتاجها للقروض والتأشيرات.",
            "بدل النقل والسكن قد لا يدخلان الضريبة — تحقّق.",
            "خطأ في الاستقطاع يتراكم — راجع كل ربع سنة.",
        ],
    },

    # ─── 1 Cheat block ───
    {
        "id": "cc-069", "type": "cheat", "diff": 1, "read": 2,
        "type_label": "بطاقة مرجعية",
        "tldr": "بطاقة الأمان للكول سنتر — كل ما تحتاج جنب السماعة في ستين ثانية: الافتتاحية، Empathy Loop، أبعاد الصوت الخمسة، أهداف الـ KPI، وأفعال الطوارئ.",
        "why": "تحت الضغط، تنسى ما حفظت. هذي البطاقة تعيد ما لا يُنسى.",
        "takeaways": [
            "اطبعها واحتفظ بنسخة مطوية في درج المكتب.",
            "الافتتاحية ٥ ثوانٍ: سلام + شركة + اسم + سؤال مفتوح.",
            "Empathy Loop = AVRA: Acknowledge / Validate / Refocus / Action.",
            "Pace ١٤٠-١٦٠ كلمة بالدقيقة، Pause تكتيكي ٠.٤-٠.٨ ثانية.",
        ],
    },

    # ─── Page anchors / lessons ───
    {
        "id": "am-001", "type": "lesson", "diff": 2, "read": 2,
        "type_label": "درس",
        "tldr": "Sales Hunter يصطاد عملاء جدد على أفق ٣٠-٩٠ يوماً، Account Farmer يُنمّي العملاء القائمين على أفق ١-٣ سنوات. عقليتان مختلفتان جذرياً.",
        "why": "الانتقال بين الدورين صحّي، لكن خلطهما في نفس اللحظة كارثي.",
        "takeaways": [
            "Hunter يقاس بصفقات مغلقة و pipeline. Farmer بـ NRR و NPS.",
            "Hunter قد يفقد العميل بعد البيع. Farmer قد يخاف رفع السعر.",
            "اختر الدور بحسب شخصيتك، لا براتب أعلى مؤقتاً.",
            "بائع جيّد يعرف متى يحوّل ملفه من Hunter إلى Farmer.",
        ],
    },
    {
        "id": "cc-012", "type": "case", "diff": 3, "read": 3,
        "type_label": "تحليل نفسي",
        "tldr": "Vocal Mirroring (المرايا الصوتية) — عكس نبرة العميل وإيقاعه يُنشِّط Mirror Neurons في دماغه فيتولّد شعور لاواعي بالتشابه والثقة.",
        "why": "٣٨٪ من التواصل الصوتي مصدره النبرة لا الكلمات (Mehrabian 1967).",
        "takeaways": [
            "إذا كان العميل بطيئاً وهادئاً — خفّض وتيرتك.",
            "إذا متوتّر وسريع — تطابق ثم انزلق نحو هدوء يتبعك.",
            "لا تعكس اللهجة أو العيوب الكلامية أبداً — تحوّلها إلى Mocking.",
            "المرايا المبالغ فيها تُكشف بسرعة — اجعلها ذاتية لا واعية.",
        ],
    },
    {
        "id": "eq-005", "type": "case", "diff": 3, "read": 3,
        "type_label": "مجال EQ",
        "tldr": "الوعي الذاتي (Self-Awareness) — أوّل المجالات الخمسة في نموذج Goleman: معرفة مشاعرك وتأثيرها على أفعالك في الوقت الحقيقي، لا بعد الموقف.",
        "why": "ما لا تستطيع أن تسمّيه لا تستطيع أن تُديره — التسمية بداية التحكّم.",
        "takeaways": [
            "ابدأ بسؤال \"ما الذي أشعر به الآن؟\" قبل أي ردّ مهم.",
            "اكتب يومياً ثلاثة مشاعر لاحظتها — تنمو القدرة بالممارسة.",
            "الوعي بالذات يسبق ضبطها — لا قفز.",
            "الـ EQ يبدأ من الداخل قبل أن يُقاس بالخارج.",
        ],
    },
    {
        "id": "so-002", "type": "case", "diff": 3, "read": 4,
        "type_label": "مرحلة أزمة",
        "tldr": "المرحلة الأولى من الأزمة الرقمية — أوّل ساعتين: الاحتواء الفوري. التركيز على التوثيق وإبلاغ القيادة وإيقاف المنشورات المجدولة، لا على الردّ.",
        "why": "الردّ المتسرّع في أوّل ساعتين يضاعف الأزمة. الصمت أفضل من خطأ.",
        "takeaways": [
            "وثِّق المحتوى قبل أي حذف — الحذف يُشعل الأزمة.",
            "أوقف فوراً كل المنشورات المجدولة لأي قناة.",
            "راقب الـ hashtags و mentions كل ١٥ دقيقة.",
            "لا ترُدّ دفاعياً، ولا تلقِ اللوم على آخرين.",
        ],
    },
    {
        "id": "pr-001", "type": "lesson", "diff": 2, "read": 2,
        "type_label": "أساس",
        "tldr": "قانون أوم: V = I × R. كل ما يحدث في دارة كهربائية يُفسَّر بهذي العلاقة الثلاثية بين الجهد والتيّار والمقاومة.",
        "why": "بدون فهم أوم، تصلح الموبايل بالحظّ. بفهمه، تصلحه بالمنطق.",
        "takeaways": [
            "Voltage يُقاس بالـ Multimeter في وضع DCV.",
            "Current يقاس بالميلي أمبير على الموبايلات عادةً.",
            "P = V × I تحسب استهلاك الطاقة الفعلي.",
            "صفر فولت على pin يجب أن يعطي ١.٨ فولت = PMIC تالف أو short.",
        ],
    },

    # ─── 6 Micro-soldering cases (pr-041..046) ───
    {
        "id": "pr-041", "type": "case", "diff": 4, "read": 4,
        "type_label": "حالة متقدّمة",
        "tldr": "لماذا Micro-Soldering — الفرق التجاري: ٨٠٪ من المحلات تتوقّف عند \"Board damage = جهاز خربان\". أنت تستطيع إصلاحه = ربح مضاعَف.",
        "why": "إتقان micro-soldering يفتح طبقة دخل لا يصلها أكثر الفنيين.",
        "takeaways": [
            "الإصلاحات الممكنة: Tristar, Audio IC, NAND, Touch IC, Backlight.",
            "الاستثمار: مجهر جيّد + Hot Air متقدم + Hakko/JBC.",
            "الإتقان يحتاج ٦ أشهر للأساسيات، ٢-٣ سنوات للخبرة.",
            "ابدأ بإصلاحات رخيصة قبل لمس board ثمين.",
        ],
    },
    {
        "id": "pr-042", "type": "case", "diff": 4, "read": 4,
        "type_label": "سلامة",
        "tldr": "السلامة في Micro-Soldering ليست رفاهية: الـ leaded solder سامّ، أبخرة Flux تؤذي الرئتين، Hot Air ٣٥٠°C يحرق فوراً.",
        "why": "أصابعك ورئتاك وعيناك تستحق Fume Extractor و Safety Glasses.",
        "takeaways": [
            "اغسل يديك دائماً قبل الأكل — ولا تأكل في مكان العمل.",
            "Fume Extractor ضروري — ليس اختيارياً.",
            "Safety Glasses عند كل reflow — splatter يحدث.",
            "تهوية جيدة، لا غرفة مغلقة. القطع المحمّاة تحرق فوراً.",
        ],
    },
    {
        "id": "pr-043", "type": "case", "diff": 4, "read": 4,
        "type_label": "مهارات أساس",
        "tldr": "خمس مهارات أساسية للبدء: Tinning Wire، Pad Cleaning، BGA Reflow، BGA Reballing، Jumper Wire. كل منها يحتاج ممارسة على board تالف قبل board زبون.",
        "why": "تعلّم على الخراب ثم تكسب من السليم — العكس مكلف.",
        "takeaways": [
            "Tinning سلك ٠.٣mm بـ ٠.٤mm سيد = أساس كل شيء.",
            "Solder Wick + Flux ينظّفان pad سيء بدون lifting.",
            "BGA Reflow = ٣٨٠°C لمدة ٣٠-٤٥ ثانية.",
            "Jumper Wire ٠.٠٥mm enameled يصلح traces مكسورة.",
        ],
    },
    {
        "id": "pr-044", "type": "case", "diff": 4, "read": 3,
        "type_label": "مصادر تعلم",
        "tldr": "أفضل مصادر التعلم في micro-soldering: Louis Rossmann و iPad Rehab (Jessa Jones) و Mendon's iPad Repair — مع أكاديميات الكرادة المحلية.",
        "why": "اليوتيوب فيه ذهب — لكن المسار المنظَّم يختصر سنوات.",
        "takeaways": [
            "Louis Rossmann: مئات الفيديوهات المجانية الأشهر عالمياً.",
            "iPad Rehab متخصصة في NAND و iPhone.",
            "Mendon's يعطي خطوة بخطوة بصيغة درس.",
            "محلياً: أكاديميات الكرادة الداخل (٣-٦ أشهر).",
        ],
    },
    {
        "id": "pr-045", "type": "case", "diff": 4, "read": 4,
        "type_label": "إصلاحات شائعة",
        "tldr": "أكثر إصلاحات Micro-Soldering طلباً: Tristar Replacement (iPhone 6/7)، Audio IC Jumper (iPhone 7)، Backlight Circuit، Charging Port Daughter Board (Samsung).",
        "why": "هذي الإصلاحات تحوّل مجموعة موتى ربحية إلى مصدر دخل ثابت.",
        "takeaways": [
            "Tristar الأكثر طلباً: قطعة ٥k، السعر للزبون ٨٠-١٥٠k.",
            "Audio IC iPhone 7: jumper U3101 RQ_C18 يحلّ loop disease.",
            "Backlight: diode + filter + boost coil — شاشة ميتة لكن العرض موجود.",
            "Charging Port Samsung = أسهل إصلاح متقدّم.",
        ],
    },
    {
        "id": "pr-046", "type": "case", "diff": 4, "read": 3,
        "type_label": "حدود",
        "tldr": "ما لا تحاوله بدون تدريب: CPU Reball، NAND Upgrade، PMIC Replacement على iPhone 11 فما فوق. قاعدة ذهبية: لو خسارة الجهاز لا تعوّض، لا تلمسه.",
        "why": "الفنّي الناضج يعرف ما لا يعرف — هذي ميزة لا عيب.",
        "takeaways": [
            "CPU Reball: خطأ واحد يتلف الـ board كاملاً.",
            "NAND Upgrade يحتاج programmer ٣٠٠$+ وخبرة طويلة.",
            "PMIC iPhone 11 تحت EMI shield ملحوم — صعب جداً.",
            "ادفع لزميل أخبر بدل أن تخسر جهاز زبون.",
        ],
    },

    # ─── 6 Ethics cases (pr-053..058) ───
    {
        "id": "pr-053", "type": "case", "diff": 4, "read": 3,
        "type_label": "محذور قانوني",
        "tldr": "تعديل IMEI جريمة بالقانون العراقي رقم ٦٥ لسنة ٢٠٠٤ وأكثر القوانين العالمية. الزبون الذي يطلب التعديل يحمل غالباً جهازاً مسروقاً.",
        "why": "محلّك يُغلَق ومستقبلك يُسجَن لأجل قطعة ٢٠ ألف.",
        "takeaways": [
            "ارفض بأدب وحزم: \"آسف، هذا غير قانوني\".",
            "اطلب من الزبون مغادرة المحل بهدوء.",
            "لا تخزّن أي tool لتعديل IMEI.",
            "وثِّق طلبه (موعد، رقم) إن كان مريباً.",
        ],
    },
    {
        "id": "pr-054", "type": "case", "diff": 4, "read": 3,
        "type_label": "محذور قانوني",
        "tldr": "iCloud Lock / FRP Bypass — تجاوز قفل الحساب على جهاز ليس لك = مشاركة في سرقة مهما كان السبب الذي يقدّمه الزبون.",
        "why": "الجهاز المقفول حساباً ليس \"تالفاً\" — هو جهاز شخص آخر.",
        "takeaways": [
            "اطلب فاتورة شراء أصلية + Apple ID وكلمة المرور.",
            "لو نسي كلمة السر — وجِّهه لـ Apple Support.",
            "لا تستخدم أي tool يكسر iCloud activation lock.",
            "اشرح للزبون لماذا الرفض حماية له قبل أن يكون لك.",
        ],
    },
    {
        "id": "pr-055", "type": "case", "diff": 4, "read": 3,
        "type_label": "خصوصية",
        "tldr": "بيانات الزبون مقدّسة. لا تفتح Gallery، لا تتصفّح الرسائل، ولا تستخدم كلمة المرور إلا لاختبار الإصلاح فقط.",
        "why": "الفضول يُفقدك الزبون ومحلّك ومهنتك في يوم واحد.",
        "takeaways": [
            "كلمة المرور تُستخدم فقط لاختبار، ثم تُنسى.",
            "Wipe البيانات يحتاج إذناً مكتوباً من الزبون.",
            "لا تنسخ بيانات لأي نسخة احتياطية بدون طلب صريح.",
            "اعتبر كل جهاز كأنّه يحوي أسراراً ليست لك.",
        ],
    },
    {
        "id": "pr-056", "type": "case", "diff": 4, "read": 3,
        "type_label": "إفصاح",
        "tldr": "أفصح للزبون عن نوع القطعة قبل التركيب: OEM (أصلية)، Pulled (مسحوبة)، Aftermarket (طرف ثالث)، Refurbished (مجدَّدة). بيع Aftermarket على أنها OEM = احتيال.",
        "why": "السمعة تُبنى في عشر سنوات وتنهار في خمس دقائق.",
        "takeaways": [
            "OEM = أصلية مصنع، أعلى سعر، أعلى جودة.",
            "Pulled = أصلية مستعملة من جهاز سليم.",
            "Aftermarket = طرف ثالث، أرخص بكثير، جودة متفاوتة.",
            "اكتب نوع القطعة على الفاتورة دائماً.",
        ],
    },
    {
        "id": "pr-057", "type": "case", "diff": 4, "read": 3,
        "type_label": "بروتوكول",
        "tldr": "إذا شككت أن الجهاز مسروق: اطلب فاتورة أصلية، اسأل عن iCloud/Google credentials، ولو رفض الزبون — اطلب منه مغادرة المحل.",
        "why": "كل جهاز مسروق تصلحه يُلوِّث سمعتك ومحلّك ومجتمعك.",
        "takeaways": [
            "الفاتورة الأصلية شرط لكل إصلاح ثقيل.",
            "صاحب الحساب يفتح الحساب أمامك في المحل.",
            "وثِّق رقم الزبون والوقت والموديل عند الشكّ.",
            "ثقتك بحدسك جزء من مهنيتك.",
        ],
    },
    {
        "id": "pr-058", "type": "case", "diff": 4, "read": 3,
        "type_label": "موافقة",
        "tldr": "إذا الإصلاح يتطلّب wipe (مثل DFU restore): اشرح للزبون قبل البدء أن البيانات ستضيع، اطلب توقيعه على نموذج موافقة، واعرض backup إن أمكن.",
        "why": "نموذج الموافقة الموقَّع يحميك قانونياً ويبني ثقة طويلة.",
        "takeaways": [
            "اشرح الـ wipe بكلمات بسيطة لا بمصطلحات.",
            "نموذج الموافقة المكتوب أهم من شفاهي ١٠ مرات.",
            "اعرض backup ولو بسعر إضافي — قيمة للزبون.",
            "احفظ النماذج موقّعة لمدة سنتين على الأقل.",
        ],
    },
]

# ────────────────────────────────────────────────────────────────────────
# HTML helpers
# ────────────────────────────────────────────────────────────────────────

# Tags whose nesting we track (block-level).
TRACKED_TAGS = ("div", "article", "section", "aside", "header", "ul", "ol", "table")


def find_block_open_line(lines, block_id):
    """Return (idx, indent) of the line containing data-block-id="X"."""
    needle = f'data-block-id="{block_id}"'
    for i, line in enumerate(lines):
        if needle in line:
            indent = re.match(r"\s*", line).group(0)
            return i, indent
    return -1, ""


def detect_open_tag(line):
    """Detect the tag name of the FIRST opening tag on a line (e.g. 'div')."""
    m = re.search(r"<([a-zA-Z][a-zA-Z0-9]*)\b", line)
    return m.group(1).lower() if m else None


def find_close_idx(lines, start_idx, tag):
    """
    Walk from start_idx, balancing <tag>/<\\tag>, return index of line where depth hits 0.
    Counts only the matching tag name (handles nested same-tag).
    """
    open_re = re.compile(rf"<{tag}\b", re.IGNORECASE)
    close_re = re.compile(rf"</{tag}>", re.IGNORECASE)
    depth = 0
    for i in range(start_idx, len(lines)):
        line = lines[i]
        # Skip self-closing detection — none of TRACKED_TAGS self-close.
        opens = len(open_re.findall(line))
        closes = len(close_re.findall(line))
        depth += opens - closes
        if depth == 0:
            return i
    return -1


def stars(diff):
    return "⭐" * max(1, min(5, int(diff)))


def build_aside(entry, indent):
    star_str = stars(entry["diff"])
    aria = f"صعوبة {entry['diff']} من 5"
    body = entry["tldr"].strip()
    why = entry["why"].strip()
    label = entry["type_label"]
    bid = entry["id"]
    rt = entry["read"]
    rt_label = "دقيقة قراءة" if rt == 1 else "دقيقتان للقراءة" if rt == 2 else f"{rt} دقائق قراءة"

    lines = [
        f'{indent}<aside class="block-tldr" data-tldr-for="{bid}" aria-label="ملخص سريع">',
        f'{indent}  <header class="block-tldr-h">',
        f'{indent}    <span class="block-tldr-eyebrow type-eyebrow">{label}</span>',
        f'{indent}    <span class="block-tldr-meta">',
        f'{indent}      <span class="block-tldr-time" data-reading-time="{rt}">{rt_label}</span>',
        f'{indent}      <span class="block-tldr-diff" aria-label="{aria}">{star_str}</span>',
        f'{indent}    </span>',
        f'{indent}  </header>',
        f'{indent}  <p class="block-tldr-body type-body-lead">{body}</p>',
        f'{indent}  <p class="block-tldr-why type-quote-literary"><strong>لماذا يهم:</strong> {why}</p>',
        f'{indent}</aside>',
    ]
    return lines


def build_takeaways(entry, indent):
    bid = entry["id"]
    items = entry["takeaways"]
    lines = [
        f'{indent}<ul class="block-takeaways" data-takeaways-for="{bid}" aria-label="نقاط مفتاحية للاسترجاع">',
    ]
    for t in items:
        lines.append(f'{indent}  <li class="block-takeaway type-body">{t.strip()}</li>')
    lines.append(f'{indent}</ul>')
    return lines


def augment_reading_time(line, rt):
    """If the line has data-block-id but no data-reading-time, add it. Idempotent."""
    if "data-reading-time=" in line:
        return line
    # Insert immediately after data-block-id="..." attribute.
    new_line, n = re.subn(
        r'(data-block-id="[^"]+")',
        rf'\1 data-reading-time="{rt}"',
        line,
        count=1,
    )
    return new_line if n > 0 else line


# ────────────────────────────────────────────────────────────────────────
# Main pass
# ────────────────────────────────────────────────────────────────────────

def main():
    src = HTML.read_text(encoding="utf-8")
    lines = src.split("\n")

    inserted = 0
    skipped_idempotent = 0
    skipped_missing = 0
    rt_added = 0

    for entry in BLOCKS:
        bid = entry["id"]
        rt = entry["read"]

        # 1) Locate block opening line
        idx, indent = find_block_open_line(lines, bid)
        if idx < 0:
            print(f"  ! missing block: {bid}", file=sys.stderr)
            skipped_missing += 1
            continue

        # 2) Idempotent guard — check the line ABOVE for our aside marker
        if idx > 0 and f'data-tldr-for="{bid}"' in lines[idx - 1]:
            skipped_idempotent += 1
            # still ensure data-reading-time present
            new_line = augment_reading_time(lines[idx], rt)
            if new_line != lines[idx]:
                lines[idx] = new_line
                rt_added += 1
            continue
        # Also check up to 12 lines above (the aside spans 11 lines)
        upper = max(0, idx - 13)
        if any(f'data-tldr-for="{bid}"' in l for l in lines[upper:idx]):
            skipped_idempotent += 1
            new_line = augment_reading_time(lines[idx], rt)
            if new_line != lines[idx]:
                lines[idx] = new_line
                rt_added += 1
            continue

        # 3) Detect tag and find matching close
        tag = detect_open_tag(lines[idx])
        if not tag:
            print(f"  ! cannot detect tag for: {bid}", file=sys.stderr)
            continue
        close_idx = find_close_idx(lines, idx, tag)
        if close_idx < 0:
            print(f"  ! cannot find close for: {bid} ({tag})", file=sys.stderr)
            continue

        # 4) Build asides
        aside_lines = build_aside(entry, indent)
        ul_lines = build_takeaways(entry, indent)

        # 5) Augment data-reading-time on the block opening line
        new_open = augment_reading_time(lines[idx], rt)
        if new_open != lines[idx]:
            lines[idx] = new_open
            rt_added += 1

        # 6) Insert: ul AFTER close_idx, aside BEFORE idx (do AFTER first to keep indices)
        lines = lines[: close_idx + 1] + ul_lines + lines[close_idx + 1 :]
        lines = lines[:idx] + aside_lines + lines[idx:]
        inserted += 1

    HTML.write_text("\n".join(lines), encoding="utf-8")

    print(f"  ✓ inserted        : {inserted}")
    print(f"  ↻ idempotent skip : {skipped_idempotent}")
    print(f"  ⚠ missing blocks  : {skipped_missing}")
    print(f"  ⏱ reading-time    : {rt_added} added")
    print(f"  Σ blocks in map   : {len(BLOCKS)}")


if __name__ == "__main__":
    main()
