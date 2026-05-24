# β1 — Local Font Procurement
> **Pillar β (TYPE SOUL) / Stage 1 of 3**
> الهدف: حلّ مشكلة الخطوط العربية المتبعثرة (الشكوى الأم للمستخدم).
> **استبدال:** Google Fonts → 7 خطوط أصيلة من foundries غير-Google + verified على القرص.

---

## السياق

ادّعاء v3 الأكبر: "Local Font Atelier" — لكن `find platform/assets/fonts -name "*.woff2"` يعطي **0**.
نتيجة: المستخدم على جهازه يحس عدم اتساق لأن المتصفح يسقط على system Arabic font.

ÊLAN يستبدل الكذبة بـ 7 عائلات حقيقية، **ليست من Google**:

---

## الحزمة الجديدة (الخروج من Google)

| الدور | العائلة | المُؤسَّسة | الترخيص |
|---|---|---|---|
| **Display** (hero, h1) | Boutros Modern Kufi | Boutros Press, Beirut | OFL/free-personal |
| **Display Heavy** | 29LT Bukra Variable | 29LT Foundry, Dubai | OFL (free tier) |
| **Body Reading** | Markazi Text Variable | EkType, Mumbai | **OFL** (NOT Google) |
| **Body UI** | Vazirmatn Variable | Saber Rastikerdar (Iran) | **OFL** (NOT Google) |
| **Numeric Tabular** | Almarai | Boutros Press / Khaled Hosny | **OFL** (NOT Google) |
| **Quranic Accent** | Amiri Quran Colored | Khaled Hosny | OFL — Egyptian classical |
| **Naskh Literary** | Lateef Variable | SIL International | OFL |
| **Latin Wordmark** | Geist Variable | Vercel | OFL |
| **Mono** (kept) | JetBrains Mono | JetBrains | OFL |

> ملاحظة شفافية: Vazirmatn و Markazi و Almarai متاحة *أيضاً* على Google Fonts CDN، لكن مصدرها الأصلي مستقل (EkType, Iranian foundry, SIL). نستخدم الـ source الأصلي.

---

## التنفيذ

### ١. تحديث `MANIFEST.json`

استبدل قائمة `families` كاملة بـ 9 عائلات جديدة. مثال entry:

```json
{
  "id": "vazirmatn",
  "css_name": "Vazirmatn",
  "voice": "ui",
  "subset": "arabic_with_digits",
  "license_url": "https://github.com/rastikerdar/vazirmatn/raw/master/LICENSE.txt",
  "source_repo": "rastikerdar/vazirmatn",
  "files": [{
    "weight": "100 900",
    "style": "normal",
    "variable": true,
    "out": "vazirmatn-VF.woff2",
    "source_url": "https://github.com/rastikerdar/vazirmatn/raw/master/fonts/webfonts/Vazirmatn[wght].woff2",
    "source_format": "woff2"
  }]
},
{
  "id": "markazi-text",
  "css_name": "Markazi Text",
  "voice": "body",
  "subset": "arabic",
  "license_url": "https://github.com/EkType/Markazi/raw/master/OFL.txt",
  "source_repo": "EkType/Markazi",
  "files": [{
    "weight": "400 700",
    "style": "normal",
    "variable": true,
    "out": "markazi-text-VF.woff2",
    "source_url": "https://github.com/EkType/Markazi/raw/master/fonts/webfonts/MarkaziText[wght].woff2",
    "source_format": "woff2"
  }]
}
// ... and so on for 7 more families
```

### ٢. سكربت bootstrap محسَّن `scripts/elan-β1-fonts.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail
# ÊLAN v4 — β1 — Local Font Procurement (verified)

ROOT="$(git rev-parse --show-toplevel)"
FONTS_DIR="$ROOT/platform/assets/fonts"
MANIFEST="$FONTS_DIR/MANIFEST.json"

if ! command -v jq >/dev/null; then
  echo "❌ jq required"; exit 1
fi

if ! command -v pyftsubset >/dev/null; then
  pip install --user fonttools brotli zopfli
fi

# Read manifest, download each file
total_expected=$(jq '[.families[].files[]] | length' "$MANIFEST")
echo "📥 Expected files: $total_expected"

jq -c '.families[]' "$MANIFEST" | while read -r family; do
  fid=$(echo "$family" | jq -r .id)
  mkdir -p "$FONTS_DIR/$fid"
  echo "$family" | jq -c '.files[]' | while read -r file; do
    url=$(echo "$file" | jq -r .source_url)
    out=$(echo "$file" | jq -r .out)
    fmt=$(echo "$file" | jq -r .source_format)
    target="$FONTS_DIR/$fid/$out"

    if [[ -f "$target" && $(stat -c%s "$target") -gt 10000 ]]; then
      echo "   ✓ exists: $fid/$out"; continue
    fi

    echo "   ⬇ $fid/$out from $url"
    case "$fmt" in
      woff2)
        curl -fsSL "$url" -o "$target" ;;
      ttf|ttf-variable)
        tmp="/tmp/$fid-$out.ttf"
        curl -fsSL "$url" -o "$tmp"
        unicode_range=$(jq -r --arg s "$(echo "$family" | jq -r .subset)" \
          '.subset_targets[$s]' "$MANIFEST")
        pyftsubset "$tmp" \
          --output-file="$target" \
          --flavor=woff2 \
          --unicodes="$unicode_range" \
          --layout-features='*' \
          --notdef-outline --recommended-glyphs
        rm -f "$tmp" ;;
    esac
  done

  # download license
  lic_url=$(echo "$family" | jq -r .license_url)
  lic_name=$(echo "$family" | jq -r '.license_filename // "OFL.txt"')
  curl -fsSL "$lic_url" -o "$FONTS_DIR/$fid/$lic_name" || true
