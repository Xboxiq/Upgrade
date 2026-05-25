/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — ε1 — Dashboard page module (Hibr world)
   📊 DATA_BEACON: Manuscript Margin Daily Progress.
   Reads window.Upg.state safely and paints three Hibr cells: dash-margin
   (the beacon), dash-continue (last unit + clock until midnight),
   iraq-block (PROVE-IT citation, static markup — no JS rebind needed).
   Sacred: never mutates Upg.* top-level surface; nests at Upg.elan.pages.
   Avoids Forbidden #11 (animated counter from 0): number paints final on
   first call; only the strip animates via CSS transition.
   ════════════════════════════════════════════════════════════════════════ */

const ROOT_SEL = '#page-dashboard';
const DAILY_TARGET_KEY = 'upg_daily_target';
const DEFAULT_DAILY_TARGET = 12;
const DEFAULT_LAST_UNIT = {
  title: 'ابدأ أول وحدة',
  meta: 'لم تَبدأ رحلتك بعد — اضغط لتختار مساراً.',
  page: 'myprogress',
};

const AR_DIGITS = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
function toArabicIndic(n) {
  if (n === null || n === undefined) return '';
  return String(n).replace(/-?\d/g, (d) => (d === '-' ? '-' : AR_DIGITS[+d]));
}

