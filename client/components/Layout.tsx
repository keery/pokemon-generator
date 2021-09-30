import React from "react";
import { Flex } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Flex direction="column" h="100%">
      {children}
    </Flex>
  );
};

export default Layout;
