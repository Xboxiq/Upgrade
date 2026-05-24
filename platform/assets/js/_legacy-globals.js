/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — Legacy Globals (Worker 23 / Phase 5)
   Top-level functions and inter-IIFE comments from the original app.js
   monolith. Side-effect module: importing this file installs globals.
   ════════════════════════════════════════════════════════════════════════ */
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

/* ─── inter-IIFE comments (preserved verbatim) ─── */

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

/* ===== JS block #13 (id: phase-1-script) ===== */



/* ===== JS block — QL v13 Phase 2 · Magnetic Cursor Aura ===== */



/* ===== JS block — QL v13 Phase 3 · Sectional Identity + Living Numerals ===== */

/* ===== JS block — QL v13 Phase 3 · Living Numerals (counter on viewport) ===== */



/* ===== JS block — QL v13 Phase 4 · View Transitions for theme switch ===== */



/* ===== JS block — QL v13 Phase 4 · Visibility-pause (battery friendly) ===== */



/* ================================================================
   WORKER 02 · PHASE 4 — Account Management Tools
   - NRR Calculator (live)
   - Health Score (weighted 6-factor)
================================================================ */



/* ================================================================
   WORKER 02 · PHASE 1 — Sales Frameworks Modal Controller
   Hooks: [data-sf-row], [data-sf-modal], [data-sf-close]
   - Click / Enter / Space on a row opens the matching modal.
   - Overlay click, close button, or ESC closes it.
   - Focus trap is light (returns focus to trigger row on close).
   - Idempotent: guards against double-binding via window.__sfBound.
================================================================ */



/* ================================================================
   WORKER 02 · PHASE 3 — Interactive Sales Labs
   - Lab 1: Funnel Calculator (live math + SVG labels + warning)
   - Lab 2: Objection Trainer (rule-based 4-axis rubric)
   - Lab 3: Pitch Builder (template-driven, 60s structure)
   localStorage: upg_pitch_drafts (last pitch only), upg_objection_scores (last 10)
================================================================ */



/* ================================================================
   WORKER 02 · PHASE 5 — Sales Module Progress Tracker
   IntersectionObserver counts how many ".sales-section-header"
   blocks have entered the viewport on #page-fieldsales,
   updates the sticky progress pill, and persists via localStorage.
   Key: upg_progress_sales (best-ever percentage seen).
================================================================ */

/* ================================================================
   WORKER 03 · PHASE 1 — Archetype Card Toggle
   Click an archetype card head → toggles open class.
   Multiple-open allowed (different from psych accordion).
================================================================ */

/* ================================================================
   WORKER 03 · PHASE 2 — KPI Calculator (Agent Performance Index)
   Composite scoring + benchmark comparison + 3 dynamic recommendations.
   No localStorage write; pure compute. localStorage key reserved for Phase 3.
================================================================ */

/* ================================================================
   WORKER 03 · PHASE 3 — Voice Self-Assessment Studio
   Web Audio API (AnalyserNode) + Web Speech API (SpeechRecognition)
   100% local, no network. Stores last 5 attempts (numeric only) in
   localStorage key: upg_voice_recordings_meta
================================================================ */

/* ================================================================
   WORKER 03 · PHASE 4 — Difficult Caller Simulator
   3 scenarios × 4-5 turns × 4 options each.
   Score persisted in localStorage: upg_simulator_scores
================================================================ */



/* ════════════════════════════════════════════════════════════════
   WORKER 04 · PHASE 1 — Accounting Foundations Lab
   - Equation Visualizer (10 transactions, IQD)
   - T-Account Visualizer (12 transactions)
   - 9-Step Accounting Cycle Ring
   localStorage: upg_acc_eq_state, upg_acc_cycle_visited
═══════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════════
   WORKER 04 · PHASE 2 — Iraqi COA + IFRS + 10 Ratios
═══════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════════
   WORKER 04 · PHASE 3 — Iraqi Tax Calculator + Salary Slip
═══════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════════
   WORKER 04 · PHASE 4 — Income Statement + Balance Sheet Builders
═══════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════
   WORKER 05 · Junior Programmer Mastery
   Phase 1 — Fundamentals Gate (mark+progress) + Quiz + Path Tree
   Scope: #page-programming only. IIFE-isolated.
   localStorage: upg_progress_prog, upg_path_choice
   ════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════
   WORKER 05 · Phase 2 — Roadmap tabs + checklist progress
   localStorage: upg_progress_prog (extends fundamentals object)
   ════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════
   WORKER 05 · Phase 4 — Five Interactive Labs
   1) Code Trace · 2) Big-O Race · 3) Git Sandbox
   4) Interview Sim · 5) Portfolio Generator
   localStorage: upg_interview_attempts, upg_portfolio_drafts
   ════════════════════════════════════════════════════════════ */



