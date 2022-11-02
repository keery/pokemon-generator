import React from "react";
import { Text, TextProps } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

interface Props extends TextProps {
  text: string;
}

const TextShadow = ({ text, ...rest }: Props) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <Text
      {...rest}
      ref={ref}
      pos="relative"
      color="blueGray"
      display="inline-flex"
    >
      {text}
      <Text
        as="span"
        pos="absolute"
        w={inView ? "100%" : "0"}
        top="0"
        left="0"
        overflow="hidden"
        whiteSpace="nowrap"
        transition="width .9s cubic-bezier(.26,1,.48,1) 0s"
        transitionDelay="0.2s"
        color="black"
        {...rest}
      >
        {text}
      </Text>
    </Text>
  );
};

export default TextShadow;
