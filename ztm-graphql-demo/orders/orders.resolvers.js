const ordersModel = require('./orders.model');

module.exports = {
  Query: {
    orders: () => {
      console.log('Getting the orders.');
      return ordersModel.getAllOrders();
    },
  },
};
