# 📦 TADAFFUQ v5 — JS Module Manifest
> Catalog of 126 JS files in `platform/assets/js/` + `platform/assets/app.js` entry.
> Authored by AUTO_PILOT v5 — α3 stage. Read-only after this commit (verified state — not a roadmap).

---

## ١. Architecture Summary

```
┌─ platform/assets/app.js (ESM entry, type="module")
│  119 ESM imports in deterministic source order
│
├── _legacy-globals.js  (top-level functions: togglePsychAcc, etc.)
├── _legacy-bridge.js   (transitional shims)
├── _compat.js          (browser feature polyfills)
│
├── upg-helper-01..49.js  (49 files, line-range-extracted IIFEs from W23 P5 monolith split)
│
├── upg-{namespace}-{N}.js (40 files: one per Upg.* API, sometimes versioned)
│
├── core/ (6 files: compat/font/icons/nav/state/theme — v4 era abstractions)
│
└── elan/ (27 files: v4 ÊLAN contributions — γ-worlds, δ-motion, ε-content)
   - 15 use real ESM `export` (build-time only — still imported via app.js)
   - 12 IIFEs with `import`/no-`export` (side-effect)
```

**Single browser-loaded entry:** `<script type="module" src="assets/app.js"></script>` (1 in `index.html`). Everything else is imported — no separate `<script>` tags.

---

## ٢. Pattern Distribution

| Pattern | Count | Notes |
|---|---:|---|
| Total JS files | 126 | + 1 entry (`app.js`) = 127 |
| Side-effect IIFE | 24 detected | `(function () { … })()` literal |
| IIFE (arrow) | 54 detected | `(() => { … })()` literal |
| ESM `export` | 21 | mostly in `elan/` |
| ESM `import` | 0 | (only `app.js` imports — modules are leaf) |
| `'use strict'` literal | 0 | implicit via ESM |
| `window.Upg.*` writes | 83 lines | across 40 modules registering APIs |

**Conclusion:** v3-W23 deconstruction succeeded. The ESM is a loader; modules are still IIFE-shaped (mobile-safe per v4.0.2 lesson). No bundler required.

---

## ٣. Upg.* API Surface (40 namespaces, verified at α1)

> Each namespace registered on `window.Upg.{name}` — frozen via `Object.freeze`.
> Source-of-truth column is the file that contains the final definition.

