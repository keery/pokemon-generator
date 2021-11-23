import React from "react";
import { Container, useColorModeValue } from "@chakra-ui/react";
import Logo from "~components/Logo";
import NesButton from "~components/NesButton";

const Header = () => {
  const py = useColorModeValue(4, 0);

  return (
    <Container
      py={py}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Logo />
      <NesButton />
    </Container>
  );
};

export default Header;
