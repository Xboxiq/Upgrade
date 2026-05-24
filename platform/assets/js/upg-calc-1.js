/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-calc-1.js
   Extracted from app.js lines 12139-12318
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const fmtNum   = new Intl.NumberFormat('ar-IQ', { maximumFractionDigits: 2 });
  const fmtMoney = new Intl.NumberFormat('ar-IQ', { maximumFractionDigits: 0 });
  const fmtInt   = new Intl.NumberFormat('ar-IQ', { maximumFractionDigits: 0 });
  const fmtPct   = (v) => `${(Number(v) || 0).toFixed(1)}%`;
  const clamp    = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const registry = new Map();

  const toast = (msg) => {
    document.querySelectorAll('.qcalc-toast').forEach(t => t.remove());
    const t = document.createElement('div');
    t.className = 'qcalc-toast';
    t.setAttribute('role', 'status');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1800);
  };

  const collectInputs = (el) => {
    const data = {};
    el.querySelectorAll('[name]').forEach(input => {
      const v = input.value;
      const name = input.name;
      if (input.type === 'checkbox') data[name] = input.checked;
      else if (input.type === 'radio') {
        if (input.checked) data[name] = v;
        else if (data[name] === undefined) data[name] = data[name] || null;
      }
      else if (input.type === 'number' || input.dataset.numeric === 'true') {
        const n = parseFloat(v);
        data[name] = Number.isFinite(n) ? n : 0;
      }
      else data[name] = v;
    });
    return data;
  };

  const formatValue = (raw, format) => {
    if (raw === undefined || raw === null) return '—';
    if (typeof raw !== 'number') return String(raw);
    if (!Number.isFinite(raw)) return '—';
    switch (format) {
      case 'money': return fmtMoney.format(raw);
      case 'pct':   return fmtPct(raw);
      case 'int':   return fmtInt.format(Math.round(raw));
      case 'num2':  return fmtNum.format(raw);
      default:      return fmtNum.format(raw);
    }
  };

  const mount = (el) => {
    if (el.__qcalcMounted) return;
    const name = el.dataset.calc;
    const def = registry.get(name);
    if (!def) {
      // Defer: maybe registration runs after first init pass.
      return;
    }

    const update = () => {
      const data = collectInputs(el);
      let result;
      try { result = def.compute(data) || {}; }
      catch (err) { console.error(`[qcalc:${name}] compute error`, err); return; }

      el.querySelectorAll('[data-bind]').forEach(b => {
        const key = b.dataset.bind;
        if (key === 'explain') {
          b.innerHTML = def.explain ? def.explain(data, result) : '';
          return;
        }
        const meterFor = b.dataset.meter;
        if (meterFor) {
          const v = clamp(Number(result[meterFor]) || 0, 0, 100);
          const i = b.querySelector('i') || (() => { const x = document.createElement('i'); b.appendChild(x); return x; })();
          i.style.width = `${v}%`;
          return;
        }
        const val = result[key];
        b.textContent = formatValue(val, b.dataset.format);

        // Optional class swap based on threshold-defined state
        if (b.dataset.stateBind) {
          const card = b.closest('.qcalc-result-card');
          if (card) {
            card.classList.remove('qcalc-result-good', 'qcalc-result-bad');
            const cls = result[b.dataset.stateBind];
            if (cls === 'good') card.classList.add('qcalc-result-good');
            else if (cls === 'bad') card.classList.add('qcalc-result-bad');
          }
        }
      });
    };

    el.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', update);
      input.addEventListener('change', update);
    });

    el.querySelector('[data-action="reset"]')?.addEventListener('click', () => {
      el.querySelectorAll('input').forEach(i => {
        if (i.type === 'checkbox' || i.type === 'radio') i.checked = i.defaultChecked;
        else i.value = i.defaultValue || '';
      });
      el.querySelectorAll('select').forEach(s => {
        const def = s.querySelector('option[selected]');
        s.value = def ? def.value : (s.options[0] ? s.options[0].value : '');
      });
      update();
      toast('تمت إعادة التعيين');
    });

    el.querySelector('[data-action="copy"]')?.addEventListener('click', () => {
      const lines = [...el.querySelectorAll('.qcalc-summary .qcalc-result-card')].map(card => {
        const lbl = card.querySelector('.qcalc-result-label')?.textContent.trim() || '';
        const val = card.querySelector('.qcalc-result-value')?.textContent.trim() || '';
        const unit = card.querySelector('.qcalc-result-unit')?.textContent.trim() || '';
        return `${lbl}: ${val}${unit ? ' ' + unit : ''}`;
      });
      const title = el.querySelector('.qcalc-title h3')?.textContent.trim() || name;
      const text = `${title}\n` + lines.join('\n');
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(
          () => toast('تم النسخ'),
          () => toast('تعذّر النسخ')
        );
      } else {
        toast('النسخ غير مدعوم');
      }
    });

    el.querySelector('[data-action="export"]')?.addEventListener('click', () => {
      const data = collectInputs(el);
      let outputs = {};
      try { outputs = def.compute(data) || {}; } catch (e) { /* noop */ }
      const blob = new Blob(
        [JSON.stringify({ calc: name, inputs: data, outputs, ts: new Date().toISOString() }, null, 2)],
        { type: 'application/json' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast('تم التصدير');
    });

    update();
    el.__qcalcMounted = true;
  };

  const register = (name, def) => {
    if (typeof def?.compute !== 'function') {
      console.warn(`[Upg.calc] register("${name}"): compute() function required`);
      return;
    }
    registry.set(name, def);
    // Mount any existing element waiting for this registration
    document.querySelectorAll(`.qcalc[data-calc="${name}"]`).forEach(mount);
  };

  const init = (root = document) => {
    root.querySelectorAll('.qcalc[data-calc]').forEach(mount);
  };

  const boot = () => init();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.addEventListener('upg:page-shown', () => init());

  window.Upg = window.Upg || {};
  window.Upg.calc = { register, mount, init, format: formatValue };
})();
