import { DeployFunction } from 'hardhat-deploy/types';
import { silent } from 'helpers/logging';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

export const REPORTS_DEPLOYMENT = 'Reports';

const deployReports: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const ContributorsDelegation = await get('ContributorsDelegation');
  const Cars = await get('Cars');

  await deploy(REPORTS_DEPLOYMENT, {
    from: deployer,
    log: silent(),
    args: [ContributorsDelegation.address, Cars.address],
  });
};
export default deployReports;
deployReports.tags = [REPORTS_DEPLOYMENT];
