
# Meshcache Registry


## Installation

```
npm install meshcache-registry
```

## Use

```
const Registry = require('meshcache-registry')
```


## API


### getRegistryAddress()

```javascript
registry.getRegistryAddress()

```

This function returns the address of the registry. 

### getServices()

```javascript
var services = registry.getServices()
```
This function returns the list of services by ID. 


### getService(serviceId)
```javascript
var serviceId = services[0]
registry.getService(serviceId)
```
| name  |  type |  description  
|---    |---    |     ---         |
|  serviceId | uint256  |  id of the service |

This returns the associated service variables.



### getBootstraps(serviceId)
```javascript
var serviceId = services[0]
registry.getBootstraps(serviceId)
```
| name  |  type |  description  
|---    |---    |     ---         |
|  serviceId | uint256  |  id of the service |

This returns the associated bootstrap nodes with the service.