/* ============================================================
   WORKER 06 · PHASE 1 — Algorithm Anatomy renderer (IIFE)
   Scope: #page-social · platform tabs + panel data
============================================================ */



/* ============================================================
   WORKER 06 · PHASE 2 — Pillars + 15 Frameworks + Calendar Builder
============================================================ */



/* ============================================================
   WORKER 06 · PHASE 3 — Funnel + Performance Math + A/B Tester
============================================================ */



/* ============================================================
   WORKER 06 · PHASE 4 — Influencer Vetting Tool
============================================================ */



/* ============================================================
   WORKER 07 · PHASE 1 — Phone Repair (page-phonerepair)
   Scope: #page-phonerepair only. Vanilla JS. IIFE isolated.
============================================================ */



/* ============================================================
   WORKER 07 · PHASE 2 — Mainboard Anatomy interactions
============================================================ */



/* ============================================================
   WORKER 07 · PHASE 3 — Decision Tree tabs
============================================================ */



/* ============================================================
   WORKER 07 · PHASE 5 — 6 Labs (Multimeter, Walker, Cost,
                                  Water Damage, PCB ID, Convo)
============================================================ */



/* ===========================================================
   WORKER 08 — HR MASTERY (Phase 1)
   Scope: #page-hrmastery only. IIFE-isolated.
   localStorage: upg_progress_hr (created in later phases)
   =========================================================== */



