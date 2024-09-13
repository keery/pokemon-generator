import React, { useState } from "react";
import { Container, HStack, ContainerProps, Flex, Box } from "@chakra-ui/react";
import Logo from "~components/Logo";
import Nav from "~components/Nav";
import { ROUTE_GENERATOR, HEADER_HEIGHT } from "~constants";
import usePathname from "~hooks/usePathname";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  Variants,
} from "framer-motion";

interface Props extends ContainerProps {
  noColorChange?: boolean;
}

const variants: Variants = {
  visible: {
    position: "fixed",
  },
  hidden: {
    position: "absolute",
  },
};

const Header = ({ noColorChange = false, ...rest }: Props) => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isAttached, setIsAttached] = useState<"visible" | "hidden">("hidden");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const ratio = 0.7;
    if (latest >= HEADER_HEIGHT * ratio && isAttached === "hidden") {
      setIsAttached("visible");
    } else if (latest <= HEADER_HEIGHT * ratio && isAttached === "visible") {
      setIsAttached("hidden");
    }
  });

  const logo = (
    <Logo color={pathname === ROUTE_GENERATOR ? "black" : "white"} />
  );

  return (
    <>
      <Box h={HEADER_HEIGHT} />
      <Box
        as={motion.header}
        zIndex={10}
        left={0}
        top={0}
        right={0}
        layerStyle={isAttached === "visible" ? "darkBlur" : ""}
        variants={variants}
        animate={isAttached}
      >
        <Container
          zIndex={1001}
          py={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          {...rest}
        >
          {!noColorChange ? (
            <Flex
              border="1px solid rgb(255 255 255 / 46%)"
              px={6}
              py={2}
              borderRadius="1rem"
              layerStyle={"glass"}
            >
              {logo}
            </Flex>
          ) : (
            <>{logo}</>
          )}
          <HStack alignItems="center" spacing={6}>
            <Nav />
          </HStack>
        </Container>
      </Box>
    </>
  );
};

export default Header;
