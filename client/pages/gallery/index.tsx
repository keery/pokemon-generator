import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Box } from "@chakra-ui/react";
import CardList from "~components/Gallery/CardList";
import CardSwiper from "~components/Gallery/CardSwiper";
import CardModal from "~components/Gallery/CardModal/CardModal";
import WinnerSection from "~components/Gallery/Winner/WinnerSection";
import GalleryTop from "~components/Gallery/GalleryTop";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";

const Gallery: NextPage = () => {
  const { t } = useTranslation("gallery");

  return (
    <Box>
      <NextSeo
        title={t("seo.title")}
        description={t("seo.description")}
        openGraph={{
          title: t("seo.title"),
          type: "website",
          url: process.env.NEXT_PUBLIC_URL + process.env.ROUTE_GALLERY,
        }}
        twitter={{
          site: process.env.NEXT_PUBLIC_URL + process.env.ROUTE_GALLERY,
          cardType: "summary_large_image",
        }}
      />
      <CardModal />
      <Box position="relative" overflow="hidden">
        <GalleryTop />
        <WinnerSection />
      </Box>
      {/* <CardSwiper /> */}
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
