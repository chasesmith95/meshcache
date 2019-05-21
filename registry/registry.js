
'use strict';

const Web3 = require('web3');

const provider = new Web3.providers.HttpProvider('https://kovan.infura.io:443')
const web3 = new Web3(provider);


let registryAddress = "0x73884b10654da71ec08d2642b3dbcdab204e868a";


let abi = [
		{
			"constant": true,
			"inputs": [
				{
					"name": "serviceId",
					"type": "uint256"
				}
			],
			"name": "getBootstraps",
			"outputs": [
				{
					"name": "",
					"type": "bytes32[]"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "count",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "serviceId",
					"type": "uint256"
				},
				{
					"name": "newName",
					"type": "string"
				}
			],
			"name": "updateName",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "registry",
			"outputs": [
				{
					"name": "serviceId",
					"type": "uint256"
				},
				{
					"name": "id",
					"type": "string"
				},
				{
					"name": "owner",
					"type": "address"
				},
				{
					"name": "index",
					"type": "uint256"
				},
				{
					"name": "name",
					"type": "string"
				},
				{
					"name": "stake",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "serviceId",
					"type": "uint256"
				},
				{
					"name": "name",
					"type": "string"
				},
				{
					"name": "id",
					"type": "string"
				}
			],
			"name": "create",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "serviceId",
					"type": "uint256"
				},
				{
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "updateOwner",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getServices",
			"outputs": [
				{
					"name": "",
					"type": "uint256[]"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "serviceId",
					"type": "uint256"
				}
			],
			"name": "getService",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				},
				{
					"name": "",
					"type": "string"
				},
				{
					"name": "",
					"type": "string"
				},
				{
					"name": "",
					"type": "address"
				},
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "registryIds",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "serviceId",
					"type": "uint256"
				},
				{
					"name": "networkAddress",
					"type": "bytes32"
				}
			],
			"name": "updateBootstrap",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		}
	];





let contract = web3.eth.Contract(abi, registryAddress);


async function getContractAddress() {
	return registryAddress;
}

async function getServices() {
  var services = await contract.methods.getServices().call();
  //console.log(services)
  return services
}


async function getService(serviceId) {
    var service = await contract.methods.getService(serviceId).call();
    //console.log(service)
    return service;
}

function hex_to_ascii(str)
 {
	var hex  = str.toString();
	var resp = '';
	for (var n = 2; n < hex.length; n += 2) {
		resp += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return resp;
 }

async function getBootstraps(serviceId) {
  var bootstraps = await contract.methods.getBootstraps(serviceId).call();
	for (let i = 0; i < bootstraps.length; i++) {
		bootstraps[i] = hex_to_ascii(bootstraps[i])
	}
  return bootstraps;
}


/*
async function main() {
  var d = new Date();
  var start = d.getTime();
  var services  = await getServices();
  console.log(services)
  var service = await getService(services[0])
  var bootstraps = await getBootstraps(services[1])
  console.log(bootstraps)
  var e = new Date();
  var end = e.getTime();

  console.log(end - start);
}


main()
*/
const registry = {getBootstraps, getService, getServices, getContractAddress};
module.exports = registry;
