# 🔬 TADAFFUQ v5 — Audit Baseline
> Source-of-truth قياس قبل أي تعديل في v5. كل قيمة قابلة للتكرار بـ grep.
> Scan run: 2026-05-28 17:38 UTC | git HEAD `ce1af87` (post-PR-#118 merge of ÊLAN ζ).
> Author: AUTO_PILOT v5 — α1 stage.

---

## ١. Scan Metadata

| Field | Value |
|---|---|
| **Scan date (UTC)** | 2026-05-28T17:38:49Z |
| **Git HEAD** | `ce1af87de95710a945e1462f0aea0836bf97561c` |
| **Branch** | `tadaffuq-α-foundation` (created from main) |
| **Last merge** | PR #118 (`elan-ζ-quality-gate` → main) |

---

## ٢. Honest Baseline — 24 Metrics

> ✅ = healthy / ⚠️ = legacy debt / ❌ = critical

| # | Domain | Metric | Value | Status | v5 target | Stage |
|---|---|---|---:|---|---:|---|
| A1 | Style | `inline_style_attrs` (in index.html) | **23** | ⚠️ | ≤ 10 | η1 |
| A2 | Style | `important_total_css` (all CSS) | **381** | ⚠️ | ≤ 130 | η2 |
| A3 | Style | `important_motion_sanctuary` (sanctioned) | **27** | ✅ | preserved | — |
| A4 | Style | `important_outside_sanctuary` | **354** | ⚠️ | ≤ 100 | η2 |
| A5 | Style | `hex_in_pages_css` | **859** | ⚠️ | ≤ 100 | ε + η2 |
| B1 | Type | `woff2_on_disk` | **0** | ❌ | ≥ 22 | β1 (W20 P2 blocked — owner-action) |
| B2 | Type | `fontface_total` | **35** | ✅ | ≥ 22 | preserved |
| B3 | Type | `font_family_uses` | **477** | ✅ | preserved | — |
| C1 | JS | `js_files_total` | **126** | ⚠️ | audit در α3 | α3 |
| C2 | JS | `iife_pattern_files` | **24** | ✅ | preserved | — |
| C3 | JS | `esm_export_files` | **21** | ⚠️ | build-only | α3 |
| C4 | JS | `esm_import_files` | **0** | ✅ | (browser-loaded) | — |
| C5 | JS | `upg_apis_total` | **40** | ✅ | preserved or 41+ | α4 |
| D1 | Sacred | `page_section_ids` | **16** | ✅ | preserved | — |
| D2 | Sacred | `page_h_count` | **14** | ✅ | preserved | — |
| D3 | Sacred | `qcalc_instances` | **384** | ✅ | preserved | — |
| D4 | Sacred | `data_block_ids` | **513** | ✅ | preserved | — |
| D5 | Sacred | `data_page_personality` | **15** | ✅ | preserved | — |
| E1 | Icon | `emoji_in_index` (BMP+SMP) | **1111** | ⚠️ | ≤ 200 | η3 |
| E2 | Icon | `inline_svg_viewbox` | **128** | ⚠️ | sprite-only (95) | α4 + η3 |
| E3 | Icon | `sprite_symbol_count` | **95** | ✅ | preserved + extended | α4 |
| F1 | Spatial | `fixed_position_total` | **31** | ✅ | mostly bottom-nav | — |
| F2 | Spatial | `inset_zero_blocks` | **45** | ⚠️ | not modal (verify) | γ1 |
| G1 | Motion | `reduced_motion_blocks` | **76** | ✅ | preserved | — |
| H1 | Forbid | `toast_class` | **0** | ✅ | 0 | — |
| H2 | Forbid | `spinner_keyframe_files` | **0** | ✅ | 0 | — |
| H3 | Forbid | `google_fonts_link` | **0** | ✅ | 0 | — |
| H4 | Forbid | `logical_property_violations` (margin-left/right + text-align:left/right) | **76** | ⚠️ | ≤ 20 | γ + η2 |

### Volumes
| Asset | Lines |
|---|---:|
| `platform/index.html` | 32,895 |
| `platform/assets/css/pages.css` | 26,534 |
| Total CSS (14 files) | 39,558 |
| Total JS (126 files) | 26,543 |

---

## ٣. Reproduction (Bash)

كل rod في الجدول قابل للتكرار:

```bash
# A — Style hygiene
grep -c 'style="' platform/index.html                                        # A1
grep -roh '!important' platform/assets/css/ | wc -l                          # A2
grep -c '!important' platform/assets/css/_motion-sanctuary.css               # A3
# A4 = A2 - A3
grep -coP '#[0-9a-fA-F]{3,8}\b' platform/assets/css/pages.css                # A5

# B — Type
find platform/assets/fonts -name '*.woff2' | wc -l                           # B1
grep -roh '@font-face' platform/assets/css/ | wc -l                          # B2
grep -roh 'font-family:' platform/assets/css/ | wc -l                        # B3

# C — JS
find platform/assets/js -name '*.js' | wc -l                                 # C1
grep -rl '(function (' platform/assets/js/ | wc -l                           # C2
grep -rl '^export ' platform/assets/js/ | wc -l                              # C3
grep -rl '^import '  platform/assets/js/ | wc -l                             # C4
grep -rohE 'Upg\.[a-zA-Z][a-zA-Z0-9]*' platform/assets/js/ platform/assets/app.js | sort -u | wc -l   # C5

# D — Sacred
grep -cE 'id="page-[a-z]+"' platform/index.html                              # D1
grep -c 'class="page-h"' platform/index.html                                 # D2
grep -c 'class="qcalc' platform/index.html                                   # D3
grep -c 'data-block-id=' platform/index.html                                 # D4
grep -c 'data-page-personality=' platform/index.html                         # D5

# E — Icon
python3 -c "import re; print(len(re.findall('[\U0001F300-\U0001FAFF\u2600-\u27BF]', open('platform/index.html').read())))"   # E1
grep -c '<svg.*viewBox' platform/index.html                                  # E2
grep -c '<symbol id=' platform/index.html                                    # E3

# F — Spatial
grep -roh 'position:\s*fixed' platform/assets/css/ | wc -l                   # F1
grep -E 'inset:\s*0' platform/assets/css/*.css | wc -l                       # F2

# G — Motion
grep -E 'prefers-reduced-motion: reduce' platform/assets/css/*.css | wc -l   # G1

# H — Forbidden hunt
grep -c 'class="toast' platform/index.html                                   # H1
grep -lE '@keyframes spin\b' platform/assets/css/*.css | wc -l               # H2
grep -E 'fonts\.googleapis|fonts\.gstatic' platform/index.html platform/assets/css/*.css | wc -l   # H3
grep -roE 'margin-left:|margin-right:|padding-left:|padding-right:|text-align:\s*(left|right)' platform/assets/css/ | wc -l   # H4
```

---

## ٤. Top-10 Emoji Distribution (E1 detail)

```
✗  (U+2717)  × 119   ← pitfall mistakes lists (W17 P3)
⚠  (U+26A0)  ×  74   ← pitfall headers
★  (U+2605)  ×  54   ← mastery markers (W17 P6)
✅ (U+2705)  ×  47   ← takeaways verified
☆  (U+2606)  ×  46   ← unmastered marker
⚡ (U+26A1)  ×  40   ← block-level "fast-tip"
📚 (U+1F4DA) ×  40   ← lesson eyebrow
🎯 (U+1F3AF) ×  32   ← drill targets
💰 (U+1F4B0) ×  32   ← finance/salary blocks
❌ (U+274C)  ×  31   ← red marks (mostly in pitfalls)
```

**η3 strategy:** Phosphor swap (✗→`x-circle`, ⚠→`warning`, ★→`star`, ✅→`check-circle`, ☆→`star-empty`, ⚡→`lightning`, 📚→`books`, 🎯→`target`, 💰→`coins`, ❌→`x`) — preserve semantic meaning, deliver via `Upg.icons.use()` from sprite. Estimate: 600–800 emoji removable, leaving ≤300 (long-form prose decorations stay).

---

## ٥. Sacred Preservation Inventory

أرقام v5 يجب أن لا تَنقص عنها:

| Sacred | Floor | Current | Allowed change |
|---|---:|---:|---|
| Page sections (`id="page-X"`) | 16 | 16 | ≥ |
| Page-h headers | 14 | 14 | ≥ |
| qcalc instances | 384 | 384 | ≥ |
| data-block-id | 513 | 513 | ≥ |
| data-page-personality | 15 | 15 | ≥ |
| Upg.* APIs | 40 | 40 | ≥ |
| woff2 hybrid (W20 P2 plan) | 22 (when owner ships) | 0 | ≥ |
| reduced-motion blocks | 76 | 76 | ≥ |

---

## ٦. Top Verdict

🟡 **Yellow-light.** Codebase healthy — sacred preserved 100%، motion sanctuary intact، 0 google fonts، 0 toast، 0 spinner. Three legacy debts surface honestly:

1. **859 hex in pages.css** — موروث من workers v3 content. ε-pillar revival sweeps will migrate per-page via `--chr-*` palette.
2. **1111 emoji in index.html** — content-block decorations from W17 P3/P6. η3 will swap via Phosphor sprite (semantic preservation).
3. **76 logical-property violations** — pre-RTL conventions. γ + η2 will sweep.

None of these block any β/γ/δ stage. They surface as ε/η debt and will be discharged on the way to the seal.

— نهاية AUDIT_BASELINE_v5 —
