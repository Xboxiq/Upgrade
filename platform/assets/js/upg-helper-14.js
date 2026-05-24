/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-14.js
   Extracted from app.js lines 5014-5040
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function qlArchToggle(){
  'use strict';
  if (window.__qlArchToggle) return;
  window.__qlArchToggle = true;

  function ready(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      setTimeout(fn, 0);
    }
  }

  ready(function(){
    var page = document.getElementById('page-callcenter');
    if (!page) return;
    var heads = page.querySelectorAll('[data-arch-toggle]');
    heads.forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        var card = btn.closest('.arch-card');
        if (!card) return;
        card.classList.toggle('open');
      });
    });
  });
})();
