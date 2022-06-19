import '../helpers/hardhat-imports';
import './helpers/chai-imports';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { Cars, Cars__factory, Contributors, Contributors__factory, ContributorsDelegation, ContributorsDelegation__factory, Reports, Reports__factory } from 'api/contract-types';
import hre from 'hardhat';

import { CONTRIBUTORS_DEPLOYMENT } from '../deploy/00_Contributors';
import { CONTRIBUTORSDELEGATION_DEPLOYMENT } from '../deploy/01_ContributorsDelegation';
import { REPORTS_DEPLOYMENT } from '../deploy/02_Reports';
import { CARS_DEPLOYMENT } from '../deploy/03_Cars';

import { IS_OWNER_OR_REGISTRAR, IS_CONTRIBUTOR, IS_CONTRACT, IS_EXISTENT_TOKEN, ONLY_OWNER, IS_DELEGATED, IS_CREATOR } from './helpers/errors';

const xhre = hre;
const { deployments, getNamedAccounts, getUnnamedAccounts } = xhre;

describe('Reports', function () {
  let contributorsContract: Contributors;
  let contributorsDelegationContract: ContributorsDelegation;
  let reportsContract: Reports;
  let carsContract: Cars;
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

    await deployments.fixture([CONTRIBUTORS_DEPLOYMENT, CONTRIBUTORSDELEGATION_DEPLOYMENT, CARS_DEPLOYMENT, REPORTS_DEPLOYMENT]);
    const deploymentContributors = await deployments.get(CONTRIBUTORS_DEPLOYMENT);
    const deploymentContributorsDelegation = await deployments.get(CONTRIBUTORSDELEGATION_DEPLOYMENT);
    const deploymentCars = await deployments.get(CARS_DEPLOYMENT);
    const deploymentReports = await deployments.get(REPORTS_DEPLOYMENT);
    contributorsContract = Contributors__factory.connect(deploymentContributors.address, deployer);
    contributorsDelegationContract = ContributorsDelegation__factory.connect(deploymentContributorsDelegation.address, deployer);
    carsContract = Cars__factory.connect(deploymentCars.address, deployer);
    reportsContract = Reports__factory.connect(deploymentReports.address, deployer);
  });

  it('Should let only owner set contributors', async () => {
    await expect(reportsContract.connect(contributor).setContributors(contributorsDelegationContract.address)).revertedWith(ONLY_OWNER);
  });

  it('Should let only owner set cars', async () => {
    await expect(reportsContract.connect(contributor).setCars(carsContract.address)).revertedWith(ONLY_OWNER);
  });

  it('Should return 0 since no nonexistent report', async () => {
    expect(await reportsContract.getReportCar(0)).to.equal(0);
  });

  it('Should return empty array since nonexistent car', async () => {
    expect(await reportsContract.getCarReports(0)).to.equal([]);
  });

  it('Should return 0 for nonexistent report', async () => {
    expect(await reportsContract.getCreator(0)).to.equal(0);
  })

  it('Should return 0 since no update', async () => {
    expect(await reportsContract.lastUpdate()).to.equal(0);
  })

  describe('Create report process', function () {
    let carId: BigNumber;
    let contributorId: BigNumber;
    let reportId: BigNumber;
    const HASH = 'TEST';
    beforeEach(async () => {
      await contributorsContract.addRegistrar(registrar.address);
      await contributorsContract.connect(registrar).register('test', contributor.address);
      await contributorsContract.connect(contributor).confirmRegistration(registrar.address);
      contributorId = await contributorsContract.getTokenIds();
      await contributorsDelegationContract.setContributors(contributorsContract.address);
      await contributorsDelegationContract.connect(contributor).delegate(contributorId, delegated.address);

      await carsContract.create();
      carId = await carsContract.getTokenIds();
    });

    it('Should create a new report', async () => {
      reportId = await reportsContract.connect(delegated).create(carId, HASH);
      expect(reportId).to.equal(1);
      expect(await reportsContract.getTokenIds()).to.equal(1);
      expect(await reportsContract.getCreator(reportId)).to.equal(delegated.address);
      expect(await reportsContract.getCarReports(carId)).to.equal([reportId]);
      expect(await reportsContract.getReportCar(reportId)).to.equal(carId);
      expect(await reportsContract.tokenURI(reportId)).to.equal(HASH);
    });

    it('Should create multiple report', async () => {
      let reportsIds = [];
      for (let i = 0; i < 10; i++) {
        await reportsContract.connect(delegated).create(carId, HASH);
        reportsIds.push(await reportsContract.getTokenIds());
      }
      expect(await reportsContract.getCarReports(carId)).to.equal(reportsIds);
    });

    it('Should not create report since caller is not delegated', async () => {
      await expect(reportsContract.connect(deployer).create(carId, HASH)).revertedWith(IS_DELEGATED);
    });

    it('Should not create report since car is not valid', async () => {
      await expect(reportsContract.connect(delegated).create(2, HASH)).revertedWith(IS_EXISTENT_TOKEN);
    });


    describe('Update process', function () {
      beforeEach(async () => {
        reportId = await reportsContract.connect(delegated).create(carId, HASH);
      });

      it('Should not update report since caller is not delegated', async () => {
        await expect(reportsContract.connect(contributor).update(reportId, HASH)).revertedWith(IS_DELEGATED);
      });

      it('Should not update report since creator is not caller', async () => {
        await contributorsDelegationContract.connect(contributor).delegate(contributorId, contributor.address);
        await expect(reportsContract.connect(contributor).update(reportId, HASH)).revertedWith(IS_CREATOR);
      });

      it('Should update report', async () => {
        const NEW_HASH = 'NEW_TEST';
        const lastUpdate = await reportsContract.lastUpdate();
        await reportsContract.connect(delegated).update(reportId, NEW_HASH);
        expect(await reportsContract.tokenURI(reportId)).to.equal(NEW_HASH);
        expect(await reportsContract.lastUpdate()).to.be.greaterThan(lastUpdate);
      });

      describe('Burn process', function () {
        it('Should not burn report since creator is not caller', async () => {
          await contributorsDelegationContract.connect(contributor).delegate(contributorId, contributor.address);
          await expect(reportsContract.connect(contributor).update(reportId, HASH)).revertedWith(IS_CREATOR);
        });
      });

    });
  });
});
