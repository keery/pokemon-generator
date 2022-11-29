import React from "react";
import { Box, Text, Container } from "@chakra-ui/react";
import WinnerGlass from "~components/Gallery/Winner/WinnerGlass";
import useWinner from "~hooks/useWinner";
import { useTranslation } from "next-i18next";
import ParallaxY from "~components/ParallaxY";
import { screenPercent } from "~utils/helper";
import HoloCard from "~components/Gallery/HoloCard";

const WinnerSection = () => {
  const { data: winner, isLoading } = useWinner();
  const { t } = useTranslation("gallery");

  return (
    <>
      <Box height="210vh" pt="3.9rem" as="section" pos="relative">
        <ParallaxY
          input={[screenPercent(0), screenPercent(90), screenPercent(120)]}
          output={[0, 0, screenPercent(-30)]}
          zIndex={10}
          pos="relative"
        >
          <Container
            color="white"
            display="flex"
            mt={30}
            px={{ base: 4, sm: 10 }}
            justifyContent="center"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Text
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
        <HoloCard />
        {!isLoading && <WinnerGlass winner={winner} />}
      </Box>
    </>
  );
};

export default WinnerSection;
