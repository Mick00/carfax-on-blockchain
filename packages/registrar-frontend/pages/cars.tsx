import React, { useEffect, useState } from "react";
import { create } from "ipfs-http-client";
import jsonFile from "../package.json";
import { ethers } from "ethers";
import { Grid, Stack, TextField, Button, Box, Alert } from "@mui/material";
import BaseCard from "../components/baseCard/BaseCard";
import { ContractProvider } from "@cars-on-blockchain/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { string } from "prop-types";

const defaultValues = {
  make: "",
  model: "",
  year: "2022",
  color: "",
  serial_number: "",
  odometer: "",
};

const Cars = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [showInvalidAlert, setShowInvalidForm] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  //const [formValues, setFormValues] = useState(defaultValues);
  const [walletAddress, setWalletAddress] = useState(null);
  const [multiaddr, setMultiaddr] = useState("/ip4/127.0.0.1/tcp/5001");
  const [ipfsError, setIpfsError] = useState(null);
  const [alertSuccess, SetAlertSuccess] = useState(false);
  const [alertError, SetAlertError] = useState(false);
  const [id, setId] = useState(null);
  const [fileHash, setFileHash] = useState(null);

  const sendOnChain = async (serialNumber: any, odometer: any, hash: any) => {
    console.log("this is the onchain hash sent : " + hash);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const contracts = new ContractProvider(
      provider.getSigner() as unknown as JsonRpcProvider,
      5
    );
    const contributorsContract = contracts.get("Cars");
    contributorsContract
      .serialNumberToCar(serialNumber)
      .then((r) => console.log(r.toString()))
      .catch((err) => console.log(err));
    //in the then update to state 3
    contributorsContract
      .register(serialNumber, odometer, hash)
      .then((r) => r.wait(1))
      .then((c) => {
        console.log(c);
        SetAlertError(false);
        SetAlertSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        console.log("rentre ici");
        // SetAlertError(true);
        // SetAlertSuccess(false);
      });
  };

  // const checkCarExist = async (serialNumber: any) => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);
  //   const contracts = new ContractProvider(provider.getSigner() as unknown as JsonRpcProvider, 5);
  //   const contributorsContract = contracts.get("Cars");
  //   //in the then update to state 3
  //   return contributorsContract.getCarFromSerialNumber("46773583845grhw").then(r => r.wait(1)).then(c => console.log(c)).catch(err => console.log(err));
  // }

  const signForm = async (values: any) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(JSON.stringify(values));
    return signature;
  };

  const sendToIPFSandOnChain = async (values: any) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signature = await signForm(values);
    const signer = provider.getSigner();
    const constructedObject =
      '{ "data" :' +
      JSON.stringify(values) +
      "}," +
      '"signer" :' +
      (await signer.getAddress()) +
      "," +
      '"signature" :' +
      signature +
      "}";
    const ipfs = await connectToIPFS();
    try {
      const added = await ipfs.add(constructedObject);
      await sendOnChain(
        values.serial_number,
        values.odometer,
        added.cid.toString()
      );
      console.log("this is the hash that was saved: " + added.cid.toString());
    } catch (err) {
      console.log(err);
      setIpfsError(err.message);
    }
  };

  const connectToIPFS = async () => {
    try {
      const http = create(multiaddr);
      const isOnline = await http.isOnline();

      if (isOnline) {
        console.log(http);
        console.log("IPFS is online");
        setIpfsError(null);
        return http;
      }
    } catch (err) {
      setIpfsError(err.message);
    }
  };

  const handleYear = (value: any) => {
    if (!value) return;
    const date = new Date(value);
    const year = date.getFullYear();
    console.log(year);
    setFormValues({
      ...formValues,
      year: year.toString(),
    });
  };

  const handleSubmit = async () => {
    console.log(formValues);
    SetAlertError(false);
    SetAlertSuccess(false);
    if (
      formValues.make === "" ||
      formValues.model === "" ||
      formValues.year === "" ||
      formValues.color === "" ||
      formValues.serial_number === "" ||
      formValues.odometer === ""
    ) {
      setShowInvalidForm(true);
      return;
    } else {
      setShowInvalidForm(false);
    }
    console.log(formValues);

    sendToIPFSandOnChain(formValues);
    await sendOnChain(formValues.serial_number, formValues.odometer);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Add New Car">
          <form>
            <Stack spacing={3}>
              <TextField
                id="make"
                label="Make"
                variant="outlined"
                name="make"
                value={formValues.make}
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
              <Box component="form" noValidate autoComplete="off">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year"]}
                    label="Year"
                    value={formValues.year}
                    onChange={(newValue) => {
                      handleYear(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        name="year"
                        {...params}
                        style={{ width: "20%", marginRight: "5%" }}
                      />
                    )}
                  />
                </LocalizationProvider>
                <TextField
                  id="color"
                  label="Color"
                  variant="outlined"
                  name="color"
                  value={formValues.color}
                  onChange={handleInputChange}
                  style={{ width: "30%", marginRight: "5%" }}
                />
                <TextField
                  id="serialNumber"
                  label="Serial Number"
                  name="serial_number"
                  value={formValues.serial_number}
                  onChange={handleInputChange}
                  style={{ width: "40%" }}
                />
              </Box>
              <TextField
                id="odometer"
                label="Odometer"
                variant="outlined"
                name="odometer"
                value={formValues.odometer}
                onChange={handleInputChange}
                style={{ width: "40%" }}
              />
            </Stack>
            <br />
            {/* <Button disable={} onClick={} variant="contained"> */}
            <Button onClick={handleSubmit}>Submit</Button>
            {showInvalidAlert && (
              <Alert severity="warning">Please fill in all form fields</Alert>
            )}
            {alertSuccess && (
              <Alert severity="success">
                Transaction submitted onChain successfully
              </Alert>
            )}
            {alertError && <Alert severity="error">Transaction failed</Alert>}
          </form>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default Cars;
