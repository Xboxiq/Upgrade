/* ────────────────────────────────────────────────────────────────────────
   ÊLAN v4 — ε8 — Programming Content Revival (Naar world) JS
   ────────────────────────────────────────────────────────────────────────
   🏛 STRUCTURAL_BEACON — Brutalist Skill Tree

   The career-path map is rendered as an SVG branching diagram, drawn
   programmatically via document.createElementNS so that no inline
   <svg viewBox path...> appears in the HTML markup. This is the
   correct lane: the SVG is data-visualization, not iconography.

   The tree:
     - one foundation node (the trunk) at the top center
     - ten path nodes (leaves) laid out across three rows
     - quadratic-curve branches sweep from the trunk to each leaf
     - hover OR keyboard focus on a branch dims all others to 0.3
     - Tab cycles the branches (each <g> is focusable via tabindex=0)
     - Enter / Space activates the leaf (dispatches a custom event;
       the page can hook this to deep-link, scroll, or filter content)

   Reduced-motion is handled in CSS — this module does not animate.

   What this module does NOT do:
     - load any external library
     - touch the existing programming-page lessons
     - register a top-level Upg.* API (it lives under Upg.elan.programming)

   Public API: window.Upg.elan.programming (frozen)
     - render(host?)    build the tree into a host element (defaults to
                        the [data-elan-tree] host in the document)
     - paths()          read-only list of path descriptors
     - foundations()    read-only foundation descriptor
     - focus(id)        set focus to a path id ('' to clear)

   Event:
     'upg:elan:programming:select' fires on the host with detail.id when
     the user activates a leaf via click / Enter / Space.
   ──────────────────────────────────────────────────────────────────── */

const SVG_NS = 'http://www.w3.org/2000/svg';
const HOST_SELECTOR = '[data-elan-tree]';
const VIEWBOX_W = 480;
const VIEWBOX_H = 540;

/* ── Foundation (the trunk) ─────────────────────────────────────── */
const FOUNDATION = Object.freeze({
  id:   'foundations',
  name: 'الأساسيات السبعة',
  x: VIEWBOX_W / 2,
  y: 36,
});

/* ── Ten path leaves on a 3-row × 3/3/4 layout (last row holds AI + */
/*    DevOps + Data + Game, the four "modern frontier" paths) ─────── */
const PATHS = Object.freeze([
  Object.freeze({ id: 'fe-vanilla', name: 'Frontend Vanilla', x:  92, y: 168 }),
  Object.freeze({ id: 'fe-react',   name: 'Frontend React',   x: 240, y: 168 }),
  Object.freeze({ id: 'fe-vue',     name: 'Frontend Vue',     x: 388, y: 168 }),

  Object.freeze({ id: 'be-node',    name: 'Backend Node',     x:  92, y: 296 }),
  Object.freeze({ id: 'be-python',  name: 'Backend Python',   x: 240, y: 296 }),
  Object.freeze({ id: 'mobile',     name: 'Mobile (Flutter)', x: 388, y: 296 }),

  Object.freeze({ id: 'devops',     name: 'DevOps',           x:  72, y: 432 }),
  Object.freeze({ id: 'data',       name: 'Data Science',     x: 200, y: 432 }),
  Object.freeze({ id: 'ai',         name: 'AI Engineer',      x: 328, y: 432 }),
  Object.freeze({ id: 'game',       name: 'Game Dev',         x: 432, y: 432 }),
]);

/* ── DOM helpers ────────────────────────────────────────────────── */
function el(name, attrs) {
  const node = document.createElementNS(SVG_NS, name);
  if (attrs) {
    for (const k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) {
        node.setAttribute(k, attrs[k]);
      }
    }
  }
  return node;
}

/* ── Build a single quadratic-curve branch from trunk → leaf ────── */
function buildBranchPath(trunk, leaf) {
  // The control point sits at the trunk's x-coord, leaf's y - 24,
  // so the branch leaves the trunk vertically then sweeps to the leaf.
  // This produces the Makiya-style structural diagram language.
  const cx = trunk.x;
  const cy = leaf.y - 24;
  const sx = trunk.x;
  const sy = trunk.y + 14;
  const ex = leaf.x;
  const ey = leaf.y - 18;
  return 'M ' + sx + ' ' + sy +
         ' Q ' + cx + ' ' + cy +
         ' ' + ex + ' ' + ey;
}

