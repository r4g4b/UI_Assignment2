// The laptop list is stored in data/laptops.js so it works without a server.

function loadLaptops() {
  return window.LAPTOPS;
}

function findLaptopById(laptops, id) {
  return laptops.find(function (laptop) {
    return laptop.id === Number(id);
  });
}
