import { useCOBApi } from "../../components/COBProvider";
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import { useQuery } from "react-query";
import { useWriteContract } from "../../components/hooks/useWriteContract";
import { Box, Button, Typography } from "@mui/material";
import ControlledTextField from "../../components/inputs/ControlledTextField";
import { isValidAddress } from "../../components/inputs/rules";
import TransactionState from "../../components/TransactionState";
import React from "react";

export default function Registration() {
  const { contributors, canRead } = useCOBApi();
  const { handleSubmit, control } = useForm();
  const { account } = useWeb3React();

  const {data: isRegistrar, isLoading} = useQuery(
    `contributors.registrars.${account}`,
    () => canRead && account? contributors().registrars(account): false
  )


  const registerContributor = useWriteContract((input:{ hash: string, contributor: string }) => contributors().register(input.hash, input.contributor))

  const onSubmit = (data: any) => registerContributor.mutate(data);

  if (!isRegistrar) {
    return <Typography>Only registrars can register new contributors</Typography>
  }
  return (
    <Box>
      <Typography gutterBottom>Register a new contributor</Typography>
      <form>
        <ControlledTextField name={"contributor"} label={"Address"} control={control} rules={{isValidAddress}}/>
        <ControlledTextField name={"hash"} label={"IPFS hash"} control={control} min={0}/>
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>Register</Button>
      </form>
      <TransactionState transaction={registerContributor}/>
    </Box>
  )
}
