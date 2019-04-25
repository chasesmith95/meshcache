const Registry = require('../registry/registry')
const connect = require('connect');
const query = require('qs-middleware');
const fs = require("fs");
const { makeExecutableSchema } = require("graphql-tools");
const express = require("express");
const { ApolloServer, gql } = require('apollo-server-express');

const graphql = require("express-graphql");
const sofa = require("sofa-api").default;

const typeDefs = fs.readFileSync("./schema.gql", "utf8");
const resolvers = require("./resolver");

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
//const app = connect();
//app.use(query());
const path = '/graphql';

server.applyMiddleware({ app, path });
app.use("/graphiql", graphql({ schema, graphiql: true }));
app.use("/api", sofa({ schema }));

app.listen({ port: 4000 }, () =>
{
  console.log(`🚀 GraphQL Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(`🚀 REST API Server ready at http://localhost:4000/api/ (e.g. http://localhost:4000/api/dapps/)`);
  console.log(`🚀 GraphiQL Server ready at http://localhost:4000/graphiql/ `);
}
);

