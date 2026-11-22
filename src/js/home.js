startPage();

const laptops = loadLaptops();
const picks = document.getElementById("topPicks");

showStats(laptops);
showPicks(laptops);

function showStats(list) {
  let lowestPrice = list[0].price;
  let brands = [];

  list.forEach(function (laptop) {
    if (laptop.price < lowestPrice) {
      lowestPrice = laptop.price;
    }

    if (!brands.includes(laptop.brand)) {
      brands.push(laptop.brand);
    }
  });

  document.getElementById("statLaptops").textContent = list.length;
  document.getElementById("statPrice").textContent = formatPrice(lowestPrice);
  document.getElementById("statBrands").textContent = brands.length;
  document.getElementById("statFavorites").textContent = getFavorites().length;
}

function showPicks(list) {
  const sorted = list.slice().sort(function (a, b) {
    return b.batteryHours - a.batteryHours;
  });

  const topThree = sorted.slice(0, 3);

  picks.innerHTML = topThree.map(createCard).join("");

  setupFavoriteButtons(picks, function () {
    document.getElementById("statFavorites").textContent = getFavorites().length;
  });
}
