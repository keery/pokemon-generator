import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import { GRADIENTS } from "~constants";
import Stripe from "public/assets/img/stripe.svg";
import Wave3 from "public/assets/img/waves/wave3.svg";

interface SquareProps extends FlexProps {
  delay: string;
  duration: string;
}

const Square = ({ delay, duration, ...rest }: SquareProps) => {
  return (
    <Flex
      w="450px"
      h="450px"
      pos="absolute"
      borderRadius="80px"
      animation={`rotate ${duration} ${delay} infinite linear`}
      transition="all 2s cubic-bezier(0.075, 0.82, 0.165, 1) 0s"
      _groupHover={{
        boxShadow: "rgb(255 255 255 / 4%) 0px 300px 200px inset",
        border: "1px solid rgba(49, 18, 156, 0.8)",
      }}
      zIndex={1}
      {...rest}
    />
  );
};

const GalleryTopBackground = () => {
  return (
    <>
      {/* <Flex
        background="url(/assets/img/waves/wave1.png) center top / 3000px no-repeat"
        height="300px"
        position="absolute"
        top="370px"
        left="0"
        right="0"
        z-index={-15}
      />
      <Flex
        backgroundImage="/assets/img/waves/wave2.svg"
        backgroundPosition="-245px 165px"
        backgroundRepeat="no-repeat"
        h="1000px"
        position="absolute"
        top="320px"
        left="0"
        right="0"
      /> */}
      {/* <Flex
        position="absolute"
        top="80vh"
        h="80vh"
        left="0"
        right="0"
        backgroundColor="#29244f"
        zIndex={-2}
      />
      <Flex
        position="absolute"
        width="100%"
        zIndex={4}
        overflow="hidden"
        transformOrigin="left top"
        top="120vh"
        height="75vh"
        clipPath="url(#wave3)"
        background="linear-gradient(rgb(31 31 71 / 29%) -18.72%, rgb(31, 31, 71) 37.6%)"
      >
        <Wave3 />
      </Flex> */}
      <Flex w="450px" h="450px" pos="absolute" top="12%" left="2%">
        <Square
          border="1.5px solid rgba(255, 255, 255, 0.5)"
          delay="0.2s"
          duration="25s"
          backdropFilter="blur(4px)"
          backgroundColor="rgb(255 255 255 / 20%)"
          zIndex={6}
        />
        <Square
          border="1.5px solid rgba(255, 255, 255, 0.4)"
          delay="0.4s"
          // duration="24.8s"
          duration="25s"
        />
        <Square
          border="1px solid rgba(255, 255, 255, 0.4)"
          delay="0.6s"
          // duration="24.6s"
          duration="25s"
        />
        <Square
          border="0.75px solid rgba(255, 255, 255, 0.3)"
          delay="0.8s"
          // duration="24.4s"
          duration="25s"
        />
        <Square
          border="0.5px solid rgba(255, 255, 255, 0.3)"
          delay="1s"
          // duration="24.2s"
          duration="25s"
        />
        <Square
          border="0.5px solid rgba(255, 255, 255, 0.2)"
          delay="1.2s"
          // duration="24s"
          duration="25s"
        />
        <Square
          border="0.5px solid rgba(255, 255, 255, 0.2)"
          delay="1.4s"
          // duration="23.8s"
          duration="25s"
        />
        <Square
          border="0.5px solid rgba(255, 255, 255, 0.1)"
          delay="1.6s"
          // duration="23.6s"
          duration="25s"
        />
        <Square
          animation="none"
          delay="0.2s"
          duration="25s"
          boxShadow="rgb(255 255 255 / 60%) 0px 0px 0px 0.5px inset, rgb(250 112 154) 100px 100px 0px 0px inset, rgb(120 75 160) 200px 200px 0px 0px inset, rgb(43 134 197) 300px 300px 0px 0px inset"
          filter="blur(50px)"
          zIndex={0}
        />
      </Flex>
    </>
    // <Flex
    //   overflow="hidden"
    //   pos="absolute"
    //   h="100vh"
    //   left="0"
    //   right="0"
    //   bottom="0"
    //   top="0"
    //   _before={{
    //     content: '""',
    //     pos: "absolute",
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     top: 0,
    //     background: GRADIENTS.water,
    //     // backgroundImage:
    //     //   "url(https://tailwindcss.com/_next/static/media/hero@75.4dea7abe609fc522c039fba7662ceea2.jpg)",
    //     backgroundSize: "150rem",
    //     backgroundRepeat: "no-repeat",
    //     backgroundPosition: "bottom",
    //     // backgroundColor: "#6f26b2",
    //   }}
    // >
    //   {/* <Flex
    //     // as={m.div}
    //     // style={{
    //     //   x: x2,
    //     //   y: y2,
    //     //   opacity,
    //     // }}
    //     w="100%"
    //     h="500px"
    //     // mixBlendMode="difference"
    //     // background="white"
    //     pos="absolute"
    //     top="38.5%"
    //     left="0"

    //     // borderRadius="56.4253% 43.5747% 33.7529% 66.2471% / 52.5661% 47.8477% 52.1523% 47.4339%"
    //   /> */}
    //   {/* <Flex
    //     animation="rotate 30s infinite linear"
    //     transformOrigin="center"
    //     w="100%"
    //     h="100%"
    //   >
    //     <Stripe
    //       fill="rgb(255 255 255 / 19%)"
    //       style={{
    //         width: "2130px",
    //         height: "2220px",
    //         minWidth: "fit-content",
    //         position: "absolute",
    //         left: "50%",
    //         top: "50%",
    //         transform: "translate(-50%, -50%)",
    //       }}
    //       // animation="rotate 6s infinite"
    //     />
    //   </Flex> */}
    //   {/* <Box pos="absolute" w="100%" h="100%" top="30%" left="-10%">
    //     <Wave1
    //       // fill="#52a4ff"
    //       fill="#ffcd04"
    //     />
    //   </Box>
    //   <Box backdropFilter="blur(60px)" w="100%" h="100%" pos="absolute" />
    //   <Box pos="absolute" w="110%" h="100%" top="22%" left="-10%">
    //     <Wave2
    //       width="100%"
    //       height="auto"
    //       // fill="url(#a)"
    //       fill="#52a4ff"
    //     />
    //   </Box>
    //   <Box pos="absolute" w="110%" h="100%" top="35%" left="-10%">
    //     <Wave2
    //       width="100%"
    //       height="auto"
    //       // fill="url(#a)"
    //       fill="#0d4aa6"
    //     />
    //   </Box> */}
    //   {/* <Box
    //     pos="absolute"
    //     w="100%"
    //     h="100%"
    //     background="linear-gradient(rgb(46 100 184) -18.72%, #0d4aa6 37.6%)"
    //     // background="linear-gradient(rgba(31, 31, 71, 0.25) -18.72%, #1156bd 37.6%)"

    //     top="65%"
    //     clipPath="url(#clip)"
    //   >
    //     <Wave3 />
    //   </Box> */}
    // </Flex>
  );
};

export default GalleryTopBackground;
