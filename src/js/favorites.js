import { loadLaptops } from "./api.js";
import { getFavorites, clearFavorites } from "./storage.js";
import {
  startPage,
  createCard,
  setupFavoriteButtons,
  showSkeleton,
  showMessage,
  formatPrice,
  updateFavoriteCount
} from "./ui.js";

startPage();

const summary = document.getElementById("favoritesSummary");
const list = document.getElementById("favoritesList");
const clearButton = document.getElementById("clearButton");

let allLaptops = [];

showSkeleton(list, 3);

async function start() {
  try {
    allLaptops = await loadLaptops();
    renderFavorites();
  } catch (error) {
    showMessage(list, error.message);
  }
}

function renderFavorites() {
  const favorites = getFavorites();
  const saved = allLaptops.filter((laptop) => favorites.includes(laptop.id));

  clearButton.classList.toggle("hidden", saved.length === 0);

  if (saved.length === 0) {
    summary.innerHTML = "";
    showMessage(list, "You have no favorites yet. Open the catalogue and add a few laptops.");
    return;
  }

  const total = saved.reduce((sum, laptop) => sum + laptop.price, 0);
  const average = Math.round(total / saved.length);

  summary.innerHTML = `
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="stat-card">
        <p class="text-sm text-muted">Saved laptops</p>
        <p class="text-2xl font-bold">${saved.length}</p>
      </div>
      <div class="stat-card">
        <p class="text-sm text-muted">Total price</p>
        <p class="text-2xl font-bold text-brand">${formatPrice(total)}</p>
      </div>
      <div class="stat-card">
        <p class="text-sm text-muted">Average price</p>
        <p class="text-2xl font-bold text-brand">${formatPrice(average)}</p>
      </div>
    </div>
  `;

  list.innerHTML = saved.map((laptop) => createCard(laptop)).join("");
  setupFavoriteButtons(list, renderFavorites);
}

clearButton.addEventListener("click", () => {
  clearFavorites();
  updateFavoriteCount();
  renderFavorites();
});

start();
