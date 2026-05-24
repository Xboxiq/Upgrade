/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-46.js
   Extracted from app.js lines 17287-17525
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function ritualEntryIIFE (window, document) {
  'use strict';

  var Upg = (window.Upg = window.Upg || {});
  Upg.ritual = Upg.ritual || {};

  var STORAGE_KEY_LAST_ENTRY    = 'upg_ritual_last_entry';
  var STORAGE_KEY_DISABLED      = 'upg_ritual_disabled';
  var LEGACY_KEY_ENTRY_DISABLED = 'upg_ritual_entry_disabled';

  var POETRY_LINES = [
    'بسم اللحظة، نَبدأ.',
    'الحرف يَستقبل اليد.',
    'اليوم — مرة أخرى.',
    'الانضباط طقس، لا قرار.',
    'اقرأ كأنّك لم تَقرأ من قبل.',
    'الجرّة المملوءة هي التي تُسكب.',
    'خُذ نَفَساً، ثم أَمسك القلم.'
  ];

  var autoTimer = null;
  var keydownHandler = null;
  var clickHandler = null;
  var skipHandler = null;
  var savedFocus = null;

  // ─── Storage helpers (never throw) ────────────────────────────────────

  function safeGet (key) {
    try { return window.localStorage.getItem(key); }
    catch (_e) { return null; }
  }
  function safeSet (key, value) {
    try { window.localStorage.setItem(key, value); }
    catch (_e) { /* noop */ }
  }
  function safeRemove (key) {
    try { window.localStorage.removeItem(key); }
    catch (_e) { /* noop */ }
  }

  // ─── Capability detection ─────────────────────────────────────────────

  function isReducedMotion () {
    try {
      return window.matchMedia &&
             window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (_e) { return false; }
  }

  function isToday (timestamp) {
    if (!timestamp) return false;
    var n = parseInt(timestamp, 10);
    if (!isFinite(n)) return false;
    var last = new Date(n);
    var now = new Date();
    return last.getFullYear() === now.getFullYear() &&
           last.getMonth()    === now.getMonth() &&
           last.getDate()     === now.getDate();
  }

  // ─── Disabled-set (JSON array) — with legacy migration ────────────────

  function migrateLegacyDisabled () {
    var legacy = safeGet(LEGACY_KEY_ENTRY_DISABLED);
    if (legacy === '1') {
      var current = readDisabled();
      if (current.indexOf('entry') === -1) current.push('entry');
      writeDisabled(current);
    }
    safeRemove(LEGACY_KEY_ENTRY_DISABLED);
  }

  function readDisabled () {
    try {
      var raw = safeGet(STORAGE_KEY_DISABLED);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_e) { return []; }
  }

  function writeDisabled (arr) {
    try { safeSet(STORAGE_KEY_DISABLED, JSON.stringify(arr || [])); }
    catch (_e) { /* noop */ }
  }

  function isDisabled (rituId) {
    return readDisabled().indexOf(rituId) !== -1;
  }

  function setDisabled (rituId, on) {
    var current = readDisabled();
    var idx = current.indexOf(rituId);
    if (on && idx === -1) current.push(rituId);
    if (!on && idx !== -1) current.splice(idx, 1);
    writeDisabled(current);
  }

  // ─── Entry ritual lifecycle ───────────────────────────────────────────

  function dismissEntry () {
    var portal = document.getElementById('rit-entry-portal');

    if (autoTimer !== null) { clearTimeout(autoTimer); autoTimer = null; }
    if (keydownHandler) {
      document.removeEventListener('keydown', keydownHandler, true);
      keydownHandler = null;
    }
    if (portal) {
      if (clickHandler) {
        portal.removeEventListener('click', clickHandler);
        clickHandler = null;
      }
      var skipBtn = portal.querySelector('[data-rit-skip]');
      if (skipBtn && skipHandler) {
        skipBtn.removeEventListener('click', skipHandler);
      }
      skipHandler = null;
      portal.setAttribute('hidden', '');
      portal.setAttribute('aria-hidden', 'true');
      portal.removeAttribute('data-rit-rm');
    }

    if (savedFocus && typeof savedFocus.focus === 'function') {
      try { savedFocus.focus({ preventScroll: true }); } catch (_e) { /* noop */ }
    }
    savedFocus = null;
  }

  function startEntry (force) {
    var portal = document.getElementById('rit-entry-portal');
    if (!portal) return false;

    if (!force) {
      if (isDisabled('entry')) return false;
      if (isToday(safeGet(STORAGE_KEY_LAST_ENTRY))) return false;
    }

    // Stamp this run BEFORE animating — survives a refresh-during-ritual.
    safeSet(STORAGE_KEY_LAST_ENTRY, String(Date.now()));

    // Pick poetry line
    var poetryEl = portal.querySelector('[data-rit-poetry-text]');
    if (poetryEl) {
      poetryEl.textContent = POETRY_LINES[Math.floor(Math.random() * POETRY_LINES.length)];
    }

    // Mark reduced-motion (CSS reads this attribute)
    var reduced = isReducedMotion();
    if (reduced) portal.setAttribute('data-rit-rm', 'reduce');
    else         portal.removeAttribute('data-rit-rm');

    // Save focus + reveal
    savedFocus = document.activeElement;
    portal.removeAttribute('hidden');
    portal.setAttribute('aria-hidden', 'false');

    // Auto-dismiss timeline (instant-ish under reduced-motion)
    var dismissDelay = reduced ? 800 : 4000;
    autoTimer = setTimeout(dismissEntry, dismissDelay);

    // Skip button
    var skipBtn = portal.querySelector('[data-rit-skip]');
    skipHandler = function (e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      dismissEntry();
    };
    if (skipBtn) skipBtn.addEventListener('click', skipHandler);

    // Click on portal/veil dismisses (but not on the wordmark/poetry)
    clickHandler = function (e) {
      if (e.target === portal ||
          (e.target.classList && e.target.classList.contains('rit-entry-veil'))) {
        dismissEntry();
      }
    };
    portal.addEventListener('click', clickHandler);

    // Esc dismisses (capture phase so we beat any modal handlers)
    keydownHandler = function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        e.stopPropagation();
        dismissEntry();
      }
    };
    document.addEventListener('keydown', keydownHandler, true);

    return true;
  }

  // ─── Public API (Phase 1 surface; Phases 2-6 extend) ──────────────────

  Upg.ritual.start = function (rituId, opts) {
    opts = opts || {};
    if (rituId === 'entry') return startEntry(!!opts.force);
    return false;
  };

  Upg.ritual.stop = function (rituId) {
    if (rituId === 'entry') { dismissEntry(); return true; }
    return false;
  };

  Upg.ritual.disable = function (rituId) {
    if (typeof rituId === 'string') setDisabled(rituId, true);
  };

  Upg.ritual.enable = function (rituId) {
    if (typeof rituId === 'string') setDisabled(rituId, false);
  };

  Upg.ritual.status = function () {
    var lastEntry = safeGet(STORAGE_KEY_LAST_ENTRY);
    return {
      entry: {
        last_run:  lastEntry ? new Date(parseInt(lastEntry, 10)).toISOString() : null,
        ran_today: isToday(lastEntry),
        disabled:  isDisabled('entry')
      }
    };
  };

  Upg.ritual.POETRY_LINES = POETRY_LINES.slice();

  // ─── Boot — migrate legacy + auto-trigger once per day ────────────────

  function boot () {
    migrateLegacyDisabled();
    // Small settle delay so layout/personality/aura init first.
    setTimeout(function () { startEntry(false); }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})(window, document);
