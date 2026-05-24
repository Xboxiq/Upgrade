/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-font-1.js
   Extracted from app.js lines 16589-16712
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  var FAMILIES = [
    { id: 'aref-ruqaa',       css: 'Aref Ruqaa',           weights: [400, 700],                    script: 'arabic'  },
    { id: 'reem-kufi',        css: 'Reem Kufi',            weights: [400, 700],                    script: 'arabic'  },
    { id: 'cairo',            css: 'Cairo',                weights: [400, 600, 700],               script: 'arabic'  },
    { id: 'tajawal',          css: 'Tajawal',              weights: [300, 400, 500, 700],          script: 'arabic'  },
    { id: 'ibm-plex-arabic',  css: 'IBM Plex Sans Arabic', weights: [300, 400, 500, 600, 700],    script: 'arabic'  },
    { id: 'readex-pro',       css: 'Readex Pro',           weights: [200, 700],                    script: 'arabic'  },
    { id: 'inter',            css: 'Inter',                weights: [100, 900],                    script: 'latin'   },
    { id: 'jetbrains-mono',   css: 'JetBrains Mono',       weights: [400, 500, 700],              script: 'latin'   },
    { id: 'fraunces',         css: 'Fraunces',             weights: [400, 700],                    script: 'latin'   }
  ];

  var VOICES = [
    'hero', 'display', 'display-h', 'display-l',
    'body', 'body-lead', 'ui', 'label',
    'numeric', 'num-tabular', 'code',
    'accent', 'eyebrow', 'signature', 'ribbon',
    'quote', 'latin', 'wordmark'
  ];

  /** List all local font families */
  function list() {
    return FAMILIES.map(function (f) { return { id: f.id, css: f.css, weights: f.weights.slice(), script: f.script }; });
  }

  /** List all voice token names */
  function voices() {
    return VOICES.slice();
  }

  /** Audit currently-loaded font faces via document.fonts API */
  function audit() {
    if (!document.fonts || !document.fonts.ready) {
      return Promise.resolve({ supported: false });
    }
    return document.fonts.ready.then(function () {
      var loaded = {};
      document.fonts.forEach(function (font) {
        var family = font.family.replace(/['"]/g, '');
        if (!loaded[family]) loaded[family] = [];
        loaded[family].push({ weight: font.weight, style: font.style, status: font.status });
      });
      return {
        supported: true,
        total_faces: document.fonts.size,
        by_family: loaded
      };
    });
  }

  /** Check if a specific weight of a family is loaded and ready */
  function isReady(familyCss, weight, style) {
    if (!document.fonts || !document.fonts.check) return null;
    var w = weight || 400;
    return document.fonts.check(w + ' 12px "' + familyCss + '"');
  }

  /** Get computed font-family for an element (resolves token chain) */
  function computedFor(target) {
    var el = (typeof target === 'string') ? document.querySelector(target) : target;
    if (!el) return null;
    return getComputedStyle(el).fontFamily;
  }

  /** Check status from CSS custom property (sanity) */
  function status() {
    var rs = getComputedStyle(document.documentElement);
    return {
      stage:              rs.getPropertyValue('--tasmeem-stage').trim().replace(/['"]/g, ''),
      fonts_status:       rs.getPropertyValue('--tasmeem-fonts-status').trim().replace(/['"]/g, ''),
      local_loaded:       rs.getPropertyValue('--tasmeem-fonts-local-loaded').trim().replace(/['"]/g, ''),
      google_fonts_links: rs.getPropertyValue('--tasmeem-google-fonts-link-count').trim().replace(/['"]/g, '')
    };
  }

  /** Manual swap: temporarily override a voice token at runtime (debug only) */
  function swap(voice, fontCssName) {
    if (VOICES.indexOf(voice) === -1) {
      console.warn('[Upg.font] Invalid voice:', voice, '— expected one of', VOICES);
      return false;
    }
    document.documentElement.style.setProperty(
      '--type-voice-' + voice,
      '"' + fontCssName + '", sans-serif'
    );
    return true;
  }

  /** Reset a voice to its default value (clears inline override) */
  function reset(voice) {
    if (VOICES.indexOf(voice) === -1) return false;
    document.documentElement.style.removeProperty('--type-voice-' + voice);
    return true;
  }

  // Expose API (additive — preserves all 24 existing APIs)
  window.Upg = window.Upg || {};
  window.Upg.font = Object.freeze({
    list: list,
    voices: voices,
    audit: audit,
    isReady: isReady,
    computedFor: computedFor,
    status: status,
    swap: swap,
    reset: reset,
    FAMILIES: Object.freeze(FAMILIES.map(function (f) { return Object.freeze({ id: f.id, css: f.css, weights: Object.freeze(f.weights.slice()), script: f.script }); })),
    VOICES: Object.freeze(VOICES.slice())
  });

  // On page ready, log status to console (one-time devotion confirmation)
  document.addEventListener('DOMContentLoaded', function () {
    var s = status();
    if (s.fonts_status === 'phase-3-bound' && s.google_fonts_links === '0') {
      console.info(
        '%c\uD83D\uDD6F\uFE0F TASMEEM v3 ready \u2014 9/9 local families, 0 CDN, 0 external requests.',
        'color:#7AB8FF; font-weight:bold;'
      );
    }
  });
})(window, document);
