/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-05.js
   Extracted from app.js lines 4321-4377
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function qlCursorAura(){
  'use strict';
  // Bail on touch / coarse pointer
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
  // Respect reduced motion: still show aura but skip rAF easing — snap instead
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init(){
    if (document.getElementById('cursor-aura')) return;
    var aura = document.createElement('div');
    aura.id = 'cursor-aura';
    aura.setAttribute('aria-hidden', 'true');
    document.body.appendChild(aura);

    var tx = window.innerWidth / 2;
    var ty = window.innerHeight / 2;
    var x = tx, y = ty;
    var seen = false;

    function onMove(e){
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        aura.classList.add('is-active');
      }
    }
    function onLeave(){ aura.classList.remove('is-active'); seen = false; }
    function onEnter(){ aura.classList.add('is-active'); seen = true; }

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    if (reduce) {
      document.addEventListener('mousemove', function(e){
        aura.style.transform = 'translate3d(' + e.clientX + 'px,' + e.clientY + 'px,0)';
      }, { passive: true });
      return;
    }

    function loop(){
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      aura.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
