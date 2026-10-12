---
title: Manage Devfolio downloads
date: 2026-10-12
summary: Turn the Download page on or off, add a new zip, or retire an old version.
tags:
  - docs
  - releases
---

The Download page is optional. You can hide it, or keep it and only show the builds you want.

## Turn downloads off entirely

In `config/site.json`:

```json
"features": {
  "downloads": false
}
```

That hides Download from the **nav**, **footer**, and home **CTAs**. People who open `download.html` directly see a short “disabled” message.

Set `"downloads": true` (or remove the flag) to show it again.

## Add a new version

1. Put a zip in `releases/`, for example `releases/devfolio-0.2.0-prerelease.zip`.
2. Edit `content/versions.json`:
   - Set `"latest"` to the new version string.
   - Prepend a new object in `"releases"` with `version`, `date`, `channel`, `title`, `notes`, and `file`.
3. Optionally keep `releases/devfolio-starter.zip` as a copy of the latest build (the pack script does this).

`title` and `notes` can be bilingual objects with `en` / `nl` keys.

## Remove one version

- Delete that object from the `releases` array in `content/versions.json`.
- Delete the matching zip under `releases/` if you no longer want it hosted.
- If it was `"latest"`, point `"latest"` at another remaining version.

## Remove all downloads content

Besides `features.downloads: false`, you can clear the `releases` array and delete the zip files. The page will simply have nothing to list when downloads stay enabled.
