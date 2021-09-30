import React from "react";
import { Flex } from "@chakra-ui/react";
import Logo from "~components/Logo";

const Header = () => {
  return (
    <Flex pos="relative" zIndex={99}>
      <Logo />
    </Flex>
  );
};

export default Header;
