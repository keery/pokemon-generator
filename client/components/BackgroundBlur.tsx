import React from "react";
import { Box } from "@chakra-ui/react";
import { useWatch, Control } from "react-hook-form";
import { Element } from "~@types/Card";

const gradients: Record<Element, any> = {
  normal:
    "linear-gradient(45deg, rgb(208 208 208 / 31%), rgb(105 108 111 / 28%) 45%, rgb(127 129 134 / 42%) 71%, rgb(61 64 64 / 4%))",
  water:
    "linear-gradient(45deg, rgba(63, 128, 254, 0.31), rgba(10, 121, 251, 0.16) 45%, rgba(63, 125, 254, 0.42) 71%, rgba(74, 210, 202, 0.3))",
  fire: "linear-gradient(45deg, rgb(255 0 0 / 31%), rgb(251 10 10 / 16%) 45%, rgb(254 63 63 / 42%) 71%, rgb(255 140 193 / 30%))",
  grass:
    "linear-gradient(45deg, rgb(76 255 98 / 31%), rgb(0 97 51 / 16%) 45%, rgb(149 255 68 / 42%) 71%, rgb(193 218 54 / 30%))",
  electric:
    "linear-gradient(45deg, rgb(251 254 63 / 31%), rgb(136 113 0 / 24%) 45%, rgb(202 179 22 / 42%) 71%, rgb(255 100 9 / 30%))",
  psychic:
    "linear-gradient(45deg, rgb(225 63 254 / 31%), rgb(95 10 251 / 16%) 45%, rgb(254 63 204 / 42%) 71%, rgb(51 0 255 / 30%))",
  fighting:
    "linear-gradient(45deg, rgb(254 151 63 / 31%), rgb(251 114 10 / 16%) 45%, rgb(254 116 63 / 42%) 71%, rgb(249 81 30 / 53%))",
};
interface Props {
  control: Control;
}

const BackgroundBlur = ({ control }: Props) => {
  const type: Element = useWatch({
    control,
    name: "type",
  });

  console.log(type);
  return (
    <Box
      pos="absolute"
      left="0"
      right="0"
      top="0"
      bottom="0"
      z-index="-1"
      transition="all ease-in-out 4s"
      bgImage={gradients[type]}
    />
  );
};

export default BackgroundBlur;