/* ── Build the full SVG ────────────────────────────────────────── */
function buildSvg(host) {
  const svg = el('svg', {
    'viewBox': '0 0 ' + VIEWBOX_W + ' ' + VIEWBOX_H,
    'preserveAspectRatio': 'xMidYMid meet',
    'role': 'presentation',
    'aria-hidden': 'true',
  });

  /* Foundation (trunk) */
  const trunkG = el('g', {
    'class': 'branch',
    'data-id': FOUNDATION.id,
    'data-foundation': '1',
    'tabindex': '0',
    'role': 'button',
  });
  const trunkText = el('text', {
    'x': FOUNDATION.x,
    'y': FOUNDATION.y,
    'text-anchor': 'middle',
  });
  trunkText.textContent = FOUNDATION.name;
  trunkG.appendChild(trunkText);
  svg.appendChild(trunkG);

  /* Each path leaf */
  PATHS.forEach((p) => {
    const g = el('g', {
      'class': 'branch',
      'data-id': p.id,
      'tabindex': '0',
      'role': 'button',
      'aria-label': p.name,
    });

    const path = el('path', {
      'd': buildBranchPath(FOUNDATION, p),
    });
    g.appendChild(path);

    const txt = el('text', {
      'x': p.x,
      'y': p.y,
      'text-anchor': 'middle',
    });
    txt.textContent = p.name;
    g.appendChild(txt);

    /* Hover-focus + keyboard-focus */
    g.addEventListener('mouseenter', () => setFocus(host, p.id));
    g.addEventListener('mouseleave', () => setFocus(host, ''));
    g.addEventListener('focus',      () => setFocus(host, p.id));
    g.addEventListener('blur',       () => setFocus(host, ''));

    /* Activate */
    const activate = () => {
      try {
        host.dispatchEvent(new CustomEvent('upg:elan:programming:select', {
          bubbles: true,
          detail: { id: p.id, name: p.name },
        }));
      } catch (_) { /* tolerate */ }
    };
    g.addEventListener('click', activate);
    g.addEventListener('keydown', (e) => {
      if (e && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        activate();
      }
    });

    svg.appendChild(g);
  });

  return svg;
}

/* ── Focus state: only one leaf "active" at a time ──────────────── */
function setFocus(host, id) {
  if (!host) return;
  host.dataset.elanFocus = id || '';
  const all = host.querySelectorAll('.branch');
  for (let i = 0; i < all.length; i++) {
    const g = all[i];
    if (id && g.dataset.id === id) {
      g.setAttribute('data-id-active', '1');
    } else {
      g.removeAttribute('data-id-active');
    }
  }
}

/* ── Render (idempotent) ───────────────────────────────────────── */
function render(hostArg) {
  const host = hostArg || document.querySelector(HOST_SELECTOR);
  if (!host) return null;
  if (host.__elanTreeRendered) return host;

  // Clear any stale children just in case.
  while (host.firstChild) host.removeChild(host.firstChild);

  const svg = buildSvg(host);
  host.appendChild(svg);
  host.__elanTreeRendered = true;
  return host;
}

/* ── Public API + side effects ─────────────────────────────────── */
function init() {
  const host = document.querySelector(HOST_SELECTOR);
  if (host) render(host);

  /* On nav back to programming, ensure the tree is mounted. */
  window.addEventListener('upg:nav:change', (e) => {
    const id = (e && e.detail && e.detail.pageId) || '';
    if (id === 'programming') render();
  });
}

window.Upg = window.Upg || {};
window.Upg.elan = window.Upg.elan || {};
window.Upg.elan.programming = Object.freeze({
  render,
  foundations: () => FOUNDATION,
  paths: () => PATHS.slice(),
  focus: (id) => setFocus(document.querySelector(HOST_SELECTOR), id || ''),
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
