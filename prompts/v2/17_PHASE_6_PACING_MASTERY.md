# ⏱️ WORKER 17 — Phase 6/6 — Session Pacing & Mastery Markers
> **اقرأ أولاً:** `prompts/v2/17_WORKER_CONTENT_REVIVAL.md` — قسم **Preservation Guard**.
> **يبني فوق:** Worker 17 Phases 1-5.
> **الفلسفة:** *التعلم بدون إيقاع = إرهاق. الإيقاع بدون مَعْلَم إنجاز = ضياع. هذا الـ phase يُعطي الاثنين.*

---

## 🛡️ Preservation Contract (Phase 6)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` | **WRAP** — إضافة `<div class="block-pacing">` chip per major block + per-page progress bar | تعديل أي wrappers سابقة من P2-P5 |
| `style.css` | **APPEND** "Pacing & Mastery" (~220 سطر) | تعديل قواعد سابقة |
| `app.js` | **APPEND** IIFE `Upg.pace` (25th API, ~200 سطر) | تعديل أي IIFE موجودة (W17 P4 Upg.practice محفوظة كما هي) |
| `index.html` page-myprogress | **AUGMENT** — إضافة "Mastery Heatmap" بعد المحتوى الموجود | تعديل المحتوى الأصلي |

**Sacred preserved:**
- نص كل block.
- 24 prior Upg.* APIs.
- TL;DR + Takeaways + Pitfalls + Practice + Bridges من P2-P5.
- 391 qcalc.

---

## 🎯 الهدف

Phase 6 يضيف **3 طبقات إيقاع وإنجاز**:

1. **Per-Block Focus Timer Chip** — chip صغير يقترح focus session (15/25/45 min) لكل block.
2. **Mastery Toggle** — زر "تم استيعابه" مع 3 حالات (لم أبدأ / أعمل عليه / أتقنته).
3. **Per-Page Mastery Progress Bar** — شريط تقدم في أعلى كل صفحة محتوى.
4. **Mastery Heatmap في page-myprogress** — جدول بصري يعرض تقدّم الـ 14 صفحة.
5. **Session Completion Mini-Ritual** — تأكيد بصري عند إتقان tier كامل في صفحة.

**Upg.pace** هي الـ API الـ 25 — تتكامل مع `Upg.practice` (P4) بدون تداخل:
- `Upg.practice` يتتبع **محاولات الأسئلة** (effort).
- `Upg.pace` يتتبع **حالة الإتقان + جلسات التركيز** (mastery + focus).

---

## 📋 PRE-FLIGHT

```
📋 PHASE 6 PRE-FLIGHT
├─ Phase: 6/6 — Session Pacing & Mastery Markers (FINAL Worker 17 phase)
├─ Estimated lines: ~520
├─ Files to touch:
│   ├─ platform/index.html       (WRAP pacing chips + progress bars + mastery heatmap)
│   ├─ platform/assets/style.css (APPEND ~220 lines)
│   └─ platform/assets/app.js    (APPEND ~200 lines — Upg.pace IIFE)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '<section class="page"'           → 16
│   ├─ grep -c 'qcalc'                            → 391
│   ├─ grep -oE 'window\.Upg\.[a-z]+' | sort -u | wc -l  → 24
│   ├─ grep -c '<section class="block-practice"' → 60-65 (P4)
│   ├─ grep -c 'data-related='                    → 230-260 (P5)
│   └─ grep -c '<aside class="block-tldr"'       → 145-160 (P2)
├─ Branch: continue worker-17-resonance
└─ This phase adds 25th Upg.* API.
```

---

## 🧱 خطوات التنفيذ (بالترتيب)

### Step 1 — Pacing Chip Anatomy

يُوضَع داخل header الـ block (أو قبله مباشرة). يظهر فقط على blocks بـ `data-est-minutes >= 6`:

