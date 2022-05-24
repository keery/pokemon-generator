import React from "react";
import { Container, Heading, Text, Box, Flex, Button } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import TitleGradient from "~components/Gallery/TitleGradient";
import HoloCard from "~components/Gallery/HoloCard";
import RotatingWord from "~components/RotatingWord";
import { GRADIENTS } from "~constants";

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
        <Marquee gradient={false} speed={120}>
          <div>Monthly winner</div>
          <Box bgColor="black" h=".4rem" w="10rem" margin="0 3rem" />
        </Marquee>
      </Box>
      <Container pos="relative" zIndex={6}>
        {/* <TitleGradient /> */}
        <Flex alignItems="center">
          <Flex direction="column" maxW="700px" pt="16rem">
            <Heading
              as="h1"
              textAlign="left"
              fontSize="11rem"
              fontWeight="800"
              fontFamily="title"
              lineHeight="1"
            >
              <div>Gallery</div>
            </Heading>
            <Text fontSize="2rem" lineHeight="1.1" fontFamily="title" pt={6}>
              The card that receives the most votes each month will appear right
              here.
            </Text>
            <Flex pt={6}>
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
              <Button
                borderRadius="sm"
                // w="full"
                // background={GRADIENTS.water}
                // fontSize="md"
                // color="main"
                // backdropFilter="blur(4px) saturate(180%)"
                // bgColor="rgb(255 255 255 / 0%)"
                // border="1px solid rgb(255 255 255 / 60%)"
                // height="55px"
                // textTransform="uppercase"
                // fontWeight="600"
                // letterSpacing="1.5px"
                // overflow="hidden"
                // transition="all 200ms"
                // _active={{
                //   bgColor: "white",
                //   transform: "scale(0.95)",
                // }}
                // _before={{
                //   content: '""',
                //   position: "absolute",
                //   top: 0,
                //   left: "-100%",
                //   width: "100%",
                //   height: "100%",
                //   background:
                //     "linear-gradient( 120deg, transparent, rgba(255,255,255, 0.4), transparent )",
                //   transition: "all 650ms",
                // }}
                // _hover={{
                //   boxShadow: "1px 1px 25px 0px rgb(34 34 34 / 11%)",
                //   _before: {
                //     left: "100%",
                //   },
                // }}
                border="10px solid"
                borderWidth="5px"
                style={{
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(to left, #743ad5, #d53a9d)",
                }}
                // .border-gradient {
                //   border: 10px solid;
                //   border-image-slice: 1;
                //   border-width: 5px;
                // }
                // .border-gradient-purple {
                //   border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
                // }
              >
                Create my card
              </Button>
              {/* <Button as="a" href="#top-10">
                Let's start voting !
              </Button> */}
              {/* <Button as="a" href="#top-10">
                Create my card
              </Button> */}
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
