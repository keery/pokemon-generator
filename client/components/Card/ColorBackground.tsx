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
  console.log(bgColor, getRgbaColor(bgColor));
  return (
    <Rect width={400} height={280} y={88} x={59} fill={getRgbaColor(bgColor)} />
  );
};

export default ColorBackground;
