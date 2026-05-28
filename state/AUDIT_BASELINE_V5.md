# 🔍 AUDIT BASELINE — TADAFFUQ v5 (α1)
> Honest snapshot of the platform as v4 left it, before any v5 hand touches CSS/JS/HTML.
> **Append-only ledger.** Every number below is reproducible by the listed grep on commit `<see commit sha>`.

---

## ١. السياق

- **Date captured:** 2026-05-28
- **Platform commit at capture:** `ce1af87` (Merge of PR #118, elan-ζ-quality-gate)
- **Branch:** `tadaffuq-α-foundation`
- **Doctrine context:** prompts/v5/00_TADAFFUQ_MANIFESTO.md, prompts/v5/INDEX.md
- **Scope:** `platform/**` only. `archive/`, `prompts/`, `state/`, `scripts/` excluded from forensic counts.

---

## ٢. القياسات الـ 12 الإلزاميَّة

| # | المفتاح | القيمة | الـ grep |
|---|---|---:|---|
| 1 | `inline_styles_index` | **23** | `grep -c 'style="' platform/index.html` |
| 2 | `inline_styles_pages_total` | **98** | `grep -rh 'style="' platform/pages/ \| wc -l` |
| 3 | `important_total` | **338** | `grep -rh '!important' platform/assets/css/ \| wc -l` |
| 4 | `woff2_files` | **0** | `find platform/assets/fonts -name '*.woff2' \| wc -l` |
| 5a | `emoji_in_markup_index` | **1111** | `grep -oP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' platform/index.html \| wc -l` |
| 5b | `emoji_in_pages_total` | **1105** | `grep -roP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' platform/pages/ \| wc -l` |
| 6a | `inline_svg_viewbox_index` | **224** | `grep -c 'viewBox' platform/index.html` |
| 6b | `inline_svg_viewbox_pages` | **108** | `grep -rh 'viewBox' platform/pages/ \| wc -l` |
| 7 | `hardcoded_hex_outside_tokens` | **1209** | `grep -rE '#[0-9a-fA-F]{3,8}\b' platform/assets/css/ \| grep -v '/tokens/' \| grep -v '/_legacy' \| wc -l` |
| 8 | `position_fixed_total` | **31** | `grep -rh 'position:\s*fixed' platform/assets/css/ \| wc -l` |
| 9 | `backdrop_blur_ge_12` | **6** | `grep -rhE 'backdrop-filter:[^;]*blur\(\s*(1[2-9]\|[2-9][0-9]+)px' platform/assets/css/ \| wc -l` |
| 10 | `js_files_total` | **126** | `find platform/assets/js -name '*.js' \| wc -l` |
| 11 | `css_files_total` | **30** | `find platform/assets/css -name '*.css' \| wc -l` |
| 12 | `upg_top_level_apis_defined` | **38** | `grep -rhoE 'Upg\.[a-zA-Z][a-zA-Z0-9]*\s*=' platform/assets/js/ \| sed 's/[ =]//g' \| sort -u \| wc -l` |

### ملاحظات على الـ 12:

**#5 (emoji = 1111 + 1105 = 2216 إجمالاً):** هذا الرقم الأكبر مفاجأة — v4 ICONOGRAPHY حظَّرت emoji نظرياً، لكن الـ legacy markup احتفظ بها. v5 (η1) سيَستبدل كل واحد بـ sprite icon.

**#6 (inline `<svg viewBox>` = 224 + 108 = 332):** كل واحد forbidden في v5 إلا داخل sprite. الـ sprite في α4 سَيَستهلك معظمها.

**#7 (hex = 1209):** أعلى من المتوقَّع. تَضمُّ `_epsilon*-*` و `worlds/*`. ε pillar يَنبغي أن يَخفِض هذا حاد. **القياس مقصور على ملفات `platform/assets/css/`** — استثناء `tokens/` (المسموح به) و `_legacy*` (موقوف).

**#4 (woff2 = 0):** الكارثة المعمَّمة. كل `--font-*` token يُشير إلى خطوط لم تُحمَّل. β1 (Local Font Procurement) يَحلّ هذا.

**#12 (Upg APIs defined = 38):** v4 ادَّعى 32. الفعلي 38. v5 يُلتزم بحماية كلّها (extend-only). القائمة الكاملة في § 4.

---

## ٣. القياسات الإضافيَّة (informational)

| # | المفتاح | القيمة | الـ grep |
|---|---|---:|---|
| 13 | `page_sections_in_index` | **15** | `grep -c '<section class="page" id="page-' platform/index.html` |
| 14 | `qcalc_references_index` | **391** | `grep -c 'qcalc' platform/index.html` |
| 15 | `data_page_personality_in_index` | **15** | `grep -c 'data-page-personality' platform/index.html` |
| 16 | `reduced_motion_guards_in_css` | **101** | `grep -rc '@media[^{]*prefers-reduced-motion' platform/assets/css/ \| awk -F: '{s+=$2} END {print s}'` |
| 17 | `forced_colors_guards_in_css` | **20** | `grep -rc '@media[^{]*forced-colors' platform/assets/css/ \| awk -F: '{s+=$2} END {print s}'` |

### ملاحظات:

**#13-15:** Sacred Assets verified. 15 page sections + 391 qcalc references + 15 personality bindings. v5 يُلتزَم بحفظها.

**#16 (reduced-motion = 101):** 101 guard موجود في CSS. v5 (δ5) سَيَتحقَّق أن motion-sanctuary block واحد كافٍ بـ `!important` مَنطقياً، والباقي يَنبغي أن يَكون بدون `!important` ضمن @layer.

**#17 (forced-colors = 20):** نقطة ضعف. ε4 / η3 سَيَزيدها لتَغطية كل surface + accent.

---

## ٤. الـ 38 Upg.* APIs المحفوظة (Sacred Surfaces)

```
Upg.aura       Upg.bento       Upg.calc        Upg.choreo
Upg.chroma     Upg.chrome      Upg.cmdk        Upg.countup
Upg.elan       Upg.focusTrap   Upg.font        Upg.format
Upg.gateway    Upg.greet       Upg.haptic      Upg.icons
Upg.identity   Upg.layer       Upg.life        Upg.material
Upg.mood       Upg.motion      Upg.nav         Upg.pace
Upg.practice   Upg.production  Upg.ritual      Upg.scroll
Upg.shards     Upg.sound       Upg.state       Upg.theme
Upg.touch      Upg.transition  Upg.type        Upg.type2
Upg.world      Upg.worlds
```

(الـ 38 كاملة — أي إعادة تعريف لأي اسم منها بدون extend = forbidden في v5.)

### ملاحظة على Upg.icons:
موجود في v4 لكن سَيُعاد بناء واجهته في α4 (sprite + SEMANTIC_MAP) **بـ extend** — الـ `.icon()` v4 method يَبقى يَعمل، يُضاف `.use()` و `.list()` و `.has()` و `.audit()`.

---

## ٥. أهداف v5 (target deltas — يُتَحقَّق منها في θ2)

| المفتاح | baseline α1 | target θ2 | المعمول في pillar |
|---|---:|---:|---|
| inline_styles_index | 23 | **0** | η1 |
| inline_styles_pages_total | 98 | **0** | η1 |
| important_total | 338 | **≤ 30** | η2 |
| woff2_files | 0 | **≥ 7** | β1 |
| emoji_in_markup (sum) | 2216 | **0** | η1 (after α4 sprite) |
| inline_svg_viewbox (sum) | 332 | **≤ 5** (sprite only) | α4 + η1 |
| hardcoded_hex (excl. tokens/legacy) | 1209 | **≤ 50 by η1, 0 by η4** | ε + η |
| position_fixed_total | 31 | **≤ 20** | γ2 |
| backdrop_blur_ge_12 | 6 | **≤ 4** | γ3 |
| upg_apis_defined | 38 | **≥ 38 (extend-only)** | each pillar |
| page_sections_in_index | 15 | **15 (preserve)** | sacred |
| qcalc_references_index | 391 | **≥ 391** | sacred |
| data_page_personality | 15 | **15 (preserve)** | sacred |
| reduced_motion_guards | 101 | **≤ 30** (collapsed via @layer) | δ5 |
| forced_colors_guards | 20 | **≥ 50** (full-surface) | ε + η3 |

---

## ٦. Sacred Assets Verified Untouched

- ✓ `archive/arabic-training-platform-v12-original.html` — present, unmodified
- ✓ `prompts/v1/`, `prompts/v2/`, `prompts/v3/`, `prompts/v4/` — no v5 writes
- ✓ `state/PROGRESS.json` previous entries (v3 + v4) — preserved
- ✓ `state/CREATIVITY_LOG.md` — read-only (v4 history)
- ✓ `state/TRUTH_LEDGER.md` — append-only (v4 history retained)

---

## ٧. القرار

- baseline ثابت
- v5 يَبني على هذه الأرقام
- كل stage v5 سَيَنشر `verified: <key>=<value>` يُمكن أن يُقارَن بهذا الملف
- أي ادِّعاء "improvement" بدون grep حقيقي → forbidden (Truth Oath)

— نهاية AUDIT BASELINE V5 —
