/* ============================================================================
   ATELIER — interaction layer (prototype, vanilla ESM-free IIFE)
   Implements §14: spatial transitions, gestures + keyboard parity,
   state persistence, optimistic feedback, reduced-motion safety.
   ========================================================================== */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const KEY = "atelier:v1";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsVT = typeof document.startViewTransition === "function";

  /* ── persisted state ─────────────────────────────────────────────────── */
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const state = Object.assign({ theme: "dark", density: "comfortable", view: "home", scroll: {} }, load());
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };

  /* ── icon sprite injection (same-document <use> refs) ────────────────── */
  async function mountSprite() {
    try {
      const res = await fetch("assets/icons.svg");
      $("#sprite-mount").innerHTML = await res.text();
    } catch { /* file:// — external <use href> still resolves on http */ }
  }

  /* ── progress rings: compute circumference, set --p ──────────────────── */
  function initRings() {
    $$(".ring[data-ring]").forEach((ring) => {
      const c = $("circle.bar", ring); if (!c) return;
      const r = parseFloat(c.getAttribute("r")) || 27;
      const circ = 2 * Math.PI * r;
      ring.style.setProperty("--circ", circ.toFixed(2));
      ring.style.setProperty("--p", "0");
      // animate to value after paint (or jump if reduced-motion)
      requestAnimationFrame(() => ring.style.setProperty("--p", ring.dataset.ring));
    });
  }

  /* ── theme + density ─────────────────────────────────────────────────── */
  function applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    $$("[data-theme-icon] use").forEach((u) =>
      u.setAttribute("href", state.theme === "dark" ? "#i-moon" : "#i-sun"));
  }
  function applyDensity() { document.documentElement.dataset.density = state.density; }
  const toggleTheme = () => { state.theme = state.theme === "dark" ? "light" : "dark"; applyTheme(); save(); };
  const toggleDensity = () => { state.density = state.density === "compact" ? "comfortable" : "compact"; applyDensity(); save(); };

  /* ── navigation with spatial shared-element morph ────────────────────── */
  function setActive(view) {
    $$('.rail-item[data-nav], .dock-item[data-nav]').forEach((b) =>
      b.setAttribute("aria-current", b.dataset.nav === view ? "page" : "false"));
  }

  function swapTo(view, source) {
    const target = $(`#view-${view}`);
    if (!target || view === state.view) return;
    const current = $(`#view-${state.view}`);

    const domTo = target.dataset.domain || "dashboard";

    const doSwap = () => {
      if (current) { state.scroll[state.view] = window.scrollY; current.hidden = true; }
      target.hidden = false;
      document.documentElement.dataset.domain = domTo;
      state.view = view;
      setActive(view);
      // restore or reset scroll
      const y = state.scroll[view] || 0;
      window.scrollTo({ top: y, behavior: "auto" });
      target.querySelector(".page-head, h1, h2")?.setAttribute("tabindex", "-1");
      target.querySelector(".page-head, h1, h2")?.focus?.({ preventScroll: true });
      initRings();
      resetBlocks(target);
      save();
    };

    // spatial morph: tag source tile + destination header with same VT name
    if (supportsVT && !reduce) {
      const head = target.querySelector(".page-head");
      if (source) source.style.viewTransitionName = "domain-morph";
      if (head) head.style.viewTransitionName = "domain-morph";
      const vt = document.startViewTransition(doSwap);
      vt.finished.finally(() => {
        if (source) source.style.viewTransitionName = "";
        if (head) head.style.viewTransitionName = "";
      });
    } else {
      doSwap();
    }
  }

  /* ── quiz ────────────────────────────────────────────────────────────── */
  function bindQuiz(root) {
    $$(".quiz", root).forEach((quiz) => {
      const opts = $$(".opt", quiz);
      opts.forEach((opt) => opt.addEventListener("click", () => {
        if (quiz.dataset.answered) return;
        const correct = opt.dataset.correct === "true";
        opt.classList.add(correct ? "correct" : "wrong");
        opt.setAttribute("aria-pressed", "true");
        if (!correct) {
          opt.classList.add("shake");
          // reveal the correct one
          opts.find((o) => o.dataset.correct === "true")?.classList.add("correct");
        } else {
          opt.classList.add("bloom");
        }
        quiz.dataset.answered = "1";
      }));
    });
  }

  /* ── mastery toggle (3 states) ───────────────────────────────────────── */
  const NEXT = { "not-started": "progress", "progress": "mastered", "mastered": "not-started" };
  function bindMastery(root) {
    $$("[data-mastery]", root).forEach((btn) => btn.addEventListener("click", () => {
      const s = NEXT[btn.dataset.state] || "progress";
      btn.dataset.state = s;
      const lbl = btn.querySelector("[data-mastery-label]");
      if (lbl) lbl.textContent = s === "not-started" ? "علّم كمُتقَن" : s === "progress" ? "قيد التقدّم" : "مُتقَن";
      if (s === "mastered" && !reduce) { btn.classList.remove("bloom"); void btn.offsetWidth; btn.classList.add("bloom"); }
    }));
  }

  /* ── bookmarks ───────────────────────────────────────────────────────── */
  function bindBookmarks(root) {
    $$("[data-bookmark]", root).forEach((btn) => btn.addEventListener("click", () => {
      const on = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!on));
      btn.style.color = on ? "" : "var(--accent)";
    }));
  }

  /* ── blocks: pager + swipe (RTL-aware) + keyboard ────────────────────── */
  function resetBlocks(view) {
    const wrap = view.querySelector("[data-swipe]"); if (!wrap) return;
    wrap._i = 0; showBlock(wrap);
  }
  function blocksOf(wrap) { return $$("[data-block]", wrap); }
  function showBlock(wrap) {
    const blocks = blocksOf(wrap);
    blocks.forEach((b, i) => { b.hidden = i !== wrap._i; });
    const counter = wrap.querySelector("[data-block-counter]");
    if (counter) counter.textContent = `${wrap._i + 1} / ${blocks.length}`;
  }
  function move(wrap, dir) {
    const n = blocksOf(wrap).length;
    const next = Math.min(Math.max((wrap._i || 0) + dir, 0), n - 1);
    if (next === wrap._i) return;
    wrap._i = next; showBlock(wrap);
    if (!reduce) { const cur = blocksOf(wrap)[next]; cur.classList.remove("bloom"); }
  }
  function bindBlocks(view) {
    const wrap = view.querySelector("[data-swipe]"); if (!wrap) return;
    wrap._i = 0; showBlock(wrap);
    view.querySelector("[data-next-block]")?.addEventListener("click", () => move(wrap, +1));
    view.querySelector("[data-prev]")?.addEventListener("click", () => move(wrap, -1));

    // keyboard parity (RTL: ArrowLeft = next, ArrowRight = prev)
    view.addEventListener("keydown", (e) => {
      if (e.target.closest(".opt, input")) return;
      if (e.key === "ArrowLeft") { move(wrap, +1); }
      else if (e.key === "ArrowRight") { move(wrap, -1); }
    });

    // touch swipe with rubber-band feel
    let x0 = null, dx = 0;
    wrap.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; dx = 0; }, { passive: true });
    wrap.addEventListener("touchmove", (e) => {
      if (x0 == null) return; dx = e.touches[0].clientX - x0;
      const cur = blocksOf(wrap)[wrap._i];
      if (cur && !reduce) cur.style.transform = `translateX(${dx * 0.35}px)`;
    }, { passive: true });
    wrap.addEventListener("touchend", () => {
      const cur = blocksOf(wrap)[wrap._i];
      if (cur) cur.style.transform = "";
      if (Math.abs(dx) > 60) move(wrap, dx < 0 ? +1 : -1); // RTL: swipe left → next
      x0 = null; dx = 0;
    });
  }

  /* ── sticky header condense fallback (no scroll-timeline) ────────────── */
  function bindHeaderCondense() {
    if (CSS.supports("animation-timeline: scroll()")) return; // CSS handles it
    const onScroll = () => {
      const head = $(`#view-${state.view} .page-head`);
      if (head) head.classList.toggle("is-condensed", window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ── command palette (minimal stub) ──────────────────────────────────── */
  function search() {
    const dest = prompt("اذهب إلى: home · accounting · psych");
    if (dest && $(`#view-${dest.trim()}`)) swapTo(dest.trim());
  }

  /* ── wire global actions + nav (delegated) ───────────────────────────── */
  function bindActions() {
    document.addEventListener("click", (e) => {
      const navBtn = e.target.closest("[data-nav]");
      if (navBtn) { swapTo(navBtn.dataset.nav, navBtn.closest(".tile")); return; }
      const act = e.target.closest("[data-action]")?.dataset.action;
      if (act === "theme") toggleTheme();
      else if (act === "density") toggleDensity();
      else if (act === "search") search();
    });

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); search(); }
      else if (e.key.toLowerCase() === "t" && !e.target.closest("input,textarea")) toggleTheme();
    });

    // edge-swipe to open rail on touch (pins it)
    let ex = null;
    addEventListener("touchstart", (e) => { ex = e.touches[0].clientX; }, { passive: true });
    addEventListener("touchend", (e) => {
      const rail = $(".rail"); if (!rail || ex == null) return;
      const end = e.changedTouches[0].clientX;
      // RTL: rail is on the right edge; swipe from right edge inward
      if (ex > innerWidth - 24 && ex - end > 40) rail.dataset.pinned = "true";
      else if (end - ex > 40) rail.dataset.pinned = "false";
      ex = null;
    });
  }

  /* ── boot ────────────────────────────────────────────────────────────── */
  async function boot() {
    applyTheme(); applyDensity();
    await mountSprite();
    initRings();
    $$(".view").forEach((v) => { bindQuiz(v); bindMastery(v); bindBookmarks(v); bindBlocks(v); });
    bindActions();
    bindHeaderCondense();
    // restore last view
    if (state.view && state.view !== "home") {
      const v = state.view; state.view = "home";
      const cur = $("#view-home"); if (cur) cur.hidden = true;
      const t = $(`#view-${v}`); if (t) { t.hidden = false; state.view = v; document.documentElement.dataset.domain = t.dataset.domain || "dashboard"; setActive(v); initRings(); }
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
