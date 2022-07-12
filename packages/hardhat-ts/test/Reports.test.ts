import '../helpers/hardhat-imports';
import './helpers/chai-imports';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  Cars,
  Cars__factory,
  Contributors,
  Contributors__factory,
  ContributorsDelegation,
  ContributorsDelegation__factory,
  Reports,
  Reports__factory,
} from 'api/contract-types';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import hre from 'hardhat';

import { CONTRIBUTORS_DEPLOYMENT } from '../deploy/00_Contributors';
import { CONTRIBUTORSDELEGATION_DEPLOYMENT } from '../deploy/01_ContributorsDelegation';
import { CARS_DEPLOYMENT } from '../deploy/02_Cars';
import { REPORTS_DEPLOYMENT } from '../deploy/03_Reports';

import { IS_EXISTENT_TOKEN, ONLY_OWNER, IS_DELEGATED } from './helpers/errors';

const xhre = hre;
const { deployments, getNamedAccounts, getUnnamedAccounts } = xhre;

describe('Reports', function () {
  let contributorsContract: Contributors;
  let contributorsDelegationContract: ContributorsDelegation;
  let carsContract: Cars;
  let reportsContract: Reports;
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
    carsContract = Cars__factory.connect(deploymentCars.address, deployer);
    contributorsDelegationContract = ContributorsDelegation__factory.connect(deploymentContributorsDelegation.address, deployer);
    reportsContract = Reports__factory.connect(deploymentReports.address, deployer);
  });

  it('Should let only owner set contributors', async () => {
    await expect(reportsContract.connect(contributor).setContributorsDelegation(contributorsDelegationContract.address)).revertedWith(ONLY_OWNER);
  });

  it('Should let only owner set cars', async () => {
    await expect(reportsContract.connect(contributor).setCars(carsContract.address)).revertedWith(ONLY_OWNER);
  });

  it('Should return 0 since no nonexistent report', async () => {
    expect(await reportsContract.getCarForReport(0)).to.equal(0);
  });

  it('Should return empty array since nonexistent car', async () => {
    const reports = await reportsContract.getReportsForCar(0);
    expect(reports).to.be.instanceOf(Array);
    expect(reports).to.have.length.lessThanOrEqual(0);
  });

  it('Should return 0 for nonexistent report', async () => {
    await expect(reportsContract.getCreator(0)).revertedWith(IS_EXISTENT_TOKEN);
  });

  describe('Create report process', function () {
    let carId: BigNumber;
    let contributorId: BigNumber;
    let reportId: BigNumber;
    const HASH = 'TEST';

    const SERIALNUMBER = 'ABC-123';
    const ODOMETER = 123;
    const CARHASH = 'CAR-HASH';
    beforeEach(async () => {
      await contributorsContract.addRegistrar(registrar.address);
      await contributorsContract.connect(registrar).register(HASH, contributor.address);
      await contributorsContract.connect(contributor).confirmRegistration(registrar.address);
      contributorId = await contributorsContract.getTokenIds();
      await contributorsDelegationContract.setContributorsContract(contributorsContract.address);
      await contributorsDelegationContract.connect(contributor).delegate(contributorId, delegated.address);

      await carsContract.connect(delegated).register(SERIALNUMBER, ODOMETER, CARHASH);
      carId = await carsContract.getTokenIds();
    });

    it('Should create a new report', async () => {
      await reportsContract.connect(delegated).create(carId, HASH);
      reportId = await reportsContract.getTokenIds();
      expect(reportId).to.equal(1);
      expect(await reportsContract.getTokenIds()).to.equal(1);
      expect(await reportsContract.getCreator(reportId)).to.equal(contributor.address);
      expect(await reportsContract.getReportsForCar(carId)).to.eql([reportId]);
      expect(await reportsContract.getCarForReport(reportId)).to.equal(carId);
      expect(await reportsContract.tokenURI(reportId)).to.equal(HASH);
    });

    it('Should change ownerOf reports if Contributor nft is transferred', async () => {
      await reportsContract.connect(delegated).create(carId, HASH);
      reportId = await reportsContract.getTokenIds();
      expect(await reportsContract.getCreator(reportId)).to.equal(contributor.address);
      // await contributorsContract.approve(delegated.address, reportId);
      await contributorsContract.connect(contributor)['safeTransferFrom(address,address,uint256)'](contributor.address, delegated.address, reportId);
      expect(await reportsContract.getCreator(reportId)).to.equal(delegated.address);
    });

    it('Should create multiple report', async () => {
      const reportsIds = [];
      for (let i = 0; i < 10; i++) {
        await reportsContract.connect(delegated).create(carId, HASH);
        reportsIds.push(await reportsContract.getTokenIds());
      }
      expect(await reportsContract.getReportsForCar(carId)).to.eql(reportsIds);
    });

    it('Should not create report since caller is not delegated', async () => {
      await expect(reportsContract.connect(deployer).create(carId, HASH)).revertedWith(IS_DELEGATED);
    });

    it('Should not create report since car is not valid', async () => {
      await expect(reportsContract.connect(delegated).create(2, HASH)).revertedWith(IS_EXISTENT_TOKEN);
    });

    describe('Update process', function () {
      beforeEach(async () => {
        await reportsContract.connect(delegated).create(carId, HASH);
        reportId = await reportsContract.getTokenIds();
      });

      it('Should not update report since caller is not delegated', async () => {
        await expect(reportsContract.connect(contributor).update(reportId, HASH)).revertedWith(IS_DELEGATED);
      });

      it('Should update report', async () => {
        const NEW_HASH = 'NEW_TEST';
        await reportsContract.connect(delegated).update(reportId, NEW_HASH);
        expect(await reportsContract.tokenURI(reportId)).to.equal(NEW_HASH);
      });

      describe('Burn process', function () {
        it('Should not burn report since caller is not delegated', async () => {
          await expect(reportsContract.connect(contributor).burn(reportId, 'test')).revertedWith(IS_DELEGATED);
        });

        it('Should burn the report since caller is delegated', async () => {
          await reportsContract.connect(delegated).burn(reportId, 'test');
          await expect(reportsContract.getCreator(reportId)).revertedWith(IS_EXISTENT_TOKEN);
        });
      });
    });
  });
});
