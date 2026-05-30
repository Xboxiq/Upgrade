# η2 — DRAG_DROP (Pillar η — KINESIS, stage 2/3)

> *«اليَد تَتَعَلَّم الصَواب بالشُعور. التَكّة تُؤَكِّد الحَقّ؛ والخَطأ يُقابَل بصَمت.»*

**Pulse intent:** HAPTIC_PULSE — **the debut of the last unused category (→ 9/9).**
A match-target training widget where a correct placement is confirmed by a single
felt tap and an incorrect one is met with **deliberate tactile silence** — the
absence of the buzz is the signal. Pivots off SPRING (η1 was the 2nd-consecutive).

Atelier §3 (η2) anchor: prototype quiz/option interaction → sortable + match-target
zones, **full keyboard parity** (RTL ArrowLeft = next).

---

## 1 — What ships

| file | kind | budget |
|---|---|---|
| `platform-v5/assets/css/match.css` | NEW — `@layer components` | ≤ 210 |
| `platform-v5/assets/js/match.js`   | NEW — classic IIFE (`Upg.match`) | ≤ 250 |
| `platform-v5/index.html`           | EDIT — standalone `.match-bench` region + wire (+2) | ≤ 40 |
| `platform-v5/assets/svg/icons.svg` | EDIT — +`icon-grip-vertical` (Lucide) | ≤ 12 |
| `platform-v5/assets/svg/SEMANTIC_MAP.json` | EDIT — +`training.drag` | ≤ 2 |
| `prompts/v5/η2_DRAG_DROP.md`        | NEW — this spec | — |

Hard cap ≤ 600 lines/stage. The widget is a **standalone region** (NOT a
`.bento-card`) so it never collides with δ2 click-to-expand.

## 2 — The content (reinforces the focal scenario)

Match each **maqam** to its **call phase** (the focal card already teaches this):
- بَيات → الافتِتاح (الهُدوء)
- حِجاز → التَعاطُف
- عَجَم → الإغلاق الحازِم

## 3 — The behaviour (three input modalities)

1. **HTML5 DnD** (mouse): `draggable` chips, zones `preventDefault` on dragover, drop resolves.
2. **Pointer events** (touch / coarse): pointerdown on a chip → a ghost follows →
   `elementFromPoint` finds the zone under release → drop.
3. **Keyboard pick-and-drop** (RTL parity): Tab to a chip; Enter/Space **grabs**
   (`aria-grabbed`); focus moves to a zone; **ArrowLeft = next, ArrowRight = prev**
   (RTL), Up/Down also cycle; Enter **drops**; Escape **cancels**.

**Resolution rule:** valid iff `chip.dataset.matchKey === zone.dataset.matchZone`.
- **Valid:** chip locks into the zone, zone gains a neutral "locked" look + a
  `states.success` check icon (in `--ink`, **not** an accent — CHROMA §7 keeps the
  ring as the screen's only cyan), and a single **تَك** confirm fires
  (`Upg.haptic.play('takk')` when present — η3 — else `navigator.vibrate(20)`).
- **Invalid:** chip springs back to the pool, the zone shakes once (reduced-motion:
  instant), and **NO haptic — silence**. The absence is the information.

## 4 — Public surface (idempotent, frozen)

```
Upg.match.reset()        return all chips to the pool
Upg.match.solved()       boolean — all three placed correctly
Upg.match.state()        { placed:Number, total:Number }
Upg.match._meta          { version, pulse, modalities:3 }
```

Fires `CustomEvent('upg:match:resolve', { key, zone, valid })` for analytics/η3.

## 5 — Banned / guardrails

- No `!important`, no new motion tokens, no hex, no emoji, no inline `<svg viewBox>`
  (grip icon goes through the **sprite** + `data-icon="training.drag"`).
- No `--accent-progress` / `--accent-action` on the bench (single-accent §7: the
  ring keeps the screen's one cyan). Correctness reads via icon + border + surface.
- Logical properties only (RTL). Tap targets ≥ 44×44 (§5.20).
- Must not be a `.bento-card` (δ2 expand isolation).
- Wrong-drop must be **silent** (haptic), never a toast (#6) or an emoji (#8).

## 6 — Acceptance (grep-verified)

- `match.css` + `match.js` exist; `Upg.match` frozen; `icon-grip-vertical` in sprite
  (symbols 30 → 31); `training.drag` in SEMANTIC_MAP.json.
- 3 modalities present: `draggable=` ≥ 3 · pointer handlers ≥ 3 · key handler ≥ 1.
- valid path calls a confirm (Upg.haptic-or-vibrate) **once**; invalid path has **no**
  vibrate call (grep: vibrate only inside the valid branch).
- reduced-motion guard ≥ 1; `data-match-*` hooks ≥ 6; 0 accent tokens in match.css.
- 0 emoji / hex / `!important` / physical-dir in η2 files; `node --check` OK; http 200.

## 7 — Pulse declaration (for PULSE_LOG.md / commit)

- **Category:** HAPTIC_PULSE *(debut — completes 9/9 categories)*
- **Surprise (ar):** الإفلات الصَحيح يُجاب بتَكّة واحِدة؛ الخَطأ يُقابَل بصَمت لَمسيّ
  مَقصود — غِياب الاهتِزاز هو الإشارة.
- **Avoided:** AI-default "every drop buzzes / wrong buzzes harder" + Forbidden #6
  (toast scold) + #8 (emoji feedback).
- **Inspired-by:** Wild Card #16 — a pearl-diver's breath rhythm (silent counting;
  the surfacing is felt, not announced). Continues v4 ε2 (lost = silence) on a
  tactile axis.
- **Distinction:** η3 HAPTIC is the *vocabulary/rhythm* axis (دفّن/تَك/مَقسوم mapped
  to press/drop/complete, the maqsoom mirroring the maqam content). η2 HAPTIC is the
  *valence* axis (confirm-on-truth / silence-on-error). η2·η3 = 2 HAPTIC (no 3-row).
