// Focus the next pane in the shown tab, wrapping around. Opened by a key
// (mod.open:pane-next); it does its one job and closes itself.

import { View, div } from "gpui-kit";
import { panes, focused, run, props, closeOverlay } from "herdr";

const STEP = 1;

export default class PaneCycle extends View {
  init(_props, cx) {
    cx.spawn(async () => {
      closeOverlay(props()?.overlay);
      const f = focused();
      const list = panes().filter((p) => p.tab === f?.tab);
      if (list.length < 2) return;
      const at = list.findIndex((p) => p.focused || p.pane === f.pane);
      const next = list[(at + STEP + list.length) % list.length];
      // Zoomed: carry the zoom over, or focus would land on a hidden pane.
      const zoomed = list.find((p) => p.zoomed);
      if (zoomed) run("pane.zoom", { pane: zoomed.pane });
      run("pane.focus", { pane: next.pane });
      if (zoomed) run("pane.zoom", { pane: next.pane });
    });
  }

  render() {
    return div();
  }
}