function formatTimeRemaining() {
  const now = new Date();
  const eod = new Date(now); eod.setHours(23, 59, 59, 999);
  const ms = eod - now;
  if (ms <= 0) return 'انتهى اليوم';
  const totalMin = Math.floor(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `يَتبقى ${toArabicIndic(m)} دقيقة`;
  if (m === 0) return `يَتبقى ${toArabicIndic(h)} ساعة`;
  return `يَتبقى ${toArabicIndic(h)} س ${toArabicIndic(m)} د`;
}

function readState() {
  const Upg = (typeof window !== 'undefined') ? window.Upg : null;
  const state = Upg && Upg.state;
  if (!state) {
    return { unitsToday: 0, target: DEFAULT_DAILY_TARGET, streak: 0, lastUnit: DEFAULT_LAST_UNIT, recent: null };
  }
  let unitsToday = 0, streak = 0, recent = null, lastUnit = DEFAULT_LAST_UNIT;

  try {
    const log = (typeof state.activity === 'function' ? state.activity() : []) || [];
    const today = new Date().toDateString();
    unitsToday = log.filter(ev => {
      if (!ev || !ev.ts) return false;
      if (new Date(ev.ts).toDateString() !== today) return false;
      const t = ev.type || '';
      return t === 'session_end' || t === 'unit_complete' || t === 'item_done' || t === 'achievement';
    }).length;
    const ach = log.find(ev => ev && (ev.type === 'achievement' || ev.type === 'badge' || ev.type === 'unit_complete'));
    if (ach) {
      recent = { title: (ach.payload && (ach.payload.title || ach.payload.name)) || 'إنجاز جديد', kind: ach.type };
    }
    const last = log.find(ev => ev && ev.payload && (ev.payload.unit || ev.payload.lessonName));
    if (last) {
      const p = last.payload;
      lastUnit = {
        title: p.lessonName || p.unit || 'وحدة جارية',
        meta: p.workerKey ? `مسار: ${p.workerKey}` : 'تابع من حيث توقَّفت',
        page: p.workerKey || 'myprogress',
      };
    } else if (unitsToday > 0) {
      lastUnit = { title: 'وَحدة اليوم التالية', meta: `أنجزتَ ${toArabicIndic(unitsToday)} اليوم — تابع البناء`, page: 'myprogress' };
    }
  } catch (_) { /* state best-effort */ }

  try { if (state.compute && typeof state.compute.streak === 'function') streak = state.compute.streak() | 0; } catch (_) {}

  let target = DEFAULT_DAILY_TARGET;
  try {
    const raw = localStorage.getItem(DAILY_TARGET_KEY);
    if (raw) {
      const v = parseInt(raw, 10);
      if (Number.isFinite(v) && v > 0) target = v;
    }
  } catch (_) {}

  return { unitsToday, target, streak, lastUnit, recent };
}

function paint(root) {
  if (!root) return;
  const { unitsToday, target, streak, lastUnit, recent } = readState();

  const marginCell = root.querySelector('.dash-margin');
  if (marginCell) {
    const done = Math.min(unitsToday, target);
    const pct = target > 0 ? Math.min(100, Math.round((done / target) * 100)) : 0;
    const fillEl = marginCell.querySelector('[data-elan-margin-fill]');
    const doneEl = marginCell.querySelector('[data-elan-margin-done]');
    const totalEl = marginCell.querySelector('[data-elan-margin-total]');
    const captionEl = marginCell.querySelector('[data-elan-margin-caption]');
    const badgeEl = marginCell.querySelector('[data-elan-margin-badge]');
    const badgeTextEl = marginCell.querySelector('[data-elan-margin-badge-text]');
    if (fillEl) fillEl.style.setProperty('--elan-margin-pct', pct + '%');
    marginCell.style.setProperty('--elan-margin-pct', pct + '%');
    if (doneEl) doneEl.textContent = toArabicIndic(done);
    if (totalEl) totalEl.textContent = toArabicIndic(target);
    if (captionEl) {
      captionEl.dataset.unitsDone = String(done);
      captionEl.dataset.unitsTotal = String(target);
    }
    marginCell.dataset.elanMarginState = (pct >= 100) ? 'full' : 'progress';
    if (badgeEl && badgeTextEl) {
      if (recent && recent.title) {
        badgeTextEl.textContent = recent.title;
        badgeEl.hidden = false;
      } else if (streak >= 2) {
        badgeTextEl.textContent = `${toArabicIndic(streak)} يوم متَّصل`;
        badgeEl.hidden = false;
      } else {
        badgeEl.hidden = true;
      }
    }
  }

  const continueCell = root.querySelector('.dash-continue');
  if (continueCell) {
    const titleEl = continueCell.querySelector('[data-elan-last-unit-title]');
    const metaEl = continueCell.querySelector('[data-elan-last-unit-meta]');
    const btnEl = continueCell.querySelector('[data-elan-last-unit-go]');
    const clockEl = continueCell.querySelector('[data-elan-clock-text]');
    if (titleEl) titleEl.textContent = lastUnit.title;
    if (metaEl) metaEl.textContent = lastUnit.meta;
    if (btnEl) btnEl.dataset.page = lastUnit.page || 'myprogress';
    if (clockEl) clockEl.textContent = formatTimeRemaining();
  }
}

let clockInterval = null;
function startClockTick(root) {
  stopClockTick();
  clockInterval = window.setInterval(() => {
    const clockEl = root.querySelector('.dash-continue [data-elan-clock-text]');
    if (clockEl) clockEl.textContent = formatTimeRemaining();
  }, 30 * 1000);
}
function stopClockTick() {
  if (clockInterval !== null) { clearInterval(clockInterval); clockInterval = null; }
}

function isDashboardActive() {
  const root = document.querySelector(ROOT_SEL);
  if (!root) return false;
  if (root.classList.contains('active')) return true;
  const cur = (window.Upg && window.Upg.nav && typeof window.Upg.nav.current === 'function') ? window.Upg.nav.current() : null;
  return cur === 'dashboard';
}

function refresh() {
  const root = document.querySelector(ROOT_SEL);
  if (!root) return;
  paint(root);
  if (isDashboardActive()) startClockTick(root); else stopClockTick();
}

function bind() {
  const root = document.querySelector(ROOT_SEL);
  if (!root) return;
  paint(root);
  if (isDashboardActive()) startClockTick(root);

  const Upg = window.Upg;
  if (Upg && Upg.state && typeof Upg.state.subscribe === 'function') {
    try { Upg.state.subscribe('activity_log', refresh); } catch (_) {}
    try { Upg.state.subscribe('progress', refresh); } catch (_) {}
  }
  if (Upg && Upg.state && typeof Upg.state.on === 'function') {
    try { Upg.state.on('change', refresh); } catch (_) {}
  }

  document.addEventListener('upg:nav:change', () => {
    if (isDashboardActive()) { paint(root); startClockTick(root); } else { stopClockTick(); }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopClockTick();
    else if (isDashboardActive()) { paint(root); startClockTick(root); }
  });
}

function boot() {
  if (typeof document === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true });
  } else {
    bind();
  }
  if (typeof window !== 'undefined') {
    window.Upg = window.Upg || {};
    window.Upg.elan = window.Upg.elan || {};
    window.Upg.elan.pages = window.Upg.elan.pages || {};
    window.Upg.elan.pages.dashboard = Object.freeze({
      refresh,
      _stage: 'ε1',
      _beacon: 'data-manuscript-margin',
    });
  }
}

boot();

export { refresh, toArabicIndic, formatTimeRemaining };
