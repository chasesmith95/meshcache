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
  //console.log(Registry.getContractAddress());
  Registry.getContractAddress().then(val => {
    res.json({ address: val });
  })
})

app.get('/api/getServices', (req, res) => {
  //console.log(Registry.getServices());
  Registry.getServices().then(val => {
    res.json({ services: val });

  })
})

app.get('/api/getService/:serviceId', function (req, res) {
  const serviceId=parseInt(req.params["serviceId"]);
  //console.log(Registry.getService(serviceId));
  Registry.getService(serviceId).then(val => {
    res.json({ serviceId: serviceId, service: val });
  }).catch(error => {
    console.log(error);
  })
})

app.get('/api/getBootstraps/:serviceId', function (req, res) {
  const serviceId=parseInt(req.params["serviceId"]);
  //console.log(Registry.getBootstraps(serviceId));
  Registry.getBootstraps(serviceId).then(val => {
    res.json({ serviceId: serviceId, service: val});

  }).catch(error => {
    console.log(error);
  })
})


app.listen({ port: 4000 }, () =>
{
  console.log(`🚀 Apollo GraphQL Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(`🚀 REST API Server ready at http://localhost:4000/api/ 
                    (e.g. http://localhost:4000/api/dapps/
                          http://localhost:4000/api/getContractAddress/)`);
  console.log(`🚀 GraphiQL Server ready at http://localhost:4000/graphiql/ `);
}
);

