# 🎯 CONTENT REORDER RITUAL — طقس إعادة ترتيب المحتوى pedagogically
> **Type:** طقس مستقل (standalone ritual) — يُنفَّذ **مرة واحدة** بأمر واحد بعد اكتمال Worker 17.
> **Scope:** الـ 14 صفحة محتوى (ليس dashboard ولا myprogress).
> **الفلسفة:** *المحتوى الموجود قوي. لكنه مرتَّب بمنطق "زمن الكتابة" لا "زمن التعلم". الطقس يعيد ترتيبه pedagogically — من الأساس إلى الإتقان.*

---

## 📜 البرومت (انسخ من `START` إلى `END` والصق فقط)

```
═══════════ START — CONTENT REORDER RITUAL ═══════════
أنت تُنفِّذ "طقس إعادة ترتيب المحتوى" لمنصة Upgrade.
هذا طقس واحد، session واحد، PR واحد. ليس Worker متعدد phases.

📋 الشروط المسبقة (تحقّق منها قبل البدء):
1) Worker 17 (Content Revival) مكتمل ومدموج في main
   — يجب أن يحمل كل block منهجياً data-difficulty + data-prereq + data-est-minutes
2) Cathedral v16 + Pack v2 Workers 15 و 16 مدموجة
3) state/PROGRESS.json يقول current.worker = "17" و status = "done"

لو شرط واحد ناقص → توقّف فوراً + اطلب توجيه. لا تبدأ.

🎯 المهمة الواحدة:
أعد ترتيب الـ blocks داخل الـ 14 صفحة محتوى وفق منطق pedagogical صعودي:
1. Foundation tier (1-2 ⭐)  — concepts أساسية
2. Practitioner tier (3 ⭐)   — تطبيق متوسط
3. Expert tier (4-5 ⭐)        — إتقان متقدم

كذلك:
- أنشئ صفحة جديدة `page-curriculum` تعرض الخارطة الكاملة + المسارات الموصى بها
- أضف Progression Spine بصري في أعلى كل صفحة (شريط مراحل)
- أضف navigation hints بين البلوكات المرتبطة (Cross-Links)

🔍 خطوات التنفيذ (بالترتيب):

──── Step 1: Pre-Flight Inspection ────

اقرأ:
- state/PROGRESS.json
- prompts/v2/00_MASTER_PROMPT_v2.md (سطور 1-50)
- platform/index.html (grep على `<section class="page"`)

تأكّد من:
✓ 14 page sections (callcenter, fieldsales, accountmgr, social, lab, psych, eq, negotiation, customercare, programming, accounting, phonerepair, hrmastery — dashboard و myprogress خارج النطاق)
✓ كل page section يحتوي blocks مع data-difficulty (1-5) من Worker 17
✓ كل block له data-block-id فريد
✓ 391 qcalc references لا تتغيّر

اطبع:
🎯 RITUAL READY — N pages × M blocks = K total blocks to reorder.

──── Step 2: Reorder Algorithm ────

لكل page section في الـ 14:
1) ابحث عن كل `[data-difficulty]` داخل القسم — اجمعها في array
2) صنّفها إلى 3 tiers بناءً على difficulty:
   - tier 1 (foundation):    blocks بـ difficulty 1-2
   - tier 2 (practitioner):  blocks بـ difficulty 3
   - tier 3 (expert):        blocks بـ difficulty 4-5
3) داخل كل tier، رتّب blocks بحسب dependency chain:
   - blocks بدون prereq أولاً
   - blocks تعتمد على prereq → بعد الـ prereq المُكتمل
4) أضف tier markers بصرية (Progression Spine):
   - شريط أعلى الـ tier فيه نص: "المرحلة 1 — الأساس" / "المرحلة 2 — الممارس" / "المرحلة 3 — الخبير"
5) أعد ترتيب الـ DOM بالترتيب الجديد (innerHTML rebuild حذر — استخدم DocumentFragment)

──── Step 3: HTML Reorganization ────

لكل صفحة، استخدم template:

<section class="page" id="page-XXX" data-page-personality="XXX">
  <header class="page-h">...</header>

  <!-- NEW: Progression Spine -->
  <div class="curr-spine" data-page="XXX">
    <div class="curr-tier curr-tier--foundation">
      <span class="curr-tier-badge">المرحلة 1</span>
      <span class="curr-tier-title">الأساس</span>
      <span class="curr-tier-meta">N blocks · ~M دقيقة</span>
    </div>
    <div class="curr-tier curr-tier--practitioner">...</div>
    <div class="curr-tier curr-tier--expert">...</div>
  </div>

  <!-- Foundation tier blocks (existing, reordered) -->
  <div class="curr-section" data-tier="foundation">
    [block 1 with data-difficulty="1"]
    [block 2 with data-difficulty="1"]
    [block 3 with data-difficulty="2"]
    ...
  </div>

  <!-- Practitioner tier blocks -->
  <div class="curr-section" data-tier="practitioner">
    [block 4 with data-difficulty="3"]
    ...
  </div>

  <!-- Expert tier blocks -->
  <div class="curr-section" data-tier="expert">
    [block 7 with data-difficulty="4"]
    [block 8 with data-difficulty="5"]
    ...
  </div>

  <!-- Existing footer (preserved) -->
  <footer class="page-footer">...</footer>
</section>

──── Step 4: CSS Additions (in style.css) ────

أضف utilities:

/* ─── Curriculum Spine + Tiers ─── */
.curr-spine {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--rhythm-2);
  padding: var(--rhythm-3);
  margin-block-end: var(--rhythm-5);
  background: color-mix(in oklch, var(--color-tint, var(--color-brand)) 8%, var(--color-surface-1));
  border-radius: 1rem;
  border: 1px solid var(--color-border);
}

.curr-tier {
  display: flex;
  flex-direction: column;
  gap: var(--rhythm-1);
  padding: var(--rhythm-2);
  background: var(--color-surface-1);
  border-radius: 0.75rem;
  position: relative;
  transition: transform var(--duration-base) var(--ease-spring);
}

.curr-tier:hover {
  transform: translateY(-2px);
}

.curr-tier::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 0.75rem 0.75rem 0 0;
}

.curr-tier--foundation::before  { background: hsl(160 60% 50%); }
.curr-tier--practitioner::before{ background: hsl(35 90% 55%); }
.curr-tier--expert::before      { background: hsl(0 70% 55%); }

.curr-tier-badge {
  font-family: var(--type-voice-ui);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-muted);
  text-transform: none;
}

.curr-tier-title {
  font-family: var(--type-voice-display);
  font-size: var(--text-lg);
  font-weight: 700;
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.curr-tier-meta {
  font-family: var(--type-voice-numeric);
  font-size: var(--text-xs);
  color: var(--color-text-faint);
  font-feature-settings: "tnum" 1, "lnum" 1;
}

.curr-section {
  margin-block-end: var(--rhythm-8);
  position: relative;
}

.curr-section::before {
  content: attr(data-tier);
  position: absolute;
  inset-inline-start: -2rem;
  top: 0;
  font-family: var(--type-voice-accent);
  font-size: var(--text-xs);
  color: var(--color-text-faint);
  text-transform: capitalize;
  letter-spacing: var(--tracking-wider);
  writing-mode: vertical-rl;
}

.curr-section[data-tier="foundation"]   { border-inline-start: 2px solid hsl(160 60% 50% / 0.4); padding-inline-start: var(--rhythm-3); }
.curr-section[data-tier="practitioner"] { border-inline-start: 2px solid hsl(35 90% 55% / 0.4); padding-inline-start: var(--rhythm-3); }
.curr-section[data-tier="expert"]       { border-inline-start: 2px solid hsl(0 70% 55% / 0.4); padding-inline-start: var(--rhythm-3); }

/* Difficulty stars on each block */
[data-difficulty] {
  position: relative;
}

[data-difficulty]::after {
  content: attr(data-difficulty) "/5 ⭐";
  position: absolute;
  top: 0.5rem;
  inset-inline-end: 0.5rem;
  font-family: var(--type-voice-numeric);
  font-size: var(--text-xs);
  color: var(--color-text-faint);
  font-feature-settings: "tnum" 1, "lnum" 1;
  background: color-mix(in oklch, var(--color-surface-2) 70%, transparent);
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  z-index: 1;
}

/* Cross-links between blocks */
.curr-related {
  margin-block-start: var(--rhythm-2);
  padding: var(--rhythm-2);
  background: color-mix(in oklch, var(--color-surface-2) 50%, transparent);
  border-radius: 0.5rem;
  border-inline-start: 3px solid var(--color-tint, var(--color-brand));
  font-size: var(--text-sm);
}

.curr-related-title {
  font-family: var(--type-voice-ui);
  font-weight: 600;
  margin-block-end: 0.5rem;
}

.curr-related a {
  color: var(--color-brand);
  text-decoration: none;
  font-family: var(--type-voice-ui);
}

.curr-related a:hover {
  text-decoration: underline;
}

──── Step 5: New Page — page-curriculum ────

أضف صفحة جديدة في index.html (قبل page-myprogress):

<section class="page" id="page-curriculum" data-page-personality="dashboard">
  <header class="page-h">
    <span class="page-h-eyebrow type-eyebrow">خارطة الطريق</span>
    <h1 class="type-display">المنهج الكامل</h1>
    <p class="type-body-lead">14 مهارة · 3 مراحل · رحلة pedagogical منظَّمة من الأساس للإتقان.</p>
  </header>

  <div class="curr-map" id="curr-map-root">
    <!-- Generated by Upg.curriculum.render() -->
  </div>

  <div class="curr-paths">
    <h2 class="type-display-h">المسارات الموصى بها</h2>
    <ul>
      <li><strong>مسار البائع:</strong> Sales → Negotiation → CustomerCare → AccountMgr</li>
      <li><strong>مسار الخدمة:</strong> CallCenter → CustomerCare → EQ → Psych</li>
      <li><strong>مسار التقنية:</strong> Programming → PhoneRepair → Lab</li>
      <li><strong>مسار النفس:</strong> Psych → EQ → Negotiation → HRMastery</li>
      <li><strong>مسار العمل المكتبي:</strong> Accounting → AccountMgr → HRMastery</li>
      <li><strong>مسار التسويق:</strong> Social → Negotiation → Psych</li>
    </ul>
  </div>
</section>

أضف navigation entry لـ page-curriculum في sidebar (نفس نمط الصفحات الأخرى).

──── Step 6: Upg.curriculum IIFE في app.js ────

(() => {
  'use strict';
  const PAGES = [
    'callcenter', 'fieldsales', 'accountmgr', 'social', 'lab',
    'psych', 'eq', 'negotiation', 'customercare', 'programming',
    'accounting', 'phonerepair', 'hrmastery'
  ];

  const inventory = () => {
    const result = {};
    PAGES.forEach(p => {
      const page = document.getElementById('page-' + p);
      if (!page) return;
      const blocks = page.querySelectorAll('[data-difficulty]');
      result[p] = {
        total: blocks.length,
        foundation: 0, practitioner: 0, expert: 0,
        estMinutes: 0
      };
      blocks.forEach(b => {
        const d = parseInt(b.getAttribute('data-difficulty'), 10);
        if (d <= 2) result[p].foundation++;
        else if (d === 3) result[p].practitioner++;
        else result[p].expert++;
        result[p].estMinutes += parseInt(b.getAttribute('data-est-minutes') || '0', 10);
      });
    });
    return result;
  };

  const render = () => {
    const root = document.getElementById('curr-map-root');
    if (!root) return;
    const data = inventory();
    let html = '<div class="curr-grid">';
    PAGES.forEach(p => {
      const d = data[p];
      if (!d) return;
      html += `
        <a class="curr-card" href="#page-${p}" data-page-link="${p}">
          <div class="curr-card-title">${p}</div>
          <div class="curr-card-stats">
            <span class="type-num-tabular">${d.total}</span> blocks ·
            <span class="type-num-tabular">${d.estMinutes}</span> دقيقة
          </div>
          <div class="curr-card-tiers">
            <span class="curr-pip curr-pip--foundation" title="Foundation">${d.foundation}</span>
            <span class="curr-pip curr-pip--practitioner" title="Practitioner">${d.practitioner}</span>
            <span class="curr-pip curr-pip--expert" title="Expert">${d.expert}</span>
          </div>
        </a>
      `;
    });
    html += '</div>';
    root.innerHTML = html;
  };

  // Auto-render when page-curriculum becomes active
  document.addEventListener('upg:nav:change', () => {
    if (document.querySelector('#page-curriculum:not([hidden])')) {
      render();
    }
  });

  // Render on first load
  if (document.readyState !== 'loading') render();
  else document.addEventListener('DOMContentLoaded', render);

  window.Upg = window.Upg || {};
  window.Upg.curriculum = { inventory, render, PAGES: PAGES.slice() };
})();

──── Step 7: Curriculum Map Card Styles ────

.curr-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--rhythm-2);
  margin-block: var(--rhythm-4);
}

.curr-card {
  display: flex;
  flex-direction: column;
  gap: var(--rhythm-1);
  padding: var(--rhythm-3);
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: transform var(--duration-base) var(--ease-spring),
              box-shadow var(--duration-base) var(--ease-spring);
}

.curr-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-c-md, 0 4px 16px rgba(0,0,0,.08));
}

.curr-card-title {
  font-family: var(--type-voice-display);
  font-weight: 700;
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  text-transform: capitalize;
}

.curr-card-stats {
  font-family: var(--type-voice-body);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.curr-card-tiers {
  display: flex;
  gap: 0.4rem;
  margin-block-start: var(--rhythm-1);
}

.curr-pip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.6em;
  height: 1.6em;
  border-radius: 0.4rem;
  font-family: var(--type-voice-numeric);
  font-size: var(--text-xs);
  font-weight: 600;
  font-feature-settings: "tnum" 1, "lnum" 1;
  color: var(--color-text);
}

.curr-pip--foundation   { background: hsl(160 60% 50% / 0.20); }
.curr-pip--practitioner { background: hsl(35 90% 55% / 0.20); }
.curr-pip--expert       { background: hsl(0 70% 55% / 0.20); }

──── Step 8: Sanity Probe ────

# Sacred preserved
grep -c '<section class="page"' platform/index.html  # → 16 (added curriculum + myprogress preserved)
grep -c 'qcalc' platform/index.html                   # → 391
grep -oE 'window\.Upg\.[a-z]+' platform/assets/app.js | sort -u | wc -l  # → ≥21 (added curriculum)

# New additions
grep -c 'data-page-personality' platform/index.html   # → 16 (15 + curriculum)
grep -c '\.curr-spine' platform/assets/style.css      # → ≥1
grep -c 'data-tier=' platform/index.html              # → ≥42 (14 pages × 3 tiers)
grep -c 'curr-section' platform/index.html            # → ≥42

──── Step 9: Branch + Commit + PR ────

branch: ritual-content-reorder (من main)
commits:
1. "ritual(reorder): add curriculum spine + tier sections + Upg.curriculum API"
2. "ritual(reorder): reorder all 14 page contents pedagogically by difficulty"
3. "ritual(reorder): add page-curriculum + sidebar entry"
4. "state: ritual content reorder complete"

push بعد كل commit (4 pushes إجمالية).

PR:
title: "ritual: Content Reorder — pedagogical tier system + curriculum map"
body: ملخص مع جدول إحصائيات (كم block في كل tier لكل صفحة) + screenshots conceptual.

──── Step 10: Final State Update ────

state/PROGRESS.json:
{
  "current": {
    "pack": "v2",
    "ritual": "content-reorder",
    "status": "done"
  },
  "completed_rituals": ["content-reorder"],
  "next_action": "Ritual complete. Pack v2 ready for closing or new work."
}

state/snapshots/ritual-content-reorder.json: full snapshot.

🚫 ممنوعات في الـ Ritual:
- ❌ تعديل نصوص المحتوى (text content) — فقط reorder
- ❌ حذف blocks
- ❌ كسر data-block-id
- ❌ تعديل qcalc instances (391 محفوظة)
- ❌ تجاوز 800 سطر (الـ ritual أكبر قليلاً من phase عادي)
- ❌ تنفيذه قبل اكتمال Worker 17

✅ المخرج النهائي:
🎯 RITUAL COMPLETE — Content Reorder
✅ N pages reordered (14 content pages)
✅ K blocks reorganized into 3 tiers
✅ page-curriculum created with map + paths
✅ Upg.curriculum API live
✅ Progression Spine visible on all 14 content pages
🌿 Branch: ritual-content-reorder
🔀 PR: <link>

ابدأ الآن.
═══════════ END — CONTENT REORDER RITUAL ═══════════
```

