import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Panels  from "../../components/Panels";
import Minting from "./Minting";
import Staking from "./Staking";
import { useQuery } from "react-query";
import { useCOBApi } from "../../components/COBProvider";
import { useWeb3React } from "@web3-react/core";

export default function Registrar(){
  const {token, canRead} = useCOBApi()
  const {account} = useWeb3React();
  const {data: owner } = useQuery("contributors.owner", () =>
    token().owner(), { enabled: canRead}
  );

  return (
    <>
      <Typography variant={"h3"} sx={{textAlign:"center"}} gutterBottom>Registrar</Typography>
      <Panels panes={[
        {
          label: "Staking",
          component: (<Staking/>)
        },
        {
          label: "Minting",
          component: (<Minting/>),
          hide: account !== owner
        },
      ]}/>
    </>
  )
}
