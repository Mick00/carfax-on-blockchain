import { DeployFunction } from 'hardhat-deploy/types';
import { bindings } from 'helpers/bindings';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

import { CONTRIBUTORSDELEGATION_DEPLOYMENT } from './01_ContributorsDelegation';
import { CARS_DEPLOYMENT } from './02_Cars';

export const REPORTS_DEPLOYMENT = 'Reports';

const deployReports: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const contributors = await bindings('Contributors', hre);
  const contributorsDelegation = await bindings('ContributorsDelegation', hre);
  const cars = await bindings('Cars', hre);
  const reports = await bindings('Reports', hre);

  if ((await contributorsDelegation.contributors()) != contributors.address) {
    await contributorsDelegation.setContributorsContract(contributors.address);
  }
  if ((await reports.cars()) != cars.address) {
    await reports.setCars(cars.address);
  }
  if ((await reports.contributors()) != contributors.address) {
    await reports.setContributorsContract(contributors.address);
  }
};
export default deployReports;
deployReports.tags = [REPORTS_DEPLOYMENT];
deployReports.dependencies = [CONTRIBUTORSDELEGATION_DEPLOYMENT, CARS_DEPLOYMENT];
