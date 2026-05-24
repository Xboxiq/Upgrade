/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-32.js
   Extracted from app.js lines 9127-9625
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
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
