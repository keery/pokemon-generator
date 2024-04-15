import React from "react";
import { Heading, HeadingProps } from "@chakra-ui/react";

interface Props extends HeadingProps {
  children: React.ReactNode;
}

const Title = ({ children, ...rest }: Props) => {
  return (
    <Heading
      fontWeight="800"
      fontSize="5.8rem"
      fontFamily="title"
      overflow="hidden"
      transition="font-size linear 200ms"
      {...rest}
    >
      {children}
    </Heading>
  );
};

export default Title;
