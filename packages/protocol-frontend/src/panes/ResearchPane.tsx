import React, { useState } from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useCOBApi } from "../components/COBProvider";
import { useForm, useWatch } from "react-hook-form";
import { isValidVin } from "../components/inputs/rules";
import ControlledTextField from "../components/inputs/ControlledTextField";
import { useQuery } from "react-query";
import useCarId from "../components/hooks/useCarId";
import IPFSFile from "../components/IPFSFile";

function ResearchPane() {
  const { handleSubmit, control, formState } = useForm({ mode: "onChange" });
  const vin = useWatch({ control, name: "vin" });
  const { reports } = useCOBApi();

  const { data: carId } = useCarId(vin);

  const { data: reportsMeta } = useQuery(
    ["reports", "created", vin],
    async () => {
      const filter = reports().filters["ReportCreated"]("0x0c");
      const reportsCreated = await reports().queryFilter(filter);
      return reportsCreated.map((event) => ({
        id: event.args.report,
        blockNumber: event.blockNumber,
        delegated: event.args.delegated,
        contributor: event.args.contributorId,
      }));
    },
    {
      enabled: (carId ?? 0) > 0,
    }
  );

  const { data: reportsHash } = useQuery(
    ["reports", "getTokenURI", vin],
    () => {
      if (reportsMeta && reportsMeta.length > 0) {
        return Promise.all(
          reportsMeta.map((meta) => reports().tokenURI(meta.id))
        );
      }
    },
    {
      enabled: reportsMeta && reportsMeta.length > 0,
    }
  );

  return (
    <>
      <Box py={4}>
        <Typography variant={"h3"} sx={{ textAlign: "center" }} gutterBottom>
          Search for reports
        </Typography>
        <Stack direction={"row"} spacing={1} justifyContent={"center"}>
          <ControlledTextField
            name={"vin"}
            label={"VIN"}
            control={control}
            required
            rules={{ isValidVin }}
          />
          {/*          <Button
            onClick={handleSubmit(onSubmit)}
            variant={"contained"}
            disabled={!formState.isValid}
          >
            Search
          </Button>*/}
        </Stack>
        <Stack mt={2}>
          {reportsHash &&
            reportsMeta?.map((meta, i) => (
              <Card>
                <Box px={2} py={1}>
                  <Typography>
                    <IPFSFile hash={reportsHash[i]}>
                      Report {reportsHash[i].toString()}
                    </IPFSFile>{" "}
                    by {meta?.contributor.toString()}(
                    {meta.delegated.toString()}) at{" "}
                    {meta?.blockNumber.toString()}
                  </Typography>
                </Box>
              </Card>
            ))}
        </Stack>
      </Box>
    </>
  );
}

export default ResearchPane;
