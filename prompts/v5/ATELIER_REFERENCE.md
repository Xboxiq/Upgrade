# ATELIER REFERENCE — concrete realization layer for TADAFFUQ v5

> *«الدُّكترين تَصِف الرُّوح؛ هذا المِلَفُّ يُعطي الأرقام والمَرجِع الذي يُلمَس.»*
>
> This file binds the **Atelier** design work to the v5 TADAFFUQ pillars. It is a
> *concrete reference layer* — it never overrides a doctrine. On any conflict, the
> five doctrines + `00_TADAFFUQ_MANIFESTO.md` win. Atelier supplies worked values,
> a stage-by-stage map for the **unwritten** pillars (δ → θ), and a **runnable
> visual proof**.

---

## 0. What Atelier is, and its two artifacts

Atelier is the same mission as TADAFFUQ (demolish the admin shell → fluid, spatial,
premium, single-voice learning canvas). It was authored independently and converged
on ~95% of CHROMA/SPATIAL/ICONOGRAPHY/MOTION — so it is adopted as the **concrete
reference**, after the reconciliation in §2.

Two artifacts in the repo:

| Artifact | Path | Status in v5 |
|---|---|---|
| Engineering brief (extended rationale) | `ENGINEERING-PROMPT-UI-REDESIGN.md` (repo root) | **Non-normative** background. Doctrines override on conflict. |
| Runnable reference prototype | `prototype/atelier/` (open `index.html` via http) | **Visual truth** for layout, motion, interaction. **Illustrative only** on colour-token-names + icon-injection (see §2). |

The prototype demonstrates: the rail/dock shell, the bento home (continue card +
momentum strip + domain grid + mastery ladder), two domain views, progress rings,
quiz, 3-state mastery toggle, View-Transitions morph, swipe + keyboard parity,
theme/density persistence, reduced-motion. **Port its patterns into `platform-v5/`
at the stages mapped in §3 — but expressed through doctrine tokens and the sprite.**

---

## 1. Where the autopilot is (read before planning)

Per `state/PROGRESS.json → tadaffuq_v5`: α (4) + β (3) + γ (3) complete (10 stages),
status `pillar-γ-complete`. **Next stage = δ1 BENTO_GRID.** Specs for δ → θ are *not
yet written* — Atelier is their concrete source. Write each stage file from §3 + INDEX
before executing it (per `AUTO_PILOT_v5` boot step 4).

---

## 2. Reconciliation — Atelier names/values → v5 doctrine (doctrine is canonical)

The prototype uses prototype-local token names. **Production v5 uses the doctrine
names.** Translate as you port:

| Atelier (prototype) | → v5 doctrine token (CANONICAL) | Note |
|---|---|---|
| `--accent` (ember `hsl(22 92% 58%)`) | `--accent-action` (`hsl(15 100% 60%)`) | CHROMA §2. Action/CTA only. |
| ring stroke = domain tint | `--accent-progress` (`hsl(187 100% 50%)` neon cyan) | CHROMA §2. **Rings are cyan**, one per screen (CHROMA §7). |
| `--focus` (cyan, a 3rd accent) | **removed** — links/info use `--ink` weights | CHROMA §1: only 4 families, only 2 accents. |
| `--surface-1/2/3` | `--surface-0/1/2` | α3 token names. |
| `--domain-hue` per-domain palettes | **FORBIDDEN** (`world_palettes` target = 0) | One premium voice. See §2.1. |
| inline `<svg class="ico"><use href="#i-…">` | `Upg.icons.use('semantic.key')` + sprite | ICONOGRAPHY §3/§5. Never inline `viewBox`. |
| bespoke `icons.svg` set | already shipped in α4 (`platform-v5/assets/svg/icons.svg` + `SEMANTIC_MAP.json`) | Reuse α4; extend the map, don't fork. |

### 2.1 Domain orientation WITHOUT a palette
Atelier proposed a subtle per-domain hue. In v5 this is **not** a colour change.
Domain orientation is conveyed by **icon + label + position**, and at most by the
existing **γ3 CANVAS_HARMONIC** behaviour (canvas luminosity nudges ≤1% toward the
active accent — never a new hue). Do not reintroduce eight palettes.

### 2.2 What Atelier confirms the doctrines already nailed (use as-is)
Canvas `hsl(225 30% 8%)`, ink `hsl(38 38% 96%)`, oatmeal light `hsl(38 28% 96%)`,
electric-orange action, dark-first — Atelier independently reproduced these. No change.

---

## 3. Stage map — Atelier → the unwritten pillars δ → θ

For each upcoming stage: the concrete Atelier reference, the prototype anchor to port,
and the doctrine guardrail. (Pulse intents stay as INDEX defines them.)

