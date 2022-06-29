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
  
  const Report = () => {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="New Report">
            <Stack spacing={3}>
              <TextField
                id="serial-number"
                label="Serial Number"
                variant="outlined"
              />
              <TextField id="car-id" label="Car ID" variant="outlined" />
              <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1 },
              }}
              noValidate
              autoComplete="off"
              >

                <TextField
                  id="car-brand"
                  label="Car Brand"
                  variant="outlined"
                />
                  <TextField
                  id="car-model"
                  label="Car Model"
                  variant="outlined"
                />
                  <TextField
                  id="year"
                  label="Year"
                  variant="outlined"
                />

              </Box>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
              />
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
  
  export default Report;
  