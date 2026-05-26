(function initEpsilon1Dashboard() {
  const fill = document.querySelector('[data-dashboard-progress-fill]');
  const note = document.querySelector('[data-dashboard-progress-note]');
  if (!fill || !note || !window.Upg) return;

  const goal = 50;
  const getValue = () => {
    const stateValue = Number(window.Upg?.state?.get?.('daily_progress'));
    if (Number.isFinite(stateValue)) return Math.max(0, stateValue);
    return 0;
  };

  const paint = () => {
    const raw = getValue();
    const clamped = Math.min(goal, raw);
    const pct = Math.round((clamped / goal) * 100);
    fill.style.setProperty('--progress-pct', `${pct}%`);
    note.textContent = `أَتممتَ ${clamped} من أصل ${goal}`;
  };

  paint();
  document.addEventListener('upg:state:daily_progress', paint);
  window.Upg?.icons?.autoMount?.();
})();
