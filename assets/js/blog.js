(function () {
  "use strict";
  Devfolio.bootShell({ active: "blog" })
    .then(function () {
      return Devfolio.loadJSON("content/posts/index.json");
    })
    .then(function (posts) {
      posts = posts.slice().sort(function (a, b) {
        return b.date.localeCompare(a.date);
      });
      var list = document.querySelector("[data-posts]");
      list.innerHTML = posts
        .map(function (post) {
          var tags = (post.tags || [])
            .map(function (tag) {
              return "<li>" + Devfolio.escapeHtml(tag) + "</li>";
            })
            .join("");
          return (
            '<a class="post-card" href="post.html?slug=' +
            encodeURIComponent(post.slug) +
            '"><time datetime="' +
            post.date +
            '">' +
            Devfolio.formatDate(post.date) +
            "</time><h2>" +
            Devfolio.escapeHtml(Devfolio.localized(post.title)) +
            "</h2><p>" +
            Devfolio.escapeHtml(Devfolio.localized(post.summary)) +
            '</p><ul class="tag-row">' +
            tags +
            "</ul></a>"
          );
        })
        .join("");
      list.classList.add("is-visible");
    })
    .catch(console.error);
})();
