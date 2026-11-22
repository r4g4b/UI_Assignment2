export async function loadLaptops() {
  try {
    const response = await fetch("data/laptops.json");

    if (!response.ok) {
      throw new Error("The laptop data could not be loaded. Please run the site from a local server.");
    }

    return await response.json();
  } catch {
    throw new Error("The laptop data could not be loaded. Please run the site from a local server.");
  }
}

export function findLaptopById(laptops, id) {
  return laptops.find((laptop) => laptop.id === Number(id));
}
