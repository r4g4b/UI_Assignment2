// All saved data lives in localStorage so it survives a page reload.

const FAVORITES_KEY = "laptopFinderFavorites";
const THEME_KEY = "laptopFinderTheme";
const COMPARE_KEY = "laptopFinderCompare";

function readList(key) {
  const saved = localStorage.getItem(key);

  if (saved === null) {
    return [];
  }

  return JSON.parse(saved);
}

function writeList(key, ids) {
  localStorage.setItem(key, JSON.stringify(ids));
}

function getFavorites() {
  return readList(FAVORITES_KEY);
}

function saveFavorites(ids) {
  writeList(FAVORITES_KEY, ids);
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  let next;

  if (favorites.includes(id)) {
    next = favorites.filter(function (item) {
      return item !== id;
    });

    // A laptop that is no longer a favorite cannot stay in the comparison.
    saveCompare(
      getCompare().filter(function (item) {
        return item !== id;
      })
    );
  } else {
    next = favorites.concat(id);
  }

  saveFavorites(next);
  return next;
}

function clearFavorites() {
  saveFavorites([]);
  saveCompare([]);
}

function getTheme() {
  const theme = localStorage.getItem(THEME_KEY);

  if (theme === null) {
    return "battery";
  }

  return theme;
}

function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

function getCompare() {
  return readList(COMPARE_KEY);
}

function saveCompare(ids) {
  writeList(COMPARE_KEY, ids);
}

function toggleCompare(id) {
  const compare = getCompare();

  if (compare.includes(id)) {
    const next = compare.filter(function (item) {
      return item !== id;
    });

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
