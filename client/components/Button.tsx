import React from "react";
import { Button as ChakraButton, ButtonProps, Box } from "@chakra-ui/react";

interface BgLayerProps {
  delay: string;
  bgColor: string;
}

const BgLayer = ({ delay, bgColor }: BgLayerProps) => {
  return (
    <Box
      bgColor={bgColor}
      borderRadius="9999px"
      position="absolute"
      top="0"
      left="0"
      width="100%"
      height="100%"
      transform="scale(0)"
      _groupHover={{
        transition:
          "transform 1.3s cubic-bezier(.19,1,.22,1),opacity .3s linear",
        transform: "scale(1)",
        transitionDelay: delay,
      }}
    />
  );
};

interface Props extends ButtonProps {
  children: React.ReactNode;
  href?: string;
  hasNoText?: boolean;
  layerColors?: string[];
}

const Button = ({
  children,
  hasNoText = false,
  layerColors = ["new.4", "new.1", "new.3"],
  ...rest
}: Props) => {
  return (
    <ChakraButton
      height="4rem"
      px="2.5rem"
      borderRadius="13rem"
      fontSize="1.3rem"
      letterSpacing="-.03em"
      fontFamily="body"
      bgColor="transparent"
      _hover={{
        opacity: 1,
        bg: "transparent",
      }}
      role="group"
      color="#404040"
      _loading={{
        backgroundColor: layerColors[0],
        opacity: 1,
      }}
      _active={{
        backgroundColor: "transparent",
      }}
      {...rest}
    >
      {hasNoText ? (
        <>{children}</>
      ) : (
        <Box pos="relative" zIndex={1}>
          <Box
            as="span"
            display="inline-block"
            _groupHover={{
              opacity: 0,
              transform: "translateY(-70%)",
              transition:
                "transform 1.4s cubic-bezier(.19,1,.22,1),opacity .3s linear",
            }}
          >
            {children}
          </Box>
          <Box
            as="span"
            position="absolute"
            top="0"
            left="0"
            opacity="0"
            transform="translateY(70%)"
            _groupHover={{
              opacity: 1,
              transform: "translateY(0)",
              transition:
                "transform 1.4s cubic-bezier(.19,1,.22,1),opacity 1.4s cubic-bezier(.19,1,.22,1)",
            }}
          >
            {children}
          </Box>
        </Box>
      )}
      <Box
        zIndex={-1}
        bgColor={layerColors[0]}
        overflow="hidden"
        borderRadius="2rem"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        transform="scale(1)"
        transition="transform 1.8s cubic-bezier(.19,1,.22,1)"
        _groupHover={{
          transform: "scale(.95)",
        }}
      >
        <Box
          position="absolute"
          left="50%"
          transform="translate(-50%)"
          top="-60%"
          width="max(200%,10rem)"
          style={{
            aspectRatio: "1 / 1",
          }}
        >
          <BgLayer bgColor={layerColors[1]} delay="0s" />
          <BgLayer bgColor={layerColors[2]} delay=".1s" />
          <BgLayer bgColor={layerColors[0]} delay=".2s" />
        </Box>
      </Box>
    </ChakraButton>
  );
};

export default Button;
