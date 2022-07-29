import { DeployFunction } from 'hardhat-deploy/types';
import { silent } from 'helpers/logging';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

import { STAKING_DEPLOYMENT } from './05_Staking';

export const CONTRIBUTORS_DEPLOYMENT = 'Contributors';

const deployContributors: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const staking = await get('Staking');
  await deploy(CONTRIBUTORS_DEPLOYMENT, {
    from: deployer,
    args: [staking.address],
    log: silent(),
  });
};
export default deployContributors;
deployContributors.tags = [CONTRIBUTORS_DEPLOYMENT];
deployContributors.dependencies = [STAKING_DEPLOYMENT];
