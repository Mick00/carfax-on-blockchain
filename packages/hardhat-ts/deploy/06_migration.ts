import { DeployFunction } from 'hardhat-deploy/types';
import { bindings } from 'helpers/bindings';
import { exec } from 'helpers/deployments';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

import { CONTRIBUTORS_DEPLOYMENT } from './00_Contributors';
import { CONTRIBUTORSDELEGATION_DEPLOYMENT } from './01_ContributorsDelegation';
import { CARS_DEPLOYMENT } from './02_Cars';

export const MIGRATION = 'migration';

const deployReports: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const contributors = await bindings('Contributors', hre);
  const contributorsDelegation = await bindings('ContributorsDelegation', hre);
  const cars = await bindings('Cars', hre);
  const reports = await bindings('Reports', hre);

  if ((await contributorsDelegation.contributors()) != contributors.address) {
    await exec(async () => await contributorsDelegation.setContributorsContract(contributors.address));
  }
  if ((await reports.cars()) != cars.address) {
    await exec(async () => await reports.setCars(cars.address));
  }
  if ((await reports.contributors()) != contributors.address) {
    await exec(async () => await reports.setContributorsContract(contributors.address));
  }
};
export default deployReports;
deployReports.tags = [MIGRATION];
deployReports.dependencies = [CONTRIBUTORSDELEGATION_DEPLOYMENT, CARS_DEPLOYMENT, CONTRIBUTORS_DEPLOYMENT];
