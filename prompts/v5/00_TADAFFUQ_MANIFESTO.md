# 00 — TADAFFUQ MANIFESTO (v5 constitution)

> *«تَدَفُّق هو ما يَجري بين السكون والحَرَكة. الواجهة لا تَفصِل بين العَمل والهُدوء؛ تَسري كنَهر بين الضَفَّتَين.»*

---

## §1 — The thesis (one paragraph)

Upgrade is a self-training platform. Training requires *focus*. The classic dashboard architecture (sidebar competing with content, header competing with task, modal competing with workbench) **steals focus by design** — it asks the eye to choose between chrome and content twenty times a minute. v5 inverts this. The chrome is **provisional**: it appears when summoned (a floating dock on hover, a slide-over panel on click, a bottom sheet on tap) and dissolves into negative space the rest of the time. The canvas is *the* surface. Everything else is a guest.

This is not minimalism for aesthetics. It is **cognitive economics**: every pixel of chrome is a tax on the user's working memory; every animation that doesn't carry meaning is a tax on attention. v5 collects neither.

---

## §2 — The four design oaths

Every line of v5 code answers to four oaths, in order:

1. **The Canvas Oath** — *the training workspace is sovereign.* No fixed chrome shall steal its room. Edge-to-edge always; sidebar never.

2. **The Flow Oath** — *motion serves meaning, never decoration.* Animations carry information (a state change, a spatial relationship, a feedback signal) or they don't ship.

3. **The Premium Oath** — *every surface must read as deliberate.* Soft multi-layered shadows, ultra-thin inner borders, generous whitespace, zero default browser styling. The platform looks like a tool a serious learner pays for, not a free template.

4. **The Honesty Oath** — *the interface tells the truth about state.* Progress is computed, not guessed. Empty states say "empty," not "loading forever." Errors are inline, not modal. Success is a quiet scale-up, not a confetti explosion.

A change that violates an oath is rejected at PR time, regardless of how clever it is.

---

## §3 — The three pillars of the visual identity

v5 has one voice. It is composed of three layers, in this exact order:

