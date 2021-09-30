import React from "react";
import { Box, Text, Flex, Link, Image } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Link href="/" display="inline-block" textDecoration="none">
      <Flex alignItems="center">
        <Image
          w="50px"
          src={`assets/img/pokeball.png`}
          alt={`Logo ${process.env.NEXT_PUBLIC_APP_NAME}`}
        />
        <Box fontWeight="800" color="#3b434c" pl={3} lineHeight="1">
          <Text fontSize="19px">Pokemon card</Text>
          <Text fontSize="31px">Generator</Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default Logo;
