/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-07.js
   Extracted from app.js lines 4420-4498
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function qlLivingNumerals(){
  'use strict';
  if (!('IntersectionObserver' in window)) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

  function animate(el){
    var to       = parseFloat(el.dataset.countTo);
    var from     = parseFloat(el.dataset.countFrom || '0');
    var duration = parseInt(el.dataset.countDuration || '1400', 10);
    var decimals = parseInt(el.dataset.countDecimals || '0', 10);
    var prefix   = el.dataset.countPrefix || '';
    var suffix   = el.dataset.countSuffix || '';
    if (isNaN(to)) return;
    if (reduce) {
      el.textContent = prefix + to.toFixed(decimals) + suffix;
      return;
    }
    var start = null;
    function step(ts){
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var v = from + (to - from) * easeOutCubic(p);
      el.textContent = prefix + v.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function observe(){
    var nodes = document.querySelectorAll('[data-count-to]');
    if (!nodes.length) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) {
          animate(en.target);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });
    nodes.forEach(function(n){ io.observe(n); });
  }

  // Auto-tag visible numeric stats so existing markup gets the effect for free.
  function autoTag(){
    var candidates = document.querySelectorAll(
      '.call-card .num, .stat-value, .stat-card .num, [data-stat-num]'
    );
    candidates.forEach(function(el){
      if (el.dataset.countTo) return;
      var raw = (el.textContent || '').trim();
      // accept "1,234", "98", "12.5", "5K" → strip non-digits/dot for parse
      var clean = raw.replace(/[^\d.\-]/g, '');
      if (!clean) return;
      var n = parseFloat(clean);
      if (isNaN(n) || n === 0) return;
      // Preserve any non-digit suffix (K, %, +) by detecting trailing chars
      var m = raw.match(/[^\d,\.\s\-]+$/);
      if (m) el.dataset.countSuffix = m[0];
      // Decimals
      if (clean.indexOf('.') > -1) {
        el.dataset.countDecimals = String(clean.split('.')[1].length);
      }
      el.dataset.countTo = String(n);
    });
  }

  function boot(){
    autoTag();
    observe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    setTimeout(boot, 50);
  }
})();
