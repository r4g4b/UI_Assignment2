const DATA_URL = "data/laptops.json";

export const DATA_ERROR =
  "Could not load the laptop data. Run the site from a local server and reload.";

export async function loadLaptops() {
  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error(DATA_ERROR);
    }

    return await response.json();
  } catch {
    throw new Error(DATA_ERROR);
  }
}

export const findLaptopById = (laptops, id) =>
  laptops.find((laptop) => laptop.id === Number(id));
