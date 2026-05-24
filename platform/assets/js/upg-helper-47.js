/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-47.js
   Extracted from app.js lines 17747-17910
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.transition || !window.Upg.ritual) return;
  if (window.Upg.ritual._threshInstalled) return;

  var VARIANTS = ['fade', 'mashrabiya', 'scroll', 'iris', 'mihrab-arch'];

  /* Per-personality routing — 16 mappings.
     Phase 6 (Aura Deepening) consumes this map for personality choreography. */
  var PERSONALITY_TRANSITIONS = {
    'dashboard':    'mashrabiya',
    'callcenter':   'iris',
    'fieldsales':   'fade',
    'accountmgr':   'mihrab-arch',
    'social':       'mashrabiya',
    'lab':          'iris',
    'psych':        'scroll',
    'eq':           'scroll',
    'negotiation':  'mihrab-arch',
    'customercare': 'mashrabiya',
    'programming':  'iris',
    'accounting':   'mihrab-arch',
    'phonerepair':  'fade',
    'hrmastery':    'scroll',
    'myprogress':   'fade',
    'curriculum':   'mashrabiya'
  };

  var prefersReducedMotion = function () {
    try {
      return window.matchMedia &&
             window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) { return false; }
  };

  /* Resolve incoming page-id (with or without 'page-' prefix) → variant */
  var getTransitionForPage = function (pageId) {
    if (!pageId) return 'fade';
    var stripped = String(pageId).replace(/^page-/, '');
    return PERSONALITY_TRANSITIONS[stripped] || 'fade';
  };

  /* Body attribute drives the View Transitions CSS pseudo-elements */
  var setActiveTransition = function (variant) {
    if (VARIANTS.indexOf(variant) === -1) variant = 'fade';
    document.body.setAttribute('data-rit-thresh', variant);
  };

  /* Apply CSS class-based animation as fallback (Safari/Firefox path) */
  var applyClassFallback = function (variant, oldEl, newEl) {
    var outClass = 'rit-thresh-' + variant + '-out';
    var inClass  = 'rit-thresh-' + variant + '-in';

    if (oldEl && oldEl.classList) oldEl.classList.add(outClass);
    if (newEl && newEl.classList) newEl.classList.add(inClass);

    /* Cleanup after duration + small buffer (~700ms total) */
    window.setTimeout(function () {
      if (oldEl && oldEl.classList) oldEl.classList.remove(outClass);
      if (newEl && newEl.classList) newEl.classList.remove(inClass);
    }, 700);
  };

  /* ─── EXTEND Upg.transition.run (preserve original behavior) ─── */
  var originalRun = window.Upg.transition.run;
  if (typeof originalRun === 'function') {
    window.Upg.transition.run = function (name, opts) {
      opts = opts || {};

      /* Determine variant: explicit ritual > derived from toPageId > fade */
      var variant = opts.ritual ||
                    (opts.toPageId ? getTransitionForPage(opts.toPageId) : null) ||
                    'fade';

      /* reduced-motion → instant fade, no engine */
      if (prefersReducedMotion()) {
        setActiveTransition('fade');
        return originalRun.call(this, name, opts);
      }

      setActiveTransition(variant);

      /* Native View Transitions path (chrome 111+) */
      if (variant !== 'fade' &&
          typeof document.startViewTransition === 'function') {
        try {
          return document.startViewTransition(function () {
            return originalRun.call(window.Upg.transition, name, opts);
          });
        } catch (e) {
          /* fall through to class-based fallback */
        }
      }

      /* CSS class-based fallback */
      var oldEl = document.querySelector('section.page.active') ||
                  document.querySelector('section.page:not([hidden])');
      var newEl = opts.toPageId ? document.getElementById(opts.toPageId) : null;
      if (variant !== 'fade' && (oldEl || newEl)) {
        applyClassFallback(variant, oldEl, newEl);
      }

      return originalRun.call(this, name, opts);
    };
  }

  /* ─── EXTEND Upg.ritual with transition helpers ─── */
  window.Upg.ritual.setTransition = function (variant, pagePersonality) {
    if (pagePersonality) {
      if (VARIANTS.indexOf(variant) !== -1) {
        PERSONALITY_TRANSITIONS[pagePersonality] = variant;
      }
    } else {
      setActiveTransition(variant);
    }
  };

  window.Upg.ritual.getTransition = function (pagePersonality) {
    if (!pagePersonality) {
      return document.body.getAttribute('data-rit-thresh') || 'fade';
    }
    return PERSONALITY_TRANSITIONS[pagePersonality] || 'fade';
  };

  window.Upg.ritual.listTransitions = function () {
    return VARIANTS.slice();
  };

  window.Upg.ritual.transitionMap = function () {
    var clone = {};
    for (var k in PERSONALITY_TRANSITIONS) {
      if (Object.prototype.hasOwnProperty.call(PERSONALITY_TRANSITIONS, k)) {
        clone[k] = PERSONALITY_TRANSITIONS[k];
      }
    }
    return clone;
  };

  /* Auto-sync body attribute to active page personality on nav events.
     Uses upg:nav:change CustomEvent if available (W12 Phase 4),
     otherwise listens for hashchange + initial load. */
  var syncFromActivePage = function () {
    var active = document.querySelector('section.page.active') ||
                 document.querySelector('section.page:not([hidden])');
    if (!active) return;
    var personality = active.getAttribute('data-page-personality') ||
                      (active.id || '').replace(/^page-/, '');
    var variant = PERSONALITY_TRANSITIONS[personality] || 'fade';
    setActiveTransition(variant);
  };

  /* Defer first sync until DOM ready (existing app already booted) */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncFromActivePage, { once: true });
  } else {
    syncFromActivePage();
  }

  window.addEventListener('upg:nav:change', syncFromActivePage);

  /* installation marker (idempotency guard) */
  window.Upg.ritual._threshInstalled = true;

})(window, document);
