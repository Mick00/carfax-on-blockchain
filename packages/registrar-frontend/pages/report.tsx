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
import {ethers} from "ethers";
import {ContractProvider} from "@cars-on-blockchain/contracts";
import {JsonRpcProvider} from "@ethersproject/providers";
import {create} from "ipfs-http-client";

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
    //const [formValues, setFormValues] = useState(defaultValues);
    const [walletAddress, setWalletAddress] = useState(null);
    const [multiaddr, setMultiaddr] = useState('/ip4/127.0.0.1/tcp/5001');
    const [ipfsError, setIpfsError] = useState(null);
    const [alertSuccess, SetAlertSuccess] = useState(false);
    const [alertError, SetAlertError] = useState(false);
    const [id, setId] = useState(null)
    const [fileHash, setFileHash] = useState(null)

    const sendOnChain = async (serialNumber: any, reportHash: any) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const contracts = new ContractProvider(provider.getSigner() as unknown as JsonRpcProvider, 5);
      const reportContract = contracts.get("Reports");
      const carContract = contracts.get("Cars");
      //in the then update to state 3
      const carId = await carContract.serialNumberToCar(serialNumber);
      reportContract.create(carId, reportHash).then(r => r.wait(1)).then((c) => {
        console.log(c);
        SetAlertError(false)
        SetAlertSuccess(true);
      }).catch((err) => {
        console.log(err);
        console.log("rentre ici")
        // SetAlertError(true);
        // SetAlertSuccess(false);
      });
    }

    // const checkCarExist = async (serialNumber: any) => {
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   await provider.send("eth_requestAccounts", []);
    //   const contracts = new ContractProvider(provider.getSigner() as unknown as JsonRpcProvider, 5);
    //   const contributorsContract = contracts.get("Cars");
    //   //in the then update to state 3
    //   return contributorsContract.getCarFromSerialNumber("46773583845grhw").then(r => r.wait(1)).then(c => console.log(c)).catch(err => console.log(err));
    // }
    const sendToIPFSandOnChain = async (values: any) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const ipfs = await connectToIPFS();
      try {
        const added = await ipfs.add(values.report);
        await sendOnChain(values.serialNumber, added);
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
          console.log("IPFS is online");
          setIpfsError(null)
          return http;
        }
      } catch (err) {
        setIpfsError(err.message)
      }
    }

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
      sendToIPFSandOnChain(formValues);
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
            {alertSuccess && <Alert severity="success">Transaction submitted onChain successfully</Alert>}
            {alertError && <Alert severity="error">Transaction failed</Alert>}
          </BaseCard>
        </Grid>
      </Grid>
    );
  };
  
  export default Report;
  