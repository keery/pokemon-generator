import React, { useMemo } from "react";
import { Flex, Container, useBreakpointValue } from "@chakra-ui/react";
import Logo from "~components/Logo";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const isVisible = useBreakpointValue({ base: true, xl: false });
  const isMacLike = useMemo(() => {
    if (typeof navigator !== "undefined") {
      return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    }
    return null;
  }, []);

  return (
    <Flex
      direction="column"
      h="100%"
      className={!isMacLike ? "not-apple-like" : ""}
    >
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
