import React from "react";
import { Box, Text, Flex, Link, Image, Heading } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Link
      href="/"
      display="inline-block"
      _hover={{
        textDecoration: "none",
      }}
    >
      <Flex alignItems="center">
        <Image
          w="50px"
          src={`/assets/img/pokeball.png`}
          alt={`Logo ${process.env.NEXT_PUBLIC_APP_NAME}`}
        />

        <Heading as="h1" fontWeight="800" color="text" pl={3} lineHeight={0}>
          <Text as="span" fontSize="19px" lineHeight="1">
            Pokemon card
          </Text>
          <br />
          <Text as="span" fontSize="31px" lineHeight="1">
            Generator
          </Text>
        </Heading>
      </Flex>
    </Link>
  );
};

export default Logo;
