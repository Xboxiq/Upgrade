import 'package:flutter/widgets.dart';
import '../../theme/app_icons.dart';

/// ════════════════════════════════════════════════════════════════════════
/// Call Center domain content — real, citation-backed material ported from
/// the legacy platform, modelled as immutable data the UI renders.
/// ════════════════════════════════════════════════════════════════════════

class ScriptLine {
  const ScriptLine({required this.agent, required this.text});
  final bool agent; // true = trainee/agent, false = customer
  final String text;
}

class Technique {
  const Technique({
    required this.id,
    required this.title,
    required this.icon,
    required this.blurb,
    required this.script,
    required this.quality,
    required this.progress,
  });
  final String id;
  final String title;
  final IconData icon;
  final String blurb;
  final List<ScriptLine> script;
  final String quality;
  final double progress;
}

class VoiceDim {
  const VoiceDim({
    required this.name,
    required this.unit,
    required this.icon,
    required this.target,
    required this.science,
    required this.mistake,
    required this.drill,
    required this.progress,
  });
  final String name;
  final String unit;
  final IconData icon;
  final String target;
  final String science;
  final String mistake;
  final String drill;
  final double progress;
}

class EmpathyStep {
  const EmpathyStep({
    required this.index,
    required this.title,
    required this.icon,
    required this.sub,
    required this.fusha,
    required this.iraqi,
  });
  final String index;
  final String title;
  final IconData icon;
  final String sub;
  final String fusha;
  final String iraqi;
}

class Archetype {
  const Archetype({
    required this.title,
    required this.strategy,
    required this.icon,
    required this.blurb,
    required this.root,
    required this.tactic,
    required this.dialogue,
  });
  final String title;
  final String strategy;
  final IconData icon;
  final String blurb;
  final String root;
  final String tactic;
  final String dialogue;
}

class CompareRow {
  const CompareRow({required this.situation, required this.wrong, required this.right});
  final String situation;
  final String wrong;
  final String right;
}

class KpiDef {
  const KpiDef({
    required this.code,
    required this.label,
    required this.ref,
    required this.value,
    required this.min,
    required this.max,
    required this.target,
    required this.higherBetter,
  });
  final String code;
  final String label;
  final String ref;
  final double value;
  final double min;
  final double max;
  final double target;
  final bool higherBetter;
}

