#!/usr/bin/env python3
# ════════════════════════════════════════════════════════════════
# RESONANCE v2 — Worker 17 / Phase 3 — Pitfalls & Diagnostics
# ────────────────────────────────────────────────────────────────
# Idempotent injector: WRAPS each target block with a sibling
# <details class="block-pitfalls"> AFTER the block (and after the
# block-takeaways list when present, since that's the canonical
# order: aside(tldr) → block → ul(takeaways) → details(pitfalls)).
#
# 28 high-impact pitfalls authored by hand:
#   - 6× pr-041..pr-046  (micro-solder discipline)
#   - 6× pr-053..pr-058  (repair ethics — "أين يفشل الناس؟")
#   - 5× hr-035..hr-039  (HR/negotiation traps)
#   - 11× page anchors   (cc/fs/am/so/ng/ac/eq/ps/pg)
# ════════════════════════════════════════════════════════════════

from __future__ import annotations
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "platform" / "index.html"

# ─── Hand-authored content (28 blocks) ──────────────────────────
# Each entry:
#   id        block id
#   title     summary headline (Arabic, ≤8 words)
#   mistakes  list[str] — 3-7 concrete pitfalls (≤18 words each)
#   diagnostic list[str] — 4-6 self-mirror signs
#   iraqi     str | None — Iraqi market footnote (1-2 sentences)
PITFALLS = [
    # ═══ Micro-soldering (pr-041 to pr-046) ═══
    {
        "id": "pr-041",
        "title": "أخطاء حرارة الـ Hot Air",
        "mistakes": [
            "ترفع الحرارة فوق 380°C ظنّاً أنها تُذيب أسرع — تُلوي الـ PCB وتقتل الـ pads.",
            "تُقرّب الفوهة من الـ IC أقل من 1سم — فتُحرق الـ resin والمكونات المجاورة.",
            "تنسى تغطية الـ ICs الحساسة (eMMC, NAND) — حرارة جانبية كافية لتعطيلها.",
            "تستعجل الـ preheat — فالـ PCB يتمدد لحظياً ويكسر الـ vias.",
            "تستخدم تدفّق هواء ضعيف (level 3) فتُسخّن العنصر بلا تذويب نظيف."
        ],
        "diagnostic": [
            "الـ pads تُسحب مع الـ IC عند الرفع → حرارتك زائدة أو رفعت قبل الذوبان.",
            "PCB ينحني لمسة لمسة → preheat غير كافٍ.",
            "العنصر المجاور يتفكك معك → ما عزلت الـ heat-shield.",
            "رائحة محترقة بعد الـ rework → أحرقت طبقة الـ solder mask."
        ],
        "iraqi": "في الورش العراقية الـ Hot Air يُستخدم لكل شيء — حتى لشحم البطارية. هذا خطأ. كل قطعة لها profile حراري مختلف، استخدم datasheet المُصنّع لا الذاكرة."
    },
    {
        "id": "pr-042",
        "title": "BGA Reballing — مزالق الدقّة",
        "mistakes": [
            "تستخدم stencil مهترئ — فالـ balls تطلع غير متساوية وتفشل الـ reflow.",
            "تنسى تنظيف الـ pads بـ flux + braid قبل وضع الـ stencil — bridges مضمونة.",
            "ترفع الـ stencil قبل تبريد الـ balls — تُسحب البعض معها.",
            "تستخدم solder paste منتهي الصلاحية — flux يتأكسد و balls شكلها غير مكتمل.",
            "تُسرّع cooling بمروحة — micro-cracks خفية تظهر بعد أسابيع."
        ],
        "diagnostic": [
            "iPhone يقلع ثم يتجمد بعد 5 دقائق → cold joint في BGA الـ CPU.",
            "Wi-Fi/Bluetooth يختفي مع الحرارة → reball الـ WiFi IC غير مستوي.",
            "تظهر balls ناقصة عند الفحص بالميكروسكوب → stencil pads مسدودة.",
            "الجهاز يعمل في المختبر ويفشل عند الزبون → micro-crack من cooling سريع."
        ],
        "iraqi": "أغلب reball iPhone في بغداد يفشل بعد 30 يوم لأن الفنّي يستخدم paste تركي رخيص. استثمر في paste أصلي (Mechanic / Amaoe) — الفرق $5 يوفّر لك سمعتك."
    },
    {
        "id": "pr-043",
        "title": "Underfill — متى يصبح عدوّك",
        "mistakes": [
            "تضع underfill على CPU سليم — أصبح غير قابل للفك مستقبلاً.",
            "تُسخّن قبل أن يجفّ كاملاً — فقاعات هواء تحت الـ chip → فشل عشوائي.",
            "تستخدم underfill رخيص بلا دلائل CTE — ينكمش ويسحب الـ pads معه.",
            "تطبق طبقة سميكة جداً — تمنع التبريد وتسبب thermal throttling."
        ],
        "diagnostic": [
            "الجهاز يعمل بضرب خفيف → underfill ضعيف، CPU يتحرك مع الـ vibrations.",
            "حرارة CPU زادت 10°C بعد الـ rework → الطبقة سميكة.",
            "فقاعات مرئية تحت الـ IC بـ infrared → سخّنت قبل الجفاف."
        ],
        "iraqi": None
    },
    {
        "id": "pr-044",
        "title": "Tin/Lead vs Lead-Free Confusion",
        "mistakes": [
            "تخلط بين Sn63/Pb37 و SAC305 على نفس الـ board — درجات ذوبان مختلفة، joints هشّة.",
            "تستعمل lead-free على iPhone قديم (Pre-2006) — الجهاز مُصمم لـ leaded، اختلاف intermetallic.",
            "تنسى أن lead-free يحتاج 30°C زيادة — تُذيبه ناقصاً فيُعطي cold joint.",
            "تتعامل مع Pb بلا تهوية — تسمم تراكمي بطيء."
        ],
        "diagnostic": [
            "joints تبدو مطفية ومتشققة → lead-free لم يصل لدرجة الذوبان الكاملة.",
            "joints لامعة جداً + رمادية → leaded سليم.",
            "صداع متكرر في الورشة → سوء تهوية + رصاص."
        ],
        "iraqi": "أكثر من 80% من ورش بغداد ما عندها فاكيوم ولا فلتر هواء. اشتري fume extractor بـ HEPA — سعره $80 ويحميك من تسمم تراكمي خلال سنين."
    },
    {
        "id": "pr-045",
        "title": "Magnification — أخطاء الميكروسكوب",
        "mistakes": [
            "تعمل تحت 10x فقط — تفوّت micro-cracks وتُتلف pads بدون أن ترى.",
            "إضاءة LED مباشرة على PCB — تُشوّش على عينك وتكتشف cold joint كأنه سليم.",
            "تنسى تنظيف العدسة من flux fumes — صورة ضبابية تُضلّل قراءة joints.",
            "تستخدم stereo بـ working distance قصيرة — يدك ترتجف لعدم وجود مساحة."
        ],
        "diagnostic": [
            "تُعيد نفس rework 3 مرات → ما تشوف العيب الفعلي.",
            "عيناك تتعب بعد 20 دقيقة → الإضاءة سيئة.",
            "تتحاشى الـ rework الدقيق → الأداة قاصرة، ليس أنت."
        ],
        "iraqi": None
    },
    {
        "id": "pr-046",
        "title": "Soldering Iron — العادات السيئة",
        "mistakes": [
            "تترك tip ساخن بلا tin > 30 ثانية — يتأكسد ولا يمسك القصدير بعدها.",
            "تنظف tip على wet sponge بارد — صدمة حرارية تكسر الـ tip بمرور الوقت.",
            "تستخدم نفس tip لكل المهام — gauge كبير على pads صغيرة = حرق.",
            "ترفع الـ iron بعد ثانية من اللمس — الذوبان غير مكتمل، cold joint مضمون."
        ],
        "diagnostic": [
            "tip أصبح أسود وما يلتصق به القصدير → تأكسد، طبقة الـ iron-plating تالفة.",
            "تحتاج 5 ثوانٍ ليذوب القصدير → الحرارة منخفضة أو tip متآكل.",
            "joints تبدو حبيبية → قصدير قديم أو tip بارد."
        ],
        "iraqi": None
    },
    # ═══ Repair Ethics (pr-053..pr-058) ═══
    {
        "id": "pr-053",
        "title": "Right-to-Repair — تجاهلها يُكلّفك",
        "mistakes": [
            "ترفض إعطاء الزبون حقّ معرفة العطل — يفقد الثقة ويذهب للورشة المجاورة.",
            "تخفي أن البطارية مُعاد تجميعها — مشكلة قانونية إذا انفجرت.",
            "تكسر screws ذات tamper-proof بدون تنبيه — سقطت ضمانة المُصنّع وأنت المسؤول.",
            "تستبدل قطعة بـ aftermarket بلا إذن — خرق صريح لاتفاق الإصلاح."
        ],
        "diagnostic": [
            "الزبون يشتكي بعد أسبوع لأنه اكتشف القطعة غير أصلية → ضعف توضيح.",
            "تتلقى مكالمات تهديد قانوني → خرقت الـ disclosure.",
            "Reviews سلبية تتكرر بنفس النبرة → مشكلة في الشفافية لا الجودة."
        ],
        "iraqi": "في العراق ما في قانون right-to-repair واضح، لكن السمعة في الباجة أو الكرّادة تُبنى على الكلام. زبون واحد يحكي عن غش = خسارة 20 زبون."
    },
    {
        "id": "pr-054",
        "title": "Privacy — البيانات أمانة",
        "mistakes": [
            "تتصفّح صور الزبون لـ \"التأكد أن الجهاز يشتغل\" — انتهاك صريح للخصوصية.",
            "تأخذ نسخة احتياطية بدون إذن مكتوب — سرقة بيانات قانونياً.",
            "تترك الجهاز مفتوحاً على المنضدة بـ pattern معروف — أي زميل يصل لكل شيء.",
            "تنسى factory-reset قبل تسليم القطع المستبدلة — البيانات في eMMC المُستخرج."
        ],
        "diagnostic": [
            "الزبون يسألك عن صور محذوفة → تصفّحت ولم تنتبه أن last-viewed تتغير.",
            "حادثة تسريب من ورشتك → حماية الجهاز فيها ضعف.",
            "تتجنب الـ password test مع الزبون أمامك → عندك ما تخفيه."
        ],
        "iraqi": "في بغداد، \"قطعت كارت يا أخوي\" أصبحت كذبة معروفة. الورش الموثوقة تطلب من الزبون تسجيل صور قبل التسليم وتمسحها أمامه عند الاستلام."
    },
    {
        "id": "pr-055",
        "title": "تسعير عادل أم مُبالغ",
        "mistakes": [
            "تضاعف السعر لأن الزبون لا يفهم — يكتشف يوماً ويرحل + يُحذّر العشرات.",
            "تُخفّض جداً لمنافسة الورش الأخرى — تخسر، وتنخفض جودتك تلقائياً.",
            "تتقاضى \"كشف\" مرتفع ثم يرفض الإصلاح — يشعر بالاستغلال ولا يعود.",
            "تنسى توثيق التكلفة قبل البدء — نزاع شبه مضمون عند التسليم."
        ],
        "diagnostic": [
            "الزبون يُساوم بشدة → سعرك مرتفع عن السوق أو لم تُبرّر القيمة.",
            "زبائن يأتون مرة واحدة فقط → خسرت الثقة على السعر.",
            "الجمعة عندك زبائن قليلون مقارنة بمنافسيك → السمعة السعرية تالفة."
        ],
        "iraqi": "متوسط تكلفة شاشة iPhone 12 في بغداد $50-70 مع الفك، أكثر = استغلال، أقل = aftermarket. اعرض نموذجين بسعرين واترك القرار للزبون."
    },
    {
        "id": "pr-056",
        "title": "أصلية vs مُجدّدة — كذبة شائعة",
        "mistakes": [
            "تبيع شاشة OEM-refurbished على أنها new-original — احتيال ثقيل.",
            "تستخدم battery من iPhone مفكوك وتقولها أصلية — تنفجر بعد شهرين.",
            "تخفي أن الـ camera assembly من جهاز ميت — fingerprint scanner لن يعمل بعد iOS update.",
            "تطبع بطاقة \"original\" على قطع Shenzhen rebranded."
        ],
        "diagnostic": [
            "الزبون يلاحظ True Tone اختفى بعد \"شاشة أصلية\" → الـ EEPROM ما تم نقله.",
            "Face ID يفشل بعد camera replacement → القطعة من جهاز آخر.",
            "البطارية تفقد 20% قدرة في شهر → مُجدّدة بلا تحديث."
        ],
        "iraqi": "في الكرّادة، 9 من 10 محلات يكذبون عن \"أصلية\". كن العاشر — اعرض IMEI الجهاز الأصلي للقطعة، أو وضّح \"OEM-grade\" بصراحة. الزبون الذكي سيُكافئك."
    },
    {
        "id": "pr-057",
        "title": "حدود اختصاصك — اعرف متى ترفض",
        "mistakes": [
            "تقبل board-level repair بلا أدوات micro-solder — تُتلف الـ board بدل إصلاحه.",
            "تحاول data recovery من eMMC ميت بلا ProMan — تخسر البيانات نهائياً.",
            "تفتح iPad Pro بلا فهم Face ID pairing — أنت مسؤول عن $400 قطعة عاطلة.",
            "تتعامل مع water damage بلا ultrasonic cleaner — الكوروزن يستمر تحت الـ ICs."
        ],
        "diagnostic": [
            "ترفض 1 من كل 10 إصلاحات → غالباً تقبل أكثر مما تستطيع.",
            "تكثر شكاوى \"كان أحسن قبل ما أوديه\" → تجاوزت اختصاصك.",
            "تشتغل لساعات على عطل بسيط → الأداة أو المعرفة ناقصة."
        ],
        "iraqi": "الفنّي العراقي الجيد يعرف يقول \"هذا غير اختصاصي، خذه فلان\" — هذا التواضع يبني سمعة. الورش التي تقبل كل شيء تخسر سمعتها بعد سنة."
    },
    {
        "id": "pr-058",
        "title": "Warranty — الكلمة المنسية",
        "mistakes": [
            "ما تكتب ضمانة على الفاتورة — كل خلاف يصبح كلمة ضد كلمة.",
            "تعطي ضمانة 6 أشهر على البطارية وتنسى استثناءات الـ misuse — الزبون يطالب بكل شيء.",
            "تُغطّي الـ aftermarket بنفس مدة الـ original — تخسر مالياً.",
            "ترفض احترام الضمانة بحجج (\"تعرضت للماء\") بلا دليل — review مدمّر."
        ],
        "diagnostic": [
            "نزاعات شهرية حول الضمانة → التوثيق الأول كان ضعيف.",
            "تكثر طلبات \"إصلاح ثاني مجاناً\" بعد 7 أيام → الجودة الأولى فاشلة لا الضمانة.",
            "الزبائن يخفون أنهم أتلفوا الجهاز → ضمانتك واسعة جداً."
        ],
        "iraqi": "اطبع نموذج فاتورة فيها بنود ضمانة واضحة (مدة، ما يشمل، ما لا يشمل، شرط الفحص قبل الإرجاع). كلفته $5 طباعة، يحميك سنين."
    },
    # ═══ HR Mastery (hr-035..hr-039) ═══
    {
        "id": "hr-035",
        "title": "Salary Negotiation — لا تفعل أبداً",
        "mistakes": [
            "تطرح رقماً قبل أن يطرحوا — تخسر anchor وتُكشف.",
            "تقول \"I really need this job\" — ينزلون السقف فوراً.",
            "تفاوض على البيس فقط متجاهلاً bonus + equity + vacation.",
            "ترفض الـ counter-offer بدون شُكر — تحرق الجسر إذا فشلت في مكان آخر.",
            "تكشف عرضك من شركة أخرى بدقّة — يستخدمونه ضدك."
        ],
        "diagnostic": [
            "بعد المقابلة تشعر أنك \"بعت نفسك\" بسعر زهيد → ما طلبت benchmark.",
            "تُقابل ولا يتصلون بك ثانية → أعطيت رقم خارج النطاق.",
            "تقبل العرض الأول دائماً → خوف عميق من الرفض."
        ],
        "iraqi": "الراتب في بغداد يُذكر بلا دولار/دينار في 30% من المقابلات — اطلب التوضيح كتابةً. \"$1500\" مختلف عن \"1500 ألف دينار\" بفارق 100x."
    },
    {
        "id": "hr-036",
        "title": "Resume — السطر الأول يقتلك",
        "mistakes": [
            "تكتب \"Dynamic / Hard-working / Team Player\" — حرف ميت، ATS يتجاهله.",
            "تذكر مسؤوليات بدلاً من نتائج — \"managed team\" ضعيف، \"led team of 8 to 30% growth\" قوي.",
            "تنسى الكلمات المفتاحية من Job Description — ATS يحذفك قبل البشر.",
            "Resume أكثر من صفحتين لخبرة < 7 سنين — recruiter يقرأ 6 ثواني فقط.",
            "تذكر كل وظيفة منذ الجامعة — تشتيت."
        ],
        "diagnostic": [
            "تُرسل 50 وأكثر بلا رد → ATS يحذف، أو السطر الأول لا يبيع.",
            "تتلقى مقابلات لكنها ليست في طموحك → resume يُسوّقك على مستوى أقل.",
            "Recruiters يسألون \"what do you actually do?\" → غموض في الوصف."
        ],
        "iraqi": None
    },
    {
        "id": "hr-037",
        "title": "Interview Prep — أخطاء قاتلة",
        "mistakes": [
            "ما تبحث عن الشركة 30 دقيقة قبل المقابلة — ينكشف الكسل.",
            "تحفظ STAR format ميكانيكياً — يبدو الجواب آلياً.",
            "تنتقد المدير السابق — flag أحمر في كل ثقافة.",
            "تنسى تحضير 3 أسئلة ذكية لتسألهم — يبدو أنك غير مهتم.",
            "تأتي بدون CV مطبوع — احترافية مفقودة."
        ],
        "diagnostic": [
            "تُمر بـ phone screen ثم تفشل بـ on-site → تحضير سطحي.",
            "أسئلتك الأخيرة تتلقى \"this is in our website\" → ما بحثت كفاية.",
            "تتعرّق وتنسى أمثلة جاهزة → نقص practice حقيقي مع شخص آخر."
        ],
        "iraqi": "في العراق، أكثر من 70% من المقابلات تبدأ بـ \"حدّثني عن نفسك\" — احفظ pitch مدته 90 ثانية بالعربية والإنجليزية. متوفر = ميزة كبيرة."
    },
    {
        "id": "hr-038",
        "title": "Onboarding — أول 90 يوم",
        "mistakes": [
            "تتجنب الأسئلة خوفاً من الظهور بمظهر الجاهل — تنفجر مشاكل بعد شهرين.",
            "تتعهد بمشاريع كبيرة بلا فهم السياق — تفشل علناً وتفقد الثقة.",
            "تنتقد \"كيف يعملون هنا\" أمام الفريق — تصبح \"المتذمر\" قبل ما تثبت كفاءتك.",
            "تنسى بناء علاقات خارج فريقك — معزول عند الترقية.",
            "تتجاهل توثيق ما تعلمته — تكرر نفس الأسئلة."
        ],
        "diagnostic": [
            "بعد 30 يوم لا أحد يدعوك للقهوة → عُزلة اجتماعية.",
            "مديرك يتحاشى تكليفك بمشاريع → فقد الثقة مبكراً.",
            "تُكرر نفس الأسئلة على Slack كل أسبوع → ما توثق."
        ],
        "iraqi": None
    },
    {
        "id": "hr-039",
        "title": "Quitting — كيف تستقيل بأناقة",
        "mistakes": [
            "تستقيل بـ Slack أو email بلا اجتماع — تحرق الـ reference.",
            "ما تعطي 2-4 أسابيع notice — لا أحد يوظّفك بعدها بثقة.",
            "تنتقد الشركة في exit interview بصراحة جارحة — يُكتب في ملفك.",
            "تترك دون توثيق ما كنت تعمل — الفريق يلعنك.",
            "تذكر سبب الاستقالة الحقيقي بلا فلتر — قد ترجع يوماً."
        ],
        "diagnostic": [
            "Manager يرفض كتابة LinkedIn recommendation → الانتقال كان فظاً.",
            "زملاء قُدامى يتجاهلون رسائلك بعد سنة → تركت أرضاً محروقة.",
            "Recruiter يسأل \"why did you leave?\" بحذر → الإجابة السابقة كانت سلبية."
        ],
        "iraqi": "في السوق العراقي الصغير، كل HR يعرف الآخر. استقالة سيئة في شركة A تُسمع في B خلال أسبوعين. الأناقة استثمار لا فضيلة."
    },
    # ═══ Page anchors (high-impact calculators + key concepts) ═══
    {
        "id": "cc-001",
        "title": "AHT الزائف — رقم يخدعك",
        "mistakes": [
            "تخفّض AHT بقطع المكالمات قبل حلّ المشكلة — FCR ينهار، الزبون يتصل ثانية.",
            "تقيس AHT بدون wrap-up time — رقمك خاطئ بنسبة 20%.",
            "تكافئ على AHT منخفض فقط — agents يدفعون الزبون للـ IVR.",
            "تنسى استثناء حالات escalation — متوسط مُلوّث."
        ],
        "diagnostic": [
            "AHT انخفض و FCR انخفض معاً → جودة تضحية لا تحسّن.",
            "تتكرر نفس مكالمة الزبون خلال 24 ساعة → ما تم حلها فعلاً.",
            "Agents الجدد AHT أعلى لكن FCR أعلى → النضج يحتاج وقت."
        ],
        "iraqi": "في كول سنترات بغداد، AHT يُقاس بدون احتساب \"المكالمة المرتدّة\" بعد ساعة. أضفها في تعريفك = صورة واقعية."
    },
    {
        "id": "cc-012",
        "title": "Vocal Mirroring — متى يفشل",
        "mistakes": [
            "تنسخ لكنة الزبون حرفياً — يكتشف ويشعر بالسخرية.",
            "تخفض صوتك تحت غاضب — يشعر أنك ضعيف، يهجم أكثر.",
            "ترفع نبرتك لتنافس المتحمّس — تتحوّل المكالمة لمعركة.",
            "تكرر كلماته الأخيرة في كل جملة — يبدو روبوتياً."
        ],
        "diagnostic": [
            "الزبون يقول \"لا تكرّر بعدي\" → تجاوزت الحد.",
            "نبرته تتصاعد مع نبرتك → ما خفّضت السرعة عند الحاجة.",
            "تشعر بالإرهاق بعد كل مكالمة → mirror مفرط، تستنزفك."
        ],
        "iraqi": None
    },
    {
        "id": "fs-001",
        "title": "Sales Commission — حساب يخدعك",
        "mistakes": [
            "تحسب commission على gross sales لا net — ترجيع سلعة يكلّفك ضعف.",
            "تنسى bonus tier — تترك آلاف على الطاولة لأنك بـ%2 من $100k، وكان ممكن $120k بـ4%.",
            "تتجاهل clawback period — تأخذ commission ثم يُسحب.",
            "ما تقرأ contract — shock عند أول check."
        ],
        "diagnostic": [
            "راتبك أقل مما حسبت بـ20% → clawback أو fees لم تنتبه لها.",
            "تُغلق صفقات كثيرة آخر الشهر فقط → tier-stacking لتفعيل bonus.",
            "تشعر أن النظام \"يُعاقب\" النجاح → ربما هو فعلاً، أو سوء فهم."
        ],
        "iraqi": "في العراق، \"عمولة\" تختلف من \"حافز\" — اطلب تعريف كتابي. كثير من الباعة يقولون \"5%\" ويفاجأون بـ\"بعد المصاريف\"."
    },
    {
        "id": "am-001",
        "title": "Hunter vs Farmer — اختر بوعي",
        "mistakes": [
            "تتصرف كـ farmer في دور hunter — أهداف pipeline تنهار بعد ربع.",
            "تتصرف كـ hunter في دور farmer — حسابات strategic تخسر بسبب \"close-and-go\".",
            "تنسى التحول الموسمي — Q4 يحتاج hunter، Q1 farmer.",
            "تختار دور hunter لرواتب أعلى وأنت introvert — تنهار نفسياً خلال 6 أشهر."
        ],
        "diagnostic": [
            "تُغلق صفقات بسرعة لكن تخسرها بعد 6 أشهر → farmer skill ناقصة.",
            "حسابات تنمو ببطء وتُجدّد بانتظام لكن لا new logos → hunter skill ناقصة.",
            "تشعر بإرهاق بعد عدد كبير من cold calls → مزاجك farmer."
        ],
        "iraqi": None
    },
    {
        "id": "so-002",
        "title": "Crisis Stage — الخطأ الأول قاتل",
        "mistakes": [
            "تحذف التعليقات السلبية — الـ crisis يتضاعف عبر screenshots.",
            "ترد بـ \"defensive\" قبل إعلان الحقائق — تفقد المصداقية.",
            "تستخدم AI-generated apology — الناس يكتشفون النبرة الميتة.",
            "تنتظر 24 ساعة قبل البيان الأول — internet لا ينام."
        ],
        "diagnostic": [
            "الـ engagement على البيان أقل من السلبي بـ 1/10 → الرد ضعيف.",
            "Influencers يتحدثون عنك دون تواصلك معهم → فشل early outreach.",
            "Trending hashtag مدته أكثر من 48 ساعة → استراتيجيتك انفعالية لا سردية."
        ],
        "iraqi": None
    },
    {
        "id": "ng-001",
        "title": "BATNA الوهمي — لا تكذب على نفسك",
        "mistakes": [
            "تتفاوض على بدائل لا تملكها فعلاً — يُكشف بـ probing سؤال.",
            "تنسى أن BATNA يتغير يومياً — رقمك من الأسبوع الماضي قديم.",
            "تخلط بين BATNA و reservation price — الأول الواقع، الثاني الحدّ الأدنى.",
            "تُفصح عن BATNA مبكراً — تخسر الـ leverage."
        ],
        "diagnostic": [
            "تشعر بالضغط دائماً للقبول → BATNA ضعيف فعلاً.",
            "تخسر مفاوضات متتالية بنفس النمط → ربما reservation price غير واقعي.",
            "الطرف الآخر يتنازل بسرعة → BATNA لديه أضعف."
        ],
        "iraqi": "في السوق العراقي، \"عندي عرض ثاني\" تُقال 100 مرة يومياً. اطلب تفاصيل (شركة، تاريخ، نطاق) — لو غامضة، BATNA وهمي."
    },
    {
        "id": "ac-001",
        "title": "ضريبة الراتب العراقية — أخطاء شائعة",
        "mistakes": [
            "تحسب الضريبة على الإجمالي بلا خصم 1M IQD الإعفاء — تدفع زائد.",
            "تنسى أن البدلات النقدية خاضعة للضريبة — مفاجأة في التدقيق.",
            "تطبق نسبة 15% على كل الراتب — التدرج 3%, 5%, 10%, 15% فقط على الـ tranche.",
            "ما تحفظ ملف ضريبة 5 سنين — قانونياً مطلوب."
        ],
        "diagnostic": [
            "الضريبة المحسوبة < المطلوب رسمياً → تطبيق خاطئ للـ slabs.",
            "الزكاة + الضمان غير محسوبة قبل الضريبة → خصومات ضائعة.",
            "أوراقك مبعثرة عند تدقيق → نظام أرشفة فاشل."
        ],
        "iraqi": "ضريبة الدخل العراقية في 2024-2026 تطبّق slabs: 3% على أول 250K، 5% على التالي، 10% ثم 15%. كثير من المحاسبين يطبّقون نسبة موحدة = خطأ."
    },
    {
        "id": "ac-002",
        "title": "Salary Slip — البنود التي يُهملها الجميع",
        "mistakes": [
            "تنسى عرض breakdown للبدلات — الموظف يشكّك.",
            "تجمع \"خصومات\" في سطر واحد — انتهاك قانوني (يجب تفصيلها).",
            "ما تطبع رقم الضمان الاجتماعي — Social Security يرفض المطالبات.",
            "تنسى ختم الشركة — slip غير معترف به في البنك."
        ],
        "diagnostic": [
            "موظفون يطلبون توضيح كل شهر → الـ slip غير شفاف.",
            "البنك يرفض قبول slip → ينقصه ختم/توقيع رسمي.",
            "تدقيق ضريبي يطلب re-issue → التنسيق غير معياري."
        ],
        "iraqi": "البنوك العراقية (TBI, Rasheed, Rafidain) ترفض slip بدون ختم رطب. اطبع ختم بـ$3 من شارع المتنبي يجنبك مشاكل سنين."
    },
    {
        "id": "pg-001",
        "title": "Big-O — مزالق فهم خاطئ",
        "mistakes": [
            "تركّز على الثوابت مع كبير الإدخالات — O(2n) و O(n) متطابقتان.",
            "تنسى أن O(log n) يفترض الفرز المسبق — sort نفسه O(n log n).",
            "تخلط بين best/average/worst case — Quicksort O(n²) في worst.",
            "تتجاهل space complexity — recursion عميقة تكسر stack حتى لو time جيد."
        ],
        "diagnostic": [
            "حلولك تفشل في leetcode hard → غالباً O(n²) خفي.",
            "Code يبطئ مع large datasets فقط → غير مقاس على scale حقيقي.",
            "قابل للقراءة لكن slow → optimization premature أو خاطئة."
        ],
        "iraqi": None
    },
    {
        "id": "ps-001",
        "title": "OCEAN — استخداماتها الخاطئة",
        "mistakes": [
            "تعتبر النتائج هويّة ثابتة — السمات تتغير 30% خلال العمر.",
            "تستخدم online quiz رديء (5 دقائق) — moot, false-positive عالي.",
            "تستنتج \"مهنة مناسبة\" من السمات — البحث يُظهر علاقة ضعيفة.",
            "تُصنّف الناس حولك بلا اختبار رسمي — تخلق صور نمطية تفسد العلاقة."
        ],
        "diagnostic": [
            "النتائج تتغير كل أسبوع → الاختبار قصير أو مزاجك متذبذب.",
            "تُسقط النتائج على شريك حياة → تفسير سطحي.",
            "تفسّر سلوكك بـ\"أنا Introvert\" بشكل دائم → جمود."
        ],
        "iraqi": None
    },
    {
        "id": "eq-005",
        "title": "Self-Awareness — وهم اليقظة",
        "mistakes": [
            "تخلط self-awareness مع self-criticism — الأخيرة تدمير لا فهم.",
            "تتأمل بدون كتابة — الأفكار تتبخر، لا تعلّم.",
            "تطلب feedback من المقربين فقط — bias ودّي مضمون.",
            "تتأمل في الماضي البعيد بلا حاضر — تجنب نفسي."
        ],
        "diagnostic": [
            "تكتشف أنماطك من خلال شريك أو معالج لا بنفسك → الـ self-awareness ضعيفة فعلياً.",
            "تتفاجأ بـ 360-feedback سلبية → الـ blind spots ضخمة.",
            "تكتب journal لكن لا تعيد قراءته → تأمل بلا تعلّم."
        ],
        "iraqi": None
    },
]


