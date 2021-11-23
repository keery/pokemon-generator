import React from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

interface Props {
  step: number;
  title: string;
  id?: string;
}

const CardFormHeader = ({ title, id = "" }: Props) => {
  const fontSize = useColorModeValue("xl", "md");
  const fontWeight = useColorModeValue("800", "400");

  return (
    <Flex
      as="header"
      borderRadius="sm"
      px={0}
      py={0}
      alignItems="center"
      zIndex="99"
      id={id}
    >
      <Flex alignItems="center" p="6px 15px 6px 8px" color="black" w="100%">
        <Text
          fontWeight={fontWeight}
          fontSize={fontSize}
          color={{ base: "white", xl: "text" }}
        >
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CardFormHeader;
