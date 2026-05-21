# 🎯 WORKER 17 — Phase 4/6 — Practice Drills & Self-Check
> **اقرأ أولاً:** `prompts/v2/17_WORKER_CONTENT_REVIVAL.md` — قسم **Preservation Guard**.
> **يبني فوق:** Worker 17 Phases 1+2+3.
> **الفلسفة:** *القراءة passive، الاستدعاء active. الفرق بينهما = الفهم الذي يبقى.*

---

## 🛡️ Preservation Contract (Phase 4)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` | **WRAP** — إضافة `<section class="block-practice">` بعد block (after pitfalls if any) | تعديل نص الـ block أو P2/P3 wrappers |
| `style.css` | **APPEND** كتلة "Practice & Self-Check" (~200 سطر) | تعديل قواعد سابقة |
| `app.js` | **APPEND** IIFE `Upg.practice` (24th API, ~180 سطر) | تعديل أي IIFE موجودة |

**Sacred preserved:**
- نص كل block.
- TL;DR + Takeaways (P2) + Pitfalls (P3).
- 391 qcalc.
- 23 Upg.* APIs السابقة.

---

## 🎯 الهدف

Phase 4 يُضيف **آلية استدعاء نشط** (active recall) للـ blocks العالية:

1. **3-5 self-check questions** بعد كل block مهم.
2. **Answer reveal mechanic** — الإجابة مخفية افتراضياً، تظهر بضغطة.
3. **Reflection prompt** — سؤال مفتوح في النهاية ("كيف ستطبّق هذا أول مرة؟").
4. **Progress tracking** — `Upg.practice` يحفظ في localStorage:
   - أيّ practice فُتِح
   - أيّ سؤال user حاول إجابته (toggle "حاولت")
   - متى آخر مراجعة لهذا الـ block

> Phase 4 يستهدف ~60 block فقط:
> - كل block بـ block-type=`drill` أو `quiz`
> - + block بـ difficulty 4-5 و block-type=`lesson`
> - + كل case study

---

## 📋 PRE-FLIGHT

```
📋 PHASE 4 PRE-FLIGHT
├─ Phase: 4/6 — Practice Drills & Self-Check
├─ Estimated lines: ~520
├─ Files to touch:
│   ├─ platform/index.html       (WRAP ~60 practice sections)
│   ├─ platform/assets/style.css (APPEND ~200 lines)
│   └─ platform/assets/app.js    (APPEND ~180 lines — Upg.practice IIFE)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '<aside class="block-tldr"'   → 145-160 (P2)
│   ├─ grep -c '<details class="block-pitfalls"' → 80-95 (P3)
│   ├─ grep -c 'data-block-id='              → 400-550 (P1)
│   └─ grep -oE 'window\.Upg\.[a-z]+' | sort -u | wc -l  → 23
├─ Branch: continue worker-17-resonance
└─ This phase adds 24th Upg.* API.
```

---

## 🧱 خطوات التنفيذ (بالترتيب)

### Step 1 — تعريف الـ Practice Section Anatomy

