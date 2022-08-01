import '../helpers/hardhat-imports';
import './helpers/chai-imports';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contributors, Contributors__factory, ContributorsDelegation, ContributorsDelegation__factory } from 'api/contract-types';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import hre from 'hardhat';

import { CONTRIBUTORS_DEPLOYMENT } from '../deploy/00_Contributors';
import { CONTRIBUTORSDELEGATION_DEPLOYMENT } from '../deploy/01_ContributorsDelegation';

import { IS_CONTRIBUTOR, IS_CONTRACT, IS_EXISTENT_TOKEN, ONLY_OWNER } from './helpers/errors';
import { addRegistrar } from './helpers/registrars';

const xhre = hre;
const { deployments, getNamedAccounts, getUnnamedAccounts } = xhre;

describe('ContributorsDelegation', function () {
  let contributorsContract: Contributors;
  let contributorsDelegationContract: ContributorsDelegation;
  let deployer: SignerWithAddress;
  let contributor: SignerWithAddress;
  let registrar: SignerWithAddress;
  let delegated: SignerWithAddress;

  beforeEach(async function () {
    const { deployer: deployerAddress } = await getNamedAccounts();
    const accounts = await getUnnamedAccounts();
    deployer = await xhre.ethers.getSigner(deployerAddress);
    contributor = await xhre.ethers.getSigner(accounts[0]);
    registrar = await xhre.ethers.getSigner(accounts[1]);
    delegated = await xhre.ethers.getSigner(accounts[2]);
    await deployments.fixture([CONTRIBUTORS_DEPLOYMENT, CONTRIBUTORSDELEGATION_DEPLOYMENT]);
    const deploymentContributors = await deployments.get(CONTRIBUTORS_DEPLOYMENT);
    const deploymentContributorsDelegation = await deployments.get(CONTRIBUTORSDELEGATION_DEPLOYMENT);
    contributorsContract = Contributors__factory.connect(deploymentContributors.address, deployer);
    contributorsDelegationContract = ContributorsDelegation__factory.connect(deploymentContributorsDelegation.address, deployer);
  });

  it('Should not be working because Contributors address not a contract', async () => {
    await expect(contributorsDelegationContract.setContributorsContract(delegated.address)).revertedWith(IS_CONTRACT);
  });

  it('Should only let owner or registar set contributors', async () => {
    await expect(contributorsDelegationContract.connect(contributor).setContributorsContract(contributorsContract.address)).revertedWith(ONLY_OWNER);
  });

  describe('Delegate process', function () {
    let id: BigNumber;
    beforeEach(async () => {
      await addRegistrar(registrar.address, xhre);
      await contributorsContract.connect(registrar).register('test', contributor.address);
      await contributorsContract.connect(contributor).confirmRegistration(registrar.address);
      id = await contributorsContract.getTokenIds();

      await contributorsDelegationContract.setContributorsContract(contributorsContract.address);
    });

    it('Should add a new delegated', async () => {
      await contributorsDelegationContract.connect(contributor).delegate(id, delegated.address);
      expect(await contributorsDelegationContract.isDelegatedOf(delegated.address)).to.equal(id);
    });

    it('Should return 0 since not delegated', async () => {
      expect(await contributorsDelegationContract.isDelegatedOf(delegated.address)).to.equal(0);
    });

    it('Should not be working because Contributors id is nonexistent', async () => {
      await expect(contributorsDelegationContract.connect(contributor).delegate(100, delegated.address)).revertedWith(IS_EXISTENT_TOKEN);
    });

    it('Should not be working because Contributors id is not caller', async () => {
      await expect(contributorsDelegationContract.connect(registrar).delegate(1, delegated.address)).revertedWith(IS_CONTRIBUTOR);
    });

    describe('Undelegate process', function () {
      beforeEach(async () => {
        await contributorsDelegationContract.connect(contributor).delegate(id, delegated.address);
      });

      it('Should be delegated', async () => {
        expect(await contributorsDelegationContract.isDelegatedOf(delegated.address)).to.equal(id);
      });

      it('Should remove delegated', async () => {
        await contributorsDelegationContract.connect(contributor).undelegate(id, delegated.address);
        expect(await contributorsDelegationContract.isDelegatedOf(delegated.address)).to.equal(0);
      });

      it('Should not be working because Contributors id is nonexistent', async () => {
        await expect(contributorsDelegationContract.connect(contributor).undelegate(100, delegated.address)).revertedWith(IS_EXISTENT_TOKEN);
      });

      it('Should not be working because Contributors id is not caller', async () => {
        await expect(contributorsDelegationContract.connect(registrar).undelegate(1, delegated.address)).revertedWith(IS_CONTRIBUTOR);
      });
    });
  });
});
