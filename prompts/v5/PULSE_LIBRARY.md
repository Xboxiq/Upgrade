# ✦ PULSE LIBRARY — مَكتبة النَبض
> Pack v5 / TADAFFUQ. Read-only after this commit (except § ٢ template — referenced by PULSE_LOG.md).

---

## ١. ما هو الـ Pulse؟

الـ Pulse في v5 هو ما كان "Beacon" في v4. لكنه أَدَق:
- **Pulse** = نَبض مفاجئ في تصميم/سلوك stage
- جملة عربية واحدة تَصف "ما الذي لا يُمكن أن يَكون قد أتى من AI آخر"
- مَطلوب في كل stage في γ/δ/ε/ζ/η (5 pillars × ~6 stages = ~30 pulses)
- **غير مَطلوب** في α/β/θ — لأن هذه pillars تَخدم البنية، لا التجربة

---

## ٢. القالب الإجباري للـ PULSE_LOG.md

```markdown
## <stage-id> — <YYYY-MM-DD>
**Category:** <emoji-marker> <CATEGORY_NAME>
**The Surprise:**
<جملة أو جملتان بعربية فصيحة. لا bullet points. لا English.>
**Reference Avoided:** Forbidden #<N> — <name>
**Wild Card Drawn:** <name إن disruption مُفعَّل، وإلا "—">
**User-Visible:** yes / no
**Originality Self-Score:** N/5
**Files touched:** <comma list>
**Verified at commit:** <sha>

---STATS---
total_pulses: <N>
unique_categories_used: <N>
last_3_categories: <c1, c2, c3>
disruption_triggers: <N>
forbidden_violations: <N>
creativity_health: <0-100>
```

**القاعدة:** `---STATS---` block واحد فقط في الـ pulse-log كلها، يُحدَّث في-place. كل ما قبله append-only.

---

## ٣. الـ Forbidden Library (25 entries)

| # | Forbidden | كيف يُكشَف |
|---|---|---|
| 1 | Toast notification (slide from corner) | grep `toast`, `notification-snackbar` |
| 2 | Modal popup (`position: fixed; inset: 0`) | grep `inset:\s*0.*fixed` |
| 3 | Animated counter from 0 | grep `from{counter:0}` keyframes |
| 4 | Spinner عام (rotating circle) | grep `@keyframes spin\|rotation-loader` |
| 5 | Heavy backdrop-filter (≥12px blur) | grep `backdrop-filter:.*blur\(\s*1[2-9]\|[2-9][0-9]px` |
| 6 | Generic emoji في markup | grep emoji range \U+1F300-\U+1F9FF |
| 7 | Toy `<svg viewBox>` يدوي خارج sprite | grep `<svg viewBox` خارج sprite block |
| 8 | Mixed icon families في chrome region | grep `phosphor-\|lucide-` بنفس selector |
| 9 | Hex color خارج tokens | grep `#[0-9a-f]{3,8}` خارج tokens/, worlds/ |
| 10 | Glass blur ladder violation (>16/24/32/40) | grep `backdrop-filter:.*blur\(` value > 40 |
| 11 | Parallax > 24px | grep `translate.*[2-9][5-9]px\|[3-9][0-9]px` |
| 12 | Hover lift > 4px | grep `hover.*translateY\(-[5-9]\|hover.*translateY\(-[1-9][0-9]` |
| 13 | Shimmer مُتواصل > 3s | grep `infinite.*shimmer\|shimmer.*infinite` |
| 14 | Animated counter from 0 (variant) | grep `data-countup-from="0"` |
| 15 | Scroll-jacked hijack (CSS scroll-snap > 1 mandatory) | grep `scroll-snap-type:.*mandatory` على body/html |
| 16 | Inline `style=` في markup مُنتَج جديد | grep `style="` (cap on existing 23) |
| 17 | `!important` خارج motion-sanctuary | grep `!important` خارج _motion-sanctuary.css |
| 18 | Logical-property violation | grep `margin-left\|padding-right\|left:\s*0` |
| 19 | Hardcoded `text-align: left/right` | grep `text-align:\s*(left\|right)` |
| 20 | `<svg viewBox>` بدون `<symbol>` parent | grep `<svg viewBox` بدون `<symbol` precedent |
| 21 | Single-accent rule violation (>1 accent-action) | grep count `--accent-action` per page |
| 22 | Animation duration > 1.2s مع animation-iteration-count: infinite | grep `infinite` مع duration > 1.2s |
| 23 | `position: absolute` بلا `inset-*` logical (يَستخدم `left/right`) | grep `position:\s*absolute` مع `left:` بنفس rule |
| 24 | Custom font CDN load (Google Fonts, etc.) | grep `fonts.googleapis\|fonts.gstatic` |
| 25 | Cursor: pointer على non-interactive (div بدون role/onclick) | grep `cursor:\s*pointer` على selector غير clickable |

---

## ٤. التسع Categories

