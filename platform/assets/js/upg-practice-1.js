/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-practice-1.js
   Extracted from app.js lines 15990-16199
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const KEY_PREFIX = 'upg.practice.';
  const REFLECT_PREFIX = 'upg.practice.reflect.';

  // ─── Storage helpers ───────────────────────────────────────
  const readJSON = (key, fallback = {}) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  };

  const writeJSON = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      /* quota exceeded or storage disabled — silent */
    }
  };

  // ─── Public API ────────────────────────────────────────────

  const tried = (qId, attempted = true) => {
    if (!qId) return null;
    const blockId = qId.replace(/-q\d+$/, '');
    const state = readJSON(KEY_PREFIX + blockId);
    state[qId] = state[qId] || {};
    state[qId].attempted = attempted;
    state[qId].touchedAt = Date.now();
    writeJSON(KEY_PREFIX + blockId, state);
    document.dispatchEvent(new CustomEvent('upg:practice:change', {
      detail: { blockId, qId, attempted }
    }));
    return state[qId];
  };

  const isTried = (qId) => {
    if (!qId) return false;
    const blockId = qId.replace(/-q\d+$/, '');
    const state = readJSON(KEY_PREFIX + blockId);
    return !!(state[qId] && state[qId].attempted);
  };

  const getBlock = (blockId) => {
    if (!blockId) return null;
    return readJSON(KEY_PREFIX + blockId);
  };

  const reflect = (blockId, text) => {
    if (!blockId) return null;
    if (typeof text !== 'string') text = '';
    if (text.length > 500) text = text.slice(0, 500);
    if (text.length === 0) {
      try { localStorage.removeItem(REFLECT_PREFIX + blockId); } catch (_) {}
    } else {
      try { localStorage.setItem(REFLECT_PREFIX + blockId, text); } catch (_) {}
    }
    document.dispatchEvent(new CustomEvent('upg:practice:reflect', {
      detail: { blockId, length: text.length }
    }));
    return text;
  };

  const getReflection = (blockId) => {
    if (!blockId) return '';
    try {
      return localStorage.getItem(REFLECT_PREFIX + blockId) || '';
    } catch (_) {
      return '';
    }
  };

  const stats = () => {
    let totalQ = 0, triedQ = 0, totalReflect = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k) continue;
        if (k.startsWith(KEY_PREFIX) && !k.startsWith(REFLECT_PREFIX)) {
          const data = readJSON(k);
          for (const qId in data) {
            if (!Object.hasOwn(data, qId)) continue;
            totalQ++;
            if (data[qId] && data[qId].attempted) triedQ++;
          }
        }
        if (k.startsWith(REFLECT_PREFIX)) totalReflect++;
      }
    } catch (_) {}
    return {
      questionsAttempted: triedQ,
      questionsTotal: totalQ,
      reflectionsWritten: totalReflect,
    };
  };

  const reset = (blockId) => {
    if (!blockId) return false;
    try {
      localStorage.removeItem(KEY_PREFIX + blockId);
      localStorage.removeItem(REFLECT_PREFIX + blockId);
      return true;
    } catch (_) {
      return false;
    }
  };

  // ─── DOM bindings ──────────────────────────────────────────

  const bindTriedButtons = () => {
    document.querySelectorAll('.practice-tried-btn').forEach((btn) => {
      if (btn.__upgBound) return;
      btn.__upgBound = true;
      const qId = btn.getAttribute('data-q-id');
      // Restore state
      if (qId && isTried(qId)) {
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.add('practice-tried-btn--on');
      }
      btn.addEventListener('click', () => {
        const cur = btn.getAttribute('aria-pressed') === 'true';
        const next = !cur;
        btn.setAttribute('aria-pressed', String(next));
        btn.classList.toggle('practice-tried-btn--on', next);
        tried(qId, next);
      });
    });
  };

  const bindReflectInputs = () => {
    document.querySelectorAll('.block-practice-reflect-input').forEach((input) => {
      if (input.__upgBound) return;
      input.__upgBound = true;
      const blockId = input.getAttribute('data-reflect-for');
      // Restore
      const existing = getReflection(blockId);
      if (existing) input.value = existing;
      // Counter
      const counter = input.closest('.block-practice-reflect')
        ?.querySelector('[data-reflect-count]');
      const updateCount = () => {
        if (counter) counter.textContent = String(input.value.length);
      };
      updateCount();
      // Debounced save (300ms)
      let timer = null;
      input.addEventListener('input', () => {
        updateCount();
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => reflect(blockId, input.value), 300);
      });
      // Save on blur immediately
      input.addEventListener('blur', () => {
        if (timer) clearTimeout(timer);
        reflect(blockId, input.value);
      });
    });
  };

  const init = () => {
    bindTriedButtons();
    bindReflectInputs();
  };

  // Re-bind on dynamic content (rare but possible)
  const observer = new MutationObserver((muts) => {
    let needRebind = false;
    for (const m of muts) {
      if (m.addedNodes.length) {
        for (const n of m.addedNodes) {
          if (n.nodeType === 1 && (
            n.matches?.('.block-practice') ||
            n.querySelector?.('.block-practice')
          )) {
            needRebind = true;
            break;
          }
        }
      }
      if (needRebind) break;
    }
    if (needRebind) init();
  });

  if (document.readyState !== 'loading') {
    init();
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  // Public API surface
  window.Upg = window.Upg || {};
  window.Upg.practice = Object.freeze({
    tried,
    isTried,
    getBlock,
    reflect,
    getReflection,
    stats,
    reset,
  });
})();
