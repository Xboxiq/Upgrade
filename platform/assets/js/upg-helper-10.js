/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-10.js
   Extracted from app.js lines 4553-4630
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function qlAccountMgr(){
  'use strict';
  if (window.__qlAccountMgr) return;
  window.__qlAccountMgr = true;

  function $(sel){ return document.querySelector(sel); }
  function $$(sel){ return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function fmt(n){ return (Number(n)||0).toLocaleString('en-US'); }

  /* ── NRR ─────────────────────────────────────────────────── */
  function recalcNRR(){
    var s = +($('[data-nrr="start"]')||{}).value || 0;
    var e = +($('[data-nrr="expand"]')||{}).value || 0;
    var d = +($('[data-nrr="down"]')||{}).value || 0;
    var c = +($('[data-nrr="churn"]')||{}).value || 0;
    var net = e - d - c;
    var nrr = s > 0 ? ((s + net) / s) * 100 : 0;

    var nrrOut = $('[data-nrr-out="nrr"]');
    var netOut = $('[data-nrr-out="net"]');
    var warn   = $('[data-nrr-warn]');
    if (nrrOut) nrrOut.textContent = nrr.toFixed(1) + '%';
    if (netOut) netOut.textContent = (net >= 0 ? '+$' : '−$') + fmt(Math.abs(Math.round(net)));
    if (warn) {
      if (s <= 0) { warn.hidden = true; }
      else if (nrr >= 110) {
        warn.hidden = false; warn.classList.add('lab-warn-ok');
        warn.textContent = '✓ ممتاز: NRR ≥ 110% — نمو من القاعدة القائمة (المعيار الذهبي SaaS).';
      } else if (nrr >= 100) {
        warn.hidden = false; warn.classList.remove('lab-warn-ok');
        warn.textContent = 'مقبول: NRR بين 100-110%. تعويض churn فقط، بلا توسّع حقيقي.';
      } else {
        warn.hidden = false; warn.classList.remove('lab-warn-ok');
        warn.textContent = '⚠️ خطر: NRR < 100% — تخسر إيراد من العملاء القائمين. راجع Health Scores.';
      }
    }
  }
  $$('[data-nrr]').forEach(function(i){ i.addEventListener('input', recalcNRR); });
  if ($('[data-lab="nrr"]')) recalcNRR();

  /* ── Health Score (weighted) ─────────────────────────────── */
  var WEIGHTS = { usage: 0.25, nps: 0.20, support: 0.15, exec: 0.15, contract: 0.10, payment: 0.15 };
  function recalcHS(){
    var total = 0;
    Object.keys(WEIGHTS).forEach(function(k){
      var input = $('[data-hs="' + k + '"]');
      var v = input ? +input.value || 0 : 0;
      total += v * WEIGHTS[k];
      // sync the value display
      if (input) {
        var row = input.closest('.hs-row');
        if (row) {
          var valSpan = row.querySelector('.hs-val');
          if (valSpan) valSpan.textContent = v;
        }
      }
    });
    var score = Math.round(total);
    var scoreEl = $('[data-hs-score]');
    var bandEl  = $('[data-hs-band]');
    if (scoreEl) scoreEl.textContent = score;
    if (bandEl) {
      bandEl.classList.remove('hs-band-good','hs-band-mid','hs-band-bad');
      if (score >= 80) {
        bandEl.classList.add('hs-band-good');
        bandEl.textContent = '✓ ممتاز — جاهز للـ Expansion. اقترح cross-sell خلال 30 يوم.';
      } else if (score >= 50) {
        bandEl.classList.add('hs-band-mid');
        bandEl.textContent = 'متوسط — راقب. حدّد عاملين أضعف وضع خطة 60 يوم لرفعهما.';
      } else {
        bandEl.classList.add('hs-band-bad');
        bandEl.textContent = '⚠ خطر churn — escalate فوراً. خطة Recovery 30 يوم + تواصل تنفيذي.';
      }
    }
  }
  $$('[data-hs]').forEach(function(i){ i.addEventListener('input', recalcHS); });
  if ($('[data-lab="health"]')) recalcHS();
})();
