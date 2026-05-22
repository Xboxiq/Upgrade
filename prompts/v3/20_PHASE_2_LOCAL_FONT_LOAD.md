# 📦 WORKER 20 — Phase 2/6 — Local Font Load
> **اقرأ أولاً:** `prompts/v3/20_WORKER_TASMEEM_RECONSTRUCTION.md` — قسم **Preservation Guard** (إجباري).
> **يبني فوق:** Phase 1 (Google Fonts removed + inventory documented).
> **الفلسفة:** *الخط محلي. لا شبكة. كل حرف يكتبه المتدرّب اليوم محفور في جهازه — لن يحتاج إذن من شركة لقراءته غداً.*

---

## 🛡️ Preservation Contract (Phase 2)

| العملية | المسموح | الممنوع |
|---|---|---|
| `platform/assets/fonts/` | **ADD** 9 مجلدات (one per family) + ملفات `.woff2` المُنزَّلة + ملف `LICENSE.txt` لكل family | حذف أي ملف موجود فيه |
| `style.css` | **APPEND** كتلة `@font-face` declarations (~360 سطر) في **بداية** الملف بعد `:root` العام مباشرة | تعديل قواعد قائمة، تغيير tokens |
| `index.html` | **AUGMENT** `<link rel="preload">` لكل خط رئيسي (≤6 preloads) قبل `<link rel="stylesheet">` الموجود | إعادة CDN، تعديل أي `<link>` آخر |
| `app.js` | لا يُلمس في Phase 2 | أي تعديل |

**Sacred preserved:**
- جميع `--font-*` و `--type-voice-*` tokens (تظل قيمها كما هي — Phase 3 يعيد توجيهها).
- الـ banner من Phase 1 يبقى ظاهراً (Phase 3 يخفيه).
- 14 page sections + 391 qcalc + 24 Upg.* APIs.

> **ملاحظة:** بنهاية Phase 2 الخطوط محمَّلة في `platform/assets/fonts/` و `@font-face` معرَّف. لكن الـ stacks في `--font-*` لم تُعدَّل بعد، فالـ browser قد لا يستخدمها فوراً. **هذا مقصود** — Phase 3 يربط الـ stacks بالخطوط المحلية، فيكتمل العقد.

---

## 🎯 الهدف

Phase 2 ينقل المنصة من "system fallback" إلى "local fonts متاحة لكن غير مفعَّلة بالكامل":

1. **تنزيل** ٩ خطوط بأوزان محددة من مصادر OFL/SIL إلى `platform/assets/fonts/<family>/`.
2. **subset** كل خط (Arabic Unicode block + Latin Basic + numbers) لتقليل حجمه ٧٠-٨٥٪.
3. **كتابة 18+ `@font-face` declarations** في style.css — كل واحد يشير لملف محلي.
4. **AUGMENT** `<link rel="preload">` للـ 6 خطوط الأعلى أولوية في index.html (Aref Ruqaa Bold, Reem Kufi 700, IBM Plex Arabic 400+700, Tajawal 500, Inter 400).
5. **TXT licenses** لكل خط (OFL.txt) داخل مجلده.
6. **(لا تعديل tokens، لا ربط voices)** — تلك مهمة Phase 3.

> Phase 2 = إنزال الجذع. Phase 3 = الربط.

---

## 📋 PRE-FLIGHT

```
📋 PHASE 2 PRE-FLIGHT (Worker 20 / TASMEEM)
├─ Phase: 2/6 — Local Font Load
├─ Estimated lines: ~560 (CSS @font-face ~360 + HTML preload ~24 + license files ~50 each)
├─ Files to touch:
│   ├─ platform/index.html         (AUGMENT 6 <link rel="preload">)
│   ├─ platform/assets/style.css   (APPEND ~360 lines @font-face block)
│   └─ platform/assets/fonts/*/    (ADD ~22 .woff2 files + 9 LICENSE.txt files)
├─ Sacred verify (run BEFORE):
│   ├─ grep -c '<section class="page"'                            → 14+
│   ├─ grep -c 'qcalc'                                             → 391
│   ├─ grep -c 'fonts.googleapis.com' platform/index.html          → 0 (post P1)
│   ├─ grep -c '@font-face' platform/assets/style.css              → 0 (will become ≥18)
│   └─ ls platform/assets/fonts/ | wc -l                           → 0 (will become ≥9)
├─ Branch: continue worker-20-devotio
└─ Network: only allowed for downloading from official OFL repos (one-time).
   After P2, NEVER fetch fonts again from network.
```

---

## 🧱 خطوات التنفيذ (بالترتيب)

