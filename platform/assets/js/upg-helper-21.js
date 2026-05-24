/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-21.js
   Extracted from app.js lines 6770-6960
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if (window.__UPG_ACC_PHASE4__) return;
  window.__UPG_ACC_PHASE4__ = true;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else { fn(); }
  }

  function fmt(n){
    var x = Math.round(Number(n) || 0);
    var sign = x < 0 ? '−' : '';
    return sign + Math.abs(x).toLocaleString('en-US');
  }
  function getN(input){ return Math.max(0, Number(input.value) || 0); }

  /* ── Block 9 · Income Statement Builder ─────────────────────── */
  function setupIS(){
    var lab = document.querySelector('[data-acc-lab="income-stmt"]');
    if (!lab) return;
    var ins = {};
    lab.querySelectorAll('[data-is]').forEach(function(el){ ins[el.dataset.is] = el; });
    var outs = {};
    lab.querySelectorAll('[data-is-out]').forEach(function(el){ outs[el.dataset.isOut] = el; });
    var warnWrap = lab.querySelector('[data-acc-is-warn]');

    function compute(){
      var sales = getN(ins.sales);
      var returns = getN(ins.returns);
      var cogs = getN(ins.cogs);
      var opex = getN(ins.opSalaries) + getN(ins.opRent) + getN(ins.opMkt) + getN(ins.opDep) + getN(ins.opOther);
      var otherInc = getN(ins.otherInc);
      var interest = getN(ins.interest);
      var taxRate = Math.max(0, Math.min(100, Number(ins.taxRate.value) || 0)) / 100;

      var netSales = sales - returns;
      var gp = netSales - cogs;
      var op = gp - opex;
      var ebt = op + otherInc - interest;
      var tax = ebt > 0 ? ebt * taxRate : 0;
      var net = ebt - tax;

      outs.sales.textContent     = fmt(sales);
      outs.returns.textContent   = '(' + fmt(returns) + ')';
      outs.netSales.textContent  = fmt(netSales);
      outs.cogs.textContent      = '(' + fmt(cogs) + ')';
      outs.gp.textContent        = fmt(gp);
      outs.opex.textContent      = '(' + fmt(opex) + ')';
      outs.op.textContent        = fmt(op);
      outs.otherInc.textContent  = fmt(otherInc);
      outs.interest.textContent  = '(' + fmt(interest) + ')';
      outs.ebt.textContent       = fmt(ebt);
      outs.tax.textContent       = '(' + fmt(tax) + ')';
      outs.net.textContent       = fmt(net);

      var pct = function(num){
        if (netSales <= 0) return '—';
        return ((num / netSales) * 100).toFixed(1) + '%';
      };
      outs.gpPct.textContent  = pct(gp);
      outs.opPct.textContent  = pct(op);
      outs.netPct.textContent = pct(net);

      // negative styling
      ['gp','op','net'].forEach(function(k){
        var li = outs[k] && outs[k].closest('li');
        if (!li) return;
        var v = k === 'gp' ? gp : (k === 'op' ? op : net);
        if (v < 0) li.classList.add('negative'); else li.classList.remove('negative');
      });

      // Warnings
      var warns = [];
      var gpPct = netSales > 0 ? gp / netSales : 0;
      var opPct = netSales > 0 ? op / netSales : 0;
      var netPct = netSales > 0 ? net / netSales : 0;
      if (gpPct < 0.15) warns.push({lvl:'danger', t:'هامش الربح الإجمالي ضعيف (<15%) — راجع تكلفة الشراء أو الإنتاج.'});
      else if (gpPct < 0.25) warns.push({lvl:'warn', t:'هامش الربح الإجمالي متوسط (15-25%) — مساحة لتحسين هامش التسعير.'});
      else warns.push({lvl:'ok', t:'هامش الربح الإجمالي صحي (≥25%).'});

      if (op < 0) warns.push({lvl:'danger', t:'الربح التشغيلي سالب — العمليات الأساسية تخسر، تحقق من المصاريف الإدارية.'});
      else if (opPct < 0.05) warns.push({lvl:'warn', t:'الربح التشغيلي ضعيف (<5%) — العمليات بالكاد تغطي مصاريفها.'});

      if (net < 0) warns.push({lvl:'danger', t:'صافي ربح سالب — الشركة في خسارة هذه الفترة.'});
      else if (netPct < 0.03) warns.push({lvl:'warn', t:'صافي الربح هامشي (<3%) — هامش أمان منخفض ضد الصدمات.'});
      else if (netPct >= 0.10) warns.push({lvl:'ok', t:'صافي ربح ممتاز (≥10%).'});

      if (interest > 0 && op > 0 && (op / interest) < 3) {
        warns.push({lvl:'warn', t:'تغطية الفوائد <3x — المخاطر المالية مرتفعة.'});
      }

      warnWrap.innerHTML = warns.map(function(w){
        var icon = w.lvl === 'danger' ? '⛔' : w.lvl === 'warn' ? '⚠️' : '✅';
        return '<div class="acc-is-warn '+w.lvl+'"><span>'+icon+'</span><span>'+w.t+'</span></div>';
      }).join('');

      try {
        var draft = {};
        Object.keys(ins).forEach(function(k){ draft[k] = ins[k].value; });
        localStorage.setItem('upg_statements_drafts', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('upg_statements_drafts')||'{}'), { is: draft })));
      } catch(_){}
    }

    Object.keys(ins).forEach(function(k){
      ins[k].addEventListener('input', compute);
      ins[k].addEventListener('change', compute);
    });

    // Restore
    try {
      var draft = JSON.parse(localStorage.getItem('upg_statements_drafts')||'{}');
      if (draft && draft.is) {
        Object.keys(draft.is).forEach(function(k){
          if (ins[k] && draft.is[k] !== '') ins[k].value = draft.is[k];
        });
      }
    } catch(_){}

    compute();
  }

  /* ── Block 10 · Balance Sheet Builder ───────────────────────── */
  function setupBS(){
    var lab = document.querySelector('[data-acc-lab="balance-sheet"]');
    if (!lab) return;
    var ins = {};
    lab.querySelectorAll('[data-bs]').forEach(function(el){ ins[el.dataset.bs] = el; });
    var outs = {};
    lab.querySelectorAll('[data-bs-out]').forEach(function(el){ outs[el.dataset.bsOut] = el; });
    var flag = lab.querySelector('[data-acc-bs-flag]');
    var eqEl = lab.querySelector('[data-acc-bs-eq]');
    var flagText = flag.querySelector('.acc-bs-flag-text');
    var flagDiff = flag.querySelector('.acc-bs-flag-diff b');

    function compute(){
      var ca = getN(ins.cash) + getN(ins.ar) + getN(ins.inv) + getN(ins.otherCa);
      var fa = getN(ins.land) + getN(ins.ppe) + getN(ins.intang);
      var totalAssets = ca + fa;

      var cl = getN(ins.ap) + getN(ins.stl) + getN(ins.taxDue);
      var ll = getN(ins.ltl) + getN(ins.otherLtl);
      var eq = getN(ins.capital) + getN(ins.retained) + getN(ins.reserves);
      var totalLE = cl + ll + eq;

      outs.ca.textContent = fmt(ca);
      outs.fa.textContent = fmt(fa);
      outs.totalAssets.textContent = fmt(totalAssets);
      outs.cl.textContent = fmt(cl);
      outs.ll.textContent = fmt(ll);
      outs.eq.textContent = fmt(eq);
      outs.totalLE.textContent = fmt(totalLE);

      var diff = totalAssets - totalLE;
      var ok = Math.abs(diff) < 0.5;
      flag.dataset.balance = ok ? 'ok' : 'off';
      eqEl.dataset.balance = ok ? 'ok' : 'off';
      eqEl.textContent = ok ? '=' : '≠';
      flagText.textContent = ok ? 'المعادلة متوازنة · Assets = Liabilities + Equity' : 'المعادلة غير متوازنة — راجع القيود';
      flagDiff.textContent = fmt(diff);

      try {
        var draft = {};
        Object.keys(ins).forEach(function(k){ draft[k] = ins[k].value; });
        localStorage.setItem('upg_statements_drafts', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('upg_statements_drafts')||'{}'), { bs: draft })));
      } catch(_){}
    }

    Object.keys(ins).forEach(function(k){
      ins[k].addEventListener('input', compute);
      ins[k].addEventListener('change', compute);
    });

    try {
      var draft = JSON.parse(localStorage.getItem('upg_statements_drafts')||'{}');
      if (draft && draft.bs) {
        Object.keys(draft.bs).forEach(function(k){
          if (ins[k] && draft.bs[k] !== '') ins[k].value = draft.bs[k];
        });
      }
    } catch(_){}

    compute();
  }

  ready(function(){
    try { setupIS(); } catch(e) { console.warn('IS lab error', e); }
    try { setupBS(); } catch(e) { console.warn('BS lab error', e); }
  });
})();
