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

## 1. Art direction — "Midnight Indigo"

A **deep midnight blue** space with a **deep blue-violet** as its second voice.
Your progress is a calm **azure-indigo current**; actions glow a restrained
**blue-violet**. Accents are *seasoning, not paint* — neutral ink carries most
of the UI. The signature is not the hue but the **material**: surfaces are real
matte panels (a tonal step + fine grain), with **no glowing/lighter-coloured
rims, no halos, no drop shadows** — those are the true AI-slop tells, and they
are banned. The result feels crafted, calm, and expensive.

### Why this over the alternatives (decision log)

| Option | Summary | Verdict |
|---|---|---|
| **A — Midnight Indigo** *(chosen)* | Deep midnight blue + deep blue-violet, used sparingly; realistic matte surfaces (tonal + grain), zero glow/rim/shadow. | **Recommended.** The owner's chosen hue family, executed with material craft instead of effects. |
| B — Tidal Aurora (teal/gold) | Warm charcoal + aqua-teal + gold. | Superseded: the green/teal wasn't comfortable for the owner. |
| C — Cosmic Flow (indigo/violet/fuchsia) | Earlier navy + azure→violet→fuchsia with glowing rims. | Superseded: the glowing/lighter rims + soft shadows read as AI. |

---

## 2. Colour — restrained two-pole, material depth

Two accent poles, used sparingly; everything else is neutral ink + tonal surface.

- **FLOW — azure-indigo** → progress, mastery, active, identity.
- **SPARK — blue-violet** → calls-to-action, energy.

**Depth is material, never effect:** a tonal step from the canvas + a whisper of
matte **grain**. The only edge ever drawn is a **dark seam** (a real groove),
never a lighter, glowing rim. No halos, no drop shadows, no glow around text or icons.

### Dark mode (primary — "midnight indigo")
| Token | Hex | Role |
|---|---|---|
| `canvas` | `#0B0E1A` | deep midnight blue |
| `canvasSink` | `#06080E` | vignette / deeper well |
| `surface1` / `surface2` | `#141826` / `#1E2335` | matte panels (tonal step) |
| `ink` / `inkMuted` / `inkFaint` | `#E8EBF4` / `#969CB2` / `#5C627A` | text ramp |
| `seam` | `#000` @ 0.40 | dark groove edge (never a lighter rim) |
| `brand` / `brandDeep` | `#6E8BFF` / `#4F6BE8` | azure-indigo flow / active |
| `tideGradient` | `#86A2FF → #6E8BFF → #5774EE` | progress fill (near-mono azure) |
| `spark` / `sparkDeep` | `#9B8CFF` / `#7B6BF0` | blue-violet action |
| `success` / `warning` | `#34C98A` / `#EBB54A` | semantics (sparse, never identity) |

### Light mode (cool daylight)
| Token | Hex | Role |
|---|---|---|
| `canvas` / `surface1` | `#EEF0F6` / `#FFFFFF` | panels |
| `ink` / `inkMuted` / `inkFaint` | `#14161F` / `#585E72` / `#9197A8` | text ramp |
| `brand` / `brandDeep` | `#4257C8` / `#33429E` | deep indigo (AA) |
| `tideGradient` | `#5B72E6 → #4257C8 → #3A4FB8` | progress fill |
| `spark` / `sparkDeep` | `#6D4FD8` / `#563CB0` | violet action (AA) |

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
