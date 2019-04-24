pragma solidity >=0.4.22 <0.6.0;
contract Registry {



    struct Service {
        uint256 serviceId;
        string id;
        address owner;
        uint256 index;
        string name;
        bytes32[] bootstraps;
        uint256 stake;

    }

    /*
    enum Type {

    }
    */


    mapping(uint256 => Service) public registry;
    uint256[] public registryIds;
    uint256 public count;



    //modifiers
    modifier ownerOnly(uint256 serviceId) {
        address serviceOwner = registry[serviceId].owner;
        require(msg.sender == serviceOwner);
        _;
    }

    modifier serviceExists(uint256 serviceId) {
        require(registry[serviceId].serviceId > 0);
        _;
    }

    modifier canAddBootstrap(uint256 serviceId) {
        require(registry[serviceId].index < registry[serviceId].bootstraps.length);
        _;
    }

    modifier serviceDoesNotExist(uint256 serviceId) {
        require(registry[serviceId].serviceId == 0);
        _;
    }


    constructor() public {
        registryIds = new uint256[](200);
        count = 0;
    }

    function create(uint256 serviceId, string memory name, string memory id) payable public serviceDoesNotExist(serviceId) {
        registry[serviceId] = Service({serviceId: serviceId, owner: msg.sender, id: id, name: name, bootstraps: new bytes32[](5), index: 0, stake: msg.value});
        registryIds[count] = serviceId;
        count+=1;
    }

    function updateOwner(uint256 serviceId, address newOwner) public serviceExists(serviceId) ownerOnly(serviceId) {
        registry[serviceId].owner = newOwner;
    }

    function updateName(uint256 serviceId, string memory newName) public serviceExists(serviceId) ownerOnly(serviceId) {
        registry[serviceId].name = newName;
    }

   function updateBootstrap(uint256 serviceId, bytes32 networkAddress) public serviceExists(serviceId)
        canAddBootstrap(serviceId) ownerOnly(serviceId)  {
        registry[serviceId].bootstraps[registry[serviceId].index] = networkAddress;
        registry[serviceId].index += 1;
    }

    function getBootstraps(uint256 serviceId) public view serviceExists(serviceId) returns (bytes32[] memory) {
        return (registry[serviceId].bootstraps);
    }

    function getServices() public view returns (uint256[] memory) {
        return (registryIds);
    }

    function getService(uint256 serviceId) public view serviceExists(serviceId) returns (uint256,
       string memory, string memory, address, uint256) {
        return (registry[serviceId].serviceId, registry[serviceId].name, registry[serviceId].id, registry[serviceId].owner, registry[serviceId].stake);
    }

}