/* ═══════════════════════════════════════════════════════════════════════
   WORKER 09 · PHASE 2 — Mood Meter Interactive (Yale model)
   localStorage key: upg_mood_log (array, last 50)
═══════════════════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════════════════
   WORKER 09 · PHASE 3 — Self-Diagnostic Suite (6 tests)
   localStorage key: upg_psych_results (object keyed by test id)
═══════════════════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════════════════
   WORKER 09 · PHASE 4 — Psych Insets (cross-page micro-cards)
   Injects 3 insets per target page after its .page-header (idempotent).
═══════════════════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════════════════
   WORKER 09 · PHASE 5 — Therapist Bridge + Insights Engine
═══════════════════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Sovereign Theme Engine (Worker 11 / Phase 1)
   3-state: auto | dark | light  +  prefers-color-scheme listener
   Public API: window.Upg.theme.{ get, set, cycle, resolve }
   Wraps existing window.toggleTheme so legacy onclick keeps working.
   ═══════════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Icon Auto-Mount + Migrator (Worker 11 / Phase 2)
   Component: <i class="qi" data-icon="NAME"></i>
   On boot: walks UI surfaces and converts emoji/legacy SVGs to .qi.
   Public API: window.Upg.icons.{ render, renderAll, registry }
   ═══════════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Entry Gateway (Worker 11 / Phase 3)
   First-run onboarding (4 steps), returning welcome, PIN lock, idle auto-lock.
   Public API: window.Upg.gateway.{ open, close, lock }
   ═══════════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — qcalc Engine (Worker 11 / Phase 4)
   Public API: window.Upg.calc.{ register, mount, init, format }
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — qcalc Registrations (8 calculators)
   Math is preserved 1:1 with Workers 02..09 originals.
   ═══════════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Command Palette + Shortcuts (Worker 11 / Phase 5)
   Public API: window.Upg.cmdk.{ open, close, register, getShortcuts }
   ═══════════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Unified State Layer + Real Dashboard (Worker 11 / Phase 6)
   Facade over 22+ existing upg_* localStorage keys.
   Public API: window.Upg.state.{ progress, scores, drafts, misc, profile,
                                  activity, logActivity, compute, on }
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Dashboard Renderer + page-myprogress + navigateTo wrap
   ═══════════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Production Pass (Worker 11 / Phase 7)
   Service Worker reg + Focus trap + Console banner + a11y polish
   ═══════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Type Engine (Worker 12 / Phase 1)
   Public API: window.Upg.type
   - get/set("density",  0..3)         — 0=compact .. 3=spacious
   - get/set("textZoom", 0.875..1.25)  — user-controlled multiplier
   - DENSITY                            — array of density names
   Storage keys: upg_density, upg_text_zoom
   Event:        upg:type-change
   ════════════════════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Scroll Observer (Worker 12 / Phase 3)
   Toggles data-scrolled="true|false" on #topbar and #sidebar when content
   scrolls past 4px. Powers material elevation transitions.
   Public API: window.Upg.scroll = { update() }
   ════════════════════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Navigation Chrome (Worker 12 / Phase 4)
   Public API: window.Upg.nav.{ collapse, expand, toggle, isCollapsed,
                                 openDrawer, closeDrawer, toggleDrawer }
   Storage: upg_sidebar_collapsed
   Shortcut: Cmd+\ / Ctrl+\ toggles collapse
   View Transitions: wrap nav-item active class swaps for smooth pill slide.
   ════════════════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — View-Transition wrapper for nav-item active swap (Phase 4)
   When a user clicks a sidebar nav-item, the active state swap is wrapped in
   document.startViewTransition so the indicator pill slides smoothly. Falls
   back to direct class change when the API is unavailable.
   ════════════════════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Per-Page Identity Tint (Worker 12 / Phase 5)
   Public API: window.Upg.identity.{ setTint, getTint }
   Sets [data-active-tint] on <html> when user navigates between pages.
   Works by:
     1. Observing .page.active mutations (mutation observer).
     2. Wrapping window.navigateTo if present.
     3. Reading initial active page on load.
   ════════════════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Time-of-Day Greeting (Worker 12 / Phase 5)
   Public API: window.Upg.greet.{ refresh }
   - Replaces "أهلاً" line in cath-dash-greeting with time-aware version.
   - Uses Upg.state.profile() if available, else falls back to "صديقي".
   - Re-runs every 30 minutes to keep greeting current.
   ════════════════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Count-Up Tickers (Worker 12 / Phase 5)
   Public API: window.Upg.countup.{ run, observe }
   - Hooks any element with [data-countup] OR .cath-stat-value [data-cath-stat]
   - Reads numeric target from element textContent (or data-countup="N")
   - Tweens 0 → target over 1200ms with easeOutCubic
   - Observes intersection so animation triggers on visibility, not page-load
   ════════════════════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Motion Engine (Worker 12 / Phase 6)
   Public API: window.Upg.motion = { reveal(root), refreshGlow(root) }
   Wires: cursor-glow tracking, stagger-reveal observer, view-transition-wrap
   for navigateTo. Honors prefers-reduced-motion.
   ════════════════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — View-Transition wrapper for navigateTo (Worker 12 / Phase 6)
   Wraps the global navigateTo so page changes use document.startViewTransition
   when supported. Falls back gracefully on unsupported browsers.
   ════════════════════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════════════════════
   AURORA v15 — Phase 7: Boot Banner + Sanity Assert (Worker 12)
   - One-shot banner per session.
   - Sanity-checks every Upg.* module is wired.
   - Reports any missing module via console.warn (non-fatal).
   ════════════════════════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════════
   AURORA v15.1 — Boot Sanity Assert (Worker 13 / Phase 3)
   يفحص أن كل 14 Upg API محمّلين.
   لا يكسر شي — فقط يطبع banner واضح في console.
   ═══════════════════════════════════════════════════════════════ */


/* ============================================================
   ATELIER v16 — Material Density API (Worker 14 / Phase 1)
   Public API: window.Upg.material.{ get, set, cycle }
   States: 'low' | 'standard' | 'high'
   Persists to localStorage('upg_material_density').
   Dispatches CustomEvent('upg:material:change') on change.
   ============================================================ */




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


