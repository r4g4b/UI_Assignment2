startPage();

const picker = document.getElementById("comparePicker");
const message = document.getElementById("compareMessage");
const tableBox = document.getElementById("compareTable");
const allLaptops = loadLaptops();

renderPage();

function renderPage() {
  const favorites = getFavorites();
  const saved = allLaptops.filter(function (laptop) {
    return favorites.includes(laptop.id);
  });

  const compareIds = getCompare().filter(function (id) {
    return favorites.includes(id);
  });

  if (saved.length === 0) {
    picker.innerHTML = "";
    showMessage(tableBox, "You have no favorites yet. Add laptops first, then compare them here.");
    return;
  }

  picker.innerHTML = `
    <h2 class="section-title">Choose 2 to 4 laptops</h2>
    <p class="section-text">Only your favorites can be compared.</p>

    <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      ${saved.map(function (laptop) {
        return createCheckbox(laptop, compareIds);
      }).join("")}
    </div>
  `;

  const boxes = picker.querySelectorAll("input[type=checkbox]");

  boxes.forEach(function (box) {
    box.addEventListener("change", function () {
      const result = toggleCompare(Number(box.value));

      if (result.message !== "") {
        box.checked = false;
        message.textContent = result.message;
      } else {
        message.textContent = "";
      }

      renderPage();
    });
  });

  const chosen = saved.filter(function (laptop) {
    return compareIds.includes(laptop.id);
  });

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
    chosen.map(function (laptop) {
      return `<th scope="col">${laptop.name}</th>`;
    }).join("");

  const rows = compareRows.map(function (row) {
    const best = getBestValue(chosen, row);

    const cells = chosen.map(function (laptop) {
      const value = row.getValue(laptop);
      const isBest = best !== null && value === best;

      return `<td class="${isBest ? "best-value" : ""}">${row.getText(laptop)}</td>`;
    }).join("");

    return `
      <tr>
        <th scope="row">${row.label}</th>
        ${cells}
      </tr>
    `;
  }).join("");

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
