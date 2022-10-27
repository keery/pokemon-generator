import React from "react";
import { GetServerSideProps } from "next";
import { SSRConfig } from "next-i18next";
import { Box, Square, Container } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCard } from "~hooks/useCard";
import { ROUTE_404 } from "~constants";
import { NextSeo } from "next-seo";
import {
  CardModalContent,
  modalStyles,
} from "~components/Gallery/CardModal/CardModal";
import { getSeoCardDescription } from "~utils/card";

const Card = ({ card }) => {
  return (
    <>
      <NextSeo title={card.name} description={getSeoCardDescription(card)} />
      <Square
        pos="absolute"
        left="5vh"
        top="15vh"
        opacity={0.8}
        boxShadow="rgb(255 255 255 / 60%) 0px 0px 0px 0.5px inset, rgb(250 112 154) 100px 100px 0px 0px inset, rgb(120 75 160) 200px 200px 0px 0px inset, rgb(43 134 197) 300px 300px 0px 0px inset"
        size="400px"
        filter="blur(50px)"
      />
      <Box style={modalStyles} layerStyle="darkBlur">
        <CardModalContent card={card} cachedQuery={null} animation={""} />
        <Container>
          <Box borderBottom="1px solid" borderColor="gray.400" />
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
  locale,
  query,
}) => {
  try {
    const card = await getCard(query.idCard as string);

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "gallery"])),
        card,
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTE_404,
      },
    };
  }
};

export default Card;