/* ════════════════════════════════════════════════════════════════════════════
   ATELIER v16 — Page Transition Wrap (Worker 14 / Phase 5)
   Public API: window.Upg.transition.{ navigate, supports }
   Wraps existing window.navigateTo() with View Transitions API where
   available, otherwise applies an .is-entering CSS animation as fallback.
   Listens to [data-page] click delegation; respects existing onclick handlers
   for backward compatibility (legacy v12 nav-items use onclick="navigateTo(…)").
   ════════════════════════════════════════════════════════════════════════════ */



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


/* ============================================================
   ATELIER v16 — Auto-attach Focus Trap on common modals
   Heuristic: any element matching [role="dialog"], .modal, .qmodal,
   or [data-modal] that becomes "open" (class .is-open / aria-modal=true)
   gets a focus trap automatically. Disable when closed.
   ============================================================ */


/* ============================================================
   ATELIER v16 — Lighthouse Boot Helper (Worker 14 / Phase 6)
   - Adds passive listeners hint on common scrollers
   - Lazy-loads images with no loading attr
   - Prefetch on hover for nav-items (perceived speed)
   ============================================================ */


/* ============================================================
   ATELIER v16 — Sanity Banner (Worker 14 / Phase 6)
   Final boot assert — verifies all 19 Upg.* modules are present.
   Prints PASS banner or warns about missing modules.
   ============================================================ */



/* ============================================================
   RESONANCE v2 — Per-Page Type Personality API
   (Worker 15 / Phase 6)
   Public API: window.Upg.type2.{ get, set, list, observe }
   - get():     returns current page's personality string
   - set(name): manually overrides personality on current section
   - list():    returns all 15 personality names
   - observe(): auto-detects on navigation, fires upg:type:change
   ============================================================ */



/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Upg.life API (Worker 16 / Phase 1)
   Programmatic control of living surfaces.
   Additive: preserves all 20 existing Upg.* APIs.
   ════════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════════
   VITAL UI v1 — Tactile Engine (Worker 16 / Phase 2)
   Pack v2 RESONANCE — extends Upg.life with .pulse() + ripple delegation
                       + amplified magnet. No new public APIs added.
   Additive: preserves all 21 existing Upg.* APIs (Phase 1 introduced Upg.life).
   ════════════════════════════════════════════════════════════════ */
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
/* End VITAL UI v1 / Worker 16 / Phase 6 / Final ──────────────────────── */


/* ════════════════════════════════════════════════════════════════
 * RESONANCE v2 — Worker 17 / Phase 4 — Upg.practice
 * 23rd top-level Upg.* namespace.
 * Scope: track which questions user attempted, reflection text,
 *        last-touched timestamp per block. localStorage only.
 * No telemetry. No sync. Personal use only.
 * ════════════════════════════════════════════════════════════════ */



/* ════════════════════════════════════════════════════════════════
 * RESONANCE v2 — Worker 17 / Phase 6 — Upg.pace
 * 25th top-level Upg.* namespace (24th visible to lowercase regex; type2 is the
 * 24th, this is the 25th in human count).
 * Scope:
 *   - Mastery state per block (3 states: not-started / in-progress / mastered).
 *   - Focus timer sessions per block (15 / 25 / 45 minutes).
 *   - Per-page progress aggregation + heatmap render in page-myprogress.
 *   - Optional integration with Upg.sound (play 'complete' on session end).
 * Storage: localStorage only. No telemetry. No sync.
 * Public API (Object.freeze'd):
 *   getMastery / setMastery / cycleMastery
 *   startFocus / stopFocus / logFocus / totalFocusSeconds
 *   refreshPageProgress / refreshAllProgress / renderHeatmap / states
 * Events dispatched:
 *   upg:pace:mastery          { blockId, state }
 *   upg:pace:focus            { blockId, durationSec }
 *   upg:pace:focus:complete   { blockId, durationSec }
 * ════════════════════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════════════════
 * End — Worker 17 / Phase 6 — Upg.pace (FINAL Worker 17 phase)
 * Sacred preserved: 14 pages / 391 qcalc / 23 prior Upg.* APIs +
 *                   type2 (= 24th) + Upg.pace (25th human-counted).
 * ════════════════════════════════════════════════════════════════ */


