import { useCOBApi } from "../../components/COBProvider";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import {  Box, Button, Typography } from "@mui/material";
import ControlledTextField from "../../components/inputs/ControlledTextField";
import { isValidVin } from "../../components/inputs/rules";
import React, { useState } from "react";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import IPFSFile from "../../components/IPFSFile";

export default function CarSearch() {
  const { cars, canRead } = useCOBApi();
  const { handleSubmit, control } = useForm();
  const [vin, setVin] = useState("");
  const [carId, setCarId] = useState(0);

  const onSubmit = (data: any) => setVin(data.vin);

  const {data: odometer, isLoading: isLoadingOdometer } = useQuery(["cars", "odometer", vin], () =>
    cars().getOdometerFromSerialNumber(vin),
    { enabled: canRead && Boolean(vin)}
  )

  const {data: uri, isLoading: isLoadingURI} = useQuery(["cars", "URI", vin], () =>
      cars().getTokenURIFromSerialNumber(vin),
    { enabled: canRead && Boolean(vin)}
  )

  const isLoading = isLoadingOdometer || isLoadingURI;

  return (
    <Box>
      <Typography gutterBottom>Search a car</Typography>
      <form>
        <ControlledTextField name={"vin"} label={"VIN"} control={control} required rules={{isValidVin}}/>
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>Search</Button>
      </form>
      {isLoading && (<Typography>Loading...</Typography>)}
      {!uri && !odometer && (<Typography>No cars found</Typography>)}
      {odometer && (
        <Box mt={1}>
          <IPFSFile hash={uri??""}><Typography>Uri: {uri}</Typography></IPFSFile>
          <Typography>Odometer: {formatUnits(odometer.toString(), 4)}</Typography>
        </Box>
      )}
    </Box>
  )
}
