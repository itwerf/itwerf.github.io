---
title: Shipping on GitHub Pages
date: 2025-09-03
summary: Upload static files, enable Pages from the branch, and you are live.
tags:
  - web
  - devops
---

GitHub Pages is static hosting. For a site made of HTML, CSS, and JS:

1. Put files in the repo root (or `/docs`).
2. Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
3. Add a `.nojekyll` file so GitHub does not fight your folders.

No build server required. Edit a file, push, refresh.
