# تَدَفُّق — Design System (FROZEN: PHASE 0)

> Single art direction for the whole platform. Every screen inherits this.
> Status: **proposed for approval** on the Call Center reference screen.

---

## 0. The name is the doctrine

**تَدَفُّق** means *flow / streaming / a rising surge*. The entire identity is
built around one felt idea: **mastery is a tide that rises as you train.**
This is not a metaphor we decorate with — it is the literal source of every
colour, motion and signature visual below. If an element cannot be traced back
to "flow", it does not ship.

---

## 1. Art direction — "Aurora Tide"

A **deep-space** environment over which a faint **aurora** drifts. Your progress
is a luminous **cyan tide** that fills vessels (rings, bars) as you master each
unit. Actions are a warm **orange spark** — the one warm point in a cool, calm
deep. The result is focused, premium, nocturnal-by-default, and unmistakably
*this* product — not a generic Material or iOS template.

### Why this over the alternatives (decision log)

| Option | Summary | Verdict |
|---|---|---|
| **A — Aurora Tide** *(chosen)* | Deep-space + cyan tide + orange spark; liquid-fill rings; floating dock; bento; live waveform. | **Recommended.** Honours the documented design language, gives the product a soul tied to its name, and is a genuine qualitative leap. |
| B — Refined iOS (status quo) | Keep graphite/violet/gold and merely polish. | Rejected: safe but *not* a leap; ignores the documented identity (deep-space/cyan/orange). |
| C — Warm Oatmeal Editorial | Light-first, serif display, single warm accent. | Rejected as primary: calm but lacks training energy and contradicts the dark-first brief. Its warmth survives as our **light mode** (oatmeal canvas). |

---

## 2. Colour — a two-pole semantic system

Colour is never decorative. There are exactly **two accent poles**, each with one job:

- **COOL — Cyan "Tide"** → progress, mastery, active state, identity, "you / your data". This is *reflection*.
- **WARM — Orange "Spark"** → primary calls-to-action, "do this now", energy. This is *action*.

Everything else is neutral ink + space, plus reserved semantics (success / warning / error).
Two poles, used with discipline, read instantly: cool = where you stand, warm = what to do next.

### Dark mode (primary — "deep space")
| Token | Hex | Role |
|---|---|---|
| `canvas` | `#0B0F19` | deep-space background |
| `canvasSink` | `#060911` | focus veil / deeper well |
| `surface1` | `#141A27` | primary panel |
| `surface2` | `#1C2436` | raised panel |
| `ink` / `inkMuted` / `inkFaint` | `#EAF1FF` / `#93A0B8` / `#5A6680` | text ramp |
| `brand` / `brandDeep` | `#00E5FF` / `#00B8D4` | cyan identity / active |
| `tideGradient` | `#67F2FF → #00B8D4` | progress fill (the tide) |
| `spark` / `sparkDeep` | `#FF6B35` / `#FF4D12` | action / CTA |
| `success` / `warning` | `#30D158` / `#FFB020` | semantics (kept distinct from cyan) |

### Light mode (oatmeal — calm daylight)
| Token | Hex | Role |
|---|---|---|
| `canvas` | `#F7F5F1` | oatmeal background |
| `surface1` | `#FFFFFF` | panel |
| `ink` / `inkMuted` / `inkFaint` | `#16181D` / `#5E6470` / `#9AA0AC` | text ramp |
| `brand` / `brandDeep` | `#017E91` / `#015F6E` | deep teal-cyan (AA on oatmeal) |
| `tideGradient` | `#19C6E6 → #0098B5` | progress fill |
| `spark` / `sparkDeep` | `#D8551E` / `#B8410F` | action (AA on oatmeal) |

> **Contrast rule:** large fills (ring interiors, bars) may use bright cyan;
> any cyan/orange used as *text or icons* uses the deeper light-mode values to
> hold **WCAG AA**.

---

## 3. Typography

- **Cairo** — the workhorse for Arabic + Latin (clean, SF-adjacent, RTL-native).
- **JetBrains Mono** — reserved exclusively for measured values (KPIs, targets, percentages).
- Personality comes from **weight + tight tracking on large titles**, not a zoo of fonts.
- Numerals render **Arabic-Indic** (٠١٢٣) to stay native to the reading experience.
- iOS type ramp preserved (Large Title 34 → Caption 12).

---

## 4. Shape & layout language

- **Soft squircle** radii (continuous-feel), grouped insets, generous negative space.
- **Bento** composition for dashboards/heroes: tiles of deliberate, varied weight — never a uniform grid.
- **Floating dock** instead of an edge-to-edge tab bar: a centred, glass, pill-shaped
  navigator hovering above the canvas with margin on all sides. The dock *floats on the tide.*
- **Zen / Focus mode**: the world recedes by subtraction (blur + dim), leaving only the
  breathing tide ring and one objective.

---

## 5. Motion language — "The Tide"

- **Physical springs** (iOS feel), 60fps target, single controlled overshoot on press release.
- **Progress fills like liquid** — the signature `TideRing` raises a wave level, it never just sweeps a stroke.
- **Aurora drift** — an ambient, *very* slow, low-alpha background bloom. It is intentionally
  restrained (not a light show); it represents the living ambient flow of the platform.
- **Haptics on every meaningful press** (light impact), wired through `PressScale`.
- **`prefers-reduced-motion` is honoured**: aurora freezes to a static gradient, count-ups
  resolve instantly, breathing stops. Comprehension never depends on motion.

---

## 6. Signature visuals (CustomPainter — the soul)

1. **`TideRing`** — a circular vessel whose interior fills with a luminous cyan **wave**
   proportional to mastery. The wave crests, has surface highlight, and animates on change.
   *Meaning: your mastery is a rising tide.* Used for hero, featured, focus mode.
2. **`AuroraBackground`** — two soft cyan/indigo blooms drifting slowly behind the canvas.
   `RepaintBoundary`-isolated, reduced-motion aware. *Meaning: the ambient flow.*
3. **`VoiceWave`** — a **live animated waveform** for the voice section. *Meaning: voice is motion.*

---

## 7. Interaction doctrine (meaning, not decoration)

Every control has a designed state for rest / press / active / disabled / loading / empty / error / success.
PHASE 0 demonstrates the doctrine on the Call Center screen with:

- **Live waveform** heading the voice section.
- **Mastery long-press** on the hero reveals the tier breakdown (progressive disclosure).
- **Empathy register toggle** — tap to cross-fade between فصيح ⇄ عراقي.

> Planned per-section (PHASE 1+): drag-and-drop voice-range drill (haptic tick on correct,
> deliberate silence on wrong), voice-card flip to its 5-minute drill, shared-element transitions.

---

## 8. Accessibility & RTL

- RTL Arabic is the default direction.
- WCAG **AA** minimum for text/icon contrast (deeper accents on light mode).
- `prefers-reduced-motion` respected throughout.
- Dynamic Type friendly (relative type ramp), Semantics labels on icon-only controls (rolling out).

---

## 9. What stays from the previous system (build on it, don't break it)

The architecture is excellent and is **preserved**: `AppPalette` ThemeExtension, the `Space`/`Radii`/`Motion`
token files, `LargeTitleScaffold`, `InsetGroup`/`AppListRow`, `SurfaceCard`, `GlassSurface`, `revealRoute`,
the Arabic numeral util. PHASE 0 **re-skins** these via tokens and **adds** the signature layer — it does
not rewrite the foundation.
