/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-31.js
   Extracted from app.js lines 9086-9119
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  function $id(id){ return document.getElementById(id); }

  function bindTreeTabs(){
    var tabs = document.querySelectorAll('#page-phonerepair .pr-tree-tab');
    tabs.forEach(function(tab){
      if (tab.__pr_bound) return; tab.__pr_bound = true;
      tab.addEventListener('click', function(){
        var which = tab.getAttribute('data-pr-tree');
        tabs.forEach(function(t){ t.classList.toggle('is-active', t === tab); });
        ['noboot','nocharge','water'].forEach(function(k){
          var el = $id('pr-tree-' + k);
          if (el) el.hidden = (k !== which);
        });
      });
    });
  }

  function init(){
    if (!document.getElementById('page-phonerepair')) return;
    bindTreeTabs();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-page="phonerepair"]');
    if (t) setTimeout(init, 80);
  });
})();
