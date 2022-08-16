import { useQuery } from "react-query";
import { useCOBApi } from "../../components/COBProvider";
import { BigNumber } from "ethers";
import { Box, Card, Stack, Typography } from "@mui/material";

interface BalanceUpdate {
  stake: BigNumber;
  staker: string;
  at: number;
}

export default function RegistrarsList() {
  const { staking, canRead } = useCOBApi();
  const { data: balanceUpdateEvents } = useQuery(
    ["staking", "stakeUpdated"],
    () => {
      const filter = staking().filters["StakeUpdated"]();
      return staking().queryFilter(filter);
    },
    {
      enabled: canRead,
      staleTime: 5000,
    }
  );
  const balanceUpdate = balanceUpdateEvents ?? [];
  const balancesPerRegistrar = balanceUpdate
    .map((event) => ({
      stake: event.args[1],
      staker: event.args[0],
      at: event.blockNumber,
    }))
    .reduce((acc, update) => {
      if (acc[update.staker] && acc[update.staker].at < update.at) {
        acc[update.staker] = update;
      } else {
        acc[update.staker] = update;
      }
      return acc;
    }, {} as { [k: string]: BalanceUpdate });

  const balances = Object.values(balancesPerRegistrar)
    .sort((b0, b1) => {
      if (b0.stake.gt(b1.stake)) {
        return -1;
      }
      if (b0.stake.lt(b1.stake)) {
        return 1;
      }
      return 0;
    })
    .filter((bal) => bal.stake.gt(0));

  return (
    <Stack spacing={1}>
      {balances.map((balance, i) => (
        <Card key={i}>
          <Box py={1} px={2}>
            <Typography>
              #{i + 1} {balance.staker} is staking {balance.stake?.toString()}
            </Typography>
          </Box>
        </Card>
      ))}
    </Stack>
  );
}
