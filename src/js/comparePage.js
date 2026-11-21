import { loadLaptops } from "./api.js";
import { getFavorites, getCompare, toggleCompare } from "./storage.js";
import { startPage, showMessage, formatPrice } from "./ui.js";
import { compareRows, getBestValue } from "./compare.js";

startPage();

const picker = document.getElementById("comparePicker");
const message = document.getElementById("compareMessage");
const tableBox = document.getElementById("compareTable");

async function start() {
  try {
    const laptops = await loadLaptops();
    renderPage(laptops);
  } catch (error) {
    showMessage(tableBox, error.message);
  }
}

function renderPage(laptops) {
  const favorites = getFavorites();
  const saved = laptops.filter((laptop) => favorites.includes(laptop.id));
  const compareIds = getCompare().filter((id) => favorites.includes(id));

  if (saved.length === 0) {
    picker.innerHTML = "";
    showMessage(tableBox, "You have no favorites yet. Add laptops first, then compare them here.");
    return;
  }

  picker.innerHTML = `
    <h2 class="text-xl font-bold">Choose 2 to 4 laptops</h2>
    <div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      ${saved.map((laptop) => createCheckbox(laptop, compareIds)).join("")}
    </div>
  `;

  const boxes = picker.querySelectorAll("input[type=checkbox]");

  boxes.forEach((box) => {
    box.addEventListener("change", () => {
      const result = toggleCompare(Number(box.value));

      if (result.message !== "") {
        box.checked = false;
        message.textContent = result.message;
      } else {
        message.textContent = "";
      }

      renderPage(laptops);
    });
  });

  const chosen = saved.filter((laptop) => compareIds.includes(laptop.id));
  showTable(chosen);
}

function createCheckbox(laptop, compareIds) {
  const checked = compareIds.includes(laptop.id) ? "checked" : "";

  return `
    <label class="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-panel px-3 py-2 text-sm transition hover:border-brand">
      <input type="checkbox" value="${laptop.id}" ${checked} class="rounded border-line text-brand focus:ring-brand" />
      <span>${laptop.name} - ${formatPrice(laptop.price)}</span>
    </label>
  `;
}

function showTable(chosen) {
  if (chosen.length < 2) {
    showMessage(tableBox, "Select at least 2 laptops to see the comparison table.");
    return;
  }

  const header =
    `<th class="px-4 py-3 text-left">Specification</th>` +
    chosen.map((laptop) => `<th class="px-4 py-3 text-left">${laptop.name}</th>`).join("");

  const rows = compareRows
    .map((row) => {
      const best = getBestValue(chosen, row);

      const cells = chosen
        .map((laptop) => {
          const value = row.getValue(laptop);
          let cellClass = "px-4 py-3";

          if (best !== null && value === best) {
            cellClass = "bg-brand-soft px-4 py-3 font-bold text-brand";
          }

          return `<td class="${cellClass}">${row.getText(laptop)}</td>`;
        })
        .join("");

      return `
        <tr class="border-t border-line">
          <th class="px-4 py-3 text-left font-semibold text-muted">${row.label}</th>
          ${cells}
        </tr>
      `;
    })
    .join("");

  tableBox.innerHTML = `
    <div class="overflow-x-auto rounded-xl border border-line">
      <table class="w-full min-w-[640px] bg-panel text-sm">
        <thead class="bg-brand-soft text-brand">
          <tr>${header}</tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

start();
