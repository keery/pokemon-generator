import React from "react";
import { Flex } from "@chakra-ui/react";
import { Card } from "~@types";
import LikesCounter from "~components/Gallery/LikesCounter";

interface Props {
  card: Card;
}

const CardThumbnailGlass = ({ card }: Props) => {
  return (
    <Flex
      layerStyle="glass"
      h="50px"
      pos="absolute"
      bottom="0"
      left="0"
      right="0"
      zIndex={10}
      borderBottomRadius="1.2rem"
      border="none"
    >
      {/* <Flex pt={2} px={1} justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Circle
            size="25px"
            bg="linear-gradient(to right top, rgb(6, 249, 168), rgb(168, 6, 249))"
            mr={2}
            border="2px solid white"
            boxShadow="rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px"
          />
          <Text fontSize="xs" fontWeight="bold">
            Guillaume E.
          </Text>
        </Flex> */}
      <LikesCounter card={card} cachedQuery={null} />
      {/* </Flex> */}
    </Flex>
  );
};

export default CardThumbnailGlass;