---

## 🎬 كيف تستخدمه (المستخدم)

### الشروط المسبقة

تأكّد:
1. ✅ Pack v2 Workers 15–17 مكتملة ومدموجة في main
2. ✅ Worker 17 وضع `data-difficulty`, `data-prereq`, `data-est-minutes` على كل block
3. ✅ `state/PROGRESS.json` يقول `current.worker = "17"` و `status = "done"`

### التشغيل

افتح session جديد في Kiro:
1. الصق `prompts/v2/00_MASTER_PROMPT_v2.md`
2. الصق هذا الملف كاملاً (أو فقط البرومت من START إلى END)
3. اكتب: `نفّذ الطقس`
4. عُد بعد ~30 دقيقة، PR جاهز للمراجعة

### بعد الـ Ritual

افتح المنصة في المتصفح:
- ✅ كل صفحة من الـ 14 صار فيها 3 tiers مرئية (Foundation / Practitioner / Expert)
- ✅ كل block يعرض difficulty stars في الزاوية
- ✅ صفحة جديدة `page-curriculum` تعرض الخارطة + المسارات
- ✅ navigation سلس بين blocks مرتبطة (cross-links)

---

## 🛡️ ضمانات الـ Ritual

| الضمانة | الآلية |
|---|---|
| لا يحذف محتوى | reorder DOM فقط، innerHTML rebuild حذر |
| لا يكسر qcalc | 391 references محفوظة |
| لا يكسر Upg.* | يضيف Upg.curriculum بدون لمس القديم |
| لا يلمس archive | hard rule |
| reversible | git revert يعيد الـ DOM للترتيب الأصلي |

