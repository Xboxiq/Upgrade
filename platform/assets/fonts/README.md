# `platform/assets/fonts/` — Local Font Atelier

> **TASMEEM v3 / Worker 20 / Phase 2 — Local Font Load.**
> Zero CDN. Zero network at runtime. All 9 families served from this directory.
> Licenses: OFL 1.1 (SIL) for all 9 families — see each `<family>/OFL.txt` (or `LICENSE.txt` for IBM Plex).

## The 9 families (single source of truth: `MANIFEST.json`)

| Folder | CSS family | Voice role | Files | License |
|--------|------------|-----------|------:|---------|
| `aref-ruqaa/`     | Aref Ruqaa            | accent (ceremonial display)              | 2 | OFL 1.1 |
| `reem-kufi/`      | Reem Kufi             | display (large headings)                 | 1 (variable) | OFL 1.1 |
| `cairo/`          | Cairo                 | fallback (every stack)                   | 3 | OFL 1.1 |
| `tajawal/`        | Tajawal               | ui (buttons / labels / inputs)           | 4 | OFL 1.1 |
| `ibm-plex-arabic/`| IBM Plex Sans Arabic  | numeric (qcalc) + body                   | 5 | OFL 1.1 |
| `readex-pro/`     | Readex Pro            | text (long-form body)                    | 1 (variable) | OFL 1.1 |
| `inter/`          | Inter                 | latin (UI in `:lang(en)`)                | 1 (variable) | OFL 1.1 |
| `jetbrains-mono/` | JetBrains Mono        | mono (code) + numeric secondary          | 3 | OFL 1.1 |
| `fraunces/`       | Fraunces              | quote-literary (English pull-quotes)     | 2 (variable, roman + italic) | OFL 1.1 |
| `thmanyah/`       | Thmanyah (legacy slot)| optional premium (W12 P1B holdover)      | (BYO, not in bootstrap) | proprietary |

> **Total expected after bootstrap:** 22 `.woff2` files, ≤ 320KB combined.

## Bootstrap (one-time, on a machine with network)

```bash
# From repo root:
bash scripts/worker-20-bootstrap.sh
```

This calls, in order:
1. `scripts/worker-20-download-fonts.sh` — fetches every entry in `MANIFEST.json` from its official OFL repo (`github.com/google/fonts`, `github.com/IBM/plex`, `github.com/rsms/inter`, `github.com/JetBrains/JetBrainsMono`, `github.com/undercasetype/Fraunces`).
2. `scripts/worker-20-subset-fonts.py` — runs `pyftsubset` (fonttools) per family with the unicode-range from `MANIFEST.json`. Drops unused glyphs, converts `.ttf` → `.woff2`, removes the source `.ttf`.
3. Verifies file count and total payload, fails loud if any expected file is missing.

After it completes:
```bash
git add platform/assets/fonts/
git commit -m "phase 2 (devotio): font binaries populated locally (22 files, NNN KB)"
git push
```

Then Worker 20 Phase 3 (Voice Bindings) is unblocked.

## Why this was scaffolded but not executed in-agent

The Pack v3 sandbox runs in `INTEGRATIONS_ONLY` network mode — only the git proxy reaches the outside world. `github.com/raw`, `fonts.gstatic.com`, and `pypi` all return `403 Forbidden`. The agent therefore prepared the **infrastructure**: folders, MANIFEST, scripts, READMEs, license placeholders. The owner runs the bootstrap once on their workstation, where ordinary HTTPS works.

This is consistent with DEVOTIO doctrine: *the network is allowed precisely once, to leave the network forever.*

## Discipline rules

1. **Never** add a font outside `MANIFEST.json`. The manifest is the contract.
2. **Never** add a CDN `<link>` back to `index.html` for any of these families.
3. **Never** edit a generated `.woff2` by hand — re-run `worker-20-bootstrap.sh`.
4. Per-family subset must keep payload ≤ 100KB. If a family exceeds it, deepen the unicode-range.
5. Each family folder must contain its license file (`OFL.txt` or `LICENSE.txt`) committed alongside the binaries.

## Thmanyah note

The `thmanyah/` folder is a **legacy slot** kept from W12 P1B. Thmanyah is a proprietary commercial face — it is **not in `MANIFEST.json`** and is **not** downloaded by the bootstrap. If the owner has a private license, they may drop the four `.woff2` files into that folder manually; the existing `@font-face` declarations in `style.css` (lines ~16230) will pick them up automatically. If they remain absent, the stack falls through to Reem Kufi → Aref Ruqaa → Cairo, which is by design.
