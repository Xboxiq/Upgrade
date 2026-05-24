/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-cmdk-1.js
   Extracted from app.js lines 12657-13086
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const init = () => {
    const palette = document.getElementById('cmdk-palette');
    const cheat   = document.getElementById('shortcut-cheatsheet');
    if (!palette || !cheat) {
      console.warn('[Upg.cmdk] overlays not present in DOM');
      return;
    }

    const input = palette.querySelector('.cmdk-input');
    const list  = palette.querySelector('.cmdk-results');
    const empty = palette.querySelector('.cmdk-empty');

    const isMac = (navigator.platform || '').toUpperCase().includes('MAC');
    const Mod = isMac ? '⌘' : 'Ctrl';

    // ─── Page registry (matches nav-item data-page values) ───
    const PAGES = [
      { id: 'dashboard',    title: 'لوحة التحكم',           icon: 'layout-dashboard' },
      { id: 'callcenter',   title: 'الكول سنتر',            icon: 'phone' },
      { id: 'fieldsales',   title: 'المبيعات الميدانية',    icon: 'briefcase' },
      { id: 'accountmgr',   title: 'Account Manager',       icon: 'user-tie' },
      { id: 'social',       title: 'السوشيال ميديا',        icon: 'megaphone' },
      { id: 'lab',          title: 'مختبر السيناريوهات',    icon: 'flask-conical' },
      { id: 'psych',        title: 'الدوافع النفسية',       icon: 'brain' },
      { id: 'eq',           title: 'الذكاء العاطفي',        icon: 'heart-handshake' },
      { id: 'customercare', title: 'خدمة العملاء',          icon: 'headphones' },
      { id: 'programming',  title: 'البرمجة',               icon: 'code' },
      { id: 'accounting',   title: 'المحاسبة',              icon: 'calculator' },
      { id: 'phonerepair',  title: 'صيانة الهاتف',          icon: 'wrench' },
      { id: 'negotiation',  title: 'المفاوضات',             icon: 'heart-handshake' },
      { id: 'hrmastery',    title: 'إتقان مقابلات HR',      icon: 'briefcase' },
    ];

    const goCalc = (calcName, pageId) => () => {
      window.navigateTo?.(pageId);
      setTimeout(() => {
        const el = document.querySelector(`[data-calc="${calcName}"]`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el?.querySelector('input')?.focus();
      }, 220);
    };

    const commands = [
      // Navigation
      ...PAGES.map(p => ({
        group: 'انتقال',
        title: `الانتقال إلى ${p.title}`,
        hint: `Go → ${p.id}`,
        icon: p.icon,
        tags: ['go', 'navigate', 'open', p.id, p.title, 'انتقال'],
        action: () => window.navigateTo?.(p.id)
      })),

      // Theme
      { group: 'الثيم', title: 'تبديل الثيم (دورة)',
        icon: 'sun', tags: ['theme', 'toggle', 'اللون', 'ثيم', 'فاتح', 'مظلم'],
        action: () => window.Upg?.theme?.cycle?.(), shortcut: ['T'] },
      { group: 'الثيم', title: 'الثيم: تلقائي (Auto)',
        icon: 'monitor', tags: ['theme', 'auto', 'system', 'تلقائي'],
        action: () => window.Upg?.theme?.set?.('auto') },
      { group: 'الثيم', title: 'الثيم: مظلم (Dark)',
        icon: 'moon', tags: ['theme', 'dark', 'مظلم', 'ليلي'],
        action: () => window.Upg?.theme?.set?.('dark') },
      { group: 'الثيم', title: 'الثيم: فاتح (Light)',
        icon: 'sun', tags: ['theme', 'light', 'فاتح', 'نهاري'],
        action: () => window.Upg?.theme?.set?.('light') },

      // Calculators (qcalc)
      { group: 'حاسبات', title: 'حاسبة ضريبة الدخل العراقية',
        icon: 'calculator', tags: ['tax', 'iraq', 'ضريبة', 'دخل', '113'],
        action: goCalc('iraq-tax', 'accounting') },
      { group: 'حاسبات', title: 'قسيمة الراتب الشهري',
        icon: 'briefcase', tags: ['salary', 'payslip', 'راتب', 'قسيمة'],
        action: goCalc('salary-slip', 'accounting') },
      { group: 'حاسبات', title: 'حاسبة العمولة و الـ OTE',
        icon: 'trending-up', tags: ['commission', 'sales', 'ote', 'عمولة'],
        action: goCalc('sales-commission', 'fieldsales') },
      { group: 'حاسبات', title: 'مؤشّر أداء الكول سنتر (APIndex)',
        icon: 'gauge', tags: ['apindex', 'kpi', 'callcenter', 'مؤشر', 'أداء'],
        action: goCalc('apindex', 'callcenter') },
      { group: 'حاسبات', title: 'حاسبة حجم العينة لاختبار A/B',
        icon: 'bar-chart', tags: ['ab', 'test', 'sample', 'experiment', 'تجربة'],
        action: goCalc('ab-test', 'social') },
      { group: 'حاسبات', title: 'محلّل ZOPA و BATNA',
        icon: 'heart-handshake', tags: ['batna', 'zopa', 'تفاوض', 'مفاوضات', 'negotiation'],
        action: goCalc('batna', 'negotiation') },
      { group: 'حاسبات', title: 'مُقدِّر تكلفة Big-O',
        icon: 'line-chart', tags: ['bigo', 'algorithm', 'complexity', 'تعقيد', 'برمجة'],
        action: goCalc('bigo-cost', 'programming') },
      { group: 'حاسبات', title: 'مؤشّر OCEAN — Big Five',
        icon: 'brain', tags: ['bigfive', 'ocean', 'شخصية', 'psych'],
        action: goCalc('bigfive-score', 'psych') },

      // Data
      { group: 'البيانات', title: 'تصدير كل التقدم (JSON)',
        icon: 'download', tags: ['export', 'backup', 'json', 'تصدير', 'نسخ'],
        action: () => exportAll() },
      { group: 'البيانات', title: 'استيراد ملف تقدم (JSON)',
        icon: 'upload', tags: ['import', 'restore', 'استعادة', 'استيراد'],
        action: () => importAll() },
      { group: 'البيانات', title: 'إعادة تعيين كل التقدم (حذف)',
        icon: 'trash', tags: ['reset', 'clear', 'wipe', 'حذف', 'إعادة'],
        action: () => resetAll() },

      // System
      { group: 'النظام', title: 'قفل المنصة',
        icon: 'lock', tags: ['lock', 'logout', 'idle', 'قفل'],
        action: () => { sessionStorage.removeItem('upg_unlocked'); window.Upg?.gateway?.lock?.(); },
        shortcut: ['L'] },
      { group: 'النظام', title: 'عرض الاختصارات',
        icon: 'help-circle', tags: ['shortcuts', 'keyboard', 'help', 'اختصارات', '?'],
        action: () => openCheat(), shortcut: ['?'] },
      { group: 'النظام', title: 'طباعة الصفحة الحالية',
        icon: 'download', tags: ['print', 'طباعة', 'pdf'],
        action: () => window.print() },
      { group: 'النظام', title: 'إعادة تحميل المنصة',
        icon: 'refresh', tags: ['reload', 'refresh', 'تحديث'],
        action: () => location.reload() },
    ];

    const SHORTCUTS = [
      { cat: 'عام',      label: 'فتح Command Palette', keys: [Mod, 'K'] },
      { cat: 'عام',      label: 'عرض الاختصارات',     keys: ['?'] },
      { cat: 'عام',      label: 'إغلاق نافذة منبثقة',  keys: ['Esc'] },
      { cat: 'عام',      label: 'طباعة',              keys: [Mod, 'P'] },
      { cat: 'الانتقال', label: 'لوحة التحكم',        keys: ['G', 'D'] },
      { cat: 'الانتقال', label: 'المبيعات',           keys: ['G', 'S'] },
      { cat: 'الانتقال', label: 'الكول سنتر',         keys: ['G', 'C'] },
      { cat: 'الانتقال', label: 'البرمجة',            keys: ['G', 'P'] },
      { cat: 'الانتقال', label: 'المحاسبة',           keys: ['G', 'A'] },
      { cat: 'الانتقال', label: 'مقابلات HR',         keys: ['G', 'H'] },
      { cat: 'الانتقال', label: 'صيانة الهاتف',       keys: ['G', 'R'] },
      { cat: 'الانتقال', label: 'السوشيال ميديا',     keys: ['G', 'M'] },
      { cat: 'الانتقال', label: 'مختبر السيناريوهات', keys: ['G', 'X'] },
      { cat: 'الثيم',    label: 'تبديل الثيم',        keys: ['T'] },
      { cat: 'النظام',   label: 'قفل المنصة',         keys: ['L'] },
    ];

    // ─── Search / fuzzy ───
    const score = (q, cmd) => {
      q = (q || '').toLowerCase().trim();
      if (!q) return 1;
      const hay = (cmd.title + ' ' + (cmd.tags || []).join(' ') + ' ' + (cmd.group || '')).toLowerCase();
      const idx = hay.indexOf(q);
      if (idx >= 0) return 1000 - idx;
      // Subsequence fuzzy
      let qi = 0;
      for (let i = 0; i < hay.length && qi < q.length; i++) {
        if (hay[i] === q[qi]) qi++;
      }
      return qi === q.length ? 200 - (hay.length / Math.max(1, q.length)) : 0;
    };

    let filtered = [];
    let active = 0;

    const render = () => {
      const q = input.value;
      filtered = commands
        .map(c => ({ c, s: score(q, c) }))
        .filter(x => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 80)
        .map(x => x.c);

      list.innerHTML = '';
      empty.hidden = filtered.length > 0;
      if (!filtered.length) return;

      let lastGroup = null;
      filtered.forEach((c, i) => {
        if (c.group !== lastGroup) {
          const h = document.createElement('div');
          h.className = 'cmdk-group-heading';
          h.textContent = c.group;
          list.appendChild(h);
          lastGroup = c.group;
        }
        const item = document.createElement('div');
        item.className = 'cmdk-item';
        item.setAttribute('role', 'option');
        item.dataset.idx = String(i);
        item.setAttribute('aria-selected', i === active ? 'true' : 'false');
        item.innerHTML = `
          <div class="cmdk-item-icon"><i class="qi" data-icon="${escapeAttr(c.icon || 'chevron-right')}"></i></div>
          <div class="cmdk-item-body">
            <div class="cmdk-item-title">${escapeHtml(c.title)}</div>
            ${c.hint ? `<div class="cmdk-item-hint">${escapeHtml(c.hint)}</div>` : ''}
          </div>
          ${c.shortcut ? `<div class="cmdk-item-shortcut">${c.shortcut.map(k => `<kbd>${escapeHtml(k)}</kbd>`).join('')}</div>` : ''}
        `;
        item.addEventListener('click', () => execute(c));
        item.addEventListener('mousemove', () => { if (active !== i) { active = i; refreshActive(); } });
        list.appendChild(item);
      });
      // Re-render icon glyphs (Phase 2 sprite system reads data-icon)
      window.Upg?.icons?.renderAll?.(list);
    };

    const refreshActive = () => {
      list.querySelectorAll('.cmdk-item').forEach(el => {
        const isActive = +el.dataset.idx === active;
        el.setAttribute('aria-selected', String(isActive));
        if (isActive) el.scrollIntoView({ block: 'nearest' });
      });
    };

    const execute = (cmd) => {
      close();
      setTimeout(() => {
        try { cmd.action(); }
        catch (e) { console.error('[Upg.cmdk] command failed:', e); }
      }, 60);
    };

    const open = (prefill = '') => {
      // If gateway is open, don't open palette (lock-screen first)
      if (document.body.dataset.gatewayOpen === 'true') return;
      palette.hidden = false;
      input.value = prefill || '';
      active = 0;
      render();
      requestAnimationFrame(() => input.focus());
    };
    const close = () => {
      palette.hidden = true;
      input.value = '';
    };

    const openCheat = () => {
      cheat.hidden = false;
      renderCheatsheet();
    };
    const closeCheat = () => { cheat.hidden = true; };

    const renderCheatsheet = () => {
      const body = cheat.querySelector('.cmdk-cheat-body');
      const cats = [...new Set(SHORTCUTS.map(s => s.cat))];
      body.innerHTML = cats.map(cat => `
        <div class="cmdk-cheat-cat">
          <h3>${escapeHtml(cat)}</h3>
          ${SHORTCUTS.filter(s => s.cat === cat).map(s => `
            <div class="cmdk-cheat-row">
              <span class="cmdk-cheat-label">${escapeHtml(s.label)}</span>
              <span class="cmdk-cheat-keys">${s.keys.map(k => `<kbd>${escapeHtml(k)}</kbd>`).join(' ')}</span>
            </div>`).join('')}
        </div>`).join('');
    };

    // ─── Events ───
    input.addEventListener('input', () => { active = 0; render(); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(filtered.length - 1, active + 1); refreshActive(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(0, active - 1); refreshActive(); }
      else if (e.key === 'Enter') { e.preventDefault(); if (filtered[active]) execute(filtered[active]); }
    });

    palette.addEventListener('click', (e) => { if (e.target === palette) close(); });
    cheat.addEventListener('click', (e) => {
      if (e.target === cheat || e.target.closest('[data-action="close-cheatsheet"]')) closeCheat();
    });

    // ─── Global keyboard ───
    let gPressed = false;
    let gTimer = null;

    const isInputFocused = () => {
      const el = document.activeElement;
      if (!el) return false;
      if (el === input) return true; // palette input is fine
      const tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
    };

    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl+K — always
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (palette.hidden) open(); else close();
        return;
      }
      // Esc — close any open overlay
      if (e.key === 'Escape') {
        if (!palette.hidden) { close(); return; }
        if (!cheat.hidden)   { closeCheat(); return; }
        return;
      }

      // If user is typing inside non-palette input, skip the rest
      if (isInputFocused() && document.activeElement !== input) return;

      // ? — cheat sheet
      if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (document.activeElement === input) return;
        e.preventDefault();
        if (cheat.hidden) openCheat(); else closeCheat();
        return;
      }
      // T — theme
      if ((e.key === 't' || e.key === 'T') && !gPressed && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (document.activeElement === input) return;
        e.preventDefault();
        window.Upg?.theme?.cycle?.();
        return;
      }
      // L — lock
      if ((e.key === 'l' || e.key === 'L') && !gPressed && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (document.activeElement === input) return;
        e.preventDefault();
        sessionStorage.removeItem('upg_unlocked');
        window.Upg?.gateway?.lock?.();
        return;
      }

      // G then X — page jumps
      if (!gPressed && (e.key === 'g' || e.key === 'G') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (document.activeElement === input) return;
        gPressed = true;
        clearTimeout(gTimer);
        gTimer = setTimeout(() => { gPressed = false; }, 1200);
        return;
      }
      if (gPressed) {
        const map = {
          d: 'dashboard', s: 'fieldsales', c: 'callcenter',
          p: 'programming', a: 'accounting', h: 'hrmastery',
          r: 'phonerepair', m: 'social', x: 'lab', n: 'negotiation',
          e: 'eq', y: 'psych'
        };
        const target = map[e.key.toLowerCase()];
        gPressed = false;
        clearTimeout(gTimer);
        if (target) {
          e.preventDefault();
          window.navigateTo?.(target);
        }
      }
    });

    // ─── Wire topbar search → palette ───
    document.querySelectorAll('.topbar-search input, .topbar input[type="text"][placeholder*="بحث"]').forEach(inp => {
      const handler = (e) => {
        e.preventDefault();
        const q = inp.value || '';
        inp.blur();
        open(q);
      };
      inp.addEventListener('focus', handler);
      inp.addEventListener('click', handler);
      inp.readOnly = true;
    });

    // ─── Helpers ───
    function escapeHtml(s) {
      return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }
    function escapeAttr(s) { return escapeHtml(s).replace(/[\n\r]/g, ''); }

    function exportAll() {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('upg_')) data[k] = localStorage.getItem(k);
      }
      const payload = {
        exported_at: new Date().toISOString(),
        version: 'cathedral-v14',
        data
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `upgrade-progress-${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }

    function importAll() {
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
            if (typeof data !== 'object' || !data) throw new Error('Bad payload');
            if (!confirm('سيتم استبدال بياناتك الحالية ببيانات الملف. متابعة؟')) return;
            Object.entries(data).forEach(([k, v]) => {
              if (k.startsWith('upg_')) localStorage.setItem(k, v);
            });
            location.reload();
          } catch (e) {
            alert('ملف غير صالح: ' + e.message);
          }
        };
        reader.readAsText(file);
      });
      inp.click();
    }

    function resetAll() {
      if (!confirm('سيتم حذف كل تقدمك ومسوّداتك ونتائجك. هل أنت متأكد؟')) return;
      if (!confirm('تأكيد ثاني — هذا حذف نهائي ولا يمكن التراجع عنه.')) return;
      Object.keys(localStorage).filter(k => k.startsWith('upg_')).forEach(k => localStorage.removeItem(k));
      sessionStorage.clear();
      location.reload();
    }

    // ─── Public API ───
    window.Upg = window.Upg || {};
    window.Upg.cmdk = {
      open, close,
      register: (cmd) => { if (cmd && typeof cmd.action === 'function') commands.push(cmd); },
      getShortcuts: () => SHORTCUTS.slice()
    };
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
