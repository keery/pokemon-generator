import React from "react";
import { Flex } from "@chakra-ui/react";
import Blob from "public/assets/img/blob.svg";
import { screenPercent } from "~utils/helper";
import ParallaxY, { ParallaxYProps } from "~components/ParallaxY";

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

const GalleryTopBackground = () => {
  return (
    <Flex pos="absolute" left="0" top="0" right="0" h="100vh">
      <Flex
        className="rotate"
        position="absolute"
        zIndex="0"
        width="1000px"
        height="1000px"
        left="50%"
        top="50%"
        filter="blur(70px)"
        opacity="0.5"
      >
        <Blob />
      </Flex>
      <CardBackground
        input={[0, screenPercent(125)]}
        output={[screenPercent(-33), screenPercent(10)]}
        style={{
          x: "calc(-50% - 24.8rem)",
          rotate: "-8.26deg",
        }}
        height="10rem"
        width="11.95rem"
        bgImage="/assets/img/gallery-top/pokeball-purple.webp"
      />
      <CardBackground
        input={[0, screenPercent(125)]}
        output={[screenPercent(-33), screenPercent(1)]}
        style={{
          x: "calc(-50% + 26rem)",
          rotate: "7.54deg",
        }}
        height="23.5rem"
        width="16.55rem"
        bgImage="/assets/img/gallery-top/mew.webp"
      />
      <CardBackground
        input={[0, screenPercent(125)]}
        output={[screenPercent(13), screenPercent(-20)]}
        style={{
          x: "calc(-50% - 10rem)",
          rotate: "-5.27deg",
        }}
        bgImage="/assets/img/gallery-top/florizare.webp"
        height="25.5rem"
        width="19.65rem"
      />
      <CardBackground
        input={[0, screenPercent(125)]}
        output={[screenPercent(13), screenPercent(-3)]}
        style={{
          x: "calc(-50% + 13rem)",
          rotate: "7.79deg",
          scale: "0.35",
        }}
        height="555px"
        width="400px"
        borderRadius="3rem"
        bgImage="https://cdn.dribbble.com/users/1147613/screenshots/15390615/media/0197f9d885df23a6ab039eedebc40f5b.png?compress=1&resize=1600x1200&vertical=top"
      />
    </Flex>
  );
};

export default GalleryTopBackground;
