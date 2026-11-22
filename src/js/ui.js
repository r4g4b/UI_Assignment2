// Shared helpers used by every page.

function formatPrice(price) {
  return "$" + price.toLocaleString("en-US");
}

function startPage() {
  applyTheme();
  setupThemeButton();
  setupNavToggle();
  updateFavoriteCount();
}

function applyTheme() {
  const theme = getTheme();
  const button = document.getElementById("themeButton");

  document.documentElement.setAttribute("data-theme", theme);

  if (button !== null) {
    if (theme === "performance") {
      button.textContent = "Battery saver";
    } else {
      button.textContent = "Performance";
    }
  }
}

function setupThemeButton() {
  const button = document.getElementById("themeButton");

  if (button === null) {
    return;
  }

  button.addEventListener("click", function () {
    if (getTheme() === "performance") {
      saveTheme("battery");
    } else {
      saveTheme("performance");
    }

    applyTheme();
  });
}

function setupNavToggle() {
  const button = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

  if (button === null || nav === null) {
    return;
  }

  button.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");

    button.setAttribute("aria-expanded", isOpen);
    button.textContent = isOpen ? "Close" : "Menu";
  });
}

function updateFavoriteCount() {
  const counter = document.getElementById("favCount");

  if (counter !== null) {
    counter.textContent = getFavorites().length;
  }
}

function createCard(laptop) {
  const saved = isFavorite(laptop.id);
  const favoriteText = saved ? "Remove favorite" : "Add to favorite";

  return `
    <article class="laptop-card">
      <a href="details.html?id=${laptop.id}">
        <img src="${laptop.image}" alt="${laptop.name}" class="card-image" />
      </a>

      <div class="card-body">
        <p class="card-brand">${laptop.brand}</p>
        <h3 class="card-title">
          <a href="details.html?id=${laptop.id}">${laptop.name}</a>
        </h3>
        <p class="card-price">${formatPrice(laptop.price)}</p>

        <dl class="card-specs">
          <div class="card-spec card-spec-wide">
            <dt>CPU</dt>
            <dd>${laptop.cpu}</dd>
          </div>
          <div class="card-spec">
            <dt>RAM</dt>
            <dd>${laptop.ramGB} GB</dd>
          </div>
          <div class="card-spec">
            <dt>Storage</dt>
            <dd>${laptop.storageGB} GB</dd>
          </div>
          <div class="card-spec">
            <dt>Battery</dt>
            <dd>${laptop.batteryHours} hours</dd>
          </div>
          <div class="card-spec">
            <dt>Screen</dt>
            <dd>${laptop.screenInches} in</dd>
          </div>
        </dl>

        <div class="card-actions">
          <a href="details.html?id=${laptop.id}" class="btn-quiet">Details</a>
          <button
            type="button"
            class="btn-action"
            data-favorite="${laptop.id}"
            aria-pressed="${saved}"
          >${favoriteText}</button>
        </div>
      </div>
    </article>
  `;
}

function setupFavoriteButtons(container, onChange) {
  const buttons = container.querySelectorAll("[data-favorite]");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.favorite);
      const favorites = toggleFavorite(id);
      const saved = favorites.includes(id);

      button.textContent = saved ? "Remove favorite" : "Add to favorite";
      button.setAttribute("aria-pressed", saved);
      updateFavoriteCount();

      if (onChange !== undefined) {
        onChange();
      }
    });
  });
}

function showMessage(container, text) {
  container.innerHTML = `<p class="message">${text}</p>`;
}
