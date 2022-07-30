import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
  Box,
  Alert
} from "@mui/material";
import BaseCard from "../components/baseCard/BaseCard";



const Cars = () => {



  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="New Report">
          <form>
            <Stack spacing={3}>
              <TextField
                id="company-name"
                label="Company Name"
                variant="outlined"
                name="companyName"
                // value={}
                // onChange={}
              />
              <TextField id="car-id" label="Car ID" variant="outlined" />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Sector Of Activity</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="reparator"
                  name="sectorOfActivity"
                  // value={}
                  // onChange={}
                >
                  <FormControlLabel
                    key="reparator"
                    value="reparator"
                    control={<Radio />}
                    label="Reparator"
                  />
                  <FormControlLabel
                    key="insurance"
                    value="insurance"
                    control={<Radio />}
                    label="Insurance"
                  />
                </RadioGroup>
              </FormControl>
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >

                <TextField
                  id="car-brand"
                  label="Address"
                  variant="outlined"
                  name="address"
                  // value={}
                  // onChange={}
                  style={{ width: '30%', marginRight: '5%' }}
                />
                <TextField
                  id="car-model"
                  label="Postal Code"
                  variant="outlined"
                  name="codePostal"
                  // value={}
                  // onChange={}
                  style={{ width: '30%', marginRight: '5%' }}
                />
                <TextField
                  id="city"
                  label="City"
                  variant="outlined"
                  name="city"
                  // value={}
                  // onChange={}
                  style={{ width: '30%' }}
                />
              </Box>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                name="email"
                // value={}
                // onChange={}
              />
              <TextField
                id="website"
                label="Website"
                variant="outlined"
                name="website"
                // value={}
                // onChange={}
              />
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="phone"
                  label="Phone Number"
                  variant="outlined"
                  style={{ width: '30%', marginRight: '5%' }}
                  name="phoneNumber"
                  // value={}
                  // onChange={}
                />
              </Box>
            </Stack>
            <br />
            {/* <Button disable={} onClick={} variant="contained"> */}
            <Button>
              Submit
            </Button>
            {/* {!walletAddress && <Alert severity="warning">Please login to metaMask before submitting</Alert>} */}
          </form>
        </BaseCard>
      </Grid>
    </Grid>
  );
}

export default Cars;