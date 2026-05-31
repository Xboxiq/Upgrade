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

## 1. Art direction — "Tidal Aurora"

A **warm deep-charcoal space** in which your progress is a luminous **aqua→teal
current** — an aurora streaming through the dark, the literal embodiment of
تَدَفُّق (*flow*). Actions are a warm **amber-gold spark**: golden starlight, the
energy that pulls you to act. The result is premium, warm, and unmistakably
*this* product. Crucially it **avoids the purple→blue gradient** the design
skills flag as the #1 AI-slop tell — teal + gold is a classic, harmonious
pairing that stays rich (never cold/pale) with repeated use.

### Why this over the alternatives (decision log)

| Option | Summary | Verdict |
|---|---|---|
| **A — Tidal Aurora** *(chosen)* | Warm charcoal space + aqua/teal flow + amber-gold spark; grain + vignette texture; liquid planets; orrery home. | **Recommended.** Warm, premium, cohesive; explicitly *not* AI-purple; teal+gold ages well. |
| B — Cosmic Flow (indigo/violet/fuchsia) | The previous deep-navy + azure→indigo→violet + fuchsia. | Superseded: this is the literal purple→blue AI tell; read cold/pale/templated over time. |
| C — Aurora Tide (cyan/orange) | The first proposal: neon cyan + electric orange. | Superseded earlier. |

---

## 2. Colour — a two-pole semantic system

Colour is never decorative. There are exactly **two accent poles**, each with one job:

- **FLOW — aqua→teal current** → progress, mastery, active state, identity, "you / your data". Cool, alive.
- **SPARK — amber-gold** → primary calls-to-action, "do this now", energy. Warm, premium.

Everything else is neutral ink over warm-charcoal space, plus reserved semantics (success / warning / error)
kept clear of both poles. Read instantly: the teal current = where you stand, the gold = what to do next.
Gold fills always carry **dark ink** (`onSpark`); bright teal fills carry `onTide`.

### Dark mode (primary — "warm deep space")
| Token | Hex | Role |
|---|---|---|
| `canvas` | `#0D1112` | warm charcoal-black (not navy) |
| `canvasSink` | `#070A0A` | focus veil / vignette |
| `surface1` / `surface2` | `#171B1C` / `#202627` | panels |
| `ink` / `inkMuted` / `inkFaint` | `#ECEFEA` / `#99A39D` / `#5E6863` | warm text ramp |
| `brand` / `brandDeep` | `#2DD4BF` / `#0D9488` | teal identity / active |
| `tideGradient` | `#5EEAD4 → #2DD4BF → #14B8A6` | the flow current (aqua→teal) |
| `spark` / `sparkDeep` | `#FBBF24` / `#F59E0B` | amber-gold action / CTA |
| `success` / `warning` | `#34D399` / `#FB923C` | semantics |

### Light mode (warm parchment daylight)
| Token | Hex | Role |
|---|---|---|
| `canvas` | `#F6F4EF` | warm paper (not cold ice) |
| `surface1` | `#FFFFFF` | panel |
| `ink` / `inkMuted` / `inkFaint` | `#191C1A` / `#5C615C` / `#979B95` | text ramp |
| `brand` / `brandDeep` | `#0D9488` / `#0F766E` | deep teal (AA on warm light) |
| `tideGradient` | `#14B8A6 → #0D9488 → #0F766E` | flow current |
| `spark` / `sparkDeep` | `#B7791F` / `#946115` | deep amber action (AA on light) |

> **Texture:** the background carries a static fine **grain** + a soft **vignette**
> so it never reads as a flat digital gradient. **Contrast:** accents used as text/icons
> use the deeper light-mode values to hold **WCAG AA**.

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
