/* Auto-generated from arabic-training-platform-v12 (1) (4) (1) (1) (1).html — do not hand-edit */
/* IIFE blocks preserved in original document order. */

/* ===== JS block #1 (id: block-1) ===== */
function togglePsychAcc(btn) {
      const item   = btn.closest('.psych-acc-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('#page-psych .psych-acc-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    }

/* ===== JS block #2 (id: block-2) ===== */
/* v12-ADD: DISC Card Toggle */
    function toggleDiscCard(card) {
      const wasOpen = card.classList.contains('open');
      document.querySelectorAll('.v12-disc-card.open').forEach(c => c.classList.remove('open'));
      if (!wasOpen) card.classList.add('open');
    }
    function switchDiscTab(btn, tabName) {
      const card = btn.closest('.v12-disc-card');
      card.querySelectorAll('.v12-disc-tab').forEach(t => t.classList.remove('active'));
      card.querySelectorAll('.v12-disc-tab-content').forEach(tc => tc.classList.remove('active'));
      btn.classList.add('active');
      card.querySelector('.v12-disc-tab-content[data-tab="'+tabName+'"]').classList.add('active');
    }

/* ===== JS block #3 (id: block-3) ===== */
(function () {

    // Page metadata
    const PAGES = {
      dashboard: {
        title: 'لوحة التحكم',
        breadcrumb: 'الرئيسية / لوحة التحكم',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
        </svg>`
      },
      callcenter: {
        title: 'وحدة الكول سنتر',
        breadcrumb: 'الرئيسية / وحدات التدريب / كول سنتر',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.94a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>`
      },
      fieldsales: {
        title: 'وحدة المبيعات',
        breadcrumb: 'الرئيسية / وحدات التدريب / المبيعات',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
        </svg>`
      },
      social: {
        title: 'وحدة السوشيال ميديا',
        breadcrumb: 'الرئيسية / وحدات التدريب / سوشيال ميديا',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>`
      },
      lab: {
        title: 'مختبر السيناريوهات',
        breadcrumb: 'الرئيسية / وحدات التدريب / مختبر',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
        </svg>`
      },
      psych: {
        title: 'الدوافع النفسية الخفية',
        breadcrumb: 'الرئيسية / وحدات التدريب / الدوافع النفسية',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.84A2.5 2.5 0 0 1 9.5 2"/>
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.84A2.5 2.5 0 0 0 14.5 2"/>
        </svg>`
      },
      eq: {
        title: 'الذكاء العاطفي — EQ',
        breadcrumb: 'الرئيسية / وحدات التدريب / الذكاء العاطفي',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>`
      },
      negotiation: {
        title: 'المفاوضات والإقناع',
        breadcrumb: 'الرئيسية / وحدات التدريب / المفاوضات',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 11l-4 4-2-2"/>
        </svg>`
      },
      customercare: {
        title: 'خدمة العملاء المتميزة',
        breadcrumb: 'الرئيسية / وحدات التدريب / خدمة العملاء',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>`
      },
      programming: {
        title: 'البرمجة والهندسة البرمجية',
        breadcrumb: 'الرئيسية / وحدات التدريب / البرمجة',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>`
      },
      accounting: {
        title: 'المحاسبة والكاشير',
        breadcrumb: 'الرئيسية / وحدات التدريب / المحاسبة والكاشير',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="3" width="20" height="18" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="10" y1="3" x2="10" y2="21"/>
        </svg>`
      },
      accountmgr: {
        title: 'إدارة الحسابات الكبيرة (KAM)',
        breadcrumb: 'الرئيسية / وحدات التدريب / إدارة الحسابات',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 11l-3 3-2-2"/>
        </svg>`
      },
      phonerepair: {
        title: 'صيانة الهواتف الذكية',
        breadcrumb: 'الرئيسية / وحدات التدريب / صيانة الهواتف',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="6" y="2" width="12" height="20" rx="2"/>
          <line x1="11" y1="18" x2="13" y2="18"/>
          <path d="M9 6h6"/>
        </svg>`
      },
      hrmastery: {
        title: 'إتقان HR والتفاوض على الراتب',
        breadcrumb: 'الرئيسية / وحدات التدريب / مقابلات HR',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>`
      },
      myprogress: {
        title: 'تقدمي',
        breadcrumb: 'الرئيسية / تقدمي',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="20" x2="12" y2="10"/>
          <line x1="18" y1="20" x2="18" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="16"/>
        </svg>`
      }
    };

    const navItems   = document.querySelectorAll('.nav-item[data-page]');
    const pages      = document.querySelectorAll('.page');
    const topTitle   = document.getElementById('topbar-title');
    const topBread   = document.getElementById('topbar-breadcrumb');
    const topIcon    = document.getElementById('topbar-icon');

    function navigateTo(pageId) {
      if (!PAGES[pageId]) return;

      // Update nav items
      navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === pageId);
      });

      // Update pages
      pages.forEach(page => {
        page.classList.toggle('active', page.id === 'page-' + pageId);
      });

      // Update topbar
      const meta = PAGES[pageId];
      topTitle.textContent  = meta.title;
      topBread.textContent  = meta.breadcrumb;
      topIcon.innerHTML     = meta.icon;

      // Scroll main back to top
      document.getElementById('main').scrollTop = 0;
    }

    // Attach click events
    navItems.forEach(item => {
      item.addEventListener('click', function () {
        const pageId = this.dataset.page;
        if (pageId && pageId !== 'none') {
          navigateTo(pageId);
        }
      });
    });

    // Module card shortcuts on dashboard
    document.querySelectorAll('.module-card').forEach((card, idx) => {
      const pageMap = ['callcenter', 'fieldsales', 'social', 'lab'];
      card.addEventListener('click', () => navigateTo(pageMap[idx]));
    });

    // Initialize
    navigateTo('dashboard');

  })();

/* ===== JS block #4 (id: block-4) ===== */
/* ——— Skill card expand ——— */
  function toggleSkill(btn) {
    const content = btn.nextElementSibling;
    const isOpen  = content.classList.contains('open');
    content.classList.toggle('open', !isOpen);
    btn.querySelector('svg').style.transform = isOpen ? '' : 'rotate(180deg)';
  }

  /* ——— Quiz data ——— */
  const QUIZ = [
    {
      q: 'اتصل بك عميل وأول ما رددت قال: «ألو؟ هل هذا رقم الشركة؟» — ماذا يعني ذلك؟',
      options: [
        'العميل لم يتأكد من الرقم قبل الاتصال',
        'ردّك لم يتضمن اسم الشركة واسمك بوضوح',
        'لا توجد مشكلة، هذا طبيعي',
        'المكالمة كانت ضعيفة الإشارة'
      ],
      correct: 1,
      explain: 'الاستقبال الصحيح يُعرّف الشركة والموظف فوراً — ليس على العميل أن يسأل.'
    },
    {
      q: 'عميل يرفع صوته بشدة. ما الخطوة الأولى بتقنية HEAT؟',
      options: [
        'طلب منه الهدوء وإلا إنهاء المكالمة',
        'الانتظار حتى يهدأ ثم الرد',
        'الاستماع الكامل دون مقاطعة أو دفاع',
        'تحويله مباشرة إلى المشرف'
      ],
      correct: 2,
      explain: 'HEAT تبدأ بـ Hear — الاستماع الكامل. العميل يجب أن يشعر بأنه مسموع قبل أي حل.'
    },
    {
      q: 'أنهيت شرح الخطوات للعميل ثلاث مرات. ما الصياغة الأفضل للمرة الرابعة؟',
      options: [
        'شرحت لك أكثر من مرة!',
        'هذا الموضوع فيه تفاصيل، ما في مشكلة — خليني أشرحه بطريقة ثانية',
        'ربما من الأفضل تراجع موقعنا الإلكتروني',
        'هل أنت متأكد إنك فاهم السؤال؟'
      ],
      correct: 1,
      explain: 'الصبر واحترام العميل دون إحراجه هو المفتاح — وتغيير الأسلوب بدل التكرار يحلّ المشكلة.'
    },
    {
      q: 'أي من هذه الجمل يُثبت أنك كنت تستمع بنشاط حقيقي؟',
      options: [
        '«أيوه أيوه، فاهم، تكملون؟»',
        '«ممم... نعم... وش بعدين؟»',
        '«خليني أتأكد: أنت تبغى X مع شرط Y وZ — صح؟»',
        '«سؤالك وصلني، خليني أشوف»'
      ],
      correct: 2,
      explain: 'التلخيص الدقيق يُثبت الاستماع الحقيقي ويُقلّل الأخطاء. العميل يحسّ بالفرق فوراً.'
    },
    {
      q: 'بعد إغلاق المكالمة، اتصل نفس العميل بعد ساعة يسأل «وش صار بطلبي؟» — ماذا يعني ذلك؟',
      options: [
        'العميل فضولي فقط',
        'المكالمة لم تُحدد الخطوة القادمة بشكل واضح',
        'المشكلة من قسم التنفيذ',
        'العميل نسي ما قلته'
      ],
      correct: 1,
      explain: 'الإغلاق الاحترافي يُلخّص ما تم ويُحدد الخطوة التالية — بذلك لا يحتاج العميل للاتصال مجدداً.'
    },
    {
      q: 'أي من هذه العبارات تُدمّر الثقة أكثر عند تحويل المكالمة؟',
      options: [
        '«رح أحوّلك لزميلي وأشرحله وضعك»',
        '«انتظر» — ثم صمت طويل',
        '«هل تمانع الانتظار نصف دقيقة قبل التحويل؟»',
        '«رح يتواصل معك متخصص بأسرع وقت»'
      ],
      correct: 1,
      explain: 'الصمت بلا تحديث يُشعر العميل بأنه منسي. حتى جملة واحدة كل 30 ثانية تُحدث فرقاً كبيراً.'
    },
    {
      q: 'عميل يخبرك بأن منافساً يقدم نفس الخدمة بسعر أرخص. ما ردّك الأول؟',
      options: [
        '«لا يمكن، نحن الأرخص في السوق»',
        '«رح ننظر في تخفيض السعر لك»',
        '«ممكن أعرف أكثر عن العرض اللي شفته؟ عشان أوضّح لك الفرق»',
        '«طبعاً أنت حر في اختيارك»'
      ],
      correct: 2,
      explain: 'الفضول الاستراتيجي قبل الدفاع — اسأل أولاً ثم وضّح القيمة، ولا تدافع أو تتراجع سعرياً مباشرة.'
    },
    {
      q: 'ما معنى «التطابق مع إيقاع العميل» في إدارة نبرة الصوت؟',
      options: [
        'نسخ لهجة العميل ولكنتها',
        'مطابقة سرعة الكلام وإيقاعه تقريباً مع العميل',
        'رفع الصوت إذا رفع صوته',
        'التكلم بصوت رسمي في جميع الحالات'
      ],
      correct: 1,
      explain: 'التطابق الإيقاعي — لا التقليد الحرفي — يبني الألفة ويُقلّل التوتر في المكالمة.'
    },
    {
      q: 'قال لك العميل: «أبغى أتكلم مع المدير.» ما ردّك الأمثل؟',
      options: [
        '«المدير مشغول، بس أنا أقدر أساعدك»',
        '«بكل تأكيد — قبل ما أحوّلك، ممكن أشوف إذا أقدر أحل الموضوع مباشرة؟»',
        '«ليش تبغى تتكلم مع المدير؟»',
        '«المدير ما يتكلم مع العملاء مباشرة»'
      ],
      correct: 1,
      explain: 'احترم الطلب، ولا تُعيق وصوله — لكن أعطِ نفسك فرصة أولاً لحل المشكلة قبل التصعيد.'
    },
    {
      q: 'عميل يريد إلغاء اشتراكه. ما الاستجابة الأذكى مهنياً؟',
      options: [
        'إلغاء الاشتراك فوراً دون أي نقاش',
        'رفض الإلغاء وإحالته للمشرف',
        '«حقك تلغي — بس قبل ذلك، في سبب معين؟ ربما عندنا حل أنسب»',
        '«إذا ألغيت تخسر كل المزايا» — ثم الصمت'
      ],
      correct: 2,
      explain: 'Retention call ناجح يبدأ بالاحترام ثم الفضول — لا بالتهديد ولا بالاستسلام الفوري.'
    }
  ];

  /* ——— Sales Module JS ——— */

  function toggleSpin(btn) {
    const expanded = btn.nextElementSibling;
    const isOpen   = expanded.classList.contains('open');
    expanded.classList.toggle('open', !isOpen);
    btn.querySelector('svg').style.transform = isOpen ? '' : 'rotate(180deg)';
  }

  function toggleObj(id) {
    const item = document.getElementById(id);
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.objection-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  }

  const CYCLE_DATA = [
    {
      num: 1, icon: '🔍', name: 'تأهيل العميل',
      goal: 'تحديد ما إذا كان العميل يملك الحاجة، الصلاحية، الميزانية، والتوقيت المناسب. لا تضيع وقتك مع من لا يملك رباعي BANT.',
      mistake: 'الاستمرار في المحادثة مع عميل غير مؤهل أملاً في تغيير موقفه. هذا يُهدر وقتك ووقته معاً.',
      transition: 'بمجرد تأكدك من وجود حاجة حقيقية وصلاحية — انتقل لبناء العلاقة. لا تطل مرحلة التأهيل.'
    },
    {
      num: 2, icon: '🤝', name: 'بناء الثقة',
      goal: 'جعل العميل يشعر بالراحة والأمان معك قبل أي حديث عن المنتج. الناس يشترون من أشخاص يثقون بهم لا من شركات.',
      mistake: 'القفز للعرض التقديمي قبل بناء ألفة حقيقية. عرض ممتاز على أرضية باردة لا يُغلق صفقة.',
      transition: 'حين يبدأ العميل بالحديث بانفتاح عن وضعه ويسألك أسئلة — هذه علامة أنه يثق بك كفاية للانتقال.'
    },
    {
      num: 3, icon: '👁️', name: 'كشف الحاجة',
      goal: 'فهم الألم الحقيقي وراء الطلب الظاهر. الحاجة المُعلنة ليست دائماً الحاجة الحقيقية. استخدم SPIN هنا.',
      mistake: 'افتراض الحاجة دون سؤال. «شركتهم كبيرة، إذاً يحتاجون X» — افتراض يُفقدك صفقات كثيرة.',
      transition: 'حين يُعبّر العميل بلسانه عن مشكلته وتأثيرها — وقتها انتقل لعرض الحل الذي يُطابق ما قاله.'
    },
    {
      num: 4, icon: '💡', name: 'عرض القيمة',
      goal: 'ربط مزايا حلّك بالألم الذي ذكره العميل بالضبط. «هذا المنتج يحل مشكلتك في X التي ذكرتها». لا عروض عامة.',
      mistake: 'إلقاء كل مزايا المنتج دفعة واحدة أملاً في أن شيئاً ما سينجح. هذا يُشتّت العميل ويُضعف التركيز.',
      transition: 'بعد عرض القيمة، أصمت وانتظر ردّ فعله. ردّه سيُحدد ما إذا كنت بحاجة لمعالجة اعتراض أم تنتقل للإغلاق.'
    },
    {
      num: 5, icon: '🛡️', name: 'معالجة الاعتراض',
      goal: 'تحويل الاعتراض من عائق إلى فرصة لتوضيح القيمة. كل اعتراض هو سؤال متنكّر — أجب عليه بهدوء وثقة.',
      mistake: 'الدفاع أو الجدال عند سماع اعتراض. الجدال يُغلق الباب — الفضول يفتحه. «ما الذي يجعلك تقول ذلك؟»',
      transition: 'بعد الرد على الاعتراض، تحقق: «هل هذا يُجيب على تساؤلك؟» — إذا قال نعم، انتقل للإغلاق مباشرة.'
    },
    {
      num: 6, icon: '✅', name: 'الإغلاق',
      goal: 'الحصول على التزام واضح ومحدد — ليس موافقة فضفاضة. «نبدأ الأسبوع القادم» أفضل من «سنفكر في الأمر».',
      mistake: 'الإغلاق بشكل مفاجئ دون أن يكون العميل جاهزاً نفسياً. الإغلاق الناجح هو نتيجة طبيعية، لا ضغط مفاجئ.',
      transition: 'بعد الإغلاق مباشرة — أكّد الخطوات التالية بالتفصيل: من يفعل ماذا وبأي وقت. الصمت بعد الإغلاق قاتل.'
    },
    {
      num: 7, icon: '🔄', name: 'المتابعة',
      goal: 'بناء علاقة ما بعد البيع تُنتج توصيات وتكرار شراء. العميل الراضي هو مندوب مبيعات مجاني.',
      mistake: 'الاختفاء بعد إتمام البيع. «بعتك وانتهيت» يُفقدك العميل للأبد ويحوله لمنتقد.',
      transition: 'المتابعة تُعيد تغذية الدورة من أولها — العميل الراضي مصدر عملاء جدد مؤهلين. اطلب منه التوصية بشكل صريح.'
    }
  ];

  let activeStage = null;

  function selectStage(num) {
    document.querySelectorAll('.cycle-stage').forEach(el => el.classList.remove('cs-active'));
    document.getElementById('cs-' + num).classList.add('cs-active');
    activeStage = num;

    const data  = CYCLE_DATA[num - 1];
    const panel = document.getElementById('cycleDetailPanel');
    const grid  = document.getElementById('cycleDetailGrid');
    const title = document.getElementById('cycleDetailTitle');

    title.innerHTML = `<span style="font-size:22px;">${data.icon}</span> المرحلة ${data.num}: ${data.name}`;
    grid.style.display = 'grid';
    grid.innerHTML = `
      <div class="cycle-detail-box">
        <div class="cycle-detail-box-label goal">🎯 الهدف</div>
        <div class="cycle-detail-box-text">${data.goal}</div>
      </div>
      <div class="cycle-detail-box">
        <div class="cycle-detail-box-label mistake">⚠️ الخطأ القاتل</div>
        <div class="cycle-detail-box-text">${data.mistake}</div>
      </div>
      <div class="cycle-detail-box">
        <div class="cycle-detail-box-label transition">➡️ الانتقال للتالية</div>
        <div class="cycle-detail-box-text">${data.transition}</div>
      </div>`;
    panel.style.animation = 'none';
    panel.offsetHeight;
    panel.style.animation = 'pageFadeIn 0.25s ease';
  }

  // Auto-select first stage when navigating to fieldsales — handled by unified nav listener below


  const QUIZ_LS_KEY = 'training_quiz_v1';
  function loadQuizState() {
    try {
      const s = localStorage.getItem(QUIZ_LS_KEY);
      if (s) { const d = JSON.parse(s); return d; }
    } catch(e) {}
    return null;
  }
  function saveQuizState() {
    try { localStorage.setItem(QUIZ_LS_KEY, JSON.stringify({ currentQ, score, answered, quizDone })); } catch(e) {}
  }
  function resetQuiz() {
    currentQ = 0; score = 0; answered = new Array(QUIZ.length).fill(null); quizDone = false;
    localStorage.removeItem(QUIZ_LS_KEY);
    renderQuiz();
  }

  let _qs = loadQuizState();
  let currentQ    = _qs ? _qs.currentQ  : 0;
  let score       = _qs ? _qs.score     : 0;
  let answered    = _qs ? _qs.answered  : new Array(QUIZ.length).fill(null);
  let quizDone    = _qs ? _qs.quizDone  : false;

  function renderQuiz() {
    const wrap = document.getElementById('quizContent');
    if (!wrap) return;

    if (quizDone) {
      renderResult(wrap);
      return;
    }

    const q   = QUIZ[currentQ];
    const pct = Math.round(((currentQ) / QUIZ.length) * 100);
    const letters = ['أ', 'ب', 'ج', 'د'];

    let dotsHtml = QUIZ.map((_, i) => {
      let cls = '';
      if (i < currentQ)    cls = 'done';
      if (i === currentQ)  cls = 'current';
      return `<div class="quiz-dot ${cls}"></div>`;
    }).join('');

    let optionsHtml = q.options.map((opt, i) => {
      let cls = '';
      if (answered[currentQ] !== null) {
        if (i === q.correct)              cls = 'correct';
        else if (i === answered[currentQ]) cls = 'wrong';
      } else if (answered[currentQ] === i) {
        cls = 'selected';
      }
      return `
        <div class="quiz-option ${cls}" onclick="selectAnswer(${i})">
          <div class="quiz-option-letter">${letters[i]}</div>
          <div class="quiz-option-text">${opt}</div>
        </div>`;
    }).join('');

    let explainHtml = '';
    if (answered[currentQ] !== null) {
      const isCorrect = answered[currentQ] === q.correct;
      explainHtml = `
        <div style="margin-top:14px; padding:12px 14px; border-radius:var(--radius-md);
             background:${isCorrect ? 'rgba(34,197,94,0.07)' : 'rgba(239,68,68,0.07)'};
             border:1px solid ${isCorrect ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'};">
          <div style="font-size:11px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase;
               color:${isCorrect ? '#22C55E' : '#EF4444'}; margin-bottom:5px;">
            ${isCorrect ? '✓ إجابة صحيحة' : '✗ إجابة خاطئة'}
          </div>
          <div style="font-size:12.5px; color:var(--text-muted); line-height:1.6;">${q.explain}</div>
        </div>`;
    }

    let nextLabel = currentQ < QUIZ.length - 1 ? 'السؤال التالي ←' : 'عرض النتيجة ←';

    wrap.innerHTML = `
      <div class="quiz-header">
        <h2>اختبر نفسك — مهارات الكول سنتر</h2>
        <div class="quiz-progress-label">السؤال ${currentQ + 1} من ${QUIZ.length}</div>
      </div>
      <div style="margin-bottom:18px;">
        <div style="height:4px; background:var(--surface-3); border-radius:99px; overflow:hidden;">
          <div style="height:100%; width:${pct}%; background:linear-gradient(90deg,var(--accent),#0EA5E9); border-radius:99px; transition:width 0.4s ease;"></div>
        </div>
      </div>
      <div class="quiz-q-num">السؤال ${currentQ + 1}</div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">${optionsHtml}</div>
      ${explainHtml}
      <div class="quiz-nav">
        <div class="quiz-dots">${dotsHtml}</div>
        ${answered[currentQ] !== null
          ? `<button class="btn btn-primary" style="font-size:12.5px; padding:8px 18px;" onclick="nextQuestion()">${nextLabel}</button>`
          : `<button class="btn btn-ghost" style="font-size:12px; padding:8px 16px;" disabled>اختر إجابة أولاً</button>`
        }
      </div>`;
  }

  function selectAnswer(idx) {
    if (answered[currentQ] !== null) return;
    answered[currentQ] = idx;
    if (idx === QUIZ[currentQ].correct) score++;
    saveQuizState();
    renderQuiz();
  }

  function nextQuestion() {
    if (currentQ < QUIZ.length - 1) {
      currentQ++;
      renderQuiz();
    } else {
      quizDone = true;
      renderQuiz();
    }
  }

  function renderResult(wrap) {
    const pct  = Math.round((score / QUIZ.length) * 100);
    let label, msg, color;

    if (pct >= 90) {
      label = 'محترف حقيقي 🏆'; color = '#22C55E';
      msg   = 'أداؤك استثنائي! أنت تمتلك المهارات الأساسية للكول سنتر وتطبّقها بوعي. يمكنك الانتقال للمستوى المتقدم.';
    } else if (pct >= 70) {
      label = 'مستوى جيد 👍'; color = 'var(--accent)';
      msg   = 'تمتلك قاعدة قوية، وعندك بعض النقاط التي تستحق مراجعة أعمق. أعد قراءة المهارات التي أخطأت فيها.';
    } else if (pct >= 50) {
      label = 'تحتاج تدريباً 📚'; color = '#EAB308';
      msg   = 'النتيجة مقبولة لكنها تُشير لفجوات واضحة. راجع بطاقات المهارات والسكريبتات وأعد الاختبار.';
    } else {
      label = 'ابدأ من الأساس 🔄'; color = '#EF4444';
      msg   = 'هذه نقطة انطلاق — لا قلق. الكول سنتر مهارة تُكتسب بالتدريب. ابدأ بالمهارات الست بالترتيب ثم أعد الاختبار.';
    }

    wrap.innerHTML = `
      <div class="quiz-result-wrap">
        <div class="quiz-result-score" style="-webkit-text-fill-color:${color}; background:none; color:${color};">${pct}%</div>
        <div class="quiz-result-label">${label}</div>
        <div style="font-size:13px; color:var(--text-muted); margin-bottom:6px;">أجبت صح على ${score} من ${QUIZ.length} أسئلة</div>
        <div class="quiz-result-msg">${msg}</div>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="restartQuiz()">إعادة الاختبار</button>
          <button class="btn btn-ghost" onclick="reviewAnswers()">مراجعة الإجابات</button>
        </div>
      </div>`;
  }

  function restartQuiz() {
    currentQ  = 0; score = 0;
    answered  = new Array(QUIZ.length).fill(null);
    quizDone  = false;
    renderQuiz();
  }

  function reviewAnswers() {
    const wrap = document.getElementById('quizContent');
    const letters = ['أ', 'ب', 'ج', 'د'];
    let html = '<div style="margin-bottom:16px; font-size:16px; font-weight:800; color:var(--text);">مراجعة جميع الإجابات</div>';

    QUIZ.forEach((q, qi) => {
      const userAns   = answered[qi];
      const isCorrect = userAns === q.correct;
      html += `
        <div style="background:var(--surface-2); border:1px solid ${isCorrect ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}; border-radius:var(--radius-md); padding:16px; margin-bottom:12px;">
          <div style="font-size:10px; font-weight:800; letter-spacing:1px; text-transform:uppercase; color:var(--text-faint); margin-bottom:6px;">سؤال ${qi + 1}</div>
          <div style="font-size:13.5px; font-weight:700; color:var(--text); margin-bottom:10px;">${q.q}</div>
          <div style="font-size:12px; color:${isCorrect ? '#22C55E' : '#EF4444'}; margin-bottom:4px;">
            ${isCorrect ? '✓ إجابتك: ' : '✗ إجابتك: '}<strong>${userAns !== null ? q.options[userAns] : 'لم تجب'}</strong>
          </div>
          ${!isCorrect ? `<div style="font-size:12px; color:#22C55E; margin-bottom:6px;">✓ الإجابة الصحيحة: <strong>${q.options[q.correct]}</strong></div>` : ''}
          <div style="font-size:11.5px; color:var(--text-muted); line-height:1.6; padding-top:8px; border-top:1px solid var(--border);">${q.explain}</div>
        </div>`;
    });

    html += `<div style="display:flex; justify-content:center; margin-top:16px;">
      <button class="btn btn-ghost" onclick="restartQuiz()">إعادة الاختبار من البداية</button>
    </div>`;
    wrap.innerHTML = html;
  }

  // Init quiz when page loads
  document.addEventListener('DOMContentLoaded', renderQuiz);
  // renderQuiz on callcenter nav — handled by unified nav listener below
  document.querySelectorAll('.module-card').forEach((card, idx) => {
    if (idx === 0) card.addEventListener('click', () => setTimeout(renderQuiz, 50));
  });
  // Render once immediately in case page is already active
  setTimeout(renderQuiz, 100);

  /* ============================================================
     SOCIAL MEDIA MODULE JS
  ============================================================ */

  // ---- BLOCK A: Hook Types Data ----
  const HOOK_TYPES = [
    {
      name: 'خطاف الصدمة الرقمية',
      icon: '⚡',
      desc: 'يكسر التوقع ويُجبر على التوقف. يعمل لأن الدماغ يتوقف تلقائياً أمام المعلومة غير المتوقعة.',
      platforms: {
        linkedin: ['لقد خسرت وظيفتي في يوم الترقية.', 'أربع سنوات من العمل — انتهت بـ 3 دقائق.', 'قبل ثلاث سنوات كنت أفترش الأرض في مكتبي. اليوم لدي 40 موظفاً.', 'رفضت عرض مليون ريال. لم أندم لحظة.', 'الشركة التي رفضت طلبي أصبحت عميلتي.'],
        twitter: ['أنهيت شراكة بـ 2 مليون بسبب رسالة واحدة.', 'أكبر خطأ في مسيرتي؟ كنت محقاً 100٪.', 'المنافس الذي سرق عميلي أنقذ شركتي.', 'قررت إغلاق الحساب. ثم حدث هذا.', 'لا أكذب عليكم: لست ناجحاً كما تظنون.'],
        instagram: ['اليوم أُغلق هذا الحساب — هذا سببي.', 'أربع سنوات و ٢٠٠ ألف متابع. والنتيجة؟ صفر.', '٣٦ ساعة بدون نوم لإنقاذ مشروعي.', 'رفضوا طلبي ٧ مرات. الثامنة غيّرت حياتي.', 'الصورة التي دمّرت حياتي المهنية — ولماذا نشرتها.'],
        tiktok: ['خسرت مليون في يوم واحد — هذا ما تعلّمته.', 'أمّي رأت هذا الفيديو. لا أندم.', 'في ٣٠ ثانية سأقول ما يخاف الجميع قوله.', 'الفيديو الذي خسّرني ٥٠٠٠ متابع. أهلاً بكم.', 'علّمني التيك توك ما لم تعلّمني إياه الجامعة.']
      }
    },
    {
      name: 'خطاف السؤال المقلق',
      icon: '❓',
      desc: 'يُفتح حلقة نفسية في ذهن القارئ. يشعر بعدم الاكتمال حتى يقرأ الإجابة.',
      platforms: {
        linkedin: ['هل أنت متأكد أن مديرك يريدك أن تنجح؟', 'لماذا أصحاب المواهب يُفصلون أكثر من غيرهم؟', 'ما الذي تفعله الشركات الناجحة في أول ٩٠ يوماً لا تعرفه؟', 'كم مرة قلت «أنا مشغول» وكنت في الواقع تتجنّب الصعب؟', 'متى كانت آخر مرة أضافت فيها قيمة — لا مجرد أكملت مهمة؟'],
        twitter: ['لماذا يكسب كثيرون أقل منك ويعيشون أفضل؟', 'ما الذي تخسره يومياً بسبب قرار لم تتخذه بعد؟', 'هل مديرك يعرف قيمتك؟ أم فقط يعرف سعرك؟', 'لماذا «العمل الجاد» ليس كافياً بعد الآن؟', 'من سيتذكرك في مجالك بعد ١٠ سنوات؟'],
        instagram: ['هل تعمل لتعيش أم تعيش لتعمل؟ أجب بصدق.', 'ما الذي ستفعله لو علمت أن لديك سنة واحدة فقط؟', 'متى آخر مرة انتظرت بفارغ الصبر أن يبدأ يوم العمل؟', 'هل اخترت هذا المسار — أم أن المسار اختارك؟', 'إذا غادرت شركتك اليوم، كم شخصاً سيفتقدك فعلاً؟'],
        tiktok: ['أنت ذكي — فلماذا لا تزال في نفس المكان؟', 'تعبان من الروتين؟ سؤال: متى بدأ يومك يشبه الأمس؟', 'لماذا صديقك الأقل منك تعليماً أكثر منك دخلاً؟', 'ما الهواية التي تركتها بسبب «الوقت»؟', 'متى آخر مرة شعرت أنك تتحدى نفسك فعلاً؟']
      }
    },
    {
      name: 'خطاف الإحصاء المفاجئ',
      icon: '📊',
      desc: 'الأرقام تُضفي مصداقية فورية وتُثير الفضول. كلّما كان الرقم معاكساً للتوقع كلّما كان أقوى.',
      platforms: {
        linkedin: ['٩٢٪ من المديرين لا يعرفون ما يريده فريقهم فعلاً.', '٧٨٪ من الموظفين يتركون مديرهم — لا شركتهم.', 'في أقل من ١٨ شهراً، ٦٠٪ من المهارات التقنية تصبح قديمة.', '٤٣٪ من الترقيات تذهب لمن يطلبها — لا لمن يستحقها.', 'الموظف السعيد أكثر إنتاجاً بـ ٣١٪ — لكن ٦٧٪ لا يشعرون بالتقدير.'],
        twitter: ['١ من كل ٣ أشخاص سيتركون وظيفتهم خلال ٦ أشهر.', 'الرد بعد ٥ دقائق يزيد نسبة الإغلاق ٨٠٪.', '٩ من كل ١٠ فرص عمل لا تُعلَن — تُملأ بالشبكة.', 'القرار الأول يُتخذ في ٧ ثوانٍ من مقابلة الوجه.', '١١ مرة في المتوسط — كم يُرى إعلانك قبل الشراء.'],
        instagram: ['٩ دقائق يومياً تزيد إنتاجيتك ٤٠٪ — مجرد تخطيط.', '٨٠٪ من نجاحك يأتي من ٢٠٪ من جهودك — أيها تختار؟', 'ينام ٤٠٪ من الناس وهم قلقون — وأنت؟', '٧ مرات ستغيّر مسارك قبل أن تجد نفسك.', '١٢ دقيقة من الهاتف — كل ذلك الوقت الذي تهدره يومياً.'],
        tiktok: ['٩٣٪ من تواصلك غير لفظي — صوتك وجسدك يقولان أكثر.', 'في ٤٨ ساعة تنسى ٧٠٪ مما تعلّمته. الحل في هذا الفيديو.', '٧ ثوانٍ فقط لأول انطباع — هل تعرف كيف تستغلها؟', '٣ قرارات يومياً تصنع ٩٠٪ من نتائجك السنوية.', '١٠٠ يوم كافية لتغيير حياتك — إليك الطريقة.']
      }
    },
    {
      name: 'خطاف القصة الشخصية',
      icon: '📖',
      desc: 'يبني تعاطفاً فورياً ويجعل الجمهور يرى نفسه في القصة. أقوى أنواع الخطافات لبناء الثقة.',
      platforms: {
        linkedin: ['قبل ٥ سنوات، قرأت بريداً بـ ٣ كلمات: «أنت مفصول». هكذا غيّرت حياتي.', 'في ٢٠١٩ كنت أخفي راتبي خجلاً. اليوم أتكلم عن الأرقام علناً.', 'مديري قال لي: «أنت جيد لكنك لست استثنائياً». كان هذا أفضل هدية.', 'أمضيت ٧ سنوات في نفس الدور دون ترقية. الخطأ كان في يدي طوال الوقت.', 'في اجتماعي الأول مع المجلس، قلت «لا أعرف». هذا ما فتح الباب.'],
        twitter: ['رفضوني ٩ شركات. العاشرة كانت فرصة حياتي.', 'أول عميل دفع لي ١٠٠ ريال. كان يساوي مليوناً في نفسيتي.', 'كانت أمي تقول: «الحكومة أضمن». ثم رأت مكتبي.', 'أنهيت شراكة بـ ٣ سنوات بسبب خلاف أخلاقي. لا ندم.', 'خسرت أكبر عقد في حياتي. ثم فهمت لماذا كان نعمة.'],
        instagram: ['في عمر ٢٦ أفلست. في عمر ٣٠ بنيت من جديد. هذا ما تعلّمته.', 'كنت أكره ما أفعله وابتسامتي كاذبة في كل صورة. حتى قررت التغيير.', 'قضيت ساعة أبكي في السيارة قبل الاجتماع. ثم دخلت وأغلقت الصفقة.', 'لم يصدّقني أحد في البداية. هذا يدفعني حتى اليوم.', 'أمّي باعت ذهبها لتموّل دراستي. هذا ما يجعلني لا أتوقف.'],
        tiktok: ['كنت خائفاً جداً حتى من نشر هذا الفيديو الأول.', 'قصتي: صفر متابعين → ١٠٠ ألف في ٨ أشهر. كيف؟', 'في يوم واحد خسرت عملي وانفصلت. هكذا نجوت.', 'أبي لم يؤمن بي. أرسلت له هذا الفيديو بعد نجاحي.', 'في عمر ٣٥ قررت أبدأ من الصفر. أخطأت؟ اسمع القصة.']
      }
    },
    {
      name: 'خطاف الخلاف الجريء',
      icon: '🔥',
      desc: 'يستفز الجمهور للرد والمشاركة. يولّد تعليقات كثيرة — حتى المعارضة تخدم الـ reach.',
      platforms: {
        linkedin: ['الشغف وحده لن يُطعمك. توقف عن اتباع هذه النصيحة.', 'المرونة ليست فضيلة — إنها مشكلة تسمّيها الشركات بطولة.', '"العمل بصمت" نصيحة من لا يريدك أن تُهدّد مكانته.', 'معظم كتب الإدارة تبيع أوهاماً — هذه هي الحقيقة.', 'شبكة العلاقات مهمة — لكن المواهب المتوسطة تبيعها أكثر من اللازم.'],
        twitter: ['التوازن بين العمل والحياة وهم يبيعه من لم ينجح بعد.', 'المدراء الجيدون نادرون لأن الشركات لا تدرّب عليه.', 'الترقية ليست عدالة — هي سياسة. تعلّم القواعد.', '«النجاح يستغرق وقتاً» جملة يقولها الفاشلون للصبر.', 'الساعات الطويلة ليست التزاماً — هي فشل في التخطيط.'],
        instagram: ['الـ self-care لن يحل مشكلة نظام عمل مكسور.', 'إذا كنت تحتاج «تحفيزاً يومياً» فأنت تسير في الاتجاه الخطأ.', 'الاجتهاد دون استراتيجية هو تعب منظّم فقط.', 'معظم «نصائح النجاح» مصممة لبيع دورات — لا لمساعدتك.', 'الـ hustle culture سبب الاحتراق — لا التقصير.'],
        tiktok: ['قولوا ما تريدون: الحظ أهم من الموهبة في ٨٠٪ من الحالات.', 'التعليم الجامعي في معظم التخصصات وقت ضائع في ٢٠٢٥.', 'الـ productivity trends تبيعك وهم الإنجاز دون تغيير حقيقي.', '«اتبع شغفك» نصيحة خاطئة لـ ٩٥٪ من الناس.', 'التيك توك لا يصنع نجاحاً حقيقياً — يصنع شهرة مؤقتة.']
      }
    }
  ];

  let activeHookType = 0;

  function selectHookType(idx) {
    activeHookType = idx;
    document.querySelectorAll('.hook-type-btn').forEach((b, i) => {
      b.classList.toggle('active', i === idx);
    });
    renderHookPanel();
  }

  function renderHookPanel() {
    const hook = HOOK_TYPES[activeHookType];
    const panel = document.getElementById('hookPanel');
    if (!panel) return;

    const platMap = {
      linkedin: { label: 'LinkedIn 💼', color: '#0A91CC' },
      twitter:  { label: 'X / تويتر 𝕏', color: '#1DA1F2' },
      instagram:{ label: 'Instagram 📸', color: '#E4405F' },
      tiktok:   { label: 'TikTok 🎵', color: '#FE2C55' }
    };

    let html = `
      <div style="background:var(--surface); border:1px solid var(--border-hover); border-radius:var(--radius-lg); padding:18px; margin-bottom:16px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
          <span style="font-size:22px;">${hook.icon}</span>
          <div>
            <div style="font-size:14px; font-weight:800; color:var(--text);">${hook.name}</div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">${hook.desc}</div>
          </div>
        </div>
      </div>
      <div class="hook-examples-grid">`;

    Object.entries(hook.platforms).forEach(([platform, examples]) => {
      const p = platMap[platform];
      html += `
        <div class="hook-platform-card">
          <div class="hook-platform-name" style="color:${p.color};">${p.label}</div>`;
      examples.forEach(ex => {
        html += `<div class="hook-example">${ex}</div>`;
      });
      html += `</div>`;
    });

    html += `</div>`;
    panel.innerHTML = html;
    panel.style.animation = 'none';
    panel.offsetHeight;
    panel.style.animation = 'pageFadeIn 0.3s ease';
  }

  // Init hook panel
  document.addEventListener('DOMContentLoaded', renderHookPanel);
  // renderHookPanel on social nav — handled by unified nav listener below
  setTimeout(() => { renderHookPanel(); renderSmartCalendar(); }, 150);

  // ====================================================================
  //  SIMULATION LAB ENGINE
  // ====================================================================
  const SCENARIOS = {
    // ─────────────────────────────────────────────
    //  كول سنتر (5 scenarios)
    // ─────────────────────────────────────────────
    cc_01: {
      id: 'cc_01', category: 'callcenter', title: 'الاستقبال المثالي وبناء الثقة', difficulty: 2,
      setup: 'بدأت وردية جديدة في مركز خدمة اتصالات. رنّ الهاتف — العميل الأول يتصل وأنت تعرف أن الانطباع الأول يُحدد مسار المكالمة كلها.',
      dialogue_opener: 'ألو؟ هل هذا رقم الشركة؟ أريد أستفسر عن فاتورتي...',
      psychological_context: 'العميل في حالة ارتباك طفيف — يحتاج تأكيداً فورياً أنه وصل للمكان الصحيح وأن هناك شخصاً كفؤاً سيساعده. أول 8 ثوانٍ تُحدد ما إذا كان سيتعاون أم سيظل متحفزاً.',
      choices: [
        { text: 'نعم، تفضل، كيف أخدمك؟', score: 10, feedback: 'ردّ قصير جداً — لم يُعرّف بنفسه ولا بالشركة. العميل لا يزال لا يعرف مع من يتحدث.', consequence: 'أنا... ومع مَن أتكلم؟ هل وصلت للقسم الصحيح؟' },
        { text: 'السلام عليكم، معكم [اسمك] من شركة [الشركة]، يسعدنا خدمتك — كيف أقدر أساعدك اليوم؟', score: 100, feedback: 'ممتاز! التعريف الكامل يُزيل التردد ويُعطي العميل شعور الأمان والاحترافية فوراً.', consequence: 'أهلاً، بكل سرور — أنا أبغى أستفسر عن فاتورة الشهر الماضي...' },
        { text: 'نعم مرحباً، اسمي [اسمك]، اتفضل؟', score: 60, feedback: 'جيد، لكنه ناقص — لم يذكر اسم الشركة. العميل قد يظل في شك.', consequence: 'أهلاً، هذا رقم [الشركة] صح؟ أنا أبغى أسأل عن...' },
        { text: 'معك قسم الدعم، أفضل معي؟', score: 30, feedback: 'مقبول لكن بارد — لا اسم ولا ترحيب، يبدو روبوتياً ويُقلّص الثقة من البداية.', consequence: 'آه... تمام. عندي سؤال عن الفاتورة...' }
      ],
      expert_move: 'يقول الخبير: «السلام عليكم أهلاً وسهلاً، معكم [الاسم] من [الشركة]. يسعدنا خدمتكم — ممكن أعرف اسمك الكريم عشان أقدر أخدمك بشكل أفضل؟» — التعريف + الترحيب + طلب الاسم = ثلاثية الاستقبال الذهبي.',
      principle: 'مبدأ التعريف الأول: الدراسات تُثبت أن 73% من العملاء يُقررون مدى ثقتهم بموظف الخدمة في أول 10 ثوانٍ. اسم واضح + شركة واضحة = أمان نفسي فوري.'
    },
    cc_02: {
      id: 'cc_02', category: 'callcenter', title: 'العميل الغاضب — تقنية HEAT', difficulty: 4,
      setup: 'اتصل بك عميل واضح أنه في حالة غضب شديد. قال بداية المكالمة إنه اتصل أكثر من مرة ولم يُحَل مشكلته. يرفع صوته.',
      dialogue_opener: 'هذا الثالث مرة أتصل وكل مرة يقولون لي «نتابع» و«ننتظر» — ما صار شيء! ما هذا الكلام؟!',
      psychological_context: 'الغضب هنا ليس عدوانية شخصية — هو ألم متراكم من الشعور بعدم الاهتمام. العميل يريد أن يُسمع ويشعر أن شخصاً ما أخذ مشكلته بجدية. أي دفاع أو تبرير في هذه اللحظة سيُضاعف الغضب.',
      choices: [
        { text: 'هذا الموضوع مو من قِبَلنا، أنت تحتاج تتصل بالقسم الثاني...', score: 0, feedback: 'خطأ فادح! التحويل وكأنك تهرب يُشعل غضب العميل. يفسّره بأنك لا تكترث.', consequence: 'ما أبغى أُحوَّل مرة ثانية! هل تعرف كم مرة حوّلوني؟ أبغى مسؤول الحين!' },
        { text: 'أفهم إحساسك، بس ما أقدر أساعدك إذا ما تهدأ...', score: 5, feedback: 'خطأ — طلب الهدوء من العميل الغاضب يُشعره بأنك لا تأخذه بجدية وتضع شروطاً.', consequence: 'أنا هادئ! المشكلة إنكم ما تحلون شيء — هذا اللي يجنّن!' },
        { text: 'والله أنا أفهم إحساسك تماماً، وأنا آسف جداً على ما مررت به. ثلاث مرات بدون نتيجة — هذا مقبول. أنا شخصياً رح أتابع معك هذا الموضوع الحين، ممكن تحكيلي بالضبط ش اللي صاير؟', score: 100, feedback: 'تقنية HEAT المثالية: استماع + تعاطف + اعتذار + تعهد بالتصرف. العميل يشعر فوراً بالفرق.', consequence: 'صراحة... أخيراً أحد يستمع. المشكلة إن فاتورتي فيها مبلغ غلط منذ شهرين...' },
        { text: 'شكراً لاتصالك، سأسجّل شكواك وسيتواصل معك أحد خلال 48 ساعة.', score: 20, feedback: 'مقبول لكن بارد جداً ولا يعالج الغضب. 48 ساعة بعد ثلاث مرات سابقة = ضمانة تصعيد جديدة.', consequence: 'سجّل؟ قالوا نفس الكلام ثلاث مرات! أنا أبغى حلاً الحين مو وعداً ثانياً!' }
      ],
      expert_move: 'الخبير يستخدم HEAT: H=Hear (يستمع دون مقاطعة)، E=Empathize (يتعاطف بصدق)، A=Apologize (يعتذر بوضوح)، T=Take action (يتعهد بخطوة فورية ملموسة).',
      principle: 'مبدأ «الأذن قبل الحل»: العقل العاطفي يُغلق أمام المنطق عند الغضب. فقط بعد أن يشعر العميل بأنه مسموع يمكن للمخ التنفيذي أن يتلقى الحلول.'
    },
    cc_03: {
      id: 'cc_03', category: 'callcenter', title: 'الاستماع النشط والتلخيص', difficulty: 3,
      setup: 'عميل يشرح لك طلباً معقداً يتضمن عدة شروط ومتطلبات متزامنة. يتكلم بسرعة ويبدو قلقاً من أن تفهمه غلط.',
      dialogue_opener: 'أبغى أغيّر الباقة، بس شرط ما أفقد الأرقام القديمة، والتحويل يكون هذا الأسبوع قبل الخميس، وأبغى التأكيد كتابياً على الإيميل...',
      psychological_context: 'العميل قلق من تكرار سوء الفهم — ربما مرّ بتجربة سابقة سيئة. يريد الطمأنينة أنك «معه» حقاً وأن تفاصيله وصلت كلها. التلخيص هنا ليس إجراءً — هو اطمئنان نفسي.',
      choices: [
        { text: 'أيوه أيوه، فاهم، وش بعدين؟', score: 5, feedback: 'ردّ كاذب — لا يثبت أنك فهمت أي تفصيلة واحدة. العميل سيشك في أنك كنت تستمع.', consequence: 'إذن فهمت كل الشروط؟ أبغى أتأكد لأن مرة قبل حولوني وما نفّذوا شيء...' },
        { text: 'تمام، خليني أتأكد: أنت تبغى تغيير الباقة مع الحفاظ على الأرقام، التحويل قبل الخميس، وتأكيد كتابي على الإيميل — صح؟', score: 100, feedback: 'التلخيص الدقيق ثلاثي الشروط يُثبت الاستماع الحقيقي ويُزيل القلق. العميل سيرتاح فوراً.', consequence: 'أيوه بالضبط هذا اللي قصدته! الحمد لله، أخيراً أحد يفهم. تقدر تسوي هذا؟' },
        { text: 'سأحتاج تتصل بقسم الترقيات عشان تغيير الباقة، وقسم التقنية للأرقام...', score: 15, feedback: 'تجاهلت التلخيص وقفزت للتحويل — أسوأ شيء ممكن تفعله مع عميل قلق من سوء التنسيق.', consequence: 'قلت لك ما أبغى أُحوَّل! أبغى حل متكامل من شخص واحد.' },
        { text: 'حسناً، سأرسل لك بريداً إلكترونياً بكل التفاصيل بعد الانتهاء.', score: 40, feedback: 'مقبول لكن لم تُلخّص ما فهمته — العميل لا يزال لا يعرف إذا فهمت فعلاً أم لا.', consequence: 'أمل إنك فهمت كل الشروط — أبغى أتأكد إنك ما نسيت موضوع الأرقام...' }
      ],
      expert_move: 'الخبير يُلخّص ثم يُرقّم: «خليني أتأكد من ثلاثة أشياء: أولاً الباقة تتغير. ثانياً الأرقام تبقى. ثالثاً التحويل قبل الخميس مع تأكيد إيميل. صح؟» — الترقيم يُظهر الدقة ويطمئن.',
      principle: 'مبدأ مرآة الفهم: التلخيص الدقيق يُعطي العميل «نسخة مرآة» من كلامه، مما يُعزز الثقة بأنه مسموع. دراسات الاتصال تُثبت أنه يُقلّل الأخطاء 40%.'
    },
    cc_04: {
      id: 'cc_04', category: 'callcenter', title: 'إغلاق المكالمة والتحقق من الرضا', difficulty: 2,
      setup: 'حللت مشكلة العميل بنجاح. المشكلة التقنية إنه يريد أن يطرح سؤالاً إضافياً لكن يتردد في ذكره. المكالمة طويلة وهناك قائمة انتظار.',
      dialogue_opener: 'شكراً، حليت المشكلة... بس... لا ما شيء، هذا كافي، شكراً.',
      psychological_context: 'العميل عنده سؤال ثانٍ لكنه يشعر بأنه «يُثقّل». إما أنه يتحاشى الإطالة أو أن نبرتك أوحت له بالتسرع. إنهاء المكالمة الآن يعني عودة اتصال ثانٍ قريباً.',
      choices: [
        { text: 'عظيم! شكراً لاتصالك، يوم سعيد.', score: 10, feedback: 'أسرعت بالإغلاق. العميل سيتصل مرة ثانية بسؤاله الثاني — وقت مضاعف بدل توفيره.', consequence: '...' },
        { text: 'تمام إذن، هل هناك أي شيء آخر قبل ما أُغلق؟', score: 70, feedback: 'جيد لكن الصياغة سلبية — «قبل ما أُغلق» يُشير للتسرع. لا تزال تُعطي إذناً بطرح السؤال.', consequence: 'آه... في الحقيقة عندي سؤال ثاني إذا ما فيه ضيقة...' },
        { text: 'ممتاز إن حُلّت المشكلة. قبل ما أختم معك، أبغى أتأكد — هل في شيء ثاني أقدر أساعدك فيه؟ أنا معك.', score: 100, feedback: 'إضافة «أنا معك» تُزيل إحساس العميل بأنه يُثقّل وتُشجّعه على الكشف عن السؤال الثاني.', consequence: 'أهلاً وسهلاً، بالفعل عندي سؤال سريع عن رقم آخر في الحساب...' },
        { text: 'تمام يعطيك العافية — لا تتردد في الاتصال مرة ثانية.', score: 30, feedback: 'أغلقت المكالمة قبل التحقق. جملة «اتصل مرة ثانية» تعترف ضمنياً أنك لم تُكمل خدمته.', consequence: '...' }
      ],
      expert_move: 'الخبير يُطبّق «التحقق المزدوج»: أولاً يُعبّر عن سعادته بالحل، ثانياً يسأل بصياغة مشجّعة: «أبغى أتأكد قبل ما نختم — في أي شيء ثاني؟ وقتك غير محدود عندي».',
      principle: 'مبدأ الباب المفتوح: 62% من العملاء الذين يُغلق عليهم الموظف بسرعة يُعيدون الاتصال خلال ساعتين. سؤال واحد يُوفّر مكالمة كاملة.'
    },
    cc_05: {
      id: 'cc_05', category: 'callcenter', title: 'التعامل مع الصمت والتردد', difficulty: 3,
      setup: 'عميل اتصل ولم يتحدث لمدة ثوانٍ بعد ردّك — يبدو أنه في حالة نفسية صعبة أو أنه غير متأكد من طلبه.',
      dialogue_opener: '...مرحباً... أنا... في الحقيقة ما أدري كيف أبدأ...',
      psychological_context: 'هذا العميل يمر بضغط عاطفي أو ارتباك — ربما مشكلة مالية، أو قرار صعب. التسرّع في المقاطعة أو طرح الأسئلة سيُغلق انفتاحه. يحتاج مساحة ووقتاً.',
      choices: [
        { text: 'أيوه؟ تفضل، عندك شيء تبغى تسأل عنه؟', score: 20, feedback: 'صياغة محايدة لكنها تضغط بالسؤال. ربما يُشعره بأنه يجب أن يُقرر الآن.', consequence: 'أنا... عندي مشكلة بس ما أعرف إذا صحيح أسألكم...' },
        { text: 'لا بأس خذ وقتك، أنا هنا وما في أي استعجال.', score: 100, feedback: 'منح المساحة هو الجواب الصحيح. إزالة ضغط الوقت يفتح الثقة ويُخرج ما في داخل العميل.', consequence: 'شكراً... في الحقيقة أنا مشكلتي إن فاتورتي عالية ومرتبي ما يكفي هالشهر...' },
        { text: 'حسناً إذا ما عندك سؤال سأضطر للإنهاء، عندنا خط انتظار.', score: 0, feedback: 'كارثي — هذا الردّ يُغلق العميل نهائياً ويُسبّب تجربة سلبية بالغة الأثر.', consequence: '... شكراً.' },
        { text: 'تفضل، قل لي كيف أقدر أساعدك؟', score: 50, feedback: 'محايد ومقبول لكن يطلب منه التحدث دون أن يُزيل توتره. ناقصه الدفء والطمأنينة.', consequence: 'أنا... في الحقيقة عندي موقف ومحتاج أسأل...' }
      ],
      expert_move: 'الخبير يُعطي المساحة ثم يُرشّد بلطف: «لا بأس خذ وقتك — وأياً كان موضوعك، أنا هنا أساعدك. ما في شيء صعب أو غريب، حدّث.» — الإذن الصريح يفتح الصمت.',
      principle: 'مبدأ الصمت الذهبي: الصمت لدى العميل ليس فراغاً — هو معلومة. الموظف الماهر يُقرأ الصمت ويستجيب بالدفء لا بالسؤال.'
    },

    // ─────────────────────────────────────────────
    //  مبيعات (5 scenarios)
    // ─────────────────────────────────────────────
    sa_01: {
      id: 'sa_01', category: 'sales', title: 'العميل المتردد — إغلاق القرار', difficulty: 3,
      setup: 'قضيت 45 دقيقة في شرح المنتج لعميل واعد. الآن وصلتم للمرحلة النهائية — لكنه يتراجع ويقول يريد وقتاً للتفكير.',
      dialogue_opener: 'الموضوع حلو بس أحتاج أفكر... ممكن ترجعلي بعد أسبوعين؟',
      psychological_context: 'التردد في هذه المرحلة غالباً ليس شكاً حقيقياً في المنتج — بل خوف من الخطأ أو ضغط داخلي. العميل يحتاج شخصاً يُساعده على الانتقال من التفكير إلى القرار بأمان.',
      choices: [
        { text: 'بالتأكيد، خليني أتصل بك بعد أسبوعين.', score: 10, feedback: 'الاستسلام الكامل — يُفقدك الصفقة غالباً. العميل المتردد نادراً ما يعود من تلقاء نفسه.', consequence: 'شكراً... سأبقى في تواصل.' },
        { text: 'طبعاً أحترم قرارك، بس خلني أسألك سؤال واحد: اللي بيخليك تتردد هو السعر ولا شيء ثاني؟', score: 100, feedback: 'سؤال الكشف الذهبي — يُشخّص سبب التردد الحقيقي بدل افتراضه. هذا يفتح محادثة حقيقية.', consequence: 'لا السعر ما هو المشكلة... بس مو عارف إذا الوقت مناسب الحين للتحول لنظام جديد.' },
        { text: 'العرض ينتهي هذا الأسبوع فقط، إذا ما اشتريت الحين تخسر الخصم.', score: 30, feedback: 'ضغط مصطنع قد يُغضب العميل إذا علم أن العرض مستمر. يبني ثقة زائفة.', consequence: 'إذا العرض بينتهي، لازم أفكر أكثر — ما أبغى أُضغط عليّ.' },
        { text: 'ما في مشكلة، بس قبل ما تفكر خليني أُلخّص لك أهم 3 فوائد تحديداً لوضعك.', score: 70, feedback: 'جيد — يُعطيه دافعاً نهائياً قبل التأجيل. لكنه أقل دقة من الكشف عن سبب التردد.', consequence: 'تمام، سمعت...' }
      ],
      expert_move: 'يكشف عن سبب التردد أولاً بسؤال مفتوح، ثم يُعالجه بدقة. إذا كان الوقت هو الحاجز، يقترح «تثبيت السعر الحالي» مع موعد تنفيذ لاحق. يُعطي الأمان لا الضغط.',
      principle: 'مبدأ حاجز القرار: 70% من حالات التردد ليست رفضاً للمنتج — بل رفضٌ للمخاطرة. الحل هو تقليل المخاطرة المتصوّرة، لا زيادة الضغط.'
    },
    sa_02: {
      id: 'sa_02', category: 'sales', title: 'السعر أغلى من المنافس', difficulty: 4,
      setup: 'اجتمعت بعميل كبير وقدّمت عرضاً. الرد جاء بأن منافسك يقدم نفس الخدمة بسعر أقل بـ20%.',
      dialogue_opener: 'شوف، شركة [س] عرضت علينا نفس الشيء بـ20% أقل. مالك تنافسهم؟',
      psychological_context: 'العميل يختبرك — هل ستنهار وتُخفض السعر فوراً؟ أم ستدافع عن القيمة؟ إذا خفّضت فوراً تُفقد المصداقية وتُشير أن سعرك الأصلي كان مبالغاً فيه.',
      choices: [
        { text: 'حسناً، أقدر أُعطيك خصم 15% لإغلاق الصفقة اليوم.', score: 15, feedback: 'أثبتّ له أن سعرك قابل للتفاوض — وهذا يُشير ضمنياً أنك كنت تطلب أكثر من اللازم. سيطلب أكثر.', consequence: 'إذا قدرت تعطيني 15%، ممكن أطلب 20%...' },
        { text: 'نحن نقدم نفس الجودة بسعر أقل — الاختلاف في التفاصيل الصغيرة التي لن تؤثر عليكم.', score: 5, feedback: 'أسوأ رد — أنت بنفسك قلّلت من قيمة خدمتك وأعطيت العميل مبرراً للذهاب للمنافس.', consequence: 'إذن لماذا أدفع أكثر لنفس الشيء؟' },
        { text: 'أفهم السؤال — خليني أسألك: ما هي الأشياء الثلاثة الأهم بالنسبة لك في هذا النوع من الخدمة؟', score: 80, feedback: 'ذكي — يُحوّل المحادثة من السعر إلى القيمة. يكتشف أولوياته ثم يُربطها بميزاتك.', consequence: 'الأهم لي: الموثوقية، السرعة في الحل، وعدم انقطاع الخدمة.' },
        { text: 'عندما تُقارن العرضين جنباً لجنب ستجد فروقاً في [ميزة 1] و[ميزة 2] التي تحديداً تُحل مشكلتكم مع [موضوع محدد].', score: 100, feedback: 'الربط المباشر بين ميزاتك المحددة ومشكلته المحددة — يُحوّل المقارنة من سعر إلى قيمة مُثبتة.', consequence: 'هذه النقطة الثانية مهمة لنا فعلاً... حدّثني أكثر عن هذا.' }
      ],
      expert_move: 'لا يُخفّض السعر مباشرة. يُسأل العميل عن أولوياته، ثم يربط كل ميزة بمبرر مالي: «الموثوقية التي نضمنها تعني صفراً من الأوقات الميتة — احسب ماذا يكلّفك الانقطاع ساعة واحدة».',
      principle: 'مبدأ تحويل المعيار: العميل يقارن بالسعر لأنه لم يتّضح له فارق القيمة بعد. مهمتك تحويل المعيار من «كم يكلّف» إلى «كم يُوفّر» أو «كم مشكلة يحلّ».'
    },
    sa_03: {
      id: 'sa_03', category: 'sales', title: 'الوصول لصاحب القرار', difficulty: 4,
      setup: 'تحاول بيع نظام لشركة متوسطة. تمكّنت من الوصول للمدير التنفيذي لكنه قال إن القرار عند مديره التقني وهو لا يتدخل.',
      dialogue_opener: 'شوف، موضوع الأنظمة التقنية يقرره مدير IT عندنا، أنا ما أتدخل في هذه الأمور.',
      psychological_context: 'المدير يُحيلك للمستوى التنفيذي لأن ذلك سيُطيل الأمر وربما يُقتل العرض. لكن قد يكون هو المستفيد الأكبر من النظام — لمجرد إحالته لمدير IT.',
      choices: [
        { text: 'حسناً، ممكن تُعطيني رقم مدير IT؟', score: 30, feedback: 'مقبول لكنه يُفقدك النفوذ — إذا ذهبت لمدير IT بدون دعم المدير التنفيذي، ستُعامَل كبائع عادي.', consequence: 'طبعاً، سأطلب من سكرتيرتي تُعطيك رقمه.' },
        { text: 'أفهم، بس قبل ما أتكلم معه — بتعطيني 5 دقائق تشوف كيف هذا النظام يؤثر على قرارات الإدارة؟ العائد من وجهة نظرك أنت مختلف.', score: 100, feedback: 'تحافظ على المدير التنفيذي كحليف بتقديم قيمة بمستواه — يُصبح مدافعاً لك عند مدير IT.', consequence: 'خمس دقائق؟ حسناً، تفضّل...' },
        { text: 'إذن مدير IT هو صاحب القرار — سأعود لكم بعد التحدث معه.', score: 10, feedback: 'ستدخل للمفاوضات بدون دعم الإدارة العليا — معركة شاقة مع احتمال قتل الصفقة.', consequence: '...' },
        { text: 'بتفهمون أن النظام يوفّر 30% من التكاليف التشغيلية — هذا يهمك كمدير، صح؟', score: 70, feedback: 'ربط مالي جيد لكنه مباشر جداً ويبدو بيعياً. يفضّل الاستئذان قبل عرض الأرقام.', consequence: 'ممكن — بس أنا ما أقرر في هذا.' }
      ],
      expert_move: 'يطلب «تحالفاً ثلاثياً»: اجتماع مشترك مع المدير التنفيذي ومدير IT. يُقدّم لكل منهما ما يُهمّه: للتنفيذي النتائج المالية، للتقني المواصفات. القرار يصدر بتوافق لا بانفراد.',
      principle: 'مبدأ التحالف الداخلي: الصفقات الكبيرة نادراً ما تُقرر من شخص واحد. البائع الماهر يُحوّل كل طرف في الشركة إلى بطل داخلي للحل.'
    },
    sa_04: {
      id: 'sa_04', category: 'sales', title: 'العميل القديم يُهدد بالرحيل', difficulty: 5,
      setup: 'عميل تجمعك معه علاقة 3 سنوات أرسل رسالة مفاجئة يقول فيها أنه تلقى عرضاً أفضل من منافس ويفكر في التحول.',
      dialogue_opener: 'نقدّر علاقتنا معكم، بس استقبلنا عرضاً من شركة أخرى أفضل بكثير. نريد نعرف ماذا تقدمون لنا للاستمرار.',
      psychological_context: 'العميل لم يرحل بعد — أرسل رسالة تعني أنه يُريد أن تُقنعه بالبقاء. إذا كان قد قرر قطعياً لما تواصل. هذه فرصة، لكنها تتطلب دفاعاً عن القيمة لا استرضاءً مالياً فورياً.',
      choices: [
        { text: 'قدّر إيش العرض اللي جاكم وسنحاول نوافقه.', score: 20, feedback: 'تضع نفسك في موقع دفاعي وتُقرّ بأن القيمة هي فقط في السعر. الطريف أنهم قد يرفعون سقف التوقع.', consequence: 'العرض الثاني فيه... [سيطلبون أكثر مما أعطاهم المنافس]' },
        { text: 'نثمّن العلاقة وسنقدم خصماً حصرياً خاصاً بكم كعميل قديم.', score: 40, feedback: 'أفضل لكنه لا يزال يُحوّل كل شيء للسعر. لماذا لم تُعطهم هذا الخصم منذ البداية؟', consequence: 'كم يبلغ الخصم؟' },
        { text: 'يسعدنا دائماً نكون الأفضل لكم. قبل أي رقم، أبغى أفهم: ما الذي شعرتم بأنه ناقص في خدمتنا خلال الثلاث سنوات؟', score: 100, feedback: 'يكتشف الجذر الحقيقي: هل هو سعر فقط؟ أم توجد شكاوى خدمية لم تُقَل؟ هذا يفتح الحوار الصادق.', consequence: 'صراحة، أبطأتم في الردود خلال الشهرين الأخيرين وهذا أثّر علينا...' },
        { text: 'نفهم — لكن العلاقة التي بنيناها والمعرفة بعملياتكم لا يمكن للمنافس الجديد أن يُعوّضها سريعاً.', score: 70, feedback: 'حجة قوية لكنها غير كافية وحدها. تحتاج دليلاً ملموساً لا مجرد كلام.', consequence: 'هذا صحيح لكن عملياً إذا السعر فيه فرق كبير...' }
      ],
      expert_move: 'الخبير يجري «مراجعة العلاقة» أولاً: يكتشف ما إذا كانت هناك شكاوى مخفية، ثم يُعالجها، ثم يُقدّم عرضاً مُخصصاً يعتمد على التاريخ المشترك والمعرفة العميقة.',
      principle: 'مبدأ «تكلفة التحول»: بناء الثقة مع مورّد جديد يستغرق 6-12 شهراً. الخبير يُذكّر العميل بهذه التكلفة غير الظاهرة ليُوازنها مع الفارق السعري.'
    },
    sa_05: {
      id: 'sa_05', category: 'sales', title: 'إعادة العميل الذي رفض قبلاً', difficulty: 3,
      setup: 'اتصلت قبل ثلاثة أشهر بعميل مهم وعرضت عليه خدمتك فرفض. الآن قررت المحاولة مرة ثانية بعد أن تغيّر شيء في ظروف السوق.',
      dialogue_opener: 'ألو؟ آه أنت اللي اتصل قبل أشهر... كنت قلت لي «لا» وقتها.',
      psychological_context: 'العميل يتذكر الرفض — وهو بحاجة لمبرر منطقي يُقنعه بأن هذه المكالمة ليست مضيعة وقت. إذا لم تُقدم سبباً جديداً واضحاً للاتصال، سيُغلق الخط.',
      choices: [
        { text: 'أيوه أنا، فكرت يمكن الوضع تغيّر وأبغى أعطيك فرصة ثانية.', score: 10, feedback: 'تُظهر أن اتصالك بلا سبب جديد — مجرد محاولة. هذا يُؤكد رفضه السابق.', consequence: 'وضعنا لم يتغير، شكراً.' },
        { text: 'أعرف إنك قلت «لا» — ووقتها كان قرارك صح. بس اليوم أتصل لأن [سبب محدد تغيّر في السوق] وهذا يؤثر مباشرة على [وضع العميل]. أبغى فقط 3 دقائق.', score: 100, feedback: 'تعترف بالرفض السابق + تُقدّم سبباً جديداً محدداً + تطلب وقتاً قصيراً = فتح الباب بذكاء.', consequence: 'ثلاث دقائق فقط؟ حسناً، تفضّل...' },
        { text: 'نعم، بس هذه المرة عندنا عرض خاص ما كان متاحاً.', score: 40, feedback: 'السعر والعروض حافز ضعيف إذا لم يكن مقتنعاً بالحاجة أصلاً.', consequence: 'ما أبغى عروضاً إذا المنتج ما يناسبني.' },
        { text: 'أيوه، وأنا آسف على إزعاجك مرة ثانية، بس عندي معلومة مهمة.', score: 30, feedback: 'الاعتذار يُقلّل من قوة موقفك. لا تعتذر على الاتصال إذا كان لديك قيمة حقيقية.', consequence: 'ما هي المعلومة؟' }
      ],
      expert_move: 'الاعتراف بالرفض السابق يُبني المصداقية. ثم يُقدّم «سبب المكالمة» بوضوح: تغيير في اللوائح أو السوق أو ظرف العميل يجعل المنتج أكثر ملاءمة الآن.',
      principle: 'مبدأ المتغير الجديد: كل «لا» سابقة كانت صحيحة في سياقها. اتصالك الثاني يجب أن يُقدّم متغيراً جديداً حقيقياً — وإلا فالرفض مضمون مرة ثانية.'
    },

    // ─────────────────────────────────────────────
    //  سوشيال ميديا (3 scenarios)
    // ─────────────────────────────────────────────
    sm_01: {
      id: 'sm_01', category: 'social', title: 'تعليق سلبي فيروسي', difficulty: 3,
      setup: 'نشرت شركتك منشوراً ترويجياً على Instagram. في أقل من ساعة، كتب أحد المتابعين تعليقاً ساخراً يتهمكم بالكذب ويتهمك بالاحتيال. بدأ التعليق يحصل على لايكات ويُشارَك.',
      dialogue_opener: 'هذه الشركة احتيال! اشتريت منهم قبل شهر والمنتج كان مختلفاً تماماً عن الإعلان. لا تشتروا منهم! 😡',
      psychological_context: 'التعليق ينتشر لأنه يستهدف مخاوف جوهرية: الخداع والمال. الصمت أو الحذف سيُفاقم الموقف. الرد الدفاعي سيُشعل المزيد. المطلوب: اعتراف + فعل + شفافية.',
      choices: [
        { text: 'حذف التعليق وتجاهل الموضوع.', score: 0, feedback: 'الحذف هو أسوأ قرار — المتابعون سيلاحظون ويُعلّقون عليه. ستبدو وكأنك تُثبت الاتهام.', consequence: '[المتابعون يبدأون بنشر لقطات شاشة للتعليق مع عبارة «حذفوا التعليق!»]' },
        { text: 'عزيزي العميل، نحن نرفض هذه الاتهامات ونؤكد أن منتجاتنا مطابقة للمواصفات.', score: 15, feedback: 'رد دفاعي ورسمي بارد — يُغضب أكثر ولا يُقدّم حلاً. يجعلك تبدو كشركة لا تهتم.', consequence: '[المزيد من التعليقات الغاضبة: «يردون بالإنكار بدل الحل»]' },
        { text: 'نأسف جداً لهذه التجربة! نُريد نفهم ما الذي حدث تحديداً — تواصل معنا على الخاص حتى نُعوّضك ونُحلّ الموضوع.', score: 80, feedback: 'جيد — تُظهر اهتماماً حقيقياً وتُحوّل النقاش للخاص. لكنه ناقص الشفافية العلنية.', consequence: '[المتابعون يرون الرد ويُشيدون به، لكن بعضهم يتساءل: هل ستحلون فعلاً؟]' },
        { text: 'أهلاً [اسم المتابع]، نأسف على هذه التجربة. التزامنا بك وبكل عملائنا مهم لنا — تواصل معنا على الخاص الآن وسنُعوّضك بالكامل ونُراجع منتجنا بناءً على ملاحظتك.', score: 100, feedback: 'رد شخصي + اعتراف + التزام علني + فعل فوري. يُحوّل المنتقد إلى شاهد على احترافيتك.', consequence: '[تهدأ الردود الغاضبة. بعض المتابعين يكتبون: «هذا هو الرد الصحيح، شركة محترمة»]' }
      ],
      expert_move: 'الرد العلني الشخصي خلال 30 دقيقة، الاعتراف بالتجربة السيئة، التحويل للخاص للحل، وإغلاق التعليق لاحقاً بتحديث «تم الحل». الشفافية هي الدرع الأفضل.',
      principle: 'مبدأ الأزمة الرقمية: كل تعليق سلبي فيروسي هو فرصة لإثبات قيمك أمام آلاف المراقبين. 73% ممن يشاهدون رداً احترافياً يُقيّمون الشركة إيجابياً.'
    },
    sm_02: {
      id: 'sm_02', category: 'social', title: 'طلب تعاون مع مؤثر', difficulty: 2,
      setup: 'تريد التواصل مع مؤثرة متخصصة في مجالك عبر إيميل مباشر. لديها 180 ألف متابع وتفاعلها عالٍ. أرسلت لها رسائل من قبل ولم تُرد.',
      dialogue_opener: 'هذا المحتوى الذي تُنتجه حقاً مميز. أنا متابعة لعملكم. أبحث عن تعاونات ذات قيمة حقيقية.',
      psychological_context: 'المؤثرة تستقبل عشرات رسائل التعاون يومياً. معظمها نمطية. ما يُميّز رسالتك هو أن تُثبت أنك تعرف محتواها فعلاً وأن لديك شيئاً يخدم جمهورها لا مجرد مصلحتك.',
      choices: [
        { text: 'مرحباً، أتمنى التعاون معك في ترويج منتجنا مقابل عمولة. تواصلينا؟', score: 5, feedback: 'رسالة نمطية تماماً — مصلحتك الوحيدة واضحة ولا تُقدّم أي قيمة لها أو جمهورها.', consequence: '[تتجاهل الرسالة]' },
        { text: 'أعجبني منشورك عن [موضوع محدد] جداً — خصوصاً نقطة [تفصيلة]. لدينا تعاون يخدم جمهورك بشكل مباشر في هذا الموضوع. ٣ دقائق على الهاتف؟', score: 100, feedback: 'تُثبت أنك قرأت محتواها بعمق + تُقدّم قيمة لجمهورها + تطلب التزاماً صغيراً. مثالي.', consequence: 'مرحباً! شكراً جداً، هذا المنشور كان من قلبي فعلاً. أنا فضولية — ما هو التعاون الذي تقترحينه؟' },
        { text: 'نحن نبحث عن مؤثرين لإطلاق منتجنا الجديد. هل أنت مهتمة؟', score: 20, feedback: 'مؤثرة لا سفيرة — الرسالة تُعاملها كمجرد أداة تسويق بدل شريك محتوى.', consequence: '[تُرد بـ «يمكن، أرسلوا التفاصيل» — ردّ دبلوماسي بلا اهتمام حقيقي]' },
        { text: 'مرحباً، أنا من شركة [س] ونحب محتواك ونريد التعاون معك.', score: 15, feedback: 'عام جداً — كل شركة تقول «نحب محتواك». لا شيء يُميّزك عن المئة رسالة الأخرى.', consequence: '[لا رد]' }
      ],
      expert_move: 'رسالة في ثلاثة أجزاء: 1) إشارة لمحتوى محدد أثّر فيك 2) اقتراح تعاون يخدم جمهورها لا فقط علامتك 3) سؤال مفتوح بدل طلب مباشر. الهدف: محادثة لا صفقة.',
      principle: 'مبدأ «الجمهور أولاً»: المؤثر يحمي جمهوره — إذا شعر أن تعاونك يُخدم جمهوره قبل أن يُخدمك، الباب يُفتح تلقائياً.'
    },
    sm_03: {
      id: 'sm_03', category: 'social', title: 'أزمة خطأ إملائي في منشور رسمي', difficulty: 2,
      setup: 'نشرت الحساب الرسمي لشركتك منشوراً مهماً فيه خطأ إملائي واضح في الكلمة الرئيسية. بدأ المتابعون يُعلّقون ويسخرون.',
      dialogue_opener: 'من اللي يراجع المحتوى هنا؟ 😂 الخطأ واضح جداً في عنوان المنشور!',
      psychological_context: 'السخرية من الأخطاء تنتشر بسرعة. الحل ليس في التعامل مع الموقف بجدية مفرطة ولا بتجاهله — بل في الذكاء العاطفي والتحوّل السريع لصالحك.',
      choices: [
        { text: 'نعتذر جداً عن الخطأ الإملائي وسيتم التصحيح فوراً.', score: 40, feedback: 'اعتذار مقبول لكنه رسمي وبارد. لن يُوقف السخرية ولا يُحوّل الموقف.', consequence: '[بعض المتابعين يتوقفون عن السخرية، والبعض يستمر]' },
        { text: 'شكراً لكم — لقد ترقّينا القسم المسؤول عن المراجعة 😄 التصحيح في طريقه!', score: 100, feedback: 'فكاهة ذاتية ذكية + اعتراف سريع + فعل = تحوّل الموقف للصالح. المتابعون يُحبون الشركات غير المتكبّرة.', consequence: '[ضحك وتفاعل إيجابي: «هذا الرد المطلوب» 😂 — التعليق يصبح منشوراً ثانياً بمفرده]' },
        { text: 'هذا خطأ مقصود لاختبار انتباهكم! 😉', score: 30, feedback: 'كذبة شفافة — المتابعون لن يُصدّقوا وستُفقد مصداقيتك مرتين.', consequence: '[«ها ها، معلوم»، السخرية تستمر مع إضافة «يكذبون حتى في الأخطاء»]' },
        { text: '[لا يُرد على التعليقات وتُحذف المنشورات]', score: 0, feedback: 'الحذف بدل الاعتراف يُشعل الأزمة ويُجعلها قضية أكبر من خطأ إملائي.', consequence: '[«حذفوا الموضوع»! لقطات الشاشة تنتشر]' }
      ],
      expert_move: 'يُحوّل الخطأ لفرصة تفاعل بالفكاهة الذاتية الذكية، يُصحّح المنشور فوراً، ويُنتج محتوى ثانياً من «كواليس» التصحيح. الشفافية الخفيفة تبني ثقة حقيقية.',
      principle: 'مبدأ الأصالة الرقمية: الشركات التي تعترف بأخطائها بفكاهة وذكاء تحصل على تفاعل أعلى من أولئك الذين يتصرفون بشكل مثالي دائماً. الكمال يُبعد؛ الأصالة تُقرّب.'
    },

    // ─────────────────────────────────────────────
    //  تفاوض وظيفي (2 scenarios)
    // ─────────────────────────────────────────────
    neg_01: {
      id: 'neg_01', category: 'negotiation', title: 'التفاوض على الراتب بعد عرض العمل', difficulty: 4,
      setup: 'تلقيت عرض عمل من شركة مرموقة براتب 12,000 ريال. أنت مقتنع بالفرصة لكنك تعرف أن السوق يدعم راتباً أعلى لخبرتك.',
      dialogue_opener: 'يسعدنا أن نُقدّم لك هذا العرض براتب 12,000 ريال. ما رأيك؟',
      psychological_context: 'مدير التوظيف يُتوقّع مساومة — 80% من عروض العمل لها هامش للتفاوض. الخطأ الشائع هو إما القبول الفوري أو رفع رقم عشوائي. المطلوب: رقم مُسوَّغ بالسوق لا بالرغبة الشخصية.',
      choices: [
        { text: 'شكراً، العرض رائع وأنا موافق!', score: 10, feedback: 'تركت ربما آلاف الريالات على الطاولة. القبول الفوري يُشير أيضاً إلى ضعف الثقة.', consequence: 'ممتاز! سنُرسل لك العقد غداً.' },
        { text: 'أنا مُقدّر جداً للعرض. بناءً على بحثي في السوق لهذا الدور ومتطلباته، وجدت أن النطاق يتراوح بين 14-16 ألف. هل هناك مرونة للوصول لـ 15,000؟', score: 100, feedback: 'تفاوض مثالي: امتنان + بيانات سوقية + رقم مُحدد + صياغة سؤال لا مطالبة. احترافي وذكي.', consequence: 'نُقدّر بحثك الجيد. أقصى ما نستطيع هو 13,500 مع مراجعة ستة أشهر. هل هذا مناسب؟' },
        { text: 'أبغى 18,000 ريال على الأقل.', score: 20, feedback: 'رقم مرتفع بدون مسوّغ يبدو عشوائياً ويُقلّل مصداقيتك كمفاوض.', consequence: 'هذا بعيد عن ميزانيتنا جداً، آسف لذلك.' },
        { text: 'الراتب جيد لكن هل يمكن إضافة مزايا أخرى؟', score: 60, feedback: 'ذكي في التحويل للمزايا لكنه يتخلى عن الراتب مبكراً. يُفضّل التفاوض على الراتب أولاً ثم المزايا.', consequence: 'ما هي المزايا التي تبحث عنها؟' }
      ],
      expert_move: 'الخبير يُفاوض بثلاثية: شكر مُخلص + رقم مُسوَّغ بالبيانات + سؤال مفتوح. إذا رُفض الرقم، ينتقل للمزايا: «هل يمكن تسريع مراجعة الراتب الأولى؟ أو إضافة بدل تطوير مهني؟»',
      principle: 'مبدأ المرساة: الرقم الأول في أي تفاوض يُصبح مرجع التقييم. التفاوض بمرساة عالية مُسوَّغة يُحرّك النتيجة النهائية لصالحك حتى لو وصلتم لوسط.'
    },
    neg_02: {
      id: 'neg_02', category: 'negotiation', title: 'طلب ترقية من مديرك المباشر', difficulty: 5,
      setup: 'أمضيت عامين في دورك الحالي وحققت نتائج استثنائية. قررت طلب ترقية لكنك لا تعرف كيف تبني المحادثة.',
      dialogue_opener: 'أهلاً، ما الموضوع الذي أردت التحدث عنه؟',
      psychological_context: 'مديرك يتعامل مع قرارات ميزانية وأولويات متعددة. الطلب المُبهم «أبغى ترقية» يضعه في موقف الاضطرار للدفاع عن القرار أمام الإدارة العليا. بدل ذلك — اجعله مُدافعاً عنك.',
      choices: [
        { text: 'أبغى أتكلم معك عن ترقيتي — أعتقد إني أستحقها.', score: 20, feedback: 'طلب مُبهم بلا دليل. يضعك في موقف التوسّل ومديرك في موقف «لماذا؟» دون إجابة جاهزة.', consequence: 'ماذا تقصد تحديداً؟ وما هو المنصب الذي تفكر فيه؟' },
        { text: 'خلال الشهرين الماضيين أنجزت [إنجاز 1] و[إنجاز 2] وهذا أضاف [قيمة قابلة للقياس] للفريق. أعتقد أن مساهمتي وصلت لمستوى [المنصب المستهدف] — كيف ترى ذلك؟', score: 100, feedback: 'نتائج ملموسة + ربط بالمنصب + سؤال مفتوح = تجعل مديرك يُفكر «كيف أُقنع الإدارة» لا «كيف أرفض».', consequence: 'صراحة النتائج التي حققتها مُثيرة للإعجاب. دعني أتحدث مع الإدارة عن الموضوع.' },
        { text: 'أريد زيادة في الراتب وترقية في اللقب.', score: 10, feedback: 'مطلبان في آنٍ واحد بلا مسوّغ — يجعل مديرك يدافع عن الميزانية لا يُدافع عنك.', consequence: 'هذان القراران يحتاجان موافقة الإدارة وهناك عمليات محددة...' },
        { text: 'أرى أن زملائي في شركات أخرى يحملون مناصب أعلى مني مع نفس الخبرة.', score: 30, feedback: 'المقارنة بالسوق وحدها دليل ضعيف — تحتاجه كداعم لا كحجة أساسية. يُشعر المدير بأنك تُهدّد بالرحيل.', consequence: 'السوق له معطيات مختلفة عن وضعنا الداخلي...' }
      ],
      expert_move: 'الخبير يُعدّ وثيقة «Portfolio القيمة» قبل الاجتماع: أرقام الإنجازات، مقارنة السوق، والمنصب المستهدف بوضوح. يطلب من مديره أن يكون «شريكاً» في تقديم الطلب لا «منح» الترقية.',
      principle: 'مبدأ الدليل يتكلم: كل ترقية هي قرار داخلي يحتاج مديرك لتبريره. اجعل عملك هو الحجة التي يُقدّمها عنك — الأرقام تُقنع حيث الكلمات لا تستطيع.'
    },

    // ─────────────────────────────────────────────
    //  كول سنتر — إضافي (3 سيناريوهات)
    // ─────────────────────────────────────────────
    cc_06: {
      id: 'cc_06', category: 'callcenter', title: 'المتصل الغاضب الذي لا يتوقف عن الكلام', difficulty: 3,
      setup: 'متصل يشكو من فاتورة خاطئة أو طرد لم يصله. دخل على الخط وهو يصرخ ولا يعطيك فرصة للكلام. احتمالاً انتظر 15 دقيقة قبل أن يصل إليك، وربما تصل للمرة الثانية أو الثالثة لنفس المشكلة.',
      dialogue_opener: 'والله زهقت من شركتكم! كل مرة نفس الكلام ونفس المشكلة! دفعت وما وصلني شي! تعبت من اتصالاتكم الفاضية!',
      psychological_context: 'ظاهرة Emotional Flooding — حين يغرق الإنسان بالمشاعر السلبية، الجزء العقلاني من الدماغ يضعف فعلياً. محاولة تقديم حلول منطقية الآن ستفشل. الأولوية: تنظيم عاطفته أولاً. غضبه متراكم وليس عليك شخصياً.',
      choices: [
        { text: 'أخوي، خليني أتكلم! محتاج بياناتك عشان أساعدك!', score: 0, feedback: 'مقاطعته تُشعل الموقف. أنت الآن عدو إضافي. سيرفع صوته أكثر لأنه يشعر أنك تُسكته.', consequence: 'لا، أنت ما تسمع! هذه المشكلة من أشهر ومحد يحلها!' },
        { text: 'أنا آسف على هذا الموقف، ممكن تعطيني رقم الطلب؟', score: 40, feedback: 'الاعتذار جيد لكنك انتقلت للإجراءات بسرعة. هو لم يفرغ بعد عاطفياً.', consequence: 'ما أبغى أرقام الحين، أبغى تحل مشكلتي!' },
        { text: 'أنا أفهم إنك زعلان، وعندك حق.', score: 55, feedback: 'الاعتراف العاطفي ممتاز، لكنه قصير جداً ثم تنتظر بسلبية. يحتاج متابعة فعلية.', consequence: 'شكراً... بس وين الحل؟' },
        { text: '(تصمت وتتركه يكمل حتى يهدأ طبيعياً) سمعتك. وأنا متفهم ليش زعلان — هذا ما المفروض يصير. أنا هسه شايل ملفك وما راح أقطع المكالمة حتى نحل هذا الموضوع كامل. ممكن تعطيني رقم طلبك؟', score: 100, feedback: 'الصمت الذكي + الاعتراف بدون دفاع + التعهد الشخصي + الانتقال السلس للإجراء. جملة «ما راح أقطع المكالمة» تُزيل خوفه الكبير من أن يُعلَّق مجدداً.', consequence: 'أهلاً... شكراً إنك سمعتني. رقم الطلب هو...' }
      ],
      expert_move: 'أربع عناصر احترافية: الصمت الذكي (اتركه يفرغ)، الاعتراف بدون دفاع (سمعتك)، التعهد الشخصي (ما راح أقطع المكالمة)، الانتقال السلس للإجراء بعد أن هدأ.',
      principle: 'مبدأ Emotional Flooding: الدماغ الغاضب لا يمتص الحلول — يمتص الإنصات أولاً. 60 ثانية من الصمت الذكي تُعيد تشغيل الـ Prefrontal Cortex وتُمهّد الطريق للحل.'
    },
    cc_07: {
      id: 'cc_07', category: 'callcenter', title: 'المتصل الذي يرفض الحل ويريد «المدير»', difficulty: 4,
      setup: 'قدّمت حلاً مناسباً وضمن الصلاحيات لمتصل غاضب، لكنه يرفضه ويطالب بمدير أو مسؤول أعلى. هذا التصرف في الغالب ليس هجوماً شخصياً — هو يعتقد أن «المدير» يملك صلاحيات أكبر.',
      dialogue_opener: 'هذا الحل ما يكفيني. أريد أكلم المدير. أنت ما تقدر تسوي شي.',
      psychological_context: 'نظرية الاستحقاق — بعض الزبائن يؤمنون أن حجم مشكلتهم يستحق اهتماماً مميزاً. تجاربه السابقة علّمته أن التصعيد يُنتج نتائج أفضل. الخطأ الفادح: الاستسلام الفوري أو الدفاعية.',
      choices: [
        { text: 'أخوي، المدير مشغول وما راح يغير شي. أنا قلتلك الحل.', score: 5, feedback: 'قلت له «المدير مو أحسن مني» بأسلوب دفاعي — هذا يُشعله ويجعله يُصر أكثر.', consequence: 'إذاً أبغى مديرك ومديره وأشكو رسمياً!' },
        { text: 'حاضر، بحولك للمشرف هسه.', score: 35, feedback: 'استسلمت فوراً. المشرف يأخذ مكالمة كان ممكن تحلها، وأنت فقدت فرصة بناء الثقة.', consequence: '(بعد الانتظار) المشرف يُقدّم نفس الحل.' },
        { text: 'أفهم إنك تريد تتأكد، بس خلني أشرح لك ليش هذا الحل هو الأنسب...', score: 50, feedback: 'حاولت الشرح لكنه يبدو دفاعياً. الزبون سيعتبره تملّصاً من طلبه.', consequence: 'ما أبغى شرح، أبغى مدير.' },
        { text: 'بكل تأكيد، حقك تطلب ذلك. بس خلني أكون صريح معك قبل ما أحولك: المشرف راح يرى نفس الملف اللي أنا شايفه، والحل اللي عندي هو أقصى ما تتيحه السياسة. لو حولتك ما راح تحصل على جواب أسرع — وأنا ما أريدك تضيع وقتك. بس لو قررت تتكلم معه، أنا بحولك هسه بدون أي مشكلة.', score: 100, feedback: 'خمس حركات: احترام طلبه، الشفافية الكاملة، الدفاع عن وقته لا عن نفسك، إزالة سلاحه، إعادة السيطرة إليه. 80% من الزبائن يقبلون الحل بعد هذا الرد.', consequence: 'أووف... حسناً. وش هو الحل اللي قلته؟' }
      ],
      expert_move: 'احترم الطلب، كن شفافاً عن حدود المشرف، دافع عن وقت الزبون لا عن موقفك. الجملة السحرية «بحولك بدون مشكلة» تُزيل السلاح وتُعيد له حرية الاختيار.',
      principle: 'مبدأ نظرية الاستحقاق: الزبون يطلب المدير لأنه يريد الشعور بأنه يُعامَل بجدية. حين تُثبت أنك تعامله بجدية أكثر من المدير — يختار البقاء معك.'
    },
    cc_08: {
      id: 'cc_08', category: 'callcenter', title: 'مكالمة البيع الصادر والرفض الفوري', difficulty: 3,
      setup: 'اتصلت بعميل لتعرض عليه ترقية أو عرضاً. ردّ عليك لكنه رفض فورياً قبل أن تُكمل جملتك الأولى. على الأرجح تلقى عشرات المكالمات التسويقية الممجوجة من قبل.',
      dialogue_opener: 'آلو؟ ... لا ما أريد شي، شكراً.',
      psychological_context: 'ظاهرة Telemarketer Reflex — الدماغ تعلّم أن يرفض فورياً كل ما يبدأ بـ«مرحبا أنا من شركة...» تماماً كإعلانات الإنترنت. الحل ليس في ضغط أكثر، بل في كسر النمط المتوقع.',
      choices: [
        { text: 'بس أخوي، خليني أكمل كلامي! عندي عرض مهم جداً!', score: 0, feedback: 'أكدت له أنك بالضبط النوع اللي كان يخشاه. قطع المكالمة مضمون الآن.', consequence: '(يُغلق الخط)' },
        { text: 'بس ثانية واحدة، العرض ما يكلفك شي وفيه فايدة.', score: 20, feedback: '«ما يكلفك شي» جملة محترقة — كل مسوّق يقولها. فقدت المصداقية.', consequence: 'ما أبغى، شكراً.' },
        { text: 'أفهمك، بس لو قلتلك إن العرض يوفر لك [X] شهرياً، يستاهل ثلاثين ثانية؟', score: 65, feedback: 'الرقم المحدد جيد، لكن الجملة طويلة لشخص على وشك يقطع. قريب لكن يحتاج تقليم.', consequence: 'وش هو؟ بسرعة.' },
        { text: 'والله تمام، ما راح أضيع وقتك. بس قبل ما تقطع — سؤال واحد بس وانتهينا: لو قدرت توفر [مثلاً: 15 ألف دينار شهرياً على فاتورتك] بدون ما تغير أي شي، كنت تسمع؟', score: 100, feedback: 'جملة «ما راح أضيع وقتك» تكسر النمط فوراً. السؤال الشرطي يحوّل الرفض إلى قرار عقلاني. إعطاؤه خيار «لا» حقيقي يرفع مصداقيتك ويجعل «نعم» أكثر احتمالاً.', consequence: 'لو فعلاً يوفر... أيوه، ثلاثين ثانية.' }
      ],
      expert_move: 'تقنية الجملة المعاكسة للتوقع: «ما راح أضيع وقتك» تكسر الـ Reflex. ثم سؤال شرطي بمبلغ محدد يحوّل الرفض لقرار. والأهم: قبول الـ«لا» بكرامة يرفع مصداقيتك أكثر من أي إلحاح.',
      principle: 'مبدأ Pattern Interrupt: الدماغ البشري مبرمج لرفض كل ما يبدو نمطياً. الجملة الأولى التي تخالف التوقع تُوقف الـ Reflex وتفتح نافذة الاستماع — ولو لثلاثين ثانية.'
    },

    // ─────────────────────────────────────────────
    //  مبيعات ميدانية — إضافي (2 سيناريوهات)
    // ─────────────────────────────────────────────
    sa_06: {
      id: 'sa_06', category: 'sales', title: 'الزبون الذي يتفرج فقط', difficulty: 2,
      setup: 'دخل رجل في الخمسينيات يتجول ببطء في المعرض بين الأجهزة، يلتقط بعضها ويضعها. لم يطلب مساعدة. حين اقتربت منه ردّ ببرود. خبراء المبيعات يسمّون هذا النوع «المتصفح الدفاعي» — سبق أن تعرض لضغط بيع مزعج.',
      dialogue_opener: 'لا، ما أريد شي. بس أتفرج.',
      psychological_context: 'بحسب نظرية التفاعل الاجتماعي لـ Goffman، الناس يحمون وجههم الاجتماعي في بيئات الشراء. جملة «بس أتفرج» هي درع وليست رفضاً. الدراسات تقول إن 72% من الزبائن الذين يقولون هذه الجملة يشترون في نفس الجلسة إذا مُنحوا مساحة صحيحة.',
      choices: [
        { text: 'حياك، لو احتجت شي قلي. (ثم تبتعد نهائياً)', score: 10, feedback: 'تخليت عنه كلياً. «حياك قلي» جملة ميتة — لا أحد يرجع ويقول «قلت قلي، هسه أريد أشتري». فقدت الفرصة بالكامل.', consequence: '(يتجول ويخرج دون شراء)' },
        { text: 'حياك أخوي، عندنا عروض اليوم لو تحب تشوف.', score: 30, feedback: 'بدأت بالبيع فوراً بعد أن قال لك «ما أريد». هذا يثبت له أنك لم تسمعه وسيزيد دفاعيته.', consequence: 'قلت لك، بس أتفرج. شكراً.' },
        { text: 'تفضل بتفرج براحتك، أنا هنا لو عندك أي سؤال. (وتبقى بالقرب)', score: 60, feedback: 'احترمت مساحته وبقيت قريباً، لكنك انتظرت بسلبية. التوقيت والسؤال الذكي هما الفرق.', consequence: '(يتجول ببطء، أحياناً يلمس أجهزة بعينها)' },
        { text: 'طبعاً، تفضل بتفرج براحتك. (بعد دقيقتين وهو يلمس جهازاً محدداً:) هذا الموديل جاب انتباهك لأن شكله؟ ولا لأنك تدور على حجم معين؟', score: 100, feedback: 'تقنية «الربط بالسلوك» — انتظرت حتى أعطاك إشارة (لمس جهاز بعينه) ثم طرحت سؤالاً مفتوحاً يبدأ بـ«لأن» — يجعله يشرح حاجته بنفسه دون أن يشعر أنك تبيعه.', consequence: 'أكتر بسبب الحجم، عندي مطبخ صغير وأدور على شي ما يأخذ مساحة.' }
      ],
      expert_move: 'منح المساحة أولاً هو ذكاء لا ضعف. ثم مراقبة السلوك الجسدي (ماذا يلمس؟ أين يتوقف؟) لاستخراج إشارة الدخول الصحيحة. السؤال المرتبط بالسلوك الملاحظ هو المفتاح.',
      principle: 'مبدأ Social Face Protection: الناس يدخلون المعارض بدرع دفاعية. الطريقة الوحيدة لإزالتها هي إثبات أنك لست تهديداً — وذلك بإعطاء المساحة ثم الدخول عبر فضولهم الحقيقي.'
    },
    sa_07: {
      id: 'sa_07', category: 'sales', title: 'الزبون الذي يقارن بالمنافس دائماً', difficulty: 3,
      setup: 'زبون يسمع عرضك في معرض أثاث ثم يقول «عند X أرخص». يكرر هذا في كل منتج تعرضه. المدربون يسمّونه «صياد الاعتراف» — هو لا يريد تخفيض السعر بالضرورة، يريد أن تعترف بأنه ذكي ويعرف السوق.',
      dialogue_opener: 'شايف هذا الطقم؟ عند المعرض الثاني بنفس السعر بس مع طاولة زيادة. ليش أشتري منكم؟',
      psychological_context: 'نظرية الإنصاف لـ Adams: الناس لا يشترون بناءً على القيمة المطلقة بل على الشعور بالعدالة في الصفقة. الزبون يريد أن يشعر أنه أخذ «الصفقة الأفضل» لا «السعر الأرخص». كذلك يستخدم تكتيك False Comparison — المقارنة قد تكون غير دقيقة.',
      choices: [
        { text: 'إذا عندهم أحسن روح اشتري منهم.', score: 0, feedback: 'انتحار تجاري. حتى لو كنت محقاً بالموقف، خسرت العميل وأعطيته سبباً يُقنع نفسه بالمغادرة.', consequence: '(يغادر مباشرة)' },
        { text: 'عندنا جودة أفضل وضمان أطول.', score: 25, feedback: 'ادعاء مجرد. «جودة أفضل» بدون دليل ملموس = كلام فاضي في عقل الزبون.', consequence: 'كل الكل يقول كلامك هذا.' },
        { text: 'الطاولة الي يعطونها، هل شفتها فعلاً ولا قالوا «هدية مع الطقم»؟', score: 65, feedback: 'سؤال استكشافي ذكي يكشف ثغرة في عرض المنافس. لكنه يبدو كهجوم غير مباشر ويحتاج إكمالاً.', consequence: 'الحقيقة ما شفتها بعيني...' },
        { text: 'سؤال ذكي، وأنا ما راح أقلك روح هناك ولا أقلك إحنا أفضل بدون سبب. خلني أسألك: الطاولة الي عطوك إياها — شفتها فعلاً ولا قالوا «هدية مع الطقم»؟ لأن الفرق الحقيقي بيننا هو [ضمان سنتين + خدمة ما بعد البيع + قماش الجلد درجة A]. بس أنت اللي تقرر وش يهمك أكثر.', score: 100, feedback: 'ثلاث حركات: تكريم ذكائه (سؤال ذكي)، تساؤل استراتيجي يزرع شكاً مشروعاً في عرض المنافس، تحويل القرار إليه (أنت اللي تقرر). الجملة الأخيرة تُزيل ضغط البيع وتجعله يقنع نفسه.', consequence: 'أووه، الطاولة فعلاً ما شفتها. يعني إيش الفرق بالضمان عندكم؟' }
      ],
      expert_move: 'تكريم ذكاء الزبون ثم زرع سؤال استراتيجي يُربك تأكيداته عن المنافس. تحويل القرار إليه بعد تقديم الفروق الحقيقية — هذا يجعله يقنع نفسه بدلاً من أن تقنعه أنت.',
      principle: 'مبدأ False Comparison: الزبون نادراً ما يقارن بدقة. سؤال «هل رأيت ذلك فعلاً؟» يُعيد المقارنة إلى أرض واقعية ويكشف أن «العرض الأفضل» كثيراً ما يكون وهماً.'
    },

    // ─────────────────────────────────────────────
    //  أكونت منجر B2B (3 سيناريوهات جديدة)
    // ─────────────────────────────────────────────
    acct_01: {
      id: 'acct_01', category: 'account', title: 'العميل يهدد بالتحول للمنافس عند التجديد', difficulty: 4,
      setup: 'اجتماع تجديد عقد سنوي مع شركة عميلة. العميل (مدير مشتريات) يُلمّح بقوة أن المنافس قدّم له عرضاً أفضل بـ 20% ويفكر جدياً في التحول. في 60% من الحالات هذا تكتيك تفاوضي لا نية حقيقية بالرحيل.',
      dialogue_opener: 'صراحة، شركة X عرضت علينا نفس الخدمة بسعر أقل بـ 20%. أنا محتاج تقنعني ليش أجدد معكم.',
      psychological_context: 'نظرية تكاليف التحويل (Switching Cost Theory) — العميل يعلم في الباطن أن التغيير يعني وقت تدريب جديد، مخاطر مجهول، تعطل مؤقت. لكنه يحتاج مبرراً عقلانياً ليبقى مع إحساس بأنه «كسب». مهمتك: جعله يقارن الصورة الكاملة لا السعر فقط.',
      choices: [
        { text: 'بالتأكيد سنطابق السعر، لا مشكلة. (فوراً وبدون نقاش)', score: 5, feedback: 'خفضت السعر فوراً = أثبتت له أن سعرك الأصلي كان مبالغاً به، وعلّمته أن هذا التكتيك ينجح — سيستخدمه كل سنة.', consequence: 'ممتاز، إذاً وافق على 18% خصم وليس 20%.' },
        { text: 'قيمتنا تتجاوز السعر — عندنا دعم أفضل وموثوقية أعلى.', score: 30, feedback: 'كلام عام بدون أرقام. «دعم أفضل» لا يقنع مدير مشتريات يحاسب على الأرقام.', consequence: 'كلنا نقول هذا. الأرقام تثبت العكس.' },
        { text: 'قبل ما نتكلم عن الأرقام، ممكن أعرف وش بالضبط اللي قدموه؟ عشان نقارن صح.', score: 60, feedback: 'ذكي — تكشف طبيعة العرض المنافس. لكنه دفاعي بعض الشيء ولا يُبرز قيمتك المتراكمة.', consequence: 'قدموا نفس المستوى تقريباً بسعر أقل.' },
        { text: 'أقدر أتفاهمك، وأنا ما راح أطلب منك تبقى لأننا «أفضل» بدون دليل. خلني أسألك: خلال السنة الماضية، كم مرة اضطريت تتصل بنا لمشكلة إضافية؟ وكم كان متوسط وقت الحل؟ — هذي الأرقام لها قيمة حقيقية على شغلك. العرض الثاني قد يوفر X بالسعر، لكن لو أدى لتعطل يوم واحد إضافي بالسنة — كم يكلفك ذلك فعلياً؟ أنا عندي هذه الأرقام جاهزة.', score: 100, feedback: 'تقنية ROI العاطفية — حوّلت النقاش من سعر العقد إلى تكلفة التغيير الكاملة. الأرقام التي أخرجتها من العميل نفسه أقوى من أي رقم تقوله أنت. جملة «أنا عندي هذه الأرقام جاهزة» تُظهر استعداداً احترافياً يرفع قيمتك.', consequence: 'صراحة؟ ما اضطررنا نتصل إلا مرتين في السنة. وكل مرة حُل في يوم.' }
      ],
      expert_move: 'حوّل النقاش من «السعر» إلى «تكلفة التحويل الكاملة». استخرج من العميل أرقام رضاه التاريخية — هي أقوى حجة لك. ثم اربط كل ريال فرق بتكلفة عملية ملموسة.',
      principle: 'مبدأ Switching Cost: العملاء يُقدّرون بشكل مزمن تكاليف التغيير. حين تُبرز هذه التكاليف بأرقام حقيقية، الفارق السعري يُصبح ضئيلاً مقارنة بمخاطر المجهول.'
    },
    acct_02: {
      id: 'acct_02', category: 'account', title: 'عميل راضٍ لكن لا يُحيل أحداً', difficulty: 3,
      setup: 'في نهاية اجتماع إيجابي مع عميل B2B راضٍ تماماً يُجدّد كل سنة. قال للتو: «والله راضين عنكم، شغلكم تمام». أنت تعرف أنه يعرف شركات كثيرة قد تستفيد من خدماتك لكنه لم يحل إليك أحداً.',
      dialogue_opener: 'والله راضين عنكم، شغلكم تمام.',
      psychological_context: 'نظرية المعاملة بالمثل لـ Cialdini: الناس يريدون المساعدة حين يشعرون بالامتنان، لكنهم يتجمدون حين يشعرون أنهم مُلزَمون. الطلب المباشر («هل تعرف أحد؟») يضعه في موقف الالتزام الاجتماعي المزعج. الحل: جعله يُحيل بقرار حر لا بطلب مباشر.',
      choices: [
        { text: 'ممتاز! هل تعرف شركات ثانية تحتاج خدماتنا؟', score: 5, feedback: 'طلب مباشر وفج في أسوأ لحظة. أنت الآن «تستغل» علاقة جيدة.', consequence: 'أممم... ما أعرف الحين... ربما لاحقاً.' },
        { text: 'يسعدنا إننا نقدر نساعد شركاء أعمالكم بنفس المستوى.', score: 30, feedback: 'عام ومبهم. لم تعطه فكرة واضحة عن «من» تريده أن يُحيل.', consequence: 'أيوه، بالتأكيد. إذا صادفت أحداً.' },
        { text: 'لو صادف وحكيت مع أحد يحتاج خدمات مثل خدماتنا، يسعدنا لو تذكرتنا.', score: 55, feedback: 'خفيف ومريح، لكنه مبهم جداً. «أحد» كلمة فضفاضة لا تُفعّل ذاكرته.', consequence: 'بالتأكيد، أذكّر لو صادف.' },
        { text: 'سعيد إنكم راضين. بصراحة، أفضل عملاء عندنا جاؤوا عن طريق توصيات من عملاء مثلكم — مو من إعلانات. مو طالب منك شي، بس لو يوم من الأيام حكيت مع شخص يعاني من [المشكلة التي نحلها]، ومناسب تذكرنا — يكفينا.', score: 100, feedback: 'أربع عناصر: التحقق الاجتماعي (أفضل عملاء جاؤوا بتوصيات)، رفع الضغط (مو طالب منك شي)، التحديد الذكي (شخص يعاني من المشكلة)، الشرط الاختياري (لو مناسب). يُحيل طوعاً لأنه يشعر أنه يساعد لا يُلبّي طلباً.', consequence: 'أكيد، أعرف مدير في شركة تانية يشتكي بالضبط من هذه المشكلة.' }
      ],
      expert_move: 'التحقق الاجتماعي + رفع الالتزام + تحديد نوع الشخص المطلوب = ثلاثية تجعل الإحالة قراراً طبيعياً. «مو طالب منك شي» هي الجملة الأهم — تُزيل الضغط الاجتماعي وتُطلق الطوعية.',
      principle: 'مبدأ المعاملة بالمثل: الرضا يولّد رغبة في المساعدة، لكن الطلب المباشر يُحوّلها إلى التزام. قلّل الالتزام إلى صفر وستُطلق الرغبة كاملة.'
    },
    acct_03: {
      id: 'acct_03', category: 'account', title: 'عميل يطلب خصماً بحجة العلاقة الشخصية', difficulty: 4,
      setup: 'عميل B2B قديم، علاقتكم ممتازة، يعاملك كصديق. في اجتماع تجديد يطلب خصماً 25% خارج السياسة بحجة أنكم «مو بس علاقة تجارية». هذا شائع جداً في السوق العربي حيث الحدود بين الشخصي والتجاري ضبابية.',
      dialogue_opener: 'أنت تعرف إننا من أول الناس اشترت منكم، وعلاقتنا مو بس تجارية. هالمرة أتوقع منك خصم 25% — أنا ما بطلب من غيرك هالشي.',
      psychological_context: 'فخ الصداقة التجارية — العميل لا يطلب خصماً فقط، يطلب تأكيداً على أن العلاقة حقيقية. الرفض يجب أن يُقدَّم بطريقة تُكرّم العلاقة لا تنفيها. الرفض الجاف يُشعره بأن كل العلاقة كانت تجارية ومصلحية.',
      choices: [
        { text: '25% مو ممكن، هذا خارج الصلاحيات.', score: 5, feedback: '«خارج الصلاحيات» جملة بيروقراطية باردة تقتل العلاقة. أنت الآن «موظف» لا «شريك».', consequence: 'معناها العلاقة ما تستاهل شي...' },
        { text: 'أقدر أعطيك 10%، هذا أقصى ما أقدر عليه.', score: 30, feedback: 'أعطيته خصماً بدون مبرر وبدون قيمة مقابلة — علّمته أن الضغط يعمل وكأن السعر الأصلي كان مبالغاً به.', consequence: 'أيووه، أقل من المطلوب بس أقبل.' },
        { text: 'علاقتنا تهمني، وبسببها راح أحاول أشوف وش أقدر أسوي.', score: 45, feedback: 'دافئ لكن غامض. «أحاول أشوف» بدون اتجاه واضح يُضعف ثقته.', consequence: 'يعني وش؟ قل لي رقم.' },
        { text: 'وأنا أقدّر هذا الكلام، وعلاقتنا حقيقية — وبالضبط لأنها حقيقية أريد أكون صريح معك: 25% راح تضرني بشكل غير منطقي وما أقدر أضمن استمرارية الخدمة بنفس المستوى. بس لأنك أنت — خلني أشوف معادلة ذكية لكم: لو زدتم الكمية بـ[X] أو ربطنا العقد بسنتين، أقدر أوصل لـ 15% ويبقى الشغل بنفس الجودة. وأنا ما راح أعرض هذا على غيركم.', score: 100, feedback: 'ست حركات: تكريم العلاقة، الصدق كدليل على الاحترام، التفسير المنطقي للرفض (يضرني = يضر جودتك)، الحل البديل الذكي، الشرط المنطقي، الامتياز الحقيقي (ما راح أعرضه على غيركم). يشعر أنه حصل على شيء خاص.', consequence: 'هذا منطقي. إذا ضمنا سنتين تقدر تعطيني الـ15%؟' }
      ],
      expert_move: 'الصدق هو أعلى تكريم للعلاقة. اشرح كيف الخصم يضر جودة الخدمة ثم قدّم بديلاً يُحقق له قيمة حقيقية بشروط تنفعك. الامتياز الحصري («ما راح أعرضه على غيركم») يُكرّم العلاقة ويُغلق الفجوة.',
      principle: 'مبدأ الصداقة التجارية في الثقافة العربية: الرفض المُكرَّم بالصدق يُعمّق الثقة أكثر من القبول الضعيف. من يقول «لا» بحب واحترام يُثبت أنه شريك حقيقي لا مجرد بائع يريد إرضاءك.'
    },

    // ─────────────────────────────────────────────
    //  مركز الصيانة والمبيعات (5 سيناريوهات)
    // ─────────────────────────────────────────────
    repair_01: {
      id: 'repair_01', category: 'repair', title: 'الزبون الغاضب المتكرر — استبدال الشاشة', difficulty: 3,
      setup: 'الساعة 11 صباحاً، يوم الأحد، المركز مكتظ. زبون أصلح هاتفه عندك قبل 4 أيام (استبدال شاشة) وعاد اليوم وهو يحمل الجهاز بيده ووجهه أحمر. أمام زبائن آخرين ما يزيد ضغط الموقف.',
      dialogue_opener: 'يابا صلحت الجهاز يمكم واليوم رجع يعلق! شو هذا الشغل؟ دفعت فلوس مو بالهوا!',
      psychological_context: 'الزبون يعاني من «خيانة الثقة المُسبقة» — هو لم يكن يتوقع أن يعود للمشكلة. بحسب نظرية التنافر المعرفي لـ Festinger، الزبون الذي دفع مالاً يُحوّل خيبة أمله إلى غضب خارجي. الكلمة المفتاح: «أمام الناس» — الموقف العام يضاعف حدة ردة فعله لأن كرامته على المحك.',
      choices: [
        { text: 'أخوي، الشاشة تمام، يمكن أنت سويت شي بالجهاز!', score: 0, feedback: 'اتهمت الزبون بالتقصير أمام الناس. هذا يُشعله أكثر ويدمر سمعة المركز فوراً. القاعدة الذهبية: لا تُلقِ المسؤولية على الزبون في اللحظة الأولى أبداً.', consequence: 'شو؟! أنا سويت شي؟! هسه يجي المدير وأشوفكم!' },
        { text: 'آسف على هذا، خلينا نشوف وش صاير.', score: 45, feedback: 'الاعتذار جيد، لكنه فضفاض وغير محدد. لم تُقدم أي خطوة ملموسة. الزبون الغاضب يحتاج فعلاً لا كلاماً.', consequence: 'كلكم تقولون «نشوف»! شو يعني نشوف؟' },
        { text: 'تفضل اجلس، بنفحص الجهاز هسه ونشوف المشكلة وين.', score: 65, feedback: 'عملي ومباشر، لكنه يفتقر للاعتراف العاطفي. الزبون يريد أن يُسمع أولاً، ثم يُحل مشكلته.', consequence: 'حسناً... (يجلس بتردد) بس بسرعة.' },
        { text: 'والله عذراً، هذا مو المفروض يصير. خلني آخذ الجهاز هسه وأشوفه قدامك، وإذا الخلل من شغلتنا، بنصلحه مجاناً فوراً وبنعطيك ضمان إضافي.', score: 100, feedback: 'ثلاثة عناصر: الاعتراف العاطفي (عذراً + هذا مو المفروض)، الفعل الفوري (أشوف قدامك)، الضمان المستقبلي (ضمان إضافي). هذا يحوّل الزبون الغاضب إلى مدافع عن المركز.', consequence: 'أووه... شكراً. أنا بس ما أبغى يتكرر هالموقف.' }
      ],
      expert_move: 'جمع ثلاثة عناصر في جملة واحدة: الاعتراف العاطفي + الفعل الفوري أمامه + الضمان المستقبلي. العمل قدام الزبون هو أقوى دليل على الثقة وليس الكلام.',
      principle: 'مبدأ التنافر المعرفي: الزبون الذي دفع مالاً يتألم أكثر لأن قراره «الصواب» أصبح موضع شك. الاعتراف الفوري + الفعل يُعيد له شعور الصواب ويُحوّل الطاقة السلبية لولاء.'
    },
    repair_02: {
      id: 'repair_02', category: 'repair', title: 'زبونة تخاف على بياناتها', difficulty: 2,
      setup: 'عصر الثلاثاء، المركز هادئ. زبونة في الأربعينيات تريد إصلاح مفتاح الطاقة في هاتفها (iPhone). سبق أن سمعت قصصاً عن سرقة الصور من مراكز الصيانة. هي لا تثق بك بعد، وأي إجابة دفاعية أو ساخرة ستجعلها تغادر.',
      dialogue_opener: 'أريد أصلح الجهاز، بس... صراحة خايفة على صوري وبيانات أهلي. الناس قالت صور الناس تنسرق من المراكز!',
      psychological_context: 'خوف اجتماعي مُكتسب — الزبونة لم تمر بتجربة سيئة بنفسها لكن الذاكرة الجمعية رسّخت خوفاً حقيقياً. بحسب نظرية Social Proof لـ Cialdini، الناس يبنون قراراتهم على تجارب غيرهم. أي رد يبدو دفاعياً أو يُشكك في قلقها سيُفسَّر كاعتراف ضمني.',
      choices: [
        { text: 'لا والله أختي، هذا كلام فاضي! إحنا مركز محترم!', score: 0, feedback: 'وصفت قلقها بـ«كلام فاضي» — هذا يُهين ذكاءها ويقطع كل جسور التواصل. الدفاعية = اعتراف في عقل الزبون.', consequence: '(تُغادر فوراً)' },
        { text: 'لا تخافين، بياناتك بأمان عندنا.', score: 30, feedback: 'طمأنة دون دليل. «بياناتك بأمان» جملة فارغة المحتوى — لماذا يجب أن تصدقك؟', consequence: 'يعني... مو مقتنعة بس شكراً.' },
        { text: 'تقدرين تعملين نسخة احتياطية قبل ما تجيبين الجهاز.', score: 55, feedback: 'نصيحة عملية ومفيدة، لكنها لم تُعالج الخوف العاطفي ولم تُقدم الشفافية الكافية عن طبيعة الإصلاح.', consequence: 'أيوه... هذا منطقي. بس بعدها ايش؟' },
        { text: 'والله سؤالك صح وما فيه شي غلط إنك تسألين. خلي أشرح لك: المشكلة إللي عندك في مفتاح الطاقة ما تحتاج ندخل على بياناتك أبداً. بس لو حابة تطمنين، قدامك هسه تقفلين التطبيقات الحساسة، وأنا أشتغل والجهاز أمامك طول الوقت.', score: 100, feedback: 'أربع حركات: تشريع القلق (سؤالك صح)، المعلومة التقنية المُطمئنة (ما نحتاج ندخل على البيانات)، التمكين (أنتِ من تتحكم)، الشفافية (الجهاز أمامك). هذا ما يبني الثقة الدائمة.', consequence: 'شكراً كتير! هذا اللي كنت محتاجة أسمعه. تفضل الجهاز.' }
      ],
      expert_move: 'شرعّن القلق أولاً ثم قدّم المعلومة التقنية التي تُثبت أن طبيعة الإصلاح لا تمسّ البيانات. إعطاء الزبونة السيطرة (الجهاز أمامها + قفل التطبيقات) يُحوّل القلق إلى ثقة.',
      principle: 'مبدأ Social Proof العكسي: الخوف المبني على قصص الآخرين لا يُعالَج بالإنكار بل بالشفافية التقنية والتمكين الفعلي. الزبون الذي يشعر بالسيطرة يثق أكثر بكثير.'
    },
    repair_03: {
      id: 'repair_03', category: 'repair', title: 'الزبون «الخبير» المزيّف — مشكلة بطارية', difficulty: 3,
      setup: 'ظهر السبت، وقت الذروة. شاب يريد إصلاح Samsung يعاني من مشكلة في البطارية. لكنه يدّعي أنه يعرف كل شيء ويريد أن يُملي عليك الحل بعد بحث على يوتيوب.',
      dialogue_opener: 'شوف أخوي، أنا عارف المشكلة. هذا موديل S23، مشكلته بقطعة BMS، هاي الي تراقب البطارية. لازم تبدل هاي القطعة بس وخلاص. ما أريد تبدل البطارية كلها!',
      psychological_context: 'Defensive Expert Syndrome — الشخص اكتسب معلومة جزئية ويبني عليها هوية دفاعية. بحسب تأثير Dunning-Kruger، هو يقع في قمة «جبل الغباء» حيث المعرفة القليلة تُنتج ثقة عالية. إذا صادمته مباشرة سيتصلب أكثر — وإذا وافقته كذبت عليه وأضررت بالجهاز.',
      choices: [
        { text: 'لا أخوي، هذا الكلام غلط. BMS ما تسوّى بهالطريقة.', score: 5, feedback: 'كسرت كرامته مباشرة. هو الآن سيُثبت خطأك بأي ثمن — حتى لو اضطر يروح لمركز آخر يوافقه ويضر جهازه.', consequence: 'أنا متأكد من كلامي، تصبحون على خير.' },
        { text: 'حسناً، خلني أفحص الجهاز أول وبعدين نشوف.', score: 40, feedback: 'تفاديت المواجهة لكنك تجاهلت معلومته كلياً. هو يريد أن يُعترف بمعرفته.', consequence: 'أيوه، بس أنا قلت لك المشكلة. لماذا الفحص؟' },
        { text: 'معك حق إن BMS مهمة، بس لازم نتأكد بالفحص وين الخلل بالضبط.', score: 65, feedback: 'توازن معقول بين التكريم والتصحيح، لكنه عام وغير مقنع بما يكفي تقنياً.', consequence: 'حسناً... خلك تفحص. بس أنا واثق.' },
        { text: 'والله عندك معلومة صح — BMS فعلاً جزء مهم. بس خلني أكون صريح معك: في هذا الموديل تحديداً، BMS مدمجة مع خلايا البطارية وما تنفك بشكل منفصل بدون مخاطرة على الجهاز. أنا بفحصها بالجهاز هسه قدامك، ولو ثبت إن في طريقة تحفظ فلوسك، بنسلك عليها.', score: 100, feedback: 'تقنية «نعم، و...» بدل «لا، لأن...» — أكدت معلومته الجزئية ثم أضفت السياق التقني الحقيقي بأسلوب تعليمي لا تنازلي. الجملة الأخيرة (ولو ثبت نسلك عليها) تُثبت أنك في صفه لا ضده.', consequence: 'أووه، ما كنت عارف إنها مدمجة. يعني حق أفحص أول.' }
      ],
      expert_move: 'تكريم المعلومة الجزئية ثم إضافة السياق الكامل بأسلوب «نعم، و...» يحفظ كرامة الزبون ويُصحح مساره. الشفافية التقنية + إثبات أنك في صفه = الاستسلام الطوعي.',
      principle: 'مبدأ Dunning-Kruger: الهوية المبنية على معرفة ناقصة هشّة لكن حساسة. الهجوم يُصلّبها، والتكريم + الإضافة يُليّنها. «نعم، و...» أقوى من «لا، لأن...» في كل حوار.'
    },
    repair_04: {
      id: 'repair_04', category: 'repair', title: 'التفاوض العدواني على سعر الشاشة', difficulty: 4,
      setup: 'مساء الخميس. زبون يريد استبدال شاشة iPhone 14 Pro. أعطيته السعر: 85,000 دينار. بدأ يضغط بأسلوب عدواني هادئ — يقارن بمراكز أخرى ويهدد بالمغادرة. في الغالب هو لم يذهب للمراكز الأخرى فعلاً أو ذهب ووجد مشاكل في الجودة.',
      dialogue_opener: 'أخوي، عطوني نفس الشاشة بمكان ثاني بـ 60 ألف. شو الفرق؟ ليش عندكم غالي؟ لو ما تنزلون بخمسة عشر ألف بروح لهم.',
      psychological_context: 'يعتمد الزبون على مبدأ BATNA (Best Alternative to a Negotiated Agreement) — يُشعرك أن له بديلاً أقوى. لكن من يُهدد بالمغادرة ولا يغادر فعلاً يعني أنه مهتم وما اقتنع بالبديل. مهمتك: لا تخفض السعر مجاناً — اجعل الفرق واضحاً وملموساً.',
      choices: [
        { text: 'روح هناك إذن، هذا السعر وما ينزل.', score: 0, feedback: 'رددت بالعدوانية بعدوانية. حتى لو كنت محقاً، خسرت الزبون وأعطيته سبباً يُقنع نفسه بالمغادرة.', consequence: '(يغادر فعلاً)' },
        { text: 'خلي أشوف شو أقدر أسوي لك. (ثم تخفض مباشرة)', score: 20, feedback: 'خفضت السعر دون مبرر = أثبتت له أن السعر الأصلي كان وهمياً. التنازل المجاني يُفقدك المصداقية.', consequence: 'شكراً، بس أبغى خمسة عشر لا عشرة.' },
        { text: 'الفرق بالجودة أخوي، شاشتنا OLED أصلية وعليها ضمان شهرين.', score: 55, feedback: 'الحجة صحيحة لكنها عامة. «الجودة أفضل» جملة يسمعها من كل مركز.', consequence: 'وهم يقولون نفس الكلام.' },
        { text: 'أنا أفهم ليش تسأل، والسعر الثاني يبدو مغري. بس خلني أسألك سؤال واحد: الشاشة الي بـ 60 ألف، ما قالوا لك وش نوعها؟ — لأن إذا كانت Copy A أو aftermarket، بعد شهرين بتلاقي ألوانها تتغير وحساسيتها تضعف. شاشتنا OLED أصلية مع ضمان ثلاثة أشهر. الفرق الـ 25 ألف هو فرق ما ترجعلنا بعد شهرين.', score: 100, feedback: 'ثلاث حركات احترافية: سؤال استكشافي يُربك تأكيداته (ما قالوا لك نوعها؟)، تعليم لا دفاع (شرحت الفرق التقني)، إعادة تأطير القيمة (الـ25 ألف هي تكلفة الرجوع لاحقاً). لم تنزل بالسعر لكنك جعلت السعر يبدو منطقياً.', consequence: 'صراحة؟ ما سألتهم عن النوع. وش يعني Copy A؟' }
      ],
      expert_move: 'السؤال الاستكشافي «ما قالوا لك نوعها؟» يُعيد الزبون من موقف المقارنة إلى موقف المعلومات الناقصة. إعادة تأطير الفرق السعري كـ«تكلفة العودة» تُحوّل الـ 25 ألف من خسارة إلى استثمار.',
      principle: 'مبدأ BATNA: الزبون الذي يُهدد بالمغادرة ولا يغادر لا يزال مهتماً. مهمتك ليست تخفيض سعرك بل تفكيك «البديل» بسؤال واحد ذكي يكشف أن الـ BATNA ليست بالجودة التي يظنها.'
    },
    repair_05: {
      id: 'repair_05', category: 'repair', title: 'زبون يريد «أفضل» هاتف بميزانية محدودة', difficulty: 2,
      setup: 'ظهر الجمعة، الدكان مزدحم. شاب يريد شراء هاتف جديد. ميزانيته 300 ألف دينار لكنه يريد «أفضل كاميرا وأفضل بطارية وأفضل معالج» — كأنه يريد iPhone Pro بسعر Redmi. هذا احتمالاً أول مرة يشتري فيها بمبلغ كبير نسبياً.',
      dialogue_opener: 'أريد هاتف بـ 300 ألف، بس يكون كاميرته زين وبطاريته طول وسريع. شو تنصحني؟ ولا تجيبلي شي ما يسوى!',
      psychological_context: 'Analysis Paralysis محفوز بالخوف من الندم (Regret Aversion) — موثق في نظرية Prospect Theory لـ Kahneman وTversky. الجملة الأخيرة «ولا تجيبلي شي ما يسوى» هي صرخة استغاثة لا تهديد — هو يريد شخصاً يثق بحكمه ليريحه من عبء القرار. من يقدم له قائمة طويلة سيُصيبه بشلل أكبر.',
      choices: [
        { text: 'بـ 300 ألف ما تلقى كاميرا وبطارية ومعالج كلهم زين، هذا مستحيل.', score: 0, feedback: 'أول جملة قتلت أي إمكانية للبيع. أثبتت له أن توقعاته «غلط» وكسرت ثقته بنفسك وبك.', consequence: '(يرد بضيق) يعني ما عندكم شي يناسبني؟' },
        { text: 'عندي Samsung A55 وRedmi Note 13 Pro وRealme 12. شوف أيهم يعجبك.', score: 30, feedback: 'ثلاثة خيارات دفعة واحدة = ضغط إضافي على زبون أصلاً مشلول بالقرارات. هو يريد توصية لا قائمة.', consequence: '(يحدّق في الأجهزة بارتباك) ما أعرف... وش الفرق؟' },
        { text: 'شو أكثر شي تستخدم فيه الهاتف؟ — صور، ألعاب، ولا شغل؟', score: 70, feedback: 'السؤال الاستكشافي ممتاز — لكن بدون التوصية الحاسمة بعده ستضيع في نقاش طويل.', consequence: 'أكثر شي صور وتصفح.' },
        { text: 'سؤال واحد بس: أكثر شي تستخدمه الهاتف وياه صور ولا ألعاب؟ (بعد جوابه: صور) — طيب، هسه الخيار الأذكى لك بالـ 300 ألف هو Redmi Note 13 Pro Plus — كاميرته 200 ميغابيكسل وبطاريته تكفي يومين. ما راح تندم. هذا الي كنت أشتريه لو أنا بمكانك.', score: 100, feedback: 'أربع حركات: سؤال واحد (لا تُعقّد)، توصية واحدة (لا قائمة)، مبرر رقمي (200 ميغا + يومين)، الجملة السحرية «هذا الي كنت أشتريه لو أنا بمكانك» — تنقل ثقلاً اجتماعياً هائلاً وتُريح الزبون من عبء القرار.', consequence: 'صح؟ وأنت تضمنه؟ إذاً خلنا نشوفه.' }
      ],
      expert_move: 'سؤال واحد يُضيّق الخيار، توصية واحدة تُريح من الشلل، مبرر رقمي يُعطي الأمان العقلاني، وجملة «لو أنا بمكانك» تنقل المسؤولية العاطفية وتُطلق قرار الشراء.',
      principle: 'مبدأ Regret Aversion: الزبون المتردد لا يخشى الشراء — يخشى الندم. حين تقول «لو أنا بمكانك» فأنت تتحمل جزءاً من المسؤولية العاطفية وتُطلقه من الشلل فوراً.'
    },

    // ─────────────────────────────────────────────
    //  كول سنتر — متقدم (2)
    // ─────────────────────────────────────────────
    cc_09: {
      id: 'cc_09', category: 'callcenter', title: 'الزبون يهدد بتقييم سلبي على جوجل', difficulty: 5,
      setup: 'زبون طلب استرداد كاملاً لخدمة استُخدمت جزئياً — وهذا خارج سياسة الاسترداد. حين أبلغته بالسياسة أطلق تهديداً صريحاً: «راح أكتب تقييم خمس نجوم معكوسة على جوجل لو ما ردوا فلوسي».',
      dialogue_opener: 'إذا ما ردوا فلوسي كاملة، راح أكتب تقييم يخرب سمعتكم على جوجل، وكل مواقع التقييم. أنا عارف كيف أأثر على الناس.',
      psychological_context: 'نظرية الابتزاز العاطفي (Emotional Blackmail) لـ Susan Forward: التهديد يستهدف خوفك من الضرر لا منطقك. الاستسلام يُرسّخ السلوك ويُشجع على تكراره مع موظفين آخرين. لكن المواجهة الحادة تُؤجج. المطلوب: الهدوء الكامل + إعادة التأطير نحو الحل الممكن.',
      choices: [
        { text: 'حسناً، عشان ما يصير مشكلة، راح نرجع لك المبلغ.', score: 0, feedback: 'الاستسلام للتهديد يُعلّمه أن هذا الأسلوب يعمل — وسيستخدمه مرة أخرى ويُخبر الآخرين. أنت الآن تُدار بالخوف لا بالسياسة.', consequence: '(يحصل على استرداد كامل ثم يكرر التكتيك في كل مرة)' },
        { text: 'التقييم حقك، بس سياستنا واضحة ولن نغيّرها بسبب تهديد.', score: 35, feedback: 'صادق لكنه دفاعي ومُشعل. «لن نغيّر بسبب تهديد» يبدو كتحدٍّ شخصي يدفعه ليُثبت نفسه.', consequence: 'كويس، هسه أكتب أسوأ تقييم في تاريخ جوجل.' },
        { text: 'أفهم إنك محبط، بس سياسة الاسترداد تنطبق على الجميع ولا نقدر نستثني.', score: 55, feedback: 'منطقي ومتوازن لكنه بارد. لم يُقدّم بديلاً ملموساً يُشعر الزبون بأنه «ربح» شيئاً.', consequence: 'ما أبغى سياسة، أبغى حقي.' },
        { text: 'أنا أفهم إنك غير راضٍ وهذا مهم لنا. التقييم حقك المشروع وأنا ما راح أمنعك منه — هذا يُساعدنا نتحسّن. اللي أقدر أقدمه الآن ضمن سياستنا هو [استرداد جزئي + رصيد خدمة]. لو قررت تكتب، أرجو تذكر هذه المحاولة. وأنا شخصياً سأرفع ملاحظتك للإدارة.', score: 100, feedback: 'أربع حركات: تشريع التقييم (حقه + يُحسّننا) يُزيل سلاحه، عرض ملموس ضمن السياسة، استدعاء الضمير بـ«أرجو تذكر»، رفع المسألة يُشعره بالاهتمام الحقيقي. 70% من المهدِّدين يتراجعون بعد هذا الرد.', consequence: '... حسناً. وش هو الرصيد اللي تقوله؟' }
      ],
      expert_move: 'تشريع التقييم = نزع سلاح التهديد. البديل الملموس ضمن السياسة = إنقاذ ماء وجهه. رفع الأمر للإدارة = يشعر بأنه يُعامَل بجدية. الثلاثة معاً تُحوّل الابتزاز إلى حوار.',
      principle: 'مبدأ Emotional Blackmail: التهديد يفقد قوته حين تُزيل الخوف منه. «التقييم حقك» هي الجملة التي تُفرغ التهديد تماماً — لا يمكنه التهديد بشيء منحته له مسبقاً.'
    },
    cc_10: {
      id: 'cc_10', category: 'callcenter', title: 'الزبون الصامت — «ما أعرف» على كل سؤال', difficulty: 3,
      setup: 'زبون يتصل بمشكلة تقنية في خدمته لكنه يجيب «ما أعرف» على كل سؤال تشخيصي. لا يعرف رقم طلبه، لا يعرف نوع الجهاز، لا يعرف متى بدأت المشكلة. ليس عدوانياً — فقط غير متعاون.',
      dialogue_opener: 'الشيء ما يشتغل... ما أعرف وش صاير. بس ما يشتغل.',
      psychological_context: 'نظرية العجز المكتسب (Learned Helplessness) لـ Seligman: هذا الشخص تعلّم سابقاً أن محاولة الفهم لا تُغيّر النتيجة، لذا توقّف عن المحاولة. أسئلة «من؟ ماذا؟ متى؟» مباشرة تُرهقه. الحل: أسئلة ثنائية بسيطة (إما/أو) تُعيد تنشيط قدرته على الإجابة.',
      choices: [
        { text: 'ممكن تعطيني رقم الطلب؟ وش نوع الجهاز؟ ومتى بدأت المشكلة؟', score: 10, feedback: 'ثلاثة أسئلة دفعة واحدة لشخص أصلاً يعاني من العجز المعرفي = تعطيل كامل. «ما أعرف» × ٣ مضمونة.', consequence: 'ما أعرف... ما أعرف... ما أعرف.' },
        { text: 'تمام، ممكن تعطيني رقم حسابك عشان أشوف ملفك؟', score: 55, feedback: 'أفضل — سؤال واحد وعملي. لكنه لا يزال يعتمد على ذاكرة الزبون الذي قد لا يعرف رقمه.', consequence: 'رقم الحساب... ما أعرف وين أحصل عليه.' },
        { text: 'هل الجهاز اللي تستخدم فيه الخدمة جوال ولا كمبيوتر؟', score: 75, feedback: 'سؤال ثنائي ذكي — يُعطيه خيارين لا يحتاج إلى ذاكرة. جيد لكنه يحتاج استراتيجية كاملة لا سؤالاً واحداً.', consequence: 'جوال... أعتقد.' },
        { text: 'تمام، خلنا نحلها مع بعض بطريقة سهلة. سؤال واحد بس: الشيء اللي ما يشتغل — هل كان يشتغل قبل ولا ما شتغل أصلاً من البداية؟', score: 100, feedback: 'سؤال ثنائي يُعيد تنشيط الذاكرة البصرية لا المعلوماتية. «كان يشتغل» مقابل «ما شتغل أبداً» يُحدد 80% من التشخيص. ثم تبني الأسئلة الثنائية واحداً تلو الآخر كسلّم.', consequence: 'كان يشتغل... بس من امبارح توقف.' }
      ],
      expert_move: 'استراتيجية الأسئلة الثنائية المتسلسلة: كل سؤال ثنائي (أ أو ب) يُنتج إجابة تُبني السؤال الثنائي التالي. في ٤ أسئلة تصل لتشخيص كامل دون أن يتعرض الزبون للإرهاق المعرفي.',
      principle: 'مبدأ Learned Helplessness: الزبون الذي يقول «ما أعرف» لم يفقد المعلومة — فقد الثقة بقدرته على الإجابة. الأسئلة الثنائية تُعيد هذه الثقة لأنها تُلغي إمكانية الإجابة الخاطئة.'
    },

    // ─────────────────────────────────────────────
    //  مبيعات ميدانية — متقدم (2)
    // ─────────────────────────────────────────────
    sa_08: {
      id: 'sa_08', category: 'sales', title: 'الزبون الذي يقول «سأفكر في الأمر»', difficulty: 4,
      setup: 'قدّمت عرضاً كاملاً ومتقناً لزبون مهتم في معرض أو اجتماع. استمع بإيجابية وطرح أسئلة جيدة. لكن عند النهاية قال الجملة التي يكرهها كل بائع. الإحصاءات تقول إن 80% ممن يقولون هذه الجملة لا يرجعون.',
      dialogue_opener: 'والله شرحك كان ممتاز وأنا محتاج هالشيء فعلاً. بس أبغى أفكر شوي وأرجع لك.',
      psychological_context: 'ظاهرة Status Quo Bias — الدماغ يُفضّل الوضع الراهن لأن التغيير يتطلب طاقة معرفية وعاطفية. «أفكر» في الغالب لا تعني غياب القناعة — بل وجود اعتراض مخفي لم يُصرّح به. البحث يُظهر أن 63% من «سأفكر» تعني «عندي سؤال لم أسأله بعد».',
      choices: [
        { text: 'بالتأكيد، خذ وقتك. هذا بطاقتي.', score: 10, feedback: 'تركته يغادر مع الاعتراض المخفي. ما من أحد يعود «بعد التفكير» إلا في حالات نادرة. الفرصة انتهت.', consequence: '(لا يرجع أبداً)' },
        { text: 'بالطبع، بس قبل ما تروح — عندنا عرض ينتهي اليوم!', score: 15, feedback: 'ضغط مصطنع يُكذّبك ويدمر الثقة. الزبون الذكي يعرف أن «العرض ينتهي اليوم» يتكرر كل يوم.', consequence: 'لا، ما أبغى أتسرع. إذاً خلاص.' },
        { text: 'أفهمك. بس بصراحة، في الغالب لما أحد يقول «سأفكر» يكون عنده سؤال ما سأله. هل في شيء محدد ما اتضح لك؟', score: 85, feedback: 'ذكي جداً — يستخرج الاعتراض المخفي بصدق. لكنه قد يبدو مباشراً جداً لبعض الشخصيات.', consequence: 'الحقيقة... السعر يبدو أعلى شوية من ميزانيتي.' },
        { text: 'بالتأكيد، التفكير قرار صح. قبل ما تروح — وش الشيء الوحيد اللي لو اتضح لك كنت ستقرر الحين؟', score: 100, feedback: 'سؤال «الشيء الوحيد» يُجبر الدماغ على تحديد الاعتراض الحقيقي من بين الضباب. بعد إجابته ستعرف بدقة ما يجب معالجته — أو أن وقته فعلاً غير مناسب.', consequence: 'الصراحة؟ ما أعرف لو الميزانية تسمح الحين. لو وجدنا حل لهذا أقدر أقرر.' }
      ],
      expert_move: 'سؤال «الشيء الوحيد» (The One Thing Question) هو أقوى أداة لاستخراج الاعتراض المخفي. حين يُجيب الزبون تتحول المحادثة من «أفكر» إلى «مشكلة قابلة للحل».',
      principle: 'مبدأ Status Quo Bias: «سأفكر» هي رسالة مشفّرة لاعتراض لم يجد طريقه للخروج. المهارة ليست في الإقناع بل في استخراج الاعتراض المخفي — لأن ما لا تعرفه لا يمكنك حله.'
    },
    sa_09: {
      id: 'sa_09', category: 'sales', title: 'الزبون الذي أحاله صديق لكنه غير مقتنع', difficulty: 3,
      setup: 'زبون جاءك عبر توصية من صديق مشترك. أنت تعرف أن صاحبه راضٍ جداً عنك. لكن هذا الزبون منذ البداية مشكّك ويسعى لإيجاد سبب للرفض — ربما يريد الشراء من مكان آخر لكنه لا يريد يُحرج صديقه.',
      dialogue_opener: 'صاحبي قالك تمام بس أنا شايف إن في خيارات ثانية ما أقل منكم. مو شايف ليش أشتري منكم تحديداً.',
      psychological_context: 'نظرية الهوية الاجتماعية لـ Tajfel: هذا الزبون في صراع بين ولاء الصداقة وهويته المستقلة كـ«شخص يتخذ قراراته بنفسه». إذا شعر أنك «تبيع بسبب الوساطة» ستزداد مقاومته. الحل: كرّم استقلاليته ودعه يصل للإجابة بنفسه.',
      choices: [
        { text: 'صاحبك ذوقه عالٍ وأنا واثق إنك ما ستندم.', score: 15, feedback: 'ربطت قرار الشراء بصديقه = أشعلت الصراع الداخلي. الآن رفضك = تكريم لاستقلاليته.', consequence: 'يعني أنا لازم أشتري لأن صاحبي قال؟ أفكر.' },
        { text: 'سؤال عادل. وش بالتحديد اللي تحتاجه في هذا المنتج ويقدر المكان الثاني يوفّره؟', score: 80, feedback: 'يُعيد الكرة له ويكشف ما إذا كان لديه بديل حقيقي. قوي لكنه يحتاج متابعة استراتيجية.', consequence: 'مو متأكد بالضبط... بس أبغى أشوف خياراتي.' },
        { text: 'أنا أقدر أفهمك — أنت تتخذ قراراتك بنفسك مو بناءً على توصية. هذا صح. خلني أسألك سؤالاً مختلفاً: بصرف النظر عن صاحبك — وش المشكلة اللي تحاول تحلها؟ لأن إذا أحنا مو الحل المناسب، أنا أول من يقولك روح لغيرنا.', score: 100, feedback: 'ثلاث حركات: تكريم استقلاليته (تتخذ قراراتك بنفسك)، فصل قرار الشراء عن الصداقة، الجرأة في قول «روح لغيرنا» تبني ثقة استثنائية وتُعطيه سبباً للبقاء.', consequence: 'هههه، هذا رد ما توقعته. تمام، المشكلة اللي عندي هي...' }
      ],
      expert_move: 'تكريم الاستقلالية + الفصل عن الصداقة + الجرأة في قول «روح لغيرنا» = ثلاثية تُطلق الثقة. الإذن بالرفض هو أقوى محفز للقبول.',
      principle: 'مبدأ Social Identity: الزبون الذي جاء بتوصية يحتاج أن يشعر أنه اختارك — لا أن الاختيار فُرض عليه. حين تُعطيه إذن الرفض الصريح، تحرير نفسيته يقوده للقبول الطوعي.'
    },

    // ─────────────────────────────────────────────
    //  أكونت منجر — متقدم (2)
    // ─────────────────────────────────────────────
    acct_04: {
      id: 'acct_04', category: 'account', title: 'عميل يطلب مهام إضافية «بسيطة» خارج العقد', difficulty: 4,
      setup: 'عميل B2B راضٍ يُرسل لك رسالة: يطلب إضافة مهمة جديدة كبيرة معتبراً إياها «شيء بسيط» خارج نطاق العقد المحدد. الطلب سيستغرق ٣ أيام عمل. يفعل هذا بانتظام.',
      dialogue_opener: 'مرحبا، عندي شيء بسيط إضافي — ممكن تضيفوا هذا التقرير الجديد للباقة؟ ما يأخذ وقت، إنتم خبراء.',
      psychological_context: 'ظاهرة Scope Creep المتعمدة + نظرية Foot-in-the-Door: طلب «البسيط» الأول يُمهّد لطلبات أكبر. كل قبول بدون حدود يُرسّخ توقع الزيادة المجانية. رفض الطلب مباشرة يُضر بالعلاقة. الحل: الشفافية التجارية بلغة إيجابية.',
      choices: [
        { text: 'بالتأكيد، ما في مشكلة. نسوي ذلك.', score: 5, feedback: 'وافقت على نطاق إضافي مجاناً — أثبتت أن الطلبات الإضافية مقبولة دائماً. الشهر القادم سيكون هناك «بسيط» آخر.', consequence: '(الشهر القادم) مرحبا، شيء بسيط ثاني...' },
        { text: 'هذا خارج نطاق العقد ولن نستطيع تنفيذه بدون تعديل.', score: 30, feedback: 'صادق لكنه بارد وقانوني بزيادة. يُشعره أنك تتعامل معه كرقم لا كشريك.', consequence: 'يعني كل شيء يكون عقد جديد؟ هذا مرهق.' },
        { text: 'أقدر أفهم إنه يبدو بسيطاً، بس هذا يحتاج وقت وموارد حقيقية. بعدها نتكلم عن التسعير؟', score: 60, feedback: 'أوضحت القيمة لكن مباشرة للتسعير بدون حل وسط. قد يُشعله وكأنك لا تهتم بالعلاقة.', consequence: 'ما فكرت إن هذا يكون بفلوس.' },
        { text: 'أقدر أشوف قيمة هذا التقرير لشغلكم. بصراحة هذا يقع خارج نطاق العقد الحالي ويحتاج ٣ أيام عمل — لكن لأنكم شركاء مهمين، عندي خيارين: إما نضيفه ضمن تجديد العقد القادم بتعديل بسيط في السعر، أو نعدّ له عرض منفصل سريع. أيهما يناسبكم؟', score: 100, feedback: 'تكريم الطلب + الشفافية التجارية + خيارين إيجابيين = تعليمه أن القيمة لها ثمن بلغة شريك لا بلغة محامٍ. الخيار يُشعره بالسيطرة لا بالضغط.', consequence: 'منطقي. خلنا نضيفه في التجديد القادم — متى موعده؟' }
      ],
      expert_move: 'تكريم الطلب + الشفافية عن التكلفة الحقيقية + خيارين تجاريين إيجابيين = معالجة Scope Creep بدون توتر. مع كل مرة تفعل هذا يتعلم العميل أن الإضافات لها قيمة.',
      principle: 'مبدأ Scope Creep: كل «نعم» مجانية تُحدد توقعات العقد القادم. التعليم المبكر بلغة الشراكة أسهل بكثير من إعادة التفاوض لاحقاً بعد أن ترسّخت التوقعات.'
    },
    acct_05: {
      id: 'acct_05', category: 'account', title: 'عميل يُبلّغك بتقليص ميزانيته الإجباري', difficulty: 5,
      setup: 'عميل مخلص ومهم يتصل بك مسبقاً قبل موعد التجديد ليُبلّغك بإخلاص أن إدارته فرضت خفض الميزانية بـ 30% على جميع العقود. هو شخصياً لا يريد تغيير المورد لكنه مقيّد.',
      dialogue_opener: 'أبغى أكون صريح معك قبل موعد التجديد — الإدارة طلبت تقليص كل العقود بـ 30%. أنا شخصياً ما أبغى أغير، بس أيدي مكبّلة.',
      psychological_context: 'نظرية القيود المُعلنة (Constraint Framing): العميل يُبلّغك بقيد حقيقي لكنه يُرسل إشارة خفية: «ساعدني أجد مبرراً للبقاء معك». هذا ليس تفاوضاً عدوانياً — هو يطلب منك أن تُنقذه من قرار إدارته. من يُعالج هذا الموقف بمرونة إبداعية يكسب ولاءً مضاعفاً.',
      choices: [
        { text: 'أفهم وضعكم. سنطابق الخفض — 30% خصم.', score: 20, feedback: 'قبلت بالخفض فوراً دون مقابل = أثبت للإدارة أن سعرك الأصلي كان مبالغاً. وفتحت بابًا لخفض 30% كل سنة.', consequence: '(الإدارة) ممتاز، العام القادم نطلب 40%.' },
        { text: 'أتفهم لكن 30% مستحيل — هذا يضر جودة الخدمة.', score: 30, feedback: 'رد دفاعي يضعه في مواجهة إدارته. هو يريد حلاً لا مشكلة جديدة.', consequence: 'إذاً أنا في مشكلة — إدارتي لن تقبل بهذا.' },
        { text: 'ممكن نخفض نطاق الخدمة بنسبة 30% عشان ينعكس على السعر؟', score: 65, feedback: 'حل عملي ومنطقي. لكنه يُقلل القيمة التي تقدمها، مما يُسهّل عليهم الاستغناء عنك لاحقاً.', consequence: 'يعني سنفقد ميزة X وY؟ هذا مؤلم.' },
        { text: 'أقدر أقدّر صراحتك وأنا أعرف إنك في موضع صعب. خلني أقترح شيئاً: بدل نخفض السعر — نُعيد هيكلة العقد بحيث تُبرز لإدارتك قيمة إضافية واضحة تبرر الميزانية. أنا أساعدك تبني الحجة أمام إدارتك — لأن قيمتنا فعلية ويمكن إثباتها بأرقام.', score: 100, feedback: 'الحركة الماستر: تحوّلت من «مورد يدافع عن سعره» إلى «شريك يساعده يقنع إدارته». هذا يُغير الديناميكية كلياً — أنت الآن حليفه داخل شركته.', consequence: 'هذا ما كنت أحتاجه. ممكن نجتمع الأسبوع القادم ونبني هذا معاً؟' }
      ],
      expert_move: 'التحوّل من «دفاع عن السعر» إلى «شريك في بناء الحجة الداخلية» هو أقوى استراتيجية في B2B. حين تساعد الشخص يبيع قيمتك داخل مؤسسته، تصبح أنت ومصلحته شيئاً واحداً.',
      principle: 'مبدأ Constraint Framing: القيد المُعلن هو دعوة للإبداع. العميل الذي يُبلّغك مسبقاً يريد حلاً لا رقماً أقل. من يُقدّم حلاً إبداعياً يكسب الصفقة والولاء معاً.'
    },

    // ─────────────────────────────────────────────
    //  مركز الصيانة — متقدم (2)
    // ─────────────────────────────────────────────
    repair_06: {
      id: 'repair_06', category: 'repair', title: 'تكلفة الإصلاح أعلى من قيمة الجهاز', difficulty: 3,
      setup: 'زبون جاء بـ Samsung A30 قديم تعرّض لضرر في لوحة الأم. بعد الفحص تبيّن أن تكلفة الإصلاح 120 ألف دينار، والجهاز لا يساوي في السوق أكثر من 80 ألف. الزبون لا يعرف بعد.',
      dialogue_opener: 'وين وصلتوا في الفحص؟ متى يكون جاهز؟ هذا جهاز ولدي وفيه صوره وكل شي.',
      psychological_context: 'نظرية التعلّق بالملكية (Endowment Effect) لـ Thaler: الجهاز في نظر الزبون لا يُقاس بقيمته السوقية بل بالذكريات والبيانات التي تحتويها. الصدق الصريح ضروري لكن تقديمه بدون حساسية يُشعله. يحتاج الحل بديلاً عملياً.', 
      choices: [
        { text: 'الإصلاح بـ 120 ألف بس الجهاز ما يسوى أكثر من 80 ألف، مو منطقي تصلحه.', score: 25, feedback: 'صادق لكنه جارح وقاطع. يُشعره بأنك تُهين جهاز ابنه دون أن تُقدّم له مخرجاً.', consequence: 'إذاً يرمي جهازه؟! وصور ولدي؟' },
        { text: 'الإصلاح ممكن، بس مكلف شوي.', score: 20, feedback: 'مُضلّل — «مكلف شوي» لا يصف الواقع. حين يسمع الرقم سيشعر بأنك أخفيت عنه.', consequence: 'قديش مكلف؟... 120 ألف؟! ليش ما قلت من البداية؟' },
        { text: 'أنا أفهم إن هذا الجهاز مهم — فيه ذكريات غير قابلة للاستبدال. الفحص ظهر إن تكلفة إصلاح اللوحة أعلى من قيمة الجهاز. بس قبل أي قرار — أولويتنا نستخرج بيانات ولدك أولاً وهذا مجاني، ثم تقرر بهدوء.', score: 100, feedback: 'ثلاث حركات: الاعتراف بالقيمة العاطفية (ذكريات غير قابلة للاستبدال)، الصدق الكامل عن الأرقام، تحويل الأولوية لاستخراج البيانات مجاناً — يُشعره بالرعاية الحقيقية ويُهدّئ أكبر مخاوفه.', consequence: 'الصور أهم من الجهاز. إذا تقدرون تحفظوا البيانات — شكراً جداً.' }
      ],
      expert_move: 'حين تكون الأخبار سيئة: الاعتراف بالجانب العاطفي أولاً + الصدق الكامل عن الأرقام + تحويل التركيز لما يمكن إنقاذه = يُحوّل اللحظة الصعبة إلى دليل على النزاهة.',
      principle: 'مبدأ Endowment Effect: الزبون لا يُقيّم جهازه بسعر السوق — يُقيّمه بقيمة ما يحتويه. الصدق المُقرون بالحل العاطفي (البيانات أولاً) يبني ثقة أقوى مما يفعله أي إصلاح ناجح.'
    },
    repair_07: {
      id: 'repair_07', category: 'repair', title: 'زبون يطلب ضمان «مدى الحياة» على إصلاح بسيط', difficulty: 3,
      setup: 'زبون جاء لإصلاح منفذ الشحن في هاتفه. الإصلاح بسيط وسعره معقول. لكن قبل أن تبدأ يشترط ضماناً «مدى الحياة» ويهدد بعدم الدفع إذا لم يحصل عليه.',
      dialogue_opener: 'أنا أصلح عندكم بس أريد ضمان مدى الحياة على هالإصلاح. مو ضمان شهر ولا سنة — مدى الحياة. وإلا ما أدفع.',
      psychological_context: 'نظرية الطلب المتطرف كأداة تفاوضية (Door-in-the-Face) معكوسة: الزبون يبدأ بطلب مستحيل ليُمهّد لقبول ما هو أقل. لكنه قد يكون جادًا — سبق أن أصلح جهازه في مكان آخر وخُذل. الحل: لا ترفض الطلب مباشرة، بل افهم الخوف خلفه.',
      choices: [
        { text: 'ضمان مدى الحياة مستحيل — هذا غير موجود في أي مركز.', score: 20, feedback: 'رفض مباشر يُصلّب موقفه. الآن كرامته على المحك.', consequence: 'إذاً أنا مو مقتنع أصلح هنا.' },
        { text: 'عندنا ضمان ٣ أشهر وهذا معيار السوق.', score: 45, feedback: 'منطقي لكنه بارد. لم يُعالج الخوف الكامن وراء الطلب.', consequence: '٣ أشهر قليلة — نفس القصة مرة ثانية.' },
        { text: 'حسناً، نعطيك ضمان ٦ أشهر.', score: 30, feedback: 'تنازلت بدون فهم السبب — وأثبت له أن الضغط يعمل.', consequence: 'أبغى سنة.' },
        { text: 'أنا أسمع إنك تريد تأكيداً حقيقياً وليس مجرد وعد. هل مررت بتجربة سابقة انتهى ضمانها وعادت المشكلة؟ — لأن ضمان مدى الحياة تقنياً غير ممكن لأن الأجهزة نفسها تتقادم. بس اللي أقدر أضمنه: إذا عادت نفس المشكلة خلال ٦ أشهر نصلحها مجاناً، وإذا تبيّن إنها بسبب شغلتنا نصلحها مجاناً إلى الأبد. هذا ضمان أقوى من «مدى الحياة» لأنه واقعي.', score: 100, feedback: 'استخرجت الخوف (تجربة سابقة)، شرحت لماذا الطلب غير ممكن تقنياً دون إهانته، ثم قدّمت ضماناً أقوى ومنطقياً يُلبّي الحاجة الحقيقية لا الطلب الظاهري.', consequence: 'أيوه، مركز ثاني أصلح وبعد أسبوعين عادت المشكلة وقالوا «الضمان انتهى». إذاً ضمانك أفضل فعلاً.' }
      ],
      expert_move: 'وراء كل طلب مستحيل حاجة حقيقية. استخراج التجربة السابقة المؤلمة + تفسير المستحيل تقنياً + ضمان واقعي أقوى يُلبّي الحاجة الحقيقية = انقلاب كامل في الموقف.',
      principle: 'مبدأ Door-in-the-Face العكسي: الطلب المتطرف غالباً يخفي خوفاً بحجم الخسارة السابقة. من يُشخّص الخوف يصنع الحل — من يرفض الطلب يُصلّب المواقف.'
    },

    // ─────────────────────────────────────────────
    //  سوشيال ميديا — متقدم (2)
    // ─────────────────────────────────────────────
    sm_04: {
      id: 'sm_04', category: 'social', title: 'منافس يتنكر كزبون ويكتب تعليقاً مقارناً', difficulty: 5,
      setup: 'ظهر تعليق على منشورك الترويجي من حساب «مجهول» يبدو وكأنه زبون لكن أسلوبه ومعلوماته الدقيقة تُشير بقوة إلى أنه منافس. التعليق يُقارن منتجك سلباً بمنافس محدد ويبدو موضوعياً للقارئ العادي.',
      dialogue_opener: 'جربت المنتج وصراحة مقارنةً بـ[المنافس] الفرق واضح لصالحهم في الجودة والسعر. هل تقدرون تفسرون ليش تستمرون بنفس السعر؟',
      psychological_context: 'تكتيك Astroturfing — تعليق يبدو عضوياً لكنه مصنوع. الخطورة: الرد الدفاعي يُثبت لجمهورك أن التعليق أثّر بك. تجاهله يتركه يُؤثر في صامتين. الرد الاحترافي يُحوّل التعليق المشبوه لفرصة لإثبات ثقتك بمنتجك.',
      choices: [
        { text: 'تعليقك يبدو مريباً. هذا ليس رأي زبون حقيقي.', score: 0, feedback: 'اتهام علني بدون دليل يجعلك تبدو دفاعياً ومهزوزاً. حتى لو كنت محقاً — جمهورك لا يعرف ذلك.', consequence: '[تعليقات تدافع عن «الزبون»: «ليش تهاجمون الناس؟»]' },
        { text: 'شكراً لرأيك. كل منتج يناسب شريحة معينة.', score: 40, feedback: 'مقبول لكنه يبدو هروباً وكأنك لا تملك رداً حقيقياً.', consequence: '[يُضيف تعليقاً ثانياً بمزيد من «المقارنات»]' },
        { text: 'نقدّر الشفافية. ما هي الجوانب تحديداً التي وجدتها مختلفة؟ نودّ نفهم أكثر.', score: 65, feedback: 'استجابة ذكية تطلب التفاصيل — لكن لو كان منافساً فهذا يُعطيه منصة إضافية.', consequence: '[يُضيف قائمة مقارنات مطوّلة]' },
        { text: 'سؤال وجيه! تحديداً لهذا نشجّع كل شخص يقارن بنفسه — فاللي يناسب شخصاً قد لا يناسب آخر. زبائننا [أرقام/شهادات] يُخبرون قصتهم. وبالنسبة للسعر — جودة [ميزة محددة] مدمجة في سعرنا لا تجدها كإضافة منفصلة. من يريد التجربة، تعالوا وحكموا بأنفسكم.', score: 100, feedback: 'ثلاث حركات: لا تُنكر ولا تتهم، أبرز ثقتك بزبائنك الحقيقيين بأرقام، افسّر فارق السعر بميزة ملموسة، وادعُ للتجربة المباشرة. الجمهور الصامت هو من تتحدث إليه.', consequence: '[تعليقات إيجابية من متابعين: «هذا رد واثق من نفسه»]' }
      ],
      expert_move: 'في حالة Astroturfing: لا تُهاجم مصدر التعليق — هاجم الفراغ المعلوماتي فيه بأرقام وشهادات حقيقية. جمهورك الصامت يُقيّم ردّك أكثر مما يُقيّم التعليق.',
      principle: 'مبدأ الجمهور الصامت: 90% من من يشاهدون تعليقاً سلبياً لا يردّون. ردّك العلني ليس للمعلّق — هو رسالة للتسعة والتسعين الصامتين. الثقة بالنفس في الرد تُقنع أكثر من أي حجة.'
    },
    sm_05: {
      id: 'sm_05', category: 'social', title: 'مؤثر ناشئ يطلب منتجاً مجانياً مقابل «النشر»', difficulty: 2,
      setup: 'وصلتك رسالة مباشرة من مؤثر بـ 4,200 متابع على Instagram يطلب منتجاً مجانياً بقيمة عالية مقابل «تغطية» على حسابه. معدل تفاعله 2%، وجمهوره لا يتطابق مع شريحتك المستهدفة.',
      dialogue_opener: 'مرحبا، أنا مؤثر متنامي في مجال [كذا] ومتأكد إن جمهوري يناسبكم. أبغى تتعاونون معي بإرسال المنتج مجاناً وبالمقابل أسوي تغطية كاملة. هذا فرصة ذهبية لكم!',
      psychological_context: 'نظرية Reciprocity Trap: الطلب مُصاغ كـ«تبادل» لكنه في الحقيقة غير متوازن. ضغط «الفرصة الذهبية» يستهدف FOMO. الرد الخاطئ: الرفض الجاف يُنشئ عدواً. القبول العمياء يفتح باب طلبات مماثلة لا قيمة لها. الحل: معيار شفاف وعادل.',
      choices: [
        { text: 'شكراً لتواصلك، لكننا لا نُرسل منتجات مجانية.', score: 30, feedback: 'سياسة واضحة لكنها جافة. لم تُبقِ باباً للتعاون المستقبلي حين ينمو.', consequence: '(ينشر تعليقاً سلبياً: «الشركة X لا تدعم المؤثرين الناشئين»)' },
        { text: 'بالتأكيد! سنرسل لك المنتج. أرسل عنوانك.', score: 5, feedback: 'قبلت تعاوناً بدون تقييم. 4200 متابع بتفاعل 2% = ~84 شخص يرون المحتوى. لا معادلة تجارية هنا.', consequence: '(طلبات مماثلة من 20 مؤثراً آخر الأسبوع القادم)' },
        { text: 'نقدّر اهتمامك! شاركنا إحصاءات حسابك عشان نُقيّم التعاون.', score: 70, feedback: 'احترافي وصادق. لكنه قد يبدو بارداً لمؤثر ناشئ متحمس.', consequence: 'إليك الإحصاءات: 4200 متابع، 2% تفاعل...' },
        { text: 'أهلاً! نحن نقدّر كل مؤثر ناشئ وعندنا برنامج تعاون واضح: لمن لديهم أقل من 10K متابع، نُقدّم خصماً حصرياً 40% مقابل تغطية موثّقة. لمن تجاوزوا 10K مع تفاعل 4%+ نُرسل المنتج مجاناً. هل هذا يناسبك الآن أو مستقبلاً؟', score: 100, feedback: 'ثلاث حركات: تكريم الطلب بدون رفض جارح، معيار شفاف وموضوعي لا ينتقده أحد، باب مفتوح للمستقبل. يُبني سمعتك كشركة منظّمة لا عشوائية.', consequence: 'الخصم 40% مغري! حسناً، متى أصبح مؤهلاً للنسخة الكاملة؟' }
      ],
      expert_move: 'معيار التعاون الشفاف والمُعلن يحل مشكلة المؤثرين الناشئين للأبد. لا رفض شخصي، لا قبول عشوائي — فقط سياسة واضحة تجعلك تبدو محترفاً وعادلاً في نفس الوقت.',
      principle: 'مبدأ Reciprocity Trap: الطلب بصياغة «تبادل» يُلزمك بالقبول اجتماعياً. المعيار الشفاف يُحوّل القرار من «رفض شخصي» إلى «سياسة موضوعية» — وهذا يُخرجك من الفخ بكرامة.'
    },

    // ─────────────────────────────────────────────
    //  تفاوض وظيفي — متقدم (2)
    // ─────────────────────────────────────────────
    neg_03: {
      id: 'neg_03', category: 'negotiation', title: 'عميل مستقل يريد الدفع كاملاً بعد التسليم فقط', difficulty: 4,
      setup: 'أنت مستقل (فريلانسر) وتتفاوض على مشروع بـ 5000 دولار. العميل يصرّ على دفع المبلغ كاملاً فقط بعد التسليم النهائي والموافقة. لا دفعة مقدمة، لا دفعات مجزّأة.',
      dialogue_opener: 'أنا مبدئي في الأعمال — أدفع كامل المبلغ بعد ما تسلّمني الشغل وأوافق عليه. هذا ضمان لي إنك تشتغل صح.',
      psychological_context: 'نظرية المخاطر غير المتماثلة (Asymmetric Risk): الترتيب المقترح يضع كل المخاطرة عليك أنت — يمكنه التأخير، طلب تعديلات لا نهاية لها، أو الاختفاء. لكن رفضه المباشر قد يُبدو خسارة الصفقة. الحل: إعادة هيكلة المخاطرة بحيث تكون متوازنة لكليكما.',
      choices: [
        { text: 'حسناً، قبلت. بس أبغى نكتب عقداً واضحاً.', score: 20, feedback: 'قبلت بترتيب مجحف. العقد لا يُلزمه بالدفع حين «لا يوافق» — والموافقة تظل معلّقة إلى ما لا نهاية.', consequence: '(بعد شهرين) التعديل الثلاثين... أعتقد ما زال ناقصاً.' },
        { text: 'هذا غير مقبول — أحتاج 50% مقدماً وهذه سياستي.', score: 50, feedback: 'موقفك صحيح لكن تقديمه كـ«سياسة» يبدو جامداً. لم تُعطِه سبباً يفهم أنه لمصلحته أيضاً.', consequence: 'سياستك صعبة — المستقلون الثانيون لا يطلبون هذا.' },
        { text: 'أفهم قلقك من عمل غير مكتمل. المتعارف عليه في الصناعة هو 30% مقدماً + 30% بعد نصف المشروع + 40% عند التسليم. هذا يحمينا كلينا ويضمن لك أنني ملتزم بكل مرحلة.', score: 100, feedback: 'ثلاث حركات: تشريع قلقه (أفهم قلقك)، معيار الصناعة كمرجع موضوعي لا رأي شخصي، هيكل دفع يُثبت أن كل دفعة مرتبطة بمخرج ملموس يحميه. التوازن يُزيل الخوف من الطرفين.', consequence: 'هذا منطقي فعلاً. ما كنت أعرف أن هذا هو المعيار. موافق.' }
      ],
      expert_move: 'هيكل الدفع المرتبط بالمراحل يُزيل المخاطرة غير المتماثلة ويُعطي كل طرف رقابة حقيقية. معيار الصناعة كمرجع يُخرج التفاوض من «أنا ضدك» إلى «هذا ما يفعله الجميع».',
      principle: 'مبدأ Asymmetric Risk: كل ترتيب تجاري يضع كل المخاطرة على طرف واحد هو ترتيب فاشل على المدى البعيد. المفاوض الخبير يُعيد توزيع المخاطرة بحيث كل طرف لديه حافز على الإنجاز.'
    },
    neg_04: {
      id: 'neg_04', category: 'negotiation', title: 'طلب يوم عمل عن بُعد من مدير متشكّك', difficulty: 4,
      setup: 'أنت موظف متميز في شركة تقليدية. تريد طلب يوم عمل من المنزل أسبوعياً. مديرك معروف بتشككه في الإنتاجية خارج المكتب، وقال صراحة سابقاً: «الناس لا تنتج من المنزل».',
      dialogue_opener: 'الاجتماع متاح الآن. ما الذي تريد مناقشته؟',
      psychological_context: 'نظرية مقاومة التغيير (Reactance Theory) لـ Brehm: المدير شكّل رأياً راسخاً. الهجوم المباشر على رأيه يُصلّبه. الاستراتيجية: لا تطلب «تغيير السياسة» — اطلب «تجربة قابلة للقياس» تُثبت صحة موقفك بأرقام يصعب رفضها.',
      choices: [
        { text: 'أريد طلب يوم عمل من المنزل أسبوعياً. أعتقد أنه سيُحسّن إنتاجيتي.', score: 15, feedback: 'طلب مباشر بدون دليل لمدير يؤمن بالعكس. «أعتقد» ليست حجة.', consequence: 'أنت تعرف رأيي في العمل من المنزل. الجواب لا.' },
        { text: 'أعرف إنك تُفضّل الحضور، بس الدراسات تثبت أن العمل من المنزل يرفع الإنتاجية.', score: 20, feedback: 'الاحتجاج بالدراسات يبدو كأنك تُحاضر مديرك — يُصلّب موقفه ويُشعله بالدفاعية.', consequence: 'الدراسات عامة. أنا أحكم على ما أراه هنا.' },
        { text: 'أريد اقتراح تجربة لمدة شهر — أشتغل يوم الأربعاء من المنزل وأُقدّم لك أرقام إنجازاتي مقارنة بالأيام الأخرى. بعد شهر، الأرقام تحكم لا آرائنا.', score: 90, feedback: 'ذكي جداً — طلب تجربة محدودة المدة يُزيل مقاومة «تغيير السياسة»، والأرقام تُحكّم الواقع لا الرأي. لكنه يحتاج استكمالاً لماذا هذا اليوم تحديداً.', consequence: 'شهر... قابل للتجربة. ما هي الأرقام التي ستقيسها؟' },
        { text: 'أعرف إنك تُقدّر الإنتاجية الفعلية لا الادعاءات. لهذا مو جاي أطلب سياسة — جاي أقترح تجربة: يوم الأربعاء من المنزل لأربعة أسابيع، مع تقرير أسبوعي يُقارن مخرجاتي بأيام المكتب. بعد أربعة أسابيع، الأرقام تُقرر. إذا لم تُثبت تحسناً، أوقف الطلب.', score: 100, feedback: 'استخدمت قيمة المدير ضده بإيجابية (تُقدّر الإنتاجية الفعلية)، حوّلت الطلب لتجربة محدودة لا تغيير سياسة، أعطيته سلطة الحكم بالأرقام لا بالرأي، وقدّمت مخرج آمن له (إذا لم يُثبت — أوقف). لا مجال للرفض العقلاني.', consequence: 'هذا عادل. نجرب أربعة أسابيع ونرى الأرقام.' }
      ],
      expert_move: 'تحويل الطلب من «تغيير سياسة» إلى «تجربة قابلة للقياس» يُزيل الحاجز النفسي الأكبر. إعطاء المدير سلطة الحكم بالأرقام يجعله يشعر بالسيطرة لا بالانتقاص من سلطته.',
      principle: 'مبدأ Reactance Theory: الناس يُقاومون ما يُشعرهم أن حريتهم مُقيّدة. الطلب كـ«تجربة» لا «حق» يُزيل الشعور بالتقييد ويُحوّل المدير من خصم يدافع عن موقفه إلى حكم ينتظر الإثبات.'
    },

    // ─── دفعة 1 من 2 : السيناريوهات الجديدة 01-17 ───
    new_scenario_01: {
      id: 'new_scenario_01', category: 'callcenter', title: 'الزبون يبكي أثناء المكالمة فجأة', difficulty: 5,
      setup: 'تتصل بك زبونة بشأن فاتورة خاطئة. في منتصف الحديث تبدأ بالبكاء. سبب البكاء ليس الفاتورة — بل ضغط متراكم وربما وضع شخصي صعب.',
      dialogue_opener: 'آسفة... أنا... (بكاء) ما أعرف ليش أبكي... الموضوع مو بس الفاتورة...',
      psychological_context: 'Emotional Spillover Effect — الضغط المتراكم ينفجر عبر أي محفّز. محاولة إعادة المحادثة للفاتورة فوراً ستُشعرها بعدم الاهتمام. التعمق كثيراً في حياتها الشخصية تجاوز للحدود المهنية.',
      choices: [
        { text: 'أختي، خلينا نركز على الفاتورة وبعدين إذا محتاجة شي ثاني...', score: 5, feedback: 'تجاهل مباشر للحالة العاطفية. ستشعر أنها مجرد رقم طابور.', consequence: '(صمت ثقيل) ...عادي. المبلغ كم؟' },
        { text: 'لا بأس، خذي وقتك. أنا هنا.', score: 55, feedback: 'جيد — يمنح المساحة لكن يتركها معلّقة بلا توجيه. قد يطول الصمت بشكل محرج.', consequence: '(شهيق) شكراً... سامحيني.' },
        { text: 'هل أنتِ بخير؟ هل تحتاجين مساعدة من نوع آخر؟', score: 35, feedback: 'نية طيبة لكنها تفتح نقاشاً لا يمكنك إكماله. تجاوز نطاق دورك وقد تُحرجها.', consequence: 'لا... أنا... بخير. آسفة.' },
        { text: 'لا تعتذري أبداً. أنا سامعتك، وما في استعجال. (صمت قصير) خذي نفس، وحين تحسّين بالراحة نكمل بهدوء — الفاتورة بنحلّها بكل الأحوال.', score: 100, feedback: 'أربع حركات: نفي الاعتذار، التأكيد الإنساني، إزالة ضغط الوقت، ضمان الحل مسبقاً.', consequence: '(تأخذ نفساً) شكراً... وأنا كنت خايفة إنكم ما تساعدونني. إيش المطلوب مني؟' }
      ],
      expert_move: 'الإنسانية المنضبطة: تمنحها ثلاثة عناصر — لا اعتذار، المساحة، وضمان الحل. لا تسأل عن حياتها الشخصية ولا تتجاهل انهيارها.',
      principle: 'مبدأ Emotional Spillover: الحاجز بين المهنية والإنسانية ليس جداراً بل باباً. الجملة «الفاتورة بنحلّها بكل الأحوال» هي المرساة التي تُبقي الحوار مهنياً دون أن تكون بارداً.'
    },

    new_scenario_02: {
      id: 'new_scenario_02', category: 'sales', title: 'بيع حل لزبون يعتقد أنه لا يملك مشكلة', difficulty: 5,
      setup: 'تتصل بمدير عمليات في شركة متوسطة لتعرض نظام أتمتة يُوفّر 40% من وقت الفريق. هو يُجيبك بكل ارتياح: «نحن نشتغل زين ونتائجنا ممتازة». لديه مشكلة لكنه لا يعرف أنها مشكلة.',
      dialogue_opener: 'شوف، أنا أقدّر اتصالك. بس نحن نشتغل زين، فريقنا محترف وما في شيء يحتاج تغيير الحين.',
      psychological_context: 'ظاهرة Unconscious Incompetence — الشخص لا يعرف ما لا يعرفه. محاولة إقناعه بوجود مشكلة مباشرة تُفسَّر كهجوم على كفاءته. الأذكى: تحريك الوعي بسؤال يجعله يكتشف التكلفة الخفية.',
      choices: [
        { text: 'النظام يوفّر 40% وقت — هذا رقم مثبت بالدراسات.', score: 10, feedback: 'الأرقام بلا سياق لا تُحرّك من لا يرى مشكلة.', consequence: 'ممتاز، بس الحين ما عندنا حاجة لهذا.' },
        { text: 'كثير من شركاتنا قالوا نفس الكلام قبل ما يجرّبوا.', score: 20, feedback: 'Social proof يُشعله بالتهديد لا بالتحفيز.', consequence: 'كل شركة وظروفها.' },
        { text: 'ما يخالف، بس سؤال واحد: كم ساعة أسبوعياً يقضي فريقك في تقارير يدوية؟', score: 70, feedback: 'سؤال التوعية جيد، لكن يفتقر للتأطير الذي يجعله يحسب التكلفة الكاملة.', consequence: 'ربما... 10-12 ساعة. بس هذا طبيعي.' },
        { text: 'والله ممتاز وهذا يدل على فريق قوي. سؤال واحد: إذا كل ساعة من وقت فريقك تساوي X ريال — وهم يقضون 12 ساعة أسبوعياً في مهام متكررة — كم تكلّفكم سنوياً مقابل خيار يُعيد تلك الساعات لمهام أعلى قيمة؟', score: 100, feedback: 'مديح صادق، تحويل الوقت إلى مال، طرح السؤال الذي يجعله يحسب بنفسه.', consequence: '... لم أفكر بهذه الطريقة. كم يكلّف النظام بالضبط؟' }
      ],
      expert_move: 'تقنية Pain Quantification: اجعله يُكلّف الوضع الحالي بنفسه. حين يحسب الرقم بيده يُصبح هو البائع لا أنت.',
      principle: 'مبدأ Unconscious Incompetence: لا يمكنك بيع حل لشخص لا يرى مشكلة — لكن يمكنك مساعدته أن يرى التكلفة الخفية لحالته الحالية.'
    },

    new_scenario_03: {
      id: 'new_scenario_03', category: 'repair', title: 'جهاز عاد من الإصلاح بمشكلة جديدة', difficulty: 5,
      setup: 'زبون أصلحت له شاشة جهازه قبل يومين. الآن عاد غاضباً ويقول الجهاز لا يتصل بـ WiFi. تقنياً: المشكلة في كابل الهوائي القريب من الشاشة — لكن إثبات السببية صعب.',
      dialogue_opener: 'الجهاز ما يتصل بالنت! قبل ما تصلحونه كان زين! أنتم خرّبتم الجهاز!',
      psychological_context: 'Hindsight Bias + Attribution Error — الزبون يُعيد كتابة الذاكرة ليُثبت السببية. الدفاع المباشر يُشعل الموقف. المطلوب: امتصاص الاتهام وفتح التحقيق.',
      choices: [
        { text: 'هذا ما له علاقة بالشاشة! الـ WiFi موضوع ثاني!', score: 0, feedback: 'دفاع تقني مباشر = إغلاق للحوار.', consequence: 'إذا ما له علاقة ليش ما كانت المشكلة قبل؟!' },
        { text: 'تعال نشوف الجهاز ونحكم.', score: 45, feedback: 'عملي لكن بارد — لم تعترف بأن تجربته محبطة.', consequence: 'حسناً... (يُعطيك الجهاز بعدم ثقة)' },
        { text: 'آسف إنك تعاني من هذا. هل كانت مشكلة الـ WiFi موجودة قبل تسليمنا؟', score: 60, feedback: 'جيد — الاعتذار يُهدئ والسؤال يفتح التحقيق. لكن الاستراتيجية الكاملة ناقصة.', consequence: 'لا والله! ما كانت أبداً!' },
        { text: 'هذا الموقف مو مريح وأنا أفهم لماذا زعلان. خلني آخذ الجهاز هسه وأفحص كابل الهوائي — وهو كابل قريب من منطقة الشاشة — وإذا تبيّن أن الإصلاح أثّر عليه، نصلحه مجاناً فوراً وبنعطيك تعويضاً. لو كانت المشكلة مسبقة سنُثبت ذلك قدامك.', score: 100, feedback: 'اعتراف عاطفي، التسمية التقنية تُثبت الكفاءة، التزام بالمجانية عند إثبات السببية، شفافية في الاحتمالين.', consequence: 'حسناً... أنا ما أبغى أكثر من حقي. تفضل الجهاز.' }
      ],
      expert_move: 'تقنية Conditional Accountability: لا تنكر ولا تعترف قبل الفحص — لكن التزم صراحةً بالمسؤولية إن ثبتت.',
      principle: 'مبدأ Hindsight Bias: حين يرى الزبون تسلسلاً زمنياً يُقرر السببية تلقائياً. يمكنك فقط إشراكه في التحقيق وجعل الفحص شفافاً.'
    },

    new_scenario_04: {
      id: 'new_scenario_04', category: 'negotiation', title: 'التفاوض مع طرف أقوى — عقد تجديد شراكة', difficulty: 5,
      setup: 'أنت تُزوّد شركة كبيرة بخدمة تقنية منذ سنتين. يطالبون بخفض السعر 30% مع توسيع النطاق. السوق فيه منافسون أرخص لكن تغيير المزوّد مُكلف — هم يعلمون وأنت تعلم.',
      dialogue_opener: 'عقدنا ينتهي الشهر القادم. نحتاج خفض السعر 30% مع إضافة خدمتين جديدتين وإلا سنبحث عن بدائل.',
      psychological_context: 'Anchoring + Switching Cost — يُرسّخون مرساة متطرفة ليُحرّكوك للوسط. لكنهم يملكون تكلفة تحوّل حقيقية تُعادل أشهراً من الفارق السعري.',
      choices: [
        { text: '30% كثير، أقدر أعطيك 10% بحد أقصى.', score: 15, feedback: 'قبلت المرساة — الآن المعركة بين 10% و30% وقد خسرت المعركة الأساسية.', consequence: '10% ما تكفي. نحن جادون في البحث عن بدائل.' },
        { text: 'أنا أفهم الضغط — لكن ما يمكنني تغيير السعر دون تغيير النطاق.', score: 30, feedback: 'منطقي لكنه دفاعي. لم تُبرز تكلفة التحوّل.', consequence: 'إذن سنضطر لتقييم البدائل.' },
        { text: 'قبل أي رقم، خلني أسألك: ما هو الجدول الزمني للتحول لمزوّد جديد إذا قررتم؟', score: 65, feedback: 'سؤال BATNA ذكي يجعلهم يفكرون في التكلفة. لكنه وحده غير كافٍ.', consequence: 'ربما 3-4 أشهر... ولماذا السؤال؟' },
        { text: 'أقدّر الشفافية. قبل الأرقام — دعونا نحسب معاً: التحوّل لمزوّد جديد يعني 3-4 أشهر تكامل، مخاطر انقطاع، وتدريب فريق. الفرق السعري سيُسترد في 8 أشهر أو يزيد. أنا مستعد لـ10% خفض مقابل عقد 3 سنوات، وخدمة واحدة الآن والثانية بعد 6 أشهر.', score: 100, feedback: 'تكلفة التحوّل كحساب لا تهديد، بديل مُهيكل، ربط الخفض بالالتزام الزمني.', consequence: 'الجدول الزمني للتكامل... لم نحسبه. ممكن تُرسل لنا تقديرك؟' }
      ],
      expert_move: 'تحويل السعر إلى مقارنة إجمالية: الفرق السعري + تكلفة التحوّل + مخاطر الانقطاع.',
      principle: 'مبدأ Switching Cost Visibility: قوتك في التفاوض مع طرف أقوى تكمن في جعل بديله مُكلَّفاً بوضوح.'
    },

    new_scenario_05: {
      id: 'new_scenario_05', category: 'callcenter', title: 'الزبون يُمثّل أمراً خطيراً ليحصل على استثناء', difficulty: 5,
      setup: 'يتصل شخص يدّعي أن الخدمة المنقطعة تُهدد حياته (مريض كبير، جهاز طبي). في السجلات لا يوجد طلب طارئة سابق. قد يكون صادقاً وقد يستغل الذريعة. الخطأ في الاتجاهين كارثي.',
      dialogue_opener: 'أنا عندي أبي مريض والجهاز الطبي يحتاج نت! لو الخدمة ما رجعت الحين ممكن يصير شي له!',
      psychological_context: 'Moral Hazard في خدمة العملاء — بعض الزبائن يُضخّمون الأضرار لاستدراج استجابة أسرع. الاستجابة المثلى: التحرّك كأنها حقيقية مع التوثيق الكامل.',
      choices: [
        { text: 'هذا يحتاج قسم الطوارئ التقنية، سأُحوّلك.', score: 30, feedback: 'الإحالة وحدها دون وعد زمني تُشعره بأنك تتخلص منه.', consequence: 'كم وقت الانتظار؟! ما عندنا وقت!' },
        { text: 'أفهم خطورة الوضع. هل الجهاز الطبي متصل بالإنترنت فعلاً أم يعمل باستقلالية؟', score: 70, feedback: 'سؤال تحقق ذكي لكنه يبدو كشك في كلامه.', consequence: 'أنا ما أعرف التفاصيل التقنية، بس الوضع خطير!' },
        { text: 'معلوماتك غير مسجّلة عندنا كحالة طارئة. ما أستطيع تجاوز الأولوية.', score: 0, feedback: 'رفض بيروقراطي في موقف إنساني محتمل.', consequence: '(يقطع الخط بغضب شديد)' },
        { text: 'أنا سامعك وهذا الموقف أولويتي الحين. رفعت حالتك لقسم الطوارئ التقنية كحالة صحية طارئة — سيتصلون خلال 15 دقيقة. وفي الأثناء، اتصل برقم الطوارئ المحلي إذا تطلّب الأمر تدخلاً فورياً. سأوثّق هذه المكالمة كاملة.', score: 100, feedback: 'التصرف كأنها حقيقية، الوعد الزمني المحدد، التحويل للجهات الأخرى، التوثيق يُردع الادعاء الكاذب ويحمي الصادق.', consequence: 'شكراً... أنا آسف لو ضغطت. أتمنى يتصلون بسرعة.' }
      ],
      expert_move: 'قاعدة Charitable Interpretation مع التوثيق: تصرّف كأن الحالة حقيقية — لكن وثّق كل شيء.',
      principle: 'مبدأ Moral Hazard الدفاعي: تكلفة الإهمال أكبر من تكلفة الاستجابة المبالغ فيها. التوثيق الشفاف يخدم كلا السيناريوين.'
    },

    new_scenario_06: {
      id: 'new_scenario_06', category: 'sales', title: 'البيع لمجموعة — كل شخص له أجندة مختلفة', difficulty: 5,
      setup: 'أنت في اجتماع عرض مع ثلاثة أشخاص: المدير المالي يريد أرقاماً، التقني يريد مواصفات، والتنفيذي لديه 10 دقائق. عرض واحد لهم جميعاً سيُرضي لا أحد.',
      dialogue_opener: 'تفضل، لكن نرجو الاختصار. (المالي: أرد أسمع الأرقام / التقني: أريد مواصفات التكامل / التنفيذي: الخلاصة في دقيقتين)',
      psychological_context: 'Multi-Stakeholder Dynamics — كل طرف لديه WIIFM مختلف. التحدث بلغة واحدة يُشعر الآخرين بأنك لا تفهمهم.',
      choices: [
        { text: 'حسناً سأشرح النظام بشكل كامل ثم نناقش.', score: 10, feedback: 'عرض خطي لجمهور متعدد الأولويات — الكل سيفقد الاهتمام.', consequence: '(التنفيذي ينظر لساعته بعد دقيقتين)' },
        { text: 'ممكن نتحدث بشكل منفصل مع كل منكم؟', score: 35, feedback: 'يُؤجّل القرار ويُضيّع الزخم.', consequence: 'ما لدينا وقت لاجتماعات إضافية.' },
        { text: 'سأبدأ بالأرقام لأننا مهتمون بالعائد أولاً.', score: 40, feedback: 'حدّدت أولوية واحدة وأهملت الآخرين.', consequence: '(التقني يتفحص هاتفه)' },
        { text: 'شكراً للوقت. سأُقدّم في ثلاث دقائق: دقيقة للخلاصة التنفيذية، دقيقة للعائد المالي، دقيقة للتكامل التقني — ثم نفتح النقاش. هل هذا مناسب؟', score: 100, feedback: 'استيعاب الوقت، تسمية كل شخص بما يهمه، الهيكل المُعلَن يُعطي إحساساً بالسيطرة.', consequence: '(التنفيذي يبتسم) هذا ممتاز. تفضل.' }
      ],
      expert_move: 'تقنية Segmented Value Proposition: حدّد متلقي كل فائدة بالاسم قبل أن تشرحها.',
      principle: 'مبدأ Multi-Stakeholder WIIFM: القرار يتخذه الشخص الأكثر تضرراً من الرفض — ليس الأعلى منصباً.'
    },

    new_scenario_07: {
      id: 'new_scenario_07', category: 'repair', title: 'جهاز عمره 7 سنوات والزبون يريد ضماناً كاملاً', difficulty: 4,
      setup: 'زبون أصرّ على إصلاح جهاز قديم بتكلفة عالية. بعد أسبوع جاء بمشكلة جديدة في قطعة أخرى غير التي أصلحتها. يطالب بضمان شامل.',
      dialogue_opener: 'دفعت عليه فلوس والجهاز ما شتغل كامل! أبغى ضمان على كل شيء أو أرجع فلوسي!',
      psychological_context: 'Scope Creep في توقعات الزبون — حين يدفع مبلغاً كبيراً يتوقع نتيجة مثالية كاملة. المشكلة الجديدة قطعة مختلفة لكنه يراها كفشل شامل.',
      choices: [
        { text: 'أخوي، أصلحنا اللي اتفقنا عليه. القطعة الثانية مشكلة مختلفة.', score: 15, feedback: 'صحيح تقنياً لكنه بارد.', consequence: 'ليش ما قلتوا إن فيه مشاكل ثانية قبل ما آخذه؟!' },
        { text: 'الجهاز كبير، هذا طبيعي تطلع مشاكل بعد.', score: 0, feedback: '«طبيعي» بعد أن أخذت فلوسه = شعور بالاستغلال.', consequence: 'طبيعي؟! طبيعي إني أدفع وما يشتغل؟!' },
        { text: 'خلني أشوف القطعة الجديدة وأعطيك سعر مخفّض.', score: 55, feedback: 'الخصم يُشعره بالإنصاف لكنه لم يُعالج توقعه بالضمان.', consequence: 'كم يكون السعر؟ بس لازم يكون مناسب.' },
        { text: 'أنت محق في توقعاتك — حين تدفع تريد جهازاً يعمل كاملاً. القطعة الأولى تعمل ممتاز كما اتفقنا — لكن الجهاز القديم لديه قطع متعددة تآكلت. كان يجب أن أُنبّهك مسبقاً — وهذا خطأي في التواصل. لذلك: سأُشخّص القطعة الجديدة مجاناً، وإذا كانت بسيطة سأُصلحها بأقل من نصف السعر.', score: 100, feedback: 'تشريع التوقع، التمييز التقني، قبول مسؤولية التواصل (خطأي)، فعل ملموس.', consequence: '... أقدّر إنك كنت تشرحلي أكثر. خلاص وين الجهاز؟' }
      ],
      expert_move: 'قبول مسؤولية التواصل لا الخطأ التقني: «كان يجب أن أُنبّهك» يُعطيه ما يريده دون أن تتنازل عمّا أنجزته.',
      principle: 'مبدأ Scope Expectation Management: الزبون لا يدفع مقابل إصلاح قطعة — يدفع مقابل جهاز يعمل. إدارة التوقع جزء من الخدمة.'
    },

    new_scenario_08: {
      id: 'new_scenario_08', category: 'negotiation', title: 'شريك يطلب الخروج من الشراكة التجارية', difficulty: 5,
      setup: 'شريكك منذ 3 سنوات قرّر الخروج. يطلب تقييم الحصة بسعر السوق الحالي. أنت لا تملك السيولة فوراً. العلاقة الشخصية مهمة لكليكما.',
      dialogue_opener: 'قررت أتفرغ لمشروع جديد. أقدّر كل شيء، بس أحتاج قيمة حصتي كاملة وفق تقييم السوق.',
      psychological_context: 'المفاوضة بين طرفين يقدّران العلاقة أصعب من مفاوضة غرباء — أي «هجوم» يُلحق ضرراً بالصداقة.',
      choices: [
        { text: 'ما أقدر أدفع الحين، تأجّل أو اقبل سعراً أقل.', score: 5, feedback: 'رفض مباشر بلا بديل يُدمر العلاقة.', consequence: 'إذن سنلجأ للتحكيم.' },
        { text: 'أنا أفهم قرارك. خلينا نستعين بمقيّم مستقل.', score: 45, feedback: 'عادل لكنه بطيء ومكلف ولا يحلّ مشكلة السيولة.', consequence: 'الفكرة معقولة. متى يستغرق ذلك؟' },
        { text: 'أقدّر قرارك. خلينا نتفق على دفع الحصة على ثلاث دفعات خلال سنة.', score: 65, feedback: 'الحل العملي جيد لكنه لم يناقش العدالة في التقييم.', consequence: 'الدفعات ممكنة لكن السعر يجب أن يكون سعر السوق.' },
        { text: 'أنا أحترم قرارك وأريد أن تحصل على قيمة عادلة. بس بصدق: سعر السوق يعكس نجاح بنيناه معاً، وأنا سأحمل عبء المرحلة القادمة وحدي. مقترحي: 60% فوراً + 40% مرتبطة بالأرباح خلال السنتين القادمتين. لو المشروع نجح ستأخذ أكثر من سعر السوق الحالي.', score: 100, feedback: 'احترام القرار، حجة الأثر المستقبلي، هيكل Earn-out، تحويل الخروج لشراكة مستمرة في الأرباح.', consequence: 'الـ Earn-out... ما فكّرت فيه. أرسل لي الأرقام.' }
      ],
      expert_move: 'هيكل Earn-out: ربط جزء من الدفع بالأرباح يحلّ السيولة ويُبقي المصالح متوازية.',
      principle: 'مبدأ Deferred Equity: الخروج الحاد يُحوّله لمعاملة باردة. الجزء المشترك يحافظ على الصداقة ويحلّ السيولة معاً.'
    },

    new_scenario_09: {
      id: 'new_scenario_09', category: 'callcenter', title: 'كيف تُصلح خطأ سابقاً من فريقك', difficulty: 4,
      setup: 'زبون يتصل لأن موظفاً آخر وعده بشيء لم يُسجَّل. الزبون يملك وعداً شفهياً والسجلات تقول غير ذلك. الموظف وعد غير رسمياً وغادر الشركة.',
      dialogue_opener: 'قالوا لي المرة الفايتة إن لي خصم دائم 15% — وهسه ما يظهر في فاتورتي!',
      psychological_context: 'Institutional Trust Failure — الإنكار يُشعره بالاتهام. القبول الكامل يُشجّع على ادعاءات مستقبلية. المطلوب: الوسط الذي يُصلح الخطأ بحدود واضحة.',
      choices: [
        { text: 'ما عندنا أي تسجيل لهذا الوعد. ما أقدر أعمل شيء.', score: 0, feedback: 'قلت له ضمنياً أنه يكذب.', consequence: 'إذن أنتم متلاعبون! سأشكو رسمياً!' },
        { text: 'سأرفع الموضوع للإدارة وسيتواصلون معك.', score: 25, feedback: 'تأجيل بلا وعد زمني = تجاهل بأسلوب مهذب.', consequence: 'هذا ما قالوه المرة الأولى أيضاً.' },
        { text: 'أنا آسف — يبدو إن في سوء تواصل. سأُعطيك الخصم هذه المرة استثناءً.', score: 55, feedback: 'يحلّ المشكلة الآنية لكنه يفتح باباً للادعاءات المستقبلية.', consequence: 'وفي المرات القادمة؟ أبغى يكون دائماً.' },
        { text: 'شكراً لإبلاغي. ما عندي تسجيل للوعد لكن هذا لا يعني أنه لم يحدث — الموظف غادر ولم يُوثّق الاتفاقيات. هذا خطأ في التوثيق لدينا وليس فيك. سأُطبّق الخصم لدورتين قادمتين إصلاحاً، وأُسجّل ملاحظة في ملفك. للمستقبل أي وعد لازم برقم مرجعي — وأنا سأُعطيك مرجعاً لهذه المكالمة الآن.', score: 100, feedback: 'تحميل المسؤولية للنظام لا الزبون، خصم محدود (دورتان)، توثيق فوري، تعليم الزبون لحماية نفسه.', consequence: 'شكراً. هذا المنطقي. رقم المرجع هو؟' }
      ],
      expert_move: 'قاعدة Process Accountability: أصلح بوضوح محدد (دورتان ليس «دائماً»). الحدود تحمي الشركة دون إهانة الزبون.',
      principle: 'مبدأ الإصلاح المحدود: الخطأ المؤسسي يستحق اعترافاً — لكن المعالجة يجب محدودة النطاق والزمن.'
    },

    new_scenario_10: {
      id: 'new_scenario_10', category: 'sales', title: 'العميل يقارن خدمتك بأداة AI مجانية', difficulty: 4,
      setup: 'تبيع خدمة استشارية. العميل استخدم ChatGPT وحصل على «نفس النتيجة» مجاناً. لا يفهم الفارق الحقيقي.',
      dialogue_opener: 'والله استخدمت الـ AI وعطاني خطة تسويقية كاملة مجاناً. ليش أدفع لك آلاف على نفس الشيء؟',
      psychological_context: 'Availability Heuristic — العميل يرى الشكل (خطة) ويعتقد أنه المضمون. الـ AI يُنتج نصاً لكنه لا يحمل مسؤولية النتائج.',
      choices: [
        { text: 'الـ AI يُنتج كلاماً عاماً — عملي مختلف ومُخصَّص.', score: 20, feedback: 'يبدو تبريراً. العميل يحتاج دليلاً لا تأكيداً.', consequence: 'كيف أعرف؟ الخطة بدت مخصصة.' },
        { text: 'الـ AI يُخطئ كثيراً في البيانات الدقيقة.', score: 25, feedback: 'يبعدك عن النقطة الحقيقية — الفرق ليس في الدقة بل في المسؤولية.', consequence: 'بس الخطة بدت منطقية لي.' },
        { text: 'جرّب الخطة اللي أعطاك إياها وأخبرني بالنتائج.', score: 40, feedback: 'مغامرة — إذا نجحت خسرت.', consequence: 'فعلاً... سأجرّب وأعود.' },
        { text: 'سؤال واحد: الـ AI — هل يتحمل مسؤولية النتائج إذا فشلت؟ هل يعرف تاريخ شركتك ومنافسيك المحليين؟ أنا لا أبيعك خطة — أبيعك حكماً مبنياً على سنوات في سوقك، ومسؤولية شخصية إذا لم تتحقق النتائج.', score: 100, feedback: 'سؤال المسؤولية يكشف الفجوة، المعرفة التخصصية، إعادة تعريف البيع.', consequence: 'هذا... نقطة جيدة. لا يوجد أحد يتحمل معي المسؤولية فعلاً.' }
      ],
      expert_move: 'إعادة تعريف المنتج: أنت لا تبيع «وثيقة» — تبيع «مسؤولية مشتركة».',
      principle: 'مبدأ Accountability Premium: الفارق بين الخبير والأداة ليس الجودة — بل المسؤولية.'
    },

    new_scenario_11: {
      id: 'new_scenario_11', category: 'repair', title: 'الإصلاح قد يُتلف الجهاز كلياً', difficulty: 5,
      setup: 'جهاز فيه مشكلة في اللوحة الأم. احتمال نجاح الإصلاح 60%. في حالة الفشل سيُتلف الجهاز نهائياً. الزبون لا يعرف هذا المنطق الاحتمالي.',
      dialogue_opener: 'وش اللي تحتاج تصلح فيه؟ وكم يكلّف؟',
      psychological_context: 'Risk Communication — إخفاء المخاطرة ثم الفشل = خيانة. الشفافية الكاملة هي الأخلاق والمهنية معاً.',
      choices: [
        { text: 'الإصلاح يكلّف X وبنشوف النتيجة.', score: 0, feedback: 'أخفيت المخاطرة الجوهرية.', consequence: '(بعد الفشل) أنتم خرّبتم جهازي!' },
        { text: 'الإصلاح صعب وما أضمن النتيجة.', score: 35, feedback: 'مبهم — يُثير قلقاً دون تحديد المخاطرة.', consequence: 'يعني شو؟ بيشتغل أو لا؟' },
        { text: 'هذا إصلاح بنسبة نجاح عالية، دعنا نجرّب.', score: 10, feedback: '60% ليست «نسبة عالية» — هذا تحريف.', consequence: '(بعد الفشل) قلت نسبة عالية!' },
        { text: 'أريد أن أكون صادقاً: المشكلة في اللوحة الأم. الإصلاح ممكن لكن احتمال نجاحه 60% — وإذا فشل سيُتلف الجهاز نهائياً. الجهاز بدون إصلاح قيمته X، ومع نجاح الإصلاح قيمته Y. القرار قرارك — وأنا سأشرح كل الخيارات.', score: 100, feedback: 'الصدق الكامل، التأطير المالي، إعطاء السيطرة للزبون.', consequence: '... شكراً على الصدق. قيمته بدون إصلاح كم بالضبط؟' }
      ],
      expert_move: 'قاعدة Informed Consent: الشفافية في المخاطر تبني ثقة أقوى من إخفائها.',
      principle: 'مبدأ Risk-Adjusted Value: قدّم المخاطرة مع القيمة المتوقعة — لا تُفرّدها.'
    },

    new_scenario_12: {
      id: 'new_scenario_12', category: 'negotiation', title: 'طلب زيادة راتب بعد مشروع فاشل', difficulty: 5,
      setup: 'قضيت 6 أشهر في مشروع انتهى دون التوقعات. مقتنع أن مساهمتك كانت عالية الجودة والفشل بسبب عوامل خارجية. الآن تريد زيادة راتب.',
      dialogue_opener: 'أهلاً، ما الموضوع؟ (مديرك في حالة دفاعية من المشروع)',
      psychological_context: 'Outcome Bias — المدير يربط «المشروع فشل = أداؤك ضعيف». مهمتك: الفصل بين جودة الأداء ونتيجة الظروف.',
      choices: [
        { text: 'أنا أعلم المشروع ما نجح بس ذلك لم يكن بسبب عملي.', score: 15, feedback: 'دفاعي من البداية — يجعل المدير يدافع عن موقفه.', consequence: 'الشركة تقيس النتائج لا الجهد.' },
        { text: 'خلال الـ 6 أشهر أنجزت [إنجازات] حتى في ظل التحديات. هل يمكنني مشاركتك تقييمي الذاتي؟', score: 65, feedback: 'جيد لكنه يبدأ بالإنجازات دون الاعتراف بالفيل في الغرفة.', consequence: 'تفضل... (متردد)' },
        { text: 'أفهم أن المشروع لم يُحقق أهدافه — وهذا مهم لي أيضاً. التحليل: [سبب خارجي 1 + 2] أثّرا على النتيجة. وفي هذه الظروف أنجزت [A، B، C]. تقييمي لأدائي — لا للمشروع — ناجح. هل يمكنني مشاركتك الأدلة؟', score: 100, feedback: 'الاعتراف بالفشل أولاً (يُزيل الدفاعية)، تحليل سببي خارجي، فصل الأداء عن النتيجة، الأدلة، طلب الإذن.', consequence: '... هذا التحليل مثير. أرني الأدلة.' },
        { text: 'الظروف كانت صعبة وأعتقد أنني تعاملت معها بشكل جيد. أحتاج زيادة.', score: 5, feedback: 'مباشر بمبرر ضعيف.', consequence: 'الآن ليس الوقت المناسب للحديث عن الزيادات.' }
      ],
      expert_move: 'اعترف بالفشل الجماعي أولاً، ثم قدّم أدلة على جودة أدائك الفردي.',
      principle: 'مبدأ Outcome Bias المضاد: لا تُدافع عن المشروع — دافع عن أدائك بمعطيات.'
    },

    new_scenario_13: {
      id: 'new_scenario_13', category: 'callcenter', title: 'زبون يُهدد بالتقاضي', difficulty: 5,
      setup: 'زبون يدّعي أن فاتورة خاطئة جعلته يفوت دفعة وتكبّد 500 ريال غرامة. يهدد بمحامٍ ودعوى خلال 48 ساعة. ليس لديك صلاحية قبول أي مسؤولية قانونية.',
      dialogue_opener: 'فاتورتكم الخاطئة جعلتني أفوّت دفعة وتكبّدت 500 ريال غرامة. لديّ محامٍ وسأرفع دعوى خلال 48 ساعة.',
      psychological_context: 'Legal Threat as Pressure Tactic — معظم التهديدات في مبالغ صغيرة لا تُنفَّذ. الاعتراف بالمسؤولية ممنوع. المطلوب: تعاطف + تحقيق + إحالة — دون قبول أي مسؤولية.',
      choices: [
        { text: 'الدعوى القضائية حقك. اتصل بقسم الشؤون القانونية.', score: 20, feedback: 'يُصعّد بدل أن يُهدئ.', consequence: 'هذا يعني أنكم لا تكترثون! سأزيد المطالبة.' },
        { text: 'أنا آسف على ما حدث — سنُعيد لك الـ 500 ريال.', score: 0, feedback: 'قبلت مسؤولية بدون تحقيق وبدون صلاحية.', consequence: 'ولا يكفي — عندي خسائر أخرى أيضاً.' },
        { text: 'ما نستطيع الاعتراف بأي مسؤولية بدون تحقيق.', score: 30, feedback: 'صحيح قانونياً لكن بارد.', consequence: 'إذن أراكم في المحكمة.' },
        { text: 'أنا أسمعك وما تصفه موضوع جاد وأتعامل معه كذلك. لن أقبل أو أرفض مسؤولية الآن — هذا يحتاج تحقيقاً. سأرفع الحالة لقسم الفواتير والقانوني برقم الحالة، وسيتواصلون معك خلال 24 ساعة. كل ما تقوله موثّق. هل توافق على هذا المسار؟', score: 100, feedback: 'الاعتراف بالجدية دون قبول المسؤولية، الفعل الفوري، الوعد الزمني، التوثيق يُثبّط المبالغة.', consequence: '... 24 ساعة. حسناً. رقم الحالة؟' }
      ],
      expert_move: 'قاعدة Legal Firewall: حوّل المكالمة إلى إجراء رسمي بأسرع وقت مع رقم مرجعي.',
      principle: 'مبدأ Escalation Without Admission: الفصل بين التعاطف وقبول المسؤولية هو مهارة قانونية ومهنية.'
    },

    new_scenario_14: {
      id: 'new_scenario_14', category: 'sales', title: 'العميل يطلب مراجع لا نهاية لها', difficulty: 3,
      setup: 'عميل طلب 5 مراجع، ثم 5 أخرى، ثم مقابلة المراجع. الآن يطلب زيارة ميدانية. هذا ليس فضولاً — هو خوف من القرار مُقنَّع بالبحث.',
      dialogue_opener: 'شكراً للمراجع. بس أحتاج زيارة ميدانية لأحد عملائك القدامى قبل أي قرار.',
      psychological_context: 'Analysis Paralysis مُقنَّع بالمنطق — الطلبات المتصاعدة أعراض لخوف القرار. إعطاؤه معلومات أكثر يُغذّي الدورة لا يكسرها.',
      choices: [
        { text: 'بالتأكيد، سأُرتّب زيارة ميدانية.', score: 10, feedback: 'تُغذّي دورة الجمع اللانهائي. بعد الزيارة سيطلب شيئاً آخر.', consequence: 'ممتاز. وبعد الزيارة أحتاج تقريراً عن الـ ROI...' },
        { text: 'عندنا 20 مرجعاً. كم تحتاج بالضبط؟', score: 25, feedback: 'يُظهر الإحباط ولا يحلّ المشكلة.', consequence: 'أنا فقط أريد التأكد...' },
        { text: 'أفهم أنك تريد التأكد. ماذا تحتاج أن يقوله العميل في الزيارة لتتخذ قرارك؟', score: 75, feedback: 'سؤال كشف ذكي — لكنه يحتاج متابعة أقوى.', consequence: 'أريد أن أرى كيف طبّقوا النظام.' },
        { text: 'أُقدّر جديتك. بصدق: في تجربتي، الطلبات المتصاعدة غالباً لا تُحلّ مشكلة معلومات — بل قلق أعمق من القرار. وهذا طبيعي. سؤال واحد: ما الشيء الواحد — لو كنت متأكداً منه — الذي سيجعلك تقرر اليوم؟', score: 100, feedback: 'تسمية السلوك برفق، تطبيعه، سؤال واحد لاستخراج الشرط الحقيقي، ضغط لطيف بـ«اليوم».', consequence: '... في الحقيقة أنا قلق من رد فعل مديري على الميزانية.' }
      ],
      expert_move: 'تقنية Real Objection Mining: الاعتراض الحقيقي ليس في المعلومات — هو مدفون أعمق.',
      principle: 'مبدأ Information Feeding Loop: كل مرجع إضافي لشخص يعاني من Analysis Paralysis يزيد تأخيره.'
    },

    new_scenario_15: {
      id: 'new_scenario_15', category: 'callcenter', title: 'الزبون يشكو من موظف آخر بالاسم', difficulty: 4,
      setup: 'زبون يشكو من زميلك بالاسم ويصفه بأوصاف سلبية. يطلب منك التأكيد على سوء تصرفه.',
      dialogue_opener: 'موظفكم فلان تصرّف معي بشكل غير محترم. أريد أن تُقرّ بأنه كان مخطئاً وأن تشكوه.',
      psychological_context: 'Triangulation Trap — يريدك طرفاً في صراعه مع زميلك. أي تأكيد على سلوك زميلك سيُستخدم ضده. الإنكار الكامل يُشعل الزبون.',
      choices: [
        { text: 'فلان موظف ممتاز، لا أعتقد أنه فعل ذلك.', score: 0, feedback: 'دافعت عن شخص غائب — أهنت الزبون ضمنياً.', consequence: 'إذن أنتم تتغطون على بعض!' },
        { text: 'سأرفع شكواك للإدارة.', score: 40, feedback: 'عملي لكن بارد. لم تعترف بتجربته.', consequence: 'قالوا لي هذا في كل مرة ولم يتغير شيء.' },
        { text: 'والله فلان كان يمكن يكون مخطئاً في هذا الموقف.', score: 0, feedback: 'تحكّمت في غياب آخر — ظلم مُضاعف.', consequence: 'إذن أقرّ بأنه أساء؟ أريد تعويضاً!' },
        { text: 'أنا أسمعك وأُدرك أن تجربتك لم تكن جيدة. لن أُقيّم موظفاً لم أكن شاهداً — لأن هذا لن يكون عدلاً لا لك ولا له. ما أستطيع: توثيق ملاحظتك بالتفصيل ورفعها للجهة المختصة، وأُعطيك رقماً للمتابعة. هل يمكنك وصف ما حدث؟', score: 100, feedback: 'الاعتراف بالتجربة لا بالفعل، رفض التقييم الغيابي مع مبرر (عدل)، فعل ملموس (توثيق + رقم).', consequence: '... حسناً. هذا يبدو عادلاً. إليك ما حدث.' }
      ],
      expert_move: 'قاعدة Absent Party Protection: لا تُقيّم زميلاً غائباً — لا إيجاباً ولا سلباً.',
      principle: 'مبدأ Triangulation Immunity: حين يضعك زبون موقع «القاضي» بين طرفين — ارفض المنصب بأدب.'
    },

    new_scenario_16: {
      id: 'new_scenario_16', category: 'negotiation', title: 'تفاوض مع مورد يملك احتكاراً جزئياً', difficulty: 5,
      setup: 'تحتاج قطعة نادرة. مورد واحد فقط محلياً يملكها. أعطاك سعراً مضاعفاً. إذا لم تحصل عليها خلال يومين ستخسر عميلك.',
      dialogue_opener: 'هذا السعر نهائي — القطعة نادرة وأنا الوحيد اللي عنده إياها. خذ أو اترك.',
      psychological_context: 'Monopoly Leverage — قوة المورد ظاهرياً كاملة. لكن أي احتكار له نقاط ضعف: البديل، الوقت، والعلاقة المستقبلية.',
      choices: [
        { text: 'هذا السعر غير عادل وأنا لن أقبله.', score: 5, feedback: 'رفض بلا بديل.', consequence: 'كما يحلو لك. سأبيعها لشخص آخر.' },
        { text: 'إذا خفضت السعر بـ20% سنشتري منك دائماً.', score: 45, feedback: 'وعد بعلاقة مستقبلية — صحيح الاتجاه. لكن 20% عشوائي.', consequence: 'ما أعرف إذا هذا يكفي.' },
        { text: 'أنا سأبحث عن مستورد خارجي — سيأخذ 5 أيام.', score: 65, feedback: 'BATNA حقيقي يُغيّر الميزان — لكن فقط إذا كان صادقاً.', consequence: 'خمسة أيام كثيرة على عميلك. بالتوفيق.' },
        { text: 'أنا أحترم وضعك. خلني أكون صريحاً: عندي بديل خارجي بـ5 أيام مكلف بالشحن لكنه موجود. بنفس الوقت أتعامل مع 30 جهازاً شهرياً. لو اتفقنا الحين — يصير عندك عميل ثابت بـ10-15 قطعة شهرياً. لو ما اتفقنا — سأُطوّر خط استيراد خاص ونخسر كلانا هذه الفرصة.', score: 100, feedback: 'BATNA موثوق، عائد مستقبلي بأرقام (10-15 شهرياً)، خسارة مشتركة كضغط.', consequence: '... 10-15 شهرياً؟ خلنا نتحدث عن سعر الجملة.' }
      ],
      expert_move: 'تحويل المعركة من سعر واحد إلى علاقة حجم.',
      principle: 'مبدأ Volume Leverage: قوتك ليست في السعر — بل في الحجم المستقبلي.'
    },

    new_scenario_17: {
      id: 'new_scenario_17', category: 'repair', title: 'تشخيص خاطئ — اكتشفت الخطأ بعد الاتفاق', difficulty: 5,
      setup: 'أعطيت زبوناً تقديراً بـ 150,000 دج. بعد فتح الجهاز التكلفة الحقيقية 280,000 دج. الزبون وافق وانتظر. يجب أن تُخبره الآن.',
      dialogue_opener: '(أنت تتصل بالزبون لإبلاغه)',
      psychological_context: 'Contract Modification Crisis — الزبون بنى توقعاته على رقم محدد. الإبلاغ بزيادة 87% سيُشعله بالخداع. كيفية الإبلاغ أهم من الإبلاغ نفسه.',
      choices: [
        { text: 'أخوي، في مشكلة إضافية والسعر صار 280,000.', score: 10, feedback: 'مباشر بلا تمهيد. الصدمة تُثير رد فعل عدواني.', consequence: 'كيف؟! اتفقنا على 150! هذا احتيال!' },
        { text: 'اكتشفنا مشكلة إضافية — لكن يمكنك رفض الإصلاح وأعيد لك الجهاز.', score: 45, feedback: 'منصف ويُعطيه خياراً لكنه بارد.', consequence: 'أريد أن أعرف المشكلة أولاً.' },
        { text: 'أعلم أن هذا غير متوقع وأنا آسف. السعر صار 280.', score: 35, feedback: 'الاعتذار قبل التفسير. سيسأل «لماذا لم تعرف من البداية؟»', consequence: 'ليش ما قلت من أول؟' },
        { text: 'أتصل لأكون شفافاً معك تماماً قبل أي خطوة. حين فتحنا الجهاز اكتشفنا مشكلة إضافية لم تكن مرئية من الخارج — وهذا يحدث أحياناً. التكلفة صارت 280,000. عندك ثلاثة خيارات: نكمل الكامل بـ280، أو نُصلح الأولى فقط بـ150 وتعرف أن الثانية موجودة، أو أُعيد لك الجهاز مجاناً. القرار قرارك.', score: 100, feedback: 'الشفافية في السبب، التطبيع (يحدث أحياناً)، ثلاثة خيارات، خيار الإعادة يُثبت النزاهة.', consequence: '... أقدّر صدقك. خلني أفكر في الثلاثة خيارات.' }
      ],
      expert_move: 'قاعدة Option Sandwich: حين تُبلّغ بزيادة سعر، قدّم ثلاثة خيارات تشمل الانسحاب المجاني.',
      principle: 'مبدأ Transparent Re-pricing: التسعير المتغير ليس خيانة — إخفاؤه خيانة.'
    },

    // ─── دفعة 2 من 2 : السيناريوهات الجديدة 18-35 ───
    new_scenario_18: {
      id: 'new_scenario_18', category: 'sales', title: 'العميل يريد كل شيء مجاناً تحت مسمى «تجربة»', difficulty: 4,
      setup: 'عميل واعد يطلب تجربة مجانية مفتوحة المدة لكل الميزات — ثم سيقرر. هذا يعني أنه سيحصل على كل قيمة المنتج مجاناً وسيُؤجّل القرار إلى الأبد.',
      dialogue_opener: 'بدنا نجرّب كل الميزات قبل ما نتخذ قرار — بدون قيود. بعدين نحكم ونتصل بكم.',
      psychological_context: 'Infinite Trial Trap — التجربة المفتوحة تُزيل urgency وتجعل «التجربة» هي المنتج. التجارب المحددة الزمن تُنتج معدلات تحوّل أعلى لأنها تُجبر على تقييم حقيقي.',
      choices: [
        { text: 'بالتأكيد، التجربة المجانية الكاملة متاحة.', score: 0, feedback: 'أعطيت المنتج مجاناً بلا التزام. نادراً ما يعودون.', consequence: '(لا يتصلون أبداً)' },
        { text: 'تجربتنا محدودة بـ 14 يوماً فقط.', score: 35, feedback: 'حدٌّ زمني جيد لكن لم تُبرر السبب ولم تُدر التجربة.', consequence: 'لن يكفينا 14 يوماً لتقييم كل شيء.' },
        { text: 'التجربة المفتوحة غير ممكنة — هذا سياستنا.', score: 10, feedback: 'بيروقراطي. لم تُقدم بديلاً يخدم حاجته الحقيقية.', consequence: 'إذن أبحث عن منافس يُعطيني تجربة.' },
        { text: 'أفهم طلبك. بس تجربتي: التجارب المفتوحة لا تُنتج قرارات جيدة — لا يوجد ضغط تقييم حقيقي. ما أُقترحه: نُحدد معاً 3 سيناريوهات حقيقية من عملكم تختبرون عليها النظام خلال 21 يوماً — وفي نهايتها نجلس ونُقيّم. ستحصلون على تجربة حقيقية مُوجّهة.', score: 100, feedback: 'تشريع منطق التقييم، تحويل التجربة لمُهيكلة (سيناريوهات)، حد زمني (21 يوماً)، اجتماع تقييم نهائي.', consequence: 'هذا... منطقي فعلاً. أرسل لنا الاقتراح.' }
      ],
      expert_move: 'تحويل التجربة الحرة إلى تجربة مُهيكلة: اطلب من العميل تحديد سيناريوهات اختبار حقيقية.',
      principle: 'مبدأ Structured Proof of Concept: التجربة المفتوحة تُفسد القرار لأنها تُلغي urgency. التجربة المُهيكلة تُنتج قراراً وتبني ثقة في آنٍ واحد.'
    },

    new_scenario_19: {
      id: 'new_scenario_19', category: 'callcenter', title: 'زبون يُهدد بنشر تسجيل المكالمة', difficulty: 5,
      setup: 'زبون يُخبرك أنه يُسجّل المكالمة ويهدد بنشرها على وسائل التواصل إذا لم يحصل على ما يريد. طلبه خارج الصلاحيات لكن ليس مستحيلاً إدارياً.',
      dialogue_opener: 'أنا مسجّل هذه المكالمة كاملة. وإذا ما حليتم مشكلتي الحين — راح أنشرها على كل وسائل التواصل.',
      psychological_context: 'Recording Threat Reversal — التسجيل يحمي الشركة إذا تصرّفت صح. من يُهدد بالتسجيل يتوقع أنك ستخاف وتُقدّم تنازلات. الرد الذكي يُقلب هذا التوقع.',
      choices: [
        { text: 'لا يحق لك تسجيل المكالمة بدون إذن.', score: 5, feedback: 'دفاعي وغير صحيح قانونياً في كثير من الدول.', consequence: 'أنا في حقي والقانون معي!' },
        { text: 'حسناً، خلني أرى ما أقدر أعمله لك.', score: 30, feedback: 'تنازل بسبب الخوف — بالضبط ما أراد تحقيقه.', consequence: '(يُدرك أن التهديد نجح وسيُكرّره)' },
        { text: 'بكل سرور — نحن أيضاً نُسجّل المكالمة لضمان الجودة.', score: 65, feedback: 'تُعادل التهديد وتُزيل الخوف. لكنه يفتقر لمسار الحل.', consequence: 'إذن ستُثبت التسجيلان كيف تُعاملون زبائنكم.' },
        { text: 'أنا أرحّب بالتسجيل — نحن أيضاً نُسجّل لضمان الجودة وأُعطيك رقماً مرجعياً الآن. أريدك أن تتأكد أن كل ما أقوله موثّق. دعني أفهم مشكلتك — لأنني أريد أن يُسجَّل أنني بذلت كل جهد للحل.', score: 100, feedback: 'قبول التسجيل كحليف، التسجيل المتبادل يُلغي الميزة، رقم مرجعي يُعزز الرسمية، الاستعداد للحل يجعل التسجيل في صالحك.', consequence: '... حسناً. المشكلة هي أن فاتورتي...' }
      ],
      expert_move: 'تقنية Recording Judo: قبول التسجيل علنياً يُقلب السلاح ضد صاحبه.',
      principle: 'مبدأ Transparency Armor: من يتصرف بنزاهة لا يخشى التوثيق — بل يطلبه.'
    },

    new_scenario_20: {
      id: 'new_scenario_20', category: 'repair', title: 'زبون يطلب إصلاح في نفس اليوم وهو مستحيل', difficulty: 4,
      setup: 'زبون يحتاج جهازه غداً لعرض مهم. الإصلاح يستغرق 3-5 أيام (قطعة من خارج المدينة). لا يوجد حل تقني سريع. لكن له حاجة حقيقية.',
      dialogue_opener: 'لازم الجهاز غداً — عندي عرض مهم. شو تقدر تسوي؟',
      psychological_context: 'Urgent vs Important — الزبون لا يريد معجزة — يريد حلاً لمشكلة الغد. المشكلة ليست الجهاز — هي تقديم العرض.',
      choices: [
        { text: 'مستحيل — القطعة ما عندنا.', score: 5, feedback: 'إغلاق كامل. لم تسأل عن حاجته الحقيقية.', consequence: 'إذن محتاج أروح مكان ثاني.' },
        { text: 'سأحاول أُسرّع الطلب، بس ما أضمن.', score: 30, feedback: 'أمل كاذب يُطيل معاناته لو فشل.', consequence: 'بس إذا ما وصل بكرة؟' },
        { text: 'الإصلاح يحتاج 3-5 أيام. لكن سؤال: ماذا تحتاج الجهاز بالتحديد لغداً؟ عرض؟ بيانات؟ تواصل؟', score: 100, feedback: 'ذهب للمشكلة الحقيقية — يفتح بابين: جهاز بديل أو استخراج البيانات.', consequence: 'عرض PowerPoint وبيانات مهمة.' },
        { text: 'الإصلاح الكامل يحتاج وقتاً. بس خلني أحاول أصلحه مؤقتاً يشتغل لغداً فقط.', score: 50, feedback: 'حل إبداعي إذا كان ممكناً — لكن قد يُتلف الجهاز. يجب أن يكون خياراً لا وعداً.', consequence: 'إذا يشتغل غداً فقط يكفي.' }
      ],
      expert_move: 'تقنية Problem Beneath the Problem: الزبون يطلب «إصلاح الجهاز» لكن حاجته «إنجاز شيء غداً».',
      principle: 'مبدأ Needs vs Solutions: الحاجة الحقيقية دائماً قابلة للحل بطرق متعددة.'
    },

    new_scenario_21: {
      id: 'new_scenario_21', category: 'negotiation', title: 'رفض عرض عمل مع الحفاظ على الباب مفتوحاً', difficulty: 3,
      setup: 'شركة مرموقة عرضت وظيفة لكن الراتب أقل بـ25% مما تتوقع. ليس لديك عرض آخر لكنك مقتنع بأن قيمتك في السوق أعلى.',
      dialogue_opener: 'وصلك العرض — ما قرارك؟',
      psychological_context: 'Anchoring في عروض العمل — القبول الأول يُحدد المرجعية السعرية لسنوات. الرفض الكامل يُغلق فرصة مستقبلية.',
      choices: [
        { text: 'العرض مناسب وأقبله.', score: 5, feedback: 'قبول السعر الأول يُرسّخ مرجعية أقل من قيمتك.', consequence: 'ممتاز، سنُرسل العقد.' },
        { text: 'هذا أقل مما أتوقع. لا أستطيع القبول.', score: 30, feedback: 'رفض بلا مسار بديل. الباب أُغلق تماماً.', consequence: 'نأسف على ذلك.' },
        { text: 'أنا مهتم بالدور والشركة جداً. بحثي في السوق يُشير إلى أن هذا المستوى يتراوح بين X وY. هل هناك مرونة للوصول إلى [رقم محدد]؟', score: 100, feedback: 'الاهتمام الصادق بالشركة، مرجعية سوقية لا جشع شخصي، رقم محدد، سؤال مفتوح يمنحهم مجالاً.', consequence: 'لدينا بعض المرونة — ما الرقم الذي تقترحه بالتحديد؟' },
        { text: 'العرض مغرٍ لكن أحتاج التفكير.', score: 20, feedback: 'تأجيل بلا مضمون — يُضيّع الزخم.', consequence: 'خذ أسبوعاً وأخبرنا.' }
      ],
      expert_move: 'تقنية Market-Anchored Counter-offer: اذكر نطاق السوق أولاً، ثم اقترح رقماً. البيانات تُفاوض بدلاً عنك.',
      principle: 'مبدأ Anchor Neutralization: «السوق يُقيّم هذا الدور بـ X» أقوى من «أنا أريد X».'
    },

    new_scenario_22: {
      id: 'new_scenario_22', category: 'callcenter', title: 'مكالمة لحساب شخص آخر بدون تفويض', difficulty: 4,
      setup: 'شخص يتصل عن حساب شخص آخر (أب كبير السن). سياسة الخصوصية تمنع مشاركة أي معلومات لغير صاحب الحساب. السياسة موجودة لحماية الزبون نفسه.',
      dialogue_opener: 'أنا أتصل بالنيابة عن أبي — هو كبير السن وما يعرف يشغّل الهاتف. أريد أعرف وضع حسابه.',
      psychological_context: 'Privacy vs Empathy Tension — البشر يتعاطفون مع مبرر العجز، لكن السياسة تحمي الزبون من إساءة الاستخدام حتى من المقرّبين.',
      choices: [
        { text: 'آسف، سياسة الخصوصية تمنع ذلك.', score: 20, feedback: 'صحيح لكن بارد ولا يُقدّم مساراً بديلاً.', consequence: 'إذن كيف أساعد أبي؟!' },
        { text: 'بما أن الوضع استثنائي — سأُعطيك المعلومات.', score: 0, feedback: 'انتهاك صريح للخصوصية — المبررات الإنسانية لا تُلغي الحماية.', consequence: '(مخاطرة قانونية)' },
        { text: 'ممكن تُعطيني أبوك على الخط للتحقق منه؟', score: 55, feedback: 'عملي وشرعي إذا كان ممكناً. لكن يفترض أنه لا يقدر يتكلم.', consequence: 'هو ما يقدر يتكلم، قلت لك!' },
        { text: 'أفهم الوضع وأُقدّر حرصك. لا أستطيع مشاركة معلومات الحساب لحمايته — حتى معك — لأن هذه السياسة تحميه هو أولاً. لكن هناك مسار رسمي للتفويض يمكن إتمامه خلال [وقت]، أو تصطحبه لأقرب فرع مع هويتكما. هل أحد الخيارين مناسب؟', score: 100, feedback: 'تأطير السياسة كحماية لا عقبة، تقديم مسارين شرعيين، احترام الظرف الإنساني.', consequence: 'الفرع ممكن الأسبوع القادم. ما هو العنوان الأقرب؟' }
      ],
      expert_move: 'إعادة تأطير السياسة: بدل «السياسة تمنع» قل «السياسة تحمي أبيك».',
      principle: 'مبدأ Policy as Protection: حين تُفسّر السياسة كحماية وتُقدّم مساراً بديلاً، تُحوّل الرفض إلى مساعدة.'
    },

    new_scenario_23: {
      id: 'new_scenario_23', category: 'sales', title: 'العميل يعود بعد رحيله لمنافس', difficulty: 4,
      setup: 'عميل قديم تركك قبل 8 أشهر للمنافس. الآن يعود ويطلب عرضاً جديداً. الغرور أو اللوم سيُضيّع الفرصة.',
      dialogue_opener: 'أنا كنت عميلكم قبل وذهبت لمكان آخر. الآن أبغى أشوف وش عندكم.',
      psychological_context: 'Prodigal Customer Psychology — العائد يُعاني من خجل ضمني وحاجة لحفظ ماء الوجه. أي اعتراف بسبب العودة سيُحرجه.',
      choices: [
        { text: 'أهلاً بك! كيف كانت تجربتك مع المنافس؟', score: 5, feedback: 'أجبرته على الاعتراف بفشل قراره. سيشعر بالدفاعية فوراً.', consequence: 'كانت... معقولة. أبغى أشوف عروضكم فقط.' },
        { text: 'أهلاً بك، كنا نتمنى أن تعود!', score: 20, feedback: 'يُشعره بأنك «كنت تنتظر» انهياره.', consequence: '(يُشعر بالحرج ويكون أقل انفتاحاً)' },
        { text: 'أهلاً. دعنا نبدأ من الصفر — ما الذي تحتاجه الآن؟', score: 80, feedback: 'يتجاهل الماضي ويبدأ من النقطة الصحيحة. يفتقر للعنصر الإنساني.', consequence: 'نعم — أحتاج [احتياج محدد].' },
        { text: 'أهلاً مجدداً — سعيد بلقائك. دعنا نُركّز على ما تحتاجه الآن، وسنبني على ذلك.', score: 100, feedback: 'ترحيب دافئ بدون مبالغة، «مجدداً» يعترف بالعلاقة دون ذكر الفجوة، توجّه للحاضر، «نبني» يعني شراكة.', consequence: 'شكراً على الترحيب. نعم، أحتاج...' }
      ],
      expert_move: 'قاعدة Graceful Re-entry: لا تذكر المنافس، لا تشمت، لا تستغل. دفء + توجّه فوري للمستقبل.',
      principle: 'مبدأ Prodigal Customer: من تركك ثم عاد هو أكثر ولاءً ممن لم يغادر — لأنه اختبر البديل وعاد.'
    },

    new_scenario_24: {
      id: 'new_scenario_24', category: 'callcenter', title: 'خطأ في النظام أثّر على مئات الحسابات', difficulty: 5,
      setup: 'زبون يكتشف خطأً في فاتورته. أثناء التحقق تُدرك أنه خطأ ممنهج أثّر على مئات الحسابات. لم يُعلَن عنه بعد.',
      dialogue_opener: 'فاتورتي فيها خطأ — حُسب عليّ مرتين!',
      psychological_context: 'Systemic Error Discovery Protocol — الإفصاح الكامل قبل الإعلان الرسمي قد يُربك. عدم الإفصاح يُشعر الزبون بالخداع لاحقاً.',
      choices: [
        { text: 'صحيح، في مشكلة في النظام أثّرت على كثيرين — سيُصلح قريباً.', score: 40, feedback: 'صادق لكن قد يُثير قلقاً قبل وجود بيان رسمي.', consequence: 'كم شخصاً أُصيب؟! هل ستُعوّضون الكل؟!' },
        { text: 'هذا خطأ في حسابك فقط — سنُصلحه.', score: 10, feedback: 'كذبت ضمنياً — الزبون سيعلم لاحقاً.', consequence: '(لاحقاً) قالوا لي إنه مشكلة فردية!' },
        { text: 'لاحظت شيئاً يحتاج تحقيقاً. سأُصلح حسابك فوراً وأرفع الأمر لتقنية المعلومات كأولوية.', score: 80, feedback: 'حذر ومهني — يُصلح المشكلة الفورية دون إفصاح مبكر.', consequence: 'شكراً. متى يصطلح؟' },
        { text: 'أرى الخطأ وسأُصلح المبلغ وأُعيده لحسابك خلال 24 ساعة. هذا سيُرفع كأولوية قصوى لفريقنا التقني — وإذا كانت هناك تداعيات إضافية ستتلقى إشعاراً مني شخصياً. هل هذا مناسب؟', score: 100, feedback: 'حل فوري للمشكلة الشخصية، شفافية محدودة بدون تضخيم، الإشعار الشخصي يُبني الثقة.', consequence: 'أُقدّر ذلك. إذن سأنتظر الـ24 ساعة.' }
      ],
      expert_move: 'قاعدة Triage + Promise: أصلح المشكلة الشخصية فوراً، عد بالمتابعة، لا تُفصح عن النطاق الكامل قبل بيان رسمي.',
      principle: 'مبدأ Controlled Transparency: حل المشكلة الشخصية + وعد بالإشعار = شفافية مسؤولة تحمي الجميع.'
    },

    new_scenario_25: {
      id: 'new_scenario_25', category: 'sales', title: 'العميل يطلب خصماً لأنه «موظف حكومي»', difficulty: 3,
      setup: 'عميل يطلب خصماً مستنداً لكونه موظفاً حكومياً — لكن شركتك ليس لديها برنامج خصومات حكومية. هو يفترض أن الخصم حق له.',
      dialogue_opener: 'أنا موظف حكومي — عادةً الشركات تُعطينا خصماً. كم الخصم عندكم؟',
      psychological_context: 'Entitlement by Category — يطلب امتيازاً بناءً على هويته لا على سياسة موجودة. رفض الخصم قد يُشعله. قبوله يُنشئ سابقة.',
      choices: [
        { text: 'ما عندنا خصومات حكومية للأسف.', score: 30, feedback: 'صادق لكن بارد. لم تُقدّم أي بديل.', consequence: 'هذا غريب. شركات ثانية تُعطي.' },
        { text: 'حسناً سأُعطيك 10% كاستثناء.', score: 0, feedback: 'أنشأت سابقة بلا مسوّغ.', consequence: 'شكراً — بس غالباً أحصل 15%.' },
        { text: 'ليس لدينا برنامج حكومي رسمي. لكن لديّ عرض حزمة يمنحك قيمة أعلى من أي خصم...', score: 80, feedback: 'تحويل من الخصم للقيمة — صحيح الاتجاه.', consequence: 'ما هي الحزمة؟' },
        { text: 'أُقدّر عملك في القطاع الحكومي. لا يوجد لدينا خصم مخصص — لأننا نُؤمن أن كل زبون يستحق نفس المعاملة. لكن ما يمكنني تقديمه هو [حزمة / ميزة إضافية / تقسيط بدون فوائد] — وهذا يُعطيك قيمة أكبر من خصم 10%. هل تريد أن أُفصّلها؟', score: 100, feedback: 'احترام المهنة، رفض الخصم بمبدأ المساواة لا بالسياسة فقط، بديل حقيقي مُقيَّم.', consequence: 'إذا الحزمة أفضل من الخصم — نعم، أرني.' }
      ],
      expert_move: 'رفض الخصم بمبدأ المساواة أقوى من رفضه بالسياسة.',
      principle: 'مبدأ Category Entitlement Neutralization: رفض الخصم بالمبدأ يُزيل الشعور بالرفض الشخصي.'
    },

    new_scenario_26: {
      id: 'new_scenario_26', category: 'repair', title: 'اكتشاف بيانات حساسة في جهاز مُسلَّم للإصلاح', difficulty: 5,
      setup: 'أثناء الإصلاح ظهرت بيانات حساسة (وثائق مالية، صور شخصية). الجهاز غير مقفل. الزبون لا يعلم أنك رأيت ذلك.',
      dialogue_opener: '(الزبون يحضر لاستلام جهازه) هل الجهاز جاهز؟',
      psychological_context: 'Ethical Disclosure Dilemma — الصمت يبني العلاقة على معلومة مخفية. الإفصاح المباشر قد يُحرج الزبون. الحل: إفصاح مهني يُثبت النزاهة دون استعراض ما رأيت.',
      choices: [
        { text: 'نعم الجهاز جاهز. (لا تذكر شيئاً)', score: 10, feedback: 'أخللت بالنزاهة المهنية.', consequence: '(لاحقاً قد يكتشف ويفقد ثقته)' },
        { text: 'شفت بيانات خاصة في جهازك خلال الإصلاح — أبغاك تعرف.', score: 50, feedback: 'صادق لكن يُحرج الزبون.', consequence: '(يشعر بعدم ارتياح) كيف رأيتها؟!' },
        { text: 'جهازك جاهز. وخلال الإصلاح لاحظت أن الجهاز ليس محمياً بكلمة مرور — هذا يعرّض بياناتك للخطر. أنصحك بتفعيل القفل قبل أن تغادر.', score: 100, feedback: 'الإفصاح عبر «نقص الحماية» لا «ما رأيته»، يحفظ الكرامة ويُثبت النزاهة.', consequence: 'شكراً! والله ما فكّرت — كيف أُفعّله؟' },
        { text: 'الجهاز جاهز. لكن هل تريد مني التحقق من إعدادات الأمان قبل التسليم؟', score: 65, feedback: 'طريقة ذكية للفتح لكنها لم تُوصل رسالة الإفصاح الكافي.', consequence: 'لا بأس، هو تمام.' }
      ],
      expert_move: 'قاعدة Dignified Disclosure: أفصح عن الخطر لا عن المحتوى.',
      principle: 'مبدأ Privacy-as-Service: مهمتك تشمل حماية خصوصية صاحب الجهاز.'
    },

    new_scenario_27: {
      id: 'new_scenario_27', category: 'negotiation', title: 'شريك يتهرب من التزامات محددة', difficulty: 5,
      setup: 'تتفاوض مع شريك محتمل لمشروع مشترك. هو متحمس لكنه يتهرب من تحديد المسؤوليات. كلما اقتربت من الأرقام تحوّل للحديث عن «الرؤية».',
      dialogue_opener: 'المشروع فكرته ممتازة وأنا متحمس. خلينا نشتغل مع بعض. الأرقام التفصيلية تجي لاحقاً.',
      psychological_context: 'Commitment Avoidance — الشريك إما غير جاهز أو يُريد إبقاء خياراته مفتوحة. الشراكة بدون التزامات محددة وصفة للفشل.',
      choices: [
        { text: 'بالتأكيد — نبدأ ونحدد التفاصيل مع الطريق.', score: 0, feedback: 'الموافقة على الغموض تُضع الشراكة في خطر من اليوم الأول.', consequence: '(بعد 3 أشهر: خلافات على كل شيء)' },
        { text: 'لا — لازم نحدد التفاصيل الحين قبل أي شيء.', score: 25, feedback: 'موقف صحيح لكنه صارم ويُثير الدفاعية.', consequence: 'أنت تُعقّد الأمور — المرونة مهمة.' },
        { text: 'أنا أتفق على الرؤية. لكن خبرتي تُقول إن الشراكات تنهار بسبب غياب التفاصيل. مقترحي: اجتماع واحد — ساعتان فقط — نُجيب على ثلاثة أسئلة: مساهمة كل منا، توزيع الربح، وصلاحية القرار عند الخلاف. بعدها الشراكة ستكون أقوى.', score: 100, feedback: 'الموافقة على الرؤية، الإلحاح من التجربة لا الصرامة، اجتماع بزمن محدد (ساعتان)، ثلاثة أسئلة فقط.', consequence: 'ساعتان فقط... هذا معقول. متى تقترح؟' },
        { text: 'ممكن نكتب خطوطاً عريضة ونبدأ؟', score: 30, feedback: 'خطوط غير ملزمة تُجيل المشكلة لا تحلّها.', consequence: 'بالتأكيد! (ويتجنب التفاصيل مجدداً)' }
      ],
      expert_move: 'تقنية Structured Mini-Negotiation: اجتماع واحد قصير بثلاثة أسئلة محددة.',
      principle: 'مبدأ Vagueness Danger: الشراكة الغامضة تصبح أكثر صراعاً مع الوقت — لا أوضح.'
    },

    new_scenario_28: {
      id: 'new_scenario_28', category: 'callcenter', title: 'زبون يُصر على حل في الحال رغم استحالته', difficulty: 4,
      setup: 'زبون يطلب حلاً يحتاج تدخل قسم آخر و48 ساعة. هو يُصر على «الحين» ويرفض كل تفسير.',
      dialogue_opener: 'أبغاه يُحل الحين — مو بكرة مو بعد ساعتين. الحين!',
      psychological_context: 'Emotional Urgency vs Procedural Reality — المشكلة ليست فهمه للتأخير — بل شعوره بأنك لا تُحاول.',
      choices: [
        { text: 'مستحيل — النظام يحتاج 48 ساعة.', score: 5, feedback: 'كلمة «مستحيل» تُنهي الحوار.', consequence: 'إذن أريد المدير!' },
        { text: 'أنا أفهم إنك تريد الحل الحين. ما أستطيع أسرّع النظام للأسف.', score: 30, feedback: '«ما أستطيع» تُشعره بعدم الجهد.', consequence: 'لماذا لا تُحاول؟!' },
        { text: 'خلني أرفع الطلب كحالة طارئة وأتصل بالقسم المختص مباشرة الآن قدامك.', score: 85, feedback: 'الفعل الفوري «قدامك» يُثبت الجهد.', consequence: 'حسناً... بس بسرعة.' },
        { text: 'أنا سأفعل شيئاً الآن. سأُصنّف طلبك كأولوية قصوى ويصلك تأكيد خلال 10 دقائق أن القسم المختص تلقى الحالة. بعدها سيتواصلون معك خلال ساعتين — لا 48 ساعة. هل رقمك صحيح؟', score: 100, feedback: 'فعل فوري، تأكيد مكتوب (10 دقائق)، وعد مُخفَّض (ساعتان لا 48)، سؤال تحقق يُشعره بالاهتمام.', consequence: 'الرقم صح. ساعتان فقط؟ حسناً.' }
      ],
      expert_move: 'تقنية Micro-Commitment Chain: قسّم الوعد البعيد لوعود صغيرة متتالية.',
      principle: 'مبدأ Effort Visibility: الزبون يطلب أن يرى أنك تُحاول — لا المستحيل.'
    },

    new_scenario_29: {
      id: 'new_scenario_29', category: 'sales', title: 'المنافس يُقدّم نفس المنتج بسعر أدنى — وهو جيد فعلاً', difficulty: 5,
      setup: 'عميل عرض مقارنة حقيقية: منافسك يُقدّم مواصفات مماثلة بـ30% أقل وتقييم 4.8/5. أنت عند 4.6. ليس كلاماً — بيانات حقيقية.',
      dialogue_opener: 'أنا عملت مقارنة تفصيلية وشركة [س] أفضل منكم في السعر والتقييم. قدّمتم لي سبباً أبقى معكم؟',
      psychological_context: 'Honest Competitive Disadvantage — الرد المزيّف سيُثبت أنك تعلم أنك أضعف. الصدق المُؤطَّر بذكاء هو السلاح الوحيد.',
      choices: [
        { text: 'نحن أفضل في [ميزة غامضة] وخدمتنا لا تُقارن.', score: 5, feedback: 'دفاعي ومبهم في مواجهة بيانات دقيقة.', consequence: 'هذا ما تقوله كل شركة.' },
        { text: 'لو حضرتك مهتم بالسعر فقط — ربما [س] هي الأنسب.', score: 45, feedback: 'صادق لكنه يدفعه للرحيل. يجب أن يكون مسبوقاً بتمييز حقيقي.', consequence: 'إذن سأذهب إليهم.' },
        { text: 'البيانات دقيقة ونحن نحترم مقارنتك. سؤال واحد: ما الذي تُعطيه وزناً أعلى — السعر الفوري أم [نقطة تميّزنا الحقيقية]؟ لأن إذا كان السعر أولاً — ما عندي حجة. لكن إذا كان [النقطة الأخرى] — عندي حجة تستحق دقيقتين.', score: 100, feedback: 'الاعتراف بصحة البيانات، سؤال الأولوية يُفرّق أنواع العملاء، صدق في الحدود، الحجة بشرط محدد.', consequence: 'في الحقيقة التكامل مع نظامنا مهم جداً... حدّثني.' },
        { text: 'نحن أُسسنا علاقات طويلة الأمد مع عملائنا.', score: 20, feedback: 'كلام عام لا يُقابل بيانات دقيقة.', consequence: 'هم أيضاً يقولون ذلك.' }
      ],
      expert_move: 'Honest Differentiation: اعترف بالمنافسة، ثم ضيّق معيار الانتصار للنقطة التي تكسب فيها.',
      principle: 'مبدأ Selective Competition: الاعتراف بالضعف في نقطة يُعطيك مصداقية كاملة في نقطة القوة.'
    },

    new_scenario_30: {
      id: 'new_scenario_30', category: 'repair', title: 'زبون يرفض سعر قطعة الغيار ويريد «صينية»', difficulty: 3,
      setup: 'زبون يحتاج قطعة أصلية بـ 40,000 دج. يُصرّ على صينية بـ 8,000 دج. تعلم أنها ستُعطّل الجهاز خلال أسابيع وقد تُتلف قطعاً أخرى.',
      dialogue_opener: 'الأصلية غالية. ركّب لي الصينية وكفى. أنا مسؤول عن قراري.',
      psychological_context: 'Autonomy vs Duty of Care — قراره مشروع. لكن قبولك يُحوّلك شريكاً في ضرر مستقبلي مؤكد.',
      choices: [
        { text: 'حسناً، ركّبت الصينية.', score: 10, feedback: 'شاركت في ضرر مستقبلي دون إفصاح.', consequence: '(بعد 3 أسابيع) جهازي خرب! أنتم مسؤولون!' },
        { text: 'ما أركّب صيني — إما الأصلية أو لا شيء.', score: 20, feedback: 'يُفقدك الزبون ولم تُعطه المعلومة الكاملة.', consequence: 'إذن روح مكان ثاني!' },
        { text: 'قرارك ومسؤوليتك — لكن خلني أُوضّح: هذه القطعة عمرها التشغيلي أسابيع وستُعطّل [قطعة أخرى بالاسم] التي تكلّف [مبلغ أعلى]. الأصلية ضمانها سنة. إذا قررت الصينية سأُركّبها وتوقّع معي ورقة تُثبت أخذت القرار بعد الاطلاع الكامل.', score: 100, feedback: 'شفافية كاملة (العمر التشغيلي + التكلفة المستقبلية)، احترام القرار، توثيق يحمي الطرفين.', consequence: '... كم تكلّف القطعة الثانية لو خربت؟ (يُعيد الحساب)' },
        { text: 'أنت المسؤول. أركّبها لكن الضمان لا يشمل الصيني.', score: 50, feedback: 'جيد في حماية الضمان، لكن لم يُحذّره بالتفصيل الكافي.', consequence: 'تمام، أعرف.' }
      ],
      expert_move: 'قاعدة Informed Refusal Documentation: شرح العواقب بالتفصيل + توثيق القرار.',
      principle: 'مبدأ Duty of Care with Autonomy: الزبون يحق له أن يُخطئ — لكن دورك أن تتأكد أن الخطأ مبني على معلومة كاملة.'
    },

    new_scenario_31: {
      id: 'new_scenario_31', category: 'negotiation', title: 'عقد فيه بنود «غير قابلة للتفاوض»', difficulty: 5,
      setup: 'شركة كبيرة أرسلت مسودة فيها 12 بنداً وصفوها بـ«غير قابلة للتفاوض». بعضها يُضرّ بك بشكل كبير (مسؤولية غير محدودة، شروط إنهاء أحادية). الصفقة مهمة جداً.',
      dialogue_opener: 'هذه المسودة النهائية — شركتنا لا تُفاوض على بنود العقد القياسي.',
      psychological_context: '«غير قابل للتفاوض» هو موقف لا حقيقة قانونية. معظم البنود «القياسية» مرنة مع الضغط الصحيح.',
      choices: [
        { text: 'إذا هكذا — لا أستطيع قبول هذه الشروط.', score: 10, feedback: 'رفض مباشر يُنهي الصفقة.', consequence: 'نأسف على ذلك.' },
        { text: 'أفهم. أقبل المسودة مع تحفظات بسيطة.', score: 5, feedback: 'تنازل كامل أمام ادعاء «غير قابل للتفاوض».', consequence: '(تتحمل بنوداً ضارة لسنوات)' },
        { text: 'أُقدّر الحرص على الاتساق. لكن قبل التوقيع أحتاج فهم مخاطر بند واحد: [المسؤولية غير المحدودة] — في حالة حادثة خارج سيطرتنا، هل الشركة مستعدة لهذا الخطر؟ سقف معقول يحمي الطرفين ويجعل تنفيذ العقد أكثر استقراراً.', score: 100, feedback: 'احترام موقفهم، تضييق لبند واحد لا 12، إطار حماية الطرفين، السؤال يُجبرهم على التفكير في خطرهم هم.', consequence: 'هذا البند بالذات... لنتحدث مع فريقنا القانوني.' },
        { text: 'ما هي البنود الأكثر أهمية بالنسبة لكم تحديداً؟', score: 45, feedback: 'جيد للفهم لكنه لا يُحرّك «غير قابل للتفاوض».', consequence: 'كلها مهمة. هذا هو الموقف.' }
      ],
      expert_move: 'تقنية Single-Clause Focus: اختر البند الأشد ضرراً وركّز عليه وحده.',
      principle: 'مبدأ Non-negotiable Deconstruction: لا يوجد عقد «غير قابل للتفاوض» بالكامل — اختر بنداً واحداً واطرح خطره بالأرقام.'
    },

    new_scenario_32: {
      id: 'new_scenario_32', category: 'callcenter', title: 'زبون يكتشف تسعيراً مختلفاً لنفس المنتج', difficulty: 4,
      setup: 'زبون يتصل غاضباً لأن صديقه دفع 30% أقل منه لنفس المنتج. صديقه استخدم كود خصم لم يعلم عنه الزبون.',
      dialogue_opener: 'دفعت أكثر من غيري لنفس المنتج! هذا ظلم وتمييز!',
      psychological_context: 'Price Fairness Perception — الزبون يتألم من الشعور بالغبن أكثر من الخسارة المادية الفعلية.',
      choices: [
        { text: 'هو استخدم كود خصم — هذا متاح للجميع.', score: 15, feedback: 'صحيح لكنه يُشعله أكثر: «كيف لم أعرف؟»', consequence: 'ليش ما أخبرتموني عنه؟!' },
        { text: 'هذا السعر الذي وافقت عليه في وقت الشراء.', score: 5, feedback: 'دفاعي قانوني يُشعله أكثر.', consequence: 'وهو ليس العدل!' },
        { text: 'أفهم إنك تشعر بالغبن. الكود كان متاحاً لكل زبائننا — لكن لم يُوزَّع بالكفاءة الكافية وهذا شيء نتحسّن فيه. ما أستطيع تقديمه الآن هو [رصيد / كود مستقبلي / خصم على الطلب القادم].', score: 100, feedback: 'الاعتراف بالشعور، توضيح الحقيقة (متاح للجميع)، قبول مسؤولية التواصل، تعويض ملموس.', consequence: '... الكود كان للجميع؟ إذن ليس تمييزاً. والكود المستقبلي جيد.' },
        { text: 'سأُعيد لك الفرق.', score: 40, feedback: 'سهل وفوري، لكنه يُنشئ سابقة مُكلفة.', consequence: 'شكراً. ولماذا لم تقل هذا من البداية؟' }
      ],
      expert_move: 'إطار Fairness Reframe: اعترف بثغرة التواصل (الكود لم يصلك) لا بالتمييز.',
      principle: 'مبدأ Price Fairness Perception: الفرق بين «التمييز» و«الإهمال» هو كيفية تأطير المشكلة.'
    },

    new_scenario_33: {
      id: 'new_scenario_33', category: 'sales', title: 'عميل يطلب إضافة ميزة في آخر لحظة قبل التوقيع', difficulty: 4,
      setup: 'أنت على وشك إغلاق صفقة كبيرة. العقد جاهز. فجأة: «أريد إضافة ميزة [X] بنفس السعر وإلا لن أوقّع». هذه الميزة تكلّف موارد إضافية.',
      dialogue_opener: 'قبل ما أوقّع — أبغى تضيف [الميزة X] بدون تغيير السعر وإلا الصفقة ما تتم.',
      psychological_context: 'Last-Minute Nibbling — الطلب في آخر لحظة تكتيك معروف. الضغط النفسي يجعلك أكثر عرضة للقبول.',
      choices: [
        { text: 'حسناً — أضيفها.', score: 5, feedback: 'علّمته أن هذا التكتيك يعمل. سيستخدمه دائماً.', consequence: '(بعد التوقيع يطلب إضافات أخرى)' },
        { text: 'هذا خارج الاتفاقية — لا أقبل.', score: 20, feedback: 'الرفض المباشر قد يُفجّر الصفقة.', consequence: 'إذن الصفقة لا تتم.' },
        { text: 'أفهم طلبك. الميزة [X] لها تكلفة حقيقية — لن أضيفها بنفس السعر. لكن خيارين: نُضيفها بإضافة [رقم محدد]، أو نُوقّع الحالي ونضيف [X] في مرحلة التحديث القادمة بدون رسوم.', score: 100, feedback: 'رفض المجانية بوضوح، خيار الإضافة المُسعَّرة يُثبت قيمة الميزة، خيار التأجيل يُعطيه وجهاً، لا ضغط لكن لا تنازل.', consequence: 'التأجيل بدون رسوم مقبول. لنوقّع.' },
        { text: 'هذا التعديل يحتاج مراجعة فريقنا — لنُؤجّل التوقيع.', score: 30, feedback: 'يُفقدك زخم الإغلاق.', consequence: 'لا أريد تأجيلاً — قرري الآن.' }
      ],
      expert_move: 'قاعدة Nibble Response: خيارين دائماً — الإضافة مُسعَّرة + التأجيل المجاني.',
      principle: 'مبدأ Nibbling Counter: القبول المجاني يُدمر الأسعار المستقبلية. الرفض المباشر يُدمر الصفقة. الخيارين يحفظان كليهما.'
    },

    new_scenario_34: {
      id: 'new_scenario_34', category: 'repair', title: 'زبون يريد تقييم جهاز للبيع — وقيمته أقل مما يتوقع', difficulty: 3,
      setup: 'زبون يتوقع 600,000 دج لجهازه. التقييم الحقيقي 380,000 دج بسبب تلف الشاشة والقِدَم. هو يعلّق آمالاً مالية على هذا الرقم.',
      dialogue_opener: 'جهازي iPhone 12 Pro — كم يساوي؟ أحتاج أعرف بسرعة.',
      psychological_context: 'Expectation Crash Mitigation — إعطاء رقم مباشر أقل بـ40% من التوقع سيُصدمه. التقديم التدريجي مع المبررات يُقلل الصدمة.',
      choices: [
        { text: 'يساوي 380,000 دج.', score: 20, feedback: 'صدق فوري دون تمهيد يُثير رد فعل سلبي.', consequence: 'مستحيل! هذا رخيص جداً!' },
        { text: 'هذا الموديل يتفاوت حسب الحالة — خلني أفحصه أولاً.', score: 60, feedback: 'تمهيد جيد — لكن بعد الفحص يجب تقديم الرقم بأسلوب يُقلل الصدمة.', consequence: 'تفضل. (يُعطيك الجهاز)' },
        { text: 'خلني أشرح كيف يُحسَب السعر. iPhone 12 Pro بحالة ممتازة يصل لـ550,000. الخصم يأتي من: قِدَم الجهاز (خصم 8%)، حالة الشاشة (خصم 15%)، وسوق الاستعمال الحالي. بعد الحساب التقييم العادل 380,000 — وهذا ما يُعطيه أي مشتري منطقي. هل تريد مقارنته بعروض السوق الحالية؟', score: 100, feedback: 'السقف الأعلى كمرجع (550,000) يُطبّع الخصومات، تفصيل كل خصم بنسبة، الرقم يأتي آخراً بعد تهيئة كاملة، المقارنة السوقية تُثبت الموضوعية.', consequence: '... 380 بعد الخصومات من 550؟ إذن الجهاز خسر بسبب حالته. مقبول.' },
        { text: 'جهازك يساوي أقل من توقعاتك بسبب الشاشة وعمره.', score: 30, feedback: 'جزئياً جيد لكن الرقم غائب والتمهيد مبهم.', consequence: 'بالضبط كم؟' }
      ],
      expert_move: 'تقنية Anchor-Then-Discount: ابدأ بأعلى سعر نظري ثم نزّل بخصومات مُبرَّرة.',
      principle: 'مبدأ Expectation Gap Management: جسّر الفجوة بخطوات منطقية — لا بصدمة مباشرة.'
    },

    new_scenario_35: {
      id: 'new_scenario_35', category: 'negotiation', title: 'الموظف النجم يُهدد بالاستقالة ليحصل على زيادة', difficulty: 5,
      setup: 'موظفك الأفضل (35% من إيرادات الفريق) قدّم استقالة مشروطة: زيادة 40% أو يغادر. سياسة الشركة تُحدد 15% كحد أقصى.',
      dialogue_opener: 'تلقيت عرضاً بزيادة 40% من شركة ثانية. إذا ما ساويتم العرض — سأقبله.',
      psychological_context: 'Ultimatum Management — القبول يُنشئ سابقة. الرفض يُفقدك الإيرادات. الطريق الثالث: زيادة القيمة الكاملة لا الراتب فقط.',
      choices: [
        { text: 'أعطيك الـ40% — لا أستطيع خسارتك.', score: 0, feedback: 'خرقت السياسة وأعلمت كل موظف أن التهديد يعمل.', consequence: '(كل الفريق يقدّم «استقالات مشروطة»)' },
        { text: 'السياسة تُحدد 15% وهذا الحد الأقصى.', score: 10, feedback: 'يدفع الموظف للرحيل مع 35% من الإيرادات.', consequence: 'إذن سأقبل العرض الثاني.' },
        { text: 'قدّر العرض أكثر مني؟ الولاء لشيء معناه.', score: 0, feedback: 'هجوم عاطفي يُسرّع الرحيل.', consequence: '(يُقدّم الاستقالة فوراً)' },
        { text: 'أُقدّر شفافيتك. الـ40% فوق سقفي الصلاحي الآن. لكن قبل أي قرار — مقارنة كاملة: العرض الثاني يُعطيك 40% راتباً — لكن ماذا عن [برنامج الأسهم / مشروع القيادة القادم / الترقية المجدولة خلال 8 أشهر]؟ أستطيع التفاوض على تسريع هذه المسارات رسمياً. السؤال: ما الذي يجعل العرض الثاني أكثر قيمة فعلاً — الرقم أم شيء آخر لا تجده هنا؟', score: 100, feedback: 'احترام الشفافية، صدق في حدود الصلاحية، تحويل المقارنة من الراتب للقيمة الكاملة، استكشاف السبب الحقيقي.', consequence: '... في الحقيقة أنا لست متأكداً من استقرار الشركة الثانية. وموضوع الأسهم وبرنامج القيادة... حدّثني أكثر.' }
      ],
      expert_move: 'تقنية Total Compensation Reframe: حوّل المقارنة من الراتب للحزمة الكاملة.',
      principle: 'مبدأ Ultimatum Reframing: التهديد بالاستقالة في 70% من الحالات صرخة للاعتراف لا بحث حقيقي عن بديل.'
    },

    // ─────────────────────────────────────────────
    //  ELITE DILEMMAS · Quantum Leap v12.2
    //  Programming & Accounting (Good / Pro / Catastrophic)
    // ─────────────────────────────────────────────

    prog_01: {
      id: 'prog_01', category: 'programming', title: 'Bug في Production والمدير يضغط', difficulty: 5,
      setup: 'خلل حرج في نظام الدفع. العملاء لا يستطيعون إكمال الطلبات. المدير يصرخ في الاجتماع: «أصلحه الآن، أي شيء!»',
      dialogue_opener: 'ما هذا؟! أصلحه في 10 دقائق مهما كان! لا وقت للتفكير!',
      psychological_context: 'Production Crisis — الضغط يدفع لقرارات سريعة خاطئة. الاحترافية هي الحفاظ على الـ methodology حتى تحت الضغط — لأن الخطأ تحت الضغط يُضاعف الأزمة.',
      choices: [
        { text: 'أُعدّل مباشرة على الـ production server بدون testing.', score: 0, feedback: 'كارثة. قد تُضيف bug أكبر وتفقد audit trail. قرار هاوٍ تحت الضغط.', consequence: '[التعديل يكسر endpoint آخر — أزمة داخل أزمة. كل المستخدمين معطّلون الآن.]' },
        { text: 'أُعلن "يحتاج وقتاً" وأنتظر حتى يهدأ الفريق.', score: 15, feedback: 'احترافي تقنياً لكن بارد إدارياً. لم تُقدّم شيئاً فورياً.', consequence: 'المدير: «وقت؟! كل دقيقة نخسر 5000$!»' },
        { text: 'أُفعّل rollback للنسخة السابقة + أفتح incident channel + أُبلغ الـ status page.', score: 100, feedback: 'الاحترافي: rollback الآن (3 دقائق) يُوقف النزيف، ثم root cause analysis بهدوء. الشفافية في status page تحمي السمعة.', consequence: '[النظام يعود خلال 4 دقائق. المدير يهدأ. تستطيع تشخيص الـ root cause بهدوء.]' },
        { text: 'أبحث عن الخطأ في logs وأُصلح بأسرع ما يمكن.', score: 40, feedback: 'صحيح في موقف أصغر — لكن كل دقيقة بحث = فقدان إيرادات. rollback يجب أن يسبق التحقيق.', consequence: '[بعد 20 دقيقة اكتشفت الخطأ — لكن خسرت 100K$ أثناء البحث.]' }
      ],
      expert_move: 'قاعدة Incident Response: Revert First, Debug Second. لا تُشخّص على جسد نازف — أوقف النزيف ثم افحص.',
      principle: 'مبدأ MTTR (Mean Time To Recovery): قياس الاحتراف ليس في عدم وقوع الأزمة — بل في سرعة التعافي. rollback + incident playbook = المحترف.'
    },

    prog_02: {
      id: 'prog_02', category: 'programming', title: 'زميل يرفع PR بكود مكسور + تهديد بـ «التسليم غداً»', difficulty: 4,
      setup: 'زميلك رفع PR فيه 3 مشاكل جوهرية: hardcoded secrets، لا توجد tests، منطق خاطئ في edge cases. يضغط للموافقة «لأن التسليم غداً».',
      dialogue_opener: 'ياخي وقّع الـ PR — التسليم غداً، تقدر تُصلحها لاحقاً.',
      psychological_context: 'Pressure to Approve — الموافقة تحت الضغط تُنشئ سابقة. الرفض الحاد يُدمّر العلاقة. المطلوب: جسر بين الدقة والعلاقة.',
      choices: [
        { text: 'أُوافق صامتاً لتجنّب المواجهة — «نُصلحها الأسبوع القادم».', score: 0, feedback: 'الـ secret يُسرَّب في repo. عند الاكتشاف: اسمك على الـ approval. مسؤولية قانونية حقيقية.', consequence: '[بعد أسبوعين: اختراق. فريق الأمن يراجع logs. اسمك في كل خطوة.]' },
        { text: 'أرفض الـ PR بتعليق واحد: «مرفوض، أعد العمل».', score: 20, feedback: 'مهني لكن بارد جداً — يُدمّر العلاقة ولا يُساعد زميلك على التعلّم.', consequence: '[زميلك يُبلغ المدير أنك «تُعرقل التسليم». الأزمة أكبر.]' },
        { text: 'أرفض + أقترح حلولاً محددة + أعرض مساعدة تقنية لمدة ساعة الآن لحلّ الثلاثة معاً.', score: 100, feedback: 'المطلوب: (1) Secret → env var، (2) Tests للمنطق الحرج، (3) Edge case fix. «لنجلس ساعة الآن ونُنجزها معاً.» — دقة + علاقة + إنجاز.', consequence: '[بعد ساعة: PR نظيف، تسليم في الموعد، زميلك تعلّم، والعلاقة أقوى.]' },
        { text: 'أقبل جزئياً — أطلب إصلاح الـ secrets فقط وأُأجّل الباقي.', score: 55, feedback: 'حلّ وسط معقول لكنه خطير. الـ tests الناقصة في منطق حرج = bugs قادمة. دقة جزئية ليست دقة.', consequence: '[بعد يومين: bug في edge case يُكلّف العميل 10K$.]' }
      ],
      expert_move: 'قاعدة Code Review Ethics: الرفض بدون اقتراح = عرقلة. الاقتراح مع المساعدة = قيادة.',
      principle: 'مبدأ Shared Ownership: كل PR توافق عليه هو PR أنت مسؤول عنه أيضاً. وقّع بضمير.'
    },

    prog_03: {
      id: 'prog_03', category: 'programming', title: 'CTO يطلب «تخطّي الـ tests لتسريع التسليم»', difficulty: 5,
      setup: 'شركة ناشئة تُعاني مالياً. CTO يطلب تعطيل CI/CD والـ tests مؤقتاً لشحن feature عاجلة للمستثمرين. «نُعيدها بعد التمويل».',
      dialogue_opener: 'عطّل الـ tests هذا الأسبوع فقط. المستثمرون ينتظرون. إذا ما أغلقنا الجولة — الشركة تنتهي.',
      psychological_context: 'Survival Pressure — السياق يجعل القرار يبدو مبرراً. لكن تخطّي tests ليس توفير وقت — هو دين تقني بفائدة مركّبة.',
      choices: [
        { text: 'أنفّذ — البقاء أهم من المثالية.', score: 5, feedback: 'Feature تُشحن بـ bug كبير. المستثمرون يختبرونها = انسحاب الجولة. خسرت كليهما.', consequence: '[Demo للمستثمرين: payment crash. الجولة تُلغى. الشركة تنتهي أسوأ مما بدأت.]' },
        { text: 'أرفض مبدئياً — «Tests ليست قابلة للتفاوض».', score: 30, feedback: 'موقف سليم أخلاقياً لكنه لا يُقدّم حلاً للأزمة الحقيقية. تبدو متعجرفاً في وقت حرج.', consequence: '[CTO: «إذن الشركة تموت بمبدأك؟» — موقف لا يرحم.]' },
        { text: 'أُوافق على smoke tests فقط (10% من السرعة لكن 80% من الحماية) + أُوثّق القرار بإيميل للـ board.', score: 100, feedback: 'الاحترافي: تُعطي جزءاً من السرعة مع حفاظ على الحد الأدنى من الأمان. التوثيق يحميك ويحمي الشركة من قرارات لا تتحمّل عواقبها لاحقاً.', consequence: '[smoke tests تلتقط 2 bugs حرجة. Demo نجح. بعد الجولة: تُعاد الـ tests كاملة. تم الحفاظ على الشركة والمهنية.]' },
        { text: 'أقترح تأجيل الـ demo أسبوعاً حتى تكتمل الـ tests.', score: 40, feedback: 'صحيح تقنياً لكنه يتجاهل أن قرار التأجيل ليس ملكك. اقتراح لا تُنفّذه الإدارة.', consequence: '[CTO يرفض: «لا نملك أسبوعاً.» تعود للنقطة الأولى.]' }
      ],
      expert_move: 'قاعدة Pragmatic Safety: لا تقبل «كل الأمان» ولا «صفر أمان». ابنِ طيف خيارات بينهما.',
      principle: 'مبدأ Engineering Leadership: الهندسة تحت الضغط ليست رفض كل التنازلات — بل إدارتها بحكمة وتوثيقها بشفافية.'
    },

    acct_d1: {
      id: 'acct_d1', category: 'accounting', title: 'اكتشفت أن رقم المبيعات في التقرير خاطئ — قبل 10 دقائق من اجتماع المساهمين', difficulty: 5,
      setup: 'راجعت تقريراً سيُعرض على المساهمين بعد 10 دقائق. اكتشفت أن رقم الإيرادات مُبالَغ فيه بـ 2.3M بسبب خطأ في صيغة Excel.',
      dialogue_opener: '(أنت وحدك أمام الشاشة. التقرير مُرسَل. الاجتماع يبدأ خلال دقائق.)',
      psychological_context: 'Time Pressure + Reputation Risk — الصمت قد يُنجّيك لحظياً لكنه يُصبح احتيالاً إذا عُلم لاحقاً. الإبلاغ يُسبّب إحراجاً لحظياً لكنه يحمي كل شيء.',
      choices: [
        { text: 'أصمت — سأُصحّحه في التقرير القادم.', score: 0, feedback: 'الأرقام المعلنة للمساهمين قانونياً ملزمة. الصمت = مخالفة إفصاح + احتمال ملاحقة جنائية عند الكشف.', consequence: '[بعد 3 أشهر: المدقق الداخلي يكتشف. تحقيق. فصل. سجل مهني مدمّر.]' },
        { text: 'أُرسل إيميلاً طارئاً للمدير المالي فقط قبل الاجتماع.', score: 60, feedback: 'خطوة صحيحة لكنها ناقصة. المدير المالي وحده لا يستطيع تأخير اجتماع المساهمين. تحتاج تصعيداً أوسع.', consequence: '[المدير المالي: «ما في وقت — سنُصحّحه لاحقاً.» — ورطة أكبر.]' },
        { text: 'أتصل فوراً بالمدير المالي + رئيس لجنة المراجعة + أُرسل إيميلاً موثّقاً + أقترح تأجيل العرض 30 دقيقة للتصحيح.', score: 100, feedback: 'الاحترافي: تصعيد متعدد الطبقات + توثيق + حل عملي. 30 دقيقة إحراج أفضل من فضيحة مليونية. المساهمون يُقدّرون الشفافية.', consequence: '[تأجيل 25 دقيقة. تصحيح شفاف. المساهمون يشكرون الدقة. ثقتك ترتفع.]' },
        { text: 'أُصلح الرقم وأُعيد طباعة التقرير قبل الاجتماع دون إخبار أحد.', score: 10, feedback: 'تزوير نسخ. إذا قارن أحد النسخة الإلكترونية بالورقية = كارثة. «إصلاح صامت» في الأرقام = جريمة.', consequence: '[المدير المالي يلاحظ اختلاف النسخ — يطلب تفسيراً فورياً أمام الجميع.]' }
      ],
      expert_move: 'قاعدة Immediate Transparency: في المحاسبة، الخطأ المُكتَشف يُعلَن فوراً. التأخير يُحوّل الخطأ إلى احتيال.',
      principle: 'مبدأ Accountant Integrity: شهادتك المهنية تقوم على مبدأ واحد — الأرقام تُقال كما هي. من يُساوم على هذا يفقد المهنة.'
    },

    acct_d2: {
      id: 'acct_d2', category: 'accounting', title: 'عميل VIP يطلب فاتورة «بدون ضريبة» مقابل عقد كبير', difficulty: 5,
      setup: 'عميل صفقته 800K ر.س. يقول: «أريد فاتورة بدون VAT — أو أذهب لمنافس». الرفض يُكلّفك الصفقة. القبول = تهرّب ضريبي.',
      dialogue_opener: 'اسمع — أبغى الفاتورة بدون ضريبة. مو مشكلة لك، مشكلتي معي. إذا ما تقدر، في كثير غيرك.',
      psychological_context: 'Financial Pressure + Legal Risk — الإغراء مالي، العقوبة قانونية. كثير من المحاسبين يسقطون هنا لأن الحجة «العميل يتحمّل المسؤولية» تبدو مقنعة.',
      choices: [
        { text: 'أوافق — هو من يتحمّل المسؤولية أمام هيئة الضرائب.', score: 0, feedback: 'خطأ قانوني شائع. المُصدر للفاتورة مسؤول تضامنياً. عند التحقيق = غرامة 100% + سجل جنائي ضريبي لك.', consequence: '[بعد 8 أشهر: ZATCA يُدقّق العميل. فواتيرك المُلفّقة تظهر. تُقفل الشركة 3 أشهر + غرامة 1.6M.]' },
        { text: 'أرفض بقوة — «مستحيل، هذا تهرّب».', score: 55, feedback: 'موقف سليم قانونياً لكن بارد تجارياً. تفقد الصفقة بدون محاولة إنقاذها.', consequence: '[العميل يذهب للمنافس. لكنك سليم قانونياً.]' },
        { text: 'أرفض + أُقدّم بدائل شرعية: خصم تجاري موثّق يُعادل قيمة الضريبة، أو ترتيب شراكة رسمية تُغيّر الطبيعة الضريبية.', score: 100, feedback: 'الاحترافي: ترفض المخالفة + تحافظ على الصفقة بحلول شرعية. الخصم التجاري يُوثّق في العقد ويُخفض القيمة قبل الضريبة — قانوني 100%.', consequence: '[العميل يُفكّر: «أنت محاسب جيد فعلاً — لم تكذب وحلّيت.» — توقيع + علاقة طويلة.]' },
        { text: 'أقترح تقسيم الصفقة على 3 فواتير صغيرة لتجنّب الحد الضريبي.', score: 5, feedback: 'احتيال ضريبي أكثر تعقيداً — يُعرف بـ "Invoice Splitting" وهو جريمة محددة في نظام VAT السعودي.', consequence: '[ZATCA يكشفه خلال التدقيق السنوي. عقوبات مُضاعفة لأنه «تحايل منظّم».]' }
      ],
      expert_move: 'قاعدة Legal Creativity: المحاسب المحترف لا يرفض فقط — يعرض الطريق القانوني الذي يحقّق هدف العميل المشروع.',
      principle: 'مبدأ No Fraud For Any Client: لا توجد صفقة تستحق شهادتك المهنية وسجلك الجنائي.'
    },

    acct_d3: {
      id: 'acct_d3', category: 'accounting', title: 'مدير المشتريات يُدخل فاتورة وهمية بمبلغ 5,000', difficulty: 4,
      setup: 'أثناء مراجعة فواتير المورّدين، لاحظت فاتورة من مورّد جديد (عنوان سكني، سجل تجاري غير واضح، مبلغ 4,990 — تحت حد موافقة المدير). مدير المشتريات يُؤكّد «المورّد موثوق».',
      dialogue_opener: 'خلاص هذا المورّد نتعامل معه من زمان، وقّع الفاتورة.',
      psychological_context: 'Red Flag Convergence — 3 مؤشرات Benford/Fraud Triangle تظهر معاً: عنوان سكني + مبلغ تحت الحد + إصرار من المدير. هذا سيناريو Shell Company كلاسيكي.',
      choices: [
        { text: 'أُوقّع — المدير يعرف أكثر مني عن المورّدين.', score: 0, feedback: 'أنت الخط الأخير للدفاع. إذا ضيّعته = أصبحت جزءاً من الاحتيال قانونياً وإن لم تستفد.', consequence: '[بعد سنة: المدقق الخارجي يكشف. 12 فاتورة مشابهة. 60K مُختَلَسة. توقيعك على كلها.]' },
        { text: 'أرفض علناً وأتهم المدير بالاحتيال.', score: 10, feedback: 'اتهام بلا دليل قانوني كافٍ = تشهير. حتى لو كنت محقاً، الطريقة خاطئة.', consequence: '[المدير يرفع شكوى على تشهير. تُفصل قبل اكتمال التحقيق.]' },
        { text: 'أطلب وثائق إضافية (عقد مع المورّد، تسليم فعلي موثّق، TIN verification) + أُوثّق الطلب بإيميل رسمي + أُبلغ المدقق الداخلي بصمت.', score: 100, feedback: 'الاحترافي: لا تواجه، لا توقّع، لا تتهم — استخدم الإجراء. «الوثائق الناقصة» حجة محايدة تكشف الاحتيال دون اتهام. التوثيق يحميك. المدقق الداخلي يُكمل التحقيق.', consequence: '[المدقق الداخلي يكتشف 12 فاتورة مشابهة. تحقيق رسمي. تُكافَأ كـ"خط دفاع ذكي". المدير يُفصل.]' },
        { text: 'أوقّع لكن أُخبر المدقق لاحقاً.', score: 20, feedback: 'التوقيع بعد علمك بالمؤشرات = تواطؤ. الإبلاغ لا يُلغي التوقيع.', consequence: '[التحقيق يكشف أنك علمت ووقّعت. مسؤولية تضامنية.]' }
      ],
      expert_move: 'تقنية Procedural Firewall: طلب الوثائق المفقودة = أداة اكتشاف الاحتيال دون اتهام مباشر.',
      principle: 'مبدأ Four-Eyes Principle: المحاسب الذي يرى red flags ويوقّع = لم يعد محاسباً. الشك المُوثَّق = واجب، ليس خياناً للمدير.'
    }
  };

  // ─── Elite Dilemma Category Labels (Quantum Leap v12.2)
  window.QL_ELITE_CAT_LABELS = {
    programming: '💻 برمجة نخبوية',
    accounting:  '🧮 محاسبة احترافية'
  };

  // ── Engine State ── with localStorage persistence
  const LS_KEY = 'training_platform_v1';

  function loadFromStorage() {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        return {
          totalPoints:    data.totalPoints    || 0,
          totalCompleted: data.totalCompleted || 0,
          streak:         data.streak         || 0,
          completedIds:   data.completedIds   || [],
          currentRound:   [],
          currentIdx:     0,
          roundScore:     0,
          roundResults:   [],
          filterCat:      'all'
        };
      }
    } catch(e) {}
    return {
      totalPoints: 0, totalCompleted: 0, streak: 0,
      completedIds: [], currentRound: [], currentIdx: 0,
      roundScore: 0, roundResults: [], filterCat: 'all'
    };
  }

  function saveToStorage() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({
        totalPoints:    simState.totalPoints,
        totalCompleted: simState.totalCompleted,
        streak:         simState.streak,
        completedIds:   simState.completedIds
      }));
    } catch(e) {}
  }

  let simState = loadFromStorage();

  // ── Rank System ──
  function getRank(pts) {
    if (pts >= 2000) return '🏆 خبير';
    if (pts >= 1000) return '⭐ متقدم';
    if (pts >= 400)  return '📈 محترف';
    if (pts >= 100)  return '🌱 متطور';
    return 'مبتدئ';
  }

  // ── Render Lobby Cards ──
  function renderSimCards() {
    const grid = document.getElementById('sim-cards-grid');
    if (!grid) return;
    const allScen = Object.values(SCENARIOS);
    const filtered = simState.filterCat === 'all' ? allScen : allScen.filter(s => s.category === simState.filterCat);

    const catLabels = { callcenter:'📞 كول سنتر', sales:'💼 مبيعات', social:'📱 سوشيال ميديا', negotiation:'💼 تفاوض وظيفي', account:'🤝 أكونت منجر', repair:'🔧 مركز الصيانة', programming:'💻 برمجة نخبوية', accounting:'🧮 محاسبة احترافية' };
    const diffLabels = [,'سهل','متوسط','متوسط','صعب','خبير'];
    const diffColors = [,'green','yellow','yellow','red','red'];

    grid.innerHTML = filtered.map(s => {
      const done = simState.completedIds.includes(s.id);
      const dots = Array.from({length:5}, (_,i) => `<div class="sim-diff-dot ${i < s.difficulty ? 'on' : ''}"></div>`).join('');
      return `
        <div class="sim-scenario-card cat-${s.category} ${done ? 'completed' : ''}" onclick="startSingleScenario('${s.id}')">
          <div class="sim-card-title">${s.title}</div>
          <div class="sim-card-desc">${s.setup.substring(0,90)}...</div>
          <div class="sim-card-meta">
            <div class="sim-diff">${dots}</div>
            <span class="tag ${diffColors[s.difficulty]}">${diffLabels[s.difficulty]}</span>
            <span class="tag blue" style="font-size:9.5px;">${catLabels[s.category]}</span>
            ${done ? '<span class="tag green" style="font-size:9.5px;">✓ مكتمل</span>' : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  function filterSimCat(cat, btn) {
    simState.filterCat = cat;
    document.querySelectorAll('.sim-cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSimCards();
  }

  // ── Update Stats Display ──
  function updateSimStats() {
    const el = id => document.getElementById(id);
    if (el('sim-stat-total'))  el('sim-stat-total').textContent  = simState.totalCompleted;
    if (el('sim-stat-points')) el('sim-stat-points').textContent = simState.totalPoints;
    if (el('sim-stat-streak')) el('sim-stat-streak').textContent = simState.streak + '🔥';
    if (el('sim-stat-rank'))   el('sim-stat-rank').textContent   = getRank(simState.totalPoints);
  }

  // ── Start a single scenario by ID ──
  function startSingleScenario(id) {
    // Build a round starting with this scenario, then 4 random others from different categories
    const all = Object.keys(SCENARIOS).filter(k => k !== id);
    const shuffled = all.sort(() => Math.random() - 0.5).slice(0, 4);
    simState.currentRound = [id, ...shuffled];
    simState.currentIdx   = 0;
    simState.roundScore   = 0;
    simState.roundResults = [];
    showEngine();
    loadScenario();
  }

  function startNewRound() {
    const all = Object.keys(SCENARIOS).sort(() => Math.random() - 0.5).slice(0, 5);
    simState.currentRound = all;
    simState.currentIdx   = 0;
    simState.roundScore   = 0;
    simState.roundResults = [];
    showLobby();
    showEngine();
    loadScenario();
  }

  // ── View switching ──
  function showLobby()  { document.getElementById('sim-lobby').style.display='block'; document.getElementById('sim-engine').style.display='none'; document.getElementById('sim-report').style.display='none'; }
  function showEngine() { document.getElementById('sim-lobby').style.display='none'; document.getElementById('sim-engine').style.display='block'; document.getElementById('sim-report').style.display='none'; }
  function showReport() { document.getElementById('sim-lobby').style.display='none'; document.getElementById('sim-engine').style.display='none'; document.getElementById('sim-report').style.display='block'; }

  function exitSimulation() { showLobby(); updateSimStats(); renderSimCards(); }

  // ── Load current scenario into engine ──
  function loadScenario() {
    const sid = simState.currentRound[simState.currentIdx];
    const sc  = SCENARIOS[sid];
    if (!sc) return;

    const catLabels = { callcenter:'📞 كول سنتر', sales:'💼 مبيعات', social:'📱 سوشيال ميديا', negotiation:'💼 تفاوض وظيفي', account:'🤝 أكونت منجر', repair:'🔧 مركز الصيانة', programming:'💻 برمجة نخبوية', accounting:'🧮 محاسبة احترافية' };
    const diffLabels = [,'سهل','متوسط','متوسط','صعب','خبير'];
    const diffColors = [,'green','yellow','yellow','red','red'];

    // Meta
    document.getElementById('eng-meta').innerHTML = `
      <span class="tag blue">${catLabels[sc.category]}</span>
      <span class="tag ${diffColors[sc.difficulty]}">${diffLabels[sc.difficulty]}</span>
      <span style="font-size:12px; color:var(--text-muted); font-weight:600;">السيناريو ${simState.currentIdx + 1} من ${simState.currentRound.length}</span>
    `;

    // Content
    document.getElementById('eng-setup').textContent    = sc.setup;
    document.getElementById('eng-opener').textContent   = '«' + sc.dialogue_opener + '»';
    document.getElementById('eng-psych').textContent    = sc.psychological_context;

    // Progress bar
    const pct = (simState.currentIdx / simState.currentRound.length) * 100;
    document.getElementById('eng-progress-bar').style.width  = pct + '%';
    document.getElementById('eng-progress-text').textContent = simState.currentIdx + '/' + simState.currentRound.length;
    document.getElementById('eng-score-display').textContent = simState.roundScore;

    // Choices
    const letters = ['أ','ب','ج','د'];
    const shuffled = sc.choices.map((c,i) => ({...c, orig:i})).sort(() => Math.random() - 0.5);
    document.getElementById('eng-choices').innerHTML = shuffled.map((ch,i) => `
      <button class="eng-choice-btn" onclick="pickChoice('${sid}', ${ch.score}, ${ch.orig}, this, ${JSON.stringify(ch.feedback).replace(/"/g,'&quot;')})">
        <span class="choice-letter">${letters[i]}</span>
        <div>
          <div class="choice-text">${ch.text}</div>
          <div class="choice-feedback">${ch.feedback}</div>
        </div>
      </button>
    `).join('');

    // Hide feedback
    document.getElementById('eng-feedback-panel').style.display = 'none';
    document.getElementById('eng-choices-wrap').style.display   = 'block';

    // Update next button label
    const nextBtn = document.getElementById('eng-next-btn');
    if (simState.currentIdx === simState.currentRound.length - 1) {
      nextBtn.textContent = 'عرض التقرير النهائي 📊';
    } else {
      nextBtn.textContent = 'السيناريو التالي ←';
    }
  }

  // ── Handle choice pick ──
  function pickChoice(sid, score, origIdx, btn, feedback) {
    const sc = SCENARIOS[sid];
    const allBtns = document.querySelectorAll('.eng-choice-btn');

    // Disable all
    allBtns.forEach(b => b.disabled = true);

    // Mark best choice (score 100 or max)
    const maxScore = Math.max(...sc.choices.map(c => c.score));
    const bestOrigIdx = sc.choices.findIndex(c => c.score === maxScore);

    // Style chosen button
    const level = score >= 90 ? 'chosen-best' : score >= 55 ? 'chosen-good' : 'chosen-poor';
    btn.classList.add(level);

    // Show feedback text on chosen button
    btn.querySelector('.choice-feedback').style.display = 'block';

    // Highlight expert (best) choice if not already chosen
    if (origIdx !== bestOrigIdx) {
      allBtns.forEach(b => {
        // find the button that matches bestOrigIdx — we stored orig index in onclick
        const onclick = b.getAttribute('onclick') || '';
        if (onclick.includes(`, ${bestOrigIdx},`)) {
          b.classList.add('expert-mark');
          b.querySelector('.choice-feedback').style.display = 'block';
        }
      });
    }

    // Update score
    simState.roundScore += score;
    document.getElementById('eng-score-display').textContent = simState.roundScore;

    // Update streak
    if (score >= 90) { simState.streak++; } else { simState.streak = 0; }

    // Store result
    simState.roundResults.push({ title: sc.title, score, max: maxScore });
    saveToStorage();
    updateFooter();

    // Show feedback panel
    const icons = { 'chosen-best':'✅', 'chosen-good':'💡', 'chosen-poor':'❌' };
    const titles = { 'chosen-best':'إجابة ممتازة!', 'chosen-good':'إجابة جيدة', 'chosen-poor':'يمكن التحسين' };
    const fcColors = { 'chosen-best':'#22C55E', 'chosen-good':'#EAB308', 'chosen-poor':'#EF4444' };

    const bestChoice = sc.choices[bestOrigIdx];

    document.getElementById('eng-feedback-icon').textContent = icons[level];
    document.getElementById('eng-score-gained').textContent  = '+' + score + ' نقطة';
    document.getElementById('eng-score-gained').style.color  = fcColors[level];
    document.getElementById('eng-feedback-title').textContent = titles[level];
    document.getElementById('eng-feedback-card').style.borderColor = fcColors[level];
    document.getElementById('eng-consequence').textContent   = '«' + bestChoice.consequence + '»';
    document.getElementById('eng-expert').textContent        = sc.expert_move;
    document.getElementById('eng-principle').textContent     = sc.principle;

    document.getElementById('eng-choices-wrap').style.display   = 'none';
    document.getElementById('eng-feedback-panel').style.display = 'block';

    // Scroll to feedback
    document.getElementById('eng-feedback-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ── Next scenario ──
  function nextScenario() {
    simState.currentIdx++;
    if (simState.currentIdx >= simState.currentRound.length) {
      finishRound();
    } else {
      loadScenario();
      document.getElementById('sim-engine').scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ── Finish round & show report ──
  function finishRound() {
    // Update totals
    simState.totalPoints    += simState.roundScore;
    simState.totalCompleted += simState.currentRound.length;
    simState.currentRound.forEach(id => {
      if (!simState.completedIds.includes(id)) simState.completedIds.push(id);
    });
    saveToStorage();
    updateFooter();

    const maxPossible = simState.roundResults.reduce((a,r) => a + r.max, 0);
    const excellent   = simState.roundResults.filter(r => r.score >= r.max * 0.9).length;
    const pct         = maxPossible > 0 ? Math.round((simState.roundScore / maxPossible) * 100) : 0;

    // Pick emoji + title based on performance
    let emoji, title, subtitle;
    if (pct >= 85)      { emoji = '🏆'; title = 'أداء استثنائي!';   subtitle = 'أنت تتصرف كالخبراء — استمر في هذا المستوى.'; }
    else if (pct >= 65) { emoji = '⭐'; title = 'أداء جيد جداً';    subtitle = 'بعض القرارات كانت مثالية. راجع تصرف الخبير في النقاط الأقل.'; }
    else if (pct >= 40) { emoji = '📈'; title = 'في طريق التحسّن';  subtitle = 'الممارسة تصنع الفارق — كل سيناريو يُضيف خبرة حقيقية.'; }
    else                { emoji = '💡'; title = 'درس قيّم';          subtitle = 'راجع مبادئ الخبير في كل سيناريو — كنز تدريبي حقيقي.'; }

    document.getElementById('report-emoji').textContent    = emoji;
    document.getElementById('report-title').textContent    = title;
    document.getElementById('report-subtitle').textContent = subtitle;
    document.getElementById('report-score').textContent    = simState.roundScore;
    document.getElementById('report-correct').textContent  = excellent + '/' + simState.currentRound.length;
    document.getElementById('report-accuracy').textContent = pct + '%';

    // Breakdown rows
    document.getElementById('report-breakdown').innerHTML = `
      <div style="font-size:10px; font-weight:800; letter-spacing:1px; text-transform:uppercase; color:var(--text-faint); margin-bottom:10px;">تفاصيل الجولة</div>
      ${simState.roundResults.map(r => {
        const perf = r.score >= r.max * 0.9 ? { color:'#22C55E', label:'ممتاز ✓' } : r.score >= r.max * 0.5 ? { color:'#EAB308', label:'جيد ~' } : { color:'#EF4444', label:'يحتاج تحسين ✗' };
        return `<div class="report-row">
          <span style="color:var(--text);">${r.title}</span>
          <span style="color:${perf.color}; font-weight:700; font-size:12px;">${r.score}/${r.max} — ${perf.label}</span>
        </div>`;
      }).join('')}
    `;

    updateSimStats();
    showReport();
  }

  // Initialize lobby on page load
  document.addEventListener('DOMContentLoaded', () => {
    renderSimCards();
    updateSimStats();
  });

  // renderSimCards on lab nav — handled by unified nav listener below

  // ---- BLOCK B: Crisis Accordion ----
  function toggleCrisis(n) {
    const el = document.getElementById('cp-' + n);
    if (!el) return;
    const isOpen = el.classList.contains('cp-open');
    document.querySelectorAll('.crisis-phase').forEach(p => p.classList.remove('cp-open'));
    if (!isOpen) el.classList.add('cp-open');
  }

  // ---- BLOCK C: Engagement Rate Calculator ----
  const ER_BENCHMARKS = {
    instagram:  [{ label: 'ضعيف', range: '< 1٪', color: '#EF4444' }, { label: 'متوسط', range: '1٪ – 3٪', color: '#EAB308' }, { label: 'جيد', range: '3٪ – 6٪', color: '#22C55E' }, { label: 'ممتاز', range: '> 6٪', color: 'var(--accent)' }],
    linkedin:   [{ label: 'ضعيف', range: '< 0.5٪', color: '#EF4444' }, { label: 'متوسط', range: '0.5٪ – 1٪', color: '#EAB308' }, { label: 'جيد', range: '1٪ – 3٪', color: '#22C55E' }, { label: 'ممتاز', range: '> 3٪', color: 'var(--accent)' }],
    twitter:    [{ label: 'ضعيف', range: '< 0.3٪', color: '#EF4444' }, { label: 'متوسط', range: '0.3٪ – 1٪', color: '#EAB308' }, { label: 'جيد', range: '1٪ – 3٪', color: '#22C55E' }, { label: 'ممتاز', range: '> 3٪', color: 'var(--accent)' }],
    tiktok:     [{ label: 'ضعيف', range: '< 3٪', color: '#EF4444' }, { label: 'متوسط', range: '3٪ – 6٪', color: '#EAB308' }, { label: 'جيد', range: '6٪ – 12٪', color: '#22C55E' }, { label: 'ممتاز', range: '> 12٪', color: 'var(--accent)' }]
  };

  let erPlatform = 'instagram';

  function selectERPlatform(p, btn) {
    erPlatform = p;
    document.querySelectorAll('.er-platform-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    calcER();
  }

  function calcER() {
    const followers = parseFloat(document.getElementById('er-followers')?.value) || 0;
    const likes     = parseFloat(document.getElementById('er-likes')?.value) || 0;
    const comments  = parseFloat(document.getElementById('er-comments')?.value) || 0;
    const shares    = parseFloat(document.getElementById('er-shares')?.value) || 0;

    const scoreEl   = document.getElementById('er-score');
    const verdictEl = document.getElementById('er-verdict');
    const gaugeWrap = document.getElementById('er-gauge-wrap');
    const gaugeBar  = document.getElementById('er-gauge-bar');
    const gaugeMarker = document.getElementById('er-gauge-marker');
    const benchEl   = document.getElementById('er-benchmarks');
    const benchList = document.getElementById('er-benchmark-list');

    if (!scoreEl) return;

    if (followers <= 0) {
      scoreEl.textContent = '—';
      scoreEl.style.color = 'var(--text-faint)';
      verdictEl.textContent = 'المعدل يُقاس بـ: (إعجابات + تعليقات + مشاركات) ÷ متابعين × 100';
      gaugeWrap.style.display = 'none';
      benchEl.style.display = 'none';
      return;
    }

    const er = ((likes + comments + shares) / followers) * 100;
    const erFixed = er.toFixed(2);
    scoreEl.textContent = erFixed + '٪';

    // Thresholds per platform
    const thresholds = {
      instagram: [1, 3, 6],
      linkedin:  [0.5, 1, 3],
      twitter:   [0.3, 1, 3],
      tiktok:    [3, 6, 12]
    };

    const [t1, t2, t3] = thresholds[erPlatform];
    let verdict, color, level;

    if (er < t1)      { verdict = `معدل ضعيف مقارنةً بمعايير ${erPlatform}. ركّز على تحسين جودة المحتوى وأوقات النشر.`; color = '#EF4444'; level = 0.1; }
    else if (er < t2) { verdict = `معدل متوسط — قاعدتك مستقرة. يمكن تحسينه بخطافات أقوى ودعوات للتفاعل.`; color = '#EAB308'; level = 0.35; }
    else if (er < t3) { verdict = `معدل جيد! أنت فوق المعدل العام. واصل ما تفعله وحلّل المنشورات الأفضل أداءً.`; color = '#22C55E'; level = 0.65; }
    else              { verdict = `معدل ممتاز 🏆 — أنت في أعلى ٥٪ على هذه المنصة. وثّق ما ينجح وكرّره.`; color = 'var(--accent)'; level = 0.9; }

    scoreEl.style.color = color;
    verdictEl.innerHTML = `<strong style="color:${color}; display:block; margin-bottom:4px;">${verdict}</strong>
      <span style="font-size:11px;">المعادلة: (${likes} + ${comments} + ${shares}) ÷ ${followers} × 100 = ${erFixed}٪</span>`;

    gaugeWrap.style.display = 'block';
    gaugeBar.style.width = Math.min(level * 100, 98) + '%';
    gaugeMarker.style.right = Math.min(100 - level * 100 - 1, 97) + '%';
    benchEl.style.display = 'block';

    const benches = ER_BENCHMARKS[erPlatform];
    benchList.innerHTML = benches.map(b => `
      <div class="er-benchmark-item">
        <span style="color:var(--text);">${b.label}</span>
        <span style="font-weight:700; color:${b.color};">${b.range}</span>
      </div>`).join('');
  }

  // ---- BLOCK D: Smart Calendar ----
  const WEEK_DAYS = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

  const CAL_POSTS_INIT = [
    { day: 0, type: 'edu', label: '📚 تعليمي — LinkedIn', platform: 'linkedin' },
    { day: 1, type: 'edu', label: '📚 كاروسيل انستجرام', platform: 'instagram' },
    { day: 2, type: 'ent', label: '🎭 خيط تويتر', platform: 'twitter' },
    { day: 3, type: 'edu', label: '📚 تعليمي — TikTok', platform: 'tiktok' },
    { day: 4, type: 'edu', label: '📚 مقال لينكدإن', platform: 'linkedin' },
    { day: 4, type: 'ent', label: '🎭 ريل انستجرام', platform: 'instagram' },
    { day: 5, type: 'promo', label: '📣 ترويجي', platform: 'instagram' },
  ];

  let calWeekOffset = 0;
  let calPosts = JSON.parse(JSON.stringify(CAL_POSTS_INIT));

  function renderSmartCalendar() {
    const grid = document.getElementById('smartCalGrid');
    if (!grid) return;

    const now = new Date(2026, 4, 8); // May 8 2026
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + (calWeekOffset * 7));

    let html = WEEK_DAYS.map(d => `<div class="smart-cal-day-header">${d}</div>`).join('');

    for (let d = 0; d < 7; d++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + d);
      const dateNum = day.getDate();
      const isToday = day.toDateString() === now.toDateString();
      const dayPosts = calPosts.filter(p => p.day === d);

      html += `<div class="smart-cal-cell${isToday ? ' today-cell' : ''}">
        <div class="smart-cal-date">${dateNum}</div>
        ${dayPosts.map(p => `<span class="smart-post-pill ${p.type}" title="${p.label}">${p.label}</span>`).join('')}
      </div>`;
    }

    grid.innerHTML = html;

    // Update header
    const opts = { month: 'long', year: 'numeric' };
    const headerEl = document.querySelector('.smart-cal-header div:first-child');
    if (headerEl) {
      const endDay = new Date(weekStart); endDay.setDate(weekStart.getDate() + 6);
      headerEl.textContent = `الأسبوع: ${weekStart.getDate()} – ${endDay.getDate()} ${endDay.toLocaleString('ar', opts)}`;
    }
  }

  function prevCalWeek() { calWeekOffset--; renderSmartCalendar(); }
  function nextCalWeek() { calWeekOffset++; renderSmartCalendar(); }

  function addCalPost() {
    const types = ['edu', 'ent', 'promo'];
    const labels = {
      edu: ['📚 تعليمي', '📚 كيف تفعل', '📚 نصيحة', '📚 إحصاء'],
      ent: ['🎭 ترفيهي', '🎭 كواليس', '🎭 استفتاء'],
      promo: ['📣 ترويجي', '📣 عرض خاص']
    };
    const platforms = ['instagram', 'linkedin', 'twitter', 'tiktok'];
    const type = types[Math.floor(Math.random() * types.length)];
    const labelArr = labels[type];
    const label = labelArr[Math.floor(Math.random() * labelArr.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const day = Math.floor(Math.random() * 7);
    calPosts.push({ day, type, label: `${label} — ${platform}`, platform });
    renderSmartCalendar();
  }

  /* ============================================================
     BLOCK E2 — USER STATS localStorage
  ============================================================ */
  const USER_LS_KEY = 'training_user_v1';
  function getUserStats() {
    try {
      const s = localStorage.getItem(USER_LS_KEY);
      if (s) return JSON.parse(s);
    } catch(e) {}
    return { points: 4780, scenarios: 23, hours: 14, streak: 7 };
  }
  function saveUserStats(data) {
    try { localStorage.setItem(USER_LS_KEY, JSON.stringify(data)); } catch(e) {}
  }

  /* ============================================================
     BLOCK F — DASHBOARD STATS ANIMATION (count-up)
  ============================================================ */
  function animateCountUp(el, target, suffix = '', duration = 1200) {
    if (!el) return;
    const start = 0;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString('ar-EG') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function runDashboardCounters() {
    const stats = getUserStats();
    // Merge sim points if available
    const totalPts = simState.totalPoints > 0 ? simState.totalPoints + 4780 : stats.points;
    const totalSc  = simState.totalCompleted > 0 ? simState.totalCompleted + 23 : stats.scenarios;
    animateCountUp(document.getElementById('dash-stat-points'),    totalPts, ' نقطة');
    animateCountUp(document.getElementById('dash-stat-scenarios'), totalSc,  ' سيناريو');
    animateCountUp(document.getElementById('dash-stat-time'),      stats.hours,  ' ساعة');
    animateCountUp(document.getElementById('dash-stat-streak'),    Math.max(simState.streak, stats.streak), ' أيام');
  }

  /* ============================================================
     BLOCK G — DAILY QUOTE ROTATOR
  ============================================================ */
  const DAILY_QUOTES = [
    { text: 'المهارة تُبنى بالتكرار — والتميّز يُبنى بالانعكاس.', author: 'بيتر دراكر' },
    { text: 'كل اعتراض هو دعوة للمزيد من المعلومات.', author: 'براين تريسي' },
    { text: 'العميل لا يشتري منتجاً — يشتري نسخة أفضل من نفسه.', author: 'ستيف جوبز' },
    { text: 'أسرع طريق للنجاح: أن تجعل كل من حولك ناجحاً.', author: 'زيغ زيغلر' },
    { text: 'الثقة لا تُبنى بالكلمات بل بالأفعال المتسقة عبر الزمن.', author: 'ستيفن كوفي' },
    { text: 'الفرق بين الخبير والمبتدئ: الخبير فشل أكثر مرة.', author: 'مالكولم غلادويل' },
    { text: 'لا يُقرّر العميل بمنطقه — يُقرّر بمشاعره ويُسوّغ بمنطقه.', author: 'دانيال كانيمان' },
  ];

  function renderDailyQuote() {
    const dayIdx = new Date().getDay() % DAILY_QUOTES.length;
    const q = DAILY_QUOTES[dayIdx];
    const el = document.getElementById('daily-quote-text');
    const auth = document.getElementById('daily-quote-author');
    if (el) el.textContent = '«' + q.text + '»';
    if (auth) auth.textContent = '— ' + q.author;
  }

  /* ============================================================
     BLOCK H — SMART NOTIFICATIONS
  ============================================================ */
  const SMART_NOTIFS = [
    { icon: '🎯', color: '#66FCF1', title: 'هدفك اليوم', body: 'أكمل سيناريو واحد لتحافظ على streak أسبوعك!' },
    { icon: '🏆', color: '#EAB308', title: 'إنجاز قريب', body: 'نقطتان فقط تفصلانك عن شارة «المحاور الذهبي».' },
    { icon: '📈', color: '#22C55E', title: 'تقدم رائع', body: 'أتممت ٧ سيناريوهات هذا الأسبوع — أنت الأفضل في فريقك.' },
  ];

  function renderSmartNotifs() {
    const wrap = document.getElementById('smart-notifs-wrap');
    if (!wrap) return;
    wrap.innerHTML = SMART_NOTIFS.map(n => `
      <div class="smart-notif">
        <div class="smart-notif-icon" style="background:${n.color}22; border:1px solid ${n.color}44; color:${n.color}; font-size:18px;">${n.icon}</div>
        <div>
          <div style="font-size:12.5px; font-weight:700; color:var(--text); margin-bottom:2px;">${n.title}</div>
          <div style="font-size:11.5px; color:var(--text-muted);">${n.body}</div>
        </div>
      </div>`).join('');
  }

  /* ============================================================
     BLOCK I — TOP 3 QUICK-START MODULES
  ============================================================ */
  const QUICK_MODULES = [
    { icon: '📞', color: '#66FCF1', name: 'استقبال العميل المثالي', unit: 'كول سنتر', time: '٨ دقائق', page: 'callcenter' },
    { icon: '🤝', color: '#8B5CF6', name: 'رد الاعتراض بذكاء', unit: 'مبيعات ميدانية', time: '١٢ دقيقة', page: 'field' },
    { icon: '🔥', color: '#F97316', name: 'إدارة التعليقات السلبية', unit: 'سوشيال ميديا', time: '١٠ دقائق', page: 'social' },
  ];

  function renderQuickModules() {
    const wrap = document.getElementById('quick-modules-wrap');
    if (!wrap) return;
    wrap.innerHTML = QUICK_MODULES.map((m, i) => `
      <div class="quick-module" onclick="navigatePage('${m.page}')" tabindex="0" role="button" aria-label="ابدأ ${m.name}">
        <div class="quick-module-rank">${i + 1}</div>
        <div class="quick-module-icon" style="background:${m.color}18; font-size:20px;">${m.icon}</div>
        <div style="flex:1; min-width:0;">
          <div style="font-size:13px; font-weight:700; color:var(--text); margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${m.name}</div>
          <div style="font-size:11px; color:var(--text-muted);">${m.unit} · ${m.time}</div>
        </div>
        <div style="color:var(--accent); font-size:18px; flex-shrink:0;">→</div>
      </div>`).join('');
  }

  /* ============================================================
     BLOCK J — BADGES SYSTEM (8 badges)
  ============================================================ */
  const BADGES_DEF = [
    { id: 'first_step',   emoji: '🚀', name: 'الخطوة الأولى',     desc: 'أكمل سيناريوهك الأول',           unlocked: true,  color: '#66FCF1' },
    { id: 'hot_streak',   emoji: '🔥', name: 'streak أسبوعي',     desc: 'تدرّب ٧ أيام متتالية',            unlocked: true,  color: '#F97316' },
    { id: 'gold_talker',  emoji: '🏆', name: 'المحاور الذهبي',    desc: 'أتم ٢٠ سيناريو بنجاح',           unlocked: false, color: '#EAB308', progress: 92 },
    { id: 'crisis_hero',  emoji: '🛡️', name: 'بطل الأزمات',       desc: 'أجب على ٣ مواقف أزمة بنتيجة ١٠٠٪', unlocked: false, color: '#EF4444', progress: 67 },
    { id: 'speed_reader', emoji: '⚡', name: 'سريع القراءة',       desc: 'أتم وحدة كاملة في أقل من ٣٠ دق', unlocked: true,  color: '#0EA5E9' },
    { id: 'social_guru',  emoji: '📱', name: 'خبير السوشيال',     desc: 'أكمل جميع سيناريوهات السوشيال',   unlocked: false, color: '#EC4899', progress: 33 },
    { id: 'top_scorer',   emoji: '💎', name: 'الأعلى درجةً',       desc: 'احصل على ١٠٠٪ في ٥ سيناريوهات', unlocked: false, color: '#8B5CF6', progress: 40 },
    { id: 'early_bird',   emoji: '🌅', name: 'الطائر الباكر',      desc: 'تدرّب قبل ٩ صباحاً ٥ مرات',      unlocked: true,  color: '#22C55E' },
  ];

  function renderBadges() {
    const wrap = document.getElementById('badges-grid');
    if (!wrap) return;
    wrap.innerHTML = BADGES_DEF.map(b => `
      <div class="badge-card ${b.unlocked ? 'badge-unlocked' : 'badge-locked'}" title="${b.desc}" tabindex="0" role="img" aria-label="${b.name} — ${b.unlocked ? 'مفتوح' : 'مقفل'}">
        <div class="badge-glow" style="background:${b.color};"></div>
        <div class="badge-emoji" style="filter:${b.unlocked ? 'none' : 'grayscale(1) opacity(0.4)'};">${b.emoji}</div>
        <div class="badge-name" style="color:${b.unlocked ? b.color : 'var(--text-faint)'};">${b.name}</div>
        <div class="badge-desc">${b.desc}</div>
        ${!b.unlocked && b.progress ? `
          <div class="badge-progress-wrap">
            <div class="badge-progress-bar" style="width:${b.progress}%; background:${b.color};"></div>
          </div>
          <div style="font-size:10px; color:var(--text-faint); text-align:center;">${b.progress}٪</div>` : ''}
        ${b.unlocked ? `<div class="badge-check" style="color:${b.color};">✓ مفتوح</div>` : ''}
      </div>`).join('');
  }

  function showBadgeNotification(badge) {
    const notif = document.getElementById('badge-toast');
    if (!notif) return;
    notif.querySelector('.badge-toast-emoji').textContent = badge.emoji;
    notif.querySelector('.badge-toast-name').textContent = badge.name;
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 3500);
  }

  /* ============================================================
     BLOCK K — SKELETON LOADING
  ============================================================ */
  function showSkeletons(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const skels = section.querySelectorAll('.skel-item');
    skels.forEach(s => s.classList.add('loading'));
    setTimeout(() => skels.forEach(s => s.classList.remove('loading')), 800);
  }

  /* ============================================================
     BLOCK L — SMART FOOTER UPDATE
  ============================================================ */
  function updateFooter() {
    const el  = document.getElementById('footer-progress-text');
    const ver = document.getElementById('footer-version');

    if (el) {
      // Read from simulation engine storage
      let scenarios = 0, points = 0, hours = 0;
      try {
        const eng = JSON.parse(localStorage.getItem('training_platform_v1') || '{}');
        scenarios = eng.totalCompleted || 0;
        points    = eng.totalPoints    || 0;
      } catch(e) {}
      try {
        const usr = JSON.parse(localStorage.getItem('training_user_v1') || '{}');
        hours = usr.hours || 0;
      } catch(e) {}

      const parts = [];
      if (scenarios > 0) parts.push(`${scenarios.toLocaleString('ar-EG')} سيناريو مكتمل`);
      if (hours     > 0) parts.push(`${hours.toLocaleString('ar-EG')} ساعة تعلّم`);
      if (points    > 0) parts.push(`${points.toLocaleString('ar-EG')} نقطة`);
      el.textContent = parts.length ? parts.join(' · ') : 'ابدأ رحلة التعلّم الآن 🚀';
    }

    if (ver) ver.textContent = 'v2.4.1 — مايو ٢٠٢٦';
  }

  /* ============================================================
     BLOCK M — KEYBOARD SHORTCUTS
  ============================================================ */
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case '1': e.preventDefault(); navigatePage('dashboard'); break;
        case '2': e.preventDefault(); navigatePage('callcenter'); break;
        case '3': e.preventDefault(); navigatePage('field'); break;
        case '4': e.preventDefault(); navigatePage('social'); break;
        case '5': e.preventDefault(); navigatePage('lab'); break;
        case '/': e.preventDefault(); document.querySelector('.topbar-search input')?.focus(); break;
      }
    }
    if (e.key === 'Escape') {
      document.querySelector('.topbar-search input')?.blur();
    }
  });

  /* ============================================================
     BLOCK N — SMOOTH SCROLL BETWEEN SECTIONS
  ============================================================ */
  function smoothScrollTo(targetId) {
    const main = document.getElementById('main');
    const target = document.getElementById(targetId);
    if (main && target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ============================================================
     BLOCK O — FOCUS STATES (accessibility)
  ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    // Add focus-visible polyfill behavior
    document.querySelectorAll('button, [tabindex="0"], .nav-item, .module-card, .quick-module').forEach(el => {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      });
    });
  });

  /* ============================================================
     BLOCK P — INIT ALL ON DOMContentLoaded
  ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    renderDailyQuote();
    renderSmartNotifs();
    renderQuickModules();
    renderBadges();
    updateFooter();

    // Animate counters when dashboard is visible
    const dashObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) runDashboardCounters(); });
    }, { threshold: 0.1 });
    const dashCounters = document.getElementById('dash-user-stats');
    if (dashCounters) dashObs.observe(dashCounters);

    // Demo: show badge unlock after 3.5s
    setTimeout(() => showBadgeNotification(BADGES_DEF[2]), 3500);
  });

  // ── Unified nav listener — single attachment for all page-specific init ──
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      if (page === 'dashboard')  setTimeout(() => { renderDailyQuote(); renderSmartNotifs(); renderQuickModules(); runDashboardCounters(); }, 100);
      if (page === 'callcenter') setTimeout(renderQuiz, 50);
      if (page === 'fieldsales') setTimeout(() => selectStage(1), 80);
      if (page === 'social')     setTimeout(() => { renderHookPanel(); renderSmartCalendar(); }, 80);
      if (page === 'lab')        setTimeout(() => { renderSimCards(); updateSimStats(); }, 80);
    });
  });

  function navigatePage(page) {
    const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (navItem) navItem.click();
  }

  // ── Mobile sidebar ──
  function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const isOpen  = sidebar.classList.contains('open');
    if (isOpen) { closeMobileSidebar(); }
    else { sidebar.classList.add('open'); overlay.classList.add('visible'); }
  }
  function closeMobileSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('visible');
  }
  // Close sidebar on nav click (mobile)
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeMobileSidebar();
    });
  });

/* ===== JS block #5 (id: block-5) ===== */
(function() {
  var ov = document.getElementById('loading-overlay');
  if (!ov) return;
  setTimeout(function() {
    ov.style.opacity = '0';
    ov.style.pointerEvents = 'none';
    setTimeout(function() { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 650);
  }, 2000);
})();

/* ===== JS block #6 (id: block-6) ===== */
/* Inject dashboard enhancements after page-dashboard loads */
document.addEventListener('DOMContentLoaded', () => {
  const dashPage = document.getElementById('page-dashboard');
  if (!dashPage) return;

  /* 1. User personal stats row */
  const userStatsHTML = `
    <div id="dash-user-stats" style="margin-bottom:22px;">
      <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--text-faint); margin-bottom:12px;">إحصائياتك الشخصية</div>
      <div class="grid-4">
        <div class="dash-user-stat">
          <div class="dash-user-stat-icon">⭐</div>
          <div class="dash-user-stat-val" id="dash-stat-points">0 نقطة</div>
          <div class="dash-user-stat-lbl">نقاطك المكتسبة</div>
        </div>
        <div class="dash-user-stat">
          <div class="dash-user-stat-icon">✅</div>
          <div class="dash-user-stat-val" id="dash-stat-scenarios">0 سيناريو</div>
          <div class="dash-user-stat-lbl">سيناريوهات مكتملة</div>
        </div>
        <div class="dash-user-stat">
          <div class="dash-user-stat-icon">🕐</div>
          <div class="dash-user-stat-val" id="dash-stat-time">0 ساعة</div>
          <div class="dash-user-stat-lbl">وقت التعلم هذا الأسبوع</div>
        </div>
        <div class="dash-user-stat">
          <div class="dash-user-stat-icon">🔥</div>
          <div class="dash-user-stat-val" id="dash-stat-streak">0 أيام</div>
          <div class="dash-user-stat-lbl">streak متتالية</div>
        </div>
      </div>
    </div>`;

  /* 2. Daily quote */
  const quoteHTML = `
    <div class="daily-quote-card">
      <div style="font-size:10px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:var(--accent); margin-bottom:10px; opacity:0.8;">💡 اقتباس اليوم التنفيذي</div>
      <div id="daily-quote-text"></div>
      <div id="daily-quote-author"></div>
    </div>`;

  /* 3. Smart notifications */
  const notifsHTML = `
    <div class="card" style="margin-bottom:22px;">
      <div class="card-title">إشعارات ذكية</div>
      <div id="smart-notifs-wrap" style="display:flex; flex-direction:column; gap:10px;"></div>
    </div>`;

  /* 4. Quick start modules (top 3) */
  const quickHTML = `
    <div class="card" style="margin-bottom:22px;">
      <div class="card-title">أسرع الوحدات للبدء</div>
      <div id="quick-modules-wrap" style="display:flex; flex-direction:column; gap:10px; margin-top:4px;"></div>
    </div>`;

  /* 5. Badges section */
  const badgesHTML = `
    <div class="card" style="margin-top:22px;">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
        <div class="card-title" style="margin-bottom:0;">الشارات والإنجازات</div>
        <span class="tag accent">٤ مفتوحة / ٨</span>
      </div>
      <div id="badges-grid" class="badges-wrap"></div>
    </div>`;

  /* Inject after page-header */
  const header = dashPage.querySelector('.page-header');
  if (header) {
    header.insertAdjacentHTML('afterend', quoteHTML + userStatsHTML);
  }

  /* Inject before the welcome-banner's next sibling (grid-4 stats row) */
  const grid4 = dashPage.querySelector('.grid-4');
  if (grid4) {
    grid4.insertAdjacentHTML('beforebegin', `<div class="grid-2" style="margin-bottom:22px;">` +
      `<div>${notifsHTML}</div><div>${quickHTML}</div></div>`);
  }

  /* Inject badges at bottom of dashboard */
  dashPage.insertAdjacentHTML('beforeend', badgesHTML);

  /* Now render content */
  renderDailyQuote();
  renderSmartNotifs();
  renderQuickModules();
  renderBadges();
  runDashboardCounters();
});

/* ===== JS block #7 (id: block-7) ===== */
/* ============================================================
   NEW PAGES — INTERACTIVE JS
============================================================ */

/* EQ Assessment Sliders */
function updateEQBar(index, value) {
  const bar = document.getElementById('eq-bar-' + index);
  const val = document.getElementById('eq-val-' + index);
  if (bar) bar.style.width = (value * 10) + '%';
  if (val) val.textContent = value + '/10';
  updateEQTotal();
}

function updateEQTotal() {
  let total = 0;
  for (let i = 1; i <= 5; i++) {
    const slider = document.querySelector(`#eq-assessment input[type="range"]:nth-of-type(${i})`);
    // simpler: get all sliders
  }
  const sliders = document.querySelectorAll('#eq-assessment input[type="range"]');
  sliders.forEach(s => total += parseInt(s.value));
  const avg = (total / 5).toFixed(1);
  const box = document.getElementById('eq-result-box');
  const score = document.getElementById('eq-total-score');
  const label = document.getElementById('eq-result-label');
  if (!box) return;
  box.style.display = 'block';
  if (score) score.textContent = avg + ' / 10';
  if (label) {
    if (avg >= 8) label.textContent = '🌟 ذكاء عاطفي عالٍ جداً — أنت في أفضل 10%';
    else if (avg >= 6) label.textContent = '✅ جيد — مع تمرين مستمر ستتطور بسرعة';
    else if (avg >= 4) label.textContent = '📈 متوسط — لديك فرصة تطوير ضخمة';
    else label.textContent = '🌱 بداية رحلة — الوعي بنفسه خطوة كبيرة';
  }
}

// Initialize EQ bars on page load
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 1; i <= 5; i++) updateEQBar(i, 5);
});

/* Service Checklist */
function checkServiceItem(checkbox) {
  const label = checkbox.closest('label');
  if (label) {
    if (checkbox.checked) {
      label.style.borderColor = 'rgba(102,252,241,0.4)';
      label.style.background = 'var(--accent-dim)';
      label.style.color = 'var(--text)';
    } else {
      label.style.borderColor = 'var(--border)';
      label.style.background = 'var(--surface-2)';
      label.style.color = 'var(--text-muted)';
    }
  }
  updateServiceScore();
}

function updateServiceScore() {
  const checks = document.querySelectorAll('#service-checklist input[type="checkbox"]');
  let checked = 0;
  checks.forEach(c => { if (c.checked) checked++; });
  const total = checks.length;
  const pct = Math.round((checked / total) * 100);
  const display = document.getElementById('service-score-display');
  if (!display) return;
  let emoji = '🌱', msg = 'ابدأ التحقق من القائمة';
  if (pct === 100)      { emoji = '🏆'; msg = 'خدمة استثنائية — أنت في المستوى الذهبي!'; }
  else if (pct >= 75)   { emoji = '⭐'; msg = 'ممتاز — بضع خطوات أكثر للكمال'; }
  else if (pct >= 50)   { emoji = '✅'; msg = 'جيد — استمر في تحسين بقية النقاط'; }
  else if (pct > 0)     { emoji = '📈'; msg = 'بداية جيدة — ركّز على النقاط المتبقية'; }
  display.innerHTML = `<span style="font-size:22px;">${emoji}</span> <strong style="color:var(--text);">${checked}/${total} نقطة (${pct}%)</strong> <span style="color:var(--text-muted);">— ${msg}</span>`;
  display.style.borderColor = pct === 100 ? 'var(--border-hover)' : 'var(--border)';
  display.style.background = pct === 100 ? 'var(--accent-dim)' : 'var(--surface-2)';
}

/* Keyboard shortcuts for new pages */
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === '7') { e.preventDefault(); document.querySelector('.nav-item[data-page="eq"]')?.click(); }
    if (e.key === '8') { e.preventDefault(); document.querySelector('.nav-item[data-page="negotiation"]')?.click(); }
    if (e.key === '9') { e.preventDefault(); document.querySelector('.nav-item[data-page="customercare"]')?.click(); }
  }
});

/* Update dashboard table with new units */
document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.querySelector('#page-dashboard .data-table tbody');
  if (!tbody) return;
  const newRows = `
    <tr>
      <td class="fw-700" style="color:var(--text)">الذكاء العاطفي</td>
      <td>47</td>
      <td>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="progress-bar" style="width:120px"><div class="progress-fill" style="width:52%;background:linear-gradient(90deg,#EC4899,#8B5CF6)"></div></div>
          <span>52%</span>
        </div>
      </td>
      <td class="text-accent">4.8 ★</td>
      <td><span class="tag accent">جديد</span></td>
    </tr>
    <tr>
      <td class="fw-700" style="color:var(--text)">المفاوضات</td>
      <td>33</td>
      <td>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="progress-bar" style="width:120px"><div class="progress-fill" style="width:38%;background:linear-gradient(90deg,#F97316,#EAB308)"></div></div>
          <span>38%</span>
        </div>
      </td>
      <td class="text-accent">4.9 ★</td>
      <td><span class="tag accent">جديد</span></td>
    </tr>
    <tr>
      <td class="fw-700" style="color:var(--text)">خدمة العملاء</td>
      <td>58</td>
      <td>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="progress-bar" style="width:120px"><div class="progress-fill" style="width:44%;background:linear-gradient(90deg,#22C55E,#0EA5E9)"></div></div>
          <span>44%</span>
        </div>
      </td>
      <td class="text-accent">5.0 ★</td>
      <td><span class="tag accent">جديد</span></td>
    </tr>`;
  tbody.insertAdjacentHTML('beforeend', newRows);
});

/* ===== JS block #8 (id: block-8) ===== */
/* v12-ADD: Quiz System Engine */
    (function(){
      let currentQuiz = null;
      let currentQ = 0;
      let answers = [];
      let showingFeedback = false;

      const quizData = {
        'page-callcenter': {
          title: 'اختبار الكول سنتر',
          questions: [
            {q:'ما أهم شيء تفعله في أول 10 ثوانٍ من المكالمة؟', opts:['تعريف باسمك والشركة فقط','إظهار التعاطف وبناء ثقة فورية','سؤال العميل عن رقم حسابه','البدء بعرض الحل مباشرة'], correct:1, feedback:'أول 10 ثوانٍ تُحدد نبرة المكالمة كاملة — التعاطف أولاً ثم المعلومات.'},
            {q:'عميل يقول: "أنتم دايم نفس المشاكل!" — ما أفضل رد؟', opts:['أعتذر بشدة وأقول ما يتكرر','أقول: أفهم إحباطك وهذا ما المفروض يصير — خلني أتأكد نحله نهائياً','أطلب منه يهدأ عشان أقدر أساعده','أحوّله للمشرف مباشرة'], correct:1, feedback:'الاعتراف بالمشكلة + التعهد بالحل = أقوى رد. لا تدافع ولا تبرر.'},
            {q:'أي دفاع نفسي يستخدمه عميل يقول "ما أحتاج خدمتكم أصلاً" بعد شكوى طويلة؟', opts:['الإثبات الاجتماعي','الإنكار (Denial)','الندم الاستباقي','مفارقة الاختيار'], correct:1, feedback:'الإنكار — ينفي الحاجة كدفاع ضد شعوره بالإحباط. لا تواجهه، بل استدرجه بسؤال.'},
            {q:'ما هو "التسكين الأولي" (De-escalation) في المكالمة؟', opts:['خفض صوتك وتبطئ كلامك','أن تقول للعميل يهدأ','إنهاء المكالمة وإعادة الاتصال','تحويل المكالمة لزميل آخر'], correct:0, feedback:'تقنية Mirror & Lower: اعكس نبرته ثم اخفض تدريجياً — صوتك يقود صوته.'},
            {scenario:'عميل اتصل للمرة الثالثة بنفس المشكلة. صوته متعب وليس غاضباً. يقول: "تعبت... كل مرة نفس الكلام."', q:'ماذا تقول؟', opts:['أعتذر وأكرر نفس الحل','أقول: حقك تتعب — هسه أنا شايل ملفك شخصياً ومش مخلّيك تتصل مرة رابعة.','أحوّله للمشرف','أسأله يشرح المشكلة من أولها'], correct:1, feedback:'التعهد الشخصي + الاعتراف بالتعب = يُعيد الثقة. جملة "مش مخلّيك تتصل مرة رابعة" هي الأقوى.'},
            {scenario:'عميلة تقول: "أنا سمعت إنكم تسربون بيانات العملاء."', q:'ماذا تقول؟', opts:['هذا كلام غير صحيح أبداً!','أقدّر قلقك — خليني أشرح لك بالضبط كيف نحمي بياناتك، وأعطيك رقم سياسة الخصوصية.','مين قال لك هالكلام؟','ما عندنا هالمشاكل'], correct:1, feedback:'لا تدافع بشكل انفعالي — أظهر تقديراً للقلق ثم قدّم دليلاً ملموساً.'},
            {q:'أي سلوك عميل يشير إلى أنه نمط "المسيطر D" في DISC؟', opts:['يسأل عن ضمانات ومراجع','يقاطعك ويطلب الخلاصة فوراً','يحكي قصص شخصية','يقول خلني أفكر وأرد عليك'], correct:1, feedback:'المسيطر D: سريع، حازم، يقاطع، يريد النتيجة بدون مقدمات.'},
            {q:'ما الفرق بين "التعاطف" و"الموافقة" مع العميل الغاضب؟', opts:['لا فرق — كلهم نفس الشيء','التعاطف = أفهم شعورك. الموافقة = أنت صح ونحن غلطانين.','التعاطف أضعف من الموافقة','الموافقة أفضل دائماً'], correct:1, feedback:'التعاطف لا يعني الاعتراف بالخطأ — يعني "أراك وأفهم ما تشعر به" وهذا يكفي لتهدئته.'},
            {q:'عميل يهدد بالشكوى في تويتر. أفضل استجابة هي:', opts:['أحاول أهدّيه بأي طريقة','أقول: حقك تعبّر — وأنا أبغى أحل مشكلتك قبل ما توصل لهالمرحلة.','أقول له ما في مشكلة رح شكّي','أحوّله للعلاقات العامة'], correct:1, feedback:'اعترف بحقه ثم أعد تأطير الموقف: "أبغى أحلها قبل" = تحويل القوة من التهديد للحل.'},
            {q:'ما أكبر خطأ يرتكبه موظف الكول سنتر مع عميل من نمط "المستقر S"؟', opts:['إعطاؤه وقت إضافي','الضغط عليه بعرض محدود الوقت','شرح التفاصيل بهدوء','تقديم ضمان مكتوب'], correct:1, feedback:'المستقر S يكره الضغط — الإلحاح المصطنع يجعله ينسحب بصمت ولا يعود.'}
          ]
        },
        'page-fieldsales': {
          title: 'اختبار المبيعات',
          questions: [
            {scenario:'عميل محتمل يقول: "سعركم غالي مقارنة بالمنافس."', q:'ما أقوى رد يستخدم مبدأ نفسي؟', opts:['أنزّل السعر فوراً','أقول: ما الذي يجعلك تقارن السعر فقط؟ (سؤال عكسي يكسر التحيز)','أتجاهل التعليق وأكمل العرض','أقول: المنافس أرخص لأنه أقل جودة'], correct:1, feedback:'السؤال العكسي يجعله يُعيد تقييم معياره بدل أن تدافع أنت. تقنية Confirmation Bias Breaker.', responseType:'منطقي'},
            {scenario:'أنت في اجتماع وصانع القرار يقول: "فكرة حلوة بس مش أولوية الحين."', q:'كيف تستخدم الندم الاستباقي هنا؟', opts:['أوافقه وأغادر','أقول: سؤال أخير — لو بعد 6 أشهر صار الموضوع أولوية واكتشفت إن التكلفة تضاعفت، كيف راح تشرح للإدارة؟','أضغط عليه بأن العرض ينتهي','أطلب اجتماع ثاني'], correct:1, feedback:'الندم الاستباقي يجعله يتخيل العواقب المستقبلية — أقوى من أي ضغط مباشر.', responseType:'عاطفي'},
            {scenario:'عميل مهتم لكنه يقول: "أبغى أشاور الشريك."', q:'ما التقنية الصحيحة؟', opts:['أقول: طبعاً خذ وقتك','أقول: ممتاز — ما النقاط اللي تبي تناقشها معه؟ عشان أجهز لك ملخص يسهّل القرار.','أطلب رقم الشريك عشان أكلمه','أعطيه خصم إضافي إذا قرر الحين'], correct:1, feedback:'لا ترفض طلبه ولا تتركه يختفي — ادعم عملية القرار بأدوات جاهزة.', responseType:'منطقي'},
            {scenario:'أول زيارة لعميل محتمل. جالس في المكتب وما رفع رأسه يسلّم.', q:'كيف تفتح المحادثة؟', opts:['أبدأ مباشرة بالعرض','أسأل سؤال مفتوح عن يومه أو عمله: "شكلك مشغول اليوم — وقت سيء؟"','أنتظر حتى يكلمني','أقدم نفسي وأبدأ بالشركة'], correct:1, feedback:'سؤال مفتوح يعترف بوضعه = احترام + إذن ضمني. هذا يكسر الحاجز الدفاعي.', responseType:'عاطفي'},
            {scenario:'عميل قال "نعم" لكل شيء في العرض لكنه لم يوقّع. يقول: "أرسل لي العرض وأرد عليك."', q:'ماذا يحدث نفسياً هنا وكيف تتعامل؟', opts:['أرسل العرض وأنتظر','أقول: ممتاز — بس قبل ما أرسله، فيه شيء محدد يقلقك ولا تحس إن فيه نقطة ما غطيناها كفاية؟','أضغط عليه يوقع الحين','أعطيه خصم إضافي'], correct:1, feedback:'هذا اعتراض مُقنَّع — يوافق لتجنب المواجهة. سؤال "فيه شيء يقلقك" يكشف الاعتراض الحقيقي.', responseType:'منطقي'}
          ]
        },
        'page-psych': {
          title: 'اختبار التشخيص النفسي',
          questions: [
            {scenario:'عميل يقول: "أنا ما أحتاج أحد يعلّمني — أنا أعرف وش أبغى." ثم يرفض كل اقتراح.', q:'أي دفاع نفسي هذا؟', opts:['النفور من الخسارة','مفارقة الاختيار','التحيز للتأكيد','الإنكار'], correct:2, feedback:'التحيز للتأكيد — يعتقد أنه يعرف الأفضل ويرفض أي معلومة تخالف قناعته. لا تجادل — اسأل سؤال يخلخل.'},
            {scenario:'عميلة تقول: "خلني أسأل زوجي/أختي/صديقتي قبل" في كل مرة تقترب من القرار.', q:'أي دفاع نفسي هذا؟', opts:['التأجيل المشروع','الحِمل المعرفي','التهرب من المسؤولية (تجنب القرار)','الإثبات الاجتماعي'], correct:2, feedback:'التهرب من المسؤولية — تخاف من اتخاذ قرار خاطئ فتنقل المسؤولية لآخرين. أعطها ضمان وحرية إلغاء.'},
            {scenario:'عميل يطلب عرض أسعار تفصيلي، ثم يطلب مقارنة، ثم يطلب دراسة حالة، ثم يطلب مرجع... ولا يقرر.', q:'أي دفاع نفسي هذا؟', opts:['الإنكار','التثقيل المعرفي كدفاع','الندم الاستباقي','التحيز للتأكيد'], correct:1, feedback:'التثقيل المعرفي كسلاح دفاعي — يجمع معلومات لانهائية لتأجيل القرار. الحل: حدد deadline منطقي.'},
            {scenario:'عميل يقول: "أنا مبسوط باللي عندي" بعد أن أثبتّ له بالأرقام أن الخيار الجديد أفضل.', q:'أي دفاع نفسي هذا؟', opts:['النفور من الخسارة','التمسك بالمألوف (Status Quo Bias)','مفارقة الاختيار','الإثبات الاجتماعي'], correct:1, feedback:'التمسك بالمألوف — المعروف المريح أسهل من المجهول الأفضل. أكد أن التغيير تدريجي وقابل للعكس.'},
            {scenario:'زبون في المعرض يلتقط المنتج، يسأل عن السعر، يقول "غالي"، ثم يتصل بصديق ويقول "شوف هالمعرض — أسعار نار!"', q:'أي دفاع هذا؟', opts:['الإزاحة','الإسقاط','التبرير الاجتماعي','الإنكار'], correct:2, feedback:'التبرير الاجتماعي — يبحث عن تأكيد خارجي لرفضه. استخدم الإثبات الاجتماعي المضاد: "ناس كثير قالوا نفس الكلام وبعدين رجعوا."'},
            {scenario:'عميل يتكلم بسرعة، يقاطعك، ويقول "اختصر — وش النتيجة؟"', q:'أي نمط DISC هذا؟', opts:['I - المعبّر','S - المستقر','C - الدقيق','D - المسيطر'], correct:3, feedback:'النمط D — المسيطر: سريع، حازم، يريد النتيجة فوراً. أعطه الخلاصة ثم التفاصيل إذا طلب.'},
            {scenario:'عميل يسأل: "كم نسبة النجاح بالضبط؟ عندكم دراسة؟ أبغى أشوف العقد قبل."', q:'أي نمط DISC هذا؟', opts:['D - المسيطر','I - المعبّر','S - المستقر','C - الدقيق'], correct:3, feedback:'النمط C — الدقيق: يريد أرقاماً ووثائق ومقارنات. جهّز بياناتك قبل ما تتواصل معه.'},
            {scenario:'عميل يقول: "والله صار لي موقف مشابه... خليني أحكيلك" ويضحك ويمزح.', q:'أي نمط DISC هذا؟', opts:['D - المسيطر','I - المعبّر','S - المستقر','C - الدقيق'], correct:1, feedback:'النمط I — المعبّر: يحب العلاقة والقصص والضحك. لا تقطعه — شاركه ثم انتقل بسلاسة.'},
            {scenario:'عميل يقول: "خلني أفكر... فيه ضمان لو ما ناسبني؟ اللي عندي ماشي الحال."', q:'أي نمط DISC هذا؟', opts:['D - المسيطر','I - المعبّر','S - المستقر','C - الدقيق'], correct:2, feedback:'النمط S — المستقر: يريد الأمان، يتأنى، يخاف التغيير. وفّر ضمانات ولا تضغط عليه.'},
            {q:'ما العلاقة بين النمط D والدفاع النفسي "الإنكار"؟', opts:['لا علاقة','المسيطر يستخدم الإنكار لحماية شعوره بالسيطرة — ينكر الحاجة لأن الاعتراف = ضعف','المسيطر لا يستخدم دفاعات','الإنكار خاص بالنمط S فقط'], correct:1, feedback:'النمط D يرى الاعتراف بالحاجة كضعف — لذلك ينكر. لا تواجه إنكاره، بل قدّم رقماً يكسره بهدوء.'},
            {q:'ما أقوى تركيبة نفسية مع عميل نمط C (الدقيق) يستخدم "التثقيل المعرفي"؟', opts:['ضغط بالوقت + إلحاح','أرقام دقيقة + deadline منطقي + إثبات اجتماعي بالبيانات','قصص عاطفية + علاقة شخصية','عرض واحد فقط بدون بدائل'], correct:1, feedback:'النمط C يحترم البيانات — أعطه ما يريد لكن مع حد زمني منطقي يمنع التأجيل اللانهائي.'},
            {q:'مستوى قراءتك للناس يعتمد على:', opts:['الحدس الفطري فقط','التدريب المنهجي على التعرف + الممارسة اليومية + مراجعة الأخطاء','الخبرة الطويلة تكفي','قراءة كتب علم النفس'], correct:1, feedback:'القراءة الاحترافية = علم + تطبيق + مراجعة. الحدس وحده يخطئ، والكتب وحدها لا تكفي.'}
          ]
        },
        'page-eq': {
          title: 'اختبار الذكاء العاطفي',
          questions: [
            {q:'عميل يصرخ عليك بسبب خطأ ليس خطأك. أول شيء تفعله هو:', opts:['ترد عليه بنفس النبرة','تتنفس وتُطبّق STOP: توقف، تنفس، لاحظ، تصرف باختيار','تحوّله لزميلك','تعتذر فوراً حتى لو مش غلطتك'], correct:1, feedback:'تقنية STOP هي أساس إدارة الذات — الثانية بين المحفّز والرد تُغيّر كل شيء.'},
            {q:'ما الفرق بين الوعي الذاتي والتعاطف؟', opts:['لا فرق','الوعي = تفهم مشاعرك أنت. التعاطف = تفهم مشاعر الآخر.','الوعي أهم','التعاطف أهم'], correct:1, feedback:'الوعي الذاتي = داخلي (أنت). التعاطف = خارجي (الآخر). كلاهما ضروري.'},
            {q:'زميلك في العمل متوتر ويتعامل بجفاء. ما أذكى تصرف (EQ عالي)؟', opts:['أتجاهله','أزعل منه','أسأله بهدوء: "شكلك مضغوط اليوم — تحتاج شيء؟"','أشتكي عليه للمدير'], correct:2, feedback:'السؤال بلطف يُظهر وعياً اجتماعياً + تعاطفاً — أعلى مستويات EQ.'},
            {q:'أيهما أصح عن الذكاء العاطفي؟', opts:['شيء تولد فيه ولا يتغير','مهارة تُكتسب وتتطور بالتمرين اليومي','مهم فقط للمدراء','بديل عن الذكاء المعرفي IQ'], correct:1, feedback:'EQ مهارة قابلة للتطوير — 90% من أصحاب الأداء العالي طوّروها بالممارسة.'},
            {q:'ما أفضل تمرين يومي لتطوير الوعي الذاتي؟', opts:['قراءة كتب','كتابة 3 مشاعر واجهتها اليوم وسببها كل مساء','حفظ نصائح EQ','مشاهدة فيديوهات تحفيزية'], correct:1, feedback:'30 يوماً من تسجيل المشاعر = تعرّف أنماطك قبل أن تحدث. هذا أساس التغيير.'},
            {q:'في أي دور وظيفي يكون EQ الأكثر حسماً؟', opts:['التقنية فقط','الكول سنتر فقط','كل الأدوار — لكن بأشكال مختلفة','المبيعات فقط'], correct:2, feedback:'EQ مطلوب في كل دور: الكول سنتر (إدارة غضب)، المبيعات (قراءة العميل)، التقنية (صبر)، الإدارة (تحفيز).'},
            {q:'ما هو "الاختطاف العاطفي" (Emotional Hijacking)؟', opts:['تلاعب بمشاعر الآخرين','لحظة يسيطر فيها الجزء العاطفي من الدماغ على التفكير المنطقي فتتصرف بردة فعل','مرض نفسي','تقنية مبيعات'], correct:1, feedback:'Amygdala Hijack: الدماغ العاطفي يأخذ القيادة — STOP هو المفتاح لكسر هذه اللحظة.'},
            {q:'عميل قال لك كلمة جارحة. أنت حاسس بالغضب. ماذا يعني هذا الإحساس؟', opts:['أنك ضعيف','أنك إنسان طبيعي — الوعي بالغضب نفسه هو بداية الذكاء العاطفي','أنك غير مناسب للوظيفة','أنك تحتاج إجازة'], correct:1, feedback:'ملاحظة المشاعر = وعي ذاتي = الخطوة الأولى. المشكلة ليست الشعور — بل التصرف بدون وعي.'}
          ]
        },
        'page-negotiation': {
          title: 'اختبار المفاوضات',
          questions: [
            {q:'ما هو BATNA؟', opts:['أفضل سعر ممكن','أفضل بديل متاح لك إذا فشلت المفاوضة','أول عرض تقدمه','الحد الأدنى الذي تقبله'], correct:1, feedback:'BATNA = Best Alternative To a Negotiated Agreement. قوتك التفاوضية تأتي من جودة البديل.'},
            {q:'مبدأ "فصل الناس عن المشكلة" يعني:', opts:['تجاهل مشاعر الطرف الآخر','هاجم المشكلة لا الشخص — "نحن ضد المشكلة" بدل "أنتم ضدي"','لا تتفاوض مع أشخاص','المشكلة أهم من العلاقة'], correct:1, feedback:'Harvard Method: عامل الشخص باحترام وهاجم المشكلة بصرامة. هذا يفتح التعاون.'},
            {q:'أنت تبيع خدمة بـ10,000. العميل يقول: "ميزانيتنا 6,000 فقط." أفضل رد:', opts:['أقبل 6,000','أرفض وأمشي','أقول: أفهم القيد — خلني أصمم حزمة بـ6,000 تغطي الأولويات، والباقي ممكن نضيفه لاحقاً.','أقول: مستحيل بهالسعر'], correct:2, feedback:'التفاوض على المحتوى لا السعر = Win-Win. أنت ما نزّلت قيمتك، وهو ما تجاوز ميزانيته.'},
            {q:'ما أقوى لحظة لتقديم عرضك في التفاوض؟', opts:['في البداية','بعد أن تفهم BATNA الطرف الآخر واحتياجاته الحقيقية','في النهاية دائماً','لا يهم الوقت'], correct:1, feedback:'المعلومات = قوة. افهم موقفه أولاً ثم صمم عرضك ليلبي احتياجه الحقيقي.'},
            {q:'عميل يقول: "المنافس عرض علينا نصف سعركم." ما أذكى تحرك؟', opts:['أنزّل السعر فوراً','أقول: ممتاز — ما الذي يجعلك لسه تتكلم معنا بدل ما تروح لهم؟','أقول: عرضهم كاذب','أتجاهل الموضوع'], correct:1, feedback:'هذا السؤال يكشف أنه يعرف أن المنافس أقل جودة — ويريد منك تبرير الفرق، لا خفض السعر.'},
            {q:'ما معنى ZOPA في التفاوض؟', opts:['منطقة الخسارة','Zone of Possible Agreement — المنطقة بين الحد الأدنى لك والحد الأعلى له','أسلوب ضغط','اسم تقنية إقناع'], correct:1, feedback:'ZOPA هي المنطقة التي يمكن فيها الاتفاق — إذا لم توجد ZOPA فلا اتفاق ممكن.'},
            {q:'في أي حالة يجب أن تنسحب من التفاوض؟', opts:['حين تغضب','حين يكون أفضل عرضهم أسوأ من BATNA الخاص بك','حين يرفضون عرضك الأول','حين يطلبون خصم'], correct:1, feedback:'إذا أفضل ما يقدمونه أسوأ من بديلك — انسحب بثقة. هذا يحمي قيمتك.'},
            {q:'ما هي "ديناميكيات القوة" في التفاوض؟', opts:['من يصرخ أكثر يفوز','من يملك بدائل أقوى ومعلومات أكثر ووقت أكثر يملك القوة','القوة ثابتة ولا تتغير','القوة للأكبر دائماً'], correct:1, feedback:'القوة = بدائل + معلومات + وقت + شرعية. كلها قابلة للتغيير والتأثير.'}
          ]
        },
        'page-social': {
          title: 'اختبار السوشيال ميديا',
          questions: [
            {q:'ما أول قاعدة في الرد على تعليق سلبي في السوشيال ميديا؟', opts:['حذف التعليق','الرد بسرعة مع اعتراف + حل + شفافية','تجاهله','الرد بالدفاع عن الشركة'], correct:1, feedback:'الجمهور يُقيّم كيف تتعامل مع المشكلة، لا من السبب. الاعتراف + الحل = مصداقية.'},
            {q:'عميل كتب تعليق: "منتجكم مغشوش!" وانتشر. أفضل استجابة:', opts:['حذف التعليق وحظر الحساب','الرد علناً: نأخذ الموضوع بجدية + طلب التواصل الخاص + إجراء فوري','الرد بأن الاتهام كاذب','الصمت حتى ينسى الناس'], correct:1, feedback:'الشفافية العلنية + الحل الخاص = أقوى تركيبة لإدارة الأزمات الرقمية.'},
            {q:'ما الفرق بين "المحتوى البيعي" و"المحتوى القيمي" في السوشيال؟', opts:['لا فرق','البيعي = اشترِ الآن. القيمي = معلومة/فائدة تبني ثقة قبل البيع.','القيمي أضعف','البيعي أفضل دائماً'], correct:1, feedback:'قاعدة 80/20: 80% محتوى قيمي يبني ثقة — 20% بيعي يحصد الثمار.'},
            {q:'ما أقوى محفّز نفسي في إعلانات السوشيال ميديا؟', opts:['الألوان الزاهية','FOMO (الخوف من فوات الفرصة) + إثبات اجتماعي','النص الطويل','الأسعار المنخفضة'], correct:1, feedback:'FOMO + Social Proof = تركيبة تُحرّك القرار: "آخرون استفادوا وأنت تفوّت."'},
            {q:'متى يكون أفضل وقت للنشر في السوشيال ميديا الخليجية؟', opts:['الصباح الباكر','بعد العشاء (9-11 مساءً) + وقت الغداء (1-3 ظهراً)','منتصف الليل','لا يهم الوقت'], correct:1, feedback:'ذروة الاستخدام في الخليج: بعد العشاء وأثناء استراحة الغداء. البيانات تفوق الحدس.'},
            {q:'عميل راضي كتب تعليق إيجابي. ماذا تفعل؟', opts:['أتجاهله لأنه إيجابي','أشكره + أعيد نشره (UGC) + أطلب منه تقييم رسمي','أرد بإيموجي فقط','أرسل له خصم'], correct:1, feedback:'User Generated Content (UGC) = أقوى إثبات اجتماعي. التعليق الإيجابي فرصة تسويقية مجانية.'},
            {q:'ما خطورة "الرد الآلي" (Copy-Paste) على تعليقات العملاء؟', opts:['لا خطورة','يُشعر العميل بأنه رقم لا شخص — يقتل المصداقية والثقة','يوفر وقت وهذا أهم','أفضل من عدم الرد'], correct:1, feedback:'التخصيص في الرد = "أنا أراك كفرد" — النسخ واللصق = "أنت رقم في النظام."'},
            {q:'ما المبدأ النفسي وراء "القصص" (Stories) في إنستغرام/سناب؟', opts:['الترفيه فقط','مبدأ الندرة + FOMO: تختفي بعد 24 ساعة فيشعر المتابع بضرورة المشاهدة','لا مبدأ نفسي','مبدأ المرساة'], correct:1, feedback:'الاختفاء بعد 24 ساعة = ندرة مصطنعة تُحفّز المشاهدة الفورية. نفس مبدأ العروض المحدودة.'}
          ]
        },
        'page-lab': {
          title: 'اختبار مختبر السيناريوهات',
          questions: [
            {q:'ما أهم مهارة يقيسها مختبر السيناريوهات؟', opts:['الحفظ','القدرة على التكيّف مع مواقف غير متوقعة واختيار الرد المناسب','السرعة','اللباقة فقط'], correct:1, feedback:'المحاكاة تقيس التكيّف والحكم الميداني — أقرب شيء للواقع بدون مخاطرة.'},
            {q:'لماذا يُعطى كل خيار في السيناريو "درجة" بدل صح/خطأ فقط؟', opts:['لأنه أسهل في البرمجة','لأن الواقع ليس أبيض/أسود — بعض الردود جيدة وبعضها ممتازة','لا سبب محدد','لزيادة صعوبة الاختبار'], correct:1, feedback:'في الميدان لا يوجد "خطأ واحد" — هناك ردود ضعيفة ومتوسطة وممتازة. التدرج يعكس الواقع.'},
            {q:'ما الفائدة من قراءة "السياق النفسي" قبل كل سيناريو؟', opts:['ثقافة عامة','يُساعدك تفهم لماذا العميل يتصرف هكذا فتختار ردك بناءً على الدافع لا السطح','ليس ضرورياً','يُبطئ التعلم'], correct:1, feedback:'فهم "لماذا" = تعامل مع الجذر. بدون سياق نفسي أنت ترد على الأعراض فقط.'},
            {q:'كم سيناريو يُنصح بممارسته أسبوعياً للتطوير المستمر؟', opts:['سيناريو واحد شهرياً','3-5 سيناريوهات أسبوعياً مع مراجعة الأخطاء','10 سيناريوهات يومياً','لا يوجد رقم محدد'], correct:1, feedback:'3-5 أسبوعياً مع مراجعة = تراكم مستمر. الكمية بدون مراجعة لا تُفيد.'},
            {q:'ما أفضل طريقة للاستفادة من السيناريو الذي أخطأت فيه؟', opts:['أتجاهله وأنتقل','أقرأ الرد الصحيح + أفهم لماذا + أعيد السيناريو بعد أسبوع','أحفظ الرد الصحيح فقط','أتجنب المواقف المشابهة'], correct:1, feedback:'فهم + تكرار متباعد = تعلم حقيقي. الحفظ بدون فهم ينهار تحت الضغط.'},
            {q:'لماذا تتضمن السيناريوهات "عواقب" لكل اختيار؟', opts:['للترفيه','لأن كل قرار في الواقع له عواقب — رؤيتها مسبقاً تُحسّن الحكم','لزيادة الإثارة','ليست ضرورية'], correct:1, feedback:'العواقب تُربط القرار بالنتيجة — هذا يبني "حدس مبني على خبرة" بدل حدس عشوائي.'},
            {q:'ما دور "التحليل الخبير" (Expert Move) بعد كل سيناريو؟', opts:['لإثبات صعوبة الاختبار','يُعطيك المبدأ العام الذي يُطبّق على مواقف مشابهة — وليس فقط هذا الموقف','تجميل فقط','لا فائدة حقيقية'], correct:1, feedback:'Expert Move = المبدأ القابل للنقل لمواقف أخرى. هذا الفرق بين حفظ إجابة وتعلم مهارة.'},
            {q:'أي مستوى صعوبة يُنصح بالبدء به؟', opts:['الأصعب مباشرة','المتوسط ثم التقدم تدريجياً حسب نتائجك','السهل فقط','لا يهم'], correct:1, feedback:'البدء بالمتوسط يبني ثقة + تحدي كافي. السهل يُملّ، والصعب يُحبط المبتدئ.'}
          ]
        },
        'page-customercare': {
          title: 'اختبار خدمة العملاء',
          questions: [
            {q:'ما الفرق الجوهري بين "خدمة العملاء" و"تجربة العملاء"؟', opts:['لا فرق','الخدمة = التعامل مع مشكلة. التجربة = كل تفاعل من أول لحظة لآخر لحظة.','التجربة أقل أهمية','الخدمة تشمل التجربة'], correct:1, feedback:'خدمة العملاء جزء من التجربة — لكن التجربة تشمل كل نقطة تواصل حتى قبل الشراء.'},
            {q:'عميل يطلب شيئاً خارج صلاحياتك. أفضل رد:', opts:['أقول: ما أقدر.','أقول: أفهم طلبك — خليني أتأكد من أفضل طريقة أخدمك فيها وأرد عليك خلال ساعة.','أحوّله لأي قسم','أعد له وعداً لا أستطيع تنفيذه'], correct:1, feedback:'لا ترفض ولا تعد بما لا تقدر — أظهر الحرص ثم تابع فعلياً. الأهم: التزم بالوقت.'},
            {q:'ما معنى "الميل الإضافي" (Going the Extra Mile) في الخدمة؟', opts:['العمل الإضافي بدون أجر','فعل شيء غير متوقع يُفاجئ العميل إيجابياً ويبني ولاء','التنازل عن السياسات','الإجابة على أسئلة خارج التخصص'], correct:1, feedback:'الميل الإضافي = تجاوز التوقع. شيء صغير وغير متوقع يبني ولاءً أكثر من خصم كبير.'},
            {q:'ما أهم KPI (مؤشر أداء) في خدمة العملاء؟', opts:['عدد المكالمات','CSAT (رضا العميل) + FCR (حل من أول تواصل)','سرعة الرد فقط','عدد الشكاوى'], correct:1, feedback:'CSAT + FCR = الجودة. السرعة بدون حل = إحباط مضاعف.'},
            {q:'عميل يقول: "أنتم أسوأ شركة تعاملت معها!" — ما أول خطوة؟', opts:['أدافع عن الشركة','أستمع بالكامل + أعترف بشعوره + أطلب التفاصيل','أغلق المكالمة','أعتذر 10 مرات'], correct:1, feedback:'الاستماع + الاعتراف بالشعور (لا بالخطأ بالضرورة) = التهدئة. ثم التفاصيل للحل.'},
            {q:'ما هو "Service Recovery Paradox"؟', opts:['أن الخدمة الجيدة دائماً تنجح','أن العميل الذي حُلّت مشكلته بشكل استثنائي يصبح أكثر ولاءً من عميل لم يواجه مشكلة أصلاً','أن المشاكل جيدة','أن الشكاوى تزيد المبيعات'], correct:1, feedback:'Service Recovery Paradox: حل المشكلة بشكل WOW = ولاء أعلى من عدم وجود مشكلة أصلاً.'},
            {q:'أي جملة "قاتلة" يجب ألا تقولها أبداً لعميل؟', opts:['"أفهم شعورك"','"هذا مو من قِبَلنا / هذا بروتوكول الشركة"','"خلني أتأكد لك"','"أعطيني دقيقة وأحلها"'], correct:1, feedback:'جملة "مو من قبلنا" = أنا لا أكترث لمشكلتك. العميل لا يهمه من السبب — يهمه الحل.'},
            {q:'ما أفضل طريقة لإنهاء مكالمة خدمة عملاء ناجحة؟', opts:['أسأله: "فيه شيء ثاني أقدر أساعدك فيه؟" + ملخص سريع للحل + تمنيات حقيقية','أغلق بسرعة','أقول: مع السلامة','أطلب تقييم فوري'], correct:0, feedback:'السؤال المفتوح + الملخص + التمني = إغلاق احترافي يبني انطباع أخير قوي.'}
          ]
        }
      };

      quizData['page-programming'] = {
          title: 'اختبار البرمجة والهندسة',
          questions: [
            {q:'ما المبدأ الأول في SOLID؟', opts:['كل كلاس يفعل أكثر من شيء','Single Responsibility — كل وحدة مسؤولة عن شيء واحد فقط','الوراثة أفضل من التركيب','لا تستخدم interfaces'], correct:1, feedback:'SRP يعني أن كل كلاس/وحدة لها سبب واحد فقط للتغيير. إذا تغيّرت لأسباب متعددة — قسّمها.'},
            {q:'أول خطوة في Debugging المنهجي:', opts:['تغيير أشياء عشوائية','إعادة إنتاج المشكلة بشكل موثوق ثم عزل المتغيرات','حذف الكود وإعادة كتابته','سؤال زميل فوراً'], correct:1, feedback:'لا يمكنك حل مشكلة لا تستطيع إعادة إنتاجها. إعادة الإنتاج هي الأساس.'},
            {q:'ما هو Technical Debt "الواعي"؟', opts:['كود سيئ بسبب الكسل','قرار مدروس بقبول حل مؤقت مع خطة للإصلاح','تجاهل الأخطاء','عدم كتابة tests'], correct:1, feedback:'الدين الواعي = استثمار مؤقت مُوثّق. الأرعن = إهمال. الفرق في الوعي والتوثيق.'},
            {q:'كم دقيقة يحتاج الدماغ للدخول في Flow State؟', opts:['5 دقائق','23 دقيقة تقريباً','ساعة كاملة','لا يحتاج وقت'], correct:1, feedback:'23 دقيقة لبناء الـ Flow وثانية واحدة لكسره. كل مقاطعة تكلّف 23 دقيقة حقيقية.'},
            {q:'ما أفضل طريقة لتقدير وقت المهام البرمجية؟', opts:['اعتمد على حدسك','ضاعف تقديرك الأولي واستخدم البيانات التاريخية','قل أقل وقت ممكن لإرضاء المدير','لا تُقدّر — ابدأ فقط'], correct:1, feedback:'Planning Fallacy: البشر يُقلّلون التقديرات 40-60%. البيانات التاريخية تُصحّح هذا.'},
            {q:'في Code Review، أفضل أسلوب لتقديم ملاحظة:', opts:['"هذا خطأ، صلّحه"','"هل فكرت في [بديل]؟ في تجربتي يُسهّل الصيانة" — اقتراح لا انتقاد','الموافقة بصمت لتجنب الصراع','رفض الـ PR بدون تعليق'], correct:1, feedback:'Code Review لإنتاج كود أفضل — لا لإثبات الذكاء. الاقتراح البنّاء أقوى من النقد.'}
          ]
        };
        quizData['page-accounting'] = {
          title: 'اختبار المحاسبة والكاشير',
          questions: [
            {q:'فرق ريال واحد في الإقفال يعني:', opts:['لا شيء — مبلغ بسيط','خطأ في المنظومة يجب تتبعه وتوثيقه','خطأ النظام لا الكاشير','يُتجاهل إذا تكرر'], correct:1, feedback:'أي فرق = خلل. الفائض خطأ بنفس جدية النقص. التوثيق يحمي ويكشف الأنماط.'},
            {q:'لماذا تزيد أخطاء الكاشير آخر الوردية؟', opts:['لأنه كسول','Attention Fatigue — الانتباه مورد محدود يُستهلك بيولوجياً','لأن العملاء أصعب','لا تزيد فعلاً'], correct:1, feedback:'بعد 4-5 ساعات تركيز مستمر، يفقد الدماغ 40% من دقته. الحل: استراحات + checklists.'},
            {q:'عميل يدّعي أنه دفع أكثر — أفضل رد:', opts:['"أنا عدّيت صح"','"أقدّر ملاحظتك. عندنا كاميرا وتسجيل — خليني أتحقق"','أعطيه المبلغ عشان يمشي','أتجاهله'], correct:1, feedback:'ذكر التسجيل يحمي الصادق ويردع المحتال. التحقق = احترافية.'},
            {q:'المشرف يطلب إغلاق الدرج بسرعة والأرقام لا تطابق — ماذا تفعل؟', opts:['أغلق كما طلب','أوثّق الفرق بتوقيعنا معاً ثم أغلق','أرفض الإغلاق نهائياً','أبلّغ الإدارة العليا فوراً'], correct:1, feedback:'التوقيع المشترك = حماية لك وله. يُشرك المشرف في المسؤولية.'},
            {q:'تقنية "3 ثوانٍ" تعني:', opts:['أسرع في العمل','قبل أي قرار مالي تحت ضغط: توقف 3 ثوانٍ واسأل "هل يتوافق مع الإجراء؟"','عدّ النقد في 3 ثوانٍ','أنهِ العملية في 3 ثوانٍ'], correct:1, feedback:'3 ثوانٍ تفصل بين خطأ يُكلّف آلاف وقرار صائب. التوقف القصير = حماية.'},
            {q:'ما أخطر انحياز نفسي يواجه الكاشير يومياً؟', opts:['التفاؤل','Normalization of Deviance — التأقلم مع الأخطاء الصغيرة حتى تصبح "طبيعية"','الخوف من العملاء','حب المال'], correct:1, feedback:'حين يتكرر الفرق "البسيط" بدون عواقب — الدماغ يُطبّعه. هذا أخطر من الخطأ الواحد الكبير.'}
          ]
        };

      function getActivePage() {
        const p = document.querySelector('.page.active');
        return p ? p.id : 'page-dashboard';
      }

      function openPageQuiz() {
        const pageId = getActivePage();
        const quiz = quizData[pageId];
        if (!quiz) { alert('لا يوجد اختبار لهذه الصفحة بعد.'); return; }
        currentQuiz = quiz;
        currentQ = 0;
        answers = [];
        showingFeedback = false;
        document.getElementById('v12QuizOverlay').classList.add('active');
        document.getElementById('v12QuizTitle').textContent = quiz.title;
        renderQuestion();
      }

      function closeQuizModal() {
        document.getElementById('v12QuizOverlay').classList.remove('active');
        currentQuiz = null;
      }

      function renderQuestion() {
        const q = currentQuiz.questions[currentQ];
        const total = currentQuiz.questions.length;
        const pct = ((currentQ) / total) * 100;
        document.getElementById('v12QuizProgressBar').style.width = pct + '%';

        let html = '';
        if (q.scenario) {
          html += '<div class="v12-quiz-scenario">' + q.scenario + '</div>';
        }
        html += '<div class="v12-quiz-q">' + q.q + '</div>';
        html += '<div class="v12-quiz-options">';
        q.opts.forEach((opt, i) => {
          html += '<div class="v12-quiz-opt" data-idx="'+i+'" onclick="selectQuizAnswer('+i+')">' + opt + '</div>';
        });
        html += '</div>';
        html += '<div id="v12QuizFeedbackArea"></div>';

        document.getElementById('v12QuizBody').innerHTML = html;
        document.getElementById('v12QuizFooter').innerHTML = '<div class="v12-quiz-counter">السؤال ' + (currentQ+1) + ' من ' + total + '</div><div></div>';
        showingFeedback = false;
      }

      window.selectQuizAnswer = function(idx) {
        if (showingFeedback) return;
        showingFeedback = true;
        const q = currentQuiz.questions[currentQ];
        const isCorrect = (idx === q.correct);
        answers.push({qIdx: currentQ, selected: idx, correct: isCorrect});

        const opts = document.querySelectorAll('.v12-quiz-opt');
        opts.forEach((o, i) => {
          o.style.pointerEvents = 'none';
          if (i === q.correct) o.classList.add('correct');
          if (i === idx && !isCorrect) o.classList.add('wrong');
        });

        let fbHtml = '<div class="v12-quiz-feedback ' + (isCorrect?'correct':'wrong') + '">';
        fbHtml += (isCorrect ? '&#x2705; صحيح! ' : '&#x274C; خطأ. ') + q.feedback;
        fbHtml += '</div>';
        document.getElementById('v12QuizFeedbackArea').innerHTML = fbHtml;

        const total = currentQuiz.questions.length;
        let footerRight = '';
        if (currentQ < total - 1) {
          footerRight = '<button class="v12-quiz-btn v12-quiz-btn-primary" onclick="nextQuizQuestion()">التالي &larr;</button>';
        } else {
          footerRight = '<button class="v12-quiz-btn v12-quiz-btn-primary" onclick="showQuizResult()">النتيجة</button>';
        }
        document.getElementById('v12QuizFooter').innerHTML = '<div class="v12-quiz-counter">السؤال ' + (currentQ+1) + ' من ' + total + '</div>' + footerRight;
      };

      window.nextQuizQuestion = function() {
        currentQ++;
        renderQuestion();
      };

      window.showQuizResult = function() {
        const total = currentQuiz.questions.length;
        const correct = answers.filter(a => a.correct).length;
        const pct = Math.round((correct/total)*100);
        document.getElementById('v12QuizProgressBar').style.width = '100%';

        let verdict = '';
        let weakness = '';
        if (pct >= 90) { verdict = 'ممتاز! مستوى احترافي عالي.'; }
        else if (pct >= 70) { verdict = 'جيد جداً — لكن فيه مجال للتحسين.'; }
        else if (pct >= 50) { verdict = 'متوسط — تحتاج مراجعة المحتوى مرة أخرى.'; }
        else { verdict = 'تحتاج تدريب إضافي — راجع المادة وأعد الاختبار.'; }

        const wrongOnes = answers.filter(a => !a.correct);
        if (wrongOnes.length > 0) {
          weakness = '<strong>نقاط تحتاج مراجعة:</strong><br>';
          wrongOnes.forEach(w => {
            weakness += '• السؤال ' + (w.qIdx+1) + ': ' + currentQuiz.questions[w.qIdx].feedback + '<br>';
          });
        }

        let html = '<div class="v12-quiz-result">';
        html += '<div class="v12-quiz-score">' + pct + '%</div>';
        html += '<div class="v12-quiz-verdict">' + verdict + '</div>';
        html += '<div style="font-size:13px;color:var(--text-muted);margin-top:6px;">' + correct + ' صحيحة من ' + total + '</div>';
        if (weakness) html += '<div class="v12-quiz-weakness">' + weakness + '</div>';
        html += '</div>';

        document.getElementById('v12QuizBody').innerHTML = html;
        document.getElementById('v12QuizFooter').innerHTML = '<button class="v12-quiz-btn v12-quiz-btn-secondary" onclick="openPageQuiz()">أعد الاختبار</button><button class="v12-quiz-btn v12-quiz-btn-primary" onclick="closeQuizModal()">إغلاق</button>';
      };

      window.openPageQuiz = openPageQuiz;
      window.closeQuizModal = closeQuizModal;
    })();

/* ===== JS block #9 (id: block-9) ===== */
/* v12-ADD: EQ Temperature Logic */
    function updateEqTemp(val) {
      const v = parseInt(val);
      const container = document.getElementById('v12EqResult');
      let state='', strategies=[];
      if (v <= 3) {
        state = '<div style="font-size:13px;font-weight:700;color:#EF4444;margin-bottom:10px;">&#x1F534; حالة توتر عالية — تحتاج تهدئة فورية قبل أي تفاعل</div>';
        strategies = [
          {title:'&#x1F9D8; إدارة نفسك', text:'طبّق STOP فوراً: توقف — تنفس 4 ثوانٍ — لاحظ مشاعرك — اختر ردك. لا تتخذ قرارات مهمة الآن.'},
          {title:'&#x1F4DE; إدارة الزبون', text:'إذا كنت في مكالمة: "أعطني 30 ثانية أتأكد من معلومة" — استخدم الوقت لتتنفس وتهدأ.'},
          {title:'&#x1F465; إدارة الفريق', text:'لا توجّه ملاحظات لأحد الآن. التوتر يجعل كلماتك أقسى مما تنوي. اكتبها وراجعها لاحقاً.'}
        ];
      } else if (v <= 6) {
        state = '<div style="font-size:13px;font-weight:700;color:#EAB308;margin-bottom:10px;">&#x1F7E1; حالة متوسطة — يقظة مع حذر</div>';
        strategies = [
          {title:'&#x1F9D8; إدارة نفسك', text:'أنت في منطقة عمل جيدة لكن ليست مثالية. خذ استراحة 5 دقائق كل ساعة. تنفس بوعي.'},
          {title:'&#x1F4DE; إدارة الزبون', text:'تستطيع التعامل مع مواقف عادية. تجنب العملاء الصعبين الآن إن أمكن — أو جهّز نفسياً قبلها.'},
          {title:'&#x1F465; إدارة الفريق', text:'استمع أكثر مما تتكلم. حالتك المتوسطة قد تجعلك أقل صبراً من المعتاد.'}
        ];
      } else {
        state = '<div style="font-size:13px;font-weight:700;color:#22C55E;margin-bottom:10px;">&#x1F7E2; حالة هدوء وتركيز — الوقت المثالي للأداء العالي</div>';
        strategies = [
          {title:'&#x1F9D8; إدارة نفسك', text:'استثمر هذه الحالة! تعامل مع أصعب المهام والعملاء الآن. طاقتك في قمتها.'},
          {title:'&#x1F4DE; إدارة الزبون', text:'هذا وقتك لبناء علاقات عميقة. أنت تستطيع قراءة الآخرين بوضوح وتقديم أفضل أداء.'},
          {title:'&#x1F465; إدارة الفريق', text:'وقت مثالي لتقديم ملاحظات بنّاءة، تحفيز الزملاء، وحل النزاعات بحكمة.'}
        ];
      }
      let html = state + '<div class="v12-eq-cards">';
      strategies.forEach(s => {
        html += '<div class="v12-eq-strat-card"><div class="v12-eq-strat-title">'+s.title+'</div><div class="v12-eq-strat-text">'+s.text+'</div></div>';
      });
      html += '</div>';
      container.innerHTML = html;
    }
    document.addEventListener('DOMContentLoaded', function(){ updateEqTemp(5); });

/* ===== JS block #10 (id: block-10) ===== */
/* v12-ADD: BATNA Calculator */
    function calcBATNA() {
      const you = parseFloat(document.getElementById('v12BatnaYou').value) || 0;
      const alt = parseFloat(document.getElementById('v12BatnaAlt').value) || 0;
      const other = parseFloat(document.getElementById('v12BatnaOther').value) || 0;
      const container = document.getElementById('v12BatnaResult');
      if (!you || !alt || !other) { container.innerHTML = '<div style="color:var(--text-muted);font-size:12.5px;">أدخل جميع القيم لرؤية التحليل</div>'; return; }

      const zopaExists = other >= alt;
      const zopaSize = zopaExists ? other - alt : 0;
      const position = you <= other ? 'قوي' : 'ضعيف نسبياً';
      const posColor = you <= other ? '#22C55E' : '#EAB308';

      let strategy = '';
      if (zopaExists && you <= other) {
        strategy = 'موقفك ممتاز! ZOPA موجودة وطلبك ضمنها. تفاوض بثقة وابدأ بسعرك الكامل.';
      } else if (zopaExists && you > other) {
        strategy = 'ZOPA موجودة لكن طلبك أعلى من سقفه. خفّض قليلاً أو أضف قيمة تبرر الفرق.';
      } else {
        strategy = 'لا توجد ZOPA — أقصى ما يدفعه أقل من أسوأ بديل لك. فكّر في الانسحاب أو إعادة تأطير القيمة.';
      }

      let html = '<div style="margin-bottom:12px;">';
      html += '<div style="display:flex;gap:20px;flex-wrap:wrap;margin-bottom:12px;">';
      html += '<div style="font-size:12px;color:var(--text-muted);">حدك الأدنى (BATNA): <strong style="color:var(--text);">' + alt.toLocaleString() + '</strong></div>';
      html += '<div style="font-size:12px;color:var(--text-muted);">سقف الطرف الآخر: <strong style="color:var(--text);">' + other.toLocaleString() + '</strong></div>';
      html += '<div style="font-size:12px;color:var(--text-muted);">منطقة ZOPA: <strong style="color:' + (zopaExists?'#22C55E':'#EF4444') + ';">' + (zopaExists ? zopaSize.toLocaleString() : 'غير موجودة') + '</strong></div>';
      html += '</div>';
      html += '<div class="v12-batna-zopa"><div class="v12-batna-bar"><div class="v12-batna-fill" style="width:' + (zopaExists ? Math.min(100, (zopaSize/you)*200) : 0) + '%;background:' + (zopaExists?'linear-gradient(90deg,#22C55E,var(--accent))':'#EF4444') + ';"></div></div></div>';
      html += '<div style="font-size:12px;margin-bottom:8px;">موقفك التفاوضي: <strong style="color:'+posColor+';">' + position + '</strong></div>';
      html += '<div style="font-size:12.5px;color:var(--text-muted);line-height:1.7;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);">&#x1F4A1; <strong style="color:var(--accent);">الاستراتيجية:</strong> ' + strategy + '</div>';
      html += '</div>';
      container.innerHTML = html;
    }

    /* v12-ADD: Power Dynamics */
    function setPowerDot(dot) {
      const row = dot.closest('.v12-power-dots');
      row.querySelectorAll('.v12-power-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      calcPowerPosition();
    }
    function calcPowerPosition() {
      let total = 0;
      document.querySelectorAll('.v12-power-dots').forEach(row => {
        const active = row.querySelector('.v12-power-dot.active');
        if (active) total += parseInt(active.dataset.val);
      });
      const max = 25;
      const pct = Math.round((total/max)*100);
      const container = document.getElementById('v12PowerResult');

      let verdict='', color='', tactics='';
      if (pct >= 72) {
        verdict = 'موقفك قوي'; color = '#22C55E';
        tactics = 'تفاوض من موقع قوة: ابدأ بطلب عالٍ، لا تتنازل بسهولة، وضع شروطك أنت. لكن لا تُبالغ — القوة الذكية تترك للآخر ماء وجه.';
      } else if (pct >= 44) {
        verdict = 'موقفك متوازن'; color = '#EAB308';
        tactics = 'ابحث عن مكاسب مشتركة (Win-Win). ركّز على المصالح المشتركة وابنِ خيارات إبداعية. لا تكشف ضعفك ولا تتظاهر بقوة لا تملكها.';
      } else {
        verdict = 'موقفك ضعيف نسبياً'; color = '#EF4444';
        tactics = 'قوِّ BATNA قبل التفاوض. اجمع معلومات أكثر. اطلب وقتاً إضافياً. ابحث عن حلفاء. ولا تقبل أول عرض من الخوف.';
      }

      let html = '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">';
      html += '<div style="font-size:28px;font-weight:900;color:'+color+';">'+pct+'%</div>';
      html += '<div><div style="font-size:13px;font-weight:700;color:'+color+';">'+verdict+'</div><div style="font-size:11px;color:var(--text-muted);">'+total+' من '+max+' نقطة</div></div>';
      html += '</div>';
      html += '<div style="font-size:12.5px;color:var(--text-muted);line-height:1.7;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);">&#x1F3AF; <strong style="color:var(--accent);">التكتيك المناسب:</strong> ' + tactics + '</div>';
      container.innerHTML = html;
    }
    document.addEventListener('DOMContentLoaded', function(){ calcBATNA(); calcPowerPosition(); });

/* ===== JS block #11 (id: block-11) ===== */
/* v12-ADD: Skills Heatmap */
    (function(){
      const skills = [
        {name:'إدارة الغضب',page:'page-callcenter'},{name:'STOP تقنية',page:'page-eq'},{name:'بناء الثقة',page:'page-callcenter'},
        {name:'نفور الخسارة',page:'page-psych'},{name:'إثبات اجتماعي',page:'page-psych'},{name:'مرساة السعر',page:'page-psych'},
        {name:'قراءة DISC',page:'page-psych'},{name:'مفارقة الاختيار',page:'page-psych'},
        {name:'SPIN البيع',page:'page-fieldsales'},{name:'إغلاق الصفقة',page:'page-fieldsales'},{name:'التعامل مع الاعتراض',page:'page-fieldsales'},
        {name:'BATNA',page:'page-negotiation'},{name:'ZOPA',page:'page-negotiation'},{name:'فصل الناس عن المشكلة',page:'page-negotiation'},
        {name:'Harvard Method',page:'page-negotiation'},{name:'ديناميكيات القوة',page:'page-negotiation'},
        {name:'محتوى قيمي',page:'page-social'},{name:'إدارة أزمات',page:'page-social'},{name:'FOMO',page:'page-social'},
        {name:'رد على سلبي',page:'page-social'},{name:'UGC',page:'page-social'},{name:'توقيت النشر',page:'page-social'},
        {name:'وعي ذاتي',page:'page-eq'},{name:'تعاطف',page:'page-eq'},{name:'مهارة اجتماعية',page:'page-eq'},
        {name:'تحفيز ذاتي',page:'page-eq'},{name:'Service Recovery',page:'page-customercare'},{name:'FCR',page:'page-customercare'},
        {name:'الميل الإضافي',page:'page-customercare'},{name:'CSAT',page:'page-customercare'},
        {name:'سيناريو صعب',page:'page-lab'},{name:'سيناريو متوسط',page:'page-lab'},
        {name:'مختبر الكول سنتر',page:'page-lab'},{name:'مختبر المبيعات',page:'page-lab'},
        {name:'ندم استباقي',page:'page-psych'},{name:'حِمل معرفي',page:'page-psych'},
        {name:'تحيز التأكيد',page:'page-psych'},{name:'إدارة الذات',page:'page-eq'},
        {name:'أكونت منجر',page:'page-fieldsales'},{name:'تقنيات تقنية',page:'page-callcenter'},
        {name:'تركيبات نفسية',page:'page-psych'},{name:'Cialdini 6',page:'page-negotiation'},
        {name:'الميزانية والتفاوض',page:'page-negotiation'},{name:'نهاية المكالمة',page:'page-customercare'},
        {name:'KPI خدمة',page:'page-customercare'},{name:'إدارة توتر',page:'page-eq'},
        {name:'محتوى بيعي',page:'page-social'},{name:'قصص ستوري',page:'page-social'},
        {name:'مراحل البيع 5',page:'page-fieldsales'},{name:'Objection Handling',page:'page-fieldsales'},
        {name:'De-escalation',page:'page-callcenter'},{name:'أول 10 ثوانٍ',page:'page-callcenter'},
        {name:'Win-Win',page:'page-negotiation'},{name:'Emotional Hijack',page:'page-eq'},
        {name:'تأطير القيمة',page:'page-fieldsales'},{name:'الإنكار',page:'page-psych'},
        {name:'إدارة الوقت',page:'page-callcenter'},{name:'حل المشكلات',page:'page-customercare'},
        {name:'الصمت الذكي',page:'page-callcenter'},{name:'Mirror & Lower',page:'page-callcenter'},
        {name:'قوة السؤال',page:'page-fieldsales'},{name:'Pipeline إدارة',page:'page-fieldsales'},
        {name:'Social Proof رقمي',page:'page-social'},{name:'Crisis Management',page:'page-social'},
        {name:'الإقناع 6 أسلحة',page:'page-negotiation'},{name:'التواصل غير اللفظي',page:'page-negotiation'}
      ];

      const heatmapKey = 'v12_heatmap_data';
      let hmData = JSON.parse(localStorage.getItem(heatmapKey) || '{}');

      function renderHeatmap() {
        const container = document.getElementById('v12Heatmap');
        if (!container) return;
        container.innerHTML = '';
        skills.forEach((skill, idx) => {
          const level = hmData[idx] || 0;
          const cell = document.createElement('div');
          cell.className = 'v12-hm-cell';
          cell.dataset.level = level;
          cell.dataset.idx = idx;
          cell.textContent = skill.name;
          cell.title = skill.name + ' — اضغط لتغيير التقييم';
          cell.onclick = function() {
            const cur = parseInt(this.dataset.level);
            const next = (cur + 1) % 4;
            this.dataset.level = next;
            hmData[idx] = next;
            localStorage.setItem(heatmapKey, JSON.stringify(hmData));
          };
          cell.ondblclick = function(e) {
            e.preventDefault();
            navigateTo(skill.page);
          };
          container.appendChild(cell);
        });
      }

      /* v12-ADD: Daily Challenge */
      const challenges = {
        'page-callcenter': [
          {lvl:'مبتدئ',task:'تمرين: تسجيل المشاعر',desc:'في أول 3 مكالمات اليوم، اكتب بعد كل مكالمة: ما الشعور الذي سيطر عليّ؟ هل أثّر على أدائي؟'},
          {lvl:'متوسط',task:'تطبيق: تقنية Mirror & Lower',desc:'في مكالمة عميل غاضب: اعكس نبرته أولاً ثم اخفض صوتك تدريجياً. لاحظ الفرق.'},
          {lvl:'متقدم',task:'إتقان: التعهد الشخصي',desc:'مع أصعب عميل اليوم، استخدم: "أنا شخصياً شايل ملفك" — ثم تابع فعلاً.'}
        ],
        'page-fieldsales': [
          {lvl:'مبتدئ',task:'تمرين: حدد BATNA',desc:'قبل أي اجتماع عميل اليوم، اكتب: ما الحد الأدنى؟ ما البديل إذا رفض؟'},
          {lvl:'متوسط',task:'تطبيق: السؤال العكسي',desc:'حين يقول عميل "غالي" — لا تدافع. اسأل: "ما الذي يجعلك تقارن السعر فقط؟"'},
          {lvl:'متقدم',task:'إتقان: الندم الاستباقي',desc:'مع عميل متردد: "لو بعد 6 أشهر اتضح إن هذا كان الصح — كيف راح تحس؟"'}
        ],
        'page-psych': [
          {lvl:'مبتدئ',task:'تمرين: تعرّف على نمط',desc:'في أول 3 تفاعلات اليوم، حاول تصنيف كل شخص: D, I, S, أو C.'},
          {lvl:'متوسط',task:'تطبيق: كشف الدفاع',desc:'حين يرفض عميل — اسأل نفسك: أي دفاع نفسي يستخدم؟ ثم عدّل ردك.'},
          {lvl:'متقدم',task:'إتقان: تركيبة مزدوجة',desc:'استخدم تركيبتين معاً (مرساة + نفور من خسارة) في محادثة واحدة ولاحظ التأثير.'}
        ],
        'page-eq': [
          {lvl:'مبتدئ',task:'تمرين: 3 مشاعر',desc:'اكتب 3 مشاعر واجهتها اليوم + سببها. هذا يبني الوعي الذاتي.'},
          {lvl:'متوسط',task:'تطبيق: STOP',desc:'في أول موقف مثير اليوم: توقف — تنفس — لاحظ — تصرف باختيار.'},
          {lvl:'متقدم',task:'إتقان: قراءة الغرفة',desc:'في اجتماع أو مكالمة جماعية: حدد مشاعر كل شخص قبل أن يتكلم.'}
        ],
        'page-negotiation': [
          {lvl:'مبتدئ',task:'تمرين: BATNA',desc:'لأي قرار اليوم (حتى شخصي): ما البديل إذا لم ينجح؟ اكتبه.'},
          {lvl:'متوسط',task:'تطبيق: فصل الناس عن المشكلة',desc:'في أي خلاف اليوم: قل "نحن ضد المشكلة معاً" بدل "أنت السبب."'},
          {lvl:'متقدم',task:'إتقان: حاسبة ZOPA',desc:'قبل أي تفاوض حقيقي: استخدم حاسبة BATNA في المنصة وحدد استراتيجيتك.'}
        ]
      };
      // Default for other pages
      const defaultChallenges = [
        {lvl:'مبتدئ',task:'تمرين: مراجعة سريعة',desc:'افتح صفحة واحدة من المنصة اليوم واقرأ قسماً واحداً جديداً بتركيز.'},
        {lvl:'متوسط',task:'تطبيق: اختبار ذاتي',desc:'اضغط "اختبر نفسك" في أي صفحة وأجب — لاحظ نقاط ضعفك.'},
        {lvl:'متقدم',task:'إتقان: تعليم الآخرين',desc:'اشرح مفهوماً واحداً تعلمته لزميل أو صديق. التعليم أقوى طرق التثبيت.'}
      ];

      function renderChallenge() {
        const lastPage = localStorage.getItem('v12_last_page') || 'page-dashboard';
        const pageChallenges = challenges[lastPage] || defaultChallenges;
        const today = new Date().toDateString();
        const seed = today.split('').reduce((a,c) => a + c.charCodeAt(0), 0);
        const challengeIdx = seed % pageChallenges.length;
        const challenge = pageChallenges[challengeIdx];
        const doneKey = 'v12_challenge_done_' + today;
        const isDone = localStorage.getItem(doneKey) === 'true';

        const levelEl = document.getElementById('v12ChallengeLevel');
        const bodyEl = document.getElementById('v12ChallengeBody');
        if (!levelEl || !bodyEl) return;

        let lvlColor = challenge.lvl === 'مبتدئ' ? '#22C55E' : challenge.lvl === 'متوسط' ? '#EAB308' : '#EF4444';
        levelEl.style.color = lvlColor;
        levelEl.style.borderColor = lvlColor;
        levelEl.textContent = challenge.lvl;

        let html = '<div class="v12-challenge-card">';
        html += '<div class="v12-challenge-task">' + challenge.task + '</div>';
        html += '<div class="v12-challenge-desc">' + challenge.desc + '</div>';
        if (isDone) {
          html += '<button class="v12-challenge-done-btn completed">&#x2705; تم الإنجاز!</button>';
        } else {
          html += '<button class="v12-challenge-done-btn" onclick="completeChallenge()">أنجزت التحدي &#x1F3AF;</button>';
        }
        html += '</div>';
        bodyEl.innerHTML = html;
      }

      window.completeChallenge = function() {
        const today = new Date().toDateString();
        localStorage.setItem('v12_challenge_done_' + today, 'true');
        renderChallenge();
      };

      // Track last page visited
      const origNavigateTo = window.navigateTo;
      if (origNavigateTo) {
        window.navigateTo = function(pageId) {
          localStorage.setItem('v12_last_page', pageId);
          origNavigateTo(pageId);
        };
      }

      document.addEventListener('DOMContentLoaded', function(){
        renderHeatmap();
        renderChallenge();
      });
    })();

/* ===== JS block #12 (id: block-12) ===== */
(function(){
      'use strict';

      // ── 1) THEME ENGINE — persist & toggle ──────────────────────
      const THEME_KEY = 'v12_theme';

      function applyTheme(theme) {
        const t = (theme === 'light') ? 'light' : 'dark';
        if (t === 'light') document.body.setAttribute('data-theme', 'light');
        else               document.body.removeAttribute('data-theme');
        try { localStorage.setItem(THEME_KEY, t); } catch(e) {}
        // Keep the lamp button's aria-pressed in sync
        document.querySelectorAll('.theme-toggle').forEach(btn => {
          btn.setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
        });
      }

      function toggleTheme() {
        const current = document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        applyTheme(current === 'light' ? 'dark' : 'light');
      }

      // Expose globally (used by the Lamp button onclick="toggleTheme()")
      window.toggleTheme = toggleTheme;
      window.applyTheme  = applyTheme;

      // Restore saved theme on load
      try {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'light') applyTheme('light');
        else                   applyTheme('dark');
      } catch(e) { applyTheme('dark'); }


      // ── 2) PRO-ICON LIBRARY — Lucide-style inline SVGs ──────────
      // Single vocabulary, consistent stroke-width, flat & professional.
      const ICONS = {
        phone:          '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.94a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
        briefcase:      '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
        handshake:      '<path d="M11 17l2 2a1 1 0 1 0 3-3"/><path d="M14 14l2.5 2.5a1 1 0 1 0 3-3L14 8"/><path d="M8 13l-2.5 2.5a1 1 0 1 1-3-3L8 7"/><path d="M14 14l-2-2"/>',
        wrench:         '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
        smartphone:     '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/>',
        code:           '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
        calculator:     '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="8" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="16" y1="18" x2="16" y2="18"/>',
        userCheck:      '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/>',
        chartLine:      '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
        chartBar:       '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/><line x1="3" y1="20" x2="21" y2="20"/>',
        trophy:         '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>',
        star:           '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        trendUp:        '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
        seedling:       '<path d="M7 20h10"/><path d="M12 20V10"/><path d="M12 10c0-3 2-5 5-5-.5 3-2 5-5 5z"/><path d="M12 10c0-3-2-5-5-5 .5 3 2 5 5 5z"/>',
        flame:          '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
        ear:            '<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 0 1-2 2"/>',
        mic:            '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>',
        check:          '<polyline points="20 6 9 17 4 12"/>',
        checkCircle:    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
        shuffle:        '<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>',
        x:              '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
        alert:          '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
        alertCircle:    '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
        ban:            '<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>',
        search:         '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
        eye:            '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
        brain:          '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.84A2.5 2.5 0 0 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.84A2.5 2.5 0 0 0 14.5 2"/>',
        lightbulb:      '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
        target:         '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
        zap:            '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
        clipboard:      '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
        shield:         '<path d="M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z"/>',
        clock:          '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        calendar:       '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
        users:          '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        anchor:         '<circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>',
        puzzle:         '<path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z"/>',
        book:           '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
        image:          '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
        music:          '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
        megaphone:      '<path d="M3 11v3a1 1 0 0 0 1 1h8l5 3V7L12 10H4a1 1 0 0 0-1 1z"/><path d="M17 7v10"/>',
        rocket:         '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
        refresh:        '<polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10"/><path d="M3.51 15a9 9 0 0 0 14.85 3.36L23 14"/>',
        thumbsUp:       '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88z"/>',
        layers:         '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
        globe:          '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
        heart:          '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
        sparkle:        '<path d="M12 3v18M3 12h18M5.64 5.64l12.72 12.72M5.64 18.36 18.36 5.64"/>',
        mirror:         '<path d="M12 3v18"/><path d="M8 7h8"/><path d="M6 12h12"/><path d="M8 17h8"/>',
        key:            '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
        compass:        '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
        tag:            '<path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
        folder:         '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
        mail:           '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
        messageCircle: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
        bolt:           '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
        coin:           '<circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M15 9.5A3.5 3.5 0 0 0 11.5 8h-2A2.5 2.5 0 0 0 9.5 13h5A2.5 2.5 0 0 1 14.5 18h-2A3.5 3.5 0 0 1 9 16.5"/>',
        flask:          '<path d="M9 3h6v4l5 10c.3.7-.1 1.5-.9 1.8-.2.1-.3.2-.5.2H5.4c-.8 0-1.4-.7-1.4-1.5 0-.2.1-.4.2-.5L9 7V3z"/><line x1="9" y1="3" x2="15" y2="3"/>',
        chart:          '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'
      };

      function svg(name) {
        const d = ICONS[name];
        if (!d) return '';
        return '<span class="pro-icon" aria-hidden="true">' +
               '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
               'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
               d + '</svg></span>';
      }


      // ── 3) EMOJI → PRO-ICON MAP ─────────────────────────────────
      // Only UI-chrome emojis (navigation, buttons, chips, labels).
      // Scientific scripts inside training dialogs are preserved
      // (see SKIP_SELECTORS below).
      const EMOJI_MAP = {
        // Telephony / support
        '📞': 'phone',   '☎️': 'phone',   '☎': 'phone',
        // Messaging / social
        '💬': 'messageCircle', '📨': 'mail',  '📧': 'mail',
        '📩': 'mail',    '📣': 'megaphone', '📢': 'megaphone',
        // Commerce / sales
        '💼': 'briefcase', '💰': 'coin',  '💵': 'coin', '💸': 'coin',
        '🏪': 'briefcase', '🛒': 'briefcase',
        // Collaboration
        '🤝': 'handshake',
        // Tools / tech
        '🔧': 'wrench',  '🛠️': 'wrench', '🛠': 'wrench',
        '💻': 'code',    '⌨️': 'code',   '🖥️': 'code',
        '📱': 'smartphone', '📲': 'smartphone',
        // Finance / data
        '🧮': 'calculator', '📊': 'chartBar', '📈': 'chartLine', '📉': 'chartLine',
        // People
        '👤': 'userCheck', '👥': 'users', '🧑‍💼': 'userCheck',
        // Achievement / status
        '🏆': 'trophy',  '⭐': 'star',   '🌟': 'star', '✨': 'sparkle',
        '🎯': 'target',  '🎖️': 'trophy',
        '🌱': 'seedling',
        // Energy / emphasis
        '🔥': 'flame',   '⚡': 'bolt',   '💡': 'lightbulb',
        // Senses / cognition
        '👂': 'ear',     '👁️': 'eye',   '👀': 'eye',
        '🎙️': 'mic',    '🎤': 'mic',
        '🧠': 'brain',
        // Validation
        '✅': 'check',   '✔️': 'check',  '✓': 'check',
        '❌': 'x',       '✖️': 'x',       '❎': 'x',
        '⚠️': 'alert',  '⚠': 'alert',
        '🚫': 'ban',    '🛑': 'ban',
        '🔴': 'alertCircle', '🟠': 'alertCircle', '🟡': 'alertCircle',
        '🟢': 'checkCircle', '🔵': 'alertCircle',
        // Structure / navigation
        '🔍': 'search', '🔎': 'search',
        '📋': 'clipboard', '📝': 'clipboard', '📌': 'clipboard', '📍': 'clipboard',
        '📁': 'folder', '🗂️': 'folder', '📂': 'folder',
        '📚': 'book',   '📖': 'book',   '📕': 'book', '📘': 'book', '📙': 'book',
        '🗓️': 'calendar', '📅': 'calendar', '📆': 'calendar',
        // Security
        '🛡️': 'shield', '🔒': 'shield', '🔐': 'shield',
        '🔑': 'key',
        // Abstract concepts
        '🔁': 'refresh', '🔄': 'refresh',
        '🧩': 'puzzle',
        '🪞': 'mirror',
        '🧭': 'compass',
        '🏷️': 'tag',
        '⚓': 'anchor',
        '🧪': 'flask',
        '🚀': 'rocket',
        '👋': 'handshake',
        '🧲': 'target',
        '❓': 'alertCircle', '❔': 'alertCircle',
        // Media
        '📸': 'image',  '📷': 'image',  '📹': 'image',
        '🎵': 'music',  '🎶': 'music',
        '🎨': 'sparkle',
        '🎭': 'sparkle',
        '🤖': 'code',
        // Emotional labels kept neutral
        '😰': 'alertCircle', '😵': 'alertCircle', '😤': 'alertCircle',
        '😬': 'alertCircle', '🚨': 'alert',
        '⏰': 'clock',  '⏱️': 'clock', '⌛': 'clock'
      };

      // Build a single regex from the map keys, longest-first to avoid
      // swallowing the base codepoint of a compound emoji (e.g. "⚠️").
      const EMOJI_KEYS = Object.keys(EMOJI_MAP).sort((a,b) => b.length - a.length);
      const EMOJI_RE   = new RegExp(
        '(' + EMOJI_KEYS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')',
        'g'
      );

      // DO NOT migrate emojis inside these zones — they belong to the
      // pedagogical content (agent/client scripts, dialogue, narrative).
      const SKIP_SELECTORS = [
        '.script-text', '.script-dialog',
        '.hook-text', '.cs-script-text',
        '.crisis-template-text', '.crisis-action-text',
        '.psych-info-text', '.psych-p-example',
        '.psych-warning-text', '.psych-quote',
        '.sim-card-desc', '.sim-scenario-narrative',
        '.skill-detail-text',
        '.ql-recall-a', '.ql-cog-text',
        'textarea', 'input', 'script', 'style', 'pre', 'code', '.pro-icon',
        // Any element the migrator has already touched
        '[data-pro-icon-done="1"]'
      ];

      function isInSkipZone(node) {
        let el = node.parentNode;
        while (el && el.nodeType === 1) {
          if (el.matches && el.matches(SKIP_SELECTORS.join(','))) return true;
          el = el.parentNode;
        }
        return false;
      }

      function migrateTextNode(textNode) {
        const txt = textNode.nodeValue;
        if (!txt || !EMOJI_RE.test(txt)) return;
        EMOJI_RE.lastIndex = 0; // reset after .test()
        if (isInSkipZone(textNode)) return;
        // Build fragment with mixed text + icon spans
        const frag = document.createDocumentFragment();
        let last = 0, m;
        const re = new RegExp(EMOJI_RE.source, 'g');
        while ((m = re.exec(txt)) !== null) {
          if (m.index > last) frag.appendChild(
            document.createTextNode(txt.slice(last, m.index))
          );
          const iconName = EMOJI_MAP[m[0]];
          const span = document.createElement('span');
          span.className = 'pro-icon';
          span.setAttribute('aria-hidden', 'true');
          span.innerHTML = '<svg viewBox="0 0 24 24" fill="none" ' +
            'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
            'stroke-linejoin="round">' + ICONS[iconName] + '</svg>';
          frag.appendChild(span);
          last = m.index + m[0].length;
        }
        if (last < txt.length) frag.appendChild(
          document.createTextNode(txt.slice(last))
        );
        textNode.parentNode.replaceChild(frag, textNode);
      }

      function migrateRoot(root) {
        if (!root || !root.nodeType) return;
        if (root.nodeType === 3) { migrateTextNode(root); return; }
        if (root.nodeType !== 1) return;
        if (root.matches && root.matches(SKIP_SELECTORS.join(','))) return;
        if (root.getAttribute && root.getAttribute('data-pro-icon-done') === '1') return;

        // Iterate all text-node descendants, but skip content inside
        // pedagogical zones.
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
          acceptNode(n) {
            if (!n.nodeValue || !EMOJI_RE.test(n.nodeValue)) {
              EMOJI_RE.lastIndex = 0; return NodeFilter.FILTER_REJECT;
            }
            EMOJI_RE.lastIndex = 0;
            // skip inside skip-zones
            let p = n.parentNode;
            while (p && p.nodeType === 1) {
              if (p.matches && p.matches(SKIP_SELECTORS.join(','))) return NodeFilter.FILTER_REJECT;
              p = p.parentNode;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        });
        const collected = [];
        let t;
        while ((t = walker.nextNode())) collected.push(t);
        collected.forEach(migrateTextNode);

        if (root.setAttribute) root.setAttribute('data-pro-icon-done', '1');
      }

      // Initial pass once the DOM is ready
      function initialMigration() {
        migrateRoot(document.getElementById('app') || document.body);
      }

      // Watch for dynamically-rendered UI (quiz modals, scenario grid,
      // hook panel, etc.) and migrate it too.
      function observeMutations() {
        const mo = new MutationObserver(muts => {
          muts.forEach(m => {
            m.addedNodes && m.addedNodes.forEach(n => {
              if (n.nodeType === 1) {
                // Mark the root "not done" so nested children re-process
                n.removeAttribute && n.removeAttribute('data-pro-icon-done');
                migrateRoot(n);
              } else if (n.nodeType === 3) {
                migrateTextNode(n);
              }
            });
          });
        });
        mo.observe(document.body, { childList: true, subtree: true });
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){
          initialMigration();
          observeMutations();
        });
      } else {
        initialMigration();
        observeMutations();
      }
    })();

/* ===== JS block #13 (id: phase-1-script) ===== */
(function () {
  'use strict';

  /* ───────── Utilities ───────── */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const PHASE1 = {
    // Performance DNA axis config (Arabic labels + localStorage module keys)
    axes: [
      { label: 'الإقناع',  moduleKey: 'negotiation'  },
      { label: 'التواصل',  moduleKey: 'callcenter'   },
      { label: 'التحليل',  moduleKey: 'lab'          },
      { label: 'الضغط',    moduleKey: 'eq'           },
      { label: 'الانتماء', moduleKey: 'customercare' },
      { label: 'الإبداع',  moduleKey: 'social'       }
    ],
    // Quick-access module targets
    quickLinks: [
      { key: 'callcenter',  label: 'كول سنتر',       svg: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.94a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>' },
      { key: 'lab',         label: 'المختبر',         svg: '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>' },
      { key: 'negotiation', label: 'المفاوضات',      svg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 11l-4 4-2-2"/>' },
      { key: 'eq',          label: 'الذكاء العاطفي', svg: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' }
    ]
  };

  /* ───────── localStorage helpers (defensive) ───────── */
  function safeGet(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : v; }
    catch (_) { return fallback; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_) { /* ignore */ }
  }

  /* Read a module "score" from any existing v12 localStorage keys, else default 15 */
  function readModuleScore(moduleKey) {
    const candidates = [
      'v12_score_' + moduleKey,
      'v12_progress_' + moduleKey,
      'quiz_' + moduleKey + '_score',
      'page-' + moduleKey + '_progress'
    ];
    for (const k of candidates) {
      const raw = safeGet(k, null);
      if (raw == null) continue;
      const n = parseFloat(raw);
      if (!isNaN(n) && n >= 0 && n <= 100) return n;
    }
    return 15; // baseline so radar is never collapsed
  }

  /* ─────────────────────────────────────────────────
     PHASE 1A · BENTO GRID — Performance DNA Radar (SVG)
  ───────────────────────────────────────────────── */
  function buildRadarSVG(values /* 0..100 per axis */) {
    const size = 440;
    const cx = size / 2, cy = size / 2;
    const rMax = 150;
    const axes = PHASE1.axes;
    const N = axes.length; // 6 — hexagon
    // Axis angles: start from top (-90deg), go clockwise
    const angles = Array.from({ length: N }, (_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / N);

    const pt = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];

    // Concentric hex rings at 25/50/75/100%
    const rings = [0.25, 0.5, 0.75, 1].map(f => {
      const pts = angles.map(a => pt(rMax * f, a).map(n => n.toFixed(2)).join(',')).join(' ');
      return `<polygon class="${f === 1 ? 'p1-radar-grid' : 'p1-radar-grid-faint'}" points="${pts}"/>`;
    }).join('');

    // Axis lines
    const axesLines = angles.map(a => {
      const [x, y] = pt(rMax, a);
      return `<line class="p1-radar-axis" x1="${cx}" y1="${cy}" x2="${x.toFixed(2)}" y2="${y.toFixed(2)}"/>`;
    }).join('');

    // Data polygon
    const dataPts = values.map((v, i) => {
      const f = Math.max(0.05, Math.min(1, v / 100));
      return pt(rMax * f, angles[i]).map(n => n.toFixed(2)).join(',');
    }).join(' ');

    // Vertex dots
    const vertices = values.map((v, i) => {
      const f = Math.max(0.05, Math.min(1, v / 100));
      const [x, y] = pt(rMax * f, angles[i]);
      return `<circle class="p1-radar-vertex" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="4"/>`;
    }).join('');

    // Labels at rMax + 22
    const labels = axes.map((ax, i) => {
      const [x, y] = pt(rMax + 24, angles[i]);
      // Slight vertical tweak for top/bottom axis
      const anchor =
        Math.abs(Math.cos(angles[i])) < 0.15 ? 'middle' :
        Math.cos(angles[i]) > 0 ? 'start' : 'end';
      const strong = values[i] >= 60 ? ' strong' : '';
      return `<text class="p1-radar-label${strong}" x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}">${ax.label}</text>`;
    }).join('');

    return `
      <svg class="p1-radar" viewBox="0 0 ${size} ${size}" role="img" aria-label="مخطط أداء الحمض النووي الشخصي">
        ${rings}
        ${axesLines}
        <polygon class="p1-radar-area" points="${dataPts}"/>
        ${vertices}
        ${labels}
      </svg>
    `;
  }

  /* ─────────────────────────────────────────────────
     PHASE 1A · Activity Heatmap (52 × 7, GitHub-style)
  ───────────────────────────────────────────────── */
  function getOrSeedActivity() {
    const storageKey = 'p1_activity';
    let raw = safeGet(storageKey, null);
    if (raw) {
      try { const parsed = JSON.parse(raw); if (Array.isArray(parsed) && parsed.length === 364) return parsed; }
      catch (_) { /* regenerate */ }
    }
    // Deterministic seed from today so it doesn't reshuffle
    const today = new Date().toDateString();
    let seed = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const arr = Array.from({ length: 364 }, (_, i) => {
      // Lighter activity for very early weeks, denser near end
      const weight = i / 364;
      const r = rnd();
      if (r > 0.88 - weight * 0.35) return Math.min(4, Math.floor(r * 5) + (weight > 0.7 ? 1 : 0));
      if (r > 0.55)                 return 1;
      return 0;
    });
    safeSet(storageKey, JSON.stringify(arr));
    return arr;
  }

  function computeStreak(activity) {
    // Count trailing non-zero days
    let streak = 0;
    for (let i = activity.length - 1; i >= 0; i--) {
      if (activity[i] > 0) streak++; else break;
    }
    return streak;
  }

  function buildHeatmap(activity) {
    // 52 weeks × 7 days = 364 cells, column-first (each column is a week)
    let cells = '';
    for (let i = 0; i < activity.length; i++) {
      const lvl = activity[i] | 0;
      cells += `<div class="p1-heatmap-cellx" data-lvl="${lvl}" aria-hidden="true"></div>`;
    }
    return `<div class="p1-heatmap-grid">${cells}</div>`;
  }

  /* ─────────────────────────────────────────────────
     PHASE 1A · Bento Grid injection
  ───────────────────────────────────────────────── */
  function injectBentoGrid() {
    const dash = document.getElementById('page-dashboard');
    if (!dash || dash.querySelector('.p1-bento')) return; // idempotent

    // Collect data
    const values = PHASE1.axes.map(ax => readModuleScore(ax.moduleKey));
    const activity = getOrSeedActivity();
    const streak = computeStreak(activity);
    const activeDays = activity.reduce((a, v) => a + (v > 0 ? 1 : 0), 0);
    const masteredModules = values.filter(v => v >= 70).length;

    // Stat values (driven by simple aggregates of real module data)
    const avgScore = Math.round(values.reduce((a, v) => a + v, 0) / values.length);
    const completionPct = Math.min(100, Math.round(activeDays / 3.64));
    const totalHours = Math.round(activeDays * 0.6 * 10) / 10; // estimate

    const bentoHTML = `
      <section class="p1-bento" aria-label="لوحة الأداء التفصيلية">

        <!-- HERO · Performance DNA Radar -->
        <article class="p1-bento-cell p1-hero">
          <div class="p1-hero-head">
            <div>
              <div class="p1-hero-sub">Performance DNA · الحمض النووي للأداء</div>
              <div class="p1-hero-title">بصمتك المهنية</div>
            </div>
            <div class="p1-caption" style="color:var(--accent);">6 محاور</div>
          </div>
          <div class="p1-radar-wrap" id="p1-radar-wrap">
            ${buildRadarSVG(values)}
          </div>
        </article>

        <!-- STAT 1 -->
        <article class="p1-bento-cell p1-stat">
          <div class="p1-stat-foot" style="justify-content:flex-start; align-items:center;">
            <div class="p1-stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
          </div>
          <div class="p1-stat-value" id="p1-stat-avg">${avgScore}<span class="unit">%</span></div>
          <div class="p1-stat-foot">
            <div class="p1-stat-label">متوسط الأداء</div>
            <span class="p1-delta ${avgScore >= 50 ? 'up' : 'down'}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                ${avgScore >= 50 ? '<polyline points="18 15 12 9 6 15"/>' : '<polyline points="6 9 12 15 18 9"/>'}
              </svg>
              ${avgScore >= 50 ? '+' : '-'}${Math.abs(avgScore - 50)}
            </span>
          </div>
        </article>

        <!-- STAT 2 -->
        <article class="p1-bento-cell p1-stat">
          <div class="p1-stat-foot" style="justify-content:flex-start;">
            <div class="p1-stat-icon" aria-hidden="true" style="color:var(--p1-violet); background:rgba(139,92,246,0.12); border-color:rgba(139,92,246,0.22);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
          </div>
          <div class="p1-stat-value" id="p1-stat-completion">${completionPct}<span class="unit">%</span></div>
          <div class="p1-stat-foot">
            <div class="p1-stat-label">معدل الإتمام</div>
            <span class="p1-delta up">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"/></svg>
              ${activeDays} يوم
            </span>
          </div>
        </article>

        <!-- STAT 3 -->
        <article class="p1-bento-cell p1-stat">
          <div class="p1-stat-foot" style="justify-content:flex-start;">
            <div class="p1-stat-icon" aria-hidden="true" style="color:var(--p1-amber); background:rgba(245,158,11,0.12); border-color:rgba(245,158,11,0.22);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
          </div>
          <div class="p1-stat-value" id="p1-stat-hours">${totalHours}<span class="unit">س</span></div>
          <div class="p1-stat-foot">
            <div class="p1-stat-label">ساعات التدريب</div>
            <span class="p1-delta ${streak > 0 ? 'up' : 'flat'}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"/></svg>
              🔥 ${streak}
            </span>
          </div>
        </article>

        <!-- STAT 4 -->
        <article class="p1-bento-cell p1-stat">
          <div class="p1-stat-foot" style="justify-content:flex-start;">
            <div class="p1-stat-icon" aria-hidden="true" style="color:var(--p1-blue); background:rgba(14,165,233,0.12); border-color:rgba(14,165,233,0.22);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
          </div>
          <div class="p1-stat-value" id="p1-stat-mastered">${masteredModules}<span class="unit">/ ${PHASE1.axes.length}</span></div>
          <div class="p1-stat-foot">
            <div class="p1-stat-label">وحدات متقنة</div>
            <span class="p1-delta ${masteredModules > 0 ? 'up' : 'flat'}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              ${masteredModules > 0 ? 'ممتاز' : 'ابدأ'}
            </span>
          </div>
        </article>

        <!-- ACTIVITY HEATMAP -->
        <article class="p1-bento-cell p1-heatmap-cell">
          <div class="p1-heatmap-head">
            <div class="p1-heatmap-title-wrap">
              <div class="p1-heatmap-title">سجل النشاط السنوي</div>
              <div class="p1-heatmap-sub">52 أسبوعاً · ${activeDays} يوم نشاط</div>
            </div>
            <div class="p1-streak" title="السلسلة الحالية">
              <span>🔥 سلسلة</span>
              <span class="num" id="p1-streak-num">${streak}</span>
              <span>يوم</span>
            </div>
          </div>
          <div class="p1-heatmap-scroll">${buildHeatmap(activity)}</div>
          <div class="p1-heatmap-legend">
            <span>أقل</span>
            <span class="swatch" style="background:var(--p1-heat-0, rgba(255,255,255,0.04));"></span>
            <span class="swatch" style="background:var(--p1-heat-1, rgba(102,252,241,0.18));"></span>
            <span class="swatch" style="background:var(--p1-heat-2, rgba(102,252,241,0.42));"></span>
            <span class="swatch" style="background:var(--p1-heat-3, rgba(102,252,241,0.68));"></span>
            <span class="swatch" style="background:var(--p1-heat-4, var(--accent));"></span>
            <span>أكثر</span>
          </div>
        </article>

        <!-- QUICK ACCESS -->
        <article class="p1-bento-cell p1-quick-cell">
          <div class="p1-quick-title">وصول سريع</div>
          <div class="p1-quick-grid">
            ${PHASE1.quickLinks.map(ql => `
              <button class="p1-quick-btn"
                      type="button"
                      tabindex="0"
                      aria-label="${ql.label}"
                      data-quick-target="${ql.key}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${ql.svg}</svg>
                <span class="p1-quick-label">${ql.label}</span>
              </button>
            `).join('')}
          </div>
        </article>

      </section>
    `;

    // Place BEFORE .page-header so the bento grid is the first thing users see,
    // and all existing dashboard content below stays untouched.
    const header = dash.querySelector('.page-header');
    if (header) header.insertAdjacentHTML('beforebegin', bentoHTML);
    else        dash.insertAdjacentHTML('afterbegin', bentoHTML);

    // Wire quick-access buttons (click + keyboard)
    $$('#page-dashboard .p1-quick-btn').forEach(btn => {
      const target = btn.getAttribute('data-quick-target');
      const go = () => {
        try {
          if (typeof window.navigateTo === 'function')      window.navigateTo(target);
          else if (typeof window.navigatePage === 'function') window.navigatePage(target);
          else {
            const navEl = document.querySelector(`.nav-item[data-page="${target}"]`);
            if (navEl) navEl.click();
          }
        } catch (_) { /* fail silent */ }
      };
      btn.addEventListener('click', go);
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    });
  }

  /* Re-render radar from live module scores (called on dashboard re-entry) */
  function refreshRadar() {
    const wrap = document.getElementById('p1-radar-wrap');
    if (!wrap) return;
    const values = PHASE1.axes.map(ax => readModuleScore(ax.moduleKey));
    wrap.innerHTML = buildRadarSVG(values);
  }

  /* ─────────────────────────────────────────────────
     PHASE 1C · SIDEBAR UPGRADE
  ───────────────────────────────────────────────── */

  // Abstract Arabic monogram: overlapping أ + ت
  const MONOGRAM_SVG = `
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <defs>
        <linearGradient id="p1-mono-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stop-color="#66FCF1"/>
          <stop offset="100%" stop-color="#8B5CF6"/>
        </linearGradient>
      </defs>
      <!-- أ: vertical stroke with hamza dot -->
      <path d="M10 7 L10 25" stroke="url(#p1-mono-grad)"/>
      <circle cx="10" cy="4.4" r="1.4" fill="url(#p1-mono-grad)" stroke="none"/>
      <!-- ت: horizontal base + two dots above -->
      <path d="M6 19 L26 19" stroke="url(#p1-mono-grad)"/>
      <path d="M22 15 L22 25" stroke="url(#p1-mono-grad)"/>
      <circle cx="18" cy="13.5" r="1.2" fill="url(#p1-mono-grad)" stroke="none"/>
      <circle cx="24" cy="13.5" r="1.2" fill="url(#p1-mono-grad)" stroke="none"/>
    </svg>
  `;

  function upgradeSidebarLogo() {
    const logoIcon = document.querySelector('#sidebar .logo-icon');
    if (!logoIcon) return;
    logoIcon.classList.add('p1-monogram');
    logoIcon.innerHTML = MONOGRAM_SVG;
  }

  function upgradeUserAvatar() {
    const avatar = document.querySelector('#sidebar .user-avatar');
    if (!avatar) return;
    // Read initials from user-name or fallback to أح
    const nameEl = document.querySelector('#sidebar .user-name');
    const rawName = (nameEl && nameEl.textContent.trim()) || 'أحمد المدير';
    // Extract 2 first-letters from first two words (Arabic friendly)
    const parts = rawName.split(/\s+/).filter(Boolean);
    const initials = (parts[0] || '').slice(0, 1) + (parts[1] ? parts[1].slice(0, 1) : (parts[0] || '').slice(1, 2));
    const display = (initials || 'أح').slice(0, 2);

    avatar.classList.add('p1-avatar');
    avatar.innerHTML = `
      <svg viewBox="0 0 40 40" role="img" aria-label="صورة المستخدم">
        <defs>
          <linearGradient id="p1-avatar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"  stop-color="#66FCF1"/>
            <stop offset="60%" stop-color="#0EA5E9"/>
            <stop offset="100%" stop-color="#8B5CF6"/>
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="20" fill="url(#p1-avatar-grad)"/>
        <text x="20" y="25" text-anchor="middle"
              font-family="Cairo, sans-serif" font-size="14" font-weight="800"
              fill="#05060C">${display}</text>
      </svg>
    `;
  }

  function injectCollapseToggle() {
    const sidebar = document.getElementById('sidebar');
    const app     = document.getElementById('app');
    if (!sidebar || !app || sidebar.querySelector('.p1-collapse-btn')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'p1-collapse-btn';
    btn.tabIndex = 0;
    btn.setAttribute('aria-label', 'طي القائمة الجانبية');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    `;

    // Restore previous state
    if (safeGet('sidebar_collapsed', '0') === '1') {
      app.classList.add('p1-sidebar-collapsed');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.setAttribute('aria-pressed', 'false');
    }

    const toggle = () => {
      const collapsed = app.classList.toggle('p1-sidebar-collapsed');
      safeSet('sidebar_collapsed', collapsed ? '1' : '0');
      btn.setAttribute('aria-pressed', collapsed ? 'true' : 'false');
      btn.setAttribute('aria-label', collapsed ? 'توسيع القائمة الجانبية' : 'طي القائمة الجانبية');
    };
    btn.addEventListener('click', toggle);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    sidebar.appendChild(btn);
  }

  /* Today's Focus — injected above the user footer */
  function injectFocusWidget() {
    const footer = document.querySelector('#sidebar .sidebar-footer');
    if (!footer || document.querySelector('.p1-focus-widget')) return;

    // Find lowest-score module → that is today's focus
    const scored = PHASE1.axes
      .map(ax => ({ ...ax, score: readModuleScore(ax.moduleKey) }))
      .sort((a, b) => a.score - b.score);
    const pick = scored[0];

    const el = document.createElement('div');
    el.className = 'p1-focus-widget';
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', 'تركيز اليوم: ' + pick.label);
    el.innerHTML = `
      <div class="p1-focus-label">تركيز اليوم</div>
      <div class="p1-focus-title">${pick.label}</div>
      <div class="p1-focus-meta">الإتقان الحالي · ${Math.round(pick.score)}%</div>
    `;
    const go = () => {
      try {
        if (typeof window.navigateTo === 'function') window.navigateTo(pick.moduleKey);
        else {
          const navEl = document.querySelector(`.nav-item[data-page="${pick.moduleKey}"]`);
          if (navEl) navEl.click();
        }
      } catch (_) { /* silent */ }
    };
    el.addEventListener('click', go);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });

    footer.parentNode.insertBefore(el, footer);
  }

  /* ─────────────────────────────────────────────────
     INIT — lazy after first paint (per global perf rule)
  ───────────────────────────────────────────────── */
  function init() {
    try { upgradeSidebarLogo();      } catch (e) { console.warn('[P1] logo',    e); }
    try { upgradeUserAvatar();       } catch (e) { console.warn('[P1] avatar',  e); }
    try { injectCollapseToggle();    } catch (e) { console.warn('[P1] collapse',e); }
    try { injectFocusWidget();       } catch (e) { console.warn('[P1] focus',   e); }
    try { injectBentoGrid();         } catch (e) { console.warn('[P1] bento',   e); }

    // Refresh radar whenever the dashboard becomes active again
    try {
      const dashNav = document.querySelector('.nav-item[data-page="dashboard"]');
      if (dashNav) dashNav.addEventListener('click', () => setTimeout(refreshRadar, 50));
    } catch (_) { /* silent */ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 100));
  } else {
    setTimeout(init, 100);
  }

  // Expose small debug surface
  window.__PHASE1 = { refreshRadar, PHASE1 };
})();



/* ===== JS block — QL v13 Phase 2 · Magnetic Cursor Aura ===== */
(function qlCursorAura(){
  'use strict';
  // Bail on touch / coarse pointer
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
  // Respect reduced motion: still show aura but skip rAF easing — snap instead
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init(){
    if (document.getElementById('cursor-aura')) return;
    var aura = document.createElement('div');
    aura.id = 'cursor-aura';
    aura.setAttribute('aria-hidden', 'true');
    document.body.appendChild(aura);

    var tx = window.innerWidth / 2;
    var ty = window.innerHeight / 2;
    var x = tx, y = ty;
    var seen = false;

    function onMove(e){
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        aura.classList.add('is-active');
      }
    }
    function onLeave(){ aura.classList.remove('is-active'); seen = false; }
    function onEnter(){ aura.classList.add('is-active'); seen = true; }

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    if (reduce) {
      document.addEventListener('mousemove', function(e){
        aura.style.transform = 'translate3d(' + e.clientX + 'px,' + e.clientY + 'px,0)';
      }, { passive: true });
      return;
    }

    function loop(){
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      aura.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();



/* ===== JS block — QL v13 Phase 3 · Sectional Identity + Living Numerals ===== */
(function qlSectionalIdentity(){
  'use strict';
  function setActive(pageId){
    if (!pageId) return;
    document.body.dataset.activeSection = pageId;
  }
  // Wrap navigateTo if it exists; else listen for nav clicks as a safety net.
  function wrapNavigate(){
    if (typeof window.navigateTo === 'function') {
      var orig = window.navigateTo;
      window.navigateTo = function(pageId){
        var r = orig.apply(this, arguments);
        try { setActive(pageId); } catch(_){}
        return r;
      };
    }
    // Safety net: also catch direct nav-item clicks (matches existing pattern)
    document.addEventListener('click', function(e){
      var item = e.target.closest && e.target.closest('.nav-item[data-page]');
      if (item) setActive(item.dataset.page);
    }, true);
    // Initial tint for whichever page is active on load
    var activePage = document.querySelector('.page.active');
    if (activePage && activePage.id && activePage.id.indexOf('page-') === 0) {
      setActive(activePage.id.replace('page-', ''));
    } else {
      setActive('dashboard');
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrapNavigate);
  } else {
    // Defer one tick so we wrap AFTER block #3 IIFE registered window.navigateTo
    setTimeout(wrapNavigate, 0);
  }
})();

/* ===== JS block — QL v13 Phase 3 · Living Numerals (counter on viewport) ===== */
(function qlLivingNumerals(){
  'use strict';
  if (!('IntersectionObserver' in window)) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

  function animate(el){
    var to       = parseFloat(el.dataset.countTo);
    var from     = parseFloat(el.dataset.countFrom || '0');
    var duration = parseInt(el.dataset.countDuration || '1400', 10);
    var decimals = parseInt(el.dataset.countDecimals || '0', 10);
    var prefix   = el.dataset.countPrefix || '';
    var suffix   = el.dataset.countSuffix || '';
    if (isNaN(to)) return;
    if (reduce) {
      el.textContent = prefix + to.toFixed(decimals) + suffix;
      return;
    }
    var start = null;
    function step(ts){
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var v = from + (to - from) * easeOutCubic(p);
      el.textContent = prefix + v.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function observe(){
    var nodes = document.querySelectorAll('[data-count-to]');
    if (!nodes.length) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) {
          animate(en.target);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });
    nodes.forEach(function(n){ io.observe(n); });
  }

  // Auto-tag visible numeric stats so existing markup gets the effect for free.
  function autoTag(){
    var candidates = document.querySelectorAll(
      '.call-card .num, .stat-value, .stat-card .num, [data-stat-num]'
    );
    candidates.forEach(function(el){
      if (el.dataset.countTo) return;
      var raw = (el.textContent || '').trim();
      // accept "1,234", "98", "12.5", "5K" → strip non-digits/dot for parse
      var clean = raw.replace(/[^\d.\-]/g, '');
      if (!clean) return;
      var n = parseFloat(clean);
      if (isNaN(n) || n === 0) return;
      // Preserve any non-digit suffix (K, %, +) by detecting trailing chars
      var m = raw.match(/[^\d,\.\s\-]+$/);
      if (m) el.dataset.countSuffix = m[0];
      // Decimals
      if (clean.indexOf('.') > -1) {
        el.dataset.countDecimals = String(clean.split('.')[1].length);
      }
      el.dataset.countTo = String(n);
    });
  }

  function boot(){
    autoTag();
    observe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    setTimeout(boot, 50);
  }
})();



/* ===== JS block — QL v13 Phase 4 · View Transitions for theme switch ===== */
(function qlThemeViewTransition(){
  'use strict';
  function wrap(){
    if (typeof window.toggleTheme !== 'function') return;
    if (window.toggleTheme.__qlV13) return; // idempotent
    var orig = window.toggleTheme;
    function safe(){
      // No View Transitions API → straight call
      if (!document.startViewTransition) return orig.apply(this, arguments);
      // Reduced motion → straight call (no transition)
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return orig.apply(this, arguments);
      }
      var args = arguments;
      var ctx  = this;
      try {
        return document.startViewTransition(function(){ orig.apply(ctx, args); });
      } catch(_) {
        return orig.apply(ctx, args);
      }
    }
    safe.__qlV13 = true;
    window.toggleTheme = safe;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrap);
  } else {
    setTimeout(wrap, 0);
  }
})();



/* ===== JS block — QL v13 Phase 4 · Visibility-pause (battery friendly) ===== */
(function qlVisibilityPause(){
  'use strict';
  function update(){
    document.body.classList.toggle('is-hidden', document.hidden === true);
  }
  document.addEventListener('visibilitychange', update);
  update();
})();



/* ================================================================
   WORKER 02 · PHASE 4 — Account Management Tools
   - NRR Calculator (live)
   - Health Score (weighted 6-factor)
================================================================ */
(function qlAccountMgr(){
  'use strict';
  if (window.__qlAccountMgr) return;
  window.__qlAccountMgr = true;

  function $(sel){ return document.querySelector(sel); }
  function $$(sel){ return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function fmt(n){ return (Number(n)||0).toLocaleString('en-US'); }

  /* ── NRR ─────────────────────────────────────────────────── */
  function recalcNRR(){
    var s = +($('[data-nrr="start"]')||{}).value || 0;
    var e = +($('[data-nrr="expand"]')||{}).value || 0;
    var d = +($('[data-nrr="down"]')||{}).value || 0;
    var c = +($('[data-nrr="churn"]')||{}).value || 0;
    var net = e - d - c;
    var nrr = s > 0 ? ((s + net) / s) * 100 : 0;

    var nrrOut = $('[data-nrr-out="nrr"]');
    var netOut = $('[data-nrr-out="net"]');
    var warn   = $('[data-nrr-warn]');
    if (nrrOut) nrrOut.textContent = nrr.toFixed(1) + '%';
    if (netOut) netOut.textContent = (net >= 0 ? '+$' : '−$') + fmt(Math.abs(Math.round(net)));
    if (warn) {
      if (s <= 0) { warn.hidden = true; }
      else if (nrr >= 110) {
        warn.hidden = false; warn.classList.add('lab-warn-ok');
        warn.textContent = '✓ ممتاز: NRR ≥ 110% — نمو من القاعدة القائمة (المعيار الذهبي SaaS).';
      } else if (nrr >= 100) {
        warn.hidden = false; warn.classList.remove('lab-warn-ok');
        warn.textContent = 'مقبول: NRR بين 100-110%. تعويض churn فقط، بلا توسّع حقيقي.';
      } else {
        warn.hidden = false; warn.classList.remove('lab-warn-ok');
        warn.textContent = '⚠️ خطر: NRR < 100% — تخسر إيراد من العملاء القائمين. راجع Health Scores.';
      }
    }
  }
  $$('[data-nrr]').forEach(function(i){ i.addEventListener('input', recalcNRR); });
  if ($('[data-lab="nrr"]')) recalcNRR();

  /* ── Health Score (weighted) ─────────────────────────────── */
  var WEIGHTS = { usage: 0.25, nps: 0.20, support: 0.15, exec: 0.15, contract: 0.10, payment: 0.15 };
  function recalcHS(){
    var total = 0;
    Object.keys(WEIGHTS).forEach(function(k){
      var input = $('[data-hs="' + k + '"]');
      var v = input ? +input.value || 0 : 0;
      total += v * WEIGHTS[k];
      // sync the value display
      if (input) {
        var row = input.closest('.hs-row');
        if (row) {
          var valSpan = row.querySelector('.hs-val');
          if (valSpan) valSpan.textContent = v;
        }
      }
    });
    var score = Math.round(total);
    var scoreEl = $('[data-hs-score]');
    var bandEl  = $('[data-hs-band]');
    if (scoreEl) scoreEl.textContent = score;
    if (bandEl) {
      bandEl.classList.remove('hs-band-good','hs-band-mid','hs-band-bad');
      if (score >= 80) {
        bandEl.classList.add('hs-band-good');
        bandEl.textContent = '✓ ممتاز — جاهز للـ Expansion. اقترح cross-sell خلال 30 يوم.';
      } else if (score >= 50) {
        bandEl.classList.add('hs-band-mid');
        bandEl.textContent = 'متوسط — راقب. حدّد عاملين أضعف وضع خطة 60 يوم لرفعهما.';
      } else {
        bandEl.classList.add('hs-band-bad');
        bandEl.textContent = '⚠ خطر churn — escalate فوراً. خطة Recovery 30 يوم + تواصل تنفيذي.';
      }
    }
  }
  $$('[data-hs]').forEach(function(i){ i.addEventListener('input', recalcHS); });
  if ($('[data-lab="health"]')) recalcHS();
})();



/* ================================================================
   WORKER 02 · PHASE 1 — Sales Frameworks Modal Controller
   Hooks: [data-sf-row], [data-sf-modal], [data-sf-close]
   - Click / Enter / Space on a row opens the matching modal.
   - Overlay click, close button, or ESC closes it.
   - Focus trap is light (returns focus to trigger row on close).
   - Idempotent: guards against double-binding via window.__sfBound.
================================================================ */
(function qlSalesFrameworks(){
  'use strict';
  if (window.__sfBound) return;
  window.__sfBound = true;

  var lastTrigger = null;

  function getModal(key){
    return document.querySelector('[data-sf-modal="' + key + '"]');
  }

  function openModal(key){
    var modal = getModal(key);
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('sf-modal-open');
    var btn = modal.querySelector('.sf-modal-close');
    if (btn) { try { btn.focus({ preventScroll: true }); } catch(_){} }
  }

  function closeModal(modal){
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    if (!document.querySelector('.sf-modal:not([hidden])')) {
      document.body.classList.remove('sf-modal-open');
    }
    if (lastTrigger) {
      try { lastTrigger.focus({ preventScroll: true }); } catch(_){}
      lastTrigger = null;
    }
  }

  function closeAll(){
    document.querySelectorAll('.sf-modal:not([hidden])').forEach(closeModal);
  }

  document.addEventListener('click', function(e){
    var row = e.target.closest && e.target.closest('[data-sf-row]');
    if (row) {
      lastTrigger = row;
      openModal(row.getAttribute('data-sf-row'));
      return;
    }
    if (e.target.closest && e.target.closest('[data-sf-close]')) {
      var modal = e.target.closest('.sf-modal');
      closeModal(modal);
    }
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' || e.keyCode === 27) { closeAll(); return; }
    var row = e.target && e.target.matches && e.target.matches('[data-sf-row]') ? e.target : null;
    if (!row) return;
    if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      lastTrigger = row;
      openModal(row.getAttribute('data-sf-row'));
    }
  });
})();



/* ================================================================
   WORKER 02 · PHASE 3 — Interactive Sales Labs
   - Lab 1: Funnel Calculator (live math + SVG labels + warning)
   - Lab 2: Objection Trainer (rule-based 4-axis rubric)
   - Lab 3: Pitch Builder (template-driven, 60s structure)
   localStorage: upg_pitch_drafts (last pitch only), upg_objection_scores (last 10)
================================================================ */
(function qlSalesLabs(){
  'use strict';
  if (window.__qlSalesLabs) return;
  window.__qlSalesLabs = true;

  function $(sel, root){ return (root || document).querySelector(sel); }
  function $$(sel, root){ return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function fmt(n){ return (Number(n)||0).toLocaleString('en-US'); }
  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

  /* ── Lab 1: Funnel ─────────────────────────────────────────── */
  function recalcFunnel(){
    var leads  = +($('[data-funnel="leads"]')||{}).value || 0;
    var r1     = clamp(+($('[data-funnel="r1"]')||{}).value || 0, 0, 100) / 100;
    var r2     = clamp(+($('[data-funnel="r2"]')||{}).value || 0, 0, 100) / 100;
    var r3     = clamp(+($('[data-funnel="r3"]')||{}).value || 0, 0, 100) / 100;
    var size   = +($('[data-funnel="size"]')||{}).value || 0;
    var quota  = +($('[data-funnel="quota"]')||{}).value || 0;

    var qual = leads * r1;
    var prop = qual  * r2;
    var won  = prop  * r3;
    var revenue = won * size;
    // Pipeline coverage: total proposal-stage value / quota
    var pipelineValue = prop * size;
    var coverage = quota > 0 ? (pipelineValue / quota) : 0;

    setText('[data-funnel-label="leads"]', fmt(Math.round(leads)));
    setText('[data-funnel-label="qual"]',  fmt(Math.round(qual)));
    setText('[data-funnel-label="prop"]',  fmt(Math.round(prop)));
    setText('[data-funnel-label="won"]',   fmt(Math.round(won)));

    setText('[data-funnel-out="deals"]',   fmt(Math.round(won)));
    setText('[data-funnel-out="revenue"]', '$' + fmt(Math.round(revenue)));
    setText('[data-funnel-out="coverage"]', coverage.toFixed(2) + 'x');

    var warn = $('[data-funnel-warn]');
    if (warn) {
      if (quota <= 0) {
        warn.hidden = true;
      } else if (coverage < 2.5) {
        warn.hidden = false;
        warn.classList.remove('lab-warn-ok');
        warn.textContent = '⚠️ خطر: Pipeline Coverage ' + coverage.toFixed(2) + 'x أقل من 2.5x — لن تحقق الـ quota. ابحث عن leads إضافية أو حسّن نسبة Qualified→Proposal.';
      } else if (coverage >= 3) {
        warn.hidden = false;
        warn.classList.add('lab-warn-ok');
        warn.textContent = '✓ ممتاز: Coverage ' + coverage.toFixed(2) + 'x ضمن المعيار الصحي (≥ 3x).';
      } else {
        warn.hidden = false;
        warn.classList.remove('lab-warn-ok');
        warn.textContent = 'تنبيه: Coverage ' + coverage.toFixed(2) + 'x مقبول لكن قريب من الحد الأدنى. زِد الـ leads أو حسّن التحويل.';
      }
    }
  }
  function setText(sel, val){ var el = $(sel); if (el) el.textContent = val; }

  $$('[data-funnel]').forEach(function(input){
    input.addEventListener('input', recalcFunnel);
  });
  if ($('[data-lab="funnel"]')) recalcFunnel();

  /* ── Lab 2: Objection Trainer (rule-based) ─────────────────── */
  var OBJECTIONS = [
    'غاااالي والله، ما يستاهل هل المبلغ.',
    'خل أفكر وأرجعلك بكرة.',
    'اخويه عنده هذا الشي بنص السعر.',
    'ميزانيتنا قاطعة هل سنة، السنة الجاية ممكن.',
    'لازم آخذ موافقة المدير قبل أمضي.',
    'نشوف بالأشهر الجاية، الحين مو أولوية.',
    'الشركة الفلانية اتصلت بينا قبلكم.',
    'حضرتك ما عندك مكتب بالعراق؟',
    'السعر بالدولار لو دينار؟ الصرف يتغيّر.',
    'الدفع كاش لو حوالة؟',
    'نجرب شهر بس، وبعدين نحكي.',
    'خلي مديرك يتصل بنا، أنت مو متخوّل.'
  ];
  // Per-axis indicator tokens (each indicator: 1 point if present in answer)
  var INDICATORS = {
    empathy:    ['أفهم', 'أعرف', 'طبيعي', 'حقك', 'أحترم', 'صح', 'منطقي', 'معك', 'أتفق'],
    reframe:    ['بالمقارنة', 'القيمة', 'تكلفة', 'ROI', 'لو ما', 'عائد', 'فرق', 'ميزة', 'سؤال', 'تخيّل', 'الحقيقة'],
    specific:   ['د.ع', 'دينار', 'ألف', 'مليون', 'يوم', 'شهر', 'ساعة', '%', 'SLA', 'عميل', 'مرة', 'حالة'],
    forward:    ['نتفق', 'موعد', 'نمضي', 'الخطوة', 'بكرة', 'ممكن', 'نحجز', 'عقد', 'pilot', 'تجربة', 'ندخل', 'نوقّع']
  };
  function score(text){
    var t = (text || '').toLowerCase();
    var axes = {};
    Object.keys(INDICATORS).forEach(function(axis){
      var hits = 0;
      INDICATORS[axis].forEach(function(tok){
        if (t.indexOf(tok.toLowerCase()) >= 0) hits++;
      });
      // 5-point scale: cap at 5
      axes[axis] = clamp(hits, 0, 5);
    });
    // length sanity: ultra-short answer halves all (no real answer)
    if (t.replace(/\s+/g,' ').trim().length < 40) {
      Object.keys(axes).forEach(function(k){ axes[k] = Math.max(0, axes[k] - 2); });
    }
    return axes;
  }
  function renderScore(s){
    var labels = { empathy: 'Empathy (تعاطف)', reframe: 'Reframe (إعادة تأطير)', specific: 'Specificity (دقة)', forward: 'Forward Motion (تحريك للأمام)' };
    var bars = $('[data-ot-bars]');
    if (bars) {
      bars.innerHTML = Object.keys(s).map(function(k){
        var pct = (s[k] / 5) * 100;
        return '<div class="ot-bar"><span>' + labels[k] + '</span>' +
               '<span class="ot-bar-track"><span class="ot-bar-fill" style="inline-size:' + pct + '%;width:' + pct + '%;"></span></span>' +
               '<span class="ot-bar-val">' + s[k] + '/5</span></div>';
      }).join('');
    }
    var fb = $('[data-ot-feedback]');
    if (fb) {
      var tips = [];
      if (s.empathy < 2)  tips.push('ابدأ بإقرار: «أفهم» / «طبيعي تسأل» قبل ما تردّ. التعاطف يفتح الأذن.');
      if (s.reframe < 2)  tips.push('أعد تأطير الاعتراض — اربطه بالقيمة (ROI / تكلفة عدم الفعل) لا بالسعر فقط.');
      if (s.specific < 2) tips.push('أضف رقم محدد: د.ع/USD/أيام/% — الأرقام تُسكت الجدل.');
      if (s.forward < 2)  tips.push('أنهِ بخطوة واضحة: «نحجز موعد بكرة؟» — لا تترك الكرة ساكنة.');
      if (!tips.length) tips.push('ردّ متين على كل المحاور. حسّن الأسلوب بتنويع نبرة الـ empathy.');
      fb.innerHTML = '<b>توصيات:</b><ul>' + tips.map(function(t){ return '<li>' + t + '</li>'; }).join('') + '</ul>';
    }
    var box = $('[data-ot-result]');
    if (box) box.hidden = false;

    // persist last 10
    try {
      var k = 'upg_objection_scores';
      var arr = JSON.parse(localStorage.getItem(k) || '[]');
      arr.push({ ts: Date.now(), s: s });
      if (arr.length > 10) arr = arr.slice(-10);
      localStorage.setItem(k, JSON.stringify(arr));
    } catch(_){}
  }
  var newBtn   = $('[data-ot-new]');
  var scoreBtn = $('[data-ot-score]');
  if (newBtn) newBtn.addEventListener('click', function(){
    var idx = Math.floor(Math.random() * OBJECTIONS.length);
    var p = $('[data-ot-prompt]');
    if (p) p.textContent = OBJECTIONS[idx];
    var box = $('[data-ot-result]');
    if (box) box.hidden = true;
    var input = $('[data-ot-input]');
    if (input) input.value = '';
  });
  if (scoreBtn) scoreBtn.addEventListener('click', function(){
    var input = $('[data-ot-input]');
    var txt = input ? input.value : '';
    if (!txt || txt.trim().length < 3) {
      alert('اكتب ردك أولاً قبل التقييم.');
      return;
    }
    renderScore(score(txt));
  });

  /* ── Lab 3: Pitch Builder ──────────────────────────────────── */
  var CTA_TEXT = {
    demo:    'هل نحجز Demo قصيرة 15 دقيقة هذا الأسبوع؟',
    pilot:   'نبدأ Pilot 30 يوم بمعايير نتفق عليها سوا؟',
    meeting: 'نرتّب لقاء قصير مع مديرك يوم الأحد القادم؟',
    trial:   'نفعّل لك تجربة مجانية 14 يوم اليوم؟'
  };
  function buildPitch(){
    function v(k){ var el = $('[data-pitch="' + k + '"]'); return (el && el.value || '').trim(); }
    var product  = v('product')  || '[المنتج]';
    var audience = v('audience') || '[العميل]';
    var problem  = v('problem')  || '[المشكلة]';
    var solution = v('solution') || '[الحل]';
    var diff     = v('diff')     || '[الـ Differentiator]';
    var proof    = v('proof')    || '[Proof Point]';
    var cta      = v('cta')      || 'demo';

    var hookText     = 'كم من ' + audience + ' يخسرون يومياً بسبب ' + problem + '؟';
    var problemText  = 'المشكلة: ' + problem + '. النتيجة: وقت ضائع، أرقام غير موثوقة، وقرارات مبنية على تخمين.';
    var solutionText = product + ' = ' + solution + '. الفرق الجوهري: ' + diff + '.';
    var proofText    = 'دليل ميداني: ' + proof + '.';
    var ctaText      = CTA_TEXT[cta] || CTA_TEXT.demo;

    setOut('hook',     hookText);
    setOut('problem',  problemText);
    setOut('solution', solutionText);
    setOut('proof',    proofText);
    setOut('cta',      ctaText);
    var out = $('[data-pitch-output]');
    if (out) out.hidden = false;

    try {
      localStorage.setItem('upg_pitch_drafts', JSON.stringify({
        ts: Date.now(),
        hook: hookText, problem: problemText, solution: solutionText, proof: proofText, cta: ctaText
      }));
    } catch(_){}
  }
  function setOut(k, v){ var el = $('[data-pitch-out="' + k + '"]'); if (el) el.textContent = v; }

  var genBtn = $('[data-pitch-generate]');
  if (genBtn) genBtn.addEventListener('click', buildPitch);

  var copyBtn = $('[data-pitch-copy]');
  if (copyBtn) copyBtn.addEventListener('click', function(){
    var parts = ['hook','problem','solution','proof','cta'].map(function(k){
      var el = $('[data-pitch-out="' + k + '"]');
      return el ? el.textContent : '';
    }).filter(Boolean);
    var txt = parts.join('\n\n');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt);
      } else {
        var ta = document.createElement('textarea');
        ta.value = txt; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch(_){}
        document.body.removeChild(ta);
      }
      var saved = $('[data-pitch-saved]');
      if (saved) {
        saved.hidden = false;
        setTimeout(function(){ saved.hidden = true; }, 1800);
      }
    } catch(_){}
  });
})();



/* ================================================================
   WORKER 02 · PHASE 5 — Sales Module Progress Tracker
   IntersectionObserver counts how many ".sales-section-header"
   blocks have entered the viewport on #page-fieldsales,
   updates the sticky progress pill, and persists via localStorage.
   Key: upg_progress_sales (best-ever percentage seen).
================================================================ */
(function qlSalesProgress(){
  'use strict';
  if (window.__qlSalesProgress) return;
  window.__qlSalesProgress = true;
  if (!('IntersectionObserver' in window)) return;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      setTimeout(fn, 0);
    }
  }

  ready(function(){
    var page = document.getElementById('page-fieldsales');
    if (!page) return;

    var pill   = page.querySelector('[data-sp-pill]');
    var fill   = page.querySelector('[data-sp-fill]');
    var pct    = page.querySelector('[data-sp-pct]');
    var dn     = page.querySelector('[data-sp-blocks]');
    var dt     = page.querySelector('[data-sp-total]');
    if (!pill || !fill || !pct || !dn || !dt) return;

    var blocks = page.querySelectorAll('.sales-section-header');
    var total  = blocks.length;
    if (!total) return;
    var seen = new Set();

    // Hydrate from storage (best ever)
    var stored = 0;
    try {
      var raw = localStorage.getItem('upg_progress_sales');
      stored = raw ? Math.max(0, Math.min(100, parseFloat(raw) || 0)) : 0;
    } catch(_){}

    function paint(){
      var current = Math.round((seen.size / total) * 100);
      var best    = Math.max(current, stored);
      fill.style.inlineSize = best + '%';
      fill.style.width      = best + '%';
      pct.textContent       = best;
      dn.textContent        = seen.size;
      dt.textContent        = total;
      if (current > stored) {
        stored = current;
        try { localStorage.setItem('upg_progress_sales', String(current)); } catch(_){}
      }
    }
    paint();

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
          seen.add(entry.target);
        }
      });
      paint();
    }, { threshold: [0, 0.4, 0.75], rootMargin: '0px 0px -20% 0px' });

    blocks.forEach(function(b){ io.observe(b); });
  });
})();

/* ================================================================
   WORKER 03 · PHASE 1 — Archetype Card Toggle
   Click an archetype card head → toggles open class.
   Multiple-open allowed (different from psych accordion).
================================================================ */
(function qlArchToggle(){
  'use strict';
  if (window.__qlArchToggle) return;
  window.__qlArchToggle = true;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      setTimeout(fn, 0);
    }
  }

  ready(function(){
    var page = document.getElementById('page-callcenter');
    if (!page) return;
    var heads = page.querySelectorAll('[data-arch-toggle]');
    heads.forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        var card = btn.closest('.arch-card');
        if (!card) return;
        card.classList.toggle('open');
      });
    });
  });
})();

/* ================================================================
   WORKER 03 · PHASE 2 — KPI Calculator (Agent Performance Index)
   Composite scoring + benchmark comparison + 3 dynamic recommendations.
   No localStorage write; pure compute. localStorage key reserved for Phase 3.
================================================================ */
(function qlKpiCalc(){
  'use strict';
  if (window.__qlKpiCalc) return;
  window.__qlKpiCalc = true;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      setTimeout(fn, 0);
    }
  }

  // Score helpers — each returns 0-100
  function scoreAHT(min){
    // Optimal 4-6 min. Below 3 or above 8 penalized.
    if (min >= 4 && min <= 6) return 100;
    if (min >= 3 && min < 4) return 85;
    if (min > 6 && min <= 7) return 80;
    if (min > 7 && min <= 8) return 60;
    if (min < 3) return 50;  // Too fast = rushed
    return Math.max(20, 100 - (min - 8) * 12);
  }
  function scoreLinear(val, target){
    // FCR/CSAT/QA: higher is better up to target then capped
    if (val >= target) return 100;
    return Math.max(0, Math.round((val / target) * 100));
  }
  function scoreAdh(val){
    // Optimal 92-95. 100 is bad sign.
    if (val >= 92 && val <= 95) return 100;
    if (val > 95 && val <= 98) return 90;
    if (val > 98) return 70;     // suspiciously high
    if (val >= 88 && val < 92) return 80;
    return Math.max(20, val - 50);
  }

  function tier(score){
    if (score >= 90) return { label: '🏆 نخبة — Top Performer', color: '#22c55e' };
    if (score >= 80) return { label: '✨ ممتاز — Above Average', color: '#66FCF1' };
    if (score >= 70) return { label: '✅ جيد — Meets Target', color: '#a3e635' };
    if (score >= 60) return { label: '⚠️ يحتاج تطوير — Improvement Plan', color: '#f59e0b' };
    return { label: '🚨 حرج — Coaching Required', color: '#ef4444' };
  }

  function recommend(scores, raw){
    var recos = [];
    // Sort by score ascending → tackle lowest first
    var pairs = Object.keys(scores).map(function(k){ return [k, scores[k]]; });
    pairs.sort(function(a, b){ return a[1] - b[1]; });
    var picked = pairs.slice(0, 3);

    var msgs = {
      aht: function(s, v){
        if (v < 3) return 'الـ AHT منخفض جداً (' + v + ' د) — راجع FCR، قد تكون مكالماتك متسرّعة. ادرج تأكيد الفهم في خطوة الإغلاق.';
        if (v > 7) return 'AHT مرتفع (' + v + ' د) — درّب على Mirroring 3 كلمات بدل إعادة كاملة، وأسئلة Diagnose محصورة بـ 3.';
        return 'AHT في النطاق الجيد (' + v + ' د). للتحسين: قلّل Hold Time عبر Knowledge Base shortcut.';
      },
      fcr: function(s, v){
        if (v < 60) return 'FCR منخفض (' + v + '%) — أهم محرك للتكلفة. ركّز على Diagnose أعمق وتأكيد كامل قبل الإغلاق (Voss summary).';
        if (v < 75) return 'FCR (' + v + '%) قريب من المرجع. تحسين بسيط: تأكد من إغلاق التذكرة بعد التأكيد لا قبله.';
        return 'FCR ممتاز (' + v + '%) — حافظ عليه عبر تدوين الحالات النادرة.';
      },
      csat: function(s, v){
        if (v < 75) return 'CSAT منخفض (' + v + '%) — راجع Peak-End: آخر 90 ثانية يجب تحوي قيمة غير متوقعة.';
        if (v < 85) return 'CSAT (' + v + '%) جيد. للارتقاء: استخدم اسم العميل 3 مرات في المكالمة + ابتسامة فيزيائية قبل الرفع.';
        return 'CSAT ممتاز (' + v + '%) — استمر بصيغ Empathy Loop الموثّقة.';
      },
      adh: function(s, v){
        if (v > 98) return 'Adherence ' + v + '% علامة burnout قادم. خذ استراحاتك المجدولة فعلاً — هذا مطلب جودة لا تكاسل.';
        if (v < 90) return 'Adherence ' + v + '% — أعد ترتيب الجدول الشخصي. كل 1% انضباط = 0.6% تحسّن في CSAT.';
        return 'Adherence (' + v + '%) في نطاق صحي. حافظ على روتين الاستراحات.';
      },
      qa: function(s, v){
        if (v < 75) return 'QA Score (' + v + '%) — راجع 3 معايير الأهم: Empathy (15%) + Accuracy (25%) + Resolution (20%).';
        if (v < 90) return 'QA (' + v + '%) قريب من معيار COPC. ركّز على Compliance + Closing.';
        return 'QA ممتاز (' + v + '%) — مرشّح ممتاز لدور QA Analyst أو Trainer.';
      }
    };

    picked.forEach(function(p){
      var k = p[0];
      var v = raw[k];
      if (msgs[k]) recos.push(msgs[k](p[1], v));
    });
    return recos;
  }

  ready(function(){
    var page = document.getElementById('page-callcenter');
    if (!page) return;
    var calc = page.querySelector('[data-cc-calc]');
    if (!calc) return;
    var btn  = calc.querySelector('[data-kc-run]');
    var out  = calc.querySelector('[data-kc-out]');
    if (!btn || !out) return;

    function num(sel){
      var el = calc.querySelector('[data-kc="' + sel + '"]');
      return el ? parseFloat(el.value) || 0 : 0;
    }

    btn.addEventListener('click', function(){
      var raw = {
        aht:  num('aht'),
        fcr:  num('fcr'),
        csat: num('csat'),
        adh:  num('adh'),
        qa:   num('qa')
      };
      var scores = {
        aht:  scoreAHT(raw.aht),
        fcr:  scoreLinear(raw.fcr, 80),
        csat: scoreLinear(raw.csat, 90),
        adh:  scoreAdh(raw.adh),
        qa:   scoreLinear(raw.qa, 90)
      };
      // Weighted composite — FCR + QA + CSAT lead
      var index = Math.round(
        scores.fcr  * 0.30 +
        scores.qa   * 0.25 +
        scores.csat * 0.20 +
        scores.aht  * 0.15 +
        scores.adh  * 0.10
      );

      // Paint
      out.hidden = false;
      var ring = calc.querySelector('[data-kc-ring]');
      var t    = tier(index);
      if (ring) {
        ring.style.setProperty('--p', String(index));
        ring.style.background = 'conic-gradient(' + t.color + ' ' + index + '%, rgba(255,255,255,0.06) 0)';
      }
      var nEl = calc.querySelector('[data-kc-num]'); if (nEl) nEl.textContent = String(index);
      var tEl = calc.querySelector('[data-kc-tier]');
      if (tEl) {
        tEl.textContent = t.label + ' · ' + index + '/100';
        tEl.style.borderColor = t.color;
        tEl.style.color = t.color;
      }
      ['aht','fcr','csat','adh','qa'].forEach(function(k){
        var bar = calc.querySelector('[data-kc-bar="' + k + '"]');
        var pct = calc.querySelector('[data-kc-pct="' + k + '"]');
        if (bar) bar.style.inlineSize = scores[k] + '%';
        if (bar) bar.style.width      = scores[k] + '%';
        if (pct) pct.textContent      = scores[k] + '%';
      });

      var recos = recommend(scores, raw);
      var ol = calc.querySelector('[data-kc-recos]');
      if (ol) {
        ol.innerHTML = '';
        recos.forEach(function(r){
          var li = document.createElement('li');
          li.textContent = r;
          ol.appendChild(li);
        });
      }
    });
  });
})();

/* ================================================================
   WORKER 03 · PHASE 3 — Voice Self-Assessment Studio
   Web Audio API (AnalyserNode) + Web Speech API (SpeechRecognition)
   100% local, no network. Stores last 5 attempts (numeric only) in
   localStorage key: upg_voice_recordings_meta
================================================================ */
(function qlVoiceStudio(){
  'use strict';
  if (window.__qlVoiceStudio) return;
  window.__qlVoiceStudio = true;

  var STORAGE_KEY = 'upg_voice_recordings_meta';
  var REC_DURATION_MS = 30000;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      setTimeout(fn, 0);
    }
  }

  function setStatus(node, state, message){
    if (!node) return;
    node.setAttribute('data-state', state);
    var msg = node.querySelector('[data-vs-msg]');
    if (msg) msg.textContent = message;
  }

  function loadHistory(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch(_){ return []; }
  }
  function saveHistory(arr){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr.slice(-5))); } catch(_){}
  }

  function gradeOf(metric, value){
    // Returns one of: excellent, good, fair, poor
    if (metric === 'wpm'){
      if (value >= 140 && value <= 160) return 'excellent';
      if (value >= 120 && value <= 175) return 'good';
      if (value >= 100 && value <= 195) return 'fair';
      return 'poor';
    }
    if (metric === 'pitch'){
      if (value >= 18) return 'excellent';
      if (value >= 13) return 'good';
      if (value >= 8) return 'fair';
      return 'poor';
    }
    if (metric === 'volume'){
      if (value >= 75) return 'excellent';
      if (value >= 60) return 'good';
      if (value >= 45) return 'fair';
      return 'poor';
    }
    if (metric === 'pause'){
      if (value >= 12 && value <= 22) return 'excellent';
      if (value >= 8 && value <= 28) return 'good';
      if (value >= 4 && value <= 38) return 'fair';
      return 'poor';
    }
    if (metric === 'energy'){
      if (value >= 60 && value <= 80) return 'excellent';
      if (value >= 45 && value <= 90) return 'good';
      if (value >= 30 && value <= 95) return 'fair';
      return 'poor';
    }
    return 'fair';
  }

  function tierLabel(grade){
    return ({
      excellent: '🏆 ممتاز',
      good:      '✅ جيد',
      fair:      '⚠️ متوسط',
      poor:      '🚨 يحتاج تطوير'
    })[grade] || '—';
  }

  function recommendations(metrics){
    var out = [];
    var grades = {
      wpm:    gradeOf('wpm',    metrics.wpm),
      pitch:  gradeOf('pitch',  metrics.pitch),
      volume: gradeOf('volume', metrics.volume),
      pause:  gradeOf('pause',  metrics.pause),
      energy: gradeOf('energy', metrics.energy)
    };
    if (grades.wpm === 'poor' || grades.wpm === 'fair'){
      if (metrics.wpm > 175) out.push('إيقاعك سريع (' + metrics.wpm + ' WPM) — تمرين: اقرأ نصاً 150 كلمة في 60 ثانية بالضبط، 3 مرات يومياً.');
      else if (metrics.wpm < 120) out.push('إيقاعك بطيء (' + metrics.wpm + ' WPM) — قد يُفسَّر كتردد. ارفع السرعة المستهدفة إلى 140-160 تدريجياً.');
      else out.push('الإيقاع (' + metrics.wpm + ' WPM) قريب من المثالي — صيد دقيق.');
    }
    if (grades.pitch === 'poor' || grades.pitch === 'fair'){
      out.push('تباين النبرة منخفض (' + metrics.pitch + '%). تمرين: اقرأ جملة بـ 5 سياقات (مفاجأة/حزن/فرح/غضب/فضول) لكسر الـ Monotone Trap.');
    }
    if (grades.volume === 'poor'){
      out.push('ثبات الصوت ضعيف (' + metrics.volume + '%) — راقب End-of-Sentence Drop. تمرين: أكّد آخر كلمتين كل جملة بنفس الطاقة.');
    }
    if (grades.pause === 'poor' && metrics.pause < 4){
      out.push('نسبة الصمت متدنية (' + metrics.pause + '%) — تتحدث بدون استراحات تنفسية. أدخل وقفة 0.5 ثانية بعد كل نقطة (Voss Tactical Silence).');
    }
    if (grades.pause === 'poor' && metrics.pause > 38){
      out.push('نسبة الصمت مرتفعة (' + metrics.pause + '%) — قد تكون "filler pauses". قلل الـ "أه/يعني" وحاول تنفيذ نص 30 ثانية متواصل.');
    }
    if (grades.energy === 'poor'){
      out.push('مؤشر الطاقة (' + metrics.energy + ') خارج النطاق الصحي 60-80 — جرّب 3 أنفاس عميقة + ابتسامة فيزيائية قبل التسجيل.');
    }
    if (out.length === 0){
      out.push('أداؤك في النطاق المثالي عبر الأبعاد الخمسة. حافظ على الروتين وكرّر التقييم أسبوعياً.');
    }
    return out.slice(0, 4);
  }

  // ===== Spectrogram drawer =====
  function drawSpectro(canvas, dataArray, isActive){
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 0, w, h);
    if (!isActive) return;
    var bars = 64;
    var step = Math.floor(dataArray.length / bars);
    var barW = w / bars;
    for (var i = 0; i < bars; i++){
      var v = dataArray[i * step] || 0;
      var hh = (v / 255) * h;
      var hue = 180 - (v / 255) * 30;
      ctx.fillStyle = 'hsla(' + hue + ', 95%, 65%, 0.92)';
      ctx.fillRect(i * barW + 1, h - hh, barW - 2, hh);
    }
  }

  ready(function(){
    var page = document.getElementById('page-callcenter');
    if (!page) return;
    var studio = page.querySelector('[data-cc-vstudio]');
    if (!studio) return;

    var statusBox = studio.querySelector('[data-vs-status]');
    var recBtn    = studio.querySelector('[data-vs-rec]');
    var stopBtn   = studio.querySelector('[data-vs-stop]');
    var progBar   = studio.querySelector('[data-vs-progbar]');
    var timeEl    = studio.querySelector('[data-vs-time]');
    var canvas    = studio.querySelector('[data-vs-canvas]');
    var transcript= studio.querySelector('[data-vs-transcript]');
    var report    = studio.querySelector('[data-vs-report]');
    var clearBtn  = studio.querySelector('[data-vs-clear]');
    var histList  = studio.querySelector('[data-vs-history]');

    if (!recBtn || !canvas) return;

    // Resize canvas to device pixel ratio
    function fitCanvas(){
      var dpr = window.devicePixelRatio || 1;
      var rect = canvas.getBoundingClientRect();
      canvas.width  = Math.max(400, Math.floor(rect.width * dpr));
      canvas.height = Math.floor(120 * dpr);
    }
    fitCanvas();
    window.addEventListener('resize', fitCanvas, { passive: true });

    // Render history
    function renderHistory(){
      var hist = loadHistory();
      if (!histList) return;
      histList.innerHTML = '';
      if (!hist.length){
        var empty = document.createElement('li');
        empty.className = 'vs-hist-empty';
        empty.textContent = 'لا توجد محاولات سابقة بعد.';
        histList.appendChild(empty);
        return;
      }
      hist.slice().reverse().forEach(function(entry){
        var li = document.createElement('li');
        var d  = new Date(entry.t || Date.now());
        var hh = String(d.getHours()).padStart(2,'0');
        var mm = String(d.getMinutes()).padStart(2,'0');
        var dd = String(d.getDate()).padStart(2,'0');
        var mo = String(d.getMonth()+1).padStart(2,'0');
        li.innerHTML =
          '<time>' + dd + '/' + mo + ' ' + hh + ':' + mm + '</time>' +
          '<span><small>WPM</small><b>' + entry.wpm + '</b></span>' +
          '<span><small>Pitch</small><b>' + entry.pitch + '%</b></span>' +
          '<span><small>Vol</small><b>' + entry.volume + '%</b></span>' +
          '<span><small>Pause</small><b>' + entry.pause + '%</b></span>' +
          '<span><small>Energy</small><b>' + entry.energy + '</b></span>';
        histList.appendChild(li);
      });
    }
    renderHistory();

    if (clearBtn){
      clearBtn.addEventListener('click', function(){
        try { localStorage.removeItem(STORAGE_KEY); } catch(_){}
        renderHistory();
      });
    }

    // ===== Recording state =====
    var state = {
      stream: null,
      audioCtx: null,
      analyser: null,
      pitchAnalyser: null,
      source: null,
      rafId: 0,
      startTs: 0,
      timerId: 0,
      pitchSamples: [],
      volSamples: [],
      energySamples: [],
      silenceFrames: 0,
      totalFrames: 0,
      transcriptText: '',
      recognition: null,
      active: false
    };

    function cleanup(){
      if (state.rafId) cancelAnimationFrame(state.rafId);
      if (state.timerId) clearInterval(state.timerId);
      if (state.recognition){
        try { state.recognition.stop(); } catch(_){}
        state.recognition = null;
      }
      if (state.stream){
        state.stream.getTracks().forEach(function(t){ try { t.stop(); } catch(_){} });
        state.stream = null;
      }
      if (state.audioCtx){
        try { state.audioCtx.close(); } catch(_){}
        state.audioCtx = null;
      }
      state.analyser = null;
      state.pitchAnalyser = null;
      state.source = null;
      state.active = false;
      recBtn.removeAttribute('data-active');
      if (stopBtn) stopBtn.disabled = true;
    }

    // Autocorrelation pitch detect (fundamental F0 via time-domain)
    function detectPitchHz(buf, sampleRate){
      var SIZE = buf.length;
      var rms = 0;
      for (var i = 0; i < SIZE; i++){ var v = buf[i]; rms += v*v; }
      rms = Math.sqrt(rms/SIZE);
      if (rms < 0.01) return -1;
      var r1 = 0, r2 = SIZE - 1, thres = 0.2;
      for (var j = 0; j < SIZE/2; j++){ if (Math.abs(buf[j]) < thres){ r1 = j; break; } }
      for (var k = 1; k < SIZE/2; k++){ if (Math.abs(buf[SIZE-k]) < thres){ r2 = SIZE-k; break; } }
      var b = buf.slice(r1, r2);
      var newSize = b.length;
      var c = new Array(newSize).fill(0);
      for (var l = 0; l < newSize; l++){
        for (var m = 0; m < newSize - l; m++){
          c[l] = c[l] + b[m] * b[m+l];
        }
      }
      var d = 0; while (c[d] > c[d+1]) d++;
      var maxval = -1, maxpos = -1;
      for (var n = d; n < newSize; n++){
        if (c[n] > maxval){ maxval = c[n]; maxpos = n; }
      }
      if (maxpos < 1) return -1;
      var T0 = maxpos;
      return sampleRate / T0;
    }

    function startRecording(){
      if (state.active) return;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
        setStatus(statusBox, 'error', 'متصفحك لا يدعم الميكروفون.');
        return;
      }
      setStatus(statusBox, 'processing', 'طلب إذن الميكروفون...');
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream){
          state.stream = stream;
          var AC = window.AudioContext || window.webkitAudioContext;
          state.audioCtx = new AC();
          state.source = state.audioCtx.createMediaStreamSource(stream);
          state.analyser = state.audioCtx.createAnalyser();
          state.analyser.fftSize = 1024;
          state.pitchAnalyser = state.audioCtx.createAnalyser();
          state.pitchAnalyser.fftSize = 2048;
          state.source.connect(state.analyser);
          state.source.connect(state.pitchAnalyser);

          var bufLen = state.analyser.frequencyBinCount;
          var freqData = new Uint8Array(bufLen);
          var timeData = new Float32Array(state.pitchAnalyser.fftSize);

          state.pitchSamples = [];
          state.volSamples   = [];
          state.energySamples= [];
          state.silenceFrames= 0;
          state.totalFrames  = 0;
          state.transcriptText = '';
          if (transcript) transcript.textContent = '—';
          if (report) report.hidden = true;

          // Web Speech (best-effort)
          var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (SR){
            try {
              state.recognition = new SR();
              state.recognition.lang = 'ar-SA';
              state.recognition.continuous = true;
              state.recognition.interimResults = true;
              state.recognition.onresult = function(ev){
                var finalT = '', interim = '';
                for (var i = ev.resultIndex; i < ev.results.length; i++){
                  var r = ev.results[i];
                  if (r.isFinal) finalT += r[0].transcript + ' ';
                  else interim   += r[0].transcript + ' ';
                }
                state.transcriptText = (state.transcriptText + finalT).trim();
                if (transcript) transcript.textContent = (state.transcriptText + ' ' + interim).trim() || '—';
              };
              state.recognition.onerror = function(){ /* graceful */ };
              state.recognition.start();
            } catch(_){
              if (transcript) transcript.textContent = '(تعرّف الكلام غير متاح في هذا المتصفح — التحليل الصوتي يكفي)';
            }
          } else {
            if (transcript) transcript.textContent = '(تعرّف الكلام غير متاح في هذا المتصفح — التحليل الصوتي يكفي)';
          }

          state.active = true;
          state.startTs = performance.now();
          recBtn.setAttribute('data-active', '1');
          if (stopBtn) stopBtn.disabled = false;
          setStatus(statusBox, 'recording', 'تسجيل... تكلم بطبيعتك لـ 30 ثانية.');

          function tick(){
            if (!state.active) return;
            state.analyser.getByteFrequencyData(freqData);
            state.pitchAnalyser.getFloatTimeDomainData(timeData);

            // Volume RMS (0-100)
            var sum = 0;
            for (var i = 0; i < freqData.length; i++) sum += freqData[i];
            var avg = sum / freqData.length;
            state.volSamples.push(avg);
            state.energySamples.push(avg);

            // Silence detection
            state.totalFrames++;
            if (avg < 8) state.silenceFrames++;

            // Pitch (sample every ~6 frames to save CPU)
            if (state.totalFrames % 6 === 0){
              var hz = detectPitchHz(timeData, state.audioCtx.sampleRate);
              if (hz > 60 && hz < 500) state.pitchSamples.push(hz);
            }

            drawSpectro(canvas, freqData, true);
            state.rafId = requestAnimationFrame(tick);
          }
          tick();

          // Progress timer
          state.timerId = setInterval(function(){
            var elapsed = performance.now() - state.startTs;
            var pct = Math.min(100, (elapsed / REC_DURATION_MS) * 100);
            if (progBar) { progBar.style.inlineSize = pct + '%'; progBar.style.width = pct + '%'; }
            if (timeEl) timeEl.textContent = (elapsed/1000).toFixed(1) + 's / 30.0s';
            if (elapsed >= REC_DURATION_MS) stopRecording();
          }, 80);
        })
        .catch(function(err){
          setStatus(statusBox, 'error', 'تعذّر الوصول للميكروفون: ' + (err.message || 'إذن مرفوض'));
          cleanup();
        });
    }

    function computeReport(){
      // WPM from transcript word count
      var words = (state.transcriptText || '').trim().split(/\s+/).filter(Boolean).length;
      var elapsedSec = Math.max(1, (performance.now() - state.startTs)/1000);
      var wpm = Math.round((words / elapsedSec) * 60);
      // If transcript empty/too short, estimate from voiced frames
      if (words < 5){
        var voicedRatio = state.totalFrames > 0 ? (1 - state.silenceFrames / state.totalFrames) : 0;
        wpm = Math.round(voicedRatio * 165); // proxy estimate
      }

      // Pitch variability (CV of F0 samples)
      var pitchPct = 0;
      if (state.pitchSamples.length > 4){
        var s = state.pitchSamples;
        var m = s.reduce(function(a,b){return a+b;},0)/s.length;
        var v = s.reduce(function(a,b){return a + (b-m)*(b-m);},0)/s.length;
        var sd = Math.sqrt(v);
        pitchPct = Math.round((sd / m) * 100);
      }

      // Volume stability (1 - CV of avg volume)
      var volPct = 0;
      if (state.volSamples.length > 10){
        var v2 = state.volSamples;
        var m2 = v2.reduce(function(a,b){return a+b;},0)/v2.length;
        var var2 = v2.reduce(function(a,b){return a + (b-m2)*(b-m2);},0)/v2.length;
        var sd2 = Math.sqrt(var2);
        var cv  = m2 > 0 ? sd2 / m2 : 1;
        volPct = Math.round(Math.max(0, Math.min(100, (1 - cv) * 100)));
      }

      // Pause ratio
      var pausePct = state.totalFrames > 0
        ? Math.round((state.silenceFrames / state.totalFrames) * 100)
        : 0;

      // Energy index (mean volume normalized 0-100)
      var energy = 0;
      if (state.energySamples.length){
        var em = state.energySamples.reduce(function(a,b){return a+b;},0) / state.energySamples.length;
        energy = Math.round(Math.min(100, em * 1.2));
      }

      return { wpm: wpm, pitch: pitchPct, volume: volPct, pause: pausePct, energy: energy };
    }

    function paintReport(m){
      if (!report) return;
      report.hidden = false;
      ['wpm','pitch','volume','pause','energy'].forEach(function(k){
        var valEl = report.querySelector('[data-vs-m="' + k + '"]');
        var tEl   = report.querySelector('[data-vs-tier="' + k + '"]');
        if (!valEl) return;
        if (k === 'wpm')         valEl.textContent = m.wpm;
        else if (k === 'energy') valEl.textContent = m.energy;
        else                     valEl.textContent = m[k] + '%';
        var grade = gradeOf(k, m[k]);
        if (tEl){
          tEl.setAttribute('data-grade', grade);
          tEl.textContent = tierLabel(grade);
        }
      });
      var ul = report.querySelector('[data-vs-recos]');
      if (ul){
        ul.innerHTML = '';
        recommendations(m).forEach(function(r){
          var li = document.createElement('li');
          li.textContent = r;
          ul.appendChild(li);
        });
      }
    }

    function stopRecording(){
      if (!state.active) return;
      var m = computeReport();
      cleanup();
      drawSpectro(canvas, new Uint8Array(0), false);
      if (progBar) { progBar.style.inlineSize = '100%'; progBar.style.width = '100%'; }
      if (timeEl) timeEl.textContent = '30.0s / 30.0s';
      setStatus(statusBox, 'ready', 'انتهى التسجيل — تقريرك جاهز.');
      paintReport(m);
      // Persist meta
      var hist = loadHistory();
      hist.push({ t: Date.now(), wpm: m.wpm, pitch: m.pitch, volume: m.volume, pause: m.pause, energy: m.energy });
      saveHistory(hist);
      renderHistory();
    }

    recBtn.addEventListener('click', function(){
      if (state.active) stopRecording();
      else startRecording();
    });
    if (stopBtn) stopBtn.addEventListener('click', stopRecording);
  });
})();

/* ================================================================
   WORKER 03 · PHASE 4 — Difficult Caller Simulator
   3 scenarios × 4-5 turns × 4 options each.
   Score persisted in localStorage: upg_simulator_scores
================================================================ */
(function qlSimulator(){
  'use strict';
  if (window.__qlSimulator) return;
  window.__qlSimulator = true;

  var STORAGE_KEY = 'upg_simulator_scores';

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      setTimeout(fn, 0);
    }
  }

  // grade weights: excellent=2, ok=1, bad=0
  var GRADE_PTS = { excellent: 2, ok: 1, bad: 0 };

  var SCENARIOS = {
    screamer: {
      title: 'الصارخ — Screamer',
      emoji: '🔥',
      turns: [
        {
          client: 'الصارخ: "هاي ثالث مرة أتصل! ما أحد يحل مشكلتي! ما تستحون؟!"',
          options: [
            { txt: '"أعتذر سيدي بشدة، هذا غير مقبول، خل أتأكد فوراً..."', grade: 'ok',
              fb: 'اعتذار صحيح لكنك بدأت بالـ Action قبل الإقرار العاطفي. الصارخ يحتاج "L" من LEAR أولاً.' },
            { txt: '"أسمعك. ثلاث مرات بدون حل — هذا فعلاً يجنّن. خذ نفس وحكيلي شنو الموضوع من الأول."', grade: 'excellent',
              fb: 'ممتاز — Listen + Mirror ("ثلاث مرات بدون حل") + Empathy + Refocus بدون دفاع. تطبيق LEAR كامل.' },
            { txt: '"سيدي ارفع صوتك بالشكل المناسب رجاءً وإلا..."', grade: 'bad',
              fb: 'كارثة — أنت تقاتل الغضب بالحدود. هذا يصعّد لا يهدّئ. لا ترفع حدود الصوت أبداً في الـ turn الأول.' },
            { txt: '"بسم الله، خل أحوّلك للمشرف."', grade: 'bad',
              fb: 'هروب فوري = فقدان ثقة كامل. الصارخ يفسّر التحويل كـ "هذا الموظف ما يقدر".' }
          ]
        },
        {
          client: 'الصارخ: "النت من 3 أيام مقطوع! وأنا أدفع شهرياً 100 ألف! شو هذا؟!"',
          options: [
            { txt: '"3 أيام بدون نت ودفعك مستمر — هذا حقك تنزعج. خلّيني أتحقق من حسابك الحين، اسم الحساب من فضلك؟"', grade: 'excellent',
              fb: 'Validate صريح + Action مباشر + سؤال تشخيصي محدد. هذا تحوّل صحي من العاطفة للعمل.' },
            { txt: '"حضرتك، الفاتورة تخصم بشكل أوتوماتيكي حتى لو الخدمة منقطعة، هذا في العقد..."', grade: 'bad',
              fb: 'لا تدافع عن العقد لعميل غاضب. القانون لاحقاً، التعاطف الآن.' },
            { txt: '"مفهوم، ممكن نشوف خياراتنا بعد ما نحل المشكلة الأساسية أولاً."', grade: 'ok',
              fb: 'وسط — تجاهلت موضوع الفاتورة. سيعود لها لاحقاً بقوة أكبر.' },
            { txt: '"نعم، نعم، شو رقم الموديم؟"', grade: 'bad',
              fb: 'تجاهلت الإحساس وقفزت للحل التقني. الصارخ سيشعر أنك آلة.' }
          ]
        },
        {
          client: 'الصارخ: "كل مرة تقولولي راح نحل، بس ما حدا يحل! شو الضمانة هاي المرة؟"',
          options: [
            { txt: '"أفهمك، الوعود السابقة كسرت ثقتك. الحين أنا مسؤولك المباشر، رقم تذكرتي 4521، راح أتابعها شخصياً واتصل بك في 24 ساعة."', grade: 'excellent',
              fb: 'Ownership + رقم مرجعي + التزام زمني = ثقة. Cialdini Commitment principle.' },
            { txt: '"إن شاء الله هذي المرة بنحل."', grade: 'bad',
              fb: '"إن شاء الله" + "بنحل" = صفر التزام. هذا اللي خلاه يصرخ من الأساس.' },
            { txt: '"أعدك أنا شخصياً سأتابع."', grade: 'ok',
              fb: 'وعد بدون رقم، بدون زمن، بدون تذكرة. عميل مكسور الثقة يحتاج بيانات لا كلمات.' },
            { txt: '"الضمانة هي إجراءاتنا الداخلية."', grade: 'bad',
              fb: 'كلام شركاتي فارغ. لا يثق بالـ "إجراءات".' }
          ]
        },
        {
          client: 'الصارخ (هدأ قليلاً): "أوكي... هسة شو راح تسوي؟"',
          options: [
            { txt: '"الحين 3 خطوات: 1) تذكرة عاجلة لقسم الشبكة، 2) خصم على فاتورة الشهر بسبب الانقطاع، 3) اتصال متابعة مني خلال 24 ساعة. متفقين؟"', grade: 'excellent',
              fb: 'Close مثالي — 3 خيارات مرقّمة + تأكيد الاتفاق. Peak-End يبدأ بنهاية إيجابية.' },
            { txt: '"راح ندرس الموضوع ونرجعلك."', grade: 'bad',
              fb: 'بعد كل التعب، لغة "ندرس" تعيد الغضب فوراً. لا تدرس — افعل.' },
            { txt: '"الفنيين يخبروك بالتفاصيل."', grade: 'bad',
              fb: 'تخلّيت عن Ownership في اللحظة الحاسمة.' },
            { txt: '"راح أفتح تذكرة وأشوف."', grade: 'ok',
              fb: 'وسط — افتقدت الالتزام الزمني والخصم.' }
          ]
        }
      ]
    },

    threat: {
      title: 'المهدد القانوني — Legal Threat',
      emoji: '⚖️',
      turns: [
        {
          client: 'المهدد: "والله العظيم راح أشتكي عليكم بالمحكمة وبحماية المستهلك!"',
          options: [
            { txt: '"حضرتك، هاي حقك القانوني الكامل، وأنا راح أساعدك بأي توثيق تحتاجه. قبل ذلك، أگدر أفهم منك القصة كاملة؟"', grade: 'excellent',
              fb: 'Calm-Doc — اعتراف بالحق + عدم تراجع + جمع معلومات. هذا يفصل التهديد عن المشكلة الفعلية.' },
            { txt: '"لو سمحت ما تهددنا، عندنا قسم قانوني..."', grade: 'bad',
              fb: 'مواجهة قانونية فورية = تصعيد مضمون. لا تذكر "قسمنا القانوني" أبداً في الـ turn الأول.' },
            { txt: '"اشتكي إذا تريد، هذا حقك."', grade: 'bad',
              fb: 'تحدّي مباشر = معركة شخصية. هذا ينقل المكالمة من شكوى لقضية كرامة.' },
            { txt: '"حضرتك، خلّيني أتحقق من الموضوع وأرجعلك."', grade: 'ok',
              fb: 'تجاهل التهديد لا يجدي — العميل يريد سماع اعتراف بحقه أولاً.' }
          ]
        },
        {
          client: 'المهدد: "أنتم خصمتم 200 ألف بدون إذني! هذا سرقة!"',
          options: [
            { txt: '"خصم 200 ألف بدون موافقتك — هذا فعلاً يستدعي تحقيق. خلّيني أفتح ملف رسمي وأنطيك رقم متابعة، اسم الحساب؟"', grade: 'excellent',
              fb: 'تأكيد الرقم (Mirror) + جدّية الإجراء + توثيق. هذا يقلل الـ legal threat لأن العميل يحس أنه مأخوذ بجدية.' },
            { txt: '"يمكن ضرائب أو رسوم، خلّينا نتحقق."', grade: 'ok',
              fb: 'تخفيف من شأن الادعاء قد يفسّر كاستهانة. اعترف بالشكوى أولاً، ثم تحقق.' },
            { txt: '"كلمة سرقة كبيرة جداً، نحن شركة محترمة."', grade: 'bad',
              fb: 'الدفاع عن سمعة الشركة = إهمال للعميل. التهديد سيرتفع.' },
            { txt: '"الخصم ربما من شريك خارجي."', grade: 'bad',
              fb: 'إلقاء اللوم على طرف ثالث = تهرّب. العميل يدفع لك أنت.' }
          ]
        },
        {
          client: 'المهدد: "عندي تسجيلات وكل شي! راح تكلفكم!"',
          options: [
            { txt: '"التسجيل من حقك، وأنا راح أتأكد أن كل ما يقال هنا دقيق ومسجّل من جانبنا أيضاً. هل تسمح أن أوثّق بياناتك الآن؟"', grade: 'excellent',
              fb: 'الاعتراف بحقه في التسجيل + الإشارة إلى تسجيلكم الرسمي = توازن قانوني. لا تخفي، لا تخاف.' },
            { txt: '"كذلك مكالماتنا مسجلة، فلا قلق."', grade: 'ok',
              fb: 'صح لكن نبرة دفاعية. كان أفضل بصياغة شراكة لا مواجهة.' },
            { txt: '"عرضك بالتسجيل غير قانوني بدون إذن."', grade: 'bad',
              fb: 'معلومة قانونية خاطئة (في معظم الدول التسجيل لطرف في المكالمة قانوني) + مواجهة عدائية.' },
            { txt: '"لا تهددنا بالتسجيلات."', grade: 'bad',
              fb: 'كلمة "تهددنا" تثبت في رأسه أنك تشعر بالتهديد = ضعف.' }
          ]
        },
        {
          client: 'المهدد: "أوكي، شو راح تسوي قبل ما أمشي للمحكمة؟"',
          options: [
            { txt: '"3 خطوات اليوم: 1) فتح تحقيق رسمي بالخصم، 2) إرجاع المبلغ خلال 5 أيام عمل إذا ثبت الخطأ، 3) اتصال مني شخصياً خلال 48 ساعة. هل هذا يناسبك كبداية قبل أي خيار آخر؟"', grade: 'excellent',
              fb: 'إجراءات محددة + التزام زمني + خيار للعميل = de-escalation كاملة. Voss "How am I supposed to do that?" inverted.' },
            { txt: '"راح أحوّلك للقسم القانوني."', grade: 'bad',
              fb: 'تحويل = هروب. القسم القانوني يأتي لاحقاً، لا قبل محاولة الحل.' },
            { txt: '"خلّيني أرى ماذا أستطيع."', grade: 'bad',
              fb: 'إجابة ضبابية = استمرار للتهديد.' },
            { txt: '"راح أفتح ملف وأرجعلك خلال أسبوع."', grade: 'ok',
              fb: 'أفضل من الضبابي لكن "أسبوع" كثير لشخص يهدد بالمحكمة. قلّلها لـ 48 ساعة.' }
          ]
        },
        {
          client: 'المهدد (نبرته هدأت): "خلّيني أنتظر 48 ساعة، شوف شو تطلع."',
          options: [
            { txt: '"شكراً على ثقتك. رقم تذكرتك 7821، اسمي [اسم] والاتصال مني شخصياً قبل بعد غد. أي شي ضروري قبل ما نقفل؟"', grade: 'excellent',
              fb: 'Soft Close + رقم + اسم + تأكيد. Peak-End ممتاز يحوّل ذكرى المكالمة من تهديد إلى مهنية.' },
            { txt: '"إلى اللقاء."', grade: 'bad',
              fb: 'وداع جاف بعد كل هذا = خسارة كل المكاسب العاطفية.' },
            { txt: '"شكراً، إن شاء الله."', grade: 'ok',
              fb: 'أفضل من الجاف لكن بدون التزام مرجعي.' },
            { txt: '"تمام، بس لا تشتكي قبل ما نرد."', grade: 'bad',
              fb: 'إعادة فتح الجرح = خطأ كارثي في الخطوة الأخيرة.' }
          ]
        }
      ]
    },

    cold: {
      title: 'الغاضب الهادئ — Cold Angry',
      emoji: '🧊',
      turns: [
        {
          client: 'الهادئ: "أحب أتأكد من شي... رقم حسابي 882194، اشتراك ذهبي. صح؟"',
          options: [
            { txt: '"نعم سيدي، أكدت الرقم 882194 — اشتراك ذهبي منذ 2022. كيف أساعدك تحديداً؟"', grade: 'excellent',
              fb: 'تأكيد دقيق + تاريخ + سؤال محدد. الهادئ يحب الدقة والكفاءة، يكره الكلام الفارغ.' },
            { txt: '"أهلاً سيدي، كيف الحال؟ نعم اشتراك ذهبي."', grade: 'bad',
              fb: 'مجاملة فارغة + جواب جزئي. الهادئ يفسّر هذا كاستخفاف.' },
            { txt: '"أكيد، تأمر شي؟"', grade: 'ok',
              fb: 'سريع لكن بدون توثيق رقم الحساب صراحة. الدقة مفقودة.' },
            { txt: '"إيه إيه، شو الموضوع؟"', grade: 'bad',
              fb: 'لغة عامية مفرطة لعميل بارد منظّم = إهانة ضمنية.' }
          ]
        },
        {
          client: 'الهادئ (نفس النبرة): "أرسلت ثلاثة إيميلات من 12 يوم. لم يرد أحد. لماذا؟"',
          options: [
            { txt: '"عذراً سيدي. 12 يوم بدون رد على 3 إيميلات هو خطأ من جانبنا. خلّيني أبحث عنها الآن — هل تذكر تاريخ آخر إيميل؟"', grade: 'excellent',
              fb: 'اعتذار محدد بالأرقام + مسؤولية + سؤال دقيق. الهادئ يقدّر الاعتراف الواضح بالخطأ.' },
            { txt: '"يمكن وصلت سبام، تحقق من الإيميل."', grade: 'bad',
              fb: 'إلقاء اللوم على نظامه = تصعيد فوري للهادئ. هو سيقدّم شكوى رسمية بعد المكالمة.' },
            { txt: '"السيستم عندنا أحياناً يأخر الإيميلات."', grade: 'bad',
              fb: 'تبرير غير شخصي = استهانة. الهادئ يريد شخصاً يعترف.' },
            { txt: '"معذرة، خلّيني أتحقق."', grade: 'ok',
              fb: 'الاعتذار صحيح لكن ينقصه التحديد بالأرقام (12 يوم، 3 إيميلات).' }
          ]
        },
        {
          client: 'الهادئ: "أتوقع جواب محدد. ما الإجراء التصحيحي؟"',
          options: [
            { txt: '"3 إجراءات: 1) فتح ملف خاص بحالتك مع متابعة من مسؤول مباشر (أنا)، 2) تعويض شهر مجاني للتأخير، 3) اتصال مكتوب وصوتي خلال 24 ساعة بأي قرار. هل تقبل بهذا كأولوية؟"', grade: 'excellent',
              fb: 'محدد + مرقّم + ملموس + يطلب موافقته. هذه اللغة الوحيدة التي تنزع شحنة الهادئ.' },
            { txt: '"الإجراء معتاد: نراجع وننسّق."', grade: 'bad',
              fb: '"معتاد" = مهين للهادئ. هو يريد إجراء استثنائي.' },
            { txt: '"سأتابع شخصياً."', grade: 'ok',
              fb: 'صحيح لكن بدون أرقام = كلام عاطفي للهادئ.' },
            { txt: '"هي أمور إدارية تأخذ وقتها."', grade: 'bad',
              fb: 'فلسفة بدلاً من حل = اشتعال هادئ مضمون.' }
          ]
        },
        {
          client: 'الهادئ (نبرة لم تتغير): "تماماً. سأنتظر 24 ساعة. اسمك ورقم تذكرتي."',
          options: [
            { txt: '"اسمي [اسم]، الموقع [الموقع]، ID رقم 4485، رقم تذكرتك CC-2026-4485. سأتصل قبل [الساعة] غداً. هل تسمح بإغلاق المكالمة؟"', grade: 'excellent',
              fb: 'بيانات كاملة + التزام بساعة محددة + استئذان مهذب. للهادئ، هذا = احترافية كاملة.' },
            { txt: '"اسمي [اسم]، التذكرة في النظام."', grade: 'bad',
              fb: 'بيانات ناقصة لمن طلبها صراحة = إهانة.' },
            { txt: '"رقم التذكرة سيصلك عبر SMS."', grade: 'ok',
              fb: 'مقبول لكن الأفضل إعطاؤه فوراً + SMS تأكيد.' },
            { txt: '"الأنظمة موثّقة، ما تخاف."', grade: 'bad',
              fb: '"ما تخاف" تعليق سطحي يجرّد الهادئ من جدّيته = مأساة.' }
          ]
        }
      ]
    }
  };

  // ===== Render =====
  ready(function(){
    var page = document.getElementById('page-callcenter');
    if (!page) return;
    var shell = page.querySelector('[data-cc-sim]');
    if (!shell) return;

    var picker  = shell.querySelector('[data-sim-picker]');
    var active  = shell.querySelector('[data-sim-active]');
    var emojiEl = shell.querySelector('[data-sim-emoji]');
    var titleEl = shell.querySelector('[data-sim-title]');
    var stepNow = shell.querySelector('[data-sim-step-now]');
    var stepTot = shell.querySelector('[data-sim-step-total]');
    var progBar = shell.querySelector('[data-sim-progbar]');
    var clientEl= shell.querySelector('[data-sim-client]');
    var optsEl  = shell.querySelector('[data-sim-options]');
    var fb      = shell.querySelector('[data-sim-feedback]');
    var fbTag   = shell.querySelector('[data-sim-feedback-tag]');
    var fbText  = shell.querySelector('[data-sim-feedback-text]');
    var nextBtn = shell.querySelector('[data-sim-next]');
    var finalEl = shell.querySelector('[data-sim-final]');
    var finNum  = shell.querySelector('[data-sim-final-num]');
    var finMax  = shell.querySelector('[data-sim-final-max]');
    var finTier = shell.querySelector('[data-sim-final-tier]');
    var finList = shell.querySelector('[data-sim-final-list]');
    var restart = shell.querySelector('[data-sim-restart]');
    var backBtn = shell.querySelector('[data-sim-back]');

    var run = null;

    function showPicker(){
      if (picker) picker.hidden = false;
      if (active) active.hidden = true;
      if (finalEl) finalEl.hidden = true;
    }
    function showActive(){
      if (picker) picker.hidden = true;
      if (active) active.hidden = false;
      if (finalEl) finalEl.hidden = true;
    }

    function start(key){
      var sc = SCENARIOS[key];
      if (!sc) return;
      run = { key: key, scenario: sc, idx: 0, picks: [] };
      if (emojiEl) emojiEl.textContent = sc.emoji;
      if (titleEl) titleEl.textContent = sc.title;
      if (stepTot) stepTot.textContent = sc.turns.length;
      if (finMax)  finMax.textContent  = sc.turns.length * 2;
      showActive();
      paintTurn();
    }

    function paintTurn(){
      if (!run) return;
      var turn = run.scenario.turns[run.idx];
      if (!turn) return;
      if (stepNow) stepNow.textContent = run.idx + 1;
      if (progBar) {
        var pct = Math.round((run.idx / run.scenario.turns.length) * 100);
        progBar.style.inlineSize = pct + '%';
        progBar.style.width      = pct + '%';
      }
      if (clientEl) clientEl.textContent = turn.client;
      if (fb) fb.hidden = true;
      if (!optsEl) return;
      optsEl.innerHTML = '';
      turn.options.forEach(function(opt, i){
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'sim-option';
        btn.textContent = opt.txt;
        btn.addEventListener('click', function(){
          // disable all
          optsEl.querySelectorAll('.sim-option').forEach(function(b){ b.disabled = true; });
          btn.setAttribute('data-picked', opt.grade);
          run.picks.push({ index: i, grade: opt.grade, fb: opt.fb });
          if (fb) fb.hidden = false;
          if (fbTag) {
            fbTag.setAttribute('data-grade', opt.grade);
            fbTag.textContent = opt.grade === 'excellent' ? '🏆 ممتاز' : (opt.grade === 'ok' ? '⚠️ مقبول' : '🚨 خاطئ');
          }
          if (fbText) fbText.textContent = opt.fb;
        });
        optsEl.appendChild(btn);
      });
    }

    function finishRun(){
      var sc = run.scenario;
      var pts = run.picks.reduce(function(s, p){ return s + GRADE_PTS[p.grade]; }, 0);
      var max = sc.turns.length * 2;
      var pct = Math.round((pts / max) * 100);
      var tier;
      if (pct >= 90) tier = '🏆 خبير';
      else if (pct >= 70) tier = '✨ متمكن';
      else if (pct >= 50) tier = '✅ مقبول';
      else tier = '🚨 يحتاج تدريب';

      if (finNum) finNum.textContent = pts;
      if (finTier) finTier.textContent = tier + ' · ' + pct + '%';
      if (finList){
        finList.innerHTML = '';
        run.picks.forEach(function(p, i){
          var li = document.createElement('li');
          li.setAttribute('data-grade', p.grade);
          li.innerHTML = '<b>' + (i+1) + '</b><div>' + p.fb + '<small>' +
            (p.grade === 'excellent' ? '+2 نقطة' : (p.grade === 'ok' ? '+1 نقطة' : '0 نقطة')) +
            '</small></div>';
          finList.appendChild(li);
        });
      }
      if (finalEl) finalEl.hidden = false;

      // Persist
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        var arr = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(arr)) arr = [];
        arr.push({ scenario: run.key, score: pts, max: max, pct: pct, t: Date.now() });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arr.slice(-20)));
      } catch(_){}
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function(){
        if (!run) return;
        run.idx++;
        if (run.idx >= run.scenario.turns.length){
          finishRun();
        } else {
          paintTurn();
        }
      });
    }
    if (restart) restart.addEventListener('click', function(){ run = null; showPicker(); });
    if (backBtn) backBtn.addEventListener('click', function(){ run = null; showPicker(); });

    shell.querySelectorAll('[data-sim-load]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var key = btn.getAttribute('data-sim-load');
        start(key);
      });
    });
  });
})();



/* ════════════════════════════════════════════════════════════════
   WORKER 04 · PHASE 1 — Accounting Foundations Lab
   - Equation Visualizer (10 transactions, IQD)
   - T-Account Visualizer (12 transactions)
   - 9-Step Accounting Cycle Ring
   localStorage: upg_acc_eq_state, upg_acc_cycle_visited
═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if (window.__UPG_ACC_PHASE1__) return;
  window.__UPG_ACC_PHASE1__ = true;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else { fn(); }
  }

  var fmtIQD = function(n){
    var x = Math.round(Number(n) || 0);
    return x.toLocaleString('en-US') + ' د.ع';
  };

  /* ── Block 1 · Equation Visualizer ───────────────────────────── */
  var EQ_TX = [
    { id:'eq01', title:'تأسيس الشركة برأس مال نقدي', detail:'إيداع 50,000,000 IQD في الحساب البنكي',
      effects:[{col:'assets',label:'النقد في البنك',val:50000000},{col:'equity',label:'رأس المال',val:50000000}] },
    { id:'eq02', title:'شراء معدات نقداً', detail:'شراء حواسيب ومعدات مكتبية',
      effects:[{col:'assets',label:'معدات',val:8000000},{col:'assets',label:'النقد في البنك',val:-8000000}] },
    { id:'eq03', title:'قرض من المصرف', detail:'قرض إنتاجي من مصرف الرافدين',
      effects:[{col:'assets',label:'النقد في البنك',val:25000000},{col:'liab',label:'قرض طويل الأجل',val:25000000}] },
    { id:'eq04', title:'شراء بضاعة بالأجل', detail:'بضاعة من مورد محلي على الحساب',
      effects:[{col:'assets',label:'مخزون',val:12000000},{col:'liab',label:'دائنون',val:12000000}] },
    { id:'eq05', title:'بيع بضاعة نقداً (بربح)', detail:'تكلفة البضاعة 5M، بيعت بـ 8M',
      effects:[{col:'assets',label:'النقد',val:8000000},{col:'assets',label:'مخزون',val:-5000000},{col:'equity',label:'صافي ربح محتجز',val:3000000}] },
    { id:'eq06', title:'دفع راتب موظف', detail:'راتب 1,200,000 IQD نقداً',
      effects:[{col:'assets',label:'النقد',val:-1200000},{col:'equity',label:'مصروفات (تخفض الأرباح)',val:-1200000}] },
    { id:'eq07', title:'سداد جزء من الدائنين', detail:'تسديد 4M IQD من المستحقات',
      effects:[{col:'assets',label:'النقد في البنك',val:-4000000},{col:'liab',label:'دائنون',val:-4000000}] },
    { id:'eq08', title:'تحصيل من زبون', detail:'زبون كان مدينًا بـ 6M سدّد المبلغ',
      effects:[{col:'assets',label:'النقد',val:6000000},{col:'assets',label:'مدينون',val:-6000000}] },
    { id:'eq09', title:'بيع بالأجل', detail:'بضاعة بـ 10M بتكلفة 6M على الحساب',
      effects:[{col:'assets',label:'مدينون',val:10000000},{col:'assets',label:'مخزون',val:-6000000},{col:'equity',label:'صافي ربح محتجز',val:4000000}] },
    { id:'eq10', title:'توزيع أرباح للملاك', detail:'سحب 2M من الأرباح المحتجزة',
      effects:[{col:'assets',label:'النقد',val:-2000000},{col:'equity',label:'سحوبات',val:-2000000}] }
  ];

  function setupEquation(){
    var lab = document.querySelector('[data-acc-lab="equation"]');
    if (!lab) return;
    var list = lab.querySelector('[data-acc-eq-tx]');
    var stacks = {
      assets: lab.querySelector('[data-acc-eq-stack="assets"]'),
      liab:   lab.querySelector('[data-acc-eq-stack="liab"]'),
      equity: lab.querySelector('[data-acc-eq-stack="equity"]')
    };
    var amts = {
      assets: lab.querySelector('[data-acc-eq-val="assets"]'),
      liab:   lab.querySelector('[data-acc-eq-val="liab"]'),
      equity: lab.querySelector('[data-acc-eq-val="equity"]')
    };
    var balanceVal = lab.querySelector('.acc-eq-balance-val');
    var balanceFlag = lab.querySelector('[data-acc-eq-flag]');
    var resetBtn = lab.querySelector('[data-acc-eq-reset]');

    var state = { applied: [], totals: { assets:0, liab:0, equity:0 } };

    EQ_TX.forEach(function(tx){
      var li = document.createElement('li');
      li.dataset.txId = tx.id;
      var net = tx.effects.reduce(function(acc, e){
        acc[e.col] = (acc[e.col] || 0) + e.val; return acc;
      }, {});
      var parts = [];
      ['assets','liab','equity'].forEach(function(c){
        if (net[c]) {
          var sign = net[c] > 0 ? '+' : '−';
          var name = c === 'assets' ? 'أصول' : c === 'liab' ? 'خصوم' : 'حقوق';
          parts.push(name + ' ' + sign + Math.abs(net[c]).toLocaleString('en-US'));
        }
      });
      li.innerHTML =
        '<span class="acc-eq-tx-title">'+tx.title+'</span>'+
        '<span class="acc-eq-tx-effect">'+tx.detail+' · '+parts.join(' / ')+'</span>';
      li.addEventListener('click', function(){ apply(tx, li); });
      list.appendChild(li);
    });

    function apply(tx, li){
      tx.effects.forEach(function(eff){
        state.totals[eff.col] += eff.val;
        var item = document.createElement('li');
        item.className = eff.val < 0 ? 'neg' : 'pos';
        var sign = eff.val < 0 ? '−' : '+';
        item.innerHTML = '<span>'+eff.label+'</span><b>'+sign+Math.abs(eff.val).toLocaleString('en-US')+'</b>';
        stacks[eff.col].appendChild(item);
      });
      li.classList.add('applied');
      state.applied.push(tx.id);
      paint();
      try { localStorage.setItem('upg_acc_eq_state', JSON.stringify(state.applied)); } catch(_){}
    }

    function paint(){
      amts.assets.textContent = fmtIQD(state.totals.assets);
      amts.liab.textContent   = fmtIQD(state.totals.liab);
      amts.equity.textContent = fmtIQD(state.totals.equity);
      var lhs = state.totals.assets;
      var rhs = state.totals.liab + state.totals.equity;
      balanceVal.textContent = lhs.toLocaleString('en-US') + ' = ' +
        state.totals.liab.toLocaleString('en-US') + ' + ' +
        state.totals.equity.toLocaleString('en-US');
      var ok = Math.abs(lhs - rhs) < 0.01;
      balanceFlag.dataset.accEqFlag = ok ? 'ok' : 'off';
      balanceFlag.textContent = ok ? 'متوازنة' : 'غير متوازنة';
    }

    resetBtn.addEventListener('click', function(){
      state = { applied: [], totals: { assets:0, liab:0, equity:0 } };
      ['assets','liab','equity'].forEach(function(c){ stacks[c].innerHTML = ''; });
      list.querySelectorAll('li').forEach(function(li){ li.classList.remove('applied'); });
      paint();
      try { localStorage.removeItem('upg_acc_eq_state'); } catch(_){}
    });

    paint();
  }

  /* ── Block 2 · T-Account Visualizer ──────────────────────────── */
  var T_TX = [
    { id:'t01', title:'إيداع رأس مال 50M في البنك', dr:[{a:'البنك',t:'أصل',v:50000000}], cr:[{a:'رأس المال',t:'حقوق ملكية',v:50000000}] },
    { id:'t02', title:'شراء حاسوب 3M نقداً',         dr:[{a:'معدات',t:'أصل',v:3000000}],     cr:[{a:'النقد',t:'أصل',v:3000000}] },
    { id:'t03', title:'بيع بضاعة 8M نقداً (تكلفة 5M)',dr:[{a:'النقد',t:'أصل',v:8000000},{a:'تكلفة المبيعات',t:'مصروف',v:5000000}], cr:[{a:'مبيعات',t:'إيراد',v:8000000},{a:'مخزون',t:'أصل',v:5000000}] },
    { id:'t04', title:'دفع راتب موظف 1.2M',          dr:[{a:'مصروف رواتب',t:'مصروف',v:1200000}], cr:[{a:'النقد',t:'أصل',v:1200000}] },
    { id:'t05', title:'شراء مخزون 12M بالأجل',       dr:[{a:'مخزون',t:'أصل',v:12000000}],   cr:[{a:'دائنون',t:'خصم',v:12000000}] },
    { id:'t06', title:'تحصيل من مدين 6M',             dr:[{a:'النقد',t:'أصل',v:6000000}],    cr:[{a:'مدينون',t:'أصل',v:6000000}] },
    { id:'t07', title:'سداد قسط قرض 2M (1.7M أصل + 0.3M فائدة)', dr:[{a:'قروض طويلة',t:'خصم',v:1700000},{a:'مصروف فوائد',t:'مصروف',v:300000}], cr:[{a:'البنك',t:'أصل',v:2000000}] },
    { id:'t08', title:'استلام إيجار مقدم 6M (12 شهر)', dr:[{a:'النقد',t:'أصل',v:6000000}],   cr:[{a:'إيرادات مقبوضة مقدماً',t:'خصم',v:6000000}] },
    { id:'t09', title:'الإهلاك الشهري 200k',          dr:[{a:'مصروف الإهلاك',t:'مصروف',v:200000}], cr:[{a:'مجمع الإهلاك',t:'أصل (مقابل)',v:200000}] },
    { id:'t10', title:'توزيع أرباح 5M للملاك',        dr:[{a:'أرباح موزعة',t:'حقوق ملكية',v:5000000}], cr:[{a:'البنك',t:'أصل',v:5000000}] },
    { id:'t11', title:'بيع 10M بالأجل (تكلفة 6M)',    dr:[{a:'مدينون',t:'أصل',v:10000000},{a:'تكلفة المبيعات',t:'مصروف',v:6000000}], cr:[{a:'مبيعات',t:'إيراد',v:10000000},{a:'مخزون',t:'أصل',v:6000000}] },
    { id:'t12', title:'تسوية ضريبية شهرية 800k',      dr:[{a:'مصروف ضرائب',t:'مصروف',v:800000}], cr:[{a:'ضرائب مستحقة',t:'خصم',v:800000}] }
  ];

  function setupTAccount(){
    var lab = document.querySelector('[data-acc-lab="taccount"]');
    if (!lab) return;
    var sel = lab.querySelector('[data-acc-tx-select]');
    var grid = lab.querySelector('[data-acc-tx-grid]');
    var current = lab.querySelector('[data-acc-tx-current] .acc-taccount-curr-text');
    var clearBtn = lab.querySelector('[data-acc-tx-clear]');

    sel.innerHTML = '<option value="">— اختر —</option>' +
      T_TX.map(function(t){ return '<option value="'+t.id+'">'+t.title+'</option>'; }).join('');

    var accounts = {}; // name -> {type, dr:[], cr:[]}

    function ensure(name, type){
      if (!accounts[name]) accounts[name] = { type: type, dr: [], cr: [] };
      return accounts[name];
    }

    function render(){
      grid.innerHTML = '';
      var names = Object.keys(accounts);
      if (!names.length) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;font-size:12px;color:var(--text-muted);padding:18px;">لا توجد قيود بعد. اختر معاملة من الأعلى.</div>';
        return;
      }
      names.forEach(function(name){
        var a = accounts[name];
        var totalDr = a.dr.reduce(function(s,x){return s+x;},0);
        var totalCr = a.cr.reduce(function(s,x){return s+x;},0);
        var el = document.createElement('div');
        el.className = 'acc-tacct';
        el.innerHTML =
          '<div class="acc-tacct-head"><span>'+name+'</span><span class="acc-tacct-type">'+a.type+'</span></div>'+
          '<div class="acc-tacct-body">'+
            '<div class="acc-tacct-side" data-side="dr"><h6>مدين Debit</h6><ul>'+
              a.dr.map(function(v){return '<li>'+v.toLocaleString('en-US')+'</li>';}).join('') +
              (totalDr ? '<li style="border-top:1px dashed rgba(255,255,255,0.10);margin-top:4px;font-weight:800;">∑ '+totalDr.toLocaleString('en-US')+'</li>' : '')+
            '</ul></div>'+
            '<div class="acc-tacct-side" data-side="cr"><h6>دائن Credit</h6><ul>'+
              a.cr.map(function(v){return '<li>'+v.toLocaleString('en-US')+'</li>';}).join('') +
              (totalCr ? '<li style="border-top:1px dashed rgba(255,255,255,0.10);margin-top:4px;font-weight:800;">∑ '+totalCr.toLocaleString('en-US')+'</li>' : '')+
            '</ul></div>'+
          '</div>';
        grid.appendChild(el);
      });
    }

    function apply(tx){
      tx.dr.forEach(function(e){ ensure(e.a, e.t).dr.push(e.v); });
      tx.cr.forEach(function(e){ ensure(e.a, e.t).cr.push(e.v); });
      render();
      // highlight active sides briefly
      grid.querySelectorAll('.acc-tacct-side').forEach(function(s){ s.classList.remove('active'); });
      tx.dr.concat(tx.cr).forEach(function(){});
      var totalDr = tx.dr.reduce(function(s,x){return s+x.v;},0);
      var totalCr = tx.cr.reduce(function(s,x){return s+x.v;},0);
      var ok = totalDr === totalCr;
      current.innerHTML = '<b>القيد:</b> ' + tx.title +
        ' · مدين ' + totalDr.toLocaleString('en-US') +
        ' / دائن ' + totalCr.toLocaleString('en-US') +
        ' · <span style="color:'+(ok?'#34D399':'#F87171')+';font-weight:800;">'+(ok?'متوازن':'غير متوازن')+'</span>';
    }

    sel.addEventListener('change', function(){
      var id = sel.value;
      if (!id) return;
      var tx = T_TX.find(function(t){ return t.id === id; });
      if (tx) apply(tx);
    });
    clearBtn.addEventListener('click', function(){
      accounts = {};
      sel.value = '';
      current.textContent = '— اختر معاملة لتظهر القيود —';
      render();
    });
    render();
  }

  /* ── Block 3 · Cycle Ring ─────────────────────────────────────── */
  var CYCLE = [
    { n:1, t:'تحليل المعاملات', body:'فحص المستندات (فاتورة، إيصال، عقد) وتحديد الحسابات المتأثرة وطبيعة الأثر (مدين/دائن).',
      out:'تصنيف معاملة قابل للقيد', tool:'كشف معاملات يومي', pitfall:'تجاهل المعاملات بلا مستند',
      ex:'فاتورة شراء أثاث 5M IQD من مكتب الزهراء بالعرف الكاش — تُحلَّل كأصل + خفض نقد.' },
    { n:2, t:'قيد اليومية', body:'تسجيل القيد في دفتر اليومية بصيغة (مدين / إلى دائن) مع شرح ورقم مستند ومرجع.',
      out:'قيد يومية موثّق', tool:'دفتر اليومية', pitfall:'قيود بلا شرح أو بلا مرجع',
      ex:'٢٠٢٤/٠٤/٠١ — من ح/ الأثاث 5,000,000 / إلى ح/ النقد 5,000,000 — شراء أثاث مكتبي.' },
    { n:3, t:'الترحيل', body:'نقل القيود من دفتر اليومية إلى الحسابات في دفتر الأستاذ بالترتيب الزمني.',
      out:'حسابات أستاذ محدّثة', tool:'دفتر الأستاذ + برنامج محاسبة', pitfall:'الترحيل لحساب خاطئ',
      ex:'ترحيل 5M إلى الجانب المدين من حساب «الأثاث» وإلى الجانب الدائن من حساب «النقد».' },
    { n:4, t:'ميزان المراجعة', body:'مجموع الجانب المدين لجميع الحسابات = مجموع الجانب الدائن. اختبار رياضي أولي.',
      out:'ميزان غير معدّل متوازن', tool:'تقرير ميزان المراجعة', pitfall:'توازن ميزان لا يعني صحة كاملة',
      ex:'في 31/3 المدين = 87,400,000 والدائن = 87,400,000 — فرق صفر.' },
    { n:5, t:'التسويات الجردية', body:'قيود نهاية الفترة: استحقاق المصاريف، الإيرادات المقدمة، الإهلاك، المخصصات.',
      out:'قيود تسوية', tool:'ورقة عمل + تقرير الإهلاك', pitfall:'نسيان الإهلاك أو الفوائد المستحقة',
      ex:'إهلاك شهري 200k IQD لمعدات بقيمة 24M على 10 سنوات — من ح/ مصروف الإهلاك / إلى ح/ مجمع الإهلاك.' },
    { n:6, t:'ميزان مراجعة معدّل', body:'بعد قيود التسوية: ميزان جديد يعكس الواقع المحاسبي الكامل للفترة.',
      out:'ميزان معدّل صالح للقوائم', tool:'ورقة عمل 10 أعمدة', pitfall:'إعداد القوائم قبل التسوية',
      ex:'الفرق عن الميزان غير المعدّل: إضافة 200k لمصروف الإهلاك و200k لمجمع الإهلاك.' },
    { n:7, t:'إعداد القوائم المالية', body:'قائمة الدخل، الميزانية، التدفقات النقدية، التغير في حقوق الملكية.',
      out:'قوائم مالية كاملة', tool:'IFRS / المعايير المحلية', pitfall:'خلط بنود تشغيلية بغير تشغيلية',
      ex:'صافي ربح الفترة 7.8M IQD، إجمالي الأصول 95M، حقوق الملكية 58M.' },
    { n:8, t:'القيود الختامية', body:'إقفال حسابات الإيرادات والمصاريف في حساب «ملخص الدخل» ثم إلى الأرباح المحتجزة.',
      out:'حسابات مؤقتة بصفر', tool:'قيود إقفال', pitfall:'نسيان إقفال حساب توزيعات الأرباح',
      ex:'من ح/ المبيعات 18M / إلى ح/ ملخص الدخل 18M — ثم تحويل صافي الربح 7.8M إلى الأرباح المحتجزة.' },
    { n:9, t:'ميزان ما بعد الإقفال', body:'يحتوي فقط على الحسابات الدائمة (الميزانية). دليل على جاهزية فترة جديدة.',
      out:'نقطة بداية للفترة الجديدة', tool:'تقرير ختامي', pitfall:'بقاء أرصدة في حسابات مؤقتة',
      ex:'لا يظهر في الميزان أي حساب إيراد أو مصروف — فقط الأصول والخصوم وحقوق الملكية.' }
  ];

  function setupCycle(){
    var lab = document.querySelector('[data-acc-lab="cycle"]');
    if (!lab) return;
    var ring = lab.querySelector('[data-acc-cycle-ring]');
    var detail = lab.querySelector('[data-acc-cycle-detail]');
    var tag = detail.querySelector('.acc-cycle-step-tag');
    var title = detail.querySelector('.acc-cycle-step-title');
    var body = detail.querySelector('.acc-cycle-step-body');
    var outEl = detail.querySelector('[data-acc-cycle-output]');
    var toolEl = detail.querySelector('[data-acc-cycle-tool]');
    var pitEl = detail.querySelector('[data-acc-cycle-pitfall]');
    var exWrap = detail.querySelector('[data-acc-cycle-example]');
    var exP = exWrap.querySelector('p');
    var progBar = lab.querySelector('[data-acc-cycle-progress]');
    var progNum = lab.querySelector('[data-acc-cycle-progress-num]');

    var visited = {};
    try {
      var raw = localStorage.getItem('upg_acc_cycle_visited');
      if (raw) visited = JSON.parse(raw) || {};
    } catch(_){}

    var R = 138; // matches CSS svg circle r
    var cx = 180, cy = 180;
    CYCLE.forEach(function(step, i){
      var angle = (i / CYCLE.length) * 2 * Math.PI - Math.PI / 2;
      var x = cx + Math.cos(angle) * R;
      var y = cy + Math.sin(angle) * R;
      var pctX = (x / 360) * 100;
      var pctY = (y / 360) * 100;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'acc-cycle-step';
      btn.style.insetInlineStart = pctX + '%';
      btn.style.insetBlockStart = pctY + '%';
      btn.dataset.step = String(step.n);
      btn.innerHTML = step.n + '<span>'+step.t.split(' ')[0]+'</span>';
      btn.setAttribute('aria-label', 'الخطوة '+step.n+': '+step.t);
      if (visited[step.n]) btn.classList.add('visited');
      btn.addEventListener('click', function(){ activate(step.n); });
      ring.appendChild(btn);
    });

    function updateProgress(){
      var count = Object.keys(visited).length;
      if (progBar) progBar.style.width = ((count/9)*100) + '%';
      if (progNum) progNum.textContent = count;
    }

    function activate(n){
      var step = CYCLE.find(function(s){ return s.n === n; });
      if (!step) return;
      ring.querySelectorAll('.acc-cycle-step').forEach(function(b){ b.classList.remove('active'); });
      var btn = ring.querySelector('[data-step="'+n+'"]');
      if (btn) { btn.classList.add('active'); btn.classList.add('visited'); }
      tag.textContent = 'الخطوة ' + n;
      title.textContent = step.t;
      body.textContent = step.body;
      outEl.textContent = step.out;
      toolEl.textContent = step.tool;
      pitEl.textContent = step.pitfall;
      exP.textContent = step.ex;
      visited[n] = true;
      try { localStorage.setItem('upg_acc_cycle_visited', JSON.stringify(visited)); } catch(_){}
      updateProgress();
    }

    activate(1);
  }

  ready(function(){
    try { setupEquation(); } catch(e) { console.warn('eq lab error', e); }
    try { setupTAccount(); } catch(e) { console.warn('t-account lab error', e); }
    try { setupCycle();    } catch(e) { console.warn('cycle lab error', e); }
  });
})();



/* ════════════════════════════════════════════════════════════════
   WORKER 04 · PHASE 2 — Iraqi COA + IFRS + 10 Ratios
═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if (window.__UPG_ACC_PHASE2__) return;
  window.__UPG_ACC_PHASE2__ = true;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else { fn(); }
  }

  /* ── Block 4 · Iraqi Unified Chart of Accounts ───────────────── */
  var COA = [
    { num:'1xxx', name:'الأصول', en:'Assets', type:'مدين',
      accts: [
        {n:'1101', ar:'صندوق النقدية', en:'Cash on Hand', ex:'النقد في خزنة المؤسسة بالدينار العراقي/الدولار.'},
        {n:'1102', ar:'حسابات بنكية جارية', en:'Bank Current Accounts', ex:'مصرف الرافدين، الرشيد، البنك الأهلي العراقي.'},
        {n:'1201', ar:'مدينون تجاريون', en:'Trade Receivables', ex:'مبيعات بالأجل لزبائن الجملة.'},
        {n:'1202', ar:'أوراق قبض', en:'Notes Receivable', ex:'كمبيالات مستحقة لصالح المؤسسة.'},
        {n:'1301', ar:'مخزون البضاعة', en:'Inventory — Goods', ex:'بضاعة الصنف المباع — تُقيَّم بـ FIFO أو متوسط مرجَّح.'},
        {n:'1302', ar:'مخزون مواد خام', en:'Inventory — Raw Materials', ex:'مواد للتصنيع داخل المعمل.'},
        {n:'1401', ar:'الأراضي', en:'Land', ex:'لا تُهلَك. تُسجَّل بسعر الكلفة + رسوم التسجيل.'},
        {n:'1402', ar:'المباني', en:'Buildings', ex:'تُهلَك على 25-50 سنة حسب نوع البناء.'},
        {n:'1403', ar:'الآلات والمعدات', en:'Machinery & Equipment', ex:'تُهلَك على 5-15 سنة.'},
        {n:'1404', ar:'مجمع الإهلاك (مقابل)', en:'Accumulated Depreciation', ex:'حساب أصل مقابل — يُطرح من قيمة الأصل الدفترية.'}
      ]},
    { num:'2xxx', name:'الخصوم', en:'Liabilities', type:'دائن',
      accts: [
        {n:'2101', ar:'دائنون تجاريون', en:'Trade Payables', ex:'موردون لم تُسدَّد فواتيرهم بعد.'},
        {n:'2102', ar:'أوراق دفع', en:'Notes Payable', ex:'كمبيالات صادرة للموردين.'},
        {n:'2103', ar:'مصاريف مستحقة', en:'Accrued Expenses', ex:'رواتب آخر الشهر، إيجارات، فوائد.'},
        {n:'2201', ar:'ضريبة الدخل المستحقة', en:'Income Tax Payable', ex:'الضريبة الموقوفة عن الموظفين + ضريبة الشركة.'},
        {n:'2202', ar:'الضمان الاجتماعي', en:'Social Security Payable', ex:'5% من راتب الموظف + 12% من المؤسسة (الإجمالي 17%).'},
        {n:'2301', ar:'قروض قصيرة الأجل', en:'Short-term Loans', ex:'تسهيلات بنكية ≤ 12 شهراً.'},
        {n:'2401', ar:'قروض طويلة الأجل', en:'Long-term Loans', ex:'قروض الاستثمار من المصارف الحكومية أو الخاصة.'}
      ]},
    { num:'3xxx', name:'حقوق الملكية', en:'Equity', type:'دائن',
      accts: [
        {n:'3101', ar:'رأس المال', en:'Capital / Share Capital', ex:'الحد الأدنى 100 مليون IQD لشركة محدودة المسؤولية.'},
        {n:'3102', ar:'احتياطي قانوني', en:'Legal Reserve', ex:'5% من صافي الربح حتى يبلغ 25% من رأس المال.'},
        {n:'3103', ar:'أرباح محتجزة', en:'Retained Earnings', ex:'تراكم صافي الأرباح بعد توزيعات الملاك.'},
        {n:'3104', ar:'سحوبات الملاك (مقابل)', en:'Owner Drawings', ex:'تُطرح من حقوق الملكية في نهاية السنة.'}
      ]},
    { num:'4xxx', name:'الإيرادات', en:'Revenues', type:'دائن',
      accts: [
        {n:'4101', ar:'مبيعات', en:'Sales Revenue', ex:'الإيراد التشغيلي الرئيسي للمؤسسة.'},
        {n:'4102', ar:'مردودات المبيعات (مقابل)', en:'Sales Returns', ex:'تُطرح من إجمالي المبيعات.'},
        {n:'4103', ar:'خصم مسموح به (مقابل)', en:'Sales Discounts', ex:'خصومات تعجيل دفع — تُطرح من المبيعات.'},
        {n:'4201', ar:'إيرادات خدمات', en:'Service Revenue', ex:'لشركات الخدمات: استشارات، صيانة، تدريب.'},
        {n:'4301', ar:'إيرادات أخرى', en:'Other Revenue', ex:'فوائد دائنة، إيجارات، أرباح بيع أصل ثابت.'}
      ]},
    { num:'5xxx', name:'المصاريف', en:'Expenses', type:'مدين',
      accts: [
        {n:'5101', ar:'تكلفة المبيعات', en:'Cost of Goods Sold', ex:'المخزون المُباع بسعر التكلفة.'},
        {n:'5201', ar:'مصروف الرواتب', en:'Salaries Expense', ex:'يشمل البدلات والحوافز قبل الإقتطاعات.'},
        {n:'5202', ar:'الضمان الاجتماعي (حصة المؤسسة)', en:'Employer Social Security', ex:'12% من الرواتب على عاتق المؤسسة.'},
        {n:'5301', ar:'إيجارات', en:'Rent Expense', ex:'إيجار المقر + الفروع.'},
        {n:'5302', ar:'مصاريف خدمات', en:'Utilities (Power/Water/Net)', ex:'كهرباء، ماء، إنترنت (Earthlink/Asiacell).'},
        {n:'5303', ar:'وقود ومحروقات', en:'Fuel', ex:'تكلفة المولدات الكهربائية اليومية في العراق.'},
        {n:'5401', ar:'إهلاك الأصول الثابتة', en:'Depreciation Expense', ex:'الإهلاك الشهري لكل الأصول الثابتة.'},
        {n:'5501', ar:'مصروف الفوائد', en:'Interest Expense', ex:'فوائد القروض البنكية.'},
        {n:'5601', ar:'مصاريف عمومية', en:'General & Admin', ex:'قرطاسية، استشارات قانونية، تأمين.'},
        {n:'5701', ar:'مصاريف تسويق', en:'Marketing & Advertising', ex:'إعلانات Asiacell ads, لوحات، Facebook/Instagram.'}
      ]}
  ];

  function setupCOA(){
    var lab = document.querySelector('[data-acc-lab="coa"]');
    if (!lab) return;
    var stack = lab.querySelector('[data-acc-coa-stack]');
    var palette = { '1xxx':'#34D399', '2xxx':'#F59E0B', '3xxx':'#C4B5FD', '4xxx':'#60A5FA', '5xxx':'#F87171' };

    COA.forEach(function(g, i){
      var el = document.createElement('div');
      el.className = 'acc-coa-group';
      if (i === 0) el.classList.add('open');
      var color = palette[g.num] || '#66FCF1';
      el.innerHTML =
        '<div class="acc-coa-group-head">'+
          '<span class="acc-coa-group-num" style="color:'+color+';background:'+color+'1A;border-color:'+color+'40">'+g.num+'</span>'+
          '<span class="acc-coa-group-name">'+g.name+'</span>'+
          '<span class="acc-coa-group-type">'+g.en+' · '+g.type+'</span>'+
          '<svg class="acc-coa-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'+
        '</div>'+
        '<div class="acc-coa-group-body"><ul class="acc-coa-acct-list">'+
          g.accts.map(function(a){
            return '<li class="acc-coa-acct">'+
              '<div class="acc-coa-acct-head">'+
                '<span class="acc-coa-acct-num">'+a.n+'</span>'+
                '<span class="acc-coa-acct-name">'+a.ar+'</span>'+
                '<span class="acc-coa-acct-en">'+a.en+'</span>'+
              '</div>'+
              '<div class="acc-coa-acct-ex">'+a.ex+'</div>'+
            '</li>';
          }).join('') +
        '</ul></div>';
      el.querySelector('.acc-coa-group-head').addEventListener('click', function(){
        el.classList.toggle('open');
      });
      stack.appendChild(el);
    });
  }

  /* ── Block 6 · 10 Financial Ratios ──────────────────────────── */
  var RATIOS = [
    { cat:'liq',  catLabel:'سيولة', name:'النسبة الجارية', en:'Current Ratio',
      formula:'الأصول المتداولة ÷ الخصوم المتداولة',
      measure:'قدرة المؤسسة على سداد التزاماتها قصيرة الأجل من أصولها المتداولة.',
      ideal:'1.5 — 3.0 (أعلى من 3 = نقد عاطل، أقل من 1 = خطر سيولة)',
      ex:'مؤسسة عراقية: أصول متداولة 240M، خصوم متداولة 120M → النسبة 2.0 ✅' },
    { cat:'liq',  catLabel:'سيولة', name:'النسبة السريعة (Quick)', en:'Acid-Test Ratio',
      formula:'(الأصول المتداولة − المخزون) ÷ الخصوم المتداولة',
      measure:'سيولة فورية بدون الاعتماد على بيع المخزون.',
      ideal:'≥ 1.0 (أقل = الاعتماد الكبير على المخزون)',
      ex:'متجر: 240M − 90M مخزون = 150M، الخصوم 120M → 1.25 ✅' },
    { cat:'lev',  catLabel:'رفع', name:'نسبة الديون لحقوق الملكية', en:'Debt-to-Equity',
      formula:'إجمالي الخصوم ÷ حقوق الملكية',
      measure:'مدى تمويل المؤسسة بالديون مقارنة بالملكية.',
      ideal:'≤ 1.0 لمعظم القطاعات (المصارف يصلون 8-10)',
      ex:'شركة إنشاءات: ديون 80M، حقوق 100M → 0.8 ✅' },
    { cat:'lev',  catLabel:'رفع', name:'تغطية الفوائد', en:'Interest Coverage',
      formula:'الربح قبل الفوائد والضريبة ÷ مصروف الفوائد',
      measure:'كم مرة يغطي الربح التشغيلي مصروف الفوائد.',
      ideal:'≥ 3.0 (أقل = خطر تعثر)',
      ex:'EBIT = 18M، فوائد = 4M → 4.5x ✅' },
    { cat:'prof', catLabel:'ربحية', name:'هامش الربح الإجمالي', en:'Gross Margin %',
      formula:'(المبيعات − تكلفة المبيعات) ÷ المبيعات × 100',
      measure:'كفاءة الإنتاج/الشراء قبل المصاريف الأخرى.',
      ideal:'يختلف بالقطاع: تجزئة 25-40%، خدمات 40-70%',
      ex:'متجر: مبيعات 200M، تكلفة 130M → 35% ✅ للتجزئة' },
    { cat:'prof', catLabel:'ربحية', name:'هامش صافي الربح', en:'Net Margin %',
      formula:'صافي الربح ÷ المبيعات × 100',
      measure:'الربح بعد كل المصاريف والضرائب لكل دينار مبيعات.',
      ideal:'5-10% للتجزئة، 10-25% للخدمات',
      ex:'مطعم: مبيعات 600M، صافي ربح 54M → 9% ✅' },
    { cat:'prof', catLabel:'ربحية', name:'العائد على الأصول', en:'ROA',
      formula:'صافي الربح ÷ متوسط إجمالي الأصول × 100',
      measure:'كفاءة استخدام الأصول لتوليد الأرباح.',
      ideal:'≥ 5% (أعلى = استخدام أكفأ)',
      ex:'مصنع: ربح 30M، أصول 400M → 7.5% ✅' },
    { cat:'prof', catLabel:'ربحية', name:'العائد على حقوق الملكية', en:'ROE',
      formula:'صافي الربح ÷ متوسط حقوق الملكية × 100',
      measure:'العائد لكل دينار يستثمره الملاك.',
      ideal:'≥ 12% (السوق العراقي 8-20%)',
      ex:'شركة اتصالات: ربح 80M، حقوق 500M → 16% ✅' },
    { cat:'eff',  catLabel:'كفاءة', name:'دوران المخزون', en:'Inventory Turnover',
      formula:'تكلفة المبيعات ÷ متوسط المخزون',
      measure:'سرعة بيع وتجديد المخزون.',
      ideal:'4-12 سنوياً للتجزئة، 8-20 للأغذية',
      ex:'سوبرماركت: تكلفة 480M، مخزون 60M → 8x ✅' },
    { cat:'eff',  catLabel:'كفاءة', name:'فترة تحصيل المدينين', en:'DSO',
      formula:'(المدينون ÷ المبيعات الآجلة) × 365',
      measure:'متوسط أيام تحصيل الفواتير.',
      ideal:'≤ 45 يوم للتجزئة، 30-60 للجملة',
      ex:'جملة: مدينون 60M، مبيعات آجلة 600M → 36.5 يوم ✅' }
  ];

  function setupRatios(){
    var lab = document.querySelector('[data-acc-lab="ratios"]');
    if (!lab) return;
    var grid = lab.querySelector('[data-acc-ratios-grid]');
    var pills = lab.querySelectorAll('[data-ratio-cat]');

    RATIOS.forEach(function(r){
      var card = document.createElement('article');
      card.className = 'acc-ratio-card';
      card.dataset.ratioCat = r.cat;
      card.innerHTML =
        '<span class="acc-ratio-cat '+r.cat+'">'+r.catLabel+'</span>'+
        '<div class="acc-ratio-name">'+r.name+'<span>'+r.en+'</span></div>'+
        '<div class="acc-ratio-formula">'+r.formula+'</div>'+
        '<div class="acc-ratio-row"><span>تقيس</span><div>'+r.measure+'</div></div>'+
        '<div class="acc-ratio-row"><span>النطاق المثالي</span><div>'+r.ideal+'</div></div>'+
        '<div class="acc-ratio-ex"><b>مثال:</b> '+r.ex+'</div>';
      grid.appendChild(card);
    });

    pills.forEach(function(p){
      p.addEventListener('click', function(){
        pills.forEach(function(x){ x.classList.remove('active'); });
        p.classList.add('active');
        var cat = p.dataset.ratioCat;
        grid.querySelectorAll('.acc-ratio-card').forEach(function(c){
          if (cat === 'all' || c.dataset.ratioCat === cat) c.classList.remove('hide');
          else c.classList.add('hide');
        });
      });
    });
  }

  ready(function(){
    try { setupCOA();    } catch(e) { console.warn('coa lab error', e); }
    try { setupRatios(); } catch(e) { console.warn('ratios lab error', e); }
  });
})();



/* ════════════════════════════════════════════════════════════════
   WORKER 04 · PHASE 3 — Iraqi Tax Calculator + Salary Slip
═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if (window.__UPG_ACC_PHASE3__) return;
  window.__UPG_ACC_PHASE3__ = true;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else { fn(); }
  }

  /**
   * Iraqi Income Tax (Monthly, marginal brackets):
   *   ≤ 250,000          → 0%
   *   250,001 – 500,000  → 3% on excess
   *   500,001 – 1,000,000 → 5% on excess
   *   > 1,000,000        → 15% on excess
   *
   * Personal allowance (annual ÷ 12 monthly):
   *   single: 2,500,000/yr → ~208,333/mo
   *   married: 4,500,000/yr → 375,000/mo
   *   per child ≤18: 200,000/yr → 16,666/mo
   *
   * Social security (private sector):
   *   Employee 5%, Employer 12%
   */
  function calcTax(taxableMonthly){
    var brackets = [
      { from: 0,        to: 250000,    rate: 0.00 },
      { from: 250000,   to: 500000,    rate: 0.03 },
      { from: 500000,   to: 1000000,   rate: 0.05 },
      { from: 1000000,  to: Infinity,  rate: 0.15 }
    ];
    var tax = 0, breakdown = [];
    for (var i = 0; i < brackets.length; i++){
      var b = brackets[i];
      if (taxableMonthly <= b.from) break;
      var slice = Math.min(taxableMonthly, b.to) - b.from;
      var amt = slice * b.rate;
      tax += amt;
      if (slice > 0) {
        breakdown.push({
          range: b.from.toLocaleString('en-US') + ' – ' + (b.to === Infinity ? '∞' : b.to.toLocaleString('en-US')),
          rate: (b.rate * 100).toFixed(0) + '%',
          slice: Math.round(slice),
          tax: Math.round(amt)
        });
      }
    }
    return { tax: Math.round(tax), breakdown: breakdown };
  }

  function setupTaxCalc(){
    var lab = document.querySelector('[data-acc-lab="tax-calc"]');
    if (!lab) return;
    var grossIn  = lab.querySelector('[data-acc-tax="gross"]');
    var statusIn = lab.querySelector('[data-acc-tax="status"]');
    var kidsIn   = lab.querySelector('[data-acc-tax="children"]');
    var allowIn  = lab.querySelector('[data-acc-tax="allowances"]');
    var otherIn  = lab.querySelector('[data-acc-tax="otherded"]');
    var calcBtn  = lab.querySelector('[data-acc-tax-calc]');
    var printBtn = lab.querySelector('[data-acc-tax-print]');

    var rows = {};
    lab.querySelectorAll('[data-acc-tax-row]').forEach(function(el){
      rows[el.dataset.accTaxRow] = el;
    });
    var emp = {};
    lab.querySelectorAll('[data-acc-tax-emp-row]').forEach(function(el){
      emp[el.dataset.accTaxEmpRow] = el;
    });
    var metaMonth = lab.querySelector('[data-acc-tax-meta-month]');
    var metaStatus = lab.querySelector('[data-acc-tax-meta-status]');
    var bdWrap = lab.querySelector('[data-acc-tax-breakdown] ul');

    function fmt(n){ return Math.round(n).toLocaleString('en-US') + ' د.ع'; }

    function compute(){
      var gross = Math.max(0, Number(grossIn.value) || 0);
      var allow = Math.max(0, Number(allowIn.value) || 0);
      var other = Math.max(0, Number(otherIn.value) || 0);
      var status = statusIn.value;
      var kids = Math.max(0, Math.min(10, Number(kidsIn.value) || 0));

      var totalIncome = gross + allow;
      // Personal allowance per month (annual / 12)
      var baseAllow = (status === 'married' ? 4500000 : 2500000) / 12;
      var kidAllow  = (kids * 200000) / 12;
      var monthlyAllow = baseAllow + kidAllow;

      var taxable = Math.max(0, totalIncome - monthlyAllow);
      var taxRes = calcTax(taxable);
      var tax = taxRes.tax;
      var social = totalIncome * 0.05;
      var totalDed = tax + social + other;
      var net = totalIncome - totalDed;
      var empSocial = totalIncome * 0.12;
      var empCost = totalIncome + empSocial;

      rows.gross.textContent = fmt(gross);
      rows.allowances.textContent = fmt(allow);
      rows.total.textContent = fmt(totalIncome);
      rows.tax.textContent = '− ' + fmt(tax);
      rows.social.textContent = '− ' + fmt(social);
      rows.otherded.textContent = '− ' + fmt(other);
      rows.totalded.textContent = '− ' + fmt(totalDed);
      rows.net.textContent = fmt(net);

      emp.total.textContent = fmt(totalIncome);
      emp.empsocial.textContent = '+ ' + fmt(empSocial);
      emp.empcost.textContent = fmt(empCost);

      var statusText = (status === 'married' ? 'متزوج' : 'أعزب') + ' · ' + kids + ' أطفال';
      metaStatus.textContent = statusText;
      var d = new Date();
      var months = ['كانون الثاني','شباط','آذار','نيسان','أيار','حزيران','تموز','آب','أيلول','تشرين الأول','تشرين الثاني','كانون الأول'];
      metaMonth.textContent = 'شهر ' + months[d.getMonth()] + ' ' + d.getFullYear();

      bdWrap.innerHTML = '';
      bdWrap.innerHTML +=
        '<li><b>الدخل الإجمالي:</b> ' + fmt(totalIncome) + '</li>' +
        '<li><b>إعفاء شخصي شهري:</b> − ' + fmt(monthlyAllow) +
          ' <i style="color:var(--text-muted)">(أساسي ' + fmt(baseAllow) +
          (kids ? ' + أولاد ' + fmt(kidAllow) : '') + ')</i></li>' +
        '<li><b>الدخل الخاضع للضريبة:</b> ' + fmt(taxable) + '</li>';
      taxRes.breakdown.forEach(function(b){
        bdWrap.innerHTML +=
          '<li>شريحة ' + b.range + ' × ' + b.rate +
          ' على <b>' + fmt(b.slice) + '</b> = <b style="color:#F87171">' + fmt(b.tax) + '</b></li>';
      });
      bdWrap.innerHTML += '<li><b>إجمالي الضريبة الشهرية:</b> ' + fmt(tax) + '</li>';

      try {
        localStorage.setItem('upg_tax_drafts', JSON.stringify({
          gross: gross, status: status, children: kids, allow: allow, other: other, ts: Date.now()
        }));
      } catch(_){}
    }

    [grossIn, statusIn, kidsIn, allowIn, otherIn].forEach(function(el){
      el.addEventListener('input', compute);
      el.addEventListener('change', compute);
    });
    calcBtn.addEventListener('click', compute);
    printBtn.addEventListener('click', function(){
      compute();
      window.print();
    });

    // Restore last draft
    try {
      var raw = localStorage.getItem('upg_tax_drafts');
      if (raw) {
        var d = JSON.parse(raw);
        if (d && typeof d === 'object') {
          if (typeof d.gross === 'number') grossIn.value = d.gross;
          if (d.status) statusIn.value = d.status;
          if (typeof d.children === 'number') kidsIn.value = d.children;
          if (typeof d.allow === 'number') allowIn.value = d.allow;
          if (typeof d.other === 'number') otherIn.value = d.other;
        }
      }
    } catch(_){}

    compute();
  }

  ready(function(){
    try { setupTaxCalc(); } catch(e) { console.warn('tax calc lab error', e); }
  });
})();



/* ════════════════════════════════════════════════════════════════
   WORKER 04 · PHASE 4 — Income Statement + Balance Sheet Builders
═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if (window.__UPG_ACC_PHASE4__) return;
  window.__UPG_ACC_PHASE4__ = true;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else { fn(); }
  }

  function fmt(n){
    var x = Math.round(Number(n) || 0);
    var sign = x < 0 ? '−' : '';
    return sign + Math.abs(x).toLocaleString('en-US');
  }
  function getN(input){ return Math.max(0, Number(input.value) || 0); }

  /* ── Block 9 · Income Statement Builder ─────────────────────── */
  function setupIS(){
    var lab = document.querySelector('[data-acc-lab="income-stmt"]');
    if (!lab) return;
    var ins = {};
    lab.querySelectorAll('[data-is]').forEach(function(el){ ins[el.dataset.is] = el; });
    var outs = {};
    lab.querySelectorAll('[data-is-out]').forEach(function(el){ outs[el.dataset.isOut] = el; });
    var warnWrap = lab.querySelector('[data-acc-is-warn]');

    function compute(){
      var sales = getN(ins.sales);
      var returns = getN(ins.returns);
      var cogs = getN(ins.cogs);
      var opex = getN(ins.opSalaries) + getN(ins.opRent) + getN(ins.opMkt) + getN(ins.opDep) + getN(ins.opOther);
      var otherInc = getN(ins.otherInc);
      var interest = getN(ins.interest);
      var taxRate = Math.max(0, Math.min(100, Number(ins.taxRate.value) || 0)) / 100;

      var netSales = sales - returns;
      var gp = netSales - cogs;
      var op = gp - opex;
      var ebt = op + otherInc - interest;
      var tax = ebt > 0 ? ebt * taxRate : 0;
      var net = ebt - tax;

      outs.sales.textContent     = fmt(sales);
      outs.returns.textContent   = '(' + fmt(returns) + ')';
      outs.netSales.textContent  = fmt(netSales);
      outs.cogs.textContent      = '(' + fmt(cogs) + ')';
      outs.gp.textContent        = fmt(gp);
      outs.opex.textContent      = '(' + fmt(opex) + ')';
      outs.op.textContent        = fmt(op);
      outs.otherInc.textContent  = fmt(otherInc);
      outs.interest.textContent  = '(' + fmt(interest) + ')';
      outs.ebt.textContent       = fmt(ebt);
      outs.tax.textContent       = '(' + fmt(tax) + ')';
      outs.net.textContent       = fmt(net);

      var pct = function(num){
        if (netSales <= 0) return '—';
        return ((num / netSales) * 100).toFixed(1) + '%';
      };
      outs.gpPct.textContent  = pct(gp);
      outs.opPct.textContent  = pct(op);
      outs.netPct.textContent = pct(net);

      // negative styling
      ['gp','op','net'].forEach(function(k){
        var li = outs[k] && outs[k].closest('li');
        if (!li) return;
        var v = k === 'gp' ? gp : (k === 'op' ? op : net);
        if (v < 0) li.classList.add('negative'); else li.classList.remove('negative');
      });

      // Warnings
      var warns = [];
      var gpPct = netSales > 0 ? gp / netSales : 0;
      var opPct = netSales > 0 ? op / netSales : 0;
      var netPct = netSales > 0 ? net / netSales : 0;
      if (gpPct < 0.15) warns.push({lvl:'danger', t:'هامش الربح الإجمالي ضعيف (<15%) — راجع تكلفة الشراء أو الإنتاج.'});
      else if (gpPct < 0.25) warns.push({lvl:'warn', t:'هامش الربح الإجمالي متوسط (15-25%) — مساحة لتحسين هامش التسعير.'});
      else warns.push({lvl:'ok', t:'هامش الربح الإجمالي صحي (≥25%).'});

      if (op < 0) warns.push({lvl:'danger', t:'الربح التشغيلي سالب — العمليات الأساسية تخسر، تحقق من المصاريف الإدارية.'});
      else if (opPct < 0.05) warns.push({lvl:'warn', t:'الربح التشغيلي ضعيف (<5%) — العمليات بالكاد تغطي مصاريفها.'});

      if (net < 0) warns.push({lvl:'danger', t:'صافي ربح سالب — الشركة في خسارة هذه الفترة.'});
      else if (netPct < 0.03) warns.push({lvl:'warn', t:'صافي الربح هامشي (<3%) — هامش أمان منخفض ضد الصدمات.'});
      else if (netPct >= 0.10) warns.push({lvl:'ok', t:'صافي ربح ممتاز (≥10%).'});

      if (interest > 0 && op > 0 && (op / interest) < 3) {
        warns.push({lvl:'warn', t:'تغطية الفوائد <3x — المخاطر المالية مرتفعة.'});
      }

      warnWrap.innerHTML = warns.map(function(w){
        var icon = w.lvl === 'danger' ? '⛔' : w.lvl === 'warn' ? '⚠️' : '✅';
        return '<div class="acc-is-warn '+w.lvl+'"><span>'+icon+'</span><span>'+w.t+'</span></div>';
      }).join('');

      try {
        var draft = {};
        Object.keys(ins).forEach(function(k){ draft[k] = ins[k].value; });
        localStorage.setItem('upg_statements_drafts', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('upg_statements_drafts')||'{}'), { is: draft })));
      } catch(_){}
    }

    Object.keys(ins).forEach(function(k){
      ins[k].addEventListener('input', compute);
      ins[k].addEventListener('change', compute);
    });

    // Restore
    try {
      var draft = JSON.parse(localStorage.getItem('upg_statements_drafts')||'{}');
      if (draft && draft.is) {
        Object.keys(draft.is).forEach(function(k){
          if (ins[k] && draft.is[k] !== '') ins[k].value = draft.is[k];
        });
      }
    } catch(_){}

    compute();
  }

  /* ── Block 10 · Balance Sheet Builder ───────────────────────── */
  function setupBS(){
    var lab = document.querySelector('[data-acc-lab="balance-sheet"]');
    if (!lab) return;
    var ins = {};
    lab.querySelectorAll('[data-bs]').forEach(function(el){ ins[el.dataset.bs] = el; });
    var outs = {};
    lab.querySelectorAll('[data-bs-out]').forEach(function(el){ outs[el.dataset.bsOut] = el; });
    var flag = lab.querySelector('[data-acc-bs-flag]');
    var eqEl = lab.querySelector('[data-acc-bs-eq]');
    var flagText = flag.querySelector('.acc-bs-flag-text');
    var flagDiff = flag.querySelector('.acc-bs-flag-diff b');

    function compute(){
      var ca = getN(ins.cash) + getN(ins.ar) + getN(ins.inv) + getN(ins.otherCa);
      var fa = getN(ins.land) + getN(ins.ppe) + getN(ins.intang);
      var totalAssets = ca + fa;

      var cl = getN(ins.ap) + getN(ins.stl) + getN(ins.taxDue);
      var ll = getN(ins.ltl) + getN(ins.otherLtl);
      var eq = getN(ins.capital) + getN(ins.retained) + getN(ins.reserves);
      var totalLE = cl + ll + eq;

      outs.ca.textContent = fmt(ca);
      outs.fa.textContent = fmt(fa);
      outs.totalAssets.textContent = fmt(totalAssets);
      outs.cl.textContent = fmt(cl);
      outs.ll.textContent = fmt(ll);
      outs.eq.textContent = fmt(eq);
      outs.totalLE.textContent = fmt(totalLE);

      var diff = totalAssets - totalLE;
      var ok = Math.abs(diff) < 0.5;
      flag.dataset.balance = ok ? 'ok' : 'off';
      eqEl.dataset.balance = ok ? 'ok' : 'off';
      eqEl.textContent = ok ? '=' : '≠';
      flagText.textContent = ok ? 'المعادلة متوازنة · Assets = Liabilities + Equity' : 'المعادلة غير متوازنة — راجع القيود';
      flagDiff.textContent = fmt(diff);

      try {
        var draft = {};
        Object.keys(ins).forEach(function(k){ draft[k] = ins[k].value; });
        localStorage.setItem('upg_statements_drafts', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('upg_statements_drafts')||'{}'), { bs: draft })));
      } catch(_){}
    }

    Object.keys(ins).forEach(function(k){
      ins[k].addEventListener('input', compute);
      ins[k].addEventListener('change', compute);
    });

    try {
      var draft = JSON.parse(localStorage.getItem('upg_statements_drafts')||'{}');
      if (draft && draft.bs) {
        Object.keys(draft.bs).forEach(function(k){
          if (ins[k] && draft.bs[k] !== '') ins[k].value = draft.bs[k];
        });
      }
    } catch(_){}

    compute();
  }

  ready(function(){
    try { setupIS(); } catch(e) { console.warn('IS lab error', e); }
    try { setupBS(); } catch(e) { console.warn('BS lab error', e); }
  });
})();



/* ════════════════════════════════════════════════════════════
   WORKER 05 · Junior Programmer Mastery
   Phase 1 — Fundamentals Gate (mark+progress) + Quiz + Path Tree
   Scope: #page-programming only. IIFE-isolated.
   localStorage: upg_progress_prog, upg_path_choice
   ════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  var LS_PROG = 'upg_progress_prog';
  var LS_PATH = 'upg_path_choice';

  function loadProg(){
    try { return JSON.parse(localStorage.getItem(LS_PROG)) || {}; }
    catch(e){ return {}; }
  }
  function saveProg(o){
    try { localStorage.setItem(LS_PROG, JSON.stringify(o)); } catch(e){}
  }

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ─── Fundamentals "I got it" tracking ─── */
  function setupFund(root){
    var cards = root.querySelectorAll('[data-fund-card]');
    var pctEl = root.querySelector('[data-fund-pct]');
    if (!cards.length) return;

    var state = loadProg();
    state.fundamentals = state.fundamentals || {};

    function refresh(){
      var done = 0, total = cards.length;
      cards.forEach(function(c){
        var id = c.getAttribute('data-fund-card');
        if (state.fundamentals[id]) {
          c.classList.add('is-marked');
          done++;
        } else {
          c.classList.remove('is-marked');
        }
      });
      if (pctEl) pctEl.textContent = Math.round((done/total)*100) + '%';
    }

    cards.forEach(function(c){
      var btn = c.querySelector('.prog-fund-mark');
      if (!btn) return;
      btn.addEventListener('click', function(){
        var id = c.getAttribute('data-fund-card');
        state.fundamentals[id] = !state.fundamentals[id];
        saveProg(state);
        refresh();
      });
    });

    refresh();
  }

  /* ─── Quiz ─── */
  var QUIZ = [
    { q:'ما الفرق الجوهري بين قيم primitive و reference؟',
      a:['تُمرَّر primitive كنسخة وreference بالعنوان','تُمرَّر primitive بالعنوان','reference أسرع دائماً','لا فرق'],
      c:0 },
    { q:'دالة pure هي…',
      a:['دالة طويلة','دالة بدون معاملات','دالة لا تعتمد على شيء خارجي ولا تُغيّره','دالة async'],
      c:2 },
    { q:'الـ closure تتذكّر…',
      a:['متغيّرات global فقط','متغيّرات بيئتها التي أنشأتها','اسم الملف','نوع المتصفح'],
      c:1 },
    { q:'await داخل async function يعني…',
      a:['ينتظر دون تجميد thread الرئيسي','يجمّد الصفحة','يلغي الطلب','يطبع في console'],
      c:0 },
    { q:'البنية الأنسب لتنفيذ undo/redo:',
      a:['Queue','Hashmap','Stack','Tree'],
      c:2 },
    { q:'ما Big-O لإيجاد عنصر في مصفوفة غير مرتّبة؟',
      a:['O(1)','O(log n)','O(n)','O(n²)'],
      c:2 },
    { q:'الـ Binary Search تتطلّب أن تكون البيانات…',
      a:['كبيرة','صغيرة','مرتّبة','مكرّرة'],
      c:2 },
    { q:'أين تعيش الـ objects في JavaScript؟',
      a:['Stack','Heap','Cache','GPU'],
      c:1 },
    { q:'متى يُفضّل استخدام Map على Object العادي؟',
      a:['أبداً','عند مفاتيح ديناميكية كثيرة أو غير نصية','مع JSON فقط','عند وجود dates'],
      c:1 },
    { q:'recursion ضرورية حين…',
      a:['يكون الإدخال صغيراً','تتفرّع البنية بشكل شجري أو تكراري ذاتي','تكون الخوارزمية بسيطة','نريد سرعة قصوى'],
      c:1 }
  ];

  function setupQuiz(root){
    var box = root.querySelector('[data-prog-quiz]');
    if (!box) return;
    var listEl  = box.querySelector('[data-quiz-list]');
    var scoreEl = box.querySelector('[data-quiz-score]');
    var hintEl  = box.querySelector('[data-quiz-hint]');
    var subBtn  = box.querySelector('[data-quiz-submit]');
    var rstBtn  = box.querySelector('[data-quiz-reset]');

    function render(){
      listEl.innerHTML = '';
      QUIZ.forEach(function(item, i){
        var li = document.createElement('li');
        li.className = 'prog-quiz-q';
        li.setAttribute('data-qi', i);
        var stem = document.createElement('div');
        stem.className = 'stem'; stem.textContent = item.q;
        li.appendChild(stem);
        var opts = document.createElement('div');
        opts.className = 'opts';
        item.a.forEach(function(opt, j){
          var lbl = document.createElement('label');
          var rb  = document.createElement('input');
          rb.type = 'radio'; rb.name = 'q-' + i; rb.value = j;
          var sp = document.createElement('span'); sp.textContent = opt;
          lbl.appendChild(rb); lbl.appendChild(sp);
          opts.appendChild(lbl);
        });
        li.appendChild(opts);
        listEl.appendChild(li);
      });
    }

    function clearMarks(){
      box.querySelectorAll('label').forEach(function(l){
        l.classList.remove('is-correct','is-wrong');
      });
      scoreEl.classList.remove('is-pass','is-fail');
      scoreEl.textContent = '—';
    }

    function grade(){
      var score = 0;
      QUIZ.forEach(function(item, i){
        var sel = box.querySelector('input[name="q-' + i + '"]:checked');
        var labels = box.querySelectorAll('[data-qi="' + i + '"] label');
        labels.forEach(function(l, j){
          l.classList.remove('is-correct','is-wrong');
          if (j === item.c) l.classList.add('is-correct');
        });
        if (sel) {
          var picked = parseInt(sel.value, 10);
          if (picked === item.c) score++;
          else labels[picked].classList.add('is-wrong');
        }
      });
      var pct = Math.round((score / QUIZ.length) * 100);
      scoreEl.textContent = score + '/' + QUIZ.length;
      scoreEl.classList.toggle('is-pass', pct >= 70);
      scoreEl.classList.toggle('is-fail', pct <  70);
      hintEl.textContent = pct >= 70
        ? '✓ ممتاز — البوابة مفتوحة. انتقل إلى خرائط الطرق.'
        : 'لا بأس — راجع البطاقات وأعد المحاولة.';
      var state = loadProg();
      state.quiz = { score: score, total: QUIZ.length, pct: pct, ts: Date.now() };
      saveProg(state);
    }

    subBtn.addEventListener('click', grade);
    rstBtn.addEventListener('click', function(){
      box.querySelectorAll('input[type="radio"]').forEach(function(r){ r.checked = false; });
      clearMarks();
      hintEl.textContent = 'لم تبدأ بعد';
    });

    render();
    var saved = loadProg().quiz;
    if (saved) {
      scoreEl.textContent = saved.score + '/' + saved.total;
      scoreEl.classList.toggle('is-pass', saved.pct >= 70);
      scoreEl.classList.toggle('is-fail', saved.pct <  70);
      hintEl.textContent = 'آخر نتيجة محفوظة: ' + saved.pct + '%';
    }
  }

  /* ─── Path Decision Tree ─── */
  var PATH_MATRIX = {
    visual:  { id:'FRONTEND',  title:'Frontend Web',
               why:'الميل البصري + رغبتك بالتفاعل = مجال يُكافئ الذوق والتنفيذ السريع.',
               first:'ثبّت VS Code + git، أنشئ مشروع HTML/CSS بسيط (Personal Card)، وادفعه على GitHub.',
               stack:'HTML5 · CSS3 · JS · React · Vite',
               time:'~12 أسبوع للوصول لمستوى Junior' },
    systems: { id:'BACKEND',   title:'Backend Web',
               why:'تستمتع بحلّ الألغاز المنطقية وقواعد البيانات = طبيعة backend تماماً.',
               first:'ثبّت Node.js + PostgreSQL، اكتب REST API صغير (todo) واختبره بـ Postman.',
               stack:'Node.js · Express · PostgreSQL · Prisma · Docker',
               time:'~12 أسبوع للوصول لمستوى Junior' },
    mobile:  { id:'MOBILE',    title:'Mobile (Flutter)',
               why:'الموبايل في العراق نمو حقيقي، وFlutter سيد السوق محلياً.',
               first:'ثبّت Flutter SDK، شغّل counter app على هاتفك، عدّل الألوان والـ widget tree.',
               stack:'Dart · Flutter · Firebase',
               time:'~14 أسبوع — منحنى التعلم أعلى' },
    data:    { id:'DATA',      title:'Data / Analytics',
               why:'هذا مسار خارج نطاق الـ module — لكنّه واعد جداً (Python + SQL + Pandas + ML).',
               first:'ابدأ بكورس Python للمبتدئين، ثم SQL أساسي، ثم Pandas. سنُغطّيه في وحدة مستقلة.',
               stack:'Python · SQL · Pandas · scikit-learn',
               time:'~16 أسبوع — أطول لكن مردود مرتفع' }
  };

  function setupPaths(root){
    var box = root.querySelector('[data-paths-tree]');
    if (!box) return;
    var steps = {
      1: box.querySelector('[data-step="1"]'),
      2: box.querySelector('[data-step="2"]'),
      3: box.querySelector('[data-step="3"]'),
      4: box.querySelector('[data-step="4"]')
    };
    var pillEl  = box.querySelector('[data-result-pill]');
    var titleEl = box.querySelector('[data-result-title]');
    var whyEl   = box.querySelector('[data-result-why]');
    var firstEl = box.querySelector('[data-result-first]');
    var stackEl = box.querySelector('[data-result-stack]');
    var timeEl  = box.querySelector('[data-result-time]');
    var restart = box.querySelector('[data-paths-restart]');

    var pick = { interest: null, hours: null, goal: null };

    function show(step){
      [1,2,3,4].forEach(function(k){
        if (steps[k]) steps[k].hidden = (k !== step) && !(step === 4 && k === 4);
      });
      // keep previous answered steps visible too
      if (step === 4) {
        steps[1].hidden = false; steps[2].hidden = false; steps[3].hidden = false;
      } else {
        for (var k=1;k<=3;k++) steps[k].hidden = (k > step);
      }
    }

    function compute(){
      var base = PATH_MATRIX[pick.interest] || PATH_MATRIX.visual;
      var why  = base.why;
      // hours nudge
      if (pick.hours === 'lt10') why += ' — مع <10 ساعات/أسبوع، توقّع 4-6 أشهر للوصول لـ Junior.';
      if (pick.hours === 'gt20') why += ' — مع 20+ ساعة/أسبوع، يمكن خلال 10-12 أسبوع لو التزمت.';
      // goal nudge
      if (pick.goal === 'remote') why += ' • هدف Remote = ركّز على English + GitHub + portfolio بالإنجليزية.';
      if (pick.goal === 'local')  why += ' • للسوق المحلي، React/Flutter/Node يفتحون أكثر الأبواب.';
      if (pick.goal === 'found')  why += ' • لمشروعك الخاص، اختر stack تستطيع شحنه أسبوعياً (Vite + Supabase مثلاً).';

      pillEl.textContent  = base.id;
      titleEl.textContent = base.title;
      whyEl.textContent   = why;
      firstEl.textContent = base.first;
      stackEl.textContent = base.stack;
      timeEl.textContent  = base.time;

      try {
        localStorage.setItem(LS_PATH, JSON.stringify({ pick: pick, result: base.id, ts: Date.now() }));
      } catch(_){}
    }

    function bindStep(stepEl, attr, key, nextStep){
      var btns = stepEl.querySelectorAll('button[data-' + attr + ']');
      btns.forEach(function(b){
        b.addEventListener('click', function(){
          btns.forEach(function(x){ x.classList.remove('is-picked'); });
          b.classList.add('is-picked');
          pick[key] = b.getAttribute('data-' + attr);
          if (nextStep) {
            steps[nextStep].hidden = false;
            steps[nextStep].scrollIntoView({ behavior:'smooth', block:'center' });
          } else {
            steps[4].hidden = false;
            compute();
            steps[4].scrollIntoView({ behavior:'smooth', block:'center' });
          }
        });
      });
    }

    bindStep(steps[1], 'pick',  'interest', 2);
    bindStep(steps[2], 'hours', 'hours',    3);
    bindStep(steps[3], 'goal',  'goal',     null);

    restart.addEventListener('click', function(){
      pick = { interest:null, hours:null, goal:null };
      box.querySelectorAll('button.is-picked').forEach(function(b){ b.classList.remove('is-picked'); });
      steps[2].hidden = true; steps[3].hidden = true; steps[4].hidden = true;
      steps[1].scrollIntoView({ behavior:'smooth', block:'center' });
      try { localStorage.removeItem(LS_PATH); } catch(_){}
    });

    // Restore previous pick
    try {
      var saved = JSON.parse(localStorage.getItem(LS_PATH));
      if (saved && saved.pick && saved.pick.interest) {
        pick = saved.pick;
        ['interest','hours','goal'].forEach(function(k, idx){
          if (!pick[k]) return;
          var attr = (k === 'interest') ? 'pick' : (k === 'hours' ? 'hours' : 'goal');
          var step = steps[idx + 1];
          var btn  = step.querySelector('button[data-' + attr + '="' + pick[k] + '"]');
          if (btn) btn.classList.add('is-picked');
          if (idx + 2 <= 4) steps[idx + 2].hidden = false;
        });
        if (pick.goal) compute();
      }
    } catch(_){}
  }

  ready(function(){
    var root = document.getElementById('page-programming');
    if (!root) return;
    try { setupFund(root);  } catch(e){ console.warn('W05 fund', e); }
    try { setupQuiz(root);  } catch(e){ console.warn('W05 quiz', e); }
    try { setupPaths(root); } catch(e){ console.warn('W05 paths', e); }
  });
})();



/* ════════════════════════════════════════════════════════════
   WORKER 05 · Phase 2 — Roadmap tabs + checklist progress
   localStorage: upg_progress_prog (extends fundamentals object)
   ════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var LS = 'upg_progress_prog';

  function load(){ try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch(e){ return {}; } }
  function save(o){ try { localStorage.setItem(LS, JSON.stringify(o)); } catch(e){} }

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function setupTabs(root){
    var tabs   = root.querySelectorAll('[data-rm-tab]');
    var panels = root.querySelectorAll('[data-rm-panel]');
    if (!tabs.length) return;
    tabs.forEach(function(t){
      t.addEventListener('click', function(){
        var key = t.getAttribute('data-rm-tab');
        tabs.forEach(function(x){
          var on = x === t;
          x.classList.toggle('is-active', on);
          x.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        panels.forEach(function(p){
          p.classList.toggle('is-active', p.getAttribute('data-rm-panel') === key);
        });
      });
    });
  }

  function setupChecklists(root){
    var checks = root.querySelectorAll('input[type="checkbox"][data-rm-chk]');
    var fePct  = root.querySelector('[data-rm-pct="fe"]');
    var bePct  = root.querySelector('[data-rm-pct="be"]');
    if (!checks.length) return;

    var state = load();
    state.roadmap = state.roadmap || {};

    function refresh(){
      var fe = { done:0, total:0 }, be = { done:0, total:0 };
      checks.forEach(function(c){
        var key  = c.getAttribute('data-rm-chk'); // e.g. "fe:1:1"
        var head = key.split(':')[0];
        if (head !== 'fe' && head !== 'be') return;
        var bucket = (head === 'fe') ? fe : be;
        bucket.total++;
        if (state.roadmap[key]) {
          c.checked = true;
          bucket.done++;
        } else {
          c.checked = false;
        }
      });
      if (fePct) fePct.textContent = fe.total ? Math.round(fe.done/fe.total*100) + '%' : '0%';
      if (bePct) bePct.textContent = be.total ? Math.round(be.done/be.total*100) + '%' : '0%';
    }

    checks.forEach(function(c){
      c.addEventListener('change', function(){
        var key = c.getAttribute('data-rm-chk');
        if (c.checked) state.roadmap[key] = true;
        else delete state.roadmap[key];
        save(state);
        refresh();
      });
    });

    refresh();
  }

  ready(function(){
    var root = document.getElementById('page-programming');
    if (!root) return;
    try { setupTabs(root); } catch(e){ console.warn('W05 tabs', e); }
    try { setupChecklists(root); } catch(e){ console.warn('W05 chk', e); }
  });
})();



/* ════════════════════════════════════════════════════════════
   WORKER 05 · Phase 4 — Five Interactive Labs
   1) Code Trace · 2) Big-O Race · 3) Git Sandbox
   4) Interview Sim · 5) Portfolio Generator
   localStorage: upg_interview_attempts, upg_portfolio_drafts
   ════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ─── Lab tabs ─── */
  function setupLabTabs(root){
    var tabs   = root.querySelectorAll('[data-lab-tab]');
    var labs   = root.querySelectorAll('[data-lab]');
    if (!tabs.length) return;
    tabs.forEach(function(t){
      t.addEventListener('click', function(){
        var key = t.getAttribute('data-lab-tab');
        tabs.forEach(function(x){ x.classList.toggle('is-active', x === t); });
        labs.forEach(function(l){ l.classList.toggle('is-active', l.getAttribute('data-lab') === key); });
      });
    });
  }

  /* ─── 1) Code Trace ─── */
  var TRACES = [
    { name:'sum', code:[
        'let total = 0;',
        'for (let i = 1; i <= 4; i++) {',
        '  total = total + i;',
        '}',
        'return total;'
      ],
      steps:[
        {line:0, vars:{total:0}, out:''},
        {line:1, vars:{total:0,i:1}, out:''},
        {line:2, vars:{total:1,i:1}, out:''},
        {line:1, vars:{total:1,i:2}, out:''},
        {line:2, vars:{total:3,i:2}, out:''},
        {line:1, vars:{total:3,i:3}, out:''},
        {line:2, vars:{total:6,i:3}, out:''},
        {line:1, vars:{total:6,i:4}, out:''},
        {line:2, vars:{total:10,i:4}, out:''},
        {line:4, vars:{total:10}, out:'10'}
      ],
      note:'حلقة بسيطة O(n) — ١ + ٢ + ٣ + ٤ = ١٠'
    },
    { name:'closure', code:[
        'function counter(){',
        '  let n = 0;',
        '  return () => ++n;',
        '}',
        'const c = counter();',
        'c(); c(); c();',
        'return c();'
      ],
      steps:[
        {line:0, vars:{}, out:''},
        {line:4, vars:{c:'fn (closure n=0)'}, out:''},
        {line:5, vars:{c:'fn (closure n=1)'}, out:''},
        {line:5, vars:{c:'fn (closure n=2)'}, out:''},
        {line:5, vars:{c:'fn (closure n=3)'}, out:''},
        {line:6, vars:{c:'fn (closure n=4)'}, out:'4'}
      ],
      note:'الدالة تتذكّر n خاصتها — هذا closure'
    },
    { name:'mapfilter', code:[
        'const xs = [1,2,3,4,5];',
        'const evens = xs.filter(x => x % 2 === 0);',
        'const doubled = evens.map(x => x * 2);',
        'return doubled;'
      ],
      steps:[
        {line:0, vars:{xs:'[1,2,3,4,5]'}, out:''},
        {line:1, vars:{xs:'[1,2,3,4,5]', evens:'[2,4]'}, out:''},
        {line:2, vars:{xs:'[1,2,3,4,5]', evens:'[2,4]', doubled:'[4,8]'}, out:''},
        {line:3, vars:{doubled:'[4,8]'}, out:'[4,8]'}
      ],
      note:'سلسلة filter ثم map — كل خطوة تُنتج array جديد'
    },
    { name:'fact', code:[
        'function fact(n){',
        '  if (n <= 1) return 1;',
        '  return n * fact(n - 1);',
        '}',
        'return fact(4);'
      ],
      steps:[
        {line:4, vars:{n:4}, out:''},
        {line:2, vars:{n:4}, out:''},
        {line:2, vars:{n:3}, out:''},
        {line:2, vars:{n:2}, out:''},
        {line:1, vars:{n:1}, out:'returns 1'},
        {line:2, vars:{ret:'2 * 1 = 2'}, out:''},
        {line:2, vars:{ret:'3 * 2 = 6'}, out:''},
        {line:2, vars:{ret:'4 * 6 = 24'}, out:'24'}
      ],
      note:'recursion: stack ينمو ثم يتحلّل بقيم العودة'
    },
    { name:'async', code:[
        'fetch("/x")',
        '  .then(r => r.json())',
        '  .then(d => console.log(d))',
        '  .catch(e => console.error(e));',
        'console.log("after fetch");'
      ],
      steps:[
        {line:0, vars:{}, out:''},
        {line:4, vars:{}, out:'after fetch'},
        {line:1, vars:{r:'Response'}, out:'after fetch'},
        {line:2, vars:{d:'{...}'}, out:'after fetch\\n{...}'}
      ],
      note:'console.log يُطبع قبل النتيجة لأن fetch async'
    },
    { name:'destruct', code:[
        'const u = {name:"Sara", age:24, city:"Baghdad"};',
        'const {name, ...rest} = u;',
        'const all = [...Object.keys(rest), name];',
        'return all;'
      ],
      steps:[
        {line:0, vars:{u:'{name,age,city}'}, out:''},
        {line:1, vars:{name:'"Sara"', rest:'{age,city}'}, out:''},
        {line:2, vars:{name:'"Sara"', rest:'{age,city}', all:'["age","city","Sara"]'}, out:''},
        {line:3, vars:{all:'["age","city","Sara"]'}, out:'["age","city","Sara"]'}
      ],
      note:'destructuring + spread — أنماط ES6 متكرّرة في كل مشروع'
    },
    { name:'reduce', code:[
        'const votes = ["a","b","a","c","a","b"];',
        'const tally = votes.reduce((acc, v) => {',
        '  acc[v] = (acc[v] || 0) + 1;',
        '  return acc;',
        '}, {});',
        'return tally;'
      ],
      steps:[
        {line:0, vars:{votes:'["a","b","a","c","a","b"]'}, out:''},
        {line:1, vars:{acc:'{}', v:'"a"'}, out:''},
        {line:1, vars:{acc:'{a:1}', v:'"b"'}, out:''},
        {line:1, vars:{acc:'{a:1,b:1}', v:'"a"'}, out:''},
        {line:1, vars:{acc:'{a:2,b:1}', v:'"c"'}, out:''},
        {line:1, vars:{acc:'{a:2,b:1,c:1}', v:'"a"'}, out:''},
        {line:1, vars:{acc:'{a:3,b:1,c:1}', v:'"b"'}, out:''},
        {line:5, vars:{tally:'{a:3,b:2,c:1}'}, out:'{a:3,b:2,c:1}'}
      ],
      note:'reduce لتحويل array إلى shape مختلف — قوي جداً'
    },
    { name:'tryf', code:[
        'function risky(n){',
        '  try {',
        '    if (n < 0) throw new Error("neg");',
        '    return n * 2;',
        '  } catch(e) {',
        '    return -1;',
        '  } finally {',
        '    console.log("done");',
        '  }',
        '}',
        'return risky(-3);'
      ],
      steps:[
        {line:10, vars:{n:-3}, out:''},
        {line:2, vars:{n:-3}, out:''},
        {line:4, vars:{n:-3, e:'Error("neg")'}, out:''},
        {line:5, vars:{ret:-1}, out:''},
        {line:7, vars:{}, out:'done'},
        {line:9, vars:{ret:-1}, out:'done\\n-1'}
      ],
      note:'finally يُنفَّذ دائماً — حتى عند الخطأ أو return'
    }
  ];

  function setupTrace(root){
    var stage = root.querySelector('[data-trace-stage]');
    if (!stage) return;
    var pick = root.querySelector('[data-trace-pick]');
    var codeEl = root.querySelector('[data-trace-code]');
    var varsEl = root.querySelector('[data-trace-vars]');
    var outEl  = root.querySelector('[data-trace-out]');
    var stepEl = root.querySelector('[data-trace-step]');
    var noteEl = root.querySelector('[data-trace-note]');
    var prev   = root.querySelector('[data-trace-prev]');
    var next   = root.querySelector('[data-trace-next]');
    var rstBtn = root.querySelector('[data-trace-reset]');

    var idx = 0, step = 0, current = TRACES[0];

    function renderCode(){
      codeEl.innerHTML = current.code.map(function(line, i){
        return '<span class="line" data-li="' + i + '">' + line.replace(/</g,'&lt;') + '</span>';
      }).join('');
    }
    function renderStep(){
      var s = current.steps[step] || current.steps[current.steps.length - 1];
      codeEl.querySelectorAll('.line').forEach(function(l){
        l.classList.toggle('is-active', parseInt(l.getAttribute('data-li'),10) === s.line);
      });
      varsEl.innerHTML = '';
      Object.keys(s.vars).forEach(function(k){
        var li = document.createElement('li');
        li.innerHTML = '<b>' + k + '</b> = ' + String(s.vars[k]);
        varsEl.appendChild(li);
      });
      outEl.textContent = (s.out || '').replace(/\\n/g,'\n');
      stepEl.textContent = (step + 1) + ' / ' + current.steps.length;
      noteEl.textContent = current.note;
    }
    function load(i){
      idx = i; step = 0; current = TRACES[idx];
      renderCode(); renderStep();
    }
    pick.addEventListener('change', function(){ load(parseInt(pick.value,10)); });
    next.addEventListener('click', function(){
      if (step < current.steps.length - 1) { step++; renderStep(); }
    });
    prev.addEventListener('click', function(){
      if (step > 0) { step--; renderStep(); }
    });
    rstBtn.addEventListener('click', function(){ step = 0; renderStep(); });

    load(0);
  }

  /* ─── 2) Big-O Race ─── */
  function setupBigO(root){
    var canvas = root.querySelector('[data-bigo-canvas]');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var range = root.querySelector('[data-bigo-n]');
    var nval  = root.querySelector('[data-bigo-nval]');

    function draw(n){
      var W = canvas.width, H = canvas.height;
      ctx.fillStyle = 'rgba(2,6,23,0.85)';
      ctx.fillRect(0,0,W,H);
      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      for (var i = 1; i < 8; i++) {
        var y = (H - 30) * (i/8) + 10;
        ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(W-10, y); ctx.stroke();
      }

      // axes
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.beginPath(); ctx.moveTo(50, H-20); ctx.lineTo(W-10, H-20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(50, 10); ctx.lineTo(50, H-20); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.font = '11px ui-monospace, monospace';
      ctx.textAlign = 'right';
      ctx.fillText('cost', 46, 14);
      ctx.textAlign = 'left';
      ctx.fillText('n=' + n, 56, H - 6);

      // funcs
      var fns = [
        { name:'O(1)',     col:'#22C55E', f:function(x){ return 1; } },
        { name:'O(log n)', col:'#06B6D4', f:function(x){ return Math.log2(Math.max(2,x)); } },
        { name:'O(n)',     col:'#F59E0B', f:function(x){ return x; } },
        { name:'O(n²)',    col:'#EF4444', f:function(x){ return x*x; } }
      ];
      // normalize using max value at n
      var maxV = fns[3].f(n);
      var stepX = (W - 70) / n;
      fns.forEach(function(fn){
        ctx.strokeStyle = fn.col;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (var x = 1; x <= n; x++) {
          var v = fn.f(x);
          var px = 50 + x * stepX;
          var py = (H - 20) - (v / maxV) * (H - 30);
          if (py < 8) py = 8;
          if (x === 1) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      });
    }

    function go(){
      var n = parseInt(range.value, 10) || 500;
      nval.textContent = n;
      draw(n);
    }
    range.addEventListener('input', go);
    go();
  }

  /* ─── 3) Git Sandbox (visual) ─── */
  function setupGits(root){
    var svg = root.querySelector('[data-gits-svg]');
    if (!svg) return;
    var headEl   = root.querySelector('[data-gits-head]');
    var brEl     = root.querySelector('[data-gits-branches]');
    var logEl    = root.querySelector('[data-gits-log]');
    var resetBtn = root.querySelector('[data-gits-reset]');
    var btns     = root.querySelectorAll('[data-gits-cmd]');

    var state, history;

    function reset(){
      state = {
        commits: [{ id:'c1', parents:[], lane:0 }],
        branches: { main:'c1' },
        head: 'main'
      };
      history = ['init: c1 on main'];
      render();
    }

    function newId(){
      return 'c' + (state.commits.length + 1);
    }

    function logPush(s){ history.unshift(s); if (history.length > 8) history.pop(); }

    function render(){
      // SVG layout
      var laneCount = Math.max.apply(null, state.commits.map(function(c){ return c.lane; })) + 1;
      var laneGap = 60;
      var startX = 40;
      var rowGap = 80;
      var W = 640, H = 220;
      var nodes = state.commits.map(function(c, i){
        return { c:c, x: startX + i * rowGap, y: 60 + c.lane * laneGap };
      });

      svg.innerHTML = '';
      // edges
      nodes.forEach(function(n){
        n.c.parents.forEach(function(pid){
          var p = nodes.find(function(x){ return x.c.id === pid; });
          if (!p) return;
          var ln = '<line x1="'+p.x+'" y1="'+p.y+'" x2="'+n.x+'" y2="'+n.y+'" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>';
          svg.insertAdjacentHTML('beforeend', ln);
        });
      });
      // nodes
      nodes.forEach(function(n){
        var col = n.c.lane === 0 ? '#06B6D4' : '#F472B6';
        svg.insertAdjacentHTML('beforeend',
          '<circle cx="'+n.x+'" cy="'+n.y+'" r="14" fill="'+col+'" stroke="#fff" stroke-width="2"/>'+
          '<text x="'+n.x+'" y="'+(n.y+4)+'" fill="#fff" font-size="10" font-weight="800" text-anchor="middle" font-family="ui-monospace,monospace">'+n.c.id+'</text>'
        );
      });
      // branch labels
      Object.keys(state.branches).forEach(function(bn){
        var c = state.branches[bn];
        var n = nodes.find(function(x){ return x.c.id === c; });
        if (!n) return;
        var color = bn === 'main' ? '#06B6D4' : '#F472B6';
        svg.insertAdjacentHTML('beforeend',
          '<rect x="'+(n.x-20)+'" y="'+(n.y-38)+'" width="40" height="18" rx="4" fill="'+color+'" />'+
          '<text x="'+n.x+'" y="'+(n.y-24)+'" fill="#fff" font-size="10" font-weight="800" text-anchor="middle">'+bn+'</text>'
        );
      });
      // HEAD pointer
      var headCommit = state.branches[state.head];
      var hn = nodes.find(function(x){ return x.c.id === headCommit; });
      if (hn) {
        svg.insertAdjacentHTML('beforeend',
          '<text x="'+hn.x+'" y="'+(hn.y+34)+'" fill="#FCD34D" font-size="10" font-weight="800" text-anchor="middle">HEAD →</text>'
        );
      }

      headEl.textContent = state.head + ' (' + state.branches[state.head] + ')';
      brEl.textContent = Object.keys(state.branches).join(', ');

      logEl.innerHTML = history.map(function(s){ return '<li>'+s.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</li>'; }).join('');
    }

    var cmds = {
      commit: function(){
        var id = newId();
        var lane = state.head === 'main' ? 0 : 1;
        var parent = state.branches[state.head];
        state.commits.push({ id:id, parents:[parent], lane:lane });
        state.branches[state.head] = id;
        logPush('git commit  →  ' + id + ' on ' + state.head);
      },
      branch: function(){
        if (state.branches.feat) { logPush('feat موجود — تجاهل'); return; }
        state.branches.feat = state.branches[state.head];
        state.head = 'feat';
        logPush('git switch -c feat');
      },
      commitFeat: function(){
        if (state.head !== 'feat') {
          state.head = 'feat';
          if (!state.branches.feat) state.branches.feat = state.branches.main;
        }
        cmds.commit();
      },
      switchMain: function(){
        state.head = 'main';
        logPush('git switch main');
      },
      merge: function(){
        if (!state.branches.feat) { logPush('لا يوجد feat للدمج'); return; }
        if (state.head !== 'main') { logPush('انتقل إلى main أولاً'); return; }
        var id = newId();
        var p1 = state.branches.main, p2 = state.branches.feat;
        state.commits.push({ id:id, parents:[p1, p2], lane:0 });
        state.branches.main = id;
        logPush('git merge feat  →  ' + id + ' (merge commit)');
      },
      undo: function(){
        if (state.commits.length <= 1) { logPush('لا يوجد ما يُتراجَع'); return; }
        var last = state.commits.pop();
        // restore branch to parent
        var parent = last.parents[0];
        Object.keys(state.branches).forEach(function(bn){
          if (state.branches[bn] === last.id) state.branches[bn] = parent;
        });
        logPush('↶ تراجع عن ' + last.id);
      }
    };

    btns.forEach(function(b){
      b.addEventListener('click', function(){
        var key = b.getAttribute('data-gits-cmd');
        if (cmds[key]) { cmds[key](); render(); }
      });
    });
    resetBtn.addEventListener('click', reset);
    reset();
  }

  /* ─── 4) Interview Sim ─── */
  var IV_QUESTIONS = [
    { track:'any', level:'easy', type:'conceptual',
      q:'ما الفرق بين <code>let</code> و <code>const</code> و <code>var</code>؟',
      keys:['scope','block','let','const','redeclare','hoist','var','function-scope']
    },
    { track:'any', level:'easy', type:'conceptual',
      q:'وضّح ما يحدث عند كتابة <code>===</code> مقابل <code>==</code>.',
      keys:['type','coercion','strict','نوع','تحويل']
    },
    { track:'fe', level:'easy', type:'conceptual',
      q:'متى تستخدم <code>display: flex</code> ومتى <code>display: grid</code>؟',
      keys:['flex','grid','axis','بُعد','صفوف','أعمدة','محور']
    },
    { track:'be', level:'easy', type:'conceptual',
      q:'لماذا لا نُخزّن كلمات السرّ بشكل نصّي صريح في قاعدة البيانات؟',
      keys:['hash','bcrypt','salt','تشفير','اختراق','rainbow']
    },
    { track:'any', level:'med', type:'conceptual',
      q:'اشرح closure مع مثال عملي تستخدمه فعلاً.',
      keys:['scope','تتذكّر','closure','factory','counter','encapsulate','private']
    },
    { track:'any', level:'med', type:'code',
      q:'اكتب دالة <code>debounce(fn, ms)</code>.',
      keys:['setTimeout','clearTimeout','timer','args','this','closure','return']
    },
    { track:'fe', level:'med', type:'conceptual',
      q:'ما هي إعادة العرض (re-render) في React ومتى تحدث؟',
      keys:['state','props','context','virtual','reconcile','useState','setState','useEffect']
    },
    { track:'be', level:'med', type:'conceptual',
      q:'فرق بين JWT و sessions — متى تختار أيهما؟',
      keys:['stateless','server','cookie','token','expire','revoke','signature','scale']
    },
    { track:'any', level:'med', type:'code',
      q:'اكتب دالة تتحقّق ما إذا كانت سلسلة <em>palindrome</em>.',
      keys:['split','reverse','join','toLowerCase','reduce','two-pointer']
    },
    { track:'any', level:'hard', type:'conceptual',
      q:'وضّح event loop في JavaScript مع microtasks vs tasks.',
      keys:['stack','queue','microtask','macrotask','promise','setTimeout','event loop','render']
    },
    { track:'fe', level:'hard', type:'conceptual',
      q:'كيف تُحسّن أداء قائمة من 5000 عنصر في React؟',
      keys:['virtualize','window','memo','useMemo','key','pagination','useCallback','windowing']
    },
    { track:'be', level:'hard', type:'conceptual',
      q:'تصميم rate limiter بسيط — ما الخوارزميات الممكنة؟',
      keys:['token bucket','leaky','fixed window','sliding','redis','counter','header']
    },
    { track:'any', level:'hard', type:'code',
      q:'اكتب دالة تُجمّع كائنات حسب مفتاح: <code>groupBy(arr, key)</code>.',
      keys:['reduce','accumulator','key','push','return','object']
    },
    { track:'any', level:'hard', type:'conceptual',
      q:'ماذا يعني SOLID؟ اشرح S و D باختصار.',
      keys:['single','responsibility','dependency','inversion','abstraction','interface','open','liskov']
    },
    { track:'any', level:'med', type:'conceptual',
      q:'اشرح الفرق بين Stack و Heap في إدارة الذاكرة.',
      keys:['primitive','reference','heap','stack','garbage','allocation','frame']
    }
  ];

  function setupInterview(root){
    var panel = root.querySelector('[data-iv-track]');
    if (!panel) return;
    var trackSel = root.querySelector('[data-iv-track]');
    var levelSel = root.querySelector('[data-iv-level]');
    var stemEl   = root.querySelector('[data-iv-stem]');
    var tagsEl   = root.querySelector('[data-iv-tags]');
    var numEl    = root.querySelector('[data-iv-num]');
    var ansEl    = root.querySelector('[data-iv-answer]');
    var fbEl     = root.querySelector('[data-iv-feedback]');
    var rptEl    = root.querySelector('[data-iv-report]');
    var sumEl    = root.querySelector('[data-iv-summary]');
    var gradeBtn = root.querySelector('[data-iv-grade]');
    var nextBtn  = root.querySelector('[data-iv-next]');
    var resetBtn = root.querySelector('[data-iv-reset]');

    var pool = [], idx = 0;
    var scores = { knowledge:0, comm:0, solve:0, quality:0 };
    var attempts = 0;

    function buildPool(){
      var t = trackSel.value, l = levelSel.value;
      pool = IV_QUESTIONS.filter(function(q){
        if (t !== 'any' && q.track !== 'any' && q.track !== t) return false;
        if (l !== 'any' && q.level !== l) return false;
        return true;
      });
      // shuffle
      for (var i = pool.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
      }
      pool = pool.slice(0, Math.min(15, pool.length));
    }

    function show(){
      if (!pool.length || idx >= pool.length) {
        renderReport();
        return;
      }
      var q = pool[idx];
      stemEl.innerHTML = q.q;
      tagsEl.textContent = q.type + ' · ' + q.level;
      numEl.textContent = (idx + 1) + ' / ' + pool.length;
      ansEl.value = '';
      fbEl.hidden = true;
      rptEl.hidden = true;
    }

    function grade(){
      if (idx >= pool.length) return;
      var q = pool[idx];
      var ans = (ansEl.value || '').toLowerCase();
      if (ans.length < 5) {
        fbEl.hidden = false;
        fbEl.innerHTML = '<b>إجابة قصيرة جداً</b> — اكتب على الأقل جملة. الكلمات المفتاحية المتوقعة: ' + q.keys.slice(0,4).join(', ');
        return;
      }
      var hits = 0, missed = [];
      q.keys.forEach(function(k){
        if (ans.indexOf(k.toLowerCase()) >= 0) hits++;
        else missed.push(k);
      });
      var ratio = hits / q.keys.length;
      // axes scoring
      scores.knowledge += Math.min(1, ratio + (ans.length > 80 ? 0.1 : 0));
      scores.comm      += Math.min(1, (ans.length > 60 ? 0.6 : 0.3) + (/مثال|example/i.test(ans) ? 0.4 : 0));
      scores.solve     += Math.min(1, (q.type === 'code' && /function|=>|return|const|let/.test(ans) ? 0.8 : 0.4) + (ratio * 0.4));
      scores.quality   += Math.min(1, (/\(|\)|;|return/.test(ans) ? 0.5 : 0.2) + (ratio * 0.5));
      attempts++;

      fbEl.hidden = false;
      var fbParts = [];
      fbParts.push('<b>التقييم:</b> أصبت ' + hits + ' من ' + q.keys.length + ' من الكلمات المفتاحية.');
      if (missed.length) fbParts.push('<span class="miss"><b>كان يمكن ذكر:</b></span> ' + missed.slice(0,4).join(' · '));
      if (q.type === 'code' && !/function|=>/i.test(ans)) fbParts.push('<b>تلميح:</b> الأسئلة من نوع code تحتاج كتابة دالة كاملة.');
      fbEl.innerHTML = fbParts.join('<br>');
    }

    function renderReport(){
      rptEl.hidden = false;
      stemEl.textContent = '— انتهت الجلسة —';
      tagsEl.textContent = '';
      ansEl.value = '';
      fbEl.hidden = true;

      var n = Math.max(1, attempts);
      ['knowledge','comm','solve','quality'].forEach(function(k){
        var pct = Math.round((scores[k] / n) * 100);
        var bar = root.querySelector('[data-iv-ax="' + k + '"]');
        if (bar) bar.style.width = Math.min(100, pct) + '%';
      });
      var avg = Math.round(((scores.knowledge + scores.comm + scores.solve + scores.quality) / 4 / n) * 100);
      var verdict = avg >= 75 ? 'ممتاز — جاهز لمقابلات junior في معظم الشركات.'
                   : avg >= 55 ? 'جيد — استمر في التدريب على code-walkthroughs.'
                   : 'بداية — راجع الأساسيات وأعد المحاولة بعد ٣ أيام.';
      sumEl.innerHTML = '<b>المتوسّط: ' + avg + '%</b> · ' + verdict;

      try {
        var saved = JSON.parse(localStorage.getItem('upg_interview_attempts') || '[]');
        saved.unshift({ ts:Date.now(), avg:avg, scores:scores, n:attempts });
        localStorage.setItem('upg_interview_attempts', JSON.stringify(saved.slice(0, 10)));
      } catch(_){}
    }

    function fullReset(){
      idx = 0; attempts = 0;
      scores = { knowledge:0, comm:0, solve:0, quality:0 };
      buildPool(); show();
    }

    gradeBtn.addEventListener('click', grade);
    nextBtn.addEventListener('click', function(){
      idx++; show();
    });
    resetBtn.addEventListener('click', fullReset);
    trackSel.addEventListener('change', fullReset);
    levelSel.addEventListener('change', fullReset);

    fullReset();
  }

  /* ─── 5) Portfolio Generator ─── */
  var PORT_DB = {
    fe: [
      { title:'Bookmark Manager (PWA)',
        spec:'تطبيق ويب يحفظ الروابط حسب فولدر + tags + بحث فوري + يعمل offline.',
        stack:['React','TypeScript','IndexedDB','Workbox'],
        ms:['Setup Vite + TS','UI: list + form','TODO: tags filter','IndexedDB layer','Service Worker offline','Deploy + share'],
        stretch:'استيراد/تصدير JSON، مزامنة عبر Supabase.'
      },
      { title:'Pomodoro + Habit Tracker',
        spec:'مؤقت 25/5 مع لوحة عادات يومية + تصور تقدّم بـ Calendar Heatmap.',
        stack:['React','Zustand','date-fns'],
        ms:['Timer logic','Settings','Daily streaks','Heatmap chart','Sound + notifications','PWA manifest'],
        stretch:'إحصاءات أسبوعية + سلوك Push notifications.'
      },
      { title:'Recipe Finder',
        spec:'بحث عن وصفات بالاعتماد على Spoonacular API + حفظ المفضّلة محلياً.',
        stack:['React','React Router','Tailwind','Spoonacular'],
        ms:['Setup routes','Search UI','Recipe detail','Favorites localStorage','Skeleton loaders','Deploy'],
        stretch:'تحويل المقادير عربي/إمبريالي + قائمة تسوّق.'
      }
    ],
    be: [
      { title:'URL Shortener API',
        spec:'API ينشئ روابط قصيرة + يتتبّع clicks + rate limit.',
        stack:['Node','Express','PostgreSQL','Redis','Docker'],
        ms:['Schema design','POST /shorten + base62','GET /:slug + metrics','Rate limiter','Tests + Docker','Deploy on Render'],
        stretch:'QR code، dashboard analytics بسيط.'
      },
      { title:'Jobs Queue Service',
        spec:'API تستقبل jobs (email, image-resize) وتنفّذها async مع status.',
        stack:['Node','Express','BullMQ','Redis','Prisma'],
        ms:['Producer endpoint','Worker process','Status endpoint','Retry + DLQ','Auth + tests','Docker compose'],
        stretch:'لوحة إدارة بسيطة + webhooks.'
      },
      { title:'Mini E-commerce API',
        spec:'منتجات + سلة + checkout (موك)، JWT auth، tests، Stripe sandbox.',
        stack:['Node','Express','PostgreSQL','Prisma','Stripe-test'],
        ms:['Auth flow','Products CRUD','Cart logic','Checkout + webhook','Tests ≥70%','Deploy + README'],
        stretch:'العراق: VAT 0% + IQD pricing + Iraqi phone OTP.'
      }
    ],
    full: [
      { title:'Real-time Q&A (Slido-clone)',
        spec:'مستخدمون يطرحون أسئلة على فعالية، يصوّتون، الـ admin يجيب — كل شيء realtime.',
        stack:['Next.js','Supabase Realtime','Tailwind','Tailwind UI'],
        ms:['Supabase schema','Auth + rooms','Question UI','Realtime subscription','Vote sorting','Admin view'],
        stretch:'Moderation + spam filter + export PDF.'
      },
      { title:'Habit Coach Lite',
        spec:'iOS-style PWA لتتبّع العادات + reminders + dashboard أسبوعي.',
        stack:['Next.js','Prisma','PostgreSQL','Cron'],
        ms:['Auth','Habits CRUD','Daily check-in','Streak logic','Email reminders','Charts'],
        stretch:'AI: تذكير ذكي حسب نمط المستخدم.'
      },
      { title:'Iraqi Currency Tracker',
        spec:'يعرض سعر IQD/USD اليومي + رسوم تاريخية + alerts بنسبة تغيير.',
        stack:['Next.js','PostgreSQL','Cron scrapers'],
        ms:['Scraper API','Schedule cron','Public dashboard','Alerts subscription','Telegram bot','Cache layer'],
        stretch:'تحويل بطاقات/أسواق + dashboard للتجار.'
      }
    ]
  };

  function setupPortfolio(root){
    var btn = root.querySelector('[data-port-go]');
    if (!btn) return;
    var trackSel = root.querySelector('[data-port-track]');
    var levelSel = root.querySelector('[data-port-level]');
    var hoursSel = root.querySelector('[data-port-hours]');
    var resEl    = root.querySelector('[data-port-results]');

    function timeFor(level, hours){
      var weeks = level === 'beg' ? 4 : level === 'mid' ? 6 : 8;
      if (hours === 'lt10')  weeks = Math.round(weeks * 1.6);
      if (hours === 'gt20')  weeks = Math.round(weeks * 0.7);
      return weeks;
    }

    function go(){
      var track = trackSel.value;
      var level = levelSel.value;
      var hours = hoursSel.value;
      var weeks = timeFor(level, hours);
      var ideas = (PORT_DB[track] || PORT_DB.fe).slice();

      resEl.innerHTML = '';
      ideas.forEach(function(it){
        var el = document.createElement('article');
        el.className = 'prog-port-card';
        el.innerHTML = '' +
          '<h4>' + it.title + '</h4>' +
          '<p>' + it.spec + '</p>' +
          '<div class="meta">' +
            it.stack.map(function(s){ return '<span>' + s + '</span>'; }).join('') +
            '<span>~' + weeks + ' أسبوع</span>' +
          '</div>' +
          '<ol class="ms">' +
            it.ms.map(function(m){ return '<li>' + m + '</li>'; }).join('') +
          '</ol>' +
          '<div class="stretch"><b>Stretch:</b> ' + it.stretch + '</div>';
        resEl.appendChild(el);
      });

      try {
        localStorage.setItem('upg_portfolio_drafts', JSON.stringify({
          track:track, level:level, hours:hours, ts:Date.now()
        }));
      } catch(_){}
    }

    btn.addEventListener('click', go);

    // restore last
    try {
      var saved = JSON.parse(localStorage.getItem('upg_portfolio_drafts'));
      if (saved) {
        trackSel.value = saved.track || 'fe';
        levelSel.value = saved.level || 'beg';
        hoursSel.value = saved.hours || '10-20';
        go();
      }
    } catch(_){}
  }

  ready(function(){
    var root = document.getElementById('page-programming');
    if (!root) return;
    try { setupLabTabs(root); }   catch(e){ console.warn('W05 lab tabs', e); }
    try { setupTrace(root); }     catch(e){ console.warn('W05 trace', e); }
    try { setupBigO(root); }      catch(e){ console.warn('W05 bigo', e); }
    try { setupGits(root); }      catch(e){ console.warn('W05 gits', e); }
    try { setupInterview(root); } catch(e){ console.warn('W05 iv', e); }
    try { setupPortfolio(root); } catch(e){ console.warn('W05 port', e); }
  });
})();



/* ============================================================
   WORKER 06 · PHASE 1 — Algorithm Anatomy renderer (IIFE)
   Scope: #page-social · platform tabs + panel data
============================================================ */
(function(){
  'use strict';

  var DATA = {
    ig: {
      name:'Instagram', emoji:'📸', color:'#E4405F',
      summary:'محرّك Meta يعتمد على "الإشارات الاجتماعية" — كم شخصاً أرسل المنشور لصديق، حفظه، أو شاهده مرتين.',
      signals:[
        ['Send to friend',   '× 4.0'],
        ['Save',             '× 3.5'],
        ['Comment > 4 words','× 2.8'],
        ['Watch time (Reels)', '× 2.5'],
        ['Like',             '× 1.0'],
      ],
      penalties:[
        ['Watermark TikTok',         '−40% reach'],
        ['Reposted content',         '−25% reach'],
        ['Hashtags > 10 (spammy)',   '−15% reach'],
        ['اختفاء فجأة + رجوع (gap)', '−20% trust'],
      ],
      ideal:[
        ['Reels',         '7-15 ثانية, hook في الإطار 1'],
        ['Carousel',      '8-10 شرائح, سؤال في الشريحة 1'],
        ['Caption',       '125 حرف قبل "more", value في السطر 2'],
        ['Cover',         'وجه واضح + نص ضخم 4-7 كلمات'],
      ]
    },
    tt: {
      name:'TikTok', emoji:'🎵', color:'#FE2C55',
      summary:'Watch-time و completion-rate هما المَلِكان. الـ For You Page تختبر كل فيديو على 200-500 شخص أولاً.',
      signals:[
        ['Completion rate %',  '× 5.0'],
        ['Re-watch / replay',  '× 4.0'],
        ['Share + save',       '× 3.0'],
        ['Comment',            '× 2.0'],
        ['Like',               '× 1.0'],
      ],
      penalties:[
        ['روابط في bio فقط (لا في caption)', 'محايد'],
        ['موسيقى محذوفة (copyright)',         '−60%'],
        ['watermark منصة أخرى',               '−35%'],
        ['Hook ضعيف → pass في &lt;1.5s',        'موت طبيعي'],
      ],
      ideal:[
        ['الطول',     '9-21 ثانية للـ viral, 30-60s للـ tutorial'],
        ['Hook',      'الذروة في الثانية الأولى, نص على الشاشة'],
        ['Caption',   '60-100 حرف + 3 hashtags هدفية'],
        ['Format',    'Vertical 9:16, مضاءة جيداً'],
      ]
    },
    x: {
      name:'X / Twitter', emoji:'𝕏', color:'#1DA1F2',
      summary:'Replies و dwell time أهم من Likes. خوارزمية Musk تُكافئ الـ controversy والـ thread الطويل.',
      signals:[
        ['Replies',         '× 3.5'],
        ['Dwell time',      '× 3.0'],
        ['Retweet + quote', '× 2.5'],
        ['Bookmarks',       '× 2.0'],
        ['Like',            '× 1.0'],
      ],
      penalties:[
        ['روابط خارجية فوراً',  '−40%'],
        ['Bot-like behaviour',   '−70% (shadow ban)'],
        ['Negative keywords',    '−30% (للمعلنين)'],
      ],
      ideal:[
        ['Tweet مفرد',  '&lt; 12 كلمة, hot take أو سؤال صادم'],
        ['Thread',      '5-9 tweets, التمهيد بـ "كنت أعتقد X لكن..."'],
        ['الصورة',      'Meme, مخطط واضح, أو لقطة شاشة'],
        ['الزمن',       'Reply بعد 5-15 دقيقة من النشر'],
      ]
    },
    li: {
      name:'LinkedIn', emoji:'💼', color:'#0A91CC',
      summary:'Algorithm 2024 يُعطي وزناً ضخماً للـ comments والـ dwell time. القصص الشخصية تتفوق على المحتوى الترويجي.',
      signals:[
        ['Comments + replies', '× 4.0'],
        ['Dwell time',         '× 3.5'],
        ['Saves',              '× 3.0'],
        ['Shares',             '× 2.0'],
        ['Reactions',          '× 1.0'],
      ],
      penalties:[
        ['روابط في النص الأصلي',  '−50% (انقلها للتعليق الأول)'],
        ['Hashtags > 5',          '−10%'],
        ['نشر متكرر < 18h',       '−15% للمنشور التالي'],
      ],
      ideal:[
        ['الطول',    '1200-1500 حرف · سطور قصيرة'],
        ['Hook',     'سطر شخصي في البداية: "في 2019 خسرت..."'],
        ['Format',   'سطر فراغ بين كل جملتين = mobile-readable'],
        ['CTA',      'سؤال مفتوح في النهاية = comments'],
      ]
    },
    yt: {
      name:'YouTube', emoji:'▶️', color:'#FF0000',
      summary:'CTR (thumbnail) + AVD (Average View Duration) + session time. الـ algorithm يكره من يأخذ المشاهد ويتركه.',
      signals:[
        ['CTR thumbnail',       '× 5.0'],
        ['AVD %',               '× 4.5'],
        ['Session time',        '× 3.5'],
        ['Comments',            '× 2.5'],
        ['Likes / Dislikes',    '× 1.5'],
      ],
      penalties:[
        ['Clickbait مخالف للمحتوى',  '−40% + dislikes'],
        ['Reused content',           '−demonetization'],
        ['Tag stuffing',             'محايد لكن غير مفيد'],
      ],
      ideal:[
        ['Long-form',  '8-15 دقيقة, intro 30s قوية'],
        ['Shorts',     '&lt; 60 ثانية, hook في 2s'],
        ['Thumbnail',  '3 عناصر بصرية كحد أقصى, نص &lt; 6 كلمات'],
        ['Title',      'سؤال أو رقم: "لماذا..." / "5 طرق..."'],
      ]
    },
    sc: {
      name:'Snapchat', emoji:'👻', color:'#FFFC00',
      summary:'Replies و screenshots و completion rate. جمهور Gen-Z أقل من 25 سنة في الخليج.',
      signals:[
        ['Replies + DMs',    '× 4.0'],
        ['Screenshots',      '× 3.5'],
        ['Completion %',     '× 3.0'],
        ['Story re-views',   '× 2.0'],
      ],
      penalties:[
        ['Static images بلا حركة',     '−reach'],
        ['Story طويلة بدون تنويع',     'drop-off عالي'],
      ],
      ideal:[
        ['Snap واحدة',  '5-10 ثوان, متحركة, نص ديناميكي'],
        ['Story',       '5-8 snaps, متنوعة (نص+فيديو+تصويت)'],
        ['الوقت',       '8-11 PM للـ Gen-Z في الخليج'],
        ['Filter/AR',   'تجريبي = رفع الـ engagement +60%'],
      ]
    },
    th: {
      name:'Threads', emoji:'🧵', color:'#666666',
      summary:'Threads (Meta) — algorithm جديد لكن يُكافئ الـ replies بشدة + يدفع المحتوى الـ conversational.',
      signals:[
        ['Replies',     '× 4.0'],
        ['Reposts',     '× 3.0'],
        ['Likes',       '× 1.5'],
      ],
      penalties:[
        ['روابط خارجية',     '−25%'],
        ['Cross-post من IG',  'محايد لكن لا boost'],
      ],
      ideal:[
        ['Post',        '100-300 حرف conversational'],
        ['أسلوب',       'سؤال صريح أو رأي قابل للنقاش'],
        ['Frequency',   '2-5 posts/day مقبول (لا spam)'],
        ['Format',      'صور أحياناً, لا فيديوهات طويلة'],
      ]
    }
  };

  function row(label, value, bad){
    var cls = bad ? 'w6-pp-row bad' : 'w6-pp-row';
    return '<div class="'+cls+'"><span>'+label+'</span><b>'+value+'</b></div>';
  }

  function card(title, rows, bad){
    var html = '<div class="w6-pp-card"><h4>'+title+'</h4>';
    for (var i=0; i<rows.length; i++){
      html += row(rows[i][0], rows[i][1], bad);
    }
    html += '</div>';
    return html;
  }

  function renderPlatform(key){
    var d = DATA[key]; if (!d) return;
    var panel = document.getElementById('w6PlatformPanel');
    if (!panel) return;
    var head = ''+
      '<div class="ql-glass" style="padding:16px 18px; border-radius:12px; margin-bottom:14px; border-color:'+d.color+'40; background:'+d.color+'08;">'+
        '<div style="display:flex; align-items:center; gap:12px; margin-bottom:6px;">'+
          '<span style="font-size:24px;">'+d.emoji+'</span>'+
          '<h3 style="margin:0; font-size:16px; font-weight:800; color:var(--text);">'+d.name+'</h3>'+
        '</div>'+
        '<div style="font-size:12.5px; color:var(--text-muted); line-height:1.7;">'+d.summary+'</div>'+
      '</div>';
    var body = '<div class="w6-pp-grid">'+
      card('🚀 إشارات الترتيب', d.signals, false)+
      card('⚠️ العقوبات', d.penalties, true)+
      card('🎯 المحتوى المثالي', d.ideal, false)+
    '</div>';
    panel.innerHTML = head + body;
  }

  // Expose globally for inline onclick
  window.w6SelectPlatform = function(key, btn){
    try {
      var tabs = document.querySelectorAll('#w6PlatformTabs .w6-pbtn');
      for (var i=0; i<tabs.length; i++) tabs[i].classList.remove('active');
      if (btn) btn.classList.add('active');
      renderPlatform(key);
    } catch(e){ console.warn('w6SelectPlatform', e); }
  };

  // Init when page-social ever rendered
  function init(){
    var panel = document.getElementById('w6PlatformPanel');
    if (panel && !panel.dataset.w6Init){
      panel.dataset.w6Init = '1';
      renderPlatform('ig');
    }
  }
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
  // Also re-init on navigation (page may not be in DOM at first load timing)
  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="social"]');
    if (t) setTimeout(init, 50);
  });
})();



/* ============================================================
   WORKER 06 · PHASE 2 — Pillars + 15 Frameworks + Calendar Builder
============================================================ */
(function(){
  'use strict';

  /* ──────── 1. Pillar Calculator ──────── */
  var INDUSTRY_MIX = {
    default:    { edu:40, ent:25, ins:15, prom:15, bts:5,  hint:'مزيج متوازن للعلامات العامة. غيّر الصناعة لتعديل دقيق.' },
    b2b:        { edu:55, ent:10, ins:15, prom:15, bts:5,  hint:'B2B / SaaS: التعليم والـ thought leadership أولوية. الترفيه أقل، Behind-the-scenes للـ humanization.' },
    ecom:       { edu:25, ent:25, ins:10, prom:30, bts:10, hint:'تجارة إلكترونية: الـ promotional يصل 30% (UGC + demos + offers). الترفيه يدفع الـ shares.' },
    restaurant: { edu:15, ent:30, ins:10, prom:25, bts:20, hint:'مطاعم: BTS عالي (المطبخ، الطاهي) + ترفيه + عروض. الناس تشتري التجربة قبل الطعام.' },
    education:  { edu:60, ent:10, ins:15, prom:10, bts:5,  hint:'تعليم/كورسات: 60% تعليمي = إثبات الـ authority. ترويجي محدود لكي لا يبدو spammy.' },
    fashion:    { edu:15, ent:20, ins:25, prom:25, bts:15, hint:'أزياء: الإلهام (lookbooks) والترويجي متساويان. BTS من الـ shoots = حقيقية.' },
    tech:       { edu:50, ent:15, ins:10, prom:20, bts:5,  hint:'تكنولوجيا: tutorials + product updates. الترفيه عبر memes تقنية.' },
    health:     { edu:50, ent:10, ins:25, prom:10, bts:5,  hint:'صحة: تعليم وإلهام يبنيان الثقة. الترويج محدود (regulations).' }
  };

  function w6UpdatePillars(key){
    var mix = INDUSTRY_MIX[key] || INDUSTRY_MIX.default;
    Object.keys(mix).forEach(function(k){
      if (k==='hint') return;
      var el = document.querySelector('[data-pillar-pct="'+k+'"]');
      if (el) el.textContent = mix[k] + '%';
    });
    var hint = document.getElementById('w6IndustryHint');
    if (hint) hint.textContent = mix.hint;
  }
  window.w6UpdatePillars = w6UpdatePillars;

  /* ──────── 2. 15 Frameworks Data ──────── */
  var FRAMEWORKS = [
    { id:1,  name:'AIDA', sub:'Attention · Interest · Desire · Action', def:'إطار كلاسيكي من 1898 — جذب الانتباه ثم بناء الاهتمام، تحويله لرغبة، ثم دفعة للفعل.', ex:'هل تخسر 4 ساعات يومياً في reports؟ (A) — معظم المحاسبين كذلك (I) — هذا قالب Excel يختصرها لـ 30 دقيقة (D) — حمّله مجاناً من البايو (A).', when:'منشورات تعليمية + B2B + LinkedIn', fail:'لا يصلح للـ Reels القصيرة — يحتاج مساحة أكبر من 7 ثوان.', color:'#06B6D4' },
    { id:2,  name:'PAS',  sub:'Problem · Agitate · Solution', def:'حدّد مشكلة محددة، ثم ضخّم ألمها، ثم قدّم الحل.', ex:'تابع ما يكتب — لكن ما يبيع. ولا حملة ترفع المبيعات. شهر بعد شهر، نفس الأرقام. الحل: 5 مكونات في كل caption — لا تتجاوز كلمة "نحن".', when:'بيع منتج/خدمة + Direct response', fail:'إذا بالغت في "Agitate" يبدو مزعجاً ويفقد الثقة.', color:'#EF4444' },
    { id:3,  name:'4Ps', sub:'Promise · Picture · Proof · Push', def:'وعد كبير → تخيّل النتيجة → دليل/إثبات → دعوة فعل.', ex:'ضاعِف متابعينك في 60 يوماً (Promise). تخيّل 10 آلاف يقرأون كل منشور (Picture). 47 عميل سبقك حقق هذا (Proof). سجل في الورشة الأحد (Push).', when:'بيع كورس / خدمة عالية القيمة', fail:'لو الـ Proof ضعيف أو مفبرك، تنهار الثقة سريعاً.', color:'#F59E0B' },
    { id:4,  name:'Open Loop', sub:'الفجوة المعرفية', def:'افتح سؤالاً قوياً واترك إجابته للنهاية — يجبر الدماغ على المتابعة.', ex:'في 2021 خسرت 12 ألف دولار بسبب خطأ واحد… سأخبركم بنهاية المنشور ✨ (ثم 3 نصائح ثم الخطأ).', when:'Reels + LinkedIn stories + threads', fail:'لو الإجابة مخيبة بعد كل هذا التشويق، تخسر المتابع للأبد.', color:'#8B5CF6' },
    { id:5,  name:'Listicle Hook', sub:'3 طرق لـ X', def:'القوائم تُنظّم المعرفة + تُسهّل الحفظ + تُعطي توقع واضح.', ex:'7 أخطاء قاتلة يرتكبها المسوّق المبتدئ (الخامس يصدمك).', when:'Carousels + threads + Shorts تعليمية', fail:'لو القائمة سطحية وكلها معروفة = unfollow.', color:'#22C55E' },
    { id:6,  name:'Contrarian', sub:'الرأي الجريء ضد التيار', def:'اضرب رأياً سائداً — يولد نقاش = comments = reach.', ex:'"التسويق بالمحتوى مات" — قلت هذا قبل سنتين والآن أتراجع. هذا ما تغيّر…', when:'X + LinkedIn + خبراء معروفون', fail:'لو رأيك ضد التيار بدون دليل = troll. ولو متطرف = blocks.', color:'#EC4899' },
    { id:7,  name:'Vulnerability', sub:'الاعتراف الصادق', def:'اعترف بضعف/فشل/خوف — يبني تعاطف وثقة عميقة.', ex:'في أول كلاينت لي، طلبت 200$. خاف، تردد، وغادر. علمتني هذه اللحظة 3 دروس…', when:'Personal brand + Founders + LinkedIn', fail:'لو يبدو "performative" أو مُفتعل لجذب التعاطف.', color:'#F97316' },
    { id:8,  name:'Stat Shock', sub:'إحصاء صادم', def:'ابدأ برقم لا يُصدّق + مصدر موثوق = جذب فوري.', ex:'87% من Reels يتركها الناس قبل 3 ثوان (TikTok 2023). إليك ما يفعل الـ 13% المتبقون…', when:'Educational posts + B2B + reports', fail:'إذا الإحصاء قديم/غير موثوق → ينقلب ضدك.', color:'#0EA5E9' },
    { id:9,  name:'POV', sub:'وجهة نظر داخلية', def:'"POV: أنت X" — يضع المتابع داخل القصة بشكل سينمائي.', ex:'POV: أنت مدير حساب جديد، الكلاينت يطلب 5 deliverables بنفس اليوم. هذا ما تفعله…', when:'TikTok + Reels + قصص قصيرة', fail:'تكراره يومياً يفقد التأثير ويصبح memes فقط.', color:'#A855F7' },
    { id:10, name:'Mistake Confession', sub:'اعتراف بخطأ مهني', def:'"كنت أفعل X لـ 3 سنوات حتى اكتشفت Y" — يستغل Negativity Bias.', ex:'كنت أنشر 3 مرات يومياً ظناً أن "أكثر = أفضل". خسرت 30% من متابعيّ. هذا ما تعلمته…', when:'Authority building + tutorials', fail:'لو الخطأ تافه أو مصطنع، يُكشف.', color:'#DC2626' },
    { id:11, name:'Before/After', sub:'التحوّل', def:'حالة قبل + حالة بعد + الجسر بينهما = أقوى format لمحتوى الـ transformation.', ex:'حسابي: قبل 6 أشهر — 800 متابع، 2% engagement. بعد — 24K متابع، 11% engagement. التغيير في 4 خطوات…', when:'تجارة, تجميل, تعليم, لياقة', fail:'بدون "الجسر" (الخطوات الفعلية) = clickbait فارغ.', color:'#10B981' },
    { id:12, name:'Question Hook', sub:'السؤال المفتوح', def:'سؤال مباشر يستحضر تجربة المتابع الشخصية.', ex:'متى آخر مرة فتحت Instagram وأغلقته بعد دقيقة شعورياً بالفراغ؟', when:'Carousels تعليمية + community building', fail:'سؤال generic مثل "هل تعرف؟" = صفر engagement.', color:'#3B82F6' },
    { id:13, name:'Comparison', sub:'X vs Y', def:'مقارنة مباشرة بين خيارين/أداتين/منهجين = clarity + قيمة فورية.', ex:'Meta Ads vs TikTok Ads في 2025: لمن، بأي ميزانية، ومتى لكل منصة. (carousel 8 شرائح)', when:'B2B + reviews + buying guides', fail:'لو غير عادل/مدفوع، يخسر المصداقية.', color:'#14B8A6' },
    { id:14, name:'Cliffhanger', sub:'النهاية المعلّقة', def:'انهِ المنشور بسؤال/تشويق يدفع للجزء التالي.', ex:'…وفي الجزء الـ 2 نتكلم عن الخطأ الأكبر الذي يُدمّر 90% من الحملات. تابعوا.', when:'Threads + series + reels جزء 1 و 2', fail:'لا تكرّره لو لم تُكمل الجزء التالي خلال 48h = خسارة ثقة.', color:'#FBBF24' },
    { id:15, name:'Call-out', sub:'التوجيه المباشر', def:'استهدف فئة محددة من المتابعين بنداء واضح.', ex:'إلى كل freelancer يرفض رفع أسعاره خوفاً من خسارة العملاء — اقرأ هذا حتى النهاية.', when:'Niche audiences + segmentation + community', fail:'لو الـ niche واسع جداً = الكلام الفارغ.', color:'#F472B6' }
  ];

  function renderFrameworks(){
    var grid = document.getElementById('w6FwGrid');
    if (!grid || grid.dataset.w6Init === '1') return;
    grid.dataset.w6Init = '1';
    var html = '';
    FRAMEWORKS.forEach(function(f){
      html += ''+
      '<div class="ql-glass w6-fw-card" style="padding:14px 16px; border-radius:12px; border-color:'+f.color+'40;">'+
        '<div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">'+
          '<div style="width:30px;height:30px;border-radius:8px;background:'+f.color+'18;color:'+f.color+';display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;">'+f.id+'</div>'+
          '<div>'+
            '<div style="font-size:13px; font-weight:800; color:var(--text);">'+f.name+'</div>'+
            '<div style="font-size:10.5px; color:var(--text-faint);">'+f.sub+'</div>'+
          '</div>'+
        '</div>'+
        '<div style="font-size:12px; color:var(--text-muted); line-height:1.65; margin-bottom:8px;">'+f.def+'</div>'+
        '<div style="background:'+f.color+'08; border-right:3px solid '+f.color+'; padding:9px 11px; border-radius:6px; font-size:11.5px; color:var(--text); line-height:1.7; margin-bottom:8px;">'+
          '<b style="color:'+f.color+'; font-size:10px; letter-spacing:0.8px;">مثال عربي:</b><br>'+f.ex+
        '</div>'+
        '<div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:10.5px;">'+
          '<div style="background:rgba(34,197,94,0.06); border:1px solid rgba(34,197,94,0.18); border-radius:6px; padding:7px 9px; color:#22C55E;"><b>✅ يصلح:</b> '+f.when+'</div>'+
          '<div style="background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.18); border-radius:6px; padding:7px 9px; color:#EF4444;"><b>❌ يفشل:</b> '+f.fail+'</div>'+
        '</div>'+
      '</div>';
    });
    grid.innerHTML = html;
  }

  /* ──────── 3. Calendar Builder ──────── */
  var PILL_INFO = {
    edu:  { label:'🎓 تعليمي', color:'#66FCF1', bg:'rgba(102,252,241,0.18)', border:'rgba(102,252,241,0.45)' },
    ent:  { label:'😄 ترفيهي', color:'#F59E0B', bg:'rgba(245,158,11,0.18)',  border:'rgba(245,158,11,0.45)' },
    ins:  { label:'💡 ملهم',  color:'#8B5CF6', bg:'rgba(139,92,246,0.18)',  border:'rgba(139,92,246,0.45)' },
    prom: { label:'💰 ترويجي', color:'#22C55E', bg:'rgba(34,197,94,0.18)',   border:'rgba(34,197,94,0.45)' },
    bts:  { label:'🎬 كواليس', color:'#EC4899', bg:'rgba(236,72,153,0.18)',  border:'rgba(236,72,153,0.45)' }
  };

  var STORAGE_KEY = 'upg_calendar_drafts';

  function loadCal(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return Array(30).fill('');
      var arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length === 30) return arr;
    } catch(e){}
    return Array(30).fill('');
  }
  function saveCal(arr){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch(e){}
  }

  function dayCellHtml(idx, val){
    var info = PILL_INFO[val];
    var bg     = info ? info.bg     : 'rgba(255,255,255,0.02)';
    var border = info ? info.border : 'var(--border)';
    var color  = info ? info.color  : 'var(--text-faint)';
    var label  = info ? info.label  : '<span style="opacity:0.5;">+</span>';
    return ''+
      '<div class="w6-cal-day" data-day="'+idx+'" '+
           'style="min-height:62px; background:'+bg+'; border:1px solid '+border+'; border-radius:8px; padding:6px 8px; cursor:pointer; '+
                  'display:flex; flex-direction:column; justify-content:space-between; transition:transform .15s ease;">'+
        '<div style="font-size:10px; font-weight:800; color:var(--text-faint);">يوم '+(idx+1)+'</div>'+
        '<div style="font-size:11.5px; font-weight:700; color:'+color+';">'+label+'</div>'+
      '</div>';
  }

  function renderCalendar(){
    var grid = document.getElementById('w6CalGrid');
    if (!grid) return;
    var data = loadCal();
    var html = '';
    for (var i=0; i<30; i++) html += dayCellHtml(i, data[i]);
    grid.innerHTML = html;
    // attach listeners
    var cells = grid.querySelectorAll('.w6-cal-day');
    cells.forEach(function(c){
      c.addEventListener('dragover', function(e){ e.preventDefault(); c.style.transform='scale(1.05)'; });
      c.addEventListener('dragleave', function(){ c.style.transform='scale(1)'; });
      c.addEventListener('drop', function(e){
        e.preventDefault();
        c.style.transform='scale(1)';
        var pill = e.dataTransfer.getData('w6/pill');
        if (!pill) return;
        var idx = parseInt(c.dataset.day, 10);
        var arr = loadCal();
        arr[idx] = (pill === 'clear') ? '' : pill;
        saveCal(arr);
        renderCalendar();
        renderStats();
      });
      // click cycles through pillars (mobile-friendly fallback)
      c.addEventListener('click', function(){
        var idx = parseInt(c.dataset.day, 10);
        var arr = loadCal();
        var order = ['', 'edu', 'ent', 'ins', 'prom', 'bts'];
        var cur = order.indexOf(arr[idx] || '');
        arr[idx] = order[(cur+1) % order.length];
        saveCal(arr);
        renderCalendar();
        renderStats();
      });
    });
    renderStats();
  }

  function renderStats(){
    var statsEl = document.getElementById('w6CalStats');
    if (!statsEl) return;
    var arr = loadCal();
    var counts = {edu:0, ent:0, ins:0, prom:0, bts:0, empty:0};
    arr.forEach(function(v){ if (v) counts[v]++; else counts.empty++; });
    var filled = 30 - counts.empty;
    var line = function(k){
      var c = counts[k];
      var pct = filled ? Math.round(c/filled*100) : 0;
      return '<div><b style="color:'+PILL_INFO[k].color+';">'+PILL_INFO[k].label+'</b> · '+c+' ('+pct+'%)</div>';
    };
    statsEl.innerHTML =
      line('edu')+line('ent')+line('ins')+line('prom')+line('bts')+
      '<div style="margin-top:6px; font-size:10.5px; color:var(--text-faint);">📋 مملوء: '+filled+'/30</div>';
  }

  function setupPillsDrag(){
    var pills = document.querySelectorAll('#page-social .w6-cal-pill');
    pills.forEach(function(p){
      if (p.dataset.w6Drag === '1') return;
      p.dataset.w6Drag = '1';
      p.addEventListener('dragstart', function(e){
        e.dataTransfer.setData('w6/pill', p.dataset.pill);
        e.dataTransfer.effectAllowed = 'copy';
        p.style.opacity = '0.6';
      });
      p.addEventListener('dragend', function(){ p.style.opacity = '1'; });
    });
  }

  window.w6CalAuto = function(){
    var pillars = ['edu','ent','ins','prom','bts'];
    // weighted distribution: 12 edu, 8 ent, 5 ins, 4 prom, 1 bts
    var pool = [].concat(
      Array(12).fill('edu'),
      Array(8).fill('ent'),
      Array(5).fill('ins'),
      Array(4).fill('prom'),
      Array(1).fill('bts')
    );
    // shuffle
    for (var i=pool.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp=pool[i]; pool[i]=pool[j]; pool[j]=tmp;
    }
    saveCal(pool);
    renderCalendar();
  };

  window.w6CalReset = function(){
    if (!confirm('هل أنت متأكد من تصفير الجدول؟')) return;
    saveCal(Array(30).fill(''));
    renderCalendar();
  };

  window.w6CalExport = function(){
    var arr = loadCal();
    var data = {
      generated_at: new Date().toISOString(),
      total_days: 30,
      schedule: arr.map(function(v, i){
        return { day: i+1, pillar: v || null, label: v ? PILL_INFO[v].label : null };
      })
    };
    var blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'content-calendar-'+Date.now()+'.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  function init(){
    if (!document.getElementById('w6FwGrid')) return;
    renderFrameworks();
    setupPillsDrag();
    renderCalendar();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="social"]');
    if (t) setTimeout(init, 60);
  });
})();



/* ============================================================
   WORKER 06 · PHASE 3 — Funnel + Performance Math + A/B Tester
============================================================ */
(function(){
  'use strict';

  var BENCHMARKS = {
    cpm:  { good: '< $4', warn: '$4-$10', bad: '> $10' },
    cpc:  { good: '< $0.5', warn: '$0.5-$2', bad: '> $2' },
    ctr:  { good: '> 1.5%', warn: '0.7-1.5%', bad: '< 0.7%' },
    cvr:  { good: '> 3%', warn: '1-3%', bad: '< 1%' },
    roas: { good: '> 3x', warn: '1-3x', bad: '< 1x' },
    cac:  { good: '—', warn: '—', bad: '—' }
  };

  function $id(id){ return document.getElementById(id); }
  function num(id){ var v = parseFloat(($id(id)||{}).value); return isFinite(v) ? v : 0; }

  function fmtMoney(v){ return '$' + (isFinite(v)?v.toFixed(2):'0.00'); }
  function fmtPct(v){ return (isFinite(v)?v.toFixed(2):'0.00') + '%'; }
  function fmtMul(v){ return (isFinite(v)?v.toFixed(2):'0.00') + 'x'; }

  function flagColor(metric, val){
    // returns color code for value vs benchmark
    if (metric === 'cpm'){ return val < 4 ? '#22C55E' : (val < 10 ? '#F59E0B' : '#EF4444'); }
    if (metric === 'cpc'){ return val < 0.5 ? '#22C55E' : (val < 2 ? '#F59E0B' : '#EF4444'); }
    if (metric === 'ctr'){ return val > 1.5 ? '#22C55E' : (val > 0.7 ? '#F59E0B' : '#EF4444'); }
    if (metric === 'cvr'){ return val > 3 ? '#22C55E' : (val > 1 ? '#F59E0B' : '#EF4444'); }
    if (metric === 'roas'){ return val > 3 ? '#22C55E' : (val > 1 ? '#F59E0B' : '#EF4444'); }
    return 'var(--accent)';
  }

  function w6Calc(){
    var spend = num('w6PfSpend');
    var imp   = num('w6PfImp');
    var clk   = num('w6PfClk');
    var cnv   = num('w6PfCnv');
    var rev   = num('w6PfRev');
    var cus   = num('w6PfCus');

    var cpm  = imp ? (spend/imp)*1000 : 0;
    var cpc  = clk ? (spend/clk) : 0;
    var ctr  = imp ? (clk/imp)*100 : 0;
    var cvr  = clk ? (cnv/clk)*100 : 0;
    var roas = spend ? (rev/spend) : 0;
    var cac  = cus ? (spend/cus) : 0;

    var setOut = function(id, val, metric, fmt){
      var el = $id(id);
      if (!el) return;
      el.textContent = fmt(val);
      el.style.color = flagColor(metric, val);
    };
    setOut('w6OutCpm',  cpm,  'cpm',  fmtMoney);
    setOut('w6OutCpc',  cpc,  'cpc',  fmtMoney);
    setOut('w6OutCtr',  ctr,  'ctr',  fmtPct);
    setOut('w6OutCvr',  cvr,  'cvr',  fmtPct);
    setOut('w6OutRoas', roas, 'roas', fmtMul);
    setOut('w6OutCac',  cac,  'cac',  fmtMoney);

    var setBench = function(id, m){
      var el = $id(id); if (!el) return;
      var b = BENCHMARKS[m];
      el.textContent = '🟢 ' + b.good + ' · 🟡 ' + b.warn + ' · 🔴 ' + b.bad;
    };
    setBench('w6BnchCpm','cpm');
    setBench('w6BnchCpc','cpc');
    setBench('w6BnchCtr','ctr');
    setBench('w6BnchCvr','cvr');
    setBench('w6BnchRoas','roas');
    var bn = $id('w6BnchCac');
    if (bn) bn.textContent = 'يعتمد على الصناعة + LTV';
  }

  window.w6Calc = w6Calc;

  window.w6PfSave = function(){
    var keys = ['w6PfSpend','w6PfImp','w6PfClk','w6PfCnv','w6PfRev','w6PfCus'];
    var data = {};
    keys.forEach(function(k){ data[k] = ($id(k)||{}).value; });
    data._t = new Date().toISOString();
    try {
      var arr = JSON.parse(localStorage.getItem('upg_campaigns') || '[]');
      arr.push(data); localStorage.setItem('upg_campaigns', JSON.stringify(arr));
      alert('✅ تم حفظ الحملة. عدد الحملات المحفوظة: ' + arr.length);
    } catch(e){ alert('❌ فشل الحفظ'); }
  };

  window.w6PfLoad = function(){
    try {
      var arr = JSON.parse(localStorage.getItem('upg_campaigns') || '[]');
      if (!arr.length){ alert('لا توجد حملات محفوظة'); return; }
      var last = arr[arr.length-1];
      ['w6PfSpend','w6PfImp','w6PfClk','w6PfCnv','w6PfRev','w6PfCus'].forEach(function(k){
        if ($id(k) && last[k] != null) $id(k).value = last[k];
      });
      w6Calc();
      alert('📂 تم استرجاع آخر حملة (' + (last._t||'بدون تاريخ') + ')');
    } catch(e){ alert('❌ خطأ في القراءة'); }
  };

  window.w6PfClear = function(){
    if (!confirm('حذف كل الحملات المحفوظة؟')) return;
    try { localStorage.removeItem('upg_campaigns'); alert('🗑️ تم المسح'); } catch(e){}
  };

  /* ──────── A/B Test Calculator ──────── */
  // Z-scores
  var Z = { 90: 1.645, 95: 1.96, 99: 2.576 };

  function w6Ab(){
    var p1   = num('w6AbBaseline') / 100; // baseline conv rate
    var lift = num('w6AbLift') / 100;
    var d    = num('w6AbDaily');
    var conf = parseInt(($id('w6AbConf')||{}).value || '95', 10);
    var z    = Z[conf] || 1.96;

    if (p1 <= 0 || p1 >= 1 || lift <= 0 || d <= 0){
      ['w6AbSize','w6AbDays','w6AbTarget','w6AbStatus'].forEach(function(id){
        if ($id(id)) $id(id).textContent = '—';
      });
      return;
    }

    var p2 = p1 * (1 + lift);
    if (p2 >= 0.99) p2 = 0.99;

    // Standard sample size formula (two-proportion z-test):
    // n = ((z * sqrt(2*p_avg*(1-p_avg)) + z_b*sqrt(p1*(1-p1)+p2*(1-p2)))^2) / (p2-p1)^2
    // Simplified to z * z * (p1*(1-p1) + p2*(1-p2)) / (p2-p1)^2 (approx, 80% power assumed)
    var pavg = (p1 + p2) / 2;
    var num1 = Math.pow(z, 2) * 2 * pavg * (1 - pavg);
    var n = Math.ceil(num1 / Math.pow(p2 - p1, 2));

    var days = Math.ceil(n / d);

    var statusEl = $id('w6AbStatus');
    var hintEl   = $id('w6AbHint');
    var sizeEl   = $id('w6AbSize');
    var daysEl   = $id('w6AbDays');
    var tgtEl    = $id('w6AbTarget');
    if (sizeEl) sizeEl.textContent = n.toLocaleString('en-US');
    if (daysEl) daysEl.textContent = days.toLocaleString('en-US');
    if (tgtEl)  tgtEl.textContent  = (p2*100).toFixed(2) + '%';

    if (statusEl){
      if (days <= 14){
        statusEl.textContent = '✅ ممتاز';
        statusEl.style.color = '#22C55E';
        if (hintEl) hintEl.textContent = 'مدة قابلة للتنفيذ';
      } else if (days <= 30){
        statusEl.textContent = '⚠️ مقبول';
        statusEl.style.color = '#F59E0B';
        if (hintEl) hintEl.textContent = 'استعد لشهر اختبار';
      } else {
        statusEl.textContent = '❌ صعب';
        statusEl.style.color = '#EF4444';
        if (hintEl) hintEl.textContent = 'تحتاج زوار أكثر أو lift أعلى';
      }
    }
  }
  window.w6Ab = w6Ab;

  function init(){
    if ($id('w6OutCpm')) w6Calc();
    if ($id('w6AbSize')) w6Ab();
  }
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="social"]');
    if (t) setTimeout(init, 60);
  });
})();



/* ============================================================
   WORKER 06 · PHASE 4 — Influencer Vetting Tool
============================================================ */
(function(){
  'use strict';

  // Healthy ER bands per tier (Instagram industry data)
  var ER_BANDS = {
    nano:  { excellent: 5,   good: 3,   ok: 1.5,  bad: 1   }, // %
    micro: { excellent: 3.5, good: 2,   ok: 1,    bad: 0.5 },
    mid:   { excellent: 2,   good: 1.2, ok: 0.7,  bad: 0.3 },
    macro: { excellent: 1.5, good: 0.8, ok: 0.4,  bad: 0.2 },
    mega:  { excellent: 1,   good: 0.5, ok: 0.25, bad: 0.1 }
  };

  function $id(id){ return document.getElementById(id); }
  function num(id){ var v = parseFloat(($id(id)||{}).value); return isFinite(v) ? v : 0; }

  function flag(color, icon, text){
    var bg = color === 'red' ? 'rgba(239,68,68,0.08)' :
             color === 'amber' ? 'rgba(245,158,11,0.08)' :
             color === 'green' ? 'rgba(34,197,94,0.08)' :
             'rgba(102,252,241,0.08)';
    var border = color === 'red' ? 'rgba(239,68,68,0.3)' :
                 color === 'amber' ? 'rgba(245,158,11,0.3)' :
                 color === 'green' ? 'rgba(34,197,94,0.3)' :
                 'rgba(102,252,241,0.3)';
    var fg = color === 'red' ? '#EF4444' :
             color === 'amber' ? '#F59E0B' :
             color === 'green' ? '#22C55E' :
             '#66FCF1';
    return '<div style="background:'+bg+';border:1px solid '+border+';color:'+fg+';">'+
      '<span style="font-size:14px;">'+icon+'</span><span>'+text+'</span></div>';
  }

  function w6Inf(){
    var fol     = num('w6InfFol');
    var likes   = num('w6InfLikes');
    var coms    = num('w6InfCom');
    var reach   = num('w6InfReach');
    var price   = num('w6InfPrice');
    var tier    = ($id('w6InfTier')||{}).value || 'micro';

    if (fol <= 0){
      ['w6InfER','w6InfCPE','w6InfCR','w6InfVerdict'].forEach(function(id){
        if ($id(id)) $id(id).textContent = '—';
      });
      var fl = $id('w6InfFlags'); if (fl) fl.innerHTML = '';
      return;
    }

    var engagements = likes + coms;
    var er = (engagements / fol) * 100;
    var erReach = reach > 0 ? (engagements / reach) * 100 : null;
    var cpe = engagements > 0 ? (price / engagements) : 0;
    var commentRatio = likes > 0 ? (coms / likes) : 0;

    if ($id('w6InfER'))  $id('w6InfER').textContent  = er.toFixed(2) + '%';
    if ($id('w6InfCPE')) $id('w6InfCPE').textContent = '$' + cpe.toFixed(2);
    if ($id('w6InfCR'))  $id('w6InfCR').textContent  = (commentRatio*100).toFixed(1) + '%';

    var bands = ER_BANDS[tier] || ER_BANDS.micro;
    var verdict, color, note;
    if (er >= bands.excellent){ verdict='💎 ممتاز'; color='#22C55E'; note='تعاون فوري'; }
    else if (er >= bands.good){ verdict='✅ جيد';   color='#22C55E'; note='تعاون موصى به'; }
    else if (er >= bands.ok){   verdict='⚠️ مقبول'; color='#F59E0B'; note='تفاوض على السعر'; }
    else if (er >= bands.bad){  verdict='⚠️ ضعيف'; color='#F59E0B'; note='احذر — راجع المحتوى'; }
    else                        { verdict='❌ سيء'; color='#EF4444'; note='احتمال bots عالي'; }

    if ($id('w6InfVerdict')){
      $id('w6InfVerdict').textContent = verdict;
      $id('w6InfVerdict').style.color = color;
    }
    if ($id('w6InfVerdictNote')) $id('w6InfVerdictNote').textContent = note;

    // Flags
    var flags = '';
    if (er < 1){
      flags += flag('red', '🚨', 'ER &lt; 1% غير طبيعي للحجم — احتمال bots أو followers مشتراة.');
    }
    if (commentRatio < 0.005 && likes > 100){
      flags += flag('amber', '⚠️', 'Comment Ratio &lt; 0.5% — likes كثيرة مقابل comments قليلة، علامة passive followers.');
    }
    if (commentRatio > 0.3){
      flags += flag('green', '🌟', 'Comment Ratio &gt; 30% — جمهور تفاعلي حقيقي.');
    }
    if (cpe > 5){
      flags += flag('amber', '💸', 'Cost per Engagement &gt; $5 — مرتفع. تفاوض أو ابحث عن بديل.');
    }
    if (cpe > 0 && cpe < 0.5){
      flags += flag('green', '💎', 'Cost per Engagement &lt; $0.5 — صفقة ممتازة.');
    }
    if (er > bands.excellent * 1.5 && fol > 100000){
      flags += flag('amber', '🤔', 'ER مرتفع جداً للحجم — تحقق من real likes vs engagement pods.');
    }
    if (reach > 0 && erReach !== null && erReach < er * 0.5){
      flags += flag('red', '📉', 'ER على Reach منخفض جداً مقارنة بالـ Followers — engagement مزيف محتمل.');
    }
    if (!flags){
      flags = flag('green', '✅', 'لا توجد علامات تحذير — المؤثر يبدو طبيعياً للحجم.');
    }
    var fEl = $id('w6InfFlags');
    if (fEl) fEl.innerHTML = flags;
  }
  window.w6Inf = w6Inf;

  function init(){
    if ($id('w6InfFol')) w6Inf();
  }
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="social"]');
    if (t) setTimeout(init, 60);
  });
})();



/* ============================================================
   WORKER 07 · PHASE 1 — Phone Repair (page-phonerepair)
   Scope: #page-phonerepair only. Vanilla JS. IIFE isolated.
============================================================ */
(function(){
  'use strict';

  function $$(sel, root){ return (root||document).querySelectorAll(sel); }

  function bindElecToggles(){
    var btns = $$('#page-phonerepair .pr-card-toggle[data-pr-toggle]');
    btns.forEach(function(btn){
      if (btn.__pr_bound) return; btn.__pr_bound = true;
      btn.addEventListener('click', function(){
        var key = btn.getAttribute('data-pr-toggle');
        var body = document.getElementById('pr-body-' + key);
        if (!body) return;
        var isOpen = !body.hidden;
        body.hidden = isOpen;
        btn.classList.toggle('is-open', !isOpen);
        btn.textContent = isOpen ? 'عرض التفاصيل ▾' : 'إخفاء التفاصيل ▴';
      });
    });
  }

  function init(){
    if (!document.getElementById('page-phonerepair')) return;
    bindElecToggles();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="phonerepair"]');
    if (t) setTimeout(init, 60);
  });
})();



/* ============================================================
   WORKER 07 · PHASE 2 — Mainboard Anatomy interactions
============================================================ */
(function(){
  'use strict';

  var IC_DATA = {
    cpu: {
      title: 'SoC / CPU (Application Processor)',
      what: 'القلب الرئيسي للجهاز — يدير كل شيء (Apple A-Series / Snapdragon / Exynos).',
      symptoms: 'No Boot · Boot Loop · Heating شديد · Black Screen تماماً.',
      fix: 'CPU underfill repair (لو فقد contact مع البورد بسبب الصدمة) — Reflow بحرارة عالية أو Reball. خبرة عالية جداً مطلوبة.'
    },
    pmic: {
      title: 'PMIC — Power Management IC',
      what: 'يولّد كل rails الجهد (1.8V, 1.2V, 3.3V…) من البطارية لباقي ICs.',
      symptoms: 'No Boot · لا حرارة على الـ board · DC PSU يقرأ 0mA حتى مع 4V.',
      fix: 'استبدال PMIC = micro-soldering متقدم. الإجراء: Hot Air 380°C، رفع، تنظيف الـ pads، reball، لصق جديد. أحياناً يكفي reflow.'
    },
    tristar: {
      title: 'Tristar / Charging IC',
      what: 'يدير الشحن + USB negotiation + Lightning communication (iPhone).',
      symptoms: 'لا يشحن · يسحب 0.5A+ على الفور · Apple logo ثم يطفي على الشاحن.',
      fix: 'استبدال Tristar (BGA صغير 36-pin). أحد أكثر الأعطال شيوعاً في iPhone 6/7. سعر القطعة بالعراق: 5k IQD.'
    },
    audio: {
      title: 'Audio IC (Cirrus Logic / NXP)',
      what: 'يعالج كل الصوت — السماعة، الميكروفون، Speakerphone.',
      symptoms: 'iPhone 7: "loop disease" — الصوت يختفي في المكالمات · Recovery loop. الجهاز يقلع لكن مايعطي صوت.',
      fix: 'iPhone 7: jumper wire على trace U3101_RQ_C18 (الحل المعروف) أو إعادة لحام الـ IC.'
    },
    display: {
      title: 'Display IC (Display Driver)',
      what: 'يولّد الجهد العالي (~12V) للـ OLED + يدير touch sensing.',
      symptoms: 'شاشة سوداء بالكامل (مع backlight يعمل) · بقع أفقية · لا touch.',
      fix: 'تغيير الـ chip بدقة عالية — أو استبدال الشاشة كاملة لو ما عندك خبرة.'
    },
    rf: {
      title: 'RF Transceiver (Wi-Fi/BT/Cellular)',
      what: 'يعالج كل الإشارات اللاسلكية.',
      symptoms: 'No Service · Wi-Fi grayed out · ضعف إشارة دائم · "Searching..." مستمر.',
      fix: 'iPhone 7: مشكلة Wi-Fi شائعة — IC على corner اللوحة. حل دائم = استبدال IC + تنظيف pads.'
    },
    nand: {
      title: 'NAND Flash Storage',
      what: 'الذاكرة الدائمة — كل بيانات المستخدم + iOS/Android.',
      symptoms: 'Boot Loop دائم · Error 9/14 على iTunes · فجأة الجهاز ما يقلع.',
      fix: 'NAND replacement = micro-soldering متقدم جداً + Programmer (Pro3000s). يمكن upgrade من 32GB لـ 256GB!'
    },
    batt: {
      title: 'Battery Connector + Fuel Gauge',
      what: 'موصل البطارية + IC يقرأ نسبة الشحن.',
      symptoms: 'البطارية لا تتعرّف · % خاطئ · يطفي فجأة.',
      fix: 'تنظيف الـ connector pins · استبدال الـ FPC لو fault · Reset الـ Fuel Gauge عبر تركيب البطارية بترتيب معين.'
    },
    cam: {
      title: 'Camera Connectors',
      what: 'موصلات flex الكاميرا (Front, Back, Telephoto, Wide).',
      symptoms: 'كاميرا واحدة لا تعمل · شاشة سوداء عند الفتح · "Camera Error".',
      fix: 'فك الـ flex، تنظيف الـ contacts بـ IPA، إعادة تركيب. لو الـ pad lifted = jumper wire.'
    },
    ant: {
      title: 'Antenna Pads',
      what: 'نقاط تلامس مع antenna feeds (للإشارة + Wi-Fi + GPS).',
      symptoms: 'ضعف إشارة بعد تغيير شاشة أو بطارية (نسيت توصيل antenna spring).',
      fix: 'تأكد من spring contacts أنها على الـ pads. لو الـ pad سقط = lift جديد بـ jumper.'
    },
    charge: {
      title: 'Charging IC (Samsung MAX77705 / etc.)',
      what: 'مكافئ Tristar في Samsung — يدير USB-C PD + Wireless Charging.',
      symptoms: 'لا يشحن · شحن بطيء جداً · Wireless Charging لا يعمل.',
      fix: 'استبدال IC على daughter board (أسهل من iPhone Tristar). متوفر في السوق العراقي بسعر 8-15k IQD.'
    }
  };

  function $id(id){ return document.getElementById(id); }

  function bindMainboardTabs(){
    var tabs = document.querySelectorAll('#page-phonerepair .pr-mb-tab');
    tabs.forEach(function(tab){
      if (tab.__pr_bound) return; tab.__pr_bound = true;
      tab.addEventListener('click', function(){
        var which = tab.getAttribute('data-pr-mb');
        tabs.forEach(function(t){ t.classList.toggle('is-active', t === tab); });
        var ip = $id('pr-mb-iphone');
        var sm = $id('pr-mb-samsung');
        if (ip) ip.hidden = (which !== 'iphone');
        if (sm) sm.hidden = (which !== 'samsung');
        clearMbInfo();
      });
    });
  }

  function clearMbInfo(){
    var info = $id('pr-mb-info');
    if (!info) return;
    info.innerHTML = '<p class="pr-mb-info-empty">👆 اضغط على أي IC في الرسم لمعرفة وظيفته + أعراض تلفه + إجراء الإصلاح.</p>';
    document.querySelectorAll('#page-phonerepair .pr-mb-ic.is-selected').forEach(function(g){
      g.classList.remove('is-selected');
    });
  }

  function bindIcClicks(){
    var ics = document.querySelectorAll('#page-phonerepair .pr-mb-ic');
    ics.forEach(function(g){
      if (g.__pr_bound) return; g.__pr_bound = true;
      g.addEventListener('click', function(){
        var key = g.getAttribute('data-pr-ic');
        var info = $id('pr-mb-info');
        var data = IC_DATA[key];
        if (!info || !data) return;

        document.querySelectorAll('#page-phonerepair .pr-mb-ic.is-selected').forEach(function(x){
          x.classList.remove('is-selected');
        });
        g.classList.add('is-selected');

        info.innerHTML =
          '<h4>' + data.title + '</h4>' +
          '<p><b>الوظيفة:</b> ' + data.what + '</p>' +
          '<p class="pr-mb-symptoms"><b>أعراض التلف:</b> ' + data.symptoms + '</p>' +
          '<p><b>الإصلاح:</b> ' + data.fix + '</p>';
      });
    });
  }

  function init(){
    if (!document.getElementById('page-phonerepair')) return;
    bindMainboardTabs();
    bindIcClicks();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="phonerepair"]');
    if (t) setTimeout(init, 80);
  });
})();



/* ============================================================
   WORKER 07 · PHASE 3 — Decision Tree tabs
============================================================ */
(function(){
  'use strict';

  function $id(id){ return document.getElementById(id); }

  function bindTreeTabs(){
    var tabs = document.querySelectorAll('#page-phonerepair .pr-tree-tab');
    tabs.forEach(function(tab){
      if (tab.__pr_bound) return; tab.__pr_bound = true;
      tab.addEventListener('click', function(){
        var which = tab.getAttribute('data-pr-tree');
        tabs.forEach(function(t){ t.classList.toggle('is-active', t === tab); });
        ['noboot','nocharge','water'].forEach(function(k){
          var el = $id('pr-tree-' + k);
          if (el) el.hidden = (k !== which);
        });
      });
    });
  }

  function init(){
    if (!document.getElementById('page-phonerepair')) return;
    bindTreeTabs();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="phonerepair"]');
    if (t) setTimeout(init, 80);
  });
})();



/* ============================================================
   WORKER 07 · PHASE 5 — 6 Labs (Multimeter, Walker, Cost,
                                  Water Damage, PCB ID, Convo)
============================================================ */
(function(){
  'use strict';

  function $id(id){ return document.getElementById(id); }
  function on(el, ev, fn){ if (el) el.addEventListener(ev, fn); }

  /* -- LAB TABS -- */
  function bindLabTabs(){
    var tabs = document.querySelectorAll('#page-phonerepair .pr-lab-tab');
    var keys = ['dmm','walk','cost','water','pcb','convo'];
    tabs.forEach(function(tab){
      if (tab.__pr_bound) return; tab.__pr_bound = true;
      tab.addEventListener('click', function(){
        var which = tab.getAttribute('data-pr-lab');
        tabs.forEach(function(t){ t.classList.toggle('is-active', t === tab); });
        keys.forEach(function(k){
          var el = $id('pr-lab-' + k);
          if (el) el.hidden = (k !== which);
        });
      });
    });
  }

  /* -- LAB 1: Multimeter -- */
  var DMM_DATA = {
    dcv: {
      batt: { val:'3.92 V', ok:true, hint:'طبيعي ✓ — جهد البطارية في وضع جزئي شحن.' },
      pmic: { val:'1.79 V', ok:true, hint:'طبيعي ✓ — rail PMIC المتوقع 1.8V (تسامح ±2%).' },
      vbus: { val:'5.02 V', ok:true, hint:'طبيعي ✓ — VBUS قياسي على USB connector.' },
      gnd: { val:'OL', ok:false, hint:'⚠️ في وضع DCV لا تقرأ continuity. غيّر للـ Continuity Mode.' },
      cap: { val:'0.00 V', ok:true, hint:'طبيعي ✓ — capacitor فاضي بدون تيار.' },
      charge: { val:'0.12 V', ok:true, hint:'inductor طبيعي — drop صغير عند الـ idle.' },
      audio: { val:'0.00 V', ok:false, hint:'⚠️ يجب 1.8V هنا. Audio IC قد يكون تالف.' },
      fuse: { val:'OL', ok:false, hint:'⚠️ Fuse مفتوح في DCV — جرب Continuity للتأكد.' }
    },
    ohm: {
      batt: { val:'2.4 MΩ', ok:false, hint:'لا تقيس Ω على circuit مغذى. أزل البطارية أولاً.' },
      pmic: { val:'-', ok:false, hint:'PMIC فيها rails متعددة — قياس Ω غير دقيق على circuit.' },
      vbus: { val:'1.2 KΩ', ok:true, hint:'مقاومة VBUS-to-GND طبيعية.' },
      gnd: { val:'0.4 Ω', ok:true, hint:'GND نظيف ✓' },
      cap: { val:'OL', ok:true, hint:'capacitor سليم — لا short.' },
      charge: { val:'0.2 Ω', ok:true, hint:'inductor طبيعي ✓' },
      audio: { val:'52 Ω', ok:true, hint:'مقاومة Audio IC OK.' },
      fuse: { val:'0.0 Ω', ok:true, hint:'Fuse سليم ✓' }
    },
    cont: {
      batt: { val:'0 ✓ (beep)', ok:false, hint:'⚠️ short مشتبه! الـ Battery FPC ما يجب يكون short.' },
      pmic: { val:'OL', ok:true, hint:'PMIC غير short ✓' },
      vbus: { val:'OL', ok:true, hint:'VBUS-to-GND غير short ✓' },
      gnd: { val:'0 ✓ (beep)', ok:true, hint:'GND-to-shield متصل ✓' },
      cap: { val:'OL', ok:true, hint:'capacitor سليم ✓' },
      charge: { val:'0 ✓ (beep)', ok:true, hint:'inductor متصل ✓' },
      audio: { val:'OL', ok:true, hint:'Audio IC غير short ✓' },
      fuse: { val:'0 ✓ (beep)', ok:true, hint:'Fuse سليم ومتصل ✓' }
    },
    diode: {
      batt: { val:'0.45 V', ok:true, hint:'Diode drop طبيعي على ESD diode للـ battery.' },
      pmic: { val:'0.52 V', ok:true, hint:'Drop طبيعي على PMIC pin.' },
      vbus: { val:'0.36 V', ok:true, hint:'Schottky diode على VBUS — drop منخفض ✓' },
      gnd: { val:'0.00 V', ok:false, hint:'⚠️ short محتمل — اختبر بالـ Continuity للتأكيد.' },
      cap: { val:'OL', ok:true, hint:'capacitor سليم في diode mode ✓' },
      charge: { val:'0.05 V', ok:true, hint:'inductor طبيعي.' },
      audio: { val:'0.00 V', ok:false, hint:'⚠️ short على Audio IC pin — IC تالف.' },
      fuse: { val:'0.00 V', ok:true, hint:'Fuse مغلق (متصل) — drop=0 طبيعي.' }
    }
  };

  function bindDmmLab(){
    var btn = $id('pr-dmm-measure');
    if (!btn || btn.__pr_bound) return;
    btn.__pr_bound = true;
    btn.addEventListener('click', function(){
      var mode = $id('pr-dmm-mode').value;
      var pt = $id('pr-dmm-point').value;
      var data = DMM_DATA[mode] && DMM_DATA[mode][pt];
      var screen = $id('pr-dmm-screen');
      var hint = $id('pr-dmm-hint');
      if (!data){
        screen.textContent = '--';
        hint.textContent = 'لا توجد قراءة لهذا التركيب.';
        return;
      }
      screen.textContent = data.val;
      screen.style.color = data.ok ? '#66FCF1' : '#EF4444';
      screen.style.textShadow = '0 0 8px ' + (data.ok ? '#66FCF1' : '#EF4444');
      hint.textContent = data.hint;
      try {
        var key = 'upg_pr_lab_scores';
        var s = JSON.parse(localStorage.getItem(key) || '{}');
        s.dmm = (s.dmm||0) + 1;
        localStorage.setItem(key, JSON.stringify(s));
      } catch(e){}
    });
  }

  /* -- LAB 2: Decision Walker -- */
  var WALK_TREE = {
    root: { q:'هل سحب التيار من Battery FPC؟', opts:[
      { t:'0mA', next:'fuse' },
      { t:'سحب فوري 1A+', next:'short' },
      { t:'30-100mA يبدأ ثم 0', next:'pmic' },
      { t:'200-500mA لـ 5 ثواني ثم drop', next:'audio' }
    ]},
    fuse: { q:'PMIC ميتة. هل الـ main fuse مغلق (continuity)؟', opts:[
      { t:'مغلق (متصل)', leaf:'PMIC تالف. استبدل PMIC IC. (micro-soldering متقدم.)' },
      { t:'مفتوح (OL)', leaf:'الـ fuse مكسور — ابدأ باستبداله. لو الجهاز عاد = حالة سهلة.' }
    ]},
    short: { q:'Short circuit. هل الـ short على VBAT أم على rail داخلي؟', opts:[
      { t:'VBAT مباشرة', leaf:'capacitor قرب البطارية مكسور غالباً. Freeze spray + شيلد component المتسبب.' },
      { t:'1.8V أو 1.2V rail', leaf:'PMIC داخلياً short — قد يحتاج استبدال.' }
    ]},
    pmic: { q:'PMIC تبدأ بس ما تكمل. هل الـ rails (1.8V, 1.2V, 0.85V) كلها تطلع؟', opts:[
      { t:'كلها تطلع', leaf:'مشكلة في RAM/CPU underfill — جرب reflow CPU.' },
      { t:'rail واحد ناقص', leaf:'استبدل PMIC IC.' }
    ]},
    audio: { q:'الجهاز يبدأ ثم يطفي. هل ظهر Apple/Samsung logo؟', opts:[
      { t:'لا — black screen', leaf:'CPU underfill أو NAND fault. ابدأ بـ DFU/EDL restore.' },
      { t:'logo ثم black', leaf:'Audio IC على iPhone 7 (المشكلة الأشهر) — jumper U3101 أو استبدال IC.' }
    ]}
  };

  function renderWalk(nodeKey){
    var node = WALK_TREE[nodeKey] || WALK_TREE.root;
    var qEl = $id('pr-walk-q');
    var optsEl = $id('pr-walk-opts');
    if (!qEl || !optsEl) return;
    qEl.textContent = node.q;
    optsEl.innerHTML = '';
    (node.opts || []).forEach(function(opt){
      var b = document.createElement('button');
      b.textContent = opt.t;
      b.addEventListener('click', function(){
        if (opt.leaf){
          qEl.innerHTML = '✅ <b>الخلاصة:</b> ' + opt.leaf;
          optsEl.innerHTML = '';
          try {
            var key = 'upg_pr_lab_scores';
            var s = JSON.parse(localStorage.getItem(key) || '{}');
            s.walk = (s.walk||0) + 1;
            localStorage.setItem(key, JSON.stringify(s));
          } catch(e){}
        } else if (opt.next){
          renderWalk(opt.next);
        }
      });
      optsEl.appendChild(b);
    });
  }

  function bindWalkLab(){
    var reset = $id('pr-walk-reset');
    if (!reset || reset.__pr_bound) return;
    reset.__pr_bound = true;
    reset.addEventListener('click', function(){ renderWalk('root'); });
    renderWalk('root');
  }

  /* -- LAB 3: Cost Estimator -- */
  var COST_DATA = {
    ip11: { name:'iPhone 11', screen:60, screenoem:160, battery:32, charge:22, camera:80, speaker:25, board:50 },
    ip12pro: { name:'iPhone 12 Pro', screen:130, screenoem:240, battery:40, charge:30, camera:240, speaker:30, board:70 },
    ip13: { name:'iPhone 13', screen:140, screenoem:260, battery:45, charge:35, camera:180, speaker:30, board:80 },
    sa52: { name:'Samsung A52', screen:70, screenoem:130, battery:38, charge:18, camera:55, speaker:22, board:50 },
    sa72: { name:'Samsung A72', screen:90, screenoem:160, battery:45, charge:22, camera:65, speaker:25, board:55 },
    sn21: { name:'Samsung Note 21', screen:130, screenoem:230, battery:55, charge:28, camera:90, speaker:30, board:80 },
    rd11: { name:'Redmi Note 11', screen:55, screenoem:95, battery:28, charge:14, camera:38, speaker:18, board:40 },
    rd12: { name:'Redmi Note 12', screen:60, screenoem:105, battery:32, charge:16, camera:42, speaker:20, board:45 }
  };
  var REPAIR_LABEL = {
    screen:'شاشة (aftermarket)', screenoem:'شاشة (OEM)',
    battery:'بطارية', charge:'منفذ شحن', camera:'كاميرا',
    speaker:'سماعة', board:'Logic Board diag'
  };

  function bindCostLab(){
    var calc = $id('pr-cost-calc');
    if (!calc || calc.__pr_bound) return;
    calc.__pr_bound = true;

    var mr = $id('pr-cost-markup');
    var mv = $id('pr-cost-markup-val');
    var lr = $id('pr-cost-labor');
    var lv = $id('pr-cost-labor-val');
    if (mr) mr.addEventListener('input', function(){ mv.textContent = mr.value + '%'; });
    if (lr) lr.addEventListener('input', function(){ lv.textContent = lr.value + '%'; });

    calc.addEventListener('click', function(){
      var dev = COST_DATA[$id('pr-cost-device').value];
      var rep = $id('pr-cost-repair').value;
      var partK = dev[rep];
      var markup = parseInt(mr.value, 10) / 100;
      var labor = parseInt(lr.value, 10) / 100;
      var partWithMarkup = Math.round(partK * (1 + markup));
      var laborCost = Math.round(partK * labor);
      var total = partWithMarkup + laborCost;
      var totalRound = Math.ceil(total / 5) * 5;
      var profit = totalRound - partK;

      var result = $id('pr-cost-result');
      result.innerHTML =
        '<b>الجهاز:</b> ' + dev.name + ' — ' + REPAIR_LABEL[rep] + '<br>' +
        '<b>سعر القطعة (التكلفة):</b> ' + partK + 'k IQD<br>' +
        '<b>+ Markup ' + (markup*100) + '%:</b> ' + partWithMarkup + 'k<br>' +
        '<b>+ Labor ' + (labor*100) + '%:</b> ' + laborCost + 'k<br>' +
        '<b>السعر للزبون (round):</b> <span style="font-size:18px;color:#22C55E;">' + totalRound + 'k IQD</span><br>' +
        '<b>صافي الربح:</b> ~' + profit + 'k IQD';

      try {
        var key = 'upg_pr_estimates';
        var arr = JSON.parse(localStorage.getItem(key) || '[]');
        arr.unshift({ d:dev.name, r:REPAIR_LABEL[rep], price:totalRound, t:Date.now() });
        if (arr.length > 20) arr = arr.slice(0,20);
        localStorage.setItem(key, JSON.stringify(arr));
      } catch(e){}
    });
  }

  /* -- LAB 4: Water Damage Game -- */
  var WD_STEPS = [
    { id:1, t:'1. فك البطارية فوراً', correct:true, ord:1 },
    { id:2, t:'شغّل الجهاز للتأكد', correct:false },
    { id:3, t:'2. فك الجهاز كاملاً', correct:true, ord:2 },
    { id:4, t:'ضع الجهاز في أرز', correct:false },
    { id:5, t:'3. Ultrasonic Cleaner + IPA 99% لـ 5 دقائق', correct:true, ord:3 },
    { id:6, t:'4. فحص بصري عن corrosion', correct:true, ord:4 },
    { id:7, t:'5. كشط الـ corrosion + إعادة تنظيف', correct:true, ord:5 },
    { id:8, t:'6. تجفيف بـ Hot Air منخفض', correct:true, ord:6 },
    { id:9, t:'7. اختبر الجهاز قبل الإغلاق', correct:true, ord:7 },
    { id:10, t:'اشحنه فوراً', correct:false }
  ];

  function shuffle(arr){
    var a = arr.slice();
    for (var i=a.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = a[i]; a[i]=a[j]; a[j]=tmp;
    }
    return a;
  }

  function renderWdPool(){
    var pool = $id('pr-wd-pool');
    var order = $id('pr-wd-order');
    if (!pool || !order) return;
    pool.innerHTML = '';
    order.innerHTML = '';
    var shuffled = shuffle(WD_STEPS);
    shuffled.forEach(function(st){
      var b = document.createElement('button');
      b.className = 'pr-wd-step';
      b.textContent = st.t;
      b.dataset.id = st.id;
      b.addEventListener('click', function(){
        if (b.parentNode === pool){ order.appendChild(b); }
        else { pool.appendChild(b); }
      });
      pool.appendChild(b);
    });
  }

  function bindWdLab(){
    var check = $id('pr-wd-check');
    var reset = $id('pr-wd-reset');
    if (!check || check.__pr_bound) return;
    check.__pr_bound = true;
    if (reset) reset.addEventListener('click', renderWdPool);
    check.addEventListener('click', function(){
      var order = $id('pr-wd-order');
      var result = $id('pr-wd-result');
      var picked = order.querySelectorAll('.pr-wd-step');
      var correctCount = 0;
      var inOrder = true;
      var lastOrd = 0;
      picked.forEach(function(b){
        var st = WD_STEPS.filter(function(s){ return s.id == b.dataset.id; })[0];
        if (st && st.correct){
          correctCount++;
          if (st.ord < lastOrd) inOrder = false;
          lastOrd = st.ord;
          b.classList.add('is-correct'); b.classList.remove('is-wrong');
        } else {
          b.classList.add('is-wrong'); b.classList.remove('is-correct');
        }
      });
      var totalCorrect = WD_STEPS.filter(function(s){return s.correct;}).length;
      var pct = Math.round((correctCount/totalCorrect)*100);
      var msg = '✓ اخترت ' + correctCount + ' من ' + totalCorrect + ' خطوات صحيحة. ';
      msg += inOrder ? 'الترتيب صحيح ✓' : 'الترتيب فيه أخطاء ✗';
      msg += '<br><b>درجة الإنقاذ:</b> ' + pct + '%';
      if (pct >= 85) result.style.background = 'rgba(34,197,94,.10)';
      else if (pct >= 50) result.style.background = 'rgba(245,158,11,.10)';
      else result.style.background = 'rgba(239,68,68,.10)';
      result.innerHTML = msg;
    });
    renderWdPool();
  }

  /* -- LAB 5: PCB Component ID -- */
  var PCB_QUESTIONS = [
    { p:'مكون مستطيل صغير 0402، رقم "104" — ما هو؟', a:'Capacitor 100nF', opts:['Resistor 104Ω','Capacitor 100nF','Inductor 100nH','Diode'] },
    { p:'BGA كبير في وسط اللوحة، 1000+ pin — ما هو؟', a:'CPU/SoC', opts:['CPU/SoC','RAM','NAND Flash','PMIC'] },
    { p:'BGA متوسط بجانب CPU، عادة فوقه — ما هو؟', a:'RAM (PoP)', opts:['RAM (PoP)','PMIC','Audio IC','RF Transceiver'] },
    { p:'IC مع علامة "338S" قرب البطارية — ما هو؟', a:'PMIC', opts:['PMIC','Tristar','Audio IC','RF'] },
    { p:'مكون أسطواني صغير ملفوف، عادة قرب charging — ما هو؟', a:'Inductor', opts:['Capacitor','Inductor','Crystal Oscillator','Fuse'] },
    { p:'IC صغير مع 36-pin قرب Lightning — ما هو؟', a:'Tristar (Charging IC)', opts:['Tristar (Charging IC)','Audio Codec','Touch Controller','Backlight Driver'] },
    { p:'مكوّن زجاجي صغير، 4 pads حوله — ما هو؟', a:'Crystal Oscillator', opts:['Capacitor','Crystal Oscillator','Diode','Resistor Network'] },
    { p:'BGA أصفر اللون، تحته كرات solder — ما هو؟', a:'NAND Flash Storage', opts:['NAND Flash Storage','Wi-Fi Chip','Audio IC','PMIC'] }
  ];

  var pcbState = { idx:0, score:0, total:0 };

  function renderPcbQuestion(){
    var q = PCB_QUESTIONS[pcbState.idx % PCB_QUESTIONS.length];
    var prompt = $id('pr-pcb-prompt');
    var opts = $id('pr-pcb-options');
    var fb = $id('pr-pcb-feedback');
    var sc = $id('pr-pcb-score');
    if (!prompt || !opts) return;
    prompt.textContent = q.p;
    opts.innerHTML = '';
    fb.textContent = '';
    var shuffled = shuffle(q.opts);
    shuffled.forEach(function(o){
      var b = document.createElement('button');
      b.textContent = o;
      b.addEventListener('click', function(){
        pcbState.total++;
        if (o === q.a){
          pcbState.score++;
          b.classList.add('is-correct');
          fb.innerHTML = '<b style="color:#22C55E;">✓ صحيح!</b> ' + q.a;
        } else {
          b.classList.add('is-wrong');
          opts.querySelectorAll('button').forEach(function(x){
            if (x.textContent === q.a) x.classList.add('is-correct');
          });
          fb.innerHTML = '<b style="color:#EF4444;">✗ خطأ.</b> الإجابة الصحيحة: <b>' + q.a + '</b>';
        }
        sc.textContent = 'النقاط: ' + pcbState.score + ' / ' + pcbState.total;
        try {
          var key = 'upg_pr_lab_scores';
          var s = JSON.parse(localStorage.getItem(key) || '{}');
          s.pcb_correct = (s.pcb_correct||0) + (o === q.a ? 1 : 0);
          s.pcb_total = (s.pcb_total||0) + 1;
          localStorage.setItem(key, JSON.stringify(s));
        } catch(e){}
        opts.querySelectorAll('button').forEach(function(x){ x.disabled = true; });
      });
      opts.appendChild(b);
    });
  }

  function bindPcbLab(){
    var nxt = $id('pr-pcb-next');
    if (!nxt || nxt.__pr_bound) return;
    nxt.__pr_bound = true;
    nxt.addEventListener('click', function(){
      pcbState.idx++;
      renderPcbQuestion();
    });
    renderPcbQuestion();
  }

  /* -- LAB 6: Convo Trainer -- */
  var CONVO_FLOW = [
    {
      customer:'الزبون: "اخويا، أنا جبت الجهاز قبل أسبوع، وما تصلح! وأنا دفعت لك! شو القصة؟؟"',
      opts:[
        { t:'"خل أشوف بس... ما أعرف شو صار."', emp:0, trans:0, ret:-10 },
        { t:'"حضرتك آسف على هذي التجربة. خل أفحصه الآن وأشرح لك بالضبط شو حصل."', emp:8, trans:5, ret:8 },
        { t:'"الجهاز كان فيه عطل أكبر من اللي قلتلك بس ما حبيت تسمع."', emp:-5, trans:3, ret:-8 },
        { t:'"ما فيها مشكلة، خل أعطيك جهاز ثاني."', emp:3, trans:-5, ret:0 }
      ]
    },
    {
      customer:'الزبون: "أنت تخسرني وقتي. كم مرة جيت؟"',
      opts:[
        { t:'"حضرتك حق علي. خل أعطيك أولوية وأكمل اليوم."', emp:7, trans:5, ret:8 },
        { t:'"الكل عنده مشكلة، احنا مو الوحيدين."', emp:-8, trans:0, ret:-10 },
        { t:'"خذ هذا التخفيض 20% على إصلاحات قادمة."', emp:3, trans:6, ret:5 },
        { t:'"خلني أشتغل بهدوء وأرجع لك بـ ساعة بنتيجة."', emp:5, trans:7, ret:6 }
      ]
    },
    {
      customer:'الزبون: "هاي القطعة اللي ركبتها مو أصلية! أنا متأكد!"',
      opts:[
        { t:'"بصراحة هذي قطعة aftermarket — اتفقنا عليها. لو تريد OEM السعر يصير 220k."', emp:5, trans:9, ret:6 },
        { t:'"لا أبداً، أصلية 100% Apple."', emp:-5, trans:-10, ret:-8 },
        { t:'"خل أفك الجهاز قدامك ونتأكد سوية."', emp:7, trans:8, ret:7 },
        { t:'"شو دليلك؟ احنا مو غشاشين."', emp:-7, trans:-3, ret:-9 }
      ]
    },
    {
      customer:'الزبون: "خلاص ما بدي إصلاح، رجع لي فلوسي!"',
      opts:[
        { t:'"تمام. خل أرجع لك فلوسك كاملة، وآسف على التجربة."', emp:6, trans:8, ret:4 },
        { t:'"ما يصير، الفلوس راحت على القطعة."', emp:-6, trans:0, ret:-8 },
        { t:'"حضرتك، خل أعطيك خيارين: refund كامل، أو مصلح ثاني نشتغل عليه. شو تختار؟"', emp:8, trans:7, ret:8 },
        { t:'"خذ بضاعة بـ نفس القيمة من المحل."', emp:3, trans:5, ret:5 }
      ]
    },
    {
      customer:'الزبون: "شكراً، شو رأيك أنشر تجربتي على Instagram؟"',
      opts:[
        { t:'"نعم لو حابب، بس خذ صور قبل/بعد منا."', emp:5, trans:5, ret:7 },
        { t:'"إذا تكتب reviewإيجابي خل أعطيك خصم على إصلاح آخر."', emp:6, trans:4, ret:8 },
        { t:'"لا، الـ posting يضرني."', emp:-3, trans:-5, ret:-3 },
        { t:'"أكيد. شارك تجربتك بصدق سواء كانت إيجابية أو سلبية. الناس بحاجة لشفافية."', emp:9, trans:10, ret:9 }
      ]
    }
  ];

  var convoState = { turn:0, emp:50, trans:50, ret:50 };

  function renderConvo(){
    var step = CONVO_FLOW[convoState.turn];
    var stage = $id('pr-convo-customer');
    var opts = $id('pr-convo-options');
    var fb = $id('pr-convo-feedback');
    var meters = $id('pr-convo-meters');
    if (!step){
      // Final
      stage.innerHTML = '<b>انتهى الحوار.</b><br>التقييم النهائي:<br>التعاطف: ' + convoState.emp +
        '% · الشفافية: ' + convoState.trans + '% · الاحتفاظ: ' + convoState.ret + '%<br>' +
        (convoState.ret > 70 ? '🏆 ممتاز — احتفظت بالعميل + بنيت ثقة.' :
         convoState.ret > 40 ? '⚠️ جيد، بس فيه فرص تحسين في التواصل.' :
         '❌ خسرت العميل غالباً — راجع ردودك.');
      opts.innerHTML = '';
      fb.textContent = '';
      meters.hidden = false;
      $id('pr-meter-emp').style.width = convoState.emp + '%';
      $id('pr-meter-trans').style.width = convoState.trans + '%';
      $id('pr-meter-ret').style.width = convoState.ret + '%';
      return;
    }
    stage.textContent = step.customer;
    opts.innerHTML = '';
    fb.textContent = '';
    meters.hidden = false;
    $id('pr-meter-emp').style.width = convoState.emp + '%';
    $id('pr-meter-trans').style.width = convoState.trans + '%';
    $id('pr-meter-ret').style.width = convoState.ret + '%';

    step.opts.forEach(function(opt){
      var b = document.createElement('button');
      b.textContent = opt.t;
      b.addEventListener('click', function(){
        convoState.emp = Math.max(0, Math.min(100, convoState.emp + opt.emp));
        convoState.trans = Math.max(0, Math.min(100, convoState.trans + opt.trans));
        convoState.ret = Math.max(0, Math.min(100, convoState.ret + opt.ret));
        var sign = function(n){ return (n>=0?'+':'') + n; };
        fb.innerHTML = '<b>التأثير:</b> تعاطف ' + sign(opt.emp) + ' · شفافية ' + sign(opt.trans) + ' · احتفاظ ' + sign(opt.ret);
        try {
          var key = 'upg_pr_lab_scores';
          var s = JSON.parse(localStorage.getItem(key) || '{}');
          s.convo_turns = (s.convo_turns||0) + 1;
          localStorage.setItem(key, JSON.stringify(s));
        } catch(e){}
        setTimeout(function(){
          convoState.turn++;
          renderConvo();
        }, 900);
      });
      opts.appendChild(b);
    });
  }

  function bindConvoLab(){
    var reset = $id('pr-convo-reset');
    if (!reset || reset.__pr_bound) return;
    reset.__pr_bound = true;
    reset.addEventListener('click', function(){
      convoState = { turn:0, emp:50, trans:50, ret:50 };
      renderConvo();
    });
    renderConvo();
  }

  /* INIT */
  function init(){
    if (!document.getElementById('page-phonerepair')) return;
    bindLabTabs();
    bindDmmLab();
    bindWalkLab();
    bindCostLab();
    bindWdLab();
    bindPcbLab();
    bindConvoLab();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="phonerepair"]');
    if (t) setTimeout(init, 80);
  });
})();



/* ===========================================================
   WORKER 08 — HR MASTERY (Phase 1)
   Scope: #page-hrmastery only. IIFE-isolated.
   localStorage: upg_progress_hr (created in later phases)
   =========================================================== */
(function(){
  'use strict';

  function bindAccordion(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var heads = page.querySelectorAll('[data-hrm-toggle]');
    heads.forEach(function(h){
      if (h.__hrmBound) return;
      h.__hrmBound = true;
      h.addEventListener('click', function(){
        var item = h.closest('.hrm-q-item');
        if (!item) return;
        item.classList.toggle('open');
      });
    });
  }

  function animateDimBars(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var fills = page.querySelectorAll('.hrm-dim-bar-fill');
    fills.forEach(function(f){
      var w = f.style.width;
      f.style.width = '0%';
      setTimeout(function(){ f.style.width = w; }, 60);
    });
  }

  function init(){
    if (!document.getElementById('page-hrmastery')) return;
    bindAccordion();
    animateDimBars();
    bindTrapTabs();
    bindCalculator();
    bindScenarios();
    bindDecoder();
    bindMock();
    bindCompare();
  }

  function bindTrapTabs(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var tabs = page.querySelectorAll('.hrm-trap-tab');
    if (!tabs.length) return;
    tabs.forEach(function(t){
      if (t.__hrmBound) return;
      t.__hrmBound = true;
      t.addEventListener('click', function(){
        var key = t.getAttribute('data-trap-tab');
        page.querySelectorAll('.hrm-trap-tab').forEach(function(x){ x.classList.remove('active'); });
        t.classList.add('active');
        page.querySelectorAll('.hrm-trap-list').forEach(function(p){
          if (p.getAttribute('data-trap-pane') === key){
            p.setAttribute('data-active','1');
          } else {
            p.removeAttribute('data-active');
          }
        });
      });
    });
  }

  /* =========================
     SALARY CALCULATOR IQ
     Reference data + dynamic plan generator
     localStorage: upg_salary_drafts (saved scenarios)
     ========================= */
  var SALARY_BASE = {
    sales_jr:    { p25:600000,    median:850000,    p75:1400000,   label:'Sales Junior' },
    account_mgr: { p25:1500000,   median:2200000,   p75:3500000,   label:'Account Manager' },
    cc_agent:    { p25:500000,    median:700000,    p75:1100000,   label:'Call Center Agent' },
    cc_lead:     { p25:900000,    median:1300000,   p75:1900000,   label:'Call Center Team Lead' },
    prog_jr:     { p25:700000,    median:1100000,   p75:1800000,   label:'Junior Programmer' },
    prog_mid:    { p25:1500000,   median:2200000,   p75:3500000,   label:'Mid Programmer' },
    prog_sr:     { p25:3000000,   median:4500000,   p75:7000000,   label:'Senior Programmer' },
    acct_jr:     { p25:600000,    median:850000,    p75:1300000,   label:'Junior Accountant' },
    acct_sr:     { p25:1200000,   median:1800000,   p75:3000000,   label:'Senior Accountant' },
    cashier:     { p25:450000,    median:600000,    p75:850000,    label:'Cashier' },
    smm:         { p25:600000,    median:1100000,   p75:2000000,   label:'Social Media Manager' },
    mkt_mgr:     { p25:2000000,   median:3200000,   p75:5000000,   label:'Marketing Manager' },
    phone_tech:  { p25:700000,    median:1300000,   p75:3000000,   label:'Phone Tech' },
    hr_spec:     { p25:900000,    median:1400000,   p75:2200000,   label:'HR Specialist' },
    ops_mgr:     { p25:2500000,   median:3800000,   p75:5500000,   label:'Operations Manager' }
  };
  var IQD_PER_USD = 1310; // approximate

  function fmtIQD(n){
    if (n >= 1000000) return (n/1000000).toFixed(2).replace(/\.?0+$/,'') + 'M IQD';
    if (n >= 1000)    return Math.round(n/1000) + 'k IQD';
    return Math.round(n) + ' IQD';
  }
  function fmtUSD(n){
    var v = n / IQD_PER_USD;
    return '~$' + Math.round(v).toLocaleString('en-US');
  }

  function getChipsValue(container){
    if (!container) return [];
    var multi = container.classList.contains('multi');
    var actives = container.querySelectorAll('.hrm-calc-chip.active');
    if (!multi){
      var c = actives[0];
      return c ? { val:c.getAttribute('data-val'), mult: parseFloat(c.getAttribute('data-mult')||'1') } : null;
    }
    var arr = [];
    actives.forEach(function(c){
      arr.push({ val:c.getAttribute('data-val'), label:c.textContent.trim(), mult:parseFloat(c.getAttribute('data-mult')||'0') });
    });
    return arr;
  }

  function bindCalculator(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var calc = page.querySelector('.hrm-calc');
    if (!calc || calc.__hrmBound) return;
    calc.__hrmBound = true;

    // chip toggling
    page.querySelectorAll('.hrm-calc-chips').forEach(function(group){
      var multi = group.classList.contains('multi');
      group.querySelectorAll('.hrm-calc-chip').forEach(function(chip){
        chip.addEventListener('click', function(){
          if (multi){
            chip.classList.toggle('active');
          } else {
            group.querySelectorAll('.hrm-calc-chip').forEach(function(c){ c.classList.remove('active'); });
            chip.classList.add('active');
          }
        });
      });
    });

    // exp slider live label
    var exp = page.querySelector('#hrmCalcExp');
    var expVal = page.querySelector('#hrmCalcExpVal');
    if (exp && expVal){
      exp.addEventListener('input', function(){
        expVal.textContent = exp.value;
      });
    }

    // GO
    var btn = page.querySelector('#hrmCalcGo');
    if (btn){
      btn.addEventListener('click', function(){
        runCalculator();
      });
    }
  }

  function runCalculator(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var roleKey = page.querySelector('#hrmCalcRole').value;
    var exp = parseInt(page.querySelector('#hrmCalcExp').value, 10) || 0;
    var loc = getChipsValue(page.querySelector('#hrmCalcLoc'));
    var corp = getChipsValue(page.querySelector('#hrmCalcCorp'));
    var skills = getChipsValue(page.querySelector('#hrmCalcSkills')) || [];
    var base = SALARY_BASE[roleKey];
    if (!base) return;

    // Experience adjustment: 0->0%, 5->+8%, 10->+18%, 15+->+30%
    var expMult = 1 + Math.min(0.30, exp * 0.022);
    var locMult = loc ? loc.mult : 1.0;
    var corpMult = corp ? corp.mult : 1.0;
    var skillsBoost = skills.reduce(function(s,c){ return s + c.mult; }, 0);
    var totalMult = expMult * locMult * corpMult * (1 + skillsBoost);

    var p25 = Math.round(base.p25 * totalMult / 10000) * 10000;
    var med = Math.round(base.median * totalMult / 10000) * 10000;
    var p75 = Math.round(base.p75 * totalMult / 10000) * 10000;

    // Anchor = 5-10% above P75 (so they negotiate down to your target)
    var anchor = Math.round(p75 * 1.08 / 10000) * 10000;
    // Walk-away = 95% of P25 (only if you have BATNA)
    var walkAway = Math.round(p25 * 0.95 / 10000) * 10000;
    // Target = your real goal = midpoint between median and P75
    var target = Math.round((med + p75) / 2 / 10000) * 10000;

    // Total comp estimate: base + ~25% benefits (insurance + transport + bonus)
    var totalCompMonthly = Math.round(target * 1.25 / 10000) * 10000;
    var annualBase = target * 12;
    var annualTotal = totalCompMonthly * 12 + Math.round(target * 1.5);  // +1.5 month bonus typical

    // Build script
    var script = buildNegotiationScript(base.label, anchor, target, walkAway, skills);

    var html = ''
      + '<div class="hrm-calc-result-head">📊 خطتك التفاوضية الكاملة</div>'

      + '<div class="hrm-calc-bars">'
      +   '<div class="hrm-calc-bar-row">'
      +     '<div class="hrm-calc-bar-label"><span>Walk-away (الحد الأدنى المقبول)</span><b>' + fmtIQD(walkAway) + '</b></div>'
      +     '<div class="hrm-calc-bar"><div class="hrm-calc-bar-fill walk" style="width:' + barW(walkAway, anchor) + '%"></div></div>'
      +   '</div>'
      +   '<div class="hrm-calc-bar-row">'
      +     '<div class="hrm-calc-bar-label"><span>Median السوق</span><b>' + fmtIQD(med) + '</b></div>'
      +     '<div class="hrm-calc-bar"><div class="hrm-calc-bar-fill median" style="width:' + barW(med, anchor) + '%"></div></div>'
      +   '</div>'
      +   '<div class="hrm-calc-bar-row">'
      +     '<div class="hrm-calc-bar-label"><span>Target (هدفك الفعلي)</span><b>' + fmtIQD(target) + '</b></div>'
      +     '<div class="hrm-calc-bar"><div class="hrm-calc-bar-fill target" style="width:' + barW(target, anchor) + '%"></div></div>'
      +   '</div>'
      +   '<div class="hrm-calc-bar-row">'
      +     '<div class="hrm-calc-bar-label"><span>⚓ Anchor (الرقم الذي تطرحه أولاً)</span><b>' + fmtIQD(anchor) + '</b></div>'
      +     '<div class="hrm-calc-bar"><div class="hrm-calc-bar-fill anchor" style="width:100%"></div></div>'
      +   '</div>'
      + '</div>'

      + '<div class="hrm-calc-totals">'
      +   '<div class="hrm-calc-total-card"><div class="hrm-calc-total-label">Total Comp شهري</div><div class="hrm-calc-total-val">' + fmtIQD(totalCompMonthly) + ' <small>' + fmtUSD(totalCompMonthly) + '</small></div></div>'
      +   '<div class="hrm-calc-total-card"><div class="hrm-calc-total-label">Annual Base</div><div class="hrm-calc-total-val">' + fmtIQD(annualBase) + ' <small>' + fmtUSD(annualBase) + '</small></div></div>'
      +   '<div class="hrm-calc-total-card"><div class="hrm-calc-total-label">Annual Total Comp</div><div class="hrm-calc-total-val">' + fmtIQD(annualTotal) + ' <small>' + fmtUSD(annualTotal) + '</small></div></div>'
      +   '<div class="hrm-calc-total-card"><div class="hrm-calc-total-label">معامل التعديل</div><div class="hrm-calc-total-val">×' + totalMult.toFixed(2) + '</div></div>'
      + '</div>'

      + '<div class="hrm-calc-script">'
      +   '<div class="hrm-script-tag">📜 SCRIPT تفاوض جاهز</div>'
      +   script
      + '</div>';

    var out = page.querySelector('#hrmCalcOut');
    if (out) out.innerHTML = html;

    // Save to localStorage as last draft
    try {
      var draft = {
        ts: Date.now(), role:base.label, exp:exp,
        anchor:anchor, target:target, walkAway:walkAway, totalComp:totalCompMonthly
      };
      var arr = JSON.parse(localStorage.getItem('upg_salary_drafts') || '[]');
      arr.unshift(draft); arr = arr.slice(0,10);
      localStorage.setItem('upg_salary_drafts', JSON.stringify(arr));
    } catch(e){}
  }

  function barW(val, ref){
    if (ref <= 0) return 0;
    return Math.max(8, Math.min(100, Math.round((val / ref) * 100)));
  }

  function buildNegotiationScript(role, anchor, target, walkAway, skills){
    var skillsLine = '';
    if (skills && skills.length){
      var labels = skills.map(function(s){ return s.label; }).join('، ');
      skillsLine = 'لديّ مهارات تضيف قيمة محددة: ' + labels + '. ';
    }
    var s = ''
      + '<b>المرحلة 1 — لو سُئلتَ عن الراتب أولاً:</b>\n'
      + '"شكراً، قبل أن أذكر رقماً أحب أن أفهم النطاق المعتمد للدور — هذا يساعدني أعرف لو نحن في نفس الصفحة."\n\n'
      + '<b>المرحلة 2 — لو ضغطوا لرقم:</b>\n'
      + '"بناءً على بحثي للسوق العراقي لأدوار ' + role + ' بمستوى مماثل، النطاق المنطقي بين ' + fmtIQD(target) + ' و ' + fmtIQD(anchor) + '. ' + skillsLine + 'لكني منفتح على نقاش الحزمة الكاملة."\n\n'
      + '<b>المرحلة 3 — لو جاء عرضهم أقل من ' + fmtIQD(target) + ':</b>\n'
      + '(صمت 7 ثوانٍ) ثم: "أُقدّر العرض. بصراحة، توقعت رقماً أقرب لـ ' + fmtIQD(anchor) + '. هل هناك مرونة على base أو على bonus/تأمين/إجازات؟"\n\n'
      + '<b>المرحلة 4 — لو وصلوا لـ ' + fmtIQD(target) + ':</b>\n'
      + '"شكراً، هذا قريب جداً من توقعي. لو نضيف [بدل تدريب 200,000 IQD سنوياً / يوم remote إضافي / مراجعة 6 أشهر] نتفق اليوم."\n\n'
      + '<b>المرحلة 5 — حدّك الأدنى ' + fmtIQD(walkAway) + ':</b>\n'
      + 'أي عرض أقل من هذا = ارفض باحترام. "أُقدّر وقتكم، لكن هذا الرقم لا يعكس قيمة الدور بالنسبة لي. أتمنى لكم النجاح في إيجاد المرشح المناسب."';
    return s;
  }

  /* =========================
     SCENARIOS PLAYER (Lab 2)
     15 negotiation scenarios — Iraqi/Gulf realistic
     ========================= */
  var SCENARIOS = [
    {
      title: '01 · عرضوا أقل من نطاق إعلانهم',
      ctx: 'إعلانهم: "Programmer Mid — 1.8M-3M IQD". في نهاية المقابلة الثالثة قالوا: "بناءً على تقييمنا، عرضنا 1.6M".',
      offer: 'العرض: <b>1,600,000 IQD</b> (أقل من نطاقهم المعلن).',
      options: [
        { lvl:'weak',   text:'"حسناً، أقبل."', out:'<b>النتيجة:</b> قبلت رقماً أقل من نطاقهم المعلن. هم يعلمون أنك ضعيف، وستستلم زيادات شحيحة لسنوات.', lesson:'لا تقبل أقل من نطاق معلن أبداً. النطاق نفسه إعلان قانوني-تجاري.' },
        { lvl:'med',    text:'"ممكن نراجع؟ أتوقع شي أعلى."', out:'<b>النتيجة:</b> طرح فضفاض — قد يرفعوا 100k. أنت كشفت أنك مرن جداً.', lesson:'الطلب الغامض يعطي زيادة غامضة. كن محدداً.' },
        { lvl:'med',    text:'"إعلانكم ذكر 1.8-3M، فأتوقع 2M على الأقل."', out:'<b>النتيجة:</b> ربطته بإعلانهم — جيد. لكن طلبت أدنى نقطة. غالباً يقبلون.', lesson:'الإعلان مرجع قوي، لكن لا تطلب أدناه — اطلب نقطة وسطه.' },
        { lvl:'strong', text:'"إعلانكم 1.8-3M. خبرتي + مشاريعي تضعني فوق المتوسط — 2.4M target مع مراجعة 6 أشهر."', out:'<b>النتيجة:</b> ربط بالإعلان + برهنت قيمتك + هدف محدد + خطة مراجعة. غالباً يصلون 2.2-2.4M.', lesson:'استخدم النطاق المعلن كسقف انطلاق، لا كسقف نهائي.' }
      ]
    },
    {
      title: '02 · "سياستنا ما تسمح بمفاوضة"',
      ctx: 'بعد العرض الأول قال HR: "للأسف هذا العرض نهائي، سياستنا ما تسمح بأي مفاوضة."',
      offer: 'العرض: <b>2.0M IQD</b> + "نهائي".',
      options: [
        { lvl:'weak',   text:'"حسناً، أقبل."', out:'<b>النتيجة:</b> صدّقت "السياسة" بدون اختبار. 95% من "السياسات" لها استثناءات للمرشحين القيمين.', lesson:'"السياسة" غالباً ذريعة. اختبرها بأدب.' },
        { lvl:'med',    text:'"دعوني أفكر يومين."', out:'<b>النتيجة:</b> اشتريت وقتاً، لكن لم تطرح أي طلب. التأخير وحده لا ينتج زيادة.', lesson:'الوقت بدون رسالة = ضعف فقط.' },
        { lvl:'strong', text:'"أتفهم السياسة. لكن لو الأساسي ثابت، هل هناك مرونة في bonus signing، تأمين عائلي، أو يوم إجازة إضافي؟"', out:'<b>النتيجة:</b> قبلت "السياسة" ظاهرياً + فتحت باب bonus/benefits = غالباً يوافقون على بدلات تساوي 10-15%.', lesson:'إذا أُغلق الـ base، افتح الـ benefits.' },
        { lvl:'strong', text:'"شكراً للوضوح. عرض شركة أخرى يطابق هدفي. لو "السياسة" مغلقة، أرى ضرورة الانسحاب باحترام — لكني آمل لو تستطيعون استثناء قائد القسم."', out:'<b>النتيجة:</b> BATNA + احترام + ذكر استثناء قانوني. غالباً يصعّدون للمدير ويرفعون 8-15%.', lesson:'BATNA + احترام = ضغط بدون عداء.' }
      ]
    },
    {
      title: '03 · عرضوا عمولة بدل أساسي محترم',
      ctx: 'دور Sales. عرضوا: "أساسي 500k + 5% عمولة من المبيعات". متوسط مبيعات الفريق 8M/شهر.',
      offer: 'العرض: <b>500k base + 5% commission</b> (~900k متوسطاً).',
      options: [
        { lvl:'weak',   text:'"كم متوقع أن تكون عمولتي؟"', out:'<b>النتيجة:</b> سؤال غامض، إجابة "أكيد بتكسب أكثر". لا التزام رسمي.', lesson:'"المتوقع" ≠ "المضمون". اطلب أرقاماً تاريخية.' },
        { lvl:'med',    text:'"أحتاج base أعلى — 800k على الأقل."', out:'<b>النتيجة:</b> طلب بدون منطق = "ابحث عن مرشح آخر".', lesson:'كل طلب يحتاج مبرراً قابلاً للقياس.' },
        { lvl:'strong', text:'"أعطوني آخر 6 أشهر بيانات Sales الفعلية بدون أسماء، وعدد الـ reps الذين حققوا الـ target. لو متوسط الإجمالي 900k، أحتاج base 700k + same %. مع draw غير قابل للاسترداد لـ 3 أشهر."', out:'<b>النتيجة:</b> طلبت بيانات + رفعت الـ base + draw يحميك أول 3 أشهر = حزمة ذكية.', lesson:'في commission roles: base أعلى + draw أهم من نسبة أعلى.' },
        { lvl:'strong', text:'"الـ commission structure مغرٍ، لكن أبحث عن استقرار. اقترح: 800k base + 4% (بدلاً من 500k + 5%) + bonus أداء ربعي. هذا يحميني ويحفّزني."', out:'<b>النتيجة:</b> قدّمت بنية بديلة كاملة + برهنت تفكير منهجي = ينظرون إليك كقائد محتمل.', lesson:'حين يصعب رفع رقم، أعد تصميم الهيكل كاملاً.' }
      ]
    },
    {
      title: '04 · شركة بسمعة قطع رواتب',
      ctx: 'الراتب جيد (3M)، لكن سمعت من 2 موظفين سابقين أن الشركة قطعت رواتب شهرين العام الماضي.',
      offer: 'العرض: <b>3,000,000 IQD/شهر</b>.',
      options: [
        { lvl:'weak',   text:'تقبل بدون ذكر شيء.', out:'<b>النتيجة:</b> قد تواجه نفس المشكلة بعد 6 أشهر. سلامتك المالية بيد ادعاءات شفهية.', lesson:'السمعة تخبرك المستقبل. لا تتجاهل.' },
        { lvl:'med',    text:'"سمعت أن هناك تأخير رواتب — هل لا يزال؟"', out:'<b>النتيجة:</b> سؤال مباشر، إجابة دفاعية ("ذلك انتهى"). لا ضمان.', lesson:'الكلام لا يحل المشاكل — العقد يحل.' },
        { lvl:'strong', text:'"أُقدّر العرض. أحتاج بنود في العقد: غرامة 0.5% يومياً عن أي تأخير + إنهاء فوري لو تأخر شهر بدون إخطار + الراتب لشهر سابق."', out:'<b>النتيجة:</b> طلبت حماية قانونية بدون اتهام. لو رفضوا = إشارة احمر صارخ. لو وافقوا = حقوقك محفوظة.', lesson:'حول السمعة إلى بنود عقد.' },
        { lvl:'strong', text:'"أحتاج راتب الشهر الأول مقدماً قبل البدء + 1.5x الراتب لأول 3 أشهر مقابل المخاطرة. بعد إثبات الاستقرار، نعود للنطاق العادي."', out:'<b>النتيجة:</b> سعّرت المخاطرة + جذبت احترامهم. لو وافقوا، حماية مالية. لو رفضوا، انسحب.', lesson:'سمعة سيئة = راتب أعلى أو لا اتفاق. لا تتنازل عن الحماية.' }
      ]
    },
    {
      title: '05 · عقد سنة بـ termination clause قاسي',
      ctx: 'العرض جذاب، لكن العقد فيه: "في حال ترك العمل قبل 12 شهر، يدفع الموظف 6 أشهر راتب كتعويض."',
      offer: 'العرض: <b>راتب جيد + بند مغادرة قاسٍ</b>.',
      options: [
        { lvl:'weak',   text:'توقّع لأن العرض جيد.', out:'<b>النتيجة:</b> سجنت نفسك ماليًا. لو الشركة سامة، الفرار يكلّفك 6 أشهر راتب.', lesson:'البند العقابي = عبد بعقد.' },
        { lvl:'med',    text:'"البند طويل، نقدر نخففه؟"', out:'<b>النتيجة:</b> طلب فضفاض. غالباً يخففوه قليلاً (4 أشهر بدل 6).', lesson:'الـ specifics تُنتج specifics.' },
        { lvl:'strong', text:'"أتفهم رغبتكم في الاستقرار. لكن البند يجب أن يكون متوازناً: سأقبل بند 3 أشهر مقابل بند مماثل من جانبكم لو فُصلت بدون سبب."', out:'<b>النتيجة:</b> طلبت تماثلاً قانونياً. لو رفضوا = هم أرادوا تعبيدك. لو وافقوا = عقد عادل.', lesson:'العقد العادل = بنود متماثلة لكلا الطرفين.' },
        { lvl:'strong', text:'"البند العقابي غير قانوني في كثير من الأنظمة. أقترح بدلاً منه: شرط notice 60 يوم من جانبي + 60 يوم من جانبكم. لا غرامات مالية إلا في حالة سرقة معلومات."', out:'<b>النتيجة:</b> رفضت البند جذرياً + طرحت بديلاً مهنياً. غالباً يقبلون.', lesson:'المحامي يدافع. أنت تتفاوض مرة واحدة قبل التوقيع.' }
      ]
    },
    {
      title: '06 · قبلت عرضاً ثم جاء عرض أعلى',
      ctx: 'وافقت شفهياً مع شركة A على 2.5M. بعد يومين جاء عرض رسمي من شركة B بـ 3.2M.',
      offer: 'العرض الجديد: <b>+700k</b> من شركة أفضل.',
      options: [
        { lvl:'weak',   text:'تجاهل B وابقَ مع A.', out:'<b>النتيجة:</b> فوّت 700k/شهر = 8.4M سنوياً. الولاء لشركة لم توقّع معها بعد سذاجة.', lesson:'الولاء يبدأ بالتوقيع.' },
        { lvl:'weak',   text:'اقبل B بدون إخبار A.', out:'<b>النتيجة:</b> A تكتشف، تدمر سمعتك في المجتمع المهني الصغير.', lesson:'الانسحاب يجب أن يكون رسمياً ومحترماً.' },
        { lvl:'med',    text:'اتصل بـ A: "جاء عرض أعلى، أعتذر."', out:'<b>النتيجة:</b> A تشعر بسوء، لكن الانسحاب رسمي. سمعتك متوسطة.', lesson:'الشفافية أفضل من الصمت، لكن تنقصها الفرصة.' },
        { lvl:'strong', text:'اتصل بـ A أولاً: "أتيت لإبلاغكم بأمانة — جاء عرض من شركة C بمبلغ X. هل عندكم مرونة قبل أن أحسم؟ أفضّلكم لكن الفرق كبير."', out:'<b>النتيجة:</b> A قد تحسّن العرض (50% احتمال). لو لم تستطع، الانسحاب أكثر احتراماً. سمعتك تبقى نظيفة.', lesson:'أعطِ الفرصة الأولى لمن قبلتَ منه أولاً — هذا أخلاق.' }
      ]
    },
    {
      title: '07 · "ابدأ غداً"',
      ctx: 'قابلت فريقهم اليوم، أعطوك العرض 5pm، وقالوا: "نحتاجك تبدأ غداً 8am — احتجنا شخصاً عاجلاً."',
      offer: 'العرض: <b>راتب مقبول + ضغط زمني شديد</b>.',
      options: [
        { lvl:'weak',   text:'"حسناً!" وتترك شركتك بدون إشعار.', out:'<b>النتيجة:</b> دمّرت سمعتك مع شركة سابقة + تركت زملاء في ورطة. الشركة الجديدة ترى أنك تترك بسهولة.', lesson:'الفوضى في البداية = فوضى دائمة.' },
        { lvl:'med',    text:'"أعطوني أسبوع."', out:'<b>النتيجة:</b> طلب فضفاض، قد يقبلون لكن بدون احترام كامل.', lesson:'لا تتنازل عن إشعار 30 يوم.' },
        { lvl:'strong', text:'"أُقدّر الإلحاح، لكن قانون العمل العراقي + احترامي لشركتي الحالية يتطلب إشعار 30 يوم. أستطيع البدء أسبوع 5 + dedicate ساعتين أسبوعياً للـ planning بدءاً من الآن."', out:'<b>النتيجة:</b> دفاع قانوني + احترام لشركة سابقة + حلّ وسط (early planning). يقبلون 90% من الوقت.', lesson:'احترام الشركة السابقة = احترام نفسك.' },
        { lvl:'strong', text:'"الإلحاح يقلقني — هل هناك سبب لرحيل الشخص السابق؟ + أحتاج 30 يوم تنازل احترامي. لو الإلحاح حقيقي، أستطيع المساعدة بـ async من الآن مقابل bonus signing 1M."', out:'<b>النتيجة:</b> ذكي — ربطت الضغط بـ bonus + استفسرت عن الخلفية. ينكشف لك إن كان فخاً.', lesson:'الإلحاح إشارة. حلّلها قبل أن تستجيب.' }
      ]
    },
    {
      title: '08 · عرضوا بالدولار vs الدينار',
      ctx: 'شركة دولية تعرض: "$1500/شهر بسعر الصرف الرسمي" (1310 IQD/$). سعر السوق 1450.',
      offer: 'العرض: <b>$1,500 (= 1.965M بالرسمي، 2.175M بالسوق)</b>.',
      options: [
        { lvl:'weak',   text:'"موافق."', out:'<b>النتيجة:</b> فقدت 210k/شهر بسبب فرق سعر الصرف = 2.5M سنوياً.', lesson:'سعر الصرف فخ شائع. لا تتجاهله.' },
        { lvl:'med',    text:'"بأي سعر صرف؟"', out:'<b>النتيجة:</b> سؤال جيد، لكن لم تطرح حلاً.', lesson:'السؤال الجيد بدون حل = نصف عمل.' },
        { lvl:'strong', text:'"أفضّل أن نتفق على المبلغ بالدينار مباشرة (2.18M IQD)، حتى لا تتأثر قوتي الشرائية بتذبذبات الصرف."', out:'<b>النتيجة:</b> أمنت قيمة فعلية. لو ارتفع الدولار، تستفيد. لو انخفض، محمي.', lesson:'الراتب بعملة بيئتك يحميك.' },
        { lvl:'strong', text:'"موافق على $1500 بشرط الدفع بسعر السوق + clause لإعادة المراجعة لو تجاوز الفرق 8%."', out:'<b>النتيجة:</b> حصلت على القيمة الفعلية + حماية مستقبلية. تظهر فهماً مالياً ينال احترامهم.', lesson:'الـ FX clause يحميك في الأسواق المتقلبة.' }
      ]
    },
    {
      title: '09 · شركة remote أجنبية، ثقافة مختلفة',
      ctx: 'شركة أمريكية remote، عرضوا $2500. الراتب أقل من زملاء أمريكيين بـ 60%.',
      offer: 'العرض: <b>$2,500 (~3.6M IQD)</b> — جذاب محلياً، منخفض جداً عالمياً.',
      options: [
        { lvl:'weak',   text:'"موافق! هذا 4× راتبي الحالي."', out:'<b>النتيجة:</b> ربطت قيمتك بـ "محلية"، فأصبحت "rate arbitrage" بدلاً من "talent". صعب رفع رواتبك.', lesson:'لا تربط نفسك بسعر بلدك في شركة دولية.' },
        { lvl:'med',    text:'"$3000؟"', out:'<b>النتيجة:</b> طلب بدون مرجع. يعطون $2700 على الأكثر.', lesson:'الطلب بدون مرجع = anchor ضعيف.' },
        { lvl:'strong', text:'"بحثت في Levels.fyi — لدور مماثل remote، النطاق $4500-7000. أتفهم تخفيض geographic، لكن $2500 = 30% من السوق. أرى عادلاً $4000."', out:'<b>النتيجة:</b> استخدمت أداة شفافة + قبلت تخفيضاً معقولاً. غالباً ينتقلون لـ $3500-4000.', lesson:'استخدم Levels.fyi / Glassdoor / RemoteOK كأدوات تفاوض.' },
        { lvl:'strong', text:'"أشكر العرض. لكن في 2026 العمل remote عابر للحدود، والمواهب التقنية تُسعّر عالمياً. أحتاج $4500 أساسي + equity. لو الميزانية أقل، أقترح base $3500 + bonus performance ربعي."', out:'<b>النتيجة:</b> رفعت السقف + قدّمت بنية بديلة. تظهر قيمتك السوقية الحقيقية.', lesson:'في الأدوار الـ remote، تفاوض بمعايير عالمية لا محلية.' }
      ]
    },
    {
      title: '10 · Recruiter من Asiacell بعرض مغرٍ',
      ctx: 'Recruiter من Asiacell اتصلت: "حصلنا على CV-ك. عندنا دور Senior Engineer بـ 6M + bonuses."',
      offer: 'العرض الأولي: <b>6M IQD + bonuses غامضة</b>.',
      options: [
        { lvl:'weak',   text:'"وافقت!"', out:'<b>النتيجة:</b> وافقت على رقم بدون فهم الـ scope الكامل أو التحقق.', lesson:'الـ recruiter يكسب عمولة على إقفالك بسرعة. لا تستعجل.' },
        { lvl:'med',    text:'"ممكن نقابل؟"', out:'<b>النتيجة:</b> دخلت العملية بدون شروط مسبقة.', lesson:'ضع شروطك قبل الاجتماع.' },
        { lvl:'strong', text:'"شكراً، مهتم بالتعرف. قبل المقابلة، أرغب بـ JD مفصل + النطاق الكامل (P25-P75) + هيكل الـ bonuses + اسم المدير المباشر."', out:'<b>النتيجة:</b> أظهرت احترافية + جمعت معلومات قبل أن تبيع وقتك. تظهر كـ Senior فعلاً.', lesson:'Senior لا يبيع وقته بـ "ممكن نقابل".' },
        { lvl:'strong', text:'"مهتم. لكن راتبي الحالي في النطاق المذكور، وأي تغيير يحتاج 25% زيادة + bonus signing 5M + مراجعة 6 أشهر. لو الميزانية تستوعب، نتقدم."', out:'<b>النتيجة:</b> طرحت شروطاً واضحة → الـ recruiter يصفّي بسرعة. لو الميزانية لا تستوعب، توفر وقتاً للجميع.', lesson:'Anchor مبكر يصفّي العروض الضعيفة.' }
      ]
    },
    {
      title: '11 · ترقية داخلية بدون زيادة',
      ctx: 'مديرك: "ترقّيناك إلى Team Lead — مسؤولياتك الجديدة Q4. الزيادة تأتي مع مراجعة سنوية بعد 11 شهر."',
      offer: 'العرض: <b>مسؤوليات إضافية الآن، زيادة محتملة بعد سنة</b>.',
      options: [
        { lvl:'weak',   text:'"شكراً لثقتكم!"', out:'<b>النتيجة:</b> قبلت 12 شهر عمل قيادي بأجر موظف عادي. تكلفة الفرصة: ~10M IQD.', lesson:'الترقية بدون زيادة = استغلال مع لقب.' },
        { lvl:'med',    text:'"متى الزيادة بالضبط؟"', out:'<b>النتيجة:</b> سؤال مهم، لكن لم تطرح بديلاً.', lesson:'السؤال يحتاج مرفقاً بطلب.' },
        { lvl:'strong', text:'"أُقدّر الثقة. لكن مسؤوليات Team Lead = نطاق راتب مختلف. أحتاج 25% زيادة فورية + المراجعة التالية مع زيادة ثانية، أو إعادة النظر في توقيت الترقية."', out:'<b>النتيجة:</b> ربطت الترقية بالنطاق الصحيح + قدّمت بدائل. غالباً يوافقون 15-20% فورياً.', lesson:'لقب جديد = راتب جديد. الفترة الانتقالية مرفوضة.' },
        { lvl:'strong', text:'"شكراً. أُقدّر الفرصة وأقبل المسؤوليات. لكن أحتاج: 20% زيادة الآن + KPIs مكتوبة + مراجعة 6 أشهر. لو الترقية تثبت ناجحة، أتوقع زيادة ثانية. هذا يحمي الطرفين."', out:'<b>النتيجة:</b> قبلت بشروط واضحة + خطة مكتوبة. تظهر كقائد ناضج. غالباً يوافقون.', lesson:'الترقية = ميثاق مكتوب، لا وعد شفهي.' }
      ]
    },
    {
      title: '12 · Counter offer من شركتك بعد استقالتك',
      ctx: 'قدّمت استقالتك لقبول عرض شركة B (3M بدل 2M). شركتك A قالت: "نعطيك 3.2M، ابقَ."',
      offer: 'A تقدم: <b>3.2M (+1.2M على راتبك الحالي)</b>.',
      options: [
        { lvl:'weak',   text:'"موافق! أبقى."', out:'<b>النتيجة:</b> دراسات: 70% من قابلوا counter offer رحلوا خلال 12 شهر. شركتك تعرف الآن أنك "كنت ترغب بالرحيل" → علاقة محترقة.', lesson:'Counter offer غالباً سم بلون عسل.' },
        { lvl:'med',    text:'"دعني أفكر."', out:'<b>النتيجة:</b> الوقت يصبّ في صالحك، لكن لم تكشف خطتك.', lesson:'الوقت أداة، استخدمها بهدف.' },
        { lvl:'strong', text:'"شكراً، لكني التزمت مع B. لو شركتنا تستطيع 3.2M اليوم، السؤال: لماذا احتجت إلى استقالتي لتقدّر قيمتي؟ أفضّل البدء في B بمسار جديد."', out:'<b>النتيجة:</b> رفضت بكرامة + كشفت مشكلة هيكلية في A. سمعتك في الصناعة ترتفع.', lesson:'الزيادة تأتي بسهولة بعد استقالتك = الزيادة كانت ممكنة دائماً، فقط لم يهتموا.' },
        { lvl:'med',    text:'"شكراً، أبقى لكن مع زيادة 4M + ترقية إلى Senior."', out:'<b>النتيجة:</b> أنت في موقف قوي، لكن قبول counter يضعك على قائمة "أول من يُفصل" حين يأتي ضغط.', lesson:'الـ counter offer لو قبلتَه، الثقة تموت.' }
      ]
    },
    {
      title: '13 · 3 عروض في نفس الأسبوع',
      ctx: '3 عروض: A (2.5M, dull, مستقر), B (3M, تحدٍ, متوتر), C (3.5M, شركة ناشئة, مخاطرة).',
      offer: '<b>3 عروض</b> — كيف تختار وتتفاوض؟',
      options: [
        { lvl:'weak',   text:'تختار C (الأعلى) فوراً.', out:'<b>النتيجة:</b> اخترت بمعيار الراتب فقط. الناشئة قد تنهار خلال 6 أشهر.', lesson:'الراتب الأعلى ليس دائماً الخيار الأفضل.' },
        { lvl:'med',    text:'تستخدم C كـ leverage مع B بدون نية حقيقية.', out:'<b>النتيجة:</b> B يرفع 200k، أنت تقبل B. لكن لو C اكتشفت، سمعتك تتأذى في صناعة صغيرة.', lesson:'لا تستخدم عرضاً وهمياً. الصدق ينتصر طويل المدى.' },
        { lvl:'strong', text:'تحلّل بمصفوفة وزنية: راتب 30% + استقرار 25% + نمو 25% + ثقافة 20%. تخبر الجميع بصراحة بدون ذكر الأسماء.', out:'<b>النتيجة:</b> اتخذت قراراً مبنياً على أولويات حقيقية. وضوحك يجذب احترام الجميع.', lesson:'الأرقام تكذب لو تعزلها. الإطار الوزني يكشف الحقيقة.' },
        { lvl:'strong', text:'تختار B + تتفاوض: "لدي عرضان آخران، الأقرب إليّ بـ 200k أعلى. لو نضيف bonus signing 1M + مراجعة 6 أشهر، أوقّع غداً."', out:'<b>النتيجة:</b> ذكرت العروض بصدق + طلبت تحسيناً محدداً. غالباً يوافقون 80% من الوقت.', lesson:'الشفافية + الطلب المحدد = نتيجة أفضل من اللعب الخفي.' }
      ]
    },
    {
      title: '14 · عرضوا غير مالي بدلاً من راتب أعلى',
      ctx: 'طلبت 3.5M، عرضوا 3.0M + "نرسلك إلى مؤتمر دولي + لابتوب جديد + دورة AWS مدفوعة".',
      offer: 'العرض: <b>3.0M + benefits بقيمة ~1.5M سنوياً</b>.',
      options: [
        { lvl:'weak',   text:'"حسناً، أقبل."', out:'<b>النتيجة:</b> الـ benefits رائعة لكن لا تدفع الإيجار. ستكون لديك شهادات جميلة وحساب فقير.', lesson:'الـ benefits لا تدخل تأميناتك ولا تقاعدك.' },
        { lvl:'med',    text:'"أحتاج المالية أكثر."', out:'<b>النتيجة:</b> رفض الـ benefits بدون مقابل = خسارة فرص نمو.', lesson:'لا ترفض كل الـ benefits. اختر ما يبني مستقبلك.' },
        { lvl:'strong', text:'"الـ AWS course وLاپتوب قبلتهم بقيمة محسوبة. لكن المؤتمر = استثمار شركة لا فردي. أحتاج 250k زيادة في الـ base + نقبل الباقي."', out:'<b>النتيجة:</b> فصلت الـ benefits الفردية عن الجماعية + رفعت base. ذكاء مالي.', lesson:'كل benefit له قيمة سوقية. احسبها.' },
        { lvl:'strong', text:'"دورة AWS قيمتها 1.5M، لكن أستطيع أحصل عليها بنفسي بـ 600k. أُقدّر العرض، لكن الفرق في الـ base أهم. اقترح 3.3M + نلغي المؤتمر."', out:'<b>النتيجة:</b> نقدت قيمة الـ benefit نقدياً + قدّمت مقايضة ذكية. تظهر فهماً مالياً متقدماً.', lesson:'كل benefit له ثمن خصم. تفاوض بالنقد المكافئ.' }
      ]
    },
    {
      title: '15 · "المعدل الإقليمي" حجة لخفض السقف',
      ctx: 'قال HR: "المعدل في العراق لدور مثلك حوالي 1.5M. عرضنا 1.7M سخيٌ نسبياً."',
      offer: '<b>1.7M IQD</b> + ادعاء "السوق منخفض".',
      options: [
        { lvl:'weak',   text:'"حسناً، أقبل لو السوق هكذا."', out:'<b>النتيجة:</b> صدّقت رقماً مفتعلاً. الواقع: متوسط دورك في بغداد 2.2M.', lesson:'لا تثق برقم HR بدون مصدر مستقل.' },
        { lvl:'med',    text:'"لا أوافق على هذا الرقم."', out:'<b>النتيجة:</b> رفض بدون دليل = "هذا الموجود".', lesson:'الرفض يحتاج دليلاً.' },
        { lvl:'strong', text:'"بحثي يُظهر متوسط 2.2M (Glassdoor + 4 محادثات مع زملاء بنفس الدور). من أين رقم 1.5M؟ هل تستطيع مشاركة المرجع؟"', out:'<b>النتيجة:</b> طلبت مصدراً + قدّمت أدلة. الـ HR إما يعتذر ويرفع، أو يكشف أن الرقم وهمي.', lesson:'اطلب المصدر دائماً. الكاذب يفشل في تقديمه.' },
        { lvl:'strong', text:'"حتى لو افترضنا 1.7M سخي للسوق، فأنا لست متوسطاً — لدي [مهارة نادرة + قصة نتيجة]. النطاق المنطقي 2.0-2.5M لمستواي. أين نلتقي؟"', out:'<b>النتيجة:</b> رفضت "المتوسط" + برّرت تفوقك بأمثلة. تنتقل المفاوضة من "هل تستحق؟" إلى "كم نضيف؟".', lesson:'لا تتنافس على المتوسط. أثبت أنك في الـ P75.' }
      ]
    }
  ];

  var scnState = { idx:0, picks: [] };

  function bindScenarios(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var shell = page.querySelector('#hrmScnShell');
    if (!shell || shell.__hrmBound) return;
    shell.__hrmBound = true;

    page.querySelector('#hrmScnPrev').addEventListener('click', function(){
      if (scnState.idx > 0){ scnState.idx--; renderScn(); }
    });
    page.querySelector('#hrmScnNext').addEventListener('click', function(){
      if (scnState.idx < SCENARIOS.length - 1){ scnState.idx++; renderScn(); }
      else { renderScnFinal(); }
    });
    page.querySelector('#hrmScnReset').addEventListener('click', function(){
      scnState = { idx:0, picks: [] };
      renderScn();
    });
    renderScn();
  }

  function renderScn(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var s = SCENARIOS[scnState.idx];
    page.querySelector('#hrmScnIdx').textContent = (scnState.idx + 1);
    page.querySelector('#hrmScnPg').style.width = (((scnState.idx) / SCENARIOS.length) * 100) + '%';
    var doneScore = scnState.picks.filter(function(p){ return p && p.lvl === 'strong'; }).length;
    page.querySelector('#hrmScnScore').textContent = doneScore;

    var body = page.querySelector('#hrmScnBody');
    var prev = page.querySelector('#hrmScnPrev');
    var next = page.querySelector('#hrmScnNext');
    if (prev) prev.disabled = scnState.idx === 0;
    if (next) next.textContent = scnState.idx === SCENARIOS.length - 1 ? 'إنهاء النتيجة 🏁' : 'التالي ▶';

    var html = ''
      + '<div class="hrm-scn-title">' + s.title + '</div>'
      + '<div class="hrm-scn-context">' + s.ctx + '</div>'
      + '<div class="hrm-scn-offer">' + s.offer + '</div>'
      + '<div class="hrm-scn-options">';
    s.options.forEach(function(o, i){
      html += '<button class="hrm-scn-option" data-scn-pick="' + i + '">' + o.text + '</button>';
    });
    html += '</div>';

    var pick = scnState.picks[scnState.idx];
    if (pick != null){
      var o = s.options[pick];
      html += ''
        + '<div class="hrm-scn-result ' + o.lvl + '">'
        +   '<div class="hrm-scn-result-tag">' + (o.lvl === 'strong' ? '🏆 إجابة قوية' : o.lvl === 'med' ? '⚠ إجابة متوسطة' : '❌ إجابة ضعيفة') + '</div>'
        +   '<div class="hrm-scn-result-out">' + o.out + '</div>'
        +   '<div class="hrm-scn-result-lesson">💡 <b>الدرس:</b> ' + o.lesson + '</div>'
        + '</div>';
    }

    body.innerHTML = html;

    body.querySelectorAll('[data-scn-pick]').forEach(function(b){
      b.addEventListener('click', function(){
        if (scnState.picks[scnState.idx] != null) return;
        var idx = parseInt(b.getAttribute('data-scn-pick'), 10);
        scnState.picks[scnState.idx] = idx;
        b.classList.add('picked', SCENARIOS[scnState.idx].options[idx].lvl);
        // disable siblings
        body.querySelectorAll('[data-scn-pick]').forEach(function(x){ x.classList.add('picked'); });
        renderScn();
      });
    });

    // mark already picked option
    if (pick != null){
      var pickedBtn = body.querySelector('[data-scn-pick="' + pick + '"]');
      if (pickedBtn) pickedBtn.classList.add('picked', s.options[pick].lvl);
    }
  }

  function renderScnFinal(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var score = scnState.picks.filter(function(p, i){
      return p != null && SCENARIOS[i].options[p].lvl === 'strong';
    }).length;
    var medScore = scnState.picks.filter(function(p, i){
      return p != null && SCENARIOS[i].options[p].lvl === 'med';
    }).length;

    var msg, icon;
    if (score >= 12){ icon = '🏆'; msg = 'مفاوض ماهر — جاهز لتفاوض كبار. حافظ على الانضباط في كل مفاوضة قادمة.'; }
    else if (score >= 8){ icon = '🥈'; msg = 'متفاوض جيد — راجع السيناريوهات التي اخترت فيها متوسطاً وادرس الدرس.'; }
    else if (score >= 4){ icon = '📚'; msg = 'في طور التعلم — أعد القراءة + احفظ القواعد الـ 6 الأساسية + كرر السيناريوهات.'; }
    else { icon = '⚠'; msg = 'تحتاج تأسيساً — ابدأ بقراءة Voss وFisher، ثم أعد المحاولة.'; }

    page.querySelector('#hrmScnBody').innerHTML = ''
      + '<div class="hrm-scn-final">'
      +   '<div class="hrm-scn-final-icon">' + icon + '</div>'
      +   '<div class="hrm-scn-final-score">' + score + ' / 15</div>'
      +   '<div class="hrm-scn-final-msg">' + msg + ' (إجابات متوسطة: ' + medScore + ')</div>'
      +   '<button class="hrm-scn-btn primary" onclick="(function(){var p=document.getElementById(\'page-hrmastery\');if(p){var r=p.querySelector(\'#hrmScnReset\');if(r)r.click();}})();">إعادة من البداية</button>'
      + '</div>';
    page.querySelector('#hrmScnPg').style.width = '100%';
  }

  /* =========================
     JOB AD DECODER (Lab 3)
     ========================= */
  var DECODER_FLAGS = {
    green: [
      { kw: ['range', 'نطاق راتب', 'salary range', 'IQD/month'], msg: 'الراتب مذكور بشفافية' },
      { kw: ['team', 'فريق', 'manager', 'مدير مباشر'], msg: 'ذكر الفريق والإدارة' },
      { kw: ['training', 'تدريب', 'learning', 'shadowing'], msg: 'استثمار في تطوير الموظف' },
      { kw: ['remote', 'hybrid', 'مرن', 'work from home'], msg: 'مرونة موقع العمل' },
      { kw: ['career path', 'نمو', 'growth', 'مسار'], msg: 'مسار وظيفي واضح' },
      { kw: ['health insurance', 'تأمين صحي', 'تأمين'], msg: 'تأمين صحي مذكور' },
      { kw: ['paid leave', 'إجازات', 'إجازة سنوية'], msg: 'سياسة إجازات واضحة' }
    ],
    yellow: [
      { kw: ['rockstar', 'ninja', 'wizard', 'guru'], msg: 'مصطلح "rockstar/ninja" → توقعات غير واقعية' },
      { kw: ['family', 'عائلتنا', 'عائلة'], msg: '"عائلتنا" → حدود ضعيفة محتملة' },
      { kw: ['fast-paced', 'fast pace', 'سريع'], msg: '"fast-paced" → غالباً فوضى' },
      { kw: ['wear many hats', 'متعدد المهام'], msg: '"متعدد المهام" → دور غير محدد' },
      { kw: ['passionate', 'شغوف', 'متحمس'], msg: 'تكرار "شغوف" → استغلال عاطفي محتمل' },
      { kw: ['flexible hours', 'ساعات مرنة'], msg: '"ساعات مرنة" → قد تعني "تعمل حتى منتصف الليل"' },
      { kw: ['work hard play hard'], msg: '"work hard play hard" → ساعات طويلة' }
    ],
    red: [
      { kw: ['24/7', 'available anytime', 'دوام 24', 'في أي وقت'], msg: '🚨 "24/7" → استدعاء ليلي مرفوض' },
      { kw: ['unpaid trial', 'فترة تجريبية بدون راتب', 'تجريب مجاني'], msg: '🚨 فترة تجريبية بدون راتب — غير قانوني' },
      { kw: ['deposit', 'كفالة', 'رسوم تسجيل', 'مبلغ تأمين'], msg: '🚨 طلب رسوم/كفالة → احتيال محتمل' },
      { kw: ['no salary', 'الراتب يحدد لاحقاً', 'الراتب بعد المقابلة'], msg: '🚨 لا salary → ضعف تفاوضي مفروض' },
      { kw: ['extra hours', 'OT بدون', 'ساعات إضافية بدون'], msg: '🚨 OT بدون أجر → استغلال' },
      { kw: ['high stress', 'stress level', 'ضغط عالٍ', 'مرهق جداً'], msg: '🚨 إقرار صريح بضغط عالٍ' },
      { kw: ['multiple positions', 'مسؤوليات متعددة جداً', '50 مهمة'], msg: '🚨 50 مسؤولية = لا توصيف دور' }
    ]
  };

  var DECODER_SAMPLE =
    'نبحث عن Sales rockstar شغوف ومتحمس للانضمام إلى عائلتنا. ساعات العمل مرنة (24/7 متاح حسب الحاجة). الراتب يحدد بعد المقابلة. مطلوب فترة تجريبية شهرين بدون راتب لإثبات الجدية. دوام في بيئة fast-paced مع مهام متعددة. مطلوب كفالة مالية رمزية كضمان.';

  function bindDecoder(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var dec = page.querySelector('.hrm-decoder');
    if (!dec || dec.__hrmBound) return;
    dec.__hrmBound = true;

    var ta = page.querySelector('#hrmDecoderText');
    var go = page.querySelector('#hrmDecoderGo');
    var sample = page.querySelector('#hrmDecoderSample');
    var clear = page.querySelector('#hrmDecoderClear');

    if (go) go.addEventListener('click', function(){ runDecoder(ta.value); });
    if (sample) sample.addEventListener('click', function(){
      ta.value = DECODER_SAMPLE; runDecoder(DECODER_SAMPLE);
    });
    if (clear) clear.addEventListener('click', function(){
      ta.value = ''; resetDecoderOut();
    });
  }

  function resetDecoderOut(){
    var out = document.getElementById('hrmDecoderOut');
    if (!out) return;
    out.innerHTML = '<div class="hrm-calc-empty"><div class="hrm-calc-empty-icon">🔬</div><div>الصق نصاً + اضغط <b>حلل</b></div></div>';
  }

  function runDecoder(text){
    var out = document.getElementById('hrmDecoderOut');
    if (!out) return;
    if (!text || text.trim().length < 30){
      out.innerHTML = '<div class="hrm-calc-empty"><div class="hrm-calc-empty-icon">⚠</div><div>النص قصير جداً (30 حرف على الأقل)</div></div>';
      return;
    }
    var t = text.toLowerCase();
    var found = { green: [], yellow: [], red: [] };
    Object.keys(DECODER_FLAGS).forEach(function(level){
      DECODER_FLAGS[level].forEach(function(f){
        for (var i=0; i<f.kw.length; i++){
          if (t.indexOf(f.kw[i].toLowerCase()) !== -1){
            found[level].push({ msg: f.msg, kw: f.kw[i] });
            break;
          }
        }
      });
    });

    var greenN = found.green.length, yellowN = found.yellow.length, redN = found.red.length;
    var score = (greenN * 1) - (yellowN * 1) - (redN * 2);
    var label, cls, icon;
    if (redN >= 2 || score <= -3){ label = 'سامة — تجنّب'; cls = 'toxic'; icon = '🚨'; }
    else if (yellowN >= 2 || score < 1){ label = 'احذر — أسئلة مطلوبة'; cls = 'caution'; icon = '⚠'; }
    else { label = 'صحية — تستحق المتابعة'; cls = 'healthy'; icon = '✅'; }

    var html = ''
      + '<div class="hrm-decoder-score ' + cls + '"><span style="font-size:22px;">' + icon + '</span><div><b>' + label + '</b><br><small>' + greenN + ' green · ' + yellowN + ' yellow · ' + redN + ' red</small></div></div>'
      + '<div class="hrm-decoder-flags">';

    found.red.forEach(function(f){
      html += '<div class="hrm-decoder-flag red"><span class="hrm-decoder-flag-icon">🚨</span><div><b>' + f.msg + '</b></div><div class="hrm-decoder-flag-meta">"' + f.kw + '"</div></div>';
    });
    found.yellow.forEach(function(f){
      html += '<div class="hrm-decoder-flag yellow"><span class="hrm-decoder-flag-icon">⚠</span><div><b>' + f.msg + '</b></div><div class="hrm-decoder-flag-meta">"' + f.kw + '"</div></div>';
    });
    found.green.forEach(function(f){
      html += '<div class="hrm-decoder-flag green"><span class="hrm-decoder-flag-icon">✅</span><div><b>' + f.msg + '</b></div><div class="hrm-decoder-flag-meta">"' + f.kw + '"</div></div>';
    });

    if (!greenN && !yellowN && !redN){
      html += '<div class="hrm-decoder-flag yellow"><span class="hrm-decoder-flag-icon">🤔</span><div>لم نكتشف أي flag واضح. النص قد يكون عام جداً — اطلب JD مفصلاً.</div></div>';
    }

    html += '</div>';
    out.innerHTML = html;
  }

  /* =========================
     MOCK PHONE SCREEN TIMER (Lab 5)
     localStorage: upg_interview_attempts_hr
     ========================= */
  var MOCK_QUESTIONS = [
    'حدّثني عن نفسك في 30 ثانية.',
    'لماذا تريد ترك وظيفتك الحالية؟',
    'ما أكبر إنجاز افتخرت به آخر سنة؟ بأرقام.',
    'ما توقعاتك للراتب؟',
    'هل عندك أسئلة؟ اذكر سؤالاً واحداً قوياً.'
  ];
  var FILLER_WORDS = ['اممم','ام','يعني','مثلاً','شي','هيك','كذا','حقيقة','بصراحة','يمكن','ممكن'];

  var mockState = { idx:0, time:30, timerId:null, answers:[], times:[] };

  function bindMock(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var mock = page.querySelector('#hrmMock');
    if (!mock || mock.__hrmBound) return;
    mock.__hrmBound = true;

    page.querySelector('#hrmMockStart').addEventListener('click', function(){
      mockState = { idx:0, time:30, timerId:null, answers:[], times:[] };
      showMockStage('play');
      startMockQuestion();
    });

    page.querySelector('#hrmMockNext').addEventListener('click', function(){
      saveMockAnswer();
      mockState.idx++;
      if (mockState.idx >= MOCK_QUESTIONS.length){
        renderMockReport();
      } else {
        startMockQuestion();
      }
    });

    page.querySelector('#hrmMockRestart').addEventListener('click', function(){
      stopMockTimer();
      showMockStage('intro');
    });

    var input = page.querySelector('#hrmMockInput');
    if (input){
      input.addEventListener('input', function(){
        var w = input.value.trim().split(/\s+/).filter(Boolean).length;
        page.querySelector('#hrmMockWords').textContent = w;
      });
    }
  }

  function showMockStage(name){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    page.querySelectorAll('.hrm-mock-stage').forEach(function(s){
      s.style.display = (s.getAttribute('data-stage') === name) ? '' : 'none';
    });
  }

  function startMockQuestion(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    page.querySelector('#hrmMockNum').textContent = (mockState.idx + 1);
    page.querySelector('#hrmMockQ').textContent = MOCK_QUESTIONS[mockState.idx];
    var input = page.querySelector('#hrmMockInput');
    input.value = ''; input.focus();
    page.querySelector('#hrmMockWords').textContent = '0';
    page.querySelector('#hrmMockElapsed').textContent = '0';

    stopMockTimer();
    mockState.time = 30;
    mockState.startedAt = Date.now();
    updateMockTimer();
    mockState.timerId = setInterval(function(){
      mockState.time--;
      updateMockTimer();
      if (mockState.time <= 0){
        stopMockTimer();
        // auto next
        var btn = page.querySelector('#hrmMockNext');
        if (btn) btn.click();
      }
    }, 1000);
  }

  function updateMockTimer(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var fill = page.querySelector('#hrmMockTimerFill');
    var num = page.querySelector('#hrmMockTimerNum');
    var elapsedEl = page.querySelector('#hrmMockElapsed');
    if (!fill || !num) return;
    var pct = Math.max(0, (mockState.time / 30) * 100);
    fill.style.width = pct + '%';
    num.textContent = mockState.time;
    num.classList.toggle('warn', mockState.time <= 10 && mockState.time > 5);
    num.classList.toggle('danger', mockState.time <= 5);
    if (elapsedEl){
      var elapsed = Math.round((Date.now() - mockState.startedAt) / 1000);
      elapsedEl.textContent = elapsed;
    }
  }

  function stopMockTimer(){
    if (mockState.timerId){
      clearInterval(mockState.timerId);
      mockState.timerId = null;
    }
  }

  function saveMockAnswer(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var input = page.querySelector('#hrmMockInput');
    var elapsed = Math.round((Date.now() - mockState.startedAt) / 1000);
    mockState.answers.push(input.value.trim());
    mockState.times.push(elapsed);
  }

  function renderMockReport(){
    stopMockTimer();
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    showMockStage('report');

    // Aggregate metrics
    var totalWords = 0, totalChars = 0, totalTime = 0;
    var fillerCount = 0;
    var iCount = 0, weCount = 0;
    mockState.answers.forEach(function(a){
      var t = (a || '').toLowerCase();
      var words = t.split(/\s+/).filter(Boolean);
      totalWords += words.length;
      totalChars += t.length;
      FILLER_WORDS.forEach(function(f){
        var re = new RegExp('\\b' + f + '\\b','g');
        var m = t.match(re);
        if (m) fillerCount += m.length;
      });
      iCount += (t.match(/(?:^|\s)(?:أنا|انا)(?=\s|\.|,|$)/g) || []).length;
      weCount += (t.match(/(?:^|\s)(?:نحن|إحنا|احنا|كنا|قمنا|نعمل|عملنا)(?=\s|\.|,|$)/g) || []).length;
    });
    mockState.times.forEach(function(t){ totalTime += t; });
    var avgWordsPerAns = mockState.answers.length ? Math.round(totalWords / mockState.answers.length) : 0;
    var fillerRatio = totalWords ? Math.round((fillerCount / totalWords) * 100) : 0;
    var iRatio = (iCount + weCount) > 0 ? Math.round((iCount / (iCount + weCount)) * 100) : 0;
    var avgTime = mockState.times.length ? Math.round(totalTime / mockState.times.length) : 0;

    // Class colors
    function cls(val, good, warn){
      if (val <= good) return 'good';
      if (val <= warn) return 'warn';
      return 'bad';
    }
    var fillerCls = cls(fillerRatio, 3, 7); // 3% great, 7% ok, more = bad
    var lengthCls = avgWordsPerAns >= 25 && avgWordsPerAns <= 70 ? 'good' :
                    avgWordsPerAns < 25 ? 'warn' : 'bad';
    var iRatioCls = iRatio >= 35 && iRatio <= 65 ? 'good' :
                    'warn'; // too me-heavy or too we-heavy
    var timeCls = avgTime >= 20 && avgTime <= 28 ? 'good' :
                  avgTime < 12 ? 'warn' : avgTime < 30 ? 'good' : 'bad';

    // Generate feedback
    var feedback = '<b>📊 الملخص:</b><br>';
    feedback += avgWordsPerAns < 25 ? 'إجاباتك قصيرة جداً — تحتاج تطوير الفكرة بمثال محدد. ' :
                avgWordsPerAns > 70 ? 'إجاباتك مطوّلة — حضّر النسخة المضغوطة (60 ثانية). ' :
                'طول إجاباتك مناسب. ';
    feedback += fillerRatio > 7 ? 'كلمات الحشو مرتفعة — تدرّب على الصمت بدل "اممم/يعني". ' :
                fillerRatio > 3 ? 'كلمات الحشو معقولة، لكن قابلة للتحسين. ' :
                'كلمات الحشو ممتازة. ';
    feedback += iCount > 0 && iRatio > 70 ? 'تستخدم "أنا" أكثر مما ينبغي — اذكر الفريق أكثر. ' :
                iCount > 0 && iRatio < 30 ? '"نحن" تطغى — في المقابلات HR يحتاج معرفة دورك تحديداً، استخدم "أنا" أكثر. ' :
                'توازن "أنا/نحن" جيد. ';
    feedback += avgTime < 12 ? 'تنهي الإجابة بسرعة — استثمر الوقت كاملاً. ' :
                avgTime > 28 ? 'تستخدم الوقت كاملاً — جيد لإجابات معقدة. ' : 'إدارة الوقت ممتازة. ';

    var html = ''
      + '<div class="hrm-mock-report-h">📋 تقرير محاكاة HR</div>'
      + '<div class="hrm-mock-report-sub">5 أسئلة، تحليل اللغة + الإيقاع + التوازن</div>'
      + '<div class="hrm-mock-metrics">'
      +   '<div class="hrm-mock-metric"><div class="hrm-mock-metric-val ' + lengthCls + '">' + avgWordsPerAns + '</div><div class="hrm-mock-metric-label">متوسط كلمات / إجابة</div></div>'
      +   '<div class="hrm-mock-metric"><div class="hrm-mock-metric-val ' + fillerCls + '">' + fillerRatio + '%</div><div class="hrm-mock-metric-label">كلمات حشو</div></div>'
      +   '<div class="hrm-mock-metric"><div class="hrm-mock-metric-val ' + iRatioCls + '">' + iRatio + '% / ' + (100 - iRatio) + '%</div><div class="hrm-mock-metric-label">أنا / نحن</div></div>'
      +   '<div class="hrm-mock-metric"><div class="hrm-mock-metric-val ' + timeCls + '">' + avgTime + 's</div><div class="hrm-mock-metric-label">متوسط زمن الإجابة</div></div>'
      + '</div>'
      + '<div class="hrm-mock-feedback">' + feedback + '</div>'
      + '<div class="hrm-mock-answers">';
    mockState.answers.forEach(function(a, i){
      html += '<div class="hrm-mock-ans-q">' + (i+1) + '. ' + MOCK_QUESTIONS[i] + '  <span style="color:var(--text-faint);font-weight:400;">(' + (mockState.times[i]||0) + 's)</span></div>';
      html += '<div class="hrm-mock-ans-a">' + (a || '<i style="color:var(--text-faint);">لا إجابة</i>') + '</div>';
    });
    html += '</div>';

    page.querySelector('#hrmMockReport').innerHTML = html;

    // Save attempt
    try {
      var rec = { ts: Date.now(), avgWords: avgWordsPerAns, filler: fillerRatio, iRatio: iRatio, avgTime: avgTime };
      var arr = JSON.parse(localStorage.getItem('upg_interview_attempts_hr') || '[]');
      arr.unshift(rec); arr = arr.slice(0,15);
      localStorage.setItem('upg_interview_attempts_hr', JSON.stringify(arr));
    } catch(e){}
  }

  /* =========================
     OFFER COMPARE MATRIX (Lab 6)
     ========================= */
  function bindCompare(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var cmp = page.querySelector('.hrm-cmp');
    if (!cmp || cmp.__hrmBound) return;
    cmp.__hrmBound = true;

    // weight inputs
    page.querySelectorAll('.hrm-cmp-w').forEach(function(r){
      r.addEventListener('input', function(){
        var key = r.getAttribute('data-w');
        var v = page.querySelector('[data-wv="' + key + '"]');
        if (v) v.textContent = r.value;
        runCompare();
      });
    });
    // score inputs
    page.querySelectorAll('.hrm-cmp-s').forEach(function(r){
      r.addEventListener('input', function(){
        var key = r.getAttribute('data-s');
        var offer = r.closest('.hrm-cmp-offer');
        var v = offer.querySelector('[data-sv="' + key + '"]');
        if (v) v.textContent = r.value;
        runCompare();
      });
    });
    // names
    page.querySelectorAll('.hrm-cmp-name').forEach(function(n){
      n.addEventListener('input', runCompare);
    });

    runCompare();
  }

  function runCompare(){
    var page = document.getElementById('page-hrmastery');
    if (!page) return;
    var weights = {};
    page.querySelectorAll('.hrm-cmp-w').forEach(function(r){
      weights[r.getAttribute('data-w')] = parseInt(r.value, 10) || 0;
    });
    var totalW = Object.keys(weights).reduce(function(s,k){ return s + weights[k]; }, 0);

    // Update total
    var totalEl = page.querySelector('#hrmCmpWTotal');
    if (totalEl){
      totalEl.textContent = totalW;
      var totalParent = totalEl.closest('.hrm-cmp-total');
      totalParent.classList.toggle('warn', totalW < 90 || totalW > 110);
      totalParent.classList.toggle('bad', totalW < 80 || totalW > 120);
    }

    // Calculate offers
    var offers = [];
    page.querySelectorAll('.hrm-cmp-offer').forEach(function(o){
      var name = o.querySelector('.hrm-cmp-name').value || o.getAttribute('data-offer');
      var scores = {};
      o.querySelectorAll('.hrm-cmp-s').forEach(function(r){
        scores[r.getAttribute('data-s')] = parseInt(r.value, 10) || 0;
      });
      // Weighted score (out of 1000) normalized to /100
      var weighted = 0;
      Object.keys(weights).forEach(function(k){
        weighted += weights[k] * (scores[k] || 0); // max = sum(weights) * 10 = ~1000
      });
      var pct = totalW > 0 ? Math.round((weighted / (totalW * 10)) * 100) : 0;
      offers.push({ name: name, scores: scores, weighted: weighted, pct: pct });
    });

    var maxPct = Math.max.apply(null, offers.map(function(o){ return o.pct; }));
    var winner = offers.find(function(o){ return o.pct === maxPct; });

    var html = ''
      + '<div class="hrm-cmp-winner">'
      +   '<div class="hrm-cmp-winner-icon">🏆</div>'
      +   '<div class="hrm-cmp-winner-text">التوصية: <b>' + winner.name + '</b> (' + winner.pct + '/100) — أفضل توافق مع أوزانك</div>'
      + '</div>'
      + '<div class="hrm-cmp-bars">';
    offers.forEach(function(o){
      var winCls = o.pct === maxPct ? 'win' : '';
      html += '<div class="hrm-cmp-bar-row">'
        +   '<label>' + o.name + '</label>'
        +   '<div class="hrm-cmp-bar"><div class="hrm-cmp-bar-fill ' + winCls + '" style="width:' + Math.max(8, o.pct) + '%;">' + o.pct + '%</div></div>'
        +   '<div class="hrm-cmp-bar-score">' + o.pct + '/100</div>'
        + '</div>';
    });
    html += '</div>';

    page.querySelector('#hrmCmpResult').innerHTML = html;
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="hrmastery"]');
    if (t) setTimeout(init, 80);
  });
})();



/* ═══════════════════════════════════════════════════════════════════════
   WORKER 09 · PHASE 2 — Mood Meter Interactive (Yale model)
   localStorage key: upg_mood_log (array, last 50)
═══════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var STORAGE_KEY = 'upg_mood_log';
  var MAX_LOG = 50;

  var WORDS = {
    'red':    ['غاضب','مُحبَط','قلِق','مُتوتّر','ثائر','مُمتعض','مهان','منزعج','محتقن'],
    'yellow': ['متحمس','مُلهَم','مبتهج','مُنجِز','واثق','فخور','نشِط','طموح','متفائل'],
    'blue':   ['حزين','مُنهَك','كئيب','مُمل','يائس','وحيد','خامل','فارغ','مُكتئب'],
    'green':  ['هادئ','راضٍ','مرتاح','آمِن','مُطمئن','صافي الذهن','مستقر','مُتقَبِّل','شاكر']
  };

  var SUGGEST = {
    'red':    'تنفّس Box (4·4·4·4) ٤ دورات. لا تتخذ قراراً قبل ١٠ دقائق. اكتب ما يستفزّك.',
    'yellow': 'استثمر هذه الطاقة في أصعب مهمة اليوم. شارك زميلاً حماسك (مرآة).',
    'blue':   'تحرّك جسدياً ٥ دقائق. اشرب ماءً. اكتب ٣ أشياء ممتنّ لها (Gratitude).',
    'green':  'وقت ممتاز للتفكير الاستراتيجي والتخطيط. لا تُهدره في reactivity.'
  };

  function getZone(x, y){
    // x: -1..+1 (pleasantness), y: -1..+1 (energy)
    if (y >= 0 && x < 0) return 'red';
    if (y >= 0 && x >= 0) return 'yellow';
    if (y < 0 && x < 0) return 'blue';
    return 'green';
  }

  function loadLog(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch(e){ return []; }
  }
  function saveLog(arr){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr.slice(0, MAX_LOG))); } catch(e){}
  }

  function init(){
    var canvas = document.getElementById('w09eMoodCanvas');
    if (!canvas) return;
    if (canvas.dataset.w09Inited === '1') return;
    canvas.dataset.w09Inited = '1';

    var marker  = document.getElementById('w09eMoodMarker');
    var coordEl = document.getElementById('w09eMoodCoord');
    var zoneEl  = document.getElementById('w09eMoodZone');
    var wordSel = document.getElementById('w09eMoodWord');
    var causeEl = document.getElementById('w09eMoodCause');
    var sugEl   = document.getElementById('w09eMoodSuggest').querySelector('span');
    var saveBtn = document.getElementById('w09eMoodSave');
    var clrBtn  = document.getElementById('w09eMoodClear');
    var histUl  = document.getElementById('w09eMoodHistory');

    var current = { x: null, y: null, zone: null };

    function paintWords(zone){
      wordSel.innerHTML = '<option value="">— اختر —</option>';
      (WORDS[zone] || []).forEach(function(w){
        var o = document.createElement('option');
        o.value = w; o.textContent = w;
        wordSel.appendChild(o);
      });
    }

    function place(clientX, clientY){
      var rect = canvas.getBoundingClientRect();
      var px = clientX - rect.left;
      var py = clientY - rect.top;
      px = Math.max(0, Math.min(rect.width,  px));
      py = Math.max(0, Math.min(rect.height, py));
      var nx = (px / rect.width) * 2 - 1;          // -1..+1 (left=-1)
      var ny = 1 - (py / rect.height) * 2;          // -1..+1 (top=+1)
      // RTL: flip x so right side = ممتع (+x)
      nx = -nx;
      current.x = +nx.toFixed(2);
      current.y = +ny.toFixed(2);
      current.zone = getZone(current.x, current.y);

      marker.hidden = false;
      // Position marker in canvas coordinates (visual)
      marker.style.right = (px / rect.width * 100) + '%';
      marker.style.top   = (py / rect.height * 100) + '%';

      coordEl.textContent = 'x=' + current.x + ' · y=' + current.y;
      var zoneName = ({red:'حمراء',yellow:'صفراء',blue:'زرقاء',green:'خضراء'})[current.zone];
      zoneEl.textContent = zoneName;
      paintWords(current.zone);
      sugEl.textContent = SUGGEST[current.zone];
    }

    canvas.addEventListener('click', function(e){ place(e.clientX, e.clientY); });
    canvas.addEventListener('keydown', function(e){
      // basic keyboard nudge if focused
      if (current.x === null) { place(canvas.getBoundingClientRect().left + 50, canvas.getBoundingClientRect().top + 50); return; }
    });

    function renderHistory(){
      var arr = loadLog();
      if (!arr.length){
        histUl.innerHTML = '<li class="empty">لا تسجيلات بعد</li>';
        return;
      }
      histUl.innerHTML = arr.slice(0, 5).map(function(e){
        var d = new Date(e.t);
        var time = d.toLocaleString('ar', { hour: '2-digit', minute: '2-digit', day:'2-digit', month:'2-digit' });
        return '<li><b>' + (e.word || '—') + '</b> · ' + time + (e.cause ? ' — ' + e.cause.slice(0,40) : '') + '</li>';
      }).join('');
    }

    saveBtn.addEventListener('click', function(){
      if (current.x === null){ alert('اختر نقطة على الشبكة أولاً'); return; }
      var entry = {
        t: Date.now(),
        x: current.x, y: current.y, zone: current.zone,
        word: wordSel.value || null,
        cause: (causeEl.value || '').slice(0, 280)
      };
      var arr = loadLog();
      arr.unshift(entry);
      saveLog(arr);
      causeEl.value = '';
      renderHistory();
      saveBtn.textContent = '✅ محفوظ';
      setTimeout(function(){ saveBtn.textContent = '💾 حفظ'; }, 1400);
    });

    clrBtn.addEventListener('click', function(){
      if (!confirm('مسح كل تسجيلات Mood Meter محلياً؟')) return;
      try { localStorage.removeItem(STORAGE_KEY); } catch(e){}
      renderHistory();
    });

    renderHistory();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="eq"]');
    if (t) setTimeout(init, 80);
  });
})();



/* ═══════════════════════════════════════════════════════════════════════
   WORKER 09 · PHASE 3 — Self-Diagnostic Suite (6 tests)
   localStorage key: upg_psych_results (object keyed by test id)
═══════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var STORAGE = 'upg_psych_results';

  function load(){ try { return JSON.parse(localStorage.getItem(STORAGE) || '{}'); } catch(e){ return {}; } }
  function save(o){ try { localStorage.setItem(STORAGE, JSON.stringify(o)); } catch(e){} }

  // ── Big Five (BFI-2-S inspired, shortened to 20 items, 5 traits × 4) ──
  var BFI = {
    id: 'bfi', label: 'Big Five (OCEAN — 20 سؤال)',
    intro: 'Soto &amp; John (BFI-2). الأبعاد: Openness · Conscientiousness · Extraversion · Agreeableness · Neuroticism.',
    likert: ['أعارض بشدة','أعارض','محايد','أوافق','أوافق بشدة'],
    items: [
      {t:'O', q:'أحبّ التفكير في الأفكار النظرية والمجرّدة', r:false},
      {t:'O', q:'أرى الجمال في الفن والشعر', r:false},
      {t:'O', q:'أبحث عن تجارب جديدة بانتظام', r:false},
      {t:'O', q:'أُفضّل المألوف على المغامرة', r:true},
      {t:'C', q:'أُتمّ ما أبدأه دون تأجيل', r:false},
      {t:'C', q:'أحافظ على ترتيب أغراضي وملفاتي', r:false},
      {t:'C', q:'أُخطّط بدقة قبل التنفيذ', r:false},
      {t:'C', q:'أتأخر عن المواعيد كثيراً', r:true},
      {t:'E', q:'أبادر بالحديث في الاجتماعات', r:false},
      {t:'E', q:'أستمد طاقتي من التواجد مع الناس', r:false},
      {t:'E', q:'أبقى صامتاً في المجموعات الكبيرة', r:true},
      {t:'E', q:'أُحب أن أكون مركز الانتباه أحياناً', r:false},
      {t:'A', q:'أُسامح بسرعة', r:false},
      {t:'A', q:'أهتم برفاه الآخرين قبل نفسي أحياناً', r:false},
      {t:'A', q:'أنتقد الآخرين كثيراً', r:true},
      {t:'A', q:'أتعاطف مع مشاعر زملائي', r:false},
      {t:'N', q:'أقلق بشأن أشياء كثيرة', r:false},
      {t:'N', q:'أنفعل بسرعة عند الضغط', r:false},
      {t:'N', q:'أشعر بالأمان والهدوء عموماً', r:true},
      {t:'N', q:'تنتابني تقلبات مزاجية مفاجئة', r:false}
    ],
    score: function(answers){
      var s = {O:0,C:0,E:0,A:0,N:0}, n = {O:0,C:0,E:0,A:0,N:0};
      this.items.forEach(function(it,i){
        var v = answers[i]; if (v==null) return;
        var val = it.r ? (6 - v) : v; // reverse if needed (1..5)
        s[it.t] += val; n[it.t] += 1;
      });
      var labels = {O:'الانفتاح',C:'الضمير',E:'الانبساط',A:'القبول',N:'العصابية'};
      return {
        bars: Object.keys(s).map(function(k){
          var pct = n[k] ? Math.round((s[k] / (n[k]*5))*100) : 0;
          return { key: labels[k], pct: pct };
        }),
        recos: function(){
          var pcts = {}; Object.keys(s).forEach(function(k){ pcts[k] = n[k]?Math.round((s[k]/(n[k]*5))*100):0; });
          var top = Object.keys(pcts).sort(function(a,b){return pcts[b]-pcts[a];})[0];
          var map = {
            O:'انفتاحك العالي يلائم أدواراً إبداعية واستكشافية (تسويق، تصميم، استراتيجية).',
            C:'ضميرك العالي يلائم أدواراً تحتاج دقة (محاسبة، QA، إدارة مشاريع).',
            E:'انبساطك العالي يلائم أدوار العملاء (مبيعات، أكونت منجر، ريادة).',
            A:'قبولك العالي يلائم أدوار الفريق والوساطة (HR، خدمة عملاء، تيسير).',
            N:'عصابيتك العالية مؤشّر للحاجة لتقنيات تنظيم (Box Breathing, Reappraisal).'
          };
          return '<b>أعلى بُعد:</b> ' + labels[top] + ' (' + pcts[top] + '%) — ' + map[top];
        }()
      };
    }
  };

  // ── DISC (12 forced-choice items, MOST/LEAST style simplified to MOST only) ──
  var DISC = {
    id: 'disc', label: 'DISC Behavioral (12 سؤال)',
    intro: 'Marston (1928). الأبعاد: <b>D</b>ominance · <b>I</b>nfluence · <b>S</b>teadiness · <b>C</b>onscientiousness.',
    forced: true,
    items: [
      [['D','أتولّى القيادة بسرعة'],['I','أُحرّك الناس بحماستي'],['S','أُحافظ على الاستقرار'],['C','أُحلّل قبل القرار']],
      [['D','أحب المنافسة'],['I','أحب التعارف'],['S','أحب الروتين'],['C','أحب الدقة']],
      [['D','مباشر وصريح'],['I','اجتماعي ومرح'],['S','صبور ومستمع'],['C','منهجي ودقيق']],
      [['D','أتحمّل المخاطر'],['I','أُلهم'],['S','أدعم'],['C','أُحقّق']],
      [['D','أطلب نتائج'],['I','أطلب تأثيراً'],['S','أطلب وفاقاً'],['C','أطلب صحّة']],
      [['D','نفاد صبر مع البطء'],['I','أتشتّت بالتفاصيل'],['S','أكره التغيير المفاجئ'],['C','أُفرط في التحليل']],
      [['D','أسرع لاتخاذ القرار'],['I','أتأقلم بسرعة'],['S','أبني علاقات طويلة'],['C','أطلب البيانات']],
      [['D','مُحرِّك المهام'],['I','مُحرِّك الناس'],['S','مُحافظ على السلام'],['C','حارس الجودة']],
      [['D','أُفضّل الاستقلالية'],['I','أُفضّل العمل الجماعي'],['S','أُفضّل بيئة هادئة'],['C','أُفضّل القواعد الواضحة']],
      [['D','أتحدّى الوضع القائم'],['I','أتحدّث بصوت عالٍ'],['S','أتجنّب الصراع'],['C','أتحقّق من الحقائق']],
      [['D','جريء في القرارات'],['I','مقنع في الكلام'],['S','ودود في التواصل'],['C','حذِر في الالتزامات']],
      [['D','أحبّ التحدي'],['I','أحبّ التشجيع'],['S','أحبّ التقدير الهادئ'],['C','أحبّ الصواب']]
    ],
    score: function(answers){
      var s = {D:0,I:0,S:0,C:0};
      answers.forEach(function(v){ if (v) s[v] += 1; });
      var total = s.D+s.I+s.S+s.C || 1;
      var labels = {D:'D · المسيطر',I:'I · المُعبِّر',S:'S · المستقر',C:'C · الدقيق'};
      var bars = Object.keys(s).map(function(k){
        return { key: labels[k], pct: Math.round((s[k]/total)*100) };
      });
      var top = Object.keys(s).sort(function(a,b){return s[b]-s[a];})[0];
      var tips = {
        D:'تواصل: مباشر، نتائج، ملخص أولاً. تجنّب: المقدمات الطويلة.',
        I:'تواصل: حماسي، قصصي، علاقات. تجنّب: تجاهل العاطفة.',
        S:'تواصل: هادئ، تدريجي، آمن. تجنّب: الضغط المفاجئ.',
        C:'تواصل: بيانات، تفاصيل، أدلة. تجنّب: العاطفة بدون أرقام.'
      };
      return { bars: bars, recos: '<b>نمطك السائد:</b> ' + labels[top] + '. ' + tips[top] };
    }
  };

  // ── EQ Quotient (16 items, 4 axes) ──
  var EQ = {
    id: 'eq', label: 'EQ Quotient (16 سؤال)',
    intro: 'مستوحى من Bar-On EQ-i. المحاور: Self-awareness · Self-management · Social-awareness · Relationships.',
    likert: ['نادراً','أحياناً','بانتظام','غالباً','دائماً'],
    items: [
      {t:'SA', q:'أُلاحظ مشاعري لحظياً وأُسمّيها بدقة'},
      {t:'SA', q:'أعرف ما يستفزّني قبل أن ينفجر'},
      {t:'SA', q:'أُدرك تأثير مزاجي على الآخرين'},
      {t:'SA', q:'أعترف بأخطائي بصدق'},
      {t:'SM', q:'أتنفّس قبل الردّ على ما يستفزّني'},
      {t:'SM', q:'أُدير غضبي دون كبت أو انفجار'},
      {t:'SM', q:'أبقى مُنتجاً تحت الضغط'},
      {t:'SM', q:'أُغيّر تفسيري للموقف لأُحسّن مزاجي'},
      {t:'SOA', q:'أقرأ مشاعر الآخرين من تعابيرهم'},
      {t:'SOA', q:'أُلاحظ ديناميكية المجموعة وغير المعلَن'},
      {t:'SOA', q:'أتعاطف مع وجهة نظر مَن أختلف معه'},
      {t:'SOA', q:'أنتبه لتغيّر نبرة الزملاء وأسأل عنها'},
      {t:'REL', q:'أبني ثقة بسرعة مع الجدد'},
      {t:'REL', q:'أُحلّ الصراعات دون كسر العلاقة'},
      {t:'REL', q:'أُلهم الآخرين دون أوامر'},
      {t:'REL', q:'أُعطي ملاحظات صعبة بطريقة محترمة'}
    ],
    score: function(answers){
      var s = {SA:0,SM:0,SOA:0,REL:0}, n = {SA:0,SM:0,SOA:0,REL:0};
      this.items.forEach(function(it,i){
        var v = answers[i]; if (v==null) return;
        s[it.t] += v; n[it.t] += 1;
      });
      var labels = {SA:'الوعي الذاتي', SM:'إدارة الذات', SOA:'الوعي الاجتماعي', REL:'إدارة العلاقات'};
      var bars = Object.keys(s).map(function(k){
        var pct = n[k] ? Math.round((s[k]/(n[k]*5))*100) : 0;
        return { key: labels[k], pct: pct };
      });
      var weakest = bars.slice().sort(function(a,b){return a.pct-b.pct;})[0];
      return { bars: bars, recos: '<b>منطقة النموّ:</b> ' + weakest.key + ' (' + weakest.pct + '%). جرّب تمارين STOP و RULER في صفحة EQ.' };
    }
  };

  // ── Career Anchors (Schein, 16 items, 8 anchors) ──
  var ANCHORS = {
    id: 'anch', label: 'Career Anchors (16 سؤال)',
    intro: 'Edgar Schein (1990). ٨ مرابط: تقني/إداري/استقلال/أمان/ريادة/خدمة/تحدٍّ/أسلوب حياة.',
    likert: ['غير مهم','قليل الأهمية','محايد','مهم','حاسم'],
    items: [
      {t:'TF', q:'أن أكون مرجعاً تقنياً في تخصصي'},
      {t:'TF', q:'حلّ مشاكل تقنية يستمتع بها قليلون'},
      {t:'GM', q:'قيادة فريق كبير وتنسيق جهود متعددة'},
      {t:'GM', q:'الترقي إلى منصب إداري عالٍ'},
      {t:'AU', q:'أن أعمل بحريّة دون رقابة لصيقة'},
      {t:'AU', q:'أن أُحدّد أوقات عملي وطرائقي'},
      {t:'SE', q:'أمان وظيفي طويل مع راتب ثابت'},
      {t:'SE', q:'بيئة عمل مستقرة وقابلة للتنبؤ'},
      {t:'EN', q:'بناء شيء من الصفر يحمل اسمي'},
      {t:'EN', q:'تحمّل مخاطرة عالية لعائد كبير'},
      {t:'SV', q:'إحداث أثر إيجابي في المجتمع'},
      {t:'SV', q:'قِيَم العمل تُعنيني أكثر من الراتب'},
      {t:'CH', q:'مواجهة تحديات صعبة باستمرار'},
      {t:'CH', q:'الفوز على منافسين أقوياء'},
      {t:'LS', q:'توازن واضح بين العمل والحياة'},
      {t:'LS', q:'مرونة لخدمة عائلتي وصحتي'}
    ],
    score: function(answers){
      var labels = {
        TF:'تقني/وظيفي', GM:'إداري', AU:'استقلالية', SE:'أمان',
        EN:'ريادة', SV:'خدمة', CH:'تحدٍّ', LS:'أسلوب حياة'
      };
      var s = {}; Object.keys(labels).forEach(function(k){ s[k]=0; });
      this.items.forEach(function(it,i){
        var v = answers[i]; if (v==null) return;
        s[it.t] += v;
      });
      var arr = Object.keys(s).map(function(k){
        return { key: labels[k], pct: Math.round((s[k]/(2*5))*100), code:k };
      }).sort(function(a,b){return b.pct-a.pct;});
      var top2 = arr.slice(0,2).map(function(a){return a.key;}).join(' + ');
      var jobMap = {
        TF:'مهندس Senior · أخصائي تقني',
        GM:'مدير منتج · مدير عمليات',
        AU:'فريلانسر · استشاري',
        SE:'موظف حكومي · شركات كبرى مستقرة',
        EN:'مؤسس · شريك مؤسس',
        SV:'منظمة غير ربحية · تعليم · صحة',
        CH:'مبيعات صعبة · تقنية ناشئة',
        LS:'دور Hybrid · شركات Family-friendly'
      };
      var topCodes = arr.slice(0,2).map(function(a){return a.code;});
      return {
        bars: arr,
        recos: '<b>أعلى مرابطك:</b> ' + top2 + '. <br><b>وظائف ملائمة:</b> ' + topCodes.map(function(c){return jobMap[c];}).join(' / ')
      };
    }
  };

  // ── Stress Response Style (12 items, 4 patterns) ──
  var STRESS = {
    id: 'stress', label: 'Stress Style (12 سؤال)',
    intro: 'Cannon (1932) Fight/Flight + extensions. الأنماط: Fight · Flight · Freeze · Fawn.',
    likert: ['أبداً','نادراً','أحياناً','كثيراً','دائماً'],
    items: [
      {t:'FT', q:'تحت الضغط أُواجه وأرفع صوتي'},
      {t:'FT', q:'أتحدّى المسؤول إن شعرت بالظلم'},
      {t:'FT', q:'أحياناً أنفجر ثم أندم'},
      {t:'FL', q:'أتجنّب الصراعات بالانسحاب'},
      {t:'FL', q:'أُغلق هاتفي عند الضغط الشديد'},
      {t:'FL', q:'أبدأ بحثاً عن وظيفة أخرى عند أول مشكلة'},
      {t:'FZ', q:'أتجمّد ولا أعرف ماذا أفعل'},
      {t:'FZ', q:'أُؤجّل قرارات صعبة لفترات طويلة'},
      {t:'FZ', q:'أصمت تحت الضغط ولا أُعبّر'},
      {t:'FW', q:'أُوافق لأتجنّب إغضاب الآخرين'},
      {t:'FW', q:'أُهمل احتياجاتي لإرضاء فريقي'},
      {t:'FW', q:'أعتذر حتى لو لم أُخطئ'}
    ],
    score: function(answers){
      var s = {FT:0,FL:0,FZ:0,FW:0};
      this.items.forEach(function(it,i){
        var v = answers[i]; if (v==null) return;
        s[it.t] += v;
      });
      var labels = {FT:'Fight (مواجهة)', FL:'Flight (هروب)', FZ:'Freeze (تجمّد)', FW:'Fawn (إرضاء)'};
      var arr = Object.keys(s).map(function(k){
        return { key: labels[k], pct: Math.round((s[k]/(3*5))*100), code: k };
      }).sort(function(a,b){return b.pct-a.pct;});
      var top = arr[0].code;
      var coping = {
        FT:'تنفّس قبل الردّ. اسأل "هل هذا يستحق علاقة؟". اكتب قبل الإرسال.',
        FL:'لا تُغادر فوراً. حدد مهلة قبل القرار. ناقش مع شخص محايد.',
        FZ:'حرّك جسدك. اكتب الخيارات. اطلب وقتاً للرد لاحقاً.',
        FW:'تدرّب على "لا" بسيطة. ميّز بين الكرم والخوف.'
      };
      return { bars: arr, recos: '<b>نمطك السائد:</b> ' + labels[top] + '. <b>أداة coping:</b> ' + coping[top] };
    }
  };

  // ── Strengths Quick-Scan (12 items → top 3 of 12 themes) ──
  var STRENGTHS = {
    id: 'str', label: 'Strengths Quick-Scan (12 سؤال)',
    intro: 'مستوحى من Clifton/StrengthsFinder. كل سؤال يكشف نقطة قوة محتملة.',
    likert: ['لا تشبهني','قليلاً','محايد','كثيراً','تشبهني تماماً'],
    items: [
      {t:'ANALYZER',  q:'أُحلّل البيانات قبل أن أُقرّر'},
      {t:'ACHIEVER',  q:'أشعر بحاجة دائمة لإنهاء قائمة المهام'},
      {t:'STRATEGIC', q:'أرى أنماطاً وبدائل لا يراها الآخرون'},
      {t:'EMPATHY',   q:'أشعر بمشاعر الآخرين كأنها ملكي'},
      {t:'COMMUNICATOR', q:'أُحوّل الأفكار المعقدة إلى قصص مفهومة'},
      {t:'LEARNER',   q:'أستمتع باكتساب مهارات جديدة باستمرار'},
      {t:'POSITIVITY',q:'أُلهم الآخرين بحماستي وتفاؤلي'},
      {t:'RESPONSIBILITY', q:'أتحمّل ما أعد به حرفياً'},
      {t:'INCLUDER',  q:'أحرص على إشراك المُستبعَدين في فريقي'},
      {t:'COMMAND',   q:'أتولّى زمام المبادرة بسرعة'},
      {t:'HARMONY',   q:'أبحث عن نقاط الاتفاق وأُجنّب الصراع'},
      {t:'IDEATION',  q:'أُولّد أفكاراً جديدة باستمرار'}
    ],
    score: function(answers){
      var labels = {
        ANALYZER:'Analyzer · مُحلِّل',
        ACHIEVER:'Achiever · مُنجِز',
        STRATEGIC:'Strategic · استراتيجي',
        EMPATHY:'Empathy · مُتعاطف',
        COMMUNICATOR:'Communicator · مُتواصِل',
        LEARNER:'Learner · مُتعلِّم',
        POSITIVITY:'Positivity · إيجابي',
        RESPONSIBILITY:'Responsibility · مُلتزم',
        INCLUDER:'Includer · جامع',
        COMMAND:'Command · قائد',
        HARMONY:'Harmony · مُنسجم',
        IDEATION:'Ideation · مُبدع'
      };
      var s = {};
      this.items.forEach(function(it,i){
        var v = answers[i]; if (v==null) return;
        s[it.t] = v;
      });
      var arr = Object.keys(s).map(function(k){
        return { key: labels[k], pct: Math.round((s[k]/5)*100), code: k };
      }).sort(function(a,b){return b.pct-a.pct;});
      var top3 = arr.slice(0,3).map(function(a){return a.key;});
      return { bars: arr.slice(0,5), recos: '<b>أعلى ٣ نقاط قوة:</b> ' + top3.join(' · ') + '. <br><b>كيف تستخدمها:</b> اربط مهامك اليومية بنقطتك الأقوى.' };
    }
  };

  var TESTS = { bfi: BFI, disc: DISC, eq: EQ, anch: ANCHORS, stress: STRESS, str: STRENGTHS };

  function renderTest(t){
    var host = document.getElementById('w09tHost');
    if (!host) return;
    host.dataset.testActive = t.id;
    var likertHTML = function(idx){
      return '<div class="w09t-likert">' + t.likert.map(function(lab,j){
        return '<label><input type="radio" name="w09t_'+t.id+'_'+idx+'" value="'+(j+1)+'"> '+lab+'</label>';
      }).join('') + '</div>';
    };
    var fcHTML = function(opts, idx){
      return '<div class="w09t-fc">' + opts.map(function(o){
        return '<label class="w09t-fc-opt"><input type="radio" name="w09t_'+t.id+'_'+idx+'" value="'+o[0]+'"> '+o[1]+'</label>';
      }).join('') + '</div>';
    };
    var qHTML = (t.forced ? t.items : t.items).map(function(it, i){
      var qText = t.forced ? 'اختر الخيار الأقرب لك:' : it.q;
      var body = t.forced ? fcHTML(it, i) : likertHTML(i);
      return '<div class="w09t-q">'
        + '<div class="w09t-q-text"><small>'+(i+1)+'.</small>'+qText+'</div>'
        + body
        + '</div>';
    }).join('');

    host.innerHTML = ''
      + '<div class="w09t-intro">'
      +   '<h3>'+t.label+'</h3>'
      +   '<p>'+t.intro+'</p>'
      +   '<div class="w09t-meta"><span><b>عدد الأسئلة:</b>'+t.items.length+'</span><span><b>الزمن المتوقع:</b>~'+(Math.round(t.items.length*0.5))+' دقيقة</span></div>'
      + '</div>'
      + '<form id="w09tForm">'
      +   qHTML
      +   '<div class="w09t-progress"><div id="w09tBar"></div></div>'
      +   '<button type="submit" class="w09t-submit" id="w09tSubmit" disabled>احسب النتيجة</button>'
      + '</form>'
      + '<div id="w09tOut"></div>';

    var form = host.querySelector('#w09tForm');
    var bar  = host.querySelector('#w09tBar');
    var btn  = host.querySelector('#w09tSubmit');
    var out  = host.querySelector('#w09tOut');

    form.addEventListener('change', function(){
      var fd = new FormData(form);
      var n = 0;
      for (var k of fd.keys()){
        if (k.indexOf('w09t_'+t.id+'_') === 0){
          // count distinct names
        }
      }
      // proper counting:
      var answered = new Set();
      Array.from(fd.entries()).forEach(function(e){ answered.add(e[0]); });
      var total = t.items.length;
      var pct = Math.round((answered.size / total) * 100);
      bar.style.width = pct + '%';
      btn.disabled = answered.size < total;
    });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var fd = new FormData(form);
      var answers = [];
      for (var i=0;i<t.items.length;i++){
        var v = fd.get('w09t_'+t.id+'_'+i);
        answers[i] = v == null ? null : (t.forced ? v : parseInt(v,10));
      }
      var res = t.score(answers);
      var bars = res.bars.map(function(b){
        return '<div class="w09t-bar-row">'
          + '<label>'+b.key+'</label>'
          + '<div class="w09t-bar"><div style="width:'+Math.max(2,b.pct)+'%;"></div></div>'
          + '<b>'+b.pct+'%</b>'
          + '</div>';
      }).join('');
      out.innerHTML = ''
        + '<div class="w09t-result">'
        +   '<h4>📊 نتيجة '+t.label+'</h4>'
        +   '<div class="w09t-bars">'+bars+'</div>'
        +   '<div class="w09t-recos">'+res.recos+'</div>'
        + '</div>';

      var all = load();
      all[t.id] = { ts: Date.now(), label: t.label, bars: res.bars, recos: res.recos };
      save(all);
      out.scrollIntoView({behavior:'smooth', block:'center'});
    });
  }

  function init(){
    var tabs = document.getElementById('w09tTabs');
    if (!tabs) return;
    if (tabs.dataset.w09Inited === '1') return;
    tabs.dataset.w09Inited = '1';

    renderTest(TESTS.bfi);

    tabs.addEventListener('click', function(e){
      var t = e.target.closest('.w09t-tab'); if (!t) return;
      tabs.querySelectorAll('.w09t-tab').forEach(function(x){ x.classList.remove('active'); });
      t.classList.add('active');
      var id = t.getAttribute('data-test');
      if (TESTS[id]) renderTest(TESTS[id]);
    });

    var resetBtn = document.getElementById('w09tReset');
    var exportBtn = document.getElementById('w09tExport');
    var sumBox = document.getElementById('w09tSummary');
    var sumBody = document.getElementById('w09tSummaryBody');

    resetBtn.addEventListener('click', function(){
      if (!confirm('مسح جميع نتائج الاختبارات النفسية محلياً؟')) return;
      try { localStorage.removeItem(STORAGE); } catch(e){}
      sumBox.hidden = true;
      alert('تم المسح.');
    });

    exportBtn.addEventListener('click', function(){
      var all = load();
      if (!Object.keys(all).length){ alert('لا توجد نتائج محفوظة بعد.'); return; }
      var lines = ['📋 ملخص نتائج Self-Diagnostic Suite — ' + new Date().toLocaleString('ar')];
      Object.keys(all).forEach(function(k){
        var r = all[k];
        lines.push('');
        lines.push('· ' + r.label);
        r.bars.forEach(function(b){ lines.push('  - ' + b.key + ': ' + b.pct + '%'); });
      });
      var txt = lines.join('\n');
      sumBody.textContent = txt;
      sumBox.hidden = false;
      try {
        navigator.clipboard.writeText(txt).then(function(){
          exportBtn.textContent = '✅ نُسخ للحافظة';
          setTimeout(function(){ exportBtn.textContent = '📋 نسخ ملخص النتائج'; }, 1600);
        });
      } catch(e){}
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="psych"]');
    if (t) setTimeout(init, 80);
  });
})();



/* ═══════════════════════════════════════════════════════════════════════
   WORKER 09 · PHASE 4 — Psych Insets (cross-page micro-cards)
   Injects 3 insets per target page after its .page-header (idempotent).
═══════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  var INSETS = {
    'page-fieldsales': [
      { name:'Reciprocity', src:'Cialdini · Influence (1984)',
        apply:'يطبّق هنا في: <b>عرض عينة مجانية أو نصيحة قبل الطلب</b>.',
        warn:'لا تحوّله manipulation — العطاء بشرط = ابتزاز ناعم.' },
      { name:'Anchoring', src:'Tversky &amp; Kahneman (1974)',
        apply:'يطبّق هنا في: <b>عرض السعر الأعلى أولاً ثم النزول</b>.',
        warn:'لا تستخدم أرقاماً وهمية — يكشف العميل ويفقد الثقة دائماً.' },
      { name:'Loss Aversion', src:'Kahneman · Thinking Fast and Slow',
        apply:'يطبّق هنا في: <b>تأطير الفرصة كخسارة لو لم يقرر</b>.',
        warn:'الإفراط في "إذا لم تشترِ ستخسر" يخلق scarcity سامّ.' }
    ],
    'page-callcenter': [
      { name:'Active Listening', src:'Carl Rogers · Client-Centered Therapy',
        apply:'يطبّق هنا في: <b>إعادة الصياغة قبل الردّ — Mirror &amp; Label</b>.',
        warn:'تكرار حرفي يصبح مزعجاً — أعد صياغة بكلماتك.' },
      { name:'Mirror Neurons', src:'Rizzolatti (1996)',
        apply:'يطبّق هنا في: <b>نبرتك الهادئة تُعدي العميل الغاضب</b>.',
        warn:'إذا تشاركت غضبه — تُضاعفه.' },
      { name:'Empathy Loop', src:'Brené Brown · Atlas of the Heart',
        apply:'يطبّق هنا في: <b>أُسمّي شعوره قبل أن أحلّ مشكلته</b>.',
        warn:'حلّ بدون تعاطف = إهانة في نظر العميل.' }
    ],
    'page-hrmastery': [
      { name:'BATNA', src:'Fisher &amp; Ury · Getting to Yes',
        apply:'يطبّق هنا في: <b>أعرف بديلي قبل دخول المفاوضة — قوّة صامتة</b>.',
        warn:'لا تكشف BATNA إلا في اللحظة الحرجة.' },
      { name:'Anchoring (Salary)', src:'Galinsky · First Offer Effect',
        apply:'يطبّق هنا في: <b>اطرح رقمك أولاً عند تساوي المعلومات</b>.',
        warn:'كن مستعداً بالتبرير — رقم بلا سرد ضعيف.' },
      { name:'Strategic Silence', src:'Voss · Never Split the Difference',
        apply:'يطبّق هنا في: <b>اصمت بعد عرضك — يملأ المُحاوِر الفراغ بقربك أنت</b>.',
        warn:'الصمت > 8 ثوانٍ يُصبح غير مريح — استخدم 4-6 ثوانٍ.' }
    ],
    'page-programming': [
      { name:'Imposter Syndrome', src:'Clance &amp; Imes (1978)',
        apply:'يطبّق هنا في: <b>"سيكتشفون أني لا أستحق" — اكتب ٣ إنجازات حقيقية</b>.',
        warn:'الاعتقاد بأنه شخصي — ٧٠٪+ من المهنيين يعيشونه.' },
      { name:'Flow State', src:'Csikszentmihalyi · Flow (1990)',
        apply:'يطبّق هنا في: <b>كتلة وقت 90 دقيقة بلا إشعارات = إنتاجية ٣x</b>.',
        warn:'الانقطاع المتكرر يكسر flow — يحتاج 23 دقيقة لعودته.' },
      { name:'Cognitive Load', src:'Sweller (1988)',
        apply:'يطبّق هنا في: <b>قسّم المهمة لخطوات ≤ 7 — حدّ الذاكرة العاملة</b>.',
        warn:'لا تخلط بين تعلّم مفهوم جديد وكتابة كود إنتاجي.' }
    ],
    'page-accounting': [
      { name:'Cognitive Load', src:'Sweller (1988)',
        apply:'يطبّق هنا في: <b>افصل بين تسجيل القيد والتحقق من الميزان</b>.',
        warn:'الخلط بين المهمتين يضاعف الأخطاء البسيطة.' },
      { name:'Attention Residue', src:'Leroy (2009)',
        apply:'يطبّق هنا في: <b>أنهِ تقرير قبل بدء آخر — تركيز كامل</b>.',
        warn:'التنقل بين 3 ملفات Excel = خطأ يومي على الأقل.' },
      { name:'Anchoring', src:'Kahneman &amp; Tversky',
        apply:'يطبّق هنا في: <b>أرقام السنة الماضية تُلوّن توقعات السنة الحالية</b>.',
        warn:'استخدم zero-based budgeting كل سنتين لكسر المرساة.' }
    ],
    'page-phonerepair': [
      { name:'Customer Anger', src:'McKee · The Story Brand',
        apply:'يطبّق هنا في: <b>الزبون لا يكره الإصلاح — يكره الفقد</b>.',
        warn:'لا تشرح تقنياً قبل تعاطف — يزيد الغضب.' },
      { name:'Trust by Transparency', src:'Mayer · Trust Model',
        apply:'يطبّق هنا في: <b>أوضح قطعة الغيار + سعرها قبل البدء</b>.',
        warn:'الشفافية الناقصة = شك دائم حتى بعد الإصلاح الجيد.' },
      { name:'Reactance', src:'Brehm (1966)',
        apply:'يطبّق هنا في: <b>لا تُجبر الزبون — قدّم خيارين</b>.',
        warn:'كل أمر مباشر يُولّد مقاومة — حتى لو كان الأفضل له.' }
    ],
    'page-social': [
      { name:'Variable Reward', src:'Skinner · Operant Conditioning',
        apply:'يطبّق هنا في: <b>التطبيقات تُكافئ بشكل عشوائي — يُدمن الفحص</b>.',
        warn:'عند صنع المحتوى — استخدمها بأخلاق، لا تستغل ضعف الناس.' },
      { name:'Information Gap', src:'Loewenstein (1994)',
        apply:'يطبّق هنا في: <b>عناوين تخلق فجوة معرفية = نقرات</b>.',
        warn:'إذا لم تسدّ الفجوة في المحتوى = clickbait يُفقد ثقة.' },
      { name:'Negativity Bias', src:'Baumeister · Bad is Stronger Than Good',
        apply:'يطبّق هنا في: <b>محتوى سلبي ينتشر أسرع — مسؤولية أخلاقية</b>.',
        warn:'إساءة استخدامه = مساهمة في تسميم الفضاء العام.' }
    ]
  };

  function buildCard(inset){
    var d = document.createElement('div');
    d.className = 'w09i-card';
    d.innerHTML = ''
      + '<div class="w09i-card-head">PSYCH INSET</div>'
      + '<h5>' + inset.name + '</h5>'
      + '<div class="w09i-card-src">' + inset.src + '</div>'
      + '<div class="w09i-card-apply">' + inset.apply + '</div>'
      + '<div class="w09i-card-warn">⚠️ ' + inset.warn + '</div>'
      + '<a href="#" class="w09i-card-link" data-w09i-link>اقرأ المزيد في صفحة Psychology</a>';
    return d;
  }

  function injectInto(pageId){
    var page = document.getElementById(pageId);
    if (!page) return;
    if (page.dataset.w09Insets === '1') return;
    var list = INSETS[pageId];
    if (!list || !list.length) return;

    var header = page.querySelector('.page-header');
    var mount = document.createElement('div');
    mount.className = 'w09i-mount';
    mount.setAttribute('data-w09-inset-mount', pageId);
    list.forEach(function(it){ mount.appendChild(buildCard(it)); });

    if (header && header.nextSibling){
      header.parentNode.insertBefore(mount, header.nextSibling);
    } else {
      page.insertBefore(mount, page.firstChild);
    }
    page.dataset.w09Insets = '1';
  }

  function injectAll(){
    Object.keys(INSETS).forEach(injectInto);
  }

  // Cross-link: clicking inset opens psych page
  document.addEventListener('click', function(e){
    var lnk = e.target.closest && e.target.closest('[data-w09i-link]');
    if (lnk){
      e.preventDefault();
      if (typeof window.navigateTo === 'function'){
        window.navigateTo('psych');
      } else {
        var p = document.getElementById('page-psych');
        if (p) p.scrollIntoView({behavior:'smooth'});
      }
    }
  });

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', injectAll);
  } else { injectAll(); }
})();



/* ═══════════════════════════════════════════════════════════════════════
   WORKER 09 · PHASE 5 — Therapist Bridge + Insights Engine
═══════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var STORAGE = 'upg_psych_results';
  var MOOD = 'upg_mood_log';

  function load(){ try { return JSON.parse(localStorage.getItem(STORAGE) || '{}'); } catch(e){ return {}; } }
  function loadMood(){ try { return JSON.parse(localStorage.getItem(MOOD) || '[]'); } catch(e){ return []; } }

  function genSnapshot(){
    var all = load();
    var mood = loadMood();
    if (!Object.keys(all).length && !mood.length){
      return '⚠️ لا توجد نتائج محفوظة بعد. أكمل اختباراً واحداً على الأقل من Self-Diagnostic Suite، ثم عُد.';
    }
    var d = new Date();
    var lines = [];
    lines.push('📋 Self-Report Snapshot — ' + d.toLocaleDateString('ar') + ' ' + d.toLocaleTimeString('ar', {hour:'2-digit', minute:'2-digit'}));
    lines.push('═'.repeat(40));
    Object.keys(all).forEach(function(k){
      var r = all[k];
      lines.push('');
      lines.push('• ' + r.label);
      r.bars.slice(0,5).forEach(function(b){ lines.push('  - ' + b.key + ': ' + b.pct + '%'); });
    });
    if (mood.length){
      var last7 = mood.filter(function(m){ return (Date.now() - m.t) < 7*24*60*60*1000; });
      var zoneCounts = {red:0, yellow:0, blue:0, green:0};
      last7.forEach(function(m){ zoneCounts[m.zone] = (zoneCounts[m.zone] || 0) + 1; });
      lines.push('');
      lines.push('• Mood Meter — آخر ٧ أيام (' + last7.length + ' تسجيل)');
      Object.keys(zoneCounts).forEach(function(z){
        var name = ({red:'حمراء',yellow:'صفراء',blue:'زرقاء',green:'خضراء'})[z];
        if (zoneCounts[z]) lines.push('  - ' + name + ': ' + zoneCounts[z]);
      });
    }
    lines.push('');
    lines.push('— أسئلة لجلستك القادمة:');
    lines.push('  1) أي نمط يراه اختصاصيك في النتائج؟');
    lines.push('  2) أين تتعارض القيم مع السلوك؟');
    lines.push('  3) ما الفعل الصغير الذي يُحدِث فرقاً هذا الأسبوع؟');
    return lines.join('\n');
  }

  function analyze(){
    var all = load();
    var mood = loadMood();
    var out = document.getElementById('w09fInsightsOut');
    if (!out) return;
    if (!Object.keys(all).length){
      out.innerHTML = '<p class="w09f-empty">لا توجد نتائج بعد. ابدأ باختبار Big Five.</p>';
      return;
    }
    var html = '';

    // Pattern: highest dim across BFI
    if (all.bfi && all.bfi.bars){
      var top = all.bfi.bars.slice().sort(function(a,b){return b.pct - a.pct;})[0];
      html += '<div class="w09f-pattern strength"><b>قوّة بارزة:</b> ' + top.key + ' (' + top.pct + '%) — استثمرها في الأدوار التي تُكثر استخدامها.</div>';
    }
    // Match: top DISC
    if (all.disc && all.disc.bars){
      var topD = all.disc.bars.slice().sort(function(a,b){return b.pct-a.pct;})[0];
      html += '<div class="w09f-pattern match"><b>نمط تواصل:</b> ' + topD.key + '. تواصل مع زملائك بطريقة تُلائم نمطهم لا نمطك فقط.</div>';
    }
    // Growth: weakest EQ axis
    if (all.eq && all.eq.bars){
      var lowE = all.eq.bars.slice().sort(function(a,b){return a.pct-b.pct;})[0];
      html += '<div class="w09f-pattern growth"><b>منطقة نموّ:</b> ' + lowE.key + ' (' + lowE.pct + '%). جرّب تمارين RULER يومياً لمدة أسبوعين.</div>';
    }
    // Career match
    if (all.anch && all.anch.bars){
      var topA = all.anch.bars.slice(0,2).map(function(a){return a.key;}).join(' + ');
      html += '<div class="w09f-pattern match"><b>توافق وظيفي:</b> ' + topA + '. اختر فرصاً تُغذّي هذين المرسَيَين معاً.</div>';
    }
    // Stress
    if (all.stress && all.stress.bars){
      var topS = all.stress.bars[0];
      html += '<div class="w09f-pattern growth"><b>نمط الضغط:</b> ' + topS.key + '. تعرّف على إشاراتك المبكرة قبل أن تتصاعد.</div>';
    }
    // Strengths combo
    if (all.str && all.str.bars){
      var top3 = all.str.bars.slice(0,3).map(function(b){return b.key;}).join(' · ');
      html += '<div class="w09f-pattern strength"><b>أعلى ٣ نقاط قوة:</b> ' + top3 + '. اربط أهم مهامك بهذه القوى.</div>';
    }
    // Mood pattern
    if (mood && mood.length >= 3){
      var last7 = mood.filter(function(m){ return (Date.now() - m.t) < 7*24*60*60*1000; });
      if (last7.length){
        var zCount = {red:0, yellow:0, blue:0, green:0};
        last7.forEach(function(m){ zCount[m.zone] = (zCount[m.zone] || 0) + 1; });
        var domZone = Object.keys(zCount).sort(function(a,b){return zCount[b]-zCount[a];})[0];
        var zMap = {
          red:'الأسبوع كان مشحوناً بمشاعر مرتفعة الطاقة سلبية. جرّب Box Breathing يومياً.',
          yellow:'أسبوع نشِط إيجابي. حافظ عليه عبر النوم المنتظم.',
          blue:'أسبوع يميل للهبوط — راجع نومك ونشاطك البدني.',
          green:'أسبوع هادئ راضٍ — استثمره في تخطيط استراتيجي.'
        };
        html += '<div class="w09f-pattern"><b>نمط مزاج الأسبوع:</b> ' + zMap[domZone] + '</div>';
      }
    }
    // Cross pattern: high N + low SM = high overwhelm risk
    if (all.bfi && all.eq){
      var nObj = all.bfi.bars.find(function(b){return b.key.indexOf('عصابية')>-1;});
      var smObj = all.eq.bars.find(function(b){return b.key.indexOf('إدارة الذات')>-1;});
      if (nObj && smObj && nObj.pct > 65 && smObj.pct < 55){
        html += '<div class="w09f-pattern growth"><b>تنبيه نمطي:</b> عصابية مرتفعة + إدارة ذات منخفضة = خطر إجهاد. ركّز على RULER وممارسة يومية.</div>';
      }
    }

    if (!html) html = '<p class="w09f-empty">أكمِل المزيد من الاختبارات لتفعيل تحليل أعمق.</p>';
    out.innerHTML = html;
  }

  function init(){
    var gen = document.getElementById('w09fGen');
    if (!gen || gen.dataset.w09Inited === '1') return;
    gen.dataset.w09Inited = '1';

    var ta = document.getElementById('w09fSnapshot');
    var copy = document.getElementById('w09fCopy');
    var analyze1 = document.getElementById('w09fAnalyze');

    gen.addEventListener('click', function(){ ta.value = genSnapshot(); });
    copy.addEventListener('click', function(){
      if (!ta.value || ta.value.indexOf('اضغط') === 0){ alert('ولّد الملخص أولاً.'); return; }
      try {
        navigator.clipboard.writeText(ta.value).then(function(){
          copy.textContent = '✅ نُسخ';
          setTimeout(function(){ copy.textContent = '📋 نسخ'; }, 1400);
        });
      } catch(e){
        ta.select();
        document.execCommand('copy');
        copy.textContent = '✅ نُسخ';
        setTimeout(function(){ copy.textContent = '📋 نسخ'; }, 1400);
      }
    });
    if (analyze1) analyze1.addEventListener('click', analyze);
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="psych"]');
    if (t) setTimeout(init, 80);
  });
})();



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Sovereign Theme Engine (Worker 11 / Phase 1)
   3-state: auto | dark | light  +  prefers-color-scheme listener
   Public API: window.Upg.theme.{ get, set, cycle, resolve }
   Wraps existing window.toggleTheme so legacy onclick keeps working.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const KEY = 'upg_theme';
  const LEGACY_KEY = 'v12_theme';
  const ORDER = ['auto', 'dark', 'light'];
  const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: light)') : null;

  const resolve = (mode) => {
    if (mode === 'auto') return (mq && mq.matches) ? 'light' : 'dark';
    return mode === 'light' ? 'light' : 'dark';
  };

  const applyDOM = (mode) => {
    const actual = resolve(mode);
    const root = document.documentElement;
    const body = document.body;
    if (root) root.dataset.theme = actual;
    if (body) {
      if (actual === 'light') body.setAttribute('data-theme', 'light');
      else                    body.removeAttribute('data-theme');
      body.setAttribute('data-theme-mode', mode);
    }
    // Update browser UI color
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    const cs = body ? getComputedStyle(body) : null;
    let bg = cs ? cs.getPropertyValue('--color-bg').trim() : '';
    if (!bg) bg = (actual === 'light' ? '#FAFAF9' : '#0E1220');
    meta.setAttribute('content', bg);
    // Notify listeners (Phase 5 cmdk + Phase 6 dashboard listen)
    try {
      window.dispatchEvent(new CustomEvent('upg:theme-change', { detail: { mode, actual } }));
    } catch (e) {}
  };

  const apply = (mode) => {
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      try { document.startViewTransition(() => applyDOM(mode)); return; } catch (e) {}
    }
    applyDOM(mode);
  };

  const get = () => {
    try {
      const v = localStorage.getItem(KEY);
      if (v && ORDER.includes(v)) return v;
      // Migrate from legacy v12_theme: 'light' -> 'light'; anything else keep 'auto'
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy === 'light') { localStorage.setItem(KEY, 'light'); return 'light'; }
      if (legacy === 'dark')  { localStorage.setItem(KEY, 'dark');  return 'dark';  }
    } catch (e) {}
    return 'auto';
  };
  const set = (mode) => {
    if (!ORDER.includes(mode)) return;
    try { localStorage.setItem(KEY, mode); } catch (e) {}
    apply(mode);
  };
  const cycle = () => set(ORDER[(ORDER.indexOf(get()) + 1) % ORDER.length]);

  // Initial apply (must run before paint to avoid flash)
  apply(get());

  // System change listener — only effective when mode === 'auto'
  if (mq && mq.addEventListener) {
    mq.addEventListener('change', () => { if (get() === 'auto') apply('auto'); });
  } else if (mq && mq.addListener) {
    mq.addListener(() => { if (get() === 'auto') apply('auto'); });
  }

  // Wire any explicit toggle hooks (data-action="toggle-theme")
  const wireToggles = () => {
    document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
      if (btn.__upgThemeBound) return;
      btn.__upgThemeBound = true;
      btn.addEventListener('click', (e) => {
        // Prevent the legacy inline onclick from also running
        if (typeof btn.onclick === 'function' && !btn.__upgThemeOverride) {
          btn.__upgThemeOverride = true;
        }
        e.stopPropagation();
        cycle();
      }, true);
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireToggles);
  } else {
    wireToggles();
  }

  // Override legacy global toggleTheme so it cycles 3-state
  // (legacy was 2-state: light <-> dark; we extend to auto -> dark -> light)
  const legacyToggle = window.toggleTheme;
  window.toggleTheme = function () {
    cycle();
  };
  // Keep legacy applyTheme working (callable with 'light'|'dark')
  const legacyApply = window.applyTheme;
  window.applyTheme = function (theme) {
    if (theme === 'light' || theme === 'dark') set(theme);
    else if (typeof legacyApply === 'function') legacyApply(theme);
  };

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.theme = { get, set, cycle, resolve };
})();



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Icon Auto-Mount + Migrator (Worker 11 / Phase 2)
   Component: <i class="qi" data-icon="NAME"></i>
   On boot: walks UI surfaces and converts emoji/legacy SVGs to .qi.
   Public API: window.Upg.icons.{ render, renderAll, registry }
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const SPRITE_ID = 'icon-sprite';
  const symbolExists = (name) => !!document.getElementById(`icon-${name}`);

  const render = (el) => {
    if (!el || el.__qiRendered) return;
    const name = el.dataset.icon;
    if (!name) return;
    if (!symbolExists(name)) {
      // Quiet fallback: render a small dot so layout doesn't collapse
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="2"/></svg>';
      el.dataset.iconFallback = '1';
      return;
    }
    el.innerHTML = `<svg aria-hidden="true" focusable="false"><use href="#icon-${name}"/></svg>`;
    el.__qiRendered = true;
  };

  const renderAll = (root) => {
    root = root || document;
    if (!root.querySelectorAll) return;
    root.querySelectorAll('.qi[data-icon]').forEach(render);
  };

  // ── Emoji → icon name map (for the migrator) ──────────────────
  const EMOJI_MAP = {
    '👋':'sparkles','✨':'sparkles','⭐':'star','🌟':'star','🏆':'trophy',
    '🔍':'search','🔎':'search','🔔':'bell','📩':'message-square','📨':'message-square','💬':'message-square',
    '⚙️':'settings','🛠️':'wrench','🔧':'wrench','📁':'layers','📂':'layers',
    '📞':'phone','📱':'phone','🎧':'headphones','🎤':'mic','🎙️':'mic',
    '💼':'briefcase','📊':'bar-chart','📈':'trending-up','📉':'trending-down','📐':'line-chart','📏':'line-chart',
    '💰':'dollar-sign','💵':'dollar-sign','💸':'dollar-sign',
    '⏱️':'clock','⏰':'clock','🕐':'clock','📅':'calendar','🗓️':'calendar',
    '🎯':'target','🚀':'rocket','🔥':'fire','⚡':'zap','💡':'sparkles',
    '🔬':'flask-conical','🧪':'flask-conical','📚':'book-open','📖':'book-open','📘':'book-open',
    '🎓':'graduation-cap','🏅':'award','🥇':'award','🎖️':'award',
    '✅':'check-circle','✔️':'check','❌':'x-circle','⚠️':'alert-triangle','ℹ️':'info','❓':'help-circle','❔':'help-circle',
    '🔒':'lock','🔓':'unlock','🔑':'key','🛡️':'shield',
    '▶️':'play','⏸️':'pause','⏯️':'play','🔊':'volume-2','🔇':'volume-x',
    '📋':'copy','💾':'save','✏️':'edit','🗑️':'trash','👁️':'eye','🙈':'eye-off',
    '🔄':'refresh','♻️':'refresh','📤':'upload','📥':'download','🔗':'external-link',
    '➕':'plus','➖':'minus',
    '🧠':'brain','💚':'heart-handshake','❤️':'heart-handshake','🤝':'heart-handshake',
    '📱':'phone',
    '📸':'image','🖼️':'image',
    '👨‍💼':'user-tie','👩‍💼':'user-tie',
    '📺':'youtube','🎬':'youtube'
  };

  // Strip a leading emoji from text (used to clean header titles after icon insertion)
  const LEADING_EMOJI_RE = /^\s*([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{2700}-\u{27BF}](?:\uFE0F)?(?:\u200D[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}](?:\uFE0F)?)*)\s*/u;
  const TRAILING_EMOJI_RE = /\s*([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{2700}-\u{27BF}](?:\uFE0F)?(?:\u200D[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}](?:\uFE0F)?)*)\s*$/u;

  // ── Migrator: nav-items (replace inline <svg.nav-icon> with .qi) ───
  const NAV_ICON_MAP = {
    'dashboard': 'layout-dashboard',
    'callcenter': 'phone',
    'fieldsales': 'briefcase',
    'accountmgr': 'user-tie',
    'social': 'megaphone',
    'lab': 'flask-conical',
    'psych': 'brain',
    'eq': 'heart-handshake',
    'negotiation': 'gauge',
    'customercare': 'headphones',
    'programming': 'code',
    'accounting': 'calculator',
    'phonerepair': 'wrench',
    'hrmastery': 'briefcase'
  };

  const migrateNav = () => {
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      if (item.__qiNavMigrated) return;
      const page = item.dataset.page;
      const iconName = NAV_ICON_MAP[page];
      if (!iconName) return;
      const svg = item.querySelector('svg.nav-icon');
      if (!svg) return;
      const i = document.createElement('i');
      i.className = 'qi qi-md nav-icon';
      i.setAttribute('data-icon', iconName);
      svg.replaceWith(i);
      render(i);
      item.__qiNavMigrated = true;
    });
  };

  // ── Migrator: page headers — strip trailing/leading emoji from h1, prepend .qi ───
  const PAGE_ICON_MAP = {
    'page-dashboard':   'layout-dashboard',
    'page-callcenter':  'phone',
    'page-fieldsales':  'briefcase',
    'page-accountmgr':  'user-tie',
    'page-social':      'megaphone',
    'page-lab':         'flask-conical',
    'page-psych':       'brain',
    'page-eq':          'heart-handshake',
    'page-negotiation': 'gauge',
    'page-customercare':'headphones',
    'page-programming': 'code',
    'page-accounting':  'calculator',
    'page-phonerepair': 'wrench',
    'page-hrmastery':   'briefcase'
  };

  const migratePageHeaders = () => {
    document.querySelectorAll('section.page').forEach(page => {
      const iconName = PAGE_ICON_MAP[page.id];
      if (!iconName) return;
      const header = page.querySelector('.page-header');
      if (!header || header.__qiHeaderMigrated) return;
      const h1 = header.querySelector('h1');
      if (!h1) return;
      // Strip trailing emoji like 👋 in dashboard
      let txt = h1.textContent || '';
      const before = txt;
      txt = txt.replace(TRAILING_EMOJI_RE, '').replace(LEADING_EMOJI_RE, '').trim();
      if (txt && txt !== before) h1.textContent = txt;
      // Prepend an icon if not already present
      if (!header.querySelector(':scope > .qi')) {
        const i = document.createElement('i');
        i.className = 'qi qi-2xl';
        i.setAttribute('data-icon', iconName);
        i.style.marginInlineEnd = '12px';
        i.style.color = 'var(--accent)';
        h1.prepend(i, document.createTextNode(' '));
        render(i);
      }
      header.__qiHeaderMigrated = true;
    });
  };

  // ── Migrator: inline buttons & chips (only obvious leading emoji) ───
  const ALLOW_TAGS = new Set(['BUTTON','A','SPAN','LI','TD','TH','LABEL','SUMMARY','DIV']);
  const SAFE_CONTAINERS = '.btn, button, .nav-item-action, .stat-label, .acc-eyebrow, .ql-eyebrow, .qcard-eyebrow, .filter-chip, .pill, .badge';
  const migrateLeadingEmojis = () => {
    let count = 0;
    document.querySelectorAll(SAFE_CONTAINERS).forEach(el => {
      if (el.__qiEmojiMigrated) return;
      // Only operate on a direct leading text node
      const first = el.firstChild;
      if (!first || first.nodeType !== 3) return;
      const m = first.nodeValue.match(LEADING_EMOJI_RE);
      if (!m) return;
      const emoji = m[1];
      const iconName = EMOJI_MAP[emoji];
      if (!iconName || !symbolExists(iconName)) return;
      // Strip the emoji and the immediate whitespace from the text node
      first.nodeValue = first.nodeValue.replace(LEADING_EMOJI_RE, '');
      const i = document.createElement('i');
      i.className = 'qi';
      i.setAttribute('data-icon', iconName);
      i.style.marginInlineEnd = '0.4em';
      el.insertBefore(i, first);
      render(i);
      el.__qiEmojiMigrated = true;
      count++;
    });
    return count;
  };

  const runAll = () => {
    if (!document.getElementById(SPRITE_ID)) {
      console.warn('[Upg.icons] sprite missing — abort migration');
      return;
    }
    renderAll();
    migrateNav();
    migratePageHeaders();
    migrateLeadingEmojis();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAll);
  } else {
    runAll();
  }

  // Future additions (lazy-loaded pages, dynamic UI)
  const mo = new MutationObserver((muts) => {
    let dirty = false;
    for (const m of muts) {
      for (const n of m.addedNodes) {
        if (n.nodeType !== 1) continue;
        if (n.classList && n.classList.contains('qi')) { render(n); dirty = true; }
        if (n.querySelectorAll) renderAll(n);
      }
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  window.Upg = window.Upg || {};
  window.Upg.icons = { render, renderAll, registry: NAV_ICON_MAP, emojiMap: EMOJI_MAP };
})();



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Entry Gateway (Worker 11 / Phase 3)
   First-run onboarding (4 steps), returning welcome, PIN lock, idle auto-lock.
   Public API: window.Upg.gateway.{ open, close, lock }
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));

  const SALT = '|salt-cathedral-v14';

  const sha256Hex = async (text) => {
    if (!crypto || !crypto.subtle) return null;
    const buf = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const STORE = {
    profile: () => { try { return JSON.parse(localStorage.getItem('upg_user_profile') || 'null'); } catch (e) { return null; } },
    setProfile: (p) => { try { localStorage.setItem('upg_user_profile', JSON.stringify(p)); } catch (e) {} },
    pinHash: () => { try { return localStorage.getItem('upg_pin_hash'); } catch (e) { return null; } },
    setPin: async (pin) => {
      const h = await sha256Hex(pin + SALT);
      if (h) { try { localStorage.setItem('upg_pin_hash', h); } catch (e) {} }
    },
    clearPin: () => { try { localStorage.removeItem('upg_pin_hash'); } catch (e) {} },
    verifyPin: async (pin) => {
      const stored = STORE.pinHash();
      if (!stored) return true;
      const h = await sha256Hex(pin + SALT);
      return h === stored;
    },
    onboardingDone: () => { try { return localStorage.getItem('upg_onboarding_done') === 'true'; } catch (e) { return false; } },
    setOnboardingDone: () => { try { localStorage.setItem('upg_onboarding_done', 'true'); } catch (e) {} },
    lockOnIdle: () => { try { return localStorage.getItem('upg_lock_on_idle') === 'true'; } catch (e) { return false; } },
  };

  const ONBOARDING_FLOW = ['welcome', 'identity', 'goal', 'privacy'];
  let currentStage = 'welcome';
  let selectedAvatar = null;
  let pinBuffer = '';
  let failedAttempts = 0;
  let idleTimer = null;

  const gw = $('#page-gateway');
  if (!gw) return;

  const showStage = (name) => {
    $$('.gateway-stage', gw).forEach(s => { s.hidden = (s.dataset.stage !== name); });
    currentStage = name;
    // Auto-focus first interactive element
    const focusable = gw.querySelector(`.gateway-stage[data-stage="${name}"] input, .gateway-stage[data-stage="${name}"] button`);
    if (focusable) try { focusable.focus({ preventScroll: true }); } catch (e) {}
  };

  const open = (stage) => {
    gw.hidden = false;
    gw.setAttribute('aria-hidden', 'false');
    document.body.dataset.gatewayOpen = 'true';
    showStage(stage || 'welcome');
  };
  const close = () => {
    gw.hidden = true;
    gw.setAttribute('aria-hidden', 'true');
    delete document.body.dataset.gatewayOpen;
  };

  // ─── Avatar grid ───
  const avatarColors = [
    'hsl(176 100% 70%)', 'hsl(280 80% 65%)', 'hsl(38 92% 60%)',
    'hsl(152 70% 55%)',  'hsl(0 80% 65%)',   'hsl(210 90% 65%)',
    'hsl(330 80% 65%)',  'hsl(60 80% 55%)',  'hsl(180 60% 55%)',
    'hsl(15 80% 60%)'
  ];
  const avatarGrid = $('.gateway-avatar-grid', gw);
  if (avatarGrid && !avatarGrid.children.length) {
    avatarColors.forEach((c, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.style.background = c;
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', `لون ${i + 1}`);
      b.addEventListener('click', () => {
        avatarGrid.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', 'true');
        selectedAvatar = c;
      });
      avatarGrid.appendChild(b);
    });
    selectedAvatar = avatarColors[0];
    avatarGrid.firstChild.setAttribute('aria-pressed', 'true');
  }

  // ─── Numpad ───
  const numpad = $('.gateway-numpad', gw);
  const updatePinDots = () => {
    $$('.gateway-pin-dot', gw).forEach((d, i) => {
      d.dataset.filled = (i < pinBuffer.length).toString();
    });
  };

  const onPinAction = async (key) => {
    const errEl = $('#gw-pin-error');
    if (key === 'back') {
      pinBuffer = pinBuffer.slice(0, -1);
      if (errEl) errEl.textContent = '';
    } else if (key === 'ok') {
      if (pinBuffer.length !== 4) return;
      const ok = await STORE.verifyPin(pinBuffer);
      if (ok) {
        pinBuffer = ''; updatePinDots();
        try { sessionStorage.setItem('upg_unlocked', 'true'); } catch (e) {}
        close();
        window.dispatchEvent(new CustomEvent('upg:unlocked'));
      } else {
        failedAttempts++;
        if (errEl) errEl.textContent = `PIN خاطئ (محاولة ${failedAttempts}/5)`;
        pinBuffer = ''; updatePinDots();
        if (failedAttempts >= 5 && numpad) {
          numpad.querySelectorAll('button').forEach(b => b.disabled = true);
          if (errEl) errEl.textContent = 'تم تأمين القفل لمدة 60 ثانية بسبب 5 محاولات فاشلة.';
          setTimeout(() => {
            if (numpad) numpad.querySelectorAll('button').forEach(b => b.disabled = false);
            failedAttempts = 0;
            if (errEl) errEl.textContent = '';
          }, 60000);
        }
      }
      return;
    } else if (/^\d$/.test(key) && pinBuffer.length < 4) {
      pinBuffer += key;
    }
    updatePinDots();
    if (pinBuffer.length === 4) onPinAction('ok');
  };

  if (numpad && !numpad.children.length) {
    [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(n => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = String(n);
      b.addEventListener('click', () => onPinAction(String(n)));
      numpad.appendChild(b);
    });
    const back = document.createElement('button');
    back.type = 'button';
    back.setAttribute('aria-label', 'مسح');
    back.innerHTML = '<i class="qi" data-icon="x"></i>';
    back.addEventListener('click', () => onPinAction('back'));
    numpad.appendChild(back);
    const zero = document.createElement('button');
    zero.type = 'button';
    zero.textContent = '0';
    zero.addEventListener('click', () => onPinAction('0'));
    numpad.appendChild(zero);
    const ok = document.createElement('button');
    ok.type = 'button';
    ok.setAttribute('aria-label', 'تأكيد');
    ok.innerHTML = '<i class="qi" data-icon="check"></i>';
    ok.addEventListener('click', () => onPinAction('ok'));
    numpad.appendChild(ok);
  }

  // ─── Keyboard support for PIN ───
  document.addEventListener('keydown', (e) => {
    if (gw.hidden) return;
    if (currentStage !== 'locked') return;
    if (/^\d$/.test(e.key))   { e.preventDefault(); onPinAction(e.key); }
    else if (e.key === 'Backspace') { e.preventDefault(); onPinAction('back'); }
    else if (e.key === 'Enter')     { e.preventDefault(); onPinAction('ok'); }
  });

  // ─── Stage navigation ───
  gw.addEventListener('click', async (e) => {
    const trg = e.target.closest('[data-action]');
    if (!trg) return;
    const action = trg.dataset.action;

    if (action === 'next-stage') {
      const idx = ONBOARDING_FLOW.indexOf(currentStage);
      if (idx === -1 || idx >= ONBOARDING_FLOW.length - 1) return;
      if (currentStage === 'identity') {
        const name = $('#gw-name').value.trim();
        if (!name) { $('#gw-name').focus(); return; }
      }
      if (currentStage === 'goal') {
        if (!$('input[name="gw-goal"]:checked')) return;
      }
      showStage(ONBOARDING_FLOW[idx + 1]);
    }
    else if (action === 'prev-stage') {
      const idx = ONBOARDING_FLOW.indexOf(currentStage);
      if (idx > 0) showStage(ONBOARDING_FLOW[idx - 1]);
    }
    else if (action === 'finish-onboarding') {
      const fb = $('#gw-pin-feedback');
      const pinEnabled = $('#gw-enable-pin').checked;
      if (pinEnabled) {
        const a = $('#gw-pin').value, b = $('#gw-pin-confirm').value;
        if (!/^\d{4}$/.test(a) || a !== b) {
          if (fb) fb.textContent = 'PIN يجب أن يكون 4 أرقام مطابقة.';
          return;
        }
        await STORE.setPin(a);
      } else {
        STORE.clearPin();
      }
      const profile = {
        name: $('#gw-name').value.trim(),
        role: $('#gw-role').value || null,
        avatar_color: selectedAvatar || avatarColors[0],
        goal: ($('input[name="gw-goal"]:checked') || {}).value || null,
        created_at: Date.now(),
      };
      STORE.setProfile(profile);
      STORE.setOnboardingDone();
      try { sessionStorage.setItem('upg_unlocked', 'true'); } catch (e) {}
      close();
      window.dispatchEvent(new CustomEvent('upg:profile-ready', { detail: profile }));
    }
    else if (action === 'enter-platform') {
      close();
    }
    else if (action === 'reset-data') {
      if (!confirm('هل أنت متأكد؟ سيتم حذف كل بياناتك المحلية. لا يمكن التراجع.')) return;
      if (!confirm('تأكيد ثاني: حذف نهائي لكل التقدم والإعدادات؟')) return;
      try { localStorage.clear(); sessionStorage.clear(); } catch (e) {}
      location.reload();
    }
    else if (action === 'lock-platform') {
      // Topbar button — handled below at document-level too, but allow inside gateway too
      lock();
    }
  });

  // ─── Topbar lock button (delegated, works outside the gateway) ───
  document.addEventListener('click', (e) => {
    const lockBtn = e.target.closest('[data-action="lock-platform"]');
    if (!lockBtn) return;
    if (gw.contains(lockBtn)) return; // already handled above
    lock();
  });

  // ─── PIN setup checkbox toggle ───
  const enablePin = $('#gw-enable-pin');
  if (enablePin) {
    enablePin.addEventListener('change', (e) => {
      const setupBox = $('.gateway-pin-setup', gw);
      if (setupBox) setupBox.hidden = !e.target.checked;
    });
  }

  // ─── Idle auto-lock ───
  const resetIdle = () => {
    if (idleTimer) clearTimeout(idleTimer);
    if (!STORE.lockOnIdle()) return;
    if (!STORE.pinHash()) return;
    idleTimer = setTimeout(() => lock(), 30 * 60 * 1000);
  };
  ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(ev =>
    document.addEventListener(ev, resetIdle, { passive: true })
  );

  const lock = () => {
    pinBuffer = ''; updatePinDots();
    try { sessionStorage.removeItem('upg_unlocked'); } catch (e) {}
    open('locked');
  };

  // ─── Boot logic ───
  const boot = () => {
    if (!STORE.onboardingDone()) {
      open('welcome');
      return;
    }
    const profile = STORE.profile();
    if (profile) {
      const nameEl = $('[data-bind="profile.name"]', gw);
      if (nameEl) nameEl.textContent = profile.name;
    }
    const stats = (window.Upg && window.Upg.state && window.Upg.state.compute) || null;
    if (stats) {
      const u = $('[data-bind="stats.units"]', gw);
      const h = $('[data-bind="stats.hours"]', gw);
      const s = $('[data-bind="stats.streak"]', gw);
      try {
        if (u) u.textContent = stats.unitsCompleted();
        if (h) h.textContent = Math.round(stats.trainingHours());
        if (s) s.textContent = stats.streak();
      } catch (e) {}
    }
    let unlocked = false;
    try { unlocked = sessionStorage.getItem('upg_unlocked') === 'true'; } catch (e) {}
    if (STORE.pinHash() && !unlocked) {
      open('locked');
    } else {
      // Returning user, but only show if there isn't a pending intro path
      const showWelcomeBack = !sessionStorage.getItem('upg_skip_welcome');
      if (showWelcomeBack) open('returning');
      try { sessionStorage.setItem('upg_unlocked', 'true'); } catch (e) {}
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.Upg = window.Upg || {};
  window.Upg.gateway = { open, close, lock };
})();



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — qcalc Engine (Worker 11 / Phase 4)
   Public API: window.Upg.calc.{ register, mount, init, format }
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const fmtNum   = new Intl.NumberFormat('ar-IQ', { maximumFractionDigits: 2 });
  const fmtMoney = new Intl.NumberFormat('ar-IQ', { maximumFractionDigits: 0 });
  const fmtInt   = new Intl.NumberFormat('ar-IQ', { maximumFractionDigits: 0 });
  const fmtPct   = (v) => `${(Number(v) || 0).toFixed(1)}%`;
  const clamp    = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const registry = new Map();

  const toast = (msg) => {
    document.querySelectorAll('.qcalc-toast').forEach(t => t.remove());
    const t = document.createElement('div');
    t.className = 'qcalc-toast';
    t.setAttribute('role', 'status');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1800);
  };

  const collectInputs = (el) => {
    const data = {};
    el.querySelectorAll('[name]').forEach(input => {
      const v = input.value;
      const name = input.name;
      if (input.type === 'checkbox') data[name] = input.checked;
      else if (input.type === 'radio') {
        if (input.checked) data[name] = v;
        else if (data[name] === undefined) data[name] = data[name] || null;
      }
      else if (input.type === 'number' || input.dataset.numeric === 'true') {
        const n = parseFloat(v);
        data[name] = Number.isFinite(n) ? n : 0;
      }
      else data[name] = v;
    });
    return data;
  };

  const formatValue = (raw, format) => {
    if (raw === undefined || raw === null) return '—';
    if (typeof raw !== 'number') return String(raw);
    if (!Number.isFinite(raw)) return '—';
    switch (format) {
      case 'money': return fmtMoney.format(raw);
      case 'pct':   return fmtPct(raw);
      case 'int':   return fmtInt.format(Math.round(raw));
      case 'num2':  return fmtNum.format(raw);
      default:      return fmtNum.format(raw);
    }
  };

  const mount = (el) => {
    if (el.__qcalcMounted) return;
    const name = el.dataset.calc;
    const def = registry.get(name);
    if (!def) {
      // Defer: maybe registration runs after first init pass.
      return;
    }

    const update = () => {
      const data = collectInputs(el);
      let result;
      try { result = def.compute(data) || {}; }
      catch (err) { console.error(`[qcalc:${name}] compute error`, err); return; }

      el.querySelectorAll('[data-bind]').forEach(b => {
        const key = b.dataset.bind;
        if (key === 'explain') {
          b.innerHTML = def.explain ? def.explain(data, result) : '';
          return;
        }
        const meterFor = b.dataset.meter;
        if (meterFor) {
          const v = clamp(Number(result[meterFor]) || 0, 0, 100);
          const i = b.querySelector('i') || (() => { const x = document.createElement('i'); b.appendChild(x); return x; })();
          i.style.width = `${v}%`;
          return;
        }
        const val = result[key];
        b.textContent = formatValue(val, b.dataset.format);

        // Optional class swap based on threshold-defined state
        if (b.dataset.stateBind) {
          const card = b.closest('.qcalc-result-card');
          if (card) {
            card.classList.remove('qcalc-result-good', 'qcalc-result-bad');
            const cls = result[b.dataset.stateBind];
            if (cls === 'good') card.classList.add('qcalc-result-good');
            else if (cls === 'bad') card.classList.add('qcalc-result-bad');
          }
        }
      });
    };

    el.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', update);
      input.addEventListener('change', update);
    });

    el.querySelector('[data-action="reset"]')?.addEventListener('click', () => {
      el.querySelectorAll('input').forEach(i => {
        if (i.type === 'checkbox' || i.type === 'radio') i.checked = i.defaultChecked;
        else i.value = i.defaultValue || '';
      });
      el.querySelectorAll('select').forEach(s => {
        const def = s.querySelector('option[selected]');
        s.value = def ? def.value : (s.options[0] ? s.options[0].value : '');
      });
      update();
      toast('تمت إعادة التعيين');
    });

    el.querySelector('[data-action="copy"]')?.addEventListener('click', () => {
      const lines = [...el.querySelectorAll('.qcalc-summary .qcalc-result-card')].map(card => {
        const lbl = card.querySelector('.qcalc-result-label')?.textContent.trim() || '';
        const val = card.querySelector('.qcalc-result-value')?.textContent.trim() || '';
        const unit = card.querySelector('.qcalc-result-unit')?.textContent.trim() || '';
        return `${lbl}: ${val}${unit ? ' ' + unit : ''}`;
      });
      const title = el.querySelector('.qcalc-title h3')?.textContent.trim() || name;
      const text = `${title}\n` + lines.join('\n');
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(
          () => toast('تم النسخ'),
          () => toast('تعذّر النسخ')
        );
      } else {
        toast('النسخ غير مدعوم');
      }
    });

    el.querySelector('[data-action="export"]')?.addEventListener('click', () => {
      const data = collectInputs(el);
      let outputs = {};
      try { outputs = def.compute(data) || {}; } catch (e) { /* noop */ }
      const blob = new Blob(
        [JSON.stringify({ calc: name, inputs: data, outputs, ts: new Date().toISOString() }, null, 2)],
        { type: 'application/json' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast('تم التصدير');
    });

    update();
    el.__qcalcMounted = true;
  };

  const register = (name, def) => {
    if (typeof def?.compute !== 'function') {
      console.warn(`[Upg.calc] register("${name}"): compute() function required`);
      return;
    }
    registry.set(name, def);
    // Mount any existing element waiting for this registration
    document.querySelectorAll(`.qcalc[data-calc="${name}"]`).forEach(mount);
  };

  const init = (root = document) => {
    root.querySelectorAll('.qcalc[data-calc]').forEach(mount);
  };

  const boot = () => init();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.addEventListener('upg:page-shown', () => init());

  window.Upg = window.Upg || {};
  window.Upg.calc = { register, mount, init, format: formatValue };
})();

/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — qcalc Registrations (8 calculators)
   Math is preserved 1:1 with Workers 02..09 originals.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const ready = () => {
    if (!window.Upg?.calc?.register) {
      setTimeout(ready, 30);
      return;
    }
    const C = window.Upg.calc;

    /* 1) iraq-tax (Worker 04) — قانون 113/1982 + شرائح
       Personal: 1,000,000 IQD/year ≈ 83,333/month
       Married bonus, dependents allowance.
       Brackets (annual taxable): 250k @3% / 250k @5% / 500k @10% / >1M @15%  */
    C.register('iraq-tax', {
      compute({ gross, dependents, status }) {
        gross = Math.max(0, +gross || 0);
        dependents = Math.max(0, Math.min(20, +dependents || 0));
        const personalExempt   = 1_000_000 / 12;        // ~83,333/month
        const marriedBonus     = status === 'married' ? 80_000 : 0;
        const dependentExempt  = dependents * 50_000;
        const totalExempt      = personalExempt + marriedBonus + dependentExempt;
        const taxable          = Math.max(0, gross - totalExempt);

        let tax = 0;
        if (taxable > 0)         tax += Math.min(taxable, 250_000) * 0.03;
        if (taxable > 250_000)   tax += Math.min(taxable - 250_000, 250_000) * 0.05;
        if (taxable > 500_000)   tax += Math.min(taxable - 500_000, 500_000) * 0.10;
        if (taxable > 1_000_000) tax += (taxable - 1_000_000) * 0.15;

        const net = gross - tax;
        const effRate = gross > 0 ? (tax / gross) * 100 : 0;
        return { gross, tax, exemptions: totalExempt, taxable, net, effRate };
      },
      explain(d, r) {
        return `
          <strong>طريقة الحساب:</strong>
          الإعفاءات الإجمالية = <code>${Math.round(r.exemptions).toLocaleString('ar-IQ')}</code> د.ع.
          الراتب الخاضع = <code>${Math.round(r.taxable).toLocaleString('ar-IQ')}</code> د.ع.
          تُطبَّق الشرائح التصاعدية (3% / 5% / 10% / 15%) → الضريبة = <code>${Math.round(r.tax).toLocaleString('ar-IQ')}</code> د.ع.
          النسبة الفعلية ≈ <code>${r.effRate.toFixed(2)}%</code>.
          <em>المرجع: قانون ضريبة الدخل العراقي رقم 113 لسنة 1982 وتعديلاته. الإعفاء الشخصي ~ 1,000,000 د.ع سنوياً.</em>
        `;
      }
    });

    /* 2) salary-slip (Worker 04) — gross / deductions / net */
    C.register('salary-slip', {
      compute({ gross, ssRate, taxRate, otherDeductions, allowances }) {
        gross = Math.max(0, +gross || 0);
        ssRate = clamp01(+ssRate / 100);
        taxRate = clamp01(+taxRate / 100);
        const allow = Math.max(0, +allowances || 0);
        const others = Math.max(0, +otherDeductions || 0);
        const totalGross = gross + allow;
        const ss = gross * ssRate;
        const taxable = Math.max(0, totalGross - ss);
        const tax = taxable * taxRate;
        const totalDeductions = ss + tax + others;
        const net = totalGross - totalDeductions;
        return { totalGross, ss, tax, others, totalDeductions, net, ssAndTax: ss + tax };
      },
      explain(d, r) {
        return `
          <strong>سلاسل الخصومات:</strong>
          الضمان (5%) = <code>${Math.round(r.ss).toLocaleString('ar-IQ')}</code>،
          ضريبة الدخل = <code>${Math.round(r.tax).toLocaleString('ar-IQ')}</code>،
          خصومات أخرى = <code>${Math.round(r.others).toLocaleString('ar-IQ')}</code>.
          <strong>الصافي =</strong> الإجمالي − الخصومات = <code>${Math.round(r.net).toLocaleString('ar-IQ')}</code> د.ع.
          <em>المرجع: قانون العمل العراقي رقم 37 لسنة 2015 — اشتراك العامل في الضمان 5% (صاحب العمل 12%).</em>
        `;
      }
    });

    /* 3) sales-commission (Worker 02) — base + tier rates */
    C.register('sales-commission', {
      compute({ base, sales, target, tier1Rate, tier2Rate, kicker }) {
        base = Math.max(0, +base || 0);
        sales = Math.max(0, +sales || 0);
        target = Math.max(1, +target || 1);
        const t1 = (+tier1Rate / 100) || 0;
        const t2 = (+tier2Rate / 100) || 0;
        const kick = (+kicker / 100) || 0;

        const attainment = (sales / target) * 100;
        const upToTarget = Math.min(sales, target);
        const overTarget = Math.max(0, sales - target);
        const commissionT1 = upToTarget * t1;
        const commissionT2 = overTarget * t2;
        const kickerBonus  = attainment >= 110 ? sales * kick : 0;
        const totalComm    = commissionT1 + commissionT2 + kickerBonus;
        const ote          = base + totalComm;
        return {
          attainment, commissionT1, commissionT2, kickerBonus,
          totalComm, base, ote,
          attainmentMeter: clamp(attainment, 0, 100),
          tierState: attainment >= 110 ? 'good' : (attainment < 70 ? 'bad' : null)
        };
      },
      explain(d, r) {
        return `
          <strong>هيكل العمولة:</strong>
          الأساسي = <code>${Math.round(r.base).toLocaleString('ar-IQ')}</code> +
          عمولة حتى الهدف (${(d.tier1Rate||0)}%) = <code>${Math.round(r.commissionT1).toLocaleString('ar-IQ')}</code> +
          عمولة فوق الهدف (${(d.tier2Rate||0)}%) = <code>${Math.round(r.commissionT2).toLocaleString('ar-IQ')}</code>
          ${r.kickerBonus > 0 ? ` + Kicker (${(d.kicker||0)}%) = <code>${Math.round(r.kickerBonus).toLocaleString('ar-IQ')}</code>` : ''}.
          <strong>OTE</strong> = <code>${Math.round(r.ote).toLocaleString('ar-IQ')}</code>. تحقيق الهدف ${r.attainment.toFixed(1)}%.
          <em>Cron / Stripe Sales Compensation guideline: kicker يُفعَّل عند ≥ 110% attainment.</em>
        `;
      }
    });

    /* 4) apindex (Worker 03) — Agent Performance Index */
    C.register('apindex', {
      compute({ aht, fcr, csat, adh, qa, calls }) {
        aht  = clamp(+aht || 5.2, 0.5, 30);
        fcr  = clamp(+fcr || 72, 0, 100);
        csat = clamp(+csat || 84, 0, 100);
        adh  = clamp(+adh || 93, 0, 100);
        qa   = clamp(+qa || 88, 0, 100);
        calls= clamp(+calls || 60, 0, 500);

        // Normalize to 0..100 (AHT inverse: 4 = 100, 8 = 0)
        const ahtScore = clamp(((8 - aht) / (8 - 4)) * 100, 0, 100);
        const callsScore = clamp((calls / 80) * 100, 0, 100);
        const idx =
          ahtScore   * 0.15 +
          fcr        * 0.20 +
          csat       * 0.25 +
          adh        * 0.10 +
          qa         * 0.20 +
          callsScore * 0.10;

        const tier =
          idx >= 90 ? 'Top Performer' :
          idx >= 80 ? 'Strong'        :
          idx >= 70 ? 'Solid'         :
          idx >= 60 ? 'Coaching'      : 'Action Plan';

        return {
          index: idx, tier,
          ahtScore, fcr, csat, adh, qa, callsScore,
          tierState: idx >= 80 ? 'good' : (idx < 70 ? 'bad' : null),
          meter: idx
        };
      },
      explain(d, r) {
        return `
          <strong>صيغة APIndex (موزونة):</strong>
          <code>0.15·AHT + 0.20·FCR + 0.25·CSAT + 0.10·ADH + 0.20·QA + 0.10·Calls</code>.
          النتيجة = <code>${r.index.toFixed(1)}</code>/100 → <strong>${r.tier}</strong>.
          AHT يُعكس (أقل = أفضل). Calls يُعاير على 80 مكالمة/شفت.
          <em>المرجع: COPC CX Standard 6.2 + Genesys Workforce Optimization 2024.</em>
        `;
      }
    });

    /* 5) ab-test (Worker 06) — Sample Size Calculator (per variant) */
    C.register('ab-test', {
      compute({ baseline, lift, alpha, power }) {
        const p1 = clamp01(+baseline / 100);
        const rel = (+lift / 100) || 0;
        const p2 = clamp01(p1 * (1 + rel));
        const a = (+alpha) || 0.05;
        const pw = (+power) || 0.80;

        // Z-scores
        const Za = (a <= 0.01) ? 2.576 : (a <= 0.05 ? 1.96 : (a <= 0.10 ? 1.645 : 1.28));
        const Zb = (pw >= 0.95) ? 1.645 : (pw >= 0.90 ? 1.282 : (pw >= 0.80 ? 0.842 : 0.524));

        // Two-proportion sample size per arm
        const pBar = (p1 + p2) / 2;
        const num = Math.pow(Za * Math.sqrt(2 * pBar * (1 - pBar)) + Zb * Math.sqrt(p1*(1-p1) + p2*(1-p2)), 2);
        const den = Math.pow(p1 - p2, 2) || 1e-9;
        const nPerArm = Math.ceil(num / den);
        const totalN = nPerArm * 2;
        const detectable = (Math.abs(p2 - p1) * 100).toFixed(2);
        return {
          nPerArm, totalN, baselineRate: p1 * 100, variantRate: p2 * 100,
          mde: parseFloat(detectable),
          state: rel === 0 ? 'bad' : (Math.abs(rel) >= 0.10 ? 'good' : null)
        };
      },
      explain(d, r) {
        return `
          <strong>أحجام العينة المطلوبة:</strong>
          <code>${r.nPerArm.toLocaleString('ar-IQ')}</code> لكل ذراع، الإجمالي <code>${r.totalN.toLocaleString('ar-IQ')}</code>.
          المعدل الأساس = <code>${r.baselineRate.toFixed(2)}%</code> → معدل المتغيّر = <code>${r.variantRate.toFixed(2)}%</code> (Δ = ${r.mde}pp).
          ألفا (نسبة الخطأ النوع الأول) = ${(d.alpha*100).toFixed(1)}%، Power = ${(d.power*100).toFixed(0)}%.
          <em>المرجع: Kohavi, Tang & Xu — <i>Trustworthy Online Controlled Experiments</i> (2020). الصيغة Two-proportion z-test.</em>
        `;
      }
    });

    /* 6) batna (Worker 08) — Negotiation: Reservation/Target/ZOPA */
    C.register('batna', {
      compute({ reservation, target, opening, theirAnchor, theirReservation }) {
        const yourReservation = Math.max(0, +reservation || 0);
        const yourTarget      = Math.max(0, +target || 0);
        const yourOpening     = Math.max(0, +opening || 0);
        const theirAnchorVal  = Math.max(0, +theirAnchor || 0);
        const theirRes        = Math.max(0, +theirReservation || 0);

        // ZOPA = overlap between your acceptable range [yourReservation .. yourTarget] and theirs.
        // Buyer side assumed: lower price = better. Seller side assumed: higher price = better.
        const zopaLow  = Math.max(yourReservation, theirRes);
        const zopaHigh = Math.min(yourTarget,      theirAnchorVal);
        const hasZopa  = zopaHigh >= zopaLow;
        const zopaWidth = hasZopa ? (zopaHigh - zopaLow) : 0;
        const midpoint = hasZopa ? (zopaLow + zopaHigh) / 2 : 0;
        const askingMargin = yourOpening - yourTarget;
        return {
          yourReservation, yourTarget, yourOpening,
          zopaLow, zopaHigh, zopaWidth, midpoint, askingMargin,
          status: hasZopa ? 'متاحة' : 'غير متاحة',
          state: hasZopa ? 'good' : 'bad'
        };
      },
      explain(d, r) {
        return `
          <strong>منطقة الاتفاق المحتمل (ZOPA):</strong>
          ${r.zopaWidth > 0
            ? `موجودة بين <code>${Math.round(r.zopaLow).toLocaleString('ar-IQ')}</code>
               و <code>${Math.round(r.zopaHigh).toLocaleString('ar-IQ')}</code>.
               نقطة الوسط = <code>${Math.round(r.midpoint).toLocaleString('ar-IQ')}</code>.`
            : `<strong style="color:var(--color-danger,#ff7a7a)">لا يوجد تداخل</strong> — فكّك الافتراضات أو ابحث عن BATNA أقوى.`
          }
          فجوة Anchoring: <code>${Math.round(r.askingMargin).toLocaleString('ar-IQ')}</code> فوق هدفك.
          <em>المرجع: Fisher, Ury & Patton — <i>Getting to Yes</i> (Harvard Negotiation Project) + Voss, <i>Never Split the Difference</i>.</em>
        `;
      }
    });

    /* 7) bigo-cost (Worker 05) — Big-O operations estimator */
    C.register('bigo-cost', {
      compute({ n, complexity }) {
        n = Math.max(1, +n || 1);
        const map = {
          'O(1)':       { ops: 1,                 label: 'ثابت' },
          'O(log n)':   { ops: Math.log2(n),      label: 'لوغاريتمي' },
          'O(n)':       { ops: n,                 label: 'خطي' },
          'O(n log n)': { ops: n * Math.log2(n),  label: 'لوغاريتمي خطي' },
          'O(n^2)':     { ops: n * n,             label: 'تربيعي' },
          'O(n^3)':     { ops: n * n * n,         label: 'تكعيبي' },
          'O(2^n)':     { ops: Math.pow(2, Math.min(n, 60)), label: 'أُسّي' },
          'O(n!)':      { ops: factorial(Math.min(n, 18)),   label: 'عاملي' }
        };
        const entry = map[complexity] || map['O(n)'];
        const ops = entry.ops;
        // Assume 1e8 ops/sec
        const seconds = ops / 1e8;
        const human =
          seconds < 1e-6 ? '< 1µs' :
          seconds < 1    ? `${(seconds*1000).toFixed(2)} ms` :
          seconds < 60   ? `${seconds.toFixed(1)} ث` :
          seconds < 3600 ? `${(seconds/60).toFixed(1)} دقيقة` :
          seconds < 86400? `${(seconds/3600).toFixed(1)} ساعة` :
                            `${(seconds/86400).toFixed(1)} يوم`;
        const state =
          seconds < 0.1   ? 'good' :
          seconds < 5     ? null   :
          'bad';
        return {
          ops, opsHuman: ops.toExponential(2),
          opsRounded: Math.min(ops, 1e15),
          seconds, timeHuman: human,
          label: entry.label,
          state
        };
      },
      explain(d, r) {
        return `
          <strong>تقدير العمليات:</strong>
          <code>${d.complexity}</code> مع n = <code>${(+d.n).toLocaleString('ar-IQ')}</code>
          → ≈ <code>${r.opsHuman}</code> عملية (${r.label}).
          بافتراض جهاز يُنفّذ 10⁸ عملية/ثانية → الزمن المتوقع <strong>${r.timeHuman}</strong>.
          <em>المرجع: Cormen, Leiserson, Rivest, Stein — <i>Introduction to Algorithms</i> (MIT, 4th ed.).</em>
        `;
      }
    });

    /* 8) bigfive-score (Worker 09) — Big Five OCEAN percentile */
    C.register('bigfive-score', {
      compute({ openness, conscientious, extraversion, agreeableness, neuroticism }) {
        const O = clamp(+openness || 50, 0, 100);
        const C2 = clamp(+conscientious || 50, 0, 100);
        const E = clamp(+extraversion || 50, 0, 100);
        const A = clamp(+agreeableness || 50, 0, 100);
        const N = clamp(+neuroticism || 50, 0, 100);

        const labelOf = (v) =>
          v >= 80 ? 'مرتفع جداً' :
          v >= 65 ? 'مرتفع'      :
          v >= 45 ? 'متوسط'      :
          v >= 30 ? 'منخفض'      : 'منخفض جداً';

        const composite = (O*0.20 + C2*0.25 + E*0.20 + A*0.20 + (100 - N)*0.15);
        return {
          O, C2, E, A, N,
          oLabel: labelOf(O), cLabel: labelOf(C2), eLabel: labelOf(E),
          aLabel: labelOf(A), nLabel: labelOf(N),
          composite,
          state: composite >= 70 ? 'good' : (composite < 40 ? 'bad' : null)
        };
      },
      explain(d, r) {
        return `
          <strong>تفسير مختصر:</strong>
          الانفتاح (O) ${r.oLabel} · الضمير (C) ${r.cLabel} · الانبساط (E) ${r.eLabel}
          · المقبولية (A) ${r.aLabel} · العصابية (N) ${r.nLabel}.
          <strong>مؤشّر الأداء المركّب</strong> = <code>${r.composite.toFixed(1)}</code>/100
          (يُعطي وزناً أعلى لـ Conscientiousness ويعكس Neuroticism).
          <em>المرجع: McCrae & Costa, NEO-PI-R (1992) + Goldberg IPIP. النسب المئوية تخميني للتعليم — لا تستخدم في تقييم سريري.</em>
        `;
      }
    });

    // Helpers used in registrations
    function clamp(v, lo, hi) { v = +v; if (!Number.isFinite(v)) v = 0; return Math.max(lo, Math.min(hi, v)); }
    function clamp01(v) { return clamp(v, 0, 1); }
    function factorial(n) {
      n = Math.max(0, Math.min(170, Math.floor(n)));
      let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
    }
  };
  ready();
})();



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Command Palette + Shortcuts (Worker 11 / Phase 5)
   Public API: window.Upg.cmdk.{ open, close, register, getShortcuts }
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const init = () => {
    const palette = document.getElementById('cmdk-palette');
    const cheat   = document.getElementById('shortcut-cheatsheet');
    if (!palette || !cheat) {
      console.warn('[Upg.cmdk] overlays not present in DOM');
      return;
    }

    const input = palette.querySelector('.cmdk-input');
    const list  = palette.querySelector('.cmdk-results');
    const empty = palette.querySelector('.cmdk-empty');

    const isMac = (navigator.platform || '').toUpperCase().includes('MAC');
    const Mod = isMac ? '⌘' : 'Ctrl';

    // ─── Page registry (matches nav-item data-page values) ───
    const PAGES = [
      { id: 'dashboard',    title: 'لوحة التحكم',           icon: 'layout-dashboard' },
      { id: 'callcenter',   title: 'الكول سنتر',            icon: 'phone' },
      { id: 'fieldsales',   title: 'المبيعات الميدانية',    icon: 'briefcase' },
      { id: 'accountmgr',   title: 'Account Manager',       icon: 'user-tie' },
      { id: 'social',       title: 'السوشيال ميديا',        icon: 'megaphone' },
      { id: 'lab',          title: 'مختبر السيناريوهات',    icon: 'flask-conical' },
      { id: 'psych',        title: 'الدوافع النفسية',       icon: 'brain' },
      { id: 'eq',           title: 'الذكاء العاطفي',        icon: 'heart-handshake' },
      { id: 'customercare', title: 'خدمة العملاء',          icon: 'headphones' },
      { id: 'programming',  title: 'البرمجة',               icon: 'code' },
      { id: 'accounting',   title: 'المحاسبة',              icon: 'calculator' },
      { id: 'phonerepair',  title: 'صيانة الهاتف',          icon: 'wrench' },
      { id: 'negotiation',  title: 'المفاوضات',             icon: 'heart-handshake' },
      { id: 'hrmastery',    title: 'إتقان مقابلات HR',      icon: 'briefcase' },
    ];

    const goCalc = (calcName, pageId) => () => {
      window.navigateTo?.(pageId);
      setTimeout(() => {
        const el = document.querySelector(`[data-calc="${calcName}"]`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el?.querySelector('input')?.focus();
      }, 220);
    };

    const commands = [
      // Navigation
      ...PAGES.map(p => ({
        group: 'انتقال',
        title: `الانتقال إلى ${p.title}`,
        hint: `Go → ${p.id}`,
        icon: p.icon,
        tags: ['go', 'navigate', 'open', p.id, p.title, 'انتقال'],
        action: () => window.navigateTo?.(p.id)
      })),

      // Theme
      { group: 'الثيم', title: 'تبديل الثيم (دورة)',
        icon: 'sun', tags: ['theme', 'toggle', 'اللون', 'ثيم', 'فاتح', 'مظلم'],
        action: () => window.Upg?.theme?.cycle?.(), shortcut: ['T'] },
      { group: 'الثيم', title: 'الثيم: تلقائي (Auto)',
        icon: 'monitor', tags: ['theme', 'auto', 'system', 'تلقائي'],
        action: () => window.Upg?.theme?.set?.('auto') },
      { group: 'الثيم', title: 'الثيم: مظلم (Dark)',
        icon: 'moon', tags: ['theme', 'dark', 'مظلم', 'ليلي'],
        action: () => window.Upg?.theme?.set?.('dark') },
      { group: 'الثيم', title: 'الثيم: فاتح (Light)',
        icon: 'sun', tags: ['theme', 'light', 'فاتح', 'نهاري'],
        action: () => window.Upg?.theme?.set?.('light') },

      // Calculators (qcalc)
      { group: 'حاسبات', title: 'حاسبة ضريبة الدخل العراقية',
        icon: 'calculator', tags: ['tax', 'iraq', 'ضريبة', 'دخل', '113'],
        action: goCalc('iraq-tax', 'accounting') },
      { group: 'حاسبات', title: 'قسيمة الراتب الشهري',
        icon: 'briefcase', tags: ['salary', 'payslip', 'راتب', 'قسيمة'],
        action: goCalc('salary-slip', 'accounting') },
      { group: 'حاسبات', title: 'حاسبة العمولة و الـ OTE',
        icon: 'trending-up', tags: ['commission', 'sales', 'ote', 'عمولة'],
        action: goCalc('sales-commission', 'fieldsales') },
      { group: 'حاسبات', title: 'مؤشّر أداء الكول سنتر (APIndex)',
        icon: 'gauge', tags: ['apindex', 'kpi', 'callcenter', 'مؤشر', 'أداء'],
        action: goCalc('apindex', 'callcenter') },
      { group: 'حاسبات', title: 'حاسبة حجم العينة لاختبار A/B',
        icon: 'bar-chart', tags: ['ab', 'test', 'sample', 'experiment', 'تجربة'],
        action: goCalc('ab-test', 'social') },
      { group: 'حاسبات', title: 'محلّل ZOPA و BATNA',
        icon: 'heart-handshake', tags: ['batna', 'zopa', 'تفاوض', 'مفاوضات', 'negotiation'],
        action: goCalc('batna', 'negotiation') },
      { group: 'حاسبات', title: 'مُقدِّر تكلفة Big-O',
        icon: 'line-chart', tags: ['bigo', 'algorithm', 'complexity', 'تعقيد', 'برمجة'],
        action: goCalc('bigo-cost', 'programming') },
      { group: 'حاسبات', title: 'مؤشّر OCEAN — Big Five',
        icon: 'brain', tags: ['bigfive', 'ocean', 'شخصية', 'psych'],
        action: goCalc('bigfive-score', 'psych') },

      // Data
      { group: 'البيانات', title: 'تصدير كل التقدم (JSON)',
        icon: 'download', tags: ['export', 'backup', 'json', 'تصدير', 'نسخ'],
        action: () => exportAll() },
      { group: 'البيانات', title: 'استيراد ملف تقدم (JSON)',
        icon: 'upload', tags: ['import', 'restore', 'استعادة', 'استيراد'],
        action: () => importAll() },
      { group: 'البيانات', title: 'إعادة تعيين كل التقدم (حذف)',
        icon: 'trash', tags: ['reset', 'clear', 'wipe', 'حذف', 'إعادة'],
        action: () => resetAll() },

      // System
      { group: 'النظام', title: 'قفل المنصة',
        icon: 'lock', tags: ['lock', 'logout', 'idle', 'قفل'],
        action: () => { sessionStorage.removeItem('upg_unlocked'); window.Upg?.gateway?.lock?.(); },
        shortcut: ['L'] },
      { group: 'النظام', title: 'عرض الاختصارات',
        icon: 'help-circle', tags: ['shortcuts', 'keyboard', 'help', 'اختصارات', '?'],
        action: () => openCheat(), shortcut: ['?'] },
      { group: 'النظام', title: 'طباعة الصفحة الحالية',
        icon: 'download', tags: ['print', 'طباعة', 'pdf'],
        action: () => window.print() },
      { group: 'النظام', title: 'إعادة تحميل المنصة',
        icon: 'refresh', tags: ['reload', 'refresh', 'تحديث'],
        action: () => location.reload() },
    ];

    const SHORTCUTS = [
      { cat: 'عام',      label: 'فتح Command Palette', keys: [Mod, 'K'] },
      { cat: 'عام',      label: 'عرض الاختصارات',     keys: ['?'] },
      { cat: 'عام',      label: 'إغلاق نافذة منبثقة',  keys: ['Esc'] },
      { cat: 'عام',      label: 'طباعة',              keys: [Mod, 'P'] },
      { cat: 'الانتقال', label: 'لوحة التحكم',        keys: ['G', 'D'] },
      { cat: 'الانتقال', label: 'المبيعات',           keys: ['G', 'S'] },
      { cat: 'الانتقال', label: 'الكول سنتر',         keys: ['G', 'C'] },
      { cat: 'الانتقال', label: 'البرمجة',            keys: ['G', 'P'] },
      { cat: 'الانتقال', label: 'المحاسبة',           keys: ['G', 'A'] },
      { cat: 'الانتقال', label: 'مقابلات HR',         keys: ['G', 'H'] },
      { cat: 'الانتقال', label: 'صيانة الهاتف',       keys: ['G', 'R'] },
      { cat: 'الانتقال', label: 'السوشيال ميديا',     keys: ['G', 'M'] },
      { cat: 'الانتقال', label: 'مختبر السيناريوهات', keys: ['G', 'X'] },
      { cat: 'الثيم',    label: 'تبديل الثيم',        keys: ['T'] },
      { cat: 'النظام',   label: 'قفل المنصة',         keys: ['L'] },
    ];

    // ─── Search / fuzzy ───
    const score = (q, cmd) => {
      q = (q || '').toLowerCase().trim();
      if (!q) return 1;
      const hay = (cmd.title + ' ' + (cmd.tags || []).join(' ') + ' ' + (cmd.group || '')).toLowerCase();
      const idx = hay.indexOf(q);
      if (idx >= 0) return 1000 - idx;
      // Subsequence fuzzy
      let qi = 0;
      for (let i = 0; i < hay.length && qi < q.length; i++) {
        if (hay[i] === q[qi]) qi++;
      }
      return qi === q.length ? 200 - (hay.length / Math.max(1, q.length)) : 0;
    };

    let filtered = [];
    let active = 0;

    const render = () => {
      const q = input.value;
      filtered = commands
        .map(c => ({ c, s: score(q, c) }))
        .filter(x => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 80)
        .map(x => x.c);

      list.innerHTML = '';
      empty.hidden = filtered.length > 0;
      if (!filtered.length) return;

      let lastGroup = null;
      filtered.forEach((c, i) => {
        if (c.group !== lastGroup) {
          const h = document.createElement('div');
          h.className = 'cmdk-group-heading';
          h.textContent = c.group;
          list.appendChild(h);
          lastGroup = c.group;
        }
        const item = document.createElement('div');
        item.className = 'cmdk-item';
        item.setAttribute('role', 'option');
        item.dataset.idx = String(i);
        item.setAttribute('aria-selected', i === active ? 'true' : 'false');
        item.innerHTML = `
          <div class="cmdk-item-icon"><i class="qi" data-icon="${escapeAttr(c.icon || 'chevron-right')}"></i></div>
          <div class="cmdk-item-body">
            <div class="cmdk-item-title">${escapeHtml(c.title)}</div>
            ${c.hint ? `<div class="cmdk-item-hint">${escapeHtml(c.hint)}</div>` : ''}
          </div>
          ${c.shortcut ? `<div class="cmdk-item-shortcut">${c.shortcut.map(k => `<kbd>${escapeHtml(k)}</kbd>`).join('')}</div>` : ''}
        `;
        item.addEventListener('click', () => execute(c));
        item.addEventListener('mousemove', () => { if (active !== i) { active = i; refreshActive(); } });
        list.appendChild(item);
      });
      // Re-render icon glyphs (Phase 2 sprite system reads data-icon)
      window.Upg?.icons?.renderAll?.(list);
    };

    const refreshActive = () => {
      list.querySelectorAll('.cmdk-item').forEach(el => {
        const isActive = +el.dataset.idx === active;
        el.setAttribute('aria-selected', String(isActive));
        if (isActive) el.scrollIntoView({ block: 'nearest' });
      });
    };

    const execute = (cmd) => {
      close();
      setTimeout(() => {
        try { cmd.action(); }
        catch (e) { console.error('[Upg.cmdk] command failed:', e); }
      }, 60);
    };

    const open = (prefill = '') => {
      // If gateway is open, don't open palette (lock-screen first)
      if (document.body.dataset.gatewayOpen === 'true') return;
      palette.hidden = false;
      input.value = prefill || '';
      active = 0;
      render();
      requestAnimationFrame(() => input.focus());
    };
    const close = () => {
      palette.hidden = true;
      input.value = '';
    };

    const openCheat = () => {
      cheat.hidden = false;
      renderCheatsheet();
    };
    const closeCheat = () => { cheat.hidden = true; };

    const renderCheatsheet = () => {
      const body = cheat.querySelector('.cmdk-cheat-body');
      const cats = [...new Set(SHORTCUTS.map(s => s.cat))];
      body.innerHTML = cats.map(cat => `
        <div class="cmdk-cheat-cat">
          <h3>${escapeHtml(cat)}</h3>
          ${SHORTCUTS.filter(s => s.cat === cat).map(s => `
            <div class="cmdk-cheat-row">
              <span class="cmdk-cheat-label">${escapeHtml(s.label)}</span>
              <span class="cmdk-cheat-keys">${s.keys.map(k => `<kbd>${escapeHtml(k)}</kbd>`).join(' ')}</span>
            </div>`).join('')}
        </div>`).join('');
    };

    // ─── Events ───
    input.addEventListener('input', () => { active = 0; render(); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(filtered.length - 1, active + 1); refreshActive(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(0, active - 1); refreshActive(); }
      else if (e.key === 'Enter') { e.preventDefault(); if (filtered[active]) execute(filtered[active]); }
    });

    palette.addEventListener('click', (e) => { if (e.target === palette) close(); });
    cheat.addEventListener('click', (e) => {
      if (e.target === cheat || e.target.closest('[data-action="close-cheatsheet"]')) closeCheat();
    });

    // ─── Global keyboard ───
    let gPressed = false;
    let gTimer = null;

    const isInputFocused = () => {
      const el = document.activeElement;
      if (!el) return false;
      if (el === input) return true; // palette input is fine
      const tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
    };

    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl+K — always
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (palette.hidden) open(); else close();
        return;
      }
      // Esc — close any open overlay
      if (e.key === 'Escape') {
        if (!palette.hidden) { close(); return; }
        if (!cheat.hidden)   { closeCheat(); return; }
        return;
      }

      // If user is typing inside non-palette input, skip the rest
      if (isInputFocused() && document.activeElement !== input) return;

      // ? — cheat sheet
      if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (document.activeElement === input) return;
        e.preventDefault();
        if (cheat.hidden) openCheat(); else closeCheat();
        return;
      }
      // T — theme
      if ((e.key === 't' || e.key === 'T') && !gPressed && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (document.activeElement === input) return;
        e.preventDefault();
        window.Upg?.theme?.cycle?.();
        return;
      }
      // L — lock
      if ((e.key === 'l' || e.key === 'L') && !gPressed && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (document.activeElement === input) return;
        e.preventDefault();
        sessionStorage.removeItem('upg_unlocked');
        window.Upg?.gateway?.lock?.();
        return;
      }

      // G then X — page jumps
      if (!gPressed && (e.key === 'g' || e.key === 'G') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (document.activeElement === input) return;
        gPressed = true;
        clearTimeout(gTimer);
        gTimer = setTimeout(() => { gPressed = false; }, 1200);
        return;
      }
      if (gPressed) {
        const map = {
          d: 'dashboard', s: 'fieldsales', c: 'callcenter',
          p: 'programming', a: 'accounting', h: 'hrmastery',
          r: 'phonerepair', m: 'social', x: 'lab', n: 'negotiation',
          e: 'eq', y: 'psych'
        };
        const target = map[e.key.toLowerCase()];
        gPressed = false;
        clearTimeout(gTimer);
        if (target) {
          e.preventDefault();
          window.navigateTo?.(target);
        }
      }
    });

    // ─── Wire topbar search → palette ───
    document.querySelectorAll('.topbar-search input, .topbar input[type="text"][placeholder*="بحث"]').forEach(inp => {
      const handler = (e) => {
        e.preventDefault();
        const q = inp.value || '';
        inp.blur();
        open(q);
      };
      inp.addEventListener('focus', handler);
      inp.addEventListener('click', handler);
      inp.readOnly = true;
    });

    // ─── Helpers ───
    function escapeHtml(s) {
      return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }
    function escapeAttr(s) { return escapeHtml(s).replace(/[\n\r]/g, ''); }

    function exportAll() {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('upg_')) data[k] = localStorage.getItem(k);
      }
      const payload = {
        exported_at: new Date().toISOString(),
        version: 'cathedral-v14',
        data
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `upgrade-progress-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }

    function importAll() {
      const inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = 'application/json,.json';
      inp.addEventListener('change', () => {
        const file = inp.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const parsed = JSON.parse(reader.result);
            const data = parsed?.data || parsed;
            if (typeof data !== 'object' || !data) throw new Error('Bad payload');
            if (!confirm('سيتم استبدال بياناتك الحالية ببيانات الملف. متابعة؟')) return;
            Object.entries(data).forEach(([k, v]) => {
              if (k.startsWith('upg_')) localStorage.setItem(k, v);
            });
            location.reload();
          } catch (e) {
            alert('ملف غير صالح: ' + e.message);
          }
        };
        reader.readAsText(file);
      });
      inp.click();
    }

    function resetAll() {
      if (!confirm('سيتم حذف كل تقدمك ومسوّداتك ونتائجك. هل أنت متأكد؟')) return;
      if (!confirm('تأكيد ثاني — هذا حذف نهائي ولا يمكن التراجع عنه.')) return;
      Object.keys(localStorage).filter(k => k.startsWith('upg_')).forEach(k => localStorage.removeItem(k));
      sessionStorage.clear();
      location.reload();
    }

    // ─── Public API ───
    window.Upg = window.Upg || {};
    window.Upg.cmdk = {
      open, close,
      register: (cmd) => { if (cmd && typeof cmd.action === 'function') commands.push(cmd); },
      getShortcuts: () => SHORTCUTS.slice()
    };
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Unified State Layer + Real Dashboard (Worker 11 / Phase 6)
   Facade over 22+ existing upg_* localStorage keys.
   Public API: window.Upg.state.{ progress, scores, drafts, misc, profile,
                                  activity, logActivity, compute, on }
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const _read = (k, fallback) => {
    try {
      const v = localStorage.getItem(k);
      if (v == null) return fallback;
      return JSON.parse(v);
    } catch {
      // Could be a non-JSON legacy string
      const raw = localStorage.getItem(k);
      return raw == null ? fallback : raw;
    }
  };
  const _write = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      notify(k, v);
    } catch (e) {
      console.warn('[Upg.state] write failed', k, e);
    }
  };

  const listeners = new Map();
  const on = (event, fn) => {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(fn);
    return () => listeners.get(event)?.delete(fn);
  };
  const notify = (k, v) => {
    listeners.get('change')?.forEach(fn => safe(fn, k, v));
    listeners.get(`change:${k}`)?.forEach(fn => safe(fn, v));
  };
  const safe = (fn, ...args) => { try { fn(...args); } catch (e) { console.error('[Upg.state] listener', e); } };

  // ─── Reading helpers (best-effort discovery) ───
  const progress = () => ({
    sales:        _read('upg_progress_sales', {}),
    callcenter:   _read('upg_progress_callcenter', {}),
    accounting:   _read('upg_progress_accounting', _read('upg_progress_acc', {})),
    programming:  _read('upg_progress_prog', _read('upg_progress_programming', {})),
    social:       _read('upg_progress_social', {}),
    phonerepair:  _read('upg_progress_phonerepair', {}),
    hrmastery:    _read('upg_progress_hr',  _read('upg_progress_hrmastery', {})),
    psych:        _read('upg_progress_psych', {}),
    eq:           _read('upg_progress_eq', {}),
  });

  const scores = () => ({
    simulator:    _read('upg_simulator_scores', []),
    objection:    _read('upg_objection_scores', []),
    prLab:        _read('upg_pr_lab_scores', []),
    psych:        _read('upg_psych_results', {}),
    interviews:   _read('upg_interview_attempts', []),
    interviewsHr: _read('upg_interview_attempts_hr', []),
    bigfive:      _read('upg_bigfive_scores', []),
  });

  const drafts = () => ({
    pitch:      _read('upg_pitch_drafts', []),
    salary:     _read('upg_salary_drafts', []),
    tax:        _read('upg_tax_drafts', []),
    portfolio:  _read('upg_portfolio_drafts', []),
    statements: _read('upg_statements_drafts', []),
    pr:         _read('upg_pr_estimates', []),
    calendar:   _read('upg_calendar_drafts', []),
    campaigns:  _read('upg_campaigns', []),
    objections: _read('upg_objections_drafts', []),
  });

  const misc = () => ({
    moodLog:         _read('upg_mood_log', []),
    pathChoice:      _read('upg_path_choice', null),
    accCycleVisited: _read('upg_acc_cycle_visited', []),
    accEqState:      _read('upg_acc_eq_state', {}),
    voiceMeta:       _read('upg_voice_recordings_meta', []),
  });

  const profile  = () => _read('upg_user_profile', null);
  const activity = () => _read('upg_activity_log', []);

  const logActivity = (type, payload) => {
    const log = activity();
    log.unshift({ ts: Date.now(), type, payload: payload || null });
    _write('upg_activity_log', log.slice(0, 200));
  };

  // ─── Computed metrics ───
  const countDone = (dict) => {
    if (!dict || typeof dict !== 'object') return 0;
    return Object.values(dict).filter(v => v === true || (v && typeof v === 'object' && v.completed)).length;
  };
  const countTotal = (dict) => (dict && typeof dict === 'object') ? Object.keys(dict).length : 0;

  const compute = {
    unitsCompleted() {
      return Object.values(progress()).reduce((sum, dict) => sum + countDone(dict), 0);
    },
    avgCompletionRate() {
      const all = Object.values(progress());
      const total = all.reduce((s, d) => s + countTotal(d), 0);
      const done = compute.unitsCompleted();
      if (total === 0) return 0;
      return Math.round((done / total) * 100);
    },
    trainingHours() {
      const log = activity().filter(a => a.type === 'session_end' || a.type === 'session_tick');
      const minutes = log.reduce((sum, e) => sum + (e.payload?.minutes || 0), 0);
      return Math.round(minutes / 6) / 10; // 1 decimal
    },
    streak() {
      const dates = new Set(activity().map(a => new Date(a.ts).toDateString()));
      let streak = 0;
      const d = new Date();
      while (dates.has(d.toDateString())) {
        streak++;
        d.setDate(d.getDate() - 1);
      }
      return streak;
    },
    topScore() {
      const s = scores();
      const all = [...(s.simulator || []), ...(s.objection || []), ...(s.prLab || []), ...(s.interviews || []), ...(s.interviewsHr || [])];
      const nums = all.map(x => typeof x === 'number' ? x : (x?.score ?? x?.value ?? 0));
      return nums.length ? Math.max(...nums) : 0;
    },
    quizzesTaken() {
      const psych = scores().psych || {};
      return Object.keys(psych).length;
    },
    draftCount() {
      return Object.values(drafts()).reduce((s, arr) => s + (Array.isArray(arr) ? arr.length : 0), 0);
    },
    moodAvg(days = 7) {
      const log = misc().moodLog || [];
      const cutoff = Date.now() - days * 86400000;
      const recent = log.filter(m => (m?.ts || 0) > cutoff);
      if (!recent.length) return null;
      const total = recent.reduce((s, m) => s + ((m.energy || 0) + (m.pleasantness || 0)) / 2, 0);
      return total / recent.length;
    },
    workerStats() {
      const p = progress();
      const list = [
        { id: 'fieldsales', key: 'sales',       name: 'المبيعات',     icon: 'briefcase' },
        { id: 'callcenter', key: 'callcenter',  name: 'الكول سنتر',   icon: 'phone' },
        { id: 'accounting', key: 'accounting',  name: 'المحاسبة',     icon: 'calculator' },
        { id: 'programming', key: 'programming', name: 'البرمجة',      icon: 'code' },
        { id: 'social',     key: 'social',      name: 'السوشيال',     icon: 'megaphone' },
        { id: 'phonerepair', key: 'phonerepair', name: 'الصيانة',      icon: 'wrench' },
        { id: 'hrmastery',  key: 'hrmastery',   name: 'HR',           icon: 'briefcase' },
        { id: 'psych',      key: 'psych',       name: 'علم النفس',    icon: 'brain' },
        { id: 'eq',         key: 'eq',          name: 'الذكاء العاطفي',icon: 'heart-handshake' },
      ];
      return list.map(w => {
        const dict = p[w.key] || {};
        const total = countTotal(dict);
        const done  = countDone(dict);
        return {
          ...w,
          total, done,
          pct: total > 0 ? Math.round((done / total) * 100) : 0
        };
      });
    }
  };

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.state = {
    progress, scores, drafts, misc, profile, activity, logActivity, compute, on,
    _read, _write
  };

  // ─── Auto-hooks (passive logging) ───
  document.addEventListener('click', (e) => {
    const navItem = e.target.closest('[data-page]');
    if (navItem) {
      const p = navItem.dataset.page;
      if (p && p !== 'none') logActivity('navigate', { page: p });
    }
    const completeBtn = e.target.closest('[data-action="mark-complete"]');
    if (completeBtn) logActivity('lesson_complete', { ref: completeBtn.dataset.ref || completeBtn.id || null });
  });

  // Session ticks every 5 min, plus end-of-session
  let sessionStart = Date.now();
  let lastTick = sessionStart;
  setInterval(() => {
    const now = Date.now();
    const minutes = Math.round((now - lastTick) / 60000);
    if (minutes >= 5) {
      logActivity('session_tick', { minutes });
      lastTick = now;
    }
  }, 60000);
  window.addEventListener('beforeunload', () => {
    const minutes = Math.round((Date.now() - lastTick) / 60000);
    if (minutes > 0) logActivity('session_end', { minutes });
  });

  // Storage cross-tab sync
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('upg_')) notify(e.key, e.newValue);
  });
})();

/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Dashboard Renderer + page-myprogress + navigateTo wrap
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  // Dispatch upg:page-shown after navigateTo (so cmdk + dashboard can react)
  const wrapNav = () => {
    if (typeof window.navigateTo !== 'function') {
      setTimeout(wrapNav, 50);
      return;
    }
    if (window.navigateTo.__cathedralWrapped) return;
    const orig = window.navigateTo;
    const wrapped = function (pageId) {
      orig.call(this, pageId);
      try { window.dispatchEvent(new CustomEvent('upg:page-shown', { detail: { page: pageId } })); }
      catch (e) { /* noop */ }
    };
    wrapped.__cathedralWrapped = true;
    window.navigateTo = wrapped;
  };
  wrapNav();

  // ─── Helpers ───
  const animateNumber = (el, target, opts = {}) => {
    target = +target || 0;
    const start = +(el.textContent || '0').replace(/[^\d.-]/g, '') || 0;
    const dur = opts.duration ?? 600;
    const t0  = performance.now();
    const isFloat = !Number.isInteger(target) || opts.float;
    if (typeof requestAnimationFrame !== 'function') { el.textContent = isFloat ? target.toFixed(1) : Math.round(target); return; }
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      const cur = start + (target - start) * eased;
      el.textContent = isFloat ? cur.toFixed(1) : Math.round(cur);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const activityIcon = (t) => ({
    navigate:        'chevron-right',
    lesson_complete: 'check-circle',
    session_end:     'check',
    session_tick:    'trending-up',
    quiz_finished:   'star',
  })[t] || 'sparkles';
  const activityLabel = (a) => {
    if (a.type === 'navigate')        return `زيارة <strong>${escapeHtml(a.payload?.page || '—')}</strong>`;
    if (a.type === 'lesson_complete') return `إكمال درس${a.payload?.ref ? ` <strong>${escapeHtml(a.payload.ref)}</strong>` : ''}`;
    if (a.type === 'session_end')     return `انتهاء جلسة (${a.payload?.minutes || 0} دقيقة)`;
    if (a.type === 'session_tick')    return `تدريب نشط (${a.payload?.minutes || 0} د)`;
    if (a.type === 'quiz_finished')   return `إنهاء تقييم${a.payload?.score ? ` بـ ${a.payload.score}` : ''}`;
    return escapeHtml(a.type);
  };
  const relTime = (ts) => {
    const diff = Date.now() - ts;
    if (diff < 0) return 'الآن';
    if (diff < 60_000)        return 'الآن';
    if (diff < 3_600_000)     return `قبل ${Math.round(diff/60000)} د`;
    if (diff < 86_400_000)    return `قبل ${Math.round(diff/3600000)} س`;
    if (diff < 30 * 86_400_000) return `قبل ${Math.round(diff/86400000)} يوم`;
    return new Date(ts).toLocaleDateString('ar-IQ', { year:'numeric', month:'short', day:'numeric' });
  };
  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  const profileInitial = (p) => {
    if (!p?.name) return 'U';
    return String(p.name).trim().charAt(0).toUpperCase() || 'U';
  };

  // ─── Stats / profile bindings (works across both pages) ───
  const renderBindings = (root = document) => {
    if (!window.Upg?.state) return;
    const c = window.Upg.state.compute;
    const p = window.Upg.state.profile();

    root.querySelectorAll('[data-cath-stat]').forEach(el => {
      const key = el.dataset.cathStat;
      if (typeof c[key] === 'function') animateNumber(el, c[key]());
    });
    root.querySelectorAll('[data-cath-bind]').forEach(el => {
      const key = el.dataset.cathBind;
      if (key === 'profile.name')      el.textContent = p?.name || 'صديقي';
      if (key === 'profile.initial')   el.textContent = profileInitial(p);
      if (key === 'profile.role')      el.textContent = p?.role ? p.role : 'متدرّب';
      if (key === 'profile.streakLine') {
        const s = c.streak();
        el.textContent = s > 0
          ? `لديك streak من ${s} ${s === 1 ? 'يوم' : 'أيام'} 🔥 — استمر!`
          : 'ابدأ اليوم وكوّن streak جديد!';
      }
    });
  };

  // ─── Skill grid ───
  const renderSkillGrid = (containerId) => {
    const grid = document.getElementById(containerId);
    if (!grid || !window.Upg?.state) return;
    const list = window.Upg.state.compute.workerStats();
    grid.innerHTML = list.map(w => `
      <button class="cath-skill" type="button" data-page="${escapeHtml(w.id)}" aria-label="${escapeHtml(w.name)} (${w.pct}%)">
        <div class="cath-skill-ring" style="--p:${w.pct}">
          <i class="qi qi-md" data-icon="${escapeHtml(w.icon)}"></i>
        </div>
        <span class="cath-skill-name">${escapeHtml(w.name)}</span>
        <span class="cath-skill-pct">${w.pct}%</span>
      </button>`).join('');
    window.Upg?.icons?.renderAll?.(grid);
  };

  // ─── Activity list (dashboard) ───
  const renderActivityList = (listId, limit = 10) => {
    const list = document.getElementById(listId);
    if (!list || !window.Upg?.state) return;
    const items = window.Upg.state.activity().slice(0, limit);
    if (!items.length) {
      list.innerHTML = `<li class="cath-activity-empty">ابدأ التفاعل مع المنصة لتتبّع نشاطك.</li>`;
      return;
    }
    list.innerHTML = items.map(a => `
      <li>
        <i class="qi" data-icon="${escapeHtml(activityIcon(a.type))}"></i>
        <span>${activityLabel(a)}</span>
        <time datetime="${new Date(a.ts).toISOString()}">${escapeHtml(relTime(a.ts))}</time>
      </li>`).join('');
    window.Upg?.icons?.renderAll?.(list);
  };

  // ─── Drafts list (myprogress) ───
  const renderDraftsList = () => {
    const list = document.getElementById('my-drafts-list');
    if (!list || !window.Upg?.state) return;
    const d = window.Upg.state.drafts();
    const items = [];
    Object.entries(d).forEach(([category, arr]) => {
      if (!Array.isArray(arr)) return;
      const count = arr.length;
      if (count > 0) items.push({ category, count });
    });
    if (!items.length) {
      list.innerHTML = `<li class="cath-activity-empty">لا توجد مسوّدات محفوظة بعد.</li>`;
      return;
    }
    const labels = {
      pitch:'عروض بيع', salary:'مفاوضات راتب', tax:'حسابات ضريبة',
      portfolio:'بورتفوليو', statements:'قوائم مالية', pr:'حملات PR',
      calendar:'تقاويم', campaigns:'حملات', objections:'اعتراضات'
    };
    list.innerHTML = items.map(it => `
      <li>
        <i class="qi" data-icon="bookmark"></i>
        <span>${escapeHtml(labels[it.category] || it.category)}</span>
        <time>${it.count}</time>
      </li>`).join('');
    window.Upg?.icons?.renderAll?.(list);
  };

  // ─── Achievements (top scores) ───
  const renderAchievements = () => {
    const list = document.getElementById('my-achievements-list');
    if (!list || !window.Upg?.state) return;
    const s = window.Upg.state.scores();
    const flatten = (arr, label) => (arr || []).map(x => {
      const score = typeof x === 'number' ? x : (x?.score ?? x?.value);
      return Number.isFinite(score) ? { score, label, ts: x?.ts || 0 } : null;
    }).filter(Boolean);
    const all = [
      ...flatten(s.simulator, 'محاكي مكالمة'),
      ...flatten(s.objection, 'مدرب الاعتراض'),
      ...flatten(s.prLab, 'مختبر PR'),
      ...flatten(s.interviews, 'مقابلة عامة'),
      ...flatten(s.interviewsHr, 'مقابلة HR'),
    ].sort((a, b) => b.score - a.score).slice(0, 8);
    if (!all.length) {
      list.innerHTML = `<li class="cath-activity-empty">لا توجد درجات محفوظة بعد — جرّب المختبرات.</li>`;
      return;
    }
    list.innerHTML = all.map(a => `
      <li>
        <i class="qi" data-icon="trending-up"></i>
        <span>${escapeHtml(a.label)}</span>
        <time>${a.score}</time>
      </li>`).join('');
    window.Upg?.icons?.renderAll?.(list);
  };

  // ─── Activity chart (canvas, 30 days) ───
  const renderProgressChart = () => {
    const canvas = document.getElementById('progress-chart');
    if (!canvas || !window.Upg?.state) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || 600;
    const cssH = 180;
    canvas.width  = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.height = cssH + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const days = 30;
    const buckets = new Array(days).fill(0);
    const today = new Date(); today.setHours(0,0,0,0);
    window.Upg.state.activity().forEach(a => {
      const d = new Date(a.ts || 0); d.setHours(0,0,0,0);
      const diff = Math.round((today.getTime() - d.getTime()) / 86_400_000);
      if (diff >= 0 && diff < days) buckets[days - 1 - diff]++;
    });
    const max = Math.max(1, ...buckets);

    const styles = getComputedStyle(document.documentElement);
    const brandColor = styles.getPropertyValue('--color-brand').trim() || '#66FCF1';
    const trackColor = styles.getPropertyValue('--color-surface-2').trim() || 'rgba(255,255,255,0.06)';
    const axisColor  = styles.getPropertyValue('--color-text-faint').trim() || 'rgba(255,255,255,0.5)';

    const padX = 8, padTop = 14, padBottom = 18;
    const drawArea = cssH - padTop - padBottom;
    const barW = (cssW - padX * 2) / days;

    // Track + bars
    buckets.forEach((v, i) => {
      const x = padX + i * barW;
      ctx.fillStyle = trackColor;
      ctx.fillRect(x + 1, padTop, Math.max(1, barW - 2), drawArea);
      const h = (v / max) * drawArea;
      ctx.fillStyle = brandColor;
      ctx.fillRect(x + 1, padTop + (drawArea - h), Math.max(1, barW - 2), h);
    });

    // X axis labels (every 5 days)
    ctx.fillStyle = axisColor;
    ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
    ctx.textAlign = 'center';
    for (let i = 0; i < days; i += 5) {
      const x = padX + i * barW + barW / 2;
      const d = new Date(today.getTime() - (days - 1 - i) * 86_400_000);
      ctx.fillText(`${d.getDate()}/${d.getMonth() + 1}`, x, cssH - 4);
    }
    // Total label
    ctx.textAlign = 'start';
    const total = buckets.reduce((s,v) => s+v, 0);
    ctx.fillText(`إجمالي: ${total} حدث`, padX, padTop - 4);
  };

  // ─── My-progress action handlers ───
  const wireMyProgressActions = () => {
    document.body.addEventListener('click', (e) => {
      const t = e.target.closest('[data-action="export-progress"]');
      if (t) { exportAllUpg(); }
      const i = e.target.closest('[data-action="import-progress"]');
      if (i) { importAllUpg(); }
      const r = e.target.closest('[data-action="reset-progress"]');
      if (r) { resetAllUpg(); }
    });
  };

  function exportAllUpg() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('upg_')) data[k] = localStorage.getItem(k);
    }
    const payload = { exported_at: new Date().toISOString(), version: 'cathedral-v14', data };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `upgrade-progress-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  function importAllUpg() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'application/json,.json';
    inp.addEventListener('change', () => {
      const file = inp.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          const data = parsed?.data || parsed;
          if (!data || typeof data !== 'object') throw new Error('bad payload');
          if (!confirm('سيتم استبدال بياناتك الحالية. متابعة؟')) return;
          Object.entries(data).forEach(([k, v]) => {
            if (k.startsWith('upg_')) localStorage.setItem(k, v);
          });
          location.reload();
        } catch (e) { alert('ملف غير صالح: ' + e.message); }
      };
      reader.readAsText(file);
    });
    inp.click();
  }
  function resetAllUpg() {
    if (!confirm('سيتم حذف كل تقدمك وبياناتك. هل أنت متأكد؟')) return;
    if (!confirm('تأكيد ثاني — هذا حذف نهائي.')) return;
    Object.keys(localStorage).filter(k => k.startsWith('upg_')).forEach(k => localStorage.removeItem(k));
    sessionStorage.clear();
    location.reload();
  }

  // ─── Render functions ───
  const renderDashboard = () => {
    const root = document.getElementById('page-dashboard');
    if (!root) return;
    renderBindings(root);
    renderSkillGrid('cath-skill-grid');
    renderActivityList('cath-activity-list', 10);
  };
  const renderMyProgress = () => {
    const root = document.getElementById('page-myprogress');
    if (!root) return;
    renderBindings(root);
    renderSkillGrid('cath-skill-grid-progress');
    renderDraftsList();
    renderAchievements();
    renderProgressChart();
  };

  const init = () => {
    wireMyProgressActions();
    renderDashboard();
    renderMyProgress();

    // Re-render on page navigation
    window.addEventListener('upg:page-shown', (e) => {
      const p = e.detail?.page;
      if (p === 'dashboard') renderDashboard();
      else if (p === 'myprogress') renderMyProgress();
    });

    // Re-render on profile/state changes
    window.addEventListener('upg:profile-ready', renderDashboard);
    window.Upg?.state?.on?.('change', () => {
      // Throttle re-renders
      cancelAnimationFrame(init.__rafId);
      init.__rafId = requestAnimationFrame(() => {
        renderDashboard();
        renderMyProgress();
      });
    });

    // Resize handler for chart
    let rT;
    window.addEventListener('resize', () => {
      clearTimeout(rT);
      rT = setTimeout(() => {
        if (!document.getElementById('page-myprogress')?.hidden &&
            document.getElementById('page-myprogress')?.classList.contains('active')) {
          renderProgressChart();
        }
      }, 180);
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Production Pass (Worker 11 / Phase 7)
   Service Worker reg + Focus trap + Console banner + a11y polish
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  // ─── Console banner (only on first load, not on every navigation) ───
  const SHOWN_KEY = '__upg_banner_shown';
  if (!window[SHOWN_KEY]) {
    window[SHOWN_KEY] = true;
    try {
      console.log(
        '%cUpgrade Platform%c   Cathedral v14\n%cAll your data stays on your device. localStorage only.',
        'background:#0E1220;color:#66FCF1;padding:6px 14px;border-radius:6px;font-size:14px;font-weight:700;',
        'color:#999;font-size:12px;font-weight:500;',
        'color:#666;font-size:11px;'
      );
    } catch (e) { /* IE/old console */ }
  }

  // ─── Service Worker registration ───
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    const reg = () => {
      navigator.serviceWorker.register('./sw.js')
        .then(() => { /* registered */ })
        .catch((err) => console.warn('[SW] registration failed:', err));
    };
    if (document.readyState === 'complete') reg();
    else window.addEventListener('load', reg, { once: true });
  }

  // ─── Focus trap for overlays (cmdk, cheatsheet, gateway) ───
  const trapFocus = (container) => {
    if (!container || container.__focusTrapped) return;
    const focusableSel = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    container.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      // Skip if container is hidden
      if (container.hidden || container.getAttribute('aria-hidden') === 'true') return;
      const nodes = Array.from(container.querySelectorAll(focusableSel))
        .filter(n => !n.disabled && n.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last  = nodes[nodes.length - 1];
      const cur   = document.activeElement;
      if (e.shiftKey && cur === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
    });
    container.__focusTrapped = true;
  };
  const wireTraps = () => {
    ['#cmdk-palette', '#shortcut-cheatsheet', '#page-gateway'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) trapFocus(el);
    });
  };

  // ─── Skip link → main focus ───
  const wireSkipLink = () => {
    const link = document.querySelector('.u-skip-link');
    const main = document.getElementById('main');
    if (link && main) {
      link.addEventListener('click', (e) => {
        // Allow default jump, but also focus the main programmatically
        setTimeout(() => main.focus({ preventScroll: false }), 0);
      });
    }
  };

  // ─── Lazy-mount notification (Phase 7 spec optional hook) ───
  const HEAVY_PAGES = new Set(['lab', 'callcenter']);
  const _lazyMounted = new Set();
  window.addEventListener('upg:page-shown', (e) => {
    const page = e.detail?.page;
    if (HEAVY_PAGES.has(page) && !_lazyMounted.has(page)) {
      _lazyMounted.add(page);
      try { window.dispatchEvent(new CustomEvent('upg:lazy-mount', { detail: { page } })); }
      catch (err) { /* noop */ }
    }
  });

  const init = () => { wireTraps(); wireSkipLink(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Expose for debugging
  window.Upg = window.Upg || {};
  window.Upg.production = {
    version: 'cathedral-v14',
    cacheName: 'upgrade-cathedral-v14-1',
    swActive: () => !!navigator.serviceWorker?.controller
  };
})();



/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Type Engine (Worker 12 / Phase 1)
   Public API: window.Upg.type
   - get/set("density",  0..3)         — 0=compact .. 3=spacious
   - get/set("textZoom", 0.875..1.25)  — user-controlled multiplier
   - DENSITY                            — array of density names
   Storage keys: upg_density, upg_text_zoom
   Event:        upg:type-change
   ════════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const KEY_DENSITY = 'upg_density';
  const KEY_ZOOM    = 'upg_text_zoom';
  const DENSITY     = ['compact', 'cozy', 'comfortable', 'spacious'];

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const safeNum = (v, fallback) => {
    if (v === null || v === undefined || v === '') return fallback;
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  };

  const apply = () => {
    const dRaw = safeNum(localStorage.getItem(KEY_DENSITY), 2);
    const zRaw = safeNum(localStorage.getItem(KEY_ZOOM), 1);
    const d = clamp(Math.round(dRaw), 0, 3);
    const z = clamp(zRaw, 0.875, 1.25);
    document.documentElement.dataset.density = DENSITY[d];
    document.documentElement.style.setProperty('--type-zoom', String(z));
  };

  const set = (key, value) => {
    if (key === 'density') {
      const d = clamp(Math.round(safeNum(value, 2)), 0, 3);
      localStorage.setItem(KEY_DENSITY, String(d));
    } else if (key === 'textZoom') {
      const z = clamp(safeNum(value, 1), 0.875, 1.25);
      localStorage.setItem(KEY_ZOOM, String(z));
    } else {
      return;
    }
    apply();
    try { window.dispatchEvent(new CustomEvent('upg:type-change', { detail: { key, value } })); }
    catch (_) { /* noop */ }
  };

  const get = (key) => {
    if (key === 'density') {
      const d = clamp(Math.round(safeNum(localStorage.getItem(KEY_DENSITY), 2)), 0, 3);
      return DENSITY[d];
    }
    if (key === 'textZoom') {
      return clamp(safeNum(localStorage.getItem(KEY_ZOOM), 1), 0.875, 1.25);
    }
    return null;
  };

  // Apply on load — before paint when possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }

  window.Upg = window.Upg || {};
  window.Upg.type = Object.freeze({ get, set, DENSITY: Object.freeze([...DENSITY]) });
})();



/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Scroll Observer (Worker 12 / Phase 3)
   Toggles data-scrolled="true|false" on #topbar and #sidebar when content
   scrolls past 4px. Powers material elevation transitions.
   Public API: window.Upg.scroll = { update() }
   ════════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const SCROLL_THRESHOLD = 4;
  let raf = 0;
  let main, top, side;

  const refsValid = () => {
    main = main || document.getElementById('main');
    top  = top  || document.getElementById('topbar');
    side = side || document.getElementById('sidebar');
    return !!(main && top);
  };

  const update = () => {
    raf = 0;
    if (!refsValid()) return;
    const y = main.scrollTop || window.scrollY || document.documentElement.scrollTop || 0;
    const scrolled = y > SCROLL_THRESHOLD;
    const value = String(scrolled);
    if (top.dataset.scrolled !== value)  top.dataset.scrolled  = value;
    if (side && side.dataset.scrolled !== value) side.dataset.scrolled = value;
  };

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  const wire = () => {
    if (!refsValid()) return;
    main.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire, { once: true });
  } else {
    wire();
  }

  window.Upg = window.Upg || {};
  window.Upg.scroll = Object.freeze({ update });
})();



/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Navigation Chrome (Worker 12 / Phase 4)
   Public API: window.Upg.nav.{ collapse, expand, toggle, isCollapsed,
                                 openDrawer, closeDrawer, toggleDrawer }
   Storage: upg_sidebar_collapsed
   Shortcut: Cmd+\ / Ctrl+\ toggles collapse
   View Transitions: wrap nav-item active class swaps for smooth pill slide.
   ════════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const KEY_COLLAPSED = 'upg_sidebar_collapsed';
  const html = document.documentElement;

  const applyCollapsed = (v) => {
    if (v) html.dataset.sidebar = 'collapsed';
    else   html.dataset.sidebar = 'expanded';
    try { localStorage.setItem(KEY_COLLAPSED, v ? '1' : '0'); } catch (_) {}
  };

  const isCollapsed = () => html.dataset.sidebar === 'collapsed';
  const collapse    = () => applyCollapsed(true);
  const expand      = () => applyCollapsed(false);
  const toggle      = () => applyCollapsed(!isCollapsed());

  const openDrawer  = () => { html.dataset.sidebarMobile = 'open'; };
  const closeDrawer = () => { delete html.dataset.sidebarMobile; };
  const toggleDrawer = () => {
    if (html.dataset.sidebarMobile === 'open') closeDrawer();
    else openDrawer();
  };

  // Restore prior state — but only if user previously chose explicitly
  try {
    const stored = localStorage.getItem(KEY_COLLAPSED);
    if (stored === '1') collapse();
    else if (stored === '0') expand();
  } catch (_) { /* noop */ }

  // Cmd+\ / Ctrl+\ — toggle collapse
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
      e.preventDefault();
      toggle();
    }
  });

  // Wire any element with data-action="toggle-sidebar" / "open-drawer" / "close-drawer"
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-action]');
    if (!t) return;
    const a = t.dataset.action;
    if (a === 'toggle-sidebar') { e.preventDefault(); toggle(); }
    else if (a === 'open-drawer')  { e.preventDefault(); openDrawer(); }
    else if (a === 'close-drawer') { e.preventDefault(); closeDrawer(); }
  });

  // Esc closes the mobile drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && html.dataset.sidebarMobile === 'open') {
      closeDrawer();
    }
  });

  window.Upg = window.Upg || {};
  window.Upg.nav = Object.freeze({
    collapse, expand, toggle, isCollapsed,
    openDrawer, closeDrawer, toggleDrawer
  });
})();

/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — View-Transition wrapper for nav-item active swap (Phase 4)
   When a user clicks a sidebar nav-item, the active state swap is wrapped in
   document.startViewTransition so the indicator pill slides smoothly. Falls
   back to direct class change when the API is unavailable.
   ════════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const supported = typeof document.startViewTransition === 'function';

  sidebar.addEventListener('click', (e) => {
    const item = e.target.closest('.nav-item[data-page]');
    if (!item || item.classList.contains('active')) return;
    if (!supported) return; // existing handler will set active class normally

    // Pre-empt the default handler: we set active first inside a transition,
    // then dispatch a synthetic event so legacy navigation logic still runs.
    const previously = sidebar.querySelector('.nav-item.active');

    document.startViewTransition(() => {
      if (previously) previously.classList.remove('active');
      item.classList.add('active');
    });
  }, true);
})();



/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Per-Page Identity Tint (Worker 12 / Phase 5)
   Public API: window.Upg.identity.{ setTint, getTint }
   Sets [data-active-tint] on <html> when user navigates between pages.
   Works by:
     1. Observing .page.active mutations (mutation observer).
     2. Wrapping window.navigateTo if present.
     3. Reading initial active page on load.
   ════════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const html = document.documentElement;

  const setTint = (page) => {
    const slug = (page || 'dashboard').toString().replace(/^page-/, '');
    if (html.dataset.activeTint !== slug) html.dataset.activeTint = slug;
  };
  const getTint = () => html.dataset.activeTint || 'dashboard';

  const detectActive = () => {
    const a = document.querySelector('.page.active');
    if (a && a.id) setTint(a.id.replace(/^page-/, ''));
  };

  // Wrap window.navigateTo if defined
  const tryWrap = () => {
    if (typeof window.navigateTo !== 'function' || window.__auroraNavWrapped) return;
    const original = window.navigateTo;
    window.navigateTo = function (pageId, ...rest) {
      try { setTint(pageId); } catch (_) {}
      return original.call(this, pageId, ...rest);
    };
    window.__auroraNavWrapped = true;
  };

  // Mutation observer on main container watching for class="page active" toggles
  const wireObserver = () => {
    const main = document.getElementById('main') || document.body;
    if (!main) return;
    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          const t = m.target;
          if (t && t.classList && t.classList.contains('page') && t.classList.contains('active')) {
            setTint(t.id ? t.id.replace(/^page-/, '') : 'dashboard');
            return;
          }
        }
      }
    });
    obs.observe(main, { subtree: true, attributes: true, attributeFilter: ['class'] });
  };

  const init = () => {
    detectActive();
    tryWrap();
    wireObserver();
    // Retry wrap a few times because navigateTo may register after this IIFE
    let tries = 0;
    const retry = setInterval(() => {
      tryWrap();
      if (++tries > 10 || window.__auroraNavWrapped) clearInterval(retry);
    }, 200);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.Upg = window.Upg || {};
  window.Upg.identity = Object.freeze({ setTint, getTint });
})();

/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Time-of-Day Greeting (Worker 12 / Phase 5)
   Public API: window.Upg.greet.{ refresh }
   - Replaces "أهلاً" line in cath-dash-greeting with time-aware version.
   - Uses Upg.state.profile() if available, else falls back to "صديقي".
   - Re-runs every 30 minutes to keep greeting current.
   ════════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const getName = () => {
    try {
      const p = window.Upg && window.Upg.state && typeof window.Upg.state.profile === 'function'
        ? window.Upg.state.profile() : null;
      return (p && (p.name || p.displayName)) || 'صديقي';
    } catch (_) { return 'صديقي'; }
  };

  const prefixForHour = (h) => {
    if (h >= 4  && h < 12) return 'صباح الخير';
    if (h >= 12 && h < 17) return 'يوم سعيد';
    if (h >= 17 && h < 21) return 'مساء النور';
    return 'مساء الخير';
  };

  const refresh = () => {
    // primary: any [data-greet-title]
    const target = document.querySelector('[data-greet-title]');
    if (target) {
      const name = getName();
      target.textContent = `${prefixForHour(new Date().getHours())}، ${name} 👋`;
    }
    // also augment cath-dash greeting "أهلاً <name> 👋" with time-aware prefix
    const cathH2 = document.querySelector('.cath-dash-greeting-text h2');
    if (cathH2 && !cathH2.dataset.auroraGreet) {
      cathH2.dataset.auroraGreet = '1';
      const nameEl = cathH2.querySelector('[data-cath-bind="profile.name"]');
      const before = cathH2.firstChild; // text node "أهلاً "
      if (before && before.nodeType === 3) {
        before.nodeValue = `${prefixForHour(new Date().getHours())} `;
      }
    }
  };

  const init = () => {
    refresh();
    // Refresh every 30 minutes to catch crossings (e.g., 11:55 → 12:05)
    setInterval(refresh, 30 * 60 * 1000);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.Upg = window.Upg || {};
  window.Upg.greet = Object.freeze({ refresh });
})();

/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Count-Up Tickers (Worker 12 / Phase 5)
   Public API: window.Upg.countup.{ run, observe }
   - Hooks any element with [data-countup] OR .cath-stat-value [data-cath-stat]
   - Reads numeric target from element textContent (or data-countup="N")
   - Tweens 0 → target over 1200ms with easeOutCubic
   - Observes intersection so animation triggers on visibility, not page-load
   ════════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const formatValue = (v, decimals, locale) => {
    if (decimals > 0) return v.toFixed(decimals);
    return Math.round(v).toLocaleString(locale || 'ar-IQ');
  };

  const parseTarget = (el) => {
    const raw = (el.dataset.countup && el.dataset.countup !== '' && el.dataset.countup !== '1')
      ? el.dataset.countup
      : el.textContent;
    const num = parseFloat(String(raw).replace(/[^\d.\-]/g, ''));
    return Number.isFinite(num) ? num : 0;
  };

  const run = (el, target, duration) => {
    if (!el) return;
    const tgt = (target == null) ? parseTarget(el) : Number(target);
    const dur = Number(duration) || 1100;
    const text = String(tgt);
    const decimals = (text.split('.')[1] || '').length;

    // Honor reduced-motion
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = formatValue(tgt, decimals);
      el.dataset.countupDone = '1';
      return;
    }

    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const v = tgt * easeOutCubic(t);
      el.textContent = formatValue(v, decimals);
      if (t < 1) requestAnimationFrame(tick);
      else el.dataset.countupDone = '1';
    };
    requestAnimationFrame(tick);
  };

  const observe = () => {
    const explicit = Array.from(document.querySelectorAll('[data-countup]'));
    // Also opt-in for cath-stat-value automatically
    const auto = Array.from(document.querySelectorAll('.cath-stat-value'))
      .filter(el => !el.hasAttribute('data-countup'));
    auto.forEach(el => el.setAttribute('data-countup', ''));
    const all = explicit.concat(auto);
    if (!all.length) return;

    if (!('IntersectionObserver' in window)) {
      all.forEach(el => run(el));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting || en.target.dataset.countupDone === '1') return;
        run(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.35 });
    all.forEach(el => io.observe(el));
  };

  const init = () => {
    observe();
    // Re-observe whenever a new page becomes active (lazy mount, navigation)
    window.addEventListener('upg:lazy-mount', observe);
    window.addEventListener('upg:state-update', observe);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else setTimeout(init, 100); // give Worker 11 state engine a moment to render

  window.Upg = window.Upg || {};
  window.Upg.countup = Object.freeze({ run, observe });
})();



/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Motion Engine (Worker 12 / Phase 6)
   Public API: window.Upg.motion = { reveal(root), refreshGlow(root) }
   Wires: cursor-glow tracking, stagger-reveal observer, view-transition-wrap
   for navigateTo. Honors prefers-reduced-motion.
   ════════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Cursor glow on .u-card-glow ────────────────────────────────────────
  const wireCursorGlow = () => {
    if (reduceMotion()) return;
    document.addEventListener('pointermove', (e) => {
      const card = e.target && e.target.closest && e.target.closest('.u-card-glow');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }, { passive: true });
  };

  // ─── Stagger-reveal observer ────────────────────────────────────────────
  const reveal = (root) => {
    const scope = root || document;
    const list = scope.querySelectorAll('[data-reveal]:not([data-revealed="true"])');
    if (!list.length) return;

    if (!('IntersectionObserver' in window) || reduceMotion()) {
      list.forEach((el) => { el.dataset.revealed = 'true'; });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      let i = 0;
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const delay = Math.min(i++ * 35, 280);
        en.target.style.transitionDelay = `${delay}ms`;
        en.target.dataset.revealed = 'true';
        io.unobserve(en.target);
      });
    }, { threshold: 0.12 });
    list.forEach(el => io.observe(el));
  };

  // ─── Auto-tag eligible nodes for reveal + glow + lift ───────────────────
  const refreshGlow = (root) => {
    const scope = root || document;
    // Bento direct children get reveal + lift + glow
    scope.querySelectorAll('.bento > *:not([data-aurora-tagged])').forEach(n => {
      n.setAttribute('data-reveal', '');
      n.classList.add('u-lift', 'u-card-glow');
      n.dataset.auroraTagged = '1';
    });
    // Cathedral cards / stat tiles / surface cards
    scope.querySelectorAll('.cath-stat:not([data-aurora-tagged]), .cath-dash-card:not([data-aurora-tagged]), .stat-tile:not([data-aurora-tagged]), .surface-card:not([data-aurora-tagged])').forEach(n => {
      n.classList.add('u-lift', 'u-card-glow');
      n.dataset.auroraTagged = '1';
    });
    // Quick action buttons get press feedback
    scope.querySelectorAll('.cath-quick-action:not([data-aurora-tagged]), .dock-btn:not([data-aurora-tagged])').forEach(n => {
      n.classList.add('u-press');
      n.dataset.auroraTagged = '1';
    });
  };

  const init = () => {
    refreshGlow();
    wireCursorGlow();
    reveal();
    // Re-tag on lazy mounts (heavy pages) and state updates
    window.addEventListener('upg:lazy-mount', () => { refreshGlow(); reveal(); });
    window.addEventListener('upg:state-update', () => { refreshGlow(); reveal(); });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else setTimeout(init, 50);

  window.Upg = window.Upg || {};
  window.Upg.motion = Object.freeze({ reveal, refreshGlow });
})();

/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — View-Transition wrapper for navigateTo (Worker 12 / Phase 6)
   Wraps the global navigateTo so page changes use document.startViewTransition
   when supported. Falls back gracefully on unsupported browsers.
   ════════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const tryWrap = () => {
    if (typeof window.navigateTo !== 'function' || window.__auroraVTWrapped) return;
    if (typeof document.startViewTransition !== 'function') {
      window.__auroraVTWrapped = true; // mark "wrap not needed"
      return;
    }
    const original = window.navigateTo;
    window.navigateTo = function (pageId, ...rest) {
      try {
        return document.startViewTransition(() => original.call(this, pageId, ...rest));
      } catch (_) {
        return original.call(this, pageId, ...rest);
      }
    };
    window.__auroraVTWrapped = true;
  };

  let tries = 0;
  const t = setInterval(() => {
    tryWrap();
    if (++tries > 12 || window.__auroraVTWrapped) clearInterval(t);
  }, 200);
  tryWrap();
})();



/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Phase 7: Boot Banner + Sanity Assert (Worker 12)
   - One-shot banner per session.
   - Sanity-checks every Upg.* module is wired.
   - Reports any missing module via console.warn (non-fatal).
   ════════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const REQUIRED = [
    'theme', 'icons', 'gateway', 'calc', 'cmdk', 'state', 'production',
    'type', 'scroll', 'nav', 'identity', 'greet', 'countup', 'motion'
  ];

  const runSanity = () => {
    const upg = window.Upg || {};
    const missing = REQUIRED.filter((k) => !upg[k]);
    if (missing.length) {
      console.warn('[AURORA] missing Upg.* modules:', missing);
    }
    try {
      if (!sessionStorage.getItem('upg_aurora_banner')) {
        sessionStorage.setItem('upg_aurora_banner', '1');
        const present = REQUIRED.length - missing.length;
        const bg = 'background:#0E1220;color:#66FCF1;padding:4px 10px;border-radius:6px;font-weight:bold;';
        const dim = 'color:#94A3B8;';
        console.log(
          '%c AURORA v15 %c  منصة Upgrade — Apple-grade UI/UX  %c(%d/%d modules)',
          bg, '', dim, present, REQUIRED.length
        );
      }
    } catch (_) { /* sessionStorage may be blocked */ }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runSanity, { once: true });
  } else {
    // Defer slightly to allow other IIFEs to register before we measure.
    setTimeout(runSanity, 0);
  }
})();



/* ═══════════════════════════════════════════════════════════════
   AURORA v15.1 — Boot Sanity Assert (Worker 13 / Phase 3)
   يفحص أن كل 14 Upg API محمّلين.
   لا يكسر شي — فقط يطبع banner واضح في console.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const REQUIRED = [
    'theme', 'icons', 'gateway', 'calc', 'cmdk', 'state', 'production',
    'type', 'scroll', 'nav', 'identity', 'greet', 'countup', 'motion'
  ];

  // Wait until DOMContentLoaded so all earlier IIFEs have executed.
  const check = () => {
    const upg = window.Upg || {};
    const missing = REQUIRED.filter(k => !upg[k]);
    try {
      if (missing.length === 0) {
        // Success: log a one-shot banner (avoid spam on every visit).
        if (!sessionStorage.getItem('upg_v151_banner')) {
          sessionStorage.setItem('upg_v151_banner', '1');
          console.log(
            '%c AURORA v15.1 ',
            'background:#0E1220;color:#66FCF1;padding:4px 8px;border-radius:4px;font-weight:bold;',
            'كل الـ 14 modules محمّلين بنجاح'
          );
        }
      } else {
        console.warn(
          '%c AURORA v15.1 ',
          'background:#7c2d12;color:#fef3c7;padding:4px 8px;border-radius:4px;font-weight:bold;',
          'modules ناقصين:', missing
        );
      }
    } catch (_) { /* sessionStorage may be blocked */ }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', check, { once: true });
  } else {
    // DOM ready already; run on next tick to let any pending IIFE finish.
    setTimeout(check, 0);
  }
})();


/* ============================================================
   ATELIER v16 — Material Density API (Worker 14 / Phase 1)
   Public API: window.Upg.material.{ get, set, cycle }
   States: 'low' | 'standard' | 'high'
   Persists to localStorage('upg_material_density').
   Dispatches CustomEvent('upg:material:change') on change.
   ============================================================ */
(() => {
  'use strict';
  const KEY = 'upg_material_density';
  const ORDER = ['low', 'standard', 'high'];

  const get = () => {
    try { return localStorage.getItem(KEY) || 'standard'; }
    catch (_) { return 'standard'; }
  };
  const apply = (v) => {
    if (!document.body) return;
    if (v === 'standard') document.body.removeAttribute('data-material-density');
    else document.body.setAttribute('data-material-density', v);
  };
  const set = (v) => {
    if (!ORDER.includes(v)) return;
    try { localStorage.setItem(KEY, v); } catch (_) {}
    apply(v);
    document.dispatchEvent(new CustomEvent('upg:material:change', { detail: { density: v } }));
  };
  const cycle = () => {
    const cur = get();
    const next = ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length];
    set(next);
    return next;
  };

  // Apply on boot — handle both DOM-ready and pre-ready cases.
  const boot = () => apply(get());
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  window.Upg = window.Upg || {};
  window.Upg.material = { get, set, cycle };
})();




/* ════════════════════════════════════════════════════════════════════════════
   ATELIER v16 — Chrome Coordinator (Worker 14 / Phase 4)
   Public API: window.Upg.chrome.{ init, movePill, openSearch, closeDrawer }
   Wires:
     - data-action="open-cmdk" → Upg.cmdk.open()
     - active nav-item changes → spring slide of .nav-pill-indicator
     - Mobile drawer: swipe-to-close + scrim click (close-drawer already handled
       by Upg.nav delegation, this adds touch swipe)
   Sacred: Upg.scroll, Upg.nav, Upg.cmdk untouched. Read-only consumers.
   ════════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const html = document.documentElement;
  let sidebar = null;
  let pill    = null;

  const ensureRefs = () => {
    sidebar = sidebar || document.getElementById('sidebar');
    pill    = pill    || (sidebar && sidebar.querySelector('.nav-pill-indicator'));
    return !!sidebar;
  };

  // 1) Search button → command palette --------------------------------------
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="open-cmdk"]');
    if (!btn) return;
    e.preventDefault();
    if (window.Upg && window.Upg.cmdk && typeof window.Upg.cmdk.open === 'function') {
      window.Upg.cmdk.open();
    }
  });

  // 2) Pill indicator — slide to active nav-item ----------------------------
  const movePill = (targetItem) => {
    if (!ensureRefs() || !pill || !targetItem) return;
    const sb = sidebar.getBoundingClientRect();
    const it = targetItem.getBoundingClientRect();
    const top = (it.top - sb.top) + (sidebar.scrollTop || 0);
    pill.style.height    = it.height + 'px';
    pill.style.transform = 'translateY(' + top + 'px)';
    pill.classList.add('is-active');
    // Tell CSS to suppress the legacy ::before pill while JS pill is active
    html.dataset.sidebarPill = 'js';
  };

  const updatePillFromActive = () => {
    if (!ensureRefs()) return;
    const active = sidebar.querySelector('.nav-item.active');
    if (active) movePill(active);
  };

  // Watch for active class changes on nav-items
  const initPillObserver = () => {
    if (!ensureRefs() || !('MutationObserver' in window)) return;
    const items = sidebar.querySelectorAll('.nav-item');
    if (!items.length) return;
    const mo = new MutationObserver(updatePillFromActive);
    items.forEach((it) => {
      mo.observe(it, { attributes: true, attributeFilter: ['class'] });
    });
  };

  // Re-position pill on resize, theme change, sidebar collapse toggle
  const repositionEvents = ['resize'];
  repositionEvents.forEach((ev) =>
    window.addEventListener(ev, () => requestAnimationFrame(updatePillFromActive), { passive: true })
  );
  // Also reposition when sidebar collapse state attribute flips
  if ('MutationObserver' in window) {
    const htmlObs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.attributeName === 'data-sidebar' || m.attributeName === 'data-theme') {
          // Wait for CSS transition to settle, then snap pill position
          setTimeout(updatePillFromActive, 320);
          break;
        }
      }
    });
    htmlObs.observe(html, { attributes: true });
  }

  // 3) Mobile drawer — swipe-to-close (Upg.nav handles open/close core) -----
  let touchStartX = null;
  let touchStartY = null;
  const onTouchStart = (e) => {
    if (window.innerWidth > 980) return;
    if (html.dataset.sidebarMobile !== 'open') return;
    const t = e.touches && e.touches[0];
    if (!t) return;
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  };
  const onTouchEnd = (e) => {
    if (touchStartX === null) return;
    const t = e.changedTouches && e.changedTouches[0];
    if (!t) { touchStartX = null; return; }
    const dx = t.clientX - touchStartX;
    const dy = Math.abs(t.clientY - touchStartY);
    // Treat as horizontal swipe only (ignore mostly-vertical)
    if (dy < 40 && Math.abs(dx) > 60) {
      if (window.Upg && window.Upg.nav && typeof window.Upg.nav.closeDrawer === 'function') {
        window.Upg.nav.closeDrawer();
      } else {
        delete html.dataset.sidebarMobile;
      }
    }
    touchStartX = null;
    touchStartY = null;
  };

  const wireSwipe = () => {
    if (!ensureRefs()) return;
    sidebar.addEventListener('touchstart', onTouchStart, { passive: true });
    sidebar.addEventListener('touchend',   onTouchEnd,   { passive: true });
  };

  // 4) Boot -----------------------------------------------------------------
  const boot = () => {
    ensureRefs();
    initPillObserver();
    wireSwipe();
    // Initial pill placement after layout settles
    setTimeout(updatePillFromActive, 80);
    // Second pass once fonts/icons fully loaded (avoids early mis-measure)
    setTimeout(updatePillFromActive, 320);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  // Public API ---------------------------------------------------------------
  window.Upg = window.Upg || {};
  window.Upg.chrome = Object.freeze({
    init: boot,
    movePill: updatePillFromActive,
    openSearch: () => (window.Upg && window.Upg.cmdk && window.Upg.cmdk.open && window.Upg.cmdk.open()),
    closeDrawer: () => (window.Upg && window.Upg.nav && window.Upg.nav.closeDrawer && window.Upg.nav.closeDrawer())
  });
})();




/* ════════════════════════════════════════════════════════════════════════════
   ATELIER v16 — Choreography Engine (Worker 14 / Phase 5)
   Public API: window.Upg.choreo.{ refresh, magnetize, reveal, stagger, cursorGlow }
   - Magnetic hover for [data-magnet] (≤6px pull within 80px range)
   - Reveal on intersect for [data-reveal]
   - Stagger children for [data-stagger] (60ms default step, override with data-stagger-step)
   - Cursor glow tracking for .u-cursor-glow
   Sacred: untouched APIs (Upg.motion, Upg.countup, navigateTo).
   prefers-reduced-motion → all motion disabled, content shown instantly.
   ════════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Magnetic hover ------------------------------------------------------
  const MAGNET_RANGE = 80;
  const MAGNET_STRENGTH = 0.18;

  const magnetize = (el) => {
    if (!el || reduced || el.dataset.magnetized === 'true') return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > MAGNET_RANGE) return;
      const factor = (1 - dist / MAGNET_RANGE) * MAGNET_STRENGTH;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = 'translate(' + (dx * factor).toFixed(2) + 'px, ' + (dy * factor).toFixed(2) + 'px)';
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.dataset.magnetized = 'true';
  };

  // 2) Reveal on intersect -------------------------------------------------
  let revealIO = null;
  const reveal = () => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-revealed)');
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-revealed'));
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            revealIO.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    }
    els.forEach((el) => revealIO.observe(el));
  };

  // 3) Stagger children ---------------------------------------------------
  let staggerIO = null;
  const stagger = () => {
    const els = document.querySelectorAll('[data-stagger]:not(.is-staggered)');
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-staggered'));
      return;
    }
    if (!staggerIO) {
      staggerIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const step = parseInt(e.target.dataset.staggerStep || '60', 10);
          Array.from(e.target.children).forEach((child, i) => {
            child.style.setProperty('--stagger-delay', (i * step) + 'ms');
          });
          e.target.classList.add('is-staggered');
          staggerIO.unobserve(e.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    }
    els.forEach((el) => staggerIO.observe(el));
  };

  // 4) Cursor glow --------------------------------------------------------
  const cursorGlow = () => {
    if (reduced) return;
    document.addEventListener('mousemove', (e) => {
      const el = e.target.closest && e.target.closest('.u-cursor-glow');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--cx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--cy', (e.clientY - r.top) + 'px');
    }, { passive: true });
  };

  // 5) Refresh — re-applies all hooks for new DOM (post-navigation) -------
  const refresh = () => {
    document.querySelectorAll('[data-magnet]').forEach(magnetize);
    reveal();
    stagger();
  };

  // Boot
  const boot = () => { refresh(); cursorGlow(); };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.choreo = Object.freeze({ refresh, magnetize, reveal, stagger, cursorGlow });
})();


/* ════════════════════════════════════════════════════════════════════════════
   ATELIER v16 — Page Transition Wrap (Worker 14 / Phase 5)
   Public API: window.Upg.transition.{ navigate, supports }
   Wraps existing window.navigateTo() with View Transitions API where
   available, otherwise applies an .is-entering CSS animation as fallback.
   Listens to [data-page] click delegation; respects existing onclick handlers
   for backward compatibility (legacy v12 nav-items use onclick="navigateTo(…)").
   ════════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const supports = typeof document.startViewTransition === 'function';

  const playFallback = () => {
    requestAnimationFrame(() => {
      const target = document.querySelector('.page.active');
      if (!target) return;
      target.classList.remove('is-entering');
      // Force reflow so we can re-add the class and trigger animation
      // eslint-disable-next-line no-unused-expressions
      void target.offsetWidth;
      target.classList.add('is-entering');
      target.addEventListener('animationend', () => {
        target.classList.remove('is-entering');
      }, { once: true });
    });
  };

  const navigate = (pageId) => {
    if (typeof window.navigateTo !== 'function' || !pageId) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (supports && !reduced) {
      try {
        const vt = document.startViewTransition(() => { window.navigateTo(pageId); });
        if (vt && vt.finished && typeof vt.finished.finally === 'function') {
          vt.finished.finally(() => {
            if (window.Upg && window.Upg.choreo && window.Upg.choreo.refresh) {
              window.Upg.choreo.refresh();
            }
          });
        }
        return;
      } catch (_) { /* fall through to fallback */ }
    }

    window.navigateTo(pageId);
    if (!reduced) playFallback();
    if (window.Upg && window.Upg.choreo && window.Upg.choreo.refresh) {
      window.Upg.choreo.refresh();
    }
  };

  // Click delegation for [data-page] elements without inline onclick.
  // We do NOT preventDefault on the legacy onclick path — it self-handles.
  document.addEventListener('click', (e) => {
    const el = e.target.closest && e.target.closest('[data-page]');
    if (!el) return;
    const page = el.dataset.page;
    if (!page || page === 'none' || page === '') return;
    if (el.hasAttribute('onclick')) return; // legacy path
    e.preventDefault();
    navigate(page);
  });

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.transition = Object.freeze({ navigate, supports });
})();



/* ============================================================
   ATELIER v16 — Focus Trap (Worker 14 / Phase 6)
   Public API: window.Upg.focusTrap.{ enable, disable }

   Use:
     const opener = document.activeElement;
     Upg.focusTrap.enable(modalEl, opener);
     // ...later, when closing:
     Upg.focusTrap.disable(modalEl);

   Behaviour:
   - Tab/Shift+Tab cycles inside `container`.
   - ESC clicks `[data-close]` inside container if present, else
     dispatches a `focusTrap:escape` CustomEvent caller can listen to.
   - First focusable element receives focus on enable.
   - On disable, focus returns to `returnFocusEl`.
   ============================================================ */
(() => {
  'use strict';
  const FOCUSABLE_SEL = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'audio[controls]',
    'video[controls]',
    'details > summary:first-of-type',
  ].join(',');

  const traps = new WeakMap();

  const getFocusables = (container) => {
    if (!container) return [];
    const all = container.querySelectorAll(FOCUSABLE_SEL);
    // Filter out invisible elements (display:none, hidden attr, etc.)
    return Array.from(all).filter((el) => {
      if (el.hasAttribute('hidden')) return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 || rect.height > 0 || el === document.activeElement;
    });
  };

  const enable = (container, returnFocusEl) => {
    if (!container || traps.has(container)) return;

    const handler = (e) => {
      if (e.key !== 'Tab') return;
      const items = getFocusables(container);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const escHandler = (e) => {
      if (e.key !== 'Escape') return;
      const closeBtn = container.querySelector('[data-close]');
      if (closeBtn) {
        e.stopPropagation();
        closeBtn.click();
      } else {
        container.dispatchEvent(new CustomEvent('focusTrap:escape', { bubbles: true }));
      }
    };

    container.addEventListener('keydown', handler);
    container.addEventListener('keydown', escHandler);
    traps.set(container, { handler, escHandler, returnFocusEl: returnFocusEl || null });

    // Send focus to first focusable on next tick (allow opening transition)
    requestAnimationFrame(() => {
      const items = getFocusables(container);
      if (items.length) items[0].focus();
    });
  };

  const disable = (container) => {
    const t = traps.get(container);
    if (!t) return;
    container.removeEventListener('keydown', t.handler);
    container.removeEventListener('keydown', t.escHandler);
    traps.delete(container);
    if (t.returnFocusEl && typeof t.returnFocusEl.focus === 'function') {
      try { t.returnFocusEl.focus(); } catch (_) {}
    }
  };

  window.Upg = window.Upg || {};
  window.Upg.focusTrap = { enable, disable };
})();


/* ============================================================
   ATELIER v16 — Auto-attach Focus Trap on common modals
   Heuristic: any element matching [role="dialog"], .modal, .qmodal,
   or [data-modal] that becomes "open" (class .is-open / aria-modal=true)
   gets a focus trap automatically. Disable when closed.
   ============================================================ */
(() => {
  'use strict';
  const SEL = '[role="dialog"], .modal, .qmodal, [data-modal]';

  const isOpen = (el) =>
    el.classList.contains('is-open') ||
    el.getAttribute('aria-modal') === 'true' ||
    (el.style && el.style.display && el.style.display !== 'none' && el.hasAttribute('data-modal-open'));

  const wire = (el) => {
    if (el.__atelierTrapWired) return;
    el.__atelierTrapWired = true;
    const observer = new MutationObserver(() => {
      const open = isOpen(el);
      if (open && !el.__atelierTrapped) {
        el.__atelierTrapped = true;
        const opener = document.activeElement && document.activeElement !== el && !el.contains(document.activeElement)
          ? document.activeElement
          : null;
        if (window.Upg && window.Upg.focusTrap) window.Upg.focusTrap.enable(el, opener);
      } else if (!open && el.__atelierTrapped) {
        el.__atelierTrapped = false;
        if (window.Upg && window.Upg.focusTrap) window.Upg.focusTrap.disable(el);
      }
    });
    observer.observe(el, { attributes: true, attributeFilter: ['class', 'style', 'aria-modal', 'data-modal-open'] });
  };

  const refresh = () => document.querySelectorAll(SEL).forEach(wire);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refresh, { once: true });
  } else {
    refresh();
  }
  // Re-scan periodically for SPA-injected modals (cheap)
  setTimeout(refresh, 1500);
  setTimeout(refresh, 4000);

  window.Upg = window.Upg || {};
  window.Upg.focusTrap = window.Upg.focusTrap || {};
  window.Upg.focusTrap.refresh = refresh;
})();


/* ============================================================
   ATELIER v16 — Lighthouse Boot Helper (Worker 14 / Phase 6)
   - Adds passive listeners hint on common scrollers
   - Lazy-loads images with no loading attr
   - Prefetch on hover for nav-items (perceived speed)
   ============================================================ */
(() => {
  'use strict';

  // Lazy-loading hint on all <img> without explicit loading attr
  const lazyImages = () => {
    document.querySelectorAll('img:not([loading])').forEach((img) => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    });
  };

  // Prefetch hint on nav-item hover (CSS already does view-transitions; this primes any sub-resource)
  const navPrefetch = () => {
    document.querySelectorAll('.nav-item[data-page]').forEach((el) => {
      let primed = false;
      el.addEventListener('pointerenter', () => {
        if (primed) return;
        primed = true;
        // Cheap warm-up: requestIdleCallback-style schedule
        const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
        idle(() => {
          // No-op: marker; real prefetching not needed for SPA in-memory pages.
          el.dataset.prefetched = '1';
        });
      }, { passive: true });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { lazyImages(); navPrefetch(); }, { once: true });
  } else {
    lazyImages();
    navPrefetch();
  }
})();


/* ============================================================
   ATELIER v16 — Sanity Banner (Worker 14 / Phase 6)
   Final boot assert — verifies all 19 Upg.* modules are present.
   Prints PASS banner or warns about missing modules.
   ============================================================ */
(() => {
  'use strict';
  const REQUIRED = [
    // Worker 11 (7)
    'theme', 'icons', 'gateway', 'calc', 'cmdk', 'state', 'production',
    // Worker 12 (7)
    'type', 'scroll', 'nav', 'identity', 'greet', 'countup', 'motion',
    // Worker 14 (5)
    'material', 'chrome', 'choreo', 'transition', 'focusTrap',
  ];

  const check = () => {
    const present = REQUIRED.filter((k) => window.Upg && typeof window.Upg[k] !== 'undefined');
    const missing = REQUIRED.filter((k) => !(window.Upg && typeof window.Upg[k] !== 'undefined'));
    if (missing.length === 0) {
      console.log(
        '%c🪞 ATELIER v16 — Cathedral v16 ready · ' + present.length + '/' + REQUIRED.length + ' modules loaded',
        'color:#66FCF1;font-weight:700;font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px;'
      );
    } else {
      console.warn(
        '[ATELIER v16] missing Upg modules (' + missing.length + '/' + REQUIRED.length + '):',
        missing.join(', ')
      );
    }
  };

  // Run after all other IIFEs have had a chance to register
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(check, 250);
  } else {
    window.addEventListener('load', () => setTimeout(check, 200), { once: true });
  }
})();



/* ============================================================
   RESONANCE v2 — Per-Page Type Personality API
   (Worker 15 / Phase 6)
   Public API: window.Upg.type2.{ get, set, list, observe }
   - get():     returns current page's personality string
   - set(name): manually overrides personality on current section
   - list():    returns all 15 personality names
   - observe(): auto-detects on navigation, fires upg:type:change
   ============================================================ */
(() => {
  'use strict';

  const PERSONALITIES = [
    'dashboard', 'callcenter', 'fieldsales', 'accountmgr', 'social',
    'lab', 'psych', 'eq', 'negotiation', 'customercare',
    'programming', 'accounting', 'phonerepair', 'hrmastery', 'myprogress'
  ];

  const list = () => PERSONALITIES.slice();

  const getCurrentPage = () => {
    // Prefer .page.active, then aria-current, then first non-hidden .page
    return (
      document.querySelector('.page.active') ||
      document.querySelector('.page[aria-current="page"]') ||
      document.querySelector('.page:not([hidden])') ||
      document.querySelector('.page')
    );
  };

  const get = () => {
    const page = getCurrentPage();
    return page ? page.getAttribute('data-page-personality') : null;
  };

  const set = (name) => {
    if (!PERSONALITIES.includes(name)) {
      console.warn('[Upg.type2] Unknown personality:', name);
      return false;
    }
    const page = getCurrentPage();
    if (!page) return false;
    page.setAttribute('data-page-personality', name);
    document.dispatchEvent(new CustomEvent('upg:type:change', {
      detail: { personality: name, page: page.id }
    }));
    return true;
  };

  const fireForCurrent = () => {
    const page = getCurrentPage();
    if (!page) return;
    const current = page.getAttribute('data-page-personality');
    if (current) {
      document.dispatchEvent(new CustomEvent('upg:type:change', {
        detail: { personality: current, page: page.id }
      }));
    }
  };

  const observe = () => {
    // React to navigation events (existing nav system uses upg:nav:change)
    document.addEventListener('upg:nav:change', fireForCurrent);
    // Also react to hash changes as a fallback
    window.addEventListener('hashchange', fireForCurrent);
  };

  // Auto-init
  observe();

  // Expose API (additive — preserves the 19 existing Upg.* APIs)
  window.Upg = window.Upg || {};
  window.Upg.type2 = { get, set, list, observe };
})();



/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Upg.life API (Worker 16 / Phase 1)
   Programmatic control of living surfaces.
   Additive: preserves all 20 existing Upg.* APIs.
   ════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  const VALID_MODES = ['ambient', 'mesh', 'breathing', 'surface', 'none'];
  const ATTR = 'data-life';

  // Apply a life mode to an element (or selector).
  const set = (target, mode) => {
    if (!VALID_MODES.includes(mode)) {
      console.warn('[Upg.life] Invalid mode:', mode, '— expected one of', VALID_MODES);
      return false;
    }
    const el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el || !el.setAttribute) return false;
    el.setAttribute(ATTR, mode);
    return true;
  };

  // Remove life mode (resets to inherited).
  const clear = (target) => {
    const el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el || !el.removeAttribute) return false;
    el.removeAttribute(ATTR);
    return true;
  };

  // Get current mode of an element.
  const get = (target) => {
    const el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el || !el.getAttribute) return null;
    return el.getAttribute(ATTR);
  };

  // List all valid modes (for command palette / debugging).
  const list = () => VALID_MODES.slice();

  // Audit — count active life elements on the page.
  const audit = () => {
    const counts = { total: 0 };
    VALID_MODES.forEach((m) => {
      const n = document.querySelectorAll('[' + ATTR + '="' + m + '"]').length;
      counts[m] = n;
      counts.total += n;
    });
    return counts;
  };

  // Auto-init: nothing to wire (CSS does the work).
  // Expose API (additive — preserves the 20 existing Upg.* APIs).
  window.Upg = window.Upg || {};
  window.Upg.life = { set, clear, get, list, audit };
})(window, document);



/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Tactile Engine (Worker 16 / Phase 2)
   Pack v2 RESONANCE — extends Upg.life with .pulse() + ripple delegation
                       + amplified magnet. No new public APIs added.
   Additive: preserves all 21 existing Upg.* APIs (Phase 1 introduced Upg.life).
   ════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  var REDUCED = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var mqRM = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  if (mqRM && typeof mqRM.addEventListener === 'function') {
    mqRM.addEventListener('change', function (e) { REDUCED = e.matches; });
  }

  /* ────────────────────────────────────────────────────────────
     A) Pulse — apply a brief tactile-pulse-soft keyframe on element.
        Returns true on success, false on miss.
     ──────────────────────────────────────────────────────────── */
  function pulse(target, kind) {
    if (REDUCED) return false;
    var el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el || !el.style) return false;
    var animation = (kind === 'soft')
      ? 'tactile-pulse-soft 600ms var(--tactile-press-easing)'
      : 'tactile-pulse-soft 480ms ease-out';
    el.style.animation = 'none';
    /* force reflow so re-applied animation restarts cleanly */
    void el.offsetWidth;
    el.style.animation = animation;
    window.setTimeout(function () { el.style.animation = ''; }, 700);
    return true;
  }

  /* ────────────────────────────────────────────────────────────
     B) Ripple delegation — sets --ripple-x/--ripple-y from click coords
        on any element with [data-ripple]. CSS handles the visual.
     ──────────────────────────────────────────────────────────── */
  document.addEventListener('pointerdown', function (e) {
    if (REDUCED) return;
    var host = e.target && e.target.closest ? e.target.closest('[data-ripple]') : null;
    if (!host) return;
    var rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var x = ((e.clientX - rect.left) / rect.width) * 100;
    var y = ((e.clientY - rect.top) / rect.height) * 100;
    host.style.setProperty('--ripple-x', x + '%');
    host.style.setProperty('--ripple-y', y + '%');
    /* re-trigger the animation by toggling the attribute */
    host.removeAttribute('data-ripple-fire');
    /* force reflow so animation restarts on rapid taps */
    void host.offsetWidth;
    host.setAttribute('data-ripple-fire', 'true');
    window.setTimeout(function () {
      if (host.getAttribute('data-ripple-fire') === 'true') {
        host.removeAttribute('data-ripple-fire');
      }
    }, 600);
  }, { passive: true });

  /* ────────────────────────────────────────────────────────────
     C) Magnet enhancement — amplifies any [data-magnet] element with
        translate3d follow-cursor effect. Pointer leave resets cleanly.
        Throttled via rAF to keep ≥55 FPS on weaker GPUs.
     ──────────────────────────────────────────────────────────── */
  function attachMagnet(el) {
    if (!el || el.__upgMagnetAttached) return;
    el.__upgMagnetAttached = true;
    var rafId = 0;
    var pending = null;
    var strength = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--tactile-magnet-strength') || '0.18'
    ) || 0.18;

    function apply(ev) {
      pending = ev;
      if (rafId) return;
      rafId = window.requestAnimationFrame(function () {
        rafId = 0;
        if (!pending) return;
        var r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        var dx = (pending.clientX - (r.left + r.width / 2)) * (strength / 3);
        var dy = (pending.clientY - (r.top + r.height / 2)) * (strength / 3);
        el.style.transform = 'translate3d(' + dx.toFixed(2) + 'px,' + dy.toFixed(2) + 'px,0)';
        pending = null;
      });
    }
    function reset() {
      if (rafId) { window.cancelAnimationFrame(rafId); rafId = 0; }
      pending = null;
      el.style.transform = '';
    }

    el.addEventListener('pointermove', function (e) { if (!REDUCED) apply(e); });
    el.addEventListener('pointerleave', reset);
    el.addEventListener('pointercancel', reset);
    el.addEventListener('blur', reset);
  }

  function bootstrapMagnet() {
    var nodes = document.querySelectorAll('[data-magnet]');
    for (var i = 0; i < nodes.length; i++) attachMagnet(nodes[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapMagnet);
  } else {
    bootstrapMagnet();
  }

  /* Observer — picks up magnet hosts added later (lazy-mounted modals etc.) */
  if ('MutationObserver' in window) {
    var mo = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var node = added[j];
          if (node && node.nodeType === 1) {
            if (node.matches && node.matches('[data-magnet]')) attachMagnet(node);
            if (node.querySelectorAll) {
              var sub = node.querySelectorAll('[data-magnet]');
              for (var k = 0; k < sub.length; k++) attachMagnet(sub[k]);
            }
          }
        }
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  /* ────────────────────────────────────────────────────────────
     D) Extend Upg.life with .pulse — additive, preserves Phase 1 surface.
     ──────────────────────────────────────────────────────────── */
  if (window.Upg && window.Upg.life) {
    window.Upg.life.pulse = pulse;
  } else {
    window.Upg = window.Upg || {};
    window.Upg.life = window.Upg.life || {};
    window.Upg.life.pulse = pulse;
  }
})(window, document);
/* End VITAL UI v1 / Worker 16 / Phase 2 ─────────────────────────────────── */



/* ════════════════════════════════════════════════════════════════════════════
   VITAL UI v1 — Cinematic Transition Extension (Worker 16 / Phase 3)
   Doctrine: extends window.Upg.transition without breaking signature.

   Preserved (W14 P5):
     - Upg.transition.navigate(pageId)
     - Upg.transition.supports

   Added (W16 P3):
     - Upg.transition.navigate(pageId, { depth, direction })  ← optional 2nd arg
     - Upg.transition.run(name, opts)                         ← convenience alias
     - Upg.transition.variants()                              ← list keys
     - Upg.transition.setDefault({ depth })                   ← change session default

   Parallax engine:
     - rAF-throttled scroll listener.
     - Updates --parallax-y on documentElement.
     - Range capped at ±24px (micro). Disabled under reduced-motion.

   Implementation note: original Upg.transition is Object.frozen, so we
   re-freeze a NEW object that delegates to the originals. Reference is
   replaced atomically; any subsequent caller sees the extended API.
   ════════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  const ut = window.Upg && window.Upg.transition;
  if (!ut || typeof ut.navigate !== 'function') return; // Silent skip.

  /* ── Variant registry ─────────────────────────────────────────────────── */
  const VARIANTS = {
    'fade':           '',                                  // legacy default (W14)
    'depth-shallow':  'page-transition--depth-shallow',
    'depth-mid':      'page-transition--depth-mid',
    'depth-deep':     'page-transition--depth-deep',
    'slide-rtl':      'page-transition--slide-rtl',
    'slide-ltr':      'page-transition--slide-ltr',
    'morph':          'page-transition--morph'
  };
  const ALL_CLASSES = Object.values(VARIANTS).filter(Boolean);

  const isReduced = () => {
    try { return matchMedia('(prefers-reduced-motion: reduce)').matches; }
    catch (_) { return false; }
  };

  /* ── Direction-aware variant resolution ──────────────────────────────────
     If caller asks for slide without explicit RTL/LTR, pick by document dir.
     Platform is RTL by default → slide-rtl. ─────────────────────────────── */
  const resolveVariant = (depth, direction) => {
    if (depth === 'slide') {
      const dir = direction || (document.documentElement.getAttribute('dir') || 'rtl').toLowerCase();
      return dir === 'ltr' ? 'slide-ltr' : 'slide-rtl';
    }
    return depth;
  };

  /* ── Apply class to active page; auto-cleanup after animation ──────────── */
  const applyVariant = (variant) => {
    const cls = VARIANTS[variant];
    if (!cls) return; // 'fade' or unknown → no class.
    const target = document.querySelector('.page.active') || document.body;
    if (!target) return;
    // Wipe any prior cinematic class so the new one wins cleanly.
    ALL_CLASSES.forEach(c => target.classList.remove(c));
    // Force reflow to retrigger animation when same class re-applied rapidly.
    void target.offsetWidth;
    target.classList.add(cls);
    let cleared = false;
    const cleanup = () => {
      if (cleared) return;
      cleared = true;
      target.classList.remove(cls);
      target.removeEventListener('animationend', cleanup);
    };
    target.addEventListener('animationend', cleanup, { once: true });
    setTimeout(cleanup, 1400); // safety net if animationend doesn't fire
  };

  /* ── Session default (mutable via setDefault) ─────────────────────────── */
  let defaultDepth = 'fade';
  const setDefault = (opts) => {
    if (!opts) return;
    const d = resolveVariant(opts.depth, opts.direction);
    if (d && VARIANTS[d] !== undefined) defaultDepth = d;
  };

  /* ── Wrapped navigate — accepts optional 2nd arg ──────────────────────── */
  const originalNavigate = ut.navigate.bind(ut);
  const navigate = (pageId, opts) => {
    if (!pageId) return;
    opts = opts || {};
    const variant = resolveVariant(opts.depth, opts.direction) || defaultDepth;
    const result = originalNavigate(pageId);
    if (!isReduced() && variant && variant !== 'fade' && VARIANTS[variant] !== undefined) {
      // Defer one tick so the new .page.active reflects the navigation.
      setTimeout(() => applyVariant(variant), 0);
    }
    return result;
  };

  /* ── run(name, opts) — convenience alias matching Phase-3 spec ────────── */
  const run = (name, opts) => {
    opts = opts || {};
    if (name === 'page' && opts.target) {
      return navigate(opts.target, opts);
    }
    // Apply variant on currently-active page (no navigation).
    const variant = resolveVariant(opts.depth, opts.direction);
    if (!isReduced() && variant && variant !== 'fade' && VARIANTS[variant] !== undefined) {
      applyVariant(variant);
    }
  };

  /* ── Variant introspection ────────────────────────────────────────────── */
  const variants = () => Object.keys(VARIANTS);

  /* ── Replace frozen object with extended frozen object ────────────────── */
  window.Upg.transition = Object.freeze({
    navigate: navigate,
    supports: ut.supports,
    run: run,
    variants: variants,
    setDefault: setDefault
  });

  /* ── Parallax engine ──────────────────────────────────────────────────── */
  let parallaxRAF = 0;
  const PARALLAX_FACTOR = 0.04;
  const PARALLAX_CAP = 24; // ±px

  const tickParallax = () => {
    parallaxRAF = 0;
    if (isReduced()) {
      document.documentElement.style.setProperty('--parallax-y', '0px');
      return;
    }
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const py = Math.max(-PARALLAX_CAP, Math.min(PARALLAX_CAP, -y * PARALLAX_FACTOR));
    document.documentElement.style.setProperty('--parallax-y', py.toFixed(2) + 'px');
  };

  const onScroll = () => {
    if (parallaxRAF) return;
    parallaxRAF = requestAnimationFrame(tickParallax);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Reset on page navigation (avoid stale offset on new page).
  document.addEventListener('upg:nav:change', () => {
    document.documentElement.style.setProperty('--parallax-y', '0px');
  });

  // Initial settle.
  tickParallax();
})(window, document);
/* End VITAL UI v1 / Worker 16 / Phase 3 ─────────────────────────────────── */




/* ════════════════════════════════════════════════════════════════════════════
   VITAL UI v1 — Pointer Companion (Worker 16 / Phase 4)
   Pack v2 RESONANCE.

   Extends window.Upg.life with .pointer:
     - enable()      → start tracking + render trails.
     - disable()     → stop tracking + hide trails (kept in DOM for re-enable).
     - enabled()     → boolean current state.
     - rest()        → force rest state (used by command palette toggle later).

   Bail conditions (computed once at IIFE boot, also re-checked on toggle):
     - (pointer: coarse) → touch / stylus, no fine pointer.
     - (prefers-reduced-motion: reduce) → user requested no motion.

   Preservation:
     - Phase 1 surface (set/clear/get/list/audit) preserved verbatim.
     - Phase 2 surface (.pulse) preserved verbatim.
     - 21 existing Upg.* APIs untouched.
   ════════════════════════════════════════════════════════════════════════════ */

(function (window, document) {
  'use strict';

  /* Probe environment. Both must pass for trails to mount. */
  var mqFine    = window.matchMedia ? window.matchMedia('(pointer: fine)') : null;
  var mqReduced = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var hasFine   = !!(mqFine && mqFine.matches);
  var REDUCED   = !!(mqReduced && mqReduced.matches);

  /* No-op API for touch / reduce-motion users — preserves shape. */
  function expose(api) {
    window.Upg = window.Upg || {};
    window.Upg.life = window.Upg.life || {};
    window.Upg.life.pointer = api;
  }

  if (!hasFine || REDUCED) {
    expose({
      enable:  function () { return false; },
      disable: function () { return true;  },
      enabled: function () { return false; },
      rest:    function () { return false; }
    });
    return;
  }

  /* ────────────────────────────────────────────────────────────
     State + DOM construction (3 trail layers).
     ──────────────────────────────────────────────────────────── */
  var enabled   = true;
  var restTimer = 0;
  var trails    = [];
  var lastX     = -9999;
  var lastY     = -9999;

  function buildTrails() {
    if (!document.body) return;
    for (var i = 1; i <= 3; i++) {
      var t = document.createElement('div');
      t.className = 'pointer-trail' + (i > 1 ? ' pointer-trail--layer-' + i : '');
      t.setAttribute('aria-hidden', 'true');
      document.body.appendChild(t);
      trails.push(t);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildTrails, { once: true });
  } else {
    buildTrails();
  }

  /* ────────────────────────────────────────────────────────────
     Pointer tracking (passive + native transition smoothing).
     No rAF — CSS transitions handle the easing per layer.
     ──────────────────────────────────────────────────────────── */
  function onMove(e) {
    if (!enabled || !trails.length) return;
    lastX = e.clientX;
    lastY = e.clientY;
    var translate = 'translate3d(' + lastX + 'px,' + lastY + 'px,0) translate(-50%,-50%)';
    for (var i = 0; i < trails.length; i++) {
      var t = trails[i];
      t.classList.remove('pointer-trail--rest');
      t.style.transform = translate;
    }
    if (restTimer) window.clearTimeout(restTimer);
    restTimer = window.setTimeout(rest, 1500);
  }

  function rest() {
    for (var i = 0; i < trails.length; i++) {
      trails[i].classList.add('pointer-trail--rest');
    }
    return true;
  }

  document.addEventListener('pointermove', onMove, { passive: true });
  /* Hide trails when pointer leaves the window. */
  document.addEventListener('pointerleave', rest);
  window.addEventListener('blur', rest);

  /* ────────────────────────────────────────────────────────────
     React to user toggling reduced-motion mid-session.
     ──────────────────────────────────────────────────────────── */
  if (mqReduced && typeof mqReduced.addEventListener === 'function') {
    mqReduced.addEventListener('change', function (ev) {
      REDUCED = !!ev.matches;
      if (REDUCED && enabled) {
        enabled = false;
        for (var i = 0; i < trails.length; i++) trails[i].style.display = 'none';
      }
    });
  }

  /* ────────────────────────────────────────────────────────────
     Public API — extends Upg.life without breaking Phase 1/2.
     ──────────────────────────────────────────────────────────── */
  expose({
    enable: function () {
      if (REDUCED) return false;
      enabled = true;
      for (var i = 0; i < trails.length; i++) trails[i].style.display = '';
      return true;
    },
    disable: function () {
      enabled = false;
      for (var i = 0; i < trails.length; i++) trails[i].style.display = 'none';
      return true;
    },
    enabled: function () { return !!enabled && !REDUCED; },
    rest: rest
  });
})(window, document);
/* End VITAL UI v1 / Worker 16 / Phase 4 ─────────────────────────────────── */



/* ════════════════════════════════════════════════════════════════════════
   VITAL UI v1 — Sound Design (Worker 16 / Phase 5)

   Philosophy: "الصوت في منصة احترافية حقّ، لكن بعدٍ احترامي."
   - WebAudio synthesis ONLY (sine/triangle/square oscillators). Zero asset loading.
   - Off by default. User must call Upg.sound.enable() explicitly.
   - Persists user preference across sessions via localStorage (upg.sound.enabled).
   - Silenced under prefers-reduced-motion: reduce (treats as silent preference).
   - AudioContext built lazily on first enable() — respects browser autoplay policy.
   - Debounced — same sound within 50ms is dropped (prevents button-mash blasting).
   - Master volume defaults to 0.18 (soft) — adjustable via setVolume(0..1).

   5 core sound recipes:
     tap       — sine 880Hz × 60ms                       (button press)
     confirm   — sine 1320 → 1760Hz two-step rise        (action accepted)
     error     — triangle 220Hz × 140ms (low warn)       (validation fail)
     nav       — sine 660Hz × 50ms (subtle swipe)        (page transition)
     complete  — sine 1320 → 1760 → 2640Hz three-step    (task / lab finished)

   API (window.Upg.sound):
     enable()       → boolean (false if reduced-motion or AudioContext unavailable)
     disable()      → boolean (true)
     play(name)     → boolean (true if played, false if disabled/unknown/debounced)
     setVolume(0..1)→ number  (clamped, returns applied volume)
     enabled()      → boolean
     available()    → boolean (AudioContext detection)
     list()         → string[] (recipe names)

   This is the 22nd Upg.* top-level namespace. Sacred preserved (14 pages / 391
   qcalc / Phases 1-4 untouched / W12-W15 motion engine intact).
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  var LS_KEY = 'upg.sound.enabled';
  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var REDUCE_MOTION = mqReduce.matches;

  var ctx = null;
  var masterGain = null;
  var enabled = false;
  var volume = 0.18;
  var lastPlay = Object.create(null); // debounce bookkeeping

  /* ────────────────────────────────────────────────────────────
     AudioContext — built lazily on first enable() / play().
     Respects browser autoplay policies (must be user-gesture).
     Errors (Safari quirks, locked-down contexts) swallowed safely.
     ──────────────────────────────────────────────────────────── */
  var ensureCtx = function () {
    if (ctx) return ctx;
    try {
      var Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
      masterGain = ctx.createGain();
      masterGain.gain.value = volume;
      masterGain.connect(ctx.destination);
      return ctx;
    } catch (e) {
      try { console.warn('[Upg.sound] AudioContext unavailable:', e && e.message); } catch (_) {}
      ctx = null;
      masterGain = null;
      return null;
    }
  };

  /* ────────────────────────────────────────────────────────────
     Sound recipes — each is an array of notes.
     Each note: { freq, type, dur, atk, rel, delay? }
     atk = attack ramp time (s) | rel = release decay (s)
     delay = optional offset from sequence start (s)
     ──────────────────────────────────────────────────────────── */
  var RECIPES = {
    'tap': [
      { freq: 880, type: 'sine', dur: 0.06, atk: 0.005, rel: 0.04 }
    ],
    'confirm': [
      { freq: 1320, type: 'sine', dur: 0.08, atk: 0.005, rel: 0.06 },
      { freq: 1760, type: 'sine', dur: 0.08, atk: 0.005, rel: 0.07, delay: 0.07 }
    ],
    'error': [
      { freq: 220, type: 'triangle', dur: 0.14, atk: 0.005, rel: 0.10 }
    ],
    'nav': [
      { freq: 660, type: 'sine', dur: 0.05, atk: 0.005, rel: 0.04 }
    ],
    'complete': [
      { freq: 1320, type: 'sine', dur: 0.08, atk: 0.005, rel: 0.06 },
      { freq: 1760, type: 'sine', dur: 0.08, atk: 0.005, rel: 0.07, delay: 0.07 },
      { freq: 2640, type: 'sine', dur: 0.10, atk: 0.005, rel: 0.09, delay: 0.14 }
    ]
  };

  /* ────────────────────────────────────────────────────────────
     playNote — synthesizes one oscillator with ADSR envelope.
     Uses linearRamp for attack, exponentialRamp for natural decay.
     Each note destroys itself (osc.stop) shortly after release.
     ──────────────────────────────────────────────────────────── */
  var playNote = function (note, when) {
    if (!ctx || !masterGain) return;
    try {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = note.type || 'sine';
      osc.frequency.value = note.freq;
      osc.connect(gain);
      gain.connect(masterGain);

      var start = when + (note.delay || 0);
      var peak = start + (note.atk || 0.005);
      var stop = peak + (note.dur || 0.06);
      var end = stop + (note.rel || 0.04);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(1, peak);
      gain.gain.exponentialRampToValueAtTime(0.0001, end);

      osc.start(start);
      osc.stop(end + 0.02);
    } catch (e) {
      // swallow — single bad note shouldn't break playback chain
    }
  };

  /* ────────────────────────────────────────────────────────────
     play(name) — public trigger.
     Bails early if disabled / reduced-motion / unknown name / debounced.
     Resumes suspended context (Chrome autoplay policy: gesture required).
     ──────────────────────────────────────────────────────────── */
  var play = function (name) {
    if (!enabled || REDUCE_MOTION) return false;
    var recipe = RECIPES[name];
    if (!recipe) {
      try { console.warn('[Upg.sound] Unknown sound:', name, '— available:', Object.keys(RECIPES)); } catch (_) {}
      return false;
    }
    var now = Date.now();
    if (lastPlay[name] && (now - lastPlay[name]) < 50) return false;
    lastPlay[name] = now;

    var c = ensureCtx();
    if (!c) return false;
    if (c.state === 'suspended') {
      try { c.resume(); } catch (_) {}
    }

    var t0 = c.currentTime;
    for (var i = 0; i < recipe.length; i++) {
      playNote(recipe[i], t0);
    }
    return true;
  };

  /* ────────────────────────────────────────────────────────────
     setVolume(v) — clamped 0..1, applied to master gain immediately.
     ──────────────────────────────────────────────────────────── */
  var setVolume = function (v) {
    var n = Number(v);
    if (isNaN(n)) n = 0;
    volume = Math.max(0, Math.min(1, n));
    if (masterGain) masterGain.gain.value = volume;
    return volume;
  };

  /* ────────────────────────────────────────────────────────────
     enable() / disable() — flips state + persists + sets body attr.
     enable() refuses if reduced-motion is the user preference.
     ──────────────────────────────────────────────────────────── */
  var enable = function () {
    if (REDUCE_MOTION) {
      try { console.info('[Upg.sound] reduced-motion preference — refusing to enable.'); } catch (_) {}
      return false;
    }
    enabled = true;
    try { localStorage.setItem(LS_KEY, '1'); } catch (_) {}
    if (document.body) document.body.setAttribute('data-sound-state', 'on');
    ensureCtx();
    return true;
  };

  var disable = function () {
    enabled = false;
    try { localStorage.setItem(LS_KEY, '0'); } catch (_) {}
    if (document.body) document.body.setAttribute('data-sound-state', 'off');
    return true;
  };

  /* ────────────────────────────────────────────────────────────
     Boot — restore persisted preference (without auto-creating ctx).
     Listen for live reduced-motion toggle → silence mid-session.
     ──────────────────────────────────────────────────────────── */
  var initBodyState = function () {
    try {
      var saved = localStorage.getItem(LS_KEY);
      if (saved === '1' && !REDUCE_MOTION) {
        enabled = true;
        if (document.body) document.body.setAttribute('data-sound-state', 'on');
      } else {
        if (document.body) document.body.setAttribute('data-sound-state', 'off');
      }
    } catch (_) {
      if (document.body) document.body.setAttribute('data-sound-state', 'off');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBodyState, { once: true });
  } else {
    initBodyState();
  }

  // Live reduced-motion change → silence (preserve enabled flag for when user reverts).
  try {
    var onMQChange = function (e) {
      REDUCE_MOTION = e.matches;
      if (REDUCE_MOTION && document.body) {
        document.body.setAttribute('data-sound-state', 'off');
      } else if (enabled && document.body) {
        document.body.setAttribute('data-sound-state', 'on');
      }
    };
    if (mqReduce.addEventListener) mqReduce.addEventListener('change', onMQChange);
    else if (mqReduce.addListener) mqReduce.addListener(onMQChange);
  } catch (_) {}

  /* ────────────────────────────────────────────────────────────
     Public API — Object.freeze to lock surface area.
     22nd top-level Upg.* namespace.
     ──────────────────────────────────────────────────────────── */
  window.Upg = window.Upg || {};
  window.Upg.sound = Object.freeze({
    enable: enable,
    disable: disable,
    play: play,
    setVolume: setVolume,
    enabled: function () { return !!enabled && !REDUCE_MOTION; },
    available: function () {
      return Boolean(window.AudioContext || window.webkitAudioContext);
    },
    list: function () { return Object.keys(RECIPES); }
  });
})(window, document);
/* End VITAL UI v1 / Worker 16 / Phase 5 ─────────────────────────────────── */



/* ════════════════════════════════════════════════════════════════════════
   VITAL UI v1 — Identity Auras (Worker 16 / Phase 6 / Final)
   ────────────────────────────────────────────────────────────────────────
   Upg.aura — runtime aura override surface.
   By default each page picks up its own aura via [data-page-personality].
   This API lets command palette / debug tools force a body-wide aura
   regardless of active page (e.g. preview, demo, accessibility test).

   23rd top-level Upg.* namespace.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  var AURAS = [
    'dashboard', 'callcenter', 'fieldsales', 'accountmgr', 'social',
    'lab', 'psych', 'eq', 'negotiation', 'customercare',
    'programming', 'accounting', 'phonerepair', 'hrmastery', 'myprogress'
  ];

  var ATTR = 'data-page-personality';
  var OVERRIDE_ATTR = 'data-aura-override';

  function isValid(name) {
    return typeof name === 'string' && AURAS.indexOf(name) !== -1;
  }

  function fire(name) {
    try {
      document.dispatchEvent(new CustomEvent('upg:aura:change', {
        detail: { aura: name }
      }));
    } catch (_) {}
  }

  /* Apply: forces body to wear `name` aura regardless of active page. */
  function apply(name) {
    if (!isValid(name)) {
      try {
        if (window.console && console.warn) {
          console.warn('[Upg.aura] Unknown aura:', name, '— available:', AURAS);
        }
      } catch (_) {}
      return false;
    }
    if (!document.body) return false;
    document.body.setAttribute(OVERRIDE_ATTR, name);
    document.body.setAttribute(ATTR, name);
    fire(name);
    return true;
  }

  /* Clear: pages return to their own personality (data-page-personality
     stays on each <section class="page">, so visual continuity is fine). */
  function clear() {
    if (!document.body) return false;
    if (document.body.hasAttribute(OVERRIDE_ATTR)) {
      document.body.removeAttribute(OVERRIDE_ATTR);
    }
    document.body.removeAttribute(ATTR);
    fire(null);
    return true;
  }

  /* Current: override → body attr → active page personality. */
  function current() {
    if (!document.body) return null;
    var override = document.body.getAttribute(OVERRIDE_ATTR);
    if (override) return override;
    var bodyAttr = document.body.getAttribute(ATTR);
    if (bodyAttr) return bodyAttr;
    var active = document.querySelector('.page.active');
    return active ? active.getAttribute(ATTR) : null;
  }

  /* List: returns a fresh copy so callers can't mutate internal state. */
  function list() {
    return AURAS.slice();
  }

  /* Preview: temporary apply, then restore previous override (or clear). */
  function preview(name, durationMs) {
    if (!isValid(name)) return false;
    var prev = document.body ? document.body.getAttribute(OVERRIDE_ATTR) : null;
    apply(name);
    var ms = Math.max(200, (typeof durationMs === 'number' && durationMs > 0)
      ? durationMs : 1200);
    setTimeout(function () {
      if (prev) {
        document.body.setAttribute(OVERRIDE_ATTR, prev);
        document.body.setAttribute(ATTR, prev);
        fire(prev);
      } else {
        clear();
      }
    }, ms);
    return true;
  }

  /* Public API — Object.freeze to lock surface area. */
  window.Upg = window.Upg || {};
  window.Upg.aura = Object.freeze({
    apply: apply,
    clear: clear,
    current: current,
    list: list,
    preview: preview
  });
})(window, document);
/* End VITAL UI v1 / Worker 16 / Phase 6 / Final ──────────────────────── */


/* ════════════════════════════════════════════════════════════════
 * RESONANCE v2 — Worker 17 / Phase 4 — Upg.practice
 * 24th top-level Upg.* namespace.
 * Scope: track which questions user attempted, reflection text,
 *        last-touched timestamp per block. localStorage only.
 * No telemetry. No sync. Personal use only.
 * ════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const KEY_PREFIX = 'upg.practice.';
  const REFLECT_PREFIX = 'upg.practice.reflect.';

  const readJSON = (key, fallback = {}) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) { return fallback; }
  };

  const writeJSON = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (_) { /* quota exceeded — silent */ }
  };

  const tried = (qId, attempted = true) => {
    if (!qId) return null;
    const blockId = qId.replace(/-q\d+$/, '');
    const state = readJSON(KEY_PREFIX + blockId);
    state[qId] = state[qId] || {};
    state[qId].attempted = attempted;
    state[qId].touchedAt = Date.now();
    writeJSON(KEY_PREFIX + blockId, state);
    document.dispatchEvent(new CustomEvent('upg:practice:change', {
      detail: { blockId, qId, attempted }
    }));
    return state[qId];
  };

  const isTried = (qId) => {
    if (!qId) return false;
    const blockId = qId.replace(/-q\d+$/, '');
    const state = readJSON(KEY_PREFIX + blockId);
    return !!(state[qId] && state[qId].attempted);
  };

  const getBlock = (blockId) => {
    if (!blockId) return null;
    return readJSON(KEY_PREFIX + blockId);
  };

  const reflect = (blockId, text) => {
    if (!blockId) return null;
    if (typeof text !== 'string') text = '';
    if (text.length > 500) text = text.slice(0, 500);
    if (text.length === 0) {
      try { localStorage.removeItem(REFLECT_PREFIX + blockId); } catch (_) {}
    } else {
      try { localStorage.setItem(REFLECT_PREFIX + blockId, text); } catch (_) {}
    }
    document.dispatchEvent(new CustomEvent('upg:practice:reflect', {
      detail: { blockId, length: text.length }
    }));
    return text;
  };

  const getReflection = (blockId) => {
    if (!blockId) return '';
    try { return localStorage.getItem(REFLECT_PREFIX + blockId) || ''; }
    catch (_) { return ''; }
  };

  const stats = () => {
    let totalQ = 0, triedQ = 0, totalReflect = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k) continue;
        if (k.startsWith(KEY_PREFIX) && !k.startsWith(REFLECT_PREFIX)) {
          const data = readJSON(k);
          for (const qId in data) {
            if (!Object.hasOwn(data, qId)) continue;
            totalQ++;
            if (data[qId] && data[qId].attempted) triedQ++;
          }
        }
        if (k.startsWith(REFLECT_PREFIX)) totalReflect++;
      }
    } catch (_) {}
    return { questionsAttempted: triedQ, questionsTotal: totalQ, reflectionsWritten: totalReflect };
  };

  const reset = (blockId) => {
    if (!blockId) return false;
    try {
      localStorage.removeItem(KEY_PREFIX + blockId);
      localStorage.removeItem(REFLECT_PREFIX + blockId);
      return true;
    } catch (_) { return false; }
  };

  // ─── DOM bindings ──────────────────────────────────────────
  const bindTriedButtons = () => {
    document.querySelectorAll('.practice-tried-btn').forEach((btn) => {
      if (btn.__upgBound) return;
      btn.__upgBound = true;
      const qId = btn.getAttribute('data-q-id');
      if (qId && isTried(qId)) {
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.add('practice-tried-btn--on');
      }
      btn.addEventListener('click', () => {
        const cur = btn.getAttribute('aria-pressed') === 'true';
        const next = !cur;
        btn.setAttribute('aria-pressed', String(next));
        btn.classList.toggle('practice-tried-btn--on', next);
        tried(qId, next);
      });
    });
  };

  const bindReflectInputs = () => {
    document.querySelectorAll('.block-practice-reflect-input').forEach((input) => {
      if (input.__upgBound) return;
      input.__upgBound = true;
      const blockId = input.getAttribute('data-reflect-for');
      const existing = getReflection(blockId);
      if (existing) input.value = existing;
      const counter = input.closest('.block-practice-reflect')?.querySelector('[data-reflect-count]');
      const updateCount = () => { if (counter) counter.textContent = String(input.value.length); };
      updateCount();
      let timer = null;
      input.addEventListener('input', () => {
        updateCount();
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => reflect(blockId, input.value), 300);
      });
      input.addEventListener('blur', () => {
        if (timer) clearTimeout(timer);
        reflect(blockId, input.value);
      });
    });
  };

  const init = () => { bindTriedButtons(); bindReflectInputs(); };

  const observer = new MutationObserver((muts) => {
    let needRebind = false;
    for (const m of muts) {
      if (m.addedNodes.length) {
        for (const n of m.addedNodes) {
          if (n.nodeType === 1 && (n.matches?.('.block-practice') || n.querySelector?.('.block-practice'))) {
            needRebind = true; break;
          }
        }
      }
      if (needRebind) break;
    }
    if (needRebind) init();
  });

  if (document.readyState !== 'loading') {
    init();
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  window.Upg = window.Upg || {};
  window.Upg.practice = Object.freeze({ tried, isTried, getBlock, reflect, getReflection, stats, reset });
})();
