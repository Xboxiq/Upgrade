# ⚠️ WORKER 17 — Phase 3/6 — Pitfalls & Common Mistakes
> **اقرأ أولاً:** `prompts/v2/17_WORKER_CONTENT_REVIVAL.md` — قسم **Preservation Guard**.
> **يبني فوق:** Worker 17 Phase 1 (Block Schema) + Phase 2 (TL;DR).
> **الفلسفة:** *المعلم الجيد يقول لك ما ينجح. المعلم العظيم يقول لك أين يفشل أغلب الناس — قبل أن تفشل أنت.*

---

## 🛡️ Preservation Contract (Phase 3)

| العملية | المسموح | الممنوع |
|---|---|---|
| `index.html` | **WRAP** — إضافة `<details class="block-pitfalls">` كـ sibling **بعد** الـ block | تعديل نص الـ block أو الـ TL;DR من P2 |
| `style.css` | **APPEND** كتلة "Pitfalls & Diagnostics" في النهاية (~160 سطر) | تعديل قواعد W17 P1 + P2 أو W15/W16 |
| `app.js` | لا تُلمَس | أي تعديل |

**Sacred preserved:**
- نص كل block.
- TL;DR + Takeaways من Phase 2.
- 391 qcalc.
- 23 Upg.* APIs.

---

## 🎯 الهدف

Phase 3 يُضيف **3 طبقات تحذير** للـ blocks عالية الخطر التعليمي:

1. **Common Mistakes** — قائمة 3-7 أخطاء يقع فيها أغلب الناس.
2. **Diagnostic Checklist** — "علامات أنك لم تفهم بعد" — 4-6 علامات قابلة للملاحظة الذاتية.
3. **Iraqi Cultural Pitfalls** — أخطاء خاصة بالسوق/الثقافة العراقية (selectively).

كل هذي الطبقات تُغلَّف في **`<details>` collapsible** مغلقة افتراضياً — فلا تُغرِق UI.

> Phase 3 يستهدف ~80 block فقط (high-impact / high-risk):
> - كل block بـ difficulty ≥ 4 (~80)
> - + cheat sheets الكبيرة (~12)

---

## 📋 PRE-FLIGHT

```
📋 PHASE 3 PRE-FLIGHT
├─ Phase: 3/6 — Pitfalls & Common Mistakes
├─ Estimated lines: ~440
├─ Files to touch:
│   ├─ platform/index.html       (WRAP ~80 details siblings)
│   └─ platform/assets/style.css (APPEND ~160 lines)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '<aside class="block-tldr"'   → 145-160 (from P2)
│   ├─ grep -c 'data-block-id='              → 400-550 (from P1)
│   ├─ grep -c '<section class="page"'       → 16
│   ├─ grep -c 'qcalc'                        → 391
│   └─ grep -oE 'window\.Upg\.[a-z]+' | sort -u | wc -l  → ≥23
├─ Branch: continue worker-17-resonance
└─ No new APIs in this phase.
```

---

## 🧱 خطوات التنفيذ (بالترتيب)

### Step 1 — تعريف الـ Pitfalls Anatomy

```html
<details class="block-pitfalls"
         data-pitfalls-for="cc-014"
         aria-label="أخطاء شائعة وعلامات الفهم الناقص">

  <summary class="block-pitfalls-summary">
    <span class="block-pitfalls-icon" aria-hidden="true">⚠️</span>
    <span class="block-pitfalls-title type-ui-label">
      أخطاء شائعة وعلامات الفهم الناقص
    </span>
    <span class="block-pitfalls-count type-num" aria-label="6 عناصر">
      6
    </span>
  </summary>

  <div class="block-pitfalls-body">

    <section class="pitfall-section pitfall-section--mistakes">
      <h4 class="pitfall-section-h type-eyebrow">
        أخطاء يقع فيها أغلب الناس
      </h4>
      <ul class="pitfall-list">
        <li class="pitfall-item">
          <span class="pitfall-item-marker" aria-hidden="true">×</span>
          <span class="pitfall-item-text">
            <!-- خطأ شائع 1 — جملة واضحة -->
          </span>
        </li>
        <!-- 3-7 mistakes -->
      </ul>
    </section>

    <section class="pitfall-section pitfall-section--diagnostic">
      <h4 class="pitfall-section-h type-eyebrow">
        علامات أنك لم تفهم بعد
      </h4>
      <ul class="pitfall-list pitfall-list--checklist">
        <li class="pitfall-item">
          <input type="checkbox"
                 class="pitfall-item-check"
                 aria-label="علامة 1"
                 disabled />
          <span class="pitfall-item-text">
            <!-- علامة قابلة للملاحظة الذاتية -->
          </span>
        </li>
        <!-- 4-6 diagnostic signs -->
      </ul>
    </section>

    <section class="pitfall-section pitfall-section--iraqi">
      <!-- Optional: only when culturally specific -->
      <h4 class="pitfall-section-h type-eyebrow">
        فخّ ثقافي عراقي
      </h4>
      <p class="pitfall-cultural-note type-body-lead">
        <!-- جملة-جملتين عن خطأ سياقي عراقي -->
      </p>
    </section>

  </div>
</details>
```

