//Connected to the Database this could be the frontend
//Given an ETL ...
//

'use strict'
  //
const randomBytes = require('randombytes');

const Ingestor = require("./etl");

//const client = require('../client');
//const mesh
//const other
//Ora

const Curkel = require('curkel-db')
//authenticat

//...


const EventEmitter = require('events')
const once = EventEmitter.once;

class Updater extends EventEmitter {

  constructor() {
    super();
    this.ingest = new Ingestor();
    this.ingest.start();

    this.queue = new Array(); //make multiple of these
    this.running = false;
    this.reading = false;
    this.response;
    this.setMaxListeners(0);
    this.count = 1;
    this.ingest.on('update', async (req) =>
    {await this.requesting(req, "updating")});
  }




async requesting(request, sender = null) {

    let checked = await this.check(request);

    //Check request
    if (checked) {
      const str = JSON.stringify(request);
      //Convert request



      //enqueue request
      this.queue.push(str);
      //returns
      if (this.running == false) {
        this.running = true;
        this.startUp();
        this.running = false;
      }

    }

    }





pack(bytes) {
    var chars = [];
    for(var i = 0, n = bytes.length; i < n;) {
        chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
    }
    return String.fromCharCode.apply(null, chars);
}

unpack(str, m = -1) {
    let n = m;
    let l = str.length;
    if (m == -1) {
      n = l;
    }
    var bytes = [];
    for(var i = 0; i < n; i++) {
        var char = str.charCodeAt(i%l);
        bytes.push(char >>> 8, char & 0xFF);
    }
    return new Buffer(bytes);
}

/*
Go job here
*/
async check(request) {
  let name = request.name;
  let k = this.unpack(request.key.toString(), 16);
  let v = request.value;
  if (!request.value) {
    return true;
  } else {
    var r = await Curkel.get(name, k);
    if (r.value) {
      console.log(this.pack(r.value))
      var value = JSON.parse(this.pack(r.value));
      return (value.id < v.id);
    } else {
      return true
    }
  }
}


/*
This is where the Ora will go
*/
async update(request) {
  let name = request.name;
  let k = this.unpack(request.key.toString(), 16);
  if (request.value) {
    let v = this.unpack(JSON.stringify(request.value));
    return await Curkel.put(name, k, v);
  } else {
    return await Curkel.get(name, k);
  }
}


async startUp() {
  while (this.queue.length > 0) {
    var str = this.queue.shift();

    var request = JSON.parse(str);
    var response = await this.update(request);
    if (response.value) {
      response.value = this.pack(response.value);
    }
    this.emit(str, response);
  }
}







}



module.exports = Updater



//Sanity Check ...


//Check ...
