import React, { useMemo } from "react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "~components/Header";
import Footer from "~components/Footer";
interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { pathname } = useRouter();
  const isMacLike = useMemo(() => {
    if (
      typeof navigator !== "undefined" &&
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
    ) {
      return "not-apple-like";
    }
    return "";
  }, []);

  return (
    <>
      <Flex
        direction="column"
        h={pathname === "/" ? "100%" : "auto"}
        className={isMacLike}
      >
        {pathname !== "/" && <Header noColorChange />}
        {children}
      </Flex>
      {pathname !== "/" ? <Footer /> : ""}
    </>
  );
};

export default Layout;