**ملاحظات:**
- `<details>` افتراضياً **مغلقة**. الـ user يفتحها عند الحاجة.
- `disabled` على الـ checkboxes في diagnostic — هي مرئية فقط، ليست تفاعلية. (Phase 4 يضيف interactive practice).
- Iraqi section **اختياري** — لا تضفه ما لم يكن المحتوى عراقياً صريحاً.

### Step 2 — قاعدة الـ Selection (~80 block)

| المعيار | كم |
|---|---|
| Block بـ difficulty 5 | ~10 |
| Block بـ difficulty 4 | ~50 |
| Block بـ difficulty 3 و block-type=case أو scenario | ~20 |
| **مجموع تقديري** | **~80** |

> **قاعدة:** كل block فيه نتيجة سلبية محتملة (خسارة مال، ضياع زبون، خطأ قانوني، توتر علاقة) يجب أن يحوي pitfalls. Block فيه نتيجة محايدة (مجرد فهم نظري) لا يحتاج.

### Step 3 — Mistakes Voice Guide

كل mistake يكتب بـ:
- **بداية فعلية**: "تبدأ المكالمة بـ...", "تستعمل النموذج قبل أن...", "تفترض أن..."
- **سبب محدّد**: لا "الناس يخطئون"، بل "تفترض أن الزبون قرأ العرض قبلك".
- **نتيجة ملموسة**: لا "الإغلاق صعب"، بل "تخسر 30% من الفرص في أول دقيقتين".
- ≤ 18 كلمة لكل mistake.

**أمثلة جيدة:**
- ✅ "تبدأ السؤال التشخيصي قبل بناء rapport — الزبون يدافع، لا يبوح."
- ✅ "تستخدم calc القياسي لشركة عراقية محلية — قطوعات الضمان غير مدروجة."
- ✅ "تستعمل STAR في إجابات قصيرة (<60 ثانية) — تبدو مُسلَّطاً، ليس صادقاً."

**أمثلة سيئة (تجنّب):**
- ❌ "كثير من الناس يخطئون هنا." (غامض)
- ❌ "تجنّب الأخطاء الشائعة." (لا قيمة)
- ❌ "افعل الشيء الصحيح." (تكرار جوفاء)

### Step 4 — Diagnostic Checklist Voice Guide

كل diagnostic sign يكتب بصيغة "علامة من الخارج"، يقدر الـ user يلاحظها على نفسه:

**أمثلة جيدة:**
- ✅ "لا تستطيع أن تشرح الفرق بين Empathy و Sympathy في 30 ثانية."
- ✅ "حسبت الـ ROI لكن لا تعرف لمَ المعادلة 4 وليست 3."
- ✅ "حفظت الـ 6 principles لكن لم تستعمل واحداً منها هذا الأسبوع."
- ✅ "تستطيع تطبيق T-Account على معاملة بسيطة، لكن تتلكّأ مع compound entry."

**ملاحظة:** هذي الـ signs هي **التشخيص الذاتي** — تعطي الـ user "مرآة" للفهم. ليست أسئلة (Phase 4 يضيف Q&A).

### Step 5 — Iraqi Cultural Pitfalls (اختياري لكن قيّم)

أضف Iraqi section فقط حين الـ block فيه:
- معاملة مالية محلية (راتب، ضريبة، ضمان اجتماعي، عقد)
- تواصل خدمة-زبون عراقي (لهجة، توقعات، أوقات)
- ثقافة شركات محلية (هيكل، صلاحيات، حدود)
- منافسة سوقية محلية (أسعار، توقيت)

