# herdr-mods

My mods for the [Herdr](https://herdr.dev) app. One folder per mod; each has a
`RECIPE.md` (what it does and how it's built) and, where it needs keys, a
`keys.json` to merge into `~/.config/herdr-app/keys.json`.

| Mod | What it does |
|---|---|
| [pane-cycle](pane-cycle) | `cmd+]` / `cmd+[` cycle focus through the tab's panes, wrapping, carrying zoom along |

## Install

Ask your agent: "add the herdr mod at github.com/fpopa/herdr-mods/tree/main/<mod>".

By hand, e.g. pane-cycle:

```sh
git clone https://github.com/fpopa/herdr-mods
cp -R herdr-mods/pane-cycle/pane-next herdr-mods/pane-cycle/pane-prev ~/.config/herdr-app/mods/
herdr-app check ~/.config/herdr-app/mods/pane-next
herdr-app check ~/.config/herdr-app/mods/pane-prev
```

Then merge the mod's `keys.json` into `~/.config/herdr-app/keys.json`.
