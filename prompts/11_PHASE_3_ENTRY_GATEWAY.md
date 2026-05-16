# 🚪 WORKER 11 — Phase 3/7 — Entry Gateway + Identity Lock
> **اقرأ أولاً:** `prompts/11_WORKER_PLATFORM_FOUNDATION.md` (الفهرس).
> **متطلب مسبق:** Phases 1, 2 منجزة (tokens + icons موجودة).
> **الفلسفة:** أول لقاء = أول انطباع. المستخدم لازم يحس "دخل منتج"، لا "فتح ملف HTML".

---

## 🎯 الهدف

بناء **شاشة دخول رسمية** بـ 3 أوضاع:
1. **First Run** — Onboarding 4 خطوات (Welcome → Identity → Goal → Privacy/PIN)
2. **Returning User** — Welcome Back مع إحصاء حقيقي
3. **Locked State** — PIN entry + idle auto-lock

---

## 📋 PRE-FLIGHT لهذا الـ Phase

```
📋 PHASE 3 PRE-FLIGHT
├─ Phase: 3/7 — Entry Gateway + Identity Lock
├─ Estimated lines: ~750 (HTML ~250 + CSS ~250 + JS ~250)
├─ Files to touch:
│   ├─ platform/index.html        (page-gateway section + topbar profile menu)
│   ├─ platform/assets/style.css  (gateway styles + onboarding wizard + pin pad)
│   └─ platform/assets/app.js     (Upg.gateway module + idle detector + crypto.subtle)
├─ localStorage keys added:
│   ├─ upg_user_profile  ({ name, role, avatar_color, goal, created_at })
│   ├─ upg_pin_hash      (SHA-256 hex string, optional)
│   ├─ upg_lock_on_idle  (boolean)
│   └─ upg_onboarding_done (boolean)
└─ Deliverable: commit "phase 3: Entry Gateway + Identity Lock" + push.
```

---

## 🧱 خطوات التنفيذ

### Step 1 — **HTML Skeleton** لـ `page-gateway`

موقع: في `platform/index.html` **قبل** `<main>` الرئيسي مباشرة (z-index أعلى من كل شيء):

