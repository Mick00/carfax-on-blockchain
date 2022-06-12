import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../theme/theme";
import createEmotionCache from "../createEmotionCache";
import FullLayout from "../components/FullLayout";
import "../styles/style.css";
import type { AppProps } from 'next/app'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    // <CacheProvider value={emotionCache}>
    <>
      <Head>
        <title>Flexy NextJs Starter kit page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
          <Component {...pageProps} />
        </FullLayout>
      </ThemeProvider>
    </>
    // </CacheProvider>
  );
}

