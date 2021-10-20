import React from "react";
import { Flex, Container, useBreakpointValue } from "@chakra-ui/react";
import Logo from "~components/Logo";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const isVisible = useBreakpointValue({ base: true, xl: false });
  return (
    <Flex direction="column" h="100%">
      {isVisible && (
        <Container py={2}>
          <Logo />
        </Container>
      )}

      {children}
    </Flex>
  );
};

export default Layout;
