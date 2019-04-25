const { GraphQLServer } = require('graphql-yoga')

const service = require('./cardanoService')
/*
type CurrentState {
    epoch: !Int
    slot: !Int
    supply: !Float
    blockHash: !String
    id: !Int
  }
  type Supply {
    supply: !Float
    Proof: !Proof
  }
  type Proof {
    proof: String
  }
  type Block {
    blockHash: !String
  }
  type Transaction {
    id: !String
    inputs: [!String]
    outputs: [!String]
    amount: !String
  }
*/

// 2
const resolvers = {
  Query: {
    currentSupply: async () => {
      var id = Date.now()
      console.log("Supply", id)
      let req = {
        action: "get",
        name: "current",
        key: "supply",
        id: id
      }
      let value = await service.request(req);
      value[0].value = JSON.parse(value[0].value)
      console.log("Value......" , value[0].value);
      let supply = {
        supply: value[0].value.supply,
        id: value[0].value.id,
        proof: value[0].p
      }
      return supply;
    }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
