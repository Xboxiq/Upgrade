/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-greet-1.js
   Extracted from app.js lines 14067-14115
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const getName = () => {
    try {
      const p = window.Upg && window.Upg.state && typeof window.Upg.state.profile === 'function'
        ? window.Upg.state.profile() : null;
      return (p && (p.name || p.displayName)) || 'صديقي';
    } catch (_) { return 'صديقي'; }
  };

  const prefixForHour = (h) => {
    if (h >= 4  && h < 12) return 'صباح الخير';
    if (h >= 12 && h < 17) return 'يوم سعيد';
    if (h >= 17 && h < 21) return 'مساء النور';
    return 'مساء الخير';
  };

  const refresh = () => {
    // primary: any [data-greet-title]
    const target = document.querySelector('[data-greet-title]');
    if (target) {
      const name = getName();
      target.textContent = `${prefixForHour(new Date().getHours())}، ${name} 👋`;
    }
    // also augment cath-dash greeting "أهلاً <name> 👋" with time-aware prefix
    const cathH2 = document.querySelector('.cath-dash-greeting-text h2');
    if (cathH2 && !cathH2.dataset.auroraGreet) {
      cathH2.dataset.auroraGreet = '1';
      const nameEl = cathH2.querySelector('[data-cath-bind="profile.name"]');
      const before = cathH2.firstChild; // text node "أهلاً "
      if (before && before.nodeType === 3) {
        before.nodeValue = `${prefixForHour(new Date().getHours())} `;
      }
    }
  };

  const init = () => {
    refresh();
    // Refresh every 30 minutes to catch crossings (e.g., 11:55 → 12:05)
    setInterval(refresh, 30 * 60 * 1000);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.Upg = window.Upg || {};
  window.Upg.greet = Object.freeze({ refresh });
})();