```html
<!-- ═══════════════════════════════════════════════════════════════
     CATHEDRAL v14 — Entry Gateway (Worker 11 / Phase 3)
     ═══════════════════════════════════════════════════════════════ -->
<section id="page-gateway" class="gateway" hidden>
  <div class="gateway-aurora" aria-hidden="true">
    <!-- Aurora mesh layers (يستفيد من Worker 01 ::after) -->
  </div>

  <div class="gateway-card" role="dialog" aria-labelledby="gateway-title">

    <!-- ─── الشعار ─── -->
    <div class="gateway-brand">
      <span class="gateway-logo">U</span>
      <span class="gateway-wordmark">Upgrade</span>
    </div>

    <!-- ─── Mode A: Welcome Step 1 ─── -->
    <div class="gateway-stage" data-stage="welcome">
      <h1 id="gateway-title" class="gateway-headline">
        منصة التطوير المهني الذاتي
      </h1>
      <p class="gateway-tagline">
        مصمَّمة بعقلية عراقية، بمعيار عالمي.
        <br>9 مسارات تخصصية، تعلم تفاعلي، محتوى علمي عميق.
      </p>
      <button class="gateway-cta" data-action="next-stage">
        <span>هيّا نبدأ</span>
        <i class="qi" data-icon="chevron-left"></i>
      </button>
    </div>

    <!-- ─── Mode A: Identity Step 2 ─── -->
    <div class="gateway-stage" data-stage="identity" hidden>
      <h2 class="gateway-sub-headline">كيف نناديك؟</h2>
      <label class="gateway-field">
        <span>اسمك</span>
        <input type="text" class="gateway-input" id="gw-name" maxlength="40" placeholder="مثلاً: علي، نور، Sara…">
      </label>

      <label class="gateway-field">
        <span>دورك (اختياري)</span>
        <select class="gateway-input" id="gw-role">
          <option value="">— اختر —</option>
          <option value="sales">مبيعات</option>
          <option value="callcenter">كول سنتر</option>
          <option value="programming">مبرمج</option>
          <option value="accounting">محاسبة</option>
          <option value="hr">موارد بشرية</option>
          <option value="social">تسويق سوشيال</option>
          <option value="phonerepair">صيانة هواتف</option>
          <option value="customercare">خدمة عملاء</option>
          <option value="other">آخر</option>
        </select>
      </label>

      <fieldset class="gateway-avatar-picker">
        <legend>اختر لون رمزك</legend>
        <div class="gateway-avatar-grid">
          <!-- 10 ألوان من brand palette — JS يولّدها -->
        </div>
      </fieldset>

      <div class="gateway-actions">
        <button class="gateway-btn-ghost" data-action="prev-stage">رجوع</button>
        <button class="gateway-cta" data-action="next-stage">التالي</button>
      </div>
    </div>

    <!-- ─── Mode A: Goal Step 3 ─── -->
    <div class="gateway-stage" data-stage="goal" hidden>
      <h2 class="gateway-sub-headline">شنو هدفك الرئيسي؟</h2>
      <div class="gateway-goal-grid" role="radiogroup">
        <label class="gateway-goal">
          <input type="radio" name="gw-goal" value="skill">
          <span class="gateway-goal-card">
            <i class="qi qi-lg" data-icon="target"></i>
            <strong>تطوير مهارة محددة</strong>
            <em>أركّز على وحدة واحدة بعمق</em>
          </span>
        </label>
        <label class="gateway-goal">
          <input type="radio" name="gw-goal" value="interview">
          <span class="gateway-goal-card">
            <i class="qi qi-lg" data-icon="briefcase"></i>
            <strong>التحضير لمقابلة</strong>
            <em>HR + تفاوض الراتب</em>
          </span>
        </label>
        <label class="gateway-goal">
          <input type="radio" name="gw-goal" value="culture">
          <span class="gateway-goal-card">
            <i class="qi qi-lg" data-icon="book-open"></i>
            <strong>ثقافة عامة شاملة</strong>
            <em>أتجوّل بين كل المسارات</em>
          </span>
        </label>
        <label class="gateway-goal">
          <input type="radio" name="gw-goal" value="lead">
          <span class="gateway-goal-card">
            <i class="qi qi-lg" data-icon="user-tie"></i>
            <strong>قيادة فريقي</strong>
            <em>أساعد مرؤوسي/زملائي</em>
          </span>
        </label>
      </div>
      <div class="gateway-actions">
        <button class="gateway-btn-ghost" data-action="prev-stage">رجوع</button>
        <button class="gateway-cta" data-action="next-stage">التالي</button>
      </div>
    </div>

    <!-- ─── Mode A: Privacy/PIN Step 4 ─── -->
    <div class="gateway-stage" data-stage="privacy" hidden>
      <h2 class="gateway-sub-headline">خصوصيتك أولاً</h2>
      <div class="gateway-privacy">
        <i class="qi qi-xl" data-icon="shield"></i>
        <p>
          كل بياناتك تُحفظ <strong>محلياً على جهازك فقط</strong>.
          لا server، لا cloud، لا tracking.
          تستطيع تصدير/حذف بياناتك في أي وقت من Settings.
        </p>
      </div>
      <label class="gateway-checkbox">
        <input type="checkbox" id="gw-enable-pin">
        <span>تفعيل قفل PIN رقمي (4 أرقام) — اختياري</span>
      </label>
      <div class="gateway-pin-setup" hidden>
        <label class="gateway-field">
          <span>أدخل PIN جديد</span>
          <input type="password" inputmode="numeric" pattern="\d{4}" maxlength="4" class="gateway-input gateway-pin-input" id="gw-pin">
        </label>
        <label class="gateway-field">
          <span>تأكيد PIN</span>
          <input type="password" inputmode="numeric" pattern="\d{4}" maxlength="4" class="gateway-input gateway-pin-input" id="gw-pin-confirm">
        </label>
        <p class="gateway-hint" id="gw-pin-feedback"></p>
      </div>

      <div class="gateway-actions">
        <button class="gateway-btn-ghost" data-action="prev-stage">رجوع</button>
        <button class="gateway-cta" data-action="finish-onboarding">انطلق →</button>
      </div>
    </div>

    <!-- ─── Mode B: Welcome Back ─── -->
    <div class="gateway-stage" data-stage="returning" hidden>
      <h2 class="gateway-sub-headline">
        أهلاً، <span class="gateway-username" data-bind="profile.name">…</span>
      </h2>
      <div class="gateway-stats-row">
        <div class="gateway-stat"><strong data-bind="stats.units">0</strong><span>وحدة هذا الأسبوع</span></div>
        <div class="gateway-stat"><strong data-bind="stats.hours">0</strong><span>ساعة تدريب</span></div>
        <div class="gateway-stat"><strong data-bind="stats.streak">0</strong><span>يوم streak</span></div>
      </div>
      <button class="gateway-cta" data-action="enter-platform">
        متابعة <i class="qi" data-icon="chevron-left"></i>
      </button>
    </div>

    <!-- ─── Mode C: PIN Lock ─── -->
    <div class="gateway-stage" data-stage="locked" hidden>
      <h2 class="gateway-sub-headline">
        <i class="qi qi-lg" data-icon="lock"></i>
        أدخل PIN
      </h2>
      <div class="gateway-pin-display" aria-live="polite">
        <span class="gateway-pin-dot"></span>
        <span class="gateway-pin-dot"></span>
        <span class="gateway-pin-dot"></span>
        <span class="gateway-pin-dot"></span>
      </div>
      <div class="gateway-numpad" role="group" aria-label="لوحة الأرقام">
        <!-- 1-9, 0, ⌫ — JS يولّدها -->
      </div>
      <p class="gateway-hint" id="gw-pin-error"></p>
      <button class="gateway-btn-ghost" data-action="reset-data">
        نسيت PIN — حذف كل البيانات
      </button>
    </div>

  </div>

  <footer class="gateway-footer">
    <span>v14 Cathedral</span>
    <span>·</span>
    <span>Privacy by default</span>
  </footer>
</section>
```

