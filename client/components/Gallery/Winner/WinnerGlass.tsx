import React, { useRef } from "react";
import { Button, Flex, Container, Text, Box } from "@chakra-ui/react";
import { m, useTransform, useViewportScroll } from "framer-motion";
import { Winner } from "~@types/Winner";
import { screenPercent } from "~utils/helper";
import { GRADIENTS } from "~constants";
import WinnerBlobs from "./WinnerBlobs";
import WinnerConfettiButton from "./WinnerConfettiButton";
import { useTranslation } from "next-i18next";
import { ROUTE_GENERATOR } from "~constants";
import Link from "~components/Link";

interface Props {
  winner: Winner;
}

const WinnerGlass = ({ winner }: Props) => {
  const { t } = useTranslation("gallery");
  const { scrollY } = useViewportScroll();
  const ref = useRef();

  const opacity = useTransform(
    scrollY,
    [screenPercent(75), screenPercent(107)],
    [0, 1]
  );
  const opacityWaves = useTransform(
    scrollY,
    [screenPercent(90), screenPercent(107)],
    [0, 1]
  );
  const opacityBackground = useTransform(
    scrollY,
    [
      screenPercent(70),
      screenPercent(80),
      screenPercent(190),
      screenPercent(200),
    ],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollY,
    [screenPercent(75), screenPercent(107)],
    [0, 200]
  );
  const yWaves = useTransform(
    scrollY,
    [screenPercent(75), screenPercent(107)],
    [400, 200]
  );

  return (
    <>
      <Container ref={ref}>
        <Box
          as={m.div}
          pos="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex={5}
          style={{
            opacity: opacityBackground,
          }}
          _before={{
            content: '""',
            display: "block",
            pos: "absolute",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            bg: winner ? GRADIENTS[winner.card.element] : GRADIENTS.water,
          }}
        />
        <m.div
          style={{
            backgroundImage: "url(assets/img/waves/waves.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            y: yWaves,
            opacity: opacityWaves,
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            zIndex: 9,
          }}
        />
        <WinnerBlobs winner={winner.card} />
        <Flex
          as={m.div}
          layerStyle="glassLg"
          w="fit-content"
          flexDir="column"
          pos="relative"
          style={{
            zIndex: 18,
            width: "30rem",
            padding: "1.3rem 2.4rem",
            border: "none",
            borderRadius: "1rem",
            opacity,
            y,
          }}
        >
          {winner ? (
            <>
              <Text fontFamily="title" fontWeight="800" fontSize="2rem">
                {t("winner.title")} 🏆
              </Text>
              <Text fontSize="1.2rem" layerStyle="ellipsis">
                {winner.card.name}
              </Text>
              <Text fontSize="1.2rem" layerStyle="ellipsis">
                {t("winner.createdBy")} <i>{winner.card.author}</i>
              </Text>
              <WinnerConfettiButton winner={winner} />
            </>
          ) : (
            <>
              <Text fontFamily="title" fontWeight="800" fontSize="2rem">
                {t("winner.no.title")} 🤨
              </Text>
              <Text fontSize="1.2rem">{t("winner.no.description")}</Text>
              <Button
                as={Link}
                href={ROUTE_GENERATOR}
                variant="glass"
                mt="1.5rem"
              >
                {t("winner.no.button")}
              </Button>
            </>
          )}
        </Flex>
      </Container>
    </>
  );
};

export default WinnerGlass;
