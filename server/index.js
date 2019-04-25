const { ApolloServer, gql } = require('apollo-server');
const Registry = require('../registry/registry')

const dapps = [
  {
    title: 'dapp1',
    author: 'dapp author',
    address: '0x01',
    network_id: '4',
    blockchain_id: '1',  
    blockchain_name: 'ethereum',
  },
  {
    title: 'dapp2',
    author: 'dapp author',
    address: '0x02',
    network_id: '4',
    blockchain_id: '1',  
    blockchain_name: 'ethereum',

  },

];

const typeDefs = gql`
  type Dapp {
    title: String
    author: String,
    address: String,
    network_id: String,
    blockchain_id: String,
    blockchain_name: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    dapps: [Dapp]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve dapps from the "dapps" array above.
const resolvers = {
  Query: {
    dapps: () => dapps,
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
