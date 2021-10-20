import React from "react";
import { useTheme, Box, BoxProps } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { areaAtom } from "~atoms/area";

interface Props extends BoxProps {
  x: number;
  y: number;
  height: number;
  width: number;
  inputTarget: string;
  labelTarget: string;
  noRadius?: boolean;
  icon: JSX.Element;
}

const InteractiveArea = ({
  x,
  y,
  height,
  width,
  inputTarget,
  labelTarget,
  noRadius,
  icon,
  ...rest
}: Props) => {
  const theme = useTheme();
  const { isVisible } = useRecoilValue(areaAtom);

  return (
    <Box
      role="group"
      onClick={() => {
        document
          .getElementById(labelTarget)
          .scrollIntoView({ behavior: "smooth" });
        document.getElementById(inputTarget).focus({ preventScroll: true });
      }}
    >
      <Box>{icon}</Box>
      <Box
        position={"absolute"}
        cursor={"pointer"}
        left={`${x}%`}
        top={`${y}%`}
        height={`${height}%`}
        width={`${width}%`}
        border={"2px solid"}
        borderColor={isVisible ? "white" : "transparent"}
        borderRadius={noRadius ? "0" : theme.radii.xs}
        transition="box-shadow 200ms, border-color 200ms"
        _groupHover={{
          boxShadow: "0px 0px 9px #a0c2ff",
          borderColor: "#fff",
        }}
        {...rest}
      />
    </Box>
  );
};

export default InteractiveArea;
