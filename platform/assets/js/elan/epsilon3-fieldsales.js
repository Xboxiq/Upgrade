/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — ε3 — Pillar ε CONTENT_REVIVAL — Stage 3 of 12
   Page:    page-fieldsales
   World:   حَديد (Hadeed) — Beirut cinema iron + Brutalist Iraqi modernism
   Surface: Upg.fieldsales (25th top-level Upg.* namespace)
   ────────────────────────────────────────────────────────────────────────
   Beacon: 🤚 INTERACTION_BEACON
   ----------------------------------------------------------------------
   The Surprise — the daily route map is NOT a Google Maps embed. It is a
   hand-built 2D Canvas with seven Baghdad customer pins drawn as pure JS
   objects on a faint paper grid. The field-rep TAPS the pins in the
   order they intend to visit; an iron-tinged polyline is drawn between
   them; live meta (distance / stops / time) updates pin-by-pin. A reset
   wipes the path. Pointer Events handle mouse + touch + pen identically.
   No map tile, no API key, no external dependency. Brutalist as a paper
   field sheet. The interaction is the data structure.

   Forbidden Library avoided:
     #4 — generic mesh-gradient page-decoration
    #11 — animated counter from 0 (the meter updates instantly, no rolling tween)
     Google Maps embed cliché (every other field-sales UI in 2025)

   Token-aware paint — canvas fillStyle / strokeStyle read from a hidden
   probe element styled with the Hadeed CSS custom properties. This means
   if the user toggles theme or world, the canvas re-paints in the world's
   palette. No hardcoded hex literals. Re-read on resize.

   Sacred preservation: zero touch to Upg.* legacy. ADDS Upg.fieldsales
   alongside Upg.callcenter (ε2). 16 pages + 17 nav-items intact.
   ──────────────────────────────────────────────────────────────────────── */

