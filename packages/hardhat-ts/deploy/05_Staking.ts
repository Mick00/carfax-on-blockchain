import { DeployFunction } from 'hardhat-deploy/types';
import { silent } from 'helpers/logging';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

import { TOKEN_DEPLOYMENT } from './04_Token';
export const STAKING_DEPLOYMENT = 'Staking';

const deployStaking: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const Token = await get('Token');

  await deploy(STAKING_DEPLOYMENT, {
    from: deployer,
    log: silent(),
    args: [Token.address],
  });
};
export default deployStaking;
deployStaking.tags = [STAKING_DEPLOYMENT];
deployStaking.dependencies = [TOKEN_DEPLOYMENT];
