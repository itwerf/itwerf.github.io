(function () {
  "use strict";

  function renderVersions(data) {
    var lang = Devfolio.getLang();
    var latestBox = document.querySelector("[data-latest]");
    var history = document.querySelector("[data-history]");
    var latest = data.releases.find(function (r) {
      return r.version === data.latest;
    }) || data.releases[0];

    if (latest && latestBox) {
      latestBox.innerHTML =
        '<div class="version-card version-card-latest reveal is-visible">' +
        '<div class="version-meta"><span class="pill">' +
        Devfolio.escapeHtml(latest.channel) +
        "</span><time datetime=\"" +
        latest.date +
        '">' +
        Devfolio.formatDate(latest.date) +
        "</time></div><h2>" +
        Devfolio.escapeHtml(latest.version) +
        " — " +
        Devfolio.escapeHtml(Devfolio.localized(latest.title)) +
        "</h2><ul class=\"version-notes\">" +
        Devfolio.localizedList(latest.notes)
          .map(function (n) {
            return "<li>" + Devfolio.escapeHtml(n) + "</li>";
          })
          .join("") +
        '</ul><div class="hero-actions"><a class="btn btn-primary" href="' +
        latest.file +
        '">' +
        Devfolio.escapeHtml(Devfolio.t("downloadGet")) +
        '</a><a class="btn btn-ghost" href="' +
        (data.sourceRepo || "#") +
        '" target="_blank" rel="noreferrer">' +
        Devfolio.escapeHtml(Devfolio.t("downloadSource")) +
        "</a></div></div>";
    }

    if (history) {
      history.innerHTML = data.releases
        .map(function (release) {
          var notes = Devfolio.localizedList(release.notes);
          return (
            '<article class="version-card reveal is-visible">' +
            '<div class="version-meta"><span class="pill">' +
            Devfolio.escapeHtml(release.channel) +
            '</span><time datetime="' +
            release.date +
            '">' +
            Devfolio.formatDate(release.date) +
            "</time></div><h3>" +
            Devfolio.escapeHtml(release.version) +
            " — " +
            Devfolio.escapeHtml(Devfolio.localized(release.title)) +
            "</h3><ul class=\"version-notes\">" +
            notes
              .map(function (n) {
                return "<li>" + Devfolio.escapeHtml(n) + "</li>";
              })
              .join("") +
            '</ul><a class="btn btn-ghost" href="' +
            release.file +
            '">' +
            Devfolio.escapeHtml(Devfolio.t("downloadGet")) +
            "</a></article>"
          );
        })
        .join("");
    }
  }

  Devfolio.bootShell({ active: "download" })
    .then(function (site) {
      if (!Devfolio.downloadsEnabled(site)) {
        var latestBox = document.querySelector("[data-latest]");
        var history = document.querySelector("[data-history]");
        if (latestBox) {
          latestBox.innerHTML =
            '<div class="version-card"><p>' +
            Devfolio.escapeHtml(Devfolio.t("downloadsDisabled")) +
            "</p></div>";
        }
        if (history) history.innerHTML = "";
        return null;
      }
      return Devfolio.loadJSON("content/versions.json");
    })
    .then(function (data) {
      if (data) renderVersions(data);
    })
    .catch(console.error);
})();
