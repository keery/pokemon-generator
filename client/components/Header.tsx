import React from "react";
import {
  Container,
  useColorModeValue,
  HStack,
  ContainerProps,
} from "@chakra-ui/react";
import Logo from "~components/Logo";
import NesButton from "~components/NesButton";
import Nav from "~components/Nav";
import { ROUTE_GENERATOR } from "~constants";
import { useRouter } from "next/router";

interface Props extends ContainerProps {
  noColorChange?: boolean;
}

const Header = ({ noColorChange = false, ...rest }: Props) => {
  const py = useColorModeValue(4, 0);
  const router = useRouter();

  return (
    <Container
      as="header"
      zIndex={1001}
      py={py}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <Logo color={router.pathname === ROUTE_GENERATOR ? "black" : "white"} />
      <HStack alignItems="center" spacing={6}>
        {router.pathname === ROUTE_GENERATOR && (
          <NesButton noColorChange={noColorChange} />
        )}
        <Nav />
      </HStack>
    </Container>
  );
};

export default Header;
