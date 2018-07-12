// Koa libraries
import Koa from "koa";
import KoaRouter from "koa-router";
import KoaBodyParser from "koa-bodyparser";

// Apollo Server for Koa
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

// Prisma
import { Prisma } from 'prisma-binding';

// GraphQL Playground Middleware for Koa
const koaPlayground = require('graphql-playground-middleware-koa').default

// Schema and Resolvers
import { makeExecutableSchema } from "graphql-tools";
import Resolvers from './graphql/resolvers';
import { importSchema } from 'graphql-import';
const typeDefs = importSchema('./graphql/schema.graphql');

// MongoDB
const mongoose = require('./config/mongoose');
mongoose();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";

const graphQLServer = new Koa();
const router = new KoaRouter();
const bodyParser = new KoaBodyParser();

// Validate GraphQL API Schema
const schema = makeExecutableSchema({ typeDefs, resolvers: Resolvers });

// Use bodyparser middleware
graphQLServer.use(bodyParser);

// Define GraphQL endpoints
router.post('/graphql', graphqlKoa({ 
  schema
}));
router.get('/graphql', graphqlKoa({ 
  schema
}));

// Define endpoint for GraphQL Playground
router.all(
  '/playground',
  koaPlayground({
    endpoint: '/graphql'
  }),
);

// Define GraphiQL endpoints
if (NODE_ENV !== "production") {
  router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
}

// Use router middleware
graphQLServer.use(router.routes());
graphQLServer.use(router.allowedMethods());

graphQLServer.listen(PORT, () => {
  console.log(`GraphQL Playground is now running on http://localhost:${PORT}/playground`)
});

// Add some seed data to MongoDB database
require('./models/seeds');