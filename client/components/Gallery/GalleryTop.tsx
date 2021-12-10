import React from "react";
import { Container, Heading, Text, Box, Flex, Button } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import TitleGradient from "~components/Gallery/TitleGradient";
import HoloCard from "~components/Gallery/HoloCard";
import RotatingWord from "~components/RotatingWord";

const GalleryTop = () => {
  return (
    <Box pos="relative">
      <Box
        fontSize="11rem"
        fontWeight="800"
        fontFamily="title"
        pos="absolute"
        top="0"
        left="0"
        right="0"
      >
        <Marquee gradient={false} speed={80}>
          <div>Monthly winner</div>
          <Box bgColor="black" h=".4rem" w="10rem" margin="0 3rem" />
        </Marquee>
      </Box>
      <Container pos="relative" zIndex={6}>
        {/* <TitleGradient /> */}
        <Flex alignItems="center">
          <Flex direction="column" maxW="700px" pt="18rem">
            <Heading
              as="h1"
              textAlign="left"
              fontSize="5rem"
              fontWeight="800"
              fontFamily="title"
              lineHeight="1"
            >
              <div>Explore the </div>
              <div>card gallery</div>
            </Heading>
            <Text fontSize="2.5rem" lineHeight="1.1" fontFamily="title" pt={6}>
              The card that{" "}
              <Box as="span" layerStyle="gradientText" fontWeight="bold">
                receives
              </Box>{" "}
              the most votes will appear right here.
            </Text>
            <Flex pt={6}>
              <Button as="a" href="#top-10">
                Let's start voting !
              </Button>
            </Flex>
          </Flex>
          {/* <Text>
            card
            <Box
              bgImage="url(/assets/img/dash.svg)"
              bgPos="50% 100%"
              bgSize="contain"
              bgRepeat="no-repeat"
              as="span"
              fontWeight="500"
            >
              {" "}
              gallery
            </Box>
          </Text> */}

          <Flex pos="relative">
            {/* <Box
              pos="absolute"
              top="0"
              right="0"
              transform="translateX(50%) translateY(-20%)"
            >
              <RotatingWord />
            </Box> */}
            <HoloCard />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default GalleryTop;
