'use strict'


class Service {
  constructor({node, provider}) {
    this.node = node
    this.provider = provider
    this.subscribers = new Map()
  }


  async start()  {
    await provider
  }

}



module.exports = Service


const cli = require('./cli')
const Ora = require('./ora-factory')

const http = require('http');
const  utils = require('./utils')

'use strict'

const hostname = '127.0.0.1';
const port = 3000;


const serverAddresses = ['/ip4/0.0.0.0/tcp/4900']
const serverIdentity = utils.testServer


async function main() {
const {
  ora,
  node
} = await Ora({identity : serverIdentity, addresses: serverAddresses, options: {provider: true}})

ora.start()
return ora
}





/*


const server = http.createServer(async (req, res) => {
  res.statusCode = 200;

  res.setHeader('Content-Type', 'text/plain');

  const ora = await main()
  //res.write(ora.peerInfo().toString())
  //Get the information
  //Get the peers
    //Online
    //Offline
  //Get providers
  //Information???
  ora.on('update', (data) =>
  {
    res.write(data.toString()) //
    //Get connections
    //res.write(JSON.stringify(ora.peerInfo()))
  })

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/
module.exports = {serverAddresses, serverAddresses}
