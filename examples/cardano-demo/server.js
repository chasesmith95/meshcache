const express = require('express')
const app = express()
const Service = require('./service')
const cardanoService = require('./cardanoService');
const port = 3000




app.get('/supply', async (request, response) => {
  let req = {
    action: 'get',
    name: 'current',
    key: 'supply',
    id: "ID"
  }
  var resp = await cardanoService.request(req);
  response.send(resp)
})


app.get('/slot', async (request, response) => {
  let req = {
    action: 'get',
    name: 'current',
    key: 'slot',
    id: "ID"
  }
  var resp = await cardanoService.request(req);
  response.send(resp)
})


app.get('/epoch', async (request, response) => {
  let req = {
    action: 'get',
    name: 'current',
    key: 'epoch',
    id: "ID"
  }
  var resp = await cardanoService.request(req);
  response.send(resp)
})

app.get('/blockHash', async (request, response) => {
  let req = {
    action: 'get',
    name: 'current',
    key: 'blockHash',
    id: "ID"
  }
  var resp = await cardanoService.request(req);
  response.send(resp)
})

app.get('/block', async (request, response) => {
  let req = {
    action: 'get',
    name: 'current',
    key: 'block',
    id: "ID"
  }
  var resp = await cardanoService.request(req);
  response.send(resp)
})



app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