abstract class CallCenterData {
  static const List<Technique> techniques = <Technique>[
    Technique(
      id: 'cc-006',
      title: 'فن الاستقبال — أول ٧ ثوانٍ',
      icon: AppIcons.phone,
      blurb: 'العميل يُكوّن انطباعه في الثواني السبع الأولى — الصوت الواضح يفتح الباب، والمتعب يُغلقه قبل أن تبدأ.',
      quality: 'العميل يردّ بإيجابية خلال أول ١٥ ثانية ولا يطلب إعادة التعريف.',
      progress: 100,
      script: <ScriptLine>[
        ScriptLine(agent: true, text: '«السلام عليكم، معك [اسمك] من [الشركة]، يسعدنا خدمتك — كيف أقدر أساعدك؟»'),
        ScriptLine(agent: false, text: '«أبغى أستفسر عن الباقات...»'),
      ],
    ),
    Technique(
      id: 'cc-007',
      title: 'العميل الغاضب — تقنية HEAT',
      icon: AppIcons.fire,
      blurb: 'الغضب لا يُحارَب بالمنطق بل بالشعور بأن أحداً فهمه. HEAT: استمع، تعاطف، اعتذر، تصرّف.',
      quality: 'خلال ٦٠ ثانية يتحوّل صوت العميل من الحدّة إلى الهدوء النسبي ويبدأ يشرح بدل ما يشتكي.',
      progress: 60,
      script: <ScriptLine>[
        ScriptLine(agent: false, text: '«هذا الثالث مرة أتصل وما أحد حل مشكلتي!»'),
        ScriptLine(agent: true, text: '«أفهم إحساسك تماماً، وآسف جداً إنك مررت بهذا. ثلاث مرات دون نتيجة شيء ما يُقبل. أنا شخصياً رح أتابع معك الحين — ممكن تحكيلي ش اللي صاير بالضبط؟»'),
      ],
    ),
    Technique(
      id: 'cc-008',
      title: 'الاستماع النشط والتلخيص',
      icon: AppIcons.ear,
      blurb: 'الناس يريدون الشعور بأن أحداً يفهمهم. التلخيص يُثبت أنك كنت حاضراً ويقلّل الأخطاء.',
      quality: 'العميل يردّ بـ«أيوه بالضبط» — جملة تعني أنك في نفس الموجة.',
      progress: 40,
      script: <ScriptLine>[
        ScriptLine(agent: true, text: '«خليني أتأكد إني فاهم صح: تبغى تغيير الباقة، وشرطين — تحتفظ بالأرقام، والتحويل هذا الأسبوع. صح؟»'),
        ScriptLine(agent: false, text: '«أيوه، بالضبط.»'),
      ],
    ),
    Technique(
      id: 'cc-009',
      title: 'التحكم في نبرة الصوت',
      icon: AppIcons.microphone,
      blurb: '٣٨٪ من التواصل الهاتفي يأتي من النبرة لا من الكلمات. صوتك المتعب يُرسل «أنا مو مهتم».',
      quality: 'العميل يقول «شكراً على صبرك» أو «تكلمت وياك بسهولة».',
      progress: 20,
      script: <ScriptLine>[
        ScriptLine(agent: true, text: 'ابتسم وأنت تتكلم — العميل يحسّ الابتسامة. خفّض نبرتك عند المعلومات المهمة. طابِق إيقاع العميل.'),
      ],
    ),
    Technique(
      id: 'cc-010',
      title: 'إغلاق المكالمة باحترافية',
      icon: AppIcons.phoneX,
      blurb: 'آخر ما يسمعه العميل هو ما يتذكّره. الإغلاق الجيد يُلخّص، يُوثّق الخطوة القادمة، ويُرسّخ الثقة.',
      quality: 'لا يُعيد العميل الاتصال يسأل «وش صار؟» — ومعدل تكرار الاتصال ينخفض تحت ٥٪.',
      progress: 0,
      script: <ScriptLine>[
        ScriptLine(agent: true, text: '«خليني ألخّص اللي اتفقنا عليه: تصلك رسالة التأكيد خلال ساعة، والتقني يتصل بكرة الصبح. في شي ثاني أقدر أساعدك فيه؟»'),
      ],
    ),
    Technique(
      id: 'cc-011',
      title: 'تحويل المكالمة دون إزعاج',
      icon: AppIcons.phoneTransfer,
      blurb: 'أكثر ما يُحبط العميل أن يُرمى من شخص لآخر دون ترابط. اشرح السبب، وانقل السياق بنفسك.',
      quality: 'الزميل المُستلِم لا يحتاج يسأل العميل من البداية — ورضا التحويل يزيد عن ٨٠٪.',
      progress: 0,
      script: <ScriptLine>[
        ScriptLine(agent: true, text: '«طلبك يحتاج متخصص فوترة عشان يخدمك أسرع. رح أحوّلك لزميلي وأنا شخصياً رح أشرحله وضعك — ما تحتاج تكرر شي. تمانع نص دقيقة انتظار؟»'),
      ],
    ),
  ];

