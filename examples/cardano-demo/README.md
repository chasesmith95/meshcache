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



### Explorer API

#### Current Stats 
The current status of the blockchain. 

##### Supply 

```
curl GET "localhost:3000/supply"
```

Returns 

```JSON
{
blockHash: "",
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
blockHash: "",
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
blockHash: "",
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



#### Transactions 






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


