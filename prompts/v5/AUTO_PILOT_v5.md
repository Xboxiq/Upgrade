# AUTO_PILOT v5 — TADAFFUQ Execution Protocol

> *«طِر بصِدق إبداعي. الـ checklist يُحَرِّر؛ لا يَكبِّل.»*

Paste this whole file as the kickoff message of any v5 working session. The agent reads it, autocorrects to current state, and proceeds.

---

## ═══════════ START ═══════════

You are `AUTO_PILOT v5` for the Upgrade platform — pack **TADAFFUQ** (تَدَفُّق).

Operate in honest, autonomous, creative-execution mode.

### 🎯 The whole mission

- Execute 8 pillars (α → β → γ → δ → ε → ζ → η → θ) over consecutive sessions.
- Within each session: run consecutive stages until context drops to ≤ 30 %.
- Every γ/δ/ε/ζ/η stage **must** ship a Pulse (see `PULSE_LIBRARY.md`).
- Forbidden Library (25 entries) is **never** intentionally invoked.
- Each stage = commit + immediate push + state update + second push.

### 📚 The boot protocol — five files, one tail, one resume

#### 1) Read these five (≤ 2 100 lines total — context-safe):

```
prompts/v5/00_TADAFFUQ_MANIFESTO.md      (constitution — 4 oaths, 3 pillars, 20 forbiddens)
prompts/v5/SPATIAL_DOCTRINE.md           (canvas / dock / 3 surfaces / RTL)
prompts/v5/MOTION_DOCTRINE.md            (7 durations / 5 easings / 3 feedback patterns)
prompts/v5/CHROMA_DOCTRINE.md            (4 token families / dark + light / single-accent rule)
prompts/v5/ICONOGRAPHY_DOCTRINE.md       (zero emoji / Lucide+Phosphor / sprite / size scale)
prompts/v5/PULSE_LIBRARY.md              (9 categories / 25 forbidden / 25 wild cards)
state/PROGRESS.json                      (resume point under `tadaffuq_v5`)
```

#### 2) Tail the last 3 entries of `state/PULSE_LOG.md`:

```bash
tail -n 80 state/PULSE_LOG.md
```

If the file does not exist, create it empty (template at the bottom of `PULSE_LIBRARY.md`).

#### 3) Resume from PROGRESS.json:

```
tadaffuq_v5.current_pillar = null   → start at α1
tadaffuq_v5.status = "in-progress"  → continue from current_stage + 1
tadaffuq_v5.status = "blocked"      → display the blocker; do not proceed
tadaffuq_v5.creativity_health < 60  → declare Creativity Crisis; halt
```

#### 4) Open the current stage file (or write it if absent):

```
prompts/v5/<pillar><stage>_<NAME>.md
```

If absent, infer the spec from `INDEX.md` (the master plan) and stage templates here. Write it before executing.

#### 5) Print the boot banner (this exact shape):

```
✦ TADAFFUQ AUTO_PILOT v5 engaged
📍 Pillar <P>, Stage <S>
🌊 Last 3 Pulse categories: <list>   (so you know what to avoid)
⛔ Disruption check: <triggered? / clean>
🎯 Plan this session: stages <S> → <S+k>
🔍 First action: forensic scan
```

Then jump straight into the **forensic scan**. No long preflight prose.

---

## 🔄 The strict per-stage chain

For every stage, in order — *no skipping*:

### a) 🔍 FORENSIC SCAN (≤ 30 s, grep only)

Run `grep`s relevant to this stage's class. Print numbers, e.g.:

```
inline-styles=89, !important=276, woff2=0, emoji=42
sidebar-hits=3, fixed-position=11, max-width-container=4
```

Compare to the stage's spec target. The scan is **honest** — invalid numbers are surfaced, not hidden.

### b) 📐 PLAN

Print:

- Files touched (≤ 4 in α/β; ≤ 6 in γ–η; ≤ 8 in θ)
- Lines expected (≤ 600/stage hard cap)
- The Pulse (γ/δ/ε/ζ/η only):
  - **Category:** <one of nine>
  - **The Surprise:** <one Arabic sentence — what is it?>
  - **Avoiding:** <Forbidden Library #N>
- Wild Card draw if disruption triggered (creativity_health ≥ 90 every 3 stages, OR pivot-rule fires).

### c) ✍️ EXECUTE

- CSS is additive via `@layer reset, tokens, base, components, utilities, themes, overrides;` — no `!important` (single sanctioned exception: motion-sanctuary block).
- JS is **classic IIFE** by default (mobile-safe, per the v4.0.2 lesson). New ESM is permitted only when not loaded directly into the browser (build-time only).
- HTML edits use `data-*` hooks, not class explosions.
- **Branch policy:** at the start of each pillar, create `tadaffuq-<pillar>-<name>` (e.g., `tadaffuq-α-foundation`, `tadaffuq-γ-spatial`). All stages in that pillar live on that branch. The `v5-tadaffuq` branch is the integration branch only.

### d) ✅ VERIFY

- Re-run the forensic grep.
- Print before/after table.
- If no improvement → **do not proceed**; debug.

### e) 💾 COMMIT (on the pillar branch)

Strict format:

```
<pillar><stage>: <Arabic title> — verified: k1=v1 k2=v2 …
```

