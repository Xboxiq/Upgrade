# γ9 — العالم 8: صَالون (Saloon) — Salon
> **Pillar γ / Stage 9 of 9 — last in γ**
> الإلهام: صالونات بيروت 1960 + الخشب الجوزي + النحاس الباهت + الجلد القديم
> الصفحات: hrmastery, accountmgr

---

## 🎨 Creativity Beacon

**Type:** 🪞 META_BEACON
**The Surprise:** الواجهة في saloon **تَعرف نفسها**. أعلى كل صفحة، شريط رفيع نحاسي (1px gradient) يُدوَّن عليه — بخط مائل دقيق — اسم آخر beacon أُنتِج في المنصة. مثال: `«آخر إبداع: γ8 وَرشة — حلقة الـ 650ms»`. هذا meta-statement يعرّض الـ AI نفسه على شاشة المستخدم، يجعل المنصة شاهدة على رحلتها.
**Reference Avoided:** #21 "Powered by AI" badge, #22 "Welcome back" greetings
**Inspired-by:** #11 Mid-century Beirut salons (المرايا تُذكّر الزائر بنفسه)
**Originality Self-Score:** 5/5

---

## التنفيذ

### ١. املأ `worlds/_saloon.css`

```css
/* ÊLAN v4 — γ9 — World: صَالون (Saloon)
   Mid-century Beirut salon + walnut + brushed brass + old leather.
   Pages: hrmastery, accountmgr */

[data-world="saloon"] {
  --anchor-bg: hsl(8 28% 14%);
  --anchor-1:  hsl(8 26% 18%);
  --anchor-2:  hsl(8 24% 23%);
  --anchor-3:  hsl(8 22% 28%);

  --ink:       hsl(38 28% 94%);
  --ink-muted: hsl(38 18% 72%);
  --ink-faint: hsl(38 12% 50%);

  --line:        hsl(8 22% 28%);
  --line-strong: hsl(8 24% 38%);

  --ember: hsl(35 75% 58%);     /* نحاس مصقول */
  --focus: hsl(150 35% 50%);    /* أخضر رخامي */
  --accent: var(--ember);

  --ease-saloon:     cubic-bezier(0.4, 0.05, 0.2, 0.95);
  --duration-saloon: 380ms;

  --shadow-sm: 0 1px 2px hsl(8 30% 0% / 0.4);
  --shadow-md: 0 4px 14px hsl(8 30% 0% / 0.5);
  --shadow-lg: 0 14px 36px hsl(8 30% 0% / 0.6);
  --shadow-xl: 0 28px 64px hsl(8 30% 0% / 0.7);

  --ring: 0 0 0 3px color-mix(in oklch, var(--ember) 38%, transparent);

  --color-bg: var(--anchor-bg);
  --color-surface-0: var(--anchor-bg);
  --color-surface-1: var(--anchor-1);
  --color-surface-2: var(--anchor-2);
  --color-surface-3: var(--anchor-3);
  --color-text: var(--ink);
  --color-text-muted: var(--ink-muted);
  --color-text-faint: var(--ink-faint);
  --color-border: var(--line);
  --color-border-strong: var(--line-strong);
  --color-brand: var(--ember);
}

/* Cards — wood-paneled with brass dividers */
[data-world="saloon"] .card,
[data-world="saloon"] .panel {
  background: linear-gradient(180deg, var(--anchor-1), var(--anchor-2));
  border: 1px solid var(--line);
  /* Chamfered corners (cut, not radius) */
  clip-path: polygon(
    8px 0, calc(100% - 8px) 0,
    100% 8px, 100% calc(100% - 8px),
    calc(100% - 8px) 100%, 8px 100%,
    0 calc(100% - 8px), 0 8px
  );
}

/* Brass divider — between sections */
[data-world="saloon"] .saloon-divider {
  block-size: 1px;
  background: linear-gradient(90deg,
    transparent,
    color-mix(in oklch, var(--ember) 40%, transparent),
    var(--ember),
    color-mix(in oklch, var(--ember) 40%, transparent),
    transparent);
  margin-block: var(--s-6);
  border: none;
}

/* Beacon: meta-banner top of page */
[data-world="saloon"] .saloon-meta-banner {
  position: sticky;
  inset-block-start: 0;
  inset-inline: 0;
  block-size: 24px;
  display: flex;
  align-items: center;
  padding-inline: var(--s-4);
  background: linear-gradient(90deg,
    transparent,
    color-mix(in oklch, var(--ember) 12%, transparent),
    color-mix(in oklch, var(--ember) 18%, transparent),
    color-mix(in oklch, var(--ember) 12%, transparent),
    transparent);
  border-block-end: 1px solid color-mix(in oklch, var(--ember) 30%, transparent);
  font-family: var(--voice-quote);
  font-style: italic;
  font-size: var(--fs-xs);
  color: color-mix(in oklch, var(--ink) 70%, var(--ember));
  letter-spacing: var(--track-loose);
  z-index: 10;
}

/* Body */
[data-world="saloon"] body,
[data-world="saloon"] .page-content {
  font-family: var(--voice-body);
  line-height: var(--lead-relaxed);
}

/* Hero */
[data-world="saloon"] h1.is-hero {
  font-family: var(--voice-display-l);
  font-weight: 600;
  font-style: italic;
  letter-spacing: var(--track-loose);
  color: var(--ink);
  font-size: var(--fs-3xl);
}

/* Buttons — copper bezel */
[data-world="saloon"] .btn {
  background: var(--anchor-2);
  color: var(--ink);
  border: 1px solid var(--ember);
  padding: var(--s-3) var(--s-5);
  font-family: var(--voice-display);
  font-weight: 600;
  letter-spacing: var(--track-snug);
  position: relative;
  cursor: pointer;
  clip-path: polygon(
    6px 0, calc(100% - 6px) 0,
    100% 50%, calc(100% - 6px) 100%,
    6px 100%, 0 50%
  );
  transition: background var(--duration-saloon) var(--ease-saloon),
              color var(--duration-saloon) var(--ease-saloon);
}

[data-world="saloon"] .btn:hover {
  background: var(--ember);
  color: hsl(8 28% 14%);
}
```

