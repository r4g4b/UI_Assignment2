startPage();

const laptopId = new URLSearchParams(window.location.search).get("id");
const details = document.getElementById("details");
const laptop = findLaptopById(loadLaptops(), laptopId);

if (laptop === undefined) {
  showMessage(
    details,
    "We could not find that laptop. Please return to the catalogue and pick one."
  );
} else {
  showLaptop(laptop);
}

function showLaptop(item) {
  const saved = isFavorite(item.id);

  details.innerHTML = `
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="panel">
        <img src="${item.image}" alt="${item.name}" class="detail-image" />
      </div>

      <div class="panel">
        <p class="eyebrow">${item.brand} / ${item.category}</p>
        <h1 class="mt-2 text-3xl font-bold md:text-4xl">${item.name}</h1>
        <p class="mt-3 text-3xl font-bold">${formatPrice(item.price)}</p>
        <p class="mt-4 text-muted">${item.description}</p>

        <div class="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            id="favoriteButton"
            type="button"
            class="btn-action"
            aria-pressed="${saved}"
          >${saved ? "Remove favorite" : "Add to favorite"}</button>
          <button id="compareButton" type="button" class="btn-quiet">
            Add to comparison
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

  favoriteButton.addEventListener("click", function () {
    const favorites = toggleFavorite(item.id);
    const nowSaved = favorites.includes(item.id);

    favoriteButton.textContent = nowSaved ? "Remove favorite" : "Add to favorite";
    favoriteButton.setAttribute("aria-pressed", nowSaved);
    updateFavoriteCount();
  });

  compareButton.addEventListener("click", function () {
    // Comparing only works with favorites, so save the laptop first.
    if (!isFavorite(item.id)) {
      toggleFavorite(item.id);
      favoriteButton.textContent = "Remove favorite";
      favoriteButton.setAttribute("aria-pressed", "true");
      updateFavoriteCount();
    }

    const result = toggleCompare(item.id);

    if (result.message !== "") {
      message.textContent = result.message;
    } else if (result.ids.includes(item.id)) {
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
    .map(function (row) {
      return `
        <tr>
          <th scope="row">${row[0]}</th>
          <td>${row[1]}</td>
        </tr>
      `;
    })
    .join("");
}
