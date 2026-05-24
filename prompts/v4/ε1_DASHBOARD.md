# ε1 — Content Revival: dashboard
> **Pillar ε (CONTENT REVIVAL) / Stage 1 of 12**
> العالم: حِبر (Hibr). الصفحة: `page-dashboard`.
> **Sacred:** preserves 16 sections, 14 Upg.* APIs, دروس v3 موجودة.

---

## 🎨 Creativity Beacon

**Type:** 📊 DATA_BEACON
**The Surprise:** الـ progress bar الرئيسية ليست خطاً horizontal. هي **manuscript margin** — مسطح أيمن الصفحة (12px عرض) يَمتلئ بحبر تدريجي من أعلى لأسفل بمقدار التقدم اليومي. الأعلى = اليوم، الأسفل = نهاية الهدف. عند الإنجاز: مسطح كامل بحبر داكن. علامة `<small>` بـ Markazi Text تُكتَب بجانبه: "أَتممتَ ٣٧ من أصل ٥٠".
**Reference Avoided:** standard horizontal progress bar
**Inspired-by:** Najaf manuscript marginal markings
**Originality Self-Score:** 4/5

---

## المحتوى المُحيا (PROVE-IT enforced)

كل widget في الـ bento:

1. **Hero greeting** — تحية بحسب وقت اليوم (morning/afternoon/evening) مكتوبة بـ voice-display
2. **Daily Progress** (focal, bento-m) — % + manuscript-margin progress
3. **Streak counter** (supporting, bento-s) — `<span data-icon="flame" data-icon-color="ember">` + رقم متتالي
4. **Recent achievement** (supporting, bento-s) — `<span data-icon="trophy">` + اسم آخر شارة
5. **Time remaining** (marginalia, bento-xs) — `<span data-icon="clock">` + countdown اليوم
6. **Continue last unit** (focal, bento-l) — اسم آخر وحدة مفتوحة + زر "تابع"
7. **Today's Iraq Block** (marginalia, bento-s) — حقيقة مُحدَّدة بمصدر عن السوق العراقي

### 🇮🇶 Iraq Block (مطلوب — لكل صفحة محتوى)
```html
<aside class="iraq-block">
  <span data-icon="globe-hemisphere-east" data-icon-size="sm" data-icon-color="muted"></span>
  <p class="v-body-lead">في السوق العراقية: <strong>~62% من الموظفين</strong> يفضّلون الراتب الأسبوعي على الشهري — اعتبر هذا في تخطيط الـ KPI.</p>
  <small class="v-eyebrow">المصدر: تقرير IFC 2024</small>
</aside>
```

### PROVE-IT
كل ادعاء رقمي يحتاج:
- citation مرئي (المصدر + السنة)
- data attribute للـ raw value
- لا lorem ipsum، لا ترجمة فضفاضة

---

## التنفيذ (موجز)

### ١. تحديث `page-dashboard` HTML
- استبدل أي markup بـ `data-world="hibr"` على section
- محتوى bento من δ2 + icons من α4
- Iraq Block في bento-cell marginalia

### ٢. CSS — `pages/_dashboard.css` (يُستخرَج من pages.css)
```css
[data-world="hibr"] .progress-margin {
  position: absolute;
  inset-inline-end: var(--s-3);
  inset-block: var(--s-4);
  inline-size: 12px;
  background: var(--anchor-2);
  border-radius: 1px;
}

[data-world="hibr"] .progress-margin__fill {
  inline-size: 100%;
  background: var(--ink);
  block-size: var(--progress-pct, 0%);
  transition: block-size var(--duration-hibr) var(--ease-hibr);
  border-radius: 1px;
}

.iraq-block {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
  padding: var(--s-3);
  border-inline-start: 3px solid var(--ember);
  background: color-mix(in oklch, var(--ember) 4%, transparent);
}
```

### ٣. JS — `pages/dashboard.js`
- compute `--progress-pct` من Upg.state.get('daily_progress')
- update on `upg:state:daily_progress`
- mount icons via `Upg.icons.autoMount()`

---

## Acceptance Criteria

- [ ] `data-world="hibr"` على section
- [ ] manuscript margin progress يعمل (visible + animated)
- [ ] 7 bento cells مع icons من α4
- [ ] Iraq Block موجود مع source
- [ ] لا emoji في markup
- [ ] لا inline `<svg viewBox>`
- [ ] grep: `grep -c '<svg viewBox' platform/index.html | grep page-dashboard` == 0
- [ ] PROVE-IT rule محترم (citation visible)
- [ ] commit: `ε1: Dashboard revived — verified: bento_cells=7, iraq_block=on, hibr_world=on, citation=on`
- [ ] Beacon recorded

— نهاية ε1 —
