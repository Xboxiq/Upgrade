/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-06.js
   Extracted from app.js lines 4382-4417
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function qlSectionalIdentity(){
  'use strict';
  function setActive(pageId){
    if (!pageId) return;
    document.body.dataset.activeSection = pageId;
  }
  // Wrap navigateTo if it exists; else listen for nav clicks as a safety net.
  function wrapNavigate(){
    if (typeof window.navigateTo === 'function') {
      var orig = window.navigateTo;
      window.navigateTo = function(pageId){
        var r = orig.apply(this, arguments);
        try { setActive(pageId); } catch(_){}
        return r;
      };
    }
    // Safety net: also catch direct nav-item clicks (matches existing pattern)
    document.addEventListener('click', function(e){
      var item = e.target.closest && e.target.closest('.nav-item[data-page]');
      if (item) setActive(item.dataset.page);
    }, true);
    // Initial tint for whichever page is active on load
    var activePage = document.querySelector('.page.active');
    if (activePage && activePage.id && activePage.id.indexOf('page-') === 0) {
      setActive(activePage.id.replace('page-', ''));
    } else {
      setActive('dashboard');
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrapNavigate);
  } else {
    // Defer one tick so we wrap AFTER block #3 IIFE registered window.navigateTo
    setTimeout(wrapNavigate, 0);
  }
})();
