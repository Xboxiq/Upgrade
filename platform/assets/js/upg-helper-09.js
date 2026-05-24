/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-09.js
   Extracted from app.js lines 4537-4544
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function qlVisibilityPause(){
  'use strict';
  function update(){
    document.body.classList.toggle('is-hidden', document.hidden === true);
  }
  document.addEventListener('visibilitychange', update);
  update();
})();
