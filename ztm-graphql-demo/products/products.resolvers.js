const productsModel = require('./products.model');

module.exports = {
  Query: {
    products: async (parent, args, context, info) => {
      console.log('Getting the products.');
      // parent is rootValue
      // const products = await Promise.resolve(parent.products);
      return productsModel.getAllProducts();
    },
  },
};
