import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import ControlledTextField from "../../components/inputs/ControlledTextField";
import React from "react";
import { useWriteContract } from "../../components/hooks/useWriteContract";
import { useCOBApi } from "../../components/COBProvider";
import { useForm, useWatch } from "react-hook-form";
import RequireApproval from "../../components/RequireApproval";
import { useCFTBalance } from "../../components/hooks/useTokenBalance";
import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";

export function Stake() {
  const { staking } = useCOBApi();
  const { handleSubmit, control, setError, clearErrors } = useForm();
  const quantity = useWatch({ control, name: "quantity" });
  const { data: balance } = useCFTBalance();

  const tx = useWriteContract((qt: string) => staking().stake(qt));

  const onSubmit = (data: any) => tx.mutate(data.quantity);

  return (
    <Box>
      <Typography>
        Stake token to become a registrar. The more tokens you have the better
        reputation you will get.
      </Typography>
      <form>
        <RequireApproval
          for={staking().address}
          quantity={quantity}
          hasEnoughAllowance={(hasEnough) =>
            hasEnough
              ? clearErrors("quantity")
              : setError("quantity", { message: "Requires approval" })
          }
        >
          <ControlledTextField
            name={"quantity"}
            label={"Quantity"}
            control={control}
            required
          />
        </RequireApproval>
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
          Stake
        </Button>
      </form>
    </Box>
  );
}

export function Unstake() {
  const { staking, canRead } = useCOBApi();
  const { account } = useWeb3React();
  const { handleSubmit, control } = useForm();

  const { data: stake } = useQuery(
    ["staking", "getStake", account],
    () => staking().getStake(account ?? ""),
    { enabled: canRead && Boolean(account) }
  );

  const tx = useWriteContract((quantity: string) =>
    staking().queueUnstake(quantity)
  );
  const onSubmit = (data: any) => tx.mutate(data.quantity);

  return (
    <Box>
      <Typography>Unstake tokens</Typography>
      <Typography>Your stake: {stake?.toString()}</Typography>
      <ControlledTextField
        name={"quantity"}
        label={"Quantity"}
        control={control}
        required
      />
      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Unstake
      </Button>
    </Box>
  );
}

export default function Staking() {
  return (
    <Stack divider={<Divider flexItem />} spacing={1}>
      <Stake />
      <Unstake />
    </Stack>
  );
}
