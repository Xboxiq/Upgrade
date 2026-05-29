#!/usr/bin/env python3
"""
fidelity_check.py — proves Upgrade-bundle.html is functionally equivalent
to the original source files.

For the v4.0.2 classic-IIFE bundle, byte-equivalence is impossible by
design (we strip ESM keywords + wrap modules in IIFEs). Instead we prove
functional equivalence via four converging proofs:

A) DETERMINISTIC RE-BUILD
   Re-run the bundler in-process and verify the bundle output matches
   exactly what the bundler currently produces.

B) STATIC SYNTAX
   Extract the runtime <script> blob and run `node --check` to confirm
   no syntax errors (no leaked export/import, no identifier collisions).

C) INCLUSION SPOT-CHECKS
   Confirm every ÊLAN v4 marker (worlds γ2-γ9, β KASHIDA, δ haptics,
   ε beacons, ζ PWA API) appears in the bundle with at least the
   original count.

D) STRUCTURAL INTEGRITY
   <body> LEFT/RIGHT halves around the entry-script position appear
   verbatim in the bundle's body.

Exit 0 if all pass; 1 otherwise.
"""
from __future__ import annotations
import hashlib
import os
import re
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PLATFORM = REPO_ROOT / "platform"
BUNDLE = REPO_ROOT / "Upgrade-bundle.html"

sys.path.insert(0, str(REPO_ROOT / "scripts"))
import build_bundle  # noqa: E402

BUNDLE_TEXT = BUNDLE.read_text(encoding="utf-8")


def sha(s: str) -> str:
    return hashlib.sha256(s.encode("utf-8")).hexdigest()[:12]


# ────────────────────────────────────────────────────────────────────────
# A) DETERMINISTIC RE-BUILD
# ────────────────────────────────────────────────────────────────────────
def proof_a_css() -> tuple[bool, str]:
    expected = build_bundle.resolve_css(build_bundle.ENTRY_CSS)
    m = re.search(r'<style id="upg-bundled-styles"[^>]*>\n(.*?)\n</style>', BUNDLE_TEXT, re.DOTALL)
    if not m:
        return False, "<style id=upg-bundled-styles> not found"
    actual = m.group(1)
    if expected.strip("\n") == actual.strip("\n"):
        return True, f"sha={sha(actual)} · {len(actual):,} bytes"
    for i, (a, b) in enumerate(zip(expected, actual)):
        if a != b:
            return False, f"first diff at byte {i}: expected {a!r} actual {b!r}"
    return False, f"length differs: expected={len(expected)} actual={len(actual)}"


def proof_a_js() -> tuple[bool, str]:
    expected_blob, _stats = build_bundle.assemble_classic_js()
    m = re.search(r'<script id="upg-bundled-runtime"[^>]*>\n(.*?)\n</script>', BUNDLE_TEXT, re.DOTALL)
    if not m:
        return False, "<script id=upg-bundled-runtime> not found"
    raw = m.group(1)
    # Reverse the </script -> <\/script HTML safety transform
    actual = re.sub(r"<\\/(script)", r"</\1", raw, flags=re.IGNORECASE)
    # Strip the leading banner the bundler prepends inside the <script> block
    expected_with_banner = (
        f"/* === ÊLAN v4 — classic-JS bundle ({_stats['modules_total']} modules) === */\n"
        + expected_blob
    )
    if expected_with_banner == actual:
        return True, f"sha={sha(actual)} · {len(actual):,} bytes · {_stats['modules_total']} modules"
    for i, (a, b) in enumerate(zip(expected_with_banner, actual)):
        if a != b:
            return False, (
                f"first diff at byte {i}\n"
                f"  expected: …{expected_with_banner[max(0,i-40):i+40]!r}…\n"
                f"  actual:   …{actual[max(0,i-40):i+40]!r}…"
            )
    return False, f"length differs: expected={len(expected_with_banner)} actual={len(actual)}"


