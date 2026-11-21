import { loadLaptops } from "./api.js";
import { startPage, createCard, setupFavoriteButtons, showSkeleton, showMessage } from "./ui.js";

startPage();

const grid = document.getElementById("laptopGrid");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const maxPriceFilter = document.getElementById("maxPriceFilter");
const maxPriceLabel = document.getElementById("maxPriceLabel");
const ramFilter = document.getElementById("ramFilter");
const sortFilter = document.getElementById("sortFilter");

let allLaptops = [];

showSkeleton(grid, 6);

async function start() {
  try {
    allLaptops = await loadLaptops();
    renderLaptops();
  } catch (error) {
    resultCount.textContent = "";
    showMessage(grid, error.message);
  }
}

function renderLaptops() {
  const text = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const maxPrice = Number(maxPriceFilter.value);
  const minRam = Number(ramFilter.value);

  let laptops = allLaptops.filter((laptop) => {
    const matchesText =
      laptop.name.toLowerCase().includes(text) || laptop.brand.toLowerCase().includes(text);
    const matchesCategory = category === "all" || laptop.category === category;
    const matchesPrice = laptop.price <= maxPrice;
    const matchesRam = laptop.ramGB >= minRam;

    return matchesText && matchesCategory && matchesPrice && matchesRam;
  });

  laptops = laptops.slice().sort((a, b) => {
    if (sortFilter.value === "price-asc") {
      return a.price - b.price;
    }
    if (sortFilter.value === "price-desc") {
      return b.price - a.price;
    }
    if (sortFilter.value === "battery-desc") {
      return b.batteryHours - a.batteryHours;
    }
    if (sortFilter.value === "battery-asc") {
      return a.batteryHours - b.batteryHours;
    }
    if (sortFilter.value === "weight-asc") {
      return a.weightKg - b.weightKg;
    }
    return b.weightKg - a.weightKg;
  });

  resultCount.textContent = laptops.length + " laptops found";

  if (laptops.length === 0) {
    showMessage(grid, "No laptop matches your filters. Try a different search or price.");
    return;
  }

  grid.innerHTML = laptops.map((laptop) => createCard(laptop)).join("");
  setupFavoriteButtons(grid);
}

searchInput.addEventListener("input", renderLaptops);
categoryFilter.addEventListener("change", renderLaptops);
ramFilter.addEventListener("change", renderLaptops);
sortFilter.addEventListener("change", renderLaptops);

maxPriceFilter.addEventListener("input", () => {
  maxPriceLabel.textContent = "$" + maxPriceFilter.value;
  renderLaptops();
});

start();
