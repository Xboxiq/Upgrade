/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-20.js
   Extracted from app.js lines 6593-6763
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  if (window.__UPG_ACC_PHASE3__) return;
  window.__UPG_ACC_PHASE3__ = true;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else { fn(); }
  }

  /**
   * Iraqi Income Tax (Monthly, marginal brackets):
   *   ≤ 250,000          → 0%
   *   250,001 – 500,000  → 3% on excess
   *   500,001 – 1,000,000 → 5% on excess
   *   > 1,000,000        → 15% on excess
   *
   * Personal allowance (annual ÷ 12 monthly):
   *   single: 2,500,000/yr → ~208,333/mo
   *   married: 4,500,000/yr → 375,000/mo
   *   per child ≤18: 200,000/yr → 16,666/mo
   *
   * Social security (private sector):
   *   Employee 5%, Employer 12%
   */
  function calcTax(taxableMonthly){
    var brackets = [
      { from: 0,        to: 250000,    rate: 0.00 },
      { from: 250000,   to: 500000,    rate: 0.03 },
      { from: 500000,   to: 1000000,   rate: 0.05 },
      { from: 1000000,  to: Infinity,  rate: 0.15 }
    ];
    var tax = 0, breakdown = [];
    for (var i = 0; i < brackets.length; i++){
      var b = brackets[i];
      if (taxableMonthly <= b.from) break;
      var slice = Math.min(taxableMonthly, b.to) - b.from;
      var amt = slice * b.rate;
      tax += amt;
      if (slice > 0) {
        breakdown.push({
          range: b.from.toLocaleString('en-US') + ' – ' + (b.to === Infinity ? '∞' : b.to.toLocaleString('en-US')),
          rate: (b.rate * 100).toFixed(0) + '%',
          slice: Math.round(slice),
          tax: Math.round(amt)
        });
      }
    }
    return { tax: Math.round(tax), breakdown: breakdown };
  }

  function setupTaxCalc(){
    var lab = document.querySelector('[data-acc-lab="tax-calc"]');
    if (!lab) return;
    var grossIn  = lab.querySelector('[data-acc-tax="gross"]');
    var statusIn = lab.querySelector('[data-acc-tax="status"]');
    var kidsIn   = lab.querySelector('[data-acc-tax="children"]');
    var allowIn  = lab.querySelector('[data-acc-tax="allowances"]');
    var otherIn  = lab.querySelector('[data-acc-tax="otherded"]');
    var calcBtn  = lab.querySelector('[data-acc-tax-calc]');
    var printBtn = lab.querySelector('[data-acc-tax-print]');

    var rows = {};
    lab.querySelectorAll('[data-acc-tax-row]').forEach(function(el){
      rows[el.dataset.accTaxRow] = el;
    });
    var emp = {};
    lab.querySelectorAll('[data-acc-tax-emp-row]').forEach(function(el){
      emp[el.dataset.accTaxEmpRow] = el;
    });
    var metaMonth = lab.querySelector('[data-acc-tax-meta-month]');
    var metaStatus = lab.querySelector('[data-acc-tax-meta-status]');
    var bdWrap = lab.querySelector('[data-acc-tax-breakdown] ul');

    function fmt(n){ return Math.round(n).toLocaleString('en-US') + ' د.ع'; }

    function compute(){
      var gross = Math.max(0, Number(grossIn.value) || 0);
      var allow = Math.max(0, Number(allowIn.value) || 0);
      var other = Math.max(0, Number(otherIn.value) || 0);
      var status = statusIn.value;
      var kids = Math.max(0, Math.min(10, Number(kidsIn.value) || 0));

      var totalIncome = gross + allow;
      // Personal allowance per month (annual / 12)
      var baseAllow = (status === 'married' ? 4500000 : 2500000) / 12;
      var kidAllow  = (kids * 200000) / 12;
      var monthlyAllow = baseAllow + kidAllow;

      var taxable = Math.max(0, totalIncome - monthlyAllow);
      var taxRes = calcTax(taxable);
      var tax = taxRes.tax;
      var social = totalIncome * 0.05;
      var totalDed = tax + social + other;
      var net = totalIncome - totalDed;
      var empSocial = totalIncome * 0.12;
      var empCost = totalIncome + empSocial;

      rows.gross.textContent = fmt(gross);
      rows.allowances.textContent = fmt(allow);
      rows.total.textContent = fmt(totalIncome);
      rows.tax.textContent = '− ' + fmt(tax);
      rows.social.textContent = '− ' + fmt(social);
      rows.otherded.textContent = '− ' + fmt(other);
      rows.totalded.textContent = '− ' + fmt(totalDed);
      rows.net.textContent = fmt(net);

      emp.total.textContent = fmt(totalIncome);
      emp.empsocial.textContent = '+ ' + fmt(empSocial);
      emp.empcost.textContent = fmt(empCost);

      var statusText = (status === 'married' ? 'متزوج' : 'أعزب') + ' · ' + kids + ' أطفال';
      metaStatus.textContent = statusText;
      var d = new Date();
      var months = ['كانون الثاني','شباط','آذار','نيسان','أيار','حزيران','تموز','آب','أيلول','تشرين الأول','تشرين الثاني','كانون الأول'];
      metaMonth.textContent = 'شهر ' + months[d.getMonth()] + ' ' + d.getFullYear();

      bdWrap.innerHTML = '';
      bdWrap.innerHTML +=
        '<li><b>الدخل الإجمالي:</b> ' + fmt(totalIncome) + '</li>' +
        '<li><b>إعفاء شخصي شهري:</b> − ' + fmt(monthlyAllow) +
          ' <i style="color:var(--text-muted)">(أساسي ' + fmt(baseAllow) +
          (kids ? ' + أولاد ' + fmt(kidAllow) : '') + ')</i></li>' +
        '<li><b>الدخل الخاضع للضريبة:</b> ' + fmt(taxable) + '</li>';
      taxRes.breakdown.forEach(function(b){
        bdWrap.innerHTML +=
          '<li>شريحة ' + b.range + ' × ' + b.rate +
          ' على <b>' + fmt(b.slice) + '</b> = <b style="color:#F87171">' + fmt(b.tax) + '</b></li>';
      });
      bdWrap.innerHTML += '<li><b>إجمالي الضريبة الشهرية:</b> ' + fmt(tax) + '</li>';

      try {
        localStorage.setItem('upg_tax_drafts', JSON.stringify({
          gross: gross, status: status, children: kids, allow: allow, other: other, ts: Date.now()
        }));
      } catch(_){}
    }

    [grossIn, statusIn, kidsIn, allowIn, otherIn].forEach(function(el){
      el.addEventListener('input', compute);
      el.addEventListener('change', compute);
    });
    calcBtn.addEventListener('click', compute);
    printBtn.addEventListener('click', function(){
      compute();
      window.print();
    });

    // Restore last draft
    try {
      var raw = localStorage.getItem('upg_tax_drafts');
      if (raw) {
        var d = JSON.parse(raw);
        if (d && typeof d === 'object') {
          if (typeof d.gross === 'number') grossIn.value = d.gross;
          if (d.status) statusIn.value = d.status;
          if (typeof d.children === 'number') kidsIn.value = d.children;
          if (typeof d.allow === 'number') allowIn.value = d.allow;
          if (typeof d.other === 'number') otherIn.value = d.other;
        }
      }
    } catch(_){}

    compute();
  }

  ready(function(){
    try { setupTaxCalc(); } catch(e) { console.warn('tax calc lab error', e); }
  });
})();
