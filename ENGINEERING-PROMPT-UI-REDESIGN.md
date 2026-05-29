# ENGINEERING PROMPT — UI/UX TOTAL REDESIGN

> A strict, self-contained execution brief for an autonomous AI coding agent.
> Target repository: `Xboxiq/Upgrade` — an Arabic (RTL) self-training platform.
> Mission: replace a generic, emoji-driven, "AI-looking" interface with a single,
> premium, editorial design system that makes a learner *want to keep training*.

---

## 0. HOW TO USE THIS DOCUMENT (read first)

You are a senior product designer + senior front-end engineer. You will execute
this brief end-to-end. This is not advisory — every **MUST** is a hard requirement
verified by the automated gates in §11. If a gate fails, the work is not done.

**Operating rules**

1. Work in small, verifiable commits. After each phase (§9), run the gates (§11).
2. Do **not** invent new content. Re-skin and re-arrange existing content only.
3. Do **not** break the public `Upg.*` JS APIs (see §10 — Sacred).
4. Preserve accessibility wins already present (0 images without `alt`, rich `aria`).
5. The platform is **RTL Arabic first**. Every spacing/layout decision uses
   logical properties (`margin-inline`, `inset-inline`, `padding-block`), never
   physical `left/right`.
6. When in doubt, choose **calm, confident, and quiet** over decorative.

**Stack reality (do not fight it):** static HTML + vanilla CSS (`@layer`) + vanilla
ESM JS. No framework, no bundler. There is a token system in
`platform/assets/css/tokens/`, a CSS cascade entry at `platform/assets/style.css`,
and a JS icon system (`upg-icons-1.js`, `data-icon="…"`).

---

## 1. THE DESIGN VISION (the single source of taste)

**Name:** *Atelier* — a quiet, premium study environment.

**One-sentence north star:**
> "A focused, editorial workspace that respects the learner's attention, shows
> momentum at every glance, and rewards progress with restraint — never noise."

**The three feelings the UI must produce, in priority order:**

1. **Focus** — the screen is calm; one primary action is always obvious; nothing
   competes with the content the learner is studying right now.
2. **Momentum** — progress is *always visible and alive* (rings, streaks, mastery
   tiers), so the learner feels pulled toward the next block.
3. **Craft** — every surface, icon, and transition feels intentional and premium,
   signalling "this was built by a serious team," which raises the learner's own
   standard.

**Anti-vision (explicitly forbidden looks):**

- ❌ The "AI-generic SaaS" look: flat white cards, 8px everything, a purple gradient
  hero, three stat boxes, rounded-2xl on a grey background.
- ❌ Emoji as iconography.
- ❌ Rainbow of accent colors competing for attention.
- ❌ Decorative motion that does not communicate state.
- ❌ Center-locked narrow column on huge screens with dead side gutters.

**Reference mental models (study these patterns, do NOT clone):** the calm focus of
Brilliant's lesson view, the momentum loops of Duolingo (rings/streaks done tastefully),
the editorial typographic confidence of Linear and Arc, the depth-through-layering of
Apple's dark surfaces. Translate the *principles* (focus, momentum, hierarchy, depth),
not the pixels.

---

## 2. NON-NEGOTIABLE CONSTRAINTS (hard gates)

These are verified in §11. Any non-zero violation = task incomplete.

| ID | Constraint | Verification |
|----|-----------|--------------|
| C1 | **Zero Unicode emoji** in all markup (`*.html`). Every former emoji is an SVG icon. | grep emoji ranges → 0 |
| C2 | **Zero hardcoded hex/hsl colors** in markup `style="…"`. Tokens only. | grep `style="[^"]*#` → 0 |
| C3 | **Zero physical-direction CSS** in new/edited rules (`left:`, `right:`, `margin-left`, `text-align:left`). Use logical props. | grep audit (new files) |
| C4 | **One accent family.** Exactly one `--accent` hue drives all primary action/progress. Per-domain variation is a single hue-rotation token, not a new palette. | review + token grep |
| C5 | **Every interactive element has an accessible name** and visible focus ring. | axe/manual pass |
| C6 | **Contrast ≥ 4.5:1** body text, ≥ 3:1 large text & UI, in both themes. | contrast audit |
| C7 | **No layout shift** on theme toggle or icon load (reserve space). | CLS check |
| C8 | **Reduced-motion honored**: all motion gated by `prefers-reduced-motion`. | grep + manual |
| C9 | The public `Upg.*` API signatures stay byte-identical (§10). | grep + smoke test |

