# δ3 — BENTO RING

**Pillar:** δ (bento live) · **Stage:** 3 of 3 · **Pulse:** **RING_PULSE**

> Concrete reference: ATELIER_REFERENCE §3 (δ3) — prototype `.ring` (SVG
> `stroke-dasharray` from `--p`; `stroke: var(--accent-progress)`).
> Ported through doctrine tokens; the surprise is the *thickness*.

## Intent
Single SVG progress ring on the **focal** in-progress card. CHROMA §7 single-
accent-progress per screen rule is enforced: on the home screen, the only
element bearing `--accent-progress` is this one ring. Every other progress
indicator (metric cards, completion counts) reads in `--ink` weights only.

The ring is the visual companion to the focal card's daily training-scenario.
The number is rendered, not counted-up (Forbidden #4). The stroke is the Pulse.

## The Pulse — RING_PULSE
**The Surprise:** الحَلقة لا تَنمو في طول الـ stroke فقط — تَنمو في **عُمقه**.
كل ١٪ من التَقَدُّم يَزيد سُمك الـ stroke ميكروسكوبياً (2px → 6px على المَدى الكامل،
خَطياً بـ CSS calc()). عند تَجاوُز ٨٠٪، تَبدَأ chroma السِمسي في التَعَمُّق عَبر
CSS Relative Color Syntax: `hsl(from var(--accent-progress) h s calc(l - delta))`
حيث `delta` يَنمو من 0% عند 80٪ إلى 12% عند 100٪. النَتيجة: مَن أتقَنَ ٩٠٪ يَرى
خَطّاً سَميكاً مُشبَعاً؛ مَن بَدَأ يَرى خَطاً رَفيعاً عادياً. الـ progress يُقاس
بالعَين قَبل أن يُقرَأ بالرَقم.

**Reference Avoided:** Forbidden #11 (linear `<progress>` bar) **AND** the
AI-default that every dashboard ring is the same uniform thin stroke regardless
of progress — dribbble's "premium dashboards" overwhelmingly do exactly this.

**Inspired-by:** Wild Card #20 — Damascus knife-pattern (many folds, one edge).
The blade's wootz pattern *is* the proof of effort; the metal hardens with each
fold. Here, the ring's thickness *is* the proof of accumulated practice.

**User-Visible:** yes — visible on every load of the home; the focal card
carries the ring at all times. The thickness change is felt across users at
different stages, not perceptible per-tick.

**Originality Self-Score:** 4 — progress-ring stroke-thickening exists
(Apple Watch activity rings vary across days), but: (1) thickness tied to
progress fraction in a single calc, not an animation; (2) chroma deepening
past 80% via Relative Color Syntax compounds the signal in CSS-only; (3) one
ring per screen enforced; (4) honest value rendering; (5) single-accent rule
intact.

## Files
1. `platform-v5/assets/css/ring.css` (~110 lines) — `.ring` component:
   wrapper + `<svg>.ring-svg` + `.ring-track` + `.ring-bar` + `.ring-num`.
   `--ring-p` (0–100), `--ring-circ`, `stroke-dasharray`, `stroke-dashoffset`,
   stroke-width tied to `--ring-p` via calc(), Relative Color Syntax for
   chroma deepening past 80%, reduced-motion guard, forced-colors block.
2. `platform-v5/assets/js/ring.js` (~110 lines) — IIFE exposing `Upg.ring`:
   finds `[data-progress]` hosts (idempotent), injects SVG via createElementNS
   (zero inline `<svg>` strings), renders the percentage as Arabic-Indic
   digits via `toLocaleString('ar-EG-u-nu-arab')`. Emits `upg:ring:set` event
   when value changes.
3. `platform-v5/index.html` — add `data-progress="47"` to the focal
   `data-card="daily-focus"` card; link `ring.css`; script `ring.js`.

## API contract
```js
Upg.ring.mount(hostEl, value)          // injects/updates a ring on hostEl
Upg.ring.set(hostEl, value)            // updates value (idempotent)
Upg.ring.value(hostEl)                 // reads current value
Upg.ring.scan(scope?)                  // (re)scans [data-progress] in scope
// Triggers CustomEvent('upg:ring:set', {detail:{value, prev}})
```

## Forensic targets
```
data-progress hosts          grep -c 'data-progress=' platform-v5/index.html              >= 1
single-accent-progress       grep -c 'accent-progress' platform-v5/assets/css/ring.css    >= 1
relative-color-syntax        grep -c 'hsl(from'        platform-v5/assets/css/ring.css    >= 1
stroke-dasharray             grep -c 'stroke-dasharray' platform-v5/assets/css/ring.css   >= 1
stroke-dashoffset            grep -c 'stroke-dashoffset' platform-v5/assets/css/ring.css  >= 1
zero-emoji                   grep -P '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' (ring.*)    == 0
no-inline-svg-string         grep -E '<svg|innerHTML' platform-v5/assets/js/ring.js       == 0
no-hardcoded-hex             grep -oE '#[0-9a-fA-F]{6}' platform-v5/assets/css/ring.css   == 0
no-physical-dirs             grep -E '^\s*(left|right|margin-left|...):' ring.css         == 0
no-linear-progress           grep -E '<progress|progress-bar' platform-v5/                == 0
logical-props                python3 scripts/v5_logical_props_audit.py                    exit 0
node-check                   node --check platform-v5/assets/js/ring.js                   exit 0
```

## Banned in this stage
- A linear `<progress>` bar anywhere (Forbidden #11).
- More than one `--accent-progress` element on the home screen
  (CHROMA §7 single-accent rule).
- Any inline `<svg viewBox=...>` written into `ring.js` as a string —
  build via `document.createElementNS()` only.
- An animated count-up of the ring's centre value (Forbidden #4) — render
  the value directly.
- A hardcoded hex colour anywhere in ring.* — tokens only.
- `stroke-width` as a fixed pixel value — must be tied to `--ring-p`.

## Commit
```
δ3: حَلقة دَمَشقية — verified: data_progress=N accent_progress_uses=N hsl_from=N
                              stroke_dasharray=N stroke_dashoffset=N emoji=0
                              hex=0 inline_svg=0 progress=0 physical_dirs=0
                              logical_props=PASS node_check=ok lines=N
Pulse: RING_PULSE — الحَلقة تَنمو في عُمق الـ stroke لا في طوله؛ سُمك يَتَزايَد
                    من 2px إلى 6px مع التَقَدُّم، وعند ٨٠٪ يَتَعَمَّق اللَون.
       | Avoided: #11 (linear progress bar)
```

## Acceptance
- The home renders ONE accent-progress ring on the focal card.
- All forensic targets above pass.
- `Upg.ring.mount/set/value/scan` exist on `window.Upg`.
- The ring's percentage is rendered as Arabic-Indic digits, not counted up.
- `prefers-reduced-motion: reduce` collapses the dashoffset transition.
- Pillar δ is complete: 3/3 stages, 6/15 pulses, 6/9 categories.
