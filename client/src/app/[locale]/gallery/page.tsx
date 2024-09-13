"use server";
import React from "react";
import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import CardList from "~components/Gallery/CardList";
// import CardSwiper from "~components/Gallery/CardSwiper";
import CardModal from "~components/Gallery/CardModal/CardModal";
import WinnerSection from "~components/Gallery/Winner/WinnerSection";
import GalleryTop from "~components/Gallery/GalleryTop";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";

const Gallery: NextPage = () => {
  const t = useTranslations();

  return (
    <Box>
      {/* <NextSeo
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
      /> */}
      {/* <CardModal /> */}
      <Box position="relative" overflow="hidden">
        <GalleryTop />
        <WinnerSection />
      </Box>
      {/* <CardSwiper /> */}
      <CardList />
    </Box>
  );
};

export default Gallery;
