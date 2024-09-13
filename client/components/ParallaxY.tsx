import React from "react";
import {
  motion,
  useTransform,
  useScroll,
  isValidMotionProp,
  MotionStyle,
  useMotionValueEvent,
} from "framer-motion";
import { chakra, shouldForwardProp, BoxProps } from "@chakra-ui/react";

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export interface ParallaxYProps extends Omit<BoxProps, "style"> {
  input: number[];
  output: number[];
  style?: MotionStyle;
}

const ParallaxY = ({ input, output, style = {}, ...rest }: ParallaxYProps) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, input, output);

  // console.log(y);
  return <ChakraBox style={{ y, ...style }} {...rest} />;
};

export default ParallaxY;
