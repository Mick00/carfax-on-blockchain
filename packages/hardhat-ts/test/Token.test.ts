import '../helpers/hardhat-imports';
import './helpers/chai-imports';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { Token, Token__factory } from 'api/contract-types';
import hre from 'hardhat';

import { TOKEN_MAX_SUPPLY, BURN_EXCEED, TOKEN_MAX_SUPPLY_REACHED, ONLY_OWNER } from './helpers/errors';

import { TOKEN_DEPLOYMENT } from '../deploy/05_Token';

import { equal } from 'assert';

const xhre = hre;
const { deployments, getNamedAccounts, getUnnamedAccounts } = xhre;

describe('Token', function () {
  let tokenContract: Token;
  let deployer: SignerWithAddress;
  let alice: SignerWithAddress;

  beforeEach(async function () {
    const { deployer: deployerAddress } = await getNamedAccounts();
    const accounts = await getUnnamedAccounts();
    deployer = await xhre.ethers.getSigner(deployerAddress);
    alice = await xhre.ethers.getSigner(accounts[0]);
    await deployments.fixture([TOKEN_DEPLOYMENT]);
    const deployment = await deployments.get(TOKEN_DEPLOYMENT);
    tokenContract = Token__factory.connect(deployment.address, deployer);
  });

  it('Should return MAX_SUPPLY', async () => {
    expect(await tokenContract.MAX_SUPPLY()).to.equal(TOKEN_MAX_SUPPLY);
  });

  it("Should only let owner use contract's functions", async () => {
    await expect(tokenContract.connect(alice).mint(1)).revertedWith(ONLY_OWNER);
    await expect(tokenContract.connect(alice).burn(1)).revertedWith(ONLY_OWNER);
  });

  describe('Mint process', function () {
    it('Should mint tokens', async () => {
      await tokenContract.mint(10);
      expect(await tokenContract.balanceOf(deployer.address)).to.equal(10);
    });

    it('Should not mint tokens since above MAX_SUPPLY', async () => {
      await expect(tokenContract.mint(TOKEN_MAX_SUPPLY + 10)).revertedWith(TOKEN_MAX_SUPPLY_REACHED)
    });

    describe('Burn process', function () {
      beforeEach(async function () {
        await tokenContract.mint(10);
      });
      it("Should burn deployer's tokens", async () => {
        await tokenContract.burn(10);
        expect(await tokenContract.balanceOf(deployer.address)).to.equal(0);
      });
      it("Should throw error since burning more token than deployer's balance", async () => {
        await expect(tokenContract.burn(100)).revertedWith(BURN_EXCEED);
      });
    });
  });
});