**أمثلة:**
- في accounting block: "النموذج الـ IFRS يفترض دفع شهري — قطوعات الضمان العراقي تُحسَب نصف-سنوياً، تجاهلها يكسر التحويل النقدي."
- في customercare block: "الزبون العراقي يسأل عن التوصيل قبل السعر — البدء بالسعر يُرسل إشارة 'لا أهتم بسياقك'."
- في hrmastery block: "ذكر الراتب صراحة في أول مقابلة عُرفياً يعني 'مهتم بالمال أكثر من الدور' — اطرح السؤال في المقابلة الثانية."

> **قاعدة:** الـ Iraqi section ≤ 1-2 جملة. لا تتحوّل إلى block إضافي. هي **توابل** لا طعام.

### Step 6 — CSS Implementation

**APPEND** في style.css:

```css
/* ════════════════════════════════════════════════════════════════
   RESONANCE v2 — Worker 17 / Phase 3 — Pitfalls & Diagnostics
   <details> collapsible warning aside, default closed.
   Three subsections: mistakes / diagnostic checklist / Iraqi pitfall.
   ════════════════════════════════════════════════════════════════ */

.block-pitfalls {
  margin-block: var(--space-3);
  padding: 0;
  background: color-mix(in oklch, oklch(70% 0.13 30) 6%, var(--color-surface-1));
  border: 1px solid color-mix(in oklch, oklch(70% 0.13 30) 30%, var(--color-border));
  border-radius: var(--block-aside-radius);
  overflow: hidden;
  transition: background var(--duration-base) var(--ease-out);
}

.block-pitfalls[open] {
  background: color-mix(in oklch, oklch(70% 0.13 30) 9%, var(--color-surface-1));
}

.block-pitfalls-summary {
  list-style: none;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-2);
  align-items: center;
  padding: var(--space-2) var(--space-3);
  cursor: pointer;
  user-select: none;
  transition: background var(--duration-fast) var(--ease-out);
}

.block-pitfalls-summary::-webkit-details-marker {
  display: none;
}

.block-pitfalls-summary::after {
  content: "▾";
  font-family: var(--type-voice-numeric);
  font-size: 0.85em;
  color: var(--color-text-faint);
  transition: transform var(--duration-base) var(--ease-spring);
}

.block-pitfalls[open] .block-pitfalls-summary::after {
  transform: rotate(180deg);
}

.block-pitfalls-summary:hover {
  background: color-mix(in oklch, oklch(70% 0.13 30) 12%, transparent);
}

.block-pitfalls-summary:focus-visible {
  outline: 2px solid color-mix(in oklch, oklch(70% 0.13 30) 60%, var(--color-text));
  outline-offset: -2px;
}

.block-pitfalls-icon {
  font-size: 1.1em;
  filter: saturate(0.9);
}

.block-pitfalls-title {
  font-weight: 600;
  color: color-mix(in oklch, var(--color-text) 90%, oklch(60% 0.18 30));
}

.block-pitfalls-count {
  font-size: var(--text-xs);
  font-weight: 700;
  background: color-mix(in oklch, oklch(70% 0.13 30) 25%, transparent);
  color: var(--color-text);
  border-radius: 0.4rem;
  padding: 0.15em 0.5em;
  min-width: 1.7em;
  text-align: center;
}

/* ─── Body ─── */
.block-pitfalls-body {
  padding: var(--space-2) var(--space-3) var(--space-3) var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  border-block-start: 1px dashed color-mix(in oklch, oklch(70% 0.13 30) 25%, transparent);
}

.pitfall-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.pitfall-section-h {
  margin: 0;
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
  font-weight: 600;
}

.pitfall-section--mistakes  .pitfall-section-h { color: oklch(60% 0.16 30); }
.pitfall-section--diagnostic .pitfall-section-h { color: oklch(60% 0.14 60); }
.pitfall-section--iraqi      .pitfall-section-h { color: oklch(58% 0.14 200); }

.pitfall-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.pitfall-item {
  display: grid;
  grid-template-columns: 1.5em 1fr;
  gap: var(--space-2);
  align-items: baseline;
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
}

.pitfall-item-marker {
  font-family: var(--type-voice-numeric);
  font-weight: 700;
  color: oklch(60% 0.18 25);
  text-align: center;
  font-size: 0.95em;
}

.pitfall-item-check {
  appearance: none;
  width: 1em;
  height: 1em;
  border: 1.5px solid color-mix(in oklch, oklch(60% 0.14 60) 60%, var(--color-border));
  border-radius: 0.2em;
  margin-block-start: 0.2em;
  cursor: not-allowed;
  background: var(--color-surface-1);
}

.pitfall-item-check:disabled {
  opacity: 0.7;
}

.pitfall-item-text {
  color: var(--color-text);
}

.pitfall-cultural-note {
  margin: 0;
  font-style: italic;
  color: var(--color-text-muted);
  border-inline-start: 2px solid oklch(58% 0.14 200);
  padding-inline-start: var(--space-2);
}

/* ─── Mobile refinements ─── */
@media (max-width: 480px) {
  .block-pitfalls-body { padding: var(--space-2); gap: var(--space-2); }
  .pitfall-item { grid-template-columns: 1.2em 1fr; }
  .block-pitfalls-summary { padding: var(--space-2); }
}

/* ─── Print: pitfalls expanded, page-break-friendly ─── */
@media print {
  .block-pitfalls {
    background: transparent;
    border: 1px solid #000;
    page-break-inside: avoid;
  }
  .block-pitfalls .block-pitfalls-body { display: flex !important; }
  .block-pitfalls-summary::after { content: ""; }
}

/* ─── Reduced motion: disable rotation transition ─── */
@media (prefers-reduced-motion: reduce) {
  .block-pitfalls-summary::after { transition: none; }
  .block-pitfalls { transition: none; }
}

/* ════════════════════════════════════════════════════════════════
   Discipline Comment — Worker 17 / Phase 3
   1. Pitfalls always FOLLOWS the block (DOM order).
   2. Default state: closed (don't pollute UI).
   3. Three sections max: mistakes (3-7) / diagnostic (4-6) / Iraqi (optional 1-2 sentences).
   4. Each mistake: actionable + concrete consequence + ≤18 words.
   5. Each diagnostic sign: observable from outside, self-mirror tone.
   6. Iraqi section ONLY when context demands it. No filler.
   7. Tone: warm caution, never condescending. We're peer reviewers, not lecturers.
   ════════════════════════════════════════════════════════════════ */
```

