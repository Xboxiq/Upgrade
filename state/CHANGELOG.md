# Upgrade Platform — CHANGELOG

## v17-scaffold — Pack v2 RESONANCE (Prompt System) — 2026-05-19

### Added — Pack v2 RESONANCE prompt system
- New folder `prompts/v2/` with 15 markdown files (~252 KB total).
- **Meta files (7):**
  - `00_MASTER_PROMPT_v2.md` — constitution v2 (RESONANCE doctrine, Cathedral v16 baseline, PROVE-IT-RESONATE).
  - `README_v2.md` — pack overview + roadmap.
  - `AUTO_PILOT_v2.md` — autonomous executor for Workers 15–19 + 2-push rule.
  - `COMPACT_MASTER_v2.md` — context-tight version (~3.5 KB).
  - `10_RESUME_PROTOCOL_v2.md` — session-resume v2 schema + recovery scenarios.
  - `CONTEXT_LIMIT_FIX_v2.md` — 7 root causes + fixes for Cathedral v16 size constraints.
  - `MOBILE_KIRO_v2.md` — Kiro Mobile playbook for Pack v2.
- **Worker 15 — TYPOGRAPHY SOUL (8 files):**
  - `15_WORKER_TYPOGRAPHY_SOUL.md` — index + Preservation Guard.
  - `15_PHASE_1_TYPE_AUDIT_CASTING.md` — 9 voice tokens + 22 utility classes.
  - `15_PHASE_2_ARABIC_DISPLAY.md` — Aref Ruqaa wordmark + Reem Kufi expansion.
  - `15_PHASE_3_ARABIC_BODY.md` — Tajawal UI + Readex Pro body + Cairo fallback.
  - `15_PHASE_4_LATIN_NUMERIC.md` — Inter + JetBrains Mono + Fraunces + tabular nums + bidi-isolate.
  - `15_PHASE_5_SCALE_RHYTHM.md` — perfect-fourth scale + 8pt baseline + leading/tracking/rhythm/measure tokens.
  - `15_PHASE_6_PER_PAGE_PERSONALITY.md` — 14 type signatures + `Upg.type2` API.
- **Special Ritual (1):**
  - `CONTENT_REORDER_RITUAL.md` — pedagogical reorder + page-curriculum + `Upg.curriculum` API.

### Workers 16-19 (deferred to subsequent sessions per user-approved Path C)
- Worker 16 — VITAL UI (6 phases) — living surfaces, tactile micro-interactions, cinematic transitions.
- Worker 17 — CONTENT REVIVAL (6 phases) — forensic inventory, difficulty scoring, pedagogical reorder, enrichment, citation hardening, cross-linking.
- Worker 18 — LEARNING SHELL (4 phases) — progress markers, reading mode, cheat sheet generator, personal notes.
- Worker 19 — MICRO POLISH (4 phases) — mobile mastery, print atelier, detail shop, final audit sweep.

### Philosophy
- **RESONANCE doctrine:** "Resonance over noise. Soul over shine."
- **Scope locked:** personal training platform, single offline HTML file. NO data layer, NO telemetry, NO governance, NO CI.
- **Focus:** typography craft + UI breathing life + content pedagogical reorder + light learning shell + final polish.