  static const List<VoiceDim> voice = <VoiceDim>[
    VoiceDim(
      name: 'Pace · الإيقاع',
      unit: 'WPM — كلمة/دقيقة',
      icon: AppIcons.timer,
      target: '١٤٠ – ١٦٠',
      science: 'Goldman-Eisler (1968) و Brennan (2014): ١٤٠–١٦٠ منطقة الفهم المريح؛ تحت ١٢٠ تُملّ وفوق ١٨٠ تُربك الذاكرة.',
      mistake: 'التسارع تحت الضغط فوق ٢٠٠ WPM لإنهاء المكالمة بسرعة.',
      drill: 'اقرأ نصاً ١٥٠ كلمة بساعة إيقاف، هدفك ٦٠ ثانية بالضبط. كرّر ٣ مرّات.',
      progress: 90,
    ),
    VoiceDim(
      name: 'Pitch · طبقة الصوت',
      unit: 'F0 Variability %',
      icon: AppIcons.slidersHorizontal,
      target: '≥ ١٥٪',
      science: 'Hincks (2005): السمع يصنّف الصوت ثابت الطبقة كـ«غير مهتم» خلال ١٢ ثانية. تذبذب ١٥٪+ يُبقي الانخراط.',
      mistake: 'فخّ الرتابة — تكرار الجملة الافتتاحية مئات المرّات يقتل التنويع.',
      drill: 'اقرأ جملة واحدة بـ٥ سياقات: مفاجأة، حزن، فرح، غضب مكتوم، فضول.',
      progress: 55,
    ),
    VoiceDim(
      name: 'Volume · مستوى الصوت',
      unit: 'RMS Consistency dB',
      icon: AppIcons.speakerHigh,
      target: '± ٣ dB',
      science: 'قمم الصوت فوق ٦dB تُفسَّر لاوعياً كعدوان، وانخفاضه المفاجئ كعدم ثقة. الاستقرار = طمأنينة.',
      mistake: 'ابتلاع آخر كلمتين من كل جملة — يفقد العميل ثُلث المحتوى.',
      drill: 'سجّل فقرة وارسم منحنى الصوت، هدفك خط أفقي مع تأكيدات مدروسة.',
      progress: 70,
    ),
    VoiceDim(
      name: 'Tone · النبرة',
      unit: 'Warmth · F2/F1',
      icon: AppIcons.thermometer,
      target: 'دافئ',
      science: 'Hala (2010) و Scherer (2003): نسبة Formant F2/F1 ترتبط بالدفء. الابتسامة ترفع F2 آلياً عبر الهاتف.',
      mistake: 'النبرة الروبوتية — حتى الكلمات الصحيحة تبدو غير صادقة بصوت مسطّح.',
      drill: 'ضع مرآة وابتسم فعلياً قبل كل مكالمة — كيمياء الدماغ تتغيّر قبل الصوت.',
      progress: 45,
    ),
    VoiceDim(
      name: 'Pause · الوقفات',
      unit: 'Strategic Silence',
      icon: AppIcons.pause,
      target: '٠٫٤ – ٠٫٨ ث',
      science: 'Voss (مفاوض FBI): «الصمت التكتيكي» — وقفة ٠٫٤–٠٫٨ ث بعد نقطة مهمة تزيد الإقناع ٢٧٪.',
      mistake: 'حلقة الحشو «أه، يعني، طيب» — كل كلمة حشو تخفض السلطة المُدرَكة ٨٪.',
      drill: 'اقرأ نصاً وعُدّ صامتاً «١-٢» بعد كل نقطة. سجّل بدون حشو وحلّل.',
      progress: 30,
    ),
  ];

  static const List<EmpathyStep> empathy = <EmpathyStep>[
    EmpathyStep(
      index: '١',
      title: 'Acknowledge · الإقرار',
      icon: AppIcons.ear,
      sub: 'اعترف بأن هناك مشكلة. لا تنكر، لا تبرّر، لا تقاطع.',
      fusha: '«أسمعك تماماً، وأفهم أن هذا مُزعج فعلاً.»',
      iraqi: '«أسمعك، وهاي فعلاً شغلة تضايق.»',
    ),
    EmpathyStep(
      index: '٢',
      title: 'Validate · التطبيع',
      icon: AppIcons.heart,
      sub: 'شعور العميل طبيعي. أيّ شخص بمكانه سيشعر مثله.',
      fusha: '«من حقك تماماً أن تنزعج، أيّ أحد سيشعر بنفس الشعور.»',
      iraqi: '«من حقك تنرفز، أيّ واحد بمكانك راح يحسّ نفس الشي.»',
    ),
    EmpathyStep(
      index: '٣',
      title: 'Refocus · إعادة التوجيه',
      icon: AppIcons.compass,
      sub: 'حوّل الانفعال إلى عمل. الكرة في ملعبك، لا في ملعبه.',
      fusha: '«الأهمّ الآن أن نحلّ المشكلة، وأنا هنا لذلك.»',
      iraqi: '«المهمّ نحلّها، وأنا وياك لهالشي.»',
    ),
    EmpathyStep(
      index: '٤',
      title: 'Action · الفعل المحدّد',
      icon: AppIcons.lightning,
      sub: 'خطوة محدّدة بزمن محدّد. لا «سنحاول» — بل «سأفعل قبل الساعة X».',
      fusha: '«سأفتح تذكرة الآن وأرسل لك الرقم خلال ٣ دقائق.»',
      iraqi: '«راح أفتح تكت هسة وأنطيك الرقم خلال ٣ دقايق.»',
    ),
  ];

