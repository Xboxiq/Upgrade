# δ2 — BENTO EXPAND

**Pillar:** δ (bento live) · **Stage:** 2 of 3 · **Pulse:** **REVEAL_PULSE**

> Concrete reference: `ATELIER_REFERENCE.md §3 (δ2)` + prototype anchor
> `prototype/atelier/assets/atelier.js` → `swapTo()` shared-element morph
> (`view-transition-name` on tile <-> page-head). Ported to in-place grid expand.

## Intent
A bento card opens **in place** — never to a new page (manifesto). On click / Enter /
Space the focal card grows by changing its grid span; siblings reflow around it. Where
`document.startViewTransition` exists, the compact→expanded change is a single FLIP morph
(MOTION §5); the card's title + ring carry a shared `view-transition-name` so they
*travel* rather than cross-fade. The fallback is a plain `--duration-morph` grid
transition. Closing reverses; focus returns to the trigger.

## The Pulse — REVEAL_PULSE
**The Surprise:** عند فَتح البطاقة لا يَظهر مُحتَواها دَفعة واحدة. البطاقة المُصغَّرة تَتَحَوَّل
(morph) إلى رَأس مُوَسَّع — العُنوان والحَلقة يُسافِران بأنفُسِهما عَبر `view-transition-name`
لا يَختَفيان ويَظهَران — ثُمّ يَنكَشِف الداخِل بِتَرتيب القِراءة (من أعلى-اليَمين): المُلَخَّص أولاً،
فالكُتَل، فالإجراءات أخيراً بَعد أن تَستَقِرّ العَين. المُغلَق يُلَمِّح للمَفتوح، لا يُلغيه.
**Reference Avoided:** Forbidden #5 (modal popup) + the AI-default "click card → route to a
new full page"; nothing navigates away.
**Inspired-by:** Wild Card #15 (the folded-letter lock of an Andalusian zellige door — the
closed object hints at the open one).
**User-Visible:** yes — the expansion reads as one continuous object unfolding.
**Originality Self-Score:** 4 — shared-element morph + reading-order disclosure, not a
generic accordion.

## Files
1. `platform-v5/assets/js/bento.js` (EXTEND, +~80 lines) — `Upg.bento.expand(id)` /
   `.collapse()`; wraps the span change in `startViewTransition` when available; sets
   `view-transition-name` on the card title + ring before the transition, clears after
   (`vt.finished.finally`); manages `data-expanded`, `aria-expanded`, focus return,
   and `Esc`/scrim close.
2. `platform-v5/assets/css/bento.css` (EXTEND, +~70 lines) — `.bento-card[data-expanded="true"]`
   span override (per SPATIAL §3.1), `--z-bento-expanded` lift, reading-order reveal of
   inner sections via `--duration-emerge` staggered by `transition-delay` steps (not a
   `@keyframes`), and the reduced-motion snap path.
3. `platform-v5/index.html` — ensure focal/domain cards are `<button>`-semantic and carry
   the data hooks.

## Forensic targets
```
view-transition-api    grep -c 'startViewTransition' platform-v5/assets/js/bento.js          # >= 1
shared-element-name    grep -c 'view-transition-name\|viewTransitionName' platform-v5/...     # >= 1 (css or js)
in-place-span          grep -c 'data-expanded' platform-v5/assets/css/bento.css               # >= 1
duration-tokens-only   grep -cE 'transition:[^;]*(ms|s)[^;]*;' platform-v5/assets/css/bento.css that lack --duration-  # 0
                       grep -c -- '--duration-morph\|--duration-emerge' platform-v5/assets/css/bento.css  # >= 1
no-new-route-on-expand grep -c "location.hash\|Upg.nav.to" (inside expand path)               # 0
reduced-motion-path    grep -c 'prefers-reduced-motion' platform-v5/assets/css/bento.css      # >= 1
zero-emoji / logical   v5_forbidden_audit.py + v5_logical_props_audit.py                      # 0 / exit 0
```

## API contract
```js
Upg.bento.expand(id)    // expands card in place; idempotent; wraps in view-transition if supported
Upg.bento.collapse()    // collapses the open card; restores focus to trigger
Upg.bento.isExpanded()  // -> id | null
// events: dispatches 'upg:bento:expanded' / 'upg:bento:collapsed' (detail: { id })
```

## Banned in this stage
- Opening the card as a route / new page / modal / sheet (this is *in-place expand*).
- A `@keyframes` with > 4 stops for the reveal (use staggered token-timed transitions).
- A one-off `transition: 360ms ease` (must be `--duration-morph` + `--ease-morph`).
- Revealing all inner content simultaneously (defeats the reading-order Pulse).
- Trapping focus or losing it on collapse.

## Commit
```
δ2: bento expand — verified: startViewTransition=1 shared_name=1 data_expanded=1 reduced_motion=1 logical_props=pass
```

## Acceptance
- Clicking the focal card expands it in place; siblings reflow; URL is unchanged.
- Supported browsers show a FLIP morph with the title/ring traveling; Firefox degrades to
  a clean grid transition; both work.
- Inner sections appear in reading order; actions appear last.
- `Esc` and scrim collapse; focus returns to the trigger; reduced-motion snaps without jank.
- REVEAL_PULSE logged in `state/PULSE_LOG.md`. (Pivot check: δ1 MORPH -> δ2 REVEAL — distinct.)
