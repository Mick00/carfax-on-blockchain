import React, { useState } from "react";
import {
    Grid,
    Stack,
    TextField,
    Button,
    Alert
  } from "@mui/material";
  import BaseCard from "../components/baseCard/BaseCard";
  import FileUploadIcon from '@mui/icons-material/FileUpload';
  import { ChangeEvent } from "react";

  interface IReport {
    serialNumber: string;
    endometre: string;
    report: File|null;
  }

  const defaultValues:IReport = {
    serialNumber: '',
    endometre: '',
    report: null
  };

  const Report = () => {
    const [formValues, setFormValues] = useState(defaultValues);
    const [showInvalidAlert, setShowInvalidForm] = useState(false);

    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
      const uploadedReport = e.target.files && e.target.files[0];
      setFormValues({
        ...formValues,
        report: uploadedReport
      });
    }

    const handleSubmit = () => {
      console.log(formValues);
      if(formValues.serialNumber === '' || formValues.endometre === '' || formValues.report === null){
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
          <BaseCard title="New Report">
            <Stack spacing={3}>
              <TextField
                id="serial-number"
                label="Serial Number"
                variant="outlined"
                name="serialNumber"
                value={formValues.serialNumber}
                onChange={handleInputChange}
              />
              <TextField 
                id="endometre" 
                label="Endometre" 
                variant="outlined" 
                name="endometre"
                value={formValues.endometre}
                onChange={handleInputChange}
              />
              <Grid container style={{justifyContent: 'center'}}>
                <Button variant="contained" component="label" color="primary">
                  <FileUploadIcon /> Upload a report
                  <input type="file" accept="application/pdf" onChange={(e) => {uploadFile(e)}} hidden />
                </Button>
              </Grid>
            </Stack>
            <br/>
            <Button onClick={handleSubmit}>
              Submit
            </Button>
            {showInvalidAlert && <Alert severity="warning">Please fill in all form fields</Alert>}
          </BaseCard>
        </Grid>
      </Grid>
    );
  };
  
  export default Report;
  