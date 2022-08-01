import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Panels  from "../../components/Panels";
import Registration from "./Registration";
import ContributorsList from "./ContributorsList";
import WaitingConfirmation from "./WaitingConfirmation";
import Delegation from "./Delegation";

export default function Contributors(){
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
          component: (<Registration/>)
        },
        {
          label: "Waiting Registration",
          component: (<WaitingConfirmation/>)
        },
        {
          label: "Your profile",
          component: (<Delegation/>)
        }
      ]}/>
    </>
  )
}
