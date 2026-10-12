---
title: Customise the Devfolio theme
date: 2026-10-12
summary: Change colours, dark/light defaults, and fonts without rebuilding anything.
tags:
  - docs
  - theme
---

Devfolio is plain files. Theming is mostly **config** plus a little **CSS**.

## Quick brand colours

Open `config/site.json` and edit:

```json
"theme": {
  "accent": "#0D7377",
  "accentSoft": "#14919B"
}
```

In **light** mode those accents are applied in the browser. **Dark** mode keeps its own paper/ink surfaces so the page stays readable, while accent-coloured UI still follows your brand in CSS.

## Deeper look

Edit `assets/css/site.css`:

- `:root { ... }` - light theme tokens
- `html[data-theme="dark"] { ... }` - dark theme tokens

Useful variables: `--accent`, `--ink`, `--paper`, `--surface`, `--font-display`, `--font-body`.

## Default theme for visitors

The site defaults to **dark**. Visitors toggle with the header button; the choice is stored in `localStorage` under `devfolio-theme`.

To force light on first visit, change the small script in each HTML `<head>` so it sets `data-theme` to `light` when nothing is stored yet.

## Name and copy

Still in `config/site.json`: `name`, `title`, `tagline`, `banner`, `email`, `social.github`.  
Titles can be a string or `{ "en": "...", "nl": "..." }` for bilingual sites.
