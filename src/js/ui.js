import {
  getFavorites,
  getTheme,
  isFavorite,
  saveTheme,
  toggleFavorite
} from "./storage.js";

export const formatPrice = (price) => price.toLocaleString("ar-EG") + " ج.م";
export const showSkeletons = (container, count = 3) => {
  const card = `
    <div class="laptop-card pointer-events-none animate-pulse" aria-hidden="true">
      <div class="h-44 w-full bg-page"></div>
      <div class="card-body">
        <div class="h-3 w-20 rounded bg-page"></div>
        <div class="mt-3 h-6 w-3/4 rounded bg-page"></div>
        <div class="mt-2 h-8 w-28 rounded bg-page"></div>
        <div class="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4">
          <div class="h-12 rounded-lg bg-page"></div>
          <div class="h-12 rounded-lg bg-page"></div>
          <div class="h-12 rounded-lg bg-page"></div>
          <div class="h-12 rounded-lg bg-page"></div>
        </div>
        <div class="mt-4 h-10 rounded-lg bg-page"></div>
      </div>
    </div>
  `;

  container.innerHTML = Array.from({ length: count }, () => card).join("");
};

export function startPage() {
  applyTheme();
  setupThemeButton();
  setupNavToggle();
  updateFavoriteCount();
}

export function applyTheme() {
  const theme = getTheme();
  const button = document.getElementById("themeButton");

  document.documentElement.setAttribute("data-theme", theme);

  if (button !== null) {
    button.textContent = theme === "performance" ? "Battery saver" : "Performance";
  }
}

export function setupThemeButton() {
  const button = document.getElementById("themeButton");

  if (button === null) {
    return;
  }

  button.addEventListener("click", () => {
    const next = getTheme() === "performance" ? "battery" : "performance";
    saveTheme(next);
    applyTheme();
  });
}

export function setupNavToggle() {
  const button = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

  if (button === null || nav === null) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    button.setAttribute("aria-expanded", isOpen);
    button.textContent = isOpen ? "Close" : "Menu";
  });
}

export function updateFavoriteCount() {
  const counter = document.getElementById("favCount");

  if (counter !== null) {
    counter.textContent = getFavorites().length;
  }
}

export function createCard(laptop) {
  const saved = isFavorite(laptop.id);

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
          >${saved ? "Remove favorite" : "Add to favorite"}</button>
        </div>
      </div>
    </article>
  `;
}

export function setupFavoriteButtons(container, onChange) {
  const buttons = container.querySelectorAll("[data-favorite]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
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

export function showMessage(container, text) {
  container.innerHTML = `<p class="message">${text}</p>`;
}
