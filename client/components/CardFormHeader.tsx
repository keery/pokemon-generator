import React from "react";
import { Flex, Text } from "@chakra-ui/react";

interface Props {
  step: number;
  title: string;
}

const CardFormHeader = ({ title }: Props) => {
  return (
    <Flex
      as="header"
      borderRadius="12px"
      px={0}
      py={0}
      alignItems="center"
      zIndex="99"
    >
      <Flex alignItems="center" p="6px 28px 6px 8px" color="black" w="100%">
        <Text fontWeight="800" fontSize="22px" color="#3b434c">
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CardFormHeader;
