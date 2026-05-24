/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-23.js
   Extracted from app.js lines 7287-7365
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var LS = 'upg_progress_prog';

  function load(){ try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch(e){ return {}; } }
  function save(o){ try { localStorage.setItem(LS, JSON.stringify(o)); } catch(e){} }

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function setupTabs(root){
    var tabs   = root.querySelectorAll('[data-rm-tab]');
    var panels = root.querySelectorAll('[data-rm-panel]');
    if (!tabs.length) return;
    tabs.forEach(function(t){
      t.addEventListener('click', function(){
        var key = t.getAttribute('data-rm-tab');
        tabs.forEach(function(x){
          var on = x === t;
          x.classList.toggle('is-active', on);
          x.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        panels.forEach(function(p){
          p.classList.toggle('is-active', p.getAttribute('data-rm-panel') === key);
        });
      });
    });
  }

  function setupChecklists(root){
    var checks = root.querySelectorAll('input[type="checkbox"][data-rm-chk]');
    var fePct  = root.querySelector('[data-rm-pct="fe"]');
    var bePct  = root.querySelector('[data-rm-pct="be"]');
    if (!checks.length) return;

    var state = load();
    state.roadmap = state.roadmap || {};

    function refresh(){
      var fe = { done:0, total:0 }, be = { done:0, total:0 };
      checks.forEach(function(c){
        var key  = c.getAttribute('data-rm-chk'); // e.g. "fe:1:1"
        var head = key.split(':')[0];
        if (head !== 'fe' && head !== 'be') return;
        var bucket = (head === 'fe') ? fe : be;
        bucket.total++;
        if (state.roadmap[key]) {
          c.checked = true;
          bucket.done++;
        } else {
          c.checked = false;
        }
      });
      if (fePct) fePct.textContent = fe.total ? Math.round(fe.done/fe.total*100) + '%' : '0%';
      if (bePct) bePct.textContent = be.total ? Math.round(be.done/be.total*100) + '%' : '0%';
    }

    checks.forEach(function(c){
      c.addEventListener('change', function(){
        var key = c.getAttribute('data-rm-chk');
        if (c.checked) state.roadmap[key] = true;
        else delete state.roadmap[key];
        save(state);
        refresh();
      });
    });

    refresh();
  }

  ready(function(){
    var root = document.getElementById('page-programming');
    if (!root) return;
    try { setupTabs(root); } catch(e){ console.warn('W05 tabs', e); }
    try { setupChecklists(root); } catch(e){ console.warn('W05 chk', e); }
  });
})();