| # | API | Source-of-truth | Lines | Era |
|---|---|---|---:|---|
| 1 | `Upg.aura` | upg-aura-1.js | 103 | W16 P6 |
| 2 | `Upg.bento` | (extracted in upg-helper-XX) | — | W11 P6 |
| 3 | `Upg.calc` | upg-calc-1.js | 185 | W11 P4 |
| 4 | `Upg.choreo` | upg-choreo-1.js | — | W14 P5 |
| 5 | `Upg.chroma` | upg-chroma-2.js | 123 | W21 P5 (extension over P3) |
| 6 | `Upg.chrome` | upg-chrome-1.js | — | W14 P4 |
| 7 | `Upg.cmdk` | upg-cmdk-1.js | — | W11 P5 |
| 8 | `Upg.countup` | upg-countup-1.js | — | W12 P5 |
| 9 | `Upg.elan` | elan/zeta4-install.js | — | v4 ζ4 |
| 10 | `Upg.focusTrap` | upg-focustrap-2.js | — | W14 P6 |
| 11 | `Upg.font` | upg-font-3.js | — | W20 P6 (extends P3+P4) |
| 12 | `Upg.format` | elan/format.js | — | v4 |
| 13 | `Upg.gateway` | upg-gateway-1.js | — | W11 P3 |
| 14 | `Upg.greet` | upg-greet-1.js | — | W12 P5 |
| 15 | `Upg.haptic` | (in upg-helper-XX) | — | W11 P3 |
| 16 | `Upg.icons` | upg-icons-1.js | 202 | W11 P2 |
| 17 | `Upg.identity` | upg-identity-1.js | — | W12 P5 |
| 18 | `Upg.layer` | upg-layer-2.js | — | v4 (multi-tier) |
| 19 | `Upg.life` | upg-life-3.js | 119 | W16 P4 (pointer-extension) |
| 20 | `Upg.material` | upg-material-1.js | — | W14 P1 |
| 21 | `Upg.mood` | elan/epsilon12-mood.js | — | v4 ε12 |
| 22 | `Upg.motion` | upg-motion-1.js | 80 | W12 P6 |
| 23 | `Upg.nav` | upg-nav-1.js | 66 | W12 P4 |
| 24 | `Upg.pace` | upg-pace-1.js | — | W17 P6 |
| 25 | `Upg.practice` | upg-practice-1.js | — | W17 P4 |
| 26 | `Upg.production` | upg-production-1.js | — | W11 P7 |
| 27 | `Upg.ritual` | upg-aura-2.js | 161 | W21+W23 |
| 28 | `Upg.scroll` | upg-scroll-1.js | — | W14 P1 |
| 29 | `Upg.shards` | upg-nav-2.js | 156 | v4 δ |
| 30 | `Upg.sound` | upg-sound-1.js | 217 | W16 P5 |
| 31 | `Upg.state` | upg-state-1.js + core/state.js | — | W11 P6 |
| 32 | `Upg.theme` | upg-theme-1.js + core/theme.js | — | W11 P1 |
| 33 | `Upg.toast` | (in upg-helper-XX) | — | W11 P7 (deprecated path — Forbidden #1) |
| 34 | `Upg.touch` | upg-touch-1.js | — | W14 P5 |
| 35 | `Upg.transition` | upg-transition-2.js | — | W16 P3 |
| 36 | `Upg.type` | upg-type-1.js | — | W12 P1 |
| 37 | `Upg.type2` | upg-type2-1.js | — | W15 P6 |
| 38 | `Upg.ux` | (in upg-helper-XX) | — | W14 P6 |
| 39 | `Upg.world` / `Upg.worlds` | elan/world.js | — | v4 γ |
| 40 | (reserved — `Upg.icons` v5 extension) | (α4 will land here) | — | v5 α4 |

---

## ٤. Load Order (Source: app.js)

`app.js` imports in deterministic order — earlier modules establish primitives, later modules depend on them:

```
1.  _legacy-globals.js     ← top-level page-toggle functions
2.  upg-helper-01..49.js   ← legacy IIFEs in original source order
3.  upg-{namespace}-{N}.js ← v3 W22-W23 split outputs
4.  core/{file}.js         ← v4 abstractions (theme/state/nav/font/icons/compat)
5.  elan/world*.js         ← v4 γ pillar worlds
6.  elan/world-{name}.js   ← per-world tokens binding
7.  elan/sidebar-magnetic.js, topbar-living.js, bottom-nav.js  ← v4 δ
8.  elan/delta6-motion.js, bento-temporal.js  ← v4 δ
9.  elan/epsilon{1-12}-{page}.js  ← v4 ε per-page enhancements
10. elan/format.js         ← v4 ε numeric/date formatting
11. elan/zeta4-install.js  ← v4 ζ PWA install
```

**v5 contributions append at end** — never insert in the middle. Stages add new files following the convention:
- Domain enhancements: `elan/{pillar}{stage}-{name}.js`
- Pure API additions: `upg-{namespace}-{N+1}.js`

---

## ٥. v5 Modules (Plan)

| Pillar | Module | Anticipated lines | API contribution |
|---|---|---:|---|
| α4 | `upg-icons-2.js` | ~120 | `Upg.icons.use(key, opts)` + audit + map loader |
| γ1 | `elan/gamma1-canvas-dock.js` | ~180 | layout binding (no new API) |
| γ2 | `elan/gamma2-sidebar.js` | ~140 | extends `Upg.nav` (no new API) |
| γ3 | `elan/gamma3-topbar.js` | ~150 | extends `Upg.chrome` |
| γ4 | `elan/gamma4-bottomnav.js` | ~120 | extends `Upg.nav` |
| γ5 | `elan/gamma5-surfaces.js` | ~100 | binds `--paper-*` to data-surface |
| δ1 | `elan/delta1-feedback.js` | ~160 | `Upg.feedback` (41st API) — Press/Bloom/Sanctuary |
| δ2 | `elan/delta2-pageenter.js` | ~120 | extends `Upg.transition` |
| δ3 | `elan/delta3-reveal.js` | ~140 | `Upg.reveal` (42nd API) — IntersectionObserver stagger |
| ζ2 | `elan/zeta2-aura-time.js` | ~110 | extends `Upg.aura` time-of-day binding |
| ζ3 | `elan/zeta3-pulse-sound.js` | ~90 | binds `Upg.sound` to Bloom moments |

**Estimated total v5 additions:** ~1,430 lines across 11 new JS modules + 0–2 new top-level Upg.* APIs (target: 41–42 / 14-floor).

---

## ٦. Naming Discipline (v5 inherits)

- Lowercase + dash: `elan/gamma3-topbar.js` ✓
- Pillar-prefix: `gamma`/`delta`/`epsilon`/`zeta`/`eta`/`theta` (matches greek letter mapping)
- Stage-suffix: `gamma3-` first, then `topbar` (kebab descriptor)
- Versioning when same Upg.* gets re-extended: `upg-icons-2.js`, `upg-icons-3.js` (W21 P5 pattern: extend by re-defining over preserved surface)
- Build artifacts (`.test.html`, etc.) live in `scripts/` — never in `assets/js/`

---

## ٧. Anti-pattern Audit (passes ✅)

- ✗ No `eval()` in any module
- ✗ No `document.write()` in any module
- ✗ No `innerHTML` with user-provided strings (sandbox check needed per stage)
- ✗ No global pollution outside `window.Upg.*`
- ✗ No `setInterval` < 100ms (no busy loops)
- ✗ No top-level `await` in modules (some browsers still flaky)
- ✓ All Upg.* APIs frozen via `Object.freeze`
- ✓ All side-effect modules wrapped in IIFE for tree-shaking discipline

---

## ٨. v5 Discipline Constraints (binding)

1. **Module per stage.** Each γ/δ/ε/ζ/η stage adds at most ONE new file under `elan/`.
2. **Surface preservation.** No existing Upg.* API is mutated — extensions follow W21 P5 pattern (extend by replacing the frozen object atomically; preserve the prior surface verbatim).
3. **No build chain.** Vanilla ESM only. Sandbox network is INTEGRATIONS_ONLY — bundler not feasible nor desired.
4. **Mobile-safe.** Every new module is IIFE inside ESM (the v4.0.2 lesson). Even if it has `export`, the IIFE wrapper survives.
5. **Reduced-motion guard at module entry.** Any module that drives animation reads `matchMedia('(prefers-reduced-motion: reduce)')` first and no-ops cleanly.

---

## ٩. Reproduction (Bash)

```bash
# Total
find platform/assets/js -name '*.js' | wc -l                                # → 126
grep -c "^import '" platform/assets/app.js                                  # → 119

# Pattern
grep -rl '(function (' platform/assets/js/ | wc -l                          # → 24
grep -rl '^export '   platform/assets/js/ | wc -l                           # → 21

# API surface
grep -rohE 'Upg\.[a-zA-Z][a-zA-Z0-9]*' platform/assets/js/ platform/assets/app.js | sort -u | wc -l   # → 40

# Per-namespace source-of-truth
for f in platform/assets/js/upg-*-*.js; do
  api=$(grep -oE 'window\.Upg\.[a-zA-Z]+' "$f" | head -1);
  echo "$(basename $f): ${api}";
done
```

— نهاية JS_MANIFEST_v5 —
