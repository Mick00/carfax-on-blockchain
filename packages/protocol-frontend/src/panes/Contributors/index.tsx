import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Panels  from "../../components/Panels";
import Registration from "./Registration";
import ContributorsList from "./ContributorsList";
import WaitingConfirmation from "./WaitingConfirmation";
import Delegation from "./Delegation";
import { useWeb3React } from "@web3-react/core";
import { useCOBApi } from "../../components/COBProvider";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

export default function Contributors(){
  const {isActive, account} = useWeb3React();
  const { contributors, canRead } = useCOBApi();

  const {data: isRegistrar, isLoading} = useQuery(
    `contributors.registrars.${account}`,
    () =>  contributors().isRegistrar(account??"0x0"),
    { enabled: isActive && canRead}
  )

  return (
    <>
      <Typography variant={"h3"} sx={{textAlign:"center"}} gutterBottom>Contributors</Typography>
      <Panels panes={[
        {
          label: "Contributors",
          component: (<ContributorsList/>)
        },
        {
          label: "Registration",
          component: (<Registration/>),
          hide: !isRegistrar
        },
        {
          label: "Waiting Registration",
          component: (<WaitingConfirmation/>),
          hide: !isActive
        },
        {
          label: "Your profile",
          component: (<Delegation/>),
          hide: !isActive
        }
      ]}/>
    </>
  )
}
