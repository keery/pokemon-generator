import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Container, Box, Flex } from "@chakra-ui/react";
import CardList from "~components/Gallery/CardList";
import CardSwiper from "~components/Gallery/CardSwiper";
import CardModal from "~components/Gallery/CardModal/CardModal";
import WinnerSection from "~components/Gallery/Winner/WinnerSection";
import TextShadow from "~components/TextShadow";
import GalleryTop from "~components/Gallery/GalleryTop";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

const Gallery: NextPage = () => {
  const { t } = useTranslation("gallery");

  return (
    <Box>
      <NextSeo title={t("seo.title")} description={t("seo.description")} />
      <CardModal />
      <GalleryTop />
      <WinnerSection />
      {/* <Container id="top-10">
        <Flex alignItems="center" pt={20} pb={3}>
          <TextShadow
            as="h2"
            text={t("topMonth")}
            fontWeight="800"
            fontSize="5.8rem"
            fontFamily="title"
          />
        </Flex>
      </Container>
      <CardSwiper /> */}
      <CardList />
    </Box>
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
