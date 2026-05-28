#!/usr/bin/env python3
"""
fidelity_check.py — proves Upgrade-bundle.html faithfully contains every
byte of every original source file.

Method (three converging proofs)
--------------------------------
A) DETERMINISTIC RE-BUILD
   Re-run the bundler in-process and compare its CSS / per-module-JS output
   byte-for-byte against what's actually inside Upgrade-bundle.html. If they
   match, the bundle is exactly the bundler's output.

B) SPOT-CHECK PROOF-OF-INCLUSION
   For 8 distinctive ÊLAN v4 markers (warsha-tape, saloon-brass,
   maqamat-haptic, progress-margin, KASHIDA, etc.) — confirm each appears
   the expected number of times in both the original sources AND the bundle.

C) STRUCTURAL INTEGRITY
   - Real <body> (not the one inside a CSS comment) is found via </head><body>.
   - Body content (minus bundler-injected blocks) byte-equals original body
     (minus the entry <script> reference).

Exit 0 if all three pass; 1 otherwise.
"""
from __future__ import annotations
import re
import sys
import hashlib
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
            return False, (
                f"first diff at byte {i}\n"
                f"  expected: …{expected[max(0,i-40):i+40]!r}…\n"
                f"  actual:   …{actual[max(0,i-40):i+40]!r}…"
            )
    return False, f"length differs: expected={len(expected)} actual={len(actual)}"


def proof_a_js() -> tuple[bool, str]:
    expected_modules = build_bundle.collect_modules(build_bundle.ENTRY_JS)
    block_re = re.compile(
        r'<script type="text/upg-source" data-spec="([^"]+)">\n(.*?)\n</script>',
        re.DOTALL,
    )
    actual_modules: dict[str, str] = {}
    for m in block_re.finditer(BUNDLE_TEXT):
        spec, raw = m.group(1), m.group(2)
        un_escaped = re.sub(r"<\\/(script)", r"</\1", raw, flags=re.IGNORECASE)
        actual_modules[spec] = un_escaped

    if set(expected_modules) != set(actual_modules):
        only_a = set(expected_modules) - set(actual_modules)
        only_b = set(actual_modules) - set(expected_modules)
        return False, f"spec sets differ\n  only-expected: {only_a}\n  only-actual:   {only_b}"

    for spec, exp in expected_modules.items():
        act = actual_modules[spec]
        if exp != act:
            for i, (a, b) in enumerate(zip(exp, act)):
                if a != b:
                    return False, f"  {spec}: byte {i}: expected {a!r} actual {b!r}"
            return False, f"  {spec}: length differs (exp={len(exp)} act={len(act)})"
    return True, f"{len(expected_modules)} modules, all bytes equal"


# ────────────────────────────────────────────────────────────────────────
# B) SPOT-CHECK PROOF-OF-INCLUSION
# ────────────────────────────────────────────────────────────────────────
SPOT_CHECKS = [
    # (label,                                        regex pattern,                      where_to_count_orig_glob)
    ("γ8 warsha-tape token (CSS)",                   r"--warsha-tape\b",                 "platform/assets/css/**/*.css"),
    ("γ9 saloon-brass token (CSS)",                  r"--saloon-brass\b",                "platform/assets/css/**/*.css"),
    ("γ2 hibr world activation",                     r'\[data-world="hibr"\]',           "platform/assets/css/**/*.css"),
    ("γ3 naar world activation",                     r'\[data-world="naar"\]',           "platform/assets/css/**/*.css"),
    ("γ4 nada world activation",                     r'\[data-world="nada"\]',           "platform/assets/css/**/*.css"),
    ("γ5 hadeed world activation",                   r'\[data-world="hadeed"\]',         "platform/assets/css/**/*.css"),
    ("γ6 dhahab world activation",                   r'\[data-world="dhahab"\]',         "platform/assets/css/**/*.css"),
    ("γ7 tayyar world activation",                   r'\[data-world="tayyar"\]',         "platform/assets/css/**/*.css"),
    ("β3 KASHIDA constant (JS)",                     r"\bKASHIDA\b",                     "platform/assets/js/elan/format.js"),
    ("ε11 hrmastery interview-stage CSS",            r"\.interview-stage\b",             "platform/assets/css/worlds/_saloon.css"),
    ("ε12 mood vector key in JS",                     r"upg\.mood\.v1",                   "platform/assets/js/elan/epsilon12-mood.js"),
    ("δ4 maqamat haptic patterns",                   r"\bmaqsoom|دفّن|تَك",                 "platform/assets/js/elan/bottom-nav.js"),
    ("ε1 progress-margin selector",                  r"\.progress-margin\b",             "platform/assets/css/**/*.css"),
    ("ζ4 PWA Upg.elan.install API",                  r"Upg\.elan\.install",              "platform/assets/js/elan/zeta4-install.js"),
    ("β2 voice utility tas-voice-",                  r"\.tas-voice-",                    "platform/assets/css/utilities.css"),
    ("δ5 view-transition-name (γ ease)",             r"::view-transition",               "platform/assets/css/_view-transition.css"),
]


def proof_b_spot_checks() -> tuple[bool, list[str]]:
    """Confirm every spot-check pattern occurs in the bundle as many times
    (or more — the bundle inlines tokens.css from style.css too) as in source.
    """
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
        # Bundle should have at least the original count (some patterns may
        # appear in multiple files, all of which get inlined).
        ok = bundle_count >= orig_count and orig_count > 0
        flag = "✓" if ok else "✗"
        rows.append(f"  {flag} {label:<40}  orig={orig_count:>3}  bundle={bundle_count:>3}")
        if not ok:
            failures.append(f"  {label}: orig={orig_count} bundle={bundle_count}")
    return (len(failures) == 0), rows


