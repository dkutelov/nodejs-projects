const products = [
  {
    id: 'redshoe',
    description: 'Red Shoe',
    price: 42.21,
  },
  {
    id: 'bluejeans',
    description: 'Blue Jeans',
    price: 52.21,
  },
];

function getAllProducts() {
  return products;
}

function getProductByPrice(min, max) {
  return products.filter((p) => p.price >= min && p.price <= max);
}

function getProductById(id) {
  return products.find((p) => (p.id = id));
}

module.exports = { getAllProducts, getProductByPrice, getProductById };
