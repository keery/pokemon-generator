import React from "react";
import {
  Container,
  useColorModeValue,
  HStack,
  Flex,
  ContainerProps,
} from "@chakra-ui/react";
import Logo from "~components/Logo";
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
      <Flex
        border="1px solid rgb(255 255 255 / 46%)"
        px={6}
        py={2}
        borderRadius="1rem"
        layerStyle={"glass"}
      >
        <Logo color={router.pathname === ROUTE_GENERATOR ? "black" : "white"} />
      </Flex>
      <HStack alignItems="center" spacing={6}>
        <Nav />
      </HStack>
    </Container>
  );
};

export default Header;
