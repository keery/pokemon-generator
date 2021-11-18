import React from "react";
import { useWatch, Control } from "react-hook-form";
import { Rect } from "react-konva";
import { getRgbaColor } from "~utils/helper";
import { RgbaColor } from "react-colorful";

interface Props {
  control: Control;
}

const ColorBackground = ({ control }: Props) => {
  const bgColor: RgbaColor = useWatch({
    control,
    name: "bgColor",
  });

  return (
    <Rect width={400} height={274} y={88} x={55} fill={getRgbaColor(bgColor)} />
  );
};

export default ColorBackground;
