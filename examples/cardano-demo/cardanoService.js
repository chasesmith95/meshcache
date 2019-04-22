//service
//The frontend
//Can be a master or not

'use strict'




//const EventEmitter = require('events');
const Ruffle = require('ora-ruffle')
const Ingestor = require("./etl");


//We want to get the ruffle and the other stuff here

var ruffle = new Ruffle();
var ingestor = new Ingestor();

ingestor.start()

ingestor.on("update", async (data) => {
  console.log("Updating....")
  console.log(data)
  await ruffle.request(data)
});


async function request(req) {
  let value = await ruffle.request(req);
  return value;
}



module.exports = {request}
