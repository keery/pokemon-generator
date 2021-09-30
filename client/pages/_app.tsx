import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import NextApp, { AppProps } from "next/app";
import "../styles/globals.css";
import theme from "../theme";
import { client } from "~api/client-react-query";
import AppHead from "~components/AppHead";
import Layout from "~components/Layout";
import { QueryClientProvider } from "react-query";
import { appWithTranslation } from "next-i18next";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.css";

const App = ({ Component, pageProps }: AppProps) => {
  const content = (
    <>
      <AppHead />
      <QueryClientProvider client={client}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );

  return content;
};

App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return { ...appProps };
};

export default appWithTranslation(App);
