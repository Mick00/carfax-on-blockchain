import { DeployFunction } from 'hardhat-deploy/types';
import { log } from 'helpers/logging';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

import { CONTRIBUTORSDELEGATION_DEPLOYMENT } from './01_ContributorsDelegation';
import { CARS_DEPLOYMENT } from './02_Cars';

export const REPORTS_DEPLOYMENT = 'Reports';

const deployReports: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const ContributorsDelegation = await get('ContributorsDelegation');
  const Cars = await get('Cars');

  await deploy(REPORTS_DEPLOYMENT, {
    from: deployer,
    log: log(),
    args: [ContributorsDelegation.address, Cars.address],
  });
};
export default deployReports;
deployReports.tags = [REPORTS_DEPLOYMENT];
deployReports.dependencies = [CONTRIBUTORSDELEGATION_DEPLOYMENT, CARS_DEPLOYMENT];
