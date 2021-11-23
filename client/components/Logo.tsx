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

const Logo = () => {
  const { colorMode } = useColorMode();
  const fontFamily = useColorModeValue("body", "nes");
  const fontSize = useColorModeValue("1rem", "0.7rem");
  const mt = useColorModeValue(0, "0.5rem");
  const ml = useColorModeValue(4, 0);

  return (
    <Link
      ml={ml}
      href="/"
      display="inline-block"
      _hover={{
        textDecoration: "none",
      }}
    >
      <Flex alignItems="center">
        {colorMode === "dark" ? (
          <LogoPixel />
        ) : (
          <Image
            w="50px"
            src={`/assets/img/pokeball.png`}
            alt={`Logo ${process.env.NEXT_PUBLIC_APP_NAME}`}
          />
        )}

        <Heading
          as="h1"
          fontWeight="800"
          color="text"
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
    </Link>
  );
};

export default Logo;