| Marker | Category | المعنى | أمثلة |
|---|---|---|---|
| 🌊 | **TADAFFUQ-FLOW** | حركة سائلة بين عناصر | sidebar collapse spring، nav-pill morph |
| ✦ | **CULTURAL-ECHO** | لمسة عربية ثقافية | kashida عند بداية h1، arabesque corner |
| ☉ | **SOLAR-MOMENT** | لحظة مُضيئة في تَفصيل | greeting wordmark glow at sunrise hour |
| ⊹ | **HUMBLE-PRECISION** | دِقَّة في تَفصيل لا أحد سيلاحظ | optical alignment ل lam-alif في wordmark |
| ⌬ | **NEGATIVE-SPACE** | فراغ مَقصود يَنطِق | bento cell فارغة intentionally |
| ⥁ | **TEMPORAL-RHYTHM** | إيقاع زمني (ساعات اليوم، الموسم) | aura يَتغيَّر مع time-of-day |
| ⊛ | **TACTILE-WHISPER** | feedback خفيف لا ينافس | press scale 0.985 + tinted ripple |
| ⨀ | **DEPTH-WHISPER** | depth subtle عَبر paper layers | edge specular يَكشف 1px |
| ⌗ | **PATTERN-BREAK** | كَسر نمَط مُتوقَّع | lab page personality صريحة JetBrains Mono display |

---

## ٥. الـ Wild Cards (25 disruption inspirations)

تُسحَب فقط عند:
- creativity_health ≥ 90 (يُسمَح بـ disruption)
- pulse-category تَكرَّرت 3 مرات متتالية (pivot إجباري)

| # | Wild Card | الإلهام |
|---|---|---|
| 1 | Hijri date عابر | لحظة تَزامن غير لاتيني |
| 2 | Quranic verse في إعداد فاخر (eq page) | مَوضع واحد، Aref Ruqaa |
| 3 | Calligraphy stroke كأنه brush | h1 letter-spacing + opsz 144 |
| 4 | Star-and-crescent micro-mark في loading | بَديل spinner |
| 5 | Geometric Islamic pattern كـ favicon | 4-fold symmetry |
| 6 | Sound: oud pluck عند complete | 3-note ascending (Upg.sound موجود) |
| 7 | "بسم الله" عابر في first-load splash | مرة واحدة |
| 8 | Time-of-day greet بعَربي فصيح | الفجر/الضحى/الأصيل |
| 9 | Iraqi proverb في empty state | "ما يطلع المطلوع إلا اللي يجد" |
| 10 | Date palm silhouette كـ section divider | minimal 1-line |
| 11 | Nile-blue → desert-saffron gradient at deep transitions | 1.2s ceremonial |
| 12 | Color-mix oklch math directly in CSS فلتر | `color-mix(in oklch, ..., color-mix(...))` |
| 13 | Optical kerning fix في wordmark fa-yaa | manually tuned |
| 14 | Aux nav: zodiac for time-aware accents | شمسي بَدلاً من gregorian |
| 15 | "تَدَفُّق" calligraphy reveal at startup | once، ثم يَختفي |
| 16 | Ya'-with-tail extending into margin (kashida-margin) | h1 last char extends |
| 17 | Damascus pattern as page-personality watermark | opacity 0.04 |
| 18 | Mihrab arch shape كـ section header decoration | SVG path في sprite |
| 19 | Henna stipple texture على `--paper-elevated` فقط | mask-image SVG |
| 20 | Numeric crescents بَديلاً عن bullet points في ul | content: '☽' |
| 21 | Aurora line under page-h1 (non-static, time-shifting hue) | 60s transition |
| 22 | Geist sans-Latin paired with Reem Kufi | for tech contexts |
| 23 | Right-to-left progress bar growing inside-out | center → ends |
| 24 | Empty-bento cell shows verse fragment in fade-in only | once / page load |
| 25 | Tactile haptic vibration pattern: morse for stage name | mobile-only |

---

## ٦. الـ Pivot Rule

إذا آخر 3 stages في γ/δ/ε/ζ/η استخدمت **نفس Category**:
1. الـ AUTO_PILOT يُعلِن "PIVOT REQUIRED"
2. يَسحب Wild Card رقم `(stage_index % 25) + 1`
3. يَستخدمه كأساس للـ next pulse
4. يَكتب في PULSE_LOG: `**Wild Card Drawn:** #N — <name>`

---

## ٧. Empty PULSE_LOG.md Template

عند إنشاء `state/PULSE_LOG.md` لأول مرة:

```markdown
# 🌊 TADAFFUQ — Pulse Log
> Append-only. كل pulse يُضاف كـ block جديد. لا حذف، لا rewrite.
> Format spec: `prompts/v5/PULSE_LIBRARY.md` § ٢.

---

<!-- Pulses will be appended below this line -->

---STATS---
total_pulses: 0
unique_categories_used: 0
last_3_categories: []
disruption_triggers: 0
forbidden_violations: 0
creativity_health: 0
```

---

## ٨. القاعدة الأم

> **«كل stage يَحمل بصمة. البصمة جملة عربية واحدة. الـ Forbidden 25 لا تُلمَس. الـ Pivot يُحترَم. الـ Pulse-log أرشيف، لا scratchpad.»**

— نهاية PULSE LIBRARY —
