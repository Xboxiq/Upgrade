/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-38.js
   Extracted from app.js lines 12324-12649
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const ready = () => {
    if (!window.Upg?.calc?.register) {
      setTimeout(ready, 30);
      return;
    }
    const C = window.Upg.calc;

    /* 1) iraq-tax (Worker 04) — قانون 113/1982 + شرائح
       Personal: 1,000,000 IQD/year ≈ 83,333/month
       Married bonus, dependents allowance.
       Brackets (annual taxable): 250k @3% / 250k @5% / 500k @10% / >1M @15%  */
    C.register('iraq-tax', {
      compute({ gross, dependents, status }) {
        gross = Math.max(0, +gross || 0);
        dependents = Math.max(0, Math.min(20, +dependents || 0));
        const personalExempt   = 1_000_000 / 12;        // ~83,333/month
        const marriedBonus     = status === 'married' ? 80_000 : 0;
        const dependentExempt  = dependents * 50_000;
        const totalExempt      = personalExempt + marriedBonus + dependentExempt;
        const taxable          = Math.max(0, gross - totalExempt);

        let tax = 0;
        if (taxable > 0)         tax += Math.min(taxable, 250_000) * 0.03;
        if (taxable > 250_000)   tax += Math.min(taxable - 250_000, 250_000) * 0.05;
        if (taxable > 500_000)   tax += Math.min(taxable - 500_000, 500_000) * 0.10;
        if (taxable > 1_000_000) tax += (taxable - 1_000_000) * 0.15;

        const net = gross - tax;
        const effRate = gross > 0 ? (tax / gross) * 100 : 0;
        return { gross, tax, exemptions: totalExempt, taxable, net, effRate };
      },
      explain(d, r) {
        return `
          <strong>طريقة الحساب:</strong>
          الإعفاءات الإجمالية = <code>${Math.round(r.exemptions).toLocaleString('ar-IQ')}</code> د.ع.
          الراتب الخاضع = <code>${Math.round(r.taxable).toLocaleString('ar-IQ')}</code> د.ع.
          تُطبَّق الشرائح التصاعدية (3% / 5% / 10% / 15%) → الضريبة = <code>${Math.round(r.tax).toLocaleString('ar-IQ')}</code> د.ع.
          النسبة الفعلية ≈ <code>${r.effRate.toFixed(2)}%</code>.
          <em>المرجع: قانون ضريبة الدخل العراقي رقم 113 لسنة 1982 وتعديلاته. الإعفاء الشخصي ~ 1,000,000 د.ع سنوياً.</em>
        `;
      }
    });

    /* 2) salary-slip (Worker 04) — gross / deductions / net */
    C.register('salary-slip', {
      compute({ gross, ssRate, taxRate, otherDeductions, allowances }) {
        gross = Math.max(0, +gross || 0);
        ssRate = clamp01(+ssRate / 100);
        taxRate = clamp01(+taxRate / 100);
        const allow = Math.max(0, +allowances || 0);
        const others = Math.max(0, +otherDeductions || 0);
        const totalGross = gross + allow;
        const ss = gross * ssRate;
        const taxable = Math.max(0, totalGross - ss);
        const tax = taxable * taxRate;
        const totalDeductions = ss + tax + others;
        const net = totalGross - totalDeductions;
        return { totalGross, ss, tax, others, totalDeductions, net, ssAndTax: ss + tax };
      },
      explain(d, r) {
        return `
          <strong>سلاسل الخصومات:</strong>
          الضمان (5%) = <code>${Math.round(r.ss).toLocaleString('ar-IQ')}</code>،
          ضريبة الدخل = <code>${Math.round(r.tax).toLocaleString('ar-IQ')}</code>،
          خصومات أخرى = <code>${Math.round(r.others).toLocaleString('ar-IQ')}</code>.
          <strong>الصافي =</strong> الإجمالي − الخصومات = <code>${Math.round(r.net).toLocaleString('ar-IQ')}</code> د.ع.
          <em>المرجع: قانون العمل العراقي رقم 37 لسنة 2015 — اشتراك العامل في الضمان 5% (صاحب العمل 12%).</em>
        `;
      }
    });

    /* 3) sales-commission (Worker 02) — base + tier rates */
    C.register('sales-commission', {
      compute({ base, sales, target, tier1Rate, tier2Rate, kicker }) {
        base = Math.max(0, +base || 0);
        sales = Math.max(0, +sales || 0);
        target = Math.max(1, +target || 1);
        const t1 = (+tier1Rate / 100) || 0;
        const t2 = (+tier2Rate / 100) || 0;
        const kick = (+kicker / 100) || 0;

        const attainment = (sales / target) * 100;
        const upToTarget = Math.min(sales, target);
        const overTarget = Math.max(0, sales - target);
        const commissionT1 = upToTarget * t1;
        const commissionT2 = overTarget * t2;
        const kickerBonus  = attainment >= 110 ? sales * kick : 0;
        const totalComm    = commissionT1 + commissionT2 + kickerBonus;
        const ote          = base + totalComm;
        return {
          attainment, commissionT1, commissionT2, kickerBonus,
          totalComm, base, ote,
          attainmentMeter: clamp(attainment, 0, 100),
          tierState: attainment >= 110 ? 'good' : (attainment < 70 ? 'bad' : null)
        };
      },
      explain(d, r) {
        return `
          <strong>هيكل العمولة:</strong>
          الأساسي = <code>${Math.round(r.base).toLocaleString('ar-IQ')}</code> +
          عمولة حتى الهدف (${(d.tier1Rate||0)}%) = <code>${Math.round(r.commissionT1).toLocaleString('ar-IQ')}</code> +
          عمولة فوق الهدف (${(d.tier2Rate||0)}%) = <code>${Math.round(r.commissionT2).toLocaleString('ar-IQ')}</code>
          ${r.kickerBonus > 0 ? ` + Kicker (${(d.kicker||0)}%) = <code>${Math.round(r.kickerBonus).toLocaleString('ar-IQ')}</code>` : ''}.
          <strong>OTE</strong> = <code>${Math.round(r.ote).toLocaleString('ar-IQ')}</code>. تحقيق الهدف ${r.attainment.toFixed(1)}%.
          <em>Cron / Stripe Sales Compensation guideline: kicker يُفعَّل عند ≥ 110% attainment.</em>
        `;
      }
    });

    /* 4) apindex (Worker 03) — Agent Performance Index */
    C.register('apindex', {
      compute({ aht, fcr, csat, adh, qa, calls }) {
        aht  = clamp(+aht || 5.2, 0.5, 30);
        fcr  = clamp(+fcr || 72, 0, 100);
        csat = clamp(+csat || 84, 0, 100);
        adh  = clamp(+adh || 93, 0, 100);
        qa   = clamp(+qa || 88, 0, 100);
        calls= clamp(+calls || 60, 0, 500);

        // Normalize to 0..100 (AHT inverse: 4 = 100, 8 = 0)
        const ahtScore = clamp(((8 - aht) / (8 - 4)) * 100, 0, 100);
        const callsScore = clamp((calls / 80) * 100, 0, 100);
        const idx =
          ahtScore   * 0.15 +
          fcr        * 0.20 +
          csat       * 0.25 +
          adh        * 0.10 +
          qa         * 0.20 +
          callsScore * 0.10;

        const tier =
          idx >= 90 ? 'Top Performer' :
          idx >= 80 ? 'Strong'        :
          idx >= 70 ? 'Solid'         :
          idx >= 60 ? 'Coaching'      : 'Action Plan';

        return {
          index: idx, tier,
          ahtScore, fcr, csat, adh, qa, callsScore,
          tierState: idx >= 80 ? 'good' : (idx < 70 ? 'bad' : null),
          meter: idx
        };
      },
      explain(d, r) {
        return `
          <strong>صيغة APIndex (موزونة):</strong>
          <code>0.15·AHT + 0.20·FCR + 0.25·CSAT + 0.10·ADH + 0.20·QA + 0.10·Calls</code>.
          النتيجة = <code>${r.index.toFixed(1)}</code>/100 → <strong>${r.tier}</strong>.
          AHT يُعكس (أقل = أفضل). Calls يُعاير على 80 مكالمة/شفت.
          <em>المرجع: COPC CX Standard 6.2 + Genesys Workforce Optimization 2024.</em>
        `;
      }
    });

    /* 5) ab-test (Worker 06) — Sample Size Calculator (per variant) */
    C.register('ab-test', {
      compute({ baseline, lift, alpha, power }) {
        const p1 = clamp01(+baseline / 100);
        const rel = (+lift / 100) || 0;
        const p2 = clamp01(p1 * (1 + rel));
        const a = (+alpha) || 0.05;
        const pw = (+power) || 0.80;

        // Z-scores
        const Za = (a <= 0.01) ? 2.576 : (a <= 0.05 ? 1.96 : (a <= 0.10 ? 1.645 : 1.28));
        const Zb = (pw >= 0.95) ? 1.645 : (pw >= 0.90 ? 1.282 : (pw >= 0.80 ? 0.842 : 0.524));

        // Two-proportion sample size per arm
        const pBar = (p1 + p2) / 2;
        const num = Math.pow(Za * Math.sqrt(2 * pBar * (1 - pBar)) + Zb * Math.sqrt(p1*(1-p1) + p2*(1-p2)), 2);
        const den = Math.pow(p1 - p2, 2) || 1e-9;
        const nPerArm = Math.ceil(num / den);
        const totalN = nPerArm * 2;
        const detectable = (Math.abs(p2 - p1) * 100).toFixed(2);
        return {
          nPerArm, totalN, baselineRate: p1 * 100, variantRate: p2 * 100,
          mde: parseFloat(detectable),
          state: rel === 0 ? 'bad' : (Math.abs(rel) >= 0.10 ? 'good' : null)
        };
      },
      explain(d, r) {
        return `
          <strong>أحجام العينة المطلوبة:</strong>
          <code>${r.nPerArm.toLocaleString('ar-IQ')}</code> لكل ذراع، الإجمالي <code>${r.totalN.toLocaleString('ar-IQ')}</code>.
          المعدل الأساس = <code>${r.baselineRate.toFixed(2)}%</code> → معدل المتغيّر = <code>${r.variantRate.toFixed(2)}%</code> (Δ = ${r.mde}pp).
          ألفا (نسبة الخطأ النوع الأول) = ${(d.alpha*100).toFixed(1)}%، Power = ${(d.power*100).toFixed(0)}%.
          <em>المرجع: Kohavi, Tang & Xu — <i>Trustworthy Online Controlled Experiments</i> (2020). الصيغة Two-proportion z-test.</em>
        `;
      }
    });

    /* 6) batna (Worker 08) — Negotiation: Reservation/Target/ZOPA */
    C.register('batna', {
      compute({ reservation, target, opening, theirAnchor, theirReservation }) {
        const yourReservation = Math.max(0, +reservation || 0);
        const yourTarget      = Math.max(0, +target || 0);
        const yourOpening     = Math.max(0, +opening || 0);
        const theirAnchorVal  = Math.max(0, +theirAnchor || 0);
        const theirRes        = Math.max(0, +theirReservation || 0);

        // ZOPA = overlap between your acceptable range [yourReservation .. yourTarget] and theirs.
        // Buyer side assumed: lower price = better. Seller side assumed: higher price = better.
        const zopaLow  = Math.max(yourReservation, theirRes);
        const zopaHigh = Math.min(yourTarget,      theirAnchorVal);
        const hasZopa  = zopaHigh >= zopaLow;
        const zopaWidth = hasZopa ? (zopaHigh - zopaLow) : 0;
        const midpoint = hasZopa ? (zopaLow + zopaHigh) / 2 : 0;
        const askingMargin = yourOpening - yourTarget;
        return {
          yourReservation, yourTarget, yourOpening,
          zopaLow, zopaHigh, zopaWidth, midpoint, askingMargin,
          status: hasZopa ? 'متاحة' : 'غير متاحة',
          state: hasZopa ? 'good' : 'bad'
        };
      },
      explain(d, r) {
        return `
          <strong>منطقة الاتفاق المحتمل (ZOPA):</strong>
          ${r.zopaWidth > 0
            ? `موجودة بين <code>${Math.round(r.zopaLow).toLocaleString('ar-IQ')}</code>
               و <code>${Math.round(r.zopaHigh).toLocaleString('ar-IQ')}</code>.
               نقطة الوسط = <code>${Math.round(r.midpoint).toLocaleString('ar-IQ')}</code>.`
            : `<strong style="color:var(--color-danger,#ff7a7a)">لا يوجد تداخل</strong> — فكّك الافتراضات أو ابحث عن BATNA أقوى.`
          }
          فجوة Anchoring: <code>${Math.round(r.askingMargin).toLocaleString('ar-IQ')}</code> فوق هدفك.
          <em>المرجع: Fisher, Ury & Patton — <i>Getting to Yes</i> (Harvard Negotiation Project) + Voss, <i>Never Split the Difference</i>.</em>
        `;
      }
    });

    /* 7) bigo-cost (Worker 05) — Big-O operations estimator */
    C.register('bigo-cost', {
      compute({ n, complexity }) {
        n = Math.max(1, +n || 1);
        const map = {
          'O(1)':       { ops: 1,                 label: 'ثابت' },
          'O(log n)':   { ops: Math.log2(n),      label: 'لوغاريتمي' },
          'O(n)':       { ops: n,                 label: 'خطي' },
          'O(n log n)': { ops: n * Math.log2(n),  label: 'لوغاريتمي خطي' },
          'O(n^2)':     { ops: n * n,             label: 'تربيعي' },
          'O(n^3)':     { ops: n * n * n,         label: 'تكعيبي' },
          'O(2^n)':     { ops: Math.pow(2, Math.min(n, 60)), label: 'أُسّي' },
          'O(n!)':      { ops: factorial(Math.min(n, 18)),   label: 'عاملي' }
        };
        const entry = map[complexity] || map['O(n)'];
        const ops = entry.ops;
        // Assume 1e8 ops/sec
        const seconds = ops / 1e8;
        const human =
          seconds < 1e-6 ? '< 1µs' :
          seconds < 1    ? `${(seconds*1000).toFixed(2)} ms` :
          seconds < 60   ? `${seconds.toFixed(1)} ث` :
          seconds < 3600 ? `${(seconds/60).toFixed(1)} دقيقة` :
          seconds < 86400? `${(seconds/3600).toFixed(1)} ساعة` :
                            `${(seconds/86400).toFixed(1)} يوم`;
        const state =
          seconds < 0.1   ? 'good' :
          seconds < 5     ? null   :
          'bad';
        return {
          ops, opsHuman: ops.toExponential(2),
          opsRounded: Math.min(ops, 1e15),
          seconds, timeHuman: human,
          label: entry.label,
          state
        };
      },
      explain(d, r) {
        return `
          <strong>تقدير العمليات:</strong>
          <code>${d.complexity}</code> مع n = <code>${(+d.n).toLocaleString('ar-IQ')}</code>
          → ≈ <code>${r.opsHuman}</code> عملية (${r.label}).
          بافتراض جهاز يُنفّذ 10⁸ عملية/ثانية → الزمن المتوقع <strong>${r.timeHuman}</strong>.
          <em>المرجع: Cormen, Leiserson, Rivest, Stein — <i>Introduction to Algorithms</i> (MIT, 4th ed.).</em>
        `;
      }
    });

    /* 8) bigfive-score (Worker 09) — Big Five OCEAN percentile */
    C.register('bigfive-score', {
      compute({ openness, conscientious, extraversion, agreeableness, neuroticism }) {
        const O = clamp(+openness || 50, 0, 100);
        const C2 = clamp(+conscientious || 50, 0, 100);
        const E = clamp(+extraversion || 50, 0, 100);
        const A = clamp(+agreeableness || 50, 0, 100);
        const N = clamp(+neuroticism || 50, 0, 100);

        const labelOf = (v) =>
          v >= 80 ? 'مرتفع جداً' :
          v >= 65 ? 'مرتفع'      :
          v >= 45 ? 'متوسط'      :
          v >= 30 ? 'منخفض'      : 'منخفض جداً';

        const composite = (O*0.20 + C2*0.25 + E*0.20 + A*0.20 + (100 - N)*0.15);
        return {
          O, C2, E, A, N,
          oLabel: labelOf(O), cLabel: labelOf(C2), eLabel: labelOf(E),
          aLabel: labelOf(A), nLabel: labelOf(N),
          composite,
          state: composite >= 70 ? 'good' : (composite < 40 ? 'bad' : null)
        };
      },
      explain(d, r) {
        return `
          <strong>تفسير مختصر:</strong>
          الانفتاح (O) ${r.oLabel} · الضمير (C) ${r.cLabel} · الانبساط (E) ${r.eLabel}
          · المقبولية (A) ${r.aLabel} · العصابية (N) ${r.nLabel}.
          <strong>مؤشّر الأداء المركّب</strong> = <code>${r.composite.toFixed(1)}</code>/100
          (يُعطي وزناً أعلى لـ Conscientiousness ويعكس Neuroticism).
          <em>المرجع: McCrae & Costa, NEO-PI-R (1992) + Goldberg IPIP. النسب المئوية تخميني للتعليم — لا تستخدم في تقييم سريري.</em>
        `;
      }
    });

    // Helpers used in registrations
    function clamp(v, lo, hi) { v = +v; if (!Number.isFinite(v)) v = 0; return Math.max(lo, Math.min(hi, v)); }
    function clamp01(v) { return clamp(v, 0, 1); }
    function factorial(n) {
      n = Math.max(0, Math.min(170, Math.floor(n)));
      let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
    }
  };
  ready();
})();
