import { DeployFunction } from 'hardhat-deploy/types';
import { silent } from 'helpers/logging';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

export const TOKEN_DEPLOYMENT = 'Token';

const deployReports: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy(TOKEN_DEPLOYMENT, {
    from: deployer,
    log: silent(),
  });
};
export default deployReports;
deployReports.tags = [TOKEN_DEPLOYMENT];
