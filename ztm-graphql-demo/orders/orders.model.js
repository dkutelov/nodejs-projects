const orders = [
  {
    date: '2005-05-05',
    subtotal: 91.0,
    items: [
      {
        product: {
          id: 'redshoe',
          description: 'Red Shoe',
          price: 45.5,
        },
        quantity: 2,
      },
    ],
  },
];

function getAllOrders() {
  return orders;
}

module.exports = {
  getAllOrders,
};
