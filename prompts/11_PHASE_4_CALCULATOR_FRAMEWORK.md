# 🧮 WORKER 11 — Phase 4/7 — Calculator Foundation Component (`qcalc`)
> **اقرأ أولاً:** `prompts/11_WORKER_PLATFORM_FOUNDATION.md` (الفهرس).
> **متطلب مسبق:** Phases 1, 2, 3 منجزة.
> **الفلسفة:** كل حاسبة في المنصة = نفس الـ DNA. Stripe-grade شكلاً ووظيفة.

---

## 🎯 الهدف

بناء **framework حاسبات موحّد** (`qcalc`) ثم **ترحيل 8 حاسبات موجودة** إليه دون لمس math الداخلي:

| الحاسبة | الـ Worker | اسم التسجيل |
|---|---|---|
| Iraq Tax Calculator | 04 | `iraq-tax` |
| Salary Slip | 04 | `salary-slip` |
| Commission Calculator | 02 | `sales-commission` |
| APIndex (call-center) | 03 | `apindex` |
| A/B Test Designer | 06 | `ab-test` |
| BATNA / Negotiation | 08 | `batna` |
| Big-O Cost Estimator | 05 | `bigo-cost` |
| Big Five Scoring | 09 | `bigfive-score` |

---

## 📋 PRE-FLIGHT لهذا الـ Phase

```
📋 PHASE 4 PRE-FLIGHT
├─ Phase: 4/7 — Calculator Foundation (qcalc)
├─ Estimated lines: ~850 (CSS ~250 + JS framework ~150 + 8 migrations ~450)
├─ Files to touch:
│   ├─ platform/assets/style.css  (.qcalc-* full system)
│   ├─ platform/assets/app.js     (Upg.calc registry + mount + 8 registrations)
│   └─ platform/index.html        (re-skin existing calculator markup → .qcalc skeleton)
├─ Migration policy: NO math changes — only wrapper restructure.
└─ Deliverable: commit "phase 4: Calculator Foundation Component (qcalc)" + push.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — **CSS** للـ `qcalc` system

```css
/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — qcalc (Worker 11 / Phase 4)
   Stripe-grade calculator skeleton
   ═══════════════════════════════════════════════════════════════ */
.qcalc {
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 0;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  font-variant-numeric: tabular-nums;
}

.qcalc-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1.25rem;
  background: var(--color-surface-0);
  border-bottom: 1px solid var(--color-border);
}
.qcalc-title { display: flex; align-items: center; gap: 0.625rem; }
.qcalc-title h3 { font-size: 1.05rem; font-weight: 700; margin: 0; }
.qcalc-title .qi { color: var(--color-brand); }

.qcalc-actions { display: flex; gap: 0.25rem; }
.qcalc-btn-icon {
  width: 32px; height: 32px;
  display: grid; place-items: center;
  background: transparent; color: var(--color-text-muted);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 180ms, color 180ms;
}
.qcalc-btn-icon:hover {
  background: var(--color-surface-2); color: var(--color-text);
  border-color: var(--color-border);
}
.qcalc-btn-icon:focus-visible { outline: none; box-shadow: var(--ring); }

.qcalc-body {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 0;
  min-height: 240px;
}
@media (max-width: 720px) { .qcalc-body { grid-template-columns: 1fr; } }

.qcalc-inputs {
  padding: 1.25rem;
  display: grid; gap: 1rem;
  border-inline-end: 1px solid var(--color-border);
}
@media (max-width: 720px) { .qcalc-inputs { border-inline-end: 0; border-bottom: 1px solid var(--color-border); } }

.qcalc-field { display: flex; flex-direction: column; gap: 0.375rem; }
.qcalc-label {
  font-size: 0.85rem; color: var(--color-text-muted);
  font-weight: 500;
}

.qcalc-input-wrap {
  position: relative;
  display: flex; align-items: stretch;
  background: var(--color-surface-0);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border 180ms, box-shadow 180ms;
}
.qcalc-input-wrap:focus-within { border-color: var(--color-brand); box-shadow: var(--ring); }

.qcalc-input {
  flex: 1; min-width: 0;
  padding: 0.75rem 1rem;
  background: transparent; color: var(--color-text);
  border: 0; font: inherit;
  font-variant-numeric: tabular-nums;
  text-align: end;
}
.qcalc-input:focus { outline: none; }
.qcalc-input::-webkit-inner-spin-button,
.qcalc-input::-webkit-outer-spin-button { appearance: none; margin: 0; }

