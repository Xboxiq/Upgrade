#!/usr/bin/env python3
# ════════════════════════════════════════════════════════════════════════════
# TASMEEM v3 — Worker 20 / Phase 2 — Font Subsetter (Tier 2)
# Reads platform/assets/fonts/MANIFEST.json. For every entry whose source
# format is .ttf or .ttf-variable, runs pyftsubset on the downloaded
# <out>.src.ttf, writing the subsetted result to <out>.woff2 and removing
# the source. For source_format == "woff2", a re-subset is applied in-place
# (drops glyphs outside the subset range, keeps file as woff2).
# Idempotent: a font with a recent .woff2 newer than MANIFEST.json is
# considered up-to-date and skipped.
# Requires fonttools (`pip install 'fonttools[woff]' brotli`).
# ════════════════════════════════════════════════════════════════════════════
from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = ROOT / "platform" / "assets" / "fonts" / "MANIFEST.json"
FONTS_DIR = ROOT / "platform" / "assets" / "fonts"


def fail(msg: str, code: int = 2) -> None:
    print(f"\u2717 {msg}", file=sys.stderr)
    sys.exit(code)


def need_pyftsubset() -> str:
    exe = shutil.which("pyftsubset")
    if not exe:
        fail("pyftsubset not on PATH — install via `pip install 'fonttools[woff]' brotli`")
    return exe


def kb(path: Path) -> float:
    return path.stat().st_size / 1024.0


def is_up_to_date(out_path: Path) -> bool:
    if not out_path.exists():
        return False
    if not MANIFEST_PATH.exists():
        return True
    return out_path.stat().st_mtime >= MANIFEST_PATH.stat().st_mtime


def run_subset(
    pyftsubset: str,
    src: Path,
    dst: Path,
    unicode_range: str,
) -> None:
    cmd = [
        pyftsubset,
        str(src),
        f"--output-file={dst}",
        f"--unicodes={unicode_range}",
        "--layout-features=*",
        "--no-hinting",
        "--desubroutinize",
        "--name-IDs=*",
        "--name-legacy",
        "--name-languages=*",
        "--notdef-outline",
        "--recommended-glyphs",
        "--flavor=woff2",
    ]
    subprocess.run(cmd, check=True)


def main() -> int:
    if not MANIFEST_PATH.exists():
        fail(f"MANIFEST.json not found at {MANIFEST_PATH}")

    pyftsubset = need_pyftsubset()
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    subset_targets: dict[str, str] = manifest["subset_targets"]
    families = manifest["families"]

    total_kb_before = 0.0
    total_kb_after = 0.0
    processed = 0
    skipped = 0
    failed = 0

    print("\U0001f170\ufe0f  TASMEEM subsetter — pyftsubset @ "
          + subprocess.run([pyftsubset, "--help"], capture_output=True, text=True)
            .stdout.split("\n", 1)[0]
          .strip())
    print()

    for family in families:
        fam_id = family["id"]
        fam_name = family["css_name"]
        subset_key = family["subset"]
        if subset_key not in subset_targets:
            fail(f"family {fam_id} references unknown subset target: {subset_key}")
        unicode_range = subset_targets[subset_key].replace(" ", "")

        family_dir = FONTS_DIR / fam_id
        if not family_dir.is_dir():
            fail(f"family folder missing: {family_dir}")

        print(f"\u2500\u2500 {fam_name} ({fam_id}) \u2500\u2500 subset={subset_key}")

        for entry in family["files"]:
            out_name = entry["out"]
            src_format = entry["source_format"]
            out_path = family_dir / out_name

            if src_format == "woff2":
                # Already woff2: re-subset in place via temp.
                if not out_path.exists():
                    print(f"  \u2717 missing source: {out_name}")
                    failed += 1
                    continue
                if is_up_to_date(out_path):
                    print(f"  \u21b7 skip (up-to-date): {out_name}")
                    skipped += 1
                    continue
                size_before = kb(out_path)
                with tempfile.NamedTemporaryFile(
                    suffix=".woff2", delete=False
                ) as tmp:
                    tmp_path = Path(tmp.name)
                try:
                    run_subset(pyftsubset, out_path, tmp_path, unicode_range)
                    shutil.move(str(tmp_path), str(out_path))
                except subprocess.CalledProcessError as exc:
                    print(f"  \u2717 subset failed for {out_name}: {exc}")
                    if tmp_path.exists():
                        tmp_path.unlink()
                    failed += 1
                    continue
                size_after = kb(out_path)
                total_kb_before += size_before
                total_kb_after += size_after
                processed += 1
                print(f"  \u2713 {out_name} \u2014 {size_before:.1f}\u2192{size_after:.1f} KB")
                continue

            # ttf or ttf-variable
            src_path = family_dir / out_name.replace(".woff2", ".src.ttf")
            if not src_path.exists():
                if out_path.exists() and is_up_to_date(out_path):
                    print(f"  \u21b7 skip (up-to-date): {out_name}")
                    skipped += 1
                    continue
                print(f"  \u2717 missing source: {src_path.name}")
                failed += 1
                continue
            size_before = kb(src_path)
            try:
                run_subset(pyftsubset, src_path, out_path, unicode_range)
            except subprocess.CalledProcessError as exc:
                print(f"  \u2717 subset failed for {out_name}: {exc}")
                failed += 1
                continue
            size_after = kb(out_path)
            total_kb_before += size_before
            total_kb_after += size_after
            processed += 1
            print(f"  \u2713 {out_name} \u2014 {size_before:.1f}\u2192{size_after:.1f} KB")
            # Drop the .src.ttf — its job is done.
            src_path.unlink(missing_ok=True)

        print()

    print("\u2500\u2500 summary \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500")
    print(f"   processed: {processed}")
    print(f"   skipped:   {skipped}")
    print(f"   failed:    {failed}")
    print(f"   payload:   {total_kb_before:.0f} KB \u2192 {total_kb_after:.0f} KB"
          f" ({(1 - total_kb_after / max(total_kb_before, 1)) * 100:.0f}% smaller)")
    print()
    target_max = manifest.get("totals", {}).get("target_total_size_kb_max", 320)
    if total_kb_after > target_max:
        print(f"\u26a0  payload {total_kb_after:.0f} KB exceeds target {target_max} KB \u2014 "
              "deepen unicode-range in MANIFEST.subset_targets.", file=sys.stderr)
    if failed:
        print(f"\u2717 {failed} failures \u2014 re-run after fixing.", file=sys.stderr)
        return 1
    print("\u2713 Subset complete. Next: commit fonts and run sanity probe.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
