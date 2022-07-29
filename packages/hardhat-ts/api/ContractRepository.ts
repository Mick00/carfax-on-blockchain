import { JsonRpcProvider } from '@ethersproject/providers';
import { MultiExport } from 'hardhat-deploy/dist/types';

import { Cars__factory, Contributors__factory, ContributorsDelegation__factory, Reports__factory, Staking__factory, Token__factory } from './contract-types';
import contractsExport from './contracts.json';

const contracts = contractsExport as MultiExport;

export const contractsFactoriesMap = {
  Contributors: Contributors__factory,
  Cars: Cars__factory,
  Reports: Reports__factory,
  ContributorsDelegation: ContributorsDelegation__factory,
  Token: Token__factory,
  Staking: Staking__factory,
} as const;

export class ContractProvider {
  constructor(private readonly provider: JsonRpcProvider, private readonly network: keyof typeof contracts) {}

  getExport(contractName: keyof typeof contractsFactoriesMap) {
    const protocol = contracts[this.network][0];
    return protocol.contracts[contractName];
  }

  get<T extends keyof typeof contractsFactoriesMap>(contractName: T): ReturnType<typeof contractsFactoriesMap[T]['connect']> {
    const contractExport = this.getExport(contractName);
    return contractsFactoriesMap[contractName].connect(contractExport.address, this.provider) as ReturnType<typeof contractsFactoriesMap[T]['connect']>;
  }
}
