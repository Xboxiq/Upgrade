# PULSE LIBRARY — Creative Surprises Catalogue

> *«النَبضة كَلِمة من المنصَّة لا تَقول إلا مَرَّة. لا تُكَرَّر، لا تُمَلّ.»*

A **Pulse** is the v5 equivalent of v4's *Beacon*: a single creative surprise per stage in the γ–η pillars that breaks the AI-default pattern. Every γ/δ/ε/ζ/η stage *must* produce at least one Pulse. The α, β, θ pillars produce zero Pulses by spec (foundation/vocabulary/quality — not the place for surprises).

---

## §1 — The nine Pulse categories

| # | Category | Glyph (semantic) | The kind of surprise |
|---|---|---|---|
| 1 | **MORPH_PULSE** | `icon-shape-shift` | a layout that physically transforms (bento card expanding in place, panel becoming a sheet, dock collapsing into a single dot) |
| 2 | **DOCK_PULSE** | `icon-anchor` | a spatial-navigation surprise (the dock that reveals on proximity, the dot that follows the user's gaze across screens) |
| 3 | **VEIL_PULSE** | `icon-moon` | a focus-mode surprise (the canvas dims around the active task; the chrome dissolves on training-start; the "do-not-disturb" gradient creeps in) |
| 4 | **SPRING_PULSE** | `icon-zap` | a kinetic-feedback surprise (the button that compresses 2px deeper than expected; the card that "settles" on drop with a sub-bounce; the haptic-coupled scale) |
| 5 | **GLOW_PULSE** | `icon-sparkles` | a chromatic surprise (an accent that breathes only while a real action is pending; the cyan that traces the active progress ring's path; the orange that fades up only on the *next* CTA) |
| 6 | **RING_PULSE** | `icon-circle-progress` | a progress-visualisation surprise (a multi-segment ring representing different completion dimensions; a ring that stutters if data is stale; a ring whose stroke thickens with proximity to 100%) |
| 7 | **GLASS_PULSE** | `icon-layers-2` | a surface-translucency surprise (the dock that picks up the canvas hue underneath; the panel whose border catches a 1px highlight only on the leading edge; the sheet that gains a hairline when content scrolls behind it) |
| 8 | **HAPTIC_PULSE** | `icon-vibrate` | a tactile surprise (a vibration pattern that mirrors a melodic pattern from the content; haptic that confirms a drag-drop only on *valid* targets; silence on invalid drops) |
| 9 | **REVEAL_PULSE** | `icon-aperture` | a progressive-disclosure surprise (a card whose nested content unfolds in reading order; a panel that reveals its actions only after the user has spent ≥3s reading; a sheet whose "details" section appears only when its summary scrolls fully into view) |

A stage may use **the same** category as a prior stage *if* the surprise is genuinely different in kind (compare v4's ε11 META vs ε12 META — same category, different temporal axis). A stage **may not** use the same category three times in a row across the project (pivot rule).

---

## §2 — The Pulse declaration

Every shipped Pulse is logged in `state/PULSE_LOG.md` with this exact template:

```
## <pillar><stage> — <YYYY-MM-DD>
**Pulse Category:** <CATEGORY_NAME>
**The Surprise:** <one paragraph in Arabic, third person, prose not bullet-points — what does the platform do that's actually surprising?>
**Reference Avoided:** <which AI-default cliché this rejects, with name>
**Inspired-by:** <Wild Card #N from the inspiration deck below, OR a verifiable real-world artefact (book, film, building, instrument, ritual)>
**User-Visible:** <yes / subtle / hidden — and why it matters anyway>
**Originality Self-Score:** <1-5> — <one-line justification>
**Files touched:** <comma-separated path list>
**Verified at commit:** <sha>
```

The same tense, same sections, same structure as v4's `CREATIVITY_LOG.md` entries — but a strict Arabic prose voice (no bullet-list shortcuts).

---

## §3 — The Forbidden Library v5

Patterns that automatically disqualify a Pulse — they are AI-defaults to be rejected, not embraced:

| # | Pattern | Why it's forbidden |
|---|---|---|
| 1 | **The "Welcome back, [Name]!" greeting** | The cliché the world is drowning in. v4 already replaced it; v5 inherits |
| 2 | **The XP / Streak / Levels gamification chrome** | Skinner-box motivation; the platform respects adult learners |
| 3 | **A confetti burst on completion** | Toy-app aesthetic; The Bloom replaces it |
| 4 | **An animated counter from 0 → N** | Render the value; counters are Lazy |
| 5 | **A modal popup for confirmation** | Slide-over or inline confirm; modals are forbidden by manifesto |
| 6 | **A toast notification ("Saved ✓")** | Spring-scale on the originating element instead |
| 7 | **A "Did you know?" ribbon** | Patronising; insights belong in the relevant context |
| 8 | **An emoji as a feedback signal** (🎉 ✓ ❌) | Manifesto §5.2 |
| 9 | **A heavy `backdrop-filter: blur(15px)` everywhere** | GPU-killer; Glass 2.0 instead |
| 10 | **A hover that produces a hue change** | Hover is brightness, not chroma |
| 11 | **A linear `<progress>` bar** | Progress is a ring |
| 12 | **A spinner "Loading…"** | Skeleton shimmer |
| 13 | **An auto-suggesting search modal that grabs focus on Esc** | Esc closes; never opens |
| 14 | **"Pro tip" / "Hint" / "Coach" floating helper** | Inline contextual help only |
| 15 | **An unsolicited tutorial overlay** ("Welcome! Let me show you around") | The interface teaches itself |
| 16 | **Avatar + display-name in the dock** | The dock is for navigation, not vanity |
| 17 | **A "share to social" button on training pages** | Training is private; sharing is opt-in via cmdk |
| 18 | **A theme toggle that animates the entire screen** | Theme is instant; opt-in fade only on canvas |
| 19 | **Micro-interactions that play a sound by default** | Audio is opt-in, surfaced via cmdk |
| 20 | **A "rate this lesson" 5-star widget** | Consumer-app pattern; out of register |
| 21 | **An infinite-scroll feed for training content** | Training has an end; pagination is a feature |
| 22 | **A "promote your account" upsell embedded in chrome** | The platform isn't selling itself to the user mid-session |
| 23 | **A bottom sheet that opens automatically on page load** | All overlays are user-summoned |
| 24 | **A floating action button (Material FAB)** | The dock contains all actions; FABs add chrome noise |
| 25 | **A skeleton that shows during a synchronous render** | Skeleton is for genuine async; using it for perceived-perf is dishonest |

A Pulse that resembles any of these (`grep` against the markup or the Pulse description) automatically fails review.

---

## §4 — Wild Card inspiration deck

When the originality self-score is low and a Pulse needs unblocking, draw from this deck. Each card is a real-world artefact / discipline; the Pulse must cite *which* card inspired it (no "vibe" allowed).

1. **Iznik tiles, Topkapi Palace** — radial geometry that resolves only at the seventh repetition.
2. **The negative space of a Hokusai wave** — the work is what the brush *didn't* paint.
3. **Le Corbusier's Modulor** — proportional system tied to the human body.
4. **A muezzin call across rooftops** — the same melody, different qibla, all converging at one moment.
5. **Persian carpet asymmetry** — the deliberate flaw that proves no human is perfect.
6. **Müller-Brockmann grid** — the system that shows itself.
7. **A souk's cooling architecture** — heat dissipates through stone passages, not air-conditioning.
8. **Bauhaus stage choreography (Schlemmer)** — bodies as geometric primitives in motion.
9. **The Aleppo soap-aging cellar** — the artefact improves while doing nothing.
10. **A blackboard left mid-equation by Riemann** — what's *not* erased is the proof.
11. **Mid-century Beirut salons** — the host who reads the guest without asking.
12. **The deliberate misalignment in a Naqsh-e Jahan tile** — humility as architecture.
13. **A tar player tuning before the audience arrives** — the readying *is* the performance.
14. **The shadow-line of a Hagia Sophia archway at noon** — light as a structural element.
15. **The folded-letter lock of an Andalusian zellige door** — the closed object hints at the open one.
16. **A pearl-diver's breath rhythm** — performance by silent counting.
17. **A Nizari fortress's trick stairs** — the path that subtly slows intruders.
18. **Coffee-cup divination** — meaning emerges from random structure (a Pulse never relies on this for actual UX, but the *aesthetic* of meaningful-noise is borrowable).
19. **Iraqi mid-century salons** — the host adjusts the room silently.
20. **The Damascus knife-pattern** — many folds, one edge.
21. **A water clock from al-Jazari's manuscripts** — mechanism that performs its own purpose visibly.
22. **A Sana'a window's wooden lattice** — privacy without darkness.
23. **An Isfahan miniature's perspective** — multiple times in one painting.
24. **A Quranic reciter's tarteel pacing** — the slowness that opens meaning.
25. **A stone-carver's chisel chips left around a finished sculpture** — the process is the proof.

A Pulse cites the card by number. "Inspired-by: Wild Card #11 (Mid-century Beirut salons)" is a valid line. "Inspired-by: vibes" is not.

---

## §5 — The pivot rule (anti-monotony)

Across the v5 project, no Pulse Category may appear three times in a row. After two consecutive Pulses in the same category (e.g., two MORPH_PULSEs in δ1 and δ2), the next stage **must** pivot to a different category — even if the natural Pulse would have stayed in the same family.

The protocol:
1. If `last_two_pulses == (X, X)`, the current stage's Pulse `category != X`.
2. If `last_three_pulses == (X, Y, X)`, the current stage's Pulse should pivot away from both X and Y if any natural alternative exists.
3. The CREATIVITY_HEALTH score (§6) penalises violations.

---

## §6 — Creativity Health metric

`state/PROGRESS.json → tadaffuq_v5.creativity_health` is computed as:

```
base                = 100
penalty_pivot       = 15 × (number of pivot-rule violations)
penalty_forbidden   = 25 × (number of Forbidden-Library matches in shipped code)
penalty_low_score   = 5  × (number of Pulses with self-score < 3)
bonus_unique_cats   = 5  × (count of distinct categories used so far)
creativity_health   = max(0, min(100, base - penalty_pivot - penalty_forbidden - penalty_low_score + bonus_unique_cats))
```

**Threshold gates:**
- `creativity_health < 60` → AUTO_PILOT halts; declares Creativity Crisis. Human review required before continuing.
- `creativity_health < 75` → next Pulse must self-score ≥ 4 (no fillers).
- `creativity_health ≥ 90` → bonus disruption (a Wild Card draw is mandatory) every third stage to keep edge.

This is the same auto-regulation v4 used. It works.
