import { getFavorites, getTheme, saveTheme, isFavorite, toggleFavorite } from "./storage.js";

export const formatPrice = (price) => "$" + price.toLocaleString("en-US");

export function startPage() {
  applyTheme();
  setupThemeButton();
  setupNavToggle();
  updateFavoriteCount();
}

// The saved theme is restored first, so every page opens in the same mode.
function applyTheme() {
  const theme = getTheme();
  const button = document.getElementById("themeButton");

  document.documentElement.setAttribute("data-theme", theme);

  if (button !== null) {
    if (theme === "performance") {
      button.textContent = "Battery Saver Mode";
    } else {
      button.textContent = "Performance Mode";
    }
  }
}

function setupThemeButton() {
  const button = document.getElementById("themeButton");

  if (button === null) {
    return;
  }

  button.addEventListener("click", () => {
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

  button.addEventListener("click", () => {
    const isOpen = nav.classList.contains("hidden");

    nav.classList.toggle("hidden", !isOpen);
    nav.classList.toggle("flex", isOpen);
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
  const favoriteText = saved ? "Remove favorite" : "Add to favorite";

  return `
    <article class="laptop-card flex flex-col">
      <a href="details.html?id=${laptop.id}">
        <img src="${laptop.image}" alt="${laptop.name}" class="mb-3 h-40 w-full rounded-lg object-cover" />
      </a>
      <p class="text-xs font-bold uppercase tracking-wide text-muted">${laptop.brand}</p>
      <h3 class="mt-1 text-lg font-bold">
        <a href="details.html?id=${laptop.id}" class="transition hover:text-brand">${laptop.name}</a>
      </h3>
      <p class="mt-2 text-2xl font-bold text-brand">${formatPrice(laptop.price)}</p>
      <ul class="mt-3 space-y-1 text-sm text-muted">
        <li>CPU: ${laptop.cpu}</li>
        <li>RAM: ${laptop.ramGB} GB</li>
        <li>Storage: ${laptop.storageGB} GB</li>
        <li>Battery: ${laptop.batteryHours} hours</li>
        <li>Screen: ${laptop.screenInches} inches</li>
      </ul>
      <button
        type="button"
        class="btn-action mt-4 w-full"
        data-favorite="${laptop.id}"
        aria-pressed="${saved}"
      >${favoriteText}</button>
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

export function showSkeleton(container, count) {
  let cards = "";

  for (let i = 0; i < count; i++) {
    cards += `
      <div class="rounded-xl border border-line bg-panel p-4">
        <div class="mb-3 h-40 w-full animate-pulse rounded-lg bg-line"></div>
        <div class="mb-2 h-3 w-16 animate-pulse rounded bg-line"></div>
        <div class="mb-3 h-5 w-3/4 animate-pulse rounded bg-line"></div>
        <div class="mb-2 h-6 w-24 animate-pulse rounded bg-line"></div>
        <div class="mb-2 h-3 w-2/3 animate-pulse rounded bg-line"></div>
        <div class="mb-2 h-3 w-1/2 animate-pulse rounded bg-line"></div>
        <div class="mt-4 h-9 w-full animate-pulse rounded-lg bg-line"></div>
      </div>
    `;
  }

  container.innerHTML = cards;
}

export function showMessage(container, text) {
  container.innerHTML = `
    <p class="col-span-full rounded-xl border border-line bg-panel p-6 text-center text-muted">${text}</p>
  `;
}
