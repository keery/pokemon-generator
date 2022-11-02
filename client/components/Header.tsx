import React from "react";
import { Container, useColorModeValue, HStack } from "@chakra-ui/react";
import Logo from "~components/Logo";
import { HEADER_HEIGHT } from "~constants";
import NesButton from "~components/NesButton";
import Nav from "~components/Nav";
import { useRouter } from "next/router";

interface Props {
  noColorChange?: boolean;
}

const Header = ({ noColorChange = false }: Props) => {
  const py = useColorModeValue(10, 0);
  const router = useRouter();

  return (
    <Container
      as="header"
      zIndex={100}
      py={py}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height={HEADER_HEIGHT}
    >
      <Logo />
      <HStack alignItems="center" spacing={6}>
        {router.pathname === "/" && <NesButton noColorChange={noColorChange} />}
        <Nav />
      </HStack>
    </Container>
  );
};

export default Header;