---

## 3. COLOR SYSTEM (exact specification)

Replace the neutral-grey defaults in `platform/assets/css/tokens/_color.css` with the
**Atelier** system below. Keep all backward-compat aliases mapping to the new slots so
legacy CSS keeps working.

### 3.1 Philosophy
- **Dark-first.** Long study sessions favor a deep, low-chroma canvas (less eye
  fatigue, content "glows" off the surface). Light mode is a first-class equal, not
  an afterthought.
- **Never pure black, never pure white.** Canvas carries a faint cool tint; ink
  carries a faint warm tint. This reads as "premium," not "default."
- **Depth via elevation, not borders.** Surfaces step up with lightness + a soft,
  tinted, layered shadow + a 1px top "light catch." Hairline borders only where
  elevation is ambiguous.
- **One decisive accent** = momentum/action. A warm ember signals "do this / you are
  progressing" (dopamine-positive, energizing without alarming).

### 3.2 Dark theme (default) — author as `:root`
```
/* Canvas ladder — deep, cool-tinted, stepped by lightness */
--canvas:      hsl(224 28% 7%);    /* app background          */
--surface-1:   hsl(224 24% 10%);   /* page / large panels     */
--surface-2:   hsl(223 22% 13%);   /* cards                   */
--surface-3:   hsl(223 20% 17%);   /* raised / hover / popover */
--surface-edge: hsl(223 30% 24%);  /* hairline + top light-catch */

/* Ink ladder — warm-tinted off-white for readability */
--ink:         hsl(40 30% 96%);    /* primary text            */
--ink-muted:   hsl(35 12% 72%);    /* secondary               */
--ink-faint:   hsl(30 8% 52%);     /* tertiary / hints        */

/* Accent — the single momentum color (warm ember) */
--accent:      hsl(22 92% 58%);    /* primary action / progress */
--accent-press: hsl(22 86% 50%);
--accent-soft: color-mix(in oklch, var(--accent) 16%, transparent);
--accent-ink:  hsl(24 40% 8%);     /* text ON accent fills    */

/* Focus / cool counter-tone (links, info, secondary emphasis) */
--focus:       hsl(204 90% 60%);
--focus-soft:  color-mix(in oklch, var(--focus) 16%, transparent);

/* Semantic (restrained, consistent both themes) */
--state-success: hsl(150 56% 46%);
--state-warning: hsl(38 92% 56%);
--state-danger:  hsl(2 80% 60%);
--state-info:    var(--focus);

/* Tinted, layered shadows (never pure black) */
--shadow-sm: 0 1px 2px hsl(224 40% 3% / .40);
--shadow-md: 0 6px 18px hsl(224 40% 3% / .45);
--shadow-lg: 0 18px 44px hsl(224 40% 3% / .50);

/* Focus ring + radii */
--ring: 0 0 0 3px color-mix(in oklch, var(--accent) 45%, transparent);
--radius-xs: 6px; --radius-sm: 10px; --radius-md: 14px; --radius-lg: 20px; --radius-full: 999px;
```

### 3.3 Light theme — author under `[data-theme="light"]`
```
--canvas:    hsl(40 30% 97%);   /* warm paper, not white */
--surface-1: hsl(40 24% 99%);
--surface-2: hsl(0 0% 100%);
--surface-3: hsl(40 20% 96%);
--surface-edge: hsl(35 16% 86%);
--ink:       hsl(224 38% 12%);
--ink-muted: hsl(224 14% 36%);
--ink-faint: hsl(224 10% 54%);
--accent:    hsl(20 90% 50%);
--accent-ink: hsl(40 60% 98%);
--focus:     hsl(208 88% 46%);
--shadow-sm: 0 1px 2px hsl(224 30% 20% / .07);
--shadow-md: 0 6px 18px hsl(224 30% 20% / .10);
--shadow-lg: 0 18px 44px hsl(224 30% 20% / .13);
```

