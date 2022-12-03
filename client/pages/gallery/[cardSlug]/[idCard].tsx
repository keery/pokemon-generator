import React from "react";
import { GetServerSideProps } from "next";
import { SSRConfig } from "next-i18next";
import { Box, Flex, Container, useTheme } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCard } from "~hooks/useCard";
import { ROUTE_404 } from "~constants";
import { NextSeo } from "next-seo";
import { CardModalContent } from "~components/Gallery/CardModal/CardModal";
import { getSeoCardDescription } from "~utils/card";
import useCard from "~hooks/useCard";
import useModalStyles from "~hooks/useModalStyles";
import Blob from "public/assets/img/blob.svg";

const Card = ({ initialData }) => {
  const modalStyles = useModalStyles();
  const { data: card } = useCard(initialData.id, {
    initialData,
    // Error with like button without
    cacheTime: 0,
  });

  const theme = useTheme();

  return (
    <>
      <NextSeo
        title={card.name}
        description={getSeoCardDescription(card)}
        openGraph={{
          title: `${card.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
          type: "website",
          url: process.env.NEXT_PUBLIC_URL,
          images: [
            {
              type: "image/jpg",
              url: card.img,
              width: 340,
              height: 380,
              alt: card.name,
            },
          ],
        }}
      />
      {/* <Circle
        pos="absolute"
        left="5vh"
        top="15vh"
        opacity={0.8}
        boxShadow={`rgb(255 255 255 / 60%) 0px 0px 0px 0.5px inset, ${theme.colors.new["2"]} 100px 100px 0px 0px inset, ${theme.colors.new["1"]} 200px 200px 0px 0px inset, ${theme.colors.new["3"]} 300px 300px 0px 0px inset`}
        size="400px"
        filter="blur(50px)"
      /> */}
      <Flex
        position="fixed"
        overflow="hidden"
        zIndex="0"
        width="100vw"
        height="100vh"
        left="0"
        top="0"
      >
        <Flex
          className="rotate"
          position="absolute"
          width="1000px"
          height="1000px"
          left="50%"
          top="50%"
          filter="blur(70px)"
          opacity="0.3"
        >
          <Blob />
        </Flex>
      </Flex>
      <Box style={modalStyles}>
        <CardModalContent card={card} animation={""} isPage />
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
        initialData: card,
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
