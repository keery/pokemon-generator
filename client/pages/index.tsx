import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { Stack, Container, Flex, useBreakpointValue } from "@chakra-ui/react";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BackgroundBlur from "~components/BackgroundBlur";
import CardForm from "~components/CardForm";
import ModalUppy from "~components/ModalUppy";
import { CARD_DEFAULT_STATE } from "~data/card";
import { decrypt } from "~utils/cache";
import { useForm, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import CacheForm from "~components/CacheForm";

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

  const form = useForm({
    defaultValues: cachedCard
      ? decrypt(cachedCard, process.env.NEXT_PUBLIC_ENCRYPT_KEY)
      : CARD_DEFAULT_STATE,
    shouldUnregister: false,
  });

  const isFormVisible = useBreakpointValue({ base: false, xl: true });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        style={{ height: "100%", overflow: "hidden" }}
      >
        <CacheForm />
        <BackgroundBlur control={form.control} />
        <Container h="100%" py={6}>
          <Stack
            direction={{ base: "column-reverse", sm: "row" }}
            justifyContent="center"
            h="100%"
            alignItems="flex-start"
            spacing={5}
          >
            <PanelOptions />
            {isFormVisible && <CardForm />}
            <Flex
              flex={2}
              alignItems="center"
              justifyContent="center"
              height="100%"
              borderRadius="md"
            >
              <Card />
            </Flex>
          </Stack>
        </Container>
        <ModalUppy name="mainImage" id="mainImage" control={form.control} />
        <ModalUppy
          name="evolvePicture"
          id="evolvePicture"
          control={form.control}
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
