const express = require('express')
const app = express()
const Service = require('./service')
const cardanoService = require('./cardanoService');
const port = 3000




app.get('/supply', (request, response) => {
  let req = {
    action: 'get',
    name: 'current',
    key: 'supply',
    id: "ID"
  }
  try {
    cardanoService.request(req).then(function(resp) {
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
  let req = {
    action: 'get',
    name: 'current',
    key: 'slot',
    id: "ID"
  }
  try {
    cardanoService.request(req).then(function(resp) {
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
  let req = {
    action: 'get',
    name: 'current',
    key: 'epoch',
    id: "ID"
  }
  try {
    cardanoService.request(req).then(function(resp) {
      response.send(resp)
    }).catch(function(error) {
      console.log(error)
      response.send(error)
    });
  } catch (err) {
    response.send(err)
  }
})

app.get('/blockHash', async (request, response) => {
  let req = {
    action: 'get',
    name: 'current',
    key: 'blockHash',
    id: "ID"
  }
  try {
    cardanoService.request(req).then(function(resp) {
      response.send(resp)
    }).catch(function(error) {
      console.log(error)
      response.send(error)
    });
  } catch (err) {
    response.send(err)
  }
})

app.get('/blocks/current', async (request, response) => {
  let req = {
    action: 'get',
    name: 'current',
    key: 'block',
    id: "ID"
  }
  try {
    cardanoService.request(req).then(function(resp) {
      response.send(resp)
    }).catch(function(error) {
      console.log(error)
      response.send(error)
    });
  } catch (err) {
    response.send(err)
  }
  })

app.get('/blocks', async (request, response) => {

  let req = {
    action: 'get',
    name: 'blocks',
    key: request.query.key,
    id: "ID"
  }
  try {
    cardanoService.request(req).then(function(resp) {
      response.send(resp)
    }).catch(function(error) {
      console.log(error)
      response.send(error)
    });
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
