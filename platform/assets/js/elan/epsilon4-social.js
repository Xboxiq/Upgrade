/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — ε4 — Social Content Revival (Tayyar world)
   ────────────────────────────────────────────────────────────────────────
   VISUAL_BEACON — VHS scrub-bar engagement timeline.

   Public surface (Upg.elan.social — namespaced under Upg.elan, NOT a
   15th top-level Upg.* — preserves the locked count):

     Upg.elan.social.engage()      — bind scrub to all eligible nodes
     Upg.elan.social.refresh()     — repaint snapshot (re-read posts)
     Upg.elan.social.setIndex(i)   — programmatic post selection
     Upg.elan.social.getIndex()    — current scrub index
     Upg.elan.social.posts()       — frozen array of fixture posts
     Upg.elan.social.engaged()     — boolean

   Posts dataset:
     8 posts spanning Q1-Q4 2024, with engagement counts representative
     of typical Iraqi small-business Instagram performance (FMCG / retail
     / service vertical). Marked with data-fixture="true" on the host
     element so any consumer can distinguish from real data when wired
     to Meta Graph API later. Engagement = likes + comments + shares
     (single integer for the scrub readout, full breakdown shown in the
     snapshot card).

   Behavior:
   - Pointer down OR pointermove-while-pressed inside .vhs-scrub updates
     the scrub percentage. Each percentage maps to a post index
     (Math.floor(pct * posts.length), capped at length-1).
   - Index change → glitch the snapshot (add data-glitching="true",
     remove after 60ms — exact spec match) → repaint snapshot fields.
   - Keyboard: Tab focuses scrub; ←/→ moves by 1 post; Home/End jump.
   - ResizeObserver is NOT needed — CSS handles all layout via
     percentage-based --scrub-pct.

   Sacred:
   - Does not register a top-level Upg.*
   - Does not replace existing social page content (17 legacy lesson
     blocks); only ADDS the .vhs-section before .block-bridge.
   ──────────────────────────────────────────────────────────────────── */

