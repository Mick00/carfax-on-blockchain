import { ethers } from "ethers";

export const isValidAddress = (address: string) => {
  return ethers.utils.isAddress(address) || "The address is invalid";
};