### 3.4 Per-domain orientation tint (replaces the 8 "worlds")
Do **not** keep 8 separate palettes. Instead define ONE mechanism: each domain sets a
single `--domain-hue` (a number). The accent and domain accents are derived:
```
[data-domain="accounting"]  { --domain-hue: 42;  }  /* gold     */
[data-domain="sales"]       { --domain-hue: 8;   }  /* iron-red */
[data-domain="social"]      { --domain-hue: 190; }  /* current  */
[data-domain="psych"]       { --domain-hue: 265; }  /* dew      */
[data-domain="programming"] { --domain-hue: 150; }  /* terminal */
[data-domain="repair"]      { --domain-hue: 28;  }  /* workshop */
[data-domain="hr"]          { --domain-hue: 330; }  /* salon    */
[data-domain="dashboard"]   { --domain-hue: 22;  }  /* ember    */
/* domain accent = hue-rotated, used ONLY for the page header rail,
   active nav indicator, and chart series — never for body chrome.   */
--domain-accent: hsl(var(--domain-hue) 80% 58%);
```
The global `--accent` (ember) remains the universal action color across all domains.
The domain tint is a *whisper* for orientation, not a re-theme.

---

## 4. TYPOGRAPHY (editorial, Arabic-first)

> NOTE: The font files are currently **missing** (only README per font folder). Before
> any type work, run `scripts/elan-β1-fonts.sh` to procure the woff2 files, OR remove
> the broken `<link rel="preload">` for fonts that are not committed. Type without
> fonts is wasted work.

**Roles (collapse the 8-world signature system into 3 voices):**

| Token | Role | Arabic candidate | Latin candidate |
|-------|------|------------------|-----------------|
| `--voice-display` | Headings, big numbers | Reem Kufi / Boutros Modern Kufi | Fraunces |
| `--voice-body` | Reading prose, lessons | Readex Pro / IBM Plex Arabic | Inter |
| `--voice-mono` | Code, figures, timers | (Latin) | JetBrains Mono |

**Rules**
- Display is confident and large: page H1 uses a fluid clamp,
  `font-size: clamp(2rem, 1.2rem + 3vw, 3.25rem)`, tight tracking, weight 700–800.
- Body line-height `1.75` for Arabic readability; measure capped at `68ch` for prose
  blocks (prose only — the *shell* is edge-to-edge, see §5).
- Numbers (scores, money, timers) always `--voice-mono` with tabular figures
  (`font-variant-numeric: tabular-nums`) so they never jitter.
- One scale, modular ratio ~1.25. Define `--step--1 … --step-6` and use them; no
  arbitrary px font-sizes in components.

---

## 5. LAYOUT & INFORMATION ARCHITECTURE

### 5.1 The shell
- **Edge-to-edge canvas.** No center-locked narrow column with dead gutters. Content
  uses a responsive grid that fills the viewport with intentional margins
  (`padding-inline: clamp(1rem, 5vw, 4rem)`).
- **Persistent rail (desktop ≥ 1024px):** a slim vertical rail pinned to the inline-start
  edge holding: brand mark, domain switcher (8 icons), search (⌘K), progress orb, theme
  toggle. Width ~72px collapsed, expands on hover/focus to ~248px with labels. Replaces
  the old `sidebar` + `topbar` combo.
- **Mobile (< 1024px):** a frosted bottom dock (safe-area aware) with 4–5 primary
  destinations + a center "continue" action. Replaces `dual-bottom-nav`.
- **Command palette (⌘K):** keep the existing `cmdk` behavior/JS; restyle as a
  slide-over from inline-start on desktop, bottom sheet on mobile.

### 5.2 The learner's home (the motivation engine)
This is the most important screen for "wanting to continue." It MUST contain, in order:
1. **Continue card (hero).** One large card: "أكمل من حيث توقفت" — shows the exact next
   block, the domain tint, a progress ring, and ONE primary button. This is the single
   most prominent element on the page.
2. **Momentum strip.** Streak (days), blocks mastered this week, and a 7-day activity
   bar. Alive but quiet.
3. **Domain grid (bento).** 8 domain cards, each a small bento tile: domain icon,
   title, mastery ring (mastered/total), and a one-line "next up." Hover = gentle lift +
   the domain tint blooms. NOT 8 identical white rectangles — vary tile size by progress
   or recency for an editorial bento rhythm.
