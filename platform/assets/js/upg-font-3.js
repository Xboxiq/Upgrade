/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-font-3.js
   Extracted from app.js lines 16856-16958
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';
  if (!window.Upg || !window.Upg.font) return; // Phase 3 must be present

  // Known personalities (matches CSS signature blocks above)
  var KNOWN = [
    'dashboard', 'callcenter', 'fieldsales', 'accountmgr', 'social',
    'lab', 'psych', 'eq', 'negotiation', 'customercare',
    'programming', 'accounting', 'phonerepair', 'hrmastery',
    'myprogress', 'curriculum', 'default'
  ];

  function getActivePage() {
    // Prefer a non-hidden page; fallback to document.body
    var pages = document.querySelectorAll('section.page');
    for (var i = 0; i < pages.length; i++) {
      var p = pages[i];
      if (!p.hidden && p.offsetParent !== null) return p;
    }
    return pages[0] || document.body;
  }

  function getPageSignature() {
    var el = getActivePage();
    if (!el) return null;
    var personality = el.getAttribute('data-page-personality') || 'default';
    var cs = window.getComputedStyle(el);
    function read(prop) { return (cs.getPropertyValue(prop) || '').trim(); }
    return {
      pageId: el.id || null,
      personality: personality,
      sigActive: read('--sig-active').replace(/^["']|["']$/g, ''),
      voiceDisplay: read('--type-voice-display'),
      voiceBody: read('--type-voice-body'),
      voiceHero: read('--type-voice-hero'),
      voiceQuote: read('--type-voice-quote'),
      voiceNumeric: read('--type-voice-numeric'),
      trackingDisplay: read('--tracking-display'),
      trackingHero: read('--tracking-hero'),
      leadingRelaxed: read('--leading-relaxed')
    };
  }

  function listSignatures() {
    return KNOWN.slice(); // copy — caller cannot mutate
  }

  function auditSignatures() {
    var applied = [];
    var missing = [];
    var nodes = document.querySelectorAll('[data-page-personality]');
    for (var i = 0; i < nodes.length; i++) {
      var p = nodes[i].getAttribute('data-page-personality');
      if (KNOWN.indexOf(p) !== -1) applied.push(p);
      else missing.push(p);
    }
    function unique(arr) {
      var out = [], seen = {};
      for (var i = 0; i < arr.length; i++) {
        if (!seen[arr[i]]) { seen[arr[i]] = 1; out.push(arr[i]); }
      }
      return out;
    }
    var total = applied.length + missing.length;
    return {
      total: total,
      applied: unique(applied),
      missing: unique(missing),
      coverage: total ? ((applied.length / total) * 100).toFixed(1) + '%' : '0.0%'
    };
  }

  // Extend Upg.font (additive, freeze-replace pattern matching Phase 4)
  var prior = window.Upg.font;
  var extended = {};
  for (var k in prior) {
    if (Object.prototype.hasOwnProperty.call(prior, k)) extended[k] = prior[k];
  }
  extended.getPageSignature = getPageSignature;
  extended.listSignatures = listSignatures;
  extended.auditSignatures = auditSignatures;
  try { window.Upg.font = Object.freeze(extended); }
  catch (_) { window.Upg.font = extended; }

  // One-time coverage log (silent unless 100%)
  function logOnce() {
    try {
      var audit = auditSignatures();
      if (audit.coverage === '100.0%' && window.console && console.info) {
        console.info(
          '%c🎭 TASMEEM v3 / Phase 6 — ' + audit.applied.length +
          ' page signatures applied, coverage: ' + audit.coverage,
          'color:#9D7BFF;font-weight:bold;'
        );
      }
    } catch (_) { /* swallow */ }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', logOnce, { once: true });
  } else {
    logOnce();
  }
})(window, document);
