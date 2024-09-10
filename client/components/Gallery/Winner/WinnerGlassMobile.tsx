import React from "react";
import { Flex, AspectRatio, Container, Box, Text } from "@chakra-ui/react";
import FrontHoloCard from "~components/Gallery/FrontHoloCard";
import { Winner } from "~@types/Winner";
import { useTranslations } from "next-intl";
import Link from "~components/Link";
import Button from "~components/Button";
import { ROUTE_GENERATOR } from "~constants";

interface Props {
  winner: Winner;
}

const WinnerGlassMobile = ({ winner }: Props) => {
  const t = useTranslations();

  return (
    <>
      <Container pb={4}>
        <Flex flexDir="column" pos="relative" w="100%" zIndex="18">
          {winner ? (
            <>
              <Text
                fontFamily="title"
                fontWeight="800"
                fontSize={{ base: "2rem", sm: "3rem", md: "4rem" }}
                color="white"
                pos="sticky"
                top="0"
                lineHeight="1.2"
              >
                {t("winner.title", { weekNb: winner.id })} 🏆
              </Text>
              <Text
                fontSize={{
                  base: "1rem",
                  md: "1.2rem",
                }}
                layerStyle="ellipsis"
                color="white"
              >
                {winner.card.name}
              </Text>
              <Text
                fontSize={{
                  base: "1rem",
                  md: "1.2rem",
                }}
                layerStyle="ellipsis"
                color="white"
              >
                {t("winner.createdBy")}{" "}
                <Box as="i" color="new.1">
                  {winner.card.author}
                </Box>
              </Text>
            </>
          ) : (
            <>
              <Text
                fontFamily="title"
                fontWeight="800"
                fontSize="2rem"
                color="white"
              >
                {t("winner.no.title")}
              </Text>
              <Text fontSize="1.2rem" color="white">
                {t("winner.no.description")}
              </Text>
              <Button as={Link} href={ROUTE_GENERATOR} mt="1.5rem">
                {t("winner.no.button")}
              </Button>
            </>
          )}
        </Flex>
      </Container>
      <Container>
        <Box
          style={{
            backgroundImage: "url(/assets/img/waves.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "160%",
            backgroundPosition: "center",
            position: "absolute",
            left: "0",
            right: "0",
            top: "10%",
            bottom: "0",
            zIndex: 9,
          }}
        />
        {winner && (
          <Flex justifyContent="center" zIndex="20" position="relative">
            <AspectRatio
              ratio={400 / 555}
              maxW="400px"
              alignSelf="center"
              w="100%"
              style={{
                perspective: "2000px",
              }}
            >
              <FrontHoloCard
                winner={winner}
                animationCard="holoCard 12s ease 0s infinite"
                animationGradient="holoGradient 12s ease 0s infinite"
                animationSparkle="holoSparkle 12s ease 0s infinite"
              />
            </AspectRatio>
          </Flex>
        )}
      </Container>
    </>
  );
};

export default WinnerGlassMobile;
