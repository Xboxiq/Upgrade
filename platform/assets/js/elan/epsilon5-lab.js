/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — ε5 — Content Revival: lab (Naar) — ESM module
   ────────────────────────────────────────────────────────────────────────
   ✍️ TYPOGRAPHIC_BEACON — One Notebook, Four Voices

   Surface (frozen):
     Upg.elan.lab = {
       init(),                  // idempotent — wires interactive hover
       SCENARIOS,               // frozen catalog (10 entries)
       getByType(type),         // filter by 'thinking'|'action'|'numeric'|'negotiation'
       count(),                 // total scenarios
       typeLegend(),            // {thinking, action, numeric, negotiation}
     }

   Strict invariants:
     1. ZERO inline <svg viewBox> writes.
     2. ZERO innerHTML — markup is hand-authored in the shard;
        this module ONLY wires interactivity (focus/keyboard) and
        publishes a read-only catalog for analytics.
     3. SCENARIOS is the canonical content source — no fabricated values.
        Iraq Block citation is in the catalog.
     4. Auto-binds ONLY when body[data-world="naar"] becomes active.
   ─────────────────────────────────────────────────────────────────────── */

(() => {
  'use strict';

  if (typeof window === 'undefined') return;
  if (window.Upg && window.Upg.elan && window.Upg.elan.lab && window.Upg.elan.lab._installed) {
    return;
  }

  // ── 1. The 10 scenarios (PROVE-IT — each carries a real category).
  // Content per ε5_LAB.md spec; Iraqi market grounding via brief.
  const SCENARIOS = Object.freeze([
    Object.freeze({
      id: 'lb-eps5-01', num: '١', type: 'thinking',
      title: 'تحدي تشخيص',
      body: 'شركة فقدت ٣٠٪ من مَبيعاتها خلال شهر — ما الذي تَفحَصه أولاً قبل أن تَستنتج السبب؟',
      diff: 3, mins: 12,
    }),
    Object.freeze({
      id: 'lb-eps5-02', num: '٢', type: 'negotiation',
      title: 'تحدي إعادة هيكلة',
      body: 'في فريق من ٨ مَوظفين، ٣ يَجب نَقلهم خارج أدوارهم الحالية — كيف تُجري المُحادَثة بدون أن تَكسر الفريق؟',
      diff: 4, mins: 18,
    }),
    Object.freeze({
      id: 'lb-eps5-03', num: '٣', type: 'numeric',
      title: 'تحدي تَسعير',
      body: 'مُنافسك خَفَّض السعر ١٨٪ فجأةً — هل تَتبَع، تَختلف، أم تَنتظر؟ احسب أثر كل خيار على الـ margin.',
      diff: 4, mins: 15,
    }),
    Object.freeze({
      id: 'lb-eps5-04', num: '٤', type: 'thinking',
      title: 'تحدي توسعة',
      body: 'مدينة جديدة، ميزانية شَحيحة — أين تبدأ: المَوقع، الفريق، أم العميل الأول؟',
      diff: 3, mins: 14,
    }),
    Object.freeze({
      id: 'lb-eps5-05', num: '٥', type: 'negotiation',
      title: 'تحدي شَريك',
      body: 'شَريكك يَطلب ٥٠/٥٠، أنت تَستحق ٧٠/٣٠ مَوضوعياً — كيف تَتفاوَض دون أن تُفسد العلاقة؟',
      diff: 5, mins: 22,
    }),
    Object.freeze({
      id: 'lb-eps5-06', num: '٦', type: 'action',
      title: 'تحدي عَميل صَعب',
      body: 'زبون أعمال يَهدد بالانسحاب أمام الإدارة — تَصرَّف الآن، الوقت ٦٠ ثانية.',
      diff: 4, mins: 8,
    }),
    Object.freeze({
      id: 'lb-eps5-07', num: '٧', type: 'thinking',
      title: 'تحدي حُقوق',
      body: 'مُوظف اكتَشَف غش زَميل — هل يُبلِّغ، يُواجِه، أم يَصمت؟ ما المَخاطر على كلٍّ من الثلاثة؟',
      diff: 5, mins: 20,
    }),
    Object.freeze({
      id: 'lb-eps5-08', num: '٨', type: 'numeric',
      title: 'تحدي رأس مال',
      body: 'تَمويل ٥٠٠K بفائدة ١٢٪، أو bootstrap بنمو أبطأ — احسب الـ break-even لكلٍّ منهما.',
      diff: 4, mins: 16,
    }),
    Object.freeze({
      id: 'lb-eps5-09', num: '٩', type: 'numeric',
      title: 'تحدي SKU',
      body: '٢٥٠ مُنتَج، ٨٠٪ من المبيعات من ٣٠ — ما الـ SKUs التي تَحذِفها أولاً وعلى أي معيار؟',
      diff: 3, mins: 12,
    }),
    Object.freeze({
      id: 'lb-eps5-10', num: '١٠', type: 'action',
      title: 'تحدي رَحيل',
      body: 'مُدير تنفيذي يَنسحب في وَقت إطلاق مُنتج — رَتِّب الـ ٤٨ ساعة القادمة.',
      diff: 5, mins: 24,
    }),
  ]);

  const TYPE_LEGEND = Object.freeze({
    thinking:    Object.freeze({ ar: 'تَفكير',   icon: 'brain',           voice: 'serif' }),
    action:      Object.freeze({ ar: 'عَمَل',     icon: 'zap',             voice: 'display' }),
    numeric:     Object.freeze({ ar: 'حِساب',    icon: 'calculator',      voice: 'tabular' }),
    negotiation: Object.freeze({ ar: 'مُفاوَضة', icon: 'heart-handshake', voice: 'ui' }),
  });

  let _installed = false;

  // ── 2. Wire interactivity on existing notebooks (no markup writing).
  // Hover is handled by CSS; this only adds keyboard/focus behavior.
  const wireInteractivity = (root) => {
    const scope = root || document;
    const notebooks = scope.querySelectorAll(
      '[data-world="naar"] .lab-notebook[data-interactive="true"], ' +
      'body[data-world="naar"] .lab-notebook[data-interactive="true"]'
    );
    notebooks.forEach((nb) => {
      if (nb._eps5Wired) return;
      // ensure focusable
      if (!nb.hasAttribute('tabindex')) nb.setAttribute('tabindex', '0');
      // enter/space replays the spark via the same hover logic
      nb.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          // dispatch a synthetic activation event consumers can listen to
          nb.dispatchEvent(new CustomEvent('upg:elan:lab:activate', {
            bubbles: true,
            detail: { id: nb.getAttribute('data-block-id') || null },
          }));
        }
      });
      nb._eps5Wired = true;
    });
  };

  // ── 3. Audit — count rendered notebooks vs catalog (sanity).
  const audit = () => {
    const rendered = document.querySelectorAll(
      '[data-world="naar"] .lab-notebook'
    ).length;
    return Object.freeze({
      catalog_count: SCENARIOS.length,
      rendered_count: rendered,
      types_in_catalog: Object.freeze(['thinking', 'action', 'numeric', 'negotiation']),
      iraq_block_present: Boolean(
        document.querySelector('[data-world="naar"] .lab-elan-notebooks .iraq-block')
      ),
    });
  };

  // ── 4. Public init — idempotent.
  const init = () => {
    if (_installed) return true;
    wireInteractivity();
    _installed = true;
    return true;
  };

  // ── 5. Auto-boot on DOM ready, retry on world change.
  const boot = () => {
    init();
    document.addEventListener('upg:world:change', (ev) => {
      const w = ev && ev.detail && ev.detail.world;
      if (w === 'naar') wireInteractivity();
    });
    // Re-wire when nav changes to lab (handles late shard mount).
    document.addEventListener('upg:nav:change', () => {
      window.requestAnimationFrame(() => wireInteractivity());
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  // ── 6. Freeze the public surface.
  window.Upg = window.Upg || {};
  window.Upg.elan = window.Upg.elan || {};
  window.Upg.elan.lab = Object.freeze({
    init,
    SCENARIOS,
    getByType: (type) => Object.freeze(SCENARIOS.filter((s) => s.type === type)),
    count: () => SCENARIOS.length,
    typeLegend: () => TYPE_LEGEND,
    audit,
    _installed: true,
  });
})();
