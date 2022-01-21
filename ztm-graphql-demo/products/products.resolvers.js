const productsModel = require('./products.model');

module.exports = {
  Query: {
    products: async (parent, args, context, info) => {
      console.log('Getting the products.');
      // parent is rootValue
      // const products = await Promise.resolve(parent.products);
      return productsModel.getAllProducts();
    },
    productsByPrice: (_, args) => {
      const min = args.min;
      const max = args.max;
      return productsModel.getProductByPrice(min, max);
    },
    productById: (_, args) => {
      const id = args.id;
      return productsModel.getProductById(id);
    },
  },
  Mutation: {
    addNewProduct: (_, args) => {
      const { id, description, price } = args;
      return productsModel.addNewProduct(id, description, price);
    },
    addNewProductReview: (_, args) => {
      const { id, rating, comment } = args;
      return productsModel.addNewProductReview(id, rating, comment);
    },
  },
};
