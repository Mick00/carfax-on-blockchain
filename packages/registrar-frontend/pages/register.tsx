import React, { useEffect, useState } from "react";
import {ethers} from "ethers";
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
import { SingleBedTwoTone } from "@mui/icons-material";
  
  const defaultValues = {
    companyName : "",
    sectorOfActivity : "",
    address : "",
    codePostal: "",
    city: "",
    email : "",
    website : "",
    phoneNumber : "",
    walletAddress : ""
  };

  const Register = () => {
    const [formValues, setFormValues] = useState(defaultValues);
    const [walletAddress, setWalletAddress] = useState(null);

    useEffect(()=> {
       console.log(window.ethereum.selectedAddress);
       setWalletAddress(window.ethereum.selectedAddress);
      }, []);

    const signAndSendToIPFS = async (values: any) => {
        //signer 
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("this is the " + signer);
        const signature = await signer.signMessage(JSON.stringify(values));
        const constructedObject = '{ "data" :' + JSON.stringify(values) + '},'+'"signer" :' + signer+','+ '"signature" :' + signature + '}';
        console.log(constructedObject);
    }
    

    const handleSubmit = () => {
        // console.log(window.ethereum.selectedAddress);
        setFormValues({...formValues,["walletAddress"]: window.ethereum.selectedAddress,});
        console.table(formValues);
        fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
          }).then(res => signAndSendToIPFS(formValues));
    }

    const checkAuth = () => {
        console.log("this is the address in checkAuth" +window.ethereum.selectedAddress);
        if(window.ethereum.selectedAddress !== null || window.ethereum.selectedAddress !== undefined){
            return false
        }
        return true
    }

    const handleInputChange = (e:any) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    return (
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="New Report">
            <form onSubmit={!walletAddress}>
              <Stack spacing={3}>
                <TextField
                  id="company-name"
                  label="Company Name"
                  variant="outlined"
                  name="companyName"
                  value={formValues.companyName}
                  onChange={handleInputChange}
                />
                <TextField id="car-id" label="Car ID" variant="outlined" />
                  <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Sector Of Activity</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="reparator"
                    name="sectorOfActivity"
                    value={formValues.sectorOfActivity}
                    onChange={handleInputChange}
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
                    value={formValues.address}
                    onChange={handleInputChange}
                    style={{width:'30%', marginRight: '5%'}}
                  />
                    <TextField
                    id="car-model"
                    label="Postal Code"
                    variant="outlined"
                    name="codePostal"
                    value={formValues.codePostal}
                    onChange={handleInputChange}
                    style={{width:'30%', marginRight: '5%'}}
                  />
                    <TextField
                    id="city"
                    label="City"
                    variant="outlined"
                    name="city"
                    value={formValues.city}
                    onChange={handleInputChange}
                    style={{width:'30%'}}
                  />
                </Box>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                <TextField
                  id="website"
                  label="Website"
                  variant="outlined"
                  name="website"
                  value={formValues.website}
                  onChange={handleInputChange}
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
                    name="phoneNumber"
                    value={formValues.phoneNumber}
                    onChange={handleInputChange}
                  />
                </Box>
              </Stack>
              <br />
              <Button disable={checkAuth} onClick={handleSubmit} variant="contained">
                Submit
              </Button>
              {!walletAddress && <Alert severity="warning">Please login to metaMask before submitting</Alert>}
            </form>
          </BaseCard>
        </Grid>
      </Grid>
    );
  }
  
  export default Register;