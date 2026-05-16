# 🌌 WORKER 12 — AURORA / Cathedral v15 — Apple-Grade UI/UX Pass
> **Type:** معماري + بصري (ليس محتوى تدريبي).
> **يبني فوق:** Worker 11 (Cathedral v14) — لا يلغيه، يرفعه.
> **الهدف الواحد:** نقل المنصة من "احترافي جيد" إلى "Apple-grade" — شيء يبدو وكأنه جزء من نظام iOS / iPadOS / macOS Sonoma.
> **الفلسفة:** *Materials over colors. Tokens over magic numbers. Calm over loud.*

---

## 🧭 لمَ AURORA الآن؟

Worker 11 أعطانا **العمود الفقري** (tokens, icons, gateway, calc, cmdk, state, PWA). لكن الواجهة لا تزال تحمل بصمة **v12 الأولى**: عناوين ثابتة، tints مدمَجة inline، ثيم off-white بارد، حركة شحيحة، سايدبار ثقيل، Topbar مسطّح، ولوحة تحكم فيها هيرو مكرر.

AURORA يحلّ هذا في 7 مراحل، كل واحدة **branch واحد، PR واحد، push بعد كل phase**.

النتيجة المُتوقّعة بعد Worker 12:
- **نظام خطوط عربية فاخر** بـ 4 أصوات: Reem Kufi (display) + Readex Pro (text) + IBM Plex Arabic (numeric) + Aref Ruqaa (accent calligraphic) — مع دعم Thmanyah self-hosted كترقية اختيارية.
- **Off-white "Linen-Bone"** بدلاً من الأبيض الرمادي — دافئ، طبقي، يحاكي خامة *macOS Sonoma + iOS 17 Translucent Materials*.
- **4 طبقات Glass** (Thin/Regular/Thick/Chrome) كما في `UIVisualEffectView` — لا طبقة واحدة كما حالياً.
- **Source-List Sidebar** كـ Finder: pill selection ينزلق spring، tints هويّة لكل قسم.
- **Dynamic-Island Topbar**: group واحد عائم، يتقلّص عند التمرير، يعرض breadcrumb + بحث + ثيم + قفل.
- **Type Scale عبر `clamp()`** — Display / Title / Body / Caption — مع stack عربي/إنجليزي يحاكي SF Pro Arabic.
- **4pt Spacing Grid** — كل margin/padding يتبع `--space-1..--space-12` (4..96px).
- **Apple Easing Tokens** — `--ease-emphasized`, `--ease-decelerate`, `--ease-spring` + `prefers-reduced-motion`.
- **Per-Page Identity Tint** — كل صفحة تحمل لمستها (callcenter=cyan, hr=violet, accounting=amber, …) بدون إغراق.
- **Inline Purge** — من 1602 → ≤200 inline style، من 144 → ≤20 `!important`.
- **Bento Dashboard** — هيرو واحد، Bento 12-col asymmetric grid، count-up tickers، dock اختصارات.

---

## 📋 خريطة الـ Phases

| # | الملف | الناتج الرئيسي | تقديريًا |
|---|---|---|---|
| 1  | `12_PHASE_1_TYPOGRAPHY_SPATIAL.md`  | Type-scale + 4pt spacing + reading rhythm + tabular numerals | ~520 سطر |
| 1B | `12_PHASE_1B_TYPEFACE_SOUL.md`      | **Premium Arabic stack: Reem Kufi + Readex Pro + IBM Plex Arabic + Aref Ruqaa (+ Thmanyah optional)** | ~480 سطر |
| 2  | `12_PHASE_2_OFFWHITE_RECHISEL.md`   | Linen-Bone palette + tinted shadows + `!important` purge | ~480 سطر |
| 3  | `12_PHASE_3_MATERIALS_DEPTH.md`     | 4-tier glass + scroll elevation + edge-light + grain refresh | ~560 سطر |
| 4  | `12_PHASE_4_NAVIGATION_CHROME.md`   | Source-List sidebar + Dynamic-Island topbar + badge tokens | ~620 سطر |
| 5  | `12_PHASE_5_DASHBOARD_HERO.md`      | Bento dashboard + count-up + dock + per-page identity tint | ~640 سطر |
| 6  | `12_PHASE_6_MOTION_INTERACTION.md`  | Apple easing tokens + springs + cursor glow + page transitions | ~520 سطر |
| 7  | `12_PHASE_7_INLINE_PURGE.md`        | Inline → utility classes + `!important` ≤20 + Lighthouse pass | ~580 سطر |

> **مجموع تقريبي:** ~4,400 سطر، موزّعة على 8 phases (≤600/phase) لتجنّب context limit.

