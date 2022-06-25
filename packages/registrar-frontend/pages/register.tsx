import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
    Box,
    Autocomplete
  } from "@mui/material";
  import BaseCard from "../components/baseCard/BaseCard";
  
  const Register = () => {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="New Report">
            <Stack spacing={3}>
              <TextField
                id="company-name"
                label="Company Name"
                variant="outlined"
              />
              <TextField id="car-id" label="Car ID" variant="outlined" />
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Sector Of Activity</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="reparator"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="reparator"
                    control={<Radio />}
                    label="Reparator"
                  />
                  <FormControlLabel
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
                  style={{width:'30%', marginRight: '5%'}}
                />
                  <TextField
                  id="car-model"
                  label="Postal Code"
                  variant="outlined"
                  style={{width:'30%', marginRight: '5%'}}
                />
                  <TextField
                  id="city"
                  label="City"
                  variant="outlined"
                  style={{width:'30%'}}
                />
              </Box>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
              />
              <TextField
                id="website"
                label="Website"
                variant="outlined"
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
                  style={{width:'30%', marginRight: '5%'}}
                />
                  <TextField
                  id="wallet-address"
                  label="Wallet Address"
                  variant="outlined"
                  style={{width:'40%'}}

                />
              </Box>
            </Stack>
            <br />
            <Button variant="contained">
              Submit
            </Button>
          </BaseCard>
        </Grid>
      </Grid>
    );
  };
  
  export default Register;
  
