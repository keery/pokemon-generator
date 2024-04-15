"use client";
import React from "react";
import { GetServerSideProps, NextPage } from "next";
import {
  Stack,
  Container,
  Flex,
  useBreakpointValue,
  Box,
  useTheme,
} from "@chakra-ui/react";
import BackgroundBlur from "~src/components/BackgroundBlur";
import CardForm from "~src/components/CardForm";
import Nav from "~src/components/Nav";
import ModalUppy from "~src/components/ModalUppy";
import Header from "~src/components/Header";
import { CARD_DEFAULT_STATE } from "~data/card";
import { decrypt } from "~utils/cache";
import { useForm, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "black",
};

const Card = dynamic(() => import("~src/components/Card"), { ssr: false });

const PanelOptions = dynamic(
  () => import("~src/components/PanelOptions/PanelOptions"),
  { ssr: false }
);

export default function Page() {
  const theme = useTheme();
  const isFormVisible = useBreakpointValue({ base: false, xl: true });

  return (
    <>
      {/* {!isFormVisible && <Header />}
      {isFormVisible && (
        <Box
          zIndex={100}
          pos="absolute"
          top={4}
          right={12}
          display="flex"
          justifyContent="flex-end"
        >
          <Nav />
        </Box>
      )} */}
      <form style={{ height: "100%", overflow: "hidden" }}>
        <BackgroundBlur />
        <Container
          h="100%"
          pt={6}
          pb={{ base: 0, sm: 6 }}
          px={{ ...theme.components.Container.baseStyle.px, sm: 2, base: 0 }}
        >
          <Stack
            direction={{ base: "column-reverse", sm: "row" }}
            justifyContent="center"
            h="100%"
            alignItems="flex-start"
            spacing={{ base: 0, sm: 5 }}
          >
            <PanelOptions />
            {isFormVisible && <CardForm />}
            <Flex
              alignSelf="center"
              flex={2}
              alignItems="center"
              justifyContent="center"
              height={{ base: "90%", sm: "100%" }}
              borderRadius="md"
              pb={{ base: 4, sm: 0 }}
              px={{ base: 2, sm: 0 }}
            >
              <Card />
            </Flex>
          </Stack>
        </Container>
        <ModalUppy name="mainImage" id="mainImage" isDesktop={isFormVisible} />
        <ModalUppy
          name="evolvePicture"
          id="evolvePicture"
          isDesktop={isFormVisible}
        />
      </form>
    </>
  );
}
