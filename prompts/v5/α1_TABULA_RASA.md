# α1 — TABULA RASA

**Pillar:** α (foundation) · **Stage:** 1 of 4 · **Pulse:** none (α has no pulses)

## Intent
Demolition inventory + clean room. Inventory v4's classic chrome, declare a quarantine list, and create the empty `platform-v5/` skeleton. **No copying yet** — this stage produces an empty house with the doors marked.

## Forensic targets
```
classic-sidebar-hits     = grep -cE 'class="sidebar"|id="sidebar"|class="topbar"|class="drawer"' platform/index.html
fixed-position-chrome    = grep -cE 'position:\s*fixed' platform/assets/css/chrome.css
max-width-containers     = grep -cE 'max-width:\s*[0-9]+(px|rem|ch)' platform/assets/css/pages.css | head -1
emoji-in-original        = grep -rcP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}\x{FE0F}]' platform/index.html
hardcoded-hex-in-markup  = grep -cE 'style="[^"]*#[0-9a-fA-F]{3,6}' platform/index.html
```
Print each → record as the *baseline* in `state/TRUTH_LEDGER.md`.

## Files created
1. `platform-v5/` (directory)
2. `platform-v5/.gitkeep`
3. `platform-v5/DEMOLITION_LIST.md` — explicit list of v4 chrome elements that v5 will NOT carry over (sidebar, topbar, drawer, fixed footer, world palettes, modal patterns)
4. `platform-v5/assets/.gitkeep`
5. `platform-v5/assets/css/.gitkeep`
6. `platform-v5/assets/js/.gitkeep`
7. `platform-v5/assets/svg/.gitkeep`

## Files NOT touched
- Anything under `platform/` (v4 stays as a peer reference for content reuse in ε pillar later)
- Anything under `archive/`
- Any prompt outside `prompts/v5/`

## Verify
- `ls platform-v5/` shows the skeleton.
- `cat platform-v5/DEMOLITION_LIST.md` reads as a clear inventory.
- `git status` shows additions only.

## Commit
```
α1: tabula rasa — verified: classic_chrome_hits=<N> emoji_in_original=<N> skeleton=created
```

## Acceptance
- Skeleton exists.
- Baseline forensic numbers recorded in `state/TRUTH_LEDGER.md`.
- 0 lines of code in `platform-v5/` (only `.gitkeep` files + `DEMOLITION_LIST.md`).
- 0 changes outside `platform-v5/` and `state/`.
