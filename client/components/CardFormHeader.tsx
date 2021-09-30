import React from "react";
import { Flex, Circle, Text } from "@chakra-ui/react";

interface Props {
  step: number;
  title: string;
}

const CardFormHeader = ({ step, title }: Props) => {
  return (
    <Flex
      as="header"
      borderRadius="12px"
      px={0}
      py={0}
      alignItems="center"
      // pos="sticky"
      // top="0"
      zIndex="99"
      // mb="-1.8rem"
    >
      <Flex
        // bgColor="white"
        alignItems="center"
        p="6px 28px 6px 8px"
        // borderRadius="md"
        color="black"
        w="100%"
      >
        {/* <Circle
          borderRadius="9px"
          size="40px"
          fontFamily="Gemunu Libre"
          bgColor="rgb(255 180 136)"
          fontSize="19px"
          mr={4}
          color="white"
          fontWeight="800"
        >
          {step}
        </Circle> */}
        <Text fontWeight="800" fontSize="22px" color="#3b434c">
          {title}
        </Text>
      </Flex>
    </Flex>
    // <Flex
    //   as="header"
    //   borderBottom="1px solid rgb(255 255 255 / 50%)"
    //   px={6}
    //   py={6}
    //   alignItems="center"
    //   pos="sticky"
    //   top="0"
    //   zIndex="99"
    // >
    //   <Flex
    //     bgColor="white"
    //     alignItems="center"
    //     p="6px 28px 6px 8px"
    //     borderRadius="md"
    //     color="black"
    //     overflow="scroll"
    //   >
    //     <Circle
    //       borderRadius="9px"
    //       size="40px"
    //       fontFamily="Gemunu Libre"
    //       bgColor="rgb(255 180 136)"
    //       fontSize="19px"
    //       mr={4}
    //       color="white"
    //       fontWeight="800"
    //     >
    //       {step}
    //     </Circle>
    //     <Text fontWeight="600" fontSize="20px">
    //       {title}
    //     </Text>
    //   </Flex>
    // </Flex>
  );
};

export default CardFormHeader;