/* ════════════════════════════════════════════════════════════════════════════
 * TASMEEM v3 — Upg.font API (Worker 20 / Phase 3)
 * Programmatic introspection + control of local font system.
 * Additive: preserves all 24 existing Upg.* APIs (this is the 25th).
 * ════════════════════════════════════════════════════════════════════════════ */
/* End TASMEEM v3 / Phase 3 — Upg.font ──────────────────────────────────── */



/* ════════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Numeric Discipline Auto-Apply (Worker 20 / Phase 4)
   ────────────────────────────────────────────────────────────────────────────
   Extends Upg.font (defined in Phase 3) with two methods:
     - applyNumericDiscipline(root)  → scan + augment numeric elements
     - auditNumericDiscipline()      → return a coverage report
   Idempotent: re-runs are safe (won't double-add classes).
   Auto-fires on DOMContentLoaded + on upg:nav:change events.
   No external requests, no library, no framework. Vanilla.
   ──────────────────────────────────────────────────────────────────────── */
/* End TASMEEM v3 / Phase 4 — Numeric Discipline ──────────────────────────── */



/* ══════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Worker 20 / Phase 6 — Page Signature Introspection
   ──────────────────────────────────────────────────────────────────────────
   Sub-IIFE that EXTENDS window.Upg.font (from Phase 3) with three
   personality-aware methods. No new top-level Upg.* namespace. Frozen
   replacement preserves the surface defined in Phase 3 + Phase 4.
   ══════════════════════════════════════════════════════════════════════════ */
/* End TASMEEM v3 / Phase 6 — Per-Page Type Signature ──────────────────────── */



/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Upg.chroma API (Worker 21 / Phase 3)
   ────────────────────────────────────────────────────────────────────────
   Programmatic introspection + control of Pack v3 color system.
   26th top-level Upg.* namespace. Additive: preserves all 25 existing APIs.
   No DOM mutation. No event listeners that mutate state. Read-only surface
   plus pure helpers (resolveColor, getCurrentTint, audit).
   ════════════════════════════════════════════════════════════════════════ */
/* End CHROMATIC SOUL v3 / Worker 21 / Phase 3 — Page Reassignment ──────── */



/* ════════════════════════════════════════════════════════════════════════
   CHROMATIC SOUL v3 — Contrast Verification (Worker 21 / Phase 5)
   ────────────────────────────────────────────────────────────────────────
   يُمدّد Upg.chroma بـ checkContrast(fg, bg) و verifyContrast() للتحقق
   من WCAG AA على كل text/bg pair. additive freeze-replace pattern —
   لا يُلمَس IIFE الأصلي من Phase 3.

   - cssToRgb يحوّل أي CSS color (oklch/hsl/rgb/named) إلى [r,g,b] عبر
     temp element (المتصفح يقوم بالحساب).
   - luminance + ratio حساب WCAG قياسي.
   - verifyContrast يفحص text/text-muted/brand على bg + surfaces.
   - DOMContentLoaded one-time auto-verify مع log info/warn.
   ════════════════════════════════════════════════════════════════════════ */
/* End CHROMATIC SOUL v3 / Worker 21 / Phase 5 — Contrast Verification ─── */
/* End CHROMATIC SOUL v3 — WORKER 21 COMPLETE 5/5 ─────────────────────── */


/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Upg.ritual API · Entry Ritual (Worker 22 / Phase 1)
   ────────────────────────────────────────────────────────────────────────
   Phase 1 introduces the entry ritual. Phases 2-6 EXTEND this same
   namespace (Upg.ritual.{enterHalo,exitHalo,setTransition,...}) without
   touching this IIFE. Idempotent: if Upg.ritual already exists from a
   later phase initializing first (load-order edge case), we merge in
   place, never overwrite siblings.

   Storage:
     · upg_ritual_last_entry      — millis timestamp of last successful entry
     · upg_ritual_disabled        — JSON array of disabled ritual ids
     · upg_ritual_entry_disabled  — legacy '1' flag (auto-migrated, then dropped)
   ════════════════════════════════════════════════════════════════════════ */
/* End RITUAL UI v3 / Phase 1 — Upg.ritual entry surface ──────────────── */



/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Reading Halo (Worker 22 / Phase 2)
   Extends Upg.ritual with: enterHalo, exitHalo, toggleHalo, isHaloActive.
   Activated via Cmd+. / Ctrl+. or [data-rit-halo-toggle] button.
   ════════════════════════════════════════════════════════════════════════ */
