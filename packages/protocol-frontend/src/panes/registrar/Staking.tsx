import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import ControlledTextField from "../../components/inputs/ControlledTextField";
import React from "react";
import { useWriteContract } from "../../components/hooks/useWriteContract";
import { useCOBApi } from "../../components/COBProvider";
import { useForm, useWatch } from "react-hook-form";
import RequireApproval from "../../components/RequireApproval";
import { useCFTBalance } from "../../components/hooks/useTokenBalance";

export default function Staking() {
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
