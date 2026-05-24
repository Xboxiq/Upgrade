/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-gateway-1.js
   Extracted from app.js lines 11822-12131
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));

  const SALT = '|salt-cathedral-v14';

  const sha256Hex = async (text) => {
    if (!crypto || !crypto.subtle) return null;
    const buf = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const STORE = {
    profile: () => { try { return JSON.parse(localStorage.getItem('upg_user_profile') || 'null'); } catch (e) { return null; } },
    setProfile: (p) => { try { localStorage.setItem('upg_user_profile', JSON.stringify(p)); } catch (e) {} },
    pinHash: () => { try { return localStorage.getItem('upg_pin_hash'); } catch (e) { return null; } },
    setPin: async (pin) => {
      const h = await sha256Hex(pin + SALT);
      if (h) { try { localStorage.setItem('upg_pin_hash', h); } catch (e) {} }
    },
    clearPin: () => { try { localStorage.removeItem('upg_pin_hash'); } catch (e) {} },
    verifyPin: async (pin) => {
      const stored = STORE.pinHash();
      if (!stored) return true;
      const h = await sha256Hex(pin + SALT);
      return h === stored;
    },
    onboardingDone: () => { try { return localStorage.getItem('upg_onboarding_done') === 'true'; } catch (e) { return false; } },
    setOnboardingDone: () => { try { localStorage.setItem('upg_onboarding_done', 'true'); } catch (e) {} },
    lockOnIdle: () => { try { return localStorage.getItem('upg_lock_on_idle') === 'true'; } catch (e) { return false; } },
  };

  const ONBOARDING_FLOW = ['welcome', 'identity', 'goal', 'privacy'];
  let currentStage = 'welcome';
  let selectedAvatar = null;
  let pinBuffer = '';
  let failedAttempts = 0;
  let idleTimer = null;

  const gw = $('#page-gateway');
  if (!gw) return;

  const showStage = (name) => {
    $$('.gateway-stage', gw).forEach(s => { s.hidden = (s.dataset.stage !== name); });
    currentStage = name;
    // Auto-focus first interactive element
    const focusable = gw.querySelector(`.gateway-stage[data-stage="${name}"] input, .gateway-stage[data-stage="${name}"] button`);
    if (focusable) try { focusable.focus({ preventScroll: true }); } catch (e) {}
  };

  const open = (stage) => {
    gw.hidden = false;
    gw.setAttribute('aria-hidden', 'false');
    document.body.dataset.gatewayOpen = 'true';
    showStage(stage || 'welcome');
  };
  const close = () => {
    gw.hidden = true;
    gw.setAttribute('aria-hidden', 'true');
    delete document.body.dataset.gatewayOpen;
  };

  // ─── Avatar grid ───
  const avatarColors = [
    'hsl(176 100% 70%)', 'hsl(280 80% 65%)', 'hsl(38 92% 60%)',
    'hsl(152 70% 55%)',  'hsl(0 80% 65%)',   'hsl(210 90% 65%)',
    'hsl(330 80% 65%)',  'hsl(60 80% 55%)',  'hsl(180 60% 55%)',
    'hsl(15 80% 60%)'
  ];
  const avatarGrid = $('.gateway-avatar-grid', gw);
  if (avatarGrid && !avatarGrid.children.length) {
    avatarColors.forEach((c, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.style.background = c;
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', `لون ${i + 1}`);
      b.addEventListener('click', () => {
        avatarGrid.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', 'true');
        selectedAvatar = c;
      });
      avatarGrid.appendChild(b);
    });
    selectedAvatar = avatarColors[0];
    avatarGrid.firstChild.setAttribute('aria-pressed', 'true');
  }

  // ─── Numpad ───
  const numpad = $('.gateway-numpad', gw);
  const updatePinDots = () => {
    $$('.gateway-pin-dot', gw).forEach((d, i) => {
      d.dataset.filled = (i < pinBuffer.length).toString();
    });
  };

  const onPinAction = async (key) => {
    const errEl = $('#gw-pin-error');
    if (key === 'back') {
      pinBuffer = pinBuffer.slice(0, -1);
      if (errEl) errEl.textContent = '';
    } else if (key === 'ok') {
      if (pinBuffer.length !== 4) return;
      const ok = await STORE.verifyPin(pinBuffer);
      if (ok) {
        pinBuffer = ''; updatePinDots();
        try { sessionStorage.setItem('upg_unlocked', 'true'); } catch (e) {}
        close();
        window.dispatchEvent(new CustomEvent('upg:unlocked'));
      } else {
        failedAttempts++;
        if (errEl) errEl.textContent = `PIN خاطئ (محاولة ${failedAttempts}/5)`;
        pinBuffer = ''; updatePinDots();
        if (failedAttempts >= 5 && numpad) {
          numpad.querySelectorAll('button').forEach(b => b.disabled = true);
          if (errEl) errEl.textContent = 'تم تأمين القفل لمدة 60 ثانية بسبب 5 محاولات فاشلة.';
          setTimeout(() => {
            if (numpad) numpad.querySelectorAll('button').forEach(b => b.disabled = false);
            failedAttempts = 0;
            if (errEl) errEl.textContent = '';
          }, 60000);
        }
      }
      return;
    } else if (/^\d$/.test(key) && pinBuffer.length < 4) {
      pinBuffer += key;
    }
    updatePinDots();
    if (pinBuffer.length === 4) onPinAction('ok');
  };

  if (numpad && !numpad.children.length) {
    [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(n => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = String(n);
      b.addEventListener('click', () => onPinAction(String(n)));
      numpad.appendChild(b);
    });
    const back = document.createElement('button');
    back.type = 'button';
    back.setAttribute('aria-label', 'مسح');
    back.innerHTML = '<i class="qi" data-icon="x"></i>';
    back.addEventListener('click', () => onPinAction('back'));
    numpad.appendChild(back);
    const zero = document.createElement('button');
    zero.type = 'button';
    zero.textContent = '0';
    zero.addEventListener('click', () => onPinAction('0'));
    numpad.appendChild(zero);
    const ok = document.createElement('button');
    ok.type = 'button';
    ok.setAttribute('aria-label', 'تأكيد');
    ok.innerHTML = '<i class="qi" data-icon="check"></i>';
    ok.addEventListener('click', () => onPinAction('ok'));
    numpad.appendChild(ok);
  }

  // ─── Keyboard support for PIN ───
  document.addEventListener('keydown', (e) => {
    if (gw.hidden) return;
    if (currentStage !== 'locked') return;
    if (/^\d$/.test(e.key))   { e.preventDefault(); onPinAction(e.key); }
    else if (e.key === 'Backspace') { e.preventDefault(); onPinAction('back'); }
    else if (e.key === 'Enter')     { e.preventDefault(); onPinAction('ok'); }
  });

  // ─── Stage navigation ───
  gw.addEventListener('click', async (e) => {
    const trg = e.target.closest('[data-action]');
    if (!trg) return;
    const action = trg.dataset.action;

    if (action === 'next-stage') {
      const idx = ONBOARDING_FLOW.indexOf(currentStage);
      if (idx === -1 || idx >= ONBOARDING_FLOW.length - 1) return;
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
      const fb = $('#gw-pin-feedback');
      const pinEnabled = $('#gw-enable-pin').checked;
      if (pinEnabled) {
        const a = $('#gw-pin').value, b = $('#gw-pin-confirm').value;
        if (!/^\d{4}$/.test(a) || a !== b) {
          if (fb) fb.textContent = 'PIN يجب أن يكون 4 أرقام مطابقة.';
          return;
        }
        await STORE.setPin(a);
      } else {
        STORE.clearPin();
      }
      const profile = {
        name: $('#gw-name').value.trim(),
        role: $('#gw-role').value || null,
        avatar_color: selectedAvatar || avatarColors[0],
        goal: ($('input[name="gw-goal"]:checked') || {}).value || null,
        created_at: Date.now(),
      };
      STORE.setProfile(profile);
      STORE.setOnboardingDone();
      try { sessionStorage.setItem('upg_unlocked', 'true'); } catch (e) {}
      close();
      window.dispatchEvent(new CustomEvent('upg:profile-ready', { detail: profile }));
    }
    else if (action === 'enter-platform') {
      close();
    }
    else if (action === 'reset-data') {
      if (!confirm('هل أنت متأكد؟ سيتم حذف كل بياناتك المحلية. لا يمكن التراجع.')) return;
      if (!confirm('تأكيد ثاني: حذف نهائي لكل التقدم والإعدادات؟')) return;
      try { localStorage.clear(); sessionStorage.clear(); } catch (e) {}
      location.reload();
    }
    else if (action === 'lock-platform') {
      // Topbar button — handled below at document-level too, but allow inside gateway too
      lock();
    }
  });

  // ─── Topbar lock button (delegated, works outside the gateway) ───
  document.addEventListener('click', (e) => {
    const lockBtn = e.target.closest('[data-action="lock-platform"]');
    if (!lockBtn) return;
    if (gw.contains(lockBtn)) return; // already handled above
    lock();
  });

  // ─── PIN setup checkbox toggle ───
  const enablePin = $('#gw-enable-pin');
  if (enablePin) {
    enablePin.addEventListener('change', (e) => {
      const setupBox = $('.gateway-pin-setup', gw);
      if (setupBox) setupBox.hidden = !e.target.checked;
    });
  }

  // ─── Idle auto-lock ───
  const resetIdle = () => {
    if (idleTimer) clearTimeout(idleTimer);
    if (!STORE.lockOnIdle()) return;
    if (!STORE.pinHash()) return;
    idleTimer = setTimeout(() => lock(), 30 * 60 * 1000);
  };
  ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(ev =>
    document.addEventListener(ev, resetIdle, { passive: true })
  );

  const lock = () => {
    pinBuffer = ''; updatePinDots();
    try { sessionStorage.removeItem('upg_unlocked'); } catch (e) {}
    open('locked');
  };

  // ─── Boot logic ───
  const boot = () => {
    if (!STORE.onboardingDone()) {
      open('welcome');
      return;
    }
    const profile = STORE.profile();
    if (profile) {
      const nameEl = $('[data-bind="profile.name"]', gw);
      if (nameEl) nameEl.textContent = profile.name;
    }
    const stats = (window.Upg && window.Upg.state && window.Upg.state.compute) || null;
    if (stats) {
      const u = $('[data-bind="stats.units"]', gw);
      const h = $('[data-bind="stats.hours"]', gw);
      const s = $('[data-bind="stats.streak"]', gw);
      try {
        if (u) u.textContent = stats.unitsCompleted();
        if (h) h.textContent = Math.round(stats.trainingHours());
        if (s) s.textContent = stats.streak();
      } catch (e) {}
    }
    let unlocked = false;
    try { unlocked = sessionStorage.getItem('upg_unlocked') === 'true'; } catch (e) {}
    if (STORE.pinHash() && !unlocked) {
      open('locked');
    } else {
      // Returning user, but only show if there isn't a pending intro path
      const showWelcomeBack = !sessionStorage.getItem('upg_skip_welcome');
      if (showWelcomeBack) open('returning');
      try { sessionStorage.setItem('upg_unlocked', 'true'); } catch (e) {}
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.Upg = window.Upg || {};
  window.Upg.gateway = { open, close, lock };
})();
