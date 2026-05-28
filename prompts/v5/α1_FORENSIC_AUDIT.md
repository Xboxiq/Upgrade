# α1 — FORENSIC AUDIT v5
> **Pillar α / Stage 1 of 4**
> الهدف: قياس صادق لكل bp ينطلق منه v5 — قبل أن نُعدِّل سطراً واحداً من platform/.

---

## ١. لماذا

v4 ÊLAN انتهى (PR #118 مَدموج). الـ codebase في حالة جيِّدة، لكن قبل أن نَبني v5 نحتاج baseline grep-verified موثَّق. كل ادعاء في الـ pulses/PRs/ledgers اللاحقة يجب أن يُقاس مقابل هذا الـ baseline.

**لا pulse في α1** (α هو pillar البنية، يَخدم — لا يَخلق تجربة).

---

## ٢. المُخرَجات

### تُنشَأ
- `state/AUDIT_BASELINE_v5.md` — جدول كامل بـ grep commands قابلة للتكرار
- `state/PULSE_LOG.md` — file جديد، empty template من PULSE_LIBRARY § ٧
- `prompts/v5/00_TADAFFUQ_MANIFESTO.md` (بُذِر هنا)
- `prompts/v5/SPATIAL_DOCTRINE.md` (بُذِر)
- `prompts/v5/MOTION_DOCTRINE.md` (بُذِر)
- `prompts/v5/CHROMA_DOCTRINE.md` (بُذِر)
- `prompts/v5/ICONOGRAPHY_DOCTRINE.md` (بُذِر)
- `prompts/v5/PULSE_LIBRARY.md` (بُذِر)
- `prompts/v5/INDEX.md` (بُذِر)
- `prompts/v5/α1_FORENSIC_AUDIT.md` (هذا الملف)

### تُعدَّل
- `state/PROGRESS.json` — إضافة `tadaffuq_v5` namespace
- `state/TRUTH_LEDGER.md` — append α1 entry

### لا تُعدَّل (Sacred)
- `platform/**` — صفر تعديل في α1 (forensic فقط)
- `archive/**`، `prompts/v1..v4` — تاريخ مُقدَّس

---

## ٣. التنفيذ

### ٣.١ Forensic Scan الكامل

20 مقياس عبر 4 domains:

```bash
# DOMAIN A — Style hygiene
inline_style_attrs   = grep -c 'style="' platform/index.html
important_total_css  = grep -roh '!important' platform/assets/css/ | wc -l
important_motion_sanctuary = grep -c '!important' platform/assets/css/_motion-sanctuary.css
important_outside_sanctuary = important_total_css - important_motion_sanctuary
hex_colors_pages_css = grep -coP '#[0-9a-fA-F]{3,8}\b' platform/assets/css/pages.css

# DOMAIN B — Type stack
woff2_on_disk        = find platform/assets/fonts -name '*.woff2' | wc -l
fontface_total       = grep -roh '@font-face' platform/assets/css/ | wc -l
font_family_uses     = grep -roh 'font-family:' platform/assets/css/ | wc -l

# DOMAIN C — JS architecture
js_files_total       = find platform/assets/js -name '*.js' | wc -l
iife_pattern_files   = grep -rl '(function (' platform/assets/js/ | wc -l
esm_export_files     = grep -rl '^export ' platform/assets/js/ | wc -l
upg_apis_total       = grep -rohE 'Upg\.[a-zA-Z][a-zA-Z0-9]*' platform/assets/js/ platform/assets/app.js | sort -u | wc -l

# DOMAIN D — Structure & Sacred preservation
page_section_ids     = grep -cE 'id="page-[a-z]+"' platform/index.html
page_h_count         = grep -c 'class="page-h"' platform/index.html
qcalc_instances      = grep -c 'class="qcalc' platform/index.html
data_block_ids       = grep -c 'data-block-id=' platform/index.html
data_page_personality = grep -c 'data-page-personality=' platform/index.html

# DOMAIN E — Iconography state
emoji_in_index       = grep -coP '[\x{1F300}-\x{1F9FF}]' platform/index.html
inline_svg_viewbox   = grep -c '<svg.*viewBox' platform/index.html
sprite_symbol_count  = grep -c '<symbol id=' platform/index.html

# DOMAIN F — Spatial
fixed_position_total = grep -roh 'position:\s*fixed' platform/assets/css/ | wc -l
modal_inset_zero     = grep -cE 'inset:\s*0' platform/assets/css/*.css | awk -F: '{s+=$2} END {print s}'

# DOMAIN G — Motion
reduced_motion_blocks = grep -c 'prefers-reduced-motion: reduce' platform/assets/css/*.css | awk -F: '{s+=$2} END {print s}'

# DOMAIN H — Forbidden hunt
toast_class_count    = grep -c 'class="toast' platform/index.html
spinner_keyframe     = grep -c '@keyframes.*spin\b' platform/assets/css/*.css
google_fonts_link    = grep -c 'fonts.googleapis\|fonts.gstatic' platform/index.html platform/assets/css/*.css
```

### ٣.٢ كتابة AUDIT_BASELINE_v5.md

table بالنتائج، per-row reproduction command، plus interpretation.

### ٣.٣ تَأكيد Sacred Preservation

baseline يَحمل أرقام:
- 16 page sections
- 14 page-h
- 384 qcalc
- 503 data-block-id
- 15 data-page-personality
- 40 Upg.* APIs

كل rebuild في v5 يجب أن يَحفَظ أو يَزيد هذه الأرقام (الـ Upg.* APIs قد تَصِل 40+).

---

## ٤. Acceptance Criteria

- [x] `state/AUDIT_BASELINE_v5.md` مَوجود مع 20+ مقياس
- [x] `state/PULSE_LOG.md` مَوجود مع empty template
- [x] `state/PROGRESS.json` يَحمل `tadaffuq_v5` namespace صحيح
- [x] `state/TRUTH_LEDGER.md` يَحمل entry α1
- [x] 6 doctrine files مَوجودة في `prompts/v5/`
- [x] commit message: `α1: Forensic Audit v5 — verified: ...`
- [x] PUSH على branch `tadaffuq-α-foundation`
- [x] platform/** غير مَلموس

---

## ٥. بعد الـ stage

→ α2 Token Reconciliation: --paper-* + --ink-* + --accent-* consolidation.

— نهاية α1 spec —
