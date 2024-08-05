import React, { useRef } from "react";
import Link from "~components/Link";
import useSafariBackdropFilter from "~hooks/useSafariBackdropFilter";
import { ROUTE_GALLERY, ROUTE_GENERATOR, ROUTE_CGU } from "~constants";
import { useTranslation } from "next-i18next";
import {
  Box,
  Text,
  VStack,
  Circle,
  Flex,
  useTheme,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Instagram from "public/assets/img/instagram.svg";

const links = [
  {
    href: ROUTE_GENERATOR,
    label: "menu.generator",
  },
  {
    href: ROUTE_GALLERY,
    label: "menu.gallery",
  },
  {
    href: ROUTE_CGU,
    label: "menu.cgu",
  },
];

const Menu = ({ setOpen, isOpen }) => {
  const ref = useRef(null);
  const { t } = useTranslation("common");
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useSafariBackdropFilter(ref, isOpen);

  return (
    <Box
      id="menu"
      overflow="hidden"
      display="block"
      position="fixed"
      left={0}
      top={0}
    >
      {/* Overlay */}
      <Box
        className="menu-overlay"
        onClick={() => setOpen(false)}
        zIndex="9"
        transform={`translateX(-50%) translateY(-50%) scale(0)`}
        position="absolute"
        left="0"
        borderRadius="100%"
        transition="all 0.5s ease-in-out"
        width="100%"
        backgroundColor="rgb(20 27 40 / 60%)"
        paddingBottom="100%"
        top="0"
        sx={{
          ".open #menu &": {
            transform: {
              base: "translateX(-50%) translateY(-50%) scale(6)",
              md: "translateX(-50%) translateY(-50%) scale(3)",
            },
          },
          ".close #menu &": {
            transform: "translateX(-50%) translateY(-50%) scale(0)",
          },
        }}
      />
      <Box
        display={{
          base: "none",
          md: "block",
        }}
        onClick={() => setOpen(false)}
        top="0"
        bottom="0"
        pos="absolute"
        left={{
          base: "100%",
          md: "80%",
          lg: "65%",
        }}
        right="0"
        zIndex={50}
      />
      {/* Circle shape on left */}
      <Box
        ref={ref}
        className="menu-circle"
        zIndex={9}
        // transform={`translateX(-50%) translateY(-50%) scale(0)`}
        position="absolute"
        left="0"
        borderRadius="100%"
        transition="transform 0.5s 0.15s ease-in-out, box-shadow 0.4s 0.6s ease-in-out"
        width={{
          base: "100%",
          md: "80%",
          lg: "65%",
        }}
        paddingBottom={{
          base: "100%",
          md: "80%",
          lg: "65%",
        }}
        maxW="1550px"
        top="50%"
        backdropFilter="blur(4px) saturate(180%)"
        backgroundColor="rgb(20 27 40 / 60%)"
        boxShadow="0 0 0 transparent"
        sx={{
          ".open #menu &": {
            transform: {
              base: "translateX(-50%) translateY(-50%) scale(6)",
              md: "translateX(-50%) translateY(-50%) scale(2)",
            },
            boxShadow: "1px 1px 0px rgb(255 255 255 / 51%)",
          },
          ".close #menu &": {
            transform: "translateX(-150%) translateY(-150%) scale(0)",
            transitionDelay: "0!important",
          },
        }}
      />
      <Box
        as="nav"
        className="wrapper"
        width="100%"
        position="absolute"
        zIndex="10"
        top={{
          base: "0",
          md: "50%",
        }}
        height={{
          base: "100%",
          md: "auto",
        }}
        transform={{
          base: "translateY(0)",
          md: "translateY(-50%)",
        }}
      >
        <Text
          className="label-menu"
          position="absolute"
          left={{
            base: "calc(3vw - 19px)",
            lg: "calc(5vw - 19px)",
          }}
          top={{
            base: "2rem",
            md: "2.2rem",
            lg: "2.5rem",
            xl: "3rem",
          }}
          color="new.3"
          borderColor="new.3"
          borderBottom="1px solid"
        >
          MENU
        </Text>
        <VStack
          width={{
            base: "100%",
            md: "80%",
            lg: "65%",
          }}
          as="ul"
          alignItems={{
            base: "center",
            md: "flex-start",
          }}
          pl={{
            base: "0",
            md: "8%",
          }}
          fontFamily="title"
          fontSize={{
            base: "2.6rem",
            sm: "3rem",
            md: "4rem",
            lg: "4.4rem",
            xl: "5rem",
          }}
          color="text"
          justifyContent="center"
          height="100%"
          px={1}
        >
          {links.map(({ href, label }, i) => (
            <Flex
              key={href}
              as="li"
              className="menu-item"
              alignItems="center"
              role="group"
              transform="translateX(-34px)"
            >
              {router.route === href ? (
                <Circle
                  display={{ base: "none", md: "block" }}
                  border="1px solid white"
                  size="30px"
                  pos="relative"
                  overflow="hidden"
                  mr={4}
                >
                  <Box
                    borderRadius="100%"
                    w="100%"
                    h="100%"
                    filter="blur(4px)"
                    boxShadow={`rgb(255 255 255 / 60%) 0px 0px 0px 0.5px inset, ${theme.colors.new[1]} 8px 8px 0px 0px inset, ${theme.colors.new[3]} 12px 12px 0px 0px inset, ${theme.colors.new[4]} 18px 18px 0px 0px inset`}
                  />
                </Circle>
              ) : (
                <Circle
                  display={{ base: "none", md: "block" }}
                  opacity={0}
                  border="1px solid white"
                  size="30px"
                  pos="relative"
                  overflow="hidden"
                  transition="opacity 150ms ease-in-out"
                  mr={4}
                  _groupHover={{
                    opacity: 1,
                  }}
                />
              )}
              <Link
                href={href}
                onClick={() => (router.route !== href ? setOpen(false) : null)}
                fontFamily="title"
                fontWeight="800"
                display="inline-block"
                textAlign="center"
                color="white"
                lineHeight="1"
                sx={
                  isMobile && {
                    backgroundColor: "white",
                    backgroundImage:
                      router.route === href ? theme.gradient.main : null,
                    _hover: {
                      backgroundImage: theme.gradient.main,
                    },
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                }
                _hover={{
                  textDecoration: "none",
                }}
              >
                {t(label)}
              </Link>
            </Flex>
          ))}
        </VStack>
      </Box>

      <Link
        href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
        isExternal
        _hover={{
          color: "new.4",
        }}
        display="block"
        pos="absolute"
        bottom="1.5rem"
        left={{
          base: "3%",
          lg: "5%",
        }}
        zIndex={10}
      >
        <Flex
          className="menu-credit"
          fontSize="1rem"
          textTransform="uppercase"
          color="new.3"
          alignItems="center"
          textDecoration="underline"
        >
          <Instagram /> <Box pl={2}>{t("follow")}</Box>
        </Flex>
      </Link>
    </Box>
  );
};

export default Menu;