```html
<section class="block-practice"
         data-practice-for="cc-014"
         aria-label="تمارين استدعاء نشط">

  <header class="block-practice-h">
    <span class="block-practice-eyebrow type-eyebrow">تمرين استدعاء</span>
    <h4 class="block-practice-title type-display-h">تحقّق من فهمك</h4>
    <span class="block-practice-meta type-num">
      <span data-practice-count="4">4 أسئلة</span> ·
      <span data-practice-est="6">~6 دقائق</span>
    </span>
  </header>

  <ol class="practice-questions">

    <li class="practice-question" data-q-id="cc-014-q1">
      <p class="practice-question-text type-body">
        <!-- السؤال 1 -->
      </p>

      <details class="practice-answer">
        <summary class="practice-answer-summary type-ui-label">
          <span class="practice-answer-icon" aria-hidden="true">↓</span>
          <span>اكشف الإجابة</span>
        </summary>
        <div class="practice-answer-body type-body">
          <!-- الإجابة 1 -->
        </div>
      </details>

      <button class="practice-tried-btn type-button"
              type="button"
              data-q-id="cc-014-q1"
              aria-pressed="false">
        <span class="practice-tried-icon" aria-hidden="true">○</span>
        <span class="practice-tried-label">حاولت</span>
      </button>
    </li>

    <!-- 3-5 questions total -->

  </ol>

  <footer class="block-practice-reflect">
    <h5 class="block-practice-reflect-h type-eyebrow">تأمّل ختامي</h5>
    <p class="block-practice-reflect-prompt type-quote-literary">
      <!-- سؤال مفتوح -->
    </p>
    <textarea class="block-practice-reflect-input"
              data-reflect-for="cc-014"
              placeholder="اكتب جوابك هنا (يُحفَظ محلياً، لا يُرسل لأي خادم)"
              rows="3"
              maxlength="500"></textarea>
    <div class="block-practice-reflect-meta type-num">
      <span data-reflect-count="0">0</span> / 500 حرف
    </div>
  </footer>

</section>
```

**عناصر مفتاحية:**
- `<details>` للإجابة → keyboard-accessible، CSS-only توسّع.
- `<button>` لـ "حاولت" → JS-tracked، يُحفَظ في localStorage.
- `<textarea>` reflection → `localStorage` per-block.
- `data-q-id` فريد لكل سؤال = `<block-id>-q<n>`.

### Step 2 — Question Voice Guide

Self-check questions يجب أن تكون:
- **استدعائية** (recall) لا اختيارية (multiple-choice). MCQ سهل لكن يُحفَّز recognition، لا recall.
- **متدرّجة**: السؤال الأول factual ("ما الـ X")، الثاني applicable ("في حالة Y، كيف...")، الأخير integrative ("اربط X بـ Z").
- **محدّدة**: لا "ما هو الإمباثي؟" بل "ميّز Empathy عن Sympathy في 3 جمل."
- **عملية**: لا "هل تعرف؟" بل "اكتب 3 طرق لـ..."

**أمثلة جيدة:**
- ✅ "أعطِ مثال على Pitch low + Pace fast — لأي نوع زبون يناسب؟"
- ✅ "اكتب T-account لمعاملة: شراء جهاز كمبيوتر بـ 1,200,000 IQD نقداً."
- ✅ "صحّح: 'الزبون يطلب توصيل في 4 ساعات؟ مستحيل، نحن لسنا أمازون.'"

**أمثلة سيئة:**
- ❌ "هل تفهم Empathy؟" (yes/no غير مفيد)
- ❌ "ما رأيك في الـ STAR framework؟" (مفتوح بلا توجيه)
- ❌ "أكمل الجملة: STAR هو..." (سهل جداً للقراءة)

### Step 3 — Answer Voice Guide

كل إجابة مكوّنة من:
1. **الجواب المباشر** (1-2 جملة)
2. **التبرير/التفسير** (2-3 جمل)
3. **حالة فيها يكون الجواب مختلفاً** (1 جملة، اختياري)

**مثال كامل:**
```
السؤال: ما الفرق بين Empathy و Sympathy في 3 جمل؟

الجواب:
- Empathy: "أنا أفهم ما تشعر به" — تشاركه المشاعر بدون أن تتبنّاها.
- Sympathy: "أنا متأسف لما تشعر به" — تتعاطف من الخارج.
- في خدمة الزبون: Empathy يبني ثقة (الزبون يشعر أنه مفهوم)؛ Sympathy يفصل المسافة (الزبون يشعر أنه ضحية).

[حالة معاكسة]: في حالة كارثة شخصية صريحة (وفاة قريب)، Sympathy أنسب من Empathy المُحاكَى.
```

### Step 4 — Reflection Prompt Voice Guide

السؤال الختامي **مفتوح** و **شخصي**:
- ✅ "كيف ستجرّب Voice Profile في أول مكالمة غداً؟"
- ✅ "ما الـ KPI الذي ستتابعه أسبوعياً لـ 4 أسابيع لاختبار هذا النموذج؟"
- ✅ "اكتب عقد ذاتي: ماذا ستفعل مختلفاً بناءً على هذا الـ block؟"

