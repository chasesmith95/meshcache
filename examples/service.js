//service
//The frontend
//Can be a master or not

'use strict'

const Updater = require('./updater')

/*
Does everything need an updater?
*/

const EventEmitter = require('events');


var updater = new Updater();


const once = EventEmitter.once;
//

async function get(name, key) {
  let blockRequest = {
    key: key,
    name: name
  };
  await updater.requesting(blockRequest);
  let value = await once(updater, JSON.stringify(blockRequest))
  return value
}

async function supply() {
  let name = "current"
  let key = "supply"
  return await get(name, key)
}

async function epoch() {
  let name = "current"
  let key = "epoch"
  return await get(name, key)
}

async function slot() {
  let name = "current"
  let key = "slot"
  return await get(name, key)
}

async function blockHash() {
  let name = "current"
  let key = "blockHash"
  return await get(name, key)
}


module.exports = {supply, blockHash, slot, epoch}
