/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Cars, CarsInterface } from "../Cars";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "carId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "string",
        name: "serialNumber",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "odometer",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "hash",
        type: "string",
      },
    ],
    name: "Registered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "carId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "odometer",
        type: "uint256",
      },
    ],
    name: "UpdateOdometer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_carId",
        type: "uint256",
      },
    ],
    name: "getOdometerFromCar",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_serialNumber",
        type: "string",
      },
    ],
    name: "getOdometerFromSerialNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_serialNumber",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_odometer",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_hash",
        type: "string",
      },
    ],
    name: "register",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_carId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_odometer",
        type: "uint256",
      },
    ],
    name: "updateOdometer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600a8152602001694361724661784361727360b01b815250604051806040016040528060048152602001634346436160e01b8152506200006c62000066620000a060201b60201c565b620000a4565b815162000081906001906020850190620000f4565b50805162000097906002906020840190620000f4565b505050620001d6565b3390565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b82805462000102906200019a565b90600052602060002090601f01602090048101928262000126576000855562000171565b82601f106200014157805160ff191683800117855562000171565b8280016001018555821562000171579182015b828111156200017157825182559160200191906001019062000154565b506200017f92915062000183565b5090565b5b808211156200017f576000815560010162000184565b600181811c90821680620001af57607f821691505b602082108103620001d057634e487b7160e01b600052602260045260246000fd5b50919050565b611ba580620001e66000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c806370a08231116100b8578063a22cb4651161007c578063a22cb46514610282578063b88d4fde14610295578063c87b56dd146102a8578063d8a40e00146102bb578063e985e9c5146102ce578063f2fde38b1461030a57600080fd5b806370a082311461022e578063715018a6146102415780638da5cb5b1461024957806395d89b411461025a5780639c4e15d61461026257600080fd5b806323b872dd116100ff57806323b872dd146101cc57806342842e0e146101df5780636352211e146101f2578063637a08321461020557806367f718a91461022657600080fd5b806301ffc9a71461013c57806306fdde0314610164578063081812fc14610179578063095ea7b3146101a457806320ce27ab146101b9575b600080fd5b61014f61014a36600461158a565b61031d565b60405190151581526020015b60405180910390f35b61016c61036f565b60405161015b91906115ff565b61018c610187366004611612565b610401565b6040516001600160a01b03909116815260200161015b565b6101b76101b2366004611647565b61049b565b005b6101b76101c7366004611671565b6105b0565b6101b76101da366004611693565b61060b565b6101b76101ed366004611693565b61063c565b61018c610200366004611612565b610657565b61021861021336600461177b565b6106ce565b60405190815260200161015b565b600a54610218565b61021861023c3660046117e8565b6107f5565b6101b761087c565b6000546001600160a01b031661018c565b61016c6108e2565b610218610270366004611612565b60009081526009602052604090205490565b6101b7610290366004611803565b6108f1565b6101b76102a336600461183f565b610900565b61016c6102b6366004611612565b610938565b6102186102c93660046118bb565b610abe565b61014f6102dc3660046118f0565b6001600160a01b03918216600090815260066020908152604080832093909416825291909152205460ff1690565b6101b76103183660046117e8565b610af9565b60006001600160e01b031982166380ac58cd60e01b148061034e57506001600160e01b03198216635b5e139f60e01b145b8061036957506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606001805461037e90611923565b80601f01602080910402602001604051908101604052809291908181526020018280546103aa90611923565b80156103f75780601f106103cc576101008083540402835291602001916103f7565b820191906000526020600020905b8154815290600101906020018083116103da57829003601f168201915b5050505050905090565b6000818152600360205260408120546001600160a01b031661047f5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600560205260409020546001600160a01b031690565b60006104a682610657565b9050806001600160a01b0316836001600160a01b0316036105135760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610476565b336001600160a01b038216148061052f575061052f81336102dc565b6105a15760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610476565b6105ab8383610bc4565b505050565b6105b982610657565b50600082815260096020526040908190208290555182907fb745749a4abd8c09cd1cf5597e00540e836ddd046dcc8b65306a532e623dde3d906105ff9084815260200190565b60405180910390a25050565b6106153382610c32565b6106315760405162461bcd60e51b81526004016104769061195d565b6105ab838383610d28565b6105ab83838360405180602001604052806000815250610900565b6000818152600360205260408120546001600160a01b0316806103695760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610476565b60006008846040516106e091906119ae565b9081526020016040518091039020546000146107345760405162461bcd60e51b815260206004820152601360248201527221b0b91030b63932b0b23c9036b4b73a32b21760691b6044820152606401610476565b600a8054906000610744836119e0565b919050555061075530600a54610ec4565b610761600a5483611006565b600a5460088560405161077491906119ae565b908152604080516020928190038301812093909355600a546000908152600990925290208490556107a69085906119ae565b6040518091039020600a547fe87c405245e37fa0a1d4630654748a1183981bec83c62f56cf6ef6b84f46afa985856040516107e29291906119f9565b60405180910390a350600a549392505050565b60006001600160a01b0382166108605760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610476565b506001600160a01b031660009081526004602052604090205490565b6000546001600160a01b031633146108d65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610476565b6108e060006110a0565b565b60606002805461037e90611923565b6108fc3383836110f0565b5050565b61090a3383610c32565b6109265760405162461bcd60e51b81526004016104769061195d565b610932848484846111be565b50505050565b6000818152600360205260409020546060906001600160a01b03166109b95760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f72206044820152703737b732bc34b9ba32b73a103a37b5b2b760791b6064820152608401610476565b600082815260076020526040812080546109d290611923565b80601f01602080910402602001604051908101604052809291908181526020018280546109fe90611923565b8015610a4b5780601f10610a2057610100808354040283529160200191610a4b565b820191906000526020600020905b815481529060010190602001808311610a2e57829003601f168201915b505050505090506000610a6960408051602081019091526000815290565b90508051600003610a7b575092915050565b815115610aad578082604051602001610a95929190611a12565b60405160208183030381529060405292505050919050565b610ab6846111f1565b949350505050565b600060096000600884604051610ad491906119ae565b9081526020016040518091039020548152602001908152602001600020549050919050565b6000546001600160a01b03163314610b535760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610476565b6001600160a01b038116610bb85760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610476565b610bc1816110a0565b50565b600081815260056020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610bf982610657565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600360205260408120546001600160a01b0316610cab5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610476565b6000610cb683610657565b9050806001600160a01b0316846001600160a01b03161480610cfd57506001600160a01b0380821660009081526006602090815260408083209388168352929052205460ff165b80610ab65750836001600160a01b0316610d1684610401565b6001600160a01b031614949350505050565b826001600160a01b0316610d3b82610657565b6001600160a01b031614610d9f5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610476565b6001600160a01b038216610e015760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610476565b610e0c600082610bc4565b6001600160a01b0383166000908152600460205260408120805460019290610e35908490611a41565b90915550506001600160a01b0382166000908152600460205260408120805460019290610e63908490611a58565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b038216610f1a5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610476565b6000818152600360205260409020546001600160a01b031615610f7f5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610476565b6001600160a01b0382166000908152600460205260408120805460019290610fa8908490611a58565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000828152600360205260409020546001600160a01b03166110815760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b6064820152608401610476565b600082815260076020908152604090912082516105ab928401906114db565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b816001600160a01b0316836001600160a01b0316036111515760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610476565b6001600160a01b03838116600081815260066020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6111c9848484610d28565b6111d5848484846112d9565b6109325760405162461bcd60e51b815260040161047690611a70565b6000818152600360205260409020546060906001600160a01b03166112705760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610476565b600061128760408051602081019091526000815290565b905060008151116112a757604051806020016040528060008152506112d2565b806112b1846113da565b6040516020016112c2929190611a12565b6040516020818303038152906040525b9392505050565b60006001600160a01b0384163b156113cf57604051630a85bd0160e11b81526001600160a01b0385169063150b7a029061131d903390899088908890600401611ac2565b6020604051808303816000875af1925050508015611358575060408051601f3d908101601f1916820190925261135591810190611afe565b60015b6113b5573d808015611386576040519150601f19603f3d011682016040523d82523d6000602084013e61138b565b606091505b5080516000036113ad5760405162461bcd60e51b815260040161047690611a70565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610ab6565b506001949350505050565b6060816000036114015750506040805180820190915260018152600360fc1b602082015290565b8160005b811561142b5780611415816119e0565b91506114249050600a83611b31565b9150611405565b60008167ffffffffffffffff811115611446576114466116cf565b6040519080825280601f01601f191660200182016040528015611470576020820181803683370190505b5090505b8415610ab657611485600183611a41565b9150611492600a86611b45565b61149d906030611a58565b60f81b8183815181106114b2576114b2611b59565b60200101906001600160f81b031916908160001a9053506114d4600a86611b31565b9450611474565b8280546114e790611923565b90600052602060002090601f016020900481019282611509576000855561154f565b82601f1061152257805160ff191683800117855561154f565b8280016001018555821561154f579182015b8281111561154f578251825591602001919060010190611534565b5061155b92915061155f565b5090565b5b8082111561155b5760008155600101611560565b6001600160e01b031981168114610bc157600080fd5b60006020828403121561159c57600080fd5b81356112d281611574565b60005b838110156115c25781810151838201526020016115aa565b838111156109325750506000910152565b600081518084526115eb8160208601602086016115a7565b601f01601f19169290920160200192915050565b6020815260006112d260208301846115d3565b60006020828403121561162457600080fd5b5035919050565b80356001600160a01b038116811461164257600080fd5b919050565b6000806040838503121561165a57600080fd5b6116638361162b565b946020939093013593505050565b6000806040838503121561168457600080fd5b50508035926020909101359150565b6000806000606084860312156116a857600080fd5b6116b18461162b565b92506116bf6020850161162b565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115611700576117006116cf565b604051601f8501601f19908116603f01168101908282118183101715611728576117286116cf565b8160405280935085815286868601111561174157600080fd5b858560208301376000602087830101525050509392505050565b600082601f83011261176c57600080fd5b6112d2838335602085016116e5565b60008060006060848603121561179057600080fd5b833567ffffffffffffffff808211156117a857600080fd5b6117b48783880161175b565b94506020860135935060408601359150808211156117d157600080fd5b506117de8682870161175b565b9150509250925092565b6000602082840312156117fa57600080fd5b6112d28261162b565b6000806040838503121561181657600080fd5b61181f8361162b565b91506020830135801515811461183457600080fd5b809150509250929050565b6000806000806080858703121561185557600080fd5b61185e8561162b565b935061186c6020860161162b565b925060408501359150606085013567ffffffffffffffff81111561188f57600080fd5b8501601f810187136118a057600080fd5b6118af878235602084016116e5565b91505092959194509250565b6000602082840312156118cd57600080fd5b813567ffffffffffffffff8111156118e457600080fd5b610ab68482850161175b565b6000806040838503121561190357600080fd5b61190c8361162b565b915061191a6020840161162b565b90509250929050565b600181811c9082168061193757607f821691505b60208210810361195757634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b600082516119c08184602087016115a7565b9190910192915050565b634e487b7160e01b600052601160045260246000fd5b6000600182016119f2576119f26119ca565b5060010190565b828152604060208201526000610ab660408301846115d3565b60008351611a248184602088016115a7565b835190830190611a388183602088016115a7565b01949350505050565b600082821015611a5357611a536119ca565b500390565b60008219821115611a6b57611a6b6119ca565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60006001600160a01b03808716835280861660208401525083604083015260806060830152611af460808301846115d3565b9695505050505050565b600060208284031215611b1057600080fd5b81516112d281611574565b634e487b7160e01b600052601260045260246000fd5b600082611b4057611b40611b1b565b500490565b600082611b5457611b54611b1b565b500690565b634e487b7160e01b600052603260045260246000fdfea2646970667358221220c6ca73c2da5f8a99da71beef638a4509e0390e25203b6fcc907cba6e4773b7ec64736f6c634300080e0033";

type CarsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CarsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Cars__factory extends ContractFactory {
  constructor(...args: CarsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Cars";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Cars> {
    return super.deploy(overrides || {}) as Promise<Cars>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Cars {
    return super.attach(address) as Cars;
  }
  connect(signer: Signer): Cars__factory {
    return super.connect(signer) as Cars__factory;
  }
  static readonly contractName: "Cars";
  public readonly contractName: "Cars";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CarsInterface {
    return new utils.Interface(_abi) as CarsInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Cars {
    return new Contract(address, _abi, signerOrProvider) as Cars;
  }
}