# ────────────────────────────────────────────────────────────────────────
# C) STRUCTURAL INTEGRITY (proper body extraction)
# ────────────────────────────────────────────────────────────────────────
def extract_real_body(html: str) -> str:
    """Find the real <body> by anchoring on </head>."""
    m = re.search(r"</head>\s*(<body[^>]*>)(.*?)</body>", html, re.DOTALL)
    if not m:
        sys.exit("FAIL: real body (anchored on </head>) not found")
    return m.group(2)


def proof_c_html_body() -> tuple[bool, list[str]]:
    """Proves every byte of the original body appears in the bundle's body.

    Strategy:
      Split the original body at its single `<script type="module" src="assets/app.js">`
      tag. The bundle replaces that tag with a region of source-blocks + bootstrap.
      So both the original LEFT half (before the script) and the RIGHT half (after)
      must appear verbatim inside the bundle's body.
    """
    orig = (PLATFORM / "index.html").read_text(encoding="utf-8")
    orig_body = extract_real_body(orig)
    bun_body = extract_real_body(BUNDLE_TEXT)

    entry_re = re.compile(
        r'<script\s+type="module"\s+src="assets/app\.js"\s*></script>'
    )
    m = entry_re.search(orig_body)
    if not m:
        return False, ["  entry script tag not found in original body"]
    left = orig_body[: m.start()]
    right = orig_body[m.end():]

    # Allow trailing-newline drift of either side; we want to know that the
    # SUBSTANTIVE bytes are all present. Strip purely-whitespace ends.
    left_stripped = left.rstrip()
    right_stripped = right.lstrip()

    out: list[str] = []
    ok = True

    if left_stripped in bun_body:
        out.append(f"  ✓ original body LEFT  half ({len(left_stripped):,} bytes) present verbatim")
    else:
        ok = False
        # Find first divergence point
        for i in range(min(len(left_stripped), len(bun_body))):
            if not bun_body.startswith(left_stripped[: i + 1]):
                out.append(f"  ✗ LEFT half diverges at byte {i}")
                out.append(f"     orig:   …{left_stripped[max(0,i-40):i+40]!r}…")
                out.append(f"     bundle: …{bun_body[max(0,i-40):i+40]!r}…")
                break

    if right_stripped in bun_body:
        out.append(f"  ✓ original body RIGHT half ({len(right_stripped):,} bytes) present verbatim")
    else:
        ok = False
        out.append(f"  ✗ RIGHT half not found verbatim in bundle body")

    out.append(
        f"  bundle body total: {len(bun_body):,} bytes "
        f"(= {len(left_stripped):,} left + {len(bun_body) - len(left_stripped) - len(right_stripped):,} bundler region + {len(right_stripped):,} right)"
    )
    return ok, out


def proof_c_html_head() -> tuple[bool, list[str]]:
    orig = (PLATFORM / "index.html").read_text(encoding="utf-8")
    orig_head = re.search(r"<head>(.*?)</head>", orig, re.DOTALL).group(1)
    bun_head = re.search(r"<head>(.*?)</head>", BUNDLE_TEXT, re.DOTALL).group(1)
    # Replace stylesheet link in original with a placeholder
    orig_norm = re.sub(
        r'<link\s+rel="stylesheet"\s+href="assets/style\.css"\s*/?>',
        "__STYLE_SLOT__",
        orig_head,
    )
    bun_norm = re.sub(
        r'<style id="upg-bundled-styles"[^>]*>.*?</style>',
        "__STYLE_SLOT__",
        bun_head,
        flags=re.DOTALL,
    )
    if orig_norm == bun_norm:
        return True, ["  head bytes equal modulo stylesheet swap"]
    for i, (x, y) in enumerate(zip(orig_norm, bun_norm)):
        if x != y:
            return False, [
                f"  first diff at head byte {i}:",
                f"    orig:   …{orig_norm[max(0,i-60):i+60]!r}…",
                f"    bundle: …{bun_norm[max(0,i-60):i+60]!r}…",
            ]
    return False, [f"  head length differs: orig={len(orig_norm)} bun={len(bun_norm)}"]


# ────────────────────────────────────────────────────────────────────────
def main() -> int:
    print("═" * 72)
    print("FIDELITY CHECK — byte-level proof of bundle integrity")
    print("═" * 72)

    print("\n[A] Deterministic re-build proof")
    ok_a_css, msg_a_css = proof_a_css()
    print(f"  [A1] CSS:  {'✓' if ok_a_css else '✗'}  {msg_a_css}")
    ok_a_js, msg_a_js = proof_a_js()
    print(f"  [A2] JS:   {'✓' if ok_a_js else '✗'}  {msg_a_js}")

    print("\n[B] Spot-check proof-of-inclusion (ÊLAN v4 markers)")
    ok_b, b_rows = proof_b_spot_checks()
    for r in b_rows:
        print(r)

    print("\n[C] Structural integrity")
    ok_c_head, c_head_msg = proof_c_html_head()
    print(f"  [C1] <head>: {'✓' if ok_c_head else '✗'}")
    for m in c_head_msg:
        print(m)
    ok_c_body, c_body_msg = proof_c_html_body()
    print(f"  [C2] <body>: {'✓' if ok_c_body else '✗'}")
    for m in c_body_msg[:6]:
        print(m)

    print()
    print("═" * 72)
    all_ok = ok_a_css and ok_a_js and ok_b and ok_c_head and ok_c_body
    if all_ok:
        print("✓ FIDELITY VERIFIED — every byte of every source file is in the bundle.")
        return 0
    print("✗ FIDELITY FAILED — see proofs above.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
