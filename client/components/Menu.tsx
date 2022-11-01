import React from "react";
import Link from "~components/Link";
import { ROUTE_GALLERY, ROUTE_GENERATOR, ROUTE_CGU } from "~constants";
import { useTranslation } from "next-i18next";
import { Box, Text, VStack, Circle, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

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
  const { t } = useTranslation("common");
  const router = useRouter();

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
      />
      <Box
        onClick={() => setOpen(false)}
        top="0"
        bottom="0"
        pos="absolute"
        left="60%"
        right="0"
        zIndex={50}
      />
      {/* Circle shape on left */}
      <Box
        className="menu-circle"
        zIndex={9}
        transform={`translateX(-50%) translateY(-50%) scale(0)`}
        position="absolute"
        left="0"
        borderRadius="100%"
        transition="transform 0.5s 0.15s ease-in-out, box-shadow 0.4s 0.6s ease-in-out"
        width="60%"
        paddingBottom="60%"
        top="50%"
        backdropFilter="blur(4px) saturate(180%)"
        backgroundColor="rgb(20 27 40 / 60%)"
        boxShadow="0 0 0 transparent"
      />
      <Box className="wrapper">
        <Text className="label-menu">MENU</Text>
        <VStack
          w="60%"
          as="ul"
          alignItems="flex-start"
          pl="8%"
          fontFamily="title"
          fontSize="5rem"
          color="text"
        >
          {links.map(({ href, label }, i) => (
            <Flex
              as="li"
              className="menu-item"
              alignItems="center"
              role="group"
            >
              {router.route === href ? (
                <Circle
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
                    boxShadow="rgb(255 255 255 / 60%) 0px 0px 0px 0.5px inset, rgb(250 112 154) 8px 8px 0px 0px inset, rgb(120 75 160) 12px 12px 0px 0px inset, rgb(43 134 197) 18px 18px 0px 0px inset"
                  />
                </Circle>
              ) : (
                <Circle
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
                onClick={() => setOpen(false)}
                fontFamily="title"
                fontWeight="800"
                color="white"
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

      <Box
        className="menu-credit"
        fontSize="1rem"
        textTransform="uppercase"
        pos="absolute"
        bottom="1.5rem"
        left="5%"
        zIndex={10}
        color="white"
      >
        © {process.env.NEXT_PUBLIC_APP_NAME}
      </Box>
    </Box>
  );
};

export default Menu;