```html
<div class="block-pacing"
     data-pacing-for="cc-014"
     data-block-est="15">

  <div class="block-pacing-mastery">
    <button class="mastery-toggle"
            type="button"
            data-mastery-for="cc-014"
            data-mastery-state="not-started"
            aria-label="حالة الإتقان">
      <span class="mastery-icon" aria-hidden="true">○</span>
      <span class="mastery-label">لم أبدأ</span>
    </button>
  </div>

  <div class="block-pacing-timer">
    <span class="block-pacing-timer-label type-eyebrow">جلسة تركيز:</span>
    <div class="focus-presets" role="group" aria-label="اختر مدة التركيز">
      <button class="focus-preset"
              type="button"
              data-focus-minutes="15"
              data-focus-for="cc-014">15م</button>
      <button class="focus-preset"
              type="button"
              data-focus-minutes="25"
              data-focus-for="cc-014">25م</button>
      <button class="focus-preset"
              type="button"
              data-focus-minutes="45"
              data-focus-for="cc-014">45م</button>
    </div>
    <span class="focus-active" data-focus-active-for="cc-014" hidden>
      <span class="focus-active-time" data-focus-time>00:00</span>
      <button class="focus-stop" type="button" data-focus-stop>إيقاف</button>
    </span>
  </div>

</div>
```

**Mastery states (3 حالات):**

| Value | Icon | Label | Color |
|---|---|---|---|
| `not-started` | ○ | لم أبدأ | grey |
| `in-progress` | ◐ | أعمل عليه | amber |
| `mastered` | ● | أتقنته | green |

كل ضغطة على الزر تُدوّر الحالات: `not-started → in-progress → mastered → not-started`.

### Step 2 — Per-Page Progress Bar

يُوضَع داخل `<header class="page-h">` لكل صفحة محتوى (بعد العنوان، قبل الـ lede).

```html
<div class="page-mastery-progress" data-page-progress="callcenter">
  <div class="page-mastery-progress-meta">
    <span class="type-eyebrow">تقدّم الإتقان</span>
    <span class="type-num">
      <span data-page-mastered-count="0">0</span> /
      <span data-page-total-count="40">40</span> blocks
    </span>
    <span class="type-num" aria-hidden="true">·</span>
    <span class="type-num">
      <span data-page-mastered-pct="0">0</span>%
    </span>
  </div>
  <div class="page-mastery-progress-bar"
       role="progressbar"
       aria-valuemin="0"
       aria-valuemax="100"
       aria-valuenow="0">
    <div class="page-mastery-progress-fill"
         style="--progress: 0%"
         data-page-progress-fill></div>
  </div>
  <div class="page-mastery-progress-tiers">
    <span class="tier-marker tier-marker--foundation">
      <span data-tier-foundation-mastered>0</span> / <span data-tier-foundation-total>15</span>
    </span>
    <span class="tier-marker tier-marker--practitioner">
      <span data-tier-practitioner-mastered>0</span> / <span data-tier-practitioner-total>18</span>
    </span>
    <span class="tier-marker tier-marker--expert">
      <span data-tier-expert-mastered>0</span> / <span data-tier-expert-total>7</span>
    </span>
  </div>
</div>
```

> Counts تُحسَب ديناميكياً من قبل `Upg.pace.refreshPageProgress(pageId)`.

### Step 3 — Mastery Heatmap في page-myprogress

أضف بعد المحتوى الموجود في page-myprogress:

