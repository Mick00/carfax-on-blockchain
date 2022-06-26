import { useCOBApi } from "../../components/COBProvider";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";

interface IContributor {
  id: number,
  uri: string|null,
}

export default function ContributorsList() {
  const {contributors: contributorsFactory, canRead} = useCOBApi();
  const contributorsContract = contributorsFactory();
  const [ page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 5;

  const {data: contributors, isLoading, isError, error} = useQuery([`contributors.query`, page], async (): Promise<IContributor[]> => {
    if (canRead){
      const tokenIds = (await contributorsContract.getTokenIds()).toNumber();
      const queries = [];
      for (let i = 0; i < ITEMS_PER_PAGE && i + page * ITEMS_PER_PAGE + 1 <= tokenIds; i++){
        const tokenId = i + page * ITEMS_PER_PAGE + 1;
        queries.push(Promise.all([
          Promise.resolve(tokenId),
          contributorsContract.tokenURI(tokenId).catch(() => null),
          //contributorsContract.contributorRegistrar(tokenId)
        ]))
      }
      const queriesResults = await Promise.all(queries);
      return queriesResults.map(([id, uri]) => ({id, uri}))
    }
    return Promise.resolve([]);
  })

  if (!isLoading && (!contributors || isError)){
    return <Typography>An error happened. {String(error)}</Typography>
  }

  if ( isLoading) {
    return (<Typography>Loading contributors</Typography>)
  }

  return (
    <>
      {contributors.length === 0 && (
        <Box><Typography>No contributors found</Typography></Box>
      )}
      {contributors.map((contributor, i) => (
        <Box key={i}><Typography>#{contributor.id}, hash: {contributor.uri}</Typography></Box>
      ))}
    </>
  )
}
