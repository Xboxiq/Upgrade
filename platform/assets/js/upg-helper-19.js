/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-19.js
   Extracted from app.js lines 6392-6586
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
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
