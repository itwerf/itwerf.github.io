# Devfolio

**Generic starter** from [ITwerf](https://github.com/itwerf) - a motion-friendly portfolio for **GitHub Pages**.

- Plain HTML / CSS / JS (repo root)
- Dark / light theme
- English / Dutch UI
- Projects, blog, Who we are, Download + version history
- **No npm build** for deploy

Live demo (ITwerf org site): https://itwerf.github.io  
This repo (clean starter): https://github.com/itwerf/devfolio

> Pre-release. Expect changes.

## Make it yours (quick start)

1. **Clone or download** this repo (or a zip from the Download page on the demo site).
2. Edit **`config/site.json`**
   - `name`, `title`, `tagline`, `social.github`
3. Edit **`content/projects.json`**
   - Replace sample projects with yours (`slug`, `title`, `summary`, `description`, `tags`, `featured`, `links`, `accent`)
4. Edit **blog posts**
   - Add `content/posts/my-slug.md`
   - List it in `content/posts/index.json`
5. Push to GitHub
6. **Settings → Pages → Deploy from a branch → `main` → `/ (root)`**

Open `https://<you>.github.io` (or your project Pages URL).

## Local preview

```bash
python -m http.server 8080
```

Visit `http://localhost:8080` (needed because of `fetch` + ES-free scripts still using HTTP paths).

## Customise map

| Goal | File |
|------|------|
| Name, tagline, GitHub link | `config/site.json` |
| Projects | `content/projects.json` |
| Blog index | `content/posts/index.json` |
| Blog articles | `content/posts/*.md` |
| Download versions | `content/versions.json` + files in `releases/` |
| Turn downloads off | `config/site.json` → `"features": { "downloads": false }` |
| Contact email | `config/site.json` → `"email"` |
| UI translations | `i18n/en.json`, `i18n/nl.json` |
| Look & motion | `assets/css/site.css` |

Titles/summaries can be plain strings or `{ "en": "...", "nl": "..." }`.

Read the demo posts under **Writing** on a live site: theme, downloads, and adding work.

## Language & theme

Visitors use the header toggles (**EN/NL**, **Light/Dark**). Choice is stored in `localStorage`.

## Downloads feature

- **On (default):** `"features": { "downloads": true }` - Download appears in nav and lists zips from `content/versions.json`.
- **Off:** `"features": { "downloads": false }` - hides Download in nav/footer/home buttons.
- **Add a version:** drop a zip in `releases/`, add an entry to `versions.json`, set `latest`.
- **Remove a version:** delete that entry (and optionally the zip).

## Releases

Version history is driven by `content/versions.json`. Point each entry's `file` at a zip under `releases/`.

## Credits

Built by **ITwerf**.  
Assisted by Cursor - project realisation and bug correction.
