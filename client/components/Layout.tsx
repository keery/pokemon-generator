import React, { useMemo } from "react";
import { Flex, useBreakpointValue } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const isVisible = useBreakpointValue({ base: true, xl: false });
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
    <Flex direction="column" h="100%" className={isMacLike}>
      {children}
    </Flex>
  );
};

export default Layout;
