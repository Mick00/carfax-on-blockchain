import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import type { Connector } from '@web3-react/types'
import { hooks , metaMask } from './metamask-connector'
import React, { useEffect } from "react";
import { useSnackBar } from "../SnackBarProvider";
import { AVAILABLE_NETWORK } from "@cars-on-blockchain/contracts";

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask'
  if (connector instanceof Network) return 'Network'
  return 'Unknown'
}

const connectors: [MetaMask | Network, Web3ReactHooks][] = [
  [metaMask, hooks]
]


export default function Web3Provider(props: React.PropsWithChildren) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Connection>
        {props.children}
      </Connection>
    </Web3ReactProvider>
  )
}

const {useChainId} = hooks;

function Connection(props: React.PropsWithChildren){

  const chainId = useChainId();

  const { alertError } = useSnackBar();

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.log('Failed to connect eagerly to metamask')
    })
  }, [])

  useEffect(() => {
    if (chainId && !AVAILABLE_NETWORK.includes(chainId)){
      alertError(`Please use network ${AVAILABLE_NETWORK.join(", ")}`)
    }
  }, [chainId])

  return (<>{props.children}</>)
}