```html
<section class="mp-heatmap-section">
  <header class="page-h" style="margin-block-start: var(--space-6);">
    <span class="type-eyebrow">إتقان شامل</span>
    <h2 class="type-display">خريطة الإتقان</h2>
    <p class="type-body-lead">تابع تقدمك عبر الـ 14 صفحة محتوى.</p>
  </header>

  <div class="mastery-heatmap" data-mastery-heatmap-root>
    <!-- Rendered by Upg.pace.renderHeatmap() -->
  </div>

  <div class="mastery-summary">
    <div class="mastery-stat">
      <span class="mastery-stat-label type-eyebrow">إجمالي البلوكات</span>
      <span class="mastery-stat-value type-num-display" data-mastery-total>0</span>
    </div>
    <div class="mastery-stat">
      <span class="mastery-stat-label type-eyebrow">أتقنته</span>
      <span class="mastery-stat-value type-num-display mastery-stat-value--mastered" data-mastery-mastered>0</span>
    </div>
    <div class="mastery-stat">
      <span class="mastery-stat-label type-eyebrow">قيد العمل</span>
      <span class="mastery-stat-value type-num-display mastery-stat-value--inprogress" data-mastery-inprogress>0</span>
    </div>
    <div class="mastery-stat">
      <span class="mastery-stat-label type-eyebrow">ساعات تركيز</span>
      <span class="mastery-stat-value type-num-display" data-mastery-focus-hours>0</span>
    </div>
  </div>
</section>
```

### Step 4 — `Upg.pace` IIFE في app.js

**APPEND** في النهاية:

