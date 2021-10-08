import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { HStack, Container, Flex } from "@chakra-ui/react";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BackgroundBlur from "~components/BackgroundBlur";

import CardForm from "~components/CardForm";
import { CARD_DEFAULT_STATE } from "~data/card";
import { decrypt } from "~utils/cache";
import { useForm, FormProvider } from "react-hook-form";
import PanelOptions from "~components/PanelOptions";
import dynamic from "next/dynamic";
const Card = dynamic(() => import("~components/Card"), { ssr: false });

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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <BackgroundBlur control={form.control} />
        <Container h="100%" py={6}>
          <HStack
            justifyContent="center"
            h="100%"
            alignItems="flex-start"
            spacing={5}
          >
            <PanelOptions />
            <CardForm />
            <Flex
              flex={2}
              alignItems="center"
              justifyContent="center"
              height="100%"
              borderRadius="md"
            >
              <Card />
            </Flex>
          </HStack>
        </Container>
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
