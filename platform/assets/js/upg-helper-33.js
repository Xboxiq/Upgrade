/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-33.js
   Extracted from app.js lines 9634-10595
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
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
