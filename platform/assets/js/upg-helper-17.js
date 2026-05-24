/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-17.js
   Extracted from app.js lines 5698-6053
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
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