(() => {
  'use strict';

  const w = typeof window !== 'undefined' ? window : globalThis;
  if (!w.document) return;
  w.Upg = w.Upg || {};
  w.Upg.elan = w.Upg.elan || {};
  if (w.Upg.elan.social) return;

  /* ── Posts fixture (Q1-Q4 2024 Iraqi-market shape) ──────────────── */
  // Each post: { date_iso, date_label, kind, title, likes, comments, shares }
  // Engagement = likes + comments + shares
  const POSTS = Object.freeze([
    {
      date_iso: '2024-02-14', date_label: 'فبراير 2024',
      kind: 'caption',   icon: 'megaphone',
      title: 'كابشن مكتوب بفصحى — منتج إطلاق',
      likes: 412, comments: 18, shares: 7
    },
    {
      date_iso: '2024-04-03', date_label: 'أبريل 2024',
      kind: 'reel-fasih', icon: 'sparkles',
      title: 'Reel بصوت فصيح — ١٥ ثانية',
      likes: 980, comments: 41, shares: 22
    },
    {
      date_iso: '2024-05-22', date_label: 'مايو 2024',
      kind: 'reel-iraqi', icon: 'flame',
      title: 'Reel بلهجة عراقية — voice-over محلي',
      likes: 3420, comments: 187, shares: 96
    },
    {
      date_iso: '2024-07-09', date_label: 'يوليو 2024',
      kind: 'carousel',  icon: 'image',
      title: 'كاروسيل ٥ شرائح — قبل/بعد',
      likes: 1560, comments: 94, shares: 38
    },
    {
      date_iso: '2024-08-18', date_label: 'أغسطس 2024',
      kind: 'reel-iraqi', icon: 'flame',
      title: 'Reel — تجربة عميل بلكنة بغداد',
      likes: 5180, comments: 312, shares: 188
    },
    {
      date_iso: '2024-10-05', date_label: 'أكتوبر 2024',
      kind: 'caption',   icon: 'message-square',
      title: 'كابشن طويل — قصة منشأة',
      likes: 720, comments: 52, shares: 14
    },
    {
      date_iso: '2024-11-12', date_label: 'نوفمبر 2024',
      kind: 'reel-iraqi', icon: 'flame',
      title: 'Reel — تحدي ٢٤ ساعة في السوق',
      likes: 6920, comments: 478, shares: 244
    },
    {
      date_iso: '2024-12-28', date_label: 'ديسمبر 2024',
      kind: 'live',      icon: 'phone',
      title: 'بث مباشر — لقاء مع جمهور',
      likes: 2840, comments: 219, shares: 64
    }
  ]);

  const totalEngagement = (p) => p.likes + p.comments + p.shares;

  /* ── State per scrub instance ──────────────────────────────────── */
  const _instances = new WeakMap();
  let _engaged = false;
  let _lastIndex = 0;

  /* ── Number formatting (β3 kashida or fallback) ────────────────── */
  const formatN = (n) => {
    try {
      const fmt = w.Upg && w.Upg.format;
      if (fmt && typeof fmt.kashida === 'function' && Number(n) >= 10000) {
        return fmt.kashida(n, { decimals: 0 });
      }
    } catch (_) {}
    return new Intl.NumberFormat('ar-IQ', { useGrouping: true }).format(Number(n) || 0);
  };

  /* ── Snapshot painting ─────────────────────────────────────────── */
  const paintSnapshot = (snapshotEl, post) => {
    if (!snapshotEl || !post) return;
    const eng = totalEngagement(post);

    const headDate    = snapshotEl.querySelector('[data-snap-date]');
    const headKind    = snapshotEl.querySelector('[data-snap-kind]');
    const engEl       = snapshotEl.querySelector('[data-snap-engagement]');
    const titleEl     = snapshotEl.querySelector('[data-snap-title]');
    const likesEl     = snapshotEl.querySelector('[data-snap-likes]');
    const commentsEl  = snapshotEl.querySelector('[data-snap-comments]');
    const sharesEl    = snapshotEl.querySelector('[data-snap-shares]');
    const iconEl      = snapshotEl.querySelector('[data-snap-icon]');

    if (headDate)   headDate.textContent   = post.date_label;
    if (headKind)   headKind.textContent   = post.kind;
    if (engEl)      engEl.textContent      = formatN(eng);
    if (titleEl)    titleEl.textContent    = post.title;
    if (likesEl)    likesEl.textContent    = formatN(post.likes);
    if (commentsEl) commentsEl.textContent = formatN(post.comments);
    if (sharesEl)   sharesEl.textContent   = formatN(post.shares);
    if (iconEl)     iconEl.dataset.icon    = post.icon || 'sparkles';

    // Fire glitch — exact 60ms spec
    snapshotEl.dataset.glitching = 'true';
    setTimeout(() => snapshotEl.removeAttribute('data-glitching'), 60);
  };

  /* ── Scrub repaint ─────────────────────────────────────────────── */
  const paintScrub = (scrubEl, idx) => {
    if (!scrubEl) return;
    const n = POSTS.length;
    const safeIdx = Math.max(0, Math.min(n - 1, idx));
    // Anchor cursor to centre of the band for that index, so the cursor
    // sits inside the post's slice (1-N) rather than at its leading edge.
    const pct = ((safeIdx + 0.5) / n) * 100;
    scrubEl.style.setProperty('--scrub-pct', pct.toFixed(2) + '%');
    scrubEl.setAttribute('aria-valuenow', String(safeIdx + 1));
    scrubEl.dataset.activeIndex = String(safeIdx);

    const numEl  = scrubEl.querySelector('[data-scrub-num]');
    const dateEl = scrubEl.querySelector('[data-scrub-date]');
    const post = POSTS[safeIdx];
    if (post && numEl)  numEl.textContent  = formatN(totalEngagement(post));
    if (post && dateEl) dateEl.textContent = post.date_label;
  };

  const indexFromPointer = (scrubEl, clientX) => {
    const rect = scrubEl.getBoundingClientRect();
    if (!rect.width) return 0;
    // RTL: bounding box is mirrored — use direction-aware math
    const isRTL = getComputedStyle(scrubEl).direction === 'rtl';
    let raw = (clientX - rect.left) / rect.width;
    if (isRTL) raw = 1 - raw;
    raw = Math.max(0, Math.min(1, raw));
    const idx = Math.floor(raw * POSTS.length);
    return Math.min(POSTS.length - 1, idx);
  };

  /* ── Bind one scrub element + its snapshot ──────────────────────── */
  const bindOne = (root) => {
    const scrubEl    = root.querySelector('[data-vhs-scrub]');
    const snapshotEl = root.querySelector('[data-vhs-snapshot]');
    if (!scrubEl || !snapshotEl) return;
    if (_instances.has(scrubEl)) return;  // idempotent
    _instances.set(scrubEl, { snapshotEl, idx: 0 });

    // Initial paint
    paintScrub(scrubEl, 0);
    paintSnapshot(snapshotEl, POSTS[0]);

    let pointerActive = false;

    const setIdx = (idx, fromPointer) => {
      const inst = _instances.get(scrubEl);
      if (!inst) return;
      if (idx === inst.idx && !fromPointer) return;
      inst.idx = idx;
      _lastIndex = idx;
      paintScrub(scrubEl, idx);
      paintSnapshot(snapshotEl, POSTS[idx]);
      // Emit DOM event for analytics integration
      try {
        scrubEl.dispatchEvent(new CustomEvent('upg:social:scrub', {
          bubbles: true,
          detail: { index: idx, post: POSTS[idx] }
        }));
      } catch (_) {}
    };

    scrubEl.addEventListener('pointerdown', (e) => {
      pointerActive = true;
      try { scrubEl.setPointerCapture(e.pointerId); } catch (_) {}
      const idx = indexFromPointer(scrubEl, e.clientX);
      setIdx(idx, true);
      e.preventDefault();
    });

    scrubEl.addEventListener('pointermove', (e) => {
      if (!pointerActive) return;
      const idx = indexFromPointer(scrubEl, e.clientX);
      const cur = _instances.get(scrubEl);
      if (cur && idx !== cur.idx) setIdx(idx, true);
    });

    const release = (e) => {
      if (!pointerActive) return;
      pointerActive = false;
      try { scrubEl.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    scrubEl.addEventListener('pointerup', release);
    scrubEl.addEventListener('pointercancel', release);
    scrubEl.addEventListener('lostpointercapture', () => { pointerActive = false; });

    // Keyboard
    scrubEl.addEventListener('keydown', (e) => {
      const cur = _instances.get(scrubEl);
      if (!cur) return;
      let next = cur.idx;
      const isRTL = getComputedStyle(scrubEl).direction === 'rtl';
      switch (e.key) {
        case 'ArrowLeft':  next = isRTL ? cur.idx + 1 : cur.idx - 1; break;
        case 'ArrowRight': next = isRTL ? cur.idx - 1 : cur.idx + 1; break;
        case 'Home':       next = 0; break;
        case 'End':        next = POSTS.length - 1; break;
        case 'PageUp':     next = cur.idx + 2; break;
        case 'PageDown':   next = cur.idx - 2; break;
        default: return;
      }
      next = Math.max(0, Math.min(POSTS.length - 1, next));
      if (next !== cur.idx) {
        setIdx(next, false);
        e.preventDefault();
      }
    });

    // ARIA — slider-like
    scrubEl.setAttribute('role', 'slider');
    scrubEl.setAttribute('tabindex', '0');
    scrubEl.setAttribute('aria-valuemin', '1');
    scrubEl.setAttribute('aria-valuemax', String(POSTS.length));
    scrubEl.setAttribute('aria-valuenow', '1');
    if (!scrubEl.hasAttribute('aria-label')) {
      scrubEl.setAttribute('aria-label',
        `شريط زمني للتفاعل — ${POSTS.length} منشورات بين ${POSTS[0].date_label} و${POSTS[POSTS.length - 1].date_label}`);
    }
  };

  /* ── Engage all candidates on the page ──────────────────────────── */
  const engage = () => {
    if (_engaged) return;
    _engaged = true;
    const roots = document.querySelectorAll('[data-elan-vhs]');
    roots.forEach(bindOne);
    // Re-bind on page activation (in case a route swap re-injects)
    document.addEventListener('upg:page:active', (e) => {
      const id = e && e.detail && e.detail.id;
      if (id !== 'social') return;
      requestAnimationFrame(() => {
        document.querySelectorAll('[data-elan-vhs]').forEach(bindOne);
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', engage, { once: true });
  } else {
    engage();
  }

  /* ── Public API ─────────────────────────────────────────────────── */
  w.Upg.elan.social = Object.freeze({
    engage,
    refresh() {
      document.querySelectorAll('[data-elan-vhs]').forEach((root) => {
        const scrubEl = root.querySelector('[data-vhs-scrub]');
        const inst = scrubEl && _instances.get(scrubEl);
        if (inst) {
          paintScrub(scrubEl, inst.idx);
          paintSnapshot(inst.snapshotEl, POSTS[inst.idx]);
        }
      });
    },
    setIndex(i) {
      const safe = Math.max(0, Math.min(POSTS.length - 1, Number(i) | 0));
      document.querySelectorAll('[data-elan-vhs]').forEach((root) => {
        const scrubEl = root.querySelector('[data-vhs-scrub]');
        const inst = scrubEl && _instances.get(scrubEl);
        if (inst) {
          inst.idx = safe;
          _lastIndex = safe;
          paintScrub(scrubEl, safe);
          paintSnapshot(inst.snapshotEl, POSTS[safe]);
        }
      });
    },
    getIndex() { return _lastIndex; },
    posts() { return POSTS.slice(); },
    engaged() { return _engaged; }
  });
})();
