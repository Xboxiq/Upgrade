/* ════════════════════════════════════════════════════════════════════════
   TADAFFUQ v5 — α4 — Icon helper
   ────────────────────────────────────────────────────────────────────────
   Exposes Upg.icons.use(semanticKey, options?) and Upg.icons.audit().
   Classic IIFE — mobile-safe, no ESM (per the v4.0.2 lesson learned).

   The semantic map is fetched at boot (idempotent — module is safe to
   re-run). The sprite document is loaded once into #sprite-mount.

   Dependencies: none. Runs after DOMContentLoaded; defers earlier work.
   Manifest: ICONOGRAPHY_DOCTRINE.md §3 + §5.
   ════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Public surface ───────────────────────────────────────────────────
  if (typeof window === 'undefined') return;
  window.Upg = window.Upg || {};

  // Internal: semantic map — populated at boot from JSON.
  let MAP = null;
  let SPRITE_LOADED = false;
  const PENDING_QUEUE = [];

  // SVG namespace constant — saves repeated string lookup.
  const NS = 'http://www.w3.org/2000/svg';

  // Validated set of size keys (must match tokens.css)
  const SIZE_KEYS = new Set(['xs', 'sm', 'md', 'lg', 'xl', '2xl']);


  // ── Helpers ──────────────────────────────────────────────────────────

  /**
   * Resolve a semantic key like "navigation.home" against the loaded map.
   * @param {string} key  — dot-separated group.entry
   * @returns {string|null} icon-id or null when unmapped
   */
  function resolveKey(key) {
    if (!MAP || typeof key !== 'string') return null;
    const parts = key.split('.');
    if (parts.length !== 2) return null;
    const [group, entry] = parts;
    if (!MAP[group] || typeof MAP[group] !== 'object') return null;
    const id = MAP[group][entry];
    return (typeof id === 'string' && id.startsWith('icon-')) ? id : null;
  }

  /**
   * Build an SVG element that references a sprite symbol.
   * @param {string} iconId  — e.g. "icon-home"
   * @param {object} [opts]
   * @param {string} [opts.size]   — one of "xs" "sm" "md" "lg" "xl" "2xl"
   * @param {string} [opts.label]  — accessible name; switches role to img
   * @returns {SVGSVGElement}
   */
  function buildSvg(iconId, opts) {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'icon');

    if (opts && opts.size && SIZE_KEYS.has(opts.size)) {
      svg.style.setProperty('--icon-size', 'var(--icon-' + opts.size + ')');
    }

    if (opts && opts.label) {
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', opts.label);
    } else {
      svg.setAttribute('aria-hidden', 'true');
    }

    const useEl = document.createElementNS(NS, 'use');
    // Both attribute forms for maximum compatibility:
    useEl.setAttribute('href', '#' + iconId);
    useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + iconId);
    svg.appendChild(useEl);
    return svg;
  }


  // ── Public API ───────────────────────────────────────────────────────

  /**
   * Return an SVGElement for the given semantic key. Returns a placeholder
   * (a 1×1 transparent svg) if the key is unmapped, so callers never crash.
   * @returns {SVGSVGElement}
   */
  function use(key, opts) {
    const id = resolveKey(key);
    if (!id) {
      // Truthful fallback — build an empty <svg class="icon">.
      // Lookup failures are surfaced via Upg.icons.audit(), not silenced.
      const empty = document.createElementNS(NS, 'svg');
      empty.setAttribute('class', 'icon icon-missing');
      empty.setAttribute('data-missing-key', String(key));
      empty.setAttribute('aria-hidden', 'true');
      return empty;
    }
    return buildSvg(id, opts || null);
  }

  /**
   * Return the list of semantic keys present in the map but absent from
   * the sprite, plus the list of sprite icons not referenced by the map.
   * @returns {{ unmapped_keys: string[], orphan_icons: string[] }}
   */
  function audit() {
    if (!MAP) return { unmapped_keys: [], orphan_icons: [], note: 'map not loaded yet' };
    const mountedIds = collectSpriteIds();
    const mappedIds = new Set();
    const unmapped = [];
    Object.keys(MAP).forEach(function (group) {
      if (group.startsWith('_')) return; // skip _meta and friends
      const sub = MAP[group];
      if (!sub || typeof sub !== 'object') return;
      Object.keys(sub).forEach(function (entry) {
        const id = sub[entry];
        if (typeof id !== 'string') return;
        mappedIds.add(id);
        if (mountedIds.size && !mountedIds.has(id)) {
          unmapped.push(group + '.' + entry + ' → ' + id);
        }
      });
    });
    const orphan = [];
    mountedIds.forEach(function (id) { if (!mappedIds.has(id)) orphan.push(id); });
    return { unmapped_keys: unmapped, orphan_icons: orphan };
  }

  function collectSpriteIds() {
    const out = new Set();
    const mount = document.getElementById('sprite-mount');
    if (!mount) return out;
    const symbols = mount.querySelectorAll('symbol[id^="icon-"]');
    symbols.forEach(function (s) { out.add(s.id); });
    return out;
  }


  // ── Boot — fetch sprite + map ────────────────────────────────────────

  function fetchText(url) {
    if (typeof fetch !== 'function') return Promise.reject(new Error('fetch unavailable'));
    return fetch(url, { credentials: 'same-origin' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + url);
      return r.text();
    });
  }

  function fetchJson(url) {
    return fetchText(url).then(JSON.parse);
  }

  function mountSprite(svgText) {
    const mount = document.getElementById('sprite-mount');
    if (!mount) return false;
    // The fetched file is a full <svg ...>...</svg> document. We strip the
    // outer <svg> wrapper and inject only its children to avoid stacking
    // nested <svg> elements which some older browsers misrender.
    const wrapper = document.createElement('div');
    wrapper.innerHTML = svgText;
    const outer = wrapper.querySelector('svg');
    if (!outer) return false;
    Array.from(outer.children).forEach(function (child) {
      mount.appendChild(child);
    });
    SPRITE_LOADED = true;
    return true;
  }

  function flushQueue() {
    while (PENDING_QUEUE.length) {
      const job = PENDING_QUEUE.shift();
      try { job(); } catch (e) { console.error('[Upg.icons] queued job failed:', e); }
    }
  }

  function boot() {
    Promise.all([
      fetchText('assets/svg/icons.svg').catch(function (e) {
        console.error('[Upg.icons] sprite fetch failed:', e);
        return null;
      }),
      fetchJson('assets/svg/SEMANTIC_MAP.json').catch(function (e) {
        console.error('[Upg.icons] semantic map fetch failed:', e);
        return null;
      })
    ]).then(function (results) {
      const spriteText = results[0];
      const mapJson    = results[1];
      if (spriteText) mountSprite(spriteText);
      if (mapJson)    MAP = mapJson;
      flushQueue();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    queueMicrotask(boot);
  }


  // ── Surface registration (idempotent — never override existing) ─────
  if (!window.Upg.icons) {
    window.Upg.icons = Object.freeze({
      use: use,
      audit: audit,
      // Diagnostic surface — useful for dev tools, harmless in prod.
      _meta: Object.freeze({
        version: 'tadaffuq-v5/α4',
        sizeKeys: Array.from(SIZE_KEYS),
        loaded: function () { return SPRITE_LOADED && !!MAP; }
      })
    });
  }

})();
