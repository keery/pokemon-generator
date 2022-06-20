import React from "react";
import { Flex, Container, Text, Box } from "@chakra-ui/react";
import { m, useTransform, useViewportScroll } from "framer-motion";
import { Card } from "~@types/Card";
import WinnerBlobs from "./WinnerBlobs";

interface Props {
  winner: Card;
}

const WinnerGlass = ({ winner }: Props) => {
  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [700, 800], [0, 1]);
  const y = useTransform(scrollY, [600, 1000], [0, 550]);
  const yWaves = useTransform(scrollY, [600, 1000], [500, 300]);

  return (
    <Container>
      <Box
        as={m.div}
        backgroundImage="assets/img/waves/waves.svg"
        bgRepeat="no-repeat"
        style={{
          y: yWaves,
          opacity,
        }}
        pos="absolute"
        left="0"
        right="0"
        top="0"
        bottom="0"
      />
      <WinnerBlobs winner={winner} />
      <Flex
        as={m.div}
        layerStyle="glassLg"
        w="fit-content"
        flexDir="column"
        pos="relative"
        style={{
          padding: "1.3rem 8rem 1.3rem 2.4rem",
          border: "none",
          borderRadius: "1rem",
          opacity,
          y,
        }}
      >
        <Text fontFamily="title" fontWeight="800" fontSize="2rem">
          Weekly winner 🏆
        </Text>
        <Text fontSize="1.2rem">{winner.name}</Text>
        <Text fontSize="1.2rem">By {winner.name}</Text>
      </Flex>
    </Container>
  );
};

export default WinnerGlass;
