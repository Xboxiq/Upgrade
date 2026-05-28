# β3 — LANG SHIM (RTL contract audit)

**Pillar:** β · **Stage:** 3 of 3 · **Pulse:** none

## Intent
The RTL contract is enforced at lint time. v5 forbids physical `left:` and `right:` properties in shipped CSS — only logical properties (`inline-start`, `inline-end`, `block-start`, `block-end`, `inset-block`, `inset-inline`).

## Forensic targets
- physical `left:` / `right:` declarations in `platform-v5/assets/css/`: 0 (audit script enforces)
- logical-property uses in `platform-v5/assets/css/`: ≥ 20

## Files
1. `scripts/v5_logical_props_audit.py` — audit script: walks `platform-v5/assets/css/`, scans for banned physical-direction declarations, exits 1 on violation
2. `prompts/v5/β3_LANG_SHIM.md` — this file

## The audit
Banned (in `platform-v5/assets/css/`):
- `^\s*left:` / `^\s*right:` (use `inset-inline-start` / `inset-inline-end`)
- `^\s*top:` / `^\s*bottom:` (use `inset-block-start` / `inset-block-end`) — *exception: top/bottom inside transform-origin or media-query inner; not in declarations*
- `^\s*margin-left:` / `^\s*margin-right:` (use `margin-inline-start` / `margin-inline-end`)
- `^\s*padding-left:` / `^\s*padding-right:` (use `padding-inline-start` / `padding-inline-end`)
- `^\s*border-left:` / `^\s*border-right:` (use `border-inline-start` / `border-inline-end`)
- `^\s*text-align:\s*(left|right);` (use `text-align: start;` / `text-align: end;`)

Exempted: archive/, prompts/, the original platform/ (v4), node_modules, anything outside `platform-v5/assets/css/`.

## Acceptance
- `python3 scripts/v5_logical_props_audit.py` exits 0 on the current tree
- 0 physical-direction declarations
- Audit can be wired into CI later (θ pillar)
