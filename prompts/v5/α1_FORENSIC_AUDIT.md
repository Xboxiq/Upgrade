# α1 — Forensic Audit (the honest snapshot)
> **Pillar α / Stage 1 of 4**
> الهدف: قراءة المنصة كما تركها v4. لا حُكم، لا إصلاح. **قياس صادق** يَصير قاعدة لقرارات v5.

---

## ١. السياق (لماذا)

ÊLAN v4 انتهى بـ ζ5 (CHANGELOG + Truth Ledger sync) بـ 38 stage و 30 beacon. لكن أرقاماً عدّة بقيت "متأخِّرة": woff2=0 (الخطوط غير مُحمَّلة)، emoji=1111 في markup، hex=1209 خارج tokens. v5 لا يَستطيع أن يَبني بدون أن يَرى الواقع.

α1 يَقول: قبل أيِّ قرار، اطبع snapshot صادق. هذا snapshot يَصير baseline في `state/AUDIT_BASELINE_V5.md` ويُدفَع للـ remote — الـ TRUTH LEDGER يَرى رقماً قابلاً للتحقُّق في أي وقت.

---

## ٢. المُخرَجات

### ملفات تُنشأ:
- `state/AUDIT_BASELINE_V5.md` — snapshot الكامل (12+ keys)
- `prompts/v5/α1_FORENSIC_AUDIT.md` — هذا الـ spec (أنت هنا)

### ملفات تُعدَّل:
- `state/PROGRESS.json` — `tadaffuq_v5.current_stage_id = "α1"` → `completed_stages` بعد ship
- `state/TRUTH_LEDGER.md` — entry جديد بـ verified key=value
- `state/PULSE_LOG.md` — **لا يُلمَس** (α-pillar ليس له pulse)

### ملفات لا تُعدَّل:
- أي ملف داخل `platform/`
- أي ملف داخل `archive/`
- أي ملف داخل `prompts/v1..v4`

---

## ٣. القياسات الـ 12 الإلزامية (forensic keys)

كل واحد يُحسَب بـ grep حقيقي. لا تَخمين.

| # | المفتاح | grep | السقف v5 المتوقَّع |
|---|---|---|---:|
| 1 | `inline_styles_index` | `grep -c 'style="' platform/index.html` | 0 (من η1) |
| 2 | `inline_styles_pages_total` | `grep -rh 'style="' platform/pages/ \| wc -l` | 0 (η1) |
| 3 | `important_total` | `grep -rh '!important' platform/assets/css/ \| wc -l` | ≤ 30 (η2) |
| 4 | `woff2_files` | `find platform/assets/fonts -name '*.woff2' \| wc -l` | ≥ 7 (β1) |
| 5 | `emoji_in_markup` | unicode emoji ranges (regex) | 0 (η1) |
| 6 | `inline_svg_viewbox` | `grep -c 'viewBox' platform/index.html` | 0 (α4 + η1) |
| 7 | `hardcoded_hex_outside_tokens` | hex regex - tokens/* - archive/* | ≤ 50 by η1, 0 by η4 |
| 8 | `position_fixed_total` | `grep -rh 'position:\s*fixed' platform/assets/css/` | ≤ 20 (γ2) |
| 9 | `backdrop_blur_ge_12` | regex blur(N) where N≥12 | ≤ 4 (γ3) |
| 10 | `js_files_total` | `find platform/assets/js -name '*.js' \| wc -l` | حالياً 131 — α3 قياس |
| 11 | `css_files_total` | `find platform/assets/css -name '*.css' \| wc -l` | حالياً 30 — α2 قياس |
| 12 | `upg_top_level_apis` | `grep -E 'Upg\.[a-z]+\s*=' platform/assets/js/ -r` | حالياً 32 — preserve all |

### قياسات إضافيَّة (informational):
| # | المفتاح | grep |
|---|---|---|
| 13 | `page_sections` | `grep -c '<section class="page" id="page-' platform/index.html` |
| 14 | `qcalc_references` | `grep -c 'qcalc' platform/index.html` |
| 15 | `data_page_personality` | `grep -c 'data-page-personality' platform/index.html` |
| 16 | `reduced_motion_guards` | `grep -rc '@media[^{]*prefers-reduced-motion' platform/assets/css/` |
| 17 | `forced_colors_guards` | `grep -rc '@media[^{]*forced-colors' platform/assets/css/` |

---

## ٤. التنفيذ (الخطوات)

```bash
# 1. inline-styles
INLINE_INDEX=$(grep -c 'style="' platform/index.html)
INLINE_PAGES=$(grep -rh 'style="' platform/pages/ 2>/dev/null | wc -l)

# 2. !important
IMPORTANT=$(grep -rh '!important' platform/assets/css/ 2>/dev/null | wc -l)

# 3. fonts
WOFF2=$(find platform/assets/fonts -name '*.woff2' 2>/dev/null | wc -l)

# 4. emoji
EMOJI=$(grep -oP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' platform/index.html | wc -l)

# 5. inline svg viewBox
INLINE_SVG=$(grep -c 'viewBox' platform/index.html)

# 6. hardcoded hex
HEX=$(grep -rE '#[0-9a-fA-F]{3,8}\b' platform/assets/css/ 2>/dev/null | grep -v '/tokens/' | grep -v '/_legacy' | wc -l)

# 7. position fixed
FIXED=$(grep -rh 'position:\s*fixed' platform/assets/css/ 2>/dev/null | wc -l)

# 8. backdrop blur ≥ 12
BLUR=$(grep -rhE 'backdrop-filter:[^;]*blur\(\s*(1[2-9]|[2-9][0-9]+)px' platform/assets/css/ 2>/dev/null | wc -l)

# 9. file counts
JS_FILES=$(find platform/assets/js -name '*.js' | wc -l)
CSS_FILES=$(find platform/assets/css -name '*.css' | wc -l)

# 10. Upg.* APIs
UPG_APIS=$(grep -rhE 'window\.Upg\.[a-z][a-zA-Z]*\s*=' platform/assets/js/ 2>/dev/null | sort -u | wc -l)
```

---

## ٥. Acceptance Criteria

- [ ] `state/AUDIT_BASELINE_V5.md` موجود
- [ ] يَحتوي 17 measurement (12 الإلزاميَّة + 5 informational)
- [ ] كل قيمة مُلحَقة بـ grep command الذي أنتجها (reproducible)
- [ ] commit message بصيغة:
  ```
  α1: Forensic Audit — verified: inline_index=23 inline_pages=N important=338 woff2=0 emoji=1111 inline_svg=224 hex=1209 fixed=31 blur_ge12=6 js_files=131 css_files=30 upg_apis=N
  ```
- [ ] `state/PROGRESS.json` `tadaffuq_v5.completed_stages` يَحتوي `α1`
- [ ] `state/TRUTH_LEDGER.md` entry α1 موجود مع sha
- [ ] `state/PULSE_LOG.md` لا يُلمَس (α-pillar = no pulse)

---

## ٦. لا Pulse (لماذا)

α هو pillar **measurement-only**. لا تَفاعل بصري جديد، لا حركة، لا لون. الـ Pulse ينطلق من γ. هذه قاعدة doctrinal صريحة (PULSE_LIBRARY § 1).

---

## ٧. بعد الـ stage

`tadaffuq_v5.next_action` يَصير: `Begin α2 Token Architecture — author 4 token families locked at platform/assets/css/tokens/_v5/*.css`

— نهاية α1 spec —
