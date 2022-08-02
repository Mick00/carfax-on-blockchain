import React, { useEffect, useState } from "react";
import type { NextPage } from 'next'
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
  Typography
} from "@mui/material";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Test from '../components/test';
import Logo from "../assets/logos/carfax3.svg";
import Image from "next/image";

const Home: NextPage = () => {
  
  return (
    <Grid container style={{justifyContent:'center'}}>
        <Grid item container style={{justifyContent:'center'}}>
          <Image src={Logo} alt={'Logo'}/>
        </Grid>
        <Typography>Obtain vehicle history with our decentralized platform.</Typography>

        <div className={styles.grid}>
          <a href="/search" className={styles.card}>
            <h2>View A Report &rarr;</h2>
            <p>Consult the history of the vehicle you want.</p>
          </a>

          <a href="/report" className={styles.card}>
            <h2>Add Report &rarr;</h2>
            <p>Add an new inspection or repair report.</p>
          </a>

          <a href="/register" className={styles.card}>
            <h2>Add Register &rarr;</h2>
            <p>Add registrar so he can add reports and cars.</p>
          </a>

          <a href="/cars" className={styles.card}>
            <h2>Add Car &rarr;</h2>
            <p>Add new car to your platform</p>
          </a>
        </div>
    </Grid>
  )
}

export default Home
