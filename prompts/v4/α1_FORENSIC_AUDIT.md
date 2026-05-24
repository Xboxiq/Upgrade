# α1 — Forensic Audit
> **Pillar α (FOUNDATION) / Stage 1 of 3**
> الهدف: قياس الواقع قبل أي تعديل. لا كود إنتاجي في هذه stage. فقط حقائق.

---

## السياق

ÊLAN يبدأ بالاعتراف. v3 ادّعت أرقاماً لم تتحقق. هذه stage تُنشئ "خط الأساس الموثَّق" الذي تُقاس عليه كل phases v4.

## المُخرَجات

### ملفات تُنشأ:
- `state/AUDIT_BASELINE.md` — تقرير القياس
- `state/PROGRESS.json` — تحديث `elan_v4` namespace
- `state/TRUTH_LEDGER.md` — أول entry (إن لم يكن موجوداً)

### ملفات تُعدَّل: لا شيء في `platform/`

---

## التنفيذ

### ١. شغّل المسحات التالية بالضبط

```bash
# A — Inline styles & important
echo "## inline_style ===" && grep -c 'style=' platform/index.html
echo "## important_total ===" && grep -c '!important' platform/assets/css/*.css | awk -F: '{s+=$2} END {print s}'
echo "## important_per_file ===" && grep -c '!important' platform/assets/css/*.css

# B — Fonts truth
echo "## woff2_on_disk ===" && find platform/assets/fonts -name "*.woff2" | wc -l
echo "## font_face_declared ===" && grep -c '@font-face' platform/assets/css/*.css | awk -F: '{s+=$2} END {print s}'
echo "## font_family_uses ===" && grep -c 'font-family' platform/assets/css/*.css | awk -F: '{s+=$2} END {print s}'
echo "## font_files_referenced ===" && grep -oE 'fonts/[a-z-]+/[a-z0-9-]+\.woff2' platform/assets/css/*.css | sort -u | wc -l

# C — JS truth
echo "## js_files ===" && ls platform/assets/js/*.js | wc -l
echo "## iife_count ===" && grep -lE '^\(function ?\(' platform/assets/js/*.js | wc -l
echo "## esm_export ===" && grep -lE '^export ' platform/assets/js/*.js | wc -l
echo "## legacy_globals_lines ===" && wc -l platform/assets/js/_legacy-globals.js | awk '{print $1}'

# D — Structural truth
echo "## page_sections ===" && grep -oE '<section class="page"' platform/index.html | wc -l
echo "## upg_apis ===" && grep -oE 'window\.Upg\.[a-zA-Z]+ ?=' platform/assets/js/**/*.js | awk -F'=' '{print $1}' | sort -u | wc -l
echo "## bento_class ===" && grep -oE 'class="bento[" ]' platform/index.html | wc -l
echo "## data_countup ===" && grep -oE 'data-countup' platform/index.html | wc -l

# E — Size truth
echo "## index_lines ===" && wc -l platform/index.html | awk '{print $1}'
echo "## pages_css_lines ===" && wc -l platform/assets/css/pages.css | awk '{print $1}'
echo "## total_css_lines ===" && wc -l platform/assets/css/*.css | tail -1 | awk '{print $1}'
echo "## total_js_lines ===" && wc -l platform/assets/js/*.js | tail -1 | awk '{print $1}'
```

### ٢. اكتب التقرير في `state/AUDIT_BASELINE.md`

```markdown
# AUDIT BASELINE — ÊLAN v4 — α1 Forensic
**Date:** <YYYY-MM-DD>
**Branch:** elan-α-foundation
**Commit before changes:** <sha>

## A. Style Discipline
| Metric | Value | Target (after ζ) |
|---|---:|---:|
| inline `style=` in index.html | <N> | ≤ 30 |
| `!important` total across css/ | <N> | ≤ 20 |
| `!important` in motion.css | <N> | ≤ 5 |
| `!important` in pages.css | <N> | ≤ 10 |

## B. Type Truth
| Metric | Value | Target |
|---|---:|---:|
| .woff2 files on disk | <N> | ≥ 12 |
| @font-face declarations | <N> | matches files +0/-0 |
| font-family declarations total | <N> | ≤ 80 |
| referenced font files | <N> | == on-disk |
| **Stack health** | broken / partial / healthy | healthy |

## C. JS Truth
| Metric | Value | Target |
|---|---:|---:|
| /js/*.js files | <N> | ≤ 28 |
| files starting with `(function` (IIFE) | <N> | ≤ 5 |
| files with `export` (ESM) | <N> | ≥ 20 |
| _legacy-globals.js lines | <N> | ≤ 200 |

## D. Structural Truth
| Metric | Value | Target (sacred) |
|---|---:|---:|
| section.page count | <N> | == 16 |
| Upg.* APIs detected | <N> | == 14 |
| class="bento" elements | <N> | ≥ 3 (after δ2) |
| data-countup elements | <N> | ≥ 6 (after δ2) |

## E. Size Truth
| File | Lines | Target |
|---|---:|---:|
| index.html | <N> | preserved |
| pages.css | <N> | ≤ 9000 |
| total CSS | <N> | ≤ 30000 |
| total JS | <N> | ≤ 12000 |

## Verdict
- Health: 🔴 critical / 🟡 partial / 🟢 healthy
- Greatest debt: <one-line>
- Next priority: α2 Token Architecture
```

### ٣. حدّث `state/PROGRESS.json` — أضف `elan_v4` namespace

```json
{
  "elan_v4": {
    "current_pillar": "α",
    "current_stage": 1,
    "status": "in-progress",
    "started_at": "<ISO date>",
    "completed_stages": ["α1"],
    "next_action": "Begin α2 Token Architecture in same session if context > 35%",
    "branch": "elan-α-foundation"
  }
}
```

### ٤. أنشئ/Append `state/TRUTH_LEDGER.md`

```markdown
# ÊLAN v4 — Truth Ledger
> Append-only. Each entry verified by grep at the commit listed.

## α1 — Forensic Audit — <YYYY-MM-DD>
**Before:** N/A (baseline measurement)
**After:**  <copy from AUDIT_BASELINE.md key metrics>
**Files:**  state/AUDIT_BASELINE.md (created), state/PROGRESS.json (updated), state/TRUTH_LEDGER.md (created)
**Lines:**  +<add> -<del> in state/
**Branch:** elan-α-foundation
**Verified at commit:** <sha>
```

---

## Acceptance Criteria

- [ ] `state/AUDIT_BASELINE.md` موجود ويحتوي 5 جداول (A-E) معبَّأة بأرقام فعلية من grep
- [ ] `state/PROGRESS.json` يحتوي `elan_v4` namespace
- [ ] `state/TRUTH_LEDGER.md` يحتوي أول entry
- [ ] لا ملف داخل `platform/` تم تعديله في هذه stage
- [ ] commit message يحتوي verified key=value (e.g. `α1: Forensic Audit — verified: woff2=0, important=276, iife=87`)

---

## بعد α1 مباشرة

لو context_remaining > 50% → ابدأ α2 في نفس الـ session.
لو ≤ 50% → اطبع SESSION CHECKPOINT وتوقَّف. الـ session التالي يلصق AUTO_PILOT v4 ويكمل من α2 تلقائياً.

— نهاية α1 —
