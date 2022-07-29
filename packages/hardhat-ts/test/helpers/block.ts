import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

export const increaseTime = async (hre: THardhatRuntimeEnvironmentExtended, seconds: number, blocks = 1) => {
  await hre.network.provider.request({
    method: 'evm_increaseTime',
    params: [seconds],
  });
  await mine(hre, blocks);
};

export const mine = async (hre: THardhatRuntimeEnvironmentExtended, blocks = 1) => {
  for (let i = 0; i < blocks; i++) {
    await hre.network.provider.request({
      method: 'evm_mine',
    });
  }
};