> **ترتيب التنفيذ المُلزِم:** `1 → 1B → 2 → 3 → 4 → 5 → 6 → 7`. Phase 1B مرتبط ببنية Phase 1 ولا يمكن قلب الترتيب.

---

## 🌐 معايير عالمية مرجعية (مصادر التصميم — لا يُنسخ منها كود، تُستلهم منها قواعد)

- **Apple Human Interface Guidelines** — Materials, Layout, Motion, Sidebars, Inspectors.
- **Refactoring UI** (Adam Wathan & Steve Schoger) — tinted shadows, layered surfaces, deemphasis, no pure black.
- **Linear App** — sidebar grouping, command palette UX, calm motion.
- **Stripe Press / Stripe Dashboard** — typography rhythm, micro-numerals، monochrome ramps.
- **Vercel Geist Design** — focus rings, density, button states.
- **Notion** — Source-list pill, tint-per-workspace.
- **Material 3 Expressive (Google)** — surface tonal elevation logic (نأخذ المنطق فقط، الذوق آبل).
- **SF Pro Arabic / IBM Plex Sans Arabic** — type stack inspiration (نستعمل Cairo + ضبط tracking/leading لمحاكاة الرسم).

> **القاعدة:** نستلهم النظام، لا نستنسخ. كل قيمة تُكتب من أول كأنها لمنصتنا.

---

## 🛠️ بروتوكول التنفيذ (مطابق لـ AUTO_PILOT)

1. **Branch واحد طولي**: `worker-12-aurora` ينشأ في **بداية Phase 1** من `main` المحدّث.
2. **بقية الـ phases** تستمر على نفس الـ branch — لا branch جديد لكل phase.
3. **بعد كل phase**:
   - commit رسالة: `phase N (aurora): <العنوان>`.
   - **push فوراً** للـ remote (أهم قاعدة).
   - حدّث `state/PROGRESS.json` (current.phase = N) + snapshot في `state/snapshots/worker-12-phase-N.json`.
   - commit ثانٍ: `state: aurora phase N committed and pushed`.
   - **push ثانٍ فوراً**.
4. **PR واحد** في نهاية Worker (أو نهاية session لو context ضرب): من `worker-12-aurora` → `main`.
5. **لا تكسر Worker 11 أبداً** — كل التعديلات additive عبر الـ bridge layer أو tokens جديدة. القواعد القديمة تُعاد كتابتها فقط لو فيها `!important` أو inline gradient.

---

## 🚫 ممنوعات قاطعة

- ❌ إضافة Tailwind / Bootstrap / Framer-Motion / GSAP / أي CDN.
- ❌ تكسير الـ `Upg.*` public APIs الموجودة (theme, icons, gateway, calc, cmdk, state, production).
- ❌ تعديل `archive/` أو `prompts/` (إلا لو طلب المستخدم صراحة).
- ❌ إضافة hero/banner ثاني — Worker 12 يُلغي المكرر، لا يضاعفه.
- ❌ ألوان hex مباشرة في القواعد الجديدة — تستخدم tokens أو `color-mix(in oklch, …)`.

---

## ✅ مقاييس النجاح (موحّدة عبر كل الـ phases)

في نهاية Worker 12:

| المقياس | قبل | الهدف بعد |
|---|---|---|
| `grep -c '!important' platform/assets/style.css` | 144 | ≤ 20 |
| `grep -c 'style=' platform/index.html` | 1602 | ≤ 200 |
| Type tokens (`--text-*` size) | 0 | ≥ 7 |
| Spacing tokens (`--space-*`) | 0 | 12 |
| Easing tokens (`--ease-*`) | 0 | ≥ 5 |
| Glass tiers (`--glass-thin/regular/thick/chrome`) | 1 | 4 |
| Per-page tint identities | 0 | 11 صفحة |
| Lighthouse (mobile) — Performance | ? | ≥ 90 |
| Lighthouse — Accessibility | ? | ≥ 95 |
| Console errors بعد بدء التشغيل | varies | 0 |

---

## 🎬 كيف يستخدمه AUTO_PILOT

```
1. AUTO_PILOT يفتح state/PROGRESS.json → يقرأ next_action.
2. لو فيه "Worker 12" → يقرأ هذا الفهرس مرة واحدة.
3. يفتح فقط ملف الـ phase الحالي (12_PHASE_<N>_*.md) — ليس كل الـ phases.
4. ينفّذ Phase، يعمل commit+push، يحدّث state، commit+push ثانٍ.
5. يكرر حتى يصل phases_total أو ميزانية الـ context.
6. ينشئ PR واحد في النهاية: feat: Worker 12 — AURORA (Apple-grade UI/UX).
```

— نهاية الفهرس. الملفات التفصيلية في `12_PHASE_*.md`.
