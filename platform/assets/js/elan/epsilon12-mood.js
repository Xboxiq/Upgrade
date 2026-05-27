/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — ε12 — Cross-page Psychology Layer (closes Pillar ε)
   Pillar: ε / Stage 12 of 12 — last in Pillar ε CONTENT REVIVAL.
   Beacon: 🪞 META_BEACON — the platform that knows its guest.

   What it does:
     A 4-dim mood vector (confidence / focus / fatigue / curiosity ∈ 0..1)
     lives in localStorage under 'upg.mood.v1'. It listens — silently —
     to platform events:
        upg:exercise:complete (detail.success ⇒ +confidence/+focus,
                                  else ⇒ −confidence/+fatigue)
        upg:exercise:failed   ⇒ −confidence / +fatigue
        upg:nav:change        ⇒ +curiosity (small)
        upg:call:outcome      ⇒ ε2 callcenter — success +conf, lost −conf
     and decays back toward neutrality (0.5 for the first three, 0 for
     fatigue) at 5% per hour of idle time.

     The vector then drives **three silent adaptations** on every page:

       1. Greeting prose — existing dashboard hooks `data-greet-title` and
          `data-greet-sub` are softly rewritten. Five Arabic verses, one
          per recognized state (fatigued / confident / curious / focused /
          baseline). The platform never says "Welcome back, Name!"; it
          says what the salon host would say.

       2. body.dataset.suggestedDifficulty ∈ { 'easy' | 'medium' | 'hard' }
          A CSS hook any per-world page can react to.

       3. body.dataset.insightRate ∈ { 'high' | 'normal' | 'low' }
          Same shape, gates how often "هل تَعلم؟" insight blocks render.

   Distinct from ε11's META (the salon mirror that listens):
     ε11 = reactive-acute — one user input ⇒ one prose answer.
     ε12 = reactive-chronic — months of latent behaviour crystallised in
            four numbers, decaying back to neutral when ignored.
     Different temporal axis of META.

   Reference Avoided:
     · Forbidden #22 — "Welcome back, [Name]!" chrome cliché.
     · The default AI-app cliché: XP bars / streak counters / level-up
       toast notifications. The mood vector never surfaces as a number.
     · The AI-default "How are you feeling today?" modal at session start.

   Inspired-by:
     Wild Card #11 — Iraqi mid-century salons (المضيف يَعرف ضيفه).
     The host adjusts the tempo of the visit silently — pours coffee
     stronger when the guest looks tired, brings out the harder question
     when the guest leans in. He never asks how you feel; he watches.

   Sacred Asset preservation:
     · Nothing modifies window.Upg.state. We use localStorage directly
       with a namespaced key to avoid coupling to the legacy structured
       store (which has .progress/.scores/.drafts/.misc/.profile but no
       generic key/value contract).
     · Existing dashboard markup (data-greet-title, data-greet-sub) is
       only rewritten when the mood crosses a threshold — baseline mood
       leaves the original copy in place.
     · Re-entrant safe: applyToUI() is idempotent; multiple calls don't
       compound effects.
     · No new markup is required from any page. Pages that adopt the
       data-* body hooks gain adaptive behaviour; pages that ignore them
       work identically to before.

   Public surface:
     window.Upg.mood = Object.freeze({
       get(),
       update(deltas),
       reset(),
       _module
     })
     Plus event:
       'upg:mood:vector' — { detail: <vector> }
   ════════════════════════════════════════════════════════════════════════ */