```javascript
/* ════════════════════════════════════════════════════════════════
 * RESONANCE v2 — Worker 17 / Phase 6 — Upg.pace
 * 25th top-level Upg.* namespace.
 * Scope: mastery state per block + focus timer sessions + page progress.
 * Storage: localStorage (no telemetry, no sync).
 * ════════════════════════════════════════════════════════════════ */
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

  // ─── Storage ───────────────────────────────────────────────
  const readJSON = (k, fb = {}) => {
    try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fb; }
    catch (_) { return fb; }
  };
  const writeJSON = (k, v) => {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {}
  };

  // ─── Mastery API ───────────────────────────────────────────
  const getMastery = (blockId) => {
    if (!blockId) return 'not-started';
    const all = readJSON(MASTERY_KEY);
    return all[blockId] || 'not-started';
  };

  const setMastery = (blockId, state) => {
    if (!blockId || !STATES.includes(state)) return null;
    const all = readJSON(MASTERY_KEY);
    if (state === 'not-started') {
      delete all[blockId];
    } else {
      all[blockId] = state;
    }
    writeJSON(MASTERY_KEY, all);
    document.dispatchEvent(new CustomEvent('upg:pace:mastery', {
      detail: { blockId, state }
    }));
    return state;
  };

  const cycleMastery = (blockId) => {
    const cur = getMastery(blockId);
    const idx = STATES.indexOf(cur);
    const next = STATES[(idx + 1) % STATES.length];
    return setMastery(blockId, next);
  };

  // ─── Focus Log ─────────────────────────────────────────────
  const logFocus = (blockId, durationSec) => {
    if (!blockId || !durationSec) return;
    const log = readJSON(FOCUS_LOG_KEY, []);
    log.push({
      blockId,
      durationSec: Math.round(durationSec),
      startedAt: Date.now() - durationSec * 1000,
    });
    // Cap at 500 entries to avoid unbounded growth
    if (log.length > 500) log.shift();
    writeJSON(FOCUS_LOG_KEY, log);
    document.dispatchEvent(new CustomEvent('upg:pace:focus', {
      detail: { blockId, durationSec }
    }));
  };

  const totalFocusSeconds = () => {
    const log = readJSON(FOCUS_LOG_KEY, []);
    return log.reduce((s, e) => s + (e.durationSec || 0), 0);
  };

  // ─── Page Progress ─────────────────────────────────────────
  const refreshPageProgress = (pageId) => {
    const root = document.querySelector(`[data-page-progress="${pageId}"]`);
    if (!root) return null;
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

    return { total, mastered, pct, tiers };
  };

  const refreshAllProgress = () => {
    document.querySelectorAll('[data-page-progress]').forEach((el) => {
      const pageId = el.getAttribute('data-page-progress');
      refreshPageProgress(pageId);
    });
  };

  // ─── Heatmap render ─────────────────────────────────────────
  const renderHeatmap = () => {
    const root = document.querySelector('[data-mastery-heatmap-root]');
    if (!root) return;
    const PAGES = [
      'callcenter', 'fieldsales', 'accountmgr', 'social', 'lab',
      'psych', 'eq', 'negotiation', 'customercare', 'programming',
      'accounting', 'phonerepair', 'hrmastery'
    ];
    let html = '<div class="heatmap-grid">';
    let grandTotal = 0, grandMastered = 0, grandInProg = 0;
    PAGES.forEach((p) => {
      const stats = refreshPageProgress(p) || { total: 0, mastered: 0, pct: 0 };
      // Count in-progress separately
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
      html += `
        <a class="heatmap-cell" href="#page-${p}" data-heatmap-pct="${stats.pct}">
          <span class="heatmap-cell-name">${p}</span>
          <span class="heatmap-cell-fill" style="--progress: ${stats.pct}%"></span>
          <span class="heatmap-cell-meta">
            <span class="type-num">${stats.mastered}/${stats.total}</span>
            <span class="type-num">${stats.pct}%</span>
          </span>
        </a>
      `;
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

  // ─── DOM bindings ──────────────────────────────────────────
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
        // Refresh page progress if visible
        const page = btn.closest('.page');
        if (page) {
          const pageId = page.id.replace(/^page-/, '');
          refreshPageProgress(pageId);
        }
      });
    });
  };

  // ─── Focus timer ───────────────────────────────────────────
  const activeTimers = new Map();

  const startFocus = (blockId, minutes) => {
    if (!blockId || !minutes) return;
    stopFocus(blockId); // clear previous if any
    const seconds = minutes * 60;
    const startTime = Date.now();
    let remaining = seconds;
    const activeUI = document.querySelector(`[data-focus-active-for="${blockId}"]`);
    const timeEl = activeUI?.querySelector('[data-focus-time]');
    if (activeUI) activeUI.hidden = false;
    const presetGroup = activeUI?.parentElement?.querySelector('.focus-presets');
    if (presetGroup) presetGroup.style.display = 'none';

    const fmt = (s) => {
      const m = Math.floor(s / 60);
      const r = s % 60;
      return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
    };

    if (timeEl) timeEl.textContent = fmt(remaining);

    const tick = () => {
      remaining = seconds - Math.floor((Date.now() - startTime) / 1000);
      if (remaining <= 0) {
        if (timeEl) timeEl.textContent = '00:00';
        finishFocus(blockId, seconds);
        return;
      }
      if (timeEl) timeEl.textContent = fmt(remaining);
    };

    const intervalId = setInterval(tick, 1000);
    activeTimers.set(blockId, { intervalId, startTime, seconds, presetGroup, activeUI });
  };

  const stopFocus = (blockId) => {
    const entry = activeTimers.get(blockId);
    if (!entry) return;
    clearInterval(entry.intervalId);
    const elapsed = Math.floor((Date.now() - entry.startTime) / 1000);
    if (elapsed >= 60) logFocus(blockId, elapsed); // log only if ≥ 1 min
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
    // Optional: dispatch sound completion if Upg.sound is enabled
    if (window.Upg?.sound?.enabled?.()) {
      window.Upg.sound.play('complete');
    }
    document.dispatchEvent(new CustomEvent('upg:pace:focus:complete', {
      detail: { blockId, durationSec: fullSeconds }
    }));
  };

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

  const init = () => {
    bindMasteryToggles();
    bindFocusButtons();
    refreshAllProgress();
    if (document.querySelector('#page-myprogress:not([hidden])')) renderHeatmap();
  };

  // Re-render heatmap when entering myprogress
  document.addEventListener('upg:nav:change', () => {
    if (document.querySelector('#page-myprogress:not([hidden])')) renderHeatmap();
  });

  // MutationObserver
  const observer = new MutationObserver(() => init());
  if (document.readyState !== 'loading') {
    init();
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  // Public API
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
```

### Step 5 — CSS Implementation