### Step 1 — Create folder structure

```bash
mkdir -p platform/assets/fonts/aref-ruqaa
mkdir -p platform/assets/fonts/reem-kufi
mkdir -p platform/assets/fonts/cairo
mkdir -p platform/assets/fonts/tajawal
mkdir -p platform/assets/fonts/ibm-plex-arabic
mkdir -p platform/assets/fonts/readex-pro
mkdir -p platform/assets/fonts/inter
mkdir -p platform/assets/fonts/jetbrains-mono
mkdir -p platform/assets/fonts/fraunces
```

### Step 2 — Download from OFL/SIL official sources

> **ملاحظة:** التنزيل يحدث **مرة واحدة** في Phase 2. بعدها لا fetch مطلقاً. استخدم `curl` أو `wget` من المصادر الرسمية فقط.

#### المصادر المعتمدة:

| الخط | الأوزان | المصدر |
|---|---|---|
| Aref Ruqaa | 400, 700 | `github.com/google/fonts/raw/main/ofl/arefruqaa/ArefRuqaa-Regular.ttf` + `-Bold.ttf` |
| Reem Kufi | 400, 500, 600, 700 | `github.com/google/fonts/raw/main/ofl/reemkufi/ReemKufi[wght].ttf` (variable) |
| Cairo | 400, 600, 700 | `github.com/google/fonts/raw/main/ofl/cairo/Cairo[slnt,wght].ttf` (variable) |
| Tajawal | 300, 400, 500, 700 | `github.com/google/fonts/raw/main/ofl/tajawal/Tajawal-{Light,Regular,Medium,Bold}.ttf` |
| IBM Plex Sans Arabic | 300, 400, 500, 600, 700 | `github.com/IBM/plex/raw/master/IBM-Plex-Sans-Arabic/fonts/complete/woff2/` |
| Readex Pro | 200, 400, 700 | `github.com/google/fonts/raw/main/ofl/readexpro/ReadexPro[HEXP,wght].ttf` (variable) |
| Inter | variable | `github.com/rsms/inter/raw/master/docs/font-files/Inter-Variable.woff2` |
| JetBrains Mono | 400, 500, 700 | `github.com/JetBrains/JetBrainsMono/raw/master/fonts/webfonts/JetBrainsMono-{Regular,Medium,Bold}.woff2` |
| Fraunces | variable opsz/ital/wght | `github.com/undercasetype/Fraunces/raw/main/fonts/variable/Fraunces[SOFT,WONK,opsz,wght].ttf` |

#### التنزيل بأمر واحد per family:

```bash
# مثال — Aref Ruqaa
curl -L "https://github.com/google/fonts/raw/main/ofl/arefruqaa/ArefRuqaa-Regular.ttf" \
     -o platform/assets/fonts/aref-ruqaa/aref-ruqaa-400.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/arefruqaa/ArefRuqaa-Bold.ttf" \
     -o platform/assets/fonts/aref-ruqaa/aref-ruqaa-700.ttf

# مثال — Cairo (variable, نأخذ ٣ أوزان منه عبر static)
curl -L "https://github.com/google/fonts/raw/main/ofl/cairo/static/Cairo-Regular.ttf" \
     -o platform/assets/fonts/cairo/cairo-400.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/cairo/static/Cairo-SemiBold.ttf" \
     -o platform/assets/fonts/cairo/cairo-600.ttf
curl -L "https://github.com/google/fonts/raw/main/ofl/cairo/static/Cairo-Bold.ttf" \
     -o platform/assets/fonts/cairo/cairo-700.ttf

# (تكرر لكل family حسب الجدول أعلاه)
```

> **مهم:** بعض الخطوط متاحة كـ variable فقط. في تلك الحالة، نزّل الـ variable واحفظه باسم `<family>-VF.woff2` (سنُعرّفه بـ `font-weight: 100 900;` في `@font-face`).

### Step 3 — Convert TTF to WOFF2 (ضغط أعلى)

استخدم `woff2_compress` (من Google):

```bash
# تحويل كل ملف .ttf إلى .woff2
for f in platform/assets/fonts/*/*.ttf; do
  woff2_compress "$f"
done

# حذف الـ .ttf الأصلية بعد التأكد من إنشاء الـ .woff2
find platform/assets/fonts/ -name "*.ttf" -delete
```

**النتيجة المتوقّعة:** ~22 ملف `.woff2` موزّعة على 9 مجلدات. الحجم الإجمالي قبل subset ~600KB-1.2MB.

### Step 4 — Subset Arabic + Latin (تقليص ٧٠-٨٥٪)

