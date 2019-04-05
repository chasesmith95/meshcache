//service
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


const EventEmitter = require('events')

class Ingestor extends EventEmitter {
  constructor(url) {
    super()

    this.datasource = new Datasource(url)


    //event handlers
    this.datasource.on('lastTXs', (data) => {
      //clean the data

      //convert to transactions ...
      for (var i = 0; i < data.length; i++) {
            //
            //console.log(data[i].cteId);
            //console.log(data[i].cteTimeIssued);
            //console.log(data[i].cteAmount.getCoin);

          //  Curkel.put("contracts", key, value);
        }

    })




    this.datasource.on('supply', async (data) => {
      //clean the data
      let supply = data;
      var id = Date.now();
      this.emit('update', {name: "current", key: "supply", value: {supply: supply, id: id}});

    })






    this.datasource.on('latest', (data) => {
      //clean the data

      //console.log(data)
      //(key = "latest")
      data = data.cbsEntry
      var blockHash = data.cbeBlkHash;
      var blockTime = data.cbeTimeIssued;
    //  console.log(blockTimeIssued)
      //var blockNumber = ;
      var epoch = data.cbeEpoch;
      var slot = data.cbeSlot;
      var id = Date.now();
      //Monotonically increasing
      //console.log(blockHash, id)
      this.emit('update', {name: "current", key: "blockHash", value: {blockHash: blockHash, id: id}});
      this.emit('update', {name: "current", key: "epoch", value: {epoch: epoch, id: id}});
      this.emit('update', {name: "current", key: "slot", value: {slot: slot, id: id}});

    //this.emit('update', {name: "current", key: "blockTime", value: {blockTime: blockTime, id: id}});

      // Emit these events
      //(index, key, value)

      //key blockHash
      //Curkel.put(STAT_TABLE, "latest", data)
      //console.log(Curkel.put(STAT_TABLE, "latest"))
    })


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

module.exports = Ingestor
