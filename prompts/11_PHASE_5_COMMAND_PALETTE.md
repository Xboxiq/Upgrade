# ⌘ WORKER 11 — Phase 5/7 — Command Palette + Keyboard Shortcuts
> **اقرأ أولاً:** `prompts/11_WORKER_PLATFORM_FOUNDATION.md` (الفهرس).
> **متطلب مسبق:** Phases 1, 2, 3, 4 منجزة.
> **الفلسفة:** "Power user shouldn't need a mouse." — Linear / Raycast.

---

## 🎯 الهدف

ميزة 2026 الأساسية: **Cmd+K Command Palette** يفتح في < 100ms، يتيح التنقل والتنفيذ بدون فأرة. + **30 command** مسجَّل + **shortcuts cheat sheet** بـ `?`.

---

## 📋 PRE-FLIGHT لهذا الـ Phase

```
📋 PHASE 5 PRE-FLIGHT
├─ Phase: 5/7 — Command Palette + Keyboard Shortcuts
├─ Estimated lines: ~700 (HTML ~80 + CSS ~250 + JS ~370)
├─ Files to touch:
│   ├─ platform/index.html        (#cmdk-palette + #shortcut-cheatsheet overlays)
│   ├─ platform/assets/style.css  (cmdk-* + cheatsheet styles)
│   └─ platform/assets/app.js     (Upg.cmdk module + 30 commands + shortcuts)
├─ Wired:
│   ├─ Cmd/Ctrl+K → open palette
│   ├─ ?          → cheat sheet (when no input focused)
│   ├─ G,D / G,S / G,C / G,P / G,A / G,H → page jumps
│   ├─ T → cycle theme | L → lock | Esc → close overlay
│   └─ Topbar search → opens palette with prefilled query
└─ Deliverable: commit "phase 5: Command Palette + Shortcuts" + push.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — **HTML Overlays**

```html
<!-- Command Palette -->
<div id="cmdk-palette" class="cmdk-overlay" hidden role="presentation">
  <div class="cmdk-modal" role="dialog" aria-label="لوحة الأوامر">
    <div class="cmdk-search">
      <i class="qi qi-md" data-icon="search"></i>
      <input type="text" class="cmdk-input"
             placeholder="ابحث أو نفّذ أمراً... (مثلاً: tax, dashboard, lock)"
             autocomplete="off" spellcheck="false">
      <kbd class="cmdk-kbd">ESC</kbd>
    </div>
    <div class="cmdk-results" role="listbox" aria-label="النتائج"></div>
    <div class="cmdk-empty" hidden>
      <i class="qi qi-xl" data-icon="search"></i>
      <p>لم نجد شيئاً.</p>
    </div>
    <div class="cmdk-footer">
      <span><kbd>↑</kbd> <kbd>↓</kbd> للتنقل</span>
      <span><kbd>↵</kbd> للتنفيذ</span>
      <span><kbd>?</kbd> للمساعدة</span>
    </div>
  </div>
</div>

<!-- Shortcuts Cheat Sheet -->
<div id="shortcut-cheatsheet" class="cmdk-overlay" hidden>
  <div class="cmdk-modal cmdk-modal-cheatsheet" role="dialog" aria-label="اختصارات لوحة المفاتيح">
    <header class="cmdk-cheat-header">
      <h2><i class="qi" data-icon="command"></i> اختصارات لوحة المفاتيح</h2>
      <button class="cmdk-btn-close" data-action="close-cheatsheet" aria-label="إغلاق">
        <i class="qi" data-icon="x"></i>
      </button>
    </header>
    <div class="cmdk-cheat-body">
      <!-- categories تُبنى من JS — يضمن sync مع registry -->
    </div>
  </div>
</div>
```

### Step 2 — **CSS** للـ Command Palette

```css
/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Command Palette (Worker 11 / Phase 5)
   ═══════════════════════════════════════════════════════════════ */
.cmdk-overlay {
  position: fixed; inset: 0; z-index: 9998;
  display: grid; place-items: start center;
  padding-top: 12vh;
  background: color-mix(in oklch, var(--color-bg) 70%, transparent);
  backdrop-filter: blur(8px);
  animation: cmdk-fade 180ms ease-out;
}
@keyframes cmdk-fade { from { opacity: 0; } to { opacity: 1; } }
.cmdk-overlay[hidden] { display: none; }

