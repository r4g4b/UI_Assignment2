import { DATA_ERROR, loadLaptops } from "./api.js";
import { clearFavorites, getFavorites } from "./storage.js";
import {
  createCard,
  formatPrice,
  setupFavoriteButtons,
  showMessage,
  showSkeletons,
  startPage,
  updateFavoriteCount
} from "./ui.js";

startPage();

const summary = document.getElementById("favoritesSummary");
const list = document.getElementById("favoritesList");
const clearButton = document.getElementById("clearButton");

let allLaptops = [];

async function init() {
  showSkeletons(list, 3);

  try {
    allLaptops = await loadLaptops();
    renderFavorites();
  } catch (error) {
    showMessage(list, DATA_ERROR);
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
        <p class="stat-label">Saved laptops</p>
        <p class="stat-value">${saved.length}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Total price</p>
        <p class="stat-value">${formatPrice(total)}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Average price</p>
        <p class="stat-value">${formatPrice(average)}</p>
      </div>
    </div>
  `;

  list.innerHTML = saved.map(createCard).join("");
  setupFavoriteButtons(list, renderFavorites);
}

clearButton.addEventListener("click", () => {
  clearFavorites();
  updateFavoriteCount();
  renderFavorites();
});

init();
