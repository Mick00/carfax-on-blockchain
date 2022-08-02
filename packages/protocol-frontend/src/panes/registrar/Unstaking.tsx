import { useCOBApi } from "../../components/COBProvider";
import { useWeb3React } from "@web3-react/core";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useWriteContract } from "../../components/hooks/useWriteContract";
import { Box, Button, Stack, Typography } from "@mui/material";
import ControlledTextField from "../../components/inputs/ControlledTextField";
import React, { useEffect } from "react";
import { BigNumber } from "ethers";

export default function Unstake() {
  const { staking, canRead } = useCOBApi();
  const { account } = useWeb3React();
  const { handleSubmit, control } = useForm();

  const { data: stake, refetch: refetchStake } = useQuery(
    ["staking", "getStake", account],
    () => staking().getStake(account ?? ""),
    { enabled: canRead && Boolean(account) }
  );

  const { data: unstakeQueue, refetch: refetchUnstakeQueue } = useQuery(
    ["staking", "unstakeQueue", account],
    () => staking().unstakeQueue(account ?? ""),
    { enabled: canRead && Boolean(account) }
  );
  const AMOUNT = 0;
  const QUEUED_AT = 1;
  const isUnstaking = unstakeQueue ? unstakeQueue[AMOUNT].gt(0) : false;

  const { data: unstakeTime } = useQuery(
    ["staking", "UNSTAKE_TIME"],
    () => staking().UNSTAKE_TIME(),
    { staleTime: Infinity }
  );

  const getUnlockTime = () => {
    if (unstakeQueue && unstakeQueue.length === 2) {
      const timestamp = unstakeQueue[QUEUED_AT].add(unstakeTime ?? 0)
        .mul(1000)
        .toNumber();
      return new Date(timestamp);
    }
    return new Date();
  };

  const queueTx = useWriteContract((quantity: string) =>
    staking().queueUnstake(quantity)
  );
  const onSubmitQueue = (data: any) => queueTx.mutate(data.quantity);

  useEffect(() => {
    refetchStake();
    refetchUnstakeQueue();
  }, [queueTx.isConfirmed]);

  const unstakeTx = useWriteContract((data: any) => staking().unstake());

  return (
    <Stack spacing={1}>
      <Box>
        <Typography variant={"h4"}>Queue unstake</Typography>
        <Typography>Your current stake: {stake?.toString()}</Typography>
        <Typography>Unstaking requires a waiting period of 7 days</Typography>
        <ControlledTextField
          name={"quantity"}
          label={"Quantity"}
          control={control}
          required
        />
        <Button onClick={handleSubmit(onSubmitQueue)} variant={"contained"}>
          Queue
        </Button>
      </Box>
      <Box>
        <Typography variant={"h4"}>Unstake</Typography>
        {!isUnstaking && (
          <Typography>You are currently not queued to unstake</Typography>
        )}
        {isUnstaking && unstakeQueue && (
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography>
              {unstakeQueue[AMOUNT].toString()} CFT unlocking at{" "}
              {getUnlockTime().toLocaleString()}
            </Typography>
            <Button
              onClick={() => unstakeTx.mutate({})}
              disabled={getUnlockTime().getTime() > Date.now()}
              variant={"contained"}
            >
              Unstake
            </Button>
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
