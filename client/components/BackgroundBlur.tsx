import React from "react";
import { Box } from "@chakra-ui/react";
import { useWatch, Control } from "react-hook-form";
import { Element, Select } from "~@types/Card";
import dynamic from "next/dynamic";

const gradients: Record<Element, any> = {
  normal:
    "linear-gradient(45deg, rgb(0 0 0 / 31%), rgb(105 108 111 / 28%) 45%, rgb(39 39 39 / 42%) 71%, rgb(61 64 64 / 4%))",
  water:
    "linear-gradient(45deg, rgba(63, 128, 254, 0.31), rgba(10, 121, 251, 0.16) 45%, rgba(63, 125, 254, 0.42) 71%, rgba(74, 210, 202, 0.3))",
  fire: "linear-gradient(45deg, rgb(255 0 0 / 31%), rgb(251 10 10 / 16%) 45%, rgb(254 63 63 / 42%) 71%, rgb(255 140 193 / 30%))",
  grass:
    "linear-gradient(45deg, rgb(76 255 98 / 31%), rgb(0 97 51 / 16%) 45%, rgb(149 255 68 / 42%) 71%, rgb(193 218 54 / 30%))",
  electric:
    "linear-gradient(45deg, rgb(253 219 96), rgb(247 238 194) 45%, rgb(255 241 146) 71%, rgb(255 214 99))",
  // "linear-gradient(45deg, rgb(251 254 63 / 31%), rgb(136 113 0 / 24%) 45%, rgb(202 179 22 / 42%) 71%, rgb(255 100 9 / 30%))",
  psychic:
    "linear-gradient(45deg, rgb(205 170 250), rgb(196 193 251) 45%, rgb(209 151 236) 71%, rgb(157 166 244))",
  // "linear-gradient(45deg, rgb(225 63 254 / 31%), rgb(95 10 251 / 16%) 45%, rgb(254 63 204 / 42%) 71%, rgb(51 0 255 / 30%))",
  fighting:
    "linear-gradient(45deg, rgb(255 176 108), rgb(255 229 181) 45%, rgb(247 155 60 / 88%) 71%, rgb(202 102 17))",
  // "linear-gradient(45deg, rgb(254 151 63 / 31%), rgb(251 114 10 / 16%) 45%, rgb(254 116 63 / 42%) 71%, rgb(249 81 30 / 53%))",
};
interface Props {
  control: Control;
}

const Bg = ({ type, isSelected }) => {
  return (
    <Box
      pos="absolute"
      left={0}
      right={0}
      top={0}
      bottom={0}
      zIndex={-1}
      transition="opacity 1000ms"
      bgImage={gradients[type]}
      opacity={isSelected ? 1 : 0}
    />
  );
};

const BackgroundBlur = ({ control }: Props) => {
  const selectedType: Select<Element> = useWatch({
    control,
    name: "type",
  });

  return (
    <>
      {Object.keys(gradients).map((type) => (
        <Bg key={type} type={type} isSelected={selectedType.value === type} />
      ))}
    </>
  );
};

export default dynamic(() => Promise.resolve(BackgroundBlur), {
  ssr: false,
});
