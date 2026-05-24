/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-icons-1.js
   Extracted from app.js lines 11617-11813
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const SPRITE_ID = 'icon-sprite';
  const symbolExists = (name) => !!document.getElementById(`icon-${name}`);

  const render = (el) => {
    if (!el || el.__qiRendered) return;
    const name = el.dataset.icon;
    if (!name) return;
    if (!symbolExists(name)) {
      // Quiet fallback: render a small dot so layout doesn't collapse
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="2"/></svg>';
      el.dataset.iconFallback = '1';
      return;
    }
    el.innerHTML = `<svg aria-hidden="true" focusable="false"><use href="#icon-${name}"/></svg>`;
    el.__qiRendered = true;
  };

  const renderAll = (root) => {
    root = root || document;
    if (!root.querySelectorAll) return;
    root.querySelectorAll('.qi[data-icon]').forEach(render);
  };

  // ── Emoji → icon name map (for the migrator) ──────────────────
  const EMOJI_MAP = {
    '👋':'sparkles','✨':'sparkles','⭐':'star','🌟':'star','🏆':'trophy',
    '🔍':'search','🔎':'search','🔔':'bell','📩':'message-square','📨':'message-square','💬':'message-square',
    '⚙️':'settings','🛠️':'wrench','🔧':'wrench','📁':'layers','📂':'layers',
    '📞':'phone','📱':'phone','🎧':'headphones','🎤':'mic','🎙️':'mic',
    '💼':'briefcase','📊':'bar-chart','📈':'trending-up','📉':'trending-down','📐':'line-chart','📏':'line-chart',
    '💰':'dollar-sign','💵':'dollar-sign','💸':'dollar-sign',
    '⏱️':'clock','⏰':'clock','🕐':'clock','📅':'calendar','🗓️':'calendar',
    '🎯':'target','🚀':'rocket','🔥':'fire','⚡':'zap','💡':'sparkles',
    '🔬':'flask-conical','🧪':'flask-conical','📚':'book-open','📖':'book-open','📘':'book-open',
    '🎓':'graduation-cap','🏅':'award','🥇':'award','🎖️':'award',
    '✅':'check-circle','✔️':'check','❌':'x-circle','⚠️':'alert-triangle','ℹ️':'info','❓':'help-circle','❔':'help-circle',
    '🔒':'lock','🔓':'unlock','🔑':'key','🛡️':'shield',
    '▶️':'play','⏸️':'pause','⏯️':'play','🔊':'volume-2','🔇':'volume-x',
    '📋':'copy','💾':'save','✏️':'edit','🗑️':'trash','👁️':'eye','🙈':'eye-off',
    '🔄':'refresh','♻️':'refresh','📤':'upload','📥':'download','🔗':'external-link',
    '➕':'plus','➖':'minus',
    '🧠':'brain','💚':'heart-handshake','❤️':'heart-handshake','🤝':'heart-handshake',
    '📱':'phone',
    '📸':'image','🖼️':'image',
    '👨‍💼':'user-tie','👩‍💼':'user-tie',
    '📺':'youtube','🎬':'youtube'
  };

  // Strip a leading emoji from text (used to clean header titles after icon insertion)
  const LEADING_EMOJI_RE = /^\s*([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{2700}-\u{27BF}](?:\uFE0F)?(?:\u200D[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}](?:\uFE0F)?)*)\s*/u;
  const TRAILING_EMOJI_RE = /\s*([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{2700}-\u{27BF}](?:\uFE0F)?(?:\u200D[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}](?:\uFE0F)?)*)\s*$/u;

  // ── Migrator: nav-items (replace inline <svg.nav-icon> with .qi) ───
  const NAV_ICON_MAP = {
    'dashboard': 'layout-dashboard',
    'callcenter': 'phone',
    'fieldsales': 'briefcase',
    'accountmgr': 'user-tie',
    'social': 'megaphone',
    'lab': 'flask-conical',
    'psych': 'brain',
    'eq': 'heart-handshake',
    'negotiation': 'gauge',
    'customercare': 'headphones',
    'programming': 'code',
    'accounting': 'calculator',
    'phonerepair': 'wrench',
    'hrmastery': 'briefcase'
  };

  const migrateNav = () => {
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      if (item.__qiNavMigrated) return;
      const page = item.dataset.page;
      const iconName = NAV_ICON_MAP[page];
      if (!iconName) return;
      const svg = item.querySelector('svg.nav-icon');
      if (!svg) return;
      const i = document.createElement('i');
      i.className = 'qi qi-md nav-icon';
      i.setAttribute('data-icon', iconName);
      svg.replaceWith(i);
      render(i);
      item.__qiNavMigrated = true;
    });
  };

  // ── Migrator: page headers — strip trailing/leading emoji from h1, prepend .qi ───
  const PAGE_ICON_MAP = {
    'page-dashboard':   'layout-dashboard',
    'page-callcenter':  'phone',
    'page-fieldsales':  'briefcase',
    'page-accountmgr':  'user-tie',
    'page-social':      'megaphone',
    'page-lab':         'flask-conical',
    'page-psych':       'brain',
    'page-eq':          'heart-handshake',
    'page-negotiation': 'gauge',
    'page-customercare':'headphones',
    'page-programming': 'code',
    'page-accounting':  'calculator',
    'page-phonerepair': 'wrench',
    'page-hrmastery':   'briefcase'
  };

  const migratePageHeaders = () => {
    document.querySelectorAll('section.page').forEach(page => {
      const iconName = PAGE_ICON_MAP[page.id];
      if (!iconName) return;
      const header = page.querySelector('.page-header');
      if (!header || header.__qiHeaderMigrated) return;
      const h1 = header.querySelector('h1');
      if (!h1) return;
      // Strip trailing emoji like 👋 in dashboard
      let txt = h1.textContent || '';
      const before = txt;
      txt = txt.replace(TRAILING_EMOJI_RE, '').replace(LEADING_EMOJI_RE, '').trim();
      if (txt && txt !== before) h1.textContent = txt;
      // Prepend an icon if not already present
      if (!header.querySelector(':scope > .qi')) {
        const i = document.createElement('i');
        i.className = 'qi qi-2xl';
        i.setAttribute('data-icon', iconName);
        i.style.marginInlineEnd = '12px';
        i.style.color = 'var(--accent)';
        h1.prepend(i, document.createTextNode(' '));
        render(i);
      }
      header.__qiHeaderMigrated = true;
    });
  };

  // ── Migrator: inline buttons & chips (only obvious leading emoji) ───
  const ALLOW_TAGS = new Set(['BUTTON','A','SPAN','LI','TD','TH','LABEL','SUMMARY','DIV']);
  const SAFE_CONTAINERS = '.btn, button, .nav-item-action, .stat-label, .acc-eyebrow, .ql-eyebrow, .qcard-eyebrow, .filter-chip, .pill, .badge';
  const migrateLeadingEmojis = () => {
    let count = 0;
    document.querySelectorAll(SAFE_CONTAINERS).forEach(el => {
      if (el.__qiEmojiMigrated) return;
      // Only operate on a direct leading text node
      const first = el.firstChild;
      if (!first || first.nodeType !== 3) return;
      const m = first.nodeValue.match(LEADING_EMOJI_RE);
      if (!m) return;
      const emoji = m[1];
      const iconName = EMOJI_MAP[emoji];
      if (!iconName || !symbolExists(iconName)) return;
      // Strip the emoji and the immediate whitespace from the text node
      first.nodeValue = first.nodeValue.replace(LEADING_EMOJI_RE, '');
      const i = document.createElement('i');
      i.className = 'qi';
      i.setAttribute('data-icon', iconName);
      i.style.marginInlineEnd = '0.4em';
      el.insertBefore(i, first);
      render(i);
      el.__qiEmojiMigrated = true;
      count++;
    });
    return count;
  };

  const runAll = () => {
    if (!document.getElementById(SPRITE_ID)) {
      console.warn('[Upg.icons] sprite missing — abort migration');
      return;
    }
    renderAll();
    migrateNav();
    migratePageHeaders();
    migrateLeadingEmojis();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAll);
  } else {
    runAll();
  }

  // Future additions (lazy-loaded pages, dynamic UI)
  const mo = new MutationObserver((muts) => {
    let dirty = false;
    for (const m of muts) {
      for (const n of m.addedNodes) {
        if (n.nodeType !== 1) continue;
        if (n.classList && n.classList.contains('qi')) { render(n); dirty = true; }
        if (n.querySelectorAll) renderAll(n);
      }
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  window.Upg = window.Upg || {};
  window.Upg.icons = { render, renderAll, registry: NAV_ICON_MAP, emojiMap: EMOJI_MAP };
})();
