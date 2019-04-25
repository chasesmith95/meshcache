const express = require('express')
const app=  express()
//const Service = require('./service')
//const cardanoService = require('./cardanoService');
const port = 3000

//const EventEmitter = require('events');
const Ruffle = require('ora-ruffle')
const Ingestor = require("./etl");
const EventEmitter = require('events')

var ruffle = new Ruffle();
var ingestor = new Ingestor();

async function request(req) {
  try {
    let value = await ruffle.request(req);
    return value;
  } catch(err) {
    console.log(err)
  }

}

ingestor.start();



app.get('/supply', async (request, response) => {
  var id = Date.now()
  console.log("Supply", id)
  let req = {
    action: "get",
    name: "current",
    key: "supply",
    id: id
  }
  try {
    ruffle.request(req).then(function(resp) {
      response.send(resp)
    }).catch(function(error) {
      console.log(error)
      response.send(err)
    });
  } catch (err) {
    response.send(err)
  }
})


app.get('/slot', async (request, response) => {
  var id = Date.now()
  let req = {
    action: 'get',
    name: 'current',
    key: 'slot',
    id: id
  }
  try {
    ruffle.request(req).then(function(resp) {
      response.send(resp)
    }).catch(function(error) {
      console.log(error)
      response.send(error)
    });
  } catch (err) {
    response.send(err)
  }
})


app.get('/epoch', async (request, response) => {
  var id = Date.now()
  let req = {
    action: 'get',
    name: 'current',
    key: 'epoch',
    id: id
  }
  try {
    let value = await ruffle.request(req);
    console.log(value)
    response.send(value)
  } catch (err) {
    console.log(err)
    response.send(err)
  }
})

app.get('/blockHash', (request, response) => {
  var id = Date.now()
  let req = {
    action: 'get',
    name: 'current',
    key: 'blockHash',
    id: id
  }
  try {
    ruffle.request(req).then(function(resp) {
      response.send(resp)
    }).catch(function(error) {
      console.log(error)
      response.send(error)
    });
  } catch (err) {
    console.log(err)
    response.send(err)
  }
})

app.get('/blocks/current', async (request, response) => {
  var id = Date.now()
  let req = {
    action: 'get',
    name: 'current',
    key: 'block',
    id: id
  }
  try {
    ruffle.request(req).then(function(resp) {
      response.send(resp)
    }).catch(function(error) {
      console.log(error)
      response.send(error)
    });
  } catch (err) {
    console.log(err)
    response.send(err)
  }
  })

app.get('/blocks', async (request, response) => {
  var id = Date.now()
  let req = {
    action: 'get',
    name: 'blocks',
    key: request.query.key,
    id: id
  }
  try {
    let value = await ruffle.request(req)
    response.send(value)
  } catch (err) {
    response.send(err)
  }
})


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})





ingestor.on("update", async (data) => {
  console.log("Updating....")
  console.log(data)
  let value = await request(data);
  console.log("Success", value)
});
