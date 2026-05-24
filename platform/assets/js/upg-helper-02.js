/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-02.js
   Extracted from app.js lines 2742-2750
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function() {
  var ov = document.getElementById('loading-overlay');
  if (!ov) return;
  setTimeout(function() {
    ov.style.opacity = '0';
    ov.style.pointerEvents = 'none';
    setTimeout(function() { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 650);
  }, 2000);
})();
