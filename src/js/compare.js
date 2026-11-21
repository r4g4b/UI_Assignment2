import { formatPrice } from "./ui.js";

export const compareRows = [
  { label: "Price", getValue: (laptop) => laptop.price, getText: (laptop) => formatPrice(laptop.price), best: "low" },
  { label: "Category", getValue: (laptop) => laptop.category, getText: (laptop) => laptop.category, best: "none" },
  { label: "CPU", getValue: (laptop) => laptop.cpu, getText: (laptop) => laptop.cpu, best: "none" },
  { label: "RAM", getValue: (laptop) => laptop.ramGB, getText: (laptop) => laptop.ramGB + " GB", best: "high" },
  { label: "Storage", getValue: (laptop) => laptop.storageGB, getText: (laptop) => laptop.storageGB + " GB", best: "high" },
  { label: "Battery", getValue: (laptop) => laptop.batteryHours, getText: (laptop) => laptop.batteryHours + " hours", best: "high" },
  { label: "Weight", getValue: (laptop) => laptop.weightKg, getText: (laptop) => laptop.weightKg + " kg", best: "low" },
  { label: "Screen", getValue: (laptop) => laptop.screenInches, getText: (laptop) => laptop.screenInches + " inches", best: "none" }
];

// The best value is found from the numbers, not from the text on the page.
export function getBestValue(laptops, row) {
  if (row.best === "none") {
    return null;
  }

  const values = laptops.map((laptop) => row.getValue(laptop));

  if (row.best === "low") {
    return Math.min(...values);
  }

  return Math.max(...values);
}
