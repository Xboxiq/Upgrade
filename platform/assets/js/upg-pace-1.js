/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-pace-1.js
   Extracted from app.js lines 16222-16576
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const MASTERY_KEY = 'upg.pace.mastery';
  const FOCUS_LOG_KEY = 'upg.pace.focus.log';
  const STATES = ['not-started', 'in-progress', 'mastered'];
  const STATE_LABELS = {
    'not-started': 'لم أبدأ',
    'in-progress': 'أعمل عليه',
    'mastered':    'أتقنته',
  };
  const STATE_ICONS = {
    'not-started': '○',
    'in-progress': '◐',
    'mastered':    '●',
  };
  const CONTENT_PAGES = [
    'callcenter', 'fieldsales', 'accountmgr', 'social', 'lab',
    'psych', 'eq', 'negotiation', 'customercare', 'programming',
    'accounting', 'phonerepair', 'hrmastery',
  ];

  // ─── Storage helpers ────────────────────────────────────────
  const readJSON = (k, fb) => {
    try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fb; }
    catch (_) { return fb; }
  };
  const writeJSON = (k, v) => {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) { /* quota / private mode */ }
  };

  // ─── Mastery API ────────────────────────────────────────────
  const getMastery = (blockId) => {
    if (!blockId) return 'not-started';
    const all = readJSON(MASTERY_KEY, {});
    return all[blockId] || 'not-started';
  };

  const setMastery = (blockId, state) => {
    if (!blockId || !STATES.includes(state)) return null;
    const all = readJSON(MASTERY_KEY, {});
    if (state === 'not-started') {
      delete all[blockId];
    } else {
      all[blockId] = state;
    }
    writeJSON(MASTERY_KEY, all);
    document.dispatchEvent(new CustomEvent('upg:pace:mastery', {
      detail: { blockId, state },
    }));
    return state;
  };

  const cycleMastery = (blockId) => {
    const cur = getMastery(blockId);
    const idx = STATES.indexOf(cur);
    const next = STATES[(idx + 1) % STATES.length];
    return setMastery(blockId, next);
  };

  // ─── Focus log ──────────────────────────────────────────────
  const logFocus = (blockId, durationSec) => {
    if (!blockId || !durationSec) return;
    const log = readJSON(FOCUS_LOG_KEY, []);
    log.push({
      blockId,
      durationSec: Math.round(durationSec),
      startedAt: Date.now() - durationSec * 1000,
    });
    if (log.length > 500) log.shift(); // cap
    writeJSON(FOCUS_LOG_KEY, log);
    document.dispatchEvent(new CustomEvent('upg:pace:focus', {
      detail: { blockId, durationSec },
    }));
  };

  const totalFocusSeconds = () => {
    const log = readJSON(FOCUS_LOG_KEY, []);
    return log.reduce((s, e) => s + (e.durationSec || 0), 0);
  };

  // ─── Page progress ──────────────────────────────────────────
  const refreshPageProgress = (pageId) => {
    const root = document.querySelector('[data-page-progress="' + pageId + '"]');
    const page = document.getElementById('page-' + pageId);
    if (!page) return null;
    const blocks = page.querySelectorAll('[data-block-id]');
    let total = 0, mastered = 0;
    const tiers = {
      foundation:   { total: 0, mastered: 0 },
      practitioner: { total: 0, mastered: 0 },
      expert:       { total: 0, mastered: 0 },
    };
    blocks.forEach((b) => {
      total++;
      const id = b.getAttribute('data-block-id');
      const diff = parseInt(b.getAttribute('data-difficulty') || '2', 10);
      const tier = diff <= 2 ? 'foundation' : (diff === 3 ? 'practitioner' : 'expert');
      tiers[tier].total++;
      if (getMastery(id) === 'mastered') {
        mastered++;
        tiers[tier].mastered++;
      }
    });
    const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;

    if (root) {
      const setText = (sel, val) => {
        const el = root.querySelector(sel);
        if (el) el.textContent = String(val);
      };
      setText('[data-page-mastered-count]', mastered);
      setText('[data-page-total-count]', total);
      setText('[data-page-mastered-pct]', pct);
      setText('[data-tier-foundation-mastered]', tiers.foundation.mastered);
      setText('[data-tier-foundation-total]', tiers.foundation.total);
      setText('[data-tier-practitioner-mastered]', tiers.practitioner.mastered);
      setText('[data-tier-practitioner-total]', tiers.practitioner.total);
      setText('[data-tier-expert-mastered]', tiers.expert.mastered);
      setText('[data-tier-expert-total]', tiers.expert.total);
      const fill = root.querySelector('[data-page-progress-fill]');
      if (fill) fill.style.setProperty('--progress', pct + '%');
      const bar = root.querySelector('[role="progressbar"]');
      if (bar) bar.setAttribute('aria-valuenow', String(pct));
    }
    return { total, mastered, pct, tiers };
  };

  const refreshAllProgress = () => {
    document.querySelectorAll('[data-page-progress]').forEach((el) => {
      const pageId = el.getAttribute('data-page-progress');
      refreshPageProgress(pageId);
    });
  };

  // ─── Heatmap render ─────────────────────────────────────────
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const renderHeatmap = () => {
    const root = document.querySelector('[data-mastery-heatmap-root]');
    if (!root) return;
    let html = '<div class="heatmap-grid">';
    let grandTotal = 0, grandMastered = 0, grandInProg = 0;
    CONTENT_PAGES.forEach((p) => {
      const stats = refreshPageProgress(p) || { total: 0, mastered: 0, pct: 0 };
      let inprog = 0;
      const page = document.getElementById('page-' + p);
      if (page) {
        page.querySelectorAll('[data-block-id]').forEach((b) => {
          if (getMastery(b.getAttribute('data-block-id')) === 'in-progress') inprog++;
        });
      }
      grandTotal += stats.total;
      grandMastered += stats.mastered;
      grandInProg += inprog;
      const safe = escapeHtml(p);
      html += '' +
        '<a class="heatmap-cell" href="#page-' + safe + '" data-heatmap-pct="' + stats.pct + '">' +
          '<span class="heatmap-cell-name">' + safe + '</span>' +
          '<span class="heatmap-cell-meta">' +
            '<span class="type-num">' + stats.mastered + '/' + stats.total + '</span>' +
            '<span class="type-num">' + stats.pct + '%</span>' +
          '</span>' +
          '<span class="heatmap-cell-fill" style="--progress: ' + stats.pct + '%"></span>' +
        '</a>';
    });
    html += '</div>';
    root.innerHTML = html;

    const setStat = (sel, val) => {
      const el = document.querySelector(sel);
      if (el) el.textContent = String(val);
    };
    setStat('[data-mastery-total]', grandTotal);
    setStat('[data-mastery-mastered]', grandMastered);
    setStat('[data-mastery-inprogress]', grandInProg);
    const focusHours = (totalFocusSeconds() / 3600).toFixed(1);
    setStat('[data-mastery-focus-hours]', focusHours);
  };

  // ─── DOM bindings: mastery toggles ──────────────────────────
  const bindMasteryToggles = () => {
    document.querySelectorAll('.mastery-toggle').forEach((btn) => {
      if (btn.__upgPaceBound) return;
      btn.__upgPaceBound = true;
      const id = btn.getAttribute('data-mastery-for');
      const update = (state) => {
        btn.setAttribute('data-mastery-state', state);
        const icon = btn.querySelector('.mastery-icon');
        const label = btn.querySelector('.mastery-label');
        if (icon) icon.textContent = STATE_ICONS[state];
        if (label) label.textContent = STATE_LABELS[state];
      };
      update(getMastery(id));
      btn.addEventListener('click', () => {
        const next = cycleMastery(id);
        update(next);
        const page = btn.closest('.page');
        if (page && page.id) {
          const pageId = page.id.replace(/^page-/, '');
          refreshPageProgress(pageId);
        }
        if (window.Upg && window.Upg.sound && typeof window.Upg.sound.enabled === 'function' && window.Upg.sound.enabled()) {
          if (typeof window.Upg.sound.play === 'function') window.Upg.sound.play('tap');
        }
      });
    });
  };

  // ─── Focus timer engine ─────────────────────────────────────
  const activeTimers = new Map();

  const fmtTime = (s) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return String(m).padStart(2, '0') + ':' + String(r).padStart(2, '0');
  };

  const startFocus = (blockId, minutes) => {
    if (!blockId || !minutes || minutes <= 0) return;
    stopFocus(blockId); // clear previous if any
    const seconds = Math.round(minutes * 60);
    const startTime = Date.now();
    let remaining = seconds;
    const activeUI = document.querySelector('[data-focus-active-for="' + blockId + '"]');
    const timeEl = activeUI && activeUI.querySelector('[data-focus-time]');
    const presetGroup = activeUI && activeUI.parentElement && activeUI.parentElement.querySelector('.focus-presets');
    if (activeUI) activeUI.hidden = false;
    if (presetGroup) presetGroup.style.display = 'none';
    if (timeEl) timeEl.textContent = fmtTime(remaining);

    const tick = () => {
      remaining = seconds - Math.floor((Date.now() - startTime) / 1000);
      if (remaining <= 0) {
        if (timeEl) timeEl.textContent = '00:00';
        finishFocus(blockId, seconds);
        return;
      }
      if (timeEl) timeEl.textContent = fmtTime(remaining);
    };

    const intervalId = setInterval(tick, 1000);
    activeTimers.set(blockId, { intervalId, startTime, seconds, presetGroup, activeUI });
  };

  const stopFocus = (blockId) => {
    const entry = activeTimers.get(blockId);
    if (!entry) return;
    clearInterval(entry.intervalId);
    const elapsed = Math.floor((Date.now() - entry.startTime) / 1000);
    if (elapsed >= 60) logFocus(blockId, elapsed); // ≥ 1 min logged
    if (entry.activeUI) entry.activeUI.hidden = true;
    if (entry.presetGroup) entry.presetGroup.style.display = '';
    activeTimers.delete(blockId);
  };

  const finishFocus = (blockId, fullSeconds) => {
    const entry = activeTimers.get(blockId);
    if (!entry) return;
    clearInterval(entry.intervalId);
    logFocus(blockId, fullSeconds);
    if (entry.activeUI) entry.activeUI.hidden = true;
    if (entry.presetGroup) entry.presetGroup.style.display = '';
    activeTimers.delete(blockId);
    if (window.Upg && window.Upg.sound && typeof window.Upg.sound.enabled === 'function' && window.Upg.sound.enabled()) {
      if (typeof window.Upg.sound.play === 'function') window.Upg.sound.play('complete');
    }
    document.dispatchEvent(new CustomEvent('upg:pace:focus:complete', {
      detail: { blockId, durationSec: fullSeconds },
    }));
  };

  // ─── DOM bindings: focus buttons ────────────────────────────
  const bindFocusButtons = () => {
    document.querySelectorAll('.focus-preset').forEach((btn) => {
      if (btn.__upgPaceBound) return;
      btn.__upgPaceBound = true;
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-focus-for');
        const min = parseInt(btn.getAttribute('data-focus-minutes'), 10);
        startFocus(id, min);
      });
    });
    document.querySelectorAll('[data-focus-stop]').forEach((btn) => {
      if (btn.__upgPaceBound) return;
      btn.__upgPaceBound = true;
      btn.addEventListener('click', () => {
        const wrap = btn.closest('[data-focus-active-for]');
        if (!wrap) return;
        const id = wrap.getAttribute('data-focus-active-for');
        stopFocus(id);
      });
    });
  };

  // ─── Init + observers ───────────────────────────────────────
  const init = () => {
    bindMasteryToggles();
    bindFocusButtons();
    refreshAllProgress();
    const mp = document.getElementById('page-myprogress');
    if (mp && !mp.hasAttribute('hidden')) renderHeatmap();
  };

  // Re-render heatmap when entering myprogress
  document.addEventListener('upg:nav:change', () => {
    const mp = document.getElementById('page-myprogress');
    if (mp && !mp.hasAttribute('hidden')) renderHeatmap();
  });

  // Lightweight MutationObserver — only re-init bindings when new pacing
  // chips or progress bars are inserted (avoids storms).
  const observer = new MutationObserver((muts) => {
    let need = false;
    for (const m of muts) {
      for (const n of m.addedNodes) {
        if (!(n instanceof Element)) continue;
        if (n.matches && (
          n.matches('.mastery-toggle, .focus-preset, [data-focus-stop], [data-page-progress], [data-mastery-heatmap-root]') ||
          n.querySelector && n.querySelector('.mastery-toggle, .focus-preset, [data-focus-stop], [data-page-progress], [data-mastery-heatmap-root]')
        )) { need = true; break; }
      }
      if (need) break;
    }
    if (need) init();
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

  // ─── Public API ─────────────────────────────────────────────
  window.Upg = window.Upg || {};
  window.Upg.pace = Object.freeze({
    getMastery,
    setMastery,
    cycleMastery,
    startFocus,
    stopFocus,
    logFocus,
    totalFocusSeconds,
    refreshPageProgress,
    refreshAllProgress,
    renderHeatmap,
    states: () => STATES.slice(),
  });
})();