### Step 2 — **CSS** للـ Gateway

```css
/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Gateway Styles (Worker 11 / Phase 3)
   ═══════════════════════════════════════════════════════════════ */
.gateway {
  position: fixed; inset: 0; z-index: 9999;
  display: grid; place-items: center;
  background: var(--color-bg);
  overflow: hidden;
  animation: gateway-fade-in 360ms ease-out;
}
@keyframes gateway-fade-in { from { opacity: 0; } to { opacity: 1; } }

.gateway-aurora {
  position: absolute; inset: -20%;
  background:
    radial-gradient(ellipse at 20% 30%, color-mix(in oklch, var(--color-brand) 20%, transparent), transparent 60%),
    radial-gradient(ellipse at 80% 70%, color-mix(in oklch, hsl(280 80% 60%) 18%, transparent), transparent 60%);
  filter: blur(40px);
  animation: gateway-aurora 24s ease-in-out infinite alternate;
}
@keyframes gateway-aurora { to { transform: translate3d(2%, -2%, 0) rotate(2deg); } }
@media (prefers-reduced-motion: reduce) { .gateway-aurora { animation: none; } }

.gateway-card {
  position: relative;
  width: min(560px, 92vw);
  padding: clamp(1.5rem, 4vw, 3rem);
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  backdrop-filter: blur(24px);
}

.gateway-brand {
  display: flex; align-items: center; gap: 0.75rem;
  margin-bottom: 2rem;
}
.gateway-logo {
  width: 44px; height: 44px;
  display: grid; place-items: center;
  background: var(--color-brand); color: var(--color-bg);
  border-radius: var(--radius-md);
  font-weight: 800; font-size: 1.5rem;
  box-shadow: 0 0 0 6px var(--color-brand-soft);
}
.gateway-wordmark { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.01em; }

.gateway-headline {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800; line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 1rem;
  background: linear-gradient(180deg, var(--color-text), var(--color-text-muted));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gateway-sub-headline {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700; margin: 0 0 1.5rem;
}
.gateway-tagline {
  font-size: 1.05rem; color: var(--color-text-muted);
  line-height: 1.7; margin: 0 0 2rem;
}

.gateway-stage { display: block; animation: gateway-stage-in 280ms ease-out; }
.gateway-stage[hidden] { display: none; }
@keyframes gateway-stage-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

.gateway-cta {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: var(--color-brand); color: var(--color-bg);
  border: 0; border-radius: var(--radius-full);
  font-weight: 700; font-size: 1.05rem;
  cursor: pointer;
  transition: transform 180ms, box-shadow 180ms, background 180ms;
}
.gateway-cta:hover { background: var(--color-brand-hover); transform: translateY(-1px); box-shadow: var(--shadow-md); }
.gateway-cta:focus-visible { outline: none; box-shadow: var(--ring); }

.gateway-btn-ghost {
  background: transparent; color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-full);
  cursor: pointer;
}
.gateway-btn-ghost:hover { background: var(--color-surface-2); color: var(--color-text); }

.gateway-actions { display: flex; justify-content: space-between; gap: 1rem; margin-top: 2rem; }

.gateway-field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.gateway-field span { font-size: 0.875rem; color: var(--color-text-muted); }
.gateway-input {
  width: 100%; padding: 0.75rem 1rem;
  background: var(--color-surface-0); color: var(--color-text);
  border: 1px solid var(--color-border); border-radius: var(--radius-md);
  font: inherit; transition: border 180ms, box-shadow 180ms;
}
.gateway-input:focus { outline: none; border-color: var(--color-brand); box-shadow: var(--ring); }

.gateway-avatar-picker { border: 0; padding: 0; margin: 1.5rem 0; }
.gateway-avatar-picker legend { font-size: 0.875rem; color: var(--color-text-muted); padding: 0; }
.gateway-avatar-grid { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem; }
.gateway-avatar-grid button {
  width: 36px; height: 36px; border-radius: 50%; border: 2px solid transparent; cursor: pointer;
  transition: transform 180ms, border-color 180ms;
}
.gateway-avatar-grid button[aria-pressed="true"] { border-color: var(--color-text); transform: scale(1.1); }

.gateway-goal-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin: 1rem 0; }
.gateway-goal input[type="radio"] { position: absolute; opacity: 0; pointer-events: none; }
.gateway-goal-card {
  display: flex; flex-direction: column; gap: 0.5rem;
  padding: 1rem; cursor: pointer;
  background: var(--color-surface-0);
  border: 1px solid var(--color-border); border-radius: var(--radius-md);
  transition: border 180ms, background 180ms;
}
.gateway-goal-card strong { font-weight: 700; font-size: 1rem; }
.gateway-goal-card em { font-style: normal; font-size: 0.875rem; color: var(--color-text-muted); }
.gateway-goal input:checked + .gateway-goal-card {
  border-color: var(--color-brand);
  background: var(--color-brand-soft);
}

.gateway-privacy {
  display: flex; gap: 1rem; align-items: flex-start;
  padding: 1.25rem; margin: 1rem 0;
  background: var(--color-surface-0); border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
.gateway-privacy .qi { color: var(--color-success); flex-shrink: 0; }
.gateway-privacy p { margin: 0; line-height: 1.7; color: var(--color-text-muted); font-size: 0.95rem; }

.gateway-pin-display {
  display: flex; gap: 0.75rem; justify-content: center; margin: 2rem 0 1.5rem;
}
.gateway-pin-dot {
  width: 16px; height: 16px; border-radius: 50%;
  border: 2px solid var(--color-border-strong);
  transition: background 180ms, border 180ms;
}
.gateway-pin-dot[data-filled="true"] {
  background: var(--color-brand);
  border-color: var(--color-brand);
}

.gateway-numpad {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;
  max-width: 280px; margin: 0 auto;
}
.gateway-numpad button {
  aspect-ratio: 1; font-size: 1.5rem; font-weight: 600;
  background: var(--color-surface-2); color: var(--color-text);
  border: 1px solid var(--color-border); border-radius: var(--radius-md);
  cursor: pointer;
}
.gateway-numpad button:hover { background: var(--color-surface-3); }

.gateway-stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1.5rem 0; }
.gateway-stat {
  text-align: center; padding: 1rem;
  background: var(--color-surface-0); border-radius: var(--radius-md);
}
.gateway-stat strong { display: block; font-size: 2rem; font-weight: 800; color: var(--color-brand); font-variant-numeric: tabular-nums; }
.gateway-stat span { font-size: 0.85rem; color: var(--color-text-muted); }

.gateway-footer {
  position: absolute; bottom: 1.5rem; left: 0; right: 0;
  display: flex; justify-content: center; gap: 0.75rem;
  font-size: 0.8rem; color: var(--color-text-faint);
}
```

