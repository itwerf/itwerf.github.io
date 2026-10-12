---
title: Add your work and posts
date: 2026-10-12
summary: How to list projects and publish a blog post on a Devfolio site.
tags:
  - docs
  - content
---

## Add a project

Edit `content/projects.json` and append an object:

```json
{
  "slug": "my-app",
  "title": "My App",
  "summary": "One-line pitch.",
  "description": "Longer story for the project page.",
  "tags": ["JavaScript"],
  "featured": true,
  "year": 2026,
  "links": {
    "demo": "https://example.com",
    "repo": "https://github.com/you/my-app"
  },
  "accent": "#0D7377"
}
```

`featured: true` shows the card on the home page. `slug` is used in `project.html?slug=...`.

Bilingual sites can use `{ "en": "...", "nl": "..." }` for `title`, `summary`, and `description`.

## Add a blog post

1. Create `content/posts/my-slug.md` with YAML frontmatter (`title`, `date`, `summary`, `tags`) and Markdown body.
2. Add a matching entry to `content/posts/index.json` (same `slug`).

Push to GitHub Pages and refresh **Writing**.

## Contact email

Set `"email": "you@example.com"` in `config/site.json`. The Contact page and mailto buttons pick it up automatically.
