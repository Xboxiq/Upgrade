/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-48.js
   Extracted from app.js lines 17926-18124
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.ritual) return;
  if (window.Upg.ritual._inkpotInstalled) return;

  var VARIANTS = ['ink-spread', 'kashida-pull', 'kalam-stroke', 'auto'];
  var ACTIVE_DURATION = 500; // ms — slightly > CSS 420ms to let final frame paint

  var PERSONALITY_INK_VARIANTS = {
    'dashboard':    'ink-spread',
    'callcenter':   'kalam-stroke',
    'fieldsales':   'ink-spread',
    'accountmgr':   'kashida-pull',
    'social':       'ink-spread',
    'lab':          'kalam-stroke',
    'psych':        'kashida-pull',
    'eq':           'kashida-pull',
    'negotiation':  'kalam-stroke',
    'customercare': 'ink-spread',
    'programming':  'kalam-stroke',
    'accounting':   'kashida-pull',
    'phonerepair':  'ink-spread',
    'hrmastery':    'kashida-pull',
    'myprogress':   'ink-spread',
    'curriculum':   'ink-spread'
  };

  function getCurrentPersonality() {
    // Prefer the visible page section
    var pages = document.querySelectorAll('section.page[data-page-personality]');
    for (var i = 0; i < pages.length; i++) {
      var p = pages[i];
      if (p.hidden) continue;
      var style = window.getComputedStyle(p);
      if (style.display !== 'none' && style.visibility !== 'hidden') {
        var v = p.getAttribute('data-page-personality');
        if (v) return v;
      }
    }
    // Fallback to body data-page-personality (W12 P5 cascade) or hash
    var bodyP = document.body.getAttribute('data-page-personality');
    if (bodyP) return bodyP;
    var hash = (location.hash || '').replace(/^#/, '').replace(/^page-/, '');
    return hash || null;
  }

  function resolveVariant(rawVariant) {
    if (rawVariant && rawVariant !== 'auto' && VARIANTS.indexOf(rawVariant) !== -1) {
      return rawVariant;
    }
    var personality = getCurrentPersonality();
    return PERSONALITY_INK_VARIANTS[personality] || 'ink-spread';
  }

  function trigger(el, e) {
    if (!el || el.classList.contains('rit-ink-bare')) return;

    var raw = el.getAttribute('data-rit-ink') || 'auto';
    var resolved = resolveVariant(raw);

    // Set click coords as CSS custom props (percent of host rect)
    var rect = el.getBoundingClientRect();
    if (e && typeof e.clientX === 'number' && rect.width > 0 && rect.height > 0) {
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--rit-ink-x', x + '%');
      el.style.setProperty('--rit-ink-y', y + '%');
    } else {
      el.style.setProperty('--rit-ink-x', '50%');
      el.style.setProperty('--rit-ink-y', '50%');
    }

    // Compute spread size (covers element fully + a margin)
    var maxDim = Math.max(rect.width, rect.height);
    var spreadPx = Math.max(maxDim * 2.2, 80);
    el.style.setProperty('--rit-ink-size', spreadPx + 'px');

    // Reflect resolved variant back so CSS targets the right ::before/::after
    if (raw === 'auto') {
      // Keep "auto" attribute so per-personality cascade keeps applying;
      // CSS rules above key on [data-rit-ink="auto"] + [data-page-personality]
    } else if (raw !== resolved) {
      el.setAttribute('data-rit-ink', resolved);
    }

    // Trigger animation: reset → reflow → activate
    el.removeAttribute('data-rit-ink-active');
    void el.offsetWidth;
    el.setAttribute('data-rit-ink-active', 'true');

    // Cleanup activation flag after duration
    window.clearTimeout(el._ritInkTimer);
    el._ritInkTimer = window.setTimeout(function () {
      el.removeAttribute('data-rit-ink-active');
    }, ACTIVE_DURATION);
  }

  var INTERACTIVE_SELECTORS = [
    'button:not(.rit-ink-bare)',
    'a[role="button"]:not(.rit-ink-bare)',
    '.bento-card:not(.rit-ink-bare)',
    '.qcalc-button:not(.rit-ink-bare)',
    '.cath-card:not(.rit-ink-bare)',
    '[data-cmd]:not(.rit-ink-bare)'
  ];

  function attachToInteractive(root) {
    var scope = root || document;
    var sel = INTERACTIVE_SELECTORS.join(',');
    var nodes;
    try {
      nodes = scope.querySelectorAll(sel);
    } catch (err) {
      return 0;
    }
    var count = 0;
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.classList && el.classList.contains('rit-ink-bare')) continue;
      if (!el.hasAttribute('data-rit-ink')) {
        el.setAttribute('data-rit-ink', 'auto');
        count++;
      }
    }
    return count;
  }

  // Single delegated click listener for all current + future hosts
  document.addEventListener('click', function (e) {
    var target = e.target && e.target.closest ? e.target.closest('[data-rit-ink]') : null;
    if (!target) return;
    if (target.classList.contains('rit-ink-bare')) return;
    trigger(target, e);
  }, { passive: true, capture: false });

  // Initial sweep
  function init() {
    attachToInteractive();
  }
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init, { once: true });

  // Re-sweep after page nav (W11/W14 fire upg:nav:change)
  document.addEventListener('upg:nav:change', function () {
    window.setTimeout(attachToInteractive, 30);
  });

  // Re-sweep when new interactive elements are injected
  var observer;
  try {
    observer = new MutationObserver(function (mutations) {
      var dirty = false;
      for (var i = 0; i < mutations.length && !dirty; i++) {
        if (mutations[i].addedNodes && mutations[i].addedNodes.length) dirty = true;
      }
      if (dirty) attachToInteractive();
    });
    if (document.body) {
      observer.observe(document.body, { subtree: true, childList: true });
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        observer.observe(document.body, { subtree: true, childList: true });
      }, { once: true });
    }
  } catch (err) { /* MutationObserver unavailable — fine */ }

  // Public API: extend Upg.ritual with inkpot namespace
  window.Upg.ritual.inkpot = Object.freeze({
    trigger: function (elOrSelector, evt) {
      var el = typeof elOrSelector === 'string'
        ? document.querySelector(elOrSelector)
        : elOrSelector;
      trigger(el, evt);
    },
    attach: function (root) { return attachToInteractive(root); },
    listVariants: function () { return VARIANTS.slice(); },
    personalityMap: function () {
      var copy = {};
      for (var k in PERSONALITY_INK_VARIANTS) {
        if (Object.prototype.hasOwnProperty.call(PERSONALITY_INK_VARIANTS, k)) {
          copy[k] = PERSONALITY_INK_VARIANTS[k];
        }
      }
      return copy;
    },
    setPersonalityVariant: function (personality, variant) {
      if (!personality || typeof personality !== 'string') return false;
      if (VARIANTS.indexOf(variant) === -1 || variant === 'auto') return false;
      PERSONALITY_INK_VARIANTS[personality] = variant;
      return true;
    },
    resolveFor: function (personality) {
      return PERSONALITY_INK_VARIANTS[personality] || 'ink-spread';
    }
  });

  window.Upg.ritual._inkpotInstalled = true;

})(window, document);
