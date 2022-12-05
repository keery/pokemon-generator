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
    name: "menu.generator",
    href: ROUTE_GENERATOR,
  },
  {
    name: "menu.gallery",
    href: ROUTE_GALLERY,
  },
  {
    name: "menu.cgu",
    href: ROUTE_CGU,
  },
];

const date = new Date();

const Footer = () => {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();
  const { data: nbCards, isLoading } = useCardsCount();

  return (
    <Box
      as="footer"
      pos="relative"
      overflow="hidden"
      color="white"
      // backdropFilter="blur(4px) saturate(180%)"
      // backgroundColor="rgb(20 27 40 / 60%)"
      zIndex={10}
    >
      <Container pt="3rem" pos="relative" zIndex={9}>
        <Flex
          justifyContent="space-between"
          flexDirection={{
            base: "column",
            md: "row",
          }}
        >
          <Flex direction="column">
            <Logo noLink color="white" />
            <Text
              mt="1rem"
              fontSize="0.9rem"
              maxW={{
                base: "100%",
                md: "26rem",
              }}
            >
              {t("footer.description", {
                name: process.env.NEXT_PUBLIC_APP_NAME,
              })}
            </Text>
          </Flex>
          <VStack
            flexDirection="column"
            alignItems={{
              base: "center",
              md: "flex-end",
            }}
            alignSelf="center"
            mt={{ base: 10, md: 0 }}
            fontSize={{
              base: "1.9rem",
              md: "1rem",
            }}
          >
            <Text
              fontWeight="800"
              fontSize="1.2em"
              fontFamily="title"
              color="new.3"
              textTransform="uppercase"
            >
              {t("footer.navigation")}
            </Text>
            {menu.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                fontWeight={pathname === href ? "bold" : 400}
                color="white"
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
          borderColor="gray.400"
          paddingY="1.8rem"
          mt="1.8rem"
          fontSize="sm"
          flexDir={{
            base: "column-reverse",
            md: "row",
          }}
        >
          <Text>
            © {date.getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}.{" "}
            {t("footer.madeBy")}{" "}
            <ChakraLink
              href={ROUTE_PORTFOLIO}
              isExternal
              fontWeight="bold"
              color="new.2"
            >
              Guillaume Esnault
            </ChakraLink>
          </Text>

          {!isLoading && (
            <Flex
              alignItems="center"
              mb={{ base: "1rem", md: 0 }}
              fontSize={{
                base: "1.5rem",
                md: "1rem",
              }}
            >
              <Box as="b" color="new.4">
                {Boolean(nbCards) ? nbCards.toLocaleString() : 0}
              </Box>
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
