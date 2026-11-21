import { loadLaptops } from "./api.js";
import { getFavorites } from "./storage.js";
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

const stats = document.getElementById("stats");
const picks = document.getElementById("topPicks");

showSkeleton(picks, 3);

async function start() {
  try {
    const laptops = await loadLaptops();
    showStats(laptops);
    showPicks(laptops);
  } catch (error) {
    showMessage(picks, error.message);
    showMessage(stats, error.message);
  }
}

function showStats(laptops) {
  const lowestPrice = laptops.reduce((lowest, laptop) => {
    if (laptop.price < lowest) {
      return laptop.price;
    }
    return lowest;
  }, laptops[0].price);

  const brands = laptops.reduce((list, laptop) => {
    if (!list.includes(laptop.brand)) {
      list.push(laptop.brand);
    }
    return list;
  }, []);

  document.getElementById("statLaptops").textContent = laptops.length;
  document.getElementById("statPrice").textContent = formatPrice(lowestPrice);
  document.getElementById("statBrands").textContent = brands.length;
  document.getElementById("statFavorites").textContent = getFavorites().length;
}

function showPicks(laptops) {
  const bestBattery = laptops.slice().sort((a, b) => b.batteryHours - a.batteryHours);
  const topThree = bestBattery.slice(0, 3);

  picks.innerHTML = topThree.map((laptop) => createCard(laptop)).join("");

  setupFavoriteButtons(picks, () => {
    updateFavoriteCount();
    document.getElementById("statFavorites").textContent = getFavorites().length;
  });
}

start();
