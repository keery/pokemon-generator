"use client";
import React from "react";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import Blob from "public/assets/img/blob.svg";
import { screenPercent } from "~utils/helper";
import ParallaxY, { ParallaxYProps } from "~components/ParallaxY";
import useIsMounted from "~hooks/useIsMounted";

const CardBackground = (props: ParallaxYProps) => {
  return (
    <ParallaxY
      position="absolute"
      top="50%"
      left="50%"
      bgSize="cover"
      borderRadius="1.1rem"
      bgPos="center"
      zIndex={10}
      {...props}
    />
  );
};

const DEFAULT_PROPS = { x: 0, height: 0, width: 0 };

const GalleryTopBackground = () => {
  const isMounted = useIsMounted();
  const card1 =
    useBreakpointValue({
      base: {
        x: "6.4rem",
        height: "5.5rem",
        width: "7.6rem",
      },
      sm: {
        x: "11.7rem",
        height: "8.5rem",
        width: "10.6rem",
      },
      md: {
        x: "17rem",
        height: "9.2rem",
        width: "11.15rem",
      },
      lg: {
        x: "24.8rem",
        height: "10rem",
        width: "11.95rem",
      },
    }) || DEFAULT_PROPS;

  const card2 =
    useBreakpointValue({
      base: {
        x: "8rem",
        height: "12rem",
        width: "8.25rem",
      },
      sm: {
        x: "15rem",
        height: "17rem",
        width: "12.25rem",
      },
      md: {
        x: "19.5rem",
        height: "18.7rem",
        width: "13.85rem",
      },
      lg: {
        x: "26rem",
        height: "23.5rem",
        width: "16.55rem",
      },
    }) || DEFAULT_PROPS;

  const card3 =
    useBreakpointValue({
      base: {
        x: "5.2rem",
        height: "16.7rem",
        width: "12.3rem",
      },
      sm: {
        x: "9.2rem",
        height: "21.7rem",
        width: "16.3rem",
      },
      md: {
        x: "10rem",
        height: "22.5rem",
        width: "17.65rem",
      },
      lg: {
        x: "10rem",
        height: "25.5rem",
        width: "19.65rem",
      },
    }) || DEFAULT_PROPS;

  const card4 =
    useBreakpointValue({
      base: {
        x: "8rem",
        height: "17rem",
        width: "13.4rem",
      },
      sm: {
        x: "12rem",
        height: "26rem",
        width: "20.4rem",
      },
      md: {
        x: "13rem",
        height: "29.5rem",
        width: "23rem",
      },
      lg: {
        x: "13rem",
        height: "29.5rem",
        width: "23rem",
      },
    }) || DEFAULT_PROPS;

  return (
    <Flex pos="absolute" left="0" top="0" right="0" h="100vh">
      <Flex
        className="rotate"
        position="absolute"
        zIndex="0"
        width={{ base: "550px", sm: "650px", md: "900px", lg: "1000px" }}
        height={{ base: "550px", sm: "650px", md: "900px", lg: "1000px" }}
        left="50%"
        top="50%"
        filter="blur(70px)"
        opacity="0.5"
      >
        <Blob />
      </Flex>
      {isMounted && (
        <>
          <CardBackground
            input={[0, screenPercent(125)]}
            output={[screenPercent(-33), screenPercent(10)]}
            style={{
              x: `calc(-50% - ${card1.x})`,
              rotate: "-8.26deg",
            }}
            height={card1.height}
            width={card1.width}
            bgImage="/assets/img/gallery-top/pokeball-purple.webp"
          />
          <CardBackground
            input={[0, screenPercent(125)]}
            output={[screenPercent(-33), screenPercent(1)]}
            style={{
              x: `calc(-50% + ${card2.x})`,
              rotate: "7.54deg",
            }}
            height={card2.height}
            width={card2.width}
            bgImage="/assets/img/gallery-top/mew.webp"
          />
          <CardBackground
            input={[0, screenPercent(125)]}
            output={[screenPercent(13), screenPercent(-20)]}
            style={{
              x: `calc(-50% - ${card3.x})`,
              rotate: "-5.27deg",
            }}
            bgImage="/assets/img/gallery-top/florizare.webp"
            height={card3.height}
            width={card3.width}
          />
          <CardBackground
            input={[0, screenPercent(125)]}
            output={[screenPercent(13), screenPercent(-3)]}
            style={{
              x: `calc(-50% + ${card4.x})`,
              rotate: "7.79deg",
              scale: "0.35",
            }}
            height={card4.height}
            width={card4.width}
            borderRadius="3rem"
            bgImage="https://cdn.dribbble.com/users/1147613/screenshots/15390615/media/0197f9d885df23a6ab039eedebc40f5b.png?compress=1&resize=1600x1200&vertical=top"
          />
        </>
      )}
    </Flex>
  );
};

export default GalleryTopBackground;
