const express = require('express');

// This for testing queries with Apollo every time the server runs
const { ApolloServer } = require('@apollo/server');

// express middleware that Apollo can also test
const { expressMiddleware } = require('@apollo/server/express4');

const { typeDefs, resolvers } = require('./schemas');

const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');


const PORT = process.env.PORT || 3011;
const app = express();

// Each time the server is run the typeDefs and resolvers are added in
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());


  app.use('/graphql', expressMiddleware(server));

  // Once the variable NODE_ENV is working client dist folder can work





  // if we're in production, serve client/build as static assets
  // NODE_ENV acts as a open variable indicator to know if the application is runnning locally on the computer or on Heroku
  // This is important because if we are local we can grab client folder and add it to the path
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
}
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

startApolloServer();