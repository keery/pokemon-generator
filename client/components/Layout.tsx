"use client";
import React from "react";
import { Flex } from "@chakra-ui/react";
import usePathname from "~hooks/usePathname";
import Header from "~components/Header";
import Footer from "~components/Footer";
import { ROUTE_GENERATOR, ROUTE_GALLERY, HEADER_HEIGHT } from "~constants";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname();

  const isGeneratorPage = pathname === ROUTE_GENERATOR;

  return (
    <>
      <Flex
        direction="column"
        h={isGeneratorPage ? "100%" : "auto"}
        overflow={isGeneratorPage ? "hidden" : "none"}
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
      <Footer isGeneratorPage={isGeneratorPage} />
    </>
  );
};

export default Layout;
