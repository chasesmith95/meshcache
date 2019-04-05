

var assert = require('assert')
const CardanoProvider = require('../cardano-provider')


const url = 'http://cardano-explorer.cardano-mainnet.iohk.io'

///Node



const cardano = new CardanoProvider(url)

assert(cardano.url == url,  "Url must work" )
assert(cardano.isRunning() == false,  "Must not be running on start-up" )
cardano.start()
assert(cardano.isRunning() == true,  "Must be running on start" )

cardano.on('update', (data) => {
  console.log("Polling")
  console.log(data)
}
)