.cmdk-modal {
  width: min(640px, 92vw);
  max-height: 70vh;
  display: flex; flex-direction: column;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  animation: cmdk-slide 220ms cubic-bezier(.4,0,.2,1);
}
@keyframes cmdk-slide { from { transform: translateY(-12px); opacity: 0; } to { transform: none; opacity: 1; } }

.cmdk-search {
  display: flex; align-items: center; gap: 0.625rem;
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--color-border);
}
.cmdk-search .qi { color: var(--color-text-muted); }
.cmdk-input {
  flex: 1; background: transparent; border: 0; outline: none;
  color: var(--color-text); font: inherit; font-size: 1rem;
}
.cmdk-input::placeholder { color: var(--color-text-faint); }

.cmdk-kbd, kbd {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 1.5rem; height: 1.5rem;
  padding: 0 0.375rem;
  font-family: 'SFMono-Regular', ui-monospace, monospace;
  font-size: 0.75rem; font-weight: 600;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xs);
  color: var(--color-text-muted);
}

.cmdk-results { flex: 1; overflow-y: auto; padding: 0.375rem 0; }
.cmdk-results::-webkit-scrollbar { width: 8px; }
.cmdk-results::-webkit-scrollbar-thumb { background: var(--color-border-strong); border-radius: 4px; }

.cmdk-group-heading {
  padding: 0.625rem 1rem 0.375rem;
  font-size: 0.75rem; text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-faint); font-weight: 600;
}

.cmdk-item {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.625rem 1rem;
  cursor: pointer;
  border-inline-end: 2px solid transparent;
  transition: background 120ms;
}
.cmdk-item:hover { background: var(--color-surface-2); }
.cmdk-item[aria-selected="true"] {
  background: var(--color-brand-soft);
  border-inline-end-color: var(--color-brand);
}
.cmdk-item-icon {
  width: 32px; height: 32px;
  display: grid; place-items: center;
  background: var(--color-surface-2);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  flex-shrink: 0;
}
.cmdk-item[aria-selected="true"] .cmdk-item-icon {
  background: var(--color-brand);
  color: var(--color-bg);
}
.cmdk-item-body { flex: 1; min-width: 0; }
.cmdk-item-title { font-weight: 500; color: var(--color-text); }
.cmdk-item-hint { font-size: 0.8rem; color: var(--color-text-muted); }
.cmdk-item-shortcut { display: flex; gap: 0.25rem; }

.cmdk-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 3rem 1rem;
  color: var(--color-text-faint);
  text-align: center;
}
.cmdk-empty .qi { color: var(--color-text-faint); margin-bottom: 0.5rem; }

.cmdk-footer {
  display: flex; gap: 1.25rem; align-items: center;
  padding: 0.625rem 1rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-0);
  font-size: 0.8rem; color: var(--color-text-muted);
}
.cmdk-footer span { display: inline-flex; align-items: center; gap: 0.375rem; }

/* Cheatsheet variant */
.cmdk-modal-cheatsheet { max-height: 80vh; }
.cmdk-cheat-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
}
.cmdk-cheat-header h2 { font-size: 1.05rem; margin: 0; display: flex; align-items: center; gap: 0.5rem; }
.cmdk-btn-close {
  width: 32px; height: 32px;
  background: transparent; border: 0; cursor: pointer;
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
}
.cmdk-btn-close:hover { background: var(--color-surface-2); color: var(--color-text); }

.cmdk-cheat-body {
  flex: 1; overflow-y: auto;
  padding: 1rem 1.25rem;
  display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 2rem;
}
@media (max-width: 600px) { .cmdk-cheat-body { grid-template-columns: 1fr; } }