def find_block_close(lines: list[str], start: int) -> int:
    """Walk balanced opening/closing tags from index `start` to find the
    end of the block element. Returns line index of the matching close."""
    line0 = lines[start]
    # Identify tag name from opening
    m = re.search(r'<(\w+)\s', line0)
    if not m:
        return start
    tag = m.group(1)
    open_re = re.compile(rf'<{tag}\b', re.IGNORECASE)
    close_re = re.compile(rf'</{tag}>', re.IGNORECASE)
    depth = 0
    for i in range(start, len(lines)):
        opens = len(open_re.findall(lines[i]))
        closes = len(close_re.findall(lines[i]))
        depth += opens - closes
        if depth == 0:
            return i
    return start


def find_takeaways_close(lines: list[str], block_id: str, search_from: int) -> int | None:
    """Look in the next 25 lines after block close for a <ul class="block-takeaways"
    data-takeaways-for="block_id"> and find its </ul>. Returns line index of </ul>
    or None if no takeaways block exists."""
    pattern = re.compile(rf'<ul[^>]*data-takeaways-for="{re.escape(block_id)}"', re.IGNORECASE)
    for i in range(search_from, min(search_from + 25, len(lines))):
        if pattern.search(lines[i]):
            # walk to </ul>
            depth = 0
            for j in range(i, len(lines)):
                depth += len(re.findall(r'<ul\b', lines[j], re.IGNORECASE))
                depth -= len(re.findall(r'</ul>', lines[j], re.IGNORECASE))
                if depth == 0:
                    return j
    return None


