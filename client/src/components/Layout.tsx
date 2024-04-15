"use client";
import React from "react";
import { Flex } from "@chakra-ui/react";
import Header from "~src/components/Header";
import Footer from "~src/components/Footer";
import usePathname from "~hooks/usePathname";
import { ROUTE_GENERATOR, ROUTE_GALLERY } from "~constants";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname();

  // const { setColorMode, colorMode } = useColorMode();

  // TODO: disabled for migration
  // useEffect(() => {
  //   if (pathname !== ROUTE_GENERATOR && colorMode === "dark") {
  //     setColorMode("light");
  //   }
  // }, [pathname]);

  return (
    <>
      <Flex
        direction="column"
        h={pathname === ROUTE_GENERATOR ? "100%" : "auto"}
      >
        {pathname !== ROUTE_GENERATOR ||
          (pathname.startsWith("/modal") && (
            <Header
              noColorChange
              pos={pathname === ROUTE_GALLERY ? "absolute" : "static"}
              left="0"
              top="0"
              right="0"
            />
          ))}
        {children}
      </Flex>
      {pathname !== ROUTE_GENERATOR ? <Footer /> : ""}
    </>
  );
};

export default Layout;
