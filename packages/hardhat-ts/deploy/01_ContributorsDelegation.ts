import { DeployFunction } from 'hardhat-deploy/types';
import { log } from 'helpers/logging';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

import { CONTRIBUTORS_DEPLOYMENT } from './00_Contributors';

export const CONTRIBUTORSDELEGATION_DEPLOYMENT = 'ContributorsDelegation';

const deployContributorsDelegation: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const Contributors = await get('Contributors');

  await deploy(CONTRIBUTORSDELEGATION_DEPLOYMENT, {
    from: deployer,
    log: log(),
    args: [Contributors.address],
  });
};
export default deployContributorsDelegation;
deployContributorsDelegation.tags = [CONTRIBUTORSDELEGATION_DEPLOYMENT];
deployContributorsDelegation.dependencies = [CONTRIBUTORS_DEPLOYMENT];