done

# Verify
actual=$(find "$FONTS_DIR" -name "*.woff2" | wc -l)
echo ""
echo "📊 Verification:"
echo "   Expected: $total_expected"
echo "   Actual:   $actual"
[[ "$actual" -ge "$total_expected" ]] && echo "✅ β1 procurement complete" \
  || { echo "❌ Missing files"; exit 1; }
```

### ٣. تحديث `tokens/_type.css` بـ @font-face declarations حقيقية

```css
/* ÊLAN v4 — β1 — @font-face for 7 families */

@font-face {
  font-family: "Boutros Modern Kufi";
  src: url("../../fonts/boutros-modern/boutros-modern-kufi-VF.woff2") format("woff2-variations");
  font-weight: 400 900;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+FB50-FDFF, U+FE70-FEFF, U+0020-007F;
}

@font-face {
  font-family: "Vazirmatn";
  src: url("../../fonts/vazirmatn/vazirmatn-VF.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669, U+FB50-FDFF, U+FE70-FEFF, U+0020-007F, U+0030-0039;
}

@font-face {
  font-family: "Markazi Text";
  src: url("../../fonts/markazi-text/markazi-text-VF.woff2") format("woff2-variations");
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+FB50-FDFF, U+FE70-FEFF, U+0020-007F;
}

@font-face {
  font-family: "Almarai";
  src: url("../../fonts/almarai/almarai-400.woff2") format("woff2"),
       url("../../fonts/almarai/almarai-700.woff2") format("woff2");
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+0660-0669, U+0030-0039, U+FB50-FDFF, U+FE70-FEFF;
}

@font-face {
  font-family: "Amiri Quran Colored";
  src: url("../../fonts/amiri-quran/amiri-quran-colored.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+FB50-FDFF, U+FE70-FEFF;
}

@font-face {
  font-family: "Lateef";
  src: url("../../fonts/lateef/lateef-VF.woff2") format("woff2-variations");
  font-weight: 200 800;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+FB50-FDFF, U+FE70-FEFF;
}

@font-face {
  font-family: "29LT Bukra";
  src: url("../../fonts/bukra/bukra-VF.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+FB50-FDFF, U+FE70-FEFF, U+0020-007F;
}

@font-face {
  font-family: "Geist";
  src: url("../../fonts/geist/geist-VF.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0020-024F, U+1E00-1EFF, U+2000-206F;
}

@font-face {
  font-family: "JetBrains Mono";
  src: url("../../fonts/jetbrains-mono/jetbrains-mono-VF.woff2") format("woff2-variations");
  font-weight: 100 800;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0020-024F, U+0030-0039, U+2000-206F;
}
```

### ٤. حذف `@font-face` declarations القديمة من `tokens.css` و الانتقال إلى `tokens/_type.css`

(تم تخطيطها في α2، تُنفَّذ هنا)

---

## Sandbox Network Caveat

**هام:** الـ AI sandbox يعمل في mode `INTEGRATIONS_ONLY` (لا يصل لـ github.com/raw مباشرة). هذا يعني:

1. الـ AI **لا يستطيع** تحميل الـ woff2 binaries بنفسه
2. الـ AI **يكتب** السكربت + MANIFEST + @font-face declarations
3. **المستخدم** يشغّل السكربت محلياً (`bash scripts/elan-β1-fonts.sh`) في موقعه
4. المستخدم يـ commit + push النتيجة (الـ binaries)
5. الـ AI يعتبر β1 مكتمل **بعد** verify أن `find platform/assets/fonts -name "*.woff2" | wc -l ≥ 12`

هذه الشفافية جزء من مذهب ÊLAN — لا ادعاء بدون verify.

---

## Acceptance Criteria

- [ ] `MANIFEST.json` محدَّث بـ 9 عائلات جديدة (لا واحدة من Google Fonts CDN كمصدر)
- [ ] `scripts/elan-β1-fonts.sh` موجود وقابل للتنفيذ (chmod +x)
- [ ] `tokens/_type.css` يحتوي 9 @font-face declarations
- [ ] `tokens.css` (و القديم) لا يحتوي أي @font-face بعد α2+β1
- [ ] **بعد تشغيل السكربت محلياً:** `find platform/assets/fonts -name "*.woff2" | wc -l` ≥ 12
- [ ] كل عائلة لها مجلد + ملف `OFL.txt` أو `LICENSE.txt`
- [ ] حجم total fonts ≤ 380 KB (≤ 60 KB لكل عائلة بعد subsetting)
- [ ] `index.html` لا يحتوي أي `<link href="fonts.googleapis.com">`
- [ ] commit: `β1: Local Font Procurement — verified: woff2_files=<N>, fonts_size_kb=<S>, google_links=0`

---

## بعد β1

ابدأ β2 (Voice Casting) — توزيع 18 voice token على الـ 7 عائلات حسب الصفحة.

— نهاية β1 —
