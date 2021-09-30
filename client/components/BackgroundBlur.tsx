import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

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
      bgImage="assets/img/blur-bg.png"
    >
      <Box h="100%" w="100%" layerStyle="glass"></Box>
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
