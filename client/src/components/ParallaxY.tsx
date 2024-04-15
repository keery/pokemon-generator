import React from "react";
import {
  m,
  useTransform,
  useViewportScroll,
  isValidMotionProp,
  MotionStyle,
} from "framer-motion";
import { chakra, shouldForwardProp, BoxProps } from "@chakra-ui/react";

const ChakraBox = chakra(m.div, {
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
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, input, output);

  // @ts-ignore
  return <ChakraBox style={{ y, ...style }} {...rest} />;
};

export default ParallaxY;
