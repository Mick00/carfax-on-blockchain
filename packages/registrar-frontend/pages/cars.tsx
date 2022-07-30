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
  Alert,
} from "@mui/material";
import BaseCard from "../components/baseCard/BaseCard";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

const defaultValues = {
  mark: '',
  model: '',
  year: '2022',
  color: '',
  serialNumber: '',
};

const Cars = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [showInvalidAlert, setShowInvalidForm] = useState(false)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleYear = (value:any) => {
    if(!value) return
    const date = new Date(value);
    const year = date.getFullYear();
    console.log(year)
    setFormValues({
      ...formValues,
      year: year.toString()
    })

  }

  const handleSubmit = () => {
    console.log(formValues);
    if(formValues.mark === '' || formValues.model === '' || formValues.year === '' ||formValues.color === '' || formValues.serialNumber === ''){
      setShowInvalidForm(true)
      return;
    }else{
      setShowInvalidForm(false);
    }
    console.log(formValues);
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Add New Car">
          <form>
            <Stack spacing={3}>
              <TextField
                id="mark"
                label="Mark"
                variant="outlined"
                name="mark"
                value={formValues.mark}
                onChange={handleInputChange}
              />
              <TextField 
                id="model" 
                label="Model" 
                variant="outlined"
                name="model"
                value={formValues.model}
                onChange={handleInputChange} 
              />
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>

                <DatePicker
                  views={['year']}
                  label="Year"
                  value={formValues.year}
                  onChange={(newValue) => {
                    handleYear(newValue)
                  }}
                  renderInput={(params) => <TextField name='year' {...params} style={{ width: '20%', marginRight: '5%' }}/>}
                  
                />
                </LocalizationProvider>
                <TextField
                  id="color"
                  label="Color"
                  variant="outlined"
                  name="color"
                  value={formValues.color}
                  onChange={handleInputChange}
                  style={{ width: '30%', marginRight: '5%' }}
                />
                <TextField
                  id="serialNumber"
                  label="Serial Number"
                  variant="outlined"
                  name="serialNumber"
                  value={formValues.serialNumber}
                  onChange={handleInputChange}
                  style={{ width: '40%' }}
                />
              </Box>
            </Stack>
            <br />
            {/* <Button disable={} onClick={} variant="contained"> */}
            <Button onClick={handleSubmit}>
              Submit
            </Button>
            {showInvalidAlert && <Alert severity="warning">Please fill in all form fields</Alert>}
          </form>
        </BaseCard>
      </Grid>
    </Grid>
  );
}

export default Cars;