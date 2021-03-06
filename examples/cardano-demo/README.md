# Cardano Client Demonstration

Here is the Cardano demo. It represents multiple different ways that the Ora Protocol can be utilized. 




## Explorer 

### Setup and Installation


#### Docker 

```console
docker push chasesmith95/cardano-explorer-ora:latest
docker run -p 3000:3000 chasesmith95/cardano-explorer-ora:latest
```

#### Computer 
```console
git clone "https://github.com/chasesmith95/meshcache"
cd meshcache 
cd examples/cardano-demo
npm install
npm start
```

This should give you the following console message, and deploy the explorer to http://localhost:3000

```console 
explorer deployed!
````

### Explorer Dashboard

Once the explorer is deployed, you should be able to navigate to http://localhost:3000 to get a view of the explorer. 

#### TO Be Implemented

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

##### Epoch

```
curl GET "localhost:3000/epoch"
```

Returns 

```JSON
{
epoch: "",
id: 56 
}

```

##### Slot 

```
curl GET "localhost:3000/slot"
```

Returns 

```JSON
{
slot: "",
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


```
curl GET "localhost:3000/blocks?key=blockHash}"
```


Returns 

```JSON
{
block: "",
id: 56 
}

```

#### Transactions 

```
curl GET "localhost:3000/transactions/{:id}"
```


Returns 

```JSON
{
blockHash: "",
id: 56 
}

```
_____________________________________________________________________

## Cardano Node Client 


## Installation and Use

```
npm install --save cardano-client
```

```javascript 
const CardanoClient = require('cardano-client')
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

#### Epoch

This gets the epoch number from the current block stats. 

```javascript
ruffle.get(current_stats, 'epoch')
```


#### Slot 

This gets the slot number from the current block. 
```javascript
ruffle.get(current_stats, 'slot')
```

#### Blockhash 

This gets the blockHash from the current stats. 

```javascript
ruffle.get(current_stats, 'blockHash')
```


### Blocks 

This gets the block from a blockhash. 

```javascript
ruffle.get(blocks, :blockHash)
```


### Transactions

This gets the block from a transaction id. 

```javascript
ruffle.get(transactions, :transaction_id)
```

## Schema definitions
