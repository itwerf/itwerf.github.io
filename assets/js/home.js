(function () {
  "use strict";
  Devfolio.bootShell({ active: "home" })
    .then(function () {
      return Devfolio.loadJSON("content/projects.json");
    })
    .then(function (projects) {
      var featured = projects
        .filter(function (p) {
          return p.featured;
        })
        .slice(0, 3);
      var grid = document.querySelector("[data-featured]");
      if (!grid) return;
      grid.innerHTML = featured.map(Devfolio.projectCard).join("");
      grid.classList.add("is-visible");
    })
    .catch(console.error);
})();
