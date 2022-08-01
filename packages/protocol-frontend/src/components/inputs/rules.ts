import { ethers } from "ethers";

export const isValidAddress = (address: string) => {
  return ethers.utils.isAddress(address) || "The address is invalid";
};

const vinRegex = RegExp('^[(A-H|J-N|P|R-Z|0-9)]{17}$');
export const isValidVin = (vin: string) => {
  return true;
}

const EXAMPLE_VALID_VIN = "SALVA2AE4EH877322"

const intRegex = RegExp('^[0-9]*$')
export const isInt = (value: string) => {
  return intRegex.test(value) || "This needs to be an integer value";
}

const floatRegex = RegExp('^([0-9])*(\.[0-9]+)?$');
export const isFloat = (value: string) => {
  return floatRegex.test(value) || "This needs to be a floating point value";
}
