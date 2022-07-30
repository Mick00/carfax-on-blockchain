import { DeployFunction } from 'hardhat-deploy/types';
import { log } from 'helpers/logging';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

export const TOKEN_DEPLOYMENT = 'Token';

const deployToken: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy(TOKEN_DEPLOYMENT, {
    from: deployer,
    log: log(),
  });
};
export default deployToken;
deployToken.tags = [TOKEN_DEPLOYMENT];