  static const List<Archetype> archetypes = <Archetype>[
    Archetype(
      title: 'الصارخ — Screamer',
      strategy: 'LEAR',
      icon: AppIcons.fire,
      blurb: 'يرفع صوته فوراً قبل أن يشرح.',
      root: 'شعور بفقدان السيطرة. الصراخ آلية دفاع لاستعادة الإحساس بالقوة.',
      tactic: 'استمع، تعاطف، أقِرّ، ثم أعِد الصياغة. لا ترفع صوتك أبداً، وانتظر ٣ ثوانٍ بعد الانفجار قبل الردّ.',
      dialogue: '«أعرف هاي شغلة تجنّن، خلّيني أفهمها وياك خطوة خطوة.»',
    ),
    Archetype(
      title: 'المتشكّي المزمن',
      strategy: 'Funnel',
      icon: AppIcons.chatCircleDots,
      blurb: 'كل شيء عنده مشكلة.',
      root: 'حاجة عميقة للاعتراف بمعاناته. لا يريد حلاً فورياً بقدر ما يريد سماعاً.',
      tactic: 'أعطه مساحة للتنفيس، ثم وجّهه لمشكلة واحدة: «من بين كل هذا، أيّها أزعجك أكثر؟»',
      dialogue: '«فهمت، عندك أكثر من شي. شنو الشي الأكبر اللي مأذيك هسة؟»',
    ),
    Archetype(
      title: 'الصامت — Silent',
      strategy: 'Probe',
      icon: AppIcons.ear,
      blurb: 'يردّ بكلمة أو كلمتين، يصعب قراءة موقفه.',
      root: 'إمّا انعدام ثقة، أو إرهاق، أو خوف من الحكم عليه. الصمت ليس رضا.',
      tactic: 'أسئلة مفتوحة قصيرة + صمت تكتيكي يمنحه الأمان ليتكلّم: «خذ وقتك، أنا أسمعك.»',
      dialogue: '«ماكو استعجال، احكيلي بكيفك وأنا وياك.»',
    ),
    Archetype(
      title: 'العارف كلّ شيء',
      strategy: 'Ally',
      icon: AppIcons.usersThree,
      blurb: 'يصحّح كلامك ويستعرض معرفته.',
      root: 'حاجة للاحترام والتقدير. مقاومته دفاع عن صورته أمام نفسه.',
      tactic: 'اجعله حليفاً لا خصماً: أقرّ بخبرته، ثم ابنِ عليها بدل أن تصحّحها مباشرة.',
      dialogue: '«واضح إنك متابع زين — خلّينا نبني على هاي المعلومة.»',
    ),
  ];

  static const List<CompareRow> compare = <CompareRow>[
    CompareRow(situation: 'العميل يسأل عن موعد التسليم', wrong: '«ما أعرف، هذا يرجع للمخزن.»', right: '«خليني أتحقق لك الحين وأعطيك موعداً دقيقاً — ثانية وأنا معك.»'),
    CompareRow(situation: 'العميل يشتكي من خدمة سابقة', wrong: '«أنا ما كنت الموظف اللي خدمك.»', right: '«آسف إنك مررت بهذا — خليني أصلّحه لك أنا الحين.»'),
    CompareRow(situation: 'طلب خارج الصلاحية', wrong: '«ما يصير، هذا بروتوكول الشركة.»', right: '«اللي أقدر أسوّيه لك هو كذا، وأضمن لك متابعته شخصياً.»'),
    CompareRow(situation: 'خطأ من الشركة', wrong: '«النظام غلط، مو أنا.»', right: '«هذا خطأ من جهتنا، وأنا أتحمّل متابعته حتى يُحلّ.»'),
  ];

  static const List<KpiDef> kpis = <KpiDef>[
    KpiDef(code: 'AHT', label: 'متوسط مدة المكالمة', ref: '٤–٦ دقائق', value: 5.2, min: 1, max: 12, target: 5, higherBetter: false),
    KpiDef(code: 'FCR', label: 'حل من أول اتصال', ref: '٧٠–٧٩٪', value: 72, min: 40, max: 100, target: 75, higherBetter: true),
    KpiDef(code: 'CSAT', label: 'رضا العميل', ref: '≥ ٨٥٪', value: 84, min: 40, max: 100, target: 85, higherBetter: true),
    KpiDef(code: 'ADH', label: 'الالتزام بالجدول', ref: '٩٢–٩٥٪', value: 93, min: 60, max: 100, target: 93, higherBetter: true),
    KpiDef(code: 'QA', label: 'تقييم الجودة', ref: '≥ ٩٠٪', value: 88, min: 50, max: 100, target: 90, higherBetter: true),
  ];
}
