import React, { useEffect } from "react";
import { Text, Flex, Link, Image } from "@chakra-ui/react";
import { LOGO } from "~constants";
import { hideLogoAtom } from "~atoms/hide-logo";
import { useRecoilValue } from "recoil";

interface Props {
  color?: string;
}

const Logo = ({ color = "white" }: Props) => {
  const { isHidden } = useRecoilValue(hideLogoAtom);

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
          opacity={isHidden ? 0 : 1}
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
    </Link>
  );
};

export default Logo;
