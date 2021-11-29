import React from "react";
import { Container, useColorModeValue } from "@chakra-ui/react";
import Logo from "~components/Logo";
import NesButton from "~components/NesButton";

interface Props {
  noColorChange?: boolean;
}

const Header = ({ noColorChange = false }: Props) => {
  const py = useColorModeValue(4, 0);

  return (
    <Container
      py={py}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Logo />
      <NesButton noColorChange={noColorChange} />
    </Container>
  );
};

export default Header;
