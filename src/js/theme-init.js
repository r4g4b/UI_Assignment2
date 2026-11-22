// Restore the saved theme before the page is drawn.
(function () {
  var theme = localStorage.getItem("laptopFinderTheme");

  if (theme === "performance") {
    document.documentElement.setAttribute("data-theme", "performance");
  }
})();
