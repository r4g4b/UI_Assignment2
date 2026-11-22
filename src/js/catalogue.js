startPage();

const grid = document.getElementById("laptopGrid");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const maxPriceFilter = document.getElementById("maxPriceFilter");
const maxPriceLabel = document.getElementById("maxPriceLabel");
const ramFilter = document.getElementById("ramFilter");
const sortFilter = document.getElementById("sortFilter");

const allLaptops = loadLaptops();

renderLaptops();

function renderLaptops() {
  const text = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const maxPrice = Number(maxPriceFilter.value);
  const minRam = Number(ramFilter.value);

  let laptops = allLaptops.filter(function (laptop) {
    const matchesText =
      laptop.name.toLowerCase().includes(text) || laptop.brand.toLowerCase().includes(text);

    return (
      matchesText &&
      (category === "all" || laptop.category === category) &&
      laptop.price <= maxPrice &&
      laptop.ramGB >= minRam
    );
  });

  laptops = sortLaptops(laptops);
  resultCount.textContent = laptops.length + " laptops found";

  if (laptops.length === 0) {
    showMessage(grid, "No laptop matches your filters. Try a different search or price.");
    return;
  }

  grid.innerHTML = laptops.map(createCard).join("");
  setupFavoriteButtons(grid);
}

function sortLaptops(list) {
  return list.slice().sort(function (a, b) {
    const sort = sortFilter.value;

    if (sort === "price-asc") {
      return a.price - b.price;
    }

    if (sort === "price-desc") {
      return b.price - a.price;
    }

    if (sort === "battery-desc") {
      return b.batteryHours - a.batteryHours;
    }

    if (sort === "battery-asc") {
      return a.batteryHours - b.batteryHours;
    }

    if (sort === "weight-asc") {
      return a.weightKg - b.weightKg;
    }

    return b.weightKg - a.weightKg;
  });
}

searchInput.addEventListener("input", renderLaptops);
categoryFilter.addEventListener("change", renderLaptops);
ramFilter.addEventListener("change", renderLaptops);
sortFilter.addEventListener("change", renderLaptops);

maxPriceFilter.addEventListener("input", function () {
  maxPriceLabel.textContent = "$" + maxPriceFilter.value;
  renderLaptops();
});
