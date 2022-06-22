import React, { createContext, useContext, useEffect, useState } from "react";
import { Cars, ContractProvider, Contributors, ContributorsDelegation, Reports } from "@cob/contracts";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

interface ICOBApi {
  contributors(): Contributors,
  contributorDelegation(): ContributorsDelegation,
  cars(): Cars,
  reports(): Reports
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
})

export default function COBProvider(props: React.PropsWithChildren) {

  const { chainId, connector } = useWeb3React();
  const [contracts, setContracts] = useState<ContractProvider|null>(null)

  useEffect(() => {
    if (connector.provider && chainId){
      const provider = new ethers.providers.Web3Provider(connector.provider)
      setContracts(new ContractProvider(provider, chainId))
    } else {
      setContracts(null)
    }
  }, [chainId])

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
      reports
    }}>
          {props.children}
    </COBContext.Provider>
  )
}

export const useCOBApi = () => {
  return useContext(COBContext);
}
