import { ThemeProvider } from "@mui/material";
import { StateProvider } from "../DataLayer/StateProvider";
import reducer, { initialState } from "../DataLayer/reducer";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { theme } from "../styles/theme";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>POC 0.1.0</title>
        <meta
          name="description"
          content="POC virtual dressing room by JosnSof"
        />
      </Head>

      <StateProvider initialState={initialState} reducer={reducer}>

          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
      </StateProvider>
    </>
  );
}

export default MyApp;
