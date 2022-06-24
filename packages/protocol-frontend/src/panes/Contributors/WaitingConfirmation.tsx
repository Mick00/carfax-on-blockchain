import { useCOBApi } from "../../components/COBProvider";
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useWriteContract } from "../../components/hooks/useWriteContract";
import { useQuery } from "react-query";

interface IContributor {
  registrar: string,
  address: string,
  hash: string,
}

export default function WaitingConfirmation() {
  const {contributors: contributorsFactory, canRead} = useCOBApi();
  const {account} = useWeb3React();
  const contributorsContract = contributorsFactory();

  const confirmRegistration = useWriteContract((registrar: string) => contributorsContract.confirmRegistration(registrar))

  const handleConfirmation = (address: string) => {
    confirmRegistration.mutate(address);
  }

  const {data: waitingConfirmation, isLoading} = useQuery(`contributors.events.registered.${account}`, async (): Promise<IContributor[]> => {
    if (canRead){
      const filter = contributorsContract.filters['Registered'](null, account);
      const registeredEvents = await contributorsContract.queryFilter(filter)
      const registrations = registeredEvents.map((event) => ({
            registrar: event.args.registrar,
            address: event.args.contributor,
            hash: event.args.contributorHash
          }));
      const isWaiting = await Promise.all(registrations.map((registration) => contributorsContract.waitingForConfirmation(registration.registrar, registration.address)));
      return registrations.filter((registration, i) => Boolean(isWaiting[i]));
    }
    return Promise.resolve([]);
  })

  if (isLoading) {
    return (<Typography>Loading...</Typography>)
  }

  if (!waitingConfirmation || waitingConfirmation.length == 0){
    return (
      <Typography>No registration waiting for confirmation</Typography>
    );
  }
  return (
    <>
      <Box>
        {waitingConfirmation.map((contributor) => (
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Typography>You have been registered by {contributor.registrar}</Typography>
            <Stack direction={"row"} spacing={1}>
              <Button>View</Button>
              <Button variant={"contained"} onClick={() => handleConfirmation(contributor.registrar)}>Confirm</Button>
            </Stack>
          </Stack>
        ))}
      </Box>
    </>
  )
}
