# θ2 — A11Y_SEAL (Pillar θ — POLISH · 0 pulses · the v5 seal)

> *«الإتاحة ليست مِيزة تُضاف — هي شَرط الوُجود. والخَتم لا يُعلَن إلا بِبُرهان.»*
>
> Final stage of v5. Authored at execution time per `AUTO_PILOT_v5.md` boot
> step 4. θ is verify-and-seal: **no Pulse**, only verified counts.

## Intent

Seal v5: make `platform-v5` pass the manifesto §8 / INDEX exit criteria with
a **grep-verifiable forbidden audit that exits 0**, confirm the accessibility
posture, and write the `[v5.0.0] — TADAFFUQ` CHANGELOG entry that lists every
shipped stage with its `verified by` line (exit criterion §7).

## Doctrine guardrails

- **ICONOGRAPHY §7** — every icon is decorative (`aria-hidden`), or named via
  host (`aria-label`), or `role="img"`+label. Baseline already met (23/23).
- **Manifesto §5.10** — `!important` only in the motion-sanctuary block.
- **Manifesto §5.2 / ICONOGRAPHY §1** — zero emoji anywhere under `platform-v5/`.
- **CHROMA §6** — every surface has a `forced-colors: active` fallback.
- **CHROMA §7** — single `--accent-progress` / `--accent-action` per screen.

## Baseline (forensic scan)

```
skip-link / html lang+dir          = 1 / 1+1            ✓
icons aria-hidden / total          = 23 / 23            ✓
icon-only buttons w/ aria-label    = 12                 ✓
focus-visible rules (css)          = 8                  ✓
forced-colors blocks               = 17 (all files)     ✓
emoji files under platform-v5/     = DEMOLITION_LIST.md ✗ (1 hit, line 46)
!important (non-sanctioned)        = bento-expand 7 + dock-mobile 1 = 8  ✗
v5_forbidden_audit.py              = absent             ✗ (exit criterion §6)
CHANGELOG [v5.0.0] entry           = absent             ✗ (exit criterion §7)
```

## Changes

1. **Remove the 8 non-sanctioned `!important`** (manifesto §5.10). They were
   never necessary:
   - `bento-expand.css` (7×) — `.bento-card[data-expanded="true"]` has
     specificity (0,2,0) and already outranks the `.b-4x3`/`.b-2x2`/… span
     classes (0,1,0); the responsive narrowing resolves by source order
     among equal-specificity `[data-expanded]` rules. Behaviour identical.
   - `dock-mobile.css` (1×) — `dock-mobile.css` loads after `dock.css` in the
     same `@layer components`; `.dock`(0,1,0) later-source beats the earlier
     `.dock{display:none}`. No `!important` needed.
   The only `!important` that remains is the **motion-sanctuary** (canvas.css
   reduced-motion block + the reduced-motion `transition:none` collapses) and
   the universal `[hidden]{display:none !important}` reset — both documented
   and recognised by the audit as sanctioned.

2. **Purge the last emoji.** `DEMOLITION_LIST.md:46` quotes legacy glyphs
   while documenting their removal — replace with their Lucide semantic-key
   names so the whole `platform-v5/` tree is emoji-free.

3. **`scripts/v5_forbidden_audit.py` (NEW)** — the seal gate (exit criterion
   §6). FAILs on: any emoji under `platform-v5/`; a hardcoded hex outside
   `tokens.css` + the `theme-color` meta; `!important` outside the sanctioned
   set; a fixed sidebar (`position:fixed` + `inset-inline-start/left:0` + a
   width); a `<progress>` bar; a toast; an inline `<svg viewBox>` outside the
   sprite; a heavy blur ≥12px. Exits 0 when the tree is clean.

4. **`CHANGELOG.md` — `[v5.0.0] — TADAFFUQ`** — lists all 24 stages with their
   `verified by` SHAs and the 15 pulses across 9 categories.

## Verify

Re-run the forbidden audit (exit 0), the perf audit (exit 0), the logical-props
audit (exit 0); serve over HTTP (200). Before/after `!important` and emoji
tables in the ledger. Set `PROGRESS.tadaffuq_v5.status = "complete"`.