4. **Mastery ladder.** Foundation → Practitioner → Expert tiers as a visual ladder with
   the learner's position marked.

### 5.3 The lesson / block page
- Sticky, slim **page header rail** carrying the domain tint, title, and a live mastery
  progress bar→ring.
- Content in a readable prose column (max `68ch`) centered within the edge-to-edge shell,
  with interactive widgets (calculators, quizzes, simulators) breaking out to full width.
- A persistent **"mark mastered"** affordance and a **"next block"** pager at the block
  foot — momentum never dead-ends.

### 5.4 Spacing & geometry
- 8px base spacing scale (`--space-1…--space-12`); already largely present — enforce it,
  remove magic numbers.
- Radii from §3.3. Cards `--radius-md`; pills/buttons `--radius-full` or `--radius-sm`;
  sheets `--radius-lg`.

---

## 6. ICONOGRAPHY — emoji → bespoke SVG (the big one)

### 6.1 Strategy
There are **~2,535 emoji** across `index.html` (1271) and `pages/*.html` (1264). All MUST
become SVG icons rendered through the existing `data-icon` system (`upg-icons-1.js` +
`Upg.icons`). Build a single, coherent icon set with a custom stroke language — this is a
primary lever for "not looking generic."

### 6.2 Icon visual language (define once, apply to every icon)
- 24×24 grid, 2px nominal stroke (scales with `currentColor` + `em` sizing).
- Rounded line caps + joins; geometric, optically balanced; consistent corner radius.
- `stroke: currentColor; fill: none;` by default. A two-tone variant may add
  `fill: var(--accent-soft)` for "active/earned" states.
- Ship as a single sprite `platform/assets/svg/icons.svg` (`<symbol>` per icon) AND/OR
  extend `upg-icons-1.js`. Each icon referenced via `<i class="qi" data-icon="name">`.
- Every icon that conveys meaning gets `role="img"` + `aria-label`; purely decorative
  icons get `aria-hidden="true"`.

### 6.3 Mandatory emoji → icon map (cover at least these; extend as needed)
| Emoji | Count | `data-icon` | Notes |
|-------|------:|-------------|-------|
| ✗ ❌ | 150 | `x` / `x-circle` | wrong answer / remove |
| ✅ ✓ | 61 | `check` / `check-circle` | correct / done |
| ⭐ ★ ☆ | 189 | `star` / `star-half` / `star-outline` | difficulty rating (use filled count, not glyphs) |
| ⚠ 🚨 | 86 | `alert-triangle` / `siren` | warning / critical |
| 📚 | 40 | `book-stack` | reading / lesson |
| ⚡ | 40 | `bolt` | quick / energy |
| 💰 | 32 | `coins` | money / tax |
| 🎯 | 32 | `target` | objective / goal |
| ⏱ | 30 | `timer` | time estimate |
| 💡 | 22 | `lightbulb` | tip / insight |
| 🛠 🔧 | 24 | `wrench` | repair / fix |
| 📊 📈 | 32 | `bar-chart` / `trend-up` | metrics |
| 🤝 | 17 | `handshake` | negotiation / deal |
| 🔥 | 17 | `flame` | streak (tasteful, not literal) |
| 📌 📋 | 32 | `pin` / `clipboard` | note / checklist |
| 📞 | 14 | `phone` | call center |
| 🛡 🔒 🚫 | 34 | `shield` / `lock` / `ban` | security / blocked |
| ⚖ | 12 | `scale` | balance / law |
| 🇶🇮 (flags) | 22 | `flag` or text label | replace flag emoji with neutral glyph or country code chip |
| 🔤 | 9 | `type` | language / text |

Rules for ratings: render star ratings as N filled `star` + (max−N) `star-outline`
icons inside a labeled `<span role="img" aria-label="صعوبة 3 من 5">`, never glyphs.

### 6.4 Migration method (deterministic, scriptable)
Write `scripts/emoji-to-icon.mjs` that:
1. Loads a JSON map (the table above, extended).
2. Walks `platform/index.html` + `platform/pages/*.html`.
3. Replaces each emoji occurrence with the icon markup, preserving surrounding
   `aria-label` semantics; if an emoji sat inside a button label, keep the text and add
   the icon as a leading `<i class="qi" data-icon … aria-hidden="true">`.
