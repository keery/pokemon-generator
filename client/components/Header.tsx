import React from "react";
import { Container, HStack, ContainerProps, Flex } from "@chakra-ui/react";
import Logo from "~components/Logo";
import Nav from "~components/Nav";
import { ROUTE_GENERATOR } from "~constants";
import usePathname from "~hooks/usePathname";

interface Props extends ContainerProps {
  noColorChange?: boolean;
}

const Header = ({ noColorChange = false, ...rest }: Props) => {
  const pathname = usePathname();

  const logo = (
    <Logo color={pathname === ROUTE_GENERATOR ? "black" : "white"} />
  );

  return (
    <Container
      as="header"
      zIndex={1001}
      py={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      {!noColorChange ? (
        <Flex
          border="1px solid rgb(255 255 255 / 46%)"
          px={6}
          py={2}
          borderRadius="1rem"
          layerStyle={"glass"}
        >
          {logo}
        </Flex>
      ) : (
        <>{logo}</>
      )}
      <HStack alignItems="center" spacing={6}>
        <Nav />
      </HStack>
    </Container>
  );
};

export default Header;
