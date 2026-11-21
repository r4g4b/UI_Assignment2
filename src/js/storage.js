const FAVORITES_KEY = "laptopFinderFavorites";
const THEME_KEY = "laptopFinderTheme";
const COMPARE_KEY = "laptopFinderCompare";

export function getFavorites() {
  const saved = localStorage.getItem(FAVORITES_KEY);

  if (saved === null) {
    return [];
  }

  return JSON.parse(saved);
}

export function saveFavorites(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}

export function toggleFavorite(id) {
  const favorites = getFavorites();
  let next;

  if (favorites.includes(id)) {
    next = favorites.filter((item) => item !== id);
    saveCompare(getCompare().filter((item) => item !== id));
  } else {
    next = favorites.concat(id);
  }

  saveFavorites(next);
  return next;
}

export function clearFavorites() {
  saveFavorites([]);
  saveCompare([]);
}

export function getTheme() {
  const theme = localStorage.getItem(THEME_KEY);

  if (theme === null) {
    return "battery";
  }

  return theme;
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function getCompare() {
  const saved = localStorage.getItem(COMPARE_KEY);

  if (saved === null) {
    return [];
  }

  return JSON.parse(saved);
}

export function saveCompare(ids) {
  localStorage.setItem(COMPARE_KEY, JSON.stringify(ids));
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
