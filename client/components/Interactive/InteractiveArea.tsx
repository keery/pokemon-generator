import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@chakra-ui/react";

interface Props {
  x: number;
  y: number;
  height: number;
  width: number;
  inputTarget: string;
  labelTarget: string;
  noRadius?: boolean;
}

const InteractiveArea = ({
  x,
  y,
  height,
  width,
  inputTarget,
  labelTarget,
  noRadius,
}: Props) => {
  const theme = useTheme();

  return (
    <motion.div
      style={{
        position: "absolute",
        cursor: "pointer",
        left: `${x}%`,
        top: `${y}%`,
        height: `${height}%`,
        width: `${width}%`,
        border: "2px solid",
        borderColor: "transparent",
        borderRadius: noRadius ? "0" : theme.radii.sm,
      }}
      whileHover={{
        boxShadow: "0px 0px 9px #a0c2ff",
        borderColor: "#fff",
      }}
      onClick={() => {
        document
          .getElementById(labelTarget)
          .scrollIntoView({ behavior: "smooth" });
        document.getElementById(inputTarget).focus({ preventScroll: true });
      }}
    />
  );
};

export default InteractiveArea;
