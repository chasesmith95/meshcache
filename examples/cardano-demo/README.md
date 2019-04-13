# Cardano Demonstration

Here is the Cardano demo.


## Explorer 


### Setup and Installation

```console
git clone "https://github.com/chasesmith95/meshcache"
cd meshcache 
cd examples/cardano-demo
npm install
npm start
```

This should give you the following console message, and deploy the explorer to http://localhost:3000

```console 


````


### Explorer 

Once the explorer is deployed, you should be able to navigate to http://localhost:3000 to get a view of the explorer. 

It should look like: 




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

##### Not Implemented


#### Transactions 

##### Not Implemented




## Installation and Use

```
npm install --save cardano-client
```

```javascript 
const CardanoClient = require('cardano-client')
````

## Documentation

#### 

#### Create

| name  |  type |  description  
|---    |---    |     ---         |
|  table | string  |  name of the table |
|  schema | JSON  |  schema for the table |

This creates a table with name, tableName, and returns a confirmation boolean if correct.

```javascript
let table = "transactions"
let schema = {
  balance: 'uint'
  account: 'string'
}
var transactions = ruffle.create(table, schema)
```