4. Emits a report of unmapped emoji (must reach 0 before sealing).
Because content lives in BOTH `index.html` and `pages/*.html` (see §8), run on both —
or resolve §8 first (preferred).

---

## 7. COMPONENTS — redesign specs (apply the system above)

For each, deliver: default, hover, focus-visible, active, disabled, loading, and
RTL-correct states. All use tokens; none use raw colors.

- **Button.** Primary = accent fill + `--accent-ink`, subtle press depth. Secondary =
  `surface-2` + `surface-edge` hairline. Ghost = text + accent on hover. Min target 44px.
- **Card / bento tile.** `surface-2`, 1px top light-catch (`box-shadow inset 0 1px 0
  var(--surface-edge)`), `--shadow-md`, hover lifts to `--shadow-lg` + 1px translate-block.
- **Progress ring (replace ALL linear bars).** SVG `<circle>` with
  `stroke-dasharray` driven by `--progress`; accent stroke on `surface-edge` track;
  center shows tabular-num %. Provide sizes sm/md/lg.
- **Mastery toggle.** Three states (not-started ○ / in-progress ◐ / mastered ●) as
  custom icons with accent fill on mastered + a one-shot "bloom" micro-animation.
- **Quiz option.** Resting, selected (focus ring + accent-soft), correct (success), wrong
  (danger + shake gated by reduced-motion). Keyboard operable; `aria-pressed`/radio
  semantics preserved.
- **Callout / TLDR.** Use the semantic tints from §3 via `*-soft` mixes — replace the
  hardcoded rgba callout tokens with `color-mix` over the accent/state colors.
- **Domain header rail.** Carries `--domain-accent`; title in `--voice-display`; live
  mastery ring; breadcrumb.
- **Empty / loading / error states.** Each gets a bespoke icon + one calm line of copy.
  No spinners-only; use skeletons on `surface-2`.

---

## 8. RESOLVE CONTENT DUPLICATION FIRST (blocking prerequisite)

The educational content currently lives **twice**: inline in `platform/index.html`
(~32.9k lines) and again as `platform/pages/*.html` shards (~31.6k lines), with shard
headers instructing "edit BOTH." Redesigning twice is unacceptable.

**Decision required before icon migration & component work. Choose ONE and document it:**
- **Option A (recommended): single source = `pages/*.html` shards.** Strip the inline
  page sections from `index.html`, mount shards dynamically via the existing
  `Upg.shards.loadShard`/`mountShard` (remove the "refuse if inline present" guard once
  inline is gone). Smaller initial HTML, true lazy-load per domain.
- **Option B: single source = inline.** Delete `pages/` and the shard system entirely.

Whichever is chosen, **all redesign edits happen in exactly one place afterward.** Gate:
no domain section may exist in two files.

---

## 9. EXECUTION PLAN (phased, each phase ends green on §11 gates)

- **Phase 0 — Foundations.** Procure fonts (or remove dead preloads). Resolve §8
  duplication. Add a minimal `package.json` with lint/format/HTML-validate scripts and a
  CI workflow so gates run automatically.
- **Phase 1 — Tokens.** Rewrite `_color.css`, type tokens, space/radii per §3–§4. Keep
  back-compat aliases. Verify nothing visually explodes (tokens only, no markup yet).
- **Phase 2 — Iconography.** Build the icon set + sprite, write `emoji-to-icon.mjs`, run
  it, reach **0 emoji**. Verify C1.
- **Phase 3 — Shell.** Rebuild rail + mobile dock + ⌘K slide-over. Edge-to-edge layout.
- **Phase 4 — Home (motivation engine).** Continue card, momentum strip, bento domain
  grid, mastery ladder (§5.2).
- **Phase 5 — Lesson page + components.** §5.3 + §7. Replace all linear bars with rings.
- **Phase 6 — Motion & polish.** §12. Final a11y + contrast + reduced-motion pass.
- **Phase 7 — Seal.** All gates green; write a short CHANGELOG entry; open PR.

Commit after every phase. Never combine phases in one commit.

---

