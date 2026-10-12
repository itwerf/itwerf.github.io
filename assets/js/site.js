/* Devfolio core — plain script, no build, no modules */
(function (global) {
  "use strict";

  var THEME_KEY = "devfolio-theme";
  var LANG_KEY = "devfolio-lang";
  var cache = { site: null, strings: null, lang: "en" };

  function loadJSON(path) {
    return fetch(path).then(function (res) {
      if (!res.ok) throw new Error("Failed to load " + path);
      return res.json();
    });
  }

  function loadText(path) {
    return fetch(path).then(function (res) {
      if (!res.ok) throw new Error("Failed to load " + path);
      return res.text();
    });
  }

  function getTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }

  function setTheme(mode) {
    var next = mode === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {}
    refreshThemeButton();
  }

  function refreshThemeButton() {
    var t = cache.strings || {};
    var dark = getTheme() === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.textContent = dark
        ? t.themeToLight || "Light"
        : t.themeToDark || "Dark";
      btn.setAttribute(
        "aria-label",
        dark
          ? t.themeToLightAria || "Switch to light mode"
          : t.themeToDarkAria || "Switch to dark mode"
      );
    });
  }

  function getLang() {
    return cache.lang || "en";
  }

  function setLang(lang, options) {
    options = options || {};
    var next = lang === "nl" ? "nl" : "en";
    cache.lang = next;
    document.documentElement.setAttribute("lang", next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch (e) {}
    return loadJSON("i18n/" + next + ".json").then(function (strings) {
      cache.strings = strings;
      applyI18n();
      refreshThemeButton();
      refreshLangButton();
      if (options.reload) location.reload();
      return strings;
    });
  }

  function refreshLangButton() {
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.textContent = getLang() === "en" ? "NL" : "EN";
      btn.setAttribute(
        "aria-label",
        (cache.strings && cache.strings.langToggleAria) || "Switch language"
      );
    });
  }

  function t(key) {
    return (cache.strings && cache.strings[key]) || key;
  }

  function applyI18n() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key && cache.strings && cache.strings[key] != null) {
        el.textContent = cache.strings[key];
      }
    });
  }

  function applyTheme(theme) {
    if (!theme || getTheme() === "dark") return;
    var root = document.documentElement;
    if (theme.accent) root.style.setProperty("--accent", theme.accent);
    if (theme.accentSoft) root.style.setProperty("--accent-soft", theme.accentSoft);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDate(value) {
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return value || "";
    return date.toLocaleDateString(getLang() === "nl" ? "nl-NL" : undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function localized(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    return value[getLang()] || value.en || value.nl || "";
  }

  function localizedList(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    var picked = value[getLang()] || value.en || value.nl || [];
    return Array.isArray(picked) ? picked : [];
  }

  function parseFrontmatter(raw) {
    var match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { data: {}, content: raw.trim() };
    var data = {};
    var listKey = null;
    match[1].split(/\r?\n/).forEach(function (line) {
      if (/^\s*-\s+/.test(line) && listKey) {
        data[listKey] = data[listKey] || [];
        data[listKey].push(line.replace(/^\s*-\s+/, "").trim());
        return;
      }
      listKey = null;
      var kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (!kv) return;
      var key = kv[1];
      var value = kv[2];
      if (value === "") {
        listKey = key;
        data[key] = [];
      } else {
        data[key] = value.replace(/^["']|["']$/g, "");
      }
    });
    return { data: data, content: match[2].trim() };
  }

  function inline(text) {
    return escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.+?)`/g, "<code>$1</code>");
  }

  function markdownToHtml(md) {
    return md
      .split(/\n\n+/)
      .map(function (block) {
        var trimmed = block.trim();
        if (!trimmed) return "";
        if (trimmed.indexOf("- ") === 0) {
          return (
            "<ul>" +
            trimmed
              .split("\n")
              .map(function (line) {
                return "<li>" + inline(line.replace(/^- /, "")) + "</li>";
              })
              .join("") +
            "</ul>"
          );
        }
        if (/^\d+\.\s/.test(trimmed)) {
          return (
            "<ol>" +
            trimmed
              .split("\n")
              .map(function (line) {
                return "<li>" + inline(line.replace(/^\d+\.\s/, "")) + "</li>";
              })
              .join("") +
            "</ol>"
          );
        }
        return "<p>" + inline(trimmed).replace(/\n/g, "<br>") + "</p>";
      })
      .join("\n");
  }

  function projectCard(project) {
    var tags = (project.tags || [])
      .map(function (tag) {
        return "<li>" + escapeHtml(tag) + "</li>";
      })
      .join("");
    return (
      '<a class="project-card" href="project.html?slug=' +
      encodeURIComponent(project.slug) +
      '" style="--card-accent:' +
      (project.accent || "var(--accent)") +
      '"><div class="project-card-band" aria-hidden="true"></div><div class="project-card-body"><div class="project-card-meta"><span>' +
      (project.year || "") +
      "</span>" +
      (project.featured ? '<span class="pill">Featured</span>' : "") +
      "</div><h3>" +
      escapeHtml(localized(project.title)) +
      "</h3><p>" +
      escapeHtml(localized(project.summary)) +
      '</p><ul class="tag-row">' +
      tags +
      "</ul></div></a>"
    );
  }

  function wireReveals() {
    var nodes = document.querySelectorAll(".reveal, .stagger");
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(function (n) {
        n.classList.add("is-visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  function wireHeroSpotlight() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    hero.addEventListener("pointermove", function (event) {
      var rect = hero.getBoundingClientRect();
      hero.style.setProperty(
        "--spot-x",
        ((event.clientX - rect.left) / rect.width) * 100 + "%"
      );
      hero.style.setProperty(
        "--spot-y",
        ((event.clientY - rect.top) / rect.height) * 100 + "%"
      );
    });
  }

  function downloadsEnabled(site) {
    if (!site || !site.features) return true;
    return site.features.downloads !== false;
  }

  function renderHeader(active) {
    var mount = document.querySelector("[data-chrome-header]");
    if (!mount) return;
    var site = cache.site;
    var showDownloads = downloadsEnabled(site);
    mount.innerHTML =
      '<nav class="site-nav" aria-label="Primary">' +
      '<a class="nav-link' +
      (active === "projects" ? " active" : "") +
      '" data-nav="projects" href="projects.html">' +
      escapeHtml(t("navWork")) +
      "</a>" +
      '<a class="nav-link' +
      (active === "blog" ? " active" : "") +
      '" data-nav="blog" href="blog.html">' +
      escapeHtml(t("navWriting")) +
      "</a>" +
      '<a class="nav-link' +
      (active === "about" ? " active" : "") +
      '" data-nav="about" href="about.html">' +
      escapeHtml(t("navAbout")) +
      "</a>" +
      (showDownloads
        ? '<a class="nav-link' +
          (active === "download" ? " active" : "") +
          '" data-nav="download" href="download.html">' +
          escapeHtml(t("navDownload")) +
          "</a>"
        : "") +
      '<a class="nav-link' +
      (active === "contact" ? " active" : "") +
      '" data-nav="contact" href="contact.html">' +
      escapeHtml(t("navContact")) +
      "</a></nav>" +
      '<button type="button" class="theme-toggle" data-lang-toggle>NL</button>' +
      '<button type="button" class="theme-toggle" data-theme-toggle>Light</button>';
  }

  function wireChromeToggles() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.onclick = function () {
        setTheme(getTheme() === "dark" ? "light" : "dark");
      };
    });
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.onclick = function () {
        setLang(getLang() === "en" ? "nl" : "en", { reload: true });
      };
    });
    refreshThemeButton();
    refreshLangButton();
  }

  function bootShell(options) {
    options = options || {};
    var savedLang = "en";
    try {
      savedLang = localStorage.getItem(LANG_KEY) === "nl" ? "nl" : "en";
    } catch (e) {}
    cache.lang = savedLang;
    document.documentElement.setAttribute("lang", savedLang);

    return Promise.all([
      loadJSON("config/site.json"),
      loadJSON("i18n/" + savedLang + ".json"),
    ]).then(function (results) {
      var site = results[0];
      cache.site = site;
      cache.strings = results[1];
      applyTheme(site.theme);
      renderHeader(options.active || "");

      var banner = document.querySelector("[data-banner]");
      if (banner) {
        banner.textContent = localized(site.banner) || site.banner || "";
      }

      document.querySelectorAll("[data-site-name]").forEach(function (el) {
        el.textContent = site.name || "Devfolio";
      });
      document.querySelectorAll("[data-site-title]").forEach(function (el) {
        el.textContent = localized(site.title) || site.title || "";
      });
      document.querySelectorAll("[data-site-tagline]").forEach(function (el) {
        el.textContent = localized(site.tagline) || site.tagline || "";
      });
      document.querySelectorAll("[data-site-location]").forEach(function (el) {
        el.textContent = localized(site.location) || site.location || "";
      });

      var showDownloads = downloadsEnabled(site);
      document.querySelectorAll("[data-release]").forEach(function (el) {
        if (showDownloads && site.release) {
          el.href = site.release.href;
          el.textContent = localized(site.release.label) || site.release.label;
          el.hidden = false;
        } else {
          el.hidden = true;
        }
      });

      document.querySelectorAll("[data-feature-downloads]").forEach(function (el) {
        el.hidden = !showDownloads;
      });

      document.querySelectorAll("[data-github]").forEach(function (el) {
        if (site.social && site.social.github) {
          el.href = site.social.github;
        }
      });

      document.querySelectorAll("[data-email]").forEach(function (el) {
        if (site.email) {
          el.href = "mailto:" + site.email;
          if (el.hasAttribute("data-email-label")) {
            el.textContent = site.email;
          }
        }
      });

      var year = document.querySelector("[data-year]");
      if (year) year.textContent = String(new Date().getFullYear());

      applyI18n();
      wireChromeToggles();
      wireReveals();
      wireHeroSpotlight();

      document.title =
        (site.name || "Devfolio") +
        " · " +
        (localized(site.title) || site.title || "Portfolio");
      return site;
    });
  }

  global.Devfolio = {
    loadJSON: loadJSON,
    loadText: loadText,
    bootShell: bootShell,
    projectCard: projectCard,
    escapeHtml: escapeHtml,
    formatDate: formatDate,
    parseFrontmatter: parseFrontmatter,
    markdownToHtml: markdownToHtml,
    setTheme: setTheme,
    setLang: setLang,
    getLang: getLang,
    t: t,
    localized: localized,
    localizedList: localizedList,
    downloadsEnabled: downloadsEnabled,
  };
})(window);
