# δ2 — BENTO EXPAND

**Pillar:** δ · **Stage:** 2 of 3 · **Pulse:** **REVEAL_PULSE**

## Intent
The bento card opens **in place**. Click → the card spans more grid cells, other cards reflow around it, and a previously-hidden detail body appears below the card's header. Press Escape or click outside → it collapses back. **No page navigation, no modal, no slide-over.**

## The Pulse — REVEAL_PULSE
**Surprise:** التَوَسُّع لا "يَزيح" بَقيَّة البطاقات بطَريقة مُؤلِمة بَصرياً (عَكس الـ AI-default الذي يَستَخدِم max-height transitions). يَستَخدِم **CSS Grid template re-flow + View Transitions API** عند توافُره: عند الضَغط، الـ grid-template يُتَغَيَّر، البطاقة المَفتوحة تَأخذ `b-4x3`، الباقيات يُعِدن ترتيب أنفسهن بـ `dense` flow. الـ View Transitions API يَلتَقِط حالتي قبل/بعد ويُؤدّي الانتقال كَـ FLIP تلقائي. الفَلسَفة: **التَوَسُّع رِواية، لا قَفز**. الـ details inside تَظهَر بـ staggered reveal (header فوراً، body بعد ٢٠٠ms). على المُتَصَفِّحات بدون View Transitions (Firefox)، الـ fallback يَستَخدِم `transition: grid-column var(--duration-morph)` — التَوَسُّع نَفسه يَحدُث، فقط بدون الـ FLIP magic.

**Reference avoided:** Forbidden #5 (modal popup for detail) + الـ AI-default الكَبير: "click card → navigate to /card/:id" (separate page).
**Inspired-by:** Wild Card #21 — al-Jazari's water clock manuscript. الآلة تَستَعرِض غَرَضها بَصرياً بدون شَرح. المُستخدم يَرى التَوَسُّع، يَفهم البِنية، لا يَحتاج شَرحاً.

## Files
1. `platform-v5/assets/css/bento-expand.css` (~80 lines) — `[data-expanded="true"]` rules + reduced-motion + staggered child reveal
2. `platform-v5/assets/js/bento-expand.js` (~120 lines) — classic IIFE, click handler, Escape handler, click-outside handler, exposes `Upg.bento.expand(card)` / `.collapse()`
3. `platform-v5/index.html` — add hidden `<div class="bento-card-detail">` regions inside each expandable card
4. Wire `bento-expand.css` + `bento-expand.js` in index.html

## Forensic targets
- click handler attached to `.bento-card`: 1
- View Transitions API guard (`document.startViewTransition`): 1
- Escape key handler: 1
- click-outside handler: 1
- 0 emoji, 0 hex, 0 inline `<svg viewBox>` in markup
- node --check passes

## Acceptance
- Click on a card → it expands to `b-4x3` and other cards reflow
- Press Escape OR click outside → it collapses
- Only one card expanded at a time (radio-style)
- Detail body inside expanded card reveals with stagger
- Works on Firefox (no view-transitions) — fallback to CSS-only transition
