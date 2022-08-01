import '../helpers/hardhat-imports';
import './helpers/chai-imports';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Token, Token__factory, Staking, Staking__factory } from 'api/contract-types';
import { expect } from 'chai';
import hre from 'hardhat';

import { TOKEN_DEPLOYMENT } from '../deploy/04_Token';
import { STAKING_DEPLOYMENT } from '../deploy/05_Staking';

import { increaseTime } from './helpers/block';
import { UNSTAKE_PERIOD_NOT_OVER } from './helpers/errors';

const xhre = hre;
const { deployments, getNamedAccounts } = xhre;

describe('Staking', function () {
  let tokenContract: Token;
  let stakingContract: Staking;
  let deployer: SignerWithAddress;
  beforeEach(async function () {
    const { deployer: deployerAddress } = await getNamedAccounts();
    deployer = await xhre.ethers.getSigner(deployerAddress);
    await deployments.fixture([TOKEN_DEPLOYMENT, STAKING_DEPLOYMENT]);
    const deploymentToken = await deployments.get(TOKEN_DEPLOYMENT);
    const deploymentStaking = await deployments.get(STAKING_DEPLOYMENT);
    tokenContract = Token__factory.connect(deploymentToken.address, deployer);
    stakingContract = Staking__factory.connect(deploymentStaking.address, deployer);
  });

  it('Should give error since we didnt stake yet.', async () => {
    await expect(stakingContract.queueUnstake(100)).revertedWith('You do not have enough tokens to unstake');
  });

  it('Should give error since we didnt allow transfer.', async () => {
    await expect(stakingContract.stake(10)).revertedWith('ERC20: insufficient allowance');
  });

  it('Should stake 10 token', async () => {
    await tokenContract.mint(10);
    await tokenContract.approve(stakingContract.address, 10);
    await stakingContract.stake(10);
    expect(await stakingContract.getStake(deployer.address)).to.equal(10);
  });

  describe('Unstake process', function () {
    beforeEach(async function () {
      await tokenContract.mint(10);
      await tokenContract.approve(stakingContract.address, 10);
      await stakingContract.stake(10);
    });

    it('Should unstake 10 token', async () => {
      await stakingContract.queueUnstake(10);
      expect(await stakingContract.getStake(deployer.address)).to.equal(0);
      expect(await tokenContract.balanceOf(deployer.address)).to.equal(0);
      await increaseTime(xhre, (await stakingContract.UNSTAKE_TIME()).toNumber());
      await stakingContract.unstake();
      expect(await tokenContract.balanceOf(deployer.address)).to.equal(10);
    });

    it('Should not let unstake before unstake period end', async () => {
      await stakingContract.queueUnstake(10);
      await expect(stakingContract.unstake()).to.be.revertedWith(UNSTAKE_PERIOD_NOT_OVER);
    });
  });
});
