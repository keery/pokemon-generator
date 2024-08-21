"use client";
import React from "react";
import { Flex } from "@chakra-ui/react";
import usePathname from "~hooks/usePathname";
import Header from "~components/Header";
import Footer from "~components/Footer";
import { ROUTE_GENERATOR, ROUTE_GALLERY } from "~constants";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <Flex
        direction="column"
        h={pathname === ROUTE_GENERATOR ? "100%" : "auto"}
        overflow={pathname === ROUTE_GENERATOR ? "hidden" : "none"}
      >
        {pathname !== ROUTE_GENERATOR && (
          <Header
            noColorChange
            pos={pathname === ROUTE_GALLERY ? "absolute" : "static"}
            left="0"
            top="0"
            right="0"
          />
        )}
        {children}
      </Flex>
      <Footer isGeneratorPage={pathname === ROUTE_GENERATOR} />
      {/* {pathname !== ROUTE_GENERATOR ? <Footer /> : ""} */}
    </>
  );
};

export default Layout;