### Step 5 — `Upg.practice` IIFE في app.js

**APPEND** في النهاية:

```javascript
/* ════════════════════════════════════════════════════════════════
 * RESONANCE v2 — Worker 17 / Phase 4 — Upg.practice
 * 24th top-level Upg.* namespace.
 * Scope: track which questions user attempted, reflection text,
 *        last-touched timestamp per block. localStorage only.
 * No telemetry. No sync. Personal use only.
 * ════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const KEY_PREFIX = 'upg.practice.';
  const REFLECT_PREFIX = 'upg.practice.reflect.';

  // ─── Storage helpers ───────────────────────────────────────
  const readJSON = (key, fallback = {}) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  };

  const writeJSON = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      /* quota exceeded or storage disabled — silent */
    }
  };

  // ─── Public API ────────────────────────────────────────────

  const tried = (qId, attempted = true) => {
    if (!qId) return null;
    const blockId = qId.split('-q')[0];
    const state = readJSON(KEY_PREFIX + blockId);
    state[qId] = state[qId] || {};
    state[qId].attempted = attempted;
    state[qId].touchedAt = Date.now();
    writeJSON(KEY_PREFIX + blockId, state);
    document.dispatchEvent(new CustomEvent('upg:practice:change', {
      detail: { blockId, qId, attempted }
    }));
    return state[qId];
  };

  const isTried = (qId) => {
    if (!qId) return false;
    const blockId = qId.split('-q')[0];
    const state = readJSON(KEY_PREFIX + blockId);
    return !!(state[qId] && state[qId].attempted);
  };

  const getBlock = (blockId) => {
    if (!blockId) return null;
    return readJSON(KEY_PREFIX + blockId);
  };

  const reflect = (blockId, text) => {
    if (!blockId) return null;
    if (typeof text !== 'string') text = '';
    if (text.length > 500) text = text.slice(0, 500);
    if (text.length === 0) {
      try { localStorage.removeItem(REFLECT_PREFIX + blockId); } catch (_) {}
    } else {
      try { localStorage.setItem(REFLECT_PREFIX + blockId, text); } catch (_) {}
    }
    document.dispatchEvent(new CustomEvent('upg:practice:reflect', {
      detail: { blockId, length: text.length }
    }));
    return text;
  };

  const getReflection = (blockId) => {
    if (!blockId) return '';
    try {
      return localStorage.getItem(REFLECT_PREFIX + blockId) || '';
    } catch (_) {
      return '';
    }
  };

  const stats = () => {
    let totalQ = 0, triedQ = 0, totalReflect = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k) continue;
        if (k.startsWith(KEY_PREFIX) && !k.startsWith(REFLECT_PREFIX)) {
          const data = readJSON(k);
          for (const qId in data) {
            totalQ++;
            if (data[qId] && data[qId].attempted) triedQ++;
          }
        }
        if (k.startsWith(REFLECT_PREFIX)) totalReflect++;
      }
    } catch (_) {}
    return {
      questionsAttempted: triedQ,
      questionsTotal: totalQ,
      reflectionsWritten: totalReflect,
    };
  };

  const reset = (blockId) => {
    if (!blockId) return false;
    try {
      localStorage.removeItem(KEY_PREFIX + blockId);
      localStorage.removeItem(REFLECT_PREFIX + blockId);
      return true;
    } catch (_) {
      return false;
    }
  };

  // ─── DOM bindings ──────────────────────────────────────────

  const bindTriedButtons = () => {
    document.querySelectorAll('.practice-tried-btn').forEach((btn) => {
      if (btn.__upgBound) return;
      btn.__upgBound = true;
      const qId = btn.getAttribute('data-q-id');
      // Restore state
      if (qId && isTried(qId)) {
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.add('practice-tried-btn--on');
      }
      btn.addEventListener('click', () => {
        const cur = btn.getAttribute('aria-pressed') === 'true';
        const next = !cur;
        btn.setAttribute('aria-pressed', String(next));
        btn.classList.toggle('practice-tried-btn--on', next);
        tried(qId, next);
      });
    });
  };

  const bindReflectInputs = () => {
    document.querySelectorAll('.block-practice-reflect-input').forEach((input) => {
      if (input.__upgBound) return;
      input.__upgBound = true;
      const blockId = input.getAttribute('data-reflect-for');
      // Restore
      const existing = getReflection(blockId);
      if (existing) input.value = existing;
      // Counter
      const counter = input.closest('.block-practice-reflect')?.querySelector('[data-reflect-count]');
      const updateCount = () => {
        if (counter) counter.textContent = String(input.value.length);
      };
      updateCount();
      // Debounced save (300ms)
      let timer = null;
      input.addEventListener('input', () => {
        updateCount();
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => reflect(blockId, input.value), 300);
      });
      // Save on blur immediately
      input.addEventListener('blur', () => {
        if (timer) clearTimeout(timer);
        reflect(blockId, input.value);
      });
    });
  };

  const init = () => {
    bindTriedButtons();
    bindReflectInputs();
  };

  // Re-bind on dynamic content (rare but possible)
  const observer = new MutationObserver((muts) => {
    let needRebind = false;
    for (const m of muts) {
      if (m.addedNodes.length) {
        for (const n of m.addedNodes) {
          if (n.nodeType === 1 && (
            n.matches?.('.block-practice') ||
            n.querySelector?.('.block-practice')
          )) {
            needRebind = true;
            break;
          }
        }
      }
      if (needRebind) break;
    }
    if (needRebind) init();
  });

  if (document.readyState !== 'loading') {
    init();
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  // Public API surface
  window.Upg = window.Upg || {};
  window.Upg.practice = Object.freeze({
    tried,
    isTried,
    getBlock,
    reflect,
    getReflection,
    stats,
    reset,
  });
})();
```

