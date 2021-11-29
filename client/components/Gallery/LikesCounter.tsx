import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import Heart from "public/assets/img/heart.svg";

const LikesCounter = () => {
  return (
    <Flex alignItems="center">
      <Button
        minW="0"
        h="auto"
        variant="unstyled"
        color="#9e9ea7"
        cursor="pointer"
        _hover={{
          color: "#ea4c89",
        }}
        _active={{
          transform: "scale(0.9)",
        }}
      >
        <Heart width="15px" className="heart-icon" />
      </Button>
      <Text pl={1} fontSize="0.8rem" fontWeight="bold" color="#3d3d4e">
        17
      </Text>
    </Flex>
  );
};

export default LikesCounter;