---

## 📊 المخرجات المتوقّعة

| البند | قبل الـ Ritual | بعد الـ Ritual |
|---|---:|---:|
| Page sections | 15 (مع dashboard + myprogress) | **16** (+ page-curriculum) |
| Pages with `curr-spine` | 0 | **14** |
| Blocks مع data-difficulty | ~500 (من Worker 17) | 500 (preserved) |
| Tier markers (Foundation/Practitioner/Expert) | 0 | **42** (3 × 14) |
| Cross-links between blocks | 0 | **~50-80** |
| `Upg.curriculum` API | غير موجود | معرَّف |
| Sidebar entry "المنهج" | غير موجود | موجود |

---

## 🔔 الفلسفة النهائية

> الـ Ritual ليس feature. هو **لحظة تحوّل**.
>
> قبله: المحتوى موجود، لكن الترتيب عشوائي.
> بعده: المحتوى **يأخذ بيدك من الأساس إلى الإتقان**.
>
> الـ user يفتح صفحة الكول سنتر، يرى:
> - **المرحلة 1: الأساس** (5 blocks ⭐⭐ — 30 دقيقة)
> - **المرحلة 2: الممارس** (8 blocks ⭐⭐⭐ — 75 دقيقة)
> - **المرحلة 3: الخبير** (4 blocks ⭐⭐⭐⭐⭐ — 60 دقيقة)
>
> **هذا Resonance.**

---

**نهاية CONTENT REORDER RITUAL.**

🎯 طقس واحد. session واحد. تحوّل كامل.