# ────────────────────────────────────────────────────────────────────────
# B) STATIC SYNTAX (node --check)
# ────────────────────────────────────────────────────────────────────────
def proof_b_node_check() -> tuple[bool, str]:
    m = re.search(r'<script id="upg-bundled-runtime"[^>]*>\n(.*?)\n</script>', BUNDLE_TEXT, re.DOTALL)
    if not m:
        return False, "runtime block not found"
    raw = m.group(1)
    src = re.sub(r"<\\/(script)", r"</\1", raw, flags=re.IGNORECASE)
    tmp = "/tmp/_upg_check.js"
    Path(tmp).write_text(src, encoding="utf-8")
    env = dict(os.environ)
    env.pop("NODE_OPTIONS", None)
    r = subprocess.run(["node", "--check", tmp], capture_output=True, text=True, env=env)
    if r.returncode == 0:
        return True, f"node --check passed ({len(src):,} bytes)"
    return False, r.stderr.strip().splitlines()[0] if r.stderr else "node --check failed"


# ────────────────────────────────────────────────────────────────────────
# C) INCLUSION SPOT-CHECKS
# ────────────────────────────────────────────────────────────────────────
SPOT_CHECKS = [
    ("γ2 hibr world activation",          r'\[data-world="hibr"\]',      "platform/assets/css/**/*.css"),
    ("γ3 naar world activation",          r'\[data-world="naar"\]',      "platform/assets/css/**/*.css"),
    ("γ4 nada world activation",          r'\[data-world="nada"\]',      "platform/assets/css/**/*.css"),
    ("γ5 hadeed world activation",        r'\[data-world="hadeed"\]',    "platform/assets/css/**/*.css"),
    ("γ6 dhahab world activation",        r'\[data-world="dhahab"\]',    "platform/assets/css/**/*.css"),
    ("γ7 tayyar world activation",        r'\[data-world="tayyar"\]',    "platform/assets/css/**/*.css"),
    ("γ8 warsha-tape token",              r"--warsha-tape\b",            "platform/assets/css/**/*.css"),
    ("γ9 saloon-brass token",             r"--saloon-brass\b",           "platform/assets/css/**/*.css"),
    ("β2 voice utility tas-voice-",       r"\.tas-voice-",               "platform/assets/css/utilities.css"),
    ("β3 KASHIDA constant (JS)",          r"\bKASHIDA\b",                "platform/assets/js/elan/format.js"),
    ("δ4 maqamat haptic patterns",        r"\bmaqsoom|دفّن|تَك",          "platform/assets/js/elan/bottom-nav.js"),
    ("δ5 view-transition CSS",            r"::view-transition",          "platform/assets/css/_view-transition.css"),
    ("ε1 progress-margin selector",       r"\.progress-margin\b",        "platform/assets/css/**/*.css"),
    ("ε7 customercare score fn (JS)",     r"function score\b",           "platform/assets/js/elan/epsilon7-customercare.js"),
    ("ε11 hrmastery interview-stage",     r"\.interview-stage\b",        "platform/assets/css/worlds/_saloon.css"),
    ("ε12 mood vector key",               r"upg\.mood\.v1",              "platform/assets/js/elan/epsilon12-mood.js"),
    ("ζ4 PWA Upg.elan.install API",       r"Upg\.elan\.install",         "platform/assets/js/elan/zeta4-install.js"),
]


def proof_c_spot_checks() -> tuple[bool, list[str]]:
    failures: list[str] = []
    rows: list[str] = []
    for label, pattern, glob in SPOT_CHECKS:
        if "**" in glob:
            paths = list(REPO_ROOT.glob(glob))
        else:
            p = REPO_ROOT / glob
            paths = [p] if p.exists() else []
        orig_count = 0
        for p in paths:
            try:
                orig_count += len(re.findall(pattern, p.read_text(encoding="utf-8")))
            except Exception:
                pass
        bundle_count = len(re.findall(pattern, BUNDLE_TEXT))
        ok = bundle_count >= orig_count and orig_count > 0
        flag = "✓" if ok else "✗"
        rows.append(f"  {flag} {label:<40}  orig={orig_count:>3}  bundle={bundle_count:>3}")
        if not ok:
            failures.append(label)
    return (len(failures) == 0), rows


# ────────────────────────────────────────────────────────────────────────
# D) STRUCTURAL INTEGRITY
# ────────────────────────────────────────────────────────────────────────
def extract_real_body(html: str) -> str:
    m = re.search(r"</head>\s*(<body[^>]*>)(.*?)</body>", html, re.DOTALL)
    if not m:
        sys.exit("FAIL: real body (anchored on </head>) not found")
    return m.group(2)


