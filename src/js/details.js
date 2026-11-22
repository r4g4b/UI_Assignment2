import { loadLaptops, findLaptopById } from "./api.js";
import { isFavorite, toggleFavorite, toggleCompare } from "./storage.js";
import { startPage, showSkeleton, showMessage, formatPrice, updateFavoriteCount } from "./ui.js";

startPage();

const params = new URLSearchParams(window.location.search);
const laptopId = params.get("id");
const details = document.getElementById("details");

showSkeleton(details, 1);

async function start() {
  try {
    const laptops = await loadLaptops();
    const laptop = findLaptopById(laptops, laptopId);

    if (laptop === undefined) {
      showMessage(details, "We could not find that laptop. Please return to the catalogue and pick one.");
      return;
    }

    showLaptop(laptop);
  } catch (error) {
    showMessage(details, error.message);
  }
}

function showLaptop(laptop) {
  const saved = isFavorite(laptop.id);

  details.innerHTML = `
    <div class="grid gap-6 md:grid-cols-2">
      <img src="${laptop.image}" alt="${laptop.name}" class="h-64 w-full rounded-xl object-cover md:h-full" />
      <div>
        <p class="text-sm font-bold uppercase tracking-wide text-muted">${laptop.brand}</p>
        <h1 class="mt-1 text-3xl font-bold">${laptop.name}</h1>
        <p class="mt-3 text-3xl font-bold text-brand">${formatPrice(laptop.price)}</p>
        <p class="mt-4 text-muted">${laptop.description}</p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <button id="favoriteButton" type="button" class="btn-action" aria-pressed="${saved}">
            ${saved ? "Remove favorite" : "Add to favorite"}
          </button>
          <button id="compareButton" type="button" class="btn-quiet">Add to comparison</button>
        </div>
        <p id="detailsMessage" class="mt-3 text-sm font-semibold text-brand"></p>
      </div>
    </div>

    <section class="mt-8">
      <h2 class="text-xl font-bold">Full specifications</h2>
      <div class="mt-3 overflow-x-auto rounded-xl border border-line">
        <table class="w-full text-left text-sm">
          <tbody class="divide-y divide-line">
            ${createSpecRows(laptop)}
          </tbody>
        </table>
      </div>
    </section>
  `;

  const favoriteButton = document.getElementById("favoriteButton");
  const compareButton = document.getElementById("compareButton");
  const message = document.getElementById("detailsMessage");

  favoriteButton.addEventListener("click", () => {
    const favorites = toggleFavorite(laptop.id);
    const nowSaved = favorites.includes(laptop.id);

    favoriteButton.textContent = nowSaved ? "Remove favorite" : "Add to favorite";
    favoriteButton.setAttribute("aria-pressed", nowSaved);
    updateFavoriteCount();
  });

  compareButton.addEventListener("click", () => {
    if (!isFavorite(laptop.id)) {
      toggleFavorite(laptop.id);
      favoriteButton.textContent = "Remove favorite";
      favoriteButton.setAttribute("aria-pressed", "true");
      updateFavoriteCount();
    }

    const result = toggleCompare(laptop.id);

    if (result.message !== "") {
      message.textContent = result.message;
    } else if (result.ids.includes(laptop.id)) {
      message.textContent = "Added to the comparison list.";
    } else {
      message.textContent = "Removed from the comparison list.";
    }
  });
}

function createSpecRows(laptop) {
  const rows = [
    ["Name", laptop.name],
    ["Brand", laptop.brand],
    ["Price", formatPrice(laptop.price)],
    ["Category", laptop.category],
    ["CPU", laptop.cpu],
    ["RAM", laptop.ramGB + " GB"],
    ["Storage", laptop.storageGB + " GB"],
    ["Battery life", laptop.batteryHours + " hours"],
    ["Weight", laptop.weightKg + " kg"],
    ["Screen", laptop.screenInches + " inches"],
    ["Laptop ID", laptop.id]
  ];

  return rows
    .map((row) => {
      return `
        <tr class="bg-panel">
          <th class="w-40 px-4 py-2 text-left font-semibold text-muted">${row[0]}</th>
          <td class="px-4 py-2">${row[1]}</td>
        </tr>
      `;
    })
    .join("");
}

start();
