import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Panels from "../../components/Panels";
import Minting from "./Minting";
import Staking from "./Staking";
import { useQuery } from "react-query";
import { useCOBApi } from "../../components/COBProvider";
import { useWeb3React } from "@web3-react/core";
import Unstake from "./Unstaking";
import RegistrarsList from "./RegistrarsList";

export default function Registrar() {
  const { token, canRead } = useCOBApi();
  const { account } = useWeb3React();
  const { data: owner } = useQuery(
    "contributors.owner",
    () => token().owner(),
    { enabled: canRead }
  );

  return (
    <>
      <Typography variant={"h3"} sx={{ textAlign: "center" }} gutterBottom>
        Registrar
      </Typography>
      <Panels
        panes={[
          {
            label: "List",
            component: <RegistrarsList />,
          },
          {
            label: "Staking",
            component: <Staking />,
          },
          {
            label: "Unstaking",
            component: <Unstake />,
          },
          {
            label: "Minting",
            component: <Minting />,
            hide: account !== owner,
          },
        ]}
      />
    </>
  );
}
