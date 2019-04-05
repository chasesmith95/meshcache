
# Meshcache Registry


## Installation

```
```

## Use

```
const Registry = require('./registry')
```


## API


### getRegistryAddress()

This function returns the address of the registry. 

### getServices()

This function returns the list of services by ID. 


### getService(serviceId)
| name  |  type |  description  
|---    |---    |     ---         |
|  serviceId | uint256  |  id of the service |

This returns the associated service variables.



### getBootstraps(serviceId)
| name  |  type |  description  
|---    |---    |     ---         |
|  serviceId | uint256  |  id of the service |

This returns the associated bootstrap nodes with the service.





