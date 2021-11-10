import React from "react";
import {
  IconButton,
  FlexProps,
  Flex,
  Text,
  Box,
  BoxProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { areaAtom } from "~atoms/area";

type Placement = "bottom" | "top" | "left" | "right";
export interface Props extends FlexProps {
  placement: Placement;
  lineLength: number;
  linePos: number;
  label?: string;
  icon: JSX.Element;
  isSecondLine?: boolean;
}

const LINE = {
  pos: "absolute",
  bgColor: "white",
};

const getPlacement = (
  placement: Placement,
  lineLength: number,
  linePos: number,
  isSecondLine: boolean
) => {
  switch (placement) {
    case "bottom":
      return {
        button: {
          top: isSecondLine ? "calc(101% + 36px)" : "101%",
        },
        line: {
          ...LINE,
          left: `${linePos}%`,
          bottom: isSecondLine ? "-8%" : "-2%",
          h: `${lineLength}%`,
          w: "2px",
        },
      };
    case "top":
      return {
        button: {
          bottom: isSecondLine ? "106.5%" : "101%",
        },
        line: {
          ...LINE,
          left: `${linePos}%`,
          top: isSecondLine ? "-8%" : "-2%",
          h: `${lineLength}%`,
          w: "2px",
        },
      };
    case "left":
      return {
        button: {
          right: isSecondLine ? "106.5%" : "101%",
        },
        line: {
          ...LINE,
          top: `${linePos}%`,
          left: isSecondLine ? "-8%" : "-2%",
          w: `${lineLength}%`,
          h: "2px",
        },
      };
    case "right":
      return {
        button: {
          left: isSecondLine ? "106.5%" : "101%",
        },
        line: {
          ...LINE,
          top: `${linePos}%`,
          right: isSecondLine ? "-8%" : "-2%",
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
  linePos,
  isSecondLine = false,
  ...rest
}: Props) => {
  const { line, button } = getPlacement(
    placement,
    lineLength,
    linePos,
    isSecondLine
  );
  const { isVisible } = useRecoilValue(areaAtom);
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (!isVisible || isMobile) return null;

  return (
    <>
      <Box {...(line as BoxProps)} transition="all ease-in-out 200ms" />
      <Flex
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
        transition="all ease-in-out 200ms"
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