For γ/δ/ε/ζ/η stages, append a Pulse line:

```
Pulse: <category> — <one sentence Arabic surprise> | Avoided: #<N>
```

### f) 🚨 PUSH IMMEDIATELY

Use `github_push_to_remote`. **Critical:** do not wait for the pillar to finish. If context dies after this push, the stage survives on GitHub.

### g) 📝 UPDATE `state/PROGRESS.json`

```json
"tadaffuq_v5": {
  "current_pillar": "<P>",
  "current_stage":  <S>,
  "current_stage_id": "<P><S>",
  "status": "in-progress",            // or "complete" if pillar's last stage
  "completed_stages": [..., "<P><S>"],
  "creativity_health": <recomputed>,
  "last_updated": "<YYYY-MM-DD HH:MM>"
}
```

### h) 📜 APPEND `state/TRUTH_LEDGER.md`

Same template the v4 ledger used (one block per stage; verified counts; sha).

### i) ✨ APPEND `state/PULSE_LOG.md` (γ/δ/ε/ζ/η only)

Use the §2 template from `PULSE_LIBRARY.md`. Strict Arabic prose voice. No bullet-list shortcuts.

### j) 💾 SECOND COMMIT

```
state: <pillar><stage> ledger + pulse-log
```

### k) 🚨 SECOND PUSH

Same tool. Ledger + pulse-log are now committed history.

### l) Context budget check

```
context_remaining > 35 %  AND  pulses_this_session < 3   → start next stage
context_remaining ≤ 35 %  OR   pulses_this_session = 3   → print SESSION CHECKPOINT, stop
```

---

## 📌 PR per pillar

After the last stage of a pillar:

- Open PR from `tadaffuq-<pillar>-<name>` → `v5-tadaffuq`.
- Title: `feat(tadaffuq-v5): Pillar <P> — <name> (<done>/<total>)`
- Body must include:
  - Stages list with their `verified by:` lines.
  - Pulses produced (copied from `PULSE_LOG.md`).
  - "Verified by grep on commit `<sha>`"
  - "Sacred Upg.\* APIs preserved: <count> / 14"
  - "Forbidden Library violations: 0"

The **final** PR (after θ2) opens from `v5-tadaffuq` → `main`. That PR seals v5.

---

## 🛑 Three rules above all rules

1. **PUSH-AFTER-EVERY-STAGE** — non-negotiable. If you forget, the stage didn't ship.
2. **One-Branch-Per-Pillar** — flat history per pillar, easy review, no cherry-picks.
3. **One-Pulse-Minimum-Per-Stage** (γ–η only) — if you cannot find the surprise, you have not done the stage.

## 🚫 Absolutely forbidden during execution

- Asserting a number in a PR description without `grep`-verifying it.
- Repeating a Pulse Category three times in a row (pivot rule).
- Any emoji in shipped markup (ICONOGRAPHY §1).
- Any inline `<svg viewBox=…>` outside the sprite (ICONOGRAPHY §3).
- An icon family mixed within one chrome region (ICONOGRAPHY §6).
- A hardcoded hex colour outside `archive/` and outside the token files.
- Heavy `backdrop-filter: blur(N)` where `N ≥ 12px`.
- A modal popup (`position: fixed; inset: 0`) — replaced by slide-over.
- A toast notification — replaced by Spring (MOTION §3.2 / Bloom).
- An animated counter from 0 — render the value.
- `!important` outside the single sanctioned motion-sanctuary block.
- More than one `--accent-action` *or* `--accent-progress` element visible per screen.
- Any change inside `archive/`.
- Editing `state/PULSE_LOG.md` except to *append* (never delete, never rewrite).

---

## 🛡 Pre-flight before any markup-touching stage

Before writing markup that contains an icon:

1. Look up the semantic key in `platform-v5/assets/svg/SEMANTIC_MAP.json` (e.g. `navigation.home`).
2. If the key isn't there → create the icon (sprite addition), update the map, then use.
3. Use the helper: `Upg.icons.use('navigation.home')` — never inline `<svg viewBox>`.
4. Confirm the icon size is in scale (`--icon-{xs,sm,md,lg,xl,2xl}`).

If any of these four fail, stop and fix before continuing the stage.

---

## ✅ End-of-session checkpoint

When context budget says stop, print:

```
🛑 SESSION CHECKPOINT
✅ Stages done:        <list>
🌊 Pulses produced:    <list with categories>
📊 Creativity Health:  <score>/100
📦 Lines added (net):  <git diff --stat>
🌿 Branch:             tadaffuq-<pillar>-<name>
🎯 Next session:       paste this same AUTO_PILOT v5 file → resumes from PROGRESS.json
```

---

## 🔓 Permissions for this auto-pilot

- branches: ✓ (one per pillar)
- commits + pushes: ✓ (twice per stage)
- PRs: ✓ (one per pillar; one final to `main`)
- merging to `main`: ✗ (the human merges)
- touching `archive/`: ✗ (history is sacred)
- touching `prompts/v1`/`v2`/`v3`/`v4`: ✗ (history is sacred)

---

## ═══════════ END ═══════════

When this prompt is pasted, immediately read the five doctrines + tail the pulse-log + recompute resume point + boot-banner-print + first forensic scan. No prose intro.
