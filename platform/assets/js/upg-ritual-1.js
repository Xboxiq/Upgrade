/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-ritual-1.js
   Extracted from app.js lines 17535-17734
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  if (!window.Upg) window.Upg = {};
  if (!window.Upg.ritual) window.Upg.ritual = {};

  var STORAGE_KEY_LAST_HALO = 'upg_ritual_last_halo_target';
  var ATTR_BODY   = 'data-rit-halo';
  var ATTR_TARGET = 'data-rit-halo-target';

  var activeTarget = null;
  var exitButton   = null;
  var savedFocus   = null;

  function isReducedMotion() {
    try {
      return window.matchMedia &&
             window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) { return false; }
  }

  /* Pick a sensible default target if no selector given.
     Order of preference (real selectors in this codebase):
       1. visible page > .page-body / main / article
       2. visible section.page itself
       3. #main fallback. */
  function defaultTarget() {
    var visible = document.querySelector('section.page:not([hidden])');
    if (visible) {
      return visible.querySelector('.page-body') ||
             visible.querySelector('main') ||
             visible.querySelector('article') ||
             visible;
    }
    return document.getElementById('main');
  }

  function resolveTarget(arg) {
    if (!arg) return defaultTarget();
    if (typeof arg === 'string') {
      try { return document.querySelector(arg); } catch (e) { return null; }
    }
    if (arg && arg.nodeType === 1) return arg;
    return null;
  }

  function syncToggleState(active) {
    var btns = document.querySelectorAll('[data-rit-halo-toggle]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  function enterHalo(targetOrSelector) {
    var target = resolveTarget(targetOrSelector);
    if (!target) return false;

    /* Exit any prior halo first */
    if (activeTarget && activeTarget !== target) exitHalo();

    target.setAttribute(ATTR_TARGET, '');
    document.body.setAttribute(ATTR_BODY, 'active');
    activeTarget = target;

    /* Save focus + set focus into target for keyboard users */
    savedFocus = document.activeElement;
    var prevTabIndex = target.getAttribute('tabindex');
    if (prevTabIndex === null) target.setAttribute('tabindex', '-1');
    try { target.focus({ preventScroll: false }); } catch (e) { /* ignore */ }

    /* Insert exit button (only one ever) */
    if (!target.querySelector(':scope > .rit-halo-exit')) {
      exitButton = document.createElement('button');
      exitButton.type = 'button';
      exitButton.className = 'rit-halo-exit';
      exitButton.setAttribute('aria-label', 'خروج من وضع القراءة');
      exitButton.setAttribute('title', 'خروج من وضع القراءة (Esc)');
      exitButton.textContent = '×';
      exitButton.addEventListener('click', function (e) {
        e.stopPropagation();
        exitHalo();
      });
      target.appendChild(exitButton);
    }

    /* Save selector for next session */
    if (target.id) {
      try { localStorage.setItem(STORAGE_KEY_LAST_HALO, '#' + target.id); } catch (e) {}
    }

    syncToggleState(true);

    /* Attach Esc + outside-click listeners */
    document.addEventListener('keydown', onEscape);
    document.addEventListener('click', onOutsideClick, true);

    /* Notify other modules (Phase 6 uses this) */
    try {
      document.dispatchEvent(new CustomEvent('upg:ritual:halo:enter', {
        detail: { target: target }
      }));
    } catch (e) { /* CustomEvent unsupported */ }

    return true;
  }

  function exitHalo() {
    if (!activeTarget) return false;
    var t = activeTarget;
    t.removeAttribute(ATTR_TARGET);
    document.body.removeAttribute(ATTR_BODY);

    if (exitButton && exitButton.parentNode) {
      exitButton.parentNode.removeChild(exitButton);
    }
    exitButton = null;

    /* Restore focus to where the user was */
    if (savedFocus && typeof savedFocus.focus === 'function') {
      try { savedFocus.focus({ preventScroll: true }); } catch (e) {}
    }
    savedFocus = null;
    activeTarget = null;

    syncToggleState(false);

    document.removeEventListener('keydown', onEscape);
    document.removeEventListener('click', onOutsideClick, true);

    try {
      document.dispatchEvent(new CustomEvent('upg:ritual:halo:exit', {
        detail: { target: t }
      }));
    } catch (e) {}

    return true;
  }

  function toggleHalo(targetOrSelector) {
    if (activeTarget) return exitHalo();
    return enterHalo(targetOrSelector);
  }

  function isHaloActive() { return activeTarget !== null; }

  function onEscape(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      e.preventDefault();
      exitHalo();
    }
  }

  function onOutsideClick(e) {
    if (!activeTarget) return;
    var t = e.target;
    if (!t || !t.closest) return;

    /* Click inside target, on toggle button, on exit button, or on skip-link → ignore */
    if (activeTarget.contains(t)) return;
    if (t.closest('[data-rit-halo-toggle]')) return;
    if (t.closest('.rit-halo-exit')) return;
    if (t.closest('.skip-link')) return;

    exitHalo();
  }

  /* ─── Cmd+. / Ctrl+. shortcut ──────────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    /* Don't hijack from form inputs unless modifier explicit */
    if ((e.metaKey || e.ctrlKey) && (e.key === '.' || e.keyCode === 190)) {
      var tag = (e.target && e.target.tagName) || '';
      /* Cmd/Ctrl + . is rare in inputs anyway, allow override */
      e.preventDefault();
      toggleHalo();
    }
  });

  /* ─── Toggle button click delegation ───────────────────────────────── */
  document.addEventListener('click', function (e) {
    if (e.target && e.target.closest && e.target.closest('[data-rit-halo-toggle]')) {
      e.preventDefault();
      toggleHalo();
    }
  });

  /* ─── Initial aria-pressed sync on DOMContentLoaded ────────────────── */
  function syncOnReady() { syncToggleState(false); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncOnReady, { once: true });
  } else {
    syncOnReady();
  }

  /* ─── Extend Upg.ritual surface ────────────────────────────────────── */
  window.Upg.ritual.enterHalo    = enterHalo;
  window.Upg.ritual.exitHalo     = exitHalo;
  window.Upg.ritual.toggleHalo   = toggleHalo;
  window.Upg.ritual.isHaloActive = isHaloActive;

})(window, document);
