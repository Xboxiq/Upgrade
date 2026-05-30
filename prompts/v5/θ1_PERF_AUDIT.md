# θ1 — PERF_AUDIT (Pillar θ — POLISH · 0 pulses)

> *«السُرعة ليست زِينة — هي احتِرام لوَقت المُتَعَلِّم. القياس قبل الادِّعاء.»*
>
> Authored at execution time per `AUTO_PILOT_v5.md` boot step 4. θ is a
> verify-and-seal pillar: **no Pulse**, only verified counts.

---

## Intent

Bring `platform-v5/index.html` to a state where a **Lighthouse Mobile
Performance ≥ 90** run (exit criterion §8.3) is achievable, and ship a
**static, grep-verifiable perf gate** so regressions are caught without a
browser. The runtime Lighthouse score is recorded by the human/CI in
`state/LIGHTHOUSE_REPORT.md` — this stage never asserts a number it did not
measure (manifesto §6 — Truth Over Claims).

## Doctrine guardrails

- **MOTION §7** — perf budget (CLS ≤ 0.05 entrance · INP ≤ 200ms press · no
  jank ≥ 16ms during panel entrance). Never ship a janky animation.
- **Manifesto §5.1** — heavy `backdrop-filter: blur(N≥12px)` is banned (GPU tax).
- **Manifesto §5.13** — only the seven canonical `--duration-*` tokens.
- **CHROMA §4** — instant theme swap; no transition by default. The first
  paint must already be the correct theme (no flash, no layout shift).

## Baseline (forensic scan)

```
render-blocking-css-links   = 16
scripts-non-deferred        = 1   (theme.js at end-of-body)
inline-head-theme-bootstrap = 0   (FOUC risk for a saved 'light' preference)
css url() external requests = 0   (no external fonts/images — strong baseline)
@font-face / @import        = 0 / 0
heavy blur (≥12px)          = 0
content-visibility uses     = 0   (offscreen match-bench paints eagerly)
```

## Changes

1. **FOUC guard (correctness + perceived perf).** A tiny synchronous
   `<script data-theme-bootstrap>` in `<head>`, *before* the stylesheet
   links, resolves the saved theme (`localStorage 'upg_theme'`, mirroring
   `Upg.theme.current()` / `resolveAuto()`) and sets `data-theme` on the
   root before first paint. This eliminates the dark→light flash and the
   layout repaint it triggers.

2. **Defer `theme.js`.** With first paint handled by the bootstrap,
   `theme.js` no longer needs to block; it loads `defer` like the other 12
   modules (still first in defer order, so `window.Upg` is seeded first).
   → `scripts-non-deferred: 1 → 0`.

3. **`content-visibility: auto` on the offscreen `.match-bench`.** The
   match bench sits below the bento fold; deferring its layout/paint lowers
   initial TBT. `contain-intrinsic-size` reserves space so the scrollbar
   does not jump (CLS-safe). Behaviour is unchanged — it renders on approach
   and on focus.

4. **`scripts/v5_perf_audit.py` (NEW).** Static perf gate over
   `platform-v5/`. Fails (exit 1) on: any css `url()` external request, any
   `@import`, any heavy blur ≥12px, any non-deferred `<script src>` (the
   inline bootstrap is exempt), any inline `style=` attribute, or a missing
   FOUC bootstrap. Reports (non-failing) render-blocking link count and
   always-on `will-change` count against budget.

## Verify

Re-run the forensic scan; before/after table in the ledger. `node --check`
is N/A (no JS files changed beyond an inline 6-line guard). Serve over HTTP
and confirm `200` for index + the new bootstrap is present.

## Out of scope (honest boundaries)

- Concatenating the 16 CSS files into one bundle — would flatten the
  `@layer` source architecture and is a build-system change, not a polish
  edit. HTTP/2 multiplexing makes 16 small same-origin files acceptable;
  the perf audit reports the count as informational, not a failure.
- The runtime Lighthouse number — measured by the human, recorded in
  `state/LIGHTHOUSE_REPORT.md`.