### Step 3 — **JS Module** (`Upg.gateway`)

```js
/* ═══════════════════════════════════════════════════════════════
   CATHEDRAL v14 — Entry Gateway (Worker 11 / Phase 3)
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const STORE = {
    profile: () => JSON.parse(localStorage.getItem('upg_user_profile') || 'null'),
    setProfile: (p) => localStorage.setItem('upg_user_profile', JSON.stringify(p)),
    pinHash: () => localStorage.getItem('upg_pin_hash'),
    setPin: async (pin) => {
      const buf = new TextEncoder().encode(pin + '|salt-cathedral-v14');
      const hash = await crypto.subtle.digest('SHA-256', buf);
      const hex = [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2,'0')).join('');
      localStorage.setItem('upg_pin_hash', hex);
    },
    verifyPin: async (pin) => {
      const stored = localStorage.getItem('upg_pin_hash');
      if (!stored) return true;
      const buf = new TextEncoder().encode(pin + '|salt-cathedral-v14');
      const hash = await crypto.subtle.digest('SHA-256', buf);
      const hex = [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2,'0')).join('');
      return hex === stored;
    },
    onboardingDone: () => localStorage.getItem('upg_onboarding_done') === 'true',
  };

  const STAGES = ['welcome','identity','goal','privacy','returning','locked'];
  const ONBOARDING_FLOW = ['welcome','identity','goal','privacy'];
  let currentStage = 'welcome';
  let stageIndex = 0;
  let selectedAvatar = null;
  let pinBuffer = '';

  const gw = $('#page-gateway');
  if (!gw) return;

  const showStage = (name) => {
    $$('.gateway-stage', gw).forEach(s => s.hidden = (s.dataset.stage !== name));
    currentStage = name;
  };

  const open = (stage) => {
    gw.hidden = false;
    document.body.style.overflow = 'hidden';
    showStage(stage);
  };
  const close = () => {
    gw.hidden = true;
    document.body.style.overflow = '';
  };

  // ─── Avatar grid generation ───
  const colors = [
    'hsl(176 100% 70%)','hsl(280 80% 65%)','hsl(38 92% 60%)',
    'hsl(152 70% 55%)','hsl(0 80% 65%)','hsl(210 90% 65%)',
    'hsl(330 80% 65%)','hsl(60 80% 55%)','hsl(180 60% 55%)','hsl(15 80% 60%)'
  ];
  const avatarGrid = $('.gateway-avatar-grid', gw);
  if (avatarGrid) {
    colors.forEach((c, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.style.background = c;
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', `لون ${i+1}`);
      b.addEventListener('click', () => {
        avatarGrid.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed','false'));
        b.setAttribute('aria-pressed', 'true');
        selectedAvatar = c;
      });
      avatarGrid.appendChild(b);
    });
  }

  // ─── Numpad ───
  const numpad = $('.gateway-numpad', gw);
  if (numpad) {
    [1,2,3,4,5,6,7,8,9].forEach(n => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = n;
      b.addEventListener('click', () => onPinInput(String(n)));
      numpad.appendChild(b);
    });
    const back = document.createElement('button');
    back.type = 'button'; back.innerHTML = '<i class="qi" data-icon="x"></i>';
    back.addEventListener('click', () => onPinInput('back'));
    numpad.appendChild(back);
    const zero = document.createElement('button');
    zero.type = 'button'; zero.textContent = '0';
    zero.addEventListener('click', () => onPinInput('0'));
    numpad.appendChild(zero);
    const ok = document.createElement('button');
    ok.type = 'button'; ok.innerHTML = '<i class="qi" data-icon="check"></i>';
    ok.addEventListener('click', () => onPinInput('ok'));
    numpad.appendChild(ok);
  }

  const updatePinDots = () => {
    $$('.gateway-pin-dot', gw).forEach((d,i) => {
      d.dataset.filled = i < pinBuffer.length;
    });
  };

  let failedAttempts = 0;
  const onPinInput = async (key) => {
    if (key === 'back') pinBuffer = pinBuffer.slice(0, -1);
    else if (key === 'ok' || pinBuffer.length === 4) {
      if (pinBuffer.length !== 4) return;
      const ok = await STORE.verifyPin(pinBuffer);
      if (ok) { pinBuffer = ''; updatePinDots(); close(); }
      else {
        failedAttempts++;
        $('#gw-pin-error').textContent = `PIN خاطئ (محاولة ${failedAttempts}/5)`;
        pinBuffer = ''; updatePinDots();
        if (failedAttempts >= 5) {
          numpad.querySelectorAll('button').forEach(b => b.disabled = true);
          setTimeout(() => {
            numpad.querySelectorAll('button').forEach(b => b.disabled = false);
            failedAttempts = 0;
            $('#gw-pin-error').textContent = '';
          }, 60_000);
        }
      }
      return;
    } else if (/\d/.test(key) && pinBuffer.length < 4) {
      pinBuffer += key;
    }
    updatePinDots();
    if (pinBuffer.length === 4) onPinInput('ok');
  };

  // ─── Stage navigation ───
  gw.addEventListener('click', async (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (!action) return;

    if (action === 'next-stage') {
      const idx = ONBOARDING_FLOW.indexOf(currentStage);
      if (idx === -1 || idx >= ONBOARDING_FLOW.length - 1) return;
      // Validate per stage
      if (currentStage === 'identity') {
        const name = $('#gw-name').value.trim();
        if (!name) { $('#gw-name').focus(); return; }
      }
      if (currentStage === 'goal') {
        if (!$('input[name="gw-goal"]:checked')) return;
      }
      showStage(ONBOARDING_FLOW[idx + 1]);
    }
    else if (action === 'prev-stage') {
      const idx = ONBOARDING_FLOW.indexOf(currentStage);
      if (idx > 0) showStage(ONBOARDING_FLOW[idx - 1]);
    }
    else if (action === 'finish-onboarding') {
      // Optional PIN
      const pinEnabled = $('#gw-enable-pin').checked;
      if (pinEnabled) {
        const a = $('#gw-pin').value, b = $('#gw-pin-confirm').value;
        if (!/^\d{4}$/.test(a) || a !== b) {
          $('#gw-pin-feedback').textContent = 'PIN يجب أن يكون 4 أرقام مطابقة.';
          return;
        }
        await STORE.setPin(a);
      }
      const profile = {
        name: $('#gw-name').value.trim(),
        role: $('#gw-role').value || null,
        avatar_color: selectedAvatar || colors[0],
        goal: $('input[name="gw-goal"]:checked')?.value || null,
        created_at: Date.now(),
      };
      STORE.setProfile(profile);
      localStorage.setItem('upg_onboarding_done', 'true');
      close();
      window.dispatchEvent(new CustomEvent('upg:profile-ready', { detail: profile }));
    }
    else if (action === 'enter-platform') {
      close();
    }
    else if (action === 'reset-data') {
      if (!confirm('هل أنت متأكد؟ سيتم حذف كل بياناتك المحلية. لا يمكن التراجع.')) return;
      if (!confirm('تأكيد ثاني: حذف نهائي لكل التقدم والإعدادات؟')) return;
      localStorage.clear();
      location.reload();
    }
  });

  // ─── PIN setup checkbox toggle ───
  $('#gw-enable-pin')?.addEventListener('change', (e) => {
    $('.gateway-pin-setup', gw).hidden = !e.target.checked;
  });

  // ─── Idle auto-lock ───
  let idleTimer;
  const resetIdle = () => {
    clearTimeout(idleTimer);
    if (localStorage.getItem('upg_lock_on_idle') !== 'true') return;
    if (!STORE.pinHash()) return;
    idleTimer = setTimeout(() => lock(), 30 * 60 * 1000);
  };
  ['mousemove','keydown','click','scroll','touchstart'].forEach(ev =>
    document.addEventListener(ev, resetIdle, { passive: true })
  );

  const lock = () => {
    pinBuffer = ''; updatePinDots();
    open('locked');
  };

  // ─── Boot logic ───
  const boot = () => {
    if (!STORE.onboardingDone()) {
      open('welcome');
      return;
    }
    // Returning user — populate stats
    const profile = STORE.profile();
    if (profile) {
      const nameEl = $('[data-bind="profile.name"]', gw);
      if (nameEl) nameEl.textContent = profile.name;
    }
    const stats = window.Upg?.state?.compute || null;
    if (stats) {
      $('[data-bind="stats.units"]', gw).textContent = stats.unitsCompleted();
      $('[data-bind="stats.hours"]', gw).textContent = Math.round(stats.trainingHours());
      $('[data-bind="stats.streak"]', gw).textContent = stats.streak();
    }
    // PIN required?
    if (STORE.pinHash() && sessionStorage.getItem('upg_unlocked') !== 'true') {
      open('locked');
    } else {
      open('returning');
      sessionStorage.setItem('upg_unlocked', 'true');
    }
  };

  // Run on DOM ready (early — blocking-ish to prevent dashboard flash)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Public API
  window.Upg = window.Upg || {};
  window.Upg.gateway = { open, close, lock };
})();
```

