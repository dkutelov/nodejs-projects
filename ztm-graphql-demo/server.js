const path = require('path');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');

// Load all grapgql type files
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

// Create schema
const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

// const root = {
//   products: require('./products/products.model'),
//   orders: require('./orders/orders.model'),
// };

const app = express();

// Add graphQL-express middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    //rootValue: root,
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