def render_pitfalls(p: dict, indent: str) -> list[str]:
    """Render a complete <details class="block-pitfalls"> for one entry.
    Returns lines (no trailing newline; caller joins)."""
    bid = p["id"]
    title = p["title"]
    mistakes = p["mistakes"]
    diag = p["diagnostic"]
    iraqi = p.get("iraqi")
    total = len(mistakes) + len(diag) + (1 if iraqi else 0)

    lines = []
    lines.append(f'{indent}<details class="block-pitfalls" data-pitfalls-for="{bid}">')
    lines.append(f'{indent}  <summary class="block-pitfalls-summary">')
    lines.append(f'{indent}    <span class="block-pitfalls-icon" aria-hidden="true">⚠️</span>')
    lines.append(f'{indent}    <span class="block-pitfalls-title">{title}</span>')
    lines.append(f'{indent}    <span class="block-pitfalls-count">{total}</span>')
    lines.append(f'{indent}  </summary>')
    lines.append(f'{indent}  <div class="block-pitfalls-body">')

    # Mistakes section
    lines.append(f'{indent}    <section class="pitfall-section pitfall-section--mistakes">')
    lines.append(f'{indent}      <h6 class="pitfall-section-h">أكثر الأخطاء شيوعاً</h6>')
    lines.append(f'{indent}      <ol class="pitfall-list pitfall-list--mistakes">')
    for m in mistakes:
        lines.append(f'{indent}        <li class="pitfall-item">')
        lines.append(f'{indent}          <span class="pitfall-item-marker" aria-hidden="true">✗</span>')
        lines.append(f'{indent}          <span class="pitfall-item-text">{m}</span>')
        lines.append(f'{indent}        </li>')
    lines.append(f'{indent}      </ol>')
    lines.append(f'{indent}    </section>')

    # Diagnostic checklist
    lines.append(f'{indent}    <section class="pitfall-section pitfall-section--diagnostic">')
    lines.append(f'{indent}      <h6 class="pitfall-section-h">علامات تظهر عليك أنت</h6>')
    lines.append(f'{indent}      <ul class="pitfall-list pitfall-list--checklist">')
    for d in diag:
        lines.append(f'{indent}        <li class="pitfall-item">')
        lines.append(f'{indent}          <input class="pitfall-item-check" type="checkbox" disabled aria-hidden="true">')
        lines.append(f'{indent}          <span class="pitfall-item-text">{d}</span>')
        lines.append(f'{indent}        </li>')
    lines.append(f'{indent}      </ul>')
    lines.append(f'{indent}    </section>')

    # Iraqi cultural note (optional)
    if iraqi:
        lines.append(f'{indent}    <section class="pitfall-section pitfall-section--iraqi">')
        lines.append(f'{indent}      <h6 class="pitfall-section-h">في السوق العراقي</h6>')
        lines.append(f'{indent}      <p class="pitfall-cultural-note">{iraqi}</p>')
        lines.append(f'{indent}    </section>')

    lines.append(f'{indent}  </div>')
    lines.append(f'{indent}</details>')
    return lines


