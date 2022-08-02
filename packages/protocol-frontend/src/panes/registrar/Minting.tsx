import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useCOBApi } from "../../components/COBProvider";
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import ControlledTextField from "../../components/inputs/ControlledTextField";
import React from "react";
import { useWriteContract } from "../../components/hooks/useWriteContract";

export default function Minting(){

  const {token, canRead} = useCOBApi()
  const {account} = useWeb3React();
  const { handleSubmit, control } = useForm();
  const {data: owner } = useQuery("contributors.owner", () =>
    token().owner(), { enabled: canRead}
  );

  const tx = useWriteContract((qt: string) => token().mint(qt));

  const onSubmit = (data: any) => tx.mutate(data.quantity)

  return (
    <Box>
      <Typography>Mint new tokens</Typography>
      {owner === account && (
        <form>
          <ControlledTextField name={"quantity"} label={"Quantity"} control={control} required/>
          <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>Mint</Button>
        </form>
      )}
    </Box>
  )
}
