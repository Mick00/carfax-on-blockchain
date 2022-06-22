/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ContributorsDelegation,
  ContributorsDelegationInterface,
} from "../ContributorsDelegation";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_contributorsContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "contributorId",
        type: "uint256",
      },
    ],
    name: "Delegate",
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
        indexed: false,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "contributorId",
        type: "uint256",
      },
    ],
    name: "Undelegate",
    type: "event",
  },
  {
    inputs: [],
    name: "contributors",
    outputs: [
      {
        internalType: "contract Contributors",
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
        name: "_contributorId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_delegate",
        type: "address",
      },
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_delegated",
        type: "address",
      },
    ],
    name: "isDelegatedOf",
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
        name: "_contributors",
        type: "address",
      },
    ],
    name: "setContributorsContract",
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
        name: "_contributorId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_delegate",
        type: "address",
      },
    ],
    name: "undelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516107b83803806107b883398101604081905261002f916100ad565b6100383361005d565b600180546001600160a01b0319166001600160a01b03929092169190911790556100dd565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100bf57600080fd5b81516001600160a01b03811681146100d657600080fd5b9392505050565b6106cc806100ec6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638da5cb5b1161005b5780638da5cb5b146100ed578063c089e370146100fe578063defd6ed114610135578063f2fde38b1461014857600080fd5b806308bbb8241461008d57806345e863e0146100a25780636e7e3b2b146100b5578063715018a6146100e5575b600080fd5b6100a061009b366004610625565b61015b565b005b6100a06100b0366004610625565b610288565b6001546100c8906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100a06103ae565b6000546001600160a01b03166100c8565b61012761010c366004610655565b6001600160a01b031660009081526002602052604090205490565b6040519081526020016100dc565b6100a0610143366004610655565b610414565b6100a0610156366004610655565b6104f5565b6001546040516331a9108f60e11b81526004810184905283916001600160a01b031690636352211e90602401602060405180830381865afa1580156101a4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101c89190610679565b6001600160a01b0316336001600160a01b03161461022d5760405162461bcd60e51b815260206004820152601d60248201527f43616c6c6572206d757374206265206f776e6572206f6620746f6b656e00000060448201526064015b60405180910390fd5b6001600160a01b03821660008181526002602090815260409182902086905590513380825292869290917f510b11bb3f3c799b11307c01ab7db0d335683ef5b2da98f7697de744f465eacc910160405180910390a350505050565b6001546040516331a9108f60e11b81526004810184905283916001600160a01b031690636352211e90602401602060405180830381865afa1580156102d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102f59190610679565b6001600160a01b0316336001600160a01b0316146103555760405162461bcd60e51b815260206004820152601d60248201527f43616c6c6572206d757374206265206f776e6572206f6620746f6b656e0000006044820152606401610224565b6001600160a01b038216600081815260026020908152604080832092909255815192835282018590527f17659a1d1f57d2e58b7063ee8b518b50d00bf3e5c0d8224b68ba865e4725a0b4910160405180910390a1505050565b6000546001600160a01b031633146104085760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610224565b61041260006105c0565b565b6000546001600160a01b0316331461046e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610224565b6001600160a01b0381163b6104d35760405162461bcd60e51b815260206004820152602560248201527f436f6e7472696275746f7273206d75737420626520612076616c696420636f6e6044820152641d1c9858dd60da1b6064820152608401610224565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b0316331461054f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610224565b6001600160a01b0381166105b45760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610224565b6105bd816105c0565b50565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146105bd57600080fd5b6000806040838503121561063857600080fd5b82359150602083013561064a81610610565b809150509250929050565b60006020828403121561066757600080fd5b813561067281610610565b9392505050565b60006020828403121561068b57600080fd5b81516106728161061056fea2646970667358221220c71a236e3a6e52840fdbd4ec24618e608e27f518a116b859d1185fc6be7eb00364736f6c634300080e0033";

type ContributorsDelegationConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ContributorsDelegationConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ContributorsDelegation__factory extends ContractFactory {
  constructor(...args: ContributorsDelegationConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ContributorsDelegation";
  }

  deploy(
    _contributorsContract: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContributorsDelegation> {
    return super.deploy(
      _contributorsContract,
      overrides || {}
    ) as Promise<ContributorsDelegation>;
  }
  getDeployTransaction(
    _contributorsContract: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_contributorsContract, overrides || {});
  }
  attach(address: string): ContributorsDelegation {
    return super.attach(address) as ContributorsDelegation;
  }
  connect(signer: Signer): ContributorsDelegation__factory {
    return super.connect(signer) as ContributorsDelegation__factory;
  }
  static readonly contractName: "ContributorsDelegation";
  public readonly contractName: "ContributorsDelegation";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ContributorsDelegationInterface {
    return new utils.Interface(_abi) as ContributorsDelegationInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ContributorsDelegation {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ContributorsDelegation;
  }
}
