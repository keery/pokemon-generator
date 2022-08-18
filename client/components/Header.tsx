import React from "react";
import { Container, useColorModeValue } from "@chakra-ui/react";
import Logo from "~components/Logo";
import { HEADER_HEIGHT } from "~constants";
import NesButton from "~components/NesButton";
import { useRouter } from "next/router";

interface Props {
  noColorChange?: boolean;
}

const Header = ({ noColorChange = false }: Props) => {
  const py = useColorModeValue(4, 0);
  const router = useRouter();

  return (
    <Container
      as="header"
      zIndex={9}
      py={py}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height={HEADER_HEIGHT}
    >
      <Logo />
      {router.pathname === "/" && <NesButton noColorChange={noColorChange} />}
    </Container>
  );
};

export default Header;