def main() -> int:
    if not TARGET.exists():
        print(f"ERROR: {TARGET} not found", file=sys.stderr)
        return 1

    text = TARGET.read_text(encoding="utf-8")
    lines = text.split("\n")
    inserted = 0
    skipped_existing = 0
    not_found = 0

    # Build pattern map
    block_re_map = {
        p["id"]: re.compile(rf'data-block-id="{re.escape(p["id"])}"')
        for p in PITFALLS
    }
    pitfalls_re_map = {
        p["id"]: re.compile(rf'data-pitfalls-for="{re.escape(p["id"])}"')
        for p in PITFALLS
    }

    # Process in REVERSE order so line indices stay valid as we insert lines
    # (each insertion grows the file; doing reverse means earlier indices not affected)
    targets = []
    for p in PITFALLS:
        bid = p["id"]
        # Locate the block opening
        block_line = None
        for i, ln in enumerate(lines):
            if block_re_map[bid].search(ln):
                block_line = i
                break
        if block_line is None:
            print(f"  ✗ block-id={bid} not found in HTML", file=sys.stderr)
            not_found += 1
            continue

        # Idempotency: check if pitfalls already injected (look in next 80 lines)
        already = False
        for i in range(block_line, min(block_line + 80, len(lines))):
            if pitfalls_re_map[bid].search(lines[i]):
                already = True
                break
        if already:
            print(f"  ◇ pitfalls-for={bid} already present, skipping")
            skipped_existing += 1
            continue

        # Find block close
        block_close = find_block_close(lines, block_line)
        # Find takeaways close (if exists)
        ta_close = find_takeaways_close(lines, bid, block_close + 1)
        # Insertion point = after takeaways close OR after block close
        insert_after = ta_close if ta_close is not None else block_close

        # Determine indent of the block opening line
        opening = lines[block_line]
        indent_match = re.match(r'^(\s*)', opening)
        indent = indent_match.group(1) if indent_match else "          "

        targets.append({"id": bid, "p": p, "insert_after": insert_after, "indent": indent})

    # Sort by insert_after DESC so we insert from bottom up
    targets.sort(key=lambda t: t["insert_after"], reverse=True)

    for t in targets:
        new_lines = render_pitfalls(t["p"], t["indent"])
        # Insert AFTER the line at insert_after
        for offset, ln in enumerate(new_lines):
            lines.insert(t["insert_after"] + 1 + offset, ln)
        inserted += 1
        print(f"  ✓ pitfalls-for={t['id']} injected")

    # Write back
    new_text = "\n".join(lines)
    TARGET.write_text(new_text, encoding="utf-8")

    total_in_pack = len(PITFALLS)
    print()
    print(f"  Pitfalls injection summary:")
    print(f"    inserted:        {inserted}")
    print(f"    already-present: {skipped_existing}")
    print(f"    not-found:       {not_found}")
    print(f"    pack-size:       {total_in_pack}")

    if not_found > 0:
        print(f"\n  WARNING: {not_found} blocks not found", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
