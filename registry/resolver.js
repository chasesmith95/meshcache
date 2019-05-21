const dapps = [];
  
module.exports = {
  Query: {
    dapp: (_, { id }) => dapps[id],
    dapps: () => dapps
  },
  Mutation: {
    saveDapp: (_, { text }) => {
      const dapp = { id: dapps.length, text };
      dapps.push(dapp);
      return dapp;
    }
  }
};