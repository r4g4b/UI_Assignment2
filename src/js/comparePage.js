import { DATA_ERROR, loadLaptops } from "./api.js";
import { compareRows, getBestValue } from "./compare.js";
import { getCompare, getFavorites, toggleCompare } from "./storage.js";
import { formatPrice, showMessage, startPage } from "./ui.js";

startPage();

const picker = document.getElementById("comparePicker");
const message = document.getElementById("compareMessage");
const tableBox = document.getElementById("compareTable");

let allLaptops = [];

async function init() {
  showCompareSkeleton();

  try {
    allLaptops = await loadLaptops();
    renderPage();
  } catch (error) {
    showMessage(tableBox, DATA_ERROR);
  }
}

function showCompareSkeleton() {
  tableBox.innerHTML = `
    <div class="panel animate-pulse" aria-hidden="true">
      <div class="h-8 w-1/3 rounded bg-page"></div>
      <div class="mt-4 h-10 rounded bg-page"></div>
      <div class="mt-2 h-10 rounded bg-page"></div>
      <div class="mt-2 h-10 rounded bg-page"></div>
    </div>
  `;
}

function renderPage() {
  const favorites = getFavorites();
  const saved = allLaptops.filter((laptop) => favorites.includes(laptop.id));
  const compareIds = getCompare().filter((id) => favorites.includes(id));

  if (saved.length === 0) {
    picker.innerHTML = "";
    showMessage(tableBox, "You have no favorites yet. Add laptops first, then compare them here.");
    return;
  }

  picker.innerHTML = `
    <h2 class="section-title">Choose 2 to 4 laptops</h2>
    <p class="section-text">Only your favorites can be compared.</p>

    <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      ${saved.map((laptop) => createCheckbox(laptop, compareIds)).join("")}
    </div>
  `;

  picker.querySelectorAll("input[type=checkbox]").forEach((box) => {
    box.addEventListener("change", () => {
      const result = toggleCompare(Number(box.value));
      message.textContent = result.message;
      renderPage();
    });
  });

  const chosen = saved.filter((laptop) => compareIds.includes(laptop.id));
  showTable(chosen);
}

function createCheckbox(laptop, compareIds) {
  const checked = compareIds.includes(laptop.id) ? "checked" : "";

  return `
    <label class="check-card">
      <input type="checkbox" value="${laptop.id}" ${checked} />
      <span class="font-semibold">${laptop.name}</span>
      <span class="ml-auto text-muted">${formatPrice(laptop.price)}</span>
    </label>
  `;
}

function showTable(chosen) {
  if (chosen.length < 2) {
    showMessage(tableBox, "Select at least 2 laptops to see the comparison table.");
    return;
  }

  const header =
    '<th scope="col">Specification</th>' +
    chosen
      .map((laptop) => `<th scope="col">${laptop.name}</th>`)
      .join("");

  const rows = compareRows
    .map((row) => {
      const best = getBestValue(chosen, row);

      const cells = chosen
        .map((laptop) => {
          const isBest = best !== null && row.getValue(laptop) === best;

          return `<td class="${isBest ? "best-value" : ""}">${row.getText(laptop)}</td>`;
        })
        .join("");

      return `
        <tr>
          <th scope="row">${row.label}</th>
          ${cells}
        </tr>
      `;
    })
    .join("");

  tableBox.innerHTML = `
    <div class="overflow-x-auto rounded-xl border border-line bg-panel">
      <table class="compare-table">
        <thead>
          <tr>${header}</tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

init();
