import React, { useRef, useEffect } from "react";
import useCards from "~hooks/useCards";
import { Flex, Box } from "@chakra-ui/react";

const CardSwiper = () => {
  const { isLoading, data } = useCards();
  const text = "TOP 10 RANKING ";

  return (
    <div>
      <Flex userSelect="none" pointerEvents="none" pos="relative" ml={10}>
        <Flex
          animation="rotate 7.5s linear infinite"
          pos="relative"
          w="100px"
          h="100px"
        >
          {text
            .replaceAll(" ", "-")
            .split("")
            .map((char, i) => (
              <Box
                as="span"
                textTransform="uppercase"
                pos="absolute"
                transformOrigin="0 50px"
                top="0"
                left="50%"
                fontWeight="900"
                transform={`rotate(${i * 24.5}deg)`}
              >
                {char}
              </Box>
            ))}
        </Flex>
        <Flex
          width="20px"
          h="20px"
          border="2px solid black"
          borderRadius="100%"
          pos="absolute"
          top="50%"
          left="50%"
          transform="translateX(-50%) translateY(-50%)"
          bgColor="black"
        />
      </Flex>
    </div>
  );
};

export default CardSwiper;
