import React from "react";
import { Container, HStack, Text, Flex, Box } from "@chakra-ui/react";

import GalleryTopBackground from "~components/Gallery/GalleryTopBackground";
import Link from "~components/Link";
import Button from "~components/Button";
import { ROUTE_GENERATOR } from "~constants";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";

const Countdown = dynamic(() => import("~components/Gallery/Countdown"), {
  ssr: false,
});

const GalleryTop = () => {
  const { t } = useTranslation("gallery");

  return (
    <>
      <GalleryTopBackground />
      <Flex pos="relative" h="100vh" zIndex={90} alignItems="center">
        <Container pos="relative" zIndex={6}>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex
              w="full"
              mt={8}
              fontSize="6.7rem"
              lineHeight="1"
              fontWeight="900"
              color="white"
              fontFamily="CabinetGrotesk"
              pos="relative"
              justifyContent="center"
            >
              <Flex direction="column" zIndex={2}>
                <Text
                  alignSelf="center"
                  textShadow="0 0 7px rgb(73 73 73 / 41%)"
                >
                  {t("nextWinner")}
                </Text>
                <HStack
                  transform="translateX(-4rem)"
                  alignItems="center"
                  spacing={10}
                >
                  <Text textShadow="0 0 7px rgb(73 73 73 / 41%)">
                    {t("electedIn")}
                  </Text>
                  <Button
                    as={Link}
                    href={ROUTE_GENERATOR}
                    transform="translateX(2rem)"
                    height="4rem"
                    fontSize="1.3rem"
                  >
                    {t("topCta")}
                  </Button>
                </HStack>
                <Countdown />
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default GalleryTop;
