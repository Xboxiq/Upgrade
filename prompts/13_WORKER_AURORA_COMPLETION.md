# 🌅 WORKER 13 — AURORA Completion (Cathedral v15.1)
> **Type:** ترميم + إنجاز (يكمل ما فشل في Worker 12).
> **يبني فوق:** Worker 12 (AURORA / Cathedral v15) — لا يلغيه.
> **الهدف الواحد:** إنجاز ثلاث مهام بقيت ناقصة في Worker 12 رغم أن PR #44 ادّعى اكتمالها.
> **الفلسفة:** *Truth over claims. Verify before you ship.*

---

## 🛡️ Preservation Guard — اقرأ هذا أولاً

> هذا أهم قسم في كامل Worker 13. لو تجاهلته، الـ Worker سيفشل ولو كل phase نُفّذ بشكل صحيح فردياً.

### ⛔ القاعدة الذهبية الواحدة

> **Worker 13 = ترميم. لا تعيد الكتابة. لا تحذف ميّزة. لا تكسر API.**
> كل phase هنا موجَّه لمعالجة **قصور موثَّق** في الكود الحالي. لا توسّع النطاق.

### 🚫 الأخطاء القاتلة الستة (إذا حصل أحدها → توقّف فوراً)

1. ❌ **rewrite-from-scratch** — كتابة `platform/index.html` أو `style.css` أو `app.js` من البداية.
2. ❌ **delete-existing-feature** — حذف صفحة أو وحدة تدريبية أو حاسبة أو lab.
3. ❌ **break-Upg-API** — تغيير أو حذف أي من 14 module: `Upg.{theme, icons, gateway, calc, cmdk, state, production, type, scroll, nav, identity, greet, countup, motion}`.
4. ❌ **claim-without-verify** — لا تكتب في PR description أرقاماً لم تتحقق منها بـ `grep` فعلي على الكود بعد commit.
5. ❌ **partial-implementation-then-claim-success** — لو ما خلّصت Phase، لا تعلن إنجازها.
6. ❌ **mass-refactor** — أي تعديل يلمس >150 سطر موجود في تعديل واحد بدون phase-spec يأمر به صراحة.

### 📦 الأصول المُقدّسة (Sacred Assets) — تُحفظ كما هي

| ما يجب الحفاظ عليه 100% | الوضع المتوقّع بعد Worker 13 |
|---|---|
| 16 page sections (`<section class="page" id="page-*">`) | كلها موجودة، نفس IDs، تشتغل |
| 391 qcalc references | موجودة، تشتغل، نفس السلوك |
| 14 Upg.* APIs (theme..motion) | كلها معرّفة، نفس signatures |
| `#cath-skill-grid`, `#cath-activity-list`, كل `[data-cath-stat]` | تبقى — Worker 11 state يستعلم عنها |
| 37 `.qi` icons | بنفس العدد |
| Cairo + Reem Kufi + Readex Pro + IBM Plex Arabic + Aref Ruqaa | موجودين في الـ stack |
| Service Worker + manifest + favicon | تبقى |
| 4 glass tiers (`--glass-thin/regular/thick/chrome`) | لا تُلمس |
| 15 per-page identity tints | لا تُلمس |

### ✅ ماذا يفعل Worker 13 فعلاً (الجواب الدقيق)

في كل phase، **ثلاث عمليات فقط مسموح بها**:

1. **ADD** — إضافة utilities CSS جديدة، classes جديدة، content بداخل عناصر موجودة.
2. **AUGMENT** — إضافة class إضافي على عنصر موجود، إضافة data-attribute، إضافة aria-attribute.
3. **NEUTRALIZE** — استبدال inline `style="..."` بـ class، أو حذف `!important` غير المبرّر — **بشرط** التأكد إن السلوك البصري لم يتغيّر.

> أي عملية رابعة (delete, rewrite, replace logic, restructure)؟ → **ممنوعة بدون phase-spec يأمر بها صراحة**.

### 🔍 Pre-Flight Inspection Protocol — قبل كل phase

```
🔍 PRESERVATION INSPECTION (Phase N)
├─ Files I will TOUCH: …
├─ Files I will NEVER TOUCH: archive/*, prompts/*, sw.js, manifest.webmanifest, favicon.svg
├─ Sacred Assets check (run before edits):
│   - [ ] grep -c '<section class="page"' platform/index.html  → 16
│   - [ ] grep -c "qcalc" platform/index.html                    → 391
│   - [ ] grep -c "window.Upg" platform/assets/app.js           → ≥36
└─ Awaiting confirmation: proceed? (y/n)
```

### 🧪 Post-Phase Sanity Probe — بعد الـ commit

```
🧪 SANITY AFTER PHASE N
├─ Pages count:        16 (was 16)        ✓
├─ qcalc instances:    391 (was 391)      ✓
├─ Upg APIs present:   14/14              ✓
├─ Console errors:     0                  ✓
├─ Cairo still loads:  yes                ✓
└─ Visual regression:  none               ✓
```

لو أي ✗ → **rollback فوراً** (`git reset --hard HEAD~1`) + توقّف.

---

## 🧭 لماذا Worker 13 ضروري؟

PR #44 (Worker 12) ادّعى إنجاز 7 phases و دُمج على main. الفحص الفعلي بعد الدمج كشف:

