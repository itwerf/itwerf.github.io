(function () {
  "use strict";
  Devfolio.bootShell({ active: "projects" })
    .then(function () {
      return Devfolio.loadJSON("content/projects.json");
    })
    .then(function (projects) {
      var slug = new URLSearchParams(location.search).get("slug");
      var project = projects.find(function (p) {
        return p.slug === slug;
      });
      var root = document.querySelector("[data-project]");
      if (!project) {
        root.innerHTML =
          "<h1>" +
          Devfolio.escapeHtml(Devfolio.t("projectMissing")) +
          '</h1><p><a class="text-link" href="projects.html">' +
          Devfolio.escapeHtml(Devfolio.t("backProjects")) +
          "</a></p>";
        return;
      }
      var title = Devfolio.localized(project.title);
      document.title = title + " · Devfolio";
      var actions = "";
      if (project.links && project.links.demo) {
        actions +=
          '<a class="btn btn-primary" href="' +
          project.links.demo +
          '" target="_blank" rel="noreferrer">' +
          Devfolio.escapeHtml(Devfolio.t("liveDemo")) +
          "</a>";
      }
      if (project.links && project.links.repo) {
        actions +=
          '<a class="btn btn-ghost" href="' +
          project.links.repo +
          '" target="_blank" rel="noreferrer">' +
          Devfolio.escapeHtml(Devfolio.t("repository")) +
          "</a>";
      }
      root.innerHTML =
        '<a class="text-link" href="projects.html">' +
        Devfolio.escapeHtml(Devfolio.t("backProjects")) +
        "</a>" +
        '<div class="detail-hero reveal is-visible" style="--card-accent:' +
        (project.accent || "var(--accent)") +
        '"><div class="detail-band" aria-hidden="true"></div><p class="hero-kicker">' +
        (project.year || "") +
        " · " +
        (project.tags || []).join(" · ") +
        "</p><h1>" +
        Devfolio.escapeHtml(title) +
        "</h1><p>" +
        Devfolio.escapeHtml(Devfolio.localized(project.summary)) +
        '</p></div><div class="detail-body reveal is-visible"><p>' +
        Devfolio.escapeHtml(Devfolio.localized(project.description)) +
        '</p><div class="hero-actions">' +
        actions +
        "</div></div>";
    })
    .catch(console.error);
})();