## 10. SACRED — do not break

Preserve these public JS namespaces with byte-identical call signatures (re-skin the
DOM they produce, but keep the API): `Upg.state`, `Upg.theme`, `Upg.nav`, `Upg.cmdk`,
`Upg.haptic`, `Upg.format`, `Upg.icons`, `Upg.shards`, `Upg.mood`, `Upg.worlds.*`, and
the `Upg.elan.{callcenter,fieldsales,lab,psych,customercare,programming,accounting,
phonerepair,hrmastery}` modules. Do not touch `archive/`. Do not regress the existing
a11y wins (0 missing `alt`, skip-link, `color-scheme`, reduced-motion support).

---

## 11. AUTOMATED ACCEPTANCE GATES (the definition of done)

Provide `scripts/redesign-audit.mjs` (or shell) that asserts ALL of the following and
exits non-zero on any failure. Wire it into CI.

```
# C1 — zero emoji in markup
assert emoji_count('platform/**/*.html')                              == 0
# C2 — no hardcoded colors in inline styles
assert grep_count('platform/**/*.html', r'style="[^"]*(#|rgb|hsl)')   == 0
# C3 — no physical-direction props in CSS (audit edited files)
assert grep_count('platform/assets/css/**', r'(^|\s)(left|right):')   == 0   # use inset-inline
assert grep_count('platform/assets/css/**', r'margin-(left|right)|padding-(left|right)|text-align:\s*(left|right)') == 0
# C4 — single accent family (no per-world palette files)
assert glob('platform/assets/css/worlds/_*.css')                       == []  # if Option chosen to remove
assert grep_count('platform/assets/css/**', r'--accent\s*:') <= small  # one canonical definition + theme overrides
# C8 — every keyframe/transition is reduced-motion guarded somewhere
assert exists('@media (prefers-reduced-motion: reduce)')
# duplication (§8)
assert no_domain_section_appears_in_two_files()
# linear bars replaced by rings
assert grep_count('platform/**/*.html', r'progress-bar|progress-fill')== 0
# Lighthouse (run headless): Performance ≥ 85, Accessibility ≥ 95, Best-Practices ≥ 95
assert lighthouse.performance >= 85 and lighthouse.a11y >= 95
```
Plus a manual checklist: keyboard-only walkthrough of home + one lesson; VoiceOver/NVDA
reads ratings and progress correctly; theme toggle has no flash/CLS; ⌘K works.

---

## 12. MOTION SYSTEM (communicate, never decorate)

- **Tokens:** `--ease-out: cubic-bezier(.2,.8,.2,1); --ease-spring: cubic-bezier(.34,1.56,.64,1);`
  durations `--dur-1:120ms --dur-2:200ms --dur-3:320ms`.
- **The Bloom:** the single signature feedback — on "mastered" / "correct", the
  originating element emits a brief accent-soft radial bloom + scale 1→1.03→1. No toasts.
- **Page/route changes:** content cross-fades + 8px block-axis slide; respect View
  Transitions API where available, with a non-VT fallback.
- **Hover:** surfaces lift via shadow + 1px translate-block only. No color flashes.
- **Everything** wrapped so `@media (prefers-reduced-motion: reduce)` reduces transforms
  to opacity-only or none.

---

## 13. DELIVERABLES CHECKLIST

- [ ] Phase 0–7 committed separately, each green on §11.
- [ ] `_color.css` + type/space tokens rewritten (Atelier).
- [ ] Bespoke icon set + sprite; `emoji-to-icon.mjs`; **0 emoji**.
- [ ] New shell (rail + dock + ⌘K slide-over), edge-to-edge.
- [ ] Redesigned home (continue card, momentum strip, bento grid, ladder).
- [ ] Redesigned lesson page; all linear bars → SVG rings.
- [ ] Motion system + reduced-motion.
- [ ] §8 duplication resolved (single source of content).
- [ ] §14 interaction rework: admin shell removed; spatial shared-element transitions;
      gestures + keyboard parity; container-query adaptivity; state persistence; lazy mount.
- [ ] `package.json` + lint/format + CI running `redesign-audit`.
- [ ] CHANGELOG entry + PR with before/after screenshots (light + dark, desktop + mobile).

---

