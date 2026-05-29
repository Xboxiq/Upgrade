# γ2 — DOCK MOBILE

**Pillar:** γ (spatial) · **Stage:** 2 of 3 · **Pulse:** **MORPH_PULSE**

## Intent
The mobile bottom-nav. **Same DOM node** as the desktop dock — no duplicate. At viewport ≤720px, CSS reflows the dock from a centred floating capsule into a full-width bottom-bar with safe-area envelope.

## The Pulse — MORPH_PULSE
**Surprise:** هذا ليس "نُسخَتان من الـ Dock — واحدة لـ desktop وواحدة للموبايل" — هذه نُسخة **واحِدة** تَتَحَوَّل في مَكانها. عند `inline-size ≤ 720px`، الـ `nav.dock` نَفسه (نَفس الـ DOM node، نَفس الـ children) يُعيد ترتيب نَفسه: يَنفُذ من المُنتصف إلى الحافَتَين، يَأخذ كامِل العَرض، يَنخَفِض ارتفاعه إلى 64px، يَكشِف labels تلقائياً (لأن الموبايل يَحتاج دَوماً للـ labels — لا proximity-reveal للجوال). لا JS يَتدخَّل في التَحَوُّل — `@container` query وحدها كافية. هذا يَحفَظ الـ a11y state، الـ aria-current، والـ tab order — كأن الـ dock يُغَيِّر شَكله بدون فُقدان هويَّته.

**Reference avoided:** Forbidden #14 ("Pro tip" floaters) + the AI-default *"render two separate components for desktop and mobile."*
**Inspired-by:** Wild Card #2 — Negative space of a Hokusai wave: the work is what the brush *didn't* paint. Here, the morph is what the JS *didn't* do.

## Files
1. `platform-v5/assets/css/dock-mobile.css` — `@media` block at ≤720px that reshapes the existing `.dock` selector
2. `platform-v5/index.html` — wire `dock-mobile.css`

## Forensic targets
- `@media (max-inline-size: 720px)` blocks: ≥ 1
- `position: sticky` or `position: fixed` for mobile dock: 1 (the morph anchors the dock to bottom)
- `safe-area-inset-bottom` references: ≥ 1
- 0 new JS (the morph is CSS-only)
- 0 emoji, 0 hardcoded hex
