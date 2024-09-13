import React, { useRef } from "react";
import { Flex, Container, Text, Box } from "@chakra-ui/react";
import { motion, useTransform, useScroll } from "framer-motion";
import { Winner } from "~@types/Winner";
import { screenPercent } from "~utils/helper";
import { GRADIENTS } from "~constants";
import WinnerBlobs from "./WinnerBlobs";
import WinnerConfettiButton from "./WinnerConfettiButton";
import { useTranslations } from "next-intl";
import { ROUTE_GENERATOR } from "~constants";
import Link from "~components/Link";
import { END_ROTATION, START_ROTATION } from "~components/Gallery/HoloCard";
import Button from "~components/Button";

interface Props {
  winner: Winner;
}

const WinnerGlass = ({ winner }: Props) => {
  const t = useTranslations();
  const { scrollY } = useScroll();
  const ref = useRef();

  // Text
  const opacity = useTransform(
    scrollY,
    [0, screenPercent(START_ROTATION), screenPercent(END_ROTATION)],
    [0, 0, 1]
  );
  const y = useTransform(
    scrollY,
    [
      screenPercent(START_ROTATION),
      screenPercent(END_ROTATION),
      screenPercent(END_ROTATION + 20),
    ],
    [0, screenPercent(55), screenPercent(75)]
  );

  // Waves
  const yWaves = useTransform(
    scrollY,
    [
      0,
      screenPercent(START_ROTATION),
      screenPercent(END_ROTATION),
      screenPercent(END_ROTATION + 20),
    ],
    [
      screenPercent(150),
      screenPercent(150),
      screenPercent(80),
      screenPercent(100),
    ]
  );
  const opacityWaves = useTransform(
    scrollY,
    [screenPercent(START_ROTATION), screenPercent(END_ROTATION)],
    [0, 1]
  );

  // Background
  const opacityBackground = useTransform(
    scrollY,
    [
      0,
      screenPercent(START_ROTATION - 5),
      screenPercent(END_ROTATION - 10),
      screenPercent(END_ROTATION + 40),
      screenPercent(END_ROTATION + 50),
    ],
    [0, 0, 1, 1, 0]
  );

  return (
    <Container ref={ref}>
      <Box
        as={motion.div}
        pos="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex={2}
        style={{
          // @ts-ignore
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
          zIndex: 2,
          bg: winner ? GRADIENTS[winner.card.element] : GRADIENTS.water,
        }}
        _after={{
          content: '""',
          display: "block",
          pos: "absolute",
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          bg: "white",
        }}
      />
      <motion.div
        style={{
          backgroundImage: "url(/assets/img/waves.svg)",
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
        as={motion.div}
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
          // @ts-ignore
          opacity,
          y,
        }}
      >
        {winner ? (
          <>
            <Text fontFamily="title" fontWeight="800" fontSize="2rem">
              {t("winner.title", { weekNb: winner.id })} 🏆
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
              {t("winner.no.title")}
            </Text>
            <Text fontSize="1.2rem">{t("winner.no.description")}</Text>
            <Button as={Link} href={ROUTE_GENERATOR} mt="1.5rem">
              {t("winner.no.button")}
            </Button>
          </>
        )}
      </Flex>
    </Container>
  );
};

export default WinnerGlass;
