#!/usr/bin/env python3
"""
ÊLAN v4 — ζ2 — !important truthful audit.

Categorizes every `!important` in platform/assets/css/ into one of 11
legitimacy buckets (or CASCADE_HACK if none apply). Run this script any
time after CSS edits to confirm cascade discipline is preserved.

  python3 scripts/zeta2-important-audit.py            # summary
  python3 scripts/zeta2-important-audit.py --verbose  # per-line catalogue
  python3 scripts/zeta2-important-audit.py --hacks    # cascade hacks only
"""
import os, re, sys, datetime

VERBOSE = '--verbose' in sys.argv
HACKS_ONLY = '--hacks' in sys.argv

CSS_FILES = []
for root, dirs, files in os.walk('platform/assets/css'):
    for f in files:
        if f.endswith('.css'):
            CSS_FILES.append(os.path.join(root, f))

def scan_file(path):
    with open(path) as fh:
        src = fh.read()
    rows, stack, last_close = [], [], 0
    i, n = 0, len(src)
    while i < n:
        if src[i] == '/' and i + 1 < n and src[i+1] == '*':
            end = src.find('*/', i + 2)
            if end == -1:
                break
            i = end + 2
            last_close = i
            continue
        ch = src[i]
        if ch == '{':
            ctx = src[last_close:i].strip()
            ctx = re.sub(r'/\*.*?\*/', '', ctx, flags=re.DOTALL).strip()
            stack.append(ctx)
            last_close = i + 1
            i += 1
        elif ch == '}':
            if stack:
                stack.pop()
            last_close = i + 1
            i += 1
        elif src[i:i+10] == '!important':
            line = src[:i].count('\n') + 1
            decl_start = max(src.rfind('{', 0, i), src.rfind(';', 0, i)) + 1
            decl = src[decl_start:i].strip()[:80]
            chain = ' >> '.join(stack)
            rows.append((line, chain, decl))
            i += 10
        else:
            i += 1
    return rows

def classify(chain):
    cl = chain.lower()
    if 'prefers-reduced-motion' in cl: return 'A_REDUCED_MOTION'
    if 'forced-colors' in cl:           return 'A_FORCED_COLORS'
    if re.search(r'@media[^{]*\bprint\b', cl): return 'A_PRINT'
    if 'view-transition' in cl:         return 'A_VIEW_TRANSITION'
    if '[data-motion="reduced"]' in chain or '[data-motion=reduced]' in chain:
        return 'A_DATA_MOTION'
    if '[hidden]' in chain:             return 'A_HIDDEN_ATTR'
    if re.search(r'\bbody\.is-hidden\b', chain): return 'A_STATE_CLASS'
    if re.search(r'\.rit-[a-z-]+-bare\b', chain): return 'A_STATE_CLASS'
    if re.search(r'\[data-[a-z-]+', chain):       return 'A_DATA_STATE'
    if re.search(r'@media[^{]*(min|max)-width', cl): return 'A_RESPONSIVE'
    if re.search(r'\.u-[a-z]', chain) or 'sr-only' in chain.lower():
        return 'A_UTILITY'
    if '@layer overrides' in cl:        return 'A_LAYER_OVERRIDE'
    return 'CASCADE_HACK'

CATEGORIES = [
    'A_REDUCED_MOTION', 'A_FORCED_COLORS', 'A_PRINT',
    'A_DATA_MOTION', 'A_DATA_STATE', 'A_STATE_CLASS', 'A_HIDDEN_ATTR',
    'A_RESPONSIVE', 'A_UTILITY', 'A_VIEW_TRANSITION', 'A_LAYER_OVERRIDE',
    'CASCADE_HACK',
]

all_rows = []
for f in sorted(CSS_FILES):
    for line, chain, decl in scan_file(f):
        all_rows.append((classify(chain), f, line, chain, decl))

counts = {c: 0 for c in CATEGORIES}
for r in all_rows:
    counts[r[0]] += 1
total = sum(counts.values())

if HACKS_ONLY:
    hacks = [r for r in all_rows if r[0] == 'CASCADE_HACK']
    if not hacks:
        print(f'✓ Zero cascade hacks. ({total} legitimate !important across {len(CSS_FILES)} CSS files.)')
        sys.exit(0)
    for cat, f, line, chain, decl in hacks:
        print(f'  CASCADE_HACK  {f}:{line}')
        print(f'    selector: {chain[:120]}')
        print(f'    decl:     {decl}')
    sys.exit(1)

print(f'ζ2 !important audit — {datetime.date.today().isoformat()}')
print(f'CSS files scanned: {len(CSS_FILES)}')
print(f'Total !important:  {total}')
print()
print(f'  {"Category":<22}  Count')
print(f'  {"-" * 22}  -----')
for c in CATEGORIES:
    flag = ' ⚠️' if c == 'CASCADE_HACK' and counts[c] > 0 else ''
    print(f'  {c:<22}  {counts[c]:>5}{flag}')
print()
print(f'Legitimate:    {total - counts["CASCADE_HACK"]}')
print(f'Cascade hacks: {counts["CASCADE_HACK"]}', '✓' if counts['CASCADE_HACK'] == 0 else '⚠️ FIX')

if VERBOSE:
    print()
    print('=== per-line catalogue ===')
    for cat, f, line, chain, decl in all_rows:
        print(f'  [{cat}] {f}:{line}  {decl}')

sys.exit(1 if counts['CASCADE_HACK'] > 0 else 0)
