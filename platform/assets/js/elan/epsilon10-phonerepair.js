/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — ε10 — Phonerepair Drag-to-Diagnose Workbench (Warsha world)
   🤚 INTERACTION_BEACON. Three input modalities (HTML5 dnd / pointer /
   keyboard pick-and-drop). On drop the zone glows ember, Upg.haptic
   'takk' fires (δ4), and a paper-tape "shop receipt" rolls out with
   typewritten root-cause hypotheses (γ8/ε7 --warsha-tape).
   Public: Upg.elan.phonerepair = { diagnose, causes, reset, symptoms, zones }
   No innerHTML, no emoji in markup, no inline <svg viewBox>.
   Avoids: Forbidden #15 (modal+overlay), #5 (default soft-shadow card).
   Inspired-by: Wild Card #13 — Iraqi marsh mudhif workshop tradition.
   ──────────────────────────────────────────────────────────────────── */
(function elanEpsilon10Phonerepair (w, d) {
  'use strict';
  if (!w || !d) return;

  const CAUSES = Object.freeze({
    'battery-drain': Object.freeze([
      'البطارية تجاوزت 600 دورة شحن — استبدال موصى به',
      'تطبيق خلفي يستنزف (افتح Settings → Battery)',
      'ضوء الشاشة على الـ auto-max — أنزله إلى 60%',
      'مزامنة email/cloud كل دقيقة — وسّع الفترة',
    ]),
    'screen-flicker': Object.freeze([
      'فلت كيبل LCD مرتخٍ — إعادة جلوسه',
      'OLED شاخت في منطقة معيّنة (burn-in)',
      'تيار كهربائي ساكن لمس الـ digitizer',
      'بطاقة الرسوميات محتاجة flash للـ firmware',
    ]),
    'mic-cut': Object.freeze([
      'شبكة المايك مسدودة بالغبار — تنظيف بفرشاة ناعمة',
      'كيبل المايك مقطوع داخل الإطار',
      'ماء وصل للـ codec — فحص رطوبة + استبدال',
      'إعدادات noise-cancellation مغلقة بالخطأ',
    ]),
    'overheat': Object.freeze([
      'لاصق التبريد يبس — استبداله بـ thermal paste طازج',
      'CPU تحت stress من تطبيق سيء — Force Stop',
      'الجراب يحبس الحرارة — انزعه أثناء الشحن',
      'برامج خلفية تحتاج reboot نظيف',
    ]),
    'wifi-weak': Object.freeze([
      'هوائي Wi-Fi مفصول عن اللوحة (شائع بعد سقوط)',
      'الراوتر هو المشكلة لا الهاتف — اختبر بـ هاتف ثانٍ',
      'firmware الواي فاي يحتاج تحديث (Carrier Settings)',
      'كثرة الشبكات المحفوظة — احذف القديمة',
    ]),
  });

  const SYMPTOM_KEYS = Object.freeze(Object.keys(CAUSES));
  const ZONE_KEYS    = Object.freeze(['screen', 'battery', 'speaker', 'mic', 'antenna']);
  let pickedSymptom = null;

  const _root = () => d.querySelector('#page-phonerepair [data-elan-diag-stage]');

  function _haptic (p) {
    try {
      const h = w.Upg && w.Upg.haptic;
      if (h && typeof h.play === 'function') h.play(p || 'takk');
    } catch {}
  }

  function _reduced () {
    try {
      const m = w.Upg && w.Upg.elan && w.Upg.elan.motion;
      if (m && typeof m.current === 'function') {
        const v = m.current();
        if (v === 'reduced')  return true;
        if (v === 'enhanced') return false;
      }
      return !!(w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch { return false; }
  }

  function _renderTape (root, symptom) {
    const tape = root.querySelector('[data-elan-diag-cause]');
    if (!tape) return;
    while (tape.firstChild) tape.removeChild(tape.firstChild);
    const list = CAUSES[symptom];
    if (!list) {
      tape.setAttribute('data-empty', 'true');
      const p = d.createElement('p');
      p.className = 'diag-cause-empty type-body';
      p.textContent = 'اسحب عَرَضاً لتظهر احتمالات السبب على شريط لاصق.';
      tape.appendChild(p);
      return;
    }
    tape.removeAttribute('data-empty');

    const head = d.createElement('header');
    head.className = 'diag-cause-head';
    const eyeb = d.createElement('span');
    eyeb.className = 'diag-cause-eyebrow type-eyebrow';
    eyeb.textContent = 'احتمالات السبب';
    head.appendChild(eyeb);
    tape.appendChild(head);

    const ul = d.createElement('ul');
    ul.className = 'diag-cause-list';
    ul.setAttribute('role', 'list');
    const reduced = _reduced();
    list.forEach((cause, i) => {
      const li = d.createElement('li');
      li.className = 'diag-cause-row';
      if (!reduced) li.style.setProperty('--row-index', String(i));
      const bullet = d.createElement('i');
      bullet.className = 'qi diag-cause-bullet';
      bullet.setAttribute('data-icon', 'wrench');
      bullet.setAttribute('aria-hidden', 'true');
      const txt = d.createElement('span');
      txt.className = 'diag-cause-text type-body';
      txt.textContent = cause;
      li.appendChild(bullet);
      li.appendChild(txt);
      ul.appendChild(li);
    });
    tape.appendChild(ul);

    const foot = d.createElement('p');
    foot.className = 'diag-cause-foot type-body-sm';
    foot.textContent = 'اعرض القطعة للزبون قبل وبعد — الشفافية تَبني السمعة.';
    tape.appendChild(foot);
  }

  function _applyDrop (zoneEl, symptom) {
    const root = _root();
    if (!root || !zoneEl || !symptom) return false;
    if (!CAUSES[symptom] || !ZONE_KEYS.includes(zoneEl.dataset.zone)) return false;
    zoneEl.setAttribute('data-affected', 'true');
    zoneEl.setAttribute('data-symptom', symptom);
    _haptic('takk');
    _renderTape(root, symptom);
    try {
      d.dispatchEvent(new CustomEvent('upg:diag:drop', {
        detail: { symptom, zone: zoneEl.dataset.zone, causes: CAUSES[symptom] },
      }));
    } catch {}
    zoneEl.classList.add('is-just-dropped');
    w.setTimeout(() => zoneEl.classList.remove('is-just-dropped'), 600);
    return true;
  }

  function _bindDragDrop (root) {
    root.querySelectorAll('.diag-symptom').forEach((s) => {
      s.addEventListener('dragstart', (ev) => {
        const sym = s.dataset.symptom;
        if (!sym) return;
        try {
          ev.dataTransfer.effectAllowed = 'copy';
          ev.dataTransfer.setData('text/plain', sym);
        } catch {}
        s.setAttribute('data-elan-dragging', 'true');
      });
      s.addEventListener('dragend', () => s.removeAttribute('data-elan-dragging'));
    });
    root.querySelectorAll('.diag-zone').forEach((z) => {
      z.addEventListener('dragenter', (ev) => { ev.preventDefault(); z.classList.add('is-target'); });
      z.addEventListener('dragover',  (ev) => { ev.preventDefault(); try { ev.dataTransfer.dropEffect = 'copy'; } catch {} });
      z.addEventListener('dragleave', ()    => z.classList.remove('is-target'));
      z.addEventListener('drop',      (ev) => {
        ev.preventDefault();
        z.classList.remove('is-target');
        let sym = '';
        try { sym = ev.dataTransfer.getData('text/plain'); } catch {}
        if (sym) _applyDrop(z, sym);
      });
    });
  }

  function _bindPointer (root) {
    let active = null;
    root.addEventListener('pointerdown', (ev) => {
      const s = ev.target.closest && ev.target.closest('.diag-symptom');
      if (!s || !root.contains(s) || ev.pointerType === 'mouse') return;
      active = s.dataset.symptom || null;
      if (active) s.setAttribute('data-elan-dragging', 'true');
    }, { passive: true });
    root.addEventListener('pointermove', (ev) => {
      if (!active || ev.pointerType === 'mouse') return;
      root.querySelectorAll('.diag-zone.is-target').forEach((n) => n.classList.remove('is-target'));
      const el = d.elementFromPoint(ev.clientX, ev.clientY);
      const z  = el && el.closest && el.closest('.diag-zone');
      if (z) z.classList.add('is-target');
    }, { passive: true });
    function _release (ev) {
      if (!active || ev.pointerType === 'mouse') return;
      root.querySelectorAll('.diag-symptom[data-elan-dragging]').forEach((n) => n.removeAttribute('data-elan-dragging'));
      const el = d.elementFromPoint(ev.clientX, ev.clientY);
      const z  = el && el.closest && el.closest('.diag-zone');
      root.querySelectorAll('.diag-zone.is-target').forEach((n) => n.classList.remove('is-target'));
      if (z) _applyDrop(z, active);
      active = null;
    }
    root.addEventListener('pointerup',     _release, { passive: true });
    root.addEventListener('pointercancel', _release, { passive: true });
  }

  function _bindKeyboard (root) {
    root.addEventListener('keydown', (ev) => {
      if (ev.key !== 'Enter' && ev.key !== ' ' && ev.key !== 'Spacebar') return;
      const t = ev.target;
      const symptom = t.closest && t.closest('.diag-symptom');
      if (symptom && root.contains(symptom)) {
        ev.preventDefault();
        const sym = symptom.dataset.symptom;
        if (!sym) return;
        if (pickedSymptom === sym) {
          pickedSymptom = null;
          symptom.removeAttribute('data-elan-picked');
        } else {
          root.querySelectorAll('.diag-symptom[data-elan-picked]').forEach((n) => n.removeAttribute('data-elan-picked'));
          pickedSymptom = sym;
          symptom.setAttribute('data-elan-picked', 'true');
        }
        return;
      }
      const zone = t.closest && t.closest('.diag-zone');
      if (zone && root.contains(zone) && pickedSymptom) {
        ev.preventDefault();
        _applyDrop(zone, pickedSymptom);
        const symEl = root.querySelector(`.diag-symptom[data-symptom="${pickedSymptom}"]`);
        if (symEl) symEl.removeAttribute('data-elan-picked');
        pickedSymptom = null;
      }
    });
  }

  function reset () {
    const root = _root();
    if (!root) return false;
    root.querySelectorAll('.diag-zone[data-affected]').forEach((z) => {
      z.removeAttribute('data-affected');
      z.removeAttribute('data-symptom');
    });
    root.querySelectorAll('.diag-symptom[data-elan-picked]').forEach((s) => s.removeAttribute('data-elan-picked'));
    pickedSymptom = null;
    _renderTape(root, null);
    return true;
  }

  function bind () {
    const root = _root();
    if (!root || root.__elanEpsilon10Bound) return;
    root.__elanEpsilon10Bound = true;
    _bindDragDrop(root);
    _bindPointer(root);
    _bindKeyboard(root);
    const rst = root.querySelector('[data-elan-diag-reset]');
    if (rst) rst.addEventListener('click', reset);
  }

  if (d.readyState === 'loading') {
    d.addEventListener('DOMContentLoaded', bind, { once: true });
  } else {
    bind();
  }
  d.addEventListener('upg:nav:change', (ev) => {
    if (ev.detail && ev.detail.page === 'phonerepair') bind();
  });

  w.Upg = w.Upg || {};
  w.Upg.elan = w.Upg.elan || {};
  if (!w.Upg.elan.phonerepair) {
    w.Upg.elan.phonerepair = Object.freeze({
      diagnose (symptom, zoneKey) {
        const root = _root();
        if (!root) return null;
        const z = root.querySelector(`.diag-zone[data-zone="${zoneKey}"]`);
        if (!z) return null;
        return _applyDrop(z, symptom) ? CAUSES[symptom] : null;
      },
      causes  : (s) => CAUSES[s] || null,
      reset,
      symptoms: () => SYMPTOM_KEYS,
      zones   : () => ZONE_KEYS,
    });
  }
})(typeof window !== 'undefined' ? window : null,
   typeof document !== 'undefined' ? document : null);
