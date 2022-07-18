import React, { createContext, useContext, useEffect, useState } from "react";
import { Cars, ContractProvider, Contributors, ContributorsDelegation, Reports } from "@cars-on-blockchain/contracts";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
interface ICOBApi {
  contributors(): Contributors,
  contributorDelegation(): ContributorsDelegation,
  cars(): Cars,
  reports(): Reports,
  canRead: boolean,
  canWrite: boolean
}

const COBContext = createContext<ICOBApi>({
  contributors(): Contributors {
    throw new Error("No contract provider")
  },
  contributorDelegation(): ContributorsDelegation {
    throw new Error("No contract provider")
  },
  cars(): Cars {
    throw new Error("No contract provider")
  },
  reports(): Reports {
    throw new Error("No contract provider")
  },
  canRead: false,
  canWrite: false,
})

export default function COBProvider(props: React.PropsWithChildren) {

  const { chainId, connector, account, isActive } = useWeb3React();
  const defaultRPC = new JsonRpcProvider(process.env.REACT_APP_RPC_URL, 5)
  const [contracts, setContracts] = useState<ContractProvider>(new ContractProvider(defaultRPC, 5))
  const [canWrite, setCanWrite] = useState(false);
  const [canRead, setCanRead] = useState(true);

  useEffect(() => {
    if (isActive && connector.provider && chainId){
      const provider = new ethers.providers.Web3Provider(connector.provider)
      setContracts(new ContractProvider(provider.getSigner(account) as unknown as JsonRpcProvider, chainId))
      setCanRead(true);
      setCanWrite(true);
    } else {
      setContracts(new ContractProvider(new JsonRpcProvider(process.env.REACT_APP_RPC_URL), "5"))
      setCanRead(true);
      setCanWrite(false);
    }
  }, [account, chainId, connector.provider, isActive])

  const getContracts = () => {
    if (!contracts){
      throw new Error("No provider to make calls")
    }
    return contracts;
  }

  const contributors = () => getContracts().get("Contributors");

  const contributorDelegation = () => getContracts().get("ContributorsDelegation");

  const cars = () => getContracts().get("Cars");

  const reports = () => getContracts().get("Reports");

  return (
    <COBContext.Provider value={{
      contributors,
      contributorDelegation,
      cars,
      reports,
      canRead,
      canWrite
    }}>
          {props.children}
    </COBContext.Provider>
  )
}

export const useCOBApi = () => {
  return useContext(COBContext);
}
