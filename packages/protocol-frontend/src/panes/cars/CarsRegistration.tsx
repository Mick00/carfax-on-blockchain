import { useCOBApi } from "../../components/COBProvider";
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import { useQuery } from "react-query";
import { useWriteContract } from "../../components/hooks/useWriteContract";
import { Alert, Box, Button, Typography } from "@mui/material";
import ControlledTextField from "../../components/inputs/ControlledTextField";
import { isValidAddress, isValidVin } from "../../components/inputs/rules";
import TransactionState from "../../components/TransactionState";
import React from "react";
import { ethers } from "ethers";

export default function CarsRegistration() {
  const { cars, canWrite } = useCOBApi();
  const { handleSubmit, control } = useForm();

  const registerCar = useWriteContract((input:{ vin: string, odometer: string, hash: string }) => cars().register(input.vin, ethers.utils.parseUnits(input.odometer, 4) , input.hash))

  const onSubmit = (data: any) => registerCar.mutate(data);

  return (
    <Box>
      <Typography gutterBottom>Register a car</Typography>
      {!canWrite && <Alert severity={"info"}>Your account must be connected to register a car</Alert>}
      <form>
        <ControlledTextField name={"vin"} label={"VIN"} control={control} required rules={{isValidVin}}/>
        <ControlledTextField name={"odometer"} label={"Odometer"} required min={0} type={"float"} control={control}/>
        <ControlledTextField name={"hash"} label={"IPFS hash"} required control={control}/>
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"} disabled={!canWrite}>Register</Button>
      </form>
      <TransactionState transaction={registerCar}/>
    </Box>
  )
}
