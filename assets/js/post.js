(function () {
  "use strict";
  Devfolio.bootShell({ active: "blog" }).then(function () {
    var slug = new URLSearchParams(location.search).get("slug");
    var root = document.querySelector("[data-post]");
    return Devfolio.loadText("content/posts/" + slug + ".md").then(
      function (raw) {
        var parsed = Devfolio.parseFrontmatter(raw);
        var data = parsed.data;
        document.title = (data.title || slug) + " · Devfolio";
        root.innerHTML =
          '<a class="text-link" href="blog.html">' +
          Devfolio.escapeHtml(Devfolio.t("backWriting")) +
          '</a><header class="article-header reveal is-visible"><time datetime="' +
          (data.date || "") +
          '">' +
          Devfolio.formatDate(data.date || "") +
          "</time><h1>" +
          Devfolio.escapeHtml(data.title || slug) +
          "</h1><p>" +
          Devfolio.escapeHtml(data.summary || "") +
          '</p></header><article class="article-body reveal is-visible">' +
          Devfolio.markdownToHtml(parsed.content) +
          "</article>";
      },
      function () {
        root.innerHTML =
          "<h1>" +
          Devfolio.escapeHtml(Devfolio.t("postMissing")) +
          '</h1><p><a class="text-link" href="blog.html">' +
          Devfolio.escapeHtml(Devfolio.t("backWriting")) +
          "</a></p>";
      }
    );
  });
})();
