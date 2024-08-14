import React from "react";
import {
  Box,
  Text,
  Container,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import WinnerGlass from "~components/Gallery/Winner/WinnerGlass";
import WinnerGlassMobile from "~components/Gallery/Winner/WinnerGlassMobile";
import useWinner from "~hooks/useWinner";
import { useTranslation } from "next-i18next";
import ParallaxY from "~components/ParallaxY";
import { screenPercent } from "~utils/helper";
import HoloCard from "~components/Gallery/HoloCard";

const WinnerSection = () => {
  const { data: winner, isLoading } = useWinner();
  const { t } = useTranslation("gallery");
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      <Box
        height={{ base: "auto", lg: "210vh" }}
        pt={{ base: 0, lg: "3.9rem" }}
        pb={{ base: 8, lg: 0 }}
        transform={{
          base: "translateY(-7rem)",
          sm: "translateY(-3rem)",
          md: "none",
        }}
        as="section"
        pos="relative"
      >
        <Heading as="h1"></Heading>
        <ParallaxY
          input={[screenPercent(0), screenPercent(90), screenPercent(120)]}
          output={[0, 0, screenPercent(-30)]}
          zIndex={10}
          pos="relative"
        >
          <Container
            as="section"
            color="white"
            display="flex"
            mt={30}
            px={{ base: 4, md: 10 }}
            justifyContent="center"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Text
              as="h2"
              whiteSpace="pre"
              color="new.2"
              fontSize="0.9rem"
              pt={1}
              pb={{ base: 5, md: 0 }}
              fontWeight="600"
              textTransform="uppercase"
            >
              {t("winner.how.title")}
            </Text>
            <Text
              pl={{ base: 0, md: 10 }}
              maxWidth="38rem"
              fontSize={{ base: "1.4rem", sm: "1.6rem" }}
            >
              {t("winner.how.1")}{" "}
              <Box as="span" color="new.4">
                {t("winner.how.2")}
              </Box>{" "}
              {t("winner.how.3")}{" "}
              <Box as="span" color="new.3">
                {t("winner.how.4")}
              </Box>{" "}
              {t("winner.how.5")}{" "}
              <Box as="span" color="new.1">
                {t("winner.how.6")}
              </Box>
              .
            </Text>
          </Container>
        </ParallaxY>
        {!isLoading &&
          winner &&
          (isMobile ? (
            <WinnerGlassMobile winner={winner} />
          ) : (
            <>
              <HoloCard />
              <WinnerGlass winner={winner} />
            </>
          ))}
      </Box>
    </>
  );
};

export default WinnerSection;
