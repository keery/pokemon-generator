import React, { useState, useCallback } from "react";
import Burger from "~components/Burger";
import Menu from "~components/Menu";
import { Box } from "@chakra-ui/react";

const Nav = () => {
  const [isOpen, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  return (
    <Box className={isOpen ? "open" : "close"}>
      <Burger onClick={toggle} isOpen={isOpen} />
      <Menu setOpen={setOpen} isOpen={isOpen} />
    </Box>
  );
};

export default Nav;