**APPEND** في style.css:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Worker 17 / Phase 6 — Pacing & Mastery
   ════════════════════════════════════════════════════════════════ */

/* ─── Per-block pacing chip ─── */
.block-pacing {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  margin-block: var(--space-2);
  background: color-mix(in oklch, var(--color-surface-2) 65%, transparent);
  border-radius: var(--block-aside-radius);
  font-size: var(--text-xs);
  flex-wrap: wrap;
}

.block-pacing-mastery,
.block-pacing-timer {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

/* Mastery toggle */
.mastery-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  padding: 0.3em 0.7em;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 0.4rem;
  font-family: var(--type-voice-ui);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  transition:
    background var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

.mastery-toggle:hover {
  background: var(--color-surface-2);
}

.mastery-toggle:focus-visible {
  outline: 2px solid var(--color-tint, var(--color-brand));
  outline-offset: 2px;
}

.mastery-toggle[data-mastery-state="not-started"] {
  color: var(--color-text-faint);
}

.mastery-toggle[data-mastery-state="in-progress"] {
  background: color-mix(in oklch, oklch(72% 0.15 60) 18%, var(--color-surface-1));
  border-color: oklch(60% 0.15 60);
  color: var(--color-text);
}

.mastery-toggle[data-mastery-state="mastered"] {
  background: color-mix(in oklch, oklch(72% 0.13 150) 22%, var(--color-surface-1));
  border-color: oklch(55% 0.16 150);
  color: var(--color-text);
}

.mastery-icon {
  font-family: var(--type-voice-numeric);
  font-size: 1em;
}

/* Focus timer */
.block-pacing-timer-label {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}

.focus-presets {
  display: inline-flex;
  gap: 0.3em;
}

.focus-preset {
  padding: 0.25em 0.6em;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 0.3rem;
  font-family: var(--type-voice-numeric);
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-out);
}

.focus-preset:hover {
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 15%, var(--color-surface-1));
}

.focus-preset:focus-visible {
  outline: 2px solid var(--color-tint, var(--color-brand));
  outline-offset: 1px;
}

.focus-active {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.3em 0.6em;
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 15%, var(--color-surface-1));
  border: 1px solid color-mix(in oklch, var(--color-tint, var(--color-brand)) 40%, var(--color-border));
  border-radius: 0.4rem;
  font-family: var(--type-voice-numeric);
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.focus-active-time {
  color: var(--color-text);
  letter-spacing: 0.02em;
}

.focus-stop {
  padding: 0.15em 0.5em;
  background: transparent;
  border: 1px solid color-mix(in oklch, var(--color-border) 70%, transparent);
  border-radius: 0.3rem;
  font-family: var(--type-voice-ui);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  cursor: pointer;
}

.focus-stop:hover { color: var(--color-text); }

/* ─── Per-page progress bar ─── */
.page-mastery-progress {
  margin-block: var(--space-3);
  padding: var(--space-2) var(--space-3);
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--block-aside-radius);
}

.page-mastery-progress-meta {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  font-size: var(--text-sm);
  margin-block-end: var(--space-1);
}

.page-mastery-progress-bar {
  width: 100%;
  height: 6px;
  background: color-mix(in oklch, var(--color-surface-2) 80%, transparent);
  border-radius: 3px;
  overflow: hidden;
}

.page-mastery-progress-fill {
  height: 100%;
  width: var(--progress, 0%);
  background: linear-gradient(
    90deg,
    var(--tier-foundation),
    var(--tier-practitioner) 50%,
    var(--tier-expert)
  );
  transition: width var(--duration-base) var(--ease-out);
  border-radius: 3px;
}

.page-mastery-progress-tiers {
  display: flex;
  gap: var(--space-3);
  margin-block-start: var(--space-1);
  font-size: var(--text-xs);
  color: var(--color-text-faint);
  font-feature-settings: "tnum" 1, "lnum" 1;
}

.tier-marker {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
}

