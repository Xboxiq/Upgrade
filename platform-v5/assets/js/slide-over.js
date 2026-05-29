/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — ε1 — Slide-Over runtime  (Upg.overlay)
   ────────────────────────────────────────────────────────────────────────
   The third surface type (SPATIAL §3.2). A detail panel that slides from the
   inline-end edge over a dimmed canvas — never a modal popup (Forbidden #5).

   Realizes SPATIAL §4's `Upg.nav.overlay(...)` as a dedicated v5 namespace:
   v5 has no Upg.nav module (the dock owns routing), so the overlay surface
   lives at Upg.overlay. Additive — no sacred API touched.

   Responsibilities:
     • open / close / toggle a slide-over, populated from a <template>
     • history coupling — pushState on open, Back button closes (SPATIAL §4)
     • focus trap + focus return + background inert (a11y)
     • scrim click / Escape / close button all dismiss
     • [data-overlay-open] / [data-overlay-close] / [data-cmd] delegation
     • ⌘/Ctrl+K and the dock "centre" item open the command palette
     • the GLASS scroll-lid: toggle [data-scrolled] as the body scrolls

   Classic IIFE — mobile-safe, no ESM. Idempotent registration.
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  window.Upg = window.Upg || {};

  const FOCUSABLE =
    'a[href],button:not([disabled]),input:not([disabled]),' +
    'select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  let scrim   = null;   // #overlay-scrim
  let panel   = null;   // #overlay-panel
  let bodyEl  = null;   // [data-overlay-body]
  let titleEl = null;   // [data-overlay-title]
  let eyebrowEl = null; // [data-overlay-eyebrow]

  let isOpen   = false;
  let pushed   = false;          // did we push a history entry for this overlay?
  let currentId = null;
  let sourceEl = null;           // element to restore focus to on close
  const inertTargets = [];       // background regions made inert while open


  // ── Background inert (with aria-hidden fallback) ─────────────────────
  function setBackgroundInert(on) {
    inertTargets.length = 0;
    ['main', 'dock-mount'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) inertTargets.push(el);
    });
    inertTargets.forEach(function (el) {
      if (on) {
        if ('inert' in HTMLElement.prototype) el.inert = true;
        el.setAttribute('aria-hidden', 'true');
      } else {
        if ('inert' in HTMLElement.prototype) el.inert = false;
        el.removeAttribute('aria-hidden');
      }
    });
  }


  // ── Focus trap ────────────────────────────────────────────────────────
  function focusables() {
    if (!panel) return [];
    return Array.prototype.slice
      .call(panel.querySelectorAll(FOCUSABLE))
      .filter(function (el) {
        return el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement;
      });
  }

  function onTrapKey(ev) {
    if (ev.key !== 'Tab' || !isOpen) return;
    const items = focusables();
    if (!items.length) { ev.preventDefault(); return; }
    const first = items[0];
    const last  = items[items.length - 1];
    const active = document.activeElement;
    if (ev.shiftKey && (active === first || !panel.contains(active))) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && active === last) {
      ev.preventDefault();
      first.focus();
    }
  }


  // ── Scroll lid — the GLASS_PULSE part two ────────────────────────────
  function onBodyScroll() {
    if (!panel || !bodyEl) return;
    panel.setAttribute('data-scrolled', bodyEl.scrollTop > 2 ? 'true' : 'false');
  }


  // ── Content population (no innerHTML — clone template fragments) ─────
  function clearBody() {
    if (!bodyEl) return;
    while (bodyEl.firstChild) bodyEl.removeChild(bodyEl.firstChild);
  }

  function setHeader(title, eyebrow) {
    if (titleEl) titleEl.textContent = title || '';
    if (eyebrowEl) {
      if (eyebrow) {
        eyebrowEl.textContent = eyebrow;
        eyebrowEl.hidden = false;
      } else {
        eyebrowEl.textContent = '';
        eyebrowEl.hidden = true;
      }
    }
  }


  // ── Present (build + show). Pushes history only on a fresh open. ─────
  function present(opts) {
    if (!panel || !scrim) return false;
    opts = opts || {};

    setHeader(opts.title, opts.eyebrow);
    clearBody();
    if (opts.content) bodyEl.appendChild(opts.content);
    // fill any [data-icon] hosts in the freshly-cloned content (templates are
    // inert at boot, so their icons aren't auto-populated until now)
    if (window.Upg.icons && window.Upg.icons.autoPopulate) {
      try { window.Upg.icons.autoPopulate(bodyEl); } catch (_) { /* ignore */ }
    }
    if (bodyEl) bodyEl.scrollTop = 0;
    panel.setAttribute('data-scrolled', 'false');

    currentId = opts.id || 'overlay';

    if (!isOpen) {
      sourceEl = opts.source || document.activeElement || null;
      setBackgroundInert(true);

      scrim.hidden = false; scrim.removeAttribute('aria-hidden');
      panel.hidden = false; panel.removeAttribute('aria-hidden');
      // force reflow so the transform transition runs from the rest position
      void panel.offsetWidth;
      scrim.setAttribute('data-open', 'true');
      panel.setAttribute('data-open', 'true');
      isOpen = true;

      // history coupling
      if (!opts.fromHistory) {
        try { history.pushState({ upgOverlay: currentId }, ''); pushed = true; }
        catch (_) { pushed = false; }
      }

      document.addEventListener('keydown', onTrapKey, true);

      // move focus into the panel
      const closeBtn = panel.querySelector('[data-overlay-close]');
      const first = focusables()[0];
      (closeBtn || first || panel).focus({ preventScroll: true });
    }

    document.dispatchEvent(new CustomEvent('upg:overlay:open', {
      bubbles: true, detail: { id: currentId }
    }));
    return true;
  }


  // ── Teardown (actual hide) ───────────────────────────────────────────
  function teardown() {
    if (!isOpen || !panel || !scrim) return;
    scrim.setAttribute('data-open', 'false');
    panel.setAttribute('data-open', 'false');
    isOpen = false;
    pushed = false;

    document.removeEventListener('keydown', onTrapKey, true);
    setBackgroundInert(false);

    // hide after the panel transition completes (kept token-aligned)
    const finalize = function () {
      if (isOpen) return;          // re-opened meanwhile — abort hide
      scrim.hidden = true; scrim.setAttribute('aria-hidden', 'true');
      panel.hidden = true; panel.setAttribute('aria-hidden', 'true');
    };
    let done = false;
    const once = function () { if (done) return; done = true; panel.removeEventListener('transitionend', once); finalize(); };
    panel.addEventListener('transitionend', once);
    window.setTimeout(once, 600);  // safety net ≥ --duration-panel

    // restore focus to the trigger
    const target = sourceEl;
    sourceEl = null;
    const prevId = currentId;
    currentId = null;
    if (target && typeof target.focus === 'function') {
      try { target.focus({ preventScroll: true }); } catch (_) { target.focus(); }
    }
    document.dispatchEvent(new CustomEvent('upg:overlay:close', {
      bubbles: true, detail: { id: prevId }
    }));
  }


  // ── Public close — routes through history when we pushed an entry ────
  function close() {
    if (!isOpen) return false;
    if (pushed) { try { history.back(); return true; } catch (_) { /* fall through */ } }
    teardown();
    return true;
  }


  // ── Template-driven open ──────────────────────────────────────────────
  function openTemplate(templateId, source) {
    const tpl = document.getElementById(templateId);
    if (!tpl || tpl.tagName !== 'TEMPLATE') {
      console.warn('[Upg.overlay] template not found:', templateId);
      return false;
    }
    const frag = tpl.content.cloneNode(true);
    return present({
      id: templateId,
      title:   tpl.getAttribute('data-title') || '',
      eyebrow: tpl.getAttribute('data-eyebrow') || '',
      content: frag,
      source:  source || null
    });
  }

  function open(opts) { return present(opts || {}); }

  function toggle(templateId, source) {
    if (isOpen && currentId === templateId) { close(); return false; }
    return openTemplate(templateId, source);
  }


  // ── Command-palette command runner ───────────────────────────────────
  function runCommand(cmd, source) {
    switch (cmd) {
      case 'theme':
        if (window.Upg.theme && window.Upg.theme.cycle) window.Upg.theme.cycle();
        return; // keep palette open so the user sees the theme change
      case 'home':
      case 'lab':
      case 'progress':
        close();
        window.location.hash = '#' + cmd;
        return;
      case 'close':
        close();
        return;
      default:
        return;
    }
  }


  // ── Delegated event wiring ────────────────────────────────────────────
  function onClick(ev) {
    const t = ev.target;

    const cmd = t.closest ? t.closest('[data-cmd]') : null;
    if (cmd) { ev.preventDefault(); runCommand(cmd.getAttribute('data-cmd'), cmd); return; }

    const opener = t.closest ? t.closest('[data-overlay-open]') : null;
    if (opener) { ev.preventDefault(); openTemplate(opener.getAttribute('data-overlay-open'), opener); return; }

    const closer = t.closest ? t.closest('[data-overlay-close]') : null;
    if (closer) { ev.preventDefault(); close(); return; }

    // the dock "centre" item summons the command palette
    const centre = t.closest ? t.closest('a[data-route="centre"]') : null;
    if (centre) { ev.preventDefault(); toggle('overlay-tpl-command', centre); return; }

    // clicking the scrim closes
    if (scrim && (t === scrim)) { close(); return; }
  }

  function onKeyDown(ev) {
    // ⌘/Ctrl + K → command palette
    if ((ev.metaKey || ev.ctrlKey) && (ev.key === 'k' || ev.key === 'K')) {
      ev.preventDefault();
      toggle('overlay-tpl-command', document.activeElement);
      return;
    }
    if (ev.key === 'Escape' && isOpen) {
      ev.preventDefault();
      ev.stopPropagation();        // don't also collapse a background bento card
      close();
    }
  }


  // ── Boot ──────────────────────────────────────────────────────────────
  function boot() {
    scrim     = document.getElementById('overlay-scrim');
    panel     = document.getElementById('overlay-panel');
    if (!panel || !scrim) {
      console.warn('[Upg.overlay] overlay slots missing — slide-over skipped');
      return;
    }
    bodyEl    = panel.querySelector('[data-overlay-body]');
    titleEl   = panel.querySelector('[data-overlay-title]');
    eyebrowEl = panel.querySelector('[data-overlay-eyebrow]');

    document.addEventListener('click', onClick, false);
    // capture phase so an open overlay swallows Escape before other handlers
    document.addEventListener('keydown', onKeyDown, true);
    if (bodyEl) bodyEl.addEventListener('scroll', onBodyScroll, { passive: true });

    window.addEventListener('popstate', function (e) {
      if (!isOpen) return;
      const st = e.state;
      if (!st || !st.upgOverlay) teardown();
    });
  }


  // ── Idempotent surface registration ─────────────────────────────────
  if (!window.Upg.overlay) {
    window.Upg.overlay = Object.freeze({
      open: open,
      openTemplate: openTemplate,
      close: close,
      toggle: toggle,
      isOpen: function () { return isOpen; },
      current: function () { return currentId; },
      _meta: Object.freeze({
        version: 'tadaffuq-v5/ε1',
        pulse: 'GLASS_PULSE',
        realizes: 'SPATIAL_DOCTRINE §4 Upg.nav.overlay'
      })
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    queueMicrotask(boot);
  }

})();
