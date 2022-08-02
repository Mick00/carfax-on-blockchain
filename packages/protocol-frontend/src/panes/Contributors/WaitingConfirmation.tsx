import { useCOBApi } from "../../components/COBProvider";
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useWriteContract } from "../../components/hooks/useWriteContract";
import { useQuery } from "react-query";
import IPFSFile from "../../components/IPFSFile";

interface IContributor {
  registrar: string;
  address: string;
  hash: string;
}

export default function WaitingConfirmation() {
  const { contributors: contributorsFactory, canRead } = useCOBApi();
  const { account } = useWeb3React();
  const contributorsContract = contributorsFactory();
  const [waiting, setWaiting] = useState<IContributor[]>([]);
  const [confirmed, setConfirmed] = useState<IContributor[]>([]);

  const confirmRegistration = useWriteContract((registrar: string) =>
    contributorsContract.confirmRegistration(registrar)
  );

  const handleConfirmation = (registration: IContributor) => {
    confirmRegistration.mutate(registration.registrar);
  };

  const { data: registrations, isLoading: isLoadingRegistrations } = useQuery(
    `contributors.events.registered.${account}`,
    async (): Promise<IContributor[]> => {
      const filter = contributorsContract.filters["Registered"](null, account);
      const registeredEvents = await contributorsContract.queryFilter(filter);
      return registeredEvents.map((event) => ({
        registrar: event.args.registrar,
        address: event.args.contributor,
        hash: event.args.contributorHash,
      }));
    },
    { enabled: canRead }
  );

  const { data: registrationStatus, isLoading } = useQuery(
    ["contributors.iswaiting", registrations],
    async () => {
      if (registrations) {
        return Promise.all(
          registrations.map((registration) =>
            contributorsContract.waitingForConfirmation(
              registration.registrar,
              registration.address
            )
          )
        );
      }
      return [];
    },
    { enabled: registrations && registrations.length > 0 }
  );

  useEffect(() => {
    if (registrationStatus && registrations) {
      const waitingRegistrations: IContributor[] = [];
      const confirmedRegistrations: IContributor[] = [];
      registrationStatus.forEach((waiting, i) => {
        if (Boolean(waiting)) {
          waitingRegistrations.push(registrations[i]);
        } else {
          confirmedRegistrations.push(registrations[i]);
        }
      });
      setConfirmed(confirmedRegistrations);
      setWaiting(waitingRegistrations);
    }
  }, [registrationStatus, registrations]);

  if (isLoadingRegistrations || isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Stack spacing={1} divider={<Divider flexItem />}>
      <Box>
        <Typography variant={"h4"}>Already confirmed</Typography>
        {confirmed.length === 0 && (
          <Typography>No registration have been confirmed</Typography>
        )}
        {confirmed.map((contributor, i) => (
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            key={i}
          >
            <Typography>Registered by {contributor.registrar}</Typography>
            <Stack direction={"row"} spacing={1}>
              <IPFSFile
                hash={contributor.hash}
                clickable={(cb) => <Button onClick={cb}>View</Button>}
              />
            </Stack>
          </Stack>
        ))}
      </Box>
      <Box>
        <Typography variant={"h4"}>Waiting for confirmations</Typography>
        {waiting.length === 0 && (
          <Typography>No registration waiting for confirmation</Typography>
        )}
        <Stack spacing={1}>
          {waiting.map((contributor, i) => (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              key={i}
            >
              <Typography>
                {contributor.registrar} is waiting for you to confirm your
                identity
              </Typography>
              <Stack direction={"row"} spacing={1}>
                <IPFSFile
                  hash={contributor.hash}
                  clickable={(cb) => <Button onClick={cb}>View</Button>}
                />
                <Button
                  variant={"contained"}
                  onClick={() => handleConfirmation(contributor)}
                >
                  Confirm
                </Button>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}
