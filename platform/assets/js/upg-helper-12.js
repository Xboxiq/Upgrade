/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-12.js
   Extracted from app.js lines 4712-4933
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
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
