import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Container, Heading, Box, Text } from "@chakra-ui/react";
import CardList from "~components/Gallery/CardList";
import TitleGradient from "~components/Gallery/TitleGradient";
import CardSwiper from "~components/Gallery/CardSwiper";
import { useTranslation } from "next-i18next";

const Gallery: NextPage = () => {
  const { t } = useTranslation("gallery");
  return (
    <>
      <Container>
        <TitleGradient />
        <Heading
          as="h1"
          textAlign="center"
          color="text"
          fontSize="3.4rem"
          fontWeight="300"
        >
          <Text>Welcome to the </Text>
          <Text>
            card
            <Box
              bgImage="url(/assets/img/dash.svg)"
              bgPos="50% 100%"
              bgSize="contain"
              bgRepeat="no-repeat"
              as="span"
              fontWeight="500"
            >
              {" "}
              gallery
            </Box>
          </Text>
        </Heading>
      </Container>
      <Container>
        <Text fontWeight="800" pt={20} pb={4} fontSize="2.5rem">
          {t("topMonth")}
        </Text>
      </Container>
      <CardSwiper />

      <Container>
        <Text fontWeight="800" pt={20} pb={4} fontSize="2.5rem">
          {t("lastCreation")}
        </Text>
        <CardList />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "gallery"])),
    },
  };
};

export default Gallery;