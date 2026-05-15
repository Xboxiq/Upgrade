---
inclusion: manual
description: "قواعد المشروع — يُستدعى يدوياً عند الحاجة، لا يُحقن تلقائياً"
---

# قواعد منصة Upgrade — مرجع مختصر

> **هام:** هذا الملف `inclusion: manual` لمنع تضخم الـ context.
> Kiro لن يحقنه إلا لو طلبته صراحة بـ `#PROJECT_RULES`.

## أساسيات
- ملف واحد HTML (سيُشطّر لاحقاً): `arabic-training-platform-v12 (1) (4) (1) (1) (1).html`
- Vanilla HTML/CSS/JS — لا frameworks، لا CDN جديد
- RTL عربي، خط Cairo، Quantum Leap v12.2 design system

## الـ design tokens المتاحة
`--bg, --surface, --surface-2, --accent (#66FCF1), --text, --glass-bg, --glass-blur, --glow-accent, --radius-md, --transition`

## utility classes جاهزة
`.ql-glass, .ql-float, .ql-pulse, .ql-geo-grid, .span-4/5/6/8/12, .ql-eyebrow`

## المعايير الإلزامية
1. كل وحدة محتوى → 8+ citations علمية مرئية
2. Iraq block إلزامي (رواتب IQD، اعتراضات بالعراقي، شركات محلية)
3. Lab تفاعلي واحد على الأقل
4. localStorage keys بادئة `upg_`
5. JS داخل IIFE
6. CSS additive فقط (لا تكسر utilities قائمة)

## للبرومتات الكاملة
راجع: `prompts/00_MASTER_PROMPT.md` و `prompts/01-09_WORKER_*.md`

## لحل context limit
راجع: `prompts/CONTEXT_LIMIT_FIX.md`
