import { useCOBApi } from "../../components/COBProvider";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

interface IContributor {
  registrar: string,
  address: string,
  hash: string,
}

export default function ContributorsList() {
  const {contributors: contributorsFactory, canRead} = useCOBApi();
  const contributorsContract = contributorsFactory();
  const [contributors, setContributors] = useState<IContributor[]>([]);

  useEffect(() => {
    if (canRead){
      const filter = contributorsContract.filters['Registered']();
      contributorsContract.queryFilter(filter).then(registeredEvents => {
        const registration = registeredEvents.map((event) => ({
          registrar: event.args.registrar,
          address: event.args.contributor,
          hash: event.args.contributorHash
        }))
        setContributors(registration);
      });
    }
  })

  return (
    <>
      {contributors.length === 0 && (
        <Box><Typography>No contributors found</Typography></Box>
      )}
      {contributors.map((contributor) => (
        <Box><Typography>{contributor.address} registered by {contributor.registrar}</Typography></Box>
      ))}
    </>
  )
}
