const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const schema = buildSchema(`
    type Query {
        products: [Product]
        orders: [Order]
    }

    type Product {
        id: ID!
        description: String!
        reviews: [Review]
        price: Float!
    }

    type Review {
        rating: Int!
        comment: String
    }

    type Order {
        date: String!
        subtotal: Float!
        items: [OrderItem]
    }

    type OrderItem {
        product: Product!
        quantity: Int!
    }
`);

const root = {
  products: [
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
  ],
  orders: [
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
  ],
};

const app = express();

// Add graphQL-express middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // enables graphical http://localhost:3000/graphql
  })
);

app.listen(3000, () => {
  console.log('Running GraphQL server ...');
});

// Query example
// {
//     orders {
//       subtotal
//       items {
//         quantity
//         product {
//           id
//           price
//           description
//           reviews {
//             comment
//             rating
//           }
//         }
//       }
//     }
//   }
