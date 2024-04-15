import React from "react";
import {
  Text,
  Flex,
  Link,
  Image,
  Heading,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import LogoPixel from "~src/components/LogoPixel";
import { LOGO } from "~constants";

interface Props {
  noLink?: boolean;
  color?: string;
}

const Logo = ({ noLink = false, color = "white" }: Props) => {
  const { colorMode } = useColorMode();
  const fontFamily = useColorModeValue("title", "nes");
  const fontSize1 = useColorModeValue("1.2rem", "0.8rem");
  const fontSize2 = useColorModeValue("1.9rem", "1.1rem");
  const mt = useColorModeValue(0, "0.5rem");

  const logo = (
    <Flex alignItems="center">
      {colorMode === "dark" ? (
        <LogoPixel />
      ) : (
        <Image
          w="50px"
          src={LOGO}
          alt={`Logo ${process.env.NEXT_PUBLIC_APP_NAME}`}
        />
      )}

      <Heading
        as="h1"
        fontWeight="800"
        color={color}
        pl={3}
        lineHeight={0}
        fontFamily={fontFamily}
      >
        <Text as="span" fontSize={fontSize1} lineHeight="1">
          Pokemon card
        </Text>
        <br />
        <Text as="div" fontSize={fontSize2} lineHeight="1" mt={mt}>
          Generator
        </Text>
      </Heading>
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
