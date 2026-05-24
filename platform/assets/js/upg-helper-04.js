/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-04.js
   Extracted from app.js lines 3804-4316
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ───────── Utilities ───────── */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const PHASE1 = {
    // Performance DNA axis config (Arabic labels + localStorage module keys)
    axes: [
      { label: 'الإقناع',  moduleKey: 'negotiation'  },
      { label: 'التواصل',  moduleKey: 'callcenter'   },
      { label: 'التحليل',  moduleKey: 'lab'          },
      { label: 'الضغط',    moduleKey: 'eq'           },
      { label: 'الانتماء', moduleKey: 'customercare' },
      { label: 'الإبداع',  moduleKey: 'social'       }
    ],
    // Quick-access module targets
    quickLinks: [
      { key: 'callcenter',  label: 'كول سنتر',       svg: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.94a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>' },
      { key: 'lab',         label: 'المختبر',         svg: '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>' },
      { key: 'negotiation', label: 'المفاوضات',      svg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 11l-4 4-2-2"/>' },
      { key: 'eq',          label: 'الذكاء العاطفي', svg: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' }
    ]
  };

  /* ───────── localStorage helpers (defensive) ───────── */
  function safeGet(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : v; }
    catch (_) { return fallback; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_) { /* ignore */ }
  }

  /* Read a module "score" from any existing v12 localStorage keys, else default 15 */
  function readModuleScore(moduleKey) {
    const candidates = [
      'v12_score_' + moduleKey,
      'v12_progress_' + moduleKey,
      'quiz_' + moduleKey + '_score',
      'page-' + moduleKey + '_progress'
    ];
    for (const k of candidates) {
      const raw = safeGet(k, null);
      if (raw == null) continue;
      const n = parseFloat(raw);
      if (!isNaN(n) && n >= 0 && n <= 100) return n;
    }
    return 15; // baseline so radar is never collapsed
  }

  /* ─────────────────────────────────────────────────
     PHASE 1A · BENTO GRID — Performance DNA Radar (SVG)
  ───────────────────────────────────────────────── */
  function buildRadarSVG(values /* 0..100 per axis */) {
    const size = 440;
    const cx = size / 2, cy = size / 2;
    const rMax = 150;
    const axes = PHASE1.axes;
    const N = axes.length; // 6 — hexagon
    // Axis angles: start from top (-90deg), go clockwise
    const angles = Array.from({ length: N }, (_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / N);

    const pt = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];

    // Concentric hex rings at 25/50/75/100%
    const rings = [0.25, 0.5, 0.75, 1].map(f => {
      const pts = angles.map(a => pt(rMax * f, a).map(n => n.toFixed(2)).join(',')).join(' ');
      return `<polygon class="${f === 1 ? 'p1-radar-grid' : 'p1-radar-grid-faint'}" points="${pts}"/>`;
    }).join('');

    // Axis lines
    const axesLines = angles.map(a => {
      const [x, y] = pt(rMax, a);
      return `<line class="p1-radar-axis" x1="${cx}" y1="${cy}" x2="${x.toFixed(2)}" y2="${y.toFixed(2)}"/>`;
    }).join('');

    // Data polygon
    const dataPts = values.map((v, i) => {
      const f = Math.max(0.05, Math.min(1, v / 100));
      return pt(rMax * f, angles[i]).map(n => n.toFixed(2)).join(',');
    }).join(' ');

    // Vertex dots
    const vertices = values.map((v, i) => {
      const f = Math.max(0.05, Math.min(1, v / 100));
      const [x, y] = pt(rMax * f, angles[i]);
      return `<circle class="p1-radar-vertex" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="4"/>`;
    }).join('');

    // Labels at rMax + 22
    const labels = axes.map((ax, i) => {
      const [x, y] = pt(rMax + 24, angles[i]);
      // Slight vertical tweak for top/bottom axis
      const anchor =
        Math.abs(Math.cos(angles[i])) < 0.15 ? 'middle' :
        Math.cos(angles[i]) > 0 ? 'start' : 'end';
      const strong = values[i] >= 60 ? ' strong' : '';
      return `<text class="p1-radar-label${strong}" x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}">${ax.label}</text>`;
    }).join('');

    return `
      <svg class="p1-radar" viewBox="0 0 ${size} ${size}" role="img" aria-label="مخطط أداء الحمض النووي الشخصي">
        ${rings}
        ${axesLines}
        <polygon class="p1-radar-area" points="${dataPts}"/>
        ${vertices}
        ${labels}
      </svg>
    `;
  }

  /* ─────────────────────────────────────────────────
     PHASE 1A · Activity Heatmap (52 × 7, GitHub-style)
  ───────────────────────────────────────────────── */
  function getOrSeedActivity() {
    const storageKey = 'p1_activity';
    let raw = safeGet(storageKey, null);
    if (raw) {
      try { const parsed = JSON.parse(raw); if (Array.isArray(parsed) && parsed.length === 364) return parsed; }
      catch (_) { /* regenerate */ }
    }
    // Deterministic seed from today so it doesn't reshuffle
    const today = new Date().toDateString();
    let seed = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const arr = Array.from({ length: 364 }, (_, i) => {
      // Lighter activity for very early weeks, denser near end
      const weight = i / 364;
      const r = rnd();
      if (r > 0.88 - weight * 0.35) return Math.min(4, Math.floor(r * 5) + (weight > 0.7 ? 1 : 0));
      if (r > 0.55)                 return 1;
      return 0;
    });
    safeSet(storageKey, JSON.stringify(arr));
    return arr;
  }

  function computeStreak(activity) {
    // Count trailing non-zero days
    let streak = 0;
    for (let i = activity.length - 1; i >= 0; i--) {
      if (activity[i] > 0) streak++; else break;
    }
    return streak;
  }

  function buildHeatmap(activity) {
    // 52 weeks × 7 days = 364 cells, column-first (each column is a week)
    let cells = '';
    for (let i = 0; i < activity.length; i++) {
      const lvl = activity[i] | 0;
      cells += `<div class="p1-heatmap-cellx" data-lvl="${lvl}" aria-hidden="true"></div>`;
    }
    return `<div class="p1-heatmap-grid">${cells}</div>`;
  }

  /* ─────────────────────────────────────────────────
     PHASE 1A · Bento Grid injection
  ───────────────────────────────────────────────── */
  function injectBentoGrid() {
    const dash = document.getElementById('page-dashboard');
    if (!dash || dash.querySelector('.p1-bento')) return; // idempotent

    // Collect data
    const values = PHASE1.axes.map(ax => readModuleScore(ax.moduleKey));
    const activity = getOrSeedActivity();
    const streak = computeStreak(activity);
    const activeDays = activity.reduce((a, v) => a + (v > 0 ? 1 : 0), 0);
    const masteredModules = values.filter(v => v >= 70).length;

    // Stat values (driven by simple aggregates of real module data)
    const avgScore = Math.round(values.reduce((a, v) => a + v, 0) / values.length);
    const completionPct = Math.min(100, Math.round(activeDays / 3.64));
    const totalHours = Math.round(activeDays * 0.6 * 10) / 10; // estimate

    const bentoHTML = `
      <section class="p1-bento" aria-label="لوحة الأداء التفصيلية">

        <!-- HERO · Performance DNA Radar -->
        <article class="p1-bento-cell p1-hero">
          <div class="p1-hero-head">
            <div>
              <div class="p1-hero-sub">Performance DNA · الحمض النووي للأداء</div>
              <div class="p1-hero-title">بصمتك المهنية</div>
            </div>
            <div class="p1-caption" style="color:var(--accent);">6 محاور</div>
          </div>
          <div class="p1-radar-wrap" id="p1-radar-wrap">
            ${buildRadarSVG(values)}
          </div>
        </article>

        <!-- STAT 1 -->
        <article class="p1-bento-cell p1-stat">
          <div class="p1-stat-foot" style="justify-content:flex-start; align-items:center;">
            <div class="p1-stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
          </div>
          <div class="p1-stat-value" id="p1-stat-avg">${avgScore}<span class="unit">%</span></div>
          <div class="p1-stat-foot">
            <div class="p1-stat-label">متوسط الأداء</div>
            <span class="p1-delta ${avgScore >= 50 ? 'up' : 'down'}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                ${avgScore >= 50 ? '<polyline points="18 15 12 9 6 15"/>' : '<polyline points="6 9 12 15 18 9"/>'}
              </svg>
              ${avgScore >= 50 ? '+' : '-'}${Math.abs(avgScore - 50)}
            </span>
          </div>
        </article>

        <!-- STAT 2 -->
        <article class="p1-bento-cell p1-stat">
          <div class="p1-stat-foot" style="justify-content:flex-start;">
            <div class="p1-stat-icon" aria-hidden="true" style="color:var(--p1-violet); background:rgba(139,92,246,0.12); border-color:rgba(139,92,246,0.22);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
          </div>
          <div class="p1-stat-value" id="p1-stat-completion">${completionPct}<span class="unit">%</span></div>
          <div class="p1-stat-foot">
            <div class="p1-stat-label">معدل الإتمام</div>
            <span class="p1-delta up">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"/></svg>
              ${activeDays} يوم
            </span>
          </div>
        </article>

        <!-- STAT 3 -->
        <article class="p1-bento-cell p1-stat">
          <div class="p1-stat-foot" style="justify-content:flex-start;">
            <div class="p1-stat-icon" aria-hidden="true" style="color:var(--p1-amber); background:rgba(245,158,11,0.12); border-color:rgba(245,158,11,0.22);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
          </div>
          <div class="p1-stat-value" id="p1-stat-hours">${totalHours}<span class="unit">س</span></div>
          <div class="p1-stat-foot">
            <div class="p1-stat-label">ساعات التدريب</div>
            <span class="p1-delta ${streak > 0 ? 'up' : 'flat'}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"/></svg>
              🔥 ${streak}
            </span>
          </div>
        </article>

        <!-- STAT 4 -->
        <article class="p1-bento-cell p1-stat">
          <div class="p1-stat-foot" style="justify-content:flex-start;">
            <div class="p1-stat-icon" aria-hidden="true" style="color:var(--p1-blue); background:rgba(14,165,233,0.12); border-color:rgba(14,165,233,0.22);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
          </div>
          <div class="p1-stat-value" id="p1-stat-mastered">${masteredModules}<span class="unit">/ ${PHASE1.axes.length}</span></div>
          <div class="p1-stat-foot">
            <div class="p1-stat-label">وحدات متقنة</div>
            <span class="p1-delta ${masteredModules > 0 ? 'up' : 'flat'}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              ${masteredModules > 0 ? 'ممتاز' : 'ابدأ'}
            </span>
          </div>
        </article>

        <!-- ACTIVITY HEATMAP -->
        <article class="p1-bento-cell p1-heatmap-cell">
          <div class="p1-heatmap-head">
            <div class="p1-heatmap-title-wrap">
              <div class="p1-heatmap-title">سجل النشاط السنوي</div>
              <div class="p1-heatmap-sub">52 أسبوعاً · ${activeDays} يوم نشاط</div>
            </div>
            <div class="p1-streak" title="السلسلة الحالية">
              <span>🔥 سلسلة</span>
              <span class="num" id="p1-streak-num">${streak}</span>
              <span>يوم</span>
            </div>
          </div>
          <div class="p1-heatmap-scroll">${buildHeatmap(activity)}</div>
          <div class="p1-heatmap-legend">
            <span>أقل</span>
            <span class="swatch" style="background:var(--p1-heat-0, rgba(255,255,255,0.04));"></span>
            <span class="swatch" style="background:var(--p1-heat-1, rgba(102,252,241,0.18));"></span>
            <span class="swatch" style="background:var(--p1-heat-2, rgba(102,252,241,0.42));"></span>
            <span class="swatch" style="background:var(--p1-heat-3, rgba(102,252,241,0.68));"></span>
            <span class="swatch" style="background:var(--p1-heat-4, var(--accent));"></span>
            <span>أكثر</span>
          </div>
        </article>

        <!-- QUICK ACCESS -->
        <article class="p1-bento-cell p1-quick-cell">
          <div class="p1-quick-title">وصول سريع</div>
          <div class="p1-quick-grid">
            ${PHASE1.quickLinks.map(ql => `
              <button class="p1-quick-btn"
                      type="button"
                      tabindex="0"
                      aria-label="${ql.label}"
                      data-quick-target="${ql.key}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${ql.svg}</svg>
                <span class="p1-quick-label">${ql.label}</span>
              </button>
            `).join('')}
          </div>
        </article>

      </section>
    `;

    // Place BEFORE .page-header so the bento grid is the first thing users see,
    // and all existing dashboard content below stays untouched.
    const header = dash.querySelector('.page-header');
    if (header) header.insertAdjacentHTML('beforebegin', bentoHTML);
    else        dash.insertAdjacentHTML('afterbegin', bentoHTML);

    // Wire quick-access buttons (click + keyboard)
    $$('#page-dashboard .p1-quick-btn').forEach(btn => {
      const target = btn.getAttribute('data-quick-target');
      const go = () => {
        try {
          if (typeof window.navigateTo === 'function')      window.navigateTo(target);
          else if (typeof window.navigatePage === 'function') window.navigatePage(target);
          else {
            const navEl = document.querySelector(`.nav-item[data-page="${target}"]`);
            if (navEl) navEl.click();
          }
        } catch (_) { /* fail silent */ }
      };
      btn.addEventListener('click', go);
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    });
  }

  /* Re-render radar from live module scores (called on dashboard re-entry) */
  function refreshRadar() {
    const wrap = document.getElementById('p1-radar-wrap');
    if (!wrap) return;
    const values = PHASE1.axes.map(ax => readModuleScore(ax.moduleKey));
    wrap.innerHTML = buildRadarSVG(values);
  }

  /* ─────────────────────────────────────────────────
     PHASE 1C · SIDEBAR UPGRADE
  ───────────────────────────────────────────────── */

  // Abstract Arabic monogram: overlapping أ + ت
  const MONOGRAM_SVG = `
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <defs>
        <linearGradient id="p1-mono-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stop-color="#66FCF1"/>
          <stop offset="100%" stop-color="#8B5CF6"/>
        </linearGradient>
      </defs>
      <!-- أ: vertical stroke with hamza dot -->
      <path d="M10 7 L10 25" stroke="url(#p1-mono-grad)"/>
      <circle cx="10" cy="4.4" r="1.4" fill="url(#p1-mono-grad)" stroke="none"/>
      <!-- ت: horizontal base + two dots above -->
      <path d="M6 19 L26 19" stroke="url(#p1-mono-grad)"/>
      <path d="M22 15 L22 25" stroke="url(#p1-mono-grad)"/>
      <circle cx="18" cy="13.5" r="1.2" fill="url(#p1-mono-grad)" stroke="none"/>
      <circle cx="24" cy="13.5" r="1.2" fill="url(#p1-mono-grad)" stroke="none"/>
    </svg>
  `;

  function upgradeSidebarLogo() {
    const logoIcon = document.querySelector('#sidebar .logo-icon');
    if (!logoIcon) return;
    logoIcon.classList.add('p1-monogram');
    logoIcon.innerHTML = MONOGRAM_SVG;
  }

  function upgradeUserAvatar() {
    const avatar = document.querySelector('#sidebar .user-avatar');
    if (!avatar) return;
    // Read initials from user-name or fallback to أح
    const nameEl = document.querySelector('#sidebar .user-name');
    const rawName = (nameEl && nameEl.textContent.trim()) || 'أحمد المدير';
    // Extract 2 first-letters from first two words (Arabic friendly)
    const parts = rawName.split(/\s+/).filter(Boolean);
    const initials = (parts[0] || '').slice(0, 1) + (parts[1] ? parts[1].slice(0, 1) : (parts[0] || '').slice(1, 2));
    const display = (initials || 'أح').slice(0, 2);

    avatar.classList.add('p1-avatar');
    avatar.innerHTML = `
      <svg viewBox="0 0 40 40" role="img" aria-label="صورة المستخدم">
        <defs>
          <linearGradient id="p1-avatar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"  stop-color="#66FCF1"/>
            <stop offset="60%" stop-color="#0EA5E9"/>
            <stop offset="100%" stop-color="#8B5CF6"/>
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="20" fill="url(#p1-avatar-grad)"/>
        <text x="20" y="25" text-anchor="middle"
              font-family="Cairo, sans-serif" font-size="14" font-weight="800"
              fill="#05060C">${display}</text>
      </svg>
    `;
  }

  function injectCollapseToggle() {
    const sidebar = document.getElementById('sidebar');
    const app     = document.getElementById('app');
    if (!sidebar || !app || sidebar.querySelector('.p1-collapse-btn')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'p1-collapse-btn';
    btn.tabIndex = 0;
    btn.setAttribute('aria-label', 'طي القائمة الجانبية');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    `;

    // Restore previous state
    if (safeGet('sidebar_collapsed', '0') === '1') {
      app.classList.add('p1-sidebar-collapsed');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.setAttribute('aria-pressed', 'false');
    }

    const toggle = () => {
      const collapsed = app.classList.toggle('p1-sidebar-collapsed');
      safeSet('sidebar_collapsed', collapsed ? '1' : '0');
      btn.setAttribute('aria-pressed', collapsed ? 'true' : 'false');
      btn.setAttribute('aria-label', collapsed ? 'توسيع القائمة الجانبية' : 'طي القائمة الجانبية');
    };
    btn.addEventListener('click', toggle);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    sidebar.appendChild(btn);
  }

  /* Today's Focus — injected above the user footer */
  function injectFocusWidget() {
    const footer = document.querySelector('#sidebar .sidebar-footer');
    if (!footer || document.querySelector('.p1-focus-widget')) return;

    // Find lowest-score module → that is today's focus
    const scored = PHASE1.axes
      .map(ax => ({ ...ax, score: readModuleScore(ax.moduleKey) }))
      .sort((a, b) => a.score - b.score);
    const pick = scored[0];

    const el = document.createElement('div');
    el.className = 'p1-focus-widget';
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', 'تركيز اليوم: ' + pick.label);
    el.innerHTML = `
      <div class="p1-focus-label">تركيز اليوم</div>
      <div class="p1-focus-title">${pick.label}</div>
      <div class="p1-focus-meta">الإتقان الحالي · ${Math.round(pick.score)}%</div>
    `;
    const go = () => {
      try {
        if (typeof window.navigateTo === 'function') window.navigateTo(pick.moduleKey);
        else {
          const navEl = document.querySelector(`.nav-item[data-page="${pick.moduleKey}"]`);
          if (navEl) navEl.click();
        }
      } catch (_) { /* silent */ }
    };
    el.addEventListener('click', go);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });

    footer.parentNode.insertBefore(el, footer);
  }

  /* ─────────────────────────────────────────────────
     INIT — lazy after first paint (per global perf rule)
  ───────────────────────────────────────────────── */
  function init() {
    try { upgradeSidebarLogo();      } catch (e) { console.warn('[P1] logo',    e); }
    try { upgradeUserAvatar();       } catch (e) { console.warn('[P1] avatar',  e); }
    try { injectCollapseToggle();    } catch (e) { console.warn('[P1] collapse',e); }
    try { injectFocusWidget();       } catch (e) { console.warn('[P1] focus',   e); }
    try { injectBentoGrid();         } catch (e) { console.warn('[P1] bento',   e); }

    // Refresh radar whenever the dashboard becomes active again
    try {
      const dashNav = document.querySelector('.nav-item[data-page="dashboard"]');
      if (dashNav) dashNav.addEventListener('click', () => setTimeout(refreshRadar, 50));
    } catch (_) { /* silent */ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 100));
  } else {
    setTimeout(init, 100);
  }

  // Expose small debug surface
  window.__PHASE1 = { refreshRadar, PHASE1 };
})();
