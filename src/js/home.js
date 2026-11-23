import { DATA_ERROR, loadLaptops } from "./api.js";
import { getFavorites } from "./storage.js";
import {
  createCard,
  formatPrice,
  setupFavoriteButtons,
  showMessage,
  showSkeletons,
  startPage
} from "./ui.js";

startPage();

const picks = document.getElementById("topPicks");

async function init() {
  showSkeletons(picks, 3);

  try {
    const laptops = await loadLaptops();
    showStats(laptops);
    showPicks(laptops);
  } catch (error) {
    showMessage(picks, DATA_ERROR);
  }
}

function showStats(list) {
  const prices = list.map((laptop) => laptop.price);
  const lowestPrice = prices.reduce((lowest, price) => Math.min(lowest, price), prices[0]);
  const brands = list.reduce(
    (names, laptop) => (names.includes(laptop.brand) ? names : names.concat(laptop.brand)),
    []
  );

  document.getElementById("statLaptops").textContent = list.length;
  document.getElementById("statPrice").textContent = formatPrice(lowestPrice);
  document.getElementById("statBrands").textContent = brands.length;
  document.getElementById("statFavorites").textContent = getFavorites().length;
}

function showPicks(list) {
  const topThree = list
    .slice()
    .sort((a, b) => b.batteryHours - a.batteryHours)
    .slice(0, 3);

  const detailsLink = document.getElementById("detailsLink");

  if (detailsLink !== null && topThree.length > 0) {
    detailsLink.href = `details.html?id=${topThree[0].id}`;
  }

  picks.innerHTML = topThree.map(createCard).join("");

  setupFavoriteButtons(picks, () => {
    document.getElementById("statFavorites").textContent = getFavorites().length;
  });
}

init();
