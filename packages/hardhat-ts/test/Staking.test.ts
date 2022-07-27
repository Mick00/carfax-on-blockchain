import '../helpers/hardhat-imports';
import './helpers/chai-imports';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { Token, Token__factory, Staking, Staking__factory } from 'api/contract-types';
import hre from 'hardhat';

import { TOKEN_MAX_SUPPLY, BURN_EXCEED, TOKEN_MAX_SUPPLY_REACHED, ONLY_OWNER } from './helpers/errors';

import { TOKEN_DEPLOYMENT } from '../deploy/04_Token';
import { STAKING_DEPLOYMENT } from '../deploy/05_Staking';

import { equal } from 'assert';

const xhre = hre;
const { deployments, getNamedAccounts, getUnnamedAccounts } = xhre;

describe('Staking', function () {
  let tokenContract: Token;
  let stakingContract: Staking;
  let deployer: SignerWithAddress;
  let alice: SignerWithAddress;

  beforeEach(async function () {
    const { deployer: deployerAddress } = await getNamedAccounts();
    const accounts = await getUnnamedAccounts();
    deployer = await xhre.ethers.getSigner(deployerAddress);
    alice = await xhre.ethers.getSigner(accounts[0]);
    await deployments.fixture([TOKEN_DEPLOYMENT, STAKING_DEPLOYMENT]);
    const deploymentToken = await deployments.get(TOKEN_DEPLOYMENT);
    const deploymentStaking = await deployments.get(STAKING_DEPLOYMENT);
    tokenContract = Token__factory.connect(deploymentToken.address, deployer);
    stakingContract = Staking__factory.connect(deploymentStaking.address, deployer);
  });

  it('Should give error since we didnt staked yet.', async () => {
    await expect(stakingContract.removeStake(100)).revertedWith('You do not have enough tokens to unstake');
  });

  it('Should give error since we didnt allow transfer.', async () => {
    await expect(stakingContract.stake(10)).revertedWith('ERC20: insufficient allowance');
  });

  it('Should stake 10 token', async () => {
    await tokenContract.mint(10);
    await tokenContract.approve(stakingContract.address,10);
    await stakingContract.stake(10);
    expect(await stakingContract.getStake(deployer.address)).to.equal(10);
  });

  describe('Unstake process', function () {
    beforeEach(async function () {
      await tokenContract.mint(10);
      await tokenContract.approve(stakingContract.address,10);
      await stakingContract.stake(10);
    });

    it('Should unstake 10 token', async () => {
      await stakingContract.removeStake(10);
      expect(await stakingContract.getStake(deployer.address)).to.equal(0);
    });
  
  });
});
