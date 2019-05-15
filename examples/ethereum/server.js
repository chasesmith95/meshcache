const express = require('express')
const app = express()
const Service = require('./service')
const port = 3000

app.get('/supply', async (request, response) => {
  var resp = await Service.supply();
  //console.log(resp[0].value)
  response.send(resp[0].value)
})


app.get('/slot', async (request, response) => {
  var resp = await Service.slot();
  response.send(resp[0].value)
})


app.get('/epoch', async (request, response) => {
  var resp = await Service.epoch();
  response.send(resp[0].value)
})

app.get('/blockHash', async (request, response) => {
  var resp = await Service.blockHash();
  response.send(resp[0].value)
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