/* End RITUAL UI v3 / Phase 2 — Reading Halo ─────────────────────────── */


/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Threshold Routing (Worker 22 / Phase 3)
   ────────────────────────────────────────────────────────────────────────
   EXTENDS window.Upg.transition.run (signature preserved — adds opts.ritual
   and opts.toPageId without breaking W14 contract). EXTENDS window.Upg.ritual
   with setTransition/getTransition/listTransitions/transitionMap helpers.
   16 personality mappings (15 pages + curriculum). Uses View Transitions API
   when available, CSS class fallback otherwise. reduced-motion → instant fade.
   ════════════════════════════════════════════════════════════════════════ */

/* End RITUAL UI v3 / Phase 3 — Threshold Routing ───────────────────── */



/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Inkpot Feedback Logic (Worker 22 / Phase 4)
   ────────────────────────────────────────────────────────────────────────
   Extends Upg.ritual with .inkpot { trigger, attach, listVariants,
   personalityMap, setPersonalityVariant }. No new top-level Upg.* API
   (Upg.ritual created in P1).  Auto-attaches data-rit-ink="auto" to
   interactive elements; resolves variant from active page-personality on
   click. Click coords feed --rit-ink-x / --rit-ink-y custom props.
   Idempotent via window.Upg.ritual._inkpotInstalled flag.
   ════════════════════════════════════════════════════════════════════════ */

/* End RITUAL UI v3 / Phase 4 — Inkpot Feedback ─────────────────────── */



/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Atmosphere Logic (Worker 22 / Phase 5)
   ────────────────────────────────────────────────────────────────────────
   ٥ atmospheres تَتعرَّف على وقت اليوم (dawn/forenoon/asr/maghrib/isha)
   وتُلبِس body بـ data-rit-time. التَطبيق:
     - تلقائي عند DOMContentLoaded
     - timer كل ٢٠ دقيقة
     - visibilitychange (المستخدم رجع من tab/sleep)
   API: window.Upg.ritual.atmosphere
     detect / apply / set / clearOverride / refresh /
     disable / enable / status / list / listArabic
   ════════════════════════════════════════════════════════════════════════ */

/* End RITUAL UI v3 / Phase 5 — Time of Day ──────────────────────────── */




/* ════════════════════════════════════════════════════════════════════════
   RITUAL UI v3 — Worker 22 / Phase 6 — Aura Deepening Logic
   ────────────────────────────────────────────────────────────────────────
   • EXTENDS W16 P6 Upg.aura (frozen) by rebuilding its frozen surface with
     original methods preserved verbatim + new deepen / undeepen /
     deepRhythmFor methods. Original signatures unchanged.
   • EXTENDS Upg.ritual (W22 P1) with auraTie / deepenAura / undeepenAura /
     rhythmMap.
   • Auto-deepens active page on nav (upg:nav:change).
   • Idempotent — _auraDeepInstalled flag prevents double-install.
   ════════════════════════════════════════════════════════════════════════ */
/* End RITUAL UI v3 / Phase 6 — Aura Deepening — Worker 22 COMPLETE 6/6 ── */



/* ════════════════════════════════════════════════════════════════════════
   DECONSTRUCTION v3 — Upg.layer API (Worker 23 / Phase 1)
   Programmatic introspection of CSS @layer cascade.
   28th top-level Upg.* namespace. Pure read-only (no DOM writes).
   ──────────────────────────────────────────────────────────────────────
   Surface (frozen):
     Upg.layer.list()          → ['reset','tokens','base','utilities',
                                  'components','themes','overrides']
     Upg.layer.cascadeOrder()  → array of declared layers (or null)
     Upg.layer.audit()         → { total, byLayer: { name: {rules, populated} } }
     Upg.layer.status()        → { declared, audit, cascade_active,
                                   important_count_target }
   ──────────────────────────────────────────────────────────────────────
   Phase 1 sets the cascade. Phase 2 uses Upg.layer.audit() to verify
   no regression after !important purge. Sub-namespace freezing follows
   pattern of Upg.aura / Upg.ritual / Upg.font.
   ════════════════════════════════════════════════════════════════════════ */
