import React from "react";
import { Container, Heading, Text, Box, Flex, Button } from "@chakra-ui/react";
import TitleGradient from "~components/Gallery/TitleGradient";
import HoloCard from "~components/Gallery/HoloCard";
import Countdown from "~components/Gallery/Countdown";
import RotatingWord from "~components/RotatingWord";
import GalleryTopBackground from "~components/Gallery/GalleryTopBackground";
import { GRADIENTS } from "~constants";
import { useTranslation } from "next-i18next";

const GalleryTop = () => {
  const { t } = useTranslation("gallery");

  return (
    <>
      <GalleryTopBackground />
      <Box pos="relative" h="100vh" zIndex={90}>
        {/* <Box fontSize="11rem" fontWeight="800">
          <Marquee gradient={false} speed={120}>
            <Box>Weekly winner</Box>
            <Box bgColor="black" h=".4rem" w="10rem" margin="0 3rem" />
          </Marquee>
        </Box> */}
        <Container pos="relative" zIndex={6}>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex
              direction="column"
              maxW="560px"
              alignSelf="baseline"
              w="full"
              mt={8}
            >
              <Text
                fontSize="6rem"
                lineHeight="1.2"
                fontWeight="800"
                fontFamily="tusker"
                width="fit-content"
                mt={6}
                pt={6}
                alignSelf="end"
                color="white"
              >
                {t("nextWinner")}
              </Text>
              <Countdown />
              {/* <Text
                fontSize="6rem"
                lineHeight="1.2"
                fontWeight="800"
                fontFamily="tusker"
                width="fit-content"
                display="flex"
                color="#fff6f6"
              >
                Be
                <SpanGradient
                  pl={5}
                  words={["creative", "stunning", "hilarious"]}
                />
              </Text> */}
              {/* <Button variant="glass">Create a card</Button> */}
              {/* <Text
                fontSize="6rem"
                lineHeight="1"
                py={2}
                fontWeight="800"
                fontFamily="title"
                borderTop="1px solid black"
                width="fit-content"
                pt={6}
                mt={6}
                alignSelf="end"
              >
                Publish
              </Text> */}
              {/* Next winner might be you */}
              {/* <Text fontSize="2rem" lineHeight="1.1" fontFamily="title" pt={6}>
                Next winner in
              </Text>
              <Text
                fontFamily="title"
                fontSize="9rem"
                fontWeight="800"
                lineHeight="1.1"
                pt={6}
              >
                01:27
              </Text> */}
              {/* <Flex pt={6}>
              <Button
                borderRadius="sm"
                w="full"
                background={GRADIENTS.water}
                fontSize="md"
                color="main"
                backdropFilter="blur(4px) saturate(180%)"
                bgColor="rgb(255 255 255 / 0%)"
                border="1px solid rgb(255 255 255 / 60%)"
                height="55px"
                textTransform="uppercase"
                fontWeight="600"
                letterSpacing="1.5px"
                overflow="hidden"
                transition="all 200ms"
                _active={{
                  bgColor: "white",
                  transform: "scale(0.95)",
                }}
                _before={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient( 120deg, transparent, rgba(255,255,255, 0.4), transparent )",
                  transition: "all 650ms",
                }}
                _hover={{
                  boxShadow: "1px 1px 25px 0px rgb(34 34 34 / 11%)",
                  _before: {
                    left: "100%",
                  },
                }}
              >
                Let's start voting !
              </Button>
            </Flex> */}
            </Flex>

            <HoloCard />
          </Flex>
          {/* <Box
            pos="absolute"
            bottom="0"
            left="0"
            transform="translateX(50%) translateY(-20%)"
          >
            <RotatingWord />
          </Box> */}
        </Container>
      </Box>
    </>
  );
};

export default GalleryTop;
