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

app.get('/api/getContractAddress', (req, res) => {
  res.json({ address: Registry.getContractAddress() });
})

app.get('/api/getServices', (req, res) => {
  res.json({ services: Registry.getServices() });
})

app.get('/api/getService/:serviceId', function (req, res) {
  const serviceId=parseInt(req.params["serviceId"]);
  res.json({ serviceId: serviceId, service: Registry.getService(serviceId) });
})

app.get('/api/getBootstraps/:serviceId', function (req, res) {
  const serviceId=parseInt(req.params["serviceId"]);
  res.json({ serviceId: serviceId, service: Registry.getBootstraps(serviceId) });
})


app.listen({ port: 4000 }, () =>
{
  console.log(`🚀 GraphQL Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(`🚀 REST API Server ready at http://localhost:4000/api/ 
                    (e.g. http://localhost:4000/api/dapps/
                          http://localhost:4000/api/getContractAddress/)`);
  console.log(`🚀 GraphiQL Server ready at http://localhost:4000/graphiql/ `);
}
);