.cmdk-cheat-cat h3 {
  font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;
  color: var(--color-text-faint); margin: 0 0 0.5rem; font-weight: 600;
}
.cmdk-cheat-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.375rem 0;
  border-bottom: 1px dashed var(--color-border);
}
.cmdk-cheat-row:last-child { border: 0; }
.cmdk-cheat-label { color: var(--color-text); }
.cmdk-cheat-keys { display: flex; gap: 0.25rem; }
```

### Step 3 — **JS** — Registry + Search + Shortcuts

```js
/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Command Palette (Worker 11 / Phase 5)
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const palette = document.getElementById('cmdk-palette');
  const cheat   = document.getElementById('shortcut-cheatsheet');
  if (!palette) return;

  const input = palette.querySelector('.cmdk-input');
  const list  = palette.querySelector('.cmdk-results');
  const empty = palette.querySelector('.cmdk-empty');

  const isMac = navigator.platform.toUpperCase().includes('MAC');
  const Mod = isMac ? '⌘' : 'Ctrl';

  // ─── Command Registry (30+) ───
  const PAGES = [
    { id: 'dashboard',    title: 'لوحة التحكم',       icon: 'layout-dashboard' },
    { id: 'callcenter',   title: 'الكول سنتر',        icon: 'phone' },
    { id: 'fieldsales',   title: 'المبيعات الميدانية', icon: 'briefcase' },
    { id: 'accountmgr',   title: 'Account Manager',   icon: 'user-tie' },
    { id: 'social',       title: 'السوشيال ميديا',     icon: 'megaphone' },
    { id: 'lab',          title: 'مختبر السيناريوهات', icon: 'flask-conical' },
    { id: 'psych',        title: 'الدوافع النفسية',    icon: 'brain' },
    { id: 'eq',           title: 'الذكاء العاطفي',     icon: 'heart-handshake' },
    { id: 'customercare', title: 'خدمة العملاء',       icon: 'headphones' },
    { id: 'programming',  title: 'البرمجة',            icon: 'code' },
    { id: 'accounting',   title: 'المحاسبة',           icon: 'calculator' },
    { id: 'phonerepair',  title: 'صيانة الهاتف',       icon: 'wrench' },
    { id: 'negotiation',  title: 'المفاوضات',          icon: 'gauge' },
    { id: 'hrmastery',    title: 'إتقان مقابلات HR',   icon: 'briefcase' },
  ];

  const commands = [
    // Navigation
    ...PAGES.map(p => ({
      group: 'انتقال',
      title: `الانتقال إلى ${p.title}`,
      hint: `Go to ${p.id}`,
      icon: p.icon,
      tags: ['go','navigate','open',p.id, p.title],
      action: () => window.navigateTo?.(p.id),
    })),

    // Theme
    { group: 'الثيم', title: 'تبديل الثيم (دورة)',  icon: 'sun',     tags:['theme','toggle','اللون'], action: () => Upg.theme.cycle(), shortcut: ['T'] },
    { group: 'الثيم', title: 'الثيم: Auto',         icon: 'monitor', tags:['theme','auto'], action: () => Upg.theme.set('auto') },
    { group: 'الثيم', title: 'الثيم: Dark',         icon: 'moon',    tags:['theme','dark','مظلم'], action: () => Upg.theme.set('dark') },
    { group: 'الثيم', title: 'الثيم: Light',        icon: 'sun',     tags:['theme','light','فاتح'], action: () => Upg.theme.set('light') },

    // Quick actions
    { group: 'إجراءات سريعة', title: 'فتح حاسبة الضرائب العراقية', icon: 'calculator', tags:['tax','ضريبة'], action: () => { window.navigateTo?.('accounting'); setTimeout(() => document.querySelector('[data-calc="iraq-tax"]')?.scrollIntoView({ behavior:'smooth' }), 200); } },
    { group: 'إجراءات سريعة', title: 'فتح Mood Meter',              icon: 'heart-handshake', tags:['mood','مزاج'], action: () => { window.navigateTo?.('eq'); setTimeout(() => document.querySelector('#mood-meter')?.scrollIntoView({ behavior:'smooth' }), 200); } },
    { group: 'إجراءات سريعة', title: 'طباعة Cheat Sheet للصفحة الحالية', icon: 'download', tags:['print','طباعة'], action: () => window.print() },

    // Data
    { group: 'البيانات', title: 'تصدير كل التقدم (JSON)', icon: 'download', tags:['export','json'], action: () => exportAll() },
    { group: 'البيانات', title: 'إعادة تعيين كل التقدم',  icon: 'trash',    tags:['reset','clear'], action: () => resetAll() },
    { group: 'البيانات', title: 'عرض سجل النشاط',         icon: 'clock',    tags:['activity','log'], action: () => window.navigateTo?.('myprogress') },

    // System
    { group: 'النظام', title: 'قفل المنصة',  icon: 'lock',    tags:['lock','idle'], action: () => { sessionStorage.removeItem('upg_unlocked'); Upg.gateway?.lock(); }, shortcut: ['L'] },
    { group: 'النظام', title: 'عرض الاختصارات', icon: 'help-circle', tags:['shortcuts','keyboard','help','?'], action: () => openCheat(), shortcut: ['?'] },
  ];

  const SHORTCUTS = [
    { cat: 'عام', label: 'فتح Command Palette', keys: [Mod, 'K'] },
    { cat: 'عام', label: 'عرض الاختصارات',     keys: ['?'] },
    { cat: 'عام', label: 'إغلاق نافذة منبثقة',  keys: ['Esc'] },
    { cat: 'الانتقال', label: 'لوحة التحكم',    keys: ['G', 'D'] },
    { cat: 'الانتقال', label: 'المبيعات',       keys: ['G', 'S'] },
    { cat: 'الانتقال', label: 'الكول سنتر',     keys: ['G', 'C'] },
    { cat: 'الانتقال', label: 'البرمجة',        keys: ['G', 'P'] },
    { cat: 'الانتقال', label: 'المحاسبة',       keys: ['G', 'A'] },
    { cat: 'الانتقال', label: 'مقابلات HR',     keys: ['G', 'H'] },
    { cat: 'الثيم', label: 'تبديل الثيم',       keys: ['T'] },
    { cat: 'النظام', label: 'قفل المنصة',       keys: ['L'] },
  ];

  // ─── Search / fuzzy ───
  const score = (q, cmd) => {
    q = q.toLowerCase().trim();
    if (!q) return 1;
    const hay = (cmd.title + ' ' + (cmd.tags||[]).join(' ') + ' ' + (cmd.group||'')).toLowerCase();
    if (hay.includes(q)) return 100 - hay.indexOf(q);
    // simple letter-by-letter scan
    let qi = 0;
    for (let i = 0; i < hay.length && qi < q.length; i++) if (hay[i] === q[qi]) qi++;
    return qi === q.length ? 50 - (hay.length / q.length) : 0;
  };

  let filtered = [];
  let active = 0;

  const render = () => {
    const q = input.value;
    filtered = commands
      .map(c => ({ c, s: score(q, c) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 60)
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
      item.role = 'option';
      item.dataset.idx = i;
      item.setAttribute('aria-selected', i === active ? 'true' : 'false');
      item.innerHTML = `
        <div class="cmdk-item-icon"><i class="qi" data-icon="${c.icon}"></i></div>
        <div class="cmdk-item-body">
          <div class="cmdk-item-title">${c.title}</div>
          ${c.hint ? `<div class="cmdk-item-hint">${c.hint}</div>` : ''}
        </div>
        ${c.shortcut ? `<div class="cmdk-item-shortcut">${c.shortcut.map(k => `<kbd>${k}</kbd>`).join('')}</div>` : ''}
      `;
      item.addEventListener('click', () => execute(c));
      item.addEventListener('mousemove', () => { active = i; refreshActive(); });
      list.appendChild(item);
    });
  };

  const refreshActive = () => {
    list.querySelectorAll('.cmdk-item').forEach((el, i) => {
      el.setAttribute('aria-selected', String(+el.dataset.idx === active));
      if (+el.dataset.idx === active) el.scrollIntoView({ block: 'nearest' });
    });
  };

  const execute = (cmd) => {
    close();
    setTimeout(() => cmd.action(), 50);
  };

  const open = (prefill = '') => {
    palette.hidden = false;
    input.value = prefill;
    active = 0;
    render();
    setTimeout(() => input.focus(), 0);
  };
  const close = () => {
    palette.hidden = true;
    input.value = '';
  };

  const openCheat = () => { cheat.hidden = false; renderCheatsheet(); };
  const closeCheat = () => { cheat.hidden = true; };

  const renderCheatsheet = () => {
    const body = cheat.querySelector('.cmdk-cheat-body');
    const cats = [...new Set(SHORTCUTS.map(s => s.cat))];
    body.innerHTML = cats.map(cat => `
      <div class="cmdk-cheat-cat">
        <h3>${cat}</h3>
        ${SHORTCUTS.filter(s => s.cat === cat).map(s => `
          <div class="cmdk-cheat-row">
            <span class="cmdk-cheat-label">${s.label}</span>
            <span class="cmdk-cheat-keys">${s.keys.map(k => `<kbd>${k}</kbd>`).join(' ')}</span>
          </div>`).join('')}
      </div>`).join('');
  };

  // ─── Events ───
  input.addEventListener('input', () => { active = 0; render(); });

  palette.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(filtered.length - 1, active + 1); refreshActive(); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); active = Math.max(0, active - 1); refreshActive(); }
    else if (e.key === 'Enter')     { e.preventDefault(); if (filtered[active]) execute(filtered[active]); }
  });

  palette.addEventListener('click', (e) => {
    if (e.target === palette) close();
  });
  cheat?.addEventListener('click', (e) => {
    if (e.target === cheat || e.target.closest('[data-action="close-cheatsheet"]')) closeCheat();
  });

  // ─── Global shortcuts ───
  let gPressed = false; let gTimer;
  const isInputFocused = () => {
    const el = document.activeElement;
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
  };

  document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl+K — always
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      palette.hidden ? open() : close();
      return;
    }
    // Esc — close any open overlay
    if (e.key === 'Escape') {
      if (!palette.hidden) close();
      else if (!cheat.hidden) closeCheat();
      return;
    }

    // Skip rest if input focused
    if (isInputFocused()) return;

    // ? — cheat sheet
    if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      cheat.hidden ? openCheat() : closeCheat();
      return;
    }
    // T — theme
    if (e.key.toLowerCase() === 't' && !gPressed) { e.preventDefault(); Upg.theme?.cycle(); return; }
    // L — lock
    if (e.key.toLowerCase() === 'l' && !gPressed) { e.preventDefault(); sessionStorage.removeItem('upg_unlocked'); Upg.gateway?.lock(); return; }

    // G then X — page jumps
    if (!gPressed && e.key.toLowerCase() === 'g') {
      gPressed = true;
      gTimer = setTimeout(() => { gPressed = false; }, 1200);
      return;
    }
    if (gPressed) {
      const map = { d:'dashboard', s:'fieldsales', c:'callcenter', p:'programming', a:'accounting', h:'hrmastery', r:'phonerepair', m:'social', x:'lab' };
      const target = map[e.key.toLowerCase()];
      if (target) {
        e.preventDefault();
        window.navigateTo?.(target);
      }
      gPressed = false;
      clearTimeout(gTimer);
    }
  });

  // ─── Wire topbar search ───
  const wireTopbarSearch = () => {
    document.querySelectorAll('.topbar-search input, .topbar input[type="search"]').forEach(inp => {
      inp.addEventListener('focus', (e) => {
        e.preventDefault();
        const q = inp.value;
        inp.blur();
        open(q);
      });
      inp.addEventListener('click', (e) => { e.preventDefault(); inp.blur(); open(inp.value || ''); });
    });
  };

  // ─── Helpers ───
  const exportAll = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('upg_')) data[k] = localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify({ exported_at: new Date().toISOString(), data }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `upgrade-progress-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const resetAll = () => {
    if (!confirm('سيتم حذف كل تقدمك ومسوّداتك ونتائجك. هل أنت متأكد؟')) return;
    if (!confirm('تأكيد ثاني: حذف نهائي؟')) return;
    Object.keys(localStorage).filter(k => k.startsWith('upg_')).forEach(k => localStorage.removeItem(k));
    location.reload();
  };

  // Init
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wireTopbarSearch);
  else wireTopbarSearch();

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.cmdk = { open, close, register: (cmd) => commands.push(cmd) };
})();
```

---

## ✅ Acceptance Criteria للـ Phase 5

- [ ] `Cmd+K` (أو `Ctrl+K`) يفتح palette فوراً.
- [ ] كتابة "tax" تُرجع "حاسبة الضرائب العراقية" في النتائج الأولى.
- [ ] السهمين ↑↓ يتنقّلان، Enter ينفّذ، Esc يقفل.
- [ ] `?` يفتح cheat sheet (إذا ما في input focused).
- [ ] `T` يبدّل الثيم، `L` يقفل المنصة، `G + D` ينتقل للوحة التحكم.
- [ ] topbar `<input>` ينقل التركيز إلى palette ويملأ الـ query.
- [ ] الـ palette يدعم **30+ command** على الأقل.
- [ ] Cheat sheet يعرض الاختصارات بـ categories.
- [ ] لا errors في console.

---

## 🛡️ في نهاية الـ Phase

```
1. commit  : "phase 5: Command Palette + Keyboard Shortcuts (30+ commands)"
2. push    : worker-11-complete
3. state   : current.phase=5, completed_phases[+], snapshot file
4. push    : ثاني
```

**التالي:** `prompts/11_PHASE_6_REAL_DASHBOARD.md`.

— نهاية Phase 5.
