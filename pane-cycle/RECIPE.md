# Pane cycle

Two keys that step focus through the panes of the shown tab, wrapping around
at the ends, like Ghostty's or the old herdr CLI's `cycle_pane_next` /
`cycle_pane_previous`. If a pane is zoomed, the zoom moves with focus, so the
pane you land on fills the tab instead of being hidden behind the old one.
Nothing is drawn: each key opens a mod that acts and closes at once.

## What you see

Nothing new on screen. Press `cmd+]` and the next pane in the tab gets focus
(its frame shows focus as usual); `cmd+[` goes the other way. In a zoomed tab
the next pane shows zoomed instead of the current one.

## How it behaves

- Order is `panes()` order for the shown tab (the tab's split order).
- Wraps: past the last pane comes the first, and back.
- One pane in the tab: does nothing.
- Zoomed: unzooms the zoomed pane, focuses the next, zooms it.
- Agent status is not involved; every pane (terminal or mod pane) counts.

## Built from

- Install: copy `pane-next/` and `pane-prev/` (not this folder) into
  `~/.config/herdr-app/mods/`; merge `keys.json`.
- Two mods, `pane-next` and `pane-prev`, identical except `STEP` (`1` / `-1`).
  `mod.open` takes only a name, so direction can't be an argument.
- `mod.json`: `{ "place": "none", "overlay": { "kind": "popup", "width": 1, "height": 1, "frame": "none" } }`
  so `mod.open:<name>` opens it as a 1×1 frameless popup.
- `init` spawns a task that calls `closeOverlay(props().overlay)`, reads
  `focused()` and `panes()` (filtered to `focused().tab`), then
  `run("pane.zoom", {pane})` / `run("pane.focus", {pane})`. `render` returns
  an empty `div()`.
- `keys.json`: `"cmd-]": "mod.open:pane-next"`, `"cmd-[": "mod.open:pane-prev"`
  in `global`. These replace the default `agent.next` / `agent.prev` there.
- Runs no programs, no network, reads no files.

## Watch out

- There is no `pane.next` command; `pane.go` is directional and doesn't wrap.
- A `<mod>.<command>` key only reaches a mod copy already shown in the layout,
  which is why this opens a popup instead.
- Close the overlay before focusing, or focus can return to the popup's
  opener.
- `pane.zoom` is a toggle: unzoom the old pane before zooming the new one.
- Focus on a layout terminal block (not a model pane) makes `focused().pane`
  null; the mod then starts from the first pane.

## Done when

- `herdr-app check mods/pane-next` and `mods/pane-prev` pass.
- In a tab with two panes, `cmd+]` twice returns focus to where it started.
- With the focused pane zoomed (`cmd+shift+enter`), `cmd+]` shows the other
  pane zoomed and focused; `cmd+[` brings back the first, still zoomed.
