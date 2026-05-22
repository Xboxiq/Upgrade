# `scripts/` — Upgrade automation

> Helpers used by Workers across the Pack v1/v2/v3 lineage. All scripts are idempotent and version-controlled.

## TASMEEM (Worker 20 / Pack v3)

Local-font bootstrap. Run **once on a machine with network**, never inside the Kiro sandbox (which blocks external HTTPS).

| Script | Purpose | When |
|--------|---------|------|
| `worker-20-bootstrap.sh`        | Orchestrator: deps check → download → subset → verify. **Run this one.** | Phase 2 binary acquisition |
| `worker-20-download-fonts.sh`   | Pure-curl downloader, reads `platform/assets/fonts/MANIFEST.json`         | Called by bootstrap |
| `worker-20-subset-fonts.py`     | `pyftsubset`-based subsetter, writes final `.woff2`                       | Called by bootstrap |

### Quick start

```bash
# 1. Install Python font tools (one-time per machine)
pip install 'fonttools[woff]' brotli

# 2. Run the bootstrap
bash scripts/worker-20-bootstrap.sh

# 3. Commit the resulting binaries
git add platform/assets/fonts/
git commit -m "phase 2 (devotio): font binaries populated locally"
git push
```

### What it does

1. **Reads** `platform/assets/fonts/MANIFEST.json` (9 families · 22 expected files).
2. **Downloads** each entry from its official OFL repo:
   - `github.com/google/fonts` — Aref Ruqaa, Reem Kufi, Cairo, Tajawal, Readex Pro
   - `github.com/IBM/plex` — IBM Plex Sans Arabic
   - `github.com/rsms/inter` — Inter
   - `github.com/JetBrains/JetBrainsMono` — JetBrains Mono
   - `github.com/undercasetype/Fraunces` — Fraunces
3. **Subsets** with `pyftsubset` to Arabic + Latin Basic ranges defined in `MANIFEST.subset_targets`. Drops 70–85% of glyphs.
4. **Verifies** file count, license presence, and total payload (target ≤ 320 KB).

### Re-runnability

- Already-downloaded sources are skipped if non-empty.
- Already-subsetted `.woff2` files are skipped if newer than `MANIFEST.json`.
- The only way to force a refresh is to `touch MANIFEST.json` or delete a file by hand.

### Discipline

- **Never** add a font outside `MANIFEST.json` — that file is the contract.
- **Never** edit a generated `.woff2` by hand — re-run the bootstrap.
- License files (`OFL.txt`, `LICENSE.txt`) are downloaded automatically and **must be committed** alongside the binaries.

---

## Worker 17 (Pack v2 / Resonance) — historical

| Script | Purpose |
|--------|---------|
| `worker-17-block-schema.mjs`  | Block taxonomy injector (Phase 1) |
| `worker-17-tldr-takeaways.py` | TL;DR & key-takeaways injector (Phase 2) |
| `worker-17-pitfalls.py`       | Pitfalls & diagnostics injector (Phase 3) |
| `worker-17-pace.py`           | Mastery & focus-timer injector (Phase 6) |
| `worker-17-bridges.py`        | Cross-references & in-page bridges injector (Phase 5) |

These are kept for reference and are **not** to be re-run on production HTML — they are idempotent in design but their work is already merged.