## 14. INTERACTION ARCHITECTURE — root-level rework of presentation, arrangement & fluidity

> This section is a HARD requirement, equal in weight to §1–§13. The current
> interface is an "admin dashboard" shell. It must be torn out at the root and
> replaced with a **living learning canvas** that feels interactive, smooth, and
> fluid. "Re-skinning the same boxes" fails this brief.

### 14.1 Current state (what you are demolishing — verified)
- `#app` → `#sidebar` (fixed vertical admin nav: logo + 16 `.nav-item[data-page]` with
  repeated `nav-badge` "جديد" spam + a **fake user card** "أحمد المدير / مشرف التدريب")
  + `#topbar` (`#topbar-title`, `#topbar-breadcrumb`, search btn, action buttons) +
  `#main` (holds **all 15 `.page` sections inline**) + `#dual-bottom-nav` (mobile).
- Navigation = toggling `.page.active` + `location.hash` (`#page-X`). All pages live in
  the DOM at once. Page switching is an **instant, jarring show/hide** — no continuity,
  no motion, no spatial logic.
- Mental model today = "control panel." Target mental model = "focused studio."

**Three things to delete outright:**
1. The **fake user/admin identity** (`user-card`, "أحمد المدير", "مشرف التدريب"). This is
   a *personal self-training* app — replace with the learner's own momentum identity
   (streak orb + name the learner sets, optional).
2. The **"جديد" badge spam** across nav. Replace with at most ONE meaningful signal per
   item (e.g. a small accent dot only when that domain has an unstarted "next block").
3. The **breadcrumb** + redundant topbar title. Context lives in the page header rail.

### 14.2 Presentation & arrangement principles (the new model)
- **Spatial, not modal.** Domains are *places*. Moving between a domain tile and its
  page is a **continuous spatial transition** (the tile morphs/expands into the page
  header), so the learner always knows where they are and where they came from.
- **One canvas, contextual chrome.** Replace fixed sidebar+topbar with: (a) the slim
  **rail** from §5.1 (collapsed by default, expands on intent), and (b) a **contextual
  header** that belongs to the current page (carries domain tint, title, live mastery
  ring). No global topbar competing for space.
- **Progressive disclosure.** Show the next action and the current block; tuck
  everything else behind intent (hover, focus, command palette, "more"). The resting
  screen is quiet.
- **Density is adaptive, not fixed.** Provide a `data-density="comfortable|compact"`
  switch (persisted) that the whole system respects via spacing tokens.

### 14.3 Smoothness — the motion contract (build on §12)
Every navigation and state change MUST be animated with intent (and reduced-motion safe):
- **View Transitions API** for all page changes, with **shared-element morphing**:
  `view-transition-name` on the domain tile ↔ the destination page header, and on the
  domain icon ↔ the page icon. Provide a JS fallback (FLIP or cross-fade) where VT is
  unsupported. Easing = `--ease-spring` for entrances, `--ease-out` for exits.
- **Scroll-driven animation** (CSS `animation-timeline: view()/scroll()`): block reveals,
  the page-header rail shrinking into a sticky pill, and the progress ring filling as the
  learner scrolls a block — no JS scroll listeners for these.
- **Sticky, shrinking page header**: full on entry, condenses to a slim sticky pill
  (title + mini ring + back affordance) as the learner reads.
- **Optimistic + skeleton states**: mastering a block updates the ring instantly
  (optimistic); lazy-mounted shards show `surface-2` skeletons, never a bare spinner.
- **Momentum & overscroll**: `overscroll-behavior: contain` on scroll containers; smooth
  programmatic scrolls use `scroll-behavior: smooth` (gated by reduced-motion).

### 14.4 Interactivity & fluidity — direct manipulation
- **Gestures (touch):**
  - Horizontal **swipe between sibling blocks** within a domain (next/prev block), with a
    rubber-band edge and a peek of the neighbor.
  - **Edge-swipe** from inline-start opens the rail; swipe-down dismisses sheets.
  - **Drag handle** on bottom sheets / slide-overs (drag to dismiss, with velocity).
  - Long-press on a block = quick actions (mark mastered / bookmark / share) in a radial
    or sheet menu.
