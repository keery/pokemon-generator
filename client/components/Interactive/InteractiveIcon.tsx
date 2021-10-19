import React, { useRef, useState, useEffect } from "react";
import {
  IconButton,
  FlexProps,
  Flex,
  Text,
  Box,
  BoxProps,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { areaAtom } from "~atoms/area";

type Placement = "bottom" | "top" | "left" | "right";
export interface Props extends FlexProps {
  placement: Placement;
  lineLength: number;
  label?: string;
  icon: JSX.Element;
}

const LINE = {
  pos: "absolute",
  bgColor: "white",
};

const getPlacement = (placement: Placement, lineLength: number) => {
  switch (placement) {
    case "bottom":
      return {
        button: {
          top: "102%",
        },
        line: {
          ...LINE,
          bottom: "-2%",
          h: `${lineLength}%`,
          w: "2px",
        },
      };
    case "top":
      return {
        button: {
          bottom: "102%",
        },
        line: {
          ...LINE,
          top: "-2%",
          h: `${lineLength}%`,
          w: "2px",
        },
      };
    case "left":
      return {
        button: {
          right: "102%",
        },
        line: {
          ...LINE,
          left: "-2%",
          w: `${lineLength}%`,
          h: "2px",
        },
      };
    case "right":
      return {
        button: {
          left: "102%",
        },
        line: {
          ...LINE,
          right: "-2%",
          w: `${lineLength}%`,
          h: "2px",
        },
      };
  }
};

const InteractiveIcon = ({
  placement,
  lineLength,
  icon,
  onClick,
  label,
  ...rest
}: Props) => {
  const buttonRef = useRef(null);
  const { line, button } = getPlacement(placement, lineLength);
  const [transform, setTransform] = useState({});
  const { isVisible } = useRecoilValue(areaAtom);

  useEffect(() => {
    if (!buttonRef.current) return;
    if (placement === "bottom" || placement === "top") {
      setTransform({
        transform: `translateX(${buttonRef.current.clientWidth / 2}px)`,
      });
    } else {
      setTransform({
        transform: `translateY(${buttonRef.current.clientHeight / 2}px)`,
      });
    }
  }, [buttonRef?.current, placement]);

  if (!isVisible) return null;

  return (
    <>
      <Box
        left={rest?.left}
        top={rest?.top}
        {...(line as BoxProps)}
        {...transform}
      />
      <Flex
        ref={buttonRef}
        {...button}
        pos="absolute"
        color="main"
        layerStyle="glass"
        px={2}
        py={1}
        fontSize="0.7rem"
        alignItems="center"
        borderRadius="sm"
        boxShadow="1px 1px 4px #a99d9d"
        cursor="pointer"
        onClick={onClick}
        {...rest}
      >
        {!!label && (
          <Text pr={2} fontWeight="bold" whiteSpace="nowrap" userSelect="none">
            {label}
          </Text>
        )}
        <IconButton
          minW="none"
          w="auto"
          h="auto"
          icon={icon}
          aria-label="Field icon"
          bgColor="transparent"
          color="main"
          _hover={{
            bgColor: "transparent",
          }}
          _active={{
            bgColor: "transparent",
          }}
        />
      </Flex>
    </>
  );
};

export default InteractiveIcon;
