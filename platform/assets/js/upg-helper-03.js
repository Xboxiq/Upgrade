/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-helper-03.js
   Extracted from app.js lines 3493-3801
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
      'use strict';

      // ── 1) THEME ENGINE — persist & toggle ──────────────────────
      const THEME_KEY = 'v12_theme';

      function applyTheme(theme) {
        const t = (theme === 'light') ? 'light' : 'dark';
        if (t === 'light') document.body.setAttribute('data-theme', 'light');
        else               document.body.removeAttribute('data-theme');
        try { localStorage.setItem(THEME_KEY, t); } catch(e) {}
        // Keep the lamp button's aria-pressed in sync
        document.querySelectorAll('.theme-toggle').forEach(btn => {
          btn.setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
        });
      }

      function toggleTheme() {
        const current = document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        applyTheme(current === 'light' ? 'dark' : 'light');
      }

      // Expose globally (used by the Lamp button onclick="toggleTheme()")
      window.toggleTheme = toggleTheme;
      window.applyTheme  = applyTheme;

      // Restore saved theme on load
      try {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'light') applyTheme('light');
        else                   applyTheme('dark');
      } catch(e) { applyTheme('dark'); }


      // ── 2) PRO-ICON LIBRARY — Lucide-style inline SVGs ──────────
      // Single vocabulary, consistent stroke-width, flat & professional.
      const ICONS = {
        phone:          '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.94a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
        briefcase:      '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
        handshake:      '<path d="M11 17l2 2a1 1 0 1 0 3-3"/><path d="M14 14l2.5 2.5a1 1 0 1 0 3-3L14 8"/><path d="M8 13l-2.5 2.5a1 1 0 1 1-3-3L8 7"/><path d="M14 14l-2-2"/>',
        wrench:         '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
        smartphone:     '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/>',
        code:           '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
        calculator:     '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="8" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="16" y1="18" x2="16" y2="18"/>',
        userCheck:      '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/>',
        chartLine:      '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
        chartBar:       '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/><line x1="3" y1="20" x2="21" y2="20"/>',
        trophy:         '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>',
        star:           '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        trendUp:        '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
        seedling:       '<path d="M7 20h10"/><path d="M12 20V10"/><path d="M12 10c0-3 2-5 5-5-.5 3-2 5-5 5z"/><path d="M12 10c0-3-2-5-5-5 .5 3 2 5 5 5z"/>',
        flame:          '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
        ear:            '<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 0 1-2 2"/>',
        mic:            '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>',
        check:          '<polyline points="20 6 9 17 4 12"/>',
        checkCircle:    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
        shuffle:        '<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>',
        x:              '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
        alert:          '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
        alertCircle:    '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
        ban:            '<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>',
        search:         '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
        eye:            '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
        brain:          '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.84A2.5 2.5 0 0 1 9.5 2"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.84A2.5 2.5 0 0 0 14.5 2"/>',
        lightbulb:      '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
        target:         '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
        zap:            '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
        clipboard:      '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
        shield:         '<path d="M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z"/>',
        clock:          '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        calendar:       '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
        users:          '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        anchor:         '<circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>',
        puzzle:         '<path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z"/>',
        book:           '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
        image:          '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
        music:          '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
        megaphone:      '<path d="M3 11v3a1 1 0 0 0 1 1h8l5 3V7L12 10H4a1 1 0 0 0-1 1z"/><path d="M17 7v10"/>',
        rocket:         '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
        refresh:        '<polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10"/><path d="M3.51 15a9 9 0 0 0 14.85 3.36L23 14"/>',
        thumbsUp:       '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88z"/>',
        layers:         '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
        globe:          '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
        heart:          '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
        sparkle:        '<path d="M12 3v18M3 12h18M5.64 5.64l12.72 12.72M5.64 18.36 18.36 5.64"/>',
        mirror:         '<path d="M12 3v18"/><path d="M8 7h8"/><path d="M6 12h12"/><path d="M8 17h8"/>',
        key:            '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
        compass:        '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
        tag:            '<path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
        folder:         '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
        mail:           '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
        messageCircle: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
        bolt:           '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
        coin:           '<circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M15 9.5A3.5 3.5 0 0 0 11.5 8h-2A2.5 2.5 0 0 0 9.5 13h5A2.5 2.5 0 0 1 14.5 18h-2A3.5 3.5 0 0 1 9 16.5"/>',
        flask:          '<path d="M9 3h6v4l5 10c.3.7-.1 1.5-.9 1.8-.2.1-.3.2-.5.2H5.4c-.8 0-1.4-.7-1.4-1.5 0-.2.1-.4.2-.5L9 7V3z"/><line x1="9" y1="3" x2="15" y2="3"/>',
        chart:          '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'
      };

      function svg(name) {
        const d = ICONS[name];
        if (!d) return '';
        return '<span class="pro-icon" aria-hidden="true">' +
               '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
               'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
               d + '</svg></span>';
      }


      // ── 3) EMOJI → PRO-ICON MAP ─────────────────────────────────
      // Only UI-chrome emojis (navigation, buttons, chips, labels).
      // Scientific scripts inside training dialogs are preserved
      // (see SKIP_SELECTORS below).
      const EMOJI_MAP = {
        // Telephony / support
        '📞': 'phone',   '☎️': 'phone',   '☎': 'phone',
        // Messaging / social
        '💬': 'messageCircle', '📨': 'mail',  '📧': 'mail',
        '📩': 'mail',    '📣': 'megaphone', '📢': 'megaphone',
        // Commerce / sales
        '💼': 'briefcase', '💰': 'coin',  '💵': 'coin', '💸': 'coin',
        '🏪': 'briefcase', '🛒': 'briefcase',
        // Collaboration
        '🤝': 'handshake',
        // Tools / tech
        '🔧': 'wrench',  '🛠️': 'wrench', '🛠': 'wrench',
        '💻': 'code',    '⌨️': 'code',   '🖥️': 'code',
        '📱': 'smartphone', '📲': 'smartphone',
        // Finance / data
        '🧮': 'calculator', '📊': 'chartBar', '📈': 'chartLine', '📉': 'chartLine',
        // People
        '👤': 'userCheck', '👥': 'users', '🧑‍💼': 'userCheck',
        // Achievement / status
        '🏆': 'trophy',  '⭐': 'star',   '🌟': 'star', '✨': 'sparkle',
        '🎯': 'target',  '🎖️': 'trophy',
        '🌱': 'seedling',
        // Energy / emphasis
        '🔥': 'flame',   '⚡': 'bolt',   '💡': 'lightbulb',
        // Senses / cognition
        '👂': 'ear',     '👁️': 'eye',   '👀': 'eye',
        '🎙️': 'mic',    '🎤': 'mic',
        '🧠': 'brain',
        // Validation
        '✅': 'check',   '✔️': 'check',  '✓': 'check',
        '❌': 'x',       '✖️': 'x',       '❎': 'x',
        '⚠️': 'alert',  '⚠': 'alert',
        '🚫': 'ban',    '🛑': 'ban',
        '🔴': 'alertCircle', '🟠': 'alertCircle', '🟡': 'alertCircle',
        '🟢': 'checkCircle', '🔵': 'alertCircle',
        // Structure / navigation
        '🔍': 'search', '🔎': 'search',
        '📋': 'clipboard', '📝': 'clipboard', '📌': 'clipboard', '📍': 'clipboard',
        '📁': 'folder', '🗂️': 'folder', '📂': 'folder',
        '📚': 'book',   '📖': 'book',   '📕': 'book', '📘': 'book', '📙': 'book',
        '🗓️': 'calendar', '📅': 'calendar', '📆': 'calendar',
        // Security
        '🛡️': 'shield', '🔒': 'shield', '🔐': 'shield',
        '🔑': 'key',
        // Abstract concepts
        '🔁': 'refresh', '🔄': 'refresh',
        '🧩': 'puzzle',
        '🪞': 'mirror',
        '🧭': 'compass',
        '🏷️': 'tag',
        '⚓': 'anchor',
        '🧪': 'flask',
        '🚀': 'rocket',
        '👋': 'handshake',
        '🧲': 'target',
        '❓': 'alertCircle', '❔': 'alertCircle',
        // Media
        '📸': 'image',  '📷': 'image',  '📹': 'image',
        '🎵': 'music',  '🎶': 'music',
        '🎨': 'sparkle',
        '🎭': 'sparkle',
        '🤖': 'code',
        // Emotional labels kept neutral
        '😰': 'alertCircle', '😵': 'alertCircle', '😤': 'alertCircle',
        '😬': 'alertCircle', '🚨': 'alert',
        '⏰': 'clock',  '⏱️': 'clock', '⌛': 'clock'
      };

      // Build a single regex from the map keys, longest-first to avoid
      // swallowing the base codepoint of a compound emoji (e.g. "⚠️").
      const EMOJI_KEYS = Object.keys(EMOJI_MAP).sort((a,b) => b.length - a.length);
      const EMOJI_RE   = new RegExp(
        '(' + EMOJI_KEYS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')',
        'g'
      );

      // DO NOT migrate emojis inside these zones — they belong to the
      // pedagogical content (agent/client scripts, dialogue, narrative).
      const SKIP_SELECTORS = [
        '.script-text', '.script-dialog',
        '.hook-text', '.cs-script-text',
        '.crisis-template-text', '.crisis-action-text',
        '.psych-info-text', '.psych-p-example',
        '.psych-warning-text', '.psych-quote',
        '.sim-card-desc', '.sim-scenario-narrative',
        '.skill-detail-text',
        '.ql-recall-a', '.ql-cog-text',
        'textarea', 'input', 'script', 'style', 'pre', 'code', '.pro-icon',
        // Any element the migrator has already touched
        '[data-pro-icon-done="1"]'
      ];

      function isInSkipZone(node) {
        let el = node.parentNode;
        while (el && el.nodeType === 1) {
          if (el.matches && el.matches(SKIP_SELECTORS.join(','))) return true;
          el = el.parentNode;
        }
        return false;
      }

      function migrateTextNode(textNode) {
        const txt = textNode.nodeValue;
        if (!txt || !EMOJI_RE.test(txt)) return;
        EMOJI_RE.lastIndex = 0; // reset after .test()
        if (isInSkipZone(textNode)) return;
        // Build fragment with mixed text + icon spans
        const frag = document.createDocumentFragment();
        let last = 0, m;
        const re = new RegExp(EMOJI_RE.source, 'g');
        while ((m = re.exec(txt)) !== null) {
          if (m.index > last) frag.appendChild(
            document.createTextNode(txt.slice(last, m.index))
          );
          const iconName = EMOJI_MAP[m[0]];
          const span = document.createElement('span');
          span.className = 'pro-icon';
          span.setAttribute('aria-hidden', 'true');
          span.innerHTML = '<svg viewBox="0 0 24 24" fill="none" ' +
            'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
            'stroke-linejoin="round">' + ICONS[iconName] + '</svg>';
          frag.appendChild(span);
          last = m.index + m[0].length;
        }
        if (last < txt.length) frag.appendChild(
          document.createTextNode(txt.slice(last))
        );
        textNode.parentNode.replaceChild(frag, textNode);
      }

      function migrateRoot(root) {
        if (!root || !root.nodeType) return;
        if (root.nodeType === 3) { migrateTextNode(root); return; }
        if (root.nodeType !== 1) return;
        if (root.matches && root.matches(SKIP_SELECTORS.join(','))) return;
        if (root.getAttribute && root.getAttribute('data-pro-icon-done') === '1') return;

        // Iterate all text-node descendants, but skip content inside
        // pedagogical zones.
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
          acceptNode(n) {
            if (!n.nodeValue || !EMOJI_RE.test(n.nodeValue)) {
              EMOJI_RE.lastIndex = 0; return NodeFilter.FILTER_REJECT;
            }
            EMOJI_RE.lastIndex = 0;
            // skip inside skip-zones
            let p = n.parentNode;
            while (p && p.nodeType === 1) {
              if (p.matches && p.matches(SKIP_SELECTORS.join(','))) return NodeFilter.FILTER_REJECT;
              p = p.parentNode;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        });
        const collected = [];
        let t;
        while ((t = walker.nextNode())) collected.push(t);
        collected.forEach(migrateTextNode);

        if (root.setAttribute) root.setAttribute('data-pro-icon-done', '1');
      }

      // Initial pass once the DOM is ready
      function initialMigration() {
        migrateRoot(document.getElementById('app') || document.body);
      }

      // Watch for dynamically-rendered UI (quiz modals, scenario grid,
      // hook panel, etc.) and migrate it too.
      function observeMutations() {
        const mo = new MutationObserver(muts => {
          muts.forEach(m => {
            m.addedNodes && m.addedNodes.forEach(n => {
              if (n.nodeType === 1) {
                // Mark the root "not done" so nested children re-process
                n.removeAttribute && n.removeAttribute('data-pro-icon-done');
                migrateRoot(n);
              } else if (n.nodeType === 3) {
                migrateTextNode(n);
              }
            });
          });
        });
        mo.observe(document.body, { childList: true, subtree: true });
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){
          initialMigration();
          observeMutations();
        });
      } else {
        initialMigration();
        observeMutations();
      }
    })();
