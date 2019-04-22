//Data source


//data source url/provider/providers

//type
  //updated ...
  //websocket ...

//api
  //functions with returns and event names

//functions

//events

//constructor (should say which events are on/off)


'use strict'

const EventEmitter = require('events')
const sleep = require('system-sleep')
const pify = require('pify')
const axios = require('axios')

class Datasource extends EventEmitter {
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

    this.on('lastTXs', (data) => {
      this.txStats(data);
    })

    this.on('stats', (data) => {
      var blockhash = data.ctsBlockHash;
      this.block(blockhash)
      this.transactions(blockhash)
    })
  }




  async supply() {
    var url = this.url + "/api/supply/ada"
    try {
      var response = await axios({
        method: 'get',
        url: url
      })
      if (response.data.Right) {
        console.log(response.data.Right)
        this.emit('supply', response.data.Right);
      }
    } catch (err) {
    console.log(err)
    }
  }


  async stats(data) {
    var url = this.url + "/api/txs/summary/" + data.cteId
    try {
      var response = await axios({
        method: 'get',
        url: url
      })
      if (response.data.Right) {
        this.emit('stats', response.data.Right);
      }

  } catch (err) {
    console.log(err)
  }
  }




  async txStats(data) {
    this.stats(data[0]);
  }


/*
/api/blocks/summary/(hash of block)
*/
async block(data) {
  var url = this.url + "/api/blocks/summary/" + data
  try {
    var response = await axios({
      method: 'get',
      url: url
    })
    if (response.data.Right) {
      console.log("Block data:, ")
      console.log(response.data.Right)
      var data = response.data.Right;
      this.emit('block', data);
    }

  } catch (err) {
  console.log(err)
  }
}


/*
/api/blocks/txs/(hash of block)

//Returns a list of transactions 
*/
async transactions(data) {
  var url = this.url + "/api/blocks/txs/" + data
  try {
    var response = await axios({
      method: 'get',
      url: url
    })
    this.emit('transactions', response.data.Right);
    console.log(response.data.Right)
  } catch (err) {
  console.log(err)
  }
}






  async lastTXs() {
      var url = this.url + "/api/txs/last"
      try {
        var response = await axios({
          method: 'get',
          url: url
        })
        //console.log(response.data.Right)
        this.emit('lastTXs', response.data.Right);
    } catch (err) {
      console.log(err)
    }
  }


  async update() {
    this.lastTXs();
    this.supply();
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


module.exports = Datasource
