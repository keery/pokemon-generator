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
import Button from "~components/Button";
import Instagram from "public/assets/img/instagram.svg";
import Link from "~components/Link";
import {
  ROUTE_PORTFOLIO,
  ROUTE_GALLERY,
  ROUTE_GENERATOR,
  ROUTE_CGU,
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

const Footer = ({ isGeneratorPage = false }) => {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();
  const { data: nbCards, isLoading } = useCardsCount();

  return (
    <Box
      as="footer"
      pos="relative"
      overflow="hidden"
      color={isGeneratorPage ? "text" : "white"}
      layerStyle={isGeneratorPage ? "glass" : "none"}
      backgroundColor={isGeneratorPage ? "rgb(255 255 255 / 60%)" : "none"}
      mt="8"
      borderTopRadius="60px"
      borderTop={isGeneratorPage ? "1px solid white" : "none"}
      zIndex={10}
    >
      <Container py="3rem" pos="relative" zIndex={9}>
        <Flex
          justifyContent="space-between"
          flexDirection={{
            base: "column",
            md: "row",
          }}
        >
          <Flex direction="column">
            <Logo noLink color={isGeneratorPage ? "text" : "white"} />
            <Flex pt={6} justifyContent="center">
              <Link href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}>
                <Button>
                  <Instagram />
                  <Box pl={2} fontWeight="bold">
                    {t("follow")}
                  </Box>
                </Button>
              </Link>
            </Flex>
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
              color={isGeneratorPage ? "new.1" : "new.3"}
              textTransform="uppercase"
            >
              {t("footer.navigation")}
            </Text>
            <VStack
              as="nav"
              alignItems={{
                base: "center",
                md: "flex-end",
              }}
            >
              {menu.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  fontWeight={pathname === href ? "bold" : 400}
                  color={isGeneratorPage ? "text" : "white"}
                >
                  {t(name)}
                </Link>
              ))}
            </VStack>
          </VStack>
        </Flex>
        <Flex
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor="gray.400"
          mt="2rem"
        >
          <Text my="1rem" fontSize="0.9rem">
            {t("footer.description", {
              name: process.env.NEXT_PUBLIC_APP_NAME,
            })}
          </Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mt="1.8rem"
          fontSize="sm"
          fontWeight="bold"
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
              color={isGeneratorPage ? "new.1" : "new.2"}
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
