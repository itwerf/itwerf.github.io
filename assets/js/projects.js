(function () {
  "use strict";
  Devfolio.bootShell({ active: "projects" })
    .then(function () {
      return Devfolio.loadJSON("content/projects.json");
    })
    .then(function (projects) {
      var tagSet = {};
      projects.forEach(function (p) {
        (p.tags || []).forEach(function (tag) {
          tagSet[tag] = true;
        });
      });
      var tags = ["All"].concat(Object.keys(tagSet).sort());
      var filters = document.querySelector("[data-filters]");
      var grid = document.querySelector("[data-projects]");
      var active = "All";

      function render() {
        var list =
          active === "All"
            ? projects
            : projects.filter(function (p) {
                return (p.tags || []).indexOf(active) !== -1;
              });
        grid.innerHTML = list.map(Devfolio.projectCard).join("");
        grid.classList.remove("is-visible");
        requestAnimationFrame(function () {
          grid.classList.add("is-visible");
        });
        filters.querySelectorAll(".filter-chip").forEach(function (btn) {
          btn.classList.toggle(
            "active",
            btn.getAttribute("data-tag") === active
          );
        });
      }

      filters.innerHTML = tags
        .map(function (tag) {
          return (
            '<button type="button" class="filter-chip" data-tag="' +
            tag +
            '">' +
            tag +
            "</button>"
          );
        })
        .join("");
      filters.addEventListener("click", function (event) {
        var btn = event.target.closest(".filter-chip");
        if (!btn) return;
        active = btn.getAttribute("data-tag");
        render();
      });
      render();
    })
    .catch(console.error);
})();
