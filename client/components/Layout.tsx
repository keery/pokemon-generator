import React, { useEffect } from "react";
import { Flex, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "~components/Header";
import Footer from "~components/Footer";
import { ROUTE_GENERATOR, ROUTE_GALLERY } from "~constants";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { pathname } = useRouter();
  const { setColorMode, colorMode } = useColorMode();

  useEffect(() => {
    if (pathname !== ROUTE_GENERATOR && colorMode === "dark") {
      setColorMode("light");
    }
  }, [pathname]);

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
    </>
  );
};

export default Layout;
