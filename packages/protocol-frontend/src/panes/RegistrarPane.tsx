import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { ethers } from "ethers";
import { useCOBApi } from "../components/COBProvider";
import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { useWriteContract } from "../components/hooks/useWriteContract";

function AddRegistrar() {
  const { contributors } = useCOBApi();
  const [address, setAddress] = useState("");
  const [invalid, setInvalid] = useState(false);

  const handleAddress = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const newAddress = event.target.value;
    setInvalid(!ethers.utils.isAddress(newAddress));
    setAddress(newAddress);
  }

  const addRegistrar = useWriteContract((address: string) => contributors().addRegistrar(address))

  const handleAdd = () => addRegistrar.mutate(address)

    return (
  <>
    <TextField label="Add a registrar"
               variant="outlined"
               value={address}
               onChange={handleAddress}
               helperText={invalid?"The address is invalid": false}
               error={invalid}/>
    <Button variant={"contained"} disabled={invalid} onClick={handleAdd}>Add</Button>
    {addRegistrar.isError && <p>Failed to add</p>}
    {addRegistrar.isWaitingOnInput && <p>Waiting for input...</p>}
    {(addRegistrar.isSubmitted && !addRegistrar.isConfirmed) && <p>Waiting for confirmation...</p>}
    {addRegistrar.isConfirmed && <p>Transaction confirmed</p>}
  </>
  )
}

export default function RegistrarPane() {
  const { contributors, canRead } = useCOBApi();
  const {account} = useWeb3React();
  const {data: owner, isLoading } = useQuery("contributors.owner", () =>
    canRead? contributors().owner(): null
  );

  return (
    <>
      <Box py={4}>
        <Typography variant={"h3"} gutterBottom>Registrar</Typography>
        <Stack direction={"row"} spacing={1}>
          {!isLoading && account !== owner && <Typography>Only owner can add a registrar</Typography>}
          {!isLoading && account === owner && <AddRegistrar />}
        </Stack>
      </Box>
    </>
  )
}
