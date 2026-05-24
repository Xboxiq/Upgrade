/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-18.js
   Extracted from app.js lines 6064-6385
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
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
