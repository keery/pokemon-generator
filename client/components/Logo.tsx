import React from "react";
import { Text, Flex, Link, Image } from "@chakra-ui/react";
import { LOGO } from "~constants";

interface Props {
  noLink?: boolean;
  color?: string;
}

const Logo = ({ noLink = false, color = "white" }: Props) => {
  const logo = (
    <Flex alignItems="center">
      <Image
        w="50px"
        src={LOGO}
        alt={`Logo ${process.env.NEXT_PUBLIC_APP_NAME}`}
      />

      <Text
        fontWeight="800"
        color={color}
        pl={3}
        lineHeight={0}
        fontFamily={"title"}
        mt={1}
      >
        <Text as="span" fontSize={"1.2rem"} lineHeight="1">
          Pokemon card
        </Text>
        <br />
        <Text as="span" fontSize={"1.9rem"} lineHeight="1">
          Generator
        </Text>
      </Text>
    </Flex>
  );

  if (noLink) {
    return logo;
  }

  return (
    <Link
      href="/"
      display="inline-block"
      _hover={{
        textDecoration: "none",
      }}
    >
      {logo}
    </Link>
  );
};

export default Logo;
