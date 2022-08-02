import { useEffect, useState } from "react";
import { ERC20__factory } from "@cars-on-blockchain/contracts";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";
import { useCOBApi } from "../COBProvider";
import { useQuery } from "react-query";


export default function useTokenBalance(tokenAddress: string, user: string) {
  const [balance, setBalance] = useState(BigNumber.from("0"));
  const {connector} = useWeb3React();

  useEffect( () => {
    if (connector?.provider) {
      const contract = ERC20__factory.connect(tokenAddress, new ethers.providers.Web3Provider(connector.provider));
      contract.balanceOf(user).then(setBalance);
    }
  }, [tokenAddress, user, connector])
  return balance;
}


export function useCFTBalance(userAccount?: string){
  const {account: connectedAcccount} = useWeb3React();
  const account = userAccount ?? connectedAcccount ?? "";
  const {token, canRead} = useCOBApi();
  return useQuery(["token", "balanceOf", account], () => token().balanceOf(account), {
    enabled: canRead
  });
}
