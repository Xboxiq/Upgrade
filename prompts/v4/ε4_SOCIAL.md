# ε4 — Content Revival: social
> **Pillar ε / Stage 4 of 12** — العالم: تَيار (Tayyar)

---

## 🎨 Creativity Beacon

**Type:** 🎨 VISUAL_BEACON
**The Surprise:** الـ engagement chart ليس bar chart. هو **VHS scrub bar** — شريط أفقي بـ scan-lines retrowave، يَتحرك المؤشر عليه بحرية. عند تحريك المؤشر، الـ chart يَعرض snapshot منشور في ذلك التاريخ بـ glitch effect 60ms (CSS-only). يَحاكي scrubbing فيديو على شريط VHS.

**Reference Avoided:** standard bar chart
**Inspired-by:** #15 Synthwave + Khat retrowave aesthetic
**Originality Self-Score:** 5/5

---

## المحتوى (9 وحدات)

1. **بناء استراتيجية محتوى لـ 30 يوم** (4 ركائز)
2. **كتابة caption بصيغة عراقية محلية**
3. **Reels قصيرة فعّالة** — قواعد 3-3-3
4. **التعامل مع التعليقات السلبية**
5. **بناء جمهور organic بدون إعلانات**
6. **قياس ROI الحقيقي** — beyond likes
7. **Influencer marketing بالميزانيات الصغيرة**
8. **WhatsApp business + Instagram التكامل**
9. **التحول من Engagement إلى Conversion**

### 🇮🇶 Iraq Block
> "في العراق، Reels عربي بـ صوت محلي يَحقق engagement أعلى بـ 240% مقارنة بـ caption-only. اللهجة العراقية تتغلب على الفصحى في الـ FMCG content بنسبة 3:1." — Meta Business Iraq Insights 2024

---

## التنفيذ

### ١. CSS
```css
[data-world="tayyar"] .vhs-scrub {
  position: relative;
  block-size: 80px;
  background: linear-gradient(180deg, var(--anchor-1), var(--anchor-2));
  border: 1px solid color-mix(in oklch, var(--focus) 30%, transparent);
  border-radius: var(--r-2);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}

[data-world="tayyar"] .vhs-scrub::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    to bottom, transparent 0, transparent 2px,
    color-mix(in oklch, var(--focus) 8%, transparent) 2px,
    color-mix(in oklch, var(--focus) 8%, transparent) 3px
  );
  pointer-events: none;
}

[data-world="tayyar"] .vhs-scrub__track {
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: var(--scrub-pct, 0%);
  background: linear-gradient(90deg, color-mix(in oklch, var(--ember) 25%, transparent), var(--ember));
  border-inline-end: 2px solid var(--focus);
  transition: inline-size var(--t-2);
}

[data-world="tayyar"] .vhs-scrub__cursor {
  position: absolute;
  inset-block: 0;
  inset-inline-start: var(--scrub-pct, 0%);
  inline-size: 2px;
  background: var(--focus);
  box-shadow: 0 0 12px var(--focus);
}

[data-world="tayyar"] .vhs-snapshot {
  font-family: var(--voice-numeric);
  margin-block-start: var(--s-3);
  padding: var(--s-3);
  background: var(--anchor-bg);
  border: 1px solid var(--line);
  border-radius: var(--r-2);
  transition: filter var(--t-1);
}

@keyframes vhs-glitch {
  0%, 100% { filter: none; transform: translate(0); }
  25%      { filter: hue-rotate(15deg); transform: translate(-1px, 0); }
  75%      { filter: hue-rotate(-15deg); transform: translate(1px, 0); }
}

[data-world="tayyar"] .vhs-snapshot[data-glitching="true"] {
  animation: vhs-glitch 60ms;
}
```

### ٢. JS — `pages/social.js`
```javascript
export function bindScrub(scrub, posts, snapshotEl) {
  function update(pct) {
    scrub.style.setProperty('--scrub-pct', `${pct * 100}%`);
    const idx = Math.min(posts.length - 1, Math.floor(pct * posts.length));
    const post = posts[idx];
    snapshotEl.dataset.glitching = 'true';
    setTimeout(() => snapshotEl.removeAttribute('data-glitching'), 60);
    snapshotEl.innerHTML = `
      <div class="v-eyebrow">${post.date}</div>
      <div class="v-numeric" style="font-size:var(--fs-xl);font-weight:800;color:var(--ember)">${post.engagement.toLocaleString('en')}</div>
      <div class="v-body">${post.title}</div>
    `;
  }

  scrub.addEventListener('pointermove', (e) => {
    if (e.pressure === 0 && e.buttons === 0) return;
    const r = scrub.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    update(pct);
  });
  scrub.addEventListener('pointerdown', (e) => {
    const r = scrub.getBoundingClientRect();
    update(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
  });
}
```

---

## Acceptance Criteria

- [ ] 9 units, PROVE-IT citations
- [ ] Iraq Block
- [ ] VHS-scrub working with pointer drag
- [ ] glitch effect 60ms on snapshot change
- [ ] icons: Phosphor megaphone, sparkle, chat (لا emoji)
- [ ] commit: `ε4: Social revived — verified: vhs_scrub=on, glitch=on, units=9, tayyar=on`
- [ ] Beacon recorded

— نهاية ε4 —
