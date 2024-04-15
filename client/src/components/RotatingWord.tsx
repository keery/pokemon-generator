import React from "react";
import { Flex, Box } from "@chakra-ui/react";

interface Props {
  text?: string;
  degree?: number;
}

const default_text = "Congratulation";

const RotatingWord = ({ text = default_text, degree = 26 }: Props) => {
  return (
    <Flex userSelect="none" pointerEvents="none" pos="relative">
      <Flex
        animation="rotate 7.5s linear infinite"
        pos="relative"
        w="120px"
        h="120px"
        layerStyle="glass"
        borderRadius="100%"
        borderColor="black"
        color="black"
      >
        {text
          .replaceAll(" ", "-")
          .split("")
          .map((char, i) => (
            <Box
              key={`rotate-word-${i}`}
              as="span"
              textTransform="uppercase"
              pos="absolute"
              transformOrigin="0 60px"
              top="0"
              left="50%"
              fontWeight="900"
              transform={`rotate(${
                char === "i" ? i * degree + 4 : i * degree
              }deg)`}
            >
              {char}
            </Box>
          ))}
      </Flex>
    </Flex>
  );
};

export default RotatingWord;
