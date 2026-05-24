/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-13.js
   Extracted from app.js lines 4944-5007
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function qlSalesProgress(){
  'use strict';
  if (window.__qlSalesProgress) return;
  window.__qlSalesProgress = true;
  if (!('IntersectionObserver' in window)) return;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      setTimeout(fn, 0);
    }
  }

  ready(function(){
    var page = document.getElementById('page-fieldsales');
    if (!page) return;

    var pill   = page.querySelector('[data-sp-pill]');
    var fill   = page.querySelector('[data-sp-fill]');
    var pct    = page.querySelector('[data-sp-pct]');
    var dn     = page.querySelector('[data-sp-blocks]');
    var dt     = page.querySelector('[data-sp-total]');
    if (!pill || !fill || !pct || !dn || !dt) return;

    var blocks = page.querySelectorAll('.sales-section-header');
    var total  = blocks.length;
    if (!total) return;
    var seen = new Set();

    // Hydrate from storage (best ever)
    var stored = 0;
    try {
      var raw = localStorage.getItem('upg_progress_sales');
      stored = raw ? Math.max(0, Math.min(100, parseFloat(raw) || 0)) : 0;
    } catch(_){}

    function paint(){
      var current = Math.round((seen.size / total) * 100);
      var best    = Math.max(current, stored);
      fill.style.inlineSize = best + '%';
      fill.style.width      = best + '%';
      pct.textContent       = best;
      dn.textContent        = seen.size;
      dt.textContent        = total;
      if (current > stored) {
        stored = current;
        try { localStorage.setItem('upg_progress_sales', String(current)); } catch(_){}
      }
    }
    paint();

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
          seen.add(entry.target);
        }
      });
      paint();
    }, { threshold: [0, 0.4, 0.75], rootMargin: '0px 0px -20% 0px' });

    blocks.forEach(function(b){ io.observe(b); });
  });
})();
