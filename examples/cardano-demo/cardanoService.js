//service
//The frontend
//Can be a master or not

'use strict'




//const EventEmitter = require('events');
const Ruffle = require('ora-ruffle')
const Ingestor = require("./etl");
const EventEmitter = require('events')


//We want to get the ruffle and the other stuff here

var ruffle = new Ruffle();
var ingestor = new Ingestor();

//ingestor.start()



ingestor.on("update", async (data) => {
  console.log("Updating....")
  console.log(data)
  await request(JSON.parse(data));
});


async function request(req) {
  try {
    let value = await ruffle.request(req);
    return value;
  } catch(err) {
    console.log(err)
  }

}



module.exports = {request}