.tier-marker::before {
  content: "";
  display: inline-block;
  width: 0.7em;
  height: 0.7em;
  border-radius: 0.15em;
}

.tier-marker--foundation::before   { background: var(--tier-foundation); }
.tier-marker--practitioner::before { background: var(--tier-practitioner); }
.tier-marker--expert::before       { background: var(--tier-expert); }

/* ─── Mastery Heatmap (in page-myprogress) ─── */
.mp-heatmap-section {
  margin-block-start: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-2);
}

.heatmap-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-2);
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--block-aside-radius);
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  transition: transform var(--duration-fast) var(--ease-spring);
}

.heatmap-cell:hover {
  transform: translateY(-2px);
}

.heatmap-cell:focus-visible {
  outline: 2px solid var(--color-tint, var(--color-brand));
  outline-offset: 2px;
}

.heatmap-cell-fill {
  position: absolute;
  inset-inline-start: 0;
  bottom: 0;
  height: 4px;
  width: var(--progress, 0%);
  background: linear-gradient(90deg, var(--tier-foundation), var(--tier-expert));
  border-radius: 0 0 var(--block-aside-radius) var(--block-aside-radius);
  transition: width var(--duration-base) var(--ease-out);
}

.heatmap-cell-name {
  font-family: var(--type-voice-display);
  font-weight: 700;
  text-transform: capitalize;
}

.heatmap-cell-meta {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* Mastery summary stats */
.mastery-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--space-2);
  margin-block-start: var(--space-3);
}

.mastery-stat {
  padding: var(--space-2);
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--block-aside-radius);
  text-align: center;
}

.mastery-stat-label {
  display: block;
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
  margin-block-end: var(--space-1);
}

.mastery-stat-value {
  display: block;
  font-family: var(--type-voice-numeric);
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-weight: 700;
  font-size: var(--text-2xl);
  color: var(--color-text);
}

.mastery-stat-value--mastered   { color: oklch(55% 0.16 150); }
.mastery-stat-value--inprogress { color: oklch(62% 0.16 60); }

/* ─── Mobile ─── */
@media (max-width: 480px) {
  .block-pacing {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-2);
  }
  .focus-presets { flex-wrap: wrap; }
  .heatmap-grid { grid-template-columns: 1fr; }
}