### Step 6 — CSS Implementation

**APPEND** في style.css:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Worker 17 / Phase 4 — Practice & Self-Check
   ════════════════════════════════════════════════════════════════ */

.block-practice {
  margin-block: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 5%, var(--color-surface-1));
  border: 1px solid color-mix(in oklch, var(--color-tint, var(--color-brand)) 25%, var(--color-border));
  border-radius: var(--block-aside-radius);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.block-practice-h {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding-block-end: var(--space-2);
  border-block-end: 1px dashed color-mix(in oklch, var(--color-tint, var(--color-brand)) 30%, transparent);
}

.block-practice-eyebrow {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  color: color-mix(in oklch, var(--color-text-faint) 70%, var(--color-tint, var(--color-brand)));
}

.block-practice-title {
  margin: 0;
  font-weight: 700;
}

.block-practice-meta {
  font-size: var(--text-xs);
  color: var(--color-text-faint);
  font-feature-settings: "tnum" 1, "lnum" 1;
}

.practice-questions {
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: pq;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.practice-question {
  counter-increment: pq;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-inline-start: var(--space-4);
  position: relative;
}

.practice-question::before {
  content: counter(pq);
  position: absolute;
  inset-inline-start: 0;
  top: 0;
  width: 1.6em;
  height: 1.6em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 15%, var(--color-surface-2));
  color: var(--color-text);
  border-radius: 0.4rem;
  font-family: var(--type-voice-numeric);
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-size: var(--text-xs);
  font-weight: 700;
}

.practice-question-text {
  margin: 0;
  font-weight: 500;
}

/* ─── Answer reveal ─── */
.practice-answer {
  border-radius: 0.4rem;
}

.practice-answer-summary {
  list-style: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 0.3em 0.7em;
  background: color-mix(in oklch, var(--color-surface-2) 80%, transparent);
  border: 1px solid var(--color-border);
  border-radius: 0.4rem;
  cursor: pointer;
  user-select: none;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  transition: background var(--duration-fast) var(--ease-out);
}

.practice-answer-summary::-webkit-details-marker { display: none; }

