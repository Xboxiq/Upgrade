# γ1 — DOCK DESKTOP

**Pillar:** γ (spatial) · **Stage:** 1 of 3 · **Pulse:** **DOCK_PULSE** *(first Pulse of v5)*

## Intent
The first visible chrome of v5: a Floating Dock that sits at bottom-center, hosts the 5 navigation items, and reveals labels on hover-proximity. Replaces v4's classic sidebar entirely.

## The Pulse — DOCK_PULSE
**Surprise:** الـ Dock لا يُظهِر labels افتراضياً — أيقونات صامِتة. عند تَقريب المؤشِّر مَسافة 96px من حافة الشاشة السُّفلى، الـ Dock **يَستَنشِق** (breath-in): يَتَوَسَّع، يَكشِف الـ labels العَربية، ويَظهَر hairline من Neon Cyan على الحافة العُليا. عند الابتعاد، يَزفِر — يَنطَوي بسلاسة. هذه ليست hover-on-the-element؛ هذه **proximity detection**: المؤشِّر لم يَلمس الـ Dock بعد، لكن الـ Dock يَعرف.

**Reference avoided:** Forbidden #16 (avatar + display-name in dock) + AI-default: "every nav reveals labels by default."
**Inspired-by:** Wild Card #16 (Pearl-diver's breath rhythm) — performance by silent counting; the dock breathes in proximity, exhales in absence.

## Files
1. `platform-v5/assets/css/dock.css` — Glass 2.0 surface, Lucide icons via sprite, hover-reveal motion, RTL-symmetric
2. `platform-v5/assets/js/dock.js` — classic IIFE: builds dock from semantic-map, watches mouse Y for proximity, registers `Upg.dock` API
3. `platform-v5/index.html` — wire `dock.css` + `dock.js`

## Forensic targets
- dock-css-tokens-used: ≥ 6 (var(--surface-*), var(--accent-*), var(--ease-*))
- emoji in dock files: 0
- inline `<svg viewBox>` in dock.js: 0 (uses Upg.icons.use)
- node --check on dock.js: pass
- hover-proximity detection: ≥ 1 mousemove handler

## Acceptance
- Dock visible at viewport bottom-center on desktop (≥720px)
- 5 items: Home, Lab, Centre, Progress, More
- Mouse approach within 96px → labels reveal smoothly
- Mouse leaves → dock collapses to icons-only
- All icons via Upg.icons.use('navigation.*')
- HTTP serve + node --check + 0 emoji + 0 inline svg
