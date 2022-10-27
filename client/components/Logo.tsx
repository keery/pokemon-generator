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
import LogoPixel from "~components/LogoPixel";
import { LOGO } from "~constants";

interface Props {
  noLink?: boolean;
  color?: string;
}

const Logo = ({ noLink = false, color = "text" }: Props) => {
  const { colorMode } = useColorMode();
  const fontFamily = useColorModeValue("body", "nes");
  const fontSize = useColorModeValue("1rem", "0.7rem");
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
        fontSize={fontSize}
      >
        <Text as="span" fontSize="1.2em" lineHeight="1">
          Pokemon card
        </Text>
        <br />
        <Text as="div" fontSize="1.9em" lineHeight="1" mt={mt}>
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
