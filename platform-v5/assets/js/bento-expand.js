/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — δ2 — Bento Expand runtime (REVEAL_PULSE)
   ────────────────────────────────────────────────────────────────────────
   Click a .bento-card → it expands in place. Click elsewhere or press
   Escape → it collapses. Single card open at a time (radio behaviour).

   Wraps state changes in document.startViewTransition() when supported
   (Chrome 111+, Safari 18+) for FLIP morph. Firefox falls back to CSS
   transitions defined in bento-expand.css.

   Classic IIFE — mobile-safe. Idempotent.
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  window.Upg = window.Upg || {};

  const ATTR = 'data-expanded';
  let activeCard = null;


  // ── Helpers ──────────────────────────────────────────────────────────
  function findExpandableCard(target) {
    // Walk up to the .bento-card host. Ignore clicks on already-interactive
    // descendants like <a>/<button> inside the card detail.
    let node = target;
    while (node && node.nodeType === 1) {
      if (node.classList && node.classList.contains('bento-card')) return node;
      if (node.tagName === 'BUTTON' || node.tagName === 'A') return null;
      node = node.parentNode;
    }
    return null;
  }

  function setExpanded(card, expanded) {
    if (!card) return;
    if (expanded) {
      // Collapse any other card first
      if (activeCard && activeCard !== card) {
        activeCard.removeAttribute(ATTR);
      }
      card.setAttribute(ATTR, 'true');
      card.setAttribute('aria-expanded', 'true');
      activeCard = card;
    } else {
      card.removeAttribute(ATTR);
      card.setAttribute('aria-expanded', 'false');
      if (activeCard === card) activeCard = null;
    }
    document.dispatchEvent(new CustomEvent('upg:bento:expand', {
      bubbles: true,
      detail: { card: card, expanded: expanded }
    }));
  }


  // ── State changes wrapped in View Transitions when supported ────────
  function withViewTransition(fn) {
    if (typeof document.startViewTransition === 'function') {
      try {
        return document.startViewTransition(fn);
      } catch (_) { /* fall through */ }
    }
    fn();
    return null;
  }

  function expand(card) {
    if (!card) return false;
    if (card.getAttribute(ATTR) === 'true') return false;
    withViewTransition(function () { setExpanded(card, true); });
    return true;
  }

  function collapse() {
    if (!activeCard) return false;
    const card = activeCard;
    withViewTransition(function () { setExpanded(card, false); });
    return true;
  }

  function toggle(card) {
    if (!card) return false;
    if (card.getAttribute(ATTR) === 'true') return collapse();
    return expand(card);
  }


  // ── Event bindings ──────────────────────────────────────────────────
  function onClick(ev) {
    const card = findExpandableCard(ev.target);
    if (card) {
      ev.preventDefault();
      toggle(card);
      return;
    }
    // Click outside any card — collapse the active one if present
    if (activeCard && !ev.target.closest('.bento-card')) {
      collapse();
    }
  }

  function onKeyDown(ev) {
    if (ev.key === 'Escape' && activeCard) {
      ev.preventDefault();
      collapse();
    }
  }


  // ── Boot ────────────────────────────────────────────────────────────
  function boot() {
    document.addEventListener('click', onClick, false);
    document.addEventListener('keydown', onKeyDown, false);
    // Make all cards keyboard-toggleable: Enter/Space on the focused card
    document.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Enter' && ev.key !== ' ') return;
      const focused = document.activeElement;
      if (!focused || !focused.classList.contains('bento-card')) return;
      ev.preventDefault();
      toggle(focused);
    }, false);
  }


  // ── Idempotent surface registration ─────────────────────────────────
  if (!window.Upg.bento) {
    window.Upg.bento = Object.freeze({
      expand: expand,
      collapse: collapse,
      toggle: toggle,
      activeCard: function () { return activeCard; },
      _meta: Object.freeze({
        version: 'tadaffuq-v5/δ2',
        pulse: 'REVEAL_PULSE',
        viewTransitionsSupported: typeof document.startViewTransition === 'function'
      })
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    queueMicrotask(boot);
  }

})();