### Preserved
- All Pack v1 prompts under `prompts/` (root) — untouched, kept as forensic reference library.
- Cathedral v16 baseline (PR #53) — 14 pages, 391 qcalc, 19 Upg.* APIs, 15 identity tints — fully respected.

### State
- `state/PROGRESS.json` schema bumped to v2: added `pack`, `pack_status`, `previous`, `pack_v2_scaffold` fields. JSON validated.

### Branch & PR
- Branch: `feat/prompts-pack-v2-resonance`.
- PR: `feat: Pack v2 RESONANCE — prompt system (Workers 15-19 + Ritual)`.

---

## v16 — ATELIER (Apple Liquid-Glass Pass) — Worker 14 — 2026-05

### Added — 5 new Upg.* APIs (total 19)
- **`Upg.material`** (Phase 1) — material density tier (low / standard / high), persists to `localStorage` (`upg_material_density`).
- **`Upg.chrome`** (Phase 4) — topbar Dynamic-Island scroll-shrink (64→48px @ scrollY > 80), sidebar collapse pill spring, mobile drawer scrim + ESC + swipe-to-close.
- **`Upg.choreo`** (Phase 5) — magnetic hover (`[data-magnet]`, 18% strength × 80px range), reveal-on-intersect (`[data-reveal]`), stagger children (`[data-stagger]`), cursor glow (`.u-cursor-glow`).
- **`Upg.transition`** (Phase 5) — page transitions via View Transitions API where supported, spring fallback animation (360ms) otherwise.
- **`Upg.focusTrap`** (Phase 6) — modal focus trap with ESC-to-close, Tab/Shift+Tab cycling, return-focus on disable, auto-attached to `[role="dialog"], .modal, .qmodal, [data-modal]` via MutationObserver.

### Added — Files
- `platform/offline.html` — RTL Cairo offline page with online auto-reload, retry button, and home link (≈3.4 KB).
- `scripts/atelier-v16-purge.mjs` — deterministic inline-style purger (62 patterns; 215 → 76 inline styles).

### Changed — Apple Liquid-Glass spec (WWDC 2025+)
- 4 glass tiers blur ladder (Phase 1): 16 / 24 / 32 / 40px (was 12 / 15 / 18 / 22).
- Saturate 200% (was 180%), brightness 1.05 dark / 1.02 light.
- Edge specular highlight (`inset 0 1px 0 rgba(255,255,255,...)`) on every glass surface.
- Light theme 3-tier paper tonal palette (`paper-tone-1/2/3`).
- Paper grain v2 — SVG noise data-URI, opacity 0.025 on light theme only.

### Changed — Page Headers (Phase 2)
- 13 page-headers refactored to `.page-h` block (eyebrow + title-with-icon + lede + 56px tint underline).
- Emoji purged from all `<h1>` inside `<section class="page">` (kept everywhere else: skill cards, scenario cards, stat-tiles).

### Changed — Dashboard Consolidation (Phase 3)
- `#page-dashboard` reduced from 6 duplicated sections to 1 unified Bento (10 cells).
- Removed: `dashboard-legacy` wrapper, `welcome-banner`, `grid-4` legacy stats.
- 5 sacred IDs (`cath-stats`, `cath-skill-grid`, `cath-activity-list`, `v12Heatmap`, `v12Challenge*`) relocated cleanly. Net change: +255/-385 lines.

### Changed — Chrome (Phase 4)
- Topbar Dynamic-Island scroll-shrink (64→48px @ scrollY > 80).
- Search input → search button → opens Command Palette.
- Sidebar nav-pill spring slide (320ms `cubic-bezier(0.5, 1.5, 0.5, 1)`).
- 17 collapsed-mode tooltips for nav-items.
- Mobile drawer: scrim + ESC + swipe-to-close.

### Changed — Motion (Phase 5)
- Magnetic hover on `.dock-btn` (max 6px pull, range 80px).
- Stagger reveal on `[data-stagger]` (60ms step).
- Card reveal on intersect (`[data-reveal]`).
- Page transitions: View Transitions API + spring fallback (360ms).

### Changed — Production Pass (Phase 6 — this entry)
- **Inline purge**: `style="..."` reduced from **215 → 76** (139 removed; 64% reduction).
  - Width %, progress-bar inner gradients, chip avatars (36/46/48), tinted callouts, info-chips, stat-numerals, drag buttons, action buttons, tinted cells, pills, info boxes, and code-like inline marks all moved to `.u-*` utilities.
- **Service Worker rewritten**: 74 → 119 lines.
  - Versioned caches (`shell`/`assets`/`fonts` per `atelier-v16-2026-05`).
  - Navigation: network-first → `offline.html` fallback.
  - Same-origin assets: stale-while-revalidate.
  - Cross-origin (Google Fonts): SWR in dedicated `fonts` cache.
  - `SKIP_WAITING` message support for update prompts.
- **Manifest refresh**: 4 shortcuts (`#dashboard`, `#callcenter`, `#myprogress`, `#accounting`), 192/512 icon entries, `start_url: ./index.html`, `orientation: any`, `categories: education/productivity/business/training`.
- **Favicon v2**: 100×100 viewBox, `rx=22` squircle, dual-color stroke gradient (#66FCF1 → #4F46E5), brand mark, accent dot.
- **a11y**: `Upg.focusTrap` for all modals, ESC-to-close standardized, `[data-close]` discovery, `focusTrap:escape` event for custom handlers, MutationObserver auto-attach.
- **Lighthouse helpers**: lazy-loading hint on all `<img>`, decoding=async, pointer-enter prefetch markers on nav-items.
- **Boot sanity v16**: verifies all 19 Upg.* modules; prints `🪞 ATELIER v16 — Cathedral v16 ready · 19/19 modules loaded` on success, warns with module list on miss.
- **OG meta**: `og:description` bumped from "Cathedral v14" → "Cathedral v16 (ATELIER)".

### Added — 100+ utility classes (Final Pack)
- Width %: `.u-w-{0,10,11,15,16,18,22,25,35,36,40,61,72,75,88,92}`.
- Bar fills: `.u-bar-{red,yellow,green,blue,violet}` + `.u-bar-grad-{red,blue,amber,green,red-pink,yellow-orange,green-cyan,violet-cyan,pink-violet,orange-yellow}`.
- Chips: `.u-chip` + `.u-chip-{36,46,48}` + `.u-chip-{cyan,emerald,violet,pink,red,amber,emerald-soft,pink-soft,bicolor}`.
- Callouts: `.u-callout` + `.u-callout-{cyan,green,orange,amber,pink,violet,soft}`.
- Cards: `.u-card-{deep,tint,thin,row,tile}` × `.u-tint-{cyan,green,amber,violet,pink,red}` matrix.
- Stats: `.u-stat-{36,28,26}`.
- Info chips/boxes: `.u-info-{chip,box}` × `.u-info-{cyan,green,violet,pink,red,amber}` (+ `-soft` text variant).
- Drag buttons: `.u-drag-btn` + `.u-drag-{accent,pink,amber,ghost}`.
- Tinted buttons: `.u-btn-tinted` + `.u-btn-{accent,red}` + `.u-btn-grad-{emerald,violet}`.
- Cells: `.u-cell` + `.u-cell-{amber,red,violet,green-soft,red-soft}`.
- Pills: `.u-pill` + `.u-pill-{green,red,yellow,blue}`; `.u-pill-xs` + `.u-pill-{green,orange,pink,purple,violet}`.
- Pad-cards: `.u-pad-card`, `.u-pad-card-{accent,violet}`, `.u-pad-card-row`.
- Misc: `.u-track`, `.u-track-{120,200}`, `.u-stack-center`, `.u-max-600`, `.u-min-h-280`, `.u-th-meta`, `.u-dot`, `.u-dot-{accent,yellow,instagram}`, `.u-c-{emerald,purple,black,green,red,cyan,violet,pink,yellow,amber,blue,emerald-light,blue-light,violet-light,accent}`, `.u-bg-{accent-06,slate-on-white}`, `.u-grad-{amber-soft,cyan-violet-soft}`, `.u-mb-12`, `.u-mt-16`, `.u-mt-26`, `.u-tint-fill`, `.u-grid-span-full`, `.u-inline-mark`, `.u-inline-mark-accent`.
- a11y / print:
  - `@media print` — `.u-no-print`, `.u-print-block`, `.u-print-page-break`.
  - `@media (forced-colors: active)` — borders forced for chips/callouts/cards/info chips/pills/buttons.

### Preserved (final assertion)
- 14 page sections, 391 qcalc references — unchanged.
- All citations, Iraq blocks, salary tables — unchanged.
- All Cairo + Reem Kufi + Readex Pro + IBM Plex Arabic + Aref Ruqaa fonts.
- 15 identity tints (HSL values unchanged).
- All Worker 11 / 12 / 13 IIFEs and `Upg.*` APIs untouched.
- 19 Upg.* APIs total: theme, icons, gateway, calc, cmdk, state, production, type, scroll, nav, identity, greet, countup, motion, material, chrome, choreo, transition, focusTrap.

### Files touched (Phase 6 only)
- `platform/index.html` — 215 → 76 inline styles, og:description bump.
- `platform/assets/style.css` — APPEND ~330 lines (Final Utilities Pack).
- `platform/assets/app.js` — APPEND ~210 lines (focusTrap + auto-attach + Lighthouse helpers + sanity v16).
- `platform/sw.js` — REPLACE (74 → 119 lines).
- `platform/manifest.webmanifest` — REPLACE (shortcuts + icons array).
- `platform/favicon.svg` — REPLACE (squircle v2).
- `platform/offline.html` — CREATE.
- `scripts/atelier-v16-purge.mjs` — CREATE.
- `state/CHANGELOG.md` — APPEND v16 (this entry).
- `state/PROGRESS.json` — Worker 14 marked complete.
- `state/snapshots/worker-14-phase-6.json` — CREATE.

## v15.1 — AURORA Completion (Worker 13) — 2026-05

### Fixed (محتوى Worker 12 الناقص فعلياً)
- **Phase 1 — Bento Dashboard**: markup الآن مطبَّق فعلاً في `#page-dashboard`. كان `class="bento"` مفقود من DOM رغم أن CSS و JS جاهزون من Worker 12. النتيجة: greeting tile + 4 stat tiles مع `[data-countup]` + dock + legacy wrapper.
- **Phase 2 — Real Inline Purge**: inline `style="..."` خُفِّض من **587 → 223** (62% reduction). كان الادعاء في PR #44 إن inline = 587 وإن `u-grad-*` = 7؛ الواقع كان `u-grad-*` = 0 (لم تُكتب أصلاً). الآن:
  - 7 utilities `u-grad-*` (brand / success / warm / violet / pink / amber / tint)
  - 100+ atom utilities للـ decomposer pass
  - cleanup script v2 فيه decomposer all-or-nothing (لا visual regression)
  - `!important` stray = **12** (تحت spec target ≤ 20)

### Added
- **Phase 3 — Final Polish**: زر toggle-sidebar في topbar (يفعِّل `Upg.nav`)، wordmark "Upgrade" يستعمل Aref Ruqaa accent، boot sanity assert v15.1 يطبع banner لو 14 modules محمَّلين، CHANGELOG entry هذه.
- 7 gradient utilities: `u-grad-{brand,success,warm,violet,pink,amber,tint}`
- Compound type presets: `u-t-eyebrow`, `u-t-card-title`, `u-t-list-title`, `u-t-section-mini`, `u-t-h-md`, `u-t-h-lg`
- Hairline border atoms: `u-bb-bd`, `u-bt-bd`, `u-br-bd`, `u-bl-bd`, `u-bbd-bd`
- 30+ rgba border atoms (`u-b1-{cyan,green,red,purple,sky,yellow,...}-{15,18,20,25,30}`)
- Width / height px atoms (`u-w-10px..u-w-200`, `u-h-10px..u-h-48px`)
- Stat-tile compound utilities + frame variants + side-accent rows
- Brand-color outline cards (linkedin / twitter / instagram / tiktok)
- Boot sanity assert IIFE — يطبع warning واضح لو modules ناقصين

### Changed
- `state/PROGRESS.json`: worker = "13", status = "in-progress" → "completed" (في نهاية Phase 3)

### Preserved (تأكيد)
- 16 page sections — كلهم سليمين
- 391 qcalc references — لا تغيير
- 14 Upg.* public APIs — كلهم موجودين
- Service Worker, manifest, favicon — لا تغيير
- 4 glass tiers, 15 identity tints, كل من Worker 12 — لا تغيير

---

## v15.0 — AURORA (Apple-grade UI/UX) — 2026-05

### Added
- **Phase 1 — Typography & Spatial System**: 10 fluid type tokens (`--text-2xs..--text-display`) via `clamp()`, 13 spacing tokens (`--space-0..--space-12`) on a 4pt grid, leading/tracking/weight ladders, container widths, unified z-index ladder, heading utilities (`.h-display/.h-title/.h-section/.h-card/.h-eyebrow/.h-label/.h-mono`), prose rhythm (`.u-prose`), tabular-numerals auto-applied to `.cath-stat-value`, `.qcalc-value`, `[data-counter]`. Public API: `Upg.type` (density + textZoom).
- **Phase 1B — Typeface Soul**: Premium Arabic stack — Reem Kufi (display) + Readex Pro (text) + IBM Plex Arabic (numeric) + Aref Ruqaa (calligraphic accent). Optional Thmanyah self-host wired via @font-face slots.
- **Phase 2 — Linen-Bone Off-White Re-chisel**: Warm off-white palette replacing stark white; tinted shadows (Refactoring UI principle); tonal surface elevation; nav-badge identity classes; first wave of inline-gradient purges.
- **Phase 3 — Materials & Depth**: 4-tier glass material system (`--glass-thin/regular/thick/chrome`) modeled on UIVisualEffectView; scroll-aware elevation; halo edge-light; grain refresh. Public API: `Upg.scroll`.
- **Phase 4 — Navigation Chrome**: Source-list sidebar with collapse (`Cmd+\`); Dynamic-Island compact topbar with scroll-aware compaction; `View Transitions` for nav-pill animation; mobile drawer; per-section identity tinting in sidebar. Public API: `Upg.nav`.
- **Phase 5 — Dashboard Hero**: 15 per-page identity tints (`--color-tint`); Bento utilities for asymmetric card layouts; count-up tickers; time-of-day greeting in dashboard header. Public APIs: `Upg.identity`, `Upg.greet`, `Upg.countup`.
- **Phase 6 — Motion & Interaction**: 5 easing tokens (`--ease-emphasized/decelerate/accelerate/spring/standard`) + 6 duration tokens; press / lift / glow / reveal / skeleton micro-interactions; view-transition wrapper; cursor glow (Phase 2 enhanced). Public API: `Upg.motion`.
- **Phase 7 — Inline Purge & Production Polish**: 100+ utility classes added (font-size / weight / color / spacing / layout / compound presets); `cleanup-inline-styles.mjs` extended with 80+ exact-match patterns; per-page header tint underline (56px linear-gradient); boot banner + sanity assert that verifies all 14 `Upg.*` modules.

### Changed
- Inline `style="..."` attributes: **1671 → 587** (65% reduction, conservative pattern-based purge — no behavioral changes).
- `!important` declarations: **186 total / only 13 strays** outside legit `@media print`, `prefers-reduced-motion`, or `forced-colors` contexts (well within spec's ≤20 target).
- Font stack: Cairo + IBM Plex Sans Arabic + Reem Kufi + Readex Pro + Aref Ruqaa + SF Arabic + system fallback.
- Topbar: now a sticky island that compacts on scroll with backdrop-filtered glass.
- Sidebar: groups follow uppercase tracked-label pattern; pill selection slides via spring easing.

### Public APIs (window.Upg.*)
14 modules total:
1. `theme` (Worker 11) — 3-state theme toggle (auto/dark/light)
2. `icons` (Worker 11) — Lucide-style 95-symbol icon set
3. `gateway` (Worker 11) — entry/onboarding flow
4. `calc` (Worker 11) — qcalc framework, 8 instances mounted
5. `cmdk` (Worker 11) — command palette (30+ commands)
6. `state` (Worker 11) — unified state layer + `page-myprogress`
7. `production` (Worker 11) — PWA/SW/banner orchestration
8. `type` (Worker 12 P1) — density + textZoom
9. `scroll` (Worker 12 P3) — scroll-aware elevation
10. `nav` (Worker 12 P4) — sidebar/topbar coordination
11. `identity` (Worker 12 P5) — per-page tint application
12. `greet` (Worker 12 P5) — time-of-day greeting
13. `countup` (Worker 12 P5) — animated number tickers
14. `motion` (Worker 12 P6) — easing/duration/press/lift orchestration

### Sacred Preserved
- 14 pages in `<main>` (dashboard, callcenter, fieldsales, accountmgr, social, lab, psych, eq, negotiation, customercare, programming, accounting, phonerepair, hrmastery, myprogress).
- 8 qcalc instances mounted.
- All citations, Iraq blocks, salary tables.
- Service Worker, manifest, favicon.
- All Worker 11 IIFEs untouched.

---

## v14 — Cathedral (Worker 11)
- Sovereign theme tokens (5 surface levels, tinted shadows)
- Lucide-style icon system (`<i class="qi" data-icon="..."></i>`)
- Entry gateway (welcome / identity / goal / privacy / returning / locked)
- Calculator framework (`qcalc`) with 8 migrations
- Command palette + keyboard shortcuts (Cmd+K, 30+ commands)
- Unified state layer + `page-myprogress`
- PWA: manifest, service worker, favicon, Open Graph
- 70+ utility classes, focus traps, lazy-mount events, reduced-motion guard

## v13 — Quantum Leap (Worker 01)
- Foundation tokens & aurora mesh
- Conic halo + magnetic cursor aura
- Living numerals + sectional identity tints
- Reduced-motion / print / view-transition polish

## v12 — Original platform
- 14-page Arabic training platform, vanilla HTML/CSS/JS only.
