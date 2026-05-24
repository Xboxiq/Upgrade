/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — γ3 — Naar world: spark hover beacon
   ────────────────────────────────────────────────────────────────────────
   Tracks pointer position on .spark-host elements inside the Naar world,
   updating --mx/--my CSS custom properties. The spark flash is pure CSS.
   ════════════════════════════════════════════════════════════════════════ */

let raf = 0;

function onMove(e) {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    const target = e.target.closest('.spark-host');
    if (!target) return;
    const r = target.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    target.style.setProperty('--mx', `${mx}%`);
    target.style.setProperty('--my', `${my}%`);
  });
}

function bind() {
  if (document.body.dataset.world !== 'naar') return;
  document.addEventListener('pointermove', onMove, { passive: true });
}

function unbind() {
  document.removeEventListener('pointermove', onMove);
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'naar') bind();
  else unbind();
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.world === 'naar') bind();
  });
} else {
  if (document.body.dataset.world === 'naar') bind();
}

window.Upg = window.Upg || {};
window.Upg.worlds = window.Upg.worlds || {};
window.Upg.worlds.naar = Object.freeze({ bind, unbind });