### δ — BENTO LIVE
- **δ1 BENTO_GRID** ← prototype `.bento` (12-col, `container-type: inline-size`,
  editorial rhythm via `span-6` variation) **+** the home composition: `.continue`
  (hero, one `--accent-action` CTA), `.momentum` strip, `.ladder`. Container-queries
  first (SPATIAL). One action accent on the screen (CHROMA §7).
- **δ2 BENTO_EXPAND** ← prototype spatial morph: tag the tile and the destination
  page-head with the same `view-transition-name` and run `document.startViewTransition`
  (FLIP fallback). Cards **morph in place / expand**, never link out (manifesto).
- **δ3 BENTO_RING** ← prototype `.ring` (SVG `stroke-dasharray` from `--p`,
  `stroke: var(--accent-progress)`). Exactly **one** progress ring per screen.

### ε — DISCLOSURE
- **ε1 SLIDE_OVER** ← prototype block-detail + ⌘K as an inline-end slide-over + scrim,
  coupled to history state. No modal (`position:fixed; inset:0` is forbidden).
- **ε2 BOTTOM_SHEET** ← prototype touch `touchstart/move/end` drag with rubber-band →
  generalize to a drag-to-dismiss sheet with momentum (SPRING).
- **ε3 OVERLAY_CHOREO** ← prototype dock-on-edge-swipe → choreograph: opening a panel
  hides the dock; closing returns it with delay (VEIL).

### ζ — ZEN MODE
- **ζ1–ζ3** ← prototype lesson view (`.prose` capped at `--measure`, sticky shrinking
  `.page-head`, block pager). Zen = dim canvas, slide dock out, keep workbench + the
  single ring + prompt. Exit = Bloom on the ring (MOTION §3), not on the page.

### η — KINESIS (this is Atelier §14 "interaction from the roots")
- **η1 PRESS_FEEDBACK** ← prototype `.btn:active` spring → global `[data-press]` 0.98
  spring (MOTION). Reduced-motion → opacity only.
- **η2 DRAG_DROP** ← prototype quiz/option interaction → sortable + match-target zones
  for training scenarios, full keyboard parity (the prototype's Arrow-key block pager
  is the parity pattern: RTL ArrowLeft = next).
- **η3 HAPTIC_PATTERNS** ← bind `Upg.haptic` to mastery/complete/drag (prototype fires
  "Bloom" on mastery; add the v4 haptic patterns).

### θ — POLISH (Atelier §11 gates = θ verification)
- **θ1 PERF_AUDIT** — Lighthouse Mobile Performance ≥ 90 on `platform-v5/index.html`.
- **θ2 A11Y_SEAL** — Accessibility ≥ 95; every icon has correct a11y posture; the
  prototype's posture (decorative icons `aria-hidden`, rated `role="img"`+label,
  visible focus ring, skip-link) is the baseline.

---

## 4. The emoji → icon inventory (concrete, for content recasting)

α4 shipped the sprite. When ε-class content stages recase the 12 page revivals into
v5, use this verified inventory (top of ~2,535 emoji across the v4 markup) to drive
`SEMANTIC_MAP.json` coverage. Map to Lucide semantic keys, never glyphs:

```
✗ ❌ → states.wrong (x / x-circle)      ✅ ✓ → states.correct (check / check-circle)
⭐★☆ → training.difficulty (star fill count, role=img "صعوبة N من 5")
⚠ 🚨 → states.warning / states.critical  📚 → training.reading      ⚡ → training.quick
💰 → training.money (coins)              🎯 → training.objective     ⏱ → training.time
💡 → training.tip (lightbulb)            🛠🔧 → training.repair       📊📈 → training.metrics
🤝 → training.deal (handshake)           🔥 → momentum.streak (flame) 📌📋 → training.note/checklist
📞 → domain.callcenter (phone)           🛡🔒🚫 → states.secure/locked/blocked
⚖ → domain.law (scale)                   🇶🇮 (flags) → neutral chip / country code, never flag emoji
```

Endgame target (PROGRESS): `emoji_anywhere = 0`.

---

## 5. How this file participates in the run

`AUTO_PILOT_v5` boot step 1 now includes this file in the read set, and `INDEX.md`
lists it under Doctrines (as a *reference*, not a doctrine). Pasting `AUTO_PILOT_v5.md`
therefore: reads doctrines + this reference → resumes at δ1 → writes the δ1 stage file
from §3 → forensic scan → execute against `platform-v5/` → verify → commit → push →
state → push. **Identical rhythm to before; Atelier just makes δ → θ concrete.**

> On every conflict: doctrine wins, this reference yields, the prototype is illustrative.
