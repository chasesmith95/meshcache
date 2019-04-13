# Cardano Demonstration

Here is the Cardano demo.


## Explorer 


## API

### Current Stats 
The current status of the blockchain. 

#### Supply 

#### Epoch

#### Slot 

#### BlockHash


### Blocks 

#### 



### Transactions 
  
#### 






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