.practice-answer-summary:hover {
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 15%, var(--color-surface-2));
  color: var(--color-text);
}

.practice-answer-summary:focus-visible {
  outline: 2px solid var(--color-tint, var(--color-brand));
  outline-offset: 2px;
}

.practice-answer-icon {
  font-family: var(--type-voice-numeric);
  transition: transform var(--duration-base) var(--ease-spring);
}

.practice-answer[open] .practice-answer-icon {
  transform: rotate(180deg);
}

.practice-answer-body {
  margin-block-start: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--color-surface-1);
  border-inline-start: 3px solid color-mix(in oklch, oklch(72% 0.13 150) 60%, var(--color-border));
  border-radius: 0.3rem;
  line-height: var(--leading-relaxed);
}

/* ─── Tried button ─── */
.practice-tried-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 0.3em 0.7em;
  background: transparent;
  border: 1px dashed color-mix(in oklch, var(--color-border) 70%, var(--color-text-faint));
  border-radius: 0.4rem;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: var(--text-xs);
  font-weight: 600;
  align-self: flex-start;
  transition:
    background var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

.practice-tried-btn:hover {
  border-color: color-mix(in oklch, var(--color-tint, var(--color-brand)) 50%, transparent);
  color: var(--color-text);
}

.practice-tried-btn--on,
.practice-tried-btn[aria-pressed="true"] {
  background: color-mix(in oklch, oklch(72% 0.13 150) 18%, transparent);
  border-color: oklch(60% 0.16 150);
  border-style: solid;
  color: var(--color-text);
}

.practice-tried-btn[aria-pressed="true"] .practice-tried-icon {
  color: oklch(55% 0.18 150);
}

.practice-tried-btn[aria-pressed="true"] .practice-tried-icon::before { content: "●"; }
.practice-tried-btn[aria-pressed="false"] .practice-tried-icon::before { content: "○"; }

.practice-tried-icon::before {
  content: "○";
  font-family: var(--type-voice-numeric);
}

/* ─── Reflection footer ─── */
.block-practice-reflect {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-block-start: var(--space-2);
  border-block-start: 1px dashed color-mix(in oklch, var(--color-tint, var(--color-brand)) 30%, transparent);
}

.block-practice-reflect-h {
  margin: 0;
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
}

.block-practice-reflect-prompt {
  margin: 0;
  border-inline-start: 2px solid color-mix(in oklch, var(--color-tint, var(--color-brand)) 50%, transparent);
  padding-inline-start: var(--space-2);
  font-style: italic;
}

.block-practice-reflect-input {
  width: 100%;
  font-family: var(--type-voice-body);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  padding: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: 0.3rem;
  background: var(--color-surface-1);
  color: var(--color-text);
  resize: vertical;
  min-height: 4em;
}

.block-practice-reflect-input:focus-visible {
  outline: 2px solid var(--color-tint, var(--color-brand));
  outline-offset: 0;
  border-color: transparent;
}

.block-practice-reflect-meta {
  font-size: var(--text-xs);
  color: var(--color-text-faint);
  align-self: flex-end;
}

/* ─── Mobile ─── */
@media (max-width: 480px) {
  .block-practice { padding: var(--space-2); }
  .practice-question { padding-inline-start: var(--space-3); }
  .practice-answer-summary { font-size: var(--text-xs); }
}

