

# EOS Client Demonstration



## Explorer 


### Setup and Installation

```console
git clone "https://github.com/chasesmith95/meshcache"
cd meshcache 
cd examples/eos-demo
npm install
npm start
```

This should give you the following console message, and deploy the explorer to http://localhost:3000

```console 


````


### Explorer Dashboard

Once the explorer is deployed, you should be able to navigate to http://localhost:3000 to get a view of the explorer. 

####TO BE Implemented

### Explorer API

The explorer web api is composed of three parts: 

- Stats
- Blocks 
- Transactions


#### Current Stats 
The current status of the blockchain. 

##### Supply 

```
curl GET "localhost:3000/supply"
```

Returns 

```JSON
{
supply: "",
id: 56 
}

```


##### BlockHash

```
curl GET "localhost:3000/blockHash"
```

Returns 

```JSON
{
blockHash: "",
id: 56 
}

```


#### Blocks  

##### Not Implemented


#### Transactions 

##### Not Implemented


_____________________________________________________________________

## EOS Node Client 


## Installation and Use

```
npm install --save eos-client
```

```javascript 
const EOSClient = require('eos-client')
````


## Documentation

The client is composed of three separate tables or indexes: 
- Current Stats
- Blocks 
- Transactions

### Getting Tables 

| name  |  type |  description  
|---    |---    |     ---         |
|  table | string  |  name of the table |
|  schema | JSON  |  schema for the table |


```javascript
let table = "transactions"
let schema = {
  balance: 'uint'
  account: 'string'
}
var transactions = ruffle.create(table, schema)
```


### Current Stats 

#### Supply 

This creates a table with name, tableName, and returns a confirmation boolean if correct.

```javascript
ruffle.get(current_stats, 'supply')
```

#### Blockhash 

This creates a table with name, tableName, and returns a confirmation boolean if correct.

```javascript
let table = "transactions"
let schema = {
  balance: 'uint'
  account: 'string'
}
var transactions = ruffle.create(table, schema)
```

### Blocks 


### Transactions
