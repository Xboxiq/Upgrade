# δ1 — BENTO GRID

**Pillar:** δ (bento live) · **Stage:** 1 of 3 · **Pulse:** **MORPH_PULSE**

> Concrete reference: `ATELIER_REFERENCE.md §3 (δ1)` + prototype anchors
> `prototype/atelier/` → `.bento`, `.continue`, `.momentum`, `.ladder`
> (ported through doctrine tokens — `--surface-0/1/2`, `--accent-action`, sprite icons).

## Intent
Build the home as a **living bento**, not a dashboard of identical boxes. One responsive
grid hosts: the **Continue card** (hero, the single `--accent-action` CTA on the screen),
the **Momentum strip** (streak / blocks-this-week / focus-minutes, rendered values — no
counters), the **Domain grid** (the training domains as bento cards), and the **Mastery
ladder** (foundation → practitioner → expert). Cards respond to *their own container*
(SPATIAL §6); the grid responds to the viewport (4-3-2-1).

This stage builds the **static** bento. Expand-in-place is δ2; the focal ring is δ3.

## The Pulse — MORPH_PULSE
**The Surprise:** الـ bento لا يَكون شَبكة مُتطابِقة الخَلايا. أحجام البطاقات تُشتَقّ من زَخم
المُتعلِّم نَفسه: المَجال قَيد التقدُّم يَحتلّ خَلية أكبر (`--card-span-w/h` أوسَع)، والمُكتَمِل
يَنكَمِش، والمُقفَل يَبقى صَغيراً هادئاً. فالشَبكة تُعيد تَركيب نَفسها حَول حَيثُ يَقِف المُستخدم
فِعلاً — تَناظُر مَقصود الاختِلال، يَعكِس التَركيز الحَقيقي لا التَوزيع المُتساوي الكَسول.
**Reference Avoided:** Forbidden Library — the "three identical stat boxes" / uniform card
grid AI-default; and Forbidden #4 (animated counters — values are rendered).
**Inspired-by:** Wild Card #5 (Persian carpet asymmetry — the deliberate flaw that proves
no human is perfect): the grid's asymmetry is intentional and meaningful, never random.
**User-Visible:** yes — the home visibly composes around the user's current focus.
**Originality Self-Score:** 4 — data-driven asymmetry, not decorative variation.

## Files
1. `platform-v5/assets/css/bento.css` (~150 lines) — `.bento` grid (4-3-2-1 viewport
   breakpoints), `.bento-card` (Bento Card surface per SPATIAL §3.1, `container-type:
   inline-size; container-name: card`), `@container card (...)` adaptivity, `.continue`,
   `.momentum` + `.stat`, `.ladder` + `.rung`. Tokens only; logical properties only.
2. `platform-v5/assets/js/bento.js` (~120 lines) — IIFE exposing `Upg.bento`:
   composes card spans from a progress model, renders the home into the canvas, uses
   `Upg.icons.use()` for every glyph. No inline `<svg viewBox>`.
3. `platform-v5/index.html` — mount point + wire `bento.css` / `bento.js` (+ `_layers.css`
   cascade entry if present).

## Span model (the MORPH source)
```
state          -> --card-span-w x --card-span-h
in-progress    -> 4 x 3   (focal — also hosts the δ3 ring)
recent         -> 2 x 2
available      -> 2 x 1
completed      -> 1 x 1
locked         -> 1 x 1   (muted, lock icon, no CTA)
```
`Upg.bento.compose(domains)` returns the layout; spans are CSS custom props, never
hardcoded per card.

## Forensic targets
```
grid-breakpoints         grep -cE '@media .*min-width: *(480|720|1080)' platform-v5/assets/css/bento.css   # >= 3
container-queries-first  grep -c 'container-type: *inline-size' platform-v5/assets/css/bento.css           # >= 1
                         grep -c '@container' platform-v5/assets/css/bento.css                             # >= 1
single-action-accent     grep -c 'accent-action' platform-v5/assets/css/bento.css                         # CTA only; <= 2
no-linear-progress       grep -cE '<progress|progress-bar' platform-v5/index.html platform-v5/assets       # 0
zero-emoji               python3 scripts/v5_forbidden_audit.py (emoji)                                     # 0
no-inline-svg-in-js      grep -c '<svg' platform-v5/assets/js/bento.js                                     # 0
logical-props            python3 scripts/v5_logical_props_audit.py                                         # exit 0
no-max-width             grep -c 'max-width' platform-v5/assets/css/bento.css                              # 0 (cards size via grid/container)
```

## API contract
```js
Upg.bento.compose(domains) // -> [{ id, span:{w,h}, state, progress, nextLabel }]
Upg.bento.render(rootEl)   // composes + paints the home; idempotent
// data-state on each card in {in-progress, recent, available, completed, locked}
```

## Banned in this stage
- A uniform NxN grid of equal cards (defeats the Pulse).
- Any `max-width`/`margin-auto` centering (SPATIAL §1).
- A second persistent nav surface, breadcrumb, or top tabs.
- A linear `<progress>` bar (rings land δ3); an animated counter; a greeting "اهلا [اسم]".
- More than one `--accent-action` focal CTA on the screen (CHROMA single-accent rule).

## Commit
```
δ1: bento grid — verified: breakpoints=3 container_queries=1 emoji=0 inline_svg_js=0 logical_props=pass
```

## Acceptance
- Home renders Continue + Momentum + Domain grid + Ladder from `Upg.bento.render`.
- Resizing the viewport steps 4->3->2->1 columns; resizing a *card's slot* re-lays its
  internal content via `@container` (verifiable independently of viewport width).
- The in-progress domain occupies the largest cell; locked domains are smallest/muted.
- `scripts/v5_forbidden_audit.py` and `v5_logical_props_audit.py` exit 0.
- MORPH_PULSE logged in `state/PULSE_LOG.md` per `PULSE_LIBRARY §2`.