### Step 4 — **Sign Out / Lock** في topbar

أضف في topbar profile menu زرّ:
```html
<button class="topbar-action" data-action="lock-platform" aria-label="قفل المنصة">
  <i class="qi" data-icon="lock"></i>
</button>
```

JS handler:
```js
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-action="lock-platform"]')) {
    sessionStorage.removeItem('upg_unlocked');
    Upg.gateway.lock();
  }
});
```

---

## ✅ Acceptance Criteria للـ Phase 3

- [ ] أول فتح بعد `localStorage.clear()` → Gateway مع stage `welcome` يظهر.
- [ ] Onboarding 4 خطوات يكمل بنجاح ويحفظ profile.
- [ ] PIN اختياري — لو فُعّل، يُحفظ كـ SHA-256 hash (ليس plain text).
- [ ] Returning user (بعد إعادة تحميل) يرى Welcome Back مع إحصاء.
- [ ] PIN entry يعمل بـ 5 محاولات + cooldown 60s.
- [ ] Idle 30 دقيقة → lock تلقائي (لو enabled).
- [ ] زر `data-action="lock-platform"` يقفل فوراً.
- [ ] لا errors في console.
- [ ] على mobile: numpad بحجم مريح، الـ inputs لا تكسر layout.

---

## 🛡️ في نهاية الـ Phase

```
1. commit  : "phase 3: Entry Gateway + Identity Lock + Onboarding 4-step"
2. push    : worker-11-complete
3. state   : current.phase=3, completed_phases[+], snapshot file
4. push    : ثاني
```

**التالي:** `prompts/11_PHASE_4_CALCULATOR_FRAMEWORK.md`.

— نهاية Phase 3.