(function initEpsilon3Fieldsales () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const w = window;
  w.Upg = w.Upg || {};

  /* ── Static Baghdad customer fixture (proportional, not lat/lng) ──── */
  /* Coordinates are 0-1 normalised against the canvas; resolved at paint */
  const CUSTOMERS = Object.freeze([
    { id: 'aladhamiya',  name: 'بقالة الأعظمية',     u: 0.18, v: 0.22, est: 14 },
    { id: 'karkh',       name: 'سوبر ماركت الكرخ',   u: 0.42, v: 0.18, est: 22 },
    { id: 'mansour',     name: 'مجمع المنصور',       u: 0.62, v: 0.30, est: 18 },
    { id: 'kadhimiya',   name: 'متجر الكاظمية',      u: 0.30, v: 0.55, est: 12 },
    { id: 'sadrcity',    name: 'مذخر مدينة الصدر',   u: 0.74, v: 0.62, est: 26 },
    { id: 'karrada',     name: 'بقّالة الكرّادة',     u: 0.50, v: 0.74, est: 16 },
    { id: 'doura',       name: 'سوبر الدورة',         u: 0.20, v: 0.82, est: 18 }
  ]);

  /* Distance scale: 1 normalised unit = ~ 14 km (rough Baghdad spread) */
  const DIST_KM_PER_UNIT = 14;
  /* Travel: 1.6 km/min city pace + customer dwell from CUSTOMERS[i].est  */
  const KM_PER_MIN = 1.6;

  /* ── Token probe — reads world palette from CSS custom properties ── */
  function readPalette (host) {
    const probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;color:currentColor;';
    host.appendChild(probe);
    function tokenAs (cssVar) {
      probe.style.color = `var(${cssVar}, currentColor)`;
      const c = getComputedStyle(probe).color;
      return c || 'currentColor';
    }
    const palette = {
      grid:      tokenAs('--ink-faint'),
      pinIdle:   tokenAs('--ink-muted'),
      pinActive: tokenAs('--ember'),
      pinLabel:  tokenAs('--ink'),
      route:     tokenAs('--ember'),
      origin:    tokenAs('--focus')
    };
    host.removeChild(probe);
    return palette;
  }

  /* ── Canvas init ──────────────────────────────────────────────────── */
  function initRouteCanvas (root) {
    const canvas = root.querySelector('[data-route-canvas]');
    const distEl = root.querySelector('[data-route="distance"] [data-route-meta-value]');
    const stopsEl = root.querySelector('[data-route="stops"]    [data-route-meta-value]');
    const timeEl = root.querySelector('[data-route="time"]     [data-route-meta-value]');
    const resetBtn = root.querySelector('[data-route-reset]');
    if (!canvas || !canvas.getContext) return null;

    const ctx = canvas.getContext('2d');
    let palette = readPalette(canvas.parentElement || document.body);
    let path = [];

    function resolveCustomers (rect) {
      return CUSTOMERS.map((c) => ({
        ...c,
        x: c.u * rect.width,
        y: c.v * rect.height
      }));
    }

    function resize () {
      const dpr = w.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); /* reset before scale */
      ctx.scale(dpr, dpr);
      palette = readPalette(canvas.parentElement || document.body);
      draw();
    }

    function draw () {
      const rect = canvas.getBoundingClientRect();
      const points = resolveCustomers(rect);
      ctx.clearRect(0, 0, rect.width, rect.height);

      /* Paper grid — 24 px squares in faint ink */
      ctx.strokeStyle = palette.grid;
      ctx.globalAlpha = 0.18;
      ctx.lineWidth = 1;
      for (let x = 0; x < rect.width; x += 24) {
        ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, rect.height); ctx.stroke();
      }
      for (let y = 0; y < rect.height; y += 24) {
        ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(rect.width, y + 0.5); ctx.stroke();
      }
      ctx.globalAlpha = 1;

      /* Path polyline — drawn first so pins sit above */
      if (path.length > 1) {
        ctx.strokeStyle = palette.route;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        path.forEach((id, i) => {
          const p = points.find((q) => q.id === id);
          if (!p) return;
          if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
      }

      /* Pins */
      ctx.font = '13px var(--font-text, system-ui, sans-serif)';
      ctx.textBaseline = 'middle';
      points.forEach((p) => {
        const order = path.indexOf(p.id);
        const active = order >= 0;
        ctx.fillStyle = active ? palette.pinActive : palette.pinIdle;
        ctx.beginPath();
        ctx.arc(p.x, p.y, active ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();

        if (active) {
          /* Order number inside pin */
          ctx.fillStyle = palette.origin;
          ctx.font = 'bold 11px var(--font-text, system-ui, sans-serif)';
          ctx.textAlign = 'center';
          ctx.fillText(String(order + 1), p.x, p.y);
        }

        /* Label to the right (RTL: reads naturally with name) */
        ctx.font = '12.5px var(--font-text, system-ui, sans-serif)';
        ctx.fillStyle = palette.pinLabel;
        ctx.textAlign = 'left';
        ctx.fillText(p.name, p.x + 11, p.y + 0.5);
      });
    }

    function pointToCustomer (x, y) {
      const rect = canvas.getBoundingClientRect();
      const points = resolveCustomers(rect);
      let best = null;
      let bestDist = 18; /* hit radius in CSS px */
      points.forEach((p) => {
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < bestDist) { best = p; bestDist = d; }
      });
      return best;
    }

    function updateMeta () {
      let dist = 0;
      let dwell = 0;
      const rect = canvas.getBoundingClientRect();
      const points = resolveCustomers(rect);
      const norm = Math.max(rect.width, rect.height) || 1;
      for (let i = 1; i < path.length; i++) {
        const a = points.find((p) => p.id === path[i - 1]);
        const b = points.find((p) => p.id === path[i]);
        if (!a || !b) continue;
        dist += Math.hypot(a.x - b.x, a.y - b.y) / norm;
      }
      path.forEach((id) => {
        const c = CUSTOMERS.find((q) => q.id === id);
        if (c) dwell += c.est;
      });
      const km = dist * DIST_KM_PER_UNIT;
      const minutes = Math.ceil(dwell + (km / KM_PER_MIN));
      if (distEl)  distEl.textContent = `${km.toFixed(1)} كم`;
      if (stopsEl) stopsEl.textContent = String(path.length);
      if (timeEl)  timeEl.textContent = `${minutes} د`;
    }

    function onPointer (e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const c = pointToCustomer(x, y);
      if (!c) return;
      const idx = path.indexOf(c.id);
      if (idx === -1) {
        path.push(c.id);
      } else {
        /* Tapping an active pin removes it and everything after */
        path = path.slice(0, idx);
      }
      updateMeta();
      draw();
      try {
        document.dispatchEvent(new CustomEvent('upg:fieldsales:route', {
          detail: { path: path.slice(), customer: c.id }
        }));
      } catch (_) { /* ignore */ }
    }

    function reset () {
      path = [];
      updateMeta();
      draw();
    }

    canvas.addEventListener('pointerdown', onPointer);
    canvas.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') reset();
    });
    canvas.tabIndex = 0;
    canvas.setAttribute('role', 'application');
    canvas.setAttribute('aria-label', 'لوحة تخطيط الجولة — انقر على نقاط الزبائن بالترتيب لرسم المسار');

    if (resetBtn) resetBtn.addEventListener('click', reset);

    /* Re-paint on world / theme changes (consumes existing Upg events) */
    document.addEventListener('upg:nav:change',   () => requestAnimationFrame(resize));
    document.addEventListener('upg:theme:change', () => requestAnimationFrame(resize));

    /* Initial paint after layout settles */
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', resize, { once: true });
    } else {
      resize();
    }
    window.addEventListener('resize', resize);

    updateMeta();
    return Object.freeze({ reset, getPath: () => path.slice() });
  }

  /* ── Boot ─────────────────────────────────────────────────────────── */
  const instances = new WeakMap();
  function boot () {
    document.querySelectorAll('[data-fieldsales-route-root]').forEach((root) => {
      if (instances.has(root)) return;
      const inst = initRouteCanvas(root);
      if (inst) instances.set(root, inst);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  /* ── Public surface ───────────────────────────────────────────────── */
  if (!w.Upg.fieldsales) {
    w.Upg.fieldsales = Object.freeze({
      customers: () => CUSTOMERS.slice(),
      reset: () => {
        document.querySelectorAll('[data-fieldsales-route-root]').forEach((root) => {
          const inst = instances.get(root);
          if (inst) inst.reset();
        });
      }
    });
  }
})();