/* End DECONSTRUCTION v3 / Phase 1 — Upg.layer API installed (28th Upg.* namespace) ─ */



/* ════════════════════════════════════════════════════════════════════════
   DECONSTRUCTION v3 — Upg.layer.auditImportant API (Worker 23 / Phase 2)
   ────────────────────────────────────────────────────────────────────────
   Phase 1 froze window.Upg.layer with {list, cascadeOrder, audit, status}.
   Phase 2 adds .auditImportant() via additive freeze-replace pattern
   (precedent: W14/W15 — never mutate prior frozen surface).

   Public surface after this IIFE (5 methods):
     Upg.layer.list()             — declared layer names (Phase 1, verbatim)
     Upg.layer.cascadeOrder()     — actual cascade order (Phase 1, verbatim)
     Upg.layer.audit()            — rule counts per layer (Phase 1, verbatim)
     Upg.layer.status()           — full snapshot (UPDATED: reflects W23/P2 target)
     Upg.layer.auditImportant()   — !important inventory (NEW in Phase 2)

   auditImportant() returns:
     {
       total: number,                   // total !important declarations seen
       byLayer: { reset, tokens, base, utilities, components, themes,
                  overrides, unknown },
       byCategory: {
         reduced_motion,    // inside @media (prefers-reduced-motion: reduce)
         print,             // inside @media print
         reduced_transparency,
         forced_colors,     // inside @media (forced-colors: active)
         pointer_coarse,    // inside @media (pointer: coarse) / (hover: none)
         responsive,        // inside @media (max-width: *) etc.
         other              // unmedia-ed
       },
       byKind: {
         utility,           // .u-* rule
         hidden_attr,       // [hidden] selector
         halo_target,       // body[data-rit-halo="active"] *
         opt_out,           // [data-life="none"] / .rit-ink-bare
         state_pause,       // body.is-hidden
         other
       },
       phase_target: 310,   // expected after W23/P2
       phase_alarm: 315     // regression threshold
     }

   Tolerates CORS-restricted stylesheets silently.
   ════════════════════════════════════════════════════════════════════════ */
/* End DECONSTRUCTION v3 / Phase 2 — Upg.layer.auditImportant() installed ── */



/* ════════════════════════════════════════════════════════════════════════
   DECONSTRUCTION v3 — Upg.shards (Worker 23 / Phase 4 — HTML Template Split)
   29th top-level Upg.* namespace.

   Doctrine (DEVOTIO):
     1. Stage-and-Replace (this phase: STAGE only).
     2. Each <section class="page" id="page-X"> in index.html has a 1:1 byte-
        exact copy in platform/pages/<X>.html.
     3. Inline copies are STILL CANONICAL until Phase 5 finishes the JS ESM
        migration (which rewrites navigateTo to live-query .page elements).
     4. Public API surface lets the platform LOAD/CACHE/AUDIT/PRELOAD shards
        ahead of the swap, so the future Replace step has zero latency cost.
     5. Offline-first: SW pre-caches every shard; fetch falls back to cache.
     6. file:// users keep working — Upg.shards.loadShard() catches and
        returns null silently (the inline copy still renders).

   Public API:
     Upg.shards.list()                        → string[] of 15 shard ids
     Upg.shards.loadShard(id)                 → Promise<DocumentFragment|null>
     Upg.shards.preloadAll([{idle:true}])     → Promise<{loaded, failed, total}>
     Upg.shards.audit()                       → snapshot
     Upg.shards.verify(id)                    → Promise<{match, inlineLines, shardLines}>
     Upg.shards.mountShard(id, opts?)         → Promise<boolean>  (FUTURE — STAGED)
     Upg.shards.discipline()                  → frozen rules array

   Sacred preserved:
     - 14 page sections (15 with dashboard) — all inline still.
     - 391 qcalc — all inline still.
     - 28 prior Upg.* APIs — untouched.
     - navigateTo (line ~160) — untouched (Phase 5 migrates).
   ════════════════════════════════════════════════════════════════════════ */

/* ─── post-IIFE trailing ─── */
/* End DECONSTRUCTION v3 / Phase 4 — Upg.shards installed ───────────────── */
