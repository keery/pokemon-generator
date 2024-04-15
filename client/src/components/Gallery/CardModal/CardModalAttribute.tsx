import React from "react";
import { Flex, Text, StyleProps } from "@chakra-ui/react";

interface Props extends StyleProps {
  label: string;
  value: string | number | JSX.Element;
}

const CardModalAttribute = ({ label, value }: Props) => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      flex="1"
      alignSelf="baseline"
    >
      <Text mb="0.2rem" fontSize="1.3rem" fontWeight="800">
        {label}
      </Text>
      <Flex fontWeight="200" fontSize="1.3rem">
        {value}
      </Flex>
    </Flex>
  );
};

export default CardModalAttribute;