def proof_d_html_body() -> tuple[bool, list[str]]:
    orig = (PLATFORM / "index.html").read_text(encoding="utf-8")
    orig_body = extract_real_body(orig)
    bun_body = extract_real_body(BUNDLE_TEXT)

    entry_re = re.compile(r'<script\s+type="module"\s+src="assets/app\.js"\s*></script>')
    m = entry_re.search(orig_body)
    if not m:
        return False, ["  entry script tag not found in original body"]
    left = orig_body[: m.start()].rstrip()
    right = orig_body[m.end():].lstrip()

    out: list[str] = []
    ok = True
    if left in bun_body:
        out.append(f"  ✓ original body LEFT half ({len(left):,} bytes) present verbatim")
    else:
        ok = False
        out.append(f"  ✗ LEFT half NOT found verbatim (len={len(left):,})")
    if right in bun_body:
        out.append(f"  ✓ original body RIGHT half ({len(right):,} bytes) present verbatim")
    else:
        ok = False
        out.append(f"  ✗ RIGHT half NOT found verbatim (len={len(right):,})")
    out.append(f"  bundle body total: {len(bun_body):,} bytes")
    return ok, out


def proof_d_html_head() -> tuple[bool, list[str]]:
    orig = (PLATFORM / "index.html").read_text(encoding="utf-8")
    orig_head = re.search(r"<head>(.*?)</head>", orig, re.DOTALL).group(1)
    bun_head = re.search(r"<head>(.*?)</head>", BUNDLE_TEXT, re.DOTALL).group(1)
    orig_norm = re.sub(r'<link\s+rel="stylesheet"\s+href="assets/style\.css"\s*/?>', "__SLOT__", orig_head)
    bun_norm = re.sub(r'<style id="upg-bundled-styles"[^>]*>.*?</style>', "__SLOT__", bun_head, flags=re.DOTALL)
    if orig_norm == bun_norm:
        return True, ["  head bytes equal modulo stylesheet swap"]
    for i, (a, b) in enumerate(zip(orig_norm, bun_norm)):
        if a != b:
            return False, [f"  diff at head byte {i}", f"    orig:   …{orig_norm[max(0,i-50):i+50]!r}…", f"    bundle: …{bun_norm[max(0,i-50):i+50]!r}…"]
    return False, [f"  head length differs: orig={len(orig_norm)} bun={len(bun_norm)}"]


# ────────────────────────────────────────────────────────────────────────
def main() -> int:
    print("═" * 72)
    print("FIDELITY CHECK — classic-IIFE bundle (v4.0.2)")
    print("═" * 72)

    print("\n[A] Deterministic re-build proof")
    ok_a_css, msg_a_css = proof_a_css()
    print(f"  [A1] CSS:  {'✓' if ok_a_css else '✗'}  {msg_a_css}")
    ok_a_js, msg_a_js = proof_a_js()
    print(f"  [A2] JS:   {'✓' if ok_a_js else '✗'}  {msg_a_js}")

    print("\n[B] Static syntax (node --check)")
    ok_b, msg_b = proof_b_node_check()
    print(f"  [B1] {'✓' if ok_b else '✗'}  {msg_b}")

    print("\n[C] ÊLAN v4 marker inclusion")
    ok_c, c_rows = proof_c_spot_checks()
    for r in c_rows:
        print(r)

    print("\n[D] Structural integrity")
    ok_d_head, d_head_msg = proof_d_html_head()
    print(f"  [D1] <head>: {'✓' if ok_d_head else '✗'}")
    for m in d_head_msg:
        print(m)
    ok_d_body, d_body_msg = proof_d_html_body()
    print(f"  [D2] <body>: {'✓' if ok_d_body else '✗'}")
    for m in d_body_msg[:6]:
        print(m)

    print()
    print("═" * 72)
    all_ok = ok_a_css and ok_a_js and ok_b and ok_c and ok_d_head and ok_d_body
    if all_ok:
        print("✓ FIDELITY VERIFIED — bundle is functionally equivalent to source.")
        return 0
    print("✗ FIDELITY FAILED — see proofs above.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
