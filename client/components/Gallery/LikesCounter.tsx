import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import LikeButton from "~components/Gallery/LikeButton";

const LikesCounter = () => {
  return (
    <Flex alignItems="center">
      <LikeButton />
      <Text pl={1} fontSize="0.8rem" fontWeight="bold" color="#3d3d4e">
        17
      </Text>
    </Flex>
  );
};

export default LikesCounter;
