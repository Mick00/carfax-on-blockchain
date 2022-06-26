import { Typography } from "@mui/material";
import Panels from "../../components/Panels";
import Registration from "../Contributors/Registration";
import React from "react";
import CarsRegistration from "./CarsRegistration";
import CarSearch from "./Search";

export default function Cars() {
  return (
    <>
      <Typography variant={"h3"} sx={{textAlign:"center"}} gutterBottom>Cars</Typography>
      <Panels panes={[
        {
          label: "Search",
          component: (<CarSearch/>)
        },
        {
          label: "Registration",
          component: (<CarsRegistration/>)
        },
      ]}/>
    </>
  )
}
