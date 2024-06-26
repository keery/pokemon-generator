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
import { RecoilRoot } from "recoil";
import { LazyMotion, domAnimation } from "framer-motion";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "swiper/css";
import "swiper/css/navigation";

const App = ({ Component, pageProps }: AppProps) => {
  const content = (
    <>
      <AppHead />
      <QueryClientProvider client={client}>
        <ChakraProvider theme={theme}>
          {/* @ts-ignore */}
          <RecoilRoot>
            <LazyMotion features={domAnimation}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </LazyMotion>
          </RecoilRoot>
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