(function initEpsilon12Mood() {
  'use strict';

  const STORAGE_KEY = 'upg.mood.v1';
  const DECAY_PER_HOUR = 0.05;
  const MS_PER_HOUR = 3_600_000;

  /* The original copy that the platform falls back to when no mood-state
     prose is appropriate. We only override these when a clear adaptation
     applies — baseline mood leaves the original markup in peace. */
  const ORIGINAL_PROSE = {
    title: null,   // captured on first apply
    sub:   null,
  };

  const STATE_PROSE = {
    fatigued:  { title: 'تَمَهَّل قليلاً',           sub: 'نَفَس عميق ثم نَكمل — الإيقاع أهمّ من السرعة.' },
    confident: { title: 'مُستعِدّ للتحدّي الأكبر؟',    sub: 'الثقة بِنية حَقَّقتَها — اِبنِ عليها اليوم.' },
    curious:   { title: 'لديك سؤال يَستحق إجابة اليوم', sub: 'الفُضول هو الـ compass — اتبَعه إلى موضع جديد.' },
    focused:   { title: 'ركّز على هدف واحد',         sub: 'إنجاز نظيف خير من ثلاثة مَفتوحة.' },
    baseline:  null, // leave original
  };

  /* ── Storage helpers ─────────────────────────────────────────────────── */
  function defaultVector() {
    return { confidence: 0.5, focus: 0.5, fatigue: 0.0, curiosity: 0.5, updatedAt: Date.now() };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultVector();
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return defaultVector();
      /* Defensive: each axis must be a finite number. */
      const v = defaultVector();
      ['confidence', 'focus', 'fatigue', 'curiosity'].forEach((k) => {
        if (Number.isFinite(parsed[k])) v[k] = clamp(parsed[k]);
      });
      v.updatedAt = Number.isFinite(parsed.updatedAt) ? parsed.updatedAt : Date.now();
      return v;
    } catch (_) { return defaultVector(); }
  }

  function save(v) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); } catch (_) {}
  }

  function lerp(a, b, t)  { return a + (b - a) * t; }
  function clamp(x)       { return Math.max(0, Math.min(1, x)); }

  function decayed(v) {
    const hrs = (Date.now() - (v.updatedAt || Date.now())) / MS_PER_HOUR;
    if (hrs <= 0) return Object.assign({}, v);
    const d = Math.min(1, hrs * DECAY_PER_HOUR);
    return {
      confidence: lerp(v.confidence, 0.5, d),
      focus:      lerp(v.focus,      0.5, d),
      fatigue:    lerp(v.fatigue,    0.0, d),
      curiosity:  lerp(v.curiosity,  0.5, d),
      updatedAt:  v.updatedAt,
    };
  }

  /* ── Public API ──────────────────────────────────────────────────────── */
  function get() { return decayed(load()); }

  function update(deltas) {
    if (!deltas || typeof deltas !== 'object') return;
    const v = decayed(load());
    Object.keys(deltas).forEach((k) => {
      if (k in v && k !== 'updatedAt' && Number.isFinite(deltas[k])) {
        v[k] = clamp(v[k] + deltas[k]);
      }
    });
    v.updatedAt = Date.now();
    save(v);
    document.dispatchEvent(new CustomEvent('upg:mood:vector', { detail: Object.assign({}, v) }));
    applyToUI(v);
    return v;
  }

  function reset() {
    const v = defaultVector();
    save(v);
    document.dispatchEvent(new CustomEvent('upg:mood:vector', { detail: Object.assign({}, v) }));
    applyToUI(v);
    return v;
  }

  /* ── Classification — five tones, ordered by precedence ──────────────── */
  function classify(v) {
    if (v.fatigue   > 0.7)  return 'fatigued';
    if (v.confidence > 0.8) return 'confident';
    if (v.curiosity > 0.75) return 'curious';
    if (v.focus     > 0.75) return 'focused';
    return 'baseline';
  }

  function difficultyFor(v) {
    if (v.confidence > 0.75) return 'hard';
    if (v.confidence < 0.35) return 'easy';
    return 'medium';
  }

  function insightRateFor(v) {
    if (v.curiosity > 0.7) return 'high';
    if (v.curiosity < 0.3) return 'low';
    return 'normal';
  }

  /* ── UI side-effects — silent, idempotent, additive ──────────────────── */
  function applyToUI(v) {
    /* Capture original prose lazily on first call so we can restore on baseline. */
    const titleEl = document.querySelector('[data-greet-title]');
    const subEl   = document.querySelector('[data-greet-sub]');

    if (titleEl && ORIGINAL_PROSE.title === null) ORIGINAL_PROSE.title = titleEl.innerHTML;
    if (subEl   && ORIGINAL_PROSE.sub   === null) ORIGINAL_PROSE.sub   = subEl.innerHTML;

    const tone   = classify(v);
    const prose  = STATE_PROSE[tone];

    if (titleEl) {
      if (prose && prose.title) {
        titleEl.textContent = prose.title;
        titleEl.dataset.moodTone = tone;
      } else if (ORIGINAL_PROSE.title !== null) {
        titleEl.innerHTML = ORIGINAL_PROSE.title;
        delete titleEl.dataset.moodTone;
      }
    }
    if (subEl) {
      if (prose && prose.sub) {
        subEl.textContent = prose.sub;
        subEl.dataset.moodTone = tone;
      } else if (ORIGINAL_PROSE.sub !== null) {
        subEl.innerHTML = ORIGINAL_PROSE.sub;
        delete subEl.dataset.moodTone;
      }
    }

    /* Generic [data-greeting] hook (per ε12 spec) — pages that add this
       node receive the prose textContent directly, no innerHTML restore. */
    document.querySelectorAll('[data-greeting]').forEach((el) => {
      if (prose && prose.title) {
        el.textContent = prose.title;
        el.dataset.moodTone = tone;
      } else {
        delete el.dataset.moodTone;
      }
    });

    /* Body data-* hooks for CSS-driven adaptive surfaces. */
    if (document.body) {
      document.body.dataset.suggestedDifficulty = difficultyFor(v);
      document.body.dataset.insightRate = insightRateFor(v);
      document.body.dataset.moodTone    = tone;
    }
  }

  /* ── Auto-tracking event listeners ───────────────────────────────────── */
  document.addEventListener('upg:exercise:complete', (e) => {
    const ok = !!(e && e.detail && e.detail.success);
    update(ok
      ? { confidence: +0.06, focus: +0.04, fatigue: +0.03 }
      : { confidence: -0.04, fatigue:    +0.04 });
  });

  document.addEventListener('upg:exercise:failed', () => {
    update({ confidence: -0.06, fatigue: +0.05 });
  });

  document.addEventListener('upg:nav:change', () => {
    update({ curiosity: +0.02 });
  });

  /* ε2 callcenter outcomes feed the vector too — chromatic continuity
     between Pillar ε modules. Success ⇒ confidence; lost ⇒ confidence−. */
  document.addEventListener('upg:call:outcome', (e) => {
    const o = e && e.detail && e.detail.outcome;
    if (o === 'success')      update({ confidence: +0.05, focus: +0.02 });
    else if (o === 'lost')    update({ confidence: -0.05, fatigue: +0.03 });
    else if (o === 'neutral') update({ focus: +0.01 });
  });

  /* Mood feedback also flows from ε11's verdict tone. */
  document.addEventListener('upg:mood:hint', (e) => {
    if (e && e.detail) update(e.detail);
  });

  /* ── Initial paint ───────────────────────────────────────────────────── */
  function initialApply() { applyToUI(get()); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialApply, { once: true });
  } else {
    initialApply();
  }

  /* ── Public surface ──────────────────────────────────────────────────── */
  window.Upg = window.Upg || {};
  if (!window.Upg.mood) {
    window.Upg.mood = Object.freeze({
      get,
      update,
      reset,
      _module: 'epsilon12-mood',
    });
  }
})();
