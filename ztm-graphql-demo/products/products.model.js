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

module.exports = { getAllProducts };
