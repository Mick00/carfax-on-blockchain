import { ContractTransaction } from 'ethers';

export async function waitTx(fn: () => Promise<ContractTransaction>) {
  try {
    const tx = await fn();
    if (process.env.HARDHAT_TARGET_NETWORK !== 'hardhat') {
      await tx.wait(2);
    }
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
}

export async function exec(fn: () => Promise<ContractTransaction>) {
  let success = false;
  const maxAttempts = 3;
  for (let i = 0; i < maxAttempts && !success; i++) {
    success = await waitTx(fn);
  }
}
