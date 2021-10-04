import React from "react";
import { Box, BoxProps, Image } from "@chakra-ui/react";

interface Props extends BoxProps {
  color: string;
  // size: string;
}

const Shape = ({ color, ...rest }: Props) => (
  <Box
    className="shape-bg"
    pos="absolute"
    bgImage={`radial-gradient(50% 50%, ${color}, transparent)`}
    // boxSize={size}
    width="98vmin"
    height="98vmin"
    {...rest}
  />
);

const BackgroundBlur = () => {
  return (
    <Box
      pos="absolute"
      left="0"
      right="0"
      top="0"
      bottom="0"
      z-index="-1"
      // bgImage="assets/img/blur-bg.png"
      bgImage="linear-gradient(45deg, rgba(63, 128, 254, 0.31), rgba(10, 121, 251, 0.16) 45%, rgba(63, 125, 254, 0.42) 71%, rgba(74, 210, 202, 0.3))"
      // bgColor="#e0e0e0"
    >
      {/* <Image
        src="assets/img/pokemon-water-3.png"
        pos="absolute"
        top="6%"
        right="0%"
        w="210px"
        transform="rotateY(180deg)"
      />
      <Image
        src="assets/img/kaiminus.png"
        pos="absolute"
        bottom="0%"
        right="6%"
        transform="rotateY(180deg)"
        w="300px"
      />
      <Image
        src="assets/img/carapuce.png"
        pos="absolute"
        top="20%"
        left="30%"
        width="270px"
        transform="rotate(20deg)"
      /> */}
      {/* <Box h="100%" w="100%" layerStyle="glass"></Box> */}
    </Box>
    // <Box pos="absolute" left="0" right="0" top="0" bottom="0" z-index="-1">
    //   <Shape color="#dcc1e4" size="660px" top="0" left="3%" />
    //   <Shape color="rgb(244, 206, 148)" size="710px" top="-40%" />
    //   <Shape color="rgb(230, 155, 108)" size="450px" left="-24%" top="-30%" />
    //   <Shape color="rgb(230, 155, 108)" size="630px" left="-54%" top="30%" />
    // </Box>
    // <Box
    //   pos="absolute"
    //   left="0"
    //   right="0"
    //   top="0"
    //   bottom="0"
    //   z-index="-1"
    //   // bgColor="rgb(220, 193, 228)"
    // >
    //   <Shape color="#f9c5c5" />
    //   <Shape color="rgb(244, 206, 148)" />
    //   <Shape color="rgb(230, 155, 108)" />
    //   <Shape color="#f9c5c5" />
    //   <Shape color="rgb(244, 206, 148)" />
    //   <Shape color="rgb(230, 155, 108)" />
    //   <Shape color="rgb(244, 206, 148)" />
    //   <Shape color="rgb(230, 155, 108)" />
    // </Box>
  );
};

export default BackgroundBlur;
