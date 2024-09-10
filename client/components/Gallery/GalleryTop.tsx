import React from "react";
import {
  Container,
  HStack,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";

import GalleryTopBackground from "~components/Gallery/GalleryTopBackground";
import Link from "~components/Link";
import Button from "~components/Button";
import { ROUTE_GENERATOR } from "~constants";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const Countdown = dynamic(() => import("~components/Gallery/Countdown"), {
  ssr: false,
});

const CTA = () => {
  const t = useTranslations();
  return (
    <Flex
      mt={{
        base: "3rem",
        md: "0",
      }}
    >
      <Button
        as={Link}
        href={ROUTE_GENERATOR}
        transform={{
          base: "translateX(0rem)",
          md: "translateX(2rem)",
        }}
        height="4rem"
        fontSize="1.3rem"
        textDecoration="none!important"
      >
        {t("topCta")}
      </Button>
    </Flex>
  );
};

const GalleryTop = () => {
  const t = useTranslations();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <GalleryTopBackground />
      <Flex pos="relative" h="100vh" zIndex={90} alignItems="center">
        <Container pos="relative" zIndex={6}>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex
              w="full"
              mt={8}
              fontSize={{
                base: "2.5rem",
                sm: "3.6rem",
                md: "4.5rem",
                lg: "6.2rem",
                xl: "6.7rem",
              }}
              lineHeight={{ base: "1.2", md: "1" }}
              fontWeight="900"
              color="white"
              fontFamily="CabinetGrotesk"
              pos="relative"
              justifyContent="center"
            >
              <Flex
                direction="column"
                zIndex={2}
                alignItems={{ base: "center", md: "flex-start" }}
              >
                <Text
                  alignSelf="center"
                  textShadow="0 0 7px rgb(73 73 73 / 41%)"
                  textAlign="center"
                >
                  {t("nextWinner")}
                </Text>
                <HStack
                  transform={{
                    base: "translateX(0rem)",
                    md: "translateX(-2.5rem)",
                    lg: "translateX(-4rem)",
                  }}
                  alignItems="center"
                  spacing={10}
                >
                  <Text textShadow="0 0 7px rgb(73 73 73 / 41%)">
                    {t("electedIn")}
                  </Text>
                  {!isMobile && <CTA />}
                </HStack>
                <Countdown />
                {isMobile && <CTA />}
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default GalleryTop;
