(function () {
  "use strict";

  function renderAbout(doc, siteName) {
    var lang = Devfolio.getLang();
    var data = doc[lang] || doc.en;
    if (!data) return;

    var root = document.querySelector("[data-about]");
    if (!root) return;

    var html = "";
    html += '<div class="page-intro reveal is-visible">';
    html += "<h1>" + Devfolio.escapeHtml(data.title || "") + "</h1>";
    html += "<p>" + Devfolio.escapeHtml(data.lead || "") + "</p>";
    html += "</div>";

    html += '<div class="about-prose">';
    (data.intro || []).forEach(function (p) {
      html += '<p class="reveal is-visible">' + Devfolio.escapeHtml(p) + "</p>";
    });

    (data.sections || []).forEach(function (section) {
      html += '<section class="about-wing reveal is-visible">';
      html += "<h2>" + Devfolio.escapeHtml(section.title || "") + "</h2>";
      (section.paragraphs || []).forEach(function (p) {
        html += "<p>" + Devfolio.escapeHtml(p) + "</p>";
      });
      html += "</section>";
    });

    if (data.closingTitle || (data.closing && data.closing.length)) {
      html += '<section class="about-wing reveal is-visible">';
      if (data.closingTitle) {
        html += "<h2>" + Devfolio.escapeHtml(data.closingTitle) + "</h2>";
      }
      (data.closing || []).forEach(function (p) {
        html += "<p>" + Devfolio.escapeHtml(p) + "</p>";
      });
      html += "</section>";
    }

    html += '<div class="hero-actions reveal is-visible">';
    html +=
      '<a class="btn btn-primary" href="download.html">' +
      Devfolio.escapeHtml(Devfolio.t("aboutCtaDownload")) +
      "</a>";
    html +=
      '<a class="btn btn-ghost" href="projects.html">' +
      Devfolio.escapeHtml(Devfolio.t("aboutCtaProjects")) +
      "</a>";
    html += "</div></div>";

    root.innerHTML = html;
    if (data.title) {
      document.title = data.title + " · " + (siteName || "ITwerf");
    }
  }

  Devfolio.bootShell({ active: "about" })
    .then(function (site) {
      return Devfolio.loadJSON("content/about.json").then(function (doc) {
        renderAbout(doc, site && site.name);
      });
    })
    .catch(console.error);
})();
