/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-39.js
   Extracted from app.js lines 13306-13664
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  // Dispatch upg:page-shown after navigateTo (so cmdk + dashboard can react)
  const wrapNav = () => {
    if (typeof window.navigateTo !== 'function') {
      setTimeout(wrapNav, 50);
      return;
    }
    if (window.navigateTo.__cathedralWrapped) return;
    const orig = window.navigateTo;
    const wrapped = function (pageId) {
      orig.call(this, pageId);
      try { window.dispatchEvent(new CustomEvent('upg:page-shown', { detail: { page: pageId } })); }
      catch (e) { /* noop */ }
    };
    wrapped.__cathedralWrapped = true;
    window.navigateTo = wrapped;
  };
  wrapNav();

  // ─── Helpers ───
  const animateNumber = (el, target, opts = {}) => {
    target = +target || 0;
    const start = +(el.textContent || '0').replace(/[^\d.-]/g, '') || 0;
    const dur = opts.duration ?? 600;
    const t0  = performance.now();
    const isFloat = !Number.isInteger(target) || opts.float;
    if (typeof requestAnimationFrame !== 'function') { el.textContent = isFloat ? target.toFixed(1) : Math.round(target); return; }
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      const cur = start + (target - start) * eased;
      el.textContent = isFloat ? cur.toFixed(1) : Math.round(cur);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const activityIcon = (t) => ({
    navigate:        'chevron-right',
    lesson_complete: 'check-circle',
    session_end:     'check',
    session_tick:    'trending-up',
    quiz_finished:   'star',
  })[t] || 'sparkles';
  const activityLabel = (a) => {
    if (a.type === 'navigate')        return `زيارة <strong>${escapeHtml(a.payload?.page || '—')}</strong>`;
    if (a.type === 'lesson_complete') return `إكمال درس${a.payload?.ref ? ` <strong>${escapeHtml(a.payload.ref)}</strong>` : ''}`;
    if (a.type === 'session_end')     return `انتهاء جلسة (${a.payload?.minutes || 0} دقيقة)`;
    if (a.type === 'session_tick')    return `تدريب نشط (${a.payload?.minutes || 0} د)`;
    if (a.type === 'quiz_finished')   return `إنهاء تقييم${a.payload?.score ? ` بـ ${a.payload.score}` : ''}`;
    return escapeHtml(a.type);
  };
  const relTime = (ts) => {
    const diff = Date.now() - ts;
    if (diff < 0) return 'الآن';
    if (diff < 60_000)        return 'الآن';
    if (diff < 3_600_000)     return `قبل ${Math.round(diff/60000)} د`;
    if (diff < 86_400_000)    return `قبل ${Math.round(diff/3600000)} س`;
    if (diff < 30 * 86_400_000) return `قبل ${Math.round(diff/86400000)} يوم`;
    return new Date(ts).toLocaleDateString('ar-IQ', { year:'numeric', month:'short', day:'numeric' });
  };
  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  const profileInitial = (p) => {
    if (!p?.name) return 'U';
    return String(p.name).trim().charAt(0).toUpperCase() || 'U';
  };

  // ─── Stats / profile bindings (works across both pages) ───
  const renderBindings = (root = document) => {
    if (!window.Upg?.state) return;
    const c = window.Upg.state.compute;
    const p = window.Upg.state.profile();

    root.querySelectorAll('[data-cath-stat]').forEach(el => {
      const key = el.dataset.cathStat;
      if (typeof c[key] === 'function') animateNumber(el, c[key]());
    });
    root.querySelectorAll('[data-cath-bind]').forEach(el => {
      const key = el.dataset.cathBind;
      if (key === 'profile.name')      el.textContent = p?.name || 'صديقي';
      if (key === 'profile.initial')   el.textContent = profileInitial(p);
      if (key === 'profile.role')      el.textContent = p?.role ? p.role : 'متدرّب';
      if (key === 'profile.streakLine') {
        const s = c.streak();
        el.textContent = s > 0
          ? `لديك streak من ${s} ${s === 1 ? 'يوم' : 'أيام'} 🔥 — استمر!`
          : 'ابدأ اليوم وكوّن streak جديد!';
      }
    });
  };

  // ─── Skill grid ───
  const renderSkillGrid = (containerId) => {
    const grid = document.getElementById(containerId);
    if (!grid || !window.Upg?.state) return;
    const list = window.Upg.state.compute.workerStats();
    grid.innerHTML = list.map(w => `
      <button class="cath-skill" type="button" data-page="${escapeHtml(w.id)}" aria-label="${escapeHtml(w.name)} (${w.pct}%)">
        <div class="cath-skill-ring" style="--p:${w.pct}">
          <i class="qi qi-md" data-icon="${escapeHtml(w.icon)}"></i>
        </div>
        <span class="cath-skill-name">${escapeHtml(w.name)}</span>
        <span class="cath-skill-pct">${w.pct}%</span>
      </button>`).join('');
    window.Upg?.icons?.renderAll?.(grid);
  };

  // ─── Activity list (dashboard) ───
  const renderActivityList = (listId, limit = 10) => {
    const list = document.getElementById(listId);
    if (!list || !window.Upg?.state) return;
    const items = window.Upg.state.activity().slice(0, limit);
    if (!items.length) {
      list.innerHTML = `<li class="cath-activity-empty">ابدأ التفاعل مع المنصة لتتبّع نشاطك.</li>`;
      return;
    }
    list.innerHTML = items.map(a => `
      <li>
        <i class="qi" data-icon="${escapeHtml(activityIcon(a.type))}"></i>
        <span>${activityLabel(a)}</span>
        <time datetime="${new Date(a.ts).toISOString()}">${escapeHtml(relTime(a.ts))}</time>
      </li>`).join('');
    window.Upg?.icons?.renderAll?.(list);
  };

  // ─── Drafts list (myprogress) ───
  const renderDraftsList = () => {
    const list = document.getElementById('my-drafts-list');
    if (!list || !window.Upg?.state) return;
    const d = window.Upg.state.drafts();
    const items = [];
    Object.entries(d).forEach(([category, arr]) => {
      if (!Array.isArray(arr)) return;
      const count = arr.length;
      if (count > 0) items.push({ category, count });
    });
    if (!items.length) {
      list.innerHTML = `<li class="cath-activity-empty">لا توجد مسوّدات محفوظة بعد.</li>`;
      return;
    }
    const labels = {
      pitch:'عروض بيع', salary:'مفاوضات راتب', tax:'حسابات ضريبة',
      portfolio:'بورتفوليو', statements:'قوائم مالية', pr:'حملات PR',
      calendar:'تقاويم', campaigns:'حملات', objections:'اعتراضات'
    };
    list.innerHTML = items.map(it => `
      <li>
        <i class="qi" data-icon="bookmark"></i>
        <span>${escapeHtml(labels[it.category] || it.category)}</span>
        <time>${it.count}</time>
      </li>`).join('');
    window.Upg?.icons?.renderAll?.(list);
  };

  // ─── Achievements (top scores) ───
  const renderAchievements = () => {
    const list = document.getElementById('my-achievements-list');
    if (!list || !window.Upg?.state) return;
    const s = window.Upg.state.scores();
    const flatten = (arr, label) => (arr || []).map(x => {
      const score = typeof x === 'number' ? x : (x?.score ?? x?.value);
      return Number.isFinite(score) ? { score, label, ts: x?.ts || 0 } : null;
    }).filter(Boolean);
    const all = [
      ...flatten(s.simulator, 'محاكي مكالمة'),
      ...flatten(s.objection, 'مدرب الاعتراض'),
      ...flatten(s.prLab, 'مختبر PR'),
      ...flatten(s.interviews, 'مقابلة عامة'),
      ...flatten(s.interviewsHr, 'مقابلة HR'),
    ].sort((a, b) => b.score - a.score).slice(0, 8);
    if (!all.length) {
      list.innerHTML = `<li class="cath-activity-empty">لا توجد درجات محفوظة بعد — جرّب المختبرات.</li>`;
      return;
    }
    list.innerHTML = all.map(a => `
      <li>
        <i class="qi" data-icon="trending-up"></i>
        <span>${escapeHtml(a.label)}</span>
        <time>${a.score}</time>
      </li>`).join('');
    window.Upg?.icons?.renderAll?.(list);
  };

  // ─── Activity chart (canvas, 30 days) ───
  const renderProgressChart = () => {
    const canvas = document.getElementById('progress-chart');
    if (!canvas || !window.Upg?.state) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || 600;
    const cssH = 180;
    canvas.width  = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.height = cssH + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const days = 30;
    const buckets = new Array(days).fill(0);
    const today = new Date(); today.setHours(0,0,0,0);
    window.Upg.state.activity().forEach(a => {
      const d = new Date(a.ts || 0); d.setHours(0,0,0,0);
      const diff = Math.round((today.getTime() - d.getTime()) / 86_400_000);
      if (diff >= 0 && diff < days) buckets[days - 1 - diff]++;
    });
    const max = Math.max(1, ...buckets);

    const styles = getComputedStyle(document.documentElement);
    const brandColor = styles.getPropertyValue('--color-brand').trim() || '#66FCF1';
    const trackColor = styles.getPropertyValue('--color-surface-2').trim() || 'rgba(255,255,255,0.06)';
    const axisColor  = styles.getPropertyValue('--color-text-faint').trim() || 'rgba(255,255,255,0.5)';

    const padX = 8, padTop = 14, padBottom = 18;
    const drawArea = cssH - padTop - padBottom;
    const barW = (cssW - padX * 2) / days;

    // Track + bars
    buckets.forEach((v, i) => {
      const x = padX + i * barW;
      ctx.fillStyle = trackColor;
      ctx.fillRect(x + 1, padTop, Math.max(1, barW - 2), drawArea);
      const h = (v / max) * drawArea;
      ctx.fillStyle = brandColor;
      ctx.fillRect(x + 1, padTop + (drawArea - h), Math.max(1, barW - 2), h);
    });

    // X axis labels (every 5 days)
    ctx.fillStyle = axisColor;
    ctx.font = '10px ui-sans-serif, system-ui, sans-serif';
    ctx.textAlign = 'center';
    for (let i = 0; i < days; i += 5) {
      const x = padX + i * barW + barW / 2;
      const d = new Date(today.getTime() - (days - 1 - i) * 86_400_000);
      ctx.fillText(`${d.getDate()}/${d.getMonth() + 1}`, x, cssH - 4);
    }
    // Total label
    ctx.textAlign = 'start';
    const total = buckets.reduce((s,v) => s+v, 0);
    ctx.fillText(`إجمالي: ${total} حدث`, padX, padTop - 4);
  };

  // ─── My-progress action handlers ───
  const wireMyProgressActions = () => {
    document.body.addEventListener('click', (e) => {
      const t = e.target.closest('[data-action="export-progress"]');
      if (t) { exportAllUpg(); }
      const i = e.target.closest('[data-action="import-progress"]');
      if (i) { importAllUpg(); }
      const r = e.target.closest('[data-action="reset-progress"]');
      if (r) { resetAllUpg(); }
    });
  };

  function exportAllUpg() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('upg_')) data[k] = localStorage.getItem(k);
    }
    const payload = { exported_at: new Date().toISOString(), version: 'cathedral-v14', data };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `upgrade-progress-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  function importAllUpg() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'application/json,.json';
    inp.addEventListener('change', () => {
      const file = inp.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          const data = parsed?.data || parsed;
          if (!data || typeof data !== 'object') throw new Error('bad payload');
          if (!confirm('سيتم استبدال بياناتك الحالية. متابعة؟')) return;
          Object.entries(data).forEach(([k, v]) => {
            if (k.startsWith('upg_')) localStorage.setItem(k, v);
          });
          location.reload();
        } catch (e) { alert('ملف غير صالح: ' + e.message); }
      };
      reader.readAsText(file);
    });
    inp.click();
  }
  function resetAllUpg() {
    if (!confirm('سيتم حذف كل تقدمك وبياناتك. هل أنت متأكد؟')) return;
    if (!confirm('تأكيد ثاني — هذا حذف نهائي.')) return;
    Object.keys(localStorage).filter(k => k.startsWith('upg_')).forEach(k => localStorage.removeItem(k));
    sessionStorage.clear();
    location.reload();
  }

  // ─── Render functions ───
  const renderDashboard = () => {
    const root = document.getElementById('page-dashboard');
    if (!root) return;
    renderBindings(root);
    renderSkillGrid('cath-skill-grid');
    renderActivityList('cath-activity-list', 10);
  };
  const renderMyProgress = () => {
    const root = document.getElementById('page-myprogress');
    if (!root) return;
    renderBindings(root);
    renderSkillGrid('cath-skill-grid-progress');
    renderDraftsList();
    renderAchievements();
    renderProgressChart();
  };

  const init = () => {
    wireMyProgressActions();
    renderDashboard();
    renderMyProgress();

    // Re-render on page navigation
    window.addEventListener('upg:page-shown', (e) => {
      const p = e.detail?.page;
      if (p === 'dashboard') renderDashboard();
      else if (p === 'myprogress') renderMyProgress();
    });

    // Re-render on profile/state changes
    window.addEventListener('upg:profile-ready', renderDashboard);
    window.Upg?.state?.on?.('change', () => {
      // Throttle re-renders
      cancelAnimationFrame(init.__rafId);
      init.__rafId = requestAnimationFrame(() => {
        renderDashboard();
        renderMyProgress();
      });
    });

    // Resize handler for chart
    let rT;
    window.addEventListener('resize', () => {
      clearTimeout(rT);
      rT = setTimeout(() => {
        if (!document.getElementById('page-myprogress')?.hidden &&
            document.getElementById('page-myprogress')?.classList.contains('active')) {
          renderProgressChart();
        }
      }, 180);
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
