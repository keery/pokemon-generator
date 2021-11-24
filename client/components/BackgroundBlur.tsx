import React from "react";
import { Box } from "@chakra-ui/react";
import { useWatch, Control } from "react-hook-form";
import { Element, Select } from "~@types/Card";
import dynamic from "next/dynamic";
import { GRADIENTS } from "~constants";

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
      bgImage={GRADIENTS[type]}
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
      {Object.keys(GRADIENTS).map((type) => (
        <Bg key={type} type={type} isSelected={selectedType.value === type} />
      ))}
    </>
  );
};

export default dynamic(() => Promise.resolve(BackgroundBlur), {
  ssr: false,
});
