/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-29.js
   Extracted from app.js lines 8901-8935
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  function $$(sel, root){ return (root||document).querySelectorAll(sel); }

  function bindElecToggles(){
    var btns = $$('#page-phonerepair .pr-card-toggle[data-pr-toggle]');
    btns.forEach(function(btn){
      if (btn.__pr_bound) return; btn.__pr_bound = true;
      btn.addEventListener('click', function(){
        var key = btn.getAttribute('data-pr-toggle');
        var body = document.getElementById('pr-body-' + key);
        if (!body) return;
        var isOpen = !body.hidden;
        body.hidden = isOpen;
        btn.classList.toggle('is-open', !isOpen);
        btn.textContent = isOpen ? 'عرض التفاصيل ▾' : 'إخفاء التفاصيل ▴';
      });
    });
  }

  function init(){
    if (!document.getElementById('page-phonerepair')) return;
    bindElecToggles();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="phonerepair"]');
    if (t) setTimeout(init, 60);
  });
})();
