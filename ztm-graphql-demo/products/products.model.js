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

function addNewProduct(id, description, price) {
  const newProduct = {
    id,
    description,
    price,
    reviews: [],
  };
  products.push(newProduct);
  return newProduct;
}

module.exports = {
  getAllProducts,
  getProductByPrice,
  getProductById,
  addNewProduct,
};
