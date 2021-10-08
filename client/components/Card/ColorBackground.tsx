import React from "react";
import { useWatch, Control } from "react-hook-form";
import { Box } from "@chakra-ui/react";
import { RgbaColor } from "react-colorful";
import { getRgbaColor } from "~utils/helper";

interface Props {
  control: Control;
}

const ColorBackground = ({ control }: Props) => {
  const color: RgbaColor = useWatch({
    control,
    name: "bgColor",
  });

  return (
    <Box
      pos="absolute"
      left="0"
      top="0"
      right="0"
      bottom="0"
      bgColor={getRgbaColor(color)}
      borderRadius="1.8rem"
    />
  );
};

export default ColorBackground;
