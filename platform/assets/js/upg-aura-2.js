/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-aura-2.js
   Extracted from app.js lines 18329-18484
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  if (!window.Upg) return;
  if (window.Upg.ritual && window.Upg.ritual._auraDeepInstalled) return;

  /* 16 personality → rhythm mappings (10 gentle / 3 pulse / 3 sweep) */
  const PERSONALITY_RHYTHM = Object.freeze({
    'dashboard':    'gentle',
    'callcenter':   'pulse',
    'fieldsales':   'pulse',
    'accountmgr':   'gentle',
    'social':       'sweep',
    'lab':          'sweep',
    'psych':        'gentle',
    'eq':           'gentle',
    'negotiation':  'pulse',
    'customercare': 'gentle',
    'programming':  'sweep',
    'accounting':   'gentle',
    'phonerepair':  'gentle',
    'hrmastery':    'gentle',
    'myprogress':   'gentle',
    'curriculum':   'gentle'
  });

  const RHYTHM_VARIANTS = Object.freeze(['gentle', 'pulse', 'sweep']);

  /* ─── Active-page resolver ────────────────────────────────────── */
  const getActivePage = () => {
    return document.querySelector('section.page.is-active') ||
           document.querySelector('section.page:not([hidden])') ||
           document.querySelector('section.page');
  };

  /* ─── Deepen: marks current page (or given) with aura + rhythm ── */
  const deepen = (pageEl) => {
    const target = pageEl || getActivePage();
    if (!target) return false;

    target.setAttribute('data-rit-aura', 'deep');

    const personality = target.getAttribute('data-page-personality') || '';
    const rhythm = PERSONALITY_RHYTHM[personality] || 'gentle';
    target.setAttribute('data-rit-aura-rhythm', rhythm);

    return { personality: personality, rhythm: rhythm };
  };

  /* ─── Undeepen: opt-out for the active or given page ──────────── */
  const undeepen = (pageEl) => {
    const target = pageEl || getActivePage();
    if (!target) return false;
    target.removeAttribute('data-rit-aura');
    target.removeAttribute('data-rit-aura-rhythm');
    return true;
  };

  /* ─── auraTie: snapshot of active aura ↔ atmosphere ↔ tint ────── */
  const auraTie = () => {
    const activePage = getActivePage();
    if (!activePage) return null;

    const personality = activePage.getAttribute('data-page-personality') || '';
    const atmosphere = document.body.getAttribute('data-rit-time') || null;
    let tint = '';
    try {
      tint = getComputedStyle(activePage).getPropertyValue('--color-tint').trim();
    } catch (_) { tint = ''; }

    return {
      personality: personality,
      atmosphere: atmosphere,
      tint: tint,
      rhythm: PERSONALITY_RHYTHM[personality] || 'gentle',
      auraDeep: activePage.getAttribute('data-rit-aura') === 'deep'
    };
  };

  /* ─── Auto-deepen handler (debounced via setTimeout 50ms) ─────── */
  let _navTimer = null;
  const autoDeepenOnNav = () => {
    if (_navTimer) clearTimeout(_navTimer);
    _navTimer = setTimeout(() => {
      _navTimer = null;
      // Clean stale aura from previously-active pages
      document.querySelectorAll('section.page[data-rit-aura="deep"]').forEach(p => {
        if (!p.classList.contains('is-active') && !p.matches('section.page:not([hidden])')) {
          p.removeAttribute('data-rit-aura');
          p.removeAttribute('data-rit-aura-rhythm');
        }
      });
      deepen();
    }, 50);
  };

  document.addEventListener('upg:nav:change', autoDeepenOnNav);
  window.addEventListener('hashchange', autoDeepenOnNav);

  /* ─── Initial deepen on load ─────────────────────────────────── */
  if (document.readyState !== 'loading') {
    deepen();
  } else {
    document.addEventListener('DOMContentLoaded', deepen);
  }

  /* ─── EXTEND Upg.aura — rebuild frozen surface preserving W16 verbatim ── */
  if (window.Upg.aura) {
    const _origAura = window.Upg.aura;
    window.Upg.aura = Object.freeze({
      apply: _origAura.apply,
      clear: _origAura.clear,
      current: _origAura.current,
      list: _origAura.list,
      preview: _origAura.preview,
      deepen: deepen,
      undeepen: undeepen,
      deepRhythmFor: function (personality) {
        return PERSONALITY_RHYTHM[personality] || 'gentle';
      }
    });
  }

  /* ─── EXTEND Upg.ritual (plain object, direct extension) ──────── */
  if (!window.Upg.ritual) window.Upg.ritual = {};
  window.Upg.ritual.auraTie = auraTie;
  window.Upg.ritual.deepenAura = deepen;
  window.Upg.ritual.undeepenAura = undeepen;
  window.Upg.ritual.rhythmMap = function () {
    /* Return a fresh shallow copy so callers can't mutate the source */
    const out = {};
    Object.keys(PERSONALITY_RHYTHM).forEach(k => { out[k] = PERSONALITY_RHYTHM[k]; });
    return out;
  };
  window.Upg.ritual.rhythmVariants = function () {
    return RHYTHM_VARIANTS.slice();
  };

  window.Upg.ritual._auraDeepInstalled = true;

  /* ─── Final ritual setup banner — fires once after DOM ready ──── */
  const ritualBanner = function () {
    try {
      console.info(
        '%c🌟 RITUAL UI v3 — entry + halo + 5 thresholds + 3 inkpots + 5 atmospheres + 3 aura rhythms — all phases bound',
        'color:#9D7BFF; font-weight:bold;'
      );
    } catch (_) { /* no-op */ }
  };
  if (document.readyState !== 'loading') {
    ritualBanner();
  } else {
    document.addEventListener('DOMContentLoaded', ritualBanner);
  }

})(window, document);