### Step 7 — Distribution across pages

| Page | Pitfalls to add |
|---|---:|
| callcenter   | 8  |
| accounting   | 12 |
| programming  | 8  |
| psych        | 6  |
| eq           | 5  |
| negotiation  | 10 |
| customercare | 6  |
| fieldsales   | 8  |
| accountmgr   | 5  |
| social       | 4  |
| lab          | 3  |
| phonerepair  | 5  |
| hrmastery    | 8  |
| myprogress   | 0  |
| **Total**    | **~88** |

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 16
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → ≥23
grep -c '<aside class="block-tldr"' platform/index.html  # → 145-160 (preserved from P2)

# New additions
grep -c '<details class="block-pitfalls"' platform/index.html  # → 80-95
grep -c 'pitfall-section--mistakes' platform/index.html        # → 80-95
grep -c 'pitfall-section--diagnostic' platform/index.html      # → 80-95
grep -c 'pitfall-section--iraqi' platform/index.html           # → 25-40 (subset)

# CSS
grep -c '\.block-pitfalls' platform/assets/style.css           # → ≥4
grep -c 'pitfall-' platform/assets/style.css                   # → ≥10

# Block text edits — must be 0
# Verify by manual diff inspection
```

---

## ✅ معايير القبول (Phase 3)

- [ ] ~80 `block-pitfalls` details مضاف بعد high-risk blocks.
- [ ] كل details فيه section "أخطاء شائعة" بـ 3-7 items.
- [ ] كل details فيه section "علامات الفهم الناقص" بـ 4-6 items.
- [ ] ~30 details فيها section "فخّ ثقافي عراقي" (اختياري).
- [ ] CSS ~160 سطر مكتوب.
- [ ] Default state: closed.
- [ ] Keyboard accessible (focus-visible يعمل).
- [ ] Print expands details.
- [ ] Reduced motion يعطّل rotation animation.
- [ ] لا تعديل نص محتوى block واحد.
- [ ] قواعد W17 P1 + P2 ما زالت تشتغل.
- [ ] Console: 0 errors.
- [ ] grep counts الـ 16/391/23 محفوظة.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/index.html platform/assets/style.css
git commit -m "phase 3 (resonance): pitfalls & diagnostic checklists — ~80 blocks wrapped with collapsible warnings (mistakes + diagnostic signs + selective Iraqi cultural pitfalls)"
# push immediately

# update state/PROGRESS.json + snapshot
git add state/PROGRESS.json state/snapshots/worker-17-phase-3.json
git commit -m "state: resonance phase 3 committed and pushed"
# push immediately
```

— نهاية Phase 3.

🎵 **Resonance check:** هل user يقدر يتفقّد فهمه قبل أن يكتشف الفجوة في الواقع؟ نعم → انتقل لـ Phase 4.
