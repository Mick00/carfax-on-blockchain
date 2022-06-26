import { useCOBApi } from "../../components/COBProvider";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import {  Box, Button, Typography } from "@mui/material";
import ControlledTextField from "../../components/inputs/ControlledTextField";
import { isValidVin } from "../../components/inputs/rules";
import React, { useState } from "react";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";

export default function CarSearch() {
  const { cars, canRead } = useCOBApi();
  const { handleSubmit, control } = useForm();
  const [searchVin, setSearchVin] = useState("");
  const [carId, setCarId] = useState(0);

  const onSubmit = (data: any) => setSearchVin(data.vin);

  const {data: car, isLoading} = useQuery(["cars", searchVin], () =>
    canRead? cars().getOdometerFromSerialNumber(searchVin): Promise.resolve(BigNumber.from("0")),
    { enabled: canRead && Boolean(searchVin)}
  )

  return (
    <Box>
      <Typography gutterBottom>Search a car</Typography>
      <form>
        <ControlledTextField name={"vin"} label={"VIN"} control={control} required rules={{isValidVin}}/>
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>Search</Button>
      </form>
      {isLoading && (<Typography>Loading...</Typography>)}
      {car && (
        <Box>
          <Typography>Odometer: {formatUnits(car.toString(), 4)}</Typography>
        </Box>
      )}
    </Box>
  )
}
