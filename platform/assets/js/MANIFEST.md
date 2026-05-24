# ÊLAN v4 — JS Module Manifest
> Established at α3 (Module Manifest stage).
> 92 IIFE files → ≤ 28 ESM modules. Migration is gradual across β/γ/δ/ε.

---

## Current state (α3)

- `app.js` — entry; still loads 90+ legacy `upg-*.js` IIFE files. Untouched in α3.
- `_legacy-globals.js` — 4,215-line monolith (helpers + page bootstraps). Will shrink phase by phase.
- `_legacy-bridge.js` — empty buffer that grows as we migrate consumers.
- `core/state.js`, `core/nav.js`, `core/theme.js` — first ESM modules. Self-register on `window.Upg.*` only when the legacy slot is empty (so behavior is unchanged today).
- `core/icons.js`, `core/font.js`, `core/compat.js` — stubs that throw on use; activated in α4 / β / late α3.

## Target shape (after ζ)

| Module | Public API | Used by | Lazy-load? |
|---|---|---|---|
| `core/state.js`     | `Upg.state.{get,set,subscribe}`     | all pages           | no  |
| `core/nav.js`       | `Upg.nav.{to,onChange,collapse,…}`  | all pages, chrome   | no  |
| `core/theme.js`     | `Upg.theme.{get,set,cycle,current}` | chrome/topbar       | no  |
| `core/icons.js`     | `Upg.icons.{resolve,inject}`        | all                 | no  |
| `core/font.js`      | `Upg.font.{voices,audit,signature}` | β phases            | no  |
| `core/compat.js`    | `__elanCompat.audit()`              | dev only            | no  |
| `chrome/sidebar.js` | (event-driven, no public API)       | shell               | no  |
| `chrome/topbar.js`  | (event-driven)                      | shell               | no  |
| `chrome/bottom-nav.js` | (event-driven)                   | shell, mobile-only  | no  |
| `chrome/cmdk.js`    | `Upg.cmdk.{open,register}`          | shell               | no  |
| `chrome/toast.js`   | `Upg.toast.{show,error,success}`    | all                 | no  |
| `pages/<X>.js`      | (initialized on nav to that page)   | nav.js              | yes |
| `motion/choreo.js`  | `Upg.motion.transition()`           | nav.js              | no  |
| `motion/countup.js` | `Upg.motion.countUp(el)`            | dashboard, hr       | no  |
| `motion/reduced.js` | `Upg.motion.reduced` (boolean)      | all                 | no  |
| `ux/focustrap.js`   | `Upg.ux.trap(el)`                   | modals, cmdk        | no  |
| `ux/touch.js`       | (event-driven)                      | mobile-only         | no  |
| `ux/ritual.js`      | `Upg.ritual.sahar()`                | first-mount         | no  |

## Migration policy

- Each ESM module includes a `if (!window.Upg.<X>) window.Upg.<X> = ...` guard so it only takes effect after its legacy IIFE counterpart is removed.
- Removing a legacy `upg-*.js` file requires three steps in the same commit: (1) delete the file, (2) remove its `import` line from `app.js`, (3) ensure the new `core|chrome|pages|motion|ux/*.js` module is imported and exposes the same public API.
- `_legacy-bridge.js` may be used to inline a temporary shim that maps an old global function onto a new ESM export, so the legacy HTML attribute handlers keep working during the transition.

## Reference

- Doctrine: `prompts/v4/00_ELAN_MANIFESTO.md`
- Audit baseline: `state/AUDIT_BASELINE.md`
- α3 spec: `prompts/v4/α3_MODULE_MANIFEST.md`
