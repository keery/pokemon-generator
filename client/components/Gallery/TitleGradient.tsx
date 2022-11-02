import React from "react";
import { Box } from "@chakra-ui/react";

const TitleGradient = () => {
  return (
    <Box pos="absolute" left={0} right={0} top={0} zIndex="-1">
      <Box
        background="radial-gradient(50% 50%, rgb(220, 193, 228), transparent)"
        pos="absolute"
        top="70%"
        left="50%"
        w="500px"
        h="500px"
        transform="translate(-50%, -50%)"
      />
    </Box>
  );
};

export default TitleGradient;
