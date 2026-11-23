export const compareRows = [
  {
    label: "Price",
    best: "low",
    getValue: (laptop) => laptop.price,
    getText: (laptop) => "$" + laptop.price.toLocaleString("en-US")
  },
  {
    label: "Brand",
    best: "none",
    getValue: (laptop) => laptop.brand,
    getText: (laptop) => laptop.brand
  },
  {
    label: "Category",
    best: "none",
    getValue: (laptop) => laptop.category,
    getText: (laptop) => laptop.category
  },
  {
    label: "CPU",
    best: "none",
    getValue: (laptop) => laptop.cpu,
    getText: (laptop) => laptop.cpu
  },
  {
    label: "RAM",
    best: "high",
    getValue: (laptop) => laptop.ramGB,
    getText: (laptop) => laptop.ramGB + " GB"
  },
  {
    label: "Storage",
    best: "high",
    getValue: (laptop) => laptop.storageGB,
    getText: (laptop) => laptop.storageGB + " GB"
  },
  {
    label: "Battery",
    best: "high",
    getValue: (laptop) => laptop.batteryHours,
    getText: (laptop) => laptop.batteryHours + " hours"
  },
  {
    label: "Weight",
    best: "low",
    getValue: (laptop) => laptop.weightKg,
    getText: (laptop) => laptop.weightKg + " kg"
  },
  {
    label: "Screen",
    best: "none",
    getValue: (laptop) => laptop.screenInches,
    getText: (laptop) => laptop.screenInches + " inches"
  }
];

// The best value is taken from the numeric values, not from the text in the table.
export function getBestValue(laptops, row) {
  if (row.best === "none") {
    return null;
  }

  const values = laptops.map((laptop) => row.getValue(laptop));

  return row.best === "low" ? Math.min(...values) : Math.max(...values);
}
