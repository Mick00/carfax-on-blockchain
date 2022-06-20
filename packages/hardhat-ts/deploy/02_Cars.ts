import { DeployFunction } from 'hardhat-deploy/types';
import { silent } from 'helpers/logging';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

export const CARS_DEPLOYMENT = 'Cars';

const deployCars: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy(CARS_DEPLOYMENT, {
    from: deployer,
    log: silent(),
  });
};
export default deployCars;
deployCars.tags = [CARS_DEPLOYMENT];