استخدم `pyftsubset` (من `fonttools`):

```bash
# Arabic-script fonts (Aref Ruqaa, Reem Kufi, Cairo, Tajawal, IBM Plex Arabic, Readex Pro)
ARABIC_RANGE="U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF,U+0660-0669,U+0020-007F,U+00A0-00FF,U+2000-206F,U+2030-205E"
for f in platform/assets/fonts/{aref-ruqaa,reem-kufi,cairo,tajawal,ibm-plex-arabic,readex-pro}/*.woff2; do
  pyftsubset "$f" \
    --output-file="${f%.woff2}-subset.woff2" \
    --unicodes="$ARABIC_RANGE" \
    --layout-features='*' \
    --no-hinting \
    --flavor=woff2
  mv "${f%.woff2}-subset.woff2" "$f"
done

# Latin fonts (Inter, JetBrains Mono, Fraunces)
LATIN_RANGE="U+0020-024F,U+1E00-1EFF,U+2000-206F,U+2030-205E,U+20AC,U+2122,U+2190-21FF"
for f in platform/assets/fonts/{inter,jetbrains-mono,fraunces}/*.woff2; do
  pyftsubset "$f" \
    --output-file="${f%.woff2}-subset.woff2" \
    --unicodes="$LATIN_RANGE" \
    --layout-features='*' \
    --no-hinting \
    --flavor=woff2
  mv "${f%.woff2}-subset.woff2" "$f"
done
```

> **بعد subset:** الحجم الإجمالي ~280-320KB. شامل لكل الـ 22 ملف.

### Step 5 — Add LICENSE.txt files

كل family يحتاج ملف رخصة OFL في مجلده. تحميل من المصدر الأصلي:

```bash
# Aref Ruqaa (مثال)
curl -L "https://github.com/google/fonts/raw/main/ofl/arefruqaa/OFL.txt" \
     -o platform/assets/fonts/aref-ruqaa/OFL.txt

# (تكرر لكل family)
```

ملف `platform/assets/fonts/README.md` (موجود مسبقاً للـ Thmanyah) يُحدَّث ليتضمّن جدول الخطوط الـ 9.

### Step 6 — APPEND `@font-face` declarations في style.css

في **بداية** الملف (بعد `:root` العام مباشرة، قبل أي قاعدة أخرى)، **APPEND**:

