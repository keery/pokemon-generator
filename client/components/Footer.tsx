import React from "react";
import {
  Container,
  Flex,
  Text,
  Box,
  Link as ChakraLink,
  VStack,
  Image,
} from "@chakra-ui/react";
import Logo from "~components/Logo";
import Link from "~components/Link";
import {
  ROUTE_PORTFOLIO,
  ROUTE_GALLERY,
  ROUTE_GENERATOR,
  ROUTE_CGU,
  ROUTE_SITEMAP,
  LOGO,
} from "~constants";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useCardsCount from "~hooks/useCardsCount";

const menu = [
  {
    name: "footer.menu.generator",
    href: ROUTE_GENERATOR,
  },
  {
    name: "footer.menu.gallery",
    href: ROUTE_GALLERY,
  },
  {
    name: "footer.menu.cgu",
    href: ROUTE_CGU,
  },
  {
    name: "footer.menu.sitemap",
    href: ROUTE_SITEMAP,
  },
];

const date = new Date();

const colorTextFooter = "#636363";

const Footer = () => {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();
  const { data: nbCards, isLoading } = useCardsCount();

  return (
    <Box
      as="footer"
      backgroundColor="white"
      mt="3rem"
      pos="relative"
      overflow="hidden"
      color={colorTextFooter}
    >
      <Container pt="3rem" pos="relative" zIndex={9}>
        <Flex justifyContent="space-between">
          <Flex direction="column">
            <Logo noLink />
            <Text mt="1rem" fontSize="0.9rem" maxW="26rem">
              {t("footer.description", {
                name: process.env.NEXT_PUBLIC_APP_NAME,
              })}
            </Text>
          </Flex>
          <VStack flexDirection="column" alignItems="flex-end">
            <Text fontWeight="800" color="text" fontSize="1.9em">
              {t("footer.navigation")}
            </Text>
            {menu.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                fontWeight={pathname === href ? "bold" : 400}
                color={colorTextFooter}
              >
                {t(name)}
              </Link>
            ))}
          </VStack>
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          borderTop="1px solid"
          borderColor="rgb(0 0 0 / 8%)"
          paddingY="1.8rem"
          mt="1.8rem"
          fontSize="sm"
        >
          <Text>
            © {date.getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}.{" "}
            {t("footer.madeBy")}{" "}
            <ChakraLink href={ROUTE_PORTFOLIO} isExternal fontWeight="bold">
              Guillaume Esnault
            </ChakraLink>
          </Text>

          {!isLoading && (
            <Flex>
              <b>{Boolean(nbCards) ? nbCards.toLocaleString() : 0}</b>
              <Text ml="0.3rem">{t("footer.cardCreated")}</Text>
              <Image src={LOGO} alt={`Pokeball`} w="1.5rem" ml="0.7rem" />
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;