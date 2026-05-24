/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-37.js
   Extracted from app.js lines 11337-11485
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
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