```css
/* ════════════════════════════════════════════════════════════════════════
   TASMEEM v3 — Local Font Loading (Worker 20 / Phase 2)
   Loaded from platform/assets/fonts/. Zero CDN. Zero network.
   All licenses OFL 1.1 / SIL — see <family>/OFL.txt for each.
   ════════════════════════════════════════════════════════════════════════ */

/* ─── Aref Ruqaa (calligraphic display, accent) ─── */
@font-face {
  font-family: "Aref Ruqaa";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("./fonts/aref-ruqaa/aref-ruqaa-400.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F;
}
@font-face {
  font-family: "Aref Ruqaa";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("./fonts/aref-ruqaa/aref-ruqaa-700.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F;
}

/* ─── Reem Kufi (geometric Arabic display) ─── */
@font-face {
  font-family: "Reem Kufi";
  font-style: normal;
  font-weight: 400 700;  /* variable range */
  font-display: swap;
  src: url("./fonts/reem-kufi/reem-kufi-VF.woff2") format("woff2-variations"),
       url("./fonts/reem-kufi/reem-kufi-VF.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F;
}

/* ─── Cairo (Arabic workhorse) ─── */
@font-face {
  font-family: "Cairo";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("./fonts/cairo/cairo-400.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F;
}
@font-face {
  font-family: "Cairo";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("./fonts/cairo/cairo-600.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F;
}
@font-face {
  font-family: "Cairo";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("./fonts/cairo/cairo-700.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F;
}

/* ─── Tajawal (Arabic UI) ─── */
@font-face {
  font-family: "Tajawal";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url("./fonts/tajawal/tajawal-300.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F;
}
@font-face {
  font-family: "Tajawal";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("./fonts/tajawal/tajawal-400.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F;
}
@font-face {
  font-family: "Tajawal";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("./fonts/tajawal/tajawal-500.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F;
}
@font-face {
  font-family: "Tajawal";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("./fonts/tajawal/tajawal-700.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F;
}

/* ─── IBM Plex Sans Arabic (numeric + body) ─── */
@font-face {
  font-family: "IBM Plex Sans Arabic";
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url("./fonts/ibm-plex-arabic/ibm-plex-arabic-300.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F, U+0030-0039;
}
@font-face {
  font-family: "IBM Plex Sans Arabic";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("./fonts/ibm-plex-arabic/ibm-plex-arabic-400.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F, U+0030-0039;
}
@font-face {
  font-family: "IBM Plex Sans Arabic";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("./fonts/ibm-plex-arabic/ibm-plex-arabic-500.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F, U+0030-0039;
}
@font-face {
  font-family: "IBM Plex Sans Arabic";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("./fonts/ibm-plex-arabic/ibm-plex-arabic-600.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F, U+0030-0039;
}
@font-face {
  font-family: "IBM Plex Sans Arabic";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("./fonts/ibm-plex-arabic/ibm-plex-arabic-700.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F, U+0030-0039;
}

/* ─── Readex Pro (Arabic body — variable) ─── */
@font-face {
  font-family: "Readex Pro";
  font-style: normal;
  font-weight: 200 700;
  font-display: swap;
  src: url("./fonts/readex-pro/readex-pro-VF.woff2") format("woff2-variations"),
       url("./fonts/readex-pro/readex-pro-VF.woff2") format("woff2");
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669,
                 U+FB50-FDFF, U+FE70-FEFF,
                 U+0020-007F;
}

/* ─── Inter (Latin UI — variable) ─── */
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("./fonts/inter/inter-VF.woff2") format("woff2-variations"),
       url("./fonts/inter/inter-VF.woff2") format("woff2");
  unicode-range: U+0020-024F, U+1E00-1EFF, U+2000-206F, U+20AC;
}

/* ─── JetBrains Mono (code + numeric mono) ─── */
@font-face {
  font-family: "JetBrains Mono";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("./fonts/jetbrains-mono/jetbrains-mono-400.woff2") format("woff2");
  unicode-range: U+0020-024F, U+0030-0039, U+2000-206F;
}
@font-face {
  font-family: "JetBrains Mono";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("./fonts/jetbrains-mono/jetbrains-mono-500.woff2") format("woff2");
  unicode-range: U+0020-024F, U+0030-0039, U+2000-206F;
}
@font-face {
  font-family: "JetBrains Mono";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("./fonts/jetbrains-mono/jetbrains-mono-700.woff2") format("woff2");
  unicode-range: U+0020-024F, U+0030-0039, U+2000-206F;
}

/* ─── Fraunces (literary serif — variable, optical size + italic) ─── */
@font-face {
  font-family: "Fraunces";
  font-style: normal;
  font-weight: 400 700;
  font-stretch: normal;
  font-display: swap;
  src: url("./fonts/fraunces/fraunces-VF.woff2") format("woff2-variations"),
       url("./fonts/fraunces/fraunces-VF.woff2") format("woff2");
  unicode-range: U+0020-024F, U+1E00-1EFF, U+2000-206F;
}
@font-face {
  font-family: "Fraunces";
  font-style: italic;
  font-weight: 400 700;
  font-stretch: normal;
  font-display: swap;
  src: url("./fonts/fraunces/fraunces-italic-VF.woff2") format("woff2-variations"),
       url("./fonts/fraunces/fraunces-italic-VF.woff2") format("woff2");
  unicode-range: U+0020-024F, U+1E00-1EFF, U+2000-206F;
}

/* End TASMEEM v3 / Phase 2 — Local Font Load ─────────────────────────── */
```

### Step 7 — AUGMENT `<link rel="preload">` في index.html

في `<head>`، **قبل** الـ `<link rel="stylesheet" href="assets/style.css">` الموجود، **APPEND**:

```html
<!-- ════════════════════════════════════════════════════════════════════
     TASMEEM v3 — Critical font preloads (Worker 20 / Phase 2)
     Only the 6 most-used fonts. Remainder loads on-demand.
     ════════════════════════════════════════════════════════════════════ -->
<link rel="preload" href="assets/fonts/aref-ruqaa/aref-ruqaa-700.woff2"
      as="font" type="font/woff2" crossorigin />
<link rel="preload" href="assets/fonts/reem-kufi/reem-kufi-VF.woff2"
      as="font" type="font/woff2" crossorigin />
<link rel="preload" href="assets/fonts/ibm-plex-arabic/ibm-plex-arabic-400.woff2"
      as="font" type="font/woff2" crossorigin />
<link rel="preload" href="assets/fonts/ibm-plex-arabic/ibm-plex-arabic-700.woff2"
      as="font" type="font/woff2" crossorigin />
<link rel="preload" href="assets/fonts/tajawal/tajawal-500.woff2"
      as="font" type="font/woff2" crossorigin />
<link rel="preload" href="assets/fonts/inter/inter-VF.woff2"
      as="font" type="font/woff2" crossorigin />
```

