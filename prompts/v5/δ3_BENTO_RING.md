# δ3 — BENTO RING

**Pillar:** δ (bento live) · **Stage:** 3 of 3 (closes pillar δ) · **Pulse:** **RING_PULSE**

> Concrete reference: `ATELIER_REFERENCE.md §3 (δ3)` + prototype anchor
> `prototype/atelier/` → `.ring` (SVG `stroke-dasharray` from `--p`). In v5 the live ring
> strokes `--accent-progress` (neon cyan), one per screen (CHROMA §7).

## Intent
Progress is a **ring**, never a bar (Forbidden #11). The focal (in-progress) card carries
the single live progress ring on the screen, stroked in `--accent-progress`. All other
cards' rings render muted (`--ink-faint` track tone) so exactly one ring "lives" at a time.
The ring fills via `stroke-dashoffset` using **The Settle** (MOTION §3.3) — no count-up.

## The Pulse — RING_PULSE
**The Surprise:** الحَلقة الحَيّة ليست دائرة واحِدة مُصمَتة. هي مُقَسَّمة إلى ثَلاث قِطَع تُمَثِّل
رُتَب الإتقان (أساس / مُمارِس / خَبير)، ولا "تَكتَمِل" بَصَرياً إلا عِند ١٠٠٪ حَيث تَنطَبِق القِطَع
في حَلقة واحِدة مُتَّصِلة. وكُلَّما اقتَرَب التَقَدُّم من ١٠٠٪ يَزداد سُمك الـ stroke قَليلاً
(`--ring-w` يَكبَر مَع `--p`) — فالقُرب من الإتمام مَحسوس بَصَرياً قَبل أن يُقرأ رَقماً.
**Reference Avoided:** Forbidden #11 (linear progress bar) + Forbidden #4 (count-up).
**Inspired-by:** Wild Card #1 (Iznik tiles, Topkapi — radial geometry that resolves only at
the seventh repetition): the ring's geometry *resolves* only at completion.
**User-Visible:** yes (focal), subtle (the thickening) — proximity is felt, then read.
**Originality Self-Score:** 4 — segmented-by-mastery + proximity-thickening, single live ring.

## Files
1. `platform-v5/assets/js/ring.js` (~90 lines) — IIFE exposing `Upg.ring`: builds the SVG
   ring (track + up-to-3 tier segments) via DOM (no inline `<svg>` string), computes
   circumference, sets `--p` per segment, drives the Settle. Reads tier data from the
   bento progress model (δ1). Exactly one ring may hold `data-live="true"`.
2. `platform-v5/assets/css/ring.css` (~70 lines) — `.ring` sizing, `.ring .track`
   (`--ink-faint` tone), `.ring .seg` (`stroke: var(--accent-progress)` only when
   `[data-live="true"]`, else muted), `--ring-w` thickening tied to `--p`, the `.settle`
   transition (`stroke-dashoffset var(--duration-morph) var(--ease-emerge)`), reduced-motion
   path (instant fill, dot fallback for the "live" signal).
3. `platform-v5/index.html` — focal card hosts the live ring; wire files.

## Forensic targets
```
ring-not-bar           grep -cE '<progress|progress-bar|width: *[0-9]+%.*fill' platform-v5/assets   # 0
progress-accent        grep -c 'accent-progress' platform-v5/assets/css/ring.css                    # >= 1
single-live-ring       grep -c 'data-live' platform-v5/assets/js/ring.js                            # >= 1 (enforced single)
the-settle             grep -c -- '--duration-morph' platform-v5/assets/css/ring.css                # >= 1
no-countup             grep -ciE 'requestAnimationFrame.*count|innerText *= *i\b' platform-v5/assets/js/ring.js  # 0
no-inline-svg-string   grep -c "'<svg" platform-v5/assets/js/ring.js                                 # 0 (build via createElementNS)
reduced-motion         grep -c 'prefers-reduced-motion' platform-v5/assets/css/ring.css             # >= 1
zero-emoji / logical   v5_forbidden_audit.py + v5_logical_props_audit.py                            # 0 / exit 0
```

## API contract
```js
Upg.ring.mount(el, { value, tiers, live }) // tiers: [{key,value}] up to 3; live: boolean
Upg.ring.set(el, value)                     // updates via Settle; no count-up
// invariant: at most ONE ring in the document has data-live="true" at any time
```

## Banned in this stage
- A linear bar, a `<progress>`, or a width-% fill anywhere.
- More than one live (cyan) ring on the screen at once.
- A count-up animation toward the value.
- An inline `'<svg>…'` string in JS (build with `document.createElementNS`).
- A `--ring-w` that jumps (it eases with `--p`, bounded so it never breaks layout).

## Commit
```
δ3: bento ring — verified: progress_bars=0 accent_progress=1 single_live=1 settle=1 countup=0 logical_props=pass
```

## Acceptance
- The focal card shows one cyan, tier-segmented ring that fills via the Settle.
- Non-focal rings render muted; never two cyan rings at once.
- Stroke thickens subtly as value → 100%; segments resolve into one ring at 100%.
- Reduced-motion fills instantly and shows the static "live" dot signal.
- Closes pillar δ: open the **δ PR** (`tadaffuq-δ-bento-live` → main) per AUTO_PILOT_v5.
- RING_PULSE logged. (Pivot check: δ1 MORPH -> δ2 REVEAL -> δ3 RING — three distinct.)
