# Upgrade Platform — CHANGELOG

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
