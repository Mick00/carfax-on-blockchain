import React, { useState, useEffect } from 'react';
import { Grid, Stack, Autocomplete, TextField, Button, Typography } from "@mui/material";
import ProductPerfomance from "../components/ProductPerfomance";
import BaseCard from "../components/baseCard/BaseCard";
import noFound from "../assets/logos/no_found.jpg"
const Tables = () => {
  const [showResult, setShowResult] = useState<boolean>(false)

  const search = () => {
    setShowResult(true);
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
      <BaseCard title="Search Report">
        <Grid item container justifyContent={'center'} sx={{marginTop: 10, marginBottom: 10}}>
          <Stack spacing={2} sx={{ width: 500, marginRight: 5}}>
            <Autocomplete
              id="search-report"
              freeSolo
              options = {[]}
              renderInput={(params) => <TextField {...params} label="Enter Serial Number" />}
            />
          </Stack>
          <Button variant="contained" onClick={search}>
            Search
          </Button>
        </Grid>
        {showResult 
        ? (<ProductPerfomance />)
        : (<Grid item container justifyContent={'center'}>
              <Stack spacing={2} sx={{ width: 500, marginRight: 20}}>
                <img src={noFound.src} alt="Logo"/>
              </Stack>
          </Grid>)
        }
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default Tables;
