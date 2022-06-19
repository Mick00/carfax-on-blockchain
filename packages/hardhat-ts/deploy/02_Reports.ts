import { DeployFunction } from 'hardhat-deploy/types';
import { silent } from 'helpers/logging';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

export const CONTRIBUTORSDELEGATION_DEPLOYMENT = 'Reports';

const deployContributorsDelegation: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const ContributorsDelegation = await get('Contributors');
  const Cars = await get('Cars');

  await deploy(CONTRIBUTORSDELEGATION_DEPLOYMENT, {
    from: deployer,
    log: silent(),
    args: [ContributorsDelegation.address, Cars.address]
  });
};
export default deployContributorsDelegation;
deployContributorsDelegation.tags = [CONTRIBUTORSDELEGATION_DEPLOYMENT];
