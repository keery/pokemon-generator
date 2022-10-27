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
        duration="25s"
      />
      <Square
        border="1px solid rgba(255, 255, 255, 0.4)"
        delay="0.6s"
        duration="25s"
      />
      <Square
        border="0.75px solid rgba(255, 255, 255, 0.3)"
        delay="0.8s"
        duration="25s"
      />
      <Square
        border="0.5px solid rgba(255, 255, 255, 0.3)"
        delay="1s"
        duration="25s"
      />
      <Square
        border="0.5px solid rgba(255, 255, 255, 0.2)"
        delay="1.2s"
        duration="25s"
      />
      <Square
        border="0.5px solid rgba(255, 255, 255, 0.2)"
        delay="1.4s"
        duration="25s"
      />
      <Square
        border="0.5px solid rgba(255, 255, 255, 0.1)"
        delay="1.6s"
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
  );
};

export default GalleryTopBackground;
