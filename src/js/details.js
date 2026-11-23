import { DATA_ERROR, findLaptopById, loadLaptops } from "./api.js";
import {
  getCompare,
  isFavorite,
  toggleCompare,
  toggleFavorite
} from "./storage.js";
import {
  formatPrice,
  showMessage,
  startPage,
  updateFavoriteCount
} from "./ui.js";

startPage();

const details = document.getElementById("details");
const laptopId = new URLSearchParams(window.location.search).get("id");

async function init() {
  showDetailsSkeleton();

  try {
    const laptops = await loadLaptops();
    const laptop = findLaptopById(laptops, laptopId);

    if (laptop === undefined) {
      showMessage(
        details,
        "We could not find that laptop. Please return to the catalogue and pick one."
      );
      return;
    }

    showLaptop(laptop);
  } catch (error) {
    showMessage(details, DATA_ERROR);
  }
}

function showDetailsSkeleton() {
  details.innerHTML = `
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="panel animate-pulse" aria-hidden="true">
        <div class="h-64 w-full rounded-lg bg-page"></div>
      </div>
      <div class="panel animate-pulse" aria-hidden="true">
        <div class="h-3 w-28 rounded bg-page"></div>
        <div class="mt-3 h-8 w-3/4 rounded bg-page"></div>
        <div class="mt-3 h-8 w-32 rounded bg-page"></div>
        <div class="mt-4 h-20 rounded-lg bg-page"></div>
        <div class="mt-6 h-11 rounded-lg bg-page"></div>
      </div>
    </div>
  `;
}

function showLaptop(item) {
  const saved = isFavorite(item.id);
  const comparing = getCompare().includes(item.id);

  details.innerHTML = `
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="panel">
        <img src="${item.image}" alt="${item.name}" class="detail-image" />
      </div>

      <div class="panel">
        <p class="eyebrow">${item.brand} / ${item.category}</p>
        <h1 class="mt-2 text-3xl font-bold md:text-4xl">${item.name}</h1>
        <p class="mt-3 text-3xl font-bold text-brand">${formatPrice(item.price)}</p>
        <p class="mt-4 text-muted">${item.description}</p>

        <div class="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            id="favoriteButton"
            type="button"
            class="btn-action"
            aria-pressed="${saved}"
          >${saved ? "Remove favorite" : "Add to favorite"}</button>
          <button id="compareButton" type="button" class="btn-quiet">
            ${comparing ? "Remove from comparison" : "Add to comparison"}
          </button>
        </div>

        <p id="detailsMessage" class="mt-3 text-sm font-semibold"></p>
      </div>
    </div>

    <section class="mt-8">
      <h2 class="section-title">Full specifications</h2>
      <div class="mt-3 overflow-x-auto rounded-xl border border-line bg-panel">
        <table class="spec-table">
          <tbody>
            ${createSpecRows(item)}
          </tbody>
        </table>
      </div>
    </section>
  `;

  const favoriteButton = document.getElementById("favoriteButton");
  const compareButton = document.getElementById("compareButton");
  const message = document.getElementById("detailsMessage");

  favoriteButton.addEventListener("click", () => {
    const favorites = toggleFavorite(item.id);
    const nowSaved = favorites.includes(item.id);

    favoriteButton.textContent = nowSaved ? "Remove favorite" : "Add to favorite";
    favoriteButton.setAttribute("aria-pressed", nowSaved);
    updateFavoriteCount();
  });

  compareButton.addEventListener("click", () => {
    if (!isFavorite(item.id)) {
      toggleFavorite(item.id);
      favoriteButton.textContent = "Remove favorite";
      favoriteButton.setAttribute("aria-pressed", "true");
      updateFavoriteCount();
    }

    const result = toggleCompare(item.id);
    const inCompare = result.ids.includes(item.id);

    compareButton.textContent = inCompare
      ? "Remove from comparison"
      : "Add to comparison";

    if (result.message !== "") {
      message.textContent = result.message;
    } else if (inCompare) {
      message.textContent = "Added to the comparison list.";
    } else {
      message.textContent = "Removed from the comparison list.";
    }
  });
}

function createSpecRows(item) {
  const rows = [
    ["Name", item.name],
    ["Brand", item.brand],
    ["Price", formatPrice(item.price)],
    ["Category", item.category],
    ["CPU", item.cpu],
    ["RAM", item.ramGB + " GB"],
    ["Storage", item.storageGB + " GB"],
    ["Battery life", item.batteryHours + " hours"],
    ["Weight", item.weightKg + " kg"],
    ["Screen", item.screenInches + " inches"],
    ["Laptop ID", item.id]
  ];

  return rows
    .map(
      (row) => `
        <tr>
          <th scope="row">${row[0]}</th>
          <td>${row[1]}</td>
        </tr>
      `
    )
    .join("");
}

init();
