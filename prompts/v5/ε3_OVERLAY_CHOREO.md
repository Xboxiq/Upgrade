# ε3 — OVERLAY_CHOREO (Pillar ε — DISCLOSURE, stage 3 of 3 — closes Pillar ε)

> *«حين تُستَدعى اللوحة، يَنسَحِب الـ dock بأدَب؛ وحين تَرحَل، لا يَعود مُسرِعاً — يَنتَظِر نَفَساً، ثم يَطلُع كَرَفع حِجاب على مَهَل.»*
> Pulse intent: **VEIL_PULSE** (debut of the category in v5).

---

## 0. Where this sits

ε1 built the slide-over; ε2 made it a drag-dismiss sheet on touch. ε3 **choreographs the
handoff between the dock and the overlay** (INDEX: "opening a panel hides the dock; closing
returns it with delay"). It is the connective tissue that makes the two chromes feel like one
intentional system rather than two widgets fighting for the bottom of the screen.

ε3 closes Pillar ε — DISCLOSURE.

---

## 1. The doctrine guardrails

- **No transform clobber on `.dock`.** dock.css centres the dock with `transform:
  translateX(-50%)` and transitions only `gap/padding/box-shadow`. ε3 must NOT redeclare the
  base `.dock` transform or transition. The veil is an **opacity dissolve** declared on the
  state attributes only.
- **Motion via tokens.** Dissolve uses `--duration-panel` + `--ease-panel`; the patient return
  uses `--duration-zen` + `--ease-emerge`. JS orchestration delays are *read from* the CSS
  duration tokens (via `getComputedStyle`), never invented as one-off `ms`.
- **Reduced motion.** The global sanctuary collapses the fades to a snap. The *meaning* — focus
  protection + a deliberate return — is preserved by keeping the return-beat (a pause is not
  motion). MOTION §4.3.
- **Additive only.** No γ file is edited. ε3 ships its own CSS targeting `.dock[data-veiled]` /
  `.dock[data-veil-return]` and its own JS listening to the `upg:overlay:open` / `:close`
  events that ε1 already dispatches.
- **Idempotent + frozen surface.** `Upg.choreo` registered once, `Object.freeze`d.
- **Logical properties only**; zero emoji/hex/inline-svg/!important.

---

## 2. The Pulse — 🌙 VEIL_PULSE (the chrome that dissolves, then returns on tarteel time)

**Category:** VEIL_PULSE — first of its category in v5. PULSE_LIBRARY §1: *"a focus-mode
surprise — the chrome dissolves … the do-not-disturb gradient creeps in."*

**The surprise:** when any overlay opens, the dock does not blink off. It **dissolves** — fades
to nothing over `--duration-panel` with `--ease-panel`, melting into the canvas so the panel
holds the whole stage. When the overlay closes, the dock does **not** rush back. It waits a
deliberate beat (≈ one `--duration-panel`, so the panel is fully gone and the eye rests on an
unadorned canvas for a moment of calm), then re-emerges **slowly** over `--duration-zen` with
`--ease-emerge`. The asymmetry is the point: focus is protected instantly, but the veil is
*lifted* slowly — the platform returns its chrome the way you raise a curtain on a quiet room,
not the way you flip a switch.

**Reference avoided:** the AI-default "hide the nav with `display:none` the instant a modal
opens, and slam it back the instant it closes" — chrome that blinks, jarring on every
open/close. Also Forbidden #6/#24 lineage (no toast, no FAB re-appearing) — the only chrome is
the dock, and it leaves and returns as one gesture.

**Inspired-by:** Wild Card #24 — A Quranic reciter's tarteel pacing (the slowness that opens
meaning). Tarteel is deliberate, unhurried recitation; the pauses are not empty — they let
meaning settle. The dock's return is paced like tarteel: the beat of stillness after the panel
leaves is not lag, it is room for the canvas to breathe before the chrome speaks again.

**Why VEIL not MORPH/SPRING:** nothing transforms or springs; chrome *dissolves* to grant focus
and the canvas enters a do-not-disturb stillness — that is the VEIL family. Distinct from the
coming ζ ZEN VEILs: ε3 is **acute** (transient, bound to a single overlay open/close); ζ will be
**chronic** (a sustained focus mode for a training session). Pivot: last three were GLASS(ε1) ·
SPRING(ε2) · VEIL(ε3) — fresh debut, no violation.

---

## 3. Files (≤ 6)

1. `prompts/v5/ε3_OVERLAY_CHOREO.md` — this spec.
2. `platform-v5/assets/css/overlay-choreo.css` — NEW, `@layer components`:
   `.dock[data-veiled="true"]` (opacity 0 + pointer-events none + dissolve transition) and
   `.dock[data-veil-return="true"]` (the slow zen-paced return transition). Forced-colors note.
   Never touches the base `.dock` transform/transition.
3. `platform-v5/assets/js/overlay-choreo.js` — NEW, classic IIFE: `Upg.choreo`
   (frozen: `isVeiled / _meta`). Reads duration tokens via `getComputedStyle`; on
   `upg:overlay:open` veils the dock; on `upg:overlay:close` schedules the patient return
   (beat → unveil → slow re-emerge → cleanup); cancels a pending return if a new overlay opens.
4. `platform-v5/index.html` — link `overlay-choreo.css`, defer `overlay-choreo.js` (2 lines).

`Upg.choreo` is additive; it listens to ε1's events and toggles attributes on the γ1 dock — no
sacred API touched, no γ file edited.

---

## 4. Verify (re-run after build)

```
data-veiled rule + data-veil-return rule ≥ 2
opacity:0 + pointer-events:none on veiled = present
ease-panel (dissolve) + ease-emerge (return) referenced
base .dock transform/transition NOT redeclared in overlay-choreo.css (0)
listens upg:overlay:open + upg:overlay:close (2)
reads --duration-* via getComputedStyle  Upg.choreo frozen surface = 1
emoji=0 hex=0 inline-svg=0 important=0 (shipped)   physical left/right=0 (audit exit 0)
node --check overlay-choreo.js = OK
```

---

## 5. Acceptance

- Opening any overlay fades the dock out smoothly (no blink); the panel owns the stage.
- Closing it leaves a brief beat of chrome-free canvas, then the dock returns slowly.
- Rapidly reopening before the return cancels the pending return cleanly (no flicker/stuck dock).
- Reduced-motion: dock hides/returns instantly but the deliberate beat is preserved.
- `node --check` clean, logical-props audit exits 0, zero new emoji/hex/inline-svg/!important.
- One Pulse logged (VEIL_PULSE), one TRUTH_LEDGER entry, PROGRESS.json → ε2 marked, Pillar ε
  closed, then the Pillar ε PR is opened to `main`.
