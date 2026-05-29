# β2 — THEME PROVIDER

**Pillar:** β · **Stage:** 2 of 3 · **Pulse:** none

## Intent
The `Upg.theme` API rebuilt cleanly for v5. Sets `data-theme` on `<html>`, persists to localStorage, listens to OS `prefers-color-scheme`, dispatches `upg:theme:change` events.

## API surface (preserved sacred — manifesto §4)
```js
Upg.theme.get()                              // → 'dark' | 'light' | 'auto'
Upg.theme.set(mode, opts?)                   // mode: 'dark'|'light'|'auto'; opts: { transition: bool }
Upg.theme.cycle()                            // dark → light → auto → dark
Upg.theme.current()                          // → resolved theme: 'dark'|'light' (auto resolves)
Upg.theme.subscribe(fn)                      // → unsubscribe()
Upg.theme.ORDER                              // ['dark','light','auto']
```

## Forensic targets
- emoji in theme.js : 0
- inline `<svg viewBox>` : 0
- node --check passes
- localStorage write guarded with try/catch (private mode safe)
- prefers-color-scheme listener registered : 1
- registers on `window.Upg.theme` only if not already present : true (idempotent)

## Files
1. `platform-v5/assets/js/theme.js` — classic IIFE, ~140 lines
2. `platform-v5/index.html` — wire `theme.js` (1 line)

## Acceptance
- `Upg.theme.set('light')` → `<html data-theme="light">` immediately
- `Upg.theme.set('auto')` → resolves to OS preference, listens for change
- `Upg.theme.cycle()` cycles through three states preserving keybinding muscle memory
- `localStorage.upg_theme` persists choice
- subscribe/unsubscribe pattern works
