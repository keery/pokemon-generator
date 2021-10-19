import React from "react";
import { motion } from "framer-motion";
import { useTheme, Box } from "@chakra-ui/react";

interface Props {
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
}: Props) => {
  const theme = useTheme();

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
        borderColor={"transparent"}
        borderRadius={noRadius ? "0" : theme.radii.xs}
        transition="box-shadow 200ms, border-color 200ms"
        _groupHover={{
          boxShadow: "0px 0px 9px #a0c2ff",
          borderColor: "#fff",
        }}
      />
    </Box>
  );
};

export default InteractiveArea;
