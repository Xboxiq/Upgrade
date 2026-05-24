# ε5 — Content Revival: lab
> **Pillar ε / Stage 5 of 12** — العالم: نار (Naar)

---

## 🎨 Creativity Beacon

**Type:** ✍️ TYPOGRAPHIC_BEACON
**The Surprise:** السيناريوهات في lab تَعرض كـ "lab notebook" — صفحة دفتر مهندس مع grid background dotted (Brutalist blueprint). كل سيناريو مكتوب **بنوع مختلف حسب نوع التحدي**:
- تحدي تفكير → Markazi Text serif
- تحدي عَمَل → 29LT Bukra display-h
- تحدي حساب → Almarai numeric tabular
- تحدي مفاوضة → Vazirmatn UI

التنوع التايبوغرافي يَخدم التمييز السريع بين أنواع التحديات.

**Reference Avoided:** uniform card grid
**Inspired-by:** Engineering lab notebook conventions
**Originality Self-Score:** 4/5

---

## المحتوى (10 سيناريوهات)

1. **تحدي تشخيص**: شركة فقدت 30% مبيعات في شهر — ما السبب؟
2. **تحدي إعادة هيكلة**: 8 موظفين، 3 يَجب أن يُعدَّلوا — كيف تُخبرهم؟
3. **تحدي تسعير**: منافس قطع 18% — هل تَتبع أم تَختلف؟
4. **تحدي توسعة**: مدينة جديدة، ميزانية شحيحة — أين تبدأ؟
5. **تحدي شريك**: شريكك يَطلب 50/50، أنت تستحق 70 — كيف تتفاوض؟
6. **تحدي عميل صعب**: زبون أعمال يَهدد بالانسحاب
7. **تحدي حقوق**: موظف اكتشف غش زميل
8. **تحدي رأس مال**: تمويل 500K أو bootstrap؟
9. **تحدي SKU**: 250 منتج، 80% المبيعات من 30 — تَخفيض؟
10. **تحدي رحيل**: مدير تنفيذي يَنسحب وقت حرج

### 🇮🇶 Iraq Block
> "السيناريوهات في العراق غالباً تتأثر بـ '3 لاعبين خفيين': مزاج الموظف، الكاش flow الموسمي (دفعات حكومية)، والمنافس غير المُسجَّل. تجاهل أي واحد = خسارة محسوبة." — Iraqi Business Council Brief 2024

---

## التنفيذ

### ١. CSS
```css
[data-world="naar"] .lab-notebook {
  background: var(--anchor-bg);
  background-image:
    radial-gradient(circle, color-mix(in oklch, var(--ink) 12%, transparent) 1px, transparent 1px);
  background-size: 8px 8px;
  border: 2px solid var(--line);
  padding: var(--s-6);
  position: relative;
  font-family: var(--voice-body);
}

[data-world="naar"] .lab-notebook::before {
  content: attr(data-scenario-num);
  position: absolute;
  top: -14px;
  left: var(--s-4);
  background: var(--ember);
  color: var(--anchor-bg);
  padding: 2px 12px;
  font-family: var(--voice-display-h);
  font-weight: 800;
  font-size: var(--fs-sm);
}

[data-world="naar"] .lab-notebook[data-type="thinking"]   { font-family: var(--voice-body); }
[data-world="naar"] .lab-notebook[data-type="action"]     { font-family: var(--voice-display-h); font-weight: 700; }
[data-world="naar"] .lab-notebook[data-type="numeric"]    { font-family: var(--voice-num-tabular); }
[data-world="naar"] .lab-notebook[data-type="negotiation"]{ font-family: var(--voice-ui); }
```

### ٢. JS
```javascript
import { icon } from '../core/icons.js';

const TYPE_ICONS = {
  thinking:    'brain',
  action:      'lightning',
  numeric:     'scales',
  negotiation: 'handshake',
};

export function decorateScenarios() {
  document.querySelectorAll('[data-world="naar"] .lab-notebook[data-type]').forEach(nb => {
    const type = nb.dataset.type;
    const iconName = TYPE_ICONS[type];
    if (!iconName) return;
    if (nb.dataset.iconAdded) return;
    const ic = icon(iconName, { size: 'lg', color: 'ember' });
    ic.style.float = 'right';
    nb.prepend(ic);
    nb.dataset.iconAdded = 'true';
  });
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'naar') decorateScenarios();
});
```

---

## Acceptance Criteria

- [ ] 10 scenarios with PROVE-IT
- [ ] Iraq Block
- [ ] Each scenario has `data-type` (thinking/action/numeric/negotiation)
- [ ] Different voice per type
- [ ] Scenario number badge top-left of notebook
- [ ] icon per type from Phosphor (لا emoji)
- [ ] commit: `ε5: Lab revived — verified: scenarios=10, type_voices=4, naar=on, blueprint_grid=on`
- [ ] Beacon recorded

— نهاية ε5 —
