
# Meshcache Registry


## Installation

```
npm install ora-protocol-registry
```

## Use

```
const Registry = require('ora-protocol-registry')
```

## API


### Get Registry Address

```javascript
registry.getRegistryAddress()
```

This function returns the address of the registry. 

#### Output

```JSON

```

### Get Services

```javascript
var services = registry.getServices()
```
This function returns the list of services by ID. 

#### Output 

```JSON

```

### Get Service 
```javascript
var serviceId = services[0]
registry.getService(serviceId)
```
| name  |  type |  description  
|---    |---    |     ---         |
|  serviceId | uint256  |  id of the service |

This returns the associated service variables.

#### Output

```JSON

```

### Get Bootstraps
```javascript
var serviceId = services[0]
registry.getBootstraps(serviceId)
```

| name  |  type |  description  
|---    |---    |     ---         |
|  serviceId | uint256  |  id of the service |

This returns the associated bootstrap nodes with the service.

#### Output

```JSON

```




