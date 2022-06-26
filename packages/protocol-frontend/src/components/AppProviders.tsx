import React from "react";
import { WhiteTheme } from "../whiteTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Web3Provider from "./web3/Web3Provider";
import SnackBarProvider from "./SnackBarProvider";
import COBProvider from "./COBProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function AppProviders(props: React.PropsWithChildren) {
  return (
    <ThemeProvider theme={WhiteTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <SnackBarProvider>
          <Web3Provider>
            <COBProvider>
              {props.children}
            </COBProvider>
          </Web3Provider>
        </SnackBarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
