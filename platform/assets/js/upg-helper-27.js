/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-27.js
   Extracted from app.js lines 8602-8773
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
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