/* ─── Print ─── */
@media print {
  .block-pacing,
  .focus-presets,
  .focus-active,
  .page-mastery-progress-bar { display: none; }
  .heatmap-cell { background: transparent; border: 1px solid #000; }
}

/* ─── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
  .heatmap-cell,
  .page-mastery-progress-fill,
  .heatmap-cell-fill,
  .mastery-toggle,
  .focus-preset {
    transition: none;
  }
  .heatmap-cell:hover { transform: none; }
}

/* ════════════════════════════════════════════════════════════════
   Discipline Comment — Worker 17 / Phase 6 (FINAL)
   1. Pacing chip ONLY shown on blocks with data-est-minutes >= 6.
   2. Mastery has 3 states. Cycle on click. localStorage persistent.
   3. Focus timer: 15/25/45 only. Logs ≥ 1 min sessions.
   4. If Upg.sound enabled, focus completion plays 'complete' synth.
   5. Page progress bar always present in page-h.
   6. Heatmap rendered in page-myprogress only.
   7. Upg.pace is 25th and final Upg.* API for Worker 17.
   8. Zero telemetry. Zero sync. Local-only.
   ════════════════════════════════════════════════════════════════ */
```

### Step 6 — Distribution

| Element | Count |
|---|---:|
| `block-pacing` chips (blocks with est-minutes ≥ 6) | ~280 |
| `mastery-toggle` buttons | ~280 (one per pacing chip) |
| `page-mastery-progress` bars | 14 (one per content page) |
| Mastery heatmap | 1 (in page-myprogress) |
| Mastery summary stats | 4 (total / mastered / in-progress / focus-hours) |

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 16
grep -c 'qcalc' platform/index.html                   # → 391

# Prior phases preserved
grep -c '<aside class="block-tldr"' platform/index.html  # → 145-160 (P2)
grep -c '<details class="block-pitfalls"' platform/index.html # → 80-95 (P3)
grep -c '<section class="block-practice"' platform/index.html # → 60-65 (P4)
grep -c 'data-related=' platform/index.html              # → 230-260 (P5)

# New additions
grep -c 'class="block-pacing"' platform/index.html       # → 270-300
grep -c 'mastery-toggle' platform/index.html             # → 270-300
grep -c 'data-page-progress=' platform/index.html        # → 14
grep -c 'mastery-heatmap' platform/index.html            # → 1
grep -c 'window.Upg.pace' platform/assets/app.js         # → ≥1

# API count
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 25

# Functional check (manual in browser):
# 1. Click mastery toggle → cycles 3 states, persists.
# 2. Click 25m focus → starts countdown, shows mm:ss.
# 3. Stop focus mid-session → logs if ≥ 1 min.
# 4. Toggle 5 blocks to mastered → page progress bar updates live.
# 5. Visit page-myprogress → heatmap renders all 14 pages.
# 6. Upg.pace.totalFocusSeconds() → returns total seconds.
```

---

## ✅ معايير القبول (Phase 6)

- [ ] ~280 `block-pacing` chip مضاف على blocks بـ est-minutes ≥ 6.
- [ ] mastery toggle بـ 3 states يشتغل ويُحفَظ.
- [ ] focus timer (15/25/45) يشتغل، يُحفَظ في log عند ≥ 1 min.
- [ ] 14 per-page progress bar يتحدّث ديناميكياً.
- [ ] Mastery heatmap في page-myprogress يُرسَم على نقل.
- [ ] 4 mastery summary stats صحيحة.
- [ ] `Upg.pace` IIFE مكتوب، Object.freeze.
- [ ] التكامل مع `Upg.sound` (لو enabled، يلعب 'complete' عند انتهاء focus).
- [ ] CustomEvents `upg:pace:mastery` و `upg:pace:focus` و `upg:pace:focus:complete` تُرسَل.
- [ ] لا تعديل أي IIFE موجودة (W17 P4 Upg.practice + 23 prior APIs).
- [ ] لا تعديل نص محتوى block واحد.
- [ ] Console: 0 errors.
- [ ] grep counts الـ 16/391 محفوظة. APIs = 25.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/index.html platform/assets/style.css platform/assets/app.js
git commit -m "phase 6 (resonance): session pacing & mastery markers — ~280 pacing chips with 3-state mastery + focus timer (15/25/45) + 14 per-page progress bars + heatmap in page-myprogress + Upg.pace IIFE (25th API). Worker 17 final phase — closes CONTENT REVIVAL."
# push immediately

# update state/PROGRESS.json + snapshot
git add state/PROGRESS.json state/snapshots/worker-17-phase-6.json
git commit -m "state: resonance phase 6 committed and pushed — Worker 17 complete"
# push immediately
```

### 🔀 Pull Request (Worker 17 finale)

بعد آخر commit:

```
gh pr create \
  --title "feat: Worker 17 — CONTENT REVIVAL RESONANCE (phases 6/6)" \
  --body "<see Worker index for summary structure>" \
  --base main \
  --head worker-17-resonance
```

— نهاية Phase 6. نهاية Worker 17.

🎵 **Resonance check:** هل المحتوى صار **يأخذ بيد الـ user** من البداية حتى الإتقان؟ نعم →
- اطلب من المستخدم مراجعة الـ PR ودمجه.
- بعد الدمج: شغّل `CONTENT_REORDER_RITUAL` لإعادة ترتيب DOM في 3 tiers (يستهلك data-difficulty + data-prereq + data-est-minutes الذين أضافهم Worker 17).
- ثم Worker 18 (LEARNING_SHELL) يستهلك Upg.practice و Upg.pace.
