import React, { useState, useCallback, useEffect } from "react";
import Burger from "~src/components/Burger";
import Menu from "~src/components/Menu";
import { Box } from "@chakra-ui/react";

const Nav = () => {
  const [isOpen, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "inherit";
    }
  }, [isOpen]);

  return (
    <Box className={isOpen ? "open" : "close"}>
      <Burger onClick={toggle} isOpen={isOpen} />
      <Menu setOpen={setOpen} isOpen={isOpen} />
    </Box>
  );
};

export default Nav;
