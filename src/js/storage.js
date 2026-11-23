const FAVORITES_KEY = "laptopFinderFavorites";
const THEME_KEY = "laptopFinderTheme";
const COMPARE_KEY = "laptopFinderCompare";

function readList(key) {
  try {
    const list = JSON.parse(localStorage.getItem(key));
    return Array.isArray(list) ? list : [];
  } catch (error) {
    return [];
  }
}

function writeList(key, ids) {
  localStorage.setItem(key, JSON.stringify(ids));
}

export const getFavorites = () => readList(FAVORITES_KEY);

export const isFavorite = (id) => getFavorites().includes(id);

export const getTheme = () =>
  localStorage.getItem(THEME_KEY) === "performance" ? "performance" : "battery";

export const saveTheme = (theme) => localStorage.setItem(THEME_KEY, theme);

export const getCompare = () => readList(COMPARE_KEY);

export function saveFavorites(ids) {
  writeList(FAVORITES_KEY, ids);
}

export function saveCompare(ids) {
  writeList(COMPARE_KEY, ids);
}

export function toggleFavorite(id) {
  const favorites = getFavorites();
  const next = favorites.includes(id)
    ? favorites.filter((item) => item !== id)
    : favorites.concat(id);

  saveFavorites(next);

  if (!next.includes(id)) {
    saveCompare(getCompare().filter((item) => item !== id));
  }

  return next;
}

export function clearFavorites() {
  saveFavorites([]);
  saveCompare([]);
}

export function toggleCompare(id) {
  const compare = getCompare();

  if (compare.includes(id)) {
    const next = compare.filter((item) => item !== id);
    saveCompare(next);
    return { ids: next, message: "" };
  }

  if (compare.length >= 4) {
    return { ids: compare, message: "You can compare up to 4 laptops." };
  }

  const next = compare.concat(id);
  saveCompare(next);
  return { ids: next, message: "" };
}
