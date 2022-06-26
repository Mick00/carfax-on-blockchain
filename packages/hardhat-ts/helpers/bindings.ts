import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

import { contractsFactoriesMap } from '../api';

export async function bindings<T extends keyof typeof contractsFactoriesMap>(
  contractName: T,
  hre: THardhatRuntimeEnvironmentExtended
): Promise<ReturnType<typeof contractsFactoriesMap[T]['connect']>> {
  const { deployments, ethers, getNamedAccounts } = hre;
  const deployment = await deployments.get(contractName);
  const { deployer } = await getNamedAccounts();
  return contractsFactoriesMap[contractName].connect(deployment.address, await ethers.getSigner(deployer)) as ReturnType<
    typeof contractsFactoriesMap[T]['connect']
  >;
}
