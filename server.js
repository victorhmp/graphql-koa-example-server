// Koa libraries
import Koa from "koa";
import KoaRouter from "koa-router";
import KoaBodyParser from "koa-bodyparser";

// Apollo Server for Koa
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

// Schema and Resolvers
import { makeExecutableSchema } from "graphql-tools";
import Schema from './data/schema';
import Resolvers from './data/resolvers';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const graphQLServer = new Koa();
const router = new KoaRouter();
const bodyParser = new KoaBodyParser();

// Validade GraphQL API Schema
const schema = makeExecutableSchema({ typeDefs: Schema, resolvers: Resolvers });

// Use bodyparser middleware
graphQLServer.use(bodyParser);

// Define GraphQL endpoints
router.post('/graphql', graphqlKoa({ schema }));
router.get('/graphql', graphqlKoa({ schema }));

// Define GraphiQL endpoints
if (NODE_ENV !== "production") {
  router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
}

// Use router middleware
graphQLServer.use(router.routes());
graphQLServer.use(router.allowedMethods());

graphQLServer.listen(PORT, () => {
  console.log(`GraphiQL is now running on http://localhost:${PORT}/graphiql`)
});