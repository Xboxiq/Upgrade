/* ════════════════════════════════════════════════════════════════════════
   DEVOTIO v3 — ESM Module: upg-shards-1.js
   Extracted from app.js lines 18910-19101
   Side-effect module — importing this file runs the IIFE.
   ════════════════════════════════════════════════════════════════════════ */
(function (window, document) {
  'use strict';

  if (window.Upg && window.Upg.shards) return; // idempotent guard

  const PAGES_DIR = './pages/';

  // 15 shard ids (alphabetic-by-page-priority — dashboard first as default home).
  const SHARD_IDS = Object.freeze([
    'dashboard',
    'callcenter', 'fieldsales', 'accountmgr', 'social',
    'lab', 'psych', 'eq', 'negotiation', 'customercare',
    'programming', 'accounting', 'phonerepair', 'hrmastery',
    'myprogress',
  ]);

  // In-memory cache: shardId → DocumentFragment
  const cache = new Map();
  // Status cache: shardId → 'pending' | 'ok' | 'error'
  const status = new Map();

  /* ── loadShard ────────────────────────────────────────────────────────
     Fetches platform/pages/<id>.html, parses into a DocumentFragment,
     caches the result. Returns null on any failure (file://, 404, parse).
  */
  const loadShard = async (id) => {
    if (!SHARD_IDS.includes(id)) {
      console.warn('[Upg.shards] Unknown shard id:', id);
      return null;
    }
    if (cache.has(id)) return cache.get(id);
    if (status.get(id) === 'pending') {
      // Coalesce concurrent loads
      return new Promise((resolve) => {
        const tick = () => {
          if (status.get(id) !== 'pending') resolve(cache.get(id) || null);
          else setTimeout(tick, 30);
        };
        tick();
      });
    }
    status.set(id, 'pending');
    try {
      const url = PAGES_DIR + id + '.html';
      const resp = await fetch(url, { credentials: 'same-origin' });
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const text = await resp.text();
      const tpl = document.createElement('template');
      tpl.innerHTML = text;
      const frag = tpl.content;
      cache.set(id, frag);
      status.set(id, 'ok');
      return frag;
    } catch (err) {
      status.set(id, 'error');
      // Silent on file:// — the inline copy still renders, no user impact
      if (typeof console !== 'undefined' && location.protocol !== 'file:') {
        console.warn('[Upg.shards] loadShard("' + id + '") failed:', err.message || err);
      }
      return null;
    }
  };

  /* ── preloadAll ───────────────────────────────────────────────────────
     Warms the cache for every shard. Default opts.idle=true uses
     requestIdleCallback so it never competes with first paint.
  */
  const preloadAll = (opts) => {
    const idle = !opts || opts.idle !== false;
    const run = () =>
      Promise.all(SHARD_IDS.map(loadShard)).then((results) => {
        const loaded = results.filter((r) => r !== null).length;
        return { loaded: loaded, failed: SHARD_IDS.length - loaded, total: SHARD_IDS.length };
      });
    if (idle && typeof window.requestIdleCallback === 'function') {
      return new Promise((resolve) => {
        window.requestIdleCallback(() => run().then(resolve), { timeout: 4000 });
      });
    }
    return run();
  };

  /* ── audit ────────────────────────────────────────────────────────────
     Snapshot of the current shard system state for /troubleshoot rituals.
  */
  const audit = () => ({
    declared: SHARD_IDS.length,
    cached: cache.size,
    cached_ids: Array.from(cache.keys()),
    pending: Array.from(status.entries()).filter(([, v]) => v === 'pending').map(([k]) => k),
    errored: Array.from(status.entries()).filter(([, v]) => v === 'error').map(([k]) => k),
    inline_count: document.querySelectorAll('main#main section.page').length,
    pages_dir: PAGES_DIR,
    phase: '4',
    pack: 'v3',
    mode: 'STAGE-ONLY',
    note: 'inline sections are canonical until Phase 5',
  });

  /* ── verify ───────────────────────────────────────────────────────────
     Confirms a shard's content tracks the inline section. Compares trimmed
     outerHTML lengths and qcalc/section counts. Returns a structured diff.
  */
  const verify = async (id) => {
    const frag = await loadShard(id);
    const inline = document.getElementById('page-' + id);
    if (!frag || !inline) {
      return { id: id, match: false, reason: !frag ? 'shard not loaded' : 'inline missing' };
    }
    const shardSection = frag.querySelector('section.page#page-' + id) || frag.firstElementChild;
    const inlineHTML = inline.outerHTML;
    const shardHTML = shardSection ? shardSection.outerHTML : '';
    const lenInline = inlineHTML.length;
    const lenShard = shardHTML.length;
    const qcalcInline = (inlineHTML.match(/qcalc/g) || []).length;
    const qcalcShard = (shardHTML.match(/qcalc/g) || []).length;
    return {
      id: id,
      match: qcalcInline === qcalcShard && Math.abs(lenInline - lenShard) < 16,
      inlineLength: lenInline,
      shardLength: lenShard,
      qcalcInline: qcalcInline,
      qcalcShard: qcalcShard,
    };
  };

  /* ── mountShard (FUTURE — STAGED) ─────────────────────────────────────
     This method is the swap-in point for Phase 5. In Phase 4 it's wired
     defensively: it REFUSES if the inline copy is still in the DOM (so
     accidental calls don't double-mount).
  */
  const mountShard = async (id, opts) => {
    opts = opts || {};
    const inline = document.getElementById('page-' + id);
    if (inline && !opts.force) {
      console.warn('[Upg.shards] mountShard("' + id + '") refused — inline copy present (Phase 4 stage-only). Pass {force:true} to override.');
      return false;
    }
    const frag = await loadShard(id);
    if (!frag) return false;
    const host = (opts.host && document.querySelector(opts.host)) || document.getElementById('main');
    if (!host) return false;
    if (inline && opts.force) inline.remove();
    host.appendChild(frag.cloneNode(true));
    document.dispatchEvent(new CustomEvent('upg:shards:mounted', { detail: { id: id } }));
    return true;
  };

  /* ── discipline ──────────────────────────────────────────────────────
     The 6 rules a future maintainer must respect when touching shards.
  */
  const DISCIPLINE = Object.freeze([
    'every <section class="page" id="page-X"> in index.html has a 1:1 byte-exact copy in pages/X.html',
    'edit BOTH inline + shard until Phase 5 migrates navigateTo to live queries',
    'never add a page without creating its shard AND adding it to SHARD_IDS + sw.js PRECACHE',
    'never delete a shard without proving its inline copy is the only consumer',
    'mountShard refuses while inline is present — pass {force:true} only after navigateTo is dynamic',
    'all shard URLs are same-origin; offline = SW cache; file:// = silent fallback to inline',
  ]);

  // Public surface (frozen)
  window.Upg = window.Upg || {};
  window.Upg.shards = Object.freeze({
    list: () => SHARD_IDS.slice(),
    loadShard: loadShard,
    preloadAll: preloadAll,
    audit: audit,
    verify: verify,
    mountShard: mountShard,
    discipline: () => DISCIPLINE.slice(),
  });

  // Boot — preload after first paint settles
  const boot = () => {
    if (location.protocol === 'file:') {
      // file:// — fetch will fail; don't even try. Audit still works.
      return;
    }
    preloadAll({ idle: true }).then((r) => {
      if (typeof console !== 'undefined' && console.info) {
        console.info('[Upg.shards] preload: ' + r.loaded + '/' + r.total +
          (r.failed ? ' (' + r.failed + ' failed)' : ''));
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})(window, document);
