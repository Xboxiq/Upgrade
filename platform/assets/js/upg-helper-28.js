/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-28.js
   Extracted from app.js lines 8780-8893
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
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
