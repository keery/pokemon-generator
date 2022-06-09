import React from "react";
import { Flex, Spacer, Container, Text } from "@chakra-ui/react";
import { m, useTransform, useViewportScroll } from "framer-motion";

const WinnerGlass = () => {
  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [900, 950], [0, 1]);
  const y = useTransform(scrollY, [600, 1000], [0, 400]);

  // const rotateYFronface = useTransform(scrollY, [900], [180, 180, 0]);
  return (
    <Container
      as={m.div}
      style={{
        opacity,
        y,
      }}
      backgroundImage="assets/img/waves/waves.svg"
    >
      <Flex
        h="700px"
        m="0 auto"
        style={{
          padding: "2rem 3rem",
          boxShadow: "rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset",
          border: "none",
          backgroundColor: "rgba(20, 27, 40, 0.6)",
          // opacity,
          // y,
          // rotateZ,
          // rotateX,
          // rotateY,
          // translateY(-20px) translateX(-60px) translateZ(0px) rotateX(6deg) rotateY(331deg) rotateZ(3deg)
          borderRadius: "1rem",
          backdropFilter: "blur(7px) saturate(180%)",
          // z: "0",
          // x: "-60px",
          // y: "-20px",
        }}
      >
        <Flex>
          <Text>Monthly winner</Text>
        </Flex>
        <Spacer />
        <Flex></Flex>
      </Flex>
    </Container>
  );
};

export default WinnerGlass;