/* ─── Print: questions visible, answers expanded ─── */
@media print {
  .block-practice { background: transparent; border: 1px solid #000; }
  .practice-answer .practice-answer-body { display: block !important; }
  .practice-answer-summary::after { content: ""; }
  .practice-tried-btn { display: none; }
}

/* ─── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
  .practice-answer-icon,
  .practice-tried-btn {
    transition: none;
  }
}

/* ════════════════════════════════════════════════════════════════
   Discipline Comment — Worker 17 / Phase 4
   1. Practice section ALWAYS follows pitfalls (or block if no pitfalls).
   2. 3-5 questions per practice section. 5 = absolute max.
   3. Questions: recall over recognition (no MCQ).
   4. Answer reveal via <details>; default closed.
   5. "حاولت" toggle: track effort, NOT correctness. Personal use only.
   6. Reflection: 1 open prompt, ≤500 chars in localStorage.
   7. Upg.practice is the 24th top-level Upg.* API.
   8. Zero telemetry. Zero sync. Local-only.
   ════════════════════════════════════════════════════════════════ */
```

### Step 7 — Distribution

| Page | Practice sections | Total questions |
|---|---:|---:|
| callcenter   | 6  | ~22 |
| accounting   | 8  | ~30 |
| programming  | 6  | ~22 |
| psych        | 5  | ~18 |
| eq           | 4  | ~15 |
| negotiation  | 7  | ~26 |
| customercare | 4  | ~15 |
| fieldsales   | 5  | ~18 |
| accountmgr   | 4  | ~15 |
| social       | 3  | ~11 |
| lab          | 2  | ~8  |
| phonerepair  | 3  | ~11 |
| hrmastery    | 5  | ~18 |
| **Total**    | **~62** | **~229 questions** |

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 16
grep -c 'qcalc' platform/index.html                   # → 391
grep -c 'data-block-id=' platform/index.html          # → ≥400 (P1 preserved)

# New additions
grep -c '<section class="block-practice"' platform/index.html  # → 60-65
grep -c 'data-practice-for=' platform/index.html               # → 60-65
grep -c 'practice-question' platform/index.html                # → 60-65 sections × 3-5 questions
grep -c 'practice-tried-btn' platform/index.html               # → 200-260
grep -c 'data-reflect-for=' platform/index.html                # → 60-65

# CSS + JS
grep -c '\.block-practice' platform/assets/style.css           # → ≥6
grep -c 'window.Upg.practice' platform/assets/app.js           # → ≥1

# API count
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → 24

# Functional check (manual in browser):
# 1. Click "حاولت" button → toggles state, persists across reload.
# 2. Type in reflection textarea → saves to localStorage after 300ms.
# 3. Reload → reflection text restored.
# 4. Upg.practice.stats() → returns {questionsAttempted, questionsTotal, reflectionsWritten}.
```

---

## ✅ معايير القبول (Phase 4)

- [ ] ~60 `block-practice` section مضاف.
- [ ] كل section فيه 3-5 questions بتصميم answer-reveal.
- [ ] كل section فيه reflection prompt + textarea مرتبط بـ localStorage.
- [ ] `Upg.practice` IIFE مكتوب ومُجمَّد بـ `Object.freeze`.
- [ ] `Upg.practice.tried(qId, bool)` يحفظ ويستعيد.
- [ ] `Upg.practice.reflect(blockId, text)` يحفظ ويسترجع.
- [ ] `Upg.practice.stats()` يعطي إحصائيات صحيحة.
- [ ] CustomEvents `upg:practice:change` و `upg:practice:reflect` تُرسَل.
- [ ] MutationObserver يربط practice sections مضافة ديناميكياً.
- [ ] Object.freeze على `window.Upg.practice`.
- [ ] لا تعديل أي IIFE موجودة.
- [ ] CSS ~200 سطر.
- [ ] mobile + print + reduced-motion يشتغلون.
- [ ] Console: 0 errors.
- [ ] grep counts الـ 16/391 محفوظة. APIs = 24.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/index.html platform/assets/style.css platform/assets/app.js
git commit -m "phase 4 (resonance): practice drills & self-check — ~60 blocks with 3-5 recall questions + answer reveals + reflection prompts + Upg.practice IIFE (24th API, localStorage-only progress tracking)"
# push immediately

# update state/PROGRESS.json + snapshot
git add state/PROGRESS.json state/snapshots/worker-17-phase-4.json
git commit -m "state: resonance phase 4 committed and pushed"
# push immediately
```

— نهاية Phase 4.

🎵 **Resonance check:** هل user يقدر يستدعي ما تعلّم بدل ما يقرأه فقط؟ نعم → انتقل لـ Phase 5.
