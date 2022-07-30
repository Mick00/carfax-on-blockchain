import React, { useEffect, useState } from "react";
import { create } from 'ipfs-http-client';
import jsonFile from '../package.json'
import { ethers } from "ethers";
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
import { JsonRpcProvider } from "@ethersproject/providers";
import { ContractProvider } from "@cob/contracts";
import { from } from "multiformats/types/src/bases/base";

const defaultValues = {
  companyName: "",
  sectorOfActivity: "",
  address: "",
  codePostal: "",
  city: "",
  email: "",
  website: "",
  phoneNumber: "",
  walletAddress: ""
};

const Register = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [walletAddress, setWalletAddress] = useState(null);
  const [multiaddr, setMultiaddr] = useState('/ip4/127.0.0.1/tcp/5001');
  const [ipfsError, setIpfsError] = useState(null);
  const [ipfs, setIpfs] = useState(null)
  const [id, setId] = useState(null)
  const [fileHash, setFileHash] = useState(null)

  useEffect(() => {
    console.log(window.ethereum.selectedAddress);
    setWalletAddress(window.ethereum.selectedAddress);
  }, []);

  const signAndSendToIPFS = async (values: any) => {
    //signer
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log("this is the " + signer);
    const signature = await signer.signMessage(JSON.stringify(values));
    const constructedObject = '{ "data" :' + JSON.stringify(values) + '},' + '"signer" :' + signer + ',' + '"signature" :' + signature + '}';

    console.log(constructedObject);
    const blob = new Blob([constructedObject], { type: 'application/json' });
    const file = new File([blob], 'file.json');


    await connectToIPFS();
    try {
      const added = await ipfs.add(constructedObject);
      updateDb(values);
      //update put request to api update to state 1 
      await sendOnChain("657658765934789760dgfhsga", values.walletAddress);
      console.log("this is the hash that was saved: " + added.cid.toString());
    } catch (err) {
      console.log(err);
      setIpfsError(err.message)
    }

  }

  const connectToIPFS = async () => {
    try {
      const http = create(multiaddr)
      const isOnline = await http.isOnline()

      if (isOnline) {
        console.log(http)
        setIpfs(http)
        console.log("IPFS is online");
        setIpfsError(null)
      }
    }
    catch (err) {
      setIpfsError(err.message)
    }
  }

  const sendOnChain = async (hash: any,address: any) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    console.log("this is the signer" + provider.getSigner())
    const contracts = new ContractProvider(provider.getSigner() as unknown as JsonRpcProvider, 5);
    const contributorsContract = contracts.get("Contributors");
    //in the then update to state 3
    contributorsContract.register(hash, address).then(r => r.wait(1)).then(c => console.log(c)).catch(err => console.log(err));
  }



  const handleSubmit = () => {
    // console.log(window.ethereum.selectedAddress);
    setFormValues({ ...formValues, ["walletAddress"]: window.ethereum.selectedAddress, ["StateOfRegistration"]: "1" });
    console.table(formValues);
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    }).then(res => signAndSendToIPFS(formValues));
  }

  const updateDb = (formValues : any) => {
    //update database value prisma
    fetch('/api/register', {
        method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        }).then(res => console.log(res));
    }

  const checkAuth = () => {
    console.log("this is the address in checkAuth" + window.ethereum.selectedAddress);
    if (window.ethereum.selectedAddress !== null || window.ethereum.selectedAddress !== undefined) {
      return false
    }
    return true
  }

  const handleInputChange = (e: any) => {
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
                  style={{ width: '30%', marginRight: '5%' }}
                />
                <TextField
                  id="car-model"
                  label="Postal Code"
                  variant="outlined"
                  name="codePostal"
                  value={formValues.codePostal}
                  onChange={handleInputChange}
                  style={{ width: '30%', marginRight: '5%' }}
                />
                <TextField
                  id="city"
                  label="City"
                  variant="outlined"
                  name="city"
                  value={formValues.city}
                  onChange={handleInputChange}
                  style={{ width: '30%' }}
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
                  style={{ width: '30%', marginRight: '5%' }}
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