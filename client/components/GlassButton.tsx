import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { GRADIENTS } from "~constants";
import { Element } from "~@types/CardGenerator";
import { WATER } from "~constants";

interface Props extends ButtonProps {
  children: React.ReactNode;
  gradient?: Element;
  onClick?: () => any;
}

const GlassButton = ({
  children,
  gradient = WATER,
  onClick = null,
  ...rest
}: Props) => {
  return (
    <Button
      onClick={onClick}
      borderRadius="sm"
      background={GRADIENTS[gradient]}
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
      {...rest}
    >
      {children}
    </Button>
  );
};

export default GlassButton;