### ٢. JS للـ Beacon — `world-saloon.js`

```javascript
/* ÊLAN v4 — γ9 — Saloon world: meta-banner showing last creativity beacon */

const STORAGE_KEY = 'upg_last_beacon';

/**
 * Read last beacon entry from CREATIVITY_LOG (or localStorage cache).
 * In production we'd fetch the log; here we use localStorage updated by
 * the AUTO_PILOT after each beacon append.
 */
function getLastBeacon() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function ensureBanner() {
  const page = document.querySelector('.page.is-active[data-world="saloon"]');
  if (!page) return;

  let banner = page.querySelector('.saloon-meta-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.className = 'saloon-meta-banner';
    page.prepend(banner);
  }

  const last = getLastBeacon();
  if (!last) {
    banner.textContent = '— هذا أول لقاء في الصالون —';
  } else {
    banner.textContent = `«آخر إبداع: ${last.id} ${last.world ?? ''} — ${last.surprise}»`;
  }
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'saloon') ensureBanner();
});

document.addEventListener('upg:beacon:logged', () => ensureBanner());

if (document.body.dataset.world === 'saloon') ensureBanner();

window.Upg = window.Upg || {};
window.Upg.worlds = window.Upg.worlds || {};
window.Upg.worlds.saloon = Object.freeze({
  setLastBeacon: (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    document.dispatchEvent(new CustomEvent('upg:beacon:logged', { detail: data }));
  },
  getLastBeacon
});
```

### ٣. تطبيق على hrmastery page:
```html
<section class="page" id="page-hrmastery" data-world="saloon">
  <!-- meta-banner injects automatically -->
  <h1 class="is-hero">إتقان الموارد</h1>
  <hr class="saloon-divider">
  ...
</section>
```

---

## Acceptance Criteria

- [ ] `worlds/_saloon.css` ممتلئ
- [ ] cards فيها chamfered corners (8 sides via clip-path)
- [ ] `.saloon-divider` تَعرض brass gradient horizontal
- [ ] Meta-banner يظهر أعلى الصفحة عند فتح hrmastery
- [ ] لو لا beacon في localStorage → banner يقول "أول لقاء"
- [ ] `Upg.worlds.saloon.setLastBeacon(...)` تُحدِّث الـ banner
- [ ] Buttons فيها copper bezel chamfered shape
- [ ] commit: `γ9: World Saloon — verified: chamfered_clip=8sides, meta_banner=on, brass_divider=on`
- [ ] Beacon recorded
- [ ] **Pillar γ complete** → افتح PR من `elan-γ-eight-worlds` إلى main

---

## بعد γ9

أنشئ PR بعنوان: `feat(elan-v4): Pillar γ — EIGHT WORLDS (9/9 stages)` مع جدول كل beacon موثَّق.

ثم session جديد → branch `elan-δ-kinetic-shell` → ابدأ δ1.

— نهاية γ9 — نهاية Pillar γ —