.qcalc-prefix, .qcalc-suffix {
  display: grid; place-items: center;
  padding: 0 0.75rem;
  font-size: 0.875rem; color: var(--color-text-muted);
  background: var(--color-surface-2);
  border-inline-start: 1px solid var(--color-border);
}
.qcalc-prefix { border-inline-start: 0; border-inline-end: 1px solid var(--color-border); }

.qcalc-hint { font-size: 0.75rem; color: var(--color-text-faint); margin: 0; }

.qcalc-summary {
  padding: 1.25rem;
  display: grid; gap: 0.75rem;
  background:
    radial-gradient(ellipse at 50% 0%, var(--color-brand-soft), transparent 60%),
    var(--color-surface-1);
}

.qcalc-result-card {
  display: flex; flex-direction: column;
  padding: 0.875rem 1rem;
  background: var(--color-surface-0);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
.qcalc-result-label { font-size: 0.8rem; color: var(--color-text-muted); }
.qcalc-result-value {
  font-size: 1.5rem; font-weight: 700; color: var(--color-text);
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
  margin: 0.125rem 0;
}
.qcalc-result-unit { font-size: 0.8rem; color: var(--color-text-faint); }

.qcalc-result-primary {
  border-color: var(--color-brand);
  background: linear-gradient(180deg, var(--color-brand-soft), var(--color-surface-0));
}
.qcalc-result-primary .qcalc-result-value { color: var(--color-brand); font-size: 2rem; }

.qcalc-explain {
  padding: 1rem 1.25rem;
  background: var(--color-surface-0);
  border-top: 1px solid var(--color-border);
  font-size: 0.9rem; color: var(--color-text-muted);
  line-height: 1.7;
}
.qcalc-explain:empty { display: none; }
.qcalc-explain strong { color: var(--color-text); font-weight: 600; }
.qcalc-explain code {
  background: var(--color-surface-2); padding: 0.125rem 0.375rem;
  border-radius: var(--radius-xs); font-size: 0.85em;
}

.qcalc-toast {
  position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
  padding: 0.625rem 1rem;
  background: var(--color-text); color: var(--color-bg);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  z-index: 10000;
  animation: qcalc-toast-in 280ms ease-out;
}
@keyframes qcalc-toast-in { from { opacity:0; transform:translate(-50%, 12px); } to { opacity:1; transform:translate(-50%, 0); } }
```

### Step 2 — **JS Engine** `Upg.calc`

```js
/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — qcalc Engine (Worker 11 / Phase 4)
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const fmt = new Intl.NumberFormat('ar-IQ', { maximumFractionDigits: 2 });
  const fmtMoney = new Intl.NumberFormat('ar-IQ', { maximumFractionDigits: 0 });
  const fmtPct  = (v) => `${(+v * 100).toFixed(1)}%`;

  const registry = new Map();

  const toast = (msg) => {
    const t = document.createElement('div');
    t.className = 'qcalc-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1800);
  };

  const collectInputs = (el) => {
    const data = {};
    el.querySelectorAll('[name]').forEach(input => {
      const v = input.value;
      if (input.type === 'checkbox') data[input.name] = input.checked;
      else if (input.type === 'number' || input.dataset.numeric === 'true') data[input.name] = +v || 0;
      else data[input.name] = v;
    });
    return data;
  };

  const mount = (el) => {
    if (el.__qcalcMounted) return;
    const name = el.dataset.calc;
    const def = registry.get(name);
    if (!def) {
      console.warn(`[Upg.calc] No registration for: ${name}`);
      return;
    }

    const update = () => {
      const data = collectInputs(el);
      let result;
      try { result = def.compute(data); }
      catch (err) { console.error(`[qcalc:${name}] compute error`, err); return; }

      el.querySelectorAll('[data-bind]').forEach(b => {
        const key = b.dataset.bind;
        if (key === 'explain') {
          b.innerHTML = def.explain ? def.explain(data, result) : '';
          return;
        }
        const val = result[key];
        if (val === undefined || val === null) { b.textContent = '—'; return; }
        const formatter = b.dataset.format;
        if (formatter === 'money') b.textContent = fmtMoney.format(val);
        else if (formatter === 'pct') b.textContent = fmtPct(val);
        else if (formatter === 'int') b.textContent = Math.round(val).toLocaleString('ar-IQ');
        else b.textContent = (typeof val === 'number') ? fmt.format(val) : String(val);
      });
    };

    el.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', update);
      input.addEventListener('change', update);
    });

    el.querySelector('[data-action="reset"]')?.addEventListener('click', () => {
      el.querySelectorAll('input').forEach(i => {
        if (i.type === 'checkbox') i.checked = i.defaultChecked;
        else i.value = i.defaultValue || '';
      });
      el.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
      update();
      toast('تمت إعادة التعيين');
    });

    el.querySelector('[data-action="copy"]')?.addEventListener('click', () => {
      const text = [...el.querySelectorAll('.qcalc-summary [data-bind]')].map(b => {
        const card = b.closest('.qcalc-result-card');
        const lbl = card?.querySelector('.qcalc-result-label')?.textContent || '';
        return `${lbl}: ${b.textContent}`;
      }).join('\n');
      navigator.clipboard.writeText(text).then(() => toast('تم النسخ'));
    });

    el.querySelector('[data-action="export"]')?.addEventListener('click', () => {
      const data = collectInputs(el);
      const result = def.compute(data);
      const blob = new Blob([JSON.stringify({ calc: name, inputs: data, outputs: result, ts: new Date().toISOString() }, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${name}-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast('تم التصدير');
    });

    update();
    el.__qcalcMounted = true;
  };

  const register = (name, def) => {
    if (typeof def.compute !== 'function') throw new Error(`compute() required for ${name}`);
    registry.set(name, def);
  };

  const init = () => {
    document.querySelectorAll('.qcalc[data-calc]').forEach(mount);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Re-init when navigating (for lazy-loaded pages)
  window.addEventListener('upg:page-shown', init);

  window.Upg = window.Upg || {};
  window.Upg.calc = { register, mount, init };
})();
```

### Step 3 — **HTML Skeleton** الموحّد لكل حاسبة

```html
<div class="qcalc" data-calc="iraq-tax">
  <div class="qcalc-header">
    <div class="qcalc-title">
      <i class="qi qi-md" data-icon="calculator"></i>
      <h3>حاسبة ضريبة الدخل العراقية</h3>
    </div>
    <div class="qcalc-actions">
      <button class="qcalc-btn-icon" data-action="reset" aria-label="إعادة تعيين"><i class="qi" data-icon="refresh"></i></button>
      <button class="qcalc-btn-icon" data-action="copy"  aria-label="نسخ النتيجة"><i class="qi" data-icon="copy"></i></button>
      <button class="qcalc-btn-icon" data-action="export" aria-label="تصدير JSON"><i class="qi" data-icon="download"></i></button>
    </div>
  </div>

  <div class="qcalc-body">
    <div class="qcalc-inputs">
      <label class="qcalc-field">
        <span class="qcalc-label">الراتب الإجمالي الشهري</span>
        <div class="qcalc-input-wrap">
          <input type="number" class="qcalc-input" name="gross" min="0" step="1000" value="1000000">
          <span class="qcalc-suffix">د.ع</span>
        </div>
        <span class="qcalc-hint">قبل أي خصومات</span>
      </label>

      <label class="qcalc-field">
        <span class="qcalc-label">عدد المعالين</span>
        <div class="qcalc-input-wrap">
          <input type="number" class="qcalc-input" name="dependents" min="0" max="20" step="1" value="0">
          <span class="qcalc-suffix">شخص</span>
        </div>
      </label>

      <label class="qcalc-field">
        <span class="qcalc-label">الحالة</span>
        <select class="qcalc-input" name="status">
          <option value="single">أعزب</option>
          <option value="married">متزوج</option>
        </select>
      </label>
    </div>

    <div class="qcalc-summary">
      <div class="qcalc-result-card qcalc-result-primary">
        <span class="qcalc-result-label">الصافي الشهري</span>
        <span class="qcalc-result-value" data-bind="net" data-format="money">0</span>
        <span class="qcalc-result-unit">د.ع</span>
      </div>
      <div class="qcalc-result-card">
        <span class="qcalc-result-label">إجمالي الضريبة</span>
        <span class="qcalc-result-value" data-bind="tax" data-format="money">0</span>
      </div>
      <div class="qcalc-result-card">
        <span class="qcalc-result-label">الإعفاءات</span>
        <span class="qcalc-result-value" data-bind="exemptions" data-format="money">0</span>
      </div>
    </div>
  </div>

  <div class="qcalc-explain" data-bind="explain"></div>
</div>
```

### Step 4 — **تسجيل 8 حاسبات** (لا تغيّر math، فقط wrap)

> **مهم:** اذهب لكل حاسبة موجودة، استخرج منطق الحساب الحالي ثم لُف عبر `Upg.calc.register`.

#### مثال: Iraq Tax (Worker 04)

```js
Upg.calc.register('iraq-tax', {
  compute({ gross, dependents, status }) {
    const personalExempt = 2_500_000 / 12; // افتراضات Worker 04 الموجودة
    const dependentExempt = (dependents || 0) * (200_000);
    const marriedBonus = status === 'married' ? 200_000 : 0;
    const totalExempt = personalExempt + dependentExempt + marriedBonus;

    const taxable = Math.max(0, gross - totalExempt);
    // شرائح ضريبية عراقية تقريبية (احفظها كما هي من Worker 04 الأصلي):
    let tax = 0;
    if (taxable > 0)            tax += Math.min(taxable, 250_000) * 0.03;
    if (taxable > 250_000)      tax += Math.min(taxable - 250_000, 250_000) * 0.05;
    if (taxable > 500_000)      tax += Math.min(taxable - 500_000, 500_000) * 0.10;
    if (taxable > 1_000_000)    tax += (taxable - 1_000_000) * 0.15;

    const net = gross - tax;
    return { gross, tax, exemptions: totalExempt, taxable, net };
  },
  explain(d, r) {
    return `
      <strong>طريقة الحساب:</strong>
      الإعفاءات الإجمالية = <code>${r.exemptions.toLocaleString('ar-IQ')}</code> د.ع.
      الراتب الخاضع للضريبة = <code>${r.taxable.toLocaleString('ar-IQ')}</code> د.ع.
      تطبَّق الشرائح التصاعدية (3% / 5% / 10% / 15%) → الضريبة = <code>${r.tax.toLocaleString('ar-IQ')}</code> د.ع.
      <br><em>المرجع: قانون ضريبة الدخل العراقي رقم 113 لسنة 1982 وتعديلاته.</em>
    `;
  }
});
```

#### قائمة بقية الـ 7 حاسبات (للتسجيل)

كل واحدة تتبع نفس النمط — استخرج math من Worker الأصلي:

1. **`salary-slip`** (Worker 04) — gross / deductions / net + breakdown
2. **`sales-commission`** (Worker 02) — base + tier rates + bonus
3. **`apindex`** (Worker 03) — Adherence × Performance × Index formula
4. **`ab-test`** (Worker 06) — sample size + statistical power + min effect
5. **`batna`** (Worker 08) — your offer / reservation / target / ZOPA detection
6. **`bigo-cost`** (Worker 05) — input n + select complexity → operations count
7. **`bigfive-score`** (Worker 09) — 5 traits × percentile lookup table

> **التزام:** قبل migration، اقرأ كل حاسبة الأصلية (line range محدد) وانسخ math 1:1.

### Step 5 — **استبدال HTML الحاسبات الموجودة** بالـ skeleton الجديد

نظراً لأن الـ markup الحالي مختلف لكل حاسبة، الاستراتيجية:

1. ابحث عن container الحاسبة الحالي (مثلاً `.iraq-tax-calculator` أو ID مشابه).
2. استبدل **innerHTML** بالـ skeleton الجديد مع inputs/binds الصحيحة.
3. CSS classes القديمة الخاصة (مثلاً `.tax-form`, `.tax-result`) تبقى فعّالة لكن lower-priority — `.qcalc-*` يطغى.
4. اختبر بصرياً.

---

## ✅ Acceptance Criteria للـ Phase 4

- [ ] الـ 8 حاسبات تستخدم `class="qcalc"` و `data-calc="..."`.
- [ ] كل حاسبة فيها 3 actions: reset / copy / export — تشتغل.
- [ ] Live update — كل تغيّر input يحدّث summary بدون refresh.
- [ ] الأرقام بـ `tabular-nums` و `Intl.NumberFormat('ar-IQ')`.
- [ ] math output **مطابق 100%** للنسخة قبل migration (لا regression).
- [ ] explain section يظهر معادلات/مصدر لكل حاسبة.
- [ ] mobile (< 720px): layout يلتف عمودياً بشكل صحيح.
- [ ] لا errors في console.

---

## 🛡️ في نهاية الـ Phase

```
1. commit  : "phase 4: Calculator Foundation Component (qcalc) + 8 migrations"
2. push    : worker-11-complete
3. state   : current.phase=4, completed_phases[+], snapshot file
4. push    : ثاني
```

**التالي:** `prompts/11_PHASE_5_COMMAND_PALETTE.md`.

— نهاية Phase 4.
