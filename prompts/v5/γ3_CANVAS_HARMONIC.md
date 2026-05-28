# γ3 — CANVAS HARMONIC

**Pillar:** γ (spatial) · **Stage:** 3 of 3 (closes pillar γ) · **Pulse:** **GLOW_PULSE**

## Intent
The canvas listens to navigation. As the user moves between dock destinations, the canvas's hue subtly shifts (≤ 1% luminosity drift) toward the spirit of that destination. Imperceptible per-screen, but felt over a long session — the platform breathes with the user's path.

## The Pulse — GLOW_PULSE
**Surprise:** الـ canvas لا يَتغيَّر لون لمَّا يُغَيِّر المُستخدم الصَفحة — لا flash، لا transition سريع. بل يَنزاح بـ **1٪** فقط في drift hue/luminosity، عبر `--duration-zen` (640ms). كل وُجهة في الـ dock لها lean بَسيط جِداً:
- `home`     → neutral (الكانفس الأصلي)
- `lab`      → +1% blue-cyan (تَركيز)
- `centre`   → +1% mid-purple (نشاط)
- `progress` → +1% green-teal (نَمو)
- `more`     → +1% warm-grey (خَفت)

المُستخدم لن يُلاحظ تَغير اللون من صَفحة لصَفحة — لكن بعد جَلسة طويلة في `lab`، الكانفس سَيَكون قد انزاح قليلاً نحو الأزرق، فاحته من خَلال نَفس الـ token (`--canvas`) لكن مع `--canvas-shift` modifier. عند العودة لـ `home`، الكانفس "يَستَريح" تَدريجياً.

**Reference avoided:** Forbidden #18 (a theme toggle that animates the entire screen) + الـ AI-default: "every nav click flashes the new section's accent across the whole screen."
**Inspired-by:** Wild Card #14 — Hagia Sophia archway shadow-line at noon: light as a structural element. هنا اللون كَعُنصُر هَيكلي صامت — نظرة المُستخدم لا تَلتَفِت لأي تَغَيُّر، لكن المَكان يَتَنَفَّس مَعَه.

## Files
1. `platform-v5/assets/css/canvas-harmonic.css` (~70 lines): defines `--canvas-shift-{home,lab,centre,progress,more}` HSL deltas; applies them via `[data-active-route="..."]` on `<html>`
2. `platform-v5/assets/js/canvas-harmonic.js` (~80 lines): IIFE listens to `upg:dock:state` + `hashchange`, updates `data-active-route`, exposes `Upg.canvas` API
3. `platform-v5/index.html` — wire both files

## Forensic targets
- shift tokens defined: ≥ 5 (`--canvas-shift-*`)
- 0 emoji
- 0 inline `<svg>` in JS
- 1 `--duration-zen` consumer (the canvas transition)
- 1 `hashchange` listener
- audit `v5_logical_props_audit.py` exit 0

## Acceptance
- `Upg.canvas.setRoute('lab')` → `<html data-active-route="lab">` and canvas transitions over 640ms
- The shift is **subtle** — verifiable by computing `getComputedStyle(document.body).backgroundColor` before/after and seeing a 1-2% hsl drift, no more
- 0 JS deps on dock (canvas-harmonic listens to events, doesn't reach into dock state)
