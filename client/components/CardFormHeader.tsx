import React from "react";
import { Flex, Text } from "@chakra-ui/react";

interface Props {
  step: number;
  title: string;
  id?: string;
}

const CardFormHeader = ({ title, id = "" }: Props) => {
  return (
    <Flex
      as="header"
      borderRadius="12px"
      px={0}
      py={0}
      alignItems="center"
      zIndex="99"
      id={id}
    >
      <Flex alignItems="center" p="6px 28px 6px 8px" color="black" w="100%">
        <Text
          fontWeight="800"
          fontSize="22px"
          color={{ base: "white", xl: "text" }}
        >
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CardFormHeader;