### 3.1 — The Deep Canvas
The base surface. **Deep Space** in dark mode (`hsl(225 30% 8%)` — a midnight that's almost-but-not-black, with a faint blue undertone that's calming on long sessions); **Premium Oatmeal** in light mode (`hsl(38 28% 96%)` — a warm linen, never stark white, sourced from Apple Park reading rooms and Stripe's marketing pages). The canvas never carries texture; texture lives only on raised surfaces.

### 3.2 — The Glass Surfaces
Cards, panels, dock, sheets — all sit on the canvas as **Glass 2.0** surfaces:
- A near-opaque base (90–98% opacity, *not* heavy `backdrop-filter: blur(15px)`)
- An ultra-thin inner border (`1px solid rgba(255,255,255,0.08)` dark / `rgba(0,0,0,0.06)` light)
- A soft multi-layered drop shadow (`0 1px 2px / 0.05`, `0 4px 6px -1px / 0.10`, `0 10px 15px -3px / 0.08`)
- A subtle 1px highlight on the top edge (the "lid" — half a pixel of bright, then it fades)

This composes a premium tactile feel without GPU-killing blurs. Mobile-friendly by design.

### 3.3 — The Motivational Accents
Two colors, used surgically:
- **Neon Cyan** `hsl(187 100% 50%)` (#00E5FF) — *progress*. Used only on filled progress, on completed states, on the focus ring of the active training cell. Never on text-body, never on chrome.
- **Electric Orange** `hsl(15 100% 60%)` (#FF6B35) — *action*. Used only on the primary CTA of the current screen, on the active dock dot, on the "next" affordance. Never on hover (hover is a brightness shift, not a colour change).

A screen with twenty accent dots is broken. A screen has **one** orange and **one** cyan, ideally — and they tell the user where to look and where they are.

---

## §4 — What is sacred

v5 is allowed to delete v4 layout code, rename CSS classes, restructure the JS module graph. Three things it may **not** touch:

1. **The 14+ public Upg.\* APIs**: `Upg.state`, `Upg.theme`, `Upg.nav`, `Upg.cmdk`, `Upg.haptic`, `Upg.format`, `Upg.icons`, `Upg.shards`, `Upg.elan.install`, `Upg.elan.callcenter`, `Upg.elan.fieldsales`, `Upg.elan.lab`, `Upg.elan.psych`, `Upg.elan.customercare`, `Upg.elan.programming`, `Upg.elan.accounting`, `Upg.elan.phonerepair`, `Upg.elan.hrmastery`, `Upg.mood`, `Upg.worlds.*`. New chrome consumes them; signature stays.
2. **The training content** of v4's 12 ε modules: the PROVE-IT citations, the Iraq Block ladder, the prose, the data tables. Re-skinned, never rewritten.
3. **The `archive/`** directory — historical reference; never touched.

Everything else — sidebar, topbar, drawer, footer, every CSS file under `platform/assets/css/chrome.css`, every world palette in `platform/assets/css/worlds/_*.css` — is **demolish-list eligible**.

---

## §5 — What v5 forbids absolutely

A line of code that does any of the following fails review:

1. **Heavy `backdrop-filter: blur(N)` where N ≥ 12px** — GPU-tax on mobile, banned. Use Glass 2.0 (translucent base + thin border + layered shadow).
2. **Any emoji in markup** (`☎ ✓ 🔥 📊 ⚙️ 💧 🛠 🌊 🍷 🟡` …). Replace with monochromatic SVG icon from the sprite. No exceptions, including legacy training content.
3. **A fixed sidebar** (`position: fixed; left: 0; width: 240px;`). The dock is the only chrome.
4. **A fixed top header bar that takes vertical space.** Floating elements, yes; baked-in chrome, no.
5. **A modal popup** (`position: fixed; inset: 0; z-index: 1000;`). All sub-detail uses a slide-over panel or a bottom sheet.
6. **A toast notification** (e.g. "Saved ✓"). Feedback is a spring-scale + colour shift on the originating element. No floaters.
7. **A linear `<progress>` bar.** Progress is an SVG ring, computed from real state.
8. **An animated counter from 0 → N.** If the value is N, render N. The counter cliché is dead.
9. **The "Welcome back, [name]!" greeting cliché.** v4's ε12 mood vector replaces it; v5 inherits that.
10. **`!important`** in any CSS that ships. Cascade architecture (the v4 `@layer` order) is the only override mechanism.
11. **`document.write`, `eval`, `new Function('…')` for runtime code.** No exceptions.
12. **A page navigation when a slide-over would do.** "Open in new page" is the cliché v5 most aggressively replaces.
13. **A `ms`-based `transition-duration`** outside the seven canonical motion tokens (see MOTION_DOCTRINE §3). One-off durations are forbidden.
14. **A hardcoded hex colour** (`#1A2035`) in markup or in non-token CSS. All colours flow through `--surface-*`, `--ink-*`, `--accent-*` tokens.
15. **A scrollbar styled with custom width or colour that breaks scroll-momentum** on iOS / mobile.
16. **A `<table>` for layout.** Bento grid is the layout primitive.
17. **Centered `max-width: 1280px` containers.** Edge-to-edge canvas. The dock provides the only horizontal anchoring.
18. **An icon larger than `--icon-2xl` (40px)** unless it's a hero illustration explicitly labelled `<svg class="hero-art">` and present at most once per surface.
19. **Mixing two icon families** in a single chrome region (Lucide + Phosphor in the same dock, etc.). Pick one per region; document which.
20. **A single tap target smaller than 44×44 CSS pixels** on a touch device. (Apple HIG / Material — accessibility floor.)

---

## §6 — Truth Over Claims

Every PR description claim must be verifiable by `grep` against the commit's tree. v4 invented this rule; v5 keeps it. Examples of *banned* claim styles:

- ✗ "Significantly improved performance" → ✓ "Lighthouse Performance 91 → 97 verified at commit `<sha>`"
- ✗ "Removed all emoji" → ✓ "`grep -cP '[\\x{1F300}-\\x{1FAFF}]' platform-v5/index.html` returns 0"
- ✗ "Smoother animations" → ✓ "Reduced animation-driven layout-shift from CLS 0.12 to 0.02 (Lighthouse trace, commit `<sha>`)"

A claim without a `verified by …` line is a claim that didn't ship.

---

## §7 — The pillar map

v5 is six pillars, ~22 stages. Each γ–η stage produces a **Pulse** (the v5 equivalent of v4's Beacon — see `PULSE_LIBRARY.md`).

| Pillar | Code | Name | Stages | Pulses |
|---|---|---|---|---|
| α | foundation | Tabula Rasa | 4 | 0 (foundation = no surprises) |
| β | language | Voice (Chroma + Typo) | 3 | 0 (vocabulary = no surprises) |
| γ | spatial | Dock & Canvas | 3 | 3 |
| δ | bento | Bento Live | 3 | 3 |
| ε | disclosure | Slide & Sheet | 3 | 3 |
| ζ | flow | Zen Mode | 3 | 3 |
| η | tactile | Kinesis | 3 | 3 |
| θ | gate | Polish | 2 | 0 (quality = no surprises) |

**Total: 24 stages, 15 pulses across 9 pulse categories.**

The α and β pillars set vocabulary. γ–η ship the experience and *must* generate at least one Pulse per stage (a creative surprise that breaks the AI-default — see `PULSE_LIBRARY.md`). θ verifies and seals.

---

## §8 — The exit criteria

v5 ships when *all* of the following are true and grep-verified at a single commit on `main`:

1. `grep -rcP '[\x{1F300}-\x{1FAFF}]' platform-v5/` returns `0` for every file.
2. `grep -rE 'position:\s*fixed.*?(left|right):\s*0;' platform-v5/assets/css/` returns no sidebar selector.
3. Lighthouse Mobile Performance ≥ 90, Accessibility ≥ 95, on `platform-v5/index.html` served via HTTP.
4. All 14+ Upg.\* APIs respond in `window.Upg` after `DOMContentLoaded`.
5. 15 pulses logged in `state/PULSE_LOG.md`, all 9 pulse categories used at least once.
6. 0 entries in the v5 forbidden-pattern audit (`scripts/v5_forbidden_audit.py`).
7. CHANGELOG entry `[v5.0.0] — TADAFFUQ` lists every shipped stage with its `verified by` line.

When this is true, the manifesto is fulfilled and v5 is sealed.

---

*The constitution is short on purpose. The doctrines below give the operating rules; the stage files give the executable plans.*

— *Tadaffuq sealed at INDEX.md.*
