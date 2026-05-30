# η3 — HAPTIC_PATTERNS (Pillar η — KINESIS, stage 3/3 — CLOSES η)

> *«ما تُعَلِّمه الدُروس مَقاماً، تَشعُر به اليَد عند الإنجاز. الاكتِمال إيقاع، لا طَنين.»*

**Pulse intent:** HAPTIC_PULSE — the *rhythmic-vocabulary* axis (η2 was the
*valence* axis). A three-word tactile language (دفّن / تَك / مَقسوم), reused from
v4 δ4, bound to press / valid-drop / completion. The completion buzz is not a
generic ping — it transliterates the **Maqsoom iqā'** (Dum-tak-tak), the very
rhythm the call-scenario content teaches.

Atelier §3 (η3) anchor: bind `Upg.haptic` to mastery/complete/drag.

---

## 1 — What ships

| file | kind | budget |
|---|---|---|
| `platform-v5/assets/js/haptic.js` | NEW — classic IIFE (`Upg.haptic`) | ≤ 160 |
| `platform-v5/assets/js/press.js`  | EDIT — exclude `[data-match]` (≈3 lines) | ≤ 4 |
| `platform-v5/index.html`          | EDIT — wire haptic.js (+1) | ≤ 2 |
| `prompts/v5/η3_HAPTIC_PATTERNS.md`| NEW — this spec | — |

Hard cap ≤ 600 lines/stage.

## 2 — The vocabulary (reused from v4 δ4 — honest continuity)

| name | pattern (ms) | meaning | bound to |
|---|---|---|---|
| **دفّن** dafn | `[8]` | a soft single tap — acknowledgement | `upg:press` (every tap) |
| **تَك** takk | `[12, 20, 12]` | a confirming double-knock | valid match drop (via η2's call site) |
| **مَقسوم** maqsoom | `[8, 30, 8, 30, 14]` | the rhythmic signature (Dum-tak-tak) | `upg:zen:complete` |

`maqsoom` mirrors the **Maqsoom iqā'** — the standard Arabic/Iraqi percussion
rhythm — so the completion you *feel* is the maqam the lesson taught (this is the
literal HAPTIC category: "a vibration pattern that mirrors a melodic pattern from
the content", PULSE_LIBRARY §1).

## 3 — Binding architecture (no double-fire)

- `upg:press → dafn` and `upg:zen:complete → maqsoom` are listeners added here.
- Valid-drop `takk` is **not** a listener — it is fired at η2's call site
  (`match.js` → `Upg.haptic.play('takk')`), which this module now powers. Adding a
  second `upg:match:resolve` listener would double-fire, so it is deliberately omitted.
- **press.js gets a 1-line exclusion of `[data-match]`** so the global press `dafn`
  never pre-empts the bench's `takk` (chips/zones are `role="button"`; the bench owns
  its own tactile language). The match bench's wrong-drop **silence** stays intact.

## 4 — Public surface (idempotent, frozen) — re-implements the sacred `Upg.haptic`

```
Upg.haptic.play(name)     fire a pattern by name (debounced 50ms)
Upg.haptic.patterns()     ['dafn','takk','maqsoom']
Upg.haptic.enable()       opt back in (persists)
Upg.haptic.disable()      opt out (persists; cancels any buzz)
Upg.haptic.enabled()      boolean
Upg.haptic.available()    supported() && not reduced-motion
Upg.haptic._meta          { version, pulse, vocabulary, binds }
```

## 5 — Gating / guardrails

- **Reduced-motion** (`prefers-reduced-motion: reduce`) → `play()` is a no-op
  (vibration is motion-adjacent; respect the contract).
- **Capability** → no-op where `navigator.vibrate` is absent (desktop, iOS Safari).
- **Opt-out** → `localStorage 'upg.haptic.enabled'` (default on; subtle 8–14ms taps).
- **Debounce** 50ms (anti-mash). `data-haptic-state` on `<html>` reflects on/off.
- Never plays audio (not Forbidden #19 — that's sound-by-default); never adds chrome.
- No emoji / hex / `!important` / inline-`<svg viewBox>`; `node --check` clean.

## 6 — Acceptance (grep-verified)

- `haptic.js` exists; `Upg.haptic` frozen; 3 patterns (dafn/takk/maqsoom) with the
  v4 δ4 values; `navigator.vibrate` used; reduced-motion + capability + localStorage
  guards present; 50ms debounce.
- listeners: `upg:press` (dafn) + `upg:zen:complete` (maqsoom) = 2; **no**
  `upg:match:resolve` listener (no double-fire).
- press.js excludes `[data-match]` (1 match); η1's other η1 metrics unchanged.
- 0 emoji / hex / `!important` / physical-dir in η3 files; http 200.

## 7 — Pulse declaration (for PULSE_LOG.md / commit)

- **Category:** HAPTIC_PULSE *(rhythmic-vocabulary axis; η2·η3 = 2 HAPTIC, no 3-row)*
- **Surprise (ar):** نَبضة الاكتِمال إيقاع مَقسوم (دُم-تَك-تَك) مُتَرجَم إلى اهتِزاز،
  لا طَنين عامّ — مُفرَدات لَمسية ثلاث (دفّن للنَقر / تَك للصَواب / مَقسوم للإنجاز).
- **Avoided:** AI-default "one generic notification buzz for everything".
- **Inspired-by:** the Maqsoom iqā' (a verifiable real-world percussion rhythm) +
  Wild Card #4 (a muezzin call — sound-as-meaning converging at one moment).
- **Distinction:** η2 HAPTIC = valence (truth/silence). η3 HAPTIC = rhythmic
  vocabulary (3 named patterns; maqsoom mirrors the content's maqam). Closes Pillar η.
