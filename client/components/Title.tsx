import React, { useRef } from "react";
import { Heading, HeadingProps } from "@chakra-ui/react";
import { m, useTransform, useViewportScroll } from "framer-motion";
import useOffsetTop, { Mode } from "~hooks/useOffsetTop";

interface Props extends HeadingProps {
  children: React.ReactNode;
}

const Title = ({ children, ...rest }: Props) => {
  const ref = useRef();
  const { scrollY } = useViewportScroll();
  const { top } = useOffsetTop(ref, Mode.APPEND, true);
  const x = useTransform(scrollY, [top, top + 120], [-1000, 0]);
  const opacity = useTransform(scrollY, [top, top + 120], [0, 1]);

  return (
    <Heading
      ref={ref}
      fontWeight="800"
      fontSize="5.8rem"
      fontFamily="title"
      overflow="hidden"
      transition="font-size linear 200ms"
      {...rest}
    >
      <m.div style={{ x, opacity }}>{children}</m.div>
    </Heading>
  );
};

export default Title;
