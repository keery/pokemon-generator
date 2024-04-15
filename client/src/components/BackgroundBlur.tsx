"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useWatch, useFormContext } from "react-hook-form";
import { Element } from "~@types/CardGenerator";
import { GRADIENTS, Select } from "~constants";

const Bg = ({ type, isSelected }) => {
  const [isVisible, setVisible] = useState(isSelected);

  useEffect(() => {
    setVisible(isSelected);
  }, [isSelected]);

  return (
    <Box
      pos="absolute"
      left={0}
      right={0}
      top={0}
      bottom={0}
      zIndex={0}
      transition="opacity 1000ms"
      bgImage={GRADIENTS[type]}
      opacity={isVisible ? 1 : 0}
    />
  );
};

const BackgroundBlur = () => {
  const { control } = useFormContext();

  const selectedType: Select<Element> = useWatch({
    control,
    name: "type",
  });
  {
    Object.keys(GRADIENTS).map((type) => {
      console.log(selectedType.value === type, type);
    });
  }
  // console.log(selectedType, GRADIENTS);

  return (
    <Box layerStyle="cover" bgColor="white">
      {Object.keys(GRADIENTS).map((type) => (
        // <Bg key={type} type={type} isSelected={selectedType.value === type} />
        <Box
          key={type}
          pos="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          zIndex={0}
          transition="opacity 1000ms"
          bgImage={GRADIENTS[type]}
          opacity={selectedType.value === type ? 1 : 0}
        />
      ))}
    </Box>
  );
};

export default BackgroundBlur;
