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

## 1. Art direction — "Cosmic Flow"

A **deep-space navy** environment in which your progress is a luminous
**azure→indigo→violet current** — an aurora that streams through the dark, the
literal embodiment of تَدَفُّق (*flow*). Actions are a **fuchsia nebula** spark:
the one burst of warm energy against the cool deep. The result is focused,
premium, nocturnal-by-default, and unmistakably *this* product — not a generic
Material or iOS template. Grounded in the **ui-ux-pro-max** skill's cosmic
palettes (*night-indigo + dream-violet*, *space-tech navy*) and its OLED dark-mode style.

### Why this over the alternatives (decision log)

| Option | Summary | Verdict |
|---|---|---|
| **A — Cosmic Flow** *(chosen)* | Deep-space navy + azure/indigo/violet flow current + fuchsia nebula action; liquid-fill rings; floating dock; bento; live waveform. | **Recommended.** Deep-blue space identity requested by the owner; skill-grounded; a soul tied to the name (*flow through space*). |
| B — Aurora Tide (cyan/orange) | The earlier proposal: cyan tide + electric orange. | Superseded: owner asked for deep-blue/space colours instead of cyan/orange. |
| C — Refined iOS (status quo) | Keep graphite/violet/gold and merely polish. | Rejected: not a leap; ignores the documented identity. |

---

## 2. Colour — a two-pole semantic system

Colour is never decorative. There are exactly **two accent poles**, each with one job:

- **FLOW — azure→indigo→violet current** → progress, mastery, active state, identity, "you / your data". This is the streaming *flow*.
- **SPARK — fuchsia nebula** → primary calls-to-action, "do this now", energy.

Everything else is neutral ink over deep space, plus reserved semantics (success / warning / error)
chosen so they never collide with the accent hues. Two poles, used with discipline, read instantly:
the blue current = where you stand, the nebula = what to do next.

### Dark mode (primary — "deep space navy")
| Token | Hex | Role |
|---|---|---|
| `canvas` | `#0A0E1F` | deep-space navy background |
| `canvasSink` | `#05070F` | focus veil / deeper well |
| `surface1` | `#121830` | indigo-tinted panel |
| `surface2` | `#1B2240` | raised panel |
| `ink` / `inkMuted` / `inkFaint` | `#EAEEFC` / `#9AA6C8` / `#5C6690` | text ramp |
| `brand` / `brandDeep` | `#6C8DFF` / `#4A6BF0` | azure-indigo identity / active |
| `tideGradient` | `#74B6FF → #6C8DFF → #9A7CFF` | the flow current (azure→blue→violet) |
| `spark` / `sparkDeep` | `#EC4DBE` / `#D2329F` | fuchsia nebula action / CTA |
| `success` / `warning` | `#2FD8A4` / `#FBB845` | semantics (distinct from accents) |

### Light mode (cool "starlight" daylight)
| Token | Hex | Role |
|---|---|---|
| `canvas` | `#F3F5FC` | cool ice-white background |
| `surface1` | `#FFFFFF` | panel |
| `ink` / `inkMuted` / `inkFaint` | `#141828` / `#565E78` / `#9298B0` | text ramp |
| `brand` / `brandDeep` | `#3D5DE0` / `#2A45C8` | deep azure-indigo (AA on light) |
| `tideGradient` | `#4F86F7 → #5B6EF0 → #7C5CE8` | flow current |
| `spark` / `sparkDeep` | `#C42E9E` / `#A81F86` | deep fuchsia action (AA on light) |

> **Contrast rule:** large fills (ring interiors, bars) may use the bright
> aurora colours; any accent used as *text or icons* uses the deeper light-mode
> values to hold **WCAG AA**.

---

## 3. Typography

- **Cairo** — the workhorse for Arabic + Latin (clean, SF-adjacent, RTL-native).
- **JetBrains Mono** — reserved exclusively for measured values (KPIs, targets, percentages).
- Personality comes from **weight + tight tracking on large titles**, not a zoo of fonts.
- Numerals render **Arabic-Indic** (٠١٢٣) to stay native to the reading experience.
- iOS type ramp preserved (Large Title 34 → Caption 12).

---

## 4. Shape, depth & layout language

- **Soft squircle** radii (continuous-feel), grouped insets, generous negative space.
- **Depth = rim light, not drop shadow.** A deliberate break from the iOS soft-shadow
  cliché: every panel's edge is a hairline that catches light along the top and fades to a
  dark contact line at the bottom (`Depth.rim`), over tonally-lit surfaces. It reads like
  glass lit from above in deep space — crisp, distinctive, and unmistakably *not* Cupertino.
- **Bento** composition for dashboards/heroes: tiles of deliberate, varied weight — never a uniform grid.
- **Floating dock** instead of an edge-to-edge tab bar: a centred, glass, pill-shaped
  navigator hovering above the canvas with margin on all sides. The dock *floats on the tide.*
- **Zen / Focus mode**: the world recedes by subtraction (blur + dim), leaving only the
  breathing tide ring and one objective.

---

## 5. Motion language — "The Tide"

- **Physical springs** (iOS feel), 60fps target, single controlled overshoot on press release.
- **Progress fills like liquid** — the signature `TideRing` raises a wave level, it never just sweeps a stroke.
- **Aurora filaments drift** — thin flowing ribbons cross the deep-space canvas as a slow,
  ambient current (the literal "flow"), with a faint twinkling starfield and **scroll parallax**.
  No coloured glow behind text — depth is built from craft, not soft orbs.
- **Haptics on every meaningful press** (light impact), wired through `PressScale`.
- **`prefers-reduced-motion` is honoured**: aurora freezes to a static gradient, count-ups
  resolve instantly, breathing stops. Comprehension never depends on motion.

---

## 6. Signature visuals (CustomPainter — the soul)

1. **`TideRing`** — a circular vessel whose interior fills with a luminous **azure→violet wave**
   proportional to mastery. The wave crests, has surface highlight, and animates on change.
   *Meaning: your mastery is a rising current of flow.* Used for hero, featured, focus mode.
2. **`AuroraBackground`** — a deep-space gradient base + a fine twinkling **starfield** + three
   thin **aurora filaments** (flowing ribbons that fade at their ends), with multi-layer
   **scroll parallax**. Deliberately *not* the generic soft-orb glow — and it leaves no coloured
   halo behind text. `RepaintBoundary`-isolated, reduced-motion aware. *Meaning: the current of flow through the void.*
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