| Phase 12 | الادعاء | الواقع المُتحقَّق منه |
|---|---|---|
| 1 — Typography | ✓ | ✅ موجود (10 text tokens + 13 space tokens + Upg.type) |
| 1B — Arabic typeface | ✓ | ✅ موجود (5 خطوط + Aref Ruqaa + Thmanyah) |
| 2 — Linen-Bone | ✓ | ✅ موجود (palette + tonal-tint) |
| 3 — Materials | ✓ | ✅ موجود (4 glass tiers + Upg.scroll) |
| 4 — Navigation Chrome | ✓ | ⚠️ CSS موجود + Upg.nav API، لكن HTML لم يأخذ `data-sidebar` ولم يضاف toggle button |
| **5 — Dashboard Hero** | ✓ | ❌ **لم يُنفَّذ في HTML**: لا `class="bento"`, لا `data-greet-title`, لا `data-countup`. الـ dashboard لا زال يعرض `cath-dash` + `welcome-banner` legacy |
| 6 — Motion | ✓ | ✅ موجود (easing tokens + Upg.motion + View Transitions) |
| **7 — Inline Purge** | "1671→587، !important 13 stray" | ❌ **فشل**: inline=**592**, !important غير مبرّر=**100**، utility classes `u-grad-*` = **0** (لم تُكتب أصلاً) |

**Worker 13 يُكمل المهام الناقصة الثلاث:**
1. **Phase 1:** Bento Dashboard (ينجز Phase 5 من Worker 12).
2. **Phase 2:** Inline Purge الفعلي (ينجز Phase 7 من Worker 12).
3. **Phase 3:** Polish أخير — sidebar toggle + wordmark accent + sanity probe.

---

## 📋 خريطة الـ Phases

| # | الملف | الناتج الرئيسي | تقديريًا |
|---|---|---|---|
| 1 | `13_PHASE_1_BENTO_DASHBOARD.md` | تحويل `#page-dashboard` markup إلى Bento + greeting + count-up + dock | ~520 سطر |
| 2 | `13_PHASE_2_INLINE_PURGE_FOR_REAL.md` | utilities pack + cleanup script V2 + inline 592→≤200 + !important 100→≤20 | ~640 سطر |
| 3 | `13_PHASE_3_FINAL_POLISH.md` | sidebar toggle btn + wordmark accent + Aref Ruqaa quote utility + boot sanity | ~340 سطر |

> **مجموع تقريبي:** ~1,500 سطر، 3 phases، session واحد لكل phase.

> **ترتيب التنفيذ المُلزِم:** `1 → 2 → 3`. لا قلب، لا تقديم.

---

## 🛠️ بروتوكول التنفيذ (مطابق لـ AUTO_PILOT)

1. **Branch واحد طولي**: `worker-13-aurora-completion` ينشأ في **بداية Phase 1** من `main` المحدّث.
2. **بقية الـ phases** تستمر على نفس الـ branch.
3. **بعد كل phase**: commit → push → state-commit → push (قاعدة 2-push).
4. **PR واحد** في النهاية: `feat: Worker 13 — AURORA Completion (Bento + Real Inline Purge + Polish)` → main.
5. **Session واحد = phase واحد** (قاعدة AUTO_PILOT).

---

## 🚫 ممنوعات قاطعة

- ❌ إضافة Tailwind / Bootstrap / أي CDN.
- ❌ تكسير الـ 14 `Upg.*` APIs.
- ❌ تعديل `archive/` أو `prompts/` (إلا لو طلب المستخدم صراحة).
- ❌ إضافة hero/banner ثاني — Phase 1 يُلغي المكرر، لا يضاعفه.
- ❌ ادعاء إنجاز رقم لم يُحقَّق منه بـ `grep`.

---

## ✅ مقاييس النجاح (موحّدة عبر كل الـ phases)

في نهاية Worker 13:

| المقياس | قبل (الواقع الحالي) | الهدف بعد |
|---|---:|---:|
| `class="bento"` في #page-dashboard | 0 | ≥ 1 |
| `data-greet-title` | 0 | 1 |
| `data-countup` | 0 | ≥ 4 |
| `class="dock"` في #page-dashboard | 0 | 1 |
| inline `style="..."` في index.html | 592 | ≤ 200 |
| `!important` غير مبرّر | 100 | ≤ 20 |
| `u-grad-brand`, `u-grad-success`, إلخ utilities | 0 | ≥ 5 |
| sidebar toggle button في topbar-actions | غير موجود | 1 |
| 16 page sections | 16 | 16 (preserved) |
| 391 qcalc references | 391 | 391 (preserved) |
| 14 Upg.* APIs | 14 | 14 (preserved) |
| Console errors | 0 | 0 |

---

## 🎬 كيف يستخدمه AUTO_PILOT

```
1. AUTO_PILOT يفتح state/PROGRESS.json → يقرأ next_action.
2. لو فيه "Worker 13" → يقرأ هذا الفهرس مرة واحدة.
3. يفتح فقط ملف الـ phase الحالي (13_PHASE_<N>_*.md).
4. ينفّذ Phase، يعمل commit+push، يحدّث state، commit+push ثانٍ.
5. session واحد = phase واحد. توقّف بعد phase وحدة.
6. ينشئ PR واحد في النهاية: feat: Worker 13 — AURORA Completion.
```

— نهاية الفهرس. الملفات التفصيلية في `13_PHASE_*.md`.