- **Pointer (desktop):**
  - Hover **intent** (small delay) expands the rail and previews tooltips — no flicker.
  - Keyboard parity for EVERY gesture (arrow keys move between blocks; `j/k` optional;
    `⌘K` palette; `g d` go dashboard, etc.). Document shortcuts in the existing cheatsheet.
  - Drag-to-reorder the learner's "path"/bookmarks where ordering is user-owned.
- **Live, responsive feedback:** buttons depress, rings animate, "The Bloom" fires on
  mastery, haptics (`Upg.haptic`) on supported devices for key confirmations.

### 14.5 Flexibility — adaptive, resilient layout
- **Container queries first.** Components adapt to *their slot*, not just the viewport
  (`@container`). A bento tile, a calculator, and a quiz must each lay out correctly at
  any width without breakpoints hardcoded to the page.
- **Fluid type & space** via `clamp()` (already in §4) — no fixed px in layout.
- **Resizable reading width** for prose (a control that sets `--measure` within a sane
  range; persisted).
- **State persistence:** remember per-page **scroll position**, last-open domain, density,
  theme, reading width, rail collapsed/expanded — restore on return (use `Upg.state`).
- **Resilience:** works at 320px → ultrawide; works keyboard-only; works with JS-lazy
  shards or full inline; never traps focus; never dead-ends (always a "next").

### 14.6 Lazy mounting (fluidity + performance tie-in)
Switch from "all 15 pages in the DOM" to **mount-on-navigate** via the existing
`Upg.shards.mountShard` (depends on §8 being resolved to a single content source). The
outgoing page animates out, the incoming shard mounts + animates in. This makes
transitions smooth AND cuts initial DOM/CSS weight dramatically.

### 14.7 Acceptance criteria for §14 (add to the §11 gates)
```
# no admin-shell remnants
assert grep_count('platform/**/*.html', r'topbar-breadcrumb|user-card|أحمد المدير') == 0
assert grep_count('platform/**/*.html', r'nav-badge[^"]*">\s*جديد')                 == 0
# motion present and guarded
assert grep_count('platform/assets/css/**', r'view-transition-name')                 > 0
assert grep_count('platform/assets/**',     r'animation-timeline|scroll-timeline')   > 0
assert exists('@media (prefers-reduced-motion: reduce)')   # wraps the new motion
# adaptivity
assert grep_count('platform/assets/css/**', r'@container')                           > 0
# manual: swipe between blocks (mobile), shared-element morph on domain→page,
#         keyboard parity for every gesture, scroll position restored on return,
#         density + reading-width toggles persist, 320px → ultrawide all pass.
```

### 14.8 What "good" feels like (the bar to hit)
Opening a domain should feel like its tile *grew* into the page. Reading a block should
feel like the interface quietly gets out of the way. Mastering a block should feel
rewarding (the bloom + ring). Moving to the next block should be one gesture or one key.
Nothing should ever pop, jump, or reload. If a transition feels like a "page swap," it is
wrong — redo it as a continuous motion.

---

### APPENDIX A — quick file map for the agent
- Cascade entry: `platform/assets/style.css` (`@layer reset,tokens,base,utilities,components,themes,overrides`)
- Tokens: `platform/assets/css/tokens/_color.css`, `_type.css`, `_space.css`, `_layout.css`, `_signature.css`
- Worlds (to collapse): `platform/assets/css/worlds/_*.css`
- Page CSS (892KB — split per domain): `platform/assets/css/pages.css`
- Chrome CSS: `platform/assets/css/chrome.css`
- Shell to demolish: `#app` › `#sidebar` (+ `user-card`, "أحمد المدير"), `#topbar`
  (`#topbar-breadcrumb`), `#dual-bottom-nav`; nav = `.nav-item[data-page]` + `.page.active` + `#hash`
- JS entry (119 ESM imports): `platform/assets/app.js`
- Icons: `platform/assets/js/upg-icons-1.js` (+ build `platform/assets/svg/icons.svg`)
- Content: `platform/index.html` (inline) + `platform/pages/*.html` (shards) — DEDUPE
- Service worker (precache list): `platform/sw.js`
- Font procurement: `scripts/elan-β1-fonts.sh`

> Execute with discipline. Calm, confident, quiet. Make the learner want the next block.
