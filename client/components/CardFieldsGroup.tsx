import React from "react";
import { Flex, VStack } from "@chakra-ui/react";

const CardFieldsGroup = ({ children }) => {
  return (
    <Flex
      px={{ base: 3, sm: 6 }}
      py={4}
      bgColor={{ base: "rgb(255 255 255 / 82%)", xl: "rgb(255 255 255 / 33%)" }}
      borderRadius="12px"
      border="1px solid rgb(255 255 255 / 46%)"
    >
      <VStack w="100%" direction="column">
        {children}
      </VStack>
    </Flex>
  );
};

export default CardFieldsGroup;
