# ε8 — Content Revival: programming
> **Pillar ε / Stage 8 of 12** — العالم: نار (Naar)

---

## 🎨 Creativity Beacon

**Type:** 🏛 STRUCTURAL_BEACON
**The Surprise:** "خريطة المسارات" (learning paths) ليست list. هي **branching tree visual** مرسوم كـ ASCII-art-style SVG: كل مسار خط brutalist (1.75px stroke ember)، الـ branches تَتفرّع من جذع مشترك. عند hover على branch، النصوص في باقي branches تُخفت إلى opacity 0.3 (focus mode). الجذور تُمَّثل skill foundations (HTML/CSS/JS) والأوراق تَمثل career roles (frontend/backend/fullstack).

**Reference Avoided:** linear curriculum list
**Inspired-by:** #1 Iraqi marsh architecture (organic branching) + #8 Japanese ema woodblock layout
**Originality Self-Score:** 5/5

---

## المحتوى (10 مسارات + 7 skills foundation)

### Foundations (مشترك):
1. HTML semantic + accessibility
2. CSS modern (grid, container queries, layers)
3. JS ES2023+ (modules, fetch, await)
4. Git fundamentals
5. Browser DevTools mastery
6. CLI + Linux basics
7. Working with API (REST, JSON)

### Paths:
1. **Frontend Vanilla** — لا framework
2. **Frontend React** — modern stack
3. **Frontend Vue** — opinionated
4. **Backend Node** — express + DB
5. **Backend Python** — FastAPI
6. **Mobile Cross-Platform** — Flutter
7. **DevOps starter** — Docker + GitHub Actions
8. **Data Science basics** — Python pandas
9. **AI Engineer track** — LLM + prompts
10. **Game dev intro** — Godot

### 🇮🇶 Iraq Block
> "في سوق العمل العراقي 2024، الـ remote/freelance أكبر بـ 5x من الـ local job posts للمطوّرين. الإنجليزية المتوسطة + portfolio = أهم من شهادة. ابدأ بـ 'الكود يَتكلَّم' بدل CV." — Bel Inc. + Stack Overflow Iraq Survey

---

## التنفيذ

### ١. CSS
```css
[data-world="naar"] .skill-tree {
  position: relative;
  block-size: 600px;
  background: var(--anchor-bg);
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--ink) 10%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--ink) 10%, transparent) 1px, transparent 1px);
  background-size: 32px 32px;
  border: 2px solid var(--line);
  overflow: hidden;
}

[data-world="naar"] .skill-tree svg {
  inline-size: 100%;
  block-size: 100%;
  display: block;
}

[data-world="naar"] .skill-tree .branch line,
[data-world="naar"] .skill-tree .branch path {
  stroke: var(--ember);
  stroke-width: 1.75;
  fill: none;
  transition: stroke-opacity 200ms;
}

[data-world="naar"] .skill-tree .branch text {
  fill: var(--ink);
  font-family: var(--voice-display-h);
  font-size: 14px;
  font-weight: 700;
  transition: fill-opacity 200ms;
}

[data-world="naar"] .skill-tree[data-focus]:not([data-focus=""]) .branch:not([data-id=""]) {
  opacity: 0.3;
}

[data-world="naar"] .skill-tree[data-focus] .branch[data-id$="_active"] {
  opacity: 1;
}
```

### ٢. JS — `pages/programming.js`
```javascript
import { icon } from '../core/icons.js';

const PATHS = [
  { id: 'fe-vanilla', name: 'Frontend Vanilla', x: 80, y: 100, parent: 'foundations' },
  { id: 'fe-react',   name: 'Frontend React',   x: 220, y: 100, parent: 'foundations' },
  { id: 'fe-vue',     name: 'Frontend Vue',     x: 360, y: 100, parent: 'foundations' },
  { id: 'be-node',    name: 'Backend Node',     x: 80, y: 220, parent: 'foundations' },
  { id: 'be-python',  name: 'Backend Python',   x: 220, y: 220, parent: 'foundations' },
  { id: 'mobile',     name: 'Mobile Flutter',   x: 360, y: 220, parent: 'foundations' },
  { id: 'devops',     name: 'DevOps',           x: 80, y: 340, parent: 'foundations' },
  { id: 'data',       name: 'Data Science',     x: 220, y: 340, parent: 'foundations' },
  { id: 'ai',         name: 'AI Engineer',      x: 360, y: 340, parent: 'foundations' },
  { id: 'game',       name: 'Game Dev',         x: 220, y: 460, parent: 'foundations' },
];

const FOUNDATION = { id: 'foundations', name: 'الأساسيات', x: 220, y: 30 };

export function renderTree(container) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 480 540');

  // Foundation node
  const foundG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  foundG.setAttribute('class', 'branch');
  foundG.dataset.id = FOUNDATION.id;
  const foundText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  foundText.setAttribute('x', FOUNDATION.x);
  foundText.setAttribute('y', FOUNDATION.y);
  foundText.setAttribute('text-anchor', 'middle');
  foundText.textContent = FOUNDATION.name;
  foundG.appendChild(foundText);
  svg.appendChild(foundG);

  // Each path
  PATHS.forEach(p => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'branch');
    g.dataset.id = p.id;

    // Line from foundation to path
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const midY = (FOUNDATION.y + p.y) / 2;
    line.setAttribute('d', `M ${FOUNDATION.x} ${FOUNDATION.y + 8} Q ${FOUNDATION.x} ${midY}, ${p.x} ${midY} T ${p.x} ${p.y - 12}`);
    g.appendChild(line);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', p.x); text.setAttribute('y', p.y);
    text.setAttribute('text-anchor', 'middle');
    text.textContent = p.name;
    g.appendChild(text);

    g.addEventListener('mouseenter', () => container.dataset.focus = p.id);
    g.addEventListener('mouseleave', () => container.dataset.focus = '');
    g.addEventListener('click', () => window.Upg?.nav?.to?.(`programming-path-${p.id}`));

    svg.appendChild(g);
  });

  container.appendChild(svg);
}
```

---

## Acceptance Criteria

- [ ] 7 foundation skills + 10 paths in markup
- [ ] PROVE-IT
- [ ] Iraq Block
- [ ] SVG branching tree renders + interactive
- [ ] hover dims unrelated branches
- [ ] icons: Phosphor laptop, gear, sparkle, monitor (لا emoji)
- [ ] commit: `ε8: Programming revived — verified: paths=10, foundations=7, skill_tree=svg, naar=on`
- [ ] Beacon recorded

— نهاية ε8 —
