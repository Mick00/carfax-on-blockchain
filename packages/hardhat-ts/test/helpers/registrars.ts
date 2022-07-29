import { bindings } from 'helpers/bindings';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

export const addRegistrar = async (registrar: string, xhre: THardhatRuntimeEnvironmentExtended) => {
  const token = await bindings('Token', xhre);
  const staking = await bindings('Staking', xhre);
  const MINT_AMOUNT = 10000;
  await token.mint(MINT_AMOUNT);
  await token.transfer(registrar, MINT_AMOUNT);
  const staker = await xhre.ethers.getSigner(registrar);
  await token.connect(staker).approve(staking.address, MINT_AMOUNT);
  await staking.connect(staker).stake(MINT_AMOUNT);
};

export const removeRegistrar = async (registrar: string, xhre: THardhatRuntimeEnvironmentExtended) => {};
