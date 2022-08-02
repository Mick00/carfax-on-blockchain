import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { ERC20__factory } from "@cars-on-blockchain/contracts";
import { ethers } from "ethers";
import { Box, Stack, Typography } from "@mui/material";
import useTokenBalance from "./hooks/useTokenBalance";

interface BalanceProps {
  token: string,
  account: string,
  symbol?: string,
}

export default function Balance(props: BalanceProps){
  const {isActive, connector} = useWeb3React();

  const balance = useTokenBalance(props.token, props.account)
  const {data: symbol} = useQuery([props.token, "symbol"],
    async () => {
      if (connector?.provider){
        const provider = new ethers.providers.Web3Provider(connector.provider)
        const contract = ERC20__factory.connect(props.token, provider);
        return contract.symbol()
      }
      return ""
    }, {
    enabled: isActive && Boolean(connector?.provider)
    }
  )

  return (
    <Stack direction={"row"} spacing={1}>
      <Typography>
        {balance.toString()}
      </Typography>
      <Typography>
        {symbol}
      </Typography>
    </Stack>)
}
