/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-11.js
   Extracted from app.js lines 4642-4701
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function qlSalesFrameworks(){
  'use strict';
  if (window.__sfBound) return;
  window.__sfBound = true;

  var lastTrigger = null;

  function getModal(key){
    return document.querySelector('[data-sf-modal="' + key + '"]');
  }

  function openModal(key){
    var modal = getModal(key);
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('sf-modal-open');
    var btn = modal.querySelector('.sf-modal-close');
    if (btn) { try { btn.focus({ preventScroll: true }); } catch(_){} }
  }

  function closeModal(modal){
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    if (!document.querySelector('.sf-modal:not([hidden])')) {
      document.body.classList.remove('sf-modal-open');
    }
    if (lastTrigger) {
      try { lastTrigger.focus({ preventScroll: true }); } catch(_){}
      lastTrigger = null;
    }
  }

  function closeAll(){
    document.querySelectorAll('.sf-modal:not([hidden])').forEach(closeModal);
  }

  document.addEventListener('click', function(e){
    var row = e.target.closest && e.target.closest('[data-sf-row]');
    if (row) {
      lastTrigger = row;
      openModal(row.getAttribute('data-sf-row'));
      return;
    }
    if (e.target.closest && e.target.closest('[data-sf-close]')) {
      var modal = e.target.closest('.sf-modal');
      closeModal(modal);
    }
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' || e.keyCode === 27) { closeAll(); return; }
    var row = e.target && e.target.matches && e.target.matches('[data-sf-row]') ? e.target : null;
    if (!row) return;
    if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      lastTrigger = row;
      openModal(row.getAttribute('data-sf-row'));
    }
  });
})();
