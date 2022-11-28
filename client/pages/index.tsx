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
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BackgroundBlur from "~components/BackgroundBlur";
import CardForm from "~components/CardForm";
import Nav from "~components/Nav";
import ModalUppy from "~components/ModalUppy";
import Header from "~components/Header";
import { CARD_DEFAULT_STATE } from "~data/card";
import { decrypt } from "~utils/cache";
import { useForm, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";

const Card = dynamic(() => import("~components/Card"), { ssr: false });
const PanelOptions = dynamic(
  () => import("~components/PanelOptions/PanelOptions"),
  { ssr: false }
);

const Home: NextPage = () => {
  const cachedCard =
    typeof window !== "undefined"
      ? localStorage.getItem(process.env.NEXT_PUBLIC_KEY_CACHE)
      : null;

  const theme = useTheme();

  const form = useForm({
    defaultValues: cachedCard
      ? decrypt(cachedCard, process.env.NEXT_PUBLIC_ENCRYPT_KEY)
      : CARD_DEFAULT_STATE,
    shouldUnregister: false,
  });

  const isFormVisible = useBreakpointValue({ base: false, xl: true });

  return (
    <FormProvider {...form}>
      {!isFormVisible && <Header />}
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
      )}
      <form style={{ height: "100%", overflow: "hidden" }}>
        <BackgroundBlur control={form.control} />
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
    </FormProvider>
  );
};

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "generator"])),
    },
  };
};

export default Home;
