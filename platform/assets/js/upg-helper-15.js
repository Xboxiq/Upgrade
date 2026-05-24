/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-15.js
   Extracted from app.js lines 5047-5208
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function qlKpiCalc(){
  'use strict';
  if (window.__qlKpiCalc) return;
  window.__qlKpiCalc = true;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      setTimeout(fn, 0);
    }
  }

  // Score helpers — each returns 0-100
  function scoreAHT(min){
    // Optimal 4-6 min. Below 3 or above 8 penalized.
    if (min >= 4 && min <= 6) return 100;
    if (min >= 3 && min < 4) return 85;
    if (min > 6 && min <= 7) return 80;
    if (min > 7 && min <= 8) return 60;
    if (min < 3) return 50;  // Too fast = rushed
    return Math.max(20, 100 - (min - 8) * 12);
  }
  function scoreLinear(val, target){
    // FCR/CSAT/QA: higher is better up to target then capped
    if (val >= target) return 100;
    return Math.max(0, Math.round((val / target) * 100));
  }
  function scoreAdh(val){
    // Optimal 92-95. 100 is bad sign.
    if (val >= 92 && val <= 95) return 100;
    if (val > 95 && val <= 98) return 90;
    if (val > 98) return 70;     // suspiciously high
    if (val >= 88 && val < 92) return 80;
    return Math.max(20, val - 50);
  }

  function tier(score){
    if (score >= 90) return { label: '🏆 نخبة — Top Performer', color: '#22c55e' };
    if (score >= 80) return { label: '✨ ممتاز — Above Average', color: '#66FCF1' };
    if (score >= 70) return { label: '✅ جيد — Meets Target', color: '#a3e635' };
    if (score >= 60) return { label: '⚠️ يحتاج تطوير — Improvement Plan', color: '#f59e0b' };
    return { label: '🚨 حرج — Coaching Required', color: '#ef4444' };
  }

  function recommend(scores, raw){
    var recos = [];
    // Sort by score ascending → tackle lowest first
    var pairs = Object.keys(scores).map(function(k){ return [k, scores[k]]; });
    pairs.sort(function(a, b){ return a[1] - b[1]; });
    var picked = pairs.slice(0, 3);

    var msgs = {
      aht: function(s, v){
        if (v < 3) return 'الـ AHT منخفض جداً (' + v + ' د) — راجع FCR، قد تكون مكالماتك متسرّعة. ادرج تأكيد الفهم في خطوة الإغلاق.';
        if (v > 7) return 'AHT مرتفع (' + v + ' د) — درّب على Mirroring 3 كلمات بدل إعادة كاملة، وأسئلة Diagnose محصورة بـ 3.';
        return 'AHT في النطاق الجيد (' + v + ' د). للتحسين: قلّل Hold Time عبر Knowledge Base shortcut.';
      },
      fcr: function(s, v){
        if (v < 60) return 'FCR منخفض (' + v + '%) — أهم محرك للتكلفة. ركّز على Diagnose أعمق وتأكيد كامل قبل الإغلاق (Voss summary).';
        if (v < 75) return 'FCR (' + v + '%) قريب من المرجع. تحسين بسيط: تأكد من إغلاق التذكرة بعد التأكيد لا قبله.';
        return 'FCR ممتاز (' + v + '%) — حافظ عليه عبر تدوين الحالات النادرة.';
      },
      csat: function(s, v){
        if (v < 75) return 'CSAT منخفض (' + v + '%) — راجع Peak-End: آخر 90 ثانية يجب تحوي قيمة غير متوقعة.';
        if (v < 85) return 'CSAT (' + v + '%) جيد. للارتقاء: استخدم اسم العميل 3 مرات في المكالمة + ابتسامة فيزيائية قبل الرفع.';
        return 'CSAT ممتاز (' + v + '%) — استمر بصيغ Empathy Loop الموثّقة.';
      },
      adh: function(s, v){
        if (v > 98) return 'Adherence ' + v + '% علامة burnout قادم. خذ استراحاتك المجدولة فعلاً — هذا مطلب جودة لا تكاسل.';
        if (v < 90) return 'Adherence ' + v + '% — أعد ترتيب الجدول الشخصي. كل 1% انضباط = 0.6% تحسّن في CSAT.';
        return 'Adherence (' + v + '%) في نطاق صحي. حافظ على روتين الاستراحات.';
      },
      qa: function(s, v){
        if (v < 75) return 'QA Score (' + v + '%) — راجع 3 معايير الأهم: Empathy (15%) + Accuracy (25%) + Resolution (20%).';
        if (v < 90) return 'QA (' + v + '%) قريب من معيار COPC. ركّز على Compliance + Closing.';
        return 'QA ممتاز (' + v + '%) — مرشّح ممتاز لدور QA Analyst أو Trainer.';
      }
    };

    picked.forEach(function(p){
      var k = p[0];
      var v = raw[k];
      if (msgs[k]) recos.push(msgs[k](p[1], v));
    });
    return recos;
  }

  ready(function(){
    var page = document.getElementById('page-callcenter');
    if (!page) return;
    var calc = page.querySelector('[data-cc-calc]');
    if (!calc) return;
    var btn  = calc.querySelector('[data-kc-run]');
    var out  = calc.querySelector('[data-kc-out]');
    if (!btn || !out) return;

    function num(sel){
      var el = calc.querySelector('[data-kc="' + sel + '"]');
      return el ? parseFloat(el.value) || 0 : 0;
    }

    btn.addEventListener('click', function(){
      var raw = {
        aht:  num('aht'),
        fcr:  num('fcr'),
        csat: num('csat'),
        adh:  num('adh'),
        qa:   num('qa')
      };
      var scores = {
        aht:  scoreAHT(raw.aht),
        fcr:  scoreLinear(raw.fcr, 80),
        csat: scoreLinear(raw.csat, 90),
        adh:  scoreAdh(raw.adh),
        qa:   scoreLinear(raw.qa, 90)
      };
      // Weighted composite — FCR + QA + CSAT lead
      var index = Math.round(
        scores.fcr  * 0.30 +
        scores.qa   * 0.25 +
        scores.csat * 0.20 +
        scores.aht  * 0.15 +
        scores.adh  * 0.10
      );

      // Paint
      out.hidden = false;
      var ring = calc.querySelector('[data-kc-ring]');
      var t    = tier(index);
      if (ring) {
        ring.style.setProperty('--p', String(index));
        ring.style.background = 'conic-gradient(' + t.color + ' ' + index + '%, rgba(255,255,255,0.06) 0)';
      }
      var nEl = calc.querySelector('[data-kc-num]'); if (nEl) nEl.textContent = String(index);
      var tEl = calc.querySelector('[data-kc-tier]');
      if (tEl) {
        tEl.textContent = t.label + ' · ' + index + '/100';
        tEl.style.borderColor = t.color;
        tEl.style.color = t.color;
      }
      ['aht','fcr','csat','adh','qa'].forEach(function(k){
        var bar = calc.querySelector('[data-kc-bar="' + k + '"]');
        var pct = calc.querySelector('[data-kc-pct="' + k + '"]');
        if (bar) bar.style.inlineSize = scores[k] + '%';
        if (bar) bar.style.width      = scores[k] + '%';
        if (pct) pct.textContent      = scores[k] + '%';
      });

      var recos = recommend(scores, raw);
      var ol = calc.querySelector('[data-kc-recos]');
      if (ol) {
        ol.innerHTML = '';
        recos.forEach(function(r){
          var li = document.createElement('li');
          li.textContent = r;
          ol.appendChild(li);
        });
      }
    });
  });
})();
