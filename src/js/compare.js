const compareRows = [
  {
    label: "Price",
    getValue: function (laptop) {
      return laptop.price;
    },
    getText: function (laptop) {
      return formatPrice(laptop.price);
    },
    best: "low"
  },
  {
    label: "Category",
    getValue: function (laptop) {
      return laptop.category;
    },
    getText: function (laptop) {
      return laptop.category;
    },
    best: "none"
  },
  {
    label: "CPU",
    getValue: function (laptop) {
      return laptop.cpu;
    },
    getText: function (laptop) {
      return laptop.cpu;
    },
    best: "none"
  },
  {
    label: "RAM",
    getValue: function (laptop) {
      return laptop.ramGB;
    },
    getText: function (laptop) {
      return laptop.ramGB + " GB";
    },
    best: "high"
  },
  {
    label: "Storage",
    getValue: function (laptop) {
      return laptop.storageGB;
    },
    getText: function (laptop) {
      return laptop.storageGB + " GB";
    },
    best: "high"
  },
  {
    label: "Battery",
    getValue: function (laptop) {
      return laptop.batteryHours;
    },
    getText: function (laptop) {
      return laptop.batteryHours + " hours";
    },
    best: "high"
  },
  {
    label: "Weight",
    getValue: function (laptop) {
      return laptop.weightKg;
    },
    getText: function (laptop) {
      return laptop.weightKg + " kg";
    },
    best: "low"
  },
  {
    label: "Screen",
    getValue: function (laptop) {
      return laptop.screenInches;
    },
    getText: function (laptop) {
      return laptop.screenInches + " inches";
    },
    best: "none"
  }
];

// The best value is found from the numbers, not from the text on the page.
function getBestValue(laptops, row) {
  if (row.best === "none") {
    return null;
  }

  const values = laptops.map(function (laptop) {
    return row.getValue(laptop);
  });

  if (row.best === "low") {
    return Math.min.apply(null, values);
  }

  return Math.max.apply(null, values);
}
