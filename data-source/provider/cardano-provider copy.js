'use strict'

const EventEmitter = require('events')
const sleep = require('system-sleep')
const pify = require('pify')
const axios = require('axios')

class CardanoProvider extends EventEmitter {
  constructor(url) {
    super()
    this.url = url || 'http://cardano-explorer.cardano-mainnet.iohk.io'
    this.interval = 2000
    this.running = false
    /*
      Set-up the event handlers...
      onStart() What do you do? nothing??
    */

    this.on('poll', async () => {
      await this.update()
      this.poll()
    })

  }


// /api/txs/last

  // 


// https://cardanoexplorer.com/api/txs/last (Last Transactions)

// {"cteId":"47499aa7d21b71dad89f5485697f2228086e2337ca11511f1349897ec08a25a4","cteTimeIssued":1553457931,"cteAmount":{"getCoin":"17104143268657"}}

// Blockhash

//Blocks

// Transactions

  async blockhash() {

  }

/*


  var https = require('https');

  var options = {
    'method': 'GET',
    'hostname': 'api.coincap.io',
    'path': '/v2/assets',
    'headers': {
    }
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  req.end();

*/




  async lastTXs() {
      var url = this.url + "/api/txs/last"
      try {
        var response = await axios({
          method: 'get',
          url: url
        })
        this.emit('update', response.data)

    } catch (err) {
      console.log(err)
    }
  }


  async update() {
      var url = this.url + "/api/txs/last"
      try {
        var response = await axios({
          method: 'get',
          url: url
        })
        this.emit('update', response.data)

    } catch (err) {
      console.log(err)
    }
  }


  async poll() {
    setTimeout(() => {this.emit('poll')}, this.interval)

  }


  isRunning() {
    return this.running;
  }

  async start() {
    this.poll()
  }

  stop() {
    this.running = false
  }

}


module.exports = CardanoProvider
