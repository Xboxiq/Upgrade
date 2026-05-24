/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-state-1.js
   Extracted from app.js lines 13096-13301
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const _read = (k, fallback) => {
    try {
      const v = localStorage.getItem(k);
      if (v == null) return fallback;
      return JSON.parse(v);
    } catch {
      // Could be a non-JSON legacy string
      const raw = localStorage.getItem(k);
      return raw == null ? fallback : raw;
    }
  };
  const _write = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      notify(k, v);
    } catch (e) {
      console.warn('[Upg.state] write failed', k, e);
    }
  };

  const listeners = new Map();
  const on = (event, fn) => {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(fn);
    return () => listeners.get(event)?.delete(fn);
  };
  const notify = (k, v) => {
    listeners.get('change')?.forEach(fn => safe(fn, k, v));
    listeners.get(`change:${k}`)?.forEach(fn => safe(fn, v));
  };
  const safe = (fn, ...args) => { try { fn(...args); } catch (e) { console.error('[Upg.state] listener', e); } };

  // ─── Reading helpers (best-effort discovery) ───
  const progress = () => ({
    sales:        _read('upg_progress_sales', {}),
    callcenter:   _read('upg_progress_callcenter', {}),
    accounting:   _read('upg_progress_accounting', _read('upg_progress_acc', {})),
    programming:  _read('upg_progress_prog', _read('upg_progress_programming', {})),
    social:       _read('upg_progress_social', {}),
    phonerepair:  _read('upg_progress_phonerepair', {}),
    hrmastery:    _read('upg_progress_hr',  _read('upg_progress_hrmastery', {})),
    psych:        _read('upg_progress_psych', {}),
    eq:           _read('upg_progress_eq', {}),
  });

  const scores = () => ({
    simulator:    _read('upg_simulator_scores', []),
    objection:    _read('upg_objection_scores', []),
    prLab:        _read('upg_pr_lab_scores', []),
    psych:        _read('upg_psych_results', {}),
    interviews:   _read('upg_interview_attempts', []),
    interviewsHr: _read('upg_interview_attempts_hr', []),
    bigfive:      _read('upg_bigfive_scores', []),
  });

  const drafts = () => ({
    pitch:      _read('upg_pitch_drafts', []),
    salary:     _read('upg_salary_drafts', []),
    tax:        _read('upg_tax_drafts', []),
    portfolio:  _read('upg_portfolio_drafts', []),
    statements: _read('upg_statements_drafts', []),
    pr:         _read('upg_pr_estimates', []),
    calendar:   _read('upg_calendar_drafts', []),
    campaigns:  _read('upg_campaigns', []),
    objections: _read('upg_objections_drafts', []),
  });

  const misc = () => ({
    moodLog:         _read('upg_mood_log', []),
    pathChoice:      _read('upg_path_choice', null),
    accCycleVisited: _read('upg_acc_cycle_visited', []),
    accEqState:      _read('upg_acc_eq_state', {}),
    voiceMeta:       _read('upg_voice_recordings_meta', []),
  });

  const profile  = () => _read('upg_user_profile', null);
  const activity = () => _read('upg_activity_log', []);

  const logActivity = (type, payload) => {
    const log = activity();
    log.unshift({ ts: Date.now(), type, payload: payload || null });
    _write('upg_activity_log', log.slice(0, 200));
  };

  // ─── Computed metrics ───
  const countDone = (dict) => {
    if (!dict || typeof dict !== 'object') return 0;
    return Object.values(dict).filter(v => v === true || (v && typeof v === 'object' && v.completed)).length;
  };
  const countTotal = (dict) => (dict && typeof dict === 'object') ? Object.keys(dict).length : 0;

  const compute = {
    unitsCompleted() {
      return Object.values(progress()).reduce((sum, dict) => sum + countDone(dict), 0);
    },
    avgCompletionRate() {
      const all = Object.values(progress());
      const total = all.reduce((s, d) => s + countTotal(d), 0);
      const done = compute.unitsCompleted();
      if (total === 0) return 0;
      return Math.round((done / total) * 100);
    },
    trainingHours() {
      const log = activity().filter(a => a.type === 'session_end' || a.type === 'session_tick');
      const minutes = log.reduce((sum, e) => sum + (e.payload?.minutes || 0), 0);
      return Math.round(minutes / 6) / 10; // 1 decimal
    },
    streak() {
      const dates = new Set(activity().map(a => new Date(a.ts).toDateString()));
      let streak = 0;
      const d = new Date();
      while (dates.has(d.toDateString())) {
        streak++;
        d.setDate(d.getDate() - 1);
      }
      return streak;
    },
    topScore() {
      const s = scores();
      const all = [...(s.simulator || []), ...(s.objection || []), ...(s.prLab || []), ...(s.interviews || []), ...(s.interviewsHr || [])];
      const nums = all.map(x => typeof x === 'number' ? x : (x?.score ?? x?.value ?? 0));
      return nums.length ? Math.max(...nums) : 0;
    },
    quizzesTaken() {
      const psych = scores().psych || {};
      return Object.keys(psych).length;
    },
    draftCount() {
      return Object.values(drafts()).reduce((s, arr) => s + (Array.isArray(arr) ? arr.length : 0), 0);
    },
    moodAvg(days = 7) {
      const log = misc().moodLog || [];
      const cutoff = Date.now() - days * 86400000;
      const recent = log.filter(m => (m?.ts || 0) > cutoff);
      if (!recent.length) return null;
      const total = recent.reduce((s, m) => s + ((m.energy || 0) + (m.pleasantness || 0)) / 2, 0);
      return total / recent.length;
    },
    workerStats() {
      const p = progress();
      const list = [
        { id: 'fieldsales', key: 'sales',       name: 'المبيعات',     icon: 'briefcase' },
        { id: 'callcenter', key: 'callcenter',  name: 'الكول سنتر',   icon: 'phone' },
        { id: 'accounting', key: 'accounting',  name: 'المحاسبة',     icon: 'calculator' },
        { id: 'programming', key: 'programming', name: 'البرمجة',      icon: 'code' },
        { id: 'social',     key: 'social',      name: 'السوشيال',     icon: 'megaphone' },
        { id: 'phonerepair', key: 'phonerepair', name: 'الصيانة',      icon: 'wrench' },
        { id: 'hrmastery',  key: 'hrmastery',   name: 'HR',           icon: 'briefcase' },
        { id: 'psych',      key: 'psych',       name: 'علم النفس',    icon: 'brain' },
        { id: 'eq',         key: 'eq',          name: 'الذكاء العاطفي',icon: 'heart-handshake' },
      ];
      return list.map(w => {
        const dict = p[w.key] || {};
        const total = countTotal(dict);
        const done  = countDone(dict);
        return {
          ...w,
          total, done,
          pct: total > 0 ? Math.round((done / total) * 100) : 0
        };
      });
    }
  };

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.state = {
    progress, scores, drafts, misc, profile, activity, logActivity, compute, on,
    _read, _write
  };

  // ─── Auto-hooks (passive logging) ───
  document.addEventListener('click', (e) => {
    const navItem = e.target.closest('[data-page]');
    if (navItem) {
      const p = navItem.dataset.page;
      if (p && p !== 'none') logActivity('navigate', { page: p });
    }
    const completeBtn = e.target.closest('[data-action="mark-complete"]');
    if (completeBtn) logActivity('lesson_complete', { ref: completeBtn.dataset.ref || completeBtn.id || null });
  });

  // Session ticks every 5 min, plus end-of-session
  let sessionStart = Date.now();
  let lastTick = sessionStart;
  setInterval(() => {
    const now = Date.now();
    const minutes = Math.round((now - lastTick) / 60000);
    if (minutes >= 5) {
      logActivity('session_tick', { minutes });
      lastTick = now;
    }
  }, 60000);
  window.addEventListener('beforeunload', () => {
    const minutes = Math.round((Date.now() - lastTick) / 60000);
    if (minutes > 0) logActivity('session_end', { minutes });
  });

  // Storage cross-tab sync
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('upg_')) notify(e.key, e.newValue);
  });
})();
