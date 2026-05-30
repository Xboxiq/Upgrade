# η1 — PRESS_FEEDBACK (Pillar η — KINESIS, stage 1/3)

> *«الضَغط جَواب الجِسم. كل عُنصُر يَنزِل بقَدْر كُتلَتِه، ثم يَرتَدّ كنَفَسٍ واحِد.»*

**Pulse intent:** SPRING_PULSE — kinetic feedback from the roots: a global,
proportional press that the whole platform shares, replacing eight ad-hoc
per-component `:active` scale numbers that have no release physics.

Spec authored before execution per AUTO_PILOT_v5 boot step 4. Atelier §3 (η1)
anchor: prototype `.btn:active` spring → global `[data-press]` 0.98 spring;
reduced-motion → opacity only.

---

## 1 — What ships

| file | kind | budget |
|---|---|---|
| `platform-v5/assets/css/press.css` | NEW — `@layer components` | ≤ 140 |
| `platform-v5/assets/js/press.js`   | NEW — classic IIFE (`Upg.press`) | ≤ 170 |
| `platform-v5/index.html`           | EDIT — wire css + js (+2) | ≤ 4 |
| `prompts/v5/η1_PRESS_FEEDBACK.md`  | NEW — this spec | — |

Hard cap ≤ 600 lines/stage.

## 2 — The behaviour

1. **Unified transition layer.** `:where(button, [role="button"], [data-press])`
   gains a shared `transform`/`opacity` transition on the snap token + `will-change`
   + `touch-action: manipulation`. `:where()` = **0 specificity** → it never
   clobbers the 8 existing component `:active` scales; it only fills the gaps.
2. **The release spring (the Pulse).** On release (pointerup / Enter / Space),
   JS adds `[data-press-release]` for one cycle. `@keyframes press-bloom`
   (3 stops: from `--press-from` → 1.014 → 1.000) plays on `--ease-spring`.
   None of the 8 components had a release overshoot — this is the new shared layer.
3. **Proportional depth (Modulor, Wild Card #3).** On pointerdown JS reads the
   control's `offsetHeight` and sets `--press-from` ∈ [0.965 .. 0.992]: a large
   CTA rebounds from a deeper compression than a small chip, so every control
   *feels* like it sank the same physical distance under the finger.
4. **`upg:press` event.** Fired on every activation (`{ target, kind:'tap' }`)
   so η3 (HAPTIC) can couple a دفّن tap without press.js depending on haptic.
5. **Reduced-motion.** `prefers-reduced-motion: reduce` → press becomes an
   **opacity dip only** (`:active { transform:none; opacity:.82 }`), release
   keyframe disabled. Meaning preserved without motion (MOTION §4.3).

## 3 — Public surface (idempotent, frozen)

```
Upg.press.enable()      resume the engine
Upg.press.disable()     suspend (leaves CSS defaults intact)
Upg.press.enabled()     boolean
Upg.press._meta         { version, pulse, sink_range }
```

## 4 — Banned / guardrails

- No `!important` (the sanctuary block is the only one in the project).
- No new duration/ease tokens — `--duration-snap` / `--duration-emerge` /
  `--ease-snap` / `--ease-spring` only (MOTION §1/§2).
- No emoji, no hex, no inline `<svg viewBox>`, no physical `left:`/`right:`.
- Must **not** target `.bento-card` (it owns its δ2 expand transform).
- `press-bloom` keyframe ≤ 3 stops (MOTION §6.6) — and it is the declared Pulse.

## 5 — Acceptance (grep-verified)

- `press.css` + `press.js` exist; `Upg.press` frozen surface present.
- `press-bloom` keyframe = 1; uses `--ease-spring`.
- `:where(` zero-specificity guard present (≥ 1) — no clobber of the 8 `:active`.
- fires `upg:press` (≥ 1 dispatch).
- reduced-motion guard present (≥ 1).
- 0 emoji / 0 hex / 0 `!important` / 0 physical-dir in η1 files; `node --check` OK.

## 6 — Pulse declaration (for PULSE_LOG.md / commit)

- **Category:** SPRING_PULSE
- **Surprise (ar):** الضَغط يَنزِل بنِسبة كُتلَة العُنصُر لا بمِقدار ثابِت، ثم
  يَرتَدّ بزُنبُرك واحِد مُشتَرَك يَجمَع ثمانية أرقام `:active` مُتَناثِرة كانت
  بلا ارتِداد.
- **Avoided:** AI-default "scattered/uniform `:active` scale with no release
  physics" (+ MOTION §6.5 hover>4px).
- **Inspired-by:** Wild Card #3 — Le Corbusier's Modulor (proportion tied to
  the human body).
- **Distinction:** ε2 SPRING = drag momentum; ζ3 SPRING = one-shot completion
  bloom on a ring; η1 SPRING = continuous global press + proportional release.
  ζ3→η1 is the 2nd-consecutive SPRING ⇒ η2 MUST pivot (→ HAPTIC).
