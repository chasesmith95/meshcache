//Service
//The frontend
//Can be a master or not

'use strict'
const Datasource = require("./datasource");
//Datasource
  // Specific datasource
  // Specific functions
    /*
    const k = randomBytes(32);
    const v = randomBytes(300);
    */

const EventEmitter = require('events');
//const once = EventEmitter.once;


class Ingestor extends EventEmitter {
  constructor(url) {
    super()
    this.datasource = new Datasource(url)

    //event handlers

    this.datasource.on('supply', (data) => {
      //clean the data
      let supply = data;
      var id = Date.now();
      this.emit('update', {name: "current",
      id: "ID", action: 'put', key: "supply", value: {supply: supply, id: id}});
    })


    this.datasource.on('slot', (data) => {
      let slot = data;
      var id = slot;
      this.emit('update', {name: "current",
      id: "ID", action: 'put', key: "slot", value: {slot: slot, id: id}});
    })


    this.datasource.on('epoch', (data) => {
      let epoch = data;
      var id = epoch;
      this.emit('update', {name: "current",
      id: "ID", action: 'put', key: "epoch", value: {epoch: epoch, id: id}});
    })

    this.datasource.on('block', (data) => {
      let block = data;
      var id = block.cbeTimeIssued;
      var key = block.cbeBlkHash;
      this.emit('update', {name: "current",
      id: "ID", action: 'put', key: "block", value: {block: block , id: id}});

      this.emit('update', {name: "blocks",
      id: "ID", action: 'put', key: key, value: {block: block , id: id}});
    });

    this.datasource.on('blockHash', (data) => {
      let blockHash = data;
      var id = Date.now();
      this.emit('update', {name: "current",
      id: "ID", action: 'put', key: "blockHash", value: {blockHash: blockHash , id: id}});
    });

    this.datasource.on('transactions', (data) => {
      //console.log("New transactions")
      //console.log(data)
    });
}


async start() {
  this.datasource.start();
}

stop() {
  this.datasource.stop();
}

async update() {
  this.datasource.update();
}


}

//ETL

function main() {
  var ingestor  = new Ingestor();
  ingestor.start();
}

module.exports = Ingestor
