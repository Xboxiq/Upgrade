/* ════════════════════════════════════════════════════════════════════════
   ÊLAN v4 — γ2 — Hibr world: ink-drying CTA beacon
   ────────────────────────────────────────────────────────────────────────
   When a success button is clicked in the Hibr world (dashboard/myprogress),
   the text fills letter-by-letter like a Naskh pen drying on Tahbeer paper.
   ════════════════════════════════════════════════════════════════════════ */

function activateInkDry(el) {
  if (el.classList.contains('is-drying')) return;
  requestAnimationFrame(() => el.classList.add('is-drying'));
}

function bindHibrButtons() {
  const world = document.body.dataset.world;
  if (world !== 'hibr') return;

  document.querySelectorAll('.btn-success-action').forEach(btn => {
    if (btn.dataset.hibrBound) return;
    btn.dataset.hibrBound = 'true';
    btn.addEventListener('click', () => activateInkDry(btn));
  });
}

document.addEventListener('upg:world:change', (e) => {
  if (e.detail?.world === 'hibr') bindHibrButtons();
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindHibrButtons);
} else {
  bindHibrButtons();
}

window.Upg = window.Upg || {};
window.Upg.worlds = window.Upg.worlds || {};
window.Upg.worlds.hibr = Object.freeze({ activateInkDry });