> **لماذا 6 فقط؟** الـ preload يكلّف bandwidth أولي. الـ 6 الأهم (display + body + UI + Latin) تظهر في كل صفحة. Cairo / Readex / JetBrains / Fraunces تُحمَّل lazy عند الحاجة (في صفحات psych/eq/programming تحديداً).

### Step 8 — Discipline Comment (نهاية Phase 2)

في style.css بعد آخر `@font-face`:

```css
/* ════════════════════════════════════════════════════════════════════════
   Worker 20 / Phase 2 — Loading Discipline:
   1. لا تُضيف @font-face جديد بعد الآن — كل الخطوط محمَّلة هنا.
   2. لا تُغيّر unicode-range — تم ضبطه على Arabic + Latin Basic فقط.
   3. لا تستعمل format("truetype") أو format("opentype") — woff2 فقط.
   4. font-display: swap على الكل — لا "block"، لا "fallback".
   5. لو احتجت وزن غير موجود → variable font (Reem Kufi / Readex / Inter / Fraunces)
      تُغطّي 95% من الحالات.
   6. حجم كل ملف ≤ 100KB بعد subset. لو زاد → re-subset أعمق.
   ════════════════════════════════════════════════════════════════════════ */
```

---

## 🧪 Sanity Probe بعد الـ commit

```bash
# Sacred preserved
grep -c '<section class="page"' platform/index.html               # → 14+
grep -c 'qcalc' platform/index.html                                # → 391
grep -c 'fonts.googleapis.com' platform/index.html                # → 0 ✓ (preserved from P1)

# Font files exist
ls platform/assets/fonts/ | wc -l                                  # → ≥9 (folders)
find platform/assets/fonts/ -name "*.woff2" | wc -l                # → ≥18
find platform/assets/fonts/ -name "OFL.txt" -o -name "LICENSE*" | wc -l  # → ≥9

# CSS @font-face declarations
grep -c '@font-face' platform/assets/style.css                    # → ≥18
grep -c "url(\"./fonts/" platform/assets/style.css                # → ≥18

# HTML preloads
grep -c 'rel="preload"' platform/index.html                       # → ≥6
grep -c 'fonts/.*\.woff2' platform/index.html                     # → ≥6

# Total font payload (target: ≤320KB)
du -sh platform/assets/fonts/                                      # → ≤ 320KB

# Network behavior:
# Open platform/index.html in browser, DevTools → Network → Font tab
# Reload — should see 6 .woff2 files load from same-origin (no fonts.googleapis.com) ✓
# Visual: more fonts available but tokens not yet rerouted (Phase 3 binds them)
```

---

## ✅ معايير القبول (Phase 2)

- [ ] 9 مجلدات خطوط في `platform/assets/fonts/`.
- [ ] ≥18 ملف `.woff2` (subsetted to ≤100KB each).
- [ ] 9 ملفات OFL.txt (واحد لكل family).
- [ ] ≥18 `@font-face` declarations في style.css.
- [ ] 6 `<link rel="preload">` في index.html.
- [ ] جميع `@font-face` تستخدم `url("./fonts/...")` (relative path).
- [ ] جميع `@font-face` لها `font-display: swap`.
- [ ] جميع Arabic fonts لها `unicode-range: U+0600-06FF, ...`.
- [ ] حجم إجمالي `platform/assets/fonts/` ≤ 320KB.
- [ ] 0 references لـ `fonts.googleapis.com` في كل الـ codebase.
- [ ] Console: 0 errors. الخطوط تتحمّل من same-origin بنجاح.
- [ ] Network tab: 6 font requests، كلها local، 0 external.

---

## 📤 Commit + Push (2-push rule)

```bash
git add platform/assets/fonts/ platform/assets/style.css platform/index.html
git commit -m "phase 2 (devotio): local font load — 9 families, 18+ woff2 subsetted, 6 preloads, 320KB total offline"
# push immediately
```

ثم state commit:

```bash
# update state/PROGRESS.json:
#   current.phase = 2
#   next_action = "Continue Worker 20 Phase 3 — Voice Bindings"
# add snapshot state/snapshots/worker-20-phase-2.json with fonts_added_offline list

git add state/PROGRESS.json state/snapshots/worker-20-phase-2.json
git commit -m "state: devotio phase 2 committed and pushed"
# push immediately
```

— نهاية Phase 2.

🕯️ **Devotion check:** هل الخطوط الآن في جهاز المالك بلا حاجة لشبكة؟ نعم → انتقل لـ Phase 3 (Voice Bindings).
